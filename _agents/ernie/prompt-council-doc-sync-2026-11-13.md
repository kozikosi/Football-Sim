# Council prompt — sync your worktree's governance docs to live (2026-11-13)

Owner-authorized. Send to every council seat (all seats, all branches).

---

Every seat worktree on this machine is carrying **2 November copies** of `AGENTS.md`, `PROJECT-KNOWLEDGE.md` and `_agents/START-HERE.md`. Measured 2026-11-13: **0 of 38 worktrees matched live**, and all 14 seat branches are exactly **61 commits behind `origin/council/muse`** — because `new-seat-worktree.sh` still starts new worktrees from `council/base` and nothing pulls. If you have read a governance doc from your own worktree this week, you read the pre-rename version: it says `PRIORITIES.md`, flex at 97 rules with items pending, and Svelte without the Owner's 12 Nov "not a lock" ruling.

**Do this once now, in your own worktree only.**

```sh
cd <your worktree>            # ../wt/<seat>
git fetch -q origin

# 1. guard: are you about to lose anything?
git status --porcelain -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md
#    empty output = safe to continue.
#    anything printed = you have uncommitted edits to a governance doc: commit them as a WIP
#    commit on your own branch FIRST, then re-run this check. Never discard them.

# 2. refresh the four docs to live
git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md

# 3. prove it is exactly four files, then commit and push YOUR branch
git diff --cached --stat
git commit -m "doc sync: governance docs to live (origin/council/muse 35e841da)"
git push origin council/<seat>
```

**Verify (self-comparing — do not trust the hashes printed in any doc, including this one):**

```sh
git fetch -q origin
for f in AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md; do
  a=$(shasum -a 256 "$f" | cut -d' ' -f1)
  b=$(git show origin/council/muse:"$f" | shasum -a 256 | cut -d' ' -f1)
  [ "$a" = "$b" ] && echo "ok    $f" || echo "STALE $f"
done
```
Four `ok` lines = done. For reference, at `origin/council/muse` tip `35e841da` (2026-11-12) the values were `AGENTS.md 64768b89ad9cbde4` · `PROJECT-KNOWLEDGE.md 39427f19fb802980` · `_agents/START-HERE.md 15207db64111e03e` · `_agents/START-OF-CHAT.md 589b4b84e1b46bb8`. They change when MUSE edits, so compare, don't memorise.

**Keep it true.** Re-run the same verify block:
- at the start of every chat (this is `START-HERE` §1 step 0 — MUSE is adding it as a patch),
- after any merge or pull of `council/muse`,
- and whenever MUSE posts a one-line "docs changed" note in `bulletin/`.
Do not run `git merge origin/council/muse` wholesale to get the docs: that drags MUSE's whole tree into your branch and buys you nothing but conflicts. Four files, no merge. The queue stays live via `node tools/council.mjs next` (it fetches); you never need to sync `_agents/QUEUE.md` into your branch.

**Which doc wins when two disagree.** The live copy on `origin/council/muse` is the truth, with MUSE as its single writer. **Exception:** Inkling, Beam and ERNIE may hold newer local work that is not yet on `council/muse` — if the file you are about to overwrite has uncommitted edits from one of them, stop and ask in your bulletin entry instead of overwriting. A seat's own un-pushed filing always beats the synced copy of the same file.

**Known defect in the live docs themselves (do not "fix" it locally).** `AGENTS.md:50` says the flex table is **99 rules, landed at `97d7e9d`**, while `PROJECT-KNOWLEDGE.md:24` still says **97-rule / 105 expected**, and its header still names `_agents/PRIORITIES.md`. That is MUSE's to correct at the source (`inbox/20261113-2040-ernie-one-copy-of-truth-docs.md`); until then, `AGENTS.md` §2 is the authoritative flex statement. Do not patch your local copy — a local patch is the drift this prompt exists to end.

**Root cause is being fixed separately** (proposal to MUSE, `inbox/20261113-2040-ernie-one-copy-of-truth-docs.md`): `new-seat-worktree.sh` should base new worktrees on `origin/council/muse` instead of `council/base`. Until that lands, every *new* seat will start 61 commits behind and must run this sync too.

Receipt that the command is safe on a live branch: ERNIE ran it and pushed `34f35508` on `council/ernie` (three docs refreshed, hashes verified, nothing else touched).