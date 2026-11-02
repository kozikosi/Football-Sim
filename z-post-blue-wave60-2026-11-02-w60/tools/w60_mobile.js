/* w60_mobile.js — the Owner's round-60 phone battery (390 + 320)
 * M1-M4 the w59 card laws hold (DIME, the ranking cards, the Madden cards, the browser cards) ·
 * M5 THE UNIT COMPARISON IS FLUID — display:table + 25/50/25, the cells reach the panel's edges
 *    at every width (the w59 two-state bug is dead) · M6 the draft card keeps w57's two lines ·
 * M7 the cinematic lock (unchanged) · M8 the shimmer clip · M9-M10 zero overflow/compact cards ·
 * M11 THE NAME LADDER live: carriers never overflow, words stay whole, no '…' anywhere ·
 * M12 the footer pair: RUN IT BACK · SAME ROSTER / NEW DRAFT, SAME ROSTER on its own line ≤520 ·
 * M13 zero page errors */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/football-sim/worktrees/zai/Football-Sim-Z-post-blue-w60.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/football-sim/worktrees/zai/z-post-blue-wave60-2026-11-02-w60/shots';
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
  const openTab = async (btn) => { await page.evaluate(b => { document.getElementById(b).click(); }, btn); await page.waitForTimeout(500); };

  // M1 · DIME
  await openTab('tabGroupsBtn');
  const m1 = await page.evaluate(() => {
    const btn = document.querySelector('#zpbRankBtns [data-rslot="CB4"] b');
    const opt = document.querySelector('#groupSelect option[value="CB4"]');
    return { btn: btn ? btn.textContent.trim() : null, opt: opt ? opt.textContent.trim() : null };
  });
  ok(m1.btn === 'DIME', 'M1a spot button reads DIME', 'got: ' + m1.btn);
  ok(m1.opt === 'Dime', 'M1b dropdown reads Dime', 'got: ' + m1.opt);

  // M2 · the position rankings cards read naturally (the w59 law holds)
  const m2 = await page.evaluate(() => {
    const tr = document.querySelector('#groupTable.mstack tbody tr');
    if (!tr) return { stacked: false };
    return {
      stacked: true, display: getComputedStyle(tr).display,
      over: document.documentElement.scrollWidth - document.documentElement.clientWidth
    };
  });
  ok(m2.stacked && m2.display === 'grid', 'M2a group card is a grid', JSON.stringify(m2).slice(0, 120));
  ok(m2.over <= 0, 'M2b no sideways overflow', 'over=' + m2.over);
  await page.screenshot({ path: SHOTS + '/w60-posrank-390.png' });

  // M3 · the Madden cards condense (the w59 law holds)
  await openTab('tabRankingsBtn');
  const m3 = await page.evaluate(() => {
    const tr = document.querySelector('#resultsTable.mstack tbody tr');
    if (!tr) return { stacked: false };
    const td2 = tr.querySelector('td:nth-child(2)'), score = tr.querySelector('td.score');
    return { stacked: true, display: getComputedStyle(tr).display, td2: getComputedStyle(td2).display,
      scoreAlign: getComputedStyle(score).textAlign, over: document.documentElement.scrollWidth - document.documentElement.clientWidth };
  });
  ok(m3.stacked && m3.display === 'grid', 'M3a madden card is a grid', JSON.stringify(m3).slice(0, 140));
  ok(m3.td2 === 'contents', 'M3b the team cell dissolves into the grid', m3.td2);
  ok(m3.over <= 0, 'M3c no sideways overflow', 'over=' + m3.over);
  await page.screenshot({ path: SHOTS + '/w60-madden-390.png' });

  // M4 · the browser cards: two lines (the w59 law holds)
  await openTab('tabPlayersBtn');
  const m4 = await page.evaluate(() => {
    const tr = document.querySelector('#playerTable.mstack tbody tr');
    if (!tr) return { stacked: false };
    return { stacked: true, display: getComputedStyle(tr).display,
      rowH: Math.round(tr.getBoundingClientRect().height), over: document.documentElement.scrollWidth - document.documentElement.clientWidth };
  });
  ok(m4.stacked && m4.display === 'grid', 'M4a browser card is a grid', JSON.stringify(m4).slice(0, 120));
  ok(m4.rowH > 0 && m4.rowH < 74, 'M4b the card is compact (two lines)', 'rowH=' + m4.rowH);
  ok(m4.over <= 0, 'M4c no sideways overflow', 'over=' + m4.over);
  await page.screenshot({ path: SHOTS + '/w60-browser-390.png' });

  // M5 · THE UNIT COMPARISON IS FLUID — a real table at every width AND the cells reach the
  // panel's edges (the w59 two-state narrowmaker is dead: display:block shrink-wrap gone)
  await openTab('tabCompareBtn');
  const widths = [390, 500, 640, 700, 760, 768, 1024];
  let m5all = true, m5detail = [];
  for (const w of widths) {
    await page.setViewportSize({ width: w, height: 844 });
    await page.waitForTimeout(450);
    const r = await page.evaluate(() => {
      const t = document.querySelector('#homeCmpResult table.zpb-unitcmp');
      if (!t) return { found: false };
      const panel = t.closest('.panel');
      const pcs = getComputedStyle(panel);
      const cw = panel.clientWidth - parseFloat(pcs.paddingLeft) - parseFloat(pcs.paddingRight);
      const tds = Array.from(t.querySelectorAll('tr')[0].querySelectorAll('td'));
      const tr0 = tds[0].getBoundingClientRect(), tn = tds[tds.length-1].getBoundingClientRect();
      const tb = t.getBoundingClientRect();
      const disp = getComputedStyle(t).display, layout = getComputedStyle(t).tableLayout;
      return { found: true, stacked: t.classList.contains('mstack'), disp, layout,
        tw: Math.round(tb.width), cw: Math.round(cw),
        leftGap: Math.round(tr0.left - tb.left), rightGap: Math.round(tb.right - tn.right),
        over: t.scrollWidth - t.clientWidth };
    });
    const good = r.found && !r.stacked && r.disp === 'table' && r.layout === 'fixed'
      && Math.abs(r.tw - r.cw) <= 2 && r.leftGap <= 2 && r.rightGap <= 2 && r.over <= 0;
    m5all = m5all && good; m5detail.push(w + ':' + (good ? 'ok' : 'BAD ' + JSON.stringify(r)));
  }
  ok(m5all, 'M5 the unit table is fluid at 390/500/640/700/760/768/1024 (table+fixed, cells reach both edges)', m5detail.join(' · '));
  await page.setViewportSize({ width: 390, height: 844 }); await page.waitForTimeout(400);
  await page.screenshot({ path: SHOTS + '/w60-unitcmp-390.png' });

  // M7 · the cinematic lock (the w59 law, unchanged)
  await openTab('tabDraftBtn');
  const lock = await page.evaluate(async () => {
    const btn = document.getElementById('tabPlayersBtn');
    const r = btn.getBoundingClientRect();
    const ov = document.createElement('div'); ov.className = 'zpb-prematch zpb-prematch-in';
    ov.innerHTML = '<div class="zpb-prematch-text">SEASON OPENER</div>';
    document.body.appendChild(ov);
    await new Promise(r2 => setTimeout(r2, 120));
    return { x: Math.round(r.left + r.width/2), y: Math.round(r.top + r.height/2),
      locked: document.body.classList.contains('zpb-cinelock'), inert: document.querySelector('.wrap').inert === true };
  });
  await page.mouse.click(lock.x, lock.y);
  await page.waitForTimeout(150);
  const lock2 = await page.evaluate(() => ({ view: document.querySelector('.view.active').id, still: document.body.classList.contains('zpb-cinelock') }));
  ok(lock.locked && lock.inert, 'M7a the page locks behind the cinematic (class + inert)', '');
  ok(lock2.view === 'viewDraft' && lock2.still, 'M7b the click behind the cinematic does NOTHING', lock2.view);

  // M8 · the shimmer keeps background-clip:text in light mode
  await page.evaluate(() => document.querySelector('.zpb-prematch').remove());
  await page.waitForTimeout(500);
  await openTab('tabRankingsBtn');
  const m8 = await page.evaluate(() => {
    const el = document.querySelector('#resultsBody .zpb-shm');
    if (!el) return { found: false };
    return { found: true, clip: getComputedStyle(el).webkitBackgroundClip || getComputedStyle(el).backgroundClip };
  });
  ok(m8.found && m8.clip === 'text', 'M8 the shimmer keeps background-clip:text', String(m8.clip));

  // M11 · THE NAME LADDER live on the browser cards at 320: no carrier overflows, words whole,
  // no ellipsis anywhere in the rendered text
  await page.evaluate(() => document.getElementById('tabPlayersBtn').click());
  await page.setViewportSize({ width: 320, height: 700 }); await page.waitForTimeout(600);
  const m11 = await page.evaluate(() => {
    const sels = '.zpb-lu-cell,.zpb-gname,.zpb-awname,.zpb-awme,.zpb-dz-name,.zpb-whyname,.zpb-tree .bracket-game .zpb-trow2 em,.zpb-fillab,.zpb-pickname,.zpb-pickrow b,.zpb-pcard-hd b,.zpb-pb-name,.zpb-pb-team,.zpb-intro-star b,td.dc-name,.zst-opp';
    const list = Array.from(document.querySelectorAll(sels));
    const bad = [];
    list.forEach(el => {
      const cs = getComputedStyle(el);
      if (cs.overflowWrap !== 'normal') bad.push('wrap:' + (el.className || el.tagName));
      if (el.scrollWidth > el.clientWidth + 1 && cs.whiteSpace !== 'normal') bad.push('over:' + (el.className || el.tagName) + ':' + el.textContent.slice(0, 18));
    });
    const dots = document.body.innerText.includes('\u2026');
    const swap = document.querySelector('#playerTable.mstack td.zpb-pb-name');
    return { count: list.length, bad: bad.slice(0, 4), dots, sample: swap ? swap.textContent.trim() : null };
  });
  ok(m11.count > 30, 'M11a the engine covers the carriers on the page', 'n=' + m11.count);
  ok(m11.bad.length === 0, 'M11b every carrier: overflow-wrap normal, no overflow', JSON.stringify(m11.bad));
  ok(!m11.dots, 'M11c no \u2026 anywhere in the rendered text', '');
  ok(!!m11.sample, 'M11d the browser name carrier is rendered', m11.sample);
  await page.screenshot({ path: SHOTS + '/w60-browser-320.png' });

  // M12 · the footer pair: labels + the compressed SAME ROSTER line (mounted via the real builder)
  const m12 = await page.evaluate(() => {
    const host = document.createElement('div');
    host.innerHTML = window.seasonOptionsHTML ? seasonOptionsHTML() : '';
    document.body.appendChild(host);
    const a = host.querySelector('#restartSeasonBtn'), b = host.querySelector('#newDraftFromSeasonBtn');
    const line = host.querySelector('.zpb-rosterline'), dot = host.querySelector('.zpb-again-dot');
    const out = {
      a: a ? a.textContent.replace(/\s+/g, ' ').trim() : null,
      b: b ? b.textContent.trim() : null,
      lineDisp: line ? getComputedStyle(line).display : null,
      dotDisp: dot ? getComputedStyle(dot).display : null,
      colDisp: getComputedStyle(host.firstChild).flexDirection
    };
    host.remove();
    return out;
  });
  ok(m12.a === 'RUN IT BACK · SAME ROSTER', 'M12a the button reads RUN IT BACK · SAME ROSTER', m12.a);
  ok(m12.b === 'NEW DRAFT', 'M12b the button reads NEW DRAFT', m12.b);
  ok(m12.lineDisp === 'block', 'M12c SAME ROSTER takes its own line at 320', m12.lineDisp);
  ok(m12.dotDisp === 'none', 'M12d the dot retires on the compressed line', m12.dotDisp);
  ok(m12.colDisp === 'column', 'M12e the pair stacks vertically at 320', m12.colDisp);

  // M6 · the draft board phone card (the w57 two-line law, unchanged)
  await page.setViewportSize({ width: 390, height: 844 }); await page.waitForTimeout(400);
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'San Francisco 49ers'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await page.waitForTimeout(300);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1400);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(500);
  const m6 = await page.evaluate(() => {
    const tr = document.querySelector('#draftTable2 tbody tr');
    if (!tr) return { found: false };
    const name = tr.querySelector('td.dc-name'), btn = tr.querySelector('td.dc-btn'), pos = tr.querySelector('td[data-label="Pos"]'), pri = tr.querySelector('td.dc-pri');
    return { found: true, nameArea: getComputedStyle(name).gridArea, btnArea: getComputedStyle(btn).gridArea,
      posArea: getComputedStyle(pos).gridArea, priArea: getComputedStyle(pri).gridArea };
  });
  ok(m6.found && /^1 \/ 1/.test(m6.nameArea) && /^1 \/ 9/.test(m6.btnArea), 'M6a name and Draft share row 1', m6.nameArea + ' / ' + m6.btnArea);
  ok(m6.found && /^2 \/ 1/.test(m6.posArea) && /^2 \/ 6/.test(m6.priArea), 'M6b the six stats spread on row 2', m6.posArea + ' / ' + m6.priArea);
  await page.screenshot({ path: SHOTS + '/w60-draftcard-390.png' });

  // M10 · 320 super-compressed: nothing overflows
  await page.evaluate(() => { document.getElementById('tabPlayersBtn').click(); });
  await page.setViewportSize({ width: 320, height: 700 }); await page.waitForTimeout(500);
  const m10 = await page.evaluate(() => ({ over: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
  ok(m10.over <= 0, 'M10 no sideways overflow at 320', 'over=' + m10.over);

  ok(errors.length === 0, 'M13 zero page errors at 390+320', errors.join(' | ').slice(0, 200));
  await browser.close();
  console.log(`\nw60_mobile: ${pass} pass · ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
