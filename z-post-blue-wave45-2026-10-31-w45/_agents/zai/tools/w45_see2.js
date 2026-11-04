#!/usr/bin/env node
/* w45_see2.js — evidence screenshots for the w45 package. */
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
    await page.evaluate(() => { window.__zpbSilent = true; try{ document.querySelector('.zpb-replay-ov')?.remove(); }catch(e){} try{ document.querySelector('.zpb-restov')?.remove(); }catch(e){} });
    await page.waitForTimeout(400);

    // 1. the home hub (matchup card + preview strip + player cards)
    await shot(page, `${OUT}/hub-${theme}-w45.png`);

    // 2. the comparison dropdowns OPEN (the halfway options)
    await page.evaluate(() => {
      const sel = document.getElementById('homeCmpB');
      const wrap = sel && sel.closest('.zpb-selwrap');
      const btn = wrap && wrap.querySelector('.zpb-selbtn');
      if(btn) btn.click();
    });
    await page.waitForTimeout(500);
    await page.evaluate(() => {
      const sel = document.getElementById('homeCmpB');
      const wrap = sel && sel.closest('.zpb-selwrap');
      if(wrap) wrap.style.position='relative';
      const host = document.getElementById('homeCmpResult');
      if(host) host.scrollIntoView({block:'start'});
    });
    await page.waitForTimeout(300);
    await shot(page, `${OUT}/dropdown-open-${theme}-w45.png`);
    await page.evaluate(() => { document.querySelectorAll('.zpb-selwrap.open').forEach(w=>w.classList.remove('open')); });

    // 3. the comparison lineup table (the once-faded cells) — Chiefs vs Raiders
    const cmp = await page.evaluate(() => {
      try{
        const host = document.getElementById('homeCmpResult');
        const selA = document.getElementById('homeCmpA'), selB = document.getElementById('homeCmpB');
        if(selA && selB){ selA.value='Kansas City Chiefs'; selB.value='Las Vegas Raiders'; selA.dispatchEvent(new Event('change',{bubbles:true})); }
        if(host) host.scrollIntoView({block:'start'});
        return true;
      }catch(e){ return e.message; }
    });
    await page.waitForTimeout(900);
    await shot(page, `${OUT}/lineup-compare-${theme}-w45.png`);

    // 4. the box score (review of the user's week-1 game) — the dot + halfway scores
    await page.evaluate(() => {
      try{ simRestOfSeason(); }catch(e){}
      window.__zpbSilent = true; try{ document.querySelector('.zpb-restov')?.remove(); }catch(e){}
      const u = seasonUserTeam();
      const g = seasonState.schedule.find(x=>x.played && (x.home===u||x.away===u));
      const host = document.createElement('div');
      host.innerHTML = renderGameResultHTML(g, u);
      host.style.cssText='position:fixed;inset:auto 0 0 0;z-index:200;background:var(--bg);padding:10px 20px;max-height:70%;overflow:auto;';
      host.id='w45boxhost'; document.body.appendChild(host);
    });
    await page.waitForTimeout(600);
    await shot(page, `${OUT}/boxscore-${theme}-w45.png`);
    await page.evaluate(() => { const h=document.getElementById('w45boxhost'); if(h) h.remove(); });

    await ctx.close();
    try{ await browser.close(); }catch(e){}

    // 5. the pregame intro (one size) + the ending tails — fresh browser
    const browser2 = await chromium.launch({ headless: true, executablePath: exe, args: ['--disable-dev-shm-usage','--no-sandbox','--disable-gpu'] });
    const ctx2 = await browser2.newContext({ viewport: { width: 1180, height: 980 } });
    const page2 = await ctx2.newPage();
    await page2.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page2.waitForTimeout(1400);
    await page2.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await page2.evaluate(() => { try{ zpbApplyTeamTheme('Kansas City Chiefs'); }catch(e){} });
    await page2.waitForTimeout(300);
    await runInstantDraft(page);
    await page2.evaluate(() => { try{ document.getElementById('resultsSeasonBtn').click(); }catch(e){} });
    await page2.waitForTimeout(300);
    await page2.evaluate(() => { try{ document.getElementById('beginSeasonBtn').click(); }catch(e){} });
    await page2.waitForTimeout(5200);
    const res = await page2.evaluate(() => new Promise(res => {
      const u = seasonUserTeam();
      try{ if(seasonState.schedule.filter(x=>x.played).length===0) simRestOfSeason(); }catch(e){}
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
    await ctx2.close();
    try{ await browser2.close(); }catch(e){}
  }
  console.log('evidence done');
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(1); });
