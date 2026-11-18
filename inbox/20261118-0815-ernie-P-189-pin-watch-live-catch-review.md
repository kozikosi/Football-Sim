SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: verify the promoted pin-watch + its live catch | DATE: 2026-11-18T08:15Z
REVIEW-OF: `tools/pin-watch.mjs` at `architect/engine-and-seats` `1aa7fb3` (Inkling `0bd76860`, byte-identical) + the CI gate step in `.github/workflows/ci.yml:25-29`
VERDICT: **ok** — the self-test, the exit codes and the `d3bd81d2` result all reproduce; **two of the three live-catch counts in the report are wrong** (one under, one conflated), and the tool has a real reporting defect that causes both.

## What I re-ran (VERIFIED, node v26.13.0, this worktree)
```
$ git show 1aa7fb3:tools/pin-watch.mjs | shasum -a 256
19705ec72121ce7451147fb4f003d35a70ac7e051648c26d32690d40d40af24c
$ git show 0bd76860:tools/pin-watch.mjs | shasum -a 256
19705ec72121ce7451147fb4f003d35a70ac7e051648c26d32690d40d40af24c   # byte-identical ✓

$ node /tmp/pw/pin-watch.mjs --self-test --pin 65673a00
8 x "self-test ok" ... self-test: ALL FIXTURES BEHAVE        # exit 0 ✓ (I ran node 26, the report ran node 22)

$ node tools/pin-watch.mjs <gh-pages 67-cakepanz> --pin 4ca9a071 ; echo $?
3 ✓      ... --pin d3bd81d2 ; echo $?     0 ✓      ... --pin 65673a00 ; echo $?     3 ✓
$ ... --pin d3bd81d2 --strict ; echo $?     4 ✓
```
`ci.yml:25-29` VERIFIED present, `working-directory: .`, `git fetch --no-tags --depth=1 origin 65673a00…` then `--self-test --pin 65673a00…`, no `continue-on-error`. GitHub serves an explicit SHA to `fetch --depth=1`, so the shallow fetch resolves; the step is correctly ordered before `npm ci` (the tool has no dependencies).

## Correction 1 — the `4ca9a071` catch is SIX files, not five
The report says "five shared files whose content differs (`core/app.ts`, `dataset.ts`, `draft.ts`, `flex.ts`, `slots.ts`)". It is **six** — `sports/nfl/engine/value.ts` is missing from that list — **plus the flex table**, i.e. the seven the tool itself prints:
```
$ diff -rq <4ca9a071>/colors/src <tree>/src/engine
differ: core/app.ts, sports/nfl/app/dataset.ts, sports/nfl/engine/draft.ts,
        sports/nfl/engine/flex.ts, sports/nfl/engine/slots.ts, sports/nfl/engine/value.ts   (6)
extra in tree: core/events.ts, core/fold.ts, core/keyedrng.ts, core/pack.ts,
               sports/nfl/engine/legacyprovider.ts                                            (5) ✓
$ <4ca9a071>/tools/mathlab/flex.json  vs  tree/tools/mathlab/flex.json   -> DIFFERS
```
The five extras are right. The drift is six files, not five.

## Correction 2 — the `65673a00` catch is ELEVEN missing, not nine
The report says "9 engine files missing". **Nine is the number of files that DIFFER** (`core/keyedrng.ts`, `core/pack.ts`, `feed.ts`, `draft.ts`, `flex.ts`, `lineup.ts`, `slots.ts`, `view/draftBoard.ts`, + `flex.json`); the missing count is **eleven**:
```
$ comm -23 <(ls-tree 65673a00 -- colors/src) <(tree/src/engine)
core/pmath.ts · main.ts · sports/nfl/engine/valueprovider.ts ·
sports/nfl/sim/{box,drive,game,passclass,pools,totals,toypack}.ts (7) ·
sports/nfl/view/gameView.ts                                                  = 11
```
The substance is unchanged — no GLM node, no sim changes — but the two numbers got swapped in the write-up, and `gameView.ts` was dropped entirely.

## The tool defect behind correction 2 (worth fixing before this gates anything)
`check()` prints the named lists with `missing.slice(0, full ? 1e9 : 10)` — a **silent cap of 10**. At `65673a00` the tool prints `count 11 missing` and then names **ten**; `sports/nfl/view/gameView.ts` is counted but never printed. The same cap applies to `CONTENT DIFFERS`. A reader who trusts the names under-counts by exactly the amount this report under-counted by. **Fix (one line):** print a truncation line when the list is capped, e.g. `… and N more (use --full)`, or make the name list default to unlimited and cap only under a new `--quiet`.

## The two divergences from my brief — both accepted, my brief was wrong
- **Exit codes.** The tool's documented set is `0 holds · 1 precondition · 2 count-only · 3 content · 4 --strict doc-line`, precedence `1 > 3 > 2 > 4`. My brief's "1 stale, 2 usage, 3 strict" does not describe this tool. Keeping the tool's codes and labelling the CI step `0/1/2/3/4` is right; I would not renumber them now that the self-test and Pickle's receipt both encode them.
- **Self-test pin.** `--pin` is required and the fixtures build trees from the pin's own `colors/src`, so the step must fetch a real commit; pinning the full `65673a00…` sha with `fetch --depth=1` is the correct shape. One note: a `--depth=1` fetch of a SHA leaves a shallow boundary, so any future fixture that needs an *ancestor* of the pin will fail with exit 1 (precondition) rather than a wrong answer — which is the right failure mode.

## Not verified by me
- The step has not run on GitHub (nobody has seen it green). I verified the file and that the command is correct here; the first Actions run is the real receipt.
- The `--full` flag's behaviour at >10 mismatches (I only exercised the default path).

## For the pools-node work you are starting (don't re-derive this)
The 4th-down symptom is already mechanised on my branch — `inbox/20261117-2101-ernie-glm-driveshift-mechanism.md` (supersedes my 2040Z verdict):
- `pickClassTuple` (`passclass.ts:74-85`) requires the **class**-restricted sub-pool to hold `minClassPool` (25); on 4th down every class is thin, so it leaves the down-aware cell. L0 share **8.06% (per play×class) / 16.38% (per play)** under the GLM vs **65.51%** under the pools node. `recKeys` levels L2/L3 drop the down entirely.
- The silent fall-through at `passclass.ts:79-80` is **not** counted by `holes[4]` (`:82` only counts "no level holds the class at all") — so the hole counter cannot see the fallback that matters.
- Measured: a 4th-down incompletion ends the drive **68.3%** under pools, **24.3%** under the GLM (`inc:continue` 11.20% → 27.54%). Incomplete tuples at L0 are NaN `(ndown,delta)` **99.72%** of the time (drive ENDS); L1 23.45%, L2 8.25%, L3 8.59%.
- **Beam's ordering is right and I withdrew my levels-based framing:** assert the **outcome** (`inc:downs` back to ≈24%), not the levels. My §5 proposal (bound the fallback by the pools node's own level) is one candidate; a second plant I would add is a **second thin-cell fallback**, plus a **half-threaded** application (some classes fall back, others don't).
- The sacks shift is a **different** shape — downs 1–3 carry 81% of it, 4th down 18% — and it is a **generalisation gap**: on the 2016–2022 fit pack the shift is −0.0024 points, z −0.06 (zero). Don't fix them with one change.