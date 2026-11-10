#!/usr/bin/env node
// P-322 Option C (and B): independent re-implementation of Inkling's formula
// (from MUSE's derive-prototype-2026-11-10.py design, ported to Node.js by seat `super`).
// Read-only: reads flex.json + thetaprice markdown from git; writes nothing.
// Runs: (1) Inkling base formula -> expect 88/11/0; (2) + cross-side floor -> expect 93/6/0.

import { execSync } from 'child_process';

function gitShow(ref, path) {
  return execSync(`git show ${ref}:${path}`, { encoding: 'utf8' });
}

// --- Live Owner table ---
const flex = JSON.parse(gitShow('origin/architect/engine-and-seats', 'tools/mathlab/flex.json'));
const owner = flex.flex;

// --- Thetaprice D@90 (parse from markdown table by column index) ---
const tp = gitShow('origin/architect/engine-and-seats', 'tools/mathlab/results/thetaprice-2026-11-09.md');
const D = {};
for (const line of tp.split('\n')) {
  const cols = line.split('|').map(c => c.trim());
  if (cols.length < 7) continue;
  const rule = cols[1];
  const m = rule.match(/^([A-Z]+)>([A-Z0-9]+)$/);
  if (m && cols[6] !== undefined) {
    D[m[1] + '>' + m[2]] = parseFloat(cols[6]);
  }
}
console.log(`Thetaprice D@90 rows parsed: ${Object.keys(D).length}`);

const D_bumped = { ...D };
D_bumped['OLB>ILB'] = 6.7;
D_bumped['OLB>SS'] = 6.7;

// --- Skill profiles (Inkling's P-322, from MUSE's design) ---
const S = {
  QB:  {BLK:1, CTH:2, COV:2, RNG:1, RSH:2, RUN:8, SNP:0},
  RB:  {BLK:3, CTH:6, COV:2, RNG:1, RSH:0, RUN:9, SNP:0},
  FB:  {BLK:8, CTH:2, COV:2, RNG:0, RSH:0, RUN:6, SNP:0},
  WR:  {BLK:1, CTH:10,COV:6, RNG:5, RSH:0, RUN:4, SNP:0},
  TE:  {BLK:7, CTH:8, COV:4, RNG:2, RSH:0, RUN:5, SNP:0},
  OT:  {BLK:10,CTH:0, COV:0, RNG:0, RSH:0, RUN:0, SNP:5},
  OG:  {BLK:9, CTH:0, COV:0, RNG:0, RSH:0, RUN:0, SNP:6},
  C:   {BLK:6, CTH:0, COV:0, RNG:0, RSH:0, RUN:0, SNP:10},
  DT:  {BLK:0, CTH:0, COV:0, RNG:0, RSH:8, RUN:0, SNP:0},
  EDGE:{BLK:2, CTH:0, COV:3, RNG:2, RSH:10,RUN:0, SNP:0},
  ILB: {BLK:0, CTH:2, COV:3.5,RNG:3, RSH:5, RUN:1, SNP:0},
  OLB: {BLK:0, CTH:2, COV:4.5,RNG:2, RSH:7, RUN:0, SNP:0},
  SS:  {BLK:0, CTH:3, COV:9, RNG:4, RSH:3, RUN:0, SNP:0},
  FS:  {BLK:0, CTH:4, COV:9, RNG:9, RSH:1, RUN:0, SNP:0},
  CB:  {BLK:0, CTH:7, COV:10,RNG:8, RSH:0, RUN:0, SNP:0},
  K:   {BLK:0, CTH:0, COV:0, RNG:0, RSH:0, RUN:0, SNP:0, KCK:10, PNT:0},
  P:   {BLK:0, CTH:0, COV:0, RNG:0, RSH:0, RUN:0, SNP:0, KCK:0, PNT:10},
  NICKEL: {BLK:0, CTH:5, COV:9, RNG:4, RSH:0, RUN:0, SNP:0},
  DIME:   {BLK:0, CTH:4, COV:9.5,RNG:4, RSH:0, RUN:0, SNP:0},
};
const BETA = {BLK:0.75, CTH:0.5, COV:0.5, RNG:0.6, RSH:0.8, RUN:1.1, SNP:0.4, KCK:0.2, PNT:0.2};
const DMULT = {NICKEL: 1.7, DIME: 3.6, FS: 2.0};
const U = {'RB>TE': 3.0, 'SS>ILB': 5.0, 'TE>ILB': 6.4, 'RB>SS': 6.6, 'EDGE>SS': 5.1};
const OVERRIDE = {'C>OG': 6, 'FB>RB': 2, 'FB>TE': 6, 'EDGE>RB': 6, 'EDGE>ILB': 6};
const FB_FREE = new Set(['RB','TE','OT','OG','C','DT','EDGE','ILB','OLB']);

function tier(x){ if (x < 1) return 0; if (x < 4) return 2; if (x < 9) return 6; return 12; }
function side(p){ const O = new Set(['QB','RB','FB','WR','TE','OT','OG','C']);
  const Df = new Set(['DT','EDGE','ILB','OLB','SS','FS','CB','NICKEL','DIME']);
  return O.has(p)?'O' : Df.has(p)?'D' : 'S'; }
function crossSide(s,d){ return side(s) !== side(d); }

function inklingPrice(src, dst, useFloor) {
  if (dst === 'SAM') return inklingPrice(src, 'OLB', useFloor);
  if (dst === 'FB' && FB_FREE.has(src)) return 0;
  if (OVERRIDE[src + '>' + dst] !== undefined) return OVERRIDE[src + '>' + dst];
  if (src === dst) return 0;
  const Dv = D_bumped[src + '>' + dst] ?? 0.0;
  const ps = S[src], pd = S[dst];
  if (!ps || !pd) return null;
  let A = 0.0;
  for (const skill of Object.keys(BETA)) {
    if (skill === 'RUN' && dst !== 'RB') continue;
    if (skill === 'SNP' && dst !== 'C') continue;
    if (skill === 'KCK' && dst !== 'K') continue;
    if (skill === 'PNT' && dst !== 'P') continue;
    let b = BETA[skill];
    const gap = Math.max(0, (pd[skill] ?? 0) - (ps[skill] ?? 0));
    if (skill === 'COV' && dst in DMULT) b *= DMULT[dst];
    if ((skill === 'COV' || skill === 'RNG') && (ps.CTH ?? 0) >= 9) b *= 0.5;
    if (skill === 'BLK' && (ps.BLK ?? 0) >= 8 && (pd.BLK ?? 0) >= 8) continue; // gap = 0
    A += b * gap;
  }
  if (Dv >= 5) A = 0.0;
  else if (Dv >= 4) A *= 0.5;
  const u = U[src + '>' + dst] ?? 0.0;
  let x = Math.max(0, Dv) + A + u;
  let p = tier(Math.min(Math.max(x, 0), 12));
  if (useFloor && crossSide(src, dst) && p < 6 && !(dst === 'FB' && FB_FREE.has(src))) p = 6;
  return p;
}

function run(useFloor, label) {
  let exact = 0, off1 = [], hard = [], missing = [];
  const TIERS = [0, 2, 6, 12];
  for (const src of Object.keys(owner).sort()) {
    for (const dst of Object.keys(owner[src]).sort()) {
      const o = owner[src][dst];
      const m = inklingPrice(src, dst, useFloor);
      if (m === null) { missing.push([src, dst, o]); continue; }
      if (m === o) { exact++; continue; }
      const d = Math.abs(TIERS.indexOf(m) - TIERS.indexOf(o));
      (d === 1 ? off1 : hard).push([src, dst, o, m]);
    }
  }
  const n = exact + off1.length + hard.length + missing.length;
  console.log(`\n=== ${label} ===`);
  console.log(`Rules: ${n}, exact ${exact}, off-by-one ${off1.length}, hard ${hard.length}, missing ${missing.length}`);
  if (off1.length > 0) {
    console.log('Off-by-one (owner -> model):');
    for (const r of off1.sort()) console.log('  ', r[0]+'>'+r[1]+': '+r[2]+' -> '+r[3]);
  }
  if (hard.length > 0) {
    console.log('Hard misses (owner -> model):');
    for (const r of hard.sort()) console.log('  ', r[0]+'>'+r[1]+': '+r[2]+' -> '+r[3]);
  }
  if (missing.length > 0) {
    console.log('Missing:');
    for (const r of missing) console.log('  ', r[0]+'>'+r[1]+': '+r[2]);
  }
  return { exact, off1: off1.length, hard: hard.length };
}

run(false, 'Inkling base (no floor) — MUSE claims 88/11/0');
run(true,  'Inkling + cross-side floor — MUSE/Claude claim 93/6/0');
