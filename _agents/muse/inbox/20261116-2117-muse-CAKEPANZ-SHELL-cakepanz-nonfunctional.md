SPEAKER: muse | ROLE: council | TASK: Cakepanz shell assist, Part 8 — the non-functional laws, measured | DATE: 20261116-2117
FOR: R-13

LABELED DRAFT: This is MUSE's draft answer to the council prompt v4, written at the Owner's explicit request. It is NOT a formal council filing and NOT independent verification. The review chain (three different seats → REVIEWED) cannot be satisfied by MUSE alone — two other seats must still confirm.

# Part 8 — The non-functional laws, measured (67 Cakepanz shell, slices 1–5)

**Scope.** The delivery under review is the `67-cakepanz-s5` tree on `origin/council/inkling`.
The battery is `batteries/slice1.battery.mjs` (75 APPLY laws). The build under test was
produced locally from a pristine copy of that tree in `/tmp/mut-base`
(`npm install && npm run build`, 2026-11-16) — the receipts below are from that build.
Per the standing boundary for the MUSE seat (no live browser checks) and the task's
instruction for this part, anything that requires a real browser render is labelled
UNKNOWN and is **not** claimed from a browser visit. What is measured here is the built
artifact, the source, and the battery's own code — all run or read locally.

**Claim labels.** VERIFIED = I ran it, receipt in the text. REPORTED = someone else measured
it, named. INFERRED = reasoned from code I read, not run. UNKNOWN = I do not know.

**What this part unblocks:** Z.ai's next shell round (which non-functional laws are actually
met and which are not) and Claude's merge (the file:// and 390px gates the cutover battery
must run). Artifact: this file. Verify/apply: re-run the commands quoted below against the
s5 tree; the 390px and file:// verdicts name the exact lines to re-check in a browser.

## Law 1 — Offline (`file://`, zero network)

### 1a. Zero network: the app makes no request to any host (VERIFIED, statically, from the built bundle)

Command (run 2026-11-16 in the built tree):

```
$ grep -o "fetch(\|XMLHttpRequest\|WebSocket\|navigator.sendBeacon" dist/assets/*.js | sort | uniq -c
      1 fetch(
$ grep -c "https://" dist/assets/*.js
1
```

That one `fetch(` and the `https://` strings look alarming until read in context. The
context, extracted from `dist/assets/index-6Lyri8Rm.js`:

- Every `https://` occurrence is a **string literal inside Svelte's own diagnostic
  messages** — e.g. `console.warn("https://svelte.dev/e/derived_inert")` and `throw new
  Error("https://svelte.dev/e/lifecycle_outside_component")`. They are never fetched;
  they are the text of an error that fires only on framework misuse. (VERIFIED: all
  matches sit in Svelte runtime code, `svelte.dev/e/*`.)
- The single `fetch(` is **Vite's modulepreload polyfill**: `fetch(r.href, l)` where
  `r.href` is the *relative local asset URL* (`./assets/index-*.js`), with
  `credentials: "same-origin"`. It preloads the app's own bundle; it contacts no host.

Corroborating greps over the source (VERIFIED):

```
$ grep -rn "https\?://\|cdn\.\|googleapis\|fonts\.g" src index.html --include=*.svelte --include=*.ts --include=*.html | grep -v "w3.org\|localhost\|127.0.0.1"
(no output — no external reference in any source file or in index.html)
$ grep -rn "@font-face\|@import\|Cinzel" src index.html
(no output — no webfont is loaded; the shell uses Georgia / system serif throughout)
```

The only browser-storage touch is `localStorage` (`src/engine/platform/localstorage.ts`),
which works offline. **Verdict: zero-network holds as a static property of the artifact.
Runtime confirmation with the network actually blocked (a browser run with request
interception asserting zero requests) is UNKNOWN — the battery never runs it** (see §1c).

### 1b. `file://` boot: the build cannot boot from `file://` in a stock browser (INFERRED fail; actual boot UNKNOWN)

Command and output (the build, 2026-11-16):

```
$ npm run build
dist/index.html                   0.44 kB │ gzip:   0.31 kB
dist/assets/index-D2jUzyc-.css   19.13 kB │ gzip:   3.82 kB
dist/assets/index-6Lyri8Rm.js   316.10 kB │ gzip: 107.48 kB
✓ built in 2.97s

$ cat dist/index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>76 Pancakes — Draft Board (67 Cakepanz slices 1-5)</title>
    <script type="module" crossorigin src="./assets/index-6Lyri8Rm.js"></script>
    <link rel="stylesheet" crossorigin href="./assets/index-D2jUzyc-.css">
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

Two facts about this artifact:

1. The entry script is `type="module"`. Chrome (and Firefox) refuse ES-module loads from
   `file://` URLs on CORS grounds — a module script fetched from `file://` is a
   cross-origin request to the browser, and it fails without
   `--allow-file-access-from-files`. The relative `./assets/…` paths are fine; the
   *module* part is what blocks a stock-browser `file://` boot. This is a property of
   the artifact plus the browser's documented `file://` module policy — INFERRED fail,
   not a run.
2. The battery never loads `file://` at all: every `page.goto` in
   `slice1.battery.mjs` is `http://localhost:${PORT}/?dev=1` served by `vite preview`
   (VERIFIED by grep — no `file://` string in the battery). The "boots from vanilla
   file://" claim therefore has **no law behind it anywhere in the tree**.

**Verdict: FAIL (INFERRED) for stock-browser `file://` boot; UNKNOWN as a run.** The
fix belongs to the shell's build, not to this filing — e.g. a true single-file output
(see Law 2) or an inline non-module bootstrap. Proposed law for the battery: launch
Chromium with `page.goto('file://' + path-to-dist + '/index.html')`, assert `.cp-ts`
or `.cp-empty` renders and zero page errors. Until that law exists, "offline-first,
boots from vanilla file://" is an aspiration, not a measurement.

### 1c. The battery's offline coverage is zero laws (VERIFIED)

`grep -n "file://\|offline\|request\|route\|abort" batteries/slice1.battery.mjs` returns
nothing. The offline contract is asserted nowhere. The `vite preview` server the battery
uses is itself a network server on localhost — the battery cannot distinguish "works
offline" from "works on localhost".

## Law 2 — Single-file output: FAIL (VERIFIED)

Command and output (same build as §1b):

```
$ ls -la dist dist/assets; du -sb dist
dist/index.html                     438 B
dist/assets/index-D2jUzyc-.css   19,131 B
dist/assets/index-6Lyri8Rm.js   316,096 B
335,665 bytes total (3 files)
```

The product rule (repo `AGENTS.md` §3) is "one self-contained HTML file". The Cakepanz
build emits **three files**: the HTML references a separate JS bundle and a separate CSS
file. There is no single-file plugin in the tree (VERIFIED):

```
$ grep -rn "singlefile\|single-file" package.json vite.config.js README.md
(no output)
```

`vite.config.js` is three lines of plugins plus `base: './'` — no inlining. **Verdict:
FAIL (VERIFIED).** Note the consequence chain: single-file output is also the natural
fix for Law 1b — an inlined `<script>` (non-module, or a module inlined with its imports
bundled) boots from `file://` where the current split output does not. The two laws
stand or fall together in the next build; the battery should assert both with one
command (`node -e` asserting `dist` contains exactly one `.html` file and no
`src=`/`href=` asset reference outside it).

Bundle size for reference (not a law in this part, but the number the cutover will ask
for): 335,665 bytes total; JS 316,096 B (107.48 kB gzip); CSS 19,131 B (3.82 kB gzip).
The w89 single-file reference is ≈1.9 MB (REPORTED) — the shell is far under it, but it
is not single-file, so the comparison is not apples-to-apples yet.

## Law 3 — 390 px with no horizontal scroll: FAIL on the board (INFERRED); other screens likely pass (INFERRED)

The battery runs exactly two viewports, both 1180×950 (VERIFIED):

```
$ grep -n "viewport" batteries/slice1.battery.mjs
27:  const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
405: const page2 = await browser.newPage({ viewport: { width: 1180, height: 950 }, reducedMotion: 'reduce' });
```

The V5 phone laws are an explicit SKIP: *"the footer nav is shell chrome; the slice
screens are mobile-flexible but the shell laws name shell elements"*
(`slice1.battery.mjs:434`). So **no law measures 390 px at all** — the verdict below is
arithmetic on the shipped CSS, not a browser run (UNKNOWN as a run; INFERRED as a
verdict).

### The board row overflows at 390 px

`src/lib/components/BoardRow.svelte:41-42`:

```css
.cp-main { display: grid; grid-template-columns: 1fr 44px 44px 48px 72px 72px 56px; gap: 8px; width: 100%;
  background: transparent; border: 0; ... padding: 8px 6px; }
```

Fixed tracks: 44 + 44 + 48 + 72 + 72 + 56 = **336 px**; gaps: 6 × 8 = **48 px**;
padding: 12 px. Floor width before the `1fr` name column contributes anything:
**396 px**. (The name column can shrink to one character via `overflow-wrap: anywhere`,
so 396 px is the floor, not the typical width.)

Available width at a 390 px viewport: 390 − `.cp-root` padding (16 px × 2) − `.cp-board`
padding (14 px × 2) = **330 px** (`App.svelte` `.cp-root { padding: 18px 16px 60px; }`,
`DraftBoard.svelte` `.cp-board { padding: 14px; }`). 396 > 330: the board rows overflow
their container by **at least 66 px** at 390 px. There is no `overflow-x` guard anywhere
in `src/` (VERIFIED: `grep -rn "overflow" src/` finds only `overflow-y: auto` on the
feed log and `overflow-wrap: anywhere` on text spans — nothing clips horizontal
overflow, and `body` has no `overflow-x: hidden`).

### The other screens, by the same arithmetic (INFERRED pass)

- **Team Select:** `.cp-ts-divs` is `repeat(auto-fit, minmax(210px, 1fr))` — collapses to
  one column; the team buttons are `width: 100%`. Fits.
- **Saves panel:** `.cp-slotgrid` is `repeat(auto-fit, minmax(220px, 1fr))` — one column
  at 390 px; the refusal message has `overflow-wrap: anywhere`. Fits.
- **Feed:** `.cp-feed-line` is flex with `.zrl-play { flex: 1; min-width: 0;
  overflow-wrap: anywhere }`; fixed parts (`.zrl-t` 52 px + `.zrl-team` 34 px + score
  ≈ 50 px + gaps/padding ≈ 39 px) total ≈ 175 px, well under the available ≈ 330 px.
  Fits.
- **Share:** the brag headline (2.3rem) and seed value (3.4rem) wrap or fit; proof lines
  have `overflow-wrap: anywhere`; fact chips wrap (`flex-wrap: wrap`). Fits.
- **Needs row / header / footer:** all `flex-wrap: wrap`. Fit.

**Verdict: FAIL (INFERRED) — the 390 px law fails on exactly one screen, the draft
board, by ≥66 px.** Proposed law for the battery: after the board renders, open a
390×844 page, and assert on every screen
`document.documentElement.scrollWidth <= 390` (and `document.body.scrollWidth <= 390`),
plus the board rows' `getBoundingClientRect().right <= 390`. The fix is a board-row
responsive rule (the shell's call, not this filing's) — e.g. narrower numeric columns
or a stacked row under ~480 px.

## Law 4 — Zero console errors on every screen, in both the empty and dev states: NOT COVERED (VERIFIED gap); zero *page errors* holds in dev (VERIFIED)

### What the battery actually asserts

The battery's only error listener (VERIFIED, the sole `page.on` in the file):

```
batteries/slice1.battery.mjs:29:  page.on('pageerror', (e) => errs.push(String(e)));
```

`pageerror` fires on **uncaught exceptions**. Four laws assert `errs.length === 0`
(laws 26, 59, 73, 75 — "zero page errors across the whole battery / the feed laws /
the slice 5 laws / slices 1-4"). There is **no `page.on('console')` listener anywhere
in the battery** (VERIFIED), so `console.error` and `console.warn` calls are never
observed. The one probe that does listen, `batteries/probe-save.mjs`
(`page.on('console', …)` logging warnings/errors), is a manual dev tool, **not part of
`npm run battery`** (which runs only `slice1.battery.mjs` — `package.json`, VERIFIED),
and it asserts nothing.

Consequences:

- A `console.error(...)` on any screen would pass all four "zero page errors" laws.
  The law's name ("zero console errors") and its implementation ("zero uncaught
  exceptions") are different claims.
- The three `console.warn` sites in the shipped code would also pass silently:
  `src/engine/sports/nfl/app/store.ts:127` (`store: action rejected`), `:140` (`save
  failed`), `:143` (`load failed`). These fire only on failure paths — which is exactly
  when a console law should be watching. (VERIFIED by grep; the dist bundle contains
  exactly those 3 `console.warn` calls.)
- The four zero-error laws share **one accumulator** (`errs` is never reset between
  slices), so they are one guard restated four times, not four independent guards. An
  error in slice 1 fails laws 26, 59, 73 and 75 together; an error *after* the last
  check (law 75) is never observed at all.

### Dev state: zero page errors holds (VERIFIED, from the baseline run)

The MUSE seat's baseline run of the unmodified s5 battery (2026-11-16, see the Part 6
filing) completed 75 pass · 0 fail, exit 0 — which includes laws 26, 59, 73, 75
passing, i.e. **zero uncaught page errors across the whole battery in the dev state**
(`?dev=1`, viewport 1180×950, plus the reduced-motion second page).

### Empty state: UNKNOWN, and never loaded

The battery loads only `?dev=1`. The empty boot (no dataset, `.cp-empty`, the dev link
— `App.svelte:64-70`) is never rendered by any law, so zero-console-errors (and zero
page errors) in the empty state is **UNKNOWN**. The empty state's only scripts are the
same bundle, so a failure there would most likely be a boot failure — which is also
why Law 1b's `file://` law and this law should be written together: load the empty
state from `file://`, assert it renders, assert zero page errors *and* zero console
errors.

**Verdict: the "zero console errors" law as stated does not exist in the battery.
What exists and holds (dev state only) is "zero uncaught page errors".** Proposed law:
add `page.on('console', m => { if (m.type() === 'error') errs.push(m.text()) })`
(or a separate `consoleErrs` array with its own law per screen), and run the same
sweep on a `page.goto` without `?dev=1` for the empty state.

## Summary table

| Law | Verdict | Basis |
|---|---|---|
| Offline — zero network | PASS (static); UNKNOWN (runtime, network-blocked) | Built bundle: only fetch is Vite's local-asset preload; only `https://` strings are Svelte diagnostic literals; no external refs in any source file |
| Offline — `file://` boot | FAIL (INFERRED); UNKNOWN (run) | `type="module"` entry script; Chrome blocks `file://` module loads; battery never loads `file://` |
| Single-file output | FAIL (VERIFIED) | `npm run build` emits 3 files (438 B html + 19,131 B css + 316,096 B js); no single-file plugin |
| 390 px, no horizontal scroll | FAIL on the board (INFERRED, ≥66 px overflow); other screens INFERRED pass | Board-row grid floor 396 px vs 330 px available; battery runs only 1180×950; V5 skipped |
| Zero console errors, every screen, empty + dev | NOT COVERED (VERIFIED gap) | Battery listens only for `pageerror`, never `console`; empty state never loaded. Zero *page* errors holds in dev (baseline 75/0, VERIFIED) |

**Failures verbatim.** Law 2's failure is the build output quoted in §1b (three files, not
one). Law 3's failure is the arithmetic in §3 (396 px floor vs 330 px available) — no
browser run was made, so there is no browser error text to quote; the proposed law in
§3 states the command that would produce it. Law 4 has no failure to quote because the
law does not exist; the gap is the battery source quoted in §4.
