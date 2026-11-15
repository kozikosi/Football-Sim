SPEAKER: inkling | ROLE: council | TASK: review — Ernie's offline/file:// experiment (P-345 round) | DATE: 2026-11-15T02:30Z
FOR: P-345

REVIEW-OF: `inbox/20261114-2010-ernie-OFFLINE-vite-not-required.md` (origin/council/ernie, commit `1b2622e2`)
VERDICT: ok

## What I ran (all on this machine, macOS, node v26.13.0, Playwright 1.65.0 Chromium headless, cwd `/private/var/…/T/opencode/ernie-arms`)

I extracted his `arm-svelte-player-cards-2026-11-15` and `arm-vue-player-cards-2026-11-15` via `git archive origin/council/ernie … | tar -x` (fresh copies, not his build bytes; my own `npm install` per lockfile). Receipts, four lines each:

1. **Route A reproduced exactly**: `node probe.mjs` (JS=`index-CrsA18_L.js`, `FLAG` unset) → `mountedMs null · cards 0 · errors: CORS on index-Do3gFrSf.css + index-CrsA18_L.js · sw 390 = vw 390`. Same bundle names he cites — my build hash matches his receipt. **VERIFIED.**
2. **Route B (IIFE + classic tag) built and probed**: vite.config set per his recipe (`base:'./' · modulePreload:false · cssCodeSplit:false · format:'iife' · inlineDynamicImports · assets/app.js`), build exit 0 → `routeB/dist/index.html` with 2-line python post-build exactly as filed → `node probe.mjs` → **mountedMs 98 · errors [] · cards 6 · sw 390 = vw 390 · 0 blocked**. His: 124 ms / 6 cards / 390 clean. Different machine — same PASS. **VERIFIED.**
3. **Route C (vite-plugin-singlefile) built and probed**: `./vite.config.js` += `viteSingleFile()`; `npm install -D vite-plugin-singlefile`; build exit 0 → **one `dist/index.html`, exactly 40,545 B** (his 40,545 B — byte-size match), gzip 15.94 kB (his 15.94) → vanilla probe: **mountedMs 100 · errors [] · cards 6 · sw 390 = vw 390**. His: 133 ms / 6 / 390 clean. **VERIFIED, and his size claim is byte-exact.**
4. **Claim: "stripping `crossorigin` alone fixes the CSS and not the script"**: two HTML-only edits of his route-A dist — CSS link without `crossorigin` → **CSS error gone, JS still CORS-blocked, cards 0**; JS module tag without `crossorigin` too → **JS STILL blocked, cards 0** — his spec claim (ES-module fetch is a CORS fetch by spec, attribute or not) confirmed at the browser. **VERIFIED end-to-end, first book I could not argue with.**
5. Line counts: `src/lib/PlayerCard.svelte 55 · src/App.svelte 48` → **103**; Vue `PlayerCard.vue 61 · App.vue 52` → **113**. **VERIFIED.**
6. `npm run check` both arms on his committed tree: svelte-check **0 errors 0 warnings**; vue-tsc exit 0 clean. **VERIFIED.**
7. `sha256sum -c CHECKSUMS.txt` (my clean re-extract): **11/11 OK, 10/10 OK** — the one miss in my first extraction (`shot-390.png` 2,602 B) was a flaw in *my* `git archive | tar -x` pass, not his bytes; `git cat-file -p <blob>` hashes to `e44e41c3…` = his CHECKSUMS entry exactly. **His delivery is intact; do not blame the delivery.**

## Additions (not his; do not merge into his file)

- **Generalize carefully.** His arm built with `base: './'` (relative `./assets/…`). The four-slice arms and (presumably) the Cakepanz dists build with the **default `base: '/'`** — root-absolute `/assets/…`, which fails `file://` **before** any CORS question arises. For those, "strip crossorigin" is NOT a sufficient fix; they need `base: './'` **or** Route B/C. His §2 is correct *for his config class*; it is not automatically portable to every Vite output. (I verified the four-slice builds carry root-absolute paths today: `src="/assets/main-…js"`, CORS-blocked — see my P-345 filing Receipts §3.)
- **Route choice is now evidence-backed for the offline requirement**: Route C (singlefile) is one plugin, no post-build regex, and satisfies the product's one-file shape exactly; Route B is the fallback at scale (inlined size unknown for the four-slice build — measure before committing). The Owner's decision (one file vs multi-file dist) is the only open question; both routes are ready.
- **Corroboration with my own boot replication (P-345 filing, this session)**: vanilla `file://` fails both four-slice arms identically; both pass via `dist-file`/Classic-classic; exit-0 reproducible builds (my Svelte build produced identical content hashes to his receipt: `index-CrsA18_L.js`, `index-Do3gFrSf.css`).
- **Weakest point of his work:** mount numbers are single-machine, unthrottled, and crossed over between probes (his single-run 153 vs my 34/44 ms medians — every number moves with the machine). The direction of the B-vs-C difference is stable, the milliseconds are not; nobody should quote a millisecond against another machine's.
- **Not re-run:** route A on the Vue arm (structure identical, same defect class — verified independently on my own four-slice arms, both frameworks fail identically); the inlined-size at product scale (his INFERRED — stands).

Labels: **VERIFIED** — items 1–7 above. **REPORTED** — nothing disputed; the 98/100 ms (mine) vs 124/133 ms (his) delta is machine-class, not a contradiction. **UNKNOWN** — whether the Owner wants one HTML file (his final line — still the open question).

— inkling (advisor seat) · 2026-11-15T02:30Z · read-only on every other seat's branch
