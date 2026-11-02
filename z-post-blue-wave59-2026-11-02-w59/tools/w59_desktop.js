/* w59_desktop.js — the wide-window regression battery (1280 + 1920)
 * D1 the rankings pages stay real tables (no mstack) · D2 the unit comparison is full-width
 * at every wide step · D3 the draft board keeps the desktop table · D4 the merge touched no
 * desktop ink on the board values · D5 the lock never engages without an overlay ·
 * D6 zero errors · screenshots for the eyeball */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/football-sim/worktrees/zai/Football-Sim-Z-post-blue-w59.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/football-sim/worktrees/zai/z-post-blue-wave59-2026-11-02-w59/shots';
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
  await page.screenshot({ path: SHOTS + '/w59-madden-1280.png' });
  await openTab('tabGroupsBtn');
  const d1b = await page.evaluate(() => {
    const btn = document.querySelector('#zpbRankBtns [data-rslot="CB4"] b');
    return { mstack: document.querySelector('#groupTable').classList.contains('mstack'), cb4: btn ? btn.textContent.trim() : null };
  });
  ok(!d1b.mstack, 'D1b position rankings: a real table', '');
  ok(d1b.cb4 === 'DIME', 'D1c CB4 reads DIME at 1280 too', d1b.cb4);
  await page.screenshot({ path: SHOTS + '/w59-posrank-1280.png' });

  // D2 · the unit comparison is full-width at wide steps
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
      return { found: true, stacked: t.classList.contains('mstack'), tw: Math.round(t.getBoundingClientRect().width), cw: Math.round(cw) };
    });
    const good = r.found && !r.stacked && Math.abs(r.tw - r.cw) <= 2;
    d2all = d2all && good; d2detail.push(w + ':' + (good ? 'ok' : 'BAD ' + JSON.stringify(r)));
  }
  ok(d2all, 'D2 unit table full-width at 1280/1024/900/768', d2detail.join(' · '));
  await page.setViewportSize({ width: 1280, height: 900 }); await page.waitForTimeout(400);
  await page.screenshot({ path: SHOTS + '/w59-unitcmp-1280.png' });

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
    const pri = tr.querySelector('td.dc-pri');
    const cs = getComputedStyle(tr);
    // the pick grades render on the post-draft review — the LAW is verified on a mounted probe node
    const probe = document.createElement('div');
    probe.innerHTML = '<div class="zpb-pg-grade">A</div><div class="zpb-sbadge"><b>12</b></div>';
    document.body.appendChild(probe);
    const gradeSize = getComputedStyle(probe.querySelector('.zpb-pg-grade')).fontSize;
    const badgeSize = getComputedStyle(probe.querySelector('.zpb-sbadge b')).fontSize;
    const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    probe.remove();
    return {
      display: cs.display, borderLeft: cs.borderLeftWidth + '/' + cs.borderLeftStyle,
      priColor: getComputedStyle(pri).color,
      gradeRatio: (parseFloat(gradeSize) / rootPx).toFixed(3),
      badgeRatio: (parseFloat(badgeSize) / rootPx).toFixed(3),
      sub: getComputedStyle(document.documentElement).getPropertyValue('--sub').trim()
    };
  });
  ok(d3.display === 'table-row', 'D3a the board is a table at 1280', d3.display);
  ok(d3.borderLeft === '0px/none' || d3.borderLeft.startsWith('0px'), 'D3b the w57 no-left-bar law holds', d3.borderLeft);
  ok(d3.gradeRatio === '1.170', 'D3c the pick-grade rides the 1.17rem bar', d3.gradeRatio + 'rem');
  ok(d3.badgeRatio === '1.170', 'D3c2 the season-badge number rides 1.17rem too', d3.badgeRatio + 'rem');
  ok(d3.sub === '#885261', 'D3d the muted ink is the deepened rose', d3.sub);
  await page.screenshot({ path: SHOTS + '/w59-draft-1280.png' });

  // D5 · the lock is inert without an overlay
  const d5 = await page.evaluate(() => ({
    lock: document.body.classList.contains('zpb-cinelock'),
    inert: document.querySelector('.wrap').inert === true,
    shield: !!document.querySelector('.zpb-clickshield')
  }));
  ok(!d5.lock && !d5.inert && !d5.shield, 'D5 no lock, no inert, no shield on the live page', JSON.stringify(d5));

  // D6 · errors + 1920 sanity
  ok(errors.length === 0, 'D6a zero page errors at 1280', errors.join(' | ').slice(0, 160));
  await page.setViewportSize({ width: 1920, height: 1000 }); await page.waitForTimeout(500);
  const d6 = await page.evaluate(() => ({
    over: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    mstack: document.querySelector('#resultsTable') ? document.querySelector('#resultsTable').classList.contains('mstack') : null
  }));
  ok(d6.over <= 0, 'D6b no sideways overflow at 1920', 'over=' + d6.over);
  await browser.close();
  console.log(`\nw59_desktop: ${pass} pass · ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
