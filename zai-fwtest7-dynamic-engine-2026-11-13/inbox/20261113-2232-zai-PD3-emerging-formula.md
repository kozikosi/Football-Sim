SPEAKER: zai | ROLE: High Councillor · Executor | TASK: PD.3 (comprehensive Part D.3) — what does a formula that *emerges* look like? | DATE: 2026-11-13T22:32Z
FOR: P-345 · the Owner

**Position in one sentence (INFERRED, with one VERIFIED structural fact):** the merged form has exactly **one step that is still a fit to the Owner's table rather than an emergence from data — the scoring step itself** (the tier comparison that *scores* every fit against `flex-99-live.json`); everything upstream of it is already measured data (exposure, E tables, slot values) — so emergence means **changing what the formula is scored BY, not what it is made of**.

## The audit, step by step

1. **Ability layer** — emerges (marginal value from the sim's own outcome machinery, not from the table).
2. **Exposure guard** — emerges (measured Snap/position usage; the P-346 real-data runs).
3. **V3 per-slot min-collapse** — emerges (the per-slot anchor list is measured slot values — WR1 1.607 / DT1 1.316 are the sim's own localWins outputs, not Owner rows).
4. **The E tables** — measured per-season (the C1 receipt), not mirrored.
5. **The scoring/fit step** — **the mirror.** Every LOO, every mae, every "97/97" is scored against `flex-99-live.json` — the Owner's table IS the target. That is fine for calibration discipline (the Owner's table is the guide, "not a target, not a mirror" in the level sense — but it is the *ruler* for ordering), and the honest statement is: the model cannot stop being scored against the table without losing the Owner's own acceptance language. Emergence therefore has a precise, achievable meaning: **the reference column changes role from TARGET to COMPARISON.**

## What would change (the emergence-report shape — B.2's proposal applied to the whole table set)

- Fit tables report the model's own output as primary, with the Owner's integers as a *reference column* (the 11-row table in this delivery is the worked example) — the fit reports as they exist today are retired to an appendix, not deleted (the council's rulers stay comparable across rounds).
- New acceptance language: "held-out ordering loss + exact-tier preservation" (ordering metrics, never level-matching) — which is also the fluctuating-dial's gate, so ONE acceptance language serves both programs.
- The destination of the derivation, stated plainly: if the model's emerged ordering disagrees with the Owner's table somewhere, the emergence report SHOWS that disagreement in the reference column with the measured basis beside it — the Owner sees his table's role honestly: guide, not grader.

## Receipt

- The worked example ships (the 11-row emergence table, `deliveries/partb-emerge-spec/`); the acceptance-language change is one paragraph per table set, not new machinery.
- The one structural fact (VERIFIED): the scoring step's target is the Owner's table — a grep of the shipped scripts shows every fit/score call reads `flex-99-live.json` or its derived pairs97. Nothing else in the pipeline reads the table.

## Failure mode

- **Emergence as excuse:** "the model disagrees, therefore emergence" — no. The gate stays: held-out ordering loss must IMPROVE to move anything; disagreement without a measured basis is just error, reported as error.
- **Reference-column drift:** if the emergence report quietly drops the Owner's column, the Owner loses his guide. Guard: the column is mandatory in the shape; its position (reference, not target) is the only change.

## The Owner-question it carries

Do you want the fit tables **re-cut to the emergence-report shape in the next wave** (all of them, with the old fit reports as appendices) or keep the current shape until the fluctuating-dial program lands its first result? My default: re-cut now — it is pure presentation of numbers already computed, and it makes every later dial decision readable in the new language from day one.

Cross-references: B.2 (the worked example), PD.1 (one acceptance language), the comprehensive prompt §0 "emerge, don't mirror" verbatim.
