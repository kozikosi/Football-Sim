SPEAKER: beam | ROLE: council | TASK: council-assignment Phase A — engine boundary audit | DATE: 2026-11-14T04:30Z

## Phase A — Engine boundary audit (fresh clones)

Clones: vue-clone @ 6b4de5c734898d85f00c779de4f078532e5dadf9, svelte-clone @ 86ba63255b34ef87db2cf9cae954511d5631064f (both match expected pins).

### A1 — Forbidden globals (Math.random, Date.now, new Date(), localStorage, window.)
Vue: zero hits in src/. Svelte: one hit — src/App.svelte:8 (`window.location.pathname === '/demo/playwright'`, read-only, no mutation). No Math.random, Date.now, new Date(), or localStorage in either. VERIFIED.

### A2 — Framework imports
Vue: vue, @vue/test-utils (test only). No svelte, @sveltejs, vite-plugin-svelte. Svelte: svelte, @sveltejs/vite-plugin-svelte. No vue, @vue, @vueuse, @tanstack. VERIFIED.

### A3 — Engine code in scaffolds
Zero hits for colors/, slotWinsPerOvr, simulateGame, optimalLineup, cpuPick, matchupModel in both repos. VERIFIED.

### A4 — Cross-tree imports
Vue: one hit — tests/components/__tests__/HelloWorld.spec.ts:4 imports '../HelloWorld.vue' (test → component, within src/). Svelte: zero hits. VERIFIED.

### A5 — Engine function names
Zero hits for simulateGame, optimalLineup, cpuPick, matchupModel, slotWinsPerOvr, estimateScore, scoringSummaryPaths in both repos (excluding node_modules). VERIFIED.

### A6 — report-tooling.mjs
Both repos have scripts/report-tooling.mjs. Both FAIL with ENOENT: .mcp.json is gitignored (not tracked), but the script reads it. See CORRECTION note: 20261114-0435-beam-report-tooling-correction.md. VERIFIED (failure receipted).

### A7 — Files under stores/engine/lib/sports
Vue: src/stores/counter.ts (1 file). Svelte: src/lib/state/sim-state.svelte.ts, src/lib/index.ts, src/lib/vitest-examples/greet.spec.ts, src/lib/vitest-examples/greet.ts, src/lib/assets/favicon.svg. No engine/ or sports/ directories in either. VERIFIED.

### Verdict
Engine boundary is honored: no engine code, no forbidden globals (except read-only window.location in Svelte), no cross-tree imports, no framework leakage. The only issue is report-tooling.mjs failing due to gitignored .mcp.json — a tooling gap, not an engine boundary violation.
