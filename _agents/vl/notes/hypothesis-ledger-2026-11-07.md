# Hypothesis ledger (T-governance) — VL, 2026-11-07
// Format: H-### · prediction · control · success criteria · status. Written before the experiment. No fit script reads 2024–2025 (held-out lint).
// Evidence labels: VERIFIED (ran in this tree) / REPORTED (from another seat, not reproduced) / INFERRED (reasoned) / UNKNOWN (not checked).

| ID | Prediction | Control | Success criteria | Status |
|----|------------|---------|------------------|--------|
| H-001 | Quantisation contract holds on Pre-Colors: modelWeights() == monotone quantisation of slotWinsPerOvr() (700 scale, nearest 5, floor 5, |error| <= 2.5, no rank inversions) | T3 raw-curve-witness on Football-Sim-PreColors.html | max |quantError700| <= 2.5 AND outOfContract == 0 | VERIFIED (raw-curve-witness: maxQuantError700 = 0, outOfContract = 0, n=32, page errors 0) |
| H-002 | Raw measured span rank-correlates with calibrated table (r >= 0.9) | T3 triangulation | Spearman r >= 0.9 | VERIFIED (triangulation: raw<->calibrated Spearman r = 0.995, n=32) |
| H-003 | Engine replacement baseline is flat 80 OVR everywhere (no position-specific replacement) | T4 replacement-level-audit | DL5 VERIFIED at 0.33 share; all depth slots UNKNOWN | VERIFIED (flat-80 baseline documented; DL5 measured 32.8% snaps stable 2023-25; CB3/NICKEL/DIME/SAM/FB/WR4 UNKNOWN) |
| H-004 | Secondary is not biased by volume (snap share ≈ weight share within ±5 pp) | M4 volume (nflverse 2023/24, Beam) | secondary snap share within ±5 pp of weight share | VERIFIED by Beam (44.2% snaps vs 41.3% weight, gap -2.9 pp); VL did not re-run (REPORTED) |
| H-005 | RB per-game slope << engine slope (engine over-credits RB marginal value) | M5 by-OVR (Beam) | real slope < 0.10 vs engine 0.247 | VERIFIED by Beam (RB real 0.003 vs engine 0.247); VL did not re-run (REPORTED) |
| H-006 | TE per-game slope matches engine (~0.248) | M5 by-OVR (Beam) | |real - 0.248| < 0.05 | VERIFIED by Beam (0.257); VL did not re-run (REPORTED) |
| H-007 | Raw vs calibrated weight agreement (spread small; no disagreement flags) | T3 triangulation | disagreement flags == 0 on numeric anchors | VERIFIED (0 disagreement flags; but volume/EPA/AV/salary anchors UNKNOWN) |
| H-008 | DL5 replacement share 0.33 stable across seasons | dl5-snaps.py | rank-5 mean within 32-34% each season 2023/24/25 | VERIFIED (32.3%/33.8%/32.3%, n=544 each) |

Rules: a hypothesis is written before running; status moves proposed→tested→supported/refuted. Refuted hypotheses are kept (the record is the point). Real-data claims (H-004..H-006) were run by Beam on council/beam; VL labels them REPORTED, not re-verified.
