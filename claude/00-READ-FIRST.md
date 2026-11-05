# 00-READ-FIRST — Architect start guide for "76 Pancakes" (rewritten 2026-11-05)
Goal: reboot in the fewest tokens. Run `claude/bootstrap.sh`, read NOW.md + HANDOFF.md, resume. Nothing else is required.
The previous long version is archived at `_archive/project-docs/00-READ-FIRST-2026-11-02-full.md`; open it only when a task needs history.

## Which start?
- **Cold start (no clone at /home/claude/football-sim):**
  1. `mcp__claude-code-remote__add_repo` owner `kozikosi`, repo `football-sim`, access `"push"` (no pre-check; if NOT RUN, call again).
  2. Clone once, generous timeout (10 min), nothing else running: `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 clone --depth 1 --branch architect/engine-and-seats --single-branch https://github.com/kozikosi/football-sim /home/claude/football-sim` (429 = wait 5 s, retry once).
  3. Read only `claude/00-READ-FIRST.md`, `claude/NOW.md`, `claude/HANDOFF.md`.
  4. Verify (below), then resume the task named in HANDOFF.md.
- **Warm start (clone exists):**
  1. `sh claude/bootstrap.sh` (fetch + `pull --ff-only`, prints a state summary).
  2. Read `claude/NOW.md` + `claude/HANDOFF.md`.
  3. Verify, then work.
- **Verify:** branch is `architect/engine-and-seats`; HEAD matches NOW.md (or is a descendant); `git status --short` is clean or you know why not.
- **Digest (`node tools/council.mjs digest`)** only if the package touches queue work (PRIORITIES, council items, retiring items). Otherwise skip it.

## Safety rules
- Never `reset --hard`, `stash`, force-push, or overwrite uncommitted work. If `pull --ff-only` fails, stop and report; do not "fix" it destructively.
- Push only `architect/engine-and-seats` (`git push origin HEAD:architect/engine-and-seats`), add files by path. Never push main or council/base. Tags 403.
- Do not `rm -rf` a clone reflexively; check `git rev-parse HEAD` first.

## Standing facts
- Owner: Kosi (final say on product, protected constants, irreversible actions). Claude = Architect; only Claude builds `Football-Sim-*.html`.
- Council: nobody is assigned work, no claims. Research goes to seats via `node tools/council.mjs ask "<q>" --format "<shape>"`; do not research stats yourself. Protocol: `_agents/COUNCIL.md`. When you ship a queue item: `node tools/council.mjs retire <ID...> --why BUILT --evidence <hash>`.
- Figma is NOT available for this project: design in code (HTML/CSS checked at 390 px and desktop). UI brief: `claude/V22-work-order.md`.
- Tests: `cd colors && npm test` (see NOW.md for the expected count). npm needs: `NO_PROXY=localhost,127.0.0.1 no_proxy=localhost,127.0.0.1 npm_config_noproxy=localhost,127.0.0.1 npm install --no-audit --no-fund`.
- TypeScript runs under `--experimental-strip-types`: no enums or parameter properties; use `import type`.
- Mutation-check new test files; a test that passes first time is suspect.
- Labels: VERIFIED / REPORTED / INFERRED / UNKNOWN. Answers = outcome, file, one next step; no recaps.
- Commit trailers: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` and `Claude-Session: <session URL given by the harness>`.

## End of chat (keeps the next boot cheap)
Update `claude/NOW.md` (5-10 lines) and `claude/HANDOFF.md` (done / next action / hashes), commit, push, report the hash. If a chat is getting long, do this first, then say: "STOP — START A NEW CHAT IN THIS PROJECT NOW."
