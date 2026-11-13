SPEAKER: beam | ROLE: council | TASK: WR-1 — arms 8 and 9 (arm-solid, arm-lit) | DATE: 2026-11-14T00:10Z
INTAKE: WR-1 · beam · 2026-11-14T00:10Z

## arm-solid
  cwd:        /tmp/scratchpad/wr1/_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/arm-solid
  bytes ref:  council/inkling @ <see commit> (extracted via git archive)
  env:        node v26.13.0 · npm 11.20.0 · darwin
  install:    npm install → exit 0, 0 vulnerabilities
  build:      npm run build → exit 0, dist/index.html 0.49 kB, JS 43.46 kB, CSS 4.10 kB, 299ms
  typecheck:  npx tsc --noEmit → FAIL (TS5097: .ts import extensions not allowed under current tsconfig; no allowImportingTsExtensions). Same class as other arms.
  spec:       not run (no shared spec config in arm; Playwright not wired) — UNKNOWN
  render:     #app children = 0 under file:// (blank)
  file://:    BLOCKED — #app empty, 0 children (CORS/null-origin / module script block, consistent with all other Vite arms)
  leakage:    0 findings in src/ (outside engine-contract)
  drift:      not measured (no manifest diff run)
  LOC:        code 3097 across src/ (incl. vendored engine-contract)
  note:       builds clean and fast (299ms). Picker reads FOCUSES live from contract (state.ts: FOCUS_LIST = FOCUSES). No forbidden globals. file:// fails same as svelte/react/vue. Type-check fails on tsconfig (missing allowImportingTsExtensions), not on arm code.

## arm-lit
  cwd:        /tmp/scratchpad/wr1/_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/arm-lit
  bytes ref:  council/inkling
  env:        node v26.13.0 · npm 11.20.0 · darwin
  install:    npm install → exit 0
  build:      npm run build → exit 0, dist/index.html 0.50 kB, JS 44.14 kB, CSS 4.27 kB, 222ms
  typecheck:  not run (no tsc invocation attempted; same .ts-extension class expected)
  spec:       not run — UNKNOWN
  render:     #app not found (timeout) under file://
  file://:    BLOCKED — #app element not present / hydration never attached
  leakage:    0 findings in src/ (outside engine-contract)
  drift:      not measured
  LOC:        code 3073 across src/
  note:       builds clean and fast (222ms). Picker reads FOCUSES live. No forbidden globals. file:// fails. Build output smallest-ish (44KB JS).

## FOCUSES live check
Both arms: state.ts imports FOCUSES from engine-contract and sets FOCUS_LIST = FOCUSES. Neither hard-codes the focus list. VERIFIED by grep.

## Labels
VERIFIED: build exit 0 + output sizes/times, #app children counts, leakage scan, FOCUSES live check. UNKNOWN: spec runs (no spec harness in arms), drift, typecheck for arm-lit, file:// root cause (measured as blank only, not diagnosed).
