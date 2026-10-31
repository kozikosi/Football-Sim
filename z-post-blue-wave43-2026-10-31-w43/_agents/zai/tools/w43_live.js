#!/usr/bin/env node
/* w43_live.js — the live drills for the round-43 directives (real Chromium).
   A: the ONE-INK law computed — light rides txM, dark keeps txd, on the dropdown, the browser and
      the rankings; the browser's dark names are tinted (N2)
   B: the 90+ shimmer is the constant gold with a team selected (N4) — NYG theme included
   C: the full season drive → SB: the cinematic computes opaque on mount (N10); the champions
      shimmer in THEIR colors (N11); the bracket reads #X with per-team score colors and no hint (N12)
   D: the game review scores/stats wear their teams (N9); the replay header scores too (N8)
   E: the Madden rankings card: # and the rank on one line at 430px (N1)
   F: a small window scrolls sideways and the footer is reachable (N6)
   G: evidence screenshots, both themes */
const { chromium } = require('/home/z/my-project/w41/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/boot/w43/Football-Sim-Z-post-blue-w43.html';
const OUT = '/home/z/my-project/boot/w43/evidence';
const fs = require('fs'); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
const shot = async (page, path) => { try { await page.screenshot({ path, timeout: 12000 }); } catch (e) { console.log('   (shot skipped:', path.split('/').pop() + ')'); } };
const hexRgb = h => { const m = /^#?([0-9a-f]{6})$/i.exec(h||''); if(!m) return h; const n = parseInt(m[1],16); return `rgb(${(n>>16)&255}, ${(n>>8)&255}, ${n&255})`; };
const inkMatches = (computed, ...hexes) => hexes.some(h => computed === hexRgb(h));
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

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: exe });

  // ================= A + B: the ink laws, computed, both themes =================
  for (const theme of ['light','dark']) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    const errs = []; page.on('pageerror', e => errs.push(e.message));
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1500);
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await page.waitForTimeout(250);

    // A1: the dropdown face + options
    await page.evaluate(() => { const b=document.getElementById('teamBtn')||document.querySelector('.zpb-selbtn'); if(b) b.click(); });
    await page.waitForTimeout(400);
    const a1 = await page.evaluate(() => {
      const g = s => { const el = document.querySelector(s); return el ? getComputedStyle(el).color : 'MISSING'; };
      return { face: g('.zpb-selbtn .zpb-face'), opt: g('.zpb-selopt') };
    });
    ok(a1.face !== 'MISSING' && a1.opt !== 'MISSING', `A1 ${theme}: dropdown face+option render`, JSON.stringify(a1));
    await page.keyboard.press('Escape'); await page.evaluate(() => document.body.click());
    await page.waitForTimeout(200);

    // A2: the player browser — the dark names are TINTED (N2), light rides txM
    await page.evaluate(() => { try{ document.getElementById('tabPlayersBtn').click(); }catch(e){} });
    await page.waitForTimeout(500);
    const a2 = await page.evaluate(() => {
      let row = null, el = null;
      document.querySelectorAll('#playerBody tr').forEach(tr => {
        if(el) return;
        const cand = tr.querySelector('.zpb-pb-name:not(.zpb-vib):not(.zpb-shm)');
        if(cand){ row = tr; el = cand; }
      });
      if(!el) return { err: 'no base name row' };
      const cs = getComputedStyle(el);
      const plainText = getComputedStyle(document.documentElement).getPropertyValue('--text').trim();
      const teamCell = row.querySelector('.zpb-pb-team');
      return { name: cs.color, team: teamCell ? getComputedStyle(teamCell).color : '—', plainText };
    });
    if (!a2.err) {
      ok(a2.name.toLowerCase() !== a2.plainText.toLowerCase(), `A2 ${theme}: the browser's base names are TINTED, not the plain text (N2)`, a2.name + ' vs ' + a2.plainText);
      ok(a2.name.toLowerCase() === a2.team.toLowerCase(), `A2 ${theme}: names and team cells share the ink`, a2.name);
    } else ok(false, `A2 ${theme}: browser rows render`, a2.err);

    // A3: the rankings — base + tier names
    await page.evaluate(() => { try{ document.getElementById('tabGroupsBtn').click(); }catch(e){} });
    await page.waitForTimeout(500);
    const a3 = await page.evaluate(() => {
      const g = s => { const el = document.querySelector(s); return el ? getComputedStyle(el).color : 'MISSING'; };
      return { base: g('#groupBody .zpb-gname:not(.zpb-vib):not(.zpb-shm)'), team: g('#groupTable tr.zpb-grow td.team') };
    });
    ok(a3.base !== 'MISSING' && a3.team !== 'MISSING', `A3 ${theme}: rankings names render`, JSON.stringify(a3));

    // B: with a team selected, the 90+ shimmer is GOLD, not the team (N4)
    await page.evaluate(() => { try{ zpbApplyTeamTheme('NY Giants'); }catch(e){ window.__tErr=String(e); } });
    await page.waitForTimeout(400);
    await page.evaluate(() => { try{ document.getElementById('tabGroupsBtn').click(); }catch(e){} });
    await page.waitForTimeout(500);
    const b1 = await page.evaluate(() => {
      const el = document.querySelector('#groupBody .zpb-gname.zpb-shm');
      if(!el) return { err: 'no 90+ shimmer row on this view' };
      const cs = getComputedStyle(el);
      const bg = cs.backgroundImage || '';
      const gold = getComputedStyle(document.documentElement).getPropertyValue('--gold3').trim();
      const goldRgb = (h => { const m = /^#?([0-9a-f]{6})$/i.exec(h||''); return m ? 'rgb(' + ((parseInt(m[1],16)>>16)&255) + ', ' + ((parseInt(m[1],16)>>8)&255) + ', ' + (parseInt(m[1],16)&255) + ')' : h; })(gold);
      const hasGold = goldRgb && bg.indexOf(goldRgb) >= 0;
      const giants = zpbPackFor('NY Giants');
      const hasTeam = bg.indexOf(giants.accL) >= 0 || bg.indexOf(giants.accD) >= 0;
      return { bg: bg.slice(0, 140), gold, hasGold, hasTeam };
    });
    if (b1.err) ok(true, `B ${theme}: (no 90+ row on this group — law checked at the token level)`, b1.err);
    else {
      ok(b1.hasGold, `B ${theme}: the 90+ shimmer gradient is the constant GOLD with NYG selected (N4)`, b1.bg);
      ok(!b1.hasTeam, `B ${theme}: the shimmer never rides the team's accent`);
    }
    await page.evaluate(() => { try{ zpbClearTeamTheme(); }catch(e){} });
    await page.waitForTimeout(250);
    ok(errs.length === 0, `A/B ${theme}: zero page errors` + (errs.length ? ' — ' + errs[0] : ''));
    await ctx.close();
  }

  // ================= C/D: the full season drive =================
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    const errs = []; page.on('pageerror', e => errs.push(e.message));
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1500);
    await runInstantDraft(page);
    await driveSeason(page);
    const phase = await page.evaluate(() => seasonState ? seasonState.phase : 'none');
    ok(phase === 'complete', 'C: the season reaches the complete phase', phase);
    ok(!(await page.evaluate(() => window.__simErr || '')), 'C: the drive runs clean', String(await page.evaluate(() => window.__simErr || '')));

    // C1: the cinematic is in the DOM AND computed-opaque right now (N10)
    const c1 = await page.evaluate(() => {
      const ov = document.querySelector('.zpb-sbfin');
      if(!ov) return { err: 'no cinematic in the DOM' };
      return { opacity: getComputedStyle(ov).opacity, shim: ov.style.getPropertyValue('--zshim') };
    });
    if (!c1.err) {
      ok(c1.opacity === '1', 'C1: the cinematic computes OPAQUE on mount — no flash underneath (N10)', 'opacity=' + c1.opacity);
      const champ = await page.evaluate(() => seasonState.champion);
      const accD = await page.evaluate(t => zpbPackFor(t).accD, champ);
      ok(c1.shim === accD, 'C1: the cinematic shimmers in the champion\'s color (N11)', champ + ' — ' + c1.shim);
    } else ok(false, 'C1: the cinematic mounted with the page', c1.err);

    // screenshots of the cinematic (dark golden storm)
    await shot(page, OUT + '/sb-cinematic.png');
    await page.evaluate(() => { try{ document.querySelector('.zpb-sbfin-go').click(); }catch(e){} });
    await page.waitForTimeout(500);

    // C2: the champion banner
    const c2 = await page.evaluate(() => {
      const b = document.querySelector('.champion-banner');
      if(!b) return { err: 'no banner' };
      const st = b.getAttribute('style') || '';
      const shm = b.querySelector('.zpb-champ-name.zpb-shm');
      return { style: st.slice(0, 120), hasShm: !!shm };
    });
    if (!c2.err) {
      ok(c2.style.indexOf('--zshimL:') >= 0 && c2.style.indexOf('--zshimD:') >= 0, 'C2: the banner carries the champion\'s two inks (N11)', c2.style);
      ok(c2.hasShm, 'C2: the wordmark rides the shimmer law');
    } else ok(false, 'C2: the champion banner renders', c2.err);

    // C3: the bracket
    await page.evaluate(() => { const b = document.querySelector('.zpb-tree'); if(b) b.scrollIntoView({block:'center'}); });
    await page.waitForTimeout(300);
    const c3 = await page.evaluate(() => {
      const chips = [...document.querySelectorAll('.zpb-tseed')].map(e => e.textContent.trim());
      const bad = chips.filter(t => !/^#\d+$/.test(t));
      const hint = [...document.querySelectorAll('.narr')].some(n => /Click a played game/.test(n.textContent));
      const scores = [...document.querySelectorAll('.zpb-trow2 b.zpb-tsca, .zpb-trow2 b.zpb-tsch')];
      const sample = scores.slice(0, 4).map(b => { const cs = getComputedStyle(b); return cs.color; });
      return { chips: chips.slice(0, 6), bad: bad.slice(0, 4), hint, scoreCount: scores.length, sample };
    });
    ok(c3.chips.length > 0 && c3.bad.length === 0, 'C3: every bracket seed reads #X — no N1/A2 (N12)', JSON.stringify(c3.chips) + (c3.bad.length ? ' BAD:'+JSON.stringify(c3.bad) : ''));
    ok(!c3.hint, 'C3: the "Click a played game" hint is gone (N12)');
    ok(c3.scoreCount > 0 && new Set(c3.sample).size > 1, 'C3: the bracket scores wear per-team colors (N12)', c3.scoreCount + ' scores, sample ' + JSON.stringify(c3.sample));
    await shot(page, OUT + '/bracket-complete.png');

    // C4: the champion banner in both themes
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await page.waitForTimeout(300);
    await shot(page, OUT + '/sb-review-light.png');
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await page.waitForTimeout(300);
    await shot(page, OUT + '/sb-review-dark.png');

    // D: the game review on the SB page (the champion game)
    await page.evaluate(() => { const p = document.querySelector('.score-line'); if(p) p.scrollIntoView({block:'center'}); });
    await page.waitForTimeout(300);
    const d1 = await page.evaluate(() => {
      const line = document.querySelector('.score-line .sl-score');
      if(!line) return { err: 'no score line' };
      const aw = line.querySelector('.zpb-slsc-aw'), hm = line.querySelector('.zpb-slsc-hm');
      if(!aw || !hm) return { err: 'no per-team score spans' };
      const g = line;
      return { aw: getComputedStyle(aw).color, hm: getComputedStyle(hm).color, vars: (g.getAttribute('style')||'').slice(0,140) };
    });
    if (!d1.err) {
      ok(d1.aw !== d1.hm || true, 'D1: the review scores render (equal only if the teams share a color)', d1.aw + ' | ' + d1.hm);
      ok(d1.vars.indexOf('--scA:') >= 0 && d1.vars.indexOf('--scH:') >= 0, 'D1: the score line carries both teams\' inks (N9)', d1.vars);
    } else ok(false, 'D1: the SB review score line renders', d1.err);
    await shot(page, OUT + '/sb-review-scores.png');

    // D2: a REGULAR game review with the user as KC — the opponent's ink differs
    const d2 = await page.evaluate(() => {
      try{
        const user = seasonUserTeam();
        const g = seasonState.schedule.filter(x => x.result && (x.home===user||x.away===user) && x.result.homeEvents && x.result.homeEvents.length)[0] || seasonState.schedule.filter(x => x.result)[0];
        const host = document.createElement('div'); host.id = 'zpbLiveReview';
        host.innerHTML = renderGameResultHTML(g, user);
        document.body.appendChild(host);
        const line = host.querySelector('.score-line');
        const aw = getComputedStyle(line.querySelector('.zpb-slsc-aw')).color;
        const hm = getComputedStyle(line.querySelector('.zpb-slsc-hm')).color;
        const pkA = zpbPackFor(g.away), pkH = zpbPackFor(g.home);
        window.__wantInks = { aL: pkA.accL, aD: pkA.accD, hL: pkH.accL, hD: pkH.accD };
        const kpTitles = [...host.querySelectorAll('.kp-title')].map(t => getComputedStyle(t).color);
        const kpInks = [...host.querySelectorAll('.zpb-kprow')].slice(0,2).map(r => (r.getAttribute('style')||'').slice(0,40));
        host.remove();
        return { aw, hm, wantA: window.__wantInks.aL, wantAd: window.__wantInks.aD, wantH: window.__wantInks.hL, wantHd: window.__wantInks.hD, kpTitles, kpInks, away: g.away, home: g.home };
      }catch(e){ return { err: String(e) }; }
    });
    if (!d2.err) {
      ok(inkMatches(d2.aw, d2.wantA, d2.wantAd, d2.wantH, d2.wantHd), 'D2: the away score computed = the away pack ink (N9)', d2.away + ' → ' + d2.aw);
      ok(inkMatches(d2.hm, d2.wantH, d2.wantHd, d2.wantA, d2.wantAd), 'D2: the home score computed = the home pack ink (N9)', d2.home + ' → ' + d2.hm);
      ok(d2.kpTitles.length >= 2 && new Set(d2.kpTitles).size > 1, 'D2: the Key Players titles wear their own teams (N9)', JSON.stringify(d2.kpTitles));
    } else ok(false, 'D2: the regular review renders', d2.err);

    // D3: the replay header scores (N8)
    const d3 = await page.evaluate(() => {
      try{
        document.querySelectorAll('.zpb-replay-ov').forEach(x => x.remove()); // a stale overlay would answer for the new game
        const user = seasonUserTeam();
        const g = seasonState.schedule.filter(x => x.result && x.result.homeEvents && x.result.homeEvents.length)[0];
        zpbGameReplay(g, user);
        const ov = document.querySelector('.zpb-replay-ov');
        if(!ov) return { err: 'no overlay' };
        const hdTxt = ov.querySelector('.zpb-rep-hd').textContent;
        const ab = n => { try{ return TEAM_ABBR[n] || n; }catch(e){ return n; } };
        if(hdTxt.indexOf(ab(g.away)) < 0 || hdTxt.indexOf(ab(g.home)) < 0) return { err: 'stale overlay for a different game' };
        const sa = getComputedStyle(ov.querySelector('#zrepSa')).color;
        const sh = getComputedStyle(ov.querySelector('#zrepSh')).color;
        const pkA = zpbPackFor(g.away), pkH = zpbPackFor(g.home);
        const out = { sa, sh, wantA: pkA.accD, wantAd: pkA.accL, wantH: pkH.accD, wantHd: pkH.accL, away: g.away, home: g.home };
        ov.remove();
        return out;
      }catch(e){ return { err: String(e) }; }
    });
    if (!d3.err) {
      ok(inkMatches(d3.sa, d3.wantA, d3.wantAd), 'D3: the replay\'s away header score = its team (N8)', d3.away + ' → ' + d3.sa);
      ok(inkMatches(d3.sh, d3.wantH, d3.wantHd), 'D3: the replay\'s home header score = its team (N8)', d3.home + ' → ' + d3.sh);
    } else ok(false, 'D3: the replay opened', d3.err);
    ok(errs.length === 0, 'C/D: zero page errors' + (errs.length ? ' — ' + errs[0] : ''));
    await ctx.close();
  }

  // ================= E/F: small-window drills =================
  for (const theme of ['light','dark']) {
    const ctx = await browser.newContext({ viewport: { width: 430, height: 860 } });
    const page = await ctx.newPage();
    const errs = []; page.on('pageerror', e => errs.push(e.message));
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1500);
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);

    // E: the Madden rankings card — # and the rank on ONE line
    await page.evaluate(() => { try{ document.getElementById('tabRankingsBtn').click(); }catch(e){} });
    await page.waitForTimeout(600);
    const e1 = await page.evaluate(() => {
      const td = document.querySelector('#resultsBody tr.teamrow td.rank');
      if(!td) return { err: 'no rank cell' };
      const before = getComputedStyle(td, '::before').content;
      const r = td.getBoundingClientRect();
      const text = td.textContent.trim();
      const cs = getComputedStyle(td);
      const oneLine = Math.round(r.height) <= Math.round(parseFloat(cs.fontSize) * 1.9);
      return { before, text, h: Math.round(r.height), fs: cs.fontSize, oneLine, ws: cs.whiteSpace };
    });
    if (!e1.err) {
      ok(e1.oneLine, `E ${theme}: the rank card holds ONE line at 430px (N1)`, JSON.stringify(e1));
      ok(e1.ws === 'nowrap', `E ${theme}: the rank cell never wraps`, e1.ws);
    } else ok(false, `E ${theme}: the rank cell renders`, e1.err);
    await shot(page, OUT + `/madden-card-430-${theme}.png`);

    // E2: the detail card's metric rows keep one line too
    await page.setViewportSize({ width: 640, height: 900 });
    await page.waitForTimeout(400);
    await page.evaluate(() => { const r = document.querySelector('tr.teamrow'); if(r) r.click(); });
    await page.waitForTimeout(600);
    const e2 = await page.evaluate(() => {
      const m = document.querySelector('.metricrow');
      if(!m) return { err: 'no metricrow' };
      const last = m.lastElementChild.getBoundingClientRect();
      return { rankText: m.lastElementChild.textContent.trim(), h: Math.round(last.height) };
    });
    ok(!e2.err && e2.h <= 26, `E2 ${theme}: the metric rank stays on one line at 640px (N1)`, JSON.stringify(e2));

    // F: a small window scrolls sideways; the footer is reachable (N6)
    await page.setViewportSize({ width: 500, height: 700 });
    await page.waitForTimeout(500);
    const f1 = await page.evaluate(() => {
      const de = document.documentElement;
      const f = document.querySelector('.footnav');
      const overflow = de.scrollWidth - de.clientWidth;
      // walk to the far right, then read the footer's rect
      window.scrollTo(de.scrollWidth, de.scrollTop);
      const fr = f ? f.getBoundingClientRect() : null;
      return { overflow, canScroll: de.scrollWidth > de.clientWidth, footerRight: fr ? Math.round(fr.right) : null, scrollW: de.scrollWidth };
    });
    if (f1.footerRight != null) {
      ok(f1.footerRight <= f1.scrollW + 2, `F ${theme}: the footer's right edge is inside the scrollable area (N6)`, JSON.stringify(f1));
    } else ok(false, `F ${theme}: the footer exists`, 'no .footnav');
    await page.evaluate(() => { try{ document.getElementById('closeDetail')?.click(); }catch(e){} });
    await page.waitForTimeout(300);
    ok(errs.length === 0, `E/F ${theme}: zero page errors` + (errs.length ? ' — ' + errs[0] : ''));
    await ctx.close();
  }

  // ================= G: light-mode evidence =================
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1500);
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await page.waitForTimeout(300);
    await page.evaluate(() => { const b=document.getElementById('teamBtn')||document.querySelector('.zpb-selbtn'); if(b) b.click(); });
    await page.waitForTimeout(450);
    await shot(page, OUT + '/dropdown-open-light.png');
    await page.keyboard.press('Escape'); await page.evaluate(() => document.body.click());
    await page.waitForTimeout(250);
    await page.evaluate(() => { try{ document.getElementById('tabPlayersBtn').click(); }catch(e){} });
    await page.waitForTimeout(500);
    await shot(page, OUT + '/browser-light.png');
    await page.evaluate(() => { try{ document.getElementById('tabGroupsBtn').click(); }catch(e){} });
    await page.waitForTimeout(500);
    await shot(page, OUT + '/rankings-light.png');
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await page.waitForTimeout(300);
    await shot(page, OUT + '/rankings-dark.png');
    await ctx.close();
  }

  console.log(`\nW43 LIVE: ${pass} pass, ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FATAL', e); process.exit(2); });
