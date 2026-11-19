# ORCAINK — boot check (paste at the start of every orcaink chat, or use as the chat's prefill)

**Do this before anything else. Never skip it. If it fails, stop and tell me (the Owner) — do not improvise around it.**

## The check (read-only, always safe)
Run:

```
pwd; git branch --show-current; git rev-parse --git-common-dir
git fetch origin && git worktree list | grep -E 'orcaink'
git ls-remote origin council/orcaink
```

## GOOD — proceed
All four hold:

1. `pwd` ends with `Desktop/wt/orcaink` (the council worktree, e.g. `/Users/kosi/Desktop/wt/orcaink`)
2. `git branch --show-current` prints `council/orcaink`
3. `git rev-parse --git-common-dir` ends with `Football Sim/.git`
4. `origin/council/orcaink` exists on the remote

→ Say so (one line with the output), then follow `_agents/START-OF-CHAT.md` as usual.

## WRONG — stop
Anything else. The known failure mode: **Orca auto-created a worktree with a random fish name on a branch like `wt/orcaink`**, cut from the repo HEAD instead of using the sanctioned worktree. This happened 2026-11-18 (`…/Football Sim/gramma` on `wt/orcaink`).

Then:

1. **Do not read, write, commit or push anything** except the read-only reporting commands below.
2. Report exactly what you found:
   ```
   pwd; git branch --show-current; git rev-parse --git-common-dir
   git -C "/Users/kosi/Desktop/wt/orcaink" status --short --branch
   git ls-remote origin council/orcaink
   ```
3. Ask the Owner: (a) should this session move to the sanctioned worktree `/Users/kosi/Desktop/wt/orcaink` on `council/orcaink` (e.g. re-anchor the chat in Orca, or OpenCode `session_move` there)? (b) if that worktree is missing/not on `council/orcaink`, they must open the chat against it or create it with `tools/new-seat-worktree.sh orcaink` — do not create worktrees yourself, do not check out `main`, do not fetch-and-use a different seat's branch.
4. **Never**: `git switch`, `git checkout`, `git stash`, `git worktree remove`, delete branches/worktrees, or commit/push from the wrong worktree. `wt/orcaink` has no remote and is not mine to push; `council/orcaink` is the only branch this seat ever pushes.
5. If the Owner says "move it": move the session to `/Users/kosi/Desktop/wt/orcaink` (OpenCode `session_move`), then re-run this check and confirm GOOD before any task work.
6. If the Owner says "just use gramma" (or any non-sanctioned worktree): confirm you will still only push `council/orcaink` (via that worktree's checkout of it being absent — you may need the sanctioned worktree anyway) and flag the divergence risk plainly before proceeding. Prefer option 5.

## Standing rules that ride this check

- One worktree per seat (`Desktop/wt/<seat>`), branch `council/<seat>`. Parliamentary name, Orca fish name, whatever — the path and branch are the test.
- Sync before work (`sync-base.sh`); push after every finished task; never force-push; never stash (WIP commit instead).
- "I was asked to work here" is not authorization to work in the wrong tree.
