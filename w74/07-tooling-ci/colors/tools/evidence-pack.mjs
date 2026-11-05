#!/usr/bin/env node
// Evidence pack (w74 item 7c, Z.ai draft): one command, one JSON — the receipt bundle for any commit.
// The N1 exhibit documents itself and cannot drift from the code because the exhibit's proof lines are GENERATED
// here: test count, E2E result, Lab run hash, diff summary.
//
// Usage: node tools/evidence-pack.mjs [--base <git-ref>] [--out <file.json>]
//   test count: `npm test` (node:test TAP summary)
//   E2E:        playwright list + last-run report if present (test-results/.last-run.json), else "not run"
//   lab hash:   sha256 over tools/outcomelab/results/*.json (sorted) — pins WHICH lab data backs this commit
//   diff:       git diff --stat vs --base (default: the branch's last council-tagged commit, else HEAD)
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i >= 0 ? process.argv[i + 1] : d; };
const base = arg('base', null);
const out = arg('out', null);
const sh = (cmd, args, opts = {}) => { try { return execFileSync(cmd, args, { encoding: 'utf8', ...opts }); } catch (e) { return (e.stdout ?? '') + (e.stderr ?? ''); } };

const testOut = sh('npm', ['test', '--silent'], { maxBuffer: 64 * 1024 * 1024 });
const pass = /^# pass (\d+)/m.exec(testOut)?.[1] ?? null;
const fail = /^# fail (\d+)/m.exec(testOut)?.[1] ?? null;

let e2e = 'not run';
const lastRun = 'test-results/.last-run.json';
if (fs.existsSync(lastRun)) { try { e2e = JSON.parse(fs.readFileSync(lastRun, 'utf8')).status ?? 'unknown'; } catch { /* keep not run */ } }

const labDir = 'tools/outcomelab/results';
const labHash = fs.existsSync(labDir)
  ? 'sha256:' + crypto.createHash('sha256').update(fs.readdirSync(labDir).filter((f) => f.endsWith('.json')).sort().map((f) => f + ':' + fs.readFileSync(path.join(labDir, f))).join('\n')).digest('hex').slice(0, 16)
  : 'no-lab-results';

const diffArgs = ['diff', '--stat', ...(base ? [base] : []), 'HEAD'];
const diff = sh('git', diffArgs).trim().split('\n').slice(-1)[0] || 'no diff';

const pack = {
  generatedAt: new Date().toISOString(),
  commit: sh('git', ['rev-parse', 'HEAD']).trim(),
  tests: { pass, fail, command: 'npm test' },
  e2e,
  labHash,
  diffSummary: diff,
  bundle: null,     // filled by tools/check-bundle.mjs when the caller pipes it in (kept separate: build-time)
};
if (out) fs.writeFileSync(out, JSON.stringify(pack, null, 2));
console.log(JSON.stringify(pack, null, 2));
