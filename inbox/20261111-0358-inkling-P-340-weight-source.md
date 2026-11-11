SPEAKER: inkling | ROLE: council advisor | TASK: weight-source question — OLB 200 vs 150 and C 200 vs 150 (P-340 / merge question 9, prompt option C) | DATE: 2026-11-11T04:02Z
FOR: P-340

# OLB / C: 200 or 150 — what each answer does to the merged flex form

## The three sources, verified

| Source | C | OLB (WILL) | What it is |
|---|---|---|---|
| `tools/mathlab/sport-football.json` (architect tip, flexgates pre-registration) | **200** | **200** | The **decided P-318 bump** (WILL 150→200, C 150→200), pre-registered, **not landed** — the file itself says so: "with the decided WILL 150->200 and C 150->200 bumps (P-318, not yet landed in slots.ts)". |
| `colors/src/sports/nfl/engine/slots.ts` (architect tip, `97d7e9d` and `a0ddc584`) | **150** | **150** (SAM = 100) | The **live engine input today** — unbumped. 264 slot rows; `WEIGHT` is derived from it. |
| localWins20 (MUSE's W_MEAS, the P-321 measurement; my `inbox/20261110-0257` recheck) | 0.3752 | 0.3950 | The measured slope×20 curve, in wins — a different scale; ratios ≈ the 150/300 ratios. |

So the question is not "which number is true" — it is **which moment of the P-318 pipeline the merge's guard should use**: landed input (150), decided-but-unlanded input (200), or the measured curve (≈ same as 150).

## The computation (all 23 live flex rules touching C or OLB; merged form = `raw = max(A, G)`, G = 20·(1 − w_src/w_dst), λ = 0.40, cuts 1/4/9)

| rule | owner | A@0.40 | G meas | G slots.ts | G JSON(P-318) | tier meas/input/json |
|---|---|---|---|---|---|---|
| OLB>ILB | 6 | 6.84 | 10.04 | 10.00 | **6.67** | 12 / 12 / **6** ← FLIP |
| OLB>SS | 6 | 8.12 | 9.98 | 10.00 | **6.67** | 12 / 12 / **6** ← FLIP |
| OLB>FS | 12 | 11.74 | 9.99 | 10.00 | 6.67 | 12 / 12 / 12 (A wins) |
| OLB>EDGE | 12 | 10.80 | 15.38 | 15.38 | 13.85 | 12 / 12 / 12 |
| OLB>TE | 6 | 7.42 | 7.22 | 8.00 | 4.00 | 6 / 6 / 6 (A wins) |
| C>OG | 6 | **5.13** | 12.50 | **12.50** | **10.00** | 12 / 12 / 12 (residual all three) |
| C>OT | 12 | 6.68 | 14.00 | 14.00 | 12.00 | 12 / 12 / 12 |
| C>DT | 12 | 9.12 | 14.30 | 14.00 | 12.00 | 12 / 12 / 12 |
| DT>C, EDGE>C, OG>C, OT>C, SS>OLB, FS>OLB, ILB>OLB, OLB>FB, OLB>NICKEL, OLB>OLB, TE>C, TE>OLB | various | various | 0.00 | 0.00 | 0.00 | unchanged (guard = 0, src outweighs dst) |

(Only rules with G > 0 are shown in detail; the rest price identically under all three sources because `max(0, …)` clamps the guard to 0.)

## Findings

1. **OLB 200 vs 150 is exactly 2 rows.** OLB>ILB and OLB>SS flip from residual (tier 12) to exact (tier 6) when WILL is the decided 200 (G = 6.67 < 9-cut). Both measured and landed sources agree (150-scale). This closes the 92/97 (MUSE) vs 94/97 (Claude, JSON weights) gap — same table, same two rows. VERIFIED by recomputation.
2. **C 200 vs 150 is worth ZERO rows.** C>OG is residual under every source — ability 5.13 → tier 6 (owner 6, exact ability-only), but the guard drags it over the 9-cut in all three cases (G = 10.0 / 12.5 / 12.5 → tier 12 ≠ 6). Raising C to 200 does not rescue C>OG; only a formula change (or an Owner-agreed residual) can. C>OT and C>DT are tier 12 under all three (owner 12). VERIFIED.
3. **Exact counts on the 23 touched rules:** measured 20/23 · slots.ts 20/23 · JSON 22/23. The entire delta is the two OLB rows.
4. **The prompt's "C>OG guard is 9.0 under the JSON" does not reproduce** from `sport-football.json` + G = 20·(1 − w_src/w_dst) (I get **10.0** from C 200 / OG 400; the 12.5 "under engine weights" claim does reproduce exactly). The tier is the same (12) under both 9.0 and 10.0, so the conclusion is unchanged — but the record should carry the reproducible number: **10.0**. (If the 9.0 came from a different guard base, name it and I will re-check.)
5. **All five in-sample merged residuals are guard-caused**, not ability-caused: the ability layer prices FB>RB (3.30→2 ✓), FB>TE (4.74→6 ✓), C>OG (5.13→6 ✓), OLB>ILB (6.84→6 ✓), OLB>SS (8.12→6 ✓) — every one exact ability-only. The merged form's residuals are 100% the guard, confirming MUSE's LOO (guard damages FB out-of-sample too: FB 0.34 → 2.63). The weight question moves 2 of those 5; the FB ruling and the guard-formula question move the others.
6. **Provenance matters for the ruling:** sport-football.json documents that its 200s are the *decided but not landed* P-318 values; slots.ts is what the engine actually consumes today (WILL 150, SAM 100, C 150); localWins20 is a measurement on a third scale whose ratios match 150/300, not the bump. **The LOO filed at `4e15a6f7` used measured/input weights — it is the honest as-shipped number. Claude's 94/97 used the JSON — it is the honest as-decided number.** Both are correct answers to different questions.
7. **SAM is unpriced in this chain.** slots.ts splits WILL 150 / SAM 100; the JSON pre-registers WILL→200 only; the flex table has one unified OLB (measured 0.3950 ≈ WILL). The Owner's ruling on OLB should say which slot it speaks for. (Not blocking; note for the spec.)

## For the Owner to rule (defaults included)

1. **Which weight base does the merge's guard use?** Default if unanswered: the **landed** values (slots.ts / measured — 92/97), with the JSON numbers recorded alongside, and the merge re-pinned when P-318 lands in the engine. The alternative (rule on 200 now) is equally defensible and worth exactly 2 rows. (Blocks: finalizing the merged flex form's residals; not blocks the FB-family fix.)
2. **C>OG under the merge: residual, or formula change?** Default: record it as an accepted residual (Owner 6 vs merged 12) with the guard-causation noted, or fix the guard formula independently of the weight question. 200-vs-150 cannot. (Blocks: nothing; the other four residuals are already covered by the FB ruling + OLB ruling.)
3. **OLB ruling scope:** name WILL explicitly (SAM stays 100). (Blocks: 2 rows exactly.)

Labels: items 1–5 and the two FLIP rows are VERIFIED (recomputed from `sport-football.json`, `slots.ts` @ `97d7e9d`/`a0ddc584`, flex.json @ `97d7e9d`, and the LOO script's W_MEAS); the provenance claims are VERIFIED from the files' own comments; the recommendations are INFERRED judgment; the rulings are the Owner's.
