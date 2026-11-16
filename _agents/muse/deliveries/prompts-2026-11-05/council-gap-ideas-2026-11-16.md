# Council prompt — propose options to close the 4-3/3-4 formation gap (FOR: P-333)

**What this is.** The football sim's engine has a formation gap: a team built for a 4-3 defense loses value when forced into a 3-4, and vice versa, and the two losses are not equal. The gap is 700 table units / about 720 measured = 0.09 wins a season. The Owner (KG) has ruled that 3-4 and 4-3 are equally valuable in football, and he wants the gap closed. He is willing to hear ideas. Your job is to propose options — do not pick one, and do not implement one. KG picks.

**The gap, as measured.** A "stand-in" is a player flexed into a position he does not normally play, at a penalty. The penalty is a number — 0, 2, 6, or 12 — multiplied by the destination position's value. The 4-3 roster loses 2500 in 3-4 (three stand-ins: DT2 from OLB at 6, SAM from TE at 6, TE3 from FB at 2). The 3-4 roster loses 1800 in 4-3 (one stand-in: DL5 from ILB at 12). Gap = 2500 − 1800 = 700. In wins that is 700 × 0.00254 / 20 = 0.09 wins a season. (FB to TE is 2; the DIME trio — TE, ILB, and OLB to the DIME slot — is 12.)

**The frame has changed — read this carefully.** The 99-rule flex table (the list of penalties for every position pair) is a GUIDELINE for the engine to produce acceptable flex values. It is NOT a constraint. A proposal does not need to conform to every rule in the table — including the DIME trio at 12, the FB exception (DT and OT to FB at 0), and the cross-side floor at 6 (wide receivers to cornerback, free safety, strong safety, nickel, and dime were raised from 2 to 6). Those are guidelines, not hard rules. If a proposal prices the DIME trio at 6 or 4–5, or changes the FB exception, that is acceptable if it produces acceptable flex values and closes the gap. Do not reject a proposal for deviating from the table. This supersedes the earlier framing that the table's rules were protected constants.

**Your job.** Propose 2–3 concrete options for closing the gap. For example: re-price a pair; a derived formula (a smooth function of athletic distance and destination weight that prices the table); any other mechanism you see. For each option, measure and report:
1. The new gap — in table units and measured.
2. Which table rules it changes (if any).
3. The effect on flexing frequency — how many spots are flexed across 32 teams × 2 bases (the live table flexes 145 spots) — and on emergency fills.
4. Whether it keeps the DIME trio, the FB exception, and the cross-side floor, or changes them — and why that is acceptable.

**Filing.** Write your proposal in your `inbox/` as a filing labeled FOR: P-333, and push it. Push after every finished file. KG picks the option; no implementation until he does. If you find a flaw in another seat's option, file that too — disagreement is welcome, but file it as your own measurement, not as a correction to someone else's file.

**Innovation.** Think around the issue, not just inside it. Brainstorm, improve, and create new ideas about how the gap could close — the prompt tells you what to propose, not how to think. If you see a mechanism nobody has named yet, name it and measure it.
