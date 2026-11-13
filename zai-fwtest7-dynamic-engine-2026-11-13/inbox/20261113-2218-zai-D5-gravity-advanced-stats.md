SPEAKER: zai | ROLE: High Councillor · Executor | TASK: D.5 — gravity, double-teams, and the advanced-stats surface | DATE: 2026-11-13T22:18Z
FOR: P-345 · the Owner · the Architect

**Position in one sentence (REPORTED + INFERRED):** the double-team is already measured by the gravity fold (P-335) and its real-data defect is already diagnosed (P-346 B2: the staged WR1 target share 0.3287 vs real ~0.21 — the staged star over-concentrates, i.e., the fold's gravity is TOO STRONG, not missing); so this filing's new work is the **surface**, not the math.

## What the user sees (the ADVANCED STATS sketch — the verbatim requirement: "doubleteams drawn should be available for the user to see in the advanced stats section")

- **The card:** "DOUBLE TEAMS DRAWN — <WR1 name>: 4.2 per game (most in the league)". One row per doubled receiver, ranked, integers-plus-one-decimal per the display law (one decimal is Wins/Priority's allowance; a count like "4×" can be pure integer — my default: **integer count of double-teams drawn**, because the verbatim ruling says "double teams drawn", an event count, not a rate).
- **The season view:** same card, aggregated — "Drawn 58 double-teams this season (2nd most)". Two surfaces, one number, consistent (the consistency ruling applies inside ADVANCED STATS too).
- **The game view:** the event log already carries the fold's engagement events (P-350 proposes them as log entries) — the game screen lists them in the drive strip, not a separate panel: "3rd-and-6: WR1 doubled, checkdown completed". Narration, not instrumentation, on the game screen; the numbers live in ADVANCED STATS.
- **By whom (the sketch's third line):** "Doubled by: bracket (2×), bail (1×), push (1×)" — the fold's engagement type is the natural vocabulary, and it costs nothing (the fold already computes which defender arrangement engaged).

## How gravity fluctuates by situation (the verbatim ask: close game, weak CB1, rivalry, key WR1)

- The fold's parameters become context inputs through the **context snapshot** (Part B's law — one mechanism for every fluctuation, never per-feature plumbing): `gravity_mult = f(gameState close/late, opponent CB quality, playoff flag, WR1 status)`. Ruling 4's funnel semantics apply: more doubles = the opponent's pass-defense economy leaks toward the WR1, which is the funnel widening, not a penalty bolt-on.
- **Calibration target (the receipt, on the record):** the P-346 B2 finding gives the real anchor — real WR1s draw ~7.0–7.7 targets/team-game and the staged fold gives 0.3287 share vs real ~0.21. The situation-multiplier set is accepted iff the staged-vs-real gap CLOSES on held-out seasons without breaking the between-team SD = λ budget law. That is the same fixed-vs-fluctuating test shape every D.9 row uses.

## Receipt

- REPORTED: P-346 Phase 2 v2 (my delivery, council-reviewed) — B2 finding + the HHI numbers (0.1921–0.2042), the WR2 deep share 0.204–0.222 waiting on `air_yards` (C.2 cross-ref).
- The surface sketch: this filing (design-only). The consumption blocker: C.2's `air_yards` spec — the fold cannot consume depth until the Ledger emits it; **no proxy invented** (the standing rule).

## Failure mode

- **Instrumentation-as-feature:** ADVANCED STATS quietly becomes a second game model the user optimizes against (stack +3 WRs so doubles vanish). Guard: the advanced-stats card is display-only — the fold's inputs are the rosters, not the user's stats-page behavior; and the double-team count must never appear where a flex/roster decision is made.
- **The thin-data trap:** a 17-game season gives each receiver ~17 engagement events; per-game "by whom" splits are single digits — show season aggregates by default, per-game only in the drive strip narration (which is qualitative).

## The Owner-question it carries

Integer count or rate (per game, one decimal)? Verbatim says "double teams drawn" — I read event count, integer. Consequence if you meant rate: the card reads "4.2/game" instead of "4" — one decimal, no new math, reversible at display time. My default stands: integer.

Cross-references: C.2 (air_yards blocker), D.9 row 8, Ruling 4 (funnel semantics), Part B snapshot law (the fluctuation mechanism).
