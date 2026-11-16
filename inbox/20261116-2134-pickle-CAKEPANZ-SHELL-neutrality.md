SPEAKER: pickle | ROLE: council | TASK: Part 3 — framework neutrality: is any of the shell locked to Svelte, and what does a Vue re-bind actually cost | DATE: 2026-11-16T21:34Z
FOR: R-13 (framework comparison; CAKEPANZ-SHELL round)

**What this unblocks:** the Owner's cutover question. The measurement that matters is not "does it say Svelte in package.json" — it does — but **how many lines stand between this tree and the other framework**. Measured on the latest full shell (s5, `origin/council/inkling:_agents/inkling/deliveries/67-cakepanz-s5`): the framework-coupled surface is **14 `.svelte` files, one 20-line binding module, and one bootstrap line**. Everything else — 744 lines of `src/lib/*.ts` — is framework-free.

**Verdict: NEUTRAL CORE, THIN BINDING — the claim holds, with two specific defects and one portability break.** Neither defect is a framework choice made by accident; both are filing-sized.

## 1. The plain-TypeScript core really is plain (VERIFIED)

Eight non-render modules in `src/lib/`, checked one by one for a framework import:

```
src/lib/abbr.ts                    framework-imports=0
src/lib/bragCard.ts                framework-imports=0
src/lib/draftStore.ts              framework-imports=1     <-- the only one
src/lib/feedVM.ts                  framework-imports=0
src/lib/ink.ts                     framework-imports=0
src/lib/savesApp.ts                framework-imports=0
src/lib/shareVM.ts                 framework-imports=0
src/lib/valuation.ts               framework-imports=0
```

`draftStore.ts` is 20 lines and says so in its own header: *"The engine store (app/store.ts …) wrapped for Svelte 5. The store is framework-free; this file only adapts it to Svelte's readable contract. No engine edits."* That is the pattern the prompt asks for — a named binding over a neutral core — and it is the reason the port bill is small. It is not a violation of the ruling; it is the ruling implemented.

**Defect 1 (proposal, not a breach):** it lives in `src/lib/` beside the neutral modules. The discipline is real but invisible in the path. Moving it to `src/lib/bindings/draftStore.svelte.ts` (or `src/bindings/`) makes "this file is the Svelte door" legible to the next reader and to the Architect.

## 2. No Svelte idiom leaked into data or view-model code (VERIFIED)

```
grep -rn '$state|$derived|$effect|$props|$bindable' src --include='*.ts'   -> (none)
grep -rn 'svelte' src --include='*.ts'                                     -> main.ts (mount, App.svelte), draftStore.ts (readable/writable)
grep -rn '$lib' src                                                        -> (none)
```

The runes are confined to components, which is where they belong:

| Rune | `.svelte` files | hits |
|---|---|---|
| `$state` | 8 | 21 |
| `$derived` | 4 | 7 |
| `$effect` | 2 | 2 |
| `$props` | 12 | 12 |
| `$bindable` | 0 | 0 |
| `$inspect` | 0 | 0 |

14 `.svelte` files total. Other Svelte-only families: `{#each}` in 11, `{#snippet}` **0**, `svelte/transition|animate|motion` imports **0**, `onMount|afterUpdate|tick` in **1** file.

That last row matters for the port bill: with zero snippets, zero transitions and one lifecycle call, a Vue 3 re-bind is a mechanical rewrite of the 14 files — `$state`→`ref`/`reactive`, `$derived`→`computed`, `$props`→`defineProps`, `$effect`→`watchEffect`, `{#each}`→`v-for`, plus `asReadable`→`shallowRef`+subscription. **No component behaviour is expressed in a way that has no Vue equivalent.** Nothing here is "Svelte did it for us and we cannot say how".

## 3. The portability break that is not about the framework (VERIFIED)

```
src/lib/bragCard.ts:155:  const c = document.createElement('canvas');
src/main.ts:5:            const app = mount(App, { target: document.getElementById('app')! });
```

`main.ts` is the bootstrap — expected, and the only place a DOM should appear. `bragCard.ts` is a **shareable renderer that reaches for `document` from a `src/lib` module**. It is framework-neutral and therefore passes every framework test, but it breaks the prompt's own stronger rule — *"every screen renders from a node-side fixture … so CI can render the whole shell without launching the browser"* — and it makes the node-side half of the battery unable to cover the shareables.

**Defect 2 (proposal):** split `bragCard.ts` into a pure formatter (SVG string or a plain data model, no DOM) and a thin `canvas` paint step behind a render interface. Then the share text/layout is node-testable in either framework and only the paint call is platform-coupled. This is the one place where the shell's portability claim is thinner than the neutrality claim.

## 4. The build is Svelte-locked, and that is expected (VERIFIED)

```
dependencies:    svelte ^5.57.3
devDependencies: @sveltejs/vite-plugin-svelte ^6.2.1, typescript ^5.9.3, vite ^7.3.6
```

A Svelte tree builds with a Svelte plugin. The question the Owner set is not "can this tree build without Svelte" (it cannot, by definition) but "is anything *lost* by moving". The answer above is the data: 14 files, one 20-line binding, one bootstrap line — plus the `vite.config.js` plugin swap.

## 5. The coupling that is larger than the framework one (cross-reference)

`grep` finds **65 import statements across 15 app files importing `src/engine/**` directly** (see `20261116-2120-pickle-CAKEPANZ-SHELL-cone-one-door.md`). That coupling is framework-neutral and therefore invisible to a neutrality audit — and it is **4× the size of the whole Svelte surface**. If the round spends its energy on the framework question and not on the engine seam, it will have optimized the smaller number. That is the one thing I would say loudest in this part.

## Labels

VERIFIED: every count and grep above, s5 tree, 2026-11-16, read-only (`git archive` extract). REPORTED: none — no figure here comes from another seat. INFERRED: the Vue re-bind mapping table (standard Vue 3 ↔ Svelte 5 equivalents; not run, because building both arms is the sealed-bench work the Owner closed). UNKNOWN: whether Z.ai's unpublished work since s5 changes the rune counts.

— pickle · 2026-11-16T21:34Z · read-only on Z.ai's tree.
