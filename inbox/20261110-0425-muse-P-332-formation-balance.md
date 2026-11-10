# MUSE — P-332 formation balance: 3-4 vs 4-3 gap, Option B verified

## Verdict

**VERIFIED.** The 3-4 / 4-3 cross-formation penalty is asymmetric (gap 900), and Option B narrows it to 400. Verified by running the Architect's lineup optimizer on `97d7e9d` (all players at 70 OVR). The Owner picked Option B (2026-11-10). The Claude prompt is `_agents/muse/deliveries/prompts-2026-11-05/claude-flex-option-b-2026-11-10.md`.

## The measurement (how the gap was found)

The Owner asked whether 3-4 is more advantageous than 4-3. MUSE ran the lineup optimizer (`lineupFor`, architect `97d7e9d`, natural 70s):

- **Formation slot-weight totals: even.** 4-3 is 8575, 3-4 is 8575, difference zero. The Owner's 2026-11-03 directive (ILB2 = DT2 at 300) holds.
- **Native roster value: even.** A 4-3-native roster is 600250 in 4-3; a 3-4-native roster is 600250 in 3-4.
- **Cross-formation penalty: NOT even.** A 4-3 roster in 3-4 loses **2700**; a 3-4 roster in 4-3 loses **1800**. Gap: **900**.

**4-3 roster in 3-4 (2700) — three flexed placements:**
- TE3 <- FB, penalty 6, weight 50, cost 300. (Rule: FB>TE 6.)
- DT2 <- OLB, penalty 6, weight 300, cost 1800. (Inside stand-in; OLB>DT is not a table rule — the penalty comes from the optimizer's stand-in path.)
- SAM <- TE, penalty 6, weight 100, cost 600. (Rule: TE>OLB 6.) The TE goes to SAM instead of DIME because TE>DIME is 12 (12 × 50 = 600, a tie with SAM at 600, and the optimizer picks SAM). Note the test's old description ("a TE covers DIME at −6") is stale — the optimizer re-routed the TE to SAM once TE>DIME went to 12.

**3-4 roster in 4-3 (1800) — one flexed placement:**
- DL5 <- ILB, penalty 12, weight 150, cost 1800. (The extra ILB goes to DL5 at −12.)

**Why the gap widened:** it was 600 before item 3 (2400 vs 1800). TE>DIME going 6→12 pushed the TE from DIME (weight 50, cost 300 at −6) to SAM (weight 100, cost 600 at −6), adding 300.

## The principle (Owner's)

A misfit into a low-value slot should cost less, because the slot matters less. The Owner is open to reducing flex penalties where the destination slot weighs 50 or lower (DIME is 50, TE3 is 50). The 1800 inside stand-in is a 300-weight slot, so it stays — it is the floor in every option.

## Flex rules into low-weight destinations (from the 99-rule table)

- **DIME (50):** CB>DIME 0, FS>DIME 0, ILB>DIME 12, OLB>DIME 12, SS>DIME 0, TE>DIME 12, WR>DIME 6.
- **TE3 (50):** no direct rules — the TE3 slot's dest is TE, so the rule is FB>TE (6).
- **FB (25):** all 0 already (C/DT/EDGE/ILB/OG/OLB/OT/RB/TE > FB 0).
- **K/P (50):** P>K 2, K>P 2. **WR4 (50):** no rules. These do not affect the formation gap.

## Options verified (optimizer run, not arithmetic)

| Option | Changes | 4-3→3-4 penalty | Gap |
|---|---|---|---|
| Current | — | 2700 | 900 |
| A | TE>DIME 12→6 | 2400 | 600 |
| **B (Owner picked)** | **TE>DIME 12→6, FB>TE 6→2** | **2200** | **400** |
| C | TE>DIME 12→2, FB>TE 6→2 | 2000 (arithmetic) | 200 |
| D | TE>DIME 12→0, FB>TE 6→0 | 1800 (arithmetic) | 0 |

Options A and B were verified by running the optimizer with a temporarily modified `flex.ts` (restored after). C and D are arithmetic from the same breakdown (not run). For consistency, ILB>DIME and OLB>DIME should move with TE>DIME (12→6) — they do not change the gap (the TE is the one that goes to DIME), but they keep the "front-seven to dime" price uniform.

**Expected counts after Option B:** still **99 rules**; tiers {0: 23, 2: 11, 6: 45, 12: 20} (from {0: 23, 2: 10, 6: 43, 12: 23}).

## Flag — item 3

TE>DIME at 12 was the Owner's item-3 decision. Reducing it to 6 revisits item 3 deliberately. The Owner chose Option B knowing this. TE>FS stays 12; ILB>FS and OLB>FS stay 12. Only the DIME rules move.

## Effect on P-323

P-323's fix direction is **superseded** by Option B. P-323 (MUSE's review of the `97d7e9d` build) verified the 3-4 test at 2700 and the PIN_ENGINE `nfl1.14a4e9333e888a`. Once Option B lands, the 3-4 test should be **2200** (not 2700) and the PIN_ENGINE will be a new hash (not `nfl1.14a4e9333e888a`). The council verifies Option B when it lands and reports the new values; the Architect then updates the test + pins.

## Labels

VERIFIED: the formation totals (8575 each), the native roster values (600250 each), the cross-formation penalties (2700 vs 1800), the Option A and Option B results (2400 and 2200, optimizer-run), the flex rules into DIME/TE3/FB (read from the 99-rule table). INFERRED: Options C and D (arithmetic, not run). REPORTED: the Owner's principle and his pick of Option B.
