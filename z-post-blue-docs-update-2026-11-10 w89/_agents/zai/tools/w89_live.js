/* w89_live.js v2 — resequenced: the dock's RUN IT BACK checks run once a season exists; the
 * phone pass runs on the week-1 preview (where the strip lives); the playoffs drive through the
 * engine (the sim draft may miss them); the champion laws read the complete page. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w89.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
const SHOTS = '/home/z/my-project/work/evidence';
require('fs').mkdirSync(SHOTS, { recursive: true });
const clean = (page) => page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov,.zpb-prematch,.zpb-story-veil,.confirm-ov,.zpb-caution-ov').forEach(o => o.remove()); } catch (e) {} });

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1400 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 140)));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + String(m.text()).slice(0, 140)); });
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  // ---- L1 · the player browser splash ----
  await page.evaluate(() => { const b = document.getElementById('tabPlayersBtn'); if (b) b.click(); });
  await page.waitForTimeout(600);
  const l1 = await page.evaluate(() => {
    const spl = document.getElementById('playerSearchSplash'), tbl = document.getElementById('playerTable');
    return { splShown: spl && getComputedStyle(spl).display === 'flex', tblHidden: tbl && getComputedStyle(tbl).display === 'none', splText: spl ? spl.textContent.trim() : '' };
  });
  ok(l1.splShown && l1.tblHidden && l1.splText === 'SEARCH', 'L1a · the search menu opens on the word SEARCH', JSON.stringify(l1));
  await page.evaluate(() => { const i = document.getElementById('playerSearch'); if (i) { i.value = 'mahomes'; i.dispatchEvent(new Event('input', { bubbles: true })); } });
  await page.waitForTimeout(500);
  const l1b = await page.evaluate(() => {
    const spl = document.getElementById('playerSearchSplash'), tbl = document.getElementById('playerTable');
    return { splGone: spl && getComputedStyle(spl).display === 'none', tblBack: tbl && getComputedStyle(tbl).display !== 'none', rows: document.querySelectorAll('#playerBody tr').length };
  });
  ok(l1b.splGone && l1b.tblBack && l1b.rows > 0, 'L1b · typing hands the panel to the table', JSON.stringify(l1b));
  await page.screenshot({ path: SHOTS + '/w89-splash-search.png', clip: { x: 0, y: 0, width: 1280, height: 900 } });
  await page.evaluate(() => { const i = document.getElementById('playerSearch'); if (i) { i.value = ''; i.dispatchEvent(new Event('input', { bubbles: true })); } });

  // ---- R2 · the guide's Wins table reads without its caption ----
  await page.evaluate(() => { const b = document.getElementById('tabGuideBtn'); if (b) b.click(); });
  await page.waitForTimeout(700);
  const r2h = await page.evaluate(() => ({
    caption: document.body.textContent.includes('extra wins per season, 20-OVR upgrade at the local rate'),
    rank: !!document.querySelector('.zpb-posrank') }));
  ok(!r2h.caption && r2h.rank, 'R2h · the guide ranking stands alone — the Wins caption is gone', JSON.stringify(r2h));
  await page.screenshot({ path: SHOTS + '/w89-guide-rank.png', clip: { x: 0, y: 0, width: 1280, height: 900 } });

  // ---- draft to the end (49ers) ----
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(500);
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'San Francisco 49ers'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await page.waitForTimeout(500);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(800);

  // ---- L2a · the dock exists post-draft (no season → no RUN IT BACK yet) ----
  const l2a = await page.evaluate(() => {
    const dock = document.getElementById('zpbSeasonDock');
    if (!dock) return { nodock: true };
    const cs = getComputedStyle(dock);
    const panel = document.getElementById('draftFinalResults'), body = document.getElementById('draftResultsBody');
    return { afterBody: !!(panel && panel.nextElementSibling === dock && body && panel.contains(body)), sticky: cs.position, bottom: cs.bottom, overX: cs.overflowX, h: Math.round(dock.getBoundingClientRect().height) };
  });
  ok(l2a.afterBody && l2a.sticky === 'sticky' && l2a.overX === 'auto' && l2a.h > 0, 'L2a · the dock is the sticky bottom strip below the body', JSON.stringify(l2a));
  await page.screenshot({ path: SHOTS + '/w89-draft-review-dock.png', fullPage: false });

  // ---- start the season → the dock gains RUN IT BACK between NEW DRAFT and 100 SEASONS ----
  await page.evaluate(() => { const b = document.getElementById('resultsSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(700);
  const l2b = await page.evaluate(() => {
    const ops = document.getElementById('zpbDraftOps');
    const kids = ops ? [...ops.children].map(x => x.id || '') : [];
    return { kids, hundredIn: document.getElementById('sim100Btn') ? document.getElementById('sim100Btn').closest('#zpbDraftOps') === ops : false };
  });
  const iRIB = l2b.kids.indexOf('dockRunItBackBtn'), iND = l2b.kids.indexOf('newDraftBtn');
  ok(iND === 0 && iRIB === 1 && l2b.hundredIn, 'L2b · the strip reads NEW DRAFT · RUN IT BACK · 100 SEASONS', JSON.stringify(l2b));
  await page.evaluate(() => { const b = document.getElementById('dockRunItBackBtn'); if (b) b.click(); });
  await page.waitForTimeout(400);
  const l2c = await page.evaluate(() => { const o = document.querySelector('.zpb-caution-ov, .confirm-ov'); const t = o ? o.textContent : ''; const good = o && /Run it back/i.test(t) && /same roster/i.test(t); if (o) o.remove(); return good; });
  ok(l2c, 'L2c · the dock RUN IT BACK opens the same caution', '');
  await clean(page);

  // ---- L3 · the preseason page ----
  const cine = await page.evaluate(() => { const c = document.querySelector('.zpb-precine'); return c ? { up: true, kicker: c.querySelector('.zpb-precine-kicker') ? c.querySelector('.zpb-precine-kicker').textContent : '', line: c.querySelector('.zpb-precine-line') ? c.querySelector('.zpb-precine-line').textContent : '' } : { up: false }; });
  ok(cine.up && cine.kicker === 'TRAINING CAMP' && cine.line === 'SET UP THE SAN FRANCISCO 49ERS', 'L3a · the preseason cinematic plays (the setup panel is gone)', JSON.stringify(cine));
  await page.screenshot({ path: SHOTS + '/w89-preseason-cine.png' });
  await page.evaluate(() => { const c = document.querySelector('.zpb-precine'); if (c) c.click(); });
  await page.waitForTimeout(1300);
  const l3 = await page.evaluate(() => {
    const host = document.getElementById('draftResultsBody') || document.body;
    const h3s = [...host.querySelectorAll('h3')].map(h => h.textContent.trim());
    const flex = [...host.querySelectorAll('summary')].some(s => s.textContent.trim() === 'NEW TO LINEUP?');
    const so = document.getElementById('scriptOff'), sd = document.getElementById('scriptDef');
    const autoOff = so ? so.options[0].textContent : '', autoDef = sd ? sd.options[0].textContent : '';
    const sums = [...host.querySelectorAll('details.zpb-dd > summary')].map(s => s.textContent.trim());
    const iTerms = sums.findIndex(t => t === 'WHAT DO THESE TERMS MEAN?');
    const iWhy = sums.findIndex(t => t === 'WHY THIS STYLE?');
    const aggr = document.getElementById('aggrSel');
    const aggrInLabel = aggr && aggr.closest('label');
    const aggrDivText = aggr && aggr.parentElement ? (aggr.parentElement.firstChild === aggr ? '' : 'text-before-select') : 'noaggr';
    const badges = [...host.querySelectorAll('.zpb-tpbadge')].map(b => b.textContent.replace(/\s+/g, ' ').trim());
    const why = [...host.querySelectorAll('details.zpb-dd')].find(d => d.querySelector('summary') && d.querySelector('summary').textContent.trim() === 'WHY THIS STYLE?');
    let whyOk = false; if (why) { why.open = true; whyOk = why.textContent.includes('The model tries all 15 ways') && why.querySelectorAll('.zpb-styletb').length >= 2; }
    return { first: h3s[0] || '', flex, autoOff, autoDef, iTerms, iWhy, aggrInLabel: !!aggrInLabel, aggrDivText, badges, whyOk };
  });
  ok(l3.first === '1. LINEUP', 'L3b · the first thing on the preseason page is 1. LINEUP', l3.first);
  ok(l3.flex, 'L3c · NEW TO LINEUP? carries the flex footer', '');
  ok(l3.autoOff === 'AUTO' && l3.autoDef === 'AUTO', 'L3d · both philosophy statics read AUTO', l3.autoOff + ' / ' + l3.autoDef);
  ok(l3.iTerms >= 0 && l3.iWhy >= 0 && l3.iTerms < l3.iWhy, 'L3e · WHAT DO THESE TERMS MEAN? sits above the one WHY THIS STYLE?', 'terms@' + l3.iTerms + ' why@' + l3.iWhy);
  ok(!l3.aggrInLabel, 'L3f · the Style select lives in no label (the second dropdown cannot open)', '');
  ok(l3.aggrDivText === '', 'R2g · the Style word is gone — the dropdown leads its own row', JSON.stringify(l3.aggrDivText));
  ok(l3.badges.length === 2 && l3.badges[0].includes('1 PT') && l3.badges[0].includes('94%') && l3.badges[1].includes('2 PT') && l3.badges[1].includes('48%'), 'L3g · the two-point try reads as badges', JSON.stringify(l3.badges));
  ok(l3.whyOk, 'L3h · the combined WHY THIS STYLE? carries the math + both style tables', '');
  await page.screenshot({ path: SHOTS + '/w89-preseason-page.png', fullPage: false });

  // ---- begin the season · the week-1 PREVIEW lives — the phone pass reads the strip here ----
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn2'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  await clean(page);
  await page.evaluate(() => { try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(900);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(900);
  const l8 = await page.evaluate(() => {
    const strip = document.querySelector('.zpb-strip');
    let stripStacked = false, stripInfo = null;
    if (strip) { const cs = getComputedStyle(strip); const bar = strip.querySelector('.zpb-strip-bar'); const bcs = bar ? getComputedStyle(bar) : null;
      stripInfo = { cols: cs.gridTemplateColumns.split(' ').length, barCol: bcs ? bcs.gridColumn : '' };
      stripStacked = cs.gridTemplateColumns.split(' ').length === 2 && bcs && bcs.gridColumn === '1 / -1'; }
    const dock = document.getElementById('zpbSeasonDock');
    const dcs = dock ? getComputedStyle(dock) : null;
    let dockLine = null;
    if (dock) { const r = dock.getBoundingClientRect(); const ops = dock.querySelector('.zpb-draftops');
      const opcs = ops ? getComputedStyle(ops) : null;
      const oneRow = Math.round(r.height) < 80;
      dockLine = { dir: dcs.flexDirection, h: Math.round(r.height), oneRow, scrollable: dock.scrollWidth > dock.clientWidth + 2, opsWrap: opcs ? opcs.flexWrap : '', opsH: ops ? Math.round(ops.getBoundingClientRect().height) : 0 }; }
    return { stripStacked, stripInfo, dockSticky: dcs ? dcs.position : '', dockScroll: dcs ? dcs.overflowX : '', dockLine, panX: document.documentElement.scrollWidth - document.documentElement.clientWidth };
  });
  ok(l8.stripStacked, 'L8a · the preview strip stacks on the phone (the bar takes its own line)', JSON.stringify(l8));
  ok(l8.dockSticky === 'sticky' && l8.dockScroll === 'auto' && l8.dockLine && l8.dockLine.dir === 'row' && l8.dockLine.oneRow && l8.dockLine.scrollable && l8.dockLine.opsWrap === 'nowrap', 'L8b · the dock side-scrolls at 390px as ONE line', JSON.stringify(l8.dockLine));
  ok(l8.panX <= 0, 'L8c · no horizontal pan at 390px', 'pan ' + l8.panX + 'px');
  await page.screenshot({ path: SHOTS + '/w89-phone-preview.png' });
  await page.setViewportSize({ width: 1280, height: 1400 });
  await page.waitForTimeout(600);

  // ---- R2 · the top doors (Owner round 2) ----
  const r2a = await page.evaluate(() => {
    const body = document.getElementById('draftResultsBody');
    const strip = document.getElementById('zpbTopSimStrip');
    if (!strip || !body) return { no: true };
    const cs = getComputedStyle(strip);
    const ids = [...strip.querySelectorAll('button')].map(b => b.id);
    return { first: body.firstElementChild === strip, jc: cs.justifyContent, ids,
      dockSeason: !!document.getElementById('simSeasonBtn'), dockGame: !!document.getElementById('simGameBtn') };
  });
  ok(!r2a.no && r2a.first && r2a.jc === 'flex-end' && r2a.ids[0] === 'simGameBtnHead' && r2a.ids[1] === 'simSeasonBtnHead' && r2a.dockSeason && r2a.dockGame,
    'R2a · the top strip: SIM GAME · SIM SEASON right-aligned as the first thing on the page, the dock keeps its copies', JSON.stringify(r2a));
  await page.screenshot({ path: SHOTS + '/w89-topstrip.png', clip: { x: 0, y: 0, width: 1280, height: 900 } });
  await page.evaluate(() => { const b = document.getElementById('simGameBtnHead'); if (b) b.click(); });
  await page.waitForTimeout(2200);
  await clean(page);
  const r2b = await page.evaluate(() => {
    const S = seasonState;
    const week = S.currentWeek;
    const ug = S.schedule.find(g => g.week === week && (g.home === seasonUserTeam() || g.away === seasonUserTeam()));
    return { simmed: S.weekSimulated, played: !!(ug && ug.result), reviewUp: !!document.getElementById('zpbGameReviewNow'),
      stripGameGone: !document.getElementById('simGameBtnHead'), stripSeason: !!document.getElementById('simSeasonBtnHead') };
  });
  ok(r2b.simmed && r2b.played && r2b.reviewUp, 'R2b · the top SIM GAME door plays the week and lands on the Game Review', JSON.stringify(r2b));
  ok(r2b.stripGameGone && r2b.stripSeason, 'R2c · after the sim the strip mirrors the dock — SIM SEASON only', JSON.stringify(r2b));
  // the dock door carries ONE wiring: double renders may never stack a second sim (a stacked click re-fired the game replay)
  const readyLoop = async () => { for (let i = 0; i < 18; i++) {
    const ready = await page.evaluate(() => { try { const S = seasonState; return S.phase === 'regular' && !S.weekSimulated && S.schedule.some(g => g.week === S.currentWeek && (g.home === seasonUserTeam() || g.away === seasonUserTeam())); } catch (e) { return false; } });
    if (ready) return true;
    await page.evaluate(() => { try { advanceWeek(); } catch (e) {} });
    await page.waitForTimeout(120);
  } return false; };
  await page.evaluate(() => { try { advanceWeek(); } catch (e) {} });
  await readyLoop();
  await page.evaluate(() => { try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(600);
  const r2d = await page.evaluate(() => {
    let calls = 0; const orig = window.zpbGameReplay;
    window.zpbGameReplay = function(){ calls++; };
    const b = document.getElementById('simGameBtn');
    if (b) b.click();
    window.zpbGameReplay = orig;
    const S = seasonState;
    const nextPlayed = S.schedule.filter(g => g.week === S.currentWeek + 1 && g.result).length;
    return { clicked: !!b, calls, simmed: S.weekSimulated, nextWeekClean: nextPlayed === 0 };
  });
  ok(r2d.clicked && r2d.calls === 1 && r2d.simmed && r2d.nextWeekClean,
    'R2d · the dock door: double renders, one click, ONE replay and one sim week (the wiring guard)', JSON.stringify(r2d));
  await clean(page);
  await page.evaluate(() => { try { advanceWeek(); } catch (e) {} });
  await readyLoop();
  await page.waitForTimeout(300);

  // ---- play week 1 · the box score ----
  await page.evaluate(() => { try { simulateCurrentWeek(); } catch (e) {} });
  await page.waitForTimeout(2200);
  await clean(page);
  await page.evaluate(() => { try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1200);
  const l4 = await page.evaluate(() => {
    const ls = document.querySelector('.linescore');
    if (!ls) return { nols: true };
    const tds = ls.querySelectorAll('tbody td:not(:first-child)');
    const ths = ls.querySelectorAll('th:not(:first-child)');
    const tr = ls.querySelector('tbody tr');
    const st = tr.getAttribute('style') || '';
    const m = /--zrb:([^;]+)/.exec(st);
    const nameCell = ls.querySelector('tbody td:first-child');
    return { tdBorder: tds.length ? getComputedStyle(tds[0]).borderLeftWidth : '', thBorder: ths.length ? getComputedStyle(ths[0]).borderLeftWidth : '', ink: m ? m[1].slice(0, 40) : '', nameShadow: nameCell ? getComputedStyle(nameCell).boxShadow : '' };
  });
  ok(!l4.nols && l4.tdBorder === '1px' && l4.thBorder === '1px', 'L4a · the box score carries vertical lines between the quarters and F', JSON.stringify(l4));
  ok(l4.ink !== '' && (l4.nameShadow === 'none' || l4.nameShadow === ''), 'L4b · the verticals ride the team ink; the dark name-bar law holds', l4.ink + ' · shadow ' + l4.nameShadow);
  await page.screenshot({ path: SHOTS + '/w89-boxscore.png', clip: { x: 0, y: 0, width: 1280, height: 1000 } });

  // ---- sim the rest of the season → the review ----
  await page.evaluate(() => { try { simRestOfSeason(); } catch (e) {} });
  await page.waitForTimeout(1500);
  await clean(page);
  await page.evaluate(() => { try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1000);
  const l5 = await page.evaluate(() => {
    const bp = document.getElementById('beginPlayoffsBtn');
    const row = bp ? bp.parentElement.textContent.toUpperCase() : '';
    const missedPanel = document.querySelector('.zpb-sr-own');
    return { phase: seasonState ? seasonState.phase : 'none', hasBP: !!bp, rowHasRIB: row.includes('RUN IT BACK'), rowHasSimPo: row.includes('SIM PLAYOFFS'), missedHasRIB: missedPanel ? missedPanel.textContent.toUpperCase().includes('RUN IT BACK') : false };
  });
  ok(l5.phase === 'regularReview', 'L5a · the review page is up', l5.phase);
  if (l5.hasBP) ok(!l5.rowHasRIB && l5.rowHasSimPo, 'L5b · BEGIN PLAYOFFS row keeps no RUN IT BACK', '');
  else ok(l5.missedHasRIB, 'L5b · the sim team missed the playoffs — its own RUN IT BACK door stands (not the BEGIN PLAYOFFS row)', 'missed path');
  await page.screenshot({ path: SHOTS + '/w89-review-top.png', clip: { x: 0, y: 0, width: 1280, height: 900 } });

  // ---- playoffs → complete ----
  await page.evaluate(() => { try { startPlayoffs(); } catch (e) {} });
  await page.waitForTimeout(800);
  await clean(page);
  await page.evaluate(() => { try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(700);
  const seedProbe = await page.evaluate(() => {
    try { const g = { awaySeed: 1, awayConf: 'AFC', homeSeed: 4, homeConf: 'NFC', away: 'X', home: 'Y' };
      return { seed1: seedLabel(g, 'away').includes('zpb-shm') && seedLabel(g, 'away').includes('AFC #1'), other: seedLabel(g, 'home').includes('zpb-shm') === false };
    } catch (e) { return { err: String(e).slice(0, 80) }; }
  });
  ok(seedProbe.seed1 && seedProbe.other, 'L5c · AFC #1 shimmers; the other seeds do not', JSON.stringify(seedProbe));

  for (let r = 0; r < 5; r++) {
    const ph = await page.evaluate(() => { try { return seasonState ? seasonState.phase : 'none'; } catch (e) { return 'err'; } });
    if (ph === 'complete') break;
    await page.evaluate(() => { try { if (!seasonState.playoffRoundSimulated) simulatePlayoffRound(); if (seasonState.phase !== 'complete') advancePlayoffRound(); } catch (e) {} });
    await page.waitForTimeout(600);
    await clean(page);
    await page.evaluate(() => { try { window.__zpbSBFinPending = false; window.__zpbSBReplayHold = false; window.__zpbPoRunHold = false; window.__zpbSimRestRun = false; renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
    await page.waitForTimeout(700);
  }
  const l6 = await page.evaluate(() => {
    const complete = seasonState && seasonState.phase === 'complete';
    const ct = document.querySelector('.zpb-champtop');
    const btns = ct ? [...ct.querySelectorAll('button')].map(b => b.id || '') : [];
    const own = document.querySelector('.zpb-sr-own');
    const sg = document.getElementById('simGameBtn');
    const dock = document.getElementById('zpbSeasonDock');
    return { complete, btns, ownHasSR: own ? own.textContent.includes('SEASON REVIEW') : false, ownHasRIB: own ? own.textContent.toUpperCase().includes('RUN IT BACK') : false, simGameGone: !sg, dockHasRIB: dock ? !!document.getElementById('dockRunItBackBtn') : false };
  });
  ok(l6.complete, 'L6a · the season reached complete', '');
  ok(l6.btns.length === 1 && l6.btns[0] === 'zpbTryAgainBtn' && l6.ownHasSR && !l6.ownHasRIB, 'L6b · the champions page: the try-again bar, SEASON REVIEW below, RUN IT BACK only in the dock', JSON.stringify(l6));
  ok(l6.simGameGone, 'L6c · SIM GAME is not available on the champions page', '');
  ok(l6.dockHasRIB, 'L6d · the dock carries RUN IT BACK at complete', '');
  await page.screenshot({ path: SHOTS + '/w89-champion-top.png', clip: { x: 0, y: 0, width: 1280, height: 900 } });

  // the victory page when the user won
  const won = await page.evaluate(() => { try { return seasonState.champion === seasonUserTeam(); } catch (e) { return false; } });
  if (won) {
    await page.evaluate(() => { try { window.__zpbSBFinPending = true; zpbPostSuperBowlCine(); } catch (e) {} });
    await page.waitForTimeout(1300);
    const l7 = await page.evaluate(() => {
      const v = document.querySelector('.zpb-victory');
      const fin = document.querySelector('.zpb-sbfin');
      const sub = v ? v.querySelector('.zpb-victory-sub') : null;
      const dyn = v ? v.querySelector('.zpb-victory-dyn') : null;
      const spans = dyn ? [...dyn.querySelectorAll('span')].map(s => s.textContent) : [];
      return { victory: !!v, finSkipped: !fin, sub: sub ? sub.textContent : '', spans };
    });
    ok(l7.victory && l7.finSkipped && l7.sub === 'THE FINAL WHISTLE' && l7.spans.length === 3, 'L7 · the win plays only the victory page — dynamic text, staggered', JSON.stringify(l7));
    await page.screenshot({ path: SHOTS + '/w89-victory.png' });
  } else {
    console.log('   SKIP  L7 · the user did not win this sim season (the victory laws hold structurally — A28/A29 + the direct mount probe below)');
    await page.evaluate(() => { try { window.__zpbSBFinPending = true; zpbPostSuperBowlCine(); } catch (e) {} });
    await page.waitForTimeout(900);
    const l7b = await page.evaluate(() => ({ finMounted: !!document.querySelector('.zpb-sbfin') }));
    ok(l7b.finMounted, 'L7b · a lost Super Bowl still plays the conventional page (the skip is win-only)', JSON.stringify(l7b));
    await page.evaluate(() => { const f = document.querySelector('.zpb-sbfin'); if (f) f.remove(); });
  }

  // ---- R2 · the autosave bubble reads as one quiet door ----
  await page.waitForTimeout(400);
  await page.reload(); await page.waitForTimeout(1500);
  const r2e = await page.evaluate(() => {
    const b = document.getElementById('zpb-savebud');
    if (!b) return { nobud: true };
    return { up: !b.hidden && getComputedStyle(b).display !== 'none',
      kicker: !!b.querySelector('.zpb-bud-k'), body: !!b.querySelector('.zpb-bud-t'),
      notNow: !!b.querySelector('[data-zbud="no"]'),
      ret: !!b.querySelector('[data-zbud="go"]'), retLabel: (b.querySelector('[data-zbud="go"]')||{}).textContent || '' };
  });
  ok(!r2e.nobud && r2e.up && !r2e.kicker && !r2e.body && !r2e.notNow && r2e.ret && r2e.retLabel === 'Return to your season',
    'R2e · the autosave bubble is one quiet door — no words, no Not now', JSON.stringify(r2e));
  await page.screenshot({ path: SHOTS + '/w89-autosave-pill.png', clip: { x: 240, y: 1120, width: 800, height: 280 } });
  await page.evaluate(() => { const b = document.querySelector('#zpb-savebud [data-zbud="go"]'); if (b) b.click(); });
  await page.waitForTimeout(1300);
  const r2f = await page.evaluate(() => ({ restored: !!(seasonState && seasonState.champion), budGone: !document.getElementById('zpb-savebud') }));
  ok(r2f.restored && r2f.budGone, 'R2f · the door returns the finished season; the bubble leaves', JSON.stringify(r2f));

  ok(errors.length === 0, 'L9 · zero page errors across the whole run', errors.slice(0, 3).join(' | ') || 'clean');
  await browser.close();
  console.log(`\n${pass} pass · ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('RUNNER ERROR', e); process.exit(2); });
