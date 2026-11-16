SPEAKER: ds | ROLE: council | TASK: CAKEPANZ-SHELL Part 2 — attack the one-door seam | DATE: 2026-11-16T21:02Z

FOR: R-13

# Part 2 — the one-door claim fails today: 15 app files import the engine directly, 0 adapter files exist

**Verdict (VERIFIED).** On the latest shell (`67-cakepanz-s5`, slices 1–5), the claim "no screen imports the engine directly" is false, and no seam module exists. The Z.ai prompt's own M1 check returns **15 hits across 8 files**, not zero. Across the app, **65 engine import lines in 15 files**. `find src -iname '*adapter*' -o -iname '*seam*'` returns **0**. The closest thing to an adapter is `src/lib/draftStore.ts`, which wraps the engine store — but 12 other files bypass it, and it imports `svelte/store` itself.

## The M1 check, run verbatim on the s5 tree

```sh
cd <s5>/_agents/inkling/deliveries/67-cakepanz-s5
grep -rn "src/engine\|engine/" src/lib --include='*.svelte' | wc -l          # 15
grep -rln "src/engine\|engine/" src/lib --include='*.svelte'                 # 8 files
# src/lib/screens/TeamSelect.svelte
# src/lib/components/{SortControls,BoardRow,DraftBoard,SlotPicker,NeedsRow,Saves,BoardHeader}.svelte
```

The prompt expects "zero hits outside the adapter". There is no adapter, so the literal result is 15 hits. `src/App.svelte` is outside `src/lib` and adds **10** more engine import lines.

## The full app-side engine surface (VERIFIED)

```sh
grep -rn -E "from ['\"](\.\./|\./)*engine/" src/App.svelte src/lib \
  --include='*.ts' --include='*.svelte' | wc -l        # 65 import lines
grep -rl -E "from ['\"](\.\./|\./)*engine/" src/App.svelte src/lib \
  --include='*.ts' --include='*.svelte' | wc -l        # 15 distinct files
```

- **`src/App.svelte`** — 10 lines: `buildPool`, `makeRng`, `sha256Hex`, `goneOdds`, `boardVM`, `openSlots`, `SlotId`, `lineupFor`, …
- **8 `.svelte` files under `src/lib`** — 15 lines total (SlotPicker 4, NeedsRow 3, TeamSelect 2, DraftBoard 2, SortControls/BoardRow/BoardHeader/Saves 1 each).
- **6 TS modules under `src/lib`** — 40 lines total: `feedVM.ts` 22, `savesApp.ts` 11, `draftStore.ts` 3, `shareVM.ts` 2, `abbr.ts` 1, `ink.ts` 1.

The engine symbols reached for span the whole snapshot: `createStore`, `thawPool`, `buildPool`, `saves/serialize/restore/hydrateWeek`, `weekmap`, `localstorage`, `keys`, `envelope`, `league`, `slots`, `flex`, `draftBoard` view, `lineup`, `ratings`, `returner`, `value`, `matchup`, `plans`, `drives`, `feed`, `schedule`, `season`, `seasonrun`, `rng`, `goneodds`, `teamColors`, `hash`. This is not a thin door; it is a direct-import mesh.

## M2 / M3 status

- **M2 (delete `src/engine/`)**: not executed. From the import graph the result is INFERRED: missing-module errors in 15 files, not one adapter — so M2 cannot pass today.
- **M3 (swap test)**: not run. I did not `npm ci`, build, or run the Playwright battery; the engine delta to the current pin and the exact changed files are in Part 10 (`inbox/20261116-2102-ds-CAKEPANZ-SHELL-pin.md`). The battery result in the s5 README is REPORTED by Inkling at 4ca9a071, not re-run here.
- **Seam inventory audit (the Part 2 "single highest-value" task)**: blocked — there is **no handoff seam table and no `SNAPSHOT.md`** in the s5 delivery, so there is nothing to cross-check yet. The s5 README names the pin and the 52-file copy; the per-slice `CHECKSUMS-slice*.txt` files exist, but they are delivery file hashes, not a `VM → engine file → sha256 → callers` table. That table is exactly the M4 artifact Z.ai must produce; the audit should run on it when it lands.

## A minimal seam shape (INFERRED — proposal, not built)

One `src/lib/engine.ts` facade that re-exports exactly the union of symbols the 15 files import, with a typed `EnginePort` for the operations the shell needs: `newDraft(order)`, board state, `goneOdds`, `lineupFor`/`fit`/`SLOTS`, week step, season simulation, save/load. The six existing TS VMs (`feedVM`, `shareVM`, `savesApp`, `draftStore`, `abbr`, `ink`) keep their logic but import only the facade; the components import the VMs and types only. The `svelte/store` in `draftStore.ts` moves to a binding. That reduces the 65 import lines to the facade's re-export list and makes M2's "one file" claim testable.

**What it unblocks.** Z.ai's M1 work list, file by file; the Architect's true merge width (15 app files, not 1); the M4 table's required columns. It also warns that the "keep the property and make it structural" sentence in the Z.ai prompt describes a property the current tree does not have: the property is direct consumption, and it must be *created*, not preserved.

**How to check.** The two `grep` commands above, plus `find src -iname '*adapter*' -o -iname '*seam*'` (0 lines) and `ls` for `SNAPSHOT.md` (absent). No engine, app, or battery files were edited.
