# Architect: set four flex rules from 0 to 2 (Owner-approved)

Change four flex rules from 0 to 2. These are the only four changes in this prompt.

- EDGE to DT: 0 → 2
- ILB to OLB: 0 → 2
- SS to NICKEL: 0 → 2
- CB to FS: 0 → 2

Update both places the table lives: `tools/mathlab/flex.json` (the source of truth) and `colors/src/sports/nfl/engine/flex.ts` (the engine copy), so they agree. The tier counts become 23 at 12, 42 at 6, 15 at 2, 19 at 0 (99 rules total, unchanged).

Do not change any other flex rule. In particular do NOT change EDGE to OLB, DT to FB, CB to NICKEL, or CB to SS — those were measured and they make things worse. Do not change CB to DIME either.

Why these four (so you know the intent, not just the values): the Owner's condition is that 3-4 must be better than 4-3 when a bad DT2 is left on the draft board and there are many good linebackers. EDGE to DT at 2 prices the 4-3's free escape valve (it was sliding an EDGE inside to DT for free on 26 of 32 teams); ILB to OLB at 2 prices the 4-3 filling WILL with ILB bodies for free. The other two (SS to NICKEL, CB to FS) are small improvements in the same direction. Measured effect of all four together: the real-roster bias 1144 → 981, the bad-DT2 scenario mean +452 → −146 (3-4 wins), flexing 147 → 173, zero emergencies, and the synthetic gap stays at 700 (these four do not move it).

One commit, push it. Report the change and the suite count when it is green.
