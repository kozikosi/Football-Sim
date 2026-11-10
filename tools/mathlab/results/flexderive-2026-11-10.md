# flexderive (read-only prototype of one formula for the 99-rule flex table), run 10 Nov 2026 on flex.json at a722681

## node tools/mathlab/flexderive.mjs --literal
```
flexderive: 99 live rules scored (0 skipped, no profile) | D table results/thetaprice-2026-11-09.md | floor none
exact 87 | off by one tier 12 | hard misses 0
by source: pure formula 68/80 exact | formula+U 5/5 | fiat (override + FB list) 14/14
rules with no D row (D taken as 0): ILB>FS OLB>FS
disagreements (rule: owner -> model, raw score):
  CB>FS: 0 -> 2  raw 1.40  [formula]
  CB>SS: 0 -> 2  raw 2.40  [formula]
  EDGE>OLB: 0 -> 2  raw 1.75  [formula]
  ILB>OLB: 0 -> 2  raw 2.10  [formula]
  OG>OT: 2 -> 6  raw 4.74  [formula]
  SS>DIME: 0 -> 2  raw 1.40  [formula]
  SS>NICKEL: 0 -> 2  raw 1.00  [formula]
  WR>CB: 6 -> 2  raw 1.90  [formula]
  WR>DIME: 6 -> 2  raw 3.15  [formula]
  WR>FS: 6 -> 2  raw 3.50  [formula]
  WR>NICKEL: 6 -> 2  raw 1.27  [formula]
  WR>SS: 6 -> 2  raw 3.15  [formula]
cut-point re-fit, D alone (83 D-priced rules): at 1/4/9 -> 38 exact; best 38 at 1/4/9; top ties within 1: 1104 triples
cut-point re-fit, full formula (85 scored rules, floor none not applied in the fit): at 1/4/9 -> 73 exact; best 76 at 1.5/4/9; 5 triples tie at the best; nearest to 1/4/9: 1.5/4/9
```

## node tools/mathlab/flexderive.mjs 
```
flexderive: 99 live rules scored (0 skipped, no profile) | D table results/thetaprice-2026-11-09.md | floor none
exact 88 | off by one tier 11 | hard misses 0
by source: pure formula 69/80 exact | formula+U 5/5 | fiat (override + FB list) 14/14
rules with no D row (D taken as 0): ILB>FS OLB>FS
disagreements (rule: owner -> model, raw score):
  CB>FS: 0 -> 2  raw 1.40  [formula]
  CB>SS: 0 -> 2  raw 2.40  [formula]
  EDGE>OLB: 0 -> 2  raw 1.75  [formula]
  ILB>OLB: 0 -> 2  raw 2.10  [formula]
  SS>DIME: 0 -> 2  raw 1.40  [formula]
  SS>NICKEL: 0 -> 2  raw 1.00  [formula]
  WR>CB: 6 -> 2  raw 1.90  [formula]
  WR>DIME: 6 -> 2  raw 3.15  [formula]
  WR>FS: 6 -> 2  raw 3.50  [formula]
  WR>NICKEL: 6 -> 2  raw 1.27  [formula]
  WR>SS: 6 -> 2  raw 3.15  [formula]
cut-point re-fit, D alone (83 D-priced rules): at 1/4/9 -> 38 exact; best 38 at 1/4/9; top ties within 1: 1104 triples
cut-point re-fit, full formula (85 scored rules, floor none not applied in the fit): at 1/4/9 -> 74 exact; best 77 at 1.5/4/9; 1 triples tie at the best; nearest to 1/4/9: 1.5/4/9
```

## node tools/mathlab/flexderive.mjs --floor 6
```
flexderive: 99 live rules scored (0 skipped, no profile) | D table results/thetaprice-2026-11-09.md | floor 6
exact 93 | off by one tier 6 | hard misses 0
by source: pure formula 74/80 exact | formula+U 5/5 | fiat (override + FB list) 14/14
rules with no D row (D taken as 0): ILB>FS OLB>FS
disagreements (rule: owner -> model, raw score):
  CB>FS: 0 -> 2  raw 1.40  [formula]
  CB>SS: 0 -> 2  raw 2.40  [formula]
  EDGE>OLB: 0 -> 2  raw 1.75  [formula]
  ILB>OLB: 0 -> 2  raw 2.10  [formula]
  SS>DIME: 0 -> 2  raw 1.40  [formula]
  SS>NICKEL: 0 -> 2  raw 1.00  [formula]
cut-point re-fit, D alone (83 D-priced rules): at 1/4/9 -> 38 exact; best 38 at 1/4/9; top ties within 1: 1104 triples
cut-point re-fit, full formula (85 scored rules, floor 6 not applied in the fit): at 1/4/9 -> 74 exact; best 77 at 1.5/4/9; 1 triples tie at the best; nearest to 1/4/9: 1.5/4/9
```

## node tools/mathlab/flexderive.mjs --floor 6 --cuts 1.5,4,9
```
flexderive: 99 live rules scored (0 skipped, no profile) | D table results/thetaprice-2026-11-09.md | floor 6
exact 96 | off by one tier 3 | hard misses 0
by source: pure formula 77/80 exact | formula+U 5/5 | fiat (override + FB list) 14/14
rules with no D row (D taken as 0): ILB>FS OLB>FS
disagreements (rule: owner -> model, raw score):
  CB>SS: 0 -> 2  raw 2.40  [formula]
  EDGE>OLB: 0 -> 2  raw 1.75  [formula]
  ILB>OLB: 0 -> 2  raw 2.10  [formula]
cut-point re-fit, D alone (83 D-priced rules): at 1/4/9 -> 38 exact; best 38 at 1/4/9; top ties within 1: 1104 triples
cut-point re-fit, full formula (85 scored rules, floor 6 not applied in the fit): at 1/4/9 -> 74 exact; best 77 at 1.5/4/9; 1 triples tie at the best; nearest to 1/4/9: 1.5/4/9
```
