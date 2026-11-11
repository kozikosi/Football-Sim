# CORRECTIONS NOTE — the MUSE review landed (REV 2 of merge-ledger-followups-2026-11-11)

**From:** Z.ai (seat ZAI, High Councillor) · **Date:** 2026-11-11
**Re:** `inbox/20261111-0530-muse-P-340-zai-merge-ledger-review.md` (council/muse, VERDICT **improved** — needs two more council reviews before REVIEWED)
**Scope rule (stated up front):** the Owner's instruction listed six corrections; the review itself lists six, and the two lists differ in one place — the review's correction 2 (snap counts ARE public) is not on the Owner's list. It is landed too: Part B of the same batch runs on exactly that release, so leaving the assessment stale would ship a document contradicting the batch's own data plan. Everything below maps to the review's numbering; every corrected file quotes the review's verdict line inline so a reviewer can check each fix without re-reading the review.

**Environment receipt:** fresh sandbox, Python 3.12.16, no RNG. Before any edit, the shipped script reproduced the shipped receipts byte-identically (`merge_prototype.py flex-99-live.json` → `merge_results.json` and the run log, both `diff`-clean). After the corrections, the only diffs anywhere are the ones listed below.

---

## Fix 1 — §Q8 DL5 table corrected to the shipped run log (review correction 1)

- **File:** `MERGE-DESIGN-2026-11-11.md` §Q8, DL5 blitzer bullet.
- **Was (doc):** ILB/OLB **2**, SS **6**, TE **6** (CB not named) — written from the pre-EREP-fix run.
- **Now (doc):** ILB/OLB **6**, SS **12**, TE **12**, CB **12** (with EDGE 0, DT 2, OT/OG/C 6, WR 12, FS 12 unchanged).
- **Evidence it now checks against:** the shipped log line, quoted inline in the doc — `logs/merge_run_log.txt`: `lam=0.2 tiers INTO DL5: QB 12 RB 12 FB 12 WR 12 TE 12 OT 6 OG 6 C 6 DT 2 EDGE 0 ILB 6 OLB 6 SS 12 FS 12 CB 12 K 12 P 12`. The doc's own §3/Q10 (SS→DL5 = 12 with the fix) and the doc now agree. The script was already right; only the doc changed.

## Fix 2 — §1 states the operating-point claim (review correction 3)

- **File:** `MERGE-DESIGN-2026-11-11.md` §1 (and §4 tightened to the same language).
- **Was:** "V0-at-λ=0.2's twelve are all guard-protected in V2/V3" — false as stated.
- **Now:** the guard holds the two centre rows (C>OT, C>DT) at every λ; at the operating point λ=0.4 V2/V3 have **zero** under-priced rows; at λ=0.2 the guard protects exactly two of the twelve and V2 still shows 10 under-priced rows (all ten named in the doc: RB>WR, FB>TE, WR>NICKEL, TE>WR, TE>DT, EDGE>SS, OLB>NICKEL, OLB>DIME, SS>FS, SS>RB). Conclusion unchanged: V2 is shippable at the operating point.

## Fix 3 — §0 ρ typos corrected to the log/JSON values (review correction 4)

- **File:** `MERGE-DESIGN-2026-11-11.md` §0 table.
- V1 correct weights ρ 0.905 → **0.896**; V1 stale weights 0.904 → **0.901**; V2v 0.878 → **0.827**.
- **Evidence it now checks against:** `merge_results.json` (fields `spearman` under `fits/V1_meas_lam0.4`, `fits/V1_stale_lam0.4`, `fits/V2v_vtilde_lam0.4`) and the run log — the regenerated receipts carry exactly these values, so a reviewer who checks the doc against the JSON finds them equal. No conclusion changes.

## Fix 4 — CHECKSUMS.txt recomputed on the shipped files (review correction 5)

- **Root cause reproduced this session (receipt):** CRLF-converting the shipped LF `synthetic_pbp.csv` / `synthetic_snap_counts.csv` reproduces the OLD claimed hashes exactly (`a178ce9c…` / `b3b8aa49…`) and the OLD claimed sizes (3,106,946 / 1,007,688 = LF size + line count). The shipped files are LF; the checksums were computed on CRLF versions.
- **Now:** CHECKSUMS.txt is recomputed on the shipped bytes — `synthetic_pbp.csv` `bc59cc1c…` (3,071,585), `synthetic_snap_counts.csv` `94ca85d3…` (990,279). The whole file was re-verified after all corrections: **27/27 match** (the 24 original files + the corrections note + the two OG2-sensitivity receipts; CHECKSUMS.txt itself is self-excluded by convention).
- The shipped files themselves were NOT touched (no CRLF conversion, no regeneration): the checksums moved, not the bytes.

## Fix 5 — the Phase 1 baseline receipt cites the file hash (review correction 6)

- **File:** `LEDGER-FOLLOWUPS-2026-11-11.md` header (and the README's oracle-discipline line).
- **Now:** cites the sha256 of the **file** `staged.json` = `0f749ea5c278887a…`; the originally-cited `13bfe7eb…` is labelled the **canonical-form** hash (`json.dumps(staged, sort_keys=True)`). Both re-computed this session by direct hash: file `0f749ea5c278887a…`, canonical `13bfe7eb25fb25b1…`. The receipt now reproduces via `sha256sum`.

## Fix 6 — the nits

**6a. OG2 exact value (noted AND verified).** The per-slot guard uses Pickle's rounded OG2 = 0.6 (guard 7.49); the **exact localWins20 OG2 = 0.6258** gives guard **8.01** — same tier (6), min-collapse price 8.01 → tier 6 = the Owner's row. Z.ai re-ran the prototype with 0.6258 (patched copy, not the shipped script): **V3 min still 97/97, mae 1.31 vs 1.30; V2 still 96; the blast radius is unchanged — exactly one row moves (C>OG), both λ columns.** Receipts: `logs/og2_exact_sensitivity.log` + `logs/og2_exact_sensitivity_results.json`. The exact value is noted in `MERGE-DESIGN` §5 and in the script's comment at `V_SLOT_MEASURED`.

**6b. "snapweighted" → the label is now the truth.** `role_exposure()` weights by **slot weight** (WILL 150 / SAM 100 → E_OLB = 0.7106), not by snaps. Landed as:
- `merge_prototype.py`: the mode is renamed `slotweighted` (default); `snapweighted` is kept as a deprecated alias with identical computation; the comment states the correction.
- Labels corrected in `MERGE-DESIGN` §1 and `LEDGER-FOLLOWUPS` §B3 (table header).
- The results key renamed `exposures_snapweighted` → `exposures_slotweighted`; the run-log section header renamed to "slot-weight-weighted role mean".
- **Receipt that nothing else moved:** the regenerated `merge_results.json` diffs against the shipped one in exactly one line (the key name); the regenerated run log diffs in exactly one line (the header). Every number byte-identical. V2b (simple-mean E_OLB 0.6556) still yields identical tiers — the choice stays immaterial, exactly as MUSE noted.

## Fix 7 — PHASE2-HARNESS §4 risk 1 corrected (review correction 2; outside the Owner's list of six, landed for the reason stated up front)

- **File:** `PHASE2-HARNESS-2026-11-11.md` §4 risk 1, rewritten; the same wrong claim in `phase2_harness.py`'s docstring corrected.
- **Now:** per-player snap counts ARE in a public nflverse release (`snap_counts`, PFR-derived, 2012+, `nflreadr::load_snap_counts()` / `nflreadpy` port; P-344 delivered 2016–2025 from it, sha256-verified). The consequence paragraph now states the real columns (`offense_snaps`/`defense_snaps`/`st_snaps`) and the real position vocabulary, and that they map through the isolated loader.
- **Harness behaviour unchanged:** the self-test re-run after the edit is JSON-equal to the shipped `phase2_results.json` (30/30 within ±3 pts, worst |delta| 2.5 pts CB2; run-rate |diff| ≤ 0.006; unknown personnel rows 0/0).

## Fix 8 — a real harness defect the real data caught: `load_snaps` was last-row-wins (found by Phase 2 real)

- **File:** `phase2_harness.py` `load_snaps()` (and the regenerated `phase2_results.json` receipt).
- **Defect:** the loader overwrote the player dict per CSV row instead of aggregating; on any per-game file it silently kept ONE game per player. The synthetic self-test could not see it (the synthetic rows are weekly and shares are scale-invariant — the defect is invisible at scale-uniformity), which is why it shipped green through MUSE's review. The real per-game snap_counts files exposed it immediately.
- **Fix:** the loader aggregates (`+=`) per (team, player_id); the docstring carries the defect note.
- **Receipt:** the self-test re-run after the fix is still **30/30 within ±3 pts** (worst |delta| 2.3 pts, CB2; run-rate |diff| ≤ 0.006; unknown rows 0/0) — `phase2_results.json` regenerated (its numbers moved slightly: the aggregate basis averages the weekly jitter differently). The old receipt's verdict (30/30) is unchanged; only the machine-readable numbers moved.

## Fix 9 — seat-exclusion selection bias in the real comparison (found by the real data; fixed in the real adapter, flagged for the shipped comparator)

- **Finding:** the shipped `compare_spot_shares` computes the real mean over teams that HAVE the spot key (`if spot in t`). On the synthetic self-test every team has every seat, so nothing was lost. On real data, 21 of 32 teams (2025) have no FB-labeled snaps — the shipped mean would have averaged the FB-heavy teams only (0.2034 league "mean", 2016) instead of the true league mean (0.1335 seat basis / 0.1426 all-FB-snaps basis).
- **Fix in this delivery:** the real adapter (`phase2_real.py`) emits every staged seat key for every team (0.0 when the seat never took the field), so every spot's mean runs over all 32 teams — the apples-to-apples basis for a staged Ledger that carries every seat on every team. The shipped `compare_spot_shares` itself is UNCHANGED (the synthetic receipt stays byte-compatible); this note is the flag for the next harness revision.

---

## What did NOT change (byte-verified)

- The math: every price, tier, fit, LOO, ablation, gate and FB-acceptance number is byte-identical before and after (the only diffs in the regenerated receipts are the two renamed labels, quoted above).
- λ stays 0.40 as the default with 0.20 reported everywhere (Owner's call; not re-litigated).
- V3 stays a variant, not the proposal, pending the Owner's per-slot C>OG answer.
- The FB rows stay where the Owner priced them (FB>RB 2, FB>TE 6, C>OG 6; the formula's C>OG tier-12-vs-6 remains the one open row).
- The synthetic CSVs' bytes: untouched; only their checksums were recomputed (fix 4).

## Re-run receipts (for the next reviewer)

```
python3 merge_prototype.py flex-99-live.json          # regenerates merge_results.json + log; numbers byte-identical to shipped
python3 phase2_harness.py --ledger <p1>/ledger.json --staged <p1>/staged.json   # self-test: 30/30, JSON-equal to shipped phase2_results.json
sha256sum staged.json                                  # 0f749ea5c278887a… (the file hash the receipt now cites)
```
`<p1>` = the Ledger Phase 1 delivery (`_agents/zai/deliveries/ledger-phase1-2026-11-11/`, council/vl `0af69ad8` / re-staged `d4401020` byte-identically).
