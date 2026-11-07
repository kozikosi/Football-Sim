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

## VL (council/vl) — engine/weights/flex/bias reviews
- `_agents/vl/deliveries/vl-zai-critique-report-2026-11-07.md` (5fd712b2) — VL's critique of Z.ai + engine/tool improvement plan (L1/L2/L3, triangulation, 6 tools, brainstorm).
- `inbox/20261107-221000-vl-P-013-zai-critique.md` (a8b56034) — inbox pointer.
- `_agents/vl/notes/bias-audit-2026-11-07.md` (242a8a9d) — VL bias-protocol step 1 audit.
- `_agents/vl/notes/bias-pre-registration-2026-11-07.md` — VL pre-registration.
- `_agents/vl/deliveries/flexweight.mjs`, `flex.cap10.json`, `results/flexweight-*.json` — flex weight scenarios (cap 10, fixed 600, pairwise 600).
- `_agents/vl/deliveries/vlc-v1/src/engine/{weights,flex,ratings,index}.ts` — vlc-v1 engine (weights/flex/ratings).
- VL inbox: `2ed2d80a` flex-out analysis with Owner's 6 Nov weights; `72c1dcff` flex cap -10 apparatus; `f3c3973e` VL P-284 Owner's permanent-opinion weight table.

## muse (council/muse) — consensus & engine tools
- `_agents/muse/deliveries/P-284-consensus-ranges-2026-11-06.md` — P-284 consensus range table (7 seats).
- `_agents/muse/deliveries/engine-coverage-map.md`, `engine-test-harness.ts`, `engine-acceptance.test.ts` — engine coverage/test harness.
- `inbox/20261106-1156-{ds,gemini,gpt,groq,q}-P-284-weights-table.md` — web seats' weights tables.
- `inbox/20261106-1216-{ds,gemini,gpt,groq,q}-P-284-review-consensus-ranges.md` — web seats' consensus reviews.
- `inbox/20261103-0215-muse-call-engine-analysis.md`, `20261103-0940-muse-weights-impact-call.md` — earlier engine analysis calls.

## Other seats (recent engine-adjacent)
- pickle: w74 verdicts (inbox 20261106-0201..0206), P-257 patch; `round2-peer-review.md`, `round3-review.md`.
- ds: P-250 outcome lab bands (2026-11-05, `174a93bc`), E-211 reviews.
- gemini: P-191 return-game calibration (2026-11-01), P-195 acceptance tests.

## Published w79 build
- gh-pages: https://kozikosi.github.io/Football-Sim/Football-Sim-Z-post-blue-w79.html
- folder: `z-post-blue-wave79-2026-11-07-w79/` (gh-pages commit 9f73cb0a).

## Other council seats' engine-adjacent notes
- `_agents/zai/deliveries/REWEIGHT-BRIEF.md`
- `_agents/pickle/round3-review.md`, `_agents/pickle/specs/M-8-merge-manifest-addendum.md`
- `_agents/vl/notes/v20-hands-on-critique.md`
- `_agents/ds/reviews/Architecture-Review-M8.md`
