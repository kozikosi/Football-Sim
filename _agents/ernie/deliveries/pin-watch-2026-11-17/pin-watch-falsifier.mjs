#!/usr/bin/env node
// pin-watch-falsifier.mjs — proves pin-watch.mjs can FAIL, so a green run means something.
//
// A gate that never fails is not a gate. This falsifier drives pin-watch through three cases and
// asserts the verdict of each. If pin-watch ever returns the WRONG verdict (green on the live stale
// pin, or red on a tree that genuinely matches its pack), the FALSIFIER exits 1 — i.e. the tool is
// broken and this script says so. A pass here is the receipt that pin-watch discriminates.
//
// Cases:
//   A. LIVE CATCH      deployed 67-cakepanz vs the pin its README names (4ca9a071)  -> MUST exit 1, say COUNT 57 vs 52
//   B. SELF-CONTROL    d3bd81d2 tree vs its own name                                 -> MUST exit 0 (not always-red)
//   C. MOVED ANCHOR    --spot names a file that is not in the tree                    -> MUST exit 1 and NAME that file
//
// Usage: node pin-watch-falsifier.mjs [--root <repo>]
// Needs the git repo (it extracts trees with `git archive`). Zero third-party dependency.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const rootIdx = args.indexOf('--root');
const root = rootIdx >= 0 ? args[rootIdx + 1] : '.';
const here = path.dirname(new URL(import.meta.url).pathname);
const tool = path.join(here, 'pin-watch.mjs');
const packNamed = path.join(here, 'pack-4ca9a071.json');
const packActual = path.join(here, 'pack-d3bd81d2.json');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pin-watch-falsify-'));
const git = (...a) => execFileSync('git', a, { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] });
const run = (args) => {
  try {
    const out = execFileSync('node', [tool, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return { code: 0, out };
  } catch (e) {
    return { code: e.status ?? 1, out: (e.stdout?.toString?.() || '') + (e.stderr?.toString?.() || '') };
  }
};

let bad = 0;
const check = (name, cond, detail) => {
  process.stdout.write(`${cond ? 'ok  ' : 'FAIL'}  ${name}${cond ? '' : '  — ' + detail}\n`);
  if (!cond) bad++;
};

try {
  // extract the two trees the cases need
  const live = path.join(tmp, 'live');
  const ctl = path.join(tmp, 'ctl');
  fs.mkdirSync(live); fs.mkdirSync(ctl);
  // tar extraction via execFileSync pipeline
  const tarX = (ref, p, strip, dest) => {
    const buf = execFileSync('git', ['archive', ref, p], { cwd: root, maxBuffer: 1 << 28 });
    execFileSync('tar', ['-x', '-C', dest, `--strip-components=${strip}`], { input: buf });
  };
  tarX('origin/gh-pages', '67-cakepanz/src/engine', 3, live);
  tarX('d3bd81d2', 'colors/src', 2, ctl);

  // A. LIVE CATCH
  const a = run(['--tree', live, '--pack', packNamed]);
  check('A live catch exits 1', a.code === 1, `exit ${a.code}`);
  check('A live catch reports COUNT 57 vs 52', /COUNT\s+FAIL\s+tree has 57/.test(a.out) && /has 52/.test(a.out), a.out.trim());
  check('A live catch catches app.ts by content', /core\/app\.ts/.test(a.out) && /content differs/.test(a.out), a.out.trim());

  // B. SELF-CONTROL
  const b = run(['--tree', ctl, '--pack', packActual]);
  check('B self-control exits 0', b.code === 0, `exit ${b.code}: ${b.out.trim()}`);
  check('B self-control is all PASS', /RESULT: PASS/.test(b.out), b.out.trim());

  // C. MOVED ANCHOR — the guard that must fire
  const c = run(['--tree', live, '--pack', packNamed, '--spot', 'core/app.ts,core/does-not-exist.ts']);
  check('C moved anchor exits 1', c.code === 1, `exit ${c.code}`);
  check('C moved anchor names the missing file', /core\/does-not-exist\.ts/.test(c.out) && /anchor missing/.test(c.out), c.out.trim());
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

process.stdout.write(bad === 0 ? '\nFALSIFIER PASS — pin-watch discriminates (green is earned)\n' : `\nFALSIFIER FAIL — ${bad} assertion(s) failed; pin-watch is not trustworthy\n`);
process.exit(bad === 0 ? 0 : 1);