#!/usr/bin/env node
/* w38_probe.js — live-in-Chromium evidence for the round-38 surfaces, in game order:
   the Dime bubble + the suffix names on the map · the ONE skip button flipping live on the
   week-1 intro · the name ink on the season cards · the advanced grid at four columns ·
   the gold award rows · the tree card order (seed -> crest -> name) · the playoff award panels. */
const { chromium } = require('playwright-core');
const OUT = '/home/z/my-project/w38/notes/evidence';
const FILE = 'file:///home/z/my-project/w38/Football-Sim-Z-post-blue-w38.html';
let fails = 0;
const ok = (c, l, d='') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); if (!c) fails++; };

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell' });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(2800);

  // the Chiefs scripted draft
  await page.evaluate(() => {
    try {
      const sel = document.getElementById('teamSel') || document.querySelector('#draftSetup select');
      if (sel) { const opt = [...sel.options].find(o => /Kansas City Chiefs/.test(o.textContent)); if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); } }
      startDraft2(); draftSpeed = 'instant'; try { clearTimeout(slowTimer); } catch (e) {}
      for (let g = 0; g < 6000 && draftSim.pos < draftSim.order.length; g++) {
        const t = draftSim.order[draftSim.pos];
        if (t === draftSim.userIndex) {
          const r = draftSim.rosters[t]; if (firstOpenSlotAny(r) === null) { draftSim.pos++; continue; }
          const nat = p => (NATURAL_SLOT_MAP[p[1]] || []).filter(s => !r.slots[s]);
          let c = draftSim.pool.filter(p => nat(p).length); if (!c.length) c = draftSim.pool.slice(); c.sort((a, b) => b[3] - a[3]);
          const p = c[0], on = nat(p); const s = on.length ? on[0] : ROSTER_SLOTS.find(s => !r.slots[s]); executePick(draftSim.userIndex, p, s);
        } else { const pk = cpuPick(t); if (pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++; }
      }
      draftSim.awaitingUser = false; finishDraft2();
    } catch (e) { window.__probeErr = String(e); }
  });
  await page.waitForTimeout(900);
  ok(!(await page.evaluate(() => window.__probeErr || '')), 'the Chiefs draft finishes');

  console.log('== the Dime bubble + the suffix names on the map ==');
  const mapInfo = await page.evaluate(() => {
    const body = document.getElementById('draftResultsBody');
    const fm = body.querySelector('.zpb-fm'); if (!fm) return { none: 1 };
    const d = fm.querySelector('[data-slot="DIME"]');
    const bs = [...fm.querySelectorAll('.zpb-fm-ini b')].map(b => b.textContent);
    return { dEmpty: d ? d.classList.contains('zpb-empty') : null, dName: d ? (d.querySelector('b') || {}).textContent : null,
             suffixOnly: bs.filter(n => /^(jr|sr|ii|iii|iv|v)$/i.test(n)), sample: bs.slice(0, 8) };
  });
  ok(!mapInfo.none && mapInfo.dEmpty === false, 'the DIME bubble renders a player: ' + mapInfo.dName);
  ok((mapInfo.suffixOnly || []).length === 0, 'no suffix-only bubbles (was Jr/Jr on w37): ' + JSON.stringify(mapInfo.sample));

  console.log('== the week-1 intro: the ONE skip, the pairs, the panels ==');
  const introInfo = await page.evaluate(() => {
    try {
      startSeason();
      const S = seasonState, u = seasonUserTeam();
      const g = S.schedule.find(g => g.week === S.currentWeek && !g.played && (g.home === u || g.away === u));
      if (!g) return { err: 'no week-1 game' };
      playGame(g, true); zpbGameReplay(g, u);
      const ov = document.querySelector('.zpb-replay-ov');
      if (!ov) return { err: 'no overlay' };
      const skip = ov.querySelector('#zrepSkip');
      const stars = [...ov.querySelectorAll('.zpb-intro-star')];
      const byStar = stars.map(st => ({ sx: st.style.getPropertyValue('--sx'), sy: st.style.getPropertyValue('--sy'), delay: st.style.animationDelay, hasB: !!st.querySelector('b'), hasSub: !!st.querySelector('i') }));
      return { skipLabel: skip ? skip.textContent : null, ftZ: skip ? getComputedStyle(skip.closest('.zpb-rep-ft')).zIndex : '', stars: byStar };
    } catch (e) { return { err: String(e) }; }
  });
  ok(!introInfo.err, 'the replay opens' + (introInfo.err ? ' — ' + String(introInfo.err).slice(0, 140) : ''));
  if (!introInfo.err) {
    ok(introInfo.skipLabel === 'Skip intro', 'ONE door reads SKIP INTRO during the intro');
    ok(String(introInfo.ftZ) === '6', 'the footer door sits above the intro cover (z-index ' + introInfo.ftZ + ')');
    const s = introInfo.stars || [];
    ok(s.length >= 2 && s.every(x => x.hasB && x.hasSub), 'every pregame name wears the same panel (name + sub), count ' + s.length);
    const left = s.filter(x => x.sx === '26%').map(x => parseFloat(x.sy)).sort((a, b) => a - b);
    const right = s.filter(x => x.sx === '74%').map(x => parseFloat(x.sy)).sort((a, b) => a - b);
    const short = Math.min(left.length, right.length);
    ok(JSON.stringify(left.slice(0, short)) === JSON.stringify(right.slice(0, short)), 'every pair lines up at the SAME height ' + JSON.stringify(left) + ' vs ' + JSON.stringify(right));
    const delays = s.map(x => x.delay);
    const dup = delays.filter((d, i) => delays.indexOf(d) !== i);
    ok(left.length === 0 || right.length === 0 || dup.length >= 1, 'pairs share their fade beat (paired: ' + JSON.stringify([...new Set(dup)]) + ')');
    const dur = await page.evaluate(() => { const st = document.querySelector('.zpb-intro-star'); return st ? getComputedStyle(st).animationDuration : ''; });
    ok(dur === '3.4s', 'the fade in-and-out computes 3.4s (' + dur + ')');
    const skipFlow = await page.evaluate(() => {
      const ov = document.querySelector('.zpb-replay-ov');
      const skip = ov.querySelector('#zrepSkip');
      skip.click();
      const label1 = skip.textContent, introGone = !ov.querySelector('.zpb-rep-intro');
      skip.click();
      return { label1, introGone, final: !!ov.querySelector('.zpb-rep-fscore'), lines: ov.querySelectorAll('.zpb-rep-line').length };
    });
    ok(skipFlow.introGone && /^skip$/i.test(skipFlow.label1), 'SKIP INTRO lands the beginning of the game (label now ' + skipFlow.label1 + ')');
    ok(skipFlow.final && skipFlow.lines >= 6, 'SKIP shows the whole report with the final (' + skipFlow.lines + ' lines)');
    await page.evaluate(() => { const o = document.querySelector('.zpb-replay-ov'); if (o) o.remove(); });
  }

  console.log('== the name ink on the stat cards (the week view) ==');
  const ink = await page.evaluate(() => {
    try {
      const S = seasonState, u = seasonUserTeam();
      S.schedule.forEach(g => { if (!g.played && g.week <= 3 && (g.home === u || g.away === u)) playGame(g, false); });
      // the STATS tab content: userStatsInner renders the player cards
      const rows = teamPlayerStats(u);
      const html = userStatsInner();
      const cardColors = [];
      const tmp = document.createElement('div'); tmp.innerHTML = html;
      tmp.querySelectorAll('.zpb-pcard .zpb-gname').forEach((b, i) => { if (i < 3) cardColors.push({ style: b.closest('.zpb-pcard').getAttribute('style') || '', cls: b.className }); });
      return { n: rows.length, cardColors };
    } catch (e) { return { err: String(e) }; }
  });
  ok(!ink.err && ink.n > 0, 'the stat cards build' + (ink.err ? ' — ' + String(ink.err).slice(0, 120) : ''));
  ok(ink.cardColors && ink.cardColors.length > 0 && ink.cardColors.every(c => /--nm:/.test(c.style) && /zpb-gname/.test(c.cls)), 'the stat cards carry the name palette vars (' + (ink.cardColors || []).length + ' sampled)');
  ok(ink.cardColors && ink.cardColors.length > 0 && ink.cardColors.every(c => !/ffffff/i.test(c.style)), 'no white name ink anywhere in the palette');

  console.log('== SIM SEASON -> the books Continue -> the review surfaces ==');
  const rev = await page.evaluate(() => {
    try {
      const S = seasonState;
      simRestOfSeason();
      renderSeasonTab(document.getElementById('draftResultsBody'));
      const ov = document.querySelector('.zpb-restov');
      const heldDuring = (function(){ const r = document.querySelector('#zpbStoryPanel .zpb-story-rail'); return r ? r.classList.contains('zpb-story-hold') : null; })();
      const go = document.getElementById('zpbRestGo'); if (go) go.click();
      const heldAfter = (function(){ const r = document.querySelector('#zpbStoryPanel .zpb-story-rail'); return r ? r.classList.contains('zpb-story-hold') : null; })();
      const row = document.querySelector('.zpb-awcard.zpb-awgold');
      const rowGold = row ? getComputedStyle(row).borderColor : '';
      const grids = [...document.querySelectorAll('.zpb-advgrid')];
      const cols = grids.length ? getComputedStyle(grids[0]).gridTemplateColumns.split(' ').length : 0;
      const labels = [...document.querySelectorAll('.zpb-adcard span')].map(s => s.textContent);
      const cards = grids.reduce((t, g) => t + g.querySelectorAll('.zpb-adcard').length, 0);
      const rcTile = (function(){ const t = document.querySelector('.zpb-rc-body i'); return t ? t.textContent : null; })();
      return { heldDuring, heldAfter, rowGold, cols, cards, labels, rcTile: rcTile ? rcTile.textContent : null,
               newStats: ['Points / g', 'Total yards / g', 'Yards / play', 'Takeaways / g'].every(l => labels.includes(l)) };
    } catch (e) { return { err: String(e), stack: (e.stack || '').slice(0, 240) }; }
  });
  ok(!rev.err, 'the season sims into the review' + (rev.err ? ' — ' + String(rev.err).slice(0, 160) : ''));
  if (!rev.err) {
    ok(rev.heldDuring === true, 'the review cards HOLD under the Honors cinematic');
    ok(rev.heldAfter === false, 'the Continue releases the badge cascade');
    ok(rev.rowGold && /217, 169, 76|185, 141, 62/.test(rev.rowGold), 'the regular award rows wear gold: ' + rev.rowGold);
    ok(rev.cols === 4, 'the badge grid computes four columns (' + rev.cols + ')');
    ok(rev.cards >= 12, 'the advanced cards render (core 8 + the new row): ' + rev.cards);
    ok(rev.newStats, 'the four new advanced stats render');
  }

  console.log('== playoffs -> the tree + the playoff award panels ==');
  const po = await page.evaluate(() => {
    try {
      startPlayoffs();
      renderSeasonTab(document.getElementById('draftResultsBody'));
      const treeCard = document.querySelector('.zpb-tree-card');
      const treeHTML = treeCard ? treeCard.innerHTML : '';
      for (const rk of ['wildcard', 'divisional', 'champ', 'superbowl']) { simulatePlayoffRound(); if (rk !== 'superbowl') advancePlayoffRound(); }
      seasonState.awardsPO = computePlayoffAwards();
      renderSeasonTab(document.getElementById('draftResultsBody'));
      const rb = document.getElementById('seasonReviewBtn'); if (rb) rb.click(); // the playoff awards + the UNIT REPORT CARD live on the Season Review branch
      const rcTile = (function(){ const t = document.querySelector('.zpb-rc-body i'); return t ? t.textContent : null; })();
      const pcard = document.querySelector('.zpb-awcol');
      const pgold = pcard ? getComputedStyle(pcard).borderColor : '';
      const chips = pcard ? !!pcard.querySelector('.zpb-awchips .zpb-schip') : null;
      const awt = pcard ? pcard.querySelector('.zpb-awt') : null;
      const awname = pcard ? pcard.querySelector('.zpb-awname') : null;
      const nameFirst = !!(awt && awname && (awt.compareDocumentPosition(awname) & Node.DOCUMENT_POSITION_FOLLOWING));
      let badQbr = 0; const samples = [];
      document.querySelectorAll('.zpb-awcol').forEach(c => {
        const grp = c.querySelector('.zpb-poschip');
        const isQB = grp && /QB/.test(grp.textContent);
        if (!isQB && c.textContent.indexOf('QBR') >= 0) { badQbr++; samples.push((grp?grp.textContent:'?') + ' :: ' + c.textContent.slice(0,110)); }
      });
      return { treeHTML, pgold, chips, nameFirst, rcTile, noQbr: badQbr === 0, badQbr, qbrSamples: samples.slice(0,3), champion: seasonState.champion };
    } catch (e) { return { err: String(e), stack: (e.stack || '').slice(0, 240) }; }
  });
  ok(!po.err, 'the playoffs simulate clean' + (po.err ? ' — ' + String(po.err).slice(0, 160) : ''));
  if (!po.err) {
    const t = po.treeHTML || '';
    const seedIdx = t.indexOf('zpb-tseed'), nameIdx = t.indexOf('zpb-tname');
    ok(seedIdx >= 0 && nameIdx > seedIdx && t.indexOf('zpb-tlogo') >= 0, 'the tree card reads seed -> crest -> name');
    ok(po.pgold && /217, 169, 76|185, 141, 62/.test(po.pgold), 'the playoff award cards wear gold: ' + po.pgold);
    ok(po.chips, 'the playoff award panels carry stat badges');
    ok(po.rcTile && !/in the league/.test(po.rcTile) && !/vs league/.test(po.rcTile), 'the report-card tile reads OVR · #rank only: ' + po.rcTile);
    ok(po.nameFirst, 'the award sits above the name, the badges below');
    ok(po.noQbr, 'no QBR chip on any non-QB award panel' + (po.noQbr ? '' : ' — ' + JSON.stringify(po.qbrSamples)));
  }

  ok(errs.length === 0, 'zero page errors end to end', errs.join(' | ').slice(0, 300));
  await browser.close();
  console.log(fails ? `PROBE DONE — ${fails} FAIL` : 'PROBE DONE — all green');
})().catch(e => { console.error('PROBE CRASH', e); process.exit(1); });
