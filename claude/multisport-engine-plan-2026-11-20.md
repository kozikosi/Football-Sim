# Multisport engine plan M (Architect, 20 Nov 2026). DOCS ONLY: nothing here is built, nothing in `src` changed, and every phase starts AFTER the football cutover. SHIP-FIRST stays first.

Labels: VERIFIED (read in the repo this sitting, `aa4f9b3`), REPORTED (from NOW.md, earlier plans, the council), INFERRED (my reasoning or general knowledge, not checked), UNKNOWN. Supersedes the multisport lines of plan v4 section 2.3 and the "Not decided" block of the purity plan; the purity checks M1-M6 stand unchanged.

## 1. Thesis
Multisport is a kernel plus thin sport modules, and the kernel already exists. The risk is not missing machinery; it is designing a general "sport interface" from a single example. So: **finish football, then build sport two by copy-then-diff, and extract only what two sports use identically (rule of two).** The abstraction is discovered, not designed.

## 2. What is already sport-free (VERIFIED)
`colors/src/core/` is 845 lines: `events` (GameEvent, log hash), `fold` (state is a fold over events), `keyedrng` (Philox, draws keyed by `(eventIndex, tag)`), `pack` (rules as data plus fitted params, hashed, with provenance), `snapshot` (frozen context, no sport words), `envelope`/`saver`/`profile` (typed saves, per-sport kinds), `hungarian` (assignment solver), `pmath` (portable math). The one place core names a sport in code is `envelope.ts` (`SPORT_IDS`, `SAVE_KINDS`, legacy default). `sports/nfl/` is `engine/` (league, draft, lineup, value, schedule, season), `sim/` (game, drive, pools, passclass), `app/` (store, saves, selectors), `view/` (view-models).

## 3. A sport is six things
1. **Event vocabulary**, a union of `GameEvent`s. Every user-visible stat (box score, recap, standings) is a fold over the log, so a new sport inherits the display machinery by writing folds, not screens.
2. **Step**: `(state, key) -> events`. The only place game structure lives. Pure, no clock, no `Math.random`.
3. **Pack**: rules values (regime, scoring, clock) plus fitted parameters, hashed into every save. Rule VALUES are data; rule STRUCTURE (what a down or an inning is) stays code. I will not build a rules DSL (Owner ruling 4).
4. **Keying by natural structure**: football (drive, play), baseball (game, plate appearance), basketball (possession). `keyedrng` already takes an arbitrary coordinate, so the kernel needs no change. Plan v4 measured that structural keying improves paired-counterfactual variance reduction by +3% to +26% (scratch only).
5. **Slots and ratings**: positions, formations or lineups, the rating-to-strength mapping, and the `ValueProvider` that says what a rating point at a slot is worth in wins. `slots.ts`/`flex.ts` are already positional data; `hungarian` already solves assignment.
6. **League shell**: schedule, standings, playoffs, draft, offseason, awards. Likely largely shareable (INFERRED), but I will not claim it until sport two shows it.

## 4. The one formula (a HYPOTHESIS to test on sport two, not a claim)
`passclass.ts` already has the form: a state-conditional multinomial logit gives base class probabilities `p_k(s)`, and one seam tilts them, `P_k proportional to p_k * exp(lambda * theta_k * gap)`, with `gap` a rating contrast. Candidate generalization: **every sport's atomic event is a categorical draw whose logits are additive: base(state) + rating contrasts + context tilts.** Baseball's odds-ratio (log5) matchup method is, as far as I know, this same additive-logit idea (INFERRED, general knowledge, not checked here). Sports then differ only in state, outcome set, base rates, loadings and structure, which is all pack data plus Step. Caveats I keep: lambda is not yet identified for football (NOW.md: lambda 0, GLM off; ratings-to-gap mapping is post-cutover tuning), and basketball lineup synergies may break additivity. That is exactly why sport three should be a contrast case.

## 5. Four ideas that make the plan better than "port football twice"
1. **Solver-vs-sim agreement test.** Each sport ships two views of one pack: Monte Carlo (the games) and an exact or expected-value solver (Priority). A standing test requires the simulated mean to sit within standard error of the solver. One test catches a bug in either implementation. Baseball's base-out chain and football's (down, distance, field position) chain are both classic solver shapes (INFERRED). No solver exists yet in football (VERIFIED: NOW.md puts it after cutover).
2. **Priority as a derivative.** The product's three user-visible numbers (Wins, Priority, OVR) are sport-neutral. If an engine exposes win probability as a function of slot ratings, `winsPerOvr` is its numerical derivative around the neutral roster. The existing `ValueProvider` seam (S1, Q7 law pinned by test) is that interface. A sport then plugs into the product by supplying slots, a rating mapping and a sim.
3. **Fidelity by data, not by sport.** Choose the atomic event at the level the data can calibrate (plate appearance, possession, shot attempt), not the finest level available.
4. **Sport admission checklist** (section 7): a sport is "in" when a mechanical list is green, not when someone feels it is done.

## 6. Sport two and phases (all POST-cutover)
**Recommendation: baseball as sport two; basketball or hockey as sport three.** Reasons: baseball's plate-appearance state machine is football's closest structural cousin (discrete state, categorical outcomes, a base-out state like down and distance), so it proves kernel reuse cheaply; play-by-play is reportedly free (Retrosheet event files, INFERRED, licence and attribution terms UNKNOWN until read); the additive-logit matchup is its native model. The cost of a cousin is that it under-tests the abstraction, so sport three must be a contrast (continuous flow, lineup interaction), and phase MS-2 paper-tests basketball against the contract before any code. Alternatives rejected for now: soccer (low event count, Poisson-like, weak draft/roster fit), a toy sport as the real second (proves nothing about data or calibration; it stays only as the M3 canary).

| Phase | Work | Exit gate |
|---|---|---|
| MS-0 (now to cutover) | Nothing built. Core stays sport-free; no football words (down, quarter, yard) in new core types. | Cutover ships. |
| MS-1 | Land purity checks M1-M6 (discover sports, registry consistency, toy-sport canary, sport-word ratchet, layer direction, type probe). Mechanical, about one sitting. | Canary proves a toy sport is discovered and a planted violation goes red. |
| MS-2 | Paper pass, docs only: write the six-part contract from the real nfl code; paper-fit baseball AND basketball to it; list every place it bends. | A short list of contract questions; Owner picks sport two. |
| MS-3 | Data and fit in the lab (Python oracle first, as for football): sport-two pack, atomic-event logit, oracle vectors. Tolerances declared in a commit BEFORE any run. | Oracle vectors bit-exact via `pmath`; held-out metrics recorded in provenance. |
| MS-4 | TS engine for sport two by copying `nfl/engine` league files and the sim shape, then diffing. Natural-structure keying. | Admission checklist green. |
| MS-5 | Extract only what the two sports use identically, one commit per extraction, both suites green, a declared re-pin if any seeded output moves. | Core grows only by proven-shared code. |
| MS-6 | UI: components take a slot/column schema from the view-model; no position or period literals in `.svelte` files; sport picker; per-sport profile container (already in core). | Draft board and Wins/Priority/OVR render for both sports from schemas. |
| MS-7 | Sport three as the stress test; add continuous-flow support only if the contract bends. | Owner go/no-go. |

## 7. Sport admission checklist (every item mechanical or a report)
1. Purity and layout checks discover the sport automatically (M1-M3).
2. Determinism: same seed gives the same `logHash`; golden file; no `Math.random` or clock (purity test).
3. Off-switch: each context feature off gives the baseline log hash.
4. Calibration report against real data with tolerances declared first; REPORTED, not a gate (Owner ruling 2).
5. Solver-vs-sim agreement within standard error.
6. Oracle vectors for every fitted node, bit-exact.
7. Save round trip with envelope kind, schema version, engine and pack stamps; finished seasons freeze as folds, not replay from seed.
8. Throughput number reported (machine-dependent, not a gate).
9. `ValueProvider` returns the same number for neutral and loaded snapshots (Q7 law).
10. Owner sign-off.

## 8. Cost and risk
- **Compute (INFERRED):** football measures ~315k snaps/s (VERIFIED in v4, 2 vCPU). From general season sizes, one baseball season is about 185k plate appearances, so roughly 0.6 s at football's per-event rate; pitch-level would be about 4x that; basketball about 250k possessions, roughly 0.8 s. Per-event cost may differ, so this is a budget, not a measurement. The dormant fidelity ladder (non-user games at coarser grain) covers any overrun.
- **Save size:** the old replay path was about 1.13 MB per season (REPORTED); a baseball season has several times football's events, so fold-freeze of finished seasons is mandatory, not optional.
- **Premature abstraction** is the largest risk; the defense is the rule of two. **Data licence** and coverage are UNKNOWN until read. **Calibration time-sink:** the Owner's 18 Nov ruling applies to every sport (ship first, tune after). **Scope creep before cutover:** the gate is football shipped plus an Owner go.
- **Kill criteria:** if MS-2 shows the contract needs more than minor bends for baseball, stop and report rather than force it; if sport two cannot meet checklist items 2, 3 and 7 without touching football outputs, hold the extraction (MS-5) and keep two independent modules.

## 9. Not doing
A rules DSL, a shared game-engine base class, an up-front "universal sport interface", an ECS, a learned (neural) sim, per-pitch fidelity for non-user games, a server or database, any multisport code before the football cutover, and any value tuning against history before ship.

## 10. Owner decisions (none needed now)
At the gate after cutover: go on MS-1; which sport two (my pick: baseball, after the MS-2 paper pass); whether sports share one profile and one league shell. Everything before that is mine and docs-only.
