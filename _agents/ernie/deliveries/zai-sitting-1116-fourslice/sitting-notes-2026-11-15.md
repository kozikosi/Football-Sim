# Sitting notes — Z.ai · 2026-11-15 (the second sitting: the four-slice slope test)

## REGISTERED BEFORE ANY FOUR-SLICE CODE OR COUNT EXISTS — the slope threshold (q13 law)

Written down before a single line of the four-slice build exists, so it cannot be chosen after
the answer. This text is copied verbatim into PREFERENCE-INTERVIEW.md q13.

**The falsifier being measured (the prompt's §2, verbatim):** if Vue's composables + devtools show
a lines-per-feature slope >15% better than Svelte's across the board + team-select + saves + feed,
the maintainability edge flips and the bundle's 11 KB becomes noise — switch to Vue.

**The registered threshold and metric:**

- Metric: framework-owned app code (entry + root + screen + store glue), counted by `wc -l`
  (total lines; non-blank also reported), with the SHARED identical bytes excluded as in the
  slice-1 receipt (engine 52 files, feedVM/abbr/ink/bootData/savesService, feed.css). The store
  glue file (`appStore.svelte.ts` / `appStore.ts`) is counted in full — it is framework-owned.
- Slice order (fixed by the prompt's table): slice 1 = Feed (already built, known 99 vue / 103
  svelte lines incl. entry+root) · slice 2 = Board · slice 3 = Team select · slice 4 = Saves.
- PRIMARY number: R = (Vue mean marginal lines per slice 2→4) / (Svelte mean marginal lines per
  slice 2→4), where marginal = cumulative delta each slice adds (files + store-glue growth
  measured at each cumulative stage, not inferred after the fact).
- SECONDARY number: R_total = (Vue cumulative total at slice 4) / (Svelte cumulative total at
  slice 4), reported alongside, deciding nothing on its own unless the primary and secondary
  disagree in SIGN — then the verdict is "inside the band" and I say so.
- Decision bands, fixed now:
  - R < 0.85 (Vue's slope >15% better) → the falsifier FIRES → switch to Vue, say so.
  - R > 1.18 (Svelte's slope >15% better — the mirror band, ±15% around parity) → the falsifier
    does not fire; stay on Svelte, say why.
  - 0.85 ≤ R ≤ 1.18 → "inside the band, no signal" — no winner is manufactured, and the bundle
    remains the only separating criterion.
- The same bands apply to R_total if the primary number falls inside the band (a tiebreak to a
  band edge is not a signal: if the primary is inside the band, the verdict stays inside the band
  whatever the secondary says).

Registered by Z.ai at the start of the sitting, before writing any slice code or running any
four-slice line count. The timestamp of this file precedes every four-slice receipt.

## Debug journal (filled as the build runs; nothing retro-fitted)

(appended below as bugs actually happen; verbatim messages, the fix, and which arm/error told the
truth faster)

## Build accounting decisions (fixed before building)

- The root (App.svelte/App.vue) and entry (main.ts) stay in slice 1's bucket as in the slice-1
  receipt; the root's growth (the nav + screen switch) is reported explicitly as a note, so the
  per-slice marginals for slices 2–4 are pure screen + store-glue lines.
- The store glue file lands with slice 2 (the draft reducer glue comes first); its growth for
  slices 3–4 is measured by actually snapshotting the file at each cumulative stage.
- New shared identical-bytes files (excluded from framework-owned counts, diff-verified across
  arms): extensions to bootData.ts (bootApp, team persistence, save meta), savesService.ts.
- The FeedPanel component is REUSED untouched (the prompt's law); the feed's reaction to a team
  change is one glue line in the store, not a rewrite.
