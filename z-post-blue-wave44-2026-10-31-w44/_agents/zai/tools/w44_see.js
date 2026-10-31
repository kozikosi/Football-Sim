#!/usr/bin/env node
/* w44_see.js — evidence screenshots: the halfway browser, the during-game header, the review. */
const { chromium } = require('/home/z/my-project/w41/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/boot/w44/Football-Sim-Z-post-blue-w44.html';
const OUT = '/home/z/my-project/boot/w44/evidence';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

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
  const browser = await chromium.launch({ headless: true, executablePath: exe });
  for (const theme of ['light','dark']) {
    const ctx = await browser.newContext({ viewport: { width: 1180, height: 860 } });
    const page = await ctx.newPage();
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1600);
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await page.evaluate(() => { try{ zpbApplyTeamTheme('Kansas City Chiefs'); }catch(e){} });
    await page.evaluate(() => { try{ document.getElementById('tabPlayersBtn').click(); }catch(e){} });
    await page.waitForTimeout(600);
    await page.evaluate(() => { const t = document.getElementById('playerTable'); if(t) t.scrollTop = 2600; });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/browser-${theme}-w44.png`, timeout: 12000 });

    // during-game header
    await runInstantDraft(page);
    await page.evaluate(() => { try{ document.getElementById('resultsSeasonBtn').click(); }catch(e){} });
    await page.waitForTimeout(400);
    await page.evaluate(() => { try{ document.getElementById('beginSeasonBtn').click(); }catch(e){} });
    await page.waitForTimeout(5600);
    await page.evaluate(() => { window.__zpbSilent = true; try{ document.querySelector('.zpb-replay-ov')?.remove(); }catch(e){} });
    await page.evaluate(() => { try{ simRestOfSeason(); }catch(e){} });
    await page.waitForTimeout(900);
    await page.evaluate(() => {
      window.__zpbSilent = false;
      const u = seasonUserTeam();
      const g = seasonState.schedule.find(x=>x.played && (x.home===u||x.away===u));
      zpbGameReplay(g, u);
    });
    await page.waitForTimeout(2200);
    await page.screenshot({ path: `${OUT}/duringgame-${theme}-w44.png`, timeout: 12000 });
    console.log('shots done', theme);
    await ctx.close();
  }
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
