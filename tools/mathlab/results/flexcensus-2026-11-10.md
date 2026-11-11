# flexcensus: does the lineup optimizer exploit a flex table? (read-only, 10 Nov 2026)
SELF-CHECK: re-implemented solver vs engine optimalLineup, live table, 32 real rosters: max |value diff| = 0 (identical)

Best real players used as the stack: C Creed Humphrey 96 | FB Kyle Juszczyk 88 | 32 teams, slots = 4-3 (32 spots), roster sizes 55-68

Counts are over 32 teams. "flexed" = a placed player with penalty > 0 and NOT an emergency fill; "emerg" = emergency fills (a roster hole, not a choice).

## Scenario: real rosters
- T0 live (C>OT 12, C>DT 12, C>OG 6, FB>RB 2): teams with a flex 30/32, emerg 0
    top flexes: OLB>TE 8, OG>OT 7, RB>TE 6, OT>C 5, SS>TE 4, WR>TE 4
- T1 centre ability-only (C>OT 6, C>DT 9, C>OG 5): teams with a flex 31/32, emerg 0 | wins/team/season vs T0: 0.012
    top flexes: OLB>TE 8, OT>C 7, RB>TE 6, OG>OT 5, C>OT 5, SS>TE 4
- T2 centre cheap (C>OT 2, C>DT 2, C>OG 2): teams with a flex 31/32, emerg 0 | wins/team/season vs T0: 0.073
    top flexes: C>OT 8, OT>C 8, OLB>TE 8, OG>C 6, RB>TE 6, SS>TE 4
- T3 FB at the guard (FB>RB 18, FB>TE 18): teams with a flex 30/32, emerg 0 | wins/team/season vs T0: -0.014
    top flexes: OLB>TE 8, OG>OT 7, RB>TE 6, WR>TE 6, OT>C 5, SS>TE 4
- T4 centre at the guard (C>OT 12, C>DT 12, C>OG 10): teams with a flex 30/32, emerg 0 | wins/team/season vs T0: -0.013
    top flexes: OLB>TE 7, RB>TE 6, OG>OT 6, SS>TE 4, WR>TE 4, OG>C 4

## Scenario: + league-best real C on every team
- T0 live (C>OT 12, C>DT 12, C>OG 6, FB>RB 2): teams with a flex 32/32, emerg 0, stacked player out of position on 32/32 teams (to OG 32)
    top flexes: C>OG 33, OG>OT 12, OG>C 8, OLB>TE 8, RB>TE 6, EDGE>TE 4
- T1 centre ability-only (C>OT 6, C>DT 9, C>OG 5): teams with a flex 32/32, emerg 0, stacked player out of position on 32/32 teams (to DT 1, OG 13, OT 18) | wins/team/season vs T0: 0.108
    top flexes: C>OT 21, C>OG 15, OG>C 9, OLB>TE 8, OT>C 7, RB>TE 6
- T2 centre cheap (C>OT 2, C>DT 2, C>OG 2): teams with a flex 32/32, emerg 0, stacked player out of position on 32/32 teams (to DT 13, OT 15, OG 4) | wins/team/season vs T0: 0.406
    top flexes: C>OT 22, C>DT 14, OT>C 10, OG>C 9, OLB>TE 8, C>OG 7
- T3 FB at the guard (FB>RB 18, FB>TE 18): teams with a flex 32/32, emerg 0, stacked player out of position on 32/32 teams (to OG 32) | wins/team/season vs T0: -0.009
    top flexes: C>OG 33, OG>OT 12, OG>C 8, OLB>TE 8, RB>TE 6, WR>TE 5
- T4 centre at the guard (C>OT 12, C>DT 12, C>OG 10): teams with a flex 30/32, emerg 0, stacked player out of position on 25/32 teams (to DT 4, OG 17, OT 4) | wins/team/season vs T0: -0.176
    top flexes: C>OG 18, OLB>TE 8, RB>TE 6, OG>OT 6, C>DT 4, EDGE>TE 4

## Scenario: + hypothetical 95 C on every team
- T0 live (C>OT 12, C>DT 12, C>OG 6, FB>RB 2): teams with a flex 32/32, emerg 0, stacked player out of position on 32/32 teams (to OG 32)
    top flexes: C>OG 33, OG>OT 12, OG>C 8, OLB>TE 8, RB>TE 6, EDGE>TE 4
- T1 centre ability-only (C>OT 6, C>DT 9, C>OG 5): teams with a flex 32/32, emerg 0, stacked player out of position on 32/32 teams (to DT 1, OG 14, OT 17) | wins/team/season vs T0: 0.102
    top flexes: C>OT 20, C>OG 16, OG>C 9, OLB>TE 8, OT>C 7, RB>TE 6
- T2 centre cheap (C>OT 2, C>DT 2, C>OG 2): teams with a flex 32/32, emerg 0, stacked player out of position on 32/32 teams (to DT 13, OT 15, OG 4) | wins/team/season vs T0: 0.394
    top flexes: C>OT 22, C>DT 14, OT>C 10, OG>C 9, OLB>TE 8, C>OG 7
- T3 FB at the guard (FB>RB 18, FB>TE 18): teams with a flex 32/32, emerg 0, stacked player out of position on 32/32 teams (to OG 32) | wins/team/season vs T0: -0.009
    top flexes: C>OG 33, OG>OT 12, OG>C 8, OLB>TE 8, RB>TE 6, WR>TE 5
- T4 centre at the guard (C>OT 12, C>DT 12, C>OG 10): teams with a flex 30/32, emerg 0, stacked player out of position on 21/32 teams (to DT 3, OG 16, OT 2) | wins/team/season vs T0: -0.170
    top flexes: C>OG 17, OLB>TE 8, RB>TE 6, OG>OT 6, EDGE>TE 4, C>DT 3

## Scenario: + league-best real FB on every team
- T0 live (C>OT 12, C>DT 12, C>OG 6, FB>RB 2): teams with a flex 32/32, emerg 0, stacked player out of position on 32/32 teams (to TE 28, RB 4)
    top flexes: FB>TE 31, OG>OT 7, RB>TE 6, OT>C 4, FB>RB 4, OG>C 4
- T1 centre ability-only (C>OT 6, C>DT 9, C>OG 5): teams with a flex 32/32, emerg 0, stacked player out of position on 32/32 teams (to TE 28, RB 4) | wins/team/season vs T0: 0.012
    top flexes: FB>TE 31, OT>C 7, RB>TE 6, C>OT 6, OG>OT 5, FB>RB 4
- T2 centre cheap (C>OT 2, C>DT 2, C>OG 2): teams with a flex 32/32, emerg 0, stacked player out of position on 32/32 teams (to TE 28, RB 4) | wins/team/season vs T0: 0.075
    top flexes: FB>TE 31, C>OT 8, OT>C 8, OG>C 6, RB>TE 6, FB>RB 4
- T3 FB at the guard (FB>RB 18, FB>TE 18): teams with a flex 30/32, emerg 0, stacked player out of position on 1/31 teams (to TE 1) | wins/team/season vs T0: -0.218
    top flexes: OLB>TE 7, OG>OT 7, RB>TE 6, WR>TE 6, OT>C 5, SS>TE 4
- T4 centre at the guard (C>OT 12, C>DT 12, C>OG 10): teams with a flex 32/32, emerg 0, stacked player out of position on 32/32 teams (to TE 28, RB 4) | wins/team/season vs T0: -0.013
    top flexes: FB>TE 31, RB>TE 6, OG>OT 6, TE>OG 4, FB>RB 4, OG>C 4

## Scenario: + hypothetical 95 FB on every team
- T0 live (C>OT 12, C>DT 12, C>OG 6, FB>RB 2): teams with a flex 32/32, emerg 0, stacked player out of position on 32/32 teams (to TE 27, RB 5)
    top flexes: FB>TE 30, OG>OT 8, RB>TE 7, TE>OG 5, OT>C 5, FB>RB 5
- T1 centre ability-only (C>OT 6, C>DT 9, C>OG 5): teams with a flex 32/32, emerg 0, stacked player out of position on 32/32 teams (to TE 27, RB 5) | wins/team/season vs T0: 0.012
    top flexes: FB>TE 30, OT>C 8, RB>TE 7, OG>OT 6, C>OT 6, TE>OG 5
- T2 centre cheap (C>OT 2, C>DT 2, C>OG 2): teams with a flex 32/32, emerg 0, stacked player out of position on 32/32 teams (to TE 27, RB 5) | wins/team/season vs T0: 0.075
    top flexes: FB>TE 30, OT>C 9, C>OT 8, RB>TE 7, OG>C 6, TE>OG 5
- T3 FB at the guard (FB>RB 18, FB>TE 18): teams with a flex 32/32, emerg 0, stacked player out of position on 30/32 teams (to TE 30) | wins/team/season vs T0: -0.345
    top flexes: FB>TE 30, OG>OT 7, OT>C 4, OG>C 4, TE>OG 3, RB>TE 3
- T4 centre at the guard (C>OT 12, C>DT 12, C>OG 10): teams with a flex 32/32, emerg 0, stacked player out of position on 32/32 teams (to TE 27, RB 5) | wins/team/season vs T0: -0.010
    top flexes: FB>TE 30, RB>TE 7, OG>OT 7, TE>OG 6, FB>RB 5, OG>C 4

## Break-even surplus s* = p * w_dst / (w_dst - w_src)  (OVR a star must beat his own in-position replacement by before the optimizer flexes him; lower = easier to exploit)
- C>OT at 6: w_src 150, w_dst 300: s* = 12.0 OVR
- C>OT at 12: w_src 150, w_dst 300: s* = 24.0 OVR
- C>OT at 12: w_src 150, w_dst 500: s* = 17.1 OVR
- C>OG at 6: w_src 150, w_dst 400: s* = 9.6 OVR
- FB>RB at 2: w_src 25, w_dst 250: s* = 2.2 OVR
- FB>RB at 18: w_src 25, w_dst 250: s* = 20.0 OVR
- FB>TE at 6: w_src 25, w_dst 250: s* = 6.7 OVR
