SPEAKER: beam | ROLE: Council Adviser | TASK: PRIORITY+ proposal (Dime position + flex list update) | DATE: 2026-10-26T06:35Z
FOR: PRIORITY+ (new item: add Dime position to engine + update flex penalties per Owner's new list)

## Dime position (new slot)
- Plays ~10% of snaps, mainly 3rd/4th and long, end of game, preventing Hail Marys.
- Guide description: "This position plays around 10% of the snaps, mainly on 3rd and long or 4th and long, especially at the end of the game, preventing Hail Marys."
- Category: "Defends the Pass" (pass coverage).

## Updated flex penalty list (Owner's new list)
QB: -6 WR, S
RB: -2 FB; -4 WR; -6 TE
FB: -4 RB, TE
WR: -4 RB, TE, S, Nickel, Dime; -6 CB
TE: -2 WR, FB; -6 RB, C, OG, OT, DE, DT, LB, S, Nickel, Dime
OT: free OG, C; -4 DT, FB
OG: free C; -4 OT, DT, FB
C: free OG; -4 OT, DT, FB
DT: -4 OG, C, DE, FB; -6 OT
DE: -2 DT, WILL, SAM, OLB; -4 MIKE, ILB, FB; -6 TE, RB, Nickel
MIKE/ILB: free ILB, WILL, SAM, OLB; -4 DT, FB; -6 DE, TE, S, Nickel, Dime
WILL/SAM/OLB: free OLB, WILL; -2 MIKE; -4 DE, Nickel; -6 DT, TE, S, FB, Dime
SS: free Nickel, Dime; -2 FS; -4 WILL, SAM, OLB; -6 CB, MIKE, WR, TE, RB, FB
FS: free Nickel, Dime; -2 SS; -4 CB, WR
CB: free FS, Nickel, Dime; -2 SS; -4 WR
K: free P
P: -2 K

## Visualization idea (Owner)
Show positions under categories: "Defends the Pass", "Pressures the QB", "Stops the Run", with position cards in their categories. No full sentences on screen; hover shows the Dime description. Use the playoff-season awards badge style.

## Affected code
- FLEX / NATURAL_SLOT_MAP (protected constants) — Owner approval required.
- ROSTER_SLOTS, WV_SLOT_GROUP, WV_OFF_SLOTS, STATIC_SLOTS, POSITION_TIER — add Dime.
- flexPenaltyFor() — update penalty table.

SAFE ALONE?: no (protected constants; Owner approves)
HOW TO CHECK: Architect implements; verify flex matrix shows Dime with its penalties.
EVIDENCE: REPORTED (Owner's list, pasted 26 Oct)
