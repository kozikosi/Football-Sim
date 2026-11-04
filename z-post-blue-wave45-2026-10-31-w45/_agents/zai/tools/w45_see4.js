#!/usr/bin/env node
/* w45_see4.js — stage-5 evidence, dbg2's proven shape: separate evaluates. */
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
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1400);
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await page.evaluate(() => { try{ zpbApplyTeamTheme('Kansas City Chiefs'); }catch(e){} });
    await page.waitForTimeout(300);
    await runInstantDraft(page);
    await page.evaluate(() => { try{ document.getElementById('resultsSeasonBtn').click(); }catch(e){} });
    await page.waitForTimeout(300);
    await page.evaluate(() => { try{ document.getElementById('beginSeasonBtn').click(); }catch(e){} });
    await page.waitForTimeout(5200);

    // eval 1: sim + pick a game with blocks (fallback: a close user game)
    const pick = await page.evaluate(() => {
      try{ simRestOfSeason(); }catch(e){}
      const u = seasonUserTeam();
      window.__zpbSilent = true; try{ document.querySelector('.zpb-replay-ov')?.remove(); }catch(e){}
      try{ document.querySelector('.zpb-restov')?.remove(); }catch(e){}
      const blk = seasonState.schedule.find(x=>x.played && x.detail && ((x.detail.home&&x.detail.home.blocks&&x.detail.home.blocks.length)||(x.detail.away&&x.detail.away.blocks&&x.detail.away.blocks.length)));
      const close = seasonState.schedule.find(x=>x.played && x.result && Math.abs(x.result.homeScore-x.result.awayScore)<=8 && (x.home===u||x.away===u) && x.result.homeEvents.length);
      const g = blk || close;
      return g ? { h:g.home, a:g.away } : null;
    });
    console.log(theme, 'evidence game:', JSON.stringify(pick));
    if(!pick){ await ctx.close(); continue; }

    // eval 2: open the replay (the intro plays)
    await page.evaluate(({h,a}) => {
      const u = seasonUserTeam();
      const g = seasonState.schedule.find(x=>x.played && x.home===h && x.away===a);
      window.__zpbSilent = false;
      try{ zpbGameReplay(g, u); }catch(e){}
    }, pick);
    await page.waitForTimeout(3400);
    await shot(page, `${OUT}/intro-stars-${theme}-w45.png`);

    // eval 3: skip intro, then skip the game, then sample the tails
    await page.evaluate(() => {
      const ov = document.querySelector('.zpb-replay-ov');
      const skip = ov && ov.querySelector('#zrepSkip'); if(skip) skip.click();
    });
    await page.waitForTimeout(1100);
    await page.evaluate(() => {
      const ov = document.querySelector('.zpb-replay-ov');
      const sk2 = ov && ov.querySelector('#zrepSkip'); if(sk2 && sk2.style.display!=='none') sk2.click();
    });
    await page.waitForTimeout(2400);
    await shot(page, `${OUT}/duringgame-end-${theme}-w45.png`);
    const tail = await page.evaluate(() => {
      const ov = document.querySelector('.zpb-replay-ov');
      if(!ov) return { gone:true };
      const lines = Array.from(ov.querySelectorAll('.zpb-rep-line')).filter(l=>l.className.includes('zrl-drive'));
      return { n:lines.length, samples:lines.slice(0,3).map(l=>l.textContent.trim().slice(0,60)) };
    });
    console.log(theme, 'tails:', JSON.stringify(tail));
    try{ await page.evaluate(() => { document.querySelector('.zpb-replay-ov')?.remove(); }); }catch(e){}
    await ctx.close();
  }
  await browser.close();
  console.log('stage5 done');
})().catch(e => { console.error('HARNESS ERROR', e.message); process.exit(1); });
