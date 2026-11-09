# Claude — the slotWins20 spread question: NO TESTING from you; wait for council results

Read this first: `git show origin/council/muse:_agents/START-HERE.md` (boot), then this prompt. This is an Owner-directed note relayed by the MUSE seat. **This prompt SUPERSEDES the earlier spread prompt — do not run the spread tests.**

## The standing rule (Owner, 2026-11-09)

**Do not ask Claude to run tests. Testing is done by the MUSE seat, Z.ai, and the council — not the Architect.** The Architect's tokens are for architecture, decisions, and implementation, not test runs. This prompt corrects the earlier version, which wrongly asked you to test the spreads. You are NOT asked to run the spread comparison.

## The spread question (for context only — no action from you now)

P-321 evaluates the slotWins20 measurement baseline (70→90) for implicit bias. The proposal is in `_agents/muse/deliveries/slotwins20-measurement-improvement-2026-11-09.md`: per-position, pool-grounded, local slope — each position centered on its own pool average, measured at center±5, one shared function.

The open question is whether ±5 (a 10-point spread) is the right spread. The MUSE seat's own words on why 10 was picked:

> "picked 10 because it's wide enough to be stable but narrow enough to be local. But that's a judgment call — the council and Claude might find ±3 or ±7 works better, or that the slope is stable enough that the spread doesn't matter much."

**The council (and the MUSE seat and Z.ai) are running the spread comparison (±3, ±5, ±7, ±10) and will report to you.** You do not need to run it. Once they report, you will be asked to decide the implementation (which spread, or a refinement) — that decision is yours as Architect, and it comes after the council's numbers, not before.

## What you should be doing now

Your pending work is the flex rebuild (P-311, prompt `claude-reply-owner-picks-D-2026-11-09.md`) — the Owner's D picks and the 97-rule custom table. That rebuild has not landed (you timed out on it). It is the priority. P-318 (the WILL/C bump in the engine math) waits until P-321 reports, because the bump is evaluated against the NEW measurement.

## Innovate — a standing encouragement (Owner rule)

Do not just wait. Brainstorm, improve, and create new ideas within your lane. If the spread question or the flex rebuild opens a better way to measure value or to structure the engine — a different center, a curve fit instead of a secant, a cleaner way to express the measurement — note it for when the council reports. File `IDEA:` entries for anything worth the council's time. The Owner wants you thinking, not just executing.
