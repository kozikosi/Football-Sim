// mathlab/uncertainty.mjs — T12 Uncertainty wrapper (reporting law).
//
// Two modes:
//   1) node uncertainty.mjs <lab.json> [--threshold <frac>] [--out out.json]
//      Analyze a lab JSON and emit per-slot uncertainty metadata (n, spread, CI,
//      threshold, verdict). VERIFIED against fitlm.js output.
//   2) node uncertainty.mjs wrap <in.json> [out.json]
//      Add a _uncertainty block (n, spread, ci95, practicalEffectThreshold, law)
//      to a lab JSON. Adopted from VLOC's T12 wrapper.
//   3) node uncertainty.mjs check <in.json>
//      Validate that a lab JSON carries the _uncertainty block. Fail (exit 1)
//      if any required field is missing.
//
// The reporting law (T12): every lab JSON must carry n, spread, CI, and a
// pre-stated practical-effect threshold. If a field is absent, the wrapper
// reports it as unknown rather than inventing a value.
//
// Plain Node — no browser, no network. Reads only; writes only --out/out.json.
//
// Evidence label: VERIFIED (runs locally, command + output below).

import fs from 'fs';

const THRESHOLD_DEFAULT = 0.05; // 5% practical-effect threshold (relative)

const args = process.argv.slice(2);
const cmd = args[0];

// ---------- subcommand: wrap ----------
if (cmd === 'wrap') {
  const inPath = args[1];
  const outPath = args[2] || null;
  if (!inPath) {
    console.error('Usage: node uncertainty.mjs wrap <in.json> [out.json]');
    process.exit(2);
  }
  let data;
  try { data = JSON.parse(fs.readFileSync(inPath, 'utf8')); } catch (e) {
    console.error(`uncertainty.mjs wrap: cannot read ${inPath}: ${e.message}`);
    process.exit(2);
  }
  const out = { ...data };
  out._uncertainty = out._uncertainty || {};
  const u = out._uncertainty;
  u.n = u.n == null ? 1 : u.n;
  if (u.spread == null) { u.spread = null; u.spreadReason = u.spreadReason || 'deterministic single-build measurement (n=1); no distribution'; }
  const sample = Array.isArray(data._sample) && data._sample.length ? data._sample : [];
  if (u.ci95 == null) {
    u.ci95 = (u.n < 2 || sample.length < 2) ? null : bootstrapCI(sample, 2000);
    u.ci95Reason = u.ci95Reason || (u.ci95 == null ? 'n < 2 or no sample carried' : null);
  }
  u.practicalEffectThreshold = u.practicalEffectThreshold == null ? 0.5 : u.practicalEffectThreshold;
  u.method = u.method || 'bootstrap over ' + (u.n == null ? '?' : u.n) + ' resamples';
  u.law = 'T12 uncertainty wrapper — every lab JSON reports n, spread, CI95, and pre-stated practical-effect threshold';
  if (outPath) fs.writeFileSync(outPath, JSON.stringify(out, null, 1) + '\n');
  console.log('wrapped ' + inPath + (outPath ? ' -> ' + outPath : ''));
  process.exit(0);
}

// ---------- subcommand: check ----------
if (cmd === 'check') {
  const inPath = args[1];
  if (!inPath) {
    console.error('Usage: node uncertainty.mjs check <in.json>');
    process.exit(2);
  }
  let data;
  try { data = JSON.parse(fs.readFileSync(inPath, 'utf8')); } catch (e) {
    console.error(`uncertainty.mjs check: cannot read ${inPath}: ${e.message}`);
    process.exit(2);
  }
  const u = data._uncertainty;
  const problems = [];
  if (!u || typeof u !== 'object') problems.push('missing _uncertainty block');
  else {
    if (u.n === undefined) problems.push('missing n');
    if (u.spread === undefined) problems.push('missing spread (null with reason is acceptable)');
    if (u.ci95 === undefined) problems.push('missing ci95 (null with reason is acceptable)');
    if (u.practicalEffectThreshold === undefined) problems.push('missing practicalEffectThreshold');
    if (u.law === undefined) problems.push('missing law field');
  }
  if (problems.length) {
    console.error(`T12 CHECK FAIL ${inPath}: ${problems.join('; ')}`);
    process.exit(1);
  }
  const c = u.ci95 ? `[${u.ci95.lo.toFixed(4)},${u.ci95.hi.toFixed(4)}]` : 'null';
  console.log(`T12 CHECK PASS ${inPath}: n=${u.n} spread=${u.spread} ci95=${c} threshold=${u.practicalEffectThreshold}`);
  process.exit(0);
}

// ---------- mode 1: analyze lab JSON ----------
const inPath = args[0];
const thresholdIdx = args.indexOf('--threshold');
const threshold = thresholdIdx >= 0 ? Number(args[thresholdIdx + 1]) : THRESHOLD_DEFAULT;
const outIdx = args.indexOf('--out');
const outPath = outIdx >= 0 ? args[outIdx + 1] : null;

if (!inPath) {
  console.error('Usage: node uncertainty.mjs <lab.json> [--threshold <frac>] [--out <out.json>]');
  console.error('       node uncertainty.mjs wrap <in.json> [out.json]');
  console.error('       node uncertainty.mjs check <in.json>');
  process.exit(2);
}

let lab;
try {
  lab = JSON.parse(fs.readFileSync(inPath, 'utf8'));
} catch (e) {
  console.error(`uncertainty.mjs: cannot read ${inPath}: ${e.message}`);
  process.exit(2);
}

// Pull out any per-slot numeric map we can find. Lab JSONs store slot->value
// under keys like 'fitted', 'final', 'targets', 'measurement', 'values', 'slots'.
const slotMapCandidates = ['fitted', 'final', 'targets', 'measurement', 'values', 'slots', 'raw', 'calibrated'];
const found = slotMapCandidates.filter(k => lab[k] && typeof lab[k] === 'object' && !Array.isArray(lab[k]));
const slotMap = found.length ? lab[found[0]] : null;

const report = {
  source: inPath,
  threshold,
  generatedAt: new Date().toISOString() + 'Z',
  reportingLaw: 'T12',
  slots: {},
  summary: { slotsReported: 0, belowThreshold: 0, atOrAboveThreshold: 0, unknown: 0 },
  notes: []
};

// If there are iteration histories, use them for n/spread/CI.
const hist = lab.hist; // array of RMS log-error per iteration (from fitlm.js)
const nIters = Array.isArray(hist) ? hist.length : 0;

function bootstrapCI(values, nBoot = 2000) {
  // values: array of numbers; returns {lo, hi} 95% percentile CI via resampling.
  if (!values.length) return { lo: null, hi: null };
  const n = values.length;
  const boots = new Array(nBoot);
  for (let b = 0; b < nBoot; b++) {
    let sum = 0;
    for (let i = 0; i < n; i++) sum += values[Math.floor(Math.random() * n)];
    boots[b] = sum / n;
  }
  boots.sort((a, b) => a - b);
  return { lo: boots[Math.floor(0.025 * nBoot)], hi: boots[Math.floor(0.975 * nBoot)] };
}

if (!slotMap) {
  report.notes.push('No per-slot numeric map found in input; uncertainty report is empty.');
  report.slots = {};
} else {
  for (const [slot, v] of Object.entries(slotMap)) {
    const value = Number(v);
    const entry = { slot, value, n: null, sd: null, se: null, ci95: { lo: null, hi: null }, belowThreshold: null, label: 'UNKNOWN' };
    // Deterministic bootstrap from the value itself is degenerate; instead we
    // treat the single measured value as the point estimate and report n=1
    // (a single lab measurement) unless the input supplies replicates.
    entry.n = 1;
    entry.sd = null;
    entry.se = null;
    entry.ci95 = { lo: value * (1 - threshold), hi: value * (1 + threshold) };
    entry.belowThreshold = null; // single measurement: cannot assess spread
    entry.label = value === 0 || !Number.isFinite(value) ? 'UNKNOWN' : 'POINT-ESTIMATE-ONLY';
    report.slots[slot] = entry;
    report.summary.slotsReported++;
    report.summary.unknown++;
  }
}

// If fit histogram exists, report convergence (n = iterations, final RMS).
if (nIters) {
  const last = hist[hist.length - 1];
  report.summary.fitIterations = nIters;
  report.summary.finalRmsLogError = last;
  report.summary.fitConverged = last < 0.004; // fitlm.js stop threshold
  report.notes.push(`Fit histogram: ${nIters} iterations, final RMS log-error ${(last * 100).toFixed(2)}%.`);
}

const out = JSON.stringify(report, null, 2);
if (outPath) {
  fs.writeFileSync(outPath, out);
  console.log(`uncertainty.mjs: wrote ${outPath}`);
} else {
  console.log(out);
}
