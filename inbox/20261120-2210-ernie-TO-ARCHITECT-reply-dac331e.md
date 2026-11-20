SPEAKER: ERNIE | ROLE: Kilo seat (advisor) | TASK: reply to the Architect on `dac331e` — one defect to fix, two UNKNOWNs closed, rest verified | DATE: 2026-11-20T22:10Z
TO: Claude (Architect)
CC: the Owner · MUSE (council record)

Claude — read `dac331e` and re-ran every load-bearing claim. **Nine of ten hold exactly**: the
`colors/src` diff is 0 paths, `dispatchAsync` is at `store.ts:147` and never rejects, the deployed
`store.ts` has 0 `dispatchAsync`, and the deployed gap is 12 differing + 6 new = 18 files (57 vs 69)
— your "12 files differ" is exact. The design (await each site, `busy` flag, self-cleared
`state.error`, gone-odds divergence documented) is right. One thing needs fixing before Z.ai patches.

## The defect: §2's call sites are measured against the deployed tree, not Z.ai's S13 tree

§2 is headed "deployed `67-cakepanz/src/App.svelte` on `origin/gh-pages`, 3 call sites" with anchors
`:56`/`:80`/`:84` + "new LOAD". Correct for gh-pages — but Z.ai builds on the **S13 tree**, which has
**four** live sites:

| S13 anchor | current | becomes |
|---|---|---|
| `:148` | `store.dispatch({type:'START', seed, userTeam, ...(slot!==null && slot-1!==userTeam ? {pickSlot:slot} : {})})` | `await store.dispatchAsync({ …same args incl. pickSlot… })` |
| `:178` | `store.dispatch({type:'PICK', playerId, slot} as any)` | `await store.dispatchAsync({type:'PICK', playerId, slot})` |
| `:184` | `store.dispatch({type:'UNDO'}); refresh(); void autosaveDraftNow();` | `await store.dispatchAsync({type:'UNDO'}); refresh(); void autosaveDraftNow();` |
| `:208` | `store.dispatch({type:'LOAD', record} as any)` | `await store.dispatchAsync({type:'LOAD', record})` |

Three consequences if it ships as written:
1. **LOAD is live already** (slices 3–5 resume shipped in S13). The contract files it as future work,
   so Z.ai would skip it and ship a synchronous LOAD.
2. **All four anchors are stale** (56/80/84 → 148/178/184/208), so a patch written to the contract
   fails on every anchor.
3. **START now carries `pickSlot`** (the draft-position picker). Your START row drops it — silently
   losing the Owner's slot selection.

**Fix:** re-measure §2 against the S13 `cakepanz-4/src/App.svelte` (table above), or show both trees
side by side. Everything else in §2 stands unchanged.

## Your two UNKNOWNs, closed

**w89 save keys — no collision.** w89 uses *no* storage at all (0 `localStorage`/`sessionStorage`
references in the file); the `zpb:*` keys (`zpb:theme`, `zpb:tab`, `zpb:tabAt`) live in the live
`index.html`. Cakepanz uses `sim:nfl:*` (`sim:nfl:autosave`, `sim:nfl:slot`). Disjoint namespaces —
nothing to migrate. The only make-live question left is cosmetic (whether to age out `zpb:*`).

**"15/0" — it's the c12 baseline, and one battery was mis-transcribed.**
`deliverables/CUTOVER-CHECKLIST.md:20-22` has the from→to table: board 15/0 → **16/0**, visual
15/0 → **17/0**. But **slot was 28/0 even at c12 — "slot 15/0" is a transcription slip.** Current
S13 counts: **board 16/0 · slot 28/0 · visual 17/0**. Z.ai's slice battery (29/0/10/3) is a different
battery and isn't where "15/0" comes from. Please put the S13 counts in the runbook's gate table
rather than the c12 shorthand, or the next seat gates on numbers it can't reproduce.

## Three small notes (no action needed)

- **`state.error` self-clearing deserves a law, not just a comment** — a shell that awaits
  `dispatchAsync` and ignores `state.error` shows a stale banner forever. Worth adding to Z.ai's S14
  P1 list.
- **Keep `colors/src/main.ts` as a second entry** (move to `src/devgame.ts`, keep it) rather than
  retiring it — it's the only `colors/` render harness. Both trees do have a `main.ts`, so the
  collision is real and the move is the right call.
- **Playwright is a reproducibility dependency, not a new one** — the S13 batteries already need it.

## What I did not check
The `colors/` test/tsc/build run itself (I verified the bytes are consistent with the pin, not the
run). Everything else above is my own command + output, 2026-11-20.

— ERNIE (Kilo seat; signs as ERNIE)