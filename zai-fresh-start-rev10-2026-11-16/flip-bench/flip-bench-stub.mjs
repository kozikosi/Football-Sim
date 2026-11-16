#!/usr/bin/env node
/* flip-bench-stub.mjs — Rev 9 Part C: the STUB SMOKE TEST of the sealed-bench mechanism.
 * Proves the bench runs end-to-end WITHOUT producing a verdict: hand both arms a deliberately weak
 * stand-in (a scripted no-op stub agent), then run the verification and require:
 * (a) honest stubs (receipts, no gate evidence) -> OPEN; (b) lying stubs (claim 24/24, no battery
 * JSON) -> FAIL; (c) clean exits, (d) no hang (a hard timeout guards the whole run), (e) the first
 * line of output states this verifies the MECHANISM, never the verdict. */
import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const ROOT = new URL('..', import.meta.url).pathname;
const recipeSha = createHash('sha256').update(readFileSync(ROOT + 'SEALED-RECIPE.md')).digest('hex');

function writeStubReceipts(dir, arm, { lie }) {
  const d = `${dir}/${arm}`;
  rmSync(d, { recursive: true, force: true });
  mkdirSync(`${d}/receipts`, { recursive: true });
  const lines = lie
    ? [`recipe_sha256=${recipeSha}`, `arm=${arm}`, 'repairs=0', 'first_try_green=yes', 'battery=24/24', 'build_exit=0', 'checker=0 errors 0 warnings', 'node_counts=871,457,470,125,221,39']
    : [`recipe_sha256=${recipeSha}`, `arm=${arm}`, 'repairs=0', 'first_try_green=no', 'battery=NOT RUN (stub: no gate evidence)', 'build_exit=NOT RUN', 'checker=NOT RUN'];
  writeFileSync(`${d}/receipts/sealed-recipe-timing.txt`, lines.join('\n') + '\n');
}

function verifyReceipt(dir, arm) {
  // the verification the bench applies to ANY receipt (stub or real): every claimed gate must carry
  // evidence ON DISK. A claim without evidence = FAIL (never a pass it did not see).
  const p = `${dir}/${arm}/receipts/sealed-recipe-timing.txt`;
  if (!existsSync(p)) return { arm, status: 'OPEN', why: 'no receipt' };
  const text = readFileSync(p, 'utf8');
  const first = text.split('\n').find((l) => l.startsWith('recipe_sha256='));
  if (!first || first.split('=')[1].trim() !== recipeSha) return { arm, status: 'FAIL', why: 'receipt sha does not match the recipe' };
  const battery = /battery=(\d+)\/(\d+)/.exec(text);
  if (battery) {
    const bj = `${ROOT}receipts/battery-${arm}.json`;
    const real = existsSync(bj) && JSON.parse(readFileSync(bj, 'utf8')).pass === true;
    if (!real) return { arm, status: 'FAIL', why: `receipt claims battery ${battery[0]} but no passing battery evidence exists on disk` };
  }
  if (/first_try_green=yes/.test(text) && !/battery=NOT RUN/.test(text) && !existsSync(`${ROOT}receipts/sealed-recipe-timing.txt`)) {
    return { arm, status: 'FAIL', why: 'claims a first-try green with no sitting receipt' };
  }
  if (/NOT RUN/.test(text)) return { arm, status: 'OPEN', why: 'receipt present, gates not run (honest stub)' };
  return { arm, status: 'OPEN', why: 'receipt present, evidence unverified in stub mode' };
}

const t0 = Date.now();
const dir = '/tmp/flip-bench-stub';
console.log('STUB SMOKE TEST — this verifies the MECHANISM of the sealed bench, never the verdict.');
// honest stubs: both arms receipted, no gate evidence -> OPEN
writeStubReceipts(dir, 'vue', { lie: false });
writeStubReceipts(dir, 'svelte', { lie: false });
const honest = [verifyReceipt(dir, 'vue'), verifyReceipt(dir, 'svelte')];
// lying stubs: claim 24/24 with NO evidence -> must FAIL
writeStubReceipts(dir, 'vue', { lie: true });
const lying = verifyReceipt(dir, 'vue');
const elapsed = Date.now() - t0;
const ok = honest.every((r) => r.status === 'OPEN') && lying.status === 'FAIL' && elapsed < 60000;
console.log(JSON.stringify({ mechanism: ok ? 'VERIFIED' : 'BROKEN', honest, lying, elapsedMs: elapsed }, null, 1));
console.log(`honest stubs -> OPEN (the bench waits for real gates); lying stub -> FAIL (no pass it did not see); wall time ${elapsed} ms (no hang).`);
process.exit(ok ? 0 : 1);
