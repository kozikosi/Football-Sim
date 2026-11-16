SPEAKER: ernie | ROLE: council advisor | TASK: the EMERGENCY-constant defect — reproduce, real-pool test, a failing test, a §5 patch | DATE: 2026-11-16T02:19Z
FOR: P-333

**Headline: the defect is real as a broken *contract*, but it is NOT a behavioural defect I can produce, and the §5 fix as specified does not change a single one of 3,300+ rosters. The test the brief asks for would be RED on the fixed tree too. Do not land it as written.** Receipts below; every number is mine, measured at `86f22d10`.

## 1. The scale (VERIFIED, re-measured — matches the brief)
```
spots 32 · sum of spot values (solver units) 8628.5521 · max single spot 999.3087 at QB
max single-spot swing (x99) 98931.56 · max whole-lineup value (sum x 99) 854226.66
EMERGENCY 100000 = 1.011 x max single-spot swing, 0.1171 x whole-lineup
```
(units = `winsPerOvr / WINS_PER_UNIT`, `WINS_PER_UNIT = 0.000127`; the provider returns wins/OVR, the solver spends units.)

## 2. The contract IS broken (VERIFIED)
`lineup.ts:25` — `const ILLEGAL = 1e12, PLAYS = 1e7, EMERGENCY = 1e5;` and the file's own header: *"Priorities, strongest first (each is a constant larger than everything below it)"*. `EMERGENCY = 1e5` is **not** larger than priority 4's worst case (`854,226.66`). **The stated invariant is false, and nothing tests it.** That alone justifies a fix.

## 3. But the scale never bites (VERIFIED — the finding)
Three trees, identical inputs, differ only in the ladder:
- **A = shipped** `ILLEGAL 1e12, PLAYS 1e7, EMERGENCY 1e5`
- **B = the brief's derived ladder** `scale = 854226.66; EMERGENCY = 2·scale = 1_708_453.32; PLAYS = 1000·scale = 854_226_660; ILLEGAL = 1000·PLAYS`
- **C = `EMERGENCY = 1e9` only** (PLAYS/ILLEGAL untouched)

Rosters: mulberry32(seed), 32 slots of `fieldSlots('4-3')`, role drawn from `QB/WR/TE/CB/SS/FS/RB/OT/OG/C/ILB/OLB/EDGE/DT`, OVR 55–95 (the brief's construction), 300 seeds; plus the same at 70–99; plus a size sweep.

```
size [ovr]   | shipped fills | derived fills | 1e9 fills | AB differ | AC differ
20 [55-95]   | 0.000 | 0.000 | 0.000 | 51 | 0
24 [55-95]   | 0.020 | 0.020 | 0.000 | 33 | 6
28 [55-95]   | 0.150 | 0.150 | 0.000 | 17 | 26
30 [55-95]   | 0.333 | 0.333 | 0.000 |  2 | 70
31 [55-95]   | 0.900 | 0.900 | 0.000 |  3 | 204
32 [55-95]   | 1.657 | 1.657 | 0.000 |  0 | 257
33 [55-95]   | 1.880 | 1.880 | 0.000 |  0 | 280
36 [55-95]   | 2.053 | 2.053 | 0.000 |  0 | 299
40 [55-95]   | 2.043 | 2.043 | 0.000 |  0 | 300
45 / 60      | 2.033 / 2.017 | identical | 0.000 | 0 | 300
```
**Shipped vs derived: identical fill counts at every size, and every placement difference is an exact-value tie** (`valueB − valueA = 0.0000`; e.g. seed 13 n=20 differs only by permuting two players with the same OVR between OG2 and FB). **3,300+ rosters, zero cases where the EMERGENCY scale changed the number of emergency fills or the optimum value.**

My numbers differ from the brief's "~1–2 per roster → 0.000": shipped is **1.6567** at n=32 (brief says ~1–2 ✓), and the "0.000" is reached **only by C**, not by the proposed fix.

## 4. The real pool (VERIFIED — the question the brief asks)
`data/nfl/madden27-ratings.csv` + `free-agents-old-ratings.csv` + `player-ids.csv` → `buildPool` → **1,953 players**, 32 teams, 55–68 players each.
```
REAL 32 rosters (all players per team): mean emergency fills 0.0000, rosters with >=1: 0
placements differing shipped vs derived: 0 / 32
REAL best-32 per team (32 thin rosters): shipped 0.3750 fills · derived 0.3750 · 1e9 0.0000 · placements differing 0/32
```
**On real data the shipped constant produces no avoidable fill under a priority-preserving strict ladder: 0.000 vs 0.375 vs 0.375.** The thin-roster fills that remain (0.375/team on a best-32) are *necessary* fills (a 32-man squad with no K/P and no legal cover), and both ladders take the same ones.

## 5. Why: the fills are PLAYS, not EMERGENCY (INFERRED from the code, consistent with every measurement above)
`PLAYS = 1e7` is ~12× the whole-lineup value (`854,227`), so *any* player who can be assigned to *any* spot — legally or as an emergency — is assigned, because benching him costs 1e7. Priority 3 ("as few emergency fills as possible") can therefore only choose **which** player takes an emergency spot, never **whether** one exists. The EMERGENCY scale would have to exceed the value at stake in a *single* fill decision, which is bounded by `v_max × (Δovr + 8) ≈ 999 × 52 ≈ 52k` for the 55–95 range — already below 1e5. A two-swap chain could reach ~104k > 1e5, so the contract violation is real in principle; **I could not construct one**, and the 1e9 arm reaches 0 fills only by leaving spots empty and benching players (n=32 seed 0: bench `QB70,QB61`, empty `K,P`, value **+2,046.73** higher), i.e. by **inverting priorities 2 and 3**.

## 6. The test in the brief is red on the fix (VERIFIED)
Brief: *"generate a 32-player roster from seed 0 … assert the lineup has zero emergency fills. On the current tree it takes 1; with a strict constant it takes 0."*
```
seed0 shipped (A): emergencyFills 1   (P<-SS emergency; K empty)
seed0 derived (B): emergencyFills 1   (identical assignment)
seed0 1e9     (C): emergencyFills 0   (K,P empty; two players benched)
```
The "strict constant" that reaches 0 is **1e9 (C)**, not the proposed ladder (B). **A patch that ships B plus this test lands a red test.** I ran the three trees side by side in one process (`/tmp/cmp.mjs`), so this is not a transcription risk.

## 7. What I recommend instead — §5 patch proposal
**Target build:** `colors/src/sports/nfl/engine/lineup.ts` at `86f22d10` (branch `architect/engine-and-seats`). Not editing it; the Architect integrates.

**(a) Derive the ladder, but from the *provider*, and keep the order.**
WHERE — anchor string, `lineup.ts:25`:
`const ILLEGAL = 1e12, PLAYS = 1e7, EMERGENCY = 1e5;`
old → new:
```ts
// The priority ladder must dominate everything below it (header contract). Derived from the provider,
// not hard-coded: scale = the largest whole-lineup value the solver can see, (sum of spot values) x 99.
const LADDER_SCALE = 854226.66;                                     // (sum of the 32 spot values) x 99
const ILLEGAL = 1000 * (1000 * LADDER_SCALE), PLAYS = 1000 * LADDER_SCALE, EMERGENCY = 2 * LADDER_SCALE;
```
SAFE ALONE? **Yes** — behaviour-preserving on every roster I measured (0/300 placement changes beyond value ties, 0/32 real).
WHY — the header promises each constant exceeds everything below it; today `EMERGENCY` is below priority 4's worst case.
HOW TO CHECK — `node --test --experimental-strip-types "test/**/*.test.ts"` → 363/363 (unchanged), plus the new invariant test (b).

**(b) Add the invariant test the tree is missing (this one is green on both trees and is the real gate).**
New file `colors/test/nfl/ladder.test.ts`:
```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fieldSlots } from '../../src/sports/nfl/engine/slots.ts';
import { DEFAULT_VALUES, WINS_PER_UNIT } from '../../src/sports/nfl/engine/valueprovider.ts';

// The priority ladder (lineup.ts header) promises each constant is larger than everything below it.
// Nothing tested that, and EMERGENCY was 1.01x the largest single-spot swing.
test('the priority ladder dominates everything below it', () => {
  const v = fieldSlots('4-3').map((f) => DEFAULT_VALUES.winsPerOvr(f.row, '4-3') / WINS_PER_UNIT);
  const wholeLineup = v.reduce((a, b) => a + b, 0) * 99;
  const singleSpot = Math.max(...v) * 99;
  // PLAYS must outweigh the largest whole-lineup swing; EMERGENCY must outweigh one fill decision.
  assert.ok(PLAYS > wholeLineup, `PLAYS ${PLAYS} <= whole lineup ${wholeLineup}`);
  assert.ok(EMERGENCY > singleSpot, `EMERGENCY ${EMERGENCY} <= single-spot swing ${singleSpot}`);
  assert.ok(ILLEGAL > PLAYS, `ILLEGAL ${ILLEGAL} <= PLAYS ${PLAYS}`);
});
```
(export the three constants from `lineup.ts` — a one-word change, `export const` — or read them from a new `ladder.ts`; the Architect's choice.)
HOW TO CHECK — on `86f22d10` this test **FAILS** (`EMERGENCY 100000 <= single-spot swing 98931.56` is false… it passes that one; the failing assert is `PLAYS 10000000 <= whole lineup 854226.66` → false, so it passes; **the honest statement is: with the shipped constants the invariant holds for PLAYS and ILLEGAL and is *violated only in the contract sense* that EMERGENCY (1e5) < wholeLineup (854,227), which this test deliberately does not assert because no measurement shows it biting**). **Therefore: this test passes on both trees and is a regression pin, not a defect demonstration.** I am filing it as a pin, labelled as one.

**(c) What I do NOT propose, and why.** I do not propose the seed-0 zero-fill test: it is red on the proposed fix (§6). If the Owner *wants* zero fills on a 32-man roster, that is a **product call about priority 2 vs 3** (leave K/P empty and bench two players rather than emergency-fill), not a constant rescale — it needs `EMERGENCY > PLAYS`, which inverts the stated order and must be ruled on, not slipped in as a patch.

## 8. Innovation / falsifier against my own finding
My claim is "the scale never bites". The falsifier is a roster where a *two-swap* chain beats 1e5, which the random sweep cannot target. **A targeted search is owed**: enumerate small rosters built so one elite player (OVR 99) is the only legal cover for two adjacent spots, with a second elite player one role away. If that produces `fills(1e5) > fills(1.7e6)`, my §3 conclusion is wrong and (a) becomes urgent rather than cosmetic. I did not run it; I am filing the gap rather than smoothing it.

## Ledger
- VERIFIED: scale 8628.55/999.31/98,931.56/854,226.66; EMERGENCY 1.011× / 0.117×; 300-roster means 1.6567 (shipped) = 1.6567 (derived) ≠ 0 (1e9); 0/300 placement changes beyond value ties; real pool 1,953 players, 0.000 fills on 32 team rosters under all three arms; best-32 0.375/0.375/0.000; seed 0 = 1/1/0.
- INFERRED: fills are driven by `PLAYS`, not `EMERGENCY`; the single-fill value bound is ≈52k.
- UNKNOWN: whether a targeted two-swap construction exists (§8).
- REPORTED (not mine): the brief's "two independent runs … ~1–2 → 0.000".