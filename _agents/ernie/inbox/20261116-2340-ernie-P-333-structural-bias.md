SPEAKER: ernie | ROLE: council | TASK: P-333 — the structural side (Part B) measured, and why the formula route (Part A) cannot close the gap | DATE: 2026-11-16T23:40Z
FOR: P-333

**I am answering Part B, with a negative result on Part A.** No re-pricing is proposed anywhere below. Harness: `deliveries/p333-gap-options-2026-11-16/` (`options.mjs`, `driver.mjs`, `receipt-partB.txt`, `receipt-driver.txt`), engine `7a0706df`.

# Part B — the bias is a body count, and one spot-table line closes it

## What drives it (measured, per-base stand-in tally over the 32 real rosters, 1024 spots each)

| base | stand-ins | emergency fills | the excess over the other base |
|---|---|---|---|
| 4-3 | **62** | 0 | — |
| 3-4 | **85** | 0 | **+23** |

The 4-3's stand-ins are almost all offensive-line conversions that happen in both bases (`OT>C` 4×/5×, `OG>OT1` 4×/4×, `OG>C` 4×/—). The 3-4's excess is concentrated at the **two inside-backer spots**:

| stand-in | count |
|---|---|
| `SS > MIKE` (dest ILB, row MIKE) | **8** |
| `OLB > MIKE` (dest ILB, row MIKE) | **6** |
| `OLB > DT2` (dest ILB, row DT2 = ILB2) | **5** |

**19 of the 23 extra stand-ins are at MIKE/ILB2.** Real rosters are 4-3-shaped: they carry two MIKE-type inside-backers and two coverage-type OLBs. A 3-4 demands two inside-backers *and* two big end-type OLBs from the same four bodies, so a safety or an OLB is pushed inside at a 6-penalty.

## The "300-weight" framing is a fitted-table artefact, not the live cause

The prompt describes 3-4's ILB2 as "rated off DT2 (weight 300)". In the live **measured** provider those two rows are nearly identical:

```
MIKE 4-3 0.03965 | 3-4 0.03965
DT2  4-3 0.03945 | 3-4 0.03945     (0.5% apart)
WILL 0.01972   SAM 0.01315
```

So re-rating ILB2 from DT2 to MIKE changes nothing — measured, byte-identical output (my variant B2: bias 1144.53125, 28-3 split, 147 flexed — identical to base). **The driver is not the value rate at ILB2; it is the number of ILB-calibre bodies the 3-4 demands.**

## The fix, measured (one line of the spot table — no weight touched)

3-4's second inside-backer spot currently reads `case 'DT2': return { slot: 'DT2', dest: 'ILB', row: 'DT2', label: 'ILB2' }` (`slots.ts:86`). Its **dest** is what makes it demand an ILB body. Change the dest to OLB so the spot asks for the body type real rosters actually carry (**variant B3**):

| | base | B3 (`dest: 'OLB'`) |
|---|---|---|
| real mean signed bias | **+1144.5** | **−142.2** |
| real bias in wins | 0.145 | **−0.018** |
| teams better in 4-3 / 3-4 | **28 / 3** | **13 / 14** |
| mean loss, 4-3-built | 1343 | 633 |
| mean loss, 3-4-built | 325 | 913 |
| flexed spots (32×2) | 147 | **128** |
| emergency fills | 0 | 0 |
| synthetic gap | 700 | **−1100** |

**The real-roster bias is eliminated** — 28-3 becomes 13-14, and the mean signed bias goes from +1144 (0.145 wins) to −142 (0.018 wins), i.e. inside noise. That is the structural fix the Owner asked for, on the side he named (the spot table, not the flex table), and it touches no slot weight and no flex rule: the DIME trio, the FB exception and the cross-side floor are all untouched.

**The honest cost:** the synthetic ideal-roster gap **overshoots to −1100** (the 3-4 ideal roster now loses more when forced). So this lever trades one symmetry for the other.

# The decision this exposes (for KG, not for me)

**The synthetic gap and the real-roster bias move in opposite directions under the only lever that moves the real one.** They are measuring different things:

- the **synthetic gap** asks whether two *idealised* rosters are treated symmetrically by the price table;
- the **real bias** asks whether a *real* 32-man roster is worth the same in both bases.

B3 fixes the second and breaks the first. No re-pricing moved the first without being absorbed, and none moved the second at all. **So "3-4 and 4-3 are equally valuable" has to be defined before it can be optimised: equal for ideal rosters, or equal for real ones.** That is a product question, and I would not pick it.

# Part A — a principled negative result

**No symmetric per-pair pricing formula can reliably close the synthetic gap, because the loss is an optimum over assignments, not a sum of prices.** Every price change is partly absorbed by the optimiser re-routing to a different stand-in.

My evidence is a measurement from the previous round, re-cited because it is the cleanest demonstration: raising the expensive side's price (`dl5Penalty` × 1.5, i.e. ILB→DL5 12 → 18) moved the loss from 1800 to **1900**, not to 2700. The arithmetic predicted the gap would go 700 → −200; it went 700 → **600**, because the optimiser chose a different expensive stand-in (`TE>DL5@12` instead of `ILB>DL5@12`). A price increase was 83% absorbed.

That is why the four formulas already filed (the 50/99 ladder, flexderive, the distance formula, the distance×leverage formula) all either miss the exceptions or fail to close: they are pricing a quantity the optimiser then re-optimises around. **A formula that changes the number of stand-ins rather than their price is the only kind that can close the gap — and that is a structural change (Part B), not a pricing formula (Part A).**

**The mechanism nobody has named, named:** *scarcity-priced flex* — price a stand-in by the destination's value **divided by the number of bodies on a league-average roster that can fill it naturally*. That is principled (a scarce body type costs more to borrow) and it is the only per-pair mechanism that would make the 4-3's three cheap stand-ins expensive and the 3-4's one stand-in cheap. **I did not measure it** — it needs a league-average body count per role, which is a data question, not a table question. I name it as unmeasured rather than file a number I did not run.

# What I did not measure

- Only one spot-table variant (B3). A **family** exists between base (dest ILB) and B3 (dest OLB) — e.g. dest SS, or dest ILB with a different row — and one of them may close *both* the real bias and the synthetic gap. I did not sweep it; that is the obvious next measurement and it is cheap (the harness is one command).
- B1 (`row: 'ILB'`) is **invalid**: ILB is a Dest, not a SlotId, and `winsPerOvr` returns undefined (the harness hangs on the NaN costs). Do not re-file it.
- I did not sweep OVR or seeds; the bias may narrow at 90 or 70.
- I did not review another seat's Part B proposal — none had been filed when I measured.

**Falsifier for my own B3:** if the Owner's definition of "equal value" is the idealised one, B3 is the wrong answer and its −1100 overshoot disqualifies it. If his definition is the real-roster one, B3 is the first proposal in this round that actually reaches zero, and the synthetic gap should be re-measured as a secondary check rather than the target.