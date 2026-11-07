# Super — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** Super · **Model / how reached:** Nemotron 3.5 Super via OpenCode · **State:** standby (per `_agents/README.md` roster)
- **ID block:** none yet · **First seen:** 2026-10-28
- **Strengths shown so far (evidence, not claims):** P-019/P-043/P-166 reviews; P-013 weights proposal (structural comparison, not applied); modelWeights bias analysis + T1/T3/T4/T12 tooling built & verified this session.
- **Worktree:** /Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-super
- **Branch:** council/super · **merge-base HEAD origin/council/base:** d7a05a2770bad6b1d2cc31c759bbf64e28a5cf4d

## Current work
- **Claimed / in progress:** P-013 modelWeights problem + build tooling before Claude's turn (Beam prompt, 2026-11-07). Read-only this round: no product files or protected constants touched.
- **Done this session (VERIFIED, commands + output):**
  1. Installed playwright + chromium in tools/mathlab/ (package.json, package-lock). `npx playwright install chromium` → Chrome 158 headless shell downloaded. (NET OK; node_modules/ is gitignored.)
  2. Verified existing mathlab fitlm.js toolchain runs on Football-Sim-PreColors.html: `node fitlm.js <html> cfg.json --out results/fit-super-verify-2026-11-07.json` → converges to 0.1% RMS log-error in 4 iters; all 29 slots within ±0.8% of design.json target. Toolchain VERIFIED working. (No product file touched.)
  3. Built T12 uncertainty wrapper: `tools/mathlab/uncertainty.mjs` — reporting law (n, spread, CI, pre-stated threshold on every lab JSON). Ran: `results/uncertainty-super-2026-11-07.json`.
  4. Built T3 triangulation generator + raw-curve witness: `tools/mathlab/triangulate.mjs` — per slot: raw measured span · fitted · design target · spread · bootstrap CI · disagreement flag. Ran: `results/triangulate-super-2026-11-07.json` → nDisagree=0, all 33 slots AGREE (raw≈fitted≈design), confirming circularity (measured curve matches design target because fit targeted it).
  5. Built T1 mechanics validation harness (deterministic L1): `tools/mathlab/mechanics-harness.mjs` — 4-level ladder (L1 opportunity, L3 efficiency measured; L2 production & play-level flagged NEEDS-RNG), pre-registered tolerance bands, fail→report never auto-adjust. Ran: `results/mechanics-super-2026-11-07.json` → 32 slots, 0 fails, all pass bands.
  6. Built T4 replacement-level auditor: `tools/mathlab/replacement-audit.mjs` — documents engine's replacement definition (replacementLevels/staticReplacement/WINS_BASE=70/STATIC_SLOTS) from product code (read-only), sensitivity on N, optional snap comparison. Ran: `results/replacement-super-2026-11-07.json`.
  7. Governance artifacts: `_agents/nemo-super/notes/H-LEDGER.md` (H-001..H-009), `DISCREPANCY-REGISTER.md` (D-001..D-009), `RULING-LOG.md` (R-001..R-005).
- **Blocked / waiting on:** Inject RNG (T-20261022-claude-2) to unblock T1 L2 production, T6 flex pricer, T2 paired-seed comparator — all need repeatable seeded seasons.
- **Notes:** Owner permission (Ruling 1, binding) to abandon old personal + salary table as fit targets; new display presets QB=1000 / 50 increments. Fit target was old personal table (28 Oct), salary table arrived 6 Nov — two inconsistent targets, neither validated. modelWeights() inherits Owner's original personal bias via fitted RATING_SPECS/MC.

## What the next session needs
- **Read first:** `_agents/nemo-super/SUPER.md` (this file); `tools/mathlab/README.md` (updated below); `tools/mathlab/results/triangulate-super-2026-11-07.json` (circularity evidence); AGENTS.md §3 (protected constants).
- **Open questions:** (a) Does Claude accept the raw-curve witness on his track? (b) Can he produce the Q2 parameter diff (original→calibrated→position→measured effect) in layer-audit format? (c) Where does the injectable RNG land first? (d) Does he adopt the shared output schema + Rosetta table?
- **Do not redo:** fitlm.js verification (results/fit-super-verify-2026-11-07.json); triangulation (results/triangulate-super-2026-11-07.json); mechanics harness (results/mechanics-super-2026-11-07.json).

## Files in this lane
- _agents/nemo-super/SUPER.md (this lane file)
- _agents/nemo-super/notes/H-LEDGER.md (hypothesis ledger H-001..H-009)
- _agents/nemo-super/notes/DISCREPANCY-REGISTER.md (D-001..D-009)
- _agents/nemo-super/notes/RULING-LOG.md (R-001..R-005)
- tools/mathlab/uncertainty.mjs (T12 reporting law)
- tools/mathlab/triangulate.mjs (T3 triangulation + raw-curve witness)
- tools/mathlab/mechanics-harness.mjs (T1 mechanics harness, deterministic L1)
- tools/mathlab/replacement-audit.mjs (T4 replacement auditor)
- tools/mathlab/package.json, package-lock.json (playwright + chromium)
- tools/mathlab/results/fit-super-verify-2026-11-07.json (fit verification receipt)
- tools/mathlab/results/triangulate-super-2026-11-07.json (triangulation receipt)
- tools/mathlab/results/mechanics-super-2026-11-07.json (mechanics receipt)
- tools/mathlab/results/replacement-super-2026-11-07.json (replacement receipt)
- tools/mathlab/results/uncertainty-super-2026-11-07.json (uncertainty receipt)
