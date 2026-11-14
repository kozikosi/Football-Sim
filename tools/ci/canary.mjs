#!/usr/bin/env node
// tools/ci/canary.mjs: the CI canary. A gate that cannot fail is decoration, so this plants known violations in a scratch copy of
// colors/ and requires each boundary test to go red for the RIGHT reason. Exit 0 only if (a) the untouched copy passes and
// (b) every planted violation is caught by the test that is meant to catch it. Nothing in the real tree is modified.
//
//   node tools/ci/canary.mjs            run from the repo root (or anywhere: it finds the root from its own path)
//
// Plain Node >= 22.18 (type stripping), no dependencies, no network. Safe to run locally; it only writes under the OS temp dir.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const COLORS = path.join(ROOT, 'colors');
const TESTS = ['test/nfl/purity.test.ts', 'test/core/namespacing.test.ts', 'test/core/neutrality.test.ts'];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'canary-'));
const scratch = path.join(tmp, 'colors');
const fresh = () => {
  fs.rmSync(scratch, { recursive: true, force: true });
  fs.mkdirSync(scratch, { recursive: true });
  fs.cpSync(path.join(COLORS, 'src'), path.join(scratch, 'src'), { recursive: true });
  for (const t of TESTS) { fs.mkdirSync(path.dirname(path.join(scratch, t)), { recursive: true }); fs.copyFileSync(path.join(COLORS, t), path.join(scratch, t)); }
};
const run = (file) => {
  const r = spawnSync(process.execPath, ['--test', '--experimental-strip-types', '--test-reporter=tap', file], { cwd: scratch, encoding: 'utf8' });
  return { code: r.status, out: (r.stdout ?? '') + (r.stderr ?? '') };
};
const firstFile = (dir) => fs.readdirSync(dir).filter((f) => f.endsWith('.ts')).sort()[0];
const append = (rel, text) => fs.appendFileSync(path.join(scratch, rel), '\n' + text + '\n');

const plants = [
  { name: 'Math.random in an engine file', test: TESTS[0], must: /not ok .*engine purity: .* has no DOM, Math\.random/, plant: () => append('src/sports/nfl/engine/slots.ts', 'export const __canary = Math.random();') },
  { name: 'a bare Node import in an engine file', test: TESTS[0], must: /not ok .*engine purity: .* imports only sibling engine modules or src\/core/, plant: () => append('src/sports/nfl/engine/slots.ts', "import 'node:fs';") },
  { name: 'Date.now in core', test: TESTS[1], must: /not ok .*layout: core has no DOM, storage, clock/, plant: () => append('src/core/ids.ts', 'export const __canary = Date.now();') },
  { name: 'a sport reaching into another folder (core imports a sport)', test: TESTS[1], must: /not ok .*layout: core imports only core/, plant: () => append('src/core/ids.ts', "import '../sports/nfl/engine/slots.ts';") },
  { name: 'a framework import in the view layer', test: TESTS[2], must: /not ok .*neutrality: no file under src\//, plant: () => { const d = path.join(scratch, 'src/sports/nfl/view'); append('src/sports/nfl/view/' + firstFile(d), "import __react from 'react';"); } },
];

let bad = 0;
const say = (ok, msg) => { if (!ok) bad++; console.log((ok ? 'ok   ' : 'FAIL ') + msg); };
try {
  fresh();
  for (const t of TESTS) { const r = run(t); say(r.code === 0, `control: untouched copy passes ${t} (exit ${r.code})`); }
  for (const p of plants) {
    fresh(); p.plant();
    const r = run(p.test);
    say(r.code !== 0 && p.must.test(r.out), `canary: ${p.name} is caught by ${p.test} (exit ${r.code}${r.code !== 0 && !p.must.test(r.out) ? ', but not by the expected test' : ''})`);
  }
} finally { fs.rmSync(tmp, { recursive: true, force: true }); }
console.log(bad === 0 ? 'CANARY OK: every planted violation turned the right test red' : `CANARY FAILED: ${bad} problem(s). The gate cannot be trusted until this is fixed.`);
process.exit(bad === 0 ? 0 : 1);
