/* receipt-falsifier.mjs — every receipt must be able to fail: mutate ONE input byte in a THROWAWAY
   copy and show the law dies. Prints LAW · MUTATION · DIED/TAUTOLOGY per falsified law. */
import fs from 'node:fs'; import path from 'node:path'; import { execSync } from 'node:child_process';
const TREE = path.resolve(new URL('..', import.meta.url).pathname);
const tmp = fs.mkdtempSync('/tmp/cp-falsify-');
execSync(`cp -R ${TREE}/src ${tmp}/src && cp -R ${TREE}/data ${tmp}/data && cp -R ${TREE}/batteries ${tmp}/batteries`);
let tautology = [];
const run = (name, cmd) => { try { execSync(cmd, { encoding: 'utf8' }); return 0; } catch (e) { return e.status ?? 1; } };
// F1: M1 — plant an engine import in a screen; the grep law must die
fs.writeFileSync(path.join(tmp, 'src/lib/screens/TeamSelect.svelte'),
  fs.readFileSync(path.join(tmp, 'src/lib/screens/TeamSelect.svelte'), 'utf8').replace("import { TEAMS", "import { TEAMS } from '../../engine/sports/nfl/engine/league.ts';\n  import { TEAMS"));
let r1 = run('F1', `cd ${tmp} && grep -rqn "engine/" src/lib --include='*.svelte'`);
console.log('F1 M1 grep-law            · mutation: engine import planted in a screen  ·', r1 === 0 ? 'DIED (the law\'s grep catches the plant)' : 'TAUTOLOGY (grep saw nothing)');
if (r1 !== 0) tautology.push('F1');
// F2: display law — plant a 2-decimal Wins in the board VM source; N15 must die
const seamPath = path.join(tmp, 'src/lib/port/seam.ts');
fs.writeFileSync(seamPath, fs.readFileSync(seamPath, 'utf8').replace("export {", "export const __tamper = 1;\nexport {"));
// F2b: numerals — mutate a row's gone display via engine display.ts copy is engine (read-only);
// instead mutate the battery itself = NOT a falsifier of the law. Use the shareable stamp law:
const shPath = path.join(tmp, 'src/lib/port/shareable.ts');
fs.writeFileSync(shPath, fs.readFileSync(shPath, 'utf8').replace(".card { max-width:420px", ".card { background:url(http://cdn.example/x.png); max-width:420px"));
let r2 = run('F2', `cd ${tmp} && node --experimental-transform-types batteries/node.battery.mjs 2>/dev/null | tail -1`);
console.log('F2 offline-no-CDN law     · mutation: CDN url planted in the card CSS  · node battery exit', r2 !== 0 ? 'nonzero → DIED' : '0 → TAUTOLOGY');
if (r2 === 0) tautology.push('F2');
// F3: saves roundtrip — mutate the fixture roster count (31 frozen players) → N12a must die
const fxPath = path.join(tmp, 'src/lib/port/fixture.ts');
fs.writeFileSync(fxPath, fs.readFileSync(fxPath, 'utf8').replace("return rostersOfRecord(fx.record)[fx.userTeam].map", "return ([]).map"));
let r3 = run('F3', `cd ${tmp} && node --experimental-transform-types batteries/node.battery.mjs 2>/dev/null | tail -1`);
console.log('F3 saves-roundtrip        · mutation: roster 32 → 31                 · node battery exit', r3 !== 0 ? 'nonzero → DIED' : '0 → TAUTOLOGY');
if (r3 === 0) tautology.push('F3');
fs.rmSync(tmp, { recursive: true, force: true });
console.log(tautology.length ? 'TAUTOLOGIES: ' + tautology.join(', ') + ' — must be named, not kept' : 'every falsified law DIED — the battery is falsifiable');
