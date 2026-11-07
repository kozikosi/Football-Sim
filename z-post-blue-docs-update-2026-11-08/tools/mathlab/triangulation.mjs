// T3 — triangulation generator (colors engine, read-only).
// Per slot: raw measured span · calibrated weight · volume-derived · production/EPA · AV · salary · rank corr · spread · CI · disagreement flag.
// Consumes raw-curve-witness.json (from raw-curve-witness.mjs). Optional anchors passed via env/args.
// Run: node tools/mathlab/triangulation.mjs --in=/tmp/scratchpad/witness.json
import fs from 'node:fs';
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const w = JSON.parse(fs.readFileSync(arg('in', '/tmp/scratchpad/witness.json'), 'utf8'));
const rows = Object.values(w.witness).map((r) => ({
  slot: r.slot,
  rawSpan: +r.rawSpan70_90.toFixed(3),
  rawPerOvr: +r.rawPerOvr.toFixed(4),
  calibrated: r.calibratedWeight,
  derived: +r.derivedWeight.toFixed(1),
  // anchors not yet available this round (marked UNKNOWN) — fill from real-data runs:
  volumeDerived: 'UNKNOWN',
  epaDerived: 'UNKNOWN',
  avDerived: 'UNKNOWN',
  salaryDerived: 'UNKNOWN',
  disagreement: Math.abs(r.derivedWeight - r.calibratedWeight) > 50 ? 'FLAG' : 'ok',
}));
console.log('| slot | raw span 70-90 | raw/OVR | calibrated | derived | vol | EPA | AV | salary | flag |');
console.log('|---|---|---|---|---|---|---|---|---|---|');
for (const r of rows) console.log(`| ${r.slot} | ${r.rawSpan} | ${r.rawPerOvr} | ${r.calibrated} | ${r.derived} | ${r.volumeDerived} | ${r.epaDerived} | ${r.avDerived} | ${r.salaryDerived} | ${r.disagreement} |`);
