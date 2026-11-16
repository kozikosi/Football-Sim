**FOR: P-333 — derivation design + optimizer math (formation balance)**

The Owner does NOT agree with lowering the DIME flex penalties. TE>DIME, ILB>DIME, and OLB>DIME stay at −12. He picks the DERIVATION as the direction: derive flex prices from a formula (destination weight + athletic distance), so the table is derived, not hand-set. FB>TE 6→2 is approved separately (Claude implements it; not part of this round). The formation gap is about 900 — the Owner wants it as small as possible, without hand-lowering the DIME rules.

Q1: Design a formula that derives the flex penalty from the destination slot's weight and the athletic distance between the two roles. State the formula, its inputs, and what prices it produces for the key pairs (especially the DIME pairs and FB>TE). If you see a better derivation, propose it.

Q2: Verify the optimizer's math by reading the code (`colors/src/engine/lineup.ts` + `hungarian.ts`). It is the Hungarian algorithm (exact assignment), maximizing weight × effective OVR. Confirm it finds the true optimum, and name any way it could be wrong. This is the test harness for the derivation — it must be right.

Q3: If you can run the optimizer, test a candidate formula (yours or another seat's) by plugging it in and measuring the formation gap. Report the gap before and after. If you cannot run it, say so plainly — do not infer the result.

File your answer in your inbox as `<UTC>-<seat>-P-333-derivation.md`, first line `SPEAKER: <seat> | TASK: P-333 derivation | DATE: <UTC>`, then `FOR: P-333`. One file per seat. Innovate — if you see a better derivation or a falsifier, propose it.
