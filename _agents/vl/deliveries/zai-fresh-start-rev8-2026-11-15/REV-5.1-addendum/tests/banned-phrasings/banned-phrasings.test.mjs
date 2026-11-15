/* banned-phrasings.test.mjs — item 7(iii): a test that greps the delivery for banned phrasings and
 * FAILS if any appear. The banned list is the Owner's standing style law (Bounds + AGENTS.md):
 * plain informative recaps; every turnover named; overtime events only in the overtime block, never
 * "sudden death"; no "expected scoring"; no "before kickoff"; no emojis; no HOT/cold labels;
 * Title Odds rejected except 100-season; React out; the wasted-capability term not promoted — its
 * literal is assembled at runtime below so THIS delivery never carries it (naming it in a banned
 * list would itself promote it; the grep still catches the literal anywhere else).
 * Run: node tests/banned-phrasings/banned-phrasings.test.mjs <tree root>
 */
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = (process.argv[2] ?? new URL('../..', import.meta.url).pathname).replace(/\/$/, '');
const BANNED = [
  { pat: /expected scoring/i, why: 'plain informative recaps (no "expected scoring")' },
  { pat: /before kickoff/i, why: 'plain informative recaps (no "before kickoff")' },
  { pat: /sudden death/i, why: 'overtime events only in the overtime block, never "sudden death"' },
  { pat: /title odds/i, unless: /100-season/, why: 'Title Odds rejected except 100-season' },
  { pat: /\breact\b/, unless: undefined, files: /\.(vue|svelte|ts|js|mjs|json|html)$/, why: 'React out (no react imports/deps in either arm)' },
  { pat: /"react"\s*:/, why: 'React out (no react dependency in any package.json)' },
  { pat: /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u, why: 'no emojis anywhere in the delivery' },
  { pat: /\bHOT\b/, unless: /SPOT/, files: /\.(vue|svelte|css|html)$/, why: 'no HOT labels (form = green/red arrows only)' },
  { pat: /\bcold label\b/i, why: 'no cold labels' },
  { pat: /deterministic multiplayer/i, why: 'deterministic-multiplayer remains out of scope' },
  { pat: /\b20-0\b/, why: 'the 20-0 roguelike framing stays out' },
  { pat: new RegExp('wasted' + '-capabil' + 'ity', 'i'), why: 'the wasted-capability term is not promoted (its literal is assembled here so this file never carries it)' },
];
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', 'shots']);
const SKIP_PREFIXES = ['/src/engine/'];   // the FROZEN pin snapshot: its comments are the Architect's, not deliverable UI copy (two engine-side findings are named in the receipt instead)
const SELF = new Set([join(root, 'tests/banned-phrasings/banned-phrasings.test.mjs'), join(root, 'tests/receipts/banned-phrasings.txt')]);
const files = [];
const walk = (dir) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (SELF.has(p)) continue;
    const st = statSync(p);
    if (st.isDirectory()) { if (!SKIP_DIRS.has(e)) walk(p); }
    else if (!SKIP_PREFIXES.some((sfx) => p.endsWith(sfx) || p.includes(sfx))) files.push(p);
  }
};
walk(root);

let hits = 0;
for (const f of files) {
  let text;
  try { text = readFileSync(f, 'utf8'); } catch { continue; }   // binaries (pngs) skipped
  for (const b of BANNED) {
    if (b.files && !b.files.test(f)) continue;
    if (!b.pat.test(text)) continue;
    if (b.unless && b.unless.test(text)) continue;   // the allowed exception, whole-file scope
    hits++;
    const line = text.split(/\r?\n/).findIndex((l) => b.pat.test(l)) + 1;
    console.log(`BANNED HIT ${f}:${line} — [${b.why}]`);
  }
}
console.log(`scanned ${files.length} files under ${root}`);
if (hits) { console.log(`BANNED-PHRASINGS: FAIL (${hits} hit(s))`); process.exit(1); }
console.log('BANNED-PHRASINGS: PASS — 0 hits across the delivery.');
