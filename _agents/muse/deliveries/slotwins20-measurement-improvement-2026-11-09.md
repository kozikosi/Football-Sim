# Improving the slotWins20 measurement: a pool-grounded, per-position local slope

**Status:** proposal from the MUSE seat (advisor), 2026-11-09. The Owner asked: how do we improve 70→90 to best capture accurate value? Should we evaluate every position separately? Separately but in the same function? This note is the MUSE seat's answer. It is a RECOMMENDATION, not a build order — the Architect (Claude) decides the implementation, the council evaluates it (P-321).

## The problem with 70→90 (confirmed by the pool)

MUSE computed the pool average from `data/madden27-ratings.csv` (1,941 players). Overall mean 73.8, median 73, Q1 68, Q3 78, min 54, max 99. By position (mean OVR): QB 71.8, HB 76.0, WR 75.5, TE 70.5, LT 75.0, RT 73.0, LG 72.4, RG 73.6, C 71.4, DT 73.9, LEDG 75.0, REDG 74.7, MIKE 73.4, WILL 72.3, SAM 69.0, CB 75.0, FS 73.8, SS 74.6, FB 71.9, K 78.3, P 77.0, LS 68.1.

Three biases in 70→90:
1. **The baseline is below the pool average.** 70 < 73.8. The measurement starts below the average player.
2. **"Everything else at 80" is above the pool's 75th percentile** (Q3 = 78). The rest of the team is held at an above-average level.
3. **It is position-blind.** The same 70→90 is used for every position, but a 70 is a below-average QB (avg 71.8) and an average TE (avg 70.5), and there are NO kickers below 73 in the pool (min K = 73) — so measuring a K at 70 is measuring a player who does not exist. The 70→90 spread also runs from below-average to elite, and if the wins curve has diminishing returns, a single slope over that wide jump averages the steep part and the flat part together.

Lowest-to-99 (54→99) is not the fix: a 45-point spread over a non-linear curve gives one meaningless average slope, dominated by extremes the draft never compares (a 54 scrub, a 99 generational player).

## The proposal: per-position, pool-grounded, local slope, one function

**Yes, evaluate every position separately — but in the same function.** One shared function, parameterized by position, that reads the pool and computes each position's own center. The position-specificity comes from the DATA (each position's own average), not from 32 hardcoded ranges. This auto-updates when the pool changes (when the Owner generates his own ratings).

Concretely, for each slot:

1. **Per-position center.** Compute the position's pool average (mean OVR of players at that role in the current pool). This is the center for that position. QB centers at 71.8, TE at 70.5, K at 78.3, WILL at 72.3, and so on.

2. **Local slope, not a wide secant.** Measure slotWins at (center − 5) and (center + 5) — a 10-point spread centered on the position's own average — and take the slope as [slotWins(center+5) − slotWins(center−5)] / 10. This is the marginal value at the point that matters (the average player at that position), not an average over a wide range that crosses from below-average to elite. A 10-point spread is wide enough to be stable (not noise) but narrow enough to approximate the local derivative.

3. **Everything else at position-specific averages.** Instead of holding all other slots at a flat 80, hold each other slot at its own position's pool average. The measurement becomes "how much does this slot matter on an average team?" — the most representative context.

4. **One function.** A single `slotSlope(slot, pool)` (name the Architect's choice) that: (a) reads the pool, (b) computes the position's average, (c) measures slotWins at center±5 with everything else at their position averages, (d) returns the slope. Same function for all 32 slots. The function is the method; the pool is the data.

5. **Non-linearity check (diagnostic).** Also measure at center±10 and report whether the slope is stable. If the ±10 slope differs a lot from the ±5 slope, the curve is non-linear and the local slope is the right one to use. Report this, do not hide it.

## A second number worth computing: value over replacement (for the board)

For the draft board specifically, the most football-meaningful number may be value over replacement (VORP): slotWins(average starter at that position) − slotWins(best available replacement). This is what a drafter actually cares about — how much better than the guy I could get for free? The local slope (above) is what D and the measured weights need (they compare slopes across positions). VORP is a second number, for the board. The council/Architect should compute both and report whether they tell the same story. If they disagree, say so — do not paper over it.

## What the evaluation (P-321) must report

1. Implement the proposed measurement (or a refinement — say what changed and why).
2. Report, side by side, for every slot: the OLD slotWins20 (70→90, everything else at 80) and the NEW slope (per-position center±5, everything else at position averages). Which slots moved most, and why?
3. Report how D changes under the new slopes (the four proposed rules and the 12 below-D rules from thetaprice), and how the measured weights change.
4. Report the non-linearity check (±10 vs ±5).
5. Report the VORP variant for the board, and whether it agrees with the local slope.
6. Recommendation: adopt the new measurement, refine it, or keep 70→90 — with the numbers as evidence. The Architect decides.

## Link to P-318 (the WILL/C bump)

P-318 directs the WILL/C bump into the engine math so slotWins20 for WILL and C goes up. If the measurement baseline changes under P-321, the WILL/C bump must be evaluated against the NEW measurement, not just the old 70→90. The two tracks are linked: P-318 changes what the engine values; P-321 changes how we measure it. Report both against the same (new) baseline once P-321 lands.
