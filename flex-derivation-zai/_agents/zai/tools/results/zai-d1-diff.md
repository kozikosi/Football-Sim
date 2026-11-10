# ZAI-D1 formula-versus-table diff (full 99 rules)

Design: tier( M + 0.4*S ), M = worst load-bearing deficit (need - have, per scoped duty),
S = remaining deficits at a discount. No D term. Cuts 1/4/9, tiers 0/2/6/12, cross-side floor 6.
Compare: Inkling P-322 88/11/0 (tier-error 11) without floor, 93/6/0 (tier-error 6) with floor.

**exact 95 / off-by-one 3 / hard 1 / tier-error 5** — zero fiat rows.

| rule | owner | model | raw | M on duty | S | verdict |
|---|---|---|---|---|---|---|
| C>DT | 12 | 12 | 9.12 | 7.20 RDEF | 4.80 | exact |
| C>FB | 0 | 0 | 0.00 | 0.00 - | 0.00 | exact |
| C>OG | 6 | 2 | 1.20 | 1.20 RDEF | 0.00 | off-by-one |
| C>OT | 12 | 2 | 2.03 | 1.55 PBLK | 1.20 | HARD |
| CB>DIME | 0 | 0 | 0.70 | 0.70 TKL | 0.00 | exact |
| CB>FS | 0 | 0 | 0.80 | 0.80 RNG | 0.00 | exact |
| CB>NICKEL | 0 | 0 | 0.70 | 0.70 TKL | 0.00 | exact |
| CB>SS | 0 | 0 | 0.70 | 0.70 TKL | 0.00 | exact |
| CB>WR | 6 | 6 | 5.18 | 3.90 RTE | 3.20 | exact |
| DT>C | 6 | 6 | 8.16 | 5.50 SNP | 6.65 | exact |
| DT>EDGE | 6 | 6 | 6.88 | 4.80 EREP | 5.20 | exact |
| DT>FB | 0 | 0 | 0.00 | 0.00 - | 0.00 | exact |
| DT>OG | 6 | 6 | 7.00 | 6.20 PBLK | 2.00 | exact |
| DT>OT | 6 | 6 | 8.55 | 7.75 PBLK | 2.00 | exact |
| EDGE>C | 6 | 6 | 8.16 | 5.50 SNP | 6.65 | exact |
| EDGE>DT | 0 | 0 | 0.00 | 0.00 - | 0.00 | exact |
| EDGE>FB | 0 | 0 | 0.00 | 0.00 - | 0.00 | exact |
| EDGE>ILB | 6 | 6 | 6.04 | 4.00 ZCOV | 5.10 | exact |
| EDGE>NICKEL | 6 | 6 | 7.58 | 4.50 DEEP | 7.70 | exact |
| EDGE>OG | 6 | 6 | 7.00 | 6.20 PBLK | 2.00 | exact |
| EDGE>OLB | 0 | 0 | 0.00 | 0.00 - | 0.00 | exact |
| EDGE>OT | 6 | 6 | 8.55 | 7.75 PBLK | 2.00 | exact |
| EDGE>RB | 6 | 12 | 10.40 | 7.20 CARRY | 8.00 | off-by-one |
| EDGE>SS | 12 | 12 | 9.48 | 5.00 ZCOV | 11.20 | exact |
| EDGE>TE | 6 | 6 | 7.16 | 5.20 RTE | 4.90 | exact |
| FB>RB | 2 | 2 | 3.30 | 2.10 CTH | 3.00 | exact |
| FB>TE | 6 | 6 | 4.74 | 3.10 PBLK | 4.10 | exact |
| FS>CB | 6 | 6 | 8.30 | 6.50 RTE | 4.50 | exact |
| FS>DIME | 0 | 0 | 0.70 | 0.70 TKL | 0.00 | exact |
| FS>NICKEL | 0 | 0 | 0.70 | 0.70 TKL | 0.00 | exact |
| FS>OLB | 6 | 6 | 4.68 | 3.60 RDEF | 2.70 | exact |
| FS>SS | 2 | 2 | 1.84 | 1.20 RDEF | 1.60 | exact |
| FS>WR | 12 | 12 | 12.60 | 10.40 RTE | 5.50 | exact |
| ILB>DIME | 12 | 12 | 9.64 | 9.00 DEEP | 1.60 | exact |
| ILB>EDGE | 12 | 12 | 12.60 | 10.80 EREP | 4.50 | exact |
| ILB>FB | 0 | 0 | 0.50 | 0.50 RBLK | 0.00 | exact |
| ILB>FS | 12 | 12 | 10.24 | 9.00 DEEP | 3.10 | exact |
| ILB>ILB | 0 | 0 | 0.00 | 0.00 - | 0.00 | exact |
| ILB>NICKEL | 6 | 6 | 4.82 | 4.50 DEEP | 0.80 | exact |
| ILB>OLB | 0 | 0 | 0.00 | 0.00 - | 0.00 | exact |
| ILB>SS | 2 | 2 | 3.32 | 3.00 DEEP | 0.80 | exact |
| ILB>TE | 6 | 6 | 7.42 | 5.20 RTE | 5.55 | exact |
| K>P | 2 | 2 | 2.00 | 2.00 PNT | 0.00 | exact |
| OG>C | 2 | 2 | 2.20 | 2.20 SNP | 0.00 | exact |
| OG>DT | 6 | 6 | 5.64 | 4.80 RDEF | 2.10 | exact |
| OG>EDGE | 6 | 6 | 8.60 | 4.80 EREP | 9.50 | exact |
| OG>FB | 0 | 0 | 0.00 | 0.00 - | 0.00 | exact |
| OG>OT | 2 | 2 | 1.55 | 1.55 PBLK | 0.00 | exact |
| OLB>DIME | 12 | 12 | 10.14 | 7.50 DEEP | 6.60 | exact |
| OLB>EDGE | 12 | 12 | 10.80 | 9.60 EREP | 3.00 | exact |
| OLB>FB | 0 | 0 | 0.50 | 0.50 RBLK | 0.00 | exact |
| OLB>FS | 12 | 12 | 11.74 | 7.50 DEEP | 10.60 | exact |
| OLB>ILB | 6 | 6 | 6.84 | 5.00 ZCOV | 4.60 | exact |
| OLB>NICKEL | 6 | 6 | 4.72 | 3.00 DEEP | 4.30 | exact |
| OLB>OLB | 0 | 0 | 0.00 | 0.00 - | 0.00 | exact |
| OLB>SS | 6 | 6 | 8.12 | 6.00 ZCOV | 5.30 | exact |
| OLB>TE | 6 | 6 | 7.42 | 5.20 RTE | 5.55 | exact |
| OT>C | 2 | 2 | 2.75 | 2.75 SNP | 0.00 | exact |
| OT>DT | 6 | 6 | 5.64 | 4.80 RDEF | 2.10 | exact |
| OT>EDGE | 6 | 6 | 8.60 | 4.80 EREP | 9.50 | exact |
| OT>FB | 0 | 0 | 0.00 | 0.00 - | 0.00 | exact |
| OT>OG | 0 | 0 | 0.00 | 0.00 - | 0.00 | exact |
| P>K | 2 | 2 | 2.00 | 2.00 KCK | 0.00 | exact |
| QB>FS | 12 | 12 | 17.08 | 9.00 DEEP | 20.20 | exact |
| RB>FB | 0 | 0 | 0.00 | 0.00 - | 0.00 | exact |
| RB>FS | 12 | 12 | 15.72 | 9.00 DEEP | 16.80 | exact |
| RB>SS | 12 | 12 | 13.68 | 7.00 ZCOV | 16.70 | exact |
| RB>TE | 6 | 6 | 5.41 | 4.65 PBLK | 1.90 | exact |
| RB>WR | 12 | 12 | 9.28 | 7.80 RTE | 3.70 | exact |
| SS>CB | 6 | 6 | 7.98 | 6.50 RTE | 3.70 | exact |
| SS>DIME | 0 | 0 | 0.00 | 0.00 - | 0.00 | exact |
| SS>FS | 2 | 2 | 1.08 | 0.80 RNG | 0.70 | exact |
| SS>ILB | 6 | 6 | 7.36 | 6.00 RDEF | 3.40 | exact |
| SS>NICKEL | 0 | 0 | 0.00 | 0.00 - | 0.00 | exact |
| SS>OLB | 2 | 2 | 3.12 | 2.40 RDEF | 1.80 | exact |
| SS>RB | 12 | 12 | 9.20 | 7.20 CARRY | 5.00 | exact |
| SS>TE | 6 | 6 | 7.49 | 4.65 PBLK | 7.10 | exact |
| SS>WR | 12 | 12 | 12.52 | 10.40 RTE | 5.30 | exact |
| TE>C | 6 | 6 | 7.21 | 4.95 SNP | 5.65 | exact |
| TE>DIME | 12 | 12 | 12.60 | 9.00 DEEP | 9.00 | exact |
| TE>DT | 12 | 12 | 9.84 | 7.20 RDEF | 6.60 | exact |
| TE>EDGE | 12 | 12 | 17.92 | 12.00 EREP | 14.80 | exact |
| TE>FB | 0 | 0 | 0.00 | 0.00 - | 0.00 | exact |
| TE>FS | 12 | 12 | 13.64 | 9.00 DEEP | 11.60 | exact |
| TE>ILB | 12 | 12 | 12.08 | 7.20 RDEF | 12.20 | exact |
| TE>NICKEL | 6 | 6 | 7.18 | 4.50 DEEP | 6.70 | exact |
| TE>OG | 6 | 6 | 7.08 | 6.20 PBLK | 2.20 | exact |
| TE>OLB | 6 | 6 | 5.48 | 3.60 RDEF | 4.70 | exact |
| TE>OT | 12 | 6 | 8.63 | 7.75 PBLK | 2.20 | off-by-one |
| TE>RB | 6 | 6 | 5.72 | 5.40 CARRY | 0.80 | exact |
| TE>SS | 6 | 6 | 8.96 | 4.00 ZCOV | 12.40 | exact |
| TE>WR | 12 | 12 | 9.04 | 7.80 RTE | 3.10 | exact |
| WR>CB | 6 | 6 | 8.66 | 4.50 MCOV | 10.40 | exact |
| WR>DIME | 6 | 6 | 8.32 | 5.00 ZCOV | 8.30 | exact |
| WR>FS | 6 | 6 | 8.40 | 6.00 ZCOV | 6.00 | exact |
| WR>NICKEL | 6 | 6 | 4.04 | 2.40 RDEF | 4.10 | exact |
| WR>RB | 6 | 6 | 4.68 | 3.60 CARRY | 2.70 | exact |
| WR>SS | 6 | 6 | 8.64 | 6.00 ZCOV | 6.60 | exact |
| WR>TE | 6 | 6 | 6.41 | 4.65 PBLK | 4.40 | exact |

Residuals: C>OG, C>OT = hub rows (the Owner prices the center's EXIT, not the entered job);
EDGE>RB = cross-side policy row (the floor stood in for a judgment); TE>OT = one tier short (8.63 vs the 9 cut).