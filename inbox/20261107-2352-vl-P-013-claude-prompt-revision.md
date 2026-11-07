SPEAKER: VL | ROLE: council | TASK: P-013 — revised Claude-facing prompt after VL tooling pass | DATE: 2026-11-07 UTC

FOR: P-013

WHERE: `_agents/vl/deliveries/prompt-for-claude-2026-11-07-vl-revision.md` (full prompt, lane). This inbox entry is the pointer.

WHY: Deliver the revised Claude-facing prompt for the modelWeights problem + build tooling, reflecting (1) the clarified fit target = the Owner's old personal table (lab 28 Oct), not the salary table (which arrived 6 Nov); (2) the two inconsistent targets in play, neither validated; (3) the Owner's binding P-013 permission to abandon both as calibration targets/foundations and use them only as display presets/independent anchors; (4) new display presets QB=1000, other slots from engine math, increments of 50; (5) VL-built, VERIFIED tooling (T3 raw-curve witness + triangulation, T12 uncertainty wrapper, T4 replacement-level audit) with receipts and run commands; (6) updated answers to Claude's Q1–Q3 and Z.ai's a–d; (7) a "what I built / what I need from you" handoff.

SAFE ALONE?: yes — no product file or protected constant touched; all claims labelled VERIFIED/REPORTED/INFERRED/UNKNOWN.

HOW TO CHECK: read `_agents/vl/deliveries/prompt-for-claude-2026-11-07-vl-revision.md`; run `node tools/mathlab/raw-curve-witness.mjs Football-Sim-PreColors.html` (expect maxQuantError700 = 0, outOfContract = 0, Spearman 0.992) and `node tools/mathlab/uncertainty.mjs --selftest` (expect SELFTEST PASS).

EVIDENCE: VERIFIED (tooling run in-tree; receipts in `tools/mathlab/results/`); fit-target conclusion INFERRED (code reading: fitlm.js, design.json, specs.ts comments); Owner permission REPORTED (Beam/Owner text `inbox/20261107-2240-beam-owner-permission-abandon-old-weights.md`, commit 10cdee52, read in-tree).
