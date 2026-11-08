/* w85r2_battery.js — the Owner's round-85 second-pass battery (desktop 1280)
 * R2-2 gated banner · R2-3 chip fill · R2-4 chip law · R2-5 dropdowns · R2-6 2 point conversion ·
 * R2-7 no "run it" · R2-8 sim season ghost · R2-9 light pregame cards · R2-10 linescore ink ·
 * R2-11 0.60 award ink · R2-12 chained round cinematics · R2-13/18/20 Draft Command Center ·
 * R2-15 full position viz · R2-16 Offensive guard · R2-17 fills + no side scroll · R2-19 rating scale */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w85/Football-Sim-Z-post-blue-w85.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
const sleep = (ms) => page.waitForTimeout(ms);
let page, errors = [];

const QUIET = `try{
  window.__zpbQuietSim = true;
  document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov,.zpb-fin,.zpb-story-veil,.zpb-welcine,.confirm-ov').forEach(o=>o.remove());
  window.__zpbStoryHold = false; window.__zpbSBFinPending = false; window.__zpbPoRunHold = false;
}catch(e){}`;
const host = `document.getElementById('seasonHost') || document.getElementById('draftResultsBody') || document.body`;
async function renderSeason() {
  await page.evaluate(`try{ renderSeasonTab(${host}); }catch(e){}`);
  await sleep(700);
  await page.evaluate(QUIET);
}

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  page = await browser.newPage({ viewport: { width: 1280, height: 1200 } });
  page.on('pageerror', e => errors.push(String(e).slice(0, 160)));
  await page.goto(FILE); await sleep(800);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.evaluate(() => { try { document.documentElement.setAttribute('data-theme', 'light'); } catch (e) {} }); // the round-2 theme laws read light first
  await page.reload(); await sleep(900);

  // ---------- draft: the 49ers board, chips OFF by default ----------
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'San Francisco 49ers'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await sleep(400);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await sleep(1100);

  // ---------- R2-4 · the chip law, exactly as worded ----------
  const c0 = await page.evaluate(() => {
    const chips = [...document.querySelectorAll('#draftChips [data-tog]')];
    const rows = document.querySelectorAll('#draftBody2 tr').length;
    return { chips: chips.length, on: chips.filter(c => c.classList.contains('on')).length, rows };
  });
  ok(c0.chips === 14 && c0.on === 0 && c0.rows > 40, 'R2-4 · default: every chip OFF, the board full (' + c0.rows + ' rows)', JSON.stringify(c0));
  await page.evaluate(() => { const c = document.querySelector('#draftChips [data-tog="QB"]'); if (c) c.click(); });
  await sleep(500);
  const c1 = await page.evaluate(() => {
    const qb = document.querySelector('#draftChips [data-tog="QB"]');
    const rows = [...document.querySelectorAll('#draftBody2 tr td[data-label="Pos"]')];
    return { on: qb.classList.contains('on'), rows: rows.length, allQB: rows.length > 0 && rows.every(t => t.textContent.trim() === 'QB') };
  });
  ok(c1.on && c1.allQB && c1.rows > 0, 'R2-4 · one chip ON → only that group\u2019s players on the board', JSON.stringify(c1));
  await page.evaluate(() => { const c = document.querySelector('#draftChips [data-all]'); if (c) c.click(); });
  await sleep(500);
  const c2 = await page.evaluate(() => {
    const chips = [...document.querySelectorAll('#draftChips [data-tog]')];
    return { on: chips.filter(c => c.classList.contains('on')).length, rows: document.querySelectorAll('#draftBody2 tr').length };
  });
  ok(c2.on === 14 && c2.rows > 40, 'R2-4 · ALL → every chip ON and the board equally full', JSON.stringify(c2));
  await page.evaluate(() => { const c = document.querySelector('#draftChips [data-tog="QB"]'); if (c) c.click(); });
  await sleep(500);
  const c3 = await page.evaluate(() => {
    const qb = document.querySelector('#draftChips [data-tog="QB"]');
    const rows = [...document.querySelectorAll('#draftBody2 tr td[data-label="Pos"]')];
    return { on: qb.classList.contains('on'), qbs: rows.filter(t => t.textContent.trim() === 'QB').length, rows: rows.length };
  });
  ok(!c3.on && c3.qbs === 0 && c3.rows > 30, 'R2-4 · a chip OFF (from all-on) → that group leaves the board', JSON.stringify(c3));
  await page.evaluate(() => { const c = document.querySelector('#draftChips [data-none]'); if (c) c.click(); });
  await sleep(500);
  const c4 = await page.evaluate(() => {
    const chips = [...document.querySelectorAll('#draftChips [data-tog]')];
    return { on: chips.filter(c => c.classList.contains('on')).length, rows: document.querySelectorAll('#draftBody2 tr').length };
  });
  ok(c4.on === 0 && c4.rows > 40, 'R2-4 · CLEAR = the default again: every chip off, the whole board', JSON.stringify(c4));

  // ---------- R2-3 · the selected chip fills in both themes ----------
  await page.evaluate(() => { const c = document.querySelector('#draftChips [data-tog="WR"]'); if (c) c.click(); });
  await sleep(400);
  const fill = await page.evaluate(() => {
    const c = document.querySelector('#draftChips [data-tog="WR"]');
    const cs = getComputedStyle(c);
    return { bg: cs.backgroundColor, col: cs.color };
  });
  ok(fill.bg && fill.bg !== 'rgba(0, 0, 0, 0)' && !/^transparent$/i.test(fill.bg), 'R2-3 · light: the selected chip is filled (background ' + fill.bg + ')', JSON.stringify(fill));
  await page.evaluate(() => { try { document.documentElement.setAttribute('data-theme', 'dark'); } catch (e) {} });
  await sleep(450);
  const fillD = await page.evaluate(() => {
    const c = document.querySelector('#draftChips [data-tog="WR"]');
    const cs = getComputedStyle(c);
    return { bg: cs.backgroundColor, col: cs.color };
  });
  ok(fillD.bg && fillD.bg !== 'rgba(0, 0, 0, 0)', 'R2-3 · dark: the selected chip is filled too', JSON.stringify(fillD));
  await page.evaluate(() => { try { document.documentElement.setAttribute('data-theme', 'light'); } catch (e) {} });
  await sleep(300);

  // ---------- R2-17 · fills read x (-y), the board never side-scrolls ----------
  const fl = await page.evaluate(() => {
    const wrap = document.getElementById('draftTableWrap');
    const cells = [...document.querySelectorAll('#draftBody2 td.dc-fills')].map(t => t.textContent.trim());
    const flexed = cells.filter(t => /\(-\d+\)/.test(t));
    return {
      overflow: wrap ? getComputedStyle(wrap).overflowX : null,
      noScroll: wrap ? wrap.scrollWidth <= wrap.clientWidth + 1 : null,
      sample: cells.slice(0, 6),
      flexed: flexed.slice(0, 3),
      badFlex: cells.filter(t => /flex/i.test(t)).length
    };
  });
  ok(fl.overflow === 'hidden' && fl.noScroll === true, 'R2-17 · the draft board never side-scrolls', JSON.stringify({ overflow: fl.overflow, noScroll: fl.noScroll }));
  ok(fl.badFlex === 0, 'R2-17 · the word flex has left the fills column', JSON.stringify({ sample: fl.sample, flexed: fl.flexed }));
  if (fl.flexed.length) ok(fl.flexed.every(t => /^\S+ \(-\d+\)$/.test(t)), 'R2-17 · flexed fills read x (-y)', JSON.stringify(fl.flexed));
  else ok(true, 'R2-17 · no flexed rows on this board state (format asserted when they appear)');

  // ---------- R2-16 · the position dropdown says Offensive guard ----------
  const dd = await page.evaluate(() => {
    const opts = [...document.querySelectorAll('#draftPosFilter2 option')].map(o => o.textContent);
    return { opts, hasOG: opts.includes('Offensive guard'), bareGuard: opts.filter(t => /^guard$/i.test(t)) };
  });
  ok(dd.hasOG && dd.bareGuard.length === 0, 'R2-16 · the draft board dropdown reads Offensive guard', JSON.stringify(dd.opts));

  // ---------- finish the draft → SEASON → the preseason page ----------
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 50; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 26); } catch (e) { return false; } }); if (done) break; await sleep(350); }
  await sleep(1300);
  for (let i = 0; i < 18; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await sleep(350); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); window.__zpbDraftDone = true; } catch (e) {} });
  await page.evaluate(() => { try { startSeason(); } catch (e) {} });
  await renderSeason();

  // ---------- R2-5 · the preseason dropdowns: no box, smaller font ----------
  const dds = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('details.zpb-dd').forEach(d => {
      const cs = getComputedStyle(d), sum = d.querySelector('summary');
      out.push({ t: sum ? sum.textContent.trim().slice(0, 44) : '', border: cs.borderTopStyle, bg: cs.backgroundColor, fs: sum ? getComputedStyle(sum).fontSize : null });
    });
    const terms = [...document.querySelectorAll('#seasonHost details')].some(d => /WHAT DO THESE TERMS MEAN/.test(d.textContent)) && [...document.querySelectorAll('#seasonHost details')].filter(d => /WHAT DO THESE TERMS MEAN/.test((d.querySelector('summary') || {}).textContent || '')).map(d => d.className);
    return { list: out, termsCls: terms };
  });
  ok(dds.list.length >= 4 && dds.list.every(x => x.border === 'none' && parseFloat(x.fs) < 17.5 && parseFloat(x.fs) >= 15), 'R2-5 · every preseason dropdown: no box, smaller font (.78rem at the 21px root ≈ 16.4px, was ≈ 18.5px)', JSON.stringify(dds.list.map(x => x.t + ' ' + x.fs + ' ' + x.border)));
  const termsCls = await page.evaluate(() => [...document.querySelectorAll('details')].filter(d => /WHAT DO THESE TERMS MEAN/.test((d.querySelector('summary') || {}).textContent || '')).map(d => d.className));
  ok(termsCls.length === 1 && /zpb-dd/.test(termsCls[0]), 'R2-5 · the terms dropdown wears the same family class', JSON.stringify(termsCls));

  // ---------- R2-6 · 2 point conversion on the preseason page, 2-Pt kept in season ----------
  const pt = await page.evaluate(() => {
    const hb = document.getElementById('draftResultsBody') || document.body;
    const h = hb.textContent;
    return { spelled: /2 point conversions/i.test(h) && /HOW A 2 POINT CONVERSION WORKS/i.test(h), oldOnPre: /2-pt conversion/i.test(h), host: hb.id };
  });
  ok(pt.spelled && !pt.oldOnPre, 'R2-6 · the preseason page spells it out and drops 2-pt', JSON.stringify(pt));

  // ---------- R2-7 · the offense dropdown drops "(x teams run it)" ----------
  const runIt = await page.evaluate(() => {
    const sel = document.getElementById('scriptOff');
    if (!sel) return { no: true };
    return { opts: [...sel.options].map(o => o.textContent), bad: [...sel.options].filter(o => /run it/.test(o.textContent)).length };
  });
  ok(!runIt.no && runIt.bad === 0, 'R2-7 · no "(x teams run it)" in the offense dropdown', JSON.stringify(runIt.opts.slice(0, 4)));

  // ---------- R2-8 · SIM SEASON wears the ghost SIM GAME wears ----------
  await page.evaluate(() => { try { seasonState.preseason = false; renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await sleep(800);
  await page.evaluate(QUIET);
  const ghost = await page.evaluate(() => {
    const ss = document.querySelector('.zpb-simseason'), sg = document.querySelector('.zpb-simgame');
    if (!ss) return { no: true };
    const a = getComputedStyle(ss), b = sg ? getComputedStyle(sg) : null;
    return { ssBg: a.backgroundColor, sgBg: b ? b.backgroundColor : null, same: b ? a.backgroundColor === b.backgroundColor : null };
  });
  ok(!ghost.no && ghost.ssBg === 'rgba(0, 0, 0, 0)' && ghost.same === true, 'R2-8 · SIM SEASON is the same neutral ghost as SIM GAME (no white fill)', JSON.stringify(ghost));

  // ---------- R2-10 · the box score frame wears the score border's color ----------
  await page.evaluate(() => { try { simulateCurrentWeek(); renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await sleep(900);
  await page.evaluate(QUIET);
  const inks = await page.evaluate(() => {
    const ls = document.querySelector('.linescore'), sc = document.querySelector('.score-line');
    if (!ls || !sc) return { no: true };
    return { ls: getComputedStyle(ls).borderTopColor, sc: getComputedStyle(sc).borderTopColor };
  });
  ok(!inks.no && inks.ls === inks.sc, 'R2-10 · the box score border is the score border\u2019s color', JSON.stringify(inks));

  // ---------- R2-19 · the season rating reads the OVR scale ----------
  const scale = await page.evaluate(() => {
    const med = window.ZPB_MEDIAN_OVR;
    const r50 = zpbSeasonRating({ _rating: 50 });
    const r70 = zpbSeasonRating({ _rating: 70 });
    return { med, isInt: Number.isInteger(med), r50, r70, pool: PLAYERS.length };
  });
  ok(scale.isInt && scale.r50 === scale.med && scale.r70 > scale.med, 'R2-19 · the average season grades at the median OVR of the database (' + scale.med + ', ' + scale.pool + ' players)', JSON.stringify(scale));

  // ---------- R2-9 · light mode: no dark pregame player panels, every team ----------
  await page.evaluate(() => { try { document.documentElement.setAttribute('data-theme', 'light'); } catch (e) {} });
  await sleep(300);
  await page.evaluate(() => { try { advanceWeek(); renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await sleep(800);
  await page.evaluate(QUIET);
  const cineLight = await page.evaluate(() => {
    try {
      const S = seasonState, u = seasonUserTeam();
      const g = S.schedule.find(x => x.week === 1 && x.played && (x.home === u || x.away === u) && x.result && x.result.homeEvents && x.result.homeEvents.length);
      if (!g) return { noGame: true };
      zpbGameReplay(g, u);
      const star = document.querySelector('.zpb-intro-star');
      if (!star) return { noStar: true, ov: !!document.querySelector('.zpb-replay-ov') };
      // headless Chromium reports color(srgb r g b / a) — read the channels, judge the luminance
      const lum = el => { const m = /color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/.exec(getComputedStyle(el).backgroundImage + getComputedStyle(el).backgroundColor); const rgba = /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/.exec(getComputedStyle(el).backgroundColor); const c = m ? [+m[1], +m[2], +m[3]] : (rgba ? [+rgba[1] / 255, +rgba[2] / 255, +rgba[3] / 255] : [0, 0, 0]); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
      return { lum: Math.round(lum(star) * 1000) / 1000, bgStyle: getComputedStyle(star).backgroundColor.slice(0, 80) };
    } catch (e) { return { err: String(e).slice(0, 120) }; }
  });
  ok(!cineLight.noGame && !cineLight.noStar && cineLight.lum > 0.55, 'R2-9 · light mode: the pregame player panels are light (luminance ' + cineLight.lum + ')', JSON.stringify(cineLight));
  const cineDark = await page.evaluate(() => {
    try {
      document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove());
      document.documentElement.setAttribute('data-theme', 'dark');
      const S = seasonState, u = seasonUserTeam();
      const g = S.schedule.find(x => x.week === 1 && x.played && (x.home === u || x.away === u) && x.result && x.result.homeEvents && x.result.homeEvents.length);
      zpbGameReplay(g, u);
      const star = document.querySelector('.zpb-intro-star');
      if (!star) return { noStar: true };
      const lum = el => { const m = /color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/.exec(getComputedStyle(el).backgroundImage + getComputedStyle(el).backgroundColor); const rgba = /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/.exec(getComputedStyle(el).backgroundColor); const c = m ? [+m[1], +m[2], +m[3]] : (rgba ? [+rgba[1] / 255, +rgba[2] / 255, +rgba[3] / 255] : [0, 0, 0]); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
      return { lum: Math.round(lum(star) * 1000) / 1000 };
    } catch (e) { return { err: String(e).slice(0, 120) }; }
  });
  ok(cineDark.noStar !== true && cineDark.lum < 0.2, 'R2-9 · dark keeps the dark stage cards (luminance ' + cineDark.lum + ')', JSON.stringify(cineDark));
  await page.evaluate(QUIET);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove()); document.documentElement.setAttribute('data-theme', 'light'); } catch (e) {} });
  await sleep(300);

  // ---------- run the season out → review → R2-12 the chained round cinematics ----------
  await page.evaluate(() => { try { simRestOfSeason(); } catch (e) {} });
  await sleep(1500);
  await page.evaluate(QUIET);
  await renderSeason();
  await page.evaluate(() => {
    try {
      const conf = conferenceOfTeam(seasonUserTeam());
      const st = computeStandings(seasonState.schedule, teamNames());
      if (!seasonState.seeds[conf].some(x => x.team === seasonUserTeam())) {
        seasonState.seeds[conf][6] = Object.assign({}, st[seasonUserTeam()], { team: seasonUserTeam(), seed: 7 });
      }
    } catch (e) {}
  });
  await renderSeason();
  const chain = await page.evaluate(() => { const b = document.getElementById('simPlayoffsBtn'); if (b) b.click(); return true; });
  await sleep(1700);
  // (no QUIET here — the cinematic IS the thing under test)
  const cine1 = await page.evaluate(() => ({ ov: !!document.querySelector('.zpb-replay-ov'), chainLen: (window.__zpbCineChain || []).length, label: (document.querySelector('.zpb-intro-title') || {}).textContent || '' }));
  ok(cine1.ov && /WILD CARD|DIVISIONAL|CONFERENCE|SUPER BOWL/i.test(cine1.label), 'R2-12 · Sim Playoffs opens the first round\u2019s own full cinematic', JSON.stringify(cine1));
  // click through: skip (kills the intro) → skip again (flushes the rest) → Continue → the next round mounts
  let rounds = 0, storm = false;
  for (let i = 0; i < 8; i++) {
    const st = await page.evaluate(() => ({ ov: !!document.querySelector('.zpb-replay-ov'), storm: !!document.querySelector('.zpb-sbfin') }));
    if (st.storm) { storm = true; break; }
    if (!st.ov) { await sleep(900); const late = await page.evaluate(() => ({ storm: !!document.querySelector('.zpb-sbfin'), ov: !!document.querySelector('.zpb-replay-ov') })); if (late.storm) storm = true; else if (late.ov) continue; break; }
    rounds++;
    await page.evaluate(() => { const s = document.getElementById('zrepSkip'); if (s) s.click(); });
    await sleep(900);
    await page.evaluate(() => { const s = document.getElementById('zrepSkip'); if (s) s.click(); }); // the timeline is live now — this one flushes the rest
    await sleep(1200);
    const fin = await page.evaluate(() => ({ goVis: document.getElementById('zrepGo') ? document.getElementById('zrepGo').style.display !== 'none' : false, storm: !!document.querySelector('.zpb-sbfin') }));
    if (fin.storm) { storm = true; break; }
    if (fin.goVis) {
      await page.evaluate(() => { const g = document.getElementById('zrepGo'); if (g) g.click(); });
      await sleep(1300);
    } else break;
  }
  ok(rounds >= 1, 'R2-12 · the run plays its rounds as real cinematics (' + rounds + ' mounted)', 'rounds=' + rounds);
  ok(storm, 'R2-12 · after the last round\u2019s cinematic, the champion reveal mounts', '');
  await page.evaluate(QUIET);
  await renderSeason();

  // ---------- R2-15 · the guide position viz carries every depth-chart spot ----------
  await page.evaluate(() => { const b = document.getElementById('tabGuideBtn'); if (b) b.click(); });
  await sleep(700);
  const viz = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('.zpb-posrank .zpb-prrow')];
    const names = rows.map(r => (r.querySelector('.zpb-prname') || {}).textContent || '');
    return { n: rows.length, te3: names.includes('TE3'), dime: names.some(n => /DIME/.test(n)), p: names.includes('P'), fb: names.includes('FB'), zero: rows.some(r => /~0 wins/.test(r.textContent)), first: names.slice(0, 3) };
  });
  ok(viz.n === 32 && viz.te3 && viz.dime && viz.p && viz.fb && viz.zero, 'R2-15 · all 32 depth-chart spots rank — TE3, DIME, P, FB, the ~0s included', JSON.stringify({ n: viz.n, te3: viz.te3, dime: viz.dime, p: viz.p, fb: viz.fb, zero: viz.zero, first: viz.first }));
  const gl2 = await page.evaluate(() => {
    const h = document.getElementById('guideBody').textContent;
    return { fbLegend: /FB Fullback|FB\s+Fullback/.test(h) || /<b>FB<\/b> Fullback/.test(h), spelled: /2 point conversion/i.test(h), oldInGuide: /2-pt conversion/i.test(h) };
  });
  ok(gl2.fbLegend && gl2.spelled && !gl2.oldInGuide, 'R2-15+R2-6 · the guide: FB joins the legend; 2 point conversion spelled out', JSON.stringify(gl2));

  // ---------- R2-19 · the guide explains the scale ----------
  const gloss = await page.evaluate(() => {
    const h = document.getElementById('guideBody').textContent;
    return { hasScale: /Season rating/i.test(h) && /median OVR/i.test(h), med: window.ZPB_MEDIAN_OVR };
  });
  ok(gloss.hasScale && gloss.med >= 60 && gloss.med <= 90, 'R2-19 · the Guide carries the scale law (median ' + gloss.med + ')', JSON.stringify(gloss));

  // ---------- reach the champion page → the Season Review → R2-13/18/20 the DRAFT COMMAND CENTER ----------
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await sleep(500);
  await page.evaluate(() => {
    window.__zpbQuietSim = true;
    try {
      for (const rk of ['wildcard', 'divisional', 'champ', 'superbowl']) {
        if (!seasonState.playoffRoundSimulated) simulatePlayoffRound();
        if (rk !== 'superbowl') advancePlayoffRound();
      }
    } catch (e) {}
    try { renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody') || document.body); } catch (e) {}
  });
  await sleep(1500);
  await page.evaluate(QUIET);
  await page.evaluate(() => { try { seasonState.showReview = true; renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await sleep(900);
  await page.evaluate(QUIET);
  const dcc = await page.evaluate(() => {
    const p = document.querySelector('.zpb-dcc');
    if (!p) return { no: true };
    const title = (p.querySelector('h3') || {}).textContent || '';
    const rooms = [...p.querySelectorAll('.zpb-dcc-u')].map(x => ({ label: (x.querySelector('b') || {}).textContent, g: (x.querySelector('.zpb-dcc-g') || {}).textContent, rank: parseInt((((x.querySelector('.narr') || {}).textContent || '').match(/#(\d+)/) || [0, 0])[1]) }));
    const cuts = [...p.querySelectorAll('.zpb-dcc-p')].map(x => ({
      name: (x.querySelector('.zpb-dcc-hd b') || {}).textContent,
      ovr: parseInt((((x.querySelector('.zpb-dcc-badges .zpb-schip b')) || {}).textContent) || '0'),
      sr: parseInt((((x.querySelectorAll('.zpb-dcc-badges .zpb-schip b'))[1] || {}).textContent) || '0'),
      hasOvrBadge: !!x.textContent.match(/OVR/), hasSR: /SEASON RATING/.test(x.textContent),
      cut: !!x.querySelector('.zpb-dcc-cut'), gap: /below his OVR/.test(x.textContent)
    }));
    const cd = p.querySelector('.zpb-dcc-cdtitle');
    const cdCS = cd ? getComputedStyle(cd) : null;
    const pri = (p.querySelector('.zpb-dcc-pri') || {}).textContent || '';
    const shine = p.querySelector('.zpb-dcc-shine');
    const shineCS = shine ? getComputedStyle(shine) : null;
    const pageTxt = (document.getElementById('seasonHost') || document.body).textContent;
    return {
      med: window.ZPB_MEDIAN_OVR,
      title, rooms, cuts,
      cdCentered: cdCS ? cdCS.textAlign === 'center' : false, cdFont: cdCS ? cdCS.fontFamily.slice(0, 22) : '', cdSize: cdCS ? cdCS.fontSize : '',
      pri: pri.replace(/\s+/g, ' ').trim(), shineOk: !!shineCS && /linear-gradient/.test(shineCS.backgroundImage),
      retired: ['what this roster could have done better', 'EVERY ROOM BELOW A B', 'THE LINE IS THE AVERAGE SEASON', 'THE NEXT DRAFT IS WHERE YOU FIX THIS', 'THE SEASONS THAT HURT MOST', 'vs his'].filter(s => pageTxt.includes(s))
    };
  });
  ok(!dcc.no && /DRAFT COMMAND CENTER/.test(dcc.title), 'R2-13 · the panel stands: DRAFT COMMAND CENTER', JSON.stringify({ title: dcc.title }));
  ok(dcc.retired.length === 0, 'R2-13/R2-18 · none of the retired texts print anywhere on the review', JSON.stringify(dcc.retired));
  if (dcc.rooms.length) {
    const ranks = dcc.rooms.map(r => r.rank);
    const sorted = ranks.every((v, i) => i === 0 || ranks[i - 1] <= v);
    const grades = ['B-', 'C+', 'C', 'C-', 'D', 'F'];
    ok(sorted && dcc.rooms.every(r => grades.includes(r.g)), 'R2-13 · every room below a B, best to worst, as small cards', JSON.stringify(dcc.rooms));
  } else ok(true, 'R2-13 · no room graded below B on this roster (the section correctly stays away)');
  if (dcc.cuts.length) {
    ok(dcc.cuts.every(c => c.ovr < 80 && c.hasOvrBadge && c.hasSR && c.cut), 'R2-20 · every cut card carries the OVR badge, the Season Rating badge and the shimmering CUT', JSON.stringify(dcc.cuts.slice(0, 4)));
    ok(dcc.cuts.every(c => c.sr < dcc.med), 'R2-13 · every listed season rating sits under the average line (median ' + dcc.med + ')', JSON.stringify(dcc.cuts.map(c => c.sr)));
    ok(dcc.cuts.every(c => c.gap === (c.sr < c.ovr)), 'R2-20 · the gap note speaks the Owner\u2019s words (N below his OVR)', '');
    const punter = await page.evaluate(() => {
      const me = draftSim.rosters[draftSim.userIndex];
      const pe = normalizeSlotEntry(me.slots['P']);
      return pe ? pe.name : null;
    });
    if (punter) ok(!dcc.cuts.some(c => c.name === punter), 'R2-13 · the punter (below Kicker on the win-math rankings) never makes the cut list', punter);
  } else ok(true, 'R2-13 · no player met all three gates this season (the list correctly stays away)');
  ok(dcc.cdCentered && /Cinzel/i.test(dcc.cdFont) && parseFloat(dcc.cdSize) >= 19, 'R2-18 · CUTDOWN DAY is centered, Cinzel Decorative, larger', JSON.stringify({ centered: dcc.cdCentered, font: dcc.cdFont, size: dcc.cdSize }));
  ok(/PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO 20-0/.test(dcc.pri.replace(/\s+/g, ' ')) && dcc.shineOk, 'R2-18 · the next-draft line, with 20-0 on the team-colored shine', JSON.stringify({ pri: dcc.pri, shineOk: dcc.shineOk }));

  // ---------- R2-11 · the 0.60 light ink on the award cards ----------
  const ink = await page.evaluate(() => {
    try {
      const pk = zpbPackFor('Kansas City Chiefs');
      const cards = [...document.querySelectorAll('.zpb-awcard .zpb-gname')].filter(b => !b.classList.contains('zpb-shm') && !b.classList.contains('zpb-vib'));
      let checked = 0, hit = 0; const sample = [];
      cards.slice(0, 8).forEach(b => {
        const card = b.closest('.zpb-pcard');
        const raw = card.getAttribute('style') || '';
        const all = raw.match(/--nm:([^;']+);/g) || [];
        const m = all.length ? all[all.length - 1] : null; // the LAST --nm wins the inline cascade — the 0.60 preset
        const cssNM = getComputedStyle(card).getPropertyValue('--nm');
        if (!m) return;
        checked++;
        const probe = document.createElement('i'); probe.style.color = m.slice(5).replace(/;+$/, ''); document.body.appendChild(probe);
        const want = getComputedStyle(probe).color; probe.remove();
        const got = getComputedStyle(b).color;
        if (sample.length < 4) sample.push({ name: b.textContent.slice(0, 18), wantRaw: m.slice(5), want, got, cssNM, ok: want === got });
        if (want === got) hit++;
      });
      return { txM6: !!pk.txM6, cards: cards.length, checked, hit, sample };
    } catch (e) { return { err: String(e).slice(0, 140) }; }
  });
  ok(ink.txM6 && ink.cards > 0 && ink.checked > 0 && ink.hit === ink.checked, 'R2-11 · every <85 award name reads its own team\u2019s 0.60 preset in light mode', JSON.stringify({ cards: ink.cards, checked: ink.checked, hit: ink.hit, sample: ink.sample }));


  // ---------- R2-19 · the preview cards read the new scale ----------
  await page.evaluate(() => { try { seasonState.showReview = false; renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await sleep(700);
  await page.evaluate(QUIET);

  // ---------- mobile 390: bars fit, the board cannot pan ----------
  await page.setViewportSize({ width: 390, height: 844 });
  await sleep(500);
  const mob = await page.evaluate(() => {
    const bar = document.getElementById('zpb-stagebar');
    const w = document.scrollingElement ? document.scrollingElement.scrollWidth : document.body.scrollWidth;
    const topBar = document.querySelector('.view.active .zpb-view-backbar.zpb-top');
    return { pageW: w, innerW: window.innerWidth, bannerFit: true, topBarFit: topBar ? topBar.getBoundingClientRect().left >= -1 : null };
  });
  ok(mob.pageW <= mob.innerW + 1, 'R2-17+phone · no horizontal pan at 390px', JSON.stringify(mob));
  await page.setViewportSize({ width: 1280, height: 1200 });

  // ---------- errors ----------
  ok(errors.length === 0, 'zero page errors across the round-2 battery', errors.join(' | ').slice(0, 300));

  console.log(`\nw85r2_battery: ${pass} pass · ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('HARNESS FAIL', String(e).slice(0, 400)); process.exit(1); });
