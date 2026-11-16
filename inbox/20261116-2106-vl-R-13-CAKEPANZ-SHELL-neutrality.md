SPEAKER: vl | ROLE: council | TASK: CAKEPANZ-SHELL Part 3 — verify TypeScript/framework neutrality of the shell | DATE: 2026-11-16T21:06:00Z
FOR: R-13

QUESTION: is any part of the shell locked into Vue or Svelte? Is it portable to either framework at cutover, or to plain TS as-is? (R-13 is the framework-comparison item; NOTE: R-13 does not appear in the live QUEUE.md table on origin/council/muse — UNKNOWN whether that ID exists or was retired; FOR: R-13 used per the v4-2 filing instruction, flagged to the queue custodian.)

FRAMEWORK-COUPLED (Svelte 5, render layer only) — VERIFIED by grep (only App.svelte and main.ts import from 'svelte'; runes appear across the render layer):
  src/App.svelte — $state, $effect, onMount, writable stores, Svelte template blocks
  src/main.ts — svelte app entry
  src/lib/components/{BoardHeader,BoardRow,DraftBoard,LineupAdvice,ModeSwitch,NeedsRow,Saves,SlotPicker,SortControls,BoardFooter}.svelte — $state/$derived/$props/$effect/class: directives
  src/lib/screens/{TeamSelect,Feed,Share}.svelte — same
  package.json devDeps: svelte ^5.57.3, @sveltejs/vite-plugin-svelte ^6, vite ^7.3.6, typescript ^5.9.3 — svelte is the only framework dependency.

FRAMEWORK-NEUTRAL (plain TS core, no svelte imports — VERIFIED by grep "from 'svelte'" returning only App.svelte and main.ts):
  src/lib/draftStore.ts, valuation.ts, feedVM.ts, shareVM.ts, savesApp.ts, abbr.ts, ink.ts, bragCard.ts — domain/UI logic, view models, selectors, formatters, persistence, canvas painting; ordinary TS, portable to Vue 3, Svelte 5, or vanilla TS with zero changes.
  The engine snapshot is consumed byte-identical at pin 4ca9a071 (see Part 10 filing) — not forked, not patched, not almost-pinned.

FRAMEWORK-COUPLED SEAMS TO RE-BIND AT CUTOVER (file paths + why + replacement):
  src/App.svelte — screen router + boot + Svelte state; replaced by a Vue/Svelte/vanilla root component wiring the same TS VMs.
  11 .svelte files — presentational components; markup + Svelte templating replaced per target framework.
  The TS core modules stay untouched; only the render bindings change.

VERDICT — partially portable, no lock-in that prevents a cutover: the TS core ports unchanged; the Svelte 5 render layer (~13 files incl. App.svelte) must be re-bound at cutover. That is expected (the prompt allows keeping Svelte 5 as this tree's render layer) and is not a defect, provided the re-bind is documented — this filing is the documentation. Neutrality ruling not re-litigated; the framework pick stays at cutover (Owner, R-13).

Labels: coupling measurement VERIFIED. Verdict INFERRED (reasoned from the grep results, not a build in another framework — a Vue/Svelte re-bind was not executed).
