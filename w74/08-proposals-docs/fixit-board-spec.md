# Fix-It Board — spec (w74 item 8g, Z.ai's w73 F2 idea) — SPEC ONLY (the F2 ruling has not landed)

## What it is

One screen, one job: **show the user exactly where their roster is worst, ranked by damage, with the specific
players to blame.** "Worst rooms" = the user's weakest units vs the league; "worst contributor seasons" = the
individual players dragging those units. The board's promise to the Owner: after a draft or a season, the user
never has to ask "what should I fix?" — this screen answers it in one look.

## The inputs (and the one open dependency)

| Input | Source | Status |
|---|---|---|
| Unit OVR vs league per unit (OL run/pass, RB, QB, receivers, pass rush, front run, coverage, kicker, returner) | the frozen `Ratings` the week payload already carries (`ratings: Record<team, Ratings>` — the engine's own unit keys, RATING_KEYS in weekmap.ts) | **AVAILABLE NOW** — no new data; the screen is buildable the moment the season screens exist |
| Unit rank (1–32 per unit) | derived: sort the 32 teams' Ratings per unit | derived, free |
| Per-player OVR + season `_rating` | per-player OVR is in the roster; season `_rating` (the engine's season performance score) is produced by the season engine | **BLOCKED on the F2 ruling** — whether per-player season stats join the save payload (the "stats payload home" ruling; SeasonPayload today carries no player stats) |
| Contributor floor (~40% of games played) | per-player games-played — same F2 dependency | same |

## The logic (frozen now, so the F2 ruling only turns it on)

1. **Damage score per unit** = (league mean OVR for the unit − user's unit OVR) × the unit's WEIGHT (the
   engine's own `WINS_PER_UNIT` / value weights — the same weights the draft board already uses, so the board
   and the Fix-It board can never disagree about what a unit is worth).
2. **Rank the 9 units by damage**, show top 3 as "worst rooms": each card = unit name, user OVR, league rank
   (e.g. "Coverage — 74 OVR, 29th of 32"), and the damage in wins (-2.1 wins vs league mean).
3. **Inside each worst room**, the player rows that explain it, ordered by season `_rating` ascending, filtered
   to contributors (≥40% of games) — each row: name, pos, OVR, season rating, and the delta vs the unit's
   league-mean slot. These are the names the user replaces in next year's draft — the board LINKS each row to
   the draft board's filter (the same player id the draft board keys on).
4. **Tone rules:** semantic only (good/neutral/bad per the VM pattern) — the screen renders the VM's tones, the
   theme owns colours. No number is shown the engine did not produce (contract law).

## The display

One screen (`Screen: 'fixit'` — an additive member when it lands), three worst-room cards at the top, the full
9-unit table beneath, and — when F2 lands — the per-player contributor rows inside each card. The VM is two pure
functions (`fixitUnitsVM(payload)` now; `fixitPlayersVM(payload)` when stats join), following the same pattern as
view/season.ts.

## What the F2 ruling changes (and only that)

- **Stats join the payload** (F2 yes): cards 1–3 gain their contributor rows, the floor applies, done.
- **Stats stay engine-side** (F2 no): the board ships with UNITS ONLY (rooms + ranks + damage) — still the
  product's "what do I fix" answer, with a header note "player blame arrives with season stats" — and the spec
  above stays on the shelf until the Owner changes his mind.

**Needs ruling:** F2 itself (stats payload home). Nothing else: the unit-level half needs no ruling and can be
built with the season screens.
