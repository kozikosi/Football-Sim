SPEAKER: inkling | TASK: Engine test round — D. The EMERGENCY-constant defect: reproduce, real-pool test, failing test, §5 patch | DATE: 2026-11-16T03:10Z
FOR: P-333

TARGET BUILD: colors/src/sports/nfl/engine/lineup.ts @ 86f22d10 (== 6dcf13b2 for this file), architect/engine-and-seats. Worked in a disposable scratch extract (`git archive origin/architect/engine-and-seats | tar -x`); no branch was edited; all foreign mutations applied to scratch copies and restored.

## D1. The scale numbers, re-measured (not taken on trust) — VERIFIED
`fieldSlots('4-3')`, MEASURED provider (`DEFAULT_VALUES.winsPerOvr`), units of fitted weights (`winsPerOvr / WINS_PER_UNIT`):

| quantity | measured | prompt's figure |
|---|---|---|
| Σ of the 32 spot values | 8,628.5521 | 8,628.6 ✓ |
| largest single spot value | 999.3087 (QB) | 999.31 ✓ same slot |
| largest single-spot swing (max × 99) | 98,931.56 | 98,932 ✓ |
| largest whole-lineup value (Σ × 99) | 854,226.66 | 854,227 ✓ |
| shipped EMERGENCY = 100,000 ÷ single-spot swing | 1.0108 | "1.01×" ✓ |
| shipped EMERGENCY ÷ whole-lineup value | 0.1171 | "0.117×" ✓ |

The arithmetic premise is real: the shipped EMERGENCY (1e5) is strictly below the whole-lineup swing, so the "fewest emergency fills" rung is NOT above the "total value" rung. Full spot table (measured): sum 8628.55; cheapest spots K 50.04, P 50.02, FB 24.64.

## D2. The comparison, reproduced — VERIFIED (with a correction to its reading)
Constructions (exact): synthetic roster = 32 players, roles drawn UNIFORMLY from `['QB','WR','TE','CB','SS','FS','RB','OT','OG','C','ILB','OLB','EDGE','DT']` (NO K, NO P), OVR `rng.int(55, 95)`, seed = index (`makeRng(seed)`, draw order role then OVR), `lineupFor(roster, '4-3')`.

| engine | synthetic 300 (seeds 0–299) mean fills | seed-0 | real 32 rosters 4-3 | real 3-4 |
|---|---|---|---|---|
| shipped (EMERGENCY = 1e5) | 1.6567 (dist {0:43, 1:66, 2:151, 3:35, 4:2, 5:2, 6:1}) | 1 | 0 (all 32) | 0 (all 32) |
| hard strict (EMERGENCY = 1e9) | 0.0000 (dist {0:300}) | 0 | 0 | 0 |
| derived ladder (EMERGENCY = 2×scale ≈ 1.708e6; PLAYS = 1000×scale; ILLEGAL = 1000×PLAYS) | 1.6567 (identical distribution) | 1 | 0 | 0 |

Real pool = data/nfl/madden27-ratings.csv (1,941 rows + 12 free agents; VERIFIED `wc -l` 1,942 / 13). 32 team rosters, pool sizes 55–68, both bases: 0 emergency fills under ALL THREE constants. VERIFIED by running.

Two findings the round's brief did not have:

(a) THE STRICT CONSTANT'S ZERO IS VACUOUS. Under EMERGENCY = 1e9 the cost of an emergency placement (≈ +9.9e8) exceeds the empty-spot filler cost, so the optimizer answers "fewest emergency fills" by NOT FILLING the spots: seed 0 → K and P both EMPTY; seed 200 → WR2, WR3, CB2, K, P EMPTY; seed 249 → RB1, RB2, CB2, K, P; seed 259 → CB1, CB2, CB3, FS, K, P (no cornerbacks on the field). Also, 1e9 > PLAYS (1e7), so it inverts priority 2 ("every rostered player who can play plays") as well as inflating priority 3. The "strict constant uses none" observation, reproduced, is an artefact of refusing to field a football team — not a lower-bound football answer.

(b) THE DERIVED LADDER CHANGES NOTHING OBSERVABLE. Over seeds 0–4999 (5,000 fresh rosters, this construction), shipped vs derived ladder: byte-identical `value` and `emergencyFills` on every seed (VERIFIED via diff of two output files: "IDENTICAL across 5000 seeded rosters"). Same for seeds 0–299 and the 32 real rosters twice. The 1e5 vs 1.71e6 gap never flips a choice on this distribution. The defect is real in the constants' arithmetic and ABSENT from every measured outcome here.

## D3. The question that matters — VERIFIED answer: the synthetic roster is the artefact
On the 32 real rosters (the only football-realistic construction available in this repo), both the shipped constant and the derived ladder take 0 emergency fills, in 4-3 and 3-4 alike — not because the scale is right, but because real teams have K, P, 7 or 8 DBs, etc., so every spot has a legal answer. The synthetic mean of 1.66 is the cost of a construction that (i) excludes K and P from the role draw set, so the P spot (and often K) CANNOT be filled legally by anyone, and (ii) draws roles uniformly, producing grotesquely unbalanced rosters (seed 259: no cornerbacks, four C-eligible emergencies). The "1–2 avoidable emergency fills per roster" framing is not supported: the fills are predominantly UNAVOIDABLE under any football-valid ladder, and the 1e9 "zero" is bought with empty spots (see D2a). I found NO seeded roster — 0–4999, plus the 32 real ones — where the shipped constant prefers an assignment with more emergency fills over one with fewer at comparable or better value. INFERRED, strongly: the flip is reachable only under a contrived roster (e.g., >9 simultaneous cross-spot improvements ≥ 1e5 in one reassignment); my search did not find one.

## D4. The suggested failing-test construction does not work as stated — VERIFIED
The brief suggests: seed-0 roster, assert `emergencyFills === 0`; "On the current tree it takes 1; with a strict constant it takes 0."
Measured: current tree → 1 (`P <- SS ovr 58, effOvr 50, penalty 8`); under hard 1e9 → 0, but K and P BOTH EMPTY (no kicker, no punter — an illegal football lineup; VERIFIED by inspecting placements); under the prompt's OWN proposed derived ladder (2×scale) → STILL 1, with the SAME value (639,859.67) and the same placement. Root cause: the 14-role draw set has no K and no P, and nobody in the roster holds a legal P rule (only `P: { K: 2 }` and `K: { P: 2 }` exist; no K or P is present), so the P spot is ALWAYS an emergency fill under any ladder where PLAYS > EMERGENCY — which every sane ladder has. The construction cannot produce zero without either adding K/P to the draw set or tolerating empty spots. The seed-0 roster does contain 3 QBs — two get QB and FS (FS@−12), one is benched — that part is fine.
Consequence: I could not write an outcome-based test that FAILS on the current tree and PASSES with the fix, and I am not going to pretend. The fix is outcome-neutral on all 5,031 rosters I could test. What fails honestly is the LADDER DERIVATION itself (D5) — that is the actual defect. An outcome-based regression test would also be welcome if the Architect can construct a flippable roster; I could not, in 5,000 seeds of the briefed generator.

## D5. §5 patch — the fix (derived ladder) and a gate that fails today
TARGET: colors/src/sports/nfl/engine/lineup.ts @ 86f22d10, one new file colors/test/nfl/emergency-ladder.test.ts. Architect's tree; not applied to any branch; this is a filing. The Architect decides whether to accept it (he may prefer to derive reactively or leave the hard-coded ladder in place — in which case this analysis still shows the shipped ladder is arithmetically indefensible, per D1).

old -> new (lineup.ts, exact):
```
const ILLEGAL = 1e12, PLAYS = 1e7, EMERGENCY = 1e5;
```
->
```
// LADDER (P-333): derived from the provider, never hard-coded. scale = largest whole-lineup value = sum(spot values) x 99 OVR points.
// Each rung strictly exceeds everything below it under ANY value table:
//   ILLEGAL (1. QB never plays an unlisted spot) = 1000 x PLAYS
//   PLAYS   (2. every rostered player who can play plays) = 1000 x scale
//   EMERGENCY(3. fewest -8 fills)                         = 2 x scale   (> whole-lineup value = scale)
// Exported only so the ladder test can gate it; not part of the stable API.
export const ladderFor = (slots: readonly FieldSlot[], values: ValueProvider = DEFAULT_VALUES, base: Base = '4-3'): { scale: number; ILLEGAL: number; PLAYS: number; EMERGENCY: number } => {
  const v = unitsOf(slots, values, base);
  const SCALE = v.reduce((a, b) => a + b, 0) * 99;
  const PLAYS = 1000 * SCALE;
  return { scale: SCALE, ILLEGAL: 1000 * PLAYS, PLAYS, EMERGENCY: 2 * SCALE };
};
```
and in optimalLineup(), after `const { stay, stayBonus = 0, values = DEFAULT_VALUES, base = '4-3' } = opts, v = unitsOf(slots, values, base);` add:
```
  const { EMERGENCY, PLAYS, ILLEGAL } = ladderFor(slots, values, base);
```
(the local `v` still feeds `at(v, j)`; ladderFor re-derives it — cheap, and keeps one derivation.)

NEW FILE colors/test/nfl/emergency-ladder.test.ts (exact content as tested in scratch — reproduced in the scratch copies and run, verbatim):
```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fieldSlots } from '../../src/sports/nfl/engine/slots.ts';
import { DEFAULT_VALUES, WINS_PER_UNIT } from '../../src/sports/nfl/engine/valueprovider.ts';
import { ladderFor } from '../../src/sports/nfl/engine/lineup.ts';

test('the priority ladder is derived from the provider and each rung strictly exceeds the whole-lineup swing', () => {
  const slots = fieldSlots('4-3');
  const v = slots.map((f) => DEFAULT_VALUES.winsPerOvr(f.row, '4-3') / WINS_PER_UNIT);
  const scale = v.reduce((a, b) => a + b, 0) * 99;
  const l = ladderFor(slots);
  assert.ok(l.EMERGENCY > scale, `EMERGENCY (${l.EMERGENCY}) must exceed the largest whole-lineup value (${scale.toFixed(2)})`);
  assert.ok(l.PLAYS > l.EMERGENCY, `PLAYS (${l.PLAYS}) must exceed EMERGENCY (${l.EMERGENCY})`);
  assert.ok(l.ILLEGAL > l.PLAYS, `ILLEGAL (${l.ILLEGAL}) must exceed PLAYS (${l.PLAYS})`);
});
```
HOW TO CHECK (all run by me in the disposable extract):
- WITHOUT the fix (shipped constants + export-only probe exposing them): `node --test --experimental-strip-types test/nfl/emergency-ladder.test.ts` → `✖ AssertionError [ERR_ASSERTION]: EMERGENCY (100000) must exceed the largest whole-lineup value (854226.66)`, `ℹ fail 1`. VERIFIED.
- WITH the fix (ladder derived in optimalLineup, ladderFor exported, new test added): full suite `npm test` → `ℹ tests 364`, `ℹ pass 364`, `ℹ fail 0`. VERIFIED.
- The 5,000-seed sweep and the 32 real rosters are byte-identical pre/post fix (D2) — run them again if the Architect wants his own receipt.
- `npm run tsc:check` unchanged expectation: still 89/89 (the patch adds no new type errors in pinned files; `lineup.ts` has 12 pinned errors and my scratch run shows the file's error count did not grow — the fix compiled clean in the scratch suite).

## D6. What this means for the record
The defect is an ARITHMETIC truth (shipped ladder violates its own priority order) and an OBSERVATIONAL non-event (no flip in 5,031 rosters). It should be fixed as hygiene — cheaply, with the gate above — and it must NOT be used as evidence that the engine mis-assigns real rosters (it does not, VERIFIED on all 32) nor as a reason to re-open the pin (unrelated). The "v1 emergency defect" claim from earlier council work survives only as a constant-scale critique; its empirical form (avoidable fills, strict-constant win) is refuted by measurement, here stated plainly. If any seat has a flippable roster construction, I retract nothing and will gladly re-run it.

VERIFIED: everything run above (scale table, comparison tables, 5,000-seed sweep via diff, real rosters, seed-0 inspection in all three engines, the fail-now/pass-after counts, suite counts 363/363 pristine → 364/364 with fix, and the empty-spot counts under 1e9). REPORTED: nothing external — no other seat's numbers were used except the brief's, and those were re-measured or refuted here. INFERRED: reachability only on contrived rosters (D3); K-empty vs P-emergency asymmetry of seed-0 (observed in all three engines; mechanism not fully derived — the measured K/P units are K 50.04, P 50.02, the two cheapest non-FB spots). UNKNOWN: nothing material; the earlier "two independent runs" that reported avoidable fills — their exact generator is not recoverable from this repo, so their per-roster rows are not reproducible; my aggregates are computed from the construction above.
