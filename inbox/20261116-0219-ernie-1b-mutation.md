SPEAKER: ernie | ROLE: council advisor | TASK: 1b slice — mutation-test the twelve new tests, the ratchet, the two de-gated tests, the CI summary | DATE: 2026-11-16T02:19Z
FOR: P-342

All work in `/tmp/eng` = `git archive origin/architect/engine-and-seats colors data tools` at **`86f22d10`** (branch tip; the 1b slice is `6dcf13b2`). VERIFIED throughout: every claim below has its command and output in this file.

## 1. The two headline numbers
```
$ cd /tmp/eng/colors && node --test --experimental-strip-types "test/**/*.test.ts"
ℹ tests 363  ℹ pass 363  ℹ fail 0  ℹ duration_ms 24018.96675
```
**VERIFIED 363/363** (matches the report).
```
$ node tools/tsc-baseline.mjs
tsc baseline OK: 89 errors (pinned 89).
```
**VERIFIED 89/89** — but only after `npm install --no-save typescript@5.9.3` in the scratch tree. With no `node_modules`, `tsc-baseline.mjs` runs `npx tsc`, npx fetches the **unrelated npm package `tsc`**, and the ratchet dies with:
```
tsc failed without parsable errors:
This is not the tsc command you are looking for
EXIT=2
```
That is fail-safe (exit 2, not a green), so it is not a false pass — but it means the ratchet's "89/89" is a *local-install* fact, not a repo fact: nothing in `colors/` declares typescript as a devDependency path the tool verifies (`package.json` has `typescript ^5.9.3`, and CI runs `npm ci` first, so CI is fine).

**Scope finding (VERIFIED).** `colors/tsconfig.json` has `"include": ["src/**/*.ts"]`, `"exclude": ["node_modules", "test", "tools"]`. The type-check ratchet therefore covers **`src/` only** — 89 errors, all in `src/` (`src/core/hungarian.ts` 15, `src/core/hash.ts` 7, …). **`colors/test/` is not type-checked at all.** The 12 new 1b tests are executed by `node --test` (which strips types) and never checked. A type error in a test file is invisible to both gates.

## 2. Is the ratchet a ratchet? YES (VERIFIED)
Planted `const __ernieT1: number = "not a number";` in `src/core/hash.ts` (baseline 7 errors):
```
$ node tools/tsc-baseline.mjs
tsc baseline FAILED: errors grew in 1 file(s):
  src/core/hash.ts: 7 -> 8
Fix the new errors; do not raise the baseline.
CHECK_EXIT=1
$ node tools/tsc-baseline.mjs --write
refusing to raise the baseline:
  src/core/hash.ts: 7 -> 8
WRITE_EXIT=1
$ sha256sum tsc-baseline.json
937c25bd…f934e0   (unchanged before and after both runs)
```
New-file case (a file with **0** baseline errors) behaves the same: `src/core/__ernie_new.ts: 0 -> 1`, `--write` refuses, exit 1. **The ratchet both fails and refuses to record. It is a ratchet.**

Two honest caveats (INFERRED from the source, `tools/tsc-baseline.mjs`):
- the check recomputes counts from `npx tsc` output and trusts its own parse; a tsc that emits errors it cannot parse gives `total === 0 && status !== 0` → exit 2 (fail-safe), but a tsc that emits **fewer** errors for any reason (a file added to `exclude`, a path typo) is silently accepted by `--write`, which only refuses *growth*.
- the ratchet is per-file counts, not per-rule; a swap of one error for another in the same file is invisible by design.

## 3. Mutation test of the twelve 1b tests — 12/12 killed (VERIFIED)
Each mutation: restore pristine `src`, apply one exact string replacement, run `node --test --experimental-strip-types --test-reporter=tap test/nfl/sim-slice.test.ts`, record the failing test names, restore. (Harness in `/tmp/mut.mjs`, mutations listed with their anchor strings.)

| # | Test (line) | Mutation | Died by |
|---|---|---|---|
| M1 | one drive, all the way (23) | `box.ts`: `row.result = e.payload.result` → `'clock'` | its own `v.drives[0].result === out.end.result` |
| M2 | every screen agrees (34) | `box.ts`: an interception no longer bumps `giveaways` | its own `giveaways === interceptions + fumblesLost` |
| M3 | 3,000-drive invariants (51) | `drive.ts`: `kickYards = ydl + snap - 3` | its own `kickYards === ydl + 17` |
| M4 | replay (80) | `keyedrng.ts`: `draw` XORs a module counter (stateful) | replay + coupling + lambda + golden |
| M5 | keyed coupling (87) | `drive.ts`: completion draw tag `'yards' + v[0]` (pmf-dependent) | its own "+1 yard" and prefix-identity |
| M6 | lambda seam (103) | `tilt`: `s = 0 * (lambda*gap)` (seam dead) | its own monotonicity |
| M7 | tilt (121) | `tilt`: return un-normalised `w` | its own `sum(q) === 1` |
| M8 | field-goal curve (128) | `fgMakeProb`: snap −1 | its own closed-form equality |
| M9 | pickPmf (138) | `target = u * (total - 0.5)` | its own index boundaries |
| M10 | broken pack (143) | `readParams`: drop the sum-to-1 check | its own `/sum to 1/` throw |
| M11 | sim-folder lint (152) | add `const __ambient = () => Math.random();` to `sim/drive.ts` | its own text scan |
| M12 | golden (163) | toyPack `xp: 0.94 → 0.95` | its own hash |

**No survivors among the twelve.** Two structural notes on *quality*, not tautology:
- **M11 is a text scan, not a behavioural test** (`!/Math\.random|Date\.now|new Date|performance\.now/`). It would not catch `globalThis.crypto.getRandomValues`, `Date['now']()`, or an impure helper imported from another folder. It also can false-positive on a string literal.
- **The golden (M12) is a pin, not a check**: it dies for M3/M4/M5/M8/M9 too, so it never localises. Its own comment says so.

## 4. Survivors (the part that matters) — VERIFIED
A second harness (`/tmp/mut2.mjs`) ran mutations that are *wrong football* against **all four** related test files (`sim-slice`, `lineup`, `versions`, `pmath-lint`):

| # | Mutation | Result |
|---|---|---|
| S1 | `box.ts`: `off.puntYards += p.kickYards` deleted | **SURVIVED all 4 files** |
| S2 | `drive.ts`: a sack is recorded as an incompletion (`yards = 0`) | caught — but only by **lambda seam** (sack-rate monotonicity), *not* by "every screen agrees" |
| S3 | `box.ts`: `off.touchdowns += 1` → `+= 0` | **SURVIVED all 4 files** |
| S4 | `box.ts`: `off.firstDowns += 1` → `+= 0` | **SURVIVED all 4 files** |
| S5 | `drive.ts`: an interception is spotted at the 20 instead of at the catch | **SURVIVED all 4 files** |

**Why:** "every screen agrees" checks ~8 of the 25 `TeamLine` fields (netYards, secs, plays, scoring, giveaways, passAtt). `puntYards`, `touchdowns`, `firstDowns`, `fgMade`, `xpMade`, `safetiesScored` are never asserted by any test — a whole class of box-score field can rot silently. And because the test compares *two folds of the same events*, it cannot detect a **consistent** misclassification (S2: sacks vanish from the team line and the drive table together and every identity still holds).

## 5. The two de-gated tests are live assertions (VERIFIED)
- **lineup gap identity** (`lineup.test.ts:237`, 1b): killed by (a) not charging the penalty in the cost row (`lineup.ts` `v*(ovr - penalty)` → `v*ovr`): 13 lineup tests die, including it; (b) leaving a spot empty (`i===0 && j===0` → bench). Its last assertion — `flexCost > 0 && |gap − 70·Δ| > 1e-6`, "the identity can fail" — is a genuine non-vacuity check and is the reason the test cannot go tautological.
- **engine stamp** (`versions.test.ts`): killed by hard-coding the stamp (`engineVersion = () => 'nfl1.' + '00000000000000'`) and by neutering `drift` (`engine = false`). Live.
  One weakness: two of its four new assertions (`hash53(text+' ')` and `hash53(text.replace('"QB"','"QX"'))`) test **`hash53`**, not `engineVersion`. They would still pass if the stamp were hard-coded and the equality assertion were removed. Not a tautology, but it is dependency-testing inside a stamp test.

## 6. The CI summary says green on a failing build — worse than reported (VERIFIED)
`.github/workflows/ci.yml` (branch `architect/engine-and-seats`): `Install (clean)` has **no** `continue-on-error`; `Type check`, `Tests` and `Production build` each have `continue-on-error: true`.
Run `43749063203` (`6dcf13b`, "1b vertical slice"):
```
conclusion: success
1 Set up job => success … 4 Install (clean) => success
5 Type check => success   6 Tests => success
7 Production build (known to fail: …) => success
```
The **step `conclusion` is `success`**, because GitHub rewrites the conclusion of a `continue-on-error` step to success and keeps the real result in `outcome` (null here). The raw log shows the build did fail:
```
6:51:51 PM [vite] building client environment for production...
error during build:
Build failed with 1 error:
[plugin vite:build-html] colors/index.html
Error: Failed to resolve /src/main.ts from colors/index.html
```
The run for `86f22d10` (`43749230714`) is identical. **Any machine reader — `gh api`, a badge, a dashboard, a required-check list — sees green for a commit whose production build fails.** Only a human reading the raw log sees it. The workflow comment ("REPORT-ONLY: every step has continue-on-error, so a red step shows in the log and the run summary") is wrong on the second half: it does *not* show red in the summary.

## 7. One number to correct in the record
`lineup.test.ts`'s REPORT line at this commit prints:
```
REPORT: 4-3 minus 3-4 value for a natural-4-3 roster = 2773.038661417202 (flex cost 2773.038661417323, spot-value difference 0)
```
The de-gate comment in the same test says the gap "is 2700 today". **2700 is the retired-table number; the live default provider is MEASURED and prints 2773.0387.** The comment is not merely unpinned, it is wrong about the current tree (see my `lineup-test-rewrite` filing).

## Ledger
- VERIFIED: 363/363 · 89/89 · ratchet fails and refuses to record · 12/12 mutations killed · 4 survivors (S1/S3/S4/S5) · both de-gated tests live · CI green on a red build · test/ not type-checked · gap prints 2773.0387.
- INFERRED: the ratchet's `--write` accepts a *lower* count from any cause (by design).
- UNKNOWN: whether any of the 4 survivors is already covered by a test outside the four files I ran (I ran `sim-slice`, `lineup`, `versions`, `pmath-lint`; the other 359 tests were green at baseline but I did not re-run them per mutation).