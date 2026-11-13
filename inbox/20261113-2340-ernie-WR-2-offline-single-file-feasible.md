INTAKE: WR-2 · ERNIE · 2026-11-13T23:40Z

WR-2 · Offline: is it a framework axis or a build step? (P0). **Answer: a build step.** Two arms, two different compilers, both made single-file with the same two-line config change; both then render, hydrate and respond from `file://` with **zero console errors**, and both pass **5/5** on the acceptance spec offline. A single `index.html` alone in an empty directory — no favicon, no assets, no server — works.

Environment: macOS (darwin arm64) · Node **v26.13.0** · npm **11.20.0** · Playwright **1.64.1** · chromium (Playwright-cached).

## The one variable that changed

`vite-plugin-singlefile@2.3.4`, added to each arm's existing Vite config. Nothing else. The exact config diff (identical in both arms, only the framework plugin line differs):

```diff
--- a/vite.config.ts
+++ b/vite.config.ts
@@
 import { svelte } from '@sveltejs/vite-plugin-svelte'   // arm-vue: import vue from '@vitejs/plugin-vue'
 import { defineConfig } from 'vite'
+import { viteSingleFile } from 'vite-plugin-singlefile'
 
-// https://vite.dev/config/
 export default defineConfig({
-  plugins: [svelte()],
+  plugins: [svelte(), viteSingleFile()],
+  build: {
+    cssCodeSplit: false,
+    assetsInlineLimit: 100_000_000,
+    modulePreload: false,
+  },
 })
```

Byte provenance of the copy I modified (archive, not checkout):

```
command:    git archive 16cf462918861e00e1b86fe237099bced85c98fe -- zai-fwtest7-dynamic-engine-2026-11-13/fwtest-7/arm-{svelte,vue} | tar -x -C /var/folders/.../kilo/wr1-ernie/{ctrl,vue}
ref + sha:  origin/council/beam @ 16cf462918861e00e1b86fe237099bced85c98fe  (VERIFIED: `git rev-parse origin/council/beam` returned this at extraction time; the branch moved from 04cefbf5 earlier in the session)
```

## arm-svelte — single file (VERIFIED)

```
cwd:        /var/folders/.../kilo/wr1-ernie/wr2-singlefile   (a scratch copy; the arm's own bytes were never edited)
build:      npm run build → exit 0, 319 ms, 129 modules
            [plugin vite:singlefile] Inlining: index-BBpTgRRY.js · Inlining: style-ByBWXECe.css
output:     dist/index.html 74.33 kB (gzip 28.88 kB) · plus favicon.svg, icons.svg (unused by the app)
            dist total 96 KB → 1 HTML file + 2 unused svg
BEFORE:     dist/assets/index-*.js 68,790 B + index-*.css 5,790 B + index.html 0.45 kB  (separate files, module script)
file://:    PASS — `file:///…/wr2-singlefile/dist/index.html`
              #app children = 1 · testids 69 · rows 32 · focus click: priority "3" -> "-1" changed=true · console errors 0
spec:       5/5 passed, 2.7 s   (all five, run against the file:// URL — offline.spec.ts, goto(PATH) instead of goto('/'))
alone:      PASS — copied to an empty dir with no favicon and no assets/:
              `#app` 1 child, 69 testids, 32 rows, interaction changed, 0 console errors
```

## arm-vue — single file (VERIFIED) — the generalisation test

```
cwd:        /var/folders/.../kilo/wr1-ernie/vue/…/arm-vue
build:      npm run build → exit 0, 407 ms, same two Inlining lines
output:     dist/index.html 95.34 kB (gzip 37.86 kB) · dist 116 KB
file://:    PASS — #app children = 1 · testids 69 · rows 32 · priority "3" -> "-1" changed=true · console errors 0
spec:       5/5 passed, 1.2 s
alone:      PASS — 95,342 B index.html alone in an empty dir: 69 testids, 32 rows, interaction changed, 0 console errors
```

## What this settles

1. **`file://` is not a framework property.** My earlier measurement — "offline fails on all seven tested arms; `base:'./'` does not fix it" — was correct **about the arms as shipped**, and wrong as a statement about the frameworks. The cause is that the shipped configs emit ES module `<script src>` and external CSS, and `file://` blocks both from a `null` origin. Inline them and the block disappears.
2. **`base: './'` was never the right knob.** It rewrites the URLs to relative; it does not inline anything. So my earlier negative result on `base:'./'` stands as measured and is explained: it addresses a different failure.
3. **The product's "one self-contained HTML file" requirement does not rule out a framework build.** Both compilers emit a single HTML file that needs no server, no network, no sibling files. This is the answer the Owner asked for: offline is a **product build step** (choose single-file output), and the framework decision can therefore be made on the other columns.
4. **What this does NOT show.** (a) It does not show every arm can — two of nine tested here, both Vite-based; the three non-Vite arms (next/nuxt/solidstart) are untested for this. (b) It does not compare size fairly: the arms carry only the engine-contract subset, so 74 kB / 95 kB says nothing about what the full 650 KB product would weigh as a framework build. (c) It does not remove the authoring-time toolchain — the build still needs Node and npm; only the *output* becomes one file, which is what the requirement constrains.

## Recommendation to the digest (not a verdict, not a ranking)

Report the offline column as: **`file://` as shipped: 0 of 9. `file://` after a single-file build: 2 of 2 tested (arm-svelte, arm-vue), 5/5 spec each.** Then either (a) the remaining seven arms get the same two-line treatment by whoever owns the column, or (b) the column is retired and offline moves to the product build step, where it is a solved problem with a known recipe.

The recipe is four lines and it is framework-neutral for any Vite arm:
`npm i -D vite-plugin-singlefile` · add `viteSingleFile()` to plugins · `build.cssCodeSplit=false` · `build.assetsInlineLimit=100_000_000`.

## VERDICT

WR-2 **answered**. Offline is a build step, not a framework axis, on the evidence of two arms built single-file and passing the full acceptance suite from `file://` with zero console errors, one of them as a lone HTML file in an empty directory.

Labels: **VERIFIED** — every command and output above is mine. The "does not generalise to non-Vite arms" gap is **UNKNOWN**, explicitly not tested. The size comparison is **no signal** and I am not scoring it.

*Filed by ERNIE (advisor) · 2026-11-13T23:40Z · scratch `/var/folders/.../kilo/wr1-ernie/{wr2-singlefile,vue,alone-svelte,alone-vue}` — re-extractable from `origin/council/beam` @ `16cf4629`. The arms' own bytes were not modified; both edits are in scratch copies with `.orig` backups of the configs.*

**PRIORITY+:** WR-2 offline/single-file feasibility | P0 | RESOLVED: offline is a product build step, not a framework axis — two arms single-filed and 5/5 from file:// | ERNIE `inbox/20261113-2320-…` + this file.