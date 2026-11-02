SPEAKER: MUSE | ROLE: Council Advisor | DATE: 2026-11-02T09:45:00Z

# PITCH: Tension graph — playoff probability, purely visual (for Z.ai / council)

FOR: P-213

**Origin:** Owner, 2026-11-02 (amused design session). "The tension graph is a good idea in the last few weeks of the regular season as it might be unclear if you'll make the playoffs or not. But no words — this would have to be purely visual."
**Status:** pitch — not a work order.

## Concept

In the final weeks of the regular season, a **purely visual** playoff-probability curve lives on the season hub. No words. No numbers. No "75%". The line's position, slope, and color tell you everything: am I in, am I out, and is it slipping away?

## The design (no words means no words)

- **The curve:** weeks 15–18 on the x-axis (ticks only, no labels). Y is playoff probability, 0–100%, with no numeric marks.
- **The line:** a ribbon in the user's team colors, area beneath filled with a team-color wash. It draws itself with a shimmer sweep when the week advances.
- **The threshold:** one horizontal gold shimmer line — the playoff cut. Above it you're in; below, you're out. Crossing it is the entire drama of the feature.
- **Color logic:** the ribbon rides in full team-color saturation above the line; below it, desaturated and muted. Near the line (±5%), it pulses — tension made visible.
- **The present:** a single glowing dot marks the current week. No "Week 16" text. The dot is now.
- **Motion:** on week advance, the new segment draws itself; if the line crosses the threshold, the crossing point blooms gold once. Reduced-motion: the final state, no draw.

## How probability is computed (no new engine needed)

Monte Carlo from the current state: sim the remaining season K times (seeded), count playoff berths. The engine sims a full season in ~88 ms; a remaining-season sim is cheaper. K=200 gives a stable estimate in well under a second — or compute incrementally as the user watches. All existing machinery; this is a new *view*, not new math.

## Placement and lifecycle

- Appears week 15 on the season hub (and optionally the standings page). Before week 15 it doesn't exist — the feature arrives exactly when the question becomes real.
- Disappears at season end (elimination or Super Bowl), when the answer is known.
- Teams already clinched or eliminated: the line sits flat at top or bottom. Honest, not hidden — a flat gold line at the top is its own reward.

## Hard requirements

- **Zero words, zero numbers.** This is the Owner's explicit constraint and the feature's identity. If a label seems necessary, the design is wrong — rethink the visual.
- **Team colors via theme only** (Owner's standing rule). The gold threshold line is earned: it marks the playoffs.
- **No words includes the empty states.** Clinched = line at top in gold. Eliminated = line at bottom, muted. Both wordless.
- **Performance:** compute on week advance, cache the curve; never block the UI thread (the sim is already fast enough, but keep it off the critical path).

## Open questions for Z.ai's design

1. Should the curve show all 18 weeks (with the first 14 dimmed) or only 15–18? (Recommend: only the last 4 — the feature is about the stretch run, and a short ribbon reads better.)
2. Bubble teams vs. locked teams: does the pulse near the threshold risk visual noise for a 16-0 team? (The flat-line states handle this, but check.)
3. Should opponents' tension be visible (e.g., the team chasing you)? Recommend no — this is *your* tension, wordless and personal.

## Evidence labels

- INFERRED: the visual design (proposal); the Monte Carlo cost estimate (from the 88 ms/season figure — needs a device check per contract Q5)
- VERIFIED: none (no implementation)
- REPORTED: none
