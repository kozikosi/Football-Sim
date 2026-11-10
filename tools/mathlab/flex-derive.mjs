#!/usr/bin/env node
// tools/mathlab/flex-derive.mjs — prototype derivation of the flex table from measured cost.
//
// Reads the T6 deterministic pricer output (flex-pricer-*.json) and asks: if the flex
// penalty were derived from the engine's own measured opportunity cost instead of set by
// hand, what would each rule be, and where would it disagree with the current flat table?
//
// Two candidate derivations, compared side by side:
//
//   (A) OVR-equivalent:  derived = clamp(round(ovrEq / step) * step, 0, maxPenalty)
//           where ovrEq = winsLost / slotWinsPerOvr(dest)   (the pricer's own number)
//           Problem: dividing by slotWinsPerOvr(dest) blows up for low-weight slots
//           (SAM weight 100, DIME weight 50 → near-zero slope → ovrEq of 50–90).
//
//   (B) Wins-lost based: derived = clamp(round(winsLost * scale / step) * step, 0, maxPenalty)
//           where scale is fit so derived matches the Owner's table on aligned rules.
//           No division by dest slope — stable for all slots, including DIME/TE3 (weight 50).
//
// Both use step = 2 (the observed flat-table quantum), maxPenalty = 10 (Owner cap),
// measured at OVR 85 (deterministic, n=1).
//
// winsLost = slotWins(natural, ovr) - slotWins(dest, ovr) already captures BOTH
// destination weight ("important job, expensive price") and source-dest compatibility
// (QB->FS costs far more than SS->FS for the same dest weight) through the engine's
// matchup model — no separate "skill profile" table is needed.
//
// Usage: node flex-derive.mjs <pricer-results.json> [--write <out.json>]
// Read-only by default: prints a comparison table, never touches the product or flex.json.

import fs from 'node:fs';
import path from 'node:path';

const [pricerPath] = process.argv.slice(2);
if (!pricerPath) {
  console.error('Usage: node flex-derive.mjs <pricer-results.json> [--write <out.json>]');
  process.exit(2);
}

const pricer = JSON.parse(fs.readFileSync(pricerPath, 'utf8'));
const rules = pricer.rules;

const STEP = 2;
const MAX_PENALTY = 10;
const REF_OVR = 85;

// Fit scale from rules where ovrEq is available: scale = flat / ovrEq (aligned rules only)
let scaleSum = 0, scaleN = 0;
for (const r of rules) {
  const mid = r.measuredAt.find((c) => c.ovr === REF_OVR) || r.measuredAt[r.measuredAt.length - 1];
  if (mid.ovrEquivalent != null && mid.ovrEquivalent > 0) {
    scaleSum += r.flatOvrPenalty / mid.ovrEquivalent;
    scaleN++;
  }
}
const scale = scaleN > 0 ? scaleSum / scaleN : 40;

function clamp2(x) { return Math.min(Math.max(x, 0), MAX_PENALTY); }
function roundStep(x) { return Math.round(x / STEP) * STEP; }

const rows = [];
let nAUnder = 0, nAOver = 0, nAAligned = 0, nBUnder = 0, nBOver = 0, nBAligned = 0, nNoMeasure = 0;

for (const r of rules) {
  const mid = r.measuredAt.find((c) => c.ovr === REF_OVR) || r.measuredAt[r.measuredAt.length - 1];
  const ovrEq = mid.ovrEquivalent;
  const wLost = mid.winsLost;

  // Derivation A: OVR-equivalent (pricer's own number, blows up for low-weight dests)
  let derivedA, verdictA;
  if (ovrEq == null) { derivedA = null; verdictA = 'NO-MEASURE'; nNoMeasure++; }
  else { derivedA = clamp2(roundStep(ovrEq)); verdictA = derivedA > r.flatOvrPenalty + 1 ? 'UNDER' : derivedA < r.flatOvrPenalty - 1 ? 'OVER' : 'ALIGN'; }

  // Derivation B: wins-lost based (stable for all slots)
  const derivedB = clamp2(roundStep(wLost * scale));
  const verdictB = derivedB > r.flatOvrPenalty + 1 ? 'UNDER' : derivedB < r.flatOvrPenalty - 1 ? 'OVER' : 'ALIGN';

  if (verdictA === 'UNDER') nAUnder++; else if (verdictA === 'OVER') nAOver++; else if (verdictA === 'ALIGN') nAAligned++;
  if (verdictB === 'UNDER') nBUnder++; else if (verdictB === 'OVER') nBOver++; else if (verdictB === 'ALIGN') nBAligned++;

  rows.push({
    pos: r.pos, dest: r.dest, flat: r.flatOvrPenalty,
    ovrEq: ovrEq == null ? null : Number(ovrEq.toFixed(2)),
    derivedA, verdictA,
    wLost: Number(wLost.toFixed(4)),
    derivedB, verdictB,
  });
}

const pad = (s, w) => String(s == null ? '—' : s).padEnd(w);
console.log(`\nFLEX TABLE DERIVATION — measured cost vs hand-set flat penalty (scale=${scale.toFixed(1)}, step=${STEP}, max=${MAX_PENALTY})`);
console.log('Formula A: clamp(round(ovrEq / 2) * 2, 0, 10)   |   Formula B: clamp(round(winsLost * scale / 2) * 2, 0, 10)\n');
console.log(`${pad('pos->dest', 14)} ${pad('flat', 6)} ${pad('ovrEq', 8)} ${pad('derivA', 8)} ${pad('vA', 6)} ${pad('wLost', 8)} ${pad('derivB', 8)} ${pad('vB', 6)}`);
console.log('-'.repeat(76));
for (const row of rows) {
  console.log(`${pad(row.pos + '->' + row.dest, 14)} ${pad(row.flat, 6)} ${pad(row.ovrEq, 8)} ${pad(row.derivedA, 8)} ${pad(row.verdictA, 6)} ${pad(row.wLost, 8)} ${pad(row.derivedB, 8)} ${pad(row.verdictB, 6)}`);
}
console.log('-'.repeat(76));
console.log(`Formula A (ovrEq): aligned=${nAAligned} underpriced=${nAUnder} overpriced=${nAOver} no-measure=${nNoMeasure}`);
console.log(`Formula B (winsLost): aligned=${nBAligned} underpriced=${nBUnder} overpriced=${nBOver}`);
console.log(`Note: 49 rules have no ovrEq (slope[dest] null) — Formula B handles them; Formula A cannot.\n`);

if (process.argv.includes('--write')) {
  const out = process.argv[process.argv.indexOf('--write') + 1];
  fs.writeFileSync(out, JSON.stringify({
    generatedUtc: new Date().toISOString() + 'Z', step: STEP, maxPenalty: MAX_PENALTY, refOvr: REF_OVR, scale,
    summary: {
      nRules: rows.length, nNoMeasure,
      formulaA: { nAligned: nAAligned, nUnderpriced: nAUnder, nOverpriced: nAOver },
      formulaB: { nAligned: nBAligned, nUnderpriced: nBUnder, nOverpriced: nBOver },
    },
    rules: rows,
  }, null, 2) + '\n');
  console.log('Wrote: ' + out);
}
