# COLORS-V1-UI-ARCHITECTURE — how the engine meets the w52 shell (Architect, 1 Nov 2026)

Status: **proposed** (nothing built yet). Labels: VERIFIED = I measured it on the w52 bytes; INFERRED = reasoning.

## 1. What the w52 shell is (VERIFIED on `Football-Sim-Z-post-blue-w52.html`, md5 40613b81…, 1,585,036 B, branch `council/zai` bf9fe4b)
- 12 script blocks. Block 1 is **1.24 MB**: the OLD engine and the UI in one file (474 top-level functions, 449 `document.` refs, 86 `innerHTML` writes, 60 `Math.random()` sites). CSS is 264 KB, with theme tokens in `<style id="zpbtheme">`.
- Engine and render are interleaved (`simulateGame`, `playGame`, `cpuPick` sit beside `renderDraftBoard2`, `renderGameResultHTML`). The UI is string templates (`...HTML()` functions), so state lives in globals and the DOM.
- The shell's behaviour laws (look-gate, sync clock, takeover colours, storm/whistle gate, w51 regression battery 25/25) live in the same script. **They must survive the swap.** The retired laws are listed in `UPDATE-README-w52.md` "Retirement notes".

## 2. Decision: the engine never learns about the UI; the UI never learns the maths
Three layers, one direction of dependency (engine → view-models → UI):
1. **`colors/src/engine/`** (exists, pure, seeded, 188 tests). Produces typed data: `League`, `SeasonResult`, `Recap`, awards.
2. **`colors/src/view/`** (new, pure TypeScript, no DOM, no framework). Functions `(engineState) → plain JSON-serialisable view-model`. One per screen: `draftRoomVM`, `boardVM`, `rosterVM`, `gamePreviewVM`, `gameDayVM` (drive ticker), `recapVM`, `standingsVM`, `bracketVM`, `awardsVM`, `seasonReviewVM`, `hundredSeasonVM`. All number formatting goes through `display.ts` (Owner rule). View-models carry **semantic tokens** (`tone: "good"|"bad"|"neutral"`, `team: "KC"`, `isUser: true`), never colours or CSS.
3. **`colors/src/ui/`** (new, thin): renders a view-model. Two adapters, written from the same component list so the Owner can pick either:
   - `ui/svelte/*.svelte` (Svelte 5, runes)
   - `ui/react/*.tsx` (React, hooks)
   Components are **dumb**: props in, markup out, events out (`onPick(playerId)`, `onSim()`), no engine imports, no `Math.random`, no `localStorage`. A third file per screen, `ui/spec/<screen>.md`, lists props, states (empty, loading, error, 390 px) and which design tokens it uses; that is the portability contract.

State: one store module `app/store.ts` with a framework-free API (`getState`, `dispatch(action)`, `subscribe`). Svelte binds through its store contract, React through `useSyncExternalStore`; both are 10-line adapters. Actions are plain objects (`{type:"PICK", playerId}`), so the engine can run headless in tests and in a worker later.

Persistence (Owner wanted resume-on-refresh): the store serialises `{seed, draftLog, season log}` and **replays** the engine from the seed, instead of storing the whole league (small, tamper-resistant, versionable). INFERRED to work because the engine RNG is injectable and seeded; needs a test: replay hash equals live hash.

## 3. How the w52 look comes across (the shell is the brief, not the codebase)
- **Take from w52 verbatim:** design tokens (`#zpbtheme` variables, team palettes for 32 teams in both themes, text contrast tints), the motion vocabulary (look-gate reveal, storm, banners, halftime show), copy rules from the Owner's V22 list, and the regression battery's *assertions* (re-pointed at the new DOM).
- **Do not take:** the 1.24 MB script, the `data-zseen`/`zpb-seen` selector logic as written, or any `innerHTML` templating. Reimplement the look-gate once as a framework-free `ui/core/lookgate.ts` (IntersectionObserver, single clock, mirror law: M1 root cause recorded in `W52-BUILD-REPORT.md` — never filter a release by `:not([data-zseen])`).
- Tokens move to `ui/tokens.css` (CSS custom properties) and `ui/tokens.ts` (same values for tests). Team colour contrast is computed once at build time (readable-on-dark tint per team; fallback when two colours are close).
- 390 px is a first-class layout: components stack by container queries, never by page media queries alone (w52 M13 already proved this approach).

## 4. Build and delivery
`build/build.mjs` bundles engine + view + chosen UI into **one self-contained HTML** (no CDN, no runtime fetch; Owner rule). The bundler is esbuild if I can install it in the sandbox (UNKNOWN until tried); fallback is a small script that strips types with Node and inlines modules. Product name shown: **20-0**; file `Football-Sim-Colors-v1.html`.

## 5. Order of work
1. `view/` for the draft room (board with Gone%, priority, wins; roster; depth chart) + tests that a VM contains no raw floats (everything pre-formatted) and is `JSON.stringify`-stable.
2. `app/store.ts` + replay persistence test.
3. Tokens + look-gate + draft room in **Svelte** first (smallest runtime); mirror the same components in React from the spec files; one shared Playwright check at 390 px for both.
4. Season screens (preview → game day ticker from `buildRecap` → review), then playoffs/Super Bowl cinematics (reuse w52 storm/whistle logic), then awards/advanced stats, then 100-season.
5. Re-run `calibrate-draft.ts` with the final CPU; test order to `_agents/TEST-ORDERS/colors-v1-1.md`.

## 6. Open points (recommended defaults; nothing blocked)
- **Svelte first, React mirror**: recommended; Owner may flip.
- Engine gaps listed in `00-READ-FIRST` §2 (per-week plans, user plan choices, head-to-head lines, previews, advanced stats) need `view/` inputs; I build engine pieces as each screen needs them.
- Playwright is not yet confirmed installable here (UNKNOWN); if not, the 390 px gate is a test order for a seat that has it.

## 7. Optional sign-in and cloud saves (Owner idea, 1 Nov; STORED, later)
The store's save format is already a small portable record (`{version, seed, draftLog, seasonLog}`), so local save (localStorage, try/catch) comes first and cloud save is the same record sent elsewhere. Rules from the Owner's note: sign-in is **optional** (the simulator works with no account); use a maintained OAuth 2.0 / OpenID Connect implementation (Auth.js, Better Auth or a managed provider, chosen with the framework and host), never homemade password handling or unverified email/password; test the authorization boundaries (a user can never read or write another user's saves; shared links are scoped read-only). Conflict to resolve with the Owner when we get there: the product rule is one self-contained HTML with no paid API, and cloud saves need a hosted backend. Recommended default: keep the simulator file fully offline and ship the accounts/cloud saves as a separate, optional portfolio module that talks to the same save record.
