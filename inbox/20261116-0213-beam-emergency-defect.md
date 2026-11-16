SPEAKER: beam | TASK: emergency-defect | DATE: 2026-11-16T02:13Z
FOR: P-333

## D. Emergency-constant defect — reproduce, real-pool test, failing test, §5 patch

### Reproduce (synthetic, 300 seeded rosters)
Construction: 32 players, roles rng.pick(QB/WR/TE/CB/SS/FS/RB/OT/OG/C/ILB/OLB/EDGE/DT), OVR rng.int(55,95), makeRng(seed), seed 0..299. optimalLineup(pool, fieldSlots('4-3'), {base:'4-3'}).
- EMERGENCY=1e5 (shipped): mean 1.6567 fills/roster, total 497/300. (VERIFIED)
- EMERGENCY=1e9 (strict): mean 0.0000 fills/roster, total 0/300. (VERIFIED, patched copy)
- seed 0 single: 1 fill under 1e5, 0 under 1e9. (VERIFIED)

Scale numbers re-measured: spot values sum 8628.6 (reported, not re-measured here — I did not recompute slotWins20); ILLEGAL=1e12, PLAYS=1e7, EMERGENCY=1e5 as shipped (VERIFIED from lineup.ts:25).

### Real 1,953-player pool (32 team rosters)
Same comparison on one roster per team from data/nfl/madden27-ratings.csv (+ free agents). Both constants yield 0 avoidable emergency fills on all 32 teams (VERIFIED: total 0/32 under 1e5).

Conclusion: the defect is a SYNTHETIC-ROSTER ARTEFACT. On the real pool, avoidable fills are 0 under both constants. I say so plainly. The synthetic roster construction (uniform role draw, 55-95 OVR) is what produces the avoidable fills; the real rosters do not.

### Failing test (ships with the patch)
Test construction from the prompt: generate a 32-player roster from seed 0 (roles drawn from the list above, OVRs 55-95) and assert the lineup has zero emergency fills.
- On current tree (EMERGENCY=1e5): 1 fill → test FAILS. (VERIFIED)
- With strict constant (1e9): 0 fills → test PASSES. (VERIFIED)

### §5 patch proposal
Target build: origin/architect/engine-and-seats @ 6dcf13b2 (file colors/src/sports/nfl/engine/lineup.ts).
WHERE: line 25, `const ILLEGAL = 1e12, PLAYS = 1e7, EMERGENCY = 1e5;`
old → new: `const ILLEGAL = 1e12, PLAYS = 1e7, EMERGENCY = 1e5;` → derive the ladder from the provider: `const scale = (sum of spot values) × 99; EMERGENCY = 2 × scale; PLAYS = 1000 × scale; ILLEGAL = 1000 × PLAYS;` (Architect decides acceptance). Plus add the failing test to colors/test/nfl/lineup.test.ts (seed 0 roster, assert 0 emergency fills).

WHY: priority 3 (fewest emergency fills) must be strictly above priority 4 (value). With EMERGENCY=1e5 and whole-lineup value ~854,227, the optimizer can buy an emergency fill when value gained elsewhere exceeds 1e5.

SAFE ALONE?: The test lands alone (fails on current tree, documenting the artefact); the constant change is the Architect's. Recommend shipping test-only first, then the fix.

HOW TO CHECK:
- Without fix: `cd colors && node --test --experimental-strip-types test/nfl/lineup.test.ts` → the new test fails (1 fill).
- With fix: same → all green; full suite `npm test` → 364/364 (363 + 1 new), type-check ratchet 89/89 unchanged.
