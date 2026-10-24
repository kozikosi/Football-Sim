# FK — execution package: brainstormed interactivity/beauty ideas (2026-10-24)

**Status:** submitted for Architect integration. **No product file was edited** (council seats do not edit `Football-Sim-*.html`; `AGENTS.md` §3/§5).
**Base build:** Pre-Colors `Football-Sim-PreColors.html`, sha256 `40233d6be00e987c…`.

## Ordered execution plan (first slice = Owner/Claude decision pending)

### Slice 1 — Draft board delight (ideas B + C + 1)
- Pick slide-in from right + pick flash + team-colored confetti (P7-2/P7-5). CSS-only. Anchors: `#draftTable2` rows / `.pcard` / `.prow` (CSS l.259-272; render l.1667+).
- Player detail slide-over (idea 1): new panel keyed `fbDrawer`; wire to existing `data-pick` / `data-slot` / `data-chg` handlers; mobile = bottom sheet.
- Draft clock ring (idea 2): conic-gradient ring on pick indicator; slow-mode clock source (`draftSpeed`).
- Keyboard draft controls (idea 3): arrows/Enter/digits; respect `draftUI` state.

### Slice 2 — Weight → rankings live animation (idea A / "weight live projection")
- Anchors: `input[id^="w_"][data-slot]` (l.542), `modelWBtn`/`personalWBtn`/`refresh` (l.548-563).
- Animated live update of team rankings / priority bars when a personal weight changes.

### Slice 3 — Recap/season beauty (idea E + 10)
- Animated quarter-by-quarter score bars; awards gold incl. game-ball; Super Bowl banner gold shimmer + >=3 s hold (P7-8/P0-19).
- Hype mode toggle (idea 8): motion+type scale for banner/copy; single helper for hype text.

### Slice 4 — Extended creative batch (fresh ideas)
- Defensive-sub diagram (Guide); what-if weight sensitivity (INFERED; needs injectable RNG); war-room mode; stadium hero; awards podium; trajectory sparkline; scoring sequence animation.

## Readiness for Claude (updated 2026-10-24, after concept render)

| Idea | Status | Blocker |
|---|---|---|
| B. Pick slide-in + confetti + flash | READY | none |
| C. Player drawer + Draft CTA | READY | none (mobile = bottom sheet accepted as planned) |
| A. Weight live animation | READY | none |
| E. QoE bars + gold awards/game-ball | READY | none |
| 8. Hype mode toggle | PENDING OWNER DECISION | toggle scope |
| 2. Draft clock ring | READY | none |
| 3. Keyboard draft controls | READY | none |
| Fresh batch 16-23 | PENDING | injectable RNG for sensitivity; others ready |

**Answer to "ready for Claude?":** Slices 1-3 core ideas are ready; hype toggle and fresh-batch items are not fully ready yet.

## Per-idea exact change + blast radius
| Idea | WHERE (anchor) | old→new | WHY | SAFE ALONE? | HOW TO CHECK |
|---|---|---|---|---|---|
| B. Pick slide-in/confetti/flash | CSS `#draftTable2`/`.pcard`, pick handler | add keyframes + class | delight, no math | yes | lint + smoke + 390 px |
| C. Player drawer | new `fbDrawer` panel + card click | new panel | UX depth | yes | node --check + gate |
| A. Weight live animation | `w_*` inputs + `refresh` | CSS/JS transition | proves instant-weights gate visibly | yes | smoke |
| E. QoE bars + gold | recap render | new bars/gold | beauty | yes | smoke |
| 16-23. Fresh batch | per-item anchors above | per-item | novelty | mostly yes | per-item |

## Blocked on Owner/Claude decisions (not product edits)
- Audio on/off default; hype mode toggle scope; drawer mobile behavior.
- Injectable RNG before any seeded before/after number comparison (T-20261022-claude-2).

## Receipts required before integration
- `node --check` on extracted script; `node tools/lint.mjs product Football-Sim-PreColors.html`; `tools/post-merge-smoke.mjs`; 390 px check; seeded before/after where numbers move.
