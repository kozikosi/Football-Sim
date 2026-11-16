#!/usr/bin/env node
/* fetch-r51-inputs.mjs — Rev 10 EXT B: make `r51_patch.py --reproduce` turnkey for someone who is
 * not the author. The reproduce command needs TWO inputs this zip does not carry (both published
 * on the council branches):
 *   1. the pre-patch tree  — council/inkling @ 85a54b66,
 *                            _agents/inkling/deliveries/zai-sitting-2026-11-15-authoring/
 *   2. the Rev 6 published addendum — council/glyph,
 *                            _agents/glyph/deliveries/zai-fresh-start-2026-11-15/REV-5.1-addendum/
 * --reproduce reads ONLY the 12 patch-target files (r51-patches.json's file set — apply_to_tree
 * touches exactly those, and the byte-compare covers exactly those), so this script fetches those
 * 12 files per side from raw.githubusercontent.com (public HTTPS), verifies every sha256 against
 * receipts/r51-inputs-hashes.json (recorded from the branches this sitting), then prints the two
 * reproduce commands. No GitHub API needed (the API endpoint 403-blocks from this sandbox; raw
 * does not — VERIFIED this sitting). OFFLINE ALTERNATIVE (also VERIFIED): clone the repo and
 * `git archive <ref> -- <path> | tar -x` both trees, then run --reproduce on the extracts.
 * Run: node scripts/fetch-r51-inputs.mjs <workdir>   (default: a temp dir). Network: timeout +
 * 2 attempts per file (working rules). */
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = process.argv[2] || `${process.env.TMPDIR || '/tmp'}/r51-inputs`;

const INPUTS = [
  {
    name: 'pre-patch-tree',
    ref: '85a54b66',
    base: '_agents/inkling/deliveries/zai-sitting-2026-11-15-authoring',
    raw: (p) => `https://raw.githubusercontent.com/kozikosi/Football-Sim/85a54b66/${p}`,
  },
  {
    name: 'rev6-addendum',
    ref: 'council/glyph (tip)',
    base: '_agents/glyph/deliveries/zai-fresh-start-2026-11-15/REV-5.1-addendum',
    raw: (p) => `https://raw.githubusercontent.com/kozikosi/Football-Sim/council/glyph/${p}`,
  },
];
const HASHES = JSON.parse(readFileSync(join(ROOT, 'receipts/r51-inputs-hashes.json'), 'utf8'));

async function get(url, tries = 2) {
  for (let i = 1; i <= tries; i++) {
    try {
      const c = new AbortController();
      const t = setTimeout(() => c.abort(), 30000);
      const r = await fetch(url, { signal: c.signal, headers: { 'user-agent': 'zai-rev10-fetch' } });
      clearTimeout(t);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return Buffer.from(await r.arrayBuffer());
    } catch (e) {
      if (i === tries) throw e;
    }
  }
}

let fail = 0;
for (const inp of INPUTS) {
  console.log(`fetching ${inp.name} (${inp.ref}) — the 12 patch-target files …`);
  const names = Object.keys(HASHES.files[inp.name] ?? {});
  let ok = 0;
  for (const rel of names) {
    const buf = await get(inp.raw(`${inp.base}/${rel}`));
    const sha = createHash('sha256').update(buf).digest('hex');
    if (sha !== HASHES.files[inp.name][rel]) {
      console.error(`  HASH MISMATCH ${rel}: got ${sha.slice(0, 16)}… want ${HASHES.files[inp.name][rel].slice(0, 16)}…`);
      fail++;
      continue;
    }
    const dst = join(OUT, inp.name, rel);
    mkdirSync(dirname(dst), { recursive: true });
    writeFileSync(dst, buf);
    ok++;
  }
  console.log(`  ${ok}/${names.length} files fetched and hash-verified → ${OUT}/${inp.name}`);
}
if (fail > 0) { console.error(`FAIL: ${fail} hash mismatch(es) — do NOT run --reproduce against tampered inputs`); process.exit(1); }
console.log(`\nnow run, from the delivery root:`);
console.log(`  python3 scripts/r51_patch.py --reproduce ${OUT}/pre-patch-tree ${OUT}/rev6-addendum   # expect 12/12 IDENTICAL, exit 0`);
console.log(`  python3 scripts/r51_patch.py --reproduce ${OUT}/pre-patch-tree REV-5.1-addendum       # expect 11/12, exit 1 (SLICE-DONE-PROPOSAL.md)`);
