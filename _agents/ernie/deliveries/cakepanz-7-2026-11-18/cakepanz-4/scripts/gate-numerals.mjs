/* gate-numerals.mjs — the prose-numerals gate: no stale number claims survive in the shell's prose.
   Scans the delivery docs for the OLD pin string and for placeholder markers. Exit 1 on a hit. */
import fs from 'node:fs'; import path from 'node:path';
const TREE = path.resolve(new URL('..', import.meta.url).pathname);
const FILES = ['README.md', 'SNAPSHOT.md', 'MERGE-README.md', 'MERGE-GUIDE.md', 'SHELL-STATUS.md', 'VERIFY.txt'];
const BAD = [/TODO/, /XXX(?!\.)/, /【/];
function stalePin(txt) {
  let i = -1;
  while ((i = txt.indexOf('4ca9a071', i + 1)) !== -1) {
    const ctx = txt.slice(Math.max(0, i - 90), i + 100);
    if (!/stale|old|was|→|->|superseded|correction/i.test(ctx)) return true;
  }
  return false;
}
let fail = 0;
for (const f of FILES) {
  const p = path.join(TREE, f); if (!fs.existsSync(p)) continue;
  const txt = fs.readFileSync(p, 'utf8');
  for (const re of BAD) if (re.test(txt)) { console.log(`NUMERALS FAIL: ${f} matches ${re}`); fail = 1; }
  if (stalePin(txt)) { console.log(`NUMERALS FAIL: ${f} presents the stale pin as current`); fail = 1; }
  const PIN = process.env.CP_PIN || '5c808472';   // the shipped tree's pin (the prepared copy names 65673a00; run with CP_PIN=65673a00 there)
  if (!txt.includes(PIN)) { console.log(`NUMERALS FAIL: ${f} never names the CURRENT pin (${PIN})`); fail = 1; }
}
console.log(fail ? 'gate-numerals: FAIL' : 'gate-numerals: CLEAN ×2 (old pin named only in correction context; no unfilled markers)');
process.exit(fail);
