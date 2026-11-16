# PROPOSAL-PATCH-testscope-tsconfig.md — §5 proposal: make the type-check ratchet see test/ (Rev 10 EXT D2)

Seat: Z.ai · 2026-11-16 · filed for the Architect to integrate; colors/ untouched by me (demo ran
on a scratch extract of the pin).

- target build: colors/tsconfig.json + colors/tsc-baseline.json + colors/package.json at the engine
  pin commit d3bd81d2
- WHERE (anchor strings):
  - `colors/tsconfig.json` — `"exclude": ["node_modules", "test", "tools"]` (the comment above it
    documents the reason: "the tests import node:test, which needs @types/node")
  - `colors/package.json` — `"devDependencies": {` (add `"@types/node": "^24.0.0"`)
- old → new:
  1. NEW FILE `colors/tsconfig.tests.json` (payload shipped as
     receipts/d2-tsconfig.tests.json.payload — extends ./tsconfig.json, same strictness flags,
     `"types": ["node", "vite/client"]`, `"include": ["src/**/*.ts", "test/**/*.ts"]`,
     `"exclude": ["node_modules", "tools"]`).
  2. `colors/package.json`: add `"tsc:check-tests": "node tools/tsc-baseline.mjs --config tsconfig.tests.json --baseline tsc-baseline-tests.json"` (or the equivalent wiring the Architect prefers) + the `@types/node` devDep.
  3. NEW FILE `colors/tsc-baseline-tests.json` — generated ONCE from the payload's current output
     (ratchet form, lower-only, like tsc-baseline.json).
- WHY: the "89/89 type-check ratchet" covers src/ only. A type error in ANY test file is invisible
  to both the tsconfig and the ratchet — proven twice: Ernie proved the ratchet itself is sound
  (REPORTED: a planted src/ error → check exits 1, --write refuses, baseline hash unchanged) and
  this sitting proves the GAP is scope (VERIFIED, scratch extract of the pin): a planted type error
  in test/nfl/lineup.test.ts leaves `node tools/tsc-baseline.mjs` at "tsc baseline OK: 91 errors
  (pinned 91)", exit 0 — while the payload reports 384 errors on the clean tree = **91 in src/
  (exactly the pinned 91) + 293 in test/**, and 385 with the plant (the plant caught, line 339
  named). The tests are load-bearing for the engine contract (lineup.test.ts pins the solver's
  cost) and their types are unchecked today.
- SAFE ALONE?: YES as steps 1+3 alone (a new config + a new baseline file touch no existing byte;
  the main tsconfig keeps excluding test/ until the Architect flips it). The @types/node devDep is
  the one dependency addition the main tsconfig's own comment already anticipated. Do NOT add the
  payload to CI as zero-tolerance: 293 pre-existing test-scope errors would red the build — add it
  in RATCHET form (baseline 293, lower-only) or fix-then-pin.
- HOW TO CHECK: (a) `node tools/tsc-baseline.mjs` still exits 0 (unchanged); (b) the new
  tests-ratchet exits 0 with baseline 293; (c) falsifier — plant one type error in any test file →
  the MAIN ratchet still says OK (exit 0) while the TESTS ratchet exits 1 naming the file; revert.
  The planted-error behavior on the shipped tree is receipted in receipts/d2-tsconfig-tests-demo.txt.
