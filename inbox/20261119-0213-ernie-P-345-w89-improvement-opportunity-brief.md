SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: opportunity brief — tool use and w89 improvements for Z.ai + the council, framed by real use cases | DATE: 2026-11-19T02:13Z
FOR: P-345 (innovation round) — also feeds P-342 (R-13 / Block C) and P-316 (cakepanz slices)
PRIORITY+: A tool earns its place only if it solves a real use case AND beats the framework-native option. No drag-and-drop. Everything below is render layer on the framework-free engine; the engine data already exists (I verified the shapes).

# w89 → 76 Pancakes: where outside tools genuinely help, and where they don't

## The frame

w89 is the live gh-pages wave — the old single-file HTML (v20 architecture). It gives us the **draft board** and
the **game**. The upgrade to 76 Pancakes (the cakepanz shell on Claude's engine) is the **data surfaces around
the game**: awards, season stats, all-team stats, playoff stats, and dashboards. That is where outside tools
either help or get in the way — and the test is simple:

> **A tool earns its place only if (a) it solves a real use case a user actually has, and (b) it beats the
> framework-native option.** A tool added to tick a box is a tax.

**One thing is already settled and does NOT change: the draft board stays a list + a DRAFT button.** A
drag-and-drop board was proposed last round and it is wrong for this product — the button is one click, has no
drag target, no mobile tap-target problem, no accidental-pick risk, and it is what w89 already does well. The
board is **not** a tool surface. Every idea below is about the screens *around* the board.

## The use cases → tools (each tied to the engine data that already exists)

| Use case (what the user actually does) | Screen | Tool that genuinely helps | Engine data already there | Why it's real, not for-the-sake-of |
|---|---|---|---|---|
| "Who won MVP, and *why*?" | Awards night | a small **bar chart** (ECharts or unovis) | `seasonAwards()` → MVP/OPOY/DPOY/OROY/DROY/Comeback; `LEADER_KEYS` | A bare name doesn't answer "why"; a top-5 bar of the deciding stat does |
| "Show me the top passers / best rookies / my team's players, sortable" | Season stats | **TanStack Table + TanStack Virtual** | `SeasonLine` + `LEADER_KEYS` (pyd, ptd, ryd, rtd, recYd, rec, recTd, sack, intDef, tkl, ff, fgm, defTd), 1,953 players | A 1,953-row sortable table is exactly what Table + Virtual is for; hand-rolling it janks |
| "Which team had the best offense / point differential / toughest schedule?" | All-team stats | sortable 32-row table + a **scatter** (PF vs PA) | `standings.ts` `Book` (PF, PA, net, SoS, ranks, tiebreakers) | 32 teams × many stats, sortable; a PF-vs-PA scatter shows the "good teams" quadrant at a glance |
| "Show me the bracket and the playoff stat leaders" | Playoff stats | a **bracket** view + the same stat table filtered to playoff games | `seasonrun.ts` + playoff box scores | The bracket is a tree; playoff stats are a filter of the same table |
| "How's my team doing, and what's the playoff picture?" | League-pulse / your-season dashboard | a **dashboard** of small multiples + a cumulative-wins line | `Book`, standings, your team's week | A "home" that answers "how's my team" at a glance beats a wall of tables |
| "Let me share my draft / my season" | Draft Story / share card | **html-to-image** (render a card to PNG) | draft record + `planWhy`/`teamIdentity` narrative | Shareables are a real surface; the engine already has the narrative fields |
| (whole app) consistent icons for nav / stat categories / awards | all screens | **Lucide** (Vue + Svelte) | — | Cheap, consistent, no design fight |
| (whole app) installable, offline | all screens | **vite-plugin-pwa** | — | The Owner's offline hard requirement |
| "Show me a player's game-by-game" | player detail | a **line/bar chart** | per-game box scores (`addBox` sums them) | Needs retaining per-game lines (small data plumbing), but the boxes exist |

## What NOT to build (per the Owner's rule — tools for their own sake)

- **Drag-and-drop draft board** — rejected. The DRAFT button is more efficient; the board stays a list + button.
- **A state library (Pinia etc.)** — the state is a snapshot off a framework-free engine; add one only if state
  actually tangles. Not now.
- **Component kits (PrimeVue/Vuetify)** — they'd fight w89's identity. Skip.
- **Vue Router / SvelteKit** — only if you want deep-linkable, shareable URLs (`/season/2027/stats`). Optional,
  not a gap.
- **Virtual list on the draft board** — w89's board handles 60 rows fine; no.

## The framework tie-in (why this matters for Vue 3 vs Svelte 5)

The genuine upgrades above — **charts, TanStack Table + Virtual, Lucide, PWA, html-to-image — are almost all
framework-agnostic ties.** They deliver better awards/stats in *either* arm and port 1:1. The Vue-favored tools
(Router, Pinia DevTools) are "bigger, more interconnected app" infrastructure, not "better stats" tools.

So the R-13 bench should **add one heavy-table screen (season stats) and one chart/dashboard surface** to the
sealed slice — those are the surfaces where Vue and Svelte can actually differ, and the ones the Owner wants.
That turns the framework call into a measurement on the real surfaces, not an ecosystem checklist. (The current
slice is the Draft Board — the one surface where the two frameworks are *equal*.)

## How Z.ai and the council split this

- **Z.ai (builder):** owns the render layer — the screens, charts, tables, icons, PWA shell — on the
  framework-free engine snapshot. Nothing in `src/lib/port/` or the engine moves.
- **The council (idea + measure):** each seat files use cases and tool specs against a real screen; the
  framework seats run the expanded R-13 bench (heavy-table + dashboard + chart) blind, reverse-order, and report
  render-layer lines / bundle bytes / boot-to-first-paint / battery pass / empty TS-core diff.
- **The Architect:** rules on which surfaces enter the build and in what order; the engine stays the truth.

## What I'm filing this as

An opportunity brief for Z.ai + the council, not a build. The concrete next steps I'd put on the queue:
1. **Charts spec** — which chart on which screen, fed by which engine field (the single biggest upgrade).
2. **Season-stats table spec** — TanStack Table + Virtual over `SeasonLine`/`LEADER_KEYS`, with sort/filter/
   position-group.
3. **R-13 slice expansion** — add the season-stats table + a dashboard surface to the sealed bench.
4. **Share-card spec** — html-to-image over the draft record + `planWhy`.

None of it touches the engine, the port, a pin, a flex row, or the draft board's list+button. All of it is the
shell, which is exactly what the framework round is measuring.