# Architect framework recommendation: Vue 3 + Vite vs Svelte 5 + Vite (14 Nov 2026)

Requested by INKLING for the Owner (`claude-resume-2026-11-14.md`). This is a recommendation, not a decision: the Owner's signature decides. Nothing was built or run.

```
RECOMMEND: Vue 3 + Vite
CONFIDENCE: LOW
ONE PARAGRAPH OF REASONING: The engine already owns state (a plain-TS store with string-typed view models), so either framework is a thin subscribe-and-render shell under src/**/ui/, and the neutrality gate keeps it replaceable. That makes the choice a question of who maintains the shell. The product is agent-maintained and owned by a non-specialist, and standalone Svelte 5 + Vite is now the less-travelled path (SvelteKit is out, and Svelte 5 runes are a recent API break that agents and docs still blur with Svelte 4). Vue 3 + Vite is a first-class, stable, heavily documented path, so an agent or a stranger is less likely to produce a subtly wrong shell. Against that: the Vue scaffold ships Pinia, VueUse and TanStack Table, a second state store and a table library the draft board does not need, and they would have to be deleted or the neutral-store law is quietly broken. Svelte's scaffold is leaner and its compile-time model is simpler to read. I do not rank on bundle size or on which scaffold went green first; both are scaffold noise.
IF YOU'RE WRONG: The cost is one rewrite of the ui/ folder behind the same view-model contract; the engine, store, saves and tests do not move.
WHAT WOULD CHANGE YOUR MIND: A BENCH-1 Tier 2 result where Vue's 1,000-row board misses its UX budget with shallowRef discipline applied, or evidence that agents maintain the Svelte 5 shell with fewer defects.
```

## Evidence and its limits

VERIFIED (shallow clones, `git ls-files`, `package.json`, files opened, 14 Nov 2026):
- `football-sim-vue` at `6b4de5c`: dependencies `vue`, `pinia`, `@vueuse/core`, `@tanstack/vue-table`; `src/stores/counter.ts` is the stock Pinia example.
- `football-sim-svelte` at `86ba632`: dependency list is Svelte, vite-plugin-svelte and tooling only; `src/lib/state/sim-state.svelte.ts` is a 9-line `$state` bridge with `ready: true`.
- Neither scaffold mounts the engine, `store.ts` or any view model. Both smoke specs only assert HTTP 200 and that `window.__SIM_STATE__` exists (the Svelte one opened; the Vue one not opened). So no engine-relevant behaviour of either framework has been observed.

REPORTED (by INKLING, not checked by me): both repos green at HEAD; the nine-arm v3 result; the 50/50 split.

INFERRED: that Svelte 5 + Vite is the less-travelled path and that agents err more on runes. UNKNOWN: any measured defect rate, bundle size, or 1,000-row board cost for either framework.

Insufficient evidence is the honest state. I answered because the format asks for a pick; the LOW rating is the real answer.
