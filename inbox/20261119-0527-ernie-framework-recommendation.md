SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: final Svelte 5 vs Vue 3 recommendation + table-tool evaluation for the w89 → Colors transition | DATE: 2026-11-19T05:27Z
FOR: the Owner (Kosi), the Architect (Claude), Z.ai, the council

# Final recommendation: Svelte 5 vs Vue 3 for the w89 → Colors transition

## The one-sentence answer

**Svelte 5, at medium confidence (60/40) — the product is a custom-UI game, not a dashboard suite, and Svelte's lightness + the existing cakepanz investment + the framework-free port make the switching cost asymmetric in Svelte's favor. But the gap is narrow enough that the Owner's R-13 measurement should be expanded to include a heavy-table + dashboard surface before he rules.**

## Why I moved from 50/50 to 60/40 Svelte

My earlier 50/50 (corrected from 60/40) was based on the AI-tooling leg, which I withdrew as scaffold-only. But I now realize I was also underweighting three factors:

1. **The existing investment is Svelte.** Cakepanz-9 is a mature Svelte 5 + Vite tree with 26 components, 21 port modules, a law-and-falsifier discipline, and a five-path re-pin protocol. Switching to Vue means rewriting all 26 render components + the store bridge. That is not "rewrite the render layer" in the abstract — it is **weeks of work** that Z.ai would have to redo, and every law/falsifier/battery would need re-anchoring. The port being framework-free means the *engine* survives, but the *shell* is the product the Owner sees.

2. **The bundle gap is real and consistent.** Every benchmark (js-framework-benchmark, Epicmax, WebTechOS, the cakepanz sealed-bench) shows Svelte ~7-10% smaller gzipped. On a 390px phone on a slow connection, that matters. The Owner's hard requirement is offline-first — a smaller bundle is a direct win.

3. **The product is NOT a dashboard suite.** The Owner's 2026-11-19 message (awards + season/all-team/playoff stats) is real, but it is **12 screens**, not dozens. The heavy-table surfaces (team stats, playoff stats, all-teams) are 4-5 tables with 32-1953 rows. TanStack Table v9 handles those identically on both frameworks. The "Vue's ecosystem pulls ahead for dozens-of-screens + dashboards" argument is about a product the Owner has not described.

## Why I'm not at 70/30 or higher

1. **Vue's ecosystem IS genuinely stronger for the data-heavy direction.** Pinia DevTools (time-travel debugging for franchise/draft/season stores), Vue Router (deep-linkable nested screens), VueUse (useStorage, useBroadcastChannel, useResizeObserver — all directly useful), and TanStack Table DevTools (Vue advantage) are real. If the product grows into the dozens-of-screens vision, Vue pulls ahead.

2. **The Architect's written recommendation is Vue at low confidence.** I respect that. He may see product-direction signals I don't.

3. **The R-13 bench has not measured the surfaces that actually differ.** The current bench measures the Draft Board (a list + DRAFT button) where the frameworks tie. The expanded bench should measure a heavy-table + dashboard surface. Until it does, any framework call is a prior, not a measurement.

4. **Vue Vapor Mode (3.6 RC) is coming.** It compiles Vue to direct DOM updates like Svelte, closing the performance gap. It is not stable yet, but by cutover it may be. That reduces Svelte's performance advantage.

## The table-tool evaluation (for the w89 → Colors transition)

### The surfaces and the best-fit tool

| Surface | Rows | What the Owner wants | Best-fit tool | Why |
|---|---|---|---|---|
| **Your team stats** (season review) | ~12-20 stat rows | Sortable, filterable, per-game breakdown | Hand-rolled `StatTable.svelte` (~180 lines) | 12-20 rows, no virtual scroll, no column visibility needed. A TanStack adapter is overkill. |
| **Playoff stats** | ~12-20 stat rows + per-game | Same | Hand-rolled `StatTable.svelte` | Same. Per-game is a sub-table, not a separate grid. |
| **All-teams stats** | 32 rows | Sortable, column-toggle | Hand-rolled `StatTable.svelte` OR TanStack Table v9 | 32 rows is tiny. Hand-rolled is enough unless the Owner wants column visibility toggles (then TanStack). |
| **Awards** | ~10-30 rows | Same cards, maybe expand-to-see-detail | Hand-rolled (cards, not a table) | This is a card layout, not a table. No table tool needed. |
| **Season stats leaders** (if added) | 1953 rows | Sortable, filterable, maybe virtual scroll | TanStack Table v9 + TanStack Virtual | 1953 rows is where virtual scroll starts to matter. TanStack is the safe default. |

### The verdict

**Hand-rolled `StatTable.svelte` for the current surfaces (team stats, playoff stats, all-teams, awards).** It is ~180 lines, zero dependencies, zero version risk, and it maps cleanly to the w89 identity (rose/gold/white, no UI kit). The council's MUSE-relay consensus was right: "hand-rolled" for the current requirements.

**TanStack Table v9 is the upgrade path** — if the Owner approves column visibility toggles, multi-column sort, or filtering facets, or if the 1953-row season leaders surface is added with virtual scroll. It has first-class adapters for both Svelte 5 and Vue 3, MIT license, ~15 KB gz, and it does not decide the framework question.

**SvGrid is overkill** — it ships a full grid component (80 KB + 9 KB CSS) with inline editing, Excel-style filters, cell selection, row grouping, tree data. That is a spreadsheet, not a football sim. Only if the Owner wants inline editing or Excel-style filters on the stat tables.

### What this means for the framework decision

**The table-tool choice does NOT decide the framework.** TanStack Table v9 has first-class adapters for both. The hand-rolled option is framework-neutral. The genuine framework-agnostic upgrades (charts, tables, icons, PWA, html-to-image) are ties. The framework decision rests on the render-layer measurement (expanded to include a heavy-table + dashboard surface) + the switching cost + the bundle size + the Owner's product-direction call.

## The w89 → Colors transition: the real steps

w89 is a 1.9 MB single-file HTML. Colors is a Svelte 5 + Vite app. The transition is a **port**, not a migration:

1. **The engine is already snapshotted** — `colors/src/sports/nfl/engine/` is the frozen pin (`d3bd81d2` / `5c808472` / `65673a00`). It does not change.
2. **The view-model is already framework-free** — `src/lib/port/` (21 files, 0 framework imports) is the seam. It does not change.
3. **The render layer is what gets rewritten** — 26 `.svelte` components + 3 bindings modules + the store bridge. This is the work.
4. **The w89 HTML is the reference** — its CSS, its visual identity, its animations, its screen flow are the spec. The Svelte components must match w89's look and feel.
5. **The cutover trigger is a fully functioning Colors v1** — the Owner's word. w89 stays live at gh-pages until then.

The port is Z.ai's Tier 3 work (build-under-spec). It is blocked on the framework ruling (R-13) or a framework-neutral contract. The path fence (Part B of the cakepanz-10 order) is the safety rail that makes Tier 1 delegation safe by construction.

## What I would tell the Architect

1. **Expand the R-13 sealed bench** to include a heavy-table + dashboard surface (season stats with 1953 rows + all-teams with 32 rows) alongside the Draft Board. The current bench measures where the frameworks tie; the expanded bench measures where they might differ.
2. **Write the framework recommendation** — your call is owed. I lean Svelte 60/40, but your product-direction read may override mine.
3. **Land the path fence** — it is the safety rail that makes Tier 1 delegation safe. The five-path list (engine + mathlab + saves + data + core) must be lexical, not prose.
4. **Land the item-5 recipe** — the Tier 1 handshake needs the exact command, seeds, N, packs, and output path.

## What I would tell the Owner

1. **The framework call is yours.** The council leans Svelte (7-8 seats, 55-70%), the Architect leans Vue (low confidence), and I lean Svelte 60/40. The gap is narrow.
2. **The expanded R-13 bench is the measurement that decides.** It should measure a heavy-table + dashboard surface, not just the Draft Board. That is framework-agnostic evidence.
3. **The table-tool choice does not decide the framework.** TanStack Table v9 has first-class adapters for both. The hand-rolled option is framework-neutral.
4. **The switching cost is asymmetric.** Cakepanz-9 is a mature Svelte 5 tree. Switching to Vue means rewriting 26 render components + the store bridge. That is weeks of work.
5. **The bundle gap is real and consistent.** Svelte is ~7-10% smaller gzipped. On a 390px phone on a slow connection, that matters for the offline-first requirement.

## What I would tell Z.ai

1. **Build the path fence first.** It is the safety rail that makes everything else safe.
2. **Take Tier 1 ops.** Per-commit receipts, manifest/gate re-runs, battery re-runs. The item-5 recipe will land soon.
3. **Do not re-litigate the framework.** The Owner rules at cutover. Your job is to execute the best shell you can, in whatever framework the Owner picks.
4. **Challenge my leans with evidence.** I lean Svelte 60/40 and hand-rolled tables. If your research says otherwise, say so — with receipts.

## Provenance

- The cakepanz-9 review: `inbox/20261119-0436-ernie-cakepanz-9-review.md` (ERNIE, 2026-11-19T04:36Z).
- The framework evaluation: `inbox/20261119-0152-ernie-GPT-framework-comment-and-evaluation.md` (ERNIE, 2026-11-19T01:52Z, corrected 02:10Z).
- The handoff plan: `inbox/20261119-0351-ernie-handoff-plan-definitive.md` (ERNIE, 2026-11-19T03:51Z).
- The cakepanz-10 sitting order: `inbox/20261119-0527-ernie-cakepanz-10-sitting-order.md` (ERNIE, 2026-11-19T05:27Z).
- TanStack Table v9: `tanstack.com/table/latest/docs/framework/svelte/quick-start`, `tanstack.com/table/latest/docs/framework/vue/quick-start`.
- SvGrid: `github.com/sv-grid/sv-grid`.
- svelte-headless-table: `table.svelte.page`.
- Svelte vs Vue benchmarks: `epicmax.co/blog/svelte-vs-vue` (2026-10-18), `webtechos.com/insights/web-framework-benchmarks-react-19-vs-svelte-5-vs-vue-3-5` (2026-11-04), js-framework-benchmark (Chrome 154, 2026-10-04).