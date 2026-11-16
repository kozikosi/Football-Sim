SPEAKER: glyph | ROLE: council seat | TASK: Hungarian, lineup, flex, providers — read | DATE: 2026-11-16T02:27:00Z
FOR: P-333

## Hungarian (`colors/src/core/hungarian.ts`, 6dcf13b extract)
Read: `colors/src/core/hungarian.ts` (37 lines). (VERIFIED)
- **Exact min-cost assignment (not greedy):** implements Hungarian algorithm with potentials (`u`, `v`), augmenting paths via `p/way/minv/used`, O(n³) loops `for i..n` with inner `do/while` over columns; returns `col[i]` = column assigned to row i minimizing total cost. (VERIFIED by code structure)
- **O(n³):** standard cubic form (n augmentations × n reductions/scans). (VERIFIED/INFERRED from structure)
- **Rejects non-square:** `for (const row of cost) if (row.length !== n) throw new Error('hungarian: matrix must be square');` (VERIFIED)
- **Deterministic ties by index order:** scans columns in increasing `j` order (`for (let j = 1; j <= n; j++)`), updates `delta/j1` on strict `<` (`if (cur < minv[j]) { ... }` and `if (minv[j] < delta) { ... }`), so equal costs keep earlier indices. (VERIFIED by code)
- **Brute-force check:** `colors/test/nfl/lineup.test.ts` contains `brute()` and `test('hungarian: equals brute force on 300 random matrices of size 1..7 (with ties and negatives)', ...)` using seeded RNG, checks permutation and total cost equality vs brute force. (VERIFIED in read tests) I did not find a separate `colors/test/core/hungarian.test.ts` in 6dcf extract. (VERIFIED absence in extract)

**Ways to make it wrong that the existing 300-matrix (n≤7) test may NOT catch (INFERRED, not demonstrated):**
- **Sign/cost direction confusion at call sites:** Hungarian minimizes sum of `cost[i][j]`; if caller passes negated/positive values inconsistently with intent (lineup does `-(PLAYS + v*(ovr-penalty)) + EMERGENCY...`), algorithm is “correct” but assignment wrong for domain. Test covers algorithm on random matrices, not lineup cost construction.
- **Scale/overflow/precision at large magnitudes:** lineup uses constants like `ILLEGAL=1e12`, `PLAYS=1e7`, `EMERGENCY=1e5` and value*ovr terms; 300 small-integer random matrices (−20..20) don’t stress floating-point cancellation or magnitude interactions (e.g. if priorities become non-dominant, as in item D context) — algorithmic correctness holds but priority separation is a different property.
- **Transpose/row-column semantic swap at call site:** returning `col[i]=j` (row->column) is clear, but a caller expecting column->row or transposed cost would misinterpret; not caught by internal brute-force test.
- **Non-finite/NaN costs:** no guard against `NaN`/`Infinity` entries beyond `INF` sentinel use; comparisons with `NaN` break reduction logic. Random ints in tests avoid this.
- **Larger n / adversarial tie structures:** n≤7 brute-force covers small cases; implementation looks standard, but index-tie behavior under complex equal-delta paths at larger n is only indirectly covered (no proof here). (UNKNOWN additional failures)

## Flex table (`colors/src/sports/nfl/engine/flex.ts`, `tools/mathlab/flex.json`, 6dcf extract)
- `tools/mathlab/flex.json` parsed: **99 rules** total; tier counts `{ "0": 23, "2": 10, "6": 43, "12": 23 }`. (VERIFIED: Python/json count in extract)
- `colors/test/nfl/lineup.test.ts` asserts: “typed table equals tools/mathlab/flex.json…” rule by rule, `n==99`, tiers `{0:23,2:10,6:43,12:23}`, and specific absences/pins (e.g. QB>FS penalty 12, WR>DIME 6, DL5 derivation, etc.). (VERIFIED by read) `colors/src/sports/nfl/engine/flex.ts` in 6dcf extract contains `QB: { FS: 12 }` and the 99-rule structure consistent with tests (VERIFIED by grep/read earlier: QB FS 12 present).
- **Pinned Owner overrides / contradictions:** I did not identify a cell in the 6dcf typed/json table contradicting the pinned Owner overrides stated in tests/comments (QB→FS 12; cross-side floor WR>DB/NICKEL/DIME/FS/SS at 6; tiers as above; removed rules asserted undefined like FB>EDGE etc.). (VERIFIED by checked assertions; UNKNOWN if any other pinned override outside these checks exists)

## Provider separation (measured vs retired)
- **Item G/prompt context gap 2773.0387:** stated as measured under MEASURED provider at 6dcf13b (`DEFAULT_VALUES` is measured per `valueprovider.ts`/formation-gap MEASURED test reports). (REPORTED/INFERRED from prompt and code; not recomputed here)
- **`colors/test/nfl/formation-gap.test.ts`:** reference-table numeric tests run under `tableValues()` (retired fitted provider) asserting 600250/2700/1800/900; MEASURED-provider test reports numbers via diagnostics and asserts structure only. (VERIFIED)
- These are two measurements/providers of formation-gap behavior — **kept separate** as required. (VERIFIED)

**Ledger:** VERIFIED code/tests/json counts and behaviors read; INFERRED potential uncaught failure modes; REPORTED 2773.0387 measurement context; UNKNOWN untested edge cases and full provable correctness beyond cited tests.
