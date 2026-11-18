#!/usr/bin/env node
// tools/pin-watch.mjs — tripwire: detects when the engine trees have gone stale
// relative to a named commit. Run from a git repo (holds the commit objects);
// <tree-dir> is read as a plain filesystem tree (archive-extract safe: zero repo
// state needed there). Ernie's F-5 design: count first, spot-hash every engine
// file second (all of them — a three-file spot check misses tamper to anything
// else), manifest hash never alone.
// Usage: node tools/pin-watch.mjs <tree-dir> <named-commit>
//   e.g. node tools/pin-watch.mjs . HEAD        (tree-dir is the worktree)
//   e.g. node tools/pin-watch.mjs /tmp/extract 4ca9a071  (archive extract)
// Exit codes: 0 = pin holds; 1 = stale/mismatch (file + anchor named); 2 = usage.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const TREE = process.argv[2];
const COMMIT = process.argv[3];
if (!TREE || !COMMIT) {
  console.error('usage: node tools/pin-watch.mjs <tree-dir> <named-commit>');
  process.exit(2);
}

const ENGINE_DIR_CANDIDATES = [
  'colors/src/engine',
  'colors/src/sports/nfl/engine',
];

const REPO = process.cwd(); // git objects live here; tree-dir is read as files

function git(...args) {
  try {
    return execFileSync('git', args, { cwd: REPO, encoding: 'utf8', maxBuffer: 1 << 24, stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch {
    return '';
  }
}
function gitRaw(...args) {
  try {
    return execFileSync('git', args, { cwd: REPO, encoding: 'utf8', maxBuffer: 1 << 24, stdio: ['ignore', 'pipe', 'pipe'] });
  } catch {
    return '';
  }
}
function shaFile(p) {
  return createHash('sha256').update(readFileSync(p)).digest('hex');
}
function shaStr(s) {
  return createHash('sha256').update(s).digest('hex');
}

// Engine directory that actually exists (filesystem) in the tree.
function engineDirFs(cwd, dir) {
  for (const d of ENGINE_DIR_CANDIDATES) {
    if (existsSync(cwd + '/' + d)) return d;
  }
  return null;
}
// Engine directory that actually exists at a git commit.
function engineDirGit(ref) {
  for (const d of ENGINE_DIR_CANDIDATES) {
    const out = git('ls-tree', '-r', '--name-only', ref, '--', d);
    if (out.split('\n').some((l) => l.endsWith('.ts'))) return d;
  }
  return null;
}

const treeDir = engineDirFs(TREE);
if (!treeDir) {
  console.error('pin-watch: no engine directory found under ' + TREE + ' (checked ' + ENGINE_DIR_CANDIDATES.join(' / ') + ')');
  process.exit(1);
}
const commitDir = engineDirGit(COMMIT);

function fsEngineFiles(dir, engineDir) {
  const base = dir + '/' + engineDir;
  const out = [];
  try {
    for (const f of readdirSync(base, { withFileTypes: true })) {
      if (f.isFile() && f.name.endsWith('.ts')) out.push(engineDir + '/' + f.name);
    }
  } catch {}
  return out.sort();
}
function gitEngineFiles(ref, engineDir) {
  const out = git('ls-tree', '-r', '--name-only', ref, '--', engineDir);
  return out.split('\n').filter((l) => l.endsWith('.ts')).sort();
}

const treeFiles = fsEngineFiles(TREE, treeDir);
const commitFiles = commitDir ? gitEngineFiles(COMMIT, commitDir) : [];

let failed = 0;
const report = [];
report.push('engine dir tree: ' + treeDir + (commitDir ? '   engine dir @' + COMMIT + ': ' + commitDir : '   engine dir @' + COMMIT + ': NOT FOUND'));
report.push('count tree: ' + treeFiles.length + '   count @' + COMMIT + ': ' + commitFiles.length);
if (treeFiles.length !== commitFiles.length) {
  failed += 1;
  report.push('MISMATCH count: tree has ' + treeFiles.length + ' engine files, ' + COMMIT + ' has ' + commitFiles.length);
}
if (!commitDir) {
  failed += 1;
  report.push('MISMATCH: no engine directory found at ' + COMMIT + ' — the engine moved or the pin is wrong');
}

// Spot-hash second: every engine file present in both, tree vs commit, by basename.
// (All files compared — a three-file spot check misses tamper to anything else.)
const treeByBase = new Map();
for (const p of treeFiles) treeByBase.set(p.split('/').pop(), p);
const commitByBase = new Map();
for (const p of commitFiles) commitByBase.set(p.split('/').pop(), p);
const common = [...treeByBase.keys()].filter((b) => commitByBase.has(b)).sort();
const spot = common.slice(0, 3);
let firstMismatch = null;
for (const base of common) {
  const treePath = treeByBase.get(base);
  const commitPath = commitByBase.get(base);
  const treeSha = shaFile(TREE + '/' + treePath);
  let commitSha = '';
  try {
    commitSha = shaStr(gitRaw('show', COMMIT + ':' + commitPath));
  } catch { commitSha = 'UNREADABLE@' + COMMIT; }
  if (spot.includes(base)) report.push('spot ' + base + ': tree=' + treeSha.slice(0, 12) + ' commit=' + commitSha.slice(0, 12) + ' (anchor ' + commitPath + ')');
  if (treeSha !== commitSha && !firstMismatch) firstMismatch = { base, commitPath, treeSha, commitSha };
}
if (firstMismatch) {
  failed += 1;
  report.push('MISMATCH spot-hash ' + firstMismatch.base + ' (anchor ' + firstMismatch.commitPath + '): tree ' + firstMismatch.treeSha.slice(0, 12) + ' != ' + COMMIT + ' ' + firstMismatch.commitSha.slice(0, 12));
}

// Manifest hash never alone.
const manifest = ['CHECKSUMS.txt', 'checksums.txt', 'MANIFEST.md', 'manifest.json'].find((m) => existsSync(TREE + '/' + m));
if (manifest) {
  report.push('manifest present: ' + manifest + ' (manifest hash alone is insufficient — verify the engine files it names)');
} else {
  report.push('manifest: none found (count + spot-hash carry the check)');
}

if (failed > 0) {
  console.error('PIN-WATCH STALE (' + failed + ' check(s) failed) @ ' + COMMIT + ' in ' + TREE);
  for (const line of report) console.error('  ' + line);
  process.exit(1);
}
console.log('PIN-WATCH OK @ ' + COMMIT + ' in ' + TREE);
for (const line of report) console.log('  ' + line);
process.exit(0);
