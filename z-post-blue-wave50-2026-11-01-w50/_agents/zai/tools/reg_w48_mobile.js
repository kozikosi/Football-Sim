#!/usr/bin/env node
/* w48_mobile.js — 390px spot check on the page that changed (Madden rankings) + a shot. */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/download/Football-Sim-Z-post-blue-w50.html';
const OUT = '/home/z/my-project/w49work/evidence';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message.slice(0, 100)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /madden rankings/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(1000);
  const ov = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(ov <= 0 ? 'PASS 390px rankings: no horizontal overflow (' + ov + 'px)' : 'FAIL overflow ' + ov + 'px');
  await page.screenshot({ path: OUT + '/w48-mobile-madden.png' });
  console.log(errors.length === 0 ? 'PASS zero page errors' : 'FAIL ' + errors[0]);
  await browser.close();
  process.exit(ov <= 0 && errors.length === 0 ? 0 : 1);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
