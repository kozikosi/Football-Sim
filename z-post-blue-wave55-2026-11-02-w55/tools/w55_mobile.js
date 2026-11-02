/* w55_mobile.js — the Owner's round-55 phone battery (390px + 320px)
 * M1 draft card two lines · M2 tab persistence · M3 preview/review no pan · M4 box score one table
 * M5 stars one per line + no bunching · M6 SB name centered · M7 dime picker · M8 zero page errors */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w55/Football-Sim-Z-post-blue-w55.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const errors = [];

  // ================= 390px phone =================
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.on('pageerror', e => errors.push(String(e).slice(0, 140)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  // ---- M2 · the tab you leave is the tab you get back ----
  await page.evaluate(() => { const b = document.getElementById('tabGuideBtn'); if (b) b.click(); });
  await page.waitForTimeout(600);
  const saved = await page.evaluate(() => { try { return localStorage.getItem('zpb:tab'); } catch (e) { return null; } });
  ok(saved === 'viewGuide|tabGuideBtn', 'M2 · setActiveTab remembers the tab (zpb:tab)', String(saved));
  await page.reload(); await page.waitForTimeout(1200);
  const restored = await page.evaluate(() => ({ guide: document.getElementById('viewGuide') && document.getElementById('viewGuide').classList.contains('active'), btn: document.getElementById('tabGuideBtn') && document.getElementById('tabGuideBtn').classList.contains('active') }));
  ok(restored.guide && restored.btn, 'M2 · after a refresh the GUIDE tab is live again', JSON.stringify(restored));

  // ---- the draft: board card reads in two lines ----
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(500);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); });
  await page.waitForTimeout(1600);
  const m1 = await page.evaluate(() => {
    const tr = document.querySelector('#draftTable2 tbody tr');
    if (!tr) return { none: true };
    const h = tr.getBoundingClientRect().height;
    const labels = [...tr.querySelectorAll('td[data-label]')].filter(td => getComputedStyle(td, '::before').display !== 'none').length;
    const rows = new Set([...tr.querySelectorAll('td')].map(td => getComputedStyle(td).gridRow)).size;
    return { h: Math.round(h), labels, gridRows: rows, trs: document.querySelectorAll('#draftTable2 tbody tr').length };
  });
  ok(!m1.none && m1.h <= 84, 'M1 · the phone draft card is two lines (≤84px)', JSON.stringify(m1));
  ok(!m1.none && m1.labels === 0, 'M1 · the mini field labels retire on the phone card', 'labels=' + m1.labels);
  await page.screenshot({ path: '/home/z/my-project/w55/shots/w55-m-draft.png' });

  // finish the draft
  await page.evaluate(() => { const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } });
    if (done) break;
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });

  // ---- season: week 1 preview ----
  await page.evaluate(() => { try { startSeason(); } catch (e) {} try { seasonState.preseason = false; } catch (e) {} });
  await page.waitForTimeout(2500);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1600);
  const m3 = await page.evaluate(() => ({ docOver: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
  ok(m3.docOver <= 0, 'M3 · 390px: the game PREVIEW page never pans', 'docOver=' + m3.docOver);
  const m5 = await page.evaluate(() => {
    const row = document.querySelector('.zpb-pvfrow');
    if (!row) return { none: true };
    const cards = [...row.querySelectorAll(':scope > .zpb-pvcard')];
    const cw = row.getBoundingClientRect().width;
    const stacked = cards.length < 2 || Math.abs(cards[0].getBoundingClientRect().width - cw) < 4;
    let bunch = false;
    cards.forEach(c => {
      const rt = c.querySelector('.zpb-pcard-rt'), chip = c.querySelector('.zpb-poschip');
      if (!rt || !chip) return;
      const rb = rt.getBoundingClientRect(), cb = chip.getBoundingClientRect();
      if (!(rb.left >= cb.right - 2 || rb.right <= cb.left + 2 || rb.top >= cb.bottom || rb.bottom <= cb.top)) bunch = true;
    });
    return { cards: cards.length, stacked, bunch };
  });
  ok(!m5.none && m5.stacked, 'M5 · 390px: the stars face off ONE per line', JSON.stringify(m5));
  ok(!m5.none && !m5.bunch, 'M5 · 390px: no rating touches a position badge', JSON.stringify(m5));
  await page.evaluate(() => { const s = document.querySelector('.zpb-strip') || document.querySelector('.zpb-mu'); if (s) s.scrollIntoView({ block: 'start' }); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/z/my-project/w55/shots/w55-m-preview.png' });

  // ---- play the week: review + box score ----
  await page.evaluate(() => { try { simulateCurrentWeek(); } catch (e) {} });
  await page.waitForTimeout(2200);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1500);
  const m4 = await page.evaluate(() => {
    const ls = document.querySelector('.linescore');
    if (!ls) return { none: true };
    const cs = getComputedStyle(ls);
    const r = ls.getBoundingClientRect();
    const teamRows = ls.querySelectorAll('tbody tr').length;
    const firstCells = ls.querySelector('tbody tr') ? ls.querySelector('tbody tr').cells.length : 0;
    const kv = ls.parentElement ? Math.round(ls.parentElement.getBoundingClientRect().width) : 0;
    return { display: cs.display, w: Math.round(r.width), h: Math.round(r.height), teamRows, firstCells, parentW: kv, fits: r.width <= kv + 1 };
  });
  ok(!m4.none && m4.display === 'table' && m4.teamRows === 2 && m4.firstCells >= 6, 'M4 · 390px: the box score is ONE table (2 team rows, quarters across)', JSON.stringify(m4));
  ok(!m4.none && m4.fits, 'M4 · 390px: the linescore fits its panel', JSON.stringify(m4));
  const m3r = await page.evaluate(() => ({ docOver: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
  ok(m3r.docOver <= 0, 'M3 · 390px: the game REVIEW page never pans', 'docOver=' + m3r.docOver);
  // key players on the review: name leads, no mid-word breaks
  const m5b = await page.evaluate(() => {
    const c = document.querySelector('.kp-grid .zpb-pvcard');
    if (!c) return { none: true };
    const b = c.querySelector('.zpb-pcard-hd b');
    const rb = b.getBoundingClientRect(), cb = c.getBoundingClientRect();
    return { oneLine: rb.height < (parseFloat(getComputedStyle(b).fontSize) * 1.8), nameW: Math.round(rb.width), cardW: Math.round(cb.width) };
  });
  ok(!m5b.none && m5b.oneLine, 'M5 · 390px: review key-player names stay on one line', JSON.stringify(m5b));
  await page.evaluate(() => { const g = document.querySelector('#zpbGameReviewNow'); if (g) g.scrollIntoView({ block: 'start' }); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/z/my-project/w55/shots/w55-m-boxscore.png' });

  // ---- M7 · the Dime picker (the season lineup panel — the slots' selects are replaced by
  // zpbPickList wrappers, so the DIME row must carry the SAME wrapper as every sibling) ----
  const m7 = await page.evaluate(() => {
    try {
      const roster = draftSim && draftSim.rosters && draftSim.rosters.find(r=>r.isUser);
      const host = document.getElementById('lineupSeason');
      if (!host) return { nohost: true };
      if (!roster) return { noroster: true };
      const rowOf = name => [...host.querySelectorAll('.depth-row')].find(r => (r.querySelector('.slotname') || {}).textContent === name);
      const dime = rowOf('DIME'), nickel = rowOf('CB3') || rowOf('NICKEL');
      if (!dime) return { norow: true };
      const dp = dime.querySelector('.zpb-pickwrap .zpb-pickbtn');
      const np = nickel && nickel.querySelector('.zpb-pickwrap .zpb-pickbtn');
      if (!dp || !np) return { nopicker: true, hasDime: !!dp, hasNickel: !!np };
      const before = (typeof zpbStageCount === 'function') ? zpbStageCount(roster) : -1;
      // stage a real move through the SAME component the other slots use: open the menu, pick a row
      dp.click();
      const menu = dime.querySelector('.zpb-pickmenu');
      const rows = menu ? [...menu.querySelectorAll('.zpb-pickrow')] : [];
      let staged = false;
      if (rows.length) { rows[rows.length - 1].click(); staged = zpbStageCount(roster) > before; }
      if (staged) roster._zpbStage = null; // the battery leaves no pending edits
      return { present: true, rows: rows.length, staged, sameShape: !!(dime.querySelector('.zpb-pickwrap') && nickel.querySelector('.zpb-pickwrap')) };
    } catch (e) { return { err: String(e).slice(0, 140) }; }
  });
  ok(m7.present && m7.sameShape, 'M7 · the DIME row carries the SAME picker as every slot', JSON.stringify(m7));
  ok(m7.staged === true, 'M7 · a DIME pick stages a real move (APPLY/UNDO rules apply)', JSON.stringify(m7));

  // ---- M6 · the SB champion name centers (the storm markup, the real CSS law) ----
  const m6 = await page.evaluate(() => {
    const d = document.createElement('div');
    d.className = 'zpb-sbfin zpb-sbfin-in';
    d.innerHTML = '<div class="zpb-sbfin-stage"><div class="zpb-sbfin-champ"><span class="zpb-sbfin-crest">★</span><span class="zpb-sbfin-name">TAMPA BAY BUCCANEERS</span></div></div>';
    document.body.appendChild(d);
    const st = d.querySelector('.zpb-sbfin-stage').getBoundingClientRect();
    const nm = d.querySelector('.zpb-sbfin-name').getBoundingClientRect();
    const chip = d.querySelector('.zpb-sbfin-champ').getBoundingClientRect();
    const off = Math.abs((nm.left + nm.width / 2) - (st.left + st.width / 2));
    const stacked = chip.height > nm.height + 20; // the crest sits ABOVE the name
    d.remove();
    return { off: Math.round(off * 10) / 10, stacked };
  });
  ok(m6.off <= 4, 'M6 · 390px: the champion wordmark centers in the storm stage', JSON.stringify(m6));
  ok(m6.stacked, 'M6 · 390px: crest above name (the stack law)', JSON.stringify(m6));

  ok(errors.length === 0, 'M8 · zero page errors at 390px', errors.slice(0, 3).join(' | '));
  await page.close();

  // ================= 320px narrow phone =================
  const p2 = await browser.newPage({ viewport: { width: 320, height: 700 } });
  p2.on('pageerror', e => errors.push('320: ' + String(e).slice(0, 120)));
  await p2.goto(FILE); await p2.waitForTimeout(900);
  const n0 = await p2.evaluate(() => ({ docOver: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
  ok(n0.docOver <= 0, 'N1 · 320px: the home page never pans', 'docOver=' + n0.docOver);
  // preview + review need a season; reuse quick draft
  await p2.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await p2.waitForTimeout(900);
  await p2.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await p2.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await p2.waitForTimeout(400); }
  await p2.waitForTimeout(1000);
  for (let i = 0; i < 16; i++) { const fin = await p2.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await p2.waitForTimeout(400); }
  await p2.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await p2.evaluate(() => { try { startSeason(); } catch (e) {} try { seasonState.preseason = false; } catch (e) {} });
  await p2.waitForTimeout(2200);
  await p2.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await p2.waitForTimeout(1500);
  const n1 = await p2.evaluate(() => ({ docOver: document.documentElement.scrollWidth - document.documentElement.clientWidth, stripFits: (() => { const s = document.querySelector('.zpb-strip'); if (!s) return true; return s.getBoundingClientRect().width <= s.parentElement.clientWidth + 1; })() }));
  ok(n1.docOver <= 0, 'N1 · 320px: the PREVIEW page never pans', JSON.stringify(n1));
  ok(n1.stripFits, 'N1 · 320px: the preview strip fits (no inner scroll)');
  await p2.evaluate(() => { try { simulateCurrentWeek(); } catch (e) {} });
  await p2.waitForTimeout(2000);
  await p2.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await p2.waitForTimeout(1400);
  const n2 = await p2.evaluate(() => {
    const ls = document.querySelector('.linescore');
    return { docOver: document.documentElement.scrollWidth - document.documentElement.clientWidth, ls: ls ? { w: Math.round(ls.getBoundingClientRect().width), parent: Math.round(ls.parentElement.clientWidth) } : null };
  });
  ok(n2.docOver <= 0, 'N1 · 320px: the REVIEW page never pans', 'docOver=' + n2.docOver);
  ok(n2.ls && n2.ls.w <= n2.ls.parent + 1, 'N1 · 320px: the box score table fits', JSON.stringify(n2.ls));
  await p2.close();

  ok(errors.length === 0, 'M8 · zero page errors overall', errors.slice(0, 3).join(' | '));
  console.log(`\nw55_mobile: ${pass} pass · ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
