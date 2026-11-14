// Chase the two unexplained digests: cd298e99 (prose) and 753997ba (INKLING, files=57).
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const targets = {
  cd298e99: 'REPORT.md prose digest (no receipt)',
  '753997ba': 'INKLING rerun (files=57)',
  fef700c7: '4ca9a071 vendoredSha (known)',
  '4c3c8f17': 'my arms-engine digest (known)',
};
const targetsPrefixes = Object.keys(targets);

function collect(root) {
  const files = [];
  (function walk(d) {
    for (const f of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, f.name);
      if (f.isDirectory()) walk(p); else files.push(p);
    }
  })(root);
  return files.sort();
}
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');

const roots = {
  colors_d3: '/home/z/my-project/scratch/engines/colors-d3bd81d2',
  colors_4c: '/home/z/my-project/scratch/engines/colors-4ca9a071',
  vue_engine: '/home/z/my-project/scratch/bench1/arms/arm-vue-pub/src-bench/engine',
  vue_srcbench: '/home/z/my-project/scratch/bench1/arms/arm-vue-pub/src-bench',
  svelte_engine: '/home/z/my-project/scratch/bench1/arms/arm-svelte-pub/src-bench/engine',
};

for (const [label, root] of Object.entries(roots)) {
  const files = collect(root);
  // variant A: relPath+bytes (harness) — already done
  // variant B: bytes only, sorted by relPath
  let hB = crypto.createHash('sha256');
  for (const f of files) hB.update(fs.readFileSync(f));
  // variant C: relPath+bytes with root dir name prefix (e.g. 'colors/...')
  let hC = crypto.createHash('sha256');
  for (const f of files) { hC.update(path.join(path.basename(root), path.relative(root, f))); hC.update(fs.readFileSync(f)); }
  // variant D: relPath+'\n'+bytes
  let hD = crypto.createHash('sha256');
  for (const f of files) { hD.update(path.relative(root, f) + '\n'); hD.update(fs.readFileSync(f)); }
  // variant E: sha256 of 'len' prefixed entries (len+path+bytes)
  let hE = crypto.createHash('sha256');
  for (const f of files) { const b = fs.readFileSync(f); hE.update(`${path.relative(root, f)}:${b.length}:`); hE.update(b); }
  // variant F: newline-joined relPath list only (path manifest)
  const hF = sha(files.map((f) => path.relative(root, f)).join('\n'));
  // variant G: bytes in UNSORTED readdir order
  const unsorted = [];
  (function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else unsorted.push(p); } })(root);
  let hG = crypto.createHash('sha256');
  for (const f of unsorted) { hG.update(path.relative(root, f)); hG.update(fs.readFileSync(f)); }
  const variants = { B: hB.digest('hex'), C: hC.digest('hex'), D: hD.digest('hex'), E: hE.digest('hex'), F: hF, G: hG.digest('hex') };
  for (const [vn, dig] of Object.entries(variants)) {
    const hit = targetsPrefixes.filter((t) => dig.startsWith(t)).map((t) => `${t}=${targets[t]}`).join(', ');
    if (hit) console.log(`HIT ${label} variant ${vn}: ${dig} → ${hit}`);
  }
  console.log(`${label} (n=${files.length}) B..G: ${Object.values(variants).map((d) => d.slice(0, 8)).join(' ')}`);
}
