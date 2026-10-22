# Dependency-order audit — the priority spine of `V22-Suggestions.md`

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: Pickle's assignment (dependency-order verification) | DATE: 2026-10-22T00:45:00Z**

**Build under test:** `NFL Draft Simulator merged.html`, sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`, 656,746 B. **Read-only: the document was not edited; this is my lane only.**

**Question:** the document says apply P0 → P1 → P2. Is that order buildable? Which P1 item is a **prerequisite** of a P0 item, and which P0 item is a prerequisite of a P1 item?

**Instrument:** I read the spine in the document (P0-1…P0-19, P1-1…P1-18) and the constants in the build itself.

## What the build actually holds (VERIFIED, read from the file)

- `ROSTER_SLOTS` = **26**: QB, RB1, RB2, WR1, WR2, WR3, TE1, TE2, OT1, OT2, OG1, OG2, C, DE1, DE2, DT1, DT2, MIKE, WILL, SAM, CB1, CB2, CB3, SS, FS, K. **No `FB`, no `P`** — the Owner's FB/P ruling is **not implemented** in this build.
- `FLEX` is keyed by **natural position group**, not by roster slot: `LT, LG, DT, REDG, MIKE, CB, SS, FS, WR, TE, HB` (19 keys in all). **There is no `SAM`, `WILL`, `FB`, `P` or `CB3` key** — SAM/WILL/CB3 are *slots* that appear inside a group's slot list.
- `NATURAL_SLOT_MAP` maps position → slot list (`HB:[RB1,RB2]`, `LT:[OT1,OT2]`, `DT:[DT1,DT2]`, …). `WV_SLOT_GROUP` maps slot → weight group (`MIKE/WILL/SAM:'LB'`, `CB1/CB2/CB3:'CB'`, …).
- **So the flex table is keyed by *position*, and the weights are keyed by *slot*.** That single fact drives every inversion below: a rule about "OLB/WILL/SAM" is a rule about the **LB group's slots**, and a rule about "Edge" is a rule about the **EDGE/REDG** group — not a new key.

## The inversions

| # | inversion | one-line reason | tag |
|---|---|---|---|
| **1** | **P1-12 (FB/Punter slots) must land BEFORE P0-17 (flex rules overhaul)** | FB and P are absent from `ROSTER_SLOTS` and from `FLEX`, and P0-17's deliverable is a flex chart **redrawn in the draft-roster order** — so adding two slots after the chart is drawn forces the chart and the map's key set to be redone. | **VERIFIED** (constants read) + **INFERRED** (ordering) |
| **2** | **P0-17 must land BEFORE P0-16 (3-4 / 4-3 base selection)** | the base's order (DE1, DT1 nose, DE2, OLB1, ILB1, ILB2, OLB2) and the OLB≡WILL / ILB≡MIKE aliasing are expressed through `NATURAL_SLOT_MAP` / `WV_SLOT_GROUP` — the same structures the flex overhaul rewrites — and the CB3 substitution only exists once the flex rules say what CB3/Nickel may do — and it is base-dependent: **The substitution is base-dependent, and the council's earlier mapping was wrong.** **4-3:** CB3/Nickel on → **SAM (LB3) off**. **3-4:** CB3/Nickel on → **nose tackle (DT1) off**, and all four linebackers stay on the field. Underneath: the 3-4 **replaces one defensive tackle with a second inside linebacker**, so the converted slot is **DT2 → ILB2** (worth MIKE) and the SAM role is worn by **OLB2** (worth WILL). The earlier council mapping (SAM→ILB2, DT2→OLB2) had those **swapped** and is **superseded**. **Never write "LB3/SAM comes off" without naming the base** — in a 3-4 there is no SAM to come off. | **INFERRED** (structures identified; the alias's exact form is Lightning's call) |
| **3** | **P0-17 must land BEFORE P0-12 (draft board V22 changes)** | the board's "also fits" line prints the flex results in the new "x also y (−z flex)" format; the format is a string change, but the **numbers it prints are the flex table's**, so the board cannot be correct before the rules are. | **VERIFIED** (the line's source) |
| **4** | **P1-10 (SIM-CORE markers + 3 headless entry points) gates the PROOF of P0-17, not its implementation** | the contract's C5 step 1 and the seeded before/after proof of the new flex matrix both need a headless entry point; without P1-10 the change can be written but not demonstrated. | **VERIFIED** (contract C5) + **REPORTED** (P1-10's wording) |
| **5** | **P1-11 (SAM scarcity) does NOT gate P0-17 — but it re-measures it** | it is a **pool** decision (5 SAM records for 32 teams), not a code change, and the current build's rosters are what they are; but SAM's scarcity feeds the replacement level, so if the next intake makes SAM required, every flex value that depends on SAM's supply moves with it and P0-17 must be re-measured before the next release. | **VERIFIED** (the item's text) + **INFERRED** (the coupling) |
| **6** | **P0-5 and P0-7 contradict each other inside P0** | P0-5 keeps a "My Weights" button that *saves* the user's set; P0-7 *deletes* the user weights ("forget my user weights"). Both cannot land as written — this needs the Owner's ruling, and it is the one place the spine contradicts itself rather than merely mis-ordering. | **VERIFIED** (both items' text) |
| **7** | **P0-1 before P0-12** | both edit the same board row template — P0-1 removes the value cell from it and P0-12 rewrites the "also fits" string in it — so two separate edits to one line will collide. | **VERIFIED** (both touch the row template) |

## The corrected topological order

```
1.  P1-10   SIM-CORE markers + headless entry points      (Architect; gates all evidence)
2.  P1-11   SAM scarcity                                   (Owner; a pool ruling, not code)
3.  P1-12   FB / Punter slots  →  adds FB and P to ROSTER_SLOTS, FLEX and the chart
4.  P0-17   flex rules overhaul  (PROTECTED CONSTANTS — Owner's approval, Claude's hands)
5.  P0-16   base defense 3-4 / 4-3  (depends on 4)
6.  P0-12   board's "also fits" format and wins wording  (numbers depend on 4)
7.  P0-1    Value Here removed from the board  (before 6 — one line, two edits)
8.  P0-5 + P0-7  the weights panel  (one Owner ruling; they contradict each other)
9.  P0-2…P0-6, P0-8…P0-11, P0-13…P0-15, P0-18, P0-19   — independent of each other
10. P1-*    the rest — each independent of the P0 spine, except P1-10 (above)
```

**The spine's own rule, "apply P0 → P1 → P2", is wrong in one direction only:** it puts P1-10, P1-11 and P1-12 **after** the P0 items that depend on them. Everything else in P0 is independent of P1 and may be applied in any order inside P0.

**What I did not check:** the other P0/P1 items' bodies for hidden coupling (I read the item titles and the three named items in full, and the constants the three touch); whether any P0 item's *copy* depends on a P1 decision's wording; and the true blast radius of the aliasing, which is Lightning's risk map, not mine.
