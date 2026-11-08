SPEAKER: DS | ROLE: advisor | TASK: Engine bias audit + what "objectively true" would require | DATE: 2026-11-08T00:00Z
FOR: P-284 (Owner salary weights) · P-255 (methodology) · P-250 (calibration)
ANSWER-OF: Owner's question, 7 Nov 2026: "how do we build a better, more objectively true engine?"

# What the numbers say, and what would count as evidence

**Six lines.**

1. **The salary table is a better prior than the personal table, but it is a market price, not a wins
   measurement.** 22 of its 32 values are exactly 25 points per $M; the 15th-best salary is a different
   percentile at QB, WR, CB and K; and QB $40M → 1000 is a convention, not a derivation. Keep it as the
   display prior; stop calling it objective truth.
2. **The Colors engine matches the salary table because it was fitted to it.** `calibrate-weights.mjs`
   fits the specs to `salary-reference.json`, and `derivedWeights()` is `slotWins20 / 0.00254`. The measured
   match (rho 0.992, MAE 7.1, top-5 5/5, zero inversions) is a regression test for the fit, not a validation
   of the table. VERIFIED from the files.
3. **The unfitted old engine is the independent evidence, and it carries a secondary and kicker premium.**
   Against salary: secondary mean **+147** (CB1 +168, CB2 +213, CB3 +270), kicker **+234**, skill **−51**
   (WR1 −216, WR2 −164). That is the bias you suspected, in the place you suspected. VERIFIED by sweep.
4. **But it is not a literal copy of your personal table.** The old table's absolute values are far from the
   old engine's (MAE 297 vs 107 for salary); the rank correlation is only slightly higher (0.708 vs 0.682).
   The secondary tilt is real; "the engine copied my table" is not proven, and the CB3/kicker values sit
   above *both* tables, which points at the mechanics rather than the table. VERIFIED / INFERRED.
5. **The only objective anchor is football outcomes: snaps × EPA/play above replacement × points/EPA ×
   wins/point, fitted on early seasons and tested on held-out seasons.** Salary can be a sanity band; it
   cannot be the target, or the circle just moves from your table to the market.
6. **Before more tuning:** freeze the salary table as the display prior, add a fit-lineage field to every
   parameter, build the data anchor on 2015–2021 and test on 2022–2024, pre-register the metrics and
   thresholds, and have a seat that did not build the engine verify it. Two tools and the first
   pre-registration are in this lane (`bias-audit.mjs`, `anchor-compare.mjs`, H-DS-001/002/003).

---

## 1. What I measured

| Thing | Source | Command / receipt |
|---|---|---|
| Old engine's revealed value | `Football-Sim-PreColors.html`, sha256 `40233d6b…` | `tools/mathlab/lab.js` sweep, `w7090` (wins/OVR at 70→90); fixture `_agents/ds/tools/fixtures/engine-bias-audit.json` |
| Colors measured weights | `origin/architect/engine-and-seats`, `derivedWeights('4-3')` | 32 slots; dump saved to the fixture |
| Owner personal table | Pre-Colors `DEFAULT_WEIGHTS`, line 452 | 35 slots, QB 320 |
| Owner salary table | `tools/mathlab/salary-reference.json`, 6 Nov ruling | 32 slots, QB 1000 |
| Fit path | `tools/mathlab/calibrate-weights.mjs` + `colors/src/sports/nfl/engine/value.ts` | fixed-point `m *= (target/measured)^0.8`; `WEIGHT_UNIT_WINS = 0.00254` |

All curves and tables are normalised to **QB = 1000** before comparison. The tool uses average ranks for
ties (the Owner tables have many ties: five OL at 295, three DE/DT at 350/320, …), so the correlations are
reproducible; an earlier tie-arbitrary calculation gave slightly different values and is superseded.

## 2. The bias audit

### 2.1 The old engine is not a copy of the personal table

| Pair (26 shared Pre-Colors slots) | Spearman rho | MAE | Top-5 overlap | Inversions |
|---|---:|---:|---:|---:|
| Pre-Colors impact vs **personal** table | 0.708 | **296.6** | 3/5 | 62 |
| Pre-Colors impact vs **salary** table | 0.682 | **107.5** | 3/5 | 61 |
| Colors fitted vs **salary** table (32) | **0.992** | **7.1** | 5/5 | **0** |
| Colors fitted vs **personal** table (30) | 0.737 | 281.7 | 3/5 | 75 |

The old personal table's absolute values are much further from the old engine than the salary table is:
the personal table says OL ≈ 922 and DE/DT ≈ 1000–1094 on the QB=1000 scale, while the old engine measures
OL 335–408 and DE/DT 299–512. The old engine compressed the personal table's extremes. So "the engine is a
copy of my table" is false in absolute terms.

Rank correlation is also a blunt instrument here: the personal table and the salary table themselves
correlate at **rho 0.736** (31 shared slots), because every sensible table puts QB first, then edge/WR/OL,
then the rest. A high rho across heterogeneous positions is mostly the common ordering, not evidence of
bias. **Use unit residuals and per-slot deltas, not rho alone.**

### 2.2 But the secondary and kicker are systematically high vs salary

Group mean residual (measured − salary, QB=1000), Pre-Colors:

| Unit | n | Mean Δ | Min Δ | Max Δ |
|---|---:|---:|---:|---:|
| secondary | 5 | **+147.0** | +36.1 (FS) | +269.9 (CB3) |
| ST | 1 | **+234.0** | +234.0 (K) | +234.0 |
| LB | 3 | +44.9 | −70.9 (SAM) | +165.9 (WILL) |
| OL | 5 | +44.3 | −92.4 (OT1) | +185.4 (C) |
| DL | 4 | −33.5 | −138.1 (DE1) | +133.1 (DE2) |
| skill | 7 | **−51.3** | −215.9 (WR1) | +64.7 (TE1) |

The largest single gaps: **CB3 +270**, **K +234**, **CB2 +213**, **WR1 −216**, **C +185**, **CB1 +168**,
**WILL +166**, **WR2 −164**, **DE1 −138**. (The OL row hides a split: the center is +185 while OT1 is −92;
the unit mean is not the story.)

The same table after the Colors fit (measured − salary, 32 slots):

| Unit | Mean Δ | Min Δ | Max Δ |
|---|---:|---:|---:|
| secondary | +8.7 | +1.8 | +16.1 |
| DL | +13.9 | +5.0 | +23.7 |
| LB | +7.1 | +3.6 | +12.4 |
| skill | −6.1 | −17.6 | −0.3 |
| OL | −4.5 | −7.4 | −2.2 |
| ST | +0.1 | +0.1 | +0.1 |

The fit removed the unit-level tilt by construction. That is what a fit does. It is not evidence that the
tilt was wrong.

### 2.3 The Colors match is a fit, not a validation

VERIFIED from the source:

- `tools/mathlab/calibrate-weights.mjs:2-4` — "salary-based weights … the target the engine math is fitted
  to"; fixed-point iteration `m *= (target / measured)^0.8`.
- `tools/mathlab/salary-reference.json` `_note` — "the target the engine math is fitted to (slotWinsPerOvr
  within ±50 of each weight, Owner's room for deviation)."
- `colors/src/sports/nfl/engine/value.ts:32-35` — `WEIGHT_UNIT_WINS = 0.00254`;
  `derivedWeights = slotWins20 / WEIGHT_UNIT_WINS`.

So the ±50 test in `matchup.test.ts` is a **fit-residual test**: it asks whether the fit converged, not
whether the target is true. The `matchup.test.ts` golden test is a *mechanics* check (Pre-Colors unit
ratings and matchup parity), which is valuable and separate; it does not validate the value table.

D-007 (the 28 Oct fit target was `design.json` 27 Oct × 0.00254, not the personal table) changes *which*
table was the historical target, not the circularity. The current target is `salary-reference.json`; the
current match is a fit to it. Whether `design@27Oct` was independent is a separate provenance question, and
it needs the same audit. I did not re-run the 28 Oct fit; that part is REPORTED.

## 3. Why salary is a weak anchor

1. **Market price ≠ wins.** Salary prices expected future performance, injury risk, guarantees, void years,
   franchise tags, and cap timing. It is a stock, not a flow. A player can be paid for past production or
   projected growth; the engine needs realized wins per OVR.
2. **The percentile is inconsistent across positions.** The 15th-best salary is ~47th percentile at QB
   (32 starters), ~15th percentile at WR/CB (~100 starters), and ~47th at K (32). "Slightly above average"
   is false for QB and K, and false in the other direction for WR/CB. A consistent method uses the same
   percentile, or the starter-weighted average, or replacement level (the 33rd–40th at each position).
3. **Rookie contracts distort the top.** Bijan, Gibbs and other elite RBs are on rookie deals and underpaid
   relative to their wins; the veteran market price at RB1 ($10M) is not the wins value of a top back. The
   Owner's own flex experiment (Bijan/CMC/Gibbs should prefer RB) is about *player preference*, not slot
   value; the salary table can undervalue exactly the players the experiment names.
4. **The 25 points/$M mapping is a convention.** It is linear, so it is just a normalization; but the choice
   of QB $40M → 1000 and the hand adjustments (+25 on nine slots, +50 on DT2) are the Owner's judgment. That
   is fine as a prior; it is not a derivation. The table's internal inconsistencies (DT2 300 at $10M is +50,
   C 150 at $5M is +25) are evidence that it is intuition, not a formula.
5. **The scale is not the same as the engine's unit.** `WEIGHT_UNIT_WINS = 0.00254` converts weight points
   to wins/OVR; the ±50 test is in weight points. A 50-point deviation is 0.127 wins/OVR — about 0.25 wins
   across a 70→90 range. That may be the right tolerance, but it should be stated in wins, not points, when
   the Owner is asked to accept it.

None of this makes the salary table useless. It makes it a **prior and a sanity band**, which is exactly
what a market price is good for.

## 4. What "objectively true" would require

### 4.1 The data anchor

For each slot, compute:

```
value(slot) = snaps(slot) × (EPA/play(slot) − EPA/play(replacement at slot)) × points/EPA × wins/point
```

- **Volume** (`snaps`) and **efficiency** (`EPA/play`) stay separate. Collapsing them is how the
  percentile/scarcity confound starts.
- Fit on 2015–2021, test on 2022–2024 (held out). Do not tune on the test years.
- Bootstrap over seasons/players for a standard error per slot; report a band, not a point.
- Convert to wins with a documented points/EPA (≈4.5) and wins/point (≈1/32.5); show the sensitivity.

The hard part is **defense**. nflverse has snap counts and play-by-play, but not individual coverage
attribution; PFF/Next Gen Stats are proprietary. For the secondary — the exact place the Owner suspects
bias — the public data anchor is weakest. Options: (a) team-level pass-defense EPA allowed by personnel
package (nickel vs base) from `pbp` + `snap_counts`; (b) target share/avoidance (how often QBs throw at a
CB relative to his teammates); (c) contract structure beyond AAV; (d) expert priors. Label the result as a
**band**, not a point, and do not pretend the data settles CB3.

### 4.2 Pre-register before looking

Write the hypothesis, metric, threshold and test command **before** running the comparison. Example for
the next experiment (H-DS-003, open):

- **Prediction:** the data anchor puts CB3 above 100 (nickel snaps are a large share) and K below 284
  (kicker wins are small); the old engine's secondary residual shrinks but does not vanish.
- **Threshold:** if the data anchor's CB3 is within ±50 of 100, the salary table is vindicated on CB3; if it
  is above 200, the old engine was closer and the fit overcorrected.
- **Test:** `node _agents/ds/tools/anchor-compare.mjs --config <real-anchor>.json`.
- **Result that would change my mind:** a data anchor that reproduces the salary table within ±50 on every
  slot would make the salary table the best available default, and the old engine's tilt a genuine error.
  A data anchor that reproduces the old engine's secondary would make the fit a mistake.

### 4.3 Sensitivity across anchors

Fit the engine to four targets: (a) salary, (b) data anchor, (c) personal table, (d) flat/equal. For each
slot, report the range across the four. Slots that move a lot are **anchor-dependent**; slots that are
stable are **robust**. The secondary is the key test: if CB1/CB2/CB3 move by hundreds of points across
anchors, their value is a modeling choice, not a football truth, and the UI should say so.

### 4.4 Independent verification

AGENTS §9: the Architect does not certify his own build. The same rule applies to the value table: a seat
that did not build the engine runs the pre-registered test and posts the receipt. If no verifier is
available, the result is `proposed`, not `verified`; do not lower the bar.

## 5. The specific red flags, and what would change my mind

| Slot | Old impact | Salary | Colors fit | What would settle it | What would change my mind |
|---|---:|---:|---:|---|---|
| K | 284 | 50 | 50 | Real FG/XPA win probability added per season | If real kicker WPA is ≈0.3–0.5 wins/season, 50 is too low; if ≈0.1, 50 is fine |
| CB3 | 370 | 100 | 103 | Nickel snap share + target EPA allowed | If CB3 plays 60–70% of snaps at league-average EPA, his value should be ~60–70% of CB1's, not 25% |
| C | 335 | 150 | 148 | Pressure rate and run-block EPA vs guards | If centers prevent pressure at the same rate as guards, the 150 vs 400 gap is market scarcity, not wins |
| WR1 | 434 | 650 | 632 | Target share and EPA/target | If WR1 gets 25% of targets at high EPA, 650 is plausible; if the engine spreads targets evenly, the fit is overcorrecting |
| CB1 | 568 | 400 | 416 | CB1 target EPA allowed + snap share | If the data says 500+, the fit is too low; top CBs may be worth more than the 15th-best salary |
| TE2 | 57 | 150 | 146 | 12-personnel snap share | If TE2 plays 45–55% of snaps, 150 is plausible; if 25%, too high |
| OT1/OT2 | 408/408 | 500/300 | 492/296 | Pressure rate by side | The salary table's OT1/OT2 gap is large; if the data says the gap is small, the table is pricing scarcity |

## 6. What to do now

1. **Freeze the salary table as the display prior.** No more fitting to it until the data anchor exists.
2. **Fit-lineage audit.** Every engine parameter gets `provenance: measured | fitted-to-X | hand-set` plus a
   source. Without this, no one can tell signal from fit. This is the single highest-value metadata change.
3. **Build the data anchor.** nflverse snap counts + play-by-play, 2015–2021 fit, 2022–2024 test; offensive
   slots first, defensive slots as a band with the limitations stated.
4. **Pre-register H-DS-003** (the data-anchor comparison) before running it.
5. **Measure the unfitted engine** (Pre-Colors specs) against the data anchor; report group residuals. If
   the secondary residual survives, fix the mechanics (`RATING_SPECS`, `DEF_SPECS`), not the table.
6. **Independent verifier**, then the Owner decides the product call where the data is silent.
7. Only then consider a new default table. The salary table can remain the UI prior; the engine's math
   should be data-anchored.

## 7. What I built

| Tool | What it does | Receipt |
|---|---|---|
| `_agents/ds/tools/bias-audit.mjs` | Compares any measured curve to any table: rho, Pearson, slope, MAE/RMSE, top-k, inversions, unit residuals | `node _agents/ds/tools/bias-audit.mjs --selftest` → **PASS (7 fixtures)**; fixture run gives the numbers above |
| `_agents/ds/tools/anchor-compare.mjs` | Computes the snap × EPA-above-replacement curve, with `epaSe` uncertainty, and compares it to tables | `node _agents/ds/tools/anchor-compare.mjs --selftest` → **PASS (9 assertions)**; `--schema` documents the input contract |
| `_agents/ds/tools/fixtures/engine-bias-audit.json` | The real audit inputs (Pre-Colors, Colors, personal, salary) | Reproducible; source lines in the fixture |
| `_agents/ds/tools/fixtures/anchor-example.json` | **Illustrative only** — round numbers, not real data | Clearly labelled |

The audit is reproducible with:

```
node _agents/ds/tools/bias-audit.mjs \
  --config _agents/ds/tools/fixtures/engine-bias-audit.json \
  --markdown /tmp/audit.md
```

## 8. What I did not check

- I did not run the raw-curve witness on w79; the ABSORBED-at-0.000000% claim is REPORTED, not verified.
- I did not re-run T1 on OR's branch; the delta question is UNKNOWN.
- I did not fetch nflverse snap/play-by-play; the data anchor is a scaffold, not a result.
- I did not review OR's flex tools; those answers are UNKNOWN.
- I did not verify every hash-pinning tool after `40233d…` → `395f2641…`; Q40 is partial.

**Labels:** the audit numbers in §2 are VERIFIED by the commands above; the causal reading in §2.2–2.3 is
INFERRED; the salary-method critique in §3 is INFERRED from the table's arithmetic and the `_note`; the
protocol in §4 is INFERRED (a proposal, not a result). Nothing here changes a protected constant.
