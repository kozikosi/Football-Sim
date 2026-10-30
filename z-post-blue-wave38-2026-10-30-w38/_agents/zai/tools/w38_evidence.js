#!/usr/bin/env node
/* w38_evidence.js — the round-38 evidence shots: the Dime bubble on the map (R4), the pregame
   panels + pairs (R7/R8), the ONE skip button (R12), the review hold under the books (R10),
   the award panels gold + badges + vertical (R18/19/20), the tree seeds (R16), the advanced
   cards two rows + the new stats (R21/22), the report-card tile (R17). */
const { chromium } = require('playwright-core');
const OUT = '/home/z/my-project/w38/notes/evidence';
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell' });
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  page.on('pageerror', e => console.log('PAGEERROR', e.message));
  await page.goto('file:///home/z/my-project/w38/Football-Sim-Z-post-blue-w38.html', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(2600);
  await page.evaluate(() => {
    try{
      const sel = document.getElementById('teamSel') || document.querySelector('#draftSetup select');
      const opt = sel && [...sel.options].find(o=>/Kansas City Chiefs/.test(o.textContent));
      if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', {bubbles:true})); }
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
  await page.waitForTimeout(1000);
  // R4: the review map with the Dime bubble
  await page.evaluate(() => { const m = document.querySelector('.zpb-fm'); if(m) m.scrollIntoView({block:'center'}); });
  await page.waitForTimeout(7500); // the cinematic hold clears, the bubbles land
  await page.screenshot({ path: OUT+'/w38-map-dime.png' });
  // the season: the week-1 pregame with the ONE skip button and the panel pairs
  await page.evaluate(() => { const b = document.getElementById('resultsSeasonBtn'); if(b) b.click(); });
  await page.waitForTimeout(600);
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if(b) b.click(); });
  await page.waitForTimeout(1200);
  await page.evaluate(() => {
    try{
      const S = seasonState, u = seasonUserTeam();
      const g = S.schedule.find(g=>g.week===S.currentWeek && (g.home===u||g.away===u));
      playGame(g, true); zpbGameReplay(g, u);
    }catch(e){ console.log('ERR2', String(e)); }
  });
  await page.waitForTimeout(2600); // the first star pair is up
  await page.evaluate(() => { const o = document.querySelector('.zpb-replay-ov'); if(o) o.scrollIntoView(); });
  await page.waitForTimeout(300);
  await page.screenshot({ path: OUT+'/w38-pregame-panels.png' }); // R7/R8: the pairs in their panels
  await page.evaluate(() => { const o = document.querySelector('.zpb-replay-ov'); if(o) o.remove(); });
  // SIM SEASON through the books: the held rail, then the review
  await page.evaluate(() => { const b = document.getElementById('simSeasonBtn'); if(b) b.click(); });
  await page.waitForTimeout(250);
  await page.evaluate(() => { const y = [...document.querySelectorAll('.confirm-ov button')].find(b=>/YES/.test(b.textContent)); if(y) y.click(); });
  await page.waitForTimeout(1400);
  await page.screenshot({ path: OUT+'/w38-books-honors.png' }); // R10: the Honors earned cinematic
  await page.evaluate(() => { const g = document.getElementById('zpbRestGo'); if(g) g.click(); });
  await page.waitForTimeout(4200); // the badge cascade plays
  await page.evaluate(() => { const p = document.getElementById('zpbStoryPanel'); if(p) p.scrollIntoView({block:'center'}); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: OUT+'/w38-review-cards.png' }); // R10: the cards after the Continue
  // the advanced cards + the report card tile live on the Season Review branch
  await page.evaluate(() => {
    try{
      startPlayoffs();
      for(const rk of ['wildcard','divisional','champ']){ if(seasonState.phase!=='playoffs') break; simulatePlayoffRound(); const o=document.querySelector('.zpb-replay-ov'); if(o) o.remove(); advancePlayoffRound(); }
      simulatePlayoffRound();
      renderSeasonTab(document.getElementById('draftResultsBody'));
    }catch(e){ console.log('ERR3', String(e)); }
  });
  await page.waitForTimeout(900);
  await page.evaluate(() => { const c = document.querySelector('.zpb-sbfin button'); if(c) c.click(); });
  await page.waitForTimeout(600);
  await page.screenshot({ path: OUT+'/w38-champion-page.png' }); // R14: the badges cascading after the Continue
  await page.evaluate(() => { const b = document.getElementById('seasonReviewBtn'); if(b) b.click(); });
  await page.waitForTimeout(4200);
  await page.evaluate(() => { const t = document.querySelector('.zpb-rc-title'); if(t) t.scrollIntoView({block:'center'}); });
  await page.waitForTimeout(2600);
  await page.screenshot({ path: OUT+'/w38-report-card.png' }); // R17: the tile reads OVR · #rank
  await page.evaluate(() => { const d = [...document.querySelectorAll('details.panel')].find(x=>/REGULAR-SEASON AWARDS/.test(x.textContent)); if(d){ d.open = true; d.scrollIntoView(); } });
  await page.waitForTimeout(600);
  await page.screenshot({ path: OUT+'/w38-awards-gold.png' }); // R20: the gold rows
  await page.evaluate(() => {
    const h = [...document.querySelectorAll('.panel h3, .panel h4')].find(x=>/Playoff Awards/i.test(x.textContent));
    if(h) h.scrollIntoView({block:'start'});
  });
  await page.waitForTimeout(2200);
  await page.screenshot({ path: OUT+'/w38-playoff-awards.png' }); // R18/19: the vertical panels with badges
  await page.evaluate(() => { const b = document.getElementById('backToSbBtn'); if(b) b.click(); });
  await page.waitForTimeout(600);
  await page.evaluate(() => { const t = document.querySelector('.zpb-tree'); if(t) t.scrollIntoView({block:'center'}); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: OUT+'/w38-tree-seeds.png' }); // R16: the seeds lead
  // the advanced stats grid
  await page.evaluate(() => {
    const t = document.querySelector('.zpb-advgrid');
    if(t) t.closest('.panel').scrollIntoView({block:'start'});
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: OUT+'/w38-advanced-cards.png' }); // R21/22
  await browser.close();
  console.log('evidence shots done');
})().catch(e => { console.error('DIED', e); process.exit(1); });
