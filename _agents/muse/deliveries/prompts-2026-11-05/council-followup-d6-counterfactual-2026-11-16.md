# Prompt for the council — adjudicate D6, run the sharper no-cap test, and land the L-DT2 law

You are a member of the Football Sim council. You review and verify the Architect's and the Executor's work, and you propose improvements. You do not edit the product file and you do not push to the product branch. You push your own filings to your own council branch, after every finished file.

## Background (read first)

This prompt follows the council round that measured the Owner's gap condition on real data with no cap (FOR: P-333). Four seats measured it and agreed: the condition holds in part. The DT2 half holds (worse DT2 correlates with the 3-4 doing better, correlation about 0.67); the linebacker half is weak (correlation about 0.14); there is no clean threshold. Washington reproduces exactly; Kansas City and Carolina weakened but did not flip. The league-wide bias is essentially unchanged.

Three things from that round need follow-up. This prompt covers all three.

## Part 1 — Adjudicate D6: does FEED_YEAR drive the schedule? (FOR: P-374)

Two seats disagree on Ernie's D6 finding (`FEED_YEAR = 2027`, a hard-coded year constant in the shell's feed code).

- **Ernie** (second-seat review of his own D6): the constant is load-bearing, not label-only. He measured it: same seed, same ranks, year 2027 vs 2028 gives different week-1 fixtures. He cites the engine code: `buildSchedule` passes the year into `pairings(year, rank)`, which uses it for the three-year division rotation (`MATCHINGS[year % 3]`) and the home/away alternation (`(i + j + year) % 2`). The code comment "informational; drives nothing" is false, he says.
- **Inkling** (second seat): the constant is inert and label-only, "not a defect." She says the year is not consulted for schedule generation and only flows into the run config as a label.

**Your job (only if you have not weighed in on D6 — not Ernie, not Inkling):** adjudicate. Read both filings in full. Read the engine code yourself (`colors/src/sports/nfl/engine/schedule.ts`, the `pairings` and `buildSchedule` functions, at the current Architect tip — state it). Run the measurement yourself: same seed, same ranks, year 2027 vs 2028, and report whether the week-1 fixtures change. Then rule: is `FEED_YEAR` load-bearing (it changes the schedule) or label-only? Give the evidence — the code lines and the measured fixtures — not an opinion. File as `inbox/<UTC>-<seat>-P-374-d6-adjudication.md`.

## Part 2 — Run the sharper no-cap test: the draft-board counterfactual (FOR: P-333)

Ernie's innovation filing proposes a better no-cap test than the per-team correlation in Part 1. The per-team correlation answers "do teams with worse DT2s prefer the 3-4?" — a statement about finished rosters. The Owner's condition is about a decision at a pick: "a bad DT2 is left on the draft board and there are many good linebackers." Run Ernie's test.

**The test (from Ernie's filing, `inbox/20261117-0415-ernie-P-333-innovation.md` — read it in full first).** For each team, at its next pick, ask the engine what is available:

1. `candidates(draftState, team)` gives every legal `(player, slot)` with the engine's own `wins` for each. Filter to `role === 'DT'` and take the best available DT2 — call his OVR `d`.
2. Do the same for `role === 'ILB' | 'OLB'` and take the best available linebacker — call his OVR `l`.
3. Compute the team's 3-4-minus-4-3 value twice: once as its current roster stands, and once with the best available DT2 added at his natural spot (`applyPick`). The difference is the DT2 marginal value to that team in each base.
4. The condition becomes a per-team slope: `Δ = [value(3-4) with the DT2] − [value(4-3) with the DT2] − ([value(3-4) without] − [value(4-3) without])`. A negative `Δ` means adding this DT2 helps the 4-3 more than the 3-4 — a good DT2 is a 4-3 asset. A positive `Δ` means the DT2 is worth more in a 3-4.

Use only real pool data and the engine's own value function — no cap, no hypothetical ratings. Build a draft state per team at a chosen round (Ernie suggests the end of round 2; state the round you used). Report the per-team slopes and the league distribution: on how many of 32 clubs is a good DT2 worth more in a 4-3, and by a median of how many units? Compare with the Part 1 roster correlation: do the slopes agree with it, or does the decision-level result differ? If they disagree, the roster correlation is confounded and the decision-level result is the one that matters — say so.

**The deliverable.** A filing, `inbox/<UTC>-<seat>-P-333-counterfactual.md`, with the script (or its path and commit), the per-team slopes, the league distribution, and the comparison with the Part 1 correlation.

Inkling's draft-path test (Proposal A in her Part 4 filing, `inbox/20261117-0210-inkling-PART-4-innovation.md`) is a second, independent no-cap test — run the full draft under a 4-3-only template vs a 3-4-only template, same seed, 25 seeds. If you run that instead of or as well as Ernie's counterfactual, file it the same way.

## Part 3 — Land the L-DT2 battery law (FOR: P-333)

Ernie proposes making the gap condition a permanent regression test instead of a study. Implement it as a law in the node battery:

> **L-DT2:** on the real pool at the current pin, `corr(DT2 OVR, 3-4-minus-4-3 value) < −0.3`, and the two worst-DT2 clubs are not both in the 4-3-favouring half.

Build the law as a script (one file, runnable in the node battery, no browser), run it against the current tip, and report whether it passes. Then run the falsifier: flip one rule (for example, set `EDGE→DT` back to 0) and show whether the law still passes. If it still passes, the law is too weak — tighten the threshold until the known inversion kills it, and report the threshold you landed on. File as `inbox/<UTC>-<seat>-P-333-l-dt2-law.md`, with the script path and commit.

## How to work

- Take the top item you can do and do it, or leave it for someone else. Nobody is assigned to anything; work comes from this prompt and the queue.
- Push after every finished file. A timed-out chat loses unpushed work; a pushed commit survives it.
- Label every claim VERIFIED, REPORTED, INFERRED, or UNKNOWN. Do not present a measurement you did not run as if you ran it.
- If you disagree with another seat's reading or measurement, say so with your own numbers, not with an opinion. Disagreements are useful; smoothing them away is not.
- File each part as its own file in your inbox. The first line is `SPEAKER: <seat> | TASK: <task>`, then a `FOR:` line naming the item (P-374 for Part 1, P-333 for Parts 2 and 3).
