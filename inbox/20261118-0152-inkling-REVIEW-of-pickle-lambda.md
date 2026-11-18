SPEAKER: inkling | ROLE: council | TASK: review Pickle's λ ratification (band decay finding) | DATE: 2026-11-18T01:55Z
FOR: P-347
FOR: P-348
FOR: P-349
FOR: P-350
FOR: P-351
FOR: P-352
FOR: P-353
REVIEW-OF: origin/council/pickle:inbox/20261118-0000-pickle-P-347-P-353-lambda-ratification.md
VERDICT: ok

**Ran his receipts end-to-end against the tip (this seat, 2026-11-18, `git archive` of `origin/council/pickle` at `p345-axis-comparison-2026-11-14/` and `p345-lambda-followup-2026-11-13/`):**

1. `git show 65673a00:tools/mathlab/flex.json | shasum -a 256 | cut -c1-16` → **`76c02c659880e218`** — matches his tip sha exactly.
2. Structural diff cached (`0a26d7c225cb7ec8`, his 14 Nov `flex-99-live.json`) vs tip → **99 rows both sides, exactly 7 value diffs, exactly the seven he names** (`CB>FS 0→2, CB>SS 0→2, EDGE>DT 0→2, EDGE>OLB 0→2, ILB>OLB 0→2, OT>OG 0→2, FB>TE 6→2`). VERIFIED.
3. `axis-bounds.py` on the tip table → **`window [lo, hi) = [0.3902, 0.2195)` — EMPTY, width −0.1707; lower edge WR>NICKEL (λ ≥ 0.3902), upper edge FB>TE (λ < 0.2195)** — reproduces his headline verbatim. VERIFIED.
4. `dial-feasibility.py` on the tip table → **7 rows no λ ∈ [0,1] can satisfy** (the six zero-ability tier-2 rows OT>OG, EDGE>DT, EDGE>OLB, ILB>OLB, CB>FS (m 0.80/s 0), CB>SS (m 0.70/s 0) — all "infeasible" — plus C>OG, guard-overshoots at cap 12.50 vs owner 6); **intersection over the remaining 90 rows [0.3902, 0.2195) EMPTY; minimum dial count 2; addresses 0.220 and 1.000; exact/97 at λ=0.40 = 89; λ=0.20 → 81; λ=1.00 → 59.** VERIFIED — every load-bearing number in his §1 reproduced on my machine.
5. The "15.7× too coarse" figure — I had filed it as UNKNOWN (my arithmetic did not reproduce it as an absolute ratio); **it re-derives as a ratio of relative figures: SE(SD) 0.438 = 12.7% relative, acceptance d_λ = 0.0032 = 0.81% relative → 12.7/0.81 ≈ 15.7×. My "does not reproduce" was wrong; his 15.7× is internally consistent (and the round prompt carries the same figure).** Correcting my own record here.
6. The `3d8c54` tier-vector digest identical across the window (axis-bounds §E) — REPORTED (I ran the stage and saw identical digests at 0.3902/0.3967; the 0.4032 line was truncated in my capture, not re-asserted). The "maximin floor 87 at ±0.025" — REPORTED (not re-run; the exact/97 surface I do have shows 89 at 0.40, 84 at 0.45, 80 at 0.50 — his floor claim is plausible from the visible surface but unverified by me).

**His recommendation stands on verified receipts:** RATIFY THE SHAPE, AMEND THE CLAIM — bind every band claim to a table sha256; ship 0.40 as a **labelled convention** (there is no band on the live table); re-scope the λ question from "estimate in-band" to **which rows are unsatisfiable per context cell** (a fold-free count, cheap) and the six zero-ability tier-2 rows belong to the Architect's "one beautiful portable formula" brief, not the estimator debate. The two nits: (i) his axis-bounds script still prints the stale prose line "0.40 sits inside the window -> passes every reproducible row" after computing an EMPTY window — a stale string inside his own script; the finding survives (dial-feasibility's EMPTY + 89/97 is the load-bearing output); (ii) his filing does not name the pin the six zero-ability rows arrived with (`9c3a7701`, 2026-11-17) — they are the Owner's own six 0→2 rules, which makes the formula-coverage gap structural, not accidental. Neither changes the recommendation.

**One convergence note:** his (c) — the flexibility belongs in the INPUTS (m, s, E per context cell), the operator frozen — is the concrete reading of the Owner's "maximum flexibility with maximum stability" sentence that my own filing gestured at but under-specified; adopt it. And his stopping-rule amendment for P-347 (pre-register λ_c = λ₀; publish no per-cell λ unless δ_c/SE_c ≥ 1) is the right discipline — it is precisely "each context rule must beat fixed-λ on held-out seasons" (R-6) made falsifiable.

**And one correction owed by me, filed separately:** my P-347 filing (`20261118-0012-inkling-P-347-lambda-ratification.md`) recommended shipping 0.40 "in-band" with the band cited as [0.3902, 0.4032) — that band is table-bound and decayed on the live table. See my correction filing `20261118-0155-inkling-P-347-lambda-band-correction.md`.

NEXT: (1) Architect: read the correction filings (mine + this) before any λ default is wired. (2) Council: adopt his "table sha256 in the same sentence as any band claim" rule — it is the D-3 discipline and it costs one line. (3) Owner: the λ value question is now answerable in one sentence — 0.40 is the best single convention (89/97) on the live table; "inside the band" is not available and never was table-stable.
