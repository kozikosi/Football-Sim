SPEAKER: glyph | ROLE: seat | TASK: public-repos-fortification (council-assignment E) | DATE: 2026-11-14T04:21Z

# Public Repos Fortification (Inkling Assignment E)

Scope: fresh clones of `kozikosi/football-sim-vue@6b4de5c734898d85f00c779de4f078532e5dadf9` and `kozikosi/football-sim-svelte@86ba63255b34ef87db2cf9cae954511d5631064f` in `/tmp/kilo-glyph-fw-20261114-0421`. VERIFIED.

## E1. Tracked suspicious paths (`git ls-files | grep -E "backup\.|\.kilocode|\.mcp|node_modules|dist/|test-results/"`)
**Vue:**
```
(none)
```
**Svelte:**
```
(none)
```
**Result:** PASS (no tracked matches). VERIFIED.

## E2. `.gitignore` review (local-but-committed trash / ignore coverage)
**Vue `.gitignore`:**
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
.DS_Store
dist
dist-ssr
coverage
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

*.tsbuildinfo

.eslintcache

# Cypress
/cypress/videos/
/cypress/screenshots/

# Vitest
__screenshots__/

# Vite
*.timestamp-*-*.mjs

test-results/
playwright-report/

# Local AI-tool configuration
.mcp.json
.kilocode/

# Backups and generated reports
*.backup-*
playwright-report/
```
**Svelte `.gitignore`:**
```
node_modules

# Output
.output
.vercel
.netlify
.wrangler
/.svelte-kit
/build
/dist
/coverage

# OS
.DS_Store
Thumbs.db

# Env
.env
.env.*
!.env.example
!.env.test

# Vite
vite.config.js.timestamp-*
vite.config.ts.timestamp-*

# Playwright
test-results
playwright-report/

# Local AI-tool configuration
.mcp.json
.kilocode/

# Backups
*.backup-*
```
**Result (VERIFIED):** Both ignore `node_modules`, `dist`/build outputs, `test-results/`, `playwright-report/`, `.mcp.json`, `.kilocode/`, `*.backup-*` and common local artifacts. No tracked trash found in E1. Note: `report-tooling.mjs` expects `.mcp.json`/`.kilocode/mcp.json` but they are gitignored and absent in fresh clones (see E4).

## E3. `git log --pretty=format:'%h %s' --since "2026-11-01" --reverse`
**Vue:**
```
6b4de5c chore: prepare Vue 3 Vite comparison scaffold
```
**Svelte:**
```
86ba632 chore: add Svelte 5 Vite comparison scaffold
```
**Result:** each shows only the publish checkpoint scaffold commit since 2026-11-01 (`6b4de5c`, `86ba632`). VERIFIED.

## E4. CLI parity — `node scripts/report-tooling.mjs` cleanly
**Vue (exit 1):**
```

=== TOOLING RECEIPT ===
Node: v26.13.0
vite: 8.3.8
vue: 3.5.45
typescript: 6.0.3
vitest: 4.1.12
@playwright/test: 1.65.1
playwright: 1.65.1
playwright-core: 1.65.1
node:fs:624
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^

Error: ENOENT: no such file or directory, open '/private/tmp/kilo-glyph-fw-20261114-0421/vue/.mcp.json'
    at Object.readFileSync (node:fs:624:20)
    at readJson (file:///private/tmp/kilo-glyph-fw-20261114-0421/vue/scripts/report-tooling.mjs:7:24)
    at file:///private/tmp/kilo-glyph-fw-20261114-0421/vue/scripts/report-tooling.mjs:48:17
    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)
    at async node:internal/modules/esm/loader:650:26
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/private/tmp/kilo-glyph-fw-20261114-0421/vue/.mcp.json'
}

Node.js v26.13.0
```
**Svelte (exit 1):**
```

=== TOOLING RECEIPT ===
Node: v26.13.0
vite: 8.3.8
svelte: 5.57.3
typescript: 6.0.3
vitest: 4.1.12
@playwright/test: 1.65.1
playwright: 1.65.1
playwright-core: 1.65.1
node:fs:624
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^

Error: ENOENT: no such file or directory, open '/private/tmp/kilo-glyph-fw-20261114-0421/svelte/.mcp.json'
    at Object.readFileSync (node:fs:624:20)
    at readJson (file:///private/tmp/kilo-glyph-fw-20261114-0421/svelte/scripts/report-tooling.mjs:7:24)
    at file:///private/tmp/kilo-glyph-fw-20261114-0421/svelte/scripts/report-tooling.mjs:48:17
    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)
    at async node:internal/modules/esm/loader:650:26
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/private/tmp/kilo-glyph-fw-20261114-0421/svelte/.mcp.json'
}

Node.js v26.13.0
```
**Result:** FAIL in both — script errors with ENOENT for missing `.mcp.json` before MCP parity output; installed-version receipt is emitted but command is not clean. No patch applied. VERIFIED.

## E5. `git ls-tree -r --name-only HEAD | wc -l`
**Vue:**
```
37
```
**Svelte:**
```
28
```
**Result:** Vue has **37** tracked files, Svelte has **28** (not 28/28). VERIFIED — diverges from '28 for each' expectation; recorded as-found.

## Summary
| Check | Vue | Svelte |
|---|---|---|
| E1 tracked suspicious | PASS (none) | PASS (none) |
| E2 gitignore/trash | adequate, no tracked trash | adequate, no tracked trash |
| E3 log since 2026-11-01 | `6b4de5c` only | `86ba632` only |
| E4 report-tooling clean | **FAIL exit 1** (ENOENT .mcp.json) | **FAIL exit 1** (ENOENT .mcp.json) |
| E5 tracked file count | **37** | **28** |
