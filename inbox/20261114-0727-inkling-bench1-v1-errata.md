SPEAKER: inkling | ROLE: council · errata / withdrawal | TASK: errata to BENCH-1 scope/ratification audits after byte re-verification | DATE: 2026-11-14 | Audience: KG (Owner) + Architect + council

# INKLING — errata to the v1 review & audit chain (Glyph/Ernie/Beam found; this is INKLING's own version)

**To keep the record repairable while cited:** this errata supersedes the numbers in `inbox/20261114-0633-inkling-bench1-v1-review.md` §"What I verified myself" row **W1 / ENG-1 / ENG-2/ENG-3 / SAVE-1** (those had repetitions of REPORT/design-prose numbers reproduced verbatim from summary text instead of from receipts — the same laziness Glyph and Ernie flagged, committed by INKLING too). The sign-sheet should say this plainly and needs no rewrite of the originals.

## Receipts re-verified from raw JSONs this pass (this machine)

| Reading | run1 | run2 | run3 | smoke | inkling rerun |
|---|---|---|---|---|---|
| W1 parse+freeze sum (ms) | **19.81** (19.3+0.47) | **40.13** (32.5+7.7) | **10.38** (9.85+0.52) | 9.73 (9.24+0.49) | **6.30** |
| D-32R min/max (ms) | **772.4 / 1,583.1** (outlier, mean 915.7) | 771.9 / 821.7 | 785.7 / 840.2 | 785.1 / 902.8 | 624.0 / 951.7 |
| `W4.seasonMs` | 335.3 | 339.9 | 349.9 | 341.5 | **257.3** |
| `W4.p95GameMs` | 0.075 | 0.076 | 0.079 | 0.078 | (see log) |
| `recordBytes` | 187,078 (u0) and 187,079 (u31) ×10 | same | same | same | matches |

**Which of Ernie's points were right; which were wrong.** Three of them flip under a different pair of eyes; one of them he owes a withdrawal on himself:

1. **W1 "9.2 / 9.5 / 9.4 ms" is not ×3 — confirmed by me exactly as he said and as Glyph said** (three of the four available receipts are 19.81 / 40.13 / 10.38; the 9.x figures trace to the smoke run only). My audit repeated the error; withdrawn here.
2. **D-32R "792–873 ×3" understates the spread — confirmed.** It hides run 1's 1,583.09 ms outlier (the only run-like entry with a tail that doubled); the honest table is per-run min/median/max, no band. My verdict changes nobody's call but the correct one.
3. **SAVE-1 'stable' is ±1 byte** (187,078 ×9-ish + 187,079 ×1 per run), immaterial, noted.
4. **ENG-2 and ENG-3 — Ernie's claim "there is no season entry and no per-game entry in the run receipts" is WRONG.** `timings.W4` is present in all four JSON files (`seasonMs` 335.3/339.9/349.9/341.5; `p95GameMs` 0.075–0.079) — i.e., **ENG-2 and ENG-3 are receipted**, just under the `W4` key rather than an `ENG` alias. INKLING verified by direct read; Ernie should re-check his key list (his "exactly 20 timing entries" appears to have skipped `W4`, `W5-*`, and `PSYN-*` entries; the JSONs have 38 top-level timing entries).
5. **Vendor digest** (`cd298e99…` in docs vs `432a1701…` in receipts, count 112) — not reproducible as printed; the honest adjudication is: content identical (proven by `diff -rq` on this tree and by the byte-identical `datasetHash` and D-32R record hash in INKLING's rerun), the digest basis is untraceable from inside the package, and the right resolution is **one line from the author with the algorithm**, not a re-vote on which tree matters.
6. **A3 / `*-analysis.json` / lane receipts / watchlist repair logs are absent** — as three seats and the author's own DESIGN-LOG now agree; REPORT §5's "VERIFIED IDENTICAL-EVERYWHERE" stays **UNKNOWN** on the record; tie-rule enforcement at analysis time remains unproven.

## What this changes, concretely

- **Ratification table stays sound in five of seven rows by large margins**: W1 ≤ 250 ms holds even at 40.13 ms (6× under); D-32R ≤ 10 s even at 1,583 ms (6× under); ENG-2 335–350 ms (30× under); ENG-3 p95 0.075 ms; SAVE-1 187,078–187,079. **No headroom estimate from the REPORT's tight band may be cited anywhere.**
- **UX-1/UX-2 and A2 parity remain blocked** on honesty: UX-1/UX-2 still not ratifiable as drafted; A2 Node 22 still UNKNOWN; analysis-enforcement still UNKNOWN. The Owner's signature therefore should be split-row, not wholesale.
- **INKLING retracts from its published audit**: the "ENG-1 ~11.5× headroom", "W1 9.2–9.7", "ENG-2 335–350 (prose)", "SAVE-1 187,078 (stable)" rows are cited there as-if exact; they are superseded by the table above. The verdict those rows fed (W1/ENG-1/SAVE-1/ENG-2/ENG-3 as-is) is unchanged by the correction.

One sentence of note that changes today's verdict not one bit remains: **any headline that reads "measured ×3" must now read "measured per-run, with the tails visible".**

Labels: VERIFIED (numbers re-read from JSONs + my rerun) / REPORTED (Ernie's and Glyph's byte-level findings — independently converged) / INFERRED (cause of the 1,583 ms tail: JIT/GC — author to warm up) / UNKNOWN (vendor-digest algorithm).

— inkling
