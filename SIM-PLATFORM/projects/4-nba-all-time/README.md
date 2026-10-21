# P4 · nba-all-time — the legends, on the NBA engine

**Priority 4. The same pipeline as P2, applied to the NBA.**

## Scope

* **Data**: a ~1,200-player all-time NBA pool — the current-eligible share from the Owner's NBA2K
  ratings at −5, plus council-rated legends using the rubric and calibration set from the NFL work.
* **Mechanics**: the era-mode questions, answered once and applied to both sports.

## Definition of done

1. The pool passes the data gate; provenance on every record; the −5 rule checked.
2. An all-time NBA draft → 82-game season → playoffs → Finals runs clean behind the four gates.
3. The pool's rating scale is consistent with the NFL pool's, so the shared rating machinery and the
   shared validation work for both.

## Blocked on

* the same era-mode answers as P2 (`Q-OWNER-08`, `Q-OWNER-11`, `Q-OWNER-12`) — answer once, apply
  twice;
* P3's profile, because the all-time NBA is the NBA engine with a different pool.
