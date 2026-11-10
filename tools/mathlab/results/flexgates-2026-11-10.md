# flexgates runs, 10 Nov 2026, flex.json at a722681 (the live 99-rule table), player table data/nfl/madden27-ratings.csv
Read-only. The four configs: v1 pre-registered craft table; v1r = v1 + room/side terms; v2 post-hoc (FB craft-free, 3 waivers); v3 = v2 + rooms.

## node tools/mathlab/flexgates.mjs --sport sport-football.json
```
flexgates | sport-football.json | 306 ordered pairs: 97 allowed in the table (+2 same-role rules at 0), 209 not allowed | waivers (fiat) none
price, mode max: kP 0 kC 1 kR 0 kS 0 cuts 0.50 / 1.50 / 8.85 | exact 67/99 (fiat 0)
price, mode sum: kP 1 kC 1 kR 0 kS 0 cuts 1.98 / 2.53 / 8.70 | exact 69/99 (fiat 0)
price, mode add: kP 1 kC 1.5 kR 0 kS 0 cuts 2.63 / 4.50 / 13.10 | exact 70/99 (fiat 0)
price, chosen add: exact 70/99, off by one 20, hard 9   [baselines on the same 99: Inkling 88 (93 with floor), Z.ai 95 (98 with MUSE edits)]
  ablation guard only     exact 54/99
  ablation guard + body   exact 57/99
  ablation guard + craft  exact 67/99
  ablation body + craft   exact 70/99
  ablation guard+craft+rooms exact 67/99
  ablation all five       exact 70/99
  5-fold CV (5 repeats), exact on held-out allowed pairs: 64.9%  (in-sample 70.1%)
  leave-one-role-out (constants fit blind to the role, then it is priced): exact 61.3% over 194 cases; hardest: QB 0% of 1, FB 0% of 11, ILB 42% of 12, FS 43% of 14
  binding gate on the 97 priced pairs: all 95, none 2
  disagreements (29): owner -> model [raw; G/P/C]
    QB>FS: 12 -> 6 [11.9; 0.0/2.9/6]
    RB>FB: 0 -> 2 [3.8; 0.0/0.8/2]
    RB>SS: 12 -> 6 [9.3; 3.3/0.0/4]
    RB>FS: 12 -> 6 [10.8; 3.3/0.0/5]
    FB>RB: 2 -> 12 [22.5; 18.0/3.0/1]
    FB>TE: 6 -> 12 [20.0; 18.0/0.5/1]
    TE>ILB: 12 -> 6 [10.1; 3.3/0.8/4]
    TE>DIME: 12 -> 6 [8.2; 0.0/3.7/3]
    OT>FB: 0 -> 6 [5.7; 0.0/2.7/2]
    OT>EDGE: 6 -> 12 [15.7; 4.6/3.5/5]
    OG>FB: 0 -> 6 [6.0; 0.0/3.0/2]
    OG>EDGE: 6 -> 12 [19.1; 7.7/3.9/5]
    C>FB: 0 -> 6 [5.9; 0.0/2.9/2]
    C>OT: 12 -> 6 [12.5; 12.0/0.5/0]
    DT>FB: 0 -> 6 [9.4; 0.0/1.9/5]
    EDGE>FB: 0 -> 6 [7.5; 0.0/0.0/5]
    EDGE>ILB: 6 -> 0 [1.0; 0.0/1.0/0]
    EDGE>SS: 12 -> 6 [7.3; 0.0/2.8/3]
    ILB>FB: 0 -> 6 [8.5; 0.0/1.0/5]
    ILB>SS: 2 -> 6 [6.1; 0.0/1.6/3]
    ILB>FS: 12 -> 6 [7.6; 0.0/1.6/4]
    ILB>DIME: 12 -> 6 [7.2; 0.0/2.7/3]
    OLB>FB: 0 -> 6 [8.5; 0.0/1.0/5]
    OLB>DIME: 12 -> 6 [6.9; 0.0/2.4/3]
    SS>RB: 12 -> 6 [6.2; 0.0/1.7/3]
    SS>OLB: 2 -> 6 [5.0; 0.0/2.0/2]
    SS>FS: 2 -> 0 [1.5; 0.0/0.0/1]
    FS>SS: 2 -> 0 [0.2; 0.0/0.2/0]
    P>K: 2 -> 0 [1.5; 0.0/0.0/1]
support: allowed iff body gap <= 3.25 and craft gap <= 2 | in-sample 79.4% | 5-fold CV 78.1% | leave-one-role-out 77.8% | majority baseline (all not allowed) 68.3%
  support errors: 9 pairs allowed by the rule but absent from the table, 54 table pairs the rule forbids
```

## node tools/mathlab/flexgates.mjs --sport sport-football-v1r.json
```
flexgates | football v1 + rooms | 306 ordered pairs: 97 allowed in the table (+2 same-role rules at 0), 209 not allowed | waivers (fiat) none
price, mode max: kP 0 kC 1 kR 0 kS 0 cuts 0.50 / 1.50 / 8.85 | exact 67/99 (fiat 0)
price, mode sum: kP 1 kC 1 kR 0 kS 0 cuts 1.98 / 2.53 / 8.70 | exact 69/99 (fiat 0)
price, mode add: kP 1 kC 1.5 kR 0 kS 0 cuts 2.63 / 4.50 / 13.10 | exact 70/99 (fiat 0)
price, chosen add: exact 70/99, off by one 20, hard 9   [baselines on the same 99: Inkling 88 (93 with floor), Z.ai 95 (98 with MUSE edits)]
  ablation guard only     exact 54/99
  ablation guard + body   exact 57/99
  ablation guard + craft  exact 67/99
  ablation body + craft   exact 70/99
  ablation guard+craft+rooms exact 69/99
  ablation all five       exact 70/99
  5-fold CV (5 repeats), exact on held-out allowed pairs: 59.2%  (in-sample 70.1%)
  leave-one-role-out (constants fit blind to the role, then it is priced): exact 57.7% over 194 cases; hardest: QB 0% of 1, FB 0% of 11, C 33% of 9, ILB 42% of 12
  binding gate on the 97 priced pairs: all 95, none 2
  disagreements (29): owner -> model [raw; G/P/C]
    QB>FS: 12 -> 6 [11.9; 0.0/2.9/6]
    RB>FB: 0 -> 2 [3.8; 0.0/0.8/2]
    RB>SS: 12 -> 6 [9.3; 3.3/0.0/4]
    RB>FS: 12 -> 6 [10.8; 3.3/0.0/5]
    FB>RB: 2 -> 12 [22.5; 18.0/3.0/1]
    FB>TE: 6 -> 12 [20.0; 18.0/0.5/1]
    TE>ILB: 12 -> 6 [10.1; 3.3/0.8/4]
    TE>DIME: 12 -> 6 [8.2; 0.0/3.7/3]
    OT>FB: 0 -> 6 [5.7; 0.0/2.7/2]
    OT>EDGE: 6 -> 12 [15.7; 4.6/3.5/5]
    OG>FB: 0 -> 6 [6.0; 0.0/3.0/2]
    OG>EDGE: 6 -> 12 [19.1; 7.7/3.9/5]
    C>FB: 0 -> 6 [5.9; 0.0/2.9/2]
    C>OT: 12 -> 6 [12.5; 12.0/0.5/0]
    DT>FB: 0 -> 6 [9.4; 0.0/1.9/5]
    EDGE>FB: 0 -> 6 [7.5; 0.0/0.0/5]
    EDGE>ILB: 6 -> 0 [1.0; 0.0/1.0/0]
    EDGE>SS: 12 -> 6 [7.3; 0.0/2.8/3]
    ILB>FB: 0 -> 6 [8.5; 0.0/1.0/5]
    ILB>SS: 2 -> 6 [6.1; 0.0/1.6/3]
    ILB>FS: 12 -> 6 [7.6; 0.0/1.6/4]
    ILB>DIME: 12 -> 6 [7.2; 0.0/2.7/3]
    OLB>FB: 0 -> 6 [8.5; 0.0/1.0/5]
    OLB>DIME: 12 -> 6 [6.9; 0.0/2.4/3]
    SS>RB: 12 -> 6 [6.2; 0.0/1.7/3]
    SS>OLB: 2 -> 6 [5.0; 0.0/2.0/2]
    SS>FS: 2 -> 0 [1.5; 0.0/0.0/1]
    FS>SS: 2 -> 0 [0.2; 0.0/0.2/0]
    P>K: 2 -> 0 [1.5; 0.0/0.0/1]
support: allowed iff body gap <= 3.25 and craft gap <= 2 | in-sample 79.4% | 5-fold CV 78.1% | leave-one-role-out 77.8% | majority baseline (all not allowed) 68.3%
  support errors: 9 pairs allowed by the rule but absent from the table, 54 table pairs the rule forbids
```

## node tools/mathlab/flexgates.mjs --sport sport-football-v2.json
```
flexgates | football v2 (post-hoc: FB craft-free body slot, 3 named waivers) | 306 ordered pairs: 97 allowed in the table (+2 same-role rules at 0), 209 not allowed | waivers (fiat) FB>RB FB>TE C>OG
price, mode max: kP 0 kC 1 kR 0 kS 0 cuts 0.50 / 1.50 / 8.85 | exact 79/99 (fiat 3)
price, mode sum: kP 0 kC 1 kR 0 kS 0 cuts 0.50 / 1.50 / 8.85 | exact 79/99 (fiat 3)
price, mode add: kP 1 kC 2 kR 0 kS 0 cuts 3.17 / 5.06 / 14.67 | exact 80/99 (fiat 3)
price, chosen add: exact 80/99, off by one 18, hard 1   [baselines on the same 99: Inkling 88 (93 with floor), Z.ai 95 (98 with MUSE edits)]
  ablation guard only     exact 57/99
  ablation guard + body   exact 59/99
  ablation guard + craft  exact 78/99
  ablation body + craft   exact 80/99
  ablation guard+craft+rooms exact 78/99
  ablation all five       exact 80/99
  5-fold CV (5 repeats), exact on held-out allowed pairs: 69.8%  (in-sample 79.8%)
  leave-one-role-out (constants fit blind to the role, then it is priced): exact 66.5% over 188 cases; hardest: QB 0% of 1, K 0% of 2, P 0% of 2, OG 44% of 9
  binding gate on the 94 priced pairs: all 91, none 3
  disagreements (19): owner -> model [raw; G/P/C]
    RB>SS: 12 -> 6 [11.3; 3.3/0.0/4]
    RB>FS: 12 -> 6 [13.3; 3.3/0.0/5]
    TE>ILB: 12 -> 6 [12.1; 3.3/0.8/4]
    TE>DIME: 12 -> 6 [9.7; 0.0/3.7/3]
    OT>EDGE: 6 -> 12 [18.2; 4.6/3.5/5]
    OG>EDGE: 6 -> 12 [21.6; 7.7/3.9/5]
    C>OT: 12 -> 6 [12.5; 12.0/0.5/0]
    EDGE>ILB: 6 -> 0 [1.0; 0.0/1.0/0]
    EDGE>SS: 12 -> 6 [8.8; 0.0/2.8/3]
    ILB>EDGE: 12 -> 6 [14.2; 10.8/1.5/1]
    ILB>SS: 2 -> 6 [7.6; 0.0/1.6/3]
    ILB>FS: 12 -> 6 [9.6; 0.0/1.6/4]
    ILB>DIME: 12 -> 6 [8.7; 0.0/2.7/3]
    OLB>DIME: 12 -> 6 [8.4; 0.0/2.4/3]
    SS>RB: 12 -> 6 [7.7; 0.0/1.7/3]
    SS>OLB: 2 -> 6 [6.0; 0.0/2.0/2]
    SS>FS: 2 -> 0 [2.0; 0.0/0.0/1]
    FS>SS: 2 -> 0 [0.2; 0.0/0.2/0]
    P>K: 2 -> 0 [2.0; 0.0/0.0/1]
support: allowed iff body gap <= 2.75 and craft gap <= 2 | in-sample 80.4% | 5-fold CV 79.6% | leave-one-role-out 79.1% | majority baseline (all not allowed) 68.3%
  support errors: 5 pairs allowed by the rule but absent from the table, 55 table pairs the rule forbids
```

## node tools/mathlab/flexgates.mjs --sport sport-football-v3.json
```
flexgates | football v3 (v2 + rooms) | 306 ordered pairs: 97 allowed in the table (+2 same-role rules at 0), 209 not allowed | waivers (fiat) FB>RB FB>TE C>OG
price, mode max: kP 0 kC 1 kR 0 kS 0 cuts 0.50 / 1.50 / 8.85 | exact 79/99 (fiat 3)
price, mode sum: kP 0 kC 1 kR 0 kS 0 cuts 0.50 / 1.50 / 8.85 | exact 79/99 (fiat 3)
price, mode add: kP 1 kC 2 kR 0 kS 0 cuts 3.17 / 5.06 / 14.67 | exact 80/99 (fiat 3)
price, chosen add: exact 80/99, off by one 18, hard 1   [baselines on the same 99: Inkling 88 (93 with floor), Z.ai 95 (98 with MUSE edits)]
  ablation guard only     exact 57/99
  ablation guard + body   exact 59/99
  ablation guard + craft  exact 78/99
  ablation body + craft   exact 80/99
  ablation guard+craft+rooms exact 78/99
  ablation all five       exact 80/99
  5-fold CV (5 repeats), exact on held-out allowed pairs: 69.4%  (in-sample 79.8%)
  leave-one-role-out (constants fit blind to the role, then it is priced): exact 66.0% over 188 cases; hardest: QB 0% of 1, K 0% of 2, P 0% of 2, OG 44% of 9
  binding gate on the 94 priced pairs: all 91, none 3
  disagreements (19): owner -> model [raw; G/P/C]
    RB>SS: 12 -> 6 [11.3; 3.3/0.0/4]
    RB>FS: 12 -> 6 [13.3; 3.3/0.0/5]
    TE>ILB: 12 -> 6 [12.1; 3.3/0.8/4]
    TE>DIME: 12 -> 6 [9.7; 0.0/3.7/3]
    OT>EDGE: 6 -> 12 [18.2; 4.6/3.5/5]
    OG>EDGE: 6 -> 12 [21.6; 7.7/3.9/5]
    C>OT: 12 -> 6 [12.5; 12.0/0.5/0]
    EDGE>ILB: 6 -> 0 [1.0; 0.0/1.0/0]
    EDGE>SS: 12 -> 6 [8.8; 0.0/2.8/3]
    ILB>EDGE: 12 -> 6 [14.2; 10.8/1.5/1]
    ILB>SS: 2 -> 6 [7.6; 0.0/1.6/3]
    ILB>FS: 12 -> 6 [9.6; 0.0/1.6/4]
    ILB>DIME: 12 -> 6 [8.7; 0.0/2.7/3]
    OLB>DIME: 12 -> 6 [8.4; 0.0/2.4/3]
    SS>RB: 12 -> 6 [7.7; 0.0/1.7/3]
    SS>OLB: 2 -> 6 [6.0; 0.0/2.0/2]
    SS>FS: 2 -> 0 [2.0; 0.0/0.0/1]
    FS>SS: 2 -> 0 [0.2; 0.0/0.2/0]
    P>K: 2 -> 0 [2.0; 0.0/0.0/1]
support: allowed iff body gap <= 2.75 and craft gap <= 2 | in-sample 80.4% | 5-fold CV 79.6% | leave-one-role-out 79.1% | majority baseline (all not allowed) 68.3%
  support errors: 5 pairs allowed by the rule but absent from the table, 55 table pairs the rule forbids
```
