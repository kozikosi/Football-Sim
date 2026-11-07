# Hypothesis ledger H-001 (VLOC, 2026-11-07)

Written BEFORE any experiment result is examined, per the beam pre-registration protocol and Z.ai synthesis governance (hypothesis ledger: H-###, prediction, control, success criteria, status, written before the experiment).

## H-001 — Does the engine's raw measured curve match any weight anchor?
**Prediction:** The raw `slotWinsPerOvr()` curve (all-else-80, best-plan matchup model) will NOT match the Owner's final 11-06 table, design.json (the 28-Oct lab fit target), or the salary-only anchor on more than 1-2 slots; secondary slots (CB1/CB2/SS/FS) will show the largest spread.
**Control:** None — single-build deterministic measurement, n=1, no RNG.
**Data:** VERIFIED measurement from `tools/mathlab/triangulate.mjs` on Football-Sim-PreColors.html 40233d6b (anchors REPORTED from named files).
**Success criteria:** Spread between anchors > 100 points or rank spread >= 6 on a slot = "disagreement" flag (T3 rule).
**Result:** 16 of 27 slots flagged (VERIFIED). Raw curve: CB1 397 > WR1 304 on the 700 scale; every anchor disagrees with the raw and with each other (largest: WR1 raw 304 vs Owner 650 vs design 470 vs salary 625).
**Status:** CONFIRMED — raw curve matches no anchor; anchors mutually inconsistent. Hypothesis supported.
**Filed:** tools/mathlab/results/triangulate-2026-11-07T23-46.json (T12-wrapped, check PASS).

## H-002 — Does the engine's replacement definition match the real ratings pool?
**Prediction:** The engine's `staticReplacement()` (Nth-best available league-wide) per group matches the Madden 27 pool's Nth-best OVR within a few points.
**Data:** VERIFIED engine numbers from `tools/mathlab/replacement-audit.mjs`; pool numbers REPORTED from data/madden27-ratings.csv.
**Result:** gapPts = 0 on all 14 groups (VERIFIED). TE replacement 69 (lowest), EDGE 77 (highest).
**Status:** CONFIRMED for OVR-based replacement. Real-snap/depth comparison UNKNOWN (no snap data in workspace).
**Filed:** tools/mathlab/results/replacement-audit-2026-11-07T23-49.json.

## H-003 — Are flat FLEX penalties consistent with measured flex opportunity cost?
**Prediction:** Flat FLEX penalties (0/2/4/6 OVR points) deviate from measured opportunity cost (slotWins(natural,ovr) − slotWins(dest,ovr)) at high OVR, especially for SAM and secondary flexes.
**Data:** VERIFIED from `tools/mathlab/flex-pricer.mjs`.
**Result:** CB->SAM at 95 OVR: 0.993 wins lost vs flat penalty 4; CB->FS flat 0 but costs 0.42 wins at 95 OVR. Hypothesis supported.
**Status:** CONFIRMED — flat table underprices SAM flex and secondary flex at high OVR. Candidate flex-table ruling, not a silent change.
**Filed:** tools/mathlab/results/flex-pricer-2026-11-07T23-50.json.

**Open (not run, blocked):** H-004 mechanics validation on the 4-level ladder (T1) — needs seeded RNG (T-20261022-claude-2) and nflverse snap/target/EPA data.
