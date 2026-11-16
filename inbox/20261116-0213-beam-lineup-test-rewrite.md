SPEAKER: beam | TASK: lineup-test-rewrite | DATE: 2026-11-16T02:13Z
FOR: P-342

## B. Rewrite the lineup weight test — §5 patch proposal

Target build: origin/architect/engine-and-seats @ 6dcf13b2 (file colors/test/nfl/lineup.test.ts).
WHERE: the test block `test('table: 32 spots, QB 1000, every weight a multiple of 5, equal to tools/mathlab/design.json key by key', () => { ... })` at the top of the `// ---- table ----` section, plus the `const design = JSON.parse(...design.json)` loader and the comment `// What a spot is worth ...` above `unit`.

### old → new (exact code)

Remove these lines:
```
const design = JSON.parse(read('../../../tools/mathlab/design.json')) as Record<string, number>;
```
and rewrite the test:
```
test('table: 32 spots, QB 1000 (scale normalisation, not a weight pin), every weight a multiple of 5, ID set consistent', () => {
  assert.equal(SLOTS.length, 32);
  assert.equal(WEIGHT.QB, 1000);
  for (const s of SLOTS) assert.equal(s.weight % 5, 0, s.id);
  assert.equal(DEFAULT_VALUES.name, 'measured');
  assert.deepEqual(Object.keys(WEIGHT).sort(), [...SLOT_IDS].sort());
});
```
Also delete the parenthetical in the comment inside the base test that reads the gap "(it is 2700 today)" — delete the parenthetical entirely, no replacement number.

Move the design.json value equality to tools/mathlab/check-design.mjs (already loads design.json) — out of the engine test suite, e.g. into a new weights-table.test.ts or the lab gate. Flex-table equality stays untouched in lineup.test.ts.

WHY: The WEIGHT table is RETIRED (slots.ts: "RETIRED REFERENCE TABLE (P-318, 14 Nov 2026)"; valueprovider.ts: "Reference and tests only"). The solver spends the MEASURED provider (DEFAULT_VALUES), not the retired table. Five seats unanimously decided rewrite-not-delete. Keeping design.json equality in the engine suite pins a retired table as live. The guard `DEFAULT_VALUES.name === 'measured'` fails if the retired table is ever wired back into the solver.

SAFE ALONE?: Yes — test-only change; no engine edit; flex equality intact; structural guards (32 spots, QB==1000 as scale normalisation, multiple of 5, 16/14/2 unit counts, ID set consistent) remain. check-design.mjs already loads design.json, so the moved equality has a home.

HOW TO CHECK:
- `cd colors && npm test` → all tests green (363 → 363, new test passes).
- `grep -n "design.json" colors/test/nfl/lineup.test.ts` → no hit.
- `grep -n "DEFAULT_VALUES.name" colors/test/nfl/lineup.test.ts` → present.
- `grep -rn "2700 today" colors/test/nfl/lineup.test.ts` → no hit.
