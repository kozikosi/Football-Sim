# RECEIPT.md — fresh-start sitting 2026-11-15 (Z.ai) · every claim carries its command and exit code

## Gate receipts (both arms)
| gate | Vue | Svelte | command / exit |
|---|---|---|---|
| type-check | 0 errors | 0 errors 0 warnings | `npm run type-check` / `npm run check` — exit 0 (logs in-tree) |
| unit tests | pass (cards 2, week 2, toy 2) | pass (same +scaffold) | `npx vitest run` — exit 0 |
| full browser battery | **24/24 PASS** | **24/24 PASS** | `node probes/probe-battery.mjs <arm>` — exit 0; vanilla file:// boot, 0 console errors, 0 blocked |
| 390px | clean ×6 screens | clean ×6 | battery `390-*` checks |
| fidelity pin | 871/457/470/125/221/39 | identical | per-screen `screens` in battery-*.json — ALL EQUAL (cards corrected 867→871, Rev 8 erratum 0.6) |
| chrome bytes | tokens.css/screens.css byte-identical (cp + diff) | same | `diff` clean |
| fixture SHA | 52ede1d1… (both) | same | sha256sum probes/truth.json fixture field |
| palette/font gates | 0 hex outside tokens; Cinzel @font-face | same | grep receipts (E0a below) |

## E0 — static audit (named-mechanism)
- Framework-owned lines — **method restated and re-measured (Rev 8 erratum 0.8; the receipted "Vue 985 · Svelte 880" is NOT reproducible — no include/exclude list was stated, and under every natural rule the numbers differ; the two receipted figures were measured in different scopes).** Stated method: non-engine, non-shared framework-owned lines = `find src -type f \( -name '*.ts' -o -name '*.vue' -o -name '*.svelte' -o -name '*.css' \) ! -path '*engine*' ! -path '*shared*' | xargs wc -l | tail -1` (includes tests, entry, chrome css; excludes engine, shared layer, data csv/json). Reproducible numbers on the Rev 8 tree: **Vue 991 · Svelte 1,079** (Rev 8's own Part A cells included: vue +113, svelte +206); on the Rev 6 baseline (Rev 8 files subtracted): **Vue 878 · Svelte 883 — a 5-line tie, not a 105-line Svelte advantage.** The "lines favor Svelte" proxy DIES under reproducible measurement, exactly like the workarounds proxy (erratum 0.3). Shared layer 623 L byte-identical in both (re-verified).
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
| interactive session | **RAN (Rev 8, Part D)** — devtools session executed: state inspected via `__pinia`, `setSort('ovr')` through the store updated the UI (top OVR 99), screen toggled to feed via the hook; 0 page errors; receipt `receipts/e3-devtools-vue.json`. The Rev 6 "sandbox hung" root-caused and fixed: the script killed npm but not the vite child (process group) — `detached: true` + process-group kill shipped in both repos; sessions now exit 0 | **RAN (Rev 8, Part D)** — same via `__SIM_STATE__` (bridge instance: screen=cards, sort=wins read; sort change → UI; feed toggle → UI); 0 page errors; receipt `receipts/e3-devtools-svelte.json` |

## Part B — week-stepper (the tie-breaker)
- Battery week section 11/11 BOTH arms; unit 2/2 both. Real defect caught engine-true: the live season initially rated a HALF-DRAFTED league (store's 20 picks vs the fixture's 1,024) — battery showed app SB WAS@IND vs truth HOU-ATL; fixed in both stores to use the fixture league.
- **Facade measurement (F5):** Svelte facade store = 1 module-level `$state.raw` + 1 facade object, 37 L, **svelte-check 0 diagnostics**; the wrapper-per-export variant of the SAME store ALSO compiles **0 diagnostics** (29 L, 5 wrappers). The idiom is a CHOICE. Migration cost = 11 `week.*` call sites — mechanical. **"One facade, paid once" HOLDS; row 9 weakens.**
- **F5 restated as a wash (Rev 8 erratum 0.9):** the two files measured DIFFERENT things — weekStore.svelte.ts (37 L) holds five getters AND four methods (ensure/go/next/prev); weekStore-wrappers.svelte.ts (29 L) holds five getters with the methods kept outside as three free functions. The honest statement: **one facade object costs ~12 lines including its methods; five separate wrappers plus three free functions cost ~12 lines.** No idiom wins the line count; the facade wins on call-site shape (11 `week.*` reads, mechanical).

## Part C receipts
- **C1 tokens:** tokens.css + tokens.ts + Cinzel/Cinzel-Decorative woff2 (41 KB raw) — byte-identical both repos; palette gate 0 hex outside tokens; font gate: `--font-display`/`--font-ui` on every screen. **Fidelity claim STRUCK (Rev 8 erratum E3):** the original "side-by-side verdict: w89 dark+gold+team-color language carried" was false on both counts — w89's SHIPPED default is pale-rose light (`--bg:#fdf2f6`, w89.html:13616/13621) and dark is a `data-theme="dark"` variant (163 references), not the default. Honest statement: **the token layer is an experiment default (dark); it is not w89's shipped palette.** The experiment's beauty gate ("do both arms look alike") is served by the shared token layer; dark-vs-light is an unowned product decision queued behind the Owner's beauty-mode ruling (labelled in tokens.css, not redone).
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
- Durable-proxy fallback (recorded raw so ANY rule can be applied): repair cycles (4 slices, a–d) svelte 10 vs vue 9; adding the Part B week-stepper (svelte 1, vue 2) gives 11 vs 11 — on the full five-slice count the arms TIE EXACTLY, which supports the WASH rather than weakening it (svelte's 7 are TanStack-v9 ecosystem, not language); first-try greens svelte 2 vs vue 0; workarounds svelte 4 vs vue 3 (vs 8-vs-1 in Rev 5); lines **878 vs 883 under the stated reproducible method (erratum 0.8) — the receipted 880 vs 985 was a scope mismatch; see E0a**. → **WASH with a Svelte lean; no cutover warranted; the Rev 5 verdict (Vue narrow 62%) is OVERSET by this sitting's evidence** — row 9 was its only DECIDES row and Part B measured the facade's cost trivial-to-mild.
- **Falsifier:** a second agent with the sealed-recipe handicap (C4) on a store-heavy surface producing repair-cycle pairs that separate ≥2× against Svelte — then the pick flips back to Vue.

## Rev 8 (2026-11-15) — this sitting's receipts (every claim carries its command and exit code)

**Errata applied (0.1–0.13):** all 13 verified then fixed on this tree; full file-by-file list with
old → new in REV-8-ERRATA.md. Highlights: nested `REV-5.1-addendum/CHECKSUMS.txt` regenerated on the
patched tree — **360/360 OK, re-verified 2026-11-16 by `shasum -a 256 -c CHECKSUMS.txt` run from
inside `REV-5.1-addendum/`, exit 0** (was 346 OK / 12 FAILED, the 12 being exactly the Rev 5.1 patch
targets; before-state receipt: `receipts/gate-c2-rev6-fail.txt`. Rev 9 note: run the shasum from
INSIDE the addendum — from the delivery root it exits 1 with 360 bogus failures, because
`shasum -c` resolves the listed paths against the cwd, not the manifest's own directory); the two CLAUDE.md files now covered
by a regenerated root MANIFEST.txt; "3,503" (covering-note figure) corrected in this delivery's note —
the shipped Rev 6 MANIFEST had 3,499 lines, and the new manifest is regenerated over the Rev 8 tree
(see VERIFY.txt for the count); 867→871 in all three prose sites; workarounds 4 vs 3 with
"fewer workarounds" struck; repair-cycle counts scope-labelled (a–d 10 vs 9; five-slice 11 vs 11);
`r51_patch.py` declared UNVERIFIABLE (the Rev 5.1 applier did not ship; citation amended in
REV-5.1-ADDENDUM.md); dead `base.css` (7 hexes) deleted — and `main.css` with it (its only importer,
itself imported by nothing); wrapper variant build-verified (falsification probe: planted invalid
export fails `npm run build` exit 1 naming the file; svelte-check on the same file: 0/0); Vue line
count method stated and re-measured (Rev 6 baseline 878, not 985 — see E0a); facade comparison
restated as a wash; verified-as-of.json re-issued with commands + exit codes + the manifest entry;
**both checkers re-run from a clean extract, receipts cite in-tree relative paths only**
(`REV-5.1-addendum/f1-typecheck-rerun.txt` re-issued); the 3 a11y warnings FIXED (role="button" +
Escape-keydown on the Cards backdrop; tabindex removed from the noninteractive feed lines) —
**svelte-check 0 errors AND 0 warnings** on the shipped addendum arm, `vue-tsc` exit 0 on both vue
arms.

**Part A (the class bridge at store-heavy scale):** 5-row table with commands in
`PART-A-CLASS-BRIDGE.md`. All three new stores 0-diagnostics,
build-green, build-graph-proven by reverted falsification probes; Pinia@11 first-try green (0
repairs); svelte pair 1 repair (shared test-harness typing, not the stores). Ernie's −11 did NOT
reproduce: class 50 L vs Pinia 49 L here (+1 L, ratio 1.020, method labelled). Batteries re-run as
regression insurance after all edits: **24/24 PASS both arms**, screens 871/457/470/125/221/39 —
unchanged.

**Part B:** SEALED-RECIPE.md shipped (sha 7fcc3fc0432e29fae4c0d0d384f813da67cd05a0f591f5bb6746f85458e14f07);
**status OWED — unrun by design** (no second agent in this sandbox; the protocol forbids the author
running it). Falsifier attached in SECOND-AGENT-HANDOFF.md §8: flip = Svelte repairs ≥ 2.0× Vue's AND
Svelte 0 first-try vs Vue ≥ 1; confirm = Svelte repairs strictly < Vue's. Flip Bench extended
(`flip-bench/flip-bench-sealed.mjs`) and run → OPEN (receipt `flip-bench/sealed-run-receipt.json`);
sealed-recipe handicap applied to E1 (PROTOCOL-FOR-A-SECOND-AGENT.md §8).

**Part C:** gate 5 amended (build-green clause, strictest tsconfig named — SLICE-DONE-PROPOSAL.md);
nested-manifest gate `scripts/gate-manifest.mjs` — **on the Rev 6 tree: FAIL** (nested CHECKSUMS 346
OK / 12 MISMATCH; root MANIFEST 2,864 entries absent from the published tree) and **on this Rev 8
tree: PASS** (`receipts/gate-c2-rev6-fail.txt` / `receipts/gate-c2-rev8-pass.txt`); numeral gate
`scripts/gate-numerals.mjs` — on Rev 6: 4 distinct hits (867 ×3 sites, workarounds 4-vs-6;
`receipts/gate-c3-rev6-hits.txt`), on Rev 8: CLEAN (`receipts/gate-c3-rev8-clean.txt`). Note on the
"3,503" flag: that figure lived in the zip's COVERING NOTE (chat-level, not in the tree), so the
numeral gate cannot see it there; the underlying defect is flagged by route C2 (the Rev 6 root
manifest does not describe the published tree) and corrected here.

**Part D:** the E3 interactive devtools session **RAN in BOTH arms** (state inspected, value changed,
UI updated, 0 page errors — receipts `receipts/e3-devtools-{vue,svelte}.json`). The Rev 6 blocker
root-caused: the session script killed npm but not the vite child, so node never exited (the session
looked hung); fixed with a process-group kill in both repos and re-run to clean exits. Extra probe:
all Part A stores + the wrapper variant proven LIVE under the real DEV server through the app entry
(`receipts/e3-part-a-live-{vue,svelte}.json`).

**Part E:** tokens labelled (w89-derived, experiment default, dark — in the file header, both arms
byte-identical); `--tc` justified in place (w89 has 0 occurrences; the per-row inline remap is this
experiment's own mechanism; removal would change rendering); the false C1 fidelity claim struck
(RECEIPT.md Part C C1 — w89's shipped default is pale-rose light; dark is its data-theme variant).

**Part F:** VERDICT-REV-8.md — the restatement: WASH, narrow Svelte lean quoted with NO number; two
of three counted proxies died under re-measurement; the class bridge closes the structural residual;
falsifier attached; flip/confirm delegated to the sealed-recipe bench (owed).


## Rev 9 (2026-11-16) — receipts (every claim carries its command and exit code)

- **Part 0:** nested `shasum -a 256 -c CHECKSUMS.txt` from inside REV-5.1-addendum/ → **360/360 OK, exit 0**; root manifest regenerated over the final tree (count = VERIFY §1, gate PASS); `r51_patch.py --verify-shipped` → **19/19 exit 0**, `--reproduce` → **12/12 byte-identical exit 0 AGAINST THE NAMED REFERENCE: the Rev 6 PUBLISHED addendum (council/glyph `_agents/glyph/deliveries/zai-fresh-start-2026-11-15/REV-5.1-addendum`), pre-patch side = council/inkling 85a54b66 — the SAME command against the SHIPPED addendum prints 11/12, exit 1 BY DESIGN (SLICE-DONE-PROPOSAL.md's deliberate Rev 8 build-green clause; r51-patches.json post_side discloses it)**; C2 gate fix probe → **exit 1** on a prose manifest (receipts/gate-c2-rev9-unparseable-probe.txt) and the fixed gate CAUGHT the live prose manifest on the Rev 8 tree (converted: 359-entry sha-list); repos' gates re-run (vue 11/11 + tc 0 + build 0 + battery 24/24; svelte check 0/0 + build 0 + battery 24/24, counts 871/457/470/125/221/39 unchanged); CI workflows + repo CHECKSUMS added; grep "358/358|658 entries" → zero live CLAIMS (reworded Rev 10 erratum §4 — the correction lines themselves grep; the live-claim count is 0).
- **Part A:** `node scripts/p333-validate.mjs` → **exit 0** (every pinned premise reproduced: 600250/2700/1800/900; 914.5 = 2773.0−1858.5; 98,932/854,227); `node scripts/p333-ladder.mjs` → **exit 0, 12 rows on the real 1,953-player pool**; receipts p333-{validate,ladder-run,keypairs}.txt. Negative result + FB→TE 6→2 quantified (900→700 / 914.5→720.1, +2 flexed). `node scripts/emergency-scale.mjs` → **exit 1** (scale proof; manifestation NOT reproduced, 0/2,028 — premise correction); `--fix` → **exit 0** (derived 1e6); §5 patch proposal shipped (lineup.ts untouched).
- **Part B:** cmp 5 variant files × both repos → **exit 0 ×5** (receipts/cmp-variants-rev9.txt); palette gate → **0 hex outside the token layer, both repos**; 8 screenshots with **identical hashes across repos** (receipts/screens-rev9/screens-sha256.json), fonts inline offline, 0 console errors; CONTRAST-TABLE.md 36 cells, 14 AA findings flagged (dark --text 2.61–3.17 = w89's own live behavior).
- **Part C:** sealed probes `node probes/probe-sealed-week.mjs vue|svelte` → **exit 0 both — 13 checks each, all green (Rev 10 correction: Rev 9's "12/12" was typed, not measured; Rev 9's own receipted JSON lists 13 ok)**; batteries 24/24 both; sealed-recipe-timing.txt (repairs 2 vs 1, first-try 0 vs 0, workarounds 2 vs 1); sealed-run-receipt.json status CLOSED (author-run = data point; Rev 10 moved it out of the evidence — VERDICT-REV-10-ADDENDUM.md); stub smoke `node flip-bench/flip-bench-stub.mjs` → **exit 0, mechanism VERIFIED** (honest OPEN, lying FAIL, 2 ms); Pinia-vs-reactive delta 81 L vs 45 L, reactive arm 1/1 vitest (Rev 10: restated as the 2×2 — STORE-COST-2x2.md).
- **Parts D/E/F:** the file:// call (YES for the built product + the benches; dev-mode = developer convenience) in DELIVERY-NOTE.md; NOTES-week-sb-game.md + REGEN-MANIFEST.md; VERDICT-REV-9.md (WASH stands, no number, no cutover).
