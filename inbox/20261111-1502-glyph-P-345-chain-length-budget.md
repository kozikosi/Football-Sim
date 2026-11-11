SPEAKER: Glyph | ROLE: Council seat (engineering/review) | TASK: P-345 innovation round — chain-length / possession-budget gap and drive-budgeted play staging | DATE: 2026-11-11T15:02:00Z
FOR: P-345

## Question addressed
**Q2. The chain-length gap.** Z.ai's PLAYLED is −27% on possessions with the gap located (chain-length), not closed. What closes it — a drive-model artifact, a play-model problem, or a calibration issue? Is there a staging of plays inside drives that preserves the drive engine's totals exactly while giving the Ledger real plays?

## Method / oracle discipline
- **No flex derivation performed.** `tools/mathlab/flex.json` in this worktree reports 107 mappings total (`python3 - <<'PY'` counting `flex[src][dst]` entries) with `_source` "REV 4, Owner 29 Oct..." — this is the **retired REV 4 (107-rule)** file per prompt; I did not use it as an oracle. Live oracle not needed for this filing.
- **Artifacts read (VERIFIED by command):**
  - Z.ai PLAYLED: `z full rebuild draft/_agents/zai/deliveries/playled-2026-11-11/totals_final.json`, `DESIGN-PLAYLED-REBUILD-2026-11-11.md`, `README.md`, `ledger_sample.json` (commit `0f8deac6` in this repo history as provided).
  - Phase 0 kernel: `git show 7b34a58:colors/src/core/{events,fold,keyedrng,pack}.ts` and `colors/src/sports/nfl/engine/legacyprovider.ts` (architect commit named in prompt).
  - P-344 nflverse baselines: `git show origin/council/muse:_agents/muse/deliveries/p-344-nflverse-phase1-2026-11-11/league_means_sds.csv` and `inbox/20261111-0936-muse-P-344-nflverse-phase1-data.md` (council/muse `c7540b04` per prompt).
- **Derived calculations below** computed with `python3` one-liners over those artifacts in this session (commands/output reproducible from the same files).

## 1) Diagnosis: the gap is possession budget / clock accounting, not "chains too short"

**VERIFIED (from artifacts):** nflverse 2016–2025 all team-games (n=5522, P-344): points 22.7796, drives 11.0907, plays 81.4582, off_plays 62.4448, yards 343.6704, TOP 1815.56s. Derived: **7.345 plays/drive**, **5.630 off_plays/drive**, **163.70s TOP/drive**, **22.29s TOP/play**, **30.99 yards/drive**, **2.054 pts/drive**.

**VERIFIED (from `totals_final.json`, even80, 1500 games/cell):** PLAYLED sim drives 7.991, plays 59.838, points 18.802, rush+pass 293.884 yards. Derived: **7.488 plays/drive** (≈ NFL target, > engine 6.010), **36.78 yards/drive**, **2.353 pts/drive**, but **drives -27.95% vs nflverse target** (sim/target 0.721) and **plays -26.54%**. Engine ref in same file: drives 10.939, plays 65.740, points 21.841.

**INFERRED (reframing):** PLAYLED possessions are not under-producing plays per possession; they are *over-producing value per possession* while producing too few possessions. That pattern is consistent with **clock/transition consumption per possession being too high** (or total playable possession slots too low), not with per-down conversion being globally too weak. If ~1800s team TOP budget holds, PLAYLED implies ~225s/drive at 8 drives vs ~164s target; alternatively, if per-play clock cost averages ~30s (README states INFERRED play seconds like run 33s/cmp 31s/inc 9s etc.), 59.8 plays ≈ ~1800s before fully accounting drive transitions/possession structure — i.e. the system spends the time budget on fewer, richer drives. **This makes "chain-length" a misnomer: play-count/chain is near-right; possession-count/clock-chain is short.**

**Why this matters (INFERRED):** tuning per-band conversion rates alone can change yards/points per drive but will not reliably create +3 possessions/team-game unless it also changes how many possessions fit in regulation (clock stops, incompletions, out-of-bounds, changeover time, punt/FG/special-teams play accounting, kneels/spikes, accepted penalties absent per design). Z.ai reports spending calibration budget (play mix, conversion shapes, 4th-down rules, completion mixtures, 16-point grid) for drives 7.0→8.0, not 10.9 (REPORTED in DESIGN). That is the expected outcome if the binding constraint is time/possession budget rather than within-drive continuation probability.

**Falsifiable test:** instrument PLAYLED (or any play model) to emit per-drive `{plays, off_plays, team_TOP_sec, start_reason, end_reason, clock_at_start/end}` and per-team `{drives, total_TOP_sec, regulation_secs_accounted}`. If `total_TOP_sec / drives >> 163.7s` while `plays/drive ≈ 7.3`, the gap is clock/possession-budget; if `plays/drive << 7.3` with many early punts/TOoD, it is conversion/chain termination. **UNKNOWN here** because per-drive TOP is not in the shipped `totals_final.json`; only aggregate means are available.

## 2) What closes it: a drive-budgeted (conservation) staging, not bottom-up emergence for totals

**Claim (INFERRED, design proposal):** The Ledger path should treat the authoritative drive engine as the **possession-budget oracle** and stage plays *inside* each realized drive under hard conservation constraints. This preserves the drive engine's totals exactly (Owner bar / oracle discipline) while making plays, personnel, and events real.

**Concrete staging contract (proposed):**
1. **Drive oracle emits per drive** (existing drive model facts): `d_i = {side, start_clock, end_clock, TOP_i, plays_i (or off_plays_i), yards_i, pass_yards_i, rush_yards_i, result∈{TD,FG,MISS,PUNT,TO,TOoD,END_HALF,SAFETY,...}, points_i, opp_points_i, sacks_i, giveaways_i, start_fp, end_fp}` with `Σ TOP_i`, `Σ plays_i`, `Σ points_i` matching game totals.
2. **Play sampler realizes a feasible sequence** `π_i = (e_{i1}..e_{i,plays_i})` such that:
   - state feasibility: down/distance/field position/clock evolve legally play-to-play from drive start state to `end_fp/result` at `end_clock`;
   - conservation: `Σ yards(e)=yards_i` (and rush/pass/sack split as specified), `count=plays_i`, elapsed clock ≈ `TOP_i`, terminal event matches `result`;
   - attribution/events (packages, ballcarrier/target/tackler, gravity hooks per P-335) are emitted per play into the Phase 0 event log so folds remain the source of box/recap/advanced stats.
3. **Totals preserved by construction:** team/game aggregates are folds of emitted events but constrained to equal the drive oracle's drive aggregates (the oracle is authoritative until cutover). Discrepancy becomes a sampler-feasibility/quality metric, not a totals drift.

**Why this closes the possession gap (INFERRED):** possession count, drive timing envelope, and drive endpoints come from the oracle (already near bar), so you cannot lose 27% of drives to emergent clock blow-up. The play model's job becomes *micro-realization under a macro budget*, which is strictly easier to keep on-bar than unconstrained emergence.

**Relation to Phase 0 kernel (VERIFIED from code):** `legacyprovider.ts` already materializes `game_start/drive/drive_credit/player_line/game_end` and folds back to `GameResult`/`BoxScore`; events carry `t` (elapsed seconds) and drives carry timing. A staged-play Ledger can extend this by inserting play events *between/within* drive events (or nesting a per-drive play log referenced by drive events) while keeping `gameResultFold`/box folds consistent with oracle drive facts — i.e. strangler-compatible. **UNKNOWN:** exact schema extension (play event kinds/payloads, whether to keep drive as the scored aggregate event) — depends on Architect's Phase 1 schema choices.

## 3) A concrete feasibility check (runnable now on summary data) and what would prove it

**Budget sanity check (VERIFIED arithmetic from P-344):** NFL per team-drive mean budget ≈ 163.7s TOP and 7.345 plays → 22.29s/play including play+in-play clock effects aggregated. Offense runs ~5.63 off_plays/drive (rest are ST/special contexts inside team plays count as defined by P-344 "plays" = `play_type not null and posteam=team`). Any staged sampler must allocate ~7.3 plays into ~164s while reaching outcomes distributed like NFL (punt/TD/FG/TO/TOoD mix) — this is a tight but feasible constraint satisfaction problem.

**Falsifiable prediction / proof target (proposed):**
- **P2-A (feasibility):** Given nflverse-derived per-drive distributions (plays, TOP, yards, result) sampled to match league means/SDs in `league_means_sds.csv`, a constrained play-sequence sampler can realize ≥95% of sampled drives exactly on `(plays, result)` and within ±5% on `TOP` without illegal states. If <80%, unconstrained play grammars are too rigid and need a different state factorization.
- **P2-B (totals preservation):** When the sampler is driven by the legacy drive oracle's per-drive outputs on seeded games, folded team/game totals (points, drives, plays, yards, sacks, giveaways) match the oracle within floating/rounding tolerance (or exactly where integer) — i.e. **bar = 0% totals drift by construction** on oracle-fed games.
- **P2-C (shape):** Down-sequence and yards-to-go distributions of staged plays fall within an agreed tolerance of nflverse play-by-play marginals (data available per P-344 raw files on MUSE VM; summary-level proxy: plays/drive and off_plays/drive already matched at macro level). Failure localizes to situation model, not possession budget.

**What data/script is needed (actionable):** (1) export per-drive records from the legacy drive engine for N seeded games (result, plays, TOP, yards split, start/end fp/clock) — small JSONL; (2) a prototype `stage_drive(record, rng)` that emits a legal play list hitting the record; (3) measure feasibility and invariant violations. This can run without touching product/engine files (standalone prototype over exported records), consistent with "prototype that runs and prints a number".

## 4) Implications for the other prompt questions (brief, INFERRED)

- **Q8 (sharper Phase 1 gate):** add **possession-budget gates** alongside ~10% totals: `drives/team-game`, `plays/drive`, `TOP/drive` (and `TOP/play`) each within ~10% (or within 1 SD band logic agreed) on neutral matchups; and **oracle-fed staging drift = 0** for P2-B. A model can hit points/yards while missing drive count (PLAYLED-like) — current bar should explicitly catch that.
- **Q9 (folds as product surface):** drive-budgeted staging makes "game after play N" well-defined inside an authoritative macro timeline (drive boundaries/clock preserved), enabling replay/counterfactual branches at play granularity without breaking season-level totals.
- **Q3 (two-view design):** the exact/solver view is most valuable at the **drive/macro allocation** layer (optimizing or solving possession outcomes/value) while Monte Carlo/micro view realizes plays; forcing one bottom-up stochastic process to satisfy both macro budgets and micro realism is what produced the observed tension.

## Weakest point / limits
- **UNKNOWN:** actual PLAYLED per-drive TOP/clock trace (not shipped) — the clock-budget diagnosis is strongly suggested by aggregates but not directly measured from a per-drive log in this filing.
- **INFERRED:** mapping nflverse `plays`/`off_plays` definitions exactly onto the engine/PLAYLED play counters; small definitional mismatches could shift plays/drive targets but are unlikely to explain a 28% drive deficit.
- **Risk:** a conservation sampler can become a "just-so" script if it overfits drive endpoints without learning realistic play transition probabilities; P2-C (shape vs nflverse pbp) is required to keep it honest.
- **No product/engine changes proposed as patches here** (ideas-only filing per round). Prototype `stage_drive` not implemented in this session; specified tightly enough to implement and falsify quickly.

## Bottom line
Z.ai's measured PLAYLED gap reads as a **possession-budget/clock emergence failure** (7.49 plays/drive but 7.99 drives) rather than a simple per-down chain-length failure. Closing it cleanly on the Ledger path means **stage micro-plays inside macro drive budgets supplied by the authoritative drive engine**, preserving totals by construction and shifting the hard problem to feasible, nflverse-shaped within-drive realization — which is directly testable (P2-A/B/C) before any cutover.
