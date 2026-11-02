# W60 INTAKE LEDGER — the Owner's words, item by item (verbatim intake, Z.ai seat)

Source: the Owner's chat message, 2 Nov 2026 (HST). Nothing paraphrased in the quotes.
Base: **w59** — Football-Sim-Z-post-blue-w59.html md5 `889e531b9418fa7a2604d3e8ab4d23b4`
(1,680,808 B), now verified on gh-pages. w60 builds on w59's bytes from the pristine gh-pages copy.

---

## 1 · "the unit comparison panel is still not dynamic enough. it seems to exist in two states,
   full screen and then it narrows all of the sudden as the screen size gets to a certain limit.
   Then it is too narrow even in small window sizes. Please make the panel expand and contract
   more dynamically to fit with the window size and the panel above it."

- **Measured (not guessed):** the w59 `data-nostack` guard stopped the JS stacker, but a GENERIC
  base law — `@media (max-width:760px){ table{display:block;...} }` — still catches the unit
  table. A `display:block` table's cells shrink-wrap into an anonymous ~174px strip inside the
  full-width table box: the probe shows cells `28px · 95px · 28px` at 700–760px windows vs
  `124px · 488px · 124px` at 800px. That IS the "two states" and the "too narrow".
- **Build:** the unit table re-asserts `display:table` + `table-layout:fixed` at EVERY width with
  proportional columns (`25% · 50% · 25%`) — the three columns share the panel's width
  CONTINUOUSLY as the window moves, matching the panel above it (both are the same .panel width).
  The w59 padding/font steps stay as the gradual refinement. Both instances share the class.

## 2 · "As player's names get constrained by smaller window sizes, I'd like to see the names
   switch from full names to last names. … I don't want to see any more '…' to show that a
   player's name continues. … once the window size is too constrained for full names
   horizontally, then it shows full names vertically. Then if the window size is too constrained
   to show the names vertically, to then default to showing last names, and then if the screen is
   too compressed for last names, then the screen shows players' initials. No more '…' anywhere
   on the website."

- **Build — THE NAME LADDER (the w60 engine):** a `zpbNameFit` engine walks every name carrier
  through the Owner's exact ladder, measured per element (not per viewport):
  full name on one line → full name wrapped whole-word vertical → LAST NAME (suffixes stripped)
  → INITIALS. The engine re-runs on render and resize, stateless from the cached full name, so
  growing the window restores the fuller form.
- The carriers: lineup cells, the preview key players + the preview pairs, the awards names
  (`.zpb-awname`, `.zpb-awme`), the depth chart, the bracket, the pick grades, the FILLS link,
  the browser card, the intro stars, the "why" panel, the standings strip. All their
  `text-overflow:ellipsis` paints are REMOVED (the ellipsis can never render again). The two
  loading-screen strings and the two footer buttons lose their literal "…" too.
- **CSS safety change:** the name carriers' `overflow-wrap:anywhere`/`break-word` become
  `overflow-wrap:normal` — the engine guarantees fit, so a word can never split again. The
  replay's play text (narrative, not a name card) keeps w57's break-word.

## 2b · "Full names also switching to two lines is good but please make sure that names aren't
   broken up by letters in the same word. For example, on the lineups on the game preview page,
   at a small window, I am seeing Rhamondre Stevenson written as 'RHAMONDR E STEVENSON' …
   SINGLE WORDS IN NAMES SHOULD BE ON THEIR OWN LINE. THIS PATTERN HAPPENS A LOT ON THE REGULAR
   SEASON AWARDS CARDS AND THE POST SEASON AWARDS CARDS. PLEASE FIX."

- **Root cause:** `overflow-wrap:anywhere` (`.zpb-lu-cell` base, `#draftTable2 td.dc-name`,
  `.zpb-awname`, `.zpb-pg-name`, `.zpb-gname`) — the word alone exceeded the line, so the
  browser broke inside it. The ladder + `normal` fixes the class of bug everywhere.

## 2c · "REMEMBER THAT JR. IS NOT A LAST NAME, IT STANDS FOR JUNIOR. IF THE WINDOW SIZE IS BETTER
   TO SHOW LAST NAMES ONLY, JR IS NOT AN ACCEPTABLE LAST NAME BY ITSELF."

- **Build:** the ladder's last-name step strips the generational suffixes (Jr. / Sr. / II / III /
  IV / V) from the END before taking the last token — "Stevenson Jr." reads "Stevenson". The full
  name keeps the suffix (it belongs to the full form).

## 3 · "PLEASE KEEP TRYING TO IMPROVE HOW THE KEY PLAYERS APPEAR ON THE SCREEN IN THE DURING THE
   GAME PREGAME CINEMATIC. THEY STILL COVER UP THE STATIC PREGAME SCREEN IN WEIRD WAYS. IT IS
   ACCEPTABLE FOR THE PLAYER CARDS TO APPEAR BELOW AND ABOVE THE PANEL WHERE THE GAME PLAY BY
   PLAY HAPPENS IF THAT WOULD HELP SOLVE THE PROBLEM."

- **Build:** the pregame star cards leave their absolute % positions entirely. The intro becomes
  a flow: the static block (title · logos · @) on top, then the key-player pairs as face-off ROWS
  below it — one row per beat, away left / home right, fading in and out on the same beats as
  now. Nothing floats over the static screen at any width. The fitted one-size law (w45) and the
  beat timing (w39/A5) stay; the w59 phone fan maps retire (they were position maps for the old
  float).

## 4 · "THE BEGIN PLAYOFFS BUTTON SHOULD BE THE MORE DYNAMIC ALMOST MOVING SHIMMERING COLOR THAT
   WAS ON THE SIM PLAYOFFS BUTTON IN PREVIOUS WAVES. THE SIM PLAYOFFS BUTTON SHOULD NO LONGER BE
   COLORED IN AT ALL."

- **Measured:** the moving shimmer is `zpbbtnshine` (background-size 220% + position sweep). The
  w51 gold-pill law's `background:` SHORTHAND resets `background-size`, so the ID-listed buttons
  never shimmered — the shimmer died under the pill.
- **Build:** BEGIN PLAYOFFS wears the pill AND the sweep (`background-size:220% !important` +
  the 3.4s infinite animation; off under prefers-reduced-motion). SIM PLAYOFFS leaves the gold
  pill list and wears the ghost: transparent fill, gold text, hairline border, no shadow, no
  animation.

## 5 · "THERE IS A GLITCH. I WAS WATCHING MY PLAYOFF GAME HAPPEN AND I CLICKED OUTSIDE OF THE
   DURING THE GAME PANEL AND THE DURING THE GAME CINEMATIC SUDDENLY ENDED AND TOOK ME TO THE
   POSTGAME REVIEW PAGE. THAT SHOULDN'T HAPPEN. I SHOULD HAVE TO CLICK SKIP AND THEN CONTINUE TO
   EXIT OUT OF THE DURING THE GAME PANEL."

- **Root cause (the live builder only — the file carries a dead earlier copy of the same
  function):** `ov.addEventListener('click', e=>{ if(e.target===ov) close(); })` plus an Escape
  close. One click on the dim ended the whole cinematic and released the flow to the postgame.
- **Build:** the backdrop click and Escape are REMOVED from the live game replay. The only exits
  are the buttons: Skip → Continue. (The rest of the site's overlays keep their doors; the
  during-the-game panel is the one the Owner ruled on.)

## 6 · "REPLACE 'START A NEW SEASON (SAME ROSTER)' WITH 'RUN IT BACK <DOT> SAME ROSTER'. THE SAME
   ROSTER SHOULD APPEAR ON IT'S OWN LINE IN COMPRESSED SCREENS."

- **Build:** the footer button reads `RUN IT BACK · SAME ROSTER` (the site's dot span). At ≤520px
  the dot retires and SAME ROSTER takes its own line. The caution wiring (asks first) unchanged.

## 7 · "TAKE AWAY THE '…' FROM 'START A NEW DRAFT'. TAKE AWAY 'START A' TOO. IT SHOULD JUST SAY
   'NEW DRAFT' LIKE THE BUTTON AT THE TOP."

- **Build:** the footer button reads `NEW DRAFT`. The three-doors confirm it opens is unchanged.

## 8 · "THESE TWO, RUN IT BACK AND START A NEW DRAFT SHOULD BE NEXT TO EACH OTHER HORIZONTALLY ON
   AT FULL WINDOW SIZE. THEY CAN STACK VERTICALLY AT SMALLER WINDOW SIZES."

- **Build:** the pair sits in the existing flex row (side by side at full width, wrapping to a
  vertical stack as the window narrows — the wrap point is natural, no forced stack).

## 9 · "ANY GLOWING BUTTON THAT HELP ADVANCE YOU TO THE NEXT PAGE SHOULD ALSO BE AVAILABLE FOR
   THE USER TO CLICK AT THE TOP AND BOTTOM OF EVERY SCREEN DURING THE SEASON (EXCEPT THE HOMEPAGE
   AND FOOTER PAGES). THE USER SHOULDN'T HAVE TO SCROLL BACK UP OR SCROLL DOWN TO ADVANCE TO THE
   NEXT PAGE."

- **Build — THE ADVANCE RAIL:** a slim fixed bar at the very top of the screen that carries the
  current season screen's glowing advance button (Play the X · Continue to Week N · NEXT ROUND ·
  BEGIN PLAYOFFS · Season Review · BEGIN SEASON). It appears only while one of those buttons is
  on the screen (never the homepage, never the footer pages), mirrors the real button (same
  label, same glow, same action — the clone clicks the original), and slides away when no
  advance button exists. The wrap gains its height as padding so nothing hides under it. It
  lives inside `.wrap`, so the w59 cinematic lock locks it with the page.

## 10 · "You are now working on w60." (implied by "REMINDER THAT YOU LAST SHIPPED w59. You are
   now on w60.")

- File: `Football-Sim-Z-post-blue-w60.html`, built from the pristine gh-pages w59 bytes
  (md5 889e531b…), asserted replacements only, re-runs clean from base every iteration.

## §veto — the standing laws touched

1. The w59 unit-comparison law graduates: `data-nostack` alone was not enough — the generic
   `table{display:block}` base law is the real narrowmaker; `display:table` + `table-layout:fixed`
   is the law now (the Owner's "more dynamically" ruling).
2. The w57 break-word trio narrows: gname and lu-cell move to `overflow-wrap:normal` under the
   engine's guarantee (zrl-play keeps break-word — narrative text, not a name card). The Owner's
   "SINGLE WORDS IN NAMES SHOULD BE ON THEIR OWN LINE" is the higher law.
3. The w39/A4 star placement (absolute % lanes, the w59 phone fan) RETIRES — the face-off rows in
   flow are the law; the Owner explicitly allowed above/below placement.
4. The w51 gold-pill list loses SIM PLAYOFFS (the ghost is the Owner's ruling); BEGIN PLAYOFFS
   gains the sweep. The w57 "BEGIN PLAYOFFS wears the SIM PLAYOFFS size" law stands (size, not fill).
5. The during-the-game panel's ONLY exits are Skip → Continue — the dim and Escape are dead. The
   other overlays keep their own doors (the Owner's ruling names the during-the-game panel).
