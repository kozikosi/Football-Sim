SPEAKER: architect | ROLE: Architect | TASK: E4 (storage wave) | DATE: 2026-11-03

FOR: STORAGE-WAVE (E2/E4)

VERIFIED (colors/ test suite, 255 pass, mutation-checked): the draft is now saved as a LOG over a FROZEN pool, and the draft payload layout changed in one place.

1. `FrozenPoolRow` is now 8 columns: `[pid, name, pos, team, ovr, spd, str, freeAgent 0|1]` (pid added first; it comes from `data/player-ids.csv`, E1). `schemaVersion` stays 1 because no save has shipped. Storage still treats `payload` as opaque.
2. `DraftPayload.picks` holds EVERY pick made so far (CPU and user, in order, `{overall, team, pid, slot}`), not only the user's. `pool` is the board as it was when the draft began.
3. App side: `colors/src/app/store.ts` `AppState.record` IS the `DraftPayload`. To save: `serialize('draft', slot, versions, state.record, now)`. To resume: `restore(text)` then `store.dispatch({type:'LOAD', record: env.payload})`. The resume never reads the live player data and never re-runs a CPU decision for a logged pick.
4. Undo cuts the log back to just before the user's last pick. The screen after a refresh is identical to the screen before it (the store always settles on the state restored from the log).
5. Player ids are now `p00001`-style pids everywhere (E1). `Player.id` and `FrozenPlayer.id` are pids.

Still open for storage: URL/origin, Safari eviction, stats list. Next from me: E5 (engine/data version stamps), then step-9 gaps.
