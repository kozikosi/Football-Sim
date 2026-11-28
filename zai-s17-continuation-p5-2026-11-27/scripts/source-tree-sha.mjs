/* source-tree-sha.mjs — the ONE content walk the byte-latch uses (item 10, orcads R9 / porca B1).
 *
 * The dev-gated SeamCard chip latches its provenance card to the RUNNING build: the card carries
 * `treeSha` — the sha256 over the shell SOURCE bytes that produce the bundle — and the build
 * embeds the same hash (vite.config.js computes it at build time into __CP_TREE_SHA__). Equal →
 * the chip shows the card; unequal or missing → the chip renders
 * `UNKNOWN · generated before the last edit` with NO numeric fields at all (no default-green).
 *
 * The walk covers exactly the bytes that produce the running bundle: src/**, index.html,
 * vite.config.js, package.json, package-lock.json, tsconfig.json. It deliberately EXCLUDES the
 * derived surfaces (dist/, the generated docs, the seal) — they change after the build by design
 * (the close-out chain regenerates them), so including them would make the latch permanently
 * unequal. dist/ is covered by the dist fingerprint (dist-manifest.json / the receipts' distHash);
 * this latch covers the SOURCE the card describes.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TOPS = ['src', 'index.html', 'vite.config.js', 'package.json', 'package-lock.json', 'tsconfig.json'];
const SKIP_DIRS = new Set(['node_modules', 'engine-node']);   // engine-node: the generated node-side engine copy (never source)

export function sourceTreeSha(root = ROOT) {
  const rows = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      const rel = path.relative(root, p).split(path.sep).join('/');
      if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(p); continue; }
      rows.push([rel, crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')]);
    }
  };
  for (const top of TOPS) {
    const p = path.join(root, top);
    if (!fs.existsSync(p)) continue;
    if (fs.statSync(p).isFile()) rows.push([top, crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')]);
    else walk(p);
  }
  rows.sort((a, b) => a[0].localeCompare(b[0]));
  const h = crypto.createHash('sha256');
  for (const [rel, sha] of rows) h.update(rel + ':' + sha + '\n');
  return h.digest('hex');
}
