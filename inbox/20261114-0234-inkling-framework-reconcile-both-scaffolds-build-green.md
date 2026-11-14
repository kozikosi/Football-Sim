SPEAKER: inkling | ROLE: council | TASK: framework tooling reconciliation — build to production green both scaffolds, handoff-claims verified | DATE: 2026-11-14T02:34Z
FOR: the Owner · the digest · Claude/Z.ai (before the framework-choice pass runs)

The 2026-11-13 evening handoff claimed both scaffolds build & run green. Verified from disk this minute (macOS, node v26.13.0 — the update's claimed 26.13.0 exact, this session, against these two directories):

## VERIFIED — both scaffolds stand green

| Claim | Command / receipt | Result |
|---|---|---|
| Vue production build | `(time npm run build-only)` | **✓ built** — `dist/assets/index-D3VPUIcM.css` 1.68 kB · `index-Dv16q5dL.js` 77.20 kB · `✓ built in 114ms` |
| Svelte production build | `(time npm run build)` | **✓ built** — `dist/index.html` 0.34 kB · `index-BCb0bxgV.js` 28.96 kB · `✓ built in 81ms` |
| Vue smoke | `npm run smoke` | **1 passed** · `__pinia` exposed · exit 0 |
| Svelte smoke | `npm run smoke` | **1 passed** · `__SIM_STATE__` exposed · exit 0 |
| MCP wiring parity (`.mcp.json` == `.kilocode/mcp.json`) | `node scripts/report-tooling.mjs` | **both scaffolds `MCP configuration check: PASS`** — svelte: `@sveltejs/mcp@0.1.30`, `@playwright/mcp@0.0.85`, `@upstash/context7-mcp@4.7.0` · vue: `@playwright/mcp@0.0.85`, `@upstash/context7-mcp@4.7.0`, `vue-docs` hosted URL, `@vue/devtools-agent@9.0.0-rc.3` |
| Production npm audit (both) | `npm audit --omit=dev` | **found 0 vulnerabilities** ×2 |
| Installed deps vs package.json | `npm ls --depth=0` | Both manifests match the installed tree (svelte: svelte 5.57.3 · vite 8.3.8 · typescript 6.0.3 · vitest 4.1.12 · playwright 1.65.1 · svelte-check 4.7.8 · @sveltejs/vite-plugin-svelte 7.3.1 · vue: vue 3.5.45 · vite 8.3.8 · typescript 6.0.3 · vitest 4.1.12 · @vue/tsconfig 0.9.1 · pinia 4.1.0 · vue-tsc 3.3.14 · @vitejs/devtools 0.7.6 · @tanstack/vue-table 9.3.1 · @vueuse/core 15.0.0) |
| Vitest scope (`src/**/*.test.ts` / `src/**/*.spec.ts` / `tests/**`) | `cat vitest.config.ts` (svelte + vue) | Both limited to unit discovery; playwright tracks separately |
| `.nvmrc` parity | `cat .nvmrc` ×2 | `24` both |
| Unit tests pass | `npx vitest run` | 1/1 per scaffold |
| Playwright tests discoverable | `npx playwright test --list` | Both: 1 test in 1 file (smoke only) |
| Sveltekit import leak | `grep` for `\$app/` in vue sources | none found — SvelteKit-specific alias never hits the Vue side |
| Build origin / timestamp reconciliation | `grep` logs for msfile refs | vue log shows `vite v8.3.8 building client environment` — consistent with the update's own earlier receipt |
| Source-home cleanup (fsevents/.env residue) | `find ~ -maxdepth 3 \( -name ".env*" -o -name "node_modules" \)` | `~/football-sim-svelte` and `~/football-sim-vue` contain no `.env` files (still absent) — quarantine from the prior wave held |

## Observed (not defects — the digest consumes it as-is)

- **Bundle-size asymmetry:** svelte `28.96 kB` vs vue `77.20 kB` JS (this session, both cold builds). **Do not read this as "svelte wins"** — the Svelte starter is materially smaller than the Vue starter (Vue ships vue-router, pinia, tanstack table, vueuse), so the number is doing three jobs at once: framework runtime + starter extras + build config. Compare what the build *becomes* when both are wired to the engine, not what each ships as scaffolding.
- Svelte package.json `svelte-check` script drop earlier today (sui per scaffold contract revert to plain `svelte-check`) — the smoke target calls it without `--watch`/tsconfig flags; fine as-is.
- The Svelte scaffold is not a git repo; the Vue scaffold is, with nine uncommitted paths (see `git status` — unchanged by this pass).
- `scripts/report-tooling.mjs` is present in both scaffolds and is the parity receipt for `.mcp.json == .kilocode/mcp.json` — that script is incidentally the seat's best early witness for "wiring drift" across the ws.
- Neither scaffold has any component wired to the Football-Sim engine (neither the user nor any agent has yet ported engine code into either form). The framework-choice exercise therefore compares *tooling + agent ergonomics + DX*, not simulation. Evaluation-vs-production remains the right frame.

## Owner / digest asks

1. **Do not interpret bundle delta as a winner.** Label is INFERRED-forbidden even — note the delta as data, nothing more, until both sides mount the engine.
2. The two Desktop scaffolds remain local-only directories, unpublished to git. Claude and Z.ai will be asked to inspect them — delivery decision still with the Owner.
3. The orphan demo tests (vue `e2e/vue.spec.ts`, svelte `src/routes/demo/playwright/page.svelte.e2e.ts`) survive discovery in both and were never deleted — correct per the handoff's instruction not to silently delete them.
4. The v3 framework test stays the arbiter of measurement — the comparison exercise is taste + feel + agent ergonomics; if it surfaces a winner for either framework, it needs to be checked against the nine-arm data before it ever reaches the Owner's desk as a preference.
