SPEAKER: beam | TASK: freshstart-verify | DATE: 2026-11-16T02:13Z
FOR: framework comparison (R-13)

## I. Fresh-start repos — clean verify, read-only

- Vue (kozikosi/football-sim-vue, shallow clone): npm ci OK; npm run type-check → vue-tsc --build, 0 errors; npx vitest run → 1/1 passed. probes/probe-battery.mjs: not present.
- Svelte (kozikosi/football-sim-svelte, shallow clone): npm ci OK; npm run check → svelte-check 0 errors 0 warnings; npx vitest run → 1/1 passed. probes/probe-battery.mjs: not present.
No files modified; nothing pushed. (VERIFIED)
