# Council verification: check MUSE's flex math (EDGE→DT, the free-flex sweep, the 7-rule set)

## What this is

MUSE measured three things about the flex table (the table that says what a player loses, in OVR points, for playing a spot of another role). The Owner asked the council to check MUSE's math independently: re-run the measurements yourself and confirm or contest each number. This is a verification round, not new design work. If a number does not reproduce, say so plainly with the number you got instead.

## Terms, defined here

- **The flex table** has 99 rules. The counts today are 23 rules at a penalty of 12, 42 at 6, 11 at 2, and 23 at 0 (a penalty of 0 means the move is free). FB to TE is 2 (an Owner-approved change).
- **The synthetic gap** is a fixture, not a game: take an idealised 4-3 roster and an idealised 3-4 roster, put each one in the other formation, and add up what the lineup optimizer loses. The 4-3 roster in 3-4 loses 2500; the 3-4 roster in 4-3 loses 1800; the gap is 2500 − 1800 = 700. There is a second cell of the same fixture, called DL5=EDGE, where the 3-4 roster's fifth defensive lineman is an EDGE body instead of a DT body: there both sides lose 1800 and the gap is 0.
- **The real-roster bias** is the same transposition run on the real 32-team pool (1,953 players). For each team, take the difference (4-3 value minus 3-4 value); a positive number means the team is better in 4-3. The mean over 32 teams and the split (how many teams favour 4-3 / 3-4 / tied) are the two numbers that matter.
- **The gap condition** is the Owner's requirement: 3-4 must be better than 4-3 when a bad DT2 is left on the draft board and there are many good linebackers. It is measured by capping every DT2 in the pool at a given OVR (cap 70, cap 75, or cap 65), leaving the linebacker pool untouched, and re-running the transposition. The number reported is the same mean signed difference (4-3 minus 3-4) and split.
- **Table values** come from the flex table's weights. **Measured values** come from the engine's measured value provider, which reads the engine's own measured slot values instead of the table. Both are reported below where MUSE ran both.
- **Flexed spots** is the count of lineup spots filled by a player playing out of position, out of 2048 total spots (32 teams × 64 spots). **Emergencies** is the count of spots filled by the emergency fallback.
- **A runtime override** means changing a flex penalty inside the probe process only, at runtime. Do NOT edit the product file (`colors/src/sports/nfl/engine/flex.ts`) and do NOT edit `tools/mathlab/flex.json`. The flex table is the Architect's; this round only measures what would happen if the values changed.

## The engine to measure against

Use the engine tip `7a0706df` (the Architect's `architect/engine-and-seats` branch). MUSE's probe extract was taken from that tip. If your extract differs, say which commit you measured and whether the baseline below reproduces on it.

## What MUSE claims — verify each of these

### 0. Baseline (no overrides). MUSE says this reproduces exactly on the tip.

- Synthetic gap, DL5=DT cell: 4-3 loses 2500, 3-4 loses 1800, gap 700. DL5=EDGE cell: both lose 1800, gap 0.
- Real-roster bias: split 28/3/1, mean +1144.53 (table values); +1184.54 measured.
- Gap condition at cap 70: split 22/9/1, mean +452.34. At cap 75: 27/4/1, +799.22. At cap 65: 21/10/1, +385.94.
- Flexed 147/2048, emergencies 0.

### 1. EDGE to DT at 2 (one rule, 0 → 2, runtime override). MUSE says:

- The gap condition at cap 70 becomes TRUE in the mean: split 14/18/0, mean −64.84 (table); −53.31 measured. At cap 65: 14/18/0, −140.63 (table). At cap 75: still only directionally true, 24/6/2, +638.28 (table).
- The synthetic gap, DL5=DT cell, is UNCHANGED at 700. The DL5=EDGE cell flips to −600 (the 3-4 roster in 4-3 now loses 2400).
- Real-roster bias: split 25/5/2, mean +1060.16 (table); +1098.44 measured. Flexed 155, emergencies 0.
- The mechanism MUSE claims: the 4-3 still slides an EDGE inside to DT2 on 23 of 32 teams in the cap-70 scenario, but now pays 2 × 300 = 600 per team for it; that cost flips the mean by about 517 units.

### 2. The free-flex sweep (each free rule 0 → 2 alone, runtime override). MUSE says:

- There are 23 rules at penalty 0. Two of them are home listings (ILB to ILB, OLB to OLB) and are inert — the engine returns 0 for a same-role move before it looks at the table — so 21 were swept.
- **No free flex 0 → 2 moves the synthetic gap toward 0.** It stays at 700 for every single change. The only one that moves it at all is DT to FB, and it moves it the wrong way (700 → 750).
- Improvers (5): EDGE to DT (condition −517.2, bias −84.4); ILB to OLB (condition −51.6, bias −35.9); SS to NICKEL (condition −16.4, bias −29.7); CB to FS (condition −18.8, bias −15.6); CB to DIME (bias −12.5, condition 0.0 — marginal).
- Worseners (4): EDGE to OLB (bias +82.8, condition +99.2, flex +38); DT to FB (gap 700 → 750, bias +11.7); CB to NICKEL (bias +21.1, condition +23.4); CB to SS (bias +38.3, condition +35.9).
- Neutral (12): EDGE to FB, ILB to FB, OLB to FB, RB to FB, TE to FB, OT to OG, OT to FB, OG to FB, C to FB, SS to DIME, FS to NICKEL, FS to DIME.
- The four-rule set (EDGE to DT + ILB to OLB + SS to NICKEL + CB to FS, all at 2): bias 980.5, condition at cap 70 −146.1, flexed 173, synthetic gap 700.
- EDGE to DT at 2 + EDGE to OLB at 2 together flip the condition at cap 70 back to positive (+32.8) — the two interfere. Verify this interaction specifically.

### 3. The 7-rule set (the four above plus EDGE to OLB, OT to OG, and CB to SS, all at 2, runtime override). MUSE says:

- The condition at cap 70 does NOT robustly hold with all seven: it is a coin flip. Table: −4.7, split 15/16/1. Measured: +1.7, split 16/16/0. The two providers disagree on the sign because the margin is within noise.
- Marginal cost of each new rule on top of the four-rule set: EDGE to OLB +96.9 on the condition at cap 70, +70.3 on the bias, +40 flexed; CB to SS +42.2, +64.0, +8; OT to OG +11.7 on the bias, −1.6 on the condition, −2 flexed (essentially free).
- The 7-rule set: bias 1120.3 (only 2% better than the baseline 1144.53), flexed 224, emergencies 0, synthetic gap 700. At cap 65 the condition still holds clearly on the table (−79.7); at cap 75 it is still 4-3 ahead (+680.5).

## What to do

1. Re-run the baseline (section 0) on the tip and confirm it reproduces. If it does not, stop and say so — everything else depends on it.
2. Re-run sections 1, 2, and 3. For each claim, report VERIFIED (your number matches MUSE's within ±10 units) or CONTESTED (your number differs, with the number you got). Run the measured provider as well as the table provider where you can; if the two disagree on the sign of the cap-70 condition for the 7-rule set, that is itself a finding — report both.
3. Check the interaction claim specifically: EDGE to DT at 2 + EDGE to OLB at 2 flips the cap-70 condition back to positive. And check whether the three new rules' costs are roughly additive on top of the four-rule set, as MUSE claims.
4. If you find a discrepancy, trace it: is it a different engine commit, a different pool, a different cap definition, or a genuine arithmetic error in MUSE's probe? Say which.
5. File your verification in your inbox as `_agents/<seat>/inbox/<date>-<seat>-P-333-verify-muse-flex-math.md`, with FOR: P-333. Push after every finished file, not just at session end — commit and push after each filing so a timed-out chat does not lose the work.

## A note on the work itself

You are checking arithmetic and method, not re-deciding the flex table. If MUSE's numbers reproduce, say so and say how you ran them. If they do not, the discrepancy is the deliverable. And as you work, if you notice a better way to measure the gap condition — a cleaner scenario, a sharper fixture, a measurement MUSE missed — file that as a short note in the same filing. The Owner reads the verification; a good idea filed alongside it is welcome, but it does not replace the verification.
