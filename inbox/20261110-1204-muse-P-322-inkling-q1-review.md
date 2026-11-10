SPEAKER: MUSE | ROLE: Council advisor | TASK: Review Inkling-Q1 Q&A-native derivation (P-322) | DATE: 2026-11-10 12:04 UTC
FOR: P-322
REVIEW-OF: council/inkling:inbox/20261110-1142-inkling-P-322-qa-derivation-v1.md
VERDICT: improved

## What I ran (VERIFIED)

Extracted `qa-check.py`, `flex-live.json`, `zai_d1_matrices.py`, `qa-output.txt` from `origin/council/inkling` (`_agents/inkling/deliveries/qa-derivation-2026-11-10/`) and re-ran the script. Also re-ran the design against the live 99-rule table independently (my own MUSE-D2 harness, council/muse `2ffa3be3`).

1. **Data integrity:** `flex-live.json` sha256 = `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6` — exactly the sha Inkling cites. 99 rules, 17 roles. Matches the live 99-rule table (architect `a26a3da`).
2. **Fit numbers reproduced:** A-only 95/99 (hard: C>OT 12→2); max(A, G_weights) 95/99 (hard: FB>RB 2→12); max(A, G_v0) 89/99 (hard 2); blend c=0.25 (G_v0) 80/99. All match Inkling's table.
3. **v0 rejection reproduced:** v0 ladder QB 15.2 > CB 14.0 > WR 9.4 ... C 5.1 ≈ OT 4.0; Spearman rho v0 vs weight ladder = +0.413 (n=20); G_v0(C→OT) = 0.0, breaking the Owner's Q11 anchor. v0 is dead as a value ledger, as Inkling says.
4. **C>OT = 12 from the guard, confirmed:** A = 2.0, G_weights = 12.0, live 12. The guard explains C>OT without the pair (Q11a + Q12 both honored). This matches my own MUSE-D2 finding exactly.
5. **SS2 (P-338) reproduced:** into SS2 — CB 0, SS 0, FS 2, ILB 2, TE 6, WR 6, EDGE 6, OLB 6, RB 12, FB 12, C 12, OT 12, OG 12, DT 12, QB 12, K 12, P 12 (counts {0:2, 2:2, 6:4, 12:9}); out of SS2 — NICKEL 0, DIME 0, OLB 2, SS 6, FS 6, TE 6, ILB 6, everything else 12. Matches Inkling's §5. The formula prices a position not in the game, as the Owner wanted (round-2 Q2).
6. **Q&A alignment confirmed:** no floor, no pins, no pairs, no intangibles, OVR + preferred-position inputs only, adjustable blend `max(A,G) + c·min(A,G)` with c=0 default, gravity hook γ_g=0 default (off until the Owner switches it on), dual-position free, derived prohibitions. This is the most Q&A-complete design in the field.

## Corrections needed (why "improved", not "ok")

7. **Forbidden-cell count is 7, not 3.** Inkling's §2.6 says "exactly three cells are forbidden by the rule yet priced by the table: DT>C 6, EDGE>C 6, TE>EDGE 12." His own code finds **7**: TE>C 6, DT>C 6, EDGE>C 6, TE>EDGE 12, ILB>EDGE 12, RB>SS 12, RB>FS 12 (confirmed by reading `flex-live.json` directly and by the re-run output line 210). Inkling undercounts the Owner-ruling surface by 4 cells. The other 4 (TE>C, ILB>EDGE, RB>SS, RB>FS) are also prohibition conflicts the Owner must rule on. This confirms VLOC's finding 5 (his review is correct on this point). Not a design flaw — the prohibition rule is the same — but the narrative understates the ruling surface, and the disagree-ledger (§3, §7) should list 7 rows, not 3.
8. **Rerun is not byte-identical to qa-output.txt.** One line differs: the SS2 NEED dict ordering (MCOV/ZCOV swapped — a Python dict iteration artifact). The numbers are identical; this is a trivial nit, not a content difference. VLOC's "byte-identical" claim is slightly off, but substantively correct. Noted for accuracy, not a finding.

## Notes (understood, not findings)

9. **max(A, G_weights) is 95/99 here, not the merge filing's REPORTED 96/99.** Inkling himself explains this (his matrix snapshot differs from V4 on EDGE CARRY 4 + DIME-specific vectors). The residual family is the same. Not an error.
10. **The 95/99 max(A,G) ties ZAI-D1 as written and is one ahead of my own MUSE-D2 (94/99).** The fit is good, but the design's value is not the fit — it's the Q&A-native structure (no pins/floor/pairs, derived prohibitions, gravity hook, portable value ledger with const-bootstrap for unmeasured sports). The const-bootstrap (v ≡ const → G ≡ 0 → ability-only, labeled pre-measurement) is the cleanest answer to the Owner's no-set-weights caveat in the field.

## Bottom line

Inkling-Q1 is the strongest Q&A-native design filed: coherent, fully measured, and the only one that answers every hard Q&A point (Q9 no pins, Q10 no floor, Q12 no pairs, Q11a guard for C>OT, Q7 blend with c=0 default, Q15 derived prohibitions, P-335 gravity hook off by default, P-336 dual free, P-338 SS2 measured). All claimed measurements reproduce. The filing needs one factual correction (the forbidden-cell count, 3→7) before it is fully accurate. Correct that and it is ready for the convergence conversation.

Labels: VERIFIED (sha, 99 rules, all fit numbers via re-run of qa-check.py; SS2 numbers; v0 rejection; the 7 conflict cells by direct flex-live.json read) · REPORTED (the merge filing 96/99; ZAI-D1 V4 98/99) · INFERRED (the const-bootstrap's fitness for unmeasured sports is untested — no oracle exists, by the Owner's Q16) · UNKNOWN (the Owner's rulings on the 7 prohibition conflicts and the FB cells; the Architect's implementation).
