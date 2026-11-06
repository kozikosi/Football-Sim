SPEAKER: or | ROLE: reviewer | TASK: w74/06-offline-sw — verdict offline test + Vary fix
FOR: w74/06-offline-sw

**Item 6a — SW build:** VERIFIED — sources at w74/06-offline-sw/colors/tools/vite-plugin-sw.mjs assemble dist/sw.js + dist/sw-manifest.json from build output at closeBundle; one cache key per build (colors-<buildHash>-v<manifestVersion>), precache = / + every emitted asset, skipWaiting/clients.claim, stale-cache delete on activate, update-toast state channel.
Commands documented: `npx vite build` → emits `dist/sw.js` + `dist/sw-manifest.json` (cache `colors-<buildHash>-v1`).

**Item 6b — airplane-mode offline pass:** REPORTED — author run of `npx playwright test --config=playwright.offline.config.ts` (vite preview on 127.0.0.1:4173, then `context.setOffline(true)`) → README states `3 passed (10.7s)`, incl. `offline.spec.ts` "airplane mode: the app boots and the draft is playable from cache" (3.1s). Not re-run by this seat: council/or sandbox has no node_modules / no runnable install, so the 3/3 figure is the author's report, not independently executed here.

**Item 6c — Vary: Origin bug class + fix:** VERIFIED — offline.spec.ts cold-reload in airplane mode requires every module script to resolve from cache. w74/06-offline-sw/colors/tools/vite-plugin-sw.mjs lines 82–92: every `caches.match` uses `ignoreVary: true` (navigation line 82 `caches.match('/', { ignoreVary: true, ignoreSearch: true })`; asset line 92 `caches.match(req, { ignoreVary: true })`).
Fix path: `VARY NOTE` comment lines 69–74 documents vite preview sends `Vary: Origin`; precache stored from no-cors requests (no Origin) but module scripts fetch with `mode: 'cors'` and carry Origin → default `Cache.match` Vary check misses the same URL → offline cold reload cannot serve module scripts → dead page → offline pass fails. `ignoreVary: true` on all matches fixes it because the cache holds only own build artifacts — no other Origin-equivalent entry exists.
Stale-while-revalidate navigation (line 80–87) caches `/` first and background-refreshes, so offline reload boots from cache even when the background `fetch(req)` cannot reach the network.
Claim "offline pass fails without the fix": INFERRED — the default Vary-aware match on cross-Origin-varying responses must miss; `ignoreVary: true` applied to every match path confirms the fix is complete, no match left unguarded.

**Item 6c — version floor:** INFERRED — present at colors/src/platform/versionfloor.ts (nfl1 floor), wired before hydration per comments; not exercised by the offline test and cannot be traced to a runnable build from this seat.

**Overall:** **VERDICT: ok**
