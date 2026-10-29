# W33 INTAKE LEDGER — the Owner's round-33 message, verbatim mapping
Owner message received 2026-10-29 (chat) · every line below is his law. Base: w32 `fa6d9fb8` (the package copy, CHECKSUMS-pinned; the top-level repo copy is an intermediate, see build report).

| # | Item (condensed — his words rule) | Where it lands | Interpretation / flag |
|---|---|---|---|
| R1 | Light/Dark button centered underneath the footer; always visible on every screen, below the word "BROWSER" of the PLAYER BROWSER footer tab; centered in the window | footer shell | Re-land of w31#7 — must render on EVERY screen, not only where the footer shows |
| R2 | Draft board: add 3 rounds for the addition of DL5, WR4, TE3 | ROSTER_SLOTS 28→31 | Real roster slots (draftable), not display-only — flag: display slots existed since w30 |
| R3 | Draft glitch near end: sorted by GONE, 70–71 receivers read as more likely gone than 74–75 still on board — examine and potentially fix | simRecs/goneFrac/cpuPick | Diagnose empirically before patching |
| R4 | WHERE THEY LINE UP guide: DTs and right DE move up to the line-of-scrimmage row; NICKEL does not move; DIME moves to where the right DE currently is | zpbFieldMapHTML (+ mirrored on the draft belong map, flagged) | Geometry: LOS row = CB, DE1, DT, DT, DE2, CB2; second row = NICKEL left, DIME at the old DE2 x |
| R5 | Reverse highlighting: highlight a player's card → his position on the visualization lights up | draft-results belong map | |
| R6 | Expand the WHERE THEY LINE UP viz so last names fit (no initials); fix Vikings purple-bubble/yellow-text legibility | belong map + guide map | Contrast fix = per-team readable text color |
| R7 | Organize the full player-card list first, then the visualization; cards grouped by position groups; players fade in one at a time (1/s) in draft order on both viz and cards | draft results page | |
| R8 | Remove the YOUR BREAKDOWN badges directly under the visualization; keep them in the "YOUR BREAKDOWN" section | draft results page | |
| R9 | Team-detail STRENGTHS/WEAKNESSES text → badges/panel cards, same location | team detail panel | |
| R10 | Team comparison (third time): widen the panel so full team names fit the dropdowns; when compressed prefer "KC CHIEFS" over "KANSAS CITY"; Team B dropdown aligned to the very far right of the panel | comparison tab | |
| R11 | Position rankings: keep vertical stacking, narrow the panel, add team logos before team names | rankings | |
| R12 | Player browser: team logos before team names; narrow the panel a few pixels past the STR column | browser | |
| R13 | Draft-board depth chart: the "D" of DIME directly under the "N" of NICKEL | depth chart | Re-land of w32#14 — still off |
| R14 | Integer law exception: draft-board WINS to one decimal; PRIORITY one decimal (two if better) | draft board table | Owner explicitly overrides the integer law for these two columns |
| R15 | Unhighlighting a position chip removes those players even if they can flex into another position (e.g. QBs after unhighlighting QB) | draft board filter | |
| R16 | Game preview screen appears before the SEASON OPENER cinematic — ALL cinematics before the following page; page obscured in the background until the cinematic fades | prematch cinematics | |
| R17 | During the game, team abbreviations (GB, MIN) in their respective team colors | during-game UI | |
| R18 | [FUM] badge in the color of the player who fumbled | play-by-play | |
| R19 | Last drive / last two drives shown during close games: `x[3&O]y[RET]z`, `x[4&O]z`; throughout the game, especially in the CLUTCH (within 8 in the last 5) | during-game UI | |
| R20 | Confirm [BLK] is still an option for blocked FGs or punts (hasn't been seen in a while) | engine + verify | |
| R21 | Game review page: "Rush att / dropback" → "RUSH/PASS" | game review | |
| R22 | Kicker/punter ratings still too high — deflate their scoring; a K or P must be 80+ to be visible on the game preview screen | engine + preview | |
| R23 | SIM SEASON caution page: flip the CANCEL and YES buttons; YES reads "YES · SIMULATE THE SEASON" | confirm modal | |
| R24 | Post-regular-season cinematic: the series of honors earned appears BEFORE the "REGULAR SEASON IS IN THE BOOKS" panel and the playoff confetti | season-end sequencing | Re-land of w32#31 — still wrong |
| R25 | End-of-regular-season badges: win-streak "5 · W10–14" → just "5" | season badges | |
| R26 | All-Pro/Pro Bowl: the user's players obviously visible — border with a line around them + shimmer | awards | |
| R27 | Wild Card during-game cinematic glitched: announced the win immediately (belongs at the end); ~15 s pause before the game — fill it with badges and key players fading in/out; SKIP must work at any time during the during-game cinematic | cinematic engine | |
| R28 | Playoff bracket: tree diagram, March-Madness style; same panel style as the regular-season schedule; clickable panels later to review each round's games | playoffs | |
| R29 | Box score OT column: each team's OT points only (verify if already true) | box score | |
| R30 | Box score: "T" for total → "F" for final | box score | |
| R31 | Opening cinematics before the game-preview screen for EACH round of the playoffs, simple, modeled on the rivalry cinematics | playoffs | |
| R32 | Once at the Super Bowl, the "SIM PLAYOFFS" button reads "SIM SUPER BOWL" | playoffs UI | |
| R33 | The 52/48 slider bar colors reflect the two teams' colors on their respective sides | comparison / preview | |
| R34 | SIM SUPER BOWL takes you to the post-Super-Bowl page (not the play-game cinematic); the post-SB page gets a very dramatic cinematic — "be extra" | playoffs end | |
| R35 | Unit report cards text jumbled/layered — use more of a badge format; fade in one at a time like the season-review badges | season review | |
| R36 | All-Pro/Pro-Bowl/All-Playoff awards: other teams' players not in white — a neutral aligned with each player's team colors (like the homepage dropdown) | awards | |
| R37 | The All-Playoff team should be a series of player panels/badges, not a list | season review | |
| R38 | Move DRAFT PICK GRADES below the ADVANCED STATS panel on the season review | season review | |
| R39 | "VS ACTUAL NFL TEAMS" tab only on the post-draft page — not visible on the season review | tabs | |
| R40 | NEW DRAFT presents three options: "RUN IT BACK · SAME TEAM" / "CALL AN AUDIBLE · NEW TEAM" / "CANCEL" | season options | Extends w31#41 modal to the NEW DRAFT path |
| R41 | Beam: council has been helping — read the inbox files on the branch (zai-round13) and the reviews on council/beam; integrate | process | zai-round13 read this session; PRIORITY+ affordance/contrast laws folded into the sweep |
| R42 | Take extra time to make sure everything is optimized on mobile | global | Sweep at the end, re-measure overflow |

Standing laws re-attached: integers (now with the R14 exception), no white text, one shimmer (90+) / 85+ bold, Cinzel Decorative display, NICKEL/DIME caps, DL5 not ELEPHANT, PRTG, CLUTCH GAMES, SK/PRSS, guides carry explanations.

## §Interpretations awaiting the Owner's veto (w33)
1. WR4/TE3/DL5 are REAL draftable slots — the draft runs 31 rounds and the depth slots take rotation snaps on the field.
2. The LAST DRIVES recap composes from real events and real players; the yard lines are plausible values consistent with clock and score (the model does not simulate drive-by-drive field position).
3. The R4 geometry is mirrored onto the draft belong map as well (his item named the Guide map; the two maps stay identical).
4. The K/P deflate is a data-level curve, 55 + 0.5·(ovr−55): top K lands ~71, top P ~70 — it moves the draft economy honestly and keeps every K/P under the 80 preview gate.
5. The CPU "miss" reach is capped at four rating points below the team's top candidate (a few board spots, never twelve value-rows).
6. The prematch triggers stay SEASON OPENER + divisional rivalry phrases; nothing new fires in the regular season. The four playoff rounds each open with their own line.
7. The GONE column now reads per-player truth from the draft replays; the priority math is untouched.
8. The unit report card keeps its badge grid (w31 law) with the 1/s stagger and wrap-anywhere text — the layering is gone.
9. The All-Playoff panels and the awards use honorLineHTML: the user wears the bordered shimmer chip; every other name wears his own team's readable color.
10. The bracket tree is a 7-column mirrored layout (AFC WC→DIV→CHAMP, SB, NFC CHAMP→DIV→WC); played games click open into the full game review.
