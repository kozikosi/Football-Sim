SPEAKER: claude (Architect) | ROLE: Architect | DATE: 2026-11-27T20:23Z
FOR: M-0 cutover and the Z.ai shell (Owner relays to Z.ai). Flags only: no other seat's file is edited.
Bytes read: `origin/council/ds@30080e953:deliveries/zai-s17-continuation-2026-11-25` (below: "delivery"), `origin/council/muse@d8eca10e`, this branch. V = read or run, I = inferred.

## 1. Read before relaying any 27 Nov Z.ai prompt (V)
- **Data loading.** porca's `20261127-2004` (line 71) and hy4's long prompt (line 29) carry my **superseded** instruction: fetch `/dataset/madden27.csv` and pass it to the engine's user import. Do not build that. The contract is `claude/zai-note-2026-11-25-boot-loader.md`: `/dataset/nfl.json` through `createBootDatasetLoader` / `userDataset`. pickle's `20261127-2010` full instructions already say so and leave T1 out of that sitting.
- **pickle's item 12 (offline tent "on the CSV-import path") cannot pass as written.** The delivery has no upload control and no caller of any CSV import outside its engine copies; its empty state says "Import a dataset CSV to begin" and links only to `?dev=1`. The engine's user import also fails on every file (finding F1, `claude/t1-dataset-asset-receipts-2026-11-25.md`; the delivery's `dataset.ts` is the same blob `b940f33b`). Either run the tent on `?dev=1` labelled DEV, or report that leg as UNKNOWN. Do not edit the engine to make it pass.

## 2. For the UI (Z.ai), after the fix sitting
| Flag | Where (delivery) |
|---|---|
| Player CSVs compiled into the bundle: remove all three `?raw` imports | `src/App.svelte:7-9` |
| Player CSVs present in the folder; none may enter the new repo | `src/data/*.csv` (3 files) |
| Wire boot loader and upload control | empty state, `src/App.svelte` around line 503 |
| Account sync surface, when asked: `claude/client-sync-module-2026-11-23.md` + `claude/account-sync-gaps-2026-11-27.md` | not wired today |

Resolved in the delivery, no action: title is "76 Pancakes — Can you go 20-0?"; the stale `ENGINE_PIN` literal is gone (the stamp reads the running engine).

## 3. MUSE's files
- `AGENTS.md` §2 on `council/muse` (lines 44-46) names engine pin `d3bd81d2`. The pin in force is `408410477`.

## 4. Mine, at the cutover or re-pin sitting (listed so nobody else picks them up blind)
- `.github/workflows/ci.yml:27-28` fetches commit `65673a0`, which will not exist in a new repo: pin-watch must compare content hashes.
- CI runs `npm test` (picks the public gate by itself when the data file is absent) but runs no `server/` tests.
- `colors/index.html:6` title is still `20-0` (development page).
- Engine, at re-pin: F1 above; `playWeek` recomputes every team's coaching identity each week (`seasonrun.ts`), worth remembering per season (I).
