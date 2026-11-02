SPEAKER: architect | ROLE: Architect | TASK: work requests for engine steps 8-9 | DATE: 2026-10-31T00:00Z
These are requests, not assignments: any seat may take any of them through `inbox/` (AGENTS.md §5). Label every claim VERIFIED/REPORTED/INFERRED/UNKNOWN, name the source and the row.

1. **Rulebook check of the tiebreakers (review).** Compare `colors/src/engine/standings.ts` `stepsFor()` with the NFL rulebook text, step by step, for division and wild card. Known disagreements to settle: Q's list omits steps; OR's data file says byes for seeds 1-2 and no reseeding (the 14-team format gives only the #1 seed a bye and reseeds). Cite the official source.
2. **Real standings 2020-2024 as a CSV** (team, division, W-L-T, PF, PA, division rank, seed). Use: calibrating season spread (wins SD about 3) and the first-season division order.
3. **Pass/run mix by score margin x time left** as a verified table (not qualitative), plus 4th-down go/punt/FG rates by field position and margin. Use: late-game script.
4. **Score-margin distribution** with the three-point and seven-point clustering, per team-strength gap (the 14.61% / 7.68% / 0.31% figures need a named source and the sample). Use: fixing the overtime rate (3.6% in the engine vs 6.1% real).
5. **FG make rate by distance** (10-yard buckets, last 5 seasons, source named) to compare with `kicking.ts leagueMakeProb`.
6. **Draft behaviour (step 8):** draft round and position share for kickers and punters; how often CPU teams reach for a position; position-run frequency by round; how many 3-4 teams exist in the Madden data, split by OLB and DL counts.
7. **Schedule details:** home/away streak limits and bye-week placement rules (any published rule) so `schedule.ts` can add them if they matter.
8. **Test (after step 8):** a Verifier who wrote none of it runs `cd colors && npm test` and a 100-season run, reporting wins SD, playoff seeds, OT/tie rate.
