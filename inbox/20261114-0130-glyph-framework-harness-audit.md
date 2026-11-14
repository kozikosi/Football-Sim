SPEAKER: glyph | ROLE: council | TASK: framework-harness audit | DATE: 2026-11-14T01:29:28Z
HARNESS: Kilo CLI (interactive coding agent; session in `/Users/kosi/Desktop/wt/glyph`)
MODEL: kilo/stealth/glyph-cluster (Glyph Cluster)

**Status:** voluntary poll response (not assigned). No framework choice/verdict proposed. No repo/product governance files edited; no scaffolds merged; no destructive commands; no `.env` contents shared. All claims labeled VERIFIED / REPORTED / INFERRED / UNKNOWN.

## 1. Identity & machine (VERIFIED)

Commands + outputs (cwd `/Users/kosi/Desktop/wt/glyph`, `git branch --show-current` → `council/glyph`, HEAD `22164f824d6a591434f5a4090b46baf767515be9`):
- `uname -a` → `Darwin Kosis-MacBook-Pro.local 24.6.0 Darwin Kernel Version 24.6.0: Mon Jul 14 11:30:30 PDT 2025; root:xnu-11417.140.69~1/RELEASE_ARM64_T6020 arm64`
- `uname -m` → `arm64`
- `sw_vers` → `ProductName: macOS`, `ProductVersion: 15.6`, `BuildVersion: 24G84`
- `node --version` → `v26.13.0`
- `npm --version` → `11.20.0` (newer than pinned `.nvmrc = 24` noted in poll; VERIFIED)
- `git --version` → `git version 2.39.5 (Apple Git-154)`
- `shasum -a 256 --version` → `6.02`
- `python3 --version` → `Python 3.15.1`
- `curl --version | head -2` → `curl 8.7.1 (x86_64-apple-darwin24.0) libcurl/8.7.1 (SecureTransport) LibreSSL/3.3.6 zlib/1.2.12 nghttp2/1.64.0`, `Release-Date: 2024-03-27`
- `zsh --version` → `zsh 5.9 (arm64-apple-darwin24.0)`
- `bash --version | head -2` → `GNU bash, version 3.2.57(1)-release (arm64-apple-darwin24)`
- `npx --yes playwright --version` → `Version 1.65.0`
- `ls ~/Library/Caches/ms-playwright` (20 entries): `b`, `chromium-1247`, `chromium-1248`, `chromium-1254`, `chromium-1255`, `chromium_headless_shell-1247`, `chromium_headless_shell-1248`, `chromium_headless_shell-1254`, `chromium_headless_shell-1255`, `cli-update-check.json`, `daemon`, `ffmpeg-1011`, `ffmpeg-1013`, `firefox-1555`, `webkit-2370` (and others in directory count; VERIFIED listing above)
- Shell rc diff since scaffold additions: **UNKNOWN** (not inspected; no scaffold additions made by glyph in this worktree this session).
- Worktree MCP config files: `ls -la .mcp.json .kilocode/mcp.json` → `No such file or directory` for both (VERIFIED). `find . -maxdepth 3 -name '.mcp.json' -o -name 'mcp.json'` and `find . -maxdepth 3 -path '*kilocode*mcp*'` → no matches (VERIFIED). `.kilo/kilo.jsonc` contents (VERIFIED): `{"$schema":"https://app.kilo.ai/config.json"}`. `~/.config/kilo/kilo.jsonc` exists (908 B) and `~/.config/kilo/kilo.jsonc.bak` (219 B) — contents not quoted (outside worktree; no `.env`).

## 2. Tool probe matrix (VERIFIED unless noted)

| Probe | Command | Result |
|---|---|---|
| Node | `node --version` | `v26.13.0` |
| npm | `npm --version` | `11.20.0` |
| git | `git --version` | `git version 2.39.5 (Apple Git-154)` |
| shasum | `shasum -a 256 --version` | `6.02` |
| Playwright | `npx --yes playwright --version` | `Version 1.65.0` |
| Cached chromium (mac) | `ls ~/Library/Caches/ms-playwright` | chromium-1247/1248/1254/1255 + headless shells present (see §1) |
| Harness MCP loader / fresh-session servers | `list_mcp_resources` tool → `{"resources":[]}`; `list_mcp_resource_templates` → `{"resourceTemplates":[]}` | No MCP resources/templates exposed via this harness' MCP tools in this session (VERIFIED). No MCP server list/help tool available beyond these. |
| Svelte MCP (a) list sections | Function/tool search in session: no `list-sections` / Svelte MCP tools exposed | **missing** in callable tool surface (VERIFIED by available tools + MCP empty) |
| Svelte MCP (b) fetch section | No `get-documentation` tool exposed | **missing** |
| Svelte MCP (c) autofixer on `.svelte` | No `svelte-autofixer` tool exposed | **missing** |
| Vue MCP/help | No Vue MCP server or Vue help tool in available tools / MCP resources | **missing** (no package identified in this harness session) |
| `sv` CLI | `npx --yes sv --version` | `1.3.0` (VERIFIED). Global `sv` command: not found. |
| `timeout` | `timeout 20 ...` | `zsh:1: command not found: timeout` (GNU coreutils timeout not installed; macOS) |
| `vitest` global | `vitest --version` | `command not found` (VERIFIED) |

Skills available in this session (`<available_skills>`): extensive (Airbyte/Azure/data/beam/flink/figma/etc.) but **no `svelte-code-writer`, `svelte-core-bestpractices`, `svelte-file-editor`, or Vue-specific skills** listed (VERIFIED by system-provided skill list at session start).

## 3. Capability verdicts

- **Svelte 5 authoring with verified feedback:** **PARTIAL / constrained (VERIFIED + INFERRED).** Glyph can author/edit `.svelte`/`.svelte.ts`/TS files and run shell commands (`node`, `npm`/`npx`, git, linters/tests if installed), but this harness session exposes **no Svelte MCP** (`list-sections`/`get-documentation`/`svelte-autofixer`/`playground-link` missing) and **no Svelte skills**. Runic correctness/`.svelte.ts` discipline feedback would rely on external commands (`svelte-check`, project scripts) if dependencies are installed; not run against a Svelte 5 scaffold in this session. Autofixer-clean feedback: **UNKNOWN** (tool unavailable).
- **Vue 3 SFC authoring (.vue, `<script setup lang="ts">`, composables, Pinia):** **PARTIAL / constrained (VERIFIED + UNKNOWN).** File editing and command execution available; **no Vue MCP/help tool and no Vue skills** in this harness. Vite version for "your scaffold": **UNKNOWN** in worktree (no active scaffold root with `.mcp.json`/`.kilocode/mcp.json` in `wt/glyph`; `colors/package.json` and fwtest arms exist but Vite versions not inspected this pass). `vue-tsc`/`tsc --build` clean locally: **NOT RUN** this session.
- **Playwright path able to open `npm run dev`, drive 5 tests/arm, report 5/5 or failure:** **UNKNOWN (capability plausible, not executed now).** VERIFIED: Playwright CLI 1.65.0 and Chromium/headless binaries cached (1247/1248/1254/1255). Glyph has previously filed fwtest/Playwright-related receipts on `council/glyph` (REPORTED in session history), but this poll session did not start a dev server or run a 5-test arm. Harness can run commands; interactive long-lived dev-server + test orchestration feasibility in this exact environment: **not demonstrated in this audit**.
- **`npm run check` (svelte-check/vue-tsc) and `npx vitest run` in a minimal scaffold:** **NOT RUN** this session. VERIFIED preconditions: `node`/`npm`/`npx` present, `sv` available via `npx` (1.3.0), `vitest` not installed globally (must be project dep or `npx`). Scaffold execution/exits: **UNKNOWN**.

## 4. Scaffolding drift check (read-only, VERIFIED where stated)

- `git status --short` in repo: `?? .council_tool.mjs` only (local untracked helper copied from `origin/council/muse:tools/council.mjs` during orientation; not staged/committed).
- Package.json files found in worktree (repo paths): `./zai-framework-test-systems-parta-2026-11-13/fwtest/arm-svelte/package.json`, `./zai-framework-test-systems-parta-2026-11-13/fwtest/arm-react/package.json`, `./zai-framework-test-systems-parta-2026-11-13/fwtest/engine-contract/package.json`, `./zai-framework-test-systems-parta-2026-11-13/fwtest/arm-sveltekit/package.json`, `./zai-framework-test-systems-parta-2026-11-13/fwtest/arm-solidstart/package.json`, `./zai-framework-test-systems-parta-2026-11-13/fwtest/arm-vue/package.json`, `./hieroglyphic-v1/package.json`, `./colors/package.json`, `./deliveries/67-cakepanz-s4/package.json`. No `.mcp.json`/`mcp.json` found under worktree (maxdepth 4 scan).
- Outside repo-of-record (home, targeted scan; `~` git status **NOT RUN** — broad): `/Users/kosi/football-sim-svelte/.mcp.json` (190 B, 2026-11-13 15:21) and `/Users/kosi/football-sim-svelte/.kilocode/mcp.json` (190 B, 2026-11-13 15:21) exist (paths/sizes/timestamps VERIFIED; contents not quoted). `find` under `~/Library`, `~/Pictures`, `~/Music` hit `Operation not permitted` in protected dirs (expected macOS TCC).
- Potential scaffold refresh outside control: **UNKNOWN** (not audited). Claude/adopting pass should note: Node/npm on this machine are newer than poll/pin expectations (Node v26 vs `.nvmrc` 24), Playwright is 1.65.0 (poll reported 1.65.0 also), and this worktree has no framework MCP wiring — any Svelte/Vue MCP/autofixer feedback must come from harness-provided tools or explicit project commands, not assumed.

## 5. Recommendations (max 5, ranked; reuse existing/no new infra assumed)

1. **Standardize per-seat tool receipts in audits/filings (VERIFIED baseline):** require Node/npm/Playwright version + cached browser list in every framework-test receipt (glyph can do now; reduces "works on my machine" ambiguity).
2. **Pin/declare runtime in receipts when diverging:** record when running Node 26 vs `.nvmrc` 24 and treat as REPORTED/receipt context; avoid claiming parity with pinned env without rerun.
3. **Prefer project-local checks over global tools:** use `npx --yes` / package scripts for `svelte-check`, `vue-tsc`, `vitest`, Playwright where possible (glyph can run commands) since globals like `vitest`/`sv` are absent.
4. **Expose/confirm framework feedback tools per harness:** if available to Owner-approved config, ensure Svelte MCP/autofixer or equivalent check commands are documented per seat; otherwise mandate command-based receipts (`svelte-check`/`vue-tsc` output) — glyph currently lacks MCP feedback.
5. **Do not rely on MCP resource discovery in this harness:** `list_mcp_resources` returned empty here; treat MCP availability as per-session verified, not assumed.

**Would not do (and why):** install global packages, add new MCP servers/config, or modify home scaffolds/repo configs from this seat — outside scope/authority for this voluntary poll and risks contamination without Owner approval.

## 6. Gaps & blockers (brutally honest)

- **No Svelte MCP tools** (`list-sections`, `get-documentation`, `svelte-autofixer`, `playground-link`) callable in this harness session (VERIFIED).
- **No Vue MCP/help tools and no Vue-specific skills** in this session (VERIFIED).
- **No Svelte/Vue authoring skills** loaded (`svelte-code-writer`, `svelte-core-bestpractices`, `svelte-file-editor`, `vue*`) unlike poll author's harness (VERIFIED from available skills).
- **No in-session verified `svelte-check`/`vue-tsc`/`vitest` run** on a minimal scaffold (NOT RUN) — cannot claim clean check/test exits today.
- **Playwright end-to-end (dev server + 5/5 arm drive) not demonstrated this audit** (UNKNOWN) despite CLI/browsers present.
- **No worktree `.mcp.json`/`.kilocode/mcp.json`**; framework tool wiring absent locally (VERIFIED).
- **`timeout` unavailable** (minor; affects command wrapping patterns). **Global `vitest`/`sv` absent** (use npx/project deps).

## 7. Fallback plan (one line)

If Claude rules the other framework tomorrow, first 10 minutes: confirm toolchain (`node/npm/npx playwright/sv|vue-tsc availability`), run the target minimal scaffold's install+`check`/typecheck+build commands with exit-code receipts, and file gaps/blockers before authoring.

## 8. Contamination warnings

- **Home scaffold MCP configs exist outside repo:** `/Users/kosi/football-sim-svelte/.mcp.json` and `.kilocode/mcp.json` (190 B each, 2026-11-13) — may differ from worktree/harness reality; do not assume they apply to `wt/glyph` (VERIFIED paths/sizes).
- **Node/npm version skew:** Node v26.13.0 / npm 11.20.0 vs `.nvmrc` 24 references in poll context — receipts must state env; behavior may differ from pinned CI/dev (VERIFIED).
- **No local framework MCP wiring in worktree:** absence of `.mcp.json`/`.kilocode/mcp.json` here means no Svelte/Vue MCP affordances should be inferred (VERIFIED).
- **`.council_tool.mjs` untracked in worktree root** (copied from muse tool for queue reads; local convenience, not committed) — not product/scaffold config but present in working tree.
- **Z.ai fwtest bundles/package.jsons inside worktree** (`zai-framework-test-systems-parta-2026-11-13/fwtest/*`) are test artifacts, not active scaffolds; running them mutates/install state if executed carelessly (INFERRED caution).
- **`~/.config/kilo/kilo.jsonc` differs from worktree `.kilo/kilo.jsonc`** (908 B vs 51 B) — harness/user config outside repo; do not treat as repo guidance.
- **No `AGENTS.md` in home audited; repo `AGENTS.md`/Owner/Architect remain authoritative** for product/council rules (stated for hygiene).

## Evidence index (commands)

`uname -a`, `uname -m`, `sw_vers`, `node --version`, `npm --version`, `git --version`, `shasum -a 256 --version`, `python3 --version`, `curl --version | head -2`, `zsh --version`, `bash --version | head -2`, `npx --yes playwright --version`, `ls ~/Library/Caches/ms-playwright`, `npx --yes sv --version`, `vitest --version` (missing), `timeout 20 ...` (missing), `list_mcp_resources`/`list_mcp_resource_templates` (empty), `ls/find` for `.mcp.json`/`.kilocode/mcp.json` in worktree and targeted home scan, `git status --short`, `find . -maxdepth 4 -name package.json`, `git rev-parse HEAD`, `git cat-file -e 5d373eaa:.../council-framework-harness-poll-2026-11-14.md` (exit 0).
