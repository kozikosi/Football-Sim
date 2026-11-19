SPEAKER: INKLING | ROLE: seat (MUSE delegation) — executing my own council prompt on this seat | TASK: the cakepanz-9-sitting notes — verification of the delivered 8.1 bytes, the use-case-grounded tool investigation, and my Vue 3 vs Svelte 5 opinion | DATE: 2026-11-19T02:45Z

All command receipts below are this session's (2026-11-19T01:20Z–02:45Z). The package is hosted on this branch at `_agents/inkling/67-cakepanz-8.1-2026-11-18/` (@ `5fb4989a`).

---

## 1 · Verifications (VERIFIED unless marked)

| # | Check | Command | Result |
|---|---|---|---|
| 1 | Hosting integrity | `diff -rq <Desktop source> <hosted copy> -x engine-node -x node_modules -x slice1-battery.json` | **exit 0**; hosted bytes == delivered bytes |
| 2 | Pins vs git archives | `git archive 5c808472 colors/src` / `… 65673a00 …` → `diff -rq … src/engine` vs both trees | **exit 0 / exit 0**; cross-deltas exactly `sim/game.ts` + `sim/passclass.ts` |
| 3 | Flex census | `node -e` census | **99 rules {"0":17,"2":17,"6":42,"12":23}**; SS>NICKEL 0 · FB>TE 2 · FB>RB 2 · C>OG 6 · OG>C 2 · QB>FS 12; sha `76c02c65…6a6a` |
| 4 | Engine suites | `npm run test:engine` (fresh `npm ci`) | **394/394 shipped · 406/406 prepared**, exit 0 (duration ≈ 40 s each) |
| 5 | Node batteries | `node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs` | **33/33 both trees**, exit 0 |
| 6 | Prepared numerals gate | `cd cakepanz-4-prepared && CP_PIN=65673a00 node scripts/gate-numerals.mjs` | **FAIL, exit 1 — "MERGE-GUIDE.md never names the CURRENT pin (65673a00)"** (three-seat finding confirmed a fourth time); default invocation CLEAN ×2 both trees |
| 7 | Cite-check prototest | hand-rolled sha/count scanner over `VERIFY.txt §22` vs `receipts/partH-c8-1/` | **14 unique hex tokens found; 9 absent from receipts** — 7 expected misses (correction-context/external refs: `4ca9a071`, `66096fb`, `596bd94f`, `bf3f393c`, `15b44104`, `3c0dfd3f`, `21d81b7b`); the 2 real gaps are `1b9bea5f…a5047` (FIX-RECEIPT hash) and `8ef3b18d…e381b48` (START hash) — quoted as measured but carried only as tabled values, never as raw `sha256sum` stdout — exactly pickle's L3. Values re-measure correctly (×3, cmp byte-identical, today). The prototest WORKS; it simply does not exist yet |
| 8 | gate-manifest, cakepanz-8 fresh extracts | `git archive` → scratch → `node scripts/gate-manifest.mjs` | **PASS (314) shipped · PASS (319) prepared**, exit 0 — VL's FAIL does not reproduce (his was a pre-final-state extract; the delivered bytes pass) |
| 9 | Snake probe | `node --experimental-strip-types` import of `snakeOrder()` from the shipped engine | **round 1 = 0..31 ascending; round 2 = exact reverse; round 3 = repeat; alternating snake confirmed** — matches the Owner's ruling ("this should be a snake draft"); the Architect still owns the ruling on the wire order |
| 10 | gh-pages vs fix | `git show origin/gh-pages:67-cakepanz/README.md` vs the fix zip | deployed names **`4ca9a071`**/52 files (checked live this morning); fix zip names **`d3bd81d2`** — the two-file fix is unplaced, and by the Owner's 2026-11-19 ruling it stays unplaced until cutover |
| 11 | Divergence | `git rev-list --left-right --count origin/council/base...origin/main` | **45 vs 13, zero merge-base** — the unrelated-histories cutover merge is genuinely unrelated histories; the Architect plans it for post-cutover |

NOT RUN (and why): the falsifier set (F13–F16/F17–F22) — receipts internally consistent, not re-executed (time); the m1 fresh-clone composite — accepted from receipts; the Desktop↔zip hash chain (the zip is on nobody's machine of ours; internal cross-checks all pass, which is circumstantial, not proof — the Owner can `shasum` the zip once and close it); the w89 live diff vs staging (offline machine behavior observed only).

**One honesty note while re-verifying:** the engine suites run 41 s and 43 s respectively on this machine under `node v26.13.0`; different machines may report the same numbers with different durations — numbers hold, durations don't transfer.

---

## 2 · The tools — use-case framed, ranked, with receipts named

House rules applied: w89 board and DRAFT button stay; offline; no CDN; NO tools for their own sake; zero new user-facing text beyond the w89/package inventory; every candidate costed and law-sketched; anything failing that bar is cut, not softened.

| # | Idea | Use case (who does what, when) | Cost | Law it must pass |
|---|---|---|---|---|
| 1 | **TanStack Svelte Table** for the awards/stats/playoff/your-stats heavy tables — column-visibility for the 44 STAT_KEYS, facets by team/position, Top-25/All toggle, paginate at 25 | the Awards/Stats/Bracket screens the Owner asked to make "heavy tables" (2026-11-19); a 1,696-row league leaderboard with full-session navigation on one screen | 1 dep, ~15 KB min; MIT | L15–L17 (ALL TEAMS 32 rows; champion row marked; sort honesty; zero console errors at 390 px) + falsifiers F23–F25 |
| 2 | **Seeded screenshot goldens (Playwright, zero deps)** — bundle id per seed; any screen state is a deterministic PNG diff | every future palette/token round (the gold2/light-AA split, the contrast ruling) currently costs eyeballs hours of "did the board move 4 px?" per round; with a fixed seed per fixture the battery fails hard on accidental drift | 0 deps; a battery extension | 8–10 pinned goldens vs seeded PRNG; deviation names the screen; re-pinning is one command |
| 3 | **`@lucide/svelte`** — a11y-labelled trophy/shield/medal/whistle iconography on the awards page, Team Select, Settings | today's iconography is Unicode text and a stray arrow glyph; the champion ceremony is the product's emotional peak — it deserves one icon set, labelled, offline, tree-shaken | 1 dep, ~2 KB/icon; MIT | every icon renders with an accessible name; 390 px athlete size unchanged |
| 4 | **`html-to-image` (or plain canvas)** — the "run so far" 1080×1350 PNG card for the share export | the share screen's one job; the card is one div and ~150 lines; html-to-image costs 1 dep, canvas costs zero — tie goes to html-to-image when the card is showpiece-worthy, canvas when the card is data-tabular. The record already supplies all three values (best steal / the gasp / the SB-winning pick) | 1 dep vs canvas; both ≤ 6 KB | card renders at exactly the record's parity; the three values equal the VM's; reduced-motion honored |
| 5 | **Seeded reconstructed "watch the draft back" cinematic at Complete/Book** (pure CSS + VM, zero deps) | after the title, the user owns a championship run and has no way to see it again; today completes and pivots — the replay extends the 30–60 s cinematic grammar to the product's single best artifact | ~120 lines, 0 deps | replay completes or skip honoured; zero page errors; the champion card renders the correct picked order |

**Challenged and cut (with reasons):** ECharts/Unovis for charts — the awards/standings/leaders data exists, so a bar chart IS buildable; but for the one or two views it buys, ~80 KB of wrapper for a competitor a 120-line inline SVG matches exactly — cut until the Architect emits a per-week series (then Unovis earns its keep); PWA service worker — the Owner must rule it (offline = saves replay, a service worker risks stale-cache incidents; it is explicitly his lane, mine is flag only); virtual scroll — 1,696 tiny rows render <100 ms; Zod — the envelope already validates at load by construction; Storybook, analytics, drag-and-drop (his word stands); UI kits (identity wins); `lz-string` — keep it as "maybe later for save envelopes", it is not a today need while the replay design works.

**Process takeaway:** the Table lib (1), the goldens (2), and the icons (3) should enter cakepanz-10 on the back of the stats brief the Owner approved — nothing else should ride until he rules the six open questions in it.

---

## 3 · Vue 3 vs Svelte 5 — my opinion

**Vote: Svelte 5 + Vite. Confidence 68%.**

- **My evidence** (mine, run this session on the v3 arms in this repo and both scaffolds over the GitHub API): the v3 arms build green and pass 5/5 everywhere; arm-svelte dist 108 KB vs arm-vue 132 KB; the shape-change indicator ("one file?") does not discriminate (9/9 yes); `arm-nginx`/`arm-solidstart` misses were diagnostics of the stacks, not the frameworks; GPT read both manifests correctly (Vue ships Pinia/VueUse/TanStack-Vue-Table pre-installed; Svelte ships none of it), and the Vue scaffold prohibits `vite-plugin-vue-mcp` at its Vite-6 peer gate, while the Svelte scaffold mandates the MCP autofixer — the tooling lane in this repo is Svelte's by fiat today.
- **Honest counterweights held in mind:** GPT's 60/40 Svelte call (reweighted by me to 70/30 before breaking his down into why: his scores AST are ecosystem state, not product fitness); GPT's full brief (Appendix A in `deliveries/framework-ecosystem-gpt-and-inkling-2026-11-19.md`) is consistent research — most of its weight buys nothing here (Pinia wraps a working engine store; the port boundary makes migration affordable; the two frameworks have no product-shaped winner anywhere in the matrix).
- **Where I diverge from GPT:** he scores ecosystems; I score the port boundary, the verified 1,500-line Svelte shell (five review seats, byte-pinned, battery-backed), and the agent-tooling asymmetry — all Svelte-side. Where he is right: Vue's Pinia timeline debugging is the one genuinely nice Vue aesthetic; if the Architect would rather maintain `colors/` in Vue day-to-day (his memo says he leans Vue LOW-confidence), maintainer fluency is a legitimate vote he owns.
- **What would change my mind:** a Block C result showing svelte-specific friction vs the Vue arm on the actual Colors v1 screens (measured, not narrated); or a sustained failure rate of silently-broken edits by the agent stack in the Svelte tree that Vue's setup-store discipline prevents (if receipts show it, I flip instantly); or a product pivot to deep routing/accounts/dashboards of the size the ecosystem case targets.
- **My read of the two filed positions:** the Architect's LOW-confidence Vue recommendation (agent-maintenance argument) is honest and best-arguable, but its empirical leg — agent maintainability — has no measurement attached anywhere in the record; GPT's 60/40 Svelte is the best-supported single read I've seen, and adding my 68/32 distribution skillfully means I think there's a ~30% chance Vue is the better call for a years-out, heavily-interactive product — but that future isn't 76 Pancakes v1, and v1 can reverse the decision cheaply.

Neutral-with-argument, if the Owner wants it as the formal outcome, is defensible — but it costs him a ruling that could instead ship the product; Svelte stands unblocked while he rules deliberately.

---

WOULD CHANGE MY MIND: a measured Block C result on a sealed Colors v1 slice (uniform board or the Complete flow) naming svelte-specific friction that Vue avoids; or owner rulings that treat the port as the intended swap mechanism.
