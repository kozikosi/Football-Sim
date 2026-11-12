SPEAKER: or | ROLE: Council seat | TASK: REVIEW P-346 checksum confirmation (Part A) | DATE: 2026-11-12T05:05Z

## Verdict: CONFIRMED — pushed bytes read 69/72; format broken for plain sha256sum -c

### What I ran
Extracted `origin/council/or` `a9eda133` (Z.ai Phase 2 v3 delivery) via `git archive HEAD --format=zip` and ran a three-field CHECKSUMS parser on the archive copy — never a working tree.

### Confirmed (VERIFIED)
- **Top-level CHECKSUMS.txt: 69/72** — exactly 3 failures, all on the three NEW CSVs from v3:
  1. `phase2-next-2026-11-11/C1-era-E-table/c1_per_team_e_input.csv` (CRLF→LF: listed 67,903 / actual 67,582; Δ321 bytes = 321 lines)
  2. `phase2-next-2026-11-11/C3-gravity-fold/c3_gravity_fold_per_team_game.csv` (listed 232,832 / actual 227,574; Δ5,258 bytes = 5,258 lines)
  3. `phase2-next-2026-11-11/C4-dime-reanchor/c4_dime_situation_table.csv` (listed 1,505 / actual 1,488; Δ17 bytes = 17 lines)
- **Folder CHECKSUMS**: C1 5/6 (not 6/6), C2 4/4 (clean), C3 4/5 (not 5/5), C4 4/5 (not 5/5)
- **Subfolder CHECKSUMS**: `corrections/` 28/28 OK, `phase2-real/` 14/14 OK
- **CHECKSUMS format is three-field** (`<sha256>  <size>  <path>`) — plain `sha256sum -c CHECKSUMS.txt` fails on ALL 72 lines with "No such file or directory" (7 warning lines). The documented verify command must parse the three-field format to reproduce the totals. This confirms Inkling's format finding.

### Matches prior reviews
MUSE (council/muse `9197255b`): 69/72, mechanism proven. VLOC (`34bc98ca`): 69/72 on pushed bytes via git archive. Inkling (`064ac358`, `a64125dc`): 69/72 on all three pushed copies. Pickle (`b0cceaa5`): 69/72 on git blobs and git archive. DS (`10d517b3`): 69/72 on git archive with size-delta proof. VL's correction (`1deb704e`): withdraws 72/72, confirms 69/72 on committed blobs.

### Open items (per MUSE Part A)
1. CSV writers must emit LF (`newline=''` / `lineterminator='\n'`)
2. `make_checksums.py` must re-run on shipped bytes after last byte-changing step
3. Durable fix: add `*.csv -text` to `.gitattributes` (Inkling's option 1, preferred)
4. CHECKSUMS format: either adopt two-field sha256sum format so `sha256sum -c` works, or document the exact three-field verify command
5. REV 4 note must correct the REV 3 quoted 72 and the "structurally impossible" claim

### Open items (per MUSE Part D — P-341 carry, 30-min job)
Five Ledger corrections still not landed in any delivery:
1. Re-run Appendix A: FB>RB 3.30, FB>TE 4.74, C>DT 9.12, C>OG 5.13, OLB>ILB 6.84, OLB>SS 8.12, OLB>FS 11.74, TE>FS 13.64 — note FB>TE and OLB>FS exact on corrected numbers
2. Note FB tier sensitivity to E (band straddles cut at 4.0)
3. Ship the arithmetic-check script
4. Fix P-007 citation (cinematic is P-212/P-213)
5. Label "70% transfers" / "80% at 20%" as estimates

### Open item (per MUSE addendum B.6 — C2 D4 field fix)
`c2_lab_and_validation.py:196` field `dispersion_matching_overstatement_ratio` is NOT D4 (it's a drive-count R²). DS recomputed real D4 from P-344 `team_game_summary_2016-2025.csv`:
- Team-season dispersion matching: ×1.193 (+19.3%)
- Game-level dispersion matching: ×2.82 (+182%)
- Delivered field: 1.0024 (not D4)
Fix: relabel or replace with between-team D4 numbers; report ANOVA cross-check or say why not.

### Bottom line
P-346 substance is REVIEWED (9 seats: 3 ok + 6 improved). The checksum confirmation pass (Part A) is owed — one re-review confirming 72/72 on pushed bytes after the REV 4 fix. Part D (P-341) and B.6 (C2 D4) are separate owed items. This filing confirms the current state (69/72, three-field format broken) and lists the open items for the next build.

## Labels
VERIFIED: 69/72 on pushed bytes via git archive extraction; three-field format parsing failure; size deltas = line counts = CRLF→LF conversion; all prior review counts confirmed.
INFERRED: Fix requires CSV writer change + re-run + durable gitattributes change + format fix.
REPORTED: Part D (P-341 corrections not landed anywhere checked), B.6 (C2 D4 mislabel from DS re-run).

---END---