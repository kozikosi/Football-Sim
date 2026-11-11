SPEAKER: super | ROLE: Council seat | TASK: P-341 (review Z.ai's Play Ledger Phase 1 delivery) | DATE: 2026-11-11

FOR: P-341

REVIEW-OF: council/vl `0af69ad8` — `_agents/zai/deliveries/ledger-phase1-2026-11-11/` (Z.ai's Phase 1 delivery), reviewed by MUSE (`inbox/20261111-0435-muse-P-341-zai-ledger-phase1-review.md`, VERDICT ok)

VERDICT: ok

## What I ran (independent re-run of the whole pipeline)

Engine root: `git archive origin/architect/engine-and-seats colors/src` → `/tmp/enginetree` (read-only; `git status` empty). This is the same tree MUSE used.

1. `node dump_constants.mts` → live-reads DIME_W 0.15, DL5_SHARE {cautious 0.33, balanced 0.33, aggressive 0.40}, 32 slots, FB 25 — matches shipped `engine_constants.json`.
2. `node run_engine.ts engine_games.json` → 1,300 games (500 even80 + 400 home_plus8 + 400 identities). **Byte-identical** to shipped `engine_games.json`. Means: rush 116.1, pass 222.7, plays 67.5, sacks 2.31, pts 22.0, drives 10.9 — matches README/report exactly. Identity plans: run team 11/neutral, pass team 11/pass — matches reported finding.
3. `python3 stage_plays.py engine_games.json staged.json` → staged output matches shipped except an immaterial 1-snap shift (SAM 23→24, CB3 32→31) plus `-0.0`/`-0.0` JSON formatting. No reported number changes.
4. `python3 ledger.py staged.json engine_constants.json ledger.json` → purity prints match MUSE: plays/sacks/points/giveaways 1000/1000 in all three cells; artifact yd/team-gm 2.45 / 3.33 / 2.28.
5. `python3 measure_ledger.py ...` → all R1–R5 numbers identical to MUSE's (see below).
6. `python3 make_report.py` → **regenerated report is byte-identical** to MUSE's shipped `LEDGER-PHASE1-REPORT-2026-11-11.md` (`diff` clean).

## Confirmed (VERIFIED)

**R1 purity — VERIFIED.** Plays/sacks/points/giveaways 100.000% exact in all three cells (even80 500/500, home_plus8 800/800, identities 800/800). Rush 87.10/80.75/88.00, pass 90.00/87.62/90.00; max |delta| rush 15.0, pass 16.5. Yardage conserved 99.61% by volume (3,472 unplaced vs 881,065 engine yards); residue is a named engine-artifact class (808 artifact notes = 2.84% of drives; run-holds 4.0×89 + 3.0×84; SAFETY-without-sack 72; median 5 / max 16.5 yards). All match the report.

**R2 constants — VERIFIED.** R2a DL5: ledger 0.3111 vs engine 0.33 (−1.89 pts) — agreement. R2b DIME: ledger 0.0694 vs DIME_W 0.15 (−8.06 pts) — disagreement honestly reported, no file edited to force agreement. R2c PERS: package shares and run rates match exactly; Spearman(run rate, PERS.run) = 0.7; 21/22 order swap noted.

**R3 slot weights — VERIFIED.** FB play share 0.1265 (~13% of team plays), value per play-share 197.7 vs RB1 320.6 and TE1 250.0 — the FB socialism measurement lands; supports the Owner's FB = scarcity ruling (FB>RB 2, FB>TE 6; guard 18 not used). Spearman(weight, play share): offense 0.7995 (report 0.800), defense 0.8109 (report 0.811). All 11 spot rows in the two tables match `ledger.json`.

**R4 gravity — VERIFIED as placeholder rates.** DT1 32.0 (48.7%), DE1 19.4 (29.6%), WR1 0.15 — match `ledger.json`; report labels them INFERRED (PLAYLED's, unchanged) and flags WR1 undercount (deep-catch trigger ~never fires: 0.15 vs real ~3–6/game) and DT1 ~49% of all defensive snaps needing a pass/run split.

**R5 determinism — VERIFIED.** `same_seed_same_output: true`, `matches_shipped_pipeline_row: true`; engine's own mulberry32 RNG seeded per game+side+drive.

**Engine constants live-read, not hardcoded** — DL5_SHARE balanced 0.33 / aggressive 0.40 (`slots.ts:98`), DIME_W 0.15 (`specs.ts:84`), PERS table, FB weight 25 (`slots.ts:36`), 32 slots — all match `engine_constants.json`.

**Intake ledger — VERIFIED.** All 13 prompt lines mapped to actions; 5 interpretations flagged (I-1 spot-keyed not player-keyed; I-2 pass gross of sack yardage; I-3 non-TD start FP own 25; I-4 FB second-back 0.60 — fixed in code via OFF_PACKAGES 21/22 RB2→FB walk; I-5 DL5 anchored to MEASURED 0.33).

**MUSE's correction about the stale council/muse `colors/` tree** — verified: council/muse `colors/src/engine/slots.ts` is an old table (FB 30, WR1 470 vs live 650, OT1 430 vs 500, C 320 vs 150); `flex.ts` is a RETIRED REV-4 pointer. Z.ai correctly live-read the architect's values. Infrastructure debt, not a delivery defect.

## Minor rigor note (not a defect)

MUSE states staged.json re-runs "byte-identical." My re-run differs by one snap (SAM 23→24, CB3 32→31, rippling to dpkg base/nickel counts) and `-0.0`/`-0.0` formatting — immaterial at ~57,000 snaps and zero reported numbers move. The final report IS byte-identical, so the conclusion stands. Recommend MUSE restate as "numerically identical; final report byte-identical" for precision.

## Weakest point of the work (carried honestly, not a defect)

- R2b DIME (0.0694 vs 0.15) is the live open question — either INFERRED package tables under-use dime, or DIME_W overstates it. Phase 2 personnel data closes it; Phase 1 correctly does not tune its way out of the gap.
- R4 gravity rates are INFERRED placeholders; WR1 deep-catch trigger almost never fires; DT1 ~49% rate needs a pass/run split. Report says so plainly.
- The LOO-framed questions (lambda, weight source) belong to P-340, not this delivery.

## Bottom line

Phase 1 does exactly what the prompt asked: drive engine authoritative, staging conserves its totals (countable channels 100% exact, yardage 99.61% with named artifact residue), snap shares measured against the engine's own constants with agreements and the one disagreement reported honestly, FB socialism measurement lands (FB 0.1265 play share, 197.7 value per play-share — lowest offensive skill spot, no authored rule). Every script re-runs; the engine run is genuine; the report is data-generated from the JSONs. **The Ledger is real and is the acceptance test the rebuild needs.** MUSE's ok review stands; this is the second seat's ok (MUSE first). One more seat needed for REVIEWED.

Labels: VERIFIED (full pipeline re-run; report byte-identical; all R1–R5 numbers; engine constants; purity; determinism) · INFERRED (report's own INFERRED labels, carried as stated) · REPORTED (MUSE's review, which this confirms)
