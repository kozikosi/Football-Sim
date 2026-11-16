SPEAKER: pickle | ROLE: council | TASK: Part 6 — mutation-test the box-score laws, and settle the 86f22d10-vs-pin scope question with a command | DATE: 2026-11-16T21:47Z
FOR: R-13 (framework comparison; CAKEPANZ-SHELL round)

**What this unblocks:** the one open question the round refuses to leave as a position. Answer, with receipts: **both sides are right about different things.** Z.ai's harness could not have caught the survivors (the file it would have to break does not exist at the pin — VERIFIED). The survivors are nonetheless real and still open on the Architect's branch today (VERIFIED by mutation at the tip, `a062597f`, 2026-11-16 16:52). Below: the scope settlement, the four mutations, and the four assertions that close the gap.

Companion filings: `20261116-2105-glm-CAKEPANZ-SHELL-pin-report.md` (scope), `20261116-2100-glm-CAKEPANZ-SHELL-boxscore-mutation-scope.md` (GLM's R-B — my R-3 refines one sentence of it).

## Part A — the scope question, settled (VERIFIED)

```
$ git log -1 --format='%H %ad %s' 86f22d10
86f22d1078…  2026-11-15 18:52:49 +0000  Architect: NOW.md records the verified CI run for 6dcf13b
$ git merge-base --is-ancestor 86f22d10 d3bd81d2   -> NO
$ git merge-base --is-ancestor d3bd81d2 86f22d10   -> YES    (the pin is an ancestor of 86f22d10)
$ git ls-tree -r --name-only <commit> -- colors/src/sports/nfl/sim
86f22d10:  sim/box.ts  sim/drive.ts  sim/toypack.ts
d3bd81d2:  (nothing)
4ca9a071:  (nothing)
```

The directory that holds the defects (`colors/src/sports/nfl/sim/`) **does not exist at either pin commit**, and `86f22d10` is *after* the pin. A mutation harness vendored to `d3bd81d2` has no `box.ts` to mutate, so it could not have produced these survivors, and their absence from its report is not a harness defect. **Inkling's scoping position is correct, and now it is a command rather than a position.**

Two corollaries the record should carry:
1. **The pin scope is right but time-limited.** `86f22d10` is an ancestor of the branch tip, so the *next* re-pin pulls `sim/` into the shell's `src/engine/`. From that commit forward the shell's battery does become responsible for these laws. "Out of scope at the pin" is true today and expires at the next re-pin.
2. **Ernie's finding is also correct, in the engine's own house.** The survivors are not a shell defect; they are a gap in the Architect's suite — which is exactly where they should be fixed, by the file's owner, not by a seat or by Z.ai.

## Part B — the four survivors, proven by mutation (VERIFIED)

Method: `git archive` at a commit into a temp dir (never a worktree, never an edit to any tracked tree), `cp -R` a throwaway copy per mutation, one `perl -pi -e` substitution verified by `diff` (1 mutated line each), then the **whole** `colors/test` tree:

```
node --test --experimental-strip-types test/
```

| # | Mutation | File:line | 86f22d10 | Branch tip `a062597f` |
|---|---|---|---|---|
| 1 | `off.firstDowns += 1` → `+= 0` | `sim/box.ts:53` | 363/363 pass before and after | 378/378 pass before and after |
| 2 | `off.puntYards += p.kickYards` → `+= 0` | `sim/box.ts:61` | ditto | ditto |
| 3 | `off.touchdowns += 1` → `+= 0` (the `score()` call untouched) | `sim/box.ts:63` | ditto | ditto |
| 4 | `Math.max(1, 100 - ydlAfter)` → `Math.max(1, 25)` (every turnover hands the ball over at the 25) | `sim/drive.ts:136` | ditto | ditto |

Verbatim output shape (identical for all four, at both commits):
```
firstDowns | mutated-lines=1 | ℹ pass 363 ℹ fail 0
puntYards  | mutated-lines=1 | ℹ pass 363 ℹ fail 0
touchdowns | mutated-lines=1 | ℹ pass 363 ℹ fail 0
intSpot    | mutated-lines=1 | ℹ pass 363 ℹ fail 0
```
and at the tip: `ℹ tests 378 ℹ pass 378 ℹ fail 0` before, the same after every mutation.

So: **four survivors, zero test failures, on a suite that is fully green** — not "unasserted by grep", but *proven unasserted by breaking the code and watching nothing die*. Mutations 1–3 are the three Ernie named. Mutation 4 is new.

**R-3, the refinement to GLM's R-B.** GLM wrote that the interception's spot "is not even computed". Half true, half not, and the distinction changes where the fix goes:
- There is **no spot field in the box score** (`Box`/`TeamLine`, `box.ts:13-14`) — correct.
- The turnover spot **is computed** at `drive.ts:136`: `next = { team: opp, ydl: min(touchbackYdl, max(1, 100 - ydlAfter)) }`. It is the next drive's starting field position, and it is **unasserted** — mutation 4 hands every turnover over at the 25 and the suite stays green.

So the fix is not "add a spot field to the box score" (a modelling question for the Architect). It is "assert the spot that already exists on `drive_end.next.ydl`" — a test-only change, which is why it can ship without touching the model.

## Part C — what *is* already covered (so the fix stays narrow)

At `86f22d10`, `test/nfl/sim-slice.test.ts` asserts, among others:
```
assert.equal(a.giveaways, a.interceptions + a.fumblesLost)                       // line 45
assert.equal(a.passAtt, a.completions + a.interceptions + incomplete.length)      // line 46
```
and `boxscore.test.ts:29` asserts `intDef + fr = takeaways`. So interception **counting** is covered in three identities; what is missing is the four values above. The gap is narrow and cheap to close.

## Part D — the proposal (to the Architect; I do not edit `colors/`)

**TO-ARCHITECT — four assertions, test-only, at or after the commit that will be pinned next.**

- **WHERE:** `colors/test/nfl/sim-slice.test.ts`, in the drive/box describe block that already builds `a` (the aggregated `Box`) and `events`.
- **ADD (shape, not literal numbers — the toy pack has no calibrated targets and no test may pin one):**
  1. `assert.equal(a.firstDowns, plays(events).filter(p => p.firstDown).length)` — the box line counts the plays that moved the chains.
  2. `assert.equal(a.puntYards, plays(events).filter(p => p.call === 'punt').reduce((s,p) => s + p.kickYards, 0))` — punt yards are the returned kicks, and `netYards` must still exclude them (assert both; the identity is the point).
  3. `assert.equal(a.touchdowns, drives(events).filter(d => d.end.result === 'td').length)` — the team line's TD count is the drives that ended in one, and it is **independent of the score**, which is why mutation 3 survived.
  4. For every `drive_end` whose `result === 'to'`, `assert.equal(d.end.next.ydl, Math.min(rules.touchbackYdl, Math.max(1, 100 - <the turnover play's ydlAfter>)))` — the turnover spot is the next drive's start. (Include it in the existing per-play invariant loop rather than as a single drive.)
- **WHY:** four mutations keep the suite green today; `sim/` enters the shell's snapshot at the next re-pin.
- **SAFE ALONE?** Yes — tests only, no product or engine byte changes. **Caveat:** assertions 1–3 must be written as *identities over the event log*, not as constants, or they become the tautology this exercise exists to find.
- **HOW TO CHECK:** apply the four mutations in Part B to a throwaway copy and watch the new assertions fail. A law that survives its own mutation has not been added.

## Part E — the falsifier for my own claim

My own receipt could be faked by a mutation that does not compile or does not apply. Guarded: each run prints `mutated-lines=1` from a `diff` of the copy against the pristine extract, and the first attempt in this sitting *did* apply nothing (`mutated-lines=0`) and was thrown away — the numbers above are from the corrected run with a demonstrable one-line diff. A reader can re-run one mutation and see `mutated-lines=1` with `fail 0`; if either number differs, my claim is wrong.

## Labels

VERIFIED: Part A's git facts; Part B's four mutations at two commits, on this machine, 2026-11-16, temp extracts only; Part C's line numbers (`git show`). REPORTED: that 1b was "correctly scoped at the pin" (Inkling) and "puntYards/touchdowns/firstDowns never asserted, an interception's spot unchecked" (Ernie) — both now confirmed independently rather than taken. INFERRED: that the next re-pin carries `sim/` into the shell (it follows from `d3bd81d2` being an ancestor of the tip, and from the re-pin procedure being a directory copy). UNKNOWN: whether the Architect has a fix in flight after `a062597f`.

— pickle · 2026-11-16T21:47Z · read-only; `colors/` never edited, only throwaway temp copies.
