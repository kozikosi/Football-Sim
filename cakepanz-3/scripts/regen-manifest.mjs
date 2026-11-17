/* regen-manifest.mjs — regenerate CHECKSUMS.txt (sha256 of every non-excluded file) + MANIFEST.txt.
 * The D4 fix: dist/ is NO LONGER skipped — the build output is hashed and listed like any other
 * file (the gate once verified 233 source hashes while the package could not boot). */
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto';
const TREE = path.resolve(new URL('..', import.meta.url).pathname);
const SKIP = new Set(['node_modules', '.git', '.svelte-kit', 'shots']);
const rows = [];
const walk = (d) => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); const rel = path.relative(TREE, p); if (SKIP.has(f.name)) continue; if (f.isDirectory()) walk(p); else rows.push([crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'), rel]); } };
walk(TREE);
rows.sort((a, b) => a[1].localeCompare(b[1]));
fs.writeFileSync(path.join(TREE, 'CHECKSUMS.txt'), rows.map(([h, r]) => `${h}  ${r}`).join('\n') + '\n');
fs.writeFileSync(path.join(TREE, 'MANIFEST.txt'), rows.map(([h, r]) => `${h}  ${r}`).join('\n') + '\n');
console.log(`regen: ${rows.length} entries`);
