/* seed-roundtrip-receipt.mjs — the T2 (PORCA S1) receipt: the OLD parser (the c11 bytes: decimal
 * branch FIRST, bare base-36 display) vs the NEW parser (the cakepanz-12 bytes: the b36: prefix
 * parsed first). Prints the failure counts for both over the old draw range 1000–9999, and the
 * new contract's extra sweeps. Exit 0 only if the NEW parser is 0-failure everywhere.
 * Run: node /home/z/my-project/build/cakepanz-4/scripts/seed-roundtrip-receipt.mjs   (from the tree)
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const ROOT = process.cwd();
const mod = await import(path.join(ROOT, 'src/lib/port/seedCode.ts'));

// THE OLD PARSER, byte-faithful to the c11 App.svelte (decimal branch FIRST), paired with the
// old bare base-36 display — this pair is what 700 of 9,000 seeds tripped.
const SEED_MAX = 2147483647;
const oldParse = (raw) => {
  if (/^\d{1,10}$/.test(raw)) { const n = Number(raw); if (Number.isInteger(n) && n >= 1 && n <= SEED_MAX) return n; }
  else if (/^[0-9a-z]{1,6}$/i.test(raw)) { const n = parseInt(raw, 36); if (Number.isInteger(n) && n >= 1 && n <= SEED_MAX) return n; }
  return null;
};
let oldFail = 0, oldFirst = -1, oldExamples = [];
for (let n = 1000; n <= 9999; n++) {
  const code = n.toString(36);
  if (oldParse(code) !== n) { oldFail++; if (oldFirst < 0) oldFirst = n; if (oldExamples.length < 5) oldExamples.push(`${n} displayed "${code}" replayed ${oldParse(code)}`); }
}

// THE NEW PARSER over the same range + the widened range + a strided sweep of the parse contract
let newFailOld = 0, newFailWide = 0, newFailStride = 0;
for (let n = 1000; n <= 9999; n++) if (mod.parseSeedCode(mod.seedToCode(n)) !== n) newFailOld++;
for (let n = mod.SEED_MIN; n <= mod.SEED_MIN + mod.SEED_RANGE - 1; n++) if (mod.parseSeedCode(mod.seedToCode(n)) !== n) newFailWide++;
for (let n = 1; n <= mod.SEED_MAX; n += 997) if (mod.parseSeedCode(mod.seedToCode(n)) !== n) newFailStride++;
const bound = mod.parseSeedCode(mod.seedToCode(1)) === 1 && mod.parseSeedCode(mod.seedToCode(mod.SEED_MAX)) === mod.SEED_MAX;
const legacy = mod.parseSeedCode('777777') === 777777 && mod.parseSeedCode('a3f2') === parseInt('a3f2', 36) && mod.parseSeedCode('b36:100') === 1296 && mod.parseSeedCode('100') === 100 && mod.parseSeedCode('!!nope!!') === null;

console.log('== SEED ROUND-TRIP RECEIPT (cakepanz-12 T2 / PORCA S1) ==');
console.log(`module: src/lib/port/seedCode.ts (sha256 ${createHash('sha256').update(fs.readFileSync(path.join(ROOT, 'src/lib/port/seedCode.ts'))).digest('hex').slice(0, 16)}…)`);
console.log('');
console.log('BEFORE (the c11 bytes: bare base-36 code + decimal-first parse), range 1000–9999:');
console.log(`  failures: ${oldFail} / 9000  first=${oldFirst}`);
for (const e of oldExamples) console.log('  · ' + e);
console.log('');
console.log('AFTER (cakepanz-12: the b36: prefix, parsed first; the widened R2 draw range):');
console.log(`  range 1000–9999:                 failures ${newFailOld} / 9000`);
console.log(`  widened range 100000–9999999:    failures ${newFailWide} / ${mod.SEED_RANGE}`);
console.log(`  strided sweep 1…2147483647/997:  failures ${newFailStride}`);
console.log(`  boundaries (1, 2147483647):      ${bound ? 'OK' : 'FAIL'}`);
console.log(`  legacy forms (int, a3f2, b36:100, 100, garbage): ${legacy ? 'OK' : 'FAIL'}`);
const green = newFailOld === 0 && newFailWide === 0 && newFailStride === 0 && bound && legacy;
console.log('');
console.log(green ? 'ROUND-TRIP: 0 FAILURES — the displayed code replays the SAME seed, everywhere' : 'ROUND-TRIP: RED');
process.exit(green ? 0 : 1);
