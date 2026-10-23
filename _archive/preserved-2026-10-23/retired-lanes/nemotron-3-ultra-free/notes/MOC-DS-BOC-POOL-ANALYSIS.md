# MOC/DS/BOC Analysis: NFL Pool Composition & FB/P Flex Implementation Implications

**SPEAKER:** Ultra | **ROLE:** Council Advisor | **TASK:** Record MOC/DS/BOC analysis for Claude's implementation | **DATE:** 2026-10-21T15:00:00Z

---

## Source

**FORWARDED BY:** Owner | **ORIGINAL SPEAKER:** DS (relayed by Owner) | **SOURCE:** BOC's M-323 in COUNCIL-BULLETIN.md
**Verified by:** MOC independent check against merge candidate's PLAYERS array (1,200 records)

---

## Key Findings (MOC Independent Verification)

### 1. Backfield Composition (VERIFIED)

| Position            | Count  | Slots (32 teams)         | Net            |
| ------------------- | ------ | ------------------------ | -------------- |
| HB                  | 89     | —                        | —              |
| FB                  | 8      | —                        | —              |
| **Backfield Total** | **97** | **96 (RB1+RB2+FB × 32)** | **+1 surplus** |

**Critical Finding:** The −10 Owner mentioned is **NOT in the backfield**. The real shortage is:
| Position | Count | Slots             | Net             |
| -------- | ----- | ----------------- | --------------- |
| TE       | 53    | 64 (TE1+TE2 × 32) | **−11 deficit** |

**Conclusion:** Owner's FB rule "lands on a group that is not short" — the real shortage is at TE (−11), predating the FB/P ruling.

---

### 2. SAM Hole Analysis (VERIFIED)

| Metric                 | Value  |
| ---------------------- | ------ |
| SAM records in PLAYERS | 5      |
| SAM slots (32 teams)   | 32     |
| **SAM deficit**        | **27** |

**Cascade Effect:**
- MIKE/WILL are **natural SAM** (zero flex penalty) → 27 teams field MIKE/WILL at SAM at zero cost
- LB group (MIKE+WILL+SAM): 86 players for 96 slots → **−10 deficit**
- Cost cascades downstream:
  - DT/EDGE: −2/−4
  - CB/SS/FS: −4

**Key Insight:** "The cost hides; it does not disappear." The SAM hole predates FB/P ruling and dwarfs it (27 vs 10).

---

### 3. Kicking Game Parity (VERIFIED)

| Position  | Count  | Slots  | Status           |
| --------- | ------ | ------ | ---------------- |
| K         | 32     | 32     | Exact            |
| P         | 32     | 32     | Exact            |
| **Total** | **64** | **64** | **Exact parity** |

**Risk:** `FLEX.K = {}` — kicker can flex nowhere, nobody can flex into K. A K injury = emergency penalty (8). Knife-edge on K slot itself.

---

### 4. Tool Behavior (VERIFIED)

- **No hardcoded "drop P/FB/LS" filter** — drop is emergent from `NATURAL_SLOT_MAP` + taxonomy
- When build carries FB/P slots: tool writes **1,188**, drops **12** (all LS)
- Proven on copies: `written: 1188 · dropped: 12`, all LS

---

## DS's Implementation Guidance (VERIFIED)

### Precise Swap Fix

> "Keep FB and P, drop only LS 12 — draftable goes 1,148 → 1,188."

### Slot vs Position Clarification

> "RB1 and RB2 are slot names; the player position in the data is HB. FB and P already exist as player positions (8 and 32) and simply have no slots — so the change is to add them on the slot side and bridge both in NATURAL_SLOT_MAP, not to invent a code."

### SAM Handling Model

> "How Claude and I handled the SAM issue is exactly how the FB and Punter situations should be handled."

---

## MOC's Three Refinements for Owner Before Claude Builds

### Refinement 1: FB Rule Lands on Non-Short Group

- Backfield: HB 89 + FB 8 = 97 for 96 slots (**+1 surplus**)
- Real shortage: **TE 53 for 64 slots (−11)**
- Owner's FB rule addresses a non-problem group

### Refinement 2: SAM Hole Cascades Downstream

- SAM: 5 records for 32 slots → 27 deficit
- MIKE/WILL natural SAM (zero penalty) → 27 teams use MIKE/WILL at SAM
- LB group: 86 for 96 slots → 10 short
- Cost lands on DT/EDGE (−2/−4) and CB/SS/FS (−4)
- **Cost hides; does not disappear**

### Refinement 3: Kicking Parity Is Knife-Edge

- 32 K + 32 P = 64 for 64 slots (exact)
- `FLEX.K = {}` → K injury = emergency penalty (8)
- No flex targets for K

---

## Tool Behavior Confirmation (VERIFIED)

- **No hardcoded "drop P/FB/LS" filter** — drop is emergent from `NATURAL_SLOT_MAP` + taxonomy
- When build carries FB/P slots: tool writes **1,188**, drops **12** (all LS)
- Verified on copies: `written: 1188 · dropped: 12`, all LS

---

## Implementation Implications for Claude

### Required Changes (Per Owner Directive + DS/MOC Analysis)

1. **Add FB and P slots** (28 rounds total, up from 26)
2. **Add FB and P to NATURAL_SLOT_MAP:**
   - HB → FB: 0 flex cost (mirror SAM model)
   - K → P: 0 flex cost (mirror SAM model)
   - Other positions → FB/P: existing flex penalties unchanged
3. **RB/HB interchangeability** for agent logic; preserve site labeling
4. **28 rounds** (up from 26) — adds 64 picks (32 × 2)
5. **Keep FB and P** — they exist as player positions (8 FB, 32 P) but have no slots
6. **Drop LS 12** → draftable 1,148 → 1,188 (emergent from NATURAL_SLOT_MAP)

### What NOT to Change

- Existing flex penalties (Owner: "Don't change any flex penalties")
- Player position labels on site (preserve HB/FB/RB labeling)
- Flex penalties for other positions flexing into FB/P

### SAM Model Reference

The SAM implementation is the exact model:
- MIKE/WILL are natural SAM (zero penalty)
- Other positions flex into SAM with penalties
- Mirror this for FB (HB natural) and P (K natural)

---

## BOC's Trap (Owner Requested Clarification)

> "I don't understand BOC's trap. If this is still an issue, you'll have to explain it to me."

**Status:** Awaiting BOC explanation. MOC's analysis may have resolved it (the trap was likely the slot-count mismatch that MOC clarified).

---

## Council Archival Note

**Archived:** Liquid, Glyph, Omni, Cohere — contributions may be deleted unless structural.

---

## Action Items for Claude

| Priority | Task                                         | Notes                                  |
| -------- | -------------------------------------------- | -------------------------------------- |
| **P0**   | Implement FB/P slots in NATURAL_SLOT_MAP     | Zero cost HB→FB, K→P; mirror SAM model |
| **P0**   | Add FB/P slots to draft (28 rounds)          | 64 additional picks                    |
| **P0**   | Verify 28 rounds UI works                    | Draft board, simToEnd, pagination      |
| **P1**   | Preserve HB/FB/RB labeling on site           | Agent logic: RB/HB interchangeable     |
| **P1**   | Don't change existing flex penalties         | Only add FB/P zero-cost rules          |
| **P2**   | Consider TE shortage (−11) for all-time pool | Not part of FB/P directive but noted   |
| **P2**   | Consider SAM cascade for all-time pool       | 27 SAM deficit, LB group −10           |

---

## Evidence Chain

| Source                | Location                                | Verified |
| --------------------- | --------------------------------------- | -------- |
| DS's last reply       | BOC's M-323 in COUNCIL-BULLETIN.md      | ✅       |
| MOC independent check | Against merge candidate PLAYERS (1,200) | ✅       |
| Tool behavior test    | Copies: written: 1188, dropped: 12      | ✅       |
| SAM model reference   | DS: "How Claude and I handled SAM"      | ✅       |

---

**No action needed beyond reading this.** If you hold an open item this touches, reply with it rather than re-deriving.

---

**Recorded for:** Claude (Architect) implementation reference
**Recorded by:** Ultra (Council Advisor)
**Date:** 2026-10-21T15:30:00Z
