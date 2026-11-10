#!/usr/bin/env node
// P-322 derivation design — seat `super` (Option A: design my own derivation)
// Own skill-profile derivation, run against the live 99-rule Owner table
// (architect 97d7e9d, origin/architect/engine-and-seats:tools/mathlab/flex.json).
// Read-only: reads flex.json from git; writes nothing to the repo.
//
// Design (principled, few constants):
//  * Ability distance is directional: price(src,dst) = cost of skills dst needs
//    that src lacks — sum of beta * max(0, dst_skill - src_skill).
//  * A cross-side move (offense<->defense) has a hard floor of 6
//    (except flexes into FB, which stay free — Owner rule).
//  * Same position = free. QB has one flex (FS, 12). K<->P = 2.
//  * Cut points 1/4/9 -> tiers 0/2/6/12 (same shape as Inkling, for comparison).
//  * No destination-weight term (settled principle: weight prices value twice).

import { execSync } from 'child_process';

function gitShow(ref, path) {
  return execSync(`git show ${ref}:${path}`, { encoding: 'utf8' });
}

const flex = JSON.parse(gitShow('origin/architect/engine-and-seats', 'tools/mathlab/flex.json'));
const owner = flex.flex;

// --- My skill profiles (own design, 0-10 scale) ---
const SKILLS = ['BLK','RSH','MAN','RNG','CTH','RUN','SNP'];
const BETA = { BLK:0.6, RSH:0.6, MAN:0.5, RNG:0.5, CTH:0.5, RUN:0.6, SNP:0.2 };

const PROF = {
  QB:  {BLK:0,RSH:0,MAN:0,RNG:0,CTH:2,RUN:5,SNP:0},
  RB:  {BLK:3,RSH:0,MAN:0,RNG:1,CTH:5,RUN:9,SNP:0},
  FB:  {BLK:8,RSH:0,MAN:0,RNG:0,CTH:3,RUN:6,SNP:0},
  WR:  {BLK:1,RSH:0,MAN:6,RNG:5,CTH:10,RUN:4,SNP:0},
  TE:  {BLK:7,RSH:0,MAN:4,RNG:2,CTH:8,RUN:5,SNP:0},
  OT:  {BLK:10,RSH:0,MAN:0,RNG:0,CTH:0,RUN:0,SNP:0},
  OG:  {BLK:9,RSH:0,MAN:0,RNG:0,CTH:0,RUN:0,SNP:0},
  C:   {BLK:6,RSH:0,MAN:0,RNG:0,CTH:0,RUN:0,SNP:10},
  DT:  {BLK:0,RSH:4,MAN:0,RNG:0,CTH:0,RUN:0,SNP:0},
  EDGE:{BLK:2,RSH:10,MAN:0,RNG:2,CTH:0,RUN:0,SNP:0},
  ILB: {BLK:0,RSH:5,MAN:3,RNG:4,CTH:2,RUN:1,SNP:0},
  OLB: {BLK:0,RSH:7,MAN:4,RNG:3,CTH:1,RUN:0,SNP:0},
  SS:  {BLK:0,RSH:0,MAN:5,RNG:7,CTH:3,RUN:0,SNP:0},  // safeties don't rush
  FS:  {BLK:0,RSH:0,MAN:5,RNG:9,CTH:4,RUN:0,SNP:0},  // safeties don't rush
  CB:  {BLK:0,RSH:0,MAN:10,RNG:9,CTH:7,RUN:0,SNP:0}, // CB matches FS range
  NICKEL:{BLK:0,RSH:0,MAN:5,RNG:5,CTH:3,RUN:0,SNP:0},
  DIME: {BLK:0,RSH:0,MAN:5,RNG:4,CTH:3,RUN:0,SNP:0},
  K:   {BLK:0,RSH:0,MAN:0,RNG:0,CTH:0,RUN:0,SNP:0},
  P:   {BLK:0,RSH:0,MAN:0,RNG:0,CTH:0,RUN:0,SNP:0},
};

const OFFENSE = new Set(['QB','RB','FB','WR','TE','OT','OG','C']);
const DEFENSE = new Set(['DT','EDGE','ILB','OLB','SS','FS','CB','NICKEL','DIME']);
const FB_FREE_SRC = new Set(['RB','OT','OG','C','TE','DT','EDGE','ILB','OLB']);

function side(p){ return OFFENSE.has(p)?'O' : DEFENSE.has(p)?'D' : 'S'; }
function crossSide(src,dst){ return side(src) !== side(dst); }
function tier(x){ if (x < 1) return 0; if (x < 4) return 2; if (x < 9) return 6; return 12; }

function price(src,dst){
  if (src === dst) return 0;
  if (dst === 'FB' && FB_FREE_SRC.has(src)) return 0;      // FB utility: free flex destination
  if (src === 'QB') return 12;                              // QB's only flex
  if ((src==='K'&&dst==='P')||(src==='P'&&dst==='K')) return 2;
  const ps = PROF[src], pd = PROF[dst];
  if (!ps || !pd) return null;
  let gap = 0;
  for (const sk of SKILLS) gap += BETA[sk] * Math.max(0, pd[sk] - ps[sk]);
  if (crossSide(src,dst)) gap = Math.max(gap, 6);           // cross-side floor
  return tier(gap);
}

let exact=0, off1=[], hard=[], missing=[];
const TIERS=[0,2,6,12];
for (const src of Object.keys(owner).sort()){
  for (const dst of Object.keys(owner[src]).sort()){
    const o = owner[src][dst];
    const m = price(src,dst);
    if (m===null){ missing.push([src,dst,o]); continue; }
    if (m===o){ exact++; continue; }
    const d = Math.abs(TIERS.indexOf(m)-TIERS.indexOf(o));
    (d===1 ? off1 : hard).push([src,dst,o,m]);
  }
}
const n = exact + off1.length + hard.length + missing.length;
console.log(`Live Owner table (architect 97d7e9d): ${n} rules`);
console.log(`My model:        exact ${exact}, off-by-one-tier ${off1.length}, hard misses ${hard.length}, no-profile ${missing.length}`);
console.log(`Inkling baseline: exact 88, off-by-one 11, hard 0 (93/99 with cross-side floor term)`);
console.log(`Delta vs Inkling: ${exact - 88} more exact, ${off1.length - 11} more off-by-one, ${hard.length} hard`);
console.log('\nOff-by-one-tier residuals (src>dst: owner -> model):');
for (const r of off1.sort()) console.log('  ', r[0]+'>'+r[1]+': '+r[2]+' -> '+r[3]);
console.log('\nHard misses (src>dst: owner -> model):');
for (const r of hard.sort()) console.log('  ', r[0]+'>'+r[1]+': '+r[2]+' -> '+r[3]);
console.log('\nNo-profile (could not compute):');
for (const r of missing) console.log('  ', r[0]+'>'+r[1]+': '+r[2]);
