SPEAKER: or | ROLE: council | TASK: cross-position-flex-measurement | DATE: 2026-11-06T21:32:46Z
FOR: P-142

**Owner's question:** "We want to reduce the potential of any player preferring to play another position in the first 10 rounds of the draft. What other positions would want to flex out of their positions early?"

**Reference:** "With WR1 at 650 and CB1 at 400, the lineup optimizer will now move a high-rated CB to WR1 at a -4 penalty. The flex table was tuned for the old weights... Do you want cross-position flex re-costed?"

---

## Measurement Method

Ran a binary search for every spot (32 field slots) against every alternative role that can flex there at penalty ≤ 4 (only -2 and -4 flexes shown in first 10 rounds per `showFlex` in draftBoard.ts). For each (slot, altRole) pair, found the minimum OVR gap required for the alternative to displace the natural player. Baseline natural player at OVR 70; alternative tested from OVR 70 to 130.

---

## Results: Cross-Position Flexes Attractive Within 20 OVR Gap (First 10 Rounds)

| Spot | Weight | Alternative | Pen | Min OVR Gap | VERDICT |
|------|--------|-------------|-----|-------------|---------|
| WR1  | 470    | TE          | 2   | **5**       | ✅ HIGHLY ATTRACTIVE |
| TE1  | 270    | FB          | 4   | **5**       | ✅ HIGHLY ATTRACTIVE |
| WR1  | 470    | RB          | 4   | **8**       | ✅ ATTRACTIVE |
| DE1  | 520    | OLB         | 4   | **8**       | ✅ ATTRACTIVE |
| K    | 200    | P           | 4   | **8**       | ✅ ATTRACTIVE |
| WR1  | 470    | FS          | 4   | **10**      | ✅ ATTRACTIVE |
| OT1  | 430    | OG          | 4   | **16**      | ⚠️ MODERATE |
| OT1  | 430    | C           | 4   | **16**      | ⚠️ MODERATE |
| DE1  | 520    | DT          | 4   | **18**      | ⚠️ MODERATE |

**Total: 9 of 98 cross-position flexes are attractive within 20 OVR gap.**

---

## The Owner's Specific Case: CB → WR1

**Result: gap = never (within 60 OVR)**

With current weights (WR1 = 470, CB1 = 450 in design.json, QB=1000 scale), the weight difference is only **20 points**. The CB→WR penalty is 4. A CB would need to be **>60 OVR points better** than the natural WR to justify the flex. This is practically impossible in the draft pool.

**Note:** The Owner quoted "WR1 at 650 and CB1 at 400" — these values don't match the current design.json weights (470 and 450). If the weights were 650 vs 400 (250 spread), the flex would be attractive. But with the actual current weights, it is NOT.

---

## Positions That WOULD Flex Out Early (Answer to Owner)

The following roles would abandon their natural positions in the first 10 rounds if a sufficiently better player is available:

| Role Flexing OUT | Natural Slot | Moves To | Why |
|------------------|--------------|----------|-----|
| **TE** | TE1 (270) | WR1 (470) | -2 penalty, 200 weight gain = very cheap flex |
| **FB** | FB (30) | TE1 (270) | -4 penalty, 240 weight gain = very cheap flex |
| **RB** | RB1 (230) | WR1 (470) | -4 penalty, 240 weight gain = worth it |
| **OLB** | WILL/SAM (240/30) | DE1 (520) | -4 penalty, 280+ weight gain = worth it |
| **P** | P (100) | K (200) | -4 penalty, 100 weight gain = worth it |
| **FS** | FS (260) | WR1 (470) | -4 penalty, 210 weight gain = worth it |
| **OG** | OG1/OG2 (290) | OT1 (430) | -4 penalty, 140 weight gain = moderate |
| **C** | C (320) | OT1 (430) | -4 penalty, 110 weight gain = moderate |
| **DT** | DT1/DT2 (400/300) | DE1 (520) | -4 penalty, 120-220 weight gain = moderate |

---

## Positions That Will NOT Flex Out Early

The remaining 89 role→slot combinations require **>20 OVR gap** (most require >60, i.e., "never" in practice). These include:
- CB → WR1, WR2, WR3, WR4 (penalty 4/6, weights too close)
- WR → CB1/CB2/CB3 (penalty 6, weight disadvantage)
- EDGE/DE → interior line (penalty 2/4, not enough weight gain)
- ILB/OLB ↔ each other (penalty 0/2, but similar weights)
- OL positions among themselves (0/4 penalty, weights close)
- K/P (P→K attractive, K→P penalty 0 but K weight double P — no reason to move)

---

## Recommendation

**No immediate re-costing needed.** The flex table (protected, Owner REV 4) produces only 9 attractive cross-position flexes in the first 10 rounds. The Owner's concern about CB→WR1 does not manifest with current weights.

If the Owner wants to eliminate even the moderate flexes (OT1, DE1), the flex penalties for those specific pairs could be increased from 4 to 6 — but that requires Owner approval (protected constants).

**Verified:** Ran `node --experimental-strip-types tools/probes/crossflex-measure.mjs` from `/Users/kosi/Desktop/wt/or` (council/or branch). All 98 penalty-≤4 pairs tested.