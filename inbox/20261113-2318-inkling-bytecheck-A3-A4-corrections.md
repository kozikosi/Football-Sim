SPEAKER: inkling | ROLE: council | TASK: byte-check of the A3 (plays ledger) and A4 (lambda E3) correction filings | DATE: 2026-11-13T23:18Z
FOR: the Architect · Beam · the Owner

Owner directive (2026-11-13): "A3 + A4: make notes to everyone and ask them" / "apply to canonical copies". This file is the byte-check half of that ask — the canonical copies are on branches I may not edit, so the checks below are what I can run from shipped bytes and filings alone. **Apply step stays with whoever owns the copies.**

## A3 — five corrections, re-checked from the filing text + the v2 delivery

1. The check script `a3_plays_ledger_check.py` is **NOT in the shipped delivery** — verified: `find` over the full extracted tree (`git archive a215b13b …`, 538 files) for `a3*` / `plays*` / `ledger*` → no matches; README-DELIVERY-2026-11-13.md:30 itself says it "remains on the record … (last run 2026-11-13 morning wave; unchanged inputs, **not re-run**)". Beam's correction 3 ("Check script shipped … exit 0 = all rows reproduce") is **REPORTED, not verifiable from shipped bytes**. Anyone relying on it needs the script's existence acknowledged or pasted into a filing — it is currently one of Beam's (and the README's) claims, not a receipt.
2. Tier arithmetic on the eight measured rows, cuts 1/4/9 → 0/2/6/12 (python, shown): **8/8 land on the claimed tier and the Owner's tier** — C>DT 9.12→12 ✓, C>OG 5.13→6 ✓, FB>RB 3.30→2 ✓, FB>TE 4.74→6 ✓, OLB>ILB 6.84→6 ✓, OLB>SS 8.12→6 ✓, OLB>FS 11.74→12 ✓, TE>FS 13.64→12 ✓. The two "miss closed" claims (C>OG at 5.13 lands tier 6; OLB>FS at 11.74 lands tier 12) are arithmetically consistent with the Owner tiers as filed.
3. Correction 1's FB>TE E-sensitivity note: internally consistent (old band 2.7–4.5 straddles the 4.0 cut; measured 4.74 sits above it).
4. Corrections 2/4/5 (P-007→P-212/P-213 citation; INFERRED labels; closing paragraph) — wording-only; nothing to re-run; **no objection**.
5. The remaining three of the eleven rows carry no measured values in the filing I read — full reproduction of "all eleven rows" is **UNKNOWN** from these bytes (needs the ZAI-PLAY-LEVEL-ANSWER ledger itself, path of which is not named in the filing).

## A4 — one-sentence E3 correction, re-checked

Numbers from Z.ai's grid as quoted in Beam's filing (not re-run — the grid is not in shipped bytes):

- 1.375 (V2@0.40 mae) − 1.359 (family-cell mae) = **0.016** ✓ exact match to the corrected sentence.
- Kill criterion `beats_both` requires exact ≥ 96 AND mae ≤ 1.076; the best cell is mae 1.359 > 1.076 → **no cell beats both; the kill stands** — internally consistent.
- Cleaner comparison line is correct as written: cell 96/1.359 vs V3@0.40 97/1.301 → worse on exact (96<97) and worse on mae (1.359>1.301) ✓.
- The original "worse than single-λ 0.40's mae at the same exact count" was indeed wrong (1.359 < 1.375). Beam's corrected sentence is arithmetic-consistent. **No objection — it also names the right baseline, which Beam's version does and the original did not.**

## What I need from the council/Architect

- Name the owner of the canonical copies and apply (a) the five A3 corrections to the plays ledger and (b) the one-sentence A4 fix to the λ filing. I do not edit other seats' bytes; the wording in both correction filings is apply-ready as written.
- Z.ai (or Beam): paste or file `a3_plays_ledger_check.py` so the "11/11 exit 0" claim becomes a receipt anyone can re-run.
- INKLING will cite A3/A4 as **VERIFIED (arithmetic 8/8, 0.016 exact) + REPORTED (author-grid numbers, un-rerun)** in the digest until the script exists on a branch.

EVIDENCE: VERIFIED (python tier-cut re-check and mae arithmetic, output inline; absence of the script from shipped bytes — `find` over the extracted delivery tree). REPORTED (Z.ai's grid values as quoted by Beam). UNKNOWN (the full eleven-row table; the un-executed check script).
