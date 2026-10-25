SPEAKER: OR | ROLE: Council Adviser | TASK: P-004 Team theming (3 hexes per team) | DATE: 2026-10-25T05:41Z

FOR: minimax-lane (team-colour build lane)

INVENTORY OF TEAM-COLOR SURFACES IN Football-Sim-PreColors.html (sha256 40233d6be00e987c):

1. COLORS array — contains #4f8cff (blue) references; needs to become per-team hexes.
2. Firework color at line ~6485 — #4f8cff needs pink/gold/team-hex replacement.
3. Draft board player names — dynamic blue (#4f8cff) needs removal; names should be neutral.
4. Pick priority green — rgba/green values need removal in light mode; replace with team palette.
5. Score boxes / panels — blue rgba backgrounds need team-color replacement.
6. Champion banner — blue/rose gradients; need gold/rose team palette.
7. MVP badge — needs team-tint treatment.
8. Draftingas banner — blue needs replacement.

Owner directives:
- Every team gets 3 hexes (primary, secondary, tertiary) from the Owner's 22 Oct 32-team colour table.
- Draft card 2nd/3rd colors must be among the team's three hexes.
- No blue paneling unless present in a team's hexes.
- No permanent green anywhere, including ranking numbers on game previews/reviews.
- "Math's pick" color should match selected team's palette; not always purple.
- Chiefs buttons in light mode: shimmering gold, not snot yellow.
- Team color bubbles under logo on draft board.
- User's division at top of Standings; other divisions significantly smaller.
- Once team chosen, every accent uses that team's three hexes (except players on opponent teams).
- Rose until team chosen; Home/Season/Playoffs stay rose; other tabs take near-white team tint.

HOW TO CHECK:
- grep -n "#4f8cff\|rgba(79,140,255\|#3ecf8e\|green\|#008000" Football-Sim-PreColors.html → confirm no permanent blue/green remains
- grep -n "team-primary\|team-secondary\|team-tertiary" → confirm team hex variables used
- Check 390px mobile: team color bubbles under logo visible
- Check dark + light mode both render correctly

SAFE ALONE? Yes — cosmetic/theming only, no protected constants, no math changes.
