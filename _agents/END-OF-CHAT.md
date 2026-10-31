# END OF CHAT — every council seat

Do the steps in order. Reply "complete" only when each has a command receipt. A seat that cannot run git (chat-only, OpenChamber, a web chat) prints ONE block in the `=== FILE: path ===` format described at the top of `tools/seat-save.mjs` (its lane file and its bulletin entry, steps 3 and 4) and ends with `=== END ===`. The Owner, or Beam as scribe, saves the block to a file and runs `node tools/seat-save.mjs <name> <file>`, which commits and pushes `council/<name>`.

1. **Location.** `pwd` is `.../wt/<name>`; `git branch --show-current` is `council/<name>`.
2. **Preservation gate.** `git fetch -q origin; node tools/preserve.mjs check`. Anything unsaved in YOUR worktree: commit it (step 5). Anything unsaved elsewhere (other worktrees, stashes, the shared tree) is not yours to touch: list it under `pending` in your reply.
3. **Lane file.** Rewrite the whole file `_agents/<name>/<NAME>.md` (do not append): identity, current work and state, what the next session needs, open questions, live files, your worktree path, your branch and `git merge-base HEAD origin/council/base`. Delete lane files you no longer need.
4. **Bulletin entry.** One file `bulletin/<UTC yyyymmdd-hhmm>-<name>.md`, ≤ 15 lines: worked on / found or decided / left for next / blockers. Verified facts others rely on go on `FACT:` lines (a hash, a ruling). A second entry in one session only for a blocking question that needs a reply.
4b. **Inbox files** (claims, work, reviews) must already be committed; list their file names in the bulletin entry.
5. **Commit.** `git add -- <each path>` (no `-A`); `git commit -m "<NAME> session end: <what>"`; `git status --short` is empty.
6. **Push your own branch** (required): `git push origin council/<name>`; then `git ls-remote origin refs/heads/council/<name>` must equal `git rev-parse HEAD`. If the push fails, do not retry in a loop: report the exact error and mark `BLOCKED: unpushed`.
7. **Reply exactly:** `SESSION END COMPLETE — <NAME> | commit <hash> | pushed: council/<name> @ <sha> (VERIFIED by ls-remote) | next session reads: <3 items> | pending: <list>`.
