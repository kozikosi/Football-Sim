#!/usr/bin/env node
// OR's independent verification of the E5 hybrid derivation (P-322).
//
// Re-implements: Inkling's P-322 formula + cross-side floor + same-group A halved
//   + re-fit cuts (1.5, 4, 9)  ->  E5.
//
// Runs against the live 99-rule Owner table at origin/architect/engine-and-seats:97d7e9d
//   and reports exact / off-by-one / hard.
//
// Usage: node _agents/or/deliveries/or-verify-E5-2026-11-10.mjs

import { execSync } from 'child_process';

const flexRaw = execSync(
  'git show origin/architect/engine-and-seats:tools/mathlab/flex.json',
  { encoding: 'utf8', cwd: '/Users/kosi/Desktop/wt/or' }
);
const flex = JSON.parse(flexRaw);
const FLEX = flex.flex;

const OFFENSE = new Set(['QB','RB','FB','WR','TE','OT','OG','C']);
const DEFENSE = new Set(['DT','EDGE','ILB','OLB','SS','FS','CB','NICKEL','DIME']);

function isCrossSide(src, dst) {
  const sOff = OFFENSE.has(src);
  const dOff = OFFENSE.has(dst);
  const sDef = DEFENSE.has(src);
  const dDef = DEFENSE.has(dst);
  return (sOff && dDef) || (sDef && dOff);
}

// Inkling profiles (P-328-verified)
const S = {
  QB:   { BLK: 1, CTH: 2, COV: 2, RNG: 1, RSH: 2, RUN: 8, SNP: 0 },
  RB:   { BLK: 3, CTH: 6, COV: 2, RNG: 1, RSH: 0, RUN: 9, SNP: 0 },
  FB:   { BLK: 8, CTH: 2, COV: 2, RNG: 0, RSH: 0, RUN: 6, SNP: 0 },
  WR:   { BLK: 1, CTH: 10, COV: 6, RNG: 5, RSH: 0, RUN: 4, SNP: 0 },
  TE:   { BLK: 7, CTH: 8, COV: 4, RNG: 2, RSH: 0, RUN: 5, SNP: 0 },
  OT:   { BLK: 10, CTH: 0, COV: 0, RNG: 0, RSH: 0, RUN: 0, SNP: 5 },
  OG:   { BLK: 9, CTH: 0, COV: 0, RNG: 0, RSH: 0, RUN: 0, SNP: 6 },
  C:    { BLK: 6, CTH: 0, COV: 0, RNG: 0, RSH: 0, RUN: 0, SNP: 10 },
  DT:   { BLK: 0, CTH: 0, COV: 0, RNG: 0, RSH: 8, RUN: 0, SNP: 0 },
  EDGE: { BLK: 2, CTH: 0, COV: 3, RNG: 2, RSH: 10, RUN: 0, SNP: 0 },
  ILB:  { BLK: 0, CTH: 2, COV: 3.5, RNG: 3, RSH: 5, RUN: 1, SNP: 0 },
  OLB:  { BLK: 0, CTH: 2, COV: 4.5, RNG: 2, RSH: 7, RUN: 0, SNP: 0 },
  SS:   { BLK: 0, CTH: 3, COV: 9, RNG: 4, RSH: 3, RUN: 0, SNP: 0 },
  FS:   { BLK: 0, CTH: 4, COV: 9, RNG: 9, RSH: 1, RUN: 0, SNP: 0 },
  CB:   { BLK: 0, CTH: 7, COV: 10, RNG: 8, RSH: 0, RUN: 0, SNP: 0 },
  K:    { BLK: 0, CTH: 0, COV: 0, RNG: 0, RSH: 0, RUN: 0, SNP: 0, KCK: 10, PNT: 0 },
  P:    { BLK: 0, CTH: 0, COV: 0, RNG: 0, RSH: 0, RUN: 0, SNP: 0, KCK: 0, PNT: 10 },
  NICKEL: { BLK: 0, CTH: 5, COV: 9, RNG: 4, RSH: 0, RUN: 0, SNP: 0 },
  DIME:   { BLK: 0, CTH: 4, COV: 9.5, RNG: 4, RSH: 0, RUN: 0, SNP: 0 },
};

const BETA = { BLK: 0.75, CTH: 0.5, COV: 0.5, RNG: 0.6, RSH: 0.8, RUN: 1.1, SNP: 0.4, KCK: 0.2, PNT: 0.2 };
const DMULT = { NICKEL: 1.7, DIME: 3.6, FS: 2.0 };
const U = { 'RB>TE': 3.0, 'SS>ILB': 5.0, 'TE>ILB': 6.4, 'RB>SS': 6.6, 'EDGE>SS': 5.1 };
const OVERRIDE = {
  'C>OG': 6, 'FB>RB': 2, 'FB>TE': 6, 'EDGE>RB': 6, 'EDGE>ILB': 6,
};
const FB_FREE = new Set(['RB','TE','OT','OG','C','DT','EDGE','ILB','OLB']);

// thetaprice D@90 + OLB bump (from architect results/thetaprice-2026-11-09.md + relay)
const D = {};
{
  const tp = execSync(
    'git show origin/architect/engine-and-seats:tools/mathlab/results/thetaprice-2026-11-09.md',
    { encoding: 'utf8', cwd: '/Users/kosi/Desktop/wt/or' }
  );
  for (const line of tp.split('\n')) {
    const m = line.match(/^\|\s*([A-Z]+)>([A-Z0-9]+)\s*\|\s*\d+\s*\|\s*[\d.]+\s*\|\s*[\d.]+\s*\|\s*[\d.]+\s*\|\s*([\d.]+)\s*\|/);
    if (m) {
      const pair = m[1] + '>' + m[2];
      const val = parseFloat(m[3]);
      if (val > 0) D[pair] = val;
    }
  }
}
const D_bumped = { ...D };
D_bumped['OLB>ILB'] = 6.7;
D_bumped['OLB>SS'] = 6.7;

function tier(x, cuts) {
  if (x < cuts[0]) return 0;
  if (x < cuts[1]) return 2;
  if (x < cuts[2]) return 6;
  return 12;
}

function model_price(src, dst, cuts, same_group, gate_d2) {
  cuts = cuts || [1, 4, 9];
  same_group = same_group; // null | 'half' | 'zero'
  gate_d2 = gate_d2;
  if (dst === 'SAM') return model_price(src, 'OLB', cuts, same_group, gate_d2);
  if (dst === 'FB' && FB_FREE.has(src)) return 0;
  const key = src + '>' + dst;
  if (key in OVERRIDE) return OVERRIDE[key];
  if (src === dst) return 0;
  const Dv = D_bumped[key] !== undefined ? D_bumped[key] : 0;
  const ps = S[src];
  const pd = S[dst];
  if (!ps || !pd) return null;
  let A = 0;
  for (const skill of Object.keys(BETA)) {
    const beta = BETA[skill];
    if (skill === 'RUN' && dst !== 'RB') continue;
    if (skill === 'SNP' && dst !== 'C') continue;
    if (skill === 'KCK' && dst !== 'K') continue;
    if (skill === 'PNT' && dst !== 'P') continue;
    const psv = ps[skill] !== undefined ? ps[skill] : 0;
    const pdv = pd[skill] !== undefined ? pd[skill] : 0;
    let gap = Math.max(0, pdv - psv);
    let b = beta;
    if (skill === 'COV' && (dst === 'NICKEL' || dst === 'DIME' || dst === 'FS')) b = beta * DMULT[dst];
    if ((skill === 'COV' || skill === 'RNG') && (psv >= 9)) b = b * 0.5;
    if (skill === 'BLK' && psv >= 8 && pdv >= 8) gap = 0;
    A += b * gap;
  }
  if (Dv >= 5) A = 0;
  else if (Dv >= 4) A = A * 0.5;
  if (gate_d2 && Dv < 2) A = 0;
  if (same_group) {
    const DB = new Set(['CB','FS','SS','NICKEL','DIME']);
    const LB = new Set(['ILB','OLB']);
    const DL = new Set(['DT','EDGE']);
    if (DB.has(src) && DB.has(dst) || LB.has(src) && LB.has(dst) || DL.has(src) && DL.has(dst)) {
      if (same_group === 'half') A = A * 0.5;
      else if (same_group === 'zero') A = 0;
    }
  }
  const u = U['' + src + '>' + dst] || 0;
  const x = Math.max(0, Dv) + A + u;
  return tier(Math.min(Math.max(x, 0), 12), cuts);
}

function model_price_floor(src, dst, cuts, same_group, gate_d2) {
  cuts = cuts || [1, 4, 9];
  same_group = same_group;
  gate_d2 = gate_d2;
  const m = model_price(src, dst, cuts, same_group, gate_d2);
  if (m === null) return null;
  if (dst !== 'FB' && isCrossSide(src, dst) && m < 6) return 6;
  return m;
}

// Compare
function compare(priceFn) {
  let exact = 0, off1 = [], hard = [], missing = [];
  const pairs = [];
  for (const src of Object.keys(FLEX)) {
    const dests = FLEX[src];
    for (const dst of Object.keys(dests)) {
      const o = dests[dst];
      const m = priceFn(src, dst);
      pairs.push({ src, dst, o, m });
      if (m === null) { missing.push({ src, dst, o }); continue; }
      if (m === o) { exact++; }
      else {
        const tiers = [0, 2, 6, 12];
        const d = Math.abs(tiers.indexOf(m) - tiers.indexOf(o));
        if (d === 1) off1.push({ src, dst, o, m });
        else hard.push({ src, dst, o, m });
      }
    }
  }
  return { exact, off1, hard, missing, pairs };
}

function run(name, priceFn) {
  const { exact, off1, hard, missing, pairs } = compare(priceFn);
  console.log(`\n${name}: exact ${exact}, off-by-one ${off1.length}, hard ${hard.length}, no-profile ${missing.length}`);
  console.log(`  residuals: ${JSON.stringify({ off1: off1.map(r => r.src + '>' + r.dst + '=' + r.o + '/' + r.m), hard: hard.map(r => r.src + '>' + r.dst + '=' + r.o + '/' + r.m) })}`);
  return { exact, off1, hard, pairs };
}

// Baseline: floor, cuts 1/4/9
const base = run('BASELINE (floor, cuts 1/4/9)', (s, d) => model_price_floor(s, d, [1,4,9], null, false));
const baseExactSet = new Set(base.pairs.filter(p => p.m !== null && p.m === p.o).map(p => p.src + '>' + p.dst));

// E5: same-group A halved + cuts (1.5,4,9)
const e5 = run('E5 (same-group half + cuts 1.5,4,9)', (s, d) => model_price_floor(s, d, [1.5,4,9], 'half', false));

// E5 with EDGE>OLB in OVERRIDE
const origOverride = OVERRIDE;
const e5_override = run('E5 + EDGE>OLB override', (s, d) => {
  if (s + '>' + d === 'EDGE>OLB') return 0;
  return model_price_floor(s, d, [1.5,4,9], 'half', false);
});

// E5 details for FS>SS and EDGE>OLB
console.log(`\n--- E5 FS>SS (owner 2, model) ---`);
console.log('FS>SS owner=' + FLEX['FS']['SS'] + ' E5 model=' + e5.pairs.filter(p=>p.src==='FS'&&p.dst==='SS')[0].m);
console.log(`--- E5 EDGE>OLB (owner 0, model) ---`);
console.log('EDGE>OLB owner=' + FLEX['EDGE']['OLB'] + ' E5 model=' + e5.pairs.filter(p=>p.src==='EDGE'&&p.dst==='OLB')[0].m);

console.log(`\nExpected E5: exact 97, off-by-one 2, hard 0. Got: exact ${e5.exact}, off-by-one ${e5.off1.length}, hard ${e5.hard.length}.`);
