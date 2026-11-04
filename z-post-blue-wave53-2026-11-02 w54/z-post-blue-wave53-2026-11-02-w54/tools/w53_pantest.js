#!/usr/bin/env node
/* w53_pantest.js — behavioral pan test: can the page actually be panned sideways?
   The UX law is "the user cannot pan", not "scrollWidth <= clientWidth". */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  for (const [tag, file] of [
    ['w52', 'file:///home/z/my-project/w52/Football-Sim-Z-post-blue-w52.html'],
    ['w53', 'file:///home/z/my-project/w53/Football-Sim-Z-post-blue-w53.html'],
  ]) {
    const page = await browser.newPage({ viewport: { width: 320, height: 690 } });
    await page.goto(file); await page.waitForTimeout(800);
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload(); await page.waitForTimeout(800);
    await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /madden rankings/i.test(x.textContent || '')); if (b) b.click(); });
    await page.waitForTimeout(900);
    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const clip = getComputedStyle(de).overflowX;
      window.scrollTo(60, 0);
      const sx = window.scrollX;
      de.scrollLeft = 40; const sl = de.scrollLeft;
      // touch-like wheel delta test
      return { clip, scrollXAfterTo: sx, scrollLeftAfterSet: sl, scrollWidth: de.scrollWidth, clientWidth: de.clientWidth };
    });
    console.log(tag, JSON.stringify(r));
    await page.close();
  }
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
