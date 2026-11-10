# VLOC-D1: The Role-Adjacency Deficit Model — Design Document

**Seat:** vloc · **Date:** 2026-11-10 · **Status:** proposed (item F of council prompt 2026-11-10: "Design your own derivation")

---

## 1. Intent and why

The flex table prices, for every ordered position pair (source → destination), how hard it is for a player at the source position to play the destination position. Tiers are 0 / 2 / 6 / 12 with cuts at raw 1 / 4 / 9. The live table has 99 rules (23 at 0, 10 at 2, 43 at 6, 23 at 12).

The Owner wants a derivation that is:
- **Generalizable across sports** — the same formula should work for basketball (PG/SG/SF/PF/C) and any other sport, with only the roles/duties/inputs changing.
- **Free of fiat rows** — no hand-tuned exceptions, no named overrides, no "special case this one rule."
- **Principled** — every parameter is a football-reasonable value (a duty weight, a have/need score), not a curve-fit.

ZAI-D1 (Z.ai's "load-bearing deficit") and Inkling's P-322 both exist. This is my own, independent design: **VLOC-D1**.

---

## 2. Core idea

The cost of playing destination D from source S is driven by **how much of D's job S cannot do**, measured duty-by-duty, then aggregated into a single raw score and mapped to a tier.

For each duty d:
- **gap[d] = max(0, need[D][d] − have[S][d])** — the capability deficit, duty-weighted.
- **weighted[d] = gap[d] × weight[d]** — importance-weighted deficit.

The raw score aggregates the weighted deficits. Then a tier cut maps raw → {0, 2, 6, 12}, with a cross-side floor of 6.

Two features distinguish VLOC-D1 from other derivations:

### A. Aggregation: bottleneck-first, breadth-discounted, bottleneck-capped

**raw = w₁ + φ × Σ min(g, w₁)** for gaps g sorted descending (w₁ = largest, rest = trailing).

- The largest gap (the bottleneck) counts in full.
- Every trailing gap counts at a discount (φ = 0.4), but **each trailing gap is capped at the bottleneck size** w₁.
- This means: one huge gap can't be overwhelmed by many tiny ones (unlike a pure sum), but breadth still adds cost up to a point (unlike a pure max).

This is *not* ZAI-D1's M + λ·S (which sums all trailing deficits uncapped), and *not* Inkling's gated weighted sum with named U-deltas.

### B. Archetype transition cost: +1 for non-DB → DB

When a non-defensive-back source plays a defensive-back destination (SS, FS, CB, NICKEL, DIME) and there is a non-zero duty gap, add +1 to raw. Playing defensive back requires coverage skills (deep range, man coverage, zone recognition) that non-DBs fundamentally lack — the duty model alone under-prices LB/DL → DB because linebackers and defensive linemen have decent tackle/coverage scores on paper but can't play deep safety.

This is a *general rule*, not a row-specific fiat: it applies uniformly to all non-DB → DB transitions. Zero-gap transitions stay free (a player who can already do the job pays nothing).

---

## 3. Model inputs (football version)

### Roles (17)
QB, RB, FB, WR, TE, OT, OG, C, DT, EDGE, ILB, OLB, SS, FS, CB, K, P

### Role archetypes (documented, used only for the +1 rule)
- OL: OT, OG, C | DL: DT, EDGE | LB: ILB, OLB | DB: SS, FS, CB | BALL: QB, RB, WR | HYBR: TE, FB | SPEC: K, P
- DIME, NICKEL: DB sub-packages (destinations only)

### Duties (16)
PBLK, RBLK, SNP, CTH, RTE, CARRY, THR, MCOV, ZCOV, RNG, ERUSH, BRUSH, RDEF, TKL, KCK, PNT

MCOV/ZCOV split coverage into man vs zone; ERUSH/BRUSH split rush into edge vs interior/blitz. This captures key asymmetries: OLB can blitz (BRUSH) but not edge-rush (ERUSH); EDGE edge-rushes but covers poorly in space (MCOV).

### Scope filters (destination-driven)
- THR only matters when destination = QB
- KCK only when destination = K
- PNT only when destination = P

This is what makes the model asymmetric: TE → OT is hard (OT needs elite pass protection) while OT → TE is easier (TE needs catching, OT can't catch well).

---

## 4. Cross-sport generalization

The formula is identical for any sport. Only the role list, duty list, HAVE matrix, NEED matrix, and weights change. For basketball:

- **Roles:** PG, SG, SF, PF, C
- **Duties (example):** ball handling, 3pt shooting, rim protection, interior defense, rebounding, passing, drive/scoring, screening
- **HAVE:** what each position's body/skill naturally does (0–10)
- **NEED:** what each destination job demands on its possessions

Same aggregation, same tier cuts, same floor logic. The model is sport-agnostic by construction.

---

## 5. Fit to the live 99-rule table

**Parameters:** φ = 0.4, archetype penalty = +1, cuts 1/4/9, tiers 0/2/6/12, floor 6.

| Metric | Value |
|---|---|
| Exact | 84 / 99 |
| Off by one tier | 15 / 99 |
| Hard misses (>1 tier) | 0 / 99 |
| Tier-error (sum of tier steps) | 15 |

Every disagreement is exactly one tier — there are no hard misses. The 15 off-by-ones cluster in a few areas:

| Pattern | Count | Example |
|---|---|---|
| Model 2, owner 6 | 8 | EDGE→ILB, EDGE→NICKEL, FS→DIME, FS→OLB, OLB→ILB, OLB→NICKEL, OLB→OLB, SS→CB |
| Model 6, owner 12 | 5 | EDGE→SS, ILB→FS, OLB→DIME, OLB→FS, TE→SS |
| Model 2, owner 0 | 2 | CB→FS, OLB→OLB |

The "model 6, owner 12" cases are all non-DB → DB transitions where the +1 penalty isn't quite enough to push raw over the 9 cut. The "model 2, owner 6" cases are moderate duty gaps that sit just below the raw-4 cut.

No case is missed by more than one tier, and no rule requires a fiat override.

---

## 6. Files

- `vloc-d1.py` — canonical implementation (read-only analysis; writes no product file, touches no branch)
- `flex-live.json` — fixture: live 99-rule table at commit 97d7e9d
- `VLOC-D1-DESIGN.md` — this document

---

## 7. What's left / open questions

1. **The 15 off-by-ones** are concentrated in non-DB → DB transitions and moderate duty gaps. A small φ adjustment or a slightly larger archetype penalty (+1.5) might pick up a few exact matches without creating hard misses. Not yet tried.
2. **Duty granularity:** MCOV/ZCOV and ERUSH/BRUSH splits help but some boundaries (ILB → SS = 2 vs ILB → FS = 12) remain hard to capture with duty values alone because both destinations need similar coverage/tackle.
3. **Basketball instantiation:** the model is ready for basketball; only the role/duty/HAVE/NEED inputs need to be authored. Not built yet (per Owner: basketball waits for 76 Pancakes).

---

## 8. Verification

Run `python3 vloc-d1.py` in this worktree. It loads `flex-live.json` (the live 99-rule table @ 97d7e9d) and prints exact/off-by-one/hard/tier-error plus every residual with owner value, model value, and raw score.

No product file is modified. No branch is touched. This is a proposal for the Architect to consider alongside ZAI-D1 and Inkling's P-322.
