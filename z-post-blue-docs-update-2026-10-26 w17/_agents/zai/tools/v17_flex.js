// Z-post-blue v17 verification: position board, flex chart v3, Dime in every depth chart, engine pinned
const { chromium } = require('playwright');
const FILE = 'file:///home/z/my-project/build_w17.html';
const OUT = '/home/z/my-project/w17ref/evidence';
const fails = [];
const ok = (name, cond, extra = '') => { console.log(`[${cond ? 'ok' : 'FAIL'}] ${name}${extra ? ' — ' + extra : ''}`); if (!cond) fails.push(name); };
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
  page.on('pageerror', e => errors.push('pageerror: ' + String(e).slice(0, 200)));
  await page.goto(FILE); await sleep(1500);

  // 1. engine byte-truth: the sim math did not move
  const eng = await page.evaluate(() => ({
    slots: ROSTER_SLOTS.length,
    groupsHasCB4: DEPTH_CHART_GROUPS.some(([, , sl]) => sl.includes('CB4')),
    qbRB: flexPenaltyFor('QB', 'RB1'), rbFB: flexPenaltyFor('HB', 'FB'),
    teRB: flexPenaltyFor('TE', 'RB2'), ssCB: flexPenaltyFor('SS', 'CB1'),
    kP: flexPenaltyFor('K', 'P'), pK: flexPenaltyFor('P', 'K')
  }));
  ok('engine: 28 slots (Dime not in ROSTER_SLOTS)', eng.slots === 28, String(eng.slots));
  ok('engine: DEPTH_CHART_GROUPS unchanged (lineup engine untouched)', eng.groupsHasCB4 === false);
  ok('engine: QB->RB still 6', eng.qbRB === 6);
  ok('engine: RB->FB still natural 0', eng.rbFB === 0);
  ok('engine: TE->RB still 4', eng.teRB === 4);
  ok('engine: SS->CB still 4', eng.ssCB === 4);
  ok('engine: K<->P still free', eng.kP === 0 && eng.pK === 0);

  // 2. the Guide board + guide extras (checked while the Guide tab is live)
  await page.evaluate("document.getElementById('tabGuideBtn').click()"); await sleep(1300);
  const board = await page.evaluate(() => {
    const b = document.querySelector('.zpb-posboard');
    if (!b) return null;
    const cats = [...b.querySelectorAll('.zpb-poscat-h')].map(h => h.textContent.trim());
    const cards = [...b.querySelectorAll('.zpb-poscard')].map(c => ({
      name: c.querySelector('.zpb-posname').textContent.trim(),
      chips: [...c.querySelectorAll('.zpb-ftchip')].map(x => x.textContent.replace(/\s+/g, ' ').trim()),
      tip: c.querySelector('.zpb-postip').textContent.trim(),
      focusable: c.getAttribute('tabindex') === '0'
    }));
    return { cats, cards, nCats: cats.length, nCards: cards.length };
  });
  ok('board renders', !!board);
  ok('8 categories with the Owner three first', board && board.cats.join('|') === 'DEFENDS THE PASS|PRESSURES THE QB|STOPS THE RUN|MOVES THE OFFENSE|RUNS THE BALL|CATCHES PASSES|PROTECTS THE PASSER|THE KICKING GAME', board && board.cats.join(' | '));
  ok('18 position cards incl. Nickel / Dime', board && board.nCards === 18 && board.cards.some(c => c.name === 'Nickel / Dime'), board && `${board.nCards} cards`);
  ok('cards are focusable (tap/keyboard tooltips)', board && board.cards.every(c => c.focusable));
  const byName = {}; (board ? board.cards : []).forEach(c => byName[c.name] = c);
  const want = {
    'Quarterback': ['−6 · WR, S'],
    'Running Back': ['−2 · FB', '−4 · WR', '−6 · TE'],
    'Fullback': ['−4 · RB, TE'],
    'Wide Receiver': ['−4 · RB, TE, S, Nickel, Dime', '−6 · CB'],
    'Tight End': ['−2 · WR, FB', '−6 · RB, C, OG, OT, DE, DT, LB, S, Nickel, Dime'],
    'Offensive Tackle': ['FREE · OG, C', '−4 · DT, FB'],
    'Offensive Guard': ['FREE · C', '−4 · OT, DT, FB'],
    'Center': ['FREE · OG', '−4 · OT, DT, FB'],
    'Defensive Tackle': ['−4 · OG, C, DE, FB', '−6 · OT'],
    'Defensive Edge': ['−2 · DT, WILL, SAM, OLB', '−4 · MIKE, ILB, FB', '−6 · TE, RB, Nickel'],
    'MIKE / ILB': ['FREE · ILB, WILL, SAM, OLB', '−4 · DT, FB', '−6 · DE, TE, S, Nickel, Dime'],
    'WILL / SAM / OLB': ['FREE · OLB, WILL, SAM', '−2 · MIKE', '−4 · DE, Nickel', '−6 · DT, TE, S, FB, Dime'],
    'Strong Safety': ['FREE · Nickel, Dime', '−2 · FS', '−4 · WILL, SAM, OLB', '−6 · CB, MIKE, WR, TE, RB, FB'],
    'Free Safety': ['FREE · Nickel, Dime', '−2 · SS', '−4 · CB, WR'],
    'Cornerback': ['FREE · FS, Nickel, Dime', '−2 · SS', '−4 · WR'],
    'Nickel / Dime': ['FREE · CB, SS, FS'],
    'Kicker': ['FREE · P'],
    'Punter': ['−2 · K']
  };
  let chipOk = true;
  Object.keys(want).forEach(k => {
    const got = byName[k] ? byName[k].chips : null;
    if (JSON.stringify(got) !== JSON.stringify(want[k])) { chipOk = false; console.log('   mismatch', k, JSON.stringify(got)); }
  });
  ok('every card reads the Owner chart v3 verbatim (RB −6 TE · DE FB restored · P −2 K · Nickel/Dime in)', chipOk);
  const dimeTip = byName['Nickel / Dime'] ? byName['Nickel / Dime'].tip : '';
  ok('Dime tooltip carries the Owner sentence', dimeTip.includes('10% of the snaps') && dimeTip.includes('preventing Hail Marys'), dimeTip.slice(0, 80) + '…');
  const tipHidden = await page.evaluate(() => getComputedStyle(document.querySelector('.zpb-postip')).opacity);
  ok('no sentences visible on the board (tooltip hidden by default)', tipHidden === '0', 'opacity ' + tipHidden);
  await page.evaluate("document.querySelector('.zpb-posboard').scrollIntoView()"); await sleep(400);
  await page.hover('.zpb-poscard'); await sleep(400);
  const tipShown = await page.evaluate(() => getComputedStyle(document.querySelector('.zpb-poscard:hover .zpb-postip')).opacity);
  ok('hover reveals the tooltip', tipShown === '1', 'opacity ' + tipShown);
  await page.evaluate("document.querySelector('.zpb-posboard').scrollIntoView()"); await sleep(300);
  await page.screenshot({ path: OUT + '/w17-board-top.png' });
  await page.evaluate("window.scrollBy(0, 620)"); await sleep(300);
  await page.screenshot({ path: OUT + '/w17-board-desktop.png' });
  const guideExtras = await page.evaluate("(() => { const g = document.body.innerHTML; return { gloss: g.includes('<li><b>Dime</b> — plays around 10% of the snaps'), mapChip: [...document.querySelectorAll('.zpb-fm i')].some(i => i.textContent.trim() === 'DIME'), legend: [...document.querySelectorAll('.zpb-fm-legend span')].some(sp => /DIME/.test(sp.textContent)), intro: g.includes('The full chart, position by position:') }; })()");
  ok('glossary carries the Owner Dime sentence', guideExtras.gloss);
  ok('field map has the DIME station', guideExtras.mapChip);
  ok('field map legend explains DIME', guideExtras.legend);
  ok('flex intro now reads "The full chart, position by position:"', guideExtras.intro);

  // 3. Dime in the depth charts — draft sidebar + sim to end + Your Roster
  await page.evaluate("document.getElementById('tabDraftBtn').click()"); await sleep(600);
  await page.evaluate("document.getElementById('startDraftBtn').click()"); await sleep(900);
  const sidebarDime = await page.evaluate("(() => { const rows = [...document.querySelectorAll('#draftRosterList .depth-row.zpb-dimerow')]; return { n: rows.length, label: rows[0] ? rows[0].querySelector('.slotname').textContent.trim() : null, txt: rows[0] ? rows[0].textContent.replace(/\\s+/g,' ').trim() : null }; })()");
  ok('draft-sidebar depth panel shows the Dime row', sidebarDime.n === 1 && sidebarDime.label === 'Dime', JSON.stringify(sidebarDime));
  await page.evaluate("typeof simToEnd==='function' ? simToEnd() : document.querySelectorAll('.speedbtn')[1] && document.querySelectorAll('.speedbtn')[1].click()"); await sleep(4000);
  const doneInfo = await page.evaluate("(() => ({ awaiting: !!(draftSim && draftSim.awaitingUser), slots: draftSim ? Object.keys(draftSim.rosters[draftSim.userIndex].slots).filter(k=>draftSim.rosters[draftSim.userIndex].slots[k]).length : -1 }))()");
  ok('draft completed (sim to end)', doneInfo.awaiting === false && doneInfo.slots === 28, JSON.stringify(doneInfo));
  const cbs = await page.evaluate("(() => { const r = draftSim.rosters[draftSim.userIndex].slots; const cbs = Object.values(r).filter(p=>p&&p[1]==='CB').sort((a,b)=>b[3]-a[3]); return { n: cbs.length, fourth: cbs[3] ? cbs[3][0] : null }; })()");
  await page.evaluate("[...document.querySelectorAll('.tabbtn')].find(b=>/YOUR ROSTER/i.test(b.textContent)).click()"); await sleep(1200);
  const rosterDime = await page.evaluate("(() => { const rows = [...document.querySelectorAll('.depth-row.zpb-dimerow')]; return rows.map(r => r.textContent.replace(/\\s+/g,' ').trim()); })()");
  ok('Your Full Depth Chart shows the Dime row', rosterDime.length >= 1, JSON.stringify(rosterDime));
  if (cbs.n >= 4) ok('Dime row names the roster\'s 4th CB (' + cbs.fourth + ')', rosterDime.some(t => t.includes(cbs.fourth)));
  else ok('roster has <4 CBs — Dime row honest em-dash', rosterDime.every(t => t.includes('—')), JSON.stringify(cbs));

  // 4. grade table still 28 math rows (Dime stays out of the math)
  const gradeRows = await page.evaluate("(() => { const t = [...document.querySelectorAll('table')].find(t => [...t.querySelectorAll('th')].some(th => /Effective OVR/i.test(th.textContent))); return t ? t.querySelectorAll('tbody tr').length : -1; })()");
  ok('grade table still 28 rows (no math change)', gradeRows === 28, String(gradeRows));

  // 5. TEAM COMPARISON: real dimebacks in the Dime cells
  await page.evaluate("document.getElementById('tabCompareBtn').click()"); await sleep(1300);
  const luDime = await page.evaluate("(() => { const rows = [...document.querySelectorAll('.zpb-lu-row')].filter(r => { const c = r.querySelector('.zpb-lu-c'); return c && c.textContent.trim() === 'Dime'; }); return rows.map(r => [...r.querySelectorAll('.zpb-lu-cell')].map(c => c.textContent.trim())); })()");
  ok('lineup comparison renders the Dime row', luDime.length >= 1, JSON.stringify(luDime));
  ok('real teams show their real dimebacks (not em-dash)', luDime.length >= 1 && luDime[0].every(t => t !== '—'), JSON.stringify(luDime[0]));
  const luShot = await page.evaluate("(() => { const el = document.querySelector('.zpb-lu'); if(!el) return false; el.scrollIntoView({block:'center'}); return true; })()");
  if (luShot) { await sleep(400); await page.screenshot({ path: OUT + '/w17-comparison-dime.png' }); }

  // 6. mobile pass
  const mob = await browser.newPage({ viewport: { width: 390, height: 844 }, is_mobile: true, has_touch: true });
  mob.on('pageerror', e => errors.push('mobile pageerror: ' + String(e).slice(0, 200)));
  await mob.goto(FILE); await sleep(1500);
  await mob.evaluate("document.getElementById('tabGuideBtn').click()"); await sleep(1200);
  await mob.evaluate("document.querySelector('.zpb-posboard').scrollIntoView()"); await sleep(500);
  await mob.screenshot({ path: OUT + '/w17-board-mobile.png' });
  await mob.evaluate("window.scrollBy(0, 900)"); await sleep(500);
  await mob.screenshot({ path: OUT + '/w17-board-mobile2.png' });
  const mobCards = await mob.evaluate("(() => { const cards = [...document.querySelectorAll('.zpb-poscard')]; const over = cards.filter(c => c.getBoundingClientRect().right > window.innerWidth + 1); return { n: cards.length, overflow: over.length }; })()");
  ok('mobile: 18 cards, none overflow the viewport', mobCards.n === 18 && mobCards.overflow === 0, JSON.stringify(mobCards));

  ok('zero console errors', errors.length === 0, errors.join(' ; '));
  await browser.close();
  if (fails.length) { console.log('SUITE FAILED: ' + fails.length); process.exit(1); }
  console.log('SUITE PASSED: board live, Dime visual everywhere, engine pinned');
})();
