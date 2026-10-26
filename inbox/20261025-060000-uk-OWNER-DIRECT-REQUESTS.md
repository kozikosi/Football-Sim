# DIRECT OWNER REQUESTS — 2026-10-25 (Consolidated from user chat)

## P0 — Homepage / Draft Entry (Visual Polish)

### P-050: Homepage → Draft Fade Transition
- **Requirement:** Slow fade: homepage fades out over 2s, draft page fades in over 2s
- **Current:** Instant transition
- **Implementation:** CSS transition on view swap + JS delay

### P-051: "Change" Button Color Palette
- **Requirement:** "Change" button uses team color palette, not hardcoded blue
- **Current:** Blue button
- **Implementation:** Apply `--team-primary` / `--team-secondary` to button

### P-052: Remove Star System Entirely
- **Requirement:** Delete star system UI + all explanatory text ("Chip numbers are starters drafted...", "★★ must-fill (Priority ×1.5)...")
- **Current:** Star selectors visible on draft board
- **Implementation:** Remove star rendering + tooltip text

### P-053: Remove "You hold the #X overall pick" Text
- **Requirement:** Delete this line from draft board
- **Current:** Visible on draft board
- **Implementation:** Remove from render

### P-054: Right-Align Next Pick Display
- **Requirement:** Show "(R.P)" where R=round, P=pick# right-aligned
- **Current:** Full sentence left-aligned
- **Implementation:** Compact format, right alignment

### P-055: Pick Priority Menu — Remove Green (Light Mode)
- **Requirement:** No green in Pick Priority dropdown in light mode; use team palette
- **Current:** Green appears in light mode
- **Implementation:** Replace green with team accent colors

### P-056: Post-Draft Message Update
- **Current:** "Your draft is in the books. Play the season. Season, Playoffs, Super Bowl. Can you go 20-0?"
- **New:** "Play the season. Coach your team to the Super Bowl. Can you go 20-0?" (right-aligned)
- **Implementation:** Text change + right-align

### P-057: Remove Season Start Panel Text
- **Delete ALL of:**
  - "Play a Season"
  - "Simulate a full 17-game regular season with your drafted team against the other 31 simulated rosters, organized into real NFL divisions and conferences, then take your team through the playoffs to the Super Bowl!"
  - "Starting the season builds the schedule. Nothing is simulated yet."
  - "On the Preseason page you choose your coaching philosophy (offensive and defensive style) and who plays where, including any flexes. Then simulate one week at a time or the rest of the season."
  - "New to the terms? The Guide tab explains every style, package and number on this site."
- **Implementation:** Remove panel entirely; Start Season button matches homepage button (same font, shimmer, team colors)

### P-058: Remove Post-Draft Analysis Text
- **Delete ALL of:**
  - "More than anything, this draft was about quarterback play..."
  - "The best value on the board was Tyler Bass (K)..."
  - "Not every pick can be a home run — Cobie Durant at pick 155..."
  - "If there's a crack in the foundation, it's the running back room..."
- **Implementation:** Zero text in this section for any team

### P-059: Homepage Dropdowns — Stay Side-by-Side on Mobile
- **Requirement:** As screen compresses, dropdowns shrink but stay horizontal (don't stack)
- **Current:** Stack vertically
- **Implementation:** Flex with min-width, shrink-to-fit

### P-060: Homepage Footer — True Footer + "See Guide" Above
- **Requirement:** Footer visible at bottom; "see guide for details" just above footer
- **Current:** Footer position/issues
- **Implementation:** Sticky footer layout

---

## P0 — Draft Board Visual

### P-061: Team Color Bubbles Under Logo
- **Requirement:** Three team color circles under team logo on draft board
- **Implementation:** Add color indicator row

### P-062: Remove "No picks yet." and "needed"
- **Requirement:** Delete these strings from draft page
- **Implementation:** String removal

### P-063: Compress "x% gone by your next pick"
- **Requirement:** "by your next pick" disappears on narrow screens
- **Implementation:** Responsive text truncation

### P-064: Draft Board Player Bubbles — Fixed Size on Resize
- **Requirement:** Player bubbles don't grow when screen compresses
- **Current:** Bubbles enlarge
- **Implementation:** Fixed dimensions, responsive container

### P-065: "Draft" Button Always Visible
- **Requirement:** Most important button — always on screen with name+pos
- **Current:** Disappears on resize
- **Implementation:** Sticky/fixed positioning or layout priority

### P-066: Clickable Sort Headers
- **Requirement:** Click any number on screen to sort by that category
- **Implementation:** Make all numeric headers clickable sort triggers

### P-067: Remove Green from Pick Priority (Light Mode) — DUPLICATE of P-055
- **Same as P-055**

---

## P0 — Preseason / Coaching Philosophy

### P-068: Preseason Name Truncation
- **Requirement:** Show only last name when window compressed
- **Implementation:** CSS truncation + responsive

### P-069: Philosophy/Aggressiveness Explanations — Dropdown Only
- **Current:** Long paragraphs visible by default
- **New:** Hidden in dropdown; click to expand
- **Language:** Simplified to 5th-grade level; more visual than text
- **Sections:**
  - "Why a pass-heavy offense?" → dropdown
  - "Why we recommend Auto" → dropdown
  - "Follows the usual NFL chart..." → same size/font as label above dropdown
  - "How a 2-Pt Conv works..." → dropdown
- **Implementation:** Collapsible sections with simplified copy

### P-070: Style Table — Own Dropdown
- **Requirement:** Style table in its own dropdown, not visible unless clicked
- **Implementation:** Separate collapsible

### P-071: Remove "Season options / These throw away the season in progress"
- **Requirement:** Delete this text
- **Implementation:** Remove

### P-072: Season Reset Confirmation Modal
- **Requirement:** Clicking reset → modal "Caution: Your current season will be erased if you continue" with [Return to Season] [Confirm Erase]
- **Implementation:** Modal dialog

### P-073: Chiefs Button Colors — More Gold Shimmer, Less "Snot Yellow"
- **Requirement:** Light mode Chiefs buttons: more shimmer, deeper gold
- **Implementation:** Adjust `--team-primary`/`--team-secondary` for KC in light mode

### P-074: Remove "Current lineup: +X wins vs 70s lineup, with X flexed starters"
- **Requirement:** Delete this line
- **Implementation:** String removal

### P-075: Remove "wins added · " from Group Scores
- **Requirement:** Delete parenthetical
- **Implementation:** String removal

### P-076: Remove "Three optional settings, preselected with recommended values..."
- **Requirement:** Delete this text
- **Implementation:** String removal

---

## P0 — Visual Polish / Team Colors

### P-077: Stars Section — Beautiful Layout Like Draft Board
- **Current:** List format with stars
- **New:** Players across from each other (home vs away), glowing stars
- **Implementation:** Two-column layout, star glow animation

### P-078: Game Matchup — Creative/Interactive (No Panel)
- **Current:** "Kansas City Chiefs 0-0 @ Indianapolis Colts 0-0" in panel
- **New:** Creative matchup display — logos, dynamic, reference Glyph's VISUAL-DESIGN-SHOWCASE.html
- **Implementation:** Logo-based matchup, animated

### P-079: Remove "Draft, Season, Playoffs, Super Bowl. Can you go 20-0?" from Season Header
- **Requirement:** Delete from season header
- **Implementation:** String removal

### P-080: Stepper Bubbles — No Permanent Green After Completion
- **Requirement:** Completed step bubbles don't stay green (e.g., DRAFT bubble green while using Chiefs in light mode)
- **Implementation:** Completed steps use team gold, not green

### P-081: Game Preview — Visual/Graphical (Reference Beam's Floaty v2)
- **Replace text with visual layout for:**
  - Game preview text
  - Game plan sections
  - Opponent scouting report
  - Matchup math section
  - Your Team's Identity section
  - Schedule section
  - Key Players section
  - Regular Season Review section
  - Game review section
- **Every section:** More graphic, less text, glimmery
- **User's division:** Top of standings, other divisions significantly smaller

### P-082: Game Simulation Animation (15-20s)
- **Requirement:** Animation during simulation showing score by play/quarter, big play names (like Sleeper/ESPN game log)
- **Implementation:** Progressive score reveal animation

### P-083: Lineups — Less Boxy, More Floaty
- **Requirement:** Dynamic floaty layout; Colts colors on their players (not green) in light mode
- **Implementation:** Floaty cards, team colors per player

### P-084: Logo Package Prototype
- **Requirement:** One-page prototype using other logo package (nfl-team-logos folder), transparent bubbles, no white space
- **Implementation:** Separate prototype file

### P-085: "Math's Pick" Color = Team Palette
- **Requirement:** Not always purple; use selected team's colors
- **Implementation:** Dynamic color

### P-086: No Permanent Green Anywhere
- **Requirement:** Verify no permanent green in light mode, including ranking numbers on game previews/reviews
- **Implementation:** Audit + replace

### P-087: Remove Flexed Players Text Block
- **Delete:** "On the roster-building side, the strength is concentrated in the skill positions (#13 in the league), with the back seven (#28) the least developed. 9 starters are playing out of position (Jahmyr Gibbs (RB) at TE1, −6; Jarvis Brownlee Jr (CB) at TE2, −6; Milton Williams (DT) at OT1, −6; Tanor Bortolini (C) at OT2, −4; Moro Ojomo (DT) at OG1, −4; Jonathan Greenard (EDGE) at DT1, −2; Zion Young (EDGE) at DT2, −2; Odafe Oweh (EDGE) at WILL, −2; Khyiris Tonga (DT) at LB3 / SAM, −4), a combined 36-point rating hit already built into every grade above."
- **Implementation:** Remove entire paragraph

### P-088: Offense/Defense Labels — Remove Parentheses, Sort by Roster Order
- **Current:** "Offense (QB+RB+WR+TE+OL)"
- **New:** "Offense QB RB WR TE OL" (no parentheses, roster order)
- **Implementation:** Label cleanup + sort

---

## Logos

### P-089: Logo Assets Available
- **Files:** `all-logos-sdv.csv` + `nfl-team-logos` folder (in Football Sim main folder)
- **Use whichever looks better**

---

## Technical Note
All post-blue (V23) tools/discrete code sections must be easily copy-pasteable for Claude. Update prompts accordingly.