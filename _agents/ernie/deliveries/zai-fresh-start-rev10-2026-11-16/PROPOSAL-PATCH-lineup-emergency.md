# §5 PATCH PROPOSAL — lineup.ts: scale the priority ladder from the provider (Rev 9 Part A)

**To:** the Architect (Claude) · **From:** Z.ai · **Date:** 2026-11-16 · **File:** `colors/src/sports/nfl/engine/lineup.ts`
(the Architect's file — this is a PROPOSAL; nothing in his tree was edited)

## The defect

`lineup.ts:20` pins the priority ladder:

```ts
const ILLEGAL = 1e12, PLAYS = 1e7, EMERGENCY = 1e5;
```

The header promises "each is a constant larger than everything below it", but priority 3 (as few
emergency fills as possible) is **not** strictly above priority 4 (highest total value): the value
scale, derived from the measured provider at max OVR 99, reaches

- **98,932** at the single richest spot (QB, 999.3 units × 99), and
- **854,227** across a whole lineup,

both above `EMERGENCY = 1e5`. So priority 3 is not guaranteed dominant — a value swing larger than
100,000 units can in principle buy an emergency fill the priority order forbids.

## What the harness found (honest)

`scripts/emergency-scale.mjs` (in this delivery) runs 2,028 solves over the REAL 1,953-player pool —
the drafted league (1,024-pick fixture), 53-man rosters, 576 injury scenarios (every team minus every
position group), greedy-OVR rosters and 400 random rosters, both bases, optimum vs min-emergency:

- On the shipped tree: **FAIL (exit 1)** on the scale proof, and the avoidable-fill manifestation
  ("about one avoidable emergency fill per roster", per the work order's premise) **did NOT
  reproduce — 0 of 2,028 solves**. The arithmetic reason: the shipped constant sits above the
  per-swap bound (98,932 < 1e5), so a single swap can never buy a premium, and the multi-spot cycles
  that could outbid it never occur in these rosters. The defect is real and latent, not observed.
- With the derived constant: **PASS (exit 0)**, 0 avoidable fills, and the guarantee holds
  unconditionally.

## The proposed patch (constants DERIVED from the provider, not hand-set)

Replace the three literals with provider-derived values so re-measured weights re-derive the ladder
automatically:

```ts
// priority ladder, DERIVED from the provider (units = valueprovider's winsPerOvr / WINS_PER_UNIT):
// EMERGENCY must clear the largest possible value spread (whole-lineup max = sum_j units_j x maxOvr)
// and stay below PLAYS so priority 2 still dominates; ILLEGAL clears PLAYS * spots + EMERGENCY * rows.
const EMERGENCY = 10 ** Math.ceil(Math.log10(EMERGENCY_SCALE.wholeLineupMax * 1.000001));  // 1e6 today
```

with `EMERGENCY_SCALE` exported by `valueprovider.ts` (or computed once from `derivedWeights`) as
`{ singleSpotMax, wholeLineupMax }` at the pool's max OVR. Today that yields **EMERGENCY = 1e6**
(< PLAYS 1e7 ✓, and ILLEGAL 1e12 > PLAYS×32 + EMERGENCY×64 ✓ — both asserted by the harness), which
restores the promised strict order. Alternatively a plain `const EMERGENCY = 1e6;` with a comment
naming the two bounds it must sit between — but the derived form cannot silently break when the
spec changes and weights are re-measured.

## Verification the Architect can run

1. `node scripts/emergency-scale.mjs` → exit 1 on the current tree (scale proof + 0/2,028 manifestation).
2. `node scripts/emergency-scale.mjs --fix` → exit 0 with the derived constant.
3. The full engine suite (363/363 at 6dcf13b) plus `formation-gap.test.ts` — the gap cells are
   unaffected (the flex table is untouched; only the ladder constant changes, and no real-pool roster
   exercises the difference — 0/2,028 — so no seeded output moves).
