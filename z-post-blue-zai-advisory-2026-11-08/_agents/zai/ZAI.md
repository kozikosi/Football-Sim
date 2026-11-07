# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, IM chat; sandbox can read GitHub, cannot push (no credentials) · **State:** **High Councillor** (below the Architect, above advisors — Owner's ruling, 24 Oct 2026).

## Current work
- **VERACITY SYNTHESIS session (8 Nov 2026, no wave — advisory/lane only):** read all seven council
  reviews of `DATA-ANCHOR-WEIGHTS-ADVISORY-2026-11-07.md` (Gemini, DS, Q, Groq + the long independent
  review via Owner relay; Beam/VL/VLOC from their branches) and delivered the consolidated response:
  `_agents/zai/deliveries/VERACITY-SYNTHESIS-2026-11-08.md` (+ the inbox pointer, + the lane files).
  Companion: `deliveries/PROMPT-FOR-CLAUDE-2026-11-08.md` (the short prompt to the Architect).
- Accepted corrections (mine): WR1 "overpriced" retracted (EPA column says the opposite); TE1
  re-based on Beam's marginal slope (0.257 vs 0.248), not target share; "default = Tier A" already
  shipped (`modelWeights()` on load); target share ≠ value; frozen L1 ≠ validated L1 (play-level
  outcome validation missing); flex counterfactual needs FULL re-optimization; replacement levels
  unaudited (flat WINS_BASE 80 is a reference, not a replacement); PFR AV demoted (OL/All-Pro bias).
- **Central new proposal — the RAW-CURVE WITNESS:** since w79 the calibrated L2 scale IS the Owner's
  table by construction; export the uncalibrated 50→100 curve beside it on every build so
  triangulation can always compare raw vs table. Plus: the 12-tool Laboratory (deduplicated from all
  reviews, T1–T12, two dependencies: seeded RNG T-20261022-claude-2 + the hash-pinned nflverse
  pipeline), the L0–L4 architecture adoption, the two-track Rosetta table, and the dissent list
  (Shadow-Sim RMSE demoted to Tier-B; trait-flex formula premature; individual EPA attribution is
  research not gate; percentile test carries a scarcity confound).
- **Verified this session:** the 7 Nov workspace is ON `architect/engine-and-seats`
  (`calibrate-weights.mjs`, `fitlm.js`, `design.json`, `salary-reference.json`, `flex.json`) — the
  council's P0 "Owner must push the workspace" blocker is RESOLVED; Q2's parameter diff is now
  producible by the Architect.

## What the next session needs
- Read first: `deliveries/VERACITY-SYNTHESIS-2026-11-08.md` (the report) and
  `inbox/20261108-0000-zai-P-013-veracity-synthesis.md` (the pointer with the headline updates).
- **My committed next actions (§7 of the synthesis):** (1) raw-curve witness export in
  `tools/zai-lab/`; (2) paired-draft comparator using the existing mulberry32 seeding; (3) the T7
  metamorphic battery in `batteries/` (name/color/swap/monotonicity — bite-proven against w76);
  (4) the pre-registration for the first T1 receiving-volume run, handed to the Verifier BEFORE running.
- Awaiting: the Architect's answers to PROMPT-FOR-CLAUDE (four questions: raw-curve witness on his
  track, the Q2 diff, RNG landing order, the Rosetta schema); the Owner's ruling batch (holdout law
  2016–23/2024/2025; −10 cap during T6; per-player override yes/no; Verifier seat naming).
- **Owner housekeeping:** the `zai-council-zai-20261107.patch` was never attached to the 8 Nov chat
  and is not on any fetched branch — re-attach or re-send. This session's lane commit carries a fresh
  patch (`zai-council-zai-20261108.patch`) for `git am` onto `council/zai`.
- Do not redo: the w79 calibration debate is SETTLED by the Owner's law (his table is the model); the
  synthesis's job is the witness + validation program around it, not re-litigating the table.

## Files in this lane
- `deliveries/VERACITY-SYNTHESIS-2026-11-08.md` — the council-review synthesis (this session's report)
- `deliveries/PROMPT-FOR-CLAUDE-2026-11-08.md` — the short prompt to the Architect
- Prior sessions (carried by the w79 package on gh-pages): `notes/W79-INTAKE-LEDGER.md`,
  `notes/2026-11-07-owner-flex-answer-and-testing-apparatus.md`, `tools/zai-lab/`, `batteries/`,
  `builds/Football-Sim-Z-post-blue-w79.html` (md5 61acb21e…), `shots/`, `results/`
