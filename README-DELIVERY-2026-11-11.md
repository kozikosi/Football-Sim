# Z.ai delivery — merge corrections + Phase 2 real + P-345 filings (one batch, one zip)

**From:** Z.ai (seat ZAI, High Councillor) · **Date:** 2026-11-11 · **Batch:** the Owner's two-part prompt (Part A corrections / Part B Phase 2 real) + the P-345 innovation round
**Status:** ALL PARTS COMPLETE — no blockers. Nothing was pushed (sandbox rule); this zip is the delivery. Unpushed: everything, by design.

## What is in this zip

| path | what | receipts inside |
|---|---|---|
| `corrections/merge-ledger-followups-2026-11-11/` | **Part A** — the corrected REV 2 of the P-340/P-341 delivery (supersedes `ledger-phase2/zai/deliveries/merge-ledger-followups-2026-11-11/` on council/glyph `f262061c`). Seven fixes: the Owner's six + the review's correction 2 (snap counts ARE public — landed because Part B runs on that release). Every fix quotes the review's verdict line inline. | `CORRECTIONS-NOTE-2026-11-11.md` (fix-by-fix evidence), `CHECKSUMS.txt` (recomputed, **27/27 verified**), `logs/og2_exact_sensitivity.log` (the OG2 nit, re-run and VERIFIED: V3 97/97 mae 1.31, V2 96, blast radius = C>OG only), regenerated `merge_results.json`/log (diff vs shipped = exactly the two renamed labels), regenerated `phase2_results.json` (self-test still 30/30 after the load_snaps defect fix) |
| `phase2-real-2026-11-11/` | **Part B** — the Phase 2 harness run on the real P-344 data (all 30 files fetched from the manifest URLs and sha256-verified before use). | `PHASE2-REAL-REPORT-2026-11-11.md` (B1/B2/B3 + the at-a-glance staged-vs-real table + the regime answer), `LEDGER-PHASE1-ADDENDUM-2026-11-11.md`, `phase2_real.py` + `report_tables.py` (deterministic, re-run byte-identically), `run_log_reg.txt`/`run_log_all.txt`, `phase2_real_results_reg.json` + `_all.json`, `spot_table_staged_vs_real.csv`, `b2_gravity_index.json`, `b2_most_targeted_wr.json`, `p345_lambda_conditioning.json`, `fetch_log.txt` (30/30 OK), `CHECKSUMS.txt` |
| `inbox/20261111-1621-zai-P-345-gravity-first-measurement.md` | **P-345 filing** (question 4) — gravity's first measurement from the public files: top-WR deep-target share stable at 30.4–33.5% for a decade; the event-schema fields; what falsifies it. | the measurement receipts live in the Phase 2 delivery |
| `inbox/20261111-1638-zai-P-345-lambda-identification-by-conditioning.md` | **P-345 filing** (question 1) — λ identification by conditional moments: match Var(points \| drives=N); real-data receipt (corr(drives, points) = 0.074; conditional SDs 7.64–8.28 vs 8.47 unconditional); the held-out protocol; falsifiable in one afternoon on public data. | `p345_lambda_conditioning.json` |

## The headline numbers (all VERIFIED, receipts re-run)

- **Part A:** every math number byte-identical before/after the corrections; the only diffs are the two renamed labels (`slotweighted` mode/key, log header) — MUSE's review landed without touching the math.
- **Part B (B1):** real DIME share **0.094–0.159 by season, mean 0.1263** — the Ledger's 0.0694 is below every real season; the engine's 0.15 is the real 2018–2021 share. Settle path 1 (re-anchor to the measurement) is the data's answer.
- **Part B (B2):** real top-WR deep targets **2.0–2.2/team-game** (staged denominator 1.75 — real-order); real WR1 targets **7.0–7.7/tg** vs staged ~12.4 (the engine over-concentrates WR1 volume); real double-team flags are not public — the missing data is named exactly.
- **Part B (B3):** real FB share **0.1426 → 0.0814** (decade mean 0.098; staged 0.1265 = real ~2017); **the FB acceptance band (E < 0.2228) holds in all ten real seasons** — FB = scarcity confirmed and the Owner's FB>RB = 2 is era-robust.
- **Part B (spots):** **1/30 within ±3 pts pooled** — the engine stages an ideal-healthy game (every every-down seat at 1.0 vs real 0.40–0.88) and leans 21/22 personnel vs the real 11/12; no rules-regime jump anywhere (the regimes touch kickoffs/OT, not package seats).
- **Machine:** two real harness defects found and fixed by the real data (load_snaps last-row-wins; seat-exclusion selection bias) — documented as fixes 8/9; the self-test is still 30/30; the real adapter is equivalence-checked against the shipped mapper (max diff 0.000000).

## Oracle discipline

All merge numbers are against the live 99-rule table (delivery copy `flex-99-live.json`, byte-identical to `architect/engine-and-seats:tools/mathlab/flex.json`; 99 rules — verified this session). The Phase 1 baseline receipt now cites the **file** hash of `staged.json` (`0f749ea5…`; the old `13bfe7eb…` labelled canonical-form) — verified by direct hash this session.

## Read order for the reviewer

1. this README → 2. `corrections/.../CORRECTIONS-NOTE-2026-11-11.md` → 3. `phase2-real-2026-11-11/PHASE2-REAL-REPORT-2026-11-11.md` → 4. `LEDGER-PHASE1-ADDENDUM` → 5. the two P-345 filings.

— Z.ai · read → verify → build → verify → zip. The corrections landed; the real data spoke; the ideas carry receipts.
