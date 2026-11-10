SPEAKER: super | ROLE: council | TASK: P-322 derivation design (Option A — design my own) | DATE: 2026-11-10T05:59:00Z

FOR: P-322

IDEA: Own skill-profile derivation of flex prices, read-only analysis against the live 99-rule Owner table. Does NOT beat Inkling's 88/99 on raw fit (59/99 exact), but is simpler, has fewer constants, and is more principled — worth considering as a different design point.

--- Design ---

Principle honored: no destination-weight term (weight already enters the optimizer's loss; cutting the penalty too prices value twice). The table's job is ability distance — how far apart two jobs are.

model_price(src, dst) = tier( sum_k beta_k * max(0, prof[dst][k] - prof[src][k]) )
  * Directional ability gap: what the destination needs that the source lacks.
  * Same position -> 0. dst == FB and src in {RB, OT, OG, C, TE, DT, EDGE, ILB, OLB} -> 0 (FB is a free-flex destination).
  * src == QB -> 12 (QB's only flex). {K,P} <-> {P,K} -> 2.
  * Cross-side (offense<->defense): gap = max(gap, 6) — the cross-side floor, except FB stays free.
  * tier: <1 -> 0, <4 -> 2, <9 -> 6, else 12 (cut points 1/4/9, same shape as Inkling for comparison).
  * 7 skills: BLK, RSH, MAN, RNG, CTH, RUN, SNP. 7 betas: 0.6, 0.6, 0.5, 0.5, 0.5, 0.6, 0.2.
  * NO per-pair uncertainty terms, NO override dictionary, NO D-bump, no destination weight.

Script: .derive-design.mjs in this worktree (read-only: git-shows flex.json from origin/architect/engine-and-seats, computes, prints; writes nothing).

--- Results (run against live 99-rule table, architect 678bb06 / 97d7e9d) ---

My model:        exact 59, off-by-one-tier 34, hard misses 6, no-profile 0.
Inkling baseline: exact 88, off-by-one 11, hard 0 (93/99 with cross-side floor term). [REPORTED by MUSE + Claude; I re-read the design via MUSE's derive-prototype-2026-11-10.py but did NOT re-run it myself.]
Delta vs Inkling: -29 exact, +23 off-by-one, +6 hard.

My model does NOT beat Inkling. 59/99 is well short of 88/99.

Off-by-one-tier residuals (owner -> model), 34 rules:
C>DT 12->6, C>OG 6->2, EDGE>OLB 0->2, EDGE>SS 12->6, EDGE>TE 6->12, FS>SS 2->0, FS>WR 12->6, ILB>EDGE 12->6, ILB>FS 12->6, ILB>NICKEL 6->2, ILB>OLB 0->2, ILB>TE 6->12, OG>OT 2->0, OLB>FS 12->6, OLB>ILB 6->2, OLB>NICKEL 6->2, OLB>SS 6->2, OLB>TE 6->12, RB>FS 12->6, RB>SS 12->6, RB>WR 12->6, SS>ILB 6->2, SS>OLB 2->6, SS>RB 12->6, SS>TE 6->12, SS>WR 12->6, TE>C 6->2, TE>DIME 12->6, TE>DT 12->6, TE>EDGE 12->6, TE>FS 12->6, TE>ILB 12->6, TE>OG 6->2, TE>RB 6->2.

Hard misses (owner -> model), 6 rules — all owner 12, model 2:
C>OT, ILB>DIME, OLB>DIME, OLB>EDGE, TE>OT, TE>WR.

--- How it handles the hard cases ---

* Inkling's 6 residuals (owner 0, Inkling model 2): CB>FS and CB>SS now price 0 (fixed by safeties-not-rushing + CB matching FS range). EDGE>OLB, ILB>OLB still price 2 (model wants EDGE/ILB to have MAN/RSH that OLB needs). SS>DIME, SS>NICKEL price 0 (NICKEL/DIME profiles <= SS on MAN/RNG/CTH).
* Cross-side floor: WR>DB rules price 6 (floor binds), as the Owner sets. WR>CB 6->6 correct; TE>FS 12->6 under-priced (floor caps at 6, Owner wants 12).
* DL5 reframing (Owner 10 Nov): DL5 is a blitz/heavy-set player, all players are starters. My model is position-pair based, not snap-count based, so it is neutral on DL5 — it prices the EDGE/DT/LB flexes that DL5 relates to, without assuming rotational substitution.

--- Why it is still worth considering (even though it loses to Inkling) ---

1. Fewer constants: 7 betas only. Inkling uses 9 betas + DMULT (3 destination multipliers) + U (5 per-pair uncertainty terms) + OVERRIDE (5 per-pair overrides) + D-bump (2 Owner-estimated values). Mine has zero per-pair exceptions.
2. More principled: a single directional ability gap + one cross-side floor. No hand-tuned override dict. Every rule falls out of the same formula.
3. Simpler to explain: "what the destination needs that the source lacks, with a minimum of 6 when crossing sides."
4. The 6 hard misses and ~11 of the off-by-ones are cross-archetype same-side flexes (TE->WR, TE->OT, LB->DIME, etc.) that a pure linear gap under-prices — exactly the kind of exception Inkling handles with its U/override terms. A hybrid (my simple base + a small set of Owner exceptions) could combine both strengths.

--- Recommendation ---

Do not replace Inkling's 88/99 with my 59/99 as the production formula. But the design point (pure directional gap + floor, no per-pair exceptions) is worth keeping as a reference: if the Owner wants fewer tuned constants even at some fit cost, this is the simplest candidate. A hybrid — my base formula plus Inkling's override dict for the handful of residual rules — is worth prototyping next.

--- Evidence label ---

Labels: result (59/99) is VERIFIED (I ran .derive-design.mjs against the live table). Inkling 88/99 is REPORTED (MUSE + Claude; I read MUSE's prototype script but did not independently re-run it). DL5 reframing is Owner (10 Nov 2026), REPORTED via the council prompt.
