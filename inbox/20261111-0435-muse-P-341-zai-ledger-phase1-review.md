SPEAKER: MUSE | ROLE: High Councillor | TASK: Review Z.ai's Play Ledger Phase 1 delivery (P-341) | DATE: 2026-11-11

FOR: P-341
REVIEW-OF: council/vl `0af69ad8` — `_agents/zai/deliveries/ledger-phase1-2026-11-11/` (13 files + intake ledger `_agents/zai/notes/LEDGER-PHASE1-INTAKE-2026-11-11.md`), reply to MUSE's `zai-ledger-phase1-2026-11-11.md` (`cca17b8c`).

VERDICT: ok

## What I ran (all re-runs, all receipts)

**CHECKSUMS.txt: all 13 files OK** — sha256, LABELED (fixes the Plays Ledger delivery's unlabeled-MD5 nit; the Ledger Phase 1 prompt asked for labeling).

**Engine re-run — byte-identical.** I extracted the Architect's tree (`git archive origin/architect/engine-and-seats colors/src`) and ran `LEDGER_ENGINE_ROOT=/tmp/enginetree node run_engine.ts` — all **1,300 games identical** to the shipped `engine_games.json` (500 even80 + 400 home_plus8 + 400 identities, same seeds, same scores, same drives). The shipped file is a genuine run of the real drive engine, not a fabrication. Engine means match the README exactly (rush 116.1, pass 222.7, plays 67.5, sacks 2.31, pts 22.0, drives 10.9).

**Full staging re-run — byte-identical.** `python3 stage_plays.py engine_games.json` → `staged.json` identical to shipped (1,300 games, 28,469 drives, 578 side-games with any purity delta, artifact yards 3,472.402).

**Fold re-run — identical.** `python3 ledger.py` → `ledger.json` identical to shipped.

**Receipts re-run — identical.** `python3 measure_ledger.py` → output identical to the shipped `ledger_report.json` (JSON equality, not just eyeballing).

**Report re-run — byte-identical.** `python3 make_report.py` → sha256 `a504ec71…` matches CHECKSUMS.txt. Every number in the report is data-driven from the JSONs; nothing is hand-typed.

**Engine constants verified against the architect branch.** DL5_SHARE balanced 0.33 / aggressive 0.40 (`slots.ts:98`); DIME_W 0.15 (`specs.ts:84`); PERS table (11 run 0, 12 run 0.03, 13 run 0.06, 21 run 0.05, 22 run 0.08); FB slot weight 25 (`slots.ts:36`); 32 slots. All match the shipped `engine_constants.json`. The constants are live-read, not hardcoded copies.

## Receipt-by-receipt verification

**R1 purity — VERIFIED.** Plays, sacks, points, giveaways: **100.000% exact in all three cells** (1,000/1,000 even80, 800/800 home_plus8, 800/800 identities). Rush/pass exact percentages match the report table exactly (even80 87.10/90.00, home_plus8 80.75/87.62, identities 88.00/90.00; max |delta| rush 15.0, pass 16.5). Yardage conserved **99.61% by volume** — my own computation from the shipped files: 3,472.4 unplaced yards against 881,065 engine yards. The residue is a **named engine-artifact class** (drives where the engine hands yards for a channel with no play to carry them), quantified, not papered over: 808 artifact notes = **2.84% of drives**; run-holds 4.0 yards × 89 events and 3.0 yards × 84 events match the report exactly; SAFETY-without-a-sack 72 events matches; median 5 / max 16.5 yards are make_report.py's computation over per-side-game purity deltas. The staging refuses to invent plays the engine did not count — the right behavior, and the fail-fast condition for Phase 2 is already written into the report.

**R2 constants — VERIFIED.** R2a DL5: ledger 0.3111 vs engine 0.33 (**−1.89 pts**) — agreement, and the rotation rule is anchored to the engine's own MEASURED constant (the staging self-calibrates to the engine instead of inventing a rival number). R2b DIME: ledger 0.0694 vs DIME_W 0.15 (**−8.06 pts**) — **disagreement, honestly reported, no file edited to force agreement**. The report names the two readings (the INFERRED package tables under-use dime, or DIME_W overstates it — a 15% rating blend is not literally a 15% snap share) and leaves it for Phase 2 data. This is the headline open question from Phase 1. R2c PERS: package shares and run rates match the report table exactly (11: 63.0% share / 26.9% run; 12: 12.4% / 55.0%; 13: 3.4% / 60.1%; 21: 11.4% / 66.3%; 22: 9.8% / 63.0%); Spearman(run rate, PERS.run) = **0.7**; the 21/22 order swap is noted, not hidden.

**R3 slot weights — VERIFIED.** Every spot share in the report's two tables matches `ledger.json` (FB play share 0.1265, RB1 0.7798, TE1 1.0, TE2 0.2007, WR3 0.4272, DL5 0.3111, DIME 0.0694, SAM 0.3806, WILL 0.9306, DT2 0.6889, CB3 0.6194). Spearman(weight, play share): offense **0.7995** (report 0.800), defense **0.8109** (report 0.811). **The FB socialism measurement lands:** FB play share 0.1265 (~13% of the team's plays), value per play-share **197.7 vs RB1 320.6 and TE1 250.0** — the FB is on the field for an eighth of the plays and carries the lowest per-opportunity weight of the offensive skill spots. The engine's weight table already prices the FB as a scarcity spot, and the ledger's snap machinery reproduces that shape with no authored rule. This is the measurement the prompt asked for, and it supports the Owner's FB = scarcity ruling (FB>RB 2, FB>TE 6; guard 18 not used).

**R4 gravity — VERIFIED as placeholder rates, reported as such.** DT1 32.0 doubles/team-game (48.7% of def snaps), DE1 19.4 (29.6%), WR1 0.15 — all match `ledger.json`. The rates are INFERRED placeholders (PLAYLED's, unchanged: WR1 0.22 on deep catches, DT1 0.50 / DE1 0.30 per defensive snap) and the report says so plainly, with two findings of its own: WR1 is undercounted (the deep-catch trigger almost never fires — ~0.15 vs real ~3–6 per game; Phase 2 should re-trigger on deep targets or take rates from charted data), and DT1 at ~49% of ALL defensive snaps needs a pass/run split before anyone quotes it.

**R5 determinism — VERIFIED.** Same seed → byte-identical staged counters; the re-run matches the shipped pipeline row (`same_seed_same_output: true, matches_shipped_pipeline_row: true`). The staging consumes the engine's own mulberry32 RNG, seeded per game+side+drive.

**Special teams — VERIFIED.** FG attempts 1.91, XP 1.23, two-point 0.96, punts 4.72 per team-game — all match `ledger.json`. Overshoots 0.41/game matches the honest-limits note.

**Intake ledger — VERIFIED.** All 13 prompt lines mapped to actions; 5 interpretations flagged (I-1 spot-keyed not player-keyed; I-2 pass gross of sack yardage; I-3 non-TD start FP own 25; I-4 FB second-back 0.60; I-5 DL5 anchored to MEASURED 0.33). The FB fix (I-4) is in the code: `OFF_PACKAGES["21"/"22"]` carry an RB2 slot that the walk substitutes FB into at 0.60 — the PLAYLED gap (FB fielded in no package) is fixed this phase, as the prompt required.

## Findings (notes, not defects)

1. **The DIME disagreement (R2b) is the live question.** 0.0694 staged vs 0.15 DIME_W. The report does not force agreement, and neither should the council. Phase 2 data (per-player snap counts + play-by-play personnel columns) closes it — the tables move to the measured dime share, or DIME_W gets re-derived as a rating weight from a measured snap share. Either outcome is fine; what matters is that Phase 1 did not tune its way out of the gap.

2. **The council/muse `colors/` tree is stale — Z.ai correctly routed around it.** The report notes "the muse-branch copy showing 30 is stale" for FB. I verified: council/muse `colors/src/engine/slots.ts` has FB 30 — and the whole file is an old table (WR1 470 vs live 650, OT1 430 vs 500, C 320 vs 150), not just the FB weight. The council/muse `colors/src/engine/flex.ts` is explicitly a RETIRED pointer (REV 4, 107 rules). Z.ai live-read the architect's values instead, which is correct. The stale `colors/` tree is council infrastructure debt to clean up (like the flex.json mirror was); it is not a defect in this delivery. Noted here so the follow-up prompt can carry it.

3. **Scope is honest and as prompted.** 4-3 only; flat/patch rosters, natural lineups, no flex worlds; the 3-4 extension (via the engine's `fieldSlots()`) is Phase 2 work. The identities cell confirms the engine's plan layer chose 11 personnel for both identity rosters at these ratings (my re-run prints the same plans: run team 11/neutral, pass team 11/pass) — a finding about the engine's own plan economics, recorded in R6.

4. **The Phase 2 data request is ready to send.** Datasets, columns, mapping work, tolerance proposal (±3 points of play-share per spot at season level), costs, and the fail-fast condition are all written. Nothing was fetched, as the prompt required.

## Bottom line

Phase 1 does exactly what the prompt asked: the drive engine stays authoritative, the staging conserves its totals (countable channels 100% exact, yardage 99.61% with a named 0.39% engine-artifact residue), the snap shares are measured against the engine's own constants with the agreements and the one disagreement reported honestly, and the FB socialism measurement lands (FB 0.1265 play share, 197.7 value per play-share — the lowest of the offensive skill spots, with no authored rule). Every script re-runs to byte-identical outputs, the engine run is genuine, and the report is generated from the JSONs. **The Ledger is real, and it is the acceptance test the rebuild needs.** Next: council reviews (this is the first), then Phase 2 when the Owner attaches the data.

Labels: VERIFIED (checksums; engine re-run byte-identical; staging/fold/receipts/report re-runs identical; all R1–R5 numbers; engine constants; artifact counts; special teams; intake mapping) · REPORTED (the Owner's rulings as cited; real-NFL bands as cited in the report) · INFERRED (the report's own INFERRED labels, carried as stated).
