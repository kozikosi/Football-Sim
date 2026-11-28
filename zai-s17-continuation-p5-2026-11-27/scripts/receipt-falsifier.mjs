/* receipt-falsifier.mjs — every receipt must be able to fail: mutate ONE input in a THROWAWAY copy
   and show the law dies. Each falsifier gets a FRESH copy (no contamination between mutations) and
   a clean baseline runs FIRST — if the unmutated copy is already red, a "DIED" would be a false
   positive. Prints LAW · MUTATION · DIED/TAUTOLOGY per falsified law.

   D-2 rule (2026-11-17 sitting, generalized): a falsifier case that CANNOT RUN is a FAILURE, never
   a green light and never a "DIED". A child that dies with a node-level error (bad option, missing
   module, type-strip error) produces no law evidence — that is COULD-NOT-RUN (red, exit 1), not a
   death. The child battery now runs via scripts/node-port-register.mjs (Part D — no transform
   flag, any Node). Every mutation is APPLY-ASSERTED: if the target string moved, the falsifier
   throws with the file and the anchor — it can no longer silently write unchanged text and report
   a green verdict on an unapplied mutation (the F2/F3 lesson). */
import fs from 'node:fs'; import path from 'node:path'; import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const TREE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const NODE = 'node --import ./scripts/node-port-register.mjs';
let tautology = [];
let unrunnable = [];

const mkCopy = () => {
  const dir = fs.mkdtempSync('/tmp/cp-falsify-');
  execSync(`cp -R ${TREE}/src ${dir}/src && cp -R ${TREE}/data ${dir}/data && cp -R ${TREE}/batteries ${dir}/batteries && cp -R ${TREE}/scripts ${dir}/scripts && cp ${TREE}/index.html ${dir}/index.html`);
  fs.rmSync(path.join(dir, 'src/engine-node'), { recursive: true, force: true });   // regenerated fresh inside the copy
  return dir;
};
const mustReplace = (p, anchor, replacement) => {
  const before = fs.readFileSync(p, 'utf8');
  if (!before.includes(anchor)) throw new Error(`FALSIFIER TARGET MOVED in ${path.relative(TREE, p)} — anchor not found:\n  ${anchor.slice(0, 120)}\nFix the target strings from the current bytes (Part C, the F2/F3 lesson); do not ship an unapplied mutation.`);
  const after = before.split(anchor).join(replacement);   // ALL occurrences (F7's render call appears twice)
  if (after === before) throw new Error(`FALSIFIER MUTATION DID NOT APPLY in ${path.relative(TREE, p)} (anchor matched but replace was a no-op)`);
  fs.writeFileSync(p, after);
};
// run the node battery in the copy and classify the outcome
const dyingLaws = (dir) => {
  let out = '';
  try { execSync(`${NODE} batteries/node.battery.mjs`, { encoding: 'utf8', cwd: dir, stdio: ['ignore', 'pipe', 'pipe'] }); return { kind: 'GREEN' }; }
  catch (e) { out = String((e.stdout || '') + (e.stderr || '')); }
  const bad = out.split('\n').filter((l) => l.includes('✖')).map((l) => l.trim().slice(0, 90));
  if (bad.length) return { kind: 'DIED', laws: bad };
  // nonzero exit but NO law evidence: a node-level failure (cannot run) — red, never a "DIED"
  const nodeErr = out.split('\n').find((l) => /bad option|ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX|MODULE_NOT_FOUND|Cannot find (module|package)|Error/i.test(l));
  return { kind: 'UNRUNNABLE', detail: (nodeErr || '(nonzero exit, no law evidence)').trim().slice(0, 160) };
};

// F0: the CLEAN baseline — an unmutated copy must be green before any mutation means anything
{
  const dir = mkCopy();
  const clean = dyingLaws(dir);
  fs.rmSync(dir, { recursive: true, force: true });
  if (clean.kind === 'UNRUNNABLE') { console.log('F0 CLEAN BASELINE COULD-NOT-RUN —', clean.detail); process.exit(1); }
  if (clean.kind !== 'GREEN') { console.log('F0 CLEAN BASELINE RED — the copy fails without any mutation:', clean.laws.slice(0, 3)); process.exit(1); }
  console.log('F0 clean baseline · unmutated node battery exit 0 · baseline OK');
}

// F1: M1 — plant an engine import in a screen; the grep law must die
{
  const dir = mkCopy();
  const p = path.join(dir, 'src/lib/screens/TeamSelect.svelte');
  mustReplace(p, "import { TEAMS", "import { TEAMS } from '../../engine/sports/nfl/engine/league.ts';\n  import { TEAMS");
  let r1 = 1;
  try { execSync(`grep -rqn "engine/" ${dir}/src/lib --include='*.svelte'`); r1 = 0; } catch { r1 = 1; }
  console.log('F1 M1 grep-law            · mutation: engine import planted in a screen  ·', r1 === 0 ? 'DIED (the law\'s grep catches the plant)' : 'TAUTOLOGY (grep saw nothing)');
  if (r1 !== 0) tautology.push('F1');
  fs.rmSync(dir, { recursive: true, force: true });
}

// F2: the offline/no-CDN law (N14) — plant a CDN url in the card CSS
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/lib/port/shareable.ts'),
    '.card { max-width:420px',
    '.card { background:url(http://cdn.example/x.png); max-width:420px');
  const d = dyingLaws(dir);
  report('F2 offline-no-CDN law     · mutation: CDN url planted in the card CSS  ·', d, 'N14');
  if (d.kind !== 'DIED') (d.kind === 'UNRUNNABLE' ? unrunnable : tautology).push('F2');
  fs.rmSync(dir, { recursive: true, force: true });
}

// F3: the saves roundtrip (N12a) — the fixture roster loses a player
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/lib/port/fixture.ts'),
    'return rostersOfRecord(fx.record)[fx.userTeam].map',
    'return ([]).map');
  const d = dyingLaws(dir);
  report('F3 saves-roundtrip        · mutation: roster → empty (0 players)            ·', d, 'N12a');
  if (d.kind !== 'DIED') (d.kind === 'UNRUNNABLE' ? unrunnable : tautology).push('F3');
  fs.rmSync(dir, { recursive: true, force: true });
}

// F4 (P-365): zero every gone% — N19 (the independent gone%-values law) must die
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/engine/sports/nfl/engine/goneodds.ts'),
    'for (const [k, v] of counts) counts.set(k, v / sims);',
    'counts.clear();');
  const d = dyingLaws(dir);
  report('F4 gone%-values law       · mutation: every gone% zeroed in goneodds.ts ·', d, 'N19');
  if (d.kind !== 'DIED') (d.kind === 'UNRUNNABLE' ? unrunnable : tautology).push('F4');
  fs.rmSync(dir, { recursive: true, force: true });
}

// F5 (P-365): the season brag names the WRONG champion — N14b (case-insensitive) must die
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/lib/port/shareable.ts'),
    'The year belongs to the <b>${esc(opts.champion)}</b>.',
    'The year belongs to the <b>${esc(opts.teamName)}</b>.');
  const d = dyingLaws(dir);
  report('F5 season-brag truth law  · mutation: champion line swapped to the user team ·', d, 'N14b');
  if (d.kind !== 'DIED') (d.kind === 'UNRUNNABLE' ? unrunnable : tautology).push('F5');
  fs.rmSync(dir, { recursive: true, force: true });
}

// F6 (P-260 F8): unwire the composition's slot check — N20 (the slot/key mismatch law) must die
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/lib/port/savesApp.ts'),
    'slotCheck: assertSlotMatchesKey',
    'slotCheck: undefined');
  const d = dyingLaws(dir);
  report('F6 save-service slot law  · mutation: the composition drops the slot check    ·', d, 'N20');
  if (d.kind !== 'DIED') (d.kind === 'UNRUNNABLE' ? unrunnable : tautology).push('F6');
  fs.rmSync(dir, { recursive: true, force: true });
}

// F7 (Part F): the older-build note is removed from the panel — N21 must die
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/lib/components/Saves.svelte'),
    'olderBuildNote(sum, engineVersion())',
    'null');
  const d = dyingLaws(dir);
  report('F7 older-build note law  · mutation: the panel stops rendering the note           ·', d, 'N21');
  if (d.kind !== 'DIED') (d.kind === 'UNRUNNABLE' ? unrunnable : tautology).push('F7');
  fs.rmSync(dir, { recursive: true, force: true });
}

// F8 (Ernie §6.5): the current-era pack is REMOVED — N22 (the packs law) must die
{
  const dir = mkCopy();
  fs.rmSync(path.join(dir, 'data', 'packs', 'nfl-pools-fit2023-2025.json'), { force: true });
  const d = dyingLaws(dir);
  report('F8 packs law             · mutation: the 2023-2025 pack removed from data/packs     ·', d, 'N22');
  if (d.kind !== 'DIED') (d.kind === 'UNRUNNABLE' ? unrunnable : tautology).push('F8');
  fs.rmSync(dir, { recursive: true, force: true });
}

// F9 (Part A, cakepanz-6): the takeover reads the WRONG team — N23 must die. Plant a rule that
// reads --zpb-t1 from the wrong team: the solver ignores the picked team and always returns
// Baltimore's stops, so the per-team takeover is a one-palette fraud and the law catches it.
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/lib/port/tokens.ts'),
    'const raw = ZPB_TEAM_COLORS[teamName];',
    "const raw = ZPB_TEAM_COLORS['Baltimore Ravens'] ?? ZPB_TEAM_COLORS[teamName];");
  const d = dyingLaws(dir);
  report('F9 team-takeover law     · mutation: the solver always reads the wrong team         ·', d, 'N23');
  if (d.kind !== 'DIED') (d.kind === 'UNRUNNABLE' ? unrunnable : tautology).push('F9');
  fs.rmSync(dir, { recursive: true, force: true });
}

// F10 (Part D, cakepanz-6): the body-font stray returns — N24 must die. Plant Cinzel back as the
// body copy face (the exact stray the three w89 audits concurring flagged, shell.css:13 +
// tokens-w89.css body rule).
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/lib/assets/tokens-w89.css'),
    'font-family: var(--font-body);   /* Part D-1: body copy is the system sans (w89.html:113), not Cinzel */',
    'font-family: var(--font-ui);');
  const d = dyingLaws(dir);
  report('F10 body-font law        · mutation: body copy set back in Cinzel                  ·', d, 'N24');
  if (d.kind !== 'DIED') (d.kind === 'UNRUNNABLE' ? unrunnable : tautology).push('F10');
  fs.rmSync(dir, { recursive: true, force: true });
}

function report(label, d, law) {
  if (d.kind === 'DIED') console.log(label, 'DIED — ' + d.laws[0]);
  else if (d.kind === 'UNRUNNABLE') console.log(label, 'COULD-NOT-RUN — ' + d.detail + ' (a falsifier that cannot run is a FAILURE — D-2)');
  else console.log(label, 'TAUTOLOGY (node battery still green — ' + law + ' did not die)');
}

// F11 (cakepanz-8 A1): the c7 phase gate returns — N28 (RESUME) must die. Plant the exact line
// the review measured (`if (!r.draft) go('hub')`) back over the unconditional landing.
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/App.svelte'),
    "      go('hub');                                                               // a resumed season always lands home (A1, cakepanz-8: the season outranks the finished draft's screen)",
    "      if (!r.draft) go('hub');                                                 // a season without its draft resume still lands home");
  const d = dyingLaws(dir);
  report('F11 resume law (N28)     · mutation: the c7 `if (!r.draft)` gate planted back          ·', d, 'N28');
  if (d.kind !== 'DIED') (d.kind === 'UNRUNNABLE' ? unrunnable : tautology).push('F11');
  fs.rmSync(dir, { recursive: true, force: true });
}

// F12 (cakepanz-8 A1): the go() redirect is deleted — N29 (DONE-DRAFT) must die. The finished
// draft's board landing goes back to the blank board the review reproduced.
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/App.svelte'),
    "    if (s === 'board' && store.getState().status === 'done') s = 'complete';\n",
    "");
  const d = dyingLaws(dir);
  report('F12 done-draft law (N29) · mutation: the go() redirect deleted                     ·', d, 'N29');
  if (d.kind !== 'DIED') (d.kind === 'UNRUNNABLE' ? unrunnable : tautology).push('F12');
  fs.rmSync(dir, { recursive: true, force: true });
}

// F13 (S15 §4.4): the stale hardcoded stamp re-planted — N36 must DIE (the envelope must never
// carry a hardcoded previous-pin engineVersion again).
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/App.svelte'),
    "    engineVersion: engineVersion(),   // the law (§4.4): the envelope's engineVersion EQUALS the running engineVersion() — S34/N36",
    "    engineVersion: '67-cakepanz@d3bd81d2',   // the MUTANT: the stale previous-pin stamp re-planted");
  const d = dyingLaws(dir);
  report('F13 stamp law (N36)       · mutation: the stale 67-cakepanz@d3bd81d2 literal re-planted   ·', d, 'N36');
  if (d.kind !== 'DIED') (d.kind === 'UNRUNNABLE' ? unrunnable : tautology).push('F13');
  fs.rmSync(dir, { recursive: true, force: true });
}

// F14 (S15 §4.8): the download path re-planted — N37 must DIE (P-209: no downloads, ever).
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/lib/screens/Share.svelte'),
    "  import { seasonBragText, cardBragText, hasBragLink } from '../port/bragText.ts';   // S15 §4.8: the P-209 copy-paste brag (the download binding is deleted)",
    "  import { downloadShare } from '../bindings/shareDownload.ts';   // the MUTANT: the deleted download binding re-imported");
  const d = dyingLaws(dir);
  report('F14 brag law (N37)        · mutation: the downloadShare import re-planted              ·', d, 'N37');
  if (d.kind !== 'DIED') (d.kind === 'UNRUNNABLE' ? unrunnable : tautology).push('F14');
  fs.rmSync(dir, { recursive: true, force: true });
}

const red = tautology.length + unrunnable.length;
if (unrunnable.length) console.log('COULD-NOT-RUN: ' + unrunnable.join(', ') + ' — the falsifier could not produce verdicts; that is a failure (D-2), never green');
if (tautology.length) console.log('TAUTOLOGIES: ' + tautology.join(', ') + ' — must be named, not kept');
if (!red) console.log('every falsified law DIED — the battery is falsifiable');
process.exit(red ? 1 : 0);
