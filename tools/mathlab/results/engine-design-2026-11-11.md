# The engine I would build: one model, two views, any sport (Architect, 11 Nov 2026)

Brief from the Owner (11 Nov): design the best long-term multisport engine; hybrid or full rebuild both fine; time and cost no object; do not piggyback on Z.ai. Labels: VERIFIED (read in the repo or measured), REPORTED, INFERRED, UNKNOWN.

## 0. Verdict

**Rebuild the simulation core as ONE play-level, event-sourced model; deliver it as a hybrid (strangler), never as two engines.** Keep what is already portable (ability layer, flex table, Hungarian solver, season and league scaffolding, Rng purity rules). Retire the top-down generator (`drives.ts`, `margin.ts`, `decompose`, static `CARRY`/`TARGET` shares). The old engine stays as a plumbing oracle until the new one clears its gates.

This **changes my 10 Nov position** in one place. I said the 32-spot table becomes a test the new engine must reproduce. The Owner's 8 Nov ruling forbids that: the engine's input determines the specs, the measured curve is OUTPUT, nothing is refitted to the curve or to any table. So slot values are shown (MEASURED display) and judged by the Owner, never a gate. The rebuild is justified by portability, one source of truth for every stat, exact valuation and calibration to real play data. It is not a flex fix, as I said on 10 Nov.

## 1. What the engine must do (requirements, traced)

1. Football first, then basketball, hockey, soccer, baseball with **no kernel change**: a new sport is a duty table, a rules object, a state machine and a calibrated pack (Owner's portability test, Q5).
2. Box score, stories, snap counts, usage and gravity can never disagree, because all are folds of one event log.
3. Every constant has a named source (data, Owner, or derived). Spec weights are INPUTS; values and prices are OUTPUTS (8 Nov ruling).
4. Ability stays Owner-defined: the 99-rule flex table (accepted 10 Nov) and duty requirements are Owner authority.
5. Pure and replayable: `(rosters, plans, pack, rules, seed) -> log`, no hidden state (existing purity test).
6. Calibrated to real football by held-out validation, not by feel.

## 2. Why the current shape cannot get there (VERIFIED from code)

- `drives.ts` realises game-level totals first (`realise`: rush, pass, giveaways, sacks), converts them to points, splits points into TD/FG/conv (`decompose`), then lays results onto drives. Drives are a *rendering* of totals; no per-play state exists, so a new stat needs a new authored allocator (`boxscore.ts` static shares).
- `margin.ts` exists to repair what top-down generation gets wrong (ties, 3 and 7 clustering). A play-level engine produces margins; it should pass that test, not be patched into it.
- `matchup.ts` is a log-linear model over 9 unit ratings with a `softCap` guard. It is the right *family* (see 3) applied at the wrong *grain*.
- Possession count, chain length and drive shape are INFERRED constants (`10.8 drives`, `5.15 yards/play`, `26 s/play`), so Z.ai's -27% possession gap (REPORTED, MUSE re-run) is consistent with what happens when those constants go away and no real conversion data replaces them; his own verdict names chain length and nflverse data.
- Z.ai's measurement that C>OT and FB>RB price inside the Owner's +-5 from plays alone, with no authored prices, is the best argument for the move (REPORTED). It came from 1,500 paired-seed games per cell on a chain that did not match real possession counts (-27%), so it shows the direction, not a settled price; sections 5 and 6 are what make it measurable.

## 3. The design on one page

```
 L5 league/season/draft/UI      folds of the event log; sport-generic where possible (schedule, standings, saver exist)
 L4 valuation (solver view)     exact value of a rating point, flex break-evens, exploit census, WAR-like value
 L3 simulator (MC view)         step(state) -> events, one decision node at a time; coach POLICY picks plays
 L2 sport module                state machine + rules(season) + duty table + node list + fold reducers
 L1 ability layer (EXISTS)      roster, role, OVR, flex table, Hungarian lineup -> effective OVR per spot
 L0 kernel                      keyed RNG, event log, model packs, rules-as-data, fold framework, replay
```

**The formula (every sport, every contest node nu with outcomes k in situation x):**

```
P(k | x) = softmax_k [ a_{nu,k}(x)  +  sum_c  lambda_c * theta_{nu,k,c} * g_c ]
g_c      = sum_{i in off} w_{c,i}(package) z_i  -  sum_{j in def} w_{c,j}(package) z_j        (duty gap)
z_i      = ( effOVR_i - m_c ) / s_c                                                           (league z-score at that duty)
Y | k,x  ~ F_{nu,k}(x ; shift = gamma_{nu,k} * g)                                            (yards, seconds: 2-part mixture, grind + explosive)
```

Five kinds of input, each with ONE owner and ONE source:

| Symbol | Meaning | Source | Authority |
|---|---|---|---|
| `a(x)` | situational baseline (down, distance, field, score, clock) | max-likelihood fit to nflverse play-by-play | data |
| `w(package)` | who performs which duty, by personnel package | nflverse participation + snap counts (replaces `PERS`, `PERS_REC`, `DL5_SHARE`, `DIME_W`) | data |
| `z` | rating to league scale; `effOVR` includes the flex penalty | existing ability layer + Owner flex table | Owner |
| `theta` | shape: how a duty gap splits across a node's outcomes (sack vs completion vs INT) | legacy elasticity ratios as prior, `MC.toQb/qb` etc. | prior, re-estimable |
| `lambda_c` | impact scale of one standard deviation of duty c (about 12 numbers) | two-gap Lab plus conditional regression (P-347, proposed; dispersion matching is biased, DS D4: +0.23/+0.43/+0.75), validated by conditional moments on held-out 2023-2025 | derived, Owner-visible dial |

Why this form: it is the odds-ratio (log5) method generalised, the standard baseball PA model, and the same family the current matchup model already uses; probabilities saturate on their own, so the `softCap` hack disappears; it is a multinomial GLM, so it fits by convex maximum likelihood with free uncertainty; it is differentiable, which is what the solver view needs (section 6). The existing channels (`olRun`, `olPass`, `rb`, `qb`, `rec`, `passRush`, `frontRun`, `coverage`, `kicker`) are the starting duty set, so Owner vocabulary carries over.

OUTPUTS (never inputs): slot value curve, flex break-evens, position hierarchy, snap counts, usage, the MEASURED display.

## 4. Kernel (L0): determinism by construction

- **Keyed RNG.** `draw(gameKey, eventIndex, tag, n)` is a pure counter-based function (Philox or SplitMix style, 64-bit via two 32-bit halves). No stateful stream. A single event can be replayed, any game can branch from play N, and a counterfactual shares randomness with the original wherever the situation matches. The existing `fork(label)` maps onto the key prefix, so call sites barely change.
- **Event log.** `Event = { i, t, kind, actors, payload }`. Box score, drive summary, recap, standings points, stat leaders are reducers over the log. This replaces `read everything back off the drives` in `drives.ts` with the same principle applied to the whole game.
- **Rules as data.** `rules(season)` carries overtime format (the 2025 change is data), kickoff rules, penalties on/off (Owner: off), clock rules. Packs are fitted per rules regime.
- **Model pack.** Immutable bundle of parameters plus provenance (data source, fit date, held-out metrics, hash). The save stores the pack hash, so a league is replayable and a pack change is a visible version bump.

## 5. Football module (L2): what is built, in order

Nodes (each a contest as in section 3): play call (policy), personnel package, pass rush result (sack, scramble, pressure flag), target selection, completion, air yards, YAC (grind or explosive), interception, run yards, fumble, tackle attribution, clock burn, 4th-down decision, FG make by distance, punt and return, kickoff and onside, 2-point attempt, overtime. Penalties are a rule switch, off per Owner; baseline is fitted on penalty-free plays and the drive-count effect measured in Phase 1 (UNKNOWN until measured).

- **Coach policy.** Down, distance, field, clock and score decide the call from a policy fitted to real tendencies. The Owner's plan options (11/12/13/21/22, run/neutral/pass, base/nickel, run/pass focus) become *biases on that policy and on package probabilities*, so the UI contract is unchanged while the authored `PLAN_K` terms disappear.
- **Usage.** Targets and carries come from a softmax over eligible players by role and skill, replacing static `CARRY`/`TARGET` shares. Snap counts are the sum of package probabilities times rotation shares, so the participation ledger is an *output fold* checked against nflverse snap counts.
- **Gravity** is the defense's duty weights `w_{c,j}` re-normalised toward the offense's threat distribution (double teams): one mechanism, no extra price term, living inside value, as `flexunify` argued.

## 6. Two views of one model, and the toy evidence

**Simulator view:** Monte Carlo, for stories, live games, variance. **Solver view:** the same nodes assembled into an absorbing Markov chain over (down, distance, yard line) and solved by value iteration. Expected points, the derivative of expected points with respect to any duty gap, and so the exact price of a rating point at a slot are computed with no sampling noise. Flex break-evens, the exploit census (today `flexcensus.mjs`) and the guard fixed-point I left UNKNOWN on 10 Nov (raise the price of any exploited move until stacked-roster gain falls under tolerance) become a cheap loop on the solver.

`tools/mathlab/toykernel.mjs` (read-only, TOY parameters, NOT football; output in `toykernel-2026-11-11.txt`) tests the two mechanics:

- VERIFIED: solver and simulator are the same model. Neutral value 0.3722 (solver) vs 0.3794 +- 0.0116 (200,000 simulated chains), z = 0.62.
- VERIFIED: solver derivative of value with respect to the pass gap is 0.16358, exact, in 17.7 s for three solves. Unpaired Monte Carlo at 4,000 chains per world gives 0.166 with sd 0.032 across 60 replicates (about 20% relative noise). Paired sequential draws: 3.0x lower variance. Paired keyed draws with inverse-CDF mapping: 3.8x lower variance, only 1.26x better than paired sequential in this short-chain toy. **I had expected a larger keyed gain; the honest result is that pairing is worth 3 to 4x and the keyed scheme a modest extra here.** The case for the solver is exactness; the case for keying is replay, branching and counterfactuals, not variance alone.
- INFERRED: speed. The toy ran about 1.4 million chains in 6 s. A real play step is heavier, so a 170-play game is plausibly 1 to 10 ms and a 272-game season a few seconds. If that holds, the play-level simulator is fast enough to run **every** game, and no authored aggregate fidelity is ever needed. UNKNOWN until built.
- UNKNOWN: whether the (down, distance, yard line) chain prices well without score and clock state (end-of-half and end-of-game policy). Check against Monte Carlo in Phase 2.

## 7. Multisport mapping (the portability claim)

| Sport | Event | State | Solver | Notes |
|---|---|---|---|---|
| Football | play | down, distance, yard line, clock, score | expected-points chain | built first |
| Baseball | plate appearance | base-out (24), inning, score | run-expectancy chain (textbook) | odds-ratio PA model is literally the formula |
| Basketball | possession | lineup, clock, fouls | points per possession by lineup | usage softmax and gravity are the same machinery |
| Hockey | shot-attempt hazard | strength (5v5, PP, PK, empty net), clock | Markov chain on strength states | continuous-time competing risks |
| Soccer | possession sequence to shot | score, cards, clock | bivariate-Poisson-style closed form from the chain | xG node |

Kernel interface sketch (design, not code):

```ts
interface SportModule<S, Plan, Lineups> {
  id: string; rules(season: number): Rules;
  duties: DutyTable;                                   // channels + requirement rows (Owner-defined)
  init(l: Lineups, p: Plan, keys: Keys): S;
  step(s: S, ctx: StepCtx): { events: Event[]; next: S };   // pure, one decision node
  done(s: S): boolean; fold: Reducers;                 // box score, recap, stats
  chain?(pack: Pack): AbsorbingChain;                  // optional solver view
}
```

Portability test the Owner set: the second sport ships with a duty table, rules, pack and nothing else; if the kernel needs a change, the design failed.

## 8. Validation and gates (the lab becomes the product's spine)

- **Micro:** each node calibrated by decile on held-out seasons. **Meso:** drive count and length, plays, time of possession, scoring split, margin pmf with ties and 3/7 clustering emergent (`margin.ts` unused). **Macro:** season win spread, parity, roster-quality to win slope.
- **Totals bar (the one Z.ai could not clear):** with the real baseline, points per team within 1%, drives within 3%, plays within 2%, margin pmf passes a goodness-of-fit test on held-out seasons. Numbers are my proposal; the Owner may tighten them.
- **Properties:** monotonicity (more rating never lowers expected margin), conservation (yards and 3,600 seconds add up), replay determinism, fidelity-free consistency (solver value equals Monte Carlo mean), pack-hash stability.
- **Behaviour the Owner judges, not a gate:** the MEASURED slot curve, flex break-evens, census exploit mass. Per the 8 Nov ruling, nothing is refitted to them.
- The old engine is a plumbing oracle only (seasons run, standings sane); it is not an accuracy target.

## 9. Delivery path (hybrid in delivery, one model in design)

0. **Kernel and contracts:** keyed RNG, event schema, folds, pack format. Wrap the old drive engine as a legacy provider emitting the new event schema, so UI and stats migrate to log consumers early. Gate: the adapter reproduces today's box scores for seeded games.
1. **Football baseline, all lambda = 0:** neutral rosters must reproduce real league distributions on held-out seasons. Gate: the totals bar. Needs the data in section 11.
2. **Ratings in:** duty layer, lambda by the two-gap Lab (not dispersion matching), solver view, MEASURED curve, census. Gate: properties plus Owner review of the curve and break-evens.
3. **Attribution:** usage, snap counts, box scores, recap from the log. Gate: snap shares within 2 points of nflverse (the Ledger's original test, as an output).
4. **Second sport** to prove portability (Owner named basketball; baseball is the best solver showcase). Gate: no kernel change.
5. **Cutover:** retire legacy provider, `drives.ts`, `margin.ts`; re-pin goldens; versioned saves.

## 10. What transfers, what is retired

Transfers unchanged: `lineup.ts`, `hungarian.ts`, flex table and its test against `flex.json`, `slots.ts` structure, `players`, `playerids`, schedule, standings, draft, awards, saver, envelope, hash, the purity rule, the census and `rolesurplus` tooling as solver clients.
Reworked: `ratings.ts` (spot grades become duty gaps), `specs.ts` (authored weights become data-derived exposures plus lambda), `plans.ts`, `boxscore.ts`, `recap.ts` (folds).
Retired: `drives.ts`, `margin.ts`, `decompose`, `realise`, `PT_*` and `BASE_PTS` as constants, `softCap`, `PLAN_K` authored costs.
Moves: every seeded golden and all drive-shape numbers. Known cost of any rebuild.

## 11. Rejected alternatives

- **Drive engine plus Ledger (Z.ai's path, and my 10 Nov middle path):** fixes snap-share transparency, not portability; every new stat still needs an authored allocator; keep as a fallback if the Owner reverses.
- **Learned generator (sequence model on play data):** needs per-player features the Owner does not supply, cannot be priced or controlled by Owner duty tables, not interpretable.
- **Physics or tracking-level agents:** needs attributes and data the product does not have; beyond what a management sim needs.
- **Emergent personnel by an optimising coach:** tried in Pre-Colors and failed (10 Nov answer, section 1); personnel stays data-driven.
- **Game-level rating-to-score regression:** no stories, no stats, no gravity.

## 12. Risks and UNKNOWNs

- **Identification of lambda (largest risk):** the data holds OVR (plus SPD, STR; the Owner dropped AGI, COD, INJ, AWR) with no historical ratings joined to outcomes. Dispersion matching is approximate; mitigation is Owner-visible dials, MEASURED display, and a later join of historical Madden ratings if the Owner can supply them.
- **Data access:** nflverse play-by-play 1999-2025, participation 2016+, snap counts. The shell has not been shown to reach them (UNKNOWN whether the proxy allows nflverse release downloads; I have not tested). Per the rules the Owner or council must attach them.
- **Node count:** about 20 nodes to fit; whack-a-mole risk. Mitigation: baseline-first with all lambda = 0, per-node held-out tests, build one node at a time.
- **Rules eras:** fit per regime; the 2024 kickoff change is the live example.
- **Trait channel (optional):** SPD and STR exist in the CSV. A hook with coefficient 0 ships neutral; using them is an Owner product call.
- **Chain solver scope:** pricing on expected points ignores late-game policy; verify against Monte Carlo before trusting.

## 13. Asks

Owner: (a) approve this direction and Phases 0 and 1; (b) the totals-bar tolerances in section 8; (c) whether the second sport is basketball or baseball; (d) whether historical Madden ratings exist.
Council (only after the Owner's go, `council.mjs ask`): attach nflverse play-by-play, participation and snap counts for 2016-2025 with the field list in the Phase 1 brief; I do no statistics research myself.

## 14. IDEA (not built)

- **Counterfactual replay as a feature:** with keyed draws, "what if we had gone for it" replays the same game with the same randomness from any play.
- **Predictability emerges:** if the defense expects the offense's tendencies, leaning on the run raises the defense's run weight, which replaces the authored `predict` cost.
- **WAR-like value as a first-class stat:** exact derivative times snaps, per player and season, from the solver.
- **Era selector:** play under the 1999 or 2026 rules by choosing the pack and rules object.
