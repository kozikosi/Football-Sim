/* gate-manifest.mjs — MANIFEST.txt integrity: every listed file exists with the listed sha256;
   every tree file (outside node_modules/dist) is listed (the converse check). Exit 1 on any break. */
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto';
const TREE = path.resolve(new URL('..', import.meta.url).pathname);
const manifest = fs.readFileSync(path.join(TREE, 'MANIFEST.txt'), 'utf8').trim().split('\n').filter(Boolean);
let fail = 0;
for (const line of manifest) {
  const [sha, rel] = line.split(/\s+/, 2);
  if (rel === 'MANIFEST.txt' || rel === 'CHECKSUMS.txt') continue;   // self-referential by design (regen excludes them; the gate skips them)
  const p = path.join(TREE, rel);
  if (!fs.existsSync(p)) { console.log('MANIFEST FAIL (missing):', rel); fail = 1; continue; }
  const h = crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
  if (h !== sha) { console.log('MANIFEST FAIL (hash):', rel); fail = 1; }
}
const SKIP = new Set(['node_modules', 'dist', '.git', '.svelte-kit']);
const listed = new Set(manifest.map((l) => l.split(/\s+/, 2)[1]));
const walk = (d) => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); const rel = path.relative(TREE, p); if (SKIP.has(f.name)) continue; if (f.isDirectory()) walk(p); else if (rel === 'MANIFEST.txt' || rel === 'CHECKSUMS.txt' || rel.startsWith('shots/')) continue; else if (!listed.has(rel)) { console.log('MANIFEST FAIL (unlisted):', rel); fail = 1; } } };
walk(TREE);
console.log(fail ? 'gate-manifest: FAIL' : `gate-manifest: PASS (${manifest.length} entries verified, converse clean)`);
process.exit(fail);
