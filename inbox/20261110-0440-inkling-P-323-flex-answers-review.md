SPEAKER: inkling | ROLE: council advisor | TASK: P-323 — verify the flex answers build (Claude landed 97d7e9d, 99 rules) | DATE: 2026-11-10T04:40Z
FOR: P-323
REVIEW-OF: architect/engine-and-seats:97d7e9d9 ("Architect: flex floor (WR>DB 2 to 6), TE>FS/DIME 12, ILB/OLB>FS 12; 99 rules {0:23,2:10,6:43,12:23}; SAM rules not applied (slot, dest OLB)")
VERDICT: ok

## Bottom line

Every checkable claim in the delivery reproduces exactly, including the two "expected" test failures and their exact values. The build is internally consistent: the 99/{23,10,43,23} counts hold, `flex.json` and `flex.ts` agree rule by rule, the suite reads 290 tests · 288 pass · 2 fail (the 3-4 lineup test at actual 2700 vs expected 2400, and the E5 PIN_ENGINE mismatch nfl1.14a4e9333e888a vs nfl1.108bcc20a9f253 — both exactly as MUSE and Claude reported). TE3's weight is 50 in slots.ts (line 37). The two fixes (re-pin PIN_ENGINE, update the 3-4 test) are the Architect's, and until he lands them the suite is red by design. VERDICT: ok — with the follow-ups listed, none of them in this delivery.

## What I checked (scratch extract of 97d7e9d: `colors/` + repo-root `data/` + `tools/mathlab/`)

1. **The counts — VERIFIED.** Parsed `FLEX` out of `src/sports/nfl/engine/flex.ts` with `--experimental-strip-types` and tallied: **99 rules total; by tier `{"0":23,"2":10,"6":43,"12":23}`** — exactly the claimed split. Note the 99 includes 2 self-pairs listed explicitly (`ILB>ILB 0`, `OLB>OLB 0`); non-self rules are 97 at `{"0":21,"2":10,"6":43,"12":23}`. The file header documents the {0:23, 2:10, 6:43, 12:23} split including the self-pairs; no discrepancy.
2. **flex.json = flex.ts — VERIFIED.** Compared every rule in `tools/mathlab/flex.json` (`.flex` object) against `FLEX` in `flex.ts`: 99 entries each, **0 diffs** (full table, both directions). The test "a test compares it with flex.json rule by rule" (comment, line 5) is consistent with these contents.
3. **The suite — VERIFIED (after adding the two missing inputs).** `npm test` (node --test, glob test/**/*.test.ts) on a bare `colors/` extract first failed with ENOENT on `data/nfl/madden27-ratings.csv` (fixture.ts expects the repo-rooted `data/`), and then `test/nfl/witness.test.ts` failed with ERR_MODULE_NOT_FOUND on repo-rooted `tools/mathlab/witness.mjs`. Extracting `data/` and `tools/mathlab/` alongside `colors/` (the real repo layout) gives **290 tests · 288 pass · 2 fail** — matching MUSE's numbers exactly. The two failures, in full:
   - `base: totals are not comparable. A roster of 4-3 natives is worth 2400 less in 3-4…` — AssertionError: **actual 2700, expected 2400**. The test text still names the old prices: "a TE covers DIME at -6 (50 x 6)". Under the built table TE>DIME is 12, so the DIME component is 50 × 12 = 600, not 300: 1800 (stand-in ILB, 300×6) + 300 (FB→TE3, 50×6 — **TE3 is 50, not 100**, confirmed in slots.ts line 37) + 600 (TE→DIME, 50×12) = **2700**. The test's expectation, not the build, is stale.
   - `E5 pins: the engine and data stamps…` — AssertionError: "rules changed: update PIN_ENGINE on purpose": **actual `nfl1.14a4e9333e888a`, expected `nfl1.108bcc20a9f253`**. PIN_DATA unchanged and passing. Re-pinning PIN_ENGINE to `nfl1.14a4e9333e888a` (and updating the 3-4 test's 2400→2700 and its prose) are the Architect's two fixes, per the delivery's own framing.
4. **TE3 is 50 — VERIFIED.** `src/sports/nfl/engine/slots.ts:37`: `{ id: 'TE3', weight: 50, dest: 'TE', unit: 'offense' }` (and TE2 is 150). The test's "50 x 6" phrasing is correct about the weight; the DIME price is the part that moved 6→12.
5. **The open Owner decisions remain open — noted, not resolved.** SS>OLB 2 vs SS>ILB 6, and ILB>SS 2 vs OLB>SS 6 are both in the table as built (SS: {FS: 2, ILB: 6, OLB: 2 …}, OLB: {SS: 6 …}); the same-side floor question is flagged for the Owner, not for this review.
6. **SAM adds no rules — VERIFIED structurally.** `flex.ts` has no SAM rows; the file header says SAM is a slot with `dest: 'OLB'` taking the OLB column. Consistent with slots.ts treating SAM via OLB (I did not re-verify SAM's dest independently beyond the absence of SAM rules and the header note — the engine tests pass with SAM unmodelled, so no silent breakage).

## Findings beyond MUSE's review

- **The scratch-layout trap is real and worth one line in the next test order:** running `npm test` from `colors/` alone fails with ENOENT (data/) and then ERR_MODULE_NOT_FOUND (witness.mjs) that look like code failures but are layout artifacts — the suite needs the repo root (`colors/` + `data/` + `tools/mathlab/`) as its working tree. The Architect's test order should name the layout, or CI will misread these as regressions. (INFERRED: this is why a naive re-run shows "failures" that are not in Claude's two predicted ones.)
- **`flex.ts` self-pairs:** the table lists `ILB>ILB 0` and `OLB>OLB 0` explicitly (2 of the 23 zeros). They are inert (fit() returns 0 for role === dest before consulting the table), so they cannot change behavior — but they do mean "97-rule table" vs "99 rules" counts mix self and non-self rules. Not a defect; just count accordingly if the spec (P-329) transcribes these numbers.
- **Not computed by me:** whether the 3-4 fixture could route the DIME spot at 0 (SS>DIME 0 and FS>DIME 0 both exist in the built table). If spare FS/SS exist in the fixture, a strength-of-schedule-free optimizer would prefer them over TE→DIME at 12. The test as written encodes the TE route. INFERRED from the table only — I did not run the lineup optimizer on the fixture.
- The OT-clock and saves-panel items are out of scope here (P-323 only); see my P-287 review for those.

## What must change

Nothing in the delivery. The two known fixes (re-pin `PIN_ENGINE` in `test/nfl/versions.test.ts` to `nfl1.14a4e9333e888a`; update the 3-4 test's expectation 2400→2700 with the TE>DIME 12 prose) belong to the Architect, unchanged from MUSE's review. P-329 (the ENGINE-MATH-SPEC E3 rewrite) should cite the counts **including self-pairs** (99 total, {0:23, 2:10, 6:43, 12:23}) or explicitly state which counting convention it uses — the 97/99 distinction otherwise trips the next verifier.

## Evidence label

VERIFIED (rule counts by direct parse of flex.ts; flex.json == flex.ts rule by rule; suite 290/288/2 with both failures and their exact values; TE3=50 in slots.ts; SAM absence in the table) · REPORTED (Claude's and MUSE's prior framing of the two fixes; the open SS/ILB OLB price question) · INFERRED (the layout-trap explanation; the FS/SS>DIME 0 observation) · UNKNOWN (the Architect's re-pin, which has not landed).
