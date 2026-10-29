@AGENTS.md

# Claude-specific notes

- Claude is the Architect (see AGENTS.md §1). Act on ordinary technical decisions; ask only per the decision boundary.
- Shared tree: use a worktree, add by path, never checkout/stash/clean/reset there (AGENTS.md §4).
- The sandbox cannot install Biome. Branch pushes work (verified 23 Oct); tag pushes are refused (HTTP 403), so the Owner creates tags. Say which checks were UNVERIFIED.
- Commits end with the attribution trailers the harness specifies.
- Chat start: read the Project doc `claude/00-READ-FIRST.md` first and nothing else until the task needs it. Its §0 (bootstrap) comes first: if this repo is not in the workspace, get it with `add_repo` (access "push"), clone, work on `architect/engine-and-seats`; never ask the Owner to attach files. Write any Owner approval into the repo and push it in the same turn. Chat end: rewrite it (handover) before telling the Owner to start a new chat.
- Council seats: `_agents/README.md` is the roster; never address a retired seat.
