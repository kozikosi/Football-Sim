SPEAKER: ernie | ROLE: council advisor | TASK: review formation-gap.test.ts — are 2700/1800/900 a pin or arithmetic? | DATE: 2026-11-16T02:19Z
FOR: P-342

**Verdict: keep them (ok), with two presentational changes. They are arithmetic on a frozen retired table, not a pin on the gap.** I did not change the file; this is a report. Owner decides.

## 1. What the file actually does (VERIFIED, read at `86f22d10`)
`colors/test/nfl/formation-gap.test.ts`:
- line 14–16 comment states the intent: *"the exact numbers below (600250, 2700, 1800) are arithmetic on the RETIRED fitted table, so those tests run under `tableValues()`: they prove the solver logic is untouched by the seam."*
- the three table tests call `loss(base, dl5, tableValues())` / `lineupFor(..., tableValues())` **explicitly** (lines 22–24, 28, 31–33, 36–38). They never touch the default provider.
- a fourth table test (line 40) and a fifth MEASURED test (line 49) assert **structure** and only `REPORT` the numbers.

So the file already keeps the two providers separate, and the retired-table asserts are not reachable from the default path.

## 2. Why they are arithmetic, not a pin (VERIFIED by derivation)
Every asserted number is derivable from two frozen tables (`WEIGHT` in `slots.ts`, `FLEX` = `flex.json`) with no measurement:

| assert | derivation | check |
|---|---|---|
| `600250` | 70 OVR × Σ WEIGHT over the 32 spots = 70 × 8575 | `node /tmp/sumw.mjs` → `4-3: sum WEIGHT 8575 x70 = 600250`, `3-4` identical |
| `2700` | 4-3 roster in 3-4 flexes TE3←FB@6 (w50) + DT2←OLB@6 (w300) + SAM←TE@6 (w100) → 6×(50+300+100) | my probe prints exactly those three, all at 6; 6×450 = 2700 |
| `1800` | 3-4 roster in 4-3 flexes DL5←ILB@12 (w150) → 12×150 | my probe prints `DL5<-ILB@12 w=150`; 1800 |
| `1800 / 1800 / 0` | with a natural EDGE at DL5 the 4-3 roster's only flex is DT2←EDGE@6 (w300) → 6×300 | my probe prints `DT2<-EDGE@6 w=300`; both arms 1800 |
| `900` | 2700 − 1800 | — |

My independent run (probe `/tmp/probe.mjs`, table provider):
```
TABLE 4-3->3-4 DL5=DT: flexed TE3<-FB@6 w=50  DT2<-OLB@6 w=300  SAM<-TE@6 w=100
  own 600250.0000  away 597550.0000  loss 2700.0000
TABLE 3-4->4-3 DL5=DT: flexed DL5<-ILB@12 w=150
  own 600250.0000  away 598450.0000  loss 1800.0000
TABLE 4-3->3-4 DL5=EDGE: flexed DT2<-EDGE@6 w=300 ; loss 1800.0000
```
**These are sums of products of two frozen tables.** They cannot "pin the gap" in the Owner's sense, because the MEASURED gap (2773.0387) is a *different quantity* measured under a *different provider*, and nothing in the file asserts it. The Owner's ruling ("nothing is pinned to the 2773 number") is not threatened by them.

## 3. The one real risk, and it is not the one the brief names
The brief asks whether these are "a number-pin on the gap (and therefore should go, so the gap can emerge)". My read: **the gap already emerges** — under the default provider the gap is 2773.0387 and is printed as a REPORT (lineup.test.ts and the MEASURED test at line 49–57). The table asserts do not suppress that. What they *do* do is freeze the **solver's flex mechanics** against a known table, which is the only way to notice that the Hungarian or the fit() wiring changed. Delete them and a transposed cost matrix or a dropped penalty would still pass the MEASURED tests (which assert structure and `a > 0 && b > 0`).

The real risk is presentational: **a reader who meets "2700" in a test file will quote it as the product's formation gap.** That is how 2700 outlived its table. So:

**Recommendation 1 (keep).** Keep all three table tests.
**Recommendation 2 (relabel).** Change the header word "reference table" to "**retired table — arithmetic pin, not a product number**" and add one line to each assert: `// 600250 = 70 x ΣWEIGHT(8575); 2700 = 6 x (50+300+100); 1800 = 12 x 150.` A reader who can see the arithmetic cannot mistake it for a measurement.
**Recommendation 3 (do not touch).** Do not add a MEASURED number to this file. The MEASURED test at line 49 is correctly structure-only; a number there is exactly what the Owner removed.

## 4. One thing I would tighten (small, optional)
Line 52's `Math.max(...own) − Math.min(...own) < 32` ("less than one unit per spot on average") is the only MEASURED gate in the file. It is a *soft* bound: 32 is 32 spots × 1 unit, but it would still pass if every own-base value moved together by 31.9 (a systematic provider bias). That is acceptable for a "same position, same value in both bases" check, but it is not a bound on provider drift. Naming it as such in the comment would stop it being read as one.

## Ledger
- VERIFIED: the three table tests run under `tableValues()` explicitly; 600250 = 70×8575; 2700 = 6×450; 1800 = 12×150; the MEASURED test reports 2773.0387 and asserts structure only; my independent probe reproduces all four cells.
- INFERRED: deleting the table asserts would leave a transposed cost matrix or a dropped penalty undetected by the MEASURED tests.
- UNKNOWN: none material. Owner's call.