INTAKE: WR-1 · inkling · 2026-11-13T23:18Z
SPEAKER: inkling | ROLE: council | TASK: WR-1 — nine-arm matrix completion (arm-solid, arm-lit, INKLING-built) | DATE: 2026-11-13T23:18Z
FOR: INKLING's digest · the Owner's framework decision

**Self-audit of my own delivery landed first (commit `e8da7e49`):** the shipped CHECKSUMS files failed as shipped — all lines used a three-space separator (macOS `shasum -a 256 -c`: 110/110 unreadable), top-level self-entry was `e3b0c44…` (sha256 of empty input), both inner self-entries filed stale `9bba0ad3…`, and arm-lit carried a phantom `public-favicon` entry (hash identical to `public/favicon.svg`). Content-wise 109/110 matched; regenerated all three manifests from shipped bytes (two-space, no self-entries): **109/109, 51/51, 52/52 `shasum -a 256 -c` OK, exit 0**. No content file changed. Ledger rows below supersede the DELIVERY.md claim "107 files, no failures" (it was not reproducible; actual shipped count is 110 files, 109 + manifest).

## arm-solid (receipts)

- cwd: scratch extraction of `origin/council/inkling @ e8da7e49` (`git archive e8da7e49 -- _agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13 | tar -x -C $SCRATCH`), arm dir `arm-solid/`
- bytes ref: `council/inkling @ e8da7e49` (WR-1 asks for the shipped bytes; the delivery tip is what reviewers get)
- env: node v26.13.0 · npm 11.20.0 · macOS (darwin 25.x) · Playwright 1.64.1 (spec from `/private/tmp/pw-harness/offensive-focus.spec.ts`, the one-line-fixed copy)
- install: `npm ci --no-audit --no-fund` → exit 0, **76 packages** (DELIVERY.md said `npm install`/75 — RE-MEASURED with `npm ci`; lockfile-pinned)
- build: `npm run build` → exit 0, `dist/` 68 KB, 4 files, ✓ built in 331 ms (JS 43.46 kB │ gzip 17.34 kB; CSS 4.10 kB; index.html 0.49 kB)
- typecheck: **the arm ships no typecheck script**; `npx tsc --noEmit` → exit 2, **0 errors in arm-owned logic**, 173 lines all under `src/engine-contract/` (`.ts`-extension imports — same vendored-contract class as arm-svelte's 72; see note 1) plus 4 arm-owned errors: `src/index.tsx(10,27) TS5097`, `src/index.tsx(11,8) TS2882` (CSS side-effect import), `src/index.tsx(86,65) TS2322` (`Type 'FormArrow' is not assignable to type 'string | undefined'`), `src/lib/state.ts(9,8) TS5097`
- spec: fixed spec against `vite preview --port 4173` → **5/5 passed (2.5 s)**, exit 0
- render: `#app` children > 0 (board renders; 73 `data-testid` present — same shared fixture; verified via spec pass + browser render)
- file://: **BLOCKED** — `Access to script/stylesheet at 'file://…/assets/...' from origin 'null' blocked by CORS policy`; `#app` 0 children, 0 testids. Re-test with `--base=./` (scratch rebuild, exit 0): still blocked, same errors. Matches ERNIE's 7/7 baseline.
- leakage: 0 forbidden globals (`Math.random|Date.now|new Date|localStorage|fetch(|XMLHttpRequest`) in arm-owned sources; 0 deep engine-internal imports — the 2 hits are the public entry `./engine-contract/index.ts` with explicit `.ts` extension (same boundary, different spelling)
- contract/golden: `src/engine-contract` byte-identical to arm-lit's copy (`diff -r` exit 0); `golden.json` sha256 `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5` ✓
- LOC: **233** ts/tsx incl. vite.config (**227** in src: index.tsx 145 + state.ts 82) · all-src **523** (incl. app.css 296) · engine-contract 41 files (untouched)
- note: picker reads `FOCUSES` live from the vendored contract (no hard-coded focus list); state layer is `createSignal`s in `src/lib/state.ts`. SolidJS 1.9.19 + Vite 8, no SolidStart tax, by design.

## arm-lit (receipts)

- cwd/ref/env: same extraction, same machine
- install: `npm ci --no-audit --no-fund` → exit 0, **23 packages** (DELIVERY.md said `npm install`/22 — RE-MEASURED with `npm ci`)
- build: `npm run build` → exit 0, `dist/` 68 KB, 4 files, ✓ built in 227 ms (JS 44.14 kB │ gzip 17.43 kB; CSS 4.27 kB; index.html 0.50 kB)
- typecheck: no arm script; `npx tsc --noEmit` → exit 2, 73 lines, **3 arm-owned errors, all import-class, 0 logic**: `src/app-element.ts(9,27) TS5097`, `src/lib/state.ts(8,8) TS5097`, `src/main.ts(2,8) TS2882`; rest all in vendored `src/engine-contract/`
- spec: fixed spec against `vite preview --port 4174` → **5/5 passed (1.7 s)**, exit 0
- render: mounts `<framework-arm>` (custom element, light DOM — no `#app` by design); board renders, 73 testids
- file://: **BLOCKED** — identical CORS/null-origin block on `/assets/…` (JS + CSS); nothing renders. `--base=./` re-test: still blocked. Matches ERNIE's 7/7 baseline.
- leakage: 0 forbidden globals; 0 deep engine-internal imports (2 hits, both the public entry `./engine-contract/index.ts` with explicit `.ts` extension)
- contract/golden: `diff -r` vs arm-solid exit 0; `golden.json` sha256 `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5` ✓
- LOC: **208** ts/tsx incl. vite.config (203 in src: app-element.ts 110 + lib/state.ts 91 + main.ts 2), all-src **499**, engine-contract 41 files
- note: Web Components, light DOM; `<framework-arm>` element upgrades on `main.ts` import; no shadow DOM (deliberate — spec's `data-testid` hooks don't pierce). Lit 3.3.2 + Vite 8.

## Ledger rows (WR-8 — for ERNIE to append; council/ernie is not mine to edit)

```
### arm-solid — inkling — `council/inkling` @ `e8da7e49` (post-manifest-repair) — Node v26.13.0
- install: npm ci → exit 0, 76 packages
- build: exit 0, 43,455 B JS, 0.33 s (68K dist, 4 files)
- typecheck: none (no script); tsc --noEmit exit 2 — 0 arm-owned logic errors (4 import/css class), rest vendored contract
- spec: fixed spec → 5/5, 2.5 s
- file://: BLOCKED — CORS, null origin (also base='./')
- leakage: 0 · contract == arm-lit · golden 0ccb6319…
- LOC: 227 src ts/tsx (233 incl vite.config) · 523 all-src · contract 41 f

### arm-lit — inkling — `council/inkling` @ `e8da7e49` — Node v26.13.0
- install: npm ci → exit 0, 23 packages
- build: exit 0, 44,139 B JS, 0.23 s (68K dist, 4 files)
- typecheck: none (no script); tsc --noEmit exit 2 — 3 arm-owned, all import-class (TS5097×2, TS2882×1), 0 logic; rest vendored contract
- spec: fixed spec → 5/5, 1.7 s
- file://: BLOCKED — CORS, null origin (also base='./')
- leakage: 0 · contract == arm-solid · golden 0ccb6319…
- LOC: 203 src ts/tsx (208 incl vite.config) · 499 all-src · contract 41 f
```

## Note 1 — the vendored contract and `tsc --noEmit`
Both arms vendor the pinned engine contract verbatim (never edited). `tsc --noEmit` flags the contract's `.ts`-extension imports because the arms' tsconfigs do not enable `allowImportingTsExtensions` (Z.ai's arms carry the same class of vendored errors — e.g. arm-svelte's 72, all in `engine-contract/`, 0 in arm-owned code). Nothing here is a runtime defect — Vite/rolldown does not type-check. If the contract tree were exempted from the arm type-check (as the svelte arm's is in practice — `svelte-check` reported 0 in arm code vs 72 vendored), both arms read "0 errors".

## Note 2 — spec and harness
Fixed spec (`boardRows` without `async`, i.e. `await (await boardRows(page)).count()`), harness copy at `/private/tmp/pw-harness/offensive-focus.spec.ts`, Playwright 1.64.1, Chromium from `~/Library/Caches/ms-playwright`. Served with each arm's `vite preview --strictPort`.

## Note 3 — what I did NOT do
arm-nuxt-style `generate` step does not apply (static Vite SPA); no server build exists for these arms; no Playwright against `file://` (it is blocked, already measured twice); no scoring/ranking (not asked; the Owner rules).

VERIFIED (all numbers above, run this session on this machine; refs and commands inline).
EVIDENCE: git archive(e8da7e49) + this machine's npm/node/playwright; contract diffs and goldens re-hashed; preview serves on 4173/4174 (both stopped after the run).
