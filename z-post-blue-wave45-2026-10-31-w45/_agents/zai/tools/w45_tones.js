#!/usr/bin/env node
/* w45_tones.js — dump all 32 packs' inks + contrast vs both page bgs, calibrate the floor. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright/node_modules/playwright-core');
const FILE = 'file://' + process.cwd() + '/base.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: exe, args: ['--disable-dev-shm-usage','--no-sandbox','--disable-gpu'] });
  const page = await (await browser.newContext()).newPage();
  await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(1200);
  const rows = await page.evaluate(() => {
    const lum = hex => {
      const c = hex.replace('#','');
      const f = v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); };
      return 0.2126*f(parseInt(c.slice(0,2),16)) + 0.7152*f(parseInt(c.slice(2,4),16)) + 0.0722*f(parseInt(c.slice(4,6),16));
    };
    const cr = (a,b) => { const l1=lum(a), l2=lum(b); return ((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)); };
    return Object.keys(ZPB_TEAM_COLORS).map(t => {
      const pk = zpbPackFor(t);
      return { t, txM:pk.txM, txd:pk.txd, txL:pk.txL, accL:pk.accL,
        crL: cr(pk.txM, '#fcf7f1').toFixed(2), crD: cr(pk.txd, '#181114').toFixed(2) };
    }).sort((a,b)=>a.crL-b.crL);
  });
  console.log('team | txM | CR vs light bg | txd | CR vs dark bg | txL(crayola) | accL(vivid)');
  rows.forEach(r => console.log(`${r.t} | ${r.txM} | ${r.crL} | ${r.txd} | ${r.crD} | ${r.txL} | ${r.accL}`));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
