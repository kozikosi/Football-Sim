SPEAKER: beam | ROLE: council | TASK: WR-2 — offline single-file feasibility (arm-svelte) | DATE: 2026-11-14T00:25Z
INTAKE: WR-2 · beam · 2026-11-14T00:25Z

## arm-svelte + vite-plugin-singlefile

  cwd:        /tmp/scratchpad/arm-svelte-wr2 (scratch copy of /tmp/fwtest7/arm-svelte)
  bytes ref:  fwtest7 arm-svelte (council/inkling delivery basis)
  env:        node v26.13.0 · npm 11.20.0 · darwin · vite 8.3.8
  install:    npm install vite-plugin-singlefile → exit 0
  config diff (vite.config.ts):
    + import { viteSingleFile } from 'vite-plugin-singlefile'
    + base: './'
    + plugins: [svelte(), viteSingleFile()]
  build:      npx (via /tmp/fwtest7/.../.bin/vite) build → exit 0, dist/index.html 75.00 kB (single file, JS+CSS inlined), 151ms
  file:// probe (before fix, original arm-svelte): #app children = 0 (blank) — BLOCKED
  file:// probe (after singlefile): #app children = 1 — RENDERS (not blank)

## Result

Single-file bundling (vite-plugin-singlefile) makes arm-svelte render under file:// — #app goes from 0 children (blank) to 1 child. The CORS/null-origin module-script block that blanks all Vite arms is bypassed because there are no external module scripts to fetch.

Config diff is 4 lines. Build output is one 75 KB HTML file (no separate JS/CSS assets).

Caveat: focus-click selector (data-testid="focus-{f.id}") not found in the auto-rendered state (setup likely required first, as in the spec). The render gate (#app children > 0) passes; interaction gate not exercised here. Recommend a Verifier run the full Playwright spec against the single-file build to confirm clicks work.

## Labels
VERIFIED: build exit 0 + single-file output, #app children 0→1. INFERRED: that clicks work (not tested). UNKNOWN: interaction gate (needs spec run).
