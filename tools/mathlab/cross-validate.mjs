// mathlab/cross-validate.mjs — Cross-validate Super's Pre-Colors product measurements
// against Beam's Colors-engine measurements (same underlying math, two toolchains).
//
// Reads:
//   --super  <fit JSON>    (Super's fitlm.js output: tools/mathlab/results/fit-super-verify-2026-11-07.json)
//   --beam   <witness JSON> (Beam's raw-curve-witness.mjs output: /tmp/beam-witness-out.json)
//
// For each slot in common, compares:
//   superRawSpan  = fit.final[slot]  (wins, 70->90, from Pre-Colors HTML product)
//   beamRawSpan   = witness[slot].rawSpan70_90 (wins, 70->90, from Colors TS engine)
//   diff = |super - beam|,  diffPct = diff / beam * 100
//
// Flag if diffPct > 1% (the two toolchains should measure the same engine math).
//
// Plain Node — no browser. Read-only. Writes only --out.
//
// Evidence label: VERIFIED (runs locally against produced outputs).

import fs from 'fs';

const args = process.argv.slice(2);
const get = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : null; };
const superPath = get('--super');
const beamPath = get('--beam');
const outPath = get('--out');
const THRESHOLD_PCT = Number(get('--threshold') || 1.0);

if (!superPath || !beamPath) {
  console.error('Usage: node cross-validate.mjs --super <fit.json> --beam <witness.json> [--threshold <pct>] [--out <out.json>]');
  process.exit(2);
}

let sup, beam;
try { sup = JSON.parse(fs.readFileSync(superPath, 'utf8')); } catch (e) { console.error(`cannot read super fit ${superPath}: ${e.message}`); process.exit(2); }
try { beam = JSON.parse(fs.readFileSync(beamPath, 'utf8')); } catch (e) { console.error(`cannot read beam witness ${beamPath}: ${e.message}`); process.exit(2); }

const superFinal = sup.final || sup.fitted || {};   // slot -> wins (70->90 span), from Pre-Colors product
const beamWitness = beam.witness || {};             // slot -> {rawSpan70_90, ...}, from Colors engine

const slots = new Set([...Object.keys(superFinal), ...Object.keys(beamWitness)]);

const rows = [];
let nFlag = 0, nCommon = 0;
for (const slot of slots) {
  const s = Number(superFinal[slot]);
  const b = beamWitness[slot] ? Number(beamWitness[slot].rawSpan70_90) : null;
  const row = { slot, superRawSpan: s != null ? +s.toFixed(6) : null, beamRawSpan: b != null ? +b.toFixed(6) : null };
  if (s != null && b != null && b > 0) {
    nCommon++;
    const diff = Math.abs(s - b);
    const diffPct = (diff / b) * 100;
    const flag = diffPct > THRESHOLD_PCT;
    if (flag) nFlag++;
    row.diffWins = +diff.toFixed(6);
    row.diffPct = +diffPct.toFixed(4);
    row.flag = flag;
    row.label = flag ? 'MISMATCH' : 'AGREE';
  } else {
    row.diffWins = null;
    row.diffPct = null;
    row.flag = null;
    row.label = 'MISSING-DATA';
  }
  rows.push(row);
}

const agree = rows.filter(r => r.label === 'AGREE').length;
const mismatch = rows.filter(r => r.label === 'MISMATCH').length;
const missing = rows.filter(r => r.label === 'MISSING-DATA').length;

const report = {
  tool: 'cross-validate (Super vs Beam, T3/T1 cross-toolchain)',
  superSource: superPath,
  beamSource: beamPath,
  thresholdPct: THRESHOLD_PCT,
  nSlots: rows.length,
  nCommon: nCommon,
  nAgree: agree,
  nMismatch: mismatch,
  nMissing: missing,
  allAgree: mismatch === 0 && missing === 0,
  maxDiffPct: rows.filter(r => r.diffPct != null).length
    ? (+Math.max(...rows.filter(r => r.diffPct != null).map(r => r.diffPct)).toFixed(4))
    : null,
  generatedAt: new Date().toISOString() + 'Z',
  reportingLaw: 'T12',
  note: 'Pre-Colors product (fitlm.js via playwright) vs Colors TS engine (raw-curve-witness.mjs). Same underlying slotWins() math; both should agree within rounding. FLAG = diff > 1%.',
  slots: rows,
};

const out = JSON.stringify(report, null, 2);
if (outPath) { fs.writeFileSync(outPath, out); console.log(`cross-validate.mjs: wrote ${outPath}`); }
else { console.log(out); }
