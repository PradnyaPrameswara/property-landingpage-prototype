import assert from 'node:assert/strict';
import { execFileSync, spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { chromium } from 'playwright-core';

// Read-only historical design reference. The export is never added to the app bundle.
const referenceCommit = '1a2797f7bac05b5352415c668bfce891d5aa8c99';
const source = execFileSync('git', ['show', referenceCommit + ':index.html'], {
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024,
});
const outputDir = 'artifacts/visual-reference';
mkdirSync(outputDir, { recursive: true });

const archived = createServer((request, response) => {
  if (request.url === '/' || request.url === '/index.html') {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.end(source);
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
await new Promise((resolve, reject) => {
  archived.once('error', reject);
  archived.listen(4332, '127.0.0.1', resolve);
});

const preview = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', [
  'run', 'preview', '--', '--host', '127.0.0.1', '--port', '4331',
], { stdio: 'ignore', detached: process.platform !== 'win32' });

async function waitUntilReady(url) {
  for (let i = 0; i < 100; i++) {
    if (preview.exitCode !== null) throw new Error('Astro preview terminated');
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(1200) });
      if (response.ok) return;
    } catch {
      // Server has not bound the port yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error('Astro preview failed to start');
}

let browser;
const results = [];
try {
  await waitUntilReady('http://127.0.0.1:4331/');
  browser = await chromium.launch({ headless: true });

  for (const width of [390, 768, 1440]) {
    const view = { width, height: 900 };
    for (const sample of [
      { name: 'webflow-reference', url: 'http://127.0.0.1:4332/' },
      { name: 'astro-rewrite', url: 'http://127.0.0.1:4331/' },
    ]) {
      const page = await browser.newPage({
        viewport: view, deviceScaleFactor: 1, reducedMotion: 'reduce',
      });
      const cssFailures = [];
      page.on('requestfailed', (request) => {
        if (request.resourceType() === 'stylesheet') {
          cssFailures.push(request.url() + ': ' + request.failure()?.errorText);
        }
      });
      const response = await page.goto(sample.url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
      assert.equal(response?.status(), 200, sample.name + ' failed to load');
      await page.waitForTimeout(4000);
      await page.evaluate(() => document.fonts.ready);

      const details = await page.evaluate(() => {
        function box(selector) {
          const el = document.querySelector(selector);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          return {
            x: Math.round(rect.x * 10) / 10,
            y: Math.round(rect.y * 10) / 10,
            width: Math.round(rect.width * 10) / 10,
            height: Math.round(rect.height * 10) / 10,
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            lineHeight: style.lineHeight,
            color: style.color,
            backgroundImage: style.backgroundImage.slice(0, 200),
            backgroundSize: style.backgroundSize,
            backgroundPosition: style.backgroundPosition,
            backgroundAttachment: style.backgroundAttachment,
            transform: style.transform,
            overflow: style.overflow,
            paddingTop: style.paddingTop,
            paddingBottom: style.paddingBottom,
            border: style.border,
            letterSpacing: style.letterSpacing,
            fontWeight: style.fontWeight,
          };
        }
        const originalStylesheet = document.querySelector(
          'link[rel="stylesheet"][href*="proforma-db.webflow.shared"]',
        );
        return {
          h1: document.querySelector('h1')?.textContent?.trim() ?? '',
          header: box('.header, .site-header'),
          hero: box('.hero-section'),
          heroTitle: box('.hero-section h1'),
          heroDescription: box('.hero-section .text-m'),
          heroButton: box('.hero-section a.button-white-grey-hover'),
          heroArtwork: box('.hero-section .bg-about-us'),
          linkedCssReady: originalStylesheet ? Boolean(originalStylesheet.sheet) : null,
          loadedFontFaces: document.fonts.size,
          pageWidth: document.documentElement.scrollWidth,
        };
      });

      await page.screenshot({
        path: outputDir + '/' + sample.name + '-' + width + '.png',
        fullPage: false,
        animations: 'disabled',
      });
      results.push({ width, sample: sample.name, ...details, cssFailures });
      console.log(sample.name + ' ' + width + 'px: ' + JSON.stringify({
        title: details.h1, titleBounds: details.heroTitle,
        cssLoaded: details.linkedCssReady, cssFailures,
      }));
      await page.close();
    }
  }
  writeFileSync(outputDir + '/metrics.json', JSON.stringify({
    referenceCommit, samples: results,
  }, null, 2));

  const missingCss = results.filter(
    (sample) => sample.sample === 'webflow-reference' && sample.linkedCssReady !== true,
  );
  if (missingCss.length) {
    console.error('Historical template CSS could not be loaded. Reference screenshots are not valid for visual comparison.');
    process.exitCode = 1;
  } else {
    console.log('Original template reference screenshots available for measured visual comparison.');
  }
} finally {
  if (browser) await browser.close();
  await new Promise((resolve) => archived.close(resolve));
  if (preview.pid) {
    try {
      if (process.platform === 'win32') preview.kill('SIGTERM');
      else process.kill(-preview.pid, 'SIGTERM');
    } catch {
      preview.kill('SIGTERM');
    }
  }
}
