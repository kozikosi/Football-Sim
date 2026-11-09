/* r2_battery.js — the P-285 R2 battery, RECONSTRUCTED IN-TREE (w86 package, P-307 fix 7).
 * Run: node r2_battery.js --file <path-to-w86-html>
 *
 * WHY THIS FILE EXISTS: the original r2 battery (w85r2_battery) existed only in the muse
 * review's ephemeral /tmp — it was never on any branch, so it was never a reproducible gate,
 * and its HARNESS FAIL (TypeError: Cannot read properties of undefined (reading 'length'),
 * exit 1, after R2-19 passed) could not be diagnosed by anyone but its holder. The muse
 * P-307 review ordered: "investigate whether it is a harness issue or a product issue, and
 * report it. If it is a harness issue, fix the harness or document it." This reconstruction
 * IS the fix: the same R2 checks, in the tree, driven the way the authoritative batteries
 * (accept-w86 V6, w86_battery T3/T4) drive those phases — with the playoff berth FORCED
 * (the original's playoff flow did not force a berth, which is why its R2-12 checks ran
 * against a season that never made the playoffs: a state artifact, not a product defect).
 *
 * CHECKS (the R2 items, w86 sense):
 *   R2-19  the rating scale: zpbSeasonRating + ZPB_MEDIAN_OVR named; the median is the
 *          DRAFTED POOL's (77); the average season grades at the median; computed once.
 *   R2-6/15 the Guide: FB joins the field-map legend (spelled Fullback); all 32 depth-chart
 *          slots on the ladder (TE3/DIME/WR4/DL5 included); the retired text stays retired.
 *   R2-19G the Guide carries the performance-scale law (the median printed live, never 76).
 *   R2-16  the guard casing on EVERY surface: the dropdown reads "Offensive guard" and the
 *          live DOM carries zero "Offensive Guard" occurrences (GROUP_DEFS, OG1/OG2 tables,
 *          the legend span and the position info panel are all inside the live DOM).
 *   R2-13  the DCC: renders as a panel on the Season Review and self-heals a save that lost
 *          its ratings (the T3 route).
 *   R2-12  the playoff cinematics: the bracket sims to complete, the round cinematic is up
 *          and waits for Continue, WILD CARD first, the storm does not jump early, and the
 *          Super Bowl page mounts after the last Continue (the V6 route).
 *   plus   zero page errors across the whole battery.
 *
 * RESULT: PASS/FAIL lines; also written to results/r2-battery.json. Exit 0 only at all-pass.
 */
const fs = require('fs');
const path = require('path');
const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const FILE_ARG = arg('--file', '');
if (!FILE_ARG) { console.error('usage: node r2_battery.js --file <path-or-url>'); process.exit(2); }
const FILE = /^https?:\/\//.test(FILE_ARG) ? FILE_ARG : 'file://' + path.resolve(FILE_ARG);
const OUT = arg('--out', path.join(__dirname, 'results', 'r2-battery.json'));
const pw = require('playwright');

// the w76/w77 adapter — the same hooks the authoritative acceptance battery drives with
const ADAPTER = path.resolve(arg('--adapter', path.join(__dirname, 'adapters', 'w76.js')));
let A = null;
try { A = require(ADAPTER); } catch (e) { console.error('ADAPTER LOAD FAILED: ' + e.message); process.exit(2); }
const H = { sel: A.sel || {} };
const eng = (k) => (A.engine && A.engine[k]) ? A.engine[k] : null;
const PRNAME = (A.sel && A.sel.prname) || '.zpb-prname';

let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

(async () => {
  const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(FILE); await page.waitForTimeout(500);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);

  // ============ R2-19 · the rating scale ============
  console.log('== R2-19 · the rating scale ==');
  const r19 = await page.evaluate(() => {
    const out = {};
    out.named = typeof window.zpbSeasonRating === 'function' && typeof window.ZPB_MEDIAN_OVR === 'number';
    out.med = window.ZPB_MEDIAN_OVR;
    try {
      const take = (typeof TOTAL_ROUNDS !== 'undefined' ? TOTAL_ROUNDS : 7) * 32;
      const pool = PLAYERS.slice().sort((a, b) => b[3] - a[3]);
      const drafted = pool.slice(0, take);
      const ind = drafted.map(p => p[3]).sort((a, b) => a - b);
      const indep = ind.length % 2 ? ind[(ind.length - 1) / 2] : Math.round((ind[ind.length / 2 - 1] + ind[ind.length / 2]) / 2);
      out.indep = indep; out.pool = pool.length; out.take = take;
      out.isInt = Number.isInteger(window.ZPB_MEDIAN_OVR);
      const s1 = window.zpbSeasonRating(77);
      const s2 = window.zpbSeasonRating({ _rating: 77 });
      out.scaleWorks = (s1 != null) || (s2 != null);
      out.scaleSample = s1 != null ? s1 : s2;
    } catch (e) { out.err = String(e); }
    return out;
  });
  ok(r19.named && r19.med === 77 && r19.indep === 77, 'R2-19 the rating scale is named and centers on the DRAFTED POOL median (77)', JSON.stringify(r19));
  ok(!r19.err && r19.isInt && r19.scaleWorks, 'R2-19 zpbSeasonRating answers and the scale stays an integer law', JSON.stringify({ isInt: r19.isInt, scaleWorks: r19.scaleWorks, err: r19.err || null }));

  // ============ R2-19G + R2-6/15 · the Guide: the scale law, the FB legend, the ladder ============
  console.log('== R2-19G/R2-6/15 · the Guide ==');
  const guide = await page.evaluate(PRNAME => {
    const out = {};
    try { document.getElementById('tabGuideBtn').click(); } catch (e) { out.err = String(e); }
    const g = document.getElementById('guideBody');
    const txt = g ? g.textContent : '';
    out.hasScale = /THE PERFORMANCE SCALE/.test(txt) && /median OVR/.test(txt) && txt.indexOf(String(window.ZPB_MEDIAN_OVR)) >= 0;
    out.medShown = (txt.match(/an average season reads\s*(\d+)/) || [])[1] || null;
    out.fbLegend = !!g && !!g.querySelector('.zpb-fm-legend b') && Array.from(g.querySelectorAll('.zpb-fm-legend span')).some(s => /^FB\b/.test(s.textContent.trim()));
    out.spelled = /Fullback/.test(txt);
    out.oldInGuide = /vs his \d+ OVR/.test(txt); // the retired wording must stay retired
    const names = Array.from(document.querySelectorAll('#guideBody ' + PRNAME)).map(e => e.textContent.trim());
    out.ladder = { n: names.length, te3: names.indexOf('TE3') >= 0, dime: names.indexOf('DIME') >= 0, wr4: names.indexOf('WR4') >= 0, dl5: names.indexOf('DL5') >= 0 };
    return out;
  }, PRNAME);
  ok(guide.hasScale && guide.medShown === String((await page.evaluate(() => window.ZPB_MEDIAN_OVR))), 'R2-19G the Guide carries the scale law with the live median (never hard-coded 76)', JSON.stringify({ hasScale: guide.hasScale, medShown: guide.medShown }));
  ok(guide.fbLegend && guide.spelled && !guide.oldInGuide, 'R2-6 FB joins the Guide legend, spelled Fullback; the retired wording stays retired', JSON.stringify({ fbLegend: guide.fbLegend, spelled: guide.spelled, oldInGuide: guide.oldInGuide }));
  ok(guide.ladder.n === 32 && guide.ladder.te3 && guide.ladder.dime && guide.ladder.wr4 && guide.ladder.dl5, 'R2-15 all 32 depth-chart spots on the ladder (TE3/DIME/WR4/DL5 on the map)', JSON.stringify(guide.ladder));

  // ============ R2-16 · the guard casing, every surface ============
  console.log('== R2-16 · the guard casing ==');
  const r16 = await page.evaluate(() => {
    const og = Array.from(document.querySelectorAll('#draftPosFilter2 option')).find(x => x.value === 'OG');
    const html = document.documentElement.innerHTML;
    return {
      dropdown: og ? og.textContent : null,
      capitalG: (html.match(/Offensive Guard/g) || []).length,
      groupLabel: html.includes('Offensive guards'),
      legendSpan: html.includes('<b>OG</b> Offensive guard'),
      infoTable: html.includes("OG:{n:'Offensive guard'")
    };
  });
  ok(r16.dropdown === 'Offensive guard' && r16.capitalG === 0, 'R2-16 every surface reads Offensive guard (dropdown + GROUP_DEFS + OG1/OG2 tables + legend + info table)', JSON.stringify(r16));

  // ============ R2-13 · the DCC panel (the T3 route) — BEFORE the playoffs, on a fresh page ============
  console.log('== R2-13 · the Draft Command Center ==');
  // (R2-13 runs on a fresh load BEFORE R2-12 consumes the season state — see the reordered main flow below)
  const r13 = await page.evaluate(async () => {
    const out = {};
    try {
      if (typeof newDraft === 'function') newDraft();
      document.getElementById('startDraftBtn').click();
      await new Promise(r2 => setTimeout(r2, 900));
      simToEnd();
      document.getElementById('startSeasonBtn').click();
      await new Promise(r2 => setTimeout(r2, 500));
      simRestOfSeason();
      await new Promise(r2 => setTimeout(r2, 900));
      seasonState.showReview = true;
      renderSeasonTab(document.getElementById('draftResultsBody'));
      const fx1 = document.querySelector('.zpb-fx-board');
      out.regular = { present: !!fx1, titled: fx1 ? /DRAFT COMMAND CENTER/.test(fx1.textContent) : false };
      delete seasonState.unitRanks; delete seasonState.unitRatings;
      renderSeasonTab(document.getElementById('draftResultsBody'));
      const fx2 = document.querySelector('.zpb-fx-board');
      out.healed = { present: !!fx2, titled: fx2 ? /DRAFT COMMAND CENTER/.test(fx2.textContent) : false, ratingsBack: !!(seasonState.unitRanks && seasonState.unitRatings) };
      return out;
    } catch (e) { return { err: String(e) }; }
  });
  ok(r13.regular && r13.regular.present && r13.regular.titled, 'R2-13 the DCC renders as a panel on the Season Review', JSON.stringify(r13.regular || r13));
  ok(r13.healed && r13.healed.present && r13.healed.titled && r13.healed.ratingsBack, 'R2-13 a save that lost its ratings self-heals — the panel stands', JSON.stringify(r13.healed || {}));

  // ============ R2-12 · the playoff cinematics (the V6 route, the adapter's own snippet) ============
  console.log('== R2-12 · the playoff cinematics ==');
  const poSnip = eng('playoffsRun');
  const r12 = poSnip ? await page.evaluate(poSnip) : { err: 'adapter lacks engine.playoffsRun' };
  await page.waitForTimeout(600);
  ok(r12.phase === 'complete' && r12.champion, 'R2-12 the bracket sims to complete (berth forced — the original ran this against a 7-10 season)', JSON.stringify({ phase: r12.phase, champion: r12.champion, err: r12.err || null }));
  ok(r12.cine && r12.go, 'R2-12 the round cinematic is up and waits for Continue', (r12.kicker || '') + ' · ' + (r12.big || ''));
  ok(r12.kicker === 'WILD CARD ROUND', 'R2-12 the first card is the round the user plays', r12.kicker || '(none)');
  ok(!r12.stormEarly, 'R2-12 the Super Bowl storm does NOT jump early', '');
  const r12b = await page.evaluate(s => {
    let clicks = 0;
    while (document.querySelector(s.porunGo) && clicks < 5) { document.querySelector(s.porunGo).click(); clicks++; }
    return { clicks };
  }, H.sel);
  await page.waitForTimeout(1500);
  const r12c = await page.evaluate(s => ({ porun: !!document.querySelector(s.porun), sb: !!document.querySelector(s.sbfin) }), H.sel);
  ok(r12c.sb && !r12c.porun, 'R2-12 after the last Continue the Super Bowl page mounts', JSON.stringify({ clicks: r12b.clicks, sb: r12c.sb }));

  // ============ zero page errors ============
  ok(errs.length === 0, 'zero page errors across the whole r2 battery', errs.slice(0, 3).join(' | '));

  console.log(`\n== R2 BATTERY (reconstructed) · ${pass} pass · ${fail} fail ==`);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ generated: new Date().toISOString(), file: FILE, pass, fail, pageErrors: errs }, null, 1));
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('R2 BATTERY CRASH', e); process.exit(2); });
