# Engine plan v3: the multisport build, re-thought (Architect, 14 Nov 2026)

Amends `engine-design-2026-11-11.md` (the base) and `engine-plan-v2-2026-11-13.md`; this file carries only differences and new material. Docs only: no product code, dependency, save format or framework changed.

Labels: VERIFIED (read or run by me this session in `architect/engine-and-seats` at `d3bd81d`, file and function named), REPORTED (relayed by Ernie, INKLING, Z.ai or MUSE; not checked by me), INFERRED (my reasoning), UNKNOWN.

**Authority.** The Owner, 14 Nov: "the colors engine is yours and you should do whatever you think is best to complete it." I read that as: engine design, sequencing and lane work are my call. I still stop for the framework pick, any save-format change, any new dependency, and anything the Owner reserved (protected constants, what the user sees, calibration targets). On 13 Nov the TS port (1b) was held; I read today's note as lifting that hold, and section 7 says so, so one word reverses it.

## 0. In plain words

1. **Unchanged:** one football model, played one play at a time. Every stat is a count of what happened, so two screens can never disagree.
2. **One dial, not twelve.** How much each position matters relative to the others can be learned from real play data. How much *talent* matters overall is one number you turn ("league scale"). The old plan needed about a dozen separate numbers that no data could pin down (3.1).
3. **Same replay on every device.** Some math functions give slightly different answers in different browsers. The new engine avoids them, so a save, a shared seed or a server check gives identical results everywhere (3.2).
4. **Wins stay put while the engine moves underneath.** One frozen "context snapshot" per period feeds every screen, so numbers agree even though form, focus and the rest fluctuate. Your P0 (P-318) lands first because it builds the seam this needs (3.3).
5. **Every "fluctuating" idea is tested and the result recorded, including the ones that die.** Two of your ideas already have a first result; one of them may be an artefact (3.4). I also list eight more axes you asked me to think of.
6. **Draft-board slowness is an engine problem with known causes** and five cheap fixes (3.6).
7. **Saves get a safer shape now**, while nobody depends on them (3.7).
8. **One pitch for the display metric you asked for:** team Title Odds (4).

## 1. What I checked this session, and corrections to my own earlier notes

| Claim | Result | Evidence |
|---|---|---|
| P-318's line citations (Ernie) | VERIFIED, all match this tip | `git grep -n -E "\bWEIGHT\b\|\.weight\b" -- colors/src`: `draft.ts:93,145,147`, `lineup.ts:45,47,62,90`, `value.ts:40` (a comment) |
| Pool numbers (Ernie 4.7) | 1,941 CSV rows + 12 free agents = 1,953 = Z.ai's `poolCount`: arithmetic VERIFIED. The 1,921 on the board: UNKNOWN. 1,938 distinct names: not checked | `wc -l`: `madden27-ratings.csv` 1,942 lines, `free-agents-old-ratings.csv` 13 lines (one header each) |
| What a save holds | VERIFIED: every pick, CPU picks included. `restoreDraft` draws nothing and throws if a logged pick does not fit | `store.ts` `toRecord` (built from `st.log`) and `restoreDraft` |
| **Correction to my inventory note, section 3** | I called replay-from-pick-1 a cost of UNKNOWN size. It is applying a stored log, not re-simulating the CPU. The real draft cost is `goneOdds` | `goneodds.ts` |
| Where board latency lives | `goneOdds` = 30 sims x (CPU picks until the user's next turn) x `cpuChoose`. Each `cpuChoose` builds every (player, open-spot) candidate, draws one Gaussian per candidate and sorts them all | `goneodds.ts:15`, `draft.ts:104`. r1-u0 has the longest gap (62 CPU picks), so Ernie's REPORTED 1,214.8 ms is about 0.65 ms per `cpuChoose` (INFERRED arithmetic) |
| `settle` re-restores after every action | Its comment says the replacement-level cache refreshes only every few picks. The code recomputes it every pick (`replacement()` memoizes on `st.pos`). Comment looks stale; the extra replay is probably redundant (INFERRED) | `store.ts:96`, `draft.ts` `replacement()` |
| Runtime math that differs across engines | `Math.log`/`cos`/`sqrt` in `core/rng.ts:33-35` **and in the new kernel's `core/keyedrng.ts:74`**; `Math.exp` in the draft's trait draw (`draft.ts:59`) and all through the legacy engine | `git grep` for `Math.(exp|log|tanh|pow|sin|cos...)` |
| Type ratchet | The runner is `colors/tools/tsc-baseline.mjs`, the pin is `colors/tsc-baseline.json`: 91 errors in 16 files (hungarian 15, lineup 14, playerids 11, margin 10, players 9, draftBoard 8, hash 7, rest smaller). `tsconfig`: strict + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`; `include` is `src/**` only; `exclude` is `test`, `tools` | files read |
| Not checked by me | Everything about Z.ai's two deliveries, the nine-arm results, the axis (a)/(b) numbers, browser claims in Ernie 4.4/4.6 | all REPORTED |

## 2. Re-sequenced delivery

**Why re-sequence.** (1) The Phase 2 science decides what the pack must hold (fixed lambda, or lambda gated by context). Porting first would freeze a baseline-only schema. The port builds the lambda interface forward-compatible, so port and science run side by side; science gates Phase 2, not the port. (2) The product's front door is the draft, its latency is engine-bound (1), and it does not depend on the play-level rebuild.

| Track | Work | Needs first | Evidence gate (no dates) |
|---|---|---|---|
| **S** seam | S1 P-318 as a `ValueProvider`. S2 `core/pmath.ts` + vectors + lint. S3 context-snapshot type. S4 additive async store API | nothing | S1: same-seed old-vs-new report, QB-first invariant, suite green. S2: matches a high-precision reference to 1e-12 relative; Python reproduces its vectors bit for bit |
| **H** hygiene | pool ledger test; ratchet 91 to 0 in `src/`; CI minimal and report-only; Node pin; delete `legacy.ts` (P-258) | S1, so the suite is stable first | each item has its own command and result |
| **L** lab science (Python, mine) | L1 player-play join and variance components, giving relative lambda with standard errors. L2 context axes (a) and (b) re-run with a strength control, (c) via L1. L3 form bound. L4 win-probability table and leverage index. L5 league-scale reference points | council data (asks in 3.1, 3.4) | per axis: GLM's rule (held-out improvement, CI excludes 0), else DEAD and recorded |
| **K** kernel and port (1b, 1c) | vertical slice first: one drive, neutral teams, all the way to a box score in the view model. Then nodes one at a time. Pack builder. Conformance vectors. Throughput | S2 | per-node held-out report; vectors match; throughput number reported; distribution comparisons reported (a guideline, not a gate) |
| **V** views (2) | solver view; MEASURED display; lineup by iterated linearization (3.3); focus-aware Priority | K, L1 | solver value equals Monte Carlo mean; Owner reviews the curve |
| **D** dynamics (2b) | focus, form, gravity, synergy, 2-WAY, automatics, each a registry entry (3.4) | V, L | the three v2 section 3 gates plus registry status |
| **P** persistence | chunked envelope, season folds, export/import, migration scaffold, quota, multi-tab, user pin (3.7) | Owner approves the format change | round-trip tests including unknown ancillary sections |
| **U** UI shell | framework pick, re-home, smoke test | Owner's pick | not my gate |
| **X** multisport on paper | kernel sport-term lint; node kinds; onboarding checklist (3.8) | nothing | lint green; no second-sport code (ruling 4) |

**First ten steps, in order.** 1 S1. 2 S2. 3 H pool ledger and classify the 91 type errors. 4 L asks to the council (after your nod). 5 H CI report-only (blocked: GitHub Action versions are UNVERIFIED because fetch was denied, and whether a push may include workflow files is UNKNOWN). 6 K vertical slice. 7 L1 and L2 runs. 8 S3 and S4. 9 K nodes and vectors. 10 V.

**Numbering trap.** "Phase 1" has two meanings. Lab Phase 1 (the Python baseline, `ce7c921`) is done. The queue's "P-342 Phase 1" is my 1b, the TS port. The queue marks it approved; the 13 Nov record says it was not. Today's note settles it, but MUSE should relabel the row (not my edit).

## 3. New and changed designs

### 3.1 Identification: relative importance from data, one master dial for scale

**The problem (VERIFIED in design section 12 and the lab protocol read):** the data has OVR (plus SPD, STR) and no historical ratings joined to outcomes. Dispersion matching is biased (REPORTED, C2: +0.23/+0.43/+0.75), and lambda and theta are not separately identified (REPORTED, Ernie/GLM).

**Proposal (INFERRED design, needs council data):** split what to identify.
- **Relative importance across duties** (QB vs pass-block vs coverage ...): from **player-identity random effects** on play outcomes, using who was on the field (participation, 2016+). The spread of true player effect within each duty group, in outcome units, is identified without any ratings. Ridge or partial pooling, standard errors reported; offensive line as a unit because individual linemen are collinear (a known weakness of this method class). Where a duty's error bar is too wide, it ships labelled BOUNDED with the legacy elasticity as prior.
- **Absolute scale:** one number, `kappa`, "how much talent matters". Every lambda is `kappa x relative_c`. Reference points shown next to it: (i) the real league's spread of true team talent, which the council can measure from results (observed win% spread minus binomial noise at 17 games); (ii) your static success targets (90% playoffs, about 35% Super Bowl, 25% title for a good drafter). You turn one dial and see both.
- **The two-gap Lab (P-347, OR/C2) stays**, as the *recovery test*: given the estimated lambdas and `kappa`, does the engine reproduce the intended per-duty effect (bias near 0)? C2 reports it is unbiased in controlled worlds (REPORTED), which is what a recovery test needs.
- **Consistent with the 8 Nov ruling:** lambdas are play-level inputs with provenance; slot values stay outputs, never refitted.
- **Honest limit:** the sim treats OVR as true ability by construction; nothing can estimate how well Madden OVR tracks real ability. That is an axiom of the game, not a measurement.
- **Same join serves axis (c).** With no injuries, "key-player presence" reduces to player identity. One join, two answers.

### 3.2 Portable math: replay that is identical on every engine

ECMAScript allows `Math.exp`, `log`, `tanh`, `sin`, `cos`, `pow` to be approximated per implementation (general knowledge; whether Chrome, Firefox and Safari actually differ here is UNKNOWN, which is what BENCH-1 A3 would measure). Today the draft's CPU draws a Gaussian per candidate through `log`/`cos`, and trait biases through `exp` (VERIFIED, section 1). A CPU pick sits at a threshold, so a last-bit difference can in principle flip it. That matters the moment a seed is shared, a server validates a draft, or a save is continued on another device.

**Design:** make it true by construction instead of hoping A3 comes back clean.
- `core/pmath.ts`: `pexp`, `plog`, `ptanh`, `pnorminv` built only from `+ - * /`, comparisons and `floor` (square root by fixed-count Newton). JavaScript and Python both define those as IEEE-754 exact, so the same inputs give the same bits (INFERRED; the vectors test it).
- Heavy functions are **baked into tables at pack-build time** (offline); runtime does table lookup plus linear interpolation. A softmax tilt becomes a pmf grid over the tilt; `normal()` becomes inverse-CDF on a keyed uniform.
- The purity test bans `Math.exp|log|tanh|pow|sin|cos|sqrt` and `**` in `core/` and `engine/` outside `pmath.ts` and the pack builder.
- **Conformance vectors:** the Python lab emits `(state, uniform) -> outcome` vectors for each node; the TS port must match them *exactly*. That replaces v2's "match in distribution" oracle with a much stronger one for node functions, keeping distribution tests for whole games.
- Cost: about 150 lines plus tests; every seeded output shifts in the last bits (reported, not gated, ruling 2). The legacy engine is left alone until retired; the draft (which stays) migrates.
- IDEA this enables, not built: a **shared challenge seed** where everyone drafts against the identical CPU on any device.

### 3.3 Context snapshot, `ValueProvider`, and how P-318 lands

**Snapshot (GLM's design, adopted and made precise).** `Snapshot = { season, week, form per player, focus per team, flags, packHash, engineVersion }`, canonical JSON, hashed. All view-model selectors and the simulator take it. Three evaluations, one function:

| What | Evaluated at | Moves in-season? |
|---|---|---|
| **Wins** (board, user-visible) | the *neutral* snapshot: form 0, no focus, league-average opponent mix | never. This is your "static truth" by construction |
| **Priority** | the team's *focus* snapshot | only when you change focus |
| **The game** | the *week* snapshot (form drifts, focus applies) | weekly |

So "wins are wins" and "flex values stay consistent" are structural, not promises.

**`ValueProvider`.** `slotValue(slot, base, snapshot?) -> wins per OVR point`. Today: draft and lineup read the fitted `SLOTS[].weight`; display reads the measured `slotWins20` (VERIFIED, Ernie section 2). P-318 inverts that. I land it as a provider so the later solver derivative is a one-implementation swap:
1. New `engine/valueprovider.ts`; first implementation = `slotWins20(slot, base) / 20`, computed once per base and cached (cost UNKNOWN, reported at landing).
2. `draft.ts:93` `candidates()` uses it in place of `WEIGHT[s]`; `userChoose` tie-breaks at `:145,:147` likewise; `lineup.ts:45,47,62,90` take values from it; `FieldSlot.weight` is removed. `SLOTS[].weight` stays in `slots.ts` only as the retired reference table, read by nothing in draft or lineup.
3. The board's `wins` becomes the provider value directly (no extra `WINS_PER_UNIT` factor).
4. **QB-first invariant** (your "a qb generally still needs to be the most important player"): a test asserts QB has the largest measured `slotWins20`. It is a stated ordering truth, not a number pin; if it ever fails, it says so loudly for Owner review.
5. **Acceptance:** `git grep -n -E "\bWEIGHT\b|\.weight\b" -- colors/src/sports/nfl/engine/draft.ts colors/src/sports/nfl/engine/lineup.ts` is empty; suite green; an old-vs-new table from the *same seeds* (guardrail 3); QB-first holds.
6. **Why now, not after 1b:** the re-pin objection is gone (ruling 2, and `5a3bb75` made both red tests report-not-fail), and P-318 is the point Phase 2 plugs into.
7. **Lineup upgrade it enables (INFERRED, in V):** the lineup solver is linear in slot values, the true objective is smooth. Re-solve 2-3 times, linearizing at the current lineup with the solver's gradient, and it finds the best lineup under the real model including synergy. Today's linearization is at the league average.

### 3.4 Dynamics registry, and your question: "what else would make the engine dynamic?"

**Registry (pack data).** Every fluctuating feature is one entry: `id`, slot (`x` situation, `z` rating shift, `w` duty weights, `a` baseline/policy, `agg` aggregator), identification label (DATA-FIT, BOUNDED, DIAL), test status (NOT_RUN, ALIVE, DEAD), neutral default, receipt path or hash, the Owner ruling it traces to, and display class (STATIC, ARROW, HIDDEN). The engine reads only the entry's current value. **DEAD stays in the registry**, so nobody re-proposes an axis without new evidence. This is GLM's rule made permanent: fixed is the null, a dynamic must beat it on held-out seasons.

**Where the axes stand (all REPORTED unless stated):**

| Axis | Status | My read |
|---|---|---|
| (a) playoff vs regular home advantage | real-data half ran: 1.78 [1.24, 2.32] regular vs 5.57 [3.37, 7.77] playoff | **Do not act yet.** In the playoffs the home team is the higher seed, so a raw home margin mixes venue with team quality; regular-season home/away is close to random with respect to quality. Unless the cut controlled for team strength (pre-game spread, or season-to-date point differential) the CIs can separate for the wrong reason. Whether Z.ai controlled it is UNKNOWN: **ask.** Also a small sample (the interval is wide) |
| (b) divisional vs not | +1.54 pp upset, CIs overlap | DEAD by the rule; recorded as a result |
| (c) key-player presence | NOT_RUN | subsumed by L1 (3.1): no injuries, so it is the player-identity effect |

**Eight more axes (candidates, none a mandate; each has data that can test it):**
1. **Venue:** roof, surface, wind, temperature moving kicking and deep passing (nflverse carries roof, surface, temp, wind). DATA-FIT.
2. **Rest:** days of rest, bye (schedules carry rest days). DATA-FIT; my prior is small.
3. **Tempo as part of focus:** seconds per play by team and situation. DATA-FIT.
4. **Style variance:** a deep-passing focus raises the explosive share of the yards mixture and lowers efficiency; a ground game does the reverse. Changes the *shape*, not the mean. DATA-FIT from yards by depth.
5. **Within-game fatigue and rotation** for lines and backs (participation shows rotation). BOUNDED.
6. **Momentum / hot hand:** expected DEAD; worth recording as dead.
7. **Blowout compression:** leaders run and burn clock; part of the situation baseline `a(x)`, already planned. DATA-FIT.
8. **Kicker icing / clutch kicking:** DIAL at best; expected DEAD.

Not on the list on purpose: per-player clutch (your 11 Nov ruling) and injuries (none, every sport).

### 3.5 Leverage index: one signal for clutch visuals, narration and automatics

Leverage index = how much the next play can move the win probability, relative to a typical play (standard sports-analytics definition). It comes from the win-probability table that Phase 1c already adds as a pack parameter. One signal feeds four things:
1. **Clutch visual intensity.** Your *rule* is unchanged: clutch = final 5 minutes of the 4th quarter plus overtime (your 11 Nov words), and that window is what makes 2-WAY and the automatics eligible. Leverage only sets how *loud* the screen is inside and around it, so a 4th-and-goal in the 2nd quarter can register without redefining clutch. The engine exposes it as a fold per event, formatted as text like every user-facing number; the visual is Z.ai's.
2. **Highlights:** rank events by win-probability swing; the recap narrates the top few.
3. **4th-quarter automatics:** a one-step lookahead on the same table.
4. **CPU aggression.**

**2-WAY (ruling 13).** Full design in `claude/notes/2026-11-13-cross-side-stars-design.md`.

### 3.6 The draft front door: cost model, five levers, async contract

Cost model from the code (VERIFIED, section 1): board cost = 30 x CPU picks until your next turn x `cpuChoose`, and `cpuChoose` builds, noises and sorts every candidate. Ernie's measurement fits (REPORTED 1,214.8 ms desktop; 8.7-8.9 s at 6x throttle, identical across frameworks, so it is the engine, not the UI).

| Lever | What | Output changes? |
|---|---|---|
| L1 | memoize gone% per (record revision, pick): sort and filter must never recompute it (whether it is memoized today: UNKNOWN) | no |
| L2 | keep each team's candidate list across picks; update only when the picked player or the open spots change | no |
| L3 | take the top few instead of sorting everything (the code needs rank 0 or a rank within the top 12) | no |
| L4 | keyed noise per (pick, player, spot) plus bound-and-prune: skip drawing for a candidate whose best possible score cannot reach the cut | yes (re-pin class, reported) |
| L5 | adaptive sims: stop when every player's interval is under about 2 points (most are near 0 or 1) | yes, slightly |
| L6 | progressive paint plus a Worker | no |

**Async contract.** Add promise-returning twins (`dispatchAsync`, `selectBoardAsync` returning a view model or `{pending}`), additive so no arm breaks; keep the sync API until the arms stop mounting it. View models are plain strings, so a Worker boundary, and later a server, is trivial. Doing it before the nine-arm test finishes is cheap; after, it is a contract migration. `store.ts` is my lane.

**Also:** a property test that live state equals restored state at every pick, then drop `settle`'s replay if it holds. UX-3 (INKLING: p95 about 64 ms vs 50 ms budget) is probably engine-side too (`selectRoster` likely runs the lineup solver; not read, INFERRED). The BENCH-1 budgets stay provisional and report-only.

### 3.7 Persistence: change the shape now, while it is free

Nobody has shipped (ruling 8: w89 saves are not preserved), so a format change costs nothing today and a lot after cutover.
- **Chunked envelope.** Sections `{id, v, critical, data}`. A *critical* section this build does not understand makes it refuse the save (the existing `newer-version` behaviour). An *ancillary* section it does not understand is kept verbatim and written back. That removes the classic hazard where an older build silently strips what it does not know.
- **Sections:** `draft` (critical, unchanged), `seasons[]` (critical: frozen folds, plan 4b, holding **awards**), `user` (ancillary: favourites pin, `saveId -> [pid]`), `prefs` (ancillary).
- **Answer to Ernie 5:** awards live in the season fold, not the draft record (they need the season sim, so they cannot derive from picks); the pin lives in `user`. `SaveRecord` is untouched. The envelope shape is decided now; the fold content waits for the fold schema (Phase 3).
- **Version honesty check.** Replay is valid only within (`engineVersion`, pack hash). CI hashes a small set of golden seeds and fails if the hash changed while `ENGINE_REV` did not. It pins no value; it forces an *explicit declaration* that outputs moved. Not the weight pin you ruled out, but it is close enough that I want your yes (7).
- **Also:** export/import file (the real backup), migration scaffold (empty at v1), quota-error classification (hook exists), multi-tab guard.
- **Pool ledger:** a generated report (rows, ids, exclusions with reasons, counts per position) hashed into the data version; the board count must equal it. Explains the 1,953 vs 1,921 gap when written.
- **E1 achievements** (Z.ai's data-file idea, no evaluator exists): a small predicate language over season folds, evaluated at season freeze. Phase 3, not before.

### 3.8 Multisport, on paper only (ruling 4: football only until it ships)

- **Node kinds as pack data:** `choice` (softmax over outcomes: football, baseball plate appearance), `duration` (quantile table), `hazard` (competing exponentials: time to next event and which: hockey, soccer, basketball clock). The kernel's API (keyed RNG, events, folds, pack, step) does not change; samplers are library functions added when a second sport exists.
- **Kernel stays sport-blind, mechanically:** extend the neutrality test to scan `core/` identifiers (not comments) for sport terms (down, yard, quarter, punt, touchdown, inning, ...). It runs on football alone, so it needs no second sport. Expect some false positives at landing and a short allow-list.
- **Interactions come from the node graph, not product terms.** The QB-with-no-time case is the pressure node upstream of completion; the drop in a top QB's value behind a weak line emerges and shows up in the solver derivative. Structure over terms.
- **Onboarding a sport (the portability test, made operational):** 1 duty table, 2 rules object, 3 state machine and node list with kinds, 4 pack fit (lab code path), 5 folds, 6 conformance vectors, 7 neutrality lint passes unchanged. If step 7 needs an edit to `core/`, the design failed.

## 4. The display metric you asked me to pitch

**Pitch: team Title Odds, shown once in the draft header and recap; per-player stays Wins, Priority, OVR.** It does not replace Wins ("wins are wins"), and it adds no second number to any player row.
- Every fan reads playoff and title odds daily. It speaks directly to your success targets, so a draft reads as "contender or not" rather than "+3.1 wins".
- One number everywhere: computed once per snapshot, seeded by the snapshot hash so it is deterministic, shown identically in header and recap. It is derived from Wins, never a competing figure.
- Cost: INFERRED cheap if computed at game level (solver expected margin to win probability, a season Monte Carlo over 272 games), not play level. Must agree with the full simulation (the consistency property). Unmeasured.
- Fallback if you prefer no new concept: projected record, the sum of Wins over the lineup. Linear and literal.
- GLM's "Gap": I have not read the text, only the name (REPORTED). I do not rank it.

## 5. Risks, with a stated fallback for each

| Risk | Fallback / kill criterion |
|---|---|
| Throughput misses (BENCH-1 ENG-2: season over 10 s on the reference runner after table and struct-of-arrays work) | **Fidelity ladder:** play level for your games and playoffs, chain-level game pmf from the same pack for the rest. Same nodes, one pack, different grain. Used only if the gate is missed |
| Variance components too noisy for some duties | ship them BOUNDED or DIAL with the legacy prior; `kappa` still works; the sim still runs |
| Python and TS vectors will not match bit for bit | fall back to distribution-only conformance (v2) and find the op-order difference |
| Quantile pack too large (v2 4a target 2 MB gzip) | fewer knots, hierarchical backoff, or GLM nodes; pick the smaller within the noise band (parsimony) |
| Too many ideas at once | tracks are independent; each idea has a skip rule above; nothing blocks the draft |
| I am wrong about the playoff artefact | cheap to check (3.4 ask); if controlled, axis (a) is ALIVE and goes through the normal test |

## 6. What I would not add

A Rust or WASM core (JS plus tables is fast enough; revisit only if the throughput gate fails), a database or auth, a simulation-design DSL (v2 D18), a learned generator, per-player clutch, second-sport code, PWA, user analytics, ESLint plus Prettier, nightly lab automation.

## 7. Owner decisions (each with my default; none blocks S1 or S2)

1. **TS port (1b):** I read your 14 Nov note as lifting the 13 Nov hold. I start 1b after S1 and S2 unless you say "hold".
2. **League scale:** approve the single-dial concept (3.1) in place of twelve.
3. **Display metric:** Title Odds yes, no, or something else (4).
4. **Chunked envelope:** approve the save-format change (3.7) before I touch `core/envelope.ts`.
5. **Version honesty check:** confirm it is not a "pin" (3.7).
6. **Still open from the assessment:** `@types/node` as a dev dependency and a Node version pin (needed to type-check tests under a second ratchet; I will not change the meaning of the pinned 91).

## 8. UNKNOWN, stated once

Cross-browser float agreement of the current engine; throughput of a TS play step; whether the playoff-home signal survives a strength control; whether player-identity effects are tight enough for the line; form's real upper bound; the 1,921 board rows; whether `selectBoard` memoizes gone%; GitHub Action versions and workflow-file push scope; the verbatim text of your original answers (still relayed only).
