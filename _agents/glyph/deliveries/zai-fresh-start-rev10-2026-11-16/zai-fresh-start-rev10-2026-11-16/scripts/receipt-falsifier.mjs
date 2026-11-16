#!/usr/bin/env node
/* receipt-falsifier.mjs — Rev 10 EXT B falsifier: "for each new receipt, change one input by one
 * byte and show the receipt's command fails. A receipt you cannot invalidate is decoration."
 * For each receipt CLASS below this script copies the delivery tree to a scratch dir (the real
 * tree is never touched), applies ONE one-byte input mutation, re-runs the receipt's command
 * there, and requires a FAILURE. A class that does not fail is printed as NOT-FALSIFIABLE and
 * exits 1 — that receipt is decoration and must be fixed.
 * Runtime: the fast classes run always; the two slow classes (vitest, svelte-check) run unless
 * --fast is passed. */
import { spawnSync } from 'node:child_process';
import { cpSync, rmSync, mkdirSync, readFileSync, writeFileSync, existsSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const FAST = process.argv.includes('--fast');
const SCRATCH = `${tmpdir()}/receipt-falsifier-scratch`;
rmSync(SCRATCH, { recursive: true, force: true });
mkdirSync(SCRATCH, { recursive: true });
cpSync(ROOT, SCRATCH, { recursive: true, filter: (s) => !s.includes('node_modules') && !s.includes('/dist/') && !s.includes('/.git/') });
// the scratch copies need node_modules to run the consuming commands — symlink the REAL repos'
// node_modules in (never copied: the falsifier changes one byte of INPUT, not the environment)
for (const repo of ['football-sim-vue', 'football-sim-svelte']) {
  if (existsSync(join(ROOT, repo, 'node_modules'))) {
    symlinkSync(join(ROOT, repo, 'node_modules'), join(SCRATCH, repo, 'node_modules'), 'dir');
  }
}
const lastErr = {}; // per-class stderr/stdout tail, for the receipt
const results = [];
function falsify(id, receipt, mutate, cmd, cwd, expectFail = true) {
  mutate(SCRATCH);
  const r = spawnSync(cmd, { shell: true, cwd: join(SCRATCH, cwd), encoding: 'utf8', timeout: 300000, maxBuffer: 64 * 1024 * 1024 });
  lastErr[id] = ((r.stderr ?? '') + (r.stdout ?? '')).split('\n').filter((l) => l.trim()).slice(-3).join(' | ').slice(0, 300);
  const failed = (r.status ?? 1) !== 0;
  const ok = failed === expectFail;
  results.push({ id, receipt, cmd, exit: r.status, verdict: ok ? (expectFail ? 'FAILS-AS-REQUIRED' : 'PASSES-AS-REQUIRED') : 'NOT-FALSIFIABLE' });
  console.log(`${id}: ${ok ? (expectFail ? 'FAILS-AS-REQUIRED' : 'PASSES-AS-REQUIRED') : 'NOT-FALSIFIABLE'} — ${cmd} → exit ${r.status}`);
  if (!ok) console.log(`   tail: ${lastErr[id]}`);
}

// CLASS D — the manifest gate: one byte changed in a pinned file → gate FAIL (MISMATCH names it)
falsify('D1', 'receipts/gate-rev10-pass.txt (gate-manifest)', (s) => {
  const p = join(s, 'RECEIPT.md');
  writeFileSync(p, readFileSync(p, 'utf8').replace('every claim carries its command', 'every claim carries its comand')); // one byte-class edit
}, 'node scripts/gate-manifest.mjs .', '.');

// CLASS E — r51 verify-shipped: corrupt one byte INSIDE a patched byte-sequence → 19/19 breaks
falsify('E1', 'r51_patch.py --verify-shipped REV-5.1-addendum', (s) => {
  const patches = JSON.parse(readFileSync(join(s, 'scripts/r51-patches.json'), 'utf8')).replacements;
  // pick a patched sequence that lands in SLICE-DONE-PROPOSAL.md, corrupt its first byte in the file
  const p = patches.find((x) => x.file.includes('SLICE-DONE-PROPOSAL'));
  const f = join(s, 'REV-5.1-addendum/SLICE-DONE-PROPOSAL.md');
  const t = readFileSync(f, 'utf8');
  if (!t.includes(p.new)) throw new Error('patched sequence not present — wrong patch chosen');
  const corrupted = p.new[0] === 'x' ? 'y' + p.new.slice(1) : 'x' + p.new.slice(1);
  writeFileSync(f, t.replace(p.new, corrupted));
}, 'python3 scripts/r51_patch.py --verify-shipped REV-5.1-addendum', '.');

// CLASS F — numerals gate R1: battery JSON cards nodeCount off by one → legacy-scan hits
falsify('F1', 'gate-numerals --legacy-scan (R1 fidelity pin vs battery JSONs)', (s) => {
  const p = join(s, 'football-sim-svelte/probes/battery-svelte.json');
  const t = readFileSync(p, 'utf8').replace('"nodeCount": 871', '"nodeCount": 872'); // one byte-class edit
  if (!t.includes('"nodeCount": 872')) throw new Error('mutation did not land');
  writeFileSync(p, t);
}, 'node scripts/gate-numerals.mjs . --legacy-scan', '.');

// CLASS G — store-cost 2x2 --assert: one line added to a measured file → drift → exit 1
falsify('G1', 'receipts/store-cost-2x2.txt (--assert drift check)', (s) => {
  const p = join(s, 'football-sim-vue/src/stores/weekStore-sealed.ts');
  writeFileSync(p, readFileSync(p, 'utf8') + '\n// one line for the falsifier\n');
}, 'node scripts/store-cost-2x2.mjs --assert', '.');

// CLASS A — the truth-pinned unit gate (slow): one byte in truth.json → vitest fails
if (!FAST) falsify('A1', 'receipts/units-vue.txt (truth-pinned vitest)', (s) => {
  const p = join(s, 'football-sim-vue/probes/truth.json');
  const t = readFileSync(p, 'utf8');
  const idx = t.indexOf('"hs":');
  const flipped = t.slice(0, idx + 6) + (Number(t[idx + 6]) === 9 ? '1' : '9') + t.slice(idx + 7);
  writeFileSync(p, flipped);
}, 'npx vitest run src/stores/WeekStepperSealed.test.ts', 'football-sim-vue');

// CLASS B/C — the checker/build receipts (slow): one byte of type damage → check fails
if (!FAST) falsify('B1', 'receipts/build-svelte-check.txt (svelte-check 0/0)', (s) => {
  const p = join(s, 'football-sim-svelte/src/lib/state/weekStore-sealed.svelte.ts');
  const t = readFileSync(p, 'utf8').replace('const SEASON_YEAR = 2027;', 'const SEASON_YEAR: number = "2027";');
  if (t === readFileSync(p, 'utf8')) throw new Error('mutation did not land');
  writeFileSync(p, t);
}, 'npm run check', 'football-sim-svelte');

const bad = results.filter((r) => r.verdict === 'NOT-FALSIFIABLE');
console.log(`\n${results.length - bad.length}/${results.length} receipt classes falsifiable (all inputs restored — the scratch copy is deleted on the next run)`);
if (bad.length) process.exit(1);
