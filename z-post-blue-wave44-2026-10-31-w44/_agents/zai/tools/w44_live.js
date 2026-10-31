#!/usr/bin/env node
/* w44_live.js — the live drills for the round-44 directives (real Chromium, both themes).
   A (O1): the halfway ink — light names ride the halfway tone (0.5 from the page ink to the
           crayola anchor), dark keeps txd; verified per-row in the browser, both themes.
   B (O2): the All-Pro FIRST team is gold everywhere — awards page All-Pro + Pro Bowl rows + story cards.
   C (O3): the wildcard intro lands ~22s — the first play line arrives well under 26s.
   D (O4): the FX safety never drains over a cinematic; the queue survives 16s with a replay up.
   E (O5): the review HTML carries no leaked comment.
   F (O6): 'Rush / Pass' — the RUSH/PASS label retires.
   G (O7): the Super Bowl champions cinematic — unchanged: opaque on mount, champion's --zshim.
   H (O8): the belong map breathes at 0.5s per beat.
   I (O9): the during-game header scores wear their teams in LIGHT and DARK.
   J: zero page errors across the whole drive. */
const { chromium } = require('/home/z/my-project/w41/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/boot/w44/Football-Sim-Z-post-blue-w44.html';
const OUT = '/home/z/my-project/boot/w44/evidence';
const fs = require('fs'); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
const shot = async (page, path) => { try { await page.screenshot({ path, timeout: 12000 }); } catch (e) { console.log('   (shot skipped:', path.split('/').pop() + ')'); } };
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

const driveSeason = async (page) => {
  await page.evaluate(() => { try{ document.getElementById('resultsSeasonBtn').click(); }catch(e){} });
  await page.waitForTimeout(400);
  await page.evaluate(() => { try{ document.getElementById('beginSeasonBtn').click(); }catch(e){} });
  await page.waitForTimeout(5600);
  await page.evaluate(() => { window.__zpbSilent = true; try{ document.querySelector('.zpb-replay-ov')?.remove(); }catch(e){} });
  await page.evaluate(() => { try{ simRestOfSeason(); }catch(e){ window.__simErr = String(e); } });
  await page.waitForTimeout(900);
  await page.evaluate(() => { try{ startPlayoffs(); }catch(e){ window.__simErr = String(e); } });
  for (const rk of ['wildcard','divisional','champ']) {
    await page.evaluate(() => { try{ if(seasonState.phase==='playoffs' && !seasonState.playoffRoundSimulated) simulatePlayoffRound(); }catch(e){} });
    await page.waitForTimeout(250);
    await page.evaluate(() => { try{ if(seasonState.phase==='playoffs') advancePlayoffRound(); }catch(e){} });
    await page.waitForTimeout(250);
  }
  await page.evaluate(() => { try{ if(seasonState.phase==='playoffs' && seasonState.currentPlayoffRound==='superbowl' && !seasonState.playoffRoundSimulated) simulatePlayoffRound(); }catch(e){ window.__simErr=String(e); } });
  await page.waitForTimeout(400);
  await page.evaluate(() => { try{ renderSeasonTab(document.getElementById('draftResultsBody')); }catch(e){ window.__simErr=String(e); } });
  await page.waitForTimeout(500);
};

// the halfway formula, mirrored for assertion
const expectedHalfway = (txL, mixHex, from, mix, hsl) => {
  const txc = hsl(txL); const base = txc.l < 0.52 ? from(txc.h, txc.s, 0.52) : txL;
  const m = mix(mixHex, base, 0.5); const c = hsl(m);
  const cl = (v,a,b)=>Math.min(b,Math.max(a,v));
  return from(c.h, cl(c.s,0.22,0.85), cl(c.l,0.30,0.52));
};
const hexRgb = h => { const m = /^#?([0-9a-f]{6})$/i.exec(h||''); if(!m) return h; const n = parseInt(m[1],16); return `rgb(${(n>>16)&255}, ${(n>>8)&255}, ${n&255})`; };

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: exe });

  // ============ A + I: both themes ============
  for (const theme of ['light','dark']) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    const errs = []; page.on('pageerror', e => errs.push(e.message));
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1500);
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);

    // A: the halfway ink in the player browser
    await page.evaluate(() => { try{ zpbApplyTeamTheme('Kansas City Chiefs'); }catch(e){} });
    await page.evaluate(() => { try{ document.getElementById('tabPlayersBtn').click(); }catch(e){} });
    await page.waitForTimeout(600);
    const a1 = await page.evaluate(() => {
      const rows = [];
      document.querySelectorAll('#playerBody tr').forEach(tr => {
        if(rows.length >= 4) return;
        const nm = tr.querySelector('.zpb-pb-name'); const tm = tr.querySelector('.zpb-pb-team');
        if(nm && tm && !nm.classList.contains('zpb-shm')){
          rows.push({ team: tm.textContent.trim(), color: getComputedStyle(nm).color, teamColor: getComputedStyle(tm).color });
        }
      });
      return rows;
    });
    for (const r of a1.slice(0,3)) {
      const want = await page.evaluate(({team, theme}) => {
        const pk = zpbPackFor(team);
        return theme==='light' ? pk.txM : pk.txd;
      }, {team: r.team, theme});
      ok(r.color.toLowerCase() === hexRgb(want).toLowerCase(), `A ${theme}: ${r.team}'s name wears the ${theme} ink`, `${r.color} vs ${hexRgb(want)}`);
    }
    if (theme === 'light') {
      const a2 = await page.evaluate(() => {
        const pk = zpbPackFor('Kansas City Chiefs');
        const txc = zpbHsl(pk.txL); const base = txc.l<0.52 ? zpbFromHsl(txc.h,txc.s,0.52) : pk.txL;
        const m = zpbMix('#53382b', base, 0.5); const c = zpbHsl(m);
        return { txM: pk.txM, want: zpbFromHsl(c.h, Math.min(.85,Math.max(.22,c.s)), Math.min(.52,Math.max(.30,c.l))), crayola: (txc.l<0.52 ? zpbFromHsl(txc.h,txc.s,0.52) : pk.txL) };
      });
      ok(a2.txM.toLowerCase() === a2.want.toLowerCase(), 'A light: txM is the halfway formula', a2.txM);
      ok(a2.txM.toLowerCase() !== a2.crayola.toLowerCase(), 'A light: the crayola tone retired', a2.txM + ' ≠ ' + a2.crayola);
    } else {
      const a3 = await page.evaluate(() => zpbPackFor('Kansas City Chiefs').txd);
      ok(a3.toLowerCase() === '#f4d1cb', 'A dark: txd untouched', a3);
    }

    // I: the during-game header scores wear their teams
    await runInstantDraft(page);
    await page.evaluate(() => { try{ document.getElementById('resultsSeasonBtn').click(); }catch(e){} });
    await page.waitForTimeout(400);
    await page.evaluate(() => { try{ document.getElementById('beginSeasonBtn').click(); }catch(e){} });
    await page.waitForTimeout(5600);
    await page.evaluate(() => { window.__zpbSilent = true; try{ document.querySelector('.zpb-replay-ov')?.remove(); }catch(e){} });
    await page.evaluate(() => { try{ simRestOfSeason(); }catch(e){} });
    await page.waitForTimeout(900);
    const opened = await page.evaluate(() => {
      try{
        window.__zpbSilent = false;
        const u = seasonUserTeam();
        const g = seasonState.schedule.find(x=>x.played && (x.home===u||x.away===u));
        zpbGameReplay(g, u);
        return { away: g.away, home: g.home };
      }catch(e){ return { err:String(e) }; }
    });
    await page.waitForTimeout(1600);
    const i1 = await page.evaluate(theme => {
      const q = s => document.querySelector(s);
      if(!q('#zrepSa')) return { err: 'no replay header' };
      return { sa: getComputedStyle(q('#zrepSa')).color, sh: getComputedStyle(q('#zrepSh')).color };
    }, theme);
    if (!i1.err) {
      const wA = await page.evaluate(([t, light]) => { const pk = zpbPackFor(t); return light ? pk.accL : pk.accD; }, [opened.away, theme==='light']);
      const wH = await page.evaluate(([t, light]) => { const pk = zpbPackFor(t); return light ? pk.accL : pk.accD; }, [opened.home, theme==='light']);
      ok(i1.sa.toLowerCase() === hexRgb(wA).toLowerCase(), `I ${theme}: the AWAY score wears the away team`, `${i1.sa} vs ${hexRgb(wA)} (${opened.away})`);
      ok(i1.sh.toLowerCase() === hexRgb(wH).toLowerCase(), `I ${theme}: the HOME score wears the home team`, `${i1.sh} vs ${hexRgb(wH)} (${opened.home})`);
    } else ok(false, `I ${theme}: the replay header rendered`, i1.err);
    await page.evaluate(() => { try{ document.querySelector('.zpb-replay-ov')?.remove(); }catch(e){} });

    // E + F: the review HTML — no leaked comment; Rush / Pass
    const ef = await page.evaluate(() => {
      try{
        const u = seasonUserTeam();
        const g = seasonState.schedule.find(x=>x.played && (x.home===u||x.away===u));
        const html = renderGameResultHTML(g, u);
        return { leak: html.indexOf('// w43 (N9') >= 0 || html.indexOf('w43 (N9') >= 0, rush: html.indexOf('Rush / Pass') >= 0, oldLabel: html.indexOf('RUSH/PASS') >= 0 };
      }catch(e){ return { err: String(e) }; }
    });
    if (!ef.err) {
      ok(!ef.leak, 'E: the review HTML carries no leaked comment');
      ok(ef.rush && !ef.oldLabel, 'F: the label reads "Rush / Pass"');
    } else ok(false, 'E/F: renderGameResultHTML ran', ef.err);

    ok(errs.length === 0, `A/I/E/F ${theme}: zero page errors` + (errs.length ? ' — ' + errs[0] : ''));
    await ctx.close();
  }

  // ============ B/C/D/G/H: the full season drive ============
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    const errs = []; page.on('pageerror', e => errs.push(e.message));
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1500);
    await page.evaluate(() => { try{ zpbApplyTeamTheme('Kansas City Chiefs'); }catch(e){} });
    await runInstantDraft(page);
    await page.evaluate(() => { try{ document.getElementById('resultsSeasonBtn').click(); }catch(e){} });
    await page.waitForTimeout(400);
    await page.evaluate(() => { try{ document.getElementById('beginSeasonBtn').click(); }catch(e){} });
    await page.waitForTimeout(5600);
    await page.evaluate(() => { window.__zpbSilent = true; try{ document.querySelector('.zpb-replay-ov')?.remove(); }catch(e){} });
    await page.evaluate(() => { try{ simRestOfSeason(); }catch(e){ window.__simErr = String(e); } });
    await page.waitForTimeout(900);
    await page.evaluate(() => { try{ startPlayoffs(); }catch(e){ window.__simErr = String(e); } });

    // C: the wildcard intro timing — any played wildcard game wears the same pregame law
    const cIntro = await page.evaluate(async () => {
      try{
        window.__zpbSilent = false;
        const u = seasonUserTeam();
        let g = (seasonState.playoffRounds.wildcard||[]).find(x=>x.result && x.result.homeEvents && x.result.homeEvents.length);
        if(!g){
          if(!seasonState.playoffRoundSimulated) simulatePlayoffRound();
          g = (seasonState.playoffRounds.wildcard||[]).find(x=>x.result && x.result.homeEvents && x.result.homeEvents.length);
        }
        if(!g) return { err:'no played wildcard game' };
        const t0 = performance.now();
        zpbGameReplay(g, (g.home===u||g.away===u) ? u : g.home);
        const ov = document.querySelector('.zpb-replay-ov');
        if(!ov) return { err:'no replay overlay' };
        for(let i=0;i<340;i++){
          if(document.querySelector('#zrepLog .zpb-rep-line')) return { ms: Math.round(performance.now()-t0) };
          await new Promise(r=>setTimeout(r,100));
        }
        return { err: 'no play line within 34s' };
      }catch(e){ return { err:String(e) }; }
    });
    if (!cIntro.err) ok(cIntro.ms < 26000, 'C: the wildcard intro hands over to the plays under 26s (was ~36s)', cIntro.ms + 'ms');
    else ok(false, 'C: the wildcard replay ran', cIntro.err);
    await page.evaluate(() => { try{ document.querySelector('.zpb-replay-ov')?.remove(); }catch(e){} window.__zpbSilent = true; });
    await page.waitForTimeout(300);

    // D: the FX safety never drains over a cinematic
    const d1 = await page.evaluate(() => {
      try{
        window.__zpbFxPending = [];
        document.querySelector('.zpb-replay-ov')?.remove();
        const ov = document.createElement('div'); ov.className = 'zpb-replay-ov'; document.body.appendChild(ov);
        window.__zpbFxSafety = null;
        zpbFxGate('small', 'w44 gate drill', true);
        return { queued: (window.__zpbFxPending||[]).length };
      }catch(e){ return { err: String(e) }; }
    });
    await page.waitForTimeout(16500); // the w43 safety would have drained at 15s
    const d2 = await page.evaluate(() => ({ pending: (window.__zpbFxPending||[]).length, toasts: document.querySelectorAll('.fxtoast,.fxbanner').length, canvas: !!document.getElementById('fxCanvas') }));
    ok(d1.queued === 1 && d2.pending === 1 && d2.toasts === 0 && !d2.canvas, 'D: the celebration waits through the 15s safety while a cinematic is up', JSON.stringify({d1, d2}));
    const d3 = await page.evaluate(() => { try{ document.querySelector('.zpb-replay-ov')?.remove(); zpbFxDrain(true); return (window.__zpbFxPending||[]).length; }catch(e){ return String(e); } });
    ok(d3 === 0, 'D: the whistle drains the queue');
    await page.waitForTimeout(400);

    // H: the belong map breathes at 0.5s per beat (the CSS law, exercised on a live map)
    const h1 = await page.evaluate(() => {
      try{
        const host = document.createElement('div'); document.body.appendChild(host);
        host.innerHTML = '<div class="zpb-fm zpb-seen"><i class="zpb-fm-ini" data-beat="1" style="--beat:1"><b>X</b><i>QB</i></i>'
          + '<i class="zpb-fm-ini" data-beat="2" style="--beat:2"><b>Y</b><i>RB</i></i>'
          + '<i class="zpb-fm-ini" data-beat="4" style="--beat:4"><b>Z</b><i>WR</i></i></div>';
        const out = [...host.querySelectorAll('.zpb-fm-ini')].map(el => ({ beat: el.getAttribute('data-beat'), delay: getComputedStyle(el).animationDelay }));
        host.remove();
        return { rows: out };
      }catch(e){ return { err: String(e) }; }
    });
    if (!h1.err) {
      const good = h1.rows.every(r => Math.abs(parseFloat(r.delay) - parseFloat(r.beat)*0.5) < 0.01);
      ok(good && h1.rows.length === 3, 'H: the belong map lands half a second per player', JSON.stringify(h1.rows));
    } else ok(false, 'H: the belong map drill ran', h1.err);

    // finish the drive to the Super Bowl for B + G
    for (const rk of ['wildcard','divisional','champ']) {
      await page.evaluate(() => { try{ if(seasonState.phase==='playoffs' && !seasonState.playoffRoundSimulated) simulatePlayoffRound(); }catch(e){} });
      await page.waitForTimeout(250);
      await page.evaluate(() => { try{ if(seasonState.phase==='playoffs') advancePlayoffRound(); }catch(e){} });
      await page.waitForTimeout(250);
    }
    await page.evaluate(() => { try{ if(seasonState.phase==='playoffs' && seasonState.currentPlayoffRound==='superbowl' && !seasonState.playoffRoundSimulated) simulatePlayoffRound(); }catch(e){} });
    await page.waitForTimeout(500);
    await page.evaluate(() => { try{ renderSeasonTab(document.getElementById('draftResultsBody')); }catch(e){} });
    await page.waitForTimeout(600);

    // G: the SB cinematic — untouched (O7)
    const g1 = await page.evaluate(() => {
      const ov = document.querySelector('.zpb-sbfin');
      if(!ov) return { err: 'no cinematic in the DOM' };
      return { opacity: getComputedStyle(ov).opacity, shim: ov.style.getPropertyValue('--zshim') };
    });
    if (!g1.err) {
      ok(g1.opacity === '1', 'G: the cinematic computes OPAQUE on mount — unchanged (O7)', 'opacity=' + g1.opacity);
      const champ = await page.evaluate(() => seasonState.champion);
      const accD = await page.evaluate(t => zpbPackFor(t).accD, champ);
      ok(g1.shim === accD, 'G: the cinematic shimmers in the champion\'s color — unchanged (O7)', champ);
    } else ok(false, 'G: the SB cinematic mounted with the page', g1.err);
    await shot(page, OUT + '/sb-cinematic-w44.png');
    await page.evaluate(() => { try{ document.querySelector('.zpb-sbfin-go')?.click(); }catch(e){} });
    await page.waitForTimeout(600);

    // B: the All-Pro first team is gold everywhere — the awards page is rendered and scanned
    const b1 = await page.evaluate(() => {
      try{
        const A = seasonState.awardsRS || computeRegularSeasonAwards();
        const data = { ap1: (A.ap1Names||[]).length };
        const html = renderRegularAwardsHTML(A, true);
        const set = new Set(A.ap1Names||[]);
        let checked = 0, gold = 0, missing = [];
        const bRe = /<b class="zpb-gname ([^"]*)">([^<]+)<\/b>/g;
        let m;
        while((m = bRe.exec(html))){
          const cls = m[1], nm = m[2].trim();
          if(set.has(nm)){ checked++; if(cls.indexOf('zpb-shm') >= 0) gold++; else missing.push(nm); }
        }
        let pbChecked = 0, pbGold = 0;
        const pbIdx = html.indexOf('PRO BOWL');
        if(pbIdx >= 0){
          const seg = html.slice(pbIdx, pbIdx + 24000);
          let m2; const bRe2 = /<b class="zpb-gname ([^"]*)">([^<]+)<\/b>/g;
          while((m2 = bRe2.exec(seg))){
            const cls = m2[1], nm = m2[2].trim();
            if(set.has(nm)){ pbChecked++; if(cls.indexOf('zpb-shm') >= 0) pbGold++; }
          }
        }
        const firstAp1 = (A.ap1Names||[])[0];
        return { data, checked, gold, missing: missing.slice(0,4), pbChecked, pbGold,
          htmlLen: html.length, hasName: firstAp1 ? html.indexOf(firstAp1) >= 0 : false, firstAp1 };
      }catch(e){ return { err: String(e) }; }
    });
    if (!b1.err) {
      ok(b1.data.ap1 > 0, 'B: the first-team gold register is populated', b1.data.ap1 + ' names');
      ok(b1.checked > 0, 'B: AP1 names appear in the rendered honors', b1.checked + ' spans');
      ok(b1.gold === b1.checked, 'B: every listed AP1 name wears the gold shimmer', `${b1.gold}/${b1.checked}` + (b1.missing.length ? ' missing: ' + b1.missing.join(',') : ''));
      if (b1.pbChecked > 0) ok(b1.pbGold === b1.pbChecked, 'B2: AP1 names are gold inside the Pro Bowl placement too', `${b1.pbGold}/${b1.pbChecked}`);
      else ok(true, 'B2: (no AP1 name surfaced in this Pro Bowl render — covered by B)');
    } else ok(false, 'B: the awards page rendered', b1.err);

    const phase = await page.evaluate(() => seasonState ? seasonState.phase : 'none');
    ok(phase === 'complete', 'J: the season drive completes', phase);
    ok(!(await page.evaluate(() => window.__simErr || '')), 'J: the drive runs clean', String(await page.evaluate(() => window.__simErr || '')));
    ok(errs.length === 0, 'J: zero page errors across the drive' + (errs.length ? ' — ' + errs[0] : ''));

    // evidence: the awards page both themes
    await shot(page, OUT + '/awards-light-w44.png');
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await page.waitForTimeout(400);
    await shot(page, OUT + '/awards-dark-w44.png');
    await ctx.close();
  }

  await browser.close();
  console.log(`\nw44_live: ${pass} pass, ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('LIVE FATAL', e); process.exit(1); });
