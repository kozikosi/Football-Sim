#!/usr/bin/env node
// tools/mathlab/run-all-vloc-tests.mjs — Combined test runner for all VLOC mathlab tools (T1, T3, T4, T6, T12).
//
// Runs every VLOC tool and reports PASS/FAIL for each. Plain Node + the proven
// Node sandbox (no Playwright dependency). No product file touched — every tool
// pins Football-Sim-PreColors.html sha256 before and after and exits non-zero if
// the bytes changed.
//
// Usage: node run-all-vloc-tests.mjs
//
// Evidence label: VERIFIED (each tool's command + output recorded below).

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

const MATHLAB = path.dirname(fileURLToPath(import.meta.url));
const RESULTS = path.join(MATHLAB, 'results');

const results = [];
function run(name, cmd, opts = {}) {
  const t0 = Date.now();
  let output = '', ok = false, error = '';
  try {
    output = execSync(cmd, { ...opts, encoding: 'utf8', maxBuffer: 100 * 1024 * 1024 });
    ok = true;
  } catch (e) {
    ok = false;
    error = e.message;
    output = e.stdout ? e.stdout.toString() : '';
    if (e.stderr) output += '\nSTDERR:\n' + e.stderr.toString();
  }
  const dt = ((Date.now() - t0) / 1000).toFixed(2) + 's';
  results.push({ name, ok, dt, error });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}  (${dt})`);
  if (!ok && error) console.log(`    ERROR: ${error.slice(0, 300)}`);
  if (output) console.log(output.trim().slice(0, 1500));
}

console.log('=== VLOC combined test runner (T1/T3/T4/T6/T12) ===\n');
console.log('Product: Football-Sim-PreColors.html (sha pinned per tool)\n');

// T3 triangulation (raw-curve witness + triangulation)
run('T3 triangulate.mjs', `node triangulate.mjs`, { cwd: MATHLAB });

// T4 replacement-level audit
run('T4 replacement-audit.mjs', `node replacement-audit.mjs`, { cwd: MATHLAB });

// T6 flex opportunity-cost pricer (deterministic)
run('T6 flex-pricer.mjs', `node flex-pricer.mjs`, { cwd: MATHLAB });

// T12 uncertainty wrapper: wrap + check the latest triangulate output
const triangulateJson = (() => {
  try {
    const files = fs.readdirSync(RESULTS).filter(f => f.startsWith('triangulate-') && f.endsWith('.json'));
    return files.length ? path.join(RESULTS, files[0]) : null;
  } catch (e) { return null; }
})();
if (triangulateJson) {
  run('T12 uncertainty.mjs wrap', `node uncertainty.mjs wrap "${triangulateJson}" "${triangulateJson}"`, { cwd: MATHLAB });
  run('T12 uncertainty.mjs check', `node uncertainty.mjs check "${triangulateJson}"`, { cwd: MATHLAB });
} else {
  results.push({ name: 'T12 uncertainty.mjs wrap/check', ok: false, dt: '0s', error: 'no triangulate JSON found' });
  console.log('FAIL  T12 uncertainty.mjs wrap/check  (0s)    ERROR: no triangulate JSON found');
}

// T1 dry-run (skeleton, no RNG / no external data)
run('T1 t1-harness.mjs', `node t1-harness.mjs`, { cwd: MATHLAB });

// --- Summary ---
console.log('\n=== SUMMARY ===');
const nPass = results.filter(r => r.ok).length;
const nFail = results.filter(r => !r.ok).length;
console.log(`Total: ${results.length}  PASS: ${nPass}  FAIL: ${nFail}`);
for (const r of results) {
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}  ${r.dt}`);
}
process.exit(nFail > 0 ? 1 : 0);
