# Engine plan v2: what the last 48 hours of Owner direction change (Architect, 13 Nov 2026)

Amends `engine-design-2026-11-11.md` (still the base; only the differences are here). Labels: VERIFIED (read or run in this repo), REPORTED (Owner relayed MUSE/GPT text in chat, not checked by me), INFERRED, UNKNOWN. No product code was changed; this is a plan for Owner review.

## 0. Verdict in five lines
1. The one-formula design survives every new requirement. The 12 "static constants that should fluctuate" (MUSE, REPORTED), the offensive focus, form, group synergy, gravity and the 4th-quarter automatics all fit the existing formula through four inputs; none needs a kernel change (section 1).
2. "Static truth on the board AND matchup-aware value" is not a tension: the static number is the league-average marginal of the dynamic function, computed by the solver view (section 2).
3. Two problems the 11 Nov design did not see: the Phase 1 "pools of real plays" cannot ship in a static browser app (size), and replay-from-seed cannot survive an engine bug fix (section 4). Both have cheap fixes.
4. Two things move earlier: a mechanical boundary check on `core/` (cheap, nearly done) and a throw-away second-sport fixture that tries the `SportModule` interface before football freezes it (section 5).
5. Largest risk is unchanged: identifying lambda from OVR-only data. The new dynamic features add several dials that NO data identifies (form, clutch). They ship as Owner dials at 0 or a bounded value, labelled as such (section 3).

## 1. Every "fluctuating" item maps to one of four slots (no new machinery)
The formula: `P(k|x) = softmax_k[ a(x) + sum_c lambda_c theta_c g_c ]`, `g_c = sum w_c(package) z`, `z = (effOVR - m_c)/s_c`.

| Slot | What goes in it | Items (MUSE's 12 + Owner verdicts) |
|---|---|---|
| `x` situation (state) | score, clock, down, field, week type, rivalry, playoff flag | game state/clutch (#9), home field by context (#4), variance by rivalry/playoffs (#10), drive/play parameters (#3), draft-slot value by class strength (#11) |
| `z` rating shift | `effOVR = baseOVR + form(player, week) - flexPenalty(baseOVR, role)` | form (#5), key-player-out (#3, #10 via lineup change, no injuries per Owner) |
| `w` duty weights | package and focus tilt the weights; gravity is the defence's re-normalised w | gravity (#7), offensive focus (target softmax), cross-side stars |
| `a(x)` baseline/policy | the coach policy is `a` at the call node; focus biases it | focus run/pass lean, 4th-down aggressiveness, 2-point, auto-selection |
| aggregator inside `g_c` | power mean over the duty group instead of a weighted sum | group synergy (#6) |

Consequences:
- **Flex prices stay consistent (Owner)**: the flex penalty is a constant in OVR points subtracted from base OVR; form moves the level, not the price. #2 and #12 are therefore left static by the Owner's own rule, and the plan does not touch them.
- **Slot values matchup-aware (#1)** fall out for free: the derivative of value with respect to one `z_i` depends on the opponent's `g` because the softmax is nonlinear. The solver view returns it per opponent context.
- **Group synergy** = `g_c = M_p(z_i)` with power-mean exponent `p_c` per duty (p<1 weakest link, e.g. pass protection; p>1 star-driven, e.g. receivers). `p_c` IS identifiable from play data (held-out log-likelihood, p=1 vs fitted), so synergy is an evidence-tested feature, not a guess. Ships neutral at p=1.

## 2. Static truth = the marginal of the dynamic model
- **Wins** shown to the user = solver value derivative under the NEUTRAL tilt (no focus, form 0, league-average opponent mix). This is the "static truth" and it is the number calibration targets (90% playoffs, ~35% SB, 25% title) are tested against.
- **Priority** under a focus = the same derivative evaluated under that focus's tilt. So "focus changes Priority but never Wins" is literally two evaluations of one function, not two features. Re-ranking the board by team focus (Owner: focus is team identity AND per-game choice) costs one solver pass per focus (small, since foci are a list).
- A focus is DATA: `{id, name, callBias(x), weightTilt(duty), policyAggression}` in the pack. A fifth or sixth focus is a pack edit plus a test row, which is also what GPT's second-round test checks (REPORTED).
- **CPU focus**: either random draw on the keyed RNG or a per-coach mapping table in the pack; the second is a data file the Owner or council can fill later, neutral default is random. No engine change either way.
- **Auto** picks `argmax_focus` solver expected margin for the roster against the league-average defence; deterministic, no MC, explainable ("your roster is best suited to X"). Halftime auto repeats it with the first-half state.

## 3. Evidence rule for every dynamic feature (new gate set)
Every dynamic feature ships with all three, or does not ship:
1. **Off-switch equals baseline**: feature coefficient 0 reproduces the Phase 1 baseline bit for bit (log hash). Already how lambda is designed.
2. **Mean preservation**: with the feature on, league totals (points, plays, drives, yards, TOP) stay inside the ~10% bar and the calibration targets stay inside tolerance. This is what "calibration targets stay static" means operationally.
3. **Identification label**: DATA-FIT (held-out likelihood gain shown), BOUNDED (a data ceiling exists, scale is an Owner dial), or DIAL (no data identifies it).

Classification, INFERRED until tested:
- DATA-FIT: situation effects (home field by context, score/clock state), group synergy exponent, matchup interaction, 4th-down/2-point automatics (nflverse has real go-for-it rates and nflfastR `wp`; the policy is validated against them, not authored), gravity weights (participation + targets).
- BOUNDED: form. Rolling weekly player EPA autocorrelation, after removing opponent, gives an upper bound on how much week-to-week persistence is real; the "OVR moves about 5-6" Owner dial must sit under that bound or be labelled a feel dial. UNKNOWN until measured.
- DIAL: clutch per player or team. Published analyses find little persistent clutch skill (INFERRED from general knowledge, not checked here); default 0 and a design dial, never presented as measured.

## 4. Two defects in the 11 Nov plan
**4a. Pack size (INFERRED, check at port time).** The Phase 1 baseline draws from stratified pools of real plays (484,254 rows read, 2016-2025). Shipping pools in a static app means tens of MB. Fix: the pack stores, per cell (call, down, distance bucket, field bucket, state bucket), an outcome pmf plus a **quantile table** for yards and seconds (about 32 knots). Sampling is inverse-CDF on the keyed uniform. Three gains: size (target <= 2 MB gzip, gate), the keyed uniform makes paired counterfactuals free, and a rating tilt is a warp of the uniform or a logit shift on the pmf, which is exactly where lambda enters. The Python lab stays the oracle: the TS port must match it in distribution on every totals metric (gate), because the pool and the quantile pack are two different estimators.

**4b. Replay is only valid inside (engine version, pack hash).** Fixing any engine bug changes keyed outcomes. Today `appstate.ts` already drops results and regenerates from `gameSeed` (REPORTED 1.13 MB/season, VERIFIED from the comment). Rule to add: a season that completes is **frozen as its folds** (box scores, standings, awards, leaders), not as a seed; replay-from-seed is a within-version feature. The save envelope stamps `engineVersion` plus pack hash and refuses a silent re-simulation across versions. Matches the Owner's rule that completed seasons keep their historical details (REPORTED, P-217).

## 5. Reordered delivery (changes to design section 9)
- **Phase 1b (next, was NEXT item 1): TS port** of the baseline nodes onto the keyed RNG, quantile pack, event log, folds. Gates: oracle match to Python on totals; pack size; **throughput** benchmark (proposal: >= 200k plays/s single core in Node, UNKNOWN until measured, because the Lab needs thousands of seasons and a season is about 40k plays); purity.
- **Phase 1c: situation layer and automatics.** Add score/clock to state via an nflfastR-style win-probability table as a pack parameter; the call and 4th-down/2-point policy is a one-step lookahead on it. Validate against real 4th-down go rates by WP bucket and 2-point rates. Closes the "does the chain price without score and clock" UNKNOWN from section 12 of the design.
- **Phase 2: ratings in.** Lambda by the two-gap Lab (P-347, unchanged), power-mean aggregator, solver view, MEASURED display. Focus, form and gravity come in as pack data after lambda exists (they need ratings to matter).
- **Phase 2b: dynamics** (focus tilts, form process, halftime and automatics wired), each under the section 3 gates. Form is a keyed AR(1) per player-week: key `(playerId, week)`, mean-reverting, replayable, mean zero.
- **Early, cheap, parallel:** (i) **boundary check on `core/`**; (ii) **second-sport contract fixture**.
  - (i) VERIFIED: `colors/test/nfl/purity.test.ts` already bans DOM, `Math.random`, `Date.now`, `new Date`, `process`, and out-of-folder imports, but it scans only `src/sports/nfl/engine/`. `src/core/`, `view/` and `app/` are not scanned. A grep for `Math.random`, `Date.now`, `new Date` in `colors/src` finds only two comments (VERIFIED). Extending the same test to `core/` is about ten lines and closes the engine-boundary item (D13) for the kernel. `view/` should be checked for framework imports for the framework test's sake.
  - (ii) A ~300-line test-only module (a toy baseball plate-appearance chain, no data, no ratings) that implements `SportModule` unchanged. If it needs a kernel edit, we learn that before football freezes the interface. Not a product commitment; basketball stays second and deferred (Owner). Owner awareness requested because it touches the "second sport later" ruling.
- **Phase 3-5** as in the design (attribution folds, second sport, cutover), plus the 4b frozen-fold rule at cutover.

## 6. Server-ready and platform (D18) without building a server
- The engine already satisfies the purity rules GPT lists (REPORTED) for the nfl engine folder; add three small items: a command shape for draft actions `(state, command) -> {events, next}` so a server can validate; `engineVersion` in the envelope (4b); and keep every pack/save value JSON-plain (the kernel's `canonicalText` already rejects non-plain values, VERIFIED).
- Platform ("design your own simulation"): the unit is already `SportModule` = duty table + rules + pack + state machine. The state machine is code. I recommend NOT building a state-machine DSL now; revisit only after the second real sport (D18 defer). Sport-independent application shell, sport-specific engine (GPT 10C, REPORTED) matches the existing `sim:<sport>:` key scheme (VERIFIED in `core/keys.ts`).
- Framework test: it must not wait for Phase 2. The Architect can supply a **focus/halftime contract and JSON fixtures** with a pure stub (list foci, auto-pick, priority board, halftime change, 4th-quarter override with a logged `decidedBy`) so all four prototypes run against identical behaviour. Precedence order, fixed in one function: situational override, then user choice, then auto. The log records which rule decided, which is what the edge-case test needs.

## 7. What I would stop or avoid
- Authoring any new fixed allocator, tier table or situational rule by hand; each one is a future "static constant". If it has data, it goes in a pack with provenance.
- Treating form or clutch as measured. They are dials.
- Adding dependencies for any of this: none is needed. React, react-dom and esbuild appear unused in `colors/package.json` per MUSE (REPORTED); the package description claims UI adapters use them. Removal is a dependency change, so I propose it and do not do it.

## 8. Owner decisions (only these)
1. **Era packs (blocking Phase 1b)**: ship one pack fitted on the most recent seasons, or a pack per era with a user era selector later? My recommendation: one recent-era pack now, the pack format already allows more.
2. **Product-world totals bar**: is the penalties-off world the 10% bar (my reading, inferred) or the penalties-on calibration world?
3. **Form across seasons**: does form reset each season or carry? Recommend reset (simpler, mean-preserving); not blocking.
4. **Second-sport contract fixture** (section 5, ii): approve as test-only, or hold until football ships.
Still held from NOW: CI gate pick (my recommendation is unchanged: minimal install + type check + tests + build first), E5 stamp and flex-base re-pin (2 pre-existing failures, 318/320), hydration wiring.
