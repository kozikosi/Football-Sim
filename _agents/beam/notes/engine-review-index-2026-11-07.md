# Engine/weights review index — for Z.ai — 2026-11-07 (Beam)

Curated list of where recent council reviews on the engine question live. All paths relative to repo root (council/beam branch unless noted).

## Bias audit & pre-registration (this session)
- `_agents/beam/notes/bias-audit-2026-11-07.md` — where Owner weights enter; RATING_SPECS & MC fitted; secondary 18.7% vs QB 11.6%; why slotWinsPerOvr can't validate.
- `_agents/beam/notes/bias-preregistration-2026-11-07.md` — 6 metrics (M1–M6), thresholds, decision rules, evidence standard.
- `_agents/beam/notes/bias-results-2026-11-07.md` — M4 volume (nflverse 2023/24): secondary not biased; TE/LB underweighted, DL overweighted. M5 by-OVR: QB & TE match engine; WR slightly high; RB much too high.
- `_agents/beam/notes/zai-response-critique-2026-11-07.md` — critique of Z.ai's advisory: agreements, disagreements (WR1 EPA, TE marginal), 10 tool ideas, 4 Owner questions.

## Owner's final weights table + tests
- `_agents/beam/data/owner-weights-2026-11-06.json` — Owner's 32-slot weights (salary internal ref).
- `_agents/beam/data/fit-owner-2026-11-06.json` — fitlm results (slotWinsPerOvr vs Owner weights).
- `inbox/20261106-1120-beam-P-284-weights-sweep.md` — full 26-slot revealed table + flags.
- `inbox/20261106-1141-beam-P-284-weights-table.md` — weights table.
- `inbox/20261106-1209-beam-P-284-review-consensus-ranges.md` — consensus range review.
- `inbox/20261106-1600-beam-P-284-owner-final-weights-and-test-report.md` — Owner-final weights + engine test report.
- `inbox/20261106-1630-beam-TO-ARCHITECT-owner-weights-execute.md` — to-Architect execute note.
- `inbox/20261106-1700-beam-P-284-outcome-test.md` — outcome test.
- `inbox/20261107-1005-beam-w79-handoff.md` — w79 handoff (flex cap, testing apparatus).

## Engine math spec & diff
- `_agents/ENGINE-MATH-SPEC.md` — engine math spec.
- `_agents/W30-ENGINE-DIFF-2026-10-28.md` — engine diff (28 Oct).
- `colors/src/engine/slots.ts` — SLOTS weights (Owner's target table, REV 5).
- `colors/src/engine/specs.ts` — RATING_SPECS, MC, PLAN_K (fitted knobs marked in comments).
- `tools/mathlab/weights-w79.json` — w79 fixed weights set.
- `tools/mathlab/flex.json` — flex table (REV 4/5).

## Calibration reviews
- `inbox/20261106-0200-beam-w74-03-lab-calibration-verdict.md` — w74/03 lab calibration verdict.
- `_agents/beam/notes/w78-handoff/W77-WEIGHTS-OPINION.md` — w77 weights opinion.
- `_agents/beam/notes/w78-handoff/20261106-w77-intake-ledger.md` — w77 intake ledger.
- `_agents/beam/notes/w79-handoff/README-W79.md` — w79 readme.
- `_agents/beam/notes/w79-handoff/tools/w79/weights-w79.json`, `w79-impact.mjs`.

## Owner verbatim notes (weights philosophy)
- `_agents/owner-notes/2026-10-25-weights-philosophy.txt`
- `_agents/owner-notes/2026-10-28-drives-ot-weights-verbatim.txt`
- `_agents/owner-notes/2026-10-29-flex-weights-dl5-ui-verbatim.txt`

## Z.ai anchor demo (gh-pages)
- `anchor_demo_2024 w80.py` + `anchor_demo_2024_results w80.csv` (gh-pages commit 4621367d) — Owner weights vs 2024 receiving volume.
- `tools/mathlab/...` imported Z.ai reweight brief: `_agents/beam/notes/imported-zai/z-core/03-guides/REWEIGHT-BRIEF.md`.

## Published w79 build
- gh-pages: https://kozikosi.github.io/Football-Sim/Football-Sim-Z-post-blue-w79.html
- folder: `z-post-blue-wave79-2026-11-07-w79/` (gh-pages commit 9f73cb0a).

## Other council seats' engine-adjacent notes
- `_agents/zai/deliveries/REWEIGHT-BRIEF.md`
- `_agents/pickle/round3-review.md`, `_agents/pickle/specs/M-8-merge-manifest-addendum.md`
- `_agents/vl/notes/v20-hands-on-critique.md`
- `_agents/ds/reviews/Architecture-Review-M8.md`
