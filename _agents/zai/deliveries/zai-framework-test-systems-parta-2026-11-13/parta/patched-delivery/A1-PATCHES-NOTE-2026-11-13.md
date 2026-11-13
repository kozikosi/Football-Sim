# A.1 PATCHES NOTE — 2026-11-13 (Z.ai)

**What was patched (in the shipped, patched copy of the v3 delivery):**

1. **The three CSV writers now emit LF:** `lineterminator="\n"` added at
   - `C1-era-E-table/c1_era_e_table.py` (the `c1_per_team_e_input.csv` writer),
   - `C3-gravity-fold/c3_gravity_fold.py` (`c3_gravity_fold_per_team_game.csv`),
   - `C4-dime-reanchor/c4_dime_reanchor.py` (`c4_dime_situation_table.csv`).
   Mechanism per the prompt: the writers' `\r\n` default + the shipping pipeline's `.gitattributes text=auto` conversion were what broke CHECKSUMS (69/72). With LF emitted at the source, `make_checksums.py` hashes the same bytes the fresh `git archive` extraction will read — the mismatch class is eliminated, not patched around (Inkling's option (a), preferred).
2. **All seven scripts de-sandboxed** (Glyph's B.4, now done): every `/home/z/...` absolute path is replaced by env-configurable relative defaults — `NFLVERSE_RAW` (raw parquet root), `OUT_DIR`, `STAGED_JSON`, `HARNESS_DIR`, `GAMES_CSV`; the two shipped inputs (`flex-99-live.json`, `b2_gravity_index.json`) are addressed delivery-relative via `__file__`. A grep for `/home/z` across the seven scripts now returns zero.
3. `py_compile` gate: all seven scripts compile after patching.

**The re-run and the 72/72 settle criterion are BLOCKED in this sandbox — the blocker, precisely:**

- The C-scripts read the **raw nflverse parquet files** (`play_by_play_*.parquet` etc. under `NFLVERSE_RAW`). Those ship NOWHERE in the repo — they are MUSE's local `nflverse-raw` workspace (the stack audit itself records the pipeline as run locally by MUSE, not in the repo). C2 additionally reads `staged.json` (Phase-1 output, also local).
- **Unblock procedure (for MUSE, ~15 minutes):** from the patched delivery folder — set `NFLVERSE_RAW` to the parquet root, `STAGED_JSON` to Phase-1's `staged.json`, then run the three C-scripts, then `python3 make_checksums.py` (last byte-changing step), then the fresh `git archive` extraction check. Expected: 72/72, 28/28, 14/14, C1 6/6, C2 4/4, C3 5/5, C4 5/5, because (a) the CSVs' CONTENT was already verified correct (content-identical after LF normalization — the prompt's own finding), and (b) the writers now emit the bytes the checksums will pin.
- The REV 3 note's quoted 72 and the "structurally impossible" claim still need their wording corrected in the README — flagged for the re-run commit so the correction lands with the verified numbers, not before them.

**What was completed instead of the blocked re-run (A.2):** the C2 D4 field fix — relabelled the drive-count-bucket diagnostic to its real name, added the true between-team quantity recomputed from the P-344 file (shipped in `C2-conditional-lambda/inputs/`), receipt at `C2-conditional-lambda/a2_between_team_receipt.json`: **between 11.9044 (SD 3.4503) · season ×1.1934 · game ×2.8988 (total-variance basis) · ×2.7057 (within-variance basis)** — matching DS's ANOVA to three decimals (same estimator, same file; that is the cross-check).
