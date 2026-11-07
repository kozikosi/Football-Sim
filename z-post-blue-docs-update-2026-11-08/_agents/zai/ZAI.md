# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai (GLM), IM chat only; sandbox can read GitHub (public HTTPS) but **cannot push** — work reaches GitHub via the Owner (or Beam: `tools/import-zip.sh zai <zip>` → `_agents/zai/imports/…` on `council/zai`). · **State:** High Councillor (below the Architect, above advisors — Owner, 24 Oct 2026).
- **First seen:** 2026-10-24 · **Standing strengths (evidence):** Z-post-blue build waves 1–13 + w79 state pin; style guide; REWEIGHT-BRIEF; anchor_demo (2024 nflverse, w80); VERACITY-SYNTHESIS (8 Nov, gh-pages 93447340).

## Current work
- **2026-11-08 · LAB WINDOW for P-013 (Beam's request: "build tooling before Claude's turn").** No product bytes touched; wave 79 stands (md5 `61acb21e…`). Built AND ran the lab on local branch `zai-lab-20261108` (cut from council/zai tip):
  - **T3a raw-curve witness** (`tools/lab-20261108/witness.mjs`) — per-build, sha256-stamped, auto-detects calibration absorption. Ran on PreColors `5be9767f…` and w79 `61acb21e…`: **w79 verdict ABSORBED at 0.000000%** (raw span ÷ displayed weight = 0.002540 constant) — the shell's displayed "measured impact" IS the salary table to seven decimals.
  - **T3b triangulation rosetta** (`triangulate.mjs`) — 14/26 slots rank-flagged vs the Owner salary anchor (WR2 −16, CB3 +15, CB2 +14, K measured 0.72-wins span vs anchor 50); emits a compliant **new-preset PROPOSAL** (QB=1000, increments of 50, from raw slopes — ruling R-002) as a proposal only.
  - **T1 mechanics v0** (`mech_validate.mjs` + `anchors_2024.py`, 8 seeded seasons, nflverse 2024 hash-pinned incl. the def file) — skill production CLEAN vs real 2024 (zero 5pp flags); sacks DL-skewed with **DB 0.0% vs real 7.3%** (D-001); DB INT +5.9pp (D-002); team wins 8.5 [8.21–8.72], PF/gm 22.27 (real 22.8). Efficiency rung NOT measurable on this build (no per-play ledger — verified at source; E5 is a code gap).
  - **T4 replacement auditor** (`replacement_audit.mjs`) — engine replacement OVRs nearly uniform (70.8–76.3) vs real ≥100-snap deployment varying ~3× (DB 275 vs QB 51 league-wide) (D-004).
  - **T6 flex pricer v0** (`flex_pricer.mjs`) — full-roster counterfactuals, both arms re-optimized by the shell's own Hungarian optimizer, paired seeds: TE→WR1 median **0.63 wins lost** (n=53), CB→WR1 0.67 (n=102), CB→FS 0.28, REDG→DT1 0.39, WR→RB1 0.31 — the −10 cap guard under-prices these moves.
  - **T12 reporting law** in code (`lablib.mjs report()`): n/CI/threshold/MEANINGFUL flag on every JSON.
  - **Governance** (`governance/`): hypothesis ledger H-001…H-007 (this session's runs labelled EXPLORATORY), discrepancy register D-001…D-007, ruling log R-001…R-004, held-out lint CLEAN.
  - **NEW FORENSIC FINDING** (`notes/FIT-TARGET-FORENSICS-2026-11-08.md`, corrects the 7 Nov ruling record's premise): the 28 Oct fitlm target was `design.json`(27 Oct) × 0.00254 — 29/29 slots exact — an Architect table on the Owner's 25 Oct "pick your own weights, QB=1000" directive, NOT the old personal table; current Colors specs were re-fitted to the salary table 6 Nov (6cccf29); the deepest verified circularity is the **w79 display layer**. Owner permission to abandon the old tables stands regardless (R-001); a correction REQUEST is filed (D-007), Owner decides.
- **Delivered:** `deliveries/PROMPT-FOR-CLAUDE-2026-11-08-v2.md` (supersedes v1; new Q0), `deliveries/VERACITY-SYNTHESIS-ADDENDUM-2026-11-08.md`, `inbox/20261108-0900-zai-lab-window-results-and-prompt-v2.md`.

## What the next session needs
1. `START-OF-CHAT-ZAI.md` §3 (REV 22) → this file → `inbox/20261108-0900…` → prompt v2.
2. If Claude answered: fold his Q0 confirmation + Q2 parameter diff into the Rosetta (`triangulate.mjs` gains a Colors column — H-006).
3. If running confirmatory reruns (H-001/H-004/H-005): hand the pre-registration to the Verifier seat BEFORE running; the RUNBOOK (`tools/lab-20261108/RUNBOOK.md`) has every command and the seed contract.

## Do not redo
- The w79 apparatus (`tools/zai-lab/`, batteries w76/w79 84/0) — the new lab complements it, does not replace it.
- The baseline identity, the line-3 selector correction, the w76/w79 wave history (see REV 20/21 §0).
- The forensics checks (cfg×0.00254, design-vs-personal, absorption) — re-run only to RE-verify, they are scripted in the forensics note.

## Files in this lane
- `deliveries/` — documents (prompt v2, synthesis addendum, synthesis, handoff, style guide, REWEIGHT-BRIEF…)
- `tools/lab-20261108/` — this window's lab (witness, triangulate, mech_validate, replacement_audit, flex_pricer, heldout_lint, lablib, inpage-core, anchors_2024.py, RUNBOOK)
- `tools/zai-lab/` — the w79 in-page apparatus (standing)
- `lab-results/` — witness ×2, rosetta, T1/T4/T6 JSONs (T12-wrapped)
- `governance/` — hypothesis ledger, discrepancy register, ruling log
- `notes/` — FIT-TARGET-FORENSICS-2026-11-08.md and prior session notes
- `builds/`, `docs-update-2026-10-26/` — historical pins (see BASELINES.md)

## Rules that changed since REV 21
- None of the Owner's laws changed. New seat conventions this session: every lab JSON passes the T12 wrapper; exploratory vs confirmatory is labelled in the hypothesis ledger; anchor tables (salary, old personal) are marked ANCHOR/RETIRED wherever they appear in lab outputs — never fit targets (Owner R-001, binding).
