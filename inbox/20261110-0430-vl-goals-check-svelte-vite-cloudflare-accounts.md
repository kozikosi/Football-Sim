SPEAKER: vl | ROLE: council advisor | TASK: Owner's goals check (Svelte 5 + Vite → Cloudflare → account system) | DATE: 2026-11-10T04:30Z
FOR: council prompt 2026-11-10 goals check (no P-ID; a review finding, not a queue item)
REVIEW-OF: _agents/vl/deliveries/67-cakepanz-s4/ — Z.ai's "67 Cakepanz" slices 1-4 (Draft Board · Team Select · Hydration/saves · N3 drive-level feed), pinned engine 4ca9a071, branch council/vl (c05e6ce2 + this session's commit below)
VERDICT: n/a — this is a goals check, not a review of a work item. Bottom line: path is clean; no drift found on any of the three goals.

## 1. Svelte 5 + Vite — clean, no drift (VERIFIED)

What I checked:
- package.json: one runtime dep, `svelte ^5.57.3`; devDeps `@sveltejs/vite-plugin-svelte ^6.2.1`, `vite ^7.3.6`, `typescript`; scripts `dev` (vite), `build` (`vite build`), `preview` (`vite preview`) only. No server framework, no adapter, no `ssr`, no Node-only package.
- vite.config.js: `plugins: [svelte()]`, `base: './'` (relative), `server: { port: 5179 }` (dev only).
- src/App.svelte uses Svelte 5 runes (`$state`, `$effect`) plus writable stores; entry src/main.ts mounts via svelte `mount` in the browser.
- Ran: `npm install` (exit 0) then `npm run build` → `dist/index.html` (0.44 kB) + `dist/assets/index-*.css` (14.94 kB) + `dist/assets/index-*.js` (300.97 kB gzip 102.74 kB), `built in 2.26s`, 179 modules transformed, exit 0.
- One Svelte warning (`userTeam` updated but not `$state`, `src/App.svelte:44`): a UI-reactivity note, not a build or deploy drift; the build still emitted.

Receipt: `cd _agents/vl/deliveries/67-cakepanz-s4 && npm install && npm run build` (needs network; node_modules was absent here) → exit 0, dist/ emitted.
Label: VERIFIED (build ran and emitted a static site).

## 2. Cloudflare deployment — static build, deployable as-is (VERIFIED by inspection; deploy not performed, out of scope per prompt)

What I checked:
- `base: './'` → origin-relative assets; works under any host/path, including Cloudflare Pages at root.
- Default Vite outDir `dist/`; output is one HTML file plus two static assets (indexed above).
- Grep of `src/` for `process.env`, `import.meta.env`, `require(`, `fs`, `path`, `http:`, `ws:`, `ssr`, `adapter`, `gh-pages`, `localhost`, `indexedDB`, `new Worker`, `serviceWorker`: zero hits in `src/`. All hits in the tree are in `batteries/*` (Playwright probes that spin up a local `vite preview` on `http://localhost:4179` — test harness only, not the app) and `tools/mathlab/*` (offline council analysis scripts — not the app).
- No gh-pages-specific anything anywhere in the delivery.

Nothing to change — small = none, rework = none. Not deployed (the prompt says do not deploy; this is a check).
Receipt: `grep -rn -E 'process\.env|import\.meta\.env|require\(|from .fs.|from .path.|http:|ws:|ssr|adapter|gh-pages|localhost|indexedDB' src/` → no src/ hits (only batteries/ and tools/mathlab/).
Label: VERIFIED (config + build output + grep inspected; deploy intentionally not run).

## 3. Account system — local-profiles-first, sync-ready envelope (VERIFIED by inspection)

What I checked:
- Envelope contract (src/engine/core/envelope.ts): SCHEMA_VERSION 1; SaveMeta {engineVersion, dataVersion (`sha256:` + canonical hash of the player dataset, core/hash.ts), saveId (uuid minted at START — "the lineage key for sync history and 'keep both'"), saveRevision (integer >= 1, +1 on every committed transition, never decreases), createdAt (ISO 8601, set once)}; Envelope {sport ('nfl'), kind (draft/week/season), schemaVersion (newer-than-current refused as `newer-version`), slot (A|B|C), savedAt, payload}; payload plain JSON only (`assertPlain` — no Map/Set/class instance/undefined/NaN/Infinity).
- Storage: one surface only — localStorage via `LocalStorageModule` (src/engine/platform/localstorage.ts) behind the async-native `StorageModule` interface (comment: IndexedDB can replace it without touching callers). Slot check injected at the composition root (`assertSlotMatchesKey`, F8); storage treats payloads opaque; only keys `sim:nfl:slot:A|B|C` exist.
- savesApp.ts: three local profiles (slots A/B/C); `readSlot` classifies without ever repairing (corrupt-never-repair); `hydrateWeek` trusts ratings/score/schedule and re-derives seeding/bracket/champion/fixtures/gameSeed; `feedVM.ts` outputs plain JSON only (per the slice intake ledger).
- metaNow() (App.svelte:116) stamps engineVersion ('67-cakepanz@4ca9a071'), dataVersion, saveId, saveRevision (`1 + picks.length`), createdAt; saveId is reused across loads so a lineage keeps its identity.

Nothing stores state outside the envelope; nothing assumes a save lives on only one machine (uuid lineage + dataVersion stamp + schemaVersion gate are all portable). localStorage is per-device, which is exactly phase 1 ("local profiles first"); OAuth cross-device sync layers a transport over the same plain-JSON envelope — no friction found. No device-derived keys, no timestamps-as-identity, no single-machine assumption.
Receipt: inspect `src/engine/core/envelope.ts`, `src/engine/platform/localstorage.ts`, `src/lib/savesApp.ts`, `src/engine/sports/nfl/app/hydrate.ts`, `src/App.svelte` (lines 49-51, 114-122).
Label: VERIFIED (claims read directly from the code).

## Bottom line

All three goals hold: Svelte 5 + Vite build is clean and ran (`vite build` → dist/, exit 0); the app is a static, origin-relative build with no server/Node/gh-pages assumption, so Cloudflare Pages needs no change; the save/envelope design (saveId/revision/dataVersion SHA-256 stamp, slots A/B/C as local profiles, corrupt-never-repair, swappable storage module) already supports local-profiles-first then OAuth sync. Recommendation: no change; revisit only if the Architect later wants IndexedDB or a cloud sync transport.

Evidence summary: VERIFIED = build ran + grep + source inspections. Not run = actual deploy (out of scope per prompt).

Where to find it: `git show <push-commit>:_agents/vl/deliveries/67-cakepanz-s4/package.json` etc. after push to origin/council/vl.
