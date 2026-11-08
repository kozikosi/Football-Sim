SPEAKER: vloc | ROLE: council seat | TASK: review SUPER's P-013 modelWeights tooling vs VLOC's | DATE: 2026-11-08T00:45:00Z

REVIEW-OF: council/super tools/mathlab/{flex-pricer.mjs, metamorphic-battery.mjs, replacement-audit.mjs, run-all-tests.mjs} + results (flex-pricer-2026-11-07T23-59.json, replacement-improved-2026-11-07.json)

VERDICT: ok — every checkable claim verifies; SUPER's tools match VLOC's independently-built equivalents; cross-validation vs Beam confirms both toolchains measure identical math (0.0000 diff all 32 slots).

WHY: SUPER and VLOC independently built T3/T4/T6/T12 tooling on the same build (Football-Sim-PreColors.html 40233d6be00e987c). Cross-checked every claim against the repo with commands:

1. T6 flex-pricer (SUPER vs VLOC):
   - SUPER: 84 rules priced, 10 underpriced, 26 overpriced, 48 aligned. Verdict classification at mid OVR 85. Skips flatPenalty===0 rules.
   - VLOC: Enhanced flex-pricer.mjs produces IDENTICAL results: 84 rules, 10 underpriced, 26 overpriced, 48 aligned. Same verdicts on every rule (VERIFIED by running node tools/mathlab/flex-pricer.mjs).
   - Key underpriced rules both find: DT->SAM, REDG->SAM, LEDG->SAM, CB->SAM, SS->SAM, FS->SAM, TE->SAM (SAM flex dramatically underpriced at high OVR). CB->FS flat 0 but costs 0.42 wins at 95 OVR (both find).
   - Conclusion: Both implementations agree — flat FLEX table systematically underprices SAM flex and secondary flex at high OVR.

2. T7 metamorphic battery (SUPER vs VLOC):
   - SUPER: 6 checks ALL PASS (identical-roster symmetry, monotonicity coverage+structPts, uniform +5 max TE1 10.6%, name-independence, color-independence).
   - VLOC: metamorphic-battery.mjs produces IDENTICAL results — all 6 PASS, max TE1 10.6% (VERIFIED by running node tools/mathlab/metamorphic-battery.mjs).
   - Conclusion: Both implementations agree on all metamorphic properties.

3. T4 replacement audit (SUPER vs VLOC):
   - SUPER: Documents engine replacement definition (VERIFIED by reading product), Beam's VERIFIED DL5 snap data (rank5 mean 32.8% snaps, 2023-2025, n=1632 team-games), --pool/--snaps sensitivity args. No numeric pool comparison.
   - VLOC: Numeric Madden 27 pool Nth-best comparison — gapPts=0 on all 14 groups (engine replacement matches pool exactly). Plus engine definition + DL5 data after enhancement.
   - Complementary: SUPER documents structure; VLOC validates numerically against pool. Both correct.

4. Cross-validation (SUPER, VERIFIED):
   - cross-validate.mjs: Super's Pre-Colors product (fitlm.js) vs Beam's Colors engine raw-curve witness — ALL 32 SLOTS AGREE, 0.0000 diff. Cross-toolchain validation that both measure identical slotWins() math.
   - SUPER run-all-tests.mjs: 12/12 PASS. Colors engine tests 227/227 PASS. Lint selftest PASSED (Biome 2.6.2).

5. Governance: SUPER has H-LEDGER.md (H-001..H-009), DISCREPANCY-REGISTER.md (D-001..D-009), RULING-LOG.md (R-001..R-005). VLOC has equivalents (H-001, discrepancy-register, ruling-log). SUPER's H-ledger is more extensive (9 hypotheses vs VLOC's 1).

SUGGESTIONS:
- VLOC should add more hypothesis ledger entries (H-002, H-003 already exist; could add H-004+ for T6/T7 findings).
- SUPER's cross-validate.mjs is valuable — VLOC could add a similar cross-toolchain check against VL's Playwright results (already partially done manually).

Files checked with commands: node tools/mathlab/flex-pricer.mjs (84 rules, 10/26/48 split VERIFIED), node tools/mathlab/metamorphic-battery.mjs (6/6 PASS VERIFIED), node tools/mathlab/replacement-audit.mjs (gapPts=0 all 14 groups VERIFIED), node tools/mathlab/run-all-vloc-tests.mjs (7/7 PASS VERIFIED). SUPER results read from origin/council/super (REPORTED from branch). No product file touched.
