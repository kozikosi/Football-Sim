SPEAKER: glyph | ROLE: council seat | TASK: lineup.test.ts weight-table test rewrite (§5 patch proposal) | DATE: 2026-11-16T02:24:00Z
FOR: P-342

## §5 patch proposal (draft — Architect integrates; engine/product files not edited by glyph)

**Target build (file + commit hash):** `colors/test/nfl/lineup.test.ts` at `6dcf13b294a7243aad61dc11b9c22bdc4da34e53` (1b slice) on `origin/architect/engine-and-seats` (HEAD `86f22d107850b39fa2b6b8ea7cf45c814da443b1` records CI for 6dcf13b; verify anchors before apply). (VERIFIED commits via git)

**WHERE (anchor strings, not line-only):**
1. Anchor A (comment + first table test name): `// ---- table ----` / `test('table: 32 spots, QB 1000, every weight a multiple of 5, equal to tools/mathlab/design.json key by key'`
2. Anchor B (imports): `import { DEFAULT_VALUES, WINS_PER_UNIT } from '../../src/sports/nfl/engine/valueprovider.ts';` and `const design = JSON.parse(read('../../../tools/mathlab/design.json')) as Record<string, number>;` and `import { SLOTS, SLOT_IDS, WEIGHT, fieldSlots, DL5_SHARE } from '../../src/sports/nfl/engine/slots.ts';`
3. Anchor C (base-test comment): `moves (it is 2700 today). What must hold for ANY values is the accounting:`
4. Anchor D (flex equality test stays intact): `test('flex: the typed table equals tools/mathlab/flex.json`

**Old → new (exact intent; apply carefully against anchors):**

### A/B. Replace retired weight-vs-design equality in engine lineup tests with structural + measured-provider guard; move design.json equality out of engine suite
**Old (in `colors/test/nfl/lineup.test.ts`):**
```ts
import { SLOTS, SLOT_IDS, WEIGHT, fieldSlots, DL5_SHARE } from '../../src/sports/nfl/engine/slots.ts';
...
import { DEFAULT_VALUES, WINS_PER_UNIT } from '../../src/sports/nfl/engine/valueprovider.ts';
...
const read = (p: string) => fs.readFileSync(new URL(p, import.meta.url), 'utf8');
const design = JSON.parse(read('../../../tools/mathlab/design.json')) as Record<string, number>;
const flexJson = JSON.parse(read('../../../tools/mathlab/flex.json')) as { roles: string[]; flex: Record<string, Record<string, number>> };
...
// ---- table ----
test('table: 32 spots, QB 1000, every weight a multiple of 5, equal to tools/mathlab/design.json key by key', () => {
  assert.equal(SLOTS.length, 32);
  assert.equal(WEIGHT.QB, 1000);
  for (const s of SLOTS) assert.equal(s.weight % 5, 0, s.id);
  assert.deepEqual(Object.keys(design).sort(), [...SLOT_IDS].sort());
  for (const id of SLOT_IDS) assert.equal(WEIGHT[id], design[id], id);
});
test('table: unit counts are 16 offense, 14 defense, 2 special', () => {
  const c = (u: string) => SLOTS.filter((s) => s.unit === u).length;
  assert.deepEqual([c('offense'), c('defense'), c('special')], [16, 14, 2]);
});
```

**New (engine test keeps structural guards only; design equality removed from this file):**
```ts
import { SLOTS, SLOT_IDS, WEIGHT, fieldSlots, DL5_SHARE } from '../../src/sports/nfl/engine/slots.ts';
...
import { DEFAULT_VALUES, WINS_PER_UNIT } from '../../src/sports/nfl/engine/valueprovider.ts';
...
const read = (p: string) => fs.readFileSync(new URL(p, import.meta.url), 'utf8');
const flexJson = JSON.parse(read('../../../tools/mathlab/flex.json')) as { roles: string[]; flex: Record<string, Record<string, number>> };
...
// ---- table ----
test('table: 32 spots, QB 1000 (scale normalisation), every weight a multiple of 5, ID set consistent', () => {
  assert.equal(SLOTS.length, 32);
  assert.equal(WEIGHT.QB, 1000); // scale normalisation, not a solver weight pin
  for (const s of SLOTS) assert.equal(s.weight % 5, 0, s.id);
  assert.deepEqual([...SLOT_IDS].sort(), SLOTS.map((s) => s.id).sort());
  assert.equal(DEFAULT_VALUES.name, 'measured'); // fails if the retired table is wired back into the solver
});
test('table: unit counts are 16 offense, 14 defense, 2 special', () => {
  const c = (u: string) => SLOTS.filter((s) => s.unit === u).length;
  assert.deepEqual([c('offense'), c('defense'), c('special')], [16, 14, 2]);
});
```

**And add/move (outside engine test suite as requested) — new file `colors/test/nfl/weights-table.test.ts` (or integrate into existing lab gate) with:**
```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { SLOT_IDS, WEIGHT } from '../../src/sports/nfl/engine/slots.ts';
const design = JSON.parse(fs.readFileSync(new URL('../../../tools/mathlab/design.json', import.meta.url), 'utf8')) as Record<string, number>;
test('retired reference weight table equals tools/mathlab/design.json key by key (reference/lab check)', () => {
  assert.deepEqual(Object.keys(design).sort(), [...SLOT_IDS].sort());
  for (const id of SLOT_IDS) assert.equal(WEIGHT[id], design[id], id);
});
```
(Alternatively: move the equality assertion into `tools/mathlab/check-design.mjs` if that script is the canonical lab gate — Architect to choose location; `tools/mathlab/check-design.mjs` already exists and loads design.json, VERIFIED by listing.)

### C. Drop pinned gap number from base-test comment
**Old:** `// moves (it is 2700 today). What must hold for ANY values is the accounting:`
**New:** `// moves. What must hold for ANY values is the accounting:`

### D. Keep flex-table equality intact (no change)
`test('flex: the typed table equals tools/mathlab/flex.json (tiers -2 / -6 / -12, Owner 10 Nov, 99 rules) rule by rule'` and its body remain unchanged.

**WHY:** `SLOTS[].weight`/`WEIGHT` is RETIRED for solver spending (P-318; `valueprovider.ts`/`slots.ts` comments, `DEFAULT_VALUES` measured). Pinning engine tests to `design.json` re-pins a retired table and blocks provider evolution; structural guards + `DEFAULT_VALUES.name==='measured'` protect the live seam. `tools/mathlab/flex.json` ↔ typed flex remains the single live source-of-truth check and stays. The `(it is 2700 today)` parenthetical is a number pin in comment text and must be removed (Owner ruling). (VERIFIED codebase state as read)

**SAFE ALONE?** Yes, if the moved design-equality check lands in the same commit (new `weights-table.test.ts` or `check-design.mjs` extension) so reference-table↔design parity is still enforced somewhere appropriate. Flex equality and all other lineup assertions unchanged. (INFERRED)

**HOW TO CHECK (commands + expected):**
- `cd colors && node --test --experimental-strip-types "test/nfl/lineup.test.ts"` → existing lineup tests still pass (including modified table tests and unchanged flex equality), no `design` import/usage in `lineup.test.ts`. (expected)
- `cd colors && node --test --experimental-strip-types "test/nfl/weights-table.test.ts"` (or run chosen lab gate) → `retired reference weight table equals tools/mathlab/design.json...` passes. (expected)
- `node -e "require('fs').readFileSync('colors/test/nfl/lineup.test.ts','utf8').includes('(it is 2700 today)') && process.exit(1)"` → exit 0 (parenthetical absent). (expected)
- Full: `cd colors && node --test --experimental-strip-types` → suite green. (expected)

**Ledger:** VERIFIED anchors/read state at 6dcf13b; REPORTED prompt constraints; INFERRED safest move location (Architect choice among lab gate/new test). UNKNOWN full-suite result in provisioned env from this seat (not run).
