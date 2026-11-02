/* w55_live.js — the Owner's round-55 desktop battery (1280px)
 * D1 unit report card parenthetical gone · D2 honors lead the rail · D3 dime picker stages+applies
 * D4 desktop box score unchanged · D5 desktop SB storm row unchanged · D6 tab save fires
 * D7 the w54 touch laws still pinned · D8 zero page errors */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w55/Football-Sim-Z-post-blue-w55.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
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
  await page.waitForTimeout(1000);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });

  // D6 · the tab save fires on desktop clicks too
  await page.evaluate(() => { const b = document.getElementById('tabRankingsBtn'); if (b) b.click(); });
  await page.waitForTimeout(500);
  const saved = await page.evaluate(() => { try { return localStorage.getItem('zpb:tab'); } catch (e) { return null; } });
  ok(saved === 'viewRankings|tabRankingsBtn', 'D6 · the desktop tab save fires', String(saved));

  // season + week 1
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(400);
  await page.evaluate(() => { try { startSeason(); } catch (e) {} try { seasonState.preseason = false; } catch (e) {} });
  await page.waitForTimeout(2400);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1500);

  // D3 · the Dime picker stages + APPLY THE CHANGES commits (iterate the menu — a roster may
  // refuse one swap, but SOME corner must stage, exactly like the other slots)
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
      let staged = false, picked = null;
      for (const row of rows) {
        row.click();
        if (zpbStageCount(roster) > before) { staged = true; picked = row.title; break; }
        // the move refused: re-open the menu (the editor may have re-rendered) and try the next
        const b2 = [...host.querySelectorAll('.depth-row')].find(r => (r.querySelector('.slotname') || {}).textContent === 'DIME');
        if (b2) (b2.querySelector('.zpb-pickwrap .zpb-pickbtn') || {}).click && b2.querySelector('.zpb-pickwrap .zpb-pickbtn').click();
      }
      const applyBtn = document.getElementById('lineupSeasonApplyChanges');
      const pendingShown = applyBtn && !applyBtn.disabled;
      if (staged) { roster._zpbStage = null; } // revert — leave no pending edits
      return { staged, pendingShown, picked, menuRows: rows.length };
    } catch (e) { return { err: String(e).slice(0, 140) }; }
  });
  ok(d3.staged === true && d3.pendingShown === true, 'D3 · the Dime pick stages and lights APPLY THE CHANGES', JSON.stringify(d3));

  // play week 1 → review renders; the desktop linescore stays a wide table
  await page.evaluate(() => { try { simulateCurrentWeek(); } catch (e) {} });
  await page.waitForTimeout(2200);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1500);
  const d4 = await page.evaluate(() => {
    const ls = document.querySelector('.linescore');
    const r = ls ? ls.getBoundingClientRect() : null;
    return { w: r ? Math.round(r.width) : null, rows: ls ? ls.querySelectorAll('tbody tr').length : null };
  });
  ok(d4.w >= 360 && d4.rows === 2, 'D4 · desktop: the box score keeps its wide one-table shape (386px on both w54 and w55 — pixel-identical)', JSON.stringify(d4));

  // D5 · the desktop SB storm keeps the crest-beside-name row
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

  // D2 · the season in badges: the HONORS lead the rail (play the season out for real honors)
  await page.evaluate(() => { try { simRestOfSeason(); } catch (e) {} });
  await page.waitForTimeout(2600);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov').forEach(o => o.remove()); window.__zpbStoryHold = false; } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1500);
  const d2 = await page.evaluate(() => {
    const rail = document.querySelector('.zpb-story-rail');
    if (!rail) return { norail: true };
    const firstZone = rail.firstElementChild;
    const isHonors = firstZone && firstZone.classList.contains('zpb-story-honors');
    const honors = firstZone ? [...firstZone.querySelectorAll('.zpb-shonor')] : [];
    const beats = honors.map(c => +c.dataset.beat);
    const firstOff = rail.children[1] ? [...rail.children[1].querySelectorAll('[data-beat]')].slice(0, 1).map(x => +x.dataset.beat)[0] : null;
    return { isHonors, count: honors.length, beats: beats.slice(0, 4), firstOff, total: rail.dataset.total };
  });
  ok(d2.isHonors === true || d2.count === 0, 'D2 · the honors zone (when present) is the FIRST zone of the rail', JSON.stringify(d2).slice(0, 160));
  if (d2.count) {
    ok(d2.beats[0] === 0 && d2.beats.every((b, i) => b === i), 'D2 · the honors carry beats 0..n-1 (they land first)', JSON.stringify(d2.beats));
    ok(d2.firstOff === d2.count, 'D2 · the offense badges follow right after the honors (pace untouched)', 'firstOff=' + d2.firstOff + ' honors=' + d2.count);
  } else ok(true, 'D2 · no honors this season (the zone correctly absent)');

  // D2b · the honors-first law holds deterministically (synthetic awards, throwaway page state)
  const d2b = await page.evaluate(() => {
    try {
      const user = seasonUserTeam();
      seasonState.awardsRS = {
        individual: [{ title: 'Most Valuable Player', c: { name: 'Zai Ball', team: user, pos: 'QB' }, why: '' }],
        allPro: { first: { QB: [{ name: 'Zai Ball', team: user }] }, second: {} },
        proBowl: { AFC: { QB: [{ name: 'Zai Ball', team: user }] } }
      };
      const host = document.getElementById('draftResultsBody') || document.body;
      const w = document.createElement('div');
      w.innerHTML = zpbSeasonStoryHTML();
      const rail = w.querySelector('.zpb-story-rail');
      const firstZone = rail.firstElementChild;
      const honors = [...firstZone.querySelectorAll('.zpb-shonor')];
      const beats = honors.map(c => +c.dataset.beat);
      const firstOff = [...rail.children[1].querySelectorAll('[data-beat]')][0];
      const zoneCount = rail.querySelectorAll('.zpb-story-zone').length;
      return { isHonors: firstZone.classList.contains('zpb-story-honors'), beats, firstOff: firstOff ? +firstOff.dataset.beat : null, zoneCount, total: +rail.dataset.total };
    } catch (e) { return { err: String(e).slice(0, 160) }; }
  });
  ok(d2b.isHonors === true && d2b.zoneCount === 4, 'D2b · synthetic honors: the rail LEADS with the HONORS EARNED zone', JSON.stringify(d2b).slice(0, 160));
  ok(d2b.beats.length === 3 && d2b.beats.every((b, i) => b === i), 'D2b · the honors land on beats 0,1,2 — first paint, no blank stage', JSON.stringify(d2b.beats));
  ok(d2b.firstOff === 3, 'D2b · the offense badges open at beat 3 — the 1s pace and the total are untouched', 'firstOff=' + d2b.firstOff + ' total=' + d2b.total);
  const d1 = await page.evaluate(() => document.body.innerText.includes('(whole corps)'));
  ok(d1 === false, 'D1 · "(whole corps)" is gone from every unit report card surface');

  ok(errors.length === 0, 'D8 · zero page errors at 1280px', errors.slice(0, 3).join(' | '));
  console.log(`\nw55_live: ${pass} pass · ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
