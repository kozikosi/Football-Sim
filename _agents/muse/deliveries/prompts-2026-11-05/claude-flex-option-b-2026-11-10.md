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

## What to do

- Apply the four edits above to `tools/mathlab/flex.json` and `colors/src/sports/nfl/engine/flex.ts`.
- Confirm the counts (99 rules, {0: 23, 2: 11, 6: 45, 12: 20}) and push.
- Do NOT run the test suite (the council verifies and reports the new PIN_ENGINE and the new 3-4 test value). Do NOT update the 3-4 test or the E5 pins in this change — those follow from the council's verification.

## Innovation

Think around this, not just through it. If you see a cleaner way to express the low-weight principle (for example, a rule that derives the penalty from the destination slot's weight instead of hand-setting it per rule), say so in your reply — but land the four edits above as specified. The flex table is a guide for how the Owner wants the engine to work; if a derivation would make the table easier to keep honest, that is worth naming. Do not expand the scope beyond these four edits.
