# FK — creative brainstorm: interactivity + beauty (2026-10-24)

**Status:** brainstorming only. No product edit. Proposal format per `AGENTS.md` §5 (target build + WHERE + old→new + WHY + SAFE ALONE? + HOW TO CHECK).
**Base build:** Pre-Colors `Football-Sim-PreColors.html`, sha256 `40233d6be00e987c…` (VERIFIED by earlier receipts; re-measure before relying).

## Inputs reviewed
- V22-Suggestions.md "word orders": the Owner's words are the source of truth; the section only *orders* them and names the slice each seat owns; the round rule — **one sentence says it, the rest is graphic**. Copy passes = step 5 of the dependency order, "the most words, the least risk". Fix lists ordered by Owner severity/impact (P0-18 recap wording, P0-19 season review, P0-33 Guide overhaul).
- `_agents/QUEUE.md` items 1-10 (top: P0-20 draft-complete gate, position dropdown alignment, RNG inventory, shared-tree snapshot, header/DRAFT hero, Beam's 25 aesthetic proposals, "Value here" inventory, 4th-down copy, Ultra hash re-measure, DS lane trim).

## Brainstormed creative directions (grouped by surface)

### Draft board (`renderDraftBoard2`, `draftTable2`, `draftCards`, chips)
1. **Player detail slide-over (drawer)** — click a row/card -> slide-over panel: big OVR, flex note, "best fit" alternatives, priority bar, one big Draft button; mobile = bottom sheet. Anchors: existing card handlers (`data-pick`) + new panel. SAFE ALONE? yes.
2. **Draft clock ring** — CSS conic-gradient ring around pick indicator showing clock left in slow mode; tick sound via WebAudio oscillator (no asset).
3. **Keyboard draft controls** — arrows move pick cursor, Enter drafts, digits pick slot. Cheap, big UX.
4. **Momentum readout** — after each user pick, one line: roster now projects X wins. Derived from `winsAt`; structural only.

### Micro-interactions / motion
5. **Full motion system**: page/tab fade, card hover lift, pick slide-in from right, badge pop, weight-counter count-up, save-weights pulse; prefers-reduced-motion respected.
6. **Confetti team-colored burst** on user pick (P7-5) — CSS particles + `--team-*`.
7. **Dark-mode polish** (P7-4): softer panels, gradient header, glass dropdowns, styled scrollbar.
8. **Hype/Broadcast mode toggle** — Owner-approved phrasing ("Super Bowl champions!", gold shimmer) implemented as a motion+type scale toggle instead of rewriting copy everywhere. Reversible, technical.
9. **Typography fade-in for recaps** (Owner: "maybe can fade into the page").

### Season / recap / playoffs
10. **Graphical season review**: quarter-by-quarter score bars (team colors, animated), conference charts -> March Madness-style animated bracket, awards gold incl. game-ball winner (P0-19), Super Bowl banner gold shimmer + >=3 s hold + centered (P7-8).
11. **Story mode** for 100-season report: narrative paragraphs instead of raw table? (Owner: "a few sentences here and there" - P7-10).
12. **Bye week / playoff preview click-to-reveal** ("What separated the playoff teams" left but click-only) - keep copy, add interaction.

### Stats / compare / browser
13. **Player browser radar chart** (canvas, no CDN) per player; hover axis -> highlight; compare two players side-by-side.
14. **Live weight->rankings coupling** surfaced: weight slider animates projected team rankings change instantly (owner: "weights change Team Rankings instantly" is already a gate; make it visible).
15. **Position rankings bars animate width on load**.

### Creative (not in V22)
16. **Stadium atmosphere**: subtle team-color glow / gradient background on draft tab keyed to selected team; user's team in blue (`.ub`) already fixed.
17. **Draft results: "championship timeline"** - small animated strip of playoff rounds the user's team went through.
18. **Audio**: WebAudio tick/chant; toggle in settings. No asset needed.
19. **Empty-state delight**: no players match -> friendly empty state with reset filters.
20. **Guide**: interactive terminology tooltip/inline glossary popover + color-coded section headers with decorative underlines (P0-33 adjacent).

## Fresh brainstorm batch (2026-10-24, response to user sweep)
User asked: are all queue tasks done; more interactivity/beauty ideas?

Queue status (read-only this session): items 1-10 still listed open in `_agents/QUEUE.md`; `tasks/` registry shows Claude's V23 items (T-20261022-claude-1..4, T-20261023-claude-1..3) as `accepted` (not verified / not implemented); no live claim files found. Beam's P0-20 proposal posted 24 Oct; OR posted two entries.

New creative ideas beyond the first batch:
- **Animated defensive-substitution diagram** (D-012 follow-up): pick base 3-4/4-3 on Guide -> animated slot fill (DT2->ILB2 etc.) with colors per side. High delight, ties Owner ruling.
- **"What-if" weight sensitivity view**: slider changes -> instant re-draft comparison (draft class fragility). Flagged INFERRED for publishing outcomes; interactive demo only until injectable RNG lands (T-20261022-claude-2).
- **War-room drafting mode**: full-screen, team-color-cycled board, bigger hit targets, reduced chrome for the pick moment. Toggle persisted in draftUI.
- **Homepage/stadium hero**: CSS-only animated gradient in selected team colors + pulsing Draft CTA; starfield optional.
- **Awards podium/gold progression animation** incl. game-ball trail.
- **Leaderboard: personal season trajectory sparkline** (your rank across the 100 runs).
- **Scoring animation**: animate scoring events (rush TD, INT, FG) as a sequence strip in recap.

## Ideas I would champion first (cheap, high delight, low risk)
- A. Weight slider -> animated live ranking movement (proves the instant-weights gate beautifully).
- B. Draft pick slide-in + team-colored confetti + pick flash (P7-2/P7-5) - pure CSS, no data.
- C. Player drawer with Draft CTA (replaces tiny inline button).
- D. Hype mode toggle for banners/copy scale (Owner's exact ask, minimal rewrite).
- E. Animated quarter-by-quarter score bars + gold awards/game-ball.

## Plug-in ergonomics for Claude's V23 design (the Owner's ask: make it easy to plug in)
Design constraints that keep every brainstormed idea Claude-pluggable into the single-file V23 build without rework:
1. **CSS**: new visuals must key off existing vars (`--bg`, `--panel`, `--panel2`, `--border`, `--sub`, `--good`, `--bad`, `--gold`, `--accent`, `--accent2`) or add new `--*` vars in `:root` only (never touch protected constants). Team colors already being introduced via `TEAM_COLORS` (P7-1/P8-5) should feed new `--team-*` vars so drawer/confetti/hype code reads them, not hardcodes.
2. **JS**: vanilla JS only, no libraries (product: no CDN, no build step). Prefer CSS transitions/animations + Web Animations API or CSS keyframes; keep JS additions inside existing IIFE/section patterns (`renderDraftBoard2`, `boardEntries`, event hooks `data-pick`/`data-slot`/`data-chg`) so Claude wires into current listeners rather than rewriting renderers.
3. **Markup**: new panels should reuse existing classes (`panel`, `narr`, `chip`, `badge`, `toptag`, `pr-row`, `pr-bar`, `cardgrid`, `pcard`, `prow`) and get new ids/keys prefixed `fb` (e.g. `fbDrawer`) to avoid collisions; no new CSS framework.
4. **Copy**: any hype/banner text should be injected through one helper (e.g. `hypeText(...)`) or CSS content so Claude edits one place, not scattered strings.
5. **Accessibility**: prefers-reduced-motion respected; keyboard-operable (arrow/enter) built in from the start so it is not retrofitted.

## Proposed first implementation slice (Claude, when Owner accepts)
A->E from "Ideas I would champion first" as pure additive CSS/JS on Pre-Colors: weight-slider live projection animation; pick slide-in + confetti + flash; player drawer w/ Draft CTA; hype toggle; animated QoE/score bars. Receipts: `node tools/lint.mjs product Football-Sim-PreColors.html`, `node --check` on extracted script, `tools/post-merge-smoke.mjs`, 390 px check.
