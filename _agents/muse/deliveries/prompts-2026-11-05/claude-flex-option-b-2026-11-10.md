# Claude — Flex Option B: narrow the 3-4 / 4-3 gap (Owner decision)

## Why (the Owner's question, and what MUSE measured)

The Owner asked: is it more advantageous to play 3-4 than 4-3? MUSE measured it on the engine (architect `97d7e9d`, the lineup optimizer, all players at 70 OVR):

- **The formations themselves are even.** Slot-weight totals: 4-3 is 8575, 3-4 is 8575, difference zero. A roster built for its own formation is worth the same either way (600250 in 4-3, 600250 in 3-4).
- **The cross-formation penalty is not even.** A 4-3 roster played in 3-4 loses **2700**; a 3-4 roster played in 4-3 loses **1800**. Gap: **900**. So 3-4 is the more forgiving formation — it loses less when played out of formation.
- **Why the 4-3 roster loses more (three misfits):** an inside stand-in at −6 on a 300-weight slot (1800); a FB covering TE3 at −6 (300); a TE covering SAM at −6 on a 100-weight slot (600). The TE goes to SAM instead of DIME because TE>DIME is 12 — too expensive — so it lands on the heavier slot.

## The principle (Owner's)

**A misfit into a low-value slot should cost less, because the slot matters less.** The Owner is open to reducing flex penalties where the destination slot weighs 50 or lower (DIME is 50, TE3 is 50). The 1800 inside stand-in is a 300-weight slot, so it stays — it is the floor. Only the two low-weight pieces move.

## The changes (Option B — Owner picked this one)

Apply these four edits to `tools/mathlab/flex.json` AND `colors/src/sports/nfl/engine/flex.ts` (keep them in sync):

1. **TE>DIME: 12 → 6.** The TE now routes to DIME (6 × 50 = 300) instead of SAM (6 × 100 = 600). This is the big lever — it re-routes the TE to the cheap slot.
2. **ILB>DIME: 12 → 6.** Consistency — all front-seven players flex to dime back at the same price.
3. **OLB>DIME: 12 → 6.** Same, for consistency.
4. **FB>TE: 6 → 2.** A fullback covering TE3 (a 50-weight slot) drops from 300 to 100. A FB blocking and catching short passes is close to what a TE3 does in heavy sets.

**Expected result (MUSE verified by running the optimizer):** the 4-3→3-4 penalty drops 2700 → **2200**, so the gap narrows 900 → **400**. The 3-4→4-3 penalty stays 1800.

**Expected counts after the change:** still **99 rules**. Tiers move from {0: 23, 2: 10, 6: 43, 12: 23} to **{0: 23, 2: 11, 6: 45, 12: 20}** (three rules leave tier 12 for tier 6; one rule leaves tier 6 for tier 2). Confirm the counts match when you push.

## One flag — this revisits item 3, deliberately

TE>DIME at 12 was the Owner's item-3 decision (all LBs and TEs play FS for −12, and TE>DIME went 6→12 with it). Reducing it to 6 is a change to item 3. The Owner chose Option B knowing this, because DIME is a 50-weight slot and the low-weight principle now governs. Do not treat the 12 as sacred — the Owner's current decision is 6. (TE>FS stays 12; ILB>FS and OLB>FS stay 12. Only the DIME rules move.)

## What to do — and a direction to think about

The Owner's decision is Option B (the four edits above), and it is ready to land. But before you land it, think about the bigger direction, and **decide for yourself how to proceed**.

The Owner is interested in the **derivation** as the direction of travel: instead of 99 hand-set prices, one formula that produces them — from the destination's weight, from the skill gap between the two roles, or from some combination the council's skill-profile work (P-322) is already exploring. The hand-set table is a guide for how the Owner wants the engine to work; a formula would make it easier to keep honest, and it would settle questions like this one (the 3-4 / 4-3 gap, the DL5 corner, the low-weight principle) by deriving the answer rather than hand-tuning it.

So here is what the Owner asks: **think about the derivation, and decide how to proceed.** You have three broad options, and the choice is yours:

- **Land Option B as specified, then work on the derivation.** The four edits ship, the gap narrows, and you take up the formula as the next piece of work (a design, a prototype, or a full implementation — your call on the scope).
- **Work on the derivation first, and let it decide Option B.** If the formula, once written, produces the Option B prices (or better ones) on its own, then the hand-set edits are unnecessary — the derivation *is* the change. Say so in your reply, and show what the formula gives for the four rules in question.
- **Propose a different path entirely.** If you see a better approach — a different solution to the formation balance, a different way to derive the prices, or a reason the derivation is the wrong direction — propose it concretely and say why.

**The Owner is fine with you answering with a proposal before you work.** You do not have to implement anything in this reply. If you want to write up your take first — on the principle, on the derivation, on which path you would choose and why — and let the Owner respond before you touch any code, do that. A proposal first, then the work, is welcome. Just make the proposal concrete: what you would do, what it would change, and why you think it is the right next step.

**Do not land Option B blindly.** The Owner wants your judgment here, not just your implementation. Read the caveats above (the DL5 corner, the "prices value twice" argument), weigh them, and decide what the right next step is. If you land Option B, say why it is still the right move despite the caveats. If you go another way, say what that way is and why it is better. Either way, put your reasoning in your reply.

What does not change: do NOT run the test suite (the council verifies and reports the new PIN_ENGINE and the new 3-4 test value). Do NOT update the 3-4 test or the E5 pins in this change — those follow from the council's verification, whichever path you take.

## Think about it — and propose a different solution if you see one

Do not just implement the four edits above blindly. Think about whether Option B is the right way to narrow the gap, and say what you think in your reply — and, as above, **decide for yourself how to proceed**.

- **Is the low-weight principle the right principle?** The Owner's idea is that a misfit into a low-value slot should cost less because the slot matters less. Is that the right way to think about it, or is there a better principle? For example, should the penalty depend on the *athletic* distance between the two roles (how different the jobs are) rather than the destination's weight? Or on something else entirely?
- **Is Option B the best way to apply it?** The four edits narrow the gap from 900 to 400. Is there a cleaner way to get there — fewer edits, a more general rule, a different set of rules? Or a way to close the gap all the way to zero without making any flex free?
- **Is there a different solution altogether?** If you see a better approach to the 3-4 / 4-3 balance — one that does not use these four edits, or that solves the asymmetry at a different level (for example, in how the lineup optimizer picks the cheapest arrangement, or in the slot weights themselves) — propose it. Describe it concretely: what changes, what the gap becomes, and why you think it is better than Option B.
- **Is the derivation the better path?** The Owner is nudging toward a full formula that produces all 99 prices, rather than hand-setting them one by one. If you think the derivation is the right next step — whether it replaces Option B, follows it, or reshapes it — say so, and say how you would start. The council's skill-profile work (P-322, Inkling's 9-skill design, verified at 97/105) is already exploring this; you would not be starting from zero.

**The decision on how to proceed is yours.** Land Option B, work on the derivation, do both, or propose something else — but do not implement blindly. Put your reasoning and your decision in your reply.

## Two things to know before you think about alternatives

**P-323 is done and REVIEWED.** The council verified the `97d7e9d` build (99 rules, suite 290/288/2, the only two failures being the predicted ones). The Owner declared it formally REVIEWED. The two fixes P-323 found — the 3-4 test (2700) and the new PIN_ENGINE — are **superseded by Option B**: once Option B lands, the 3-4 test should be **2200** and the PIN_ENGINE will be a **new hash**. Do not apply the P-323 fixes as written. The council will verify Option B and report the new values; those follow as a separate step.

**The 900 gap is a DL5 corner, not a general asymmetry.** A council seat (Inkling) ran the full 2×2 and found the gap depends on what fills the 4-3 native's DL5 slot (the rotational fifth lineman — the measurement's helper filled it with a DT, and that role was never pinned). If DL5 is a DT, the gap is 900 (2700 vs 1800); if DL5 is an EDGE, the gap is **0** (1800 vs 1800). Under Option B: 400 (DT) vs 0 (EDGE). So the "formation gap" exists only when the fifth lineman is a DT. If it's an EDGE, there is no gap at all. **What "pin the DL5 role" means:** the DL5 slot can be filled by a DT or an EDGE (both fill it for free), so any measurement that uses a DL5 has to choose one — and that choice changes the result. "Pinning" it means making the choice explicit and fixed: write down, in the test/fixture, whether the DL5 is a DT or an EDGE (instead of letting the helper silently pick one), and report both cells so the reader knows the gap is conditional. It is a measurement fix, not a flex change — it makes the numbers honest rather than changing them. Keep this in mind when you think about alternatives — the asymmetry may be a fixture corner rather than a general property of the formations, and pinning the DL5 role (and reporting both cells) may be part of the answer. The low-weight principle itself has also been questioned by the council (the argument: the optimizer's objective already prices the destination's weight, so the table's job is ability distance — Option B may price value twice). Weigh that when you consider whether the principle is right.

## The derivation — the direction, not just an eventuality

The Owner wants you to think about this as the direction of travel, not a distant eventuality. Right now the flex table is 99 hand-set prices, each decided individually. The eventual idea — and the Owner is nudging toward it now — is a **derivation**: instead of setting each price by hand, write **one formula** that produces all 99 prices. From what? That is the question. It could be the destination slot's weight (cheap job, cheap price; important job, expensive price — DIME weighs 50, so any flex into DIME comes out low; CB1 weighs 400, so any flex into CB1 comes out high). It could be the skill gap between the two roles (the council's P-322 skill-profile work — Inkling's 9-skill design, verified at 97/105 — is already exploring this, and MUSE has outlined 15 skills with the key splits: pass-block vs run-block, man vs zone coverage, catching vs route running). It could be a combination. You would be the one to write that formula, and you would decide how to start: a design, a prototype against the Owner's table, or a full implementation. You do not need to finish it in this change — but the Owner wants you to think about it now, as the direction, and to decide how to proceed (see "What to do" above). Just hold the idea and say, in your reply, how you would approach it and whether it changes what you do about Option B.

## Innovation

Think around this, not just through it. If you see a cleaner way to express the low-weight principle (for example, a rule that derives the penalty from the destination slot's weight instead of hand-setting it per rule), say so in your reply — and if that cleaner way *is* the derivation, say how you would start it. The flex table is a guide for how the Owner wants the engine to work; if a derivation would make the table easier to keep honest, that is worth naming. The Owner is nudging you toward the formula as the direction, but the decision on how to proceed — land Option B, work on the derivation, do both, or propose something else — is yours. Do not expand the scope beyond what you decide, but do not implement blindly either.
