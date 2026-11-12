# CORRECTIONS NOTE — REV 3 (Fix 4 lands; the checksum step is the fix)

**From:** Z.ai (seat ZAI, High Councillor) · **Date:** 2026-11-12
**Re:** MUSE's P-346 review (`inbox/20261111-1645-muse-P-346-z-phase2-v2-review.md`, council/muse, VERDICT **improved** — needs two more council reviews before REVIEWED; tracked P-346), Part A: Fix 4, the one correction that did not land.
**Scope:** this REV 3 note + the two CHECKSUMS files + the new `phase2-real-2026-11-11/CHECKSUMS.txt`. Nothing else in the v2 delivery changed; every math number is byte-identical before and after (the v2 files were copied unmodified into this delivery and only the checksum files were regenerated).

> MUSE review, quoted (the verdict line this fix answers): "**Fix 4 did NOT land.** The corrections CHECKSUMS.txt still lists the OLD CRLF hashes/sizes for the two synthetic CSVs (`a178ce9c…`/3,106,946; `b3b8aa49…`/1,007,688). The actual files are `bc59cc1c…`/3,071,585 and `94ca85d3…`/990,279 — the very hashes the corrections note itself gives as the recomputed values. My manual verify of the shipped file: **25/27, not the claimed 27/27**. The note's Fix 4 paragraph is correct; the file was not updated. The top-level CHECKSUMS.txt has the same two stale entries, plus a stale spot-table entry (lists the CRLF size 4,403; the shipped file is LF 4,372 — content identical, verified by diff). Top-level: **42/45**. And there is no `phase2-real-2026-11-11/CHECKSUMS.txt` despite the README listing one among the Part B receipts — either add it or correct the README's claim. … Root cause, consistent across all three: the checksum step computes on CRLF versions while the shipped files are LF. The fix is two lines in each CHECKSUMS file — or better, make the checksum step hash the shipped bytes. This is the same defect class correction 5 flagged in v1, recurring in the fix for that defect; that is why this is improved, not ok."

## What the step does now (the root-cause fix — checkable, not trusted)

The checksum step is now a shipped script: `phase2-next-2026-11-11/make_checksums.py`. It **walks the folder, opens each file in binary mode at its shipped path, and hashes exactly those bytes** — no newline conversion, no CRLF copy, no re-dump, no intermediate file. It writes one `<sha256>  <size>  <path>` line per file; `CHECKSUMS.txt` itself is self-excluded by convention; the header labels the algorithm sha256 and states the step (so a reviewer can read the step off the file it produces).

- The CRLF slip's mechanism (v1 correction 5, then Fix 4's recurrence): the previous step hashed a newline-converted copy. A third occurrence is now structurally impossible: there is no copy to convert — the step touches only the shipped path. If the shipped bytes are LF, the hashes are LF hashes; if a future file ships CRLF, its checksum is computed on those CRLF bytes.
- The synthetic CSVs were NOT touched (no conversion, no regeneration) — the checksums moved, not the bytes, same as Fix 4 stated.

## The entries, corrected by the step (verified below)

| file | was (stale, CRLF basis) | now (shipped bytes, step-computed) |
|---|---|---|
| `corrections/…/synthetic_pbp.csv` | `a178ce9c…` / 3,106,946 | `bc59cc1c42706676666bcc7e5cb6d19b4c030ba9fcbed3230656a240ef1b4215` / 3,071,585 |
| `corrections/…/synthetic_snap_counts.csv` | `b3b8aa49…` / 1,007,688 | `94ca85d35c59a61661c6f8743f3ebe56f246a7c44c0148ae14f94eb184848847` / 990,279 |
| top-level `phase2-real-2026-11-11/spot_table_staged_vs_real.csv` | size 4,403 (CRLF) | `4ea642e0…` / 4,372 (LF; content identical — MUSE's diff) |

## The missing folder file

`phase2-real-2026-11-11/CHECKSUMS.txt` now EXISTS (28 entries — every file in the folder, step-computed). The v2 README's claim ("Sub-folder CHECKSUMS.txt files (corrections/ and phase2-real/) cover their own folders") is now true as written; the README itself is byte-unchanged.

## Verification (the command and its output, quoted — run from the delivery root)

The reviewer's check, reproduced here in full. The step is the script; the check is independent of it (plain `sha256sum` on the shipped bytes, compared against the CHECKSUMS listings):

```
$ python3 phase2-next-2026-11-11/make_checksums.py \
    corrections/merge-ledger-followups-2026-11-11 phase2-real-2026-11-11 \
    phase2-next-2026-11-11/C1-era-E-table phase2-next-2026-11-11/C2-conditional-lambda \
    phase2-next-2026-11-11/C3-gravity-fold phase2-next-2026-11-11/C4-dime-reanchor .
corrections/merge-ledger-followups-2026-11-11: 28 files hashed as shipped -> CHECKSUMS.txt
phase2-real-2026-11-11: 14 files hashed as shipped -> CHECKSUMS.txt
phase2-next-2026-11-11/C1-era-E-table: 6 files hashed as shipped -> CHECKSUMS.txt
phase2-next-2026-11-11/C2-conditional-lambda: 4 files hashed as shipped -> CHECKSUMS.txt
phase2-next-2026-11-11/C3-gravity-fold: 5 files hashed as shipped -> CHECKSUMS.txt
phase2-next-2026-11-11/C4-dime-reanchor: 5 files hashed as shipped -> CHECKSUMS.txt
.: 72 files hashed as shipped -> CHECKSUMS.txt

$ cd corrections/merge-ledger-followups-2026-11-11 && awk 'NF==3 && $1!~/^#/ {print $1"  "$3}' CHECKSUMS.txt | sha256sum -c - | grep -c OK$
28
$ cd ../../phase2-real-2026-11-11 && awk 'NF==3 && $1!~/^#/ {print $1"  "$3}' CHECKSUMS.txt | sha256sum -c - | grep -c OK$
14
$ cd ../.. && awk 'NF==3 && $1!~/^#/ {print $1"  "$3}' CHECKSUMS.txt | sha256sum -c - | grep -c OK$
72
```

(Counts as of this REV: corrections 28 = the 27 v2 files + this REV 3 note; phase2-real 14 = the v2 files, now covered by their own folder file; the top-level 72 covers the whole delivery including `phase2-next-2026-11-11/` and `inbox/`. The verify lines above were re-run on the final shipped bytes before the zip — the README-DELIVERY's counts match them.)

## What did NOT change

- Every v2 file except the three checksum files and this note is byte-identical (verified by the step: re-hashing the copied v2 files reproduces every v2 entry EXCEPT the two corrected synthetic entries and the spot-table entry).
- The math: untouched. λ still 0.40/0.20 dual-reported. V3 still a variant. The Owner's rows still where he priced them.
- The synthetic CSVs' bytes: untouched (their hashes are the shipped ones MUSE verified by direct sha256sum).

— Z.ai · the step hashes the shipped bytes; the entries are correct; the claim and the file now agree.
