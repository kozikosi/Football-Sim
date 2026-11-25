# Cutover rehearsal receipts (written by `tools/cutover-rehearsal.py`; scratch only, nothing pushed or created)
Source commit `ae81d53bd215592020aba06140282cbb4a880165`.
**Build and test checks: PASS.** **Player names: NOT CLEAN, 8 files hold 3 or more (needs a decision before any push).**

Source full gate: colors 486 pass / 0 fail; server 37 pass.
Crossing: 501 files of 744 tracked; 243 stay in the old repo; 12 hidden; 6 inbox files cross as evidence.
Commit 0 against the source (git blob ids): 500 identical, changed ['_agents/QUEUE.md'], added ['ARCHIVE.md', 'PINS.md'].
Queue: PREVIEW from origin/council/muse d8eca10e: 216 rows, 216 open rows kept, 0 retired rows left behind; P-296 kept.
Cross-list entries with no tracked file: `_agents/muse/deliveries/prompts-2026-11-05/claude-play-level-question-2026-11-10.md`.

| Commit | What | public pass + gated | fail | tsc | build | server pass | pinned folders | files with 3+ of 60 sampled names | files with 3+ of all names |
|---|---|---|---|---|---|---|---|---|---|
| 0 | Start of the 76pancakes repository | 364 + 122 = 486 | 0 | 89 | OK | 37 | same | 0 | 8 |
| 1 | Add README, licence, notice and the history pointer; point scripts at kozikosi/76pancakes | 364 + 122 = 486 | 0 | 89 | OK | 37 | same | 0 | 8 |
| 2 | Name the packages 76pancakes and 76pancakes-server | 364 + 122 = 486 | 0 | 89 | OK | 37 | same | 0 | 8 |

Exposure scan of the last commit with all 1934 full names of 8+ characters (names are not printed here). "Rated lines" is a rough count of lines that carry a name next to that player's own overall rating.

| File | distinct names | of the 60 sampled | rated lines |
|---|---|---|---|
| `claude/V22-work-order.md` | 35 | 1 | 9 |
| `_agents/owner-notes/2026-10-25-N2-verbatim.txt` | 18 | 1 | 1 |
| `_agents/owner-notes/2026-10-25-N1-verbatim.txt` | 12 | 1 | 1 |
| `_agents/owner-notes/2026-10-29-flex-weights-dl5-ui-verbatim.txt` | 7 | 0 | 0 |
| `_agents/QUEUE.md` | 7 | 0 | 0 |
| `data/nfl/README.md` | 5 | 0 | 0 |
| `_agents/owner-notes/2026-10-31-council-replies-gpt-grok-gemini.txt` | 5 | 0 | 0 |
| `tools/mathlab/results/p318-old-vs-new-2026-11-14.md` | 3 | 0 | 0 |
| `tools/mathlab/results/flexcensus-2026-11-10.md` | 2 | 1 | 1 |
| `tools/mathlab/flexscan.mjs` | 2 | 0 | 0 |
| `inbox/20261122-1830-architect-FOR-pickle-CUTOVER-MANIFEST-DELTA-2.md` | 2 | 0 | 1 |
| `colors/test/nfl/viewboard.test.ts` | 2 | 0 | 0 |
| `colors/test/nfl/players.test.ts` | 2 | 0 | 0 |
| `colors/test/core/namespacing.test.ts` | 2 | 0 | 0 |
| `_agents/PRIORITIES.md` | 2 | 0 | 0 |
| `tools/mathlab/flexcap.mjs` | 1 | 0 | 0 |
| `colors/test/nfl/versions.test.ts` | 1 | 0 | 0 |
| `colors/test/nfl/playerids.test.ts` | 1 | 0 | 0 |
| `colors/src/sports/nfl/engine/recap.ts` | 1 | 0 | 0 |
| `claude/rulings/2026-11-07-owner-flex-answer-and-star-scan.md` | 1 | 0 | 0 |
| `_agents/owner-notes/2026-11-07-flex-cap-10-verbatim.md` | 1 | 0 | 0 |
| `_agents/MULTISPORT-NAMESPACING.md` | 1 | 0 | 0 |

Boot from the final commit: `branch=architect/engine-and-seats head=ec0865b Name the packages 76pancakes and 76pancakes-server dirty=0` / `NOW-CHECK: STALE? 2 commit(s) after NOW.md:`

## Not covered by this rehearsal
Council seat branches; the CI workflow (it still fetches an old-history commit and would fail in the new repo); the muse copy of `tools/council.mjs`; a rewritten `claude/NOW.md`; `docs/STACK.md` and root-file cleanup; folder renames (only the package names change, so the `server/` imports of `colors/src` stay as they are); the Project boot stub that names the old URL; anything online.

## Architect's reading (added by hand; not written by the script)
- **V:** the checks for building and testing the new repo pass at all three commits, with no ratings file present.
- **V, finding:** the earlier exposure measure (60 sampled names) reports 0 files. Scanning every name reports 8 files with 3 or more. The sample was too small to support "no player names".
- **I:** these are notes, work orders, a data README and the queue, not player data files. `claude/V22-work-order.md` also carries a few name-and-rating lines.
- **V, what-if** (`--extra-hide`, same checks, 25 Nov): leaving out the seven non-queue files in the 3+ rows above keeps every build and test check passing; only `_agents/QUEUE.md` stays over the line. Some of those files are cited by other documents (for example `data/nfl/README.md` from `AGENTS.md`), so a trimmed copy may suit them better than leaving them out.
- **Owner decision, needed before the first push** (a public repo's history keeps whatever the first commit holds): (a) accept names in written notes, or (b) leave the seven out and reword the queue rows. My recommendation: (b), trimming `data/nfl/README.md` and not removing it. The queue rewording is MUSE's file (see T4).
- **V:** `tools/cutover-dry-run.sh` silently breaks its type check when given a relative `node_modules` path; pass an absolute one.
- Rerun at the real source commit on cutover day; this receipt describes the commit named at the top only.
