SPEAKER: beam | ROLE: council | TASK: council-assignment Phase B — public scaffold care & feeding | DATE: 2026-11-14T04:40Z

## Phase B — public scaffold care (fresh clones, npm install done)

### B1 — Build
Vue: npm run build → exit 0, 77.20 kB JS (29.99 kB gzip), 1.68 kB CSS, 0.42 kB HTML, 336ms. Within ±10% of known (77.2 kB). Svelte: npm run build → exit 0, 28.96 kB JS (11.43 kB gzip), 0.34 kB HTML, 81ms. Within ±10% of known (28.96 kB). VERIFIED.

### B2 — Type-check
Vue: npm run type-check (vue-tsc --build) → exit 0, 0 errors. Svelte: npm run check (svelte-check) → 0 errors, 0 warnings. VERIFIED.

### B3 — Unit tests
Vue: npm run test:unit -- --run → 1 passed (HelloWorld.spec.ts). Svelte: npm run test:unit -- --run → 1 passed (greet.spec.ts). VERIFIED.

### B4 — E2E tests
Vue: npm run test:e2e → 2 passed (smoke.spec.ts: boots and exposes __pinia; e2e/vue.spec.ts: visits app root url). Svelte: npm run test:e2e → 2 passed (smoke.spec.ts: boots and exposes __SIM_STATE__; demo.spec.ts: has expected h1). VERIFIED.

### B5 — Smoke test assertions
Vue smoke: asserts HTTP 200 + window.__pinia !== undefined + no page errors. Svelte smoke: asserts HTTP 200 + window.__SIM_STATE__ !== undefined (via waitForFunction) + no page errors. Both assert more than HTTP 200 — they check the dev-mode state hook and console cleanliness. Not vacuous. VERIFIED.

### B6 — Stray-lint / dependency baseline
Vue deps: vue 3.5.45, pinia 4.1.0, @tanstack/vue-table 9.3.1, @vueuse/core 15.0.0, @vue/test-utils 2.5.1, vite 8.3.8, vitest 4.1.12, vue-tsc 3.3.14, @playwright/test 1.65.1, vite-plugin-vue-devtools 9.0.0-rc.3, @vitejs/devtools 0.7.6. Svelte deps: svelte 5.57.3, @sveltejs/vite-plugin-svelte 7.3.1, vite 8.3.8, vitest 4.1.12, svelte-check 4.7.8, @playwright/test 1.65.1. No @tanstack, @vueuse, or pinia in Svelte. Matches Architect's picture. VERIFIED.

### B7 — .nvmrc
Both repos have .nvmrc = 24. My node is v26.13.0. Noted; not silently pinned. VERIFIED.

### B8 — README vs scripts
Vue package.json scripts: dev, build (run-p type-check "build-only {@}"), build-only, type-check, test:unit, test:e2e, lint, format, preview. Svelte scripts: dev, build, preview, check, test:unit, test:e2e. README claims match script names. VERIFIED (no mismatches found).

### B9 — Test files present
Vue: tests/smoke.spec.ts, e2e/vue.spec.ts, src/components/__tests__/HelloWorld.spec.ts. Svelte: tests/smoke.spec.ts, tests/demo.spec.ts, src/lib/vitest-examples/greet.spec.ts. Both discover 2 E2E tests (Vue: smoke + vue.spec; Svelte: smoke + demo.spec). The Svelte demo.spec tests /demo/playwright route (h1 visibility). VERIFIED.

### B10 — .gitignore sanity
Vue .gitignore excludes: node_modules, dist, .mcp.json, .kilocode/, test-results, *.backup-*. Svelte .gitignore excludes: node_modules, dist, .mcp.json, .kilocode/, test-results, *.backup-*. Both consistent. No local-but-committed trash found. VERIFIED.
