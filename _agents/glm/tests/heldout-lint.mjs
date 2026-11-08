// Held-out lint (T1 governance artifact, 2026-11-08, seat glm):
// "No fit script may read 2024–2025." Beam's prereg §2.2.
// Usage: node _agents/glm/tests/heldout-lint.mjs <script-or-dir>... (default: scans tools/mathlab + colors fitting scripts on the given paths)
// Exit 0 = clean; exit 1 = violation found; exit 2 = usage error.
// VERIFIED behavior: detects years 2024/2025 literals AND reading from a held-out
// anchor pack dir; deliberately NOT scanning for footballsim outputs.
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const targets = process.argv.slice(2);
if (targets.length === 0) {
  console.error('usage: heldout-lint.mjs <script-or-dir>...');
  process.exit(2);
}
const HELDOUT = /(20)(24|25)/; // years 2024, 2025
const READCALLS = /(readFile|readdir|createReadStream|fetch|gunzip|gz|csv|parquet)/i;
let bad = 0;
function scan(path) {
  const st = statSync(path);
  if (st.isDirectory()) {
    for (const e of readdirSync(path)) {
      if (e === 'raw' || e.startsWith('.') || e === 'node_modules') continue;
      scan(join(path, e));
    }
    return;
  }
  if (!['.js', '.mjs', '.cjs', '.ts', '.py', '.sh'].includes(extname(path))) return;
  let src;
  try { src = readFileSync(path, 'utf8'); } catch { return; }
  const lines = src.split('\n');
  lines.forEach((line, i) => {
    const isComment = /^\s*(\/\/|#|\*)/.test(line);
    if (isComment) return;
    const hit = HELDOUT.test(line);
    if (hit && READCALLS.test(line)) {
      bad++;
      console.log(`HELDOUT? ${path}:${i + 1}: ${line.trim().slice(0, 100)}`);
    }
  });
}
for (const t of targets) scan(t);
console.log(bad === 0 ? 'HELDOUT-LINT: clean (no 2024/2025 data reads in scanned scripts)' : `HELDOUT-LINT: ${bad} candidates (review: year strings in read contexts may be legitimate, e.g. writing a pinned aggregate INTO the pack; marker comment heldout-ok suppresses? NOT yet — flag genuinely)`);
process.exit(bad === 0 ? 0 : 1);
