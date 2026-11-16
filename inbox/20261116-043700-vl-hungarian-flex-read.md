SPEAKER: vl | TASK: Hungarian, lineup, flex, both providers — read, don't trust | DATE: 2026-11-16T04:37:00Z
FOR: P-333

## H. Hungarian, flex, providers — confirmed by reading

All work done from `git archive` extract of `origin/architect/engine-and-seats` at commit `6dcf13b`.

### Hungarian algorithm (`colors/src/core/hungarian.ts`)

Confirmed by reading the source:
- **Exact min-cost, not greedy:** Implements the Hungarian algorithm with potentials (O(n³)). The test at `colors/test/nfl/lineup.test.ts:103` ("equals brute force on 300 random matrices of size 1..7") verifies exactness against brute force.
- **O(n³):** The outer loop runs n times; each iteration scans n columns and updates n potentials — standard O(n³) Hungarian.
- **Rejects non-square:** Line 6: `for (const row of cost) if (row.length !== n) throw new Error('hungarian: matrix must be square')`. Test at line 98 confirms: `assert.throws(() => hungarian([[1, 2]]))`.
- **Deterministic ties by index order:** The comment at line 2-3 states "Deterministic: ties resolve by index order, so the same matrix always gives the same assignment." The implementation iterates j from 1 to n in order and uses `<` (not `<=`) for delta comparison, so earlier indices win ties.
- **300-matrix brute-force test:** Test at line 103 runs 300 random matrices (size 1–7, values -20 to 20, with ties and negatives) and compares to brute-force permutation search.

**Ways to make it wrong that the 300-matrix test does NOT catch:**
1. **Scale error:** Multiplying all costs by a constant doesn't change the assignment (Hungarian is scale-invariant for the assignment), so a scale bug in the cost matrix passed to `hungarian()` wouldn't be caught by the brute-force test — but it would change the lineup value returned by `optimalLineup`. The 300-matrix test only checks the permutation and the raw cost sum, not the semantic meaning of costs.
2. **Transpose:** If the caller transposes the matrix (rows↔cols) before calling `hungarian()`, the brute-force test would still pass (brute force over a transposed matrix gives the same min cost), but the player-to-spot mapping would be wrong.
3. **Corrupt tie-path:** If the `way[]` path reconstruction were subtly wrong but still produced a valid permutation with the same cost (degenerate ties), the brute-force test would pass because it only checks the cost equals brute force, not the specific assignment. With ties, multiple assignments have equal cost; a wrong tie-break would pass the test.
4. **Sign error in cost construction (lineup.ts, not hungarian.ts):** The cost matrix in `lineup.ts:60` uses `-(PLAYS + v[j] * (ovr - penalty))`. If the sign of `v[j] * penalty` were wrong (e.g., `ovr + penalty` instead of `ovr - penalty`), a flexed player could be overvalued. The brute-force test of `hungarian()` itself wouldn't catch this because it tests the algorithm in isolation.

### Flex table (`colors/src/sports/nfl/engine/flex.ts` vs `tools/mathlab/flex.json`)

Confirmed by programmatic comparison (VERIFIED):
- **99 rules** total in both `flex.ts` and `flex.json` (0 mismatches).
- **Tier counts:** {0: 23, 2: 10, 6: 43, 12: 23} — matches the Owner's 10 Nov ruling (23 at 12, 43 at 6, 10 at 2, 23 at 0).
- **Typed table matches JSON rule by rule:** every role→dest penalty identical.
- **17 roles** listed in both.

**No cell contradicts a pinned Owner override.** Reviewed the Owner rulings encoded in flex.ts:
- QB→FS: 12 (29 Oct: QB may flex ONLY to FS, at -12 since 8 Nov) ✓
- EDGE→OLB: 0 (28 Oct ruling) ✓
- TE→RB: 6 (was 4 in REV 4, now 6 per 9 Nov) ✓
- P→K: 2, K→P: 2 (Owner overrides) ✓
- 7 rules removed (FB→EDGE, FB→DT, FB→ILB, FB→OLB, CB→RB, DT→TE, EDGE→FS) — all absent ✓
- Cross-side floor: WR→CB/DIME/FS/NICKEL/SS all 6 (was 2) ✓
- TE→FS, TE→DIME: 12; ILB→FS, OLB→FS: 12 (new at 12) ✓
- SAM: no rules (SAM is a slot with dest OLB, takes OLB column) ✓

### Provider naming — kept separate

- Item G gap (2773.0387) measured under **MEASURED** provider (`DEFAULT_VALUES`, `slotWins20(slot, base) / 20`).
- `formation-gap.test.ts` retired-table asserts (2700/1800/900) use **RETIRED** table (`tableValues()`, `weight × WINS_PER_UNIT`).
- `slots.ts` WEIGHT table (QB=1000) is the "RETIRED REFERENCE TABLE (P-318)"; `valueprovider.ts` says it is "Reference and tests only; nothing in draft or lineup defaults to it."
- The solver's `DEFAULT_VALUES = measuredValues()` (name: 'measured').

Labels: VERIFIED by reading source and programmatic comparison (flex.ts vs flex.json: 99 rules, 0 mismatches).
