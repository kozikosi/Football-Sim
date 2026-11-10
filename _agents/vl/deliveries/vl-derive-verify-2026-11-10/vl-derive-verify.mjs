#!/usr/bin/env node
// _agents/vl/deliveries/vl-derive-verify-2026-11-10/vl-derive-verify.mjs
// VL's INDEPENDENT re-implementation of Inkling's P-322 formula (task B).
// Read-only analysis: reads inputs via `git show 678bb06:<path>`; writes nothing.
//
// Formula (Inkling P-322 section 3, re-implemented by VL from skill-profiles-p322.json):
//   price(src, dst) = tier( max(0, D_bumped) + gate(A) + U )
//   - D_bumped: theta D@90 from thetaprice-2026-11-09.md, bumped OLB>ILB/OLB>SS to 6.7;
//               D = 0 when the rule has no D row (flagged)
//   - A = sum over skills w[s] * max(0, prof[dst][s] - prof[src][s]),
//         with Inkling's scope (RUN only vs RB, SNP only vs C, KCK only vs K, PNT only vs P),
//         covDmult on COV for NICKEL/DIME/FS destinations,
//         catcherCut (CTH>=9 source halves COV/RNG weight),
//         eliteLine (both BLK>=8 => gap 0)
//   - gate(A): A = 0 if D>=5, *0.5 if 4<=D<5, else A
//   - U: named unlikeness deltas (RB>TE=3, SS>ILB=5, TE>ILB=6.4, RB>SS=6.6, EDGE>SS=5.1)
//   - fiat rows (excluded from fit, counted exact if they match): override dict C>OG=6,
//     FB>RB=2, FB>TE=6, EDGE>RB=6, EDGE>ILB=6; dst==FB && src in fbFree => 0
//   - SAM alias => OLB; tier cuts 1/4/9 -> 0/2/6/12
//
// Usage: node vl-derive-verify.mjs [--floor N] [--commit <sha>]
// Default run (no floor) targets Inkling's claim: 88 exact / 11 off-by-one / 0 hard.
// With --floor 6 targets the council-prompt prediction: 93/6/0.

import { execSync } from 'child_process';

const COMMIT = (process.argv.findIndex((a) => a === '--commit') > 0
  ? process.argv[process.argv.findIndex((a) => a === '--commit') + 1]
  : '678bb06');
const FLOOR = process.argv.includes('--floor')
  ? Number(process.argv[process.argv.findIndex((a) => a === '--floor') + 1])
  : null;

function gitShow(path) {
  return execSync(`git show ${COMMIT}:${path}`, { cwd: process.cwd(), encoding: 'utf8' });
}

const flex = JSON.parse(gitShow('tools/mathlab/flex.json')).flex;
const design = JSON.parse(gitShow('tools/mathlab/skill-profiles-p322.json'));
const prof = design.profile;
const beta = design.beta;
const scope = design.scope;
const covDmult = design.covDmult;
const catcherCut = design.catcherCut;
const gate = design.gate;
const U = design.U;
const override = design.override;
const fbFree = new Set(design.fbFree);
const dBump = design.dBump;
const side = design.side;
const cuts = design.cuts; // [1, 4, 9]

const sideOf = (r) => (side.offense.includes(r) ? 'O' : side.defense.includes(r) ? 'D' : 'S');

// ---- D@90 table from thetaprice markdown (column 7 = D@90) ----
const tp = gitShow('tools/mathlab/results/thetaprice-2026-11-09.md');
const D = {};
for (const line of tp.split('\n')) {
  const c = line.split('|').map((x) => x.trim());
  if (c[1] && /^[A-Z]+>[A-Z0-9]+$/.test(c[1])) D[c[1]] = parseFloat(c[6]);
}
const dOf = (k) => (k in dBump ? dBump[k] : k in D ? D[k] : 0);
const noD = (k) => !(k in dBump) && !(k in D);

function tier(x) {
  if (x < cuts[0]) return 0;
  if (x < cuts[1]) return 2;
  if (x < cuts[2]) return 6;
  return 12;
}

function gapSum(src, dst) {
  const ps = prof[src], pd = prof[dst];
  if (!ps || !pd) return null;
  let A = 0;
  for (const s of Object.keys(beta)) {
    if (scope[s] && !scope[s].includes(dst)) continue;
    const gap = Math.max(0, (pd[s] || 0) - (ps[s] || 0));
    if (!gap) continue;
    let w = beta[s];
    if (s === 'COV' && covDmult[dst]) w *= covDmult[dst];
    if ((ps.CTH || 0) >= catcherCut.ctHmin && catcherCut.skills.includes(s)) w *= catcherCut.factor;
    if (s === 'BLK' && (ps.BLK || 0) >= design.eliteLine.blkMin && (pd.BLK || 0) >= design.eliteLine.blkMin) continue; // elite-line: D alone
    A += w * gap;
  }
  return A;
}

function price(src, dst) {
  const k = `${src}>${dst}`;
  if (dst === 'SAM') return price(src, 'OLB');
  if (k in override) return { p: override[k], how: 'override' };
  if (dst === 'FB' && fbFree.has(src)) return { p: 0, how: 'fb-free' };
  const d = Math.max(0, dOf(k));
  const g = gapSum(src, dst);
  if (g === null) return { p: null, how: 'no-profile', raw: null, noD: noD(k) };
  let A = d >= gate.hi ? 0 : d >= gate.lo ? g * gate.midFactor : g;
  let x = d + A + (U[k] || 0);
  let how = k in U ? 'formula+U' : 'formula';
  if (FLOOR != null && sideOf(src) !== 'S' && sideOf(dst) !== 'S' && sideOf(src) !== sideOf(dst) && dst !== 'FB') {
    if (x < FLOOR) { x = FLOOR; how = 'formula+floor'; }
  }
  return { p: tier(x), how, raw: x, noD: noD(k) };
}

const TIERS = [0, 2, 6, 12];
const step = (a, b) => Math.abs(TIERS.indexOf(a) - TIERS.indexOf(b));

const rows = [];
for (const src of Object.keys(flex).sort()) {
  for (const dst of Object.keys(flex[src]).sort()) {
    const m = price(src, dst);
    rows.push({ k: `${src}>${dst}`, src, dst, own: flex[src][dst], ...m });
  }
}
const n = rows.length;
const exact = rows.filter((r) => r.p === r.own);
const off1 = rows.filter((r) => r.p !== r.own && step(r.own, r.p) === 1);
const hard = rows.filter((r) => step(r.own, r.p) > 1);
const noDrows = rows.filter((r) => r.noD);
const fiat = rows.filter((r) => r.how === 'override' || r.how === 'fb-free');
const scored = rows.filter((r) => r.p !== null);

console.log(`vl-derive-verify: ${n} live rules | commit ${COMMIT} | floor ${FLOOR ?? 'none'}`);
console.log(`exact ${exact.length} | off by one tier ${off1.length} | hard misses ${hard.length}`);
console.log(`by source: pure formula ${scored.filter((r) => r.how === 'formula' && r.p === r.own).length}/` +
  `${scored.filter((r) => r.how === 'formula').length} exact | formula+U ${scored.filter((r) => r.how === 'formula+U' && r.p === r.own).length}/` +
  `${scored.filter((r) => r.how === 'formula+U').length} | fiat ${fiat.filter((r) => r.p === r.own).length}/${fiat.length}`);
console.log(`no-D rows (D taken as 0): ${noDrows.map((r) => r.k).join(' ') || 'none'}`);
console.log('\nOff-by-one-tier residuals (rule: owner -> model, raw, [how]):');
[...off1].sort((a, b) => a.k.localeCompare(b.k)).forEach((r) =>
  console.log(`  ${r.k}: ${r.own} -> ${r.p}  raw ${r.raw == null ? '-' : r.raw.toFixed(2)}  [${r.how}]`));
console.log('\nHard misses (rule: owner -> model, raw, [how]):');
[...hard].sort((a, b) => a.k.localeCompare(b.k)).forEach((r) =>
  console.log(`  ${r.k}: ${r.own} -> ${r.p}  raw ${r.raw == null ? '-' : r.raw.toFixed(2)}  [${r.how}]`));
console.log('\nReference (REPORTED, council prompt 2026-11-10):');
console.log('  Inkling P-322 vs live table: exact 88 / off-by-one 11 / hard 0');
console.log('  with cross-side floor 6: exact 93 / off-by-one 6 / hard 0');
console.log('  Residuals expected: owner-0/model-2 = CB>FS, CB>SS, EDGE>OLB, ILB>OLB, SS>DIME, SS>NICKEL');
console.log('                    cross-side owner-6/model-2 = WR>CB, WR>DIME, WR>FS, WR>NICKEL, WR>SS');
