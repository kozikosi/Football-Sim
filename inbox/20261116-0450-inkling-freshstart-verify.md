SPEAKER: inkling | TASK: Engine test round — I. Fresh-start repos: clean verify, read-only | DATE: 2026-11-16T04:50Z
FOR: framework comparison (R-13)

REPOS (fresh standalone scaffolds, `git clone --depth 1`, HEAD shown):
- `kozikosi/football-sim-vue` @ `6b4de5c734898d85f00c779de4f078532e5dadf9` ("chore: prepare Vue 3 Vite comparison scaffold")
- `kozikosi/football-sim-svelte` @ `86ba63255b34ef87db2cf9cae954511d5631064f` ("chore: add Svelte 5 Vite comparison scaffold")

Method: shallow clone into scratch; `npm ci --no-audit --no-fund` in each; read-only thereafter. **No file was edited in either repo**; both `git status --porcelain` are empty (verified after all runs — the one stray scratch artifact I created, `fss/check-out.txt`, was deleted and the tree re-verified clean). No push was made anywhere.

## Results (exact commands)
| step | Vue (football-sim-vue) | Svelte (football-sim-svelte) |
|---|---|---|
| HEAD | 6b4de5c | 86ba632 |
| `npm ci` | clean (no errors; fsevents install-script warning only, both) | clean (same warning only) |
| `npm run type-check` | **exit 0** (vue-tsc --build, no output) | — |
| `npm run check` | — | **exit 0 — "svelte-check found 0 errors and 0 warnings"** |
| `npx vitest run` | 1 file / **1 test passed** · Duration 555ms | 1 file / **1 test passed** · Duration 99ms |
| `npm run build` | not requested; NOT run | not requested; NOT run |
| `npx playwright test` / e2e | NOT run (not requested) | NOT run (not requested) |

`probes/probe-battery.mjs`: **does not exist in either clone** (`find . -name "probe-battery*"` → 0 hits in both; only `scripts/report-tooling.mjs` exists). The instruction's conditional — "if probes/probe-battery.mjs exists in your clone, run it and report the line it prints" — does not fire; nothing to run, nothing to report. The Rev 8 delivery carries its own `probes/battery-*.json` files (different artifacts, checked in item E). If a probe-battery was expected in these scaffolds, its absence is a finding in itself: the two public comparison repos ship a smoke test and an e2e spec but NO measurement battery, so any "first-try green" or repair-cycle claim about them cannot be grounded from these trees alone.

## What the trees are (for the comparison record)
- Vue: 17 files under src/e2e/tests (ts/vue/css/json), 495 lines total (ts/vue/css; count via find+wc -l — statement of method included); scripts: type-check=vue-tsc --build, test:unit=vitest, e2e=playwright, smoke=report-tooling+playwright.
- Svelte: 10 files, 94 lines total; scripts: check=svelte-check, test:unit=vitest, e2e=playwright, smoke=same shape.
- Both are scaffolds ("comparison scaffold" in their commit messages): no engine snapshot vendored into either (unlike the Rev 8 arms), no seasonStore, no slices — they establish ONLY that a clean clone installs, type-checks clean, and passes its one smoke test on Node 26.13.0, npm 11.20.0, macOS arm64.

## Labels
VERIFIED (this machine, these commands, these outputs). REPORTED: nothing external used. UNKNOWN: everything not run (e2e, build sizes, HMR, battery behaviour — the battery does not exist here). The scaffold-vs-delivery distinction matters for R-13: any framework verdict that cites these two repos is citing two green smoke scaffolds, not two worked products.
