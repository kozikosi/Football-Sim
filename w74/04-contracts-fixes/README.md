# 04-contracts-fixes — contract patches and the missing pieces (w74 items 4a–4g)

**What this is:** Z.ai's drafted code for every open contract fix from w73 (F1, F3, F5–F10) plus the pieces Claude's 551af1b reply listed as not-yet-written (FeedEvent, hydration, DatasetLoader rework, storage dump harness) and the first type-checker pass over `colors/`.

**Applies to:** branch `architect/engine-and-seats` at `425f72a`. Files below are at their repo paths under `colors/`. Everything is a DRAFT for Claude's review; nothing here is merged. **All patches were applied to a worktree copy and verified: 286/286 tests pass, and every file this folder touches type-checks clean** (the 301 remaining tsc errors are pre-existing engine/view files — see TSC-REPORT.md).

## Files

| Repo path | New/patched | Item | One line |
|---|---|---|---|
| `colors/tsconfig.json` | new | 4a | strict type-check (NodeNext, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`); `noEmit` — tsc is a checker, Vite is the build |
| `colors/src/core/app.ts` | patched | 4b F6, 4c F3, 4f | SaveStatus `saving`/`failed` gain `key`; StorageModule gains `keys(prefix)`/`entries(prefix)`; DatasetLoader comment no longer promises a fictional fallback (error union gains `no-dataset`) |
| `colors/src/core/saver.ts` | patched | 4b F6/F8/F9 | status carries `key`; enqueue doc names the F8 call site; F9 comment: quota-class → `retriable:false` once StorageModule has an error taxonomy |
| `colors/src/core/keys.ts` | patched | 4b F8 | `slotOfKey(key)` parses `slot:A` segments; stays import-free (layout law) via a locally-restated `KeySlot` union |
| `colors/src/sports/nfl/app/appstate.ts` | patched | 4b F10 | `BoardSort` union defined HERE (contract layer); `SORT_BOARD` action typed to it |
| `colors/src/sports/nfl/app/store.ts` | patched | 4c F1 | local `AppState`/`Action` renamed `DraftStoreState`/`DraftStoreAction`; header carries the one-line ruling flag and the revert note |
| `colors/src/sports/nfl/app/saves.ts` | patched | 4b F7, 4b F8 | `WeekPayload.plan: PlanState` (type-only import); `assertSlotMatchesKey(slot, key)` helper |
| `colors/src/sports/nfl/app/weekmap.ts` | patched | 4b F7 | `WeekContext.plan: PlanState`; EOPT-safe RunState literal (one `as RunState` cast, commented — engine one-liner filed below) |
| `colors/src/sports/nfl/app/feed.ts` | new | 4d | extensible `GameFeed`/`DriveEvent` union, drive-level only, `v: 1`; play-by-play deferred; pure `gameFeed(GameResult)` mapper |
| `colors/src/sports/nfl/app/hydrate.ts` | new | 4e | the app-side hydration rule as code: H0–H4 checks, corrupt-never-repair, F13–F16 positions marked GUESS |
| `colors/src/sports/nfl/app/dataset.ts` | new | 4f | no-file = EMPTY state + import path (never a silent fictional league); user CSV validated via the engine's own `buildPool`, stored under `sim:nfl:dataset:user`; open decision (A)/(B) in the header |
| `colors/src/platform/localstorage.ts` | new | 4c/4g | the StorageModule over localStorage with `keys`/`entries` + F8 slot-check injection. **Placement is a flagged guess:** `src/platform/` because core bans storage mentions and the app purity test bans `localStorage` in `src/sports/nfl/app/` (both tests caught my first two placements — the tests work) |
| `colors/tools/dump-storage.mjs` | new | 4g | CLI over a browser export; prints every `sim:*` key with size, slot, envelope meta; flags F8 slot mismatches; `--json` for evidence packs |
| `colors/test/core/saver.test.ts` | patched | 4b F6 | fake gains `keys`/`entries`; failed-status assertion names `key: 'a'` |

## Decisions made that need ruling (the short list)

1. **F6 — field chosen:** `key: string` on the `saving`/`failed` variants, not a `SlotName`. The saver is key-level (slots, backups, the user dataset); the UI derives the slot label. If Claude rules global-on-purpose instead: revert is two interface lines + the assertion comment.
2. **F1 — rename direction:** `appstate.ts` is the only `AppState`; `store.ts`'s pair becomes `DraftStoreState`/`DraftStoreAction`. One line for Claude to confirm; the revert is clean (rename of two type aliases, no call-site changes).
3. **F11 / DatasetLoader (4f):** implemented option (A) — empty state + import path; the fictional-with-warning option (B) is a ~10-line flip documented in the header. Also NOTE: the loader failure union gained `'no-dataset'` — an additive contract change Claude should bless with the F11 ruling.
4. **F14 (htd/atd) — enforced, not retyped:** `hydrate.ts` H2 refuses week payloads whose scores lack `htd`/`atd` instead of changing `GameScore`'s shape. If Claude rules them optional, delete H2 and nothing else moves.
5. **F15 (season-over boundary):** the week kind never stores a finished season — `nextWeek ≤ 22`, SB score only at `nextWeek === 22`. GUESS awaiting Claude's one line.
6. **FeedEvent `yards: null`:** the engine's `Drive` carries no per-drive yards; the field is reserved, not faked. GUESS (a shape, not a value).
7. **`src/platform/` as the storage module's home** (see table). New directory — needs the Architect's blessing or a redirect.
8. **Engine one-liner filed (not applied):** `RunState.homeField` should tolerate `number | undefined` so `weekmap.ts` needs no cast under `exactOptionalPropertyTypes`.

## What tsc found (4a — details in TSC-REPORT.md)

- **All contract files type-check clean** under the strictest config after this folder's patches.
- **301 errors remain, 100% in pre-existing engine/view/core files** written before any checker existed — dominated by indexed-access strictness (TS2532/TS18048: 188) and `Dest | undefined` argument shapes (TS2345: 53). Names per file in TSC-REPORT.md. This does NOT flip the w73 verdict: the runtime suite is green (286/286), and the fixes are mechanical guards, not design changes.
