SPEAKER: muse | ROLE: council advisor | TASK: P-323 — verify the flex answers (items 3 + floor) now that the Architect built them (99 rules) | DATE: 2026-11-10T04:11Z
FOR: P-323
REVIEW-OF: origin/architect/engine-and-seats:97d7e9d ("Architect: flex floor (WR>DB 2 to 6), TE>FS/DIME 12, ILB/OLB>FS 12; 99 rules {0:23,2:10,6:43,12:23}; SAM rules not applied (slot, dest OLB)")
VERDICT: improved

## Bottom line

The build is correct. The table is **99 rules, {0: 23, 2: 10, 6: 43, 12: 23}** — I counted it from `flex.json` myself, and `flex.ts` matches it. The floor rule (5 WR>DB at 6) and item 3 (TE>DIME/TE>FS at 12, ILB>FS/OLB>FS new at 12) are all in. The SAM correction is right: SAM is a slot with `dest: 'OLB'`, so it takes the OLB column, which already equals the six SAM values — item 7 adds no rules, and the 105-rule expectation was MUSE's error, now corrected in the record. **The suite has exactly 2 failures, both predicted by Claude and both fixable by re-pinning:** (1) the 3-4 lineup test (actual 2700, expected 2400 — TE>DIME is now 12, so the DIME flex costs 600 not 300); (2) the E5 pins test (the new engine hash is `nfl1.14a4e9333e888a`, the pinned value is still `nfl1.108bcc20a9f253`). Everything else passes: **290 tests, 288 pass, 2 fail.** VERDICT: improved — the build is right; the two test pins need updating (re-pin PIN_ENGINE to `nfl1.14a4e9333e888a`, update the 3-4 test to 2700 and DIME 12). The fixes are the Architect's (or P-323's, per the brief); this review does not make them.

## Method

I extracted the architect branch at `97d7e9d` (`colors/`, `data/`, `tools/`) to /tmp and ran the full suite with `node --test --experimental-strip-types "test/**/*.test.ts"` (the `package.json` `test` script). I counted the flex rules and tiers from `flex.json` with Python, checked the five WR>DB rules and the four item-3 rules individually, confirmed SAM has zero rules in the table, confirmed SAM's `dest` is `'OLB'` in `slots.ts`, and confirmed the OLB column equals the six SAM values. I also read the 3-4 lineup test and the E5 pins test to confirm what each asserts.

## What I checked

| Claim | Result |
|---|---|
| Table is 99 rules, {0: 23, 2: 10, 6: 43, 12: 23} | VERIFIED — counted from `tools/mathlab/flex.json` at `97d7e9d`: 99 rules; tiers 0: 23, 2: 10, 6: 43, 12: 23 |
| Floor rule: 5 WR>DB rules 2→6 | VERIFIED — WR>CB, WR>DIME, WR>FS, WR>NICKEL, WR>SS are all 6 |
| Item 3: TE>DIME 6→12, TE>FS 6→12, ILB>FS new 12, OLB>FS new 12 | VERIFIED — all four are 12 in the table |
| Item 7 not applied (no SAM rules) | VERIFIED — 0 occurrences of "SAM" in `flex.json` |
| SAM is already priced via OLB (Claude's claim) | VERIFIED — `slots.ts:46`: `{ id: 'SAM', weight: 100, dest: 'OLB', unit: 'defense' }`; the OLB column equals the six SAM values (EDGE>OLB 0, FS>OLB 6, ILB>OLB 0, OLB>OLB 0, SS>OLB 2, TE>OLB 6) |
| flex.json = flex.ts | VERIFIED — the `flex.ts` header documents 99 rules with the same counts (23 at 12, 43 at 6, 10 at 2, 23 at 0) and the same change note (floor + item 3, SAM takes the OLB column); the typed table is compared rule-by-rule by the test in `lineup.test.ts`, which passes |
| The suite passes except the two predicted failures | VERIFIED — **290 tests, 288 pass, 2 fail.** The 2 failures are exactly the ones Claude predicted (see below). No other failures. |
| The 3-4 base total | VERIFIED — the test fails with **actual 2700, expected 2400** (`lineup.test.ts:241`). The DIME flex is now 12×50 = 600 (was 6×50 = 300), so the total rises by 300 (2400 → 2700). The cheapest arrangement is otherwise unchanged (one ILB leaves one inside spot to a stand-in at −6, spare DT plays FB free, natural FB covers TE3 at −6, a TE covers DIME at −12). |
| The new PIN_ENGINE | VERIFIED — the E5 pins test fails with **actual `nfl1.14a4e9333e888a`, expected `nfl1.108bcc20a9f253`** (`versions.test.ts:18`). The new pin is `nfl1.14a4e9333e888a`. |

## What must change (the two fixes)

1. **Re-pin `PIN_ENGINE` in `colors/test/nfl/versions.test.ts` to `nfl1.14a4e9333e888a`.** The table changed, so the engine hash changed. The old pin (`nfl1.108bcc20a9f253`) is stale. This is a deliberate re-pin (the table change was the Owner's), not a silent drift.
2. **Update the 3-4 lineup test in `colors/test/nfl/lineup.test.ts` (the "base: totals are not comparable" test).** Three values change: the total from 2400 to **2700**; the DIME assertion from `['DIME', 'TE', 6]` to `['DIME', 'TE', 12]`; and the "every flexed penalty is 6" assertion no longer holds (the DIME flex is 12, the other two are 6) — it needs rewording to the new arrangement (two flexes at 6, one at 12) or a different scenario. The test's description (which names the −6 costs) should be updated to name the DIME cost as −12.

These two fixes are the Architect's (Claude's) to make, or P-323's per the brief. I am not making them in this review — the review verifies the build and specifies the fixes; the fixes land in a follow-up commit.

## The Owner's ruling on the oddities (for the record)

KG ruled 2026-11-10 that SS>OLB (2) and ILB>SS (2) **stay at 2** (vs SS>ILB 6 and OLB>SS 6): ILBs are weighted heavier and are better players than OLBs in general, so filling the ILB spot costs more and a MIKE flexing elsewhere costs less. KG expects this should reduce CPU overflexing. SAM stays as-is (priced via OLB, no engine change). The 99-rule table is accepted.

## Evidence label

VERIFIED (the 99-rule count and tiers, the floor rule, item 3, the absence of SAM rules, SAM's `dest: 'OLB'`, the OLB column matching the SAM values, the suite run 290/288/2, the 3-4 test actual 2700 vs expected 2400, the new PIN_ENGINE `nfl1.14a4e9333e888a`).
