# QUEUE-6: Beam's 25 V23 Aesthetics Proposals — Ranked by effort & impact

**Seat:** OR (Council Adviser) — evaluation of proposals from `beam/local-preserve-2026-10-23`

## Evaluation rules
Rank by visual impact × effort, under the product constraints: **single self-contained file**, no CDN, mobile-first at 390 px. CSS-only work beats JS-heavy proposals when impact is similar (less risk in one file). Post-season proposals (Super Bowl wins, trophies) are de-ranked below a threshold.

| Rank | # | Proposal | Type | Effort | Impact | Why | Estimated lines to add | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | 1 | Team color theming (CSS vars + JS) | CSS+JS | Medium | Highest | Every page uses team color as accent; default is blue so already live but team-specific theming adds game feel. Already partially implemented (`teamRatings`, TEAM_COLORS data exists) | ~35 | Flag for Architect |
| 2 | 8 | Micro-interactions (button press, hover lift, focus rings) | CSS-only | Low | Medium | CSS polish, no JS; low risk in single file | ~45 | Quick win candidate |
| 3 | 3 | Tab transitions (fadeIn) | CSS-only | Low | High | Instant tab content swap polish | ~15 | Quick win candidate |
| 4 | 9 | Heat map calendar (17-week grid) | CSS+JS | Low | High | Pure grid data in existing game results; uses existing --good/--bad tokens | ~80 | Good |
| 5 | 10 | Score bug + play-by-play ticker | CSS+JS | Medium | High | Game day immersion; local DOM elements only, no external dep | ~60 | Good |
| 6 | 5 | Player card flip (3D CSS) | CSS+JS | Medium | High | Engagement in player browser flip-card | ~70 | Medium |
| 7 | 2 | Championship banner + confetti | CSS+JS | Low | High | Super Bowl celebration; confetti is pure CSS/JS fixed-position overlay | ~60 | Good |
| 8 | 12 | Achievement badges (8 unlockable) | CSS+JS | Medium | High | Engagement loop; modifies game summary views | ~50 | Medium |
| 9 | 13 | Loading skeletons | CSS+JS | Low | Medium | Better UX on tab transitions / data loads | ~30 | Quick win candidate |
| 10 | 11 | Heat map calendar with legend (Proposal 11, overlay of #9) | CSS+JS | Low | High | Same Proposal 9 expanded with legend | ~15 | Combined with #9 |
| 11 | 4 | Opponent color in matchup preview | CSS+JS | Medium | High | Visual differentiation between teams | ~40 | Good |
| 12 | 6 | Toast notifications | CSS+JS | Medium | High | Feedback for picks, config changes | ~40 | Medium |
| 13 | 21 | Field graphic (SVG with yard lines, ball, play arrows) | CSS+JS | Medium | High | Game day atmosphere; no images needed | ~70 | Good |
| 14 | 19 | Leaderboard podium | CSS+JS | Medium | Medium | Final standings celebration | ~40 | Lower priority |
| 15 | 7 | Dark/light mode toggle | CSS+JS | Medium | Medium | Tokens exist but persistence needs implementation | ~30 | Media query only |
| 16 | 22 | Animated season ticker (marquee) | CSS+JS | Low | Low | nice-to-have only | ~25 | Defer |
| 17 | 23 | Sticky sub-header | CSS+JS | Low | Medium | Collapsible nav bar on scroll | ~35 | Good |
| 18 | 14 | Mobile bottom navigation | CSS+JS | Medium | Medium | Mobile UX improvement for <760px | ~30 | Defer (matches current footer design) |
| 19 | 17 | Trophy case page (10 trophies) | CSS+JS | Medium | Medium | Post-season unlockable | ~45 | Lower priority |
| 20 | 18 | Championship ring ceremony | CSS+JS | Low | Medium | Team-colored ring; post-SB only | ~30 | Post-season |
| 21 | 24 | Dynamic favicon | JS | Low | Low | Canvas favicon on team change | ~20 | Nice-to-have |
| 22 | 20 | Weather overlay effects | CSS+JS | Medium | Medium | Atmosphere pick but polish value questionable at 390px | ~35 | Defer |
| 23 | 16 | Print/export (CSV) | CSS+JS | Low | Low | Utility, not aesthetics | ~25 | Defer |

## Items to skip entirely under product constraints
- **Audio sound effects** (#23 referenced in queue): not in scope, "lowest priority"
- **Print/export** (#16): utility not aesthetics
- **Animated season ticker** (#22): low impact
- **Weather overlay** (#20): visual flair without gameplay value

## Concrete first batch (top 13, most effort/impact per line)
Order for Claude to implement on a build pass:

1. Tab transitions (fadeIn) — CSS-only, instant polish
2. Heat map calendar with legend (Proposal 11, overlays #9)
3. Micro-interactions (button press, hover lift, focus rings) — CSS-only
4. Championship banner + confetti — post-Bowl celebration
5. Team color theming — highest impact; wiring existing TEAM_COLORS data
6. Score bug + play-by-play ticker — game day immersion
7. Loading skeletons — UX for tab swaps
8. Achievement badges — engagement loop
9. Opponent color in matchup preview — visual differentiation
10. Player card flip — engagement
11. Sticky sub-header — collapsible nav on scroll
12. Field graphic (SVG) — atmosphere
13. Leaderboard podium — standings celebration

## Notes
- All proposals use existing CSS variables (`--accent`, `--good`, `--bad`, `--sub`, etc.) — zero new hex literals beyond team colors
- All JS is vanilla — no framework dependencies
- Each respects `prefers-reduced-motion`
- The builders' own colour table has 1 contrast failure (Chargers #E31837 on #FBD5B9, 4.48:1 vs 4.5:1) and 4 stripe mismatches — these are flagged in the main proposal for Architect decision, not blocked by my ranking
- No product edits made — this is a proposal for Claude to evaluate and integrate