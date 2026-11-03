# W63 INTAKE LEDGER — Muse's QA findings, verbatim, item by item

Source: the Owner's relay of Muse's QA playtest (browser-tested 2026-11-03, w62 bytes, full season played twice end-to-end). Owner's frame: "You don't necessarily have to agree with all of these suggestions but please consider them and implement them if you agree. If these comments encourage you to think about any new features or optimizing for mobile any differently, feel free to continue to do both at your own intuition."

> "1. Player Browser virtualization (P0). Renders all 1,200 players (~7,000 DOM nodes) at once. Page goes sluggish, interactions return 'page busy.' Implement pagination (50-100 rows) or virtualization."

- AGREE — the browser builds the whole roster into the DOM. Plan: pagination (the Owner's own first choice; safer than virtualization for this DOM), 60 per page (a full grid of the phone cards), with a pager bar that obeys the tap-floor law and the one-ink laws. The count line reads "N–M of TOTAL" (integers only). Filters (position/team/search if present) reset to page 1. ← interpretation flagged: 60/page, not 50/100.

> "2. Sticky header overlap (P1). The 'PLAY THE X' pill overlaps the matchup header when scrolled to top. Button appears twice (sticky + in-flow). Fix the sticky positioning or remove the duplicate."

- AGREE — the duplicate is w60's advance rail (the fixed clone) sitting beside the in-flow real button at scrollTop 0. Plan: keep the rail (the w60 law: it mirrors, its clone clicks the original, it never shows on the homepage/footer pages) but make it STEP ASIDE whenever the real CTA is visible in the viewport (IntersectionObserver; hidden = translateY off-screen + pointer-events none). The button is never twice, the quick-access survives the scroll. ← interpretation flagged: hide-when-visible, not removal.

> "3. Draft button jank (P1). First 'Draft' click returned 'page unresponsive' (retry worked). Likely main-thread blocking during draft render. Profile and break up the work — 71 setTimeout calls vs 13 requestAnimationFrame suggests timeout-chain rendering that should be chunked."

- AGREE the symptom, MEASURE before agreeing the cause — the w61/w62 law is measure-don't-guess. Plan: playwright probe timing the first Draft click (long-task duration), then fix the measured hot spot. If it is the timeout-chain render, chunk the board build across rAF; if it is a one-time pool build, move it off the click path.

> "4. Season hub navigation (P1). The only path from season hub to preseason is the big SEASON pill inside the faded SEASON/PLAYOFFS/SUPER BOWL banner. Testers scrolled past it. Make the CTA unmissable with explicit 'Start Preseason →' labeling."

- AGREE — plan: a first-class, explicitly labeled "START PRESEASON →" button at the top of the season hub (visible without scrolling, phone tap-floor, team-themed ink), acting exactly like the banner pill it mirrors. The banner pill stays for those who know it.

> "5. Autosave indicator (P1). Users don't know if their season is saved. Add a small 'Autosaved ✓' indicator that updates on save. Builds trust. Use the user's selected team color for this message."

- AGREE the intent, HONESTY FIRST — the storage wiring is parked by the standing guidance (the Phase 0 plan §6: the Architect's E2 envelope types gate the wiring commit). An "Autosaved ✓" for a save that does not exist would be a lie on the screen. Plan: inspect what the product ACTUALLY persists today (the w55 tab memory is the only known localStorage write); if there is a real save path, indicator on it; if there is none, build the honest minimal version: wire the season state through ZPBStorage's versioned envelope (schemaVersion 1 — the contract surface the batteries already prove) with save-on-checkpoint + the indicator in the team's 0.50 ink, and say so in the README as the wiring the plan parked but the Owner's directive now unblocks. ← interpretation flagged: wiring scope = season-state save only, NOT the Continue/slot UI (that still waits for E2/E3b/E1).

## Build contract
- Baseline: `Football-Sim-Z-post-blue-w62.html` md5 `468e6883d4e18afb07eab6a08862b972` (gh-pages, asserted by the generator on every run).
- Generator: `tools/zpb_w63.py` — asserted exact replacements + payloads + post-checks; re-runs clean from the pristine baseline.
- Batteries: the standing four re-pointed + a new `w63_battery.js` for the five findings.
- Delivery: `z-post-blue-wave63-2026-11-03-w63.zip`.

---

# ADDENDUM · the Owner's UI round (the "w61" list), merged into w63

The Owner's words verbatim, item by item (the build order follows the investigation, not this list):

> "Can we improve the hover ui/ux? Just make it more beautiful. Especially if you hover over a logo and it tells you the team name. That hover should be in the team's color with their 0.50 color font, cinzel decorative, etc."
- INTERPRETATION (flagged): a real styled tooltip on team-crest/logo hovers (team name, the team's color, the 0.50 ink, Cinzel Decorative) — replacing/ beautifying the native title attributes where a logo is the hover target.

> "Rewrite '…spot from a 70 to a 90' on the drafting panel hover to '…position from a 70 to a 90'"
- Literal string swap wherever it lives.

> "My rule: No side scrolling on game preview or game review screen on mobile. Please fix. The key players panel is currently side-scrollable. It shouldn't be"
- STANDING LAW. Measure the preview/review at phone widths; kill any horizontal pan on the key-players panel.

> "The 49/51 bar covers up the team name on mobile. The bar needs to be its own line."
- The matchup bar wraps onto the name line; give it its own row.

> "The key players and the team logos clash with the lines and the skip button text on my iPhone in the pregame during the game cinematic. That need to be fixed. You can expand the during the game panel vertically from the beginning. It is very narrow in the pregame but looks good by the end of the game as it expands."
- The during-the-game (replay) panel: expand earlier; no overlap between key players/logos and the lines/skip text.

> "'Continue to Week x' should take up a whole horizontal line on the screen. Take away the 'week 1 results' title of the panel. Move sim season up with your roster and team comparison in that panel. Sim season and continue to week x should also be buttons at the bottom of the page as well. This also true for the playoffs. Remove the text 'wildcard round results' and the other titles for that panel in the playoffs."
- The results screen: full-width CONTINUE TO WEEK X; the results title retires; SIM SEASON moves up beside YOUR ROSTER/TEAM COMPARISON; both CTAs also appear at the bottom; the playoffs mirrors all of it; the round-results titles retire.

> "The season in badges should not be side scrollable. I like the scroll for individual lines but not for the whole panel."
- Panel-level horizontal scroll off; per-line scroll stays.

> "The format of the awards should be like this '<title of award> <blank> <Player name> <blank> <badges>'. No reason for the title of the award to be on the left side of these panels."
- Awards stack: title, name, badges — no side-by-side title column.

> "Can't see the coach of the year's name on my iPhone. Should list the real coach's name unless the user is the coach of the year and then it should say 'YOU'"
- COTY: the real coach name; the user's own win reads YOU.

> "The league leaders panels on mobile look terrible. Please upgrade them to the same format as the other player cards for mobile. Should be badges instead of the table format."
- League leaders on phones: the player-card format (badges), not a table.

> "On the advanced stats panel, 2 pt conversions should be written as 'x / y'. Remove the word 'OF'"
- Literal format change.

> "The draft pick grades panels on mobile look great. Definitely an example for some of the other opportunities for panels like the league leaders."
- Reference standard — no change.

> "On the lineups dropdown, the names default to just the first initial of the last name too often. It should always be the full name if it can fit and then the last name if it can fit and then a player's initials but should always be both initials (or 3) but never 1 initial."
- The name ladder: full → LAST → initials 2+ (never 1). Touches zpbNameFit.

> "You can speed up how quickly season in badges cards fade in and the your full depth chart and the player's badges on the draft review page significantly. At least 0.5 seconds faster."
- The badge/cascade beats: ≥0.5s faster overall.

> "The Overall grade panel in the your roster tab is much worse than the draft pick grades panels on the season review page. Please replace the over all grade panel with the draft pick review player cards."
- The roster tab's Overall grade panel retires; the pick-grade cards take its place.

> "The team comparison tab within the season mode doesn't work at all. Which doesn't make sense because the footer team comparison panel looks pretty good. No side scrolling on either page and the team names are covering up the team scores on my iPhone. The scores 'x vs y' can go on its own line. No side scrolling necessary here."
- Fix the season-mode comparison tab; scores on their own line; zero pan both surfaces.

> "Oh yeah I encountered the player browser glitch. My whole screen froze for five seconds before I could see the players again. I couldn't see the footer during the freeze either. Please test again and make sure it's not broken still"
- COVERED by the Muse P0 pagination (60/page) — re-test explicitly at 1280 + 390 and pin evidence.

> "I'd like slightly different background effects going on in the during the game panel for each different round. For example, I love the swirl that comes in on the pregame. Can you implement four different types of background animations during the actual games, obviously increasing in drama and beauty and maybe more gold accents heading toward the Super Bowl."
- NEW FEATURE: four escalating game-cine backgrounds (regular season → wildcard/divisional → conf champ → Super Bowl), gold accruing toward the Bowl.

> "At least on the Miami dolphins in dark mode, on the 'Try again to go 20-0?' Button all the text except 20-0 is far too dark. Hard to read."
- The cyg tagline's non-shine text needs a legible ink in dark mode on every team (0.50-ink law for the tagline).

> "Carry = 'CAR' / ADD YPR = YARDS PER RECEPTION into the stats"
- The rushing label reads CAR; a YPR (yards per reception) stat joins the stats panels.
