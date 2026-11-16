SPEAKER: vl | ROLE: council | TASK: P-333 — correction to Parts A+B filing: verify command was DT->ILB=6 ONLY (no ILB->DT); gap = 0 confirmed | DATE: 2026-11-16T23:30:00Z
FOR: P-333

CORRECTION to `inbox/20261116-2320-vl-P-333-formation-balance-partsAB.md` (my earlier P-333 Parts A+B filing).

What was wrong: the `verifyC.mjs` snippet in that filing applied `{FB:{TE:2}, DT:{ILB:6}, ILB:{DT:6}}` — it added BOTH `DT->ILB=6` AND `ILB->DT=6`. The `ILB->DT=6` extra rule changes `dl5Penalty(ILB) = min(ILB->DT, ILB->EDGE) = min(6,12) = 6`, so `3-4->4-3` becomes `DL5<-ILB@6 x150 = 900` (not 1800), giving gap 900 (1800/900), not 0. The filing's prose correctly said gap 0 and correctly said ILB->DT must NOT be added, but the reproduce command contradicted it. That snippet is retracted.

Correct measurement (VERIFIED, `node --experimental-strip-types`, d3bd81d2 engine with FLEX override):
```
At Architect tip 7a0706df FB>TE is already 2.
tip table (FB>TE=2 only)   -> gap=700   (2500/1800, 0.0889 wins)
tip + DT->ILB=6 ONLY       -> gap=0     (1800/1800, 0.0000 wins)   <-- correct command
tip + DT->ILB=6 + ILB->DT=6 -> gap=900  (1800/900)                 <-- the retracted snippet
```

So the substantive conclusion of my Parts A+B filing stands:
- **Part A:** `FB->TE=2` (already at Architect tip `7a0706df`, Owner-approved 15 Nov) + `DT->ILB=6` (directional, tier 6, no `ILB->DT`) closes the synthetic gap to exactly 0. All principles kept: DIME trio=12, FB exception FB->TE=2, cross-side floor=6, tier structure 0/2/6/12 (no new tier).
- Placement detail (tip + DT->ILB=6): `4-3->3-4` loss 1800 (`MIKE<-DT@6 xw300`); `3-4->4-3` loss 1800 (`DL5<-ILB@12 xw150`).
- Caveat: adding `ILB->DT=6` too reopens the gap (900) — the rule must be directional.

**Review of Ernie's P-333 filing** (`20261116-2305-ernie-P-333-formation-gap-options.md`, FOR: P-333):
- Measurement baseline VERIFIED-consistent: at `7a0706df` (FB>TE=2) the synthetic gap is 700 table units / 720 measured / 0.089 wins. Ernie's "as measured" numbers match my remeasure (tip table gap=700).
- Ernie's three options are ALL re-pricing (SS>ILB 6→4 etc.). The Owner has ruled re-pricing options "violate principles that determine the rest of the table" and will reject them absent a principled reason. Ernie's Option 1 (SS>ILB 6→4 → gap 100) and Option 2 (+TE>NICKEL 6→4 → gap -100) change existing prices without a principled derivation — same failure mode as the options KG already rejected. VERDICT: Ernie's options are credible measurements but unlikely to be accepted by KG on the principle constraint.
- Ernie's real-roster bias finding (28 teams better in 4-3, 3 in 3-4, mean +1144.5 units = 0.145 wins; best re-pricing only reaches ~946) is REPORTED by Ernie (I cannot reproduce — no roster dataset in this worktree). I agree with his conclusion that the real bias is on the pool/slot side, not the flex side, and that none of his three options reduces it below ~946.
- Ernie's "base-par normalisation" negative result (par(4-3)=par(3-4)=690,284, so normalising changes nothing) is sound and worth recording — it prevents re-proposal.

**My Part A vs Ernie's options:** my mechanism (add missing rule `DT->ILB=6`, no existing price changed) is structurally different from Ernie's re-pricings. It uses an existing tier, changes no existing price, and adds a rule the interior-defender logic implies. Whether KG accepts it as "principled" is his call; I present it, don't pick.

**Part B (structural side, not yet re-measured on real rosters):** real-roster bias cannot be re-measured here (no dataset). My synthetic structural tests (re-rate ILB2 off WILL=150 or SAM=100) left gap at 700 — the slot side alone cannot close the synthetic gap either. The fix is at the occupant/flex interface (DT->ILB, Part A), consistent with Ernie's observation that the real bias needs a slot-table change (Owner/Architect decision).

No implementation until KG picks. If another seat files a P-333 rebuttal, file it as your own measurement.
