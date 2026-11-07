# Discrepancy register (engine vs NFL) — VL, 2026-11-07
// Engine-vs-NFL disagreements with suspected cause and status. VL labels: VERIFIED (ran in this tree) / REPORTED (Beam) / INFERRED / UNKNOWN.

| # | Discrepancy | Suspected cause | Status | Evidence |
|---|-------------|-----------------|--------|----------|
| D-001 | TE underweighted by volume (11.9% snaps / 20.6% skill EPA vs 7.7% weight) | fit target = old personal table (secondary-heavy) | REPORTED | Beam M4/M5; VL did not re-run |
| D-002 | LB underweighted (26.7% snaps vs 13.6% weight) | same | REPORTED | Beam M4; VL did not re-run |
| D-003 | DL overweighted (29.1% snaps vs 45.1% weight) | same | REPORTED | Beam M4; VL did not re-run |
| D-004 | RB per-game slope far too high vs engine (engine over-credits RB) | model credits RB per-touch value, not per-game | REPORTED | Beam M5 by-OVR (real 0.003 vs engine 0.247) |
| D-005 | QB per-game slope matches engine | — | REPORTED | Beam M5 by-OVR (0.267 real vs engine) |
| D-006 | Defense OVR not testable (no defense EPA in nflverse data) | data gap | UNKNOWN | T1 mechanics validation harness would close this |
| D-007 | WR1 revealed +216 vs table on Colors (OR audit) | different engine/specs fit (Colors track) | REPORTED | OR P-284 audit; VL did not re-run |
| D-008 | modelWeights() inherits Owner's old personal-table bias via fitted RATING_SPECS/MC | lab-28-Oct fit target = old personal table | INFERRED | VL bias audit (fitlm.js + design.json + specs.ts read in-tree); Owner ruling Ruling 1 |
