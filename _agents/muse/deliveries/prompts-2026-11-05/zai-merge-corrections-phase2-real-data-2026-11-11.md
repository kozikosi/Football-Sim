# Z.ai — merge corrections + Phase 2 on the real data (one batch)

This is one prompt with two parts. They are independent — if one part blocks, finish the other, ship it all in the single zip, and explain the blocker. Do not respond until ALL parts are complete or blocked. (Batch rule, standing: you cannot push, so every response costs the Owner a publish step. Complete all work before responding, single zip, CHECKSUMS.txt with the algorithm LABELLED sha256.)

## Context — where your last delivery stands

Your merge + Ledger follow-ups + Phase 2 harness delivery (council/glyph `f262061c`) was reviewed by MUSE (`inbox/20261111-0530-muse-P-340-zai-merge-ledger-review.md` on council/muse, VERDICT **improved** — needs two more council reviews). VL re-staged the same delivery byte-identically on council/vl (`d4401020`; MUSE hash-checked four files) — no new work, the same review covers it. Ledger Phase 1 is now REVIEWED (MUSE ok + Super ok + VLOC improved). The merge itself is real: V2 96/97 with zero under-priced rows, LOO 1.16, FB from a measured exposure.

## Part A — Land the corrections from the review

Six corrections, all in the documents, not the math:

1. **Q8 DL5 table in MERGE-DESIGN is stale.** It was written from the pre-EREP-fix run (ILB/OLB 2, SS 6, TE 6, CB 6). The shipped log says ILB/OLB **6**, SS **12**, TE **12**, CB **12** — update the §Q8 table to the shipped log's numbers. (The script is right; your own §3 says SS→DL5 is 12.)
2. **§1 overstates the guard's protection at λ=0.2.** "V0-at-λ=0.2's twelve are all guard-protected in V2/V3" is false: V2 at λ=0.2 still has 10 under-priced rows (JSON: `V2_exp_lam0.2` under = RB>WR, FB>TE, WR>NICKEL, TE>WR, TE>DT, EDGE>SS, OLB>NICKEL, OLB>DIME, SS>FS, SS>RB). The guard protects exactly two of the twelve at λ=0.2 — the centre rows. Reword to the operating-point claim (zero under-priced at λ=0.4).
3. **§0 ρ typos.** V1 correct weights: 0.905 → **0.896**. V1 stale: 0.904 → **0.901**. V2v: 0.878 → **0.827**. (Log and JSON agree; the doc doesn't.)
4. **CHECKSUMS.txt stale for the two synthetic CSVs.** The checksums were computed on CRLF versions; the shipped files are LF. Recompute on the shipped files.
5. **The 13bfe7eb baseline receipt cites the wrong hash.** It is the sha256 of the sorted-keys re-dump, not of `staged.json` (whose sha256 is `0f749ea5…`). Cite the file hash or label it canonical-form.
6. **Nits:** per-slot OG2 uses Pickle's rounded 0.6 (guard 7.49) vs exact 0.6258 (8.01) — same tier, note it; `role_exposure(mode="snapweighted")` weights by slot *weight*, not snaps — the label is the only thing wrong (V2b identical tiers).

Do not re-litigate λ: you ship 0.40 as the default with 0.20 reported everywhere, and the Owner rules with one constant — keep both reported. V3 stays a variant, not the proposal, until the Owner answers the per-slot C>OG question (does his 6 mean either guard spot or the cheaper one?).

## Part B — Phase 2 on the real data

The data is attached now. MUSE fetched it (P-344, council/muse `c7540b04`): `_agents/muse/deliveries/p-344-nflverse-phase1-2026-11-11/` — `manifest.json` has all 30 files with stable nflverse release URLs + sha256 (pbp, participation, snap counts, 2016–2025, 225 MB total), plus the team-game summaries and league means/SDs. Fetch the real files yourself from the manifest URLs and verify the hashes.

Run your Phase 2 harness (`phase2_harness.py`) on the **real** data — this replaces the synthetic self-test (which proved the machine, not the match). Report the real-vs-Ledger comparison per spot against the ±3-point tolerance, with the same receipts as Phase 1 (scripts + run logs + JSON, deterministic). The open questions it should close or sharpen:

- **DIME:** staged 0.0694 vs the engine's 0.15 — the live disagreement. Does the real snap data side with the Ledger, the engine, or neither?
- **FB share:** staged 0.1265 — what is the real FB play share, and does it still support scarcity?
- **WR1 trigger:** re-triggered 4.37 doubles/team-game on deep targets — what does the real double-team rate look like, and is the trigger still in the real 3–6 band?
- **Spot shares generally:** staged vs real, per spot, 2016–2025, with the per-season regime labels from the P-344 INDEX (2018 kickoff overhaul, 2021 17-game, 2024–25 dynamic kickoff).

Two caveats from the P-344 delivery, so they don't surprise you: (1) participation covers only ~93% of pbp plays in 2023–2025 (~7% have no participation row; 2016–2022 it is a superset) — restrict participation-dependent checks to 2016–2022, or handle the missing rows explicitly and say how; (2) snap_counts has no `season_type` column — derive it by joining `game_id` to the play-by-play. If a column the harness needs does not exist in the real release, report that — the harness gets fixed, and your report is what tells the council what to fix.

## Deliverable

Corrected reports (Part A) + the Phase 2 real-data run (Part B: scripts, logs, JSON results, and a short report per question) + CHECKSUMS.txt, sha256 labelled, in a single zip. If any part blocks (a download fails, a column is missing, a comparison cannot be run), ship the rest and explain the blocker — that is the only reason to respond with work outstanding.

## Innovate

Within either part: if the real data suggests a better exposure measure than the weight-weighted one, a sharper DIME settle path than the three the review named, a use for the per-season regime labels nobody has named, or a cleaner way to make the Ledger's disagreements legible — do it or note it as an `IDEA:`. The Owner has said he wants the best, most beautiful formula possible and does not care about the time and cost of the work — design for that, not for the fastest fit. A negative result with measurements (a DIME investigation that ends "the tables are wrong and here is by how much", a real-data comparison that disagrees with the Ledger and says why) counts as a successful attempt.
