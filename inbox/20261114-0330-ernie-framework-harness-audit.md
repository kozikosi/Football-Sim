SPEAKER: ernie | ROLE: council | TASK: framework-harness audit · DATE: 2026-11-14T03:30Z
HARNESS: Kilo (Anthropic-compatible gateway) — NOT Claude Code, NOT OpenChamber, NOT Gemini-cli
MODEL: baidu/ernie-5.5-flash-preview:free

**Scope note:** this is capability only. The framework choice is the Architect's and the Owner's; nothing below proposes one.

---

## 1. Identity & machine (VERIFIED)

```
command: uname -a ; uname -m ; node --version ; npm --version ; git --version ; echo $SHELL ; zsh --version
output:  Darwin Kosis-MacBook-Pro.local 24.6.0 Darwin Kernel Version 24.6.0 … RELEASE_ARM64_T6020 arm64
         arch: arm64
         node: v26.13.0
         npm:  11.20.0
         git:  git version 2.39.5 (Apple Git-154)
         shell: /bin/zsh · zsh 5.9 (arm64-apple-darwin24.0)
```

**Node version warning (VERIFIED, and it matters for every number in this wave):** `v26.13.0`. The Owner's pin is `.nvmrc = 24`. Z.ai's v3 ran on **v24.22.3** — so v3's numbers are on the pin and **mine are not**. Any cross-seat comparison that mixes our runs is comparing Node 24 against Node 26.

**`.mcp.json` in my worktree: ABSENT.**
```
command: ls -la .mcp.json .kilocode/mcp.json   (in /Users/kosi/Desktop/wt/ernie)
output:  (no such file) for both
```
So I am **not** scaffold-wired. Everything I ran this wave came from npm, not from an MCP server.

**Shell rc diff since scaffold additions (VERIFIED):** none that I can attribute — I have made no `rc` edits this wave, and my sessions have been non-interactive (`bash -c`), so `~/.zshrc` is not in the path of anything I ran.

---

## 2. Tool probe matrix (VERIFIED)

| Probe | Result |
|---|---|
| `node --version` | **v26.13.0** |
| `npm --version` | **11.20.0** |
| `git --version` | **2.39.5 (Apple Git-154)** |
| `shasum --version` | **6.02** · `sha256sum` also present at `/sbin/sha256sum` |
| `npx --yes playwright --version` | **Version 1.65.0** |
| cached chromium | `chromium-1247`, `-1248`, `-1254`, `-1255`, plus matching `chromium_headless_shell-*`, `ffmpeg-1011` (in `~/Library/Caches/ms-playwright`) |
| `timeout` binary | **NOT PRESENT** (`zsh: command not found: timeout`) — use a harness timeout instead |

**MCP loader — what a fresh session of my harness sees:** **exactly one server: `airbyte-agent-mcp`** (a business-systems connector). No Svelte MCP, no Playwright MCP, no Vue MCP. That is the honest headline of this audit: **I have been doing browser automation through npm (`npx playwright`), not through an MCP**, and it worked for nine arms.

**Svelte MCP (in my harness):** **not available.** `(a) list documentation sections` → **no tool exposed**. `(b) fetch a section` → **no tool exposed**. `(c) run the autofixer on a `.svelte` file` → **cannot run** — the server is not wired into my session.
- The package exists and is wired **elsewhere**: `~/football-sim-svelte/.mcp.json` declares `"svelte": { "command": "npx", "args": ["-y", "@sveltejs/mcp"] }`. I cannot reach it from here. (VERIFIED by reading that file; the server itself is REPORTED as existing, not run by me.)

**Vue MCP:** **none exists anywhere I can see.** `~/football-sim-vue/.mcp.json` declares only `playwright`. No `vue` server in any config I read. (VERIFIED by `cat` of all four MCP configs found under `~`.)

---

## 3. Capability verdicts (each labelled)

**Can this seat author Svelte 5 components (runes, `.svelte.ts` discipline)? — YES, VERIFIED.**
I did it this wave, on a real Svelte 5 arm:
```
cwd:     …/kilo/wr4/…/arm-svelte   (from origin/council/beam @ 16cf4629)
command: python3 patch of src/App.svelte (added {#each} consumer line + data-testid) ; npm run check ; npm run build
output:  "svelte-check found 0 errors and 0 warnings" (exit 0) · vite build exit 0 · spec 5/5 · risk testid rendered 5/5 with 3 distinct values
```
And the scaffold independently: `npx svelte-kit sync && npx svelte-check --tsconfig ./tsconfig.json` → **exit 0, 0 errors, 0 warnings**.
**Gap:** no autofixer, so "correct" is verified by `svelte-check`, not by the Svelte MCP's own rules.

**Can this seat author Vue 3 SFC / `<script setup lang="ts">` / composables / pinia? — NOT YET PROVEN BY ME. Scaffold VERIFIED working.**
I have not written a `.vue` file this session. What I *can* prove is that the scaffold is live and green:
```
cwd:     /Users/kosi/football-sim-vue   (vue 3.5.42 · pinia 4.0.3 · @vueuse/core 15 · @tanstack/vue-table 9 · vite 8.3.8)
command: npx vue-tsc --noEmit ; npx vitest run
output:  vue-tsc exit 0 (no diagnostics) · vitest exit 0 — "Test Files 1 passed (1) / Tests 1 passed (1)"
scripts: dev=vite · type-check="vue-tsc --build" · test:unit=vitest · test:e2e="playwright test" · build-only="vite build"
```
So: **tooling yes, authorship unproven.** Label: **UNKNOWN for my authorship**, **VERIFIED for the toolchain**.

**Can this seat drive Playwright, open `npm run dev`, run 5 tests/arm, report 5/5 or the failure line? — YES, VERIFIED, extensively.**
This wave: 9 arms built, 9 acceptance runs, per-arm `file://` probes with console + `pageerror` + network-failure capture, and the round-2 manifest verification. Representative receipt:
```
command: BASE_URL=http://localhost:4371 npx playwright test v3.spec.ts --reporter=list
output:  5 passed (1.6 s)   [arm-solidstart, repaired @solidjs/start 2.x]
```
I drive it through npm, **not** through `@playwright/mcp` — worth stating because the poll assumes an MCP path.

**Can this seat run `npm run check` (svelte-check / vue-tsc) and `npx vitest run` in a minimal scaffold? — YES, VERIFIED, exit codes below.**
```
svelte-check  (…/football-sim-svelte)  → exit 0, "found 0 errors and 0 warnings"
vue-tsc --noEmit (…/football-sim-vue)  → exit 0, no diagnostics
vitest run    (…/football-sim-vue)     → exit 0, 1 passed
```

---

## 4. Scaffolding drift check (VERIFIED, read-only — nothing deleted)

**Stray scaffolds outside the repo of record (all in `~`, none inside any seat worktree):**
```
/Users/kosi/football-sim-svelte   svelte (@sveltejs/kit + vite ^8.3.0) · node_modules present · playwright.config.ts · .mcp.json = {svelte, playwright}
/Users/kosi/football-sim-vue      vue 3.5.42 + pinia 4 + vueuse + tanstack-table · vite ^8.3.8 · e2e/ · .mcp.json = {playwright}
/Users/kosi/football-sim-nextjs   next 16.4.3 + react 19.3 · vitest · test/ · no .mcp.json
/Users/kosi/67 Cakepanz · /Users/kosi/76 Pancakes · /Users/kosi/LibreChat   (package.json only, not probed)
```

**`git status --porcelain` of `~`:** `fatal: not a git repository` — `~` is not versioned. Nothing to drift there.

**`git status` of the shared tree (`/Users/kosi/Desktop/Football Sim`):**
```
 D  Football-Sim-Z-post-blue-w89.html
 M  index.html
??  .DS_Store
```
**Not mine and not touched.** Two of those three lines corroborate my Phase 8.2 finding: the live `index.html` is a modified build, and the w89 file is deleted from the tree — which is consistent with "the live file matches no archived build."

**Recent refresh outside my control:** I cannot date the scaffolds' last refresh from here (no git in them). What I can say: `~/football-sim-svelte` and `~/football-sim-vue` both have `node_modules` and both pass their checks **today**, so they are not stale-broken.

---

## 5. Recommendations (ranked, max five, one line each)

1. **Standardise one gate name across arms — `npm run check` — and report delta, never absolute.** Both scaffolds already ship it (`svelte-check` / `vue-tsc`); this wave proved absolute counts are meaningless (arm-solid 143 pre-existing, arm-lit 73 pre-existing, both unchanged by a real edit).
2. **Add a WebKit + WebKitGTK Playwright project before any framework is scored.** Nine arms were tested in **Chromium only**; if the product ships in Tauri, that is three engines, not one, and this wave has zero evidence for two of them.
3. **Do not promise Svelte/Vue MCP parity — there is no Vue MCP to promise.** The svelte scaffold's `.mcp.json` is a good shape to copy *for Svelte*; for Vue, the honest statement is "no MCP, tooling via CLI."
4. **Keep scaffolds out of the repo of record (they already are) and collapse the duplicate name.** `~/Football-Sim` and `~/Desktop/Football Sim` both exist; that collision will bite whoever runs a relative-path script next.
5. **What I would NOT do:** build or install a custom Vue MCP, or add a second agent harness to chase parity. No free equivalent exists, and inventing one is exactly the new infrastructure the Owner has not approved.

---

## 6. Gaps & blockers (blunt)

- **No Svelte MCP in my harness** → no `svelte-autofixer`, no `list-sections`. My Svelte correctness evidence is `svelte-check`, which is good but is not the MCP's rule set.
- **No Vue MCP anywhere** → Vue authoring would be CLI-only. Not a blocker, but it is an asymmetry no amount of tooling talk should hide.
- **No MCP browser automation** → I drive Playwright via npm. Works, but it means the wave's browser evidence came from a path the poll's matrix does not list.
- **Node 26 vs the Owner's pin 24** → every measurement I filed is on the unpinned version. This is the single most likely source of a cross-seat discrepancy in the digest.
- **`timeout` absent on this macOS** → minor; use a harness timeout.

---

## 7. Fallback plan (one line)

If the Architect rules the other framework tomorrow, my first ten minutes are: **author one real component in the existing scaffold** — a focus-picker SFC in `~/football-sim-vue` — then run `vue-tsc --noEmit`, `vitest run` and a five-test Playwright pass, and file the diff plus the three exit codes.

---

## 8. Contamination warnings

1. **`/Users/alexledger/.vite-plus/bin/xcodebuildmcp` inside `~/agent/mcp.json`** — a **different user's home path** on this machine. Any harness that loads that config will try to spawn a binary that does not exist for this user. **This is the clearest contamination in the state I can see.** (VERIFIED by reading the file; I did not attempt to execute it.)
2. **Two directories named `Football-Sim`**: `~/Football-Sim` (has its own `.mcp.json`) and `~/Desktop/Football Sim` (the shared repo-of-record). Same name, different trees, different MCP wiring.
3. **`~/football-sim-svelte/.mcp.json` vs `~/football-sim-vue/.mcp.json` asymmetry** — one has a framework MCP, the other does not. A seat that assumes parity will conclude Vue is "unsupported" when the truth is that no Vue MCP exists.
4. **Shared tree has uncommitted `index.html` + deleted w89 html** — the Owner's working state, not a seat's; a seat that runs a clean checkout will see a *different* live file than the one in the tree.
5. **Node 26 vs `.nvmrc` 24** (repeated because it is the highest-risk item): scaffolds in `~` were installed under whichever Node the installer had, and my runs are on 26.
6. **`AGENTS.md` exists in `~/football-sim-svelte` and `~/football-sim-vue`** — those are scaffold-local instruction files, **not** the repo's `AGENTS.md`. Per the poll's own warning: the repo's `AGENTS.md` and the Owner decide, and a scaffold `AGENTS.md` must not be read as product guidance.

---

## VERDICT

**I can execute Svelte today (verified by a real patch + `svelte-check` + build + 5/5) and I can execute Vue's toolchain today (vue-tsc 0, vitest 0, vite 8.3.8) but I have never authored a `.vue` file — that is the one capability gap in this report, and it is closable in ten minutes.** No Svelte MCP, no Vue MCP; all browser evidence this wave came from npm Playwright, not MCP. Three stray scaffolds and one foreign-user MCP path are the contamination worth cleaning before a framework decision lands.

Labels: **VERIFIED** — every command, exit code and file path above (all run this session, this machine). **REPORTED** — that `@sveltejs/mcp` works (wired in a scaffold I did not execute). **INFERRED** — that a Vue MCP does not exist as a free equivalent (no config declares one; I did not search the registry). **UNKNOWN** — scaffold refresh dates (no git in them); my own Vue authoring ability.

*Filed by ERNIE (advisor) · 2026-11-14T03:30Z · read-only audit; nothing installed, nothing deleted, no `.env` read.*