# PRESERVATION PASS 2 — for the one seat with file access to the Owner's machine (Beam)

Context: pass 1 saved untracked docs, tests, the Pickle candidate, retired-lane leftovers and the nested repo. Still unsaved (Beam's own report): 5 stashes, ~339 modified tracked files and ~139 untracked files in the shared tree (SHARED = `/Users/kosi/Desktop/Football Sim`), 2 pool worktrees at detached `49fafc20`, `FootballSim-architect` at `1ce97573`, three dirty Kilo worktrees (`collective`, `hallowed-shell`, `slime-galley`), local branch `beam/governance-cleanup`.

**This pass is read-only on every working tree.** No checkout/switch/stash (pop, apply, drop)/clean/reset/restore, no `git add` in SHARED, no deleting or moving anything. The tool below builds snapshots from a temporary index and pushes only to `refs/heads/preserve/*`. If the tool refuses (secret-looking name, file > 20 MB), report the file; do not override.

1. **Get the tool without touching SHARED's files.** `git -C SHARED fetch origin` then `git -C SHARED worktree add --detach ../wt/_tools origin/council/base`. Run everything below with the current directory set to SHARED, as `node ../wt/_tools/tools/preserve.mjs <cmd>`.
2. **Baseline.** `node ../wt/_tools/tools/preserve.mjs check` and paste the output.
3. **Local-only commits** (including pool HEAD `49fafc20`, `1ce97573`, `beam/governance-cleanup`): `... commits`. Paste the lines it prints.
4. **Stashes:** `... stashes`. Do not run any other stash command.
5. **Snapshot every dirty worktree** (full dirty state, tracked changes plus untracked, one commit each): for SHARED, `... snapshot "/Users/kosi/Desktop/Football Sim" shared-tree-2026-10-23`; for each other dirty worktree path from step 2, `... snapshot <path> wt-<last-path-segment>-2026-10-23`. This replaces the Tier 2/3 copy lists: it captures openchamber tests, `sports/`, the addendum note, `package.json`, scratch files and every modified tracked file in one commit per tree. Scratch can be pruned later; losing work cannot be undone.
6. **Verify.** `... check --fetch` must end with `OK` (dirty trees show `dirty, snapshot on origin/preserve/...`). Then `git ls-remote origin 'refs/heads/preserve/*'`: paste it.
7. **Confirm the nested-repo move did not move the wrong folder.** Paste `ls -la SHARED | head -40` and `git -C SHARED rev-parse --show-toplevel`; state whether `SHARED/.git` and the product files are where they were, and the exact path of `_nested-repo-backup-2026-10-23`.
8. **Do not edit any file in the repo** (including `AGENTS.md` and `PROJECT-KNOWLEDGE.md`, which belong to the Architect; your local edits to them are pushed by step 3 under `preserve/` for review and need no further action). Do not open PRs or merge.
9. **Report** one block: refs pushed (name, sha, verified by ls-remote), anything refused or failed with the exact error, the final `check` output, the step 7 answers. If a step fails, stop and report; do not improvise.
