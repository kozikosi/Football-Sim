INTAKE: WR-4 · inkling · 2026-11-13T23:18Z
SPEAKER: inkling | ROLE: council | TASK: WR-4 — settle arm-solidstart's fix in a scratch copy | DATE: 2026-11-13T23:18Z
FOR: INKLING's digest · v3 order 0.4 · the arm's survival

## What WR-4 asks, and what the receipts show

**Deliverable as written:** in a scratch copy (never Z.ai's bytes), move `import '../app.css'` from `src/routes/index.tsx` to the client entry (or `app.tsx`), rebuild, and report before/after: `#app.children.length`, `[data-hk]` count, the dev error text, and the spec result.

**Result of that experiment (this machine, scratch archive of the v2 bytes):**

- cwd: `$SCRATCH/zai-fwtest7-dynamic-engine-2026-11-13/fwtest-7/arm-solidstart/` — `git archive a215b13b -- zai-fwtest7-dynamic-engine-2026-11-13/fwtest-7/arm-solidstart | tar -x -C $SCRATCH` (bytes ref: `origin/council/beam @ a215b13b` — the same bytes ERNIE measured); scratch copy, Z.ai's bytes never edited; every step below ran in the scratch copy.
- env: node v26.13.0 · npm 11.20.0 · macOS · Playwright 1.64.1, fixed spec (`boardRows` without `async`), Chromium cached
- **Before (unpatched scratch):** `npm ci` exit 0 (530 packages); `npm run build` exit 0 (`[vinxi] ✔ Nitro Server built`, `.output/server/chunks/build/_server.mjs` contains the route markup — `grep -c "pregame"` → 2); `node .output/server/index.mjs` (PORT=3100) → `curl /` = **1852 B**, `<div id="app"><!--!$e000000--><!--!$/e000000--></div>`, **0 `data-testid`**, HTTP 200, server log clean. Browser probe (playwright): `#app children=0 testids=0`, **zero console errors / pageerrors / failed requests**. Dev server (`npx vinxi dev`, PORT=3102): `[console:error] Error: Hydration Mismatch. Unable to find DOM nodes for hydration key: 000000001000000000` with stack `…/src/routes/index.tsx?import&pick=default&pick=$css:60:16 → Home2`; `window.manifest = {}`.
- **Patch applied (exactly WR-4's first option):** removed `import '../app.css';` from `src/routes/index.tsx`; added `import './app.css';` to `src/app.tsx`. Rebuild: exit 0. Restart: `curl /` = **1942 B**, still `<div id="app"><!--!$e0000000--><!--!$/e0000000--></div>`, **0 `data-testid`**. Dev probe after patch: same `Hydration Mismatch … 000000001000000000` at the same `Home2` site.
- **After (patched):** fixed spec → **0/5** (all five fail; e.g. `getByTestId('setup')` not found). `[data-hk]` count: 0 in SSR HTML (both before and after). `#app.children.length`: 0 (prod, both).
- **VERDICT: NOT a fix.** The CSS import in the route is not the cause (or not the only cause) of the empty SSR / hydration failure. The patch was filed to Z.ai as an experiment result, not a repair.

## Where the evidence points instead

Source: `node_modules/@solidjs/start/dist/router/lazyRoute.js` (v1.5.1, shipped in the arm) —

```js
if (import.meta.env.DEV) {
  const mod = await manifest.inputs[component.src].import().catch(() => null);
  // fallback to an empty component as any errors will surface in the vite overlay
  if (!mod) return { default: () => [] };
  …
```

In DEV the SSR route import failing falls back to an **empty component with no error surfaced to the server**. The SSR output seen in both dev (`<!--!$e0000000--><!--!$/e0000000-->` = SSR `ErrorBoundary` markers around an empty child) and prod (200, empty `#app`, clean server log) is exactly this signature. The route module is not inherently unloadable — direct `node -e "import('file://…/.vinxi/build/ssr/index.js').then(m => …)"` on the **unpatched** scratch build prints `IMPORT OK keys: [ 'default' ]` (default is a function). The production path has no such silent fallback (`const mod = await load()` — a reject would propagate to the shared `ErrorBoundary`), yet prod also emits the same empty shell with HTTP 200 and no logged error; that part is **UNKNOWN**, not resolved, and may involve the `globalThis.MANIFEST` / `chunks/build/_server.mjs` vs `.vinxi/build/ssr/index.js` name drift (the nitro bundle imports `../build/_server.mjs`, which exists).

## Consequences for the digest

- arm-solidstart stays **0/5 at load** on this machine, before and after the WR-4 patch. The elimination-by-correctness-gate position is unchanged; it is the Owner's.
- Two named hypotheses are now both falsified-or-unsupported: the `app.config.ts`/routes-convention theory (INKLING's, corrected in the delivery erratum, commit `e8da7e49`) and the CSS-import-in-route theory (ERNIE's, not reproduced here).
- Remaining unknowns for whoever picks it up next: (a) the actual DEV input whose `import()` throws — patch local `lazyRoute.js` in a scratch copy to `console.error(mod === null ? 'ROUTE IMPORT FAILED' : mod)` or log the caught error, rebuild, hit `/` once; (b) the prod silent-empty-shell path (error swallowed between SSR stream and `$e` boundary) — same scratch method on `.output/server/chunks/nitro/nitro.mjs`; (c) whether this reproduces identically on Node 24 (v3's author env) rather than Node 26.
- **The v3 order's 0.4 gate stays red-elimination or further diagnosis — but not "the arm needs a CSS move."** Any repair must target the server route-load path (or the manifest mismatch), with the same receipt shape.

## Four lines (per claim above)

1. cwd `…/opencode/wr5-20261113/zai-fwtest7-dynamic-engine-2026-11-13/fwtest-7/arm-solidstart` · cmd `npm ci` → exit 0, 530 pkgs · ref `origin/council/beam @ a215b13b` · output `npm warn install-scripts … added 530 packages`.
2. cwd same · cmd `npm run build` (patched and unpatched) → exit 0 · output `[vinxi] ✔ Nitro Server built` / `✔ built in 381ms` (unpatched).
3. cwd same · cmd `node .output/server/index.mjs` (PORT=3100) + `curl -s http://localhost:3100/` · output: 1852 B, `<!--!$e000000--><!--!$/e000000-->`, zero testids; identical modulo the moved CSS link tag at 1942 B after patch.
4. cwd `/private/tmp/pw-harness` · cmd `BASE_URL=http://localhost:3100 npx playwright test offensive-focus.spec.ts --reporter=line` → `5 failed` (all at load) · ref: patched scratch build · env Playwright 1.64.1.

VERIFIED (everything above, this session). UNKNOWN: the exact failing DEV `import()` input; the PROD swallow path; Node 24 behaviour.
EVIDENCE: scratch archive of `a215b13b`; no bytes on any council branch or in Z.ai's/INKLING's delivery dirs were modified — the arm is read-only to everyone but its author.
