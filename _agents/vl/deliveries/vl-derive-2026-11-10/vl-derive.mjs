#!/usr/bin/env node
// _agents/vl/deliveries/vl-derive-2026-11-10/vl-derive.mjs
// VL's OWN derivation design for the 99-rule flex table (P-322). Read-only analysis.
// Nothing here touches flex.json, the engine, or any protected constant.
//
// price(src, dst) = tier( D@90(src,dst) + GAP(src,dst) [, cross-side floor] )
//   tier: x < c1 -> 0, x < c2 -> 2, x < c3 -> 6, else 12   (default cuts 1 / 4 / 9)
//   D@90: theta ability distance (tools/mathlab/results/thetaprice-2026-11-09.md, architect 678bb06;
//         flex.json at that commit is byte-identical to 97d7e9d, the live Owner table),
//         0 when the rule has no D row (flagged in output)
//   GAP: one-sided skill-demand gap = sum_s w[s] * max(0, prof[dst][s] - prof[src][s])
//         profiles: Inkling's P-322 skill profiles (skill-profiles-p322.json, architect 678bb06),
//         skills BLK CTH COV RNG RSH RUN, weights VL's own (below)
//   --floor N: cross-side (offense<->defense) formula price below N is raised to N;
//              dest == FB exempt (free flexes, priced as-is)
//   --gate:    control - apply Inkling's gate to the gap (A=0 if D>=5, *0.5 if 4<=D<5)
//   --scope:   control - apply Inkling's scope (RUN gap counts only vs dst==RB)
//   --cuts a,b,c: cut points (default 1/4/9)
//   --commit <sha>: git commit to read inputs from (default 678bb06)
// No destination weight (settled principle), no U deltas, no override dict, no fiat rows:
// every one of the 99 rules is scored by the same formula. Fewer constants than Inkling's
// P-322 (6 weights + 3 cuts (+floor) vs ~9 betas, gate, DMULT x3, catcherCut, U x5,
// overrides x5, fbFree x9, dBump x2).
//
// Usage: node vl-derive.mjs [--floor N] [--gate] [--scope] [--cuts a,b,c] [--commit <sha>]
// Output: exact / off-by-one / hard counts vs the live 99-rule table, full mismatch list.

import { execSync } from 'child_process';

const COMMIT = (process.argv.findIndex((a) => a === '--commit') > 0
  ? process.argv[process.argv.findIndex((a) => a === '--commit') + 1]
  : '678bb06');   // architect tip; flex.json here is byte-identical to 97d7e9d (diff-verified)
const FLOOR = process.argv.includes('--floor')
  ? Number(process.argv[process.argv.findIndex((a) => a === '--floor') + 1])
  : null;
const GATE = process.argv.includes('--gate');        // control: Inkling's gate (A=0 if D>=5, *0.5 if 4<=D<5)
const SCOPE = process.argv.includes('--scope');      // control: Inkling's scope (RUN only vs RB)
const CUTS = process.argv.includes('--cuts')
  ? process.argv[process.argv.findIndex((a) => a === '--cuts') + 1].split(',').map(Number)
  : [1, 4, 9];

function gitShow(path) {
  return execSync(`git show ${COMMIT}:${path}`, { cwd: process.cwd(), encoding: 'utf8' });
}

const flex = JSON.parse(gitShow('tools/mathlab/flex.json')).flex;
const roles = Object.keys(flex);

const tp = gitShow('tools/mathlab/results/thetaprice-2026-11-09.md');
const D = {};
for (const line of tp.split('\n')) {
  const c = line.split('|').map((x) => x.trim());
  if (c[1] && /^[A-Z]+>[A-Z0-9]+$/.test(c[1])) D[c[1]] = parseFloat(c[6]);
}

const skills = JSON.parse(gitShow('tools/mathlab/skill-profiles-p322.json'));
const prof = skills.profile;
const side = skills.side;
const sideOf = (r) => (side.offense.includes(r) ? 'O' : side.defense.includes(r) ? 'D' : 'S');

// VL's own weights (design choice, stated plainly). One-sided: what the DEST job demands
// that the SRC lacks. Negative gaps (src better than dst) never reduce the price.
const W = { BLK: 0.75, CTH: 0.5, COV: 0.6, RNG: 0.6, RSH: 0.8, RUN: 1.0 };
const SKILLS = Object.keys(W);

function gapOf(src, dst, d) {
  const ps = prof[src], pd = prof[dst];
  if (!ps || !pd) return null;
  let g = 0;
  for (const s of SKILLS) {
    if (SCOPE && s === 'RUN' && dst !== 'RB') continue;
    g += W[s] * Math.max(0, (pd[s] || 0) - (ps[s] || 0));
  }
  if (GATE) g = d >= 5 ? 0 : d >= 4 ? g * 0.5 : g;
  return g;
}

function tier(x) {
  if (x < CUTS[0]) return 0;
  if (x < CUTS[1]) return 2;
  if (x < CUTS[2]) return 6;
  return 12;
}

function price(src, dst) {
  const k = `${src}>${dst}`;
  const d = Math.max(0, D[k] || 0);
  const g = gapOf(src, dst, d);
  if (g === null) return { p: null, how: 'no-profile', raw: null, noD: !(k in D) };
  let x = d + g;
  let how = 'formula';
  if (FLOOR != null && sideOf(src) !== 'S' && sideOf(dst) !== 'S' && sideOf(src) !== sideOf(dst) && dst !== 'FB') {
    if (x < FLOOR) { x = FLOOR; how = 'formula+floor'; }
  }
  return { p: tier(x), how, raw: x, noD: !(k in D) };
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
const noD = rows.filter((r) => r.noD);

console.log(`vl-derive: ${n} live rules | D table ${COMMIT}:tools/mathlab/results/thetaprice-2026-11-09.md | profiles ${COMMIT}:tools/mathlab/skill-profiles-p322.json`);
console.log(`weights ${JSON.stringify(W)} | cuts ${CUTS.join('/')} | floor ${FLOOR ?? 'none'} | gate ${GATE} | scope ${SCOPE}`);
console.log(`exact ${exact.length} | off by one tier ${off1.length} | hard misses ${hard.length} | no-D rows ${noD.length} (D taken as 0): ${noD.map((r) => r.k).join(' ') || 'none'}`);
const sameSide = rows.filter((r) => sideOf(r.src) === sideOf(r.dst) && sideOf(r.src) !== 'S');
const crossSide = rows.filter((r) => sideOf(r.src) !== 'S' && sideOf(r.dst) !== 'S' && sideOf(r.src) !== sideOf(r.dst));
console.log(`same-side: exact ${sameSide.filter((r) => r.p === r.own).length}/${sameSide.length} | cross-side: exact ${crossSide.filter((r) => r.p === r.own).length}/${crossSide.length}`);
console.log('\nDisagreements (rule: owner -> model, raw score, [how]):');
[...off1, ...hard].sort((a, b) => a.k.localeCompare(b.k)).forEach((r) =>
  console.log(`  ${r.k}: ${r.own} -> ${r.p}  raw ${r.raw == null ? '-' : r.raw.toFixed(2)}  [${r.how}]`));
console.log(`\nReference (REPORTED, council prompt 2026-11-10): Inkling P-322 vs live table: 88 exact / 11 off-by-one / 0 hard;`);
console.log(`with cross-side floor 6: 93/6/0; with floor 6 + cuts 1.5/4/9: 96/3/0 (candidate, fit on one table).`);
