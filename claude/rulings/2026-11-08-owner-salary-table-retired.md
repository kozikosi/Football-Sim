# Owner ruling, 8 Nov 2026: the salary table is retired (reference only)

Source: Owner message in the Project chat, 8 Nov: "I confirm that the salary table is retired. the salary table is only to be used as a reference."

1. **Supersedes** `2026-11-06-owner-salary-weights.md` as a TARGET/DEFAULT: `tools/mathlab/salary-reference.json` stays as a reference, never a fit target or the default display. Settles the conflict flagged in `2026-11-08-muse-relay-model-first.md`.
2. **Default display is MEASURED** (Muse Q7): `measuredDisplayWeights()` in `colors/src/sports/nfl/engine/value.ts` (QB 1000, nearest 5). Witness verdict MEASURED (test in `colors/test/nfl/witness.test.ts`).
3. **Not changed in this slice:** `SLOTS[].weight`, `design.json`, the refitted specs, `flex.json` (engine inputs; changing them moves lineup/draft/seeded hashes). The measured curve is within 23.7 of them at the worst slot (DE1 +23.7, WR1 -17.6). Whether to refit the specs to the measured curve (or keep them as the engine's input) is OPEN for the Owner.
4. **Direction read** (Z.ai, 8 Nov; REPORTED): fit target was design@27Oct x 0.00254 (cfg.json, 29/29 slots), not the personal table; current specs fit the salary table (6cccf29); w79 display == salary table to 7 decimals (total absorption); the raw-curve witness is the load-bearing check. Q0 answer: design@27Oct's QB=1000 pin is engine-anchored (QB span 2.5414 wins), the 0.00254 unit is from the Architect's spec; its pre-git hand adjustments are not reconstructible from this workspace (UNKNOWN beyond that).
