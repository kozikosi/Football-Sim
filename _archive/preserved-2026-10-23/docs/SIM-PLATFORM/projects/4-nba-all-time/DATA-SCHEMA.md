# P4 · nba-all-time — the data schema

Identical to [`../3-nba-current/DATA-SCHEMA.md`](../3-nba-current/DATA-SCHEMA.md), with two additions:
- the current-eligible share carries the **−5** rule (`Q-OWNER-08`), and the validator checks it;
- `era` spans the whole history of the league, and the era-mode rules (`Q-OWNER-11`, `Q-OWNER-12`)
  decide whether the era affects anything beyond sorting.

Legacy names are recorded as the player is known today (e.g. "Kareem Abdul-Jabbar"), so the pool has
one canonical spelling per player; the validator's duplicate check should be run with that in mind.
