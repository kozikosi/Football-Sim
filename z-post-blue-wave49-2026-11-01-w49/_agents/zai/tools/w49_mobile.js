#!/usr/bin/env node
/* w49_mobile.js — 390px: the Madden rankings page (his chip page) must not overflow and the
   chips must still sweep; zero page errors. */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/download/Football-Sim-Z-post-blue-w49.html';
const OUT = '/home/z/my-project/w49work/evidence';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let PASS = 0, FAIL = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? PASS++ : FAIL++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message.slice(0, 120)));
  await page.goto(FILE); await page.waitForTimeout(1000);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /madden rankings/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(900);
  const m = await page.evaluate(() => ({
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    chips: document.querySelectorAll('.zpb-anch').length,
    sweeping: [...document.querySelectorAll('.zpb-anch .zpb-shm')].filter(e => {
      const cs = getComputedStyle(e);
      return (cs.animationName === 'zpbshmsweep') && cs.webkitBackgroundClip === 'text';
    }).length
  }));
  ok(m.overflowX <= 0, '390px: no horizontal overflow on the rankings', 'overflowX=' + m.overflowX);
  ok(m.chips > 0 && m.sweeping > 0, `390px: the anchor names still sweep (${m.sweeping}/${m.chips})`);
  await page.screenshot({ path: OUT + '/w49-mobile-madden.png' });
  ok(errors.length === 0, 'zero page errors', errors.slice(0, 3).join(' | '));
  console.log(`\nw49_mobile: ${PASS} pass · ${FAIL} fail`);
  await browser.close();
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
