/* w65_round.js — the Owner's w65 round, measured live on the merged bytes (the w63 method: probe first, then assert). */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SH = '/home/z/my-project/work/w65/shots';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 140)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  // ---- P · the player browser ----
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { document.getElementById('tabPlayersBtn').click(); });
  await page.waitForTimeout(700);
  const pb = await page.evaluate(() => {
    const teamWrap = document.querySelector('#teamFilter').closest('.zpb-selwrap');
    const face = teamWrap ? teamWrap.querySelector('.zpb-face') : null;
    const pager = document.getElementById('playerPager');
    const info = pager ? pager.querySelector('.paginfo') : null;
    const btn = pager ? pager.querySelector('.pagbtn') : null;
    return {
      face: face ? face.textContent : null,
      pos: document.getElementById('posBtn').textContent,
      ph: document.getElementById('playerSearch').placeholder,
      pagerVisible: !!pager && pager.offsetHeight > 0 && !!info && info.offsetHeight > 0,
      pagerInfo: info ? info.textContent : null,
      btnVisible: !!btn && btn.offsetHeight > 0
    };
  });
  ok(pb.face === 'ALL TEAMS', 'P1 · the team face reads ALL TEAMS (the dot is gone)', pb.face);
  ok(pb.pos === 'ALL POSITIONS', 'P2 · the position button reads ALL POSITIONS', pb.pos);
  ok(pb.ph === 'SEARCH PLAYER NAME', 'P3 · the search placeholder reads SEARCH PLAYER NAME, no ellipses', pb.ph);
  ok(pb.pagerVisible && pb.btnVisible, 'P4 · the pager SHOWS (Muse P0: beyond 60 players is reachable)', pb.pagerInfo);
  ok(/PAGE 1 OF 20/.test(pb.pagerInfo || ''), 'P5 · the pager reads the range', pb.pagerInfo);
  // the popup offers ALL TEAMS and returning to it works
  const popOk = await page.evaluate(() => {
    const wrap = document.querySelector('#teamFilter').closest('.zpb-selwrap');
    wrap.querySelector('.zpb-selbtn').click();
    const pop = wrap.querySelector('.zpb-selpop');
    const first = pop.querySelector('.zpb-selopt');
    const hasAll = first && first.textContent.trim() === 'ALL TEAMS';
    // pick a real team, then ALL TEAMS again
    const opts = Array.from(pop.querySelectorAll('.zpb-selopt'));
    const dal = opts.find(o => o.dataset.v === 'Dallas Cowboys'); if (dal) dal.click();
    const afterTeam = document.getElementById('teamFilter').value;
    const info1 = (document.querySelector('#playerPager .paginfo') || {}).textContent || '';
    wrap.querySelector('.zpb-selbtn').click();
    const all = Array.from(wrap.querySelectorAll('.zpb-selopt')).find(o => o.dataset.v === '');
    if (all) all.click();
    const afterAll = document.getElementById('teamFilter').value;
    const face2 = (wrap.querySelector('.zpb-face') || {}).textContent || '';
    return { hasAll, afterTeam, afterAll, face2, info1: info1.slice(0, 24) };
  });
  await page.waitForTimeout(400);
  ok(popOk.hasAll, 'P6 · the opened menu offers ALL TEAMS', JSON.stringify(popOk));
  ok(popOk.afterTeam === 'Dallas Cowboys' && popOk.afterAll === '' && popOk.face2 === 'ALL TEAMS', 'P7 · a team picks, ALL TEAMS returns', JSON.stringify(popOk));

  // ---- W · the displayed weights wear Claude's table ----
  await page.evaluate(() => { document.getElementById('tabGroupsBtn').click(); });
  await page.waitForTimeout(700);
  const wgt = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('#zpbRankBtns [data-rslot]'));
    const get = s => { const b = btns.find(x => x.dataset.rslot === s); return b ? b.querySelector('i').textContent : null; };
    return { QB: get('QB'), WR1: get('WR1'), K: get('K'), P: get('P'), DT1: get('DT1'), n: btns.length };
  });
  ok(wgt.QB === '2.5' && wgt.WR1 === '1.3', 'W1 · the Position Rankings buttons wear the new weights (QB 2.5 · WR1 1.3)', JSON.stringify(wgt));
  ok(wgt.DT1 === '1.0' && wgt.K === '0.5', 'W1b · DT1 410 → 1.0, K 200 → 0.5', JSON.stringify(wgt));
  const modelW = await page.evaluate(() => {
    const b = document.getElementById('modelWBtn'); if (b) b.click();
    return { qb: weights.QB, wr1: weights.WR1, te1: weights.TE1 };
  });
  ok(modelW.qb === 700 && modelW.wr1 === 370 && modelW.te1 === 205, 'W2 · the MODEL preset reads the new table (QB 700 · WR1 370 · TE1 205)', JSON.stringify(modelW));
  await page.evaluate(() => { document.getElementById('tabGuideBtn').click(); });
  await page.waitForTimeout(900);
  const guideViz = await page.evaluate(() => {
    const det = Array.from(document.querySelectorAll('#guideBody details')).find(d => /WHICH POSITIONS MATTER/.test(d.textContent));
    if (!det) return { missing: true };
    det.open = true;
    const txt = det.textContent;
    return { has25: /2\.5/.test(txt), has13: /1\.3/.test(txt), tiers: det.querySelectorAll('.gl li').length };
  });
  ok(!guideViz.missing && guideViz.has25 && guideViz.has13, 'W3 · the Guide tier viz shows the new numbers', JSON.stringify(guideViz));

  // ---- X · the homepage: the DRAFT button keeps its air; the footer moves down ----
  await page.evaluate(() => { document.getElementById('tabDraftBtn').click(); });
  await page.waitForTimeout(600);
  await page.setViewportSize({ width: 500, height: 520 });
  await page.waitForTimeout(500);
  const home = await page.evaluate(() => {
    const btn = document.getElementById('startDraftBtn'), setup = document.getElementById('draftSetup'), nav = document.querySelector('nav.footnav');
    const br = btn.getBoundingClientRect(), sr = setup.getBoundingClientRect(), nr = nav.getBoundingClientRect();
    return {
      above: Math.round(br.top - (document.querySelector('#draftSetup .filters').getBoundingClientRect().bottom)),
      below: Math.round(nr.top - sr.bottom),
      navPos: getComputedStyle(nav).position,
      navMT: getComputedStyle(nav).marginTop
    };
  });
  ok(home.above >= 36, 'X1 · the DRAFT button keeps its distance from the dropdowns', 'above=' + home.above);
  ok(home.below >= 40, 'X2 · a real floor between the panel and the footer', 'below=' + home.below);
  ok(home.navPos === 'static', 'X3 · the footer no longer floats over the bottom panel (static, was sticky)', home.navPos);
  await page.screenshot({ path: SH + '/w65-home-500.png' });
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.waitForTimeout(400);

  // ---- the draft (as the Raiders, for the Muse #4 test) ----
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'Las Vegas Raiders'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await page.waitForTimeout(250);
  await page.evaluate(() => { document.getElementById('startDraftBtn').click(); });
  await page.waitForTimeout(2400);
  // ---- D · the draft board's first-letter bar (dark theme is the default) ----
  const darkBar = await page.evaluate(() => {
    const td = document.querySelector('#draftTable2 tr.zpb-trow td:first-child');
    return td ? getComputedStyle(td).boxShadow : 'no-row';
  });
  ok(darkBar === 'none', 'D1 · the draft board name cell wears no vertical bar (dark)', darkBar);
  await page.evaluate(() => { document.getElementById('speedInstantBtn').click(); document.getElementById('simToEndBtn').click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
  await page.waitForTimeout(1500);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); if (window._zpbWelCleanup) window._zpbWelCleanup(); } catch (e) {} });
  await page.waitForTimeout(500);

  // R8 · the stage: the roster-locked sentence gone, the bottom START PRESEASON copy present
  // (checked on the post-draft render itself — clicking SEASON would auto-start the season)
  const stage = await page.evaluate(() => ({
    locked: document.getElementById('draftResultsBody').textContent.includes('Roster locked'),
    pill: !!document.getElementById('startSeasonBtn'),
    footPill: !!document.getElementById('startSeasonBtnFoot'),
    footVisible: (() => { const b = document.getElementById('startSeasonBtnFoot'); return !!b && b.offsetParent !== null; })()
  }));
  ok(!stage.locked, 'R8a · the roster-locked sentence retires');
  ok(stage.pill && stage.footPill && stage.footVisible, 'R8b · START PRESEASON rides the bottom of the page too', JSON.stringify(stage));

  // M · the Muse #4 path: the preseason heading must read the drafted team
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1100);
  const muse4 = await page.evaluate(() => {
    const h = Array.from(document.querySelectorAll('#draftResultsBody h3')).map(x => x.textContent).join(' | ');
    const rosterTeam = (draftSim && draftSim.rosters.find(r => r.isUser) || {}).teamName;
    const seasonTeam = (() => { try { return seasonUserTeam(); } catch (e) { return null; } })();
    return { h, rosterTeam, seasonTeam };
  });
  ok(/Las Vegas Raiders/.test(muse4.h), 'M1 · the preseason heading reads the DRAFTED team', muse4.h.slice(0, 80));
  ok(muse4.rosterTeam === 'Las Vegas Raiders' && muse4.seasonTeam === 'Las Vegas Raiders', 'M2 · the heading, the roster and the season agree', JSON.stringify(muse4));

  // the season starts: the week-1 hub
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn2'); if (b) b.click(); });
  await page.waitForTimeout(1500);

  // ---- H · the header sim doors ----
  const hdr = await page.evaluate(() => {
    const game = document.getElementById('simGameBtn'), season = document.getElementById('simSeasonBtn');
    const weekPanel = Array.from(document.querySelectorAll('#draftResultsBody .panel')).find(p => /Week 1 of 17/.test(p.textContent));
    const gh = weekPanel ? !!weekPanel.querySelector('#simGameBtn') : null;
    const sh = weekPanel ? !!weekPanel.querySelector('#simSeasonBtn') : null;
    const h = el => el ? Math.round(el.getBoundingClientRect().height) : null;
    const small = el => el ? el.classList.contains('zpb-ctasmall') : null;
    return {
      gameInHeader: !!game && game.closest('.tabs') !== null, seasonInHeader: !!season && season.closest('.tabs') !== null,
      gameInWeekPanel: gh, seasonInWeekPanel: sh,
      sizes: [h(game), h(season)], small: [small(game), small(season)]
    };
  });
  ok(hdr.gameInHeader && hdr.seasonInHeader, 'H1 · SIM GAME and SIM SEASON ride the header tab row', JSON.stringify(hdr));
  ok(!hdr.gameInWeekPanel && !hdr.seasonInWeekPanel, 'H2 · the Week panel carries neither sim door');
  ok(hdr.sizes[0] != null && hdr.sizes[1] != null && Math.abs(hdr.sizes[0] - hdr.sizes[1]) <= 2, 'H3 · both doors are the SAME (small) size', JSON.stringify(hdr.sizes));
  ok(hdr.small[0] && hdr.small[1], 'H4 · both wear the small CTA class', JSON.stringify(hdr.small));

  // ---- K · the Season stats panel leaves the Week 1 preview ----
  const k1 = await page.evaluate(() => ({
    statsPane: !!document.querySelector('#draftResultsBody [id^="statsPaneYou"]'),
    empty: document.getElementById('draftResultsBody').textContent.includes('No games played yet')
  }));
  ok(!k1.statsPane && !k1.empty, 'K1 · no Season stats panel on the Week 1 preview', JSON.stringify(k1));

  // ---- B5 · no BACK TO SEASON on the season tab itself ----
  const b5 = await page.evaluate(() => { const b = document.getElementById('zpbBackSeasonBar'); return { gone: !b || b.style.display === 'none' || !b.innerHTML }; });
  ok(b5.gone, 'B5 · the season tab shows no BACK TO SEASON bar', JSON.stringify(b5));

  // ---- R · the restore: save, reload, restore ----
  await page.evaluate(() => { const sb = document.getElementById('simSeasonBtnFoot'); }); // footer exists (no click)
  await page.waitForTimeout(1600); // the autosave debounce (700ms) fires
  await page.reload(); await page.waitForTimeout(1400);
  const chip = await page.evaluate(() => {
    const c = document.getElementById('zpbRestoreChip');
    return { there: !!c, text: c ? c.textContent : null, visible: c ? c.offsetHeight > 0 : false };
  });
  ok(chip.there && chip.visible && chip.text === 'RESTORE SAVED SEASON', 'R1 · reload offers RESTORE SAVED SEASON', JSON.stringify(chip));
  await page.evaluate(() => { const c = document.getElementById('zpbRestoreChip'); if (c) c.click(); });
  await page.waitForTimeout(1400);
  const restored = await page.evaluate(() => ({
    season: (() => { try { return !!seasonState && seasonState.currentWeek; } catch (e) { return null; } })(),
    draftRost: (() => { try { return draftSim && draftSim.rosters ? draftSim.rosters.length : 0; } catch (e) { return 0; } })(),
    week: !!document.getElementById('simWeekBtn') || !!document.getElementById('simGameBtn') || document.getElementById('draftResultsBody').textContent.includes('Week 1 of 17'),
    chipGone: !document.getElementById('zpbRestoreChip')
  }));
  ok(restored.season === 1 && restored.draftRost === 32, 'R2 · the season comes back whole (32 rosters rebuilt)', JSON.stringify(restored));
  ok(restored.week && restored.chipGone, 'R3 · the week-1 hub renders and the chip retires', JSON.stringify(restored));

  // ---- T · the pregame cinematic: the logos sit lower ----
  await page.setViewportSize({ width: 390, height: 760 });
  await page.waitForTimeout(500);
  await page.evaluate(() => { const b = document.getElementById('simWeekBtn'); if (b) b.click(); });
  await page.waitForTimeout(2200);
  const preg = await page.evaluate(() => {
    const panel = document.querySelector('.zpb-replay');
    const intro = document.querySelector('.zpb-rep-intro');
    const logos = document.querySelector('.zpb-intro-logos');
    if (!panel || !intro || !logos) return { missing: true };
    const pr = panel.getBoundingClientRect(), lr = logos.getBoundingClientRect();
    const hd = panel.querySelector('.zpb-rep-hd');
    return { below: Math.round(lr.top - pr.top), hdBottom: hd ? Math.round(hd.getBoundingClientRect().bottom - pr.top) : null, panelH: Math.round(pr.height) };
  });
  ok(!preg.missing && preg.below >= 48, 'T1 · the pregame logos sit clear of the header line (moved down)', JSON.stringify(preg));
  await page.screenshot({ path: SH + '/w65-pregame-390.png' });
  await page.evaluate(() => { const s = document.getElementById('zrepSkip'); if (s) s.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-replay-ov,.zpb-prematch').forEach(x => x.remove()); } catch (e) {} });
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.waitForTimeout(400);

  // ---- K2 · after a game the stats panel returns ----
  const k2 = await page.evaluate(() => ({
    statsPane: !!document.querySelector('#draftResultsBody [id^="statsPaneYou"]'),
    statsHead: Array.from(document.querySelectorAll('#draftResultsBody h3')).some(h => /Season stats|Playoff stats/.test(h.textContent)),
    bodyIds: Array.from(document.querySelectorAll('#draftResultsBody [id]')).map(x => x.id).filter(i => /stats/i.test(i)).slice(0, 6)
  }));
  ok(k2.statsPane || k2.statsHead, 'K2 · the Season stats panel returns once a game has been played', JSON.stringify(k2));

  // ---- S + F · the roster tab: the ST pane and the depth-chart fade ----
  await page.evaluate(() => { const b = document.getElementById('resultsMineBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  const stz = await page.evaluate(() => {
    const zone = document.querySelector('#draftResultsBody .zpb-dz-st');
    if (!zone) return { missing: true };
    const zr = zone.getBoundingClientRect();
    const rows = Array.from(zone.querySelectorAll('.zpb-dz-row'));
    const first = rows[0];
    const fr = first.getBoundingClientRect();
    const nameBox = first.querySelector('.zpb-dz-name').getBoundingClientRect();
    const lineRow = rows.length > 1 ? rows[1] : rows[0];
    return {
      rows: rows.length,
      leftGap: Math.round(fr.left - zr.left),
      inlineFlex: getComputedStyle(first).display,
      line: getComputedStyle(lineRow).borderTopWidth,
      nameLeft: Math.round(nameBox.left - zr.left),
      overflow: Math.round(zr.right - rows.reduce((m, r) => Math.max(m, r.getBoundingClientRect().right), 0))
    };
  });
  ok(!stz.missing && stz.inlineFlex === 'grid' && stz.leftGap <= 12, 'S1 · the ST rows left-align like the offense/defense', JSON.stringify(stz));
  ok(!stz.missing && parseFloat(stz.line) > 0, 'S2 · the horizontal lines are back in the ST pane', stz.line);
  ok(!stz.missing && stz.overflow >= 0, 'S3 · nothing crosses the panel boundary', 'right-margin=' + stz.overflow);
  const fade = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('#draftResultsBody .zpb-dz .zpb-dz-row.zpb-dfc2'));
    if (!rows.length) return { missing: true };
    const cs0 = getComputedStyle(rows[0]), csN = getComputedStyle(rows[rows.length - 1]);
    return { dur: cs0.animationDuration, first: cs0.animationDelay, last: csN.animationDelay, n: rows.length };
  });
  // the w64 law: row B faded in at B*1s (+.55s fade). The w65 law: B*0.12s (+.3s fade) —
  // every row is 0.88s a beat faster (≥ the Owner's half second), the fade .25s faster.
  const cad = (!fade.missing && fade.n > 1) ? (parseFloat(fade.last) - parseFloat(fade.first)) / (fade.n - 1) : null;
  ok(!fade.missing && fade.dur === '0.3s' && cad !== null && cad > 0 && cad <= 0.5, 'F1 · the depth chart fades at least half a second faster (0.12s a beat vs the w64 1s law)', JSON.stringify({ dur: fade.dur, first: fade.first, last: fade.last, cadence: cad == null ? null : +cad.toFixed(3) }));
  ok(!fade.missing && parseFloat(fade.last) < 12, 'F1b · the fillers no longer wait behind the 90+ floor — the whole cascade lands fast', 'last=' + fade.last);
  // B1 · the roster tab carries the glowing door top and bottom
  const b1 = await page.evaluate(() => {
    const top = document.querySelector('#draftResultsBody [data-bts]');
    const bar = document.getElementById('zpbBackSeasonBar');
    const btn = bar ? bar.querySelector('[data-bts]') : null;
    const glow = top ? getComputedStyle(top).boxShadow : 'none';
    return { top: !!top, barBtn: !!btn, glow: glow !== 'none', topVisible: top ? top.offsetParent !== null : false, barVisible: btn ? btn.offsetParent !== null : false };
  });
  ok(b1.top && b1.topVisible, 'B1 · the roster tab leads with BACK TO SEASON', JSON.stringify(b1));
  ok(b1.barBtn && b1.barVisible, 'B1b · the roster tab closes with the glowing bar button');
  ok(b1.glow, 'B1c · the door glows');

  // ---- C · the comparison tab: the footer pattern ----
  await page.evaluate(() => { const b = document.getElementById('resultsCompareBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  const cmp1 = await page.evaluate(() => {
    const own = document.querySelector('#draftResultsBody .zpb-cmp-own');
    const score = document.getElementById('zpbTabScore');
    const a = document.getElementById('cmpTeamA'), b = document.getElementById('cmpTeamB');
    const wa = a.getBoundingClientRect().width, wb = b.getBoundingClientRect().width;
    const big = document.getElementById('cmpResult');
    const oldFilters = document.querySelector('#draftResultsBody .zpb-cmp-filters');
    return {
      own: !!own, score: score ? score.textContent.replace(/\s+/g, ' ').trim() : null,
      pill: a ? getComputedStyle(a).borderRadius : null, sameSize: Math.abs(wa - wb) <= 2,
      bigPanels: big ? big.querySelectorAll(':scope > .panel').length : -1,
      oldFilters: !!oldFilters, starters: !!big && big.textContent.includes('Starter-by-Starter')
    };
  });
  ok(cmp1.own && cmp1.score && /vs/.test(cmp1.score), 'C1 · the tab header carries the X vs Y score', cmp1.score);
  ok(cmp1.pill === '999px' && cmp1.sameSize, 'C2 · the dropdowns are pills of the SAME size', JSON.stringify(cmp1));
  ok(!cmp1.oldFilters && cmp1.bigPanels === 2 && cmp1.starters, 'C3 · the huge filters panel retired; starter-by-starter + units remain', JSON.stringify(cmp1));
  const cmp2 = await page.evaluate(() => {
    const b = document.getElementById('cmpTeamB');
    const before = document.getElementById('zpbTabScore').textContent;
    const opts = Array.from(b.options).map(o => o.value).filter(v => v && v !== b.value);
    let after = before, tried = 0;
    // two teams' rounded model scores can coincide — try a few until the repaint shows
    for (const v of opts) {
      if (tried >= 6) break;
      tried++;
      const bb = document.getElementById('cmpTeamB');
      bb.value = v; bb.dispatchEvent(new Event('change', { bubbles: true }));
      after = (document.getElementById('zpbTabScore') || {}).textContent || after;
      if (after !== before) break;
    }
    return { changed: before !== after, after: after.replace(/\s+/g, ' ').trim(), tried };
  });
  ok(cmp2.changed, 'C4 · changing a team repaints the score — the tab functions', cmp2.after + ' · tried ' + cmp2.tried);
  await page.screenshot({ path: SH + '/w65-compare-1280.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600);
  const cmpN = await page.evaluate(() => {
    const head = document.querySelector('#draftResultsBody .zpb-cmp-own .zpb-cmphead');
    const score = document.getElementById('zpbTabScore'), a = document.getElementById('cmpTeamA');
    if (!head || !score || !a) return { missing: true, head: !!head, score: !!score, a: !!a };
    const sr = score.getBoundingClientRect(), ar = a.getBoundingClientRect();
    return { ownLine: sr.bottom <= ar.top + 2, scoreW: Math.round(sr.width), visible: sr.height > 0 && sr.width > 40 };
  });
  ok(!cmpN.missing && cmpN.ownLine && cmpN.visible, 'C5 · at 390 the score takes its own visible line above the dropdowns', JSON.stringify(cmpN));
  await page.screenshot({ path: SH + '/w65-compare-390.png' });
  // the footer comparison gets the same law
  await page.evaluate(() => { document.getElementById('tabCompareBtn').click(); });
  await page.waitForTimeout(900);
  const cmpF = await page.evaluate(() => {
    const score = document.querySelector('#homeCmpResult .zpb-cmpscore');
    const a = document.querySelector('#homeCmpA');
    if (!score || !a) return { missing: true };
    const sr = score.getBoundingClientRect(), ar = a.getBoundingClientRect();
    return { ownLine: sr.bottom <= ar.top + 2, visible: sr.width > 40, pill: getComputedStyle(a).borderRadius };
  });
  ok(!cmpF.missing && cmpF.ownLine && cmpF.visible && cmpF.pill === '999px', 'C6 · the footer page: the score visible on its own line, pills', JSON.stringify(cmpF));
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.waitForTimeout(400);

  // ---- sim the rest → the playoffs → the warning → the Super Bowl page ----
  await page.evaluate(() => { document.getElementById('tabDraftBtn').click(); });
  await page.waitForTimeout(600);
  await page.evaluate(() => { const b = document.getElementById('simSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(700);
  await page.evaluate(() => { const b = document.querySelector('[data-ss="yes"]'); if (b) b.click(); });
  await page.waitForTimeout(3500);
  for (let i = 0; i < 30; i++) {
    const nb = await page.evaluate(() => { const b = document.getElementById('nextWeekBtn') || document.getElementById('nextRoundBtn'); if (b && b.offsetParent) { b.click(); return b.id; } return null; });
    if (!nb) break;
    await page.waitForTimeout(900);
    const done = await page.evaluate(() => seasonState && seasonState.phase === 'complete');
    if (done) break;
  }
  await page.waitForTimeout(1200);
  // guarantee the postseason, the battery way
  await page.evaluate(() => {
    const user = seasonUserTeam();
    ['AFC', 'NFC'].forEach(conf => {
      const arr = (seasonState.seeds && seasonState.seeds[conf]) || null;
      if (arr && arr.length && !arr.some(x => x.team === user)) { arr[3] = { team: user, seed: 4 }; }
    });
    const container = document.getElementById('draftResultsBody');
    if (container && typeof renderSeasonTab === 'function') renderSeasonTab(container);
  });
  await page.waitForTimeout(1200);
  for (let i = 0; i < 12; i++) { const okb = await page.evaluate(() => { const b = document.getElementById('beginPlayoffsBtn'); if (b && b.offsetParent) { b.click(); return true; } return false; }); if (okb) break; await page.waitForTimeout(700); }
  await page.waitForTimeout(1500);

  // ---- G · the SIM PLAYOFFS warning ----
  const g1 = await page.evaluate(() => {
    const b = document.getElementById('simRestBtn');
    if (!b || !b.offsetParent) return { noBtn: true };
    b.click();
    return { clicked: true };
  });
  await page.waitForTimeout(700);
  const g2 = await page.evaluate(() => {
    const ov = document.querySelector('.confirm-ov');
    const txt = ov ? ov.textContent : '';
    const cancel = ov ? Array.from(ov.querySelectorAll('button')).find(x => x.textContent.trim() === 'Cancel') : null;
    if (cancel) cancel.click();
    return { shown: !!ov, regular: /SIMULATE THE PLAYOFFS\?/.test(txt), undone: /cannot be undone/.test(txt), yesLabel: ov ? (ov.querySelector('[data-po="yes"]') || {}).textContent : null };
  });
  ok(!g1.noBtn && g2.shown && g2.regular, 'G1 · SIM PLAYOFFS asks ARE YOU SURE (the A9 format)', JSON.stringify(g2));
  ok(g2.undone && /YES/.test(g2.yesLabel || ''), 'G2 · the warning keeps the YES-first doors');
  await page.waitForTimeout(500);
  const g3 = await page.evaluate(() => {
    const rk = seasonState.currentPlayoffRound;
    const b = document.getElementById('simRestBtn'); if (b) b.click();
    return { rk };
  });
  await page.waitForTimeout(600);
  await page.evaluate(() => { const b = document.querySelector('.confirm-ov [data-po="yes"]'); if (b) b.click(); });
  await page.waitForTimeout(4500);
  const g4 = await page.evaluate(() => ({ phase: seasonState.phase, sbDone: !!(seasonState.playoffRounds && seasonState.playoffRounds.superbowl && seasonState.playoffRounds.superbowl[0] && seasonState.playoffRounds.superbowl[0].result) }));
  ok(g4.phase === 'complete' || g4.sbDone, 'G3 · YES sims the whole bracket through the Super Bowl', JSON.stringify(g4));

  // ---- V · the Super Bowl page ----
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-replay-ov,.zpb-prematch,.zpb-sbfin').forEach(x => x.remove()); if (typeof zpbStoryRelease === 'function') zpbStoryRelease(); } catch (e) {} });
  await page.waitForTimeout(800);
  const v1 = await page.evaluate(() => {
    const btn = document.getElementById('seasonReviewBtn');
    const ownPanel = btn ? btn.closest('.zpb-sr-own') : null;
    const banner = document.querySelector('.champion-banner');
    const gap = ownPanel && banner ? Math.round(banner.getBoundingClientRect().top - ownPanel.getBoundingClientRect().bottom) : null;
    const cs = ownPanel ? getComputedStyle(ownPanel) : null;
    const pr = ownPanel ? ownPanel.parentElement.getBoundingClientRect() : null;
    const br = ownPanel ? ownPanel.getBoundingClientRect() : null;
    return {
      label: btn ? btn.textContent.trim() : null, own: !!ownPanel, gap,
      centered: cs && pr ? Math.abs((br.left + br.right) / 2 - (pr.left + pr.right) / 2) < 24 : null,
      big: btn ? btn.classList.contains('zpb-ctabig') : null,
      simSeasonInHeader: !!document.getElementById('simSeasonBtn')
    };
  });
  ok(v1.label === 'SEASON REVIEW' && v1.own && v1.big, 'V1 · SEASON REVIEW: no arrow, the glowing big CTA, its own panel', JSON.stringify(v1));
  ok(v1.centered === true, 'V2 · the panel is centered on the page');
  ok(v1.gap != null && v1.gap >= 18, 'V3 · real distance from the SUPER BOWL CHAMPIONS panel', 'gap=' + v1.gap);
  ok(v1.simSeasonInHeader === false, 'H5 · no SIM SEASON on the Super Bowl review page');
  await page.screenshot({ path: SH + '/w65-sb-top.png' });

  // ---- the 100-seasons door + the badges + the glitch ----
  await page.evaluate(() => { const b = document.getElementById('sim100Btn'); if (b) b.click(); });
  await page.waitForTimeout(400);
  for (let i = 0; i < 60; i++) { const d = await page.evaluate(() => !!document.getElementById('back100Btn') && !document.getElementById('sim100Bar')); if (d) break; await page.waitForTimeout(500); }
  await page.waitForTimeout(800);
  const l1 = await page.evaluate(() => {
    const hero2 = document.querySelector('.zpb-100hero2');
    const back = document.getElementById('back100Btn');
    const bar = document.getElementById('zpbBackSeasonBar');
    return {
      hero2: hero2 ? hero2.textContent : null,
      backLabel: back ? back.textContent.trim() : null, backGlow: back ? back.classList.contains('zpb-bts') : false,
      barVisible: bar ? bar.offsetParent !== null && !!bar.innerHTML : false
    };
  });
  ok(l1.hero2 && /12\+ win seasons/.test(l1.hero2) && /became titles/.test(l1.hero2), 'L1 · the 100-seasons hero wears the new advanced badges', (l1.hero2 || '').slice(0, 90));
  ok(l1.backLabel === 'BACK TO SEASON' && l1.backGlow, 'L2 · the 100-seasons door glows in BACK TO SEASON', l1.backLabel);
  ok(l1.barVisible, 'B3 · the glowing bar closes the 100-seasons page too');
  await page.screenshot({ path: SH + '/w65-100seasons.png' });
  await page.evaluate(() => { const b = document.getElementById('back100Btn'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  const backOnSb = await page.evaluate(() => ({
    sb: !!document.querySelector('.champion-banner'),
    reviewBtn: !!document.getElementById('seasonReviewBtn')
  }));
  ok(backOnSb.sb && backOnSb.reviewBtn, 'V4 · Back to season lands on the Super Bowl page', JSON.stringify(backOnSb));
  await page.evaluate(() => { const b = document.getElementById('seasonReviewBtn'); if (b) b.click(); });
  await page.waitForTimeout(1400);
  const v5 = await page.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll('#draftResultsBody h2')).find(x => /Season Review/.test(x.textContent));
    return { onReview: !!h2, showReview: (() => { try { return seasonState.showReview; } catch (e) { return null; } })() };
  });
  ok(v5.onReview && v5.showReview === true, 'V5 · THE GLITCH: SEASON REVIEW lands on the Season Review page, even after the 100 seasons', JSON.stringify(v5));
  await page.screenshot({ path: SH + '/w65-review.png' });

  // ---- B4 · the browser page carries the glowing bar; clicking it returns ----
  await page.evaluate(() => { document.getElementById('tabPlayersBtn').click(); });
  await page.waitForTimeout(800);
  const b4 = await page.evaluate(() => {
    const bar = document.getElementById('zpbBackSeasonBar');
    const btn = bar ? bar.querySelector('[data-bts]') : null;
    return { there: !!btn && btn.offsetParent !== null };
  });
  ok(b4.there, 'B4a · the player browser page glows BACK TO SEASON at the bottom');
  await page.evaluate(() => { const b = document.querySelector('#zpbBackSeasonBar [data-bts]'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  const b4b = await page.evaluate(() => ({
    season: (() => { try { return resultsView === 'season' && !!seasonState; } catch (e) { return false; } })(),
    barHidden: (() => { const bar = document.getElementById('zpbBackSeasonBar'); return !bar || bar.style.display === 'none' || !bar.innerHTML; })()
  }));
  ok(b4b.season && b4b.barHidden, 'B4b · clicking it returns to the season tab and the bar retires', JSON.stringify(b4b));

  console.log('\npage errors: ' + (errors.length ? errors.join(' | ') : 'none'));
  ok(errors.length === 0, 'zero page errors through the whole run');

  await browser.close();
  console.log(`\nw65_round: ${pass} pass · ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('BATTERY ERROR', e); process.exit(2); });
