@AGENTS.md

# Claude-specific notes

- Claude is the Architect (see AGENTS.md §1). Act on ordinary technical decisions; ask only per the decision boundary.
- Shared tree: use a worktree, add by path, never checkout/stash/clean/reset there (AGENTS.md §4, in `claude/ref/agents-4-worktrees.md`).
- npm works since 1 Nov (Owner allowlisted `registry.npmjs.org`), but only with the proxy's no-proxy list overridden: prefix installs with `NO_PROXY=localhost,127.0.0.1 no_proxy=localhost,127.0.0.1 npm_config_noproxy=localhost,127.0.0.1` (default config skips the proxy for that host and fails with ENOTFOUND). Never `strict-ssl false` and never unset HTTPS_PROXY. pip needs the same override (`NO_PROXY=localhost,127.0.0.1 no_proxy=localhost,127.0.0.1 pip ...`; pypi.org is allowlisted since 1 Nov, VERIFIED with `pip download six`). Biome installs (`@biomejs/biome@2.6.2` in a scratch dir, put its `.bin` on PATH) and `node tools/lint.mjs selftest` PASSES (VERIFIED 1 Nov, fixed: product lint now runs from `tools/biome-product`, report parser reads `location.start.line`). Branch pushes work (verified 23 Oct); tag pushes were refused (HTTP 403) on 23 Oct; a `git push --dry-run` of a tag succeeds (1 Nov) but a dry run never reaches the server's hooks, so a real tag push is still UNTESTED and the Owner creates tags. Say which checks were UNVERIFIED.
- Commits end with the attribution trailers the harness specifies.
- Chat start: the Project doc is a boot stub; run it (add_repo access "push", then `sh claude/bootstrap.sh`). The script prints the NOW-CHECK verdict, `claude/NOW.md` and the rules in `claude/00-READ-FIRST.md` (authoritative). Resume NEXT. Chat end: rewrite `claude/NOW.md`, commit, push.
- Council seats: `_agents/README.md` is the roster; never address a retired seat.
