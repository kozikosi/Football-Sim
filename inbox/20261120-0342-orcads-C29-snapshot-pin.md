SPEAKER: orcads | ROLE: advisor | TASK: C29 | DATE: 2026-11-20T03:42Z

# C29 — snapshot pin reconciliation (which tree is the pin?)

VERDICT: **improved** — the order's premise ("gh-pages says `4ca9a071`; c10 is a later build with a different snapshot") is right, but it is not a two-way choice. There are **four** engine hashes in circulation, **two of them are stale**, and none of the four is on the Architect's current branch (re-rooted 2026-11-19). A reviewer who diffs c10 against `408410477` or `4ca9a071` is diffing against the wrong tree.

## WHAT I RAN

```bash
git fetch -q origin
git show origin/gh-pages:67-cakepanz/README.md | grep -n "Pinned engine commit"
git log --oneline -8 origin/gh-pages -- 67-cakepanz
git log --oneline -3 origin/gh-pages -- 67-cakepanz/README.md
# blob-for-blob: gh-pages 67-cakepanz/src/engine vs d3bd81d2:colors/src
git ls-tree -r origin/gh-pages:67-cakepanz/src/engine | awk '{print $3"  "$4}' | sed 's#  src/#  #' | sort -k2
git ls-tree -r d3bd81d2:colors/src | awk '{print $3"  "$4}' | sort -k2
join -j 2 gh_eng.txt arch_src.txt   # then count $2!=$3
# ancestry / location of every hash
git cat-file -t 4ca9a071 d3bd81d2 5c808472 65673a00
git merge-base --is-ancestor <h> <ref>
git branch -r --contains <h>
# c10's own declarations
grep -n "5c808472\|65673a00" c10-package/cakepanz-4/SHELL-STATUS.md
grep -n "5c808472\|65673a00" c10-package/cakepanz-4-prepared/SHELL-STATUS.md
sed -n '10,40p' c10-package/ledger/build-report-zai-cakepanz-9-2026-11-19.md
# engine file counts per pin
git ls-tree -r --name-only <h>:colors/src | wc -l
```

## WHAT I FOUND

### 1. The gh-pages README pin line is stale — its own bytes say so (VERIFIED)

```
$ git show origin/gh-pages:67-cakepanz/README.md | grep -n "Pinned engine commit"
4:**Pinned engine commit:** `4ca9a071` on `architect/engine-and-seats` ·
```

But the engine files in that same tree are `d3bd81d2`, blob for blob:

```
gh-pages engine files:       57   d3bd81d2 colors/src files:       57
common paths:       57
differing blobs:        0
--- paths only in gh-pages engine:
--- paths only in d3bd81d2 colors/src (first 20):
```

Cause, also VERIFIED: the re-pin commit updated the engine and the mathlab mirror but not the README.

```
$ git log --oneline -8 origin/gh-pages -- 67-cakepanz
66096fb13 67 Cakepanz: re-pin engine snapshot 4ca9a071 -> d3bd81d2 (99-rule flex, QB->FS 12)
0a9d73273 67-cakepanz slice 2 — TEAM SELECT: ...
...
$ git show --stat --oneline 66096fb13
 67-cakepanz/src/engine/core/app.ts                 |   6 +-
 67-cakepanz/src/engine/core/events.ts              |  68 +++++++++
 67-cakepanz/src/engine/core/fold.ts                |  28 ++++
 67-cakepanz/src/engine/core/keyedrng.ts            |  79 ++++++++
 67-cakepanz/src/engine/core/pack.ts                |  39 +++++
 ... (18 files, 482 insertions, 164 deletions) ...
 18 files changed, 482 insertions(+), 164 deletions(-)
$ git log --oneline -3 origin/gh-pages -- 67-cakepanz/README.md
0a9d73273 67-cakepanz slice 2 — TEAM SELECT: ...
```

`README.md` was last touched at `0a9d73273` (9 Nov), three commits before the re-pin. So `README.md:4` describes a tree that no longer exists. **The file to fix is `67-cakepanz/README.md` line 4; the replacement hash is `d3bd81d2`.** (I did not edit it — gh-pages is not my branch and the file is Z.ai's.)

### 2. The c10 package declares two different pins (REPORTED by the package, consistent with the hashes existing)

```
$ grep -n "5c808472\|65673a00" c10-package/cakepanz-4/SHELL-STATUS.md
1:# SHELL-STATUS.md — ... · pin 5c808472)
$ grep -n "5c808472\|65673a00" c10-package/cakepanz-4-prepared/SHELL-STATUS.md
1:# SHELL-STATUS.md — ... · pin 65673a00, 68 files — this is the PREPARED, NOT ACTIVATED copy; SNAPSHOT.md is the contract; the shipped sibling stays at 5c808472 until the Owner says so)
```

The build report's pins row agrees, and claims the engine was untouched:

```
| pins | `5c808472` — 67 files, `git archive` diff exit 0 | `65673a00` — 68 files, diff exit 0 | this sitting's run |
| engine files touched | ZERO (`diff -rq` vs the pins exit 0) | ZERO | this sitting's run |
```

File counts per pin (VERIFIED with `git ls-tree`):

```
4ca9a071 colors/src files:       52
d3bd81d2 colors/src files:       57
5c808472 colors/src files:       67
65673a00 colors/src files:       68
408410477 colors/src files:       69
```

### 3. Where each hash lives (VERIFIED) — this is the part that matters for reviews

```
$ for h in 4ca9a071 d3bd81d2 5c808472 65673a00 408410477; do git branch -r --contains $h; done
== 4ca9a071 (Architect: witness gate ...)
  origin/preserve/architect-engine-and-seats-pre-reroot-2026-11-19
== d3bd81d2 (Architect: framework recommendation ...)
  origin/preserve/architect-engine-and-seats-pre-reroot-2026-11-19
== 5c808472 (Pooled-node conformance ...)
  origin/preserve/architect-engine-and-seats-pre-reroot-2026-11-19
== 65673a00 (2a: the pass-class GLM node ...)
  origin/preserve/architect-engine-and-seats-pre-reroot-2026-11-19
== 408410477 (Multisport engine plan M ...)
  origin/architect/engine-and-seats
```

Ancestry inside the pre-re-root history is linear and the c10 pins are ahead of the public pin:

```
$ git merge-base --is-ancestor d3bd81d2 5c808472  -> YES
$ git merge-base --is-ancestor d3bd81d2 65673a00  -> YES
$ git merge-base --is-ancestor 5c808472 d3bd81d2  -> NO
```

`d3bd81d2 -> 5c808472` is 10 added + 8 modified engine files (18 files, +1269/−59):

```
added:    core/pmath.ts · main.ts · sports/nfl/engine/valueprovider.ts · sports/nfl/sim/{box,drive,game,pools,totals,toypack}.ts · sports/nfl/view/gameView.ts
modified: core/keyedrng.ts · core/pack.ts · sports/nfl/app/feed.ts · sports/nfl/engine/{draft,flex,lineup,slots}.ts · sports/nfl/view/draftBoard.ts
```

### 4. The re-rooted tip is not byte-identical to the c10 pin (VERIFIED) — do not diff across it

```
408410477 colors/src files:       69
common with 65673a00:       68; differing:        7
--- only at tip (new since 65673a00):
core/snapshot.ts
```

The 7 files that differ between `65673a00` (c10 prepared) and the Architect's tip `408410477` are:

```
sports/nfl/app/appstate.ts
sports/nfl/app/saves.ts
sports/nfl/app/selectors.ts
sports/nfl/app/store.ts
sports/nfl/engine/valueprovider.ts
sports/nfl/sim/game.ts
sports/nfl/sim/pools.ts
```

Those are the Architect's later work (S3/S4 `da0cf927`, `dispatchAsync` `92f87f7e`, S1 seam `aa4f9b3d`), **not c10 defects**. A reviewer who runs `git diff 408410477 c10` will see 7 changed files plus a missing `snapshot.ts` and will misread them as regressions.

## THE TABLE (the deliverable)

| Claimed where | Hash | What the bytes are | Verdict |
|---|---|---|---|
| `origin/gh-pages:67-cakepanz/README.md:4` | `4ca9a071` | nothing — that tree is `d3bd81d2` (57/57 blobs identical) | **STALE — fix line 4 to `d3bd81d2`** |
| `AGENTS.md` §2 / `PROJECT-KNOWLEDGE.md` (current, from `council/muse`) | `d3bd81d2` | 57 files; equals the gh-pages `67-cakepanz` engine | **correct public pin** (99-rule flex) |
| c10 package, shipped tree (`cakepanz-4/SHELL-STATUS.md:1`) | `5c808472` | 67 files; descendant of `d3bd81d2` (+10 new, 8 modified) | **use this to review the c10 shipped build** |
| c10 package, prepared tree (`cakepanz-4-prepared/SHELL-STATUS.md:1`) | `65673a00` | 68 files; descendant of `d3bd81d2`; the 69-file tip minus `snapshot.ts` + 7 later edits | **use this to review the c10 prepared build** |
| Architect tip `origin/architect/engine-and-seats` | `408410477` | 69 files; 68 common with `65673a00`, 7 differ, `snapshot.ts` new | **correct for the Architect's tree; wrong baseline for c10** |

**Which to use for review, in one line:** reviewing the **c10 build** → `5c808472` (shipped) / `65673a00` (prepared); reviewing **gh-pages 67-cakepanz** → `d3bd81d2`; reviewing the **Architect** → `408410477`. `4ca9a071` is nobody's live pin.

**How to get the c10 engine bytes** (the hashes are not on `architect/engine-and-seats`; they are on the preserve ref):

```bash
git archive origin/preserve/architect-engine-and-seats-pre-reroot-2026-11-19 colors/src | tar -x -C <scratch>
# or a single file:
git show 5c808472:colors/src/sports/nfl/view/draftBoard.ts
```

## WHAT I WOULD CHANGE

1. **gh-pages `67-cakepanz/README.md:4`** — one line, Z.ai's file, propose to him/the Owner:
   - old: `**Pinned engine commit:** \`4ca9a071\` on \`architect/engine-and-seats\` ·`
   - new: `**Pinned engine commit:** \`d3bd81d2\` on \`architect/engine-and-seats\` (re-pinned 2026-11-15, gh-pages \`66096fb1\`; the line previously read \`4ca9a071\`) ·`
   - Why: the tree's own bytes are `d3bd81d2`; a stale pin sends reviewers to a 52-file tree.
   - Safe alone: yes (docs line in Z.ai's tree; no code).
   - How to check: `git show origin/gh-pages:67-cakepanz/README.md | grep -n "Pinned engine commit"` prints `d3bd81d2`; then re-run the blob comparison above and it still prints `differing blobs: 0`.

2. **Any test order that names a c10 baseline** (C15, C16, C22) should say `5c808472` / `65673a00`, not `408410477` and not `4ca9a071`. Otherwise the first diff a verifier runs shows the Architect's seven S1–S4 files as if they were c10 changes.

3. **AGENTS.md §2 is right for the public pin but is now ambiguous for c10.** One clarifying clause would save the next reviewer: "c10 (cakepanz-4) is built on `5c808472` shipped / `65673a00` prepared — both descendants of `d3bd81d2`, both on `origin/preserve/architect-engine-and-seats-pre-reroot-2026-11-19`, neither on `architect/engine-and-seats`." (MUSE integrates; I did not edit it.)

## WHAT I DID NOT CHECK

- **The c10 app tree's actual bytes.** The repo carries only `SHELL-STATUS.md` + the build report for c10 — not `src/`. So "c10's engine is `5c808472`" is **REPORTED by the package** (`SHELL-STATUS.md:1`, build-report pins row, "engine files touched ZERO"), not re-measured by me. To make it VERIFIED, a seat with the c10 zip must run `git archive 5c808472 colors/src | tar -x` and `diff -rq` against the zip's `src/engine/`.
- **`SNAPSHOT.md`** (the contract the prepared copy points at) is not in the repo either — UNKNOWN whether it names `65673a00` in the same words.
- **Whether gh-pages `67-cakepanz` is intended to track c10 at all.** It is three commits behind the c10 package's engine; that may be deliberate (c10 is not pushed — the build report says "gh-pages: nothing pushed"). I did not assume it either way.
- **`4ca9a071`'s own README claim history** (whether the line was correct when written on 9 Nov). It was: the slice-2 tree at `0a9d73273` did carry `4ca9a071`; the re-pin is what broke the line. INFERRED from the commit order, not re-diffed.

## REVIEW NOTES FOR THE CHAIN

- This is a **measurement**, not a proposal to build; it changes no product byte.
- One claim in the v2 order is corrected here: "gh-pages says the engine pin is `4ca9a071`; the c10 package is a later build with a different snapshot" is true, but the gh-pages *tree* is already `d3bd81d2` — the stale thing is the README line, not the snapshot.
- Suggested follow-ups (not taken): C15/C16 should now name `5c808472`; a seat with the c10 zip can promote item 1 of "did not check" to VERIFIED in one command.
