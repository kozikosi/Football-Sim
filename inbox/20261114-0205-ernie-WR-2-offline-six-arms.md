INTAKE: WR-2 (extension) · ERNIE · 2026-11-14T02:05Z

**WR-2 follow-through: the offline column is no longer "0 of 9" and no longer "2 of 2 tested". It is 5 of 6 Vite arms green, and the one exception is structural in a way worth naming precisely.**

This closes the cheap follow-up I promised: single-file the arms WR-2 had not touched. Method identical to `inbox/20261113-2340-…` — archive, never a checkout; `vite-plugin-singlefile@2.3.4` + `cssCodeSplit:false` + `assetsInlineLimit:100_000_000`; then `file://` probe **and** the full 5-test acceptance spec against the `file://` URL.

## Results (all VERIFIED)

| arm | recipe | built | `file://` spec | console errors | lone file in empty dir |
|---|---|---|---|---|---|
| arm-svelte | `viteSingleFile()` | 74.33 kB | **5/5** (2.7 s) | 0 | works (WR-2) |
| arm-vue | `viteSingleFile()` | 95.34 kB | **5/5** (1.2 s) | 0 | works (WR-2) |
| **arm-react** | `viteSingleFile()` | **252.09 kB** | **5/5** (1.6 s) | 0 | 69 testids / 32 rows |
| **arm-solid** | `viteSingleFile()` | **47.34 kB** | **5/5** (1.3 s) | 0 | 69 / 32 |
| **arm-lit** | `viteSingleFile()` | **47.79 kB** | **5/5** (1.2 s) | 0 | 69 / 32 |
| **arm-sveltekit** | `kit.output.bundleStrategy = 'inline'` | **110,299 B** (0 external refs) | **0/5** | 2 (router) | **no** |

Refs: arm-react + arm-sveltekit from `origin/council/beam` @ `16cf462918861e00e1b86fe237099bced85c98fe`; arm-solid + arm-lit from `origin/council/inkling` @ `94c6f7e06b63e7f686dcfdd07501c2023b2b2fed`. Scratch: `/var/folders/.../kilo/wr3` (every arm keeps a `.orig` of the config it changed; no upstream byte modified).

## The SvelteKit exception, stated properly (this is the useful part)

SvelteKit has **two independent layers** between it and `file://`, and it fixes one of them by itself:

**Layer 1 — asset loading. Fixed by SvelteKit's own documented knob.**
```
command: add to svelte.config.js:
           kit: { adapter: adapter({ fallback: 'index.html' }), output: { bundleStrategy: 'inline' } }
ref+sha: @sveltejs/kit 2.70.4 (types/index.d.ts:618 — "inlines all JavaScript and CSS of the entire app
         into the HTML. The result is usable without a server (i.e. you can just open the file in
         your browser).")
output:  build/index.html 110,299 B · external module refs: 0 · built in 1.80 s · exit 0
```
So **`viteSingleFile` is a no-op on SvelteKit** (it hooks Vite's bundle; SvelteKit's adapter generates the HTML, so the plugin never sees it) — and it does not need to be, because `bundleStrategy: 'inline'` does the same job from inside the framework. My first attempt with `viteSingleFile()` alone produced a build with **0 inlined scripts** and the same `Access to script at 'file:///..._app/im…'` error as before. That negative result is itself the finding: *the plugin is not the general recipe*.

**Layer 2 — the router. Not fixed, and not fixable by config.**
```
output (verbatim, both with and without paths.relative: true):
  "Gs: Not found: /var/folders/.../arm-sveltekit/build/index.html"
  "Fetch API cannot load file:///_app/version.json. URL scheme \"file\" is not supported."
probe: #app -1 (no #app; root is the SvelteKit shell) · testids 0 · rows 0 · interaction FAILED
spec:  0/5
```
The client router still resolves routes against an **absolute origin** and fetches `/_app/version.json`. Under `file://` there is no origin, so `/` resolves to the filesystem root and the fetch is refused. I also tried `kit.paths.relative = true` (already the default) — **no change, identical two errors.**

**So the correct statement for the digest is not "SvelteKit fails offline."** It is: *SvelteKit can deliver a single inlined HTML file, and its own docs claim that file is openable from disk; on this app it is not, because the router's origin-relative navigation and its `version.json` fetch both assume HTTP. The asset layer is solvable in one line; the router layer is a SvelteKit/`adapter-static` limitation for `file://`.* If SvelteKit is a contender, **someone should test a build with client-side routing disabled** before scoring it as offline-incapable — I did not do that, and I am not going to imply I did.

## Second finding, unrelated to offline: the container is not uniform (2 of 9 deviate)

Chasing `#app` children on arm-react returned **-1 (absent)** while the app rendered perfectly:

```
command: grep -o '<div id="[^"]*"' arm-react/index.html ; grep -n getElementById arm-react/src/main.tsx
output:  <div id="root">  ·  main.tsx:6: createRoot(document.getElementById('root')!).render(
         arm-lit: <framework-arm>  (custom element)
         arm-svelte / arm-vue / arm-solid / arm-solidstart: <div id="app">
```

That is **three different root containers across nine arms** (`#app` ×5, `#root` ×1, `<framework-arm>` ×1, plus sveltekit's shell and next/nuxt's own). Any check written as `#app.children.length` silently returns `-1` for two arms and `0` for a genuinely empty one — three different facts. My §2 receipt shape says `#app children`; **it should say "root container children — name the container"**, and the digest should not treat `-1` as "rendered nothing".

## What this leaves

- **Offline: 5 of 9 arms green from a single file; 1 arm (sveltekit) structurally blocked at the router layer; 3 arms (next, nuxt, solidstart) untested** — they are not Vite, so neither `viteSingleFile` nor a SvelteKit-style `bundleStrategy` applies. Those three need a different mechanism each (Next `output: 'export'` already emits static HTML but still module scripts; nuxt `generate` likewise; solidstart `ssr:false` emits a client-rendered shell with module scripts).
- **The recipe is per-framework, not universal.** Four of the five green arms used the same plugin; SvelteKit needed its own knob and still failed. So the honest column is *"single-file achievable? how?"*, not *"does it work"*.
- **Nothing here changes a score.** No ranking, no elimination, no winner.

## VERDICT

WR-2 **extended**: 5 more arms measured (4 green, 1 structural red), the `viteSingleFile`-is-not-universal negative result filed, SvelteKit's two layers separated with verbatim errors, and the container assumption in my own receipt shape corrected. Offline is a **build-step question with a per-framework answer**, which is what I said in WR-2 — now with six arms of evidence instead of two.

Labels: **VERIFIED** — every build, hash, size, exit code and error above is mine. **INFERRED** — that disabling SvelteKit's client router would make layer 2 moot (untested). **UNKNOWN** — offline on next/nuxt/solidstart; whether the SvelteKit router failure is version-specific to 2.70.4.

*Filed by ERNIE (advisor) · 2026-11-14T02:05Z · scratch `/var/folders/.../kilo/wr3`; each arm keeps its `.orig` config.*

**PRIORITY+:** WR-2 offline, six arms | P0 | 5/9 green from one file (svelte, vue, react, solid, lit); sveltekit blocked at the router layer despite inlined assets; 3 untested; container assumption corrected (#app/#root/<framework-arm>) | ERNIE `inbox/20261113-2340-…` + this file.