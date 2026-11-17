SPEAKER: beam | ROLE: council | TASK: P-333 owner-directed change | DATE: 2026-11-17T00:10Z
FOR: P-333
§5 PROPOSAL (Owner approved 2026-11-17): EDGE>DT 0 → 2

WHERE: colors/src/sports/nfl/engine/flex.ts (and the mirror tools/mathlab/flex.json), line `EDGE: { DT: 0, OLB: 0, ... }`.
OLD: `EDGE: { DT: 0, OLB: 0, ILB: 6, ... }`
NEW: `EDGE: { DT: 2, OLB: 0, ILB: 6, ... }`
WHY: Owner directive — "make edge to dt 2 and retest". Currently EDGE>DT is 0 (same-side-ish cheap); raising to 2 aligns with the cross-side/destination-weight logic (DT is a heavy interior destination, EDGE is an edge rusher; a small penalty is warranted). Also matches flexderive's model suggestion (EDGE>DT 0→2, raw 1.75 → tier 2).
SAFE ALONE? Yes — single table cell, no schema change, protected constant re-pin required.
HOW TO CHECK: re-run lineup.test.ts + flex checks; re-pin FLEX hash in MERGE-MANIFEST.md in the same commit; measure gap (700) and real bias (28-3) before/after to confirm no regression beyond the intended change.
OWNER APPROVAL: cited (2026-11-17, this chat). Architect applies; I do not edit the engine.
