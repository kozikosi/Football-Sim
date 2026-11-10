# W89 INTAKE LEDGER — the Owner's verbatim asks (2026-11-10 chat)

Source: the Owner's w89 directive (this chat). Every line below is his words, mapped to a build item.
§1 SEARCH / BOARD
  1. "In all the search menu, the default static page should just show 'SEARCH' in the panel."
     → PLAYER BROWSER: with no query/pos/team filter the panel shows a quiet SEARCH splash instead of the full table (idle check in renderPlayers + #playerSearchSplash element + CSS).
  2. "Remove the subtitles 'all on' and 'all off' from the clear and all buttons on the draft board."
     → the data-all/data-none pair: <i>all on</i> / <i>all off</i> retire. (The weights panel's ALL keeps its <i> — not named.)
  3. Depth chart (draft page): "+14 WINS ABOVE A REPLACEMENT-LEVEL LINEUP" removed; the "+x" wins number next to players removed.
     → both zpb-rbadge badges in renderDraftRosterTotal retire; the dwar span + the war const retire; dgrid goes 3 columns (base + the ≤480px override); the DIME row's empty dwar span retires.
  4. "Remove this too: '13OF 32 STARTERS'" → the same draftRosterTotal line (both badges, one element).
§2 BANNERS / TABS / DOORS
  5. Two banners when scrolling during the season — keep the one backed by the horizontal line across the whole page.
     → zpbAdvRail (full-width, border-bottom) STAYS; the floating zpb-stagebar pill RETIRES (update fn stubbed, bar hidden/never created). Try-again duty moves to the champion top bar + the rail.
  6. The big tab cluster (incl. 100 SEASONS) at the top of the season panels → bottom of the page, a horizontal side-scrolling strip like the footer.
     → the zpb-cygops cluster moves to #zpbSeasonDock: sticky bottom above the footnav, nowrap + overflow-x + scroll-snap + hidden scrollbar, same host ids (zpbDraftOps/zpbSimTabsHost/zpbBtsHost) so every existing wiring keeps working.
  7. RUN IT BACK up on the top cluster between NEW DRAFT and 100 SEASONS (not next to BEGIN PLAYOFFS on the season review page); BEGIN PLAYOFFS available in the scroll-down header.
     → dockRunItBackBtn inside zpbDraftOps after NEW DRAFT (100 SEASONS appends after it → NEW DRAFT · RUN IT BACK · 100 SEASONS); the regular-review top row keeps BEGIN PLAYOFFS + SIM PLAYOFFS, RUN IT BACK leaves it; zpbTryAgainBtn joins the AdvRail IDS (beginPlayoffsBtn already rides).
  8. SIM GAME not available on the Super Bowl champions page.
     → syncSimTabs removes simGameBtn when phase==='complete' (belt) + the dock never renders one at complete.
§3 BOX SCORE / PLAYOFFS
  9. Vertical lines between the quarters and F in team colors; the natural dark-mode vertical line before each team name removed.
     → linescore th/td data-column border-left (neutral in the header row, team ink --zrb/--zrbd in the team rows); dark-mode tr.zpb-trow td:first-child inset bar scoped out of .linescore.
 10. #1 seed bye: the wild card top panel shows the most likely divisional opponent matchup.
     → the bye branch renders matchupCardHTML(feat) with the M11 pick (the lowest seed playing this round) + a slim dsub line.
 11. "AFC #1 or NFC#1 as a subtitle should be golden and shimmering like it is in the regular season."
     → seedLabel: seed===1 wears zpb-shm zpb-conf1 (the same treatment recFull gives "#1 AFC").
 12. Rotating polygons in the sides of the playoff matchups in the user's team colors + brainstorm more during-game dynamic features.
     → the w63 round skies (zpb-rd-*) ride var(--tA, var(--accent)) (the user's team ink; the SB sky keeps its golds as the secondary wedge); NEW during-game dynamics: the momentum tide (a two-color bar that swings with every event), the command read (the score gap in the leader's ink after every score), the big-play flash (the panel's border pulses the scoring team's ink on every 6-point score).
§4 DRAFT REVIEW / PRESEASON
 13. Full names on the draft review fade-in cards on mobile (currently initials first).
     → the w60 name ladder exempts the breakdown cards: .zpb-gname:not(.zpb-dbk *).
 14. Remove the "SET UP THE X BEFORE WEEK 1" panel — a cinematic shows before the preseason page; the first thing on the preseason page is "1. LINEUP".
     → hdr panel retired; zpbPreseasonCine (once per season, reduced-motion safe) plays the setup story over the page; the lineup h3 reads 1. LINEUP.
 15. 'NEW TO FLEXING? READ THIS FIRST' → 'NEW TO LINEUP?'.
§5 COACHING PHILOSOPHY
 16. WHY THIS STYLE? + OFFENSE: EVERY STYLE + DEFENSE: EVERY STYLE → ONE dropdown "WHY THIS STYLE?".
 17. "WHAT DO THESE TERMS MEAN?" moves above it (summary reads the Owner's exact words).
 18. The philosophy paragraph ("Your coaching philosophy is how your team likes to play by default…") retires.
 19. Both philosophy selects' static default reads AUTO.
 20. The aggressiveness Style dropdown's second (uglier) dropdown: the native select sat inside a <label> — the label activation opened the OS picker under the custom pop. The label becomes a div; the native layer never opens.
 21. "WHAT IS A 2 POINT CONVERSION" (renamed from HOW A 2 POINT CONVERSION WORKS): the two attributes become badges — KICK 1 PT · 94% / GO FOR 2 2 PT · 48%.
 22. The "Both choices are worth about the same…" explanation: each sentence on its own line.
§6 GAME DAY / CINEMATICS / CHAMPIONS
 23. Mobile game preview: the 44/56 bar collapses the line → ≤640px the strip stacks: teams row, the bar full-width below, smaller logos/labels.
 24. "NO. 1 SEED · FIRST-ROUND BYE!" → "NO. 1 SEED" / "FIRST-ROUND BYE!" on two lines, no dot.
 25. Winning the Super Bowl skips the conventional SB page — only the "YOU WON THE SUPER BOWL" page plays, more dramatic, dynamic text, staggered on second-long delays.
     → zpbPostSuperBowlCine hands the win straight to zpbSuperBowlVictoryCine; the victory page gains THE FINAL WHISTLE sub-line, a cycling dynamic line (the real season record, the real playoff record, the banner line), and a ~1s entrance cadence.
 26. Champions page: TRY AGAIN TO GO 20-0? in a horizontal bar across the entire top; SEASON REVIEW below it; RUN IT BACK only at the bottom in the dock.
§7 SCOPE
  67 Cakepanz: ignored this chat (the Owner's word).
§8 R2 — the Owner's second round, same chat ("A lot of things i don't like with this version so i'm not pushing it. keep working on it and send it back as w89.")
 27. Remove from the guide page: "The Wins value of every starting spot · extra wins per season, 20-OVR upgrade at the local rate".
     → the guide's prcap line retires in zpbPosRankHTML (the closing </div> of .zpb-posrank stays). The draft-board's twin caption ("· QB anchored at 1000") is NOT named and stays.
 28. Remove "Autosave / A saved season is waiting — Champion 11/8 03·12" and "also remove the not now button."
     → the bubble's kicker, body and Not-now button retire — one quiet pill remains: RETURN TO YOUR SEASON (zpbRestoreSeason rides only this door, so the door itself stays; the literal ask keeps the restore affordance alive). The bubble still hides itself once the season is restored or a fresh draft starts.
 29. Remove the little "Style" text above the dropdown on the coaching philosophy panel in the preseason page.
     → the "Style" word inside the aggressiveness narr div retires (the only >Style< label in the product; the style tables' <th>Style</th> headers are table columns, not labels, and stay). The div form from law 20 stays — the second-dropdown glitch fix is untouched.
 30. "'sim game' and 'sim playoffs' should be at the top of the page. leave the buttons at the bottom of the page as well. but they should be visible at the top of the page as well."
     → #zpbTopSimStrip: a right-aligned strip as the FIRST thing on the season page (under the view tabs), mirroring the dock's doors exactly — SIM GAME while this week's game is up, SIM SEASON through the regular season, SIM PLAYOFFS through the bracket. The preseason page never mounts it (1. LINEUP stays first — law 14); the champions page mounts none (nothing to sim — law 8). Top doors ride the Head ids (simGameBtnHead/simSeasonBtnHead/simPlayoffsBtnHead) so every dock wiring stays unique; the A9 SIM SEASON question and the W65-D SIM PLAYOFFS warning adopt the Head ids (capture handlers), so both top doors ask first exactly like the bottom ones. Interpretation on record: SIM SEASON rides the top strip too (the strip mirrors the dock's door set; the Owner named the two season doors but asked for "the buttons" at both ends).
  + Found while wiring 30 (pre-existing since w65, fixed): the dock SIM GAME button gained a new click listener on every re-render (the element persists across renders; the render wiring never guarded). A stacked click re-fired zpbGameReplay — the game replay double-mounted on one click after a couple of view switches. The wiring now guards on the shared _zpbW65 flag — one wiring, one sim, one replay. Regression-proved live (R2d: double renders, one click, calls===1).
