# dispatchAsync contract (Architect, 20 Nov 2026) — build slices 3-5 against this

Engine pin: **408410477** (`colors/src` tree `8d8a8a1e…`, byte-identical at `ee3b6e1`). No engine changes. Labels: V = verified this session (read or ran), I = inferred.

## 1. The API (V: `colors/src/sports/nfl/app/store.ts:147`, `selectors.ts:20-24`)

```ts
store.dispatchAsync(a: DraftStoreAction): Promise<DraftStoreState>
selectBoardAsync(s: DraftStoreState, opts?: { sort?; limit?; sims? }): Promise<{pending:true} | {pending:false; vm: BoardVM|null}>
```
`DraftStoreAction` = `START{seed,userTeam,pickSlot?}` | `PICK{playerId,slot}` | `UNDO` | `LOAD{record}`.

Guarantees (each pinned by a test in `colors/test/nfl/store.test.ts`, S4 block):
1. **Serialised in call order.** A second call never starts before the first settles.
2. **Yields one macrotask first**, so the caller can paint "working" before the engine runs.
3. **Never rejects.** A rejected action (illegal fit, not your pick, nothing to undo, bad save) arrives as `state.error` (string) on the resolved state. A throwing subscriber is caught and warned.
4. **Resolves with the state after this action.** Same result as the sync `dispatch` (record deep-equal, tested).
5. Subscribers still fire synchronously inside the action, so the Svelte `readable` wrapper (`asReadable`) needs no change.

## 2. The exact shell calls that move (VERIFIED by hy4 against the S13 tree, engine byte-identical to pin `408410477`; I have not opened that tree myself. Z.ai: line numbers shift once you edit above them, so re-locate by the call text. The deployed gh-pages tree is no longer a build target; Cloudflare is the deploy, per the Owner, 20 Nov.)

Four live sites, all must move together (never mix `dispatch` and `dispatchAsync`, section 3):

| c12 anchor | Now | Becomes |
|---|---|---|
| `:148` START | `store.dispatch({type:'START', seed, userTeam, ...(slot!==null && slot-1!==userTeam ? {pickSlot:slot} : {})})` | `await store.dispatchAsync({...same args, including pickSlot...})`. **Keep `pickSlot`**: it carries the Owner's draft-position choice. |
| `:178` PICK | `store.dispatch({type:'PICK', playerId, slot} as any)` | `await store.dispatchAsync({type:'PICK', playerId, slot})` (drop `as any`; the type is exact) |
| `:184` UNDO | `store.dispatch({type:'UNDO'}); refresh(); void autosaveDraftNow();` | `await store.dispatchAsync({type:'UNDO'}); refresh(); void autosaveDraftNow();` |
| `:208` LOAD | `store.dispatch({type:'LOAD', record} as any)` | `await store.dispatchAsync({type:'LOAD', record})`. LOAD is **already live** on c12; it is not a new slice 3-5 row. A synchronous LOAD left behind breaks section 3. |

Keep the existing `valuation.lock()`, `refresh()` and the board rebuild (`goneOdds` + `boardVM`, or `selectBoardAsync` per section 3) where they are; only the dispatch call and its `await` change. Line anchors are as reported and will shift once Z.ai edits above them.

Not moving: `getState()`, `subscribe()`, `valuation.*`, `lineupFor` (pure, synchronous, stays).

## 3. Rules for the shell (these are the traps)

- **Never mix `dispatch` and `dispatchAsync` in product code.** The sync call runs immediately and can overtake a queued async one. Sync `dispatch` stays for tests only; once all four sites above (START, PICK, UNDO, LOAD) move, the shell uses async only.
- **Add a `busy` flag**: set before each `await`, clear in `finally`, and disable pick/undo/start controls while set. Queued double-clicks otherwise become a second PICK that fails "it is not your pick".
- **Read the error from the resolved state, and clear it.** `error` is not cleared by a failed action and is reset to `null` only by the next successful one (V: `settle`). The deployed shell does `if (st.error) error = st.error`, which never clears. Use `error = st.error ?? ''` on every resolve.
- **Gone-odds numbers will change** (V: `selectors.ts` seeds from `makeRng(record.seed).fork('gone'+pos)`; the shell seeds `makeRng(seed*7+13)`). Same method, different draws, so the cutover battery's "gone-odds equality (30 sims)" law compares method, not digits. Moving to `selectBoardAsync` also makes the board reproducible from the save, which the shell's `seed*7+13` is not (I).
- **`selectBoardAsync` returns `null` vm unless `status==='drafting'`.** The shell's "hold the last board while the CPU is on the clock" `try/catch` becomes: keep the previous vm when `r.vm === null` and status is still `drafting`, clear it on `idle`.
- **Honest limit:** the engine still runs on the calling thread (comment at `store.ts:144`). The contract is what lets a Worker sit behind it later. Do not promise the UI non-blocking behaviour yet.

## 4. Deployed gap (V)
The previously deployed gh-pages snapshot (no longer a build target) has **0** `dispatchAsync` (pin has 3) and differed from `colors/src` in 12 files (`keyedrng, pack, appstate, feed, saves, selectors, store, draft, flex, lineup, slots, draftBoard`). So slices 3-5 must be built on the c12 tree (pin `408410477`), not on what is deployed. Z.ai produces the Cloudflare-ready static build and hands it over; the Architect and the Owner deploy.

## 5. Test the shell must keep green
V: `slice1.battery.mjs` has no `dispatch`, `getState` or `__cp` references; it drives the built UI through Playwright. I (inferred): it needs only timing changes, i.e. wait for the `busy` flag to clear (or for the new DOM state) after each click instead of assuming a synchronous pick. `window.__cp` (dev hook; REPORTED on c12 at `App.svelte:104`, previously `:48` on the deployed tree) stays. On c12 it also carries `store`, `seasonFacade`, `go` and `vmStore`, which the batteries use. Anything calling `__cp.store.dispatch` must switch to `dispatchAsync`.
