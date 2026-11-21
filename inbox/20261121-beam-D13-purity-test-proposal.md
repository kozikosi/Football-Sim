# Beam proposal: D13 purity test over core/view/app + pin-watch CI gate

## Context
Per the Owner's council supplementary work order §5, proposing test-only safety work that does not touch engine bytes or product HTML. The engine pin (408410477) remains frozen.

## 1 · D13 purity test

### Purpose
Verify that `core/`, `view/`, and `app/` layers in the engine do not import from `sports/nfl/` internals or from each other in forbidden directions. This prevents layering violations that would make the engine harder to extract for a second sport (basketball, post-v1.1).

### Proposed test (test-only, no engine bytes changed)
File: `colors/test/engine/core/d13-purity.test.ts` (or equivalent in the cakepanz mirror)

```typescript
// D13: layering purity — core/ must not import from view/ or app/ or sports/;
// view/ must not import from app/; app/ may import from core/ and view/.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const ROOT = 'colors/src/sports/nfl'; // adjust for cakepanz mirror: src/engine/sports/nfl

function collectImports(dir: string): { file: string; imports: string[] }[] {
  const out: { file: string; imports: string[] }[] = [];
  for (const f of readdirSync(dir, { recursive: true })) {
    if (!f.endsWith('.ts')) continue;
    const src = readFileSync(join(dir, f), 'utf8');
    const imports = [...src.matchAll(/from\s+['"]([^'"]+)['"]/g)].map(m => m[1]);
    out.push({ file: f, imports });
  }
  return out;
}

test('D13: core/ does not import from view/, app/, or sports/', () => {
  const files = collectImports(join(ROOT, 'core'));
  for (const { file, imports } of files) {
    for (const imp of imports) {
      assert.ok(!imp.includes('/view/'), `${file} imports from view/: ${imp}`);
      assert.ok(!imp.includes('/app/'), `${file} imports from app/: ${imp}`);
      assert.ok(!imp.includes('/sports/'), `${file} imports from sports/: ${imp}`);
    }
  }
});

test('D13: view/ does not import from app/', () => {
  const files = collectImports(join(ROOT, 'view'));
  for (const { file, imports } of files) {
    for (const imp of imports) {
      assert.ok(!imp.includes('/app/'), `${file} imports from app/: ${imp}`);
    }
  }
});
```

### How to check
- `npm run test:engine` should include the new D13 tests and pass.
- A layering violation should make the test fail with the file and import path named.

## 2 · Pin-watch CI gate

### Purpose
Fail CI if the engine pin drifts from 408410477 without an explicit re-pin commit. This prevents silent engine changes from being merged.

### Proposed implementation
A script `scripts/pin-watch.mjs` (or a CI step) that:
1. Runs `git rev-parse 408410477^{commit}` — fails if the commit object is missing.
2. Compares `git ls-tree -r 408410477 colors/src | sha256sum` against a stored expected hash.
3. Runs `git diff --name-only 408410477 HEAD -- colors/src` — fails if any file changed.
4. Checks that `colors/src/sports/nfl/view/draftBoard.ts` sha256 matches `e9e6e01a31d7024e6eb2bd9ece7034dadb93aa75316ca2826f96eb26a63f4251`.

### How to check
- `node scripts/pin-watch.mjs` exits 0 when the pin is intact, 1 with a named failure otherwise.
- In CI: add as a step before `npm run test:engine`.

### Note
This is a proposal. The actual implementation should be done by the Architect (Claude) or MUSE, as it touches `tools/` and `scripts/` which are owned by them. Beam is filing the spec only.

## Reviewer: beam | Date: 2026-11-21
