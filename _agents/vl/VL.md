# VL — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** VL · **Role:** Council Advisor · **State:** active (roster in `_agents/README.md` is the truth)
- **ID block:** S-2000–2099 · **First seen:** 2026-10-24

## This session (2026-11-07, per START-HERE from origin/council/muse)
- Followed START-HERE exactly: `git fetch origin`, sync base (1b91f50e, up to date), `node tools/preserve.mjs check` (vl = 0 dirty, OK).
- Owner's bias question (P-013): bias-audit steps 1–2 already done earlier (committed 242a8a9d, 38e87e72). This session built + ran tooling on the modelWeights problem (read-only; no product file or protected constant touched):
  - BUILT `tools/mathlab/raw-curve-witness.mjs` (T3) — per-slot raw `slotWins(s, ovr)` curves (ovr 50–99) beside calibrated `modelWeights()` (700 scale), per build, archived to `tools/mathlab/results/`, with AGENTS §3 quantisation-contract check. RUN on Pre-Colors: n=32, page errors 0, **maxQuantError700 = 0, outOfContract = 0 (contract holds exactly)**, raw↔calibrated Spearman r = 0.992 → `results/raw-curve-witness-40233d6be00e987c-2026-11-07.{json,md}` (VERIFIED).
  - BUILT `tools/mathlab/triangulation.mjs` (T3) — per-slot multi-anchor Rosetta table: raw span · calibrated700 · derived1000 · volume/EPA/AV/salary-derived (all UNKNOWN until real-data run) · rank per anchor · spread · disagreement flag. RUN: raw↔calibrated Spearman r = 0.995, 0 disagreement flags → `results/*-triangulation.{md,json}` (VERIFIED).
  - BUILT `tools/mathlab/uncertainty.mjs` (T12) — reporting law n/mean/median/sd/se/CI95/threshold/verdict; `--selftest` PASS; wrap on witness `rows.spanWins`: n=32, CI95 [0.552,0.908], threshold 0.5 → PASS (VERIFIED).
  - BUILT `tools/mathlab/replacement-level-audit.mjs` (T4) — engine replacement baseline per slot (flat 80 OVR = no position-specific replacement); DL5 VERIFIED at 0.33 snap share stable 2023–25; depth slots UNKNOWN → `results/replacement-level-audit-2026-11-07.{md,json}` (runs clean, VERIFIED).
- Governance artifacts written: `_agents/vl/notes/{hypothesis-ledger,discrepancy-register,ruling-log,held-out-lint}-2026-11-07.md` (H-001–H-008, D-001–D-008, ruling log, held-out lint).
- Delivered revised Claude-facing prompt: `_agents/vl/deliveries/prompt-for-claude-2026-11-07-vl-revision.md` + inbox pointer `inbox/20261107-2352-vl-P-013-claude-prompt-revision.md` (FOR: P-013).

## Updated understanding (P-013 modelWeights problem)
- Fit target = the OLD personal table (lab 28 Oct; `design.json` = QB 1000, WR1 470, TE1 270, CB1 450, FS 260, SS 240), NOT the salary table (arrived 6 Nov). Two inconsistent targets (mechanics fit to old personal; display weights = salary), neither validated. `modelWeights()` inherits the old preference via fitted `RATING_SPECS`/`MC` — Tier A cannot self-validate.
- Owner permission (binding, P-013): abandon old personal table AND salary table as calibration targets/foundations; keep as display presets/independent anchors only. `DEFAULT_WEIGHTS` may be repositioned/retired (Architect implements + re-pins MERGE-MANIFEST in same commit).
- New display presets: QB = 1000, other slots from engine math, increments of 50. Do not hard-code old tables.

## Open needs (to ask Claude/Architect)
- Fit JSONs (`results/fit-*.json`) + `calibrate-weights.mjs` output from `architect/engine-and-seats` for the Q2 parameter diff (layer-audit format; receiver = `triangulation.mjs` rows).
- Confirmation of `colors/src/engine/rng.ts` seed injection point (unseeded shell until T-20261022-claude-2 lands).
- Rosetta schema agreement (shared keys + `track` column shell/colors/real).
- Claude's answers to Q1–Q3 and a–d; his step order/waves.

## Queue remaining
- P-070, P-127, P-132, P-133, P-188 (earlier session, untouched).
- P-013 is the Owner's live request; VL side = tooling + critique, awaiting Claude's answers before any further weight work.

## Worktree / branch
- **Worktree:** `/Users/kosi/Desktop/wt/vl` · **Branch:** `council/vl`
- **HEAD:** `a8b56034` (pushed to origin/council/vl) — this session's commit follows.
