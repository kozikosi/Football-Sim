# Council verification: Ernie's EDGE→ILB=0 package (does it close the gap?)

## What this is

Ernie measured a change to the flex table (the table that says what a player loses, in OVR points, for playing a spot of another role) that he says closes the synthetic gap to exactly 0 and halves the real-roster bias — the largest improvement measured in this round. The Owner asked the council to check Ernie's math independently and to judge two questions: is this change principled, or is it the kind of ad hoc re-pricing the Owner already rejected? And is its side effect acceptable? Re-run the measurements yourself and confirm or contest each number. This is a verification round, not new design work. If a number does not reproduce, say so plainly with the number you got instead.

## Terms, defined here

- **The flex table** has 99 rules. The counts today are 23 rules at a penalty of 12, 42 at 6, 11 at 2, and 23 at 0 (a penalty of 0 means the move is free). FB to TE is 2 (an Owner-approved change).
- **EDGE→ILB** is currently 6 (an Owner override from the table's construction). It is the price an EDGE (edge rusher) pays to play an ILB (inside linebacker) spot.
- **The synthetic gap** is a fixture, not a game: take an idealised 4-3 roster and an idealised 3-4 roster, put each one in the other formation, and add up what the lineup optimizer loses. The 4-3 roster in 3-4 loses 2500; the 3-4 roster in 4-3 loses 1800; the gap is 2500 − 1800 = 700.
- **The real-roster bias** is the same transposition run on the real 32-team pool (1,953 players). For each team, take the difference (4-3 value minus 3-4 value); a positive number means the team is better in 4-3. The mean over 32 teams and the split (how many teams favour 4-3 / 3-4 / tied) are the two numbers that matter.
- **The gap condition** is the Owner's requirement: 3-4 must be better than 4-3 when a bad DT2 is left on the draft board and there are many good linebackers. It is measured by weakening the DT class (Ernie: every DT capped at 70) or strengthening the LB class (Ernie: every LB raised to 85), or both, and re-running the transposition.
- **Flexed spots** is the count of lineup spots filled by a player playing out of position, out of 2048 total spots (32 teams × 64 spots). **Emergencies** is the count of spots filled by the emergency fallback.
- **A runtime override** means changing a flex penalty inside the probe process only, at runtime. Do NOT edit the product file (`colors/src/sports/nfl/engine/flex.ts`) and do NOT edit `tools/mathlab/flex.json`. The flex table is the Architect's; this round only measures what would happen if the values changed.

## The background you need (no prior reading assumed)

The Owner's ask was "EDGE to DT2" — make an edge rusher able to play the DT2 spot. There is no DT2 destination in the engine: the DT2 slot has destination ILB in a 3-4 and destination DT in a 4-3. EDGE→DT is already 0, so the only change that does anything is EDGE→ILB (currently 6). Ernie tested it at 4, 2, and 0.

The Owner already rejected all re-pricing options on 2026-11-16 (13:04 HST) because, in his words, "they all violate principles that determine the rest of the table." The question for this round is whether EDGE→ILB=0 is different: is it the faithful expression of the Owner's own ask ("EDGE to DT2"), or is it another ad hoc re-pricing to close the gap? Your judgment on that question is part of the deliverable, alongside the numbers.

## The engine to measure against

Use the engine tip `7a0706df` (the Architect's `architect/engine-and-seats` branch). Ernie's probe extract was taken from that tip. If your extract differs, say which commit you measured and whether the baseline below reproduces on it.

## What Ernie claims — verify each of these

### 0. Baseline (no overrides). Ernie and MUSE both say this reproduces exactly on the tip.

- Synthetic gap: 4-3 loses 2500, 3-4 loses 1800, gap 700.
- Real-roster bias: mean +1145, split 28/3/1 (3 clubs better in 3-4). Flexed 147/2048, emergencies 0.
- Gap condition: DT class weakened to ≤70 → mean −95, 17/32 clubs better in 3-4. LB class raised to 85 → mean −1566, 32/32 clubs. Both → −2773, 32/32 clubs.

### 1. EDGE→ILB at 0 (one rule, 6 → 0, runtime override). Ernie says:

- **The synthetic gap closes to exactly 0** (4-3 loses 1800 in 3-4, 3-4 loses 1800 in 4-3).
- **The real-roster bias is cut from +1145 to +469** — the largest structural improvement measured in this round.
- **Flexing goes DOWN, not up:** 147 → 127. Emergencies 0.
- The gap condition is preserved and strengthened: with a weak DT class the 3-4 advantage deepens from −95 to −369 (still 17/32 clubs); with a strong LB corps all 32 clubs are better in a 3-4, unchanged.
- At 2 (the compromise): gap 600, bias +865, flexed 150, scenario −195. At 4: gap 700, bias +1068, flexed 148, scenario −111.

### 2. The combination: EDGE→ILB=0 + EDGE→DT=2 (two rules, runtime override). Ernie says:

- **Gap 0, bias +334 (a 71% cut from +1145), and eleven clubs — not three — now genuinely better in a 3-4**, with flexing down (147 → 130).
- Verify this combination specifically: it is the best result of the round if it reproduces.

### 3. The side effect. Ernie says:

- At EDGE→ILB=0, a 4-3 can also put an EDGE at MIKE for free, because the table keys on the destination (ILB), not the slot (DT2). Counted across the league: 4-3 clubs fielding an EDGE at an ILB spot go from 0 today to 4 (for example Myles Murphy, Donovan Ezeiruaku, Cameron Jordan at MIKE); 3-4 clubs go from 2 to 28. The intended effect is large (an edge rusher becomes a 3-4 inside-backer) and the side effect is small but real.
- **The structural finding:** the Owner's ask ("EDGE to DT2") is **not expressible in the current flex table**, because the table has no slot-level entries. Pricing EDGE→ILB necessarily also prices EDGE→MIKE and EDGE→WILL. A true slot-level rule (EDGE may play the DT2 slot only) would need an Architect-side change to the flex shape, not a table edit. That is why the side effect exists at all.
- Ernie's falsifier: if "better in 3-4" is meant club-by-club rather than on average, EDGE→ILB=0 alone leaves the split at 3/32 — the mean moves but no club flips. The clubs that would flip are the ones near zero (Indianapolis +150, Arizona 0). Check those two clubs specifically.

## What to do

1. Re-run the baseline (section 0) on the tip and confirm it reproduces. If it does not, stop and say so — everything else depends on it.
2. Re-run sections 1, 2, and 3. For each claim, report VERIFIED (your number matches Ernie's within ±10 units) or CONTESTED (your number differs, with the number you got). Count the EDGE-at-MIKE cases yourself; name the players and clubs.
3. Answer the two judgment questions, each in one paragraph with your reasoning:
   (a) Is EDGE→ILB=0 a principled change — the faithful expression of the Owner's "EDGE to DT2" ask — or is it an ad hoc re-pricing of the kind the Owner rejected on 2026-11-16? Say which, and why.
   (b) Is the side effect (4 edges at MIKE in a 4-3) acceptable, or does it need the slot-level Architect change Ernie names before this can land? If the slot-level change is the right answer, say what it would look like (one paragraph, no code required).
4. If you find a discrepancy, trace it: is it a different engine commit, a different pool, a different scenario definition, or a genuine arithmetic error in Ernie's probe? Say which.
5. File your verification in your inbox as `_agents/<seat>/inbox/<date>-<seat>-P-333-verify-ernie-edge-ilb.md`, with FOR: P-333. Push after every finished file, not just at session end — commit and push after each filing so a timed-out chat does not lose the work.

## A note on the work itself

You are checking arithmetic, method, and two judgment questions — not re-deciding the flex table. If Ernie's numbers reproduce, say so and say how you ran them. If they do not, the discrepancy is the deliverable. And as you work, if you notice a cleaner way to express "EDGE to DT2" — a slot-level rule, a different price, a measurement Ernie missed — file that as a short note in the same filing. The Owner reads the verification; a good idea filed alongside it is welcome, but it does not replace the verification.
