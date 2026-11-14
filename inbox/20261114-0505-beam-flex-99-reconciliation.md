SPEAKER: beam | ROLE: council | TASK: council-assignment Phase D — flex-99 reconciliation | DATE: 2026-11-14T05:05Z

## D1 — Tag-dispatching conflicts (slot outcomes vs flex consequences)

Live table at HEAD (origin/architect/engine-and-seats:tools/mathlab/flex.json, 99 rules). Computed from the file:

| Source position | Flex destinations (count) |
|---|---|
| TE | 14 |
| EDGE | 11 |
| ILB | 9 |
| OLB | 9 |
| SS | 9 |
| DT | 5 |
| OG | 5 |
| OT | 5 |
| RB | 5 |
| CB | 5 |
| WR | 7 |
| C | 4 |
| FS | 6 |
| FB | 2 |
| QB | 1 |
| K | 1 |
| P | 1 |

Total: 99 rules. TE has the most flex destinations (14), reflecting its multi-role nature. QB has only 1 (FS, at -12). The "tag-dispatching" question (which slot a player's tag routes to) is not a property of the flex table alone — it depends on slots.ts NATURAL_SLOT_MAP and lineup.ts destination resolution. The flex table only prices moves; it doesn't dispatch tags. VERIFIED: counts computed from flex.json. INFERRED: tag dispatch lives in slots.ts/lineup.ts, not flex.json.

## D2 — SS-vs-ILB same-side inconsistencies

From the live flex.json:
- SS → ILB: 6, SS → OLB: 2 (SS flexes to ILB at -6 but to OLB at -2)
- ILB → SS: 2, OLB → SS: 6 (ILB flexes to SS at -2 but OLB flexes to SS at -6)

These are the two inconsistencies flagged in AGENTS.md. Same-side (defense→defense), so the cross-side floor rule (-6) does not apply. The asymmetry: SS is "cheaper" to flex to OLB (2) than to ILB (6), while ILB is "cheaper" to flex to SS (2) than OLB is (6). This is an Owner decision — no council member should resolve it. Flagged for ruling.

## D3 — OWN-NEXT-ONE rule

Searched the entire repository (all file types) for "OWN-NEXT-ONE", "own_next", "own.next" — zero matches. The rule is not documented or shipped anywhere. It appears to be a proposed/aspirational invariant that was never implemented. The formula (price(source, target) + price(source, your_own_next) <= price(own_next_pair)) cannot be verified against the live table because the rule itself is not defined in any file. VERIFIED: no references found. UNKNOWN: whether this rule was ever intended to be enforced or is purely aspirational. Recommendation: Owner to either define and adopt it, or drop it.
