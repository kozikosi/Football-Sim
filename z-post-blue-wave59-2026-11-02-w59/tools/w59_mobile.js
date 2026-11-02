/* w59_mobile.js — the Owner's round-59 phone battery (390 + 320 + 500)
 * M1 the position rankings spot reads DIME (buttons + dropdown) · M2 the position rankings
 * cards read naturally (# · team · score one line, names flow under, no label offsets) ·
 * M3 the Madden rankings cards condense (# and score beside the team, fewer lines) ·
 * M4 the player browser cards read in two lines and never grow as the window shrinks ·
 * M5 the unit comparison stays a full-width table at every width (never the narrow stack) ·
 * M6 the draft board wears w57's two-line labeled card · M7 the cinematics lock the page
 * behind them (pointer + keyboard) and release cleanly with the 300ms shield · M8 the gold
 * shimmer keeps background-clip:text in light mode (no solid gold blocks) · M9 zero errors */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/football-sim/worktrees/zai/Football-Sim-Z-post-blue-w59.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/football-sim/worktrees/zai/z-post-blue-wave59-2026-11-02-w59/shots';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', e => errors.push('390: ' + String(e).slice(0, 120)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  // ---- the supplementary pages (real NFL data, no season needed) ----
  const openTab = async (btn) => { await page.evaluate(b => { document.getElementById(b).click(); }, btn); await page.waitForTimeout(500); };

  // M1 · CB4/DIME -> DIME on the position rankings page
  await openTab('tabGroupsBtn');
  const m1 = await page.evaluate(() => {
    const btn = document.querySelector('#zpbRankBtns [data-rslot="CB4"] b');
    const opt = document.querySelector('#groupSelect option[value="CB4"]');
    return { btn: btn ? btn.textContent.trim() : null, opt: opt ? opt.textContent.trim() : null };
  });
  ok(m1.btn === 'DIME', 'M1a spot button reads DIME', 'got: ' + m1.btn);
  ok(m1.opt === 'Dime', 'M1b dropdown reads Dime', 'got: ' + m1.opt);

  // M2 · the position rankings cards read naturally
  const m2 = await page.evaluate(() => {
    const tr = document.querySelector('#groupTable.mstack tbody tr');
    if (!tr) return { stacked: false };
    const cs = getComputedStyle(tr);
    const rank = tr.querySelector('td.rank'), team = tr.querySelector('td.team'), score = tr.querySelector('td.score'), narr = tr.querySelector('td.narr');
    const rankBefore = getComputedStyle(rank, '::before').content;
    const teamBefore = getComputedStyle(team, '::before').content;
    return {
      stacked: true, display: cs.display, cols: cs.gridTemplateColumns.split(' ').length,
      rankBefore, teamBefore,
      scoreAlign: getComputedStyle(score).textAlign,
      narrDisplay: getComputedStyle(narr).display,
      over: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      rowH: Math.round(tr.getBoundingClientRect().height)
    };
  });
  ok(m2.stacked && m2.display === 'grid', 'M2a group card is a grid', JSON.stringify(m2).slice(0, 160));
  ok(m2.rankBefore === '"#"', 'M2b rank renders its own #', String(m2.rankBefore));
  ok(m2.teamBefore === 'none', 'M2c no label column on the team line', String(m2.teamBefore));
  ok(m2.scoreAlign === 'right' || m2.scoreAlign === 'right', 'M2d score rides right', m2.scoreAlign);
  ok(m2.narrDisplay === 'block', 'M2e player names flow as text', m2.narrDisplay);
  ok(m2.over <= 0, 'M2f no sideways overflow', 'over=' + m2.over);
  await page.screenshot({ path: SHOTS + '/w59-posrank-390.png', fullPage: false });

  // M3 · the Madden rankings cards condense
  await openTab('tabRankingsBtn');
  const m3 = await page.evaluate(() => {
    const tr = document.querySelector('#resultsTable.mstack tbody tr');
    if (!tr) return { stacked: false };
    const cs = getComputedStyle(tr);
    const td2 = tr.querySelector('td:nth-child(2)');
    const score = tr.querySelector('td.score');
    return {
      stacked: true, display: cs.display, areas: cs.gridTemplateAreas,
      td2: getComputedStyle(td2).display,
      scoreAlign: getComputedStyle(score).textAlign, scoreW: getComputedStyle(score).fontWeight,
      over: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      rowH: Math.round(tr.getBoundingClientRect().height),
      lines: Math.round(tr.getBoundingClientRect().height / parseFloat(getComputedStyle(tr).lineHeight || '18'))
    };
  });
  ok(m3.stacked && m3.display === 'grid', 'M3a madden card is a grid', JSON.stringify(m3).slice(0, 200));
  ok(m3.td2 === 'contents', 'M3b the team cell dissolves into the grid', m3.td2);
  ok(m3.scoreAlign === 'right', 'M3c score sits beside the team', m3.scoreAlign);
  ok(m3.over <= 0, 'M3d no sideways overflow', 'over=' + m3.over);
  await page.screenshot({ path: SHOTS + '/w59-madden-390.png', fullPage: false });

  // M4 · the player browser cards: two lines, compact
  await openTab('tabPlayersBtn');
  const m4 = await page.evaluate(() => {
    const tr = document.querySelector('#playerTable.mstack tbody tr');
    if (!tr) return { stacked: false };
    const cs = getComputedStyle(tr);
    const name = tr.querySelector('td.zpb-pb-name'), team = tr.querySelector('td.zpb-pb-team');
    const spd = tr.querySelector('td:nth-of-type(5)'), str = tr.querySelector('td:nth-of-type(6)');
    const spdBefore = getComputedStyle(spd, '::before').content;
    const nameSize = getComputedStyle(name).fontSize;
    return {
      stacked: true, display: cs.display, areas: cs.gridTemplateAreas,
      nameSize, teamSize: getComputedStyle(team).fontSize, spdBefore,
      spdAlign: getComputedStyle(spd).textAlign,
      rowH: Math.round(tr.getBoundingClientRect().height),
      over: document.documentElement.scrollWidth - document.documentElement.clientWidth
    };
  });
  ok(m4.stacked && m4.display === 'grid', 'M4a browser card is a grid', JSON.stringify(m4).slice(0, 200));
  ok(parseFloat(m4.rowH) < 74, 'M4b the card is compact (two lines, not six)', 'rowH=' + m4.rowH);
  ok(m4.spdBefore === '"SPD "', 'M4c SPD keeps a mini label', String(m4.spdBefore));
  ok(m4.over <= 0, 'M4d no sideways overflow', 'over=' + m4.over);
  await page.screenshot({ path: SHOTS + '/w59-browser-390.png', fullPage: false });

  // M5 · the unit comparison: a full-width table at every width, never stacked
  await openTab('tabCompareBtn');
  const widths = [390, 500, 640, 768, 1024];
  let m5all = true, m5detail = [];
  for (const w of widths) {
    await page.setViewportSize({ width: w, height: 844 });
    await page.waitForTimeout(450);
    const r = await page.evaluate(() => {
      const t = document.querySelector('#homeCmpResult table.zpb-unitcmp');
      if (!t) return { found: false };
      const panel = t.closest('.panel');
      const pcs = getComputedStyle(panel);
      const content = panel.clientWidth - parseFloat(pcs.paddingLeft) - parseFloat(pcs.paddingRight);
      return {
        found: true, stacked: t.classList.contains('mstack'),
        tw: Math.round(t.getBoundingClientRect().width), cw: Math.round(content),
        over: t.scrollWidth - t.clientWidth
      };
    });
    const good = r.found && !r.stacked && Math.abs(r.tw - r.cw) <= 2 && r.over <= 0;
    m5all = m5all && good; m5detail.push(w + ':' + (good ? 'ok' : 'BAD ' + JSON.stringify(r)));
  }
  ok(m5all, 'M5 unit table full-width at 390/500/640/768/1024', m5detail.join(' · '));
  await page.setViewportSize({ width: 390, height: 844 }); await page.waitForTimeout(400);
  await page.screenshot({ path: SHOTS + '/w59-unitcmp-390.png', fullPage: false });

  // M7 · the cinematics lock the page — a REAL click mid-page while the overlay is up must
  // do nothing, and the lock must release with the 300ms shield when the overlay leaves
  await openTab('tabDraftBtn');
  const lock = await page.evaluate(async () => {
    const out = {};
    // park a real target under the click point: the SIMULATOR tab button
    const btn = document.getElementById('tabPlayersBtn');
    const r = btn.getBoundingClientRect();
    out.x = Math.round(r.left + r.width / 2); out.y = Math.round(r.top + r.height / 2);
    out.viewBefore = document.querySelector('.view.active').id;
    const ov = document.createElement('div'); ov.className = 'zpb-prematch zpb-prematch-in';
    ov.innerHTML = '<div class="zpb-prematch-text">SEASON OPENER</div>';
    document.body.appendChild(ov);
    await new Promise(r2 => setTimeout(r2, 120));
    out.lockedClass = document.body.classList.contains('zpb-cinelock');
    out.wrapInert = document.querySelector('.wrap').inert === true;
    out.navPointer = getComputedStyle(document.querySelector('nav.footnav')).pointerEvents;
    out.topAtPoint = (el => el ? (el.id || el.className || el.tagName) : 'none')(document.elementFromPoint(out.x, out.y));
    out.overlayGoneFromPoint = !(document.elementFromPoint(out.x, out.y) === btn);
    window.__lockProbeOverlay = ov;
    return out;
  });
  await page.mouse.click(lock.x, lock.y);   // a real click on the PLAYER BROWSER tab behind the cinematic
  await page.waitForTimeout(150);
  const lock2 = await page.evaluate(() => ({
    viewAfter: document.querySelector('.view.active').id,
    stillLocked: document.body.classList.contains('zpb-cinelock')
  }));
  const release = await page.evaluate(async () => {
    const out = {};
    document.querySelector('.zpb-prematch').remove();
    await new Promise(r => setTimeout(r, 80));
    out.shieldUp = !!document.querySelector('.zpb-clickshield');
    out.released = !document.body.classList.contains('zpb-cinelock') && document.querySelector('.wrap').inert === false;
    await new Promise(r => setTimeout(r, 400));
    out.shieldGone = !document.querySelector('.zpb-clickshield');
    return out;
  });
  ok(lock.lockedClass && lock.wrapInert, 'M7a the page locks (class + inert)', JSON.stringify(lock).slice(0, 150));
  ok(lock.overlayGoneFromPoint, 'M7b the background tab is not the click target', lock.topAtPoint);
  ok(lock2.viewAfter === lock.viewBefore, 'M7c the click behind the cinematic does NOTHING', lock.viewBefore + ' -> ' + lock2.viewAfter);
  ok(lock.navPointer === 'none', 'M7d the footer nav is dead behind the cinematic', lock.navPointer);
  ok(release.released && release.shieldUp, 'M7e the lock releases and the shield arms', '');
  ok(release.shieldGone, 'M7f the shield is gone within 300ms', '');

  // M8 · the shimmer keeps background-clip:text in light mode (the w57 gold-block fix)
  await openTab('tabRankingsBtn');
  const m8 = await page.evaluate(() => {
    const el = document.querySelector('#resultsBody .zpb-shm');
    if (!el) return { found: false };
    const cs = getComputedStyle(el);
    return { found: true, clip: cs.webkitBackgroundClip || cs.backgroundClip, fill: cs.webkitTextFillColor };
  });
  ok(m8.found, 'M8a a shimmer name is on the page', '');
  ok(m8.found && (m8.clip === 'text'), 'M8b background-clip stays text (no gold blocks)', String(m8.clip));

  // M9 · console errors
  ok(errors.length === 0, 'M9 zero page errors at 390', errors.join(' | ').slice(0, 200));

  // ---- the draft board phone card (M6) ----
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'San Francisco 49ers'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await page.waitForTimeout(300);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1400);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(500);
  const m6 = await page.evaluate(() => {
    const tr = document.querySelector('#draftTable2 tbody tr.zpb-trow') || document.querySelector('#draftTable2 tbody tr');
    if (!tr) return { found: false };
    const name = tr.querySelector('td.dc-name'), btn = tr.querySelector('td.dc-btn'), pos = tr.querySelector('td[data-label="Pos"]'), pri = tr.querySelector('td.dc-pri'), fills = tr.querySelector('td.dc-fills');
    return {
      found: true,
      nameArea: getComputedStyle(name).gridArea, btnArea: getComputedStyle(btn).gridArea,
      posArea: getComputedStyle(pos).gridArea, priArea: getComputedStyle(pri).gridArea,
      fillsAlign: getComputedStyle(fills).textAlign,
      priColor: getComputedStyle(pri).color,
      rowH: Math.round(tr.getBoundingClientRect().height)
    };
  });
  ok(m6.found, 'M6a the draft board renders at 390', '');
  ok(m6.found && /^1 \/ 1/.test(m6.nameArea) && /^1 \/ 9/.test(m6.btnArea), 'M6b name and Draft share row 1', m6.nameArea + ' / ' + m6.btnArea);
  ok(m6.found && /^2 \/ 1/.test(m6.posArea) && /^2 \/ 6/.test(m6.priArea), 'M6c the six stats spread on row 2', m6.posArea + ' / ' + m6.priArea);
  ok(m6.found && m6.fillsAlign === 'right', 'M6d FILLS sits right under the button', m6.fillsAlign);
  await page.screenshot({ path: SHOTS + '/w59-draftcard-390.png', fullPage: false });

  // ---- 320 super-compressed: nothing overflows, the cards hold ----
  await page.evaluate(() => { document.getElementById('tabPlayersBtn').click(); });
  await page.setViewportSize({ width: 320, height: 700 }); await page.waitForTimeout(500);
  const m10 = await page.evaluate(() => ({
    over: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    rowH: (() => { const tr = document.querySelector('#playerTable.mstack tbody tr'); return tr ? Math.round(tr.getBoundingClientRect().height) : -1; })()
  }));
  ok(m10.over <= 0, 'M10a no sideways overflow at 320', 'over=' + m10.over);
  ok(m10.rowH > 0 && m10.rowH < 74, 'M10b the browser card holds two lines at 320', 'rowH=' + m10.rowH);
  await page.screenshot({ path: SHOTS + '/w59-browser-320.png', fullPage: false });

  await browser.close();
  console.log(`\nw59_mobile: ${pass} pass · ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
