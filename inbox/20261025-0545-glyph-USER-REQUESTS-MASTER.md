SPEAKER: glyph | ROLE: Council | TASK: USER-REQUESTS-BATCH | DATE: 2026-10-25T05:45:00Z
FOR: V23 / PRIORITIES

# USER REQUESTS - MASTER WORK ORDER (Priority Order)

Owner permission granted to distribute all requests. These are council work (ideas/snippets/measurements/mockups) - only Architect builds product HTML.

## P0 - Critical UX/Visual (Must Do First)

### Logos
- [ ] **LOGO-001** Integrate logos from main folder. Two sets available: `all-logos-sdv.csv` and `nf-team-logos/` folder. Evaluate both, use whichever is better.
- [ ] **LOGO-002** Subtract/trim whitespace from logos as much as possible. Prefer transparent with no bubbles around logos; if bubbles unavoidable, make them transparent.
- [ ] **LOGO-003** Create separate one-page prototype using the other logo package for comparison.

### Homepage
- [ ] **HP-001** Fade into draft slower - homepage fade out couple seconds, draft page fade in couple seconds
- [ ] **HP-002** Dropdowns stay side by side when compressed (not stack). Scale down but maintain position.
- [ ] **HP-003** Footer must be at bottom of page. "see guide for details" closer to footer.
- [ ] **HP-004** Team and draft position dropdowns must remain (labels removed per earlier request - keep dropdowns)

### Draft Page
- [ ] **DRAFT-001** "Change" button must match color palette (not always blue)
- [ ] **DRAFT-002** Remove star system and explanation text: "Chip numbers are starters drafted / starting spots (0/2 = both open). Stars set how much you care about a position: ★★ must-fill (Priority ×1.5), ★ normal, ☆ low (×0.5). Click a star to change it."
- [ ] **DRAFT-003** Remove "you hold the #8 overall pick (Round1)". Align "(x.y)" where x,y = user's next draft pick round and pick number to the right.
- [ ] **DRAFT-004** Remove green from Pick priority. No permanent green anywhere including light mode. Use user's selected team colors.
- [ ] **DRAFT-005** Fix Pick priority green in light mode (still shows).
- [ ] **DRAFT-006** Remove "No picks yet." and "needed" from draft page.
- [ ] **DRAFT-007** In "for x % gone by your next pick", remove "by your next pick" as screen compresses.
- [ ] **DRAFT-008** Player bubbles paradoxically get larger when compressed - must stay same formatting. "Draft" button MUST always be visible with name and pos (most critical). Clicking numbers should sort by category.
- [ ] **DRAFT-009** Put three team color bubbles under logo on draft board.
- [ ] **DRAFT-010** Remove all recap text after draft complete. Replace with: "Your draft is in the books. Play the season. Coach your team to the Super Bowl. Can you go 20-0?" aligned right. KEEP shimmering effect on "Can you go 20-0" (good example of emphasis).
- [ ] **DRAFT-011** Remove flexed players text entirely ("9 starters are playing out of position..." etc.)

### Preseason/Season Start
- [ ] **SEASON-001** Remove all season explanation text (the long paragraph about simulating season). Start Season button must look almost identical to homepage button with same font/size but shimmering with user's selected team colors. Entire panel containing it should be removed.
- [ ] **SEASON-002** Remove parentheses from position groups "Offense (QB+RB+WR+TE+OL)" -> just "Offense". Sort groups Offense to Defense like draft board roster order.
- [ ] **SEASON-003** Remove recap text block (entire paragraph about draft grades/values/foundation).
- [ ] **SEASON-004** On preseason, long names not fully visible when compressed - show last name only when window compresses.
- [ ] **SEASON-005** "Why a pass-heavy offense?" paragraph - hide behind dropdown, simplify to 5th-grade level, make more visual/graphical than paragraph.
- [ ] **SEASON-006** "Why we recommend Auto" explanation - compress into dropdown, simplify/visualize.
- [ ] **SEASON-007** Style table should be its own dropdown, not visible unless clicked.
- [ ] **SEASON-008** "Follows the usual NFL chart..." should be same size/font as text above dropdown in Game-day aggressiveness. Its own dropdown, not visible unless clicked.
- [ ] **SEASON-009** "How a 2-Pt Conv works..." remove from inline text or put in dropdown.
- [ ] **SEASON-010** Remove "Season options / These throw away the season in progress." When clicking either option, show "Caution: Your current season will be erased if you continue" with buttons to return or confirm clicked option.
- [ ] **SEASON-011** Fix Chiefs button colors in light mode - more shimmering, more gold than snot yellow.
- [ ] **SEASON-012** Remove "Current lineup: +13.44 wins vs. a 70s lineup, with 4 flexed starters." Remove "wins added · " from Group scores parentheses.
- [ ] **SEASON-013** Remove "Three optional settings, preselected with recommended values. Philosophy and aggressiveness lock at Week 1; lineup and returner stay editable."

## P1 - Major Page Redesigns (Visual/Graphical)

### Standings/Stars
- [ ] **STAND-001** "Stars (85+ OVR)" section needs major beautification - look like draft board, players across from each other, stars glowing. Use actual logos.
- [ ] **STAND-002** User's division should appear at top of Standings, other divisions significantly smaller.

### Game Preview/Review
- [ ] **GAME-001** "Kansas City Chiefs 0-0 @ Indianapolis Colts 0-0" - remove panel, be more creative/interactive with matchup. Use logos. Make more dynamic like VISUAL-DESIGN-SHOWCASE.html.
- [ ] **GAME-002** Remove "Draft, Season, Playoffs, Super Bowl. Can you go 20-0?" from season header.
- [ ] **GAME-003** In subheader, permanent green must not appear in bubbles after step completed (e.g. DRAFT bubble green in light mode with Chiefs issue).
- [ ] **GAME-004** Replace game preview text with more visual/graphical layout - refer to "Game Preview Floaty v2 by Beam" style (don't copy exactly). Same for Game plan, Opponent scouting, Matchup math, Your Team's Identity, Schedule, Key Players sections.
- [ ] **GAME-005** Regular Season Review section more graphical, less text.
- [ ] **GAME-006** Game review section more graphical.
- [ ] **GAME-007** Everything should be glimmery; emphasize with color palette and shimmering like "Can you go 20-0" example.
- [ ] **GAME-008** "Math's pick" color must fit selected team palette (not always purple).
- [ ] **GAME-009** No permanent green anywhere including ranking numbers on game previews/reviews.
- [ ] **GAME-010** Colts colors must be used on their players in light mode (not green).

### Game Animation
- [ ] **ANIM-001** Create animation during game simulation (15-20 seconds) showing score appearing by play and quarter, list big play names like game log on Sleeper/ESPN.

### Lineups
- [ ] **LINEUP-001** Lineups section less boxy/table, more dynamic floaty.

## P2 - Polish & Consistency
- [ ] **POLISH-001** "More than anything..." draft recap text - remove entirely for all teams
- [ ] **POLISH-002** Create prototype of every main page type (homepage done, previews/reviews done, need others)
- [ ] **POLISH-003** Make all tools/discrete code sections for post-blue easily copy-pasteable for Claude; update prompt if needed

## Logos Location
- In Football Sim main folder: `all-logos-sdv.csv` and `nf-team-logos/` folder
