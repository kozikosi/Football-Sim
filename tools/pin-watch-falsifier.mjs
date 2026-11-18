#!/usr/bin/env node
// tools/pin-watch-falsifier.mjs — falsifies tools/pin-watch.mjs itself.
// Moved-anchor guard: after tampering one engine file, pin-watch must NOT exit
// green. It must exit 1 naming the file and the anchor (commit path).
// Usage: node tools/pin-watch-falsifier.mjs <tree-dir> <named-commit>
//   <named-commit> must be one the tree matches at baseline (e.g. HEAD).
// Exit 0 = pin-watch behaves correctly; exit 1 = pin-watch is broken.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmdirSync, unlinkSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const TREE = process.argv[2];
const COMMIT = process.argv[3];
if (!TREE || !COMMIT) { console.error('usage: node tools/pin-watch-falsifier.mjs <tree-dir> <named-commit>'); process.exit(2); }

function run(cmd, args, opts = {}) {
  try {
    const r = execFileSync(cmd, args, { encoding: 'utf8', maxBuffer: 1 << 24, stdio: ['ignore', 'pipe', 'pipe'], ...opts });
    return { code: 0, out: String(r) };
  } catch (e) {
    return { code: e.status == null ? 1 : e.status, out: String(e.stdout == null ? '' : e.stdout) + String(e.stderr == null ? '' : e.stderr) };
  }
}

const pw = path.resolve('tools/pin-watch.mjs');
const TMP = mkdtempSync(path.join(os.tmpdir(), 'pin-watch-falsify-'));
// Clean archive extract (archive-extract shape: only committed files, no node_modules).
execFileSync('sh', ['-c', `git -C ${TREE} archive HEAD | tar -x -C ${TMP}`], { maxBuffer: 1 << 28 });

let failures = 0;
function check(label, cond, extra) {
  console.log((cond ? 'PASS' : 'FAIL') + ' ' + label + (extra ? ' — ' + extra : ''));
  if (!cond) failures += 1;
}

// Find an engine file present in the tree.
const candidates = ['colors/src/engine/drives.ts', 'colors/src/sports/nfl/engine/drives.ts'];
let target = null;
for (const p of candidates) if (existsSync(TREE + '/' + p)) { target = p; break; }
check('found an engine file to tamper', target != null, target || '(none)');

const anchor = target;
const orig = readFileSync(TREE + '/' + target, 'utf8');
writeFileSync(TMP + '/' + target, orig + '\n// falsifier probe line\n');

// 1. Baseline: tampered tree vs COMMIT must be RED (exit 1) and name file + anchor.
const tampered = run('node', [pw, TMP, COMMIT]);
check('tampered tree exits 1 (never green)', tampered.code === 1, tampered.out.slice(0, 200));
check('exit 1 names the file', tampered.out.includes(target) || tampered.out.includes(path.basename(target)), anchor);
check('exit 1 names the anchor', tampered.out.includes(COMMIT + ':' + anchor) || tampered.out.includes(anchor), anchor);

// 2. Restore: clean tree vs COMMIT must be GREEN (exit 0).
writeFileSync(TMP + '/' + target, orig);
const restored = run('node', [pw, TMP, COMMIT]);
check('restored tree exits 0', restored.code === 0, restored.out.slice(0, 200));

// Cleanup.
try { readdirSync(TMP).forEach((f) => { try { unlinkSync(TMP + '/' + f); } catch {} }); rmdirSync(TMP); } catch (e) {}

if (failures > 0) {
  console.error('FALSIFIER FAILED (' + failures + '): pin-watch is not a trustworthy tripwire');
  process.exit(1);
}
console.log('FALSIFIER OK: pin-watch detects the moved anchor, names file + anchor, and returns green when clean');
process.exit(0);
