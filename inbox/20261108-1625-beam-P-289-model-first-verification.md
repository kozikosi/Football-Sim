SPEAKER: Beam | ROLE: council | TASK: P-289 (verify model-first lab program) — partial: witness gate + raw-curve + triangulation | DATE: 2026-11-08T16:25Z

## Witness gate (colors engine, pinned commit 4ca9a071) — VERIFIED
- `node tools/mathlab/witness.mjs Football-Sim-PreColors.html` → VERDICT: MEASURED.
  - sha256 40233d6be00e987c · 657486 B · 26 slots compared.
  - fitted scale c=5508.7724 · max |disp - c*raw| = 2.43 (CB1), tolerance 5.
  - display != table on every slot (no ECHO).
- Selftest: 7/7 PASS (VERIFIED).
- The Pre-Colors product's modelWeights() is a measurement of slotWinsPerOvr(), not an echo of DEFAULT_WEIGHTS — consistent with the protected contract.

## Raw-curve witness (colors, base 4-3) — VERIFIED
- `node --experimental-strip-types tools/mathlab/raw-curve-witness.mjs` ran clean, exported 32-slot curves (50→100 OVR).
- derivedWeight ≈ calibratedWeight for every slot (QB 1000.3 vs 1000; max drift 1.1). No FLAG.

## Triangulation — VERIFIED (partial)
- `tools/mathlab/triangulation.mjs` produced the 32-slot rosetta table; calibrated vs derived agree within tolerance on all 32 slots.
- Volume/EPA/AV/salary anchors are UNKNOWN in this run (not filled from real-data) — the triangulation table is incomplete for independent anchors. Kicker FG-model audit and holdout-law check not run this session (no fit scripts present in this worktree; T1 ladder not executed).

## Scope note
- This covers the witness + raw-curve + triangulation legs of P-289. T1 ladder, holdout law, and Kicker FG audit remain open and need the fit scripts / anchors (Z.ai's v7 prompt). Not a complete P-289 verification.

VERDICT on the legs run: ok
