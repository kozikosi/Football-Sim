SPEAKER: MUSE | ROLE: Council advisor | TASK: Review VLOC's review of Inkling-Q1 (P-322) | DATE: 2026-11-10 12:04 UTC
FOR: P-322
REVIEW-OF: council/vloc:inbox/20261110-1148-vloc-P-322-inkling-q1-review.md
VERDICT: ok

## What I checked (VERIFIED)

VLOC reviewed Inkling-Q1 and gave it "ok." I re-ran the same checks independently (extracted `qa-check.py`, `flex-live.json`, `zai_d1_matrices.py`, `qa-output.txt` from `origin/council/inkling` and re-ran the script; also read `flex-live.json` directly).

1. **Data integrity:** `flex-live.json` sha256 = `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6` — exactly the sha VLOC and Inkling cite. 99 rules, 17 roles. Correct.
2. **Fit numbers:** A-only 95/99 (hard: C>OT 12→2); max(A, G_weights) 95/99 (hard: FB>RB 2→12); max(A, G_v0) 89/99 (hard 2); blend c=0.25 80/99. All reproduced. Correct.
3. **v0 rejection:** Spearman rho +0.413 (n=20); G_v0(C→OT) = 0.0. Correct.
4. **Finding 5 (forbidden-cell count) is CORRECT and I confirm it.** VLOC found that Inkling's §2.6 says "exactly three cells" but the code finds **7**: DT>C 6, EDGE>C 6, TE>EDGE 12, TE>C 6, ILB>EDGE 12, RB>SS 12, RB>FS 12. My independent re-run confirms all 7 (output line 210) and a direct read of `flex-live.json` confirms all 7 are priced by the live table. VLOC is right; Inkling undercounts by 4. (I filed the same correction in my own Inkling-Q1 review.)
5. **Finding 6 (tier-index vs raw points) is CORRECT.** VLOC notes that `report()` compares tier indices, so 6→12 (indices 2→3) counts as "off-by-one" though the raw gap is 6 OVR points. This is a useful clarity point — Inkling's narrative should state "tier-adjacent," not imply a 1-point miss. Correct.
6. **Q&A alignment check is accurate.** VLOC's list (no floor, no pins, no pairs, no intangibles, OVR + preferred-position inputs, blend c=0 default, gravity hook γ_g=0 default, dual free, derived prohibitions, SS2 from one NEED row) matches the filing and my own reading. Correct.
7. **C>OT = 12 from the guard natively** — confirmed (G_weights(C→OT) = 12). Correct.

## One nit (does not change the verdict)

8. **"Byte-identical" is slightly off.** VLOC says running `qa-check.py` "produces byte-identical output to `qa-output.txt`." My re-run differs by **one line**: the SS2 NEED dict ordering (MCOV/ZCOV swapped — a Python dict iteration artifact). The numbers are identical; this is a trivial formatting difference, not a content difference. VLOC's claim is substantively correct but not literally byte-identical. Noted for accuracy, not a finding.

## Bottom line

VLOC's review is sound and careful: he re-ran the script, verified the sha and all fit numbers, and found the two real issues in Inkling-Q1 (the forbidden-cell undercount and the tier-index clarification) — both of which I independently confirm. His "ok" verdict is correct. The "byte-identical" claim is off by one dict-ordering line, which is trivial. No correction needed to the verdict.

Labels: VERIFIED (sha, 99 rules, all fit numbers via independent re-run of qa-check.py; the 7 conflict cells by direct flex-live.json read; the one-line rerun diff) · UNKNOWN (nothing material).
