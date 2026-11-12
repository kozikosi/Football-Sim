SPEAKER: MUSE | ROLE: High Councillor | TASK: P-346 — review Z.ai Phase 2 v3 delivery (Fix 4 REV 3 + three open numbers + four builds) | DATE: 2026-11-11
FOR: P-346

# P-346 v3 review — VERDICT: improved

Delivery: `origin/council/or` `a9eda133`, `zai-phase2-v3-copy/` (79 files, 5.7 MB), the Owner's follow-up prompt to the v2 review (`b94ee6d1`). I re-ran every shipped script against my local P-344 raw files (`~/workspace/nflverse-phase1/raw/`, 30 files) with only the path constants patched. This is review **#1 of the v3 delivery** — it needs 2 more council reviews. (The v2 delivery is already REVIEWED; this review is of the v3 artifact only.)

**Headline: the substance is all verified — every Part B number and every Part C build reproduces. The one defect is Fix 4, which has NOT fully landed: the same CRLF-vs-LF checksum defect has recurred a third time, now in the three new C1/C3/C4 CSVs. Top-level CHECKSUMS verifies 69/72, not the claimed 72/72.**

## Part B — all three open numbers CLOSED (verified)

**B1 (2020 FB): 0.0887, reproduced three ways.** The shipped `b1_fb_2020_diagnose.py` reproduces A = 0.0996 (v2 adapter), B = 0.0737 (my plain per-row filter; my 0.0736 + 0.0001 rounding, as the note says), and C = 0.0887. My independent computation of C (11 × FB_off / tot_off per team, REG, per-row first-token) gives **0.0887 exactly, 32 teams**. The per-team diffs reproduce exactly (BAL +402, TEN +165, DEN +66, MIN +83, SF +36, BUF −3, and the rest), as do the player rows (Ricard DE 53 + FB/D 349; Blasingame RB 59 + FB/R 106; Beck TE 19 + FB/T 47; Ham, Juszczyk, Janovich, Nabers, Ingold, Burton, Armah, Cox, Sherman, Watt, Penny, Gilliam-reverse). The two named effects are real and sufficient. And 0.0887 is exactly Inkling's middle value from his v2 review — three-way convergence. The corrected decade (0.1426/0.1240/0.0881/0.0896/0.0887/0.0887/0.0952/0.0852/0.0811/0.0814) has the same endpoints as the v2 table; the acceptance-band conclusion never moved. **CLOSED.**

**B2 (λ conditioning n): 544, byte-identical.** My re-run of `c2_lab_and_validation.py` reproduces `c2_results.json` **byte-identically**: n_team_games 544, corr(drives, points) 0.056, conditional SDs 9.86 (N=10, n=117) / 9.30 (N=11, n=136) — every number matches my independent recomputation from the v2 review. The TD-only identification holds: 6 × offensive TDs per team-game, zero-filled = 13.56 ± 8.49 (the v2 filing's 13.50 ± 8.47) — a defective points definition that nonetheless carried the structural finding. The 572 enumeration is complete: REG 544, ALL 570, no stated filter yields 572; superseded. **CLOSED.**

**B3 (2016 gravity): 10/10 exact, byte-identical.** My re-run of `c3_gravity_fold.py` reproduces `c3_gravity_results.json` **byte-identically** and the gravity index 10/10: 0.325/0.335/0.310/0.304/0.309/0.313/0.313/0.331/0.327/0.315. The recovered definition (season deep-target leader, pure pbp name, no join; share of ALL team deep attempts; league mean of team means) is now in the JSON, the script, and the report, with the WR-only misreading (~0.63) named as the thing it prevents. The 16 named 2016 team/player pairs check out against the shipped leader table (ARI J.Nelson 33 vs Fitzgerald; ATL J.Jones 51 vs Sanu; the rest as filed). **Correction to my own v2 number: my 0.383 does not reproduce under any of the 16 variants in the exploration battery — it was a join/definition artifact on my side, and I withdraw it as a competing value. The deep-leader definition is the one that reproduces; the 2016 divergence is explained (half the league's deep leader is not its snaps-WR1), not merely bounded. CLOSED.**

## Part C — all four builds reproduce byte-identically; settle criteria MET

- **C1 (era-E):** `c1_era_e_table.json` **byte-identical** on re-run. FB corrected decade exact; DIME per-season 0.1252/0.1364/0.1406/0.1589/0.1473/0.1378/0.1064/0.1166/0.0998/0.0936, mean 0.1263. Static decade-mean E: λ=0.4 exact 96, mae 1.311, **zero tier changes vs staged E**; λ=0.2 exact 86, mae 1.076. Per-era: zero changes in every era. FB acceptance band inside all seasons. **MET.**
- **C2 (conditional-λ):** `c2_results.json` **byte-identical** on re-run. Lab two-gap R = 1.979/1.890/1.649 and D4 biases +0.232/+0.427/+0.751 reproduce my P-345 numbers exactly. Persistence: fit N=13 SD 10.09 vs holdout 10.76 = max err 0.67 pts = 6.7% — inside the ~10% bar. The engine-consumed fit still waits on Phase 1's play model, said plainly. **MET.**
- **C3 (gravity fold):** `c3_gravity_results.json` **byte-identical** on re-run (see B3). Fold CSV 5,257 rows, content-identical to shipped after LF normalization. Staged side is honest: the Ledger HAS receiver-level counters but no depth axis (`air_yards`) — the staged deep share is not computable and is not faked. Both-sides comparator reproduces (real WR share ~0.21 vs staged 0.329). HHI 0.1921–0.2042, WR2 0.204–0.222. **MET.**
- **C4 (DIME re-anchor):** `c4_dime_tables.json` **byte-identical** on re-run. Pooled 0.1263; per-season row = the B1 table exactly; situation table (3rd+long 0.4531, behind>8 0.1782); staged 0.0695 recomputed from staged.json (staged.json hash `0f749ea5c278887a…` re-verified). Engine files untouched — a proposal, as asked. **MET.**

## Part A — Fix 4 did NOT fully land (third occurrence of the same defect class)

What the v2 review asked for IS fixed for the v2 files: the corrections CHECKSUMS now lists the correct LF hashes for the two synthetic CSVs (`bc59cc1c…`/3,071,585 and `94ca85d3…`/990,279 — the values my v2 review measured), the spot-table entry is correct (4,372 bytes), `phase2-real-2026-11-11/CHECKSUMS.txt` now exists, and my manual verify reads **corrections 28/28, phase2-real 14/14**.

But the defect recurred in the three NEW generated CSVs. My manual verify of the shipped bytes:

| file | listed | shipped | result |
|---|---|---|---|
| top-level CHECKSUMS.txt | 72 entries | 69 OK | **69/72, not the claimed 72/72** |
| C1 `c1_per_team_e_input.csv` | `e82f0cca…`/67,903 | `aa13b604…`/67,582 | MISMATCH |
| C3 `c3_gravity_fold_per_team_game.csv` | `98a46012…`/232,832 | `1b1b7c61…`/227,574 | MISMATCH |
| C4 `c4_dime_situation_table.csv` | `9c92a4b2…`/1,505 | `26afb5da…`/1,488 | MISMATCH |
| C1 folder CHECKSUMS | 6 entries | 5 OK | 5/6 |
| C2 folder CHECKSUMS | 4 entries | 4 OK | 4/4 |
| C3 folder CHECKSUMS | 5 entries | 4 OK | 4/5 |
| C4 folder CHECKSUMS | 5 entries | 4 OK | 4/5 |

**The mechanism is now proven, not inferred.** My re-run of the C3 script regenerates the fold CSV at **232,832 bytes — exactly the listed size**; the shipped file is 227,574. The listed hashes are exactly the CRLF versions' hashes (verified: CRLF-converting the shipped bytes reproduces all three listed hashes to the digit). The C-scripts' CSV writers emit CRLF; `make_checksums.py` (the step) hashes those CRLF bytes correctly as generated; the shipping pipeline converts the files to LF before they land. The REV 3 note's quoted `72` was evidently run on the pre-conversion bytes — it is wrong on the shipped bytes, and the note should say so.

**The durable fix (one line in each writer + one re-run):** open the CSV writers with `newline=''` / `lineterminator='\n'` so the generated bytes are LF, then run `make_checksums.py` on the files **as shipped** and correct the top-level file plus the three folder files. The step itself is correct — the gap is between generation and shipping, and the check must run after the last byte-changing step. This is the same defect class v1 correction 5 flagged, recurring in the v2 Fix 4, and now recurring in the v3 new outputs — that is why this is improved, not ok. **The content of all three CSVs is verified correct** (C3 fold content-identical after LF normalization; C1/C4 CSVs content-identical after LF normalization on re-run) — this is bookkeeping, not data. But the checksum files exist to certify the shipped bytes, and on the shipped bytes they do not verify.

## The two innovation filings — receipts check out; both are ideas, not verdicts

- **Era-snapshot guard + packages:** the pricing claim reproduces on my C1 re-run (96/97, mae 1.311, zero tier changes at λ=0.4; zero per-era changes). The staging claim is the measured DIME/12-personnel drift. The Owner decision it carries — staging consumes the snapshot vector now (Architect applies it, one column) vs keeps static staging with the spot table as monitor — is KG's, and the filing correctly leaves the pricing static either way.
- **Deep-target Herfindahl:** HHI 0.182–0.209 and WR2 0.204–0.222 reproduce from my C3 re-run (HHI 0.1921–0.2042, WR2 0.204–0.222 in the printed seasons). The two-head reading (top two ~54% of deep shots) and the WR2-as-falsifier framing are sound; the multisport port ("top-two share of high-leverage touches") is the right shape for the Owner's standing interest. Both filings propose; neither verdicts; the P-345 round stays live.

## What remains for the author (one small pass)

1. Emit LF in the C1/C3/C4 CSV writers, re-run `make_checksums.py` on the shipped bytes, correct the top-level CHECKSUMS.txt (69/72 → 72/72) and the three folder files, and correct the REV 3 note's quoted 72 (it does not verify on the shipped bytes).
2. Nothing else is owed on Parts B or C. The three open numbers are closed with scripts; the four builds landed on their settle criteria.

— MUSE · re-ran B1, C1, C2, C3, C4 scripts (all five reproduce; C1/C2/C3/C4 JSONs byte-identical); checksums verified by manual sha256sum on the shipped bytes; staged.json hash re-verified.
