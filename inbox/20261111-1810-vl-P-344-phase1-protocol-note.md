SPEAKER: vl | ROLE: Council Advisor | TASK: Phase 1 measurement protocol (converged) | DATE: 2026-11-11T18:10:00Z
FOR: P-344 (Phase 1 baseline data); references P-342 (engine Phase 1), P-345 (innovation round Q8/Q1)

# Phase 1 measurement protocol — converged note

**Purpose.** One place that states how Phase 1 (all λ = 0, per the Owner's 11 Nov approval and Claude's design `a0ddc584`) is measured and gated, so Claude starts on settled ground instead of on five separate filings (P-344 data, MUSE λ-identification, MUSE margin gate, VL λ non-identifiability, Z.ai conditional-moment gate). This note converges those into one protocol: the data source, the gates, the tolerances, and what λ is allowed to be.

**Status of the inputs (all verified this session).**
- P-344 nflverse data 2016–2025 delivered and numerically verified by vl (recomputed every mean and SD from `team_game_summary_2016-2025.csv`; means match to 4 dp, SDs match under sample-SD ddof=1, row count 5,522 team-games, nopenalty points identical to the full table, ~6.2 plays/team-game removed). See `inbox/20261111-1743-vl-P-344-review.md`.
- P-344 is the *only* data Phase 1 may be measured against. The raw 225 MB parquet is staged on the MUSE VM (`c7540b04`); the summary CSVs ship with the delivery and are what the Architect consumes first.
- λ is *not* identified from OVR-only data (vl's non-identifiability proof, `inbox/20261111-1503-vl-P-345-lambda-identification.md`, `node tools/mathlab/lambda-ident.mjs`): four (λ, θ) pairs give identical β and identical predicted spread (0.0026 of 100). λ stays an Owner-visible dial; it is validated only by held-out totals-bar / margin-shape predictions, never presented as an identified estimate.

## The Phase 1 gate (the protocol)

Phase 1 passes when, over a multi-season run on the P-344 data, the engine matches the pooled real values below. These are the falsifiable predictions; none is a fit target.

| # | Check | Real value (P-344, pooled 2016–2025) | Tolerance | What it falsifies |
|---|---|---|---|---|
| 1 | Team-total means (~10% bar, Owner) | points 22.78, drives 11.09, plays 81.46, off_plays 62.44, pass_att 36.66, rush_att 26.70, yards 343.67, sacks 2.38, giveaways 1.30, TOP 1815.6 s | ±10% per metric (league mean) | the engine's level is off (totals, pacing, turnover rate) |
| 2 | Margin SD (MUSE P-345 Q8) | 14.16 | ±10% → [12.74, 15.57] | per-play variance mis-scaled; λ wrong in the direction the two-gap fit catches |
| 3 | One-score rate \|margin\| ≤ 7 (MUSE P-345 Q8) | 48.5% | ±4 pts → [44.5%, 52.5%] | closeness wrong; favourites win too easily or nobody holds a lead |
| 4 | Home win rate (MUSE P-345 Q8) | 54.8% | ±4 pts → [50.8%, 58.8%] | HOME_FIELD (engine 1.7 vs real 1.945 margin mean) mis-set |
| 5 | Blowout rate \|margin\| ≥ 21 (MUSE P-345 Q8) | 16.1% | ±3 pts → [13.1%, 19.1%] | tail wrong; upsets don't happen or happen too often |
| 6 | Conditional SD Var(points \| drives=N) (Z.ai P-345 Q1) | 2023 REG: N=10 → 8.28 (n=117); N=11 → 7.64 (n=136) | held-out 2024–2025 buckets within ~10% | λ mis-specified relative to θ; dispersion matching inflates λ 23–75% (DS D4) |

**Tolerance notes.** Rates vary ±4 pts across real seasons (home win 49.8–59.2%), so tolerances are set against the *pooled* 10-season values for a multi-season Phase 1 run — not as a per-season test. A gate tighter than ±4 pts on the rates would fail real seasons.

**Data caveats the protocol must carry.**
- Participation coverage drops 7.0–7.4% in 2023–2025 (NGS-era plays without tracking); Phase 2 snap/participation validation must allow ~7% missing participation there.
- `snap_counts` lacks `season_type` in all 10 seasons; derive it by joining `game_id` to pbp (or week ≤18 pre-2021 / ≤17 from 2021).
- pbp `two_point_result` = nflverse `two_point_conv_result`; punt return yards live in `return_yards`.
- SDs are sample (ddof=1), n = team-games. State this plainly so a recomputation with population SD doesn't look like drift.

**What Phase 1 does NOT gate.** Margin distribution goodness-of-fit moves to Phase 2 (DS D2 + GLM F2: the margin-PMF gate cannot pass at λ = 0). The historical Madden-rating join that would identify λ is out of scope per the Owner's design-13d ("none, and not needed").

**Decision requested.** The Owner/Architect adopt this as the single Phase 1 gate; the six checks above replace the scattered Q8 margin gate, Q1 conditional-moment filing, and the ~10% bar as separate items. λ remains a dial with the held-out conditional-SD test as its only validation.

## Evidence label
VERIFIED (P-344 recomputation, local Python/pandas) · REPORTED (MUSE margin gate, Z.ai conditional gate, DS D2/D3/D4, GLM F2 from council record) · INFERRED (tolerance rationale, λ-as-dial recommendation)
