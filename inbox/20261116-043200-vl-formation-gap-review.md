SPEAKER: vl | TASK: Review the formation-gap test (report only, do not change) | DATE: 2026-11-16T04:32:00Z
FOR: P-342

## C. Formation-gap test review

### File reviewed
`colors/test/nfl/formation-gap.test.ts` (on `origin/architect/engine-and-seats`, commit `6dcf13b`). Read-only; no changes made.

### What the test asserts

**Reference table tests (under `tableValues()`):**
1. A roster built for its own base is worth 600250 at 70 OVR, whichever role plays DL5 (both bases, both DL5 roles).
2. DL5 = DT: a 4-3 roster loses 2700 in 3-4, a 3-4 roster loses 1800 in 4-3, gap = 900.
3. DL5 = EDGE: both lose 1800, gap = 0.

**MEASURED test (under `DEFAULT_VALUES`):**
4. Own-base rosters agree across bases (within one unit per spot); a mismatched roster loses value; numbers are REPORTED via `t.diagnostic`, not pinned.

### Analysis

The 2700/1800/900 asserts (tests 2 and 3) run under `tableValues()` — the retired fitted table wrapped as a ValueProvider. `valueprovider.ts` line 43-44: `tableValues()` returns `{ name: 'table', winsPerOvr: (row) => weights[row] * WINS_PER_UNIT }`. These are pure arithmetic on a frozen, retired table: the solver multiplies each slot's fixed weight by 70 OVR, adds flex penalties from the frozen 99-rule table, and the result is deterministic. The test proves the solver logic (Hungarian assignment, flex pricing, emergency handling) is unchanged by the P-318 ValueProvider seam — the table provider reproduces the old arithmetic bit for bit.

This is NOT a number-pin on the gap. The gap numbers (2700, 1800, 900) are properties of the retired table + frozen flex table, not of the MEASURED provider. The MEASURED gap (2773.0387 under `DEFAULT_VALUES`) is computed separately in test 4, where it is explicitly REPORTED via `t.diagnostic`, not asserted. The comment at line 14-16 states: "The exact numbers below (600250, 2700, 1800) are arithmetic on the RETIRED fitted table, so those tests run under tableValues(): they prove the solver logic is untouched by the seam. The MEASURED provider gets its own test that asserts structure and REPORTS the numbers (Owner: no weight is pinned)."

### Recommendation

**Verdict: OK — keep the 2700/1800/900 asserts.** They are arithmetic on a frozen retired table (solver logic regression check), not a pin on the MEASURED gap. The Owner has ruled nothing is pinned to 2773.04, and the test already respects that: the MEASURED numbers are reported, not gated. The retired-table asserts guard against silent solver regressions (empty spots, mispriced flex, double-counted stand-ins) and should stay.

No change recommended. The Owner decides.

Labels: REVIEW-OF: formation-gap.test.ts at 6dcf13b. VERDICT: ok. Reasoning above. VERIFIED by reading the source (test file, valueprovider.ts, slots.ts, flex.ts).
