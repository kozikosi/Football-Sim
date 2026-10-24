# Beam — V23 Aesthetics Code Proposals Index

**Status:** advisory proposal. No product edits. For Claude (Architect) to review and implement.
**Companions:** Three proposal files below.

---

## Proposal Files

| File | Proposals | Lines | Commit |
|------|-----------|-------|--------|
| `_agents/beam/notes/proposals/V23-aesthetics-code-proposal.md` | 1–8 | 586 | 8b3ae133 |
| `_agents/beam/notes/proposals/V23-aesthetics-code-proposal-2.md` | 9–16 | 469 | 00eddfb8 |
| `_agents/beam/notes/proposals/V23-aesthetics-code-proposal-3.md` | 17–25 | 670 | 043d774e |

**Total: 25 concrete CSS/JS proposals covering the full brainstorm.**

---

## All 25 Proposals

| # | Name | Type | Effort | Impact |
|---|------|------|--------|--------|
| 1 | Team color theming (CSS vars + JS) | CSS+JS | Medium | Highest |
| 2 | Championship banner + confetti | CSS+JS | Low | High |
| 3 | Tab transitions (fadeIn) | CSS-only | Low | High |
| 4 | Heat map calendar (17-week grid) | CSS+JS | Low | High |
| 5 | Player card flip (3D CSS) | CSS+JS | Medium | High |
| 6 | Toast notifications | CSS+JS | Medium | High |
| 7 | Dark/light mode toggle | CSS+JS | Medium | Medium |
| 8 | Micro-interactions (press, hover, focus, counters, pulse) | CSS+JS | Low | Medium |
| 9 | Score bug (live game ticker) | CSS+JS | Medium | High |
| 10 | Play-by-play ticker | CSS+JS | Low | High |
| 11 | Heat map calendar with legend | CSS+JS | Low | High |
| 12 | Achievement badges (8 unlockable) | CSS+JS | Medium | High |
| 13 | Loading skeletons | CSS+JS | Low | Medium |
| 14 | Mobile bottom nav | CSS+JS | Medium | Medium |
| 15 | Print/export (CSS + CSV export) | CSS+JS | Low | Low |
| 16 | Opponent color in matchup preview | CSS+JS | Medium | High |
| 17 | Trophy case page (10 unlockable trophies) | CSS+JS | Medium | Medium |
| 18 | Championship ring ceremony (team-colored) | CSS+JS | Low | Medium |
| 19 | Leaderboard podium (visual 1st/2nd/3rd) | CSS+JS | Medium | Medium |
| 20 | Weather overlay effects (rain/snow/fog) | CSS+JS | Medium | Medium |
| 21 | Field graphic (SVG with yard lines, ball, play arrows) | CSS+JS | Medium | High |
| 22 | Animated season ticker (scrolling marquee) | CSS+JS | Low | Low |
| 23 | Sticky sub-header (collapses on scroll) | CSS+JS | Low | Medium |
| 24 | Dynamic favicon (team-colored canvas circle) | JS | Low | Low |
| 25 | Ring ceremony (expanded with team-colored graphics) | CSS+JS | Low | Low |

---

## Prerequisites

1. **TEAM_COLORS data** — Extract `brand.primary` and `brand.secondary` from `figma/team-colours.json` into a JS object. 32 teams. See Proposal 1 §Prerequisite.
2. **Team color verification** — `figma/team-colours.json` verified structurally (32 teams, valid hex, fill==primary, edge==stripe). 1 contrast failure (Chargers), 4 stripe mismatches (Denver, Houston, Pittsburgh, New Orleans), 3 duplicate primaries (normal NFL). Source is REPORTED (GPT table, Owner-supplied), not VERIFIED against NFL brand guides. See `_agents/beam/notes/colour-registry-verification.md`.

---

## Implementation Priority (recommended order)

1. Team color theming (CSS + JS) — highest visual impact, data already in `figma/team-colours.json`
2. Championship banner + confetti — already proposed, just needs wiring
3. Tab transitions (CSS-only) — low risk, instant polish
4. Heat map calendar — simple CSS grid, high info density
5. Player card flip — high engagement, moderate effort
6. Toast notifications — moderate effort, high value
7. Dark/light mode toggle — tokens exist, just needs switch + persistence
8. Micro-interactions (button press, hover lift, focus rings) — CSS-only polish
9. Score bug + play-by-play ticker — high value for game day feel
10. Achievement badges — high engagement, moderate effort
11. Loading skeletons — low effort, better UX
12. Mobile bottom nav — moderate effort, mobile UX improvement
13. Opponent color in matchup preview — moderate effort, high visual impact
14. Weather overlay effects — moderate effort, high atmosphere
15. Field graphic (SVG) — moderate effort, high visual impact
16. Leaderboard podium — moderate effort, high engagement
17. Animated season ticker — low effort, nice-to-have
18. Sticky sub-header — low effort, nice-to-have
19. Dynamic favicon — low effort, nice touch
20. Ring ceremony — low priority, post-Super Bowl only
21. Trophy case page — low priority, post-season
22. Print/export — low priority, nice-to-have
23. Audio — lowest priority, optional

---

## Notes for Claude (Architect)

- All CSS uses existing CSS variables (`--accent`, `--team-primary`, etc.) — no new color literals except team colors from `figma/team-colours.json`
- All JS is vanilla — no framework dependencies
- `prefers-reduced-motion` is respected in all animations
- Team colors are REPORTED (from GPT table, Owner-supplied) — not VERIFIED against NFL brand guides
- Chargers letter contrast fails 4.5:1 (4.48) — flag for Architect decision
- 4 stripe mismatches (Denver, Houston, Pittsburgh, New Orleans) — flag for Architect decision
- No product file edits made — this is a proposal for review
- Proposal 1 (team-color-theming.md) covers the full 32-team table and mermaid diagram
- Proposal 2 (V23-aesthetics-code-proposal.md) adds 8 proposals with code
- Proposal 3 (V23-aesthetics-code-proposal-2.md) adds 8 more proposals with code
- Proposal 4 (V23-aesthetics-code-proposal-3.md) adds 8 more proposals with code
- Combined, these 4 proposals cover the full brainstorm (25 items)

**Label:** VERIFIED (CSS/JS syntax, variable names, animation patterns). REPORTED (team color values from GPT table). INFERRED (visual impact estimates). UNKNOWN (whether contrast/stripe issues are intentional design choices).
