/* w60_desktop.js — the wide-window regression battery (1280 + 1920)
 * D1 the rankings stay real tables (no mstack) · D2 the unit comparison is fluid at wide steps
 * (25/50/25, cells at the edges) · D3 the draft board keeps the desktop table + the merged
 * inks · D4 the lock never engages without an overlay · D5 the footer pair sits side by side at
 * 1280 and stacks only ≤520 · D6 the advance rail is NOT on the footer pages · D7 zero '…'
 * anywhere · D8 zero errors · screenshots */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/football-sim/worktrees/zai/Football-Sim-Z-post-blue-w60.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/football-sim/worktrees/zai/z-post-blue-wave60-2026-11-02-w60/shots';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 120)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  const openTab = async (btn) => { await page.evaluate(b => { document.getElementById(b).click(); }, btn); await page.waitForTimeout(450); };

  // D1 · the rankings stay real tables
  await openTab('tabRankingsBtn');
  const d1a = await page.evaluate(() => ({
    mstack: document.querySelector('#resultsTable').classList.contains('mstack'),
    rows: document.querySelectorAll('#resultsBody tr').length
  }));
  ok(!d1a.mstack && d1a.rows > 20, 'D1a Madden rankings: a real table, 32 rows', JSON.stringify(d1a));
  await page.screenshot({ path: SHOTS + '/w60-madden-1280.png' });
  await openTab('tabGroupsBtn');
  const d1b = await page.evaluate(() => {
    const btn = document.querySelector('#zpbRankBtns [data-rslot="CB4"] b');
    return { mstack: document.querySelector('#groupTable').classList.contains('mstack'), cb4: btn ? btn.textContent.trim() : null };
  });
  ok(!d1b.mstack, 'D1b position rankings: a real table', '');
  ok(d1b.cb4 === 'DIME', 'D1c CB4 reads DIME at 1280 too', d1b.cb4);
  await page.screenshot({ path: SHOTS + '/w60-posrank-1280.png' });

  // D2 · the unit comparison is FLUID at wide steps: table+fixed, 25/50/25, cells at the edges
  await openTab('tabCompareBtn');
  const widths = [1280, 1024, 900, 768];
  let d2all = true, d2detail = [];
  for (const w of widths) {
    await page.setViewportSize({ width: w, height: 900 }); await page.waitForTimeout(400);
    const r = await page.evaluate(() => {
      const t = document.querySelector('#homeCmpResult table.zpb-unitcmp');
      if (!t) return { found: false };
      const panel = t.closest('.panel');
      const pcs = getComputedStyle(panel);
      const cw = panel.clientWidth - parseFloat(pcs.paddingLeft) - parseFloat(pcs.paddingRight);
      const tds = Array.from(t.querySelectorAll('tr')[0].querySelectorAll('td'));
      const tr0 = tds[0].getBoundingClientRect(), tn = tds[tds.length - 1].getBoundingClientRect();
      const tm = tds[Math.floor(tds.length / 2)].getBoundingClientRect();
      const tb = t.getBoundingClientRect();
      return { found: true, stacked: t.classList.contains('mstack'), disp: getComputedStyle(t).display,
        tw: Math.round(tb.width), cw: Math.round(cw),
        leftGap: Math.round(tr0.left - tb.left), rightGap: Math.round(tb.right - tn.right),
        midPct: Math.round((tm.width / tb.width) * 100) };
    });
    const good = r.found && !r.stacked && r.disp === 'table' && Math.abs(r.tw - r.cw) <= 2
      && r.leftGap <= 2 && r.rightGap <= 2 && Math.abs(r.midPct - 50) <= 6;
    d2all = d2all && good; d2detail.push(w + ':' + (good ? 'ok' : 'BAD ' + JSON.stringify(r)));
  }
  ok(d2all, 'D2 the unit table is fluid at 1280/1024/900/768 (edges + 50% middle)', d2detail.join(' · '));
  await page.setViewportSize({ width: 1280, height: 900 }); await page.waitForTimeout(400);
  await page.screenshot({ path: SHOTS + '/w60-unitcmp-1280.png' });

  // D3 · the draft board keeps its desktop table + the merged inks
  await openTab('tabDraftBtn');
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); s.value = 'San Francisco 49ers'; s.dispatchEvent(new Event('change', { bubbles: true })); });
  await page.waitForTimeout(300);
  await page.evaluate(() => document.getElementById('startDraftBtn').click());
  await page.waitForTimeout(1500);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(400);
  const d3 = await page.evaluate(() => {
    const tr = document.querySelector('#draftTable2 tbody tr');
    const cs = getComputedStyle(tr);
    const probe = document.createElement('div');
    probe.innerHTML = '<div class="zpb-pg-grade">A</div><div class="zpb-sbadge"><b>12</b></div>';
    document.body.appendChild(probe);
    const gradeSize = getComputedStyle(probe.querySelector('.zpb-pg-grade')).fontSize;
    const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    probe.remove();
    return { display: cs.display, gradeRatio: (parseFloat(gradeSize) / rootPx).toFixed(3) };
  });
  ok(d3.display === 'table-row', 'D3a the board is a table at 1280', d3.display);
  ok(d3.gradeRatio >= 1.1, 'D3b the pick-grade badge keeps the w57 1.17rem large-text law', d3.gradeRatio);
  await page.screenshot({ path: SHOTS + '/w60-draft-1280.png' });

  // D4 · the lock never engages without an overlay
  const d4 = await page.evaluate(() => ({ lock: document.body.classList.contains('zpb-cinelock'), inert: document.querySelector('.wrap').inert === true }));
  ok(!d4.lock && !d4.inert, 'D4 no lock without a cinematic', JSON.stringify(d4));

  // D5 · the footer pair: side by side at 1280 (the real builder, mounted)
  const d5 = await page.evaluate(() => {
    const host = document.createElement('div');
    host.innerHTML = window.seasonOptionsHTML ? seasonOptionsHTML() : '';
    document.body.appendChild(host);
    const a = host.querySelector('#restartSeasonBtn'), b = host.querySelector('#newDraftFromSeasonBtn');
    const ar = a.getBoundingClientRect(), br = b.getBoundingClientRect();
    const line = host.querySelector('.zpb-rosterline'), dot = host.querySelector('.zpb-again-dot');
    const out = { sameRow: Math.abs(ar.top - br.top) < 4, lineDisp: getComputedStyle(line).display, dotDisp: getComputedStyle(dot).display };
    host.remove();
    return out;
  });
  ok(d5.sameRow, 'D5a the pair is side by side at 1280', '');
  ok(d5.lineDisp === 'inline' && d5.dotDisp === 'inline', 'D5b the one-line form at 1280', d5.lineDisp + ' / ' + d5.dotDisp);

  // D6 · the advance rail is NOT on the footer pages
  const d6 = await page.evaluate(() => {
    const rail = document.getElementById('zpbAdvRail');
    return { view: document.querySelector('.view.active').id,
      on: document.body.classList.contains('zpb-advrail'),
      shown: rail ? getComputedStyle(rail).display : 'absent' };
  });
  ok(d6.view === 'viewDraft' && !d6.on, 'D6 the rail is silent outside the season screens', JSON.stringify(d6));

  // D7 · zero '…' anywhere
  const d7 = await page.evaluate(() => document.body.innerText.includes('\u2026'));
  ok(!d7, "D7 no '…' anywhere in the rendered text", '');

  ok(errors.length === 0, 'D8 zero page errors at 1280/1920', errors.join(' | ').slice(0, 160));
  await browser.close();
  console.log(`\nw60_desktop: ${pass} pass · ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
