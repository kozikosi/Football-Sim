# T5 — Persistence: versioned autosave + export/import + replay seed

Goal: a season (or draft in progress) survives refresh; the user can move it between devices. No backend, no accounts, no git dependency.

File: `NFL Draft Simulator.html`.

Steps:
1. Storage schema under ONE key: `mds_save_v1` = `{v:1, savedAt, draftSim, seasonState}`. Only `seasonState` for a completed draft; both gold in draft-in-progress (cloud/ordn free — draftSim's pool can be rebuilt separately on load as roster pool minus picks).
2. Write points (each wrapped `try{localStorage.setItem(...)}catch(e){}` and debounced 300 ms via a shared `scheduleSave()`): after each pick (`executePick`, line ~1324), after `makeUserPick2`/undo, after each simulated week (`simulateCurrentWeek` end), after each playoff game, after lineup-editor apply, after preseason selections (`scriptLocked` transitions).
3. Load path: on `DOMContentLoaded`-equivalent (script bottom near init `setActiveTab(...)`), read the blob ONCE; if present render a toast/card: `Resume your season from <time>?` [Resume] [Start fresh]. Resume restores objects, then routes to goSeason(); Start fresh discards with one confirm.
4. Export/Import: two small buttons in the Season onboarding panel footer (desktop + mobile): Export = `URL.createObjectURL(new Blob([JSON.stringify(save)]))` → download `mds-save-…json`; Import = `<input type=file>` → `JSON.parse` with a version check, restore, render.
5. Seeded RNG (minimal scope, derivable later): introduce `let RNG_SEED = null; function rnd(){ if(RNG_SEED===null) return Math.random(); ...}` mulberry32. **Conversion scope for this packet: draft only** — `cpuPick`, `executePick`, `startDraft2` shuffle. Init seed = user-visible once at draft setup: `Draft seed: <input number>` + "Copy seed" button; same seed ⇒ same draft when run 2×. Season stays `Math.random()` for now.
6. Display `savedAt` in a small line under the Season panel hero (`Season saved locally at …`).
7. Done-when: refresh mid-preseason → resume restores the same week/roster/plans; export → clear storage → import → identical resume; seed demo: two drafts with the same seed produce identical first round (test by logging picks).
8. Forbidden: any key without the `mds_` prefix, storing more than ~1.5 MB (strip caches like `_caches`/UI-only state from the blob via a keep-list).
