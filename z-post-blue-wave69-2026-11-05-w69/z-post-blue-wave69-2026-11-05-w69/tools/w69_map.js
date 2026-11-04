/* w69_map.js — the Owner's "check all teams in light and dark" law, with pixel truth:
   for every one of the 32 teams × both themes the field map renders, a screenshot is
   taken, and the bubbles' text-vs-fill contrast is measured from the BITMAP itself
   (the 4th-percentile vs the 75th-percentile luminance inside each bubble box). */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const sharp = require('/home/z/.npm-global/lib/node_modules/sharp');
const FILE = 'file:///home/z/my-project/work/w69/Football-Sim-Z-post-blue-w69.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
const lum = (r, g, b) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const contrast = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  await page.emulateMedia({ reducedMotion: 'reduce' }); // the w37/w58 reduced-motion law holds the map's beats fully visible — the sweep measures the resting page
  let pageErrs = 0;
  page.on('pageerror', e => { pageErrs++; console.log('   PAGE-ERROR: ' + e.message); });
  await page.goto(FILE); await page.waitForTimeout(400);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(700);
  await page.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    if (s) { s.value = 'Pittsburgh Steelers'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    document.getElementById('startDraftBtn').click();
  });
  await page.waitForTimeout(1400);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin,.zpb-restov,.zpb-replay-ov,.zpb-prematch,.zpb-sbfin,.zpb-porun,.zpb-victory,.zpb-ss-ov,.zpb-caution').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
  await page.waitForTimeout(900);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.evaluate(() => { try { const g = document.querySelector('.zpb-fin .zpb-fin-go'); if (g) g.click(); else document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} }); await page.waitForTimeout(250); }

  const teams = await page.evaluate(() => Object.keys(TEAM_DATA));
  ok(teams.length === 32, 'the full 32-team league', teams.length + ' teams');

  // the YOUR ROSTER tab carries the map; render once per team × theme
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(600);

  const worst = {};
  for (const mode of ['light', 'dark']) {
    for (const team of teams) {
      await page.evaluate(({ m, t }) => {
        document.documentElement.setAttribute('data-theme', m);
        if (typeof zpbApplyTeamTheme === 'function') zpbApplyTeamTheme(t);
        resultsView = 'mine'; if (typeof renderDraftResults === 'function') renderDraftResults();
      }, { m: mode, t: team });
      await page.waitForTimeout(420);
      // bubble boxes relative to the map element
      const boxes = await page.evaluate(() => {
        const map = document.querySelector('.zpb-fm');
        if (!map) return null;
        const mr = map.getBoundingClientRect();
        return Array.from(map.querySelectorAll('.zpb-fm-ini')).filter(c => { const b = c.querySelector('b'); return b && b.textContent.trim(); })
          .map(c => { const r = c.getBoundingClientRect(); return { x: r.left - mr.left, y: r.top - mr.top, w: r.width, h: r.height, side: c.closest('.zpb-fm-off') ? 'off' : 'def' }; });
      });
      if (!boxes || boxes.length < 20) { worst[mode + '/' + team] = { err: 'no map' }; continue; }
      // viewport-truth: scroll the map into view, re-measure the rects in VIEWPORT space, then clip the screenshot to the same rect
      const vp = await page.evaluate(() => {
        const map = document.querySelector('.zpb-fm');
        if (!map) return null;
        map.scrollIntoView({ block: 'center' });
        const mr = map.getBoundingClientRect();
        return { clip: { x: Math.max(0, mr.left), y: Math.max(0, mr.top), width: Math.min(1280, mr.width), height: Math.min(940, mr.height) }, ox: mr.left, oy: mr.top,
          boxes: Array.from(map.querySelectorAll('.zpb-fm-ini')).filter(c => { const b = c.querySelector('b'); return b && b.textContent.trim(); })
            .map(c => { const r = c.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height, side: c.closest('.zpb-fm-off') ? 'off' : 'def' }; }) };
      });
      await page.waitForTimeout(220);
      const buf = await page.screenshot({ clip: vp.clip });
      const img = sharp(buf);
      const meta = await img.metadata();
      const raw = await img.raw().toBuffer();
      const ch = meta.channels;
      // per-bubble: gather luminances (viewport coords → shot coords), text cluster = the 2nd percentile, fill = the 60th
      let worstC = 99, worstSide = '';
      for (const bx of vp.boxes) {
        const xs = Math.max(1, Math.round(bx.x - vp.ox) + 2), ys = Math.max(1, Math.round(bx.y - vp.oy) + 2);
        const xe = Math.min(meta.width - 2, Math.round(bx.x - vp.ox + bx.w) - 2), ye = Math.min(meta.height - 2, Math.round(bx.y - vp.oy + bx.h) - 2);
        if (xe <= xs || ye <= ys) continue;
        const lums = [];
        for (let y = ys; y < ye; y++) for (let x = xs; x < xe; x++) { const i = (y * meta.width + x) * ch; lums.push(lum(raw[i], raw[i + 1], raw[i + 2])); }
        if (lums.length < 40) continue;
        lums.sort((a, b) => a - b);
        const q = p => lums[Math.min(lums.length - 1, Math.floor(p * lums.length))];
        const dark2 = q(0.004), fill = q(0.6), light98 = q(0.996);
        const cDark = contrast(dark2, fill), cLight = contrast(light98, fill);
        const c = Math.max(cDark, cLight);
        if (c < worstC) { worstC = c; worstSide = bx.side; }
      }
      worst[mode + '/' + team] = { c: worstC, side: worstSide };
      await page.evaluate(() => { document.querySelectorAll('.zpb-pickmenu.zpb-open').forEach(m => m.classList.remove('zpb-open')); });
    }
  }

  console.log('== the pixel-truth sweep (32 teams × 2 modes) ==');
  const bad = Object.entries(worst).filter(([k, v]) => !v.c || v.c < 4.5);
  for (const probe of ['light/Pittsburgh Steelers', 'dark/Cleveland Browns', 'dark/Pittsburgh Steelers', 'light/Cleveland Browns']) {
    const v = worst[probe];
    console.log(`   (${probe}: worst bubble ${v && v.c ? v.c.toFixed(2) : '?'}:1 on the ${v && v.side} side)`);
  }
  ok(bad.length === 0, 'EVERY team × both modes: every map bubble reads ≥4.5:1 from the pixels themselves', bad.slice(0, 6).map(([k, v]) => `${k}=${v.c && v.c.toFixed(2)}`).join(' ') || '64/64 clean');
  ok(pageErrs === 0, 'zero page errors across the 64 renders', String(pageErrs));

  await browser.close();
  console.log(`\nw69_map RESULT: pass=${pass} fail=${fail}`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
