# LEDGER FOLLOW-UPS — B1 DIME · B2 WR1 gravity · B3 the 3-4 (an addendum to Ledger Phase 1)

**From:** Z.ai (seat ZAI, High Councillor) · **Date:** 2026-11-11 · **To:** MUSE, for the Owner and the council
**Reply to:** `_agents/muse/deliveries/prompts-2026-11-05/zai-merge-ledger-followups-2026-11-11.md` (Part B — the three follow-ups from Phase 1's own findings)
**Companion to:** Ledger Phase 1 (council/vl `0af69ad8`). **All three jobs are read-only on the engine; nothing was tuned away; nothing was edited to force agreement.**
**Scripts:** `stage_followup.py` (one instrumented stager, three jobs), `dime_sensitivity.py` (B1's closed-form solver). Data trail: `followup_sit.json`, `followup_wr1.json`, `followup_wr1_grid.json`, `followup_34.json`, and the run excerpts in `logs/`.
**Baseline receipt (run first):** the shipped Phase 1 pipeline re-runs **byte-identically** from its own files (`stage_plays.py` on the Phase 1 `engine_games.json` → sha256 of the re-staged output **13bfe7eb… = the shipped staged.json's**). Every number below sits on that verified base.

**Labels:** VERIFIED = I ran it and the receipt reproduces · MEASURED = the engine's own constant · INFERRED = my parameter, needs data · REPORTED = someone else's number.

---

## B1 · The DIME disagreement — a category difference, not a tuning residue

**The finding, sharpened.** Phase 1 reported DIME at 0.0694 staged play-share vs the engine's `DIME_W` 0.15 (−8.06 points) and refused to tune it away. This investigation closes the *mechanism* question: **the two numbers are different kinds of object, and no package-table change is supposed to make them agree.**

**(b) first, because it decides what (a) even means.** `DIME_W = 0.15` is a **rating weight**: `matchup.ts` line 51 (architect/engine-and-seats, VERIFIED by source read):

```ts
out.coverage = (1 - DIME_W) * out.coverage + DIME_W * D.covDime;
// dime: a fixed passing-down share of coverage, not a plan option
```

It blends the covDime **unit rating** into the coverage rating on **every down, unconditionally** — run downs included. A rating weight can only equal a snap share if (i) dime personnel were on the field 15% of snaps, AND (ii) the blend fired only when they were, AND (iii) the personnel tables agreed with 0.15. (ii) is false in the engine today by construction (the blend never checks the package); (iii) is the INFERRED tables' 0.0694; (i) is the Phase 2 data question. **A 15% rating blend is not a 15% snap share and there is no mechanism that would make it one.** The Phase 1 "disagreement" is therefore a *mapping* finding — and it is also the map's answer: if the Owner wants DIME_W to carry snap meaning, it must be re-derived as a situation-weighted blend (`DIME_W_eff = Σ freq(situation) × P(dime|situation)`, = 0.069 on the staged tables) or the blend must become package-conditional.

**(a) the sensitivity, measured on the Phase 1 engine games.** The staged dime share is a closed-form function of the three package tables and the heavy-suppression rule over the situation mix. Measured situation mix (VERIFIED, 1,300 engine games re-staged): early 0.704, third-and-short 0.190, third-and-long 0.107; heavy offensive packages (13/21/22) suppress dime by ×0.5 on 24.7% of plays. Decomposition:

| bucket | freq | P(dime \| sit) | contribution |
|---|---|---|---|
| early | 0.704 | 0.026 | 0.018 |
| third | 0.190 | 0.102 | 0.019 |
| long | 0.107 | 0.294 | 0.031 |
| **total** | | | **0.069** (the walk measured 0.0694–0.0695 — the closed form agrees) |

What the tables would need to produce 0.15 (VERIFIED bisections, `dime_sensitivity.py`):

- **Uniform ×2.8 on all three dime weights** — but the weights are *relative* (they crowd base/nickel out), so 2.8× is not a nudge, it is a different defensive shape (dime would out-weigh nickel on early downs).
- **Suppression off** is worth only +1.0 points (0.069 → 0.079) — NOT the gap.
- **Single-bucket moves:** early's dime weight ×6 alone; third's ×10 alone; **long alone can never reach it** — even at P(dime|long) = 1.0 the overall share caps at 0.1326, because the bucket is only 10.7% of plays.
- The absolute ceiling (dime weight → ∞) is 0.877 — 0.15 is reachable only through a broad reshaping, not through the long-passing-down bucket where dime actually lives.

**Conclusion and what would settle it.** The engine's DIME_W encodes "dime matters, at a flat 15% of coverage value, everywhere." The package tables encode "dime is a long-passing-down personnel" — the real-NFL shape (real dime usage is strongly down-and-distance dependent, ~5–15% of snaps by team). Neither is wrong; they are unmapped. Three settle paths, Owner's choice: (1) Phase 2 data (the request already filed: snap counts + personnel pbp 2023–25) gives the real dime share and the tables re-anchor to it — my recommendation, one measurement closes it; (2) re-derive DIME_W as the situation-weighted blend (the engine change is one line, but it is an engine change — Architect's lane); (3) accept the two-layer reading and document DIME_W as a rating weight only. **No file was edited.**

---

## B2 · The WR1 gravity trigger — re-triggered on deep targets; the rate is now plausible

**Phase 1's defect, restated.** The placeholder triggered a WR1 double-team on a deep **catch** (gain ≥ 18) at P = 0.22 (+mate adjustments). Under the staged catch shape (CMP_MIX: short 7.3 ± 3.8, med 14.5 ± 4.6) deep catches almost never happen: **0.15 doubles/team-game vs the real ~3–6** (REPORTED band from Phase 1's report).

**The re-trigger (route structure, not catches).** New rule: every pass play draws **air yards** from the completion shape family (INFERRED, story-only — drawn from a **separate RNG stream**, and the old trigger's main-stream draws are burned identically, so **every counter except WR1|double_team is byte-identical to Phase 1** — verified: def spot shares identical with the mode on/off, purity rows clean). A WR1 double-team fires on a **WR1 target** (catch, incompletion, or INT — the target event, not the outcome) with:

- P = **0.70** when air yards ≥ τ = 15 (deep) · P = **0.30** otherwise (short/intermediate — the bracket/safety-help case)
- the same mate adjustments Phase 1 carried (−0.08 if the receiving mate is 84+, +0.12 if < 76)

**The new rate (VERIFIED, all 1,300 games):**

| τ | WR1 doubles / team-game | WR1 targets / tg | deep targets / tg | real band |
|---|---|---|---|---|
| 12 | 5.23 | 12.4 | 4.0 | 3–6 |
| **15 (default)** | **4.37** | 12.4 | 1.75 | 3–6 |
| 20 | 3.68 | 12.4 | 0.01 | 3–6 |

**All three thresholds land inside the real band** — the rate is now structurally plausible. The grid (`followup_wr1_grid.json`, even80): P_short ∈ [0.2, 0.4] at P_deep ∈ [0.5, 0.8] sweeps 3.0–5.6 doubles/team-game — the whole real band is covered by that rectangle, so the band constrains the *pair*, not each knob.

**What this finding actually says (the sharper point).** With the corrected denominator, most of the "doubles" volume is **not deep-shot related**: at τ=15 the short/intermediate bracket term contributes ~3.0 of the 4.37. That matches what the real charting shows (the double/bracket is a coverage-structure event tied to where the receiver lines up and what he threatens, not a reward for catching deep balls) — which is exactly why the catch-triggered version was off by ~30×.

**Honest limits (the "do not invent" clause, honored).** The P values are INFERRED placeholders calibrated to land the rate in the reported real band — the same status as DT1 0.50 / DE1 0.30, now with the right denominator. τ=20 is not meaningful with the INFERRED air-yards shape (the med component's mean is 14.5; almost no drawn air yard reaches 20 — the 3.68 at τ=20 comes entirely from the short term). Settling P, τ and the shape needs **charted double-team data (SIS/PFF-class, paid)** — Phase 1's data request item 3 stands; I did not invent rates beyond the band, and the honest denominators are in the results (`doubles ÷ WR1 targets`, `doubles ÷ deep targets`).

**Purity receipt (the conservation law untouched):** countable channels 100% exact in every mode; the artifact class unchanged; the staged output differs from Phase 1 ONLY in the WR1|double_team counter (verified on the def spot shares and the purity rows).

---

## B3 · The 3-4 staging extension — participation is base-invariant; the formation gap has no snap-side content

**What was built.** The staging now carries the 3-4 base using the engine's `fieldSlots()` rows (VERIFIED against `slots.ts`): DT2 → **ILB2** (row DT2, weight 300), MIKE → **ILB1**, WILL → **OLB1** (row WILL, 150), SAM → **OLB2** (keeps the SAM rating), DT1 → **NT**, DL5 in both. Package substitution mirrors the 4-3 exactly (INFERRED, stated): nickel = base − OLB2 + CB3; dime = base − OLB1 − OLB2 + CB3 + DIME; DL5 still comes on for the **DT2 slot** (in a 3-4 that seat is playing ILB2). All 1,300 games re-staged in both bases; purity clean in both.

**The 3-4 spot shares (VERIFIED; both bases, same walk):**

| spot | 4-3 share | 3-4 share (label) | spot | 4-3 | 3-4 (label) |
|---|---|---|---|---|---|
| DT1 | 1.000 | 1.000 (NT) | WILL | 0.931 | 0.931 (OLB1) |
| DT2 | 0.690 | 0.690 (**ILB2**) | SAM | 0.380 | 0.380 (OLB2) |
| MIKE | 1.000 | 1.000 (ILB1) | CB3 | 0.620 | 0.620 |
| DL5 | 0.311 | 0.311 | DIME | 0.070 | 0.070 |

**Every defensive spot share is identical across bases.** That is the finding, and it is exact by construction of the substitution rules: the 3-4 is a *relabeling* (who is rated as what), not a different participation pattern.

**Does the formation-balance picture change?** The P-332/P-333 cross-formation gap (4-3 roster into 3-4 loses 2700 vs 1800 — gap 900 with the DL5 fixture a DT, 0 with an EDGE; Option B narrows to 400) is a **pricing-side** phenomenon. The Ledger now measures the snap side and reports: **there is no snap-side asymmetry to find** — the two bases field the same 11 seats at the same shares (the table above), so the entire gap lives in the rating rows (which slot's weight/rating the misfit lands on), confirming Inkling's fixture-artifact diagnosis from the snap side. The formation-balance conversation stays in flex-price space, where Option B already operates.

**What the 3-4 DOES change — the role exposures (the merge's E table).** The base changes which ROLE each seat's snaps count as:

| role | E in a 4-3 | E in a 3-4 (snap-weighted) |
|---|---|---|
| ILB | 1.000 (MIKE only) | **0.845** (MIKE 1.0 + ILB2/DT2 0.690) |
| DT | 0.883 (DT1 1.0 + DT2 0.690) | **1.000** (DT1/NT only — the DT2 seat counts as ILB2) |
| OLB | 0.711 (WILL 0.931 + SAM 0.380) | 0.711 (unchanged: OLB1/OLB2) |
| EDGE | 1.000 | 1.000 (unchanged) |

Two consequences worth the council's attention: (1) the merged flex formula's exposure factor E is **formation-dependent for the ILB family** — the Part A design's E table is a 4-3 measurement, and a 3-4 league would price ILB>dst rows with E 0.845 instead of 1.0 (the affected guard rows stay in their tiers at that E — checked arithmetically, ILB>EDGE 10.7×0.845 = 9.04 still tier 12, and ability carries that row anyway); (2) the Owner's open "does the slot define the player?" question (P-332's DL5 item) has a snap-side answer: **participation-wise the DL5 seat is the same seat in both bases** (same 0.311 share, same substitution rule) — so if the slot defines the player, nothing observable about his playing time changes; only his rating row does.

**IDEA:** the base should be a *per-team plan input* to the ledger fold (the engine's plans already carry a def focus; the base is a roster fact). Then the exposure table becomes measured-per-team rather than league-level — one more column the fold produces for free once the roster carries a base.

---

## What changes in Phase 1's conclusions

Nothing retracts. Two entries sharpen: the DIME "disagreement" is now a diagnosed category difference with three named settle paths (B1); the WR1 gravity placeholder is re-anchored on the correct denominator and lands in the real band (B2). One entry extends: the participation tables now cover both bases, and the role-exposure table (which Part A's merge consumes) is measured for the 4-3 and available for the 3-4 (B3). The fail-fast condition of Phase 1 §7 is untouched — all of this re-runs byte-identically from the shipped Phase 1 files.

— Z.ai · read → verify → stage → fold → measure → zip. The disagreement was a map, not a mistake.
