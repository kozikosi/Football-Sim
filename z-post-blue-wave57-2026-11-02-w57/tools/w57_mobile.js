/* w57_mobile.js — the Owner's round-57 phone battery (430px + 390px + 320px)
 * M1 draft card: TWO lines — name · Draft on top, pos · team · ovr · wins · priority · gone spread
 *   on the bottom, FILLS right under the button, the priority ink == the gone/wins ink
 * M12 the pregame cinematic: no key player ever covers the logos (390 + 320, regular + SB)
 * M13 the badge cascade runs 0.25s faster (the rail + the unit report card)
 * M2 tab persistence (w55 re-pin) · M3 preview/review/draft no pan · M4 box score one table
 * M5 stars one per line (re-pin) · M6 SB panel top team name centered (real + WASHINGTON synthetic)
 * M7 Dime row clean pre-selection + the Dime picker (w55 re-pin) · M8 zero page errors
 * M9 the review 20-0 stage compressed, ranks panel up · M10 the bracket vertical funnel
 * M11 the pick grades as cards + badges · N1 320px legs */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w57/builds/Football-Sim-Z-post-blue-w57.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/w57/shots';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };


(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const errors = [];

  // ================= 430px large phone: the draft card first =================
  const page = await browser.newPage({ viewport: { width: 430, height: 900 } });
  page.on('pageerror', e => errors.push('430: ' + String(e).slice(0, 120)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(400);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1400);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(300);

  const cardCheck = () => {
    const rect = el => { if (!el) return null; const b = el.getBoundingClientRect(); return { l: Math.round(b.left), r: Math.round(b.right), t: Math.round(b.top), b: Math.round(b.bottom) }; };
    const tr = document.querySelector('#draftTable2 tbody tr');
    if (!tr) return { norow: true };
    const r = {};
    r.h = Math.round(tr.getBoundingClientRect().height);
    r.labeled = [...tr.querySelectorAll('td[data-label]')].filter(td => getComputedStyle(td, '::before').display !== 'none').length;
    r.name = rect(tr.querySelector('.dc-name')); r.btn = rect(tr.querySelector('.dc-btn'));
    r.pos = rect(tr.querySelector('td[data-label="Pos"]')); r.team = rect(tr.querySelector('td[data-label="Team"]'));
    r.ovr = rect(tr.querySelector('.dc-ovr')); r.wins = rect(tr.querySelector('.dc-wins'));
    r.pri = rect(tr.querySelector('.dc-pri')); r.gone = rect(tr.querySelector('.dc-gone')); r.fills = rect(tr.querySelector('.dc-fills'));
    const cs = sel => { const el = tr.querySelector(sel); return el ? getComputedStyle(el).color : null; };
    r.inkPri = cs('.dc-pri'); r.inkGone = cs('.dc-gone'); r.inkWins = cs('.dc-wins');
    r.btnTxt = (tr.querySelector('.dc-btn button') || {}).textContent;
    r.over = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    // the Owner's order on one bottom line: pos · team · ovr · wins · priority · gone
    const line2 = [r.pos, r.team, r.ovr, r.wins, r.pri, r.gone];
    r.orderOK = line2.every(x => x) && line2.every((x, i) => i === 0 || x.l >= line2[i - 1].l);
    r.oneRow = line2.every(x => x) && Math.abs(line2[0].t - line2[5].t) < 6;
    r.fillsUnderBtn = r.fills && r.btn && r.fills.t >= r.btn.b - 2 && r.fills.r <= r.btn.r + 26;
    r.nameTopLine = r.name && r.btn && r.name.t < r.pos.t && Math.abs(r.name.t - r.btn.t) < 14;
    return r;
  };
  let m1 = await page.evaluate(cardCheck);
  ok(m1.h > 0 && m1.h <= 84, 'M1 · 430px: the card reads in TWO compact lines (≤84px)', 'h=' + m1.h);
  ok(m1.labeled >= 6, 'M1 · 430px: the stat labels are on the card', 'labeled=' + m1.labeled);
  ok(m1.nameTopLine === true, 'M1 · 430px: the name and the Draft button share the top line', JSON.stringify({ name: m1.name, btn: m1.btn }));
  ok(m1.orderOK === true && m1.oneRow === true, 'M1 · 430px: pos · team · ovr · wins · priority · gone spread on the bottom line', JSON.stringify(m1.pos));
  ok(m1.fillsUnderBtn === true, 'M1 · 430px: FILLS sits right under the Draft button', JSON.stringify({ fills: m1.fills, btn: m1.btn }));
  ok(m1.inkPri === m1.inkGone && m1.inkGone === m1.inkWins, 'M1 · 430px: the priority ink matches the gone and wins ink', JSON.stringify({ pri: m1.inkPri, gone: m1.inkGone, wins: m1.inkWins }));
  ok(m1.over <= 0, 'M1 · 430px: the draft board never pans', 'docOver=' + m1.over);
  await page.evaluate(() => document.getElementById('draftTable2').scrollIntoView());
  await page.waitForTimeout(300);
  await page.screenshot({ path: SHOTS + '/w57-430-draftcard.png' });

  // resize the SAME session to 390 — the CSS re-flows
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  m1 = await page.evaluate(cardCheck);
  ok(m1.h > 0 && m1.h <= 84, 'M1 · 390px: the two-line card holds (≤84px)', 'h=' + m1.h);
  ok(m1.orderOK === true && m1.fillsUnderBtn === true && m1.nameTopLine === true, 'M1 · 390px: the Owner shape holds — name·Draft / pos·team·ovr·wins·pri·gone / FILLS under the button', '');
  ok(m1.inkPri === m1.inkGone, 'M1 · 390px: the priority ink still matches gone', JSON.stringify({ pri: m1.inkPri, gone: m1.inkGone }));
  await page.screenshot({ path: SHOTS + '/w57-390-draftcard.png' });

  // M7a · the Dime row is CLEAN before a dime player exists (the bracket law)
  const m7a = await page.evaluate(() => {
    const row = window.zpbDimeDrafRow ? zpbDimeDrafRow({ slots: {} }) : '';
    if (!row) return { nofn: true };
    const host = document.createElement('div'); host.style.cssText = 'position:fixed;left:-9999px;top:0;width:360px;';
    host.innerHTML = row; document.body.appendChild(host);
    const el = host.firstElementChild;
    const cs = getComputedStyle(el);
    const res = { cls: el.className, styleAttr: el.getAttribute('style') || '', bg: cs.backgroundImage, blw: cs.borderLeftWidth, blc: cs.borderLeftColor };
    res.clean = res.styleAttr === '' && (res.blc.includes('rgba(0, 0, 0, 0)') || res.blc.includes('transparent'));
    const filled = zpbDimeDrafRow({ slots: { CB4: ['Zai Ball', 'CB', 'Kansas City Chiefs', 92] } });
    host.innerHTML = filled;
    const el2 = host.firstElementChild;
    const cs2 = getComputedStyle(el2);
    res.filledPainted = cs2.backgroundImage !== 'none' && cs2.borderLeftWidth === '3px';
    host.remove();
    return res;
  });
  ok(m7a.clean === true, 'M7 · the EMPTY Dime row is clean — no bracket before a dime is selected', JSON.stringify({ style: m7a.styleAttr, blc: m7a.blc }));
  ok(m7a.filledPainted === true, 'M7 · a FILLED Dime row wears the same row paint as every sibling', 'painted=' + m7a.filledPainted);

  // M2 · tab persistence (w55 re-pin)
  await page.evaluate(() => { const b = document.getElementById('tabGuideBtn'); if (b) b.click(); });
  await page.waitForTimeout(600);
  const saved = await page.evaluate(() => { try { return localStorage.getItem('zpb:tab'); } catch (e) { return null; } });
  ok(saved === 'viewGuide|tabGuideBtn', 'M2 · the tab is remembered (zpb:tab, w55 re-pin)', String(saved));

  // finish the draft (instant)
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(400);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(800);

  // M9 · the review 20-0 stage compressed, the ranks panel up
  const m9 = await page.evaluate(() => {
    const si = document.querySelector('#draftResultsBody .zpb-stageintro');
    const ranks = document.querySelector('.zpb-ranks-fade');
    if (!si) return { nostage: true };
    return {
      slim: si.classList.contains('zpb-stageintro-slim'),
      h: Math.round(si.getBoundingClientRect().height),
      ranksGap: ranks ? Math.round(ranks.getBoundingClientRect().top - si.getBoundingClientRect().bottom) : null,
      over: document.documentElement.scrollWidth - document.documentElement.clientWidth
    };
  });
  ok(m9.slim && m9.h <= 160, 'M9 · 390px: the 20-0 stage is compressed and leads the review (≤160px)', JSON.stringify(m9));
  ok(m9.ranksGap != null && m9.ranksGap <= 30, 'M9 · 390px: HOW YOUR DRAFT RANKS sits right under it', 'gap=' + m9.ranksGap);
  ok(m9.over <= 0, 'M9 · 390px: the review page never pans', 'docOver=' + m9.over);
  await page.evaluate(() => { const p = document.getElementById('draftFinalResults'); if (p) p.scrollIntoView(); });
  await page.waitForTimeout(400);
  await page.screenshot({ path: SHOTS + '/w57-390-review-stage.png' });

  // M11 · the pick grades are cards + badges
  const m11 = await page.evaluate(() => {
    const host = document.createElement('div'); host.id = 'm11host';
    host.style.cssText = 'position:fixed;inset:0;overflow:auto;background:var(--bg);z-index:9999;padding:10px;';
    host.innerHTML = pickGradePanelHTML(); document.body.appendChild(host);
    const grid = host.querySelector('.zpb-pg-grid');
    if (!grid) return { nogrid: true };
    const cardsEls = [...host.querySelectorAll('.zpb-pg-card')];
    const cw = cardsEls[0].getBoundingClientRect().width;
    const gridW = grid.getBoundingClientRect().width;
    const cols = Math.round(gridW / (cw + 8));
    const badges = cardsEls[0].querySelectorAll('.zpb-pg-badges i').length;
    const grade = !!host.querySelector('.zpb-pg-grade');
    const slot = !!host.querySelector('.zpb-pg-slot');
    const shm = host.querySelectorAll('.zpb-pg-name.zpb-shm').length;
    const res = { cards: cardsEls.length, cols, cw: Math.round(cw), badges, grade, slot, shm, tables: host.querySelectorAll('table').length, over: host.scrollWidth - host.clientWidth };
    host.remove();
    return res;
  });
  ok(m11.cards >= 25 && m11.tables === 0, 'M11 · 390px: the pick grades are CARDS (no table)', JSON.stringify(m11));
  ok(m11.cols === 2, 'M11 · 390px: two grade cards per row', 'cols=' + m11.cols);
  ok(m11.badges === 3 && m11.grade && m11.slot, 'M11 · 390px: each card carries the OVR/RD/RANK badges + the grade + the slot chip', JSON.stringify({ badges: m11.badges, grade: m11.grade, slot: m11.slot }));
  ok(m11.over <= 0, 'M11 · 390px: the grades panel never pans', 'docOver=' + m11.over);
  // a real in-page render for the screenshot (the season page surface)
  await page.evaluate(() => {
    const host = document.getElementById('draftResultsBody') || document.body;
    const w = document.createElement('div'); w.id = 'm11shot'; w.style.cssText = 'position:fixed;inset:0;overflow:auto;background:var(--bg);z-index:9998;padding:10px;';
    w.innerHTML = '<div class="panel" style="margin-bottom:14px;"><h4 style="margin-top:0;">DRAFT PICK GRADES</h4>' + pickGradePanelHTML().replace(/^[\s\S]*?<\/summary>/, '') + '</div>';
    document.body.appendChild(w);
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: SHOTS + '/w57-390-pickgrades.png' });
  await page.evaluate(() => { const h = document.getElementById('m11shot'); if (h) h.remove(); });

  // ---- season: week 1 preview ----
  await page.evaluate(() => { try { startSeason(); } catch (e) {} try { seasonState.preseason = false; } catch (e) {} });
  await page.waitForTimeout(2500);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1600);
  const m3 = await page.evaluate(() => ({ over: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
  ok(m3.over <= 0, 'M3 · 390px: the game PREVIEW page never pans (w55 re-pin)', 'docOver=' + m3.over);
  const m5 = await page.evaluate(() => {
    const row = document.querySelector('.zpb-pvfrow');
    if (!row) return { none: true };
    const cards = [...row.querySelectorAll(':scope > .zpb-pvcard')];
    const cw = row.getBoundingClientRect().width;
    return { cards: cards.length, stacked: cards.length < 2 || Math.abs(cards[0].getBoundingClientRect().width - cw) < 4 };
  });
  ok(!m5.none && m5.stacked, 'M5 · 390px: the stars face off one per line (w55 re-pin)', JSON.stringify(m5));

  // ---- play the week: review + box score ----
  await page.evaluate(() => { try { simulateCurrentWeek(); } catch (e) {} });
  await page.waitForTimeout(2200);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1500);
  const m4 = await page.evaluate(() => {
    const ls = document.querySelector('.linescore');
    if (!ls) return { none: true };
    return { display: getComputedStyle(ls).display, rows: ls.querySelectorAll('tbody tr').length, fits: ls.getBoundingClientRect().width <= ls.parentElement.clientWidth + 1 };
  });
  ok(!m4.none && m4.display === 'table' && m4.rows === 2, 'M4 · 390px: the box score is ONE table (w55 re-pin)', JSON.stringify(m4));
  const m3r = await page.evaluate(() => ({ over: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
  ok(m3r.over <= 0, 'M3 · 390px: the game REVIEW page never pans (w55 re-pin)', 'docOver=' + m3r.over);

  // M7b · the Dime picker in the season lineup panel (w55 re-pin)
  const m7b = await page.evaluate(() => {
    try {
      const roster = draftSim && draftSim.rosters && draftSim.rosters.find(r => r.isUser);
      const host = document.getElementById('lineupSeason');
      if (!host || !roster) return { nohost: true };
      const dime = [...host.querySelectorAll('.depth-row')].find(r => (r.querySelector('.slotname') || {}).textContent === 'DIME');
      if (!dime) return { norow: true };
      return { picker: !!dime.querySelector('.zpb-pickwrap .zpb-pickbtn') };
    } catch (e) { return { err: String(e).slice(0, 120) }; }
  });
  ok(m7b.picker === true, 'M7 · the Dime picker rides the season lineup (w55 re-pin)', JSON.stringify(m7b));

  // ---- run the season out + the playoffs ----
  await page.evaluate(() => { try { simRestOfSeason(); } catch (e) {} });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} });
  await page.evaluate(() => {
    try {
      window.__zpbQuietSim = true;
      startPlayoffs();
      for (let i = 0; i < 4; i++) {
        const rk = seasonState.currentPlayoffRound;
        if (!seasonState.playoffRoundSimulated) simulatePlayoffRound();
        if (rk !== 'superbowl') advancePlayoffRound(); else break;
      }
    } catch (e) {}
  });
  await page.waitForTimeout(1500);
  for (let i = 0; i < 10; i++) {
    const gone = await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); return document.querySelectorAll('.zpb-sbfin,.zpb-restov').length; } catch (e) { return 0; } });
    if (!gone) break;
    await page.waitForTimeout(500);
  }

  // M10 · the bracket is a vertical funnel
  const m10 = await page.evaluate(() => {
    const host = document.createElement('div'); host.id = 'm10host';
    host.style.cssText = 'position:fixed;inset:0;overflow:auto;background:var(--bg);z-index:9999;padding:10px;';
    host.innerHTML = renderBracketHTML(); document.body.appendChild(host);
    const tree = host.querySelector('.zpb-tree');
    const heads = [...host.querySelectorAll('.zpb-tree-col h6')].map(h => ({ t: h.textContent, y: Math.round(h.getBoundingClientRect().top), x: Math.round(h.getBoundingClientRect().left) }));
    const sbCard = host.querySelector('.zpb-trnd-sb .bracket-game');
    const treeBox = tree.getBoundingClientRect();
    const sbc = sbCard ? sbCard.getBoundingClientRect() : null;
    const cards = [...host.querySelectorAll('.bracket-game')].map(c => Math.round(c.getBoundingClientRect().top));
    const sorted = heads.slice().sort((a, b) => a.y - b.y);
    const res = {
      heads: sorted,
      order: sorted.every((h, i) => i === 0 || h.y >= sorted[i - 1].y - 1),
      sbCentered: sbc ? Math.abs((sbc.left + sbc.width / 2) - (treeBox.left + treeBox.width / 2)) <= 8 : null,
      sbLast: sbCard ? cards.every(y => y <= Math.round(sbc.top) + 1) : null,
      over: host.scrollWidth - host.clientWidth
    };
    host.remove();
    return res;
  });
  ok(m10.order === true, 'M10 · 390px: the funnel reads in playoff order (WC → Div → Champ → SB)', JSON.stringify(m10.heads));
  ok(m10.sbCentered === true, 'M10 · 390px: the Super Bowl card centers under its header', JSON.stringify({ sbCentered: m10.sbCentered }));
  ok(m10.sbLast === true, 'M10 · 390px: the Super Bowl card is the LAST card of the tree', JSON.stringify({ sbLast: m10.sbLast }));
  ok(m10.over <= 0, 'M10 · 390px: the bracket never pans', 'docOver=' + m10.over);

  // bracket screenshot on the real page
  await page.evaluate(() => { try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(800);
  await page.evaluate(() => { const p = [...document.querySelectorAll('.zpb-tree')][0]; if (p) p.scrollIntoView({ block: 'start' }); });
  await page.waitForTimeout(400);
  await page.screenshot({ path: SHOTS + '/w57-390-bracket.png' });

  // M6 · the SB panel: the top (away) team name centers — the real game AND the Washington synthetic
  const m6 = await page.evaluate(() => {
    const sb = seasonState.playoffRounds.superbowl[0];
    const host = document.createElement('div'); host.id = 'm6host';
    host.style.cssText = 'position:fixed;inset:0;overflow:auto;background:var(--bg);z-index:9999;padding:10px;';
    host.innerHTML = renderGameResultHTML(sb, null); document.body.appendChild(host);
    const line = host.querySelector('.score-line');
    const lb = line.getBoundingClientRect();
    const awayNm = host.querySelector('.sl-team:first-child .zpb-sl2name').getBoundingClientRect();
    const homeNm = host.querySelector('.sl-team:last-child .zpb-sl2name').getBoundingClientRect();
    const offA = Math.abs((awayNm.left + awayNm.width / 2) - (lb.left + lb.width / 2));
    const offH = Math.abs((homeNm.left + homeNm.width / 2) - (lb.left + lb.width / 2));
    // the WASHINGTON synthetic (the Owner's exact case: a long name on top)
    const g2 = JSON.parse(JSON.stringify(sb));
    g2.away = 'Washington Commanders';
    const w = document.createElement('div'); w.style.cssText = 'position:fixed;left:-9999px;top:0;width:' + Math.round(lb.width) + 'px;';
    w.innerHTML = renderGameResultHTML(g2, null); document.body.appendChild(w);
    const l2 = w.querySelector('.score-line').getBoundingClientRect();
    const a2 = w.querySelector('.sl-team:first-child .zpb-sl2name').getBoundingClientRect();
    const offW = Math.abs((a2.left + a2.width / 2) - (l2.left + l2.width / 2));
    const wLines = Math.round(a2.height);
    const res = { away: sb.away, offA: Math.round(offA * 10) / 10, offH: Math.round(offH * 10) / 10, offW: Math.round(offW * 10) / 10, wLines };
    host.remove(); w.remove();
    return res;
  });
  ok(m6.offA <= 6, 'M6 · 390px: the SB panel TOP team name centers', JSON.stringify(m6));
  ok(m6.offH <= 6, 'M6 · 390px: the bottom team name centers too', 'offH=' + m6.offH);
  ok(m6.offW <= 6, 'M6 · 390px: WASHINGTON COMMANDERS on top centers (the Owner\u2019s case)', 'offW=' + m6.offW);

  ok(errors.length === 0, 'M8 · zero page errors at 430/390px', errors.slice(0, 3).join(' | '));
  await page.close();

  // ================= 320px narrow phone =================
  const p2 = await browser.newPage({ viewport: { width: 320, height: 700 } });
  p2.on('pageerror', e => errors.push('320: ' + String(e).slice(0, 120)));
  await p2.goto(FILE); await p2.waitForTimeout(900);
  const n0 = await p2.evaluate(() => ({ over: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
  ok(n0.over <= 0, 'N1 · 320px: the home page never pans (w55 re-pin)', 'docOver=' + n0.over);
  await p2.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await p2.waitForTimeout(1000);
  await p2.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await p2.waitForTimeout(400);
  const n1c = await p2.evaluate(cardCheck);
  ok(n1c.labeled >= 6 && n1c.orderOK === true && n1c.fillsUnderBtn === true, 'N1 · 320px: the two-line labeled card holds (order + FILLS under the button)', JSON.stringify({ labeled: n1c.labeled, h: n1c.h }));
  ok(n1c.inkPri === n1c.inkGone, 'N1 · 320px: the priority ink matches gone at 320 too', '');
  ok(n1c.over <= 0, 'N1 · 320px: the draft board never pans', 'docOver=' + n1c.over);
  await p2.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await p2.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await p2.waitForTimeout(400); }
  await p2.waitForTimeout(1000);
  for (let i = 0; i < 16; i++) { const fin = await p2.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await p2.waitForTimeout(400); }
  await p2.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  const n2 = await p2.evaluate(() => {
    const si = document.querySelector('#draftResultsBody .zpb-stageintro');
    const ranks = document.querySelector('.zpb-ranks-fade');
    const rk = ranks ? ranks.parentElement : null; // the wrapper — the fade's own translateY(26px) is a pre-scroll artifact
    return { h: si ? Math.round(si.getBoundingClientRect().height) : null, gap: rk && si ? Math.round(rk.getBoundingClientRect().top - si.getBoundingClientRect().bottom) : null, over: document.documentElement.scrollWidth - document.documentElement.clientWidth };
  });
  ok(n2.h != null && n2.h <= 170, 'N1 · 320px: the 20-0 stage is compressed on the review', JSON.stringify(n2));
  ok(n2.gap != null && n2.gap <= 30, 'N1 · 320px: the ranks panel sits right under it', 'gap=' + n2.gap);
  ok(n2.over <= 0, 'N1 · 320px: the review page never pans', 'docOver=' + n2.over);
  const n3 = await p2.evaluate(() => {
    const host = document.createElement('div'); host.id = 'n3host';
    host.style.cssText = 'position:fixed;inset:0;overflow:auto;background:var(--bg);z-index:9999;padding:8px;';
    host.innerHTML = pickGradePanelHTML(); document.body.appendChild(host);
    const card = host.querySelector('.zpb-pg-card');
    const res = { cards: host.querySelectorAll('.zpb-pg-card').length, cw: card ? Math.round(card.getBoundingClientRect().width) : null, over: host.scrollWidth - host.clientWidth };
    host.remove(); return res;
  });
  ok(n3.cards >= 25 && n3.over <= 0, 'N1 · 320px: the grade cards fit two-up without panning', JSON.stringify(n3));
  await p2.evaluate(() => { try { startSeason(); } catch (e) {} try { seasonState.preseason = false; } catch (e) {} });
  await p2.waitForTimeout(2200);
  await p2.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await p2.waitForTimeout(1500);
  const n4 = await p2.evaluate(() => ({ over: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
  ok(n4.over <= 0, 'N1 · 320px: the PREVIEW page never pans (w55 re-pin)', 'docOver=' + n4.over);
  await p2.evaluate(() => { try { simulateCurrentWeek(); } catch (e) {} });
  await p2.waitForTimeout(2000);
  await p2.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await p2.waitForTimeout(1400);
  const n5 = await p2.evaluate(() => {
    const ls = document.querySelector('.linescore');
    return { over: document.documentElement.scrollWidth - document.documentElement.clientWidth, fits: ls ? ls.getBoundingClientRect().width <= ls.parentElement.clientWidth + 1 : null };
  });
  ok(n5.over <= 0 && n5.fits !== false, 'N1 · 320px: the REVIEW page never pans and the box fits (w55 re-pin)', JSON.stringify(n5));
  await p2.close();

  // ================= M12 · the pregame cinematic: nobody covers the logos =================
  // a fresh 390 session: draft → season → the week's replay intro (the regular-game pregame)
  const p3 = await browser.newPage({ viewport: { width: 390, height: 844 } });
  p3.on('pageerror', e => errors.push('M12: ' + String(e).slice(0, 120)));
  await p3.goto(FILE); await p3.waitForTimeout(900);
  await p3.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await p3.reload(); await p3.waitForTimeout(900);
  await p3.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await p3.waitForTimeout(400);
  await p3.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await p3.waitForTimeout(1400);
  await p3.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await p3.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await p3.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await p3.waitForTimeout(400); }
  await p3.waitForTimeout(1000);
  for (let i = 0; i < 16; i++) { const fin = await p3.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await p3.waitForTimeout(400); }
  await p3.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await p3.waitForTimeout(500);
  const cineCheck = () => {
    const intro = document.querySelector('.zpb-rep-intro');
    if (!intro) return { nointro: true };
    const logos = intro.querySelector('.zpb-intro-logos');
    const lb = logos ? logos.getBoundingClientRect() : null;
    const stars = [...intro.querySelectorAll('.zpb-intro-star')].map(st => st.getBoundingClientRect());
    const pad = 2; // a 2px tolerance for the fade transform
    const hit = stars.filter(b => lb && !(b.right <= lb.left - pad || lb.right <= b.left - pad || b.bottom <= lb.top - pad || lb.bottom <= b.top - pad)).length;
    const ib = intro.getBoundingClientRect();
    const stackTop = Math.min(...[...intro.querySelectorAll('.zpb-intro-title,.zpb-intro-logos,.zpb-intro-sub')].map(x => x.getBoundingClientRect().top));
    const stackBottom = Math.max(...[...intro.querySelectorAll('.zpb-intro-title,.zpb-intro-logos,.zpb-intro-sub')].map(x => x.getBoundingClientRect().bottom));
    const starTop = stars.length ? Math.min(...stars.map(b => b.top)) : null;
    return { stars: stars.length, hit, marqueePinned: (stackTop - ib.top) < 60, fanBelow: starTop != null ? starTop >= stackBottom - 2 : null, logoH: lb ? Math.round(lb.height) : null };
  };
  // fire the week's game replay (the user's game carries events)
  await p3.evaluate(() => { try { startSeason(); } catch (e) {} try { seasonState.preseason = false; } catch (e) {} });
  await p3.waitForTimeout(2200);
  await p3.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await p3.waitForTimeout(1200);
  await p3.evaluate(() => { try { simulateCurrentWeek(); } catch (e) {} });
  await p3.waitForTimeout(2600);
  let m12 = await p3.evaluate(cineCheck);
  ok(m12.stars >= 2 && m12.hit === 0, 'M12 · 390px: no key player covers the logos (regular pregame)', JSON.stringify(m12));
  ok(m12.marqueePinned === true && m12.fanBelow === true, 'M12 · 390px: the marquee pins to the top and the pairs fan out below it', JSON.stringify(m12));
  await p3.screenshot({ path: SHOTS + '/w57-390-cine.png' });
  await p3.evaluate(() => { try { document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {} });
  // the 320 leg
  await p3.setViewportSize({ width: 320, height: 700 });
  await p3.waitForTimeout(500);
  await p3.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await p3.waitForTimeout(1000);
  await p3.evaluate(() => { try { simulateCurrentWeek(); } catch (e) {} });
  await p3.waitForTimeout(2600);
  m12 = await p3.evaluate(cineCheck);
  ok(m12.stars >= 2 && m12.hit === 0, 'M12 · 320px: no key player covers the logos', JSON.stringify(m12));
  await p3.screenshot({ path: SHOTS + '/w57-320-cine.png' });
  await p3.evaluate(() => { try { document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {} });
  // M12b · the SUPER BOWL pregame (the 60s intro, the bigger logos, the cup)
  const sbUp = await p3.evaluate(() => {
    try {
      simRestOfSeason();
      document.querySelectorAll('.zpb-restov').forEach(o => o.remove());
      window.__zpbStoryHold = false;
      document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove());
      window.__zpbQuietSim = true;
      startPlayoffs();
      for (let i = 0; i < 4; i++) {
        const rk = seasonState.currentPlayoffRound;
        if (!seasonState.playoffRoundSimulated) simulatePlayoffRound();
        if (rk !== 'superbowl') advancePlayoffRound(); else break;
      }
      // replay the Super Bowl itself with the cinematic ON (the w52 law) — the site's own entry
      const sbg = seasonState.playoffRounds.superbowl[0];
      window.__zpbSBReplayHold = true;
      zpbGameReplay(sbg, seasonUserTeam());
      if (!document.querySelector('.zpb-replay-ov')) window.__zpbSBReplayHold = false;
      return { sb: true, ov: !!document.querySelector('.zpb-replay-ov') };
    } catch (e) { return { err: String(e).slice(0, 120) }; }
  });
  await p3.waitForTimeout(8100); // w57: the cup lands at 4.2s+3.4s, the banner at 6.4s+1.4s — judge them LANDED, never their hidden pre-animation rects
  const m12b = await p3.evaluate(() => {
    try {
    const vis = el => { try { return el && parseFloat(getComputedStyle(el).opacity) > 0.05; } catch (e) { return false; } };
    const intro = document.querySelector('.zpb-rep-intro');
    if (!intro) return { nointro: true };
    const logos = intro.querySelector('.zpb-intro-logos');
    const lb = logos ? logos.getBoundingClientRect() : null;
    const stars = [...intro.querySelectorAll('.zpb-intro-star')].map(st => st.getBoundingClientRect());
    const pad = 2;
    const hit = stars.filter(b => lb && !(b.right <= lb.left - pad || lb.right <= b.left - pad || b.bottom <= lb.top - pad || lb.bottom <= b.top - pad)).length;
    const imgs = [...intro.querySelectorAll('.zpb-intro-logos img')].map(i => Math.round(i.getBoundingClientRect().width));
    const cup = intro.querySelector('.zpb-intro-cup');
    const banner = intro.querySelector('.zpb-intro-banner');
    const cb = cup ? cup.getBoundingClientRect() : null;
    const bb = banner ? banner.getBoundingClientRect() : null;
    const cupVis = vis(cup);
    const cupHit = cupVis && cb && lb ? !(cb.right <= lb.left || lb.right <= cb.left || cb.bottom <= lb.top - 26 || lb.bottom <= cb.top) : false;
    const banVis = vis(banner);
    const banHit = banVis && bb && stars.length ? stars.some(b => !(b.right <= bb.left || bb.right <= b.left || b.bottom <= bb.top || bb.bottom <= b.top)) : false;
    const ib = intro.getBoundingClientRect();
    const geo = { boxH: Math.round(ib.height), logosY: lb ? [Math.round(lb.top - ib.top), Math.round(lb.bottom - ib.top)] : null, bannerY: bb ? [Math.round(bb.top - ib.top), Math.round(bb.bottom - ib.top)] : null,
      starY: stars.map(b => [Math.round(b.top - ib.top), Math.round(b.bottom - ib.top)]) };
    return { sbStage: !!intro.closest('.zpb-sb'), stars: stars.length, hit, imgs, cupHit, banHit, geo };
    } catch (e) { return { err: String(e).slice(0, 120) }; }
  });
  if (m12b.nointro || m12b.err) { ok(false, 'M12b · 320px: the Super Bowl pregame keeps the logos clear', JSON.stringify(m12b)); }
  else {
    ok(m12b.sbStage === true && m12b.stars >= 2 && m12b.hit === 0, 'M12b · 320px: the Super Bowl pregame keeps the logos clear', JSON.stringify(m12b));
    ok(m12b.imgs.length === 2 && m12b.imgs.every(w => w <= 66), 'M12b · 320px: the SB logos shrink to the phone stage', JSON.stringify(m12b.imgs));
    ok(m12b.cupHit === false && m12b.banHit === false, 'M12b · 320px: the cup and the LIVE banner keep their own zones', JSON.stringify({ cupHit: m12b.cupHit, banHit: m12b.banHit }));
  }
  await p3.screenshot({ path: SHOTS + '/w57-320-cine-sb.png' });
  await p3.close();

  // ================= M13 · the badge cascade runs 0.25s faster =================
  const p4 = await browser.newPage({ viewport: { width: 390, height: 844 } });
  p4.on('pageerror', e => errors.push('M13: ' + String(e).slice(0, 120)));
  await p4.goto(FILE); await p4.waitForTimeout(900);
  await p4.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await p4.reload(); await p4.waitForTimeout(900);
  // the season-in-badges rail renders on the review page — reach it the fast way
  await p4.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await p4.waitForTimeout(400);
  await p4.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await p4.waitForTimeout(1400);
  await p4.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await p4.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await p4.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await p4.waitForTimeout(400); }
  await p4.waitForTimeout(1000);
  for (let i = 0; i < 16; i++) { const fin = await p4.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await p4.waitForTimeout(400); }
  await p4.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await p4.waitForTimeout(500);
  await p4.evaluate(() => {
    try {
      simRestOfSeason();
      document.querySelectorAll('.zpb-restov').forEach(o => o.remove());
      window.__zpbStoryHold = false;
      document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove());
      renderSeasonTab(document.getElementById('draftResultsBody') || document.body);
    } catch (e) {}
  });
  await p4.waitForTimeout(1400);
  const m13 = await p4.evaluate(() => {
    let badge = document.querySelector('.zpb-sbadge');
    let scard = document.querySelector('.zpb-scard');
    if (!badge) { // the review surface can lag the render — the season builder itself is the law's source
      const host = document.createElement('div'); host.id = 'm13host';
      host.style.cssText = 'position:fixed;left:-99999px;width:420px;';
      host.innerHTML = '<div class="panel">' + zpbSeasonStoryHTML() + '</div>';
      document.body.appendChild(host);
      badge = host.querySelector('.zpb-sbadge'); scard = host.querySelector('.zpb-scard');
    }
    let rcb = document.querySelector('.zpb-rcbadge');
    if (!rcb) { // the unit report card lives on the season team page — the tile's own delay law is the check
      const host2 = document.createElement('div'); host2.id = 'm13host2';
      host2.style.cssText = 'position:fixed;left:-99999px;width:420px;background:var(--panel2);';
      host2.innerHTML = '<div class="zpb-met zpb-rcbadge" style="--beat:0;"><span class="zpb-rc-grade">A</span><span class="zpb-rc-body"><b>PASS RUSH</b><i>88 OVR · #4</i><em>41 sacks</em></span></div>';
      document.body.appendChild(host2);
      rcb = host2.querySelector('.zpb-rcbadge');
    }
    const d = el => el ? getComputedStyle(el).animationDelay : null;
    const du = el => el ? getComputedStyle(el).animationDuration : null;
    return { badgeDelay: d(badge), badgeDur: du(badge), scardDelay: d(scard), rcDelay: d(rcb), rcDur: du(rcb),
      badgeBeat: badge ? (badge.getAttribute('data-beat') || '0') : null, hold: !!document.querySelector('.zpb-story-hold') };
  });
  const del = v => v == null ? null : parseFloat(v);
  ok(del(m13.badgeDelay) === (parseInt(m13.badgeBeat || '0', 10) - 0.25), 'M13 · the season-in-badges delay is beat*1s − 0.25s', JSON.stringify(m13));
  ok(del(m13.rcDelay) === -0.25, 'M13 · the unit report card leads at −0.25s for beat 0', JSON.stringify(m13));
  ok(del(m13.badgeDur) === 0.7 && del(m13.rcDur) === 0.8, 'M13 · the entrance animations keep their own durations', JSON.stringify({ b: m13.badgeDur, r: m13.rcDur }));
  await p4.close();

  ok(errors.length === 0, 'M8 · zero page errors overall', errors.slice(0, 3).join(' | '));
  console.log(`\nw57_mobile: ${pass} pass · ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
