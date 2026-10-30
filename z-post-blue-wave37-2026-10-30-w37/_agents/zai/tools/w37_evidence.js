#!/usr/bin/env node
/* w37_evidence.js — the remaining round-37 evidence shots: the awards rows (R9), the books
   overlay (R10), the champion top bar (R13), the unit report card (R14). */
const { chromium } = require('playwright-core');
const OUT = '/home/z/my-project/w37/notes/evidence';
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell' });
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  page.on('pageerror', e => console.log('PAGEERROR', e.message));
  await page.goto('file:///home/z/my-project/w37/Football-Sim-Z-post-blue-w37.html', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    try{
      startDraft2(); draftSpeed='instant'; try{ clearTimeout(slowTimer); }catch(e){}
      for(let g=0; g<6000 && draftSim.pos<draftSim.order.length; g++){
        const t = draftSim.order[draftSim.pos];
        if(t===draftSim.userIndex){ const r=draftSim.rosters[t]; if(firstOpenSlotAny(r)===null){draftSim.pos++;continue;}
          const nat=p=>(NATURAL_SLOT_MAP[p[1]]||[]).filter(s=>!r.slots[s]);
          let c=draftSim.pool.filter(p=>nat(p).length); if(!c.length) c=draftSim.pool.slice(); c.sort((a,b)=>b[3]-a[3]);
          const p=c[0], on=nat(p); const s=on.length?on[0]:ROSTER_SLOTS.find(s=>!r.slots[s]); executePick(draftSim.userIndex,p,s);
        } else { const pk=cpuPick(t); if(pk&&pk.slot) executePick(t,pk.player,pk.slot); else draftSim.pos++; }
      }
      draftSim.awaitingUser=false; finishDraft2();
    }catch(e){ console.log('ERR', String(e)); }
  });
  await page.waitForTimeout(900);
  // SIM SEASON through the books overlay — via the preseason BEGIN, then the week view
  await page.evaluate(() => { const b = document.getElementById('resultsSeasonBtn'); if(b) b.click(); });
  await page.waitForTimeout(600);
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if(b) b.click(); });
  await page.waitForTimeout(5400); // the SEASON OPENER veil clears
  await page.evaluate(() => { const o = document.querySelector('.zpb-prematch'); if(o) o.remove(); });
  await page.evaluate(() => { const b = document.getElementById('simSeasonBtn'); if(b) b.click(); });
  await page.waitForTimeout(250);
  await page.evaluate(() => { const y = [...document.querySelectorAll('.confirm-ov button')].find(b=>/YES/.test(b.textContent)); if(y) y.click(); });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: OUT+'/w37-books-honors-first.png' }); // R10: the honors on stage, the verdict still hidden
  await page.waitForTimeout(4200);
  await page.screenshot({ path: OUT+'/w37-books-verdict-risen.png' }); // the verdict after the honors
  await page.evaluate(() => { const g = document.getElementById('zpbRestGo'); if(g) g.click(); });
  await page.waitForTimeout(800);
  // the review page: honors lead the rail + the awards rows
  await page.evaluate(() => { try{ renderSeasonTab(document.getElementById('draftResultsBody')); }catch(e){} });
  await page.waitForTimeout(2500);
  const story = await page.evaluate(() => { const p = document.getElementById('zpbStoryPanel'); if(!p) return null; p.scrollIntoView(); return true; });
  await page.waitForTimeout(400);
  if (story) await page.screenshot({ path: OUT+'/w37-review-honors-first.png' }); // R10
  await page.evaluate(() => { const d = [...document.querySelectorAll('details.panel')].find(x=>/REGULAR-SEASON AWARDS/.test(x.textContent)); if(d){ d.open = true; d.scrollIntoView(); } });
  await page.waitForTimeout(500);
  await page.screenshot({ path: OUT+'/w37-awards-rows.png' }); // R9
  // the unit report card
  await page.evaluate(() => { const t = document.querySelector('.zpb-rc-title'); if(t) t.scrollIntoView({block:'center'}); });
  await page.waitForTimeout(2400);
  await page.screenshot({ path: OUT+'/w37-unit-report-card.png' }); // R14
  // playoffs straight to the champion page for the top bar
  await page.evaluate(() => {
    try{
      startPlayoffs();
      for(const rk of ['wildcard','divisional','champ']){ if(seasonState.phase!=='playoffs') break; simulatePlayoffRound(); const o=document.querySelector('.zpb-replay-ov'); if(o) o.remove(); advancePlayoffRound(); }
      simulatePlayoffRound();
    }catch(e){}
  });
  await page.waitForTimeout(900);
  await page.evaluate(() => { try{ renderSeasonTab(document.getElementById('draftResultsBody')); }catch(e){} });
  await page.waitForTimeout(600);
  await page.evaluate(() => { const c = [...document.querySelectorAll('.zpb-sbfin button, .zpb-sbfin .resetbtn')].find(b=>/CONTINUE/i.test(b.textContent)); if(c) c.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { const b = document.getElementById('seasonReviewBtn'); if(b) b.scrollIntoView({block:'center'}); });
  await page.waitForTimeout(400);
  await page.screenshot({ path: OUT+'/w37-champion-topbar.png' }); // R13
  await browser.close();
  console.log('evidence shots done');
})().catch(e => { console.error('DIED', e); process.exit(1); });
