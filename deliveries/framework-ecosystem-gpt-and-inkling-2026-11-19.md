SPEAKER: INKLING | TASK: framework decision record — GPT's ecosystem evaluation (verbatim), independently verified, with my critique and preference | DATE: 2026-11-19 · English only

**Why this file exists.** The Owner asked GPT to evaluate Vue 3 vs Svelte 5 for 76 Pancakes (his answer is Appendix A, verbatim).
This file records (1) GPT's text verbatim, (2) my independent verification of GPT's factual claims against the two comparison
scaffolds on GitHub (`kozikosi/football-sim-vue` @ `6b4de5c…`, `kozikosi/football-sim-svelte` @ `86ba632…`) and the v3 nine-arm
results in this repo, (3) my critique of GPT's arguments, and (4) my preference, formed. The decision is the Owner's; Block C
(R-13) may still measure it; this file is the permanent record either way.

---

## 1. Verification receipts (commands I ran today, 2026-11-19)

```
gh api repos/kozikosi/football-sim-vue/contents/package.json        # → vue ^3.5.42, vite ^8.3.8,
                                                                  #    @tanstack/vue-table ^9.3.1,
                                                                  #    @vueuse/core ^15.0.0, pinia ^4.1.0,
                                                                  #    vue-tsc ^3.3.14, vitest ^4.1.11, node ≥22.18/≥24.12
gh api repos/kozikosi/football-sim-svelte/contents/package.json     # → svelte ^5.57.2, vite ^8.3.0,
                                                                  #    NO pinia / vueuse / tanstack / lucide anywhere
                                                                  #    devDeps only: svelte-check, vitest, playwright
```
GPT's dependency table: **accurate** (Vue carries Pinia/VueUse/TanStack-Vue-Table; Svelte carries none of them).

```
football-sim-vue/CLAUDE.md   → Composition API only; Pinia setup stores; @tanstack/vue-table for tabular
                               data (draft board hand-rolled); @lucide/vue; VueUse for browser APIs;
                               "vite-plugin-vue-mcp: NOT to be installed with --legacy-peer-deps…
                               peer support only through Vite 6; this scaffold runs Vite 8" — GPT's
                               MCP-prohibition claim is VERBATIM accurate.
football-sim-svelte/CLAUDE.md → "Svelte MCP first: any `.svelte` or `.svelte.ts` change goes through the
                               `svelte` MCP (get-documentation or svelte-autofixer) BEFORE it lands" — GPT's
                               mandatory-MCP claim is VERBATIM accurate; runes-only; engine/lib separation;
                               @tanstack/svelte-table + lucide-svelte SPECIFIED but not in the manifest;
                               window.__SIM_STATE__ DEV hook; window.__pinia DEV hook on the Vue side.
```
GPT's instruction-file quotes: **accurate**. (His one numerical slip: he writes "Vue 3.5.42" — the manifest reads
"^3.5.42" and the lockfile resolves somewhere in 3.5.x; immaterial. And his mention that the Svelte manifest "specifies
TanStack Svelte Table and Lucide Svelte but they aren't yet in its manifest" is exactly right — specified in prose, absent in bytes.)

Also verified from inside this repo (`z framework test v3/fwtest-9/`): the nine-arm v3 run (all 9 arms 5/5 green), dists 76–132 KB,
9/9 "one file" on the shape-change axis (the shared CONTRACT owns the shape — no discriminator), file:// blocked everywhere
(plain SPAs; prerendered meta-frameworks show but never hydrate), `z framework test v3` is byte-identical arm-to-arm except arm bytes.

**Summary: GPT's fact base is trustworthy. His conclusions, less so — see §3.**

## 2. What GPT actually says (his own load-bearing claims)

- Vue's genuine ecosystem wins: Pinia (+time-travel), VueUse (breadth/maturity), official routing, TanStack-Table **DevTools** only.
- Svelte's wins: native runes, thinner architecture, custom-interface development, **AI tooling in this repo** (Svelte MCP mandatory;
  Vue's Vite-8-MCP lane is blocked by the plugin's Vite-6 peer gate).
- UI components: a wash for this product (custom visual identity); PWA: a wash; Table functionality: a tie.
- His verdict: **Svelte 5, ~60/40**, "Vue has a stronger toolbox; Svelte has a more attractive foundation."
- His contingency: "if Football-Sim evolves into dozens of screens with accounts, deep tables and dashboards, the ecosystem argument flips."
- His "before committing" test: add TanStack-Svelte-Table + Lucide-Svelte + evaluate svelte-use vs VueUse, then the same Pinia-style
  debugging in both — i.e., an *ecosystem-parity* comparison.

## 3. My critique of GPT's advice

**3.1 He prices ecosystems; he doesn't price this architecture. (Method error)**
Almost every category he scores differently is a non-differentiator for this product:
- **Pinia's time-travel is a debugging luxury this codebase doesn't need yet.** The store of truth is the engine's plain-TS record
  behind the port; the shell holds snapshots. State bugs surface in `src/engine/` (framework-free, headless-tested, 419 passing) or
  in the boot path (guarded at exactly three doors, now law-covered). There is no cross-store invalidation graph for Pinia to watch.
  Pinia would wrap a wrapper; the engine already IS a store; adding a second, parallel state framework is a real cost GPT never sizes
  — he prices Pinia's benefits without pricing the *seam* it would have to live in.
- **Vue Router's advantage is moot twice over.** (a) Colors v1 ships one offline, single-file, hash-routed product — `#/board`,
  `#/complete`, the 4.4-fix convergence already works, deep links and Back/forward function, and a screen never deep-nests beyond
  10–12 hand-rolled screens. (b) His proposed Svelte equivalent is SvelteKit, which he correctly discounts — but the comparison he
  never makes is the *right* one: plain-Svelte-Vite + 100 lines of owned hash routing (which exists and is receipted) vs Vue-Router.
  A 100-line asset you already own beats an official router you would own none of.
- **TanStack DevTools "Svelte gap"** is real and terminal-important nowhere: two or three tables exist (Stats, Standings, Book); the
  board is bespoke in BOTH scaffolds (I verified the two CLAUDE.md files both *mandate* hand-rolled boards); a missing DevTools adapter
  does not change a row of font code.
- **UI component libraries** — he already excludes them; correct. The custom identity is the product.
- **PWA/Offline** — he scores it a tie, which is the polite way to say both are equally irrelevant (offline is the *engine*, not a
  service-worker wrapper).

**3.2 He mis-weights the one asymmetry that is real and load-bearing right now.**
In *this* repo, for *this* product, the practical difference between the two ecosystems is the agent tooling lane: the Svelte scaffold
**mandates** the MCP autofixer before any `.svelte` change lands (and this environment runs it); the Vue scaffold **cannot** wire
`vite-plugin-vue-mcp` (Vite-6 peer gate, still true on the manifest he read). When the maintainer is a non-specialist agent stack —
which the Architect's own Vue-case and GH traffic both assume — the lane you can't install outranks the library you could. GPT *sees*
this (his 8.5-vs-9.5 AI-development-tooling row) but files it as one row of ten instead of the deciding one at current scale.

**3.3 He never engages the inverse failure mode: what Vue costs this architecture.**
The port boundary (`src/lib/port/seam.ts`) is the reason this is a low-stakes decision — "one rewrite of ui/" behind the same contract.
Playing that forward honestly: in the Svelte tree, state reaches the pixels through one bridge (`stores.ts`, `hydrateApp.ts`,
`vite-plugin-svelte`); in the Vue tree, every engine snapshot would pass through Pinia's setup-store contract, a second subscription
surface, and `window.__pinia` DEV conventions. More moving parts behind the same engine truth — exactly the class of thing the
"no black screen" laws (N28/N29/L8/L10/L11) exist to kill. Vue's sell ("a stranger edits it in a year without archaeology") is answered
by the batteries, which test behavior, not readability; no hiring plan is on the table; the maintainer is an agent stack with a mandatory
autofixer. His maintainer-experience argument prices a hypothetical human hire.

**3.4 His "before committing" test is well-intentioned and ill-shaped.**
Adding TanStack-Svelte-Table + Lucide-Svelte + svelte-use parity **measures dependency parity, not product fitness.** The same flaw
as benchmarking frameworks in scaffolds: you prove the scaffolds equal, not that the decision matters. The discriminating experiment —
which capability, exactly, do we lack — does not exist yet behind a written requirement; none of the ten categories names a screen that
cannot be built either way. If the Owner wants certainty, the honest instrument is a sealed slice ported twice, already proposed as
Block C (R-13); if he doesn't, the decision should be made on 3.2/3.3 and the determinism of "the verified code wins ties".

**3.5 What he got right — credit where due.**
- The manifest gap (specified-but-absent Svelte libs) is a real unfairness he flagged accurately — the Svelte side hasn't even met its
  own spec yet; that's a hygiene finding, not an architectural verdict.
- Vue's Pinia/VueUse maturity IS real, and in a larger app would outweigh this. His escape hatch ("dozens of screens, accounts, sync…")
  is the correct trigger — and it is a *years-out* trigger, not this cutover's.
- His 60/40 is honest as a preference and he admits subjectivity ("subjective scores… not benchmark results"; "approximately").
- He asked the only question that matters — "what breaks if we're wrong?" — and answered it correctly: the port boundary makes the wrong
  answer affordable either way.

## 4. My preference

**Svelte 5 + Vite, comfortably ahead of 60/40 (call it 70/30 on the facts, not the vibes).** Conditions and reasoning:

1. **The verified code wins ties.** The 67-cakepanz shell — built, byte-pinned, five seats deep in review, battery-backed,
   transition-lawed — is Svelte. Rewriting to Vue buys ecosystem breadth this product does not use at the price of re-verifying
   the one surface both sides agree works. For a cutover decision made in days, that's the worst trade on the table.
2. **The reversible cost argument, taken seriously in *this* direction.** If the Architect's Vue case turns out right at v1.1+
   (deeper sync, accounts, dozens of screens), the migration is one rewrite of `ui/` behind the port — engines, saves, VMs and batteries
   move unchanged. Reversibility favors whichever choice ships it *sooner* — and nobody measures Svelte shipping sooner than Svelte.
3. **The agentic lane is the tiebreaker that's real today** (§3.2): the mandatory MCP discipline and the working, receipted environment
   are Svelte's, by fiat of this toolchain; Vue's equivalent lane is gated by the peer-dep gate as of the manifest he read today.
4. **The Vue case, fairly priced (the negative space):** if the product were Pinia-hungry (real cross-store timelines, accounts), or
   if the Architect daily-preferred Vue (maintainer fluency is a legitimate weight), or the Owner wants pin-family consistency with a
   planned desktop shell — I'd take Vue or at least Block C. None of those are true today.
5. **What would change my mind:** a Block C verdict in which the Svelte arm measurably fails a product-shaped budget (UX latency, bundle
   size, hydration, batteries' flakiness); or the appearance of a concrete complexity that Svelte cannot express behind the port; or
   the Architect's daily maintenance of `colors/` proving slower in Svelte by receipt, not narrative.
6. **Process recommendation:** do not spend more weeks on this. The Owner has deferred it ("not important now") correctly. If he wants
   certainty before cutover, Block C runs once against a sealed slice (the late board is gone; use the uniform board-as-of-pick-1, or the
   Complete flow) and the verdict is measured once; otherwise Svelte stands by default through 76 Pancakes v1.

**Critique of GPT's bottom line, in one line:** right answer (Svelte, his 60), downgraded for the wrong analysis — he scored ecosystems;
he should have scored the port boundary, the verified shell, and the agent tooling lane; do that scoring and the number is 70/30.

## 5. Recommended asks (unchanged from the ASK)

- The Owner rules the framework call (or defers to cutover); nobody else may rule it.
- The Architect's Vue recommendation stands as filed (LOW confidence); the council still has no verdict; the nine-arm result stands.
- Block C (R-13) — now against the **uniform board** slice — may still measure it; it's one sitting; it should not gate the cutover.

## Appendix A — GPT's message, verbatim (the permanent reference)

---

> I investigated this against your actual GitHub project rather than just comparing generic Vue and Svelte feature lists.
>
> My conclusion is more nuanced than my earlier recommendations:
>
> Vue 3 has several ecosystem advantages that are genuinely relevant to Football-Sim. One of them is particularly interesting for your development workflow. But I haven't found a Vue-exclusive capability that makes it a clearly better foundation for the finished game.
>
> I examined:
> - Your main kozikosi/Football-Sim repository.
> - Your football-sim-vue comparison scaffold.
> - Your football-sim-svelte comparison scaffold.
> - The actual dependency manifests and architecture instructions in both scaffolds.
> - Current Vue, Svelte, and TanStack ecosystem documentation.
>
> One important observation: your comparison scaffolds are deliberately minimal, not fully developed versions of the game. So I am evaluating the technologies against your established architecture and intended features, not pretending the scaffolds already demonstrate the finished application.
>
> 1. The most relevant Vue ecosystem advantages
>
> | Vue ecosystem tool | What it offers Football-Sim | Svelte equivalent | Assessment |
> |---|---|---|---|
> | Pinia | Central franchise, draft, season, and UI state management | Svelte 5 runes | Vue advantage |
> | VueUse | Browser APIs, storage, keyboard shortcuts, workers, browser events | Svelte Use and native APIs | Vue advantage |
> | Vue Router | Official routing, nested screens, URL state, browser history | SvelteKit or third-party routers | Vue advantage |
> | Vue DevTools | Component inspection, reactive state debugging, Pinia timeline | Svelte tooling and debugging | Vue advantage |
> | TanStack Table | Sorting, filtering, pagination, column visibility, table state | TanStack Svelte Table | Tie |
> | TanStack Table DevTools | Inspect table state and row models | No dedicated Svelte adapter currently | Vue advantage |
> | Lucide | Icons throughout the interface | Lucide Svelte | Tie |
> | Vitest / Playwright | Unit, integration, and browser testing | Same tools | Tie |
> | Vite PWA | Offline installation, service workers, cached assets | Same plugin | Tie |
>
> Let's look at the meaningful differences.
>
> 2. Pinia: Vue's strongest advantage for your application
>
> Consider the different kinds of state in Football-Sim:
> - Current franchise and selected team.
> - Draft state and available players.
> - Current season and standings.
> - Player statistics and historical records.
> - User settings and preferences.
> - Account and synchronization status.
>
> Pinia gives you a structured way to organize this state into separate stores.
>
> Its particularly valuable features include:
> - Time-travel debugging.
> - Action and mutation timelines.
> - Store inspection through Vue DevTools.
> - Hot module replacement while preserving state.
> - Store testing utilities.
> - Plugin architecture.
>
> These are real advantages when debugging complicated application state.
>
> What does Svelte have instead?
>
> Svelte 5 runes, particularly $state and $derived, can implement the same state architecture without an additional state-management library.
>
> Your Svelte architecture already specifies .svelte.ts state bridges that hold snapshots from the independent simulation engine.
>
> My assessment:
>
> Pinia is a better-developed centralized state-management ecosystem. Svelte's approach is simpler and more integrated into the language.
>
> For a project with your complexity, I consider Pinia's debugging facilities a genuine advantage, but not a decisive one.
>
> 3. VueUse: a surprisingly relevant ecosystem
>
> This is probably the most immediately useful collection of utilities for your intended features.
>
> Some examples:
>
> | Utility | Football-Sim application |
> |---|---|
> | useStorage | Save preferences and lightweight state |
> | useBroadcastChannel | Communicate between application tabs |
> | useWebWorkerFn | Run expensive calculations away from the UI |
> | useEventListener | Keyboard and browser events |
> | useResizeObserver | Responsive draft board and tables |
> | useBreakpoints | Mobile versus desktop layouts |
> | useDocumentVisibility | Handle returning to an inactive game |
> | useClipboard | Copy franchise or league information |
>
> VueUse provides a substantial library of these abstractions.
>
> But Svelte has an answer here.
>
> There is a Svelte 5 library called @ariefsn/svelte-use that provides more than 120 runes-first utilities.
>
> It includes:
> - IndexedDB.
> - LocalStorage.
> - Online status.
> - Web Workers.
> - Virtual lists.
> - Keyboard and browser events.
> - Drag-and-drop.
> - Browser observers.
>
> This is an important finding because it means VueUse isn't an exclusive capability.
>
> However, VueUse has a more established ecosystem and is a library I would be more comfortable standardizing on without additional evaluation.
>
> My verdict: Vue wins on ecosystem maturity and convenience; Svelte can accomplish the same things.
>
> 4. Vue Router: a genuine advantage over plain Svelte + Vite
>
> This is an advantage I think deserves more consideration.
>
> Imagine being able to navigate directly to:
> /franchise/123/draft
> /franchise/123/roster
> /franchise/123/season/2027
> /franchise/123/team/chiefs
> /franchise/123/statistics
>
> This gives you:
> - Direct links to particular screens.
> - Browser back and forward functionality.
> - Deep linking.
> - Nested layouts.
> - URL-based filters and selections.
> - More organized navigation as the application grows.
>
> Vue Router is officially maintained within the Vue ecosystem and integrates directly with Vue's Composition API.
>
> Svelte has SvelteKit, which includes an excellent router, but that means introducing SvelteKit rather than staying with your current plain Svelte + Vite architecture.
>
> There are third-party Svelte routers, including svelte5-router and Routify.
>
> My assessment: Vue has the advantage if you want to stay with plain Vite and have a mature, official routing solution.
>
> That said, you don't necessarily need a sophisticated router for Football-Sim. You could also build a relatively straightforward navigation system.
>
> 5. TanStack Table: mostly a tie, with one interesting exception
>
> Your application has several places where a table library could be useful:
> - Player statistics.
> - Depth charts.
> - League standings.
> - Historical records.
> - Draft prospect rankings.
> - Award voting.
>
> Both Vue and Svelte have first-class TanStack Table adapters.
>
> In fact, TanStack Table V9 specifically supports Vue 3 and Svelte 5. The Svelte adapter is designed around runes and integrates with Svelte's reactivity.
>
> There is one interesting difference.
>
> TanStack Table DevTools currently lacks a dedicated Svelte adapter. Its documentation specifically identifies Svelte as one of the frameworks without a dedicated table DevTools adapter.
>
> This means Vue has a debugging advantage when inspecting complicated table configurations, row models, sorting, filtering, and column state.
>
> However, I want to emphasize something from your own architecture instructions:
>
> Your draft board is supposed to remain custom-built, not be converted into a generic table.
>
> I agree with that decision. Your draft board has specialized presentation, positional flexibility, team needs, and custom visual indicators.
>
> TanStack should be used where it makes sense, not everywhere.
>
> Verdict: Tie for functionality, small Vue advantage for table debugging.
>
> 6. UI component ecosystems
>
> Vue has a substantial advantage in the number and maturity of ready-made component libraries.
>
> Some examples:
> - PrimeVue — Large collection of tables, menus, forms, overlays, charts, and other components.
> - Vuetify — Comprehensive Material Design component framework.
> - Quasar — Extensive UI components and tooling for web, desktop, and mobile applications.
>
> Svelte has its own strong component ecosystem:
> - Bits UI.
> - shadcn-svelte.
> - Skeleton.
> - Flowbite Svelte.
>
> For Football-Sim, I don't think this advantage is particularly important.
>
> You have a distinctive visual identity. Your custom draft board, player cards, team colors, standings, and franchise screens should be designed around your product rather than forced into a generic component library.
>
> I'd rather use custom components with either framework.
>
> 7. Offline functionality: no Vue advantage
>
> This is worth addressing separately because of your account synchronization plans.
>
> The Vite PWA Plugin is explicitly framework-independent.
>
> It supports both Vue and Svelte, including framework-specific reactive wrappers for service-worker registration.
>
> Both frameworks can use:
> - IndexedDB.
> - Dexie.
> - Service workers.
> - Background synchronization where supported.
> - Web Workers.
> - Local-first application state.
> - Cloud synchronization.
>
> VueUse makes some of this more convenient, but it doesn't provide an inherent architectural advantage for offline franchise persistence.
>
> I would not select Vue based on offline functionality.
>
> 8. Something I found in your actual repositories
>
> This is probably the most actionable finding.
>
> Your two comparison scaffolds aren't currently equipped with identical ecosystem dependencies.
>
> Actual package.json dependencies, not hypothetical recommendations.
>
> | Dependency | Vue scaffold | Svelte scaffold |
> |---|---|---|
> | Framework | Vue 3.5.42 | Svelte 5.57.2 |
> | Vite | 8.3.8 | 8.3.0 |
> | TypeScript | Yes | Yes |
> | Vitest | Yes | Yes |
> | Playwright | Yes | Yes |
> | Table library | TanStack Vue Table | Not installed |
> | State management | Pinia | Native runes |
> | Utility library | VueUse | Not installed |
> | Icon library | Not installed | Not installed |
> | Framework DevTools | Vue DevTools plugin | Different tooling approach |
>
> Your Svelte architecture instructions already specify TanStack Svelte Table and Lucide Svelte, but those packages aren't yet in its manifest.
>
> Likewise, the Vue instructions specify Lucide Vue, but that isn't in its manifest either.
>
> This matters because I wouldn't consider the current dependency manifests a completely fair comparison of the two ecosystems.
>
> There is another interesting difference in your AI development workflow:
> - Your Svelte scaffold mandates the Svelte MCP documentation and autofixer for Svelte-specific changes.
> - Your Vue scaffold has access to Vue documentation through its MCP lane, but its instructions prohibit installing vite-plugin-vue-mcp with Vite 8 because of its Vite 6 peer dependency restriction.
> - Both use Context7 for general documentation.
>
> That gives Svelte a useful advantage in your AI-assisted development workflow, even though Vue has its own excellent DevTools.
>
> 9. What I would actually choose
>
> Subjective scores for Football-Sim, not benchmark results.
>
> | Category | Vue 3 | Svelte 5 |
> |---|---|---|
> | State management ecosystem | 9.5 | 9 |
> | Browser utility ecosystem | 9.5 | 8.5 |
> | Routing | 9.5 | 8 |
> | Table ecosystem | 9.5 | 9 |
> | Table debugging | 9.5 | 8 |
> | UI component ecosystem | 9.5 | 8.5 |
> | AI development tooling in your setup | 8.5 | 9.5 |
> | Offline/PWA support | 9.5 | 9.5 |
> | Custom interface development | 9 | 9.5 |
> | Minimal architecture | 8.5 | 9.5 |
>
> My interpretation:
>
> Where Vue is genuinely stronger
> - Pinia and its debugging ecosystem.
> - VueUse's breadth and maturity.
> - Official routing.
> - More mature selection of ready-made UI components.
> - TanStack Table debugging integration.
>
> Where Svelte is stronger
> - Less need for external state-management infrastructure.
> - Excellent native reactivity.
> - Strong custom component development.
> - AI coding assistance in your current setup.
> - A comparatively lightweight architecture.
>
> 10. My recommendation
>
> I would still lean toward Svelte 5 + Vite, but my confidence is less absolute than before.
>
> There is one scenario in which I would seriously consider Vue instead:
>
> If Football-Sim evolves into a much larger application with dozens of interconnected screens, complicated account management, extensive data tables, and sophisticated dashboard functionality, Vue's ecosystem becomes increasingly attractive.
>
> However, the defining characteristics of your project are different:
> - A standalone simulation engine.
> - A custom sports-gaming interface.
> - A local-first franchise experience.
> - Offline gameplay.
> - A synchronization layer.
> - Multiple sports sharing the same underlying application architecture.
> - A relatively small development operation relying heavily on AI assistance.
>
> I don't think you need Pinia, VueUse, and a large UI component library to accomplish those goals.
>
> I would rather use Svelte's native capabilities and selectively introduce libraries than adopt Vue just to gain access to its larger ecosystem.
>
> One final qualification: I couldn't find a public branch or file explicitly named W89 in your repository. The public Football-Sim default-branch documentation still describes the earlier v20 architecture, so this assessment uses your two framework comparison repositories and their architecture instructions as the basis for evaluating the newer direction.
>
> What I would do before committing
>
> I'd make one final ecosystem parity test:
> 1. Add TanStack Svelte Table and Lucide Svelte to the Svelte scaffold.
> 2. Add equivalent icon support to Vue.
> 3. Evaluate Svelte Use against VueUse for browser functionality.
> 4. Implement the same Pinia-style state debugging requirements in both.
> 5. Test the same nested navigation and offline persistence workflows.
>
> I think that would be a more meaningful final comparison than running another set of rendering benchmarks.
>
> My current vote: Svelte 5 + Vite, approximately 60/40 over Vue 3 + Vite. Vue has a stronger toolbox; Svelte has a more attractive foundation for the particular product you're building.

— Appendix A ends.

---

## Addendum — the outside-tools audit (Inkling, 2026-11-19T02:20Z)

The Owner asked (2026-11-19, verbatim question in-session): "could we have more dashboards + screens + heavy table for the awards and
your season stats and all team's stats and playoff stats? i do think we could upgrade from w89 here" — and in the framework context: "are
there tools we could use to improve the site?" Constraints honoured: don't suggest tools for their own sake; drag-and-drop is out (the
w89 board stays); every tool must run offline, bundle into one self-contained file, cost ~zero at runtime, and beat the thing it replaces.

**Used in the product today: zero runtime dependencies for the render layer beyond Svelte/Vite + Playwright (dev).** Both scaffolds'
own standards already name three of these as intended-but-not-yet-installed — so using them is convergence, not novelty.

Candidates that pass the bar (ranked):
1. **@tanstack/svelte-table** (MIT, ~15 KB min, headless/unstyled) — the ONE real candidate for the awards/stats/table upgrade: sort/filter/
   column-visibility/pagination/facets + row models for the 44-key leaderboards, the ALL TEAMS table, YOUR STATS, PLAYOFF STATS. Board
   stays bespoke per the Owner's ruling. Specified-but-uninstalled in the Svelte scaffold; wiring = one sitting item. Honestly weighs as
   "saves ~150 lines of sort/filter logic and gains column visibility" vs hand-rolled; recommend it for the heavy tables, keep BoardRow bespoke.
2. **@lucide/svelte** — tree-shaken, MIT; consistent a11y-labelled icons for award cards, trophy/stat iconography, nav polish. Specified-
   but-uninstalled in the Svelte scaffold today.
3. **axes / QA-only, zero product cost:** axe-core injected via Playwright in the batteries (hardens the a11y laws beyond the existing probe);
   Playwright screenshot assertions against the seeded engine (deterministic per seed) — the visual-regression harness with NO new deps.
4. **lz-string** — only if browser saves ever need shrinking (envelope compression for localStorage/autosave); the envelope spec governs;
   optional, never blocking; likely unnecessary with replay-based hydration.

Candidates that FAIL the bar (and would be "tools for the sake of using tools"): UI kits (Bits/shadcn/Skeleton/Flowbite — the custom identity
wins, GPT agrees); chart libraries (Chart.js/ECharts/D3 — no per-week probability series exists in the VM today; hand-rolled inline SVG
covers any future sparklines once the Architect exposes the data); PWA service worker (cache-invalidation complexity, offline save is the
sync story); virtual scrolling for ~1.7k tiny rows (render cost is fine); Zod (the envelope already validates at load); Storybook; drag-
copy (explicitly ruled out); analytics/telemetry (offline hard requirement, never); Pinia/VueUse/Vue Router in the Svelte tree (wraps a
working engine store; solves an SSR-routing problem the hash router already solves; adds the double-store seam — this is also the honest
Vue-side counterpoint: Pinia timeline debugging is genuinely nice and would only matter if the port broke and the shell became the truth).

**Vue-side tool for the record, honestly priced:** `vite-plugin-vue-devtools` + Pinia timeline inspection is Vue's one real tooling pull —
real, and irrelevant while the shell is a thin snapshot-render layer behind the port.

Verdict: adopt **1** (tables) and optionally **2–4**; reject the rest; w89's board and identity stay exactly as shipped. Framework verdict
unchanged: Svelte 5 stands (Owner's call to make).
