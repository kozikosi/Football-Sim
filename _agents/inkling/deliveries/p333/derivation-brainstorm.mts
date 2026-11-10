// P-333 brainstorm (Inkling): the derivation formula for flex prices.
// Question (council prompt 2026-11-10, "The engine's inevitable direction"):
//   a derivation from destination weight instead of hand-set rules — how would you design it?
//   what should it use — destination weight alone, or skill profiles, or both?
// This script computes the candidates against the LIVE 99-rule table.
// Usage:
//   D=<scratch>; git archive origin/architect/engine-and-seats colors tools | tar -x -C "$D"
//   cp derivation-brainstorm.mts "$D/" && cd "$D" && node derivation-brainstorm.mts
import { readFileSync } from 'node:fs';
import { WEIGHT } from './colors/src/sports/nfl/engine/slots.ts';
import { FLEX } from './colors/src/sports/nfl/engine/flex.ts';

const flexJson = JSON.parse(readFileSync(new URL('./tools/mathlab/flex.json', import.meta.url), 'utf8'));
console.log('flex.json rules:', Object.values(flexJson.flex).reduce((n, v) => n + Object.keys(v as object).length, 0),
  '| FLEX (flex.ts) rules:', Object.values(FLEX).reduce((n, v) => n + Object.keys(v as object).length, 0));

// --- destination weight (single weight per destination column; multi-slot dests use the first-listed slot)
const DEST_WEIGHT: Record<string, number> = {
  QB: WEIGHT.QB, RB: WEIGHT.RB1, FB: WEIGHT.FB, WR: WEIGHT.WR1, TE: WEIGHT.TE1,
  OT: WEIGHT.OT1, OG: WEIGHT.OG1, C: WEIGHT.C, DT: WEIGHT.DT1, EDGE: WEIGHT.DE1,
  ILB: WEIGHT.MIKE, OLB: WEIGHT.WILL, SS: WEIGHT.SS, FS: WEIGHT.FS, CB: WEIGHT.CB1,
  K: WEIGHT.K, P: WEIGHT.P, NICKEL: WEIGHT.CB3, DIME: WEIGHT.DIME,
};
// role → source weight (a player playing his own role's column; source side of Δw uses his CURRENT slot,
// approximated by the same weight table — the engine would use the actual slot, this is the design's approximation)
const ROLE_WEIGHT: Record<string, number> = { ...DEST_WEIGHT };

// --- P-322 skill vectors (subset used here; same names/values as the P-322 design)
const SKILLS = ['BLK','CTH','COV','RNG','RSH','RUN','SNP'] as const;
const BETA: Record<string, number> = { BLK: .75, CTH: .5, COV: .5, RNG: .6, RSH: .8, RUN: 1.1, SNP: .4 };
const P: Record<string, Record<string, number>> = {
  QB:  { BLK: 1,  CTH: 2,  COV: 2,   RNG: 1, RSH: 2, RUN: 8, SNP: 0 },
  RB:  { BLK: 3,  CTH: 6,  COV: 2,   RNG: 1, RSH: 0, RUN: 9, SNP: 0 },
  FB:  { BLK: 8,  CTH: 2,  COV: 2,   RNG: 0, RSH: 0, RUN: 6, SNP: 0 },
  WR:  { BLK: 1,  CTH: 10, COV: 6,   RNG: 5, RSH: 0, RUN: 4, SNP: 0 },
  TE:  { BLK: 7,  CTH: 8,  COV: 4,   RNG: 2, RSH: 0, RUN: 5, SNP: 0 },
  OT:  { BLK: 10, CTH: 0,  COV: 0,   RNG: 0, RSH: 0, RUN: 0, SNP: 5 },
  OG:  { BLK: 9,  CTH: 0,  COV: 0,   RNG: 0, RSH: 0, RUN: 0, SNP: 6 },
  C:   { BLK: 6,  CTH: 0,  COV: 0,   RNG: 0, RSH: 0, RUN: 0, SNP: 10 },
  DT:  { BLK: 0,  CTH: 0,  COV: 0,   RNG: 0, RSH: 8, RUN: 0, SNP: 0 },
  EDGE:{ BLK: 2,  CTH: 0,  COV: 3,   RNG: 2, RSH: 10, RUN: 0, SNP: 0 },
  ILB: { BLK: 0,  CTH: 2,  COV: 3.5, RNG: 3, RSH: 5, RUN: 1, SNP: 0 },
  OLB: { BLK: 0,  CTH: 2,  COV: 4.5, RNG: 2, RSH: 7, RUN: 0, SNP: 0 },
  SS:  { BLK: 0,  CTH: 3,  COV: 9,   RNG: 4, RSH: 3, RUN: 0, SNP: 0 },
  FS:  { BLK: 0,  CTH: 4,  COV: 9,   RNG: 9, RSH: 1, RUN: 0, SNP: 0 },
  CB:  { BLK: 0,  CTH: 7,  COV: 10,  RNG: 8, RSH: 0, RUN: 0, SNP: 0 },
  NICKEL:{ BLK: 0, CTH: 5, COV: 9,   RNG: 4, RSH: 0, RUN: 0, SNP: 0 },
  DIME:  { BLK: 0, CTH: 4, COV: 9.5, RNG: 4, RSH: 0, RUN: 0, SNP: 0 },
  K:   { BLK: 0,  CTH: 0,  COV: 0,   RNG: 0, RSH: 0, RUN: 0, SNP: 0 },
  P:   { BLK: 0,  CTH: 0,  COV: 0,   RNG: 0, RSH: 0, RUN: 0, SNP: 0 },
};
const DI: Record<string, number> = { NICKEL: 1.7, DIME: 3.6, FS: 2.0 }; // COV multipliers for DB-scheme slots
const KCK: Record<string, number> = { K: 10, P: 10 };
const FB_FREE = new Set(['RB','TE','OT','OG','C','DT','EDGE','ILB','OLB']);

const tier = (x: number) => x < 1 ? 0 : x < 4 ? 2 : x < 9 ? 6 : 12;
const A = (src: string, dst: string): number => {
  let a = 0;
  for (const s of SKILLS) {
    const gap = Math.max(0, (P[dst]?.[s] ?? 0) - (P[src]?.[s] ?? 0));
    let b = BETA[s];
    if (s === 'SNP' && dst !== 'C') continue;
    if (s === 'RUN' && dst !== 'RB') continue;
    if (s === 'COV' && DI[dst]) b *= DI[dst];
    if ((P[src]?.CTH ?? 0) >= 9 && (s === 'COV' || s === 'RNG')) b *= 0.5;
    a += b * gap;
  }
  if (dst === 'C' && (P[src].BLK >= 8) && (P[dst].BLK >= 8)) a -= BETA.BLK * Math.max(0, P[dst].BLK - P[src].BLK);
  return a;
};

type Rule = { src: string; dst: string; want: number };
const rules: Rule[] = [];
for (const [src, row] of Object.entries(FLEX)) for (const [dst, want] of Object.entries(row)) rules.push({ src, dst, want: want as number });

// ---- candidate F-A: price = tier( A * g(w_dst) + lambda*(w_dst - w_src) + U ), g = clamp(w/300, 1/6, 2)
const U: Record<string, number> = { 'RB>TE': 3.0, 'SS>ILB': 5.0, 'TE>ILB': 6.4, 'RB>SS': 6.6, 'EDGE>SS': 5.1 };
const priceA = (src: string, dst: string, lam: number): number => {
  if (src === 'FB' && FB_FREE.has(dst === 'FB' ? '' : '')) return 0; // never reached; clarity
  if (dst === 'FB' && FB_FREE.has(src)) return 0;
  if (src === dst) return 0;
  if (src === 'K' && dst === 'P') return 2;
  if (src === 'P' && dst === 'K') return 2;
  const g = Math.min(2, Math.max(1 / 6, DEST_WEIGHT[dst] / 300));
  const dw = DEST_WEIGHT[dst] - ROLE_WEIGHT[src];
  return tier(Math.max(0, A(src, dst) * g + lam * dw + (U[src + '>' + dst] ?? 0)));
};

// ---- candidate F-W: pure destination-weight derivation (NO skills): price = tier( alpha * (w_dst) + U' ) — the prompt's minimal reading
const priceW = (src: string, dst: string, alpha: number): number => {
  if (dst === 'FB' && FB_FREE.has(src)) return 0;
  if (src === dst) return 0;
  if (src === 'K' && dst === 'P') return 2;
  if (src === 'P' && dst === 'K') return 2;
  return tier(Math.max(0, alpha * DEST_WEIGHT[dst]));
};

const score = (fn: (r: Rule) => number, label: string) => {
  let exact = 0, off1 = 0, hard = 0;
  const misses: string[] = [];
  const TIERS = [0, 2, 6, 12];
  for (const r of rules) {
    const got = fn(r);
    if (got === r.want) exact++;
    else if (Math.abs(TIERS.indexOf(got) - TIERS.indexOf(r.want)) === 1) off1++;
    else { hard++; misses.push(`${r.src}>${r.dst}: want ${r.want} got ${got}`); }
  }
  console.log(`${label.padEnd(34)} exact ${exact}/${rules.length}  off-by-one ${off1}  hard ${hard}`);
  return misses;
};

console.log('\n=== F-W: destination weight alone (alpha grid)');
for (const alpha of [0.004, 0.008, 0.012, 0.02]) score(r => priceW(r.src, r.dst, alpha), `F-W alpha=${alpha}`);

console.log('\n=== F-A: A * g(w_dst) + lambda*dw + U (lambda grid)');
for (const lam of [0, 0.002, 0.005, 0.01, 0.02, 0.033]) score(r => priceA(r.src, r.dst, lam), `F-A lambda=${lam}`);

console.log('\n=== F-A lambda=0.01, full detail');
for (const r of rules) {
  const got = priceA(r.src, r.dst, 0.01);
  const mark = got === r.want ? '  ' : '*';
  if (got !== r.want) console.log(`${mark} ${r.src}>${r.dst}: want ${r.want} got ${got}   (A=${A(r.src, r.dst).toFixed(2)}, g=${Math.min(2, Math.max(1/6, DEST_WEIGHT[r.dst]/300)).toFixed(2)}, dw=${DEST_WEIGHT[r.dst]-ROLE_WEIGHT[r.src]})`);
}

// ---- candidate F-M: additive destination-weight offset with CLASS-MEAN weights (fix for the WR1=650 artifact)
const DEST_MEAN: Record<string, number> = {
  QB: 1000, RB: 175, FB: 25, WR: 300, TE: 225, OT: 400, OG: 325, C: 150,
  DT: 316.7, EDGE: 475, ILB: 300, OLB: 125, SS: 300, FS: 300, CB: 250,
  K: 50, P: 50, NICKEL: 100, DIME: 50,
};
const priceM = (src: string, dst: string, lam: number): number => {
  if (dst === 'FB' && FB_FREE.has(src)) return 0;
  if (src === dst) return 0;
  if (src === 'K' && dst === 'P') return 2;
  if (src === 'P' && dst === 'K') return 2;
  const m = (DST: string) => DEST_MEAN[DST];
  return tier(Math.max(0, A(src, dst) + lam * (m(dst) - m(src)) + (U[src + '>' + dst] ?? 0)));
};
console.log('\n=== F-M: A + lambda*dw_mean + U (lambda grid)');
for (const lam of [0, 0.002, 0.005, 0.01, 0.02, 0.04]) score(r => priceM(r.src, r.dst, lam), `F-M lambda=${lam}`);
console.log('\n=== F-M lambda=0.01, misses');
for (const r of rules) { const got = priceM(r.src, r.dst, 0.01); if (got !== r.want) console.log(`  ${r.src}>${r.dst}: want ${r.want} got ${got} (A=${A(r.src,r.dst).toFixed(1)}, dw_mean=${(DEST_MEAN[r.dst]-DEST_MEAN[r.src]).toFixed(1)})`); }

// ---- candidate F-S: pure skill vector (no D, no weight; the "profiles alone" reading)
const priceS = (src: string, dst: string): number => {
  if (dst === 'FB' && FB_FREE.has(src)) return 0;
  if (src === dst) return 0;
  if (src === 'K' && dst === 'P') return 2;
  if (src === 'P' && dst === 'K') return 2;
  return tier(Math.max(0, A(src, dst) + (U[src + '>' + dst] ?? 0)));
};
console.log('\n=== F-S: skills only + U'); score(r => priceS(r.src, r.dst), 'F-S');

// ---- anchor audit: whichOwner-anchor rows survive each candidate (item 3 + QB>FS + FB whitelist)
const anchors: Rule[] = rules.filter(r => ['TE>DIME','TE>FS','ILB>FS','OLB>FS','QB>FS','TE>NICKEL','TE>SS'].includes(r.src + '>' + r.dst));
console.log('\n=== item-3 anchors');
for (const r of anchors) console.log(`  ${r.src}>${r.dst} want ${r.want} | F-S ${priceS(r.src,r.dst)} | F-M.01 ${priceM(r.src,r.dst,0.01)} | F-A.005 ${priceA(r.src,r.dst,0.005)}`);

// --- hard-miss listings for the best two candidates
const hards = (fn: (r: Rule) => number, label: string) => {
  const TIERS = [0, 2, 6, 12];
  const out: string[] = [];
  for (const r of rules) { const got = fn(r); if (Math.abs(TIERS.indexOf(got) - TIERS.indexOf(r.want)) > 1) out.push(`${r.src}>${r.dst}: want ${r.want} got ${got}`); }
  console.log(label, '→ hard (>1 tier):', out.join(' | '));
};
hards(r => priceS(r.src, r.dst), 'F-S');
hards(r => priceM(r.src, r.dst, 0.005), 'F-M.005');
hards(r => priceM(r.src, r.dst, 0.01), 'F-M.01');
