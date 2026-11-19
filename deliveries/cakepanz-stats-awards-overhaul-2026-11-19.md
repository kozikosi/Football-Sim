SPEAKER: INKLING | TASK: the heavy stats/awards dashboards — feasibility, design, and a relayable brief for the next sitting | DATE: 2026-11-19 · English only

**Owner's words (2026-11-19):** "could we have more dashboards + screens + heavy table for the awards and your season stats and all
team's stats and playoff stats? i do think we could upgrade from w89 here."

**Answer: yes — all four surfaces are buildable with zero engine files, on the data the engine already produces today.** This file is
the brief: what exists, what's provable from the engine's own output, the screen-by-screen spec, acceptance, and the Owner's rulings.

## 0. What the current build has (verified at the delivered bytes)

- `screens/Stats.svelte` (73 lines): league leaders (top-3 columns per key), plus ONE 32-team engine-ratings table (OFF/DEF/WINS-ish + W-L-T). It carries a STAND-IN note that gravity/double-teams are not measured by the pinned engine yet (Architect's module, filed).
- `screens/Awards.svelte` (53 lines): regular-season award cards (MVP/OPOY/DPOY/COACH) + top-5 leader columns (13 keys).
- `screens/Standings.svelte`, `Bracket.svelte`, `Book.svelte` (63/66/85 lines): division tables (light), the bracket, the season book. `BracketVM` already carries every playoff pair with seeds/round labels.
- `port/seasonVM.ts` (63 lines): `SeasonTeamRow` (W/L/T, PF, PA, seed, champion) per team + `PickRow` per pick.
- `port/standingsVM.ts`, `weekVM.ts`, `seasonSession.ts`, `feedVM.ts`: playoff round labels are present (`Round = Wild Card|Divisional|Conference|Super Bowl`); regular-season games carry no `round` — so `round != null` cleanly identifies playoff games everywhere in the shell.
- `Stats` accumulator (`port/seasonStats.ts`): every game's `buildBoxScore` folds into one `SeasonStats` (44 `STAT_KEYS` over passing/rushing/receiving/defence/kicking/returns), and `boxes: BoxScore[]` is kept **in memory** (per session) — but it does NOT retain the round per box today (one-line fix, see §4).
- The engine keeps `SeasonLine { games, slot, stats }` per player id — games count is even tracked per player. No gravity/double-teams/opponent-adjusted metrics exist in the pinned engine; they stay filed to the Architect and must NOT be computed in the shell.
- Persistence: stats are rebuilt by the Slice-3 replay (the season re-simulates deterministically from the record), so a reload mid-season restores the accumulation — the heavy tables need no new save format. (`statsAcc` is session-only today; the replay rebuilds it.)

**Conclusion: zero engine files; all four surfaces are projection + tables + a shared component.**

## 1. The upgrade at a glance (screens + shared component)

One new shared component, four rebuilt/expanded screens, three new table modules:

- **`StatTable.svelte`** (new, ~180 lines): typed columns config; sortable (click header), filterable (name/team/position), paginated (25/page + total), number formats per column kind (int · W-Wins one-decimal · percentage · yards), `data-testid` hooks, full keyboard support, `prefers-reduced-motion`, screen-reader captions; 390 px mode switches to per-row stacked cards or a scroll-in-container table (see ruling Q3).
- **`screens/Stats.svelte` → "THE STATS" tabbed dashboard** (was: two panels):
  - Tab 1 **THE LEADERS** — current leaders, top-5 per key (unchanged content, same keys).
  - Tab 2 **ALL TEAMS** — the 32-team ratings table, upgraded to a sortable heavy table (OFF/DEF in Wins, passOff, runOff, frontRun, coverage, W-L-T, seed, PF, PA, PF/game, PA/game). Sort by any column; champion row marked.
  - Tab 3 **PLAYOFF STATS** — every playoff game (round filter WC/DIV/CONF/SB), its scoreline + turning numbers (TD lines, turnovers, per-side yards), plus per-team playoff leaders across the same 44 keys; champion marked; your team first.
  - Tab 4 **YOUR STATS** — your 32 players' season lines (games, att/cmp/pyd/ptd, car/ryd/rtd, rec/recYd/recTd, def axes, kicking), sortable + per-position filter; your teammates' games played shown; the whole roster or any 8 selected positions.
- **`screens/Awards.svelte` upgraded**: award cards stay the hero (MVP/OPOY/DPOY/COACH + the 90+ shimmer); below, ONE full sortable leaderboard per category (all 1,024 drafted players; 13 keys; sortable; "Top 25 / All" toggle). No static top-5-only anymore.
- **`screens/Bracket.svelte` gains a "THE PLAYOFF STATS" panel** beneath the bracket (or a linked tab): the same playoff table as Stats tab 3, in the bracket context.
- **`screens/Standings.svelte` upgraded**: division tables gain PF, PA, seed, and sort-by-record; nothing invented (toStandings carries them).

## 2. Scope fencing — what this is NOT

- NOT engine work: no gravity, no double-teams, no opponent adjustment, no SR/EPA proxies — those stay the Architect's measurement module, filed separately.
- NOT save-format changes: stats re-derive on replay; the save stays seed + decisions + meta; the box `round` is added in-memory only.
- NOT new deps: hand-rolled table (suggested) — TanStack Svelte Table as the fallback if the Owner prefers (see rulings).
- NOT shipping to gh-pages: this lands in the repo delivery like everything else; 76 Pancakes ships as one cutover.

## 3. Acceptance laws (shell battery)

- **L15 (uniform table honesty):** the ALL TEAMS table renders 32 rows; champion row carries the mark; sorting OFF ↔ Wins flips order honestly; zero console errors at 390 px (scroll-in-container, no page overflow).
- **L16 (your stats):** switching to YOUR STATS with your 10-drafted roster shows exactly your players with their engine games/lines; sort by `ryd` keeps your top rusher on top; zero page errors.
- **L17 (playoff split):** with a fully played season + playoffs, the PLAYOFF STATS tab shows all games with the correct round filter, each matching `bracketVM`'s pair list; regular-season games never appear (round != null law).
- **Falsifiers F23–F25**: plant a regular-season game into the playoff filter → L17 dies; swap OFF/DEF columns → L15 dies; blank one of your rows' counts → L16 dies.
- All existing laws stay green; counts re-quoted per the A8 rule.

## 4. Implementation notes (mechanical; z.ai-sized)

- `SeasonStatsAccumulator`: carry `round?: string | null` per box (change `boxes: { round: string | null; box: BoxScore }[]`); add `splitSS(pred)` that re-folds selected boxes through the same `addBox`; ~30 lines, one port file, no engine.
- `Stats` VM module (new `port/teamStatsVM.ts`): per-team season lines from the split accumulator + `toStandings` + `teams[i].ratings`; PF/PA per game derivation (presentation arithmetic only).
- `136-ish-row` leaderboard VM built on `leaders()` twice (`TOP 25/All`).
- `StatTable.svelte` shared across the three tabs + Awards; one style source; tokens-only colours.
- Screen order: 390 px (tables switch to horizontal scroll-in-container, `data-testid` proves no page overflow).
- No new strings beyond the package inventory (THE STATS / THE AWARDS exist; tab labels like "THE LEADERS", "ALL TEAMS", "YOUR STATS", "PLAYOFF STATS" are the only new labels wanted — see ruling Q1).

## 5. Effort and sitting split

~350–450 lines of render + ~120 of VM + laws/falsifiers. One sitting for z.ai (if relayed as one brief), or two (Stats rebuild first, Awards+Bracket second). Verification: shell battery L15–L17 + falsifiers, plus a visual receipt at 390/1180 light/dark.

## 6. The Owner's rulings (quick ones; defaults in brackets)

1. **Copy/scope of w89 override:** this proposal is where "we could upgrade from w89 here" applies — ask: may I add the four tab labels + column headers as the only new strings (everything else rides the existing inventory)? **[default: yes, four labels only]**
2. **390 px exception:** the page keeps the no-horizontal-scroll law; heavy tables scroll *inside their container* with a `data-testid` proof (the only sane way to show 44 stat keys on a phone). **[default: approved extension of the 390 rule, tables only]**
3. **Table implementation:** hand-rolled (zero deps) or TanStack Svelte Table (@tanstack/svelte-table — the documented choice in both scaffolds' standards, adds sort/filter/page for free)? **[default: hand-rolled — matches the board's "bespoke" rule]**
4. **Whose hands:** z.ai builds it under an Architect brief (recommended) or the Architect builds it inside Colors v1? **[default: z.ai brief from this document; Architect reviews the diff]**
5. **Placement:** fold into cakepanz-9's order (overload risk) or a companion order cakepanz-10 after 9 lands? **[default: companion order, after the 8.1 chain closes]**
6. **Playoff grain:** per-GAME rows (recommended) or leaders-only at playoff time? **[default: per-game table + playoff leaders]**

Once ruled, this becomes the cakepanz-10 brief verbatim; the `w89` line on gh-pages stays untouched — everything lands in the repo until cutover.
