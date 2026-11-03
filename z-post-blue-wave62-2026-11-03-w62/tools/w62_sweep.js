/* w60_sweep.js — every page × every width: no sideways overflow, no page errors, no '…',
   the rail silent on the footer pages. The Owner: "test almost every page at different window
   sizes." Widths: 1920 / 1280 / 1024 / 768 / 600 / 390 / 320. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w62/Football-Sim-Z-post-blue-w62.html';
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
      const r = await page.evaluate(() => ({
        over: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        dots: document.body.innerText.includes('\u2026'),
        rail: document.body.classList.contains('zpb-advrail')
      }));
      results[name][w] = r;
    }
  }
  for (const [btn, name] of TABS) {
    const bad = WIDTHS.filter(w => results[name][w].over > 0);
    ok(bad.length === 0, name + ': no sideways overflow at all 7 widths', bad.length ? ('BAD ' + bad.map(w => w + '(+' + results[name][w].over + ')').join(', ')) : 'clean');
  }
  const dotPages = TABS.filter(([btn, name]) => WIDTHS.some(w => results[name][w].dots));
  ok(dotPages.length === 0, "no '…' on any page at any width", dotPages.map(([b, n]) => n).join(', ') || 'clean');
  const railLeak = TABS.filter(([btn, name]) => name !== 'Simulator' && WIDTHS.some(w => results[name][w].rail));
  ok(railLeak.length === 0, 'the advance rail never shows on the footer pages', railLeak.map(([b, n]) => n).join(', ') || 'clean');

  // the storage showcase at phone + desktop (the shell is a body child; the lock must not eat its buttons)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(FILE + '?storage=1'); await page.waitForTimeout(900);
  const st = await page.evaluate(() => ({
    shell: !!document.querySelector('.zpb-st-shell'),
    locked: document.body.classList.contains('zpb-cinelock'),
    btn: (() => { const b = document.querySelector('.zpb-st-shell button'); if (!b) return null; const r = b.getBoundingClientRect(); const el = document.elementFromPoint(Math.round(r.left + r.width / 2), Math.round(r.top + r.height / 2)); return el ? (el.tagName + '.' + (el.className || '').toString().slice(0, 20)) : 'none'; })(),
    over: document.documentElement.scrollWidth - document.documentElement.clientWidth
  }));
  ok(st.shell, 'storage showcase opens at 390 (?storage=1)', '');
  ok(st.locked, 'the shell locks the page behind it too', '');
  ok(st.btn && !/none/.test(st.btn), 'the shell\'s own buttons stay live', String(st.btn));
  ok(st.over <= 0, 'the showcase fits 390 with no pan', 'over=' + st.over);

  ok(errors.length === 0, 'zero page errors across the whole sweep', errors.join(' | ').slice(0, 140));
  await browser.close();
  console.log(`\nw62_sweep: ${pass} pass · ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
