SPEAKER: glyph | ROLE: council seat | TASK: P-322 derivation QA design (Owner Q&A) | DATE: 2026-11-10T11:43:11Z
FOR: P-322

# G-QA-D1 — a Q&A-aligned derivation (Glyph, from-scratch interpretation)

**Scope (prompt options):** A (design a derivation from the Owner's Q&A), touches C (P-335 gravity, P-336 dual positions, P-337 late-round seamlessness, P-338 big-nickel/SS2 test) and D (tension resolutions). No product files edited; no named seat assigned. **Labels:** VERIFIED = I ran/read it here; REPORTED = stated in council filings/prompt; INFERRED = my design reasoning (not run as a fitted build except small arithmetic shown).

## 0. Evidence anchors (VERIFIED)
- Live oracle snapshot in this worktree: `tools/mathlab/flex.json` (REV 4) — 17 roles, 18 destinations, **107 rules** (counted via `python3 -c "import json; d=json.load(open('tools/mathlab/flex.json')); print(sum(len(v) for v in d['flex'].values()))"` → 107). QB flex is only `QB>FS:10` in this snapshot (REV 4). This differs from the 99-rule / 97-rule snapshots discussed in prior filings; I treat the Owner's 99 as the guide per Q&A, not a match target.
- Prior council state (REPORTED, from prompt + `origin/council/muse` inbox/muse reviews read this session): ZAI-D1 95/99 (98 with score changes, 0 fiat) NEED/HAVE worst-gap+discount; Claude flexgates/guard `G=20*(1-w_src/w_dst)` verified as value guard (fixes C>OT/TE>OT structurally); Inkling merge `max(A,G)` measured 96/99+3 pins in filings; Muse showed pure destination-weight bands 40/99 and weight-adjustment to skill model net ≤0. Owner Q&A answers are the spec (prompt text, treated as VERBATIM Owner direction).

## 1. Design stance (directly from Q&A)
- **Guide, not target (Q2,Q3):** optimize for a beautiful, portable, unified model; report disagreements in OVR points for Owner judgment, not exact-match count. "Good enough" = a feeling that can be adjusted (Q20).
- **Inputs (Q1 follow-up, Q14):** only **OVR** and **how they like to play = preferred position/role**. No per-player STR/SPD/height, no intangibles (mentality/technique). A role/position is the body+style proxy encoded once per sport.
- **Two ingredients (Q6,Q7):** (1) can this body do that job (ability/fit) and (2) can you cheat by moving a cheap player to an expensive spot (value/anti-cheat). Combination must be **malleable/tunable** (adjustable ratio).
- **No named exceptions, no floor, no pair-tracking (Q9,Q10,Q12):** one unified model. Cross-side minimum-6 and C PBLK "pair" must fall out, not be appended.
- **Output (Q4, follow-up Q2):** engine uses **continuous raw penalty** (OVR points); UI shows **simple integers** (no labels like Free/Slight/Real/Heavy). Exact scale/cap/steps deferred until engine natural output is seen; 0/2/6/12 not required. A smooth value avoids knife-edge flips (e.g. guard exactly 4.00 vs cut 4).
- **Permission (Q15):** unpriced moves are **mostly forbidden (b) + some formula-priced (c)** — fluidity and prohibition. Dual positions = **free between a player's own two** (Q follow-up, round-2 Q1). Positions not in the game (big nickel/SS2) must be priceable without hand-written rules.
- **Portability (Q5):** same idea/mechanism, different sport job packs; minimize new-engine work. Basketball is more positionless; do not over-rely on rigid SS-like responsibilities. No Owner-provided weights for other sports.

## 2. The formula (G-QA-D1)

### 2.1 Sport pack (authored once per sport; the only content)
A **sport pack** defines jobs/roles `R`, a duty vocabulary `D = {d1..dk}`, and per job two small profiles:
- `NEED[j,d] ∈ [0,1]` — how much job `j` demands duty `d` (what the job requires on its snaps).
- `HAVE[r,d] ∈ [0,1]` — how much role/body `r` supplies duty `d` (what that position's players typically do; "preferred position ⇒ attributes/play style").
- `CORE[j] ⊆ D` — duties without which the job is not the job (e.g. SNAP for C, GOAL for goalie, a size/reach duty for center-in-basketball). Core absence ⇒ prohibition.
- `Vjob[j] ≥ 0` — job importance (derived, not hand-tuned by Owner): `Vjob[j] = Σ_d w_d · NEED[j,d]` (+ gravity term, §3). This is the portable substitute for slot weights.

**Constraint (self-consistency, replaces pairs):** for a role's own natural job, `NEED[j_r] ⪯ HAVE[r]` on all loaded duties (you can do your own job). Pairs like "move body and job together" are unnecessary because NEED is authored to the job, HAVE to the body, and consistency is checked — not patched after.

**No per-player physical stats.** Duties are job concepts (pass-protect, route-run, man-cover, zone/space-cover, snap, tackle, ball-carry/handle, finish/shoot, rim-protect/deter, etc.) scored at role level from positional concepts; where data exists a sport can derive levels, where not they are authored — one mechanism (Q&A/Claude convergence).

### 2.2 Ability / body-job fit (ingredient 1)
For source role `s` playing destination job `j`:
- deficit per duty: `g(s,j,d) = w_d · max(0, NEED[j,d] - HAVE[s,d])` (0 if duty not loaded for `j`).
- load-bearing deficit: `M = max_d g(s,j,d)` (one missing duty can dominate).
- residual burden: `S = (Σ_d g(s,j,d)) - M`.
- **ability cost:** `A(s,j) = M + λ · S`, with `λ ∈ (0,1)` tunable (malleable). `λ` controls how much secondary gaps matter; predicted small-λ for positionless sports (basketball) where one gap dominates less rigidly — but `λ` is a knob, not a constant per Q7.

Gravity duties (GRV, §3) participate in `g` like any other duty: if destination demands gravity and source cannot provide it, A rises.

### 2.3 Value / anti-cheat (ingredient 2) — portable, no Owner-provided weights
- **derived job value:** `Vjob[j] = Σ_d w_d · NEED[j,d] * (1 + γ·GRV_need[j])` (duty-load importance; gravity amplifies value of jobs where gravity matters — §3). Normalize within sport so ratios are stable.
- **value guard:** `Gv(s,j) = V0 · max(0, 1 - Vjob[j_s]/Vjob[j])`, where `V0` is the value scale (OVR-point scale, tunable; football today can calibrate V0 so guard magnitudes align with observed value gaps like C→OT).
- **Interpretation:** moving from a lower-value job to a higher-value job cannot be cheaper than the break-even value difference — closes the "cheap player to expensive spot" cheat (Q6). Because `Vjob` is derived from the same job pack, it ports to any sport without Owner-supplied slot weights (resolves tension 1).

**C>OT (Q11, value ladder):** OT's job (elite pass-protect demand, high-leverage duty load) yields higher `Vjob` than C's snapping-heavy but differently weighted job in this model; `Gv(C,OT)` becomes the dominant term → a large penalty (≈ cap) without pair-tracking and without naming C>OT. INFERRED until measured against a calibrated football pack, but structurally aligned with Owner's answer (a).

### 2.4 Combination — malleable (Q7)
Expose a tunable combiner with a measured default:
- **Default (INFERRED, evidence-favored):** `R = max(A, β·Gv)` — take the worse constraint (can't do it OR can't cheat it). Prior evidence (REPORTED, Inkling/Muse reviews) found max robust and sum prone to double-counting/scale-mixing under ability+guard layers; default `β=1`.
- **Tuning knob:** `β` (ratio) and optionally an operator mode `blend`: `R = (1-α)A + α·β·Gv` for sensitivity/tuning passes. Because Q7 asks for "adjustable ratio... most malleable so easy to tune", ship `β` (and α if blend mode used) as explicit config, not buried constants. The Owner/game can tune feel without rewriting duties.

### 2.5 Permission, prohibition, and dual positions (Q15, P-336)
- **Dual positions (FREE):** if player `p` holds destination among his own positions, `penalty = 0`. Eligibility overlay, not a formula exception (round-2 Q1: "that is the point of holding both positions"). Assignment by Owner/agent-gathered history (Nakobe Dean MIKE/WILL example) — data task, formula unchanged.
- **Prohibited / forbidden:** if any `d ∈ CORE[j]` has `HAVE[s,d] == 0` (or below a hard floor), OR `R(s,j) ≥ T_forbid` (cap derived from engine natural output, follow-up Q2), the move is **forbidden** (priced as "not allowed" / at cap) — mostly-b. This yields natural prohibitions (goalie/core-keeper duty absent; size/reach core absent for Muggsy-at-center) and fluidity (Jokic-like dual/versatile bodies have the duties, so moves price rather than forbid) without enumerating 190 cases.
- **Formula-priced (c):** otherwise return continuous `R(s,j)` (engine) and `round(R)` integer to UI. Unlisted pairs in today's 99 are not "free by omission" — they are evaluated; most will be forbidden by core/cap, some priced. This satisfies b+c.
- **No cross-side floor, no named exceptions:** if the model is calibrated so cross-side ability/value gaps land high, no `min 6` scaffold is needed (Q10). Any residual disagreement is reported for Owner judgment (feeling, Q20), not encoded as a hidden exception.

### 2.6 Emergent roles and "positions not in the game" (P-338 hook, DL5, big nickel)
Define the job by NEED/CORE/Vjob only; price every candidate source into it. **No neighbor-copy rules** (DL5-as-cheaper-of-DT/EDGE is replaced by a DL5-blitzer NEED profile: rush from stand/3pt, gap integrity, anchor/tackle, modest space — so edges/DTs/ILBs price by fit, DBs/skill players price out). A scheme/role the Owner hasn't specified (e.g. DL5 blitzer) can be proposed by authoring its NEED from "what the job does" — it emerges from the same model (round-2 Q2).

## 3. Gravity — NOW, and part of the formula (P-335, Q8, follow-up Q3)

**What gravity is (role/job concept, portable):** measurable attention/deterrence created by a player/role.
- `GRV_O` (offensive gravity): draws double teams / usage that creates space for others (WR1, dominant big/midfielder). Formal measures (advanced stats): double-team rate, target/usage share under attention, defensive resource allocation, space created (yards/efficiency for teammates when on-field vs off).
- `GRV_D` (defensive gravity): deters high-% actions (rim protector deters at-rim attempts; island corner deters targets) — value for discouraging scoring, not just counting stats. Measures: shot/pass attempts deterred vs expectation, target avoidance rate, completion/efficiency suppression when primary.

**How it enters the formula (concrete proposal):**
1. **As duties in NEED/HAVE:** add `GRV_O`, `GRV_D` (and sport-specific analogs) to `D`. Jobs that rely on commanding attention demand them (WR1 job NEED high GRV_O; lockdown CB / rim-protector role NEED high GRV_D). Bodies/roles supply them by positional concept (elite WR role supplies GRV_O; not per-player intangibles — role-level, consistent with "preferred position" input). This prices "can you provide that gravity in this job?" inside `A`.
2. **As value amplification:** `Vjob[j]` includes gravity weight (jobs whose function is to bend the defense/opponent are more valuable) so `Gv` reflects that a gravity spot is expensive to cheap-fill — gravity becomes part of ingredient (2) as well. This unifies "value of certain positions/double teams" with the anti-cheat layer (a principled, general form of exit/value premium) without hand-authored exit scalars.
3. **Engine + advanced stats (NOW):** instrument per-play/possession events to compute double-team draw, deterrence/avoidance, usage gravity; surface in an advanced-stats section ("gravity" / "attention" / "deterrence" lines) alongside counting stats. **INFERRED implementation detail:** needs event hooks in sim; feasible if the engine tracks target/defender assignment and shot/pass location quality — to be specified as engine work, but the formula contract above reserves the `GRV` channel so engine and flex price share one vocabulary.

**Honesty:** Q8 said exit-premium-like thinking is "hard to consistently get right, easy point of failure" — so gravity must be measured/derived (event-based or role-derived) and bounded by the same unified `A/Gv` machinery, not a fragile hand scalar. That's why it lives as duties+value terms, not a special-case tax.

## 4. Big-nickel (SS2) — P-338 worked example (falls out, no hand rules)

Define a **missing job** `SS2` ("big nickel", 2nd strong safety / heavy nickel DB): closer to box than FS, covers TE/slot, supports run, some deep/help.

**INFERRED NEED[SS2] (football pack sketch, 0-1):** MCOV 0.55, ZCOV 0.55, RNG 0.75, TKL 0.70, RDEF 0.55, CTH 0.40, DEEP 0.35, GRV_D 0.30 (deterrence/support). CORE = {RNG, TKL} (must run/hit in space). `Vjob[SS2]` derived from this load (sits below SS/FS starters, above pure DIME in box value — to be computed, not asserted).

**Who drifts in / priced (INFERRED, from typical role HAVE):**
- **SS → SS2:** very small deficits (SS HAVE covers MCOV/ZCOV/TKL/RDEF/RNG well) ⇒ `M` near 0, `Gv` ~0 (similar job value) ⇒ **~0 (free/near-free)**. Natural.
- **ILB/OLB → SS2:** box skills present (TKL/RDEF) but space-coverage/range/deep (ZCOV, RNG, DEEP, MCOV) deficit ⇒ moderate `A`; value similar-ish ⇒ **mid integer** (priced, fluid).
- **FS → SS2:** range/deep strong, RDEF/TKL a bit lighter ⇒ small-moderate `A` ⇒ **low integer**.
- **CB(slot) → SS2:** coverage fine but RDEF/TKL/box deficit ⇒ **moderate** (fluid but taxed).
- **WR/RB/TE/OL/DL/QB → SS2:** multiple core/large deficits (TKL/RDEF/RNG/coverage combo) and/or value/side mismatch ⇒ `R` hits cap / CORE fail ⇒ **forbidden or at-cap** (prohibited in effect).

**What this demonstrates (answers P-338):** (1) SS2 value = `Vjob[SS2]` from its NEED (no hand number). (2) Natural drifters = roles whose HAVE covers SS2 NEED with low M,S. (3) Flex penalties = `round(R)` per source. (4) Natural prohibitions = CORE absence or `R ≥ T_forbid` (e.g. pure OL lacks RNG/TKL/coverage core → forbidden). All fall out of one definition; nothing SS2-specific was added to the formula.

## 5. Dual positions & late-round seamlessness (P-336, P-337)

- **P-336 (VERIFIED Owner rule):** `penalty(player,dst)=0` if `dst ∈ positions(player)`; else `penalty(role(player),dst)`. Multi-position holders (Travis Hunter CB+WR) play either free. Data: Owner assigns; agents may gather history (e.g. Dean MIKE/WILL) — formula untouched. Prohibitions still apply to non-held positions via §2.5.
- **P-337 (UX, INFERRED proposal aligned to Q6):** keep engine/derivation unchanged; change presentation by draft phase. Rounds 1–10: show effective value `OVR_eff = OVR - round(R)` and flex context for experimentation (GM-sicko depth). Rounds 11+: **one-number, one-click** guidance — rank available players by `OVR_eff` for the roster's highest-need open slot (or best lineup delta), hide penalty math/alternatives, auto-suggest "fill best fit"; user confirms. Same unified numbers, simpler decision surface — "seamless" without dumbing down the model.

## 6. Tensions resolved (prompt D)

| Tension | Resolution in G-QA-D1 |
|---|---|
| Guard needs slot weights; none for other sports (tension 1) | Derive `Vjob` from duty-load (+gravity) inside the sport pack: `Gv = V0*max(0,1-V_s/V_d)`. Portable; no Owner-supplied weights. Football can sanity-check V0 against known value gaps (C→OT) but does not require external weight tables. |
| Merge needs named exceptions; Owner wants none (tension 2) | No pins/waivers. Use max(A,β·Gv) so value covers C>OT-class cases; treat remaining disagreements as reportable residuals (OVR-point deltas) for Owner's feeling-based acceptance (Q20), never encoded. Forbid via CORE/cap, not exception lists. |
| C PBLK pair honest for one design; Owner rejects pairs (tension 3) | NEED/HAVE split with `need(job) ≤ have(native role)` self-consistency; author C job's PBLK as job demand and C body as body supply independently but consistently. No synchronized pair edits — one job definition, one body profile. |
| Floor ugly (Q10) | Dropped. Cross-side cost emerges from large A and/or Gv; if natural output undershoots, tune λ/β/V0/duties (model), not a policy floor. |
| 190 unpriced (Q15) | Evaluated by formula: CORE/cap ⇒ mostly forbidden (b), remainder priced (c). Dual positions overlay gives free own-pair moves. |
| DL5/blitzer specified by hand today (round-2 Q2) | Authored as a NEED profile (a job) ⇒ prices emerge; no neighbor rule. |
| Scale/cap integers (follow-up Q2) | Continuous `R` internal; integer display; `T_forbid`/cap set after observing engine natural output. |

## 7. What to measure / Owner judgment points (feeling-adjustable, Q20)
- **INFERRED/TO MEASURE:** calibrate one football duty pack, compute mean absolute OVR-point error vs 99 (guide) and rank correlation, and list biggest disagreements for Owner to judge (not maximize 99/99). Verify C>OT, TE>OT, QB→FS-only spirit, cross-side magnitudes, and SS2/P-338 outputs.
- **Hold-out/generalization:** leave-one-role-out or hold out families (and SS2/unseen jobs) to check portability of the mechanism, not memorization.
- **Tunable knobs:** `λ` (secondary-gap discount), `β`/blend (ability vs value ratio), `V0` (value scale), `T_forbid` (cap), duty weights `w_d`, and gravity weights — few, explicit, malleable (Q7).
- **Open (Owner/next):** basketball oracle deferred (Q16, agree). Gravity engine instrumentation scope (NOW per follow-up Q3) — spec the event hooks + advanced-stats fields. Exact integer cap/steps after natural output observed (follow-up Q2).

## 8. Summary (one line)
`penalty = 0` if dual-position else `forbid` if core-missing/over-cap else `round( max(M+λS, β·V0·max(0,1−Vjob_s/Vjob_d)) )` over a single sport-pack duty/NEED/HAVE/value model (with gravity), continuous inside and integer outside — unified, tunable, and portable without per-player stats, external weights, floors, pairs, or exceptions.
