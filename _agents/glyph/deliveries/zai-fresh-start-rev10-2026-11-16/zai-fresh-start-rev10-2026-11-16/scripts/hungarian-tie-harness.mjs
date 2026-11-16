#!/usr/bin/env node
/* hungarian-tie-harness.mjs — Rev 10 EXT D1: the Hungarian's tie rule is UNTESTED.
 * colors/test/nfl/lineup.test.ts proves the solver's COST equals brute force on 300 random
 * matrices, but nothing pins WHICH optimum it returns. Ernie's one-character mutation
 * (hungarian.ts: `if (minv[j] < delta)` → `<=`) kept 300/300 cost-equal while CHANGING the
 * returned assignment on 5/300 — REPORTED; this harness reproduces the measurement on the
 * VENDORED engine (read-only: variant B is written to a temp dir, never into src/).
 *
 * Method: seeded RNG (mulberry32, seed 20261116, recorded), 300 integer-cost matrices
 * (sizes 4–5, costs 0–9 so ties are frequent), three counters:
 *   cost equal vs brute force (both variants) — expected 300/300 (the existing test's claim);
 *   assignment differs between the two tie rules — the UNTESTED number.
 * The first assignment-differing 4×4 matrix is printed with BOTH permutations and ALL optimal
 * permutations enumerated — the concrete case the §5 proposal pins.
 * Run: node scripts/hungarian-tie-harness.mjs   (exit 0 iff cost-equal holds on every matrix). */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';

const SRC = new URL('../football-sim-vue/src/engine/core/hungarian.ts', import.meta.url);
const src = readFileSync(SRC, 'utf8');
const ANCHOR = 'if (minv[j] < delta) { delta = minv[j]; j1 = j; }';
if ((src.match(/minv\[j\] < delta/g) ?? []).length !== 1) {
  console.error('ANCHOR NOT FOUND exactly once — the vendored hungarian.ts changed; STOP');
  process.exit(2);
}
const dir = `${process.env.TMPDIR || '/tmp'}/hungarian-tie`;
mkdirSync(dir, { recursive: true });
writeFileSync(`${dir}/variant-a.ts`, src); // the vendored file, byte-identical copy
writeFileSync(`${dir}/variant-b.ts`, src.replace(ANCHOR, ANCHOR.replace('minv[j] < delta', 'minv[j] <= delta')));
const A = (await import(`${dir}/variant-a.ts`)).hungarian;
const B = (await import(`${dir}/variant-b.ts`)).hungarian;

// mulberry32 — deterministic, seed recorded
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(20261116);
const randInt = (n) => Math.floor(rng() * n);

function bruteForceMinCost(cost) {
  const n = cost.length;
  const idx = [...Array(n).keys()];
  const perms = permute(idx);
  let best = Infinity, bestSet = [];
  for (const p of perms) {
    const c = p.reduce((s, col, row) => s + cost[row][col], 0);
    if (c < best) { best = c; bestSet = [p.slice()]; }
    else if (c === best) bestSet.push(p.slice());
  }
  return { best, bestSet };
}
function permute(a) {
  if (a.length <= 1) return [a];
  const out = [];
  for (let i = 0; i < a.length; i++) {
    const rest = a.slice(); const [x] = rest.splice(i, 1);
    for (const p of permute(rest)) out.push([x, ...p]);
  }
  return out;
}
const samePerm = (a, b) => a.every((v, i) => v === b[i]);

let costEqual = 0, assignDiff = 0, firstDiff = null;
for (let t = 0; t < 300; t++) {
  const n = t % 2 === 0 ? 4 : 5;
  const cost = Array.from({ length: n }, () => Array.from({ length: n }, () => randInt(10)));
  const { best, bestSet } = bruteForceMinCost(cost);
  const costOf = (col) => col.reduce((s, c, r) => s + cost[r][c], 0);
  const colA = A(cost), colB = B(cost);
  const okA = costOf(colA) === best, okB = costOf(colB) === best;
  if (okA && okB) costEqual++;
  else { console.error(`COST MISMATCH on trial ${t} — the existing cost guarantee does NOT hold for one of the variants`); process.exit(1); }
  if (!samePerm(colA, colB)) {
    assignDiff++;
    if (!firstDiff && n === 4) firstDiff = { t, cost, colA, colB, best, bestSet };
  }
}
console.log(`seed=20261116 · 300 matrices (4x4/5x5 alternating, integer costs 0-9)`);
console.log(`cost equal to brute force on ${costEqual}/300 (both tie-rule variants)`);
console.log(`assignment differs between the tie rules on ${assignDiff}/300`);
if (firstDiff) {
  console.log(`\nfirst differing 4x4 case (trial ${firstDiff.t}) — the §5 proposal's pinned permutation:`);
  for (const row of firstDiff.cost) console.log('  [ ' + row.join(', ') + ' ]');
  const permStr = (col) => col.map((c, r) => `r${r}->c${c}`).join(' ');
  console.log(`  variant A (<)  returns: ${permStr(firstDiff.colA)}  (cost ${firstDiff.best})`);
  console.log(`  variant B (<=) returns: ${permStr(firstDiff.colB)}  (cost ${firstDiff.best})`);
  console.log(`  optimal permutations (brute force, ${firstDiff.bestSet.length}): ${firstDiff.bestSet.map(permStr).join(' | ')}`);
  writeFileSync(`${dir}/first-diff-4x4.json`, JSON.stringify(firstDiff, null, 1));
  console.log(`  saved: ${dir}/first-diff-4x4.json`);
}
console.log(`done — the cost guarantee holds for BOTH tie rules; only the assignment differs`);
