SPEAKER: inkling | ROLE: council | TASK: CAKEPANZ assist, Part 8 — non-functional laws, measured | DATE: 2026-11-16T21:55Z
FOR: R-13

# Cakepanz — the four non-functional laws, measured (Part 8)

**Unblocks:** Z.ai's delivery checklist; the cutover note. Every row is a command with its output; where I did not run it, it says UNKNOWN — nothing here is eyeballed.

## 1. Offline / file:// — **FAIL as shipped** (VERIFIED 2026-11-16)

`vite build` → `dist/index.html` references `./assets/index-*.js`, `./assets/index-*.css` (relative paths, correct) but both carry `crossorigin` and the JS is `type="module"`. Chromium over `file://`:

```
error: Access to CSS stylesheet at '.../dist/assets/index-D2jUzyc-.css' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-untrusted, data, http, https.
error: Access to script at '.../dist/assets/index-X-RtTao0.js' from origin 'null' has been blocked by CORS policy
REQFAIL: ... .css :: net::ERR_FAILED
REQFAIL: ... .js :: net::ERR_FAILED
→ body text: "" ; DOM nodes: 9 (app never mounts) ; 4 error messages
```

The w89 pattern (strip `crossorigin`, inline/single-file postbuild) is NOT in the tree (`vite.config.js`: `defineConfig({ plugins: [svelte()], base: './' })` only; no postbuild script in `package.json`). The v4-1 offline requirement is unmet and unreceipted by the battery (it runs over `http://localhost`). FLAG to Z.ai — his to fix, and to receipt, not mine.

## 2. 390 px — **PARTIAL** (VERIFIED)

- Team Select `/`, `?dev=1`, team-picked detail: `scrollWidth = 390` — clean. (Both widths 1180/390 measured; 0 page errors.)
- Draft Board `?dev=1` after DRAFT AS BUFFALO BILLS: `scrollWidth = 444` @390 — **54 px horizontal overflow** (see Part 12 filing §"The 390 px layout defect").
- Feed / Share / saves screens: NOT measured. UNKNOWN.

## 3. Zero console errors — **PASS over http** (VERIFIED)

`/` (empty state), `?dev=1` team select, team detail, draft board: 0 page errors @1180 and @390. (Note: the `?dev=1` path exercises the bundled-ratings dev mode, not the empty state; the batteries ran the same pages with `pageerror` listeners — zero errors there too, REPORTED via battery output.)

Also passed: `?dev=1` boots the app with the engine's bundled ratings, dev-labelled. The `/` empty state is the F11-designed no-dataset screen. Neither is a singlefile artifact.

## 4. Singlefile output — **NOT BUILT** (VERIFIED absence)

`npm run build` emits `dist/index.html` + `dist/assets/*` (two files, crossorigin). No single-file plugin, no inline postbuild, no size budget receipt. w89 ≈ 1.9 MB as the reference; this build is 316 KB JS + 19 KB CSS (gzip ≈111 KB) — far below, and not a single file. Bundle size is fine; the *discipline* is not implemented. FLAG.

## 5. What I did not measure (UNKNOWN)

- `file://` on a stock browser beyond Chromium (Safari/Firefox): UNKNOWN.
- Network-blocked offline contract (airplane-mode boot of the BUILT artifact): UNKNOWN (the http runs were online but the app loaded no remote resources — 0 requests logged by the probes; no CDN, no fonts fetched. The Cinzel law is separately unmet — see style-laws filing.)
- 390 px on the feed/share/saves: UNKNOWN.
- Reduced-motion + 390 + file:// combined: UNKNOWN.

## How to verify

Commands in §1–§3 text are literal; each returns the quoted output on the s5 delivery re-pinned to `d3bd81d2` (throwaway tree). The build itself: `npm ci && npm run build`.
