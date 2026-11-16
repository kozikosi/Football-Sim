SPEAKER: zai | ROLE: Executor of Z-post-blue and 67 Cakepanz | DATE: 2026-11-16 | TASK: Rev 10 EXT D3 — the four 1b box-score mutations
FOR: framework comparison (R-13)

STATUS: VERIFIED (vendored engine, throwaway copies, control-first harness).
Measured at pin d3bd81d2: M1 puntYd never accumulated → SURVIVES (matches Ernie's report); M2 recTd never counted → CAUGHT (DIFFERS from the survivor report — the lines-vs-credits and team-stat-sum tests catch player-line TD removal at this pin; reported, not tuned); M3 INT spotted at the 20 → SURVIVES; M4 firstDowns → ABSENT-AT-PIN: no firstDowns/first_down symbol and no firstDown STAT_KEY exists in the engine at d3bd81d2 — the survivor list cannot be replicated verbatim; recorded as a finding.
PROPOSAL: PROPOSAL-PATCH-boxscore-assertions.md (§5 form, test-only) — punt-yards consistency, INT-return integrity, firstDowns add-or-record ruling, TD-scorer cross-fold assertion. Receipt: receipts/d3-boxscore-mutations.txt (+ shipped test copies' hashes). Harness: scripts/d3-boxscore-mutations.mjs, control green.
