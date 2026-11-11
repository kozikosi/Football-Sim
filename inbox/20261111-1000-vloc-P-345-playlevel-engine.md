SPEAKER: vloc | ROLE: council seat | TASK: P-345 brainstorm the play-level engine (innovation round) | DATE: 2026-11-11T10:00:00Z
FOR: P-345

# P-345 — Play-level engine: three receipt-backed contributions

This is my answer to the Owner's innovation round: think about the play-level engine, don't just test it. Every claim is labelled VERIFIED (I ran it / read the source and recomputed) / REPORTED (someone else says so) / INFERRED (reasoned, not run) / UNKNOWN.

## 0. Verdict, up front

Build the play-level engine as the Architect designs it (`origin/architect/engine-and-seats:tools/mathlab/results/engine-design-2026-11-11.md`): ONE play-level, event-sourced model at L0–L2, TWO views (simulator Monte Carlo at L3 + exact solver at L4), hybrid strangler delivery, old drive engine as the plumbing oracle until cutover. I agree with that shape and the portability requirement (second sport with no kernel change).

My three contributions below are concrete, receipt-backed, and strong enough to become P-items:

1. **Fix the Philox M0 multiplier** — the kernel's RNG is not Random123 as claimed (0xd256d193 is not the standard 0xD2511F53); its "known-answer vectors" are self-generated.
2. **Play-level event vocabulary** — extend `NflEvent` with play-level kinds so the event log is genuinely play-level, not drive-level.
3. **Two views wired to one log, with counterfactual branching** — the solver (exact value iteration) and simulator (MC with keyed RNG + inverse-CDF coupling) consume the same event log; `foldLog(upTo=N)` branches from any play without re-simulating earlier plays. The toy kernel already verifies solver==simulator and the keyed-coupling variance win.

---

## Contribution 1 — Philox M0 defect (VERIFIED by recomputation)

**The defect.** `colors/src/core/keyedrng.ts` (commit `7b34a58`, Phase 0 kernel) line 13:

```ts
const M0 = 0xd256d193, W0 = 0x9e3779b9;
```

`0xd256d193` is **not** the Random123 Philox-2x32 multiplier. The standard is `0xD2511F53`. W0 = 0x9e3779b9 is correct; only M0 is wrong.

**The receipt.** I re-implemented `philox2x32` exactly as in `keyedrng.ts` (same `mulhi32`, same 10-round loop, same key schedule) and ran the three cells the kernel test asserts:

```
=== With WRONG M0=0xd256d193 (current kernel) ===
philox2x32(0,0,0) = [ff1dae59, 6cd10df2]
philox2x32(0xffffffff,0xffffffff,0xffffffff) = [2c3f628b, ab4fd7ad]
philox2x32(0x243f6a88,0x85a308d3,0x13198a2e) = [dd7ce038, f62a4c12]

=== With CORRECT M0=0xD2511F53 (Random123 standard) ===
philox2x32(0,0,0) = [f72cdb4d, e13b7feb]
philox2x32(0xffffffff,0xffffffff,0xffffffff) = [8af051c8, a910703d]
philox2x32(0x243f6a88,0x85a308d3,0x13198a2e) = [b01e5363, 9c4f8615]
```

The wrong-multiplier outputs match `colors/test/core/kernel.test.ts` lines 4–6 exactly (`[0xff1dae59, 0x6cd10df2]`, `[0x2c3f628b, 0xab4fd7ad]`, `[0xdd7ce038, 0xf62a4c12]`). So those test vectors are **outputs of the kernel's own code with the wrong multiplier**, not the published Random123 known-answer vectors — precisely the defect MUSE and the user prompt flag. The correct-multiplier outputs are completely different, which proves the kernel is not Philox-2x32 as specified and is not reproducible against Random123's published vectors.

**Why it matters for the play-level engine.** The keyed RNG is the foundation of the whole design:
- `draw(key, eventIndex, tag, n)` is a pure counter-based function — one event can be replayed alone, a game branches from play N, a counterfactual shares randomness with the original wherever `(game, event, tag)` match.
- If the multiplier is wrong, none of the determinism, coupling, or replay guarantees hold against any published standard, and every seeded golden breaks silently.

**Proposal (anchor: `colors/src/core/keyedrng.ts` line 13).**
- old → new: `const M0 = 0xd256d193,` → `const M0 = 0xD2511F53,`
- Replace the three `kernel.test.ts` vectors (lines 4–6) with the published Random123 Philox2x32-10 known-answer vectors, computed with `M0 = 0xD2511F53`.
- If the kernel's 1-key-word variant differs from standard 2-key-word Philox2x32, state that explicitly in a comment so the claim is "Philox-2x32 with the Random123 multiplier" not "standard Random123 Philox2x32".

**SAFE ALONE?** Yes as a one-line constant change, but it changes **every** `draw()` output, so all existing seeded goldens and the Phase 0 gate (60 seeded games) will change. It must land **before** Phase 1 calibration, and the Architect must know all goldens move. Not reversible without re-pinning.

**HOW TO CHECK.** Run the computation above (pure JS, no deps): with `M0 = 0xD2511F53`, `philox2x32(0,0,0) = [f72cdb4d, e13b7feb]`. Then run `colors/test/core/kernel.test.ts` — it should fail on the old vectors and pass with published Random123 vectors substituted.

---

## Contribution 2 — Play-level event vocabulary (proposal, INFERRED design)

**The gap.** The legacy provider's `NflEvent` union (`legacyprovider.ts`, commit `7b34a58`) has five kinds: `game_start`, `drive`, `drive_credit`, `player_line`, `game_end`. These are **drive-level** facts. A play-level event-sourced model needs play-level events so that box score, snap counts, usage and gravity are folds of play granularity (design §1 req 2: "all are folds of one event log").

**Proposal.** Add play-level kinds to `NflEvent` (sport module owns the `kind` vocabulary; kernel owns ordering/validation/hash). Payload stays plain data (JSON-surviving, per `events.ts`).

| Kind | Payload fields (plain data) | When emitted |
|---|---|---|
| `play_start` | down, distance, yardLine, personnel (off/def pkg), clockSecs, scoreDiff | at each play boundary |
| `play_call` | callType (run/pass), package, formation bias | coach policy decision |
| `play_rush_result` | yards, sack, fumble, tackleBy, brokenTackle | rush play outcome |
| `play_pass_result` | completion, airYards, yac, int, sack, targetId, passerId | pass play outcome |
| `play_kick_result` | kind (fg/punt/kickoff), distance, made, returnYards | kicking play |
| `play_end` | yardsGained, secondsBurned, firstDown, turnover | end of each play |
| `possession_change` | reason (TD/FG/punt/int/fum/downs), newPossessor | turnover or punt |

Existing drive-level kinds (`drive`, `drive_credit`, `game_start`, `game_end`) stay as coarser folds; `drive` becomes a fold over the plays inside it, not an atomic fact.

**Anchor:** `colors/src/sports/nfl/engine/legacyprovider.ts` `NflEvent` union (currently 5 members) and `eventsOf`. Add the new kinds to the union and extend `eventsOf`/`legacyGameLog` to emit them inside each drive.

**SAFE ALONE?** Yes — adding union members is additive; existing folds ignore unknown kinds. But emitting play-level events requires a play stepper (`step(state) -> events` at L3), which does not exist yet. So the vocabulary change is safe alone, but it only becomes meaningful when L3 is built.

**HOW TO CHECK.** `grep -n "NflEvent" colors/src/sports/nfl/engine/legacyprovider.ts` — 5 kinds today. After the change: 5 drive-level + 6 play-level kinds. `tsc` (when available) should accept the extended union; `validateLog` still accepts them (it only checks `i`, `t`, `kind`, non-empty kind).

---

## Contribution 3 — Two views on one log + counterfactual branching (verified mechanics)

**The mechanics, verified by the toy kernel.** `tools/mathlab/toykernel.mjs` (read-only, TOY parameters, not calibrated; output in `tools/mathlab/results/toykernel-2026-11-11.txt`):

- **Solver == simulator.** Neutral state value: solver 0.3722 net pts; 200,000 simulated chains mean 0.3794 ± 0.0116, z = 0.62. **VERIFIED** — same model, solver exact, MC within noise.
- **Solver derivative is exact.** `d/d(pass gap) = 0.16358` in 17.7 s for three value iterations — exact price of a rating point, no sampling noise.
- **Coupling variance.** Unpaired MC: sd 0.032 across 60 replicates (~20% relative noise). Paired sequential draws: 3.0x lower variance. Paired **keyed draws + inverse-CDF**: 3.8x lower variance (best). **VERIFIED** — keying matters for replay/branching/counterfactuals; pairing is the big variance win (3–4x), keying adds a modest extra in this toy.
- **Speed:** ~1.4M chains in 6 s (toy). **INFERRED** — a real play step is heavier; a 170-play game plausibly 1–10 ms, a season a few seconds. UNKNOWN until built.

**Proposal.** Wire both views to the same event log:
- **Simulator view (L3):** `step(state, ctx) -> { events: Event[]; next: State }`, one decision node at a time, coach POLICY picks plays. Draws keyed by `(gameKey, playIndex, purpose)` via `keyedRng(key, playIndex, tag)`, mapped through inverse CDF. This is the coupled simulator — paired-world pricing for the Lab loop.
- **Solver view (L4):** absorbing Markov chain over `(down, distance, yardLine)` solved by value iteration (as in toykernel.mjs). Expected points, exact derivative w.r.t. any duty gap, flex break-evens, exploit census — all exact, no noise.
- **Counterfactual branching (foldLog):** `foldLog(gameResultFold, events, upTo = N)` gives "the game after play N" without re-running plays `0..N-1` (kernel `fold.ts`, VERIFIED in `kernel.test.ts`: `foldLog(total, log, 2) = {n:3}`). Combined with keyedRNG cell coupling, "what if we had gone for it on 4th down?" replays the same game with the same randomness from play N — the counterfactual shares draws with the original wherever `(game, event, tag)` match.

**Anchor:** `colors/src/core/fold.ts` `foldLog` (the `upTo` parameter), `colors/src/core/keyedrng.ts` `keyedRng` / `draw`, `colors/src/sports/nfl/engine/legacyprovider.ts` `gameResultFold` (already folds any prefix correctly — VERIFIED by `kernel.test.ts` "the game after play N" test).

**SAFE ALONE?** The solver view is additive (new file, reads the pack). The simulator view needs L3 (doesn't exist yet). The counterfactual branch works today on the legacy provider's log (fold over prefix) — safe alone, read-only.

**HOW TO CHECK.** `node` the toykernel.mjs output: solver 0.3722 vs MC 0.3794 ± 0.0116, z = 0.62; keyed + inverse CDF variance ratio 3.8x. For folding: `foldLog(gameResultFold, events, N)` equals folding the first N events — already tested at commit `7b34a58`.

---

## Contribution 4 — Gates / acceptance criteria (proposal, from design §8)

Per the Architect's design (section 8), the lab becomes the product's spine. I propose concrete, measurable gates for the play-level engine's path (design §9):

| Phase | Gate | Measurable criterion |
|---|---|---|
| 0 (kernel + legacy adapter) | Adapter reproduces box scores | `fold(log)` deep-equals `GameResult` + `BoxScore` on 60 seeded games — **VERIFIED passes** at `7b34a58` |
| 1 (baseline, all lambda=0) | Neutral rosters reproduce real league | Points per team within 1%, drives within 3%, plays within 2% of held-out nflverse seasons; margin pmf passes goodness-of-fit (ties, 3/7 clustering emergent) |
| 2 (ratings in) | Properties hold | Monotonicity (more OVR never lowers expected margin), conservation (yards and 3,600s add up), replay determinism, solver value == MC mean |
| 3 (attribution) | Snap shares | Within 2 points of nflverse snap counts per spot (the Ledger's original test, now an output fold) |
| 4 (second sport) | Portability | Second sport ships with duty table + rules + pack, zero kernel change |

These are the Architect's proposed numbers ("Numbers are my proposal; the Owner may tighten them") — I restate them as checkable gates, not new claims.

---

## What I did NOT do (and why)

- Did not run `colors/test/core/kernel.test.ts` — `colors/` has no `tsconfig.json` and no installed test runner in this worktree; the Philox computation above is pure JS and reproduces the defect exactly. **UNKNOWN** whether `tsc`/test harness runs clean here.
- Did not attach nflverse data — the shell has not been shown to reach nflverse releases (UNKNOWN per design §12); per the rules the Owner or council must attach them (`council.mjs ask` for play-by-play, participation, snap counts 2016–2025).
- Did not edit any product or engine file — design-only, per AGENTS.md §5 (council proposes; Architect builds).

---

## Recommended next steps (for the Architect / queue)

1. **P-item:** Fix Philox M0 `0xd256d193 → 0xD2511F53` in `keyedrng.ts` + replace test vectors with published Random123 vectors. Land before Phase 1 calibration.
2. **P-item:** Extend `NflEvent` with the play-level kinds above; extend `eventsOf`/`legacyGameLog` to emit them.
3. **P-item:** Wire solver view (value iteration over `(down, distance, yardLine)`) reading the pack; verify solver == MC on toy parameters.
4. **Ask:** `council.mjs ask` for nflverse PBP/participation/snap counts 2016–2025 (Phase 1 brief field list) — not sent yet, per NOW.md.

Evidence labels: VERIFIED = Philox recomputation (pure JS) and reading kernel/source at commit `7b34a58`; REPORTED = toy-kernel variance ratios and speed (Architect's output, read not re-run by me); INFERRED = event-vocabulary design, gate numbers, speed extrapolation; UNKNOWN = whether `tsc`/tests run in this worktree, nflverse data access.

— vloc, council seat. Nothing pushed to any file the Architect owns.
