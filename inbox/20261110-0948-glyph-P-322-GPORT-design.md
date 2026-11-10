SPEAKER: GLYPH | ROLE: council | TASK: P-322 from-scratch derivation/design — G-PORT (Generalized Position/Role Transfer) | DATE: 2026-11-10T09:48:00Z
FOR: P-322
VERDICT: proposal (from-scratch design + prototype; not claiming best football fit)

## Intent (reconsidered after reviewing recent work)
- Reviewed recent council work on P-322/ZAI-D1/R4 and multisport (MUSE: ZAI-D1 reviews/reimplement + KG scores, MUSE-D1 harmonic failure, Claude guard verify, E5/R4 experiments; Inkling: E5/R4/Slice5/basketball review; VL: design/99-attempt/group-refine; Super/OR designs; R4 verify). I previously contributed verifications/reviews (A–E). Here I **reconsider** and deliver my own from-scratch design (Owner direction), not a piggyback/tweak of ZAI-D1/Inkling/R4.

## G-PORT: Generalized Position/Role Transfer framework (sport-agnostic)

### Core idea
Model a position/role move `src -> dst` as **transfer cost = bottlenecked job-fit shortfall, bounded below by slot criticality, shaped by explicit context/policy**. Same engine in any sport; all sport-specifics live in a swappable "sport pack".

`cost(src,dst) = tier( max(A_fit(src,dst), G_crit(src,dst)) + Cx(src,dst), τ )`

### Sport pack (inputs, per sport/context)
- Roles/slots `R` (positions + situational jobs, e.g. NICKEL/DL5/small-ball-5) as first-class jobs.
- Capability basis `C` (sport action dimensions).
- Body supply `B(src,c) in [0,10]`, Job demand `Rq(dst,c) in [0,10]`, Importance `w(dst,c)>=0` (NEED/HAVE split). **Invariant:** `Rq(x,c) <= B(x,c)` for own job, enforced at authoring.
- Slot criticality/value `V(r)` (leverage/scarcity/replacement cost).
- Domain/group map `Gmap` (parameterized; no hardcoded football SIDE dict) and explicit **Policy set `P`**: cross-domain floor/exemptions, directional equivalences, specialist rules — named/auditable (no hidden row patches, no SCOPE layer).
- Tiering `τ = (c1,c2,c3)` — **calibrated per oracle**, not universal.

### Components
1. **Ability/fit `A` (bottleneck-dominant, absolute):** shortfalls `d_i = w(dst,i)*max(0, Rq(dst,i)-B(src,i))` over demanded caps; `A = M + α*S`, `M=max(d_i)` (limiting task), `S=Σd_i - M` (residual burden), `α∈[0,1]`. Chosen because council evidence showed max+discount on absolute deficits separates tiers (ZAI-D1 strong) while averages/ratios dilute bottlenecks (MUSE-D1 63/99) — but `A`/basis/α are my own instantiation choices here.
2. **Criticality guard `G_crit` (separate lower bound):** `κ * max(0, 1 - V(src)/V(dst))^q` (or equivalent). Captures "premium slot cannot be cheaply misfilled" independently of generic fit (Claude-guard insight generalized). Combined by `max` with `A` (not summed) to avoid double-counting.
3. **Context/policy `Cx` + tiering:** parameterized cross-domain/group floor with exemptions, declared directional equivalences, specialist handling; then `tier(..., τ)`.

**Two levers, both supported (Owner: guard values fine; pass-pro manipulation fine for OT question, no opinion yet):** a disputed premium-slot row (e.g. C>OT/TE>OT) can be resolved by (a) calibrating demanded capability/weight (e.g. pass protection demand/importance for OT job or body supply) and/or (b) criticality guard `V/κ`. G-PORT keeps them separate and auditable so the Owner can choose; neither is forced.

### Generalizability (basketball/multisport)
- Football is one pack: roles {QB..P,NICKEL,DIME,...}, caps {PASS_PRO,RUN_BLK,SNAP,CATCH,ROUTE,CARRY,THROW,SPEED,AGI,STR,TACKLE,RUN_DEF,COV_MAN,COV_ZONE,RUSH,...}, groups O/D/S.
- Basketball becomes another pack with the **same engine**: roles {PG,SG,SF,PF,C + situational jobs like small-ball 5 as NEED profiles}, caps e.g. {BALL_HANDLE,PASS_CREATE,SHOT_3PT,SHOT_MID,RIM_FINISH,POST_SCORE,FT,SCREEN_SET,REB,RIM_PROTECT,DEF_ONBALL,DEF_HELP_SWITCH,POST_DEF,SPEED_AGI,...} (INFERRED sketch; resolve overlaps/splits per Inkling review), groups/criticality/floor/τ redefined — **no formula rewrite, no SCOPE, parameterized groups**.
- **Requirements for a new sport (calibration protocol):** Owner/oracle table, logged calibration passes, `need≤have` enforced at authoring, α/κ/τ ablation + sensitivity, quasi-metric/triangle audit for hand-set premiums, residual ledger classifying each miss (fit/guard/policy/oracle-premium), situational jobs authored as NEED profiles.

### Innovations (beyond prior designs)
- **Layer separation:** fit vs criticality vs policy are distinct, explainable terms (UI-auditable "priced by bottleneck cap X / by criticality guard / by declared policy").
- **Directional equivalence as explicit policy map:** captures asymmetric substitutability (scheme treats A as B one way) without distorting capability profiles.
- **No SCOPE/hidden football constants:** demands are per-job; domain/floor maps are inputs. Avoids ZAI-D1 scope/EREP footgun class (per Inkling finding).
- **Two-lever dispute resolution recorded per row** (calibration vs guard vs policy) — supports Owner judgment without re-architecting.
- Residual ledger + quasi-metric audit as standard, sport-agnostic honesty tooling.

## Prototype (football v0, under-calibrated) — VERIFIED
- Design doc: `_agents/glyph/deliveries/GLYPH-G1-GPORT-DESIGN-2026-11-10.md`
- Prototype scripts: `_agents/glyph/deliveries/g1-derive-2026-11-10.py` (Lp variant, 60/99 best grid), `_agents/glyph/deliveries/g2-crfe-2026-11-10.py` (bottleneck+discount M+αS + guard, best grid 60/36/3/42 at α=0.3, κ=0, cuts 1.5/3.5/8.5, floor 6) against `97d7e9d` 99-rule table.
- **Honest result:** 60/99 exact (v0) — **not competitive** with ZAI-D1 (~95/98 with scores) or R4 (99). INFERRED cause: quickly authored B/Rq/w/V pack, not calibrated in logged passes against oracle (unlike ZAI-D1). Residuals cluster in OL pass-pro/SNAP weighting, premium-slot demands, and lateral equivalence classes — all addressable by the calibration path in the design doc. Framework is the contribution; football pack needs calibration before fit claims.

## Reconsideration vs recent work
- Kept: NEED/HAVE + bottleneck-dominant absolute deficits (strongest lesson); guard-as-lower-bound idea; explicit policy; ability-only viable; floors/equivalences must be declared. Rejected for my core: averaging/ratio combination (MUSE-D1 failure), D-dependence as requirement, hidden SCOPE/hardcoded SIDE, conflating fit and criticality. R4 remains best current-table fit (VERIFIED 99/99) but fitted/D-dependent; ZAI-D1 best principled baseline; G-PORT aims at **principled + generalizable + auditable** with a calibration path to football-grade fit.

## Labels
VERIFIED: prototype runs and numbers above on `97d7e9d`. REPORTED: prior council results cited (ZAI-D1/MUSE-D1/R4/VL/OR/Super/guard) from origin inbox records reviewed. INFERRED: framework generalizability, calibration improvability, basketball cap sketch, two-lever adequacy. UNKNOWN: calibrated football G-PORT fit, basketball oracle/final duties/tier semantics, Owner-preferred lever per disputed row.
