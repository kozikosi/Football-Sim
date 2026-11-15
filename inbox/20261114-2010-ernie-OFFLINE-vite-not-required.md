SPEAKER: ernie | ROLE: council advisor · experiment | TASK: does the offline requirement force us off Vite? Tested three build routes against vanilla file:// | DATE: 2026-11-15T17:10Z
FOR: MUSE · the Architect · Z.ai · P-287

**No. Two Vite-native routes both boot from vanilla `file://` with zero flags. Switching bundler is not required, and one of the two routes also satisfies the "one self-contained HTML file" requirement exactly.**

---

## 1 · The three routes, measured on the same arm

Same Svelte 5 + Vite player-card build, same machine, same probe, **no `--allow-file-access-from-files` flag in any run**:

| Route | Files in `dist/` | Vanilla `file://` | Mount | Size (gz) |
|---|---|---|---|---|
| **A · default** (`format: 'esm'`, module + `crossorigin`) | 3 | **FAIL** — 0 cards; CSS and JS CORS-blocked | — | 40.25 kB |
| **B · IIFE + classic tag** | 3 | **PASS** — 6 cards, 0 errors, 0 blocked, 390 clean | **124 ms** | 40.4 kB |
| **C · `vite-plugin-singlefile`** | **1** | **PASS** — 6 cards, 0 errors, 0 blocked, 390 clean | **133 ms** | **15.94 kB gz in one 40,545 B HTML** |

**Receipts:**

```
cmd: (route A) JS=app.js node probe.mjs
out: mountedMs null · cards 0
     "Access to CSS stylesheet … blocked by CORS policy"  (index-Do3gFrSf.css)
     "Access to script … blocked by CORS policy"          (index-CrsA18_L.js)

cmd: (route B) JS=app.js node probe.mjs      →  mountedMs 124 · blocked [] · cards 6 · sw 390 = vw 390
cmd: (route C) node probe.mjs                →  mountedMs 133 · errors [] · blocked [] · cards 6 · sw 390 = vw 390
```

## 2 · What the defect actually is

**Not Vite. Not the framework. Two things about ES modules under `file://`:**

1. **`<script type="module" crossorigin>`** — an ES module fetch is a CORS fetch **by spec**, with or without the attribute. From `file://`, origin is `null`, and the fetch is refused. **Stripping `crossorigin` alone fixes the CSS and not the script** — I tested that first, and the script still failed. That is why the naive fix does not work.
2. **The stylesheet** — `<link rel="stylesheet" crossorigin>` is refused the same way, but **removing the attribute is sufficient** for CSS.

**So the minimal fix is two changes, not a bundler change:** make the JS a **classic script** (not a module), and drop `crossorigin` from the stylesheet.

## 5 · The two routes, precisely

**Route B — IIFE, multi-file:**

```js
// vite.config.js
export default defineConfig({
  base: './',
  plugins: [svelte()],                     // or vue()
  build: {
    modulePreload: false,
    cssCodeSplit: false,
    rollupOptions: { output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'assets/app.js' } }
  }
});
```

plus a post-build step over `dist/index.html` (two lines):

```python
s = re.sub(r'<script type="module" crossorigin src="([^"]+)"></script>', r'<script defer src="\1"></script>', s)
s = re.sub(r'(<link rel="stylesheet") crossorigin', r'\1', s)
```

**Route C — one file:**

```js
import { viteSingleFile } from 'vite-plugin-singlefile';
export default defineConfig({ base: './', plugins: [svelte(), viteSingleFile()] });
```

No post-processing. One 40,545 B HTML.

## 4 · My recommendation

**Route C.** It is one plugin, no post-build regex to drift, and **it is the only one of the three that satisfies the product's stated shape** — *"one self-contained HTML file: no paid API, no CDN, no build step for the user."* Route B needs a post-build step that nothing owns, and a post-build step is exactly the kind of thing that gets forgotten in the next wave.

**Route B is the fallback** if the single-file build proves too large at product scale. At card scale it is 15.94 kB gz in one file; **the four-slice arm will be much larger inlined, and that is the number to measure before committing** — a 103 kB gz JS bundle inlined as base64/text grows the HTML and may break the "no build step for the user" comfort.

**Route A stays the dev-server default.** It is correct for `npm run dev` and `vite preview` over http. Only the *shipped* artefact needs B or C.

## 5 · What this changes

**The offline defect is a packaging defect with a two-line fix, and it does not bear on the framework question at all.** I confirmed it earlier in both arms; this confirms the fix is bundler-side and framework-neutral.

**And it means neither arm is disqualified by offline.** Both can ship a `file://`-clean artefact today, on Vite, with one config change.

---

Labels: **VERIFIED** — all three routes built (exit 0 each), all three vanilla probes verbatim, the strip-`crossorigin`-alone failure, the file counts and sizes, the 390 px scrollWidth on both passing routes, the `.gitattributes` `text=auto` (so a CRLF checkout would change the digests). **REPORTED** — nothing. **INFERRED** — that route C will be large at four-slice scale (I did not build it; the card is 15.94 kB gz inlined and the four-slice JS alone is 103 kB gz). **UNKNOWN** — whether the Owner wants one HTML file or a multi-file dist; **that is the only decision left**, and both routes are ready for either.

— ernie (advisor) · 2026-11-15T17:10Z · read-only on every other seat's branch.