/* w57_live.js — the Owner's round-56 desktop battery (1280px)
 * D1 Dime row paint laws (clean pre-selection, painted when filled) · D2 pick grades cards on desktop
 * D3 Dime picker stages + applies (w55 re-pin) · D4 desktop box score unchanged · D5 SB storm row untouched
 * D6 desktop bracket tree untouched · D7 the score-line sides law holds on desktop
 * D9 the review 20-0 stage slim on desktop too · D10 standing laws re-pinned · D8 zero errors */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w57/builds/Football-Sim-Z-post-blue-w57.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/w57/shots';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1400 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 140)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  // draft to the end (49ers for the takeover laws)
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'San Francisco 49ers'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await page.waitForTimeout(500);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });

  // D1 · the draft-page Dime row: clean before a dime exists, painted when one does
  const d1 = await page.evaluate(() => {
    const el = [...document.querySelectorAll('#draftRosterList .depth-row')].find(r => (r.querySelector('.slotname') || {}).textContent === 'DIME');
    if (!el) return { norow: true };
    const cs = getComputedStyle(el);
    const pre = { style: el.getAttribute('style') || '', blc: cs.borderLeftColor };
    const filled = zpbDimeDrafRow({ slots: { CB4: ['Zai Ball', 'CB', 'San Francisco 49ers', 91] } });
    const host = document.createElement('div'); host.style.cssText = 'position:fixed;left:-9999px;width:400px;';
    host.innerHTML = filled; document.body.appendChild(host);
    const cs2 = getComputedStyle(host.firstElementChild);
    const painted = cs2.borderLeftWidth === '3px' && !(cs2.borderLeftColor.includes('rgba(0, 0, 0, 0)') || cs2.borderLeftColor.includes('transparent'));
    host.remove();
    return { pre, painted };
  });
  ok(d1.pre && d1.pre.style === '' && (d1.pre.blc.includes('rgba(0, 0, 0, 0)') || d1.pre.blc.includes('transparent')), 'D1 · the draft-page Dime row is CLEAN before a dime is selected', JSON.stringify(d1.pre));
  ok(d1.painted === true, 'D1 · a filled Dime row wears the sibling row paint', 'painted=' + d1.painted);

  // finish the draft
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(800);

  // D9 · the review's 20-0 stage is slim on desktop too
  const d9 = await page.evaluate(() => {
    const si = document.querySelector('#draftResultsBody .zpb-stageintro');
    const ranks = document.querySelector('.zpb-ranks-fade');
    return { slim: si ? si.classList.contains('zpb-stageintro-slim') : null, h: si ? Math.round(si.getBoundingClientRect().height) : null, gap: ranks && si ? Math.round(ranks.parentElement.getBoundingClientRect().top - si.getBoundingClientRect().bottom) : null };
  });
  ok(d9.slim === true && d9.h <= 160, 'D9 · desktop: the review 20-0 stage is compressed (≤160px)', JSON.stringify(d9));

  // D2 · the pick grades are cards on desktop (wide grid, no table)
  const d2 = await page.evaluate(() => {
    const host = document.createElement('div'); host.id = 'd2host';
    host.style.cssText = 'position:fixed;left:-9999px;top:0;width:1200px;';
    host.innerHTML = pickGradePanelHTML(); document.body.appendChild(host);
    const grid = host.querySelector('.zpb-pg-grid');
    const cards = [...host.querySelectorAll('.zpb-pg-card')];
    const cw = cards[0].getBoundingClientRect().width;
    const res = { cards: cards.length, cols: Math.round(grid.getBoundingClientRect().width / (cw + 8)), cw: Math.round(cw), tables: host.querySelectorAll('table').length };
    host.remove(); return res;
  });
  ok(d2.cards >= 25 && d2.tables === 0, 'D2 · desktop: the pick grades are cards (no table)', JSON.stringify(d2));
  ok(d2.cols >= 4, 'D2 · desktop: the grade grid opens wide (≥4 cards a row)', 'cols=' + d2.cols);

  // season + week 1
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(400);
  await page.evaluate(() => { try { startSeason(); } catch (e) {} try { seasonState.preseason = false; } catch (e) {} });
  await page.waitForTimeout(2400);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1500);

  // D3 · the Dime picker stages + APPLY lights (w55 re-pin, iterate the menu)
  const d3 = await page.evaluate(() => {
    try {
      const roster = draftSim.rosters.find(r => r.isUser);
      const host = document.getElementById('lineupSeason');
      if (!host) return { nohost: true };
      const dime = [...host.querySelectorAll('.depth-row')].find(r => (r.querySelector('.slotname') || {}).textContent === 'DIME');
      if (!dime) return { norow: true };
      const btn = dime.querySelector('.zpb-pickwrap .zpb-pickbtn');
      const before = zpbStageCount(roster);
      btn.click();
      const rows = [...dime.querySelectorAll('.zpb-pickrow')];
      let staged = false;
      for (const row of rows) {
        row.click();
        if (zpbStageCount(roster) > before) { staged = true; break; }
        const b2 = [...host.querySelectorAll('.depth-row')].find(r => (r.querySelector('.slotname') || {}).textContent === 'DIME');
        if (b2) (b2.querySelector('.zpb-pickwrap .zpb-pickbtn') || {}).click && b2.querySelector('.zpb-pickwrap .zpb-pickbtn').click();
      }
      const applyBtn = document.getElementById('lineupSeasonApplyChanges');
      const pendingShown = applyBtn && !applyBtn.disabled;
      if (staged) roster._zpbStage = null;
      return { staged, pendingShown, menuRows: rows.length };
    } catch (e) { return { err: String(e).slice(0, 140) }; }
  });
  ok(d3.staged === true && d3.pendingShown === true, 'D3 · the Dime pick stages and lights APPLY THE CHANGES (w55 re-pin)', JSON.stringify(d3));

  // play week 1 → the desktop linescore keeps its wide one-table shape
  await page.evaluate(() => { try { simulateCurrentWeek(); } catch (e) {} });
  await page.waitForTimeout(2200);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1500);
  const d4 = await page.evaluate(() => {
    const ls = document.querySelector('.linescore');
    const r = ls ? ls.getBoundingClientRect() : null;
    return { w: r ? Math.round(r.width) : null, h: r ? Math.round(r.height) : null, rows: ls ? ls.querySelectorAll('tbody tr').length : null };
  });
  ok(d4.w >= 360 && d4.rows === 2, 'D4 · desktop: the box score keeps its wide one-table shape', JSON.stringify(d4));

  // D7 · the score-line sides law holds on desktop (away right, home left)
  const d7 = await page.evaluate(() => {
    const line = document.querySelector('.score-line');
    if (!line) return { noline: true };
    const lb = line.getBoundingClientRect();
    const a = line.querySelector('.sl-team:first-child .zpb-sl2name').getBoundingClientRect();
    const h = line.querySelector('.sl-team:last-child .zpb-sl2name').getBoundingClientRect();
    const c = lb.left + lb.width / 2;
    return { awayOff: Math.round((a.left + a.width / 2) - c), homeOff: Math.round((h.left + h.width / 2) - c) };
  });
  ok(d7.awayOff != null && d7.awayOff < -20 && d7.homeOff > 20, 'D7 · desktop: the names hold their own sides (away left, home right)', JSON.stringify(d7));

  // D5 · the desktop SB storm keeps the crest-beside-name row (w55 re-pin)
  const d5 = await page.evaluate(() => {
    const d = document.createElement('div');
    d.className = 'zpb-sbfin zpb-sbfin-in';
    d.innerHTML = '<div class="zpb-sbfin-stage"><div class="zpb-sbfin-champ"><span class="zpb-sbfin-crest">★</span><span class="zpb-sbfin-name">CHIEFS</span></div></div>';
    document.body.appendChild(d);
    const dir = getComputedStyle(d.querySelector('.zpb-sbfin-champ')).flexDirection;
    d.remove();
    return dir;
  });
  ok(d5 === 'row', 'D5 · desktop: the storm champion row is untouched (crest beside name)', d5);

  // run the season out + playoffs for the desktop bracket
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
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1200);

  // D6 · the desktop bracket tree is untouched (7 columns in the mirror order)
  const d6 = await page.evaluate(() => {
    const tree = document.querySelector('.zpb-tree');
    if (!tree) return { notree: true };
    const cols = [...tree.querySelectorAll(':scope > .zpb-tree-col')];
    if (cols.length !== 7) return { cols: cols.length };
    const disp = getComputedStyle(tree).display;
    const xs = cols.map(c => Math.round(c.getBoundingClientRect().left));
    const ascending = xs.every((x, i) => i === 0 || x > xs[i - 1]);
    const labels = cols.map(c => (c.querySelector('h6') || {}).textContent);
    const trnd = cols.map(c => c.className.includes('zpb-trnd-'));
    return { display: disp, ascending, labels, trndAll: trnd.every(Boolean) };
  });
  ok(d6.display === 'flex' && d6.ascending === true, 'D6 · desktop: the bracket keeps its 7-column mirrored tree', JSON.stringify(d6).slice(0, 300));
  ok(d6.trndAll === true, 'D6 · desktop: the round classes ride along inert', 'trndAll=' + d6.trndAll);

  ok(errors.length === 0, 'D8 · zero page errors at 1280px', errors.slice(0, 3).join(' | '));
  console.log(`\nw57_live: ${pass} pass · ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
