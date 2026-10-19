# CONSOLIDATED STATE (read this first after any compaction)
File: /mnt/user-data/outputs/nfl_power_rankings.html (single file, one <script>). Artifact https://claude.ai/artifact/JhPfstYFVqmkrm1tAiVRg8 (v16 published 10-18; user said no need to ask before publishing).
Docs artifact "Madden Sim Explained": https://claude.ai/artifact/2JQPuojuDt99JAYvxe9uGV (docs project 0a87334f-c1bf-4bcc-a116-848d59a06c82, tab 3813fe82-c0d9). Filled: words, machine, parts 1-6. Pending block ids: mbx2brpm9p7.357 (study guide) .358 (interview Q&A) .359 (rebuild blueprint) .360 (limits). Fix "rookie-style leaders" in Part 6; add flex table, new stats, returner math, overtime, validation. Send full HTML backup with SendUserFile when user says (user: "after a few more sessions"; user asked on 10-17 to send it now with doc).
Tests: `bash mk.sh` (extract script, node --check); `node pw4.js` (draft->season->playoffs->100-sim; handles user missing playoffs); `node phone.js` (390px overflow check); `node validate.js` (real 2025 wins: r=.66, rho=.69, rmse 2.6); t30/t32/cal2/cal3; tests/run_all.sh. Patch scripts in p/.
Style rules: plain informative language; no "expected scoring"/"before kickoff" in post-game text; critique only 85+ OVR players; stats near NFL records; 32.5 pts/win; user team shown in blue; flex is realistic (user does NOT think it's an exploit).
Key math: model weights = round(slotWinsPerOvr/max*700/5)*5 (0.47% error); WINS_BASE 70; flex table FLEX (QB cannot flex); returner score .5 spd+.2 agi+.2 cod+.1 awr, RET_PTS 2.36*(exp((score-82)/45)-lg) in matchupModel; draft board shows each player at best-priority open slot.
User wants for the future: guided tour for interviewer (not now), HTML backup after a few sessions, sharing help (free plan: explain Share menu/ or give HTML file; netlify drop).

# DONE this session (v8-v15): flex v2, FLEX VALUE tag, tens->700 weights, sim playoffs btn, literal personnel names (11/12/13/21/22), returner score+ranked dropdown+now affects sim math, awards for returners, pro-bowl OL fix, chronological recap (final drive integrated), 85+ critique rule, stars faceoff in previews, lineup group scores, why-box, playoff lineup editor, plain-language 100-season text, validation section, phone CSS, bigger fonts.

# TODO (ROUND 6, user attachment ebba0c05; these take precedence)
1 Draft depth chart (right): consistent "Name (OVR) wins" alignment (name | OVR | wins columns).
2 CPU draft randomness: team avg rating spread ~75-86 (currently 80-83); don't let QB dominate; add noise/varied team needs.
3 Remove "Percentile rank (100% = best in the league) across key units" from draft results.
4 Season setup text "Simulate a full 17-game regular season ..." larger than numbered list; "it"->"your team"; "Super Bowl!".
5 Preseason flex editor: QB slot misaligned.
6 Move returner dropdown+explanation to blank space under Kicker in special teams of lineup editor; rewrite "Three decisions, all optional..." text accordingly; returner available through season+playoffs (lineup panel).
7 Remove phrase "with no strong lean either way" everywhere.
8 Stars faceoff UI: user's players in blue; 90+ look special vs 80s.
9 Post-game narrative font same size as regular text (still too small).
10 Fully integrate narrative + turnovers: every score and turnover narrated chronologically with scorer names (e.g., who scored for each team, Campbell punch-out in 1st half). Final drive integrated.
11 User's players/team names (e.g. "(Chiefs)") in blue everywhere incl. key players menu.
12 Game-ball sentence: indent last sentence, exclamation point.
13 Game plans paragraph: break into indented paragraphs, new paragraph when switching team; "through this defense" -> "through your defense" when opponent attacks user.
14 "two-point conversion" -> "2-Pt Conv" except guide; explain 2pt + why team goes for 2 vs XP; preseason option: Cautious/Balanced/Aggressive for 2-pt, 4th downs, etc. with math + description (still go for 2 when down 8/11 late).
15 League leaders table font overflow fix.
16 "What is a fleet?" (flex guide) says QB can become RB: fix (QB cannot flex).
17 Returner in Special Teams area throughout season+playoffs.
18 "Your Team's Identity" text bigger.
19 Division matchup label: more eye-catching (no flame emoji); add Rivalries; show team record + conference rank + division rank; center-align both teams around '@'.
20 "Your team has not played a playoff game yet..." -> "Your team missed the Playoffs" when true.
21 More Advanced Stats; Season Review as separate page after Super Bowl (button); show regular-season AND playoff awards there; if Sim Playoffs, show Super Bowl page then Season Review button.
22 Playoff bracket: "Final" label aligned the same.
# LOWER PRIORITY / STILL OPEN
- Doc finish (.357-.360 + Part 6 fixes) and send HTML backup (user asked now).
- Sharing explanation for friend (free).
- Guided tour (future).

# STATUS 10-18 (v16 published, HTML backup sent)
DONE round 6: 1 depth grid, 3,4,5,6,7,8,9,10 (playByPlay: scorers per quarter, defensive TDs folded into turnover items),11 (.ub MutationObserver blue),12,13,14 (AGGR_INFO, lateTwoPt, preseason option 3),15,16,17,18,19,20,21 (Season Review page + teamAdvancedHTML),22.
Chat is attached to project "Football Sim".
NOT DONE: item 2 (CPU draft spread is structural: 832 of 1148 players drafted, so weighted team avg stays ~79.5-83.5; bias/noise/miss variety added but cannot reach 75-86 without a draft hit/miss mechanic; ask user).
Still open: Explained doc (.357-.360, Part 6 fix, flex table, new stats, returner math, OT, validation), sharing explanation, guided tour (future), 2-Pt Conv narration only in recap timeline.

# MASTER TASK LIST (user approved ranking on 10-18; "agree with everything"). Work top to bottom across sessions.
## NOW (10-18 asks)
A. Confetti: conference championship win (medium), Super Bowl win (big + gold trophy/fireworks). Small rewards for other wins: playoff clinch, division title, #1 seed/bye, 10+ wins, win streak toasts, game ball star pulse. Respect prefers-reduced-motion.
B. MOBILE IS TOP PRIORITY: no sideways scrolling anywhere (user complaint). Smaller text, vertical stacking, tables -> stacked cards at <=760px. Audit EVERY view at 390px with phone.js (extend: draft board live, results tabs, team rankings, player browser, position rankings, comparison, guide, season weeks, recap, playoffs, review, 100-season). Fix every table/grid overflow.
## TIER 1 (bundle next release)
1 Season record cap bug (totals go down): per-game caps + display cap via cappedStat; no random subtraction (accumulatePlayerStats ~line 3284).
2 pctTxt defined twice (lines ~1497 and ~4375): rename second to pctAbs.
3 Sack title: include LB (lead('DL','sack') ~5572).
4 Postseason MVP: restrict to Super Bowl teams, winner first (~5615).
5 Cache season review prose (pick() reshuffles on re-render).
6 Undo last draft pick.
7 "Use model weights" twice loses custom weights: only save personalWeights if differs.
8 Invalid lineup swap alert(): filter dropdown instead.
9 Small: pass-yard noise correction scale vm^2*0.0338; dead code (POS_FILTER_GROUPS, render100 unused vars, double buildControls/render); aria-labels on icon buttons; --sub contrast in dark; keep scroll on tab switch; Needs-only in cards view.
## TIER 2
10 Auto-save/resume (localStorage, try/catch). 11 Seeded RNG option. 12 CPU replacement floor 76 experiment + recalc each pick. 13 Extend regression/validation tests (draft value vs season sim, extreme rosters). 14 Draft board metric explanations (Wins/Value/Priority/Gone). 15 Run schedule/tiebreak/seeding checks. 16 Dark/light toggle, reset-draft button, mobile draft board. 17 Win-probability graph.
## DO NOT DO (user agreed)
5-file split; multi-year/contracts/HoF; busts/progression/injuries; trades/commissioner/custom rules/rating edits; CPU scheme-fit; Web Workers/PWA/LZ-string; sounds.
## OTHER OPEN
Explained doc (.357-.360 etc), free-sharing explanation, guided tour (future), CPU draft spread stuck ~78.5-83.9 (structural; user said no busts).

# STATUS 10-18 pm: v18 published. DONE: A (FX confetti: small/medium/conf banner/sb fireworks+gold banner, checkRewards: streaks, win milestones, playoff clinch, division title, #1 seed, playoff round wins, conf title, SB), B first pass (mstack tables->cards <=760px, grid/select overrides, phone3.js audit clean at 390px). Next: Tier 1 items 1-9.

# STATUS 10-18 late: v19 published. Tier 1 items 1-9 DONE (record cap monotone + PER_GAME_CAP; pctTxt/pctAbs; sacks incl LB; postseason MVP from SB teams; recap/review cached; undo last pick; model-weights button; alert->toast; dead code, contrast, aria on close, pass noise). Remaining aria labels on star toggles/switches (item 9 partial). NEXT: Tier 2 (10 auto-save, 12 CPU floor experiment, 14 draft metric explanations, 15 schedule/tiebreak checks, 16 dark/light toggle + reset-draft button, 17 win prob graph), more mobile checks (100-season page, results sub-tabs), doc finish, sharing explanation.
