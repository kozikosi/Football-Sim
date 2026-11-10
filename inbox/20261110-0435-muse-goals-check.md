# MUSE — Goals check: Svelte 5 + Vite → Cloudflare → account system (67 Cakepanz Slices 1–4)

## Verdict

**CLEAN.** The 67 Cakepanz app (Slices 1–4, staged on council/vl `c768b555`) is still on the overall-goals path on all three checks. No drift found. Evidence below, all VERIFIED by reading the staged tree and grepping it (no live browser used).

## What was checked

The staged tree at `_agents/vl/deliveries/67-cakepanz-s4/` (council/vl `c768b555`): `package.json`, `vite.config.js`, `src/main.ts`, the `src/lib/` and `src/engine/` trees, the `dist/` build output, and greps for server assumptions, env vars, host-specific references, and storage.

## 1. Svelte 5 + Vite — CLEAN

- **Svelte 5:** `package.json` has `"svelte": "^5.57.3"`. Svelte 5 runes (`$state`, `$derived`, `$effect`) are used in 7 files: `App.svelte`, `DraftBoard.svelte`, `BoardRow.svelte`, `TeamSelect.svelte`, `Feed.svelte`, `Saves.svelte`, `ModeSwitch.svelte`. This is the Svelte 5 pattern, not Svelte 4.
- **Vite:** `"vite": "^7.3.6"`, `"@sveltejs/vite-plugin-svelte": "^6.2.1"`. `vite.config.js` is `plugins: [svelte()]`, `base: './'`, `server: { port: 5179 }` (dev only). Build is `vite build` → `dist/` (verified clean in the P-316/P-287 review: 179 modules, 2.03s, no warnings).
- **No non-Vite build step.** No other bundler, no SSR, no server-side code. The entry (`src/main.ts`) is a standard Svelte mount: `mount(App, { target: document.getElementById('app') })`.

## 2. Cloudflare deployment — CLEAN

- **Static build.** `dist/` contains `assets/` + `index.html`. The asset paths in `dist/index.html` are relative (`./assets/index-zQ2MDZY6.js`, `./assets/index-B-EJ2wAX.css`), so the app works from any path on any static host.
- **Nothing assumes a server.** Grep of `src/` for `fetch(`, `XMLHttpRequest`, `WebSocket`, `process.env`, `require(`: zero hits. No API calls, no server runtime, no Node dependency.
- **Nothing assumes gh-pages (or any host) specifically.** Grep of `src/`, `vite.config.js`, `package.json` for `github.io`, `gh-pages`, `kozikosi`: zero hits. No `.env`, no `_redirects`, no `wrangler.toml`, no Cloudflare/Vercel/Netlify-specific files, no `public/` dir. No `import.meta.env` or `import.meta.url` usage. The `base: './'` in vite.config.js is host-agnostic — the same build deploys to Cloudflare Pages, gh-pages, or any static host without a config change.
- **What would need to change for Cloudflare Pages:** nothing in the app itself. The only step is the deployment target (point Cloudflare Pages at the repo / `dist/`), which is an ops choice, not a code change. This is a check, not a deployment — nothing was deployed.

## 3. The account system — CLEAN (local-profiles-first, sync-ready)

- **Envelope is the portable unit.** `AppMeta` (`src/lib/savesApp.ts:29`) carries `engineVersion`, `dataVersion` (the dataset SHA), `saveId`, `saveRevision`, `createdAt`. `SaveIdentity` (`src/engine/sports/nfl/app/appstate.ts:25`) carries `saveId`, `saveRevision`, `createdAt`. The dataset has a `hash` (SHA-256, computed via Web Crypto at load — `src/engine/sports/nfl/app/versions.ts:23`). This matches the Owner's envelope decision (saveId/createdAt now; SHA-256 dataset stamp). The envelope is self-describing and portable — a sync can move it between devices by (saveId, saveRevision).
- **Slots A/B/C are local profiles.** Three slots, each a local profile (`src/lib/components/Saves.svelte:1`, `savesApp.ts` takes a `SlotName` of `'A' | 'B' | 'C'`). This is the designed local-profiles-first stage.
- **Storage is injected, not hardcoded.** The comment in `src/engine/sports/nfl/app/store.ts:135` says: "Storage is injected (localStorage in the browser, a Map in tests); every call is guarded because storage can throw or be empty." The app-layer purity test bans localStorage in `src/sports/nfl/app/` — the engine never touches storage directly; it goes through the platform module (`src/engine/platform/localstorage.ts`). That separation is exactly what a sync needs: the storage module can be swapped for a sync-backed one later without touching the engine or the app layer.
- **No sync/account code yet — and that is the plan, not drift.** There is no OAuth, no sync, no cross-device code in the app. That is the designed staging (local profiles first, then proper OAuth accounts with cross-device sync). Nothing in the current design makes the account system harder: no state lives outside the envelope/slots (all state goes through the injected storage module), nothing assumes a save can only ever live on one machine (the envelope carries saveId + saveRevision, which is the per-slot versioning the P-254 sync design uses for last-write-wins). The P-254 sync design itself is not yet implemented — that is future work, not a gap in the current app.
- **Offline (local-first) holds.** The app runs entirely from localStorage + the bundled dataset. No network call is made at runtime. The dataset hash is computed locally (Web Crypto). Nothing requires connectivity.

## What would be drift (not found)

- A non-Vite build step, a dependency that assumes a server, or a pattern that would not survive as a static build. None found.
- An absolute asset path, a host-specific config, or a server/API call. None found.
- State stored outside the envelope/slots, or an assumption that a save lives on one machine. None found.

## Labels

VERIFIED: Svelte 5 + Vite versions and runes usage (package.json, grep), the static build and relative asset paths (dist/index.html), the absence of server/API/env/host references (greps, all zero hits), the envelope fields (savesApp.ts, appstate.ts), the slots A/B/C (Saves.svelte, savesApp.ts), the injected storage and the app-layer purity ban (store.ts, localstorage.ts). REPORTED: the build being clean (179 modules, 2.03s, no warnings) is from MUSE's P-316/P-287 review (d3f89eda), re-confirmed here by the dist/ contents. INFERRED: that the storage-module separation makes a future sync swap straightforward (from the injected-storage design, not from a sync implementation, which does not exist yet).
