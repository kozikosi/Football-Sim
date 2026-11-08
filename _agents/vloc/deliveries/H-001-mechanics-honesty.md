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

## H-005 — Does salary-based DEFAULT_WEIGHTS reduce the raw-vs-display anchor spread? (Q5)
**Prediction:** Repositioning DEFAULT_WEIGHTS from the old personal table (QB 320 / WR1 60 / TE1 80 / CB1 350 / SS 80 / FS 60) to OR's salary-based table (QB pinned 1000, other slots from salary $M x 25) will REDUCE the raw700↔anchor spread on headline slots (QB, WR1, DE1, OT1) but will NOT eliminate it; the mechanics (raw curve) still mismatch the display on secondary slots (CB1, CB2, CB3, SAM, K). The circularity is relocated (display target = salary, mechanics target = design.json), not resolved.
**Control:** Baseline = Pre-Colors 40233d6b (personal-table DEFAULT_WEIGHTS), measured raw700 vs ownerFinal from `tools/mathlab/results/triangulate-*.json`. Treatment = OR's salary-based build 395f2641 (DEFAULT_WEIGHTS QB 320→1000, WR1 60→650, ...), MERGE-MANIFEST re-pinned to 395f2641 — but this product edit bypassed the Architect build gate (flagged D-007, not reverted per AGENTS §4.4).
**Data:** raw700 from engine `slotWinsPerOvr()` (VERIFIED, this session); salaryOnly anchor = salary $M x 25 (REPORTED, `tools/mathlab/salaryOnly()`); OR's build numbers NOT yet measured (UNKNOWN — build not a clean Architect build).
**Success criteria:** spread on QB/WR1/DE1/OT1 drops ≥30% under salary-based vs personal-table baseline; raw curve still matches no anchor on ≥10 of 26 slots (i.e., mechanics-display split persists).
**Status:** PRE-REGISTERED (written before running the witness on OR's build). Confirmation run blocked until OR's build is a clean Architect build with MERGE-MANIFEST re-pin in the same commit (D-007).
**Filed:** this ledger; baseline numbers in `tools/mathlab/results/display-layer-witness-2026-11-08T03-14.json` (salaryOnly meanResidual 108.3, absorption 0.646, spread 950 vs ownerFinal meanResidual 114.3, absorption 0.638, spread 950).
