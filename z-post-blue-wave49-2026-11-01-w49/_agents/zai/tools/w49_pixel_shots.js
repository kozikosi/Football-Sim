#!/usr/bin/env node
/* w49_pixel_shots.js — element shots for the pixel proof: the far side of the comparison
   (Raiders 90+), the near side (Chiefs 90+), and the ANCHOR chips (both themes). */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/download/Football-Sim-Z-post-blue-w49.html';
const OUT = '/home/z/my-project/w49work/evidence';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1250 } });
  await page.goto(FILE); await page.waitForTimeout(1000);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /team comparison/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(900);
  for (const theme of ['light', 'dark']) {
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await page.waitForTimeout(500);
    for (const [name, tag] of [['Maxx Crosby', 'lv-crosby'], ['Brock Bowers', 'lv-bowers'], ['Patrick Mahomes', 'kc-mahomes'], ['Chris Jones', 'kc-cjones']]) {
      const el = await page.$(`.zpb-lu-cell >> text=${name}`);
      if (el) await el.screenshot({ path: `${OUT}/w49-el-${tag}-${theme}.png` });
    }
  }
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /madden rankings/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(900);
  for (const theme of ['light', 'dark']) {
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await page.waitForTimeout(500);
    const chips = await page.$$('.zpb-anch');
    for (let i = 0; i < Math.min(3, chips.length); i++) {
      await chips[i].screenshot({ path: `${OUT}/w49-chip-${i}-${theme}.png` });
    }
  }
  await browser.close();
  console.log('element shots saved');
})().catch(e => { console.error('FATAL', e); process.exit(1); });
