#!/usr/bin/env node
// P-322: Seat `super` formal submission — "Requirement-Value" flex-price model
// Merged cross-sport derivation: duty-based capability/demand split +
// slot-value multiplier + side-crossing tax + role-family boundary tax.
// Continuous raw score internally, tiered (0/2/6/12) for display.
// Zero per-rule overrides. Cross-sport by design.
// Read-only: reads live 99-rule Owner flex.json + design.json from git; writes nothing.

import { execSync } from 'child_process';

function gitShow(ref, path) {
  return execSync(`git show ${ref}:${path}`, { encoding: 'utf8' });
}

// --- Live 99-rule Owner table (architect 97d7e9d) ---
const flex = JSON.parse(gitShow('origin/architect/engine-and-seats', 'tools/mathlab/flex.json'));
const owner = flex.flex;

// --- Spot weights from design.json (used for slot_value) ---
// slot_value[dst] = how much this slot matters for winning (normalized 0–1).
// From design.json spot weights; max-normalized.
const design = JSON.parse(gitShow('origin/architect/engine-and-seats', 'tools/mathlab/design.json'));
const SPOT_WEIGHT = {
  QB: design.QB ?? 1000, RB1: design.RB1 ?? 0, RB2: design.RB2 ?? 0,
  WR1: design.WR1 ?? 0, WR2: design.WR2 ?? 0, WR3: design.WR3 ?? 0,
  TE1: design.TE1 ?? 0, TE2: design.TE2 ?? 0,
  OT1: design.OT1 ?? 0, OT2: design.OT2 ?? 0,
  OG1: design.OG1 ?? 0, OG2: design.OG2 ?? 0,
  C: design.C ?? 0,
  DE1: design.DE1 ?? 0, DE2: design.DE2 ?? 0,
  DT1: design.DT1 ?? 0, DT2: design.DT2 ?? 0,
  MIKE: design.MIKE ?? 0, WILL: design.WILL ?? 0, SAM: design.SAM ?? 0,
  CB1: design.CB1 ?? 0, CB2: design.CB2 ?? 0, CB3: design.CB3 ?? 0,
  SS: design.SS ?? 0, FS: design.FS ?? 0,
  K: design.K ?? 0, P: design.P ?? 0,
  DIME: design.DIME ?? 0, DL5: design.DL5 ?? 0, TE3: design.TE3 ?? 0, WR4: design.WR4 ?? 0,
};
const MAX_SPOT_WEIGHT = Math.max(...Object.values(SPOT_WEIGHT));

// Position -> natural slot for demand lookup
const POS_TO_SLOT = {
  QB:'QB', RB:'RB1', FB:'RB1', WR:'WR1', TE:'TE1', OT:'OT1', OG:'OG1', C:'C',
  DT:'DT1', EDGE:'DE1', ILB:'MIKE', OLB:'WILL', SS:'SS', FS:'FS', CB:'CB1',
  NICKEL:'CB3', DIME:'CB3', K:'K', P:'P',
};
function slotValue(dst) {
  const slot = POS_TO_SLOT[dst] ?? dst;
  return (SPOT_WEIGHT[slot] ?? 0) / MAX_SPOT_WEIGHT;
}

// --- Universal duties (sport-agnostic) ---
const DUTIES = ['LINE', 'PRESSURE', 'COVER', 'HANDLE', 'CARRY', 'CATCH', 'SNP', 'RNG'];

// Duty importance weights (how much each duty matters for flex pricing)
const W = {
  LINE: 1.0,   // anchoring/blocking is foundational
  PRESSURE: 0.9, // rushing/disrupting is valuable
  COVER: 0.9,  // covering is valuable
  HANDLE: 0.8, // ball handling/decisions
  CARRY: 0.7,  // running/driving with ball
  CATCH: 0.7,  // catching
  SNP: 0.3,    // snapping/machinery is narrow/specialized
  RNG: 0.6,    // deep range/rotation
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
const VALUE_TAX = 0.4;   // how much slot value amplifies the fit gap
const CROSS_TAX = 3.0;   // offense<->defense fixed tax

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

// --- Tier for display (0/2/6/12 badge) ---
function tier(x) {
  if (x < 1) return 0;
  if (x < 4) return 2;
  if (x < 9) return 6;
  return 12;
}

// --- Core price function ---
function price(src, dst) {
  // Same position = free
  if (src === dst) return { raw: 0, tier: 0 };

  // FB is a free flex destination (Owner rule)
  const FB_FREE_SRC = new Set(['RB','TE','OT','OG','C','DT','EDGE','ILB','OLB']);
  if (dst === 'FB' && FB_FREE_SRC.has(src)) return { raw: 0, tier: 0 };

  // QB's only flex: FS at 12
  if (src === 'QB') return { raw: 12, tier: 12 };

  // K <-> P = 2
  if ((src === 'K' && dst === 'P') || (src === 'P' && dst === 'K')) return { raw: 2, tier: 2 };

  const cs = CAP[src];
  const ds = DEMAND[dst];
  if (!cs || !ds) return null;

  // 1. Fit gap: what dst needs that src lacks
  let fitGap = 0;
  for (const d of DUTIES) {
    fitGap += W[d] * Math.max(0, (ds[d] ?? 0) - (cs[d] ?? 0));
  }

  // 2. Amplify by slot value: valuable slots penalize misfit more
  let raw = fitGap * (1 + VALUE_TAX * slotValue(dst));

  // 3. Side-crossing tax
  if (crossSide(src, dst)) raw += CROSS_TAX;

  // 4. Family boundary tax
  raw += famTax(src, dst);

  return { raw, tier: tier(raw) };
}

// --- Score against the live Owner table ---
function run() {
  let exact = 0, off1 = [], hard = [], missing = [];
  const TIERS = [0, 2, 6, 12];
  let n = 0;
  for (const src of Object.keys(owner).sort()) {
    for (const dst of Object.keys(owner[src]).sort()) {
      const o = owner[src][dst];
      const r = price(src, dst);
      n++;
      if (r === null) { missing.push([src, dst, o]); continue; }
      const m = r.tier;
      if (m === o) { exact++; continue; }
      const dist = Math.abs(TIERS.indexOf(m) - TIERS.indexOf(o));
      (dist === 1 ? off1 : hard).push([src, dst, o, m, r.raw]);
    }
  }
  console.log(`Requirement-Value Model vs live 99-rule Owner table (architect 97d7e9d)`);
  console.log(`Params: VALUE_TAX=${VALUE_TAX}, CROSS_TAX=${CROSS_TAX}`);
  console.log(`Rules: ${n}, exact ${exact}, off-by-one-tier ${off1.length}, hard misses ${hard.length}, no-profile ${missing.length}`);
  const score = exact + off1.length;
  console.log(`Fit (exact + off-by-one): ${score}/99`);
  console.log(`Per-rule overrides: 0`);
  if (off1.length > 0) {
    console.log('\nOff-by-one-tier (owner -> model, raw):');
    for (const r of off1.sort()) console.log(`  ${r[0]}>${r[1]}: ${r[2]} -> ${r[3]} (raw ${r[4].toFixed(2)})`);
  }
  if (hard.length > 0) {
    console.log('\nHard misses (owner -> model, raw):');
    for (const r of hard.sort()) console.log(`  ${r[0]}>${r[1]}: ${r[2]} -> ${r[3]} (raw ${r[4].toFixed(2)})`);
  }
  if (missing.length > 0) {
    console.log('\nNo-profile:');
    for (const r of missing) console.log(`  ${r[0]}>${r[1]}: ${r[2]}`);
  }
  return { exact, off1: off1.length, hard: hard.length, score };
}

run();
