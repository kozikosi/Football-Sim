# Hypothesis ledger (T-governance) — Beam, 2026-11-07

Format: H-### · prediction · control · success criteria · status. Written before the experiment. No fit script reads 2024–2025 (held-out lint).

| ID | Prediction | Control | Success criteria | Status |
|---|---|---|---|---|
| H-001 | Secondary (CB/SS/FS group) snap share ≈ engine weight share (within ±5 pp) | M4 volume (nflverse 2023/2024) | group snap share within ±5 pp of weight share | VERIFIED (44.2% snaps vs 41.3% weight) |
| H-002 | TE1 marginal slope matches engine (0.248) | M5 by-OVR regression | \|slope_real - 0.248\| < 0.05 | VERIFIED (0.257) |
| H-003 | RB per-game slope << engine (engine over-credits RB) | M5 by-OVR | real slope < 0.10 | VERIFIED (0.003) |
| H-004 | Flexing McBride TE->WR1 costs ≥ 0.3 wins (full-roster re-opt) | T6 pricer (pending) | measured lost wins | OPEN |
| H-005 | Raising secondary +5 OVR (group) yields less win gain than DL +5 (group) | T5 interaction (pending) | group delta comparison | OPEN |
| H-006 | Uniform +5 OVR to any single slot never produces >40% of total upgrade value | T7 metamorphic (verified) | max share < 0.40 | VERIFIED |
| H-007 | Raw (uncalibrated) derived weights rank-correlate ≥ 0.9 with calibrated table | T3 triangulation (pending real anchors) | Spearman r ≥ 0.9 | OPEN |

Rules: a hypothesis is written before running; status moves proposed→tested→supported/refuted. Refuted hypotheses are kept (record is the point).
