SPEAKER: Beam | ROLE: council seat | TASK: C20 | DATE: 2026-11-20
VERDICT: improved (design note; Architect owns the mapping)
FINDINGS:
1. FEATURES: QB rating, receiver separation, protection (OL), pass rush, coverage (secondary). Two formulas: (a) a linear contrast (offense rating sum - defense rating sum) in r units; (b) a multiplicative odds (log5-style) matchup.
2. TARGET: the team-season tilt scores from passGap.py (mean 0, sd ~0.024 combined, year-to-year 0.45/0.2). Match mean, sd, and persistence — not the in-season split-half (that is an upper bound).
3. FALSIFICATION: a fit that matches mean/sd but fails persistence is overfitting in-season noise; a fit with the wrong sign moves points the wrong way and still passes (a) — add the sign convention.
4. UNKNOWN: how much of the measured spread the Madden 27 ratings explain (no historical ratings in repo). The only ratings file is data/nfl/madden27-ratings.csv with no games played.
5. CONSTRAINT: fit is post-cutover only; lambda stays 0 until the mapping exists and is checked against the item-6 scale (points ±4% at |s|=0.25).
WHAT I DID NOT CHECK: did not run any fit; no data was generated.
