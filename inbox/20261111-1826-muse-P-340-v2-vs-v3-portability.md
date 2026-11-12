SPEAKER: MUSE | ROLE: High Councillor | TASK: P-340 / council prompt Q4 — V2 vs V3: which merged form ships, and what decides it | DATE: 2026-11-11
FOR: P-340

# IDEA: V2 vs V3 is decided by the Owner's per-slot C>OG ruling, not by the fit — and V3 costs nothing extra to port

**The question (council prompt §3 Q4):** the merged derivation sits at V2 96/97 and V3 97/97 (per-slot). Is there a more beautiful single formula hiding in it, or is max-of-two-layers the shape? And which form ships — especially for a new sport, where the formula must work without Owner-provided weights?

## The two forms, stated exactly (VERIFIED — merge design doc + MUSE's v2 review)

| | V2 (exposure guard) | V3 (per-slot min-collapse) |
|---|---|---|
| Price | `max(M + λS, E·G)`, G = `20·(1 − v_src/v_dst)` | V2 + per-slot destination anchoring: compute the guard per destination slot and take the min |
| Fit (λ=0.4) | 96/97, mae 1.38, 0 under-priced, sole residual C>OG | **97/97**, mae 1.30, 0 under-priced |
| Full 99 (with self-rules) | 98/99 | **99/99** |
| At λ=0.2 | 86 exact, mae 1.16 (the LOO refit lands here) | not reported separately — the λ objective question affects both |
| Inputs | ability layer (M, S from the 17-duty HAVE/NEED tables) + E (source role's play share, measured from the Ledger) + v (slot values, measured from the sim) | V2's inputs + per-slot destination values v (the engine already measures v per slot via localWins20) + one min operation |

**One fitted constant survives (λ). Everything else is measured: v from the sim (P-321), E from the Ledger.** E is the source role's play share from Ledger Phase 1 (FB 0.1265, OLB 0.7106 slot-weighted, DIME 0.0694, every other source role 1.0 or near it). The exposure guard can only pull a price DOWN toward ability, never above the plain guard — the direction of error is safe by construction (Pickle's observation, demonstrated across all 97 rows).

## The finding: V3's extra point is entirely the C>OG row, and it is the min over guard spots

V2's single miss is C>OG at 12 vs the Owner's 6 (6 points over on one row; the merge doc's §5 already prices the Owner's options for it). V3 fixes it by the min-collapse: for the OG destination, the guard is computed per slot — OG1 (v 400) gives G = 20·(1 − 150/400) = 12.5 → tier 12; OG2 (v 250) gives G = 20·(1 − 150/250) = 8 → tier 6 — and the min (8 → tier 6) is taken. So **V3's 97/97 is the claim that a centre flexing to guard prices at the cheaper guard spot.**

That is exactly the open Owner call (per-slot C>OG: does his 6 mean either guard spot or the cheaper one?). Until he rules:

- **If his 6 means the cheaper spot, V3's 97/97 is principled, not fitted** — the min is the right mechanism (a centre takes the cheaper guard job), and V3 is the form to ship.
- **If his 6 means either spot, V3's extra point is an artifact of the min** — and V2 (96/97, one mechanism fewer) is the honest form, with the C>OG row carried as the known one-row residual the merge doc already prices.

**The portability cost of V3 over V2 is ~zero.** V3 needs no new measurement: per-slot v already exists in the engine's slot table (32 slots, distinct localWins20), and E is source-role-level in both forms. The per-seat E table C1 ships (`c1_per_team_e_input.csv`, 320 team-seasons × 30 seats) is the same measurement at finer granularity — the fold already emits it. For a new sport, both forms need the same three things: duty tables (authored per sport — the one authored input), slot values v measured from that sport's sim, and E measured from that sport's personnel/snap shares. V3 adds one min operation. There is no separate "V3 needs per-slot E" burden — the min is over the destination's v, not over E.

## Recommendation (a recommendation, not a decision — the Owner decides)

1. **Do not choose V2 vs V3 on fit.** 96 vs 97 is one row, mae 1.30 vs 1.38 is small, and the Owner does not care about meeting the 99 — the most portable formula wins. The choice is decided by the per-slot C>OG ruling, which is already an open Owner call. Ask it as: "does your 6 mean the cheaper guard spot, or either spot?" — and the answer picks the form.
2. **Ship the max-of-two-layers shape, not a new single formula.** I looked for a more beautiful single formula hiding in the merge; I do not see one that preserves both properties the merge buys: the ability layer prices the football side (duty gaps do not care how often you play) and the guard prices the arbitrage side (which is a phenomenon of playing time). A single formula would have to fuse a football price and a time price into one number, and the fusion is exactly what the max does, legibly. The max is the shape; the min-collapse is a one-line refinement of the guard's destination side, not a second shape.
3. **The λ objective (0.40 tiers vs 0.20 mean error) is a separate Owner call and affects both forms equally** — V2 at λ=0.2 is 86 exact / mae 1.16; the tier-count drop at λ=0.2 is the known shape of the trade-off, not a V2-vs-V3 difference. Do not let the λ call masquerade as a V2-vs-V3 call.

## What would change my mind

- If the Owner rules his 6 means either guard spot, V3's min is wrong for C>OG and V2 is the form (with the one-row residual documented, not hidden).
- If a new sport's slot table has destination roles with only one slot each (no multi-slot destinations), V2 and V3 coincide exactly — the min is a no-op and the choice vanishes.
- If someone shows a single formula that keeps the guard's zero-under-priced structure AND the ability layer's fit without the max, that beats both — but it must be demonstrated on the 97, not asserted.

— MUSE · V2/V3 numbers VERIFIED from the merge design doc (`MERGE-DESIGN-2026-11-11.md` in the v3 delivery) and MUSE's v2 review (a0311f25); the C>OG arithmetic (12.5 vs 8 → tiers 12 vs 6) recomputed by hand from the engine slot values (C 150, OG1 400, OG2 250); the per-slot-v-exists claim VERIFIED from the engine slot table (32 slots, distinct localWins20).
