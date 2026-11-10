# MUSE — Thinking about the derivation formula: can penalty from destination weight reproduce the Owner's table?

## Bottom line

**No — destination weight alone cannot reproduce the Owner's table.** A pure weight-band formula gets **40/99** exact. Adding coarse role groups gets **45/99**. The penalty depends on how different the two roles are, not just on how much the destination weighs. The weight intuition is correct for low-weight destinations (it explains Option B), but as a full derivation it fails. The right derivation direction is the skill-profile approach (P-322 — Inkling's formula gets 97/105), which measures how different the two roles are in skill space. A weight term could refine it, but weight alone is not the formula.

## The question

The Owner asked MUSE to think about the derivation formula — one formula that produces all 99 flex prices from the destination slot's weight (cheap job, cheap price; important job, expensive price), instead of 99 hand-set rules. I tested whether that formula can reproduce the Owner's 99-rule table (architect `97d7e9d`).

## Method

Two formulas tested against the 99-rule table, with a runnable script each (saved in `_agents/muse/deliveries/`):

- `derive-weight-analyze-2026-11-10.py` — pure destination-weight bands.
- `derive-twofactor-2026-11-10.py` — weight bands + same-role/same-group = 0 + cross-side floor 6.

Destination weight mapping: each destination role mapped to its primary slot weight (QB 1000, WR 650, EDGE 650, OT 500, DT 500, OG 400, CB 400, ILB 300, FS 300, SS 300, TE 250, RB 250, OLB 150, C 150, NICKEL 100, DIME 50, K 50, P 50, FB 25). Note: for multi-slot roles (WR, TE, CB, OT, OG, DT, EDGE, OLB) the weight depends on which slot; I used the primary (highest-weight) slot. That ambiguity is itself a limitation of a role-based weight formula.

## Results

### Formula 1 — pure destination weight (bands: ≤50 → 2, 100–150 → 6, 250–300 → 6, 400+ → 12)

**Exact: 40/99.** Misses: 59.

The mean penalty does rise with destination weight (w=25 → 0.00, w=50 → 5.11, w=100 → 3.75, w=150 → 3.27, w=250 → 6.17, w=300 → 6.86, w=400 → 5.25, w=500 → 7.40, w=650 → 9.82), so there IS a correlation. But it is weak and noisy — within any weight band, the penalties span the full range.

### Formula 2 — weight bands + same-role/same-group = 0 + cross-side floor 6

**Exact: 45/99.** Misses: 54. Barely better than weight alone.

## Why weight alone fails (the misses tell the story)

**1. Same-group flexes vary widely — weight cannot explain them.** Within the OL group: C>OT is 12, C>OG is 6, OG>OT is 2, OT>OG is 0. The destinations (OT 500, OG 400) are both high-weight, but the penalties differ from 0 to 12. The difference is the SOURCE and the specific skill — snapping. Only the C can snap, so a C going to OT loses the snapping value (12), but an OT going to OG is a small move (0). A weight formula sees only the destination (OT or OG) and cannot distinguish these. Same in the DB group: FS>CB is 6, SS>CB is 6, CB>FS is 0, SS>FS is 2.

**2. Cross-side big jumps are 12 even into low-weight destinations.** TE>DIME is 12, ILB>DIME is 12, OLB>DIME is 12 — but DIME weighs only 50, so a weight formula gives 2. The Owner charges 12 because the jump is huge (a front-seven player playing a coverage DB), not because the job matters. QB>FS is 12 (FS weighs 300, formula gives 6). RB>FS and RB>SS are 12. The cross-side floor of 6 (the Owner's rule) is not enough — the Owner's table has many cross-side rules at 12, and a weight formula under-predicts them all.

**3. Free flexes into high-weight destinations.** EDGE>DT is 0 (DT weighs 500, formula gives 12). OT>OG is 0 (OG weighs 400, formula gives 12). ILB>OLB is 0, OLB>OLB is 0, CB>FS is 0. These are same-group / similar-role moves that cost nothing even though the destination is important. Weight alone says they should be expensive; the Owner says they are free because the roles are close.

**The pattern:** the penalty depends on how different the two roles are (the "jump"), not just on how much the destination weighs. Weight matters — the mean penalty rises with weight — but it is a secondary factor. The primary factor is the pair.

## What this means for the derivation

**The weight intuition is valid, but only as a secondary factor.** It correctly explains the Option B changes: TE>DIME and FB>TE are into low-weight slots (DIME 50, TE3 50), so lowering them fits the principle that a misfit into a minor job should cost less. That is why Option B works. But as a full derivation — one formula that produces all 99 prices — weight alone fails (40/99). It cannot capture snapping, it cannot capture same-group variation, and it cannot capture why cross-side big jumps cost 12 into a 50-weight slot.

**The right derivation needs a "jump" term.** The penalty must depend on both (a) how different the source and destination roles are, and (b) how much the destination weighs. The jump term is what the skill-profile approach (P-322) provides: per-role scores for blocking, coverage, snapping, rushing, and so on, so the formula can measure how far apart two roles are in skill space. Inkling's skill-profile formula gets 97/105 exact against the Owner's table (P-328 verified) — far better than any weight-only formula. That is the derivation direction that works.

**A weight term could refine the skill-profile formula,** but it is not the formula itself. Whether adding destination weight to Inkling's formula improves the fit (97 → 99) or not is a question for the P-322 work, not for a weight-only derivation. I did not test that combination here — it needs Inkling's skill scores, which live in the P-322 design, not in the weight data.

## Recommendation

- **Keep Option B as the hand-set fix.** It ships now, it narrows the gap 900→400, and the weight intuition behind it is sound for low-weight destinations.
- **Pursue the skill-profile derivation (P-322) as the eventuality,** not a weight-only formula. The Architect (Claude) would write the formula; the council's P-322 designs (Inkling's, verified at 97/105) are the starting point. A destination-weight term does **not** refine it — MUSE tested it (see the Addendum): a weight adjustment fixes at most 4 of Inkling's 6 non-SAM residuals but breaks 5 correct tier-2 rules (net −1), because weight cannot distinguish a residual from a correct tier-2 rule (SS>DIME at 50 is owner 0 but K>P at 50 is owner 2). The remaining gap is about skill similarity, not weight — refining the skill scores is the way to close it.
- **Use the weight intuition as a check, not a formula.** When a hand-set change is proposed (like Option B), ask: is the destination low-weight? If yes, a lower penalty is consistent with the principle. That is a useful rule of thumb for reviewing hand-set edits. It is not a derivation.

## Addendum — does destination weight improve Inkling's skill-profile formula? (MUSE, 2026-11-10)

**No.** I tested whether adding a destination-weight adjustment to Inkling's formula fixes its 8 residuals. It does not — it makes the fit worse or leaves it unchanged, because weight cannot distinguish the residuals from the correct tier-2 rules.

**The test.** Inkling's 8 residuals (P-328 verified) are all owner 0 / model 2: EDGE>OLB, EDGE>SAM, ILB>OLB, ILB>SAM, SS>NICKEL, SS>DIME, CB>FS, CB>SS. Two are SAM rules that do not exist in the 99-rule table (EDGE>SAM, ILB>SAM), leaving 6 non-SAM residuals. I tested a weight adjustment: "if the model says 2 and the destination weighs ≤ threshold, reduce to 0."

- **Threshold ≤150:** fixes 4 residuals (EDGE>OLB 150, ILB>OLB 150, SS>NICKEL 100, SS>DIME 50) but breaks 5 correct tier-2 rules where the Owner says 2 (K>P 50, OG>C 150, OT>C 150, P>K 50, SS>OLB 150). Net: **−1 (worse).** It does not fix CB>FS (300) or CB>SS (300).
- **Threshold ≤100:** fixes 2 residuals (SS>NICKEL 100, SS>DIME 50) but breaks 2 correct tier-2 rules (K>P 50, P>K 50). Net: **0 (no improvement).**
- **Threshold ≥300** (to fix CB>FS and CB>SS): would break FS>SS (300), ILB>SS (300), SS>FS (300) — 3 correct tier-2 rules — to fix 2. Net: **−1 (worse).**

**Why weight cannot help.** The residuals and the correct tier-2 rules overlap in destination weight. SS>DIME (dst 50) is owner 0 but K>P (dst 50) is owner 2 — both weigh 50, but one is free and the other costs 2. The difference is skill similarity (a safety playing dime is natural coverage; a kicker playing punter is a different kicking skill), not weight. No weight threshold can separate them, because they have the same weight. The same overlap holds at 100, 150, and 300. **Weight cannot distinguish a residual from a correct tier-2 rule, so it cannot improve the fit.**

**Conclusion.** Destination weight is not a useful term in the derivation formula — not alone (40/99), not with groups (45/99), and not as an adjustment to the skill-profile formula (net −1 or 0). The skill-profile approach (P-322, Inkling 97/105) is the derivation, and its residuals are about skill similarity, not weight. Refining the skill scores (e.g., recognising that EDGE, SS, and CB are closer to OLB, NICKEL/DIME, and FS/SS than the current scores allow) is the way to close the remaining gap — that is Inkling's design to refine, not a weight term to add. The weight intuition remains a useful check for hand-set changes (like Option B, where the destinations are low-weight), but it is not a formula term.

## Labels

VERIFIED: the 40/99 and 45/99 exact counts (both scripts, run against the 99-rule table at `97d7e9d`); the mean penalty by destination weight; the specific miss examples (TE>DIME 12 vs formula 2, EDGE>DT 0 vs formula 12, C>OT 12 vs formula 0). INFERRED: that a weight term could refine the skill-profile formula (not tested — needs Inkling's skill scores); that the jump term is the primary factor (from the miss patterns, not from a fitted model). REPORTED: Inkling's 97/105 fit (P-328 verified by MUSE).
