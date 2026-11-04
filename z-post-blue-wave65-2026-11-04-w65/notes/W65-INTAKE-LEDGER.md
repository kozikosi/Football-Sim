# W65 INTAKE LEDGER — the Owner's directives, verbatim, item by item

Source: the Owner's chat message (2026-11-03 HST) + Muse's w64 QA relay inside it. Owner's frame:
"You should test but not everything Muse says should be taken literally and at the same gravitas as
my comments. But you should treat Muse's information about where to find the updated weights as true."

Baseline: `Football-Sim-Z-post-blue-w64.html` md5 `8b601f06ad2938960a636f53e709148d`
(the Owner renamed the w63 build "w64" — the gh-pages bytes and hash match the w63 receipt exactly).

## The Owner's items

> "the homepage draft button IS REALLY CLOSE up right next to the simulator footer button. Please have the Draft button maintain a distance from the footer but also not be right next to the two dropdown menus."
- The 17vh top margin (the not-next-to-the-dropdowns law) stays. Add a bottom gap so the button never meets the footnav: the setup panel gains a floor margin and the footnav's top margin grows.

> "IN A SUPER SMALL WINDOW, THAT SIMULATOR BUTTON IS CONSTANTLY ENCROACHING UPON THE BOTTOM PANEL OF THE PAGE. THE KEY IS MORE TO MOVE THE SIMULATOR BUTTON AND THE WHOLE FOOTER DOWN SIGNIFICANTLY."
- The footnav stops floating over content: the sticky thumb-reach law (≤760px + coarse pointer) retires — the footer sits in flow, pushed well down (top margin 64px+, and a hard gap from the panel above it). ← interpretation flagged: "move down" = unstick + bigger top margin, not fixed positioning.

> "CONSIDER ADDING ANY MORE ADVANCED STATS OR BADGES THAT ARE PRESENT ELSEWHERE IN THE PROJECT TO THE 100 SEASON BADGES IF THEY MAKE SENSE"
- The 100-seasons hero row (zpb100More) gains the site's other advanced badges that the aggregate already computes: turnovers per game, sacks per game, points allowed per game, and the best single-season point swing — the shapes the site's other advanced panels already wear.

> "BACK TO SEASON BUTTON FROM 100 SEASONS SHOULD BE GLOWING IN THAT TEAM'S COLOR"
- The 100-seasons "Back to season" button becomes BACK TO SEASON, glowing in the team ink (--tTA/--tTAd takeover tokens, the autosave chip's law), Cinzel Decorative, pill.

> "THE 'SIM GAME' AND 'SIM SEASON' BUTTONS SHOULD BOTH THE SAME SIZE. THEY SHOULD BOTH BE THE SMALLER SIZE WHICH IS CURRENTLY THE SIM GAME BUTTON. THEY SHOULD BOTH BE ON A SEPARATE PANEL ABOVE FROM THE PLAY THE X PANEL. SIM GAME AND SIM SEASON WOULD LOOK BETTER WITH THE OTHER TABS IN THE HEADER"
- Both leave the Week panel and ride the header tab row (SEASON · YOUR ROSTER · TEAM COMPARISON · SIM GAME · SIM SEASON), both at the zpb-ctasmall size. The duplicate-ID SIM SEASON in the Week panel (a dead second button today) retires. The header SIM SEASON only shows while phase==='regular' (it wrongly survived onto the Super Bowl review page — see the Owner's SB item below).

> "THE PLAYERS ON YOUR FULL DEPTH CHART SHOULD FADE INTO THE SCREEN AT LEAST 0.50 SECONDS FASTER"
- .zpb-dfc2 beat 0.35s → 0.12s and the fade .4s → .3s: row N arrives 0.23·N + 0.1s sooner — every player from the third row on is ≥0.5s faster, the cascade ends ~7s sooner. ← interpretation flagged: per-beat cadence, not a literal −0.5s delay subtraction (which would break the w37 cinematic hold). The formation map keeps its 1s law.

> "THE SPECIAL TEAMS PLAYERS ARE POORLY ALIGNED TO THEIR PANEL IN THE 'YOUR ROSTER' TAB. IN MY SMALL WINDOW THEY ARE LITERALLY CROSSING OVER THE RIGHT BOUNDARY OF THEIR PANEL. THEY SHOULD BE ALIGNED TO THE LEFT LIKE THE OFFENSE AND DEFENSE. YOU CAN KEEP THE HORIZONTAL LINES IN THAT SPECIAL TEAMS PANEL AS WELL"
- The A17 centered-flex ST pane retires: the ST zone rows render exactly like offense/defense (grid, left-aligned) and the horizontal lines come back (border-top restored). Measured: the centered inline-flex rows with long names were the overflow.

> "AT THE BOTTOM OF THE 100 SEASONS TABS, THE YOUR ROSTER TABS, BASICALLY ANY PAGE ON THE ENTIRE SITE, THERE SHOULD BE A 'BACK TO SEASON' BUTTON GLOWING AT THE BOTTOM."
- One universal, in-flow BACK TO SEASON button at the bottom of .wrap (above the footer nav), glowing in the team's color, shown whenever a season exists and the screen is not the season tab itself (the 100-seasons view, Your Roster, Team Comparison, and every footer page: rankings, browser, position rankings, home comparison, guide). No season → no button.

> "THE TEAM COMPARISON FUNCTION WITHIN THE SEASON TAB IS STILL NOT FUNCTIONING. THE IMPORT OF THE STARTER BY STARTER LOOKS GREAT BUT THE TWO PANELS ABOVE IT AREN'T FUNCTIONING WELL. THE DROPDOWNS ARE AVAILABLE BUT THEY ARE IN A HUGE PANEL AND THEY LOOKS TERRIBLE IN A SMALL WINDOW. THEY SHOULD LOOK MORE LIKE THE TEAM COMPARISON FOOTER PAGE."
- The comparison tab's two broken panels (the stretched 340px filter labels + the separate score panel) retire. One header panel copies the footer page's exact pattern: the two custom pill dropdowns in the zpb-cmphead row with the X vs Y score between them; narrow screens stack the score on its own centered line first (the Owner's own w63 law: "the scores 'x vs y' can go on their own line").

> "ON THE TEAM COMPARISON FOOTER PAGE, THE X VS Y SCORE IS COVERED UP BY THE DROPDOWN MENUS IN A SMALL WINDOW, THEY NEED TO BE MADE VISIBLE IN A SEAMLESS WAY AND THAT PROCESS COPIED FOR THE TEAM COMPARISON TAB WITHIN THE SEASON."
- .zpb-cmphead gets the narrow law: ≤760px the score takes its own full-width centered row above the two selects (grid-template-areas). Both surfaces share it.

> "IF YOU ENTER THE YOUR ROSTER OR TEAM COMPARISON TABS OR THE 100 SEASONS TAB DURING THE SEASON, THERE SHOULD BE A 'BACK TO SEASON' BUTTON AT THE TOP AND BOTTOM OF THE PAGE. LEAVE THE 'SEASON' TAB THERE TO TOGGLE BACK ON AS WELL."
- Top: Your Roster and Team Comparison each lead with a compact panel carrying the glowing BACK TO SEASON button; the 100-seasons header row's button becomes it. The SEASON tab stays untouched in the tab row.

> "The two dropdown menus are slightly different sizes. Please make them match at the bigger size. If you could make them more pill shaped to match the draft button that would be better."
- The comparison dropdowns (both surfaces) share one size (the bigger) and wear the pill shape (border-radius 999px, the DRAFT button's silhouette) via the custom zpb-selbtn family.

> "On the Player browser, the Team drop down menu has a weird dot in the drop-down menu at default static. That should be replaced with 'ALL TEAMS'. 'ALL POSITIONS' SHOULD BE CAPITALIZED AS WELL AS SHOULD 'SEARCH PLAYER NAME' AND REMOVE THE ELLIPSES."
- Root cause found: the custom select's face falls back to a middle dot when the value is '' — that is the dot. teamFilter now reads ALL TEAMS (and the opened menu gains an ALL TEAMS row so you can come back). The position button reads ALL POSITIONS, the search placeholder reads SEARCH PLAYER NAME with no ellipses.

> "DO YOUR BEST TO CHANGE ALL UI/UX TO REFLECT CLAUDE'S NEW WEIGHTS... THE VALUES ON THE BUTTONS ON THE POSITION RANKINGS PAGE AND THE BEAUTIFUL POSITION RANKINGS VISUALIZATION ON THE GUIDE PAGE WOULD HOPEFULLY CHANGE AND ANYWHERE ELSE THE WEIGHTS ARE EXPLICITLY LABELED SHOULD CHANGE"
- Claude's de60e05 table (architect/engine-and-seats, Owner-approved) is embedded as the site's displayed weight scale (QB 1000 anchor; 1 unit = 0.00254 wins over a 70→90 upgrade):
  QB 1000 · WR1 525 · DE1 520 · OT1 430 · CB1 430 · DE2 405 · OT2 400 · DT1 410 · CB2 340 · C 320 · WR2 295 · TE1 295 · OG1 290 · OG2 290 · RB1 235 · WR3 180 · DT2 305 · MIKE 265 · FS 265 · SS 265 · WILL 245 · CB3/NICKEL 280 · DL5 145 · K 200 · RB2 80 · TE2 60 · FB 30 · DIME 40 · SAM 35 · TE3 10 · WR4 10 · P 100 (+ SS2/FS2/LB4 depth spots at the depth tier).
- The Position Rankings buttons, the Guide's tier visualization, the Guide's per-slot table (wins from a 70→90, wins per +1 rating) and the MODEL preset in ADJUST THE WEIGHTS all read the new table. The engine math itself is untouched (the Owner: "your actual engine and during the game screen don't have to function perfectly off these weights").

> "ON THE DRAFT BOARD, THE VERTICAL BAR THE INTERSECTS THE FIRST LETTER OF THE PLAYER'S NAME IS STILL THERE. PLEASE REMOVE THAT BAR."
- Root cause found: the w57 law killed the inset bar in light mode only — the dark-theme rules re-add an inset 3px shadow on the first cell. The bar now retires in every theme on the draft board (scoped to #draftTable2).

> "REMOVE THIS TEXT: 'Roster locked — preseason setup is the next step.'"
- Removed verbatim; the stage keeps the button and the 20-0 line.

> "THE START PRESEASON BUTTON SHOULD BE COPIED AND ALSO AVAILABLE AT THE BOTTOM OF THE PAGE, LIKE ANY BUTTONS THAT DRIVE LINEAR PROGRESS THROUGH THE SIMULATION."
- The post-draft page gains a bottom panel with the same START PRESEASON → pill (the linear-progress footer law, w63).

> "REMOVE THE SEASON STATS PANEL FROM THE WEEK 1 PREVIEW. NO NEED TO HAVE IT THERE JUST TO SAY THIS: 'Roster locked — preseason setup is the next step.' JUST REMOVE THE WHOLE PANEL FROM WEEK 1 GAME PREVIEW."
- The stats panel on the Week 1 preview is the Season stats / League leaders tabs panel, whose body before kickoff reads "No games played yet · your players' season totals will build here as you go." Directive: while zero games are played, that panel does not render on the season page; from Week 2 on it returns as today. ← interpretation flagged: gated on zero games played, not on the week number alone (the roster-locked sentence itself lived on the stage above and is removed by its own item).

> "IN A SUPER SMALL WINDOW, THE DURING THE GAME PREGAME CINEMATIC STILL COVERS UP THE HORIZONTAL LINES. PLEASE FIX. YOU JUST NEED TO MOVE THE TEAM LOGOS AND THE KEY PLAYERS DOWN A BIT."
- The ≤600px pregame law: the marquee block's top padding grows (22px → 64px) so the title, the logos and the key-player rows sit lower, clear of the panel's header line; a very short window shrinks the logos a touch so the fan still fits.

> "IF THE USER'S TEAM IS IN THE 'SIM PLAYOFFS' BUTTON NEEDS A SECOND WARNING PAGE THAT ASKS YOU IF YOU ARE SURE YOU WANT TO SIM THE PLAYOFFS. SHOULD BE THE SAME FORMAT IS THE 'SIM SEASON' WARNING PAGE."
- A capture-phase confirm in the A9 format — ARE YOU SURE YOU WANT TO SIMULATE THE PLAYOFFS? / Every remaining round plays out at once. This cannot be undone. / YES · SIMULATE THE PLAYOFFS · Cancel — intercepts the playoffs sim doors (Sim Playoffs in the round panel, the tab row and the footer) whenever your team is still alive in the bracket. Missed the playoffs → no warning (spectating). ← interpretation flagged: one warning page in the same format, gated on your team being in.

> "THERE SHOULDN'T BE A 'SIM SEASON' BUTTON ON THE SUPERBOWL REVIEW PAGE ASKING YOU TO SIM THE REGULAR SEASON. THE REGULAR SEASON IS ALREADY OVER."
- The header tab row's SIM SEASON condition tightens to phase==='regular' (it showed on every non-playoffs phase, including 'complete'). The SIM PLAYOFFS header door keeps its playoffs-only rule.

> "THE 'SEASON REVIEW' BUTTON SHOULD LOSE THE ARROW AND SHOULD BE CENTERED ON THE PAGE. IT SHOULD BE GLOWING AND IN IT'S OWN PANEL TO GIVE DISTANCE FROM THE 'SUPER BOWL CHAMPIONS' PANEL"
- The sr-topbar retires. A standalone centered panel leads the Super Bowl page: SEASON REVIEW (no arrow), the glowing big-CTA treatment, its own panel with real distance from the champion banner.

> "THERE IS A GLITCH WHERE IF YOU HAVE ALREADY RUN THE 100 SEASONS, WHEN YOU HIT THE SEASON REVIEW BUTTON FROM THE SUPER BOWL GAME REVIEW PAGE, THE SEASON REVIEW BUTTON TAKES YOU TO THE 100 SEASONS PAGE. THAT IS WRONG. THE SEASON REVIEW BUTTON SHOULD TAKE YOU TO THE SEASON REVIEW PAGE."
- Reproduce-then-fix in the live probe; the review door is pinned so SEASON REVIEW always lands on the review page, with a battery assertion on the exact path (SB review → 100 seasons → back → SB page → SEASON REVIEW).

## Muse's w64 QA (the Owner relayed; weights intel = true, the rest tested)

> "P-232 STILL OPEN (P0) — model lineup mispositions players... Root cause (unchanged): your embedded FLEX table still contains QB:{RB:6,WR:6}... Please sync your embedded table to REV 4."
- SYNCED — the embedded FLEX table is now tools/mathlab/flex.json REV 4 verbatim, translated to the site's position tags (OT→LT/RT, OG→LG/RG, EDGE→REDG/LEDG, ILB→MIKE, OLB→WILL/SAM, RB→HB, NICKEL→CB3, DIME→CB4): QB {FS:10} ONLY (the Owner's 29 Oct word); P→K now costs 4 (K→P stays free); the SS/FS/CB nickel/dime rows and every other row re-measured. The in-code comment no longer attributes QB→RB/WR to the Owner.
- The draft's late auto-fill (zpbFillAllLineups) also respected a flat −9 for ANY player into ANY slot — it now obeys the flex table: only legal fills, at the real flex penalty. This was the second half of the absurd lineups.

> "AUTOSAVE CHIP IS A BROKEN PROMISE... Either implement restore or remove the chip."
- IMPLEMENT RESTORE (the honest completion). On boot with no live season, the page peeks slot A: if a save exists it offers a RESTORE SAVED SEASON chip (team ink, same family as the autosave chip). Clicking it rebuilds the season (and the draft roster behind it) and re-renders the season tab. The save envelope grows a draft section (pickRounds kept) with a backward-compatible shape: w63-era saves (raw seasonState payloads) restore through the same door.

> "PLAYER BROWSER NEEDS A WAY TO SEE BEYOND 60 PLAYERS. No page numbers — instead use infinite scroll, a 'Load more' button, or a virtualized list."
- ROOT CAUSE FOUND, measured: the pager EXISTS (PREV · PAGE X OF 20 · NEXT, built in w63) but an old "removals safety" CSS law (display:none !important on .pagbtn/.paginfo) has been hiding it since before the pager came back. The law is lifted — the pager shows. Verified live.

> "PRESEASON SETUP HEADING SHOWS THE WRONG TEAM... 'Set up the Kansas City Chiefs before Week 1' while displaying the drafted Raiders lineup."
- Tested: the heading reads seasonUserTeam() = the drafted team's name from seasonState.teams — the same source the lineup panel reads, so a wrong name there would print the wrong roster too. The probe re-plays the exact Muse path (draft as the Raiders → preseason) and asserts the heading and the roster panel name agree with the drafted team. If it reproduces, it gets fixed; if not, the finding is recorded as not reproduced with evidence.

## Build contract
- Baseline: `Football-Sim-Z-post-blue-w64.html` md5 `8b601f06ad2938960a636f53e709148d` (gh-pages, asserted on every run).
- Generator: `tools/zpb_w65.py` — asserted exact replacements + payloads + post-checks; re-runs clean from the pristine baseline.
- Batteries: the standing eight re-pointed + a new `w65_owner.js` for this round's items.
- Delivery: `z-post-blue-wave65-2026-11-04-w65.zip` + the loose HTML, download area first-class.
