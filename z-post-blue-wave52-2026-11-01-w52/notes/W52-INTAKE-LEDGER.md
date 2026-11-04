# W52 INTAKE LEDGER — the Owner's words, verbatim, item by item

Wave 52 · received 2026-11-01 · one directive with fifteen named moves + one thank-you.

> "REMINDER THAT THE LAST VERSION YOU WORKED ON WAS w51 and you are now working on w52"
>
> "There is still a delay between the where your players line up and the player cards appearing
> underneath. Maybe because they are activated by user motion now, and the user sees the line of
> scrimmage visualization first? Please spend most of the session really making sure the motion
> is synced here."
>
> "It looks like Q and time in the quarter are written in cream. Please change it to the netural
> color that changes based on the team that is on the word "FINAL" AT THE TOP OF THE DURING THE
> GAME SCENE."
>
> "IF THE USER WINS COACH OF THE YEAR REPLACE [name] WITH "YOU" INSTEAD OF X WHERE X IS THE
> COACH'S NAME."
>
> ""Kyle Shanahan led them to 13 wins against 9 projected from the roster's own ratings (+4)"
> ALSO REMOVE THIS TEXT."
>
> "ON THE AWARDS — HAVE THE PLAYER'S POSITION BE THE FIRST BADGE WRITTEN AS "#X Y" WHERE X IS
> THEIR RANKED NUMBER AT THEIR POSITION BY RATING AND Y IS THEIR POSITION. REMOVE THE PLAINTEXT
> POSITION THAT IS CURENTLY RIGHT BELOW THE NAME."
>
> "AROUND TARGETS AND CATCHES OR THROWS AND COMPLETIONS THERE IS A BORDER AROUND THE BOX THAT IS
> DASHED. REMOVE THIS. ONLY SOLID BORDER FOR THE BADGES."
>
> "STATISTICAL CHAMPIONS — REMOVE THE "SCRIMMAGE" FROM SCRIMMAGE TOUCHDOWNS. FOR TOUCHDOWNS,
> SACK, INTERCEPTIONS, AND TACKLES, AND RETURN YARDS, THOSE PLAYER'S BADGES SHOULD BE LISTED
> BYSEDIE THEM, ESPECIALLY OF THE STAT THEY WON FOR, BUT YOU CAN INCLUDE ALL OF THEIR BADGES."
>
> "IN THE MATCHUP MATH, THE 49ERS BAR GRAPH LOOKS LIKE RED ON RED SO YOU CAN'T SEE THE
> DIFFERENCE. PLEASE CORRECT AND CHECK EVERY TEAM IN LIGHT AND DARK MODE."
>
> "REMOVE THIS TEXT: "the league's top-rated QB profile, carrying Buffalo Bills to 12 wins""
>
> "IN ADVANCED STATS, CLUTCH GAMES AND "TOUCHDOWNS PER GAME" WRITE ALL THE "/ G" AS "PER GAME".
> PLESE FIX IN TOUCHDOWNS PER GAME AND CLUTCH GAMES, THEIR NUMBERS ARE WRITTEN IN A DIFFERENT
> COLOR THAN THE RESTS OF THE ADVANCED STATS NUMBER. PLEASE MAKE THEM ALL THE SAME."
>
> "REMOVE THIS TEXT: "SAN FRANCISCO 49ERS ARENT PLAYING THIS ROUND THIS IS THE GAME EVERYONE IS
> TALKING ABOUT""
>
> "IF THE USER'S TEAM HAS A BYE IN THE WILD CARD ROUND, MAKE SURE THE TOP GAME SHOWN ON THE WILD
> CARD SCREEN IS THEIR MOST LIKELY OPPONENT."
>
> "If the user's team plays in the superbowl, the cinematic showing the winner shows before the
> actual during the game cinematic is played. Please fix. The user should actually see the
> superbowl be played and please add even more to the pregame superbowl cinematic to enhance the
> drama, beauty, intensity, and fanfare. You can even add in a little halftime show."
>
> "IN THE WILD CARD ROUND PLAYOFF BRACKET WRITE THE @ SIGN ON IT'S ON LINE (IF THE SCREEN IS
> COMPRESSED AND VERTICAL) OR WRITE THE @ AND BOTH TEAMS ON THE SAME LINE."
>
> "Don't single out one player in the unit report card cards. This is for unit analysis. the
> Running back stats should be for all backs. only the Qb and the kicker is unique really but
> still don't put his name on the cards in the unit report card."
>
> "THE PLAYOFF CINEMATICS ARE AMAZING. THANK YOU SO MUCH."
>
> "TAKE YOUR TIME TO COMPLETE THESE TASKS."

## Reading (his law, split into the moves it names)

1. **M1 · SYNC (the session's main work).** The during-game pregame beat: the players line up
   (line-of-scrimmage visualization) while the player cards appear underneath — still a delay
   between the two. Hypothesis: the cards are activated by user motion now, so the LOS viz
   renders first and the cards wait. The motion must be synced: line-up and cards land together.
2. **M2 · The quarter chip joins the neutral team ink.** "Q" and the time in the quarter are
   cream — they must read the same neutral color as the word FINAL at the top of the during-game
   scene (the site's neutral team ink --txM light / --txd dark). The w51 cream law (.zrl-t with
   --zcream) is retired by his own words.
3. **M3 · COTY reads "YOU"** when the user's coach wins Coach of the Year, and the
   "led them to N wins against M projected" sentence is REMOVED.
4. **M4 · Awards badges:** the first badge is the position as "#X Y" (X = the player's rank at
   their position by rating, Y = the position). The plaintext position under the name is REMOVED.
5. **M5 · Badge borders:** the dashed border around the targets/catches (or throws/completions)
   box is REMOVED — only solid borders on badges.
6. **M6 · Statistical champions:** "Scrimmage" is dropped from Scrimmage Touchdowns; the
   champions' badges (especially the one for the stat they won) are listed beside them.
7. **M7 · Matchup math bars:** the 49ers' red-on-red is fixed; every team checked in light AND
   dark mode.
8. **M8 · Remove** "the league's top-rated QB profile, carrying Buffalo Bills to 12 wins".
9. **M9 · Advanced stats:** "/ G" renders as "PER GAME" in Touchdowns per Game and Clutch
   Games; their numbers use the same color as every other advanced-stat number.
10. **M10 · Remove** "SAN FRANCISCO 49ERS ARENT PLAYING THIS ROUND THIS IS THE GAME EVERYONE IS
    TALKING ABOUT".
11. **M11 · Wild-card bye:** when the user's team has the bye, the TOP game on the wild-card
    screen is their most likely opponent's game.
12. **M12 · Super Bowl cinema:** the winner cinematic must not play before the during-game
    cinematic when the user's team is IN the Super Bowl — the game itself must be seen first.
    The pregame Super Bowl cinematic gains drama/beauty/intensity/fanfare — a halftime show.
13. **M13 · Wild-card bracket @:** on a compressed/vertical screen the @ sits on its own line;
    otherwise the @ and both teams share one line.
14. **M14 · Unit report card:** no single player is singled out — RB stats are for ALL backs;
    the QB and kicker are unique but their names stay OFF the cards.
15. **M15 · Standing laws ride along** (dot law, one-row map, beneficiary colors, continue pill,
    draft inks, shimmer cascade) — verified intact, never re-widened.

## Veto / retirement notes
- The w51 cream law (.zrl-t { color:var(--zcream) !important }) is retired by M2 — the clock and
  the quarter chip ride the neutral team ink (--txM/--txd) from now on. --zcream may keep
  existing but must lose its !important jurisdiction; never re-widen. (DONE — the token survives
  unused; the w51 battery's R1a assert is rewritten to the new law.)
- The w39-era SB flow (winner cinematic before the game) is retired by M12's first half. (DONE —
  the w33 (R34) skip law with it: the SB replay opens for the user's team; the storm waits for
  the whistle; SIM PLAYOFFS still runs quiet.)
- The look-gate's `:not([data-zseen])` release filters are retired by M1 — data-zseen means
  OBSERVED; releases select by .zpb-seen class state only. (DONE — recorded in START-OF-CHAT §5.)
