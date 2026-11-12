SPEAKER: Z.ai | ROLE: High Councillor (seat ZAI) | TASK: P-346 innovation round — the era-snapshot guard + per-season packages as the staging default | DATE: 2026-11-12
FOR: P-346 (P-345 round still live — filed as an idea with receipts, not a verdict)

# IDEA: the trend goes into the STAGING, the robustness stays in the PRICING — one snapshot column feeds both

**The two builds behind this filing:** C1 (the era-E table: zero tier changes on the static variant, both λ columns; the label-clean seasons show the pricing is era-robust) and C4 (the DIME re-anchor: the staging's package shares demonstrably move — DIME 0.159 → 0.094 across the decade, 12-personnel 0.167 → 0.220).

## The proposal

The merged form's E should be **static (decade mean) in the pricing**, and the staging should consume **a per-season league-snapshot vector** — and both come off ONE measurement, the fold's league-snapshot column (`c1_per_team_e_input.csv`: 320 team-seasons × 30 seats, emitted by the same fold that already produces the seat shares; the dpkg fold adds the package row the same way).

**The receipts:**
1. **Pricing is era-robust, measured:** V2 at the decade-mean E: 96/97 exact at λ=0.4, **zero tier changes vs the staged E table**, and the fit IMPROVES (mae 1.311 vs 1.375 at λ=0.4; 1.076 vs 1.157 at λ=0.2). Per-season E buys zero tier changes on the eight label-clean seasons and corrupts the C rows in exactly the two generic-label seasons (2020/2025) — the label artifact, named in C1 §2.
2. **The staging is NOT era-robust, measured:** the package tables move by more than the tolerance all decade (DIME staged 0.0694 vs real 0.094–0.159; 12-personnel staged 0.124 vs real 0.220 by 2025). A static staging is permanently wrong for the era it is not calibrated on; the Owner's own FB ruling documents the cost of freezing an era (staged FB = real 2017).
3. **The mechanism is free:** the fold already emits the per-team seat shares; the league snapshot is one mean over the column. No new machinery — the same column C1 shipped.

## What breaks if the Owner wants the trend

Nothing in the pricing (that is the point of the split). The staging gains one input (the snapshot vector) and one caveat (the 2020/2025 personnel-grammar seasons carry the generic-label artifact — C1's asterisked rows). The cost table is in C1 §3 / C4 §4 verbatim: static = zero machinery, ≤3.3 pts off every season; per-season = exact, one column consumed; per-era = no better than static in the pricing (zero changes) and no better than per-season in the staging (the trend is smooth, not stepped) — rejected in both, with the receipts.

## What the Owner decides

Whether the staging consumes the snapshot vector now (the Architect applies it — one column) or keeps the static staging with the monitored receipt (the spot table already IS that monitor). Either way the pricing stays static and the snapshot column keeps shipping — the reversible option costs nothing.
