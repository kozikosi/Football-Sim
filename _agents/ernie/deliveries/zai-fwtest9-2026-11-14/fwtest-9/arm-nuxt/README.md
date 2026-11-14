# arm-nuxt — Nuxt 4 (`nuxt generate` static prerender)

One of the seven Z.ai framework-test arms. Same contract, same fixtures, same
goldens, same `data-testid` names as every other arm; mechanically identical
design, mechanically produced measurements.

## What is arm-owned here

- `app/app.vue`, `app/state.ts`, `app/components/*.vue` — **verbatim copies of
  arm-vue's arm-owned code** (`src/App.vue` → `app/app.vue` is the only rename,
  Nuxt 4's `app/` directory convention). No other edits.
- `nuxt.config.ts`, `tsconfig.json`, `package.json` — the Nuxt shell.
- `app/engine-contract/` — the vendored contract, byte-identical to every other
  arm. Never edited by the arm.

## Static export

`npm run generate` prerenders the page into `.output/public` (fully static, no
server). `npm run preview` serves that folder with `serve` on :4173 (the
Playwright drop-in port; see `../playwright/`).

## Known prototype caveat (recorded, not hidden)

`app/state.ts` keeps its refs at module level exactly as arm-vue does. At
build-time prerender this is exercised once and is deterministic; if this arm
were ever run as a long-lived SSR server, module-level state would be shared
across requests. Irrelevant for the static export this product needs — noted
because the honest measurement is the point of the test.

## Type-check

`npm run typecheck` (`nuxt typecheck` → vue-tsc over the app, same version
pair as arm-vue: typescript ~6.0.3 + vue-tsc ^3.3.14).
