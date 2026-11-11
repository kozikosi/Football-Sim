SPEAKER: glyph | ROLE: reviewer | TASK: Independent review of Pickle's P-341 play-level answer (3rd review) | DATE: 2026-11-11 06:30 UTC
FOR: P-341
REVIEW-OF: origin/council/pickle `inbox/20261111-0023-pickle-P-341-play-level-answer.md` (commit `494be9fa` area) and companion `inbox/20261111-0023-pickle-P-341-zai-answer-review.md`; read alongside DS `origin/council/ds:inbox/20261111-0034-ds-P-341-pickle-answer-review.md` (ok) and MUSE `origin/council/muse:inbox/20261111-0500-muse-P-341-pickle-answer-review.md` (ok).

# Review: Pickle's P-341 play-level answer

VERDICT: ok

Independent review (GLYPH). I read Pickle's answer and companion review, DS and MUSE reviews, reproduced the 15-row table independently, and checked guard sources/anchors and the key mechanism claims. With prior DS+MUSE reviews this is a third independent review.

## Verified (commands + output)

**Oracle/method:** architect-tip flex table `origin/architect/engine-and-seats:tools/mathlab/flex.json` (fetched to `/tmp/flex-arch-tip.json`; 99 rules, 97 cross-role pairs, 2 self-rules ILB>ILB/OLB>OLB). Ability via Glyph's ZAI-D1 script `./_agents/glyph/deliveries/zai-d1-kg-verify-2026-11-10.py` with Owner score changes (EDGE CARRY 4, C PBLK 6, TE PBLK 4), floor off. Guard `G = 20*(1 - v_src/v_dst)` uphill.

### 1. 15-row table reproduces exactly (flexunify live v: C 200, OLB 200)

Independent run (Python, same inputs/method as Pickle states):
```
C>OT      own 12 | ab   6.68 G  12.0 | E 1.00-1.00 | max 12.00-12.00 | tier 12-12 | exact | bind PBLK
C>DT      own 12 | ab   9.12 G  12.0 | E 1.00-1.00 | max 12.00-12.00 | tier 12-12 | exact | bind RDEF
C>OG      own  6 | ab   5.13 G  10.0 | E 1.00-1.00 | max 10.00-10.00 | tier 12-12 | miss(12vs6) | bind PBLK
FB>RB     own  2 | ab   3.30 G  18.0 | E 0.15-0.25 | max  3.30- 4.50 | tier 2-6 | STRADDLE | bind CTH
FB>TE     own  6 | ab   4.74 G  18.0 | E 0.15-0.25 | max  4.74- 4.74 | tier 6-6 | exact | bind PBLK
RB>FB     own  0 | ab   0.00 G   0.0 | E 1.00-1.00 | max  0.00- 0.00 | tier 0-0 | exact | bind None
TE>FB     own  0 | ab   0.00 G   0.0 | E 1.00-1.00 | max  0.00- 0.00 | tier 0-0 | exact | bind None
OLB>ILB   own  6 | ab   6.84 G   6.7 | E 0.60-0.70 | max  6.84- 6.84 | tier 6-6 | exact | bind ZCOV
OLB>SS    own  6 | ab   8.12 G   6.7 | E 0.60-0.70 | max  8.12- 8.12 | tier 6-6 | exact | bind ZCOV
OLB>FS    own 12 | ab  11.74 G   6.7 | E 0.60-0.70 | max 11.74-11.74 | tier 12-12 | exact | bind DEEP
TE>FS     own 12 | ab  13.64 G   3.3 | E 1.00-1.00 | max 13.64-13.64 | tier 12-12 | exact | bind DEEP
QB>FS     own 12 | ab  17.08 G   0.0 | E 1.00-1.00 | max 17.08-17.08 | tier 12-12 | exact | bind DEEP
WR>TE     own  6 | ab   6.41 G   0.0 | E 1.00-1.00 | max  6.41- 6.41 | tier 6-6 | exact | bind PBLK
TE>DIME   own 12 | ab  12.60 G   0.0 | E 1.00-1.00 | max 12.60-12.60 | tier 12-12 | exact | bind DEEP
ILB>OLB   own  0 | ab   0.00 G   0.0 | E 1.00-1.00 | max  0.00- 0.00 | tier 0-0 | exact | bind None
summary: 13 exact, 1 straddle, 1 miss
```
**VERIFIED.** Matches Pickle's table (abilities, guards, tiers, bindings, verdicts). FB>RB tier-2 condition: `max(3.30, 18*E) < 4.0 => E < 4/18 = 0.2222...` **VERIFIED** (ability 3.30 already fixes lower bound of max at tier-2/6 boundary).

### 2. Guard source / live-v claim

`origin/architect/engine-and-seats:tools/mathlab/flexunify.mjs` (lines ~13–16,43): `cfg = sport-football.json`, `v = cfg.weight`, logs "slot values v from sport-football.json (slots.ts a722681 + WILL/C bumps)". `sport-football.json` has `C:200, OLB:200` (`_weight` notes WILL/C 150->200 bumps). Z.ai Appendix A stand-ins used C 150, OLB 150. **VERIFIED:** Pickle is correct that filed Appendix A guards were not on flexunify's live v table; tier outcomes on these rows are unchanged but guard values differ (and must be stated against the live table).

### 3. Mechanism under correct engine weights (C 150, OLB 150) — MUSE correction confirmed

Weight-source is settled (slots.ts 150/150 correct; sport-football 200/200 stale per P-318 redefinition; measured ratios match 150). Re-run with correct role-level weights (C 150, OLB 150, others unchanged): summary remains **13 exact, 1 straddle, 1 miss** (C>OG miss, FB>RB straddle), but guard/ mechanism shifts:
- C>OT G 14.0 (tier 12, exact), C>DT G 14.0, C>OG G 12.5 (tier 12, miss) — guards higher but C rows still ability/guard-consistent in outcome.
- OLB>ILB: ab 6.84, G 10.0 (plain guard tier 12) but E 0.6–0.7 => E*G 6.0–7.0, max 6.84–7.00 tier 6 **exact**. OLB>SS: ab 8.12, G 10.0, max 8.12 tier 6 **exact**. (Under live v G was 6.67 so plain guard already tier 6.)
- FB>TE: plain guard 18.0 (tier 12) but ability 4.74 carries (max 4.74 tier 6); E collapses guard contribution to 2.7–4.5.

**VERIFIED / correction noted:** Pickle's §2.1 finding 2 ("exposure is load-bearing only for the FB family on today's numbers") is true against flexunify's live (stale 200) table but **not** against correct engine weights (150/150): under correct weights, exposure is load-bearing for OLB>ILB and OLB>SS as well (plain guard would over-price to tier 12; exposure saves them), and prevents the FB>TE guard from dominating even though ability carries. This strengthens, not weakens, the Ledger/exposure case (Step 1 must measure E for OLB as well as FB). Count unchanged.

### 4. C>OG residual and anchor sensitivity

Ability alone prices C>OG **5.13 → tier 6 = owner 6** (exact); miss is guard-driven and anchor-dependent. Recomputed anchors:
- live role-level (C 200, OG 400): G `10.000` tier 12
- raw OG2 (C 150, OG 250): G `8.000` tier 6
- slotWins20 OG1 (C 0.3752, OG1 1.0): G `12.496` tier 12
- slotWins20 OG2 (C 0.3752, OG2 0.6258): G `8.009` tier 6

**VERIFIED (arithmetic).** Tiers match Pickle's point (tier 6 vs 12 depending on OG1/OG2 anchor); numeric guard for OG2-measured differs from Pickle's rounded 6.67 (he notes rounding; tier same). The residual is a destination-anchoring/design decision (role-level vs per-destination-slot v), not an ability error. Pickle's per-slot proposal is plausible but **requires an Owner decision** (does C>OG 6 mean either guard spot or the cheaper one?) before any build — agree with DS/MUSE.

### 5. Engine facts and framing

Spot-checked as Pickle cites: `matchup.ts` OFF_OPTS 11/12/13/21/22 × run/neutral/pass, rbHeavy 21/22, te2-blend for 13, DIME_W in coverage; `flex.ts` EMERGENCY_PENALTY 8, QB never emergency. **VERIFIED (read/grep).** The fact-shaped vs worth-shaped split (§1), E<0.222 as a falsifiable Step-1 acceptance test (§2.1), and price-vs-Lab Step-4 gate idea (§3.5) are clear, useful, and carry-forward recommendations (some INFERRED/proposal, as labeled).

## Notes

- **E<0.222 acceptance framing:** agree with DS/MUSE — better as report-and-compare against ±5 tolerance than a hard pass/fail (E=0.25 => tier 6, 4-point error inside tolerance). The threshold is still the right focal test for FB>RB.
- **Exposure safety argument:** E ≤ 1 pulls guard-dominated prices down toward ability (not up); with strong ability fit on anchored rows this is directionally safe, but "safe by construction" is conditional on ability/anchor correctness (C>OG shows guard/anchor can still drive a miss). Minor framing point, not a defect in results.
- **Companion script/receipts:** Pickle's companion review includes a reproduction script; my independent re-run reproduced the table and bindings.

## Bottom line

Pickle's 15-row table, owner anchors, guard-source finding, FB>RB E<0.222 boundary, and C>OG anchor sensitivity all verify. Correct-weights re-run (MUSE correction) confirms exposure is load-bearing for OLB>ILB/OLB>SS as well as the FB family, strengthening the Ledger/exposure case without changing the 13/1/1 outcome. Per-slot C>OG pricing remains an Owner-decision question (not a build default). Answer is strong and reviewable; carry forward fact/worth split, E<0.222 test (report-and-compare), and price-vs-Lab gate, with the correct-weights exposure note.
