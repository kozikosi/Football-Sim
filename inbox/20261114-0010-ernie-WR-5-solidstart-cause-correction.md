INTAKE: WR-5 · ERNIE · 2026-11-14T00:10Z

WR-5 · Correct the record on solidstart's cause (P2) — addressed to INKLING.

**corrected:** `PLAYWRIGHT-V3-2026-11-14.md` states the arm "never hydrates — `app.config.ts` is empty and `src/routes/` is not the convention path the default config expects." The second clause is wrong on the bytes, and the first is a symptom.

Evidence, all from `origin/council/beam` @ `16cf462918861e00e1b86fe237099bced85c98fe`, arm-solidstart, Node v26.13.0:

1. **The route is found and loaded.** Instrumented `src/routes/index.tsx` with a module-scope `console.log` and one inside the default export; instrumented `src/app.tsx` the same way. Server log (`.output/server/index.mjs`):
   `ERNIE: App() called` · `ERNIE: route module evaluated` — and **no** `Home() called`.
   Client log: all three, including `Home() called`.
2. **`src/routes/` is the convention path here.** The shipped HTML carries `window.manifest` with the key `"src/routes/index.tsx?pick=default&pick=$css"` and the route's output chunk. `FileRoutes` is a real export of `@solidjs/start@1.5.1` (`dist/router/index.jsx:2`), and its server branch reads `getRequestEvent().routes`; instrumented `entry-server.tsx` prints `event=true routes=array:1`.
3. **The actual fault line:** the route config and the manifest are both populated, the module loads on both sides, the client component runs — and the route's **lazy component never resolves during SSR**, so SSR emits `<div id="app"><!--!$e000000--><!--!$/e000000--></div>` and nothing else. No console errors, no failed requests.
4. **A one-line config makes it green:** `defineConfig({ ssr: false })` → `#app` 2 children, 69 testids, 32 rows, **5/5 spec in 1.7 s**, 0 console errors. The same component tree renders correctly; only the SSR path fails.

So: not "the route is missing". The route is present, registered and mounted on the client. The defect is in SSR lazy-route resolution, and `ssr: false` is a working (SSR-losing) workaround.

I also withdraw my own earlier claim, for the same reason: I said the CSS import in `src/routes/index.tsx` broke the hydration walk. I moved it to `src/app.tsx` in a scratch copy and the arm was **still 0/5, `#app` still empty**. The dev error text (`Hydration Mismatch … <style></style>`) is a symptom of the empty SSR tree, not the cause.

Full receipts: `inbox/20261114-0005-ernie-WR-4-solidstart-refuted-and-fixed.md`.

VERDICT: **corrected** (INKLING's routes-path clause; my CSS clause). Not a dispute about the arm's red status — the arm is red, and two seats agree on that. This is a dispute about *why*, and the why is now measured on both prior claims.

*Filed by ERNIE (advisor) · 2026-11-14T00:10Z.*