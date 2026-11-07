// mathlab/raw-curve-witness.mjs — T3 raw-curve witness export.
// Exports per-slot RAW (uncalibrated) curves beside calibrated weights, per build, archived.
// Read-only: measures inside headless Chromium; never writes a product file, never touches protected constants.
// usage: NODE_PATH=$(npm root -g) node raw-curve-witness.mjs <html> [--out results/raw-curve-witness-<build>-<date>.json>
//   <html> : product-like HTML (Football-Sim-PreColors.html, a Z-post-blue wave, or V23)
//   --out  : archive path (default tools/mathlab/results/raw-curve-witness-<sha16>-<date>.json)
// Reads: slotWins(s, ovr), modelWeights(), ROSTER_SLOTS from the page.
// Outputs JSON + markdown: per slot curve at ovr 50/60/70/75/80/85/90/95/99 (wins vs 80),
// raw 70->90 span, calibrated weight (700 scale), derived weight (span/0.00254, tens), quantisation error,
// build sha256, timestamp, page errors. All real-data anchor columns (volume/EPA/AV/salary) are UNKNOWN here
// until a real-data run populates them (see triangulation.mjs).
import fs from 'fs';
import crypto from 'crypto';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const [file] = process.argv.slice(2);
if (!file) { console.error('usage: node raw-curve-witness.mjs <html> [--out]'); process.exit(2); }
const outArg = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : null;
const OVS = [50, 60, 70, 75, 80, 85, 90, 95, 99];
const WINS_PER_UNIT = 0.00254; // 1 weight = 0.00254 wins (QB 1000 = 2.54)

function buildSha() {
  const bytes = fs.readFileSync(file);
  return crypto.createHash('sha256').update(bytes).digest('hex');
}
function isoNow() { return new Date().toISOString().replace(/:\d+\.\d+Z$/, 'Z'); }
function round5(x) { return Math.max(5, Math.round(x / 5) * 5); }
function round10(x) { return Math.round(x / 10) * 10; }

function inPageCurve() {
  _wTable = null; _wpoCache = null;
  const OVS = [50, 60, 70, 75, 80, 85, 90, 95, 99];
  const mw = typeof modelWeights === 'function' ? modelWeights() : null;
  const out = {};
  ROSTER_SLOTS.forEach(s => {
    let entry = null;
    try {
      const base = slotWins(s, 80);
      if (base == null) throw new Error('base null');
      const curve = OVS.map(o => slotWins(s, o) - base);
      entry = {
        ovrs: OVS.slice(),
        curve: curve.map(v => +v.toFixed(6)),
        w7090: +(slotWins(s, 90) - slotWins(s, 70)).toFixed(6),
        w8090: +(slotWins(s, 90) - slotWins(s, 80)).toFixed(6),
        w5090: +(slotWins(s, 90) - slotWins(s, 50)).toFixed(6),
        calibrated: mw && mw[s] != null ? +mw[s].toFixed(1) : null,
      };
    } catch (e) {
      entry = { ovrs: OVS.slice(), curve: OVS.map(() => null), w7090: null, w8090: null, w5090: null, calibrated: null, error: String(e) };
    }
    out[s] = entry;
  });
  return { slots: Object.keys(out), data: out, nSlots: ROSTER_SLOTS.length };
}

(async () => {
  const sha = buildSha();
  const short = sha.slice(0, 16);
  const outPath = outArg || `tools/mathlab/results/raw-curve-witness-${short}-${isoNow().slice(0, 10)}.json`;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto('file://' + file);
  await page.waitForFunction(() => typeof slotWins === 'function' && typeof ROSTER_SLOTS !== 'undefined', null, { timeout: 20000 });
  // Install dime/dl5/recv shims so the measurable slot set matches the lab fit (32 slots).
  const { installDime, installDL5, installRecv } = await import('./inpage.js');
  if (typeof installDime === 'function') await page.evaluate(`(${installDime.toString()})(${JSON.stringify({ w: 0.15, spec: { CB1: 1.4, CB2: 1.15, CB3: 1.0, DIME: 1.0, SS: 0.8, FS: 0.8, MIKE: 0.4 } })})`);
  if (typeof installDL5 === 'function') await page.evaluate(`(${installDL5.toString()})(${JSON.stringify({ share: 0.33, dl: ['DE1','DE2','DT1','DT2'], rows: { RATING_SPECS: ['passRush','frontRun'], DEF_SPECS: ['frontBase','frontNick'] } })})`);
  if (typeof installRecv === 'function') await page.evaluate(`(${installRecv.toString()})(${JSON.stringify({ row: 'rec', te3: { share: 0.0452, from: 'WR2' }, wr4: { from: [['TE1', 0.0052], ['RB1', 0.0048]] } })})`);
  const measured = await page.evaluate(inPageCurve);
  await browser.close();

  const rows = [];
  for (const [s, d] of Object.entries(measured.data)) {
    const span = d.w7090;
    if (span == null) { rows.push({ slot: s, ...d, spanWins: null, slotWinsPerOvr: null, calibrated700: d.calibrated, expected700: null, quantError700: null, derived1000: null }); continue; }
    const spo = span / 20;
    const calibrated700 = d.calibrated;
    const derived1000 = +round10(span / WINS_PER_UNIT).toFixed(1);
    rows.push({ slot: s, ...d, spanWins: span, slotWinsPerOvr: +spo.toFixed(6), calibrated700, expected700: null, quantError700: null, derived1000 });
  }
  const withSpan = rows.filter(r => r.spanWins != null);
  withSpan.sort((a, b) => b.spanWins - a.spanWins);
  // modelWeights normalises the max slotWinsPerOvr to 700 (AGENTS §3 contract)
  const maxSpo = Math.max(...withSpan.map(r => r.spanWins / 20));
  withSpan.forEach(r => {
    r.expected700 = Math.max(5, round5(r.slotWinsPerOvr / maxSpo * 700));
    r.quantError700 = r.calibrated700 == null ? null : +(r.calibrated700 - r.expected700).toFixed(1);
  });
  const n = withSpan.length;
  const spans = withSpan.map(r => r.spanWins);
  const cal = withSpan.map(r => r.calibrated700).filter(v => v != null);
  const qErrs = withSpan.map(r => r.quantError700).filter(v => v != null);
  const maxQuantErr = qErrs.length ? Math.max(...qErrs.map(Math.abs)) : null;
  const outOfContract = qErrs.filter(v => Math.abs(v) > 2.5).length;
  // rank correlation (Spearman) between raw span and calibrated weight, where both exist
  const paired = withSpan.filter(r => r.calibrated700 != null);
  const rank = a => { const idx = a.map((v, i) => [v, i]).sort((p, q) => p[0] - q[0]); const rk = new Array(a.length); idx.forEach((p, k) => { rk[p[1]] = k; }); return rk; };
  let spearman = null;
  if (paired.length >= 3) {
    const xr = rank(paired.map(r => r.spanWins)); const yr = rank(paired.map(r => r.calibrated700));
    let sxy = 0, sxx = 0, syy = 0; const mx = xr.reduce((a, b) => a + b) / xr.length, my = yr.reduce((a, b) => a + b) / yr.length;
    xr.forEach((v, i) => { sxy += (v - mx) * (yr[i] - my); sxx += (v - mx) ** 2; syy += (yr[i] - my) ** 2; });
    spearman = +(sxy / Math.sqrt(sxx * syy)).toFixed(3);
  }
  const summary = {
    buildFile: file, buildSha: sha, buildSha16: short, generatedAt: isoNow(),
    nSlots: n, slotsWithCalibrated: cal.length, pageErrors: errs.length,
    spanWinsMin: +Math.min(...spans).toFixed(4), spanWinsMax: +Math.max(...spans).toFixed(4),
    maxQuantError700: maxQuantErr, outOfContract: outOfContract, rawVsCalibratedSpearman: spearman,
    note: 'RAW = measured slotWins(s, ovr) curve, uncalibrated. CALIBRATED700 = modelWeights() 700-scale quantisation (max slot = 700). EXPECTED700 = contract prediction from raw span (monotone quantisation to 700, nearest 5, floor 5). QUANT ERROR700 = calibrated700 - expected700 (|error| <= 2.5 expected per AGENTS §3 contract). DERIVED1000 = span / 0.00254 rounded to tens (1000-QB scale, for design.json/SLOTS comparison). Volume/EPA/AV/salary anchor columns are UNKNOWN until a real-data run populates them.',
  };

  const record = { summary, rows, anchors: {
    volumeDerived: 'UNKNOWN', epaDerived: 'UNKNOWN', avDerived: 'UNKNOWN', salaryDerived: 'UNKNOWN',
    reason: 'No real-data run yet; salary table is NOT a calibration foundation (Owner P-013 ruling, binding). Populate from hash-pinned nflverse/PFR data only.',
  } };
  fs.mkdirSync('tools/mathlab/results', { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(record, null, 1));
  // markdown sidecar
  const mdPath = outPath.replace(/\.json$/, '.md');
  let md = `# Raw-curve witness — ${short}\n\nBuild: \`${file}\` (sha256 ${sha}) · generated ${isoNow()} · n slots = ${n} · page errors = ${errs.length}\n\n`;
  md += `| slot | span 70->90 (wins) | slotWinsPerOvr | derived1000 (tens) | calibrated700 | expected700 | quantErr700 | curve (wins vs 80 @ 50/60/70/75/80/85/90/95/99) |\n`;
  md += `|------|----|----|----|----|----|----|----|\n`;
  for (const r of withSpan) {
    md += `| ${r.slot} | ${r.spanWins.toFixed(3)} | ${r.slotWinsPerOvr.toFixed(4)} | ${r.derived1000} | ${r.calibrated700 == null ? 'n/a' : r.calibrated700} | ${r.expected700} | ${r.quantError700 == null ? 'n/a' : r.quantError700.toFixed(1)} | ${r.curve.map(v => v == null ? 'null' : v.toFixed(3)).join('/')} |\n`;
  }
  md += `\nRaw vs calibrated Spearman r = ${spearman == null ? 'n/a' : spearman} (${paired.length} paired slots).\n`;
  md += `Anchors: volume=${record.anchors.volumeDerived} EPA=${record.anchors.epaDerived} AV=${record.anchors.avDerived} salary=${record.anchors.salaryDerived} — ${record.anchors.reason}\n`;
  fs.writeFileSync(mdPath, md);
  console.log(JSON.stringify({ outPath, mdPath, summary }, null, 1));
  process.exit(errs.length > 0 ? 1 : 0);
})().catch(e => { console.error(e); process.exit(4); });
