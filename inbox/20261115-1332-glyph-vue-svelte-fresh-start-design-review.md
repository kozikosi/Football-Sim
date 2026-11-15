SPEAKER: Glyph | ROLE: council seat | TASK: design review — fresh-start Vue vs Svelte experiments (w89 beauty direction) | DATE: 2026-11-15T13:32Z
FOR: DESIGN-REVIEW (prompted task; no QUEUE.md ID provided in prompt)

## Scope
Design review for the two fresh-start experiment repos (Owner 2026-11-15): `kozikosi/football-sim-vue` (Vue 3 + Vite 8, Pinia 4, VueUse, TanStack Table, vite-plugin-vue-devtools) and `kozikosi/football-sim-svelte` (Svelte 5 + Vite 8, svelte-check, Vitest, Playwright). The four-slice arms in Football-Sim remain evidence and are not to be ported (REPORTED in prompt). Both experiments must **resemble the beauty and colors of w89** (live site) from the start.

Sources inspected (VERIFIED by command/output in this session): live w89 HTML/header/CSS via `curl https://kozikosi.github.io/Football-Sim/` and `git show origin/gh-pages:index.html`; brag-card skeleton `origin/council/ernie:_agents/ernie/deliveries/zai-open-wave-v3-2026-11-14/receipts/brag-card.html`; scaffold contracts/trees via `https://raw.githubusercontent.com/kozikosi/football-sim-{vue,svelte}/main/{AGENTS.md,package.json}` and GitHub git/trees API (`main`). Current scaffold state: both repos are default/minimal templates (VERIFIED: Vue `src/App.vue` is Vite starter with `HelloWorld`/`TheWelcome`; Svelte `src/App.svelte` + `src/lib/state/sim-state.svelte.ts` stub), so w89 visual language must be introduced deliberately, not assumed.

## w89 visual language to preserve (VERIFIED from references)
- **Palette/atmosphere:** near-black warm dark ground (`#0b0703`/`#140d06`/`#1c1307` in brag-card), gold/championship accents (`#ffc43c`, `#ecd9ad`, `#a08b62`, gold borders/shadows/glows in brag-card and w89 CSS such as `.fxbanner`, `.sfrow.sf90`, champion banner/glow), team-driven accent via `--tc` (brag-card sets `:root{--tc:#FB4F14}` and uses it in gradients/halo/badge). w89 also uses theme/team CSS variables (`--tA2`, `--gold2/3`, `--accent`, `--tn/tnd`, data-theme handling) — experiments should echo the *feel* (dark + gold + team color), not copy w89's monolithic variable soup.
- **Typography:** Cinzel / Cinzel Decorative are central to display/championship surfaces (VERIFIED: w89 loads Cinzel, Cinzel Decorative, Bodoni Moda from Google Fonts and applies Cinzel Decorative broadly to display controls/headings/shimmer text; brag-card embeds `@font-face` for Cinzel 700 and Cinzel Decorative 700). Body/UI in w89 mixes system sans and Bodoni Moda in places; experiments need a clear hierarchy (display/champion vs readable UI/body).
- **Championship feel:** radial/halo lighting, metallic/shimmer treatments, bordered stat panels, strong centered composition, high-contrast gold-on-dark, restrained but present motion (`fxshine`, glow animations in w89/brag-card) — celebratory, not flat.
- **Team color integration:** `--tc` (or an equivalent token like `--team-primary`) must be a first-class runtime variable so chrome/cards/badges can take team identity without rebuilding styles.

## Design review findings and recommendations

### 1) Establish a shared "w89 beauty" token layer first (both repos)
- **Recommendation:** Define a small, explicit token set in plain CSS/custom properties before building slices: background stack (`--bg-0/1/2` warm darks), text/ink (`--ink`, `--ink-muted`, `--ink-dim`), gold scale (`--gold-bright`, `--gold`, `--gold-deep`), surfaces/borders/glows, radius, spacing, and `--tc` (+ derived/computed tints for halo/gradients). Map directly to w89/brag-card values as the visual source of truth. **INFERRED benefit:** prevents framework-specific drift and makes visual parity measurable across the two arms.
- **Risk:** w89's inline CSS is huge and historically accreted (VERIFIED by grep: many gold/zpb/team variables). Copying it would import complexity and conflicts with "build from scratch". Keep tokens minimal and semantic.
- **Typography tokens:** load Cinzel + Cinzel Decorative (and optionally one readable body face if needed) intentionally; set display stacks for hero/champion/labels and a legible UI/body stack. Avoid blocking render surprises (INFERRED: prefer `font-display: swap` if self-hosting/loading). Brag-card embeds fonts — useful reference, but for app scaffolds use maintainable font loading (Google Fonts or licensed/self-hosted files) rather than inlining giant base64 blobs into components.

### 2) App shell and layout primitives should carry the championship mood
- **Recommendation:** Build a dark shell (page background, centered max-width stages where appropriate, subtle vignette/radial light) so even early slices "feel" like w89. Use gold borders/dividers and panel surfaces for stats/cards; reserve strongest shimmer/glow for key moments (champion banner, primary CTA/badges), not every element. **INFERRED:** overusing animation/glow will reduce hierarchy and hurt readability/perf.
- **Team theming:** expose `--tc` at `:root` or a top app container and drive halo/badge gradients from it (pattern seen in brag-card: `color-mix`/radial with `--tc`). Provide a safe fallback `--tc` (e.g. neutral gold/bronze) when no team selected.

### 3) Motion and "championship" effects — controlled and accessible
- **Recommendation:** Implement shimmer/shine/glow as opt-in utilities/classes (badge shine, star/90+ accents, win states) with `@media (prefers-reduced-motion: reduce)` disabling/simplifying animations. w89 contains animated shine/glow (VERIFIED: `fxshine`, `zpbstarglow`/glow classes in grep) — experiments must match feel but remain accessible.
- **INFERRED:** keep animations GPU-friendly (opacity/transform/background-position where possible) and avoid layout-thrashing effects in data-heavy views (draft/standings) to protect the comparison.

### 4) Vue-specific design/architecture guidance
- **Composition API / boundaries (per repo AGENTS, VERIFIED):** all simulation/math in `/src/engine/**` plain TS (headless-testable); UI state in Pinia setup stores bridging engine; components stay presentational/orchestrating. Expose `window.__pinia` in DEV after first store exists for QA (AGENTS).
- **Styling approach (INFERRED, fits scaffold):** use global design tokens (e.g. `src/assets/w89-tokens.css` or base layer) + scoped component styles for slice-specific layout; avoid scattering magic hex values. Consider a small set of presentational primitives (ChampPanel, GoldBadge, StatCell, TeamHalo) to encode w89 look consistently.
- **Libraries (per AGENTS, VERIFIED):** TanStack Table for stats/depth/standings rows only — draft board remains bespoke (hand-rolled, fixed visuals/contract hooks). Lucide icons via `@lucide/vue` (not deprecated package). VueUse for browser APIs/storage helpers — do not hand-roll wrappers.
- **First visual proof recommended (INFERRED):** replace starter template with a w89-themed shell + one championship-style surface (e.g. hero/champion card using `--tc`, Cinzel display, gold stat tiles) so beauty direction is validated before complex slices.

### 5) Svelte-specific design/architecture guidance
- **Runes/engine separation (per repo AGENTS, VERIFIED):** runes-only in `.svelte`/bridge files; pure engine in `/src/lib/engine/**` as plain `.ts` with no `.svelte.ts`/runes; UI bridge in `/src/lib/state/**` as `.svelte.ts` classes holding `$state` snapshots. QA hook `window.__SIM_STATE__` in DEV when bridge exists. Use Svelte MCP for any `.svelte`/`.svelte.ts` syntax decisions (AGENTS requirement — **PROCESS NOTE**, not independently verified in this session).
- **Styling approach (INFERRED):** Svelte's scoped styles work well for component chrome, but w89 tokens/typography/background should live in a global stylesheet imported once (e.g. `app.css`/layout entry) so `--tc`, font faces, and body background are universal. Keep shimmer/badge utilities global or shared to avoid duplication.
- **Bespoke draft board:** same rule as Vue — hand-rolled for fixed visuals/test hooks; TanStack Svelte Table only for stats/standings/depth data tables (AGENTS, VERIFIED).

### 6) Cross-cutting quality/measurement notes
- **Contrast/readability:** gold-on-dark must remain legible; w89 already tuned inks in places (e.g. coffee/cream on-gold notes in header comments). Any new gold text/badges should be checked against dark/warm backgrounds (INFERRED; no contrast audit run in this session — **UNKNOWN** exact ratios for proposed tokens).
- **Responsive:** championship compositions (large display numerals/headlines, stat grids like brag-card 2-col) must adapt down to narrow/mobile widths without losing hierarchy (INFERRED; w89 is responsive in places but this review did not run viewport tests — **UNKNOWN**).
- **Determinism/perf parity:** visual layers (gradients, filters, animations) can affect paint cost; keep effects cheap and comparable between Vue/Svelte so perf measurements reflect framework/app structure, not gratuitous CSS differences (INFERRED).
- **Do not copy artifacts:** brag-card and w89 are references for *design language only*; build-from-scratch in each experiment repo per ruling (prompt). No porting of the four-slice arms.

## Suggested "definition of visually on-track" for early experiment slices
A slice can be considered directionally aligned with w89 beauty when: (1) warm near-black background + gold/cream typographic hierarchy are present, (2) Cinzel/Cinzel Decorative appear on championship/display surfaces, (3) `--tc` visibly drives at least one team-colored surface/halo/badge, (4) at least one restrained championship effect (shine/glow/halo) exists with reduced-motion fallback, (5) engine/UI separation and repo-specific house rules remain intact. Evidence should be screenshots + cited token values (INFERRED acceptance shape).

## Evidence labels summary
- **VERIFIED:** repo scaffold contents/contracts/packages and w89/brag-card visual elements/colors/fonts/animation cues as cited above (commands/API fetches in this session).
- **REPORTED:** prompt context (fresh-start ruling, do-not-port slices, "KG sends this", Owner beauty directive), w89 being live/index context as stated in prompt.
- **INFERRED:** tokenization strategy, component primitive breakdown, contrast/perf/responsive cautions and first-proof recommendation.
- **UNKNOWN:** exact contrast ratios for proposed token pairs, viewport behavior of future experiment UIs, and whether either repo team has already begun work outside inspected `main` heads (only `main` inspected via GitHub API).
