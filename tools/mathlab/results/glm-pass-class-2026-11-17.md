# 2a: the pass-class GLM node (Architect, 17 Nov 2026)

Code: `tools/mathlab/phase1/passclass.py` (lab: fit, held-out report, bake, vectors), `colors/src/sports/nfl/sim/passclass.ts` (the node), `game.ts` (option `passClass`, `passGap`), `colors/tools/glm-bar.ts` (game-level report), `colors/test/nfl/passclass.test.ts`, packs `data/packs/nfl-passclass-fit2016-2022.json` and `...fit2023-2025.json` (about 2 KB each). Labels: VERIFIED (run this session, command given), INFERRED, UNKNOWN.

## What it is
For a pass play, P(class | state), class in {comp, inc, sack, int}, as a multinomial logit on 15 features (down, log yards to go, field position with red-zone / goal-line / own-end flags, score difference, late-half flags and their interactions with score). It replaces the pool's class mix; the outcome detail (yards, fumble, next spot) still comes from the pool, drawn conditional on the class (**class-then-tuple sampler**): class from the GLM (tag `passClass`), then a tuple from the pool restricted to that class (tag `rec`, unchanged). The lambda seam is the existing `tilt()`. Only + - * / and `pmath.plog/pexp`: the same bits in Python.

## VERIFIED
1. **Held-out, untouched seasons.** Feature set and regularisation were chosen on 2021-2022 (fit 2016-2020). Then, fit 2016-2022, tested once on 2023-2025 (59,073 pass plays): `python3 -I tools/mathlab/phase1/passclass.py report`.
   | log loss, nats per pass play | |
   |---|---|
   | global class rates | 0.93392 |
   | the pool node (floored at 1e-4) | 0.92786 |
   | GLM | **0.92389** |
   Paired (pool - GLM) = **0.00397 +- 0.00061, 6.6 SE**, and positive in each season: 2023 0.0033 +- 0.0009, 2024 0.0047 +- 0.0011, 2025 0.0039 +- 0.0011. It is a small effect (a pass's outcome class is mostly noise given the state), and it is real.
2. **The pool node can call an outcome impossible; the GLM cannot.** 0.027% of held-out plays had an actual class the pool gave probability 0 (a cell with no such play). The GLM's smallest class probability on held-out is 7.4e-3.
3. **Calibration.** Mean predicted class rates on held-out 0.5985 / 0.3165 / 0.064 / 0.021 against actual 0.6025 / 0.307 / 0.0703 / 0.0203. P(comp) by decile tracks the actual rate within about 1.5 points (0.483 to 0.485 ... 0.675 to 0.663). **The sack rate drifted: 6.4% in training, 7.0% in 2023-2025**, which neither model can anticipate. That is the case for fitting the product pack on the current era, which is what the 2023-2025 pack does.
4. **Node conformance (TypeScript vs Python lab).** 407 states (400 real, 7 edge): features and probabilities equal the Python `pmath` evaluator **bit for bit**, and equal scikit-learn's `predict_proba` to 1e-12 (worst 2.2e-16 on the Python side). The loader refuses a pack with a wrong feature list, class order, shape, a null, a negative lambda or `minClassPool` 0.
5. **The sampler.** Class-restricted pools partition their parent exactly (same ids, same weights). A rare class in a thin cell reads from a coarser cell with at least 25 plays *of that class* (4th and 40 at the goal line: an interception still comes from at least 25 interceptions). Sampled class frequencies equal the GLM probabilities (chi-square, 3 df, 40,000 keyed draws).
6. **The seam.** lambda 0 or gap 0 replays the neutral GLM log bit for bit (60 games); with lambda 1, completions rise and sacks fall monotonically with the gap (gap -1, 0, 1; 300 games). Keyed coupling holds: tilting changes nothing before the first tilted pass.
7. **Mutations caught** (planted in the node, each fails a test): wrong classes kept in a class pool, a 1-play pool accepted by the hierarchy, `late` threshold `<=` to `<`, softmax without max-subtraction, game ignoring `passGap`, and **the class draw sharing the tuple draw's tag.** The last one first slipped through. Sharing one uniform conditions the tuple on the class interval, so mean completion yards fall from 11.3 to 5.8. A distributional test (mean completion yards within 0.5 of the pool node's) now catches it.
8. **Gates.** `npm test` 406/406, `tsc:check` 89 (pinned 89), pmath lint: nothing new (sim/ stays 0).
9. **Whole-game effect, paired** (same 12,000 keys under both nodes, both 2023-2025 packs, `node --experimental-strip-types tools/glm-bar.ts 12000`), per team-game: points 23.25 to 23.39 (+0.6%, z 1.9); plays, rush attempts, yards, giveaways, time of possession within noise; pass attempts -0.3%, completions -0.3% (z about -2.4); **drives -1.1% (z -6.4); sacks -1.7% (z -3.0).** Class-pool holes: 0. Every shift is far inside the 10% bar. Reported, not tuned.

## Not true / not done
- **Not the default.** `runGame` without `passClass` is the pools node bit for bit (checked). Making the GLM the product's node is a decision I have not taken: the evidence says it predicts pass outcomes better held-out and removes the impossible-outcome hole, at the cost of a 1 to 2% shift in sacks and drives that I have not explained.
- **INFERRED, not tested:** the sack and drive shifts come from the GLM smoothing the sack probability in the states the simulator visits more than the pool's cell mix does (the GLM matches the overall class rates by construction, so a difference needs a difference in the state mix). A test: compare class rates by state bucket, pool vs GLM, over simulated games.
- **theta and lambda are the toy's shape and 0.** `theta` (comp +0.3, inc -0.2, sack -1, int -0.6) is not fitted; lambda stays 0 until L1 estimates it. Slot values stay outputs, never refitted (8 Nov ruling).
- **Only the class is modelled.** Yards on a completion are still the pool's within-class mix; a GLM or quantile node for them is the next node.
- **Features are chosen from 15 candidates on one validation split.** Regularisation strength is flat (0.1 to 10 differ by under 1e-4). More features were not tried; the largest single gain was from down and distance (0.9274 to 0.9210), the rest added 0.004 together.
