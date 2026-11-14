// Vendor-digest adjudication — recomputes vendorSha (exact tier1.mjs algorithm) over candidate roots.
// Algorithm per bench1 tools/bench/tier1.mjs vendorSha(): sorted files; sha256.update(relPath).update(bytes).
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

function vendorSha(root) {
  const files = [];
  (function walk(d) {
    for (const f of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, f.name);
      if (f.isDirectory()) walk(p);
      else files.push(p);
    }
  })(root);
  files.sort();
  const h = crypto.createHash('sha256');
  for (const f of files) { h.update(path.relative(root, f)); h.update(fs.readFileSync(f)); }
  return { digest: h.digest('hex'), files: files.length };
}

const BENCH = '/home/z/my-project/scratch/bench1';
const roots = {
  'colors @ d3bd81d2 (BENCH-1 pin, architect branch)': '/home/z/my-project/scratch/engines/colors-d3bd81d2',
  'colors @ 4ca9a071 (stale START pin)': '/home/z/my-project/scratch/engines/colors-4ca9a071',
  'colors @ origin/main tip 7545d49': '/home/z/my-project/scratch/engines/colors-main',
  'arm-vue-pub vendored engine (src-bench/engine)': `${BENCH}/arms/arm-vue-pub/src-bench/engine`,
  'arm-svelte-pub vendored engine (src-bench/engine)': `${BENCH}/arms/arm-svelte-pub/src-bench/engine`,
};
const known = {
  '432a1701744b91fc92f807931d789cf49a8daf0da529298f0013898f195e272d': 'receipted in all four tier1 JSONs (files=112)',
  '753997bac4': 'INKLING rerun basis (files=57)',
  'cd298e99': 'REPORT.md prose only — no receipt',
};
for (const [label, root] of Object.entries(roots)) {
  if (!fs.existsSync(root)) { console.log(`MISSING ${root}`); continue; }
  const r = vendorSha(root);
  const hit = Object.entries(known).filter(([k]) => r.digest.startsWith(k.slice(0, 8))).map(([, v]) => v).join(' | ') || 'matches NOTHING';
  console.log(`${label}\n  files=${r.files} digest=${r.digest}\n  → ${hit}`);
}
