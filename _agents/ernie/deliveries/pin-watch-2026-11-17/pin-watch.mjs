#!/usr/bin/env node
// pin-watch.mjs — a pin tripwire for a packaged engine tree (FOR: P-355).
//
// The defect it exists for: a tree whose DOCUMENTS name one engine commit while its BYTES are
// another. This is live on origin/gh-pages right now — 67-cakepanz/README.md:4 and
// CHECKSUMS-slice2.txt:2 both name 4ca9a071 (52 engine .ts files) while src/engine holds 57
// files, byte-identical to d3bd81d2. A manifest hash cannot catch it, because the manifest is
// exactly the thing that goes stale. Ernie's F-5 design (2026-11-17): count first, spot-hash
// second, never the manifest alone.
//
// This tool implements F-5 with two input modes and NO third-party dependency:
//
//   git mode (needs the repo, for CI / a live checkout):
//     node pin-watch.mjs --tree <ref:path> --named <commit> --at <path-in-named-commit> \
//          [--root <repo>] [--spot a.ts,b.ts,c.ts]
//
//   offline mode (zero repo state beyond the committed pack — a git archive extract):
//     node pin-watch.mjs --tree <dir> --pack <pack.json> [--spot a.ts,b.ts,c.ts]
//
// It runs two checks and exits non-zero if either fails:
//   1. COUNT  — number of *.ts under the tree vs the number the named pin should have.
//   2. SPOT   — sha256 of each spot file's CONTENT in the tree vs at the named pin.
// On any failure it prints the file and the anchor it checked, by name, and exits 1.
// It never returns 0 on input it could not fully check (a missing spot file is a FAIL, not a skip).
//
// Exit codes: 0 = every check passed · 1 = a check failed OR the input was uncheckable · 2 = bad usage.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 && i + 1 < args.length ? args[i + 1] : null; };
const has = (name) => args.includes(name);

const treeArg = opt('--tree');
const named = opt('--named');
const at = opt('--at');
const root = opt('--root') || '.';
const packPath = opt('--pack');
const spotArg = opt('--spot');

// The default spot set: three engine files present in both 4ca9a071 and d3bd81d2. app.ts DIFFERS
// between the two pins (so a same-count re-pin is still caught); hash.ts and at.ts are identical
// (controls, so a green run is not vacuous). Paths are relative to the engine root.
const DEFAULT_SPOT = ['core/app.ts', 'core/hash.ts', 'core/at.ts'];
const spotFiles = spotArg ? spotArg.split(',').map((s) => s.trim()).filter(Boolean) : DEFAULT_SPOT;

const git = (...a) => execFileSync('git', a, { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] });
const gitBuf = (...a) => execFileSync('git', a, { cwd: root, maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] });
const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const short = (h) => (h ? h.slice(0, 8) : '—');

function die(msg) { process.stderr.write(`pin-watch: ${msg}\n`); process.exit(2); }

// ---- resolve the two sides of the comparison --------------------------------
// Returns { count, hashOf(relPath) -> sha256 } for the TREE side and the EXPECTED side.

function walkTs(dir) {
  const out = [];
  const rec = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) rec(p);
      else if (e.isFile() && e.name.endsWith('.ts')) out.push(p);
    }
  };
  rec(dir);
  return out;
}

function treeSideOffline(dir) {
  if (!fs.existsSync(dir)) die(`--tree ${dir} does not exist`);
  const files = walkTs(dir);
  const hashOf = (rel) => {
    const abs = path.join(dir, rel);
    if (!fs.existsSync(abs)) return null;
    return sha256(fs.readFileSync(abs));
  };
  return { count: files.length, hashOf, label: dir };
}

function treeSideGit(refPath, atPath) {
  const [ref, p = ''] = refPath.split(/:(.*)/s);
  const out = git('ls-tree', '-r', '--name-only', ref, p).split('\n').map((s) => s.trim()).filter((s) => s.endsWith('.ts'));
  const hashOf = (rel) => {
    try { return sha256(gitBuf('show', `${ref}:${p ? p + '/' : ''}${rel}`)); } catch { return null; }
  };
  return { count: out.length, hashOf, label: refPath };
}

function expectedSideGit(commit, atPath) {
  const out = git('ls-tree', '-r', '--name-only', commit, atPath).split('\n').map((s) => s.trim()).filter((s) => s.endsWith('.ts'));
  const hashOf = (rel) => {
    try { return sha256(gitBuf('show', `${commit}:${atPath ? atPath + '/' : ''}${rel}`)); } catch { return null; }
  };
  return { count: out.length, hashOf, label: `${commit}:${atPath}` };
}

function expectedSideOffline(pack) {
  const hashOf = (rel) => (pack.spot && Object.prototype.hasOwnProperty.call(pack.spot, rel) ? pack.spot[rel] : null);
  return { count: pack.count, hashOf, label: `pack ${pack.named}` };
}

// ---- run --------------------------------------------------------------------
let tree, expected, modeLabel;
if (treeArg && treeArg.includes(':')) {
  if (!named || !at) die('git mode needs --tree <ref:path> --named <commit> --at <path>');
  tree = treeSideGit(treeArg, at);
  expected = expectedSideGit(named, at);
  modeLabel = `git mode: tree ${treeArg}  vs  named ${named}:${at}`;
} else if (treeArg && packPath) {
  const pack = JSON.parse(fs.readFileSync(packPath, 'utf8'));
  if (typeof pack.count !== 'number' || typeof pack.named !== 'string') die(`pack ${packPath} must have {named, count, spot}`);
  tree = treeSideOffline(treeArg);
  expected = expectedSideOffline(pack);
  modeLabel = `offline mode: tree ${treeArg}  vs  pack ${packPath} (named ${pack.named})`;
} else {
  die('give either --tree <ref:path> --named <commit> --at <path>  OR  --tree <dir> --pack <pack.json>');
}

const lines = [];
let fails = 0;
const fail = (s) => { fails++; lines.push('  ' + s); };
const pass = (s) => lines.push('  ' + s);

lines.push(`pin-watch: ${modeLabel}`);

// 1. COUNT — the cheap check that catches the live case (57 present, 52 named).
if (tree.count === expected.count) {
  pass(`COUNT  PASS  ${tree.count} .ts files (tree) == ${expected.count} (named ${expected.label})`);
} else {
  fail(`COUNT  FAIL  tree has ${tree.count} .ts files, ${expected.label} has ${expected.count} (off by ${tree.count - expected.count})`);
}

// 2. SPOT — content hash of each named file, tree vs named pin.
for (const rel of spotFiles) {
  const t = tree.hashOf(rel);
  const e = expected.hashOf(rel);
  if (t === null) { fail(`SPOT   FAIL  ${rel}  — not found in tree ${tree.label} (anchor missing)`); continue; }
  if (e === null) { fail(`SPOT   FAIL  ${rel}  — not found in ${expected.label} (anchor missing)`); continue; }
  if (t === e) pass(`SPOT   PASS  ${rel}  ${short(t)}`);
  else fail(`SPOT   FAIL  ${rel}  tree=${short(t)}  named=${short(e)}  (content differs)`);
}

const result = fails === 0 ? 'PASS' : `FAIL (${fails} check${fails === 1 ? '' : 's'})`;
lines.push(`RESULT: ${result}`);
process.stdout.write(lines.join('\n') + '\n');
process.exit(fails === 0 ? 0 : 1);