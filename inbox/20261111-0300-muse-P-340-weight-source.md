SPEAKER: MUSE | ROLE: High Councillor | TASK: Weight-source investigation — C 200 vs 150, OLB 200 vs 150 (follow-up prompt, option C) | DATE: 2026-11-11
FOR: P-340

# The weight source is settled: slots.ts (C 150, OLB 150) is correct; sport-football.json (C 200, OLB 200) is stale

**VERDICT: answered.** The engine weights (C 150, OLB 150) are correct. sport-football.json's 200 values are the pre-redefinition P-318 bump that was never landed and was then superseded. The measured localWins20 ratios confirm the engine weights exactly. The impact: OLB 200 vs 150 is worth 2 rows in the merged form (OLB>ILB, OLB>SS); C 200 vs 150 changes the guard value but not the tier on any row.

## The evidence

**1. sport-football.json says so itself.** Its `_weight` field reads: "Top slot weight per role, slots.ts at a722681, with the decided WILL 150->200 and C 150->200 bumps (P-318, not yet landed in slots.ts)." The 200 values are the P-318 weight bump. But P-318 was REDEFINED by the Owner on 2026-11-09: the bump is an engine-math change (slotWins20 up), NOT a SLOTS[].weight change — weights stay 150 by design. The 200 values were written when P-318 meant "change the weights"; P-318 no longer means that. sport-football.json was never updated after the redefinition, so it is stale.

**2. The measured localWins20 ratios match slots.ts exactly, not sport-football.json.** The guard is a ratio, so what matters is the relative weight. Four independent ratios, all decisive:

| ratio | measured (localWins20) | slots.ts (150) | sport-football.json (200) |
|---|---|---|---|
| C/OG | 0.375 | 0.375 | 0.500 |
| OLB/ILB | 0.498 | 0.500 | 0.667 |
| C/OT | 0.300 | 0.300 | 0.400 |
| OLB/SS | 0.501 | 0.500 | 0.667 |

The measured ratios match slots.ts to three decimal places and are nowhere near the sport-football.json values. The engine's effective weights are 150 for C and OLB. This is not a judgment call — it is a measurement.

**3. The guard under each source, for every row.** I computed G = 20*(1 − w_src/w_dst) under all three sources for all 97 cross-role pairs. 12 rows have a guard tier that differs between sources:

- **4 rows where sport-football.json differs from slots.ts AND measured** (the OLB rows — the load-bearing ones):
  - OLB>ILB: owner 6. sport-football G 6.67 → tier 6 (exact). slots.ts G 10.00 → tier 12 (residual). measured G 10.04 → tier 12 (residual).
  - OLB>SS: owner 6. sport-football G 6.67 → tier 6 (exact). slots.ts G 10.00 → tier 12 (residual). measured G 9.98 → tier 12 (residual).
  - OLB>TE: owner 6. sport-football G 4.00 → tier 2. slots.ts G 8.00 → tier 6 (exact). measured G 7.22 → tier 6 (exact).
  - OLB>FS: owner 12. sport-football G 6.67 → tier 6. slots.ts G 10.00 → tier 12 (exact). measured G 9.99 → tier 12 (exact).
- **8 rows where sport-football.json and slots.ts agree but measured differs** (the measured guard is higher because the measured slot values do not exactly match the input weights — e.g. RB measured 0.6126 vs SS 0.7887 gives G 4.47, while input 250/300 gives 3.33):
  - RB>SS, RB>FS, TE>ILB, TE>SS, TE>FS, OT>DT, OG>DT, P>K. In all 8, the measured guard tiers higher than the input guard.

**4. What actually changes the merged form.** The merged form is max(A, G) — the ability A dominates on most rows, so a guard tier difference only matters where the guard is the max. Of the 12 rows above, only **2 change the merged-form exact count**: OLB>ILB and OLB>SS (exact under sport-football.json's 200, residual under slots.ts/measured 150). OLB>TE and OLB>FS do not change the merged form (the ability already gives the owner tier). The 8 measured-vs-input rows do not change the merged form either (the ability dominates) — which is why the LOO found input and measured weights give identical in-sample results (92/97).

**5. The C question.** C 200 vs 150 changes the guard VALUE but not the tier on any row: C>OG (10.00 vs 12.50, both tier 12), C>OT (12.00 vs 14.00, both tier 12), C>DT (12.00 vs 14.00, both tier 12). So C 200 vs 150 does NOT change the merged-form exact count. It does affect the mean error slightly (a larger guard over-prices C>OG more, since the owner is 6). But the tier — which is what the Owner sees — is the same either way.

## What this means

1. **The correct merged-form fit is 92/97 (94/99 including self-rules), not Claude's 94/97.** Claude's flexunify zai+G uses sport-football.json weights (OLB 200), which makes OLB>ILB and OLB>SS exact. Under the correct weights (slots.ts / measured, OLB 150), those two rows are residuals. The LOO filing's merged numbers (92/97 in-sample, 172/194 held-out) use the correct weights.
2. **The Owner's ruling on C 200 vs 150 and OLB 200 vs 150 is really "confirm 150."** The evidence is not a close call: the engine says 150, the measured ratios say 150, and P-318 was redefined so the 200 values should never land. There is no live case for 200.
3. **sport-football.json should be corrected.** It is on the architect branch, so this is the Architect's file to update — either change C and OLB to 150, or annotate it as stale (the P-318 bump that was redefined). Until it is corrected, any tooling that reads it (flexgates, flexunify, rolesurplus) will use the wrong weights for C and OLB. This should be filed as a P-item for the Architect (one job, small).
4. **The measured-vs-input guard difference (8 rows) is a separate, smaller question.** The measured guard tiers higher than the input guard on RB>SS, RB>FS, TE>ILB, TE>SS, TE>FS, OT>DT, OG>DT, P>K. It does not change the merged-form exact count (the ability dominates), but it means the guard from measured weights is systematically higher than the guard from input weights. The P-340 merge baseline uses the measured guard, which is the right choice (the measured weights are what the engine actually does). No action needed — just noted.

## Evidence

- Script: `_agents/muse/deliveries/weight-source-2026-11-11/weight-source-investigation.py`.
- Output: `_agents/muse/deliveries/weight-source-2026-11-11/weight-source-output.txt`.
- Sources: `tools/mathlab/sport-football.json` (architect, `_weight` note quoted verbatim above), `colors/src/sports/nfl/engine/slots.ts` (architect, C 150 at line 28, WILL 150), localWins20 table (MUSE-D2, P-321 measurement), live flex.json (architect `97d7e9d`, 97 cross-role pairs).
- P-318 redefinition: Owner 2026-11-09, QUEUE.md — the WILL/C bump is an engine-math change (slotWins20 up), NOT a SLOTS[].weight change; weights stay 150 by design.

**Labels:** the weight values, the `_weight` note, the ratio arithmetic, and the guard computations are VERIFIED (computed by the filed script from the cited sources). The recommendation (confirm 150; correct sport-football.json) is MUSE's recommendation, not a ruling — the Owner decides.
