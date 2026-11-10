#!/usr/bin/env node
// P-322 v5 — seat `super` read-only probe of the Q&A-aligned flex derivation.
// "Requirement-Value" restated for the Owner's 2026-11-10 Q&A:
//   * OVR is the only true per-player data input (Q2; follow-up 1: position says what similar attributes a player must have)
//   * ability layer = duty-profile gap, capability scaled by OVR (CAP x OVR/100; duties at 0 stay 0 — "a great athlete can't play pitcher")
//   * guard layer = value-ladder break-even 20 x (1 - w_src/w_dst), w from COMPUTED slot values (design.json here as the design-time proxy; slotWins20 in the engine at build time — portable, no Owner-authored weights for other sports)
//   * adjustable blend ALPHA between the two ingredients (Q7)
//   * no cross-side floor (Q10), no named exceptions (Q9), dual positions free both ways (P-336)
//   * display = rounded integer; continuous raw kept for the optimizer (Q4; tier bands TBD — follow-up 2)
// Reads: origin/architect/engine-and-seats:tools/mathlab/flex.json  (live 99-rule Owner table)
//        origin/architect/engine-and-seats:tools/mathlab/design.json (slot weights — design-time proxy for computed slot values)
//        data/madden27-ratings.csv (local, Owner's ratings pool — OVR examples only)
// Writes nothing. No product edits, no protected constants touched.

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { createHash } from 'crypto';

function gitShow(ref, path) {
  return execSync(`git show ${ref}:${path}`, { encoding: 'utf8' });
}

const owner = JSON.parse(gitShow('origin/architect/engine-and-seats', 'tools/mathlab/flex.json')).flex;
const design = JSON.parse(gitShow('origin/architect/engine-and-seats', 'tools/mathlab/design.json'));
const MAX_W = Math.max(...Object.values(design));
const WGT = {};
for (const [k, v] of Object.entries(design)) WGT[k] = v / MAX_W; // normalized slot value, QB = 1.00
WGT.SS2 = 0.05; // big nickel: sub-package slot value (no design.json entry — authored once, conceptually)

const POS_TO_SLOT = {
  QB:'QB', RB:'RB1', FB:'RB1', WR:'WR1', TE:'TE1', OT:'OT1', OG:'OG1', C:'C',
  DT:'DT1', EDGE:'DE1', ILB:'MIKE', OLB:'WILL', SAM:'WILL', SS:'SS', FS:'FS', CB:'CB1',
  NICKEL:'CB3', DIME:'CB3', SS2:'SS2', DL5:'DL5', K:'K', P:'P',
};

// --- Universal duties (sport-agnostic schema; same formula in any sport) ---
const DUTIES = ['LINE','PRESSURE','COVER','HANDLE','CARRY','CATCH','SNP','RNG'];
const W = {LINE:1.0, PRESSURE:0.9, COVER:0.9, HANDLE:0.8, CARRY:0.7, CATCH:0.7, SNP:0.3, RNG:0.6};

// Position capability profiles (0–10 over duties). Authored once per sport — conceptual
// "positional requirements", not per-player data.
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
  SAM: {LINE:0, PRESSURE:7, COVER:4, HANDLE:0, CARRY:0, CATCH:1, SNP:0, RNG:2},
  SS:  {LINE:0, PRESSURE:3, COVER:7, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:4},
  FS:  {LINE:0, PRESSURE:0, COVER:9, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:9},
  CB:  {LINE:0, PRESSURE:0, COVER:10, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
  NICKEL:{LINE:0, PRESSURE:0, COVER:8, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:4},
  DIME: {LINE:0, PRESSURE:0, COVER:8, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:4},
  SS2: {LINE:1, PRESSURE:2, COVER:7, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:5}, // big nickel probe (not a real slot)
  K:   {LINE:0, PRESSURE:0, COVER:0, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
  P:   {LINE:0, PRESSURE:0, COVER:0, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
};

// Slot demand profiles (0–10 over duties). Football values; basketball swaps these.
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
  SAM:   {LINE:0, PRESSURE:7, COVER:4, HANDLE:0, CARRY:0, CATCH:1, SNP:0, RNG:2},
  SS:    {LINE:0, PRESSURE:3, COVER:7, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:4},
  FS:    {LINE:0, PRESSURE:0, COVER:9, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:9},
  DL5:   {LINE:3, PRESSURE:8, COVER:0, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:1}, // blitzer role — emerges from demand, no hand rule
  CB:    {LINE:0, PRESSURE:0, COVER:10, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
  NICKEL:{LINE:0, PRESSURE:0, COVER:8, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:4},
  DIME:  {LINE:0, PRESSURE:0, COVER:8, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:4},
  SS2:   {LINE:2, PRESSURE:3, COVER:8, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:6}, // big nickel probe (not a real slot)
  K:     {LINE:0, PRESSURE:0, COVER:0, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
  P:     {LINE:0, PRESSURE:0, COVER:0, HANDLE:0, CARRY:0, CATCH:0, SNP:0, RNG:0},
};

const OFF = new Set(['QB','RB','FB','WR','TE','OT','OG','C']);
const DEF = new Set(['DT','EDGE','ILB','OLB','SAM','SS','FS','CB','NICKEL','DIME','SS2']);
function side(p) { if (OFF.has(p)) return 'O'; if (DEF.has(p)) return 'D'; return 'S'; }

// --- Tunables (few, named, easy to tune — Q7: adjustable blend) ---
const FIT_SCALE = 2.0;   // fit-gap units -> points on the same scale as the guard
const GUARD_CAP = 12;
const ALPHA = 0.5;       // blend: raw = ALPHA*ability + (1-ALPHA)*guard; tune in [0,1]
const REF_OVR = 80;      // reference OVR for the 99-table check (guide only, not a target)

function slotValue(pos, override) {
  if (override !== undefined) return override;
  return WGT[POS_TO_SLOT[pos] ?? pos] ?? 0;
}

function capability(pos, ovr) {
  const c = CAP[pos];
  if (!c) return {};
  const out = {};
  for (const d of DUTIES) out[d] = (c[d] ?? 0) * ovr / 100;
  return out;
}

function abilityGap(srcCap, dst) {
  const ds = DEMAND[dst];
  if (!ds) return null;
  let gap = 0;
  for (const d of DUTIES) gap += W[d] * Math.max(0, (ds[d] ?? 0) - (srcCap[d] ?? 0));
  return gap;
}

function guardPts(srcPos, dstPos, wSrcOverride, wDstOverride) {
  const wSrc = slotValue(srcPos, wSrcOverride);
  const wDst = slotValue(dstPos, wDstOverride);
  if (!wDst) return 0;
  return Math.min(GUARD_CAP, Math.max(0, 20 * (1 - wSrc / wDst)));
}

// --- Core price: player-centric (OVR + positions), not just position-pair ---
// alpha overrides the module default — used for the Q7 blend sensitivity check.
function price(playerPos, ovr, dstPos, wSrcOverride, alpha = ALPHA) {
  const positions = Array.isArray(playerPos) ? playerPos : [playerPos];
  const src = positions[0];

  // Structural (not per-rule overrides): same position or any of the player's own positions = free
  // Dual positions play both for free (P-336, Owner-confirmed Round-2 Q1).
  if (positions.includes(dstPos)) return { raw: 0, tier: 0, breakdown: 'own position' };

  // Single structural Owner rule: FB is a free flex destination for natural blockers.
  // One named rule, not a per-rule override dictionary.
  const FB_FREE_SRC = new Set(['RB','TE','OT','OG','C','DT','EDGE','ILB','OLB']);
  if (dstPos === 'FB' && FB_FREE_SRC.has(src)) return { raw: 0, tier: 0, breakdown: 'FB free destination' };

  const cap = capability(src, ovr);
  const gap = abilityGap(cap, dstPos);
  if (gap === null) return null;
  const abilityPts = gap * FIT_SCALE;
  const guardPt = guardPts(src, dstPos, wSrcOverride);
  const raw = Math.min(12, ALPHA * abilityPts + (1 - ALPHA) * guardPt);
  const tier = raw < 1 ? 0 : raw < 4 ? 2 : raw < 9 ? 6 : 12;
  return { raw, tier, breakdown: `ability ${abilityPts.toFixed(2)} guard ${guardPt.toFixed(2)} alpha ${ALPHA}` };
}

const TIERS = [0, 2, 6, 12];
function tierName(t) { return t; }

function run() {
  console.log(`P-322 v5 read-only probe — Q&A-aligned Requirement-Value derivation`);
  console.log(`Params: FIT_SCALE=${FIT_SCALE}, GUARD_CAP=${GUARD_CAP}, ALPHA=${ALPHA}, REF_OVR=${REF_OVR}`);
  console.log(`Slot values (design.json normalized, QB=1.00):`, JSON.stringify(WGT));
  console.log('');

  // --- 1. Score against the live 99-rule Owner table at reference OVR 80 (guide, not target) ---
  let exact = 0, off1 = [], hard = [], missing = [], n = 0;
  for (const src of Object.keys(owner).sort()) {
    for (const dst of Object.keys(owner[src]).sort()) {
      const o = owner[src][dst];
      const r = price(src, REF_OVR, dst);
      n++;
      if (r === null) { missing.push([src, dst, o]); continue; }
      const m = r.tier;
      if (m === o) { exact++; continue; }
      const dist = Math.abs(TIERS.indexOf(m) - TIERS.indexOf(o));
      (dist === 1 ? off1 : hard).push({ src, dst, o, m, raw: r.raw });
    }
  }
  const score = exact + off1.length;
  console.log(`99-table check (reference OVR ${REF_OVR}, guide only): rules ${n}, exact ${exact}, off-by-one-tier ${off1.length}, hard misses ${hard.length}, no-profile ${missing.length}, fit ${score}/99`);
  console.log(`Mean absolute tier error: ${((off1.length * 1 + hard.length * 2) / n).toFixed(2)} tiers`);
  if (off1.length) {
    console.log('\nBiggest off-by-one-tier disagreements (owner -> model, raw @ ovr 80):');
    for (const r of off1.sort((a, b) => b.raw - a.raw).slice(0, 12)) {
      console.log(`  ${r.src}>${r.dst}: ${r.o} -> ${r.m} (raw ${r.raw.toFixed(2)})`);
    }
  }
  if (hard.length) {
    console.log('\nHard misses (owner -> model, raw @ ovr 80):');
    for (const r of hard) console.log(`  ${r.src}>${r.dst}: ${r.o} -> ${r.m} (raw ${r.raw.toFixed(2)})`);
  }

  // --- 2. Cross-side floor check (Q10: floor deleted — ability+guard must price cross-side >= 6 on their own) ---
  let crossMin = 12, crossUnder6 = [];
  for (const src of Object.keys(owner)) {
    for (const dst of Object.keys(owner[src])) {
      if (side(src) === side(dst)) continue;
      const r = price(src, REF_OVR, dst);
      if (r === null) continue;
      if (r.tier < crossMin) crossMin = r.tier;
      if (r.tier < 6) crossUnder6.push(`${src}>${dst} = ${r.tier} (raw ${r.raw.toFixed(2)})`);
    }
  }
  console.log(`\nCross-side check: minimum tier among cross-side rules = ${crossMin}; under-6 rows: ${crossUnder6.length ? crossUnder6.join('; ') : 'none'}`);

  // --- 3. Dual positions play both for free (P-336) ---
  console.log('\nDual-position demo (CB+WR player, Owner: plays both for free):');
  console.log(`  CB->WR = ${price(['CB','WR'], 85, 'WR').tier}   WR->CB = ${price(['CB','WR'], 85, 'CB').tier}  (structural: own position = 0)`);

  // --- 4. Player-specific pricing: OVR is the input (Q2) ---
  console.log('\nPlayer-specific demo (same position pair, different OVR):');
  for (const ovr of [99, 80, 70]) {
    console.log(`  WR ${ovr} -> TE: ${price('WR', ovr, 'TE').tier}  (raw ${price('WR', ovr, 'TE').raw.toFixed(2)})   |  CB ${ovr} -> FS: ${price('CB', ovr, 'FS').tier}  (raw ${price('CB', ovr, 'FS').raw.toFixed(2)})`);
  }
  const chase = readFileSync('data/madden27-ratings.csv', 'utf8').split('\n').slice(1).find(l => l.startsWith("Ja'Marr Chase"));
  console.log(`  Ja'Marr Chase (WR ${chase?.split(',')[3]}, ${chase?.split(',')[2]}) -> TE: ${price('WR', +chase.split(',')[3], 'TE').tier}`);

  // --- 5. Key-row blend sensitivity (Q7: alpha is the tunable blend) ---
  console.log('\nBlend sensitivity (alpha 0.3 / 0.5 / 0.7):');
  for (const [a, b] of [['C','OT'], ['QB','FS'], ['TE','FS'], ['RB','WR']]) {
    const row = [0.3, 0.5, 0.7].map(alpha => {
      const r = price(a, REF_OVR, b, undefined, alpha);
      return `a=${alpha} tier=${r.tier} raw=${r.raw.toFixed(2)}`;
    });
    console.log(`  ${a}>${b} (owner ${owner[a][b]}): ${row.join('  |  ')}`);
  }

  // --- 6. Big nickel SS2 probe: a position NOT in the game, priced with no hand rules (P-338) ---
  console.log('\nSS2 (big nickel) probe — slot value 0.05 (sub-package), role emerges from duty profile:');
  const ss2demand = DEMAND.SS2;
  const ss2cap = CAP.SS2;
  for (const src of Object.keys(CAP).sort()) {
    const r = price(src, REF_OVR, 'SS2');
    if (r === null) continue;
    const mark = r.tier === 12 ? '  <-- at cap (prohibited in practice)' : '';
    console.log(`  ${src}->SS2: ${r.tier} (raw ${r.raw.toFixed(2)})${mark}`);
  }

  // --- 7. DL5 blitzer emerges from demand (Round-2 Q2: no rule for DL5) ---
  console.log('\nDL5 emergence (demand profile only — no hand rule): DL5 = {PRESSURE 8, LINE 3, RNG 1}');
  for (const src of ['EDGE','DT','ILB','OLB','WR','QB']) {
    const r = price(src, REF_OVR, 'DL5');
    console.log(`  ${src}->DL5: ${r === null ? 'no profile' : r.tier + ' (raw ' + r.raw.toFixed(2) + ')'}  ${r === null ? '' : r.breakdown}`);
  }

  // receipt hash of inputs
  const h = createHash('sha256').update(gitShow('origin/architect/engine-and-seats', 'tools/mathlab/flex.json')).update(gitShow('origin/architect/engine-and-seats', 'tools/mathlab/design.json')).digest('hex').slice(0, 12);
  console.log(`\nReceipt: flex.json + design.json (origin/architect/engine-and-seats) sha256 prefix ${h}`);
}

run();
