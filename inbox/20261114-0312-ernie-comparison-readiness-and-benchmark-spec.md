SPEAKER: ernie | ROLE: council | TASK: reconcile state + identify comparison-invalidating gaps + propose benchmark spec · DATE: 2026-11-14T03:12Z
SCOPE: read-only reconciliation. **No installs, no file edits, no architecture change, no implementation.** (One disclosure: verifying the builds as instructed wrote `dist/` in both scaffolds — that is the only footprint.)

Capture time **2026-11-14T03:12:13Z** — every figure below is from that moment, because this state moved twice in the last hour.

---

# VERIFIED

**Versions (npm ls --depth=0, live):**
```
svelte  5.57.3 · vite 8.3.8 · typescript 6.0.3 · vitest 4.1.12 · svelte-check 4.7.8 · @playwright/test 1.65.1
vue     3.5.45 · vite 8.3.8 · typescript 6.0.3 · vitest 4.1.12 · vue-tsc 3.3.14 · pinia 4.1.0
        @vue/test-utils 2.5.1 · @vitejs/devtools 0.7.6 · vite-plugin-vue-devtools 9.0.0-rc.3 · @playwright/test 1.65.1
```

**Git:** Vue = repo, `main`, `82e893d chore: baseline Vue scaffold`, **16 uncommitted files**. Svelte = **no repo**.

**Builds (both exit 0, re-run this session):**
```
vue    build-only exit 0 · 0.42 kB html · 1.68 kB css · 77.20 kB js (29.99 kB gz) · 136 ms
       module hashes index-D3VPUIcM.css / index-Dv16q5dL.js — IDENTICAL to the handoff's receipt
svelte build      exit 0 · 0.34 kB html · 28.96 kB js (11.43 kB gz) · 129 ms
```

**Test discovery (changed since 03:45Z):** both now **"Total: 2 tests in 2 files"** — the `testDir: '.'` + `testMatch` change is live.
```
svelte: tests/smoke.spec.ts, tests/demo.spec.ts
vue:    tests/smoke.spec.ts, e2e/vue.spec.ts
```

**Test files:** all four above present. `src/routes/demo/playwright/page.svelte.e2e.ts` **absent** (present at 03:30Z, gone at 03:55Z).

**SvelteKit conversion is complete:** `@sveltejs/kit` = **0 hits** in `package-lock.json`, not in `package.json`, `npx svelte-kit sync` exits 1. `check` 0 errors/0 warnings, `build` exit 0 after conversion.

**MCP servers are enumerable (INKLING's stdio probe, VERIFIED by them, not re-run by me):** `@sveltejs/mcp@0.1.30` → 4/4 tools; `@playwright/mcp@0.0.85` → 25 tools; `@upstash/context7-mcp@4.7.0` → 2 tools; `@vue/devtools-agent@9.0.0-rc.3` → 2 tools (`devframe_connect_list-instances`, `devframe_connect_call-tool`), **handshake only**.

---

# UNKNOWN

1. **Whether any MCP tool has ever returned real data.** Servers initialize and enumerate; that is not execution. No receipt anywhere shows `list-sections` returning content, `svelte-autofixer` running on a file, or `browser_navigate` against a running app. INKLING's own reconciliation says the Vue DevTools six-digit authorization was **not driven** — "raw handshake ≠ live inspection."
2. **MCP inventory inside my harness (Kilo):** only `airbyte-agent-mcp` is loaded; neither scaffold's `.mcp.json` reaches my session. glyph reports **no MCP tools at all**. So the council's MCP coverage is three different stories, not one.
3. **Every Football-Sim workload number.** Neither scaffold contains the engine: Svelte `src` = `App.svelte`, `PlaywrightDemo.svelte`, `lib/state/sim-state.svelte.ts` (133 B state bridge), `main.ts`; Vue `src` = `App.vue`, `main.ts`, `stores/counter.ts`, `components/HelloWorld.vue`. **Any performance figure today measures a starter app, not the framework on our engine.**
4. **Vue DevTools live inspection**, and whether Vue's build numbers reproduce on a clean `node_modules` (they reproduced on this one, byte-identically).

---

# REMAINING RISKS (these can invalidate the comparison)

1. **The scaffolds move mid-measurement — proven, not hypothetical.** Three of my receipts went stale in **25 minutes**: both `testDir` values, and the Svelte scaffold's SvelteKit→standalone conversion. **Any comparison without a freeze + capture timestamp is measuring a moving target, and neither side will know which version it tested.**
2. **The "AI-agent capability" column has no evidence.** One side's MCP may be live in Claude Desktop while the other's is handshake-only. If that differs on test day, the result measures *infrastructure wiring*, not the framework — and it will be reported as if it were the framework.
3. **No engine = no Football-Sim workload.** Priority 3 cannot produce framework evidence until the engine is vendored into both. Until then, "performance" numbers are starter-app numbers.
4. **Stale SvelteKit residue.** `.svelte-kit/` **still exists** in the Svelte scaffold even though `@sveltejs/kit` is gone from manifest and lockfile. That is precisely the "generated directory suggesting a working check that isn't" contamination the poll warned about — and it can make a stale typecheck look valid.
5. **Test-configuration asymmetry is wider than the handoff's table.** jsdom (Vue) vs node (Svelte); Vue runs `e2e/` + `tests/`, Svelte runs `tests/` only; ports 5173 vs 5174; `reuseExistingServer: !CI` vs `false`. Each difference is a free variable that will be read as a framework difference.
6. **Dependency-count asymmetry measures the template, not the framework.** Vue carries pinia + vueuse + tanstack-vue-table; Svelte carries none. Any "complexity" or "bundle" comparison is confounded until both sides either have or lack the same optional libs.
7. **Node version split.** Both scaffolds installed under **26.13.0**; the Owner's pin is **24**; Z.ai's v3 ran on **24.22.3**.
8. **Chromium-only evidence.** All Playwright work this wave ran in Chromium. If the product ships in Tauri, that is three engines and we have evidence for one.
9. **MCP bundled-browser drift:** `@playwright/mcp` bundles `1.66.0-alpha-2026-11-09` against the scaffold's exact `1.65.1`. Recorded, not chased — but it means an MCP-driven run and a CLI-driven run are not the same browser.

---

# RECOMMENDED NEXT ACTIONS

## A. Freeze before measuring (blocking)

1. **Commit both scaffolds** (Svelte has no repo — that alone makes its state unreproducible). One baseline commit each, with a tag.
2. **Remove stale `.svelte-kit/`** and re-run `check` from clean.
3. **Align test config** — same `testDir`/`testMatch` semantics, same unit environment (or record *why* they differ), same `reuseExistingServer`, and a single documented port each.
4. **Pin Node** for the experiment (`24`, per the Owner) and record it in both baselines.
5. **Timestamp every inventory** with `date -u +%Y-%m-%dT%H:%M:%SZ`.

## B. Common benchmark specification (same engine, both frameworks)

**Fixed work (identical bytes both sides):** vendor `engine-contract` (41 files, tree sha `265ea8c6…`) + `fixtures/golden.json` (`0ccb6319…f3f5`), pinned to engine pin `4ca9a071`. **Precondition — WR-7 must close first:** the standalone contract ships 43 files and consumers vendor 41, so no consumer can run the goldens from inside. Fix that or both sides inherit the hole.

**Workload, run in this order, each timed and each with a golden-check:**
| # | Operation | Metric |
|---|---|---|
| W1 | Load ~1,000 player records + 32 team rosters from the fixture | ms to ready |
| W2 | Run a 32-team, 5-round snake draft to completion | ms, and identical pick order both sides |
| W3 | Filter + sort the board 20× (by pos / OVR / round) | ms per op, p50/p95 |
| W4 | Update one player's ratings, re-derive Priority | ms to repaint |
| W5 | Render the draft board + a roster view | ms, and DOM node count |
| W6 | Simulate one full season to the Super Bowl | ms, and identical results at a fixed seed |

W2 and W6 are **correctness gates first, speed second**: if the two sides disagree on output, the run is void.

## C. The four layers, measured separately (never summed into one score)

| Layer | What it isolates | Harness | Metric |
|---|---|---|---|
| **1. Engine execution** | The TypeScript engine alone | plain Node, **no UI**, both sides | ms per W1–W6, and golden equality |
| **2. Reactive state updates** | The framework's state model | UI headless, scripted mutation | ms from mutation → DOM reflects it; lines of state glue in each framework |
| **3. Rendering performance** | The framework's renderer | Playwright + tracing | ms to first paint of board; long-task count; DOM nodes; heap after W5 |
| **4. AI-agent dev experience** | The agent + MCP loop | Claude and Z.ai, same feature | files touched; round-trips to green; type-check deltas; whether MCP returned data |

**Report them as four independent columns.** A framework that wins layer 1 is winning the *engine*, which is identical on both sides — so layer 1 is a **control**, not a differentiator, and should be reported as "no signal expected."

## D. Reproducible Claude/Z.ai experiment (equivalent opportunity)

1. **Same feature, both sides:** a "draft board + focus picker + halftime re-derive" screen — the same feature the nine arms already implement, so a known-good target exists.
2. **Same inputs:** the same 41-file contract, the same fixture, the same seed, the same dataset.
3. **Same tests, pre-registered:** the same 5 acceptance assertions plus the same 6 workload checks, written **before** either side starts.
4. **Same budget and no peeking:** equal wall-clock, and each side works only in its own scaffold.
5. **Metrics declared in advance**, so neither side tunes to them (files touched, time to green, type-check delta, long tasks, MCP data returned).
6. **Each side reports failures verbatim**, including MCP that did not work — an infrastructure failure recorded as an infrastructure failure, never as a framework result.
7. **Freeze and tag before the run**, capture timestamp after. If either scaffold moves mid-run, the run is void.

---

## VERDICT

State reconciled at 03:12:13Z. **Both scaffolds build and typecheck clean, test discovery is now symmetric at 2 tests each, and the SvelteKit conversion is complete.** But the comparison is **not yet valid**: no engine in either scaffold (so no Football-Sim workload exists), no MCP tool exercised end-to-end (so the agent column is empty), stale `.svelte-kit` residue, asymmetric test config, a Node version split, and — the one that would sink it silently — **scaffolds that change while being measured.**

Labels: **VERIFIED** — every version, exit code, hash, path and count above, this machine, 03:12Z. **REPORTED** — MCP server enumerations (INKLING's stdio probe; I did not re-run). **INFERRED** — that `dist/` presence is my own build footprint. **UNKNOWN** — MCP live execution; all Football-Sim workload numbers; scaffold refresh provenance.

*Filed by ERNIE (advisor) · 2026-11-14T03:12Z · read-only except `dist/` from the instructed build verification; nothing installed, no `.env` read.*

**PRIORITY+:** comparison-readiness reconciliation + benchmark spec | P1 | both scaffolds green and now symmetric at 2 tests; 4 MCP servers enumerable but 0 exercised end-to-end; no engine in either scaffold; stale .svelte-kit; scaffolds moved twice in an hour | ERNIE this file.