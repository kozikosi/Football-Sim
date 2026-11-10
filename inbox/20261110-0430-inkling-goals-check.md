SPEAKER: inkling | ROLE: council advisor | TASK: The goals check — is the current work still on the Svelte 5 + Vite → Cloudflare deployment → account-system path? | DATE: 2026-11-10T04:30Z
FOR: GOALS-CHECK (the Owner's question this round; reviewed against the 67 Cakepanz Slices 1-4 tree, the thing actually being built)

## Bottom line

The current work is ON the path, with two seam-level frictions to name for the account system (below). Nothing in the delivered slices drifts toward a server-bound, framework-breaking, or single-machine design. **Svelte 5 + Vite: clean. Cloudflare deployment: clean (static dist/, no server, no runtime network calls) — one Pages-project env var, not a code change. Account system: the envelope design supports local-profiles-first then OAuth sync; two frictions worth writing into the account-system design before it is built, not after.** A clean check is the result this time; the findings are watchlist items and design notes, not defects.

Everything below was checked against the staged tree (origin/council/vl c768b555, `_agents/vl/deliveries/67-cakepanz-s4/`), the same tree MUSE and I reviewed for P-287 (my review: `inbox/20261110-0425-inkling-P-287-slice3-slice4-review.md`). Labels: VERIFIED = I ran/read it; REPORTED = someone else's claim I did not re-run; INFERRED = my reasoning; UNKNOWN = could not check.

## 1. Svelte 5 + Vite — CLEAN (VERIFIED)

- `package.json`: real Svelte 5 (`svelte ^5.57.3`), real Vite (`vite ^7.3.6`), `@sveltejs/vite-plugin-svelte ^6.2.1`, `typescript ^5.9.3`. The only runtime dependency is Svelte itself; everything else is build tooling. No second framework, no meta-framework (no Next/Nuxt/SvelteKit — `mount(App)` in `main.ts`, client-only by design; there is no SSR and none is coming unless someone adds a kit).
- `npm run build` → clean `vite build`: 179 modules, dist/ 316K total (index.html 0.44 kB + CSS 15 kB + JS 301 kB / 103 kB gzip), **zero external URLs in the built output** (grep of dist/ finds only `svelte.dev` inside compiler runtime strings and the `w3.org` SVG namespace — no `<link>`/`<script src>`/font hrefs). No Google Fonts (contrast: the w85/w88 shell loads `fonts.googleapis.com` — P-305 — this app does not).
- No non-Vite build step anywhere (no esbuild scripts, no postcss config, no custom bundler). Install-script blocking (this machine's npm policy blocks esbuild's postinstall) did not break the build — Vite 7 works off the optional-dep binary.
- One compiler warning (INFERRED, not a failure): `App.svelte:44` — `let userTeam = 0` updated without `$state(...)` (`non_reactive_update`). Works today (imperative `refresh()` pushes into writables; my live battery run passed 61/0/10/3), but it is the one pattern in the tree that Svelte's own compiler flags and that will bite a future slice that reads `userTeam` reactively. Recommend `$state` (or a comment saying why it is deliberately plain) — the Architect's/Z.ai's call; not a goals-path problem.
- The slices are the proof, not the exception: hydration (Saves), the feed (Feed), and Team Select are all plain Svelte 5 components with engine calls through `src/lib/` (draftStore, savesApp, feedVM) — no engine code in components beyond imports from `src/engine/**`, which is the pinned snapshot. Nothing slice-specific would not survive as a static build.

## 2. Cloudflare deployment — CLEAN, one project setting (VERIFIED code; the "needs to change" is Pages config, not code)

- The app IS the static build the goals assume: `vite build` → `dist/`, and `vite.config.js` has `base: './'` — relative asset URLs, so the site works from any Pages path and from localhost preview. No `CNAME`, no gh-pages-isms, no absolute `/assets` paths.
- **Nothing assumes a server, a Node runtime, or gh-pages.** Zero `fetch`/`XMLHttpRequest`/`WebSocket`/`node:`/`process.env`/`import.meta.env` anywhere in `src/` (grep, case-insensitive, zero hits). The engine runs in the browser (and in Node for tests). The public boot path is the **empty state + user data import** (F11 ruling) — data arrives as a user-supplied CSV (`?raw` imports are build-time bundling of the dev-build dataset only; the shipping path imports at runtime in-browser, needing no data server). The three CSVs are ~176K total and bundled; fine as static assets.
- **Would anything need to change for Cloudflare Pages?** Only project settings, none of it code:
  (a) Pages build image must run **Node ≥ 20.19 (or 22.12+)** for Vite 7 — set `NODE_VERSION=22` (or 20.19.x) in the Pages project. One env var; without it the build fails before any code is reached.
  (b) Keep the default `npm install && npm run build` flow; if the Pages image blocks install scripts (as this machine did), ensure `esbuild`'s postinstall is allowed (`npm ci` with scripts enabled) or rely on Vite's optional-binary path — either works; my local build worked with scripts blocked.
  (c) `dist/` is the output directory, no adapter needed — **not** Pages Functions, **not** Workers. If a future feature needs a backend (it should not until the OAuth sync tier, and even then it's a Worker + KV/D1, not a page-rendering server), that is a new, explicit step with its own review.
  (d) The w88/shell Google-Fonts external load (P-305) is the one real tension with "offline / no network" in the wider project — it is ABSENT here and should stay absent; if w-series shells ever ship beside this app, that decision (P-305, Owner/Architect) matters to this path too.
- **Verdict: deployable to Cloudflare Pages as-is.** Not a rework; not even a code change — one env var. Do not deploy from this task (and nobody did).

## 3. Account system — the design SUPPORTS local-profiles-first then OAuth sync; two seam frictions to name (VERIFIED by reading; the frictions are INFERRED)

What the current design already gets right (all VERIFIED by reading the pinned engine, byte-identical to architect/engine-and-seats 4ca9a071):

- **The envelope is the portable unit, and it is sync-shaped.** `core/envelope.ts`: plain JSON only (`assertPlain` throws on Maps, class instances, non-finite numbers); sport-tagged (`nfl`), kind-tagged (`draft|week|season`); `schemaVersion` with **newer-build refusal** (never-overwrite, in both directions); **`saveId`** (uuid lineage — the file's own comment calls it "the lineage key for sync history and 'keep both'"), **`saveRevision`** (integer ≥ 1, +1 per committed transition, **never decreases, not even on undo** — the correct ordering key for sync), **`dataVersion`** (canonical sha256 of the dataset, informational — a sync can refuse or warn on dataset mismatch for free), `createdAt`/`savedAt` (ISO 8601). A/B/C slots are three local profiles.
- **Storage is behind an async-native `StorageModule` interface** (`platform/localstorage.ts`) with an explicit note that IndexedDB can replace it *without touching a caller*. Storage treats payloads as opaque; the slot/key assertion (F8) is injected by the composition root, not baked into the module. Keys are namespaced (`sim:nfl:slot:A|B|C`, `sim:settings`, `sim:theme`, `sim:profile`).
- **No state lives anywhere a sync cannot reach.** No `sessionStorage`, cookies, or IndexedDB anywhere (grep clean); localStorage only, behind the interface; the only UI ephemera (`needsSel`, `sort`) are deliberately not save state. The draft's `saveId`/`createdAt` are minted at START and ride in the envelope. `dataVersion` is computed at boot (`sha256Hex` of the ratings CSV) and stamped into every save — a sync gets a dataset fingerprint for free.
- **Offline is a hard requirement and holds:** zero network calls anywhere (src or dist); the public path imports user data locally.
- The export/import IDEA (Z.ai, filed) is the same envelope — the account system's "download my saves" is nearly free once the sync exists.

**Friction 1 — the slot namespace is global per browser, not per profile (INFERRED).** `sim:nfl:slot:A|B|C` are fixed keys: two humans on one machine (or one human pre-sign-in then post-sign-in) share the same three slots, and nothing in the key or the envelope names a *profile*. When "local profiles first" lands, either (a) keys gain a profile segment (`sim:<profileId>:nfl:slot:A` — a `keys.ts` schema change, mechanical), or (b) a profile registry + "current profile" pointer is added with per-profile namespaced slot keys. `saveId` does not solve this (it identifies one save lineage, not a profile). This is a seam-level change (keys.ts + savesApp.ts + migration of existing slot keys, one-commit move like `legacy.ts` did for `zpb:*`), not an engine change — but it is the one place the current design quietly assumes a single owner of browser storage. Name it in the account-system design now so the OAuth tier does not inherit a three-slot collision.

**Friction 2 — the envelope has no sync metadata beyond lineage (INFERRED).** `saveRevision` orders writes within a lineage, but cross-device conflict resolution (same `saveId`, diverged on two machines) needs more than a counter and a wall clock: there is no `deviceId`, and `savedAt` is the only timestamp a sync could compare. The design anticipated "keep both" (envelope.ts comment) but nothing in the payload *implements* it. When OAuth sync lands it will need either a `deviceId` field on the envelope (an additive optional field; or a SCHEMA_VERSION bump if made mandatory) or server-side comparison on `(saveId, saveRevision, savedAt)` with a surfaced "keep both" choice for ties. Decide this in the account-system design; a reviset to `saveRevision` "never decreases" is NOT needed (it is right as-is) — the gap is identity of the *writer*, not order of writes. Small, additive, and much cheaper before the sync protocol exists than after.

Neither friction blocks Cloudflare, the slices, or offline play; both are exactly the kind of thing the account-system design doc should absorb in one section. No seat should patch them now — they are design inputs, not defects (the Architect owns the architecture; this is the council's naming duty).

## 4. Drift watchlist (nothing blocking; none of it mine to fix)

- The **w88 → Google Fonts** tension (P-305) is absent in this app. Keep the slices font-free; if the shell ever ships beside them, P-305 decides once for both.
- The **engine pin** (4ca9a071, byte-identical) is the load-bearing invariant for everything above. Any "one engine tweak" inside a slice breaks it and every claim derived from it; slices 3+4 respect it (verified).
- The **saves panel's whole-league pick count** (MUSE finding 2; my P-287 review §findings) will read oddly beside "0 of 32 starters" once profiles exist; fold into the IDEA when export/import lands, not into the envelope contract.
- `index.html` `<title>` still says "slices 1-2" (my P-287 finding) — trivial, but it is also the *public* artifact name users will see at cutover; fix with the README pass.
- `App.svelte:44` `userTeam` non-`$state` (my P-287 finding 2) — the one Svelte 5 reactivity trap in the tree; INFERRED.
- P-324/w88 context: the wins-table work touches the *shell*, not this app; if w88's Wins numbers land, this app's board reads its own pinned engine values — no action, just note the two number systems must not be mixed at cutover.

## What this does NOT cover

I did not run the w-series live site, the shell battery, or the cutover plan (P-296); I did not attempt any Cloudflare deploy (per the brief — check only); I did not verify the account system's OAuth half (it does not exist yet, by design). The engine pin verification was re-run by me for the P-287 review and is reused here by reference.

## Verdict

The path is clean. Svelte 5 + Vite is the real, only build; Cloudflare Pages is a static `dist/` away (one `NODE_VERSION` env var, no code); offline holds with zero network calls; the envelope/slot/storage design is genuinely sync-shaped. Two seam frictions are named for the account-system design (profile-scoped key namespace; sync/device metadata). Nothing needs to change in the delivered slices for the goals — and nothing in the goals is at risk from the delivered slices.

VERIFIED (build, battery, dist scan, source scan of src/ for network/storage/node APIs, envelope/keys/saver/localstorage/savesApp read, engine pin re-diff) · REPORTED (P-305 shell fonts; the w88 look) · INFERRED (both account-system frictions; the `userTeam` hazard) · UNKNOWN (the OAuth half — unbuilt by design).
