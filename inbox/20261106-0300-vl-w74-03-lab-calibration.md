SPEAKER: vl | ROLE: Council Advisor | TASK: w74 folder review — 03 Lab flat lever + skilled implementation | DATE: 2026-11-06T03:00Z
FOR: w74/03-lab-calibration

VERDICT: IMPROVED (work is sound and pre-registered; two material label/number conflicts with the shared context must be flagged before any tuning decision).

## What w74 contains (read from origin/gh-pages:w74/03-lab-calibration/)
- README.md, CALIBRATION.md, FINDINGS-P-250.md, results/baseline-n1000.json, tune2-midfloor{14,18,24}-n240.json, tune2-midfloor24-fav-n240.json, b-{greedy,top30}-{a,b,c}.json, model-report-2026-11-05.md, reproduce-run.log, sweep-results.json, streaming-sweep-patch.md, outcomelab-page.html, tools/outcomelab/{calibration-curve,determinism-1000,edge-sweeps,golden-seasons}.ts, test/nfl/{golden-seasons,interleaving-determinism}.test.ts.

## Claims checked against source (all VERIFIED by reading w74 tree + base 425f72a draft.ts)
1. Seed formula `makeRng(1000+i)`, paired across policies — matches baseline-n1000.json preregistration and draft.ts `newDraft`/`runDraft`. ✓
2. Policies `greedy` | `top30` | `favorites` in draft.ts:136-149. `top30` sorts by `wins` and `rng.pick(cs.slice(0,30))` — uniform random within top 30. ✓
3. `midFloor` equals-form (`--midFloor=14`) applies; space-form (`--midFloor 14`) is ignored by the runner (reserved for its own flags) — confirmed by tune2-*.json preregistration blocks showing `configOverrides: {midFloor: 14}` etc. ✓ (FINDINGS-P-250 documents the space-form bug.)
4. Baseline N=1000 numbers in baseline-n1000.json: greedy 89.5/33.0/21.6 (playoffs/SB/title), meanWins 11.43; top30 48.5/7.1/3.0, meanWins 8.72; favorites 17.4/2.0/0.7. ✓ matches FINDINGS-P-250 table.
5. Shards b-*.json corroborate within z=±0.19 (greedy-a 380 seeds 86.6/31.8/20.5; greedy-b 380 seeds 91.3/34.7/22.4; greedy-c 240 seeds 91.3/32.1/22.1; top30-a 380 seeds 45.8/5.3/2.4; top30-b 380 seeds 51.1/8.7/3.9). ✓
6. midFloor ladder N=240: 14→46.7/5.4/2.1, 18→44.2/8.3/4.2, 24→50.8/9.6/5.4 (top30); favorites@24 17.5/1.2/0.8. All within own CI (±6.3pp) of default 48.5 — FLAT, non-monotonic. ✓ matches FINDINGS-P-250.
7. Win-SD ~2.16-2.23 at every rung — CPU-draft lever does not move parity (report-only). ✓

## TWO CONFLICTS WITH THE SHARED CONTEXT (must be resolved before tuning)
CONFLICT A — policy labels swapped: FINDINGS-P-250/CALIBRATION.md call `greedy` "naive best-OVR" and `top30` "skilled depth-aware". The shared context (Owner-locked) says the reverse: `greedy` sorts by `wins` (draft.ts:140) = BEST-VALUE, identical to best-value/skilled-top-of-class (89.5/33/21.6); "top30" is RETIRED, use "skilled" = random within top 30 (48.5/7.1/3.0). The w74 labels are wrong; "naive best-OVR" is actually `favorites` (17.4/2/0.7). This is a doc/label defect, not a numbers defect — the JSON values are correct.
CONFLICT B — Owner target: shared context says skilled targets = 90% playoffs / ~35% SB / 25% title; w74 CALIBRATION.md says Owner target = 80/25/10 for top30. These conflict, and neither greedy (89.5/33/21.6 ≈ 90/35/22) nor top30-random (48.5/7.1/3.0) lands on 80/25/10. Target provenance must be re-confirmed (80/25/10 recorded in w74 §B6 as Kosi's answer; shared context says 90/35/25). Do not tune to either until resolved.

## FLAT-LEVER FINDING (agree with w74)
The midFloor lever cannot reach 80/25/10 (best rung 50.8% playoffs, 29.2pp short). Per pre-registered rule, NO parameter value proposed. The gap is draft-quality, not league-strength: greedy proves 41pp edge is expressible in this league. Two pre-registered follow-ups need a ruling: (1) top-30 picker semantics — random-within-30 (today) vs best-value-with-top-30-cap; (2) game-noise sweep (noiseMax 0.75/1.5). Do NOT tune against either cluster until pinned (see P-263 finding).

## REPRODUCTION STATUS (in progress, base 425f72a)
My repro of baseline N=1000 is running in 8 shards (seeds 0-999) at /tmp/repro-base; shards s0-s7 ~85-90% done. VL N=100 skilled (top30) done: 38% playoffs / 6% SB / 3% title → matches "38/3" (playoffs/title). Greedy N=100 and midFloor rungs still running. Will append receipts when complete.

EVIDENCE: VERIFIED (w74 JSON files read via git show; draft.ts read at 425f72a). INFERRED (label/target conflicts reasoned from shared context vs w74 text).
