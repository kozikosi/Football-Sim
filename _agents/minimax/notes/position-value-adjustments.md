# Position values: the Owner's five adjustments, the reconciled table, and what they would actually change

**From:** MiniMax (seat S-1900–1999) · **Date:** 21 Oct 2026
**Base build:** `NFL Draft Simulator merged.html`, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B.
**All numbers below are measured in the running build** (plain Node over CDP, no npm install), not read off a table.

**This is a proposal and a measurement for Claude — the Architect decides the final architecture.** No product file was touched.

---

## 1. The Owner's five adjustments, as the build's own numbers

The Owner's brief asks for these moves in the "Wins, 70→90" column of the positional-value table. Measured in the build, with the factors that land exactly on them:

| Slot | Now (measured) | Owner asks | Factor on the slot's wins curve |
| ---- | -------------- | ---------- | ------------------------------- |
| K    | 0.7218         | 0.45       | **×0.6234**                     |
| WR2  | 0.6006         | 0.63       | **×1.0490**                     |
| RB1  | 0.6653         | 0.58       | **×0.8718**                     |
| CB2  | 1.1775         | 0.95       | **×0.8068**                     |
| DE1  | 1.3010         | 1.38       | **×1.0608**                     |

**Where the factor goes.** The build's curve is linear from 70 to 90 — `slotWinsPerOvr()` is _defined_ as `(slotWins(90) − slotWins(70)) / 20` (candidate line 1348), and the measurement confirms `up = 20 × wpo` for **every one of the 24 spots, to four decimals**. So a single per-slot multiplier on the wins curve moves the 70→90 value, the per-+1 value and the priority/value columns together, exactly. Applying the five factors in the live build reproduces the Owner's targets to the digit (K 0.4500, WR2 0.6300, RB1 0.5800, CB2 0.9500, DE1 1.3800).

## 2. The reconciled table (the Owner's ask: one table, my ordering)

Sorted by the adjusted 70→90 value. The Owner's five rows are marked ★. The pass/run column is the model's own measurement, with the proposed run-game correction in the last column.

| Slot                       | Wins per +1 OVR | Wins, 70→90 | Pass / Run (model) | Pass / Run (if the QB rushes and receivers block) |
| -------------------------- | --------------- | ----------- | ------------------ | ------------------------------------------------- |
| Quarterback                | .1271           | 2.54        | 100 / 0            | 96 / 4                                            |
| Cornerback 1               | .0721           | 1.44        | 87 / 13            | 87 / 13                                           |
| Edge rusher 1 ★            | .0690           | 1.38        | 79 / 21            | 79 / 21                                           |
| Wide receiver 1            | .0552           | 1.10        | 100 / 0            | 95 / 5                                            |
| Edge rusher 2              | .0550           | 1.10        | 75 / 25            | 75 / 25                                           |
| Offensive tackle 1         | .0518           | 1.04        | 77 / 23            | 79 / 21                                           |
| Offensive tackle 2         | .0518           | 1.04        | 77 / 23            | 79 / 21                                           |
| Cornerback 2 ★             | .0475           | 0.95        | 88 / 12            | 88 / 12                                           |
| Defensive tackle 1         | .0473           | 0.95        | 56 / 44            | 56 / 44                                           |
| Cornerback 3               | .0470           | 0.94        | 94 / 6             | 94 / 6                                            |
| Strong safety              | .0442           | 0.88        | 82 / 18            | 82 / 18                                           |
| Middle linebacker          | .0432           | 0.86        | 62 / 38            | 62 / 38                                           |
| Free safety                | .0427           | 0.85        | 84 / 16            | 84 / 16                                           |
| Guard 1 / Guard 2 / Center | .0426           | 0.85        | 67 / 33            | 69 / 31                                           |
| Weakside linebacker        | .0401           | 0.80        | 66 / 34            | 66 / 34                                           |
| Tight end 1                | .0400           | 0.80        | 83 / 17            | 84 / 16                                           |
| Defensive tackle 2         | .0380           | 0.76        | 56 / 44            | 56 / 44                                           |
| Wide receiver 2 ★          | .0315           | 0.63        | 100 / 0            | 95 / 5                                            |
| Running back 1 ★           | .0290           | 0.58        | 21 / 79            | 24 / 76                                           |
| Kicker ★                   | .0225           | 0.45        | kicking only       | kicking only                                      |
| Wide receiver 3            | .0191           | 0.38        | 100 / 0            | 96 / 4                                            |
| Running back 2             | .0110           | 0.22        | 0 / 100            | 0 / 100                                           |
| Tight end 2                | .0072           | 0.14        | 0 / 0              | 0 / 0                                             |
| Strongside linebacker      | .0037           | 0.07        | 63 / 37            | 63 / 37                                           |

**Display rule that makes the table honest:** the "Wins per +1 OVR" column must be printed to **four** decimals, or the "Wins, 70→90" column must go. At three decimals the two columns appear to disagree (see §5).

## 3. The Owner's TE1 / TE2 condition: already met

> "I also personally think TE1 should be within 0.5 of WR1 and TE2 should be within 0.5 of WR3."

Measured, on the 70→90 column: **TE1 0.80 vs WR1 1.10 → 0.30 apart** ✔ and **TE2 0.14 vs WR3 0.38 → 0.24 apart** ✔. Both are inside 0.5 today, and both stay inside it after the five adjustments (WR1 and WR3 are untouched). On the per-+1 column the gaps are .015 and .012 — also inside 0.5. **No change is needed to satisfy the condition as written.** If the intent was tighter (TE1 nearer WR1), the smallest natural move is TE1 → 0.95 (factor 1.19), which would lift TE1 above MIKE, FS and SS; that is a statement about the game, not about the table, so I have not made it — it is one line in the factor table if the Owner wants it.

## 4. "QBs rush and receivers block" — what that actually costs

The 100/0 splits are **not display choices; they are facts about the model.** `RATING_SPECS` (candidate line ~1975) has no quarterback or receiver in any run-side unit: the run blocking unit is `olRun = {OT1, OT2, OG1, OG2, C, TE1}` and the running unit is `rb = {RB1, RB2}`. The team's run rating is `runOff = 0.35·rb + 0.65·olRun` and the pass rating is `passOff = 0.45·qb + 0.30·rec + 0.25·olPass`. So the QB's OVR never touches the run game and a receiver's OVR never touches run blocking — and the guide's pass/run split measures the model, so it reports 100/0.

**Measured candidate change** (in memory, in the running build, not written to any file): add `WR1:0.3, WR2:0.2, WR3:0.1` to `olRun` (receiver blocking) and `QB:0.5` to `rb` (quarterback rushing). The result:

| Slot                   | 70→90 now | 70→90 with the change | Pass / Run now | after      |
| ---------------------- | --------- | --------------------- | -------------- | ---------- |
| Quarterback            | 2.541     | 2.567                 | 100 / 0        | **96 / 4** |
| Wide receiver 1        | 1.103     | **1.166** (+5.7%)     | 100 / 0        | **95 / 5** |
| Wide receiver 2        | 0.601     | **0.660** (+9.9%)     | 100 / 0        | **95 / 5** |
| Wide receiver 3        | 0.383     | **0.408** (+6.5%)     | 100 / 0        | **96 / 4** |
| Running back 1         | 0.665     | 0.577 (−13%)          | 21 / 79        | 24 / 76    |
| Offensive tackle 1 / 2 | 1.036     | 1.015 (−2%)           | 77 / 23        | 79 / 21    |
| Guard 1 / 2 / Center   | 0.852     | 0.828 (−3%)           | 67 / 33        | 69 / 31    |
| Tight end 1            | 0.800     | 0.788                 | 83 / 17        | 84 / 16    |

So the correction is small, coherent, and measurable: the receivers gain value (they block), the run-game positions give a little back, and the QB picks up a 4% run share. **But it edits `RATING_SPECS` — a protected constant — and therefore changes the games, not just the draft.** The Architect's call, with the numbers above in hand. Note also that the receivers' new run value is _modelled_ blocking, not a display split: pretending a receiver blocks without letting his rating into the run-blocking unit would make the table lie.

## 5. Corrections to the four colleagues' reviews (so the Architect is not misled)

1. **"The table fails its own arithmetic" — it does not; the printed rounding does.** `slotWinsPerOvr()` is _defined_ as `(up)/20`, so `up = 20 × wpo` holds for every spot by construction. The five rows that appear to fail (DT1 .047→0.95 against CB3 .047→0.94; MIKE .043→0.86 against OG/C .043→0.85; RB1 .033→0.67; SAM .004→0.07) are **rounded displays**: the true slopes are DT1 .047287, CB3 .047005, MIKE .043153, OG/C .042618, RB1 .033266, SAM .003703 — three decimals hide the difference. The build's own table already shows one number per row; the disagreement is in the hand-copied version circulated for review. **Action: print the slope to four decimals (or drop the 70→90 column, as the Owner asked) and the disagreement disappears.**
2. **"The aggregate is impossible" — a category error.** The column sums to 23 wins, but each number is a _marginal_ value: what that one spot adds when it alone is upgraded, with every other spot held at 80. Adding the marginals together assumes the spots are independent, which they are not (the model is joint: the units interact). The sum is not a team total and never was. The same applies to "upgrading all 22 starters adds 20 wins".
3. **"One OVR point is not a common currency" — true, and the model already handles the flat part.** The 70→90 column is the _integral_ over the range and the per-+1 column is the _local slope near a typical starter_; the build computes both from the same measured curve (`slotWinsTable()` sweeps OVR 50→100 in steps of 1). The nonlinearity the colleague is worried about is in the model, not absent from it.
4. **"WR2 is severely undervalued / safeties overvalued" — a real question, but a _different_ quantity.** NFL salaries measure market value (scarcity, contract structure, cap), not wins per point of Madden OVR. The Owner's own five adjustments already make the two explicit decisions the colleagues argue for: WR2 up (0.60→0.63), CB2 down (1.18→0.95), K down (0.72→0.45). The colleagues' salary tables are a sanity check on direction, not a calibration source.
5. **"QB is not sufficiently separated" — legitimate, and it is a model change, not a table change.** Raising the QB's coefficient means changing what a QB rating is worth inside the matchup model (`RATING_SPECS.qb` and the `passOff` weights), which changes the games. If the Owner wants QB separation, that is a fourth protected-constant decision, and the honest way to size it is to test `passOff = 0.45·qb + …` against a higher QB share and measure the effect on the win spread across a 100-season run — not to edit a table.
6. **"Pass/run splits are too precise" — partly right, and the fix is in the model, not the display.** The splits are measured, not asserted; the precision problem is that the model gives a QB and a receiver no run-side role at all (§4).

## 6. The circularity the Architect must resolve before touching the constant

The brief's "these are the default weights you created" and "make these five adjustments" pull in opposite directions, and this is the one thing I would not let pass into a build unnoticed:
- The **0–700 default weights** (`modelWeights()`, the panel's "Default" button) are **derived from the same wins table** the five adjustments change. Measured effect of the five factors on that table: **RB1 185 → 160, WR2 165 → 175, DE1 360 → 380, CB2 325 → 260, K 200 → 125** (QB stays 700, the scale is unchanged).
- So if Claude writes the Owner's list into the `DEFAULT_WEIGHTS` constant _and_ applies the five adjustments, the constant and the button disagree the moment the page loads — the constant would say CB2 395, the derived table would say 260.

**Recommended resolution (one line of policy, one line of code):** keep `DEFAULT_WEIGHTS` as the _fallback only_ (it is already a fossil — every modelled slot is overwritten by the derived value, and only `P = 1` and `FB = 1` still come from it), and let the derived table be the truth. The Owner's list is then honoured as "the defaults the model produces" — and after the adjustments it reads CB2 260, K 125, RB1 160, WR2 175, DE1 380. If the Owner instead wants the pre-adjustment numbers to stand as the constant, then the constant must be labelled historical, because nothing in the build reads it except the two fallback slots.

**What the five adjustments change, exactly:**
- the draft: the CPU's player values (`cpuPick`), the board's value and priority columns, the flex comparisons, the optimal-lineup search, and the "Wins" column — i.e. **the AI's sense of what a spot is worth**;
- the guide: the positional-value table, the tier list and the "where the wins come from" split;
- the 0–700 default weights (five values, above);
- **not the games.** The season runs on `RATING_SPECS` through `teamRatings()`/`matchupModel()`, and the wins table is _derived from_ that model rather than feeding it. So a calibration layer changes the draft and the rankings, and leaves every simulated win where it was. If the intent is "make the simulation's football more like the real thing", the change has to go into `RATING_SPECS` (§4 and §5.5), not into a factor table.

## 7. The implementation shape I would hand the Architect (not applied to any product file)

One new constant, one multiplication, no protected constant touched:

```js
// Owner's 21 Oct positional calibration. Each factor scales that spot's wins curve, so the 70→90
// value, the per-+1 value and the priority/value columns all move together. The games do not: the
// season runs on RATING_SPECS, and this table is derived from the model, not fed into it.
const SLOT_VALUE_ADJ = {
	K: 0.6234,
	WR2: 1.049,
	RB1: 0.8718,
	CB2: 0.8068,
	DE1: 1.0608,
};
```

Applied where the curve is produced (`slotWinsTable()`), with `_wpoCache` cleared so the derived weights and the guide re-derive. Two things to check when it lands: the guide's own wording says the numbers are "measured on the matchup model itself" — after a calibration they are _measured and then calibrated_, and the sentence should say so; and the displayed slope needs four decimals (§5.1).

## 8. What I did **not** check

- I did not run a 100-season regression with the calibration applied, so I have no number for how the draft's outcomes or the simulated win spread move. That is the first thing to measure before the factor table ships.
- I did not test the "QB rushes" candidate over a season; I measured only its effect on the positional table (§4), not on game results.
- I did not change any product file, and I did not touch `DEFAULT_WEIGHTS`, `RATING_SPECS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC` or `PLAN_K`.
