# Pre-registration: is the engine biased? — 2026-11-07 (Beam)

Committed before any result is looked at. Metrics, thresholds and decision rules are fixed here; results go in a separate file appended later. No product file touched.

## 1. Priors (Owner writes these before seeing results)

Owner ranks position groups by importance (1 = most important). Engine ranking = group's share of total slot weight (colors SLOTS). A mismatch of >= 2 ranks on any group is reported, not silently resolved.

## 2. Metrics

M1 — Group share of total slot weight. Secondary, DL, OL, skill, LB, specialists. Reported as % of total weight. Flag if secondary > 25% OR secondary share > 2x QB share.

M2 — Measured vs. target correlation. Pearson r between slotWinsPerOvr() (26 slots) and the Owner's target weights (colors SLOTS). Flag if r < 0.85 (expected high because fitted) OR any slot sign-flip in rank (a slot whose measured value ranks more than 5 places away from its weight rank).

M3 — Sensitivity across anchors. Fit/compare slot values under four anchors: (a) Owner 2026 table, (b) REV 5 table, (c) salary-only (Owner's 6 Nov M-values), (d) data-only fit from real data. A slot is "anchor-dependent" if its rank moves >= 3 places across anchors. Flag if >= 5 slots are anchor-dependent.

M4 — Real-data volume check (needs external data). For each position group, compare real NFL (a) snap share, (b) target share, (c) EPA-per-play by OVR bucket, to the engine's implied volume (RATING_SPECS weights x personnel package shares). Flag if a group's real snap/target share differs from the engine's implied share by > 5 percentage points.

M5 — Real-data efficiency check. For each slot, compare real wins-added per +1 OVR (from play-by-play, e.g. EPA-based WAR) to slotWinsPerOvr(). Flag if correlation r < 0.7 across the 26 slots.

M6 — Star-placement check (already partly measured). Count 85+ OVR players the engine flexes off their natural position into a heavier slot. Flag if > 0 promotions to WR1/DE1/OT1 under a -10 flex cap (current tuned table reaches 0 promotions on tuned seeds but 15 on fresh seeds).

## 3. Thresholds / decision rules

- Bias "detected" if ANY of M1, M3, M4, M5, M6 flags.
- On detection: do NOT change constants silently. File an inbox proposal listing which parameters to re-fit and the proposed new values, with receipts. Architect decides.
- On no detection: record "no bias detected on these metrics" with the numbers; re-run when real data is added (M4/M5).

## 4. Evidence standard

Every number in the results file must carry a command and its output (VERIFIED) or a named data source (REPORTED). "I believe" is not a result. Real-data claims must name file + row. Tests run by a seat that authored none of the fitted code (Verifier).

## 5. What real data is needed (ask Owner)

To run M4/M5 I need one of:
- Play-by-play with player OVR and slot (2022-2025, ~17 games x 32 teams) — ideal.
- Season aggregates by position: snaps, targets, receptions, yards, TD, EPA, by player, with OVR — acceptable.
- Salary-cap hit by position group by team (already have salary anchor) — for M1 sanity only.

Also needed: one held-out season kept out of any fit, so the data-only fit can be tested for prediction.

Which of these can you provide, in what format, and for which seasons?

## 6. Run log (appended 2026-11-07)

M4 and partial M5 executed against nflverse 2023/2024 data. Results: `_agents/beam/notes/bias-results-2026-11-07.md`. Verdict summary: secondary not biased by volume; TE and LB underweighted vs snaps/EPA; DL overweighted vs snaps; QB justified by EPA. M1 passes. M3, M5 by-OVR, M6 full re-run, defense EPA remain open.
