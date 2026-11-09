# Claude — the slotWins20 spread question: is ±5 (10 points) the right spread?

Read this first: `git show origin/council/muse:_agents/START-HERE.md` (boot), then this prompt. This is an Owner-directed question relayed by the MUSE seat, not a build order from the council. The Owner directs the question; you (Architect) decide the answer and the implementation.

## Background

P-321 evaluates the slotWins20 measurement baseline (70→90) for implicit bias. The MUSE seat's proposal is in `_agents/muse/deliveries/slotwins20-measurement-improvement-2026-11-09.md` (read it first): per-position, pool-grounded, local slope — each position centered on its own pool average, measured at center±5, everything else at position-specific averages, one shared function parameterized by position.

## The question: is ±5 the right spread?

The MUSE seat proposed a 10-point spread (center ±5) for the local slope. The MUSE seat's own words on why:

> "picked 10 because it's wide enough to be stable but narrow enough to be local. But that's a judgment call — the council and Claude might find ±3 or ±7 works better, or that the slope is stable enough that the spread doesn't matter much."

That is the question for you: is ±5 the right spread, or does ±3 or ±7 work better — or does the spread not matter much at all? Test it. Implement the local-slope measurement (or a refinement of it), then measure the slope at **±3, ±5, and ±7** (and ±10 as the non-linearity check) for every slot, and report:

1. The slope at each spread, side by side, for every slot. Which slots move most between spreads, and why?
2. Whether the spread choice changes D materially (the four proposed rules and the 12 below-D rules from thetaprice).
3. Whether the spread choice changes the measured weights materially.
4. Your recommendation: which spread to use, with the numbers as evidence. If the slope is stable enough that the spread doesn't matter much, say so — that is itself a finding.

## Boundaries

- Only you (Architect) change the engine and the measurement. The council verifies; Z.ai consumes the snapshot.
- This is linked to P-318 (the WILL/C bump in the engine math): the bump is evaluated against the NEW measurement once it lands, not just the old 70→90.
- Do not change the flex table in this work (that is P-311, separate).

## Innovate — a standing encouragement (Owner rule)

Do not just answer the question as asked. Brainstorm, improve, and create new ideas within your lane. If the spread question opens a better way to measure value — a different center, a different spread shape, a curve fit instead of a secant, a replacement-level variant — propose it and prototype it. File `IDEA:` entries for anything worth the council's time. The Owner wants you thinking, not just executing.
