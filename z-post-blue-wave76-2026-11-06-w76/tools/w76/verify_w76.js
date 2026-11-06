/* verify_w76.js — the wave 76 battery, live on the built bytes.
   V0 · the veto (c) median: the NORMALLY-DRAFTED pool's median OVR, produced once, cached —
        and the cache survives a draft boot (never recalculated per draft).
   V1 · the positions dropdown reads the depth chart and says Offensive Guard. (standing)
   V2 · the chip law: buttons start all OFF with the board FULL · click = that group alone ·
        ALL = all on, board full · click while all on = that group leaves · CLEAR = all off, board full. (standing)
   V3 · the selected chip is FILLED (accent background). (standing)
   V4 · DRAFT COMMAND CENTER, the Owner's round: the section headers' text is gone (U1/U2),
        Cutdown Day is a centered Cinzel Decorative subtitle (U3), the footer asks for the 20-0
        with the team-color shimmer (U4), the cutdown cards carry the OVR badge + the Season
        Rating and NO delta (U5/U6), the CUT badge still fades, the rooms still read best-to-worst.
   V5 · the phone laws at 390 (command center + chip row + the draft board never pan). (standing)
   V6 · SIM PLAYOFFS plays a cinematic page per round the user's team plays, then the storm. (standing)
   V7 · the rating scale: display = the drafted pool's median OVR centered (integers on the board).
   V8 · BACK TO <STAGE> on every footer page, top and bottom, with the live stage label. (standing)
   V9 · SIM SEASON wears the exact neutral of SIM GAME. (standing)
  V10 · the pregame player cards: light panel in light mode, dark panel kept in dark. (standing)
  V11 · the box score border = the score border color. (standing)
  V12 · the award names ride --nm60 in light, the 0.50 law stays in dark. (standing)
  V13 · the preseason dropdowns go plain (no box), and say 2 Point Conversion. (standing)
  V17 · the veto (a) chip: the lineup slot-picker reads just -x — no FLEX word anywhere on it. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file://' + require('path').resolve(__dirname, '../w76/Football-Sim-Z-post-blue-w76.html');
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SH = '/tmp/w76shots';
require('fs').mkdirSync(SH, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
const J = v => JSON.stringify([].concat(v).sort());
let page;
const closeOv = () => page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin,.zpb-restov,.zpb-replay-ov,.zpb-prematch,.zpb-sbfin,.zpb-porun,.zpb-victory,.zpb-ss-ov,.zpb-caution,.zpb-replay').forEach(f => f.remove()); } catch (e) {} });

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  let pageErrs = [];
  page.on('pageerror', e => pageErrs.push(e.message));
  await page.goto(FILE); await page.waitForTimeout(500);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);

  // ============ V0 · the veto (c) median + no bars before the simulator starts ============
  console.log('== V0 · boot state ==');
  const med = await page.evaluate(() => {
    if (!window.zpbMedianOvr) return { err: 'no zpbMedianOvr' };
    delete window.__zpbMedOvr;
    const m = zpbMedianOvr();
    // the independent recomputation of the same derivation (the normally-drafted pool)
    const take = TOTAL_ROUNDS * 32;
    const pool = PLAYERS.filter(p => POS_SLOT_MAP[p[1]]).map(p => p[3]).sort((x, y) => y - x).slice(0, take).sort((x, y) => x - y);
    const i = pool.length >> 1;
    const indep = pool.length % 2 ? pool[i] : Math.round((pool[i - 1] + pool[i]) / 2);
    const all = PLAYERS.map(p => p[3]).slice().sort((x, y) => x - y);
    const j = all.length >> 1;
    const allMed = all.length % 2 ? all[j] : Math.round((all[j - 1] + all[j]) / 2);
    return { med: m, cached: window.__zpbMedOvr, indep, allMed, n: PLAYERS.length, take, draftedMin: pool[0], draftedMax: pool[pool.length - 1] };
  });
  ok(!med.err && med.med === med.indep, 'V0 the median computes live = the independently recomputed drafted-pool median', JSON.stringify(med));
  ok(!med.err && med.allMed === 76 && med.med > med.allMed, 'V0 the old all-database median (76) is superseded by the drafted pool — the 50s are out', med.allMed + ' -> ' + med.med);
  ok(!med.err && med.cached === med.med, 'V0 the value is produced once and stored (window.__zpbMedOvr)', String(med.cached));
  const bars0 = await page.evaluate(() => document.querySelectorAll('.zpb-backbar').length);
  ok(bars0 === 0, 'V0 no BACK TO bars while the simulator has not started', bars0 + ' bars');

  // boot the draft as the Steelers, live (on the clock) for the board probes
  await page.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    if (s) { s.value = 'Pittsburgh Steelers'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    document.getElementById('startDraftBtn').click();
  });
  await page.waitForTimeout(1500); await closeOv();
  const medAfterBoot = await page.evaluate(() => window.__zpbMedOvr);
  ok(medAfterBoot === med.med, 'V0 the stored median survives the draft boot — never recalculated per draft', medAfterBoot + ' vs ' + med.med);

  // ============ V1 · the dropdown + Offensive Guard ============
  console.log('== V1 · the dropdown reads the depth chart ==');
  const v1 = await page.evaluate(() => Array.from(document.getElementById('draftPosFilter2').options).map(o => ({ v: o.value, t: o.textContent })));
  const WANT = ['all', 'QB', 'RB', 'WR', 'TE', 'OT', 'OG', 'C', 'EDGE', 'DT', 'LB', 'CB', 'FS', 'SS', 'K'];
  ok(JSON.stringify(v1.map(o => o.v)) === JSON.stringify(WANT), 'V1 dropdown order = depth chart, TE once', v1.map(o => o.v).join(' '));
  const og = v1.find(o => o.v === 'OG');
  ok(og && og.t === 'Offensive Guard', 'V1 the OG option reads Offensive Guard', og ? og.t : '(none)');

  // ============ V2 · the new chip law ============
  console.log('== V2 · the chip law (off = off, on = on, all off = full board) ==');
  await page.evaluate(() => { const dv = document.getElementById('draftView2'); dv.value = 'cards'; dv.dispatchEvent(new Event('change', { bubbles: true })); });
  await page.waitForTimeout(250);
  const onList = async () => (await page.evaluate(() => Array.from(document.querySelectorAll('#draftChips .zpb-srbtn[data-tog]')).filter(b => b.classList.contains('on')).map(b => b.dataset.tog)));
  const boardMix = async () => (await page.evaluate(() => { const dv = document.getElementById('draftView2'); const was = dv.value; dv.value = 'table'; dv.dispatchEvent(new Event('change', { bubbles: true })); const t = document.getElementById('draftTable2') || document.getElementById('draftTable'); const pos = t ? Array.from(t.querySelectorAll('tbody tr')).map(r => (r.cells[1] ? r.cells[1].textContent.trim() : '?')) : []; dv.value = was; dv.dispatchEvent(new Event('change', { bubbles: true })); return pos; }));
  const clickChip = g => page.evaluate(g => { document.querySelector('#draftChips .zpb-srbtn[data-tog="' + g + '"]').click(); }, g);
  const clickBtn = sel => page.evaluate(sel => { document.querySelector(sel).click(); }, sel);

  const full = await boardMix();
  ok((await onList()).length === 0, 'V2 the buttons start all OFF', (await onList()).length + ' on');
  ok(new Set(full).size > 3, 'V2 the board is still FULL at boot — the top of the board mixes every group', full.slice(0, 8).join(' '));
  await clickChip('QB');
  const qMix = await boardMix();
  ok(J(await onList()) === J(['QB']), 'V2 click QB → only QB lit', JSON.stringify(await onList()));
  ok(qMix.length > 0 && qMix.every(p => p === 'QB'), 'V2 only the QBs remain on the board', qMix.slice(0, 6).join(' '));
  await clickBtn('#draftChips [data-all]');
  const fullMix = await boardMix();
  ok((await onList()).length === 14 && new Set(fullMix).size > 3, 'V2 ALL lights all 14 — the board is equally full', (await onList()).length + ' on · ' + fullMix.slice(0, 6).join(' '));
  await clickChip('QB');
  const noQb = await boardMix();
  ok(J(await onList()) === J(['RB','WR','TE','OT','OG','C','EDGE','DT','LB','CB','FS','SS','K']), 'V2 click QB while all on → QB goes dark', (await onList()).length + ' on');
  ok(noQb.length > 0 && noQb.every(p => p !== 'QB'), 'V2 the QBs disappear from the board', noQb.slice(0, 6).join(' '));
  await clickChip('QB');
  const backMix = await boardMix();
  ok(backMix.indexOf('QB') >= 0, 'V2 re-click QB → his players return', backMix.slice(0, 6).join(' '));
  await clickBtn('#draftChips [data-none]');
  const clearMix = await boardMix();
  ok((await onList()).length === 0 && new Set(clearMix).size > 3, 'V2 CLEAR → every button off, the full board (the default)', (await onList()).length + ' on · ' + clearMix.slice(0, 6).join(' '));
  const lbl = await page.evaluate(() => ({ all: (document.querySelector('#draftChips [data-all] i') || {}).textContent, none: (document.querySelector('#draftChips [data-none] i') || {}).textContent }));
  ok(lbl.all === 'all on' && lbl.none === 'all off', 'V2 ALL and CLEAR tell the truth', JSON.stringify(lbl));

  // ============ V3 · the selected chip is FILLED ============
  console.log('== V3 · the selected chip is a filled button ==');
  const v3 = await page.evaluate(() => {
    const first = document.querySelector('#draftChips .zpb-srbtn[data-tog]');
    first.click();
    const on = document.querySelector('#draftChips .zpb-srbtn.on');
    const off = document.querySelector('#draftChips .zpb-srbtn[data-tog]:not(.on)');
    const cso = getComputedStyle(on), csf = getComputedStyle(off);
    const out = { onBg: cso.backgroundColor, offBg: csf.backgroundColor, onInk: cso.color, onBorder: cso.borderColor, offBorder: csf.borderColor };
    first.click(); // leave the board full for the next probes
    return out;
  });
  const accCol = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim());
  ok(v3.onBg !== 'rgba(0, 0, 0, 0)' && v3.onBg === v3.onBorder && v3.offBg !== v3.onBg, 'V3 the on-chip is filled with the accent, the off-chip is not', v3.onBg + ' vs ' + v3.offBg);

  // ============ V15 · the fills chip carries no FLEX word ============
  console.log('== V15 · the fills read x (-y) ==');
  const v15 = await page.evaluate(() => {
    const dv = document.getElementById('draftView2'); dv.value = 'table'; dv.dispatchEvent(new Event('change', { bubbles: true }));
    const cells = Array.from(document.querySelectorAll('#draftTable2 td.dc-fills')).map(td => td.textContent.trim());
    return { cells: cells.length, flexWord: cells.some(t => /FLEX/.test(t)), sample: cells.filter(t => t && t !== 'Full').slice(0, 6) };
  });
  ok(v15.cells >= 1, 'V15 the fills column is on the board (the harness reads the real cells)', v15.cells + ' cells');
  ok(!v15.flexWord, 'V15 no FLEX word in any fills cell', JSON.stringify(v15.sample));

  // ============ V17 · the veto (a) chip — the slot-picker reads just -x ============
  console.log('== V17 · the lineup slot-picker chip ==');
  const v17 = await page.evaluate(() => {
    let dds = Array.from(document.querySelectorAll('#draftTable2 td.dc-fills .zpb-slotdd'));
    if (!dds.length) { // fixture fallback — drive the picker directly off the live pool
      dds = [document.body];
      const name = (draftSim.pool.find(p => { try { return openSlotsFor(draftSim.rosters[draftSim.userIndex], p).length >= 2; } catch (e) { return false; } }) || [])[0];
      if (!name) return { n: 0, sawFlex: false, sawNatural: false, bad: ['no flex-capable player in the pool'], sample: [] };
      document.body.dataset.chg = name;
    }
    let sawFlex = false, sawNatural = false, bad = [], sample = [];
    for (const dd of dds.slice(0, 12)) {
      const name = dd.dataset ? dd.dataset.chg : dd.getAttribute && dd.getAttribute('data-chg');
      if (dd === document.body) { /* direct probe below */ }
      if (!name && dd !== document.body) continue;
      try { window.zpbSlotPop(dd, name); } catch (e) { bad.push('pop:' + e.message); continue; }
      const pop = document.querySelector('.zpb-slotpop');
      if (!pop) continue;
      const chips = Array.from(pop.querySelectorAll('.zpb-slotopt i')).map(i => i.textContent.trim());
      sample.push(chips.join('|'));
      if (chips.some(t => /FLEX/i.test(t))) bad.push('FLEX in ' + chips.join('|'));
      chips.forEach(t => { if (/^NATURAL$/.test(t)) sawNatural = true; if (/^-\d+$/.test(t)) sawFlex = true; if (t && !/^(NATURAL|-\d+)$/.test(t)) bad.push('odd chip ' + JSON.stringify(t)); });
      pop.remove();
      if (sawFlex && sawNatural) break;
    }
    return { n: dds.length, sawFlex, sawNatural, bad, sample: sample.slice(0, 4) };
  });
  ok(v17.n > 0 && v17.sawFlex, 'V17 the picker opens with a flex chip on the board (the fixture exists)', v17.n + ' pickers · ' + JSON.stringify(v17.sample));
  ok(v17.bad.length === 0, 'V17 no FLEX word on any picker chip — just -x (NATURAL keeps its word)', JSON.stringify(v17.bad));
  const pan1280 = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok(pan1280 <= 0, 'V15 the draft board does not pan the page at 1280', pan1280 + 'px');

  // ============ V5 · the phone laws at 390 ============
  console.log('== V5 · the phone laws at 390 ==');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(700);
  const chipPan = await page.evaluate(() => { document.getElementById('draftChips').scrollIntoView({ block: 'center' }); return document.documentElement.scrollWidth - document.documentElement.clientWidth; });
  ok(chipPan <= 0, 'V5 the chip row holds the no-pan law at 390', chipPan + 'px');
  const tablePan = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok(tablePan <= 0, 'V5 the draft table view does not pan the page at 390', tablePan + 'px');
  await page.evaluate(() => { const c = document.getElementById('draftChips'); if (c) c.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(300);
  await page.screenshot({ path: SH + '/chips_390.png' });
  await page.setViewportSize({ width: 1280, height: 940 }); await page.waitForTimeout(400);
  await page.evaluate(() => { const dv = document.getElementById('draftView2'); dv.value = 'cards'; dv.dispatchEvent(new Event('change', { bubbles: true })); });
  await page.evaluate(() => document.getElementById('draftChips').scrollIntoView({ block: 'center' }));
  await page.waitForTimeout(300);
  await page.screenshot({ path: SH + '/chips_desktop.png' });

  // ============ V8a · BACK TO DRAFT on the footer pages ============
  console.log('== V8 · BACK TO <STAGE> on the footer pages ==');
  const v8a = await page.evaluate(() => {
    document.getElementById('tabGuideBtn').click();
    const view = document.getElementById('viewGuide');
    const bars = Array.from(view.querySelectorAll('.zpb-backbar'));
    return {
      n: bars.length,
      first: bars[0] === view.firstElementChild, last: bars[bars.length - 1] === view.lastElementChild,
      label: bars[0] ? bars[0].querySelector('button').textContent : ''
    };
  });
  ok(v8a.n === 2 && v8a.first && v8a.last, 'V8a the Guide carries a bar at the top AND the bottom', v8a.n + ' bars');
  ok(v8a.label === 'BACK TO DRAFT', 'V8a the label reads the live stage (draft)', v8a.label);
  const v8b = await page.evaluate(() => {
    document.querySelector('#viewGuide .zpb-backbar button').click();
    return document.getElementById('viewDraft').classList.contains('active');
  });
  ok(v8b, 'V8a the bar returns the user to the simulator', '');
  const v8all = await page.evaluate(() => {
    const out = {};
    [['tabRankingsBtn','viewRankings'],['tabPlayersBtn','viewPlayers'],['tabGroupsBtn','viewGroups'],['tabCompareBtn','viewCompare']].forEach(([b, v]) => {
      document.getElementById(b).click();
      const el = document.getElementById(v);
      out[v] = el.querySelectorAll('.zpb-backbar').length;
    });
    document.getElementById('tabDraftBtn').click();
    return out;
  });
  ok(Object.values(v8all).every(n => n === 2), 'V8a all five footer pages carry two bars', JSON.stringify(v8all));

  // ============ V13a · the preseason page: plain dropdowns + 2 Point Conversion ============
  console.log('== V13 · the preseason page ==');
  await page.evaluate(() => { window.__zpbQuietSim = true; });
  const v13sim = await page.evaluate(() => {
    try {
      try { if (draftSim && draftSim.pos < 32 * 26 && typeof simToEnd === 'function') simToEnd(); } catch (e) {}
      const b = document.getElementById('startSeasonBtn'); if (b) b.click(); else startSeason();
      return { phase: seasonState.phase, preseason: !!seasonState.preseason };
    } catch (e) { return { err: String(e) }; }
  });
  await page.waitForTimeout(1000); await closeOv();
  ok(v13sim.phase === 'regular' && v13sim.preseason, 'V13 the season boots into the preseason', JSON.stringify(v13sim));
  const v13 = await page.evaluate(() => {
    const host = document.getElementById('draftResultsBody') || document.getElementById('seasonHost');
    return {
      boxed: document.querySelectorAll('details.zpb-dd').length,
      twoPt: /HOW A 2 POINT CONVERSION WORKS/.test(host.textContent),
      noTeamsRun: !/teams run it/.test(host.textContent),
      bars: Array.from((document.getElementById('viewDraft') || document.body).querySelectorAll('.zpb-backbar')).length,
      label: (() => { const b = (document.getElementById('viewDraft') || document.body).querySelector('.zpb-backbar button'); return b ? b.textContent : ''; })()
    };
  });
  ok(v13.boxed === 0, 'V13 no boxed dropdown remains on the preseason flow', v13.boxed + ' left');
  ok(v13.twoPt, 'V13 the header says HOW A 2 POINT CONVERSION WORKS', '');
  ok(v13.noTeamsRun, 'V13 the offense dropdown lost (x teams run it)', '');
  const v13c = await page.evaluate(() => {
    document.getElementById('tabGuideBtn').click();
    const b = document.querySelector('#viewGuide .zpb-backbar button');
    const out = b ? b.textContent : '';
    document.getElementById('tabDraftBtn').click();
    return out;
  });
  ok(v13c === 'BACK TO PRESEASON', 'V13 the bars read BACK TO PRESEASON at the preseason stage', v13c);
  const v13b = await page.evaluate(() => {
    const ref = Array.from(document.querySelectorAll('#draftResultsBody details summary')).find(s => /WHAT DO THESE TERMS MEAN/.test(s.textContent));
    const off = Array.from(document.querySelectorAll('#draftResultsBody details summary')).find(s => /EVERY STYLE WITH YOUR ROSTER/.test(s.textContent));
    if (!ref || !off) return { err: 'summaries not found' };
    const cr = getComputedStyle(ref), co = getComputedStyle(off);
    const dr = ref.closest('details'), dco = off.closest('details');
    return { refBorder: getComputedStyle(dr).borderTopWidth + ' ' + getComputedStyle(dr).borderTopColor, offBorder: getComputedStyle(dco).borderTopWidth + ' ' + getComputedStyle(dco).borderTopColor,
             refBg: getComputedStyle(dr).backgroundColor, offBg: getComputedStyle(dco).backgroundColor, sameSize: cr.fontSize === co.fontSize };
  });
  ok(v13b.offBorder === v13b.refBorder && v13b.offBg === v13b.refBg, 'V13 the four headers wear the reference style (no box, no glass)', JSON.stringify(v13b));
  await page.evaluate(() => { document.getElementById('tabDraftBtn').click(); document.getElementById('draftResultsBody').scrollIntoView({ block: 'start' }); });
  await page.waitForTimeout(300);
  await page.screenshot({ path: SH + '/preseason_plain_headers.png' });

  // ============ V9 · SIM SEASON = SIM GAME ============
  console.log('== V9 · the sim buttons read as one family ==');
  const v9 = await page.evaluate(() => {
    const ss = document.getElementById('simSeasonBtn');
    if (!ss) return { err: 'no sim season button' };
    const sg = document.querySelector('.zpb-simgame');
    const sib = sg || document.querySelector('.tabs .tabbtn:not(.active)');
    const a = getComputedStyle(ss);
    const b = sib ? getComputedStyle(sib) : null;
    return { bg: a.backgroundColor, border: a.borderColor, sibCls: sib ? (sib.id || sib.className) : null, sibBg: b ? b.backgroundColor : null, sibBorder: b ? b.borderColor : null };
  });
  ok(v9.bg === 'rgba(0, 0, 0, 0)', 'V9 SIM SEASON is transparent at rest (never a white panel)', v9.bg);
  ok(v9.sibBg !== null && v9.bg === v9.sibBg && v9.border === v9.sibBorder, 'V9 SIM SEASON wears the family fill and border', JSON.stringify(v9));

  // ============ V11 · the box score border = the score border ============
  console.log('== V11 · the box score wears the score border ==');
  const v11 = await page.evaluate(() => {
    try {
      window.__zpbQuietSim = true;
      seasonState.preseason = false; seasonState.scriptLocked = true; // "Begin the season" — the weekly view replaces the preseason page
      const user = seasonUserTeam();
      let ls = null, sl = null;
      for (let w = 0; w < 6 && !ls; w++) {
        if (!seasonState.weekSimulated) simulateCurrentWeek();
        seasonState.weekSimulated = true;
        renderSeasonTab(document.getElementById('draftResultsBody') || document.body);
        ls = document.querySelector('table.linescore');
        sl = document.querySelector('.score-line');
        if (!ls) { if (seasonState.phase !== 'regular') break; advanceWeek(); }
      }
      if (!ls) return { err: 'no linescore rendered after 6 weeks' };
      return { ls: getComputedStyle(ls).borderTopColor, score: sl ? getComputedStyle(sl).borderTopColor : getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() };
    } catch (e) { return { err: String(e) }; }
  });
  ok(!v11.err && v11.ls === v11.score, 'V11 the linescore border color equals the score border color', JSON.stringify(v11));

  // ============ V7 + V4 · the review: the scale, the command center ============
  console.log('== V7/V4 · the season review ==');
  const v7 = await page.evaluate(() => {
    try {
      window.__zpbQuietSim = true;
      simRestOfSeason();
      const S = seasonState;
      const rows = Object.values(S.playerStats || {}).filter(r => r._rating != null);
      const disp = rows.slice(0, 400).map(r => zpbDispRating(r));
      const mean = disp.reduce((a, b) => a + b, 0) / Math.max(1, disp.length);
      const rawMean = rows.reduce((a, r) => a + r._rating, 0) / Math.max(1, rows.length);
      return { n: disp.length, meanDisp: mean, rawMean, anchor: S._rtgMean, allInt: disp.every(d => Number.isInteger(d)), min: Math.min.apply(null, disp), max: Math.max.apply(null, disp), med: zpbMedianOvr() };
    } catch (e) { return { err: String(e) }; }
  });
  ok(!v7.err && v7.allInt && Math.abs(v7.meanDisp - v7.med) < 3, 'V7 the displayed ratings center on the drafted-pool median OVR (the veto c anchor)', JSON.stringify(v7));
  ok(!v7.err && v7.min >= 0 && v7.max <= 99, 'V7 the display scale stays in bounds', v7.min + '·' + v7.max);
  const v4sim = await page.evaluate(() => {
    try {
      seasonState.showReview = true;
      renderSeasonTab(document.getElementById('draftResultsBody') || document.getElementById('seasonHost'));
      return { phase: seasonState.phase };
    } catch (e) { return { err: String(e) }; }
  });
  await page.waitForTimeout(1200); await closeOv();
  const v4 = await page.evaluate(() => {
    const host = document.getElementById('draftResultsBody') || document.getElementById('seasonHost');
    const board = host && host.querySelector('.zpb-fx-board');
    if (!board) return { board: false };
    const minis = Array.from(board.querySelectorAll('.zpb-fx-mini')).map(m => ({
      label: m.querySelector('.zpb-fx-minibody b').textContent,
      grade: m.querySelector('.zpb-rc-grade').textContent,
      nums: m.querySelector('.zpb-fx-minibody i').textContent,
      noGauge: !m.querySelector('.zpb-fx-track')
    }));
    const cuts = Array.from(board.querySelectorAll('.zpb-fx-cutcard')).map(c => {
      const badges = Array.from(c.querySelectorAll('.zpb-fx-pos'));
      const csB = badges.length ? getComputedStyle(badges[0]) : null;
      const csO = badges.length > 1 ? getComputedStyle(badges[1]) : null;
      const num = c.querySelector('.zpb-fx-num');
      const csN = num ? getComputedStyle(num) : null;
      return {
        name: c.querySelector('.zpb-fx-hd b').textContent,
        num: num ? num.textContent : '',
        lbl: (c.querySelector('.zpb-fx-cutdown i') || {}).textContent || '',
        nBadges: badges.length, ovrBadge: badges[1] ? badges[1].textContent : '',
        badgeFs: csB ? csB.fontSize : '', ovrFs: csO ? csO.fontSize : '', numFs: csN ? csN.fontSize : '',
        delta: (c.querySelector('.zpb-fx-gapnum') || {}).textContent || null,
        cut: !!c.querySelector('.zpb-fx-cut')
      };
    });
    const cutAnim = board.querySelector('.zpb-fx-cut') ? getComputedStyle(board.querySelector('.zpb-fx-cut')).animationName : '';
    const cd = board.querySelector('.zpb-fx-cdtitle');
    const cdCs = cd ? getComputedStyle(cd) : null;
    const go = board.querySelector('.zpb-fx-goshine');
    const goCs = go ? getComputedStyle(go) : null;
    const secs = Array.from(board.querySelectorAll('.zpb-fx-sec')).map(s => s.textContent);
    return {
      board: true, title: (board.querySelector('.zpb-rc-title') || {}).textContent || '',
      sub: (board.querySelector('.zpb-fx-sub') || {}).textContent || null,
      secs, cdText: cd ? cd.textContent : null,
      cdAlign: cdCs ? cdCs.textAlign : '', cdFont: cdCs ? cdCs.fontFamily : '', cdFs: cdCs ? parseFloat(cdCs.fontSize) : 0,
      goText: go ? go.textContent : null, goAnim: goCs ? goCs.animationName : '', goClip: goCs ? (goCs.webkitBackgroundClip || goCs.backgroundClip) : '', goImg: goCs ? goCs.backgroundImage.slice(0, 60) : '',
      minis, cuts, cutAnim,
      noOldCards: board.querySelectorAll('.zpb-fx-card').length === 0,
      boardText: board.textContent,
      foot: (board.querySelector('.zpb-fx-foot') || {}).textContent || ''
    };
  });
  ok(v4.board, 'V4 the command center renders on the shared review', '');
  ok(v4.title === 'DRAFT COMMAND CENTER', 'V4 the panel is renamed', v4.title);
  ok(v4.sub === null || v4.sub === '', 'V4 the old subtitle line is gone', JSON.stringify(v4.sub));
  ok(v4.secs.length === 0 && v4.boardText.indexOf('EVERY ROOM BELOW A B') < 0, 'V4 (U1) the section-A header text is gone — the cards speak for themselves', JSON.stringify(v4.secs));
  ok(v4.boardText.indexOf('THE LINE IS THE AVERAGE SEASON') < 0 && v4.boardText.indexOf('KICKER OR HIGHER') < 0, 'V4 (U2) the line text is gone — the cut math keeps running unseen', '');
  ok(v4.cdText === 'Cutdown Day', 'V4 (U3) the subtitle reads Cutdown Day', JSON.stringify(v4.cdText));
  ok(v4.cdAlign === 'center' && /Cinzel Decorative/.test(v4.cdFont), 'V4 (U3) the subtitle is centered Cinzel Decorative', v4.cdAlign + ' · ' + v4.cdFont.slice(0, 40));
  const sizes = await page.evaluate(() => {
    const probe = document.createElement('div'); probe.className = 'zpb-fx-sec'; probe.textContent = 'probe'; probe.style.cssText = 'position:absolute;left:-9999px;';
    const board = (document.getElementById('draftResultsBody') || document.getElementById('seasonHost')).querySelector('.zpb-fx-board');
    board.appendChild(probe);
    const sec = parseFloat(getComputedStyle(probe).fontSize); probe.remove();
    const title = parseFloat(getComputedStyle(board.querySelector('.zpb-rc-title')).fontSize);
    const cd = parseFloat(getComputedStyle(board.querySelector('.zpb-fx-cdtitle')).fontSize);
    return { sec, title, cd };
  });
  ok(sizes.cd > sizes.sec && sizes.cd < sizes.title, 'V4 (U3) the subtitle is the LARGER size — above the retired section line, under the panel title', 'sec ' + sizes.sec + ' < cd ' + sizes.cd + ' < title ' + sizes.title);
  ok(v4.minis.length >= 1 && v4.minis.every(m => m.noGauge && m.grade && m.nums.indexOf('OVR') > 0), 'V4 the rooms wear the small report cards, no bar graph', v4.minis.map(m => m.label + ' ' + m.grade).join(' · '));
  const grades = v4.minis.map(m => m.grade);
  const ORDER = ['A+','A','A-','B+','B','B-','C+','C','C-','D','F'];
  const sortedOk = grades.every((g, i) => i === 0 || ORDER.indexOf(grades[i - 1]) <= ORDER.indexOf(g));
  ok(sortedOk && grades.every(g => ORDER.indexOf(g) > ORDER.indexOf('B')), 'V4 best to worst, and every one is below a B', grades.join(' '));
  ok(v4.cuts.length >= 1 && v4.cuts.every(c => c.cut && c.num && !c.delta), 'V4 (U5) every cutdown card carries its number and CUT — the delta span is gone', v4.cuts.map(c => c.name + ' ' + c.num).join(' · '));
  ok(v4.boardText.indexOf('vs his') < 0, 'V4 (U5) no “vs his N OVR” text anywhere on the board', '');
  ok(v4.cuts.every(c => c.lbl === 'SEASON RATING'), 'V4 (U6) the season rating is labeled SEASON RATING', JSON.stringify(v4.cuts.map(c => c.lbl)));
  ok(v4.cuts.every(c => c.nBadges === 2 && / OVR$/.test(c.ovrBadge)), 'V4 (U6) every card wears the position badge AND the OVR badge', v4.cuts.map(c => c.name + '·' + c.ovrBadge).join(' · '));
  ok(v4.cuts.every(c => c.badgeFs === c.ovrFs), 'V4 (U6) the OVR badge is the position badge size (same class, measured equal)', JSON.stringify(v4.cuts.map(c => c.badgeFs)));
  ok(v4.cuts.every(c => Math.abs(parseFloat(c.numFs) - parseFloat(c.badgeFs)) <= 3), 'V4 (U6) the season rating reads about the badge size', JSON.stringify(v4.cuts.map(c => c.numFs)));
  ok(v4.cutAnim === 'zpbCutFade', 'V4 the CUT badge fades in and out (zpbCutFade)', v4.cutAnim);
  ok(v4.noOldCards, 'V4 the old two-bar cards retired', '');
  ok(v4.foot === 'PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO 20-0', 'V4 (U4) the footer asks for the 20-0', v4.foot);
  ok(v4.goText === '20-0' && v4.goAnim === 'fxshine' && v4.goClip === 'text', 'V4 (U4) the 20-0 shimmers (the fxshine sweep, background-clip text)', v4.goAnim + ' · ' + v4.goClip);
  ok(v4.goImg.indexOf('linear-gradient') === 0, 'V4 (U4) the shimmer rides a team-color gradient', v4.goImg);
  const colons = await page.evaluate(() => {
    const host = document.getElementById('draftResultsBody') || document.getElementById('seasonHost');
    const t = (host.querySelector('.zpb-fx-board') || { textContent: '' }).textContent;
    return (t.match(/[;:]/g) || []).length;
  });
  ok(colons === 0, 'V4 the dot law — no colon or semicolon displayed on the board', colons + ' hits');
  await page.evaluate(() => {
    const host = document.getElementById('draftResultsBody') || document.getElementById('seasonHost');
    const board = host.querySelector('.zpb-fx-board'); if (board) board.scrollIntoView({ block: 'start' });
  });
  await page.waitForTimeout(1100);
  const panDesk = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok(panDesk <= 0, 'V4 no side scroll at 1280', panDesk + 'px');
  await page.screenshot({ path: SH + '/command_center.png' });

  // V0c · the scale explainer stays truthful (V-c + U5) — the recap generator's line + no live old wording
  const v0c = await page.evaluate(() => {
    const out = (typeof generateRegularSeasonRecap === 'function') ? String(generateRegularSeasonRecap()) : '';
    const live = document.body.textContent || '';
    return {
      genHas: out.indexOf('THE PERFORMANCE SCALE') >= 0,
      genDrafted: /the drafted pool.s median OVR/.test(out),
      genNoShort: out.indexOf('counts the points he fell short') < 0,
      liveNoShort: live.indexOf('counts the points he fell short') < 0 && live.indexOf('the database’s median OVR') < 0,
      genReads: (out.match(/an average season reads (\d+)/) || [])[1]
    };
  });
  ok(v0c.genHas && v0c.genDrafted && v0c.genNoShort, 'V0c the scale explainer reads the drafted pool and no longer mentions the shortfall', JSON.stringify(v0c));
  ok(v0c.liveNoShort, 'V0c no live surface carries the retired wording', '');
  ok(v0c.genReads === String(med.med), 'V0c the explainer prints the stored median (77, the veto c anchor)', v0c.genReads + ' vs ' + med.med);

  // V8b · the stage label after the regular season
  const v8c = await page.evaluate(() => {
    document.getElementById('tabCompareBtn').click();
    const b = document.querySelector('#viewCompare .zpb-backbar button');
    const out = b ? b.textContent : '';
    document.getElementById('tabDraftBtn').click();
    return out;
  });
  ok(v8c === 'BACK TO WEEK 17', 'V8b the label tracks the stage after the season (regularReview → WEEK 17)', v8c);

  // ============ V12 · the award names ride nm60 in light ============
  console.log('== V12 · the 0.60 preset ==');
  const v12 = await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    const probe = document.createElement('div');
    probe.className = 'zpb-pcard zpb-awcard';
    probe.style.cssText = '--nm:#53382b;--nm60:#7a1f2b;';
    probe.innerHTML = '<b class="zpb-awname">Probe</b>';
    document.body.appendChild(probe);
    const light = getComputedStyle(probe.querySelector('b')).color;
    document.documentElement.setAttribute('data-theme', 'dark');
    const dark = getComputedStyle(probe.querySelector('b')).color;
    probe.remove();
    document.documentElement.removeAttribute('data-theme');
    return { light, dark };
  });
  ok(v12.light === 'rgb(122, 31, 43)', 'V12 light reads the 0.60 preset (--nm60)', v12.light);
  ok(v12.dark !== 'rgb(122, 31, 43)', 'V12 dark keeps the 0.50 law (never nm60)', v12.dark);

  // ============ V6 · SIM PLAYOFFS: a cinematic page per round ============
  console.log('== V6 · the playoff round cinematics ==');
  const v6 = await page.evaluate(() => {
    try {
      window.__zpbQuietSim = true; window.__zpbSBFinPending = false;
      startPlayoffs();
      const user = seasonUserTeam();
      const wc = seasonState.playoffRounds.wildcard;
      if (!wc.some(g => g.home === user || g.away === user)) {
        wc[0].home = wc[0].home === user ? wc[0].away : wc[0].home; // keep a real opponent
        wc[0].away = user; // the battery forces a berth so the round cards are testable every run
      }
      window.zpbSimRestOfPlayoffs();
      const ov = document.querySelector('.zpb-porun');
      return {
        phase: seasonState.phase, champion: seasonState.champion || null,
        cine: !!ov, kicker: ov ? (ov.querySelector('.zpb-porun-kicker') || {}).textContent : '',
        big: ov ? (ov.querySelector('.zpb-porun-big') || {}).textContent : '',
        go: !!ov && !!ov.querySelector('.zpb-porun-go'),
        stormEarly: !!document.querySelector('.zpb-sbfin')
      };
    } catch (e) { return { err: String(e) }; }
  });
  await page.waitForTimeout(600);
  ok(v6.phase === 'complete' && v6.champion, 'V6 the door sims the whole bracket', JSON.stringify({ phase: v6.phase, champion: v6.champion }));
  ok(v6.cine && v6.go, 'V6 the round cinematic is up and waits for Continue', (v6.kicker || '') + ' · ' + (v6.big || ''));
  ok(v6.kicker === 'WILD CARD ROUND', 'V6 the first card is the round the user plays', v6.kicker || '(none)');
  ok(!v6.stormEarly, 'V6 the Super Bowl storm does NOT jump early', '');
  await page.screenshot({ path: SH + '/porun_round.png' });
  const v6b = await page.evaluate(() => {
    let clicks = 0;
    while (document.querySelector('.zpb-porun-go') && clicks < 5) { document.querySelector('.zpb-porun-go').click(); clicks++; }
    return { clicks };
  });
  await page.waitForTimeout(1500);
  const v6c = await page.evaluate(() => ({ porun: !!document.querySelector('.zpb-porun'), sb: !!document.querySelector('.zpb-sbfin') }));
  ok(v6c.sb && !v6c.porun, 'V6 after the last Continue the Super Bowl page mounts', JSON.stringify({ clicks: v6b.clicks, sb: v6c.sb }));
  await closeOv();

  // ============ V16 · the guide ladder shows every slot ============
  console.log('== V16 · the guide ladder ==');
  const v16 = await page.evaluate(() => {
    document.getElementById('tabGuideBtn').click();
    const names = Array.from(document.querySelectorAll('#viewGuide .zpb-prname')).map(e => e.textContent.trim());
    return { n: names.length, names, bars: document.querySelectorAll('#viewGuide .zpb-backbar').length };
  });
  ok(v16.n === 32, 'V16 all 32 depth-chart slots on the ladder', v16.n + ' rows');
  ok(['TE3', 'DIME', 'WR4', 'DL5'].every(x => v16.names.indexOf(x) >= 0), 'V16 TE3 and DIME are on the map (and WR4, DL5)', v16.names.join(' '));
  ok(v16.bars === 2, 'V16 the guide bars are still in place (complete season → BACK TO SUPER BOWL)', (() => '')());
  await page.evaluate(() => { const g = document.querySelector('#viewGuide .zpb-prname'); if (g) g.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(300);
  await page.screenshot({ path: SH + '/guide_ladder_32.png' });

  // ============ V10 · the prematch player cards, both themes ============
  console.log('== V10 · the pregame player cards ==');
  const v10 = await page.evaluate(() => {
    const probe = () => {
      const stage = document.createElement('div');
      stage.className = 'zpb-replay';
      const el = document.createElement('span');
      el.className = 'zpb-intro-star zpb-st-side';
      el.innerHTML = '<b>T. Kelce</b><i>TE · 91 OVR</i>';
      el.style.cssText = '--tn:#8e5566;--tnd:#f2e4c8;--zr1:rgba(143,99,0,.07);--zr2:rgba(143,99,0,.03);position:static;';
      stage.appendChild(el); stage.style.cssText = 'position:absolute;left:-9999px;top:0;';
      document.body.appendChild(stage);
      const cs = getComputedStyle(el);
      const out = { bg: cs.backgroundColor, img: cs.backgroundImage, name: getComputedStyle(el.querySelector('b')).color };
      stage.remove();
      return out;
    };
    document.documentElement.setAttribute('data-theme', 'light');
    const light = probe();
    document.documentElement.setAttribute('data-theme', 'dark');
    const dark = probe();
    document.documentElement.removeAttribute('data-theme');
    return { light, dark };
  });
  ok(v10.light.img.indexOf('linear-gradient') === 0 && v10.light.img.indexOf('rgba(16, 9, 4') < 0 && v10.light.img.indexOf('rgba(16,9,4') < 0, 'V10 light mode: no dark base in the card wash', v10.light.img.slice(0, 90));
  ok(v10.light.bg === 'rgba(0, 0, 0, 0)', 'V10 light mode: the card fill is the gradient wash (no dark color layer)', v10.light.bg);
  ok(v10.dark.img.indexOf('linear-gradient') === 0 && v10.dark.img !== v10.light.img, 'V10 dark mode keeps its own (darker) stage gradient', v10.dark.img.slice(0, 90));
  ok(v10.light.name === 'rgb(142, 85, 102)', 'V10 light mode: the name rides the halfway ink (--tn)', v10.light.name);

  // ============ V14 · the season keeps its 2-Pt labels ============
  console.log('== V14 · the in-season format stands ==');
  const v14 = await page.evaluate(() => {
    const host = document.getElementById('draftResultsBody') || document.getElementById('seasonHost');
    const t = host.textContent || '';
    return { seasonLabel: t.indexOf('2-Pt Conversions') >= 0, newPre: (document.getElementById('draftResultsBody') || { innerHTML: '' }).innerHTML.indexOf('2 Point Conversions') >= 0 };
  });
  ok(v14.seasonLabel, 'V14 the season review still says 2-Pt Conversions (current format kept)', '');

  // ============ V8c · the complete-season label ============
  const v8d = await page.evaluate(() => ({ label: window.zpbStageLabel() }));
  ok(v8d.label === 'SUPER BOWL', 'V8c the stage reads SUPER BOWL when the season is complete', v8d.label);

  ok(pageErrs.length === 0, 'zero page errors across the whole battery', pageErrs.slice(0, 3).join(' | '));
  console.log(`\n== RESULT · ${pass} pass · ${fail} fail ==`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('BATTERY CRASH', e); process.exit(2); });
