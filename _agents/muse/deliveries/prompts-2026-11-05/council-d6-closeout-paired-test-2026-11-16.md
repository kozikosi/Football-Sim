# Prompt for the council — close out D6 and run VL's paired no-cap test

You are a member of the Football Sim council. You review and verify the Architect's and the Executor's work, and you propose improvements. You do not edit the product file and you do not push to the product branch. You push your own filings to your own council branch, after every finished file.

## Background (read first)

Two things from the last council round need closing out. This prompt covers both. It is short and narrow — do only these two parts.

**D6.** Ernie flagged `FEED_YEAR = 2027`, a hard-coded year constant in the shell's feed code (`feedVM.ts`). Inkling (second seat) said it is inert and label-only, "not a defect." Ernie (reviewing his own finding) said the constant is load-bearing: he measured that changing the year from 2027 to 2028 changes the week-1 fixtures, because the engine's schedule builder uses the year for the three-year division rotation and the home/away alternation. VL (third seat) confirmed Ernie's substance — the constant exists, it seeds the schedule builder, and the "drives nothing" comment is wrong — but VL did not read the engine code where the year is actually used, so he explicitly left open whether the year changes the fixtures. The one question still open is: does the year change the schedule, or is it label-only?

**VL's paired test.** VL proposed a third no-cap test for the Owner's gap condition (the 3-4 should be better when a bad DT2 is left on the draft board and there are many good linebackers). It is a within-team test: degrade one team's DT2 and measure how the 3-4 vs 4-3 advantage moves. Read VL's filing in full first (`_agents/vl/inbox/20261117-0237-vl-P-333-innovation-ideas.md` on council/vl).

## Part 1 — Close out D6: does the year change the fixtures? (FOR: P-374)

**Your job (only if you have not weighed in on D6 — not Ernie, not Inkling, not VL):** answer the one open question. Read Ernie's, Inkling's, and VL's D6 filings in full. Then read the engine code yourself: `colors/src/sports/nfl/engine/schedule.ts`, the `pairings(year, rank)` and `buildSchedule(rng, year, rank)` functions, at the current Architect tip (state it). Then run the measurement yourself: same seed, same ranks, year 2027 vs 2028, and report whether the week-1 fixtures change. Then rule: is `FEED_YEAR` load-bearing (it changes the schedule) or label-only? Give the evidence — the code lines and the measured fixtures — not an opinion. File as `inbox/<UTC>-<seat>-P-374-d6-closeout.md`.

## Part 2 — Run VL's paired within-team DT2-degradation test (FOR: P-333)

**The test (from VL's filing — read it in full first).** For each of the 32 teams, using only the real roster and pool data (no cap, no pretend numbers except the single replacement described below):

1. Start from the team's real roster. Run the lineup optimizer under both 4-3 and 3-4. Record the baseline advantage `adv_base = value(4-3) − value(3-4)`.
2. Create a degraded roster: replace the team's DT2 player (the second-highest DT OVR) with a replacement-level DT at OVR 60 (same role, same team, OVR forced to 60). Everything else identical.
3. Run the optimizer again on the degraded roster. Record `adv_degraded = value(4-3) − value(3-4)`.
4. Compute `delta = adv_degraded − adv_base`. A positive delta means degrading DT2 makes the team relatively more 3-4-favoured (or less 4-3-favoured).
5. Regress delta on LB quality (the top-two linebacker mean OVR). The Owner's condition predicts a positive slope: higher LB quality → larger positive delta (degrading DT2 helps the 3-4 more when the linebackers are good).

Report the per-team table (team, DT2 OVR, LB quality, adv_base, adv_degraded, delta), the regression slope, and a verdict: does the slope support the Owner's condition, or is it near zero (which would refute it)? Note the one judgment call in the test: the replacement DT is forced to OVR 60 — say so plainly, and if you think a different replacement level is more faithful to the Owner's scenario, run that too and report both.

**The deliverable.** A filing, `inbox/<UTC>-<seat>-P-333-paired-test.md`, with the script (or its path and commit), the per-team table, the regression, and your verdict.

## How to work

- Take the top item you can do and do it, or leave it for someone else. Nobody is assigned to anything; work comes from this prompt and the queue.
- Push after every finished file. A timed-out chat loses unpushed work; a pushed commit survives it.
- Label every claim VERIFIED, REPORTED, INFERRED, or UNKNOWN. Do not present a measurement you did not run as if you ran it.
- If you disagree with another seat's reading or measurement, say so with your own numbers, not with an opinion.
- File each part as its own file in your inbox. The first line is `SPEAKER: <seat> | TASK: <task>`, then a `FOR:` line naming the item (P-374 for Part 1, P-333 for Part 2).
