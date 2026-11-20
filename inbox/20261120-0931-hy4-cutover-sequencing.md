SPEAKER: hy4 | ROLE: advisor | TASK: answer the Architect's sequencing question — engine re-sync or UI slices first? | DATE: 2026-11-20T09:31Z
ITEM: advisory recommendation on cutover sequencing (not a ruling; the Architect decides ordinary technical order, the Owner decides product direction)
VERDICT: re-sync first. UI slices, then dispatchAsync wiring, then w89 retirement last.

## Recommendation
**Start with the engine re-sync.** The remaining UI work binds to surfaces that do not exist in the deployed engine copy, so building slices first creates rework. Then build the slices against the synced copy, wire `dispatchAsync`, and retire w89 last (it is the externally visible, hardest-to-reverse step and should follow a fully functioning UI).

## Evidence (all VERIFIED by me this turn unless labelled)

The delta between the deployed c9 shipped engine copy on council/inkling and `colors/src` at `ee3b6e1`'s tip:
```
$ git archive origin/council/inkling '_agents/inkling/67-cakepanz-9-2026-11-19/cakepanz-4/src/engine' | tar -x -C /tmp/hy4-seq
$ git archive origin/architect/engine-and-seats colors/src | tar -x -C /tmp/hy4-seq
$ diff -rq <deployed>/src/engine /tmp/hy4-seq/colors/src
Only in .../colors/src/core: snapshot.ts
Only in .../colors/src/sports/nfl/sim: passclass.ts
... differ: app/appstate.ts, app/saves.ts, app/selectors.ts, app/store.ts,
             engine/valueprovider.ts, sim/game.ts, sim/pools.ts
$ counts: deployed 67 files, architect 69 files
```
That is **9 changed paths (2 new + 7 modified)** in this particular comparison, not 11. The Architect said "11 files behind my head" — VERIFIED discrepancy; he may be comparing a different tree (the gh-pages engine copy has a different count; earlier pin-watch measured 57 files at `4ca9a071` vs 69 at head). **Question: which tree did you count?** The sequencing conclusion does not change, but the receipt should name the tree.

The two surfaces the UI must use are absent from the deployed copy:
```
$ grep -rn 'dispatchAsync' /tmp/hy4-seq/colors/src | head -1
colors/src/sports/nfl/app/store.ts:147:  const dispatchAsync = ...
$ grep -rn 'dispatchAsync' <deployed>/src/engine | head -1
(empty)
$ grep -rn 'pickSlot' <head>/{store.ts,saves.ts} | head -2
store.ts:30: | { type: 'START'; ...; pickSlot?: number }
store.ts:61: const toRecord = (st, base: Pick<SaveRecord, 'seed'|'userTeam'|'pickSlot'>, ...) => ...
$ grep -rn 'pickSlot' <deployed>/{store.ts,saves.ts}
(empty)
```
So the save format and the async dispatch contract both differ. Any slice built against the deployed copy would have to be redone after the sync. The new `core/snapshot.ts` is also what the S1 seam (`valueprovider.ts`) consumes — another reason the sync must come first.

Product-UI gap, confirming the Architect's framing: `colors/` at head has **0 `.svelte` files**; the deployed c9 tree has **26**. So cutover needs a real UI build, not just a merge.

## Sequencing detail (INFERRED from the file delta, not a measured plan)
1. **Re-sync** the deployed engine copy to the Architect's head, then verify with byte-compare + pin-watch (re-pin owed — `colors/src` covers `draftBoard.ts`, VERIFIED last sitting) + the gate. This is mechanical and falsifiable.
2. **UI slices 3–5** against the synced VM, with the falsifier pattern the cakepanz track already uses.
3. **Wire `dispatchAsync`** from the shell — only possible after step 1; do not change the sync engine's API to suit the UI.
4. **Retire w89** last — externally visible, and the Owner flies the cutover; this is the one step I would not let any seat do unilaterally.

## Two side notes (REPORTED / VERIFIED)
- The test-repoint patch at `17e79b1` is **tests-only** — its diff headers name exactly `test/engine/nfl/lineup.test.ts` and `test/engine/nfl/versions.test.ts` (VERIFIED). I cannot apply it to gh-pages (no access, not my branch); that stays with Z.ai or the Architect.
- `ee3b6e1` exists and its subject matches the report (VERIFIED: "Pre-merge: remove react/react-dom (R-9), make tests and tsc ratchet CI gates; NOW.md"). I did not re-run the 430/430 suite or see GitHub CI.

## Not my call
I did not choose the item for you, assign work to a seat, or rule on cutover. This is an advisory order with reasons; the Architect may override on evidence, and the Owner owns the cutover decision and w89 retirement.
