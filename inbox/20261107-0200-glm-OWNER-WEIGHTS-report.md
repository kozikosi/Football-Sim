SPEAKER: GLM | ROLE: council seat, analytics | TASK: Owner weights directive (7 Nov) — verify, test, report | DATE: 2026-11-07T02:0Z

FOR: Kosi's 7 Nov salary-weights directive (permanent opinion on the 32 spot weights). Every claim below is
either run on this bench (VERIFIED, command in HOW TO CHECK) or a named ruling/file (REPORTED). Labels marked.

## Finding 1 — the engine already carries your table exactly (VERIFIED)

Your 7 Nov table is, slot for slot, identical to the table Claude (Architect) landed on `6cccf293` (6 Nov 21:20 UTC,
"Engine: Owner salary-based spot weights (6 Nov ruling)") and recorded as an Owner ruling in
`claude/rulings/2026-11-06-owner-salary-weights.md`. Three files agree with your list (32/32 exact):

- `colors/src/sports/nfl/engine/slots.ts` — the engine constant `SLOTS` (the runnable truth: lineups, ratings, draft value);
- `tools/mathlab/design.json` (architect tip) — the weights file the test suite compares key-by-key;
- `tools/mathlab/salary-reference.json` (architect tip) — your salary+weight pairs as pure reference data:
  header literal "INTERNAL REFERENCE ONLY: never imported by colors/src, never shown to the user, never bundled" —
  VERIFIED `grep -rn salary colors/src` is empty (receipt below). Your "salaries never displayed" ask is already wired.

My probe checked your 32 entries against `SLOTS` in code — `CONST MATCH: 32/32 exact`.

## Finding 2 — salary arithmetic (VERIFIED, arithmetic)

Your rule: weight ≈ 25 × salary ($M), hand-tuned "±25 points". The deviations (weight − 25×salary) across your
32 lines: **22 slots at 0, 9 slots at exactly +25** (WR1, WR2, TE2, OG1, C, DE1, DL5, SAM, CB1), and —
**the one exception — DT2 10M → 300 = +50 over the rule** (all your other 10M rows are 250: RB1, OG2, CB2). Two
reads: intended taste, or a typo (12M would put it at 300 exactly, like your five other 12M rows at 300). No
action taken; flagged for your call. Note the directive's ±50 room (matching your 6 Nov ruling) applies to the
model-vs-table distance, not table-vs-salary — so DT2 is legal either way.

## Finding 3 — the model's revealed impact (the test you asked for) (VERIFIED)

Claude's engine exposes the exact instrument for this: `derivedWeights()` (`colors/src/sports/nfl/engine/value.ts`)
measures each spot's real wins impact on the matchup model (everything else at 80, best plan per lineup, the unit
1 weight point = 0.00254 wins for a 70→90 OVR upgrade). I ran it on the tip's engine, both formations, against
your table (full table in the probe output file; headline numbers):

- **Worst deviation from your table: DE1 at +23.3** (measured 673.3 vs 650); WR1 −18 (632.0); DT1 +18;
  CB1 +15.9; WR2 −11; MIKE +12.2. **All 32 slots inside your ±50 room, on both 4-3 and 3-4** (the reveal is
  formation-constant to <1 — same position, same weight, exactly as the 2 Nov ruling wanted).
- Measured **no rank inversions**: heavier table spot never measures lighter (WR1/DE1 tie at 650 resolves to
  DE1 673.3 > WR1 632.0 on measured value — matters if two slots sit at the same weight).
- **Pattern worth naming: the model lets pass-rush/coverage run hot and receiving run cold**
  (DE/DT/CB/MIKE 10–23 above their printed weights; WR1/WR2 11–18 below). Cause is structural: each spec's
  coefficients sum to a fixed total, so targets cannot all be met exactly (Claude's test comment says the defence
  reads ~4% above the table since 6 Nov). Coming in at ≤23 max beats your ±50 room with headroom — nothing needs
  doing, but if you ever want the reveal pulled even tighter the lever is the spec refit, not the table.
- K/P measure exactly 50 (the 6cccf293 slice fit their knobs too).

## Finding 4 — the contract question the probe surfaced (VERIFIED, already resolved upstream)

`slots.ts` line 1 still says "error at most 2.5" — the retired contract. The current one is yours from 6 Nov:
measured may deviate ≤50 per spot; the table (not the measurement) defines the ranking; ordering contract kept
only for gaps >100 (`claude/rulings/2026-11-06-owner-salary-weights.md` §5, REPORTED — read in full). Stale
comment, one line for the Architect; engine behavior is correct.

## Finding 5 — the test suite agrees (VERIFIED, receipts below)

`test/nfl/lineup.test.ts` 34/34 (table == design.json key-by-key, QB 1000, weights multiple of 5) ·
`test/nfl/matchup.test.ts` 19/19 (**all 32 spots measured within 50 of the Owner-approved weight; no inversions;
monotonic in own-OVR; 3-4 formation parity; QB/P points-scale**) · `test/nfl/versions.test.ts` 7/7 (engine/data
stamps match this bench). My probe independently re-derived all three headline properties before the suits ran.

## Implications

1. Your directive is **already the shipped, tested engine state** — the strongest promotion is "the table is live
   and verified"; nothing for the council to argue. DB-carry: slots.ts (runnable), design.json (suite),
   salary-reference.json (data). If any council copy disagrees, the tip's three files win.
2. **Draft board follows your weights** ('wins' priority = weight × efficiency-gap: draft.ts):
   QB 1000 → DE1/WR1 650 → DT1/OT1 500 → CB1 400 → WR2 400 → OG1/DE2 300/WR2/OT2/DT2/MIKE/SS/FS 300 … → FB 25 last
   — with measured ties favoring the hot-side spot (DE1 over WR1 at 650; NICKEL 100 measures ≈ SAM 100).
3. **Guide WINS re-rank** (your ask; also ruling §4): not built yet (UI out of the 6 Nov slice) — the WINS value
   it should rank by IS the measured reveal (F3), not the table number; DE1 673 > WR1 632 on measured ground.
4. If a future engine change makes reveal drift, F5's reveal test fails before µ-level slippage ships: monitoring
   exists per-slot; the Architect retightens via `tools/mathlab/calibrate-weights.mjs` (the fitter that hit ≤25).
5. DT2 (+50 vs salary rule) awaits your call (Finding 2).

## HOW TO CHECK (receipts, all run on this bench 7 Nov)

- `node --experimental-strip-types _agents/glm/tests/owner-weights-verify.mts` → the Finding-1/2/3 table
  (this session's file `_agents/glm/tests/owner-weights-verify.mts`, pushed).
- `cd colors && node --test --experimental-strip-types test/nfl/lineup.test.ts` → `pass 34 / fail 0`.
- `cd colors && node --test --experimental-strip-types test/nfl/matchup.test.ts` → `pass 19 / fail 0`.
- `cd colors && node --test --experimental-strip-types test/nfl/versions.test.ts` → `pass 7 / fail 0`.
- `grep -rn salary colors/src` → empty (salaries never in engine source).
- `git show 6cccf293 --stat` → the 6 Nov slice (slots.ts + design.json + specs refit + tests).
- My design.json worktree copy was stale (my branch's older REV-2-era table); synced from the architect tip into
  the index this session (same commit as this session's files) — that was a bench necessity for the lineup test,
  not an engine change.
