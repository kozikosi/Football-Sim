#!/usr/bin/env node
/* w44_tone.js — the halfway-ink study (O1).
   For every franchise: txd (the dark ink the Owner loves), txL/old txM (the crayola), and the
   new halfway txM at ratios 0.42/0.50/0.58 — with chroma numbers so "halfway" is measurable. */
const { chromium } = require('/home/z/my-project/w41/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/boot/w44/Football-Sim-Z-post-blue-w44.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: exe });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(1800);
  const rows = await page.evaluate(() => {
    const teams = (typeof TEAMS !== 'undefined') ? Object.keys(TEAMS).filter(t => !(TEAMS[t]||{}).cpuOnly) : [];
    const hsl = zpbHsl, mix = zpbMix, from = zpbFromHsl;
    const clamp = (v,a,b)=>Math.min(b,Math.max(a,v));
    const mk = (txL, ratio) => { const c = hsl(mix('#53382b', txL, ratio)); return from(c.h, clamp(c.s,0.22,0.85), clamp(c.l,0.30,0.52)); };
    const out = [];
    const list = teams.length ? teams : Object.keys(zpbState && zpbState.packs || {});
    list.forEach(t => {
      const pk = zpbPackFor(t); if(!pk) return;
      const oldM = (h=> h.l<0.52 ? from(h.h,h.s,0.52) : pk.txL)(hsl(pk.txL));
      const row = { team: t, dark: pk.txd, crayola: oldM, shipped: pk.txM };
      [0.42,0.50,0.58].forEach(r => { const key = String(r).replace('.','_'); row['r'+key] = mk(pk.txL, r); });
      // chroma = (max-min) over RGB — honest colorfulness
      const ch = h => { const c = hsl(h); const mx = Math.max(c.r||0,c.g||0,c.b||0); return 0; }; // placeholder replaced below
      const chr = hex => { const rgb = zpbRgb(hex); return +((Math.max(...rgb)-Math.min(...rgb))/255).toFixed(3); };
      const key = r => String(r).replace('.','_');
      row.chroma = { dark: chr(pk.txd), crayola: chr(oldM), shipped: chr(pk.txM) };
      out.push(row);
    });
    return out;
  });
  console.log('team | dark txd | crayola | r42 | r50 | r58 | chroma dark/cray/r42/r50/r58');
  rows.forEach(r => {
    console.log([r.team, r.dark, r.crayola, r.shipped,
      `${r.chroma.dark}/${r.chroma.crayola}/${r.chroma.shipped}`].join(' | '));
  });
  // the halfway check: r50 chroma vs the geometric mean of dark & crayola chroma
  let under=0, over=0, near=0;
  rows.forEach(r => {
    const gm = Math.sqrt(r.chroma.dark * r.chroma.crayola);
    if (r.chroma.shipped < gm*0.75) under++;
    else if (r.chroma.shipped > gm*1.33) over++;
    else near++;
  });
  console.log(`\nhalfway check vs geometric mean: near=${near} under=${under} over=${over} (of ${rows.length})`);
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
