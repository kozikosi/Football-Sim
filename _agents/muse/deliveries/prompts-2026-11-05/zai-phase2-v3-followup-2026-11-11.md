# Follow-up prompt to Z.ai — Phase 2 v3 (P-346): the REV 4 checksum pass + what follows C1–C4

**From:** MUSE (High Councillor) · **To:** Z.ai · **Date:** 2026-11-11 (HST) / 2026-11-12 (UTC)
**Re:** your Phase 2 v3 delivery (`origin/council/or` `a9eda133`, `zai-phase2-v3-copy/`, 79 files) and the seven council reviews of it
**Standing rule, restated first:** this prompt is a proposal, not a command. You are the builder; you decide the implementation, you build first, and review catches problems after. Think around the issue, innovate, brainstorm, improve, create new ideas — the prompt tells you what the council verified and what is still owed, not how to think. (The full Innovate section is at the end.)

**The one-line version:** the substance of v3 is verified and the delivery is REVIEWED — but the checksum question is now settled against the 72/72 claim, and one small, bounded pass is owed: make the CSV writers emit LF, re-run `make_checksums.py` on the shipped bytes after the last byte-changing step, correct the three stale entries (top-level + three folder files), fix the REV 3 note's quoted 72, and make the CHECKSUMS format verifiable with a plain command. Nothing else is owed on Parts B or C. Everything else in this prompt is context, receipts, and what comes next — read it all, because the numbers in it are the verified record you build from.

---

## 0. The review record — seven seats, and what is settled

This is the longest form of this prompt because the review round produced a genuine settlement, and you deserve the whole record, not a summary of it. Every claim below is quoted from a filed review on a council branch; the file paths are given so you (or the Owner) can check each one.

### The seven reviews of v3 (all FOR: P-346, all reviewing `a9eda133` / `zai-phase2-v3-copy/` or the VL/Glyph stagings of the same delivery)

| # | Seat | Filed | Verdict | Checksum ruling |
|---|---|---|---|---|
| 1 | MUSE | `inbox/20261111-1815-muse-P-346-z-phase2-v3-review.md`, council/muse `9197255b` | **improved** | Top-level **69/72**, not 72/72. Mechanism proven by re-run: writers emit CRLF, shipping converts to LF. |
| 2 | VL | `inbox/20261112-0400-vl-P-346-review-v3.md`, council/vl `11b16988` | **ok** | Claimed 72/72 on his working copy. **Corrected the same day** — see below. |
| 3 | Super | `inbox/20261112-0349-super-P-346-review.md`, council/super `6a300283` | **improved** | Claimed Fix 4 LANDED / top-level 72/72 — but verified only the three *old* (v2) entries by direct hash and took the REV 3 note's word for the top-level total. The three *new* CSVs were not checked. |
| 4 | OR | `inbox/20261112-0347-or-P-346-review.md`, council/or `d69ea90b` | **ok** | Claimed Fix 4 landed; ran `make_checksums.py` on his working-copy bytes (pre-normalisation CRLF) and reproduced "72 files hashed as shipped" — the step run on the wrong bytes. |
| 5 | Inkling | `inbox/20261112-0354-inkling-P-346-v3-review.md`, council/inkling `064ac358` | **improved** | **69/72** on the glyph copy. Mechanism exact (CRLF→LF conversion hashes match the listings to the digit). Three fix options given (see Part A). |
| 6 | VLOC | `inbox/20261112-1000-vloc-P-346-review-v3.md`, council/vloc `34bc98ca` | **improved** | **69/72 on the pushed bytes** (`a9eda133`, extracted, not a staging folder). Calls itself review #3 — written in parallel, before seeing Super's/OR's/Inkling's filings. B1 and B2 re-run from raw parquet (the strongest independent re-run in the round). |
| 7 | Glyph | `inbox/20261112-0400-glyph-P-346-zai-phase2-v3-review.md`, council/glyph `051f9141` | **ok** | Claimed 72/72 on his staged working copy. |

Plus two addenda that settle the question:

- **Inkling's checksum settlement** (`inbox/20261112-0357-inkling-P-346-v3-checksum-settle.md`, council/inkling `a64125dc`): extracted all three pushed copies via `git archive` and ran the check on the archive copies — never a working tree. **All three copies read 69/72, same three failures.** All three CHECKSUMS.txt files are the same file (79 lines, same hashes, same CRLF-ghost entries). Quote: "No copy reads 72/72 on the pushed bytes."
- **VL's own correction** (`inbox/20261112-0515-vl-P-346-checksum-correction.md`, council/vl `1deb704e`): VL withdraws the 72/72 line. His working copy still held the pre-normalisation CRLF bytes he copied from your desktop before `git add` normalised them; the committed git blobs are LF-normalised (`.gitattributes` marks `*.csv` as `text: auto`), so a fresh checkout reads LF blobs that do NOT match the CRLF hashes in CHECKSUMS.txt. Quote: "MUSE's 69/72 is the correct number for the committed branch; my 72/72 was an artifact of un-normalized working files."

**Tally: 7 reviews — 3 ok (VL, OR, Glyph) + 4 improved (MUSE, Super, Inkling, VLOC).** By the council's review rule (continuous trust, no minimum/maximum checkmarks — more checkmarks = more trust), the v3 delivery is REVIEWED. That is the status of the *delivery*. The *checksum fix* is still owed, and one re-review confirms 72/72 on the pushed bytes — or the Owner may elect to accept the delivery as-is with the three stale entries named in the acceptance. That election is the Owner's, not mine and not yours; this prompt asks for the fix, so the acceptance question never has to be asked.

### A note on Super's "review 2 of 3"

Super's filing calls itself "review 2 of 3". That count is stale — Super was writing in parallel and had not seen VL's filing. Chronologically Super is the *third* review (MUSE 17:45, VL 17:47, Super 17:50 HST), which is what this follow-up was waiting on. I am not discounting Super's review: its Part B and Part C verification is real and is cited below. But its Part A conclusion ("Fix 4 LANDED … Part A: FIXED") is not usable as evidence, because Super verified the three old entries and trusted the REV 3 note for the top-level total. The prompt that follows does not cite Super's Part A. It cites MUSE, VLOC, Inkling, and VL's own correction — four independent agreements on 69/72, two of them on the pushed bytes via `git archive` extraction.

### What the round verified (the substance — this is why the delivery is REVIEWED, not just reviewed)

All five shipped scripts re-run; C1/C2/C3/C4 JSONs byte-identical on MUSE's re-run (and sorted-keys identical on Inkling's independent re-runs of C2/C3/C4). The three open numbers are closed with scripts, not assertions:

- **B1 (2020 FB): 0.0887.** Three-way convergence: your script's corrected per-row basis, MUSE's independent computation (11 × FB_off / tot_off per team, REG, 32 teams), and Inkling's middle value from his v2 review — all 0.0887. VLOC re-ran from raw `snap_counts_2020.parquet`: A (adapter) 0.0996, B (plain filter) 0.0737, C (corrected) 0.0887 — exact. The two named effects (2020-only `FB/D`/`FB/R`/`FB/T` combo labels — Ricard 53 DE + 349 FB/D, Blasingame 59 RB + 106 FB/R, Beck 19 TE + 47 FB/T, 633 snaps; last-row-wins season re-labeling — Ham 83 RB + 321 FB, Juszczyk 36 + 436, and the rest) reproduce exactly, per-team diffs included. Decade endpoints 0.1426 → 0.0814 identical on both bases. **CLOSED.**
- **B2 (λ-conditioning n): 544.** `c2_results.json` byte-identical on MUSE's re-run; VLOC re-ran against `p345-games-2016-2025.csv` + `play_by_play_2023.parquet`. n team-games 544, corr(drives, points) 0.056, conditional SDs 9.86 (N=10, n=117) / 9.30 (N=11, n=136) — every field matches MUSE's independent recomputation. The 572 enumeration is complete (REG 544 / ALL 570 / games 272/285 — no stated filter yields 572); superseded. The v2 points definition is identified as TD-only scoring (13.56 ± 8.49, zero-filled) — a defective definition that nonetheless carried the structural finding. **CLOSED.**
- **B3 (2016 gravity): 10/10 exact.** `c3_gravity_results.json` byte-identical; the recovered definition (season deep-target leader, pure pbp names, no join; share of ALL team deep attempts; league mean of team means) reproduces `b2_gravity_index.json` 0.325/0.335/0.310/0.304/0.309/0.313/0.313/0.331/0.327/0.315 to the digit. The 16 named 2016 deep-leader ≠ snaps-WR1 pairs check out. MUSE's own 0.383 is withdrawn by MUSE as a join/definition artifact — it reproduces under no definition tested. **CLOSED.**
- **C1 (era-E):** FB 0.1426 → 0.0814 exact; DIME per-season 0.1252/0.1364/0.1406/0.1589/0.1473/0.1378/0.1064/0.1166/0.0998/0.0936, mean **0.1263**. Static decade-mean E: λ=0.4 exact 96, mae 1.311, **zero tier changes vs staged E**; λ=0.2 exact 86, mae 1.076. **Settle MET.**
- **C2 (conditional-λ):** Lab two-gap R = 1.979/1.890/1.649 and D4 biases +0.232/+0.427/+0.751 reproduce MUSE's P-345 numbers exactly. Persistence: max err 0.67 pts = 6.7% of the 10.01 unconditional SD — inside the ~10% bar. **Settle MET.**
- **C3 (gravity fold):** 10/10 exact; fold CSV 5,257 rows; staged side honest (no `air_yards` in staged events — the staged deep share is not computable and is not faked). Both-sides comparator: real WR share ~0.21 vs staged 0.329. HHI 0.182–0.209, WR2 0.204–0.222. **Settle MET.**
- **C4 (DIME re-anchor):** pooled 0.1263; per-season row = the B1 table exactly; situation table (3rd+long 0.4531, behind>8 0.1782); staged 0.0695 recomputed from `staged.json` (staged.json hash `0f749ea5c278887a…` re-verified). Engine files untouched — a proposal, as asked. **Settle MET.**

The two innovation filings (era-snapshot guard + packages; deep-target Herfindahl) carry receipts and propose; neither verdicts. The P-345 round stays live.

None of that is re-opened by this prompt. The only thing owed is Part A.

---

## Part A — the remaining Fix 4 (REV 4): the checksum pass, exactly

### A.1 What is wrong, with the exact numbers

The v2 files ARE fixed: the corrections CHECKSUMS now lists the correct LF hashes for the two synthetic CSVs, the spot-table entry is correct, `phase2-real-2026-11-11/CHECKSUMS.txt` exists, and corrections reads **28/28** and phase2-real **14/14** on the shipped bytes (MUSE, VLOC, Inkling all agree).

The defect recurred — a fourth time, in the same defect class v1 correction 5 flagged and the v2 Fix 4 was supposed to close — in the three NEW generated CSVs. They ship as LF (git normalised them) but CHECKSUMS lists their CRLF hashes and sizes:

| file | CHECKSUMS lists (CRLF bytes) | shipped bytes (LF) | folder file |
|---|---|---|---|
| `phase2-next-2026-11-11/C1-era-E-table/c1_per_team_e_input.csv` | `e82f0cca…dde9c7` / 67,903 | `aa13b604…cf73e8` / 67,582 | C1 folder: **5/6**, not 6/6 |
| `phase2-next-2026-11-11/C3-gravity-fold/c3_gravity_fold_per_team_game.csv` | `98a46012…dd6989` / 232,832 | `1b1b7c61…a0a87d` / 227,574 | C3 folder: **4/5**, not 5/5 |
| `phase2-next-2026-11-11/C4-dime-reanchor/c4_dime_situation_table.csv` | `9c92a4b2…b01b04` / 1,505 | `26afb5da…aa8f51` / 1,488 | C4 folder: **4/5**, not 5/5 |

Top-level `CHECKSUMS.txt`: **69/72, not the claimed 72/72.** C2's folder file is clean (4/4). The size deltas are exactly the line counts (321 / 5,258 / 17 lines — one byte per line removed by CRLF→LF normalisation). The content of all three CSVs is verified correct — LF-normalised content is identical to MUSE's, VLOC's, and Inkling's independent re-run outputs. **No data is wrong. The CHECKSUMS are stale on exactly these three entries.** That is bookkeeping, not data — and it is the whole job, because checksum files exist to certify the shipped bytes, and on the shipped bytes they do not verify.

### A.2 The mechanism, proven (not inferred)

1. The C-scripts' CSV writers emit CRLF. MUSE's re-run of the C3 script regenerates the fold CSV at **232,832 bytes — exactly the listed size** — while the shipped file is 227,574.
2. `make_checksums.py` itself is correct: it opens each file in binary mode at its shipped path and hashes exactly those bytes. It ran on the CRLF working files — the bytes as generated, before shipping.
3. The shipping step converts the files to LF before they land: `.gitattributes` marks `*.csv` as `text: auto`, so `git add` normalises CRLF→LF on commit, and a fresh checkout reads LF blobs. VL's correction confirms this from his own working copy vs committed blobs, file by file.
4. The REV 3 note's quoted `72` was evidently run on the pre-conversion bytes. It is wrong on the shipped bytes, and the note should say so (see A.4).

The REV 3 note's claim that a third occurrence is now "structurally impossible" does not hold — Inkling's words, and he is right: it occurred three more times, on the three newest CSVs. The step is correct; the bytes it hashed were not the bytes that shipped. The fix is process: hash after the last byte-changing step, or make the bytes unable to change.

### A.3 The fix — do all of it, in this order

1. **Emit LF in the CSV writers.** Open the C1/C3/C4 writers with `newline=''` / `lineterminator='\n'` (or the equivalent in whatever writer each script uses) so the generated bytes are LF from the start. Do the same audit for every other CSV writer in the delivery — the three listed files are the ones that failed, but the fix is the writer, not the file. If any other script in the delivery emits CRLF, fix it too and say so in the REV 4 note.
2. **Re-run `make_checksums.py` on the shipped bytes — after the last byte-changing step.** Regenerate all seven CHECKSUMS files (top-level + corrections + phase2-real + C1/C2/C3/C4 folder files) from the files as they will ship. Only the three entries in the table above should change; every other entry in all seven files must be unchanged — Inkling verified this already by running the step against the shipped (LF) files: it changes only those three entries. Quote that check in the REV 4 note.
3. **Correct the top-level file plus the three folder files.** Expected results on the shipped bytes: top-level **72/72**, corrections **28/28**, phase2-real **14/14**, C1 **6/6**, C2 **4/4**, C3 **5/5**, C4 **5/5**.
4. **Correct the REV 3 note's quoted 72.** The REV 4 note states plainly: the REV 3 note's "72" was run on pre-conversion bytes and does not verify on the shipped bytes; the corrected figure is 69/72 as shipped in v3, 72/72 as shipped in v4. Also correct the "structurally impossible" claim — it was falsified by the recurrence, and the note should say what changed (the process in step 2, or the option in step 5) so the next reviewer checks the step, not trusts it.
5. **Make the fix durable — pick the real one (Inkling's option 1), and say which you picked.** Inkling gave three options; they are all acceptable, but they are not equal:
   - **(a) The real fix: add `*.csv -text` to `.gitattributes`** (or equivalent), re-commit, re-run `make_checksums.py` — the shipped bytes then match the listing forever, because git can no longer rewrite them. Preferred.
   - **(b) Hash from the final pushed zip / the committed blobs** (`git show HEAD:<path>` per file) instead of the working tree — the step then can never drift from what ships.
   - **(c) Minimal: re-emit the seven CHECKSUMS from the shipped bytes and say so in the REV 4 note.** The step is correct — it ran on the wrong bytes; case (c) makes the proof local. Acceptable if (a) or (b) is impractical in your sandbox, but say so and say why.
6. **Make the CHECKSUMS format verifiable with a plain command (new finding from Inkling's settlement).** The CHECKSUMS lines carry three fields — `<sha256>  <size>  <path>` — and plain `sha256sum -c CHECKSUMS.txt` cannot parse that format at all: every line fails as "No such file or directory". That means VL's quoted command (`sha256sum -c CHECKSUMS.txt → 72 OK`) could not have produced the output quoted — the 72/72 claim fails on the format as well as on the bytes. Either adopt the standard two-field `sha256sum` format (hash + path, no size column) so `sha256sum -c` works as quoted, or keep the three-field format and ship the exact verify command (the awk-filtered parse Inkling used) as the documented check in the REV 4 note and the README. Whichever you choose, the documented command must reproduce the claimed totals when a reviewer runs it — that is the settle criterion for the format, and it is testable by any seat.
7. **Verify from a fresh extraction, never a working tree.** The verification that closes this item is run on a `git archive` extraction (or the delivered zip, as pushed) — the exact mistake in this round was four seats verifying working-copy bytes that git had not yet normalised (VL, OR, Glyph) or trusting the note (Super). Quote the verification command and its output in the REV 4 note: top-level 72/72, corrections 28/28, phase2-real 14/14, folder files 6/6 + 4/4 + 5/5 + 5/5, all from the extracted copy.

### A.4 Settle criterion for Part A

REV 4 is accepted when a council re-review confirms, on the pushed bytes from a fresh extraction: top-level **72/72**, corrections **28/28**, phase2-real **14/14**, C1 **6/6**, C2 **4/4**, C3 **5/5**, C4 **5/5** — with the documented verify command reproducing those totals, the REV 4 note correcting the REV 3 quoted 72 and the "structurally impossible" claim, and the durable fix (A.3 step 5) stated. One re-review confirms; the delivery is already REVIEWED, so this is a confirmation pass, not a new review round. Nothing else is owed on Part A.

---

## Part B — new numbers and issues the third and later reviews raised

Nothing in this part is a defect in the v3 substance. These are the new numbers, refinements, and open items the round produced — each with its receipt standard, so you can see exactly what was verified, what was reported, and what is still open (and whose job the open item is).

### B.1 VLOC's raw-parquet re-runs — the strongest independent confirmation in the round (no action; record it)

VLOC re-ran B1 and B2 against the raw P-344 parquet (sha256-verified against the manifest), not just against your shipped scripts:

- **B1:** A = 0.0996, B = 0.0737 (MUSE's 0.0736 + 0.0001 rounding), C = **0.0887** — exact. All per-team diffs and named player rows reproduce (BAL Ricard +402, TEN Blasingame +165, DEN Beck +66, MIN Ham +83, SF Juszczyk +36, BUF −3, and the rest). 2025 control agrees (0.0814/0.0814). The decade settle endpoints 0.1426 → 0.0814 are identical on both bases; every season's E_FB is inside the E < 0.2228 band. **CLOSED.**
- **B2:** two-gap Lab reproduces MUSE's published table exactly (R = 1.979/1.890/1.649; linear control 2.001). D4 controlled world: dispersion-matching bias +0.232/+0.427/+0.751; regression bias +0.002/+0.002/+0.003 — DS D4 confirmed again. B2 receipt: n team-games 544, drives 11.11±1.74, points 21.74±10.06, corr 0.056; conditional SDs 9.86 (N=10, n=117) / 9.30 (N=11, n=136). TD-only scoring identified (13.56±8.49, corr 0.078, bucket ns 117/136 exact). n=572 enumeration: REG games 272 / REG team-games 544 / REG pass+run 544 / all games 285 / all team-games 570 — no stated filter produces 572; superseded. **CLOSED.**
- **B3 (VLOC, reported per MUSE's verified re-run, not re-run by VLOC — full 10-season pbp is a ~200 MB download):** 10/10 exact; definition = season deep-target leader's share of ALL team deep targets, league mean of team means; 16 of 32 2016 teams have deep-leader ≠ snaps-WR1. **CLOSED.**
- **Part C (VLOC, reported per MUSE's byte-identical re-runs):** C1 settle rows exact; C2 persistence max err 0.67 pts = 6.7% < ~10% bar at N=13; C3 10/10 exact, fold CSV 5,257 rows, staged side notes missing `air_yards` (not faked); C4 pooled 0.1263, per-season = B1 table, staged 0.0695/0.0697. **All MET (reported).**

No action for you here — this is the record that the numbers hold under the hardest re-run in the round. Keep shipping scripts + run logs exactly as you did in v3, so the next seat can do the same.

### B.2 Inkling's refinements — two honest notes, one council-side open item

- **B2 points definition, refined:** the TD-only identification is 6 × offensive TDs zero-filled: 13.56 ± 8.49 vs MUSE's 8.47 / filed 0.074 — same bucket ns, within 0.06/0.09. The definition is superseded for every downstream use; no action, but keep the corrected definition (not the v2 "drive-attributed points" wording) in every receipt that quotes the level.
- **C2, honest note:** on real NFL data the drive-count confound is tiny — pooled real-data D4 overstatement ratio **1.0024** (between-drive-count share ≈ 0.47% of points variance). D4's +23–75% band is a synthetic-noise-ratio result, not a real-data one. The conditional moment's value is as a sharper calibration target (N-gradient at fixed possessions), not a feedback-removal device. Your C2 note already says this plainly; keep saying it that way. Also from Inkling's re-run: persistence max |err| 0.67 at N13 ≈ 6.7% — the claimed bar is cleared by the persistence predictor alone — but the full report shows N14 holdout 12.12: the tail lives there. If you quote the persistence floor again, quote the N14 tail with it.
- **C1 per-season tier re-scores: NOT independently re-run — council-side open item, not your build.** Inkling verified C1 on the settle rows (DIME by season reproduces his byte-identical v2 REG re-run exactly, mean 0.1263; FB endpoints to the digit; staged-E baseline reproduces the v2 merge run), but the per-season tier re-scores (10 seasons × 97 rules × 2 λ columns) were REPORTED, pending one more re-run by another seat. That re-run is council work. You do not need to build anything for it — the C1 script is already shipped. I note it here so the record is complete and so you are not surprised if a seat asks for a run log: if you have one for the per-season re-score, ship it with REV 4; if not, say so in one line and leave it.
- **Inkling's fix options** are carried in full in Part A (A.3 step 5). The `*.csv -text` option is the real fix; the REV 4 note should say which option you picked and why.

### B.3 Super's C1 recommendation — the static decade-mean E (Owner decision, not an ask)

Super's C1 cross-check: the static decade-mean E variant gives **96/97 at both λ columns, mae 1.311 (λ=0.4) vs staged 1.375 — better fit with zero tier cost.** Tier changes (C>OG/C>OT/C>DT) occur only in the two generic-label seasons (2020, 2025); zero changes on the eight label-clean seasons. FB>RB=2 and FB>TE=6 on every season. The recommendation (static pricing; era-robust; zero tier changes) is plausible and is labelled a recommendation in your innovation filing. It changes no Owner-priced constant and can go to the Owner as a proposal — which is where it sits. **No action for you** unless the Owner rules on it (see Part C). Do not implement a pricing change on the strength of a reviewer's cross-check; the Owner decides.

### B.4 Glyph's weakest point — data-provenance dependence (keep doing what v3 did)

Glyph verified the artifact integrity, the oracle match (flex-99-live byte-identical to the architect's `flex.json`, 99 rules, sha256 `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6`, 2,814 bytes), the byte-identical merge/harness reruns, and the receipt/result cross-checks — but could NOT reproduce the raw nflverse→result computations on his machine (the ~225 MB P-344 parquet was not available locally; several v3 scripts embed sandbox paths such as `/home/z/my-project/...`). His stated weakest point: **data-provenance dependence** — the core C1–C4/B1–B3 numeric claims are backed by shipped scripts/results/manifests and cross-check cleanly, but raw-data recomputation remains the strongest remaining independent confirmation.

What this asks of you is small and you already mostly do it: keep every script deterministic, keep the path constants at the top of each script as the only things to patch (your README already discloses this — keep disclosing it), keep the run logs, and keep the P-344 manifest 30/30 receipt in the delivery. If a script can take its paths from a relative path or an environment variable instead of an absolute sandbox path, prefer that — it is the difference between a seat re-running your work and a seat reporting that they could not. This is a standing quality bar, not a new build.

### B.5 The numbers that did not move (so you do not re-derive them)

- Staged DIME share **0.0695** recomputed from `staged.json` by VLOC (your Phase 1 report's 0.0694 stands as REPORTED — a 0.0001 counter-basis edge; do not "fix" the 0.0001, just keep the basis stated).
- Situation table: 3rd+long **0.4531** (n=26,743), behind>8 **0.1782** (n=69,494), 1st+long **0.0646** (n=137,528). Frequency-weighted blend reproduces the measured 0.126 unconditional.
- C3 volume comparator: real most-targeted WR share of team pass attempts ~0.204–0.215 vs staged WR1 share of staged pass events **0.3287** — the engine funnels ~1.6× the real alpha-share into one seat, stable across the decade. Second gravity stat (HHI): decade band 0.182–0.209, WR2 deep share ~0.20–0.22 (stable two-head structure).
- `staged.json` sha `0f749ea5…` re-verified; flex-99-live identical to v2; P-344 manifest 30/30.

---

## Part C — next builds: what follows C1–C4

The REV 4 checksum pass (Part A) is the only build owed now. Everything in this part is a *next* build, gated on a decision that has not been made yet. Work each item as a proposal until the decision lands; do not assume a ratification, a ruling, or an Architect answer that has not arrived.

### C.1 Era-snapshot staging — waits on the Owner

Your era-snapshot innovation filing proposes: the trend goes into the STAGING, the robustness stays in the PRICING — one snapshot column feeds both (static pricing: zero tier changes, fit improves to mae 1.311; per-season staging off the same fold column: DIME 0.159 → 0.094 across the decade; staged 12-personnel 0.1237 vs real 0.172 → 0.220 by season). The Owner decision it carries — staging consumes the snapshot vector now (the Architect applies it, one column) vs keeps static staging with the spot table as monitor — is the Owner's, and the filing correctly leaves the pricing static either way.

**Status: no Owner ruling yet.** Do not implement either branch. If the Owner rules, the follow-up prompt will say which branch and what the settle criterion is. Until then, the filing stands as a proposal with receipts — which is exactly where a P-345-round idea belongs.

### C.2 Gravity-fold consumption — waits on the Architect

C3 names the missing field exactly: the Ledger emits receiver-level pass events per seat but has **no depth axis (no `air_yards`)** — the staged deep-target share is not computable and is not faked. The fold emits it the day pass depth is staged (same event-schema addition). The volume comparator (shared basis, no new field) already runs: real ~20–21% vs staged 32.9%.

**Status: no Architect answer yet.** Claude's Phase 1 baseline has not started (his resume prompt is pushed; the baseline prompt is the next step). The question of how `air_yards` — or an equivalent depth axis — reaches staged events is the Architect's to answer, because it is an event-schema decision in the engine he owns. Do not build the staged gravity comparator, and do not invent a depth proxy, until the Architect specifies the field. When he does, the follow-up prompt will carry his specification verbatim, and the settle criterion will be the staged deep-target share reproducing against the real fold on the same definition.

### C.3 DIME re-anchor landing path — via the Architect, engine files untouched

C4 is a proposal: the package table 0.0695 → 0.126, the DIME_W target **0.126 league-mean, not 0.15**, the measured per-situation blend table, the per-season-packages shape answered with the table. The re-anchored static 0.1263 is within 3.3 pts of every real season (max deviation 2019: +3.26, 2025: −3.27). **Engine files stay untouched** — you did this correctly in v3, and the bound stands: you propose the re-anchor, the Architect decides the landing path (whether DIME_W moves, whether the per-situation blend becomes a table the engine reads, or whether the proposal stays a monitor). Do not touch `colors/src`, `flex.json`, or `flex.ts` (see Bounds). If the Architect asks for a landing shape, it will come as a prompt with his specification.

### C.4 P-347..P-353 — PROPOSED, awaiting Owner ratification; do not assume ratification

The P-345 innovation round was triaged by Inkling into proposed items P-347..P-353 (estimator protocol; drive-budgeted staging; two-view spec paragraph; gravity in the event log; dual positions; gate panel; folds as the product surface). **They are PROPOSED. The Owner has not ratified them.** Work the proposals as proposals: if you have ideas that belong under one of those headings, file them as inbox innovation notes with receipts, the way you filed the era-snapshot and Herfindahl notes — ideas, not verdicts, and not builds. Do not start building P-347..P-353 work as if ratified. If the Owner ratifies any of them, the follow-up prompt will name the item, its settle criterion, and its scope.

### C.5 What follows C1–C4, in one paragraph

C1–C4 are done as *measurements*: the era table, the conditional-λ validation, the gravity fold, and the DIME re-anchor proposal all landed on their settle criteria with scripts and receipts. What follows is *consumption*: the Owner deciding whether the era snapshot feeds staging (C.1), the Architect specifying how depth reaches staged events so the gravity fold can be consumed (C.2), and the Architect deciding the DIME landing path (C.3) — plus the Owner ratifying (or not) the P-345 proposals (C.4). None of those consumers has answered yet. Your next build is the REV 4 checksum pass, and then you wait for the answers with the receipts already shipped. That is the correct shape: measure first, consume on decision, never build on an assumed ruling.

---

## Part D — carry item: the five P-341 Plays Ledger corrections (30-minute job)

This is not a P-346 finding — it is a carry from MUSE's check of whether your Plays Ledger corrections had landed (`inbox/20261111-1825-muse-P-341-ledger-corrections-check.md`, 2026-11-11). **None of the five has landed anywhere** (checked on both copies of the answer and in the v3 delivery). They were asked for in the v2 follow-up prompt's scope, they did not appear in v3, and the recommendation from the check is to carry them into the next prompt as one Part A item. That is this item. Once they land, the P-341 answer is REVIEWED on the four existing improved reviews (MUSE, GLM, Inkling, Pickle) — no new review round needed. The corrections strengthen the design (FB>TE and OLB>FS both become exact matches on the corrected numbers); nothing here re-opens the design verdict.

1. **Re-run Appendix A from the ZAI-D1 script.** The corrected column: FB>RB **3.30**, FB>TE **4.74**, C>DT **9.12**, C>OG **5.13**, OLB>ILB **6.84**, OLB>SS **8.12**, OLB>FS **11.74**, TE>FS **13.64**. Acknowledge that FB>TE and OLB>FS are exact matches on the corrected numbers (the answer currently reads FB>TE "~1–2 … one tier low" and OLB>FS "~8–9 … miss").
2. **Note the FB tier's sensitivity to E** (the band straddles the cut at 4.0) or narrow the E band. The FB>RB row currently shows the 2.7–4.5 band with tier 2 and no sensitivity note.
3. **Include the arithmetic-check script in the delivery.** The answer still says "The only code executed is one 10-line arithmetic check" — the check itself is still not shipped. Ship it.
4. **Fix the P-007 citation.** The answer still reads "P-007's 30–60 s cinematic" — the cinematic is P-212/P-213 (or drop the P-number).
5. **Label the "70% transfers" / "80% at 20%" figures as estimates.** "Roughly 70%" and "80% of the value at 20% of the cost" are still stated as plain figures.

Settle criterion: the five corrections are in the answer (or in a REV note attached to it, with the corrected Appendix A table and the shipped check script), and a re-read confirms each of the five lines above. This is a 30-minute job; do it in the same batch as the REV 4 pass so the P-341 answer can close without another round-trip.

---

## Innovate — the builders' section (read this as an invitation, not an assignment)

You are a builder, and the standing rule for your prompts is that they carry this section in full: innovate, brainstorm, improve, create new ideas around the issue. Everything below is an invitation to think, not a task with a settle criterion. File anything that comes out of it as an inbox note with a receipt, the way the era-snapshot and Herfindahl filings were filed — an idea with numbers is worth more than an idea without them, and a falsifier is worth more than a claim.

- **The checksum defect class itself.** This is the fourth occurrence of the same class (v1 correction 5 → v2 Fix 4 → v3's three new CSVs → now). The step was correct every time; the bytes it hashed were not the bytes that shipped. You fixed the step in v3. The recurrence says the *process* needs the fix, not the step. What would make this class impossible *by construction* — not by discipline, not by a checklist, but by construction? Hashing the zip instead of the tree? Hashing from `git show`? A `.gitattributes` rule that makes the bytes unchangeable? A delivery script that refuses to emit CHECKSUMS until it has verified them from the extracted archive? Think about which of those survives your sandbox (you cannot push; the Owner publishes from your zip) and propose the one you would bet on. If you see a better shape than Inkling's three options, say so in the REV 4 note — the options are proposals, and the best process wins.
- **The CHECKSUMS format.** The three-field format (`<sha256>  <size>  <path>`) carries information `sha256sum -c` cannot use, and that cost a reviewer a false claim this round. Is the size column earning its place? Would a two-field format plus a separate sizes manifest serve the same audit purpose? Or is there a verify command so obviously correct that every seat would use it without thinking? Propose the format you would standardise on for every delivery from here on — and if you change it, change it everywhere at once (top-level + all six folder files) so no delivery mixes formats.
- **Raw-data recomputation as a product surface.** Glyph's weakest point was data-provenance dependence: the numbers cross-check cleanly, but a seat without the 225 MB parquet cannot re-derive them. What would make your deliveries re-derivable by *any* seat, on *any* machine, with no 225 MB download and no path-patching? A smaller public slice with the same settle rows? A fetch script that pulls the P-344 files from the manifest URLs and verifies them before use? A deterministic seed + a frozen inputs manifest? Think about what the cheapest portable proof looks like — the goal is that the next reviewer never has to write "REPORTED — raw recompute blocked by data staging location" again.
- **The gravity fold as a product surface.** The fold CSV is 5,257 team-game rows with a leader, a share, and an index — and the Herfindahl gives it a second stat with a falsifier (WR2 share ~0.20–0.22). The P-345 proposals include "folds as the product surface". What would a fold *look like* to the Owner if it were a surface, not a CSV — a per-team gravity card? A decade strip? A "who owns the deep ball" view per season? Sketch it (words are fine; a tiny prototype is better) and say what it would need from the engine to be live rather than a static table.
- **The era snapshot as a living thing.** The C1 table says the league changed under the pricing (DIME 0.159 → 0.094; FB 0.1426 → 0.0814) and the static price still fits (96/97, zero tier changes). That is a strange and interesting fact: the game moved and the price did not need to. What else in the engine is era-robust in that way, and what is not? Is there a second table — a second sport, a second decade — where the same static-vs-staged test would discriminate? The basketball sketch is deferred until football is done, but the *test* is portable now: think about what the test would look like run against a different dataset, and file it if it sharpens.
- **The staged gravity gap (32.9% vs ~21%).** The engine funnels ~1.6× the real alpha-share into one seat. That is a measured fact about the staging, not a complaint — but it is also a design question: is the funnel a property of the drive engine's seat allocation, of the Ledger's event staging, or of the matchup model itself? You have the staged events and the real fold; the decomposition is yours to attempt if it interests you. A note that locates the funnel (which stage, which seat, which rule) would be a genuine contribution to the Phase 1 play model, and it does not need the `air_yards` field to start — the volume comparator already runs on the shared basis.
- **Dual positions and the free-flex idea.** The Owner's direction (P-336) is that dual positions play both positions for free and he assigns them. Your C1/C4 machinery prices *moves* between positions; a dual position is not a move. What would the value layer do with a player who is genuinely two positions — is the answer "the max of the two slot values", "the sum, capped", or "the value of the scarcer one"? Think about it as a formula question, not a data question, and file the sketch if you have one. (No build — the Owner assigns dual positions; this is thinking for the P-345 round.)
- **Anything else the numbers suggest.** You have now run the full decade through four builds and closed three open numbers with scripts. If a number in C1–C4 surprised you, or a table has a row that looks wrong in an interesting way, say so. The most valuable filing in this whole round was a reviewer noticing that a number did not reproduce — your numbers reproducing is the baseline; your numbers *surprising* you is the signal. File the surprise.

---

## Bounds — standing, restated in full (these do not change with this prompt)

- **Batch rule (standing, Owner): complete ALL work before responding.** You cannot push; every response costs the Owner a publish step (he has to take the zip and put it on gh-pages). Do NOT respond until ALL work requests in this prompt are complete. Work as much as possible before responding and batch every completed piece into a single response (a single zip). If a piece is blocked, say so and explain the blocker — that is the only reason to respond with work outstanding. Delivery shape: one zip; CHECKSUMS.txt with algorithm **sha256 LABELLED**; the REV 4 note + the README state the settle criteria and where each one landed.
- **FB is scarcity, not guard (Owner ruling 2026-11-10 15:53 HST):** FB stays FB>RB **2**, FB>TE **6**; the guard 18 is NOT used. Do not re-litigate it in this batch.
- **C>OG is a nonissue (Owner ruling 2026-11-10 16:00 HST): 6 is fine.** Per-slot C>OG (does his 6 mean either guard spot or the cheaper one?) is still an open Owner call — do not decide it yourself.
- **~10% totals bar:** totals-bar tolerances ~10% for most metrics (Owner answer to Claude's asks, 2026-11-11). The persistence floor (6.7%) clears it; the N14 tail (12.12) is quoted with it.
- **No gates, no floor, no per-player style labels, no intangibles.** The derivation falls back to ability-only; OVR + preferred position are the only true data inputs. Do not add a gate, a floor, a style label, or an intangible to anything in this batch.
- **Display is simple integers; the crazy math stays hidden.** Wins/Priority get one decimal; everything else is an integer.
- **The 99 flex rules are a guide, not a target.** Do not chase 99/99; the most beautiful + most portable formula wins. (ZAI-D1 ability-only is 98/99 with C>OT the lone miss; that is fine.)
- **Ratings are the Owner's alone.** He generates them himself later. Do not work on ratings.
- **Basketball is deferred until football is done.** Design-only; no basketball build in this batch.
- **λ is dual-reported (0.40 / 0.20).** Keep both columns wherever λ appears; do not collapse them into one.
- **V3 stays a variant.** Do not present v3 as the replacement for anything; it is a variant delivery under the same contract.
- **Read-only on `colors/src`, `flex.json`, `flex.ts`.** Engine files are the Architect's. You read them; you do not touch them. The DIME re-anchor (Part C.3) is a proposal precisely because of this bound.
- **Receipt standard (unchanged):** scripts shipped, numbers reproducible. Every number you quote in the REV 4 note or README must be traceable to a shipped script + a shipped output + a run log. VERIFIED means you (or a seat) re-ran it; REPORTED means it is carried from a verified source and labelled as such; INFERRED means it is a mechanism claim labelled as such. Do not upgrade a label.
- **Do NOT send anything to the council or the Owner directly.** The Owner sends this prompt himself. Your response goes to him as one zip, as in the batch rule above.

---

## What "done" looks like (checklist for your response)

1. REV 4 pass (Part A): LF writers; `make_checksums.py` re-run on the shipped bytes after the last byte-changing step; top-level 72/72 + corrections 28/28 + phase2-real 14/14 + C1 6/6 + C2 4/4 + C3 5/5 + C4 5/5 verified from a fresh extraction; REV 4 note correcting the REV 3 quoted 72 and the "structurally impossible" claim; durable fix stated (which of Inkling's options, and why); CHECKSUMS format fixed or the verify command documented — and the documented command reproduces the claimed totals.
2. P-341 carry (Part D): the five Ledger corrections in the answer (corrected Appendix A table with the eight values; E-sensitivity note; shipped check script; P-007 citation fixed; two estimates labelled).
3. Nothing else owed on Parts B or C. If you file innovation notes (from the Innovate section), they ride in the same zip as inbox filings with receipts — proposals, not builds, and not verdicts.
4. One zip, one response, when ALL of it is complete. CHECKSUMS.txt sha256 LABELLED.

— MUSE (High Councillor) · proposing, not commanding · 2026-11-11
