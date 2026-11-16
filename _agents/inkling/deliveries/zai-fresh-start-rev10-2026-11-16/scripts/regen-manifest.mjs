#!/usr/bin/env node
/* regen-manifest.mjs — Rev 10: the packaging step, COMPUTED not typed (CORE 2 + A5 companion).
 * Rev 9's repo entry counts (129/132) were typed into prose and went stale against the shipped
 * manifests (141/142). This tool makes the packaging numbers reproducible: it REGENERATES the
 * packaging artifacts with fixed, documented rules and PRINTS the counts, so the prose can quote
 * the gate/tool output instead of a hand-typed number.
 *
 * Subcommands:
 *   node scripts/regen-manifest.mjs root              regenerate root MANIFEST.txt over the tree
 *                                                     (excluding node_modules/.git/dist/.github,
 *                                                     every CHECKSUMS.txt/MANIFEST.txt, and
 *                                                     receipts/gate-* post-freeze captures)
 *   node scripts/regen-manifest.mjs root-checksums    regenerate root CHECKSUMS.txt (pins
 *                                                     MANIFEST.txt, RECEIPT.md, DELIVERY-NOTE.md,
 *                                                     verified-as-of.json — same 4 rows, fresh
 *                                                     hashes; a manifest cannot pin its own pin)
 *   node scripts/regen-manifest.mjs repo <dir>        regenerate <dir>/CHECKSUMS.txt (repo scope:
 *                                                     exclude node_modules/.git/dist/.github and
 *                                                     itself — the Rev 9 Part 0 declared scope)
 *   node scripts/regen-manifest.mjs counts            print the computed entry count of EVERY
 *                                                     CHECKSUMS.txt/MANIFEST.txt in the tree
 *                                                     (the number the docs must quote)
 * Root MANIFEST row format is `"<hex>  ./<path>"` sorted by path; repo/root-CHECKSUMS rows are
 * `"<hex>  <relative-path>"` sorted (root CHECKSUMS keeps its fixed 4-row order). */
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';

const arg = process.argv[2];
const arg2 = process.argv[3];
if (!arg || (arg === 'repo' && !arg2)) {
  console.error('usage: node scripts/regen-manifest.mjs root|root-checksums|counts|repo <dir>');
  process.exit(2);
}

const sha256 = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

function walkFiles(dir, { excludeDirs, excludeFile }) {
  const out = [];
  (function rec(d) {
    for (const e of readdirSync(d).sort()) {
      if (excludeDirs.includes(e)) continue;
      const p = join(d, e);
      const st = statSync(p);
      if (st.isDirectory()) rec(p);
      else if (!excludeFile(e, relative('.', p))) out.push(p);
    }
  })(dir);
  return out;
}

const DIR_EXCL = ['node_modules', '.git', 'dist', '.github'];
const isManifestFile = (name) => name === 'CHECKSUMS.txt' || name === 'MANIFEST.txt';

if (arg === 'root') {
  const files = walkFiles('.', {
    excludeDirs: DIR_EXCL,
    excludeFile: (name, rel) => isManifestFile(name) || /^receipts\/gate-/.test(rel),
  });
  const rows = files.map((p) => `${sha256(p)}  ./${relative('.', p)}`);
  writeFileSync('MANIFEST.txt', rows.join('\n') + '\n');
  console.log(`MANIFEST.txt regenerated: ${rows.length} entries`);
  process.exit(0);
}

if (arg === 'root-checksums') {
  const pins = ['MANIFEST.txt', 'RECEIPT.md', 'DELIVERY-NOTE.md', 'verified-as-of.json'];
  const rows = pins.map((p) => `${sha256(p)}  ${p}`);
  writeFileSync('CHECKSUMS.txt', rows.join('\n') + '\n');
  console.log(`CHECKSUMS.txt regenerated: ${rows.length} entries (fixed pin order)`);
  process.exit(0);
}

if (arg === 'repo') {
  const dir = arg2.replace(/\/+$/, '');
  if (!existsSync(dir)) { console.error(`no such dir: ${dir}`); process.exit(2); }
  const files = walkFiles(dir, {
    excludeDirs: DIR_EXCL,
    excludeFile: (name, rel) => rel === `${dir}/CHECKSUMS.txt` || name === 'CHECKSUMS.txt',
  });
  const rows = files.map((p) => `${sha256(p)}  ${relative(dir, p)}`);
  writeFileSync(join(dir, 'CHECKSUMS.txt'), rows.join('\n') + '\n');
  console.log(`${dir}/CHECKSUMS.txt regenerated: ${rows.length} entries`);
  process.exit(0);
}

if (arg === 'counts') {
  const manifests = [];
  (function rec(d) {
    for (const e of readdirSync(d).sort()) {
      if (['node_modules', '.git', 'dist'].includes(e)) continue;
      const p = join(d, e);
      if (statSync(p).isDirectory()) rec(p);
      else if (isManifestFile(e)) manifests.push(p);
    }
  })('.');
  for (const mf of manifests) {
    const n = readFileSync(mf, 'utf8').split('\n').filter((l) => /^[0-9a-f]{64}\s+\S/.test(l)).length;
    console.log(`${mf}: ${n} entries`);
  }
  process.exit(0);
}

console.error(`unknown subcommand: ${arg}`);
process.exit(2);
