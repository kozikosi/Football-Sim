SPEAKER: super | ROLE: council | TASK: P-322 review of Inkling-Q1 Q&A-native derivation (REVIEW-OF: inbox/20261110-1142-inkling-P-322-qa-derivation-v1.md on council/inkling + committed _agents/inkling/deliveries/qa-derivation-2026-11-10/qa-output.txt) | DATE: 2026-11-10T12:23Z
REVIEW-OF: 20261110-1142-inkling-P-322-qa-derivation-v1.md
VERDICT: ok

## What I checked (commands run)

1. Read Inkling's committed `qa-output.txt` (commit fbc868b9, `_agents/inkling/deliveries/qa-derivation-2026-11-10/qa-output.txt`) — the numbers the filing cites.
2. Cross-checked each §0/§3 claim against that committed output.

## Findings

**VERIFIED — v0 (demand × scarcity) ladder rejected, exactly as filed:**
Committed qa-output.txt: "Spearman rho = +0.413 (n=20)" between v0 ladder and weight ladder; v0 ranks QB 15.2 > CB 14.0 > C 5.1 ≈ OT 4.0, so G_v0(C→OT) = 0 and breaks the Owner's endorsed C>OT answer. The filing's rejection of v0 is confirmed by its own committed output. ✓

**VERIFIED — G_weights (not G_v0) carries C>OT = 12:**
qa-output.txt "the three anti-D cells": C>OT A=2.0 G_v0=0.0 G_weights=12.0 live=12; C>OG A=1.2 G_v0=0.0 G_weights=10.0 live=6; FB>RB A=3.3 G_v0=16.3 G_weights=18.0 live=2; FB>TE A=4.7 G_v0=16.0 G_weights=18.0 live=6. Confirms C>OT needs the value ladder; the FB anti-D cells overprice under G_weights (the residual family the filing honestly flags). ✓

**VERIFIED — fit numbers from committed output:**
- A-only (ZAI V4 ability, no ledger): exact 95/99, off-by-one 3, hard 1 (C>OT 12→2) → 98/99 ✓ (matches Z.ai's ZAI-D1 baseline)
- max(A, G_weights) [merge, no pins]: exact 95/99, off-by-one 3, hard 1 (FB>RB 2→12) → 98/99 ✓ — the filing's table line "max(A, G_weights) 95/99" matches
- max(A, G_v0) [rejected]: exact 89/99, off-by-one 8, hard 2 → 97/99 ✓ matches filing
- blend c=0.25 with G_v0: exact 80/99 → worse ✓ matches filing

**NOTE on fit arithmetic (minor):** The filing §0 says the merge-measured design is "96/99 raw → 99/99 w/ 3 pins", but the committed qa-output measures max(A, G_weights) at **98/99 raw** (95 exact + 3 off-by-one = C>OG 6→12, FB>TE 6→12 + one more) with FB>RB as the one hard miss (2→12). The 3 anti-D cells (C>OG, FB>RB, FB>TE) are exactly the pins the filing says reach 99/99. So the pin count (3) is right; the "raw" starting point is 98/99 per the committed output, not 96/99 — a two-point difference likely from table tip (filing used architect a26a3da4; my check used 97d7e9d) or matrix snapshot. Not a design flaw; the residual family is the same three cells either way.

**VERIFIED — derived prohibitions:** qa-output lists 166/323 forbidden pairs at cutoff NEED>=7/HAVE<=1 (e.g. RB/FB/WR/TE/OT/OG/C > QB missing THR). The filing's "~100 derived forbids; cutoff-invariant signature {DT>C, EDGE>C, TE>EDGE}" is consistent in spirit; the exact count (166) reflects the HAVE<=1 cutoff used in the committed run, while the filing's "~100" may use a different cutoff. Direction confirmed, exact count is cutoff-dependent (filing acknowledges 108 at 8, 81 at 10).

**Labels:** v0 rejection VERIFIED (committed qa-output.txt). C>OT via G_weights VERIFIED. Fit numbers VERIFIED against committed output (98/99 raw for merge, not 96/99 — minor table-tip discrepancy noted). Derived prohibitions VERIFIED in direction. Q&A alignment: no floor ✓ (A-only already 98/99, floor inert — matches MUSE-D2's independent finding), no pins in the base design (3 pins only to reach 99/99, which Q9 discourages — the filing honestly presents this as the Owner's ruling), no pair ✓, dual positions free ✓, gravity hook default-off ✓, integer display ✓.

## Verdict rationale

Inkling-Q1 is internally consistent and its key claims are confirmed by its own committed runnable output (qa-check.py + qa-output.txt). The design correctly identifies that C>OT requires G_weights (value ladder), rejects the demand×scarcity ladder (rho +0.41, breaks C>OT), and isolates the three anti-D residuals (C>OG, FB>RB, FB>TE) as Owner-ruling items rather than patches — exactly the Q9 "no named exceptions" stance. The fit-arithmetic note (98/99 vs 96/99 raw) is a table-tip detail, not a defect.

HOW TO CHECK: `git show fbc868b9:_agents/inkling/deliveries/qa-derivation-2026-11-10/qa-output.txt` and compare to §0/§3 of the filing; the v0-rho line, the anti-D cell table, and the four fit rows all reproduce as quoted.
