#!/usr/bin/env node
/* w49_live.js — the w49 directive suite (live, Chromium, both themes):
   1) the comparison sweep breathes pale→mid gold: BOTH sides of the matchup compute the new
      gradient (gold2 + goldm stops) with the sweep running — the deep head is gone;
   2) the Madden rankings' ANCHOR name shimmers inside the chip again — the chip's own
      deep→mid sweep, the rose-gold frame (border #e2bfae / fill #f9ece4 / ink #6b4634 light,
      plum untouched dark);
   3) the team detail's "led by" names carry the tier law;
   4) zero console errors; screenshots to evidence. */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/download/Football-Sim-Z-post-blue-w49.html';
const OUT = '/home/z/my-project/w49work/evidence';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let PASS = 0, FAIL = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? PASS++ : FAIL++; };
const shot = (page, name) => page.screenshot({ path: `${OUT}/${name}` });

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1250 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message.slice(0, 120)));
  await page.goto(FILE); await page.waitForTimeout(1100);
  const setTheme = t => page.evaluate(th => document.documentElement.setAttribute('data-theme', th), t);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  console.log('A · the comparison sweep reads gold on BOTH sides');
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /team comparison/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(900);
  const sweep = () => page.evaluate(() => {
    const dark = document.documentElement.getAttribute('data-theme') !== 'light';
    const MID = dark ? 'rgb(195, 154, 74)' : 'rgb(173, 127, 46)'; // --goldm resolved per theme
    const cells = [...document.querySelectorAll('.zpb-lu-cell.zpb-shm')];
    const L = cells.filter(c => c.classList.contains('zpb-lu-l'));
    const R = cells.filter(c => c.classList.contains('zpb-lu-r'));
    const cs = c => getComputedStyle(c);
    return {
      MID,
      nL: L.length, nR: R.length,
      animL: L.every(c => cs(c).animationName === 'zpbshmsweep'),
      animR: R.every(c => cs(c).animationName === 'zpbshmsweep'),
      clipL: L.every(c => cs(c).webkitBackgroundClip === 'text'),
      clipR: R.every(c => cs(c).webkitBackgroundClip === 'text'),
      paleL: L.every(c => (cs(c).backgroundImage || '').includes('rgb(230, 198, 125)') || (cs(c).backgroundImage || '').includes('rgb(232, 200, 126)')),
      paleR: R.every(c => (cs(c).backgroundImage || '').includes('rgb(230, 198, 125)') || (cs(c).backgroundImage || '').includes('rgb(232, 200, 126)')),
      midL: L.every(c => (cs(c).backgroundImage || '').includes(MID)),
      midR: R.every(c => (cs(c).backgroundImage || '').includes(MID)),
      deepHeadR: R.some(c => (cs(c).backgroundImage || '').includes('rgb(154, 107, 31)')),
      glow: cells.some(c => cs(c).animationName === 'zpbshimglow')
    };
  });
  await setTheme('dark'); await page.waitForTimeout(500);
  let sd = await sweep();
  ok(sd.nL > 3 && sd.nR > 1, '90+ cells present on both sides', `L=${sd.nL} R=${sd.nR}`);
  ok(sd.animL && sd.animR, 'every 90+ cell sweeps (zpbshmsweep) on both sides');
  ok(sd.clipL && sd.clipR, 'the gradient is clipped to the text on both sides');
  ok(sd.midL && sd.midR, 'the sweep carries the new mid gold on both sides');
  ok(!sd.deepHeadR, 'the deep-gold head is gone from the strip', 'gold3 absent from the lu gradient');
  ok(!sd.glow, 'no glow anywhere');
  await shot(page, 'w49-cmp-dark.png');
  await setTheme('light'); await page.waitForTimeout(450);
  sd = await sweep();
  ok(sd.animL && sd.animR && sd.clipL && sd.clipR, 'light: the same law on both sides');
  ok(sd.midL && sd.midR && !sd.deepHeadR, 'light: pale→mid gold, deep head gone');
  await shot(page, 'w49-cmp-light.png');
  // the Raiders-by-name check: the default matchup's far side
  const lv = await page.evaluate(() => {
    const cell = [...document.querySelectorAll('.zpb-lu-cell.zpb-shm')].find(c => (c.textContent || '').includes('Maxx Crosby'));
    if (!cell) return null;
    const cs = getComputedStyle(cell);
    return { anim: cs.animationName, clip: cs.webkitBackgroundClip, bg: cs.backgroundImage.slice(0, 80) };
  });
  ok(!!lv && lv.anim === 'zpbshmsweep' && lv.clip === 'text', 'light: Maxx Crosby 97 wears the sweep', lv && lv.anim);

  console.log('B · the Madden rankings page shimmers again');
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /madden rankings/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(900);
  const chip = () => page.evaluate(() => {
    const chips = [...document.querySelectorAll('.zpb-anch')];
    if (!chips.length) return { none: true };
    const withName = chips.map(c => {
      const nm = c.querySelector('.zpb-anchname');
      if (!nm) return null;
      const cs = getComputedStyle(nm), cc = getComputedStyle(c);
      return { cls: nm.className, anim: cs.animationName, bg: cs.backgroundImage,
        clip: cs.webkitBackgroundClip, fill: cs.webkitTextFillColor,
        chipBorder: cc.borderTopColor, chipBg: cc.backgroundColor, chipColor: cc.color };
    }).filter(Boolean);
    const sweepN = withName.filter(c => c.cls.includes('zpb-shm') && c.anim === 'zpbshmsweep' && c.clip === 'text');
    return { n: withName.length, sweepN: sweepN.length, first: withName[0] };
  });
  await setTheme('light'); await page.waitForTimeout(450);
  let cl = (await chip());
  ok(cl.n >= 28, 'the rankings rows carry their ANCHOR chips', 'n=' + cl.n);
  ok(cl.sweepN >= 20, 'the 90+ anchor names sweep inside the chips', `${cl.sweepN}/${cl.n} sweep`);
  ok(cl.first && cl.first.chipBg === 'rgb(249, 236, 228)', 'light: the chip fill is the delicate rose #f9ece4', cl.first && cl.first.chipBg);
  ok(cl.first && cl.first.chipBorder === 'rgb(226, 191, 174)', 'light: the frame is the rose gold #e2bfae', cl.first && cl.first.chipBorder);
  ok(cl.first && cl.first.chipColor === 'rgb(107, 70, 52)', 'light: the chip ink is the warm rose-brown #6b4634', cl.first && cl.first.chipColor);
  ok(cl.first && (cl.first.bg || '').includes('rgb(154, 107, 31)') && (cl.first.bg || '').includes('rgb(173, 127, 46)'), 'light: the chip sweep breathes deep→mid gold', cl.first && String(cl.first.bg).slice(0, 60));
  await shot(page, 'w49-madden-light.png');
  await setTheme('dark'); await page.waitForTimeout(450);
  const cd = (await chip()).first;
  ok(cd && cd.anim === 'zpbshmsweep', 'dark: the anchor name sweeps there too', cd && cd.anim);
  ok(cd && (cd.bg || '').includes('rgb(232, 200, 126)') && (cd.bg || '').includes('rgb(195, 154, 74)'), 'dark: the lighter pair on the plum', cd && String(cd.bg).slice(0, 60));
  ok(cd && cd.chipBg === 'rgb(77, 47, 63)' && cd.chipBorder === 'rgb(138, 95, 120)', 'dark: the plum chip untouched', cd && cd.chipBg + '/' + cd.chipBorder);
  await shot(page, 'w49-madden-dark.png');

  console.log('C · the team detail "led by" names carry the tier law');
  let ledBy = null;
  for (const tr of await page.$$('#resultsBody tr.teamrow')) {
    await tr.click(); await page.waitForTimeout(450);
    ledBy = await page.evaluate(() => {
      const els = [...document.querySelectorAll('.zpb-swbadge i b')];
      if (!els.length) return null;
      return { n: els.length, shmN: els.filter(e => e.classList.contains('zpb-shm')).length,
        vibN: els.filter(e => e.classList.contains('zpb-vib')).length };
    });
    if (ledBy && ledBy.n) break;
    const close = await page.$('#closeDetail'); if (close) await close.click(); await page.waitForTimeout(250);
  }
  ok(!!ledBy && ledBy.n > 0 && (ledBy.shmN + ledBy.vibN) === ledBy.n, 'every "led by" name wears a tier class', JSON.stringify(ledBy));
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.waitForTimeout(350);

  ok(errors.length === 0, 'zero console errors through the drive', errors.slice(0, 3).join(' | '));
  console.log(`\nw49_live: ${PASS} pass · ${FAIL} fail`);
  await browser.close();
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
