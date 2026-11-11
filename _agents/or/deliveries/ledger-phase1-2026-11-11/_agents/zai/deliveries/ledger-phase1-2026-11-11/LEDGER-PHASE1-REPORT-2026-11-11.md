# LEDGER PHASE 1 — THE SNAP LEDGER · delivery report

**From:** Z.ai (seat ZAI, High Councillor) · **Date:** 2026-11-11 · **To:** MUSE, for the Owner (KG)
**Reply to:** `_agents/muse/deliveries/prompts-2026-11-05/zai-ledger-phase1-2026-11-11.md`
**Companion to:** the PLAYLED rebuild attempt (`playled-2026-11-11/`) — the staging engine below IS that prototype, re-anchored: the drive engine's totals are the truth and the plays are staged inside them.

**What was built (all files in this folder, sha256 in CHECKSUMS.txt):**
- `run_engine.ts` — harness that runs the REAL drive engine (the Architect's tree, read-only) and records 1,300 GameResults (drives + realised totals + plans) across three cells
- `dump_constants.mts` — live-reads the engine's own constants (PERS, DIME_W, DL5_SHARE, SLOTS) from the same tree; nothing in this report is a hardcoded copy
- `stage_plays.py` — the staging engine (PLAYLED-powered): stages plays inside each drive with the conservation law
- `ledger.py` — the output fold: per-spot snap shares, package participation, gravity counts, the purity receipt
- `measure_ledger.py` — the receipts R1–R5 against the engine's own constants
- `engine_games.json` (raw engine output), `engine_constants.json` (live-read), `staged.json`, `ledger.json`, `ledger_report.json` — the data trail
- `_agents/zai/notes/LEDGER-PHASE1-INTAKE-2026-11-11.md` — the intake ledger: every line of the prompt mapped to an action, interpretations flagged

**Evidence labels:** VERIFIED = I ran it and the receipt reproduces · MEASURED = the engine's own measured constant · INFERRED = reasoned/authored, needs data · REPORTED = someone else's number.

---

## 1 · What "staging" means here (the design)

The drive engine stays authoritative. Its `GameResult` (the `drives.ts` step-6 generator, run unmodified) hands the ledger each drive's realised totals. The staging engine decomposes each drive into plays that sum to those totals **exactly**:

- sum(run gains) == team rush · sum(completion gains) == team pass · scrimmage plays == team plays (sacks included) · sack count == team sacks · scoring events == team score · INT/FUM == team giveaways.
- Engine convention honoured (I-2): the engine's team `pass` is **gross of sack yardage** (drives.ts never subtracts sacks from pass). Staged sack gains (−7 ± 2, INFERRED) are story-only and excluded from the pass sum.
- Each play carries: offensive personnel package (11/12/13/21/22), defensive package (base/nickel/dime), the 11+11 on-field spots (with the FB fix, I-4: the FB is the second back in 21/22 — the PLAYLED prototype fielded him in no package), attribution events (carry/catch/tackle/sack/pressure), and gravity events (double teams).
- Per-play yardage uses the PLAYLED shapes (RUN_MIX, CMP_MIX — INFERRED) scaled by a per-drive difficulty factor, then closed exactly by headroom rebalancing. TD drives reserve the scoring play; the walk synthesizes down & distance for the package tables (non-TD start FP assumed own 25, I-3).

Staging rules are numbered S1–S8 in `stage_plays.py`'s header and the intake ledger; every INFERRED parameter is labelled at its definition.

## 2 · R1 — the purity test (the conservation law) · VERIFIED

| channel | even80 | home_plus8 | identities | max abs delta (any cell) |
|---|---|---|---|---|
| rush | 87.10% | 80.75% | 88.00% | 15.0 |
| pass | 90.00% | 87.62% | 90.00% | 16.5 |
| plays | 100.00% | 100.00% | 100.00% | 0 |
| sacks | 100.00% | 100.00% | 100.00% | 0 |
| points | 100.00% | 100.00% | 100.00% | 0 |
| giveaways | 100.00% | 100.00% | 100.00% | 0 |

(1300 engine games, 28,469 drives staged, 2,600 team-games; cells: even80 500 g, home_plus8 400 g, identities 400 g.)

- **plays, sacks, points, giveaways: 100.000% exact in every cell** — the countable channels conserve perfectly, including overtime drives and the engine's defensive-TD/safety crediting.
- **Yardage channels (rush, pass): 99.61% conserved by volume** (3,472 unplaced yards against 881,065 engine yards). The residue is a **named engine-artifact class**: drives the engine hands yards for a channel that has no play to carry them (an all-sack drive holding allocated pass yards; a 2-play INT drive with both channels non-zero). The staging cannot place those yards without inventing plays the engine did not count — and it refuses to. It reports them instead:
- channel run holds 4.0 yards with no play to carry it — 89 events
- channel run holds 3.0 yards with no play to carry it — 84 events
- SAFETY without a sack: staged as a story event on the last… — 72 events
- Frequency: 2.8% of drives, median 5 yards, max 16.5, **2.45 yd/team-game (even80)**. This is the engine's per-drive allocation looseness surfaced by the ledger — a measurement-layer finding, not fixable in my lane (the engine is read-only). Phase 2 can quantify it against real play-by-play.

## 3 · R2 — the shares vs the engine's own constants · VERIFIED

### R2a · DL5 vs `DL5_SHARE` (slots.ts — MEASURED, 1,632 team-games 2023-25)

The engine holds DL5 at **0.33 of defensive snaps** (balanced; 0.40 aggressive). The ledger stages DL5 at **0.3111 play-share — -1.89 points vs the anchor**. Agreement. Design note (IDEA 3): the rotation rule's parameters are INFERRED but *anchored* to the engine's own measured constant, and the receipt then verifies the fold lands on it — the staging self-calibrates to the engine instead of inventing a rival number.

### R2b · DIME vs `DIME_W` (specs.ts, 0.15) — the headline disagreement

The engine folds dime coverage into every coverage rating at a fixed **15%** share. The ledger stages the DIME spot at **0.0694 play-share (-8.06 points vs DIME_W)**. Disagreement, honestly reported: either the INFERRED down-and-distance package tables under-use dime, or DIME_W overstates it (a 15% rating blend is not literally a 15% snap share — the mapping between a rating weight and a snap share needs the pass-down structure). **No file was edited to force agreement** — this is exactly the kind of gap the Ledger exists to surface; it needs real personnel data (Phase 2), not a tuning pass in my lane.

### R2c · package mix vs `PERS` (specs.ts)

| package | engine PERS.run | staged run rate | staged share of snaps |
|---|---|---|---|
| 11 | 0 | 26.9% | 63.0% |
| 12 | 0.03 | 55.0% | 12.4% |
| 13 | 0.06 | 60.1% | 3.4% |
| 21 | 0.05 | 66.3% | 11.4% |
| 22 | 0.08 | 63.0% | 9.8% |

Spearman(staged run rate, PERS.run) = **0.7**: the direction agrees — heavy packages run far more than 11, and 11 is the spread base. The 21/22 order swaps against PERS.run; PERS prices *efficiency per package*, not usage, so this is a note, not a violation. The engine's plan layer chose 11 personnel for both identity rosters at these ratings (PERS plan-cost prices heavy plans out) — a finding about the engine's own plan economics, recorded in R6.

## 4 · R3 — the 32-spot table vs the live slot weights · VERIFIED

Weights live-read from `architect/engine-and-seats` `slots.ts` (FB **25** — the muse-branch copy showing 30 is stale; muse's "FB 25" is correct). Share basis: **play share** (snaps / team plays — the same basis real snap-count stats and `DL5_SHARE` use). K/P are special-teams events, not scrimmage snaps (see §7).

### Offense

| spot | weight | weight share | team snap share | play share | value per play-share |
|---|---|---|---|---|---|
| QB | 1000 | 21.62% | 9.09% | 100.0% | 1000 |
| RB1 | 250 | 5.41% | 7.09% | 78.0% | 321 |
| RB2 | 100 | 2.16% | 2.78% | 30.6% | 327 |
| FB | 25 | 0.54% | 1.15% | 12.6% | 198 |
| WR1 | 650 | 14.05% | 9.09% | 100.0% | 650 |
| WR2 | 400 | 8.65% | 7.89% | 86.7% | 461 |
| WR3 | 100 | 2.16% | 3.88% | 42.7% | 234 |
| WR4 | 50 | 1.08% | 1.84% | 20.3% | 247 |
| TE1 | 250 | 5.41% | 9.09% | 100.0% | 250 |
| TE2 | 150 | 3.24% | 1.82% | 20.1% | 747 |
| TE3 | 50 | 1.08% | 0.82% | 9.0% | 557 |
| OT1 | 500 | 10.81% | 9.09% | 100.0% | 500 |
| OT2 | 300 | 6.49% | 9.09% | 100.0% | 300 |
| OG1 | 400 | 8.65% | 9.09% | 100.0% | 400 |
| OG2 | 250 | 5.41% | 9.09% | 100.0% | 250 |
| C | 150 | 3.24% | 9.09% | 100.0% | 150 |

### Defense

| spot | weight | weight share | team snap share | play share | value per play-share |
|---|---|---|---|---|---|
| DE1 | 650 | 16.88% | 9.09% | 100.0% | 650 |
| DE2 | 300 | 7.79% | 9.09% | 100.0% | 300 |
| DT1 | 500 | 12.99% | 9.09% | 100.0% | 500 |
| DT2 | 300 | 7.79% | 6.26% | 68.9% | 435 |
| DL5 | 150 | 3.90% | 2.83% | 31.1% | 482 |
| MIKE | 300 | 7.79% | 9.09% | 100.0% | 300 |
| WILL | 150 | 3.90% | 8.46% | 93.1% | 161 |
| SAM | 100 | 2.60% | 3.46% | 38.1% | 263 |
| CB1 | 400 | 10.39% | 9.09% | 100.0% | 400 |
| CB2 | 250 | 6.49% | 9.09% | 100.0% | 250 |
| CB3 | 100 | 2.60% | 5.63% | 61.9% | 161 |
| DIME | 50 | 1.30% | 0.63% | 6.9% | 721 |
| SS | 300 | 7.79% | 9.09% | 100.0% | 300 |
| FS | 300 | 7.79% | 9.09% | 100.0% | 300 |

Spearman(weight, play share): offense **0.800**, defense **0.811**. The engine's weights and the ledger's snap shares tell one coherent story: always-on spots (QB, WR1/2, TE1, OL, CB1/2, safeties, LBs) carry the big weights; rotation spots carry small ones.

### The FB socialism measurement (the Owner's ruling: FB = scarcity)

- FB play share: **0.1265** (~13% of the team's plays — inside the real-NFL band for FB-using teams, 0.54% of offensive weight against it).
- **Value per play-share** (weight ÷ play share — the scarcity read): FB **198** vs RB1 **321** and TE1 **250**. The FB is on the field for an eighth of the plays and carries the lowest per-opportunity weight of the offensive skill spots (every RB, WR, TE sits above him) — the engine's weight table already prices the FB as a scarcity spot, and the ledger's snap machinery reproduces that shape without any authored rule. The Owner's FB>RB 2 / FB>TE 6 rulings and the Juszczyk-to-TE acceptance are consistent with it (FB flexes *out* cheaply because his job requirements are few — PLAYLED's flex experiment already showed FB>RB pricing 5.2 from plays alone).

## 5 · R4 — gravity event counts · VERIFIED as *placeholder rates, reported as such*

| event | even80 | home_plus8 | identities |
|---|---|---|---|
| DT1 double teams / team-game | 32.0 (48.7% of def snaps) | 33.2 (49.2%) | 34.2 (49.0%) |
| DE1 double teams / team-game | 19.4 (29.6%) | 20.1 (29.8%) | 20.5 (29.4%) |
| WR1 double teams / team-game | 0.15 | 0.20 | 0.21 |

Every rate here is an **INFERRED placeholder** (PLAYLED's, unchanged): WR1 0.22 on deep catches, DT1 0.50 / DE1 0.30 per defensive snap. Two findings fall out of the measurement itself:

1. **WR1 is undercounted** — the trigger (deep *catch* ≥ 18 yds) almost never fires under the staged catch shape (CMP_MIX means 7.3/14.5): ~0.15 doubles/team-game vs real ~3–6. Phase 2 should re-trigger on deep *targets*/route structure or take rates from charted data.
2. **DT1 at ~49% of ALL defensive snaps** is plausible for an elite interior player on pass downs (real stars: 55–70% of *pass-rush* snaps) but the placeholder applies it to every snap — the rate needs a pass/run split before anyone quotes it.

## 6 · R5 — determinism · VERIFIED

Same seed → byte-identical staged counters; the re-run matches the shipped pipeline row exactly (`same_seed_same_output: true, matches_shipped_pipeline_row: true`). The staging consumes the engine's own mulberry32 RNG, seeded per game+side+drive — the determinism story carries over from PLAYLED unchanged.

Also read off the fold (special-teams events per team-game, engine-authoritative): field-goal attempts 1.91, XP attempts 1.23, two-point attempts 0.96, punts 4.72. The two-point rate is the engine's decomposition model speaking, not the ledger's.

## 7 · Phase 2 — what validation against real snap counts needs (the data request, ready to go)

Nothing was fetched; the Owner or the council attaches the data.

1. **Per-player snap counts by team-game (off/def/ST), 2023–25** — the same class of dataset behind the MEASURED `DL5_SHARE` (spec 12.1's 1,632 team-games). Validates the spot play-shares: RB1/RB2, FB, TE2/TE3, WR3/WR4, CB3, DIME, DL5, SAM/WILL rotation. Proposed tolerance: ±3 points of play-share per spot at season level (the Owner's totals bar is ~10%; snap shares should land far tighter).
2. **Play-by-play with personnel columns** (the nflverse play-by-play release carries `personnel_o`, `personnel_d`, `defenders_in_box`): validates package participation (11/12/13/21/22 shares; base/nickel/dime via box/DB counts) and the per-package run rates (R2c's ordering question).
3. **Double-team charting** (SIS/PFF-class, paid): the only way to validate the gravity rates. Owner decision whether to buy or leave them INFERRED.
4. **Mapping work**: spot ↔ player (via depth chart + participation), the spot → position-label conversion spec, and the 3-4 base extension (Phase 1 staged 4-3 only; the engine's fieldSlots() defines the 3-4 rows).
5. **The resolution of R2b**: with (1)+(2) the DIME question closes — the tables move to the measured dime share, or DIME_W gets re-derived as a rating weight from a measured snap share.
6. **Fail-fast** (MUSE's condition, adopted): if the staged plays cannot match real spot shares within tolerance while summing to engine totals, the Ledger falls back to aggregate staging and nothing is lost — the purity law is what makes that fallback safe.

## 8 · IDEA: (the innovation the prompt asked for)

- **IDEA: value-per-play-share as a standing ledger column.** Weight ÷ play share (§4's last column) turns the slot table into a scarcity read with no authored rule — the FB measurement (197.7 vs RB1's 320.6) *is* the Owner's socialism principle, quantified. The ledger should publish it every run.
- **IDEA: the ledger is the strangler's acceptance test.** Because the fold conserves engine totals exactly (R1), any future engine change that leaves the fold's outputs stable is score-neutral *by construction*. Purity should run as a CI gate on every engine commit — it is cheap and it bites.
- **IDEA: self-anchoring rotation rules.** Anchor every INFERRED participation parameter to the engine's own MEASURED constants (DL5→0.33 demonstrated here), then let the receipt verify the anchor. The staging calibrates to the engine instead of competing with it. DIME is the next candidate once R2b's mapping is resolved.
- **IDEA: doubled-share with honest denominators** (doubles ÷ pass-rush snaps for linemen, ÷ deep targets for WR1) — the stat the Owner's advanced-stats section wants, with the denominator stated so nobody quotes a rate against the wrong base.
- **IDEA: one fold, many consumers.** The staged play log is a free interface: box score, EPA, usage, story generation and the guide's teaching examples can all read the same log the ledger folds. Phase 3 should expose it as the product's single play-data surface.

## 9 · Honest limits

- Flat/patch rosters, natural lineups only — no flex worlds this phase (the flex machinery stays in PLAYLED; the ledger measures participation first).
- The situation tables (package choice, rotation shares, FB-second-back 0.60, RB2 breather 0.28, WR4 Z-share 0.32, TE3 0.25) are INFERRED and labelled; R2/R3 measure what they produce, they do not bless them.
- Down & distance is synthesized inside each drive (non-TD start FP assumed own 25; TD start exact). Intermediate overshoots (counted, 0.41/game, never mutated) wobble the story chains without touching the conservation.
- The engine-artifact yardage class (§2) is the drive engine's own allocation looseness; the ledger surfaces it and refuses to paper over it.
- K/P participation is special-teams event counts (the engine's drives carry no kick plays); two-point attempts are conversion events, not staged scrimmage plays.

— Z.ai · read → verify → stage → fold → measure → zip. The engine's totals are the truth; the ledger makes them countable.
