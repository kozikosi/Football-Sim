/* w56_mobile.js — the Owner's round-56 phone battery (390px + 320px + a 430px large-phone leg)
 * M1 draft card: labels back, three lines, OVR never stacks the Priority
 * M2 tab persistence (w55 re-pin) · M3 preview/review/draft no pan · M4 box score one table
 * M5 stars one per line (re-pin) · M6 SB panel top team name centered (real + WASHINGTON synthetic)
 * M7 Dime row clean pre-selection + the Dime picker (w55 re-pin) · M8 zero page errors
 * M9 the review 20-0 stage compressed, ranks panel up · M10 the bracket vertical funnel
 * M11 the pick grades as cards + badges · N1 320px legs */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w56/builds/Football-Sim-Z-post-blue-w56.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/w56/shots';
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
    return {
      h: tr ? Math.round(tr.getBoundingClientRect().height) : null,
      labeled: tr ? [...tr.querySelectorAll('td[data-label]')].filter(td => getComputedStyle(td, '::before').display !== 'none').length : 0,
      ovr: rect(tr && tr.querySelector('.dc-ovr')),
      pri: rect(tr && tr.querySelector('.dc-pri')),
      over: document.documentElement.scrollWidth - document.documentElement.clientWidth
    };
  };
  let m1 = await page.evaluate(cardCheck);
  const sep = m1.ovr && m1.pri ? (m1.pri.l >= m1.ovr.r || m1.pri.r <= m1.ovr.l || m1.pri.t >= m1.ovr.b || m1.pri.b <= m1.ovr.t) : false;
  ok(m1.h > 0 && m1.h <= 92, 'M1 · 430px: the draft card stays compact (≤92px)', 'h=' + m1.h);
  ok(m1.labeled >= 5, 'M1 · 430px: the stat labels are back on the card', 'labeled=' + m1.labeled);
  ok(sep, 'M1 · 430px: OVR and Priority do not stack', JSON.stringify({ ovr: m1.ovr, pri: m1.pri }));
  ok(m1.over <= 0, 'M1 · 430px: the draft board never pans', 'docOver=' + m1.over);
  await page.evaluate(() => document.getElementById('draftTable2').scrollIntoView());
  await page.waitForTimeout(300);
  await page.screenshot({ path: SHOTS + '/w56-430-draftcard.png' });

  // resize the SAME session to 390 — the CSS re-flows
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  m1 = await page.evaluate(cardCheck);
  const sep390 = m1.ovr && m1.pri ? (m1.pri.l >= m1.ovr.r || m1.pri.r <= m1.ovr.l || m1.pri.t >= m1.ovr.b || m1.pri.b <= m1.ovr.t) : false;
  ok(m1.h > 0 && m1.h <= 92, 'M1 · 390px: the draft card reads in three labeled lines (≤92px)', 'h=' + m1.h);
  ok(m1.labeled >= 5, 'M1 · 390px: the stat labels are back', 'labeled=' + m1.labeled);
  ok(sep390, 'M1 · 390px: OVR and Priority never stack', JSON.stringify({ ovr: m1.ovr, pri: m1.pri }));
  await page.screenshot({ path: SHOTS + '/w56-390-draftcard.png' });

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
  await page.screenshot({ path: SHOTS + '/w56-390-review-stage.png' });

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
  await page.screenshot({ path: SHOTS + '/w56-390-pickgrades.png' });
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
  await page.screenshot({ path: SHOTS + '/w56-390-bracket.png' });

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
  const sep320 = n1c.ovr && n1c.pri ? (n1c.pri.l >= n1c.ovr.r || n1c.pri.r <= n1c.ovr.l || n1c.pri.t >= n1c.ovr.b || n1c.pri.b <= n1c.ovr.t) : false;
  ok(n1c.labeled >= 5 && sep320, 'N1 · 320px: the card labels + the OVR/Priority separation hold', JSON.stringify({ labeled: n1c.labeled, h: n1c.h }));
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

  ok(errors.length === 0, 'M8 · zero page errors overall', errors.slice(0, 3).join(' | '));
  console.log(`\nw56_mobile: ${pass} pass · ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
