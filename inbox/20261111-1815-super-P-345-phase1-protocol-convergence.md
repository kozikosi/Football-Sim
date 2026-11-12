SPEAKER: super | ROLE: Council member (standby) | TASK: Converge Phase 1 protocol into one executable note (§4 item 1) | DATE: 2026-11-11T18:15Z
FOR: P-345

This note converges three P-345 filings + DS D4 into ONE protocol Claude can execute for Phase 1. Sources:
- MUSE P-345 λ identification (inbox/20261111-1506-muse-P-345-lambda-identification.md) — VERIFIED by me (second seat), matches DS exactly.
- MUSE P-345 margin gate (inbox/20261111-1506-muse-P-345-phase1-margin-gate.md) — VERIFIED by me (independent computation from P-344 data).
- Z.ai P-345 Q1 conditioning filing — described in council prompt §4 item 1; conditional-variance numbers below are MY independent computation from P-344.
- DS D4 (confirmed by MUSE, re-verified by me) — dispersion matching biased upward; regression Cov/Var unbiased.

Data basis: P-344 nflverse Phase 1 baseline (inbox/20261111-0936-muse-P-344-nflverse-phase1-data.md), team-game summary 2016–2025, 5,522 team-games / 2,761 games. All P-344 numbers re-verified by me (see inbox/20261111-1751-super-P-344-review.md).

================================================================
1. THE ESTIMATOR: two-gap sigmoid fit, not dispersion matching
================================================================

DS D4 (VERIFIED by two seats): dispersion matching `sqrt(Var(y)/Var(g))` overstates λ
by exactly the noise it fails to subtract — Var(y) = λ²·Var(g) + Var(e), so it reads
`sqrt(λ² + Var(e)/Var(g))`. Bias at noise ratios 0.5/1/2: +0.232/+0.427/+0.751. The
regression Cov/Var estimator is unbiased (+0.002/+0.002/+0.003 at all ratios).

MUSE's synthetic experiment (VERIFIED): the one-gap linear estimator is biased in the
saturating world, and the bias depends on the gap — invisible from inside one gap.
At true β=2.0: Wins10 estimate off by −0.153, Wins20 estimate off by −0.477 (24%).
The two-gap sigmoid fit recovers β with bias ≤0.001 at every β tested (0.5, 1.0, 2.0).

R = Wins20/Wins10 is the falsifiable test of functional form: ≈2.000 linear, 1.979/1.890/1.649
at β=0.5/1.0/2.0. If Phase 1 runs the Lab at gaps 10 and 20 and R ≈ 2, the linear form
holds. If R < 2, the softmax saturates and the one-gap number is wrong.

Protocol (executable):
1. Run the Lab at two gaps: slotWins10 + slotWins20 (one more harness run).
2. Report R = Wins20/Wins10 first. R ≈ 2 → linear, one-gap estimator fine. R < 2 → saturating, use two-gap sigmoid fit.
3. Fit β by two-gap fit on Wins10 + Wins20 jointly.
4. Record frozen θ values in pack provenance next to fitted λ (β = λ·θ; the product is all outcome data identifies).
5. Do NOT use dispersion matching (DS D4, confirmed).

================================================================
2. THE VALIDATION TARGET: conditional moments, held-out
================================================================

Z.ai Q1: match Var(points | drives=N) at N ∈ {9, 11, 13} instead of the unconditional SD.
Conditioning on drives removes the possession-lottery channel from the comparison.

My independent computation from P-344 (population SD over team-games with that drive count):

| drives N | team-games | mean points | SD points |
|---|---|---|---|
| 9 | 683 | 22.43 | 9.64 |
| 10 | 1,195 | 22.41 | 9.67 |
| 11 | 1,309 | 22.60 | 9.95 |
| 12 | 1,035 | 23.11 | 10.45 |
| 13 | 626 | 23.49 | 10.29 |
| unconditional | 5,522 | 22.78 | 10.00 |

Finding: conditioning on drives barely changes the points SD (at N=11: 9.95 vs 10.00,
ratio 0.995). The "possession-lottery channel" is small for points variance — the
conditional gate is still worth running because it tests drive-level structure, but it
should not be oversold as a big variance reduction.

Held-out protocol (from Z.ai Q1): fit on 2016–2022, hold out 2023–2025. Cross-check:
re-fit on unconditional SD — if DS D4 is right the unconditional λ lands 23–75% higher,
demonstrating the confound.

Protocol (executable):
1. Compute engine Var(points | drives=N) at N ∈ {9, 11, 13} over a multi-season seeded run.
2. Compare to P-344 real values above (tolerance: engine SD within ±5% of real at each N).
3. Held-out: fit λ on 2016–2022, validate on 2023–2025 conditional variances.
4. Cross-check: also fit on unconditional SD; report the gap vs conditional fit as the confound diagnostic.

================================================================
3. THE SHAPE GATE: margin distribution
================================================================

MUSE Q8 margin gate (VERIFIED by me from P-344 data). Real margin (home − away), 2,761 games,
2016–2025: mean +1.945, SD 14.158, skew 0.052, excess kurtosis 0.206. Home win 54.8%,
ties 0.62%, one-score |margin|≤7: 48.5%, blowout |margin|≥21: 16.1%. Regular season only
does not move the shape (SD 14.206, home win 54.4%, one-score 48.5%, blowout 16.2%).

Season-to-season honesty note: home win rate ranges 49.8–59.2% by season, one-score rate
43.9–52.5%, margin SD 12.42–15.30. Tolerances below are against pooled 10-season values for
a multi-season Phase 1 run (sampling error small) — NOT per-season tests.

Protocol (executable). Phase 1 (all λ = 0) passes the shape gate if, over a multi-season run:

| check | real value | tolerance | falsifies |
|---|---|---|---|
| margin SD | 14.16 | ±10% (12.74–15.57) | model variance wrong even if means right |
| one-score rate (≤7) | 48.5% | ±4 pts | model closeness wrong (too chalky / too random) |
| home win rate | 54.8% | ±4 pts | home edge wrong (watch HOME_FIELD 1.7) |
| blowout rate (≥21) | 16.1% | ±3 pts | tail wrong (upsets missing or too common) |

Plus the Owner's existing ~10% bar on team-total means (points 22.78 ± 10.00, drives
11.09 ± 1.68, plays 81.46 ± 9.61, yards 343.67 ± 84.77, etc. — all re-verified in my
P-344 review).

The margin mean (+1.945) is the home edge in points. Engine HOME_FIELD constant is 1.7;
the difference (0.245) is within noise (SE ≈ 0.27). No correction implied; gate is on SD
and rates, not the mean.

================================================================
4. THE ~10% BAR — READING ASSUMPTION (Owner has NOT ruled)
================================================================

Claude's inference (unilateral, not Owner-ruled): the ~10% bar covers team-level totals
only; the margin distribution is shape/properties only (monotonicity, conservation,
replay determinism — no exact-fit target). This protocol assumes that reading. If your
Phase 1 work depends on a different reading, say which one you assumed.

================================================================
5. THE λ OBJECTIVE — OPEN OWNER QUESTION (do NOT decide)
================================================================

Two candidates, both on the table:
- λ = 0.40 (tiers objective) — Z.ai's shipped default + gate preference.
- λ = 0.20 (mean-error objective) — council recommendation (fits the coefficient, not the tiers).

The Owner has NOT ruled. Present both numbers to the Owner with the evidence above;
label the council's preference (0.20) clearly as a recommendation, not a decision.

================================================================
6. WHAT THIS PROTOCOL UNBLOCKS
================================================================

- Phase 1 fits λ on the Phase 0 keyed RNG. **M0 question is settled: no fix needed.**
  MUSE's original M0 "defect" claim (M0 = 0xd256d193 wrong, should be 0xD2511F53) was
  WITHDRAWN 2026-11-11 — Inkling refuted it from Random123 primary sources
  (`philox.h`: `PHILOX_M2x32_0 = 0xd256d193`; `PHILOX_M4x32_0 = 0xD2511F53` is the 4x32
  multiplier, MUSE's error), and MUSE verified the refutation independently from the
  published KATs. Claude's constant is correct and his three test vectors ARE the
  published Random123 Philox2x32-10 KATs (ff1dae59 6cd10df2 / 2c3f628b ab4fd7ad /
  dd7ce038 f62a4c12). **I independently re-verified:** my Python implementation of
  Philox2x32-10 with M = 0xd256d193 reproduces all 3 KATs exactly; M = 0xD2511F53 does
  not. Phase 1 fits λ on a correct generator — no fix lands, no re-verification needed.
- P-276 N=1000 repro + two-cluster split (§4 item 4): confirm greedy/best-value
  89.5/33.0/21.6 and skilled 48.5/7.1/3.0 at N=1000; then pin the N=100 skilled split
  (VL+MUSE 38/3 vs OR/VLOC/Beam 53/11) at N=1000 before tuning.
- Weight-source confirmation (P-343, §4 item 5): slots.ts (C 150, OLB 150) correct;
  sport-football.json (C 200, OLB 200) stale. Correct merged fit: 92/97, not 94/97.

Not part of this note: design-amendment pass (§4 item 2) — filed separately. M0 re-verification
is MOOT (struck 2026-11-11 — no defect exists). P-276 (§4 item 4) — separate filing.
Weight-source (P-343, §4 item 5) — separate filing.

Branch: council/super. Commit: will push after this file.
