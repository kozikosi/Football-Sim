SPEAKER: vl | ROLE: council advisor | TASK: P-322 derivation 99/99 attempt | DATE: 2026-11-10T06:40Z
FOR: P-322
VERDICT: 99/99 reachable only via 6-pair fiat exception list; no pure formula threshold gets there

## 1. Setup

Base = Inkling P-322 formula + cross-side floor 6 (independently VERIFIED in task B: 93/99 exact, 6 off-by-one, 0 hard). Remaining 6 residuals are all same-side, D=0, owner-0 pairs that model as 2:

```
CB>FS: 0->2   CB>SS: 0->2   EDGE>OLB: 0->2   ILB>OLB: 0->2
SS>DIME: 0->2 SS>NICKEL: 0->2
```

Script: _agents/vl/deliveries/vl-derive-99-2026-11-10/vl-derive-99.mjs (read-only; reuses Inkling's formula from skill-profiles-p322.json + thetaprice-2026-11-09.md at architect 678bb06, scored against live flex.json).

## 2. Experiment: same-side D=0 lateral discount (gap <= T → 0)

Hypothesis: same-side zero-D moves with small one-sided skill gap are free flexes (lateral within a role family). Tested thresholds T:

| Rule added | Exact | Off-by-one | Hard | Collateral damage (exact pair broken) |
|---|---|---|---|---|
| Inkling + floor 6 (baseline) | 93 | 6 | 0 | — |
| same-side D=0 gap<=1.5 → 0 | 94 | 5 | 0 | — |
| same-side D=0 gap<=2 → 0 | 95 | 4 | 0 | FS>SS (owner 2 → model 0) |
| same-side D=0 gap<=2.5 → 0 | 95 | 4 | 0 | FS>SS (owner 2 → model 0) |
| same-side D=0 gap<=3 → 0 | 97 | 2 | 0 | FS>SS (owner 2 → model 0); EDGE>OLB still residual |
| same-side D=0 gap<=4 → 0 | 95 | 3 | 1 | FS>SS, OG>C, SS>OLB, TE>RB (6→0 hard miss) |

No threshold reaches 99/99. Every threshold that fixes more residuals also breaks exact same-side pairs (notably FS>SS owner 2, whose gap falls under the threshold). The 6 residuals are irreducible to a gap threshold.

## 3. 99/99 via explicit fiat (the honest ceiling)

Adding exactly the 6 residual pairs as fiat override rows (price 0):

```
CB>FS: 0, CB>SS: 0, EDGE>OLB: 0, ILB>OLB: 0, SS>DIME: 0, SS>NICKEL: 0
```

Result: **99/99 exact, 0 off-by-one, 0 hard.** No other pair is affected — fiat only touches currently-residual rules.

This is legitimate per the council prompt's principle: the 6 are Owner pair rulings (lateral moves priced free) that sit outside ability distance, exactly like Inkling's existing override/fbFree lists. It is an **exception list**, not a pure-formula improvement.

## 4. Recommendation

Do not chase a pure formula to 99/99 — it doesn't exist without breaking exact pairs. The formula (Inkling + cross-side floor 6) gets 93/99 with only 6 irreducible Owner pair rulings. If the Owner wants 99/99, add the 6 pairs to the exception list (override dict). That keeps the formula principled and the exceptions explicit.

## 5. How to check

```
cd /Users/kosi/Desktop/wt/vl
node _agents/vl/deliveries/vl-derive-99-2026-11-10/vl-derive-99.mjs
```
Output confirms: baseline 93/6/0; thresholds as above; 6-residual fiat → 99/0/0.

Evidence label: VERIFIED (all experiment runs executed by me, output quoted above).
