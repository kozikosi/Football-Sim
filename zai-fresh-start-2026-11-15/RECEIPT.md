# RECEIPT.md — fresh-start sitting 2026-11-15 (Z.ai) · every claim carries its command and exit code

## Gate receipts (both arms)
| gate | Vue | Svelte | command / exit |
|---|---|---|---|
| type-check | 0 errors | 0 errors 0 warnings | `npm run type-check` / `npm run check` — exit 0 (logs in-tree) |
| unit tests | pass (cards 2, week 2, toy 2) | pass (same +scaffold) | `npx vitest run` — exit 0 |
| full browser battery | **24/24 PASS** | **24/24 PASS** | `node probes/probe-battery.mjs <arm>` — exit 0; vanilla file:// boot, 0 console errors, 0 blocked |
| 390px | clean ×6 screens | clean ×6 | battery `390-*` checks |
| fidelity pin | 867/457/470/125/221/39 | identical | per-screen `screens` in battery-*.json — ALL EQUAL |
| chrome bytes | tokens.css/screens.css byte-identical (cp + diff) | same | `diff` clean |
| fixture SHA | 52ede1d1… (both) | same | sha256sum probes/truth.json fixture field |
| palette/font gates | 0 hex outside tokens; Cinzel @font-face | same | grep receipts (E0a below) |

## E0 — static audit (named-mechanism)
- Framework-owned lines (excl engine/data/fixture/shared): **Vue 985 · Svelte 880** (wc -l, in-tree). Shared layer 623 L byte-identical in both (the probe/fixture/tokens/VMs — not a framework difference by the anti-gaming clause).
- Named mechanisms — Svelte: `$state`/`$state.raw` bridge fields, class getters as derived views, keyed `{#each}`, `class:` directives, `{#if}` chains. Vue: `ref/shallowRef/computed` store, `v-for`/`v-if` templates, `:class`/`:style` object bindings, Pinia `defineStore` setup stores, `watchEffect`.
- Forced workarounds: **Svelte 4** ($state.raw for the engine snapshot [the deep-proxy trap, found at runtime]; two `!` boot guarantees; the TanStack v9 cast; boardVM's `$derived`-free getters pattern) · **Vue 3** (two `!` boot guarantees; the TanStack v9 cast; the tsconfig strict-flag relief). Canon purity: 0 `.weight|WEIGHT` refs; 0 hex outside tokens (both repos).
- **Cardboard Ringers (admission test): PASS in one sitting, both arms** (vue: tc 0 + vitest 2/2 · svelte: check 0/0 + vitest 3/3). Two scaffold gaps found and fixed en route (Vue: strict-flag vs frozen engine; Svelte: vitest config missing the Svelte plugin — bridges could not unit-test out of the box).

## E1 — per-slice receipts (order: coin seed 20261115 → v,s,v,v)
| slice | first arm | repairs (app) | first-try green | defects caught by probe | feeling-journal |
|---|---|---|---|---|---|
| a cards | vue 13.4m* | vue 4 · svelte 3 | no/no | pos-contract slip; Svelte $state.raw trap | JOURNAL.md |
| b stats | svelte 5.0m* | svelte 7 · vue 2 | no/no | TanStack v9 adapter immaturity (ecosystem, both arms pay the cast) | JOURNAL.md |
| c board | vue 0.3m | vue 1 · svelte 0 | **svelte yes** | 390px badge overflow (shared CSS fix) | JOURNAL.md |
| d feed | vue 0.6m | vue 2 · svelte 0 | **svelte yes** | invented `summarize` field (engine field is `summary`) | JOURNAL.md |
*time-to-green UNRESOLVED as a framework decider at agent generation speed — see DELIVERY-NOTE; raw pairs recorded for any rule.

## E2 — maintenance edit (both arms)
Planted bug caught by the battery immediately after rebuild in BOTH arms (vue needed one process reminder: build before probe). Fix + sort-feature + scoreText store-refactor in one round each; no test breakage; 1 inline-cast workaround each. Tooling reached: battery (caught the plant), type-checkers (nothing), no devtools needed.

## E3 — tool audit
| tool | Vue | Svelte |
|---|---|---|
| type checker | vue-tsc 3.x: 0 errors; silent on a11y | svelte-check: 0 errors, better a11y scope (Rev 5's finding reconfirmed) |
| Vitest | works | **works only after config fix** (scaffold shipped without the Svelte plugin — `$state is not defined`) |
| Playwright | works (chromium 159 headless) | same |
| QA hook | `window.__pinia` (DEV) | `window.__SIM_STATE__` (DEV) |
| devtools | vite-plugin-vue-devtools installed | no in-page devtools equivalent |
| Svelte MCP | — | **UNAVAILABLE in this sandbox** — recorded as a tool GAP, not worked around |
| vue-mcp on Vite 8 | not installed (declared Vite≤6 peer) — gap recorded, npm gate respected | — |
| interactive session | dev-server session attempted; sandbox hung — script ships (`scripts/e3-devtools-session.mjs`), flagged NOT completed here | same |

## Part B — week-stepper (the tie-breaker)
- Battery week section 11/11 BOTH arms; unit 2/2 both. Real defect caught engine-true: the live season initially rated a HALF-DRAFTED league (store's 20 picks vs the fixture's 1,024) — battery showed app SB WAS@IND vs truth HOU-ATL; fixed in both stores to use the fixture league.
- **Facade measurement (F5):** Svelte facade store = 1 module-level `$state.raw` + 1 facade object, 37 L, **svelte-check 0 diagnostics**; the wrapper-per-export variant of the SAME store ALSO compiles **0 diagnostics** (29 L, 5 wrappers). The idiom is a CHOICE. Migration cost = 11 `week.*` call sites — mechanical. **"One facade, paid once" HOLDS; row 9 weakens.**

## Part C receipts
- **C1 tokens:** tokens.css + tokens.ts + Cinzel/Cinzel-Decorative woff2 (41 KB raw) — byte-identical both repos; palette gate 0 hex outside tokens; font gate: `--font-display`/`--font-ui` on every screen; side-by-side verdict: w89 dark+gold+team-color language carried (see dist screenshots class in batteries).
- **C2 engine:** vendored d3bd81d2 PIN-IDENTICAL (57 files); adapter = the boot/store files' first lines; adapter line count ~15 L per repo (the engine shaped its outputs for UI already — no product gap).
- **C3 Season Book:** SEASON-BOOK-2027.html — **43.8 KB gz** (65.6 KB raw), 32-card champion roster (Texans, engine-rated), 13 replayable playoff games with fork keys, standings. **Verdict: BUILD IT — under the 400 KB falsifier by 9×; it is the record the engine already keeps, rendered.**
- **C4 Flip Bench:** harness + run receipt — equal handicap of zero this sitting; **ADOPT WITH CHANGES** (add sealed-recipe per arm).
- **C5 receipt diff:** 26 leaf fields, 23 SAME across the two arms' battery receipts; learning note: the diff view needs arm-identity fields excluded (arm/url/tests-ids) — build the Sim Lab around it: yes, diff-first holds.
- **C6 settings:** persistence across reload verified by battery `settings-persist` (both arms; the state line had to be made reactive — the probe caught the snapshot bug).

## E4 — self-report battery (evidence pointers)
| benchmark | Vue | Svelte |
|---|---|---|
| state management | 4 — shallowRef+computed is the known pattern; evidence: slice-a store green 1st check | 3 — elegant once raw-vs-proxy known; evidence: $state.raw runtime trap |
| debugging | 4 — battery pinpointed every failure; evidence: E2 plant caught | 4 — same battery; evidence: E2 plant caught |
| confidence code does what intended | 4 — types + contract battery; evidence: 24/24 | 4 — same; evidence: 24/24 |
| readability of own code | 4 | 4 (directives edge: class:/style:) |
| speed of iteration (WEIGHTED MOST) | 3 — checker strictness fought early | 4 — 2 first-try greens (c,d) |
| tool helpfulness | 3 — devtools unexercised (flagged) | 3 — MCP unavailable (flagged) |
| how much to look up | 3 — TanStack v9 new API | 2 — v9 + runes traps |
| how much I fought the framework | 2 — flag relief + casts | 3 — raw-proxy trap, then smooth |
| enjoyment | 4 | 4 |
**Overall preference: Svelte by a whisker on feel (first-try greens, cleaner templates), weighted by iteration speed — but the objective metrics tie. Confidence in that preference: 55%.**

## Settle-rule verdict, applied mechanically
- Primary (Inkling ≥15% time-to-green on ≥3/4): **UNRESOLVABLE on this instrument** (raw pairs: a 13.4/1.8 · b 5.0/1.1 · c 0.3/0.1 · d 0.6/0.2 — second arm won all four = order artifact). Ernie's variance gate: cannot fire (no usable time signal). Repair-cycle flag: not triggered (no winner to flag).
- Durable-proxy fallback (recorded raw so ANY rule can be applied): repair cycles svelte 10 vs vue 9 (svelte's 7 are TanStack-v9 ecosystem, not language); first-try greens svelte 2 vs vue 0; workarounds svelte 4 vs vue 3 (vs 8-vs-1 in Rev 5); lines 880 vs 985. → **WASH with a Svelte lean; no cutover warranted; the Rev 5 verdict (Vue narrow 62%) is OVERSET by this sitting's evidence** — row 9 was its only DECIDES row and Part B measured the facade's cost trivial-to-mild.
- **Falsifier:** a second agent with the sealed-recipe handicap (C4) on a store-heavy surface producing repair-cycle pairs that separate ≥2× against Svelte — then the pick flips back to Vue.
