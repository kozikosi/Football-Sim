SPEAKER: glyph | ROLE: seat | TASK: public-scaffold-care (council-assignment B) | DATE: 2026-11-14T04:21Z

# Public Scaffold Care & Feeding (Inkling Assignment B)

Environment (VERIFIED): Node `v26.13.0`, npm `11.20.0`, darwin arm64, scratch `/tmp/kilo-glyph-fw-20261114-0421`, fresh depth-1 clones of `kozikosi/football-sim-vue@6b4de5c` and `kozikosi/football-sim-svelte@86ba632`.
`npm ci --no-audit --no-fund` run in both before checks (VERIFIED): vue exit 0 (222 pkgs, ~2.5s), svelte exit 0 (78 pkgs, ~2.1s).

## B1. `npm run build` (fresh clones)
**Vue** (exit 0, VERIFIED): wall clock `real ~2.42s` for `npm run build` (type-check+vite), Vite step `✓ built in 394ms`.
```

> football-sim-vue@0.0.0 build
> run-p type-check "build-only {@}" --


> football-sim-vue@0.0.0 type-check
> vue-tsc --build


> football-sim-vue@0.0.0 build-only
> vite build

vite v8.3.8 building client environment for production...
transforming...
✓ 34 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                  0.42 kB │ gzip:  0.28 kB
dist/assets/index-D3VPUIcM.css   1.68 kB │ gzip:  0.57 kB
dist/assets/index-Dv16q5dL.js   77.20 kB │ gzip: 29.99 kB

✓ built in 394ms
npm run build  3.02s user 0.44s system 142% cpu 2.423 total
```
Sizes/gzip: `index.html 0.42 kB │ gzip 0.28 kB`, `index-D3VPUIcM.css 1.68 kB │ gzip 0.57 kB`, `index-Dv16q5dL.js 77.20 kB │ gzip 29.99 kB`. Drift vs known (JS ≈ 77.2 kB, CSS not specified): JS 77.20 kB = 0.00% drift from 77.2 kB (within ±10%). VERIFIED.

**Svelte** (exit 0, VERIFIED): wall clock `real ~2.35s`, Vite step `✓ built in 162ms`.
```

> football-sim-svelte@0.0.1 build
> vite build

vite v8.3.8 building client environment for production...
transforming...
✓ 111 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                 0.34 kB │ gzip:  0.25 kB
dist/assets/index-BCb0bxgV.js  28.96 kB │ gzip: 11.43 kB

✓ built in 162ms
npm run build  0.50s user 0.27s system 32% cpu 2.348 total
```
Sizes/gzip: `index.html 0.34 kB │ gzip 0.25 kB`, `index-BCb0bxgV.js 28.96 kB │ gzip 11.43 kB`. Drift vs known JS ≈ 28.96 kB = 0.00% (within ±10%). VERIFIED.

## B2. Type/check
**Vue `npm run type-check`** (exit 0, VERIFIED, `vue-tsc --build`, real ~1.58s): 0 errors/warnings reported.
```

> football-sim-vue@0.0.0 type-check
> vue-tsc --build

npm run type-check  2.45s user 0.28s system 172% cpu 1.579 total
```
**Svelte `npm run check`** (exit 0, VERIFIED, `svelte-check --tsconfig ./tsconfig.json`, real ~1.47s): `svelte-check found 0 errors and 0 warnings`.
```

> football-sim-svelte@0.0.1 check
> svelte-check --tsconfig ./tsconfig.json

Loading svelte-check in workspace: /private/tmp/kilo-glyph-fw-20261114-0421/svelte
Getting Svelte diagnostics...

svelte-check found 0 errors and 0 warnings
npm run check  1.51s user 0.20s system 116% cpu 1.471 total
```

## B3. `npm run test:unit -- --run`
**Vue** (exit 0, VERIFIED, Vitest v4.1.12): `Test Files 1 passed (1)`, `Tests 1 passed (1)` (706ms).
```

> football-sim-vue@0.0.0 test:unit
> vitest --run


 RUN  v4.1.12 /private/tmp/kilo-glyph-fw-20261114-0421/vue


 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  18:27:00
   Duration  706ms (transform 32ms, setup 0ms, import 62ms, tests 8ms, environment 500ms)

npm run test:unit -- --run  0.98s user 0.23s system 66% cpu 1.840 total
```
**Svelte** (exit 0, VERIFIED, Vitest v4.1.12): `Test Files 1 passed (1)`, `Tests 1 passed (1)` (118ms).
```

> football-sim-svelte@0.0.1 test:unit
> vitest --run


 RUN  v4.1.12 /private/tmp/kilo-glyph-fw-20261114-0421/svelte


 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  18:27:00
   Duration  118ms (transform 12ms, setup 0ms, import 19ms, tests 2ms, environment 0ms)

npm run test:unit -- --run  0.38s user 0.10s system 50% cpu 0.946 total
```

## B4. `npm run test:e2e`
**Vue** (exit 0, VERIFIED, Playwright 1.65.1, 2 workers, 2 passed 2.2s): `e2e/vue.spec.ts:5:1 › visits the app root url (529ms)` and `tests/smoke.spec.ts:3:1 › smoke: app boots and exposes __pinia (538ms)`.
```

> football-sim-vue@0.0.0 test:e2e
> playwright test


Running 2 tests using 2 workers

  ✓  1 e2e/vue.spec.ts:5:1 › visits the app root url (529ms)
  ✓  2 tests/smoke.spec.ts:3:1 › smoke: app boots and exposes __pinia (538ms)

  2 passed (2.2s)
npm run test:e2e  1.93s user 0.75s system 82% cpu 3.245 total
```
**Svelte** (exit 0, VERIFIED, Playwright 1.65.1, 2 workers, 2 passed 2.6s): `tests/smoke.spec.ts:3:1 › smoke: app boots and exposes __SIM_STATE__ (145ms)` and `tests/demo.spec.ts:3:1 › has expected h1 (144ms)`.
```

> football-sim-svelte@0.0.1 test:e2e
> playwright test


Running 2 tests using 2 workers

  ✓  2 tests/smoke.spec.ts:3:1 › smoke: app boots and exposes __SIM_STATE__ (145ms)
  ✓  1 tests/demo.spec.ts:3:1 › has expected h1 (144ms)

  2 passed (2.6s)
npm run test:e2e  1.72s user 0.51s system 65% cpu 3.377 total
```

## B5. `npm run smoke` (console errors / hook)
**Vue** (exit 1, VERIFIED): fails at `node scripts/report-tooling.mjs` with ENOENT `/private/tmp/.../vue/.mcp.json` before Playwright smoke test runs; therefore console-error observation from smoke Playwright step is **not produced** in this run. Hook asserted by `tests/smoke.spec.ts` is `window.__pinia` (see B6).
```

> football-sim-vue@0.0.0 smoke
> node scripts/report-tooling.mjs && playwright test tests/smoke.spec.ts


=== TOOLING RECEIPT ===
Node: v26.13.0
vite: 8.3.8
vue: 3.5.45
typescript: 6.0.3
vitest: 4.1.12
@playwright/test: 1.65.1
playwright: 1.65.1
playwright-core: 1.65.1
node:fs:624
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^

Error: ENOENT: no such file or directory, open '/private/tmp/kilo-glyph-fw-20261114-0421/vue/.mcp.json'
    at Object.readFileSync (node:fs:624:20)
    at readJson (file:///private/tmp/kilo-glyph-fw-20261114-0421/vue/scripts/report-tooling.mjs:7:24)
    at file:///private/tmp/kilo-glyph-fw-20261114-0421/vue/scripts/report-tooling.mjs:48:17
    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)
    at async node:internal/modules/esm/loader:650:26
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/private/tmp/kilo-glyph-fw-20261114-0421/vue/.mcp.json'
}

Node.js v26.13.0
npm run smoke  0.11s user 0.05s system 63% cpu 0.239 total
```
**Svelte** (exit 1, VERIFIED): fails at `node scripts/report-tooling.mjs` with ENOENT `.mcp.json` before Playwright smoke test runs. Hook asserted by `tests/smoke.spec.ts` is `window.__SIM_STATE__` (see B6).
```

> football-sim-svelte@0.0.1 smoke
> node scripts/report-tooling.mjs && playwright test tests/smoke.spec.ts


=== TOOLING RECEIPT ===
Node: v26.13.0
vite: 8.3.8
svelte: 5.57.3
typescript: 6.0.3
vitest: 4.1.12
@playwright/test: 1.65.1
playwright: 1.65.1
playwright-core: 1.65.1
node:fs:624
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^

Error: ENOENT: no such file or directory, open '/private/tmp/kilo-glyph-fw-20261114-0421/svelte/.mcp.json'
    at Object.readFileSync (node:fs:624:20)
    at readJson (file:///private/tmp/kilo-glyph-fw-20261114-0421/svelte/scripts/report-tooling.mjs:7:24)
    at file:///private/tmp/kilo-glyph-fw-20261114-0421/svelte/scripts/report-tooling.mjs:48:17
    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)
    at async node:internal/modules/esm/loader:650:26
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/private/tmp/kilo-glyph-fw-20261114-0421/svelte/.mcp.json'
}

Node.js v26.13.0
npm run smoke  0.11s user 0.04s system 63% cpu 0.235 total
```
**B5 note:** standalone `npm run test:e2e` (B4) executed smoke specs successfully with 0 page errors asserted (`errors` collected and expected `[]`), so smoke-test logic itself passed when run directly; `npm run smoke` script is blocked by report-tooling pre-step. VERIFIED/INFERRED from B4+B5.

## B6. `tests/smoke.spec.ts` assertions (vacuous check)
**Vue** (`tests/smoke.spec.ts`, VERIFIED): collects `pageerror`s; asserts `res?.status() === 200`; asserts `typeof (window as any).__pinia !== 'undefined'` is true; asserts `errors` equals `[]`. Not vacuous (checks HTTP 200, concrete hook presence, and zero page errors).
```ts
import { test, expect } from '@playwright/test';

test('smoke: app boots and exposes __pinia', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));

  const res = await page.goto('http://localhost:5173');
  expect(res?.status()).toBe(200);

  const hasHook = await page.evaluate(() => typeof (window as any).__pinia !== 'undefined');
  expect(hasHook).toBe(true);
  expect(errors).toEqual([]);
});
```
**Svelte** (`tests/smoke.spec.ts`, VERIFIED): collects `pageerror`s; asserts `status 200`; waits for `window.__SIM_STATE__` to become defined (`waitForFunction`); asserts `errors` equals `[]`. Not vacuous.
```ts
import { test, expect } from '@playwright/test';

test('smoke: app boots and exposes __SIM_STATE__', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));

  const res = await page.goto('http://localhost:5174');
  expect(res?.status()).toBe(200);

  await page.waitForFunction(() => typeof (window as any).__SIM_STATE__ !== 'undefined');
  expect(errors).toEqual([]);
});
```
Other e2e/demo: Vue `e2e/vue.spec.ts` asserts `h1` text `You did it!`; Svelte `tests/demo.spec.ts` asserts `h1` visible on `/demo/playwright`. VERIFIED.
```ts
import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('You did it!')
})
```
```ts
import { expect, test } from '@playwright/test';

test('has expected h1', async ({ page }) => {
	await page.goto('/demo/playwright');
	await expect(page.locator('h1')).toBeVisible();
});
```

## B7. Dependency/tooling reconciliation
**Vue package.json deps/devDeps (VERIFIED):** deps `@tanstack/vue-table ^9.3.1`, `@vueuse/core ^15.0.0`, `pinia ^4.1.0`, `vue ^3.5.42`; devDeps include `@playwright/test 1.65.1`, `@vitejs/plugin-vue`, `@vue/test-utils`, `typescript ~6.0.0`, `vite ^8.3.8`, `vite-plugin-vue-devtools`, `vitest ^4.1.11`, `vue-tsc`. Matches expected Vue stack shape stated in assignment (vue, pinia, @vueuse/core, @tanstack/vue-table present). No `@sveltejs/vite-plugin-svelte` dep.
```json
{
  "name": "football-sim-vue",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "test:unit": "vitest",
    "test:e2e": "playwright test",
    "build-only": "vite build",
    "type-check": "vue-tsc --build",
    "smoke": "node scripts/report-tooling.mjs && playwright test tests/smoke.spec.ts",
    "test": "npm run type-check && npm run test:unit -- --run && npm run test:e2e"
  },
  "dependencies": {
    "@tanstack/vue-table": "^9.3.1",
    "@vueuse/core": "^15.0.0",
    "pinia": "^4.1.0",
    "vue": "^3.5.42"
  },
  "devDependencies": {
    "@playwright/test": "1.65.1",
    "@tsconfig/node24": "^24.0.5",
    "@types/jsdom": "^30.0.0",
    "@types/node": "^24.13.4",
    "@vitejs/devtools": "^0.7.6",
    "@vitejs/plugin-vue": "^6.0.8",
    "@vue/test-utils": "^2.5.0",
    "@vue/tsconfig": "^0.9.1",
    "jsdom": "^30.0.1",
    "npm-run-all2": "^9.0.3",
    "typescript": "~6.0.0",
    "vite": "^8.3.8",
    "vite-plugin-vue-devtools": "^9.0.0-rc.3",
    "vitest": "^4.1.11",
    "vue-tsc": "^3.3.14"
  },
  "engines": {
    "node": "^22.18.0 || >=24.12.0"
  }
}
```
**Svelte package.json (VERIFIED):** devDeps `@playwright/test 1.65.1`, `@sveltejs/vite-plugin-svelte ^7.2.0`, `svelte ^5.57.2`, `svelte-check ^4.6.0`, `typescript ^6.0.3`, `vite ^8.3.0`, `vitest ^4.1.8`; no runtime deps block shown. Matches expected Svelte dev deps (includes vite plugin as normal for Svelte+Vite).
```json
{
  "name": "football-sim-svelte",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "imports": {
    "#lib": "./src/lib/index.js",
    "#lib/*": "./src/lib/*"
  },
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch",
    "test:unit": "vitest",
    "test": "npm run check && npm run test:unit -- --run && npm run test:e2e",
    "test:e2e": "playwright test",
    "smoke": "node scripts/report-tooling.mjs && playwright test tests/smoke.spec.ts"
  },
  "devDependencies": {
    "@playwright/test": "1.65.1",
    "@sveltejs/vite-plugin-svelte": "^7.2.0",
    "svelte": "^5.57.2",
    "svelte-check": "^4.6.0",
    "typescript": "^6.0.3",
    "vite": "^8.3.0",
    "vitest": "^4.1.8"
  }
}
```
**Note:** `vite-plugin-svelte` is present in Svelte (expected) — assignment text asks to verify this honestly; recorded. VERIFIED.

## B8. `.nvmrc` vs runtime Node
Both `.nvmrc` = `24` (VERIFIED: `cat .nvmrc` -> `24`). Actual Node used: `v26.13.0` (VERIFIED). Mismatch noted; not silently pinned/changed.

## B9. README claims vs actual scripts
**Vue README (VERIFIED):** states stack (Vue 3, Vite 8, TS, Pinia, Vitest, Playwright), requirements `^22.18.0 || >=24.12.0`, setup `npm install && npm run dev`. README is brief and does not enumerate all scripts; actual scripts include `build`, `test:unit`, `test:e2e`, `type-check`, `smoke`, `test` (all present). No explicit misleading command claims found in shown README; it omits test/build command examples (minor incompleteness, not a false claim).
```
# Football Sim — Vue 3 + Vite

A standalone Vue 3 + Vite scaffold for evaluating the Vue ecosystem as a potential foundation for Football Sim.

## Stack
- Vue 3
- Vite 8
- TypeScript
- Pinia
- Vitest
- Playwright

## Requirements
Node.js `^22.18.0 || >=24.12.0`.

## Setup
```sh
npm install
npm run dev
```
**Svelte README (VERIFIED):** states stack (Svelte 5, Vite 8, TS, Vitest, Playwright), requirements `.nvmrc`, setup `npm install`, then `npm run dev`, verification commands `npm run check`, `npm run test:unit -- --run`, `npm run test:e2e`, `npm run build` — all exist and ran as described (except build/check/unit/e2e worked; no mismatch). States 'Svelte 5 with Vite directly. It does not use SvelteKit.' consistent with deps/config. No misleading claims found.
```
# Football Sim — Svelte 5 + Vite

A standalone Svelte 5 + Vite scaffold for evaluating the Svelte ecosystem as a potential foundation for Football Sim.

## Stack

- Svelte 5
- Vite 8
- TypeScript
- Vitest
- Playwright

## Requirements

Use the Node.js version specified in `.nvmrc`.

## Setup

Run `npm install`, then `npm run dev`.

## Verification

Run these commands:

- `npm run check`
- `npm run test:unit -- --run`
- `npm run test:e2e`
- `npm run build`

## Purpose

This repository is one half of a framework comparison. Its counterpart is the Vue 3 + Vite scaffold. The two repositories let reviewers examine framework architecture, tooling, testing, and developer experience independently.

This is an evaluation scaffold, not the completed Football Sim application.

This project uses Svelte 5 with Vite directly. It does not use SvelteKit.
```
**B9 result:** No README-vs-script mismatches requiring correction found; Vue README omits verification commands but does not misstate them. VERIFIED.

## B10. `scripts/report-tooling.mjs` behavior / configs
`report-tooling.mjs` in both reads `.mcp.json` and `.kilocode/mcp.json` unconditionally and compares parity (VERIFIED by source). In fresh clones these files are absent (gitignored, not tracked) so script exits 1 after printing installed versions. This is a reproducibility/tooling receipt gap for fresh clones (see A6/B5). No repo patch made.
```js
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value).sort().map(key => [key, stable(value[key])])
    );
  }
  return value;
}

function installedVersion(name) {
  const file = path.join(root, 'node_modules', ...name.split('/'), 'package.json');
  if (!fs.existsSync(file)) return 'not installed';
  return JSON.parse(fs.readFileSync(file, 'utf8')).version;
}

console.log('\n=== TOOLING RECEIPT ===');
console.log('Node:', process.version);

const packages = [
  'vite',
  'svelte',
  '@sveltejs/kit',
  'vue',
  'typescript',
  'vitest',
  '@playwright/test',
  'playwright',
  'playwright-core'
];

for (const name of packages) {
  const version = installedVersion(name);
  if (version !== 'not installed') {
    console.log(name + ': ' + version);
  }
}

const primary = readJson('.mcp.json');
const secondary = readJson('.kilocode/mcp.json');

const primaryServers = primary.mcpServers || {};
const secondaryServers = secondary.mcpServers || {};

const match =
  JSON.stringify(stable(primaryServers)) ===
  JSON.stringify(stable(secondaryServers));

console.log('\n=== MCP CONFIGURATION PARITY ===');
console.log('.mcp.json vs .kilocode/mcp.json:', match ? 'MATCH' : 'MISMATCH');

console.log('\n=== PINNED MCP SERVERS ===');

for (const [name, server] of Object.entries(primaryServers)) {
  const packageSpec = (server.args || []).find(
    arg => typeof arg === 'string' &&
      arg.startsWith('@') &&
      arg.lastIndexOf('@') > 0
  );

  console.log(name + ': ' + (
    packageSpec ||
    server.url ||
    'configured; version not declared'
  ));
}

if (!match) {
  console.error('\nERROR: MCP configurations differ.');
  process.exitCode = 1;
} else {
  console.log('\nMCP configuration check: PASS');
}

console.log('\nNote: Playwright MCP has its own bundled browser runtime.');
console.log('Its version is independent of the locally installed Playwright Test runtime.');
console.log('================================\n');
```
