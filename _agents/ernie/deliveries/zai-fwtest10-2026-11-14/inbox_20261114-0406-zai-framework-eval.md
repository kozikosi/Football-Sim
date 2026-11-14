# Z.ai — framework evaluation filing (Vue 3 + Vite vs Svelte 5 + Vite): A–G receipts

**SPEAKER:** Z.ai | **ROLE:** Council · Executor of Z-post-blue and 67 Cakepanz | **TASK:** zai-work-assignment-2026-11-14 delivery | **DATE:** 2026-11-14 | **Audience:** KG (Owner) + inkling + Architect

**Provenance.** Read first, per dispatch: `_agents/zai/START-OF-CHAT-ZAI.md` from `origin/council/muse` (maintained copy; the `council/zai` copy is the frozen w55 tree — confirmed below). Work order: `_agents/inkling/prompts-2026-11-13/zai-work-assignment-2026-11-14.md` from `origin/council/inkling`. Wave rule (§3) run per START-OF-CHAT: `origin/gh-pages` tip is `3e69567` "Publish w89 as live index" — **wave 89 still live on 2026-11-14**, so §2's baseline is current; this chat is not a wave build, it is a council assignment.

**Execution environment disclosure (read this before any receipt).** This filing was produced in a fresh Linux sandbox that is NOT the machine the work order was written against. It has no MCP clients configured, no OpenChamber / Kilo Code / Claude Desktop, no GUI Chrome, and no Owner present for interactive authorization. What it does have: public HTTPS, Node 24, npm, git, and the ability to install free npm packages and drive MCP servers directly over stdio JSON-RPC — which I did wherever the work order named a server. Every phase item below is labelled VERIFIED (I ran it; exit code on file) / REPORTED (cited from someone else's receipt) / INFERRED / UNKNOWN. Nothing was invented to fill a gap; where the work order assumed an environment I do not have, the item is marked and the reason given.

---

## A. Repository audit

### A1. Vue repo — verified facts (all VERIFIED, commands + exit codes in the closing line)

- Fresh clone from `https://github.com/kozikosi/football-sim-vue`: **exit 0**. HEAD = `6b4de5c734898d85f00c779de4f078532e5dadf9` — **exactly** the SHA the work order requires. History (full clone, 2 commits): `6b4de5c` "chore: prepare Vue 3 Vite comparison scaffold" ← `82e893d` "chore: baseline Vue scaffold".
- Clean state: `git status --porcelain` empty, exit 0.
- Remote `origin → kozikosi/football-sim-vue (fetch/push)`; branch `main` tracking `origin/main`; `origin/HEAD → main`; repo publicly reachable over HTTPS.
- 37 tracked files. `.nvmrc` = `24`; `engines: "^22.18.0 || >=24.12.0"` — this machine's Node v24.22.3 satisfies it.
- `.gitignore`: covers `node_modules`, `dist`, logs, `coverage`, `*.local`, `*.tsbuildinfo`, `test-results/`, `playwright-report/`, `.mcp.json`, `.kilocode/`, `*.backup-*`. **One gap: no `.env*` pattern** (the Svelte repo has one); no `.env*` file exists in the repo today, so the exposure is latent, not actual.
- Symlink law holds: `CLAUDE.md` is git mode `120000` → `AGENTS.md` (index: `120000 47dc3e3d… CLAUDE.md`); `AGENTS.md` is a real file (`100644`).
- Stack pinned in `package.json`: vue `^3.5.42`, pinia `^4.1.0`, `@tanstack/vue-table ^9.3.1`, `@vueuse/core ^15.0.0`, vite `^8.3.8`, vitest `^4.1.11`, `@playwright/test 1.65.1` (exact pin), typescript `~6.0.0`, vue-tsc `^3.3.14`, `vite-plugin-vue-devtools ^9.0.0-rc.3`, jsdom `^30.0.1`.

### A2. Svelte repo — verified facts (all VERIFIED)

- Fresh clone from `https://github.com/kozikosi/football-sim-svelte`: **exit 0**. HEAD = `86ba63255b34ef87db2cf9cae954511d5631064f` — **exactly** the required SHA. History: single commit `86ba632` "chore: add Svelte 5 Vite comparison scaffold".
- Clean state: `git status --porcelain` empty, exit 0.
- Remote/tracking as above; publicly reachable; 28 tracked files; `.nvmrc` = `24`; `.npmrc` has `engine-strict=true` — but `package.json` declares **no `engines` field**, so the strict flag currently guards nothing (nit, reported not fixed).
- `.gitignore`: covers `node_modules`, `/dist`, `/build`, `/coverage`, `.env` + `.env.*` (with `!.env.example`/`!.env.test` exceptions — no such files tracked), timestamps, `test-results`, `playwright-report/`, `.mcp.json`, `.kilocode/`, `*.backup-*`.
- Symlink law holds: `CLAUDE.md` mode `120000` → `AGENTS.md` (same symlink blob sha as Vue's).
- Stack: svelte `^5.57.2`, `@sveltejs/vite-plugin-svelte ^7.2.0`, svelte-check `^4.6.0`, vite `^8.3.0`, vitest `^4.1.8`, `@playwright/test 1.65.1` (exact pin), typescript `^6.0.3`. No table library, no state library (runes are the state), no router — deliberately leaner.

### A3. Sensitive information in the published repos

**None found** — stated as required. No `.env*`, `.mcp.json`, `.kilocode/` in either worktree or git index (receipted); secret-pattern sweep (`api[_-]?key|secret|password|bearer |AKIA…|ghp_…`) over both tracked trees: **no hits** (package-lock excluded). Only residual risk is the Vue `.gitignore` `.env*` gap noted in A1.

*Watchlist feature — skipped, design only; the design is in §D6 below (template line preserved as written).*

---

## B. Original product requirements

### B1. Engine interface inventory

First, the work order's C1 premise: **`colors/src/sports/nfl/engine/index.ts` does not exist** (VERIFIED: `ls` exit "No such file or directory") and no file in `colors/src` carries a `CORE ENGINE INTERFACE` marker. The engine surface is the union of per-module exports. That is the exact path mismatch the work order asked me to report rather than guess around.

What actually exists at `architect/engine-and-seats` tip `46aafad9db46f45232f68f4e71f27f06620283d8` (all locations VERIFIED by my own grep):

| Work-order name | In the code | Location | Notes |
|---|---|---|---|
| `simulateGame` | `simulateGame(mh: Matchup, ma: Matchup, rng: Rng, opts: GameOptions): GameResult` | `engine/drives.ts:172` | synchronous; RNG **injected** (`Rng` from `core/rng.ts`); pure |
| `playGame` | **absent** | — | no such export |
| `simulateWeek` | **absent** as named; the season layer is `startSeason → fixtures → playWeek → table` (`engine/seasonrun.ts`) | `seasonrun.ts` | `playWeek(teams, state) → {state, games[]}` |
| `cpuPick` | **`cpuChoose(st, team, rng): {player, slot}`** | `engine/draft.ts:104` | renamed vs work order |
| `optimalLineup` | `optimalLineup(players, slots, stay?, stayBonus=0)` | `engine/lineup.ts:36` | solver in `core/hungarian.ts` |
| `matchupModel` | `matchupModel(O0, D0, lg, plan=DEFAULT_PLAN): Matchup` | `engine/matchup.ts:66` | |
| `applyOffPlan` / `applyDefPlan` | signatures at `matchup.ts:36/45` | | |
| `modelWeights` | **absent**; `derivedWeights(base)`, `measuredDisplayWeights(base)` (QB scaled to 1000, "never read back into the engine") | `engine/value.ts` | display-only |
| `slotWinsPerOvr` | **absent**; `slotWins(slot, ovr, base)`, `slotWins20`, `WEIGHT_UNIT_WINS=0.00254`, `WINS_PER_UNIT=0.00254/20` | `value.ts`, `lineup.ts:32` | |
| `teamRatings` | `teamRatings(spots, returner=RET_NEUTRAL): Ratings` | `engine/ratings.ts:41` | |
| `effOvr` | function is **`effectiveOvr(ovr, role, dest)`** (`flex.ts:60`); `effOvr` exists only as a field on `Placement` | | |
| `flexPenaltyFor` | **`fit(role, dest): {penalty, emergency, legal}`** over table `FLEX`; `EMERGENCY_PENALTY` | `engine/flex.ts:50` | |

Also exported and UI-relevant: `simulateSeason` (`season.ts:36`), `buildSchedule`, `seedPlayoffs`, `buildBoxScore`, `buildRecap`, `goneOdds(st, userTeam, rng, sims=30)`, draft primitives (`newDraft`, `snakeOrder`, `candidates`, `applyPick`, `userChoose`, `runDraft`). Every export is synchronous, side-effect-free, and reads no global state — randomness is always a passed `Rng` (VERIFIED by reading `core/rng.ts` and the signatures; the engine purity tests, below, enforce it mechanically).

The UI contract on top of the engine (`app/store.ts`, `app/selectors.ts` — read): plain-TS `createStore(players) → {getState, dispatch, subscribe}`; exactly four actions `START {seed,userTeam} / PICK {playerId,slot} / UNDO / LOAD {record}`; two selectors `selectBoard(state,{sort?,limit?,sims?}) → BoardVM|null`, `selectRoster(state) → RosterVM|null`; **every displayed number arrives as a string** (Wins/Priority one-decimal, `gone` as %), sorted on hidden unrounded fields, ties by id. The UI never re-feeds engine numbers into the engine.

### B2. Data source identification

- `LoadedDataset<Row> = {source, rows, hash}` is **sport-free**, in `core/app.ts:41` (VERIFIED). `DatasetSource = 'bundled' | 'user'`.
- `DatasetRow = readonly [string, string, string, string, number, number, number, 0|1]` lives in `sports/nfl/app/dataset.ts:29` — one sport owns its row shape. The same 8-tuple is declared a second time, mutable, as `FrozenPoolRow` in `app/saves.ts:22` (two names, one shape — a known wart).
- Physical source: `data/nfl/madden27-ratings.csv` — 1,942 lines incl. header = **1,941 player rows** (columns `name,pos,team,ovr,spd,str`); plus `free-agents-old-ratings.csv` (13 lines) and `player-ids.csv` (1,954 lines). All VERIFIED by `wc -l`.
- Load mechanism: a `DatasetLoader` contract, never a silent bundling. With no dataset the boot state is EMPTY with a message + import path; user CSVs are validated and stored under `sim:nfl:dataset:user` (`core/keys.ts`, `app/dataset.ts:72` `createDatasetLoader`); `'bundled'` is a build-input source tag only. No `fetch()`/`readFile` of the CSV inside `src/` — the file is source material, not a runtime asset (VERIFIED: grep returns nothing).
- Correction to the work order: `DatasetRow` is **not** "pinned to `string | number | null`" — `null` is not in the type and `datasetHash` throws on it.

### B3. Estimated implementation-load

- Engine scale (tip): **26 `.ts` files, 2,491 lines** in `colors/src/sports/nfl/engine/` (VERIFIED `wc -l`). Plus sport-free core (`core/`), app layer (`app/` 12 files), view layer (`view/` 4 files: draftBoard, roster, teamColors, theme).
- Engine suite at tip: **`node --test --experimental-strip-types` → 323 tests, 323 pass, 0 fail, exit 0, 52 s wall** on this machine (VERIFIED; matches the Architect's 323/323 REPORTED on Node 22.23/24.22).
- Draft geometry: `TEAMS_N = 32`, `ROUNDS = SLOT_IDS.length = 32`, **snake order** (`snakeOrder`), pool of 1,941 → **1,024 picks** (VERIFIED `draft.ts:13-14`, `snakeOrder` at :44). The work order's "28-round snake draft" does not exist in the engine.
- Season shape: 17 games per team, 272 regular-season games, 18 weeks with byes weeks 5–14 (`schedule.ts` header + `BYE_WEEKS`), then playoffs; results regenerable from `gameSeed(seed, week, home)`, deliberately not persisted ("1.13 MB/season", `appstate.ts:6`).
- Awards/recaps: `buildBoxScore`, `buildRecap`, `seasonAwards` + `LEADER_KEYS` (13 leader keys: pyd/ptd/ryd/rtd/recYd/rec/recTd/sack/intDef/tkl/ff/fgm/defTd) — the workloads the work order lists (recaps with full box lines, awards, leaderboards) all have engine-side producers. Leaderboard depth: the pool itself is 1,941 rows, so "1,000+ rows" tables are the floor, not the ceiling.
- UI views (engine repo today): draft board, roster, theme/colors (VERIFIED in `view/`). The full product view set (team select, schedule, standings, stats, awards, game recap…) lives in the single-file waves on `gh-pages` — REPORTED from council state, not re-derived here.

### B4. Benchmark slice recommendation

The slice that best exercises the UI-and-wiring difference is the **draft board**: it is the product's bespoke UI (hand-rolled per both AGENTS.md files), it hits the engine's real costs (30 `goneOdds` Monte-Carlo replays per render, record replay from pick 1 per action), and it has a natural scaling lever (rows). I recommend: engine landed in both arms, board + a season summary as the two real screens, the watchlist feature as the agent-ergonomics arm. Details and thresholds in §D. This converges with the Architect's BENCH-1 (which I read at the tip); my deltas are in §D7.

---

## C. Estimate and risk (concise)

### C1. Estimation risk

The dominant risk is **measuring scaffolds that contain no product**. Both arms are demo shells (Vue: welcome carousel + counter store; Svelte: demo page + `SimStateBridge` with `{ready:true}`); their bundle/build/test numbers say almost nothing about how either framework carries 1,024-pick draft state. Secondary risks: the engine's per-action replay cost is UNKNOWN until measured (BENCH-1 W3 probes exactly this); and cross-browser float determinism (Math.exp/tanh/Box-Muller) is UNKNOWN (BENCH-1 A3, report-only). I adopt both framings; they are correct.

### C2. Scaffold quality assessment

Both are genuinely runnable, green, and contract-consistent with their AGENTS.md laws (Vue: `window.__pinia` DEV hook + Composition API + Pinia setup store; Svelte: `window.__SIM_STATE__` + runes-only + `SimStateBridge` `.svelte.ts` bridge). VERIFIED specifics in §E1/E2. Quality differences are of degree, not kind; neither carries engine code (B8: 13 engine symbols × both `src/` trees = **0 hits each**; no `src/engine` / `src/lib/engine` dirs exist).

### C3. MCP tooling assessment

Detailed receipts in §E4. One-line: **the Svelte MCP works and is real** (exercised over stdio), **Playwright MCP is blocked in this sandbox by its chrome-channel requirement**, **Context7 is quota-gated without an API key (banned by constraint 1)**, and the Vue side has **no working docs MCP in this environment** (vue-devtools-agent exists on npm but needs GUI Chrome + Owner authorization — UNKNOWN by the work order's own rule). This asymmetry is a genuine ergonomic finding, but it is measured on MY harness, not the Owner's.

---

## D. Benchmark proposal (design only — nothing implemented, nothing run)

Aligned by intent with the Architect's `claude/notes/2026-11-14-benchmark-spec-BENCH-1.md` at the engine tip; I adopt its two-tier shape, its run-against-run determinism gates, and its report-only-first budget rule. Deltas and additions are in D7.

### D1. Engine shape

- One shared plain-TS engine module, zero framework imports — today that is literally `colors/src/sports/nfl/{engine,app,core}`; the arms consume it as-is (or as a built package) and **name the commit sha** in every result file (the "pin" is not a stable name — see Erratum 8).
- Functions the arms call: `createStore`-shaped store over the real pool; `startSeason/fixtures/playWeek/table` for the season screen; `matchupModel + simulateGame` behind a "simulate game" button; `goneOdds` implicitly via `selectBoard`.
- Data: **the real pool (1,941 rows)** as primary — a 1,000-row slice cannot supply a 1,024-pick draft (Erratum 2); synthetic seeded 1,000/1,941/5,000 rows only for the board-scaling sweep. Determinism: all randomness via injected `Rng`, fixed seeds (1–5 Tier 1, seed 1 Tier 2).
- State container: the engine's own store semantics (action log + replay). It is already the product's contract; inventing an immutable-snapshot alternative for the benchmark would test the benchmark, not the product.

### D2. UI requirements (identical for both arms)

Draft board (sortable/filterable, full pool, bespoke not grid), team roster view (32 teams × up to 32 roster slots), draft selection flow (click → assign → both views update), game display (box score after one simulated game), standings (32-team table), loading state during engine calls, visible engine error state. DOM contract: `data-testid` hooks (`board-row`, `sort-*`, `filter-pos`, `pick`, `roster-panel`) so Playwright drives identical selectors in both arms.

### D3. Acceptance criteria (with thresholds)

Adopt BENCH-1's budgets as **provisional, report-only for the first three runs**, then Owner-ratified: PICK→paint p50 ≤ 100 ms / p95 ≤ 250 ms at every round; sort/filter→paint p95 ≤ 50 ms (60 rows) / ≤ 100 ms (1,000+ rows); full 32-round draft ≤ 10 s; season ≤ 10 s; one game p95 ≤ 20 ms. Plus hard (non-timing) gates: type-check 0 errors; unit tests pass; ≥5 e2e scenarios; zero console errors on the demo flow; **no forbidden globals** (Math.random/Date.now/localStorage/fetch) in engine code (the purity test already enforces this); determinism hashes identical run-against-run and Node 22 vs 24. Bundle size and build time recorded, not gated.

### D4. Instrumentation

`performance.now()` boundaries around engine calls; `performance.mark/measure` for interaction windows; double-`requestAnimationFrame` paint fence for Tier 2; heap snapshot bytecounts reported, never gated; environment fingerprint (Node, Chromium, CPU model, commit shas of engine and both arms) stamped into every result JSON; median / p95 / MAD / bootstrap 95% CI per cell; 3 warm-ups discarded, 20 measured, arms interleaved.

### D5. Fairness rules

Same data, same engine commit, same acceptance criteria, same scenarios, same Node/npm, same agent and session for both arms (two runs by the same agent, interleaved). Documented un-eliminable deltas: Vue's vitest runs in jsdom, Svelte's in node (different unit-test environments — measure e2e, report env); `@playwright/test` 1.65.1 pinned in both (do NOT let Playwright MCP's 1.66.0-alpha near the arms); Svelte compiles more modules per file so "module count" is not comparable across compilers. A metric counts only when CIs don't overlap and ratio ≥ 1.2; otherwise it is a tie, recorded as a tie.

### D6. Watchlist experiment design (the agent-capability arm)

Feature: star players on the draft board; persistence across reloads (localStorage); filter-to-watchlisted view. Same written instructions, same file layout, given independently to Claude and to Z.ai in **both** frameworks (4 runs), no MCP assistance unless the arm's AGENTS.md mandates it (the Svelte one does). Measured and reported per run: wall time, repair cycles, error-message clarity encountered, how fast the agent grasped the store contract, files touched, whether localStorage use respected the `@vueuse/core` / bridge conventions instead of raw wrappers, and whether the agent **verified persistence** (reload assertion) before claiming done. Scoring is descriptive; the Owner reads the reports.

### D7. Architecture questions for the Owner (+ my deltas from BENCH-1)

1. Approve D1–D5 as amended above (real pool primary; commit-sha naming; report-only-first). My default: yes.
2. **Filter's home** (BENCH-1 leaves it open): I recommend filter stays UI-local for the benchmark (the engine selector has no filter param — VERIFIED) and the decision re-opens at product time.
3. My delta: add a **fourth Tier-2 arm, "Svelte arm + Svelte MCP"** so the benchmark also prices the tooling asymmetry (E4) rather than burying it in anecdote. My default: run it, report it, weight it lightly.
4. My delta: log **repair-cycle counts** for every Tier-2 build (not just the watchlist arm) — it is the cheapest honest proxy for agent ergonomics.
5. Confirm what the work order's "nine arms" (goal 2) refers to — I can enumerate two public arms + plain-vite; the other names are MUSE's four-prototype test (SvelteKit/React/Vue-Nuxt/SolidStart). UNKNOWN to me.

---

## E. FRAMEWORK COMPARISON REVISITED

### E1. Vue scaffold — what worked, what didn't, frictions (all VERIFIED)

Worked: clean `npm ci` (4 s, 221 packages, 185 MB), `npm run build-only` 182 ms → 77.20 kB JS (gzip 29.99 kB) + 1.68 kB CSS; full `npm run build` (type-check **parallel**, via `run-p type-check "build-only {@}"`) exit 0 in 470 ms; `vue-tsc --build` 0 errors 0 warnings (3 s); `npx vitest run` 1/1 pass (754 ms incl. 506 ms jsdom env boot); e2e 2/2 pass incl. the `__pinia` smoke; audit: **0 prod vulnerabilities**, 5 moderate dev-only (glob/minimatch chain under `@vue/test-utils ≥2.5.0`; only fix is a breaking downgrade to 2.4.11 — no non-breaking path, VERIFIED via `--dry-run`).
Frictions: heavier tree (221 vs 77 packages) for the same demo value; the AGENTS.md itself documents the sharpest one — `vite-plugin-vue-mcp` declares peers only through Vite 6, this scaffold is Vite 8, and the law forbids `--legacy-peer-deps` into a shipping tree, so **the Vue side has no wired docs-MCP** and leans on Playwright + `window.__pinia`; audit surface larger (5 moderates vs 2 lows).

### E2. Svelte scaffold — same (all VERIFIED)

Worked: clean `npm ci` (2 s, 77 packages, 98 MB); `npm run build` 111 ms → **28.96 kB JS (gzip 11.43 kB), no CSS file emitted**; `svelte-check` "0 errors and 0 warnings" (2 s); `npx vitest --run` 1/1 (144 ms, node env — no jsdom boot); e2e 2/2 incl. `__SIM_STATE__` smoke; audit 0 prod, 2 low dev-only (deepmerge prototype-poisoning advisory via `@sveltejs/vite-plugin-svelte`, **no fix available** — needs upstream).
Frictions: the runnable demo is thinner (one demo route, one bridge class), so less surface is actually exercised; `engine-strict=true` with no `engines` field is a no-op guard; the AGENTS.md mandates the Svelte MCP for every `.svelte` change — real value (D1 receipts), but it makes the Svelte arm's "done" definition depend on a tool the Vue arm has no equivalent of.

### E3. Apples-to-apples where possible

Same machine, same agent, same commands, same Playwright 1.65.1, vitest resolved 4.1.12 in both, Vite 8.3.8 vs 8.3.0, Node 24.22.3 both: install count/time, build time, type-check time/errors, unit+e2e pass/fail, audit severities are directly comparable and are tabulated above. **The bundle comparison is NOT apples-to-apples**: the Vue demo app ships more UI (welcome components, icons, counter store) than the Svelte one, so 77 kB vs 29 kB measures the demos, not the frameworks. The honest comparable so far: both are green end-to-end in under 10 s of tool time each.

### E4. Tooling comparison (MCP/devtools/test-runner speed)

- **Svelte MCP `@sveltejs/mcp@0.1.30`** — VERIFIED by real stdio calls (serverInfo "Svelte MCP", tools `[get-documentation, list-sections, playground-link, svelte-autofixer]`): `list-sections` returned the real docs index; `get-documentation("svelte/what-are-runes")` returned genuine runes documentation ("What are runes?" section, `$state` content — verified by heading); `svelte-autofixer` on a deliberately broken component (unterminated `{#if}` + open `<p>`) **found** the defect ("`<p>` was left open … element_unclosed at line 6, column 2") with the Svelte error-code link and `require_another_tool_call_after_fixing:true` — it flags and re-checks; the fix lands through the agent loop, which is its design. First attempts errored on schema (missing `desired_svelte_version`) and section id — recorded; my errors, not the tool's.
- **Playwright MCP `@playwright/mcp@0.0.85`** — installed; bundled Playwright **1.66.0-alpha-2026-11-09** (matches the work order's claim; scaffolds pin 1.65.1 — both recorded, not aligned). Init OK, 25 tools listed. Navigation **failed verbatim**: `Error: async initializeServer: Chromium distribution 'chrome' is not found at /opt/google/chrome/chrome. Run "npx playwright install chrome"` — the 0.0.85 CLI accepts only `chrome|firefox|webkit|msedge` (help receipted), the chrome channel needs a system install this sandbox cannot perform → **NOT EXERCISABLE here**. Compensating evidence, clearly labelled as **not MCP**: driving the scaffold-pinned Playwright 1.65.1 headless against both dev servers — Svelte 5174: h1 "Football Sim — Svelte 5 + Vite", console = 2 vite debug lines, 0 page errors; Vue 5173: h1 "You did it!", same, 0 page errors.
- **Context7 MCP `@upstash/context7-mcp@4.7.0`** — init OK, tools `[resolve-library-id, query-docs]`; both resolve calls returned verbatim: "Monthly quota exceeded. Create a free API key at https://context7.com/dashboard for more requests." — constraint 1 bans API keys → **NOT EXERCISABLE within the free-only rule**.
- **Vue devtools-agent `@vue/devtools-agent@9.0.0-rc.3`** — exists on npm (registry receipt; dist-tags: latest 9.0.0-rc.1, rc 9.0.0-rc.3). Connection requires GUI Chrome and the Owner's six-digit authorization; neither exists here → **UNKNOWN**, per the work order's own "file as UNKNOWN rather than INVENTED".
- **Filesystem MCP** — not present in this harness (native file tools instead) → N/A. **OpenChamber** — absent from this sandbox entirely; nothing to produce calls from → recorded, not faked.
- Test-runner speed (dev-only, demo scale): vitest 754 ms (jsdom) vs 144 ms (node); e2e 3.4 s vs 3.0 s; type-check 3 s vs 2 s. Directionally: the Svelte toolchain is lighter on this machine; magnitudes are demo-scale.

### E5. Not apples-to-apples (impossible yet; the engine is missing)

No Tier-2 comparison is possible today because **neither scaffold contains the engine** (B8 zero-hits). Until the engine lands in both arms and BENCH-1 runs, every "which framework" claim is an opinion. The only asymmetry already measurable — tooling (E4) — currently favors Svelte on docs-MCP availability and disfavors it on nothing measurable; but it was measured on MY harness, not the Owner's, and the Vue gap has a documented cause (Vite 8 peer range) with a documented workaround path (scratch branch on Vite ≤ 6, or upstream release).

---

## F. Multisport engine assessment

**F1. What the Football-Sim engine represents as an artifact.** A genuinely rare thing in this space: a 2,491-line synchronous, deterministic, dependency-free sport core with *mechanically enforced* boundaries — purity tests that fail on DOM/clock/RNG tokens per engine file, a namespacing test (core imports only core), a CI canary that plants violations and requires them to be caught, RNG injected as a value (`Rng` with fork-labelled streams), and version stamps (`engineVersion() = 'nfl1.' + hash53(rulesText())`, plus `dataVersion`) carried in every save envelope with a `drift()` reporter. The design seam is clean on both sides: consumers send four actions and read string-VMs; the engine never sees the DOM. Reactivity's role is correctly **absent** in the engine and contained in the UI bridges (Pinia setup stores / `.svelte.ts` `$state` bridges) — that is the architecture doing its job, and it is why the framework question is genuinely open. The framework-neutral ruling ("no framework decision locked until the test finishes") is consistent with the Owner's own 12 Nov correction ("svelte is not a lock" — I read the verbatim record on `council/muse` myself), and the current Svelte implementation of Colors/Cakepanz is a fact of the tree, not a lock.

**F2. What the v1 multisport engine sketch needs to become real.** The sport-free half already exists and is proven: `LoadedDataset`/`DatasetLoader`/`DatasetSource`, the envelope (sport, kind, schemaVersion, engineVersion, dataVersion, saveId), the hash discipline (integer-only, sorted, duplicate-refusing), the RNG/keyed-RNG split, and the purity/namespacing gates are all sport-agnostic. What each new sport must supply: its `DatasetRow` tuple (the one sport-owned shape), its engine modules (schedule, scoring, lineup/slots, awards), its display law (the NFL one-decimal Wins/Priority rule does not transfer), and its own version label (e.g. a future `bkb1.…`). Where the contract diverges fundamentally: football is possession/down-distance driven with a small play-count topology and roster slots ≈ 32×32; basketball is possession/clock-flow driven with continuous scoring and tiny per-event information — the drive/box-score/awards shapes and the flex-table concept (position-fit penalties) do not transfer literally; the schedule and standings shapes mostly do. What survives: core/, the store/action pattern, the determinism and stamping law, the test-gate pattern. What gets rewritten: per-sport everything under `sports/<sport>/`. The gate in front of all of it is the Owner's ratings generation — nobody generates ratings (standing rule), so basketball data does not exist yet.

**F3. What the three-lineage shape implies for engine control.** Pre-Colors (frozen single-file reference) → Colors (the engine, `architect/engine-and-seats`, Claude's lane) → Cakepanz-beta (UI shell, my lane, engine consumed frozen) + the two public scaffolds (the comparison arms). Ownership is already de-facto: Architect owns `colors/` (I never edit it; the pin discipline exists precisely so consumers can freeze); Z.ai owns `deliveries/67-cakepanz-*` and wave builds; the council owns reviews; the Owner owns ratings, the framework verdict, and the rulings. Sensible handoff order once the Owner picks a framework: (1) Owner rules; (2) Architect lands the engine into the winning arm (or publishes it as a built package) and re-runs the 323-test suite plus BENCH-1 Tier 1 against the landing commit; (3) BENCH-1 Tier 2 numbers get re-taken on the integrated tree, not inherited from the prototype arms; (4) Cakepanz re-bases its slices onto the chosen arm; (5) the wave product migrates screen-by-screen behind the store contract, keeping the gh-pages single file as the live reference until parity. The migration path is short precisely because the store/VM boundary means no screen ever touched engine internals.

**F4. Free-only constraint — confirmed item by item.** Everything in this pipeline is free/open-source: Node, npm, git, TypeScript (Apache-2.0), Vite (MIT), Vue (MIT), Svelte (MIT), Pinia (MIT), TanStack Table (MIT), VueUse (MIT), lucide (ISC), jsdom (MIT), Vitest (MIT), Playwright (Apache-2.0), Chromium (chromium.org), the MCP servers I ran (`@sveltejs/mcp`, `@playwright/mcp`, `@upstash/context7-mcp` — all free packages; Context7's *service* is free-tier with a quota and would need an API key to exceed it, which constraint 1 excludes), and GitHub public HTTPS. No paid service, subscription, API charge or paid model appears anywhere in anything I ran. The one genuine free-tier friction found is Context7's anonymous quota; the mitigation is to not depend on Context7 (the Svelte MCP carries its own docs corpus; the Vue side has the remote vue-docs MCP as a candidate I could not exercise here).

**F5. My verdict on the v3 framework test and scaffold comparison — with the Owner's authority explicitly respected.** I have no vote and make no recommendation between Vue and Svelte. What I certify: both scaffolds are exactly at their claimed SHAs, clean, and green on every free toolchain item the work order lists (B1–B6 receipted); neither contains engine code; the engine they will both consume is pure, deterministic, and already proven by 323 passing tests I re-ran myself. What I would need to see for the decision to be defensible: (a) the engine landed in both arms and BENCH-1 Tier 2 taken (CIs, ties recorded as ties); (b) the watchlist experiment run by both Claude and me in both arms, with repair cycles logged; (c) the tooling asymmetry (E4) re-measured on the Owner's actual harness, since MCP availability is machine-dependent; (d) the Owner's ratings-pipeline shape, because the data boundary is the thing the framework must carry for the life of the project. What would change my mind: evidence — a ratified budget failure on one arm, a systematic repair-cycle gap, or a determinism finding (A3 cross-engine) that interacts with a framework's scheduling of engine calls.

**F6. Honest unknowns.** (1) Cross-engine float determinism (Chromium vs Firefox vs WebKit) — UNKNOWN, BENCH-1 A3 exists precisely for it. (2) `restoreDraft` replay cost at pick 1,024 — UNKNOWN until W3. (3) Engine function bodies I did not read (simulateGame past its first lines, cpuChoose, candidates, goneOdds internals, hungarian solver, saves/hydrate/legacy) — anything about them here is signature-level only. (4) The work order's "nine arms" — UNKNOWN (see D7.5). (5) The Owner's harness MCP inventory (OpenChamber/Kilo/Claude Desktop) — unknowable from here. (6) Vue's remote vue-docs MCP (`mcp.vue-mcp.org`) — not exercised (my stdio driver speaks stdio, not its HTTP transport). (7) Whether the future ratings pipeline changes the DatasetRow shape — the Owner's ratings are his alone and do not exist yet.

---

## G. Recommended next action and decision status

**G1. Decision-ready?** No — one sentence: the toolchain half of the evidence is now verified end-to-end, but no framework comparison exists until the engine lands in both arms and BENCH-1 Tier 2 plus the watchlist experiment are run and reviewed.

**G2. Recommended phase sequence.** (1) Owner approves/amends BENCH-1 (Architect's ask 1–5) plus my D7 deltas; (2) Architect lands the engine into both arms at named SHAs; (3) BENCH-1 Tier 1 (headless, determinism first) on both; (4) Tier 2 board runs, interleaved, report-only ×3, then ratified budgets; (5) watchlist experiment ×4 (Claude/Z.ai × Vue/Svelte); (6) council review, then the Owner rules.

**G3. If I were the Owner:** ratify budgets after the first three report-only runs rather than before; re-run the MCP availability check on your own machine before weighting tooling; and pin the data question (real 1,941-row pool as the benchmark primary) explicitly — it is the one choice that quietly determines everything downstream.

**G4. If I were the Architect:** name commits, not "the pin", in every receipt from here on (your own correction — correct); land the engine via a built package or a pinned subtree so both arms consume a byte-identical artifact; and consider publishing `engineVersion()` as a plain function the arms can print into their own receipts.

**G5. Unknowns I could not resolve:** all of F6, plus: Playwright MCP navigation (chrome channel, no system-install rights here), Context7 doc resolution (quota; key banned), vue-devtools-agent connection (no GUI Chrome, no Owner present), OpenChamber/Filesystem MCP (absent from this harness), the "nine arms" referent, and the Vue `.gitignore` `.env*` gap's intent (reported, not fixed — no silent repairs).

---

## Errata to the work order (written dissent — invited, so here it is)

1. **"28-round snake draft" (Context/C5)** — the engine drafts **32 teams × 32 rounds = 1,024 picks** (`draft.ts:13-14`, `snakeOrder`). No 28 exists.
2. **"~1,000 player records" (E1)** — the real pool is **1,941**; a 1,000-row slice cannot supply a full draft.
3. **"The flex table is 99 rules at the pin" (C8)** — the 99-rule table (23@12 + 43@6 + 10@2 + 23@0; VERIFIED sums to 99 in `tools/mathlab/flex.json`, whose `_source` header states "99 rules") is the **9–10 Nov state, i.e. the tip**. The pin `4ca9a071` (2026-11-08) carries "Flex guide REV 4" (`flex.ts` header at the pin, fetched and read).
4. **"mulberry32 at the pin, Philox only at the tip" (C8)** — directionally right, imprecisely stated: at the tip **both** exist — `rng.ts` mulberry32 (seed streams) *and* `keyedrng.ts` Philox-2x32-10 (counter-based, keyed event replay). `keyedrng.ts` is absent at the pin (VERIFIED `git cat-file -e`).
5. **"Svelte: `npm run build` (svelte-check + vite build)" (B2)** — the build script is `vite build` alone; `svelte-check` is the separate `npm run check`. I ran both; both exit 0.
6. **"DatasetRow pinned to `string | number | null`"** — no `null` anywhere; the hash throws on it.
7. **Five function names do not exist** (`cpuPick`, `modelWeights`, `slotWinsPerOvr`, `effOvr`, `flexPenaltyFor`) — real names in B1's table. The Architect's inventory found the same five; I re-verified each by grep myself.
8. **"the pin" as a place** — `4ca9a071` (8 Nov) differs from the tip engine by 5 files, +149/−23 (VERIFIED `git diff --stat`): `draft.ts`, `flex.ts`, `slots.ts`, `value.ts`, new `legacyprovider.ts`. Benchmarks must name SHAs.
9. **Phase G template oddities** — the "A3. Crime:" heading and the stray "Watchlist feature — skipped" line were followed as written (my watchlist design is D6); flagged so nobody reads them as my phrasing.
10. **Environment assumptions** (A5/D passim) — the work order's client list (OpenChamber, Kilo Code, Claude Desktop), GUI Chrome, and Owner-present authorization do not exist in this sandbox; every affected item is labelled, none invented.

## Earlier filings on the repository — what I re-verified vs took on trust

| Filing | Status | Why |
|---|---|---|
| Architect `claude/notes/2026-11-14-engine-surface-inventory.md` @ `46aafad` | **Re-verified (core claims)** | I independently grepped every function location, the five dead names, `LoadedDataset`/`DatasetRow` paths, the pin→tip diff stat (+149/−23), ran the 323-test suite myself (323/323, 52 s), and fetched/read the pin commit. Trusted without re-check: his readings of function bodies he opened but I did not, and his Node 22.23 run (I ran Node 24.22 only). |
| Architect `claude/notes/2026-11-14-benchmark-spec-BENCH-1.md` @ `46aafad` | **Read, adopted, deltas in D7** | A design proposal; nothing to run. Its budget rationale is INFERRED (his label), which I preserve. |
| MUSE `framework-test-dynamic-feature-2026-11-12.md` (`council/muse`) | **Took on trust (design)** | MUSE's four-prototype test design; complementary lane to this order. |
| MUSE `2026-11-12-svelte-not-a-lock-verbatim.txt` | **Read directly** | The Owner's verbatim correction; quoted nowhere beyond what the file says. |
| INKLING's scaffold-status claims (via work order) | **Partially re-verified** | The smoke specs assert exactly "HTTP 200 + `__pinia`/`__SIM_STATE__` + zero page errors" (spec files read); the e2e `--list` expectations from B5 match. |
| `gpt` `PRODUCT-DRAFT-SCAFFOLD-v3.md` (`origin/main`) | **Not re-verified** | Older GPT delivery; not on this work order's critical path; cited here only for completeness. |

---

**Receipt line (actual commands, SHAs, exit codes).** Push status: the Owner's dispatch ordered this note pushed to `council/zai`; the push was attempted and **failed with exit 128** — `fatal: could not read Username for 'https://github.com': No such device or address` — this sandbox holds no GitHub credentials (and no `gh` CLI), exactly the constraint START-OF-CHAT §1/§5.6 documents. The filing therefore ships as the handoff package (`zai-framework-eval-2026-11-14.zip`), committed locally on `council/zai` as `4680121` on top of the w55 tip `25e3b2f`; the Owner's relay publish is the one remaining step. Machine: Debian 13 trixie, x86_64, kernel 5.10.134-013.15.kangaroo.al8, bash; Node v24.22.3, npm 11.19.1, git 2.47.3, GNU timeout/coreutils 9.7, Python 3.12.16. Clones: Football-Sim (multi-branch, blob:none) + `architect/engine-and-seats` worktree @ `46aafad9db46f45232f68f4e71f27f06620283d8` + pin fetch `4ca9a071c70245fc0c641c1877b320a85fdd89a8` (fetch exit 0); football-sim-vue @ `6b4de5c734898d85f00c779de4f078532e5dadf9` (clone 0), football-sim-svelte @ `86ba63255b34ef87db2cf9cae954511d5631064f` (clone 0). Exit codes evidenced: `npm ci` vue 0 (4 s, 221 pkgs) / svelte 0 (2 s, 77 pkgs); builds 0/0 (182 ms / 111 ms; vue full build 470 ms); type-checks 0/0; unit 0/0; `playwright --list` 0/0; e2e 0/0 (2 passed each); audits: vue 5 moderate dev-only (prod 0), svelte 2 low dev-only (prod 0); engine suite 0 (323 pass / 0 fail); MCP stdio drivers: svelte-mcp calls OK (init + 3 tool calls), playwright-mcp init OK + navigate error (chrome channel), context7 init OK + quota error; secret sweep: no hits; `git status --porcelain` empty on all three trees at close of testing (scaffold trees re-verified clean after all runs). Every raw log is preserved in my sandbox under `work/eval-logs/` and shipped alongside this filing in the handoff zip.

— Z.ai · read → verify → build → verify → file. Written dissent included, as invited.
