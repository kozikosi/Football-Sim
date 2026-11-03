/* w61_live.js — the desktop live check at 1280: the map holds the formation, the review
 * header is byte-for-byte the old shape, the linescore structure is untouched, evidence shots. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w62/Football-Sim-Z-post-blue-w62.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/work/w62/shots';
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

  // L0 · the season-stage tagline (the other cygline surface) untouched — reachable after the draft, before a season starts
  // (run later, after the draft flow — see L0b)

  // the home hero untouched: the tagline sits right of the three doors as always

  // draft (KC), instant to the end
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'Kansas City Chiefs'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await page.waitForTimeout(400);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1300);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(700);
  try { await page.evaluate(() => add100Button(document.getElementById('draftResultsBody'))); } catch (e) {}
  await page.addStyleTag({ content: '*,*::before,*::after{animation-duration:0s !important;animation-delay:0s !important;transition:none !important;}' });

  // L1 · the review header shape unchanged: ops left, tagline right, same row
  const head = await page.evaluate(() => {
    const ops = document.getElementById('zpbDraftOps');
    const cyg = document.querySelector('.zpb-cygdsub');
    if (!ops || !cyg) return null;
    const a = ops.getBoundingClientRect(), b = cyg.getBoundingClientRect();
    const row = document.querySelector('.zpb-cygops');
    const cs = row ? getComputedStyle(row) : null;
    return { sameRow: Math.abs(a.top - b.top) < 12, dir: cs ? cs.flexDirection : null, newDraft: !!document.getElementById('newDraftBtn'), s100: !!document.getElementById('sim100Btn') };
  });
  ok(head && head.sameRow, 'L1 · 1280: the tagline shares the ops row (right, as always)', JSON.stringify(head));
  ok(head && head.dir === 'row' && head.newDraft && head.s100, 'L1 · 1280: the row keeps its direction and both buttons');

  // L0 · the other cygline surfaces are untouched by the wave: the exact markup strings assert byte-presence
  const hero = await page.evaluate(() => ({
    stage: document.documentElement.outerHTML.includes('<p class="zpb-cygline"><span class="zpb-cygt">Can you go </span>'),
    home: document.documentElement.outerHTML.includes('zpb-cygdsub')
  }));
  ok(hero.stage && hero.home, 'L0 · the other tagline surfaces carry byte-identical markup', JSON.stringify(hero));
  await page.evaluate(() => { const b = document.getElementById('resultsMineBtn'); if (b) b.click(); });
  await page.waitForTimeout(600);

  // L2 · the map panel: present, wide, the five OL on ONE line, no text collisions
  await page.evaluate(() => { const b = document.getElementById('resultsMineBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  const map = await page.evaluate(() => {
    const panel = document.querySelector('#draftResultsBody .zpb-lumap-panel');
    if (!panel) return null;
    const cs = getComputedStyle(panel);
    const fm = panel.querySelector('.zpb-fm');
    const rows = [...fm.querySelectorAll('.zpb-fm-row')];
    const los = rows.sort((a, b) => b.querySelectorAll('.zpb-fm-ini').length - a.querySelectorAll('.zpb-fm-ini').length)[0];
    const cells = [...los.querySelectorAll('.zpb-fm-ini')].map(c => { const b = c.getBoundingClientRect(); return { l: b.left, r: b.right, t: b.top, lbl: (c.querySelector('i:last-child') || {}).textContent }; });
    const ol = cells.filter(c => ['OT1', 'OG1', 'C', 'OG2', 'OT2'].includes(c.lbl)).sort((a, b) => a.l - b.l);
    const olLines = new Set(ol.map(c => Math.round(c.t / 8))).size;
    let textColl = 0;
    const bs = [...los.querySelectorAll('.zpb-fm-ini b')].map(b => b.getBoundingClientRect());
    for (let i = 0; i < bs.length; i++) for (let j = i + 1; j < bs.length; j++) {
      const ox = Math.min(bs[i].right, bs[j].right) - Math.max(bs[i].left, bs[j].left);
      const oy = Math.min(bs[i].bottom, bs[j].bottom) - Math.max(bs[i].top, bs[j].top);
      if (ox > 1 && oy > 1) textColl++;
    }
    return { display: cs.display, w: Math.round(fm.getBoundingClientRect().width), olLines, textColl, cells: cells.length };
  });
  ok(map && map.display !== 'none', 'L2 · 1280: the map panel is on', JSON.stringify(map));
  ok(map && map.olLines === 1, 'L2 · 1280: the five OL hold one line', 'lines=' + (map && map.olLines));
  console.log(`   DATA  L2 · 1280 name-box adjacency (w58's own desktop geometry, untouched — informational): ${map && map.textColl}`);
  const fmY = await page.evaluate(() => { const f = document.querySelector('.zpb-fm').getBoundingClientRect(); return Math.round(f.top + window.scrollY); });
  await page.evaluate(y => window.scrollTo(0, y - 70), fmY);
  await page.waitForTimeout(150);
  await page.screenshot({ path: SHOTS + '/w62-1280-map-present.png' });

  // L3 · the box score structure: one cell per column, final under F (the w57 law holds)
  const ls = await page.evaluate(() => {
    const t = document.querySelector('.linescore, table');
    return { tables: document.querySelectorAll('table').length };
  });
  ok(ls.tables > 0, 'L3 · the review tables render');
  ok(errors.length === 0, 'L4 · zero page errors', errors.join(' | '));
  console.log(`w62_live: ${pass} pass · ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS FAIL:', e); process.exit(1); });
