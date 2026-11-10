#!/usr/bin/env node
// OR's independent derivation design for P-322 (option A: design your own).
//
// Reads the Owner's 99-rule flex table from origin/architect/engine-and-seats
// (commit 97d7e9d, tools/mathlab/flex.json), computes model prices from a
// self-designed skill-profile formula, and reports exact / off-by-one / hard.
//
// Design choices (independent of Inkling's and Super's profiles):
//   * Skills: BLK COV RSH CTH RNG RUN KCK PNT, each 0-10 per role.
//   * Each role has capabilities; each destination has requirements.
//   * Price = sum over skills max(0, req[dst] - cap[src]) * weight, then tiered.
//   * Tier bands: <1 -> 0 ; <4 -> 2 ; <9 -> 6 ; else 12  (cut points 1/4/9).
//   * FB discount: nine whitelisted sources -> FB at tier 0.
//   * Cross-side floor NOT applied in this design (reported separately).
//
// Usage: node or-derive-2026-11-10.mjs

import { execSync } from 'child_process';

const flexRaw = execSync(
  'git show origin/architect/engine-and-seats:tools/mathlab/flex.json',
  { encoding: 'utf8', cwd: '/Users/kosi/Desktop/wt/or' }
);
const flex = JSON.parse(flexRaw);
const FLEX = flex.flex;

// Skill index: 0=BLK 1=COV 2=RSH 3=CTH 4=RNG 5=RUN 6=KCK 7=PNT
const CAP = {
  QB:   [1, 1, 0, 3, 1, 8, 0, 0],
  RB:   [3, 2, 0, 6, 1, 9, 0, 0],
  FB:   [8, 2, 0, 4, 0, 6, 0, 0],
  WR:   [1, 6, 0, 10, 5, 4, 0, 0],
  TE:   [7, 4, 1, 8, 2, 5, 0, 0],
  OT:   [10, 0, 0, 0, 0, 0, 0, 0],
  OG:   [9, 0, 0, 0, 0, 0, 0, 0],
  C:    [6, 0, 0, 0, 0, 0, 0, 0],
  DT:   [4, 0, 8, 0, 0, 0, 0, 0],
  EDGE: [2, 3, 10, 0, 1, 0, 0, 0],
  ILB:  [3, 4, 5, 2, 3, 1, 0, 0],
  OLB:  [3, 4, 7, 2, 2, 0, 0, 0],
  SS:   [1, 9, 3, 3, 4, 0, 0, 0],
  FS:   [1, 9, 1, 4, 9, 0, 0, 0],
  CB:   [0, 10, 0, 7, 8, 0, 0, 0],
  K:    [0, 0, 0, 0, 0, 0, 10, 0],
  P:    [0, 0, 0, 0, 0, 0, 0, 10],
};

const REQ = {
  RB:    [3, null, null, 4, null, 7, null, null],
  FB:    [7, null, null, null, null, 5, null, null],
  WR:    [null, null, null, 7, null, null, null, null],
  TE:    [5, null, null, 5, null, null, null, null],
  OT:    [8, null, null, null, null, null, null, null],
  OG:    [8, null, null, null, null, null, null, null],
  C:     [7, null, null, null, null, null, null, null],
  DT:    [null, null, 6, null, null, null, null, null],
  EDGE:  [null, null, 8, null, null, null, null, null],
  ILB:   [null, 5, 4, null, 3, null, null, null],
  OLB:   [null, 4, 5, null, 2, null, null, null],
  SS:    [null, 6, null, null, 4, null, null, null],
  FS:    [null, 8, null, null, 8, null, null, null],
  CB:    [null, 8, null, null, 6, null, null, null],
  K:     [null, null, null, null, null, null, 9, null],
  P:     [null, null, null, null, null, null, null, 9],
  NICKEL:[null, 8, null, null, 4, null, null, null],
  DIME:  [null, 9, null, null, 4, null, null, null],
};

const W = [2.0, 1.5, 1.0, 1.2, 1.0, 0.8, 2.0, 2.0];

const FB_SRC = new Set(['RB','TE','OT','OG','C','DT','EDGE','ILB','OLB']);

const OFFENSE = new Set(['QB','RB','FB','WR','TE','OT','OG','C']);
const DEFENSE = new Set(['DT','EDGE','ILB','OLB','SS','FS','CB']);
const SPECIAL = new Set(['K','P']);

function isOffense(r) { return OFFENSE.has(r); }
function isDefense(r) { return DEFENSE.has(r); }
function crossSide(src, dst) {
  return (isOffense(src) && isDefense(dst)) || (isDefense(src) && isOffense(dst));
}

function tier(x) {
  if (x < 1) return 0;
  if (x < 4) return 2;
  if (x < 9) return 6;
  return 12;
}

function price(src, dst) {
  // FB discount: nine whitelisted sources flex into FB for free.
  if (dst === 'FB' && FB_SRC.has(src)) return 0;

  const cap = CAP[src];
  const req = REQ[dst];
  if (!cap || !req) return null; // rule not expressible by this model

  let raw = 0;
  for (let i = 0; i < 8; i++) {
    if (req[i] != null) {
      const gap = req[i] - cap[i];
      if (gap > 0) raw += gap * W[i];
    }
  }
  return tier(raw);
}

// Collect all rules from flex.json
const rules = [];
for (const src of Object.keys(FLEX)) {
  const dests = FLEX[src];
  for (const dst of Object.keys(dests)) {
    rules.push({ src, dst, owner: dests[dst] });
  }
}

let nExact = 0, nOffByOne = 0, nHard = 0, nNoModel = 0;
const residuals = [];

for (const r of rules) {
  const model = price(r.src, r.dst);
  if (model === null) {
    nNoModel++;
    residuals.push({ ...r, model: null, note: 'no-model' });
    continue;
  }
  const d = Math.abs(r.owner - model);
  if (d === 0) { nExact++; }
  else if (d === 2 || d === 4 || d === 6 || d === 8 || d === 10) {
    // off by one tier in {0,2,6,12} means difference of 2, 4, 6, 8, or 10
    // but "one tier" means adjacent: 0<->2, 2<->6, 6<->12 => diff of 2, 4, or 6
    const tierOrder = [0, 2, 6, 12];
    const oi = tierOrder.indexOf(r.owner);
    const mi = tierOrder.indexOf(model);
    if (Math.abs(oi - mi) === 1) { nOffByOne++; }
    else { nHard++; }
  } else {
    nHard++;
  }
  if (d > 0) residuals.push({ ...r, model, diff: d });
}

console.log(`Rules total: ${rules.length}`);
console.log(`Exact: ${nExact} | Off-by-one-tier: ${nOffByOne} | Hard: ${nHard} | No-model: ${nNoModel}`);
console.log(`\nResiduals (owner != model):`);
for (const r of residuals) {
  console.log(`  ${r.src.padEnd(5)}->${r.dst.padEnd(7)} owner=${String(r.owner).padStart(2)} model=${r.model == null ? '—' : String(r.model).padStart(2)} ${r.note || ''}`);
}

// Hard-case check: the 6 Inkling residuals
console.log(`\n--- Hard cases (Inkling residuals: owner 0, model 2) ---`);
const inklingResiduals = [['CB','FS'],['CB','SS'],['EDGE','OLB'],['ILB','OLB'],['SS','DIME'],['SS','NICKEL']];
for (const [src, dst] of inklingResiduals) {
  const model = price(src, dst);
  const owner = FLEX[src][dst];
  console.log(`  ${src}->${dst}: owner=${owner} model=${model} ${model === owner ? 'EXACT' : model === null ? 'NO-MODEL' : 'OFF'}`);
}

console.log(`\n--- Cross-side floor: WR>DB at 6 ---`);
const wrDb = [['WR','CB'],['WR','DIME'],['WR','FS'],['WR','NICKEL'],['WR','SS']];
for (const [src, dst] of wrDb) {
  const model = price(src, dst);
  const owner = FLEX[src][dst];
  console.log(`  ${src}->${dst}: owner=${owner} model=${model} ${model === owner ? 'EXACT' : 'OFF'}`);
}

console.log(`\n--- FB free (nine sources) ---`);
for (const src of ['RB','TE','OT','OG','C','DT','EDGE','ILB','OLB']) {
  const model = price(src, 'FB');
  const owner = FLEX[src]['FB'];
  console.log(`  ${src}->FB: owner=${owner} model=${model} ${model === owner ? 'EXACT' : 'OFF'}`);
}
