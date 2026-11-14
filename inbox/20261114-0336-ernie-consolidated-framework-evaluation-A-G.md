SPEAKER: ernie | ROLE: council | TASK: consolidated Vue 3 + Vite vs Svelte 5 + Vite evaluation (sections A–G) · DATE: 2026-11-14T03:36Z

Read-only. No installs, no file changes, no production migration, no changes to `kozikosi/Football-Sim`. Capture time **2026-11-14T03:36Z**.

---

# A. Repository audit

**Both public, both tracking `origin/main`, both clean (VERIFIED).**
```
git ls-remote https://github.com/kozikosi/football-sim-vue      → 6b4de5c734898d85f00c779de4f078532e5dadf9  refs/heads/main
git ls-remote https://github.com/kozikosi/football-sim-svelte   → 86ba63255b34ef87db2cf9cae954511d5631064f  refs/heads/main
local HEAD (both) == origin/main · dirty = 0 · upstream = origin/main
```

**What each contains:**

| | Vue | Svelte |
|---|---|---|
| entry | `src/main.ts` (Vue+Pinia) | `src/main.ts` (native `mount`) |
| root component | `src/App.vue` (welcome app) | `src/App.svelte` |
| state | `src/stores/counter.ts` (Pinia setup store) | `src/lib/state/sim-state.svelte.ts` (**133 B** runes bridge) |
| demo/tests | `components/HelloWorld.vue` + `tests/smoke.spec.ts` + `e2e/vue.spec.ts` | `components/demo/PlaywrightDemo.svelte` + `tests/{smoke,demo}.spec.ts` |
| app deps | **4**: pinia, @vueuse/core, @tanstack/vue-table, vue | **0** |
| QA hooks | `window.__pinia` | `window.__SIM_STATE__` |

**What both are missing:** the simulation engine, any draft/roster/season domain model, any dataset, and any test that exercises product behaviour. Both are starter applications. **The 32-row fixture, 1,200-player dataset and 7-round draft are absent from both.**

**Configuration/dependency concerns:**
- **Dependency asymmetry:** Vue ships 3 optional libraries Svelte does not. Any "complexity"/"bundle" comparison is confounded until both sides either have or lack the same optionals. The handoff already warns about this; I am recording it as a *blocking* confound for any bundle comparison, not a footnote.
- **Stale local residue:** `.svelte-kit/` still exists in the Svelte scaffold (gitignored, so not published) — a generated dir next to a typecheck, i.e. the "suggests a working check that isn't" hazard.
- **Security:** `.mcp.json` and `.kilocode/` excluded and confirmed by `git check-ignore` in both. No credentials read or found by me. I did not perform an independent secret scan.

**Reproducibility:** the Vue working tree went 16 → 13 → **0 dirty** over the last 25 minutes; the published commit `6b4de5c` now equals the local HEAD. **So the published state does match the validated state** — my earlier concern is resolved, and the churn itself is the finding (see F).

---

# B. Original-product requirements (from the live 1.92 MB product, VERIFIED)

I inspected `origin/gh-pages:index.html` (1,922,769 B), the live build, rather than inferring from documents.

```
32 distinct NFL team codes · "1,200" and 1200 both present · 18 position codes
62 Math.random sites · 25 localStorage sites · ROUNDS constant present
```

Its element IDs map the screens the frontend must actually serve:

| Concern | Elements found |
|---|---|
| Draft board | `draftCards`, `draftLive`, `draftChips`, `draftPickNumberSelect`, `draftCompactSort`, `draftFitSummary`, `draftFinalResults`, `draftGuideHost` |
| Player/ team detail | `detailPanel`, `closeDetail`, `cmpResult`, `cmpTeamA`, `cmpTeamB` |
| Simulation control | `controls`, `beginPlayoffsBtn`, `backToSbBtn`, `dockRunItBackBtn`, `aggrSel`, `aggrDesc` |

**So the real frontend must:** render a **1,200-row draft board** with sort, compact and filter; **update it pick-by-pick** with derived state (priority/Wins) that must never go stale; show a **detail panel** and a **side-by-side team comparison**; drive a **season and playoffs**; present **recaps/box scores**; and — per `AGENTS.md` §3 — work **offline**.

**What that means for a benchmark:** the discriminating operations are **large-list rendering** and **derived recompute on mutation at ~1,200 rows**, not a counter. And it is worth stating plainly: **we already have a tie at small scale** — the nine-arm wave ran both frameworks on an identical 41-file engine fixture and both scored 5/5 with zero drift. **The benchmark's job is to find the scale at which that tie breaks**, not to re-run the scale where it already holds.

---

# C. Comparative assessment

**Demonstrated (measured, this session):**
- Both scaffolds build, typecheck, pass one unit test, pass two e2e tests, and produce a bundle (Vue 77.20 kB / Svelte 28.96 kB). **These numbers are not comparable** — different contents, different deps.
- Both passed the *identical* engine fixture in the nine-arm wave (5/5, contract `265ea8c6…`, goldens `0ccb6319…`).
- Svelte's state model is 133 bytes of runes; Vue's is a ~15-line Pinia setup store.

**Vue — strengths/weaknesses:**
- *Strength (demonstrated):* more batteries included (pinia, vueuse, tanstack table) and four MCP servers wired (`playwright`, `context7`, `vue-docs`, `vue-devtools`) — the best-tooled side today.
- *Weakness (demonstrated):* larger starter bundle and more dependencies to carry; 3 of those libraries are unused by a starter app.

**Svelte — strengths/weaknesses:**
- *Strength (demonstrated):* smallest dependency set, smallest bundle, fastest build (129 ms vs 136 ms), zero-config state via runes.
- *Weakness (demonstrated):* three MCP servers, no DevTools-grade inspector wired; **no repo history before today**.

**Theoretical only — do NOT score these yet:** large-list performance, reactivity at 1,200 rows, maintainability at product scale, agent ability on a real feature, debugging ergonomics. **None has been measured on this workload.** Everything the council has said about "which is easier to maintain" is currently opinion, including mine.

---

# D. Tooling and agent assessment

**Works (VERIFIED):** `npm run check` / `type-check` → 0 errors; `vitest --run` → 1 passed each (Svelte's non-watch run **closed by me this session**, exit 0); `playwright --list` → 2 tests each; `build` → exit 0 each.

**Does not work / not proven:**
- **Zero MCP tool calls have returned data.** Four servers *enumerate* (`@sveltejs/mcp` 4 tools, `@playwright/mcp` 25, `context7` 2, `@vue/devtools-agent` 2) per INKLING's stdio probe, but no receipt anywhere shows `list-sections` returning content, `svelte-autofixer` running on a file, or `browser_navigate` driving an app. **The Vue DevTools six-digit authorization was never driven through.**
- **My harness (Kilo) loads only `airbyte-agent-mcp`**; neither scaffold's `.mcp.json` reaches my session. glyph reports **no MCP tools at all**. So "the council's MCP coverage" is three different stories, not one.

**Therefore:** the "AI-agent development experience" column currently has **no evidence**. Any agent comparison run today would measure **harness wiring**, not the framework — and would be reported as if it measured the framework.

**Which stack is easier for agents to build and debug:** **UNKNOWN.** I can say which is better *wired* (Vue, 4 servers vs 3) and which is smaller to carry (Svelte). I cannot say which an agent builds faster on a real feature, because nobody has tried.

---

# E. Benchmark proposal

**Scope — the draft-board slice, sized to the real product (not a counter):**
- 1,200 player records; 32 teams with rosters; 7-round snake draft (~224 picks); board with sort / compact / position filter; pick-by-pick assignment; detail panel; team comparison; derived priority re-computed on every mutation.

**Shared engine boundary (fixed, both sides byte-identical):**
- Vendor `engine-contract` — **41 files**, tree sha `265ea8c6c509200b…fe5988`, golden `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5`, pinned to **`4ca9a071`**. This is proven 9/9 across the wave.
- **Precondition, blocking:** the standalone contract ships **43** files and consumers vendor **41** — `tools/golden.ts` and `tools/tsc-baseline.mjs` are never vendored, so **no consumer can run the goldens from inside.** That is my open WR-7. Close it first or both sides inherit the hole and the correctness gate is unenforceable.

**Acceptance criteria, in order:**
1. **Correctness gates first.** Both sides must produce *identical* draft order, identical board rows, identical sort results, and identical season results at a fixed seed. Any disagreement **voids the run** — it is not a performance result.
2. Then, and only then, performance.

**Test strategy:** engine unit tests (shared) · component test for the board row · e2e: the 5 existing acceptance assertions **plus** 6 workload checks (W1 load, W2 draft, W3 sort×20, W4 mutate+re-derive, W5 render board+roster, W6 season).

**Measurements — four layers, reported separately, never summed:**
| Layer | Isolates | Metric |
|---|---|---|
| 1 Engine execution | the shared TS engine | ms per W1–W6 + golden equality — **a control, expect no signal** |
| 2 Reactive state | the state model | mutation → DOM ms; lines of state glue |
| 3 Rendering | the renderer | ms to paint 1,200-row board; long tasks; DOM nodes; heap |
| 4 Agent experience | Claude/Z.ai + tools | files touched; round-trips to green; typecheck delta; MCP data returned |

**How to keep it fair:** same data · same seed · same engine bytes · same acceptance tests written **before** either side starts · equal wall-clock · metrics pre-registered · **freeze and tag before the run** · **Node pinned to 24** (both scaffolds were installed under 26.13.0; Z.ai's v3 ran on 24) · same unit-environment semantics (or a written reason for jsdom vs node) · dependency parity declared · failures reported verbatim.

---

# F. Risks and recommendations

**Risks, ranked:**
1. **State churn outruns measurement.** Four changes in one hour: both `testDir` values; SvelteKit→standalone Svelte; Svelte `no git` → 28 staged → committed `86ba632`; Vue 16 → 13 → 0 dirty. **Without a freeze and a tag, neither side will be able to say which bytes produced its numbers.**
2. **No engine in either scaffold** → the workload in §E does not exist yet, so every "Football-Sim" number to date measures a starter app.
3. **Zero MCP end-to-end calls** → the agent column is empty, and an empty column gets filled with reputation instead of evidence.
4. **Dependency asymmetry** (3 unused libs on the Vue side) → confounds any complexity/bundle comparison.
5. **Test-config asymmetry** (jsdom/node; `e2e`+`tests` vs `tests`; 5173/5174; `reuseExistingServer` differing) → free variables read as framework differences.
6. **Node split** (scaffolds on 26.13.0; pin 24; v3 on 24.22.3).
7. **Chromium-only** — if offline/desktop enters scope, that is three engines and we have evidence for one.
8. **Bundle size as a proxy** — the handoff rejects it and I agree: 77.20 vs 28.96 kB measures starter content, not the product.

**Recommendations, in order:**
1. **Freeze and tag both repos** (`benchmark-base`), then no further scaffold edits until the run closes.
2. **Close WR-7** (vendor `tools/golden.ts` + `tools/tsc-baseline.mjs`) — it gates the correctness half of the benchmark.
3. **Vendor the 41-file contract + golden into both**, pinned to `4ca9a071`.
4. **Pin Node 24** in both, and align the unit-test environment (or document why not).
5. **Delete the stale `.svelte-kit/`**, re-run `check` clean.
6. **Only then** run §E, with the four layers reported separately.
7. **On Tauri:** I agree the comparison should be Tauri-independent — my earlier point was about the product's *distribution target*, not the framework. One addition to the record: `AGENTS.md` §3 records offline as a hard requirement, so **the benchmark should include one offline check per side**, or that requirement silently disappears from a feature-parity comparison.

---

# G. Decision status

**The evidence does not support choosing a framework now, and I recommend saying so plainly.** What exists is: two starter scaffolds that build and pass trivial tests; a nine-arm fixture in which **both frameworks tied at 5/5 on an identical engine**; and an agent-tooling column with **no verified calls**.

**What would change this:** the §E benchmark producing a *correct* run on both sides, with the four layers reported separately. The most likely outcome, on current evidence, is **another tie at 1,200 rows** — in which case the decision should be made on **maintainability and owner-comprehensibility**, which is exactly the criterion the handoff says matters most for a non-specialist owner, and which no test in this wave has measured.

Labels: **VERIFIED** — every ref, exit code, count, hash and path above, this machine, 03:36Z. **REPORTED** — the two repos' "verified public" status (confirmed by me via `ls-remote`), MCP enumerations (INKLING's stdio probe; not re-run). **INFERRED** — that `.svelte-kit/` is SvelteKit-conversion residue; that `ROUNDS` is the draft round count. **UNKNOWN** — MCP execution; all Football-Sim workload numbers; whether the draft is 7 rounds in the live file (the docs say 32 teams × all rounds; the source shows a `ROUNDS` constant I did not resolve).

*Filed by ERNIE (advisor) · 2026-11-14T03:36Z · read-only; no `.env` read; `dist/` regenerated only by the instructed build checks.*

**PRIORITY+:** consolidated evaluation A–G | P1 | both repos public and clean (6b4de5c / 86ba632) but neither contains the engine; zero MCP calls verified end-to-end; benchmark spec sized to the real 1,200-row/32-team product; WR-7 blocks the correctness gate; evidence does NOT support a decision | ERNIE this file.