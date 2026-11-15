# The two-arm build — the same feed panel in Vue 3 + Vite and Svelte 5 + Vite (§2.5c, R-1)

**Seat:** Z.ai · **Date:** 2026-11-15 · **Ruling honoured:** R-1 — the field is two arms; the other seven stay in the record as measurements, nothing deleted, none re-run.
**The feature, identical in both:** the §2.5 feed panel — drive-level events, newest-first, filter by drive (MY DRIVES), keyboard reachable, user's team in blue (§1.3 law — the chip rides the blue ink; the `cp-me` glow keeps marking the drives), every turnover named (INT/FUM chips + DEF TD + LEAD Δ + conversions — the w88 badge format). **Same chrome** (`feed.css`, identical bytes): the w88 anatomy, the badge format, the beat-in with the reduced-motion off-switch.
**The engine is the variable that isn't:** both arms vendor the same 52-file pin snapshot (`src/engine`, `diff -rq` clean across arms), the same view-model (`feedVM/abbr/ink/bootData.ts`, identical bytes), the same fixture (`fixture/week1-picks.json` — draft seed 1000, user Chicago Bears, minted node-side by `two-arm-fixture.mjs` BEFORE either arm was built), the same look. The framework is the only variable — which is the point.

**The fixture (the heaviest view, chosen before either arm was built):** Minnesota Vikings @ Chicago Bears — final **21-11**, **20 drives, 6 scoring drives, 3 turnovers** (all named as chips), 10 user drives, 1 lead change. Worst case for 390 px: real team names, real summary sentences, a three-score-plus game.

## The scores — the six criteria, measured, not argued

| Criterion | Vue 3 + Vite | Svelte 5 + Vite | Verdict |
|---|---|---|---|
| **Offline** (file://, network blocked, 0 blocked requests / 0 console errors) | 0 blocked · **0 errors** | 0 blocked · **0 errors** | **tie** (both use the same `--allow-file-access-from-files` convention as the app tree's probe — the vanilla file:// `crossorigin` caveat is a vite-level finding, filed for the Architect, identical for both arms) |
| **Cold load** to first paint at **6× CPU throttle** (median of 5 trials; 3 sessions run) | FCP 1088–1216 ms · feed mounted 1120–1292 ms | FCP 1104–1232 ms · feed mounted 1174–1284 ms | **tie** — run-to-run noise (±100 ms) exceeds the gap; the boot is dominated by the SHARED engine work (buildPool + the 1,024-pick restore + simulateGame — identical bytes in both bundles) |
| **Bundle** (dist js+css, raw / gzip-9) | **344,053 B / 105,756 B** | **315,797 B / 94,197 B** | **Svelte by 28.3 KB raw / 11.6 KB gz (−11%)** — the fixture JSON + engine dominate both; the delta is the framework runtime (Vue's renderer vs Svelte's compiled output) |
| **390 px** (no horizontal scroll on the heaviest view) | scrollWidth **390 = viewport**, doc 390 | scrollWidth **390 = viewport**, doc 390 | **tie** — both clean; screenshots `shots/twoarm-{vue,svelte}-390.png` |
| **Type check** (each framework's own checker, strict) | **vue-tsc --noEmit: PASS** (strict; the vendored engine's style flags exempted by dropping the two noUnused\* lint flags — not mine to lint) | **svelte-check: PASS** (same tsconfig policy) | **tie** |
| **Maintainability proxy** (lines of framework-owned app code to render the same view: entry + root + panel) | **99 lines (88 non-blank)** | **103 lines (94 non-blank)** | **tie** (±5%; the two templates map 1:1 — `v-for`/`v-if` ↔ `{#each}`/`{#if}`) |

**Receipts:** `receipts/two-arm-measure.txt` (the full probe JSON + the six-line verdict), `receipts/two-arm-coldload.txt` (5 trials per arm), `receipts/two-arm-bundles.txt` (per-file + totals), `receipts/two-arm-typecheck.txt`, `receipts/two-arm-lines.txt`, `shots/twoarm-{vue,svelte}-390.png`. Protocols in `two-arm-measure.mjs` / `two-arm-coldload.mjs` — one script, one process, both arms, run three times.

**Live DOM semantics, identical (asserted, not assumed):** both arms render 20 lines · 10 me · MY DRIVES filter → 10 · NEWEST FIRST flip → first clock `Q4 04·27` — the same fixture through two frameworks produces the same DOM, which is what "same feature, same chrome" means operationally.

## 1 · The preference, with reasons

**Svelte 5, narrowly — and the narrowness is itself the finding.** Three reasons: (1) the only criterion that separated the arms is the bundle, and it separates TOWARD Svelte (−11.6 KB gz): Svelte compiles the view instead of shipping a renderer, which is the right shape for a product whose low-end receipts (the w77/w89 boots) are a standing concern; (2) the runes model (`$state`/`$derived`/`$props`) carried the whole panel with no store library — the engine tree's plain-JSON-in/plain-JSON-out view-model rule maps onto it one-to-one, and the component I wrote reads denser than its Vue twin at the same fidelity; (3) it is what the reviewed Cakepanz tree already builds in — slices 1–4 are Svelte 5, so staying costs nothing in re-learning and keeps ONE idiom across the tree. The honest counterweights, named: Vue's tooling breadth is real (`vue-tsc` was the smoother checker; devtools, Router, Pinia are mature) — if the product grows past four slices of screens, that could outweigh 11 KB; and the maintainability proxy says the two templates cost the same to write and will cost the same to read.

## 2 · What measurement would change my mind (the falsifier — a preference without one is an opinion)

1. **A full four-slice port measured, not this one panel:** if Vue's composables + devtools show a lines-per-feature slope >15% better than Svelte's across the board + team-select + saves + feed (the real Cakepanz surface), the maintainability edge flips and the bundle's 11 KB becomes noise — I'd switch to Vue. (This panel is one screen; the proxy's tie at one screen does not predict four.)
2. **The bundle gap measured as irrelevant:** if a real low-end profile (the w89 390/low-end boot protocol, not desktop 6× throttle) shows Vue within 50 ms of Svelte to interactive, the one separating criterion dissolves into the noise floor it already sits near — my preference then rests on tooling, where Vue wins, so I'd switch to Vue.
3. **The gap measured as fragile:** if Vue ships a tree-shaken build (vapor mode / composition-only) closing the gzip gap to <5 KB, criterion 3 becomes a tie, all six tie, and the honest verdict is the one R-1 already anticipated: **it costs nothing, because the engine is behind the `ValueProvider` seam and the framework is a view choice that can be swapped.**

**The measurement decides, not the seat.** The scores above are the input; the Owner rules. If the arms tie on every criterion after the falsifiers run, the swap-cheapness makes the tie free — which is exactly why the engine was pinned behind a seam in the first place.

## What not to conclude

- The bundle numbers contain the ENGINE + fixture (identical bytes in both) — the framework delta is the DIFFERENCE (−28.3 KB raw / −11.6 KB gz), not the totals. Nobody should read 315 KB as "Svelte's cost"; most of it is the pin snapshot doing the work.
- The cold-load tie is a result, not a failure of measurement: three sessions, 5 trials each, the gap flips sign between sessions — at this protocol the frameworks are not separable on boot time, because the boot is the engine's.
- The seven retired arms were not re-run (R-1). Their measurements stay in the record.
