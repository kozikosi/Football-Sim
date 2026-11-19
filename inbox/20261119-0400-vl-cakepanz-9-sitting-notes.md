SPEAKER: vl | ROLE: Council Advisor | TASK: cakepanz-9 sitting notes | DATE: 2026-11-19T04:00Z

# VL cakepanz-9 sitting notes — verification, tools investigation, framework opinion

## 1 · VERIFICATIONS (from delivered 8.1 bytes, cakepanz-4 + cakepanz-4-prepared)

All run from `_agents/vl/deliveries/zai-pass-through/67-cakepanz-8.1-2026-11-18/` at the final bytes.

| # | Check | Command | Result | Label |
|---|-------|---------|--------|-------|
| 1 | Pins vs git archives | `git archive 5c808472 colors/src` + `diff -rq` vs `src/engine/core|platform|sports/nfl/{engine,app}` | exit 0 both trees | VERIFIED |
| 2 | Flex census | `node -e` over `tools/mathlab/flex.json` | 99 rules `{"0":17,"2":17,"6":42,"12":23}`; SS>NICKEL=0 FB>TE=2 FB>RB=2 C>OG=6 OG>C=2 QB>FS=12 | VERIFIED |
| 3 | Engine suites | `node --test --experimental-strip-types test/engine.test.ts` | 394/394 shipped · 406/406 prepared, exit 0 | VERIFIED |
| 4 | Node battery | `node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs` | 33/33 both trees, exit 0 | VERIFIED |
| 5 | Prepared numerals gate | `CP_PIN=65673a00 node scripts/gate-numerals.mjs` | FAIL — "MERGE-GUIDE.md never names the CURRENT pin (65673a00)", exit=1 | VERIFIED (confirms 3-seat FAIL) |
| 6 | gate-manifest | `node scripts/gate-manifest.mjs` | PASS (314 entries) shipped ×2 · PASS (319 entries) prepared ×2 | VERIFIED |
| 7 | gate-numerals (default) | `node scripts/gate-numerals.mjs` | CLEAN ×2 both trees | VERIFIED |
| 8 | §22 cite-check prototest | by-hand check each sha/count in VERIFY.txt §22 vs receipts/partH-c8-1/ | All locally checkable shas match: FIX-RECEIPT.md `1b9bea5f…` ×3, START-OF-CHAT-ZAI.md `8ef3b18d…` ×3, dist/single.html `4ce69205…`; shell/slice/late batteries + falsifiers + A2 mutation NOT RUN (need Playwright/browser) | PARTIAL |
| 9 | Snake-order probe | static read of `src/engine/sports/nfl/engine/draft.ts` `snakeOrder()` | `r % 2 === 0 ? i : teams - 1 - i` — round 1: 0→31, round 2: 31→0, alternates. True snake confirmed. | VERIFIED |
| 10 | gh-pages vs fix cmp | `git show origin/gh-pages:67-cakepanz/README.md` names `4ca9a071`/52 files; gh-pages `src/engine/` vs `d3bd81d2 colors/src/` | byte-identical, exit 0 (proper subdir mapping core|platform|sports/nfl/{engine,app}) | VERIFIED |
| 11 | Hosting integrity | diff vs council/inkling hosted copy | NOT RUN — no access to council/inkling's hosted copy or Desktop source | NOT RUN |
| 12 | Cutover-input | ahead/behind between root commits 474eb52 and 268fd56 | NOT RUN — not needed for this seat's verdict | NOT RUN |

Settles VL's earlier gate-manifest discrepancy: the FAIL was on a stale pre-final-state extract; final bytes PASS on both trees.

## 2 · TOOLS / w89 improvements (ranked top-5; IDEA | use case | cost | law sketch)

1. **@tanstack/svelte-table** | heavy tables — Awards leaderboard (44 keys), Stats ALL TEAMS (32 rows, sortable), YOUR STATS (position facet), PLAYOFF STATS (round filter). Board stays bespoke per Owner's word. | 1 dep, ~15 KB minified, zero engine touches | L15–L17 shell laws (sort honesty, 32-row render, playoff round split); falsifiers F23–F25 plant regular-season game into playoff filter → L17 dies
2. **@lucide/svelte** | award-card iconography (trophy/medal/shield), Team Select chrome, Settings — one source of truth vs Unicode arrows; offline, tree-shaken | 1 dep, ~1 KB/icon, zero engine touches | every icon has accessible name in a11y probe; no unlabeled icon button
3. **axe-core via Playwright** (test-time, zero product bytes) | a11y QA on Team Select/Board/Hub/Complete — catches unlabeled icon buttons, focus traps, aria-live misses that the existing probe misses | 0 product bytes, 1 dev dep | zero violations on the four-screen flow at rest
4. **Seeded screenshot goldens** (Playwright, zero new deps) | visual regression on every token/palette round — "did the board move 4px?" becomes a hard fail instead of eyeballs | 0 product bytes, ~8–10 pinned goldens | intentional changes re-pin themselves; accidental pixel drift fails battery
5. **Rosetta-chip inline glossary** | tap any term (gone% / priority / wins) → w89 Guide sentence verbatim with live number interpolated; zero new text | ~60 lines anchoring + tooltip component, zero deps | every chip resolves to non-empty Guide sentence; no chip is a dead end

Out of scope per Owner's constraints: drag-and-drop board, chart libs (no probability series exists yet), UI kits, PWA service worker, virtual scroll (~1.7k rows render <100 ms), Zod, Storybook, analytics.

## 3 · FRAMEWORK (Vue 3 vs Svelte 5)

**Vote + confidence:** Svelte 5 + Vite, 65%.

**Evidence:** read GPT's framework-ecosystem evaluation verbatim (`council/inkling:deliveries/framework-ecosystem-gpt-and-inkling-2026-11-19.md`) + Inkling's critique + both scaffold CLAUDE.md files. The Svelte scaffold mandates the MCP autofixer before any `.svelte` change lands (and it runs in this environment); the Vue scaffold cannot wire `vite-plugin-vue-mcp` (Vite-6 peer gate). The port boundary (`src/lib/port/seam.ts`) makes either framework one `ui/` rewrite behind the same engine truth — low-stakes either way.

**What would change my mind:** the Owner committing to dozens of screens with deep tables/dashboards requiring Pinia time-travel debugging or Vue Router nested routes — GPT's own contingency flips the ecosystem argument then.

**Reading of filed positions:** GPT's 60/40 Svelte ≈ Inkling's 70/30 ≈ Ernie's ~60/40 all lean Svelte. The Architect's LOW-confidence Vue rec ("agents maintain it with fewer defects") is speculative; the demonstrated Svelte MCP autofixer lane is the only one that actually works in this environment. Neutral-with-argument would be valid, but the tooling asymmetry is load-bearing at current scale.

WOULD CHANGE MY MIND: a written requirement for a screen that cannot be built in Svelte 5 (none exists today — all ten framework categories in GPT's record name screens buildable either way).