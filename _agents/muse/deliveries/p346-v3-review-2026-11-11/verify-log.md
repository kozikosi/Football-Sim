# P-346 v3 review — verification log (MUSE, 2026-11-11)

Delivery: `origin/council/or` `a9eda133`, `zai-phase2-v3-copy/` (79 files, 5.7 MB).
Raw data: local P-344 files, `~/workspace/nflverse-phase1/raw/` (30 files, venv pyarrow 26.0.1).
Method: extract via `git archive`, patch only the path constants in each script (RAW/OUT/STAGED/GAMES_CSV/SHIPPED), re-run, compare to shipped outputs. No script logic touched.

## Checksums (manual sha256sum on the shipped bytes)

- Top-level CHECKSUMS.txt: **69 OK / 3 MISMATCH** (72 entries) — NOT the claimed 72/72.
  - `C1-era-E-table/c1_per_team_e_input.csv`: listed `e82f0cca…`/67,903 vs shipped `aa13b604…`/67,582
  - `C3-gravity-fold/c3_gravity_fold_per_team_game.csv`: listed `98a46012…`/232,832 vs shipped `1b1b7c61…`/227,574
  - `C4-dime-reanchor/c4_dime_situation_table.csv`: listed `9c92a4b2…`/1,505 vs shipped `26afb5da…`/1,488
- corrections CHECKSUMS.txt: **28/28** (synthetic CSVs now list the correct LF hashes `bc59cc1c…`/3,071,585 and `94ca85d3…`/990,279; spot table 4,372 correct).
- phase2-real CHECKSUMS.txt: **14/14** (exists now).
- Folder files: C1 5/6, C2 4/4, C3 4/5, C4 4/5 (same three CSVs).
- Mechanism proven: CRLF-converting the shipped bytes reproduces all three listed hashes to the digit; the C3 re-run regenerates the fold CSV at 232,832 bytes (CRLF) = the listed size, while the shipped file is 227,574 (LF). Writers emit CRLF; shipping converts to LF; `make_checksums.py` itself is correct (binary read).

## Script re-runs (all five reproduce)

- `b1_fb_2020_diagnose.py`: A 0.0996, B 0.0737, C 0.0887. Per-team diffs + player rows exact. Independent C (11 × FB_off/tot_off per team, REG): **0.0887, 32 teams**.
- `c1_era_e_table.py`: `c1_era_e_table.json` **byte-identical**. Static E λ=0.4 exact 96, mae 1.311, zero tier changes; λ=0.2 exact 86, mae 1.076. Per-era zero changes. FB band inside all seasons. CSV content-identical after LF normalization (mine 67,903 / shipped 67,582).
- `c2_lab_and_validation.py`: `c2_results.json` **byte-identical**. R 1.979/1.890/1.649; D4 +0.232/+0.427/+0.751; B2 n=544, corr 0.056, cond SDs 9.86/9.30, bucket ns 117/136; TD-only 13.56 ± 8.49; 572 enumeration (REG 544, ALL 570, none 572). Persistence max err 0.67 pts (fit N=13 10.09 vs holdout 10.76).
- `c3_gravity_fold.py`: `c3_gravity_results.json` **byte-identical**. Gravity 10/10: 0.325/0.335/0.310/0.304/0.309/0.313/0.313/0.331/0.327/0.315. Fold CSV 5,257 rows, content-identical after LF normalization (mine 232,832 / shipped 227,574). HHI 0.1921–0.2042, WR2 0.204–0.222; staged vs real WR share 0.3287 vs ~0.21. staged.json hash `0f749ea5c278887a…` re-verified.
- `c4_dime_reanchor.py`: `c4_dime_tables.json` **byte-identical**. Pooled 0.1263; per-season = B1 table; 3rd+long 0.4531, behind>8 0.1782; staged 0.0695 (even80), 0.0697 (home_plus8, identities). CSV content-identical after LF normalization (mine 1,505 / shipped 1,488).

## Verdict

improved — substance fully verified; Fix 4 not fully landed (3 CSVs, bookkeeping only, content verified correct).
