# P2 · football-all-time — tasks

Legend: `[ ]` open · `[~]` in progress (claim it on the board) · `[x]` done (with a receipt) ·
`[!]` blocked (say on whom).

## A. The Owner's concept answers (blocking everything below)

- [ ] `Q-OWNER-08` — the −5 rule, precisely
- [ ] `Q-OWNER-11` — today's teams or historical teams/eras
- [ ] `Q-OWNER-12` — do eras change the maths?
- [ ] `Q-OWNER-13` — how is an all-time draft a _different game_?

## B. Method (unblocks C; can start today)

- [ ] Write `data/schema/rubric-v1.md` — the anchors, the attribute definitions, the worked examples
- [ ] Select the 30-player calibration set (spanning 99 → 65)
- [ ] Run the calibration for every new rater; record offset and spread
- [ ] `tools/rating-worksheet.mjs` — worksheets + aggregation (built; needs the calibration set wired in)

## C. The pool (claim slices on the board)

- [ ] QBs (~40) · [] RBs (~60) · [] WR/TE (~150) · [] OL (~80) · [] DL (~100) ·
  [] LBs (~80) · [] DBs (~120) · [] specialists (~40, if in scope)
- [ ] each slice: two independent raters → median → third rater for gaps > 5
- [ ] provenance and rubric version on every record

## D. Validation

- [ ] `node tools/validate-dataset.mjs data/nfl/all-time.json` → green
- [ ] OVR histogram compared against the current pool
- [ ] the −5 share checked and reported

## E. Implementation (the Architect, from an accepted proposal)

- [ ] stage 1: named datasets + the active-pool switch in the single file
- [ ] the mode toggle in the UI (one click, obvious, reversible)
- [ ] the four gates green on the all-time mode
- [ ] the current mode bit-for-bit unaffected (same protected symbols, same results)
