import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const HASHES = ['40233d6be00e987c', '395f26411333a41f'];

function scan(root) {
  const out = { files: 0, hits: { '40233d6be00e987c': 0, '395f26411333a41f': 0 }, matches: [] };
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      if (name === '.git' || name === 'node_modules') continue;
      const full = path.join(dir, name);
      const st = fs.statSync(full);
      if (st.isDirectory()) walk(full);
      else if (st.isFile() && st.size < 2_000_000) {
        out.files++;
        const text = fs.readFileSync(full, 'utf8');
        for (const h of HASHES) {
          if (text.includes(h)) {
            out.hits[h]++;
            out.matches.push({ file: full, hash: h });
          }
        }
      }
    }
  }
  walk(root);
  return out;
}

function selftest() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'beam-hash-'));
  fs.writeFileSync(path.join(dir, 'a.txt'), 'x 40233d6be00e987c y');
  fs.writeFileSync(path.join(dir, 'b.txt'), 'z 395f26411333a41f');
  const r = scan(dir);
  fs.rmSync(dir, { recursive: true, force: true });
  if (r.hits['40233d6be00e987c'] !== 1 || r.hits['395f26411333a41f'] !== 1) throw new Error('selftest failed');
  console.log('selftest: PASS');
}

const args = process.argv.slice(2);
if (args.includes('--selftest')) {
  selftest();
  process.exit(0);
}
const root = args[0] || '.';
const r = scan(root);
console.log(JSON.stringify({ files: r.files, hits: r.hits, matchCount: r.matches.length }, null, 2));
