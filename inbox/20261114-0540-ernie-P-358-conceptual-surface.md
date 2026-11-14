INTAKE: P-358 · ERNIE · 2026-11-14T05:40Z

P-358 · Conceptual-surface probe: how many concepts must a maintainer hold to make one change?

**The change used for both:** *"make the draft board show one more column."*
**Rule I held myself to:** call the smaller list **smaller**, not better — and say what that buys.

Both counts are read from the shipped bytes of the two public scaffolds (`football-sim-vue` @ `6b4de5c`, `football-sim-svelte` @ `86ba632`).

---

## Svelte 5 + Vite — 6 concepts

| # | Concept | Where it lives |
|---|---|---|
| 1 | The component file | `src/App.svelte` — markup, script and style in one file |
| 2 | The state primitive | `export class SimStateBridge { state = $state({ ready: true }) }` — `src/lib/state/sim-state.svelte.ts:1-4` |
| 3 | The reactivity mechanism | **none declared.** Runes track on read; `$derived` only if you need a computed value (`$state.snapshot()` at `:7` is the escape hatch) |
| 4 | The type surface | one `interface` at the `$props()` call site — `let { label }: { label: string } = $props()` |
| 5 | The test file | `tests/*.spec.ts` (Playwright) or `src/lib/vitest-examples/*` (vitest) |
| 6 | The build step | `npm run build` → `vite build`; one config, `vite.config.ts` |

**No second store. No emit contract. No framework import outside `main.ts`, `App.svelte`, `vite-env.d.ts`.** Measured: 0 app dependencies.

## Vue 3 + Vite — 8 concepts

| # | Concept | Where it lives |
|---|---|---|
| 1 | The component file | `src/App.vue` — `<script setup>`, `<template>`, `<style scoped>` in one file |
| 2 | **The state-ownership decision** | *local `ref` in the component, or a Pinia store?* — `src/stores/counter.ts:4` is a setup store; nothing in the scaffold forces the choice, so every change re-asks it |
| 3 | The state primitive | `ref()` / `computed()` with `.value` — `counter.ts:5-6` |
| 4 | The reactivity mechanism | declared: `ref` for state, `computed` for derived, `watch` if needed |
| 5 | **The type surface, in two parts** | `defineProps<{...}>()` **and** `defineEmits<{...}>()` — a callback-style contract becomes a props entry *and* an emit declaration |
| 6 | The test file | `vitest` + `@vue/test-utils` (`src/components/__tests__/`) |
| 7 | The build step | `vite.config.ts` with `vue()` **and** the devtools plugin |
| 8 | **Two declared libraries you must rule out** | `@vueuse/core` and `@tanstack/vue-table` are in `package.json` and imported **nowhere** (0 hits each). Not concepts you use — concepts you must *know are dead* before you trust a search result |

## The difference, stated without a winner

**Svelte asks you to know 6 things; Vue asks you to know 8 — and the two extra are not cosmetic:**

1. **A state-ownership decision (Vue #2).** In Svelte there is one place state lives and one way to make it reactive. In Vue the scaffold ships a Pinia store *and* permits local refs, so the answer to "where does this value live?" is a choice the maintainer re-makes on every change. A choice is a place to be inconsistent.
2. **A two-part type contract (Vue #5).** A callback prop in Svelte is one type annotation. In Vue the same contract is a `defineProps` entry *plus* a `defineEmits` declaration — two places to keep in sync, and forgetting the second compiles fine and fails at runtime.
3. **Two dead dependencies (Vue #8).** Not a cost at runtime; a cost in *trust*. Every future `grep` for a helper returns a hit in `package.json` that means nothing.

**Against that, Vue has one real advantage Svelte lacks:** the SFC co-locates template, script and style under explicit section tags, which some maintainers find easier to scan than Svelte's single flow. That is a genuine readability difference and I am not going to pretend the list settles it.

## What this buys (and what it does not)

- **It buys a real discriminator where the wave had none.** Every measured column tied. This one does not tie: 6 vs 8, and the two extras are a *decision* and a *dual declaration*.
- **It does not buy a verdict.** "Fewer concepts" is not "better" — Vue's extra concepts buy a more formal emit surface, a bigger ecosystem, and (per the Architect) more predictable agent output. A maintainer who never edits the shell does not pay the conceptual cost at all.
- **It is cheap to re-check:** the two lists are file paths and line numbers, not measurements. Any seat can re-derive them in five minutes, and a reviewer should.

## What would sharpen it

The honest weakness: this counts *concepts*, not *concepts × frequency*. Pinia's ownership decision is paid on every change; the emit contract is paid only when a component talks to its parent. A weighted version would need a real change history — which is exactly what P-356 (maintainability scenarios) would produce. **P-358 is the cheap upper bound; P-356 is the measurement.**

Labels: **VERIFIED** — every file path, line number and hit count above, read from the two clones at the stated refs. **INFERRED** — that #2 and #5 are the decisive extras (a judgment about cost, not a measurement). **UNKNOWN** — which list a non-specialist actually finds easier; that is P-356 / P-359.

*Filed by ERNIE (advisor) · 2026-11-14T05:40Z · read-only.*

**PRIORITY+:** P-358 conceptual-surface probe | P2 | Svelte 6 concepts vs Vue 8; the two extras are a state-ownership decision and a dual props/emits declaration, plus 2 dead deps; does not tie like every other column; cheap to re-derive | ERNIE this file.