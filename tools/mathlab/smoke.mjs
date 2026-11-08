#!/usr/bin/env node
// tools/mathlab/smoke.mjs — NEW tool (VLOC, 2026-11-08).
//
// Smoke mode for the VLOC mathlab suite: the minimal set that guards the engine
// math, in well under 60s. Q27 answer: minimal smoke set = {product hash pin,
// T7 metamorphic battery, T12 uncertainty check}; full 7-tool runner already
// runs in ~1.1s, so the smoke subset is ~0.4s.
//
// Read-only: never touches the product file or any protected constant.
//   * pins Football-Sim-PreColors.html sha256 before and after (refuses if bytes change)
//   * runs T7 metamorphic-battery.mjs (6 metamorphic invariants)
//   * runs T12 uncertainty.mjs check on the latest triangulate JSON
//
// Outputs a PASS/FAIL report + total elapsed time; exit 0 = all pass, 1 = any fail,
// 4 = hash refusal.
//
// Usage: node smoke.mjs
// Self-test: run against a corrupted copy of the product -> must REFUSE (exit 4).

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MATHLAB = HERE;
const ROOT = path.resolve(HERE, '..', '..');
const PRODUCT = path.join(ROOT, 'Football-Sim-PreColors.html');
const EXPECTED_SHA = '40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd';
const SHA_BEFORE = crypto.createHash('sha256').update(fs.readFileSync(PRODUCT)).digest('hex');
if (SHA_BEFORE !== EXPECTED_SHA) {
  console.error(`REFUSE: product hash ${SHA_BEFORE.slice(0, 16)} != expected Pre-Colors 40233d6be00e987c`);
  process.exit(4);
}

function run(name, cmd) {
  const t0 = Date.now();
  let output = '', ok = false;
  try {
    output = execSync(cmd, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
    ok = true;
  } catch (e) {
    ok = false;
    output = (e.stdout ? e.stdout.toString() : '') + (e.stderr ? '\nSTDERR:\n' + e.stderr.toString() : '');
  }
  const dt = ((Date.now() - t0) / 1000).toFixed(2) + 's';
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}  (${dt})`);
  if (output.trim()) console.log(output.trim().slice(0, 1200));
  return { name, ok, dt };
}

(async () => {
  const t0 = Date.now();
  console.log('=== VLOC smoke runner (minimal set, <60s target) ===\n');
  console.log(`Product: Football-Sim-PreColors.html  sha ${SHA_BEFORE.slice(0, 16)}\n`);

  const results = [];
  // 1. hash re-pin after eval (stability)
  results.push(run('product hash pin (before)', `node -e "const c=require('node:crypto');const f=require('node:fs');console.log(c.createHash('sha256').update(f.readFileSync('${PRODUCT}')).digest('hex').slice(0,16))"`));
  // 2. T7 metamorphic battery (6 invariants)
  results.push(run('T7 metamorphic-battery', `node ${path.join(MATHLAB,'metamorphic-battery.mjs')}`));
  // 3. T12 uncertainty wrap + check on latest triangulate JSON (mirrors run-all)
  let triangulateJson = null;
  try {
    const files = fs.readdirSync(path.join(MATHLAB,'results')).filter(f=>f.startsWith('triangulate-')&&f.endsWith('.json')).sort().reverse();
    triangulateJson = files.length ? path.join(MATHLAB,'results',files[0]) : null;
  } catch (e) {}
  if (triangulateJson) {
    results.push(run('T12 uncertainty wrap', `node ${path.join(MATHLAB,'uncertainty.mjs')} wrap "${triangulateJson}" "${triangulateJson}"`));
    results.push(run('T12 uncertainty check', `node ${path.join(MATHLAB,'uncertainty.mjs')} check "${triangulateJson}"`));
  } else {
    console.log('FAIL  T12 uncertainty wrap/check  (0s)    ERROR: no triangulate JSON found');
    results.push({ name: 'T12 uncertainty wrap/check', ok: false, dt: '0s' });
  }

  const shaAfter = crypto.createHash('sha256').update(fs.readFileSync(PRODUCT)).digest('hex');
  if (shaAfter !== SHA_BEFORE) { console.error('REFUSE: product file changed during run'); process.exit(5); }
  results.push(run('product hash pin (after, stability)', `node -e "const c=require('node:crypto');const f=require('node:fs');console.log('stable:', c.createHash('sha256').update(f.readFileSync('${PRODUCT}')).digest('hex').slice(0,16) === '${SHA_BEFORE.slice(0,16)}')"`));

  const total = ((Date.now() - t0) / 1000).toFixed(2) + 's';
  const nPass = results.filter(r=>r.ok).length;
  const nFail = results.filter(r=>!r.ok).length;
  console.log(`\n=== SMOKE SUMMARY === Total: ${results.length}  PASS: ${nPass}  FAIL: ${nFail}  wall: ${total} (<60s target)`);
  for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}  ${r.dt}`);
  process.exit(nFail > 0 ? 1 : 0);
})();
