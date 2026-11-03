/* w63_verify.js — the five fixes, measured live on the w63 bytes. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w63/Football-Sim-Z-post-blue-w63.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
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

  // ---- R3 · the first Draft click (the measured jank) ----
  await page.evaluate(() => {
    window.__tasks = [];
    try { new PerformanceObserver(list => { for (const e of list.getEntries()) window.__tasks.push(Math.round(e.duration)); }).observe({ entryTypes: ['longtask'] }); } catch (e) {}
  });
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'Kansas City Chiefs'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await page.waitForTimeout(250);
  await page.evaluate(() => { document.getElementById('startDraftBtn').click(); });
  await page.waitForTimeout(2600);
  const tasks = await page.evaluate(() => window.__tasks.filter(d => d >= 50));
  ok(tasks.length === 0 || Math.max(...tasks) < 200, 'R3 · the first Draft click paints in slices (no 300ms freeze)', 'tasks>=50ms: ' + JSON.stringify(tasks));
  const boardRows = await page.evaluate(() => document.querySelectorAll('#draftBody2 tr').length);
  ok(boardRows >= 140, 'R3 · the whole board still arrives (slices complete)', 'rows=' + boardRows);

  // ---- R1 · the Player Browser paginates ----
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { document.getElementById('tabPlayersBtn').click(); });
  await page.waitForTimeout(800);
  const p1 = await page.evaluate(() => ({
    rows: document.querySelectorAll('#playerBody tr').length,
    nodes: document.querySelectorAll('#viewPlayers *').length,
    info: (document.querySelector('#playerPager .paginfo') || {}).textContent || null,
    btns: document.querySelectorAll('#playerPager .pagbtn').length
  }));
  ok(p1.rows === 60, 'R1 · 60 rows a page (was 1,200)', 'rows=' + p1.rows);
  ok(p1.nodes < 1500, 'R1 · the browser DOM is light', 'nodes=' + p1.nodes);
  ok(p1.btns === 2 && /PAGE 1 OF 20/.test(p1.info || ''), 'R1 · the pager reads the page and the range', JSON.stringify(p1.info));
  await page.evaluate(() => { const bs = document.querySelectorAll('#playerPager .pagbtn'); bs[bs.length - 1].click(); });
  await page.waitForTimeout(400);
  const p2 = await page.evaluate(() => ({
    info: (document.querySelector('#playerPager .paginfo') || {}).textContent,
    first: document.querySelector('#playerBody tr td') ? document.querySelector('#playerBody tr td').textContent.slice(0, 24) : null,
    scroll: document.getElementById('playerTable').scrollTop
  }));
  ok(/PAGE 2 OF 20/.test(p2.info || '') && p2.first, 'R1 · NEXT flips to page 2 with new players', JSON.stringify(p2.info) + ' first=' + p2.first);

  // ---- finish the draft → the review (R4 + R2 + R5 surfaces) ----
  await page.evaluate(() => { document.getElementById('tabDraftBtn').click(); });
  await page.waitForTimeout(400);
  await page.evaluate(() => { document.getElementById('speedInstantBtn').click(); document.getElementById('simToEndBtn').click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); if (window._zpbWelCleanup) window._zpbWelCleanup(); } catch (e) {} });
  await page.waitForTimeout(600);

  // ---- R4 · the pill says START PRESEASON → ----
  const pill = await page.evaluate(() => {
    const b = document.getElementById('startSeasonBtn');
    return b ? { text: b.textContent.trim(), top: Math.round(b.getBoundingClientRect().top + scrollY) } : null;
  });
  ok(pill && pill.text === 'START PRESEASON →', 'R4 · the big pill reads START PRESEASON →', JSON.stringify(pill));

  // ---- R2 · the rail steps aside at top, returns when scrolled ----
  const railTop = await page.evaluate(() => {
    const r = document.getElementById('zpbAdvRail');
    const real = document.getElementById('startSeasonBtn');
    return {
      display: r ? getComputedStyle(r).display : 'absent',
      realVisible: real ? real.getBoundingClientRect().top < innerHeight : false,
      scrollY: scrollY
    };
  });
  ok(railTop.realVisible && railTop.display === 'none', 'R2 · at the top the rail is hidden (the real pill is on screen)', JSON.stringify(railTop));
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(500);
  const railScrolled = await page.evaluate(() => {
    const r = document.getElementById('zpbAdvRail');
    const btn = r ? r.querySelector('button') : null;
    return { display: r ? getComputedStyle(r).display : 'absent', label: btn ? btn.textContent.trim().slice(0, 30) : null };
  });
  ok(railScrolled.display === 'flex' && /PRESEASON/.test(railScrolled.label || ''), 'R2 · scrolled down the rail returns, carrying the pill', JSON.stringify(railScrolled));
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  // ---- R5 · the honest autosave ----
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  const prep = await page.evaluate(() => ({ chip: (document.querySelector('.zpb-autosave') || {}).textContent || null, begin2: !!document.getElementById('beginSeasonBtn2') }));
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn2'); if (b) b.click(); });
  await page.waitForTimeout(1600);
  const saved = await page.evaluate(() => {
    let env = null;
    try { env = JSON.parse(localStorage.getItem('zpb:st:slot:A') || 'null'); } catch (e) {}
    return {
      chip: (document.querySelector('.zpb-autosave') || {}).textContent || null,
      slotA: env ? { kind: env.kind, v: env.schemaVersion, eng: env.engineVersion, bytes: JSON.stringify(env).length, hasPayload: 'payload' in env } : null
    };
  });
  ok(saved.chip === 'AUTOSAVED ✓', 'R5 · the chip reads AUTOSAVED ✓', JSON.stringify(saved.chip));
  ok(saved.slotA && saved.slotA.kind === 'week' && saved.slotA.eng === 'zpb-w63' && saved.slotA.hasPayload, 'R5 · slot A holds the real season envelope', JSON.stringify(saved.slotA));
  // advance a week → the chip updates again
  const adv = await page.evaluate(() => { const b = document.getElementById('simWeekBtn'); if (b) { b.click(); return true; } const b2 = document.getElementById('nextWeekBtn'); if (b2) { b2.click(); return true; } return false; });
  await page.waitForTimeout(1600);
  const chip2 = await page.evaluate(() => (document.querySelector('.zpb-autosave') || {}).textContent || null);
  ok(adv && chip2 === 'AUTOSAVED ✓', 'R5 · a week advance re-saves and the chip updates', 'adv=' + adv + ' chip=' + JSON.stringify(chip2));

  await page.screenshot({ path: '/home/z/my-project/work/w63/shots/w63-season-chip-1280.png' });

  // ---- zero errors ----
  ok(errors.length === 0, 'zero page errors through the whole run', errors.join(' | '));
  console.log(`w63_verify: ${pass} pass · ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('VERIFY FAIL:', e); process.exit(1); });
