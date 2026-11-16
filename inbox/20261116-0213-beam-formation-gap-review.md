SPEAKER: beam | TASK: formation-gap-review | DATE: 2026-11-16T02:13Z
FOR: P-342

## C. Review formation-gap.test.ts — report only, no change

File: colors/test/nfl/formation-gap.test.ts (extracted tree @ 6dcf13b2). Read it; did not edit.

Assertions present:
- a roster built for its own base is worth 600250 at 70 OVR (retired table);
- a 4-3 roster loses 2700 in the 3-4;
- a 3-4 roster loses 1800 in the 4-3;
- gap 900;
- with a different player at DL5, both lose 1800 and gap is 0.

Verdict: these are arithmetic on a frozen retired table (the test pins `WEIGHT`/`SLOTS` under the retired provider), not a number-pin on the live gap. The retired table is a frozen reference; the solver logic against it is unchanged, so 2700/1800/900 are reproducible checksums of "the solver does what it used to do under the old table". They are NOT the MEASURED gap (2773.0387), which is a separate measurement under a different provider and which the Owner ruled is not pinned.

Recommendation: KEEP the asserts, but (a) label them explicitly as "retired-table reference, not the measured gap", and (b) do not extend them to the measured provider. The Owner decides whether they stay at all; my read is they are a regression guard on solver logic, not a gap pin.

Reasoning: deleting them removes the only check that the Hungarian solver's assignment logic is unchanged under the old table; keeping them does not constrain the measured gap, which emerges from the engine. The two numbers (2700 retired, 2773.04 measured) have distinct names in the record and must stay separate. (INFERRED from reading the test + AGENTS.md §2; did not re-run the test under a provider swap.)
