SPEAKER: pickle | ROLE: seat | TASK: tools from Svelte 5 / Vue 3 for the w89→Colors stats upgrade, plus a final framework recommendation | DATE: 2026-11-19T04:38:16Z
FOR: R-13

**Scope and disclosure.** This answers the Owner's ask (relayed in `zai-w89-tools-and-svelte-vue-verdict-2026-11-19.md`) from Pickle's seat. I authored the c9 prompt and the c8.1 review, so this is a spec-and-evidence evaluation, not a blind design review. No product bytes were touched: no w89 edit, no Colors edit, no engine edit, no gh-pages push. R-13's standing verdict remains **50/50, pick forced only at cutover**; this filing is advisory input, not a ruling and not a re-litigation of the round.

**Labels.** VERIFIED = I ran it or read the registry/bytes this session (receipts in §F). REPORTED = another seat's receipt I did not re-run. INFERRED = reasoned, not measured. The four dashboards' acceptance laws L15–L17 and falsifiers F23–F25 are quoted from Inkling's brief (`deliveries/cakepanz-stats-awards-overhaul-2026-11-19.md`), not invented here.

---

## A · Ranked tools (USE CASE → COST → LAW), top five

Every candidate is filtered by the Owner's bar: **use case, cost, acceptance law, and beats the framework-native option**. "Native" below means what Svelte 5 already gives us for free.

**A1 — Svelte 5 runes + a hand-rolled `StatTable.svelte` (zero deps).**
USE CASE: the exact ask — turn w89's `userStatsInner()` table, whose stats are one comma-joined text column (`seasonStatLine`, `w89.html:8374-8379`), into a sortable/filterable table for YOUR STATS and PLAYOFF STATS, shared with ALL TEAMS and Awards. The user needs to find a player or a round without scanning a paragraph.
COST: 0 dependencies; ~180 lines of render + ~120 of VM per the brief; the sort/filter core is ~30 lines of `$state` + `$derived.by` (validated snippet below).
LAW: L15 (32 rows, honest OFF sort, 390 px scroll-in-container, no page overflow), L16 (only your players, `ryd` sort keeps top rusher first), L17 (playoff rounds only, `round != null`), F23–F25. Extra law from my c9 review H5: **sort on raw engine numbers, never on parsed display text**.
WHY IT BEATS NATIVE: it *is* the native option; nothing to beat. It beats a library here because four tables with a fixed column set do not justify a table framework.

Validated core (Svelte MCP autofixer: `issues: [], suggestions: []`, version 5.57.3):
```svelte
<script lang="ts">
  type Line = { id: string; name: string; ryd: number; recYd: number };
  let { rows }: { rows: Line[] } = $props();
  type SortKey = 'ryd' | 'recYd';
  const COLS: [SortKey, string][] = [['ryd', 'RUSH YD'], ['recYd', 'REC YD']];
  let key = $state<SortKey>('ryd');
  let dir = $state<1 | -1>(-1);
  let query = $state('');
  const shown = $derived.by(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => !q || r.name.toLowerCase().includes(q)).slice()
      .sort((a, b) => dir * (a[key] - b[key]) || a.name.localeCompare(b.name));
  });
  function sortBy(k: SortKey) {
    if (key === k) dir = dir === -1 ? 1 : -1;
    else { key = k; dir = -1; }
  }
</script>
<label>Search <input bind:value={query} /></label>
<table>
  <thead><tr><th scope="col">Player</th>
    {#each COLS as [k, label] (k)}
      <th scope="col" aria-sort={key === k ? (dir < 0 ? 'descending' : 'ascending') : 'none'}>
        <button type="button" onclick={() => sortBy(k)}>{label}</button>
      </th>
    {/each}
  </tr></thead>
  <tbody>{#each shown as r (r.id)}
    <tr><th scope="row">{r.name}</th><td class="num">{Math.round(r.ryd)}</td><td class="num">{Math.round(r.recYd)}</td></tr>
  {/each}</tbody>
</table>
```
The `aria-sort`, `<th scope>`, and numeric `tabular-nums` styling are the a11y/identity surface; the sort uses `a[key] - b[key]` on engine values, so a rounded "1,204 YD" string can never reorder a row. This is the law c9's `DraftBoard.svelte:40` and `board.battery.mjs` broke by parsing display text.

**A2 — `@tanstack/svelte-table@9.3.2` (MIT), fallback only.**
USE CASE: if the Owner extends beyond four dashboards — column visibility toggles, faceting, pagination and persisted table state repeated across screens — a headless table stops us re-deriving the same row model four times.
COST: 1 dep. VERIFIED from the npm registry: version 9.3.2, `license: MIT`, `peerDependencies: { svelte: ^5.0.0 }`, dev dep `svelte ^5.57.3`, unpacked 96,329 B. **Minified/bundled bytes UNVERIFIED — measure before accepting.** Note the TanStack docs page still says "no built-in Svelte 5 adapter ... use table-core with a community adapter"; the package metadata contradicts that (a Svelte 5 peer is declared), so treat the docs as lagging, not the manifest. This is a correction to the brief's assumption, not a new claim about runtime behavior.
LAW: L15–L17 unchanged, plus one new one: table state is a view cache, never a source of truth; the engine record remains authoritative.
WHY IT BEATS NATIVE: only when the same sorting/filtering/pagination logic would be written ≥3 times. Below that it is a tool for the sake of a tool and gets cut.

**A3 — `@humanspeak/svelte-headless-table@7.1.0` (MIT), alternative, not a co-winner.**
USE CASE: plugin-style sorting, filtering, grouping, row expansion if the playoff dashboard later needs nested game→quarter rows.
COST: 1 dep; VERIFIED registry metadata: v7.1.0, MIT, `peerDependencies: { svelte: ^5.30.0 }`, unpacked 423,194 B of source. v7 is runes-native and removes the old store API (REPORTED from the package's migration guide); bundled size UNVERIFIED.
LAW: same as A2; must not introduce store-derived ordering.
WHY IT BEATS NATIVE / WHY NOT #1: larger API surface than four flat dashboards need. If we ever adopt a table library, A2 is the first call; A3 only if we actually need row expansion.

**A4 — `@lucide/svelte@1.75.0`, conditional.**
USE CASE: champion ceremony and award cards need one consistent, named icon set; w89's Unicode arrows stay for hot/cold (no reason to replace working copy).
COST: 1 dep; VERIFIED registry: v1.75.0, `license: ISC` (correction — the brief calls Lucide MIT), `peerDependencies: { svelte: ^5 }`, 9,020 source files / 8.7 MB unpacked; per-icon shipped bytes depend on tree-shaking and are UNVERIFIED.
LAW: every icon has an accessible name in the a11y probe; no new user-facing text.
WHY IT BEATS NATIVE: one source of truth instead of ad-hoc glyphs, *if* we add award icons. If no icons are added, cost is nonzero and benefit is zero — cut it.

**A5 — Test-time only: `axe-core` via Playwright + seeded screenshot goldens (zero product bytes).**
USE CASE: token rounds currently move pixels unnoticed and the a11y probe misses unlabeled controls; the four new sortable tables add many such controls. Cost: dev-only deps/work; law: zero violations on Team Select/Board/Hub/Complete, 8–10 pinned goldens, intentional drift re-pins explicitly. Beats native because no native equivalent exists. This is the cheapest insurance in the whole list.

**Rejected with the same filter (processed, not missed):**
- Drag-and-drop board — use case is not real (DRAFT button is faster, Owner's ruling final); cost is undo + accidental-confirm + mobile pain; law would fail. Cut.
- Chart library (Chart.js / ECharts / D3) — no per-week series exists in the model; empty axes; cut until a real series is emitted.
- UI kit / component library — the custom rose/gold/white identity is the product; a kit would overwrite it. Cut.
- Virtual scroll — ~1.7k small rows already render fast (REPORTED); solves no measured problem. Cut.
- Zod / schema lib — envelope validates at load by construction; zero bugs prevented. Cut.
- PWA service worker — offline works without it; stale-cache risk for replay envelopes. Cut.
- Analytics / telemetry — offline product, no. Cut.
- Pinia — engine is already the store behind a port; a second state framework is a seam cost with no use case. Cut. (Details in §B.)
- Vue Router — 10–12 hash-routed screens, deep links already work; cut.
- SvelteKit — the product is one self-contained offline file; a meta-framework adds server-shaped defaults to a client-only artifact. Cut.
- Storybook, TanStack DevTools — dev niceties; Storybook explicitly out of scope, DevTools has no bearing on shipped bytes. Cut.

---

## B · What each framework genuinely gives us

**Vue 3 → Svelte 5 does not (as used here):**
- **Pinia + time-travel**: real and mature. It would buy a state timeline, but the authoritative state is the engine's plain-TS record behind `port/seam.ts`, and shell snapshots are already guarded at three boot doors. A parallel store is a second subscription surface and a new failure mode for the "no black screen" laws. It pulls its weight only with accounts/sync or true cross-store invalidation — neither exists.
- **VueUse**: a broad, mature browser-API collection. The shell needs a handful of APIs already handled natively or in a tiny adapter; breadth is not a use case here.
- **Vue Router**: official nested routing and URL state. Our routing is a 100-line owned hash router over 10–12 flat screens; `vite-plugin-singlefile` needs one entry. OFFLINE is a hard requirement, so no runtime CDN and one self-contained file.
- **Vue DevTools / TanStack Table DevTools**: genuine debugging value; dev-only. The "Svelte has no TanStack DevTools adapter" gap no longer implies "no Svelte 5 table" — see A2's peer-dependency receipt.
- **`@tanstack/vue-table@9.3.1`** (VERIFIED registry: MIT, peer `vue >=3.2`): a real, first-class table adapter. It is the same tool family as A2, so it is a **tie on table capability**, not a Vue win.

**Svelte 5 → Vue 3 does not (as used here):**
- **Runes with no wrapper**: `$state` / `$derived` make sort/filter/derived rows ordinary variables; no `ref`/`computed`/`shallowRef` bookkeeping for a table that only reads engine snapshots.
- **The verified code wins ties**: the 67 Cakepanz shell is Svelte 5, byte-pinned, five seats deep in review, battery-backed. Vue would mean rewriting the one surface both sides agree works to buy ecosystem breadth this product does not use.
- **Toolchain already in the tree**: VERIFIED `colors/package.json` on `origin/architect/engine-and-seats` has `svelte ^5.57.3` and `@sveltejs/vite-plugin-svelte`; no Vue dependency. The Svelte MCP is mandatory here and its autofixer just returned clean on the A1 snippet (§F); the Vue MCP lane was reported blocked by a Vite-6 peer gate on a Vite-8 scaffold (REPORTED, Inkling's registry check).
- **One bridge to the engine**: in the Svelte tree, state reaches pixels through `stores.ts` → `hydrateApp.ts`; Vue would add a second contract (setup store + subscription + DEV hooks) behind the same immutable engine truth. More moving parts for the same output.
- **Cheaper wrong answer**: the port boundary makes either migration one `ui/` rewrite, so reversibility favors whichever choice ships the verified product sooner. That is Svelte.

Honest negative space: if the product grows into dozens of screens with accounts, sync and real cross-store timelines, Vue's ecosystem breadth would outweigh all of the above. That is a v1.1+ trigger, not this cutover.

---

## C · Final recommendation

**Svelte 5 + Vite, ~70/30, high confidence for this cutover.** Advisory only: R-13 remains 50/50 until the Owner rules or cutover forces the pick.

Reasoning: the four dashboards the Owner asked for are projection + flat tables over data the engine already emits; the library gap that used to favor Vue is closed at the manifest level (A2/A3), and the remaining Vue advantages are dev-time comforts, not shipped product capability. Against that, Svelte has the built, verified shell, the toolchain already installed, the working MCP lane, and fewer seams between engine truth and pixels. Nine seats lean Svelte on their own receipts (REPORTED, per the 2026-11-19 round summary); the sealed nine-arm bench favored neither, so the verified code breaks the tie.

- Biggest thing Svelte needs to win: ship the four dashboards with **zero engine-file changes** and pass L15–L17 + F23–F25 at 390 px with no page overflow and no console errors. If it needs new engine math or a store wrapper, the advantage evaporates.
- Biggest thing Vue needs to win: name one concrete screen in the Owner's four that Svelte cannot express cleanly, or win a sealed R-13 slice on bytes/lines/battery failures. "Pinia is more mature" is not that.
- What would change my mind: one concrete observation — a sealed heavy-table bench where the Vue arm passes L15–L17 and F23–F25 with measurably fewer lines, fewer battery failures and a smaller self-contained file than the Svelte arm, with both arms using their framework's owned routing and no new product text. I would flip to Vue on that receipt, not on a library list.
- Shipping 76 Pancakes tomorrow: **Svelte 5**. The verified shell and the MCP lane are here now; Vue's benefits are a future-state hedge that the port boundary already makes reversible.

---

## D · The thing neither framework gives us

A **stat provenance contract**: one typed `StatRow` carrying the raw engine value, the engine key it came from, and a single display formatter — so every table sorts on the raw number and every screen renders the same text. This is not a library; it is a render-layer law. Without it, the same defect my c9 review found (H5: ranking computed from rounded display text) will reappear in whichever framework wins, because neither Svelte nor Vue prevents parsing a string. The two-line companion: carry `round` on each box in the in-memory accumulator so PLAYOFF STATS can split legitimately (L17) without touching engine math.

## E · If R-13 runs

Run it on **the four-dashboard slice** (YOUR STATS + PLAYOFF STATS + ALL TEAMS + Awards leaderboard), never the Draft Board: the board is the Owner's fixture and both arms hand-roll it. Verdict signature: all five tests per sealed arm green, L15–L17 and F23–F25 passing, zero console errors, no page overflow at 390 px, self-contained-file bytes and line counts recorded, and no new user-facing text. If both arms pass on equal numbers, Svelte wins by the verified-code tiebreak; the measurement should not be re-run after every token tweak.

---

## F · Receipts (what I actually ran this session)

```
git show origin/gh-pages:Football-Sim-Z-post-blue-w89.html > …/w89.html   # 1,922,769 B
grep -n 'userStatsInner\|renderStatsTabsHTML\|seasonStatLine' …/w89.html  # :8374-8379, :8381-8388
  → "Your Players" is a <table> with one free-text stats column; PLAYOFF STATS reuses the same function with STATS_KIND='po'.
git show origin/architect/engine-and-seats:colors/package.json            # svelte ^5.57.3, vite, @sveltejs/vite-plugin-svelte; no vue
git show origin/council/muse:_agents/QUEUE.md                              # R-13: 50/50, pick forced at cutover, do not re-litigate
git show FETCH_HEAD:deliveries/cakepanz-stats-awards-overhaul-2026-11-19.md # L15-L17, F23-F25, round != null law
git show FETCH_HEAD:deliveries/framework-ecosystem-gpt-and-inkling-2026-11-19.md # seat positions, scaffold receipts (REPORTED)
webfetch registry.npmjs.org/@tanstack/svelte-table/latest                 # 9.3.2, MIT, peer svelte ^5.0.0, unpacked 96,329
webfetch registry.npmjs.org/@humanspeak/svelte-headless-table/latest      # 7.1.0, MIT, peer svelte ^5.30.0, unpacked 423,194
webfetch registry.npmjs.org/@tanstack/vue-table/latest                    # 9.3.1, MIT, peer vue >=3.2
webfetch registry.npmjs.org/@lucide/svelte/latest                         # 1.75.0, ISC, peer svelte ^5
tools.svelte["svelte-autofixer"](A1 snippet, desired_svelte_version 5.57.3)
  → {"issues": [], "suggestions": [], "require_another_tool_call_after_fixing": false}
```

Not run, explicitly: no R-13 bench, no Playwright/axe run, no bundle measurement, no render of the four dashboards. Every size claim above is registry unpacked size unless marked otherwise; shipped bytes are UNVERIFIED and must be measured before any library is accepted. The core snippet is a pattern for the Architect/Z.ai to implement, not a patch to any product file.
