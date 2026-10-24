# VL submission: V23 visualizations & interactivity plug-in blocks

**Seat:** VL (council adviser, standby) · **ID block:** S-2000–2099 · **Date:** 2026-10-24
**Submission type:** exact proposal (advisory only — product file untouched; Claude/Architect implements if accepted)
**Reference code:** `_agents/vl/deliveries/interactive-prototype.html` + `_agents/vl/deliveries/design-tokens.css`

---

## Target build
`Football-Sim-PreColors.html`, sha256 `40233d6be00e987c…` (657,486 B) — the current verified build (AGENTS.md §2). Blocks are additive and hash-safe.

## Source items (V22 work order, Owner-feedback wave 2)
- P0-18 — Game recap UI/text improvements (graphical score boxes, "x Sacked", clutch/star/hype sentence exceptions)
- P0-19 — Season review / playoff preview UI improvements (champion banner ≥3s centered + shimmer, March Madness bracket, conference charts 1–16, graphical awards incl. game-ball winner in gold)
- P0-29 — Expanded team-color theming (user + opponent colors across draft board, matchup panels, score boxes, charts, bracket)
- P7-1/14 — Team-color theming (`--team-*`, `--opp-*` CSS vars from a 32-team palette)
- P7-2 — Micro-interactions (hover lift, slide-in picks, badge pop, counter roll-up)
- P7-4 — Dark-mode polish (softer panels, secondary-text contrast, header gradient, glass modals, accent scrollbar)
- P7-5 — Draft pick feedback (green flash, confetti, animated starters counter)
- P7-8/9 — Champion banner gold shimmer + motion of graphics/text
- P8-graphics (shared) — stat card (OVR tier color + +/- bar), bar row (proportional yards), two-column pair (unit meters), gold banner
- P8-g.1 — Game preview (team tags, matchup advantage meter, 3 matchup cards)
- P8-g.3 — Game review (quarter bars, turnover grid, star carousel, game-ball pulse)
- P8-g.4 — Season review (record banner count-up, sparkline, awards carousel, trend indicators)
- P8-g.5 — 100-season review (correlation meter, award histogram, skill-vs-luck bars)
- P8-g.6 — Playoff bracket + conference charts
- P8-g.7 — Star/ball presentation (game-ball showpiece, star badges, award unlock badges)

Plus VL creative extensions: live "what-if" win-projection slider (ties to P0-15 philosophy editable all season), click-to-expand week timeline, animated game-ball ceremony, achievement system (replay incentive), coach rating grade reveal, personal records shelf, trophy case.

---

## WHERE (anchor strings / insertion points)
All insertions are additive — no existing line is changed, so no anchor collision risk.

1. **Product `<style>`** — insert the `:root` token block first (team/opp palette vars, motion vars, OVR tier vars, achievement vars, plus all `.stat-card`, `.bar-row`, `.two-col`, `.gold-banner`, `.qtr-bars`, `.turnover-grid`, `.star-card`, `.game-ball`, `.record-banner`, `.sparkline`, `.award-card`, `.bracket`/`.round`/`.team-seed`, `.conf-charts`/`.rank-row`, `.score-box`, `.player-card`, `.combo-chip`, `.compare-pair`, `.ach-card`, `.ach-toast`, `.grade-card`, `.records-shelf`, `.trophy-case` rules, plus all `@keyframes`).

2. **Product `<script>`** — insert tiny vanilla-JS helpers only: `setTeam(...)` (sets `--team-*`/`--opp-*` on team select & matchup load), `unlockAch(slug, trigger)` (achievement toast), counter animator for `.records-shelf .count`, trophy shaker for `.trophy.caught`. Wire to existing hooks only: `data-pick` (draft rows), game-end (season/playoff), team-select, matchup-load. No new framework, no CDN, no library.

**old → new:** Additive only. `:root` gains new `--*` vars; new CSS classes added; new JS helper functions added. Zero existing lines modified → `git diff` shows only insertions.

---

## WHY
Owner directive (V22 work order, 22 Oct): "most of this data can be represented by graphics instead of sentences… only the clutch narration, the star praise and the next-round hype need sentences." Team identity should permeate the whole sim (P0-29 / P7-1). Replay incentives keep the user playing (achievement system, records shelf, trophy case). All items are cosmetic/UI only — the simulation math is untouched.

---

## SAFE ALONE?
**YES.** Cosmetic/UI only:
- No protected constants touched (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS` unchanged).
- `modelWeights() = f(slotWinsPerOvr())` invariant preserved (no math change).
- V22 P8-graphics items are explicitly marked SAFE ALONE in the work order.
- All motion gated on `prefers-reduced-motion`.
- No paid API, no CDN, no build step; single file preserved.

---

## HOW TO CHECK (command + expected output)
1. `node tools/lint.mjs product Football-Sim-PreColors.html` → exit 0 (no new lint errors; baseline unchanged).
2. `node --check` on the extracted `<script>` block → exit 0.
3. `tools/post-merge-smoke.mjs` → exit 0 (32 team scores + board rows match verified build).
4. `tests/e2e-smoke.mjs` at 390 px → exit 0, 0 horizontal overflow, 0 console errors.
5. `sha256sum Football-Sim-PreColors.html` → `40233d6be00e987c…` unchanged (additive only).
6. Seeded A/B: with the fixed-seed `Math.random` shim, drive draft→season→playoffs before/after; 32 team scores and their order must be **identical** (proves visuals don't move the model).

---

## Deliverables (in this lane, pushed to `council/vl`)
- `_agents/vl/deliveries/interactive-prototype.html` — self-contained reference; every section carries a `<!-- BLOCK: <item> -->` key so Claude can copy-paste each block directly into V23.
- `_agents/vl/deliveries/design-tokens.css` — standalone `:root` + component token CSS (P7/P8 graphics round).
- `_agents/vl/deliveries/PLUGIN-KIT.md` — block index mapping each V22 item → code block → where to plug in V23.
- `_agents/vl/VL.md` — lane file (this submission).

---

## Review requested
Claude (Architect): review the blocks, accept/defer/reject per-item, and implement accepted ones into V23 (`Football-Sim-V23.html`). No product file was modified by VL; this is a proposal only.
