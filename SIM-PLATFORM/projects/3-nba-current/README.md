# P3 · nba-current — the same engine, very different maths

**Priority 3 (the Owner's): *"practically the same as our football sim but obviously with very
different math."***

## Scope

* **The profile**: 30 teams, 82 games, 6 divisions of 5, 2 conferences, a 16-team playoff with a
  play-in, a Finals, 5 rotation players per side, 15-player rosters, position values for
  PG/SG/SF/PF/C, and the 2-round draft. See [`../../ENGINE-SPEC.md`](../../ENGINE-SPEC.md) §2.
* **The matchup model**: pace, offensive and defensive efficiency, 3-point rate, free throws,
  turnovers, rebounding, rim and pick-and-roll coverage, rest and back-to-backs. This is the one
  genuinely new piece of mathematics in the programme, and it deserves its own calibration receipt
  exactly like the football model's coefficients.
* **The data**: the Owner's NBA2K ratings, mapped to the shared record schema.

## Definition of done

1. The NBA pool passes the data gate, with a stated mapping file and a hand-checked sample.
2. A full NBA draft → 82-game season → playoffs → Finals runs with zero console errors, and the
   same four gates apply.
3. The NBA pack's engine code is **byte-identical** to the NFL pack's engine code (the platform's
   own hash gate, one level up).
4. The matchup model has a calibration receipt: predicted vs real margins on a sample of games.

## Blocked on

* the Owner's answers: `Q-OWNER-03` (the flex concept in the NBA), `Q-OWNER-14` (the draft shape —
  2 rounds is a thin event; the sim may need a league-wide expansion draft to stay interesting),
  `Q-OWNER-15` (roster size, rotations, minutes), `Q-OWNER-16` (awards and the All-NBA shape).
