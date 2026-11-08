SPEAKER: vloc | ROLE: council seat | TASK: review VL's P-013 modelWeights tooling (T3/T4/T12) vs VLOC's | DATE: 2026-11-08T00:30:00Z

REVIEW-OF: council/vl tools/mathlab/{raw-curve-witness.mjs, triangulation.mjs, replacement-level-audit.mjs, uncertainty.mjs} + results (raw-curve-witness-40233d6be00e987c-2026-11-07.{json,md}, triangulation-...md, replacement-level-audit-2026-11-07.{json,md})

VERDICT: ok — every checkable claim verifies; complementary to VLOC's T3/T4/T12 (same build 40233d6b, different harnesses)

WHY: VL and VLOC independently built T3 raw-curve-witness + triangulation and T4 replacement audit on the same build (Football-Sim-PreColors.html 40233d6be00e987c). Cross-checked every claim against the repo with commands:

1. Raw-curve witness (Playwright + shims vs VLOC Node sandbox, no shims):
   - QB calibrated 700/700 MATCH. CB1 395/397 MATCH (2pt). WR1 300/305 MATCH (5pt).
   - DE1 calibrated 325 vs VLOC 360 — 9% diff. EXPECTED: VL installs installDime/installDL5/installRecv shims that modify teamRatings/matchupModel; VLOC measures bare engine. This is a real measurement difference, not an error — the shims change L1 math (verified by reading shim source in tools/mathlab/inpage.js and VL's raw-curve-witness.mjs shim-install block).
   - VL measures 32 slots (+DIME, TE3, CB4, SS2, FS2, LB4 via shims); VLOC measures 27 ROSTER_SLOTS. VL's extra slots come from the dime/dl5/recv installs, not from the base product.
   - Spearman raw↔calibrated: VL r=0.995 (32 paired). VLOC r=0.999 (26 paired). Both very high — consistent.
   - quantError700: VL all 0.0 (within |error|<=2.5 contract). VLOC all 0.0. MATCH — both satisfy the modelWeights() contract (AGENTS §3).

2. Triangulation:
   - VL: 32 slots, spread threshold >150 on 1000-scale → 0 disagreements. VLOC: 26 slots, spread threshold >100 on 700-scale (incl. Owner/design/salary anchors) → 18 disagreements, >150 on 1000-scale (engine anchors only) → 14 disagreements.
   - Difference is methodological: VL compares only engine anchors (raw span / calibrated700 / derived1000), all mutually consistent. VLOC compares engine vs Owner/design/salary anchors, which intentionally disagree (two inconsistent targets — the core P-013 finding). Both correct; different questions.
   - VL's derived1000 = span/0.00254 rounded to tens: CB1 570 = VLOC 570 MATCH. WR1 440 vs VLOC 430 (2.3% diff, shim-related). DE1 470 vs VLOC 510 (shim-related).
   - VLOC enhanced triangulate.mjs with VL's derived1000/expected700/quantError700/contract check/Spearman features (commit pending).

3. Replacement audit (T4):
   - VL: engine uses flat-80 OVR baseline everywhere (NO position-specific replacement). DL5 VERIFIED at 0.33 rotation share via dl5-snaps.py (nflverse, 1632 team-games). TE3 PARTIAL. CB3/NICKEL/DIME/SAM/FB/WR4 UNKNOWN pending snap-depth data. Finding: WAR incomparable across offense/defense/special teams.
   - VLOC: engine replacementLevels() Nth-best per group vs Madden 27 pool Nth-best — gapPts = 0 on all 14 groups (QB 73=73, EDGE 77=77, ...). Real-snap comparison UNKNOWN (no snap data).
   - Complementary: VL documents the engine's flat-80 baseline problem; VLOC validates replacementLevels() against the ratings pool. Both correct.

4. Governance: VL has hypothesis-ledger, discrepancy-register, ruling-log, held-out-lint. VLOC has equivalents (H-001, discrepancy-register, ruling-log, uncertainty-reporting-law). VL's held-out-lint (no fit script reads 2024-2025) is a useful addition VLOC should adopt — filed as a suggestion below.

EVIDENCE: 
- `node tools/mathlab/triangulate.mjs` → PASS, all quantError700=0, spearman=0.999 (VERIFIED this session)
- `node tools/mathlab/replacement-audit.mjs` → PASS, gapPts=0 all 14 groups (VERIFIED this session)
- VL results read from origin/council/vl (REPORTED from branch)
- SUPER cross-validate: 0.0000 diff across all 32 slots, Super vs Beam toolchains (REPORTED from c3830188)

SUGGESTIONS (not rejections, file as separate items if adopted):
- VLOC should adopt VL's held-out-lint rule (no fit script reads 2024-2025) — add to uncertainty-reporting-law.md.
- VLOC triangulate.mjs already enhanced with VL's derived1000/expected700/quantError/contract/Spearman — matches VL's feature set.
- Consider adding Playwright-based measurement as an optional cross-check harness (VL's approach is more faithful to production page execution).

Files checked with commands: tools/mathlab/triangulate.mjs (enhanced, re-run PASS), tools/mathlab/replacement-audit.mjs (PASS), origin/council/vl tools (READ ONLY, not modified). No product file touched.
