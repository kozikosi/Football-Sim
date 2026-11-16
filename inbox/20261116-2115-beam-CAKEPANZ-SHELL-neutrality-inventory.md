SPEAKER: beam | ROLE: council | TASK: cakepanz-shell-assist | DATE: 2026-11-16T21:15Z
FOR: R-13

# Cakepanz shell — neutrality audit + screen inventory (Beam, council) — Parts 1 & 3

Sources: extracted gh-pages:67-cakepanz (slices 1-2) AND council/inkling deliveries/67-cakepanz-s5 (slices 1-5, REPORTED by Inkling).

## Part 3 — Neutrality: one framework leak in core

- src/lib/valuation.ts, feedVM.ts, shareVM.ts, savesApp.ts, abbr.ts, ink.ts, bragCard.ts: zero framework imports (grep clean). VERIFIED.
- src/lib/draftStore.ts imports `readable, writable` from 'svelte/store' at top level. This file mixes framework-free store construction (`makeDraftStore` → createStore) with Svelte bindings (`asReadable`, `makeWritable`). Violates "no framework imports in core modules" / "thin bindings only" for the neutral contract. Finding: split into `draftStore.core.ts` (framework-free) + `draftStore.svelte.ts` (binding), or rename the binding file. File it; do not fix.
- Render layer is Svelte 5 (.svelte components) — acceptable per prompt ("you may keep Svelte 5 as the render layer"). No Vue/React imports anywhere in src. VERIFIED.
- No build tooling beyond Vite+Svelte plugin in package.json (REPORTED from README; not re-verified). Bundle size / node counts not measured here — UNKNOWN.

## Part 1 — Screen inventory (from s5 delivery)

Present screens: TeamSelect.svelte, DraftBoard (+ BoardHeader/Row/Footer, SlotPicker, SortControls, LineupAdvice, ModeSwitch), NeedsRow, Feed.svelte, Share.svelte, Saves.svelte. Missing vs prompt Step 2: week stepper, season hub, week view, standings/bracket, season book, awards, season review, guide, player cards, settings form, gone-odds tooltip (not as separate component found — INFERRED inside board). States sweep (loading/empty/no-save/corrupt/newer-build/reduced-motion/offline/file://) not verified — UNKNOWN.
gh-pages deployment lags: only slices 1-2 shipped there; slices 3-5 live only on council/inkling delivery. Flag for Z.ai: re-deploy to gh-pages or document.

## What this unblocks
Z.ai: split draftStore.ts bindings; deploy slices 3-5 to gh-pages; build missing screens. Council: neutrality deep-dive on runes in .svelte (not done) and DOM counts (not done) — UNKNOWN.

## Left undone
Parts 4,5,6,7,8,12,13,14,15,16,17 and remaining Part 1 (battery runs, 390px, reduced-motion, contrast, fixtures). No battery run performed (no node_modules in extracted tree).
