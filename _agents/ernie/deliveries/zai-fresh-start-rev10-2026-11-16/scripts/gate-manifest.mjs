#!/usr/bin/env node
/* gate-manifest.mjs — Rev 8 Part C2: the NESTED-MANIFEST GATE.
 * (1) finds EVERY CHECKSUMS.txt and MANIFEST.txt in a tree, not only the top-level one;
 * (2) verifies each against the bytes (sha256 / shasum format: "<hex>  <path>");
 * (3) fails on ANY mismatch, naming the file and the count. Exit 0 = all manifests verify.
 * Rev 10 (A4 — the vacuity fix, one level up from C2): a tree with NO manifest, or manifests
 * that parse to ZERO entries in total, FAILS — "0 entries verified across 0 manifest(s)" must
 * never print PASS. PASS now requires manifests.length > 0 AND entriesTotal > 0.
 * Rev 10 (A5 — the tree-scope fix): the gate also verifies the CONVERSE — that the tree contains
 * ONLY listed files. "N entries verified" verified the listed files match their hashes; it never
 * checked for files the manifests do not name, so an injected file still passed (Ernie's
 * EXTRA-INJECTED.txt probe: PASS, exit 0). Any non-excluded file absent from every manifest is
 * now a FAIL naming it; --allow-extra downgrades that to a WARN (for legitimate post-freeze
 * captures) but still prints the names. Excluded from the extra-file check (each with its
 * reason, mirrored in VERIFY.txt §1): the default walk exclusions (node_modules/.git/dist —
 * build/clone state), `.github/` at any depth (the repo CHECKSUMS.txt declared scope excludes
 * it — REV-9-ERRATA 0.7 — and CI carries the workflows), `receipts/gate-*` (gate stdout
 * captured after the freeze), and the manifest files themselves (a manifest cannot pin its own
 * pin; MANIFEST.txt is excluded from MANIFEST.txt by the same rule).
 * Run: node gate-manifest.mjs <tree-root> [--exclude node_modules,dist] [--allow-extra]
 * Verified paths are relative to each manifest's own directory (the shasum convention). */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative, dirname } from 'node:path';

const root = process.argv[2];
if (!root || !existsSync(root)) { console.error('usage: node gate-manifest.mjs <tree-root>'); process.exit(2); }
const allowExtra = process.argv.includes('--allow-extra');
const exclIdx = process.argv.indexOf('--exclude');
const excludes = exclIdx >= 0 ? process.argv[exclIdx + 1].split(',') : ['node_modules', '.git', 'dist'];
// A5: additional documented exclusions for the extra-file (converse) check only.
const extraExcludes = [...excludes, '.github'];

const manifests = [];
const allFiles = [];
(function walk(dir) {
  let entries;
  try { entries = readdirSync(dir); } catch { return; }
  for (const e of entries) {
    if (excludes.includes(e)) continue;
    const p = join(dir, e);
    let st; try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) { walk(p); continue; }
    allFiles.push(p);
    if (e === 'CHECKSUMS.txt' || e === 'MANIFEST.txt') manifests.push(p);
  }
})(root);

let failures = 0, checked = 0, entriesTotal = 0, unparseable = 0;
const listed = new Set(); // A5: every path named by any manifest, root-relative
const lines = [];
for (const mf of manifests) {
  listed.add(relative(root, mf));
  const base = dirname(mf);
  const raw = readFileSync(mf, 'utf8').split('\n');
  const rows = raw.filter((l) => l.trim().length > 0 && /^[0-9a-f]{64}\s+\S/.test(l));
  // Rev 9 (C2 fix): a manifest FILE that parses to 0 sha-entries is UNPARSEABLE, not a pass — the
  // Rev 6 failure mode (a 53-line prose manifest read as 0 entries and PASSED vacuously). Junk
  // lines that are neither sha-entries nor comments fail the manifest too: a manifest is a sha-list.
  const junk = raw.filter((l) => l.trim().length > 0 && !/^[0-9a-f]{64}\s+\S/.test(l) && !l.trim().startsWith('#'));
  let ok = 0, bad = 0, missing = 0;
  const badNames = [], missingNames = [];
  for (const row of rows) {
    const [hex, ...rest] = row.trim().split(/\s+/);
    const rel = rest.join(' ');
    const target = rel.startsWith('./') ? rel.slice(2) : rel;
    const file = join(base, target);
    entriesTotal++;
    listed.add(relative(root, file));
    if (!existsSync(file)) { missing++; missingNames.push(rel); continue; }
    checked++;
    const actual = createHash('sha256').update(readFileSync(file)).digest('hex');
    if (actual === hex.toLowerCase()) ok++;
    else { bad++; badNames.push(rel); }
  }
  if (rows.length === 0 || junk.length > 0) {
    unparseable++;
    failures += Math.max(1, junk.length);
    lines.push(`manifest ${relative(root, mf)}: UNPARSEABLE — ${rows.length} sha-entries, ${junk.length} non-entry line(s)${rows.length === 0 ? ' (a manifest that parses to nothing must NOT pass)' : ''}; first junk line: ${(junk[0] ?? '').trim().slice(0, 72) || '-'}`);
    continue;
  }
  const status = bad === 0 && missing === 0 ? 'PASS' : 'FAIL';
  lines.push(`manifest ${relative(root, mf)}: ${rows.length} entries, ${ok} OK, ${bad} MISMATCH, ${missing} MISSING → ${status}`);
  for (const n of badNames.slice(0, 15)) lines.push(`  MISMATCH ${relative(root, mf)} → ${n}`);
  if (badNames.length > 15) lines.push(`  … ${badNames.length - 15} more mismatched entries`);
  for (const n of missingNames.slice(0, 10)) lines.push(`  MISSING  ${relative(root, mf)} → ${n}`);
  if (missingNames.length > 10) lines.push(`  … ${missingNames.length - 10} more entries absent from this tree (manifest describes a tree with files this copy does not carry)`);
  failures += bad + missing;
}

// A5 converse check: every non-excluded file in the tree must be named by SOME manifest.
const extras = allFiles
  .map((f) => relative(root, f))
  .filter((rel) => !listed.has(rel))
  .filter((rel) => !extraExcludes.some((x) => rel === x || rel.startsWith(x + '/') || rel.split('/').includes(x)))
  .filter((rel) => !/^receipts\/gate-/.test(rel));
if (extras.length > 0) {
  const verdict = allowExtra ? 'WARN' : 'FAIL';
  lines.push(`${verdict}: ${extras.length} file(s) in the tree are named by NO manifest (the manifests verify the files they list; these are not listed):`);
  for (const n of extras.slice(0, 20)) lines.push(`  UNLISTED ${n}`);
  if (extras.length > 20) lines.push(`  … ${extras.length - 20} more unlisted files`);
  if (!allowExtra) failures += extras.length;
}

lines.unshift(`gate-manifest: ${manifests.length} manifest file(s) found under ${root}`);
if (manifests.length === 0) {
  lines.push('GATE RESULT: FAIL — no manifest found (a tree with no CHECKSUMS.txt/MANIFEST.txt has nothing to verify; 0 manifest(s) must NOT pass)');
  console.log(lines.join('\n'));
  process.exit(1);
}
if (entriesTotal === 0) {
  lines.push('GATE RESULT: FAIL — 0 entries in total across every manifest found (nothing was verified; PASS requires entriesTotal > 0)');
  console.log(lines.join('\n'));
  process.exit(1);
}
if (failures > 0) {
  lines.push(`GATE RESULT: FAIL — ${failures} problem(s) (of ${entriesTotal} entries across ${manifests.length} manifest(s)${unparseable ? `, ${unparseable} unparseable` : ''}${extras.length ? `, ${extras.length} unlisted file(s)` : ''})`);
  console.log(lines.join('\n'));
  process.exit(1);
}
lines.push(`GATE RESULT: PASS — ${entriesTotal} entries verified across ${manifests.length} manifest(s), no unlisted files`);
console.log(lines.join('\n'));
process.exit(0);
