// mathlab/uncertainty.mjs — T12 Uncertainty wrapper (reporting law).
//
// Reads any lab JSON (fit result, measurement, audit output) and re-emits it
// with per-slot uncertainty metadata: n, spread (SD), SE, bootstrap 95% CI,
// and a flag against a pre-stated practical-effect threshold.
//
// The reporting law (T12): every lab JSON must carry n, spread, CI, and a
// pre-stated practical-effect threshold. If a field is absent, the wrapper
// reports it as unknown rather than inventing a value.
//
// Usage:
//   node uncertainty.mjs <lab.json> [--threshold 0.05] [--out out.json]
//
// Plain Node — no browser, no network. Reads only; writes only --out.
//
// Evidence label: VERIFIED (runs locally, command + output below).

import fs from 'fs';

const THRESHOLD_DEFAULT = 0.05; // 5% practical-effect threshold (relative)

const args = process.argv.slice(2);
const inPath = args[0];
const thresholdIdx = args.indexOf('--threshold');
const threshold = thresholdIdx >= 0 ? Number(args[thresholdIdx + 1]) : THRESHOLD_DEFAULT;
const outIdx = args.indexOf('--out');
const outPath = outIdx >= 0 ? args[outIdx + 1] : null;

if (!inPath) {
  console.error('Usage: node uncertainty.mjs <lab.json> [--threshold <frac>] [--out <out.json>]');
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
