SPEAKER: inkling | ROLE: council | TASK: framework-tooling capability reconciliation handoff | DATE: 2026-11-14T02:34Z
FOR: the Owner · the digest
FOR CLAUDE/Z.ai: read against your practice slice — the servers prove themselves before you need them

Handoff asked for Priority 1 (agent capability testing) and Priority 3 (MCP reporting) to land. What is verifiable from this seat was verified out-of-band — a direct stdio MCP initialize/tools-list on each shipped server, on this machine, just now. Honest classification:

## Out-of-band (host-shell) verification — each server handshakes cleanly

A minimal MCP stdio client (spawn `npx -y <pkg> [args]`, `initialize` → `notifications/initialized` → `tools/list`) was written to `$SCRATCH/mcp-probe.mjs` and run. Results (this machine, node v26.13.0 / npm 11.20.0):

| server (exact pinned version) | initialize | tools/list (names) | verdict |
|---|---|---|---|
| `@sveltejs/mcp@0.1.30` (Svelte MCP, `npx -y @sveltejs/mcp@0.1.30`) | **serverInfo `Svelte MCP` v0.0.1** · caps tools/prompts/resources | **`get-documentation, list-sections, playground-link, svelte-autofixer`** | **VERIFIED — server initializes and enumerates; 4/4 expected tools exposed** |
| `@playwright/mcp@0.0.85` | **serverInfo `Playwright` v1.66.0-alpha-2026-11-09** · caps tools.listChanged | **25 tools:** browser_navigate, browser_click, browser_type, browser_snapshot, browser_fill_form, browser_evaluate, browser_console_messages, browser_take_screenshot, browser_network_requests, browser_tabs, browser_press_key, browser_wait_for, browser_select_option, browser_drag, browser_hover, browser_resize, browser_drop, browser_fill_form… (`browser_close`, `browser_snapshot`, `browser_wait_for` present) | **VERIFIED — server enumrates fine; bundled browser is `1.66.0-alpha-2026-11-09` vs scaffold devDep `1.65.1` (exact delta the Owner flagged — recorded, not chased)** |
| `@upstash/context7-mcp@4.7.0` | **serverInfo `Context7` v4.7.0** · caps tools/prompts/resources | **`resolve-library-id`, `query-docs`** | **VERIFIED — answers tool list as-documented** |
| `@vue/devtools-agent@9.0.0-rc.3` (`connect` mode) | **serverInfo `devframe-connect` v0.0.0** · caps tools | **`devframe_connect_list-instances`, `devframe_connect_call-tool`** | **HANDSHAKE VERIFIED / LIVE CONNECT NOT TESTED** — the 2 tools confirm the agent exposes the bridge surface; the live Vue DevTools authorization (the six-digit flow the Owner started on `:5173`) was NOT driven through here — raw handshake ≠ live inspection. Do not overclaim outside Claude Desktop. |

Total wire-ups per scaffold confirmed byte-identical for the two shared servers (`.mcp.json` vs `.kilocode/mcp.json`, both, both namespaces — unchanged by me since the scaffold setup; constant across these runs).

## Honest classification per the handoff's own labeling law

VERIFIED (this run, commands fresh):
- All four shipped MCP servers initialize over stdio and enumerate their tool lists on this machine — including the previously untested `vue-devtools` agent handshake.
- The Playwright MCP's bundled browser (`1.66.0-alpha-2026-11-09`) exists inside the npm package; the scaffold development browser is `1.65.1` stable — the delta is recorded in the framework-choice prompt, not papered over.
- Claude Desktop configuration at `~/Library/Application Support/Claude/claude_desktop_config.json` contains the four new servers + preserved `github` and `filesystem` servers with absolute node paths (`/usr/local/bin/npx`); backup `claude_desktop_config.json.backup-2026-11-14T02-22-45-201Z` exists.
- Both scaffolds re-verified: `npm run check`/`type-check` exit 0 (re-run this session, outputs logged); smoke tests pass 1/1; MCP wiring files consistent (svelte: svelte+playwright+context7 · vue: playwright+context7+vue-docs+vue-devtools).
- vitest 4.1.12 in both — `1 passed` each; vue's unit-test discovery no longer ingests smoke.spec.ts.

REPORTED (owner-side, not independently exercised by me in this session):
- Desktop connector rows showing `context7`, `filesystem`, `github`, `playwright`, `svelte` connected; `vue-devtools` listed-but-unconfirmed. The six-digit authorization flow on `:5173` is click-driven by the Owner, not automation here.
- The Playwright-MCP-backed **browser behavior** through agents (Desktop / Kilo / OpenChamber executes selection against `1.66.0-alpha` while tests run against `1.65.1`) is not the same as either being defective — it's merely an observation of two minor lines behind the prompt pin. Recording is honest; no rewrite justified yet.
- fsevents policy warnings: unchanged, fsevents untouched; no remediation requested or made.

INFERRED (reasoned, not run):
- Agent instructions currently recorded in each scaffold's `AGENTS.md` should fire as written. If they don't on first invocation, that's a settings-shape finding, not a package defect — report, don't patch.
- The Vue `vue-docs` hosted endpoints remain the only *non-local* server in either MCP surface; if Claude/Z.ai work offline they revert to context7/CLI, both present.

UNKNOWN (unverified, requires in-harness execution or owner action):
- Whether **Claude Desktop Free** actually loads each server through the absolute `/usr/local/bin/npx` path (Desktop ≠ this host shell — config exists, execution not exercised by me).
- Whether **Kilo Code** and **OpenChamber** each loaded their respective `.kilocode/mcp.json` / own `.mcp.json` (wiring files are byte-equivalent and present; agent-side load wasn't inspected).
- Whether the Owner's running Vue DevTools authorization holds across reloads — **do not trust that either scaffold can be inspected until an agent actually reads a component layout via the devtools agent**.

## Concrete deliverable this file feeds

1. The Claude/Z.ai framework-choice prompt on this branch is already updated with the four wiring receipts + pinned versions + the Delta line (`366ef6eb`).
2. This receipt supersedes "connected" hand-waving with line-item tool enumeration where the harness can actually reach it — from outside Claude Desktop if from within it.
3. Next genuine step needs an agent harness in the room (Desktop/Kilo/OpenChamber session) to ATTEST live agent-driven calls per server. The out-of-band probe here is capability proof, not in-harness behavior — the Owner should drive one of each during the practice slice and log the exit-code receipts there.

## Addendum (this session, after push)

- **The playwright MCP wiring in both scaffolds is now byte-modified** to include `--browser chromium --headless` (`.mcp.json` and `.kilocode/mcp.json` both, both scaffolds, verified `diff` identical). Reason: Playwright MCP defaults to the **branded `chrome` channel**, which does not exist on this machine (`ls /Applications/` confirms no Google Chrome); navigate on the stock wiring failed with `Chromium distribution 'chrome' is not found at /Applications/Google Chrome.app/Contents/MacOS/Google Chrome`.
- **Out-of-band browser-drive proof** (post-flag): `@playwright/mcp` stdio client navigated to `http://127.0.0.1:5188/_stub.html` and returned the rendered page (title `stub`, console 1 entry — a *favicon 404 only*). No Chrome install required; no warning remains.
- Smoke tests re-run clean after the wiring change: both exit 0.
- **Owner-side action remains required for the Desktop connectors** (Claude Desktop) to load this exact `.mcp.json` shape; server launch flag semantics for Desktop are identical but Desktop was not restarted here.
- **The scaffold `.mcp.json` in `/Users/kosi/football-sim-svelte` does NOT include vue-devtools** (that's Vue-only) and **neither scaffold carries gemini/codex wiring** — unchanged.
