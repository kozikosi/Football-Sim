SPEAKER: zai | ROLE: High Councillor · Executor | TASK: D.2 — matchup-aware slot values with static truth on the board | DATE: 2026-11-13T22:12Z
FOR: P-345 · the Owner · the Architect

**Position in one sentence (INFERRED, design + VERIFIED prototype half):** hold both truths by **layer** — the draft board shows static Wins forever; the **game-time layer** (the same one the focus lives on) applies the matchup drop to Priority and to the sim — because the Owner's own sentence names the moment ("against a top defensive line", i.e., a game, not a season).

## The shape

- **Board-time vs game-time: game-time.** A board that re-ranked by this week's opponent would make the draft board a weekly slot machine and break the consistency ruling's spirit (the user "takes an action and knows exactly what he is trying to manipulate" — his verbatim logic against flex fluctuation applies identically here). The static board is the season's truth; the game screen carries the matchup.
- **Mechanism (prototype-verified):** the drop is a unit-vs-unit function, `matchup(olUnit, dlUnit) → s ∈ [0.5, 1.5]`, applied where it physically bites: the QB's Priority and the sim's pass channel shrink together when the opposing front wins the line. The prototype implements exactly this for the focus pathway (`focus.ts`); D.2's generalization is the same function read from the opposing roster instead of the focus row. No new layer, no second engine.
- **The size of the drop** — what data sets it: the NFL's own pressure→outcome gradient. Concretely from the P-344 cuts available: team-game pass yards vs opposing sacks-made quartile (the staging has `sacks_allowed` per side, both teams per game — the pairing is free). Steepness = the pass-yards slope across that quartile; the prototype's [0.5, 1.5] band is a placeholder the slope replaces. Named receipt, ~30 lines of Python on the shipped CSV.

## Receipt

- The layer mechanism runs in seven arms (`fwtest-7` goldens assert Priority-moves/Wins-never per row). VERIFIED.
- The steepness receipt: named above, not yet run — filed as the D.8-style cut I will run on request (it is cheap; I ran the two D.8 cuts in this same wave to keep the method honest — see `20261113-2224-zai-D8-data.md`).

## Failure mode

- **Double-counting:** the sim's matchup engine already prices unit-vs-unit inside the game; if Priority ALSO applies the drop, the user sees a QB devalued twice for the same deficit. Guard: the Priority adjustment reads the SAME matchup number the sim uses (one function, two consumers) — then "twice" is consistent display, not double counting.
- **The stale-board trap:** if the adjustment ever leaks onto the board (e.g., a "this week's value" column), the consistency ruling dies in public. The board stays static; this filing refuses that shape even as an option.

## The Owner-question it carries

Is the drop **steep enough to flip decisions** — i.e., may a matchup ever move a QB below WR1 in Priority, or is the adjustment capped to reordering within a position family? My default: cap within family (a pressured QB slides among QBs, never below the RBs) — it preserves "a QB generally still needs to be the most important player" verbatim while keeping the drop meaningful. Consequence of being wrong the other way: the board occasionally tells the user his franchise QB is third-tier, which reads as the board lying.

Cross-references: D.1 (shares the matchup function), D.9 row 1 (slot values as the first fluctuation candidate), Ruling 4 (the opponent-pass funnel is the same leak seen from the defensive side).
