SPEAKER: or | TASK: C — Review formation-gap test (report only) | DATE: 2026-11-16T02:21:42Z
FOR: P-342

## C. Review of `colors/test/nfl/formation-gap.test.ts` (report only — no change)

The question: are the `2700 / 1800 / 900` asserts arithmetic on a frozen retired table (fine to keep), or are they a number-pin on the gap (should go)? **Review verdict: keep them.** They are deterministic arithmetic on the frozen retired table (`tableValues()`), and the test itself states that explicitly.

### Evidence from the test file

The file header (lines 14–16) states verbatim:

> P-318 (14 Nov 2026): the solver now spends a ValueProvider, MEASURED by default. The exact numbers below (600250, 2700, 1800) are arithmetic on the RETIRED fitted table, so those tests run under `tableValues()`: they prove the solver logic is untouched by the seam. The MEASURED provider gets its own test that asserts structure and REPORTS the numbers (Owner: no weight is pinned).

The tests in question:
- `loss(base, dl5, tableValues())` computes the formation gap under the retired table.
- Line 30–33: `loss('4-3','DT') === 2700`, `loss('3-4','DT') === 1800`, gap `=== 900`.
- Line 35–39: `loss('4-3','EDGE') === 1800`, `loss('3-4','EDGE') === 1800`, gap `=== 0`.
- Line 27–29: own-base value `=== 600250` under `tableValues()`.

The retired table test uses `tableValues()` explicitly, and the exact numbers are pin-able because they are derived from a frozen dataset (no measurement noise). These numbers are distinct from the MEASURED gap (reported at 2773.0387 under DEFAULT_VALUES, see the lineup.test.ts REPORT line and item G's recomputation).

### Reasoning

1. **The retired table is frozen.** Once a table is retired (P-318), its values no longer move. Exact arithmetic on it is deterministic; it does not depend on any live measurement, model change, or source-backed fact that could shift. Pinning `2700` against a frozen table is not "pinning a number" — it is asserting that the solver computes the same frozen-table result every time.

2. **The test's own header separates concerns.** It says the exact numbers "prove the solver logic is untouched by the seam" and that MEASURED "gets its own test that asserts structure and REPORTS the numbers". This confirms intent: the 2700/1800/900 asserts guard solver correctness under the retired table; the MEASURED test guards structure under the live provider.

3. **The Owner's ruling concerns the MEASURED gap (2773.04), not the retired table.** "Nothing is pinned to the gap number" means the live MEASURED gap must be allowed to emerge and move. The retired-table pins do not interfere with that: they are under `tableValues()`, not `DEFAULT_VALUES`.

4. **The MEASURED test already does exactly what the Owner wants.** Lines 49–57 assert structure (`Math.max - Math.min < 32`, `a > 0 && b > 0`) and report numbers via `t.diagnostic(...)` — they do not pin 2773.04 or any other value.

### Recommendation

Keep the 2700/1800/900 asserts as-is. They are arithmetic on a frozen retired table and serve as a stable regression guard for solver logic under the retired table. They do not pin any live/gap number, and they do not conflict with the Owner's directive. No change needed.

If a future change modifies the retired table (e.g., someone revisits P-318), these asserts will fail correctly — that is the intended behavior, not a defect.

— or · council · 2026-11-16T02:21:42Z