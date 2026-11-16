SPEAKER: inkling | TASK: Engine test round — A. The 1b slice: run the gates, mutation-test the twelve new tests, check the ratchet, the two de-gated tests, the CI summary | DATE: 2026-11-16T02:10Z
FOR: P-342

TARGET: commit 6dcf13b2 ("Architect: 1b vertical slice (one neutral drive, pack to box score), two de-gated tests fixed, NOW.md"), branch architect/engine-and-seats; the pushed tip is 86f22d10 ("Architect: NOW.md records the verified CI run for 6dcf13b"), whose tree contains 6dcf13b2 verbatim except NOW.md (VERIFIED: `git rev-parse --short origin/architect/engine-and-seats` = `86f22d10`; `git log --oneline -2` shows `86f22d10` then `6dcf13b2`).
Method: `git archive origin/architect/engine-and-seats | tar -x` into a disposable scratch extract (not a git repo; no branch touched, no engine file edited on any branch). Work there only. Node v26.13.0, npm 11.20.0, `npm ci` clean. All mutation results below were produced by editing files in that scratch copy and restoring the pristine bytes from copies after each run; the copy still holds the unmutated tree.

## A1. The suite and the ratchet — reproduce
- `npm test` → `ℹ tests 363`, `ℹ pass 363`, `ℹ fail 0` (duration ~40 s). VERIFIED — the 1b commit message and NOW.md claim 363/363; it reproduces.
- `npm run tsc:check` → `tsc baseline OK: 89 errors (pinned 89).` VERIFIED — the report claims 89/89; it reproduces.
- CI ran the same commands on the same commit: the job log shows `tsc baseline OK: 89 errors (pinned 89).` and `ℹ fail 0` (see A6).

## A2. Mutation of the twelve new tests (test/nfl/sim-slice.test.ts) — all twelve die
One guard broken per test; each test run in isolation (`node --test --experimental-strip-types test/nfl/sim-slice.test.ts`). "Dies" = the test fails with the mutation in place. Collateral failures in the same run listed where they occurred.

| # | Test (file line) | Mutation (file, change) | Result |
|---|---|---|---|
| 1 | one drive, all the way (L23) | drive.ts: `drive_end` emit commented out | dies (✔→✖; also breaks golden, see #12) |
| 2 | every screen agrees, 500 drives (L34) | box.ts: `sackYards` never accumulated on a sack play | dies (fails at the `net = rush + pass - sack` equality) |
| 3 | invariants over 3,000 drives (L51) | drive.ts: `ytg` not reset to `min(10, ydl)` after a first down | dies (`ytg >= 1` state assert) |
| 4 | replay: same key/pack, same log (L80) | keyedrng.ts: string-seed keys made seed-independent (`hashString('keyed-game-a:')` both words) | dies (`assert.notEqual(h('r1'), h('r2'))`; also breaks invariants and lambda seam, same root cause) |
| 5 | keyed coupling (L87) | drive.ts: completion yardage clipped at 4 (`min(pickPmf(...), 4)`) | dies — `AssertionError [ERR_ASSERTION]: same uniform, support shifted by one: one more yard unless capped at the goal line` (`4 !== 5`). Golden also dies (replay bytes move) |
| 6 | lambda seam (L103) | drive.ts: the duty gap never reaches the outcome pmf (`tilt(p, th, par.lambda, 0)`) | dies (`lo.cmp < mid.cmp < hi.cmp` fails) |
| 7 | tilt (L121) | drive.ts: theta sign flipped in `tilt` | dies (`q[0]! < p[0]!` fails; lambda seam also dies) |
| 8 | field-goal curve (L128) | drive.ts: `fgMakeProb` drops `par.fg.snap` | dies (`|p - ref| < 1e-12` fails). Golden also dies |
| 9 | pickPmf inverse CDF (L138) | drive.ts: inverse-CDF loop starts at i=1 (first cell never considered) | dies (`pickPmf(m, 0)` returns 2, not 1). Golden also dies |
| 10 | a broken pack fails at load (L143) | toypack.ts: the `passResult must sum to 1` check deleted | dies (`assert.throws` for the sum-to-1 rule never fires). Alone: no collateral |
| 11 | sim folder portability lint (L152) | box.ts: `Math.random()` planted in the sim folder | dies alone (lint fires on `box.ts`) |
| 12 | golden (L163) | toypack.ts: `xp` 0.94 → 0.95 (one toy number moves) | dies alone (`got.pack`/`got.log` differ from GOLDEN; the message says exactly that) |

VERIFIED: every one of the twelve dies on its guard broken. No tautologies among the twelve. Notes: (a) #1 and #12 are not independent falsifiers of each other's area (A1 kills both #1 and #12; A12 kills only #12); (b) #4, #6, #7 also kill each other's area when mutated at the shared source, as expected; the column that matters is that each named test flipped green→red.

## A3. Is the type-check ratchet actually a ratchet? — yes, on the paths exercised
Procedure: added to `src/core/ids.ts` a probe line `const __ratchetProbe: number = "not a number";` (one new type error; file had 2 pinned). Then:
- `npm run tsc:check` → `tsc baseline FAILED: errors grew in 1 file(s):` / `  src/core/ids.ts: 2 -> 3` / `Fix the new errors; do not raise the baseline.` exit 1. VERIFIED.
- `npm run tsc:ratchet` (`--write`) → `refusing to raise the baseline:` / `  src/core/ids.ts: 2 -> 3`, exit 1. VERIFIED.
- `tsc-baseline.json` byte-identical to the pre-probe copy after the run (VERIFIED by diff).
- A file not present in the baseline would appear in the same `grew` set with `was = 0`, so a brand-new erroring file also refuses (by code reading: `for (const f of new Set([...Object.keys(base), ...Object.keys(counts)]))`); not separately executed. INFERRED, not run.
- The probe was removed afterwards; `npm run tsc:check` re-run: `tsc baseline OK: 89 errors (pinned 89).` VERIFIED.
Answer: as far as these commands can show, `tsc-baseline.mjs` is a real ratchet — it exits non-zero on growth and refuses to record growth as the new baseline. Two honest limits: (i) it only ever sees output parsed per file; a wholesale tsconfig change that makes a pinned file stop being compiled just makes entries vanish (the "lower" direction), which is the intended direction; (ii) in CI every step is `continue-on-error: true`, so even a failing ratchet would not block anything (see A6). The tool is sound; the pipeline is advisory by design.

## A4. The two de-gated tests — live assertions, not tautologies (with one honest hole)
The two rewritten from pinned values into structural assertions are `lineup.test.ts`'s gap test (identity form, L240) and `versions.test.ts`'s E5 stamp test.

4a. lineup.test.ts identity test — mutation DEG1 (`lineup.ts`: placement `effOvr` reported without subtracting `penalty`):
  `AssertionError [ERR_ASSERTION]: gap 0 must equal 70 x (spot-value difference) + flex cost 2773.038661417323` at lineup.test.ts:258 — test dies. VERIFIED.
  DEG3 (`flex.ts`: listed rules priced at 0): the `flexCost > 0` leg fails — test dies. VERIFIED. (Restored; file green again: `ℹ pass 34`, `ℹ fail 0`.)
  Reading: the pure identity line (`|gap − (70·(Σu43−Σu34) + flexCost)| < 1e-6`) is near-definitional given the same provider on both sides — it cannot detect "the values are wrong", only "the solver's arithmetic does not add up" (an empty spot, an uncharged penalty, a value not equal to Σ v·effOvr). DEG1 is exactly that failure class and it fires. The discriminating legs are the other ones: every 3-4 spot filled, `flexCost > 0`, `flexed.length === 3`, every flex price 6. All live. The test is therefore a live assertion of the solver's accounting, NOT independent evidence about the size of the gap — and it must not be quoted as corroborating "2773" as a football fact. The diagnostic line in the same test prints `spot-value difference 0`: the whole gap is flex cost, under the measured provider (re-verified in item G's recheck filing).
4b. versions.test.ts E5 stamp test — mutation DEG2A (`versions.ts`: `engineVersion()` returns a fixed stamp, ignoring the rules text): `assert.equal(eng, 'nfl1.' + hash53(text))` fails — test dies. VERIFIED. Mutation DEG2B (`drift()` hard-wired to always report `{engine:false, data:false, any:false}`): the drift assert fails — test dies. VERIFIED.
  Honest hole (DEG2C): dropping `FLEX` from the `rulesText()` JSON (SLOTS kept) leaves the E5 test GREEN — stamp and hash track the same mutated text, so "the stamp moves when the text moves" is unfalsifiable from inside the test. The omission IS caught by a different test (`the rules text covers the tables that move results`, needle-based), which dies instead (VERIFIED: E5 ✔, needles test ✖). So: E5 is live for stamp-honesty and drift-detection, blind to omissions by construction; omission coverage lives in the needle test, not here. Not a tautology overall; narrower than it reads.
De-gated pair verdict: both are live; neither is a tautology; one of them (E5) is only as strong as its sibling test for the omission class.

## A6. The CI summary really says green on a failing commit — VERIFIED
- `gh api repos/kozikosi/Football-Sim/commits/6dcf13b294a7243aad61dc11b9c22bdc4da34e53/check-runs` → one check run, name `colors`, conclusion `success`, `status: completed` (run 43749063203; job 132918731369). VERIFIED.
- `gh api repos/kozikosi/Football-Sim/actions/runs/43749063203/jobs` → job `colors` conclusion `success`; EVERY step conclusion `success` — including `Production build (known to fail: colors/index.html points at a src/main.ts that does not exist yet)`. VERIFIED.
- The job log (saved to scratch as ci-6dcf13b2.log, 69,607 B) contains: `✗ Build failed in 31ms`, `Error: Failed to resolve /src/main.ts from .../colors/index.html`, `##[error]Process completed with exit code 1.` — and the step still concluded `success`, because `ci.yml` runs every step with `continue-on-error: true` (the file's own header: "REPORT-ONLY: every step has continue-on-error… (Owner via Ernie, 14 Nov: no new gates)"). VERIFIED.
- The two non-build steps really passed: their log sections show `tsc baseline OK: 89 errors (pinned 89).` and `ℹ fail 0`. VERIFIED.
Bottom line: yes — the checks and the run summary are green on this commit while its build step failed with exit 1. The dashboard cannot show the failure; only the log can. Anyone reading the check mark (or "every step success") would be misreading a report that says `success` by construction. The fix is not to make the build pass (it needs src/main.ts, a later slice) but for "continue-on-error" to be visible as a non-verdict — noted for the Owner; not mine to change.

## What this round did NOT do
No product/engine/governance/queue/CREDIT file was edited; no branch was pushed; all foreign mutations were applied to and restored in a disposable extract. The CI observation uses read-only `gh api`/`gh` calls with the keyring login. P-342 stays open; nothing here re-ranks or closes it.

Evidence labels: everything above is VERIFIED (run by me, receipts in the text), except the one explicitly marked INFERRED (new-file refusal) and the ci.yml quote (read from the extracted tree at 86f22d10). The 2773.038661417323 figure quoted in 4a is the diagnostic line the test itself printed in MY run under mutation DEG1; the same number under unmutated code is confirmed in item G's filing.
