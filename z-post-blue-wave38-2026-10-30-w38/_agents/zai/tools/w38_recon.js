#!/usr/bin/env node
/* w38_recon.js — empirical dump of the w38 directive surfaces on the w37 bytes:
   1. the DIME bubble on the draft review (name? beat? empty?) vs FS
   2. every Secondary value: Your Breakdown, the draft-review detail bars + strengths, the real-Chiefs detail, the unit report card
   3. the map's suffix names (Jr / II / III / IV) — the last-name law
   4. the award panels + bracket cards + report-card tile text (structure dumps) */
const { chromium } = require('playwright-core');
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
  await page.waitForTimeout(2500);

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

  console.log('== 1 · the DIME bubble vs FS (draft review map) ==');
  const dime = await page.evaluate(() => {
    const body = document.getElementById('draftResultsBody');
    const map = body.querySelector('.zpb-fm'); if (!map) return { none: 1 };
    const d = map.querySelector('[data-slot="DIME"]'), f = map.querySelector('[data-slot="FS"]'), nk = map.querySelector('[data-slot="NICKEL"]');
    const u = draftSim.rosters.find(x => x.isUser);
    const sm = u.slots;
    return {
      dime: d ? { html: d.outerHTML.slice(0, 260), empty: d.classList.contains('zpb-empty'), beat: d.getAttribute('data-beat'), style: d.getAttribute('style') } : null,
      fs: f ? { html: f.outerHTML.slice(0, 200), beat: f.getAttribute('data-beat') } : null,
      nickel: nk ? { beat: nk.getAttribute('data-beat'), empty: nk.classList.contains('zpb-empty') } : null,
      smKeys: Object.keys(sm), cb4: sm.CB4 ? sm.CB4[0] : null,
      dimeOf: window.zpbDimeOf ? (window.zpbDimeOf(sm) ? window.zpbDimeOf(sm)[0] : null) : 'nofn',
      beatDime: window.zpbBeatOf && window.zpbDimeOf && window.zpbDimeOf(sm) ? window.zpbBeatOf(window.zpbDimeOf(sm)[0]) : null,
      beatFS: window.zpbBeatOf && sm.FS ? window.zpbBeatOf(sm.FS[0]) : null,
      rounds: u.pickRounds ? u.pickRounds.CB4 : 'n/a'
    };
  });
  console.log('   ', JSON.stringify(dime, null, 1).slice(0, 1200));

  console.log('== 2 · every Secondary surface ==');
  const sec = await page.evaluate(() => {
    const out = {};
    out.breakdown = [...document.querySelectorAll('.zpb-sbadge')].map(b => b.textContent.trim()).filter(t => /SECONDARY|SPECIALISTS/i.test(t));
    try {
      const body = document.getElementById('draftResultsBody');
      const userTr = [...body.querySelectorAll('tr.teamrow')].find(x => x.getAttribute('style') && x.getAttribute('style').indexOf('bold') >= 0);
      if (userTr) { userTr.click(); }
      const pool = draftSim.rosters.find(x => x.isUser).pool || [];
      const metrics = computeDetailMetrics(pool);
      out.draftedSEC = metrics.filter(m => m.key === 'SEC' || m.label === 'Secondary').map(m => ({ rank: m.rank, avg: Math.round(m.avg), top: (m.top || []).map(p => p[0]) }));
      out.draftedStrengths = metrics.filter(m => m.rank <= 8).sort((a, b) => a.rank - b.rank).slice(0, 3).map(m => m.label + ' #' + m.rank);
      const real = computeDetailMetrics(PLAYERS.filter(p => p[2] === 'Kansas City Chiefs'));
      out.realSEC = real.filter(m => m.label === 'Secondary').map(m => ({ rank: m.rank, avg: Math.round(m.avg) }));
      out.realStrengths = real.filter(m => m.rank <= 8).sort((a, b) => a.rank - b.rank).slice(0, 3).map(m => m.label + ' #' + m.rank);
    } catch (e) { out.err = String(e); }
    return out;
  });
  console.log('   ', JSON.stringify(sec, null, 1).slice(0, 1600));

  console.log('== 3 · suffix names on the map (Jr/II/III/IV) ==');
  const jr = await page.evaluate(() => {
    const body = document.getElementById('draftResultsBody');
    const map = body.querySelector('.zpb-fm'); if (!map) return { none: 1 };
    const names = [...map.querySelectorAll('.zpb-fm-ini b')].map(b => b.textContent);
    return { names: names.filter(n => /^(jr|sr|ii|iii|iv|v)$/i.test(n)), all: names.slice(0, 34) };
  });
  console.log('   suffix-only bubbles:', JSON.stringify(jr.names), '| sample:', JSON.stringify((jr.all || []).slice(0, 12)));

  console.log('== 4 · start the season: the unit report card + Your Breakdown (season) ==');
  await page.evaluate(() => { try { startSeason(); renderSeasonTab(document.getElementById('draftResultsBody')); } catch (e) { window.__ssErr = String(e); } });
  await page.waitForTimeout(700);
  const season = await page.evaluate(() => {
    const out = { err: window.__ssErr || '' };
    out.rcTiles = [...document.querySelectorAll('.zpb-rc-body')].map(t => t.textContent.trim().replace(/\s+/g, ' ')).slice(0, 12);
    out.bd = [...document.querySelectorAll('.zpb-sbadge')].map(b => b.textContent.trim());
    const S = seasonState, user = seasonUserTeam();
    out.ur = S.unitRatings[user], out.urk = S.unitRanks[user];
    return out;
  });
  console.log('   rcTiles:', JSON.stringify(season.rcTiles));
  console.log('   breakdown badges:', JSON.stringify(season.bd));
  console.log('   unitRatings:', JSON.stringify(season.ur), '\n    unitRanks:', JSON.stringify(season.urk));

  console.log('== 5 · the bracket card + the award card shapes ==');
  const shapes = await page.evaluate(() => {
    let g = null;
    try { startPlayoffs(); } catch (e) {}
    try { simulatePlayoffRound(); } catch (e) {}
    const PO = seasonState.playoffRounds || {};
    g = (PO.wildcard || [])[0];
    return {
      treeCard: g ? window.zpbTreeCardHTML(g, 'wildcard', 0) : 'no-game',
      awardsPO: seasonState.awardsPO ? JSON.stringify(seasonState.awardsPO).slice(0, 600) : 'none'
    };
  });
  console.log('   treeCard:', String(shapes.treeCard).slice(0, 400));
  console.log('   awardsPO:', String(shapes.awardsPO).slice(0, 500));

  console.log('== 6 · page errors ==');
  ok(errs.length === 0, 'zero page errors', errs.join(' | ').slice(0, 300));
  await browser.close();
  console.log(fails ? `RECON DONE — ${fails} FAIL` : 'RECON DONE — all green');
})().catch(e => { console.error('RECON CRASH', e); process.exit(1); });
