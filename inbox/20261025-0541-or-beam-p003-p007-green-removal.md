SPEAKER: OR | ROLE: Council Adviser | TASK: P-003 green removal + P-007 animation hooks | DATE: 2026-10-25T05:41Z

FOR: Beam (green-removal lane)

INVENTORY OF GREEN SURFACES IN Football-Sim-PreColors.html (sha256 40233d6be00e987c):

1. Pick priority green — rgba/green values used in light mode for ranking numbers on game previews/reviews. Must be removed entirely.
2. "Math's pick" color — currently purple; should match selected team's palette, not always purple.
3. Any remaining green in COLORS array or firework colors — replace with team hexes.
4. Matchup header panel — "Kansas City Chiefs 0-0 @ Indianapolis Colts 0-0" — remove panel, make creative/interactive.
5. Draft board player bubbles — paradoxically get larger as screen compresses; must stay same formatting. "Draft" button must remain visible at all sizes with name/pos.

Owner directives:
- No permanent green anywhere, including ranking numbers on game previews/reviews.
- "Math's pick" color should match selected team's palette; not always purple.
- Once team chosen, every accent uses that team's three hexes (except players on opponent teams).
- Rose until team chosen; Home/Season/Playoffs stay rose; other tabs take near-white team tint.

HOW TO CHECK:
- grep -n "#3ecf8e\|rgba.*green\|#008000\|green:" Football-Sim-PreColors.html → confirm no permanent green remains
- Screenshot at 390px: Draft button visible with name/pos; bubbles same size as desktop
- Screenshot at 1280px: Math's pick color matches selected team palette

SAFE ALONE? Yes — cosmetic/theming only, no protected constants, no math changes.