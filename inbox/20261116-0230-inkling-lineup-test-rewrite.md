SPEAKER: inkling | TASK: Engine test round — B. §5 patch proposal: rewrite the retired-table test in colors/test/nfl/lineup.test.ts; drop the "(it is 2700 today)" parenthetical | DATE: 2026-11-16T02:30Z
FOR: P-342

This is a FILING, not an edit. Nothing here is integrated until the Architect applies it. Test-file and lab-gate changes only; no `src/` change; no protected constant touched.

TARGET BUILD: colors/test/nfl/lineup.test.ts @ `86f22d10` (tip of architect/engine-and-seats; the trees of `86f22d10` and `6dcf13b2` are identical for every file this patch names — VERIFIED: `git diff --stat 6dcf13b2 86f22d10 -- colors/ tools/` prints nothing). Also names tools/mathlab/check-design.mjs (same commit) and one new file colors/test/nfl/weights-table.test.ts.
BACKGROUND (verified this session, receipts in item A's filing): the retired table is `SLOTS[].weight` / `WEIGHT` in colors/src/sports/nfl/engine/slots.ts (header: "RETIRED REFERENCE TABLE (P-318, 14 Nov 2026). Draft, lineup and the board no longer read these weights") and `tableValues()` in valueprovider.ts ("Reference and tests only"). The solver spends DEFAULT_VALUES (MEASURED). Five council seats unanimously decided the test should be REWRITTEN, not deleted and not kept as-is.

## Patch 1 — DELETE from colors/test/nfl/lineup.test.ts (the two retired-table tests and the now-dead `design` read); CREATE colors/test/nfl/weights-table.test.ts

WHERE (anchor, exact text at lineup.test.ts L14–35):
```
const read = (p: string) => fs.readFileSync(new URL(p, import.meta.url), 'utf8');
const design = JSON.parse(read('../../../tools/mathlab/design.json')) as Record<string, number>;
const flexJson = JSON.parse(read('../../../tools/mathlab/flex.json')) as { roles: string[]; flex: Record<string, Record<string, number>> };
```
old -> new:
```
const read = (p: string) => fs.readFileSync(new URL(p, import.meta.url), 'utf8');
const flexJson = JSON.parse(read('../../../tools/mathlab/flex.json')) as { roles: string[]; flex: Record<string, Record<string, number>> };
```
(the `design` const goes; `flexJson` stays — the flex equality stays)

WHERE (anchor, the two tests, L25–35):
old -> new (delete these two tests entirely):
```
// ---- table ----
test('table: 32 spots, QB 1000, every weight a multiple of 5, equal to tools/mathlab/design.json key by key', () => {
  assert.equal(SLOTS.length, 32);
  assert.equal(WEIGHT.QB, 1000);
  for (const s of SLOTS) assert.equal(s.weight % 5, 0, s.id);
  assert.deepEqual(Object.keys(design).sort(), [...SLOT_IDS].sort());
  for (const id of SLOT_IDS) assert.equal(WEIGHT[id], design[id], id);
});
test('table: unit counts are 16 offense, 14 defense, 2 special', () => {
  const c = (u: string) => SLOTS.filter((s) => s.unit === u).length;
  assert.deepEqual([c('offense'), c('defense'), c('special')], [16, 14, 2]);
});
```

WHERE (import line L4):
old -> new:
```
import { SLOTS, SLOT_IDS, WEIGHT, fieldSlots, DL5_SHARE } from '../../src/sports/nfl/engine/slots.ts';
```
->
```
import { SLOTS, WEIGHT, fieldSlots, DL5_SHARE } from '../../src/sports/nfl/engine/slots.ts';
```
(`SLOT_IDS` is only used by the moved tests; `SLOTS`, `WEIGHT`, `fieldSlots`, `DL5_SHARE` stay in use — VERIFIED by grep: SLOTS at L127, L137, L292, L310; WEIGHT at L242–243; SLOT_IDS ONLY at L30–31.)

CREATE colors/test/nfl/weights-table.test.ts (new file; the retired-table checks, out of the behavioral suite, no design.json import):
```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SLOTS, SLOT_IDS, WEIGHT } from '../../src/sports/nfl/engine/slots.ts';
import { DEFAULT_VALUES } from '../../src/sports/nfl/engine/valueprovider.ts';

// The RETIRED fitted table (slots.ts header: "RETIRED REFERENCE TABLE (P-318, 14 Nov 2026)"). QB == 1000 is the table's scale
// normalisation — a claim about a reference artifact, not about what is measured, fair, or true. The solver spends DEFAULT_VALUES
// (MEASURED, P-318); this file guards only the shape of the retired reference. The MEASURED curve never asserts these numbers.
test('weights-table: 32 spots, QB 1000 (scale normalisation), every weight a multiple of 5', () => {
  assert.equal(SLOTS.length, 32);
  assert.equal(SLOT_IDS.length, 32);
  assert.equal(new Set(SLOT_IDS).size, 32);
  assert.equal(WEIGHT.QB, 1000);
  for (const s of SLOTS) assert.equal(s.weight % 5, 0, s.id);
});
test('weights-table: unit counts are 16 offense, 14 defense, 2 special', () => {
  const c = (u: string) => SLOTS.filter((s) => s.unit === u).length;
  assert.deepEqual([c('offense'), c('defense'), c('special')], [16, 14, 2]);
});
test('weights-table: the ID set is consistent (SLOT_IDS order, SLOT_IDS unique, WEIGHT keys)', () => {
  assert.deepEqual([...SLOT_IDS], SLOTS.map((s) => s.id));            // definitional today; guards a future re-export
  assert.deepEqual(Object.keys(WEIGHT).sort(), [...SLOT_IDS].sort()); // definitional today; guards a future hand edit
});
test('weights-table: the solver spends the MEASURED provider, not the retired table', () => {
  assert.equal(DEFAULT_VALUES.name, 'measured');   // fails if the retired table is ever wired back into the solver
});
```
Notes on what stayed OUT on purpose: no `design.json` import (that check moves to the lab gate, Patch 3); no assertion that any weight equals any model number (that would re-pin the retired table to the model); the flex-table equality is NOT moved — `flex: the typed table equals tools/mathlab/flex.json … rule by rule` stays untouched in lineup.test.ts (single live source of truth, per the brief).

## Patch 2 — drop the number-pin parenthetical in the identity test (same file, mandatory)
WHERE (anchor, exact text L246):
```
  // moves (it is 2700 today). What must hold for ANY values is the accounting: every spot is filled by a 70, so
```
old -> new:
```
  // moves. What must hold for ANY values is the accounting: every spot is filled by a 70, so
```
(DELETE the parenthetical entirely — do not substitute another number. The Owner ruled that nothing is pinned to the gap number; the MEASURED number is re-derived in item G's filing: 2773.0387 under the MEASURED provider, flex cost all of it, spot-value difference exactly 0.)

## Patch 3 — tools/mathlab/check-design.mjs: take over the design.json value equality
check-design.mjs already loads design.json (line 4). The WEIGHT↔design.json equality moves there so the archive stays machine-checked without the engine suite depending on it. The fit-file argument becomes OPTIONAL; with no argument the tool runs the reference checks only.
WHERE (anchor, exact text lines 4–8):
```
const fit = JSON.parse(fs.readFileSync(process.argv[2])), d = JSON.parse(fs.readFileSync(new URL('./design.json', import.meta.url)));
let bad = 0; const fail = m => { console.log('FAIL', m); bad++; };
if (d.QB !== 1000) fail('QB is not 1000');
Object.entries(d).forEach(([s, v]) => { if (v % 10) fail(`${s}=${v} does not end in 0`); });
```
old -> new:
```
const d = JSON.parse(fs.readFileSync(new URL('./design.json', import.meta.url)));
let bad = 0; const fail = m => { console.log('FAIL', m); bad++; };
if (d.QB !== 1000) fail('QB is not 1000');
Object.entries(d).forEach(([s, v]) => { if (v % 10) fail(`${s}=${v} does not end in 0`); });
{
  // The retired fitted table (colors/src/sports/nfl/engine/slots.ts, header "RETIRED REFERENCE TABLE (P-318)") equals design.json, key by key.
  // Parsed with a regex (no TS import; any Node): if the SLOTS literal's shape ever changes, the count check fires instead of passing vacuously.
  const src = fs.readFileSync(new URL('../../colors/src/sports/nfl/engine/slots.ts', import.meta.url), 'utf8');
  const weights = {}; let m; const re = /\{ id: '([A-Z0-9]+)', weight: (\d+)/g;
  while ((m = re.exec(src))) weights[m[1]] = +m[2];
  const ks = Object.keys(d);
  if (Object.keys(weights).length === 0) fail('slots.ts: no WEIGHT rows parsed (the regex missed the SLOTS literal)');
  if (Object.keys(weights).length !== ks.length) fail(`slots.ts WEIGHT rows ${Object.keys(weights).length} !== design.json keys ${ks.length}`);
  for (const s of ks) if (weights[s] !== d[s]) fail(`slots.ts WEIGHT ${s}=${weights[s]} !== design.json ${s}`);
  if (Object.keys(weights).length) console.log('slots.ts WEIGHT vs design.json: keys', ks.length, bad ? 'has MISMATCHES' : 'match');
}
if (!process.argv[2]) { console.log(bad ? 'DESIGN CHECK FAIL ' + bad : 'DESIGN CHECK OK (no fit file given; E1/E2 not run)'); process.exit(bad ? 1 : 0); }
const fit = JSON.parse(fs.readFileSync(process.argv[2]));
```
WHY: single home for the retired-artifact equality (the lab gate, which already loads design.json), out of the behavioral suite; the tool stays fit-mode compatible (same messages and exit codes after the inserted block).

## WHY (whole change)
The test asserted the RETIRED reference table equals design.json key by key — a fact about two retired artifacts, not about the engine (the solver spends DEFAULT_VALUES). Five seats unanimously chose REWRITE. The rewrite keeps the structural guards the proposal context requires (32 spots; QB == 1000 as scale normalisation; multiples of 5; 16/14/2 units; consistent ID set), drops the value-pinning design.json equality into the lab gate, adds the provider-name guard, and removes the gap number-pin from the comment.

## SAFE ALONE?
Yes — touches two test files, one lab tool, adds one test file; zero `src/` change; nothing protected moves (WEIGHT itself is untouched). Expected suite movement: remove 2 tests, add 4 → 363 → 365, all green. No consumer counts these tests or asserts 363 anywhere I can find (VERIFIED: `grep -rn "363" --include="*.mjs" --include="*.yml" --include="*.json" --include="*.md" .` in the Architect's tree returns only prose/results files, not gates). If the Architect prefers the new file to live elsewhere (e.g. colors/test/retired/), that is his call; the content is the proposal.
Risk to name: the regex in Patch 3 reads the SLOTS literal; if the literal's shape changes the count check fails loudly rather than passing vacuously (by design). INFERRED: no other caller of check-design.mjs exists outside mathlab results docs; the one-arg invocation pattern is unchanged.

## HOW TO CHECK
1. `cd colors && npm test` → expect `ℹ tests 365`, `ℹ pass 365`, `ℹ fail 0` (currently 363/363).
2. `grep -n "design.json" colors/test/nfl/lineup.test.ts` → expect no hits.
3. `grep -n "2700 today" colors/test/nfl/lineup.test.ts` → expect no hits.
4. `node tools/mathlab/check-design.mjs` (no args) → expect `DESIGN CHECK OK (no fit file given; E1/E2 not run)`; on drift expect `DESIGN CHECK FAIL <n>` with lines naming the drifted slots, exit 1.
5. `node tools/mathlab/check-design.mjs <fit.json>` → unchanged output plus one new line `slots.ts WEIGHT vs design.json: keys 32 match` (fit-mode behaviour otherwise preserved).
6. `npm run tsc:check` → expect `tsc baseline OK: 89 errors (pinned 89).` unchanged.
7. `grep -n "SLOT_IDS" colors/test/nfl/lineup.test.ts` → expect no hits; `grep -n "weights-table" colors/test/nfl/weights-table.test.ts` → expect the four test names.

If any command fails after applying this, the failure is the answer — do not widen the gate to make it pass.

VERIFIED (this session): the old text quoted above is byte-identical to the file at 86f22d10 (checked with sed/grep); the usages greps; the 363/363 and 89/89 baseline runs; the "(it is 2700 today)" line number (246); the suite test count math (363 − 2 + 4 = 365) — the arithmetic, not the post-patch run (the patch is NOT applied; it is for the Architect). The regex behaviour in Patch 3 is INFERRED from the SLOTS literal shape as printed above (I did not run it — it runs only after integration; its failure mode on a shape change is designed to be loud, and its silent-pass mode is guarded by the count check).
