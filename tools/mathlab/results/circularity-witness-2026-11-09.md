# Circularity witness — salary vs personal DEFAULT_WEIGHTS

Compared `/Users/kosi/Desktop/wt/vl/Football-Sim-PreColors.html` (40233d6be00e987c) vs `/Users/kosi/Desktop/wt/or/Football-Sim-PreColors.html` (395f26411333a41f).
Fit target per D-007: design.json (27 Oct) on the 1000 scale (= design.json x 0.00254 wins). 
Question: does the salary-based DEFAULT_WEIGHTS resolve circularity, or merely relocate it to the salary table?

| metric | Football-Sim-PreColors.h | Football-Sim-PreColors.h |
|----|----|----|
| slots in table | 34 | 34 |
| slots in intersection | 34 | |
| slots changed (delta != 0) | 30 | |
| max |delta| (wins) | 1.7272 | |
| total |delta| (wins) | 11.3234 | |
| rank rho (A vs B) | 0.7891 | |
| rank rho (A vs design.json fit target) | 0.8096 | |
| rank rho (B vs design.json fit target) | 0.8582 | |

Only in A: —
Only in B: —

## Per-slot deltas (A -> B), wins = delta units x 0.00254

| slot | Football-Sim-PreColors.h | Football-Sim-PreColors.h | delta (wins) | design.json | delta-from-design A | delta-from-design B |
|----|----|----|----|----|----|----|
| QB | 320 | 1000 | -1.7272 | 1000 | -680 | 0 |
| RB1 | 100 | 250 | -0.381 | 230 | -130 | 20 |
| RB2 | 40 | 100 | -0.1524 | 80 | -40 | 20 |
| WR1 | 60 | 650 | -1.4986 | 470 | -410 | 180 |
| WR2 | 40 | 400 | -0.9144 | 330 | -290 | 70 |
| WR3 | 20 | 100 | -0.2032 | 190 | -170 | -90 |
| WR4 | 5 | 50 | -0.1143 | 10 | -5 | 40 |
| TE1 | 80 | 250 | -0.4318 | 270 | -190 | -20 |
| TE2 | 20 | 150 | -0.3302 | 60 | -40 | 90 |
| OT1 | 295 | 500 | -0.5207 | 430 | -135 | 70 |
| OT2 | 295 | 300 | -0.0127 | 400 | -105 | -100 |
| OG1 | 295 | 400 | -0.2667 | 290 | 5 | 110 |
| OG2 | 295 | 250 | 0.1143 | 290 | 5 | -40 |
| C | 295 | 150 | 0.3683 | 320 | -25 | -170 |
| DE1 | 350 | 650 | -0.762 | 520 | -170 | 130 |
| DE2 | 350 | 300 | 0.127 | 400 | -50 | -100 |
| DT1 | 320 | 500 | -0.4572 | 400 | -80 | 100 |
| DT2 | 300 | 300 | 0 | 300 | 0 | 0 |
| DL5 | 5 | 150 | -0.3683 | 140 | -135 | 10 |
| MIKE | 100 | 300 | -0.508 | 260 | -160 | 40 |
| WILL | 100 | 150 | -0.127 | 240 | -140 | -90 |
| SAM | 60 | 100 | -0.1016 | 30 | 30 | 70 |
| LB4 | 5 | 5 | 0 | n/a | n/a | n/a |
| CB1 | 350 | 400 | -0.127 | 450 | -100 | -50 |
| CB2 | 295 | 250 | 0.1143 | 340 | -45 | -90 |
| CB3 | 80 | 100 | -0.0508 | 280 | -200 | -180 |
| CB4 | 20 | 50 | -0.0762 | n/a | n/a | n/a |
| SS | 80 | 300 | -0.5588 | 240 | -160 | 60 |
| SS2 | 5 | 5 | 0 | n/a | n/a | n/a |
| FS | 60 | 300 | -0.6096 | 260 | -200 | 40 |
| FS2 | 5 | 5 | 0 | n/a | n/a | n/a |
| K | 5 | 50 | -0.1143 | 200 | -195 | -150 |
| P | 1 | 50 | -0.1245 | 100 | -99 | -50 |
| FB | 1 | 25 | -0.061 | 30 | -29 | -5 |

## Verdict
Salary table (B) differs materially from personal table (A): 30 of 34 shared slots changed, max |delta| 1.7272 wins, rank rho(A,B)=0.7891.
Mechanics fit target (design.json) is a THIRD anchor: rho(A,design)=0.8096, rho(B,design)=0.8582 — neither table equals the fit target.
Conclusion: CIRCULARITY RELOCATED, not resolved: the display anchor moved from the personal table to the salary table while mechanics remains fit to the unvalidated design.json spec. The salary table is not a fit target (Owner P-013, binding); circularity is relocated, not removed.
