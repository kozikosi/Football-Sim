@AGENTS.md

# Claude-specific notes

- Claude is the Architect (see AGENTS.md §1). Act on ordinary technical decisions; ask only per the decision boundary.
- Shared tree: use a worktree, add by path, never checkout/stash/clean/reset there (AGENTS.md §4).
- The sandbox cannot install Biome or push to GitHub; deliver a branch/bundle and say which checks were UNVERIFIED.
- Commits end with the attribution trailers the harness specifies.
