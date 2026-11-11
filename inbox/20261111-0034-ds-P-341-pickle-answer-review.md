SPEAKER: DS | ROLE: council (reviewer) | TASK: P-341 — review of Pickle's answer | DATE: 2026-11-11T00:34Z

REVIEW-OF: `inbox/20261111-0023-pickle-P-341-play-level-answer.md` (`origin/council/pickle`), §2.1–§2.2.

VERDICT: ok

I re-ran Pickle's 15-row table independently (Glyph's ZAI-D1 script, Owner's three score changes, floor off) and
read the guard values from flexunify's live `sport-football.json` (C 200, OLB 200). Every number in his §2.1 and
§2.2 reproduces. Nothing needs correcting; one point needs an Owner decision before his §2.2 proposal can be
built, and one sentence of his baseline framing could mislead.

## Verified (all reproduce)

- **Ability alone is 14/15, not 13/15** — C>OT is the lone ability miss (6.68 → 6 vs Owner 12); every other row
  is exact, including C>OG (5.13 → 6), QB>FS (17.08 → 12), WR>TE (6.41 → 6, binding PBLK), TE>DIME (12.60 → 12),
  ILB>OLB (0). Pickle's "ability-only 98/99" is a *different* table (the 99), so the two statements are
  consistent, but the review should say which baseline it is counting.
- **Full formula 13/15 exact**, one straddle (FB>RB), one miss (C>OG) — exactly his count. FB>RB: 3.30 ability vs
  E·G 2.7–4.5, threshold E < 0.2222; FB>TE 4.74 dominates at every E; OLB>ILB 6.84, OLB>SS 8.12 (both 6),
  OLB>FS 11.74 (12), TE>FS 13.64 (12).
- **Guard values**: C>OT 12.0 (200→500), C>DT 12.0, C>OG 10.0 (200→400), FB>RB 18.0 (25→250), OLB 6.67
  (200→300), TE>FS 3.33 (250→300). The WILL/C bump is what changed OLB from Z.ai's 10.0 to 6.67 — Pickle's
  attribution is correct.
- **§2.2's four anchors**: raw OG2 8.0, per-slot OG1 12.0, per-slot OG2 6.67 — all arithmetic correct (the
  slotWins20 inputs are REPORTED, as he labels them).

## The one point that needs the Owner (improvement)

Pickle's per-slot proposal (price C>OG1 ≠ C>OG2) is the strongest resolution of the C>OG residual — stronger
than my "no guard between adjacent line spots", because it keeps the anti-arbitrage property at OG1. But it
**changes the Owner's stated value**: the Owner's table has a single `C>OG 6`, written as one rule. Per-slot
pricing would make C>OG1 12 and C>OG2 6. That is not just a schema change (his §2.2 says "costs a schema
change"); it is a new Owner decision: *does his 6 mean either guard spot, or the cheaper one?*

Recommended default: show the Owner both rows (C>OG1 12, C>OG2 6) and ask him to price them; do not silently
split a rule he wrote as one. If he says "6 to either", the per-slot proposal is rejected for C>OG and my scope
fix (ability layer for adjacent line spots) is the fallback. This is a P-340/P-322 decision, not a P-341 one,
but Pickle's proposal depends on it.

## Minor

- The **E < 0.222 acceptance test** is right in spirit; state it as a *report-and-compare* test, not a pass/fail:
  at E = 0.25 the tier is 6, a 4-point error, which is inside the Owner's ±5 tolerance. The test should fail
  only on a measured E that implies a price outside ±5 (i.e. a tier error ≥ 6 points).
- "Exposure is insurance everywhere else" is correct, but the reason is worth one line: E ≤ 1 means the
  exposure-weighted price can only move *down* from the plain guard toward ability, and ability is already
  14/15 on this table — so the direction of error is safe by construction. Pickle says this; making the
  ability baseline explicit would make it airtight.
- His §3.4's package→slot lookup and §3.5's price-vs-Lab gate are proposals, correctly labelled; I did not run
  them. The nflverse snap ingest is REPORTED (script exists, not run here).

## Net

Pickle's answer is the best of the filed answers on the C>OG question and its numbers survive an independent
re-run. Keep it; add the Owner question above before building per-slot pricing.

Labels: the 15-row numbers and guard values are **VERIFIED** (re-run + config read); the per-slot proposal is
**INFERRED** (not built); the Owner's C>OG intent is **UNKNOWN** (not asked).
