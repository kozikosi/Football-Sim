#!/usr/bin/env node
// pin-watch.mjs — tripwire for stale engine pins (Ernie F-5).
// Count first (engine .ts files in tree vs named commit), spot-hash second
// (three engine files, tree vs named commit), manifest hash never alone.
// Usage: node tools/pin-watch.mjs [--commit <sha>] [--tree <path>] [--commit-tree <path>] [--spot <n>]
// Exit 0 on match, 1 on mismatch (names file + anchor).

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const args = process.argv.slice(2);
function get(flag, def) { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : def; }
const commit = get('--commit', '4ca9a071');
const tree = get('--tree', fs.existsSync('colors/src/engine') ? 'colors/src/engine' : (fs.existsSync('colors/src/sports/nfl/engine') ? 'colors/src/sports/nfl/engine' : 'src/engine'));
let commitTree = get('--commit-tree', '');
function git(cmd) { return execSync('git ' + cmd, { encoding: 'utf8', stdio: ['pipe','pipe','pipe'] }).trim(); }
function gitRaw(cmd) { return execSync('git ' + cmd, { encoding: 'buffer', stdio: ['pipe','pipe','pipe'] }); }

// auto-detect commit tree path
if (!commitTree) {
  for (const cand of [tree, 'colors/src/sports/nfl/engine', 'colors/src/engine', 'src/engine']) {
    try { const out = git('ls-tree -r --name-only ' + commit + ' -- ' + cand); if (out) { commitTree = cand; break; } } catch (e) {}
  }
  if (!commitTree) commitTree = tree;
}

let fail = false;
const findings = [];

let treeFiles = [];
try { treeFiles = fs.readdirSync(tree).filter(f => f.endsWith('.ts')).sort(); }
catch (e) { findings.push('TREE-MISSING: ' + tree + ' ' + e.message); fail = true; }

let commitFiles = [];
try {
  const out = git('ls-tree -r --name-only ' + commit + ' -- ' + commitTree);
  commitFiles = out.split('\n').filter(Boolean).map(f => path.basename(f)).sort();
} catch (e) { findings.push('COMMIT-UNREADABLE: ' + commit + ' ' + e.message); fail = true; }

if (!fail) {
  if (treeFiles.length !== commitFiles.length) {
    findings.push('COUNT-MISMATCH: tree=' + treeFiles.length + ' commit=' + commitFiles.length + ' (tree=' + tree + ', commit=' + commit + '@' + commitTree + ')');
    fail = true;
  }
  const onlyTree = treeFiles.filter(f => !commitFiles.includes(f));
  const onlyCommit = commitFiles.filter(f => !treeFiles.includes(f));
  if (onlyTree.length) findings.push('ONLY-IN-TREE: ' + onlyTree.join(', '));
  if (onlyCommit.length) findings.push('ONLY-IN-COMMIT: ' + onlyCommit.join(', '));
  if (onlyTree.length || onlyCommit.length) fail = true;
}

const spot = treeFiles.slice(0, parseInt(get('--spot','3'),10));
for (const f of spot) {
  const treePath = path.join(tree, f);
  let treeHash = 'MISSING';
  if (fs.existsSync(treePath)) {
    try { treeHash = git('hash-object ' + JSON.stringify(treePath)); } catch (e) { treeHash = 'ERR'; }
  }
  let commitHash = 'MISSING';
  try {
    const blob = gitRaw('show ' + commit + ':' + commitTree + '/' + f);
    commitHash = crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob ' + blob.length + '\0'), blob])).digest('hex');
    // git hash-object style: blob header
    const buf = Buffer.from('blob ' + Buffer.byteLength(blob,'utf8') + '\0' + blob, 'utf8');
    commitHash = crypto.createHash('sha1').update(buf).digest('hex');
  } catch (e) { commitHash = 'MISSING'; }
  // tree hash via git hash-object already includes header; compare raw file hash the same way
  let treeRaw = 'MISSING';
  if (fs.existsSync(treePath)) {
    const content = fs.readFileSync(treePath);
    const buf = Buffer.concat([Buffer.from('blob ' + content.length + '\0'), content]);
    treeRaw = crypto.createHash('sha1').update(buf).digest('hex');
  }
  if (treeRaw !== commitHash) {
    findings.push('SPOT-HASH-MISMATCH: ' + path.join(tree, f) + ' tree=' + treeRaw + ' commit=' + commitHash + ' (commit ' + commit + ')');
    fail = true;
  }
}

if (fail) {
  console.error('PIN-WATCH: FAIL');
  for (const f of findings) console.error('  ' + f);
  process.exit(1);
}
console.log('PIN-WATCH: OK tree=' + treeFiles.length + ' files commit=' + commit + '@' + commitTree + ' spot=' + spot.length);
