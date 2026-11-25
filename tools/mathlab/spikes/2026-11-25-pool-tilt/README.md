# Pool-tilt spike (25 Nov 2026, Architect). THROWAWAY: not product code, not a test, not a realism check.
Run from the repo root (Node 22.23.5; needs data/nfl):
`node --experimental-strip-types tools/mathlab/spikes/2026-11-25-pool-tilt/moment.ts <leagueSeed> [kPass,kRush,kTD,kFG] [topPools]`
`tiltgame.ts` is a copy of `colors/src/sports/nfl/sim/game.ts` at `8ae4bc30` plus an `opts.sampler` hook. It will drift; do not build on it.
Constants `0.85,0.85,1.5,0.5` were chosen by hand on league seed 777 (7 settings, plus the all-pools vs top-40 choice); seeds 4242 and 9001 were not used to choose them.
32 pairs per league; legacy engine 20,000 sims per pair; play engine 4,000 games per pair; home field 0.

## Output, held-out seed 4242, top 40 pools per play type
```
off switch: zero tilt reproduces the untilted log hash on 50 games: true
rows per table 2750/1533/101 TOP 40
league seed 4242 k 0.85,0.85,1.5,0.5 pools used 40/40/40
 channel mean abs rel error [passY, rushY, give, sacks] [ 0.0297, 0.0403, 0.0174, 0.022 ] | max|g| 1.35 | ESS p50/p1/min 0.994/0.852/0.325
 PER-PLAY achieved vs target, mean abs rel error [passY/db, sack/db, give/db, rushY/car] [ 0.0059, 0.0117, 0.0159, 0.019 ]
 wp { slope: 0.959, intercept: 0.019, corr: 0.9041 } mean|d| 0.0241 max 0.0631
 margin { slope: 1.081, intercept: -0.057, corr: 0.8965 }
 solve ms per matchup (both teams) 2.66 | newton iters per solve 3.0
```
## Output, held-out seed 9001
```
off switch: zero tilt reproduces the untilted log hash on 50 games: true
rows per table 2750/1533/101 TOP 40
league seed 9001 k 0.85,0.85,1.5,0.5 pools used 40/40/40
 channel mean abs rel error [passY, rushY, give, sacks] [ 0.0252, 0.0337, 0.0144, 0.0209 ] | max|g| 1.38 | ESS p50/p1/min 0.995/0.878/0.38
 PER-PLAY achieved vs target, mean abs rel error [passY/db, sack/db, give/db, rushY/car] [ 0.0055, 0.0129, 0.0141, 0.0169 ]
 wp { slope: 0.987, intercept: 0.004, corr: 0.9288 } mean|d| 0.0171 max 0.0528
 margin { slope: 1.137, intercept: -0.107, corr: 0.926 }
 solve ms per matchup (both teams) 2.41 | newton iters per solve 2.9
```
## Seed 4242, all visited pools (same script, topPools 1000000000, run before the off-switch line was added)
```
rows per table 8307/4870/132 TOP 1000000000
league seed 4242 k 0.85,0.85,1.5,0.5 pools used 250/219/55
 channel mean abs rel error [passY, rushY, give, sacks] [ 0.0294, 0.0289, 0.0167, 0.0252 ] | max|g| 1.36 | ESS p50/p1/min 0.993/0.854/0.358
 PER-PLAY achieved vs target, mean abs rel error [passY/db, sack/db, give/db, rushY/car] [ 0.0048, 0.011, 0.0127, 0.0064 ]
 wp { slope: 1.049, intercept: -0.023, corr: 0.8975 } mean|d| 0.0270 max 0.0886
 margin { slope: 1.212, intercept: 0.005, corr: 0.893 }
 solve ms per matchup (both teams) 7.59 | newton iters per solve 2.9
```
