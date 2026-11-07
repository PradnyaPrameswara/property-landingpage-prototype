import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright-core';

const base = 'http://127.0.0.1:4321';
const server = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', [
  'run', 'preview', '--', '--host', '127.0.0.1', '--port', '4321',
], { stdio: ['ignore', 'pipe', 'pipe'], detached: process.platform !== 'win32' });
let serverOutput = '';
server.stdout.on('data', (chunk) => { serverOutput += chunk.toString(); });
server.stderr.on('data', (chunk) => { serverOutput += chunk.toString(); });

async function ready() {
  for (let i = 0; i < 80; i++) {
    if (server.exitCode !== null) throw new Error('Preview exited early: ' + serverOutput);
    try {
      const response = await fetch(base, { signal: AbortSignal.timeout(1200) });
      if (response.ok) return;
    } catch {
      // Preview is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Preview did not become ready: ' + serverOutput);
}

let browser;
try {
  await ready();
  console.log('Preview ready; launching browser smoke checks');
  browser = await chromium.launch({ headless: true });
  mkdirSync('artifacts/screenshots', { recursive: true });
  const failures = [];

  for (const width of [390, 768, 1440]) {
    console.log(`Checking home at ${width}px`);
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    page.on('pageerror', (error) => failures.push(`${width}px: ${error.message}`));
    page.on('response', (response) => {
      if (response.url().startsWith(base) && response.status() >= 400) {
        failures.push(`${width}px: HTTP ${response.status()} ${response.url()}`);
      }
    });
    const response = await page.goto(base, { waitUntil: 'networkidle' });
    assert.equal(response?.status(), 200, 'homepage must respond successfully');
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('main h1').count(), 1, 'homepage needs one H1');
    assert.equal(await page.locator('main > section').count(), 11, 'homepage section order changed');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    assert.ok(overflow <= 1, `homepage overflow at ${width}px: ${overflow}px`);

    if (width === 390) {
      await page.locator('[data-burger]').click();
      const menu = page.locator('[data-mobile-menu]');
      assert.equal(await menu.getAttribute('aria-hidden'), 'false');
      assert.equal(await page.locator('[data-menu-close]').evaluate((el) => el === document.activeElement), true);
      await page.keyboard.press('Escape');
      assert.equal(await menu.getAttribute('aria-hidden'), 'true');
      assert.equal(await page.locator('[data-burger]').evaluate((el) => el === document.activeElement), true);
      await page.locator('.faq summary').first().click();
      assert.equal(await page.locator('.faq').first().getAttribute('open'), '');
    }

    if (width === 1440) {
      const tab = page.locator('[data-autotabs] [data-tab]').first();
      await tab.hover();
      assert.equal(await tab.getAttribute('data-active'), 'true', 'service tab should activate on hover');
    }

    await page.screenshot({
      path: `artifacts/screenshots/home-${width}.png`,
      fullPage: true,
      animations: 'disabled',
      timeout: 90000,
    });
    await page.close();
    console.log(`Completed home screenshot at ${width}px`);
  }

  const routes = [
    '/about-us', '/projects', '/blog', '/contact',
    '/project/the-garden-initiative', '/product/decoration',
    '/blog/innovative-materials-in-architecture',
    '/teams/interior-director', '/reviews/california-coffee',
    '/privacy-policy',
  ];
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  page.on('pageerror', (error) => failures.push(error.message));
  for (const route of routes) {
    console.log(`Checking ${route}`);
    const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
    assert.equal(response?.status(), 200, `route ${route} failed`);
    assert.ok(await page.locator('h1').count() >= 1, `route ${route} missing heading`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    assert.ok(overflow <= 1, `horizontal overflow on ${route}: ${overflow}px`);
  }
  await page.goto(base + '/projects', { waitUntil: 'domcontentloaded' });
  await page.locator('button[data-tab="Architecture"]').click();
  assert.equal(await page.locator('[data-pane="Architecture"]').isVisible(), true);
  assert.equal(await page.locator('[data-pane="All"]').isVisible(), false);
  await page.close();

  assert.deepEqual(failures, [], 'browser errors or failed same-origin requests');
  console.log('Browser smoke passed: 3 home widths, 10 routes, menu, FAQ, services and filters.');
} finally {
  if (browser) await browser.close();
  if (server.pid) {
    try {
      if (process.platform === 'win32') {
        const killer = spawn('taskkill', ['/PID', String(server.pid), '/T', '/F'], { stdio: 'ignore' });
        killer.unref();
      } else {
        process.kill(-server.pid, 'SIGTERM');
      }
    } catch {
      server.kill('SIGTERM');
    }
  }
}
