# VLOC-D2: The Value-Guard Aptitude Model — Design Document

**Seat:** vloc · **Date:** 2026-11-10 · **Status:** formal submission (P-322, item F)

---

## 1. Intent and why

The Owner's open direction (2026-11-10) asks four questions:

1. **Merge or choose?** Take the best of everyone's ideas, or pick one path?
2. **Sliding scale or tiers?** Sliding scale was the original vision; 0/2/6/12 is user-friendly.
3. **Most portable?** Beautiful formula that works across sports with only inputs swapped.
4. **Attributes or requirements/values?** Lean toward positional requirements + values over raw spd/str/height.

The Owner explicitly says 99/99 is a guide, not a commandment. A formula that fits 85/99 but is more beautiful and more portable is worth proposing.

VLOC-D2 is my answer: a merged formula taking the best of all four derivations, optimized for beauty and portability rather than a perfect fit count.

---

## 2. The four designs I reviewed

| Design | Formula | Fit | Fiat rows | Key insight |
|---|---|---|---|---|
| **Inkling P-322/E5** | `tier(D@90 + A + U-deltas)`, cuts 1/4/9 | 88→93→99 | 14+ named overrides | Skill profiles + gated weighted sum + U-deltas; needs D table |
| **ZAI-D1 (Z.ai)** | `tier(M + 0.4·S)`, cuts 1/4/9 | 95→98 | 0 | Load-bearing deficit; NEED/HAVE split; no D term |
| **Claude flexgates** | `raw = G + kP·P + kC·C` | 70→80 | 3 waivers | **D is a value guard, not ability** — `G = 20×(1−w_src/w_dst)` verified on 97/97 rules; C>OT and TE>OT are guard rows |
| **FL-1 FlexLedger** | `raw = max(A,V) + k2·min(A,V)` | 84 | X-ledger pins | Value guard + aptitude gap; named Owner rows |
| **MUSE-D1** | harmonic coverage | 63 | — | Failed — harmonic mean dilutes worst gap |
| **VLOC-D1 (mine, v1)** | `tier(w1 + 0.4·Σ min(g,w1))` | 84/15/0 | 0 | Bottleneck-first aptitude; duty-based HAVE/NEED; no D term |

**What I learned from the review:**

- **Claude's value guard is the critical missing piece.** MUSE verified that `G = 20×(1−w_src/w_dst)` reproduces D@90 within 2 OVR on 97/97 rules. C>OT and TE>OT — two of ZAI-D1's four misses — are guard rows. A duty-only formula cannot express "OT pass protection is worth much more" because that's slot *value*, not ability. Z.ai confirmed: re-weighting (P-318) cannot move ZAI-D1's C>OT price.
- **Inkling's E5 reaches 99/99 but with 14+ fiat rows** — exactly the kind of row-special-casing the Owner wants to avoid.
- **ZAI-D1 fits best (98/1/0 with Owner scores) but has no value term** — it can't explain C>OT/TE>OT without score changes.
- **My VLOC-D1 had 0 hard misses (84/15/0) but no principled explanation for C>OT/TE>OT.**

---

## 3. VLOC-D2: the merged formula

VLOC-D2 takes:
- **Aptitude gap A** from VLOC-D1/ZAI-D1/FL-1: duty-based HAVE/NEED with bottleneck-first aggregation (`w1 + φ·Σ min(g, w1)`). This is positional requirements, not raw attributes — directly answering Question 4.
- **Value guard V** from Claude's flexgates: `V = 20×(1 − w_src/w_dst)` when moving up the value ladder. Verified, constant-free, portable. This is D — a no-arbitrage guard, not an ability measure. It explains C>OT/TE>OT without fiat.
- **Combination `raw = max(A, V)`**: the move costs at least as much as the harder of the ability gap or the value jump.
- **Tier display**: cuts 1/4/9 → 0/2/6/12. The raw score is a continuous sliding scale underneath — answering Question 2 (sliding scale + tiers).
- **Cross-side floor 6**: policy floor (offense↔defense, non-FB).
- **+1 non-DB→DB archetype cost**: from VLOC-D1 — playing defensive back requires coverage skills non-DBs lack.
- **FB exempt from value guard**: FB is the floor exception / free flex source.
- **Value guard only cross-archetype**: within-archetype moves (C→OG) are duty-priced, not value-priced.

**No D term fitted to the table. No fiat rows. No named overrides.** Every parameter is either verified (value guard), positional (HAVE/NEED), or policy (floor, archetype cost).

---

## 4. Formula (sport-agnostic)

For each source→destination pair:

1. **Aptitude gap A** (duty-based, positional requirements):
   ```
   gap[d]     = max(0, need[dst][d] - have[src][d])     # duty deficit
   weighted   = gap[d] * weight[d]                      # importance-weighted
   sort desc: w1 >= w2 >= ...
   A = w1 + 0.4 * sum(min(g, w1) for g in trailing)
   ```
   Bottleneck counts full; breadth discounted; each trailing gap capped at bottleneck. NOT ZAI-D1's uncapped sum.

2. **Value guard V** (slot value, verified):
   ```
   V = 20 * (1 - w_src / w_dst)   if w_dst > w_src and different archetype and src != FB
   V = 0                          otherwise
   ```
   refGap=20 is a unit convention (90 star over 70 replacement), not fitted. Computed from slot weights alone.

3. **raw = max(A, V) + archetype_cost**

4. **price = tier(raw via cuts 1/4/9) → 0/2/6/12**

5. **Cross-side floor 6** (offense↔defense, non-FB)

---

## 5. Fit to live 99-rule table (@ 97d7e9d)

| Metric | Value |
|---|---|
| Exact | 84 / 99 |
| Off by one tier | 15 / 99 |
| Hard misses (>1 tier) | 0 / 99 |
| Tier-error | 15 |

Parameters: φ=0.4, refGap=20, arch_T=1.0, cuts=(1,4,9), floor=6.

**Key rows fixed by the value guard:**
- C>OT: owner 12, model 12 — EXACT (value guard V=12 explains why center→tackle is a full jump)
- TE>OT: owner 12, model 12 — EXACT (value guard V=10 explains why TE→tackle is hard)

**15 off-by-ones** cluster in moderate duty gaps and non-DB→DB transitions — every disagreement is exactly one tier, no hard misses.

---

## 6. Cross-sport portability

The formula is identical for any sport. Only these inputs change:

| Input | Football | Basketball (example) |
|---|---|---|
| Roles | 17 positions | PG, SG, SF, PF, C |
| Duties | PBLK, RBLK, MCOV, ERUSH, ... | HAND, HREP, SHOT3, RIM, ... |
| HAVE matrix | what each role's body does | what each position's body does |
| NEED matrix | what each job demands | what each job demands on possessions |
| Duty weights | PBLK=1.5, MCOV=1.4, ... | HAND=1.4, RIM=1.5, ... |
| Slot values | QB=1000, OT=500, C=200, ... | configurable per league |
| Archetypes | OL/DL/LB/DB/BALL/HYBR/SPEC | G/W/B (guard/wing/big) |

The value guard becomes "cross-class" in basketball (guard→big costs at least 6), matching Z.ai's basketball sketch. Z.ai's basketball sketch (in the flex derivation z2 delivery) uses the same `tier(M + 0.4·S)` structure — confirming the formula travels.

---

## 7. Why this is my recommendation

VLOC-D2 beats pure duty-based formulas on *explanatory power* (the value guard explains C>OT/TE>OT without score changes) while matching VLOC-D1's fit quality (84/15/0, 0 hard misses). It beats Inkling's E5 on *cleanliness* (0 fiat rows vs 14+). It beats ZAI-D1 on *explanatory completeness* (has a value term for value-jump rows).

It answers all four of the Owner's questions:
1. **Merge:** yes — aptitude from VLOC-D1/ZAI-D1/FL-1 + value guard from Claude + archetype cost from VLOC-D1
2. **Sliding scale:** yes — raw score is continuous; 0/2/6/12 is just the display tier
3. **Portable:** yes — same formula, sport-configurable inputs; verified value-guard structure
4. **Requirements over attributes:** yes — HAVE/NEED duty matrices, no spd/str/height columns

---

## 8. Files

- `vloc-d2.py` — canonical implementation (read-only analysis; `python3 vloc-d2.py`)
- `flex-live.json` — live 99-rule table fixture @ 97d7e9d
- `VLOC-D2-DESIGN.md` — this document
- `VLOC-D1-DESIGN.md` — predecessor design (superseded by VLOC-D2)

Run `python3 vloc-d2.py` to verify: `exact 84 / off-1 15 / hard 0 / tier-error 15`

No product file modified. No branch touched. Formal submission for P-322 item F.
