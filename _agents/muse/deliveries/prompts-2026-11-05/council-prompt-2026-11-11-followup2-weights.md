# Council — follow-up 2: the weight source is settled, and what is most useful now

This is a follow-up to the LOO follow-up prompt (council/muse `6a76fb7f`). That prompt still stands. This one tells you what has come in since, and what is most useful now.

## What has come in

**The weight source is settled (MUSE, P-340, follow-up option C).** Filed as `inbox/20261111-0300-muse-P-340-weight-source.md`, script + output in `_agents/muse/deliveries/weight-source-2026-11-11/`, pushed `5d586208`.

- **slots.ts (C 150, OLB 150) is correct. sport-football.json (C 200, OLB 200) is stale.** Its own `_weight` note says the 200 values are the P-318 bump — but P-318 was redefined on 2026-11-09 to be an engine-math change, not a weight change, so the 200 values should never land.
- **The measured localWins20 ratios confirm it exactly.** C/OG 0.375, OLB/ILB 0.498, C/OT 0.300, OLB/SS 0.501 — all match slots.ts (0.375, 0.500, 0.300, 0.500) and none match sport-football.json (0.500, 0.667, 0.400, 0.667). This is a measurement, not a judgment call.
- **Impact:** OLB 200 vs 150 is 2 rows in the merged form (OLB>ILB, OLB>SS exact under 200, residual under 150). C 200 vs 150 changes the guard value but not the tier on any row. The correct merged-form fit is **92/97**, not Claude's 94/97.
- **sport-football.json should be corrected.** It is the Architect's file — filed as **P-343** (below). Until it is corrected, any tooling that reads it (flexgates, flexunify, rolesurplus) uses the wrong weights for C and OLB.

## What needs doing next (in order of usefulness)

**A. The lambda question — discuss and recommend.** This is the most useful open discussion. The LOO showed lambda ≈ 0.20 minimizes mean error and lambda = 0.40 maximizes exact tiers (96/97 vs 85/97 in-sample for ZAI-D1). The Owner has said the 99 is a guide, not a target, and ±5 is acceptable — which points toward mean error. But the exact-tier count is what the council has been scoring. Discuss: which objective should the merge optimize, and why? File the discussion as a P-340 note or an inbox item. The Owner decides; the council's job is to frame the choice clearly.

**B. Review the weight-source filing.** MUSE's investigation needs eyes. Read `inbox/20261111-0300-muse-P-340-weight-source.md`, re-run `weight-source-investigation.py` yourself, and file your review. Press on: is the ratio evidence as decisive as claimed? Is the P-318 redefinition read correctly? If you find an error, correct the record.

**C. Review the LOO filing.** Still needs reviews. Read `inbox/20261111-0215-muse-P-340-loo-zai-merged.md`, re-run `loo-zai-merged.py`, and file yours. Press on the refit-lambda method and the lambda trade-off.

**D. P-343 — correct sport-football.json (Architect's file; council verifies when it lands).** The correction itself is the Architect's job (C 150, OLB 150, or an annotation that the 200 values are the superseded P-318 bump). The council's job is to verify it when it lands: re-run the weight-source script against the corrected file and confirm the guard now matches slots.ts. Do not edit the architect branch yourself.

**E. Review Claude's engine design (P-342).** MUSE reviewed it (ok). It needs more reviews. Read the design doc and run the toy kernel yourself. Press on lambda identification (the largest risk) and whether the strangler delivery is the right shape.

**F. Review Z.ai's PLAYLED prototype (P-341).** MUSE reviewed it (ok). It needs more reviews. Re-run the measurements and file yours. Press on the chain-length diagnosis and the Ledger path.

**G. P-326 — formal recheck of localWins20.** Still owed by a council seat, not MUSE (own-math constraint). Re-derive the table and file the recheck.

**H. Test Z.ai's Ledger Phase 1 when it lands.** When the snap ledger arrives, verify it: run the scripts, check the snap shares against the engine's own constants (PERS, DL5_SHARE, DIME_W), check the FB share, and check the conservation test. File a review.

**I. P-339 — verify and close.** Claude's census answered the centre diagnostic. Verify the census finding (re-run `flexcensus.mjs` if you can) and confirm whether P-339 is resolved.

**J. Review backlog.** P-328 needs one more review. Inkling Q1 needs one more review. P-282 is done but not marked REVIEWED. P-294 has five reviews but is not marked REVIEWED. P-288 needs two more reviews. Pick one and file yours.

## How to work

- Take the top item from `_agents/QUEUE.md` (`node tools/council.mjs next`), do it or review it, and push after every finished file/task — commit and push often, WIP if a chat gets long. A timed-out chat loses unpushed work; a pushed commit survives it.
- Reviews go in `inbox/<UTC>-<seat>-P-<ID>-<slug>.md`, first line `SPEAKER: … | ROLE: … | TASK: … | DATE: …`, then `FOR: <ID>`. Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN. Three different seats' ok/improved = REVIEWED.
- Do not assign work to a named agent. Do not touch the product file or the engine — only the Architect builds those. Do not review your own work.
- If you find a real defect, say so plainly with the receipt (command + output). If you find an error in MUSE's numbers, correct the record.

## Innovate

Within any of the above: if you see a better way to test the merge, a sharper question for the Owner, a measurement the council hasn't run, or a use for the weight-source finding nobody has named — do it or note it as an `IDEA:`. The weight source is settled; the lambda question is the live one. The council's job now is to make the lambda choice clear enough for the Owner to rule on.
