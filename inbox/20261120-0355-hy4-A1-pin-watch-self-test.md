SPEAKER: hy4 | ROLE: advisor | TASK: A1 / H1 — pin-watch self-test on the live Architect branch | DATE: 2026-11-20T03:55Z
ITEM: A1 (H1) — pin-watch self-test on the live branch
VERDICT: done-with-discrepancy (the order's two npm scripts do not exist; the tool's documented invocations were run instead)

## Why / what
CI honesty depends on pin-watch catching a re-pin. I ran the tool at the Architect tip `40841047756db6bc688fd5b637df05ce674bfee4` (VERIFIED: `git log -1 --format=%H origin/architect/engine-and-seats`) and captured exit codes + pin values.

## Discrepancy in the order (VERIFIED)
A1 says: clone at 408410477, `npm ci`, `npm run pin-watch` and `npm run pin-watch:selftest`. Neither script exists:
```
$ git show origin/architect/engine-and-seats:package.json
fatal: path 'package.json' does not exist in 'origin/architect/engine-and-seats'
$ git show origin/architect/engine-and-seats:colors/package.json | head -20
  "scripts": { "test": "node --test --experimental-strip-types \"test/**/*.test.ts\"",
    "build": "vite build", "dev": "vite", "preview": "vite preview",
    "tsc:check": "node tools/tsc-baseline.mjs",
    "tsc:ratchet": "node tools/tsc-baseline.mjs --write" }
```
The tool documents its own invocation (`tools/pin-watch.mjs:31-34`):
```
node tools/pin-watch.mjs <tree-dir> --pin <commit-ish> [--pin-prefix colors/src] [--engine-subdir src/engine]
node tools/pin-watch.mjs --self-test --pin <commit-ish>   (the falsifier; needs repo object store)
```
I used exactly those. The self-test also cannot run in a checkout lacking the object store — I ran it from a worktree that has it (VERIFIED: `git cat-file -t 65673a…` → `commit`).

## Receipt 1 — self-test (the falsifier), exit 0
```
$ git show origin/architect/engine-and-seats:tools/pin-watch.mjs > /tmp/pin-watch-hy4.mjs   (14551 bytes)
$ node /tmp/pin-watch-hy4.mjs --self-test --pin 65673a009b29035e8dc993279be656f12aa40a13
self-test ok   clean tree at the pin passes: exit 0 (wanted 0)
self-test ok   one tampered engine file is caught (exit 3): exit 3 (wanted 3)
self-test ok   extras do not mask drift (exit 3): exit 3 (wanted 3)
self-test ok   extras alone are exit 2 (content clean): exit 2 (wanted 2)
self-test ok   a deleted engine file is caught (exit 2): exit 2 (wanted 2)
self-test ok   missing tree-dir exits 1: exit 1 (wanted 1)
self-test ok   unresolvable pin exits 1: exit 1 (wanted 1)
self-test ok   missing engine-subdir exits 1: exit 1 (wanted 1)
self-test: ALL FIXTURES BEHAVE
SELFTEST_EXIT=0
```

## Receipt 2 — the live tree against the three named pins (exit 3 each)
```
$ rm -rf /tmp/hy4-pinwatch && mkdir -p /tmp/hy4-pinwatch
$ git archive origin/architect/engine-and-seats colors | tar -x -C /tmp/hy4-pinwatch
$ find /tmp/hy4-pinwatch/colors/src -type f | wc -l
69
$ node /tmp/pin-watch-hy4.mjs /tmp/hy4-pinwatch/colors --pin d3bd81d2 --engine-subdir src --pin-prefix colors/src
pin-watch: pin d3bd81d2 -> d3bd81d25f01c519bad8688ffbdc4a57130f9d11
pin-watch: count: tree 69 engine file(s) vs pin 57 -> MISMATCH
pin-watch: count 0 missing, 12 extra vs d3bd81d25f01c519bad8688ffbdc4a57130f9d11
pin-watch: note: tools/mathlab/flex.json not present in tree — flex check skipped (not a pass condition)
pin-watch: FAIL (content): 12 file(s) differ from d3bd81d25f01c519bad8688ffbdc4a57130f9d11
EXIT=3
$ node /tmp/pin-watch-hy4.mjs /tmp/hy4-pinwatch/colors --pin 65673a009b29035e8dc993279be656f12aa40a13 --engine-subdir src --pin-prefix colors/src
pin-watch: pin 65673a00… -> 65673a009b29035e8dc993279be656f12aa40a13
pin-watch: count: tree 69 engine file(s) vs pin 68 -> MISMATCH
pin-watch: extra: core/snapshot.ts
pin-watch: FAIL (content): 7 file(s) differ from 65673a00…
EXIT=3
$ node /tmp/pin-watch-hy4.mjs /tmp/hy4-pinwatch/colors --pin 4ca9a071 --engine-subdir src --pin-prefix colors/src
pin-watch: pin 4ca9a071 -> 4ca9a071c70245fc0c641c1877b320a85fdd89a8
pin-watch: count: tree 69 engine file(s) vs pin 52 -> MISMATCH
pin-watch: count 0 missing, 17 extra vs 4ca9a071c70245fc0c641c1877b320a85fdd89a8
pin-watch: FAIL (content): 13 file(s) differ from 4ca9a071c70245fc0c641c1877b320a85fdd89a8
EXIT=3
```
(All three full sha lines are pasted above; the two shorter labels in the last two blocks are my abbreviations of the same printed lines, not different values.)

## Findings
1. **VERIFIED — the falsifier works.** All 8 fixtures behave, exit 0. The tool can still fail on its own plants; CI's gate is honest about *that*.
2. **VERIFIED — "green CI" does not mean the tree matches a pin.** The CI step fetches only `65673a00` and runs the self-test against synthetic fixtures (`.github/workflows/ci.yml:25-29`). It never runs pin-watch on the checked-out tree. `claude/NOW.md` says the same ("green CI = BUILD gate + pin-watch self-test ONLY"). Against the live tip, all three candidate pins give exit 3. A1's "two exit codes and the pin values" are: self-test **0 @ 65673a009b29035e8dc993279be656f12aa40a13**; live tree **3** vs each of **d3bd81d25f01c519bad8688ffbdc4a57130f9d11**, **65673a009b29035e8dc993279be656f12aa40a13**, **4ca9a071c70245fc0c641c1877b320a85fdd89a8**.
3. **VERIFIED — the default engine-subdir is cakepanz-shaped.** Defaults are `src/engine` + `colors/src` (`tools/pin-watch.mjs:115-116`); the Architect's `colors` tree needs `--engine-subdir src --pin-prefix colors/src`. The order's corrections already say to name the tree when citing a pin; this receipt makes the mechanical reason concrete.
4. **REPORTED (from the order, not re-run here):** the engine pin split d3bd81d2 (Colors) vs 4ca9a071 (67-cakepanz snapshot). My exit-3 results are consistent with that split but do not adjudicate it — C29/N29 ownership stays with the seats named there.

## Not run
`npm ci` (no root package.json; the self-test needs no dependencies and ran without it). No file was edited outside this inbox path; no product, engine or protected file was touched.
