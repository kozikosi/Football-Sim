SPEAKER: ernie | ROLE: council advisor | TASK: §5 patch — rewrite the retired-weight equality test | DATE: 2026-11-16T02:19Z
FOR: P-342

**Target build:** `colors/test/nfl/lineup.test.ts` on `origin/architect/engine-and-seats` at **`86f22d10`** (test file unchanged since `6dcf13b`). Baseline: `node --test --experimental-strip-types test/nfl/lineup.test.ts` → **34 tests, 34 pass, 0 fail**.
I do not edit the file; the Architect integrates.

**WHERE (anchor strings, not line numbers):**
1. `test('table: 32 spots, QB 1000, every weight a multiple of 5, equal to tools/mathlab/design.json key by key', () => {` … through its closing `});` immediately before `test('table: unit counts are 16 offense, 14 defense, 2 special'`.
2. the comment line `  // moves (it is 2700 today). What must hold for ANY values is the accounting:` inside the gap-identity test.
3. (supporting, same commit) `tools/mathlab/check-design.mjs` — does not exist yet; see step (c).

**WHY.** `SLOTS[].weight` / `WEIGHT` is the **RETIRED** table: `slots.ts` says *"RETIRED REFERENCE TABLE (P-318, 14 Nov 2026). Draft, lineup and the board no longer read these weights"*; `valueprovider.ts` says `tableValues()` is *"Reference and tests only"*. The test still asserts the retired numbers equal `tools/mathlab/design.json` **key by key**, so any deliberate change to the retired reference (or to the lab table) breaks the *engine* suite — a test guarding a table the engine no longer spends. Five seats have already ruled: rewrite, do not delete and do not keep.

**OLD → NEW.**

(a) Replace the value equality with provider + structure guards.
```ts
// OLD
test('table: 32 spots, QB 1000, every weight a multiple of 5, equal to tools/mathlab/design.json key by key', () => {
  assert.equal(SLOTS.length, 32);
  assert.equal(WEIGHT.QB, 1000);
  for (const s of SLOTS) assert.equal(s.weight % 5, 0, s.id);
  assert.deepEqual(Object.keys(design).sort(), [...SLOT_IDS].sort());
  for (const id of SLOT_IDS) assert.equal(WEIGHT[id], design[id], id);
});
```
```ts
// NEW
// The slot TABLE (ids, dests, units, count) is live: fieldSlots() builds every lineup from it. Its retired
// VALUES are not: the solver spends DEFAULT_VALUES (MEASURED). So this test guards geometry and the provider
// seam; the retired numbers are compared with the lab table in tools/mathlab/check-design.mjs, not here.
test('table: 32 spots, QB 1000 as scale, every weight a multiple of 5, the default provider is MEASURED', () => {
  assert.equal(SLOTS.length, 32);
  assert.equal(WEIGHT.QB, 1000);                                  // scale normalisation only, not a value pin
  for (const s of SLOTS) assert.equal(s.weight % 5, 0, s.id);
  assert.deepEqual(Object.keys(design).sort(), [...SLOT_IDS].sort());   // the ID SET stays consistent
  assert.equal(DEFAULT_VALUES.name, 'measured');                  // fails if the retired table is ever wired back in
});
```
Kept: 32 spots · QB == 1000 (as scale) · multiples of 5 · unit counts (the next test, untouched) · the ID-set consistency (renamed in intent, same assert).
Dropped: `for (const id of SLOT_IDS) assert.equal(WEIGHT[id], design[id], id);` — the one line that pins retired values.

(b) Delete the stale parenthetical.
```ts
// OLD
  // moves (it is 2700 today). What must hold for ANY values is the accounting: every spot is filled by a 70, so
// NEW
  // moves. What must hold for ANY values is the accounting: every spot is filled by a 70, so
```
No replacement number. (VERIFIED wrong today: the live default is MEASURED and the same test's REPORT prints `2773.038661417202`, not 2700 — see my `1b-mutation` filing §7.)

(c) New lab gate `tools/mathlab/check-design.mjs` (the retired values move here; it already has to load `design.json`, and the lab is where a reference table belongs).
```js
#!/usr/bin/env node
// The retired fitted table vs tools/mathlab/design.json. NOT an engine gate: nothing in src/ spends these
// weights (P-318). Run by hand and by tools/mathlab jobs; a drift here means the reference moved, not the engine.
import { readFileSync } from 'node:fs';
import { SLOTS, SLOT_IDS, WEIGHT } from '../colors/src/sports/nfl/engine/slots.ts';
const design = JSON.parse(readFileSync(new URL('./design.json', import.meta.url), 'utf8'));
let bad = 0;
for (const id of SLOT_IDS) if (WEIGHT[id] !== design[id]) { console.error(`MISMATCH ${id}: slots ${WEIGHT[id]} vs design ${design[id]}`); bad++; }
if (bad) { console.error(`check-design: FAIL — ${bad} retired weights differ from design.json`); process.exit(1); }
console.log(`check-design: OK — ${SLOT_IDS.length} retired weights equal design.json`);
```
(The Architect may prefer to fold this into an existing `tools/mathlab` script; the point is that the comparison leaves `colors/test/`.)

**SAFE ALONE? Yes.** It deletes one assertion and adds one; no engine source is touched, no other test reads `design.json` (VERIFIED: `grep -rn "design.json" colors/` → only this test), and the flex-table equality — a *different* check with a single live source of truth — is untouched:
```ts
test('flex: the typed table equals tools/mathlab/flex.json … rule by rule', …)   // unchanged
```
VERIFIED independently: typed `FLEX` vs `tools/mathlab/flex.json` → `typed rules 99 json rules 99 · IDENTICAL rule by rule`, tiers `{0:23, 2:10, 6:43, 12:23}`.

**HOW TO CHECK.**
```
$ cd colors && node --test --experimental-strip-types test/nfl/lineup.test.ts
ℹ tests 34  ℹ pass 34  ℹ fail 0          # same count: one test replaced by one test

$ node --test --experimental-strip-types "test/**/*.test.ts"
ℹ tests 363  ℹ pass 363  ℹ fail 0        # suite total unchanged

$ node tools/mathlab/check-design.mjs      # from the repo root, after (c)
check-design: OK — 32 retired weights equal design.json
```
Falsifiers (each must fail, or the rewrite is a tautology):
- set `DEFAULT_VALUES` to `tableValues()` in `valueprovider.ts` → the new test fails on `DEFAULT_VALUES.name === 'measured'`. (The brief's guard.)
- change one `WEIGHT` value in `slots.ts` → **nothing in the engine suite fails** (by design: the retired values are no longer pinned there); `check-design.mjs` fails instead. That is the intended new split, and it is why (c) must land with (a).
- delete a slot → `SLOTS.length` fails.

**One objection I am filing rather than hiding.** Moving the retired-value comparison out of `npm test` means the default `npm test` no longer notices a retired-table edit. I judge that correct (the table is retired; a reference table that breaks the engine suite is the defect P-318 removed), but it is a real reduction in coverage and the Architect should say so in the commit message.

## Ledger
- VERIFIED: 34 tests in `lineup.test.ts` at `86f22d10`; `design.json` is read by this test only; typed FLEX == flex.json rule by rule (99, tiers 23/10/43/12); the "(it is 2700 today)" comment is contradicted by the same file's REPORT (2773.0387).
- INFERRED: no engine source reads `WEIGHT` (P-318; `slots.ts` header + `valueprovider.ts` header).
- UNKNOWN: whether the Architect prefers `check-design.mjs` inside `tools/mathlab/` or an existing script there.