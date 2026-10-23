# P2 · football-all-time — the same engine, the legends

**Priority 2 (the Owner's). The cheapest possible second pack: identical engine, different pool.**

## Scope

- **Data**: a ~1,200-player all-time NFL pool (see [`../../DATASET.md`](../../DATASET.md)).
- **Mechanics**: the era mode — how an all-time draft works, what the "−5 for current players" rule
  means in the maths, whether teams are today's teams or historical ones.
- **Implementation**: stage 1 of [`../../ARCHITECTURE.md`](../../ARCHITECTURE.md) — named datasets
  (`current`, `alltime`) and an active-pool switch inside the existing single file, then a mode
  toggle in the UI. No engine extraction is required to ship this.

## Definition of done

1. The all-time pool passes `tools/validate-dataset.mjs` (schema, coverage, histogram, the −5 rule,
   provenance).
2. A full all-time draft → 17-week season → playoffs → Super Bowl runs with zero console errors,
   and the 100-season report renders (the same dynamic gate, on the all-time mode).
3. The current mode is **bit-for-bit unaffected**: the same protected symbols, the same gates, the
   same results for the same seed.
4. The mode toggle is one click, obvious, and reversible.

## Blocked on

- the Owner's answers: `Q-OWNER-08` (the −5 rule), `Q-OWNER-11` (teams and eras), `Q-OWNER-12`
  (era effects on the maths), `Q-OWNER-13` (how an all-time draft differs as a _game_).
