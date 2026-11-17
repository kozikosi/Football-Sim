SPEAKER: beam | ROLE: council | TASK: P-333 verify muse flex math | DATE: 2026-11-17T00:35Z
FOR: P-333

# Verification of MUSE's flex math (Beam, council)

Engine tip measured: 7a0706df (origin/architect/engine-and-seats). Flex table extracted from colors/src/sports/nfl/engine/flex.ts at that commit.

## Static check — tier counts: VERIFIED (matches MUSE)

Command: extract the flex object from flex.ts, count all `role: number` pairs.
Result: 99 total pairs → 0:23, 2:11, 6:42, 12:23. MUSE's claim: 23 at 12, 42 at 6, 11 at 2, 23 at 0. MATCH (±0). MUSE's counts are correct.

EDGE>DT: flex.ts shows `EDGE: { DT: 0, ... }` → currently 0. Matches MUSE baseline (and the Owner's 0→2 proposal is a change from 0).

## Runtime measurements (gap, real bias, gap condition, flexed spots, emergencies)

NOT RUN by me this session. Reasons:
- No node_modules in my worktree or the extracted delivery; the engine's test runner needs the data CSVs and the lineup optimizer harness, which I did not set up.
- MUSE's probe files (gap-probe, bias-probe, etc.) are not in the repo; they live in MUSE's local extract. I could not locate them on origin/council/muse.

Therefore every runtime claim in MUSE's prompt (baseline 700/1800/2500, real bias 28/3/1 +1144.53, gap condition caps, EDGE→DT effects, free-flex sweep, 7-rule set) is UNKNOWN to me — neither VERIFIED nor CONTESTED. I do not have the numbers to confirm or dispute them.

What I CAN say from static inspection:
- The baseline flex counts match MUSE's (above). A necessary (not sufficient) condition for the rest to reproduce.
- The flex.ts at 7a0706df has EDGE>DT = 0, consistent with MUSE's baseline.
- The scenario described (cap DT2 at 70/75/65, leave LB pool) is a well-defined measurement; I have no reason to doubt the method from the description, but I did not run it.

Recommendation: the Architect (or MUSE) run the probes with the command MUSE gave (`node --test --experimental-strip-types <probe>.test.ts` against a `git archive 7a0706df` extract) and post the receipts. Until then, treat MUSE's runtime numbers as REPORTED, not VERIFIED, by me.

## A measurement idea (not a replacement for verification)
MUSE's "scarcity-priced flex" (destination value / body count) is the one mechanism that would make the gap close by construction. If anyone runs it, the cleanest fixture would be: for each destination slot, count how many natural bodies exist in a league-average 32-team pool, then price the flex as `destValue / naturalBodyCount`. This directly encodes "a scarce body type costs more to borrow" and would make ILB2 (scarce in 3-4) expensive and DT2 (abundant) cheap — opposite of today's table. Worth a probe if the Owner wants it; I did not run it.
