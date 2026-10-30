# VLC V1 — Architecture & Design Document

**Version:** VLC V1 · **Seat:** VL · **Date:** 2026-10-30 · **Base:** Football-Sim-PreColors.html (sha256 40233d6be00e987c)

## 1. Vision

VLC (VL Colors) is a complete re-imagining of the NFL Draft Simulator front-end that keeps **Claude's engine** (the protected constants, slot math, team ratings, model weights, plan K, MC, and the game simulation) intact, and replaces the UI/UX with a modern, beautiful, responsive, component-based architecture.

VLC V1 is **not** a reskin of w38. w38 is objectively more beautiful than Pre-Colors but carries real bugs (Dime bubble glued to FS, champions FX firing before the game, skip showing 0-0, clipped names, mismatched Secondary numbers). VLC learns from w38's *lessons* without copying its *look*. w38 = rose-gold / Cinzel / shimmer. VLC = **midnight-ink / editorial typography / glass-motion** — a darker, more serious, football-coach aesthetic that feels like a modern sports analytics dashboard.

## 2. Architecture Choice: React

**Decision:** React 18 (via Vite), single-file HTML dev entry that compiles to a self-contained production bundle.

**Why React over Svelte:**
- Larger ecosystem for data-heavy dashboards (recharts, framer-motion, tanstack-table, headless-ui)
- Better long-term maintainability for a project with 50+ distinct UI panels
- The council already has React literacy; Svelte would be a new paradigm for most seats
- framer-motion gives us the cinematic animations (fades, shimmer, staggered entry) that w38 attempted imperatively

**Constraint from AGENTS.md §3:** The *product* shipped to the Owner must remain one self-contained HTML file with no build step for the user. VLC V1 is developed in React/Vite and **bundled** into that single HTML file at release time (the build step is for the developer, not the user). This satisfies both the modern-development requirement and the product rule.

## 3. Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | React 18 + Vite | Component model, ecosystem |
| Styling | CSS custom properties + Tailwind-like utility classes (custom, not the framework) | Design-token driven, no runtime CSS-in-JS overhead |
| Animation | framer-motion | Cinematic fades, staggered entry, shimmer, exit gates |
| Charts | recharts (or custom SVG) | 100-season sim bars, team ratings radar, playoff bracket |
| State | Zustand | Lightweight, engine-state sync |
| Data fetch | none (all data embedded) | Self-contained product rule |
| Build | Vite → single HTML bundle | No user-facing build step |

## 4. Design Tokens (VLC V1)

VLC rejects w38's rose-gold. The identity is **midnight-ink**:

```
--vl-bg: #0b0c10          /* near-black background */
--vl-panel: #12141b       /* card surface */
--vl-panel2: #191c27      /* elevated surface */
--vl-ink: #e8eaf2         /* primary text */
--vl-sub: #9aa3b2         /* secondary text */
--vl-border: #262b38      /* subtle borders */
--vl-gold: #c9a227        /* accent (replaces w38's #ffc43c) */
--vl-gold-soft: rgba(201,162,39,.14)
--vl-ink-accent: #7dd3fc  /* team-accent neutral */
--vl-success: #34d399
--vl-danger: #f87171
--vl-warn: #fbbf24
--vl-radius: 14px
--vl-shadow: 0 20px 40px -10px rgba(0,0,0,.5)
--vl-transition: all .3s cubic-bezier(.4,0,.2,1)
--vl-font-display: 'Cinzel Decorative', 'Bodoni Moda', Georgia, serif
--vl-font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif
```

Team colors are applied as a **takeover**: when a team is selected, `--vl-accent`, `--vl-accent-soft`, `--vl-ink-accent` remap to that team's primary/secondary/tertiary hex. This preserves w38's "team theme the whole app" idea but in a darker, more mature register.

## 4. Protected Constants — Untouched

The following from Pre-Colors are **never modified** by VLC V1 (AGENTS.md §3):
- `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP` (+ CB4 added via w38 R4), `MC`, `PLAN_K`, `RATING_SPECS`
- `modelWeights()` is the monotone quantisation of `slotWinsPerOvr()` (700 scale, nearest 5, floor 5)
- `teamRatings` contract

If CB4 is added to `NATURAL_SLOT_MAP`, its hash is re-pinned in `MERGE-MANIFEST.md` in the same commit (per w38 R4 / AGENTS.md).

## 5. Screen Inventory (VLC V1)

| Screen | Purpose | Key UI Pattern |
|--------|---------|----------------|
| **Home / Brand** | "Can you go 20-0?" — entry point | Hero with 20-0 wordmark, shimmer, team picker, Start Draft |
| **Draft** | 32-round draft with board | Board cards, pick chips, unit ratings, flex advice |
| **Lineup** | Set starters / flex | Position cards, flex → FS at -10, AI advice |
| **Game Preview** | Matchup math, scouting | Chips (Strong/Weak), integers, no prose |
| **Game Animation** | Play-by-play log | `<team> <play> <yds>` lines, TD/FG tags, times |
| **Season Review** | Strengths/weaknesses graphics | Cards, not paragraphs; "Try again to 20-0?" |
| **100-Season Sim** | Monte Carlo results | Bar charts, team logos, compact personnel stats |
| **Player Browser** | Scrollable roster | Infinite scroll, position filter, no pagination |

## 6. Component Architecture (React)

```
src/
  engine/          # Claude's engine, extracted to TS/JS modules (untouched logic)
    weights.ts     # DEFAULT_WEIGHTS, modelWeights, slotWinsPerOvr
    ratings.ts     # RATING_SPECS, teamRatings
    plan.ts        # PLAN_K, MC, applyOffPlan, applyDefPlan
    simulate.ts    # simulateGame, playGame, simulateCurrentWeek
    flex.ts        # FLEX, NATURAL_SLOT_MAP (+ CB4), adviseLineup
  components/
    layout/        # Shell, nav, theme toggle, team takeover
    draft/         # Draft board, pick chips, unit ratings
    lineup/        # Position cards, flex advice
    preview/       # Matchup math chips, scouting header
    game/          # Animation log, skip button, cinematic gate
    season/        # Review cards, awards, 100-season sim
    common/        # Shimmer tag, chip, button, card, panel
  hooks/
    useEngine.ts   # Syncs React state with Claude's simulation
    useTeamTheme.ts # Applies team color takeover to CSS vars
  lib/
    tokens.ts      # Design tokens
    utils.ts       # Format helpers (integers, ranks, chips)
```

## 7. Engine Integration Strategy

Claude's engine runs in a **Web Worker** or a **isolated JS module** that React talks to via a thin adapter:

```ts
// useEngine.ts
const engine = createEngine() // loads Pre-Colors engine logic
const state = engine.getState() // roster, ratings, schedule
React.render(<App state={state} />)
// User action → engine.step(action) → React re-renders
```

This keeps the engine's logic pure and testable while React owns all presentation. Seeded RNG (T-20261022-claude-2) is injected into the engine module via `rnd()`, and React's before/after tests compare seeded runs on the same build.

## 8. Cinematic / Animation Law (from w37/w38, generalized)

VLC adopts the **gate/drain split** from W38 R13/R14 and W37 R11:
- Big rewards (championships, round wins) queue **unconditionally**
- They drain **only** at big points (final whistle, stage Continue, books Continue, 15s safety)
- One skip button: "Skip intro" during intro → lands first play; flips to "Skip" once game begins; skip during game shows whole report

## 9. Differences from w38 (Intentional)

| w38 | VLC V1 | Reason |
|-----|--------|--------|
| Rose-gold / Cinzel / shimmer-heavy | Midnight-ink / editorial / glass-motion | Darker, more serious coach aesthetic |
| Imperative DOM mutations | React components + framer-motion | Maintainability, testability |
| "Value here" bubbles | Chips + badges + graphics | w38 P-155/P-156 lessons |
| Neutral names everywhere | Team ink for names (w38 R1), neutral for tables | Names colored, data neutral |
| CB4 missing → Dime glued to FS | CB4 in slot map from start (w38 R4) | Fix before it exists |
| Champions FX before game | Gate/drain split (w38 R13/R14) | Fix before it exists |
| Skip shows 0-0 | Skip shows whole report + true final (w37 R12) | Fix before it exists |

## 10. Deliverables

1. `vlc-v1-architecture.md` — this document
2. `vlc-v1-prototype.html` — self-contained visual prototype (Home, Draft, Lineup, Game Preview screens)
3. `vlc-v1-group-suggestions.md` — suggestions to the group for Colors v1

## 11. Next Steps

1. Seat reviews this document (council review chain)
2. Architect approves React/Vite stack + single-file bundle constraint
3. Extract Claude's engine to `src/engine/` modules
4. Build VLC V1 components screen by screen
5. Bundle to single HTML, run lint + gate, present to Owner
