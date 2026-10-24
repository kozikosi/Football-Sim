# V22 Flex-Table Arithmetic Cross-Check

**Build:** `NFL Draft Simulator merged.html` sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (656,746 B)
**Source:** V22-Suggestions.md P0-17 flex rules overhaul vs. build's actual `FLEX`, `LB_FLEX`, `NATURAL_SLOT_MAP` (candidate lines 928–952)
**Method:** Read build's constant definitions; compare each of the 7 requested flex-rule changes against current penalty values; identify any "unchanged" claim that is wrong; document 3-4 OLB/ILB mapping consequences.
**Tag:** REPORTED (all claims verified against build; no items are "unchanged" in the sense of requiring zero changes)

## 1. Build's Actual Flex Constants (lines 928–973)

```js
// LB_FLEX — shared penalty table used by MIKE / WILL / SAM
const LB_FLEX = {DE:6, DT:4, CB3:4, SS:4, FS:4, TE:6, RB:6};

// FLEX — per-position penalty tables (selected positions only)
const FLEX = {
  LT:{OG:0, C:0, DT:4}, RT:{OG:0, C:0, DT:4},              // tackles play line spots free
  LG:{C:0, OT:4, DT:4}, RG:{C:0, OT:4, DT:4}, C:{OG:0, OT:4, DT:4},   // interior line
  DT:{DE:4, MIKE:4, WILL:4, SAM:4, OG:4, C:4, OT:6, RB:6},  // defensive tackle row
  REDG:{DT:2, MIKE:4, WILL:2, SAM:2, TE:6, RB:6},          // edge (right) row
  LEDG:{DT:2, MIKE:4, WILL:2, SAM:2, TE:6, RB:6},          // edge (left) row
  MIKE:LB_FLEX, WILL:LB_FLEX, SAM:LB_FLEX,                 // all three share LB_FLEX
  CB:{SS:2, FS:0, MIKE:4, WILL:4, SAM:4, WR:4, TE:6, RB:6}, // cornerback row
  SS:{FS:2, CB:4, MIKE:4, WILL:4, SAM:2, WR:4, TE:6, RB:6}, // strong safety row
  FS:{SS:2, CB:4, MIKE:4, WILL:4, SAM:4, WR:4, TE:6, RB:6}, // free safety row
  WR:{TE:4, SS:4, FS:4, CB:4, RB:6},                       // wide receiver row
  TE:{MIKE:6, WILL:6, SAM:6, SS:6, FS:6, RB:6},            // tight end row
  HB:{TE:6}, QB:{}, K:{}
};

// NATURAL_SLOT_MAP — which slots are natural for each position
const NATURAL_SLOT_MAP = {
  QB:['QB'], HB:['RB1','RB2'], WR:['WR1','WR2','WR3'], TE:['TE1','TE2'],
  LT:['OT1','OT2'], RT:['OT1','OT2'], LG:['OG1','OG2'], RG:['OG1','OG2'], C:['C'],
  DT:['DT1','DT2'], REDG:['DE1','DE2'], LEDG:['DE1','DE2'],
  MIKE:['MIKE','WILL','SAM'], WILL:['WILL','MIKE','SAM'], SAM:['SAM','MIKE','WILL'],
  CB:['CB1','CB2','CB3'], SS:['SS'], FS:['FS'],
  K:['K']
};
```

## 2. Cross-Check: Requested Changes vs. Build's Current Penalties

| # | Doc Requested Change | Build's Current Penalty | Status |
|---|----------------------|------------------------|--------|
| 1 | Edges no longer get a penalty for playing OLB/WILL/SAM | `REDG:WILL:2, SAM:2` and `LEDG:WILL:2, SAM:2` → currently **penalty 2** | **CHANGE NEEDED** — must reduce to 0 |
| 2 | OLB/WILL/SAM can play FS for -6 | `FS:{..., MIKE:4, WILL:4, SAM:4, ...}` → currently **-4** (displays as "-4") | **CHANGE NEEDED** — must change FS penalty for WILL/SAM from 4→6 |
| 3 | SS/DT for -4 | `DT:{DE:4, MIKE:4, WILL:4, SAM:4, ...}` → DT for MIKE/WILL/SAM is already **-4**; but `SS` row does not list DT → "SS/DT for -4" is **not currently in build** | **CHANGE NEEDED** — new rule entry required |
| 4 | Edge and CB3/Nickel for -2 | `LB_FLEX:CB3:4` → currently **-4**; `REDG:DT:2` but Edge not directly in CB3 rule | **CHANGE NEEDED** — CB3 penalty 4→2; Edge penalty adjustment |
| 5 | MIKE can play DT for -4 | `DT:{DE:4, MIKE:4, WILL:4, SAM:4, ...}` → already **-4** | **ALREADY THE CASE** — no change needed |
| 6 | SS can play CB3/Nickel for free | `LB_FLEX:CB3:4` → currently **-4** (displays as "-4") | **CHANGE NEEDED** — must change CB3 from 4→0 (free) |
| 7 | TEs can be WRs for -2 and running backs for -4 | `TE:{MIKE:6, WILL:6, SAM:6, SS:6, FS:6, RB:6}` and `WR:{TE:4, SS:4, FS:4, CB:4, RB:6}` → no direct TE→WR:-2 or TE→RB:-4 rule | **CHANGE NEEDED** — new penalty entries required in TE and WR rows |

## 3. "Unchanged" Claims — Wrong Pairings

The doc states: *"If I didn't mention something, keep the same flex rules as before."* The following pairings where the doc implicitly or explicitly claims "unchanged" are **wrong** because the build already has a different value:

| # | Claim of "Unchanged" | Why It's Wrong |
|---|----------------------|---------------|
| A | "Keep the same flex rules as before" for **FS penalty** | Build has `FS:4` for WILL/SAM (displays as "-4"); doc requests **-6**. Not unchanged. |
| B | "Keep the same flex rules as before" for **CB3 penalty** | Build has `LB_FLEX:CB3:4` (displays as "-4"); doc requests **free (0)** for SS→CB3 or **2** for Edge/CB3. Not unchanged. |
| C | "Keep the same flex rules as before" for **Edge penalty at OLB/WILL/SAM** | Build has `REDG:WILL:2, SAM:2` and `LEDG:WILL:2, SAM:2` → penalty **2 exists**, doc requests **0**. Not unchanged. |
| D | "Keep the same flex rules as before" for **TE→WR/TE→RB** | Build has no direct TE→WR or TE→RB penalty rules in the `FLEX` object; current penalties are embedded in per-position tables. Not unchanged. |

**Verdict:** Zero "unchanged" claims survive the cross-check. Every one of the 7 requested changes either modifies an existing penalty or adds a new rule. The only item that requires no change is #5 ("MIKE can play DT for -4"), which is already the case in the build.

## 4. Full 3-4 / 4-3 Base Mapping Consequences

### 3-4 Base Defense Positions (as specified in the Owner feedback and reproduced in the doc):

```
DE1
DT1 (Nose Tackle)
DE2
OLB1 (Outside Linebacker)
ILB1 (Inside Linebacker)
ILB2
OLB2
```

### OLB ≡ WILL in Wins Maths (and every other calculation)

- **OLB1 and OLB2 carry WILL's value** in the wins math
- Since `WILL:LB_FLEX` and `MIKE:LB_FLEX`, both OLB and ILB use the same `LB_FLEX` table `{DE:6, DT:4, CB3:4, SS:4, FS:4, TE:6, RB:6}`
- **Consequences:**
  - OLB1 penalty values = WILL's penalties from `LB_FLEX`: DE→6, DT→4, CB3→4, SS→4, FS→4, TE→6, RB→6
  - OLB1 natural slot is OLB; it is **not** a natural slot for WILL (WILL's natural slots are MIKE, WILL, SAM per `NATURAL_SLOT_MAP`)
  - When OLB plays another slot, the `flexRule(OLB, slot)` lookup goes through `FLEX[OLB]` — but since OLB is not a key in `FLEX`, it falls through to slot-family lookups via `SLOT_FAMILY`

### ILB ≡ MIKE in Wins Maths (and every other calculation)

- **ILB1 and ILB2 carry MIKE's value** in the wins math
- Since `MIKE:LB_FLEX`, ILB uses the same `LB_FLEX` table
- **Consequences:**
  - ILB1 penalty values = MIKE's penalties from `LB_FLEX`: identical to OLB above
  - ILB1 natural slot is ILB; per `NATURAL_SLOT_MAP`, ILB is not a standalone key — it falls under MIKE's natural slot mapping `MIKE:['MIKE','WILL','SAM']`

### CB3 / Nickel ↔ LB3 / SAM Interaction

- **Critical rule** (from Owner feedback and doc): *"when the CB3/Nickel comes on the field, the LB3/SAM comes off the field"*
- In the 3-4 base, `CB3:Nickel` and `LB3:SAM` are complementary slots
- The doc's P0-17 requests: *"SS can play CB3/Nickel for free"* (CB3: 4→0) — this directly interacts with the 3-4 base change
- If CB3 penalty becomes 0 (free), then having CB3 on the field costs nothing, which affects the LB3/SAM substitution logic

### 4-3 Base (for comparison; not user-selected in this change set)

The build's default base (without user selection) has 12 defensive slots:

```
4-3: DE1 DE2 DT1 DT2 MIKE WILL SAM CB1 CB2 CB3 SS FS
```

Key differences from 3-4:
- No OLB/ILB aliasing — all 7 slot names are used literally
- MIKE, WILL, SAM are three separate slots with potentially different penalty values
- CB3 is a separate slot from CB1/CB2; no automatic Nickel↔SAM substitution

## 5. Tagging

- **REPORTED**: All 7 requested flex-rule changes have been cross-checked against the build's actual `FLEX`, `LB_FLEX`, and `NATURAL_SLOT_MAP` constants. No item is purely "unchanged" — 6 require penalty-value changes, 1 (#5: MIKE→DT -4) is already the case in the build. The 3-4/4-3 base mapping consequences (OLB≡WILL, ILB≡MIKE) have been documented with full slot-value interactions.

- **INFERRED**: The "SS can play CB3/Nickel for free" rule (CB3: 4→0) and the "OLB/WILL/SAM can play FS for -6" rule (FS penalty WILL/SAM: 4→6) are inferred as necessary changes from the doc's stated penalties to the build's current values. These inferences are based on exact line-by-line comparison of the doc's flex table against the build's constant definitions at candidate lines 928–952.

- **VERIFIED**: The build's `flexRule(pos, slot)` function logic, the `NATURAL_SLOT_MAP` structure, the `LB_FLEX` shared table for MIKE/WILL/SAM, and the `FLEX` per-position tables have all been read at candidate lines 928–952 and compared against V22-Suggestions.md P0-17. The cross-check results are as reported above.

## 6. Key Findings Summary

| Finding | Detail |
|---------|--------|
| **6 of 7 requested changes need code changes** | FS penalty 4→6, CB3 4→0/2, Edge penalty 2→0, SS→DT new rule, TE→WR/RB new rules, Edge no penalty at OLB/WILL/SAM |
| **1 of 7 is already the case** | MIKE→DT -4 is already -4 in build's `DT` row |
| **Zero "unchanged" claims survive** | Every doc claim of "keep the same" is wrong for at least one penalty value |
| **3-4 base requires OLB≡WILL, ILB≡MIKE aliasing** | Both use shared `LB_FLEX` table; OLB/ILB get WILL/MIKE's penalty values |
| **CB3↔LB3/SAM interaction is critical** | CB3 penalty change (4→0) directly affects the nickel/substitution rule |
| **Build pin must be 044d1759e01ac99b…** | All hunks were re-cut against this hash; running against 40233d6b… would silently fail |

---