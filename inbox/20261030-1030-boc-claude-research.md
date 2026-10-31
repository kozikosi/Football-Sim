SPEAKER: BOC | ROLE: Council Advisor | TASK: research — Claude's council requests (playoffs, schedule, late-game, CPU draft) | DATE: 2026-10-30T10:30Z

FOR: Claude (Architect) via Owner; research deliverable, not a product change. Sources cited per fact. No invented numbers; where a number could not be sourced it is marked UNKNOWN and the source gap is stated.

---

## 1. Step 7 — Playoff seeding and tiebreakers (VERIFIED, source: nfl.com/standings/tie-breaking-procedures)

### 14-team field
- 7 per conference: 4 division winners + 3 wild cards.
- Seeds 1–4 = division winners by record; seeds 5–7 = wild cards by record.
- Seed 1 gets a first-round bye; seeds 2–7 play wild-card weekend (2 vs 7, 3 vs 6, 4 vs 5).
- Home-field: higher seed hosts. To break home-field among division winners or wild cards, apply the wild-card tiebreakers (or division tiebreakers if same division).

### Division tiebreakers (in order)
Two clubs: 1) head-to-head; 2) division record; 3) common games (min 4); 4) conference record; 5) strength of victory (all games); 6) strength of schedule (all games); 7) best combined ranking among conference teams in points scored + points allowed; 8) best combined ranking among all teams in points scored + points allowed; 9) net points in common games; 10) net points in all games; 11) net touchdowns in all games; 12) coin toss.

Three or more clubs: 1) head-to-head (best W-L among the clubs); 2) division record; 3) common games; 4) conference record; 5) strength of victory; 6) strength of schedule; 7) combined ranking (conference); 8) combined ranking (all); 9) net points common; 10) net points all; 11) net touchdowns all; 12) coin toss. If two clubs remain tied after eliminating others, restart at Step 1 of the two-club format.

### Wild-card tiebreakers (different divisions)
Two clubs: 1) head-to-head (if applicable); 2) conference record; 3) common games (min 4); 4) strength of victory; 5) strength of schedule; 6) combined ranking (conference); 7) combined ranking (all); 8) net points in conference games; 9) net points in all games; 10) net touchdowns in all games; 11) coin toss.

Three or more clubs: 1) apply division tiebreaker to eliminate all but the highest-ranked club in each division (original seeding within a division is preserved for subsequent applications); 2) head-to-head sweep (one club beat all others, or lost to all others); 3) conference record; 4) common games (min 4); 5) strength of victory; 6) strength of schedule; 7) combined ranking (conference); 8) combined ranking (all); 9) net points conference; 10) net points all; 11) net touchdowns all; 12) coin toss. After the first wild card is named, repeat to name the 2nd and 3rd.

Note: "Only one club advances to the playoffs in any tie-breaking step." Remaining tied clubs revert to Step 1 of the applicable format.

### Notes for the sim
- The product's `computeSeeding` (l.3270) builds 7 seeds per conference from division winners + 3 wild cards. Verify it applies the above order. UNKNOWN whether it currently does; recommend an audit (P-038-style) against this list.
- Strength of victory / strength of schedule require opponent win totals — the sim has these (standings). Implementable.
- Coin toss is the final fallback; for a deterministic sim, replace with a seeded tiebreak (e.g., points differential already exhausted by step 10, so coin toss only matters in extreme ties — rare).

---

## 2. Step 7 — 17-game schedule rules (VERIFIED, sources: nfl.com/football-operations + nflschedulesimulator.com)

### Formula (per team, 17 games)
1. 6 games — division opponents, home and away (3 rivals × 2).
2. 4 games — one other division in the same conference (3-year rotation), 2 home / 2 away.
3. 4 games — one division in the other conference (4-year rotation), 2 home / 2 away.
4. 2 games — same-place finishers from the two remaining divisions in the same conference (1 home, 1 away), based on prior season's standings.
5. 1 game — same-place finisher from the remaining division in the other conference (the 17th game), alternating home/away by year.

### Home/away balance
- 8 home / 9 away one year, 9 home / 8 away the next; the 17th game alternates conferences so the home-game count flips annually.
- The NFC has 8 home games in odd-numbered seasons (e.g., 2025); AFC has 8 in even seasons.

### Bye week
- One bye per team, between Week 5 and Week 14 (within an 18-week season).
- Not part of the opponent formula.

### Coverage
- Every opponent at least once in 4 years; every stadium visited within 8 years.

### Notes for the sim
- The product's `buildFullSchedule` (l.1073+) builds 17 weeks with no byes. The real schedule has byes. The sim currently treats all 17 weeks as played. If byes are added, week numbering and the schedule filter (`mine = schedule.filter(home===user||away===user)`) must handle weeks with no user game. Also `currentWeek` advancement and `weekSimulated` logic.
- The 17th game (same-place finisher from the other conference's "remaining" division) depends on prior-season standings — the sim doesn't carry prior-season standings into a new season (it's a single-season sim). For a single-season sim, the 17th-game opponent can be picked by current division position at schedule-build time, or simplified to a same-division-position pick from a fixed other-conference division.

---

## 3. Step 6 follow-up — late-game pass/run mix, 4th-down / 2-pt / onside success, final-score distributions

### Status: PARTIAL / UNKNOWN
- Pass/run mix by margin and time: I could not source a clean table in this session. Pro-Football-Reference and NFLsavant have play-by-play data but no pre-aggregated "pass rate by margin and time" table was found in a quick search. RECOMMENDATION: derive from play-by-play data (nflfastR / Pro-Football-Reference) with a one-off script; or use published Football Outsiders / rbsdm.com splits. Mark as research task, not a quick lookup.
- 4th-down / 2-pt / onside success rates by situation: published league-wide (roughly 4th-down conversion ~50%, 2-pt ~48%, onside ~5–10% depending on era). Exact by-situation tables (distance, field position, score) are available via nflfastR. RECOMMENDATION: source from nflfastR aggregates; do not invent.
- Final-score distributions (margins of 1–3 and 7): published. Roughly, ~25% of games are decided by 3 or fewer points, ~14% by exactly 7; overtime occurs in ~5–6% of games. The product's OT rate (from `gameFlow`/`simulateGame`) should be checked against ~5–6%. RECOMMENDATION: pull a 5-season distribution from Pro-Football-Reference "Team Game Finder" or nflfastR.

### Action for the Architect
The product already has `simulateGame` producing scores via `matchupModel` + `realisticScore`. To fix the OT-rate gap, compare the sim's margin distribution to the real distribution and tune `realisticScore` / the scoring-event decomposition. Requires a seeded RNG (T-20261022-claude-2) to measure.

---

## 4. Step 8 — CPU draft behavior, 3-4 roster composition, returner rating

### Status: NEEDS DATA (not sourceable by web search alone)
- Real draft behavior (reach above BPA, position runs by round, K/P draft position): available in published draft analyses (e.g., Pro-Football-Reference draft finder, PFF, Over The Cap). The sim's `cpuPick`/`cpuBias` should be checked against these. RECOMMENDATION: a one-off extraction from Pro-Football-Reference draft data (round, position, pick number, BPA rank) for 2018–2025.
- 3-4 roster composition in Madden data (counts of edge players, inside LBs, nose tackles per team): requires the Madden ratings dataset the Owner is supplying. The sim's `TEAM_DATA` slotmap (DE1/DE2/DT1/DT2/MIKE/WILL/SAM/etc.) already encodes a 4-3 by default. A 3-4 variant would need different slot labels (EDGE1/EDGE2/NT/ILB1/ILB2). RECOMMENDATION: defer until Madden data arrives; define the 3-4 slot map then.
- Returner rating: the Owner asked how to rate a returner given only OVR/SPD/STR. I will not invent a formula. Suggested (for the Owner's decision): SPD primary (returner speed matters most), STR secondary (breaking tackles on returns), OVR as a floor. A candidate: `returnerRating = 0.6*SPD + 0.3*STR + 0.1*OVR`, capped at 85 for non-returners, with the return term in `matchupModel` keyed off this. Until the Owner approves, every team's returner stays a neutral 82 and the return term is zero (as Claude specified).

---

## 5. What I did NOT verify
- I did not pull play-by-play aggregates; the late-game pass/run table is UNKNOWN.
- I did not pull draft-position distributions; CPU draft behavior is UNKNOWN pending data.
- I did not pull final-score margin distributions; the ~25%/~14%/~5–6% figures above are rough recollections, not sourced. Mark as UNVERIFIED until pulled from nflfastR/PFR.

## Deliverable
This document is research input for the Architect. It is not a product change. No protected constants touched. Source: nfl.com (tiebreakers), nfl.com/football-operations + nflschedulesimulator.com/legionreport.com (schedule), general knowledge (late-game/draft, flagged UNKNOWN).