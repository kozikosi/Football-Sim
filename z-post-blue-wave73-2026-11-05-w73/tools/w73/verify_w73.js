/* verify_w73.js — the wave 73 battery, live on the built bytes.
   V1 · the positions dropdown reads the depth chart (each group once — TE, never TE2/TE3) and still filters.
   V2 · the chip row state machine: full → solo → full · CLEAR → solo → CLEAR · mixed toggles.
   V3 · ALL and CLEAR sit apart and read as a different shape; the cascade behind them is untouched.
   V4 · THE FIX-IT BOARD renders on the season review — rooms, cards, grades, foot — no page errors.
   V5 · the phone laws hold at 390px (no side scroll on the new panel; chips wrap clean). */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file://' + require('path').resolve(__dirname, '../../Football-Sim-Z-post-blue-w73.html');
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SH = '/tmp/w73shots';
require('fs').mkdirSync(SH, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
const J = v => JSON.stringify([].concat(v).sort());
let page;
const closeOv = () => page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin,.zpb-restov,.zpb-replay-ov,.zpb-prematch,.zpb-sbfin,.zpb-porun,.zpb-victory,.zpb-ss-ov,.zpb-caution').forEach(f => f.remove()); } catch (e) {} });

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  let pageErrs = [];
  page.on('pageerror', e => pageErrs.push(e.message));
  await page.goto(FILE); await page.waitForTimeout(500);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);

  // boot the draft as the Steelers, live (on the clock) for the board probes
  await page.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    if (s) { s.value = 'Pittsburgh Steelers'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    document.getElementById('startDraftBtn').click();
  });
  await page.waitForTimeout(1500); await closeOv();

  // ============ V1 · the dropdown order + filter ============
  console.log('== V1 · the positions dropdown reads the depth chart ==');
  const v1 = await page.evaluate(() => Array.from(document.getElementById('draftPosFilter2').options).map(o => o.value));
  const WANT = ['all', 'QB', 'RB', 'WR', 'TE', 'OT', 'OG', 'C', 'EDGE', 'DT', 'LB', 'CB', 'FS', 'SS', 'K'];
  ok(JSON.stringify(v1) === JSON.stringify(WANT), 'V1 dropdown order = depth chart, TE once', v1.join(' '));
  const v1t = await page.evaluate(() => Array.from(document.getElementById('draftPosFilter2').options).map(o => o.textContent));
  ok(!v1t.some(t => /TE[23]/.test(t)), 'V1 no TE2/TE3 in the dropdown', v1t.join(' | '));
  // the filter still drives the board (live draft, cards view)
  await page.evaluate(() => { const dv = document.getElementById('draftView2'); dv.value = 'cards'; dv.dispatchEvent(new Event('change', { bubbles: true })); });
  await page.waitForTimeout(250);
  const counts = await page.evaluate(() => {
    const set = v => { const pf = document.getElementById('draftPosFilter2'); pf.value = v; pf.dispatchEvent(new Event('change', { bubbles: true })); };
    const n = () => { const c = document.getElementById('draftCards'); return c && c.style.display !== 'none' ? c.querySelectorAll('.pcard').length : -1; };
    set('all'); const a = n();
    set('QB'); const q = n();
    set('all'); const a2 = n();
    const dv = document.getElementById('draftView2'); dv.value = 'table'; dv.dispatchEvent(new Event('change', { bubbles: true }));
    return { a, q, a2 };
  });
  ok(counts.q > 0 && counts.q <= counts.a && counts.a2 === counts.a, 'V1 the dropdown filter still narrows the board', JSON.stringify(counts));

  // ============ V2 · the chip row state machine ============
  console.log('== V2 · the chip row state machine ==');
  const onList = async () => (await page.evaluate(() => Array.from(document.querySelectorAll('#draftChips .zpb-srbtn[data-tog]')).filter(b => b.classList.contains('on')).map(b => b.dataset.tog)));
  const clickChip = g => page.evaluate(g => { document.querySelector('#draftChips .zpb-srbtn[data-tog="' + g + '"]').click(); }, g);
  const clickBtn = sel => page.evaluate(sel => { document.querySelector(sel).click(); }, sel);

  ok((await onList()).length === 14, 'V2 initial board fully lit (the good part the Owner kept)', (await onList()).length + ' on');
  await clickChip('QB');
  ok(J(await onList()) === J(['QB']), 'V2 full → click QB → only QB lit', JSON.stringify(await onList()));
  await clickChip('QB');
  ok((await onList()).length === 14, 'V2 re-click QB → whole board lights back up', (await onList()).length + ' on');
  await clickBtn('#draftChips [data-none]');
  ok((await onList()).length === 0, 'V2 CLEAR leaves the board dark', JSON.stringify(await onList()));
  await clickChip('TE');
  ok(J(await onList()) === J(['TE']), 'V2 CLEAR → click TE → only TE lit', JSON.stringify(await onList()));
  await clickChip('TE');
  ok((await onList()).length === 0, 'V2 re-click TE → the row returns to CLEAR (the Owner\u2019s ideal path)', JSON.stringify(await onList()));
  await clickChip('EDGE');
  ok(J(await onList()) === J(['EDGE']), 'V2 dark board → click EDGE → only EDGE lit', JSON.stringify(await onList()));
  await clickChip('WR');
  ok(J(await onList()) === J(['EDGE', 'WR']), 'V2 solo then a second group → both lit (toggle world)', JSON.stringify(await onList()));
  await clickChip('WR');
  ok(J(await onList()) === J(['EDGE']), 'V2 toggle back off in the mixed world', JSON.stringify(await onList()));
  await clickBtn('#draftChips [data-all]');
  ok((await onList()).length === 14, 'V2 ALL lights everything again', (await onList()).length + ' on');

  // ============ V3 · ALL and CLEAR read different ============
  console.log('== V3 · ALL and CLEAR sit apart and reshape ==');
  const v3 = await page.evaluate(() => {
    const all = document.querySelector('#draftChips [data-all]'), clr = document.querySelector('#draftChips [data-none]');
    const firstChip = document.querySelector('#draftChips .zpb-srbtn[data-tog]');
    const lastChip = Array.from(document.querySelectorAll('#draftChips .zpb-srbtn[data-tog]')).pop();
    const cs = getComputedStyle(all), csf = getComputedStyle(firstChip);
    const grade = document.createElement('div'); grade.className = 'zpb-rc-grade'; document.body.appendChild(grade);
    const gfs = getComputedStyle(grade).fontSize; grade.remove();
    const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const brk = document.querySelector('#draftChips .zpb-fx-brk');
    return {
      radiusUtil: cs.borderRadius, radiusChip: csf.borderRadius,
      bgUtil: cs.backgroundColor, bgChip: csf.backgroundColor,
      ownLine: all.getBoundingClientRect().top > lastChip.getBoundingClientRect().top + 2,
      gapBetween: clr.getBoundingClientRect().left - (all.getBoundingClientRect().left + all.getBoundingClientRect().width),
      rcGradeOk: Math.abs(parseFloat(gfs) - 1.5 * rootPx) < 0.6,
      brkPresent: !!brk
    };
  });
  ok(v3.radiusUtil === '999px' && v3.radiusChip !== '999px', 'V3 the utils are pills, the chips are not', v3.radiusUtil + ' vs ' + v3.radiusChip);
  ok(v3.bgUtil !== v3.bgChip, 'V3 the utils wear a different fill at rest', v3.bgUtil + ' vs ' + v3.bgChip);
  ok(v3.ownLine, 'V3 ALL and CLEAR take their own line — the separation the Owner asked for', '');
  ok(v3.brkPresent, 'V3 the break is a deliberate element, not an accident of width', '');
  ok(v3.gapBetween >= 3 && v3.gapBetween <= 9, 'V3 ALL and CLEAR stay a tight pair', v3.gapBetween.toFixed(0) + 'px');
  ok(v3.rcGradeOk, 'V3 the cascade behind the new rules is untouched (report-card grade still 1.5rem)', '');
  await page.evaluate(() => document.getElementById('draftChips').scrollIntoView({ block: 'center' }));
  await page.waitForTimeout(300);
  await page.screenshot({ path: SH + '/chips_desktop.png' });

  // ============ V4 · THE FIX-IT BOARD on the season review ============
  console.log('== V4 · the fix-it board on the season review ==');
  await page.evaluate(() => { window.__zpbQuietSim = true; window.__zpbSBFinPending = false; });
  const v4sim = await page.evaluate(() => {
    try {
      try { if (draftSim && draftSim.pos < 32 * 26 && typeof simToEnd === 'function') simToEnd(); } catch (e) {}
      const b = document.getElementById('startSeasonBtn'); if (b) b.click(); else startSeason();
      if (!seasonState) return { err: 'no seasonState after boot' };
      simRestOfSeason();
      startPlayoffs();
      const order = ['wildcard', 'divisional', 'champ', 'superbowl'];
      for (let i = order.indexOf(seasonState.currentPlayoffRound); i < 4 && seasonState.phase !== 'complete'; i++) {
        if (!seasonState.playoffRoundSimulated) simulatePlayoffRound();
        if (order[i] !== 'superbowl') advancePlayoffRound();
      }
      window.__zpbSBFinPending = false;
      seasonState.showReview = true;
      renderSeasonTab(document.getElementById('draftResultsBody') || document.getElementById('seasonHost'));
      return { phase: seasonState.phase, champion: seasonState.champion || null, userWeeks: seasonState.currentWeek };
    } catch (e) { return { err: String(e) }; }
  });
  await page.waitForTimeout(1200); await closeOv();
  ok(v4sim.phase === 'complete', 'V4 the season simmed to the Super Bowl', JSON.stringify(v4sim));
  const v4 = await page.evaluate(() => {
    const host = document.getElementById('draftResultsBody') || document.getElementById('seasonHost');
    const board = host && host.querySelector('.zpb-fx-board');
    if (!board) return { board: false };
    const rooms = Array.from(board.querySelectorAll('.zpb-fx-room')).map(r => ({
      label: r.querySelector('.zpb-fx-roomhd b').textContent,
      nums: r.querySelector('.zpb-fx-roomhd i').textContent,
      grade: r.querySelector('.zpb-fx-grade').textContent,
      hasFill: !!r.querySelector('.zpb-fx-drain,.zpb-fx-gain'),
      tip: r.getAttribute('title') || ''
    }));
    const cards = Array.from(board.querySelectorAll('.zpb-fx-card')).map(c => ({
      name: c.querySelector('.zpb-fx-hd b').textContent,
      pos: (c.querySelector('.zpb-fx-pos') || {}).textContent || '',
      weak: c.classList.contains('zpb-fx-weak'),
      bars: c.querySelectorAll('.zpb-fx-fill').length,
      gap: c.querySelectorAll('.zpb-fx-gap').length,
      delta: (c.querySelector('.zpb-fx-delta') || {}).textContent || ''
    }));
    return {
      board: true, title: (board.querySelector('.zpb-rc-title') || {}).textContent || '',
      sub: (board.querySelector('.zpb-fx-sub') || {}).textContent || '',
      rooms, cards, foot: (board.querySelector('.zpb-fx-foot') || {}).textContent || ''
    };
  });
  ok(v4.board, 'V4 the fix-it board renders on the shared review', '');
  ok(v4.title === 'THE FIX-IT BOARD', 'V4 the panel title', v4.title || '(none)');
  ok(Array.isArray(v4.rooms) && v4.rooms.length === 3, 'V4 exactly three rooms on the gauge rack', v4.rooms ? v4.rooms.map(r => r.label + ' ' + r.grade).join(' · ') : '');
  ok(v4.rooms && v4.rooms.every(r => r.hasFill && r.grade && r.tip.indexOf('the tape says') > -1), 'V4 every room carries its gauge, grade and tape tooltip', JSON.stringify(v4.rooms && v4.rooms[0]));
  ok(Array.isArray(v4.cards) && v4.cards.length >= 1 && v4.cards.length <= 3, 'V4 the heavy seasons render as cards', v4.cards ? v4.cards.map(c => c.name + ' ' + c.pos).join(' · ') : '');
  ok(v4.cards && v4.cards.every(c => c.bars === 2), 'V4 every card wears the two-bar scale', '');
  ok(v4.cards && (v4.cards.some(c => c.gap > 0) === v4.cards.some(c => /−/.test(c.delta))), 'V4 the hatched shortfall and the minus delta agree', '');
  ok(v4.foot === 'THE NEXT DRAFT IS WHERE YOU FIX THIS', 'V4 the footer points at the draft', v4.foot || '(none)');
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
  await page.screenshot({ path: SH + '/review_fixboard.png' });

  // ============ V5 · the phone laws at 390 ============
  console.log('== V5 · the phone laws at 390 ==');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(700);
  const phone = await page.evaluate(() => {
    const host = document.getElementById('draftResultsBody') || document.getElementById('seasonHost');
    const board = host && host.querySelector('.zpb-fx-board'); if (board) board.scrollIntoView({ block: 'start' });
    return { pan: document.documentElement.scrollWidth - document.documentElement.clientWidth };
  });
  ok(phone.pan <= 0, 'V5 the fix-it board does not pan the page at 390', phone.pan + 'px');
  await page.screenshot({ path: SH + '/review_fixboard_390.png' });
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(600);
  const chipPan = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok(chipPan <= 0, 'V5 the chip row still holds the no-pan law at 390', chipPan + 'px');
  await page.evaluate(() => { const c = document.getElementById('draftChips'); if (c) c.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(300);
  await page.screenshot({ path: SH + '/chips_390.png' });

  ok(pageErrs.length === 0, 'zero page errors across the whole battery', pageErrs.slice(0, 3).join(' | '));
  console.log(`\n== RESULT · ${pass} pass · ${fail} fail ==`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('BATTERY CRASH', e); process.exit(2); });
