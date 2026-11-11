# THE MERGED FLEX FORMULA — design + prototype (P-340)

**From:** Z.ai (seat ZAI, High Councillor) · **Date:** 2026-11-11 · **To:** MUSE, for the Owner and the council
**Reply to:** `_agents/muse/deliveries/prompts-2026-11-05/zai-merge-ledger-followups-2026-11-11.md` (Part A), working from `council-zai-merge-flex-2026-11-10.md` and everything that landed since.
**Prototype:** `merge_prototype.py` (read-only, deterministic, no RNG) · run log `merge_run_log.txt` · machine-readable `merge_results.json`. Oracle: the live 99-rule table (`tools/mathlab/flex.json`, architect/engine-and-seats — 97 cross-role + 2 self).

**Labels:** VERIFIED = my script computed it and the receipt reproduces · MEASURED = the Ledger or P-321 produced the number · REPORTED = someone else's number, used as cited · INFERRED = reasoned, needs the Owner or more data.

---

## 0 · Bottom line

**`price(src>dst) = tier( max( M + λ·S ,  E_src · G ) )`** — Z.ai's ability, Claude's measured guard, one measured exposure factor between them.

| variant (97 cross-role rules) | exact | off1 | hard | mean err | ρ | under-priced rows | LOO (194 held-out) |
|---|---|---|---|---|---|---|---|
| V0 ability only, λ=0.4 (the Z.ai parent) | 96 | 1 | 0 | 1.34 | 0.933 | **1 (C>OT)** | 1.13 · 170 exact |
| V1 max(A, G) plain guard, correct weights (the corrected baseline) | 92 | 4 | 1 | 1.65 | 0.905 | 0 | 1.44 · 172 |
| V1 with the STALE weights (Claude's 94/97, for the record) | 94 | 2 | 1 | 1.53 | 0.904 | 0 | — |
| **V2 max(A, E·G) — THE MERGE, λ=0.4** | **96** | **1** | **0** | **1.38** | **0.940** | **0** | **1.16 · 172** |
| **V3 = V2 + per-slot destination anchoring (min-collapse), λ=0.4** | **97** | **0** | **0** | **1.30** | **0.946** | **0** | — |
| V2 at λ=0.20 (the mean-error λ) | 86 | 11 | 0 | 1.16 | 0.933 | 10 | (the LOO refit lands here) |
| V2v per-play-value guard `20(1−(v/E)_s/(v/E)_d)` — considered, rejected | 90 | 2 | 5 | 1.85 | 0.878 | — | — |

On the full 99 (with the self-rules): **V2 = 98/99, V3 = 99/99** (self-rules price 0 by the need≤have law). Read that top line twice: **the exposure guard recovers every rule of fit the plain guard cost (92 → 96 → 97) and keeps the guard's zero-under-priced structure.** It is better than both parents on their own metrics — better than ability-only on structure (C>OT arbitrage closed), better than the plain guard on fit and on held-out error (1.16 vs 1.44).

One fitted constant survives (λ). Everything else is measured: v from the sim (P-321), E from the Ledger.

---

## 1 · The three ingredients, and what each contributes

**Ability `A = M + λ·S`** (ZAI-D1 V4: the Owner's three score changes, floor retired, SCOPE's EREP extended to DL5 — the blitzer rushes from the edge too; a Q10-class one-word edit). This is the Owner's Q1 "together" made literal: **M** is the single worst weighted deficiency, **S** is the accumulation of all the rest, and the price moves when either moves. Pure max (λ=0) prices 80/97, pure sum (λ=1 equivalent at the top of the sweep) collapses to 81 — the ablation (§8) shows the table itself selects the middle.

**The measured guard `G = 20·(1 − v_src/v_dst)`, uphill only.** v = the P-321 measured slot values (localWins20, wins). The slots.ts input weights give identical tiers (the MUSE/Inkling/Glyph triple confirmation — my run: measured 92/97, input 92/97 at λ=0.4); the stale `sport-football.json` (C 200, OLB 200) reproduces Claude's 94/97 and is shown for the record only. The guard is what closes the centre arbitrage: V0's one under-priced row (C>OT) and V0-at-λ=0.2's twelve are all guard-protected in V2/V3. It stays.

**The exposure factor `E_src` — the new piece, and it is measured, not authored.** E is the source role's play share from Ledger Phase 1 (4-3 staging): FB 0.1265, OLB 0.7106 (snap-weighted mean of WILL 0.9306 / SAM 0.3806), DIME 0.0694, every other source role 1.0 or near it. §2 gives the mechanism; §3 shows it is exactly what the Owner's socialism ruling needed.

Why E multiplies the guard and nothing else: the ability layer already prices the *football* side of a move (duty gaps do not care how often you play); the guard prices the *arbitrage* side, and arbitrage is a phenomenon of playing time — a surplus can only be captured on the snaps the source slot actually takes the field. A role that plays an eighth of the team's plays offers an eighth of the arbitrage surface. Since E ≤ 1, the exposure guard can only pull a price **down toward ability**, never above the plain guard — the direction of error is safe by construction (Pickle's §3.2 observation, now demonstrated across all 97 rows).

---

## 2 · Socialism (Q4) — the mechanism, both directions

The Owner's ruling: *if a role has only one good player and is unimportant, its flex values are REDUCED in BOTH directions.* The merged form implements this with no named exception:

**Out of the role (src = the unimportant role).** The guard's job is to protect an incumbent from being displaced by a flexed star. What the incumbent can lose is his snaps — which are E_src of the team's plays. A centre displaced loses a full-time job (E = 1.0, the full guard binds: C>OT 12, C>DT 12 — the Owner's own rows, landed mechanistically). A fullback displaced loses an eighth of a job (E = 0.1265: FB>RB's guard falls 18.0 → 2.27, tier **2 = the Owner's row**; FB>TE 18.0 → 2.27, and ability 4.74 carries tier **6 = the Owner's row**). The two rows that broke every plain-guard design since w-flex fall out of one measured factor.

**Into the role (dst = the unimportant role).** Already free, for a structural reason worth stating: v_dst is the smallest value in the table, so `1 − v_src/v_dst ≤ 0` and **the guard is 0 into FB for every source** — and ability prices every into-FB row at 0 because the FB's NEED profile is the smallest in the game (that is what "the job demands little" means in duty language). My run confirms all eleven into-FB rows at tier 0 against the Owner's 0s, in both λ columns.

**"Only one good player" — where depth enters.** Deliberately NOT as a formula input. The Owner's binding constraints forbid authored per-role constants, and the pool data (16 fullbacks for 32 spots, 3 at or above 80 — Pickle's census) says the depth problem is already answered on real rosters: there is no second elite FB to stack, so no exploit exists to price against. Depth enters as the **acceptance test** instead: any candidate table must hold the exploit census under tolerance (≤ ~0.05 wins/team-season on stacked rosters — Pickle's proposed standing test). The census is the guard's receipt, not the guard's input.

**The falsifiable prediction — now confirmed.** Pickle's 15-row table straddled FB>RB: tier 2 iff E_FB < 0.222. Ledger Phase 1 then **measured** E_FB = 0.1265 — inside the band. The straddle resolves to the Owner's 2, and the resolution is a *measurement*, not a fit: the Owner's FB>RB = 2 was, in price form, a prediction that the fullback plays under 22.3% of snaps. He plays 12.65%. My acceptance band computes to E < 0.2228 (G = 17.956, cut 4.0); receipt in `merge_results.json → fb_acceptance`.

---

## 3 · What each of the ten questions gets

**Q1 (together) — answered by the form.** M + λS inside the ability; the max against the guard is the second ingredient. One knob (λ) plus one measured factor (E); §8's ablation is the dial's map.

**Q2/Q3 (is the guard needed; how does it combine) — yes, as the exposure guard.** The Owner said C>OT at 6 is OK and the step-up is not a big deal — honored: nothing here forces C>OT anywhere; the guard simply prices it 12, which happens to be the Owner's own row, for the guard's own reason (no centre-out arbitrage). The 2-rule cost of `max` is gone because E shrinks the guard exactly where the plain guard over-priced (FB, OLB) and leaves it full where it was right (C, and every E≈1 role). "A guard that only binds when the arbitrage is real" is literally what E·G is.

**Q4 (socialism) — §2.**

**Q5 (5 points OK) — respected by not chasing fit.** The fit improved anyway (97/97 in V3), but the design does not depend on it: V2's single miss (C>OG at 12 vs 6) is 6 points over on one row, and §5 prices the Owner's options for it.

**Q6 (gravity inside v) — adopted, with the Ledger as the delivery path.** v is measured and already sits in the guard. When double-team/gravity modelling lands in the sim, it changes v, and the guard moves with it — no new term. The Ledger's gravity counters (Phase 1 R4, re-triggered in the companion Part B report) are the future measurement channel.

**Q7 (no prohibition layer) — holds.** No gate, floor, exception or pair table anywhere in V2/V3. The forbidden moves are the 12s (and the priced-up 6s); nothing is banned by name. The one mechanism I did NOT need: waivers. ZAI-D1's old cross-side floor is retired — my cross-side rows land at 6–12 on their own (ability + guard), matching the Owner's binary structure without the policy.

**Q8 (new positions) — the Owner authors the NEED; the formula prices the moves; the value arrives in three steps.** Priced this session, from the Owner-defined requirements (receipt in the run log §Q8):

- **DL5 blitzer** (NEED: RUSH 9, EREP 5, RDEF 8, TKL 6, RNG 4 — ZAI-D1 §5.3, the Owner's reframing): EDGE **0**, DT **2**, ILB/OLB **2**, OT/OG/C **6**, SS **6**, TE **6**, WR **12**, FS **12** (λ=0.2 column). Value layer: **E_DL5 = 0.3111 is already MEASURED** (Ledger R2a), the per-play leverage interpolates from the neighbours he rotates with (DT2 1.146, DE2 0.789 wins-per-play-share → mean 0.967) → **v_DL5 = 0.301 wins ≈ 118 weight-units against the engine's own 150** — the interpolation lands within ~20% of the engine's anchor with zero authored constants, so the guard is ON from day one.
- **SS2 big nickel** (NEED authored this session, INFERRED, ZAI-D1 method: MCOV 7, ZCOV 5, RNG 8, TKL 7, CTH 4, DEEP 4, RDEF 4, RUSH 1): SS **0**, FS **2**, CB **0**, WR/TE/EDGE/ILB/OLB **6**, everyone else **12**. Value layer: **no slot, no measured share — so the guard is SILENT (0) and ability prices the moves alone.** That is the honest answer to "what is a new role worth before the sim has seen it": you don't guess a v, you price ability now and the Ledger measures E_SS2 the day a big-nickel package is staged, at which point the guard switches itself on through the same v = E × leverage interpolation DL5 just demonstrated. New roles bootstrap: NEED (Owner) → ability prices (formula) → E (Ledger) → v → guard. One pipeline, no per-role hand-pricing.

**Q9 (LOO) — run on all three forms** (MUSE's protocol verbatim: λ refit per fold, 0.00–1.00 step 0.05, 194 held-out cases): V0 1.13 · 170/194 · fitted λ 0.20–0.25; V1 1.44 · 172/194; **V2 1.16 · 172/194 · fitted λ 0.20 in every fold**. Reading: the plain guard's held-out damage was concentrated exactly where exposure now discounts it (V1's worst roles were RB 2.75 and FB 2.63; V2's worst three are C 1.64, OG 1.52, WR 1.48 — RB drops to 1.42, FB leaves the worst list entirely). V2 keeps V1's exact count (172) and nearly matches V0's error. **The merge generalizes at least as well as either parent.**

**Q10 (duty tables not a big deal) — honored, two receipts anyway.** (a) The script's sanity check reports `need ≤ have` violation: **C PBLK** (C's job demands 8, the Owner's score change sets C's HAVE at 6) — the known open call, priced here as-is; C's self-rule is not in the 99, so nothing breaks, but the next NEED calibration should reconcile the pair (my earlier note stands: it is a NEED+HAVE pair, not a cell). (b) SCOPE now loads EREP for dst=DL5 — without it the blitzer's NEED silently loses his signature duty (SS→DL5 would price 6 instead of 12).

---

## 4 · The centre diagnostic (Q2's real test)

Under-priced rows at λ=0.4 (the operating point): V0 **1** (C>OT — the Owner's feared exploit class), V1 **0**, V2 **0**, V3 **0**. At λ=0.2 the ability layer weakens and V0 shows 12 under-priced rows (C>OT, C>DT among them) while V2 shows 10 — all guarded at the operating point. Per-source: C-src under-priced rows are NONE in every guard variant. The engine-behaviour confirmation (do centres actually flex?) remains Pickle's census result, REPORTED: under the live table no centre moves on any of 32 real rosters; the exposure is the stacked-roster case, which is what the census-as-standing-test watches.

---

## 5 · C>OG and the per-slot decision (the one residual, both ways as instructed)

Role-level anchoring prices C>OG at 12.5 → tier 12 against the Owner's 6 — the merged form's only miss. The measured data is already per-slot (slotWins20: OG1 1.0, OG2 0.6, REPORTED; C 0.3752 measured), and the role-level collapse is what loses the row. **V3 prices the guard per destination slot** and collapses to the 99 with the min (the marginal slot — the slot the flexed body actually fills when the depth chart is full):

- C>OG: guards OG1 12.50 / OG2 7.49 → min-collapse **7.49 → tier 6 = the Owner's row.**
- Blast radius at λ=0.4: **exactly one row moves** (C>OG 12 → 6). The exposure factor protects the FB family from the re-anchoring (FB>RB's per-slot min would be 14.9 against RB2 — E·14.9 = 1.9, still under ability 3.30, tier 2 unchanged); TE>OG stays 6 (its min guard is 0 against OG2 and ability 8.63 carries the tier); C>OT, C>DT stay 12 (OT2/DT2 guards are 10.0–10.7, still tier 12).
- **Fit: 97/97 exact, 0 off-by-one, 0 hard, mae 1.30, ρ 0.946, zero under-priced.** On the full 99: 99/99.

What V3 costs and what the Owner must decide (the question Pickle filed, still open): a schema change (FLEX keyed by destination *slot*, not role) and a ruling on what his single `C>OG 6` means — either guard spot, or the cheaper one. Min-collapse implements "the cheaper one" and is the exploit-honest reading (the flexed body fills the marginal slot). **Do not build V3 without that ruling; V2 needs no ruling and is 98/99.** My recommendation: adopt V2 now, hold V3 as the drop-in upgrade pending the one-word Owner answer.

---

## 6 · The price-vs-Lab gate (Pickle's Step-4 proposal, reported as instructed)

The T6 flex-pricer pairs (REPORTED — measured by Z.ai's own lab tools, the 2026-11-09 flex state; not re-run here — no engine in my lane). Lab OVR-eq = wins ÷ slope[dst], slope = v_dst/20:

| pair | lab (wins) | lab OVR-eq | merged λ=0.4 (owner) | d formula | d owner table |
|---|---|---|---|---|---|
| TE→WR1 | 0.63 | 7.8 | 9.04 (12) | 1.2 | 4.2 |
| CB→WR1 | 0.67 | 8.3 | 6.86 (6) | 1.5 | 2.3 |
| CB→FS | 0.284 | 7.2 | 0.80 (0) | 6.4 | 7.2 |
| EDGE→DT1 | 0.39 | 5.9 | 0.00 (0) | 5.9 | 5.9 |
| WR→RB1 | 0.31 | 10.1 | 4.68 (6) | 5.4 | 4.1 |
| QB→FS | 0.975 | 24.7 [REPORTED @90: 22.8] | 17.08 (12) | 7.6 | 12.7 |
| **mean** | | | | **4.68** | **6.07** |

**The merged formula predicts the Lab better than the Owner's own table does** (4.68 vs 6.07 mean |Δ|), and λ=0.4 beats λ=0.2 on the gate (4.68 vs 5.34) — the star-QB row wants the accumulation term. The residual disagreement is structural and visible: the Lab prices a median move's one-shot win cost; the table prices deterrence; CB→FS (lab 7.2 vs everyone's 0) and WR→RB1 (lab 10.1 vs 6) are Owner-vs-Lab philosophical space, not formula error — the gate makes that legible, which is what a gate is for. Tolerance note: the ~2.5 (one-tier) tolerance is met on 3 of 6 pairs by the formula and 2 of 6 by the table; both sides' misses are the same pairs. Building the full Lab harness stays out of scope, as instructed.

---

## 7 · What I considered and rejected (with the receipts)

- **Per-play values inside the guard** `G̃ = 20(1 − (v/E)_src/(v/E)_dst)`: the theoretically tempting version — value the surplus per snap, not per role. **Rejected on the numbers**: 90/97 with 5 hard misses; it breaks the FB family the other way (FB>RB → 7.4 → tier 6 against the Owner's 2; FB>TE → tier 2 against 6). Reason in hindsight: dividing v by E re-prices EVERY row through the exposure lens, when only the guard-dominant rows needed the correction. E·G touches exactly the rows the plain guard was wrong about.
- **Partial guards** (`a·G`, a<1): Claude's own sweep showed partial protection is no protection under max (a ≤ 0.75 re-opens 4 rows); E is not a partial guard — it is a *selective* one, keyed to measured participation.
- **Depth/surplus as a formula input** (Pickle's rolesurplus s_dst replacing the 20): beautiful, and the right Step-2 upgrade path via his fixed-point loop — but the pool cannot estimate a FB surplus at all (thinner than the roster), which is precisely where it would need to work. Rejected as an input; adopted as the acceptance test (§2).
- **Socialism as a price multiplier on the final tier**: rejected — it would bend ability rows too (FB>TE's 6 is ability-carried and should not move), and it needs a depth constant the Owner has forbidden.
- **k-norm combination of (A, E·G)**: the data already prefers worst-binds (Claude's sweep: k=1 adds 0.32 error); max kept. The dial exists if the Owner ever wants it.

## 8 · The λ dial (the one fitted constant), mapped

Ablation on the 97 (V2 form): tier-exact peaks at **λ=0.40 (96/97)**; continuous MAE bottoms at **λ=0.20 (1.16)**; the LOO refit lands at 0.20 in every fold. These are different objectives: 0.40 wins the thing the user sees (tiers), 0.20 wins the thing the fitter sees (mean error). The Owner has not ruled (Q1's original state) — **the design ships λ=0.40 as the default** (tier integrity, and the gate prefers it), with 0.20 recorded as the mean-error alternative; flipping the dial is one constant. Full table in the run log §λ-ablation and `merge_results.json`.

## 9 · What this needs from the Owner

1. **λ: 0.40 (tiers, my recommendation) or 0.20 (mean error).** One constant; the ablation is filed.
2. **C>OG / the per-slot schema:** keep V2 role-level (98/99, one 6-point row) or adopt V3 per-slot min-collapse (99/99; FLEX keyed by slot; does his 6 mean either guard spot or the cheaper one?). Pickle's question, now with both fits computed.
3. **Nothing else.** No gates, floors, exceptions or constants to approve — the rest is measured or already ruled.

## 10 · What the council should verify (re-run receipts)

`python3 merge_prototype.py flex.json` against the live table reproduces every number in §0–§6 (deterministic, no RNG, no engine contact). The three checks that matter: (a) V1 at correct weights = 92/97 (the weight-source correction, confirming MUSE/Inkling/Glyph); (b) V2 = 96/97 with zero under-priced rows and the FB family on the Owner's tiers; (c) V3 min-collapse = 97/97 with only C>OG moving versus V2. The exposures are Ledger Phase 1 outputs (council/vl `0af69ad8`, byte-identical re-run receipt in the Part B report).

## 11 · IDEA (the innovation the prompt asked for)

**IDEA: the price IS a measurement protocol.** Every constant in `max(M + λS, E·G)` now has a measurement plan: M and S from the duty tables (authored once, later read from sim usage — Pickle P-322's path), λ from the Owner's feel (the dial), G's v from the perturb-and-resimulate Lab, E from the Ledger's snap counts. The formula is no longer a fit to the 99 — it is an *interface* the 99 happen to sit inside (97/97). The next sport does not inherit football constants; it inherits the protocol: author NEED, measure E, measure v, read the prices. The basketball sketch (my multisport delivery §3) already prices 40/40 pairs with the ability half of this form; the E and v halves plug into the same slots the Ledger and Lab fill here.

**IDEA: E belongs on the draft board too.** The usage column Pickle proposed (P-341 §4.5) is E made user-visible: projected play share per slot, the same measured number the pricing uses. One measurement, two consumers — and the user finally sees *why* the FB flexes for 2.

— Z.ai · read → verify → build → verify → zip. The guard protects; the exposure forgives; the tiers came home.
