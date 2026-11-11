# Council — follow-up 4: Pickle filed (review him), the Ledger needs two more, Z.ai's next batch is ready

This is a follow-up to follow-up 3 (council/muse `a32f28f1`). That prompt still stands. This one tells you what has come in since, and what is most useful now.

## What has come in

**Pickle filed — and MUSE missed him the first time.** Pickle's P-341 answer landed on council/pickle at 14:26 HST on 2026-11-10 (`494be9fa`), minutes after MUSE's review wave extracted the branches. MUSE has now read it and reviewed it (`inbox/20261111-0500-muse-P-341-pickle-answer-review.md`, VERDICT ok), and DS reviewed it too (`inbox/20261111-0034-ds-P-341-pickle-answer-review.md`, ok). **Pickle's answer needs one more review for REVIEWED.** It is the strongest P-341 filing on the C>OG question and the clearest statement of why the Ledger wins (fact-shaped vs worth-shaped inputs). His 15-row table reproduces exactly (MUSE ran his script verbatim: 13 exact, 1 straddle, 1 miss). Two things to carry forward: (a) the E < 0.222 acceptance test for the FB straddle (the Ledger has since measured E_FB at 0.1265 — inside the band); (b) the per-slot C>OG proposal, which needs an Owner decision before anyone builds it (does his 6 mean either guard spot or the cheaper one?). **One correction from MUSE (verified by re-run):** Pickle's "exposure is load-bearing only for the FB family" holds only under the stale 200 table. Under the correct engine weights (C 150, OLB 150), the plain guard over-prices OLB>ILB and OLB>SS to tier 12, and exposure is what saves them — exposure is load-bearing for the FB family AND the OLB family. The 13/15 count is unchanged; the mechanism is broader, and it strengthens the Ledger's case.

**Pickle also reviewed Z.ai's Plays Ledger answer** (`inbox/20261111-0023-pickle-P-341-zai-answer-review.md`, improved) — his three new defects are all correct (guard column not on the live table; C>OG footnote overstates what measured v does; FB tier instability as a Step-1 test). MUSE reviewed Pickle's review (`inbox/20261111-0501-muse-P-341-pickle-zai-glyph-ds-reviews-review.md`, ok). **Z.ai's answer now has four reviews** (MUSE, GLM, Inkling, Pickle — all improved). What remains is for Z.ai to land the corrections.

**Glyph reviewed MUSE's weight-source investigation** (`inbox/20261111-0410-glyph-P-340-weight-source-review.md`, ok) — independently verified the source facts, the four ratios exactly, and the 12-row guard impact. **The weight source now has three independent confirmations** (MUSE, Inkling, Glyph). It is settled. One prose error in Glyph's review: he writes the architect flex.json has "107 rules" — it is **99 rules** (MUSE verified at tip and at 97d7e9d). The 107 is the retired REV 4 count; his analysis evidently ran against the right table, so it is a typo, not an error in his verification.

**Z.ai's Ledger Phase 1 landed and MUSE reviewed it** (council/vl `0af69ad8`; `inbox/20261111-0435-muse-P-341-zai-ledger-phase1-review.md`, ok). Every script re-runs byte-identically; the engine run is genuine (1,300 games); R1 purity 100% on countable channels, yardage 99.61% with a named 0.39% engine-artifact residue; the FB socialism measurement lands (FB 0.1265 play share, 197.7 value per play-share). The DIME disagreement (0.0694 vs 0.15) is honestly reported and is the live Phase 1 question.

**Z.ai's next batch is ready.** MUSE has written the longest useful prompt for him (`_agents/muse/deliveries/prompts-2026-11-05/zai-merge-ledger-followups-2026-11-11.md`): Part A the merge (updated with the LOO, the lambda framing, the weight-source settlement, the Ledger exposures, Pickle's findings, and the correct-weights correction); Part B the Ledger follow-ups (DIME investigation, WR1 trigger, 3-4 staging); Part C the Phase 2 harness prep (build the ingestion machine against the specified schema; do NOT fetch the data). The Owner controls when it is sent.

## What needs doing next (in order of usefulness)

**A. Review Z.ai's Ledger Phase 1 (P-341) — needs two more reviews.** MUSE's review is filed (ok). Re-run the pipeline yourself (`run_engine.ts` + `stage_plays.py` + `ledger.py` + `measure_ledger.py` — all reproduce byte-identically from the shipped files) and press on: the DIME disagreement (is it the package tables or DIME_W?), the WR1 trigger (deep catches almost never fire), the 3-4 gap (Phase 1 staged 4-3 only), and whether the yardage residue is really an engine artifact. File your review in the inbox.

**B. Review Pickle's P-341 answer — needs one more review.** MUSE (ok) and DS (ok) are in. Read the answer, check his 15-row table against his reproduction script (it runs verbatim), and press on the per-slot C>OG proposal and the fact/worth split. One review closes it.

**C. Re-run DS's dispersion-matching synthetic (P-342).** Still unconfirmed by a second seat: analytic dispersion matching overstates lambda by 23–75% (`_agents/ds/tools/p342-ident.mjs`). This is the most consequential design-review finding if it holds. Re-run it, confirm or correct, file your review.

**D. Re-run DS's branch test (P-342).** Still unconfirmed: the keyed scheme couples a genuine policy branch (4th & ≤6 vs ≤2: 6.34×). Re-run `p342-branchtest.mjs`, confirm or correct, file your review.

**E. Write the Phase-1 data brief (P-342, GLM F1).** The design's §9 points at §11 (Rejected alternatives) for the data, and §13 references a field list in a brief that does not exist. Write it: exact fields, seasons, format, one row per play. File it as a P-342 note. This unblocks the ask the council is waiting to send when the Owner gives the go.

**F. P-326 — formal recheck of localWins20.** Still owed by a council seat, not MUSE (own-math constraint). Use the live 99-rule table as your oracle, not your local flex.json.

**G. P-339 — verify and close.** Claude's census answered the centre diagnostic. Verify the census finding (re-run `flexcensus.mjs` if you can) and confirm whether P-339 is resolved.

**H. Review backlog.** P-328 needs one more review. Inkling Q1 needs one more review. P-282 is done but not marked REVIEWED. P-294 has five reviews but is not marked REVIEWED. P-288 needs two more reviews. Pick one and file yours.

## How to work

- Take the top item from `_agents/QUEUE.md` (`node tools/council.mjs next`), do it or review it, and push after every finished file/task — commit and push often, WIP if a chat gets long. A timed-out chat loses unpushed work; a pushed commit survives it.
- **Oracle discipline:** before re-running any derivation, check your flex.json rule count. 99 rules = live (architect `97d7e9d` or the corrected council/muse mirror). 107 rules = retired REV 4 — do not use it. Name the oracle (branch + commit + rule count) in your filing's method, not just in the evidence section. (Glyph's review shows even careful seats can write the wrong count — check, don't trust memory.)
- Reviews go in `inbox/<UTC>-<seat>-P-<ID>-<slug>.md`, first line `SPEAKER: … | ROLE: … | TASK: … | DATE: …`, then `FOR: <ID>`. Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN. Three different seats' ok/improved = REVIEWED.
- Do not assign work to a named agent. Do not touch the product file or the engine — only the Architect builds those. Do not review your own work.
- If you find a real defect, say so plainly with the receipt (command + output). If you find an error in MUSE's numbers, correct the record — Inkling and Glyph both did, and the record is better for it.

## Innovate

Within any of the above: if you see a better way to test the merge, a sharper question for the Owner, a measurement the council hasn't run, or a use for the within-one-tier finding nobody has named — do it or note it as an `IDEA:`. The live questions now are the DIME disagreement (Ledger Phase 1), the lambda ruling (Owner's), the estimator (DS D4, needs one re-run), and the data brief (GLM F1, needs writing). The council's job now is to make those concrete enough for the Owner and the Architect to act on.
