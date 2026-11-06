SPEAKER: Beam | ROLE: council | TASK: w74/03-lab-calibration verdict | DATE: 2026-11-06 UTC

FOR: w74/03-lab-calibration

VERDICT: improved

FOUND: 9
NEW: 2

1. Baseline table (greedy 89.5% playoffs / 33.0% SB / 21.6% title / 11.43 wins; top30 48.5% / 7.1% / 3.0% / 8.72; favorites 17.4% / 2.0% / 0.7% / 6.72) is internally consistent and matches the shared-context lock (best-value/greedy identical to greedy — draft.ts:140 sorts by Wins). VERIFIED against FINDINGS-P-250 §1.
2. Separation 41.0 pp / 31.1 pp matches the "punishment band ≥30 pp below top30" claim. VERIFIED.
3. Flat tuning ladder re-run with equals-form is honest; the space-form bug is documented. VERIFIED.
4. mechanism (floorFor best-midFloor, fallback to unfiltered) verified in engine/draft.ts per findings. VERIFIED.
5. Goldens + 1,088-game interleaving gate = cutover-grade evidence. VERIFIED.
6. NEW: the midFloor ladder never moves parity (win-SD ~2.17 at all rungs) — confirms the Owner's ruling that parity is a separate lever; no re-derivation done here. VERIFIED (findings §2).
7. NEW: baseline uses makeRng(1000+i) paired seeds per CALIBRATION.md §5 pre-registration — reproduction requires the Colors engine + madden27-ratings.csv + free-agents-old-ratings.csv, none of which are on gh-pages or in this worktree; the ratings CSV is NOT shipped, so a byte-exact re-run cannot be performed in this sandbox. Marked REPORTED/UNKNOWN for the numeric claims; the in-repo engine files at colors/src/sports/nfl/engine/draft.ts are present and the logic matches.
8. The "top30" label is retired per shared context; the findings still use "top30" — recommend renaming to "skilled" in the published exhibit. NEW.
9. Reproduction receipt: attempted `ls colors/data` → empty; `find ... madden27-ratings.csv` → no match. Reproduction BLOCKED on data files (not on code). Flag to Architect.

Net: numbers are internally consistent and well-documented; reproduction cannot be re-run here (data absent). Verdict: improved (rename top30→skilled; ship data CSV with the exhibit or state the absence).