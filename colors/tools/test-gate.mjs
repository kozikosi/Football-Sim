#!/usr/bin/env node
// Test gate for the ratings-data hide (Owner, 22 Nov 2026: data/nfl/madden27-ratings.csv stays out of the first public cutover repo).
//   npm test                          full gate when the ratings file exists: runs exactly the old command, output unchanged.
//                                     public gate when it is absent: runs every test file EXCEPT the ones named in test/DATA-GATED.json,
//                                     and prints how many tests were not run and why. Never a silent green.
//   node tools/test-gate.mjs --verify  (data required) re-counts each gated file on its own and fails if the manifest is stale.
//   node tools/test-gate.mjs --record [files...]  (data required) rewrites the manifest from per-file counts; no files = keep the list.
// Accounting identity, checked by hand at the cutover: public pass + manifest gated count = the full-gate test count of the same commit.
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const RATINGS = join(ROOT, '..', 'data', 'nfl', 'madden27-ratings.csv');
const MANIFEST = join(ROOT, 'test', 'DATA-GATED.json');
const NODE_ARGS = ['--test', '--experimental-strip-types'];
const hasData = existsSync(RATINGS);

const readManifest = () => {
  const m = JSON.parse(readFileSync(MANIFEST, 'utf8'));
  if (!m || typeof m.files !== 'object') throw new Error('DATA-GATED.json: no files object');
  return m;
};
const posix = (p) => p.split('\\').join('/');
const allTests = () => readdirSync(join(ROOT, 'test'), { recursive: true }).map(posix).filter((f) => f.endsWith('.test.ts')).map((f) => 'test/' + f).sort();

// One file on its own; the count is the TAP "# tests" total, the same figure the full run sums.
function countOne(file) {
  const r = spawnSync(process.execPath, [...NODE_ARGS, file], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 << 20 });
  const n = (k) => Number((r.stdout.match(new RegExp('^# ' + k + ' (\\d+)', 'm')) || [])[1]);
  return { tests: n('tests'), fail: n('fail'), status: r.status };
}

const args = process.argv.slice(2);
const mode = args[0] === '--verify' ? 'verify' : args[0] === '--record' ? 'record' : 'run';

if (mode !== 'run' && !hasData) {
  console.error('test-gate: --' + mode + ' needs data/nfl/madden27-ratings.csv (it counts the gated files with the data present).');
  process.exit(2);
}

if (mode === 'run') {
  if (hasData) {
    // Full gate: byte-for-byte the command `npm test` ran before this wrapper existed.
    const r = spawnSync(process.execPath, [...NODE_ARGS, 'test/**/*.test.ts'], { cwd: ROOT, stdio: 'inherit' });
    process.exit(r.status ?? 1);
  }
  const m = readManifest(), gated = new Set(Object.keys(m.files));
  const missing = [...gated].filter((f) => !existsSync(join(ROOT, f)));
  if (missing.length) { console.error('test-gate: manifest names files that do not exist: ' + missing.join(', ')); process.exit(1); }
  const files = allTests().filter((f) => !gated.has(f));
  const r = spawnSync(process.execPath, [...NODE_ARGS, ...files], { cwd: ROOT, stdio: 'inherit' });
  const total = Object.values(m.files).reduce((a, b) => a + b, 0);
  console.log('\n# PUBLIC GATE (ratings file absent): ' + files.length + ' files ran; DATA-GATED, NOT RUN: ' + gated.size + ' files, ' + total + ' tests (full gate = this run\'s pass + ' + total + ').');
  for (const f of gated) console.log('# DATA-GATED ' + String(m.files[f]).padStart(3) + '  ' + f);
  console.log('# A failure above is real: a file that needs the data but is not in test/DATA-GATED.json shows up as a failed file, never a skip.');
  process.exit(r.status ?? 1);
}

if (mode === 'record') {
  const list = args.length > 1 ? args.slice(1).map(posix) : Object.keys(readManifest().files);
  const files = {};
  for (const f of list.sort()) {
    const c = countOne(f);
    if (c.status !== 0 || c.fail !== 0 || !(c.tests > 0)) { console.error('test-gate: ' + f + ' is not green with the data present (status ' + c.status + ', fail ' + c.fail + ', tests ' + c.tests + '); not recorded.'); process.exit(1); }
    files[f] = c.tests;
  }
  const out = { note: 'Test files that need data/nfl/madden27-ratings.csv at import time, with their test counts. Used by tools/test-gate.mjs when the file is absent (public repo). Regenerate with: node tools/test-gate.mjs --record', files };
  writeFileSync(MANIFEST, JSON.stringify(out, null, 2) + '\n');
  console.log('recorded ' + list.length + ' files, ' + Object.values(files).reduce((a, b) => a + b, 0) + ' tests -> ' + relative(ROOT, MANIFEST));
  process.exit(0);
}

// verify
const m = readManifest();
let bad = 0;
for (const [f, want] of Object.entries(m.files)) {
  if (!existsSync(join(ROOT, f))) { console.error('MISSING ' + f); bad++; continue; }
  const c = countOne(f);
  if (c.fail !== 0 || c.status !== 0) { console.error('NOT GREEN ' + f); bad++; } else if (c.tests !== want) { console.error('STALE ' + f + ': manifest ' + want + ', actual ' + c.tests); bad++; }
}
console.log(bad ? 'test-gate --verify: ' + bad + ' problem(s); run --record' : 'test-gate --verify: manifest matches ' + Object.keys(m.files).length + ' files, ' + Object.values(m.files).reduce((a, b) => a + b, 0) + ' tests');
process.exit(bad ? 1 : 0);
