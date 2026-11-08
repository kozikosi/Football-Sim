import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const FORBIDDEN = [
  /DEFAULT_WEIGHTS/,
  /salary[-_ ]?table/i,
  /owner[-_ ]?weights/i,
];

function scan(root) {
  const hits = [];
  let files = 0;
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      if (name === '.git' || name === 'node_modules') continue;
      const full = path.join(dir, name);
      const st = fs.statSync(full);
      if (st.isDirectory()) walk(full);
      else if (st.isFile() && st.size < 2_000_000) {
        files++;
        const text = fs.readFileSync(full, 'utf8');
        for (const re of FORBIDDEN) {
          if (re.test(text)) {
            hits.push({ file: full, pattern: re.source });
            break;
          }
        }
      }
    }
  }
  walk(root);
  return { files, hits };
}

function selftest() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'beam-heldout-'));
  fs.writeFileSync(path.join(dir, 'good.txt'), 'console.log("hello")');
  fs.writeFileSync(path.join(dir, 'bad.txt'), 'const w = DEFAULT_WEIGHTS;');
  const r = scan(dir);
  fs.rmSync(dir, { recursive: true, force: true });
  if (r.hits.length !== 1) throw new Error('selftest failed: expected 1 hit, got ' + r.hits.length);
  console.log('selftest: PASS');
}

const args = process.argv.slice(2);
if (args.includes('--selftest')) { selftest(); process.exit(0); }
const root = args[0] || '.';
const r = scan(root);
console.log(JSON.stringify({ files: r.files, hitCount: r.hits.length, hits: r.hits }, null, 2));
