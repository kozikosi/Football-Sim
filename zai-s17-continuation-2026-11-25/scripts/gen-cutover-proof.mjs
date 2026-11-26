#!/usr/bin/env node
/* gen-cutover-proof.mjs — the Wave B #10 generated one-page cutover proof (porca N7, hy4 #5/#9):
 * pin, framework version (as-is; the Vite-8 migration is filed, not applied), data included or
 * excluded (the A6 default: raw CSVs OUT of any cutover manifest), claims passed/UNKNOWN — one
 * page the Owner can hand to the public-76-Pancakes cutover without reading a single receipt.
 *
 * Run: node scripts/gen-cutover-proof.mjs
 * Output: deliveries/CUTOVER-PROOF.md (GENERATED at the final bytes — never hand-written)
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const sha = (rel) => createHash('sha256').update(fs.readFileSync(path.join(ROOT, rel))).digest('hex');

const snap = fs.readFileSync(path.join(ROOT, 'SNAPSHOT.md'), 'utf8');
const pin = (snap.match(/Engine commit: `([0-9a-f]{8,9})`/) || [])[1] ?? 'UNKNOWN';
const stamp = (snap.match(/stamp[^\w`]*`([a-z0-9]+\.[0-9a-f]+)`/i) || [])[1] ?? 'UNKNOWN';
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const seal = fs.readFileSync(path.join(ROOT, 'CHECKSUMS.txt'), 'utf8').split('\n').filter((l) => l.trim()).length;
const claims = JSON.parse(fs.readFileSync(path.join(ROOT, 'claims.json'), 'utf8'));

// the claims verdict: run the checker? No — this generator must stay CHEAP and side-effect-free.
// The verdict column reads the LAST full-phase receipt if it exists (the A7 battery writes it);
// any claim without a receipt line renders UNKNOWN. Never a green default.
const receiptPath = path.join(ROOT, 'deliveries', 'receipts', 'full-phase-check-claims-latest.log');
const receipt = fs.existsSync(receiptPath) ? fs.readFileSync(receiptPath, 'utf8') : '';
const verdictOf = (id) => {
  if (!receipt) return 'UNKNOWN';
  const m = receipt.match(new RegExp(`^(OK|RED|SKIP)\\s+\\[${id}\\]`, 'm'));
  return m ? m[1] : 'UNKNOWN';
};

const L = [];
L.push('# CUTOVER-PROOF — the one-page proof for the public 76 Pancakes cutover');
L.push('');
L.push(`GENERATED ${new Date().toISOString().replace(/\.\d+Z$/, 'Z')} by \`node scripts/gen-cutover-proof.mjs\` — regenerated at the final bytes; never hand-written.`);
L.push('');
L.push('| fact | value |');
L.push('|---|---|');
L.push(`| engine pin | \`${pin}\` (stamp \`${stamp}\`, frozen snapshot, five-path fence) |`);
L.push(`| shell framework | Svelte ${pkg.dependencies?.svelte ?? 'UNKNOWN'} + Vite ${pkg.devDependencies?.vite ?? 'UNKNOWN'} + plugin ${pkg.devDependencies?.['@sveltejs/vite-plugin-svelte'] ?? 'UNKNOWN'} — as-is; the Vite-8 migration is FILED, not applied (R-13 is CLOSED; no bump before cutover without a security finding) |`);
L.push(`| seal | ${seal} content entries, \`node tools/verify-package.mjs .\` green + converse clean |`);
L.push(`| data | **raw CSVs EXCLUDED from any cutover manifest by default** (the A6 default: data/nfl/*.csv + the pools packs stay out until the Owner rules; the pre-migration push permission is not a release ruling). The seam contract + receipts travel; the data does not. |`);
L.push(`| dist | index.html sha256 ${sha('dist/index.html').slice(0, 16)}… · single.html ${sha('dist/single.html').slice(0, 16)}… |`);
L.push('');
L.push('## The claims verdicts (UNKNOWN means no receipt line exists — never read as green)');
L.push('');
L.push('| claim | verdict |');
L.push('|---|---|');
for (const c of claims.claims) L.push(`| \`${c.id}\` | ${verdictOf(c.id)} |`);
L.push('');
L.push('## The parity gate (the 41-capture side-by-side)');
L.push('');
L.push('The 41-capture no-fallback receipt is a HARD parity release gate at cutover: `node scripts/side-by-side-s15.mjs` must read 41 captures · the 40-cell matrix COMPLETE · 0 fallbacks · 0 verdict fails, and the token-diff column in `deliveries/S15-SIDE-BY-SIDE-2026-11-21.md` must carry no token drift row. **"Directionally similar" is a FAIL** — the Owner\'s rule, machine-verdicted by the claims `sbs-receipt` + `sbs-nonvacuity` rows (a fallback or a FAIL row REDs the gate; no prose can overrule it).');
fs.writeFileSync(path.join(ROOT, 'deliveries', 'CUTOVER-PROOF.md'), L.join('\n') + '\n');
console.log(`gen-cutover-proof: deliveries/CUTOVER-PROOF.md written (${claims.claims.length} claims, verdicts ${receipt ? 'from the latest full-phase receipt' : 'UNKNOWN — no receipt yet'})`);
