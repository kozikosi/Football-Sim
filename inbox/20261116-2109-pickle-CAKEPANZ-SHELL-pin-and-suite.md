SPEAKER: pickle | ROLE: council | TASK: Part 10 (the pin) + the swap-test question M3 — which commit each tree carries, and whether it is green | DATE: 2026-11-16T21:09Z
FOR: R-13 (framework comparison; CAKEPANZ-SHELL round)

**What this unblocks:** Z.ai's Step-0 pin task and the Architect's merge gate. The answer is not "one document is stale". There are **two trees at two different pins, and neither is both current and green**: the latest shell (s5) is green on the *old* pin, and the deployed tree is on the *current* pin and **fails 9 of its own 286 engine laws**. Any merge done today lands in one of those two states.

Companion: `20261116-2100-glm-CAKEPANZ-SHELL-boxscore-mutation-scope.md`, `20261116-2105-glm-CAKEPANZ-SHELL-pin-report.md` (GLM's Part 10 says "the READMEs are correct; AGENTS.md is stale" — true of the s5 tree, **not** of the deployed one; see R-3).

## The table

| Tree | `src/engine/` files | Identical to | `tools/mathlab/flex.json` | Carried engine suite | README says |
|---|---|---|---|---|---|
| `origin/gh-pages:67-cakepanz/` (`66096fb1`, 2026-11-15) | 57 | **`d3bd81d2`** 57/57 | 99 rules (23/43/10/23) | **277 pass / 9 fail** of 286 | `4ca9a071`, "52 TypeScript files" |
| `origin/council/inkling:_agents/inkling/deliveries/67-cakepanz-s5/` (latest full shell) | 52 | **`4ca9a071`** 52/52 | REV 4 (QB→FS −10) | **284 pass / 0 fail** | `4ca9a071` ✔ correct for itself |

So: the deployed tree carries the current pin and a stale README; the latest shell carries a correct README and the stale pin. **There is no tree that is (a) the latest shell, (b) on `d3bd81d2`, and (c) green.**

## Receipts

**R-1 · gh-pages `src/engine/` is byte-identical to `d3bd81d2`, not `4ca9a071` (VERIFIED).**
Every file compared by *git blob hash* (not by `diff` of extracts), so no worktree is touched:
```
for commit in d3bd81d2 4ca9a071; do
  while read f; do rel=${f#67-cakepanz/src/engine/}
    a=$(git rev-parse "origin/gh-pages:$f"); b=$(git rev-parse "${commit}:colors/src/$rel")
    ... compare ...
  done < <(git ls-tree -r --name-only origin/gh-pages -- 67-cakepanz/src/engine)
done
```
Output:
```
==> d3bd81d2: identical=57 missing=0 differs=0
==> 4ca9a071: identical=46 missing=0 differs=11
```
The 11 differing files are the re-pin itself (`core/app|events|fold|keyedrng|pack`, `app/dataset`, `engine/draft|flex|legacyprovider|slots|value`) — the same set GLM's R-H lists.

**R-2 · s5 `src/engine/` is byte-identical to `4ca9a071` (VERIFIED).** Same method, 52 files:
```
s5 vs 4ca9a071: identical=52 missingInCommit=0 differs=0
s5 vs d3bd81d2: identical=46 missingInCommit=0 differs=6
```
(6, not 11, because s5 carries 52 of d3bd81d2's 57 files — the five files "only in pinB", `core/events|fold|keyedrng|pack`, `engine/legacyprovider`, are absent from 4ca9a071 and therefore absent from s5.)

**R-3 · The deployed tree's own engine suite FAILS (VERIFIED).** `git archive origin/gh-pages -- 67-cakepanz` into a temp dir, then:
```
node --test --experimental-strip-types test/engine.test.ts
ℹ tests 286   ℹ pass 277   ℹ fail 9
```
The nine, verbatim:
```
✖ flex: the typed table equals tools/mathlab/flex.json (REV 4) rule by rule
✖ flex: every penalty is 0, 2, 4 or 6 and every role in the data has a row
✖ flex: Owner rulings of 28 and 29 Oct (REV 3, REV 4)
✖ flex: NICKEL and DIME are free for CB, SS and FS; WR pays 4
✖ flex: DL5 is natural for DT and EDGE and costs the cheaper of role->DT, role->EDGE for the rest
✖ flex: no arbitrage; going A -> B -> C through two spots is never cheaper than the listed A -> C
✖ base: totals are not comparable. A roster of 4-3 natives is worth MIKE x 2 + SAM x 4 less in 3-4 ...
✖ base: with a second natural ILB the 3-4 lineup has no flex at all, the DT2 spot is his, a DT sits ...
✖ E5 pins: the engine and data stamps are what the last deliberate change left them
```
**Diagnosis (VERIFIED by the two facts above):** the re-pin moved `src/engine/**` and `tools/mathlab/flex.json` to the 99-rule table, but the tree's *carried test expectations* still assert REV 4 (their titles say REV 4; the 4ca9a071 expectations). Eight of the nine are the Owner's flex/formation rulings landing — a **law moved and the laws that assert it were not moved with it** — plus the E5 stamp pin, which is the intended behaviour of a stamp law (it should fail when the engine changes) and can only be re-pinned by the Architect, never by Z.ai editing the number.

**R-4 · The control that makes R-3 meaningful (VERIFIED).** The same command on s5: `ℹ tests 284 ℹ pass 284 ℹ fail 0`. So the harness is not broken and the s5 tree is internally consistent — the red is specific to the half-applied re-pin.

## Verdicts on the asked questions

- **"Which commit does `src/engine/` actually carry?"** Two answers, one per tree: deployed = `d3bd81d2`; latest delivery (*s5*) = `4ca9a071`. Anyone quoting one number without naming the tree will be wrong about the other.
- **"Which document is stale?"** The deployed `README.md` (names `4ca9a071` and "52 TypeScript files" over a 57-file `d3bd81d2` snapshot). s5's README is correct for s5. AGENTS.md's Cakepanz row ("frozen snapshot is now `d3bd81d2`") is **right about the deployment and wrong about the shell being built** — so it is not simply "stale"; it describes a tree nobody is building in.
- **"A shell whose README names the wrong pin cannot be re-pinned safely."** Agreed, and stronger: a shell whose *tests* still assert the previous pin cannot *verify* a re-pin either. The safe re-pin is one commit that moves the snapshot, `tools/mathlab/flex.json`, **and** the carried expectations, and ships the suite green in that same commit. The E5 stamp is then re-pinned by the Architect's act, with his hash, not by a seat editing a constant.

## What I did not do

The shell's `npm ci` / `vite build` / `batteries/slice1.battery.mjs` were **not** run: `npm ci` needs the registry and this machine's seat tree is not the shell's. The engine suite needs no dependencies, which is why it is the strongest check available to a seat with no node_modules. **UNKNOWN**: whether the deployed tree's UI battery passes at `d3bd81d2` (its flex-dependent board values would move — see GLM's R-H); that needs a machine with the dependencies installed, or Z.ai's own run.

## Labels

VERIFIED: R-1 to R-4, this machine, 2026-11-16, temp `git archive` extracts only; every other seat's branch read with `git show`/`git rev-parse`, never checked out. REPORTED: the 52-file and 57-file counts are the trees' own file lists (I counted the same way, so the numbers agree). INFERRED: that the eight flex/formation failures are legitimate law moves rather than defects (they assert the superseded table; the Owner's 99-rule table is the truth per R-2/2026-11-15). UNKNOWN: the deployed UI battery, above.

— pickle · 2026-11-16T21:09Z · read-only on Z.ai's tree and every other seat's branch.
