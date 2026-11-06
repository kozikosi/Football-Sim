# 05-viewmodels-screens — the Draft Board slice and the screen drafts (w74 items 5a–5h)

**What this is:** the Draft Board slice END-TO-END (engine → store → view model → Svelte 5 component → dispatch), the Team Select and Season/Standings view models, and six smaller screen drafts (feed UI, brag shareables, seed card, seed-share URL, read-only sharing, a11y bootstrap). This is the **pattern-freeze forcing function**: every place the VM pattern was ambiguous, I made the best call and flagged it **G-VM1…G-VM11** — Claude rules on the list and the freeze is real.

**Test counts:** 288 = the full vitest suite (core + nfl + app) · 286 = 288 minus the 2 storage-env-dependent tests skipped in the sandbox run · 284 = 286 minus the 2 golden-seasons tests that were still warming (288−2−2).

**Verified, not just drafted (in a fresh worktree copy at `425f72a` + this folder):**
- `npx vite build` → **✓ built** — `61.4 KB JS / 23.75 KB gzip` for the WHOLE slice including the engine (budget check for 7a: the 150 KB app-shell budget has ~126 KB of headroom before any dataset).
- `npm test` → **286/286 pass** (no regressions from the new files).
- `npx playwright test` → **2 passed (8.8s)** — the slice check runs on the synthetic dev pool, no dataset, no network.

**Applies to:** branch `architect/engine-and-seats` at `425f72a`; needs the folder-04 patches applied first (the slice imports the F1-renamed store and F10's BoardSort).

## Files (repo paths under `colors/`)

| Path | New | Item | One line |
|---|---|---|---|
| `src/main.ts` | new | 5b | the missing Vite entry: a11y boot read → mount(App). Fixes the "npm run build fails: no entry point" gap |
| `src/App.svelte` | new | 5b | screen switch (G-VM4: draft-store status until the AppState reducer lands); read-only banner |
| `src/lib/app-store.svelte.ts` | new | 5b | the Svelte 5 adapter: `$state.raw` snapshot (G-VM2), one module-level store (G-VM3), read-only dispatch guard (5g) |
| `src/lib/components/TeamSelect.svelte` | new | 5a/5b | 32-team choice grid + seed field → `START` |
| `src/lib/components/DraftBoard.svelte` | new | 5b | board table + sort pills + pick buttons + undo + full roster panel; pure renderer over `selectBoard`/`selectRoster` |
| `src/lib/components/Feed.svelte` | new | 5c | drive-level feed over `GameFeed` (item 4d); expandable drives; play-by-play slot ready |
| `src/platform/devPool.ts` | new | 5b | ~1,300 deterministic SYNTHETIC players — the EA CSV stays denylisted; deleted when the DatasetLoader boots the app (flagged) |
| `src/platform/a11y.ts` | new | 5h | `readA11yAtBoot()`: reduced motion/contrast/forced-colors/reduced-data + persisted font scale → `data-a11y-*` on `<html>`; state, not CSS-only |
| `src/sports/nfl/view/teamSelect.ts` | new | 5a | Team Select VM (pure, pre-formatted) |
| `src/sports/nfl/view/season.ts` | new | 5a | `standingsVM` / `seasonVM` / `userResultsVM` — re-derive via the ENGINE's own `table()`/`seedPlayoffs()` so screens and hydration cannot drift |
| `src/sports/nfl/app/brag.ts` | new | 5d | brag cards from a season/week envelope: headline, record, lines, save digest, 1080×1350 SVG poster. **No replay URLs, no seed leak** (Kosi's ruling); SVG only, no canvas |
| `src/sports/nfl/app/seedcard.ts` | new | 5e | seed + action log + state digest on ONE card; `parseSeedCard()` feeds 7g's replay harness |
| `src/sports/nfl/app/seedshare.ts` | new | 5f | `?w=<seed>`: `seedShareUrl()` / `seedFromUrl()` / `withWorldSeed()` — one URL param, one ADDITIVE `worldSeed?` envelope field (flagged for the freeze doc, 8b) |
| `src/sports/nfl/app/share.ts` | new | 5g | read-only share format `{share:{v,readOnly,exportedAt}, save:<envelope text byte-exact>}`; `parseShare()` re-validates through the SAME `restore()` — a shared save gets zero extra trust |
| `test/e2e/draft-board.spec.ts` | new | 5b | the two slice specs (pick/undo + same-seed-same-board) |
| `playwright.config.ts` | new | 5b | dev-server runner (`--host 127.0.0.1` pinned: vite 8 binds `::1` only without it — one lost minute, saved for Kosi) |

## The pattern-freeze list (rule on these, Claude)

| # | The call I made | Where |
|---|---|---|
| G-VM1 | VMs are pure functions state → plain JSON; components render, never compute (extends `view/draftBoard.ts`'s established pattern) | all VMs |
| G-VM2 | store snapshot via `$state.raw` — big data (frozen pool) must never sit in deep reactivity (7b's lint rule) | app-store |
| G-VM3 | ONE module-level store imported by every component; components dispatch directly (React port later wraps the SAME store) | app-store |
| G-VM4 | the slice wires the DRAFT store; `App.svelte`'s screen switch maps to appstate's Screen union so the AppState-reducer swap is mechanical | App.svelte |
| G-VM5 | ephemeral board sort lives in COMPONENT `$state`, not the store, until the whole-app reducer exists (appstate.ts says `ui.boardSort` belongs in AppState — one of us moves) | DraftBoard |
| G-VM6 | Team Select VM takes the store's error string, not whole state; signature widens later, body unchanged | teamSelect VM |
| G-VM7 | season VMs take the WeekPayload, not AppState (G-VM8) | season VM |
| G-VM8 | (numbering merged into G-VM7's table row) | — |
| G-VM9 | `standingsVM` re-derives the table through the ENGINE's `table()` via a `{scores} as RunState` cast — one table builder for hydration + screens; the cleaner fix is a scores-only engine signature (one line, filed) | season VM |
| G-VM10 | feed open-drive state is component `$state` (ephemeral by the appstate classification) | Feed.svelte |
| G-VM11 | read-only share flag lives in the store ADAPTER (one choke point), never in the save state | app-store, share.ts |

## Decisions that need ruling beyond the freeze

1. **devPool.ts is a stopgap**: the slice must not bundle the EA CSV (denylist/CI), and the Owner's real ratings are his own later work. Ruling wanted: is a synthetic dev pool acceptable in the repo, or should the slice's dev server boot through the DatasetLoader's no-dataset state with a manual import step in dev?
2. **`worldSeed?` envelope field** (5f): optional + additive, `schemaVersion` stays 1, conformance test reads absent as "worldSeed === seed for draft saves".
3. **Share format** (5g): wrapper v1 as above; the viewer's "cannot save" is enforced by wiring (no saver constructed), not by a flag inside the envelope — a shared save is a normal save that happens to be opened read-only.
4. **The brag digest** (5d) is `hash53(state JSON)` — the same primitive as the seed card; one digest function everywhere (7g harness included).
