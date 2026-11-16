#!/usr/bin/env node
// seam-check.mjs — the merge-day gate for the Cakepanz shell's engine seam.
//
// READS: a seam inventory manifest (JSON) describing every VM the shell relies on,
//        each pinned to an engine file + sha256 at the named pin.
// VERIFIES: for every named engine file, its sha256 against the tree to merge into
//           (a freshly extracted `colors/src` at the target pin, or the shell's vendored src/engine/).
// EXIT: 0 all pass · 1 any mismatch/missing · 2 usage/io error.
//
// NO ENGINE EDIT. This is an audit, not an editor. It reads bytes, hashes them, compares.
// Usage:
//   git archive <pin> colors/src | tar -x -C /tmp/pincheck
//   node seam-check.mjs --inventory seam-inventory.json --engine /tmp/pincheck/colors/src
//   node seam-check.mjs --inventory seam-inventory.json --engine <shell>/src/engine
'use strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const argv = process.argv.slice(2);
const opt = (name) => { const i = argv.indexOf('--' + name); return i >= 0 ? argv[i + 1] : undefined; };
const invPath = opt('inventory');
const engRoot = opt('engine');
if (!invPath || !engRoot) { console.error('usage: seam-check.mjs --inventory <manifest.json> --engine <colors/src root>'); process.exit(2); }

let inv;
try { inv = JSON.parse(fs.readFileSync(invPath, 'utf8')); } catch (e) { console.error('inventory unreadable/invalid JSON: ' + e.message); process.exit(2); }
if (!Array.isArray(inv.entries) || inv.entries.length === 0) { console.error('inventory has no entries[]'); process.exit(2); }
if (!engRoot || !fs.statSync(engRoot).isDirectory()) { console.error('engine root not a directory: ' + engRoot); process.exit(2); }

const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
let failed = 0;
for (const e of inv.entries) {
  const target = path.join(engRoot, e.file);
  if (!fs.existsSync(target)) { console.log(`FAIL ${e.vm} — missing: ${e.file}`); failed++; continue; }
  const got = sha256(target);
  if (got === e.sha256) console.log(`PASS ${e.vm} — ${e.file} sha256 matches (${got.slice(0, 12)}…)`);
  else { console.log(`FAIL ${e.vm} — ${e.file} sha256 ${got.slice(0, 12)}… != expected ${String(e.sha256).slice(0, 12)}…`); failed++; }
}
console.log(`\n${inv.entries.length} VM(s) checked · ${inv.entries.length - failed} pass · ${failed} FAIL`);
process.exit(failed === 0 ? 0 : 1);
