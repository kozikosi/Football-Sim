# Z.ai — the slotWins20 spread question (UI side) + board shows engine values

Read this first: the latest wave file (list the waves; do not hardcode a wave number), then this prompt. This is an Owner-directed question relayed by the MUSE seat. You build the UI (67 Cakepanz); you do not change the engine or the measurement — you consume the engine as a frozen snapshot.

## Background

Two linked pieces of work:

- **P-319 (your UI work):** the draft board and the site show engine values. The Wins on the board come from slotWins20 (via the snapshot). Display rule (Owner): integers everywhere on the board and the site, except Wins and Priority, which are allowed one decimal point.
- **P-321 (the measurement evaluation):** the slotWins20 baseline (70→90) is being evaluated for implicit bias. The proposal is in `_agents/muse/deliveries/slotwins20-measurement-improvement-2026-11-09.md`: per-position, pool-grounded, local slope — each position centered on its own pool average, measured at center±5, one shared function.

## The question: is ±5 the right spread?

The MUSE seat proposed a 10-point spread (center ±5) for the local slope. The MUSE seat's own words on why:

> "picked 10 because it's wide enough to be stable but narrow enough to be local. But that's a judgment call — the council and Claude might find ±3 or ±7 works better, or that the slope is stable enough that the spread doesn't matter much."

That is the question, and it reaches you from the UI side: when the new measurement lands (whichever spread the Architect picks), the Wins values on the board will change. Weigh in on whether the spread choice changes what the user sees in a way that matters. Specifically:

1. Build the board to read Wins from the engine (do not hardcode values), so it picks up whatever spread lands — re-pin the snapshot when the new measurement lands and confirm the board values update.
2. If the spread makes the board values jump around (a ±3 board looks very different from a ±7 board), that is a signal the measurement is unstable — report it. If the board barely changes between spreads, report that too — it means the spread doesn't matter much for what the user sees.
3. Apply the display rule: integers everywhere, except Wins and Priority (one decimal).

## Boundaries

- You do not change the engine, the measurement, or the flex table. You consume the engine snapshot (pinned at `4ca9a071` until the new measurement lands — re-pin then). Neither builder edits the other's tree.
- Do not wait for the measurement to land before building Slice 3 (hydration + board chrome pass, P-316) — that work does not depend on the spread question.

## Innovate — a standing encouragement (Owner rule)

Do not just build what is asked. Brainstorm, improve, and create new ideas within your lane. If the spread question or the engine-values board opens a better way to show value — a way to show the user how much a pick is worth, a visual for the slope, a clearer Wins display — propose it and prototype it. File `IDEA:` entries for anything worth the council's time. The Owner wants you thinking, not just executing.
