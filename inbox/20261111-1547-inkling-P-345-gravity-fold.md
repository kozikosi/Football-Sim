SPEAKER: inkling | ROLE: council seat | TASK: P-345 innovation round — Q4 gravity as a formally measured stat | DATE: 2026-11-11T15:47:00Z
FOR: P-345

## Question addressed
**Q4 — Gravity as a formally measured stat (P-335).** Double teams, usage, defensive gravity — measured and shown in advanced stats, possibly inside the formula itself. How do you measure gravity from an event log? What must the event schema carry that it doesn't (a double-team flag? a coverage assignment? a usage share per play)? What is the cleanest first measurement — one number per game that would convince the Owner it is real?

## Idea (one line)
**Gravity is not a new price term and not a scouting patch — it is a fold. Make the play events carry the defense's coverage/block assignments (the softmax quantities the play model already samples from), and gravity falls out as `count(doubles faced)` per player with zero new physics: the assignments ARE the re-normalised threat distribution the design already names as mechanism.** The cleanest first measurement is an *instrument proof*, not a league fit: inject a known threat gap, and show the fold recovers it monotonically — exactly the discipline Phase 0 applies to `fold(log) == GameResult`.

## Method / oracle discipline
No flex derivation; K-scale constants untouched. Nothing in the product or engine is modified; the prototype is a synthetic micro-model (`deliveries/p345-gravity-fold.mjs`, runs: `node deliveries/p345-gravity-fold.mjs`). Prototype RNG is mulberry32 (labelled synthetic, NOT the product's keyed Philox; this file makes no claim about the corrected RNG constant). Numbers below are VERIFIED by running it; the mechanism is deliberately mirrored on the design doc's own sentence ("Gravity is the defense's duty weights `w_{c,j}` re-normalised toward the offense's threat distribution — one mechanism, no extra price term, living inside value").

## Receipt (VERIFIED — command output)
```
setup: 400 games x 50 snaps, seed 20261111, beta 1.2, non-rusher base ovr 78, TE = base-5
-- coverage gravity rises with the injected WR1 gap (DE1 held at 92) --
gap + 0: WR1 doubles 0.271/snap | WR2 0.270 | WR3 0.266 | TE 0.244 | DE1 doublesFaced 0.582/snap
gap +10: WR1 doubles 0.311/snap | WR2 0.257 | WR3 0.251 | TE 0.233 | DE1 doublesFaced 0.582/snap
gap +20: WR1 doubles 0.357/snap | WR2 0.241 | WR3 0.237 | TE 0.220 | DE1 doublesFaced 0.582/snap
gap +30: WR1 doubles 0.401/snap | WR2 0.230 | WR3 0.220 | TE 0.207 | DE1 doublesFaced 0.582/snap
-- rush gravity rises with the injected rusher ovr (WR1 gap 0) --
rusher  85: DE1 doublesFaced 0.306/snap
rusher  90: DE1 doublesFaced 0.503/snap
rusher  95: DE1 doublesFaced 0.701/snap
-- control: WR1 gap 0 must not create an advantage (within noise) --
control: WR1 doubles 0.271/snap | WR2 0.270 | WR3 0.266 | TE 0.244 | (flat, as required)

log size: 50 events, 4.5 KB for 50 snaps -> ~0.09 KB/snap, ~15.2 KB/game (170 snaps)
```
The instrument recovers both injected gravities strictly monotonically (coverage: 0.271 → 0.311 → 0.357 → 0.401; rush: 0.306 → 0.503 → 0.701), the control is flat, and the cost of adding assignment payloads to the log is ~15 KB/game on top of events you already emit (~0.09 KB/snap) — negligible against a 650 KB product. The log stays a plain JSON array; the fold is a 20-line reducer.

## The design: what the event schema needs (and doesn't)
Today's schematic event (`{i, t, kind, actors, payload}`) has the right SHAPE; the football module's `payload` must grow three things per contest play:

1. **Coverage assignment vector** `cov: [WR1, WR2, WR3, TE, …] → nDBs` (sums to 4 in 4-DB personnel). Doubled = index with count ≥ 2.
2. **Rush assignment vector** `rush: [C, OG1, OG2, OT1, OT2] → nDL` (sums to 4 in 4-man fronts), or equivalently per-defender blockers matched.
3. **Usage weights per play** — the offense's own softmax over eligible targets/carriers *as sampled on this play* (the quantities the play model already computes; emitting them is free).

NOT needed: a new `doubleTeam` event KIND (derivable), new actors (already ids), or any change to the kernel, the fold framework, or the RNG. The `doubled` flags are *derived* in the fold (count ≥ 2), not authored — one source of truth, exactly the Phase 0 discipline.

**Three gravity stats, one mechanism:**
- **WR gravity** (offense): doubles faced per target-opportunity, per player.
- **Pressure gravity** (defense): doublesFaced per rush — how the offense's protection resources moved toward a rusher (the DE1 line above; this is the rim-protector analog the Owner asked about for SS/DT types).
- **Block gravity** (offense, line): count of times a blocker absorbed a second-or-later rusher — the offensive mirror of pressure gravity, same vector, different fold.

Each is a *fold* (`GravityFold`), so the box score/recap/leaders cannot disagree with the gravity numbers — they are the same log, same principle the Phase 0 adapter proved for GameResult/BoxScore (REPORTED: `7b34a58`, gate passes on 60 seeded games).

## The cleanest first measurement (for the Owner)
**One number per game: the gravity differential.** For the Owner's product, print per game: `WR1 doubles − mean(WR2, WR3 doubles)` and `best-rusher doublesFaced`. Two real FCS-style demonstrations exist from this prototype: at injected gap +20 (a 98-OVR WR1 vs 78s), WR1 sees +0.12 doubles/snap over WR2 (0.357 vs 0.241) — over 170 snaps that is ~20 extra doubles per game, a visible, nameable fact ("the engine accounts for the coverage he draws"). What would convince the Owner it is REAL in product: a visible legend row in advanced stats — "Double teams faced: 21 (league avg 6.1)" — traceable to plays he can watch, reproducible from the seed. The prototype is the instrument proof; the product gate is the fold surviving contact with real packages.

## What would falsify it / what it needs
- **Fidelity falsifier:** if real double rates (where they can be charted) do not separate elite from ordinary threats *within a team* once package/game-script are held constant, the mechanism is fiction regardless of how clean the fold is. Needed: a charting source — public play-by-play (nflverse) does NOT carry double-team assignments; PFF does but is licensed (Owner decision); Madden's own franchise-mode cast can't help. **Explicit data ask: PFF premium (or equivalent licensed charting), or an Owner-authorised N=small manual chart (e.g., 2 televised games) to fit BETA per package.** Without it, the honest label on gravity in Phase 1 is INFERRED (instrument proven, magnitudes synthetic), never VERIFIED.
- **Construction falsifier:** if assignments are emitted per play, the sum of coverage units must equal the DB count *every play* — a conservation check on the log (the same kind Phase 0 uses). If the module emits 3 DBs on a 4-DB play, the fold lies. This is a cheap invariant test, not a research question.
- **Scope falsifier:** gravity inside the formula itself (an extra price term) would violate "no extra price term" from the design; keep it as (a) a fold for display, and (b) optionally as an *input normaliser* of `w_{c,j}` exactly as the design states — never as a separable bonus. If a seat proposes `gravity bonus +2`, reject it; it reintroduces authored constants the 8 Nov ruling removed.
- **Where it touches P-336/P-338 (dual roles, DL5):** the DE1/pressure-gravity line is the metric that would show whether the DL5 blitzer or a stacked EDGE warps protection — i.e., the fold doubles as the position-testing instrument for Q7 roles. One instrument, three questions.

## What it would take to test
(1) Phase 1 module emits the three vectors in contest-play payloads; (2) a conservation invariant test (units sum to DB/DL counts per play) run in the Phase 0 gate style; (3) the three folds registered next to the BoxScore fold; (4) an Owner/council charting sample to anchor BETA (or accept INFERRED); (5) advanced-stats row shipped in P-036/P-335 behind the "counted as" discipline. No engine file touched here; the Architect decides. Estimated schema cost: ~15 KB/game.

## Labels
Prototype output VERIFIED (this session). Mechanism mirroring the design doc REPORTED (read, not re-derived). Conservation invariant INFERRED (not yet implemented — it is a test, not a result). Real-world validity of double rates REPORTED as unknown-without-charting (PFF licensed). "Gravity" as display stat is a product call — for the Owner, not this round.
