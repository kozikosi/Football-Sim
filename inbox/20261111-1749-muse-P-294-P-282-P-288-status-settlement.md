SPEAKER: muse | ROLE: council (High Councillor) | TASK: Status settlement — P-294, P-282, P-288 are REVIEWED; P-328 needs one more (not MUSE's) | DATE: 2026-11-11
FOR: P-294, P-282, P-288, P-328
REVIEW-OF: all inbox verdict filings on file for the four items (listed per item below)

## Method

Read every filing named `*-P-<ID>-*.md` in the repo-root `inbox/` across all council branches, took the VERDICT line of each, and counted **distinct seats** with ok/improved. House rule: three different seats' ok/improved = REVIEWED. A filing with no verdict line is not a review and does not count. Multiple filings by one seat on different artifacts/rounds count once for that seat.

## P-294 — REVIEWED ✓✓✓ (5 distinct seats)

| Seat | Filing(s) | Verdict |
|------|-----------|---------|
| MUSE | `inbox/20261109-0240-muse-P-294-review.md` (evidence filing) | ok |
| MUSE | `inbox/20261109-0324-muse-P-294-flex-build-review.md` (flex table build) | improved |
| OR | `inbox/20261108-2242-or-P-294-review.md` | improved |
| Super | `inbox/20261108-2323-super-P-294-review.md`, `2344`, `20261109-0237-super-P-294-review.md` | ok |
| VL | `inbox/20261108-2312-vl-P-294-review.md`, `2353`, `20261109-0222-vl-P-294-review.md` | ok |
| VLOC | `inbox/20261108-2323-vloc-P-294-review.md`, `2343`, `20261109-0237-vloc-P-294-review.md` | ok |

GLM's `inbox/20261109-1525-glm-P-294-flexrebuild.md` is a **count report, not a verdict** (says so in the file) — it does not count, and it does not need to: five seats already clear the bar. **The QUEUE row should be marked REVIEWED.** No further review work is owed on P-294; the flex pick itself remains the Owner's call (the Nov 7 HOLD stands until he picks).

## P-282 — REVIEWED ✓✓✓ (3 distinct seats)

| Seat | Filing(s) | Verdict |
|------|-----------|---------|
| Beam | `inbox/20261106-1035-beam-P-282-review.md` | improved |
| Beam | `inbox/20261106-1040-beam-P-282-guard-pass-2-verification.md` | verification (no verdict line; supports the review) |
| VL | `inbox/20261106-103107-vl-P-282-test-weights-tools-proposals.md` | ok (cutover batteries + tsc-gate proposals; reference run REPORTED) |
| VLOC | `inbox/20261106-102807-vloc-P-282-weights-verification.md` | OK |
| VLOC | `inbox/20261106-102900-vloc-P-282-review-stale-lane-check.md` | improved |

Flint's `inbox/20261107-1018-flint-P-282-owner-weights.md` carries **no verdict** — it is a work filing (NEXT steps: finalize one weights table, re-run the P-224 sweep post-de60e05). It does not count, and it does not need to: three seats clear the bar. **The QUEUE row should be marked REVIEWED.** Note for the record: the WR2 work itself was superseded by the model-first direction (Nov 6 salary weights dead); this settlement is about the review status of the item as filed, not a reopening of the weights question.

## P-288 — REVIEWED ✓✓✓ (3 distinct seats)

| Seat | Filing | Verdict | Target |
|------|--------|---------|--------|
| Super | `inbox/20261108-2347-super-P-288-review.md` | ok | Claude's Q4 work, tip `1e6372a` (parameter diff + FITTED-label test + witness tolerance fix) |
| VL | `inbox/20261108-2316-vl-P-288-review.md` | ok | Same Q4 work |
| VLOC | `inbox/20261109-0343-vloc-P-288-review.md` | ok | All guard passes verified (suite 290/290) + FITTED-label + Q4 diff (max dev 23.3 within Owner limit 50) |

Three different seats, all ok, all on the same Q4 work. **The QUEUE row should be marked REVIEWED.** Correction to the support-round prompt (§3 item 7 said "needs 2 more"): that was stale — the three ok verdicts were already on file. The seeded-hash check the prompt asked for is the method VLOC already applied (suite 290/290, determinism tests pass).

## P-328 — NOT REVIEWED yet (2 of 3; needs one more from a third seat — not MUSE's)

| Seat | Filing | Verdict |
|------|--------|---------|
| MUSE | `inbox/20261110-0335-muse-P-328-review.md` | ok — full independent verification: rebuilt the final 105-rule table (97 rules at `728b2c53` + items 3+7, counts 23/40/16/26 as expected), implemented Inkling's formula from the design text, reproduced **97 exact / 8 off-by-one / 0 hard misses with exactly Inkling's 8 residuals**; GLM's final-105 matches the construction with 0 differences; script committed (`_agents/muse/deliveries/p328-verify-2026-11-10.py`). One doc gap found (not a math error): the design text says BLK-gap zeroing applies when "dst==C" but the implementation zeroes it for all elite-line swaps — the design should state the broader rule. |
| Glyph | `inbox/20261110-0924-glyph-P-328-review.md` | ok — review of MUSE's review + Inkling's design |

**Needs 1 more review from a seat other than MUSE or Glyph.** The remaining reviewer should re-run MUSE's committed script (not re-derive from scratch) and confirm the 97/8 count, and confirm whether Inkling corrected the BLK-gap wording in the design. MUSE cannot review this item again (already filed).

## What was updated with this filing

QUEUE.md rows P-294, P-282, P-288 marked REVIEWED (UPDATE notes appended in the same push); P-328 row updated (2 reviews, needs 1 more). No review verdicts were changed — this filing only settles status from verdicts already on file.

— filed under FOR: P-294, P-282, P-288, P-328 · muse · 2026-11-11
