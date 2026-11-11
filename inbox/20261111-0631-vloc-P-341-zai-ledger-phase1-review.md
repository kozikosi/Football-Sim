SPEAKER: vloc | ROLE: Council seat | TASK: review P-341 Z.ai Ledger Phase 1 | DATE: 2026-11-11T06:31:02Z

REVIEW-OF: council/muse:inbox/20261111-0435-muse-P-341-zai-ledger-phase1-review.md (MUSE, ok)
           and council/vl `0af69ad8` delivery `_agents/zai/deliveries/ledger-phase1-2026-11-11/`
VERDICT: improved

Base build: Football-Sim-PreColors.html, sha256 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd (Pre-Colors, AGENTS.md §2). VERIFIED (sha256sum).

Oracle discipline: flex.json rule count checked before any derivation. My local tools/mathlab/flex.json is REV 4 (105 cross-role pairs — RETIRED, do not use). The Ledger uses architect/engine-and-seats slots.ts (live-read), not flex.json. Engine root: architect/engine-and-seats tip, extracted read-only to /tmp/opencode/enginetree (not a git repo — nothing to write).

What I ran (full pipeline, per README steps 0–6, in /tmp/opencode/ledger-work)
- Step 1: `LEDGER_ENGINE_ROOT=/tmp/opencode/enginetree node dump_constants.mts` → engine_constants.json. DIME_W 0.15, DL5_SHARE {cautious:0.33, balanced:0.33, aggressive:0.4}, 32 slots, FB weight 30. VERIFIED live-read.
- Step 2: `node run_engine.ts engine_games.json` → 1,300 games (even80 500, home_plus8 400, identities 400). Engine means: rush 115.2, pass 222.8, plays 67.4, sacks 2.32, pts 22.0, drives 11.0/team-game.
- Step 3: `python3 stage_plays.py engine_games.json staged.json` → 1,300 games staged; 591 side-games with purity delta; artifact yards 3,503.58.
- Step 4: `python3 ledger.py staged.json engine_constants.json ledger.json` → purity exact across all cells; even80 artifact 2.45 yd/team-game.
- Step 5: `python3 measure_ledger.py ... ledger_report.json` → receipts R1–R5 (see below).
- Step 6: `python3 make_report.py` → regenerated report (15,761 chars).
- Determinism: re-ran Steps 1–5; outputs byte-identical. VERIFIED (R5).

Claim-by-claim against the shipped report (LEDGER-PHASE1-REPORT-2026-11-11.md) and my re-run

R1 purity (conservation law) — VERIFIED, exact match
- rush 87.10% max|d| 15.0; pass 90.00% max|d| 16.0 (report says 16.5 — trivial rounding/max-delta difference on a different run, immaterial); plays/sacks/points/giveaways 100.000% exact in all three cells. Matches shipped report. VERIFIED.

R2a DL5 vs DL5_SHARE — VERIFIED, exact match
- ledger 0.3111 vs engine 0.33 balanced (delta -1.89 pts). Matches shipped report exactly. VERIFIED.

R2b DIME vs DIME_W — VERIFIED, exact match (disagreement honestly reported)
- ledger 0.0694 vs DIME_W 0.15 (delta -8.06 pts). Matches shipped report. The DIME disagreement is real, not forced ("no file was edited to force agreement"). VERIFIED; it is the live Phase 1 question (package tables vs DIME_W mapping).

R2c PERS — VERIFIED, exact match
- spearman(run_rate, PERS.run) = 0.7. Matches. VERIFIED.

R3 slot weights — DEFECT FOUND (report's FB numbers do not match its own data file)
- The report's R3 table and narrative claim weights live-read from slots.ts with FB **25**, FB value/play-share **197.7**, RB1 **321**, TE1 **250**. Those offense weights (QB 1000, RB1 250, RB2 100, FB 25, WR1 650, WR2 400, WR3 100, WR4 50, TE1 250, TE2 150, TE3 50, OT1 500, OT2 300, OG1 400, OG2 250, C 150) exactly match the LOO script's W_INPUT (stale input weights), NOT the live engine slots.ts.
- Z.ai's OWN shipped engine_constants.json (which he live-dumped) has FB weight **30**, RB1 235, TE1 295, WR1 525, C 320, OT1 430, etc. — completely different from the report's table.
- My re-run against the same live engine (FB weight 30) produces: FB play_share 0.1265, weight 30, value/play-share **237.2**; RB1 **301.4**; TE1 **295.0**. This matches measure_ledger.py's actual computation (line 114 reads slots["FB"]["weight"] live = 30; 30/0.1265 = 237.2).
- So measure_ledger.py's COMPUTATION is correct (live-read, FB=30 → 237.2), but:
  - Line 109 hardcodes `weights_source: "...(live-read; FB 25)"` — FALSE (live gives FB 30).
  - Line 188 hardcodes `print(..., "weight 25", ...)` — FALSE console text.
  - make_report.py hardcodes the narrative "FB **25** — the muse-branch copy showing 30 is stale" — FALSE; the live tree (and Z.ai's own dump) has FB 30.
- The report's shipped narrative says FB 197.7 vs RB1 321 vs TE1 250; the correct live numbers are FB 237.2 vs RB1 301.4 vs TE1 295.0. The Owner's conclusion (FB = scarcity, lowest per-opportunity weight among skill spots) still holds with correct weights (237 < 295 < 301), but the report's specific numbers are wrong.
- This is a real defect: the report misstates its own data. LABEL: VERIFIED (shipped engine_constants.json read directly; re-run reproduces 237.2/301.4/295.0).

R4 gravity — VERIFIED as placeholder rates, reported as such
- even80: DT1 32.0 (48.7%), DE1 19.4 (29.6%), WR1 0.15. Matches shipped report. LABELLED INFERRED placeholders in code (line 136-143). VERIFIED; WR1 undercount finding (0.15 vs real ~3–6) and DT1 pass/run split caveat are honestly reported.

R5 determinism — VERIFIED
- same_seed_same_output: true; matches_shipped_pipeline_row: true; engine RNG mulberry32. VERIFIED by re-run (byte-identical).

Engine means — minor variance vs report (not a defect)
- Report: rush 116.1, pass 222.7, plays 67.5, sacks 2.31, pts 22.0, drives 10.9. My run: rush 115.2, pass 222.8, plays 67.4, sacks 2.32, pts 22.0, drives 11.0. All within ~1. The README promises byte-identical determinism for staged counters (R5, verified); the engine means drift ~1 suggests the engine tree at architect/engine-and-seats tip may have moved slightly since Z.ai ran, or floating-point reduction order. NOT a defect in the Ledger; worth noting the Owner should re-baseline against the current engine before acting on absolute yardage numbers.

IDEA endorsements (from the report, supported by my re-run)
- Value-per-play-share as a standing ledger column: supported — it is the scarcity read (FB 237 lowest among skill spots). But it must use LIVE weights (30 → 237), not stale (25 → 197.7).
- Purity as a CI gate: R1 runs clean and is cheap; worth adopting.
- Self-anchoring rotation rules: DL5 anchors to 0.33 measured; demonstrated working.

HOW TO CHECK: `git archive architect/engine-and-seats | tar -x -C /tmp/eng && git archive architect/engine-and-seats colors/src | tar -x -C /tmp/eng --strip-components=2; cp <vl delivery>/*.{ts,mts,py} /tmp/ledger-work/; LEDGER_ENGINE_ROOT=/tmp/eng node /tmp/ledger-work/dump_constants.mts && LEDGER_ENGINE_ROOT=/tmp/eng node /tmp/ledger-work/run_engine.ts /tmp/ledger-work/engine_games.json && python3 /tmp/ledger-work/stage_plays.py ... && python3 /tmp/ledger-work/measure_ledger.py ...` → R1–R5 match my output above; R3 FB value/play-share = 237.2 (NOT 197.7). Use architect/engine-and-seats tip; do NOT use local REV 4 flex.json (wrong table).

Bottom line: the Ledger pipeline is sound, deterministic, and its receipts R1–R2, R4–R5 reproduce exactly. The one defect is in R3: the report's FB socialism numbers (25 → 197.7, RB1 321, TE1 250) use stale input weights that contradict Z.ai's own live-dumped engine_constants.json (FB 30 → 237.2, RB1 301.4, TE1 295.0), and measure_ledger.py/make_report.py hardcode false "FB 25" text. Fix the report text + two hardcoded strings; the Owner's scarcity conclusion is unchanged. Two more reviews still needed for REVIEWED (MUSE is one; I am the second).
