# Super — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** Super · **Model / how reached:** Nemotron 3.5 Super via OpenCode · **State:** standby (per `_agents/README.md` roster)
- **ID block:** none yet · **First seen:** 2026-10-28
- **Strengths shown so far (evidence, not claims):** P-019/P-043/P-166 reviews; P-013 weights proposal (structural comparison, not applied); modelWeights bias analysis + T1/T3/T4/T12 tooling built & verified; cross-validation vs Beam (100% agreement); Colors engine tests 227/227 pass; lint selftest pass.
- **Worktree:** /Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-super
- **Branch:** council/super · **HEAD:** 2efc48a3 (pushed to origin/council/super)

## Current work
- **Claimed / in progress:** P-013 modelWeights problem + build tooling before Claude's turn (Beam prompt, 2026-11-07). Read-only this round: no product files or protected constants touched.
- **Done this session (VERIFIED, commands + output):**
  1. Installed playwright + chromium in tools/mathlab/ (package.json, package-lock). `npx playwright install chromium` → Chrome 158 headless shell. Toolchain VERIFIED.
  2. Verified fitlm.js on Football-Sim-PreColors.html: `node fitlm.js <html> cfg.json --out results/fit-super-verify-2026-11-07.json` → 0.1% RMS log-error, all slots within ±0.8% of design.json.
  3. Built T12 uncertainty wrapper: `tools/mathlab/uncertainty.mjs` — reporting law (n, spread, CI, threshold). Receipt: `results/uncertainty-super-2026-11-07.json`.
  4. Built T3 triangulation + raw-curve witness: `tools/mathlab/triangulate.mjs` — per-slot raw/fitted/design/calibrated, spread, bootstrap 95% CI, disagreement flag, optional markdown table (`--md`). Receipt: `results/triangulate-super-2026-11-07.json` → nDisagree=0, all 33 slots AGREE (circularity confirmed).
  5. Built T1 mechanics harness: `tools/mathlab/mechanics-harness.mjs` — 4-level ladder, pre-registered bands, fail→report. Receipt: `results/mechanics-super-2026-11-07.json` → 32 slots, 0 fails.
  6. Built T4 replacement auditor: `tools/mathlab/replacement-audit.mjs` — engine replacement definition (read-only), sensitivity on N. Receipt: `results/replacement-super-2026-11-07.json`.
  7. Built cross-validate.mjs — compares Super's Pre-Colors product vs Beam's Colors engine raw spans. Receipt: `results/cross-validate-super-vs-beam-2026-11-07.json` → ALL 32 SLOTS AGREE, 0.0000 diff (cross-toolchain validation).
  8. Built run-all-tests.mjs — combined runner for all 10 tools (Super + Beam). **ALL 10 PASS**.
  9. Enhanced triangulate.mjs with `--md` markdown table output (Beam-style) + fixed empty-key filter.
  10. Governance: `_agents/nemo-super/notes/H-LEDGER.md` (H-001..H-009), `DISCREPANCY-REGISTER.md` (D-001..D-009), `RULING-LOG.md` (R-001..R-005).
  11. Ran Colors engine tests: `npm test` → 227/227 PASS. Ran lint selftest: PASSED (Biome 2.6.2).
- **Reviewed other seats' work (this session):**
  - Beam (council/beam): raw-curve-witness.mjs (T3), triangulation.mjs (T3), metamorphic-battery.mjs (T7), replacement-level-audit.mjs (T4 scaffold), uncertainty.mjs (T12, in _agents/beam/tools/). ALL VERIFIED running. Beam's tools target the Colors TS engine (`colors/`), mine target the Pre-Colors HTML product. Raw spans match exactly (cross-validate: 0.0000 diff on all 32 slots). Beam's T7 metamorphic battery (3 checks: symmetry, monotonicity, uniform +5) PASS — Super does not yet have a T7. Beam's triangulation has no bootstrap CI/uncertainty; Super's T12 uncertainty wrapper is unique. Beam's T4 is a scaffold (DL5 VERIFIED, rest UNKNOWN); Super's T4 documents the actual engine definition from product code.
  - OR (council/or): commit a83d80b6 directly edited `Football-Sim-PreColors.html` DEFAULT_WEIGHTS (old→Owner salary table) + MERGE-MANIFEST. GOVERNANCE NOTE: AGENTS.md §3 says only the Architect builds the product file; OR's change is on their own branch (council/or), not council/base. Noted, not reverted (per AGENTS.md §4.4: never revert another seat's work).
  - VL (council/vl): flex cap -10 apparatus, bias audit/pre-registration, Z.ai critique. All read-only.
  - VLOC (council/vloc): P-013 weights audit + pre-registration, w79 weights/flex analysis. All read-only.
  - Flint (council/flint): P-282 owner weights + engine/tool verifications (batteries 84/0/0, tsc gate). Reviews P-114/P-111/P-110/P-108 → "improved" verdicts.
  - Muse (council/muse): P-284 consensus ranges + web seat reviews.
- **Blocked / waiting on:** Inject RNG (T-20261022-claude-2) to unblock T1 L2 production, T6 flex pricer, T2 paired-seed comparator — all need repeatable seeded seasons.
- **Notes:** Owner permission (Ruling 1, binding) to abandon old personal + salary table as fit targets; new display presets QB=1000 / 50 increments. Fit target was old personal table (28 Oct), salary table arrived 6 Nov — two inconsistent targets, neither validated. modelWeights() inherits Owner's original personal bias via fitted RATING_SPECS/MC.

## What the next session needs
- **Read first:** `_agents/nemo-super/SUPER.md` (this file); `tools/mathlab/README.md`; `tools/mathlab/results/cross-validate-super-vs-beam-2026-11-07.json`; AGENTS.md §3.
- **Open questions:** (a) Does Claude accept the raw-curve witness on his track? (b) Can he produce the Q2 parameter diff in layer-audit format? (c) Where does the injectable RNG land first? (d) Does he adopt the shared output schema + Rosetta table?
- **Do not redo:** All 10 tool tests (run-all-tests.mjs: 10/10 PASS); cross-validation (0.0000 diff); Colors engine tests (227/227).

## Files in this lane
- _agents/nemo-super/SUPER.md (this lane file)
- _agents/nemo-super/notes/H-LEDGER.md (H-001..H-009)
- _agents/nemo-super/notes/DISCREPANCY-REGISTER.md (D-001..D-009)
- _agents/nemo-super/notes/RULING-LOG.md (R-001..R-005)
- tools/mathlab/uncertainty.mjs (T12 reporting law)
- tools/mathlab/triangulate.mjs (T3 triangulation + raw-curve witness, --md table)
- tools/mathlab/mechanics-harness.mjs (T1 mechanics harness, deterministic L1)
- tools/mathlab/replacement-audit.mjs (T4 replacement auditor)
- tools/mathlab/cross-validate.mjs (cross-toolchain Super vs Beam validation)
- tools/mathlab/run-all-tests.mjs (combined runner, all 10 tools)
- tools/mathlab/package.json, package-lock.json (playwright + chromium)
- tools/mathlab/results/fit-super-verify-2026-11-07.json
- tools/mathlab/results/triangulate-super-2026-11-07.json
- tools/mathlab/results/mechanics-super-2026-11-07.json
- tools/mathlab/results/replacement-super-2026-11-07.json
- tools/mathlab/results/uncertainty-super-2026-11-07.json
- tools/mathlab/results/cross-validate-super-vs-beam-2026-11-07.json
