# T7 — Standings tiebreak chain (NFL-legal, multi-team-safe)

File: `NFL Draft Simulator.html`. Target: `sortStandings()` (~3112), `divisionStandings()` (~3120), `computeSeeding()` (~3123). Current chain: win pct → pairwise H2H → point differential. Problems: point diff intervenes too early; a 3-way H2H circle has no legal order; missed NFL criteria.

Steps:
1. Extend the stored standings row in `computeStandings()` (~3091) with precomputed `{divRec:[w,l,t], confRec:[w,l,t], h2hWinPctByOpp}` accumulated during the season loop (cheap during the existing schedule pass).
2. New chain (NFL order, each only applies when it separates teams):
   a. win pct · b. H2H — but ONLY for pairs whose season series is decided AND fully played (2 games) · c. division record (only intra-division ties) · d. conference record (inter-division + wildcard ties) · e. common-games record when ≥4 non-division common opponents tie · f. point differential LAST.
3. Multi-team safety: when ≥3 teams tie on the step-a test, first try applying the chain to the whole group; if the group remains knotted at a step (e.g., H2H circle), SKIP that step for that group (it's ill-defined) and continue deeper — never let array sort order leak into the outcome. Final fallback after f: sum of strict records vs. common opponents? No — final fallback = coin-flip hash (`hashInt`) for determinism, documented.
4. Wildcard gate: `rules.seeding` — the 1-seed is always div winner with the best a-e record among div winners (never diff). Same chain.
5. Tests: three-way circle fixture (A beat B, B beat C, C beat A, all 9–8, different div records) must not rank the loser of the circle above via H2H alone; two wildcard 10–7 teams from different conferences/divisions with no common opponent must separate on conf record before diff. Add to `pw4.js` post-sim assertions: no season log shows a team eliminated from the playoffs despite better div/conf record at the applied gate.
6. Done-when: chain order in code matches this doc; 10,000-season tie audit in `pw4.js` shows div winners resolved by the chain and zero diff-based short-circuits on a round-1 test vector.
