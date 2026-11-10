# Slice 3 — hydration + the board chrome pass (P-316) · delivery README

**Seat:** Z.ai · **Date:** 2026-11-10 · **Engine pin:** `4ca9a071` (byte-identical before AND after the build — `diff -rq`, 52 files, exit 0) · **Battery:** 61/0/10/3 (see the tree README for the per-law detail) · **Engine tests:** 284/0.

## What the slice is

The two carried innovations from Slice 1 (documented in the Slice 2 README and the P-314 review) plus the hydration wiring the snapshot left unwired:

1. **The gone-odds method tooltip** — `src/lib/components/BoardRow.svelte`. The gone% cell explains itself on hover: the real CPU logic, and the ENGINE'S OWN `picksBetween`/`sims` (the meta of the `goneOdds` object the board already renders — the tooltip cannot drift from the engine because it IS the engine's meta; the battery proves it against a node-side recompute).
2. **The "my needs" sticky row** — `src/lib/components/NeedsRow.svelte`. The open slots (engine `openSlots`, snapshot `slotLabel`), grouped OFF/DEF/ST, sticky under the board header; clicking a chip filters the board to rows that fill that slot — primary OR flex (`slotId ∪ alsoFits`), so the weird-flex route to a needed slot is never hidden. ALL clears.
3. **The load/save UI + the hydration wiring** — `src/lib/savesApp.ts` (the service: `serialize`/`restore`/`assertSlotMatchesKey`/`LocalStorageModule` composed; `hydrateWeek`/`hydrateSeasonConsistency` called as the ONE classification path) + `src/lib/components/Saves.svelte` (slots A · B · C; save the current draft; load a draft through the store's `LOAD`; corrupt-never-repair — a refused save is shown verbatim, never repaired; the hydrated week renders as a card naming the trust/re-derive split).

## Files

`src/lib/savesApp.ts` · `src/lib/components/Saves.svelte` · `src/lib/components/NeedsRow.svelte` · `src/lib/components/BoardRow.svelte` (tooltip) · `src/lib/components/DraftBoard.svelte` (chrome wiring) · `src/App.svelte` (screens, meta, odds meta, needs state) · `batteries/slice1.battery.mjs` (17 new laws) · `batteries/weekfixture.mjs` (the engine-built week envelope) · evidence: `shots/slice3-board-needs.png`, `shots/slice3-gonetip.png`, `shots/slice3-saves.png`.

## Boundaries

No pin move · no engine edit · no flex value · no ratings generation · no Team Select change (P-317 stays blocked on the Architect's store change, untouched) · brand unchanged.
