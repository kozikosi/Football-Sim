INTAKE: WR-4 · ERNIE · 2026-11-14T00:05Z

WR-4 · arm-solidstart: prove the fix in a scratch copy (P1).

**Outcome: neither filed cause is right. My own CSS hypothesis is refuted by my own test, and so is INKLING's routes-path claim. The measured fault is that the route's component never resolves during SSR — and `ssr: false` renders the arm correctly, 5/5.**

Environment: macOS (darwin arm64) · Node **v26.13.0** · npm 11.20.0 · Playwright 1.64.1.
Bytes (archive, no checkout): `origin/council/beam` @ **`16cf462918861e00e1b86fe237099bced85c98fe`** → `zai-fwtest7-dynamic-engine-2026-11-13/fwtest-7/arm-solidstart/`.
All edits are in scratch copies under `/var/folders/.../kilo/wr1-ernie/`; the arm's own bytes were not touched. Installed versions: `@solidjs/start@1.5.1`, `@solidjs/router@0.15.4`, `solid-js@1.9.19`, `vinxi@0.5.11`, `typescript@5.9.3` — mutually consistent, no peer skew (`@solidjs/start` peer: `vinxi ^0.5.7`).

## Baseline, re-measured (VERIFIED — confirms both prior seats)

```
cwd:     …/kilo/wr1-ernie/ss/…/arm-solidstart
command: npm ci → exit 0 · npm run build → exit 0 ("[vinxi] ✔ Nitro Server built") · PORT=4341 node .output/server/index.mjs
output:  GET / → 200, **1852 B** HTML; `<div id="app"><!--!$e000000--><!--!$/e000000--></div>`
probe:   #app children 0 · testids 0 · rows 0 · console errors 0 · failed requests 0 · #app innerHTML length 0
spec:    0/5 (all five fail at load)
```

The 1852 B and the empty Suspense boundary are exactly what the two prior filings describe. Confirmed.

## Test 1 — the dev error text (the arbiter, VERBATIM)

```
command:    npm run dev -- --port 4342, then Playwright capturing console + pageerror
output:     "Error: Hydration Mismatch. Unable to find DOM nodes for hydration key: 00000000100000000
             <style></style>
               at getNextElement (…/.vinxi/client/deps/chunk-ZNDOGB7J.js:351:13)
               at …/@solidjs/start/dist/server/renderAsset.jsx:10:16
               at Object.style (…/renderAsset.jsx:15:5)
               at renderAsset (…/renderAsset.jsx:52:23)
               at …/@solidjs/start/dist/router/lazyRoute.js:38:40"
```

That is a real error and it is real evidence — but it is a **symptom of the empty SSR tree**, not the cause: `renderAsset` is trying to hydrate a `<style>` node that SSR never emitted, because SSR emitted no route markup at all.

## Test 2 — my own CSS hypothesis: **REFUTED** (VERIFIED)

Moved `import '../app.css'` out of `src/routes/index.tsx` into `src/app.tsx` (the client root), exactly as WR-4 proposed.

```
diff:  src/routes/index.tsx  -import '../app.css';
       src/app.tsx          +import './app.css';
build: exit 0; manifest changed as expected — the CSS moved from the route entry to `virtual:$vinxi/handler/client`
        (baseline route entry: "src/routes/index.tsx?pick=default&pick=$css" carried index-n6r9_hk7.css;
         after the move the route entry carries only JS and client-n6r9_hk7.css is a client asset)
probe: #app children 0 · testids 0 · **0/5 still fails** · console errors 0 · failed requests 0
```

**My earlier diagnosis was wrong.** I said the CSS import broke the hydration walk; moving it changes nothing. I withdraw it.

## Test 3 — INKLING's routes-path hypothesis: **REFUTED** (VERIFIED)

The route is found, loaded and rendered-attempted. Three independent pieces of byte evidence:

```
1. server bundle:   .output/server/chunks/build/_server.mjs contains the route's own markup ("Framework Test — Offensive Focus", "pregame") — grep -c → 1
2. client bundle:   .output/public/_build/assets/index-q5tUe0E-.js contains the same text
3. runtime log (instrumented copy, console.log in the route module and in Home()):
   SSR log:  "ERNIE: App() called" · "ERNIE: route module evaluated"   — and NO "ERNIE: Home() called"
   client:   "ERNIE: App() called" · "ERNIE: route module evaluated" · "ERNIE: Home() called"
```

So `src/routes/index.tsx` **is** the convention path, the module **is** evaluated on both sides, and on the **client** `Home()` runs — yet `#app` stays empty with **zero console errors and zero failed requests**.

## Test 4 — where it actually breaks (VERIFIED)

`FileRoutes` on the server is `() => getRequestEvent().routes` (`@solidjs/start@1.5.1`, `dist/router/FileRoutes.jsx:29-31`). Instrumented `entry-server.tsx`:

```
ERNIE-SES: event=true routes=array:1 keys=request,response,clientAddress,locals,nativeEvent,manifest,assets,router,routes,complete,$islands
```

The request event **is** populated with 1 route. The route config is present in `window.manifest` in the shipped HTML. But `Home()` is never invoked during SSR, and SSR emits only an empty Suspense boundary.

**Therefore: the route is registered, the event is populated, the module is loaded — and the lazy route component still never resolves on the server.** The break is in the lazy-route/asset resolution path during SSR, not in the file layout and not in the CSS. That is as far as I can name it without patching `@solidjs/start` itself, which I will not do.

## Test 5 — the fix that works (VERIFIED)

One line, in `app.config.ts`:

```ts
export default defineConfig({ ssr: false });
```

```
cwd:     …/kilo/wr1-ernie/ss-spa/… (scratch copy, app.config.ts is the only changed file)
build:   npm run build → exit 0, "[vinxi] ℹ Prerendered 1 routes", .output/public/index.html produced
probe:   #app children **2** · testids **69** · rows **32** · focus click priority "3" -> "-1" changed=true · console errors **0** · overflow 0
spec:    **5/5 passed, 1.7 s**
```

`ssr: false` makes arm-solidstart identical to the other arms on every measured column: 69 testids, 32 rows, 0 px overflow at 390, 5/5 spec, 0 console errors.

**What that costs, stated plainly:** SPA mode removes server rendering. First paint is client-side only, there is no per-route HTML for a crawler or a no-JS reader, and the SSR-only code paths go unexercised. It is a legitimate build mode and it is a **trade**, not a free repair. It is also not mine to choose: the arm is Z.ai's bytes.

## What I am asking the record to carry

1. **Withdraw my earlier cause.** ERNIE's "CSS import in `routes/index.tsx` breaks the hydration walk" is **refuted by direct test** (Test 2). It was inferred from the dev error text; the text is a symptom.
2. **Withdraw INKLING's cause.** "`src/routes/` is not the convention path the default config expects" is **refuted** (Test 3): the module is loaded and evaluated on both sides and the client renders `Home()`.
3. **The measured cause:** the lazy route component never resolves during SSR; the request event and the manifest are both populated. Precise fault line, unresolved mechanism.
4. **A working config exists today** (`ssr: false`, 5/5) if the Owner wants the arm green this wave, with the SSR trade-off stated.
5. **The `0/5 red` row should not be scored as a framework verdict.** The component tree is healthy and the same code passes in SPA mode. Whatever the correctness gate concludes, it should say *arm wiring*, and it should say which wiring — SSR lazy-route resolution — not "the route is missing".

## VERDICT

WR-4 **done, and it overturns two filings including mine.** The scratch fix proposed by the WR (move the CSS import) does **not** fix the arm; I refuted it. A different one-line change (`ssr: false`) does fix it, at the cost of SSR. The residual SSR defect is named as far as the bytes allow and is not further attributed.

Labels: **VERIFIED** — every command, log line and output above is mine, from the pinned ref. **REFUTED** — ERNIE's CSS cause (mine) and INKLING's routes-path cause (theirs). **UNKNOWN** — the exact line inside `@solidjs/start` where the lazy route fails to resolve; I did not patch a dependency to find it.

*Filed by ERNIE (advisor) · 2026-11-14T00:05Z · scratch `/var/folders/.../kilo/wr1-ernie/{ss,ss-fixed,ss-probe,ss-spa,ss-root}` — re-extractable from `origin/council/beam` @ `16cf4629`. Each scratch copy carries its own `.orig` backups; no upstream byte was modified.*

**PRIORITY+:** WR-4 solidstart repair proof | P1 | RESOLVED-AS-REFUTATION: CSS cause and routes-path cause both refuted by test; `ssr:false` is green at 5/5; residual defect is SSR lazy-route resolution | ERNIE `inbox/20261113-2320-…` + this file.