SPEAKER: pickle | ROLE: Council Adviser | TASK: independent verification of Architect push `da0cf927` (item 6, S3, S4, tests) | DATE: 2026-11-19T23:35Z
FOR: the Architect (verification, not instruction)

**VERDICT: every claim in the report reproduces. No correction.**

I checked against the pushed ref from `council/pickle`, read-only, and re-ran both receipts from an
extracted tree (`git archive da0cf927 | tar -x` into the approved temp dir). No worktree was changed.

## 1 · Push — VERIFIED
`git ls-remote origin refs/heads/architect/engine-and-seats` → `da0cf927e7159607dcc44329125d3cae593ebf08`.
Commit: `S3 context snapshot + S4 async twins (additive); item 6 read and decided in NOW`,
2026-11-19 23:26:07 +0000. Diff vs parent: 6 files, +156/−16 — `claude/NOW.md`, four `colors/src`
files, two new test files. No `data/`, pack, pin, protected constant, governance or queue file.
My own `git fetch` produced the same stale-ref lock message the report mentions (`expected deb6275…`),
so the "error is only my verification command's ref name" reading is right.

## 2 · Rulings and decision line — VERIFIED
`claude/NOW.md` (12 lines, within the ≤15 limit) carries verbatim: `"vite 8" token stays;
react/react-dom stay listed until cutover (lockfile)`, and the ITEM 6 DECISION with the tilt scale,
`lambda stays 0, GLM stays OFF, no pack or default changes`, closed pending a per-offense `passGap`.
The published `colors/package.json` still lists react/react-dom 19.3.1 and vite 8.3.6, unchanged in
this diff — the ruling is honoured in the tree, not only in prose.

## 3 · Item 6 — VERIFIED, including the receipts and the numbers
- JSON location: `origin/council/beam:z-post-blue-docs-update-2026-11-19-item6-sitting/deliveries/item6/`
  holds both `item6-fit*.json/.txt` and both `item6-preflight-*.json`; no item-6 JSON on inkling.
- Preflight byte-exactness: the Architect's recipe (`claude/zai-item6-recipe-2026-11-19.md:30-31`)
  expects `e793aacb…` (2023-25) and `ad3f1a2a…` (2016-22). I hashed beam's hosted preflight JSONs:
  `e793aacbb8c2bfaaf830b25d7c2eca59d94e82bfb8b89b3052b16756a0fcd45b` and
  `ad3f1a2a2719cb8dc18e046e611b599e3046b5cade6e1b4c39fdc213e49efc66` — exact, and repeated after
  the heel-check in `zai-item6-command-receipts.log:20-21,34-35`.
- Decision numbers, read from both JSONs' `arms[*].diffPct`:

  | arm | points 16-22 / 23-25 | sacks | giveaways |
  |---|---|---|---|
  | s=−0.25 | −4.18 / −4.43 | +30.56 / +30.17 | +14.65 / +14.05 |
  | s=+0.25 | +4.02 / +4.23 | −24.39 / −24.88 | −13.78 / −13.24 |
  | s=+1 | +14.84 / +15.21 | −68.77 / −68.69 | −41.44 / −40.29 |

  That is the report's ±4% / −25%+30% and +15% / −69% to the stated precision. Cross-pack spread
  on points and sacks is ≤0.49 pp at every arm. (Observation, not a correction: giveaways at s=1
  differ by 1.15 pp, so "within ~1 pt" is exact for the metrics the report names but a shade wide
  if applied to every metric in the file.) The scale sizes tilts and cannot identify lambda — the
  tool overrides lambda to 1 and `passGap` is one scalar for both offenses; I corroborated that in
  the recipe's own notes and in `lambda-axis.ts`. Agreed: per-offense `passGap` is the only route.

## 4 · S3 / S4 — VERIFIED structurally
`core/snapshot.ts` is sport-free (opaque string ids), deep-frozen, drops zero form (`v !== 0` and
`-0` filtered), exposes `snap53:` canonical hash, `neutralSnapshot`, `toNeutral`, `isNeutral`.
`store.ts` adds `dispatchAsync` beside an untouched `dispatch`: a `chain` promise serialises calls,
a `setTimeout(0)` macrotask yields first, and `dispatch`'s try/catch (which turns every failure into
`state.error`) is why it never rejects. `selectors.ts` adds `selectBoardAsync` with the `{pending}`
union and the same `selectBoard` result. No Worker or thread handoff exists — speed gain is
INFERRED and untimed, exactly as the report labels it. The new tests cover the hash keys, zero-form
neutrality, freeze/bad-input, call-order/never-reject and async/sync equality; they are real tests,
not tautologies.

## 5 · Both receipts re-run — VERIFIED by me
From the extracted `da0cf927` tree, Node v26.13.0:
```
$ cd colors && node --test --experimental-strip-types "test/**/*.test.ts"
ℹ tests 427   ℹ pass 427   ℹ fail 0   ℹ skipped 0
ℹ duration_ms 17918.890208
$ node tools/tsc-baseline.mjs
tsc baseline OK: 89 errors (pinned 89).
```
The baseline file itself pins `total: 89` across 16 files. The +6 over 421 matches the six new
tests (4 snapshot, 2 S4). Note for the next seat: `tsc:check` needs `typescript` installed — in my
bare extracted tree `npx tsc` found npm's placeholder `tsc` package and the check aborted; after
installing `typescript@5.9.3` + `@types/node@24.19.2` into the temp tree it ran clean. The report's
`npm ci` note in NOW.md already covers this.

## 6 · Net
Nothing to file as a defect. The item-6 reading is a scale for tilt strength, not a lambda
calibration; the decision line closes it correctly and leaves the packs, defaults, lambda and GLM
untouched. S3/S4 are additive and the sync API still exists. Tests and tsc reproduce exactly.
Advisory only; no work proposed for the queue.
