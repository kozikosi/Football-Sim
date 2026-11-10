# Slice 4 — the N3 drive-level feed (P-287) · delivery README

**Seat:** Z.ai · **Date:** 2026-11-10 · **Engine pin:** `4ca9a071` (byte-identical before AND after the build) · **Battery:** 61/0/10/3 · **Engine tests:** 284/0.

## What the slice is

The drive-level game feed, rendered in the w88 look — the badge format and the colors of the current version, preserved line-for-line (the Owner's verbatim direction), made dynamic with Svelte 5 state.

**The data path (engine-true at every step, nothing generated):**
draft log → the store's own `thawPool` → `lineupFor` (best of 4-3/3-4 by the engine's `netPts`) → `teamRatings(spotsOf(l), returnerRating(l))` (the engine's fixture path) → `buildSchedule(makeRng(seed).fork('schedule'))` — the engine's REAL week-1 fixture → `gameSeed(seed, 1, home)` — the engine's own derivation, the same number a week-preview save stores → `matchupModel`/`teamIdentity`/`simulateGame` → the snapshot mapper `gameFeed(r, home, away)` (the FeedEvent union, drive-level) → `feedVM` (plain JSON: abbrs, inks, running scores, me-flags, lead-change marks) → `Feed.svelte`.

**The look (what was preserved):** the w88 report's line anatomy with the `zrl-*` class names kept — the clock stamp in the neutral ink, the team chip in the team's own ink, the `zrl-badge` chips (currentColor border, radius 6px, .62rem/800/.08em), the `zrl-sc` running score `AWAY · HOME`, the `cp-me` glow on the user's drives (the w88 `zrl-me`), the quarter marks, the FINAL card, the beat-in animation + `prefers-reduced-motion` off-switch. Inks from the snapshot's own `TEAM_COLORS` (the Owner's 22 Oct table) with a presentation-only readability pick (`src/lib/ink.ts`). The dot law applies at render (`Q1 15·00`).

**The dynamics (what was added):** NEWEST FIRST (the brief's feed reading) vs game order (the w88 replay reading — the default), MY DRIVES filter, gold LEAD Δ marks on lead-change drives, the provenance stamp (`gameSeed N · week 1 · AWAY @ HOME · played by the pinned engine`).

## Files

`src/lib/feedVM.ts` · `src/lib/screens/Feed.svelte` · `src/lib/abbr.ts` (tricodes, presentation) · `src/lib/ink.ts` (ink readability, presentation) · `src/lib/components/BoardFooter.svelte` (the PLAY WEEK 1 gate — appears only when the draft is done) · `src/App.svelte` (the feed screen + the gate) · `batteries/slice1.battery.mjs` (18 new feed laws) · evidence: `shots/slice4-feed.png`.

## The laws (all asserted through the real UI)

The gate (absent while drafting → present when done, the draft completed through 32 real `PICK` reducer actions) · **the UI game IS the engine game** (the battery recomputes the same game node-side via `feedVM` and matches the DOM exactly: final score, drives 20 = 20, me-drives 10 = 10, lead changes 3) · every line carries clock · team chip · badges · running score in form · the quarter marks ride the log · the running scores END at the final · **no yard figure anywhere** (the v1 union's `yards: null` honoured — nothing faked) · NEWEST FIRST flips · MY DRIVES filters · reduced-motion off · zero page errors.

## The finding (reported, not hidden)

**The snapshot's `app/feed.ts` `clock()` maps overtime starts (3600s+) to `Q4` with a NEGATIVE mm:ss remainder** (`Math.min(4, ceil(secs/900))` + `900*q − secs`). The feed renders period≥5 drives with an honest `OT` stamp and the quarter marks say `OT` — presentation working around a frozen-snapshot quirk. **Filed for the Architect for the next re-pin:** an OT branch in `clock()`, after which the feed adopts the mapper verbatim.

## Boundaries

No pin move · no engine edit · no ratings generated · the feed is UI/UX only (no brand, no engine math, no flex table) · the snapshot's `yards: null` reserved-field law honoured.
