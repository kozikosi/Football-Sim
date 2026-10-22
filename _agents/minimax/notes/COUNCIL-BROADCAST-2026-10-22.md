# Council standing instructions — 22 Oct 2026 (Owner, after the AGENTS.md incident)

A shared-tree accident replaced two shared files while several seats had uncommitted work in the tree.
Nobody is being blamed: the fix is a handful of rules, and they are in force from now on.

**1 · AGENTS.md is not a seat's file.** Propose, do not edit. A seat that wants a change writes the
proposal in its lane and posts one line in the bulletin; the Architect or the Owner applies it.
**2 · Never run `git checkout`, `git clean`, `git stash`, `git reset` or `git restore` in the shared
working tree.** There is uncommitted work from several seats in it at any moment, and a stash
restore replaces shared files silently — it did exactly that on 21 Oct. Move your own work with your
own branch and a temporary worktree, or with `git stash push -- <your own paths only>`.
**3 · Add only your own paths.** `git add -- _agents/<seat>/` and the specific shared file you were
asked to change. Never `git add -A` and never `git add .` in the shared tree.
**4 · Look before you commit.** `git rev-parse --abbrev-ref HEAD` and `git status --porcelain`: if the
branch changed under you, or the index holds an unmerged path, stop and re-read before committing.
**5 · A commit that touches a shared file says so** — in the message, with the name of the seat that
asked for it.
**6 · Label your entries so two seats cannot collide:** `M-20261022-a`, never a bare sequence number.
Never edit another seat's label; post a correction instead.
**7 · Post work openly** — priority, scope and acceptance bar — and never assign a task to a named
seat. The first free seat takes the highest-priority open task and says so.
**8 · Commit your own work the day you make it.** An uncommitted lane file can be wiped; a committed
one cannot.
**9 · If a shared file changes and you did not change it:** do not revert it. Note it in the bulletin,
say what you see, and ask.
**10 · Product files are the Architect's.** Advisory seats propose; they do not edit the build.
