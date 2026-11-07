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
      const sections = await page.evaluate(() => {
        const candidates = Array.from(document.querySelectorAll('section, .section'));
        const elements = candidates.filter((el) =>
          !el.parentElement?.closest('section, .section') &&
          el.getBoundingClientRect().height > 60
        );
        return elements.map((el, index) => {
          el.setAttribute('data-parity-section', String(index));
          const rect = el.getBoundingClientRect();
          const heading = el.querySelector('h1, h2, h3');
          const headingRect = heading?.getBoundingClientRect();
          const style = heading ? getComputedStyle(heading) : null;
          return {
            index,
            label: heading?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 120) ?? '',
            className: el.className,
            y: Math.round((rect.top + scrollY) * 10) / 10,
            height: Math.round(rect.height * 10) / 10,
            width: Math.round(rect.width * 10) / 10,
            headingY: headingRect ? Math.round((headingRect.top + scrollY) * 10) / 10 : null,
            headingHeight: headingRect ? Math.round(headingRect.height * 10) / 10 : null,
            headingFont: style?.fontFamily ?? null,
            headingSize: style?.fontSize ?? null,
          };
        });
      });
      if (sections.length < 8) {
        throw new Error(sample.name + ': expected at least 8 top-level homepage sections, got ' + sections.length);
      }
      const maxCaptures = width === 768 ? 0 : width === 390 ? 12 : 14;
      for (const section of sections.slice(0, maxCaptures)) {
        const locator = page.locator('[data-parity-section="' + section.index + '"]');
        await locator.scrollIntoViewIfNeeded();
        await page.waitForTimeout(180);
        await locator.screenshot({
          path: outputDir + '/' + sample.name + '-section-' + String(section.index).padStart(2, '0') + '-' + width + '.png',
          animations: 'disabled',
          timeout: 60000,
        });
      }
      const advantages = await page.evaluate(() => {
        const section = document.querySelector('section.advantages');
        if (!section) return null;
        const selectors = [
          'section.advantages', 'section.advantages .container',
          'section.advantages .content-grid',
          'section.advantages .column-sticky',
          'section.advantages .column-left',
          'section.advantages .column-right',
          'section.advantages .column-card-advant',
          'section.advantages .column-card-advant-top',
          'section.advantages .circle-grey',
        ];
        return Object.fromEntries(selectors.map((selector) => {
          const el = document.querySelector(selector);
          if (!el) return [selector, null];
          const rect = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          return [selector, {
            width: Number(rect.width.toFixed(2)),
            height: Number(rect.height.toFixed(2)),
            x: Number(rect.x.toFixed(2)),
            top: Number((rect.top + scrollY).toFixed(2)),
            padding: [style.paddingTop,style.paddingRight,style.paddingBottom,style.paddingLeft],
            gap: style.gap,
            display: style.display,
            position: style.position,
            gridTemplateColumns: style.gridTemplateColumns,
            gridTemplateRows: style.gridTemplateRows,
            alignItems: style.alignItems,
            justifyContent: style.justifyContent,
            maxWidth: style.maxWidth,
            aspectRatio: style.aspectRatio,
          }];
        }));
      });
      results.push({ width, sample: sample.name, ...details, cssFailures, sections, advantages });
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

  for (const width of [390, 768, 1440]) {
    const original = results.find((x) => x.width === width && x.sample === 'webflow-reference');
    const rewrite = results.find((x) => x.width === width && x.sample === 'astro-rewrite');
    if (!original || !rewrite) continue;
    console.log('SECTION COUNTS ' + width + 'px: Webflow=' + original.sections.length +
      ', Astro=' + rewrite.sections.length);
    for (let i = 0; i < Math.min(original.sections.length, rewrite.sections.length); i++) {
      const a = original.sections[i];
      const b = rewrite.sections[i];
      console.log('SECTION ' + width + 'px #' + i + ': ' + a.label.slice(0, 35) +
        ' vs ' + b.label.slice(0, 35) +
        ', Δy=' + (b.y - a.y).toFixed(1) + 'px, Δheight=' + (b.height - a.height).toFixed(1) + 'px');
    }
  }

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
