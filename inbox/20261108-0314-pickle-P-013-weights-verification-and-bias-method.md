SPEAKER: pickle | TASK: weights recalibration — verify the Owner's table in the engine, then answer "how do we know the engine has no bias?" | DATE: 2026-11-08 03:14 UTC
FOR: P-013 (weights recalibration) · TO-ARCHITECT, TO-OWNER

# The Owner's 32 weights: verification, and why "measured = table" is not evidence

## 1. What is already in the engine (VERIFIED, tip `949627a6`)

The Owner's 6 Nov table is fully landed, in five places, all matching. I checked all 32 spots mechanically, not by eye:

| Home | Result |
|---|---|
| `colors/src/sports/nfl/engine/slots.ts` (`SLOTS`) | 32/32 match |
| `tools/mathlab/design.json` | 32/32 match |
| `tools/mathlab/salary-reference.json` (weights **and** salaries) | 32/32 match |
| `claude/rulings/2026-11-06-owner-salary-weights.md` | lists the same 32 |
| `_agents/owner-notes/2026-11-06-salary-weights-verbatim.md` | verbatim Owner note |

Receipts: my checker (`/private/tmp/weights-check.mjs`) prints `ids checked: 32 | mismatches: 0`; the design.json key-by-key test passes (`test/nfl/lineup.test.ts`); the full suite at `949627a6` is **284/284 pass** (`node --test --experimental-strip-types "test/**/*.test.ts"`).

Measured against the table (`derivedWeights('4-3')`, `/private/tmp/derive.mjs`):

- **32/32 within ±25** — max |dev| **23.3** (DE1 +23.3; WR1 −18.0; DT1 +18.0; CB1 +15.9). The ±50 room is never approached.
- **0 ordering violations** for any pair whose table gap is ≥100 (the only ordering contract the ruling keeps).
- **0 monotonicity failures** (50→99 OVR, step 7).
- 3-4 defence reads **1.029–1.041×** the table (the known ~4% side-effect of each spec's coefficients summing to a fixed total), inside the ±50 room.
- K and P are exactly 50.0 (they are linear knobs, not spec rows).

Two notes for the record, neither a request to change anything:
- **DT2 is the only weight outside the stated ±25 hand adjustment**: 10M × 25 = 250, Owner set 300 (+50). Every other non-round value is exactly +25 (WR1, WR2, OG1, CB1, DE1, TE2, C, DL5, SAM). Worth confirming DT2 300 is intentional (it is a starting spot in both bases), not a slip.
- The Owner's numbers are internally consistent with **"15th-highest APY at the position"**, not literally "slightly above average": 40M QB ≈ 15th QB APY, 25M WR1 ≈ 15th WR, 15M CB1 ≈ 15th CB. That distinction matters for the method (§3).

Stale copies that still show the superseded REV 5 table (K 200, WR1 525, etc.) and are the likely source of the council's "which weights are you using?" confusion: `_agents/ENGINE-MATH-SPEC.md` §2, `_agents/seats/STATE.md`, `_agents/seats/packets/*` (archival), `claude/V22-work-order.md`. The ruling supersedes them; the pre-ruling coefficients are correctly frozen in `colors/test/nfl/golden/legacy-coefficients.ts` for the golden tests. Recommend one line in ENGINE-MATH-SPEC §2: "superseded 6 Nov 2026 — see `claude/rulings/2026-11-06-owner-salary-weights.md`" (Architect's file, so proposed not edited).

## 2. The finding that matters for "is the engine biased?": the measurement is circular

`tools/mathlab/calibrate-weights.mjs` fits **one multiplier per spot** across `RATING_SPECS`, `DEF_SPECS`, `PERS_REC`, `RB_HEAVY` (plus the K/P knobs) by fixed-point iteration until `derivedWeights()` lands on `salary-reference.json`. So "the measured weights match the table within 25" is **by construction**. It is a check that the fit converged, not evidence that the table is right.

I made the circularity visible by measuring the **same engine** under the pre-ruling coefficients (`withLegacyCoefficients`, the frozen REV-5 fit):

**19 of 32 spots move more than 20% between the two fits.** The biggest movers:

| Spot | old fit | new fit | ratio |
|---|---|---|---|
| TE3 | 10 | 49 | ×4.84 |
| WR4 | 10 | 40 | ×4.00 |
| SAM | 34 | 104 | ×3.04 |
| TE2 | 60 | 146 | ×2.43 |
| OG1 | 289 | 394 | ×1.36 |
| CB3 | 279 | 103 | ×0.37 |
| C | 321 | 148 | ×0.46 |
| K | 200 | 50 | ×0.25 |

Group shares of total slot value, old fit → new table:

| Group | old fit | new table |
|---|---|---|
| Secondary | **18.7%** | **16.3%** |
| Special teams | **2.9%** (K alone 200) | **1.2%** |
| Offensive line | 20.0% | 18.7% |
| Receiving (WR) | 11.7% | 14.0% |

So the Owner's suspicion is **correct as a description of the old engine**: the old fit carried the secondary at ~19% of total value and the kicker at 200, and the new table cuts both. But the deeper point is the reverse of "is there bias?": the engine's measured value **follows whatever table it is fitted to**. It cannot, in its current form, be used to confirm or refute any table. That is the mechanism by which a bias hides — and it is also the reason a new table does not by itself produce an "objectively true" engine.

This is not an accusation against the Architect: the 6 Nov ruling *asked* for this fit. The point is methodological: **fit direction**, not effort, is what decides whether the measurement can be evidence.

## 3. Is salary the right anchor? (short answer: as a cross-check only)

Salary is a **market price**, not a value measure. Four distortions, all visible in the Owner's own list:

1. **Rookie scale**: Bijan/Gibbs/CMC are cheap regardless of impact — the Owner noticed this himself in the flex thread. A 15th-APY anchor systematically undervalues young elite RBs.
2. **Cap and inertia**: positional markets move in waves and lag value; APY includes years/guarantees structure that does not map to wins.
3. **Reference-point inconsistency**: "15th best" means different things per position. There are 32 QB starters, ~96 WRs who start in 3-WR sets, ~160 DBs who take snaps. 15th-best QB = a mid-tier starter; 15th-best WR = a WR1 on most teams; 15th-best C = a starter on half the league. Cross-position weights inherit that inconsistency.
4. **One point, no slope**: the table has no information about how value rises with OVR. My measurement shows that *matters*: **11/32 spots have a wins-per-OVR slope that wanders more than 15% across the rating range** (TE2: 0.000 wins/OVR at 60→80 vs 0.048 at 85→95; RB2: 0.004 vs 0.037; WR2: 0.018 vs 0.082). A single weight × (effective OVR − replacement) is a local approximation around 70–90, not a law. This is also why the Guide "rank by WINS" should use the measured curve `slotWins(slot, ovr)`, not `weight × ovr`.

Salary is still useful: as a **sanity band** on the finished measurement, and as a flag for where the market looks inefficient (which is a legitimate product opinion — the Owner may want his game to reflect market consensus or to correct it, but that is a choice, not a truth claim).

## 4. A method that can actually answer "is the engine biased?"

You cannot prove the absence of bias. You can make it **measurable and bounded**. Separate three objects that are currently conflated:

- **(A) Display weights** — the Owner's table. A product decision. Keep it as the default shown to the user (already wired as the single source: `SLOTS`/`design.json`). Do not treat it as evidence.
- **(B) Engine truth** — wins per OVR per slot, measured from mechanics that were fitted to **real football data**, not to (A).
- **(C) External anchors** — independent evidence used only to sanity-check (B): nflWAR (published wins-above-replacement), PFR Approximate Value, EPA/play by position from nflverse play-by-play, draft capital as revealed preference, salary as market cross-check.

Protocol (in order, each step a file before the next):

1. **Audit what was fitted.** A read-only list of every knob tuned to the table (`calibrate-weights.mjs` groups + K/P), and every knob built independently. No simulation. This settles "what could be biased".
2. **Pre-register.** Metrics, thresholds and what counts as evidence of bias, committed *before* results are seen. Include the Owner's own prior ranking of position groups, written down in advance.
3. **Fit mechanics on a training slice** of real data (e.g. 2018–2022), **measure on held-out seasons** (2023–2025). Report out-of-sample error. If the mechanics need a per-spot multiplier to reproduce real target/reception/EPA distributions, that multiplier is the bias, stated openly.
4. **Measure (B) and compare to (A) and (C).** Where (B) disagrees with (A) by more than the ±50 room, that is a finding to discuss — not a reason to re-fit the specs.
5. **Sensitivity across anchors.** Weights implied by nflWAR vs AV vs EPA vs salary. Spots whose value swings a lot are anchor-dependent; report the band, not a point.
6. **Independent verifier.** A seat that authored nothing in the round checks the pre-registration and the result (the existing Verifier rule; the Architect built the fit, so he does not verify his own measurement).

**The mechanism test is where the real answer lives.** The bias the Owner fears is not in the 32 numbers; it is in the engine's *mechanics*: target allocation among WR1/WR2/TE1, pass-rush by EDGE vs interior, coverage by CB vs safety. `colors/src/sports/nfl/engine/boxscore.ts` already allocates targets through `O.target`/`PERS_REC`; that is the place to measure. The McBride case is the proof: if a 99 TE gets top-6-receiver targets in the engine, TE value follows from the mechanics and no flex penalty is needed; if he does not, raising TE1's table weight is cosmetic. One number can settle it: **the engine's target share for TE1 at 99 OVR vs the real 2023–25 share for elite TEs.**

## 5. What I recommend, in one page

1. **Keep the Owner's table as the product's default weights** — it is a legitimate design opinion and it is already the source of truth. Do not ask it to prove itself.
2. **Stop using the fit as validation.** "Measured matches table" is a convergence check. Say so in the ruling, so no future reader treats 32/32 ±25 as independent evidence.
3. **Build the independent measurement before changing any more numbers**: one read-only experiment (E1 below) answers the bias question at the mechanism level.
4. **Don't chase the flex penalties to solve position value.** Flex is a downstream symptom; the TE/RB/CB value question is upstream in target/carry/coverage allocation.
5. **For the Guide, rank by the measured curve** (`slotWins(slot, ovr)`), not `weight × ovr` — 11/32 spots are materially non-linear.

### Proposed first experiments (read-only, no product change)

- **E1 — distribution audit (highest value).** For WR1/WR2/WR3/TE1/RB1 and CB1/CB2/SS/FS at OVR 80/90/99: targets, receptions, yards, and EPA-equivalent per game, engine vs nflverse 2023–25. Answers the secondary/TE bias question directly and is the input the weight question actually needs.
- **E2 — mechanic-only weights.** Measure `derivedWeights` on the specs as authored *before* the 6 Nov fit (parent of `6cccf293`), with all multipliers = 1. The residual is the engine's built-in positional tilt; compare it to (A) and (C).
- **E3 — multi-anchor band.** Per-slot value from nflWAR / AV / EPA × volume / salary; report the spread. Any spot whose swing exceeds ±50 is anchor-dependent and should not be presented as settled.
- **E4 — star-flex scan under candidate tables** (already built: `tools/mathlab/flexscan.mjs`, `flexcap.mjs`): count 85+ promotions per table, as a symptom detector, not a tuner.
- **E5 — out-of-sample season calibration**: fit on older seasons, test on 2023–25 bands (points/game, home win %, win SD, playoff rates) — the season-level check the engine already partly has.

Data needed (named sources, per the data-integrity rule): nflverse play-by-play (free; already used for the bands) for targets/EPA; PFR Approximate Value (published); nflWAR (published methodology); OverTheCap/Spotrac APY. The workspace can pull nflverse; PFR/nflWAR may need the Owner or a seat with data access to supply the files.

## 6. The question only the Owner can answer

Two different products are on the table:

- **(i) The table is the truth; the engine is fitted to it.** Fast, coherent, already done. What ships today.
- **(ii) The engine is independently true; the table is your opinion shown to users.** Slower; requires the protocol above; may produce weights that disagree with your table — and then you decide which one users see.

I recommend (ii) for the engine and (i) for the interface: your table stays the default and the Guide explains WINS by the engine's measured numbers. That preserves your intent where users see it, and gives the engine a chance to be objectively checkable where it matters. The cost is one careful round of data work, not a rebuild.

## 7. Receipts index (all run this session)

- `/private/tmp/weights-check.mjs` — 32/32 match across slots.ts, design.json, salary-reference.json; salaries match; salary×25 consistency; DT2 anomaly.
- `/private/tmp/derive.mjs` — derivedWeights 4-3/3-4, deviations, order, monotonicity, slope wander.
- `/private/tmp/legacy-compare.mjs` — old-fit vs new-fit per spot (19/32 >20%).
- `/private/tmp/shares.mjs` — group shares old vs new.
- `node --test --experimental-strip-types "test/**/*.test.ts"` in `colors/` at `949627a6` → 284/284 pass.
- Tree: `git archive origin/architect/engine-and-seats` at `949627a6` extracted to `/private/tmp/pw`; nothing in the repo was edited.
