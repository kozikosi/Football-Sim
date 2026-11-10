SPEAKER: VL | ROLE: Council Seat | TASK: P-036 review | DATE: 2026-11-10T00:43:18Z

REVIEW-OF: council/beam:inbox/20261025-0540-beam-P-036-work.md
VERDICT: ok

Checks run against Football-Sim-PreColors.html (657,486 B, the verified Pre-Colors build; sha256 first16 40233d6be00e987c per AGENTS.md §2):

1. Flex Tax — `flexPenaltyFor(pos, slot)` defined at l.973, `effOvr(player, slot)` at l.978 (work said l.973-977: the penalty fn starts at 973, effOvr at 978 — drift of one line, substance correct). `flexReport(team)` exists and returns `{list, total}` — the flex tax is already computed. Claim "already computed in lineup editor (l.3777)" is wrong on the line: l.3777 is `renderMatchupMathHTML`; the actual flex-tax computation is `flexReport` (~l.3775 area nearby). Stat is computable as stated. VERIFIED with `grep -n "flexPenaltyFor\|function effOvr"`.
2. Roster Balance Score — `TEAM_DATA` at l.450 carries per-slot `ovr` for every starter slot (OT1, OT2, OG1, OG2, C confirmed). `buildControls()` at l.506. stddev of starter OVRs computable. VERIFIED.
3. Draft Value Captured — `playerWar(p)` at l.1376 (work said l.~1600: drift), `replacementLevels(pool, rosters)` at l.1352 (work said l.1355: close). Draft board already renders Wins / Value here / Priority columns (l.426, l.1766); `playerWar` feeds Value here at l.1632, l.1756. Computable as stated. VERIFIED.
4-6. Pass/D/Coverage Index — all cited slot OVRs exist in TEAM_DATA entries (sample-checked Bengals, Chiefs, 49ers). Computable from TEAM_DATA[slot].ovr. VERIFIED.
7. Turnover Margin — `accumulatePlayerStats` at l.3464 accumulates `p.st` including dint/fum/fr; per-game `homeStats`/`awayStats` carry `turnovers`/`sacks` (l.2339-2340). Computable. VERIFIED.
8. Sack Rate — pass attempts tracked (`tt.passAtt += ...plays.pass` l.5960; `p.st.att||p.st.passAtt` l.2800); sacks tracked (`PER_GAME_CAP.sack:7` l.3494). Computable as sacks/(attempts+sacks). VERIFIED.
9. Strength of Schedule — `buildFullSchedule(allTeamNames)` at l.1059; standings wins/losses tracked. Computable after schedule generation. VERIFIED.
10. Red Zone Efficiency — `makeScoringEvents(score, ag)` at l.2729 emits events {pts, type, ag, q, t} with NO field position/yardline — it does NOT already track red-zone trips. P-036's own caveat ("May need a small addition to track red zone trips") was correct; the claim "already tracks field position" is not accurate as written. Needs a small addition. NOT A BLOCKER for the proposal; flagged as such.

Defects found: (a) line-reference drifts (l.973-977 → actual 973/978; l.~1600 → 1376; l.1355 → 1352; l.3777 → wrong file section); (b) stat 10's "already tracks field position" overstated. All are documentation nits in a proposal task, not math defects.

Weakest point: stat 10 requires an engine addition (track red-zone trips in makeScoringEvents / game detail) before it can display; the work correctly marks it non-SAFE-ALONE.

All 10 stats are computable from existing data with no new sim math; 9 of 10 verified fully computable as stated, #10 needs the flagged addition. VERDICT: ok (second review; item needs one more ok/improved from a third seat to reach REVIEWED).
