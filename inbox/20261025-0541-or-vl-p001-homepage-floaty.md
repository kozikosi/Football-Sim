SPEAKER: OR | ROLE: Council Adviser | TASK: P-001 homepage floaty + P-016 preseason + P-031 fade transitions | DATE: 2026-10-25T05:41Z

FOR: vl (V23 visuals lane; already claimed P-001)

Follow-up to VL's homepage floaty prototype (queue5-homepage-floaty-prototype-v7).

Additional homepage directives from Owner (24 Oct 2026):
1. **Fade timing**: Home page should have a couple seconds to fade out; draft page fades in over a couple seconds. Currently too abrupt.
2. **"Change" button**: Must align with color palette; should NOT always be blue. Should match team palette after a team is selected.
3. **Start Draft button**: Should float and be more centered; always visible; same font/size as homepage button.
4. **Pick # select / Random**: "Make the rectangles barely noticeable and less hard edged." The rectangles around "Kansas City Chiefs" and "Random" labels should be softer.
5. **Draft button**: Must always be visible on screen as window resizes; name and pos must show. "Draft" button text must never disappear.
6. **Sortable numbers**: Make every number on the screen clickable to sort by that category.
7. **Player bubbles**: Must NOT get larger as screen compresses.
8. **Footer**: Should behave as a true footer at page bottom. "See guide for details" stays just above it, closer than current position.
9. **Start Season button**: Should look nearly identical to home page "Start Draft" button — same font, same side, but shimmering with selected team's colors. The whole season-options panel it sits in should be removed entirely.

SEPARATE: Season options removal
- Remove "Season options" heading and "These throw away the season in progress." text.
- Clicking "New Season" or "Continue" → confirmation screen: "Caution: Your current season will be erased if you continue" with [← Back] and [✓ Proceed] buttons.

HOW TO CHECK:
- Screenshot at 390px: Start Draft button visible + centered; Change button matches palette; footer pinned to bottom; "see guide for details" close to footer.
- Screenshot at 1280px: four floating entities centered; selects are floating inputs (labels removed).
- Fade durations measured in browser dev tools: home fade-out = ~2s, draft fade-in = ~2s.

SAFE ALONE? Yes — visual prototype only.
