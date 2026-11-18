#!/usr/bin/env node
// bucket-bar-falsifier.mjs — proves bucket-bar.ts discriminates (green is earned).
//
// bucket-bar is a REPORT, not a gate: it prints a decomposition and exits 0. The one way it can
// lie is by printing numbers when its input pack is missing or wrong. This falsifier asserts:
//   A. real packs  -> exit 0 and prints a sack-rate line (the tool works).
//   B. a missing pack (moved anchor) -> exit 1, prints NO sack-rate line, and NAMES the missing pack.
// If the tool ever printed a rate on the missing pack, or failed on the real packs, the FALSIFIER
// exits 1 — the tool is broken and this says so.
//
// Usage: node bucket-bar-falsifier.mjs [--root <repo>]
// Extracts colors+data from the Architect tip with `git archive` (zero repo state beyond the packs),
// drops bucket-bar.ts (sibling of this file) into colors/tools/, and runs it on Node with type-strip.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const rootIdx = args.indexOf('--root');
const root = rootIdx >= 0 ? args[rootIdx + 1] : '.';
const here = path.dirname(new URL(import.meta.url).pathname);
const toolSrc = path.join(here, 'bucket-bar.ts');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bucket-bar-falsify-'));
const git = (...a) => execFileSync('git', a, { cwd: root, maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] });
const run = (args) => {
  try {
    const out = execFileSync(process.execPath, ['--experimental-strip-types', ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
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
  fs.mkdirSync(path.join(tmp, 'colors'), { recursive: true });
  const buf = git('archive', 'origin/architect/engine-and-seats', 'colors', 'data');
  execFileSync('tar', ['-x', '-C', tmp], { input: buf });
  fs.copyFileSync(toolSrc, path.join(tmp, 'colors/tools/bucket-bar.ts'));
  const tool = path.join(tmp, 'colors/tools/bucket-bar.ts');

  // A. real packs, small N to keep it quick
  const a = run([tool, '2000', 'nfl-pools-fit2023-2025', 'nfl-passclass-fit2023-2025']);
  check('A real packs exit 0', a.code === 0, `exit ${a.code}: ${a.out.trim().slice(0, 200)}`);
  check('A prints a sack-rate line', /sack rate/.test(a.out), a.out.trim().slice(0, 200));

  // B. moved anchor — a pack that does not exist
  const b = run([tool, '2000', 'nfl-pools-DOES-NOT-EXIST', 'nfl-passclass-fit2023-2025']);
  check('B missing pack exits 1', b.code === 1, `exit ${b.code}`);
  check('B prints NO sack-rate line', !/sack rate/.test(b.out), 'it printed a rate on a missing pack');
  check('B names the missing pack', /nfl-pools-DOES-NOT-EXIST/.test(b.out) && /anchor missing/.test(b.out), b.out.trim());
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

process.stdout.write(bad === 0 ? '\nFALSIFIER PASS — bucket-bar fails loudly on a moved anchor (green is earned)\n' : `\nFALSIFIER FAIL — ${bad} assertion(s) failed; bucket-bar is not trustworthy\n`);
process.exit(bad === 0 ? 0 : 1);