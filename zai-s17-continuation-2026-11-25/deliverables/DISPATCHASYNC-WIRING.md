# DISPATCHASYNC-WIRING — the exact call sites for the cutover · Z.ai · 2026-11-20

**The contract (Claude's engine, frozen):** `colors/src/sports/nfl/app/store.ts:142–154` —
`dispatchAsync(a): Promise<DraftStoreState>` — serialised in call order (a second call never
starts before the first settles), yields a **macrotask first** (the caller can paint "working"
before the engine runs), **never rejects** (action failures become `state.error`; a throwing
subscriber is caught and warned), and **resolves with the post-action state**. Behavioural proof:
`colors/test/engine/nfl/store.test.ts:126–154` (430/430 at the pin, re-run this sitting).
The sync `dispatch` (store.ts:105) stays until the arms stop mounting it — the engine comment
says so (store.ts:141), and the merge must not delete it in the same commit that moves the arms.

**The written shell contract from Claude is still PENDING** (the S13 order flags it). These are
the exact call sites that move from `dispatch` to `dispatchAsync` when it arrives — published by
Z.ai so the merge can proceed against them. Every site is one line + one `await` + the post-state
read; no site depends on the synchronous post-dispatch state TODAY (each one re-reads via
`getState()`/`refresh()` afterwards), which is why the migration is safe site-by-site.

## The four call sites (cakepanz-4 file:line = the bytes this sitting receipts; colors/ = where the merge puts them)

| # | action | cakepanz-4 (file:line) | colors/ (after the merge) | today | after | reason |
|---|---|---|---|---|---|---|
| 1 | **START** | `src/App.svelte:148` — `store.dispatch({ type: 'START', seed, userTeam, ...(slot !== null && slot - 1 !== userTeam ? { pickSlot: slot } : {}) });` | `src/App.svelte` (the same component, App.svelte moves whole) | `dispatch` | `await store.dispatchAsync({ type: 'START', … })` | the pickSlot trade (P-317) builds the order in the store; the board should paint "starting" and the B1 done-guard reads the FRESH post-START state — with the promise, `go('board')` runs after the state exists instead of racing the reducer |
| 2 | **PICK** | `src/App.svelte:178` — `store.dispatch({ type: 'PICK', playerId, slot } as any);` | same line | `dispatch` | `await store.dispatchAsync({ type: 'PICK', … })` | the pick that completes the draft hands the screen to Complete (4.2, cakepanz-8.1) — today `pick()` re-reads `store.getState().status` immediately after; with dispatchAsync the `status === 'done'` read is the RESOLVED state, never an intermediate one |
| 3 | **UNDO** | `src/App.svelte:184` — `function undo() { store.dispatch({ type: 'UNDO' }); refresh(); … }` | same line | `dispatch` | `await store.dispatchAsync({ type: 'UNDO' })` then `refresh()` | the Undo toast + the autosave should mirror the RESTORED state; serialisation also stops a rapid Undo+Pick from interleaving across turns |
| 4 | **LOAD** | `src/App.svelte:208` — `store.dispatch({ type: 'LOAD', record } as any);` (inside `loadDraft`) | same line | `dispatch` | `await store.dispatchAsync({ type: 'LOAD', record })` | the boot rehydration (S29) and the Saves-panel load (S31) land on the board only after the record is in; with the promise, the S29b keepWeek composition and the W12 URL write happen against the loaded state deterministically |

**Not migrated (and why):** there are no other `store.dispatch` sites — the screens dispatch
NOTHING directly (the grep this sitting: the only four hits are the four above; components call
`onpick`/`onundo` callbacks that own them). The slot battery's B3 law drives START exactly as the
shell does. The batteries keep their own direct `createStore` dispatches (node battery N29 etc.) —
those are TEST-side stores, not arms; the engine's sync dispatch remains for them (store.ts:141's
"until the arms stop mounting it" refers to the shell's four sites).

## The migration's shape (one commit, four lines, receipted)

```diff
-    store.dispatch({ type: 'START', seed, userTeam, ...(…) });
+    await store.dispatchAsync({ type: 'START', seed, userTeam, ...(…) });
```
(the same for PICK/UNDO/LOAD — `pick`, `undo`, `loadDraft` are already `async`-safe call sites:
`pick()` calls `refresh()` after, `undo()` is a one-liner, `loadDraft` is sync today and gains
one `await` — its callers `hydrateBoot`/`onloaddraft` are already async contexts)

**The law that must hold after the merge (new, named W14):** after every one of the four sites,
the NEXT statement observes the post-action state (e.g. `pick()` sees `status === 'done'` on the
completing pick; `loadDraft` sees `record.seed === rec.seed`). Battery: the board battery's L8
(the completing pick hands to Complete) and the slot battery's B3 already assert the behaviour;
W14 adds the URL/seed assertion to the LOAD path (covered today by W12 — which PASSES with the
sync dispatch and must KEEP passing with dispatchAsync; if W12 fails after the merge, the arms
were moved without the awaits).

**Flagged (the S13 order's flag, restated):** Claude's WRITTEN shell contract for dispatchAsync
is still pending — this file is Z.ai's published call-site list, not a substitute for it. When
his contract lands, diff it against this file; any divergence (e.g. a fifth site, or a different
error-surfacing rule) is a merge conversation, not a unilateral edit. NOTHING here touches the
engine; the migration is entirely in `src/App.svelte` (Z.ai's file).
