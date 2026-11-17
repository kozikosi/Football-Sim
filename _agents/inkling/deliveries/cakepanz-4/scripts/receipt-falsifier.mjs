/* receipt-falsifier.mjs — every receipt must be able to fail: mutate ONE input in a THROWAWAY copy
   and show the law dies. Each falsifier gets a FRESH copy (no contamination between mutations) and
   a clean baseline runs FIRST — if the unmutated copy is already red, a "DIED" would be a false
   positive. Prints LAW · MUTATION · DIED/TAUTOLOGY per falsified law. */
import fs from 'node:fs'; import path from 'node:path'; import { execSync } from 'node:child_process';
const TREE = path.resolve(new URL('..', import.meta.url).pathname);
const NODE = 'node --experimental-transform-types';
let tautology = [];

const mkCopy = () => {
  const dir = fs.mkdtempSync('/tmp/cp-falsify-');
  execSync(`cp -R ${TREE}/src ${dir}/src && cp -R ${TREE}/data ${dir}/data && cp -R ${TREE}/batteries ${dir}/batteries`);
  return dir;
};
const dyingLaws = (dir) => {
  let out = '';
  try { execSync(`${NODE} batteries/node.battery.mjs`, { encoding: 'utf8', cwd: dir, stdio: ['ignore', 'pipe', 'pipe'] }); return null; }
  catch (e) { out = String((e.stdout || '') + (e.stderr || '')); }
  const bad = out.split('\n').filter((l) => l.includes('✖')).map((l) => l.trim().slice(0, 90));
  return bad.length ? bad : ['(nonzero exit, failing test not parsed)'];
};

// F0: the CLEAN baseline — an unmutated copy must be green before any mutation means anything
{
  const dir = mkCopy();
  const clean = dyingLaws(dir);
  fs.rmSync(dir, { recursive: true, force: true });
  if (clean) { console.log('F0 CLEAN BASELINE RED — the copy fails without any mutation:', clean.slice(0, 3)); process.exit(1); }
  console.log('F0 clean baseline · unmutated node battery exit 0 · baseline OK');
}

// F1: M1 — plant an engine import in a screen; the grep law must die
{
  const dir = mkCopy();
  const p = path.join(dir, 'src/lib/screens/TeamSelect.svelte');
  fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replace("import { TEAMS", "import { TEAMS } from '../../engine/sports/nfl/engine/league.ts';\n  import { TEAMS"));
  let r1 = 1;
  try { execSync(`grep -rqn "engine/" ${dir}/src/lib --include='*.svelte'`); r1 = 0; } catch { r1 = 1; }
  console.log('F1 M1 grep-law            · mutation: engine import planted in a screen  ·', r1 === 0 ? 'DIED (the law\'s grep catches the plant)' : 'TAUTOLOGY (grep saw nothing)');
  if (r1 !== 0) tautology.push('F1');
  fs.rmSync(dir, { recursive: true, force: true });
}

// F2: the offline/no-CDN law (N14) — plant a CDN url in the card CSS
{
  const dir = mkCopy();
  const p = path.join(dir, 'src/lib/port/shareable.ts');
  fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replace('.card { max-width:420px', '.card { background:url(http://cdn.example/x.png); max-width:420px'));
  const d = dyingLaws(dir);
  console.log('F2 offline-no-CDN law     · mutation: CDN url planted in the card CSS  ·', d ? 'DIED — ' + d[0] : 'TAUTOLOGY (node battery still green)');
  if (!d) tautology.push('F2');
  fs.rmSync(dir, { recursive: true, force: true });
}

// F3: the saves roundtrip (N12a) — the fixture roster loses a player
{
  const dir = mkCopy();
  const p = path.join(dir, 'src/lib/port/fixture.ts');
  fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replace('return rostersOfRecord(fx.record)[fx.userTeam].map', 'return ([]).map'));
  const d = dyingLaws(dir);
  console.log('F3 saves-roundtrip        · mutation: roster 32 → 31                 ·', d ? 'DIED — ' + d[0] : 'TAUTOLOGY (node battery still green)');
  if (!d) tautology.push('F3');
  fs.rmSync(dir, { recursive: true, force: true });
}

// F4 (P-365): zero every gone% — N19 (the independent gone%-values law) must die
{
  const dir = mkCopy();
  const p = path.join(dir, 'src/engine/sports/nfl/engine/goneodds.ts');
  fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replace(
    'for (const [k, v] of counts) counts.set(k, v / sims);',
    'counts.clear();'));
  const d = dyingLaws(dir);
  console.log('F4 gone%-values law       · mutation: every gone% zeroed in goneodds.ts ·', d ? 'DIED — ' + d[0] : 'TAUTOLOGY (node battery still green)');
  if (!d) tautology.push('F4');
  fs.rmSync(dir, { recursive: true, force: true });
}

// F5 (P-365): the season brag names the WRONG champion — N14b (case-insensitive) must die
{
  const dir = mkCopy();
  const p = path.join(dir, 'src/lib/port/shareable.ts');
  fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replace(
    'The year belongs to the <b>${esc(opts.champion)}</b>.',
    'The year belongs to the <b>${esc(opts.teamName)}</b>.'));
  const d = dyingLaws(dir);
  console.log('F5 season-brag truth law  · mutation: champion line swapped to the user team ·', d ? 'DIED — ' + d[0] : 'TAUTOLOGY (node battery still green)');
  if (!d) tautology.push('F5');
  fs.rmSync(dir, { recursive: true, force: true });
}

// F6 (P-260 F8): unwire the composition's slot check — N20 (the slot/key mismatch law) must die
{
  const dir = mkCopy();
  const p = path.join(dir, 'src/lib/port/savesApp.ts');
  fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replace('slotCheck: assertSlotMatchesKey', 'slotCheck: undefined'));
  const d = dyingLaws(dir);
  console.log('F6 save-service slot law  · mutation: the composition drops the slot check    ·', d ? 'DIED — ' + d[0] : 'TAUTOLOGY (node battery still green)');
  if (!d) tautology.push('F6');
  fs.rmSync(dir, { recursive: true, force: true });
}

console.log(tautology.length ? 'TAUTOLOGIES: ' + tautology.join(', ') + ' — must be named, not kept' : 'every falsified law DIED — the battery is falsifiable');
