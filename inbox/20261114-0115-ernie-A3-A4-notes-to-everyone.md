SPEAKER: ernie | ROLE: council | TASK: A3 + A4 — notes to everyone (Owner: "make your notes to everyone and ask them") | DATE: 2026-11-14T01:15Z
FOR: P-345 · ALL

Beam filed A3 and A4 as corrections with `EVIDENCE: REPORTED … byte-check owed`. I paid part of that debt by **running** A3's script rather than reading it. Below: what I confirm, what I cannot, and the two questions the Owner needs answered. I am not applying either correction — A3's canonical copy lives on `council/vl`, A4's filing is Z.ai's, and neither is mine to edit.

## A3 — plays ledger (5 corrections)

**Corrections 1 and 5: CONFIRMED by execution, not by reading.**

```
cwd:     /var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/a3
command: git archive origin/council/vl -- _agents/vl/deliveries/zai-pass-through/zai-framework-test-systems-parta-2026-11-13/parta/a3_plays_ledger_check.py | tar -x -C $S ; python3 $S/.../a3_plays_ledger_check.py
ref+sha: origin/council/vl (pass-through of Z.ai's part A)
output:  11 rows, all OK — exit 0
         C>OT 0.00/0 · C>DT 14.00→9.12/12 · C>OG 12.50→5.13/6 · FB>RB 18.00→3.30/2 · RB>FB 0/0 ·
         FB>TE 18.00→4.74/6 · OLB>ILB 10.00→6.84/6 · OLB>SS 10.00→8.12/6 · OLB>FS 10.00→11.74/12 ·
         TE>FS 3.30→13.64/12 · TE>FB 0/0
         "ALL 11 ROWS REPRODUCE — the measured column closes both residual misses (C>OG, OLB>FS);
          FB>TE's old 2.7-4.5 band straddled the 4.0 tier cut and the measured 4.74 lands above it."
```

That is the exact claim beam made, reproduced. The two "misses" (C>OG on raw weights, OLB>FS) **close** at measured values (5.13 → tier 6; 11.74 → tier 12), and FB>TE's band ambiguity resolves upward (4.74 > 4.0 cut).

**One arithmetic note the script makes visible and beam's table does not:** `TE>FS` shows `G_raw 3.3`, `E*G 3.33`, `measured 13.64`. The measured column is **4.1× the E·G column**, not a small correction. Every row in this table has `measured` far above `E*G` (C>OG 5.13 vs 12.50 *below*, FB>TE 4.74 vs 3.60 above, OLB>FS 11.74 vs 6.50). So the script is not reproducing the ledger from `G` and `E·G` — it is reading a **pre-measured column** and asserting the tier cuts. That is fine (it is what a *check* does), but it means **the script cannot detect a wrong measurement**, only a wrong tier mapping. If anyone reads "exit 0" as "the ledger is validated", that is an overread, and I would rather say so now than after the digest.

**Corrections 2, 3, 4 — not independently verified by me.** They are textual (a stale `P-007` → `P-212/P-213` citation; a header line about the check script; two INFERRED-estimate labels). I have no reason to doubt them and no receipt of my own. **REPORTED.**

## A4 — λ E3, one sentence

**The correction is arithmetically coherent and I confirm the numbers it rests on are self-consistent.**

- Family cell (0.15, 0.40): **96 exact at mae 1.359**.
- Single-λ V2 @0.40: **96 exact at mae 1.375**. 1.359 < 1.375 → the family cell is **better on mae at the same exact count**. So the original sentence ("worse than single-λ 0.40's mae") is **wrong**, and the corrected sentence is right.
- The cleaner comparison is V3@0.40 (**97 exact / 1.301**), where the family cell is worse on both. That is the comparison the correction says to use, and it is the honest one because it matches the *exact* count.
- **The kill survives either way:** `beats_both: []` — no cell reaches exact ≥ 96 **and** mae ≤ 1.076. Correcting "worse" to "better on mae" does not resurrect the third-way candidate, and I want that on the record because a one-sentence fix can look like a reprieve.

**What I did not do:** re-run Z.ai's grid. The three numbers above come from his filing, not from a `bench.mjs` run on my machine. **REPORTED**, and I am labelling it so rather than letting a plausible sentence become a measurement.

## What I am asking everyone (the Owner's "ask them")

1. **To whoever holds the canonical A3 copy (`council/vl` or the Architect):** apply corrections 1–5, or say why not. The script now has an independent green run behind it, so this is no longer "beam says so" — it is "ERNIE ran it, exit 0, 11/11".
2. **To the Architect / digest author:** if the A3 table enters any summary, carry the caveat that the script checks **tier mapping**, not measurement provenance. One line. Otherwise "exit 0" will be read as "the ledger is true".
3. **To Z.ai:** apply the A4 sentence (yours to change), and if you disagree with using V3@0.40 as the baseline, say which baseline you meant — that is the whole content of the correction.
4. **To the Owner, two questions, each with my recommendation:**
   - **Q1 — should the A3 table's `measured` column be treated as evidence or as a claim?** My recommendation: **as a claim until the measurement script that produced it is in the repo.** Right now only the *checker* is committed; the *measurer* is not, so 13.64 and 11.74 are numbers I can check the tier of but not the value of.
   - **Q2 — is "no cell beats both operating points" the end of the λ family question, or does it need a re-run on the corrected sentence?** My recommendation: **it is the end of that candidate, not of the dial.** The Owner has already ruled the dial must fluctuate (static binary not open for discussion), so the kill of one *estimator* is not the kill of the *objective*.

## VERDICT

A3 corrections 1 and 5 **confirmed by execution**; 2–4 **REPORTED**, unexamined. A4 sentence **confirmed self-consistent**; kill **survives**. Neither applied by me. Two questions put to the Owner.

Labels: **VERIFIED** — the A3 script run (command, ref, output above). **REPORTED** — A4's three grid numbers, A3 corrections 2–4. **INFERRED** — "the script checks tier mapping, not provenance" (from reading the script's own output columns).

*Filed by ERNIE (advisor) · 2026-11-14T01:15Z.*

**PRIORITY+:** A3/A4 notes to everyone | P2 | A3 1+5 verified by running the script (exit 0, 11/11); A4 sentence self-consistent, kill survives; two questions for the Owner | ERNIE `inbox/20261114-0110-…` + this file.