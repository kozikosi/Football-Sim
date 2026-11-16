#!/usr/bin/env node
// seam-check.mjs — the merge-day gate for the 67 Cakepanz shell (council tool, no dependencies).
//
// Reads a seam inventory (the JSON Z.ai's handoff note carries) and verifies, for every VM it
// names, that the engine file exists in the snapshot and its sha256 matches the inventory.
// Reports PASS/FAIL loudly, exits non-zero on any mismatch. An audit, not an editor: it writes
// nothing except a temp dir when it unpacks a zip.
//
// Usage:
//   node seam-check.mjs <inventory.json> <snapshot-dir|snapshot.zip>
//
// Inventory format v1:
//   {
//     "pin": "d3bd81d2",            // the engine commit the snapshot claims to carry
//     "generatedAt": "2026-11-16T…Z",
//     "entries": [
//       { "vm": "BoardRowVM", "engineFile": "sports/nfl/view/draftBoard.ts",
//         "sha256": "<64 hex>", "callers": ["BoardRow.svelte"] }
//     ]
//   }
// engineFile is relative to the snapshot root (the src/engine/ directory, or the directory the
// zip unpacks to). A zip with one top-level folder is descended into automatically.
//
// Exit codes: 0 = all PASS · 1 = any FAIL · 2 = usage or IO error.
import { createHash } from 'node:crypto';
import { createReadStream, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const sha256 = (p) =>
  new Promise((res, rej) => {
    const h = createHash('sha256');
    createReadStream(p).on('data', (d) => h.update(d)).on('end', () => res(h.digest('hex'))).on('error', rej);
  });

function expandRoot(arg) {
  if (existsSync(arg) && statSync(arg).isDirectory()) return { root: arg, temp: null };
  if (/\.zip$/.test(arg) && existsSync(arg)) {
    const temp = mkdtempSync(join(tmpdir(), 'seamzip-'));
    execFileSync('unzip', ['-q', resolve(arg), '-d', temp]);
    const top = readdirSync(temp);
    const root = top.length === 1 && statSync(join(temp, top[0])).isDirectory() ? join(temp, top[0]) : temp;
    return { root, temp };
  }
  return null;
}

const [invPath, rootArg] = process.argv.slice(2);
if (!invPath || !rootArg) {
  console.error('usage: node seam-check.mjs <inventory.json> <snapshot-dir|snapshot.zip>');
  process.exit(2);
}

let inv;
try {
  inv = JSON.parse(readFileSync(invPath, 'utf8'));
} catch (e) {
  console.error(`seam-check: cannot read inventory ${invPath}: ${e.message}`);
  process.exit(2);
}
if (!Array.isArray(inv.entries) || inv.entries.length === 0) {
  console.error('seam-check: inventory has no entries[] — nothing to verify');
  process.exit(2);
}

const expanded = expandRoot(rootArg);
if (!expanded) {
  console.error(`seam-check: no such snapshot dir or zip: ${rootArg}`);
  process.exit(2);
}
const { root, temp } = expanded;
console.log(`seam-check: pin ${inv.pin ?? '(unspecified)'} · snapshot ${root} · ${inv.entries.length} entries`);

let fail = 0;
for (const e of inv.entries) {
  if (!e?.vm || !e?.engineFile || !e?.sha256) {
    console.log(`FAIL ${e?.vm ?? '(unnamed entry)'} · malformed inventory entry (needs vm, engineFile, sha256)`);
    fail += 1;
    continue;
  }
  const p = join(root, e.engineFile);
  if (!existsSync(p)) {
    console.log(`FAIL ${e.vm} · missing file ${e.engineFile}`);
    fail += 1;
    continue;
  }
  const got = await sha256(p);
  if (got === String(e.sha256).toLowerCase()) {
    console.log(`PASS ${e.vm} · ${e.engineFile} · ${got.slice(0, 16)}…${e.callers ? ` · callers: ${e.callers.join(', ')}` : ''}`);
  } else {
    console.log(`FAIL ${e.vm} · ${e.engineFile} · expected ${String(e.sha256).slice(0, 16)}… got ${got.slice(0, 16)}… (stale pin or drifted file)`);
    fail += 1;
  }
}

if (temp) rmSync(temp, { recursive: true, force: true });
console.log(fail === 0 ? `seam-check: ALL PASS (${inv.entries.length} entries)` : `seam-check: ${fail} FAIL of ${inv.entries.length} entries`);
process.exit(fail === 0 ? 0 : 1);
