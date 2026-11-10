```
flexunify | 97 Owner rules (excl. same-role) of 306 ordered pairs | slot values v from sport-football.json (slots.ts a722681 + WILL/C bumps)
zai     k=- s=1.00 gam=0 | mean error 1.34 OVR | Spearman 0.931 | exact tiers 96/97
zai+G   k=- s=1.00 gam=0 | mean error 1.53 OVR | Spearman 0.897 | exact tiers 94/97
U-need  k=Infinity s=1.20 gam=0 | mean error 1.38 OVR | Spearman 0.876 | exact tiers 84/97
U-self  k=Infinity s=0.90 gam=0 | mean error 2.28 OVR | Spearman 0.669 | exact tiers 66/97
LORO U-need: held-out mean error 1.44 OVR over 194 cases, exact tiers 168/194; worst roles RB 2.9(10), FB 2.7(11), TE 1.7(21), OG 1.6(10)
LORO U-self: held-out mean error 2.43 OVR over 194 cases, exact tiers 125/194; worst roles FB 7.0(11), NICKEL 3.7(8), RB 3.7(10), DIME 3.1(7)
dial sweep, Z.ai ability + guard: price = || (L, a*G) ||_q   [exact tiers / mean error / centre-out arbitrage rows (C>X price < G - 1)]
  q=1: a=0: 96/97 1.34 C-arb 4 | a=0.25: 88/97 1.59 C-arb 2 | a=0.5: 83/97 2.22 C-arb 0 | a=0.75: 82/97 2.90 C-arb 0 | a=1: 81/97 3.58 C-arb 0
  q=2: a=0: 96/97 1.34 C-arb 4 | a=0.25: 95/97 1.33 C-arb 4 | a=0.5: 91/97 1.42 C-arb 3 | a=0.75: 88/97 1.67 C-arb 0 | a=1: 84/97 2.11 C-arb 0
  q=4: a=0: 96/97 1.34 C-arb 4 | a=0.25: 95/97 1.34 C-arb 4 | a=0.5: 94/97 1.38 C-arb 4 | a=0.75: 94/97 1.45 C-arb 3 | a=1: 90/97 1.64 C-arb 0
  q=Infinity: a=0: 96/97 1.34 C-arb 4 | a=0.25: 95/97 1.35 C-arb 4 | a=0.5: 94/97 1.41 C-arb 4 | a=0.75: 95/97 1.49 C-arb 4 | a=1: 94/97 1.53 C-arb 0
(zai constants are Z.ai's fixed lambda 0.4 and cuts 1/4/9, authored profile tables fit to the 99 by hand: its held-out accuracy is UNMEASURED)
k sweep (U-need, s refit): k=1: err 2.80 ex 68 | k=1.5: err 1.92 ex 72 | k=2: err 1.67 ex 81 | k=3: err 1.50 ex 84 | k=4: err 1.45 ex 84 | k=6: err 1.41 ex 84 | k=Infinity: err 1.38 ex 84
U-need disagreements >= 3.5 points (5): owner -> model [G]
  FB>RB: 2 -> 18.0 [G 18.0]
  FB>TE: 6 -> 18.0 [G 18.0]
  EDGE>SS: 12 -> 6.0 [G 0.0]
  C>OG: 6 -> 10.0 [G 10.0]
  RB>SS: 12 -> 8.4 [G 3.3]
natural integer output over all 306 pairs (rounded, 20 = cap bucket): 0:13 1:11 2:6 3:7 4:6 5:41 6:20 7:17 8:7 9:22 10:13 11:32 12:11 13:9 14:10 15:12 16:15 17:24 18:17 19:12 20:1
  on the Owner's 97 rules: 0:13 1:10 2:2 3:4 4:6 5:6 6:14 7:10 8:5 9:7 10:2 11:7 12:6 13:1 14:2 18:2
  allowed iff price < 8: 72.5% right (majority baseline "all forbidden" 68.3%)
  allowed iff price < 10: 68.0% right (majority baseline "all forbidden" 68.3%)
  allowed iff price < 12: 59.5% right (majority baseline "all forbidden" 68.3%)
  allowed iff price < 14: 58.8% right (majority baseline "all forbidden" 68.3%)
  allowed iff price < 16: 50.7% right (majority baseline "all forbidden" 68.3%)
  allowed iff price < 18: 38.2% right (majority baseline "all forbidden" 68.3%)
  allowed iff price < 20: 31.7% right (majority baseline "all forbidden" 68.3%)
  allowed iff price < 24: 31.7% right (majority baseline "all forbidden" 68.3%)
center diagnostic (C>X: owner / zai / zai+G / U-need / G):
  C>QB: - / 15.7 / 16.0 / 16.8 / 16.0
  C>RB: - / 12.9 / 12.9 / 9.7 / 4.0
  C>FB: 0 / 0.0 / 0.0 / 0.0 / 0.0
  C>WR: - / 18.2 / 18.2 / 15.6 / 13.8
  C>TE: - / 8.6 / 8.6 / 6.2 / 4.0
  C>OT: 12 / 6.7 / 12.0 / 12.0 / 12.0
  C>OG: 6 / 5.1 / 10.0 / 10.0 / 10.0
  C>DT: 12 / 9.1 / 12.0 / 12.0 / 12.0
  C>EDGE: - / 12.0 / 13.8 / 13.8 / 13.8
  C>ILB: - / 16.8 / 16.8 / 9.0 / 6.7
  C>SS: - / 17.8 / 17.8 / 10.8 / 6.7
  C>FS: - / 19.7 / 19.7 / 10.8 / 6.7
  C>CB: - / 27.3 / 27.3 / 16.2 / 10.0
arbitrage rows (price < guard - 1) in zai: 38 of 306 | RB>WR (9.3 vs 12.3), FB>QB (14.0 vs 19.5), FB>RB (3.3 vs 18.0), FB>WR (11.7 vs 19.2), FB>TE (4.7 vs 18.0), FB>OT (12.6 vs 19.0), FB>OG (11.0 vs 18.8), FB>C (11.7 vs 17.5), FB>DT (8.8 vs 19.0), FB>EDGE (17.0 vs 19.2), FB>ILB (12.6 vs 18.3), FB>OLB (4.8 vs 17.5), FB>SS (12.8 vs 18.3), FB>FS (16.0 vs 18.3), FB>K (4.0 vs 10.0), FB>P (4.0 vs 10.0), FB>NICKEL (9.3 vs 15.0), TE>WR (9.0 vs 12.3), C>OT (6.7 vs 12.0), C>OG (5.1 vs 10.0), C>DT (9.1 vs 12.0), C>EDGE (12.0 vs 13.8), ILB>DT (1.9 vs 8.0), OLB>QB (14.7 vs 16.0), OLB>DT (3.0 vs 12.0), OLB>EDGE (10.8 vs 13.8), CB>WR (5.2 vs 7.7), K>QB (15.4 vs 19.0), K>RB (14.6 vs 16.0), K>TE (13.7 vs 16.0), K>DT (16.6 vs 18.0), K>OLB (12.0 vs 15.0), P>QB (15.4 vs 19.0), P>RB (14.6 vs 16.0), P>TE (13.7 vs 16.0), P>DT (16.6 vs 18.0), P>OLB (12.0 vs 15.0)
arbitrage rows (price < guard - 1) in zai+G: 0 of 306
arbitrage rows (price < guard - 1) in U-need: 0 of 306
arbitrage rows (price < guard - 1) in U-self: 0 of 306
  allowed iff source has >= 0.3 of the core duty: 80.1% right
  allowed iff source has >= 0.5 of the core duty: 84.0% right
  allowed iff source has >= 0.6 of the core duty: 81.7% right
  allowed iff source has >= 0.7 of the core duty: 77.5% right
  allowed iff source has >= 0.8 of the core duty: 76.5% right
emergent slot DL5 blitzer (0.7 EDGE + 0.3 DT demand, v=300): DT 3.0, EDGE 0.0, OLB 8.0, ILB 8.6, OG 4.8
emergent slot Big nickel (0.5 SS + 0.3 OLB + 0.2 CB demand, v=100): SS 0.4, OLB 4.6, ILB 4.0, CB 0.4, FS 1.7, WR 4.6, TE 4.0
dual positions (holdings {CB,WR}): play WR 0, play CB 0, play NICKEL 0.8 (vs CB alone 0.8), play FS 1.0, play RB 4.3
```
