# Guide Review — BOC — MOC request (V21 Guide brief) — 21 Oct 2026

Read-only on merged.html `40233d6b…`. No product edits. BOC endorses MOC's patch with two corrections.

## Verdict: ENDORSE with two corrections

### (a) Flex table order — VERIFIED, MOC's order is correct

MOC's proposed order: QB → RB → WR → TE → OT → OL → DL → LB → CB → S.

Cross-check against the draft board's actual column order (thead, l.426): Player, Pos, Team, OVR, Wins, Value here, Priority, Gone, Fills. The position GROUP_DEFS order (l.455) is: Offense — Positions (QB, RB1, RB2, WR1-4, TE1-2, OT1-2, OG1-2, C), then Offense — Team Units (RB, WR, TE, OT, OG, OL, ...), then Defense — Positions (DE1-2, DL5, DT1-2, MIKE, WILL, SAM, LB4, CB1-4, SS/SS2, FS/FS2), then Specialists (K, P, FB).

So the conventional order is: QB, RB, WR, TE, OT/OL, then defense: DL, LB, CB, S, then specialists. MOC's order (QB → RB → WR → TE → OT → OL → DL → LB → CB → S) matches exactly. Endorsed.

### (b) "offensive Tackle" wording — MOC's patch covers 3 of 5 instances

MOC's patch (per MOC's message) changes: the "Tackle" row label, and the bare "tackle" cells. Verified in the source (l.4961–4969):
- l.4961: "a left tackle plays tackle, a strong safety plays strong safety" — first "tackle" is the position (left tackle), second "tackle" is the natural position (offensive tackle). Both should read "offensive tackle" per Owner's rule ("Never just say 'tackle.' Always say 'offensive Tackle'."). **MOC's patch does NOT cover this sentence.** Correction needed.
- l.4961: "your best guard playing tackle" → "playing offensive tackle". **Not covered.** Correction needed.
- l.4967: `<tr><td>Tackle</td>` → `<tr><td>Offensive Tackle</td>`. **Covered by MOC's patch.** ✓
- l.4968: `tackle, defensive tackle` → `offensive tackle, defensive tackle`. **Covered.** ✓
- l.4969: `tackle, running back` → `offensive tackle, running back`. **Covered.** ✓

Additional instance in the Guide (l.5046): "the tackle makes up about a fifth of the pass-protection rating" — "tackle" here means the offensive tackle position. Should be "offensive tackle". **Not covered by MOC's patch.** Correction needed.

Instance NOT to change: l.5009 "a TFL is a tackle for loss" — "tackle" here is the football action (tackle for loss), not the position. Leave as-is.

Instance being removed: l.4991 (Value here bullet) — "a guard slotted at tackle plays 4 points worse" — this bullet is being deleted per the value-here prototype, so no change needed.

### (c) V21/V22 naming — already folded

V21-Suggestions.md section F already states: "Build now referred to as V22, next edition as V22 (Owner ruling, 22 Oct). The older build names are historical only." No change needed.

## Corrections to MOC's patch (2 items)

1. **l.4961 sentence:** Change "a left tackle plays tackle" → "a left tackle plays offensive tackle"; "your best guard playing tackle" → "playing offensive tackle".
2. **l.5046:** Change "the tackle makes up" → "the offensive tackle makes up".

## What BOC did not check

- Whether MOC's patch covers the flex table's `colspan="4"` (the "Quarterback cannot play anywhere else" row) — MOC's reorder should preserve this.
- Whether the "Position values" merge into "Drafting: which positions matter" requires any label changes beyond the rename.
- Whether the glossary cross-reference (B-5) has any additional bare "tackle" instances beyond those listed.
- MOC's patch itself (I did not see the file; I verified against the Owner's words and the source only).

## Endorsement

MOC's patch is endorsed with the two corrections above. The flex table reorder matches the draft board's conventional order. The "offensive Tackle" rule is applied to all 5 bare-tackle instances that refer to the position (3 covered by MOC, 2 additional flagged here).
