/* regen-manifest.mjs — regenerate CHECKSUMS.txt (sha256 of every non-excluded file) + MANIFEST.txt.
 * The D4 fix: dist/ is NO LONGER skipped — the build output is hashed and listed like any other
 * file (the gate once verified 233 source hashes while the package could not boot).
 * ACCEPTANCE-RECEIPTS.txt is excluded: it is the meta-layer (self-referential by design, like
 * MANIFEST.txt/CHECKSUMS.txt) — acceptance-run.sh appends receipt lines AFTER regen, so hashing it
 * here would guarantee a hash drift at the gate. Caught by the runner itself, 2026-11-17.
 * The cakepanz-7 fix (mirrors gate-manifest.mjs): the receipt layer joins the same exclusion —
 * deliveries/receipts/ and any gate-manifest-*.log are unlisted here, so a receipt written at the
 * final state can never fail the next regen/gate roundtrip (a receipt is the raw stdout of the
 * tool at the final state; if the state changes, the receipt is rewritten). */
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto';
const TREE = path.resolve(new URL('..', import.meta.url).pathname);
const SKIP = new Set(['node_modules', '.git', '.svelte-kit', 'shots', 'engine-node']);
const SELF_REF = new Set(['ACCEPTANCE-RECEIPTS.txt', 'CHECKSUMS.txt', 'MANIFEST.txt']); // cakepanz-6 fix: the two self-listing lines made the sha256 roundtrip impossible to converge (each regen's self-hash described the previous bytes — caught by this sitting's packaging roundtrip; the gate already skipped them as self-referential by design)
const isReceipt = (rel) => rel.startsWith('deliveries/receipts/') || /(^|\/)gate-manifest-[^/]*\.log$/.test(rel);   // cakepanz-7: the receipt layer joins the self-reference exclusion
const rows = [];
const walk = (d) => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); const rel = path.relative(TREE, p); if (SKIP.has(f.name)) continue; if (f.isDirectory()) walk(p); else if (SELF_REF.has(f.name) || isReceipt(rel)) continue; else rows.push([crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'), rel]); } };
walk(TREE);
rows.sort((a, b) => a[1].localeCompare(b[1]));
fs.writeFileSync(path.join(TREE, 'CHECKSUMS.txt'), rows.map(([h, r]) => `${h}  ${r}`).join('\n') + '\n');
fs.writeFileSync(path.join(TREE, 'MANIFEST.txt'), rows.map(([h, r]) => `${h}  ${r}`).join('\n') + '\n');
console.log(`regen: ${rows.length} entries`);
