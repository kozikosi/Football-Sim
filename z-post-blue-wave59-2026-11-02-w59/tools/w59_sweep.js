/* w59_sweep.js — every page × every width: no sideways overflow, no page errors.
 * The Owner: "test almost every page at different window sizes and make sure everything
 * is optimized for mobile." Widths: 1920 / 1280 / 1024 / 768 / 600 / 390 / 320.
 * Pages: Simulator (draft) · Madden Rankings · Player Browser · Position Rankings ·
 * Team Comparison · Guide · the storage showcase (?storage=1). */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/football-sim/worktrees/zai/Football-Sim-Z-post-blue-w59.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
const WIDTHS = [1920, 1280, 1024, 768, 600, 390, 320];
const TABS = [['tabDraftBtn', 'Simulator'], ['tabRankingsBtn', 'Madden Rankings'], ['tabPlayersBtn', 'Player Browser'], ['tabGroupsBtn', 'Position Rankings'], ['tabCompareBtn', 'Team Comparison'], ['tabGuideBtn', 'Guide']];

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 90)));
  await page.goto(FILE); await page.waitForTimeout(800);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);

  const results = {};
  for (const [btn, name] of TABS) {
    results[name] = {};
    for (const w of WIDTHS) {
      await page.setViewportSize({ width: w, height: 900 });
      await page.evaluate(b => { document.getElementById(b).click(); }, btn);
      await page.waitForTimeout(420);
      const r = await page.evaluate(() => ({ over: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
      results[name][w] = r.over;
    }
  }
  for (const [btn, name] of TABS) {
    const bad = WIDTHS.filter(w => results[name][w] > 0);
    ok(bad.length === 0, name + ': no sideways overflow at all 7 widths', bad.length ? ('BAD ' + bad.map(w => w + '(+' + results[name][w] + ')').join(', ')) : 'clean');
  }

  // the storage showcase at phone + desktop (the shell is a body child; the lock must not eat its buttons)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(FILE + '?storage=1'); await page.waitForTimeout(1400);
  const st = await page.evaluate(() => {
    const shell = document.querySelector('.zpb-st-shell');
    if (!shell) return { found: false };
    const btn = shell.querySelector('button');
    return {
      found: true, lock: document.body.classList.contains('zpb-cinelock'), inert: document.querySelector('.wrap').inert === true,
      shellClickable: btn ? (() => { const r = btn.getBoundingClientRect(); const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return !!(el && (el === btn || btn.contains(el) || el.closest('.zpb-st-shell'))); })() : false,
      over: document.documentElement.scrollWidth - document.documentElement.clientWidth
    };
  });
  ok(st.found, 'storage showcase opens at 390 (?storage=1)', '');
  ok(st.found && st.lock && st.inert, 'the shell locks the page behind it too', '');
  ok(st.found && st.shellClickable, "the shell's own buttons stay live", '');
  ok(st.over <= 0, 'the showcase fits 390 with no pan', 'over=' + st.over);

  ok(errors.length === 0, 'zero page errors across the whole sweep', errors.slice(0, 4).join(' | '));
  await browser.close();
  console.log(`\nw59_sweep: ${pass} pass · ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
