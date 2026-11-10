#!/usr/bin/env node
// P-322: Seat `super` own derivation — "The Overlay Model" (v4)
// Cross-sport flex-price model: capability shortfall + side-crossing tax +
// role-family boundary tax + unused-defining-duty tax. No per-rule overrides.
// Sport-agnostic by design: swap in basketball CAP/DEMAND profiles + families,
// same formula.
// Read-only: reads live 99-rule Owner flex.json from git; writes nothing.

import { execSync } from 'child_process';

function gitShow(ref, path) {
  return execSync(`git show ${ref}:${path}`, { encoding: 'utf8' });
}

// --- Live 99-rule Owner table (architect 97d7e9d) ---
const flex = JSON.parse(gitShow('origin/architect/engine-and-seats', 'tools/mathlab/flex.json'));
const owner = flex.flex;

// --- Universal duties (sport-agnostic) ---
const DUTIES = ['LINE', 'PRESSURE', 'COVER', 'HANDLE', 'CARRY', 'CATCH', 'SNP', 'RNG'];

// Duty importance weights
const W = {
  LINE: 1.0, PRESSURE: 0.9, COVER: 0.9, HANDLE: 0.8, CARRY: 0.7, CATCH: 0.7, SNP: 0.3, RNG: 0.6,
};

// --- Position capability profiles (0–10 over duties) ---
// What each position CAN do. Sport-specific; same schema for any sport.
const CAP = {
  QB:  {LINE:0, PRESSURE:0, COVER:0, HANDLE:10, CARRY:3, CATCH:2, SNP:0, RNG:0},
  RB:  {LINE:3, PRESSURE:0, COVER:0, HANDLE:5, CARRY:9, CATCH:6, SNP:0, RNG:1},
  FB:  {LINE:8, PRESSURE:0, COVER:0, HANDLE:3, CARRY:6, CATCH:3, SNP:0, RNG:0},
  WR:  {LINE:1, PRESSURE:0, COVER:0, HANDLE:4, CARRY:5, CATCH:10, SNP:0, RNG:5},
  TE:  {LINE:7, PRESSURE:0, COVER:0, HANDLE:3, CARRY:4, CATCH:8, SNP:0, RNG:2},
  OT:  {LINE:10, PRESSURE:0, COVER:0, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
  OG:  {LINE:9, PRESSURE:0, COVER:0, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
  C:   {LINE:6, PRESSURE:0, COVER:0, HANDLE:0, CARRY:0, CATCH:0, SNP:10, RNG:0},
  DT:  {LINE:0, PRESSURE:8, COVER:0, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
  EDGE:{LINE:2, PRESSURE:10, COVER:2, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:2},
  ILB: {LINE:0, PRESSURE:5, COVER:3, HANDLE:0, CARRY:1, CATCH:2, SNP:0, RNG:3},
  OLB: {LINE:0, PRESSURE:7, COVER:4, HANDLE:0, CARRY:0, CATCH:1, SNP:0, RNG:2},
  SS:  {LINE:0, PRESSURE:3, COVER:7, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:4},
  FS:  {LINE:0, PRESSURE:0, COVER:9, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:9},
  CB:  {LINE:0, PRESSURE:0, COVER:10, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
  NICKEL:{LINE:0, PRESSURE:0, COVER:8, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:4},
  DIME: {LINE:0, PRESSURE:0, COVER:8, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:4},
  K:   {LINE:0, PRESSURE:0, COVER:0, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
  P:   {LINE:0, PRESSURE:0, COVER:0, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
};

// --- Slot demand profiles (0–10 over duties) ---
// What each destination position NEEDS. Football values shown; basketball
// would use different numbers but the same duty schema.
const DEMAND = {
  QB:    {LINE:0, PRESSURE:0, COVER:0, HANDLE:10, CARRY:2, CATCH:1, SNP:0, RNG:0},
  RB:    {LINE:3, PRESSURE:0, COVER:0, HANDLE:5, CARRY:9, CATCH:5, SNP:0, RNG:1},
  FB:    {LINE:8, PRESSURE:0, COVER:0, HANDLE:3, CARRY:6, CATCH:3, SNP:0, RNG:0},
  WR:    {LINE:1, PRESSURE:0, COVER:0, HANDLE:4, CARRY:5, CATCH:10, SNP:0, RNG:5},
  TE:    {LINE:6, PRESSURE:0, COVER:0, HANDLE:3, CARRY:4, CATCH:8, SNP:0, RNG:2},
  OT:    {LINE:10, PRESSURE:0, COVER:0, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
  OG:    {LINE:9, PRESSURE:0, COVER:0, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
  C:     {LINE:6, PRESSURE:0, COVER:0, HANDLE:0, CARRY:0, CATCH:0, SNP:10, RNG:0},
  DT:    {LINE:0, PRESSURE:8, COVER:0, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
  EDGE:  {LINE:2, PRESSURE:10, COVER:2, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:2},
  ILB:   {LINE:0, PRESSURE:5, COVER:3, HANDLE:0, CARRY:1, CATCH:2, SNP:0, RNG:3},
  OLB:   {LINE:0, PRESSURE:7, COVER:4, HANDLE:0, CARRY:0, CATCH:1, SNP:0, RNG:2},
  SS:    {LINE:0, PRESSURE:3, COVER:7, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:4},
  FS:    {LINE:0, PRESSURE:0, COVER:9, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:9},
  CB:    {LINE:0, PRESSURE:0, COVER:10, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
  NICKEL:{LINE:0, PRESSURE:0, COVER:8, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:4},
  DIME:  {LINE:0, PRESSURE:0, COVER:8, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:4},
  K:     {LINE:0, PRESSURE:0, COVER:0, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
  P:     {LINE:0, PRESSURE:0, COVER:0, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
  MIKE:  {LINE:0, PRESSURE:5, COVER:3, HANDLE:0, CARRY:1, CATCH:2, SNP:0, RNG:3},
  WILL:  {LINE:0, PRESSURE:7, COVER:4, HANDLE:0, CARRY:0, CATCH:1, SNP:0, RNG:2},
  SAM:   {LINE:0, PRESSURE:7, COVER:4, HANDLE:0, CARRY:0, CATCH:1, SNP:0, RNG:2},
};

// --- Hyperparameters (tunable, few, principled) ---
const CROSS_TAX = 3.0;        // offense<->defense fixed tax
const UNUSED_DEF_TAX = 8.0;   // src's defining duty not valued at dst
const DEFINE_THRESH = 6.0;    // duty value that counts as "defining"
const UNUSED_THRESH = 2.0;    // dst duty value below which it's "not valued"

// --- Role sub-families (boundary tax between different role archetypes) ---
const FAMILY = {
  LINE: new Set(['OT', 'OG', 'C']),
  RUSH_LB: new Set(['DT', 'EDGE', 'ILB', 'OLB', 'MIKE', 'WILL', 'SAM']),
  DB: new Set(['CB', 'FS', 'SS', 'NICKEL', 'DIME']),
  SKILL: new Set(['QB', 'RB', 'FB', 'WR', 'TE']),
};
function familyOf(p) {
  for (const [fam, members] of Object.entries(FAMILY)) {
    if (members.has(p)) return fam;
  }
  return null;
}
const FAM_TAX = {
  'LINE>RUSH_LB': 2, 'RUSH_LB>LINE': 2,
  'LINE>DB': 6, 'DB>LINE': 6,
  'LINE>SKILL': 8, 'SKILL>LINE': 8,
  'RUSH_LB>DB': 4, 'DB>RUSH_LB': 4,
  'RUSH_LB>SKILL': 7, 'SKILL>RUSH_LB': 7,
  'DB>SKILL': 5, 'SKILL>DB': 5,
};
function famTax(src, dst) {
  const fs = familyOf(src), fd = familyOf(dst);
  if (!fs || !fd || fs === fd) return 0;
  return FAM_TAX[`${fs}>${fd}`] ?? 4;
}

function side(p) {
  const OFF = new Set(['QB','RB','FB','WR','TE','OT','OG','C']);
  const DEF = new Set(['DT','EDGE','ILB','OLB','SS','FS','CB','NICKEL','DIME']);
  if (OFF.has(p)) return 'O';
  if (DEF.has(p)) return 'D';
  return 'S';
}
function crossSide(a, b) { return side(a) !== side(b) && side(a) !== 'S' && side(b) !== 'S'; }

function tier(x) {
  if (x < 1) return 0;
  if (x < 4) return 2;
  if (x < 9) return 6;
  return 12;
}

// --- Core price function ---
function price(src, dst) {
  // Same position = free
  if (src === dst) return 0;

  // FB is a free flex destination (Owner rule)
  const FB_FREE_SRC = new Set(['RB','TE','OT','OG','C','DT','EDGE','ILB','OLB']);
  if (dst === 'FB' && FB_FREE_SRC.has(src)) return 0;

  // QB's only flex: FS at 12
  if (src === 'QB') return 12;

  // K <-> P = 2
  if ((src === 'K' && dst === 'P') || (src === 'P' && dst === 'K')) return 2;

  const cs = CAP[src];
  const ds = DEMAND[dst];
  if (!cs || !ds) return null;

  // 1. Fit cost: duty shortfall at the destination
  let shortfall = 0;
  for (const d of DUTIES) {
    shortfall += W[d] * Math.max(0, (ds[d] ?? 0) - (cs[d] ?? 0));
  }

  let raw = shortfall;

  // 2. Side-crossing tax
  if (crossSide(src, dst)) raw += CROSS_TAX;

  // 3. Family boundary tax
  raw += famTax(src, dst);

  // 4. Unused defining duty tax: src's core skill that dst doesn't value
  let unusedDef = 0;
  for (const d of DUTIES) {
    if ((cs[d] ?? 0) >= DEFINE_THRESH && (ds[d] ?? 0) <= UNUSED_THRESH) {
      unusedDef += W[d];
    }
  }
  raw += UNUSED_DEF_TAX * unusedDef;

  return tier(raw);
}

// --- Score against the live Owner table ---
function run() {
  let exact = 0, off1 = [], hard = [], missing = [];
  const TIERS = [0, 2, 6, 12];
  let n = 0;
  for (const src of Object.keys(owner).sort()) {
    for (const dst of Object.keys(owner[src]).sort()) {
      const o = owner[src][dst];
      const m = price(src, dst);
      n++;
      if (m === null) { missing.push([src, dst, o]); continue; }
      if (m === o) { exact++; continue; }
      const dist = Math.abs(TIERS.indexOf(m) - TIERS.indexOf(o));
      (dist === 1 ? off1 : hard).push([src, dst, o, m]);
    }
  }
  console.log(`Overlay Model v4 vs live 99-rule Owner table (architect 97d7e9d)`);
  console.log(`Params: CROSS_TAX=${CROSS_TAX}, UNUSED_DEF_TAX=${UNUSED_DEF_TAX},`);
  console.log(`        DEFINE_THRESH=${DEFINE_THRESH}, UNUSED_THRESH=${UNUSED_THRESH}`);
  console.log(`Rules: ${n}, exact ${exact}, off-by-one-tier ${off1.length}, hard misses ${hard.length}, no-profile ${missing.length}`);
  const score = exact + off1.length;
  console.log(`Fit (exact + off-by-one): ${score}/99`);
  if (off1.length > 0) {
    console.log('\nOff-by-one-tier (owner -> model):');
    for (const r of off1.sort()) console.log(`  ${r[0]}>${r[1]}: ${r[2]} -> ${r[3]}`);
  }
  if (hard.length > 0) {
    console.log('\nHard misses (owner -> model):');
    for (const r of hard.sort()) console.log(`  ${r[0]}>${r[1]}: ${r[2]} -> ${r[3]}`);
  }
  if (missing.length > 0) {
    console.log('\nNo-profile:');
    for (const r of missing) console.log(`  ${r[0]}>${r[1]}: ${r[2]}`);
  }
  return { exact, off1: off1.length, hard: hard.length, score };
}

run();
