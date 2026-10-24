# Flex Table Constraint Set — Handover for Claude (BOC) — 22 Oct 2026

Build: `Football-Sim-V21.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`

## Context
Owner: "Left and right don't matter. Let claude handle the table." — The flex table is the Architect's to write. Our job is to hand over the constraints.

## Constraints (from build + Owner rulings)

### 1. No left/right distinction
- LEDG and REDG are **one EDGE role** (Owner ruling 22 Oct: "LEDG/REDG don't matter at all. We don't care about left or right.")
- `NATURAL_SLOT_MAP`: both map to `['DE1','DE2']` (l.934)
- `FLEX`: both have identical penalty maps (l.944)
- `_POSITION_TIER`: both tier 2 (l.983)
- `POS_DISPLAY`: both display as 'EDGE' (l.985)
- `WV_TAG_GROUP`: both tag as 'EDGE' (l.1316)
- No branching on left vs right anywhere in the code (verified: grep for `REDG ===` / `LEDG ===` → 0 matches)

### 2. Current slots (ROSTER_SLOTS, l.925)
26 starter slots: `QB RB1 RB2 WR1 WR2 WR3 TE1 TE2 OT1 OT2 OG1 OG2 C DE1 DE2 DT1 DT2 MIKE WILL SAM CB1 CB2 CB3 SS FS K`

- **No nose slot** (DT1/DT2 are both defensive tackles)
- **No separate OLB slot** (MIKE, WILL, SAM are the three LBs)
- **No FB or P** in ROSTER_SLOTS (FB/P are specialists, not drafted)
- **SAM** exists but only 5 records in the pool (27-player deficit) — may need to be required in next intake

### 3. Current FLEX map (l.940-952)
```js
const FLEX = {
 LT:{OG:0, C:0, DT:4}, RT:{OG:0, C:0, DT:4},
 LG:{C:0, OT:4, DT:4}, RG:{C:0, OT:4, DT:4}, C:{OG:0, OT:4, DT:4},
 DT:{DE:4, MIKE:4, WILL:4, SAM:4, OG:4, C:4, OT:6, RB:6},
 REDG:{DT:2, MIKE:4, WILL:2, SAM:2, TE:6, RB:6}, LEDG:{DT:2, MIKE:4, WILL:2, SAM:2, TE:6, RB:6},
 MIKE:LB_FLEX, WILL:LB_FLEX, SAM:LB_FLEX,
 CB:{SS:2, FS:0, MIKE:4, WILL:4, SAM:4, WR:4, TE:6, RB:6},
 SS:{FS:2, CB:4, MIKE:4, WILL:4, SAM:2, WR:4, TE:6, RB:6},
 FS:{SS:2, CB:4, MIKE:4, WILL:4, SAM:4, WR:4, TE:6, RB:6},
 WR:{TE:4, SS:4, FS:4, CB:4, RB:6},
 TE:{MIKE:6, WILL:6, SAM:6, SS:6, FS:6, RB:6},
 K:{}, P:{}, FB:{}
};
const LB_FLEX = {DE:6, DT:4, CB3:4, SS:4, FS:4, TE:6, RB:6};
```

### 4. 3-4 nickel rule (resolved — not a contradiction)
Two different moments, two different decisions:
- **Entering the 3-4 base:** a DT gives way to an extra LB (DT2 → ILB2, worth MIKE). The nose is DT1.
- **Nickel sub inside the 3-4:** the **lowest-rated** of the three linebackers (WILL, SAM, MIKE) comes off.
- **Nickel from a 4-3:** the SAM comes off, and the WILL wears the SAM role.

One rule, stated whole:
> Nickel from a 4-3: the SAM comes off and the WILL wears the SAM role.
> Nickel from a 3-4: the lowest-rated of the three linebackers comes off.
> Switching base to a 3-4 swaps a DT for an extra LB.

### 5. CB3/Nickel interaction
- **4-3:** nickel (CB3) replaces SAM (LB3). All four LBs? No — in 4-3 there are 3 LBs (MIKE, WILL, SAM). Nickel replaces SAM, leaving 2 LBs + 5 DBs.
- **3-4:** nickel replaces the lowest-rated LB. 3-4 has 4 LBs (OLB1, ILB1, ILB2, OLB2). Nickel replaces the lowest-rated one, leaving 3 LBs + 5 DBs.
- The Owner's earlier ruling: "In a 3-4 there is no SAM to come off; the SAM role is played by an outside linebacker who stays on the field."

### 6. What is still open inside the table
- **Whether a 3-4 base exists at all** — touches `ROSTER_SLOTS` and `teamRatings` (protected constants, Owner approval needed)
- **Whether the base is chosen at draft time** (Owner's earlier words: "toggle or recommended based on draft board")
- **Whether "lowest-rated" test uses perfGrade or OVR** — the two differ; Owner said "rated" which in this build most often means OVR
- **Whether FB/P need flex entries** — currently `K:{}, P:{}, FB:{}` (no flex). Owner confirmed no flex cost for FB/P (same as SAM precedent) for the draft, but matchup model needs "heavier block spec for FB"
- **Whether positions flex into FB/P at a penalty** — SAM precedent says yes (LB_FLEX with penalties), but FB/P currently have empty flex maps

### 7. Owner constraints
- No left/right (LEDG/REDG = one EDGE role) ✓
- CB3/Nickel interaction depends on base (4-3 vs 3-4) ✓
- 3-4 nickel: lowest-rated LB comes off ✓ (resolved, not a contradiction)
- 3-4 base: DT swapped for extra LB ✓
- Flex is realistic (not an exploit); QB cannot flex ✓
- Protected constants change only with Owner approval ✓

### 8. What the table should NOT contain
- No separate nose slot (DT1 is the nose in 3-4)
- No separate OLB slot (MIKE/WILL/SAM are the LBs; in 3-4, OLB1/OLB2 wear WILL, ILB1/ILB2 wear MIKE)
- No left/right edge distinction
- No flex cost for QB (QB cannot flex)

### 9. Open questions for Claude
1. Should the 3-4 base be a toggle or a draft-time recommendation? (Owner's words: "toggle or maybe be a recommended thing based on what is left on the draft board")
2. Should the flex table include FB/P entries (currently empty)?
3. Should the 3-4 base change `ROSTER_SLOTS` (protected) or just `NATURAL_SLOT_MAP` (also protected)?
4. How should the "lowest-rated LB" test work — perfGrade in-game or OVR from the roster?

## SAFE ALONE?
N/A — this is a constraint handover, not a code change. Claude decides the table.

## HOW TO CHECK
When Claude produces the table, verify: (1) no left/right distinction, (2) CB3/Nickel interaction correct for both bases, (3) 3-4 nickel rule matches Owner's ruling, (4) flex penalties are realistic (not exploits).

---

## UPDATE (22 Oct) — Owner clarification on 3-4 math

Owner: "Why would the math change? OLB, ILB, and NT won't be considered mathematically signifcant positions. It should be treated like the fact that CB3 becomes a Nickel. A lot of other positions could become a Nickel as well. No player in the original player pool identifies as a Nickel. They become a nickel upon being placed in that position. The same is true for NT, ILB, and OLB. No one is inherently changing their position or their math. The math for the OLBs stays the same as WILLs and the math for the ILB stays the same as MIKEs and the math for the NTs stay the same as DT1. It can be written as 'DT1 / Nose Tackle'"

**Resolution:** No math changes needed for 3-4 positions. Positions are labels, not math changes:
- OLB ≡ WILL math (no new slot, no new rating)
- ILB ≡ MIKE math (no new slot, no new rating)
- NT ≡ DT1 math (DT1 can be relabeled "DT1 / Nose Tackle")
- CB3 becomes Nickel when placed there (same as current — no change)

This means:
- `ROSTER_SLOTS` does NOT need new slots (OLB/ILB/NT are labels, not slots)
- `teamRatings` does NOT need new unit ratings
- `FLEX` does NOT need new keys (OLB flexes like WILL, ILB flexes like MIKE, NT flexes like DT1)
- `NATURAL_SLOT_MAP` does NOT need new entries
- Protected constants are NOT touched

The only changes needed:
- Relabel DT1 → "DT1 / Nose Tackle" in LABELS (l.453) — display change only
- Relabel the LBs in 3-4 context (OLB1/OLB2 wear WILL, ILB1/ILB2 wear MIKE) — display change only
- The 3-4 base toggle is a UI choice, not a math change

This resolves the "open question" about whether 3-4 touches protected constants: **it does not.**
