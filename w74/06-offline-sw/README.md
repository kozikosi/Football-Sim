# 06-offline-sw — service worker, offline acceptance, cache-coherence floor (w74 items 6a–6c)

**What this is:** the offline layer, implemented against the w72 §3 design and verified by an airplane-mode Playwright run. The build derives its own service worker; the app boots and plays a draft with the network fully down; saves from below the platform floor are refused in plain language.

**Verified in the worktree at `425f72a` + this folder:** `npx vite build` emits `dist/sw.js` + `dist/sw-manifest.json`; `npx playwright test --config=playwright.offline.config.ts` → **3 passed (10.7s)**, including `offline.spec.ts` "airplane mode: the app boots and the draft is playable from cache" (3.1s). The slice specs (folder 05) still pass on the same run.

**Applies to:** branch `architect/engine-and-seats` at `425f72a`; needs folders 04–05 applied first (the SW registration lives in the folder-05 `main.ts`; the config wire-in is below).

## Files (repo paths under `colors/`)

| Path | New | Item | One line |
|---|---|---|---|
| `tools/vite-plugin-sw.mjs` | new | 6a | generates `dist/sw.js` + `dist/sw-manifest.json` from the BUILD OUTPUT at `closeBundle`: one cache key per build (`colors-<buildHash>-v<N>`), precache = `/` + every emitted asset, skipWaiting + clients.claim, old caches deleted on activate, update-toast state channel. **The manifest is never hand-maintained and stale chunks cannot hide** — a build whose hash differs is a new cache. |
| `vite.config.js` | patched | 6a | wires `serviceWorkerPlugin()` after `svelte()` |
| `src/main.ts` (folder 05's copy) | patched | 6a | registers `/sw.js` in PROD only; listens for the SW state message → `data-sw-version` on `<html>` for the update toast |
| `test/e2e/offline.spec.ts` | new | 6b | airplane-mode acceptance: warm online pass (SW installs, precache verified via `caches`) → `context.setOffline(true)` → cold reload → app boots → two picks + one undo **from cache** |
| `playwright.offline.config.ts` | new | 6b | runs against `vite preview` (the SW exists only in builds), port 4173, host pinned |
| `src/platform/versionfloor.ts` | new | 6c | `checkVersionFloor(env)`: refuses saves whose engine stamp is below the runtime floor, plain-language message, nothing repaired; wired BEFORE hydration in the LOAD_OK path |

## Two real findings the offline test caught (the reason the test exists)

1. **Network-first navigations are the wrong tool here.** The first draft served an EMPTY body on an offline reload (shell cached, page dead): offline `fetch(navigationRequest)` + reload-request matching are Chromium quirks. Fixed by making navigations **stale-while-revalidate** — cached shell answers first (an offline-first game boots from cache, online or not), background refresh updates the cache. Freshness is unchanged: skipWaiting means a new build takes over on the next reload either way.
2. **`Vary: Origin` breaks Cache.match for module scripts.** vite preview sends `Vary: Origin`; precache entries are stored from `no-cors` requests (no Origin header) but module scripts fetch with `mode: 'cors'` and DO carry Origin — Cache.match's Vary check misses the same URL it just stored. Every SW match now uses `ignoreVary: true` (the cache holds only our own build artifacts). Both findings are documented in the SW source, not just here.

## Decisions that need ruling

1. **G-SW1:** the SW is a string ASSEMBLED by the plugin (not a compiled `sw.ts`): the SW is ~100 dependency-free lines and the plugin is the single source of truth for strategy + manifest. If the Architect prefers a real file, the logic moves unchanged to an `emitFile` build entry.
2. **G-FLOOR1 — what the floor is:** proposal = the ENGINE_LABEL major (`nfl1`), not a numeric schema. A ruleset change that changes what a save MEANS bumps the label and the previous label becomes the new floor's target; additive envelope changes never bump it. The floor is inert today (every save is nfl1) and testable now — the refusal path is one `expect` away.
3. **Manifest version (`v1` in the cache name):** bumped by hand when the precache STRATEGY changes, not on every build — the build hash already separates builds.
