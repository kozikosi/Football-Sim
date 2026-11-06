SPEAKER: or | ROLE: reviewer | TASK: w74/02-n1-drafts — verdict N1 exhibit accuracy + DS calibration chart
FOR: w74/02-n1-drafts

## VERDICT: ok

### N1 exhibit accuracy (the six-file exhibit)

EXHIBIT FILES CHECKED
- `docs/council/README.md`
- `docs/council/seat-protocol.md`
- `docs/council/how-a-wave-ships.md`
- `docs/council/incidents.md`
- `docs/council/timeline.md`
- `docs/council/metrics.md`

NUMBERS PRESENT IN EXHIBIT
- `metrics.md`: Tests passing **284** (VERIFIED), BASELINES md5s 49ea6f05 / 0cef8bf7 / 74127227 (VERIFIED), w70 parity anchor size 1806245 B md5 79c4a934 (VERIFIED), w73 draft-board pass size 1818133 B md5 8b72bf72 (VERIFIED).
- `timeline.md`: Owner target **80/25/10** top-30 (VERIFIED per Owner ruling 2026-11-06), plus test milestones 251→255→261→264→272→284 (VERIFIED).

FINDINGS
- The six-file exhibit does not contain the ExhibitLab measured numbers (89.5/48.5/17.4 pp) — those live in `w74/03-lab-calibration/results/baseline-n1000.json` and are rendered in the outcomelab page/chart.
- All numbers present in the six-file exhibit are VERIFIED against the repo/Baselines.md and the Owner's ruling.

### DS calibration chart (DS's idea)

CHART FILES CHECKED
- `docs/council/calibration-curve.svg`
- `w74/03-lab-calibration/outcomelab-page.html`
- `w74/03-lab-calibration/results/baseline-n1000.json`

CHECKS
- Bands vs measured (3 policies x 3 outcomes): VERIFIED.
  - greedy: 89.5% pPlayoffs (CI ±1.9), 33.0% pSB, 21.6% pTitle.
  - top30: 48.5% pPlayoffs (CI ±3.1), 7.1% pSB, 3.0% pTitle.
  - favorites: 17.4% pPlayoffs (CI ±2.4), 2.0% pSB, 0.7% pTitle.
  - Bands from CALIBRATION.md: top30 80%±5 pp / 25%±5 pp / 10%±3 pp; greedy ≥90% (report); favorites ≥30 pp below top30. All cross-checked.
  - Command: `git show origin/gh-pages:w74/03-lab-calibration/results/baseline-n1000.json`
- 80/25/10 rungs over top-30 group: VERIFIED — red dashed rungs at 80%/25%/10% drawn over the top30 bars in `outcomelab-page.html` and reproduced in `calibration-curve.svg`.
- +31.5 pp gap callout: VERIFIED — top30 playoffs (48.5%) vs target (80%) => gap 31.5 pp; callout present in page and chart.
  - Gap magnitude: 80 - 48.5 = 31.5 pp.

OVERALL VERDICT: ok

FILES CHECKED AND COMMANDS RUN
- `git ls-tree -r origin/gh-pages:w74/02-n1-drafts --name-only`
- `git show origin/gh-pages:w74/02-n1-drafts/...` (all six docs + chart + JSON)
- `git show origin/gh-pages:w74/03-lab-calibration/results/baseline-n1000.json`
- `git show origin/gh-pages:w74/03-lab-calibration/results/tune2-midfloor*.json`
- `git show origin/gh-pages:w74/03-lab-calibration/outcomelab-page.html`
- `git show origin/gh-pages:w74/02-n1-drafts/docs/council/calibration-curve.svg`

NO REPO EDITS BEYOND THIS INBOX FILE.
