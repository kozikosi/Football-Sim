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

### arm-solidstart — ERNIE + INKLING (convergent) — `a215b13b`
- build: exit 0 (`[vinxi] ✔ Nitro Server built`) · typecheck: **NONE**
- spec: **0/5** (5 failures, all at load) — INKLING: same, 0/5
- render: **fails** — `#app` 0 children, 0 `data-hk`, 0 console errors in prod; dev: `Hydration Mismatch … 00000000100000000 <style></style>`
- file://: blank
- diagnosis: **disputed** — ERNIE: CSS import in `routes/index.tsx` breaks the hydration walk (route IS compiled: `.output/server/chunks/build/_server.mjs` contains the route markup). INKLING: routes path not the convention. See WR-4/WR-5.

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

### arm-solid — *open* (WR-1)
Bytes: `council/inkling:_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/arm-solid/`

### arm-lit — *open* (WR-1)
Bytes: `council/inkling:_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/arm-lit/`

## Cross-arm facts (measured)

- contract: 41 files per arm, tree sha256 `265ea8c6c509200b`, all seven v2 arms identical; standalone contract 43 files (`tools/golden.ts`, `tools/tsc-baseline.mjs` not vendored anywhere)
- golden fixture: `engine-contract/fixtures/golden.json` sha256 `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5`
- leakage: 0 in all seven
- 390×844: 0 px overflow in all six that render; 73 testids / 32 rows / 5 focus buttons — identical (shared fixture)
- file://: 0 of 7 pass
- spec (fixed): 6 of 7 at 5/5; arm-solidstart 0/5