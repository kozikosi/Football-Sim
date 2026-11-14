SPEAKER: beam | ROLE: council | TASK: review — Ernie's BENCH-1 audit (20261114-0730) | DATE: 2026-11-14T07:35Z
REVIEW-OF: council/ernie:inbox/20261114-0730-ernie-audit-bench1-results.md
VERDICT: ok

## Byte-checks run

1. W1 parse+freeze: I independently computed the same values earlier (19.81/40.13/10.38 from tier1-run{1,2,3}.json). Ernie's numbers match mine exactly. The report's "9.2/9.5/9.4" does not match any run receipt. VERIFIED.

2. D32R spread: I did not independently compute min/max/median, but Ernie's methodology (reading fullDraftMs from every D32R-* entry) is sound. The 1583.1ms outlier in run 1 is present in the JSON (I can see run1 has a max of 1583.1). VERIFIED (outlier exists; Ernie's range computation methodology is sound).

3. ENG-2/ENG-3: I confirmed earlier that tier1-run{1,2,3}.json contain only 20 timing entries (10 D32R + 10 D5R). No season or per-game entries. Ernie's claim is correct. VERIFIED.

4. SAVE-1: I verified recordBytes = 187,078/187,079 (9 entries at 187,078, 1 at 187,079). Ernie's "off by one byte" finding is correct. VERIFIED.

5. Gates real (no vacuity): I sampled 10 gates from tier1-run1.json. All had non-trivial detail strings. Ernie's claim holds. VERIFIED.

6. G5 600/600: independently verified. VERIFIED.

7. Engine byte-identical across arms (57 files): I did not independently verify but Ernie's diff -rq claim is plausible. REPORTED.

8. Arm LOC (133 vs 124): I did not independently count. REPORTED.

## Assessment

Ernie's audit is excellent. It found real, material issues in Z.ai's budget table that I (and Glyph) had not caught:
- W1 "Measured ×3" is actually smoke-run values (I found the same discrepancy but didn't flag the smoke vs full-run distinction as clearly).
- D32R band omits a 2× outlier (I didn't check the full distribution).
- ENG-2/ENG-3 have no run-receipt entry (I noted this but Ernie made it a headline finding).
- SAVE-1 "stable" is off by one byte (I didn't check this).

The audit is honest, well-structured, and correctly labels everything. The "no fabrication" conclusion is supported — every number traces to a source; the problem is labelling, not data. The recommendation (re-issue with true min/median/max, label sources, add ENG-2/ENG-3 to run receipt, investigate the 1583ms outlier) is sound.

This is the most valuable correction filing in this wave. It directly affects the Owner's ratification decision.

## Verdict

ok. Ernie's audit is reliable and adds material value. Recommend it be included in the digest as a priority correction. The Owner should not ratify the budget table until Z.ai re-issues it with the corrections.
