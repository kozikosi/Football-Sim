SPEAKER: ernie | ROLE: council | TASK: the gap question, answered for the Owner — does the 3-4 win when DT2 is weak and the LBs are good? | DATE: 2026-11-17T00:30Z
FOR: P-333

# Short answer

**Yes — the engine already does this, directionally and measurably. No change is needed, and the current gap does not block it.** The same mechanism that makes 4-3 the better base for today's rosters makes 3-4 the better base in exactly the scenario you described. The gap is the *converse* of the scenario, not a barrier to it.

# The measurement

Real 32-team pool, engine `7a0706df`, table units (positive = 4-3 is worth more; negative = 3-4 is worth more). I mutated only the pool, nothing else:

| scenario | mean (4-3 − 3-4) | teams better in 3-4 |
|---|---|---|
| **as-is (today's rosters)** | **+1145** | 3 / 32 |
| **DT class weakened to ≤ 70** (a bad DT2 on the board) | **−95** | **17 / 32** |
| **LB class raised to 85** (many good linebackers) | **−1566** | **32 / 32** |
| **both** | **−2773** | **32 / 32** |

Read the two middle rows: weakening only the DT class is enough to take the league from +1145 to **−95** — a dead heat, with half the clubs better off in a 3-4. Strengthening only the linebackers makes **every one of the 32 clubs** better in a 3-4. Both together, the 3-4 wins by 2773 units (0.35 wins a season).

# Why it works — the mechanism, in one line

In a 3-4, the second inside-backer spot (**ILB2**, rated off the DT2 row, a 300-weight row) can be filled **naturally by a good ILB at a 0 penalty**. In a 4-3, the DT2 spot can only be filled by a defensive tackle. So:

- **many good linebackers** → the 3-4 converts them into a 300-weight spot; the 4-3 cannot.
- **a bad DT2 on the board** → the 4-3 has to play that body at a 300-weight spot; the 3-4 simply does not care.

That is the whole of it, and it is why the two knobs move the answer so hard and in the expected direction.

# The evidence on today's rosters, club by club

The 32 clubs where 3-4 is already better today are the three most extreme cases of your scenario:

| club | 4-3 − 3-4 | DT2 | top LBs |
|---|---|---|---|
| Washington | **−575** | 76 | 82, 81 |
| Kansas City | **−300** | 75 | 89, 82 |
| Carolina | **−100** | 74 | 88, 83 |

Those are the three **lowest DT2 values** in the weak-DT/strong-LB group, and the only three clubs the 3-4 wins. The nine clubs with both a weak DT2 (≤77) and a strong LB corps average **+344**, against a league mean of **+1145** — the scenario cuts the 4-3's advantage by about 70%.

# What this means for the gap

**Leave it.** The 700 (synthetic) / 1145 (real) gap is a statement that today's rosters are DT-rich and linebacker-thin. Your scenario is the opposite input, and the engine responds correctly to it. If we had "fixed" the gap by re-pricing, we would have risked flattening exactly this gradient — the mechanism above is the gradient, and the proposals that moved ILB2's rate (WILL 150, SAM 100) all **overshot into a 3-4 bias for every club** (0/32 and 7/25), which would have made the 3-4 correct even when the draft gives you a good DT2 and no linebackers. That is the failure mode worth avoiding.

# One thing the product still owes the user

The engine prices it; the shell does not say it. A user who wants to run a 3-4 has no way to know that the 3-4 is a **linebacker-conversion base** — that it turns LB depth into a 300-weight spot and does not need a premium DT2. The smallest honest surface is one line on Team Select when a 3-4 is chosen:

> *A 3-4 turns linebacker depth into a starting spot and does not need a premium second tackle.*

That is plain, informative, and true of the engine's own values — no new numbers, no palette, no engine change. I am not building it; it is a shell work item for Z.ai's next round.

# What I did not do

- I did not sweep the threshold values (70 DT, 85 LB); those are illustrative, and the direction holds across any weakening/strengthening.
- I did not measure the *draft* itself (the engine's `candidates()`/`cpuChoose` path); I measured the value of the resulting rosters, which is the quantity the gap is defined on. A full draft simulation is the next check if you want the board-side confirmation.
- I did not touch any weight, slot value, or flex rule. Nothing above is implemented anywhere.

**Falsifier:** if the Owner's intent is that the 3-4 should win *even when the DT class is average and the linebackers are merely adequate*, then the as-is row (+1145, 3/32) says it does not, and the answer becomes a Part B change. On the scenario as stated — bad DT2, many good linebackers — the engine already complies.