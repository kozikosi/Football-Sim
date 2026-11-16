**FOR: Engine test work — lineup test rewrite, formation-gap review, optimizer defect test (open to all seats)**

**Context.** Claude (the Architect) timed out on the 1c pack builder; the 1c work did not land (the branch is still at `86f22d10`; the `sim/` folder has only the 1b files). The tests for 1c are owed, but the code is not in the repo yet — do not test 1c code that isn't there. The test work below CAN be done now, on the code that is in the repo. The Architect owns the engine — the council drafts tests and patches as §5 proposals in its inbox; the Architect integrates them. The Architect decides whether to accept each proposal. The three seats who filed on P-333 (Beam, Inkling, Ernie) have already contributed; the test items below are open to the rest of the council. Take the top item via `node tools/council.mjs next` — do it or review it. Three confirmations by three different seats = REVIEWED. No seat reviews the same item twice.

**Part 1 — Rewrite `lineup.test.ts` (option (b)) as a §5 patch proposal.**

The test (`colors/test/nfl/lineup.test.ts:26`) asserts `WEIGHT[id] == design[id]` key by key against `tools/mathlab/design.json`. `WEIGHT`/`design.json` are the RETIRED reference table (`colors/src/sports/nfl/engine/slots.ts`: "RETIRED REFERENCE TABLE (P-318, 14 Nov 2026)"; `valueprovider.ts`: "The retired fitted table as a provider… Reference and tests only"). The council (Rev 6, unanimous, five seats) decided the test should be REWRITTEN (option (b)).

Draft the rewrite as a §5 patch proposal (target build + sha256, WHERE anchor, old → new, WHY, SAFE ALONE?, HOW TO CHECK). Keep the structural guards (32 spots, QB == 1000 as scale normalisation, multiples of 5, 16/14/2 unit counts, ID set equality). Drop the `design.json` equality (move it to `tools/mathlab/check-design.mjs`, which already loads `design.json`). Add the guard `assert.equal(DEFAULT_VALUES.name, 'measured')` (fails if WEIGHT is wired back into the solver). Refile out of the engine suite (e.g. `weights-table.test.ts` or the lab gate). Keep the flex typed-table↔`flex.json` equality intact (different animal — single live source of truth).

Also drop the number from the test comment: the comment's "(it is 2700 today)" loses the parenthetical number entirely — it does not get replaced with another number. The Owner ruled nothing pins to the 2773 number.

Do NOT edit the engine. Draft the patch; the Architect integrates it.

**Part 2 — Review the formation-gap test (report, do not change).**

`colors/test/nfl/formation-gap.test.ts` still pins the reference-table 2700/1800/900 as asserts (table arithmetic, not the measured gap). The Owner ruled nothing pins to the 2773.04 number, but has not ruled on whether these table-arithmetic asserts should stay. Review the test and report: are the 2700/1800/900 asserts table arithmetic (and therefore fine to keep) or are they a number-pin (and therefore should go)? State your reasoning and your recommendation. Do not change the test — report only. The Owner decides.

**Part 3 — Write a failing test for the optimizer EMERGENCY defect (test + §5 patch proposal).**

A council seat found that the optimizer's `EMERGENCY` constant (1e5) is not strictly above the value scale (largest whole-lineup value ~854,227; largest single-spot swing 98,932), and measured that the shipped constants accept about one avoidable emergency fill per roster (300 seeded rosters: 164/300 assignments change with a strict constant; mean emergency fills 1.010 → 0.000). Write a test that FAILS on the current tree (demonstrating the avoidable emergency fill) and PASSES with a strictly-scaled constant (derived from the provider, e.g. 2 × Σv × MAX_OVR). Ship the test and the fix as a §5 patch proposal (`colors/src/sports/nfl/engine/lineup.ts` is the Architect's — you do not edit it). The Architect decides whether to accept the fix.

Note: the Hungarian algorithm itself is exact (three seats verified it by reading `colors/src/core/hungarian.ts` + `colors/src/sports/nfl/engine/lineup.ts`). This part is about the priority-ladder constants, not the algorithm.

**Part 4 — Take queue work.**

Run `node tools/council.mjs next`, take the top line, and do it or review it. The test items above are the priority; after them, the queue is the work. If you take a test item, file your proposal in your inbox; if you review one, file your review. A review you can do beats new work in the same tier.

**Filing.** One file per item on your own branch, `inbox/<UTC yyyymmdd-hhmm>-<seat>-<slug>.md`, first line `SPEAKER: <seat> | TASK: <task> | DATE: <UTC>`, then `FOR: <ID>`. For a patch proposal, use the §5 form (target build + sha256, WHERE anchor, old → new, WHY, SAFE ALONE?, HOW TO CHECK). For a review, state your verdict (improved / ok / credible) and your reasoning. Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN. Do not invent data; do not silently "correct" a number.

**Innovation.** The council's job here is to make the tests stronger and the engine more trustworthy. If you see a better test, a gap in coverage, or a falsifier that would kill a proposal, propose it. Think around the issue, not just execute it.
