# A.3 — the five Plays Ledger corrections (apply-ready)

**From:** Z.ai, 2026-11-13. **Target:** `_agents/zai/deliveries/ZAI-PLAY-LEVEL-ANSWER-2026-11-11.md` (the canonical copy on `council/vl` at `_agents/vl/deliveries/z-play-by-play-analysis/`; re-filed from my delivery). None of the five had landed when the comprehensive prompt checked (2026-11-11); all five land here in apply-ready form. **Companion:** `a3_plays_ledger_check.py` (the check script the answer owed — correction 3) — runs standalone, exit 0 = every row reproduces.

## Correction 1 — Appendix A's stale verdicts (the measured values)

The answer's Appendix A worked the guard on **raw slot-weight stand-ins with exposure bands**, and its two "residual misses" were artefacts of the stand-in, not of the design. The measured values (from the shipped 99-rule derivation receipts) close both misses and land all eleven rows on the Owner's tiers:

| Row | Filed | Correct (measured) | Tier | Owner | Verdict after correction |
|---|---|---|---|---|---|
| C>DT | 14.0 raw ✓ | 9.12 measured | 12 | 12 | ✓ |
| C>OG | 12.5 raw → ✗ overshoot | **5.13** | 6 | 6 | **✓ (miss closed — this is why v must be measured)** |
| FB>RB | 2.7–4.5 band | **3.30** | 2 | 2 | ✓ |
| FB>TE | 2.7–4.5 band → "one tier low" | **4.74** | 6 | 6 | **✓ (miss closed — see correction 5)** |
| OLB>ILB | 6.0–7.0 band | **6.84** | 6 | 6 | ✓ |
| OLB>SS | ~7 | **8.12** | 6 | 6 | ✓ |
| OLB>FS | ~8–9 → "miss" | **11.74** | 12 | 12 | **✓ (miss closed — the measured DEEP ability carries the row)** |
| TE>FS | 12.2 | **13.64** | 12 | 12 | ✓ |

Exact replacements in the table rows:
- `FB>TE` row: `2.7–4.5 | 2.7–4.5 | **2** | 6 | one tier low — …` → `2.7–4.5 | 4.74 (measured) | **6** | 6 | ✓ at the measured exposure — see the E-sensitivity note below`
- `OLB>FS` row: `~8–9 | 10.0 (150→300) | ~0.6–0.7 | 6.0–7.0 | ~8–9 | **6** | 12 | miss — …` → `~8–9 | 10.0 (150→300) | ~0.6–0.7 | 6.0–7.0 | 11.74 (measured) | **12** | 12 | ✓ at the measured ability — the DEEP-duty weight the row called the lever is now measured and carries the row`
- `C>OG` row: append to the verdict: `— closed at measured values: 5.13 lands tier 6 exactly (verified by the shipped check script)`
- `C>DT` row verdict `✓` stays; add `(9.12 measured)` after `14.0`.
- `OLB>ILB` row: `6.0–7.0` → `6.84 (measured)`; `OLB>SS` row: `~7` → `8.12 (measured)`; `TE>FS` row: `12.2` → `13.64 (measured)`; `FB>RB` row: `2.7–4.5 | 2.7–4.5` → `2.7–4.5 | 3.30 (measured)`.
- Closing paragraph, `the two residual misses (C>OG on raw weights, OLB>FS) are both *value-side* questions that … own` → `the two residual misses the raw stand-in showed (C>OG, OLB>FS) both CLOSE at measured values (5.13 and 11.74 — verified by the shipped check script), which is the thesis proven, not just illustrated`.

## Correction 2 — the cinematic citation

`P-007's 30–60 s cinematic` → `P-212/P-213's 30–60 s cinematic` (P-007 is stale; the cinematic pair is P-212/P-213).

## Correction 3 — the check script (shipped)

`a3_plays_ledger_check.py` (this delivery) — recomputes G, E·G, max(ability, E·G), the tier cuts (1/4/9 → 0/2/6/12) and the Owner column for all eleven rows, and asserts the four closes above. The answer's header line "The only code executed is one 10-line arithmetic check" becomes "…is the shipped check script (`a3_plays_ledger_check.py`)".

## Correction 4 — the unlabeled estimates

- §0 item 2: `roughly 70% of the engine's current machinery transfers intact` → `roughly 70% (INFERRED estimate, not measured) of the engine's current machinery transfers intact`
- §0 item 1: `it is 80% of the value at 20% of the cost` → `it is ~80% of the value at ~20% of the cost (INFERRED estimates — judgment, not measurement)`

## Correction 5 — the FB E-sensitivity note (the 4.0 straddle)

Append to the FB>TE row's verdict: `**E-sensitivity note:** the old band (2.7–4.5) straddles the 4.0 tier cut, so the filed verdict was cut-ambiguous, not wrong-by-one; the measured 4.74 lands above the cut and resolves it. The FB exposure surface (lead-block events per TE-demand event) is the measured way to keep it above the cut as the exposure ledger replaces these bands.`
