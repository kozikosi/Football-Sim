#!/usr/bin/env node
/* w34_shots.js — evidence: desktop + mobile screenshots and the mobile overflow sweep.
   Every w34 directive surface gets photographed: the footer-attached theme button, the
   guide numbers, the weights dropdown, the neutral browser/board, the lineups toggle at
   the top, and the APPLY THE CHANGES bar with a staged change. */
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const OUT = '/home/z/my-project/w34/evidence';
fs.mkdirSync(OUT, { recursive: true });
const FILE = 'file:///home/z/my-project/w34/Football-Sim-Z-post-blue-w34.html';

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell' });
  async function shot(name, width, height, steps, opts={}){
    const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: opts.mobile||false, hasTouch: opts.mobile||false });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    await page.goto(FILE); await page.waitForTimeout(1200);
    for(const s of (steps||[])){ try{ await s(page); }catch(e){ console.log('   step note for', name, e.message.slice(0,80)); } }
    const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth));
    console.log(`   ${name}: ${width}x${height} overflow=${overflow}px ${errs.length? 'pageerrors:'+errs.length : ''}`);
    await page.screenshot({ path: path.join(OUT, name + '.png'), fullPage: false });
    await ctx.close();
    return overflow;
  }
  const toFooter = async p => { await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(500); };

  console.log('== desktop ==');
  // R1: the theme button attached to the footer — homepage and two other pages
  await shot('w34-home-footer-theme', 1280, 900, [toFooter]);
  await shot('w34-rankings-footer-theme', 1280, 900, [async p => { await p.evaluate(() => document.getElementById('tabRankingsBtn').click()); await p.waitForTimeout(400); }, toFooter]);
  await shot('w34-guide-footer-theme', 1280, 900, [async p => { await p.evaluate(() => document.getElementById('tabGuideBtn').click()); await p.waitForTimeout(400); }, toFooter]);

  // R2: the guide player panels
  await shot('w34-guide-panels', 1280, 900, [async p => {
    await p.evaluate(() => document.getElementById('tabGuideBtn').click()); await p.waitForTimeout(400);
    await p.evaluate(() => { const h5 = [...document.querySelectorAll('.zpb-bdggrid h5')].find(x=>/On the player panels/.test(x.textContent)); if(h5) h5.scrollIntoView({block:'start'}); });
    await p.waitForTimeout(2400); // the slow fade breathes — let it land
  }]);

  // R3: the weights dropdown closed, then open
  await shot('w34-rankings-weights-closed', 1280, 900, [async p => {
    await p.evaluate(() => document.getElementById('tabRankingsBtn').click()); await p.waitForTimeout(500);
    await p.evaluate(() => { const el = document.getElementById('weightsDrop'); if(el) el.scrollIntoView({block:'start'}); });
    await p.waitForTimeout(600);
  }]);
  await shot('w34-rankings-weights-open', 1280, 900, [async p => {
    await p.evaluate(() => document.getElementById('tabRankingsBtn').click()); await p.waitForTimeout(500);
    await p.evaluate(() => { const el = document.getElementById('weightsDrop'); if(el) el.open = true; });
    await p.waitForTimeout(400);
    await p.evaluate(() => { const el = document.getElementById('weightsDrop'); if(el) el.scrollIntoView({block:'start'}); });
    await p.waitForTimeout(600);
  }]);

  // R4: the browser and the draft board in the neutral ink
  await shot('w34-browser-neutral', 1280, 900, [async p => {
    await p.evaluate(() => document.getElementById('tabPlayersBtn').click()); await p.waitForTimeout(500);
    await p.evaluate(() => window.scrollTo(0,0)); await p.waitForTimeout(300);
  }]);
  await shot('w34-draft-board-neutral', 1280, 900, [async p => {
    await p.evaluate(() => { try{ startDraft2(); }catch(e){} }); await p.waitForTimeout(900);
    await p.evaluate(() => { try{ processUntilUserTurn(); }catch(e){} }); await p.waitForTimeout(900);
    await p.evaluate(() => { document.querySelectorAll('.zpb-prematch, .zpb-replay-ov, .zpb-restov, .zpb-fin').forEach(x=>x.remove()); document.querySelectorAll('button').forEach(b=>{ if(/SKIP/i.test(b.textContent) && b.offsetParent) try{ b.click(); }catch(e){} }); }); await p.waitForTimeout(900);
    await p.evaluate(() => { document.querySelectorAll('.zpb-prematch, .zpb-replay-ov, .zpb-restov, .zpb-fin').forEach(x=>x.remove()); });
    await p.evaluate(() => window.scrollTo(0, 260)); await p.waitForTimeout(500);
  }]);

  // R5/R6: the lineups screen — toggle at the top, 4-3 then 3-4, then the staged apply bar
  const clearCine = async p => { await p.evaluate(() => {
    document.querySelectorAll('.zpb-prematch, .zpb-replay-ov, .zpb-restov, .zpb-fin').forEach(x=>x.remove());
    document.querySelectorAll('button').forEach(b=>{ if(/SKIP/i.test(b.textContent) && b.offsetParent) try{ b.click(); }catch(e){} });
  }); await p.waitForTimeout(600);
  await p.evaluate(() => { document.querySelectorAll('.zpb-prematch, .zpb-replay-ov, .zpb-restov, .zpb-fin').forEach(x=>x.remove()); }); await p.waitForTimeout(300);
  };
  const toPreseason = async p => {
    await p.evaluate(() => { try{ startDraft2(); }catch(e){} }); await p.waitForTimeout(600);
    await p.evaluate(() => { try{ simToEnd(); }catch(e){} }); await p.waitForTimeout(700);
    await p.evaluate(() => { try{ startSeason(); }catch(e){} }); await p.waitForTimeout(400);
    await p.evaluate(() => { try{ renderSeasonTab(document.getElementById('draftResultsBody')); }catch(e){} }); await p.waitForTimeout(900);
    await clearCine(p);
    await p.evaluate(() => { const el = document.getElementById('lineupPre'); if(el) el.closest('.panel').scrollIntoView(); });
    await p.waitForTimeout(500);
  };
  await shot('w34-lineups-toggle-43', 1280, 900, [toPreseason]);
  await shot('w34-lineups-toggle-34', 1280, 900, [toPreseason, async p => {
    await p.evaluate(() => { const b = document.querySelector('#zpbBaseToggleHost2 button[data-zbase="34"]'); if(b) b.click(); }); await p.waitForTimeout(900);
    await clearCine(p);
    await p.evaluate(() => { const el = document.getElementById('lineupPre'); if(el) el.closest('.panel').scrollIntoView(); });
    await p.waitForTimeout(500);
  }]);
  await shot('w34-lineups-apply-bar', 1280, 900, [toPreseason, async p => {
    await p.evaluate(() => { const b = document.querySelector('#zpbBaseToggleHost2 button[data-zbase="34"]'); if(b) b.click(); }); await p.waitForTimeout(900);
    await clearCine(p);
    await p.evaluate(() => {
      const rows = [...document.querySelectorAll('#lineupPre .depth-row')].map(r=>({slot: r.querySelector('.slotname') ? r.querySelector('.slotname').textContent : '', btn: r.querySelector('.zpb-pickbtn')}));
      const r1 = rows.find(x=>x.slot==='WR1' && x.btn), r2 = rows.find(x=>x.slot==='WR2' && x.btn);
      if(r1 && r2){ r1.btn.click(); setTimeout(()=>{ const w = r1.btn.closest('.zpb-pickwrap'); const opts = w ? [...w.querySelectorAll('.zpb-pickrow')] : []; const cur = r2.btn.textContent.trim(); const t = opts.find(o=>o.textContent.trim() && o.textContent.trim()!==cur && r2.btn.textContent.includes(cur)===false); const pick = t || opts[1]; if(pick) pick.click(); }, 200); }
    }); await p.waitForTimeout(1200);
    await p.evaluate(() => { const b = document.getElementById('lineupPreApplyChanges'); if(b) b.scrollIntoView({block:'center'}); });
    await p.waitForTimeout(500);
  }]);

  console.log('== mobile sweep (iPhone 14 · 390x844) ==');
  let worst = 0;
  worst = Math.max(worst, await shot('w34-m-home', 390, 844, [toFooter], {mobile:true}));
  worst = Math.max(worst, await shot('w34-m-rankings', 390, 844, [async p => { await p.evaluate(() => document.getElementById('tabRankingsBtn').click()); await p.waitForTimeout(400); }], {mobile:true}));
  worst = Math.max(worst, await shot('w34-m-browser', 390, 844, [async p => { await p.evaluate(() => document.getElementById('tabPlayersBtn').click()); await p.waitForTimeout(400); }], {mobile:true}));
  worst = Math.max(worst, await shot('w34-m-guide', 390, 844, [async p => { await p.evaluate(() => document.getElementById('tabGuideBtn').click()); await p.waitForTimeout(400); }], {mobile:true}));
  worst = Math.max(worst, await shot('w34-m-lineups', 390, 844, [toPreseason], {mobile:true}));
  console.log(`   worst mobile overflow: ${worst}px`);

  await browser.close();
  console.log('shots done ->', OUT);
})().catch(e => { console.error('SHOTS ERROR', e); process.exit(2); });
