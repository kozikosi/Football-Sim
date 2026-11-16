SPEAKER: ernie | ROLE: council advisor | TASK: fresh-start repos — clean read-only verify of both arms | DATE: 2026-11-16T02:19Z
FOR: framework comparison (R-13)

Both repos cloned shallow from GitHub into `/tmp`, nothing modified, nothing pushed. Machine: darwin, node `v26.13.0`.

```
$ git clone --depth 1 https://github.com/kozikosi/football-sim-vue.git      → 6b4de5c "chore: prepare Vue 3 Vite comparison scaffold"
$ git clone --depth 1 https://github.com/kozikosi/football-sim-svelte.git   → 86ba632 "chore: add Svelte 5 Vite comparison scaffold"
```

| step | Vue arm | Svelte arm |
|---|---|---|
| `npm ci` | exit 0 | exit 0 |
| type-check | `npm run type-check` (`vue-tsc --build`) → **exit 0, no output** | `npm run check` (`svelte-check`) → **0 errors, 0 warnings** |
| unit tests | `npx vitest run` → **1 file / 1 test passed** | `npx vitest run` → **1 file / 1 test passed** |
| build | `npm run build` → **✓ built in 314ms, 77.20 kB** | `npm run build` → **✓ built in 64ms, 28.96 kB** (postbuild singlefile inlined) |
| `probes/probe-battery.mjs` | **absent** | **absent** |

**Rows: all VERIFIED except the probe-battery row, which is UNKNOWN-because-absent** — neither repo has a `probes/` directory at these tips (`ls probes` → no such directory), so there is no line to report.

## The finding that matters more than the four green rows
The only test in each repo is the scaffold default:
```
/tmp/fs-vue/src/components/__tests__/HelloWorld.spec.ts
/tmp/fs-svelte/src/lib/vitest-examples/greet.spec.ts
```
**1/1 passing measures the scaffold, not the application.** "0 errors, 0 warnings, 1/1 green" on these two repos is a statement about a hello-world; it is not evidence about a draft board, a lineup, or a store. Any comparison that quotes "0/0 and 1/1" as a quality signal for either arm is quoting the template.

## What I did not do
- no `npm run test:e2e` (Playwright) — the e2e specs are `tests/smoke.spec.ts` / the scaffold's; running them needs a browser download and was out of budget. **UNKNOWN.**
- no measurement of the probes, because there are none in the repos (the battery JSONs live in the Rev 8 delivery, not in these repos). **UNKNOWN / not applicable.**
- no file in either repo was modified, no commit was made, nothing was pushed. **VERIFIED** by construction (read-only commands only: `npm ci`, `npm run */check`, `npx vitest run`, `npm run build`).

## Ledger
- VERIFIED: both arms install, type-check 0/0, unit tests 1/1, build clean; neither repo carries a `probes/` directory.
- UNKNOWN: e2e (Playwright) for both arms; any behavioural measurement of either app beyond the scaffold test.
- INFERRED: the repos are scaffolds, not the Rev 8 app trees (the Rev 8 delivery carries the batteries and the six screens; these tips carry one component each).