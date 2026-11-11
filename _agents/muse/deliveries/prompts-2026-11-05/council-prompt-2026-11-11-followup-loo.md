# Council — follow-up: the LOO is in, and what needs doing next

This is a follow-up to the new-direction prompt (council/muse `8aec6c14`). It does not replace it — that prompt still stands, and its work options A–H are still open. This one tells you what has come in since, and what is most useful now.

## What has come in

**The LOO is done (MUSE, P-340, merge question 9).** Filed as `inbox/20261111-0215-muse-P-340-loo-zai-merged.md`, script + output in `_agents/muse/deliveries/loo-zai-merged-2026-11-11/`, pushed `4e15a6f7`. Lambda refit blind per role (Claude's flexunify method — the honest version, not the fixed-constant version Inkling reported).

- ZAI-D1 V4: held-out mean error **1.13 OVR, 170/194 (87.6%)**.
- Merged (zai+G): held-out mean error **1.44 OVR, 172/194 (88.7%)** — about the same as Claude's own U-need LOO (1.44, 168/194).
- **The fitted lambda is ~0.20, not Z.ai's 0.40.** It is stable across all 19 folds. And it is a trade-off: 0.20 wins on mean error, 0.40 wins on exact tiers (96/97 vs 85/97 in-sample for ZAI-D1). The merge has to decide which objective it optimizes.
- **The guard damages FB and RB out-of-sample.** FB's held-out error goes from 0.34 (ability alone) to 2.63 (with the guard). This confirms MUSE-D2's in-sample finding on held-out data — and it supports the Owner's ruling that FB is scarcity, not the guard.
- **The OLB 200 vs 150 discrepancy is worth 2 rows.** Claude's zai+G is 94/97; MUSE's is 92/97. The difference is OLB: sport-football.json has 200, slots.ts and localWins20 have 150. Under 200, OLB>ILB and OLB>SS are exact; under 150, they are residuals. Same question as C 200 vs 150.

**The Owner's four answers are all in.** Phases 0–1 are a go. The totals bar is ~10% (general realism, not exact 2025 modelling). Basketball is the second sport, deferred until football is done. No historical Madden ratings right now.

**Z.ai has the Ledger Phase 1 prompt** (council/muse `cca17b8c`) — build the snap ledger from his PLAYLED prototype. It has not landed yet. When it does, it needs verification.

**Claude timed out again.** His Phases 0–1 work is stalled. The engine work waits on him; the Ledger and the council work do not.

## What needs doing next (in order of usefulness)

**A. Review the LOO filing.** This is the newest work and it needs eyes. Read `inbox/20261111-0215-muse-P-340-loo-zai-merged.md`, re-run `loo-zai-merged.py` yourself, and file your review. Press on: is the refit-lambda method the right one (vs Inkling's fixed-constant version)? Is the lambda trade-off (mean error vs exact tiers) framed right? Does the guard-damages-FB finding hold up? If you find an error in MUSE's numbers, correct the record — that is the job.

**B. The lambda question — discuss and recommend.** The LOO shows lambda ≈ 0.20 minimizes mean error and lambda = 0.40 maximizes exact tiers. The Owner has said the 99 is a guide, not a target, and ±5 is acceptable — which points toward mean error. But the exact-tier count is what the council has been scoring. Discuss: which objective should the merge optimize, and why? File the discussion as a P-340 note or an inbox item. The Owner decides; the council's job is to frame the choice clearly.

**C. The weight-source question — investigate and report.** OLB 200 (sport-football.json) vs 150 (slots.ts, localWins20) is 2 rows in the merged form; C 200 vs 150 is the same question. Investigate which is correct and what the impact is — read both files, compute the guard under each, and report the finding so the Owner can rule. This was option F in the last prompt and is still open.

**D. Review Claude's engine design (P-342).** MUSE reviewed it (ok). It needs more reviews. Read the design doc and run the toy kernel yourself. Press on lambda identification (the largest risk) and whether the strangler delivery is the right shape.

**E. Review Z.ai's PLAYLED prototype (P-341).** MUSE reviewed it (ok). It needs more reviews. Re-run the measurements and file yours. Press on the chain-length diagnosis and the Ledger path.

**F. P-326 — formal recheck of localWins20.** Still owed by a council seat, not MUSE (own-math constraint). Re-derive the table and file the recheck.

**G. Test Z.ai's Ledger Phase 1 when it lands.** When the snap ledger arrives, verify it: run the scripts, check the snap shares against the engine's own constants (PERS, DL5_SHARE, DIME_W), check the FB share, and check the conservation test. File a review.

**H. P-339 — verify and close.** Claude's census answered the centre diagnostic. Verify the census finding (re-run `flexcensus.mjs` if you can) and confirm whether P-339 is resolved.

**I. Review backlog.** P-328 needs one more review. Inkling Q1 needs one more review. P-282 is done but not marked REVIEWED. P-294 has five reviews but is not marked REVIEWED. P-288 needs two more reviews. Pick one and file yours.

## How to work

- Take the top item from `_agents/QUEUE.md` (`node tools/council.mjs next`), do it or review it, and push after every finished file/task — commit and push often, WIP if a chat gets long. A timed-out chat loses unpushed work; a pushed commit survives it.
- Reviews go in `inbox/<UTC>-<seat>-P-<ID>-<slug>.md`, first line `SPEAKER: … | ROLE: … | TASK: … | DATE: …`, then `FOR: <ID>`. Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN. Three different seats' ok/improved = REVIEWED.
- Do not assign work to a named agent. Do not touch the product file or the engine — only the Architect builds those. Do not review your own work.
- If you find a real defect, say so plainly with the receipt (command + output). If you find an error in MUSE's LOO numbers, correct the record.

## Innovate

Within any of the above: if you see a better way to test the merge, a sharper question for the Owner, a measurement the council hasn't run, or a use for the LOO nobody has named — do it or note it as an `IDEA:`. The LOO is the first honest out-of-sample test of the derivation; the council's job now is to make sure it is right, and to turn its findings (lambda, FB, the weight source) into clear questions for the Owner.
