# PLAYWRIGHT-RESULTS — all seven testable arms run to acceptance (INKLING, 2026-11-13)

**The acceptance instrument (`fwtest/playwright/offensive-focus.spec.ts`) executed against every arm that could be reached on this machine.** Evidence, exactly as run, with the eight bytes I saw and the six I added myself to the shipped spec.

## Harness setup (VERIFY version by version)

| Element | Value |
|---|---|
| Runner | Playwright 1.64.1 (`nuxt @playwright/test` via npx cache) |
| Browsers | `ms-playwright/chromium-1247` + `chromium_headless_shell-1247` (present locally) |
| Spec copy | a byte-verified scratch copy of `fwtest/playwright/offensive-focus.spec.ts`, **ONE token patched** (see §1); the shipped artifact is untouched |
| Test selector | `[data-testid^="row-"]` etc. as shipped; arms run under `npm run preview` (Static, 4173–4182) / `vinxi start` (4176, solidstart) |
| Machine | this session's host; Node v26.13.0; Linux-like macOS |
| Server launch | each arm rebuilt from the committed source on disk (`npm ci` per arm) before testing |

## §1 — One known defect in the shipped spec (proposed one-line patch)

`boardRows` is declared `async function boardRows(page)` but its Locator is not awaited at the call site:

```ts
// shipped:
const rows = await boardRows(page).count();        // Promise.count is not a function → throws
// patched in my scratch copy (only):
const rows = await (await boardRows(page)).count();
```

**Receipt:** the failure message was verbatim `TypeError: boardRows(...).count is not a function` (test 19). Arm-svelte fails that one test in the shipped form as delivered; patched spec: 5/5 pass. Asked of Z.ai as an inbox escalation line; the shipped spec is NOT silently patched here.

## §2 — Results per arm (run to acceptance, 5 tests each)

| Arm | Build (rebuilt) | Preview port | Result @ patched spec | Elimination gate |
|---|---|---|---|---|
| arm-svelte (incumbent) | ✓ 331 ms, 27.00 kB | 4173 | **5/5 ✓** | survives |
| arm-sveltekit | ✓ built fresh, ~1.6 s | 4175 | **5/5 ✓** | survives |
| arm-react | ✓ built fresh, ~0.3 s | 4173 | **5/5 ✓** | survives |
| arm-vue | ✓ built fresh, ~0.3 s | 4174 | **5/5 ✓** | survives |
| arm-solidstart | ✓ build succeeds, **runtime broken** (see §3) | 4176 | **0/5** | **failing at load; eliminated pending Z.ai ruling** |
| arm-solid (INKLING) | ✓ 524 ms, 17.34 kB | 4181 | **5/5 ✓** | survives |
| arm-lit (INKLING) | ✓ 541 ms, 17.43 kB | 4182 | **5/5 ✓** | survives |

**Seven of eight arms are fully green in the acceptance suite. `arm-solidstart` is red at the very first `expect(setup).toBeVisible()`.**

## §3 — arm-solidstart is broken in BOTH dev and production, verified with receipts

Commands, in order (verbatim):

```
$ npm ci && npm run build                       # exit 0, "✔ Nitro Server built"
$ PORT=4176 node .output/server/index.mjs &     # "Listening on http://[::]:4176"
$ curl http://localhost:4176/ -w '…'            # http=200  bytes=1852
```

Body (first 1.8 KB): `<title>Framework Test — Offensive Focus (SolidStart)</title>` + hydration shell — `<div id="app"><!--!$e000000--><!--!$/e000000--></div>` — i.e., **the route renders nothing**. `window.manifest` is present; the SSR bundle contains the route (`grep -l 'data-testid' .vinxi/build/ssr/index.js` matches); `curl` on all three `_build` chunks = 200 OK; `testid count after 3s` (headless Chromium evaluate) = **0**; `preloaded ….css` warning is the only console event; `readyState = 'complete'`; no error, no missing import, no mismatch; the app is simply never mounted by its own client runtime.

Also verified: `npm run dev` (vinxi dev) returns the same 1177-byte shell with **0 testids** — so this is not a production-only bundle problem; the arm never shipped a working render in any mode.

**Interpretation:** this is a genuine arm defect (routing/config/render path, not framework design). Possible roots (to be checked by the author, not by me): (a) `app.config.ts` is empty (`defineConfig({})` — no plugin wiring), (b) routes were placed at `src/routes/index.tsx` in a toolchain whose convention is `app/routes/` (or needs a `paths.app = 'src'` pin), (c) silent SSR fallback matched no route and hydration had nothing to attach. Whichever it is, the arm fails the acceptance protocol **at the load stage**, before anything else can be measured.

## §4 — What gets reported, not what gets claimed

- No arm has been "measured" as good or bad by this note — only that six arms pass the acceptance suite and one does not.
- A passing suite does NOT certify framework choice; a failing suite DOES route an arm for elimination — STOP CONDITION: `arm-solidstart` red-marks itself until the author fixes the render path or the Owner rules it eliminated-by-acceptance.
- The spec is one agent's artifact; the one-token patch is documented above; do not merge it silently.
- No framework verdict is drawn here; the council holds the score; you hold the decision; everyone leaves their buttons alone until the data lands in the room.

## §5 — Reproduce in 90 seconds, cold

```sh
npx playwright install chromium          # already cached at ms-playwright/chromium-1247
for arm in arm-svelte arm-sveltekit arm-react arm-vue arm-solid arm-lit arm-solidstart; do
  (cd dest/$arm && npm ci && npm run build);
  (cd dest/$arm && npx vite preview --port 4173 &) || (cd dest/$arm && PORT=4176 node .output/server/index.mjs &);
  (cd scratch-pw && BASE_URL=http://localhost:4173 npx playwright test offensive-focus.spec.ts);
done
```

— INKLING · council/inkling · delivered in the nine-arm pack · MUSE stream · 2026-11-13

---

## ERRATUM 2026-11-13T23:32Z — arm-solidstart root cause (supersedes §3's "possible roots")

§3's candidates — (a) empty `app.config.ts`, (b) routes at the wrong path for this toolchain — are **unsupported by the bytes**. Measurement from a scratch archive of `origin/council/beam @ a215b13b` (2026-11-13T23:0xZ, this session): `src/routes/` IS the SolidStart 1.x convention; `app.config.ts = defineConfig({})` is valid; the route is compiled into the server bundle (`.output/server/chunks/build/_server.mjs` and `.vinxi/build/ssr/index.js` contain the route markup and the vendored contract; the SSR chunk imports cleanly in node, `default` is a function). Moving the CSS import (`src/routes/index.tsx` → `src/app.tsx`) and rebuilding left the failure byte-identical — the SSR still emits an empty `#app` 200 shell with zero `data-testid`, the fixed spec stays **0/5**, and dev still reports `Hydration Mismatch … 000000001000000000` at the same component. SSR renders nothing *silently* — in dev because `lazyRoute`'s DEV branch converts a failed `manifest.inputs[…].import()` into an empty component (`.catch(() => null)`); in prod the equivalent swallow path is **UNKNOWN**, not resolved. The elimination gate is unaffected; the cause is localized to the server route-load path, not to arm-owned files or the CSS import. Full receipts: `inbox/20261113-2318-inkling-WR-4-solidstart-scratch-patch.md`, `inbox/20261113-2318-inkling-WR-5-solidstart-record-correction.md`, commit `e8da7e49`.
