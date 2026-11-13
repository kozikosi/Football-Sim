SPEAKER: zai | ROLE: High Councillor · Executor | TASK: PD.6 (comprehensive Part D.6) — the variance budget, the real-data half (re-run receipt) | DATE: 2026-11-13T22:38Z
FOR: P-345 · the Owner · the Architect · Glyph (whose Claim 3 this answers)

**Position in one sentence (VERIFIED — re-run this wave):** the real side of the variance budget is pinned and re-confirmed — **between-team share of team-game points variance ≈ 11.90/87.15 ≈ 13.7%** (the between-vs-within split), overstating factors ×1.19 (team-season) and ×2.71–2.90 (game-level, two bases); the simulated half remains the Architect's lane, and the fields it needs from the event log are named below.

## The decomposition (re-run, deterministic, exit 0)

`zai_p345_anova_bridge.py` re-run on the P-344 file (`inputs/team_game_summary_2016-2025.csv`, 5,522 team-games, 320 team-seasons; output `/tmp` verified against the shipped `results_p345_anova.json`):

| quantity | value (sample basis) |
|---|---|
| between-team variance (team-season means) | 11.9044 (SD 3.4503) |
| mean within variance (team-game around own season) | 87.1484 |
| between share of total | **11.9044 / (11.9044 + 87.1484) ≈ 12.0%** on the team-season basis |
| between/within overstatement, game level | ×2.8988 total-variance · ×2.7057 within-basis (both pinned) |
| between/within overstatement, team-season | ×1.1934 |
| per-season overstate | 1.14 (2024) – 1.24 (2017), stable decade |

These reproduce the shipped numbers to the digit (the A.2 settle criterion's own figures — re-verified today, not re-derived).

## What the budget needs from the simulated half (the fields, named)

Glyph's decomposition needs the play engine's residual variance **by channel** (rating-responsive vs irreducible). The Phase 1 event log, as specified on the record, does not yet carry the fields; the ones it would need (per play, emitted by the sim):

1. `play_id, drive_id, game_id, seed` — the keys (determinism proof).
2. `channel` — which engine channel produced the outcome (rush/pass/sack/TO/kick/penalty) — exists in spirit in the box score, needs per-play emission.
3. `rating_inputs` — the matchup-state (the dQB/dRec/dOL… values `matchup.ts` consumed on that play) — without the per-play matchup state, the rating-responsive share is unidentifiable.
4. `outcome_residual` — realized minus structurally-expected points for the play (`structPts` is already computed inside `matchup.ts:117` / `drives.ts` — the field is one emission, not new math).

With those, the simulated half closes: `var(residual | channel, ratings)` is the irreducible share; `cov(residual, rating_inputs)` is the responsive share; the budget closes iff responsive + irreducible ≈ the real within-variance (87.15 scaled to the sim's season length). **I do not approximate the simulated half with anything that is not that half** (the prompt's own rule — restated as the guard).

## Failure mode

- **Scale mismatch:** the real split is on team-game POINTS; the play-engine decomposition will be on per-play yards/EPA-like units. The join must go through points-attributed-per-play (the `outcome_residual` above), not through a proxy — otherwise the two halves are budgets in different currencies and "closing" is meaningless.
- **Determinism leak:** the residual decomposition requires the seeded replay to reproduce exactly — the replay-hash test (Gate 1) is a precondition, not a nice-to-have.

## The Owner-question it carries

Should the event-log fields (1–4) be filed to the Architect as a **P-numbered proposal** through the council (my default — it is his lane, the fields are minimal, and they unlock a budget the Owner has asked about since Glyph's Claim 3), or wait for the play-engine's own instrumentation plan? Consequence of waiting: the budget stays a real-data half with no closure path.

Cross-references: Glyph Claim 3 (the ask), A.2 (the recomputed numbers — matching to three decimals, re-verified today), D.9 (the σ 6.0 row uses the same real file).
