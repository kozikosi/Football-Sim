/* gate-manifest.mjs — MANIFEST.txt integrity: every listed file exists with the listed sha256;
   every tree file (outside node_modules) is listed (the converse check) — INCLUDING dist/ (the D4
   fix: the gate was blind to the build output). Also asserts the BOOT TARGET: every asset
   dist/index.html references must exist and carry its manifest sha256, and dist/single.html (the
   file:// artifact) must exist. Exit 1 on any break.
   The cakepanz-7 fix: the gate is ROBUST TO ITS OWN RECEIPTS — the receipt layer
   (deliveries/receipts/) and any gate-manifest-*.log join the self-reference exclusion that
   MANIFEST.txt/CHECKSUMS.txt/ACCEPTANCE-RECEIPTS.txt already ride (the converse walk skipped
   shots/ but NOT the receipt path, so a receipt written into the tree failed the NEXT gate run;
   Beam's root cause, 2026-11-18). The receipt law is unchanged: a receipt is the raw stdout of
   the tool at the final state; if the state changes, the receipt is rewritten. */
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto';
const TREE = path.resolve(new URL('..', import.meta.url).pathname);
const manifest = fs.readFileSync(path.join(TREE, 'MANIFEST.txt'), 'utf8').trim().split('\n').filter(Boolean);
const shaOf = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const isReceipt = (rel) => rel.startsWith('deliveries/receipts/') || /(^|\/)gate-manifest-[^/]*\.log$/.test(rel);   // the receipt layer joins the self-reference exclusion (cakepanz-7)
let fail = 0;
for (const line of manifest) {
  const [sha, rel] = line.split(/\s+/, 2);
  if (rel === 'MANIFEST.txt' || rel === 'CHECKSUMS.txt' || rel === 'ACCEPTANCE-RECEIPTS.txt') continue;   // self-referential by design (regen excludes them; the gate skips them)
  if (isReceipt(rel)) continue;                                                                          // receipts join it (cakepanz-7) — a rewritten receipt can never fail a listed hash
  const p = path.join(TREE, rel);
  if (!fs.existsSync(p)) { console.log('MANIFEST FAIL (missing):', rel); fail = 1; continue; }
  if (shaOf(p) !== sha) { console.log('MANIFEST FAIL (hash):', rel); fail = 1; }
}
// the D4 boot-target law: the package either boots or it does not — no middle state
const distIndex = path.join(TREE, 'dist', 'index.html');
if (!fs.existsSync(distIndex)) { console.log('MANIFEST FAIL: dist/index.html (the boot target) is missing'); fail = 1; }
else {
  const html = fs.readFileSync(distIndex, 'utf8');
  // the continuation's sitting 3 (the run-3 finding): the boot-target parse only matched './'-prefixed
  // refs — vite's base '/' emits '/assets/...' and the law read ZERO referenced assets (blind, and the
  // gate FAILED instead of checking). The LAW is unchanged — every asset the boot target references
  // must exist and carry its manifest sha256 — the parser now sees both './x' and '/x' (coverage 0→2,
  // strictly more checked, never less).
  const refs = [...html.matchAll(/(?:<script[^>]*src="|<link[^>]*href=")(\.?\/[^"]+)"/g)].map((m) => m[1]);
  if (!refs.length) { console.log('MANIFEST FAIL (boot target): dist/index.html references no assets'); fail = 1; }
  const hashes = new Map(manifest.map((l) => l.split(/\s+/, 2)).map(([h, r]) => [r, h]));
  for (const ref of refs) {
    const rel = 'dist/' + ref.replace(/^\.?\//, '');
    const p = path.join(TREE, rel);
    if (!fs.existsSync(p)) { console.log('MANIFEST FAIL (boot target missing):', rel); fail = 1; continue; }
    if (hashes.get(rel) !== shaOf(p)) { console.log('MANIFEST FAIL (boot target hash):', rel); fail = 1; }
  }
  console.log(`boot target: ${refs.length} referenced asset(s) checked against the manifest`);
}
const single = path.join(TREE, 'dist', 'single.html');
if (!fs.existsSync(single)) { console.log('MANIFEST FAIL: dist/single.html (the file:// artifact) is missing'); fail = 1; }
const SKIP = new Set(['node_modules', '.git', '.svelte-kit', 'engine-node']);   // engine-node: the generated Part-D copy (regen-manifest excludes it too — a build artifact, never committed)
const listed = new Set(manifest.map((l) => l.split(/\s+/, 2)[1]));
const walk = (d) => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); const rel = path.relative(TREE, p); if (SKIP.has(f.name)) continue; if (f.isDirectory()) walk(p); else if (rel === 'MANIFEST.txt' || rel === 'CHECKSUMS.txt' || rel === 'ACCEPTANCE-RECEIPTS.txt' || rel.startsWith('shots/')) continue; else if (isReceipt(rel)) continue; else if (!listed.has(rel)) { console.log('MANIFEST FAIL (unlisted):', rel); fail = 1; } } };
walk(TREE);
console.log(fail ? 'gate-manifest: FAIL' : `gate-manifest: PASS (${manifest.length} entries verified, dist/ covered, converse clean)`);
process.exit(fail);
