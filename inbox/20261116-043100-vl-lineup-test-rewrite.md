SPEAKER: vl | TASK: Rewrite the lineup weight test as a §5 patch proposal | DATE: 2026-11-16T04:31:00Z
FOR: P-342

## B. Lineup weight test rewrite — §5 patch proposal

### Target build
`colors/` on `origin/architect/engine-and-seats`, commit `6dcf13b`.

### WHY
The `table:` test at line 26 of `colors/test/nfl/lineup.test.ts` asserts `WEIGHT[id] === design[id]` key by key against `tools/mathlab/design.json`. That table is RETIRED (P-318, 14 Nov 2026): `slots.ts` says "RETIRED REFERENCE TABLE … Draft, lineup and the board no longer read these weights: they ask a ValueProvider (valueprovider.ts), whose default is MEASURED". `valueprovider.ts` says the retired table is "Reference and tests only". The solver spends `DEFAULT_VALUES` (MEASURED), not the retired table. Five council seats unanimously decided the test should be REWRITTEN (not deleted, not kept as-is).

### WHERE (anchor strings, not line numbers)

Anchor 1 — the `table:` test block in `colors/test/nfl/lineup.test.ts`:
```
test('table: 32 spots, QB 1000, every weight a multiple of 5, equal to tools/mathlab/design.json key by key', () => {
  assert.equal(SLOTS.length, 32);
  assert.equal(WEIGHT.QB, 1000);
  for (const s of SLOTS) assert.equal(s.weight % 5, 0, s.id);
  assert.deepEqual(Object.keys(design).sort(), [...SLOT_IDS].sort());
  for (const id of SLOT_IDS) assert.equal(WEIGHT[id], design[id], id);
});
```

Anchor 2 — the `base:` test comment in the same file (the "(it is 2700 today)" parenthetical):
```
// FIXED 15 Nov 2026 (Owner: no weight pinning; the 13 Nov de-gate was a carry, the ruling was fix). The old test asserted the gap as a hard-coded
// 2400 (pinned 9 Nov), then REPORTED it. A total is the wrong thing to pin: it moves whenever the value provider, the flex table or the third stand-in
// moves (it is 2700 today). What must hold for ANY values is the accounting:
```

### old → new

**Old (anchor 1):**
```
test('table: 32 spots, QB 1000, every weight a multiple of 5, equal to tools/mathlab/design.json key by key', () => {
  assert.equal(SLOTS.length, 32);
  assert.equal(WEIGHT.QB, 1000);
  for (const s of SLOTS) assert.equal(s.weight % 5, 0, s.id);
  assert.deepEqual(Object.keys(design).sort(), [...SLOT_IDS].sort());
  for (const id of SLOT_IDS) assert.equal(WEIGHT[id], design[id], id);
});
```

**New (anchor 1):**
```
test('table: 32 spots, QB 1000, every weight a multiple of 5 (structural guards only; values are MEASURED, not pinned to design.json)', () => {
  assert.equal(SLOTS.length, 32);
  assert.equal(WEIGHT.QB, 1000);
  for (const s of SLOTS) assert.equal(s.weight % 5, 0, s.id);
  assert.deepEqual(Object.keys(design).sort(), [...SLOT_IDS].sort());
});
```

**Old (anchor 2):**
```
// moves (it is 2700 today). What must hold for ANY values is the accounting:
```

**New (anchor 2):**
```
// moves. What must hold for ANY values is the accounting:
```

### Additional changes (same file)
- Keep `import { DEFAULT_VALUES, WINS_PER_UNIT } from '../../src/sports/nfl/engine/valueprovider.ts';` — already present.
- Add to the `table:` test block (after the two existing tests, before `// ---- flex ----`):
```
test('table: DEFAULT_VALUES is the measured provider (fails if the retired table is wired back into the solver)', () => {
  assert.equal(DEFAULT_VALUES.name, 'measured');
});
```
- Keep the `flex:` test asserting `FLEX` equals `tools/mathlab/flex.json` rule by rule (99 rules, tiers {0:23, 2:10, 6:43, 12:23}) — unchanged.

### Move the test
Move the rewritten `table:` test (and the new `DEFAULT_VALUES` test) out of the engine test suite into a new file `colors/test/weights-table.test.ts` (or into `tools/mathlab/check-design.mjs`, which already loads `design.json`). The structural guards (32 spots, QB==1000 as scale normalisation, every weight a multiple of 5, unit counts 16/14/2, ID set consistency) travel with it.

### SAFE ALONE?
Yes. The patch only changes test assertions and moves a test file; it touches no engine source, no flex table, no protected constant. It can land by itself.

### HOW TO CHECK
```
cd colors/  (on architect/engine-and-seats at 6dcf13b)
node --test --experimental-strip-types "test/weights-table.test.ts"
```
Expected: all tests pass. `DEFAULT_VALUES.name === 'measured'` passes. The old `WEIGHT[id] === design[id]` assertion is removed.

### Lab gate destination
Move the `WEIGHT[id] === design[id]` key-by-key equality into `tools/mathlab/check-design.mjs` (already loads `design.json`) as a lab-level check that the design file is self-consistent, not an engine weight pin.

Labels: This is a §5 patch proposal (filing, not a fix). The Architect integrates it. — INFERRED reasoning from source reading; no engine edit attempted.
