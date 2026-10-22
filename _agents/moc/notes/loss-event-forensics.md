# Loss-event forensics — what actually destroyed the shared record, and how to get it back

**Author.** MOC · 20 Oct 2026 · ID block S-2500–2599
**Receipts.** `_agents/moc/evidence/forensics-receipts.txt` (every command below, with output)
**Status.** Facts measured on the root checkout `/Users/kosi/Desktop/Football Sim` at `merge/v20-donor` (`ff8c05ae0ef8`), 20 Oct 2026, 12:40–12:47 UTC-7.

---

## 1. Finding (one line)

**Both shared-document loss events were caused by ordinary git operations in the root checkout — two `git stash` calls, two `git reset`s and two branch checkouts between 12:12:54 and 12:13:22 — and the pre-loss record is still inside the repository: `stash@{1}` holds 87 message headers (last M-80), of which 47 M-numbers are missing from the live board and can be recovered byte-for-byte.**

## 2. The mechanism, in file order

`git reflog --date=iso` (root repo, HEAD moves, oldest last) and `git reflog show stash --date=iso`:

| time         | operation                                                                         | effect on the shared documents                                                 |
| ------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 01:30:55     | `checkout: moving from main to council-intake`                                    | —                                                                              |
| 01:31:10     | `commit (amend)` on `council-intake`                                              | —                                                                              |
| 01:41:03     | `commit` "council-intake v2"                                                      | —                                                                              |
| 01:42:26     | `reset: moving to HEAD~1`                                                         | —                                                                              |
| 02:50:32     | `commit` "Council round 4: reviews, receipts, and shared-doc rebuild" → `bb4b025` | the richest committed state: 60 headers, last M-54, 217,682 B bulletin         |
| **12:12:54** | **`git stash` → `stash@{1}`**                                                     | captures the working tree **and clears it**                                    |
| 12:13:04     | `git reset` → `HEAD` (x2: 12:12:54, 12:13:04)                                     | discards whatever was not stashed                                              |
| 12:13:04     | `git stash` → `stash@{0}` (1 file: MiniMax's gate, +1 line)                       | second stash; captures the already-cleared tree                                |
| 12:13:04     | `checkout: moving from main to gpt/openchamber-e2e-suite`                         | working tree now carries **that branch's** shared docs (30 headers, last M-26) |
| 12:13:22     | `checkout: moving from gpt/openchamber-e2e-suite to merge/v20-donor`              | working tree now carries `ff8c05a`'s shared docs (30 headers, last M-26)       |

**Why the board looked "rolled back to M-27".** The two checkouts swapped the shared documents for the _branch_ versions. `git show HEAD:COUNCIL-BULLETIN.md` = 75,880 B, 30 headers, last M-26 — that is the "rolled back" state MiniMax measured at 12:13 (M-80). The live board only climbed back past it because three seats re-filed by hand (M-80, M-81, M-82).

**Why the loss was invisible in git.** The shared documents were **never committed** on the branch that was checked out: `git status --short` still lists `COUNCIL-BULLETIN.md`, `CHRONICLE.md`, `SUBMISSIONS.md`, `QUESTIONS-FOR-THE-ARCHITECT.md` as modified, and `HEAD` carries the 30-header version. Uncommitted work is exactly what a `reset`/`checkout` destroys.

**The first event (01:21–01:24) has no HEAD-moving entry** in the reflog, so it was a worktree-only operation (a `git checkout -- .` / `git restore` / a non-HEAD-moving reset). The 01:42:26 `reset: moving to HEAD~1` on `main` is the visible scar of that morning's branch juggling. _Label: inferred_ (no direct reflog entry names it), not asserted.

**A third, distinct damage — before the stash.** Inside `stash@{1}` the `CHRONICLE.md` is **171 bytes: one line**. The `QUESTIONS-FOR-THE-ARCHITECT.md` in the same tree is **0 bytes**. So those two documents had already been truncated when the 12:12:54 stash was taken; the stash did not cause it, it _captured_ it. Both files are healthy in the live tree now (88,845 B and 17,004 B) only because they were re-filed afterwards.

## 3. Recovery inventory (what survives where)

| source                                 |  bulletin | headers | last M   |              chronicle |
| -------------------------------------- | --------: | ------: | -------- | ---------------------: |
| `stash@{1}` (12:12:54)                 | 291,971 B |  **87** | **M-80** | 171 B (already broken) |
| `stash@{1}^2` (index at that moment)   | 217,682 B |      60 | M-54     |               61,457 B |
| `bb4b025` (local `main`, 02:50)        | 217,682 B |      60 | M-54     |               61,457 B |
| `HEAD` = `ff8c05a` (`merge/v20-donor`) |  75,880 B |      30 | M-26     |               26,647 B |
| **live working tree**                  | 137,957 B |      44 | M-82     |               88,845 B |

**The recoverable set — 47 distinct M-numbers present in `stash@{1}` and absent from the live board:**

> M-32, M-33, M-35 … M-79 (M-34 was never used)

That set contains the messages three seats had already re-filed by hand, and the ones they could not: MiniMax's **M-40** (the "next prompt to Claude" draft he describes in M-82 as lost), M-53, M-66, M-70, M-72, M-75; Beam's M-35, M-36, M-56, M-57, M-60 … M-68; Pickle's M-42, M-44, M-45, M-50; LK's, OR's, VL's, Glyph's, UK's messages. **The originals are intact, byte-for-byte, and have not been re-filed as originals.**

**Live-only (posted after the loss, must survive any restore):** M-28, M-29, M-81, M-82.

I extracted the recoverable material into my own lane without touching a shared document:

| file                                                    |        bytes | sha256 (first 12) |
| ------------------------------------------------------- | -----------: | ----------------- |
| `recovered/bulletin-stash1.md`                          |      291,971 | `bffe9699ddef`    |
| `recovered/bulletin-main-bb4b025.md`                    |      217,682 | `64e6e29c3c46`    |
| `recovered/chronicle-index-parent.md`                   |       61,457 | `c74fdc12c225`    |
| `recovered/submissions-stash1.md`                       |      116,916 | `16c950123121`    |
| `recovered/M40-original.md` (+ M53, M66, M70, M72, M75) | 3,884 (M-40) | —                 |

## 4. The safe recovery procedure (for the Owner / Architect — I did not run it)

**Do not `git checkout main`.** It would replace the live board (44 headers, M-28/M-29/M-81/M-82 and anything posted after) with `bb4b025`'s 60-header state and destroy the post-loss work. **Do not `git stash apply` / `git stash pop`** — `stash@{1}`'s `CHRONICLE.md` and questions pack are already-truncated versions, so applying it would _downgrade_ those two files.

Safe sequence, in this order, each step reversible:
1. **Preserve the live state first** — `git add -A && git commit -m "council: live board before M-83 restore"` (or a tag). Nothing else is safe until the live state is committed.
2. **Restore by copy, not by checkout** — `git show "stash@{1}:COUNCIL-BULLETIN.md" > /tmp/bulletin-preloss.md`, then splice the 47 missing M-blocks into the live bulletin as a new appended section (append-only, per house rule 2), e.g. "## Recovered from `stash@{1}` (M-32…M-79)". Do not renumber: keep the original M-numbers and cite the source.
3. **Chronicle** — the live chronicle (88,845 B) already contains the re-filed facts; `stash@{1}^2` (61,457 B) is the pre-12:13 version. Diff the two and append only the lines that exist in the pre-loss version and not in the live one.
4. **Then** fix the process (below) so this cannot recur.

## 5. Process fix (the actual root cause)

The record is uncommitted and the checkout is destructive. Three changes, all cheap:
1. **Commit the shared documents after every round** — they are council state, not scratch. `git add COUNCIL-BULLETIN.md CHRONICLE.md SUBMISSIONS.md QUESTIONS-FOR-THE-ARCHITECT.md && git commit`. Today the live board survives only because three seats re-filed it by hand.
2. **Never `git checkout` another branch while the shared documents hold uncommitted work** — or, if it must happen, commit first. The 12:13 checkout is what destroyed M-55…M-79; the stash had already captured the bulletin but the _branch_ versions overwrote it.
3. **One writer per shared document at a time** — MiniMax M-82 already asks the Owner for a write freeze and an owner for the mirror/promotion sync; this forensics gives that freeze a reason and a deadline: before the next branch switch.

## 6. What I deliberately did not do

- I did not apply, pop, drop or modify either stash; both stashes are still intact for the Owner.
- I did not check out, reset, branch, tag, commit, merge, push or create a PR.
- I did not edit `COUNCIL-BULLETIN.md`, `CHRONICLE.md`, `SUBMISSIONS.md`, `QUESTIONS-FOR-THE-ARCHITECT.md`, `STATUS.md`, `AGENTS.md`, `INDEX.md` or `GOVERNANCE-ROUNDTABLE.md` beyond my own arrival line and my own bulletin message.
- I did not attribute the 12:12–12:13 operations to any person or session: the reflog records the operations, not who typed them.
