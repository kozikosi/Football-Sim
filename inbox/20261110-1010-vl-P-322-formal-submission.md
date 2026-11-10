# VL — Formal Submission: Flex Derivation Working Derivation

SPEAKER: VL | ROLE: Council seat | TASK: Formal submission — choose/improve the flex derivation working derivation | DATE: 2026-11-10

## Summary (one paragraph)

Adopt **ZAI-D1 + the Owner's three score changes (EDGE CARRY 4, C PBLK 6 as a HAVE/NEED pair, TE PBLK 4)** as the working derivation: **98/99, tier-error 1, 0 fiat rows, only C>OT off by one** — independently verified by MUSE, Inkling, and VL from scratch against the live 99-rule table. Accept C>OT as a named principled residual (the center's hub-exit premium), not a fiat row. Do not force 99/99. Keep 99/99 as a sanity check only. The formula already computes a continuous sliding scale (raw M + λ·S) snapped to the user-friendly 0,2,6,12 display tier — exactly the dual-layer model the Owner described. Add Claude's verified value-guard term (D is a guard, not an ability measure) as a verified enhancement under ZAI-D1's duties, not as a replacement. Delete the SCOPE footgun. This is the most beautiful formula that is also the most portable: it generalizes to basketball (Z.ai's sketch, Inkling's port proof) without football constants.

## Why this recommendation changed from my earlier one

My earlier chat (before reviewing all seats) recommended Option 2 (sliding scale + tiered display, positional requirements). That direction is confirmed correct — and it is **already what ZAI-D1 implements**: continuous raw penalty snapped to tiers, built on NEED/HAVE positional requirements not arbitrary attributes. What changed is the **specific base model**: I now recommend ZAI-D1 over my abstract CS-MVM because four seats independently verified it against the live table, while CS-MVM remains a design sketch with zero measurement. The requirements/contribution model from my earlier message *is* ZAI-D1's NEED/HAVE structure — I was describing the same thing at a higher level of abstraction. I now point at the verified implementation, not a new design.

## The full field, verified across four seats

Every seat ran the live 99-rule table (flex.json @ 97d7e9d, sha256 `0a26d7c2…`). Results:

| Design | Baseline | +Owner scores | Fiat/patch rows | Ports to basketball? | Self-auditing? | Verified by |
|---|---|---|---|---|---|---|
| ZAI-D1 + Owner scores | 95/99 | **98/99 (te 1)** | **0** | **Yes** | **Yes** | MUSE, Inkling, VL (×3) |
| R4 (Inkling/MUSE) | 93/99 | 99/99 | 11 pins + floor + re-fit cut | No (D@90 dep) | No | Inkling, Glyph (×2) |
| Claude flexgates v1 | 70/99 | — | waivers | — | — | MUSE |
| Claude flexgates v2 | 80/99 | — | waivers | — | — | MUSE |
| MUSE-D1 (harmonic) | 63/99 | 63/99 | — | No | No | MUSE (self-tested) |
| Inkling FL-1 A-only | 84/99 | — | 0 | Yes | Yes | Inkling |
| Inkling FL-1 A+V | 85/99 | — | 0 | Yes | Yes | Inkling |

**ZAI-D1 wins on principle AND is within one row of perfect fit.** R4 wins on raw fit (99/99) but buys it with 11 pinned/fiat rows, fitted constants, and an engine D-table dependency that cannot port to basketball. The Owner has stated a preference for Z.ai's model because its logic lends to multisport generalization — that preference is now supported by three independent verifications.

## Verified architectural findings (all seats agree)

1. **D is a value guard, not an ability measure** — Claude, verified exactly by MUSE (97/97 rules within 2 OVR, 91/97 same tier, no fitting). ZAI-D1's pure-ability structure is therefore correct; it does not need a D term. The guard belongs as an *additional* term for cases where slot value exceeds ability (C>OT, TE>OT).

2. **Sum beats max** — Claude's data: sum (G + kP·P + kC·C) = 80 vs max = 79. Any future G+L combination should use the sum.

3. **SCOPE is a footgun** — Inkling verified SCOPE is inert on the live 99-rule table (baseline unchanged at 95/3/1 → 98/1/0) but silently neutered DL5's EREP demand (OLB→DL5 and ILB→DL5 drop 2→6 when scopes are present). **Delete SCOPE; NEED dict per job is sufficient.** Verified by Inkling and VL.

4. **C PBLK must be a HAVE/NEED pair** — Inkling and VL verified that lowering HAVE C PBLK to 6 without lowering NEED C PBLK (8) violates the self-doable invariant (need ≤ have per job). Lowering both (6/6, or 7/7) changes **zero rows** in the fit. Adopt the pair, not the bare cell.

5. **C>OT is the hub-exit premium** — Z.ai built and ran the one-on-one duty (ISOP): it fixes C>OT but breaks five DL→OL 6-rows, proving the 12 prices the center's *exit* (SNP 10 + line calls reorganize the unit), not the OT job's demands. DT>OT is 6 with a *worse* body. **Name the residual; don't patch it.**

6. **99/99 is not free** — R4's perfect fit costs 11 pins + floor + re-fit cut + 2 Owner-estimated bump cells + engine D dependency. Inkling: 43/57 Owner rows fall out natively in FL-1; only 14 are irreducible. ZAI-D1 gets 98/99 with 0 pins and names its one miss.

## The working derivation (exact spec)

**Formula:** `tier(M + 0.4·S)` — max weighted absolute deficit + 0.4× sum of the rest, cuts 1/4/9, tiers 0/2/6/12, cross-side floor 6 (FB/K-P exempt), scoped duties THR→QB/KCK→K/PNT→P/EREP→EDGE (delete the SCOPE layer; author NEED zeros directly — Inkling verified this is inert on the live table and removes the DL5 footgun).

**Owner's three score changes (adopted as pairs):**
- EDGE HAVE CARRY 2→4 (agree — edges are the best athletes; CARRY 2 asserted "cannot carry at all")
- C HAVE PBLK 9→6 **paired with C NEED PBLK 8→6** (direction agree; keeps self-doable invariant; zero fit change — Inkling + VL verified)
- TE HAVE PBLK 5→4 (agree — TE pass protection is survival reps, not craft)

**Fit:** 98/99, tier-error 1, 0 fiat rows, residual C>OT (owner 12, model 6, raw 6.68 — M 6.20 on PBLK).

**C>OT disposition:** accept as named principled residual. Z.ai's tested fallback: exit-premium surface `EXIT[C]=3.0` on exits from C (FB/specialist exits exempt) → 99/99, tier-error 0. That is one authored scalar, one line of code — ship it only if the Owner wants the row closed. Do not absorb it silently into R4's pinned rows.

## Enhancement (verified, defer to next round)

**Claude's value guard** under ZAI-D1's duties: Z.ai's ability layer (L) + Claude's guard (G, computed from slot weights alone, no fitting) as a SUM (Claude's data prefer sum over max, 80 vs 79). This would close C>OT (G ≈ 12-14) naturally. Test with waivers (FB>RB, FB>TE, C>OG) + WILL/C bump in place (Claude's rec #3; MUSE's bare max(G,L) test at 93/99 does *not* settle this — it lacked waivers and bump). **Recommended as the next evolution, not the working derivation.**

## What I am NOT recommending

- **R4 as working derivation:** 99/99 fit but 11 fiat rows, engine D dependency, does not port, not self-auditing. Keep on file as perfect-fit reference + audit baseline.
- **MUSE-D1:** failed at 63/99; filed for record.
- **CS-MVM as immediate build:** design sketch, zero measurement. The requirements/contribution model it described *is* ZAI-D1's NEED/HAVE structure — ship ZAI-D1 instead.
- **Forcing 99/99 via C PBLK 4:** the Owner did not choose 4; 98/99 with a named residual is more honest than a bent score.

## Portability (the Owner's multisport requirement)

ZAI-D1's structure (NEED/HAVE per job, max-gap + discounted sum, tiered display) already ports: Z.ai's basketball sketch (13 duties, 5 positions, 40 derived prices) and Inkling's FL-1 port proof (same code path, basketball run) both ran with zero football constants. The SCOPE deletion and SIDE-map parameterization (Inkling verified) make the port cleaner. Basketball's oracle (hand-priced flex table) does not exist yet — first calibration step when authorized.

## Formal recommendation

> **Adopt ZAI-D1 + Owner scores (EDGE CARRY 4 + C PBLK 6/NEED 6 pair + TE PBLK 4) as the working derivation: 98/99, tier-error 1, 0 fiat rows, C>OT named residual. Accept the exit-premium surface (EXIT[C]=3.0 → 99/99) only if the Owner wants C>OT closed. Delete SCOPE. Defer Claude's guard+ZAI-D1 hybrid to the next round. Drop 99/99 as a hard gate; keep as sanity check. Ship the continuous-raw + tiered-display dual layer (already how ZAI-D1 computes).**

## Evidence inventory

- VL re-implementation: `zai_d1_independent.py` (baseline 95/3/1; V4 98/1/0; V5 97/2/0) — matches MUSE to the digit
- MUSE re-implementation: `muse-zai-d1-reimplement-2026-11-10.py` — identical results
- Inkling re-implementation: `zai-d1-reimpl.py` — identical results, plus self-doable invariant finding
- Inkling R4 verify: 99/99, 11 pins, ablations E5/R1-R7
- Claude flexgates: v1 70/99, v2 80/99; D-guard verified 97/97 within 2 OVR; sum beats max (80 vs 79)
- Z.ai z2 folder (pushed to `council/vl` at `53e1482e`): full derivation, basketball sketch, ISOP test, owner-scores run, full V4 diff
- All runs against `architect/engine-and-seats:tools/mathlab/flex.json` @ `97d7e9d`, sha256 `0a26d7c2…`, verified byte-identical to snapshots before first run

Labels: VERIFIED (all fits above, three independent seats). INFERRED (enhancement path, basketball calibration needs). No invented data.
