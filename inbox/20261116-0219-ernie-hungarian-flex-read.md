SPEAKER: ernie | ROLE: council advisor | TASK: read the Hungarian, the lineup, flex and both providers — and try to break them | DATE: 2026-11-16T02:19Z
FOR: P-333

Extract `86f22d10` as in my `P-333-recheck` filing.

## 1. `colors/src/core/hungarian.ts` — the claims (VERIFIED by reading + running)
| claim | verdict | evidence |
|---|---|---|
| exact min-cost, not greedy | **TRUE** | potentials/j-v (`u`,`v`,`p`,`way`), augmenting-path Dijkstra-style inner loop; every row is matched once |
| O(n³) | **TRUE** | outer `n` iterations, inner `do/while` visits each column once (`used[j]`), each visit scans `n` columns → n·n·n |
| rejects a non-square matrix | **TRUE** | `for (const row of cost) if (row.length !== n) throw new Error('hungarian: matrix must be square')` |
| ties break by index order | **TRUE in the code, UNTESTED** | every comparison is strict `<` (`cur < minv[j]`, `minv[j] < delta`), so the first (lowest) index wins — but see §2 |
| tested against brute force on 300 random matrices | **TRUE** | `lineup.test.ts:103` — sizes 1..7, values −20..20, `makeRng(7)`, asserts the result is a permutation **and** its cost equals `brute(c)` |

**VERIFIED:** a one-character change to the tie-break (`if (minv[j] < delta)` → `<=`) keeps **300/300** matrices equal to brute force and returns a **different assignment on 5/300**:
```
variant (<= tie-break): cost == brute force on 300/300 matrices; assignment differs from shipped on 5/300
first differing matrix n=6 [[19,-11,20,-9,2,-4],[9,11,5,9,5,4],[-9,14,-1,-15,9,-1],[2,2,16,19,-14,-16],[-9,1,-4,17,15,1],[17,-9,0,17,7,12]]
  shipped 5,2,3,4,0,1 cost -46   variant 1,4,3,5,0,2 cost -46
```
**The 300-matrix test proves cost-optimality; it does not prove the documented tie rule.** For this product the tie rule is not cosmetic: it decides *which of two equal-value players is shown starting*, and it is the thing that must match between the engine and any reimplementation (Pre-Colors, the Python reference, the pack builder's totals check). A different-but-equal optimum is indistinguishable from a regression to the current test.

## 2. Ways to make it wrong that the 300-matrix test does NOT catch (all reasoned from the source; none reproduced as a live defect)
1. **The tie rule** (§1) — reproduced: a `<` → `<=` change is invisible.
2. **Scale.** The test's matrices are integers in [−20, 20]. The product's matrix carries `ILLEGAL = 1e12`, `PLAYS = 1e7`, `EMERGENCY = 1e5` and values up to ~1e5 — five orders of magnitude above the test. A scale-dependent fault (precision loss in `cur = cost - u[i0] - v[j]` when the terms are 1e12 and the differences are 1e-3; or a `Math.abs` guard) would pass 300/300 and fail in the product.
3. **Size.** Tested to n = 7; the product builds a **64×64** matrix (32 players + 32 fillers). A fault in the `way[]` reconstruction that only appears with a longer alternating path is untested.
4. **Non-finite costs.** `NaN`/`Infinity` costs: `cur < minv[j]` is false for NaN, so a NaN is silently skipped and the algorithm returns a *permutation* of the wrong cost — the test's permutation assertion would still pass and `brute()` would return NaN, so `assert.equal(NaN, NaN)` **passes** in `assert.equal` (strict `===`? no: `assert.equal` is `==`, and `NaN == NaN` is false → it would fail). INFERRED, not run: a NaN matrix probably fails the test, but by accident rather than by a guard. There is no explicit "cost must be finite" check anywhere in `hungarian.ts` or `lineup.ts`.
5. **Transpose.** Caught: a transposed solver returns a different cost on a non-symmetric matrix.
6. **Row/column role swap** in `lineup.ts`'s matrix build (players as columns instead of rows) — caught by the lineup's brute-force test on a tiny spot list, but *not* by the 300-matrix test, which only exercises `hungarian` directly.

**Recommendation (a §5 test, not a fix):** add a 20-line test that (a) runs the shipped `hungarian` on 20 *product-shaped* matrices (n = 64, costs drawn from the real ladder magnitudes 1e5/1e7/1e12 plus values ≤ 1e5) and compares against a second implementation's cost; (b) pins the tie rule on one 4×4 matrix with a known double optimum, asserting the exact returned permutation. (b) is the cheap one and the one I would land first.

## 3. `flex.ts` vs `tools/mathlab/flex.json` (VERIFIED)
```
typed rules 99   json rules 99   IDENTICAL rule by rule
typed tier counts {"0":23,"2":10,"6":43,"12":23}
```
Matches the header (`23 at 12, 43 at 6, 10 at 2, 23 at 0`) and the brief.

**Cells where the table could be read as contradicting a pinned Owner override — none.** I checked every pinned cell:
- QB = `{ FS: 12 }` — only FS, at 12 ✓ (Owner 2026-11-15, R-2).
- TE>DIME = 12, TE>FS = 12, ILB>FS = 12, OLB>FS = 12 ✓ (Owner 10 Nov, item 3).
- WR>CB/DIME/FS/NICKEL/SS all = 6 ✓ (cross-side floor, 10 Nov: 2 → 6).
- The seven removed rules (FB>EDGE/DT/ILB/OLB, CB>RB, DT>TE, EDGE>FS) are **absent** from the typed table ✓.
- Owner corrections at 6 (EDGE>ILB/OG/OT/RB/NICKEL, DT>C, DT>OG, EDGE>C) and OG>C at 2 ✓.

**Two cells that look inconsistent and are not** (naming them because a reader will trip): `ILB>SS = 2` while `OLB>SS = 6`, and `SS>ILB = 6` while `SS>OLB = 2`. These are the asymmetries the Owner ruled on at R-7 ("an ILB is the more valuable player, so moving one to safety costs less. Table stands."). I see no contradiction; I would add a one-line comment at those four cells citing R-7 so the next reader does not "fix" them.

## 4. Which provider each gap was measured under (the brief's last question)
- **MEASURED** (default, `DEFAULT_VALUES`): the **2773.0387** gap in `lineup.test.ts`'s REPORT and in `formation-gap.test.ts`'s MEASURED test (structure only, numbers reported). This is the live product number.
- **RETIRED table** (`tableValues()`): the **2700 / 1800 / 900** asserts in `formation-gap.test.ts`, run under an explicit `tableValues()` argument. This is arithmetic on a frozen table, not a product number (see my `formation-gap-review`).
- They are two measurements of the same mechanism under two providers and must never be quoted in the same sentence without the provider named.

## Ledger
- VERIFIED: exact/O(n³)/square-check/brute-force-300 all true; the tie rule is untested (5/300 assignments change under `<`→`<=` at equal cost); typed FLEX == flex.json (99, 23/10/43/12); every pinned Owner cell matches; 2773.0387 is MEASURED, 2700/1800/900 are the retired table.
- INFERRED: scale, size (n=64), and non-finite-cost classes are untested (§2.2–2.4).
- UNKNOWN: whether `lineup.ts`'s matrix has ever been exercised at n=64 with an *infeasible* pocket (all-ILLEGAL column) in a test — I did not construct one.