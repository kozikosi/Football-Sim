SPEAKER: glyph | ROLE: council seat (analysis) | TASK: P-321 spread question (Owner-directed, relayed by MUSE) | DATE: 2026-11-09T22:10:25Z

# slotWins20 spread question: is ±5 the right local-slope spread? (P-321)

**Status:** VERIFIED analysis (read-only measurements). No engine/product files changed. Owner-directed question; Architect decides implementation.

## Method (VERIFIED)

- Engine measured: Colors engine `67-cakepanz/src/engine/sports/nfl/engine/value.ts` (`slotWins`/`bestUnitPts`/`teamRatings`, `fieldSlots` 4-3). Run with `node --experimental-strip-types` from `/Users/kosi/Desktop/Football Sim/67-cakepanz`. **Command exit 0.**
- Pool: `origin/council/muse:data/madden27-ratings.csv` (header+1941 data rows). Pool averages computed via Python `csv` (VERIFIED): overall mean 73.84, median 73. By CSV pos mean: QB 71.85, HB 75.98, FB 71.88, WR 75.53, TE 70.48, LT 75.00, RT 72.98, LG 72.39, RG 73.58, C 71.43, DT 73.93, LEDG 74.98, REDG 74.74, MIKE 73.35, WILL 72.29, SAM 69.00, CB 74.99, FS 73.76, SS 74.63, K 78.27, P 77.03. K min 73 (no sub-73 K in pool) — confirms 70-baseline bias for K.
- Slot→center mapping (per MUSE proposal, per-position pool average): QB→71.85, RB1/RB2→HB 75.98, FB→71.88, WR*→75.53, TE*→70.48, OT1→LT 75.00, OT2→RT 72.98, OG1→LG 72.39, OG2→RG 73.58, C→71.43, DE1→REDG 74.74, DE2→LEDG 74.98, DT1/DT2/DL5→DT 73.93, MIKE→73.35, WILL→72.29, SAM→69.00, CB1/CB2/CB3→75.00, DIME→(CB+FS+SS)/3=74.46 (proxy; dime back is mixed DB — **INFERRED** best proxy), SS→74.63, FS→73.76, K→78.27, P→77.03.
- Local slope: `[slotWins(slot, center+spread, others@position-avg) − slotWins(slot, center−spread, others@position-avg)] / (2*spread)`, others held at their own slot centers (position-specific averages). Spreads: ±3, ±5, ±7, ±10. Old reference: `slotWins20 = slotWins(s,90)-slotWins(s,70)` with others@80, slope = old20/20.
- D (displacement, thetaprice definition): `D@90 = max(0, (X−Y)*(1 − slopeA/slopeB))`, X=90, Y=70, best representative slot per flex role = highest `s5` among that role's slots. Flex rules from `origin/architect/engine-and-seats:tools/mathlab/flex.json` (104 rules). W (wins-lost) for 4 proposed rules computed directly with engine at X=90: **0.00** in both old (others@80) and pool-grounded contexts (VERIFIED) — W cannot price displacement deterrents (consistent with thetaprice).

## 1) Slopes by spread, every slot (side-by-side)

Slopes are wins per +1 OVR (local, pool-grounded, others@position-avg) unless noted. `old_s` = slotWins20/20 (70→90, others@80). `maxΔvs5` = max relative deviation of {s3,s5,s7} from s5.

| slot | center | old_s | s3 (±3) | s5 (±5) | s7 (±7) | s10 (±10) | maxΔvs5 | notes |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| QB | 71.8 | 0.12691 | 0.12347 | 0.12353 | 0.12408 | 0.12691 | 0.4% | stable |
| DE1 | 74.7 | 0.08551 | 0.08551 | 0.08548 | 0.08548 | 0.08551 | 0.0% | stable |
| WR1 | 75.5 | 0.08026 | 0.08378 | 0.08036 | 0.07840 | 0.08026 | 4.3% | mild nonlinearity |
| DT1 | 73.9 | 0.06579 | 0.06583 | 0.06579 | 0.06578 | 0.06579 | 0.1% | stable |
| OT1 | 75.0 | 0.06252 | 0.06248 | 0.06249 | 0.06250 | 0.06252 | 0.1% | stable |
| WR2 | 75.5 | 0.04940 | 0.06523 | 0.05744 | 0.05196 | 0.04940 | 13.6% | **nonlinear/kink** |
| CB1 | 75.0 | 0.05281 | 0.05275 | 0.05278 | 0.05280 | 0.05281 | 0.1% | stable |
| OG1 | 72.4 | 0.05004 | 0.05000 | 0.05001 | 0.05002 | 0.05004 | 0.1% | stable |
| MIKE | 73.3 | 0.03965 | 0.03971 | 0.03967 | 0.03966 | 0.03965 | 0.1% | stable |
| DE2 | 75.0 | 0.03952 | 0.03957 | 0.03954 | 0.03952 | 0.03952 | 0.1% | stable |
| DT2 | 73.9 | 0.03945 | 0.03952 | 0.03948 | 0.03946 | 0.03945 | 0.1% | stable |
| FS | 73.8 | 0.03945 | 0.03946 | 0.03946 | 0.03946 | 0.03945 | 0.0% | stable |
| SS | 74.6 | 0.03942 | 0.03947 | 0.03944 | 0.03942 | 0.03942 | 0.1% | stable |
| OT2 | 73.0 | 0.03756 | 0.03755 | 0.03755 | 0.03755 | 0.03756 | 0.0% | stable |
| CB2 | 75.0 | 0.03299 | 0.03297 | 0.03297 | 0.03298 | 0.03299 | 0.1% | stable |
| OG2 | 73.6 | 0.03130 | 0.03129 | 0.03129 | 0.03129 | 0.03130 | 0.0% | stable |
| TE1 | 70.5 | 0.03116 | 0.03085 | 0.03090 | 0.03099 | 0.03116 | 0.3% | stable |
| RB1 | 76.0 | 0.03084 | 0.03058 | 0.03063 | 0.03070 | 0.03084 | 0.2% | stable |
| WILL | 72.3 | 0.01972 | 0.01978 | 0.01975 | 0.01973 | 0.01972 | 0.2% | stable |
| DL5 | 73.9 | 0.01967 | 0.01973 | 0.01970 | 0.01968 | 0.01967 | 0.2% | stable |
| C | 71.4 | 0.01876 | 0.01876 | 0.01876 | 0.01876 | 0.01876 | 0.0% | stable |
| TE2 | 70.5 | 0.01851 | 0.00664 | 0.01331 | 0.01623 | 0.01851 | 50.1% | **threshold/nonlinear** |
| CB3 | 75.0 | 0.01307 | 0.01303 | 0.01305 | 0.01306 | 0.01307 | 0.2% | stable |
| WR3 | 75.5 | 0.01235 | 0.01235 | 0.01235 | 0.01235 | 0.01235 | 0.0% | stable |
| DIME | 74.5 | 0.00658 | 0.00655 | 0.00655 | 0.00657 | 0.00658 | 0.2% | stable |
| SAM | 69.0 | 0.01315 | 0.00643 | 0.00640 | 0.00718 | 0.01315 | 12.3% | **nonlinear/kink** |
| K | 78.3 | 0.00636 | 0.00636 | 0.00636 | 0.00636 | 0.00636 | 0.0% | stable (center now valid; K min=73) |
| P | 77.0 | 0.00635 | 0.00590 | 0.00591 | 0.00592 | 0.00595 | 0.2% | stable |
| WR4 | 75.5 | 0.00509 | 0.00509 | 0.00509 | 0.00509 | 0.00509 | 0.0% | stable |
| RB2 | 76.0 | 0.01234 | 0.00485 | 0.00485 | 0.00715 | 0.01234 | 47.2% | **threshold/nonlinear** |
| TE3 | 70.5 | 0.00617 | 0.00402 | 0.00402 | 0.00402 | 0.00617 | 0.0% | flat locally, rises by ±10 |
| FB | 71.9 | 0.00313 | 0.00313 | 0.00313 | 0.00313 | 0.00313 | 0.0% | stable |

**Which slots move most between spreads, and why (VERIFIED by fine-grid probe):** `TE2`, `RB2`, `SAM`, `WR2` (maxΔvs5 50.1/47.2/12.3/13.6%). Fine-grid wins (pool-grounded, others@pos-avg, 4-3) show threshold/package behavior:
- `TE2` center 70.5: at 60–67.5 wins ≈ 0.0000; jumps at +3 (73.5→+0.0398), +5 (75.5→+0.1331), +10 (80.5→+0.3702). Below-average TE2 contributes ~0 marginally in this measurement context (package/fielding threshold); value concentrates above center. ±3/±5 understate, ±10 approaches old wide secant.
- `RB2` center 76.0: 66:-0.0446, 71:-0.0233, 76:0.0000, 79:+0.0149, 81:+0.0253, 83:+0.0680, 86:+0.2021 — convex above ~+7 (backup touches/role threshold). ±3/±5 give ~0.00485 (local near-linear low region); ±10 captures upper convexity (0.01234).
- `SAM` center 69.0: near-linear through +5 (slope ~0.0064), then accelerates by +10 (79→+0.1998, slope to ±10 = 0.01315) — a kink above the local window.
- `WR2` center 75.5: slope decreases as spread widens (s3 0.065 > s5 0.057 > s7 0.052 > s10 0.049) — concave/diminishing returns locally; ±3 overstates, ±10 understates vs local.

**Stability:** 28/32 slots have maxΔvs5 < 5% (stable). 4/32 are spread-sensitive (the threshold/curvature slots above).

## 2) Does spread choice change D materially?

D = displacement deterrent, `max(0,(90−70)*(1−slopeA/slopeB))` using best per-role slope at each spread (pool-grounded). Flex.json has 104 rules. Below-D count = rules where `cur < D − 0.5`.

| spread/baseline | below-D count | delta vs old |
|---|---:|---:|
| old (70→90, others@80) | 12 | — |
| ±3 pool-grounded | 14 | +2 |
| ±5 pool-grounded | 12 | 0 |
| ±7 pool-grounded | 12 | 0 |
| ±10 pool-grounded | 12 | 0 |

**Four proposed rules (cur = current table value 12):**

| rule | cur | D_old | D@±3 | D@±5 | D@±7 | D@±10 | verdict (all spreads) |
|---|---:|---:|---:|---:|---:|---:|---|
| RB>WR | 12 | 12.32 | 12.70 | 12.38 | 12.17 | 12.32 | borderline (≈cur); UNDER only by small margin at old/±3/±5/±10, ≈ok at ±7 |
| TE>EDGE | 12 | 12.71 | 12.78 | 12.77 | 12.75 | 12.71 | **UNDER across all spreads** (by ~0.7) |
| TE>OT | 12 | 10.03 | 10.13 | 10.11 | 10.08 | 10.03 | ok across all (cur > D) |
| DT>EDGE | 12 | 4.61 | 4.60 | 4.61 | 4.61 | 4.61 | ok across all (cur >> D) |

**12 below-D rules at ±5 (same set/size as old):** `FB>RB(2<17.96)`, `FB>TE(6<17.98)`, `FB>EDGE/DT/ILB/OLB(12<19.27/19.05/18.42/16.83)`, `C>DT(6<14.30)`, `C>OG(6<12.50)`, `C>OT(12<14.00)`, `OLB>ILB(2<10.04)`, `OLB>EDGE(12<15.38)`, `TE>EDGE(12<12.77)`. **±3 adds 2 more** (14 total) because narrower spread amplifies some ratio noise/threshold artifacts; ±5/±7/±10 match old count and nearly the same magnitudes.

**Conclusion (VERIFIED): spread choice does NOT materially change D conclusions** for the four proposed rules or the 12-rule below-D set at ±5/±7/±10. ±3 is the outlier (+2 rules) and is least stable on threshold slots. TE>EDGE remains under-priced in every spread; DT>EDGE and TE>OT remain fine; RB>WR is borderline in every spread.

## 3) Does spread choice change measured weights materially?

Measured weight proxy = `(slope * 20) / 0.00254` (local-slope wins20-equivalent in Colors weight units). Compared to old `old20/0.00254`:

| slot | w_old | w_±5 equiv | move (±5 vs old) | material? |
|---|---:|---:|---:|---|
| RB2 | 97.1 | 38.2 | −60.6% | **YES** (threshold; local value far lower than wide secant) |
| SAM | 103.5 | 50.4 | −51.3% | **YES** (local below kink) |
| TE3 | 48.6 | 31.7 | −34.8% | **YES** (flat local region) |
| TE2 | 145.7 | 104.8 | −28.1% | **YES** (threshold) |
| WR2 | 389.0 | 452.3 | +16.3% | **YES** (concave; local steeper) |
| P | 50.0 | 46.5 | −7.0% | moderate |
| QB | 999.3 | 972.7 | −2.7% | small |
| 25 others | — | — | within ±1% | no |

**Conclusion (VERIFIED):** For 25/32 slots, spread/measurement choice barely moves weights (<1%). For 6–7 slots it moves materially (RB2, SAM, TE2, TE3, WR2, P, small QB). **Crucially, the slots that move most are exactly the nonlinear/threshold slots** — the ones where *any single secant is suspect*. So the material weight changes are a signal that the old 70→90 (and a naive secant) mis-measured those backup/package roles, not noise from picking ±5.

## 4) Recommendation (with evidence)

**Recommend ±5 as the default local-slope spread for the pool-grounded, per-position measurement — with explicit handling for nonlinear slots.** Evidence:
- **Stability:** 28/32 slots stable across ±3/±5/±7 (maxΔvs5 < 5%). ±5 is not meaningfully noisier than ±7 for stable slots.
- **Not too narrow:** ±3 produces 14 below-D rules (+2 vs 12) and is distorted by threshold artifacts on TE2/RB2 (s3 collapses to the sub-threshold flat region). ±3 is too narrow where the local window straddles a package/fielding threshold.
- **Not too wide:** ±10 converges toward the old wide-secant behavior on threshold/curvature slots (TE2/RB2/SAM/TE3 move toward `old_s` at ±10) — reintroducing the averaging-over-nonlinearity problem MUSE flagged. ±10 is the non-linearity diagnostic, not the default.
- **D invariance at ±5:** D conclusions (the four proposed + 12 below-D) match old and ±7/±10; ±5 changes no material D decision.
- **Pool-grounding matters more than the exact spread:** moving to per-position centers + position-avg others fixes the real biases (70 below pool mean, others@80 above Q3, K measured below its min). That’s the main win; ±5 is a sound local window on top of it.

**Required caveats / refinements (do not hide):**
1. **Treat TE2, RB2, SAM, WR2, TE3 as nonlinear.** Report the ±10 non-linearity check and the fine-grid shape; do not price them from a blind secant. For TE2/RB2/TE3 the “local at pool-average” sits in/near a threshold region — consider (a) measuring the slope on the *active* side of the threshold, (b) a piecewise/hinge fit, or (c) reporting a range [s5, s10] with rationale. This is where the spread question actually matters.
2. **DIME center is a proxy** (avg of CB/FS/SS) — **INFERRED**; dime is a 6th DB, composition varies. Low impact (stable, small slope) but flag it.
3. **W vs D:** keep D for flex deterrents (W is 0 for the proposed cross-role moves; VERIFIED). D is robust across spreads.
4. **VORP for the board (second number):** 25th-percentile replacement proxy (local slope × (pos avg − p25 gap)) gives broadly the same ranking as slope but reorders a few (OT1/SS/OG1 rise on larger replacement gap; K/P fall). Same story, useful emphasis — compute/report both; don’t replace slope for D/weights with VORP, but show VORP on the board. (VERIFIED ranking table produced.)

## 5) VORP (board variant) vs local slope

Top-level agreement is strong (QB, DE1, WR1, DT1 top tier both ways). Rank swaps driven by replacement gap: OT1 5th by slope → 2nd by VORP (LT p25 gap 8.0), SS 13→8 (gap 7.6), OG1 8→6; K 27→30, P 28→32 (small gaps). **Conclusion:** same story, different emphasis; report both. VORP is better for “draft value over what I can get cheap”; local slope is right for D and cross-position weight measurement.

## Innovation / ideas (standing encouragement)

- **IDEA (hinge/active-side slope for threshold slots):** for TE2/RB2/TE3/SAM, fit a hinge: slope = 0 below activation, linear above; report the active-side slope at the position’s realistic starter range. Avoids averaging in the dead zone.
- **IDEA (draft-relevant comparison points, not just pool mean):** measure marginal value at the OVR tiers drafters actually compare (e.g., 72 vs 77, 78 vs 83) using pool-grounded context — gives a “draft delta” alongside the local-at-mean slope. May differ for threshold slots.
- **IDEA (curve fit + derivative):** fit a smooth monotone curve (isotonic or spline) to a grid per slot in pool-grounded context, report derivative at center and at ±1sd; replaces secant-choice anxiety with an explicit local derivative + confidence band.
- **IDEA (center = median or “typical starter” not mean):** mean is fine here (close to median overall) but K/P are skewed high; consider median or the Nth starter by depth chart. Re-check centers when Owner’s frozen ratings land.
- **IDEA (linked to P-318):** re-evaluate WILL/C bump against the **new** pool-grounded ±5 measurement (and report hinge variant for any threshold behavior) — P-318’s effect size may read differently once 70→90/others@80 bias is removed.

## Repro / evidence

- Measurements run: `cd '/Users/kosi/Desktop/Football Sim/67-cakepanz' && node --experimental-strip-types slotwins-spread.mjs` (exit 0, JSON to `/tmp/slotwins-spread.json`) and inline node probes (all exit 0) — VERIFIED by command output in this session.
- Derived tables computed with Python from `/tmp/slotwins-spread.json` and `/tmp/flex.json` (VERIFIED).
- No files in `67-cakepanz`, product HTML, AGENTS/CLAUDE/PRIORITIES/STATUS/CHRONICLE/PROJECT-KNOWLEDGE, or protected constants were modified.

**Recommendation to Architect:** adopt **per-position pool-grounded local slope at ±5** as the default measurement (one shared function parameterized by slot→center), keep **±10 as the non-linearity diagnostic**, and add **hinge/active-side reporting for TE2/RB2/SAM/TE3/WR2**. Do not use ±3 (threshold distortion). Re-measure WILL/C (P-318) against this new baseline.
