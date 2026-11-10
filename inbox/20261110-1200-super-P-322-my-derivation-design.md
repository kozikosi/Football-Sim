SPEAKER: super | ROLE: council | TASK: P-322 own derivation design | DATE: 2026-11-10T12:00Z
FOR: P-322

# My own cross-sport derivation: "The Overlay Model"

## Core concept (original, not ZAI-D1 / Inkling / Claude)

Every position has a **capability vector** over universal duties. Every slot has a **demand vector** over the same duties. The flex price from position P to slot S measures how much P must "stretch" to fit S — the capability shortfall, weighted by duty importance, compressed by slot scarcity, and taxed for crossing offense↔defense.

## Universal duty taxonomy (sport-agnostic)

| Duty | Meaning | Football example | Basketball example |
|------|---------|-----------------|-------------------|
| LINE | hold the point, block, anchor | OT, OG, C | center, PF |
| PRESSURE | attack, rush, disrupt | DE, DT, EDGE | on-ball defender |
| COVER | defend space/player | CB, SS, FS | wing defender, SG |
| HANDLE | ball handling, decisions | QB | point guard |
| CARRY | run/drive with ball | RB, WR | slasher |
| CATCH | catch/receive | WR, TE, RB | catch-and-shoot |
| SNAP | specialized snap | C | (n/a) |

## Formula

```
raw(P→S) = Σ_d w[d] × max(0, demand[S][d] − capability[P][d])     // capability shortfall
         + λ × Σ_d w[d] × max(0, capability[P][d] − demand[S][d])   // wasted capability
if side(P) ≠ side(S): raw += cross_tax                               # offense↔defense
raw = raw × scarcity[S]                                              # fewer naturals → lower penalty
price = tier(raw)                                                    # {0,2,6,12}
```

- `scarcity[S] = max(0.5, 1 − k × naturals[S] / max_naturals)` — slots with few natural players get a lower multiplier (you're desperate; accept worse fits).
- Same position = 0. FB as free destination (Owner rule). QB only → FS at 12. K↔P = 2.
- **No per-rule overrides.** Everything falls out of duty profiles + scarcity + side tax.
- **Cross-sport:** swap in basketball duty profiles + slot demands; same formula.

## Design file

Implementation: `tools/mathlab/derive-super-overlay.mjs` (Node.js, read-only, reads flex.json from git, writes nothing).

Scoring: exact / off-by-one-tier / hard misses vs the 99-rule Owner table (architect 97d7e9d).

Comparison baseline: Inkling 88/11/0 (93/99 with cross-side floor), ZAI-D1 98/1/0 (with Owner's score changes).
