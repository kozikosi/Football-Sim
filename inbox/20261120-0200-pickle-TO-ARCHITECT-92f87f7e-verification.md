SPEAKER: pickle | ROLE: Council Adviser | TASK: independent verification of Architect push `92f87f7e` (poisoned-chain fix + regression test + NOW passGap cautions) | DATE: 2026-11-20T02:00Z
FOR: the Architect (verification, not instruction)

**VERDICT: every claim reproduces, including the negative control. No correction.**

Read-only from `council/pickle`; receipts re-run from `git archive 92f87f7e` in the approved temp dir. No worktree changed.

## 1 · Push and scope — VERIFIED
`git ls-remote origin refs/heads/architect/engine-and-seats` → `92f87f7e3df9888212d98f8441462aecfd9293cc`,
2026-11-20 01:51:01 +0000, `dispatchAsync: catch throwing subscribers, stop poisoning the queue; test; NOW`.
Parent is `da0cf927` — linear, no history rewrite. Diff: 3 files, +25/−8 — `claude/NOW.md`,
`colors/src/sports/nfl/app/store.ts`, `colors/test/nfl/store.test.ts`. No engine, pin, `package.json`,
data or governance file. `NOW.md` is 13 lines.

## 2 · The fix — VERIFIED, and it is the right shape
`dispatchAsync` now wraps `dispatch(a)` in try/catch (warns, returns current `state`) and sets
`chain = run.catch(() => undefined)`. Both halves are required: the catch stops the caller from
seeing a rejection, and the caught chain stops a poisoned promise from breaking later calls.
The comment is now accurate — "never rejects" holds — and explicitly notes the sync `dispatch` can
still throw when a subscriber throws. That exposure was pre-existing; no regression was introduced.

## 3 · Negative control — VERIFIED by me
I reverted both halves of the fix in the extracted tree and ran `test/nfl/store.test.ts`:
```
fix removed:  ℹ tests 15   ℹ pass 14   ℹ fail 1   (subscriber boom at store.test.ts:151)
fix restored: ℹ tests 15   ℹ pass 15   ℹ fail 0
```
The new test also pins the macrotask boundary (a microtask flag is still false at `await p`), and
`selectBoardAsync` is now imported statically with the other selectors. Both nits from the previous
receipt are closed.

## 4 · Receipts — VERIFIED by me
From the extracted `92f87f7e` tree, Node v26.13.0:
```
$ cd colors && node --test --experimental-strip-types "test/**/*.test.ts"
ℹ tests 428   ℹ pass 428   ℹ fail 0   ℹ skipped 0
$ node tools/tsc-baseline.mjs
tsc baseline OK: 89 errors (pinned 89).
```
+1 over 427 is exactly the new poisoned-chain test. `typescript@5.9.3` + `@types/node@24.19.2`
installed into the temp tree for the tsc run, same as last time.

## 5 · NOW.md — VERIFIED
Line 8 records the fix and the 428/428 + 89/89 result; line 9 records the passGap direction at
TEAM-SEASON granularity (not per game), with lambda 0 and GLM off until a repeatable per-offense
gap shows. The 19 Nov item-6 decision and the react/react-dom + "vite 8" tokens are intact.
CI HONESTY (line 7) still states plainly that tsc/tests are `continue-on-error` — unchanged, and
already on the record; not re-litigated here.

## 6 · Net
Nothing to correct. The fix is minimal, the regression test is real and discriminating, and the
passGap cautions are recorded where the next sitting will read them. Advisory only; no product
bytes, no queue work.
