# Beamer V1 — Architecture Decision Record

## Decision
Build "Beamer" as a **SvelteKit (Svelte 5 runes) + Vite** single-page app that compiles to **one self-contained HTML file** (inlined CSS/JS, no CDN, no runtime fetch), keeping the product contract (AGENTS.md §3) while moving development to a component-based, typed, testable structure. Alternative considered: React + Vite. Decision: Svelte, for smaller bundle, no virtual DOM, runes reactivity, and better fit for the heavy animation/game-state work.

## Why not stay HTML
Colors v1 (Claude) integrates Z.ai's shell (HTML) with the engine. That works but scales poorly: 1.4 MB single file, 56+ Math.random sites, no seed, no tests, no component reuse. A component model lets the council contribute ideas as components (not snippets) and the Architect build one file.

## Component tree (top-level)
- AppShell (theme tokens, team theming via CSS vars, nav)
- Home (marquee 20-0, draft button shimmer, floating selectors, footer guide fade-in)
- DraftSetup (team/pick selectors, Start Draft)
- DraftBoard (player table/cards, filters, roster panel, undo, Start A New Draft)
- DraftReview (tabs: Season, 100 Seasons, Your Roster; no "Vs Simulated")
- GamePreview (lineup comparison, matchup math, chips, scouting, game plan)
- GameAnimation (cinematic: 30-60s, skip, reduced-motion)
- Season (schedule, standings, stats tabs)
- Playoffs (bracket, preview, sim buttons)
- Champion (banner, hype, season review)
- PlayerBrowser (15/page, sticky filters, position dropdown)
- SeasonReview (strengths/weaknesses, awards cards, advanced stats grid)
- Guide (glossary, flex guide)

## State management
- Svelte stores for: draftState, seasonState, teamTheme, motionPref.
- Engine (pure functions, seeded RNG) in src/engine/* (TypeScript), ported from Pre-Colors simulateGame/playGame/matchupModel etc. Protected constants (DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP incl. CB4, MC, PLAN_K, RATING_SPECS) live in src/engine/constants.ts with hash tests.
- Seeded RNG (T-20261022-claude-2) is a prerequisite for deterministic tests.

## Build output
- `vite build` with `vite-plugin-singlefile` (or rollup) → one index.html with inlined assets. No CDN, no fetch at runtime. Output must match "one self-contained HTML file" contract.
- Assets (logos) inlined as base64 (existing all-logos-sdv.csv approach) or SVG data URIs.

## Migration plan (phased)
1. V1 (this): prototype HTML + architecture doc + component stubs. NO product file change.
2. Port engine to TS (pure functions, seeded RNG) with unit tests (Vitest). Keep Pre-Colors as oracle for outputs.
3. Port shell (Z.ai's design tokens + rose/gold theme) into Svelte components.
4. Integrate: Colors v1 becomes the first full build (Architect owns the merge).
5. Council contributes components via inbox (not snippets).

## Council role
Per AGENTS.md §5, only the Architect builds the product file. Beamer is a prototype in my lane until the Architect adopts it. All product HTML edits stay with the Architect.

## Open questions for the Architect
- React vs Svelte: recommend Svelte for bundle size, but defer to Architect.
- Whether to keep the single-file contract or allow a build step for users (Owner decision).
- Protected constants migration: hash re-pin in MERGE-MANIFEST.md.

EVIDENCE: INFERRED (design reasoning; no code run). SAFE ALONE: YES (docs + prototype only).
