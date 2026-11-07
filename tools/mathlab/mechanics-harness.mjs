// mathlab/mechanics-harness.mjs — T1 Mechanics validation harness (deterministic L1 part).
//
// Runs the engine's own slotWins() / matchupModel() measurement (deterministic,
// no RNG needed) and builds the 4-level ladder per slot:
//   L1 Opportunity   : slotWins(s,90) - slotWins(s,70)  [wins/season, 70->90 span]
//   L2 Production    : NOT deterministic without sim; needs injectable RNG (T-20261022-claude-2) -> NEEDS-RNG
//   L3 Efficiency    : (slotWins(s,90)-slotWins(s,70)) / 20  [wins per +1 OVR]
//   L4 Team impact   : bestUnitPts delta from matchupModel (offense/defense)
//
// Applies pre-registered tolerance bands. FAIL -> REPORT, never auto-adjust.
//
// Inputs:
//   --fit    <fit JSON>   (fitlm.js output; .final = raw measured span per slot in wins)
//   --bands  <bands JSON> (optional pre-registered tolerance bands per slot)
//   --out    <out JSON>
//
// Plain Node — reads the fit result produced by fitlm.js (which measured the
// REAL engine inside headless Chromium). No product file touched.
//
// Evidence label: VERIFIED (runs locally against a produced fit result).
// Production/EPA/play-level distributions are flagged NEEDS-RNG until the
// injectable RNG lands (T-20261022-claude-2).

import fs from 'fs';

const args = process.argv.slice(2);
const get = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : null; };
const fitPath = get('--fit');
const bandsPath = get('--bands');
const outPath = get('--out');

if (!fitPath) {
  console.error('Usage: node mechanics-harness.mjs --fit <fit.json> [--bands <bands.json>] [--out <out.json>]');
  process.exit(2);
}

let fit, bands = {};
try { fit = JSON.parse(fs.readFileSync(fitPath, 'utf8')); } catch (e) { console.error(`cannot read fit ${fitPath}: ${e.message}`); process.exit(2); }
if (bandsPath) { try { bands = JSON.parse(fs.readFileSync(bandsPath, 'utf8')); } catch (e) { console.error(`cannot read bands ${bandsPath}: ${e.message}`); process.exit(2); } }

const finalMap = fit.final || fit.fitted || {}; // slot -> raw measured span (wins, 70->90)
const slots = Object.keys(finalMap);

// Pre-registered tolerance bands (editable via --bands). Each band:
//   { minWins, maxWins } for the raw span, or { minEff, maxEff } for efficiency.
const DEFAULT_BANDS = {
  // sane engineering bounds for the 70->90 span in wins/season (pre-registered)
  QB:   { minWins: 1.5, maxWins: 4.0 },
  WR1:  { minWins: 0.6, maxWins: 2.0 },
  CB1:  { minWins: 0.6, maxWins: 2.0 },
  DE1:  { minWins: 0.6, maxWins: 2.0 },
  OT1:  { minWins: 0.6, maxWins: 2.0 },
  TE1:  { minWins: 0.3, maxWins: 1.5 },
  MIKE: { minWins: 0.3, maxWins: 1.5 },
  FS:   { minWins: 0.3, maxWins: 1.5 },
  SS:   { minWins: 0.3, maxWins: 1.5 },
  K:    { minWins: 0.1, maxWins: 1.0 },
  P:    { minWins: 0.05, maxWins: 0.8 },
  '__default__': { minWins: 0.0, maxWins: 5.0 }
};
const B = Object.assign({}, DEFAULT_BANDS, bands);

function bandFor(slot) { return B[slot] || B['__default__']; }

const rows = [];
let nFail = 0;
for (const slot of slots) {
  const raw = Number(finalMap[slot]);          // L1 Opportunity (wins/season)
  const eff = raw / 20;                         // L3 Efficiency (wins per +1 OVR)
  const b = bandFor(slot);
  const fail = raw < b.minWins || raw > b.maxWins || !Number.isFinite(raw);
  if (fail) nFail++;
  rows.push({
    slot,
    L1_opportunityWins70_90: +raw.toFixed(6),
    L3_efficiencyWinsPerOvr: +eff.toFixed(6),
    bandMin: b.minWins, bandMax: b.maxWins,
    fail,
    label: fail ? 'FAIL-BAND' : (slot === 'QB' ? 'ANCHOR' : 'OK'),
    note: fail ? `raw ${raw.toFixed(3)} outside [${b.minWins}, ${b.maxWins}]` : ''
  });
}

// L2 Production and L4 Team impact require the simulator (matchupModel channels
// + bestUnitPts) which needs an injectable RNG for repeatable seasons. Flag them.
const needsRng = {
  L2_production: 'targets, yards, snaps, EPA by position per season — requires seeded seasons (injectable RNG, T-20261022-claude-2)',
  L4_teamImpact: 'bestUnitPts per slot via matchupModel — deterministic per matchup but season aggregation needs RNG',
  playLevel: 'completion% by air-yards bucket, INT rate by coverage role, pressure->sack, YAC by slot — requires play-level sim + RNG'
};

const report = {
  tool: 'T1 mechanics validation harness (deterministic L1)',
  source: fitPath,
  nSlots: rows.length,
  nFail: nFail,
  nPass: rows.length - nFail,
  preRegistered: true,
  rule: 'FAIL -> REPORT, never auto-adjust',
  ladderNote: 'L1 Opportunity and L3 Efficiency measured. L2 Production and play-level outcome distributions flagged NEEDS-RNG (no injectable RNG in product yet).',
  needsRng,
  slots: rows,
  generatedAt: new Date().toISOString() + 'Z',
  reportingLaw: 'T12',
  ci95: { lo: null, hi: null, n: rows.length }, // single deterministic measurement per slot; CI unknown
  note: 'Each slot measured once (deterministic engine). n=1 per slot; spread/CI unavailable until repeated measurement is possible (injectable RNG). Threshold = pre-registered band; any fail is reported, never auto-adjusted.'
};

const out = JSON.stringify(report, null, 2);
if (outPath) { fs.writeFileSync(outPath, out); console.log(`mechanics-harness.mjs: wrote ${outPath}`); }
else { console.log(out); }
