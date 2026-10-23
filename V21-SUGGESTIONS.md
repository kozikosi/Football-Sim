
---

## 8. Game Review UI improvements (from Owner, 21 Oct)

### 8.1 Box score table
- **What:** The box score of the quarters table can be made larger and more beautiful.
- **Where:** Game review, box score section.
- **Impact:** Medium. CSS/layout improvement.

### 8.2 Remove "had" from second sentence
- **What:** "The Chiefs had ripped off 21 unanswered points in the third quarter along the way." → Remove "had" from the second sentence. "The Chiefs ripped off 21 unanswered points in the third quarter along the way."
- **Where:** Game review, recap text.
- **Impact:** Low. Text change.

### 8.3 Start with "1st Quarter"
- **What:** Remove the recap at the beginning. Report should start with "1st Quarter". Use "1st" "2nd" "3rd" "4th" more often.
- **Where:** Game review, scoring summary.
- **Impact:** Low. Text/layout change.

### 8.4 Fix extra point glitch
- **What:** "First quarter: Bryan Bresee got a hand on an extra point and blocked it for the Vikings." — The score was 0-0 after the first quarter so this makes no sense. Fix glitch. Could replace extra point with field goal.
- **Where:** Game review, scoring summary.
- **Impact:** Medium. Logic fix.

### 8.5 Rushing TD format
- **What:** "D'Andre Swift ran it in for a touchdown (Chiefs 7-0)" → "Rushing TD · D'Andre Swift (Chiefs 7-0)". More like a box score report.
- **Where:** Game review, scoring summary.
- **Impact:** Low. Text format change.

### 8.6 Turnovers format
- **What:** "Turnovers: The Chiefs came out one turnover ahead: Geno Smith was intercepted by Jaylon Johnson in the fourth quarter." → Less natural language. More like a score summary: "Turnovers: Chiefs 1 - 0 Vikings" then "Jaylon Johnson interception (4th Q)".
- **Where:** Game review, turnovers section.
- **Impact:** Low. Text format change.

### 8.7 Stars of the game
- **What:** Offensive players need at least 60 yards to be mentioned. Reserve these spaces for +90 rating performances (don't mention the actual 90 rating to the user but use it internally to generate the Stars). Replace "Stars of the game:" with an actual Star icon, maybe glittering.
- **Where:** Game review, stars section.
- **Impact:** Medium. Logic + UI change.

### 8.8 Game ball in key players
- **What:** A game ball wasn't assigned to any player in the Key Players chart. The player with the game ball should always be in the key players.
- **Where:** Game review, key players section.
- **Impact:** Low. Logic fix.

### 8.9 Remove "worth about +2.3 points" phrasing
- **What:** Remove phrases like "worth about +2.3 points to the Chiefs." The first "3.3" should be "+3.3" and it's ok to mention because it's only referring to the overall score prediction.
- **Where:** Game review, "How it was decided" section.
- **Impact:** Low. Text change.

### 8.10 "a swing of roughly +1.3 points" → "but"
- **What:** "The Chiefs' pass rush (88.0, #4 of 32) only got home to Geno Smith once and hurried 9 more dropbacks, a swing of roughly +1.3 points for the Chiefs." → "The Chiefs' pass rush (88.0, #4 of 32) only got home to Geno Smith once and hurried 9 more dropbacks, but..." Remove "a swing of roughly +1.3 points for the Chiefs."
- **Where:** Game review, "How it was decided" section.
- **Impact:** Low. Text change.

### 8.11 "The Chiefs move to 1-0; the Vikings slip to 0-1" own paragraph
- **What:** Should be its own paragraph.
- **Where:** Game review.
- **Impact:** Low. Layout change.

### 8.12 No sacks = poor, 1-2 sacks = mid, 3+ sacks = exceptional
- **What:** No sacks should be considered poor. 1-2 Sacks Mid. 3+ sacks exceptional.
- **Where:** Game review, pass rush description.
- **Impact:** Low. Logic change.

### 8.13 Game plan descriptions
- **What:** "Follows the usual NFL chart:" → "Balanced Approach:". Replace "and goes for it on 4th down when it is short and the field position is good." with "and goes for it on 4th & short when in opponent's territory." Verify the math.
- **Where:** Game review, game plan section.
- **Impact:** Low. Text change.

### 8.14 Aggressive description rewrite
- **What:** "Goes for 2 early and often, and goes for it on 4th down instead of kicking. More 2-Pt Convs, more touchdowns, fewer field goals, and a few more failed 4th downs." → Rewrite: "More 2-Pt Conversions, More touchdowns, Fewer field goals, and a few more failed 4th downs." Then smaller text: "Almost always goes for 2-pt conversion unless you need an XP to win the game. Almost always goes for 4th down unless behind your own 30yd line or if you have a big lead in the 4th Quarter."
- **Where:** Game review, game plan section.
- **Impact:** Low. Text change.

### 8.15 "How a 2-Pt Conv works" → "How a 2-Pt Conversion works"
- **What:** Write out "Conversion" fully.
- **Where:** Game review, 2-pt conversion section.
- **Impact:** Low. Text change.

### 8.16 Game plan descriptions more beautiful
- **What:** All descriptions after dropdown selection need to be made more beautiful. Currently ugly.
- **Where:** Game review, game plan section.
- **Impact:** Medium. UI/CSS change.

### 8.17 Replace m-dashes with periods
- **What:** In "Why these plans?" section, replace most m-dashes with periods. Make them two sentences.
- **Where:** Game review, game plan section.
- **Impact:** Low. Text change.

### 8.18 Defensive formation subtitles
- **What:** All future references to formations like nickel or base should just say "Nickel (dot) Pass Protection" or "Nickel (dot) Run Defense" or just "Nickel". The neutral Nickel shouldn't say "Nickel defense focused on the pass style" as a subtitle. Remove long parentheticals like "(a nickel defense focused on the pass)."
- **Where:** Game review, game plan section.
- **Impact:** Low. Text change.

### 8.19 Game plan UI
- **What:** The UI is ugly here. Make a little smaller and a lot more beautiful. The lineups should be directly below the game plan. Next is Match up match, then opponent scouting report.
- **Where:** Game review, game plan section.
- **Impact:** Medium. UI/layout change.

### 8.20 Box score table larger and more beautiful
- **What:** The box score of the quarters table can be made larger and more beautiful.
- **Where:** Game review, box score section.
- **Impact:** Medium. CSS/layout improvement.

### 8.21 Regular Season Review banner
- **What:** The banner that appears after winning is great but should be much larger, centered on the screen, and remain on the screen for at least 3 seconds. Similar to the Conference Champions graphic. It would be cool if that graphic could also land on the screen somewhere after it shows and continue to shimmer/sparkle.
- **Where:** Regular season review, championship banner.
- **Impact:** Medium. CSS/JS animation.

### 8.22 Conference charts
- **What:** "Kansas City Chiefs: 14-3 · 397 PF · 296 PA" should be replaced by two Conference charts that rank the team 1-16 in their conferences and is as beautiful as possible.
- **Where:** Regular season review, standings.
- **Impact:** Medium. UI/layout change.

### 8.23 Playoff bracket
- **What:** Ideally the Playoffs Picture would be an actual tournament style kind of March Madness type bracket showing the byes and both conferences with the Super Bowl contestants meeting in the middle.
- **Where:** Playoffs page.
- **Impact:** High. New UI component.

### 8.24 Regular season awards
- **What:** The regular season awards is well formatted but could be made a lot more beautiful. Maybe use gold for your players on any awards charts, including the game ball winner.
- **Where:** Awards page.
- **Impact:** Medium. CSS/UI change.

### 8.25 Remove "Early picks that are worth little to winning matter most"
- **What:** Remove this phrase from the Draft critique: "Early picks that are worth little to winning matter most, because those picks are the hardest to replace later."
- **Where:** Draft critique section.
- **Impact:** Low. Text removal.

### 8.26 "What separated the playoff teams" — hidden by default
- **What:** Leave "What separated the playoff teams" but don't mention it ever and leave it so that you have to click on it to see it. The playoff teams are almost always around #16 so when you describe how the playoff teams differed, it really just repeats whatever the user's team is good at. So leave any descriptions of what separated the playoff teams out.
- **Where:** Regular season review, playoff comparison.
- **Impact:** Low. UI change (collapse by default).

### 8.27 "x Sacked" instead of "Sacked x"
- **What:** When you list QB sacks in your players or anywhere, write it as "x Sacked" instead of "Sacked x".
- **Where:** All text referencing sacks.
- **Impact:** Low. Text change.

### 8.28 More advanced stats
- **What:** It would be awesome if there were more advanced stats and when you click on the advanced stat it tells you why you did well or why you did poorly.
- **Where:** Advanced stats section.
- **Impact:** High. New feature.

### 8.29 Rename "More Advanced Stats" to "Advanced Stats"
- **What:** Rename "More Advanced Stats" to "Advanced Stats".
- **Where:** Advanced stats section.
- **Impact:** Low. Text change.

### 8.30 Condensed advanced stats
- **What:** The current "Advanced stats: what really produced sacks and runs" should be highly condensed and should only be visible when you click on Coverage Sacks or Offensive Lines Advanced Stats in the advanced Stats menu.
- **Where:** Advanced stats section.
- **Impact:** Low. UI change.

### 8.31 Season Review button after playoff
- **What:** The season review button after the playoff should be in blue near the top next to 100 season simulation.
- **Where:** Playoffs page.
- **Impact:** Low. CSS change.

### 8.32 More graphical Season Review
- **What:** The season review should also be more graphical.
- **Where:** Season review page.
- **Impact:** Medium. UI overhaul.

### 8.33 More graphical 100 Season Review
- **What:** The 100 season review should also be a lot more graphical. Only a few sentences here and there.
- **Where:** 100 season review page.
- **Impact:** Medium. UI overhaul.

### 8.34 Bye week game preview
- **What:** If your team has a bye, show the game preview of the most likely matchup against the user in the next round.
- **Where:** Season schedule, bye week.
- **Impact:** Medium. New feature.

### 8.35 Lineup and flexes in playoffs
- **What:** "Lineup and flexes" in the playoffs shouldn't be at the top.
- **Where:** Playoffs page.
- **Impact:** Low. Layout change.

### 8.36 Playoff preview more beautiful
- **What:** "PLAYOFF PREVIEW Divisional Round showdown: Dolphins vs. Chiefs" — This should be a lot more beautiful and a lot more exciting.
- **Where:** Playoffs page, preview section.
- **Impact:** Medium. UI overhaul.

### 8.37 Super Bowl graphic
- **What:** "The Chiefs are Super Bowl champions." So boring. Any hype text like this especially for the Super Bowl should be more beautiful and at least use an exclamation point.
- **Where:** Super Bowl page.
- **Impact:** Low. Text change.

### 8.38 Game preview and review more graphical
- **What:** Ideally all game previews and game reviews are way more graphical. Full sentences should be used sparingly. I think most of this data can be represented by graphics instead of sentences. The only thing that really needs sentences is narration of key plays in the clutch or extra compliments to user's star players and hyping up the next round.
- **Where:** Game preview and review pages.
- **Impact:** High. Major UI overhaul.

---

## 9. Local storage for draft persistence

- **What:** Build local storage so that if the draft refreshes, you are in the same spot.
- **Where:** Draft simulator, draft state.
- **Impact:** Medium. New feature (localStorage).

---

## 10. Position card colors based on team

- **What:** Ideally the colors on the left of the roster should change based on the team. For example for the KC Chiefs it should be red and white. For the Seahawks blue and green. Etc. The little special teams color can be the team's third color. For KC that would be yellow and for the Seahawks probably white.
- **Where:** Team color definitions and roster card rendering.
- **Impact:** Medium. New data (team colors) + CSS changes.

---

## 11. Position card order follows roster order

- **What:** The order of the position cards should follow the order of the roster order.
- **Where:** Position card rendering order.
- **Impact:** Low. Sort order change.

---

## 12. Expand draft board to bottom of panel

- **What:** Expand the visible size of the draft board to the bottom of its panel (on my desktop that would be about two more names.)
- **Where:** Draft board container CSS (max-height or flex-grow).
- **Impact:** Low. CSS change.

---

## 13. "Default is how the draft simulator sees the game."

- **What:** "The default is the model weights: what each spot is really worth in wins, scaled so the biggest spot (QB) is 700 and rounded to the nearest 5. Edit any number to build your own set; the buttons switch between the two." should read "Default is how the draft simulator sees the game." That's it. How the buttons function is obvious visually.
- **Where:** Weights explanation text (around line 547).
- **Impact:** Low. Text change.

---

## 14. Delete user weights record

- **What:** "Please delete any record of my user weights. They keep distracting you from making good decisions about balance. Forget the user weights. Only use the weights that are above. The ones you currently have saved as model weights."
- **Where:** Remove `personalWeights` / `personalWBtn` logic and any localStorage for weights.
- **Impact:** Medium. Removes functionality.

---

## 15. Player browser: ~15 players on desktop

- **What:** On the player browser, on desktop you should only be able to see around 15 players at a time.
- **Where:** Player browser rendering (pagination or max-height).
- **Impact:** Low. CSS/JS change.

---

## 16. Footer tabs always visible

- **What:** The footer tabs should always be visible at the bottom.
- **Where:** Footer CSS (`position: sticky; bottom: 0` or similar).
- **Impact:** Low. CSS change.

---

## 17. Position Rankings: complete combinations

- **What:** On "Position Rankings" make sure every combination of the top x players are available to select. You can give them whatever names you want. Use the default model weights to know which players are most valuable.
- **Where:** Position Rankings dropdown.
- **Impact:** Medium. Logic change.

---

## 18. Team Comparison: remove description + Chiefs/Raiders default

- **What:** "On your current weights, Los Angeles Rams grades 1.88 points ahead of Baltimore Ravens. Los Angeles Rams holds the edge at 15 starting spots to Baltimore Ravens's 9, and wins 11 of 14 unit comparisons to Baltimore Ravens's 3." Remove this description from the Team Comparison. The default matchup should be Chiefs as Team A and Raiders as Team B.
- **Where:** Team Comparison page.
- **Impact:** Low. Text change + default change.

---

## 19. Team Comparison Page changes

### 19.1 Remove "real" from "Put any two real rosters side by side."
- **What:** Remove the word "real" here.
- **Where:** Team Comparison page header.
- **Impact:** Low. Text change.

### 19.2 Remove "Ratings shown are effective ratings" text
- **What:** Remove "Ratings shown are effective ratings — players flexed out of position carry their penalty." Only on the main Team Comparison Page. You can keep that text within the Draft Simulator.
- **Where:** Team Comparison page.
- **Impact:** Low. Text change.

### 19.3 Remove all parentheses from Unit Comparison table
- **What:** For the following table in the Unit Comparison, remove all parentheses.
- **Where:** Team Comparison page, Unit Comparison table.
- **Impact:** Low. Text change.

### 19.4 Reorganize by offense and defense
- **What:** Organize by offense and defense. Subtitle "Offense" then Offense, Quarterback, Offensive Line, Running Backs, Wide Receivers, Tight Ends, Run Game, Pass Game. Then subtitle "Defense" then Defense, Defensive Line, Linebackers, Secondary, Run Defense, Pass Defense.
- **Where:** Team Comparison page, Unit Comparison table.
- **Impact:** Low. Layout change.

---

## 20. Guide Page changes

### 20.1 Remove Guide Box and intro text
- **What:** Remove the Guide Box and the text: "Guide — Short reference sections for the terms the sim uses. Click through only what you need."
- **Where:** Guide tab header.
- **Impact:** Low. Cosmetic removal.

### 20.2 Rewrite "Play the season" text
- **What:** Rewrite "Play the season. Seventeen games, a 14-team playoff, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself." to "Play the season. Seventeen game Regular Season, the Playoffs, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself."
- **Where:** Guide page, "Play the season" section.
- **Impact:** Low. Text change.

### 20.3 Remove "(what caused sacks and big runs)" from advanced stats
- **What:** Remove the text "(what caused sacks and big runs)" from "advanced stats (what caused sacks and big runs)".
- **Where:** Guide page, advanced stats section.
- **Impact:** Low. Text change.

### 20.4 Remove "x wins from a 70-90 upgrade" from position values
- **What:** Remove "x wins from a 70-90 upgrade" in all instances. Just list the players in order with their number of Wins per +1 OVR. Remove the "Wins, 70→90" column when displaying.
- **Where:** Guide page, position values section.
- **Impact:** Low. Text/column removal.

### 20.5 Combine "Drafting: which positions matter" with "POSITION VALUES" dropdown
- **What:** The POSITION VALUES dropdown is now essentially the same table as "Drafting: which positions matter." Combine them, leave in the place of "Drafting: which positions matter", rename the dropdown to "Drafting & Position Values".
- **Where:** Guide page.
- **Impact:** Low. UI reorganization.

### 20.6 Cross-reference football terms with glossary
- **What:** Cross-reference football terms that appear in game previews and game reviews with the glossary site terms. If there are more words that a casual basketball fan (who watches football once a year at the Super Bowl) wouldn't know, list them in the glossary and explain them.
- **Where:** Guide page, glossary section.
- **Impact:** Medium. Content addition.

### 20.7 Reorganize position values table by conventional logic order
- **What:** Reorganize the position values table based on the conventional logic order of the draft board. QB first.
- **Where:** Guide page, position values table.
- **Impact:** Low. Sort order change.

### 20.8 "Never just say 'tackle.' Always say 'offensive Tackle'."
- **What:** Replace "tackle" with "offensive Tackle" wherever it appears in the guide.
- **Where:** Guide page, all text.
- **Impact:** Low. Text change.

### 20.9 "Flexing Players, explained" → "Flexing"
- **What:** Rename "Flexing Players, explained" to "Flexing".
- **Where:** Guide page.
- **Impact:** Low. Text change.

### 20.10 "How the computer teams pick" rewrite
- **What:** "How the computer teams pick. Each CPU team takes the player who adds the most wins over a replacement-level starter (never below a 76 rating) at a spot it still needs, with a little personal taste for certain positions and some randomness. They can also flex a player." → Remove "(never below a 76 rating) at a spot it still needs, " — keep the rest.
- **Where:** Guide page, "How the computer teams pick" section.
- **Impact:** Low. Text change.

---

## 21. Weight changes (from Owner, 21 Oct)

The Owner stated that the following weight changes should be made:

| Slot | Old (Wins per +1 OVR) | New (Wins per +1 OVR) | Change |
|------|----------------------|----------------------|--------|
| K | 0.72 | 0.45 | -0.27 |
| WR2 | 0.60 | 0.63 | +0.03 |
| RB1 | 0.67 | 0.58 | -0.09 |
| CB2 | 1.18 | 0.95 | -0.23 |
| DE1 | 1.30 | 1.38 | +0.08 |

Additional constraints:
- TE1 should be within 0.5 of WR1
- TE2 should be within 0.5 of WR3
- QBs rush and Receiver block so those percentages should be adjusted for the run game

**Note:** The Owner said "In one of your replies recently about how you're going to reweigh things, you said this: '' That is wrong. These are the default weights you created:" — the Owner is correcting a previous statement about weights. The default weights already in the code (DEFAULT_WEIGHTS) are the correct ones. The above changes are the Owner's desired adjustments.

**Important:** DEFAULT_WEIGHTS is a protected constant (AGENTS.md). Changes require the Owner's explicit approval. The Owner has now provided the specific values above. Claude should implement these as a proposal in SUBMISSIONS.md with the exact code changes.

**Colleague feedback (from 4 AI colleagues):**
- Colleague 1: WR1/WR2 undervalued, CB2/CB3 overvalued, kicker overvalued, pass/run splits wrong, OL too uniform, DT roles not differentiated
- Colleague 2: WR2 severely undervalued (below kicker), SS/FS overvalued vs WR2, CB3 too close to CB1, QB separation too small, DT archetypes not differentiated, kicker overstated, linearity assumption breaks at roster scale, additivity double-counts joint production
- Colleague 3: Arithmetic inconsistencies, aggregate impossible, pass/run splits contradict football logic
- Colleague 4: Hard bugs, market ordering inversions, aggregate impossible, smaller modeling gaps

**Revised table (from colleague 4, corrected):**
| Slot | Wins per +1 OVR | Wins, 70→90 | Pass / Run |
|------|----------------|-------------|------------|
| QB | .127 | 2.54 | 90 / 10 |
| DE1 | .072 | 1.44 | 79 / 21 |
| CB1 | .065 | 1.30 | 87 / 13 |
| DT1 | .056 | 1.12 | 62 / 38 |
| WR1 | .055 | 1.10 | 100 / 0 |
| DE2 | .055 | 1.10 | 75 / 25 |
| OT1 / OT2 | .052 each | 1.04 | 77 / 23 |
| CB2 | .049 | 0.98 | 88 / 12 |
| CB3 | .047 | 0.94 | 94 / 6 |
| SS | .044 | 0.88 | 82 / 18 |
| MIKE | .043 | 0.86 | 62 / 38 |
| FS | .043 | 0.86 | 84 / 16 |
| OG1 / OG2 / C | .043 each | 0.86 | 67 / 33 |
| WILL | .040 | 0.80 | 66 / 34 |
| TE1 | .040 | 0.80 | 83 / 17 |
| DT2 | .038 | 0.76 | 48 / 52 |
| WR2 | .0325 | 0.65 | 100 / 0 |
| RB1 | .029 | 0.58 | 35 / 65 |
| SAM | .024 | 0.48 | 45 / 55 |
| K | .0225 | 0.45 | n/a (ST) |
| WR3 | .019 | 0.38 | 100 / 0 |
| RB2 | .011 | 0.22 | 40 / 60 |
| TE2 | .009 | 0.18 | 35 / 65 |

**Note:** The Owner's specific changes (K 0.72→0.45, WR2 0.60→0.63, RB1 0.67→0.58, CB2 1.18→0.95, DE1 1.30→1.38) should be applied on top of the revised table. The Owner also wants TE1 within 0.5 of WR1 and TE2 within 0.5 of WR3, and QB/WR pass/run percentages adjusted for run game.

---

## 22. Advanced stats for the draft simulator

The Owner wants to generate more types of advanced stats to be shown in the draft simulator. The council should work on this and have suggestions for Claude.

**Already computed (from teamRatings()):**
- QB, RB, WR/TE, OL run/pass, pass rush, run defense, coverage, kicker
- runPenalty, passBadge, passGameBadge, runAvg, dlAvg, covAvg, passGameAvg

**Not yet visible (from BOC's v21-stats-that-explain-wins.md):**
- Turnover margin (INTs + fumbles forced - lost)
- Time of possession (derived from pace + efficiency)
- Sack attribution (QB vs OL vs scheme)
- Per-game expected win probability (from matchupModel)
- Per-team WAR aggregation (from slotWins)
- TS+ / efficiency metrics (for NBA, but could apply to football as EPA+)
- Game-plan causal value (which game plan choices drove the outcome)
- Pace-adjusted stats

**Proposed visible surface:** Single "Unit ratings" panel + promoted turnover margin/TOP/sack attribution, reusing teamRatings(), no maths change. Metrics not yet computed require Architect/maths change.

---

## 23. Guide Page: glossary cross-reference

Cross-reference football terms that appear in game previews and game reviews with the glossary site terms. If there are more words that a casual basketball fan (who watches football once a year at the Super Bowl) wouldn't know, list them in the glossary and explain them.

**Suggested terms to add (from council review):**
- "Flex" (playing a player out of position)
- "Slot" (a position on the depth chart)
- "OVR" (overall rating)
- "X-factor" (special ability)
- "Synergy" (how players interact)
- "Replacement level" (baseline performance)
- "Wins above replacement" (WAR)
- "Pythagenpat" (win probability from points)
- "Snap count" (number of plays a player is on the field)
- "Personnel package" (which players are on the field)
- "Coverage shell" (defensive formation)
- "Run fit" (gap assignment in run defense)
- "Pass rush" (pressure on the quarterback)
- "Coverage" (defending passes)
- "Play-action" (fake run, then pass)
- "RPO" (run-pass option)
- "Zone coverage" (area-based defense)
- "Man coverage" (player-based defense)
- "Blitz" (extra rushers)
- "Screen" (short pass to RB/WR behind the line)
- "Shotgun" (QB lined up 5 yards back)
- "Pistol" (QB lined up 3 yards back)
- "I-formation" (QB under center, FB in front of RB)
- "Spread" (receivers spread wide)
- "11 personnel" (1 RB, 1 TE, 3 WR)
- "12 personnel" (1 RB, 2 TE, 2 WR)
- "21 personnel" (2 RB, 1 TE, 2 WR)
- "Base defense" (4 DL, 3 LB, 4 DB)
- "Nickel" (5 DB)
- "Dime" (6 DB)
- "Quarter" (7 DB)

---

## 24. Notes for Claude

1. **The "Value Here" removal** — remove from visual display (draft sort dropdown) but keep the underlying math. The `sort: value here` option should be removed from the dropdown; the `value` sort logic in the JS must remain.
2. **The "MORE" removal** — remove `<span class="footlabel">More</span>` from the tab footer.
3. **Badges move** — badges currently render inside team ranking table rows (lines 625-627). Move to a strip below the weights buttons (line 548 area). Show "No team carries a penalty badge on these weights." when empty.
4. **Button renames** — "Use model weights" → "Default", "Back to my weights" → "Save My Weights" (conditional visibility: transparent until changed, then blue + "My Weights").
5. **Weights changes** — apply the Owner's specific weight adjustments (K 0.72→0.45, WR2 0.60→0.63, RB1 0.67→0.58, CB2 1.18→0.95, DE1 1.30→1.38, TE1 within 0.5 of WR1, TE2 within 0.5 of WR3, QB/WR pass/run percentages adjusted for run game). These are protected constants — requires explicit approval. Owner has provided the values. BOC presents as proposal.
6. **Guide page changes** — remove Guide Box and intro text, rewrite "Play the season" text, remove "(what caused sacks and big runs)", remove "x wins from a 70-90 upgrade" column, combine "Drafting: which positions matter" with "POSITION VALUES" dropdown (rename to "Drafting & Position Values"), cross-reference football terms with glossary.
7. **Advanced stats** — Owner wants more types of advanced stats in the draft simulator. Council should work on suggestions. Proposed: turnover margin, time of possession, sack attribution, per-game expected win probability, per-team WAR aggregation, TS+/efficiency metrics, game-plan causal value, pace-adjusted stats.
8. **The weights table** — the Owner's specific changes should be applied on top of the revised table from the colleague discussion. The Owner said "In one of your replies recently about how you're going to reweigh things, you said this: '' That is wrong. These are the default weights you created:" — the Owner is correcting a previous statement about weights. The default weights already in the code (DEFAULT_WEIGHTS) are the correct ones. The above changes are the Owner's desired adjustments.

---

## 25. Notes for the council

1. **The "Value Here" removal** — remove from visual display (draft sort dropdown) but keep the underlying math. The `sort: value here` option should be removed from the dropdown; the `value` sort logic in the JS must remain.
2. **The "MORE" removal** — remove `<span class="footlabel">More</span>` from the tab footer.
3. **Badges move** — badges currently render inside team ranking table rows (lines 625-627). Move to a strip below the weights buttons (line 548 area). Show "No team carries a penalty badge on these weights." when empty.
4. **Button renames** — "Use model weights" → "Default", "Back to my weights" → "Save My Weights" (conditional visibility: transparent until changed, then blue + "My Weights").
5. **Weights changes** — apply the Owner's specific weight adjustments. These are protected constants — requires explicit approval. Owner has provided the values. BOC presents as proposal.
6. **Guide page changes** — remove Guide Box and intro text, rewrite "Play the season" text, remove "(what caused sacks and big runs)", remove "x wins from a 70-90 upgrade" column, combine "Drafting: which positions matter" with "POSITION VALUES" dropdown (rename to "Drafting & Position Values"), cross-reference football terms with glossary.
7. **Advanced stats** — Owner wants more types of advanced stats in the draft simulator. Council should work on suggestions.
8. **The weights table** — the Owner's specific changes should be applied on top of the revised table from the colleague discussion.

---

**SPEAKER: Beam | ROLE: equal advisor (S-1600–1699) | TASK: V21 Suggestions compilation | DATE: 2026-10-21T18:45:00Z**

This document compiles the Owner's (Kosi's) instructions from the last two prompts, along with my analysis and the council's feedback on weights. It is intended as a reference for Claude (the Architect) to prepare the changes. All changes are proposals — Claude decides what enters the build.

No product files edited. No protected constants changed. This is an advisory document only.
