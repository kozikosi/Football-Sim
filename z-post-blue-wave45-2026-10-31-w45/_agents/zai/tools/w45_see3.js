#!/usr/bin/env node
/* w45_see3.js — stage-5 only: the intro + the ending tails, fresh browser, isolated. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright/node_modules/playwright-core');
const FILE = 'file://' + process.cwd() + '/Football-Sim-Z-post-blue-w45.html';
const OUT = process.cwd() + '/evidence';
const fs = require('fs'); fs.mkdirSync(OUT, { recursive: true });
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const shot = async (page, path) => { try { await page.screenshot({ path, timeout: 15000 }); } catch (e) { console.log('   (shot skipped)'); } };
const runInstantDraft = async (page) => {
  await page.evaluate(() => {
    try{
      startDraft2(); draftSpeed='instant'; try{ clearTimeout(slowTimer); }catch(e){}
      for(let g=0; g<6000 && draftSim.pos < draftSim.order.length; g++){
        const t = draftSim.order[draftSim.pos];
        if(t === draftSim.userIndex){
          const roster = draftSim.rosters[t];
          if(firstOpenSlotAny(roster)===null){ draftSim.pos++; continue; }
          const nat = p => (NATURAL_SLOT_MAP[p[1]]||[]).filter(s=>!roster.slots[s]);
          let cands = draftSim.pool.filter(p=>nat(p).length); if(!cands.length) cands = draftSim.pool.slice();
          cands.sort((a,b)=>b[3]-a[3]); const p = cands[0]; const on = nat(p);
          executePick(draftSim.userIndex, p, on.length?on[0]:ROSTER_SLOTS.find(s=>!roster.slots[s]));
        } else { const pk = cpuPick(t); if(pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++; }
      }
      draftSim.awaitingUser = false;
      try{ if(draftFinalResults.style.display==='none') finishDraft2(); }catch(e){}
    }catch(e){}
  });
  await page.waitForTimeout(700);
};
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: exe, args: ['--disable-dev-shm-usage','--no-sandbox','--disable-gpu'] });
  for (const theme of ['light','dark']) {
    const ctx = await browser.newContext({ viewport: { width: 1180, height: 980 } });
    const page = await ctx.newPage();
    page.on('crash', ()=>console.log('!! PAGE CRASHED', theme));
    page.on('framenavigated', f=>{ if(f===page.mainFrame()) console.log('!! NAVIGATED to', f.url()); });
    page.on('console', m=>{ if(m.type()==='error') console.log('!! console error:', m.text().slice(0,120)); });
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1400);
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await page.evaluate(() => { try{ zpbApplyTeamTheme('Kansas City Chiefs'); }catch(e){} });
    await page.waitForTimeout(300);
    console.log('step: draft'); await runInstantDraft(page); console.log('step: draft done');
    console.log('step: results click'); await page.evaluate(() => { try{ document.getElementById('resultsSeasonBtn').click(); }catch(e){} });
    await page.waitForTimeout(300);
    console.log('step: begin click'); await page.evaluate(() => { try{ document.getElementById('beginSeasonBtn').click(); }catch(e){} });
    await page.waitForTimeout(5200);
    console.log('step: big evaluate');
    const res = await page.evaluate(() => new Promise(res => {
      const u = seasonUserTeam();
      try{ if(seasonState.schedule.filter(x=>x.played).length===0) simRestOfSeason(); }catch(e){}
      try{ window.__w45step='after sim'; }catch(e){}
      window.__zpbSilent = true; try{ document.querySelector('.zpb-replay-ov')?.remove(); }catch(e){}
      const close = seasonState.schedule.filter(x=>x.played && x.result && Math.abs(x.result.homeScore-x.result.awayScore)<=8 && (x.home===u||x.away===u) && x.result.homeEvents.length);
      const blk = seasonState.schedule.find(x=>x.played && x.detail && ((x.detail.home&&x.detail.home.blocks&&x.detail.home.blocks.length)||(x.detail.away&&x.detail.away.blocks&&x.detail.away.blocks.length)));
      const g = blk || close[0]; if(!g){ res({err:'no game'}); return; }
      window.__zpbSilent = false;
      try{ zpbGameReplay(g, u); }catch(err){ res({err:err.message}); return; }
      setTimeout(()=>{
        shot(page, `${OUT}/intro-stars-${theme}-w45.png`).then(()=>{
          const ov = document.querySelector('.zpb-replay-ov');
          const skip = ov && ov.querySelector('#zrepSkip'); if(skip) skip.click();
          setTimeout(()=>{ const ov1b = document.querySelector('.zpb-replay-ov'); const sk2 = ov1b && ov1b.querySelector('#zrepSkip'); if(sk2 && sk2.style.display!=='none') sk2.click();
            setTimeout(()=>{
              shot(page, `${OUT}/duringgame-end-${theme}-w45.png`).then(()=>{ try{ document.querySelector('.zpb-replay-ov')?.remove(); }catch(e){} res({done:true}); });
            }, 2400);
          }, 1100);
        });
      }, 3000);
    }));
    console.log(theme, 'intro/tails shots:', JSON.stringify(res));
    await ctx.close();
  }
  await browser.close();
  console.log('stage5 done');
})().catch(e => { console.error('HARNESS ERROR', e.message); process.exit(1); });
