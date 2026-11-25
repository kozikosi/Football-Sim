# Multisport engine plan N (Architect, 25 Nov 2026). PLANNING + one throwaway experiment. No product code, no new sport, no byte in `colors/src/{core,sports,platform}`.

Replaces plan M (`multisport-engine-plan-2026-11-20.md`). Purity checks M1-M6 (`multisport-purity-plan-2026-11-19.md`) stand. Ship-first stands. Labels: **V** run or read by me, **R** reported by a source I did not verify, **I** my inference, **U** unknown.

## 0. In short
1. **One idea now carries the plan: tilt the real plays.** Keep drawing real historical plays, but reweight them so a matchup hits the numbers the ratings say it should. It connects player ratings to the play-by-play engine without fitting new statistical effects from data (the strength model that sets the numbers stays a design choice). A football experiment works (section 3).
2. **Football is the first customer, before any second sport.** The play-by-play engine ignores ratings today (V). This is a candidate fix for that.
3. **Sport two is basketball**, per your 13 Nov ruling (relayed). Plan M recommended baseball and missed that ruling.
4. **New gate: data rights.** I found no cleared data source for basketball. It does not stop design work; it does stop fitting real NBA data (section 5).
5. **A sport is data wherever it can be, code where the game's structure lives**, and nothing moves into the shared core until two sports use it identically.

## 1. Where things stand (V)
- `core/` is 845 lines and nearly sport-free: event log, fold, keyed random draws, hashed rule packs, saves, assignment solver, portable maths. The one place it names a sport in code: `envelope.ts`.
- Football has two engines. The season you can play uses the older drive-level engine (`engine/drives.ts` + `matchup.ts`). The newer play-by-play engine (`sim/`) draws from real play pools but is neutral between teams (rating effect set to 0).
- Costs (Node 22, 2 cores): legacy season median 308 ms; untilted play game 0.24 ms. `playWeek` recomputes every team's coaching identity every week (`seasonrun.ts`), 0.42 ms per team against a 13.8 ms week, so remembering it per season should speed seasons up many times over with identical results (I; re-pin sitting).

## 2. The Owner rules this design must obey (13 Nov, relayed)
W-L emerges from the simulation, no win dial (11). Pass-focus defence shrinks big plays while run, short pass and RPO leak (11). Approximate realism, no numeric gates yet (10). Cross-side stars in the clutch (13). Displayed Wins, Priority, OVR and flex price stay stable to the user (Q7). Football and basketball first; basketball after football ships (14, 15). Free in perpetuity (3).

## 3. The central idea, and what the experiment showed
**Mechanism.** The engine looks up a pool of real plays for the situation and draws one. Tilted, play `j` is drawn with weight `n_j · exp(g · f_j)`, where `f_j` lists plain facts about the play (yards, sack, turnover, touchdown, kick made) and `g` is a small set of numbers per matchup. `g = 0` is the untouched engine.
**Calibration by inversion.** A strength model says what each matchup should average per play (yards per dropback, sack rate, turnover rate, yards per carry, finishing). `g` is then solved directly from the pools, each situation weighted by how often it comes up in neutral games (counted once per pack): about three Newton steps, no simulation at match time, no trained surrogate. This is the standard minimum-change reweighting (exponential tilting; see arXiv 2207.10013): of all ways to hit the targets, it moves the real data least.

**Results (V, 25 Nov; `tools/mathlab/spikes/2026-11-25-pool-tilt/`).** 32 matchups per league; yardstick is the legacy engine.

| | league 4242 | league 9001 |
|---|---|---|
| zero tilt = untouched engine, 50 games, same log hash | yes | yes |
| per-play targets, mean error in simulation (4 channels; finishing not checked) | 0.6-1.9% | 0.6-1.7% |
| solve time per matchup, both teams | 2.7 ms | 2.4 ms |
| win chance vs legacy: correlation / mean gap / worst gap | 0.90 / 2.4 pts / 6.3 | 0.93 / 1.7 pts / 5.3 |
| point margin vs legacy: slope / correlation | 1.08 / 0.90 | 1.14 / 0.93 |

- Four scaling constants and the table size were picked by hand on a third league (seed 777, 7 settings). These two leagues were not used to pick them.
- Sack and turnover errors are about the size of the measurement noise (I, binomial estimate). Rush yards carry a small real bias from using only the 40 busiest pools: 0.6% with all pools, 1.7-1.9% with 40.
- It beats my first approach (a pre-fitted shortcut: correlation 0.84-0.87, worst gap 15 points). A slower method that simulates during solving reached 0.94-0.95; not worth the time cost.

**What it does not show.** Matching the legacy engine is not realism. No comparison with real team-season spreads was made. Mismatched games may blow out too much (seen with the earlier method; not re-run with this one). Play calls, punts, kickoffs and extra points are untilted. The finishing target is currently the legacy points forecast raised to 1.5: that is the nearest thing here to a scoring dial and **must be replaced by a finishing strength built from players** before it goes near the product (ruling 11).

**Why I like it (I).** One mechanism covers many features, each an added `g` with a bit-exact off switch:

| Feature | As a tilt |
|---|---|
| home field, weather, form | small added `g` for the game or week |
| pass-focus defence (ruling 11) | negative `g` on deep-yards for the opponent; run and short pass leak |
| coaching run/pass lean | the same primitive on the call pool |
| clutch effects | added `g` only in the clutch window |
| cross-side star (ruling 13) | one-snap change of the unit, so one-snap `g` |

## 4. Shape of a sport
| Part | Football today | Basketball (paper, I) | Data or code |
|---|---|---|---|
| Game structure (`step`) | downs, clock, scoring | possessions, fouls, periods, bonus | code |
| Pools | plays by down, distance, field spot | possessions by clock, score, transition | data, hashed, with licence |
| Play facts `f` | yards, sack, turnover, TD, kick | points, turnover, shot type, offensive rebound, free throws | declared list |
| Strength model | units to channel targets | five-man units to per-possession targets | data where the form allows; else code |
| Slots and prices | positions, flex table | positions, own flex table | data (mechanism shared) |
| League shell | draft, schedule, playoffs, awards | same ideas, series playoffs | shared only after proof |

**Candidate for the shared core (not extracted yet):** the tilted draw and its solver. About 100 lines, to be written with only `+ - * /`, the portable `pexp` and a fixed number of steps, so every machine gets the same `g` (the experiment stops on convergence instead). It moves to `core/` when basketball uses it unchanged (rule of two).

**Players and box scores.** A tilted play is a team outcome. Individual stat lines come from a per-sport allocator, as football's box score does now. How well that works for basketball is U.

**Product numbers.** Wins, Priority and OVR keep coming through the value-provider seam: win chance as a function of slot ratings. A sport plugs in by supplying slots, a strength model and a sim.

**A free standing test.** The solver predicts per-play averages; the simulation must reproduce them within noise. One test catches a bug in either.

## 5. Data rights gate (not legal advice)
| Source | What I found | Label |
|---|---|---|
| nflverse (football pools) | repo page names CC BY 4.0; I did not read the licence text, and an issue asking how far it reaches was closed unanswered. CC BY requires credit: our pack names the source but gives no licence line. **Add to NOTICE at cutover.** | R / V |
| NBA.com | terms section 9: news or private non-commercial use, credit required; bars use with fantasy games, products showing archived play-by-play, and comprehensive stat databases without consent | R (fetched; summarised, not read word for word) |
| public NBA data repos | one carries Apache-2.0; I take that to cover the repo, not NBA.com's terms | I |
| FIBA data API | authorised users only | R |
| Retrosheet (baseball) | any use allowed, with a set credit line | R |
| Sports Reference | bars competing databases and automated access | R |

Facts and statistics are generally treated differently from site terms in US law; how that applies here is U. Real basketball player names raise the same question football names do (U).
**Plan:** build and prove the basketball engine on an **invented pack** (no real data, no rights needed). Decide real data before any real fit, from: (a) a source whose licence allows it, found by a dedicated search, or written permission; (b) your decision to switch sport two to baseball; (c) legal advice. My default is (a). Your ruling stands until you change it.

## 6. Phases. Each has an exit test and a way to stop
| Phase | Work | Exit | Stop if |
|---|---|---|---|
| N0 now | docs and this experiment only | football ships | — |
| N1 re-pin sitting | fix the user-CSV import (finding in `t1-dataset-asset-receipts-2026-11-25.md`), remember coaching identity, structural random keying | old golden results re-declared once | a result moves that was not declared |
| F1 football realism (lab) | per-play strength model built from units, including finishing; compare team-season spreads, blowouts, scoring with real seasons; **write tolerances before running** | report within tolerances | cannot meet them after two model revisions: keep the legacy engine |
| F2 football play engine | tilt inside `sim/` behind an off switch; golden tests; old-vs-new same seeds (guardrail 3) | you pick which engine ships | season or week too slow on a phone |
| N2 checks | purity checks M1-M6 | a planted violation goes red | — |
| N3 basketball paper | state, possession unit, facts, units, bends in the table above; data-rights search | short list of contract questions | the contract needs more than small bends: report, do not force |
| N4 basketball on invented data | engine by copy-then-diff; substitution test (K8) | admission checklist from plan M section 7, minus real-data items | football outputs would have to change |
| N5 data and fit | after the section 5 decision; held-out checks, tolerances first | calibration report | no cleared source |
| N6 extract | only what both use identically, one commit each, both suites green | core grows by proven code only | — |
| N7 UI, then sport three | screens driven by column and slot lists | your go | — |

F1 and F2 are football work and wait for your go after ship; they are not multisport scope.

## 7. Open questions, each with the test that settles it
- **K1 realism.** Do tilted seasons spread like real ones? Phase F1.
- **K2 mismatches.** Re-run uniform strength gaps (±1 to ±7) with the exact solver; compare margins with real lopsided games. A target the pools cannot reach must stop the solver with an error, not return a clipped answer.
- **K3 speed.** Adding the separate timings, a season is about 1.4 s against 0.3 s today (I). Measure the whole thing, then on a phone. Levers: fewer pools, reuse solves, one-step updates (all untested).
- **K4 hidden channels.** Tilting yards also moves explosive plays, third downs, drive length. Check those distributions, not only the targets.
- **K5 calls.** Tilt the call pool for run/pass lean; check it keeps down-and-distance sense.
- **K6 special teams.** Punts, kickoffs, extra points: same primitive, untried.
- **K7 where quality lives.** One `g` for all situations may be wrong on third down or in the red zone. Compare, then add situation terms only where data demands.
- **K8 substitutions (basketball).** Lineups change often. Idea: solve once per team, then update each lineup in one step from the stored curvature. Test the error against a full solve before believing it.
- **K9 data rights.** Section 5.

## 8. Later, server side (ideas, I; nothing planned)
Seeds plus logs are enough to store; a server could issue seeds for leaderboards and spot-check random games or picks. That needs portable maths along the whole replay path (the legacy engine is not) and fits free limits only in small pieces (U until measured).

## 9. Changed from plan M
| Plan M | Plan N |
|---|---|
| baseball second | basketball second, per ruling; data gate added |
| every event is an additive logit with fitted rating effects (hypothesis) | same exponential family applied to real pools, solved to targets; no rating effect to fit |
| data licence unknown | per-source findings and a gate |
| solver-vs-sim test, in principle | concrete: solver targets vs simulated averages |
| football only waits | football's own play engine is the first use |

## 10. Not doing
A rules language, a shared engine base class, a universal sport interface designed from one sport, a neural simulator, multisport code before football ships, edits to pinned engine folders before the re-pin sitting, scraping any source whose terms bar it.

## 11. Your decisions
None needed now. At the gate after ship: go on F1; which engine ships after F2; the basketball data route (section 5).
