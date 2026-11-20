#!/usr/bin/env node
/* verify-package.mjs — the PORTABLE package verifier (cakepanz-12 T4).
 *
 * The old quick-verify was `md5 -c CHECKSUMS.txt` — a NO-OP on macOS (BSD md5 cannot parse the
 * md5sum format; it exits 0 on a TAMPERED tree — three seats proved it). GNU md5sum is absent on
 * a stock Mac. This verifier uses node's own crypto — the same bytes verify on macOS and Linux,
 * with an EXPLICIT failure path: a tampered or missing file is named, and the exit code is 1.
 *
 * The CHECKSUMS.txt convention (cakepanz-12 T4): the manifest never lists ITSELF — a file cannot
 * contain its own digest, and the old empty-string self-line (d41d8cd9…) hashed nothing. Every
 * listed entry is a real content file; a clean run is "N OK / 0 FAILED / 0 missing" with N equal
 * to the number of content files.
 *
 * Usage: node tools/verify-package.mjs [PACKAGE_ROOT]   (default: the current directory)
 * Exit 0 = every entry verified AND the tree carries no unlisted file; exit 1 = at least one
 * FAILED, missing or EXTRA (each one is named). The converse check walks the tree and fails on
 * any file the manifest does not list (S13 — before it, an extra file passed silently).
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = path.resolve(process.argv[2] ?? '.');
const list = path.join(root, 'CHECKSUMS.txt');
if (!fs.existsSync(list)) { console.error('verify-package: no CHECKSUMS.txt in ' + root); process.exit(1); }
let ok = 0, failed = 0, missing = 0;
const lines = fs.readFileSync(list, 'utf8').split('\n').filter((l) => l.trim());
for (const line of lines) {
  const m = line.match(/^([0-9a-f]{32})\s\s?(.+)$/);
  if (!m) { console.error('verify-package: UNPARSEABLE line: ' + line.slice(0, 72)); failed++; continue; }
  const want = m[1], rel = m[2];
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) { console.error(rel + ': MISSING'); missing++; continue; }
  const got = createHash('md5').update(fs.readFileSync(p)).digest('hex');
  if (got === want) { ok++; } else { console.error(rel + ': FAILED (expected ' + want + ', got ' + got + ')'); failed++; }
}
console.log('verify-package: ' + ok + ' OK / ' + failed + ' FAILED / ' + missing + ' missing (' + lines.length + ' entries in ' + path.relative(process.cwd(), list) + ')');

// S13 (hy4's finding, Pickle-confirmed, Ernie-verified): the CONVERSE check. Walking the manifest
// proves the listed files are intact; it does NOT prove the tree is EXACTLY the listed set — an
// unlisted extra file used to pass with "N OK / 0 FAILED / 0 missing, exit 0" (reproduced
// independently by hy4 and Pickle with a planted NOT-IN-MANIFEST.txt). The walk below subtracts
// the manifest plus the two self-referential companions (CHECKSUMS.txt — a file cannot contain its
// own digest — and PACKAGE-DELIVERY-RECEIPT.txt, the packaging tool's own unverified log) and
// fails on ANY remainder: a stale or injected file can no longer ship unnoticed.
const listed = new Set(lines.flatMap((l) => { const m = l.match(/^([0-9a-f]{32})\s\s?(.+)$/); return m ? [m[2]] : []; }));
const SKIP = new Set(['CHECKSUMS.txt', 'PACKAGE-DELIVERY-RECEIPT.txt']);
const extra = [];
const walk = (dir) => {
  let es; try { es = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of es) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    const rel = path.relative(root, p).split(path.sep).join('/');
    if (SKIP.has(rel)) continue;
    if (!listed.has(rel)) extra.push(rel);
  }
};
walk(root);
if (extra.length > 0) {
  for (const e of extra) console.error('EXTRA (not in CHECKSUMS.txt): ' + e);
  console.log('verify-package: ' + extra.length + ' EXTRA file(s) on the tree that the manifest does not list — exit 1');
  process.exit(1);
}
console.log('verify-package: converse clean — the tree carries no unlisted file');
process.exit(failed + missing > 0 ? 1 : 0);
