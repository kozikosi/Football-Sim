# GLYPH-G1 — G-PORT (Generalized Position/Role Transfer) Framework
**Seat:** Glyph | **Date:** 2026-11-10 | **Task:** P-322 (from-scratch derivation/design) | **Status:** design + prototype (read-only analysis)

> Designed from scratch after reviewing recent council work (ZAI-D1, Inkling P-322/R4, MUSE-D1, Claude guard, VL/OR/Super experiments, Inkling basketball review). I did not copy any existing formula's numbers or matrices; I extracted structural lessons and built a new, sport-generalizable framework.

## 0. Why a new framework (what I took from others, and what I changed)

**Lessons I accepted (VERIFIED/REPORTED in council record):**
- **NEED/HAVE split is correct.** A job's demands and a body's supplies are different objects (ZAI-D1: FB job demands little carry but FB body has carry; self-doable constraint `need(job X) ≤ have(body X)`). This generalizes to any sport.
- **Bottleneck-dominant, absolute shortfalls.** MUSE-D1 showed averages/ratios dilute the binding constraint (63/99) while max+discount on absolute weighted deficits works far better (ZAI-D1 95/99). The limiting task sets the price.
- **Slot/role criticality is a separate concern from raw fit.** Claude's guard insight is sound: some destinations are costly to misfill because the slot is premium/fragile (C>OT, TE>OT in football were argued this way), independent of a generic ability gap. Owner: "adding guard values was fine but manipulating the pass protection values was also fine" — my framework allows **both** as explicit levers.
- **No D/value-displacement table required.** ZAI-D1 showed ability-only can reach high fit with 0 fiat rows; R4 reached 99/99 but with D-dependence and fitted exceptions. For multisport/generalizability, avoid engine-specific D inputs.
- **Scope layers are footguns; policy must be explicit.** Inkling showed SCOPE was redundant on 99 rules but silently dropped DL5 EREP in ZAI-D1's implementation path; SIDE/floor maps must be parameterized inputs, not hardcoded football labels (basketball review). Floors/exemptions/equivalence rules belong in named policy modules.
- **Fit vs principle tradeoff is real.** R4 (99/99, fitted) vs ZAI-D1 (95/98 with scores, principled, 0 fiat) — the framework must make fitted choices visible and swappable.

**What I do differently:**
- A **layered, pluggable architecture** (Fit + Criticality + Context/Policy) so the same engine runs in any sport by swapping input packs.
- **No SCOPE table** — job requirements are declared per job; only demanded capabilities matter.
- **Directional substitutability/equivalence as an explicit policy map** (not hidden in skills) for cases where "scheme treats these as interchangeable one way" differs from pure ability distance (e.g. EDGE↔OLB asymmetry patterns).
- **Calibration protocol as part of the design** (oracle, invariants, residual ledger), because a formula without an oracle is untestable in a new sport.

## 1. Core model (sport-agnostic)

### 1.1 Inputs (the "sport pack")
For a given sport/season context, define:
- **Roles/slots** `R` (positions and situational jobs/slots, e.g. NICKEL, DIME, DL5, or basketball "small-ball 5").
- **Capability basis** `C = {c1..ck}` — the sport's action/skill dimensions (measurable or coach-defined). Chosen so that job demands and body supplies can be expressed on the same basis.
- **Body supply** `B(src,c) ∈ [0,10]` — what a typical/actual body of role `src` provides.
- **Job demand** `Rq(dst,c) ∈ [0,10]` — what job `dst` requires (minimum/operational need). **Invariant:** `Rq(x,c) ≤ B(x,c)` for the role's own job where applicable (self-doable), enforced at authoring.
- **Importance weights** `w(dst,c) ≥ 0` — how load-bearing capability `c` is for job `dst` (0 = irrelevant). Allows "critical but rare" vs "constant background" demands.
- **Role criticality/value** `V(r) ≥ 0` — scarcity, leverage, or replacement cost of slot/role (sport-configurable scale).
- **Domain/group map** `Gmap` — groups and relations (e.g. offense/defense/special; frontcourt/backcourt; unit families) used by context policy.
- **Policy set** `P` — explicit, named rules: cross-domain floor, exemptions (e.g. utility FB fills), directional equivalences/substitutability, specialist isolation, etc. **No hidden row patches** — every exception is a declared policy with a reason.
- **Tiering** `τ` — cuts `(c1,c2,c3)` mapping continuous cost to discrete tiers (e.g. 0/2/6/12 or sport-specific). **Treated as calibration outputs**, not universal constants.

### 1.2 Transfer cost

For a move `src → dst`:

1. **Shortfalls (binding constraints):** for each capability demanded by `dst`,
   `d_i = w(dst,i) * max(0, Rq(dst,i) - B(src,i))`.
2. **Ability/fit cost** (bottleneck-dominant, absolute):
   `A = M + α * S`, where `M = max(d_i)` (the limiting task) and `S = Σ d_i - M` (residual burden), `α ∈ [0,1]` (residual discount, calibrated).
   - Degenerate case (no shortfalls): `A = 0`.
   - (General form: `A = (M^p + β*Σ other^p)^(1/p)` or Lp; I choose `M+αS` as the simplest interpretable bottleneck form, consistent with the strongest empirical lesson; α/p are calibration knobs.)
3. **Criticality guard** (separate lower bound, Claude-style insight, generalized):
   `Gv = κ * g(V(src), V(dst))`, e.g. `g = max(0, 1 - V(src)/V(dst))^q` or a role-pair criticality function. Ensures premium slots are not underpriced when a low-criticality source "almost fits" on paper. `κ,q` calibrated; `Gv=0` when source meets/exceeds destination criticality.
4. **Context/policy adjustment** `Cx`:
   - cross-domain/group floor or surcharge from `Gmap` (e.g. cross-side floor, with exemptions like `dst=FB`) — parameterized.
   - directional equivalence map `E`: if `(src,dst) ∈ E_free` force 0 (or apply specified discount) with reason; if `(dst,src)` differs, keep directional.
   - specialist isolation rules.
   All **declared in `P`**, not inferred ad hoc.
5. **Raw cost:** `X = max(A, Gv) + Cx_add` (guard is a lower bound, not a sum that double-counts; additive context only where independently justified).
6. **Tier:** `price = tier(X, τ)`.

### 1.3 Why this composition
- `max(A,Gv)` separates "can't do the job" from "shouldn't be asked to do this job given its value" — both are real in football (and in any sport with premium positions).
- `M + αS` captures "one fatal gap dominates, other gaps still matter" without averaging away the bottleneck (MUSE-D1 failure mode).
- Everything sport-specific lives in the **pack** (`C,B,Rq,w,V,Gmap,P,τ`), not in the engine.

## 2. Football instantiation (G-PORT/FB v0, prototype)

**Capability basis (15, my choice):** PASS_PRO, RUN_BLK, SNAP, CATCH, ROUTE, CARRY, THROW, SPEED, AGI, STR, TACKLE, RUN_DEF, COV_MAN, COV_ZONE, RUSH.
**Groups:** OFFENSE/DEFENSE/SPECIAL; `is_cross` = O↔D (special handled separately). **No SCOPE table.**
**Policy (explicit):** `dst=FB` free for {RB,TE,OT,OG,C,DT,EDGE,ILB,OLB} (utility FB rule, declared); K↔P small specialist swap; cross-to/from specialist prohibitive; cross-domain floor 6 except exempt FB (parameter, policy).
**Value/criticality V:** QB 100, OT 88, EDGE 82, WR/CB 70, DT 62, TE 58, OG 55, C 52, ILB/SS/FS 48-50, OLB/RB 46, NICKEL 34, DIME 30, FB 22, K/P 20 (authored relative scale).
**B/Rq/w:** authored from scratch per role/job (see prototype). `need≤have` for own jobs intended (to be enforced by a checker in a full calibration pass).
**Calibration knobs:** `α` (residual discount), `κ` (guard strength), cuts `τ`, cross-floor.

### 2.1 Prototype results (VERIFIED run)

Script: `_agents/glyph/deliveries/g2-crfe-2026-11-10.py` (prototype implementing G-PORT/FB v0 logic) against `97d7e9d` 99-rule table.

| Config | Exact | Off-by-one | Hard | Tier-err |
|---|---:|---:|---:|---:|
| Manual (α=0.5, κ=12, cuts 1.5/4.0/8.5, floor 6) | 55 | 41 | 3 | 47 |
| No guard | 55 | 41 | 3 | 47 |
| No floor | 55 | 41 | 3 | 47 |
| Best grid-searched (α=0.3, κ=0, cuts 1.5/3.5/8.5, floor 6) | 60 | 36 | 3 | 42 |

**Honest assessment:** 60/99 is **not competitive** with ZAI-D1 (95/98) or R4 (99) as a calibrated football answer. This is a **v0 instantiation**: the capability basis and B/Rq/w matrices were authored quickly and not calibrated against the 99-rule oracle the way ZAI-D1's 17 duties were (two logged passes + named fixes). The framework is runnable and sport-general; the football *pack* is under-calibrated.

**What the residuals show (useful):** errors cluster where (a) SNAP/center mechanics and OL pass-pro demands are underweighted or mis-profiled (OT>C, OG>C, C>OG, C>OT family), (b) cross-domain to premium pass-rush/coverage jobs over/under-priced by my rough STR/PRSH/COV splits, (c) lateral DB/LB equivalences (EDGE>DT/OLB, ILB>OLB, CB>SS, SS>DIME/NICKEL/OLB, FS>NICKEL) — exactly the "pair ruling / equivalence" class others needed policy/overrides/discounts for. These point to **calibration targets**, not to abandoning the layers.

### 2.2 How to reach football-grade fit within this framework (calibration path, not done here)
1. **Refine capability basis** (e.g. split PASS_PRO anchor vs mobility if needed; ensure SNAP/center identity captured; separate on-ball/help or edge-repertoire analogs only if demanded — but prefer NEED-driven, no SCOPE).
2. **Calibrate B/Rq/w against the oracle** in logged passes (like ZAI-D1): fix self-doable violations, align job demands to Owner-intended "what the job actually needs", tune w for load-bearing duties (OT pass pro) — **and/or** use the criticality guard for slot-value rows (Owner: both levers fine). Record every change + reason.
3. **Declare minimal explicit policies** for true directional equivalences the oracle asserts but pure fit doesn't encode (auditable list), if any remain after calibration.
4. **Re-fit (α, κ, τ)** by grid/ablation and report λ/α, cut sensitivity (plateaus, not single points).
5. **Residual ledger:** every miss named as ability, guard, policy, or oracle-premium (triangle/quasi-metric audit per ZAI-D1 IDEA-2).
Target: match or exceed principled fit (≥95, few/no fiat) before considering fitted exceptions.

## 3. Basketball instantiation sketch (generalization proof, DESIGN ONLY)

Per Owner direction and `_agents/basketball/README.md` constraints: **not to be built before 76 Pancakes ships and repo moves.** Same engine, new sport pack.

**Roles/slots `R` (example):** PG, SG, SF, PF, C, plus situational jobs as NEED profiles when defined (e.g. small-ball 5, point-of-attack defender, stretch big) — authored as jobs, not by neighbor-copy (DL5 lesson).
**Capability basis `C` (proposed, to be refined; INFERRED):**
- BALL_HANDLE, PASS_CREATE (playmaking), OFFBALL_MOVE
- SHOT_3PT (spacing), SHOT_MID, RIM_FINISH, POST_SCORE, FT_SHOOT
- SCREEN_SET (big's action-setting; high leverage), ROLL_POP (short-roll/pop utility)
- REB_O, REB_D / BOXOUT
- RIM_PROTECT
- DEF_ONBALL_PERIM, DEF_HELP_SWITCH (versatility/team D) — split to capture wing identity
- POST_DEF / STRENGTH_ANCHOR, SPEED_AGI

(Resolve overlaps explicitly: e.g. post scoring vs rim finish; perimeter on-ball vs help/switch as distinct duties; include screen setting and switch/versatility — gaps noted in Inkling review.)

**Job demands/values/groups:** `Rq,w` per role/job (PG needs BALL_HANDLE/PASS_CREATE high, RIM_PROTECT low except scheme-specific; C inverse; SF/PF identity via switch versatility + spacing/screening blends). `V` by positional leverage/scarcity (context-dependent; calibrated). Groups/domains parameterized (backcourt/frontcourt/wings or scheme roles) — **no hardcoded football SIDE map**; cross-group floor/exemptions only if policy states them.
**Validation (required before claims):** Owner-defined oracle (e.g. 5x5 directed flex/role-fit table or scenario judgments), λ/α/cut ablation, quasi-metric audit, held-out rows, logged calibration passes, `need≤have` enforced at authoring.

## 4. Innovations / ideas (filed, not built)

- **G-PORT layers are UI-explainable:** report "priced by ability bottleneck (cap X)" vs "criticality guard" vs "policy (cross-domain floor / equivalence / exemption)" per rule — makes disagreements auditable (ZAI-D1 IDEA-1 aligned).
- **Residual ledger + quasi-metric audit as standard tooling:** classify every miss; flag hand-set premiums above cheapest chain (ZAI-D1 IDEA-2) — sport-agnostic honesty check.
- **Directional equivalence map:** explicit, reasoned, minimal — captures asymmetric substitutability without warping capability profiles.
- **Authoring-time invariant checks:** `need≤have`, scope-free NEED evaluation, and "body/job edits paired" (Inkling's self-doable finding).
- **Two-lever resolution:** for a disputed row (e.g. C>OT), record whether it is resolved by capability calibration, criticality guard, or declared policy — Owner decides; framework supports all three transparently.

## 5. What I did not do / limits

- I did **not** edit the product, engine, flex.json, or protected constants. Read-only analysis.
- Football v0 pack is **under-calibrated** (60/99 best grid) — INFERRED to be improvable by the calibration path in §2.2, but not demonstrated here. It does **not** beat ZAI-D1 or R4 on fit.
- Basketball pack is a **sketch** (INFERRED duties/structure), not calibrated; no oracle exists (UNKNOWN).
- I did not re-run ZAI-D1/R4 scripts except where cited from prior verified council results; comparisons above use council-reported/verified numbers.

## Labels
VERIFIED: prototype run on `97d7e9d` 99-rule table (script output 55–60 exact as reported). REPORTED: ZAI-D1 (95/98), R4 (99/99), MUSE-D1 (63/99), Claude guard behavior/mapping sensitivity, Inkling scope/DL5 and basketball-review findings, VL/OR/Super fits — as recorded in council inbox on origin branches reviewed this session. INFERRED: framework quality/generalizability, calibration improvability, basketball capability sketch, suitability of two-lever (guard vs calibration) resolution. UNKNOWN: basketball oracle, final basketball duty set, Owner-preferred resolution for disputed football rows.
