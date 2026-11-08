# Super — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** Super · **Model / how reached:** Nemotron 3.5 Super via OpenCode · **State:** standby (per `_agents/README.md` roster)
- **ID block:** none yet · **First seen:** 2026-10-28
- **Strengths shown so far (evidence, not claims):** P-019/P-043/P-166 reviews; P-013 weights proposal (structural comparison, not applied); modelWeights bias analysis + T1/T3/T4/T6/T7/T12 tooling built & verified; cross-validation vs Beam (100% agreement); Colors engine tests 227/227 pass; lint selftest pass; reviewed & compared Beam/VL/VLOC/OR/Flint/muse/DS/GPT tooling; adopted VLOC's triangulate.mjs enhancements (sandbox eval, multiple anchors, quantError700 contract, Spearman, CSV output) and uncertainty.mjs wrap/check subcommands.
- **Worktree:** /Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-super
- **Branch:** council/super · **HEAD:** 6a7b200b (pushed to origin/council/super)

## Current work
- **Claimed / in progress:** P-013 modelWeights problem + build tooling before Claude's turn (Beam prompt, 2026-11-07). Read-only this round: no product files or protected constants touched.
- **Done this session (VERIFIED, commands + output):**
  1. Installed playwright + chromium in tools/mathlab/ (package.json, package-lock). `npx playwright install chromium` → Chrome 158 headless shell. Toolchain VERIFIED.
  2. Verified fitlm.js on Football-Sim-PreColors.html: `node fitlm.js <html> cfg.json --out results/fit-super-verify-2026-11-07.json` → 0.1% RMS log-error, all slots within ±0.8% of design.json.
  3. Built T12 uncertainty wrapper: `tools/mathlab/uncertainty.mjs` — reporting law (n, spread, CI, threshold). Receipt: `results/uncertainty-super-2026-11-07.json`. Also supports `wrap`/`check` subcommands (adopted from VLOC).
  4. Built T3 triangulation + raw-curve witness: `tools/mathlab/triangulate.mjs` — per-slot raw/fitted/design/calibrated/ownerFinal/salaryOnly anchors, derived1000, expected700, quantError700 contract check, Spearman correlation, spread1000 threshold, bootstrap CI, disagreement flags. Two modes: fitlm.js read + sandbox eval. Outputs JSON + CSV. Receipt: `results/triangulate-super-2026-11-07.json` → nDisagree=0, all 33 slots AGREE (circularity confirmed). 0 out of contract (|quantErr|<=2.5), spearman=0.999.
  5. Built T1 mechanics harness: `tools/mathlab/mechanics-harness.mjs` — 4-level ladder, pre-registered bands, fail→report. Receipt: `results/mechanics-super-2026-11-07.json` → 32 slots, 0 fails.
  6. Built T4 replacement auditor: `tools/mathlab/replacement-audit.mjs` — engine replacement definition (read-only), sensitivity on N, Beam's VERIFIED DL5 snap data merged. Receipt: `results/replacement-super-2026-11-07.json`.
  7. Built cross-validate.mjs — compares Super's Pre-Colors product vs Beam's Colors engine raw spans. Receipt: `results/cross-validate-super-vs-beam-2026-11-07.json` → ALL 32 SLOTS AGREE, 0.0000 diff (cross-toolchain validation). VERIFIED by VLOC's independent review.
  8. Built run-all-tests.mjs — combined runner for all 13 tools (Super + Beam). **ALL 13 PASS** (12 tools + triangulate sandbox mode).
  9. Enhanced triangulate.mjs with VLOC's features: sandbox eval (no Playwright), multiple anchors (ownerFinal/designJson/salaryOnly), derived1000, expected700, quantError700 contract check, Spearman correlation, CSV output, product hash pinning before/after. Kept bootstrap CI and --md output.
  10. Built T6 flex-pricer.mjs — deterministic flex opportunity-cost pricer (cost = slotWins(natural)-slotWins(dest), OVR-equivalent vs flat FLEX penalty). 84 rules priced: 10 underpriced, 26 overpriced, 48 aligned. Receipt: `results/flex-pricer-*.json`.
  11. Built T7 metamorphic-battery.mjs — 6 checks PASS: identical-roster symmetry, monotonicity (coverage + structPts), uniform +5 (max TE1 10.6%), name-independence, color-independence.
  12. Improved T4 replacement-audit.mjs — merged Beam's VERIFIED DL5 snap data (rank5 mean 32.8% snaps, 2023-2025, n=1632 team-games).
  13. Enhanced uncertainty.mjs — added `wrap`/`check` subcommands (add/validate _uncertainty block, adopted from VLOC).
  14. Updated run-all-tests.mjs — added triangulate sandbox mode test (13 total).
  15. Updated tools/mathlab/README.md — documents all tools and modes.
  16. Governance: `_agents/nemo-super/notes/H-LEDGER.md` (H-001..H-009), `DISCREPANCY-REGISTER.md` (D-001..D-009), `RULING-LOG.md` (R-001..R-005).
  17. Ran Colors engine tests: `npm test` → 227/227 PASS. Ran lint selftest: PASSED (Biome 2.6.2).
- **Reviewed other seats' work (this session):**
  - VLOC (council/vloc, latest 0d178427/76c28163): enhanced triangulate.mjs with derived1000/expected700/quantError700/contract/Spearman/CSV — ADOPTED into Super's triangulate.mjs; run-all-vloc-tests.mjs combined runner (6/6 PASS); discrepancy register D-007 on OR's product edit; reviewed VL's tools → VERDICT: ok; cross-validated Super's cross-validation (0.0000 diff).
  - Beam (council/beam, latest 86f7f38d): merged Super's T3/T4 definitions into their tools (VALIDATION of Super's designs); added VERIFIED DL5 snap data to T4; fixed VL's flexweight crash → `_agents/beam/tools/flexweight-fixed.mjs` (T6 apparatus).
  - VL (council/vl, latest d6b5bc9b): raw-curve-witness (curve at 9 OVR points), triangulation (rank correlations), uncertainty wrapper. All read-only.
  - OR (council/or, latest a83d80b6): directly edited Football-Sim-PreColors.html DEFAULT_WEIGHTS on their own branch. GOVERNANCE NOTE: AGENTS.md §3 says only the Architect builds the product file; noted, not reverted (AGENTS.md §4.4).
  - Flint (council/flint, latest a801a096): P-115 review VERDICT improved; Beam lab tools verified; VL flexweight fix verified.
  - Muse (council/muse, latest 05b870be): P-284 consensus ranges + web seat reviews.
  - DS (council/ds, latest 174a93bc): P-250 Outcome Lab bands from nflverse.
  - GPT (council/gpt, latest db980a10): PRIORITIES.md sorting, intake ledger, governance rules.
  - Z.ai (council/zai, latest 25e3b2f9): w55 build package added.
- **Blocked / waiting on:** Inject RNG (T-20261022-claude-2) to unblock T1 L2 production (seeded seasons), T6 full paired-seed lineup re-optimization, T2 paired-seed comparator — all need repeatable seeded seasons.
- **Notes:** Owner permission (Ruling 1, binding) to abandon old personal + salary table as fit targets; new display presets QB=1000 / 50 increments. Fit target was old personal table (28 Oct), salary table arrived 6 Nov — two inconsistent targets, neither validated. modelWeights() inherits Owner's original personal bias via fitted RATING_SPECS/MC.

## What the next session needs
- **Read first:** `_agents/nemo-super/SUPER.md` (this file); `tools/mathlab/README.md`; `tools/mathlab/results/cross-validate-super-vs-beam-2026-11-07.json`; AGENTS.md §3.
- **Open questions:** (a) Does Claude accept the raw-curve witness on his track? (b) Can he produce the Q2 parameter diff in layer-audit format? (c) Where does the injectable RNG land first? (d) Does he adopt the shared output schema + Rosetta table?
- **Do not redo:** All 13 tool tests (run-all-tests.mjs: 13/13 PASS); cross-validation (0.0000 diff, externally verified by VLOC); Colors engine tests (227/227); lint selftest.

## Files in this lane
- _agents/nemo-super/SUPER.md (this lane file)
- _agents/nemo-super/notes/H-LEDGER.md (H-001..H-009)
- _agents/nemo-super/notes/DISCREPANCY-REGISTER.md (D-001..D-009)
- _agents/nemo-super/notes/RULING-LOG.md (R-001..R-005)
- tools/mathlab/uncertainty.mjs (T12 reporting law + wrap/check subcommands)
- tools/mathlab/triangulate.mjs (T3 triangulation + raw-curve witness, 2 modes, --md, --csv)
- tools/mathlab/mechanics-harness.mjs (T1 mechanics harness, deterministic L1)
- tools/mathlab/replacement-audit.mjs (T4 replacement auditor, Beam DL5 merged)
- tools/mathlab/cross-validate.mjs (cross-toolchain Super vs Beam validation)
- tools/mathlab/run-all-tests.mjs (combined runner, all 13 tools)
- tools/mathlab/flex-pricer.mjs (T6 flex opportunity-cost pricer)
- tools/mathlab/metamorphic-battery.mjs (T7 metamorphic battery)
- tools/mathlab/package.json, package-lock.json (playwright + chromium)
- tools/mathlab/README.md (documents all tools and modes)
- tools/mathlab/results/fit-super-verify-2026-11-07.json
- tools/mathlab/results/triangulate-super-2026-11-07.json
- tools/mathlab/results/mechanics-super-2026-11-07.json
- tools/mathlab/results/replacement-super-2026-11-07.json
- tools/mathlab/results/uncertainty-super-2026-11-07.json
- tools/mathlab/results/cross-validate-super-vs-beam-2026-11-07.json
