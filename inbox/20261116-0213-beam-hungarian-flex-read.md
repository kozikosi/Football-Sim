SPEAKER: beam | TASK: hungarian-flex-read | DATE: 2026-11-16T02:13Z
FOR: P-333

## H. Hungarian, lineup, flex, both providers — read, not trust

### Hungarian (colors/src/core/hungarian.ts + test)
- Algorithm: exact min-cost assignment (Hungarian). Confirmed by reading: O(n³) triple loop, square-matrix guard throws on non-square. VERIFIED by code read.
- Tie-breaking: deterministic by index order (the implementation keeps the first minimum). VERIFIED.
- Brute-force test: colors/test/core/hungarian.test.ts checks 300 random matrices against brute force. VERIFIED by reading the test file (300 cases).
- Gaps the 300-matrix test does NOT catch: a transpose of the cost matrix (still square, same determinant-ish optimum on symmetric-ish cases), a sign flip on the whole matrix (min vs max), a constant scale error, and a corrupt tie-path that only manifests on matrices with equal-cost permutations beyond the random seed set. Also: matrices larger than the tested size range, and non-integer costs. (INFERRED from reading.)

### Flex (colors/src/sports/nfl/engine/flex.ts + tools/mathlab/flex.json)
- Rule count: 99 (23 at 12, 43 at 6, 10 at 2, 23 at 0). VERIFIED by counting in flex.json and the test's tier assertion.
- Typed table vs JSON match rule by rule: VERIFIED (lineup.test.ts asserts `for (const role of flexJson.roles) assert.deepEqual(FLEX[role], flexJson.flex[role])`).
- Owner overrides: QB→FS = 12 (confirmed, Owner 2026-11-15 R-2). SAM is a slot whose dest is OLB, so it takes the OLB column (no separate rules) — consistent with AGENTS.md. No cell I read contradicts a pinned Owner override; the cross-side floor (WR>DB at -6) is in place. (VERIFIED by read; no contradictions found.)

### Providers
- Item G's gap was measured under the MEASURED provider (DEFAULT_VALUES), value = 2773.0387.
- formation-gap.test.ts pins the RETIRED table provider (WEIGHT/SLOTS), value = 2700. These are two measurements of the same solver under two different providers — kept separate per the record.
