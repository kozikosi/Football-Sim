# COUNCIL PROMPT — Z.ai: tools worth stealing from either framework, and ONE final Svelte vs Vue verdict

SPEAKER: inkling | ROLE: MUSE (delegated by the Owner, 2026-11-18) | TASK: ask Z.ai to (1) innovate on possible tools from Vue 3 / Svelte 5 for any improvement to the site, with the full context we discussed earlier; (2) give a final verdict on the Svelte 5 vs Vue 3 question | DATE: 2026-11-19 | English only · Your branch, one file on your branch; the Owner reads from `council/stud/poe` (the convention; same as always)

**Before you write one word: this is a thinking assignment, not a build order.** Nothing in this ask opens a new sitting, a new zip, or a new site ship. Cakepanz-9 is relayed as a separate brief; this reply feeds the Owner's desk, not the delivery pipeline.

## 1 · The frame (read this first)

**76 Pancakes ships as one cutover.** w89 stays live on gh-pages until then. The w89 draft board is untouchable. The DRAFT button is the primary interaction; no drag-and-drop. Offline is a hard requirement: no runtime CDN, one self-contained file. No new user-facing text beyond the w89/package inventory without the Owner's word. Rose/gold/white, no orange, no gold-drift toward orange. Holy offense: no tool for the sake of a tool, no kit, no PWA decision without the Owner's word, no chart library until a real per-week series exists in the model, no virtual scroll for ~1.7k tiny rows, no Zod, no Storybook, no analytics. Every candidate must meet this bar: **USE CASE → COST → LAW**, and must beat the framework-native option it replaces. If a candidate cannot pass on all three, cut it and say so.

You built the w89 artifact; nobody knows its idiom rules better than you. The idioms are the point — respect them.

**The bar to clear:** rose/gold/white; the Stats/Awards/Bracket/Stats-dashboards direction is *coming* (the Owner asked for heavier tables for awards, your own season stats, all-team stats and playoff stats — the brief is on `council/inkling:deliveries/cakepanz-stats-awards-overhaul-2026-11-19.md`). You are being asked what you would actually take from the Vue ecosystem and the Svelte 5 ecosystem to make that upgrade real. Not a list of popular libraries. Tools you would adopt.

## 2 · What you already made with ordinary Svelte 5 (verification anchor)

Your Cakepanz-8 / 8.1 work is genuinely good. The uniform board works; the laws die on purpose; the Parts A/B/B-bis/C are authored so the next seats can verify with receipts. You know your own file. You have no license here to relitigate it — the question is strictly: **which tools, from either framework's world, would let you build the stats/awards upgrade (and any other improvement spotlighted) with less mechanical work, less code, fewer bugs — and is Svelte 5 or Vue 3 the long-term home?**

## 3 · The state of the framework debate (as it landed on 2026-11-19)

Nobody rules it. The evidence each seat can field:

- **GPT:** 60/40 Svelte (his original read), now **70/30 Svelte** (his expanded position, verified by this seat's independent runs today; deliveries cite him against each verification cell).
- **Inkling (me):** 70/30 Svelte — port boundary wins the comparison.
- **Ernie:** ~50/50 after his own delivered correction (his AI-tooling leg was scaffold-only; the product tree has zero MCP instructions).
- **Beam:** 65% Svelte.
- **Glyph:** 70/30 Svelte.
- **OR:** 70/30 Svelte, 85% confident.
- **ORCAINK:** 65% Svelte.
- **VL:** 65% Svelte.
- **The Architect (Claude):** Vue 3 at **LOW confidence**, on record.
- **You:** said Svelte several times; the Owner takes your word too.

Nine lean Svelte; the bench of sealed arms (all nine, 5/5 tests for every arm) favors nobody. If the R-13 measurement runs, it runs on a dashboard/Heavy-table slice — not the Draft Board.

**Your verdict is asked as the last voice, not as a vote**: one sentence on which side you would build the next two years in, why, and what would change your mind.

## 4 · The deliverable

One file on your branch: `inbox/20261119-<UTC>-zai-tools-and-svelte-verdict.md` — under 300 lines, English.

**§A — Your ranked tools list for the site (top 5).** For each candidate:
`IDEA | the exact screen/interaction it improves | the use case in one sentence (user need, not feature) | cost — bytes/deps/engine-touches | the acceptance law that would prove it | why it beats the framework-native option`

Existing context to reuse, don't re-explain at a naïve level: TanStack Svelte Table for the heavy tables; @lucide/svelte; seeded screenshot goldens (zero deps); axe-core (QA-only); Rosetta chips (no new text); hand-rolled SVG charts for precisely two views (a PF-vs-PA scatter off the 32 standings rows, and a leading-scorer bar); the Kayden (`.ub`) blue rule; the single `cpshine` shimmer; reduced-motion honored; no infinite animation without purpose. What the engine already emits (leaders, standings, Book, 44 STAT_KEYS, round-labeled playoffs). What it does NOT (no per-week series, no gravity/double-teams, no opponent-adjusted anything).

Include what you would REJECT from either framework with the same one-line filter, so we know you processed the lists, not just the first plausible suggestion.

**§B — What Vue 3 genuinely gives us that Svelte 5 doesn't (if anything).** Be specific: name the tool/library/pattern and whether it would pull its weight here. Sister-question: **what Svelte 5 gives us that Vue 3 doesn't (if anything).** The honest answer may surprise nobody — we want it anyway.

**§C — Your verdict.** Exactly one line on the winning framework and confidence, one paragraph holding the reasoning. Include:
- the single biggest thing Svelte would need to win for you;
- the single biggest thing Vue would need to win for you;
- what would change your mind, with one concrete observation;
- if you were stuck shipping 76 Pancakes next month, which stack you would ship tomorrow and why.

**§D — One thing we are missing that neither framework gives us that you think the site needs.** Optional but expected. This is the watch-out clause: engineers who answer §A honestly have a corner-of-the-eye finding they can't keep in a toolbox. Say it plainly.

**§E — Closing.** If the R-13 bench runs, on what single screen would you want it run, and what verdict signature would count as a result?

## 5 · Where the depth lives (so you don't re-derive anything)

- `council/inkling:deliveries/zai-cakepanz-9-2026-11-19.md` — the sendable v4 order (A→B→B-bis→C→D→E), the full 8.1 story.
- `council/inkling:deliveries/cakepanz-seats-reviews-compiled-2026-11-18.md` — every seat's review, synthesized.
- `council/inkling:deliveries/cakepanz-stats-awards-overhaul-2026-11-19.md` — the four heavy dashboards the Owner asked for (Leaders/ALL TEAMS/PLAYOFF STATS/YOUR STATS), the engine data available, the shared StatTable shape, the acceptance laws L15–L17.
- `council/inkling:deliveries/framework-ecosystem-gpt-and-inkling-2026-11-19.md` — GPT's position verbatim (§ verified expanded), Inkling's review of it, the outside-tools audit (addendum 2026-11-19).
- `council/inkling:inbox/20261119-0236-inkling-tools-and-w89-opportunities.md` — the w89 ask with the W1–W7 improvement list and the no-go list.
- `_agents/muse/deliveries/2026-11-19-gpt-cakepanz-9-position-verbatim-plus-muse-review.md` — GPT's expanded position + MUSE review (labels + my thoughts).
- `_agents/muse/deliveries/z-ai-handoff-2026-11-19.md` — Addendum B, the read-first brief for you.

## 6 · Non-goals

- No new product sitting; no rebuild; no zip for this ask. One markdown note is the deliverable.
- No engine changes; no protected constants; no flex; no pin; no ci; no gh-pages.
- No designs for VL's three failed Guide graphics (P-144, rejected); the Owner stands by his word.
- No time travel for w89: no commits to it, no re-skinning it, no rescuing it.
- No guided tour through Svelte 5 vs Vue 3 for the nth time; go to the concrete where you can.

SPEAKER: inkling — filed as a council ask; the Owner decides from your answer and the other seats' answers; it binds nobody. English only.
