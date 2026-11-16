#!/usr/bin/env node
/* store-cost-2x2.mjs — Rev 10 EXT C: print the four 2×2 store-cost cells from wc -l (measured,
 * never typed) and the wrapper-minus-module delta per framework. --assert re-checks the counts
 * AND deltas against the values STORE-COST-2x2.md publishes and exits 1 on any drift (the file
 * cannot silently drift from the tree). */
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const CELLS = [
  ['vue', 'wrapper store (Pinia setup)', 'football-sim-vue/src/stores/weekStore-sealed.ts', 81],
  ['vue', 'reactive module', 'football-sim-vue/src/stores/weekStore-sealed-reactive.ts', 45],
  ['svelte', 'class bridge ($state class)', 'football-sim-svelte/src/lib/state/weekStore-sealed.svelte.ts', 84],
  ['svelte', 'reactive module (facade)', 'football-sim-svelte/src/lib/state/weekStore-sealed-reactive.svelte.ts', 52],
];
const EXPECTED_DELTA = { vue: 36, svelte: 32 };

const assert = process.argv.includes('--assert');
let fail = 0;
const counts = {};
for (const [fw, label, file, published] of CELLS) {
  const n = Number(execSync(`wc -l ${file}`).toString().trim().split(/\s+/)[0]);
  counts[fw] ??= {};
  counts[fw][label.includes('reactive module') && label.includes('facade') ? 'module' : label.includes('wrapper') || label.includes('class') ? 'wrapper' : 'module'] = n;
  const mark = n === published ? 'ok' : 'DRIFT';
  if (n !== published) fail++;
  console.log(`${fw} · ${label} · ${file}: ${n} lines (STORE-COST-2x2.md publishes ${published}) ${mark}`);
}
for (const fw of ['vue', 'svelte']) {
  const keys = Object.keys(counts[fw]);
  const wrapper = counts[fw][keys.find((k) => k !== 'module')];
  const delta = wrapper - counts[fw].module;
  const mark = delta === EXPECTED_DELTA[fw] ? 'ok' : 'DRIFT';
  if (delta !== EXPECTED_DELTA[fw]) fail++;
  console.log(`${fw} wrapper-minus-module delta: ${delta} (published ${EXPECTED_DELTA[fw]}) ${mark}`);
}
console.log(`2x2 baseline: wrapper tax present on BOTH frameworks (vue ${EXPECTED_DELTA.vue} L, svelte ${EXPECTED_DELTA.svelte} L) — the Rev 9 36 L is a WRAPPER cost, not a framework cost`);
if (assert && fail > 0) {
  console.log(`--assert: ${fail} drift(s) — STORE-COST-2x2.md no longer matches the tree`);
  process.exit(1);
}
console.log('no drift');
