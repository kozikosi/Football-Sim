TO-ARCHITECT: Goals check (Owner 2026-11-10 round): 67 Cakepanz path to Svelte 5 + Vite → Cloudflare → account system is CLEAN — no drift found
P-ITEM: inbox/20261110-0420-vloc-OP-add-goals-check-67-cakepanz-still.md (OP: ADD | P3)
SEAT: vloc | DATE: 2026-11-10T04:20Z
EVIDENCE: VERIFIED (all primary sources read from origin/gh-pages:67-cakepanz/; commands listed per claim)

The Owner's goals for this round: Svelte 5 + Vite (framework, locked) → eventually Cloudflare deployment → account system (local profiles first, then OAuth cross-device sync; offline is a hard requirement — local-first, sync-on-reconnect).

This is a review task for the council. I checked whether the current 67 Cakepanz work still supports that path. Result: the path is CLEAN on all three legs. No architectural drift found. Do not fix anything — this is a clean check result.

## 1) Svelte 5 + Vite — CLEAN (VERIFIED)

- package.json: `"type": "module"`, `svelte: ^5.57.3`, `@sveltejs/vite-plugin-svelte: ^6.2.1`, `vite: ^7.3.6`; scripts `dev = vite`, `build = "vite build"`, `preview = "vite preview"`. No other framework, no build step beyond Vite.
  Command: `git show origin/gh-pages:67-cakepanz/package.json`
- vite.config.js: `defineConfig({ plugins: [svelte()], base: './', server: { port: 5179 } })` — no adapter, no SSR, no server-render config. The `server` block only affects `vite dev`, not `vite build`.
  Command: `git show origin/gh-pages:67-cakepanz/vite.config.js`
- tsconfig.json: ES2022 / ESNext modules, bundler resolution, DOM lib — browser target only.
  Command: `git show origin/gh-pages:67-cakepanz/tsconfig.json`

Slice status: Slices 1 (Draft Board) and 2 (Team Select) are built; Slice 3 is queued (P-316); Slices 4–5 not yet built. So the proof available today is Slices 1–2, and nothing in them drifts. There is nothing to drift-check for Slices 3–5 until they exist.

## 2) Cloudflare deployment — CLEAN / NO DRIFT (VERIFIED)

- `vite build` → static `dist/` output; `base: './'` emits relative asset paths, which work on any static host including Cloudflare Pages.
- Nothing assumes a server, a Node runtime, or gh-pages specifically:
  Command (extract src/ to /tmp and grep): `git --git-dir=/Users/kosi/Desktop/wt/vloc/.git archive origin/gh-pages 67-cakepanz/src | tar -x -C /tmp/ck67 && grep -rnE "from ['\"](fs|path|crypto|http|https|os|child_process|net|dns|stream|buffer)['\"]|import\.meta\.env|process\.env|require(" /tmp/ck67/67-cakepanz/src/` → NOTHING FOUND.
- gh-pages is only the publish location. Note: live `index.html` is still w85 (a Z.ai shell wave); the Svelte app is published separately under `67-cakepanz/` and is not yet `index.html`, so there is no live-page drift from the Svelte app to check.

## 3) Account system — SUPPORTS THE PATH (local-profiles-first → OAuth sync; offline first) (VERIFIED)

Save envelope (src/engine/core/envelope.ts), plain JSON only, storage treats `payload` as opaque:
- `SaveMeta`: `saveId` (uuid minted at draft start / run-it-back new slot — the lineage key for sync history and "keep both"), `saveRevision` (integer ≥ 1, +1 per committed transition, never decreases), `dataVersion` (canonical SHA-256 of the player dataset, core/hash.ts `datasetHash`), `engineVersion`, `createdAt` (set once, never changed).
- `slot ∈ {A, B, C}` — slots are local profiles; a later sport's slot A is a different save (sport-scoped).
- `serialize()` → JSON string; `assertPlain()` throws on Map/Set/undefined/NaN/Infinity (nothing JSON would silently change).
- `parseEnvelope()` validates the outer shape (sport, kind, schemaVersion ≤ SCHEMA_VERSION, all meta fields); returns `newer-version` for a save written by a newer build (never overwritten).
- `profile.ts`: cross-sport profile container `{v: 2, createdAt, sports: {nfl: {...}}}`; forward-compatible — a profile written by a newer build (with a sport this build lacks) survives an older build's save.
- Storage is injected via the `StorageModule` interface (core/app.ts); `LocalStorageModule` is today's browser impl (core/platform/localstorage.ts, guarded `typeof localStorage === 'undefined' ? null : localStorage`). Its own comment: "IndexedDB can replace this class later without touching a caller (the interface is async-native on purpose)."
- Corrupt-never-repair: `saves.ts` `restore()` returns `{ok:false}` on any parse failure; the reducer refuses corrupt saves and shows them verbatim. `hydrate.ts` re-derives table/seeding/bracket/champion/gameSeed and trusts only ratings/roster/scores/plan/prevRank/homeField.

Nothing is stored where a sync could not reach it (localStorage is the only storage today, and it sits behind an injectable interface). Nothing assumes a save can live on only one machine — the envelope is explicitly the portable unit ("lineage key for sync history and 'keep both'", slots as named lineages). So the local-profiles-first → OAuth sync design is supported, not contradicted, by the current code.

## Minor notes (not drift, not blocking)

- `vite.config.js` `server.port` only matters for `vite dev`; harmless for `vite build`.
- The snapshot's `app/feed.ts` `clock()` is broken for overtime (engine bug for the next re-pin; Z.ai works around it in the feed). Noted for completeness; unrelated to the three goals paths, and not Z.ai's to fix on a frozen snapshot.

## Bottom line

The path is clean: Svelte 5 + Vite intact, static `vite build` with no server/Node/gh-pages assumptions, and a portable save/envelope (saveId, saveRevision, SHA-256 dataVersion stamp, slots A/B/C) behind an injectable StorageModule — exactly what local-profiles-first then OAuth sync needs. No drift; no fix required.

Evidence labels: VERIFIED for package.json, vite.config.js, tsconfig.json, envelope.ts, saver.ts, profile.ts, localstorage.ts, appstate.ts, hydrate.ts, saves.ts, keys.ts, versions.ts, and the no-Node-builtins grep (all read from origin/gh-pages:67-cakepanz/ and commands run). Nothing in this note rests on an un-run claim.
