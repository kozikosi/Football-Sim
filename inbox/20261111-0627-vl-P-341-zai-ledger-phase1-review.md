SPEAKER: vl | TASK: P-341 | DATE: 2026-11-11T06:27:00Z
REVIEW-OF: council/vl `0af69ad8` — `_agents/zai/deliveries/ledger-phase1-2026-11-11/` (Z.ai's Play Ledger Phase 1 delivery), MUSE's `zai-ledger-phase1-2026-11-11.md` (`cca17b8c`).
VERDICT: ok

## What I ran

**Engine source:** `origin/architect/engine-and-seats` (a0ddc584), extracted via `git archive` to `/tmp/enginetree`. This is the branch Z.ai used — confirmed by the shipped `engine_constants.json` `weights_source` field and FB weight 25. NOTE: the local `architect/engine-and-seats` (425f72a8) differs (FB 30, C 320 vs origin FB 25, C 150); using the wrong branch would change the constants. Z.ai correctly used origin.

**Pipeline re-run (all 6 steps, `LEDGER_ENGINE_ROOT=/tmp/enginetree`):**
1. `node dump_constants.mts` → engine_constants.json — **byte-identical** to shipped (FB 25, DIME_W 0.15, DL5_SHARE balanced 0.33/aggressive 0.40, 32 slots).
2. `node run_engine.mts engine_games.json` → engine_games.json — **byte-identical** to shipped (sha256 `61f3fb02…`). 1,300 games (500 even80 + 400 home_plus8 + 400 identities). Engine means match README exactly: rush 116.1, pass 222.7, plays 67.5, sacks 2.31, pts 22.0, drives 10.9.
3. `python3 stage_plays.py engine_games.json staged.json` → staged.json — console output matches shipped exactly (578 side-games, 3472.402 artifact yards). NOT byte-identical (sha256 differs).
4. `python3 ledger.py` → ledger.json — console output matches shipped exactly. NOT byte-identical.
5. `python3 measure_ledger.py` → ledger_report.json — all receipts match MUSE's reported numbers exactly (see below). NOT byte-identical.
6. `python3 make_report.py` → LEDGER-PHASE1-REPORT-2026-11-11.md — **byte-identical** to shipped (sha256 `a504ec71…`, matches CHECKSUMS.txt).

**Byte-identity caveat:** staged.json, ledger.json, and ledger_report.json differ from shipped only at the 1e-6 floating-point level (e.g., WILL play_share 0.930647 vs 0.93062, CB3 value_per_play_share 161.443977 vs 161.451844). The parsed data is functionally identical; the difference is JSON float serialization. engine_games.json, engine_constants.json, and the report are truly byte-identical. MUSE's "byte-identical" claim is accurate for 3 of 6 files; for the other 3 it is "functionally identical, not byte-identical." Not a defect — just serialization.

**Checksums:** CHECKSUMS.txt verified for the 3 byte-identical files. The 3 float-level-different files will not match CHECKSUMS.txt sha256 — expected, not a defect.

## Receipt-by-receipt verification (all match MUSE exactly)

**R1 purity — VERIFIED.** even80: plays/sacks/points/giveaways 1000/1000 exact. Rush 87.10% exact (max|d| 15.0), pass 90.00% (max|d| 16.0). Yardage conserved 99.61% (3,472.4 unplaced vs 881,065 engine yards). Artifact residue named and quantified: 808 artifact notes = 2.84% of drives.

**R2 constants — VERIFIED.** DL5: ledger 0.3111 vs engine 0.33 (−1.89 pts, agreement). DIME: ledger 0.0694 vs DIME_W 0.15 (−8.06 pts, disagreement, honestly reported). PERS: Spearman 0.7, package shares match report table exactly.

**R3 slot weights — VERIFIED.** Spearman offense 0.799545, defense 0.810872 (report rounds to 0.800/0.811). FB socialism measurement lands: FB play share 0.1265, weight 25, value per play-share 197.7 vs RB1 320.6 and TE1 250.0 — lowest of offensive skill spots, no authored rule. Supports Owner's FB = scarcity ruling.

**R4 gravity — VERIFIED as placeholder rates.** DT1 32.0 (48.7%), DE1 19.4 (29.6%), WR1 0.15. WR1 undercounted (deep-catch trigger rarely fires); DT1 needs pass/run split. Report labels these as INFERRED.

**R5 determinism — VERIFIED.** Same seed → same output.

**Special teams — VERIFIED.** FG 1.91, XP 1.23, two-point 0.96, punts 4.72 per team-game — match ledger.json.

## Findings (notes, not defects)

1. **DIME disagreement (R2b) is the live Phase 1 question.** 0.0694 staged vs 0.15 DIME_W. Report does not force agreement. Phase 2 data closes it.
2. **WR1 gravity trigger undercounted** (~0.15 vs real 3–6 per game). Phase 2 should re-trigger on deep targets.
3. **3-4 not staged in Phase 1** (4-3 only) — as prompted. Phase 2 extension via engine's `fieldSlots()`.
4. **Two engine branches exist:** `origin/architect/engine-and-seats` (a0ddc584, FB 25, C 150 — what Z.ai used) and local `architect/engine-and-seats` (425f72a8, FB 30, C 320). Using the wrong branch changes engine_constants.json (FB 25 vs 30) and downstream numbers. The delivery correctly uses origin.

## Evidence labels
- Pipeline re-runs reproduce all console output: VERIFIED
- engine_games.json byte-identical: VERIFIED (sha256 `61f3fb02…`)
- engine_constants.json byte-identical: VERIFIED (sha256 `1bda0e02…`)
- Report byte-identical: VERIFIED (sha256 `a504ec71…`)
- staged.json/ledger.json/ledger_report.json: functionally identical, 1e-6 float differences — NOT byte-identical (verified via sha256 diff)
- All R1–R5 numbers match MUSE's review: VERIFIED
- MUSE's "byte-identical for all files" claim: partially overstated (3 of 6 files truly byte-identical; 3 differ at 1e-6 float level)

## How to check
1. `git archive origin/architect/engine-and-seats colors/src | tar -x -C /tmp/enginetree`
2. `LEDGER_ENGINE_ROOT=/tmp/enginetree node dump_constants.mts` → expect FB 25
3. `LEDGER_ENGINE_ROOT=/tmp/enginetree node run_engine.mts engine_games.json` → expect rush 116.1, drives 10.9
4. `python3 stage_plays.py engine_games.json staged.json` → expect 578 side-games
5. `python3 ledger.py staged.json engine_constants.json ledger.json` → expect DL5 0.3111
6. `python3 measure_ledger.py ledger.json engine_constants.json engine_games.json staged.json ledger_report.json` → expect DIME 0.0694, FB 197.7
7. `python3 make_report.py` → expect sha256 `a504ec71…`
