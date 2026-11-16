#!/usr/bin/env node
/* gate-manifest.mjs — Rev 8 Part C2: the NESTED-MANIFEST GATE.
 * (1) finds EVERY CHECKSUMS.txt and MANIFEST.txt in a tree, not only the top-level one;
 * (2) verifies each against the bytes (sha256 / shasum format: "<hex>  <path>");
 * (3) fails on ANY mismatch, naming the file and the count. Exit 0 = all manifests verify.
 * Run: node gate-manifest.mjs <tree-root> [--exclude node_modules,dist]
 * Verified paths are relative to each manifest's own directory (the shasum convention). */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative, dirname } from 'node:path';

const root = process.argv[2];
if (!root || !existsSync(root)) { console.error('usage: node gate-manifest.mjs <tree-root>'); process.exit(2); }
const exclIdx = process.argv.indexOf('--exclude');
const excludes = exclIdx >= 0 ? process.argv[exclIdx + 1].split(',') : ['node_modules', '.git', 'dist'];

const manifests = [];
(function walk(dir) {
  let entries;
  try { entries = readdirSync(dir); } catch { return; }
  for (const e of entries) {
    if (excludes.includes(e)) continue;
    const p = join(dir, e);
    let st; try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) walk(p);
    else if (e === 'CHECKSUMS.txt' || e === 'MANIFEST.txt') manifests.push(p);
  }
})(root);

let failures = 0, checked = 0, entriesTotal = 0, unparseable = 0;
const lines = [];
for (const mf of manifests) {
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
lines.unshift(`gate-manifest: ${manifests.length} manifest file(s) found under ${root}`);
if (failures > 0) {
  lines.push(`GATE RESULT: FAIL — ${failures} entr${failures === 1 ? 'y' : 'ies'} did NOT match (of ${entriesTotal} across ${manifests.length} manifest(s)${unparseable ? `, ${unparseable} unparseable` : ''})`);
  console.log(lines.join('\n'));
  process.exit(1);
}
lines.push(`GATE RESULT: PASS — ${entriesTotal} entries verified across ${manifests.length} manifest(s)`);
console.log(lines.join('\n'));
process.exit(0);
