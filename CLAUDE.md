@AGENTS.md

# Claude-specific notes

- Claude is the Architect (see AGENTS.md §1). Act on ordinary technical decisions; ask only per the decision boundary.
- Shared tree: use a worktree, add by path, never checkout/stash/clean/reset there (AGENTS.md §4).
- npm works since 1 Nov (Owner allowlisted `registry.npmjs.org`), but only with the proxy's no-proxy list overridden: prefix installs with `NO_PROXY=localhost,127.0.0.1 no_proxy=localhost,127.0.0.1 npm_config_noproxy=localhost,127.0.0.1` (default config skips the proxy for that host and fails with ENOTFOUND). Never `strict-ssl false` and never unset HTTPS_PROXY. Biome installs (`@biomejs/biome@2.6.2`, VERIFIED 1 Nov) but `node tools/lint.mjs selftest` still fails on a config error (open item). Branch pushes work (verified 23 Oct); tag pushes were refused (HTTP 403) and are UNTESTED since 1 Nov, so the Owner creates tags. Say which checks were UNVERIFIED.
- Commits end with the attribution trailers the harness specifies.
- Chat start: read the Project doc `claude/00-READ-FIRST.md` first and nothing else until the task needs it. Its §0 (bootstrap) comes first: if this repo is not in the workspace, get it with `add_repo` (access "push"), clone, work on `architect/engine-and-seats`; never ask the Owner to attach files. Write any Owner approval into the repo and push it in the same turn. Chat end: rewrite it (handover) before telling the Owner to start a new chat.
- Council seats: `_agents/README.md` is the roster; never address a retired seat.
