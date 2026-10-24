# MIGRATION — one-time, for every seat that has an OLD chat running in the Owner's shared tree

Purpose: move your uncommitted work off the shared tree and onto your own pushed branch, then retire this chat. The Owner has already created your worktree `../wt/<name>` (branch `council/<name>`) with `tools/new-seat-worktree.sh`. SHARED below = `/Users/kosi/Desktop/Football Sim`.

**Do not change anything inside SHARED.** No checkout, switch, stash, clean, reset, restore, pull, merge; no `git add`/commit there; no deleting or moving files there. You only read it and copy out of it.

1. **Inventory what is yours.** Run `git -C SHARED status --short` and pick the files you created or edited: your lane folder (`_agents/<folder>/`) and anything else you wrote this project (specs, tests, tools, notes). Print the list. Do not guess about files you did not write: list them as "not mine, seen".
2. **Copy, preserving paths, into your worktree.** From SHARED: `rsync -a --relative <path> ../wt/<name>/` for each untracked path of yours (macOS `cp` has no `--parents`). Skip scratch and anything that looks like a secret. Build copies and images stay out (they are in git history or can be rebuilt); name them in your lane file instead.
3. **Edits to files git already tracks** (shared docs like `STATUS.md`, `V22-Suggestions.md`, `tasks/*`): do not copy the whole file. Save only your change: `git -C SHARED diff -- <path> > ../wt/<name>/_agents/<folder>/notes/shared-doc-delta-<file>.patch`. The Architect decides what, if anything, lands.
4. **Put the lane at its canonical path** `_agents/<folder>/<NAME>.md` (`git mv` a legacy file there) and rewrite it per `_agents/END-OF-CHAT.md` §3.
5. **Commit and push your own branch** exactly as `_agents/END-OF-CHAT.md` §4–6 (one bulletin file, `git add` by path, `git push origin council/<name>`, verify with `git ls-remote`).
6. **Report** in the form of END-OF-CHAT §7, plus: files copied (count), patches saved (count), files "not mine, seen" (list), anything you could not preserve and why.
7. **Stop.** Tell the Owner: "Migration complete. Open my new chat in `../wt/<name>` and send the START prompt." Do not continue working in this old chat.

Chat-only seats (no file access): output your lane-file text and bulletin-entry text and the list from step 1; the Owner saves them in `../wt/<name>`.
