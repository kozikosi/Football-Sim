SPEAKER: glyph | ROLE: council seat | TASK: P-322 formal submission — review, merge, and recommendation | DATE: 2026-11-10T10:32:00Z
FOR: P-322
VERDICT: proposal

# Glyph formal submission (P-322): reviewed merge recommendation

Owner direction applied (2026-11-10): 99/99 is a guide, not a target; prefer the most beautiful and most portable formula; sliding scale was the original vision but 0/2/6/12 is user-friendly; favor positional requirements and values over arbitrary physical attributes; merge best ideas or choose the best path. This is a design/proposal (no product/build changes).

## 1) Work reviewed (all REPORTED unless noted)

| Seat/work | Core idea | Fit (oracle 97d7e9d, 99 rules) | Strength | Cost/limit |
|---|---|---:|---|---|
| Z.ai ZAI-D1 (+ z2, `flex-derivation-z2/` mirrored) | NEED/HAVE duties, `tier(M + λ·S)`, λ=0.4, cuts 1/4/9, scoped duties, cross-side floor; paired KG scores (EDGE CARRY 4, C PBLK 6 HAVE+NEED 6, TE PBLK 4) | 95/3/1 base; 98/1/0 (C>OT only) V4; 97/2/0 at C PBLK 7 [REPORTED z2; independently reverified by MUSE/Inkling/VL/glyph] | 0 fiat, self-auditing, requirement-driven, ports (basketball sketch), continuous raw snapped to tiers | C>OT named hub-exit residual; ISOP fix breaks 5 DL→OL rows (z2); EXIT[C]=3 surface gives 99/99 if desired [REPORTED] |
| Inkling FL-1 / merge-measured (`0945`) | `raw=max(A,G)`; G=Claude slot-value guard `20*(1-w_src/w_dst)`; ability ZAI-D1 V4; pins = 3 anti-D waivers | guard tier==live 44/99 (23/23 free) [VERIFIED by Inkling, REPORTED]; `max(Z-A,G)` 96/99; +3 pins 99/99; sum 83/99; floor inert in family; LOO max 97% [REPORTED/Inkling-measured] | Decomposes table (value guard + ability + 3 waivers); collapses C>OT via guard; max evidence | Guard↔D@90 small discrepancy noted (94/97 vs 97/97 in others) [REPORTED]; needs Owner rulings (3 pins, floor, tiers-vs-raw) |
| R4 (Inkling/MUSE) | E5 + FS↔SS exclusion + EDGE>OLB override 0 (on P-322 base) | 99/0/0 [REPORTED; glyph/Muse/Inkling verified family] | Perfect fit audit reference | 11 pins/fitted choices/re-fit cut, D@90/engine dependency, not portable/self-auditing |
| Claude flexgates | `G + kP*P + kC*C`, craft table + body; waivers; held-out/CV | v1 70/99, v2 80/99, CV 65/70 [REPORTED] | Verified value-guard insight (D is economics), sum-vs-max data under his layer, LORO ask | Lower fit; body attrs earned little; layer-dependent combo result |
| VLOC-D2 | `max(A,V)+archetype_cost`, capped-breadth aptitude, guard V, cross-side floor | 84/15/0 te 15 [REPORTED] | 0 fiat, 0 hard, C>OT/TE>OT exact via guard, clean/portable, continuous raw+tier display | Lower exact fit; aptitude aggregation differs |
| Super Requirement-Value | `fit_gap*(1+VALUE_TAX*slot_value)+CROSS_TAX+FAM_TAX`, 8 universal duties | 50 exact/47 off1/2 hard (CB>FS,CB>SS), 0 overrides [REPORTED] | Multiplicative value, FAM_TAX, transparent, portable, continuous+tier | Exact fit low; comparison to others’ “exact” must be apples-to-apples |
| Glyph G-PORT v0 (`inbox/20261110-0948`, deliveries) | Layered `tier(max(A_fit,G_crit)+Cx,τ)`, sport pack, directional equivalence, calibration protocol | 60/36/3 best prototype on 97d7e9d [VERIFIED glyph run] | Pluggable/portable framework, explicit policy map, calibration/invariant discipline | Under-calibrated football pack; not competitive yet |
| MUSE-D1 | Harmonic coverage | 63/99 [REPORTED] | — | Dilutes worst gap (failed) |
| OR / others | Lp-norm / alternative packs | ~31–44/99 [REPORTED] | — | Weaker fits / structural variants |

Notable verified negatives: SCOPE is a footgun (DL5) though inert on live 99 [REPORTED Inkling/VL]; ISOP duty breaks 5 DL→OL 6-rows [REPORTED z2]; sum(A,G) overshoots under ZAI ability (scales) [REPORTED Inkling]; wasted-capability global additive hurt merge harness [REPORTED Inkling] (not adopted). Max-vs-sum is layer-dependent [INFERRED].

## 2) Correction (Owner concern: attributes vs requirements)

Glyph’s G-PORT/ZAI-family work is **not** STR/SPEED/height-driven. It is **positional requirements and values**: a sport pack supplies roles, duties (job requirements), `NEED(job,duty)` and `HAVE(role,duty)`, weights/scope/value, and policy; price derives from capability deficits/coverage. Physical attributes (STR/SPEED/height), if ever used, would only inform `HAVE` scoring upstream — the contract/formula is requirement/value-based and portable. ZAI-D1/z2 is the same family.

## 3) Synthesis — the beautiful, portable merge (improved recommendation)

**Skeleton (converged):** `price = quantize( raw, tiers )`, `raw = combine( A_requirements, V_value ) + Cx_policy` over a sport pack. Keep the engine’s notion continuous; present tiers.

1. **Ability A (requirements, core):** ZAI-D1-style NEED/HAVE positional requirements — `A = M + λ·S` (worst deficit + discounted rest) over duties with weights/scope, **no SCOPE footgun**, `NEED ≤ HAVE` invariant (paired edits, e.g. C PBLK HAVE+NEED). Sport-pack authored duties/NEED/HAVE (ZAI §4.1 “NEED-support” / job-first procedure) beat forced-universal duties when fidelity matters; map to primitive families for onboarding. [INFERRED best base: ZAI-D1 V4 evidenced + portable]
2. **Value V (economics):** slot/value guard `G = ref*(1 - w_src/w_dst)` (from slot weights/design values) as the no-arbitrage/value layer — D as economics, not ability (Claude insight, independently checked by multiple seats [REPORTED]). [INFERRED]
3. **Combine:** `raw = max(A, G)` (or a calibrated variant) — prefer max over naive sum for mixed-scale A/G given Inkling’s measured result under ZAI ability (96 vs 83) and VLOC-D2’s structure [REPORTED; layer-dependent, verify under chosen A]. This makes hub/value rows (e.g. C>OT) explainable structurally in the merge [REPORTED Inkling].
4. **Policy Cx (explicit, minimal):** cross-archetype/class floor only if calibration undershoots (inert in V4 family [REPORTED] → conditional/delete as policy); directional equivalences/situational jobs as explicit maps (G-PORT), not hidden overrides; FB/specialist exemptions per Owner rules. Prefer named, countable pins/ledger for irreducible Owner judgments over fiat (e.g. 3 anti-D waivers — Owner ruling) rather than bending scores. [INFERRED]
5. **Presentation (resolves sliding-scale vs tiers):** compute **continuous raw** internally (sliding scale for optimizer/engine/fidelity) and **display quantized tier badges** `0/2/6/12` for UX — same object, two views. Bins are presentation config (natural clustering observed [REPORTED Inkling]); 99 is calibration/oracle guidance, not a hard gate. [INFERRED, matches Owner intent]
6. **Portability:** swap sport pack (roles/duties, NEED/HAVE, weights, λ/cuts or τ, slot values, minimal policies). Basketball: ZAI z2 sketch is the template; **first task = oracle (e.g. 25-cell) before matrices** [REPORTED Inkling/ZAI]. λ/cuts may differ by sport.

## 4) Formal recommendation

- **Adopt as working derivation (now):** ZAI-D1 V4-shaped requirement core (NEED/HAVE, `M+λ*S`, continuous raw → tiered display) with paired, invariant-preserving score inputs — **98/99-class, 0 fiat, self-auditing, portable** baseline [REPORTED/verified across seats]. Treat C>OT as a named principled residual (hub-exit) unless/until captured by value layer or explicit Owner-chosen mechanism (EXIT premium is a tested option, not a silent patch) [REPORTED z2].
- **Adopt as the merge evolution:** add slot-value guard `G` with `max(A,G)` + explicit minimal policy/ledger (floor conditional; directional equivalence map available; pins only if Owner names them) — measured to decompose/explain the table and collapse C>OT in the merge [REPORTED Inkling]. Do not claim 99/99; target explainable, stable residuals.
- **Do not adopt:** R4 as working base (pins/D-dependence) — keep as audit reference; SCOPE; ISOP; global wasted-capability additive as tested; forcing 99/99 by bending scores. Uncalibrated G-PORT pack is not ready (framework kept).
- **Owner decisions to unblock build-level adoption:** (a) accept named anti-D waivers/pins, if any; (b) tiers-as-display + continuous-raw internally; (c) floor policy (delete/conditional) given inert measurement; (d) C>OT handling (named residual vs guard-merge vs EXIT surface).

## 5) Limits / labels

VERIFIED (glyph, this/earlier runs): ZAI-D1+KG fits on 97-rule muse snapshot and 99-rule `97d7e9d` (95/3/1→98/1/0 V4, residual C>OT raw 6.68); R4 99/0/0 on `97d7e9d`; G-PORT v0 60/36/3 best; `flex-derivation-z2` mirrored to `council/glyph` @ `9bd94cfc`. REPORTED: other seats’ fits/guards/CV/LOO/ISOP/basketball sketches/ablations and z2 contents as cited. INFERRED: merge choice (max+guard over ZAI core), presentation split, portability/λ notes, policy minimalism. UNKNOWN: final Owner pin/floor/tier rulings; authoritative guard-vs-D@90 reconciliation on the 3 disputed rows; basketball oracle; final duty/weight calibration for any adopted pack.

Evidence: `inbox/20261110-0915-glyph-P-322-ZAI-D1-KG-verify.md`, `0930-glyph-P-322-R4-verify.md`, `_agents/glyph/deliveries/*`, `flex-derivation-z2/`, reviewed `origin/council/{muse,inkling,vl,super,or,vloc}/*` P-322 files and Muse submissions review.
