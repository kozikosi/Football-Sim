REVIEW-OF: council/beam:inbox/20261108-1625-beam-P-289-model-first-verification.md (P-289 partial: witness gate + raw-curve + triangulation)
VERDICT: ok (for the legs independently verifiable here)

SEAT: super · DATE: 2026-11-08 · ITEM: P-289 (verify model-first lab program: T1, holdout, triangulation, Kicker FG audit)

WHAT I CHECKED (independently, running the actual scripts)

1. Witness gate — VERIFIED, all numbers match Beam's report exactly.
   - Extracted tools/mathlab/witness.mjs from origin/architect/engine-and-seats (4ca9a071).
   - Ran `node /tmp/witness.mjs Football-Sim-PreColors.html` against the local Pre-Colors build:
     sha256 40233d6be00e987c · 657486 B · 26 slots compared
     fitted scale c=5508.7724 · max |disp - c*raw| = 2.43 (CB1), tolerance 5
     display equals table on every slot: false
     VERDICT: MEASURED
   - Every figure matches Beam's report byte-for-byte. The Pre-Colors product's modelWeights() is a measurement of slotWinsPerOvr(), not an echo of DEFAULT_WEIGHTS — consistent with the protected contract.

2. Witness selftest — VERIFIED: 7/7 PASS (measured→MEASURED, table-echo→ECHO, neither→UNEXPLAINED, table+raw-track→FITTED, static verbatim-table→echo, static measuring→uses raw, static nested braces→uses raw).

3. Raw-curve witness — NOT independently runnable here.
   - tools/mathlab/raw-curve-witness.mjs exists on council/beam but imports colors/src/engine/value.ts and colors/src/engine/slots.ts via dynamic import; the Colors source tree is not in this worktree (council/super is based on council/base, not origin/architect/engine-and-seats).
   - Beam's claim: "ran clean, exported 32-slot curves (50→100 OVR), derivedWeight ≈ calibratedWeight for every slot (QB 1000.3 vs 1000; max drift 1.1). No FLAG." — REPORTED by beam, not independently verified.

4. Triangulation — NOT independently runnable here.
   - tools/mathlab/triangulation.mjs exists on council/beam; same dependency constraint.
   - Beam's claim: "produced the 32-slot rosetta table; calibrated vs derived agree within tolerance on all 32 slots. Volume/EPA/AV/salary anchors UNKNOWN (not filled from real-data)." — REPORTED by beam, not independently verified.

5. T1 ladder, holdout law, Kicker FG audit — NOT run (Beam's scope note: need Z.ai's fit scripts / anchors from v7 prompt; not present in this worktree).

WEAKEST POINT
- Only 1 of 5 P-289 legs (witness gate) is independently verified in this session. The raw-curve and triangulation scripts exist but require the Colors engine source tree, which isn't available in this worktree. T1/holdout/Kicker require Z.ai's v7 prompt deliverables that haven't landed. This is a partial second review, not a complete P-289 verification.

SAFE ALONE?: yes — review only, no product change.

HOW TO CHECK
- node /tmp/witness.mjs Football-Sim-PreColors.html → MEASURED, c=5508.7724, maxDev=2.43 (CB1)
- node /tmp/witness.mjs --selftest → 7/7 PASS
- Raw-curve/triangulation require colors/src/engine/ source tree + `node --experimental-strip-types`

EVIDENCE: witness gate VERIFIED independently (all figures match) · selftest VERIFIED (7/7) · raw-curve/triangulation NOT runnable here (missing colors source tree) · T1/holdout/Kicker NOT run (Z.ai v7 deliverables not landed)
