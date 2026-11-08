# W85 ROUND-2 INTAKE LEDGER — the Owner's words, verbatim, mapped line by line

**Chat:** 2026-11-08 · **Base:** the recovered w85 build (`Football-Sim-Z-post-blue-w85.html`,
md5 `2de5d414…` — the Owner did not push it; it is recovered from this sandbox and improved in place.
The product is still **w85**; the file name and wave number do not move.)

**On w78:** the Owner asked for a w78 ↔ w85 merge. **w78's bytes never reached this sandbox**
(GitHub tops out at w55; waves w56–w79 were never pushed and no zip carried them), so the merge is
built from the Owner's verbatim re-sent comments below — they are the w78/w79 spec. Nothing is
guessed beyond his words; anything else w78 carried stays lost until he names it.

---

## R2-1 · w78 features the Owner named (the merge)
> "I am not happy with this w85. you've clearly left out a lot of features like the draft command
> center that were present in w78. Please review w78 and compare it your w85 and make sure the best
> of both is present in the new version."

**Ships:** the DRAFT COMMAND CENTER (R2-13/R2-18 below) — the one w78 feature he named — plus every
item in the re-sent comment list, which are themselves the w78/w79 features (round cinematics,
rating scale, fills format, guide positions, OFFENSIVE GUARD naming).

## R2-2 · the hover banner waits for the page's own button to scroll away
> "please make sure that the banner at the top of every page doesn't appear until the user scrolls
> below the same button that would be available at the top of the page normally."

**Ships:** an IntersectionObserver gates `#zpb-stagebar` on the page's own equivalent next-stage
button (Begin the season / Play the week / Continue to Week N / Begin Playoffs / Play the round /
Continue to <round> / Season Review / The Champion / Continue the draft). While that button is on
screen the banner is hidden; the moment the user scrolls it out of view, the banner appears. On the
Guide and the footer tools the anchor is the page's own top BACK TO <stage> bar (R2-14). Pages with
no equivalent button keep the banner as it was.

## R2-3 · the draft board's selected position button must be obvious in both themes
> "in light mode, only changing the border around the button that is selected means that it is hard
> for the user to see which button is selected. Please fill in the button or make it more obvious in
> both light and dark mode when a button is selected."

**Ships:** a selected chip is FILLED — the team accent fills the button, the label ink flips to the
readable on-accent tone, both themes.

## R2-4 · the position-group chip law (the w9 comment, rebuilt exactly)
> "The position group buttons should be all turned off initially even though the draft board should
> be full. If a user clicks a button, then only the players from that position group appear. If a
> user selects all then all position buttons are on and the draft board is equally full. If a user
> clicks a position group while all buttons are on, then the players from that position group would
> disappear from the draft board. So basically if a button is on, its players are on the board. If a
> button is off, its players are off the board. Except for when every button is off (the default)
> then all players are on the board."

**Ships:** exactly that law — the chips start OFF with the board full; a chip ON filters to its
group; ALL turns every chip on; a chip OFF (from any state) removes its players; every chip OFF is
the default and shows the whole board.

## R2-5 · the preseason dropdown headers lose the box and shrink
> "All of these dropdown menus — WHY THIS STYLE? / OFFENSE· EVERY STYLE WITH YOUR ROSTER / DEFENSE·
> EVERY STYLE WITH YOUR ROSTER / WHAT DO THESE TERMS MEAN? (PERSONNEL, PACKAGES) / HOW A 2-PT
> CONVERSION WORKS — should be written in a smaller font and without the box just like : 'WHAT DO
> THESE TERMS MEAN? (PERSONNEL, PACKAGES)'"

**Ships:** every `details.zpb-dd` loses its border, background and padding; the summary drops to the
small size; the personnel/terms dropdown joins the same class so all five wear one style.

## R2-6 · "2 point conversion" on the preseason page and in the guide
> "On the preseason page and anywhere in the guide. Write 2 point conversion instead of '2-pt
> conversion' keep the badges and any other mention during the season in the current format."

**Ships:** the preseason aggressiveness intro, the dropdown header and the guide glossary spell it
out; the stat badges, the recap lines and every in-season mention keep `2-Pt`.

## R2-7 · the offense dropdown drops "(x teams run it)"
> "In the dropdown menu for offense remove (x teams run it)"

**Ships:** the coaching-philosophy offense options read the style name only, exactly like the
defense options.

## R2-8 · SIM SEASON wears the same neutral ghost as SIM GAME
> "The sim game and sim season buttons shouldn't appear any differently. Currently with the chiefs
> the sim season button is filled in white. I prefer the neutral color that the other buttons have."

**Ships:** `button.zpb-simseason` loses its `--panel` fill and takes the tabbtn ghost
(transparent, glass hairline) — identical to SIM GAME.

## R2-9 · no dark pregame player cards in light mode — every team
> "during the game cinematic pregame player cards for the Kansas City chiefs in light mode are
> colored too dark. Poor contrast. Hard to read text. Please fix and check every other team's player
> cards in light mode. Shouldn't have any dark panels in light mode."

**Ships:** the pregame key-player panels go theme-aware — light mode wears a light team wash with
the team's light ink (`--tn`); dark keeps the dark stage cards. Every team, both themes.

## R2-10 · the box score border wears the score's color
> "Add a border around the box score in the post game reviews that is the same color as the border
> around the score."

**Ships:** the linescore double frame moves from rosehair to `var(--accent)` — the exact ink the
score-line border carries.

## R2-11 · the award cards' light ink steps up to a 0.60 preset
> "In light mode, the text for the regular season award winner cards when a player is <85 is too
> pale. Need to up the tint just a little bit more. Create a new 0.60 preset of each team's color
> for their text in light mode. Keep the 0.50 for dark mode."

**Ships:** every team pack grows a `txM6` ink (the 0.60 mix, with the same 5:1 readability floor);
the award winner cards, the All-Pro/Pro Bowl chips, the playoff award cards and the honor lines read
it in light mode. Dark keeps txd.

## R2-12 · Sim Playoffs shows a full cinematic for every round the user plays
> "When you hit sim playoffs in w73, there should be a cinematic page for each round that the user's
> team plays. It shouldn't jump straight to the superbowl cinematic. You had a version of this in
> previous waves. Please recover and implement this."

**Ships:** SIM PLAYOFFS (from the Regular Season Review, with the team alive) quiet-sims the bracket,
then plays the user's game cinematics back to back — Wild Card, then Divisional, then the
Conference Championship, then the Super Bowl, each with its full pregame intro; the champion storm
mounts when the last one closes. A team that missed the field still gets the champion reveal.

## R2-13 · THE FIX IT BOARD becomes THE DRAFT COMMAND CENTER
> "Rename to DRAFT COMMAND CENTER … REMOVE THIS TEXT: 'what this roster could have done better —
> the rooms under the line, and the players who lift them' … LIST EVERY POSITION GROUP THAT WAS
> BELOW A B ON THE ROSTER FROM BEST TO WORST. USE THE CARDS FROM THE UNIT REPORT CARD ABOVE BUT MAKE
> THEM SMALLER AND PLACE THEM WHERE THE CURRENT 'Running backs 81 OVR · #16' IS. REMOVE THE BAR
> GRAPH. RENAME THIS: 'THE SEASONS THAT HURT MOST · OVR AND THE SEASON TAPE BLENDED' TO 'CUTDOWN
> DAY'. LIST EVERY PLAYER THAT FULFILLS ALL THREE OF THESE: IS 1. BELOW 80 OVR 2. PLAYED A POSITION
> THAT IS KICKER OR HIGHER ON THE POSITION RANKINGS WIN MATH 3. DIDN'T ACHIEVE AT LEAST A 50
> PERFORMANCE RATING IN THE REGULAR SEASON. ALL THREE OF THESE NEEDS TO BE FULFILLED TO LIST THE
> PLAYER HERE. ALL THOSE PLAYERS SHOULD BE RECOMMENDED TO 'CUT'. THE BADGE 'CUT' SHOULD FADE IN AND
> OUT LIKE THE 'CAN YOU GO 20-0'"

**Ships:** a DRAFT COMMAND CENTER panel on the Season Review page — no intro sentence, no
subcaptions (the two caption lines R2-18 names are never printed). Every unit graded below B lists
best to worst as small unit-report-card cards (label · letter · #rank), no bar graph. Under the
centered Cinzel Decorative CUTDOWN DAY subtitle: every player who misses all three gates (below 80
OVR · on a spot Kicker or higher in the win-math rankings · a season rating under the scale's
average line) with a shimmering CUT badge on the same breath as the 20-0 shine.

## R2-14 · BACK TO <stage> at the top AND bottom of the guide and every footer page
> "THERE SHOULD BE A 'BACK TO X' BUTTON ON ALL OF THE FOOTER PAGES (MADDEN RANKINGS / PLAYER
> BROWSER / POSITION RANKINGS / TEAM COMPARISON / GUIDE) AT THE TOP AND BOTTOM OF EVERY PAGE IF THE
> SIMULATOR HAS STARTED. X SHOULD BE AT WHATEVER STAGE THEY ARE AT IN THEIR SEASON (E.G. DRAFT,
> PRESEASON, WEEK X, WILD CARD ROUND, DIVISIONAL ROUND, CONFERENCE CHAMPIONSHIP, SUPER BOWL)"

**Ships:** the five tool views + the Guide each carry a BACK TO <stage> pill at the top and the
bottom (the stage label rides `stageOf` — Draft, Preseason, Week N, Regular Season Review, Wild Card
Round, Divisional Round, Conference Championship, Super Bowl, Season Review, Champion). The stage
bar on the season page keeps its own next-door banner, now gated by R2-2.

## R2-15 · TE3 and DIME join the guide's position-value visualization
> "TE3 AND DIME NEED TO BE ADDED TO THE GUIDE VISUALIZATION OF WHICH POSITIONS MATTER. IF I'M
> MISSING ANY OTHER POSITION FROM THE DEPTH CHART, PLEASE ADD THEM TOO."

**Ships:** the win-math bar lists stop dropping the lightest spots — every depth-chart slot (32,
including TE3, WR4, DL5, CB4 / DIME, FB, K, P) now ranks, the near-zero ones reading `~0 wins`. The
slot names gain Tight end 3, Wide receiver 4, Fullback, Dime cornerback, Punter and Offensive guard
1/2; the field map's legend gains the Fullback it draws.

## R2-16 · OFFENSIVE GUARD, everywhere
> "In the draft board drop down menu of positions and everywhere in the project, use 'OFFENSIVE
> GUARD' instead of just guard."

**Ships:** the draft board's position dropdown reads Offensive guard; the slot names and the guide
copy follow; the genuine football terms (left guard / right guard in prose) keep their grammar.

## R2-17 · the Fills column reads `x (-y)` — and the board never side-scrolls
> "In the fills category, write x (-y) where x is the position filled and y is the flex penalty if
> it applies. Remove the word flex. And test around this issue because when the word flex appears,
> the user then needs to side scroll to reach the draft button on the draft board. That can't
> happen. The draft board should not be side scrollable."

**Ships:** the Fills cell prints `WR3 (-6)` — the spot, then the penalty in brackets; the word
"flex" leaves the column. The board's table wrap is `overflow-x:hidden` with a full-width table and
wrapping fills, so no viewport can push the Draft button off-screen.

## R2-18 · the command center panel's exact text law
> "IN THE DRAFT COMMAND CENTER PANEL Remove this text: 'EVERY ROOM BELOW A B · BEST TO WORST' and
> remove this text: 'THE LINE IS THE AVERAGE SEASON (76) · BELOW 80 OVR · KICKER OR HIGHER ON THE
> WIN MATH'. Center 'Cutdown Day' and make it a larger subtitle size style in cinzel decorative.
> Replace 'THE NEXT DRAFT IS WHERE YOU FIX THIS' with 'PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO
> 20-0' AND HAVE '20-0' SHIMMERING IN THE USER'S TEAM COLOR."

**Ships:** none of the retired lines exist; CUTDOWN DAY is centered, larger, Cinzel Decorative; the
panel closes with PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO **20-0**, the 20-0 on the shine sweep
pulled to the user's team colors.

## R2-19 · the season rating speaks the OVR scale
> "THE RATING MATH NEEDS TO EITHER CHANGE OR AT LEAST BE PRESENTED TO THE USER AS AT A DIFFERENT
> SCALE. EACH PLAYER SHOULD BE EXPECTED TO PERFORM NEAR THEIR OVR RATING. IF THEY PERFORM WORSE THAN
> THEIR OVR RATING, THAT SHOULD BE CLEAR BECAUSE THEIR PERFORMANCE IS X POINTS BELOW THEIR OVR.
> RIGHT NOW IT SEEMS LIKE AROUND 50 RATING IS THE AVERAGE RATING. YOU COULD CONDUCT TESTS ON THIS TO
> FIND THE EXACT NUMBER. THE AVERAGE RATING SHOULD BE THE MEDIAN NUMBER OF ALL THE PLAYERS OVR
> RATING IN THE DATABASE. … THIS COULD BE EITHER CHANGED IN THE BACKEND MATH, OR COULD JUST BE
> TRANSLATED THROUGH AND ALGORITHM TO THE PLAYER."

**Ships:** the translation algorithm — the internal z-scale stays, and every surface now displays
`median(OVR of every player in the database) + (rating − 50)`: an average season reads at the
median OVR, a poor one reads below the player's own OVR. The rank tags, the QBR chip (integer now),
the preview key-player cards and the command center all speak it; the Guide's glossary explains the
scale. The CUTDOWN gate applies the Owner's three rules on the new scale (a rating under the median
line = the old "under 50").

## R2-20 · "-x vs his x OVR" retires; the cards carry OVR and Season Rating badges
> "Remove this text: '-x vs his x OVR'. Put the 'x OVR' and 'y Season Rating' both on the player
> cards. Make the OVR rating a badge at the same size as the position badges. The performance rating
> should be about the same size."

**Ships:** the retired text is never printed; each CUTDOWN DAY card carries a position badge, an
`OVR` badge and a `SEASON RATING` badge in the same boxed-badge language, the same size family; a
quiet `N below his OVR` note says the gap in the Owner's own words.
