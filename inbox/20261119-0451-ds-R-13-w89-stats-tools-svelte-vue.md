SPEAKER: ds | ROLE: council (framework + tooling evaluation) | TASK: w89 stats screens → Colors; Svelte 5 vs Vue 3 | DATE: 2026-11-19T04:51Z
FOR: R-13 (the framework test). Touches P-316 (slice plan) and R-9 (React removal).

# Answer first

**Recommendation: stay on Svelte 5 + Vite. Do not move the shell to Vue 3.** Confidence: high, for this product and these two screens — the one condition that reopens it is in §6.

The short version, all measured today (§4): for the *same* stats-table feature a Svelte 5 app is **10.8 KB gzip smaller** than the Vue 3 app (15.5 vs 26.4 KB), stays **8.8 KB smaller with the same TanStack Table** (25.9 vs 34.7 KB), and the Vue component-library route that is Vue's real advantage (PrimeVue `DataTable`) costs **150.5 KB gzip / 694 KB raw for one table** — against a current product of 527 KB raw / 222 KB gzip. Vue's advantage is component-library depth; this product's hard constraint is one offline HTML file, and that constraint eats the advantage.

Nothing here was added to `colors/`, `67-cakepanz/` or the product file. The harness is scratch, copied to `_agents/ds/deliveries/tools-eval-2026-11-19/` so anyone can re-run it.

---

## 1. The two screens as they are in w89 (VERIFIED, read from the live file)

File: `origin/gh-pages:Football-Sim-Z-post-blue-w89.html`, 1,922,769 B. Line anchors are from that file.

**Season / Playoff stats** — `renderStatsTabsHTML(kind)` (l. 8381) renders one panel with two hand-wired tabs (`wireStatsTabs()`, l. 8391, toggles `style.display` and `active` classes):

- **Your Players** — `userStatsInner()` (l. 8374). One `<table>`; the header is `Player | Pos | OVR | GP | Rating (rank at pos.) | Season Stats (<team>)` (l. 8379). The last cell is a **single concatenated string** from `seasonStatLine(group, s)` (l. 8354): group-specific badges such as `312/480 CMP, 3,402 PASSY, 24 TD, 7 INT, 92.3 RTG`, or for DL `SK/TFL/PRSS/Tkl/FF/FR/TD`. The rating cell mixes two values: `zpbDR(r) #rank`.
- **League Leaders** — `leadersInner(sfx)` (l. 8434) renders `leaderBoards(mode)` (l. 8406): **ten ad-hoc boards** (QB/RB/WR/TE/OL/DL/LB/DB/K …), each with its own `cols` list (e.g. the DL board at l. 8416 is `SK, TFL, PRSS, Tkl, FF, FR, TD`). Columns do not line up between boards; there is no cross-board sort.
- Empty state is prose (l. 8377: "Your team missed the playoffs." / "No games played yet …").

**Team stats** — `renderTeamStatsHTML(g)` (l. 8448) is the **per-game box**, not a season aggregate: `Total Yards, Passing Yards, Rushing Yards, Turnovers, Sacks Taken, Defensive TDs, Rush/Pass, Time of Possession`, laid out as a 3-column table (away · label · home) inside an open `<details>`. The season's advanced stats are prose in a separate "MORE ADVANCED STATS" block.

**Constraints the reframing must keep** (Owner law, encoded in w89 comments):

- the badge vocabulary is fixed — `CAR, RUSHY, PASSY, RECY, SK, PRSS` (l. 8355, w28/w30), **never `SKS`**, **never `SK A`/`PRSS A`** (l. 8361, 8416, w32). A column header may repeat these strings but may not rename them;
- the Season/Playoffs split is a user-facing choice and stays;
- the product is one offline HTML file — every byte above the engine is UI budget.

**Data available today:** per-player aggregates `seasonState.playerStats` / `playerStatsPO` (selected by `STATS_KIND`). A `grep` for `gameLog|playerGameStats|byGame|perGame` returns **0 hits** — there is no per-game player log. So two attractive ideas need engine work first, not UI work: a game-by-game expandable line, and a "last 5 games" sparkline. They are listed as requests in §3, labelled as such.

## 2. What "more interactive" should mean here

The w89 screens are already `<table>`s. The defect is not "list vs table"; it is that the interesting values are **inside strings**, so nothing can be sorted, compared or filtered. Ten changes, each small and independent:

| # | Change | Why it matters |
|---|---|---|
| T1 | **One table component, three uses**: your players, league leaders, team stats. Same shell, different column model. | Kills three copies of table markup and the ten ad-hoc leader boards. |
| T2 | **Real columns instead of the badge string.** Header row uses the badge law verbatim (`CAR`, `RUSHY`, `PASSY`, `RECY`, `SK`, `PRSS`); values become cells. Column sets vary by position group behind the shared shell. | Makes sorting, alignment and comparison possible without changing vocabulary. |
| T3 | **Sort on every numeric column**, sticky header, right-aligned tabular numerals, `aria-sort` on the active header, default sort = today's order (group, then impact). | The single biggest usability win; zero data cost. |
| T4 | **A totals↔per-game toggle** next to the phase toggle. | GP distortion is the #1 wrong conclusion these tables invite ("he has more yards" = he played 17 games). |
| T5 | **Row expansion**: the row opens to a labelled breakdown (every stat, its own label), and — once the engine has it — the game-by-game line. | Replaces "read a comma string". |
| T6 | **Rank as a number**, not a string inside the rating cell: `RATING` (sortable) + `RK` (sortable, subtle bar). | Rank is the user's actual question ("is he top 5 at his position?"). |
| T7 | **Leaders as one table**: a position selector + a stat selector over the same component; the ten-board scan view stays as a secondary view if the Owner likes it. | Cross-position comparison becomes possible; code shrinks. |
| T8 | **Team stats**: keep the two-team comparison, add **league rank** and a percentile bar per row; add a season-total twin of the same component next to the per-game box. | "245 passing yards" means nothing without the league context the sim already knows. |
| T9 | **Mobile**: under 480 px the table becomes per-player cards, same sort/filter controls, expansion is the card body. No horizontal scroll (390 px rule). | The current 6-column table is exactly the kind that pushes a phone sideways. |
| T10 | **Accessibility**: `<th scope>`, `aria-sort`, a real `<button>` inside the header cell (not a click handler on `<th>`), focusable expansion, no hover-only information. | Also the fix for the c81 D2/D3 class of defects (tap targets under tooltips). |

Two rules for whoever builds it: (a) the phase and totals/per-game toggles are **state**, not DOM rewriting — the w89 `wireStatsTabs()` pattern of `style.display` and `classList` is exactly what the framework replaces; (b) do not add a component library to reach T1–T10 — the measurements below say what that costs.

## 3. What is a request to the engine, not UI work

- **Per-game player log** (needed by T5's game-by-game line and any sparkline). Proposed shape: `seasonState.gameLog[week][team][playerId] → stats` or an index built at accumulation time; the aggregates already exist so the data is there, only the retention is missing.
- **League rank per stat** (needed by T8, and T6's `RK` if it is to be computed rather than stored). 32 teams, cheap: sort the league once per stat per week, cache it with the standings.
- **Season team totals** (needed by T8's season twin): points for/against already exist in the standings; yards/play, 3rd down, red zone do not appear to be retained at team-season level.

These are `IDEA:`-level requests to the Architect; no snippet is offered because the data shape is his call.

## 4. The tools, measured

Environment: Owner's Mac (macOS 15.6), Node v26.13.0, Vite 8.3.6 (Rolldown), Svelte 5.57.3, Vue 3.5.x, TypeScript 5.9.3. Each app is a fresh Vite build of the **same feature**: 32 stat rows, Season/Playoffs tabs, text filter, sortable columns, one expandable row, an inline SVG sparkline per row. Numbers are `gzip -9` over the built `dist/assets/*.js`; "raw" is the JS sum. Nothing in these apps ships.

| app | raw JS B | JS gzip B | CSS gzip B | what it is |
|---|---:|---:|---:|---|
| `sv-base` | 40,016 | **15,511** | 307 | Svelte 5, hand-rolled table (runes + `<table>`) |
| `sv-base/tanstack` | 76,368 | **25,940** | 272 | + `@tanstack/svelte-table` 9.3.2 (sorting, global filter, expanding) |
| `vu-base` | 67,790 | **26,353** | 275 | Vue 3, hand-rolled table (`ref`/`computed` + `<table>`) |
| `vu-base/tanstack` | 98,308 | **34,701** | 275 | + `@tanstack/vue-table` 9.3.1 (same three features) |
| `vu-base/prime` | 694,053 | **150,529** | 0 | Vue 3 + `primevue` 4.5.5 `DataTable`+`Column` + Aura theme |

Derived:

- **Framework tax, same feature, no library:** Svelte 15,511 vs Vue 26,353 → **−10,842 B gzip (−41%)** for Svelte.
- **TanStack increment:** Svelte **+10,429 B** (15.5 → 25.9 KB); Vue **+8,348 B** (26.4 → 34.7 KB). The Svelte adapter costs ~2 KB more but starts 10.8 KB lower and ends **8.8 KB lower**.
- **PrimeVue increment:** +**124,176 B gzip** and +**626,263 B raw** over the Vue base for one table. That is **68% of the current product's gzip** (221,814 B) and **132% of its raw bytes** (527,177 B, c9's shipped dist) — before any styling of its own.
- CSS is negligible in all hand-rolled variants; PrimeVue ships **no CSS file** because its styled engine carries the theme in JS (runtime injection — worse for first paint on cheap phones; INFERRED from the build shape, not profiled).

Versions and licences (`npm view`, 2026-11-19):

| package | version | licence | note |
|---|---|---|---|
| `@tanstack/svelte-table` | 9.3.2 | MIT | peer `svelte ^5.0.0` — Svelte 5 native; v9 ships agent skills |
| `@tanstack/vue-table` | 9.3.1 | MIT | same feature set |
| `@tanstack/table-core` | 9.3.1 | MIT | headless core |
| `svelte-headless-table` | 0.18.3 | MIT | **peer `svelte ^4.0.0`** → not a Svelte 5 option; do not adopt |
| `bits-ui` | 2.21.0 | MIT | peer `svelte ^5.33.0` (+ `@internationalized/date`); headless primitives, not a table |
| `layerchart` | 2.11.0 | MIT | peer `svelte ^5.57.0`; charts |
| `@observablehq/plot` | 0.6.19 | ISC | framework-free charts; ~100 KB class (not built here) |
| `primevue` | **5.0.5** | **PrimeUI commercial** | `LICENSE.md`: free only under revenue/headcount/funding thresholds, annual renewal; paid otherwise |
| `primevue` | 4.5.5 | **MIT** | what the measurement used |
| `vuetify` | 4.3.4 | MIT | same weight class as PrimeVue; not measured |
| `element-plus` | 2.14.8 | MIT | not measured |
| `naive-ui` | 2.45.3 | MIT | not measured |
| `reka-ui` | 2.11.0 | MIT | Vue headless primitives (Vue's Bits UI) |
| `@vueuse/core` | 15.0.0 | MIT | tree-shakeable helpers |
| `ag-grid-community` | 36.3.0 | MIT (community) | enterprise features paid; first-party adapters React/Angular/Vue/JS — **no first-party Svelte** (`ag-grid-svelte` 0.3.0 is a third-party wrapper) |
| `tabulator-tables` | 6.7.1 | MIT | framework-agnostic, full grid, heavy (~100 KB+ class) |
| `echarts` / `vue-echarts` | 6.1.0 / 8.3.2 | Apache-2.0 / MIT | far heavier than this screen needs |

**Findings.**

1. **TanStack Table v9 is the right headless engine if an engine is needed at all.** MIT, Svelte 5 peer, sorting/filtering/expanding/virtualisation, and v9 ships adapter-specific agent skills (`skills/table-state/SKILL.md` in the package) — useful in this council. Cost: +10.4 KB gzip in Svelte. But T1–T10 as specified are ~40 lines of `$derived` + `$state`; the base app is 15.5 KB gzip *including* the framework. Start hand-rolled, adopt TanStack the day the interactions outgrow it.
2. **`svelte-headless-table` is dead for this tree** (Svelte 4 peer). It is the one Svelte-side gap the survey found, and TanStack v9 fills it.
3. **PrimeVue is the strongest ready-made grid on the Vue side and it is not viable here.** v5 is a commercial licence (a product-licensing question for the Owner, not a technical one), and even v4 (MIT) costs 150.5 KB gzip for one table in a 222 KB gzip product. For a single HTML file the *raw* 694 KB matters as much as gzip: it is the parse cost on a cheap phone and the file the Owner downloads.
4. **The Svelte side's cost of "no component library" is small**: Bits UI + copy-in shadcn-svelte table markup + hand-rolled SVG sparklines (0 KB) covers everything these screens need. The 0.3 KB sparkline in the scratch app is real: six points, one `<path>`, `$derived`-free.
5. **AG Grid is the wrong shape**: no first-party Svelte adapter, paid enterprise features, and a grid this size (32–60 rows) does not need virtualisation.

**What I did not measure (labelled UNMEASURED):** Vuetify, Element Plus, Naive UI, AG Grid and Tabulator bundle costs; Brotli; runtime profile on a low-end phone; a full app with 10+ screens (the delta here is at one-feature scale — the fixed part of Vue's runtime is most of the 10.8 KB, so the gap should persist, but that is INFERRED, not measured).

## 5. Svelte 5 vs Vue 3, beyond bytes

| axis | Svelte 5 | Vue 3 |
|---|---|---|
| Measured footprint (same feature) | **15.5 KB gz** hand-rolled, 25.9 with TanStack | 26.4 KB gz hand-rolled, 34.7 with TanStack |
| Ready-made data grid | none of PrimeVue's class; TanStack + copy-in table components | **PrimeVue 4 / Vuetify 4 / Element Plus / Naive UI** — the real advantage |
| Headless primitives | Bits UI (Svelte 5), shadcn-svelte | Reka UI, VueUse |
| Charts | LayerChart, LayerCake, hand-rolled SVG | ECharts/vue-echarts, Chart.js/vue-chartjs, Unovis |
| Agent tooling **in this council** | official Svelte MCP available (documentation + autofixer); TanStack v9 ships Svelte skills | no Vue MCP configured; TanStack v9 ships Vue skills |
| Existing trees | Colors is framework-free TS + views; **Cakepanz (the only working shell) is Svelte 5**, 8.1 and 9 shipped on it | no Vue tree exists; the Vue arm is a proposal, not code |
| Cutover cost | zero — the shell already exists and its shell/slice tests pass (47/0, 29/0/10/3 in c81) | rebuild the shell, re-point every slice, invalidate Cakepanz's tests |
| Maturity risk | Svelte 5 is younger (2024) — already paid: two deliveries on it | Vue 3 is older and safer on paper |
| Reactivity model | runes (`$state`, `$derived`) — concise, no `.value` | `ref`/`computed` — mature, explicit `.value` in script |

Honest reading: **Vue wins on ready-made grids and library breadth; Svelte wins on total bytes, on what already exists in this repo, and on the agent tooling the council can actually use.** For two stat screens and a 527 KB single-file product, the first advantage does not get to play, and the other three are decisive.

## 6. The recommendation, its falsifiers, and the hedge

**Recommendation: Svelte 5 + Vite** — hand-rolled table first (runes), TanStack Table v9 only when the interactions outgrow it, Bits UI for popovers/filters, hand-rolled SVG for sparklines, LayerChart only if real charts are ever wanted. Remove React from `colors/package.json` in the same change that records the verdict (R-9), so the tree carries one candidate.

**This recommendation is falsified if any of these is true** — and I would switch on the first two:

- **F1** — a timed, same-spec build (spec → working screen, same person or same agent, same tests) shows Vue materially faster. Nobody has run one; the R-13 arms are not comparable yet (UNKNOWN, not "no").
- **F2** — the Owner wants spreadsheet-class behaviour in v1: column pinning/resizing/reorder, inline edit, grouping/pivot, virtualised thousands of rows. Then Vue + PrimeVue 4 (MIT) or Vuetify 4 is the faster build path and the 150 KB is a product decision to argue, not a technical one.
- **F3** — a required capability is missing from the Svelte 5 MIT set. The survey found none: tables (TanStack), primitives (Bits UI), charts (LayerChart), dates (`@internationalized/date`), drag (`svelte-dnd-action`). The only gap was `svelte-headless-table`, superseded.

**The hedge that costs nothing, and makes R-13 fair:** put the table's *shape* in a framework-free view model, exactly as Colors already does for the board/game/roster (`colors/src/sports/nfl/view/*.ts`). Something like:

```ts
// colors/src/sports/nfl/view/statsTable.ts (proposal only — the Architect owns the view layer)
export type StatsColumn = { key: string; label: string; align: 'start' | 'end'; kind: 'count' | 'rate' | 'rank' };
export type StatsRow = { id: string; cells: Record<string, number | string>; detail?: StatsRow[] };
export function buildStatsTable(input: {
  phase: 'rs' | 'po'; scope: 'team' | 'leaders'; pos?: string; perGame: boolean;
}): { columns: StatsColumn[]; rows: StatsRow[] };
```

Then either framework renders the same VM and R-13 compares *shells*, not data plumbing. It also means the badge law lives in one tested place instead of in a template string.

Sketch of the interaction in Svelte 5 (the whole of T3, ~10 lines):

```svelte
<script lang="ts">
  let key = $state('rating');
  let dir = $state<-1 | 1>(-1);
  const rows = $derived(sortRows(buildStatsTable(input).rows, key, dir));
  const aria = (k: string) => (k === key ? (dir === 1 ? 'ascending' : 'descending') : 'none');
</script>

<th scope="col" aria-sort={aria('rating')}>
  <button type="button" onclick={() => (key === 'rating' ? (dir = -dir) : ((key = 'rating'), (dir = -1)))}>
    Rating <span aria-hidden="true">{key === 'rating' ? (dir === 1 ? '↑' : '↓') : ''}</span>
  </button>
</th>
```

## 7. Adoption plan (a proposal; nothing here is built)

1. Add the framework-free `statsTable` VM + node tests to `colors/src/sports/nfl/view/` (Architect's call; his layer).
2. Render T1–T8 in the existing Svelte 5 shell (Cakepanz) for one real screen; measure the bundle delta on the actual product, not on a scratch app.
3. Add TanStack v9 only if the interactions outgrow the rune version; add Bits UI for filter popovers at the same time, not before.
4. Do not import a component library into the single-file build without a byte budget agreed by the Owner.
5. Record the verdict and remove React (R-9) in the same commit.

## 8. Receipts

- Measurements, licences, and the row-by-row table: `_agents/ds/deliveries/tools-eval-2026-11-19/MEASUREMENTS.txt`.
- Harness (re-runnable): `_agents/ds/deliveries/tools-eval-2026-11-19/gen-eval.mjs`, `gen-eval2.mjs`, `gen-eval3.mjs`; app sources in `apps/` (node_modules and dist excluded).
- Commands actually run: `npm install` + `npx vite build` per app; `gzip -9 -c dist/assets/*.js | wc -c`; `npm view <pkg> version license peerDependencies`; `npm pack primevue@5.0.5` then read `package/LICENSE.md`; `grep`/`sed` on w89 for every line anchor above.
- Product context: c9 shipped dist 527,177 B raw / 221,814 B gzip -9 (`_agents/ds/deliveries/cakepanz-8.1-review-2026-11-18/` receipts).

Labels: measured numbers are **VERIFIED** (command + output in `MEASUREMENTS.txt`); ecosystem judgements are **INFERRED**; anything I did not build or profile is marked **UNMEASURED** in place.
