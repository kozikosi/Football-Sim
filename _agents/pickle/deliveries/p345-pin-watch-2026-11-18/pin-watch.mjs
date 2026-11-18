#!/usr/bin/env node
// pin-watch.mjs — read-only honesty gate for a deployed engine laydown.
//
// Part 6 of the 18-Nov round.  MUSE asks for a tool that catches a stale pin:
// a README that names an engine commit while the deployed bundle is a
// different (or uncheckable) set of bytes.  This tool does NOT edit anything.
// It reads a deployed tree and a council git repo and prints facts.
//
// Usage:
//   node pin-watch.mjs --tree <deployed-root> --repo <council-worktree> \
//       [--pin <sha>] [--bundle src/engine] [--json out.json]
//
// Exit codes: 0 = all checks PASS, 1 = at least one FAIL, 2 = UNKNOWN
// (a check could not be completed — never report UNKNOWN as PASS).

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const argv = process.argv.slice(2);
function opt(name, fallback = undefined) {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? fallback : argv[i + 1];
}
const tree = opt('tree');
const repo = opt('repo');
const pinOverride = opt('pin');
const bundle = opt('bundle', 'src/engine');
const jsonOut = opt('json');

if (!tree || !repo) {
  console.error('usage: pin-watch.mjs --tree <deployed-root> --repo <council-worktree> [--pin <sha>] [--bundle src/engine] [--json out.json]');
  process.exit(2);
}

function git(args) {
  return execFileSync('git', ['-C', repo, ...args], {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}
function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex').slice(0, 8);
}
function walk(root, base = root) {
  const out = [];
  if (!existsSync(root)) return out;
  for (const name of readdirSync(root)) {
    const p = join(root, name);
    if (statSync(p).isDirectory()) out.push(...walk(p, base));
    else if (/\.ts$/.test(name)) out.push(relative(base, p).split(sep).join('/'));
  }
  return out;
}

const checks = [];
function check(id, verdict, detail) {
  checks.push({ id, verdict, detail });
}

// ---- D1: the declared pin is discoverable in the deployed tree -------------
const readmePaths = ['README.md', 'readme.md', 'README.txt'];
const readmePath = readmePaths.find((p) => existsSync(join(tree, p)));
const readme = readmePath ? readFileSync(join(tree, readmePath), 'utf8') : '';
const pinMatch = readme.match(/\b([0-9a-f]{8,40})\b/);
const pin = pinOverride ?? pinMatch?.[1] ?? null;
check(
  'D1-pin-declared',
  pin ? 'PASS' : 'FAIL',
  pin ? `pin=${pin} from ${readmePath ?? '--pin override'}` : 'no README pin and no --pin override',
);

// ---- D2: that pin is a real commit in the council repo ---------------------
let pinExists = false;
if (pin) {
  try {
    git(['cat-file', '-e', `${pin}^{commit}`]);
    pinExists = true;
  } catch {
    pinExists = false;
  }
}
check(
  'D2-pin-resolves',
  pin ? (pinExists ? 'PASS' : 'FAIL') : 'UNKNOWN',
  pin ? `git cat-file -e ${pin}^{commit} → ${pinExists}` : 'no pin to resolve',
);

// ---- D3: layer-4 snapshot exists and declares the pin ----------------------
const snapPath = join(tree, 'SNAPSHOT.md');
let snapshot = null;
if (existsSync(snapPath)) snapshot = readFileSync(snapPath, 'utf8');
check(
  'D3-snapshot-present',
  snapshot === null ? 'FAIL' : snapshot.includes(pin ?? '\u0000') ? 'PASS' : 'FAIL',
  snapshot === null
    ? 'SNAPSHOT.md absent from deployed root — E2 layer 4 not satisfied'
    : snapshot.includes(pin ?? '\u0000')
      ? `SNAPSHOT.md names ${pin}`
      : 'SNAPSHOT.md present but does not name the declared pin',
);

// ---- D4: deployed engine bytes == engine bytes at the pin ------------------
// Path layouts differ: deployed `src/engine/<rest>` maps to pin
// `colors/src/<rest>` (the snapshot copies all of colors/src, not only engine/).
const deployed = walk(join(tree, bundle)).filter((p) => p.endsWith('.ts'));
let pinned = [];
if (pinExists) {
  try {
    pinned = git(['ls-tree', '-r', '--name-only', pin])
      .split('\n')
      .filter((p) => p.startsWith('colors/src/') && p.endsWith('.ts'))
      .map((p) => p.slice('colors/src/'.length));
  } catch {
    pinned = [];
  }
}
const pinnedSet = new Set(pinned);
const matched = [];
const mismatched = [];
const missing = [];
for (const p of deployed) {
  if (!pinnedSet.has(p)) {
    missing.push(p);
    continue;
  }
  const deployedSha = sha256(readFileSync(join(tree, bundle, p)));
  const pinnedBlob = git(['show', `${pin}:colors/src/${p}`]);
  const pinnedSha = sha256(Buffer.from(pinnedBlob));
  (deployedSha === pinnedSha ? matched : mismatched).push({ p, deployedSha, pinnedSha });
}
check(
  'D4-engine-bytes',
  !pinExists ? 'UNKNOWN' : deployed.length === 0 ? 'UNKNOWN' : mismatched.length === 0 ? 'PASS' : 'FAIL',
  !pinExists
    ? 'pin does not resolve; cannot compare'
    : `deployed=${deployed.length} pin-src=${pinned.length} matched=${matched.length} mismatched=${mismatched.length} not-at-pin=${missing.length}` +
      (mismatched.length ? ` firstMismatch=${JSON.stringify(mismatched[0])}` : '') +
      (missing.length ? ` firstNotAtPin=${missing[0]}` : ''),
);

check(
  'D4b-no-unpinned-additions',
  !pinExists ? 'UNKNOWN' : missing.length === 0 ? 'PASS' : 'UNKNOWN',
  !pinExists
    ? 'pin does not resolve'
    : missing.length === 0
      ? 'every deployed .ts file has a pin-path counterpart'
      : `${missing.length} deployed file(s) absent at pin (needs human review, not auto-fail): ${missing.slice(0, 5).join(', ')}`,
);

// ---- D5: the flex table the pin names is the table the pin contains --------
let tableVerdict = 'UNKNOWN';
let tableDetail = 'pin does not resolve';
if (pinExists) {
  try {
    const table = git(['show', `${pin}:tools/mathlab/flex.json`]);
    const tableSha = sha256(Buffer.from(table));
    const declared = snapshot?.match(/\b([0-9a-f]{8})\b(?=[^\n]*flex)/i)?.[1]
      ?? snapshot?.match(/flex[^\n]*\b([0-9a-f]{8})\b/i)?.[1]
      ?? readme.match(/flex[^\n]*\b([0-9a-f]{8})\b/i)?.[1]
      ?? null;
    tableVerdict = declared ? (declared === tableSha ? 'PASS' : 'FAIL') : 'UNKNOWN';
    tableDetail = `pin-table-sha=${tableSha} snapshot-declared=${declared ?? 'none'}`;
  } catch (e) {
    tableDetail = `could not read tools/mathlab/flex.json at ${pin}: ${e.message}`;
  }
}
check('D5-table-pin', tableVerdict, tableDetail);

const result = {
  tool: 'pin-watch.mjs',
  tree,
  repo,
  pin,
  bundle,
  checks,
  verdict: checks.some((c) => c.verdict === 'FAIL')
    ? 'FAIL'
    : checks.some((c) => c.verdict === 'UNKNOWN')
      ? 'UNKNOWN'
      : 'PASS',
};
const text = JSON.stringify(result, null, 2) + '\n';
if (jsonOut) {
  const { writeFileSync } = await import('node:fs');
  writeFileSync(jsonOut, text);
}
process.stdout.write(text);
process.exit(result.verdict === 'FAIL' ? 1 : result.verdict === 'UNKNOWN' ? 2 : 0);
