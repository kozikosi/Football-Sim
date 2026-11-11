# MERGE-LEDGER INTAKE LEDGER — zai-merge-ledger-followups-2026-11-11 (MUSE prompt)

**Source:** `origin/council/muse:_agents/muse/deliveries/prompts-2026-11-05/zai-merge-ledger-followups-2026-11-11.md` (read via `git show` after fetch; relayed as the chat's top directive).
**Date opened:** 2026-11-11 · **Seat:** ZAI · **Status: COMPLETE — all three parts done, nothing blocked.**

## §1 · The prompt, item by item

| # | Directive | Status | Where |
|---|---|---|---|
| A | **The merge (P-340, the main job):** design + prototype the merged flex formula from the baseline `max(ability, guard)`; read the six items that changed the job (LOO/λ≈0.20, the weight-source settlement, FB=scarcity, the Ledger exposures, Pickle's P-341 findings, the 10 Q&A); measure fit vs the 99, LOO, the FB family, the centre diagnostic, the per-slot C>OG variant both ways, the price-vs-Lab gate; CHECKSUMS sha256 | **DONE** | `deliveries/merge-ledger-followups-2026-11-11/MERGE-DESIGN-2026-11-11.md` + `merge_prototype.py` + `logs/merge_run_log.txt` + `merge_results.json` |
| B1 | The DIME disagreement: sensitivity of the package tables + the mapping question (rating weight vs snap share); do NOT force agreement | **DONE** | `LEDGER-FOLLOWUPS-2026-11-11.md` §B1 + `dime_sensitivity.py` + `logs/dime_log.txt` |
| B2 | The WR1 gravity trigger: re-trigger on deep targets/route structure, re-measure, report plausibility; do not invent charted data | **DONE** | §B2 + `stage_followup.py wr1` + `logs/b2_log.txt`, `logs/b2_grid_log.txt` |
| B3 | The 3-4 staging extension via `fieldSlots()`; report 3-4 spot shares + the formation-balance picture (the DL5 fixture artifact: gap 900 with DL5=DT, 0 with DL5=EDGE) | **DONE** | §B3 + `stage_followup.py 34` + `logs/b3_log.txt` |
| C | The Phase 2 harness: ingestion + comparison against the §7 schema; test end-to-end on SYNTHETIC data (labelled); report schema unworkables; do NOT fetch data | **DONE** | `PHASE2-HARNESS-2026-11-11.md` + `phase2_harness.py` + `phase2_results.json` + `synthetic_*.csv` |
| — | Batch rule: complete ALL work before responding; single zip; CHECKSUMS.txt with the algorithm LABELLED sha256 | **HONORED** | `CHECKSUMS.txt` (sha256, labelled) |

## §2 · Interpretations flagged (Owner may veto)

- **I-1:** "optimize mean error, λ ≈ 0.20 … design for mean error, report both" — implemented as: the merged form ships **λ = 0.40 as the default** (the tier-optimal the user sees, and the gate prefers it), with λ = 0.20 reported in every table (in-sample, LOO refits, the gate) and the ablation filed. The council's mean-error recommendation was made on the ability-only form; on the merged form the two objectives separate (§8 of the design). The Owner rules with one constant either way.
- **I-2:** per-slot C>OG ("prototype it as a variant and report the fit both ways; do NOT assume it") — V3 is a **variant**, not the proposal: V2 (role-level) is the shippable merge; V3 needs the Owner's ruling on what his single `C>OG 6` means. Both fits computed; only C>OG moves at λ=0.4.
- **I-3:** B2's P(double|deep/short) = 0.70/0.30 are INFERRED placeholders calibrated to land inside the reported real band 3–6 — the same status as Phase 1's DT1/DE1 placeholders, with the corrected denominators; charting is the settlement (the prompt's "do not invent" honored: no rate outside the band, no charted claim).
- **I-4:** B3's 3-4 nickel/dime substitution rules mirror the 4-3's exactly (base − OLB2 + CB3; base − OLB1 − OLB2 + CB3 + DIME) — INFERRED, stated in the report; the engine's `fieldSlots()` defines the rows, not the package substitutions.
- **I-5:** SCOPE's EREP extended to dst=DL5 (the blitzer NEED's signature duty was silently scoped out) — a Q10-class one-word edit, flagged in the design §3/Q10.
- **I-6:** E_SRC for multi-slot roles = the snap-weighted mean of the role's slot exposures (OLB = 0.7106 from WILL 0.9306 / SAM 0.3806); simple-mean sensitivity reported (V2b, same tiers).

## §3 · What the next session needs

- The three reports (README's table) + `merge_results.json` for re-verification; the intake ledger above for the flags.
- **Waiting on the Owner:** (1) λ (0.40 vs 0.20), (2) the C>OG per-slot schema ruling, (3) the Phase 2 data attach (the harness runs the moment it lands), (4) the DIME settle-path choice (B1's three options).
- **Do not redo:** the weight-source settlement (three confirmations stand); the byte-identity receipt of Phase 1 (re-verified this session: `13bfe7eb…`).
