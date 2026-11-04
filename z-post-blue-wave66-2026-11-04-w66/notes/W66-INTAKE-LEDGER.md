# W66 INTAKE LEDGER — the Owner's directives, verbatim, item by item

Source: the Owner's chat message (2026-11-04 HST, "recover the previous work" relay) +
Claude's w65 QA results (relayed verbatim inside it) + the new cross-track P-claims
convention (Claude-approved, REQUIRED from w66 on).

Baseline: `Football-Sim-Z-post-blue-w65.html` md5 `948f789da6d3ccf064104212ec748f3a`
· 1,741,540 B (the Owner renamed the w64→w65 build; gh-pages bytes match the w65 receipt).

## NEW CONVENTION (Claude, cross-track — required every wave from now on)

> "Add an HTML comment at the very top of the file (before <!DOCTYPE html>) listing which
> P-items your wave addresses… WAVE: followed by the wave number… CLAIMS: followed by one
> - P-XXX: description line per item… listing something here does NOT mark it done. Only QA
> verification does… Be specific about the mechanism, not just the what."

- The w66 file opens with the WAVE/CLAIMS block before <!DOCTYPE html>. w65's lesson applied:
  every claim names the mechanism and, where a fix is partial, says so ("X synced; Y unchanged").

## The Owner's items (this round = UI/UX at a MIDDLE window size + season-flow polish)

> "There is a window size at where the Draft button on the draft board half disappears behind
> the right side of the panel. this size also has all the informationn on three lines instead
> of the two or one when the screen is smaller or at full size. Please fix."
- Reproduced by probe (w66_probe3.js): at W=761–1080 the board panel is squeezed to 375px;
  ALL 150 Draft buttons clip ~9px past the panel's right edge; rows wrap to 5 visual lines.
  Root cause (previous session): a later unconditional `1fr 340px` grid override kills the
  ≤860px collapse law. Fix restores the collapse at the middle widths and keeps the
  two-or-one-line card shape the Owner already approved at small/full sizes.

> "Also I want all draft buttons to pulse like the top's player's draft buttons currently do,
> but then I want to top players to have their draft buttons colored and shimmering like the
> play x team button or season review or any of the progression buttons throughout the season
> ( obviously within that' team's color)"
- Two tiers: (1) EVERY Draft button gains the pulse the on-the-clock rows already have;
  (2) the top-of-board players' Draft buttons graduate to the progression-button treatment —
  filled, team-colored, shimmering (the zpbsheen sweep family the PLAY X TEAM / SEASON REVIEW
  buttons wear) — the team color comes from that team's theme tokens.

> "On the where your team line's up, how did you choose the colors? It seems like the offense
> if always black text on yellow. I don't love that. I'd prefer if all colors and text follow
> with the team themes and use the 0.5 colored text. No black. But please test extensively
> with every team in light and dark mode to ensure good contrast and readability."
- The formation-map unit chips stop being a fixed yellow-bg/black-text offense. Every unit
  chip follows the team's theme colors; label text at 0.5-strength team ink (the site's
  existing 0.5-alpha text law), never pure black, in both modes. Battery: all 32 teams ×
  light/dark contrast + readability measurement before ship.

> "Why is 'return to model lineup' available initially? Replace the word 'model' with 'auto'
> still seems like there is some smoothing of this system possible but eventually claude will
> probably take it over."
- The button is disabled until the user has actually changed something to return FROM; the
  wording becomes RETURN TO AUTO LINEUP. (The Owner frames deeper smoothing as future work —
  noted, not built this wave; the rename keeps Claude's takeover path clean.)

> "Replace the word 'shakiest' in why this style with 'WEAKEST'"
- Verbatim word swap on the preseason "Why this style" line.

> "IN THIS MID WINDOW SIZE, THE TEAM LOGOS KEEP COVERING UP THAT UPPER HORIZONTAL LINE.
> PLEASE FIX. THE KEY PLAYERS ARE IN PERFECT POSITIONS. THIS A DIFFICULT ASK I KNOW BUT KEEP
> TESTING IN DIFFERNT WINDOW SIZES AND MAKE SURE THAT EVERYTHING APPEARS ON THE PANEL SMOOTHLY
> WITHOUT ANY CONVERING UP OF LINE."
- The pregame cinematic's title/logo block rides above the replay header's horizontal line at
  mid sizes (reproduced at 800×640: logo top 154 < line 181). The key-player rows are already
  correct — the fix moves only the marquee block (title + logos) down/clear, then a sweep
  across many window sizes asserts clearance everywhere.

> "FOR A USER TEAM THAT DOESN'T MAKE THE SUPERBOWL, THE SHINY 'SEASON REVIEW' BUTTON SHOULD BE
> AVAILABLE ON THE REGULAR SEAOSN REVIEW PAGE. THE USER SHOULDN'T HAVE TO SIM THE PLAYOFF TO
> CLICK ON THAT BUTTON. SHOULD BE ON IT'S OWN PANEL JUST LIKE IT IS ON THE SUPERBOWL REVIEW PAGE."
- When the user's team missed the playoffs, the regular-season review page carries the same
  standalone centered glowing SEASON REVIEW panel the Super Bowl review page has — clickable
  immediately, no simming required.

> "THE 'TRY AGAIN TO GO 20-0?' BUTTON SHOULD BE FILLED IN AND SHIMMERING LIKE ALL THE OTHER
> SEASON PROGRESS BUTTONS. IT SHOULD ALSO BE ON IT'S OWN PANEL AND CENTERED LIKE THE 'SEASON
> REVIEW BUTTON ON THE PREVIOUS PAGE'"
- Filled + shimmering (the progression-button family), own panel, centered — matching the
  SEASON REVIEW panel treatment one page earlier.

## Claude's w65 QA (relayed by the Owner — build list)

> "❌ P-232 (P0) — auto lineup STILL mispositions players… Garett Bolles (NFL offensive tackle)
> at RB1, De'Von Achane (NFL RB) at WR1, Keaton Mitchell (NFL RB) at TE2… Devin Duvernay (NFL
> WR) at TE3, Demario Davis (NFL linebacker) at DE1, Zach Harrison (NFL DE) at WILL, Felix
> Anudike-Uzomah (NFL DE) at SAM, Bradley Pinion (NFL punter) at K… the penalty is treating
> the symptom. The model lineup logic needs the actual fix: players should be placed at
> positions matching their real NFL positions (or at least not at absurd ones like OT→RB1, P→K)."
- The model lineup builder becomes natural-position-first: every player is anchored to his
  real NFL position group; a slot is flexed ONLY when no natural candidate exists, and the
  flex table remains the legality gate. P-232 claim will name the exact mechanism used.

> "❌ Player Browser — page numbers were explicitly rejected… Replace the PREV/NEXT pager with
> one of these… Option A — Infinite scroll… Option B — 'Load more'… Verification: Players
> 61–120 reachable by scrolling or clicking, with no 'PAGE X OF Y' indicator and no PREV/NEXT
> buttons in the Player Browser."
- Option A ships (Claude's "nicest feel"): an IntersectionObserver sentinel appends the next
  60 players as the user nears the bottom. The pager, the PAGE X OF Y face and the false
  "carries the Owner's page law" comment all retire.

> "Minor: The draft room's early render listed O-line slots as 'OT1 C OG2 OT2' (OG1 missing);
> the final lineup showed OG1 correctly. Likely a transient render artifact, but worth a glance."
- Checked this wave: find the early render path, confirm or fix the transient OG1 gap.

## Build contract
- Baseline: `Football-Sim-Z-post-blue-w65.html` md5 `948f789da6d3ccf064104212ec748f3a` (asserted every run).
- Generator: the `zpb_w66*.py` chain — asserted exact replacements + payloads + post-checks; regenerated from the pristine baseline on every fix.
- Batteries: the standing suites re-pointed at w66 + a new `w66_owner.js` for this round's items + the all-teams lineup-color battery + the mid-window sweep.
- Delivery: `z-post-blue-wave66-2026-11-04-w66.zip` + the loose HTML, download area first-class, P-claims block at the top of the shipped file.

## SECOND INTAKE (same round, follow-up message — 10 new Owner items)

> N1 · ""FS Flex FS (-10)"" — On the draft board somewhere we lost a feature. This should
> be replaced with just "FS (-10 FLEX)" within a dropdown menu. On the dropdown the user can
> select the position they would like to draft that player into. Make sure the drop down menu
> is beautiful and aligns with the style principles of the dropdown menu of the team names on
> the homepage. 0.50 colors team themed. Cinzel if can.
- The FLEX chip on the draft board becomes a real dropdown: label reads "FS (-10 FLEX)"-style,
  and opening it lets the Owner choose the target position for that pick. Styling = the
  homepage team-picker dropdown family (0.5-alpha team theming, Cinzel).

> N2 · ""2 of 32 starters · +5 wins above a replacement-level lineup"" — Please think of a
> better way to visualize or create these two into badges or more of a badge format. I don't
> like the plaintext version at it is. Of course always align with team color and 0.50 color
> cinzel design guides.
- The draft-board summary line becomes two badge chips (starter count + wins-above-
  replacement), team-themed, Cinzel, 0.5 law.

> N3 · "The player cards on desktop appear too quickly now. They should at least be one at a
> time but at zero gap between when one appears and the next appears. But now they are super
> unsynched with the where your players line up on the desktop version. These still need to
> be synched. But the visualization should be synced to the cards and not the other way
> around. The cards are visible on mobile and desktop so please get that timing perfect."
- Card reveal cadence: strictly one card at a time, zero gap. The formation-map dot markers
  key off the card timeline (cards are the master clock), same on mobile and desktop.

> N4 · "Remove this text: " (change who plays where at any time)" from everywhere it occurs.
> It's on every page almost so make sure to check for all instances."
- Global string sweep for every occurrence.

> N5 · "On the new team comparison panel, there is a weird purple wave pattern in the dropdown
> menus. Please remove."
- Team-comparison select styling loses the purple wave artifact.

> N6 · "The "Back to Season" text is too faded. Brighten it so it looks like the sim season
> tab. Also it should not be on its own panel. Sim Game, Sim Season and Back to Season should
> appear on the upper line of the top panel next to 100 Seasons."
- Top panel regroups: SIM GAME · SIM SEASON · BACK TO SEASON on the same upper row as
  100 SEASONS; Back to Season ink matches the Sim Season tab brightness.

> N7 · "In the playoffs, remove the second sim playoffs button that is next to "Play the X"
> team. There is already a sim playoffs button in the top panel which should continue to exist
> but should be moved according to the above."
- Playoff page keeps ONE sim-playoffs button (the top-panel one, repositioned per N6).

> N8 · "When you hit sim playoffs, and the user doesn't make the superbowl, a cinematic screen
> should appear that looks similar to the superbowl screen but without the celebrations and
> confetti that lets them know what round they lost in, to who, basically everything that is
> transmitted to the user on the superbowl victory page. If the user hits sim playoffs and
> they make the superbowl, then just show them the superbowl screen. Right now the during the
> game panel appears after the superbowl screen. Please remove the during the game cinematic
> panel from appearing at all if the user hits sim playoffs."
- Sim Playoffs branches: miss the SB → a solemn playoff-elimination cinematic (SB-screen
  structure, no confetti/celebration) carrying round-out, opponent, score, stat lines; make
  the SB → the Super Bowl screen directly. The during-the-game cinematic never fires from a
  sim-playoffs run.

> N9 · "When the user wins coach of the year, their "YOU" should be written in shimmering gold
> like the other honors earned winners. Also we will be developing profiles soon so maybe go
> ahead and build out the feature to fill a player's profile name"
- COTY "YOU" joins the shimmering-gold honor treatment. Plus the profile-name feature: a
  player profile name field (the foundation for the profiles track) — persisted.

> N10 · "Remove "SAME ROSTER" from the RUN IT BACK · SAME ROSTER button. But rewrite the
> caution panel after you select the button to clarify that you will begin the season again at
> the preseason with the same roster."
- Button becomes RUN IT BACK; the confirm panel states the mechanism: restart at preseason,
  same roster.
