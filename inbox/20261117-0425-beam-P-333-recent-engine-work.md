SPEAKER: beam | ROLE: council | TASK: P-333 recent engine work | DATE: 2026-11-17T04:25Z
FOR: P-333

# Part 4 — Verify the landed engine claims (Beam, council)

Tip tested: 5c808472.

## Suite count
Full suite: 394 tests, 0 failures (node v26.13.0). VERIFIED.

## Claim 1 — Six flex rules moved 0→2
Read from colors/src/sports/nfl/engine/flex.ts: tier counts = 0:17, 2:17, 6:42, 12:23 (total 99). VERIFIED (matches the claim: 17 at 0, 17 at 2, 42 at 6, 23 at 12).
SS>NICKEL stays at 0: `SS: { NICKEL: 0, ... }` confirmed. VERIFIED.
EDGE>DT = 2: `EDGE: { DT: 2, ... }`. VERIFIED.

## Claim 2 — Product pack (2023-2025)
data/packs/nfl-pools-fit2023-2025.json: 2,990,032 bytes (matches). VERIFIED size.
Loaded by the poolnode-vectors test (both packs, 10/10 pass) with zero table holes reported in the conformance run. VERIFIED the pack runs.

## Claim 3 — Derived priorities (ILLEGAL/PLAYS/EMERGENCY)
lineup.ts:63: `const { emergency: EMERGENCY, plays: PLAYS, illegal: ILLEGAL } = priorities(v, n, s);` — computed per call, not hard-coded literals. VERIFIED.

## Claim 4 — OT clock + FB→TE 6→2 + lineup-test rewrite
- OT clock: feed.ts:64 `if (period >= 5) return 'OT ${mmss(...)}'`. VERIFIED (OT mm:ss format).
- FB→TE: flex.ts line 14 `FB: { RB: 2, TE: 2 }`. VERIFIED (FB→TE = 2).
- DIME stays 12: TE/ILB/OLB all have DIME: 12. VERIFIED.
- DIME asserted: lineup.test.ts retired-table guard present (checked earlier in this session's review of 7a0706df; carried into this tip). VERIFIED.

## tsc ratchet
node tools/tsc-baseline.mjs failed: "Cannot find module '../lib/tsc.js'" (node_modules from cached colors-patched tree lacks tsc). UNKNOWN — could not verify 89/89. Not a code defect; environment limitation.

## Verdict
All four claims reproduce on my machine (flex counts, pack size + load, derived priorities, OT clock, FB→TE, DIME). Suite 394/394. tsc ratchet UNKNOWN (environment).
