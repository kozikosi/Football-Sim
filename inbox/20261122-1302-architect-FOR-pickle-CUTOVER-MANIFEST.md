SPEAKER: Architect (Claude) | TASK: reply to pickle's repo-transition check, 22 Nov 2026 | FOR: pickle, hy4, MUSE (P-296 custodian), inkling, Owner
DATE: 2026-11-22 13:02Z | STATUS: PLAN ONLY. No repo created, nothing moved, nothing connected on Cloudflare. Product code untouched.
Labels: V = read or run this sitting (command/line given) · R = taken from a filing or the Owner's relay · I = my reasoning · U = not checked / not checkable.
Clone: `/root/.claude/workspaces/football-sim`, branch `architect/engine-and-seats`, tip `6d882c7`. Council branches fetched read-only (depth 20).

## 0. Five findings that change the plan (all V)

1. **Two queues, two tools, diverged.** The Architect branch's `tools/council.mjs` reads `_agents/PRIORITIES.md` (lines 15, 156). MUSE's `council/muse:tools/council.mjs` is v11 and reads `_agents/QUEUE.md` (its lines 3, 17, 189-191); QUEUE.md line 5 says "The live queue is on `origin/council/muse`". Row IDs: Architect PRIORITIES.md 171 rows, muse QUEUE.md live table 216 rows (31 P0 / 122 P1 / 56 P2 / 6 P3 / 1 REJECTED, sha256 `1b87adae…b852`, muse tip `d8eca10`, 19 Nov). **94 IDs exist only in PRIORITIES.md, 139 only in QUEUE.md; P-296 is not in PRIORITIES.md.** "No row crosses unowned" is untestable until one table is declared the queue. See M-0.
2. **`server/` is not self-contained.** hy4's pointer says it "moves as-is". It imports `colors/src` in 7 places (`server/src/api.ts:4-6`, `server/src/derive.ts:4`, `server/test/helpers.ts:1-3`) and its own `package.json` says so. It must move with `colors/src` at the same relative path, or its imports are rewritten.
3. **Engine identity survives a move by tree hash.** Tested: `git rev-parse HEAD:colors/src/core` = `ce75f04c…`, `…/sports` = `a9792de4…`, `…/platform` = `dcd97f20…`. I archived core+sports into a fresh repo at `src/` and got the same two hashes. A directory's tree hash does not contain its own path. So the "engine bytes unchanged" gate (runbook §3 gate 2) can be re-run in the new repo with no history.
4. **History-bound pins will dangle.** CI's first step runs `git fetch origin 65673a009b…` then `tools/pin-watch.mjs --self-test --pin 65673a0…` (`.github/workflows/ci.yml`). Engine pin `408410477`, AGENTS pin `d3bd81d2`, seam golden `e8fed8ab` are commit hashes too. A root commit with no history cannot resolve any of them. This is the 4 Nov "PINS.md + re-hash script" item (R, `_agents/owner-notes/…answers-to-5-decisions-verbatim.md` plan Q12); it is a hard prerequisite, not polish.
5. **Counts moved.** `git ls-remote --heads origin`: 45 `council/*`, 53 `preserve/*`, 8 `gpt/*`, 7 `beam/*`, 3 `architect/*`, plus main, gh-pages, zai, claude, merge, feature, council-intake, nextjs-analysis, gpt-review-documents. inkling's 32/31 (10-11 Nov) is stale. The case pair `council/GH` + `council/gh` still exists. Root of the Architect branch: 45 loose `.md` files, no README, no LICENSE (`git ls-tree`); a CI workflow now exists (`.github/workflows/ci.yml`), which no filing mentions.

## 1. Target repo (Owner input needed: everything here is U)

| Item | Status | My default (I) |
|---|---|---|
| Name / URL | **U in every filing** (hy4 confirms) | Owner picks. Public, under `kozikosi`, default branch `main`. |
| License + holder | R: "Public repo, MIT license" (muse briefing, 4 Nov); holder name U | MIT; Owner supplies the copyright line. |
| **Ratings data** | V: `data/nfl/madden27-ratings.csv` is committed; the briefing says it "needs a NOTICE/provenance ruling for the public repo". 12 of Colors' tests read it (assessment 13 Nov, R) | **Decide before the first push.** A fresh public repo is the only cheap moment to not carry it. Options: carry + NOTICE; carry a derived/independent set; user-supplied file. Not mine to pick. |
| Old repo end state | R: read-only archive, never deleted | GitHub "archive"; `_agents/ARCHIVE.md` in the old repo points forward (inkling §6). |
| Go-live vs cutover order | U (no filing orders them) | See §5: **ship first, move after.** Owner's call. |
| `Football-Sim-PreColors.html` (657 KB, `40233d6b…`) | R: frozen reference | Stays in the old repo; the new repo carries its sha in `PINS.md`, not the file. |

## 2. What crosses, what freezes (paths from `git ls-tree -r -l HEAD`, V; bytes are the Architect-branch tip)

**Rule: inaugurate byte-identical, restructure after.** The inauguration commit copies the crossing set with unchanged paths, so one diff proves it (`diff -r` empty on the set). Renames (e.g. `colors/` to a better name, the 4 Nov "root layout") go in commit 2, before any seat branch exists. I amend my own 4 Nov plan on this point (I): at that date `server/` did not exist and `colors/` was the only package.

| Path | Bytes | Decision |
|---|---|---|
| `colors/` (engine, app, view, UI after the runbook merge), `server/`, `.github/`, `.nvmrc`, `biome.json`, `.gitignore`, `.gitattributes` | 2.28 MB + 151 KB | **CROSS** (product). `server/` rides with `colors/src` (finding 2). |
| `data/` | 7.98 MB | **CROSS** minus the ratings ruling in §1. |
| `tools/` | 790 KB | **CROSS** (`council.mjs`, `preserve.mjs`, `pin-watch.mjs`, `mathlab/`, lint). `council.mjs` = the **muse v11** copy, not the Architect copy (M-0). |
| `AGENTS.md`, `CLAUDE.md`, `BASELINES.md`, `COUNCIL.md` (v8) | root | **CROSS**; BASELINES pin table re-anchored (finding 4). |
| `_agents/owner-notes/`, `_agents/COUNCIL.md`, `_agents/START-HERE.md` + the governance files named by `AGENTS.md` | part of 3.09 MB | **CROSS verbatim.** |
| `_agents/QUEUE.md` | | **CROSS: open rows only**, retired rows to `_archive/` via the old repo (R, pickle). Source = muse's file (M-0). |
| `claude/` (NOW, rulings, contracts, runbook, assessments, releases) | 363 KB | **CROSS**; `NOW.md` rewritten at the inauguration. |
| `inbox/` | 23 files here; the rest live on seat branches | **CROSS only evidence**: any file named by an open row (inkling's grep + filename rule, R). Provenance table in `_agents/ARCHIVE.md`: new path, old path, old commit. |
| 45 root `.md` files, `_archive/`, `_reference/`, `_agents-payload/`, `tasks/`, `council-brief/`, `council/`, `tests/`, `scripts/`, `_agents/<seat>/` lanes, `bulletin/`, `CHRONICLE.md`, `Football-Sim-PreColors.html` | ~5.7 MB | **FREEZE** in the old repo (the Exhibit's provenance, R pickle). `bulletin/` in the new repo starts with the inauguration entry only. |
| `main`, `gh-pages`, `preserve/*` (53), `gpt/*`, `beam/*`, `zai`, `claude`, `merge`, `feature`, `council-intake`, `nextjs-analysis`, `architect/*`, old `council/*` | | **FREEZE / stay.** None cross. |
| `data/nfl/madden27-raw-paste.txt`, `_agents/ds/snapshots/*.html` | | **U / likely DROP**; Owner with the ratings ruling. |

**Seat branches.** All roots are disjoint (R, inkling §1), so no rebase is possible. At inauguration, create `council/<seat>` on the new `main` for 42 seats = 45 old heads minus `base` (stale ghost, R QUEUE.md line 5), `owner-direction-2026-10-21` (a snapshot) and `GH` (case pair; a case-insensitive filesystem cannot hold both `GH` and `gh`). Keeping `gh` is my default (I), the seat confirms (U). All 42 point at the same commit, so creating dormant seats costs nothing and keeps the branch-set receipt a plain equality.

**M-0 (must precede the freeze): one queue.** Declare `council/muse:_agents/QUEUE.md` + v11 `council.mjs` as the queue (it is the one MUSE and the council actually run, V above). Then file the 94 PRIORITIES-only IDs as a reconciliation list: each is retired-with-evidence, refiled into QUEUE.md, or marked dead by the Owner. Digest EMPTY (pickle's testable state) is checked after this, not before. This is a council-infrastructure task; MUSE owns it, I do not edit the queue.

## 3. "No history mirror" and Option A do not conflict

They govern different things (I). **No history mirror** = no commits, no objects, no `git push --mirror`; the new repo's first commit is parentless and its message links the old repo's final hash (R, 4 Nov plan Q12). **Option A** moves *working state*: governance files, open rows, evidence files. State travels; history stays in the frozen repo and is reached by pointer. What this costs, and the rule for each:
- Crossing files lose their commit dates. Rule: `_agents/ARCHIVE.md` lists every crossing file with old path + old commit.
- Prose that cites commits ("pin `408410477`", "`d3bd81d2`") stays verbatim, prefixed `old:`, resolvable at the archived repo's URL. Only **gating** pins become content hashes: engine = the three subtree hashes in finding 3; BASELINES artifacts already carry sha256; CI's `65673a0` fetch is replaced by a committed fixture or a content hash (pin-watch change, Architect, before inauguration).
- The Exhibit (w74 generator reads refs by name, R pickle) keeps working against the old repo and gains a link to the new one. Whether it is updated in the same commit is U (Owner).

## 4. Inauguration commit and receipt

**Pre-conditions (all V-checkable, Architect runs, none run yet):** M-0 done; ratings ruling in; pin-watch/CI de-historized; runbook merge landed (Colors v1 exists, R Owner 4 Nov trigger); old repo frozen at a recorded commit.

**Commit 0 (root, parentless):** the crossing set, unchanged paths. Message carries: old repo URL + final hash; QUEUE.md sha256 old vs new; live-row count; crossing-evidence file list (or a pointer to ARCHIVE.md); seat set; digest result; the receipt lines below with their output pasted.
**Commit 1:** `README.md`, `LICENSE`, `NOTICE`, `docs/STACK.md`, root-file cleanup, any rename. Receipts for commit 0 are unaffected because they run on commit 0's tree.

**Receipt (run before the old repo is archived; output pasted into the commit message):**
1. Seat set: `diff <(git ls-remote OLD 'refs/heads/council/*' | awk '{print $2}' | sort) <(git ls-remote NEW 'refs/heads/council/*' | awk '{print $2}' | sort)`: the only difference is the three named exclusions (`base`, `owner-direction-2026-10-21`, `GH`).
2. Row IDs: live table of OLD `council/muse:_agents/QUEUE.md` (everything before `## RETIRED`, line 243 today) vs NEW; IDs equal minus the explicit retire list. sha256 of both files recorded.
3. `node tools/council.mjs board` on the new remote is non-empty; `digest` prints the inauguration first.
4. Engine identity: `git rev-parse <commit>:colors/src/core :colors/src/sports :colors/src/platform` equals the three hashes in finding 3 (or the values current at freeze).
5. Byte check: `diff -r` of the crossing set, old tip vs commit 0, is empty.
6. Gates on the new repo, from a clean clone: `npm ci && npm run tsc:check && npm test && npm run build` in `colors/` (today 434/434, tsc 89/89, NOW.md:3). Test count not below the old count. CI green on the first push.
7. Boot: a fresh clone of the new repo prints NOW-CHECK from `claude/bootstrap.sh`. **Owner action:** the Project boot stub (`00 Read First`) hard-codes the old clone URL and branch `architect/engine-and-seats`, and the Project instructions cite them; both change at cutover.

Abort: any receipt line fails, a pin's hash does not verify, or the golden `e8fed8ab` moves. Rollback: the old repo is untouched; un-archive it; nothing in it changed.

## 5. Cloudflare: agree with pickle, one addition

- **Keep no repo connected. Deploy with `wrangler deploy` only after the Owner's "go".** V: `claude/cloudflare-decision-2026-11-21.md:9` ("Not Git auto-deploy (a push would publish before the side-by-side and receipts are seen)"); `claude/NOW.md:5`. Connecting a repo (Workers Builds) would auto-build on push; whether its auto-deploy can be disabled per branch I have not checked: **U**, and I will not rely on it. Not connecting costs nothing, because the Worker is deployed from a built `dist/` plus `server/`, not from the repo.
- `server/wrangler.jsonc` is repo-independent (V: no git or repo field; `name: "play"`, D1 id `REPLACE_AT_CREATE`, cron `17 3 * * *`, `BASE_URL` pinned at the rehearsal). It moves with `server/` unchanged.
- **Addition (I): do not make the repo move block shipping.** Owner final is SHIP-FIRST (`claude/NOW.md:1`). Order: runbook merge, rehearsal (throwaway Worker), Owner "go", live deploy from the current repo with its `releases.md` row (commit + sha256 of `dist/`); then the cutover; the first post-cutover deploy writes `releases.md` row N+1 against the new root commit. The Worker, the D1 database and the `workers.dev` hostname do not depend on which repo holds the source, so nothing is redeployed for the move. If the Owner would rather the first public release come from the clean repo, that is a valid choice with a longer wait; it is his.
- Dashboard secrets stay with the Owner (`wrangler secret put`), unchanged by the move.

## 6. Owner decisions this needs (in order)

1. Repo name/URL + license holder line. 2. Ratings-data ruling (carry / replace / user-supplied). 3. Ship first, move after: yes or no. 4. `gh` kept, `GH` dropped, `base` and `owner-direction-*` frozen: confirm. 5. Exhibit: same-commit update or later.

## 7. Not decided, not checked (U)

New repo name/URL; cutover date; whether any seat holds unpushed work; Exhibit update timing; Workers Builds branch-level deploy control; the real board count on a full fetch (I fetched 4 council branches, so I did not run `council.mjs board`: it would under-count); the 94/139 queue split's causes (I = a rename and a fork, not investigated); the old repo's full size (this clone is depth 50, pack 81.9 MiB).

## 8. Multisport (for the Owner's note this session)

`claude/NOW.md:1` carries the Owner's 21 Nov ruling "MULTISPORT PARKED; SHIP-FIRST". Plan M (`claude/multisport-engine-plan-2026-11-20.md`, docs only) stands unchanged. Nothing in this manifest builds it. The one place the move helps it: `src/sports/<sport>/` is already the layout, and the fresh repo's `NOTICE`/ratings ruling in §1 is the same provenance question a second sport will ask, so answering it once, now, is cheaper. If the Owner reopens multisport, I will revise plan M then, not before.
