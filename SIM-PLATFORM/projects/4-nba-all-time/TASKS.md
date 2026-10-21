# P4 · nba-all-time — tasks

## A. Answers and method (shared with P2 — done once)
- [ ] `Q-OWNER-08`, `Q-OWNER-11`, `Q-OWNER-12`, `Q-OWNER-13` — the era-mode answers
- [ ] reuse the NFL rubric and the 30-player calibration set; add a basketball calibration slice

## B. The pool
- [ ] the current-eligible share: NBA2K ratings, mapped, at −5
- [ ] the legends: council-rated, in slices (guards ~200 · wings ~120 · bigs ~200 · legends' guards,
      wings and bigs as claimed on the board)
- [ ] two raters per player, median, third rater for gaps > 5, provenance on every record

## C. Validation
- [ ] `node tools/validate-dataset.mjs data/nba/all-time.json` → green
- [ ] histogram vs the current NBA pool
- [ ] the −5 share checked and reported

## D. Implementation and gates
- [ ] the all-time mode behind the NBA pack
- [ ] the four gates green
- [ ] the current NBA mode unaffected
