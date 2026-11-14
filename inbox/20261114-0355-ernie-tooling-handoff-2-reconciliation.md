SPEAKER: ernie | ROLE: council | TASK: reconcile the second tooling handoff (Vue 3 vs Svelte 5 validation) · DATE: 2026-11-14T03:55Z
RE: `council/inkling` — "INKLING UPDATE — VUE 3 vs. SVELTE 5: TOOLING VALIDATION AND ARCHITECTURAL INVESTIGATION"

**Headline: the scaffolds moved while I was auditing them.** Between my 03:30Z read and 03:55Z the Svelte scaffold was converted from SvelteKit to standalone Svelte 5 + Vite, and **both Playwright configs changed**. That makes three of my earlier receipts stale. The handoff is right; I was right at the time; both facts are true with different timestamps.

---

## 1. Corrections to MY receipts (filed, not quietly dropped)

| My earlier receipt (03:30Z) | Actual bytes now (03:55Z) |
|---|---|
| Svelte `playwright.config.ts` → `testDir: './tests'` | **`testDir: '.'` + `testMatch: ['tests/**/*.spec.ts']`** |
| Vue `playwright.config.ts` → `testDir: './tests'` | **`testDir: '.'` + `testMatch: ['tests/**/*.spec.ts','e2e/**/*.spec.ts']`** |
| Svelte scaffold had `@sveltejs/kit@3.2.0`, `@sveltejs/adapter-auto@8.0.1`, `src/routes/**`, `app.html`, `app.d.ts`, `src/routes/demo/playwright/page.svelte.e2e.ts` | **All gone.** `package.json` → `deps: []`, `devDeps: [@playwright/test, @sveltejs/vite-plugin-svelte, svelte, svelte-check, typescript, vite, vitest]`. `src/` = `App.svelte`, `components/demo/PlaywrightDemo.svelte`, `lib/{index.ts, state/sim-state.svelte.ts, vitest-examples/*}`, `main.ts`, `vite-env.d.ts` |

So: **the Owner's ruling "SvelteKit is out of scope" has already been implemented in the bytes**, and the handoff's §4 claim — *"This is standalone Svelte 5 + Vite. It is not SvelteKit"* — is **correct as of now**. My 03:30Z inventory described a SvelteKit-shaped scaffold that no longer exists. `npx svelte-kit sync` now exits 1 ("no kit"), which is the clean confirmation.

**Verified the conversion did not break it (VERIFIED):**
```
cwd:     /Users/kosi/football-sim-svelte
command: npm run check ; npm run build
output:  check → "svelte-check found 0 errors and 0 warnings" (exit 0)
         build → exit 0, dist/index.html 0.34 kB + index-BCb0bxgV.js 28.96 kB, 75 ms
```

## 2. Confirmed exactly as written (VERIFIED)

- **Vue audit, both halves:** `npm audit --omit=dev` → **"found 0 vulnerabilities"**; full `npm audit` → **"5 moderate severity vulnerabilities"**; chain confirmed as `glob 9.0.0–14.0.1` → vulnerable `minimatch`, and `js-beautify >=1.14.9` → vulnerable `editorconfig` + `glob`; remediation would install **`@vue/test-utils@2.4.11` (a breaking change)**. Agree with the recommendation: **do not force the downgrade.**
- **Vue git:** repo on `main`, baseline `82e893d chore: baseline Vue scaffold`, **16 uncommitted files**. Handoff said "multiple"; 16 is the number.
- **Svelte git: none.** Confirmed — no repo.
- **Test inventory:** `tests/smoke.spec.ts` (both), `e2e/vue.spec.ts` (Vue), `tests/demo.spec.ts` (Svelte) all **PRESENT**; `src/routes/demo/playwright/page.svelte.e2e.ts` **ABSENT** — the handoff's "existence not revalidated" resolves to *removed*.
- **Unit-test environments differ as described:** Svelte `environment: 'node'`, Vue `environment: 'jsdom'`.
- **Ports and server reuse differ as described:** Vue `5173` + `reuseExistingServer: !process.env.CI`; Svelte `5174` + `reuseExistingServer: false`.
- **Versions:** Vue **3.5.45** installed (handoff's table correct; the *previous* handoff's 3.5.42 was the manifest range). Svelte **5.57.3** installed — the handoff's own manifest table still says 5.57.2, so that one figure is **stale in the handoff**, not just in my note.

## 3. Where the handoff and my earlier audit still agree

- **Vue is the better-wired side on MCP:** 4 servers (`playwright`, `context7`, `vue-docs`, `vue-devtools`) vs Svelte's 3 (`svelte`, `playwright`, `context7`), identical in `.mcp.json` and `.kilocode/mcp.json`.
- **My harness still sees none of them** — only `airbyte-agent-mcp`. So the MCP half of Priority 1 remains **UNKNOWN from my seat**.
- **`claude` CLI absent** (re-verified earlier this session).

## 4. Two things I would add to the handoff

1. **Timestamp every inventory.** Three of my receipts went stale in **25 minutes**. A scaffold state without a capture time is a rumour, and the digest will be built from several seats' captures taken at different moments. Recommend every future inventory carry `date -u +%Y-%m-%dT%H:%M:%SZ` plus the top-line `package.json` deps.
2. **The engine-sharing question in Priority 3 is already answered by measurement.** The nine-arm wave proved one mechanism, 9/9: **vendor `engine-contract` (41 files, byte-identical), pin to `4ca9a071`, gate on the golden hash `0ccb63196b…f3f5`.** That gives both UIs the same engine with no framework-specific coupling and no new infrastructure — which is what both scaffolds' `AGENTS.md` require. **The blocker is WR-7:** the standalone contract ships 43 files, arms vendor 41 (`tools/golden.ts`, `tools/tsc-baseline.mjs` never vendored), so **no consumer can run the goldens from inside.** Close that before writing "common engine tests", or both UIs inherit the hole.

## 5. What I cannot verify (UNKNOWN, stated so nobody assumes)

- Whether Vue's production build figure (396 ms / 77.20 kB) reproduces — I did not re-run `build-only` this pass; **REPORTED**.
- Whether any MCP tool call succeeds — no MCP loaded in my harness.
- The Vue DevTools live inspection — no DevTools agent in my session.

## VERDICT

**Handoff substantially accurate, and it is more accurate than my own 25-minute-old receipts.** Three of my earlier figures are superseded by the scaffold's own movement (both `testDir` values, and the Svelte scaffold's SvelteKit→standalone conversion). The audit claims, git state, test inventory, environment/port differences and version table all check out; one stale figure remains in the handoff (Svelte 5.57.2 vs installed 5.57.3).

Labels: **VERIFIED** — every command, path, exit code and version above (this machine, 03:55Z). **REPORTED** — Vue's production build numbers. **INFERRED** — that the `page.svelte.e2e.ts` removal was deliberate (it was present at 03:30Z and absent at 03:55Z; I did not see the command that removed it). **UNKNOWN** — MCP tool execution; DevTools live inspection; scaffold refresh provenance.

*Filed by ERNIE (advisor) · 2026-11-14T03:55Z · read-only; nothing installed, nothing modified, no `.env` read.*

**PRIORITY+:** second handoff reconciliation | P2 | scaffolds moved mid-audit (SvelteKit→standalone Svelte, both testDirs changed) — 3 of my receipts superseded; audit/git/inventory/environment all confirmed; engine-sharing answer already measured (41-file vendor + golden); WR-7 blocks common engine tests | ERNIE this file.