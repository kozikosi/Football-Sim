SPEAKER: pickle | ROLE: Council Adviser | TASK: re-run the DS tools-eval byte benchmark with Vue Vapor mode, informational only | DATE: 2026-11-19 21:13 UTC
FOR: R-13

## Scope

Owner asked (19 Nov) to run the earlier byte benchmark "using vue's vapor mode." This is an informational measurement. R-13 is CLOSED — Svelte 5 + Vite 8 is the Owner's final ruling (verbatim note `2026-11-19-framework-svelte5-vite8-verbatim.txt`). Nothing here reopens it and no product file, `src/`, pin or governance file was touched. All work is in a temp sandbox under `/private/var/folders/.../opencode/vapor-bench`, not in the repo.

## Same test, exact reproduction

Feature and method are DS's (`origin/council/ds:_agents/ds/deliveries/tools-eval-2026-11-19`): same 32-row stats table, Season/Playoff tabs, text filter, sortable columns, one expandable row, inline SVG sparkline. App sources extracted from DS's ref. Build `npx vite build`, then `gzip -9 -c dist/assets/*.js | wc -c` and raw `wc -c`. Machine this session: macOS, Node v26.13.0, npm 11.20.0, Vite 8.3.8 (Rolldown), plugin-vue 6.0.11, TypeScript 5.9.3.

**Anchors reproduced exactly:** `sv-base` raw 40,016 B / gz9 **15,493 B** (my earlier number, exact); `vu-base` on Vue 3.5.45 raw 67,790 B / gz9 **26,335 B** (my earlier number, exact). So the comparison is like-for-like with the earlier run.

## Results (gzip -9 on JS bundle)

| arm | Vue | mode | raw JS B | gz9 B |
|---|---|---|---|---|
| sv-base | — | Svelte 5.58, hand-rolled | 40,016 | **15,493** |
| vu-base | 3.5.45 | VDOM (`createApp`) | 67,790 | **26,335** |
| vu-base control | 3.6.0-rc.15 | VDOM (`createApp`) | 71,684 | **27,673** |
| **vapor** | 3.6.0-rc.15 | `<script setup vapor>` + `createVaporApp` | 64,373 | **24,125** |
| vapor-force | 3.6.0-rc.15 | plugin `features.vapor` on plain `createApp` App.vue | 90,245 | 34,151 |

CSS gz was 256 B for every Vue arm (288 B for Svelte) — no material difference.

## Findings (VERIFIED this session)

1. **Vapor is real and works.** The `vapor36` bundle carries `createVaporApp`/`__vapor` and has **zero** `createApp`/`createVNode`/`createElementVNode` markers — the VDOM runtime is genuinely excluded. A headless browser render showed all 32 rows sorted by Rating; typing "Player 7" filtered to 1 row; clicking Playoff stats switched the tab; clicking Yards re-sorted. No console errors. This is a functioning app, not a compile-only artefact.
2. **Vapor saves bytes, but not enough to change the decision.** Vapor 24,125 B gz vs the 3.5 VDOM baseline 26,335 B = **−2,210 B (−8.4%)**; vs the same-version 3.6 VDOM control 27,673 B = **−3,548 B (−12.8%)**. Against Svelte it is still **+8,632 B (+55.7%)** — Svelte is 64.2% of Vapor's size. The framework tax shrinks from +70% to +55.7%; it does not disappear. On a single offline HTML file that remaining gap is still the Owner's download and the cheap phone's parse cost.
3. **Vapor needs Vue 3.6, which is a release candidate.** Latest rc is 3.6.0-rc.15 (npm dist-tag `rc`); `latest` is still 3.5.45. Vapor with Vue 3.5 does not build (verified: `vapor35` build exit 1). Vapor is opt-in, `<script setup>`-only (no Options API), and Vue's own guidance calls it unstable/maturing — a risk the decided Svelte path does not carry.
4. **The naive plugin-level "force vapor" is a trap.** Setting `vue({ features: { vapor: true } })` while keeping `createApp` produced 34,151 B gz — **41.6% larger** than the proper per-component opt-in, and larger even than the VDOM control. The win requires `<script setup vapor>` on the component *and* `createVaporApp` at the entry. This is worth recording so nobody cites the forced build as "Vapor's size."
5. **One-feature caveat (INFERRED, carried forward from the earlier filing).** This is a single-table app; the fixed runtime share dominates. DS and I both flagged that the measured scale is the only measured scale. It does not change the conclusion here because the gap persists at that scale.

## Bottom line

The earlier Svelte-vs-Vue byte result holds under Vapor: Vapor narrows the gap materially (−8.4% vs shipped Vue) but Svelte remains ~36% smaller than the best Vapor build. Combined with Vapor's rc/unstable status, this reinforces the Owner's final Svelte 5 + Vite 8 decision rather than disturbing it. R-13 stays closed.
