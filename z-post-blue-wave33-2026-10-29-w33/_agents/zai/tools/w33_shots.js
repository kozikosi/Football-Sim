#!/usr/bin/env node
/* w33_shots.js — evidence: desktop + mobile screenshots and the mobile overflow sweep. */
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const OUT = '/home/z/my-project/football-sim/z-post-blue-wave33-2026-10-29-w33/_agents/zai/notes/evidence';
fs.mkdirSync(OUT, { recursive: true });
const FILE = 'file:///home/z/my-project/download/Football-Sim-Z-post-blue-w33.html';

(async () => {
  const browser = await chromium.launch({ headless: true });
  async function shot(name, width, height, steps, opts={}){
    const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: opts.mobile||false, hasTouch: opts.mobile||false });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    await page.goto(FILE); await page.waitForTimeout(1200);
    for(const s of (steps||[])){ try{ await s(page); }catch(e){ console.log('   step note for', name, e.message.slice(0,80)); } }
    // overflow measurement
    const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth));
    console.log(`   ${name}: ${width}x${height} overflow=${overflow}px ${errs.length? 'pageerrors:'+errs.length : ''}`);
    await page.screenshot({ path: path.join(OUT, name + '.png'), fullPage: false });
    await ctx.close();
    return overflow;
  }

  console.log('== desktop ==');
  await shot('w33-home', 1280, 900);
  await shot('w33-draft-setup', 1280, 900, [async p => { await p.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if(b) b.click(); }); await p.waitForTimeout(400); }]);
  await shot('w33-draft-live', 1280, 900, [async p => {
    await p.evaluate(() => { try{ startDraft2(); }catch(e){} }); await p.waitForTimeout(600);
    await p.evaluate(() => { try{ simToEnd(); }catch(e){} }); await p.waitForTimeout(900);
    await p.evaluate(() => { document.querySelectorAll('.zpb-replay-ov,.zpb-prematch,.zpb-fin').forEach(x=>x.remove()); const o=document.querySelector('.zpb-restov'); if(o) o.remove(); }); await p.waitForTimeout(300);
  }]);
  await shot('w33-draft-results', 1280, 900, [async p => {
    await p.evaluate(() => { try{ startDraft2(); }catch(e){} }); await p.waitForTimeout(400);
    await p.evaluate(() => { try{ simToEnd(); }catch(e){} }); await p.waitForTimeout(400);
    await p.evaluate(() => { try{ finishDraft2(); }catch(e){} }); await p.waitForTimeout(1200);
    await p.evaluate(() => { document.querySelectorAll('.zpb-replay-ov,.zpb-prematch,.zpb-restov,.zpb-fin').forEach(x=>x.remove()); }); await p.waitForTimeout(2600);
  }]);
  await shot('w33-season-review', 1280, 900, [async p => {
    await p.evaluate(() => { try{ startDraft2(); }catch(e){} }); await p.waitForTimeout(300);
    await p.evaluate(() => { try{ simToEnd(); }catch(e){} }); await p.waitForTimeout(300);
    await p.evaluate(() => { try{ startSeason(); simRestOfSeason(); }catch(e){} }); await p.waitForTimeout(1500);
    await p.evaluate(() => { document.querySelectorAll('.zpb-restov,.zpb-replay-ov,.zpb-prematch').forEach(x=>x.remove()); try{ seasonState.showReview = true; renderSeasonTab(document.body.lastElementChild); }catch(e){} }); await p.waitForTimeout(1600);
  }]);
  await shot('w33-comparison', 1280, 900, [async p => { await p.evaluate(() => { const b = document.getElementById('tabCompareBtn'); if(b) b.click(); }); await p.waitForTimeout(700); }]);
  await shot('w33-guide-map', 1280, 900, [async p => { await p.evaluate(() => { const b = document.getElementById('tabGuideBtn'); if(b) b.click(); }); await p.waitForTimeout(700);
    await p.evaluate(() => { const m = document.querySelector('.zpb-fm'); if(m) m.scrollIntoView({block:'center'}); }); await p.waitForTimeout(900); }]);
  await shot('w33-rankings', 1280, 900, [async p => { await p.evaluate(() => { const b = document.getElementById('tabGroupsBtn'); if(b) b.click(); }); await p.waitForTimeout(700); }]);
  await shot('w33-browser', 1280, 900, [async p => { await p.evaluate(() => { const b = document.getElementById('tabPlayersBtn'); if(b) b.click(); }); await p.waitForTimeout(700); }]);
  await shot('w33-playoff-bracket', 1280, 900, [async p => {
    await p.evaluate(() => { try{ startDraft2(); simToEnd(); startSeason(); }catch(e){} }); await p.waitForTimeout(400);
    await p.evaluate(() => { try{ simRestOfSeason(); startPlayoffs(); simulatePlayoffRound(); advancePlayoffRound(); simulatePlayoffRound(); advancePlayoffRound(); }catch(e){} }); await p.waitForTimeout(1200);
    await p.evaluate(() => { try{ renderSeasonTab(document.body.lastElementChild); }catch(e){} }); await p.waitForTimeout(600);
    await p.evaluate(() => { document.querySelectorAll('.zpb-replay-ov,.zpb-prematch,.zpb-restov,.zpb-fin').forEach(x=>x.remove()); }); await p.waitForTimeout(800);
    await p.evaluate(() => { const t = document.querySelector('.zpb-tree'); if(t) t.scrollIntoView({block:'center'}); }); await p.waitForTimeout(700);
  }]);

  console.log('== mobile (iPhone 14) ==');
  const m1 = await shot('w33-mobile-home', 390, 844, [], { mobile: true });
  const m2 = await shot('w33-mobile-players', 390, 844, [async p => { await p.evaluate(() => { const b = document.getElementById('tabPlayersBtn'); if(b) b.click(); }); await p.waitForTimeout(700); }], { mobile: true });
  const m3 = await shot('w33-mobile-rankings', 390, 844, [async p => { await p.evaluate(() => { const b = document.getElementById('tabGroupsBtn'); if(b) b.click(); }); await p.waitForTimeout(700); }], { mobile: true });
  const m4 = await shot('w33-mobile-draft', 390, 844, [async p => {
    await p.evaluate(() => { try{ startDraft2(); }catch(e){} }); await p.waitForTimeout(600);
    await p.evaluate(() => { try{ simToEnd(); }catch(e){} }); await p.waitForTimeout(800);
    await p.evaluate(() => { document.querySelectorAll('.zpb-replay-ov,.zpb-prematch,.zpb-restov,.zpb-fin').forEach(x=>x.remove()); }); await p.waitForTimeout(300);
  }], { mobile: true });
  const m5 = await shot('w33-mobile-results', 390, 844, [async p => {
    await p.evaluate(() => { try{ startDraft2(); simToEnd(); finishDraft2(); }catch(e){} }); await p.waitForTimeout(1200);
    await p.evaluate(() => { document.querySelectorAll('.zpb-replay-ov,.zpb-prematch,.zpb-restov,.zpb-fin').forEach(x=>x.remove()); }); await p.waitForTimeout(2600);
  }], { mobile: true });
  const mx = Math.max(m1, m2, m3, m4, m5);
  console.log(`\nMOBILE MAX OVERFLOW: ${mx}px (law: 0px)`);
  await browser.close();
  process.exit(0);
})().catch(e => { console.error('SHOTS FAIL', e); process.exit(1); });
