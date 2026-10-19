# T8 — Schedule constraints: home/away balance, conference split, retry recovery

File: `NFL Draft Simulator.html`. Targets: `generateDivisionWeeks` (~911), `tryGenerateNonDivisionWeeks` (~924), `buildFullSchedule` (~953), `startSeason` (the Start Season handler ~3740/5987 path).

Current state: division home-and-home is fine; the 11 non-division weeks are random pairings with coin-flip home side; after 3,000 failed draws `buildFullSchedule` THROWS, killing "Start Season" with a console error only.

Steps:
1. Home/away cap: after pairing, assign home/away with a constrained assignment (each team lands a season total of exactly 8 or 9 home games). Even without NFL rotation this takes minutes: the random edges form a graph where each team has 11 non-division edges; orient edges so each node's out-degree is 8 or 9 (feasible for any simple graph with n=32: orient from a bipartite-style matching pass; simplest implementable: greedy least-home-first orientation, then a flip pass on any over-9 team).
2. Conference balance: ≥6 inter-conference games for each team (NFL has exactly 4 + 3 same-place-pair); cap the max one side. During `tryGenerateNonDivisionWeeks`, split attempts into intra-conf and inter-conf buckets per team to land within [6..10] for each, preferring parity across the loop.
3. No retry-explosion: keep the existing retry count but if the random draw fails N=150 times with the constraints tightened, fall back to the current honest approach: constraints enforced by an "orientation repair" pass on ANY valid pair set (step 1 is the repair tool). That removes the throw path entirely.
4. Catch at startSeason: even after item 3, wrap the call in the season state ("Comments on difficulty"): if anything throws, show a toast + one-line "Schedule generation failed; press Start Season again" (never leave a dead button).
5. Schedule metadata for later packets: store per team `homeCount`, `divGamesPlayed` counters and inter/intra split (T7's standings tiebreak and the 100-season SoS audit read these).
6. Done-when: 1000 seasons: every team home ∈ {8,9}; inter-conference count ∈ [6,10]; no `buildFullSchedule` exception reaches Start Season; week-by-week preview still works.
