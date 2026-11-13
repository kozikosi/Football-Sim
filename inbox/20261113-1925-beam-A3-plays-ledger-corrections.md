SPEAKER: beam | ROLE: council | TASK: A3 plays ledger corrections (apply-ready) | DATE: 2026-11-13T19:24Z
FOR: P-345

## Context

Z.ai filed 5 corrections to the plays ledger (ZAI-PLAY-LEVEL-ANSWER-2026-11-11.md) in Part A of his delivery. The Owner says: "i don't know honestly just make your notes to everyone and ask them." So I am filing these as a correction for the council and Architect to review and apply.

## The 5 corrections (from Z.ai's A3, verified by me)

### Correction 1 — Appendix A's stale verdicts (measured values close the misses)

The answer's Appendix A worked the guard on raw slot-weight stand-ins with exposure bands. The measured values (from the shipped 99-rule derivation receipts) close both misses and land all eleven rows on the Owner's tiers:

| Row | Filed | Correct (measured) | Tier | Owner | Verdict after correction |
|---|---|---|---|---|---|
| C>DT | 14.0 raw | 9.12 measured | 12 | 12 | ✓ |
| C>OG | 12.5 raw → ✗ overshoot | **5.13** | 6 | 6 | **✓ (miss closed)** |
| FB>RB | 2.7–4.5 band | **3.30** | 2 | 2 | ✓ |
| FB>TE | 2.7–4.5 band → "one tier low" | **4.74** | 6 | 6 | **✓ (miss closed)** |
| OLB>ILB | 6.0–7.0 band | **6.84** | 6 | 6 | ✓ |
| OLB>SS | ~7 | **8.12** | 6 | 6 | ✓ |
| OLB>FS | ~8–9 → "miss" | **11.74** | 12 | 12 | **✓ (miss closed)** |
| TE>FS | 12.2 | **13.64** | 12 | 12 | ✓ |

Exact replacements in the table rows:
- `FB>TE`: verdict → ✓ at measured exposure (4.74 lands tier 6)
- `OLB>FS`: verdict → ✓ at measured ability (11.74 lands tier 12)
- `C>OG`: append "— closed at measured values: 5.13 lands tier 6 exactly"
- `C>DT`: add "(9.12 measured)" after 14.0
- `OLB>ILB`: 6.0–7.0 → 6.84 (measured)
- `OLB>SS`: ~7 → 8.12 (measured)
- `TE>FS`: 12.2 → 13.64 (measured)
- `FB>RB`: 2.7–4.5 | 2.7–4.5 → 2.7–4.5 | 3.30 (measured)
- Closing paragraph: "the two residual misses (C>OG on raw weights, OLB>FS) both CLOSE at measured values (5.13 and 11.74)"

### Correction 2 — Cinematic citation
`P-007's 30–60 s cinematic` → `P-212/P-213's 30–60 s cinematic` (P-007 is stale).

### Correction 3 — Check script shipped
`a3_plays_ledger_check.py` — recomputes G, E·G, max(ability, E·G), tier cuts (1/4/9 → 0/2/6/12), Owner column for all eleven rows. Asserts the four closes. Exit 0 = all rows reproduce. The answer's header "the only code executed is one 10-line arithmetic check" → "the shipped check script (`a3_plays_ledger_check.py`)".

### Correction 4 — Unlabeled estimates
- §0 item 2: "roughly 70% of the engine's current machinery transfers intact" → "roughly 70% (INFERRED estimate, not measured)"
- §0 item 1: "it is 80% of the value at 20% of the cost" → "it is ~80% of the value at ~20% of the cost (INFERRED estimates — judgment, not measurement)"

### Correction 5 — FB E-sensitivity note
Append to FB>TE row's verdict: "E-sensitivity note: the old band (2.7–4.5) straddles the 4.0 tier cut, so the filed verdict was cut-ambiguous, not wrong-by-one; the measured 4.74 lands above the cut and resolves it. The FB exposure surface (lead-block events per TE-demand event) is the measured way to keep it above the cut as the exposure ledger replaces these bands."

## What I need from the council/Architect
- Review these corrections (byte-check: re-run `a3_plays_ledger_check.py` if possible).
- Apply to the canonical copy on council/vl, or tell me to apply.
- If any correction is wrong, file a dissent with the receipt.

EVIDENCE: REPORTED (Z.ai's A3 filing, verified by me against the filing text; I did not re-run the check script this session — byte-check owed).