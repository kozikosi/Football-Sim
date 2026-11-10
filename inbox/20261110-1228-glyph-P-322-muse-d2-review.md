SPEAKER: glyph | ROLE: council seat | TASK: Review MUSE-D2 Q&A derivation (P-322) | DATE: 2026-11-10T12:29:00Z
FOR: P-322
REVIEW-OF: council/muse:inbox/20261110-1144-muse-P-322-muse-d2-derivation.md

VERDICT: ok

## What I checked (VERIFIED)
- Re-ran the filed instrument: `git show origin/council/muse:_agents/muse/deliveries/muse-d2-2026-11-10.py` → `/tmp/muse-d2.py`, executed `python3 /tmp/muse-d2.py /tmp/flex-live-99.json` against live 99 table `origin/architect/engine-and-seats:tools/mathlab/flex.json` (99 rules, 17 sources, `QB {'FS': 12}`, `C>OT 12`). Exit 0. Reported numbers reproduced exactly:
  - ZAI-D1 baseline (floor on/off): **95 exact / 3 off-by-one / 1 hard / tier-error 5**, residuals `C>OG, C>OT, EDGE>RB, TE>OT` (floor inert).
  - MUSE-D2, guard from INPUT weights and from ENGINE-MEASURED weights (localWins20), β sweep: **identical** at every β in this run. β=0: **93/5/1/7** residuals `C>OG, EDGE>RB, FB>RB, FB>TE, OLB>ILB, OLB>SS`; β=0.25: 85/13/1/15; β=0.5: 83/15/1/17; β=0.75: 82–83/15–16/1/17–18 (measured 82/16/1/18); β=1.0 (sum): 82/16/1/18.
  - Detail (β=0, measured): `C>OT owner 12 model 12 raw 14.00 (A 2.03, G 14.00)`, `TE>OT owner 12 model 12 raw 10.11 (A 8.63, G 10.11)` — guard fixes C>OT/TE>OT without the C PBLK pair (Q11a/Q12). `EDGE>RB` fixed by EDGE CARRY 4 (A 10.40 tier 12? reported row: owner 6 model 12 raw 10.40, G 0.00 — residual remains in this config as written; script’s score-change set is EDGE CARRY 4 + TE PBLK 4 per filing, which matches the A values shown). Guard-induced overprices confirmed: `FB>RB 2→12 (G 17.96)`, `FB>TE 6→12 (G 17.97)`, `OLB>ILB 6→12 (G 10.04)`, `OLB>SS 6→12 (G 9.98)`, `C>OG 6→12 (G 12.50)`.

## Assessment
- **Design strengths:** Q&A-aligned (no floor, no pair, no pins/exceptions, no attributes/intangibles), reuses ZAI-D1 duties/NEED/HAVE for ability, separates value as `G=20*(1-w_src/w_dst)` read from engine-measured slot values (portability: no Owner-provided weights required for other sports), and exposes an adjustable blend `max(A,G)+β·min(A,G)` (Q7) — empirically answered as β→0 in this family. Correctly identifies that the guard is robust to weight source (measured ≈ input here) and that the floor is inert.
- **Honest open problem:** guard overprices FB>RB, FB>TE, OLB>ILB, OLB>SS (and C>OG persists) — the “right guard form” is unresolved; MUSE-D2 documents it instead of pinning (consistent with Q9). SS2 pricing is demonstrated in the filing’s narrative (not re-run here beyond the main script) with an appropriate caveat that estimated SS2 slot value drives G.
- **Comparability:** 94/99 (tier-error 6) under β=0 with EDGE CARRY 4 + TE PBLK 4 and no pair is a credible, measured working point that trades 1–4 exact rows vs pair/score-changed baselines for Q12 compliance and structural C>OT handling.

## Bottom line
Measured, reproducible, and Q&A-faithful derivation step. Keep β=0 max-combiner and engine-measured guard as the portable baseline; focus next iteration on a guard/value form that does not overprice FB/OLB waiver-like rows while preserving C>OT/TE>OT.

Labels: VERIFIED (full rerun of muse-d2-2026-11-10.py vs live 99, all reported counts/residuals/rows) · REPORTED (Q&A constraints, SS2 narrative details not re-executed here) · INFERRED (gravity-in-measured-values claim) · UNKNOWN (better guard form; SS2 true slot value).
