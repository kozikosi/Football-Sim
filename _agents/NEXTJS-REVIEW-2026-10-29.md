# Review of the Next.js port (branch `nextjs-analysis`, `football-sim-nextjs` = `football-sim-nextjs-main`), and what it means for Colors
Architect, 29 Oct 2026. Owner asked: read and understand it; find architectural improvements, regressions, missing features, opportunities; let it guide Colors' portability. Labels: VERIFIED = I read the code or ran a command; INFERRED = reasoned, not run; NOT RUN = I did not install or execute their app (npm registry is unreachable here and it is third-party code), so none of their tests or builds were run.

## What it is (VERIFIED)
- The two directories are **byte-identical** (`diff -rq` empty): one app. Next 16.4.3, React 19.3, Zod 4, Vitest 5, Node's built-in `node:sqlite`.
- **React part (about 500 lines, 15 files):** `Game.tsx` gives the engine a `div` and never re-renders it; `useCloudSave.ts` + `SaveBar.tsx` autosave every 2 s, pull on tab focus, and resolve conflicts with "Load theirs / Keep mine"; `db.ts` + two route files are a REST API over one SQLite table; `schemas.ts` Zod-validates every body; `snapshot.ts` tags `Set`/`Map` so JSON keeps them. Five tests (3 database, 2 snapshot encoding).
- **The game is not React.** `src/engine/engine.js` is 673 KB, 8,938 lines, 500 functions inside **one closure** `startEngine()`, `/* eslint-disable */`, plain JavaScript. It is Z.ai's `w24` HTML script (sha `a29be296d6858286`) wrapped in a function. It still builds every screen as HTML strings (75 `innerHTML`, 204 `getElementById`, 163 `window.` uses, 65 `Math.random`, 47 `setTimeout`, 127 `try` blocks). The engine data is the **old 1,200-player set** and the **w24 constants** (`DEFAULT_WEIGHTS` QB 320, DL5 5, P 1), not the Owner's 32-spot table.
- The seam is three functions: `snapshot()`, `signature()`, `restore()` (`src/engine/index.ts`).

## Behavioral regressions and defects (VERIFIED by reading unless marked)
1. **Stored script injection through a save.** The engine writes state strings into HTML templates without escaping (`${p.player[0]}` at engine.js line 3114; no escape helper exists). `restore()` trusts whatever is in the save, and the API accepts **any** string as `data` with no authentication and a shareable `?save=<id>` link. A save whose player name is HTML would run on everyone who opens it. Not executed (INFERRED exploit; the missing escaping and the open API are VERIFIED).
2. **Autosave misses real changes.** `signature()` covers `weights`, the draft position, and season phase/week/playoff size. It does **not** cover `personalWeights`, lineups, game plans, defensive posture or any roster edit, so those are saved only when the next pick or week moves. A tab closed after a lineup change loses it.
3. **Partial restore is silent.** `restore()` wraps its steps in `quiet()`, which logs a console warning and carries on; it also resets `draftUI`, ignores `resultsView`, and sets `window._zpbKickStarted` / `_zpbFinDone` flags to stop cinematics. A failed step leaves a half-restored screen with no message.
4. **Remount leaves a blank page.** `mountEngine` caches the engine in a module variable and injects the markup only on the first call. If React unmounts and remounts `Game` (navigation, a layout change), the new host div stays empty and the engine keeps drawing into the old nodes.
5. **Two tabs fight.** Both autosave the same save; each gets 409 from the other, and "Keep mine" overwrites without a diff. The focus pull downloads the whole save list (`api.list()`) to compare one version number.
6. **Bandwidth.** While anything moves, a full 0.3-1 MB JSON state is uploaded every 2 s (INFERRED total for a draft: tens of MB).
7. **No ownership.** `GET /api/saves` lists every save for every visitor; `DELETE` is open. (The README says so.)
8. **Body size check happens after parsing** (`request.json()` first, then a Zod byte check), so the 20 MB cap does not stop the memory use (INFERRED for Next route handlers).

## Architectural improvements
1. **Make the engine a module graph, not a closure.** It cannot be unit-tested, run in a Web Worker, seeded or typed as it stands; the port only moved the problem into a file. (Colors' answer: pure TypeScript modules.)
2. **The port is frozen at w24 and has no regeneration script** (`ENGINE_SOURCE_SHA` is a one-time stamp). Every Z.ai wave needs a manual re-port; engine truth and UI truth will drift.
3. **Version and validate the save.** Add `schemaVersion` and `engineVersion`, Zod the whole state at load (it validates only the envelope), and write migrations; `EngineSnapshot` is mostly `unknown`.
4. **Save a seed and the player's decisions, not the whole state** (needs a seeded engine). A season is then a few KB, replay verifies it, and the 2-second 1 MB upload disappears. Keep periodic checkpoints for fast load.
5. **Database:** use a migrations table, compress `data`, scope rows to an owner, and keep the OCC rule (see Opportunities). `DatabaseSync` blocks the event loop and needs a persistent disk, so it cannot run on Vercel or Cloudflare Pages (the README says this too); the project's own architecture decision (spec 13) is Cloudflare, which means D1 or KV behind the same interface.
6. **Next features that nothing consumes:** `cacheComponents` and `partialPrefetching` are experimental flags on a page that is one client island; Google Fonts load from a CDN at runtime (use `next/font` or self-host); there is no CI, e2e test or error reporting.

## Missing features
Accounts or any ownership; export/import of a save as a file (the safest offline fallback); offline queue for failed autosaves; schema migration of old saves; engine tests (zero); a determinism test; a Playwright smoke; a 390 px check.

## Opportunities (what to keep)
- **Optimistic concurrency done right:** a `version` column, `UPDATE ... WHERE version = ?`, 409 with the current meta, and a test proving a stale write is refused (`db.test.ts`). Reuse as is.
- **Zod at the HTTP boundary** and `z.flattenError` 400s; **`server-only`** guard with a Vitest alias; **`npm run check`** = lint + types + tests as one gate.
- **The typed `Engine` interface** (`snapshot / signature / restore`) is the right seam. Colors should expose the same three, typed end to end, plus `dispatch(action)`.
- **`useCloudSave`** is a clean, small state machine (`loading | unsaved | saving | saved | conflict | error`) worth copying whatever the framework.

## What this means for Colors (decisions; all reversible)
1. **The framework is only the UI shell.** Colors' engine is already pure TypeScript with no DOM and a seeded RNG, so Next, Svelte or none of them can host it. Keep it that way, and **enforce it with a test** (added: `colors/test/purity.test.ts`: no `document`, `window`, `Math.random`, `Date.now`, `localStorage`, `process` or imports from outside `src/engine`).
2. **Plain, serialisable state by construction:** no `Set`/`Map`/classes in engine state (the `$set` tagging hack disappears), versioned, Zod-checked at load, strings escaped at the one place HTML is made (or no HTML strings at all).
3. **Saves = seed + decisions + checkpoints**, with `engineVersion` stored; the sync API is optional and later (Cloudflare Pages Functions + D1 behind the OCC contract above). The product stays **one self-contained HTML file** (AGENTS.md section 3), playable offline with save-to-file.
4. **Svelte 5, not Next, for the UI (my recommendation, matches the Owner's lean).** The game is 100% client-side, imperative, animation-heavy and state-machine-driven: Next's strengths (server rendering, routing, server components, API routes) are unused, and React's re-render model is exactly what this port had to wall off (`display: contents`, "React never re-renders it"). Svelte's fine-grained reactivity fits a mutable engine, and it compiles to small plain JavaScript that a single-file build can inline (Vite with a single-file plugin). **To learn Next and React from this repo:** read the ~500 lines listed above; ignore the 673 KB engine, which is not React. Next becomes attractive only if Colors grows accounts, multiplayer or a hosted leaderboard.
5. **Do not adopt:** the closure-engine, HTML-string screens, silent `try`/`catch` around state changes, whole-state autosave on a timer, unscoped saves.

## Not checked
Their build, lint, type-check and tests (NOT RUN); the Playwright behaviour of save/restore; how current w34 differs from this w24 port (not diffed); whether any exploit actually executes; the real size of a mid-season save.
