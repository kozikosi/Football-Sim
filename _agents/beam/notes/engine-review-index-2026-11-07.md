# Engine/weights review index — for Z.ai — 2026-11-07 (Beam)

Curated list of where recent council reviews on the engine/weights question live. All paths relative to repo root (branch noted per section). Updated to include OR, VL, VLOC, Flint, super, muse, beam, and other seats.

## Beam (council/beam)
- `_agents/beam/notes/owner-rulings-2026-11-07.md` — OWNER RULINGS (binding): abandon old system, new presets QB=1000/50, permission + analysis. Broadcast via `inbox/20261107-2255-beam-owner-rulings.md`.
- `_agents/beam/notes/bias-audit-2026-11-07.md` — where Owner weights enter; RATING_SPECS & MC fitted; secondary 18.7% vs QB 11.6%; why slotWinsPerOvr can't validate.
- `_agents/beam/notes/bias-preregistration-2026-11-07.md` — 6 metrics (M1–M6), thresholds, decision rules, evidence standard.
- `_agents/beam/notes/bias-results-2026-11-07.md` — M4 volume (nflverse 2023/24): secondary not biased; TE/LB underweighted, DL overweighted. M5 by-OVR: QB & TE match engine; WR slightly high; RB much too high.
- `_agents/beam/notes/zai-response-critique-2026-11-07.md` — critique of Z.ai's advisory: agreements, disagreements (WR1 EPA, TE marginal), 10 tool ideas, 4 Owner questions.
- `_agents/beam/data/owner-weights-2026-11-06.json`, `fit-owner-2026-11-06.json` — Owner's 32-slot weights + fitlm results.
- `inbox/20261106-1120-beam-P-284-weights-sweep.md`, `1141…`, `1209…`, `1600…`, `1630…`, `1700…`, `20261107-1005-beam-w79-handoff.md`, `2110…`, `2200…`

## OR (council/or)
- `inbox/20261106-1535-or-P-284-followup-weights-validation.md` — tested Owner's salary-based table vs Claude's revealed impact on Pre-Colors: 7/26 within ±50; major gaps WR1 +216, CB3 -270, CB2 -213, K -234.
- `inbox/20261106-1200-or-P-284-weights-table.md` — OR weights-table recommendation (all 34 slots, QB=1000).
- `inbox/20261106-2200-or-P-142-crossflex-measurement.md` — cross-position flex measurement.
- `inbox/20261106-0815-or-zai-w76-briefing.md` — Z.ai w76 briefing.
- Commits: `a83d80b6` (implement Owner's salary-based DEFAULT_WEIGHTS, re-pin MERGE-MANIFEST), `4a25acd0` (wip: flex REV 5 table + engine updates, cap at 10).

## VL (council/vl)
- `_agents/vl/deliveries/vl-zai-critique-report-2026-11-07.md` (5fd712b2) — VL's critique of Z.ai + engine/tool improvement plan.
- `inbox/20261107-221000-vl-P-013-zai-critique.md` (a8b56034) — inbox pointer.
- `_agents/vl/notes/bias-audit-2026-11-07.md` (242a8a9d), `bias-pre-registration-2026-11-07.md` — VL bias protocol steps 1–2.
- `_agents/vl/deliveries/flexweight.mjs`, `flex.cap10.json`, `results/flexweight-*.json` — flex weight scenarios.
- `_agents/vl/deliveries/vlc-v1/src/engine/{weights,flex,ratings,index}.ts` — vlc-v1 engine.
- VL commits: `2ed2d80a` flex-out analysis with Owner's 6 Nov weights; `72c1dcff` flex cap -10 apparatus; `f3c3973e` VL P-284 Owner's permanent-opinion weight table; `ebe65623` P-284-FOLLOWUP validation report.

## VLOC (council/vloc)
- `inbox/20261107-2059-vloc-P-013-weights-audit.md` — VLOC P-013 weights audit (step 1).
- `inbox/20261107-2100-vloc-P-013-weights-prereg.md` — VLOC pre-registration (step 2).
- `inbox/20261107-2200-vloc-P-013-zai-advisory-critique.md` — VLOC critique of Z.ai advisory + recommendations.
- `_agents/vloc/deliveries/PLAN-w79-weights-flex.md`, `weights-flex-proposal-w79.md`, `flexcap.mjs`, `weights-measure.mjs`, `flex-measure.mjs` — w79 weights & flex apparatus.
- `inbox/20261107-1021-vloc-P-013-w79-weights-flex-ui.md`, `20261106-154426-vloc-P-013-owner-weights-final.md`, `20261106-114804-vloc-P-284-weights-final-table.md`, `20261106-112337-vloc-P-284-weights-finalization.md`, `20261106-102807-vloc-P-282-weights-verification.md`, `20261106-1212-vloc-P-284-review-improved.md`.

## Flint (council/flint)
- `inbox/20261107-1018-flint-P-282-owner-weights.md` — Flint P-282/P-284 Owner's permanent weights + engine/tool testing report (batteries 84/0/0, tsc gate).
- Flint commits: `bf6aa048` (Nov 7) P-282 owner permanent weights + engine/tool verifications.

## super (council/super)
- `inbox/20261106-1534-super-P-013-owner-weights-proposal.md` — super P-013 Owner weights list proposal (saved verbatim, structural comparison, not applied).
- super commits: `dd346c4b`/`c9e5f8f4` (Nov 6) P-013 weights proposal.

## muse (council/muse)
- `_agents/muse/deliveries/P-284-consensus-ranges-2026-11-06.md` — P-284 consensus range table (7 seats).
- `_agents/muse/deliveries/engine-coverage-map.md`, `engine-test-harness.ts`, `engine-acceptance.test.ts` — engine coverage/test harness.
- `inbox/20261106-1156-{ds,gemini,gpt,groq,q}-P-284-weights-table.md` — web seats' weights tables.
- `inbox/20261106-1216-{ds,gemini,gpt,groq,q}-P-284-review-consensus-ranges.md` — web seats' consensus reviews.
- `inbox/20261103-0215-muse-call-engine-analysis.md`, `20261103-0940-muse-weights-impact-call.md` — earlier engine analysis calls.

## Engine math spec & diff
- `_agents/ENGINE-MATH-SPEC.md`, `_agents/W30-ENGINE-DIFF-2026-10-28.md`
- `colors/src/engine/slots.ts`, `colors/src/engine/specs.ts`
- `tools/mathlab/weights-w79.json`, `tools/mathlab/flex.json`

## Calibration
- `inbox/20261106-0200-beam-w74-03-lab-calibration-verdict.md`
- `_agents/beam/notes/w78-handoff/W77-WEIGHTS-OPINION.md`

## Owner verbatim
- `_agents/owner-notes/2026-10-25-weights-philosophy.txt`, `2026-10-28-drives-ot-weights-verbatim.txt`, `2026-10-29-flex-weights-dl5-ui-verbatim.txt`

## Z.ai
- `anchor_demo_2024 w80.py` + `anchor_demo_2024_results w80.csv` (gh-pages, commit 4621367d)
- `_agents/beam/notes/imported-zai/z-core/03-guides/REWEIGHT-BRIEF.md`

## Other seats
- `_agents/zai/deliveries/REWEIGHT-BRIEF.md`
- `_agents/pickle/round2-peer-review.md`, `round3-review.md`, `specs/M-8-merge-manifest-addendum.md`
- `_agents/vl/notes/v20-hands-on-critique.md` (council/vl)
- `_agents/ds/reviews/Architecture-Review-M8.md`

## Published
- gh-pages: https://kozikosi.github.io/Football-Sim/Football-Sim-Z-post-blue-w79.html
- folder: `z-post-blue-wave79-2026-11-07-w79/` (gh-pages 9f73cb0a)
