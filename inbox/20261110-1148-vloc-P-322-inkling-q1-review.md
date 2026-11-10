SPEAKER: VLOC | ROLE: Council seat | TASK: Review Inkling-Q1 Q&A-native flex derivation (P-322) | DATE: 20261110-1148Z

REVIEW-OF: council/inkling:inbox/20261110-1142-inkling-P-322-qa-derivation-v1.md
VERDICT: ok

## What I ran

- `git show origin/council/inkling:_agents/inkling/deliveries/qa-derivation-2026-11-10/qa-check.py` → /tmp/qa-check.py
- `git show origin/council/inkling:_agents/inkling/deliveries/qa-derivation-2026-11-10/flex-live.json` → /tmp/flex-live.json
- `git show origin/council/inkling:_agents/inkling/deliveries/qa-derivation-2026-11-10/zai_d1_matrices.py` → /tmp/zai_d1_matrices.py
- `git show origin/council/inkling:_agents/inkling/deliveries/qa-derivation-2026-11-10/qa-output.txt` → /tmp/qa-output.txt
- `cd /tmp && sha256sum flex-live.json` and `cd /tmp && python3 qa-check.py` (full re-run)

## Verified (VERIFIED — I ran it)

1. **Data integrity:** flex-live.json sha256 = `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6` — exactly the sha Inkling cites. 99 rules, 17 roles (C,CB,DT,EDGE,FB,FS,ILB,K,OG,OLB,OT,P,QB,RB,SS,TE,WR). Matches the live 99-rule table.
2. **All fit statistics reproducible:** running `qa-check.py` produces byte-identical output to `qa-output.txt`:
   - A-only (ZAI V4 ability): exact 95/99, off-by-one 3, hard 1 (C>OT 12→2)
   - max(A, G_weights): exact 95/99, off-by-one 3, hard 1 (FB>RB 2→12)
   - max(A, G_v0 demand×scarcity): exact 89/99, off-by-one 8, hard 2 (FB>RB 2→12, C>OT 12→2)
   - blend c=0.25 (G_v0): exact 80/99, off-by-one 17, hard 2
   - Spearman rho v0 vs weight ladder = +0.413 (n=20) — v0 correctly rejected as a value ledger (breaks C>OT=12 anchor: G_v0(C→OT)=0)
3. **Q&A alignment:** no floor (deleted, cross-side ≥6 emerges from ability), no pins (Q9), no pairs (Q12), no intangibles (Q14), OVR + preferred-position inputs only (Q2/follow-up 1), adjustable blend `max(A,G) + c·min(A,G)` with c=0 default (Q7), gravity hook γ_g=0 default, off until Owner switches it on (Q8/follow-up 3), dual-position free within a player's own set (P-336), derived prohibitions not named exceptions (Q15), SS2/big-nickel priced from one NEED row with no hand-written rules (P-338).
4. **C>OT = 12 from the guard natively** (G_weights(C→OT)=12) — matches Owner's Q11 answer (a), value ladder not exit premium.

## Findings (require correction or Owner ruling)

5. **Forbidden-cell count discrepancy.** Inkling's §2.6 says "exactly three cells are forbidden by the rule yet priced by the table: DT>C 6, EDGE>C 6, TE>EDGE 12." The code finds **7**: DT>C=6, EDGE>C=6, TE>EDGE=12, TE>C=6, ILB>EDGE=12, RB>SS=12, RB>FS=12 (all confirmed by reading flex-live.json directly). Inkling undercounts by 4. The other 4 (TE>C, ILB>EDGE, RB>SS, RB>FS) are also prohibition conflicts the Owner must rule on (§3-2 disagree-ledger). Not a design flaw, but the narrative understates the ruling surface.
6. **"Off-by-one" is tier-index, not raw points.** `report()` compares `abs(tier_index(pred) - tier_index(live)) == 1`, so 6→12 (tier indices 2→3) counts as "off-by-one" though the raw gap is 6 OVR points. Inkling's narrative ("C>OG 6→12", "FB>TE 6→12") should state this is tier-adjacent, not a 1-point miss, to avoid misleading a reader.
7. **Design only.** Inkling explicitly does not build; the Architect implements. No product file touched, no constants re-pinned — correct per P-322 being design-only.

## Bottom line

Inkling-Q1 is a coherent, Q&A-consistent derivation: one unified model (ability + value ledger, adjustable blend), no floor/pins/pairs/intangibles, portable value ledger (engine-measured or const-bootstrap for new sports), derived prohibitions, dual-position free. All claimed measurements are **VERIFIED reproducible** from the shipped code + live 99 table. Corrections 5–6 are narrative clarity, not substance. P-322 needs two more reviews from seats other than inkling/vloc to reach REVIEWED.

Labels: VERIFIED (sha, 99 rules, all fit statistics via re-run of qa-check.py; direct flex-live.json reads for the 7 conflict cells) · UNKNOWN (Architect's implementation, Owner's three rulings: §3-2 FB cells, §6-T7 prohibition conflicts, §6-T3 gravity on/off).
