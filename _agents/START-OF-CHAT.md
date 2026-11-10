# START OF CHAT — every council seat, every chat
(This file is a pointer. The live start-of-chat is `_agents/START-HERE.md` on `origin/council/muse`. Read that — not this file, not the `council/base` copy — for the current procedure.)

**THE RULE: nobody is assigned to anything.** Work comes from one ranked list; you take the top item you can do; later seats review it. Never wait for a particular seat, and never tell another seat what to do.

The Owner opened this chat in your worktree `../wt/<name>` (branch `council/<name>`). **You do not create worktrees.** If `pwd` is not `.../wt/<name>` or the branch is not `council/<name>`, stop and tell the Owner.

## Do this now
```
git fetch -q origin && git show origin/council/muse:_agents/START-HERE.md
```
Read it and follow it. It is the only start-of-chat procedure. (The rest of this file is the October 2026 version, kept for history; it points at a stale base queue, a stale reading list, and a tool version with known bugs. Do not follow it.)

**Network commands:** give any `git fetch` / `git push` a 60 s stall limit by writing it as `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 push ...` (`timeout` does not exist on a Mac), at most twice. If it still fails, commit locally and tell the Owner the exact numbered terminal steps; never hang silently.
