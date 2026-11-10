# MUSE — P-333 discussion: is Option B the right approach to the 3-4 / 4-3 gap?

## Bottom line

**Option B is the right approach for this problem, as a hand-set table change.** The low-weight principle is the right principle for a formation-balance fix, Option B is the best way to apply it with hand-set rules, and there is no better solution at the slot-weight or optimizer level. The one genuine alternative is a derivation (penalty from destination weight), which is cleaner long-term but is a bigger piece of work that belongs with the skill-profile design (P-322), not as a replacement for Option B now. I also name the trade-off Option B makes (it trades athletic-distance realism for game balance) so the Owner can see it consciously.

## The three questions

### 1. Is the low-weight principle the right principle?

**Yes, for this problem.** The question is formation balance — a game-balance concern, not a simulation-fidelity concern. The low-weight principle (a misfit into a low-value slot costs less because the slot matters less) is the right principle for balance: it makes the game more forgiving where the stakes are low, which reduces frustration and keeps the formations feeling even.

**The alternative principle is athletic distance** — the penalty should reflect how different the two roles are athletically/functionally. Under athletic distance, TE>DIME at 12 makes sense (a big blocker/receiver playing a coverage DB is a big jump) and FB>TE at 2 makes sense (both block, both catch short passes — a small jump). Athletic distance is more realistic. But it does not solve the gap: under athletic distance, TE>DIME stays 12, the TE stays routed to SAM, and the gap stays 900. Athletic distance justifies the current (asymmetric) table; it does not narrow the gap.

**The trade-off:** Option B trades athletic-distance realism for game balance. A TE playing dime for 6 is less realistic than for 12 (a TE is not a natural dime back). But the DIME slot is worth 50, so the realism cost is small in absolute terms, and the balance gain (gap 900→400) is real. The Owner chose the low-weight principle knowing this trade-off (he set TE>DIME to 12 himself in item 3, then chose to revisit it for balance). That is a legitimate Owner-level call: balance over realism in a low-weight slot.

**Conclusion:** the low-weight principle is the right principle for this problem. Athletic distance is a better principle for realism, but realism is not the goal here — balance is.

### 2. Is Option B the best way to apply the low-weight principle?

**Yes, as a hand-set table change.** Option B changes four rules (TE>DIME 12→6, ILB>DIME 12→6, OLB>DIME 12→6, FB>TE 6→2) and narrows the gap 900→400. It is simple, targeted, and verifiable (MUSE verified it on the optimizer).

**Is there a cleaner way?** A general rule would be cleaner: "any flex into a destination slot with weight ≤50 gets a maximum penalty of 6." That single rule would cover TE>DIME, ILB>DIME, and OLB>DIME (all 12→6) without hand-setting each one. But it would not cover FB>TE (6→2), because FB>TE is already 6 — a "max 6" rule leaves it at 6. To get FB>TE to 2 you still need a hand-set edit (or a different derivation). So a "max 6" rule gets you partway (gap 600, Option A) but not to Option B (gap 400). Option B's FB>TE piece needs a hand-set edit either way.

**A derivation would be cleaner long-term.** Instead of hand-setting each rule, derive the penalty from the destination slot's weight (for example, a formula that maps weight to a tier). That is the direction of the skill-profile IDEA (P-322) — derive flex prices from a formula instead of 97 hand-set rules. But a derivation is a bigger architectural change: it needs a formula, a design, and a verification (which is what P-322 is doing). It is not a replacement for Option B now; it is the future direction that would make Option B-style edits unnecessary.

**Conclusion:** Option B is the best hand-set way to apply the principle. A derivation is cleaner but belongs with P-322, not here.

### 3. Is there a different solution altogether?

**No, not at the slot-weight or optimizer level.**

- **Slot weights:** The formation totals are equal (8575 each) by Owner directive. Changing them to compensate for the gap would violate that directive. Not a good alternative.
- **Optimizer logic:** The optimizer already finds the cheapest arrangement. There is no "better arrangement" to find — the 2700 (now 2200) is the minimum for a 4-3 roster in 3-4, given the table. No alternative here.
- **Accept the gap:** The gap is 900 out of a lineup value of ~600,000 — 0.15%. One could argue it does not matter. But the Owner wants the formations "as close to even as possible," and 900 is a real asymmetry (a 3-4 roster loses 900 less when played out of formation). Option B reduces it to 400 (0.067%). It is worth doing.

**The closest to even without free flexes is Option C (gap 200).** The 4-3→3-4 penalty is 1800 (inside stand-in, fixed) + X (TE3) + Y (TE/DIME). To reach 1800 total (gap 0) you need X + Y = 0, which means both flexes free (Option D). The minimum non-free gap is with the smallest non-zero tiers: FB>TE at 2 (100) and TE>DIME at 2 (100) → 2000, gap 200 (Option C). Option B (gap 400) leaves both at a middle tier (TE>DIME 6, FB>TE 2) rather than pushing both to the minimum. That is a reasonable balance — it narrows the gap substantially without making either flex nearly free.

**Conclusion:** there is no different solution at a different level that is better than Option B. The derivation (P-322 direction) is the only genuine alternative, and it is a future direction, not a replacement.

## What I would propose (if not Option B)

If the Owner wanted a different solution, I would propose the derivation — a formula that sets the flex penalty from the destination slot's weight (and possibly the athletic distance), so that low-weight destinations automatically get lower penalties without hand-setting each rule. That is the P-322 skill-profile direction. But I would not propose it as a replacement for Option B now, because (a) it is a bigger change that needs a design and verification, and (b) Option B is already decided and ships. The derivation is the next step, not this step.

## Labels

VERIFIED: the gap numbers and the Option B result (optimizer-run, P-332 note), the formation totals and native roster values (optimizer-run), the flex rules into DIME/TE3 (read from the 99-rule table). INFERRED: that athletic distance would keep TE>DIME at 12 (reasoning from the roles, not a measurement), that a "max 6" rule would not cover FB>TE (from the rule values), that Option C is the minimum non-free gap (arithmetic from the breakdown: 1800 + 100 + 100 = 2000). REPORTED: the Owner's low-weight principle and his pick of Option B.
