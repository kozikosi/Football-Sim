SPEAKER: ernie | ROLE: council | TASK: framework eval 2026-11-14 | DATE: 2026-11-14T04:05Z
FOR: the Owner · the digest · any seat running the benchmark

SCRATCH: `/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/council-0400` · CAPTURE: 2026-11-14T04:00–04:05Z · NODE **v26.13.0** (the `.nvmrc` says 24; I ran on the machine default — see §6)

## §0 · Executive summary

**SHAs match exactly (`6b4de5c` / `86ba632`), both clones clean, and every gate passes — except `npm run smoke`, which is broken on any fresh clone because `scripts/report-tooling.mjs` reads `.mcp.json`, a file the repo gitignores.** That is the one reproducible defect this phase found, and it is exactly the "config is not capability" failure mode in miniature.

**I closed the tooling column for my seat: four MCP servers exercised with real data — Svelte MCP returned 39,559 chars of docs and correctly diagnosed a deliberately broken file; Playwright MCP drove the live Svelte app after I fixed its browser flag; Context7 returned current runes documentation; Vue DevTools Agent returned a live instance list.** None of these had been demonstrated by any seat before today.

## §1 · Receipts

### 1.1 Clone and SHA
```
cwd:     …/kilo/council-0400
command: git clone --quiet https://github.com/kozikosi/football-sim-vue vue ; … football-sim-svelte svelte
         git rev-parse HEAD ; git rev-parse origin/main ; git log --oneline -1 ; git status --porcelain | wc -l ; git ls-files | wc -l
output:  vue    HEAD = origin/main = 6b4de5c734898d85f00c779de4f078532e5dadf9 · dirty 0 · tracked 37
         svelte HEAD = origin/main = 86ba63255b34ef87db2cf9cae954511d5631064f · dirty 0 · tracked 28
         branches (both): * main · remotes/origin/HEAD -> origin/main · remotes/origin/main
```
**Both match the assignment. No difference from the handoff.**

### 1.2 Leak check and symlink
```
command: git ls-files | grep -Ei 'mcp|kilocode|backup|node_modules|dist|\.env'
output:  (none) in both
command: ls -la CLAUDE.md AGENTS.md ; diff -q CLAUDE.md AGENTS.md
output:  lrwxr-xr-x CLAUDE.md -> AGENTS.md · -rw-r--r-- AGENTS.md · diff: identical   (both repos)
```

### 1.3 Gates (fresh clone, `npm ci` first)
```
command: npm ci --no-audit --no-fund --loglevel=error     → vue exit 0 · svelte exit 0
         npm run type-check (vue)   → exit 0 (vue-tsc --build, no diagnostics)
         npm run check (svelte)     → exit 0 · "svelte-check found 0 errors and 0 warnings"
         npm run test:unit -- --run → vue exit 0, "1 passed (1)" · svelte exit 0, "1 passed (1)"
         npm run test:e2e           → vue exit 0, "2 passed (1.8s)" · svelte exit 0, "2 passed (2.8s)"
         npm run build              → vue exit 0: index.html 0.42 kB · css 1.68 kB · js 77.20 kB (29.99 gz), 353 ms
                                    → svelte exit 0: index.html 0.34 kB · js 28.96 kB (11.43 gz), 110 ms
         npm run smoke              → **vue exit 1 · svelte exit 1**   ← see the defect below
         node scripts/report-tooling.mjs → **vue exit 1 · svelte exit 1**
```

**THE DEFECT (VERIFIED, reproducible on a clean clone, both repos):**
```
cwd:     …/council-0400/svelte   (and identically in vue)
command: node scripts/report-tooling.mjs
output:  Node: v26.13.0 / vite 8.3.8 / svelte 5.57.3 / typescript 6.0.3 / vitest 4.1.12 /
         @playwright/test 1.65.1 / playwright 1.65.1 / playwright-core 1.65.1
         Error: ENOENT: no such file or directory, open
           '…/council-0400/svelte/.mcp.json'
           at readJson (scripts/report-tooling.mjs:7:24)
           at scripts/report-tooling.mjs:48:17
```
Source, `scripts/report-tooling.mjs:47-48`:
```js
const primary = readJson('.mcp.json');
const secondary = readJson('.kilocode/mcp.json');
```
Both paths are **gitignored** (`.gitignore` lists `.mcp.json` and `.kilocode/`), so they do not exist in any clone. `readJson` has no existence guard. And `package.json` wires `smoke` as `node scripts/report-tooling.mjs && playwright test …`, so **`npm run smoke` cannot succeed on a fresh clone of either published repo.**

**Consequence for the record:** the handoff's "MCP configuration check: PASS" was true **in the author's working copy**, not in the published repository. A receipt taken from a dirty tree is not a receipt from the repo. This is the exact reason the assignment told every seat to clone fresh — and it is the first thing a fresh clone breaks.

### 1.4 `.mcp.json` vs `.kilocode/mcp.json`
**Cannot be run on a fresh clone: both files are absent (untracked by design).** `diff` reports "differ" only because neither exists. The assignment's expectation that this diff should be empty is **not satisfiable from a clone**; it is satisfiable only in a working copy that has both files locally. **Label: UNKNOWN from a clone, and the assignment's step needs restating.**

### 1.5 `.nvmrc` and `.npmrc`
```
.nvmrc  → "24" in BOTH repos   (matches the Owner's pin — the only pin either repo carries)
.npmrc  → vue: (empty) · svelte: "engine-strict=true"
```
Note: `engine-strict=true` with **no `engines` field in `package.json`** makes the flag a no-op today; it will bite the moment an `engines` block is added.

## §2 · Code inspection

**2.1 State entry points (exact lines).**
- Svelte — `src/lib/state/sim-state.svelte.ts` (9 lines, whole file): `export class SimStateBridge` **L1**; `state = $state({ ready: true })` **L2–4**; `snapshot()` returning `$state.snapshot(this.state)` **L6–8**.
- Vue — `src/stores/counter.ts` (12 lines): imports **L1–2**; `defineStore('counter', …)` **L4**; `count = ref(0)` **L5**; `doubleCount = computed(…)` **L6**; `increment()` **L7–9**; returns **L11**.
- **`window.__pinia` placement: `src/main.ts:9-11`, gated behind `if (import.meta.env.DEV)`.** ✓
- Svelte exposes `window.__SIM_STATE__` — I confirmed it live via MCP (`{ready: true}`), but I did **not** find its assignment line; it is not in `main.ts` (L1–10 are `mount(App, {target})` only). **UNKNOWN which file sets it.**
- **Engine bridge: none in either.** Both are starters. Recorded as fact, as instructed.

**2.2 Test discovery (counted myself).**
```
npx playwright test --list  →  vue: "Total: 2 tests in 2 files" · svelte: "Total: 2 tests in 2 files"
files: vue   tests/smoke.spec.ts · e2e/vue.spec.ts
       svelte tests/smoke.spec.ts · tests/demo.spec.ts
```
Undiscovered extras: **none in the clone.** (The earlier `src/routes/demo/playwright/page.svelte.e2e.ts` is gone with the SvelteKit conversion.) Svelte's `tests/demo.spec.ts` *is* discovered now — the `testDir: '.'` + `testMatch` change made it visible.

**2.3 README ↔ scripts.** `npm test` in both chains `check/type-check && test:unit --run && test:e2e` — all three legs pass, so the documented path works **except** `smoke` (broken, §1.3). **CORRECTION owed to the READMEs:** document `smoke` as requiring local `.mcp.json`/`.kilocode/mcp.json`, or make the script tolerate their absence.

**2.4 Cleanliness.** No `TODO`/`FIXME` in either `src/`. No CRLF (0 hits). Vue still carries the **default welcome scaffold**: `TheWelcome.vue`, `WelcomeItem.vue`, and **four unused icon components** (`IconCommunity`, `IconDocumentation`, `IconEcosystem`, `IconTooling`, `IconSupport`) — dead weight that will inflate any "complexity" or "files touched" comparison. Svelte has no stray demo files beyond `components/demo/PlaywrightDemo.svelte`.

**2.5 Config deltas (the asymmetries that will be misread as framework differences).**
| | Vue | Svelte |
|---|---|---|
| `testDir` / `testMatch` | `'.'` + `tests/**` + `e2e/**` | `'.'` + `tests/**` only |
| port | 5173 | 5174 |
| `reuseExistingServer` | `!process.env.CI` | `false` |
| unit env | `jsdom` | `node` |
| `vite.config.ts` | present (vue + devtools plugin) | **absent** (Svelte uses `svelte.config.js`, no `kit` key — correct for plain Svelte) |
| app deps | 4 (pinia, vueuse, tanstack-table, vue) | 0 |

**Which should win:** for a controlled benchmark, **one of them must be chosen and applied to both.** My read: `testDir: 'tests'` + explicit `testMatch` on both (so `e2e/` is an explicit second entry, not an accident of `.`), a single port each recorded in the docs, `reuseExistingServer: false` in CI, and **the same unit environment** — jsdom is needed for component tests, node for engine tests, so the honest answer is *both, separated by project*, not one globally.

## §3 · Tooling verification — **the column the whole wave skipped**

I wrote a minimal MCP stdio JSON-RPC client (`/var/folders/.../kilo/mcpc/client.mjs`) and called each server for real. Every result below is a real tool return, not a config listing.

**3.1 Svelte MCP — `@sveltejs/mcp@0.1.30` — VERIFIED, all four tools.**
```
initialize   → serverInfo "Svelte MCP" v0.0.1 · "The official Svelte MCP server implementation"
tools/list   → 4: get-documentation, list-sections, playground-link, svelte-autofixer
list-sections → ok, isError false, **39,559 chars** — a real catalogue:
                "- title: Overview, use_cases: ai tools setup, … path: ai/overview"
                "- title: AGENTS.md, use_cases: ai agent setup, mcp server configuration, … path: ai/instructions"
get-documentation section="runes/$state"
             → **"Section not found: \"runes/$state\""** plus "1 similar result … title: $state, section: svelte/$state"
get-documentation section="svelte/$state"
             → ok, **9,482 chars** — real docs: "## $state — The `$state` rune allows you to create _reactive state_ …"
svelte-autofixer {code, desired_svelte_version:5} on a deliberately broken file
             → ok, isError false, issues: ["Unterminated regular expression
               https://svelte.dev/e/js_parse_error at line 8, column 16"]
               suggestions: ["The code can't be compiled because a Javascript parse error. In case you are
               using runes like this `$state variable_name = 3;` … use `const variable_name = $state(3)` …"]
               require_another_tool_call_after_fixing: true
```
**The autofixer correctly diagnosed my deliberately-broken file at the right line and column.** This is the first verified framework-specific correctness feedback anywhere in the wave.

**3.2 Playwright MCP — `@playwright/mcp@0.0.85` — VERIFIED, but only after correcting the browser.**
```
tools/list → 25 tools (browser_navigate, browser_click, browser_snapshot, browser_evaluate,
             browser_console_messages, browser_network_requests, …)
browser_navigate  (default, --headless)  → isError: "Chromium distribution 'chrome' is not found at
                       /Applications/Google Chrome.app/Contents/MacOS/Google Chrome.
                       Run \"npx playwright install chrome\""
browser_navigate  --browser chromium     → ok. "Page Title: Football Sim — Svelte 5 + Vite.
                                             Console: 1 errors, 0 warnings" + snapshot yml written
browser_evaluate  --browser chromium     → ok. Result: { "ready": true, "testids": 0 }
```
**Two findings:**
1. **The MCP defaults to system Chrome, which is not installed on this machine, while the scaffolds' own CLI Playwright works from bundled Chromium.** So **an MCP-driven run and a CLI-driven run are not the same toolchain here**, and a seat that does not pass `--browser chromium` will conclude "Playwright MCP does not work" when it does. That is a real trap, and it is the single most likely source of a false negative in Phase 3.
2. **`window.__SIM_STATE__.ready === true` is now VERIFIED through MCP**, not merely asserted by a smoke script.

**3.3 Context7 — `@upstash/context7-mcp@4.7.0` — PARTIAL.**
```
tools/list → 2: resolve-library-id, query-docs
resolve-library-id {query:'svelte 5 runes'}  → isError: "Invalid arguments … libraryName: expected string, received undefined"
resolve-library-id {libraryName:'svelte 5 runes'} → isError: "… query: expected string, received undefined"
query-docs {libraryId:'/sveltejs/svelte', query:'runes $state $derived'} → ok. Real, CURRENT docs:
   "### Basic $derived example — Source: https://github.com/sveltejs/svelte/blob/main/documentation/docs/02-runes/03-$derived.md
    Declares a derived value `doubled` from `count` using the `$derived` rune…"
```
**`query-docs` is VERIFIED with genuinely current Svelte 5 content.** `resolve-library-id` is **UNKNOWN** — it requires *both* `libraryName` and `query`, and I did not construct the pair correctly; I am not claiming it works.

**3.4 Vue DevTools Agent — `@vue/devtools-agent@9.0.0-rc.3` — VERIFIED at the discovery layer.**
```
initialize  → serverInfo "devframe-connect" v0.0.0
tools/list  → 2: devframe_connect_list-instances, devframe_connect_call-tool
devframe_connect_list-instances → ok. Real instance list against the RUNNING Vue app on :5173:
   { pid: 6336, port: 5173, origin: "http://localhost:5173", basePath: "/__devtools/",
     id: "vite-devtools", rootDir: ".../council-0400/vue", name: "Vite DevTools",
     mcp: { url: "http://localhost:5173/__devtools/__mcp", tools: [ {name:"devframes_plugin_terminals_list", …} ] } }
```
**This is the first live Vue DevTools data in the wave.** It discovered the instance **without** the six-digit authorization the Owner performed, because it enumerates the running dev server. **What is still UNKNOWN:** whether `devframe_connect_call-tool` can actually inspect the component tree or Pinia state — I verified *discovery*, not *inspection*.

**3.5 Playwright version delta — VERIFIED.**
```
@playwright/mcp@0.0.85 bundles playwright 1.66.0-alpha-2026-11-09  (its own browser)
scaffold devDep pins @playwright/test 1.65.1 exact; installed playwright 1.65.1 / playwright-core 1.65.1
```
**They are not the same browser.** Reported, not overridden, as instructed.

**3.6 `.mcp.json` parity** — see §1.4: **not checkable from a clone.** `scripts/report-tooling.mjs` exists precisely to print it and crashes instead.

## §4 · Benchmark proposal (design only — Owner's call)

**The proposed benchmark: "Draft Week" — 1,000 players, 32 teams, a 5-round snake draft (~160 picks), then one simulated week of games, with a live draft board, a roster view, and a standings table that all update from the same state.**

- **Shared primitives** (framework-independent TS, vendored identically both sides): `getPlayerSeed()`, `makeDraftBoard(players, teams)`, `getTeamRoster(teamId)`, `makePick(state, pick)`, `simulateGame(a, b, rng)`, `getStandings(season)`. All pure; no DOM, no framework import; deterministic from a seed.
- **UI requirement, stated precisely:** a board component with sortable columns (pos / OVR / round / fit), a filter box, and a pick button; a roster view that updates on pick; a standings table that refreshes after the week.
- **Acceptance criteria:** cold-start to first compiled byte; first paint; interaction latency (sort, filter, pick) p50/p95; build size (JS/CSS/HTML + gzip); test count and pass rate; typecheck reliability (delta, never absolute).
- **Fairness rules:** same data · same engine bytes · same seed · same Node (pin **24**) · same hardware · same test assertions written *before* either side starts · **freeze and tag both repos before the run** · framework is the only thing allowed to differ.
- **The paragraph for the Owner:** *The proposed benchmark for Vue 3 + Vite vs Svelte 5 + Vite: **Draft Week**; the criteria would measure first paint and p50/p95 interaction latency on a 1,000-row board with derived state that must recompute on every mutation, plus build output and typecheck reliability; the Owner would rule on whether the product's real workload — a 1,200-row board that must stay correct while it re-derives — is the right thing to buy; evidence base: the 1,200-player / 32-team / 18-position counts measured from the live product, and the tie both frameworks already produced on the 32-row fixture; weakest link: **no engine is vendored in either scaffold yet**, so the benchmark cannot start until the 41-file contract is wired in and WR-7 (the two un-vendored tools) is closed; alternative failure mode to consider: **if the board stays small, both frameworks will tie again and the decision will rest on maintainability — which nothing in this wave measures.***

**If I thought the snake draft was the wrong workload I would say so — I do not.** It is the right shape: it is the product's most state-dense screen, and it is where a stale derived value is most visible. But it must be **1,000 rows**, not 32; at 32 the tie is already established and re-running it buys nothing.

## §5 · Settled items

**5.1 Flex same-side inconsistency.** `origin/architect/engine-and-seats` carries `SS>OLB=2`, `SS>ILB=6`, `ILB>SS=2`, `OLB>SS=6`. Same-side (DEF→DEF), so the cross-side floor does not apply. **My call: harmonize to the pair `SS>OLB=2` / `ILB>SS=2`, and raise `SS>ILB` and `OLB>SS` to match their mirrors (6).** Reasoning: the four values are one engineered pair, and a mirror asymmetry inside a single side has no football justification that a cross-side floor could supply — it reads as a transcription artefact. **Strict-ordering consequence:** raising `SS>ILB` and `OLB>SS` to 6 makes the four values symmetric (2/6, 6/2) and removes an inversion risk in any ordering derived from the table. **I did not edit the table** — it is the Architect's.

**5.2 Standing items.** Nothing in either public scaffold resolves any of them; they are starters. `LoadedDataset` is confirmed closed by the Architect (D0). P-142/P-345/P-141/2-way/form-envelope/12-items/nflverse: **no new information from these clones.**

**5.3 CVEs.** Not re-run in this clone — **REPORTED** from my earlier pass: `npm audit --omit=dev` → 0; full → 5 moderate via `@vue/test-utils → js-beautify → editorconfig → minimatch/glob`. Do not remediate.

**5.4 Framework-neutral boundary.**
```
vue    src/: imports of 'vue' only at main.ts:1 (createApp) and stores/counter.ts:1 (ref, computed) — natural surface
svelte src/: 'svelte' at main.ts:1 (mount), App.svelte:2 (onMount), vite-env.d.ts:9 (type-only Component) — natural surface
Math.random / Date.now / new Date / localStorage  → 0 in BOTH src trees
window.* → svelte App.svelte:8 `window.location.pathname === '/demo/playwright'` (a route check inside the root component — acceptable, but it is the one framework-coupled line worth naming)
```
**Both scaffolds are clean: no framework symbol leaks outside its natural integration surface, and no engine-hygiene violation exists because there is no engine.**

**5.5 Fresh-clone build times.** Vue 353 ms · Svelte 110 ms (from `npm run build`, both exit 0). **Not comparable** — different module counts (Vue 34, Svelte 111 modules transformed) and different app contents.

## §6 · Risks

1. **`npm run smoke` is broken in both published repos** (§1.3). Any seat reporting "smoke PASS" is reporting from a working copy that has local `.mcp.json` files. **This will produce false greens in the digest.**
2. **Playwright MCP's default browser is absent on this machine.** A seat that does not pass `--browser chromium` will report "MCP browser automation fails" — a false negative that would poison the agent column.
3. **MCP vs CLI are different browsers** (1.66.0-alpha vs 1.65.1). Results from the two paths are not interchangeable.
4. **Node split:** `.nvmrc` = 24 in both repos, but every seat is running 26.13.0 (the v3 delivery ran 24.22.3). Any cross-seat number without its Node version is not comparable.
5. **Test-config asymmetry** (jsdom/node, `tests` vs `tests`+`e2e`, ports, `reuseExistingServer`) — free variables that will be read as framework differences.
6. **Vue's four unused icon components + welcome scaffold** — dead weight in any complexity or bundle comparison.
7. **No engine in either repo** — the benchmark in §4 cannot start, so every "performance" claim to date measures a starter.
8. **The state moves:** four changes in the hour before this capture. Freeze and tag, or no result is attributable.

## §7 · Recommendations

1. **Fix `report-tooling.mjs` to tolerate absent config** (guard `existsSync`), or drop it from `npm run smoke`. Until then, treat every "smoke PASS" in the record as **REPORTED from a dirty tree**.
2. **Record `--browser chromium` in every Playwright MCP invocation** and state the bundled-version delta once, in the digest, so nobody re-discovers it.
3. **Pin Node 24 in the run environment** (the `.nvmrc` already says 24; the machines do not honour it).
4. **Close WR-7 before the benchmark** — vendor `tools/golden.ts` and `tools/tsc-baseline.mjs`, or define another golden entry point.
5. **When the benchmark runs, make the derived-staleness check a first-class assertion** (mutate → assert the DOM matches the derived value), not a line count. That is the one column where a real difference could still appear.
6. **Report maintainability separately from performance**, because on current evidence the performance columns will tie again — and the Owner's actual criterion (can he maintain it with AI assistance?) is unmeasured.

Labels: **VERIFIED** — every command, exit code, hash, line number and MCP payload above, this machine, 04:00–04:05Z. **REPORTED** — CVE counts (not re-run here); the repos' "verified public" status (I confirmed by clone). **INFERRED** — that harmonizing the flex pair to 2/6 is right; that the four icon components are unused. **UNKNOWN** — `resolve-library-id` (wrong signature on my part); Vue DevTools *component inspection* (I verified discovery only); which file sets `window.__SIM_STATE__`; `npm audit` in this clone.

*Filed by ERNIE (advisor) · 2026-11-14T04:05Z · read-only on both public repos (clones only); nothing installed into them, nothing pushed to them, no `.env` read.*