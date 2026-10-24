# SAM Alias Question — Handover for the Owner (BOC) — 22 Oct 2026

Build: `Football-Sim-V21.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`

## Context
MOC's owner-rulings note (M-20261022-m) resolved the 3-4 nickel math: OLB ≡ WILL, ILB ≡ MIKE, NT ≡ DT1. The Owner named three positions (OLB, ILB, NT) but not SAM. With the earlier ruling that "the SAM is worn by OLB2" in a 3-4, SAM either keeps its name or becomes OLB2.

## The question, plainly

The build's linebackers are **WILL, SAM, MIKE**. The Owner's ruling named **OLB, ILB, and NT** — but not SAM. In a 3-4, the SAM role is played by OLB2 (an outside linebacker). So:

**Should SAM stay as "SAM" (its own label), or should it become "OLB2" (an outside linebacker)?**

### Option A: SAM keeps its name
- SAM stays "SAM" in all displays, tables, and flex rules
- In a 3-4, SAM is still a position but it's worn by OLB2 (an OLB who plays SAM)
- The flex table keeps a SAM key
- **Pros:** Minimal change, SAM has its own identity, flex rules stay simple
- **Cons:** In a 3-4, "SAM" doesn't exist as a distinct LB — it's an OLB wearing SAM responsibilities

### Option B: SAM becomes OLB2
- SAM is relabeled to "OLB2" everywhere
- In a 4-3, OLB2 plays SAM responsibilities (same math as SAM)
- In a 3-4, OLB2 is the SAM (same as now)
- The flex table loses the SAM key (OLB2 flexes like OLB1)
- **Pros:** Consistent with the Owner's OLB/ILB/NT ruling, no separate SAM concept
- **Cons:** Larger rename, flex rules change, SAM history in the codebase

### Option C: SAM stays as "SAM" but is grouped under OLB
- SAM displays as "SAM (OLB)" or "OLB2 / SAM"
- Math stays SAM's own (same as before)
- Flex rules keep SAM key
- **Pros:** Best of both — SAM identity preserved, OLB grouping clear
- **Cons:** Slightly more complex display

## Current build state
- `LABELS`: `"SAM": "LB3 / SAM"` (l.453)
- `NATURAL_SLOT_MAP`: `SAM:['SAM','MIKE','WILL']` (l.934) — SAM can flex to MIKE/WILL
- `FLEX`: `SAM:LB_FLEX` (l.944) — SAM flexes like other LBs
- `GROUP_DEFS`: `"SAM"` key exists in "Linebackers" group
- `_POSITION_TIER`: `SAM:3` (l.983)
- `WV_TAG_GROUP`: `SAM:'LB'` (l.1316)

## Alias table (pending Owner's answer)

| Current name | Option A (keep SAM) | Option B (become OLB2) | Option C (SAM under OLB) |
|---|---|---|---|
| SAM | SAM | OLB2 | SAM (OLB2) |
| Math | SAM (unchanged) | WILL (same as SAM) | SAM (unchanged) |
| Flex | SAM:LB_FLEX | OLB2:LB_FLEX | SAM:LB_FLEX |
| Display | "LB3 / SAM" | "OLB2" | "LB3 / SAM (OLB2)" |

## Question for the Owner
**Should SAM keep its name, or become OLB2?** (Option A, B, or C?)

Once answered, Claude can write the alias table and update the flex table accordingly.

## SAFE ALONE?
N/A — this is a question for the Owner, not a code change.

## HOW TO CHECK
Owner answers → Claude writes alias table → verify against build.
