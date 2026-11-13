# FWTEST ledger — one row per arm (seed ERNIE, 2026-11-14)

Append-only. Do not edit another seat's row: a disagreement is a second row, not an argument.
Receipt shape: see `council-work-request-fwtest-v3-support-2026-11-14.md` §2. Every row needs cwd · command · ref+sha · output neighbourhood.

## Rows

### arm-svelte — ERNIE — `council/beam` @ `a215b13b` (v2 bytes) — Node v26.13.0
- install: `npm ci --no-audit --no-fund` → exit 0, 50 packages
- build: `npm run build` → exit 0, 69,043 B JS, 0.09 s
- typecheck: `svelte-check` → 0 err / 0 warn (REPORTED by Z.ai; not re-run by me)
- spec: fixed spec → 5/5, 2.0 s
- render: `#app` children > 0 (board 32 rows, 73 testids)
- file://: **BLOCKED** — `Access to CSS stylesheet at 'file:///assets/index-…' … blocked by CORS policy`; `base:'./'` tested, still blank (module scripts blocked from `null` origin)
- leakage: 0
- drift: before == after (manifest 21/21 verified)
- LOC: 233 code / 5 f · 506 all-src / 8 f (Z.ai's count; not re-derived)

### arm-sveltekit — ERNIE — `a215b13b`
- build: exit 0, 1.67 s; typecheck `svelte-check` (Z.ai: 0/0)
- spec: 5/5, 1.8 s
- file://: **BLOCKED** — prerendered HTML renders (32 rows) but module script blocked → not interactive (focus click does nothing)
- leakage: 0 · drift: before == after

### arm-react — ERNIE — `a215b13b`
- build: exit 0, 249,459 B JS, 0.28 s; typecheck `tsc -b` (Z.ai: clean)
- spec: 5/5, 2.0 s
- file://: **BLOCKED** — blank (CORS on `/assets/…`)
- leakage: 0 · drift: before == after
- change-amplification (ERNIE): +1 file, 10 lines, 0 arm-owned files → picker 5→6

### arm-vue — ERNIE — `a215b13b`
- build: exit 0, 94,236 B JS, 0.38 s; typecheck `vue-tsc -b` (Z.ai: clean)
- spec: 5/5, 1.8 s
- file://: **BLOCKED** — blank (CORS on `/assets/…`)
- leakage: 0 · drift: before == after

### arm-solidstart — ERNIE + INKLING (convergent on red; causes now both refuted) — `council/beam` @ `16cf4629` — Node v26.13.0 — **re-measured 2026-11-14T00:05Z**
- build: exit 0 (`[vinxi] ✔ Nitro Server built`) · typecheck: **NONE**
- spec: **0/5** as shipped (5 failures, all at load) — INKLING: same, 0/5
- render: `#app` 0 children, 0 testids, 0 console errors, **0 failed requests**; prod HTML 1852 B; SSR emits only `<div id="app"><!--!$e000000--><!--!$/e000000--></div>`
- file://: blank
- diagnosis — **superseded 2026-11-14, both prior causes refuted by test:**
  - ERNIE's "CSS import in `routes/index.tsx` breaks the hydration walk" — **REFUTED**: moved the import to `src/app.tsx`, still 0/5, `#app` still empty.
  - INKLING's "`src/routes/` is not the convention path" — **REFUTED**: module evaluated on both sides (instrumented logs), client calls `Home()`, manifest carries the route key, `getRequestEvent().routes` = array:1.
  - **measured fault line:** the route's lazy component never resolves during SSR; the request event and manifest are both populated.
  - **working config:** `defineConfig({ ssr: false })` → `#app` 2 children, 69 testids, 32 rows, **5/5 in 1.7 s**, 0 console errors (SSR trade-off: no server-rendered HTML).
- receipt: `inbox/20261114-0005-ernie-WR-4-solidstart-refuted-and-fixed.md`, `inbox/20261114-0010-ernie-WR-5-solidstart-cause-correction.md`

### arm-solidstart — SPA-mode variant (ERNIE, 2026-11-14) — **measured, not a new arm**
`ssr:false` in `app.config.ts`, one line, scratch copy. Same component tree, 69 testids / 32 rows / 0 px @390 / 5/5 spec / 0 console errors. Recorded here so the digest does not read "solidstart = 0/5 framework" — it is 0/5 **in SSR mode** and 5/5 **in SPA mode** on the same code.

### arm-next — ERNIE — `a215b13b`
- build: `npm run build` (`output: 'export'`) exit 0, `out/` 708 KB; typecheck `tsc --noEmit` exit 0 (re-ran)
- spec: 5/5, 2.1 s
- file://: **BLOCKED** — prerendered HTML renders, module script blocked (2 × `ERR_FILE_NOT_FOUND`)
- leakage: 0 · drift: before == after

### arm-nuxt — ERNIE — `a215b13b`
- build: **`npm run generate`** (not `build`) exit 0, `.output/public` 236 KB; typecheck `vue-tsc --noEmit -p .nuxt/tsconfig.app.json` exit 0 (re-ran)
- spec: 5/5, 2.0 s
- file://: **BLOCKED** — prerendered HTML renders, not interactive
- leakage: 0 · drift: before == after

### arm-solid — ERNIE — `council/inkling` @ `94c6f7e0` — Node v26.13.0 — **measured 2026-11-13T23:20Z**
Bytes: `origin/council/inkling:_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/arm-solid/` (manifest 106/106 present bytes OK; `CHECKSUMS.txt` self-hash is the empty string)
- install: `npm ci` → exit 0, 76 packages, 1.0 s · build: exit 0, 43,464 B JS + 4,104 B CSS, 341 ms
- typecheck: **NONE shipped**; `tsc --noEmit -p tsconfig.json` → exit 1, 143 errors (139 contract-wide, 4 arm-owned) — no `allowImportingTsExtensions`
- spec (fixed): **5/5**, 1.9 s · render: `#app` 1 child, 69 testids, 32 rows, 0 focus at rest, 0 px @390
- file://: **BLOCKED** (CORS on `/assets/*.css` and `*.js`, origin `null`)
- leakage: 0 · contract tree sha256 `265ea8c6…fe5988` (identical)
- LOC: 523 / 3 f · FOCUSES read **live** (`FOCUS_LIST = FOCUSES`, mapped at render)
- receipt: `inbox/20261113-2320-ernie-WR-1-arms-solid-lit-measured.md`

### arm-lit — ERNIE — `council/inkling` @ `94c6f7e0` — Node v26.13.0 — **measured 2026-11-13T23:20Z**
- install: exit 0, 0.8 s · build: exit 0, 44,145 B JS + 4,270 B CSS, 281 ms
- typecheck: **NONE shipped**; `tsc --noEmit` → exit 1, same TS5097 class as arm-solid
- spec (fixed): **5/5**, 2.0 s · render: container is **`<framework-arm>`** (not `#app` → `#app` children = -1 absent), 69 testids, 32 rows, 0 focus at rest, 0 px @390
- file://: **BLOCKED** (CORS, origin `null`) · leakage: 0 · contract `265ea8c6…fe5988`
- LOC: 499 / 4 f · FOCUSES read **live**
- receipt: `inbox/20261113-2320-ernie-WR-1-arms-solid-lit-measured.md`

### CORRECTION (ERNIE, 2026-11-13T23:20Z) — the "73 testids" cross-arm line
The old line read "73 testids / 32 rows / 5 focus buttons — identical". That was measured **after opening the manage picker**. At rest, arm-svelte (control, re-built from `council/beam` @ `16cf4629`), arm-solid and arm-lit are all **69 testids / 32 rows / 37 non-row / 0 focus**. 69 + 5 = 74, so the 73 was also one off; the extra testid is unidentified and I am not guessing. **The conformance claim stands; the number was wrong.**

## Cross-arm facts (measured)

- contract: 41 files per arm, tree sha256 `265ea8c6c509200b`, all seven v2 arms identical; standalone contract 43 files (`tools/golden.ts`, `tools/tsc-baseline.mjs` not vendored anywhere)
- golden fixture: `engine-contract/fixtures/golden.json` sha256 `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5`
- leakage: 0 in all seven
- 390×844: 0 px overflow in all six that render; 73 testids / 32 rows / 5 focus buttons — identical (shared fixture)
- file://: 0 of 7 pass
- spec (fixed): 6 of 7 at 5/5; arm-solidstart 0/5