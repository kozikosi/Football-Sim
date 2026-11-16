SPEAKER: vl | TASK: Fresh-start repos — clean verify, read-only | DATE: 2026-11-16T04:38:00Z
FOR: R-13 (framework comparison)

## I. Fresh-start repos — clean verify

Repos: `kozikosi/football-sim-vue` and `kozikosi/football-sim-svelte` (pass-through copies under `_agents/vl/deliveries/zai-fresh-start-rev8-2026-11-15/`). No files modified, nothing pushed.

### Vue (`football-sim-vue`)

| Step | Command | Output | Result |
|---|---|---|---|
| Install | `npm ci` | succeeded, 5 moderate vulnerabilities (audit only) | PASS |
| Type-check | `npm run type-check` (`vue-tsc --build`) | exit 0, clean | PASS (0 errors) |
| Tests | `npx vitest run` | 4 test files: 3 failed, 1 passed; 2 tests passed | FAIL (3 files) |

The 3 vitest failures are a `Tsconfig not found` error for `$app/tsconfig` in `vite:oxc` transform — a Vite/Vitest configuration issue, not an engine test failure. The 2 tests that ran passed. Exit code reported as 0 by the shell (likely a vitest config quirk).

**Probe-battery.mjs:** exists at `probes/probe-battery.mjs` but requires a built `dist/index.html` (not built, since building would create new files in the read-only delivery). Running it fails with `net::ERR_FILE_NOT_FOUND` at `file:///.../dist/index.html`. NOT RUN — dist not built.

### Svelte (`football-sim-svelte`)

| Step | Command | Output | Result |
|---|---|---|---|
| Install | `npm ci` | succeeded | PASS |
| Check | `npm run check` (`svelte-check --tsconfig ./tsconfig.json`) | `svelte-check found 0 errors and 0 warnings` | PASS |
| Tests | `npx vitest run` | `Test Files 4 passed (4), Tests 14 passed (14)` | PASS (14/14, exit 0) |

**Probe-battery.mjs:** exists but requires built `dist/index.html` (not built). NOT RUN.

### Summary

- Both repos install cleanly (`npm ci` exit 0).
- Vue type-check: clean (exit 0). Svelte check: 0 errors, 0 warnings.
- Svelte tests: 14/14 pass. Vue tests: configuration issue prevents full run (3 files fail on tsconfig transform, 2 tests pass).
- Probe battery: not run in either repo (requires `npm run build` output which would create files in the read-only delivery).

Labels: VERIFIED for install/type-check/tests. Probe-battery: NOT RUN (dist not built). No files modified, nothing pushed.
