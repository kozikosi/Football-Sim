/* w61_mobile.js — the Owner's round-61 phone battery (430 + 390 + 360 + 320 + 280 + 320×640 + 280×560)
 * M1 the lineup-map panel steps aside ≤740px (whole panel gone, cards below stay)
 * M2 the map panel is present and one-line ≥741px (desktop untouched)
 * M3 the depth zones wear the ONE-INK law (plain == 85+ == the team's 0.50 ink; 85+ keeps bold; dark mirrors)
 * M4 "Can you go 20-0?" leads its own line ≤429px (above NEW DRAFT / 100 SEASONS), same-row ≥430px
 * M5 the depth-chart card rows never scroll the page sideways at any phone width
 * M6 the storage showcase (?storage=1) still fits a phone
 * M7 zero page errors through the whole run */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w61/Football-Sim-Z-post-blue-w61.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/work/w61';
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

  // draft as the KC CHIEFS (the Owner's exact case), instant to the end
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
  try { if (typeof add100Button === 'function') await page.evaluate(() => add100Button(document.getElementById('draftResultsBody'))); } catch (e) {}
  await page.evaluate(() => { const b = document.getElementById('resultsMineBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.addStyleTag({ content: '*,*::before,*::after{animation-duration:0s !important;animation-delay:0s !important;transition:none !important;}' });

  const probe = async (w, h) => {
    await page.setViewportSize({ width: w, height: h });
    await page.waitForTimeout(260);
    return page.evaluate(() => {
      const out = {};
      const panel = document.querySelector('#draftResultsBody .zpb-lumap-panel');
      out.mapPanel = panel ? getComputedStyle(panel).display : 'absent';
      out.dzRows = document.querySelectorAll('.zpb-dz .zpb-dz-row').length;
      out.dzVisible = (() => { const z = document.querySelector('.zpb-dz'); if (!z) return false; const r = z.getBoundingClientRect(); return r.width > 40 && r.height > 40; })();
      out.overX = document.documentElement.scrollWidth - document.documentElement.clientWidth;
      const ops = document.getElementById('zpbDraftOps');
      const cyg = document.querySelector('.zpb-cygdsub');
      if (ops && cyg) { const a = ops.getBoundingClientRect(), b = cyg.getBoundingClientRect(); out.cygAbove = b.top < a.top - 2; out.cygSameRow = Math.abs(a.top - b.top) < 12; } else { out.cygMissing = true; }
      const ink = { plain: null, vib: null, wVib: null, nm: null };
      const rows = [...document.querySelectorAll('.zpb-dz-row')];
      for (const r of rows) {
        const n = r.querySelector('.zpb-dz-name'); if (!n || !n.textContent.trim()) continue;
        if (!ink.nm) ink.nm = (r.getAttribute('style') || '').match(/--nm:([^;]+)/)?.[1] || null;
        const cs = getComputedStyle(n);
        if (n.classList.contains('zpb-vib')) { if (!ink.vib) { ink.vib = cs.color; ink.wVib = cs.fontWeight; } }
        else if (!ink.plain) ink.plain = cs.color;
        if (ink.plain && ink.vib) break;
      }
      out.ink = ink;
      return out;
    });
  };

  const hexRgb = hx => { hx = hx.trim().replace('#', ''); if (hx.length === 3) hx = hx.split('').map(c => c + c).join(''); const n = parseInt(hx, 16); return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`; };

  console.log('— M1/M4 at the phone widths (KC, light) —');
  for (const w of [280, 320, 360, 390, 430, 700, 740]) {
    const r = await probe(w, 844);
    ok(r.mapPanel === 'none', `M1 · ${w}px the map panel steps aside`, 'display=' + r.mapPanel);
    ok(r.dzVisible && r.dzRows > 10, `M1 · ${w}px the depth cards below stay`, `rows=${r.dzRows} visible=${r.dzVisible}`);
    ok(r.overX <= 0, `M5 · ${w}px no sideways scroll on the review`, 'overX=' + r.overX);
    if (w <= 429) ok(r.cygAbove, `M4 · ${w}px the tagline leads its own line`, 'above=' + r.cygAbove);
    else ok(r.cygSameRow, `M4 · ${w}px the tagline shares the row as before`, 'sameRow=' + r.cygSameRow);
  }

  console.log('— M2 the desktop floor (760/1280 keep the map) —');
  for (const w of [760, 1280]) {
    const r = await probe(w, 900);
    ok(r.mapPanel !== 'none' && r.mapPanel !== 'absent', `M2 · ${w}px the map panel is present`, 'display=' + r.mapPanel);
  }

  console.log('— M3 the ONE-INK law (light + dark, 1280) —');
  const light = await probe(1280, 900);
  ok(light.ink.plain && light.ink.vib && light.ink.plain === light.ink.vib, 'M3 · light: plain and 85+ names share one ink', `plain=${light.ink.plain} vib=${light.ink.vib}`);
  ok(light.ink.nm && light.ink.plain === hexRgb(light.ink.nm), 'M3 · light: the ink IS the team 0.50 (nm)', `nm=${light.ink.nm} got=${light.ink.plain}`);
  ok(light.ink.wVib === '800', 'M3 · light: the 85+ name keeps its bold', 'weight=' + light.ink.wVib);
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(200);
  const dark = await probe(1280, 900);
  ok(dark.ink.plain && dark.ink.vib && dark.ink.plain === dark.ink.vib, 'M3 · dark: plain and 85+ names share one ink', `plain=${dark.ink.plain} vib=${dark.ink.vib}`);
  const nmd = dark.ink.nm; // same rows carry --nmd; read it directly
  const nmdVar = await page.evaluate(() => { const r = document.querySelector('.zpb-dz-row'); return (r.getAttribute('style') || '').match(/--nmd:([^;]+)/)?.[1] || null; });
  ok(nmdVar && dark.ink.plain === hexRgb(nmdVar), 'M3 · dark: the ink IS the dark dropdown ink (nmd)', `nmd=${nmdVar} got=${dark.ink.plain}`);
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.waitForTimeout(150);

  console.log('— the fillDetail map obeys the same floor —');
  await page.setViewportSize({ width: 1280, height: 900 }); await page.waitForTimeout(200);
  const opened = await page.evaluate(() => {
    const tr = document.querySelector('#resultsBody tr.teamrow');
    if (!tr) return false; tr.click(); return true;
  });
  await page.waitForTimeout(700);
  const det = await probe(1280, 900);
  ok(opened && det.mapPanel !== 'absent', 'the draft-pick detail carries the map on desktop', 'display=' + det.mapPanel);
  await page.setViewportSize({ width: 320, height: 844 }); await page.waitForTimeout(260);
  const detSmall = await probe(320, 844);
  ok(detSmall.mapPanel === 'none' || detSmall.mapPanel === 'absent', 'M1 · 320px the detail map steps aside too', 'display=' + detSmall.mapPanel);

  console.log('— evidence shots —');
  await page.setViewportSize({ width: 320, height: 844 }); await page.waitForTimeout(250);
  await page.screenshot({ path: SHOTS + '/w61-320-review-cyg-leads.png', fullPage: false });
  await page.setViewportSize({ width: 440, height: 900 }); await page.waitForTimeout(250);
  await page.screenshot({ path: SHOTS + '/w61-440-review-unchanged.png', fullPage: false });
  await page.setViewportSize({ width: 1280, height: 900 }); await page.waitForTimeout(250);
  const dy = await page.evaluate(() => { const z = document.querySelector('.zpb-dz'); const r = z.getBoundingClientRect(); return Math.round(r.top + window.scrollY); });
  await page.evaluate(y => window.scrollTo(0, y - 80), dy);
  await page.waitForTimeout(150);
  await page.screenshot({ path: SHOTS + '/w61-1280-depth-oneink.png' });

  console.log('— M6 the storage showcase fits a phone —');
  await page.goto(FILE + '?storage=1'); await page.waitForTimeout(1200);
  for (const w of [390, 320, 280]) {
    await page.setViewportSize({ width: w, height: 844 }); await page.waitForTimeout(300);
    const s = await page.evaluate(() => ({ overX: document.documentElement.scrollWidth - document.documentElement.clientWidth, host: !!document.querySelector('[data-storage-host],#zpbStorageHost,.zpb-st-wrap') || document.body.textContent.includes('Slot') }));
    ok(s.overX <= 0, `M6 · ${w}px the storage walkthrough holds the line`, 'overX=' + s.overX);
  }

  ok(errors.length === 0, 'M7 · zero page errors', errors.join(' | '));
  console.log(`w61_mobile: ${pass} pass · ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS FAIL:', e); process.exit(1); });
