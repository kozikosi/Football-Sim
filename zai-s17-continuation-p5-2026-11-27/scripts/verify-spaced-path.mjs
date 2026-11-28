#!/usr/bin/env node
/* verify-spaced-path.mjs — item 7 (path portability — DS N7 / Porca): the gates must run from a
 * path containing a space, because the Owner's real desktop path is `…/Desktop/Football Sim/…` and
 * the delivered gates ENOENT'd on it (new URL(...).pathname yields %20). This tool copies the
 * SEALED final tree (everything except .git) to a path that CONTAINS A SPACE, runs the gate
 * battery THERE (verify-package, gate-manifest, gate-numerals ×2, check-claims full), and files
 * the raw output as deliveries/receipts/path-portability.log — the evidence the
 * `path-portability` claim reads. Exit 0 only when every leg is green in the spaced copy.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SPACED = path.join(path.dirname(ROOT), 'space test', path.basename(ROOT));   // the space is the point
const LOG = path.join(ROOT, 'deliveries', 'receipts', 'path-portability.log');
const L = [];
const say = (s = '') => { L.push(s); console.log(s); };

say(`== SPACED-PATH GATE ==`);
say(`spaced root: ${SPACED}`);
say(`source root: ${ROOT}`);

fs.rmSync(SPACED, { recursive: true, force: true });
fs.mkdirSync(path.dirname(SPACED), { recursive: true });
say('copying the sealed tree (excluding .git) — node_modules included so the gates run for real…');
fs.cpSync(ROOT, SPACED, { recursive: true, filter: (s) => !/(^|[\\/])\.git($|[\\/])/.test(s) });
say(`copy done (${fs.readdirSync(SPACED).length} top-level entries)`);

const legs = [
  ['verify-package', ['tools/verify-package.mjs', '.']],
  ['gate-manifest', ['scripts/gate-manifest.mjs']],
  ['gate-numerals', ['scripts/gate-numerals.mjs']],
  ['gate-numerals (2nd)', ['scripts/gate-numerals.mjs']],
  ['check-claims --phase packaging', ['scripts/check-claims.mjs', '--phase', 'packaging']],
  ['check-claims (full)', ['scripts/check-claims.mjs']],
];
let fail = 0;
for (const [name, args] of legs) {
  say('');
  say(`$ node ${args.join(' ')}    # cwd: ${SPACED}`);
  let o, code = 0;
  try { o = execFileSync('node', args, { cwd: SPACED, encoding: 'utf8', timeout: 300000, maxBuffer: 1024 * 1024 * 32 }); }
  catch (e) { o = String((e.stdout || '') + (e.stderr || '')); code = e.status ?? 1; }
  say(o.trim());
  say(`EXIT_CODE=${code}`);
  if (code !== 0) fail = 1;
}
say('');
say(fail ? 'SPACED-PATH GATE: FAIL' : 'SPACED-PATH GATE: PASS — the whole gate battery is green from a path containing a space');
fs.mkdirSync(path.dirname(LOG), { recursive: true });
fs.writeFileSync(LOG, L.join('\n') + '\n');
process.exit(fail);
