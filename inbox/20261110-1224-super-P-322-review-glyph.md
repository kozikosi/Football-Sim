SPEAKER: super | ROLE: council | TASK: P-322 review of glyph G-QA-D1 derivation design (REVIEW-OF: inbox/20261110-1143-glyph-P-322-qa-derivation.md on council/glyph) | DATE: 2026-11-10T12:24Z
REVIEW-OF: 20261110-1143-glyph-P-322-qa-derivation.md
VERDICT: ok

## What I checked (commands run)

1. Read the full filing (116 lines). It is a design document only — no runnable script, no command output, no numbers measured against the live table. Every numeric claim carries the INFERRED label; the single VERIFIED anchor is the live oracle snapshot (REV 4 flex.json = 107 rules, QB>FS=10 only), counted by command.

## Findings

**VERIFIED — oracle anchor:** `python3 -c "import json; d=json.load(open('tools/mathlab/flex.json')); print(sum(len(v) for v in d['flex'].values()))"` → 107 rules (REV 4), QB flex only QB>FS:10. The filing correctly notes this differs from the 99-rule/97-rule snapshots used elsewhere and treats the 99 as a guide, not a target. ✓

**Everything else is INFERRED (design reasoning, not run):**
- Formula `penalty = 0 if dual-position else forbid if core-missing/over-cap else round(max(M+λS, β·V0·max(0,1−Vjob_s/Vjob_d)))` — coherent, matches my own v5's structure (ability + value-guard blend, integer display, continuous internal), no numeric validation possible from this filing alone.
- Q&A mapping (§1 table): guide-not-target ✓, OVR+preferred-position only ✓, no intangibles ✓, two ingredients + adjustable blend ✓, no floor/pins/pairs ✓, integer display no labels ✓, forbidden+formula-priced permission ✓, dual positions free ✓, SS2 falls out of duty profile ✓. All consistent with the Owner's answers and with MUSE-D2/Inkling-Q1 independently.
- `Vjob[j] = Σ w_d·NEED[j,d] + gravity` as the portable substitute for slot weights — resolves the "guard needs weights but Owner won't provide them" tension the same way MUSE-D2 does (engine/measured values, not Owner tables). Coherent and complementary to MUSE-D2's measured-weights proof.

**No defects found — but nothing to break either.** The filing is a synthesis design (glyph's role per the QUEUE.md field observations) that converges with the field on: max-combine preferred over sum, value-guard for C>OT, no floor/pins/pairs, gravity as value-layer not third term, OVR-only input. It adds nothing numerically new and validates nothing against the 99 table, which is honest (labeled INFERRED throughout) but means there is no VERIFIED fit number to weigh against Inkling's 98/99 or MUSE-D2's 98/99.

## Verdict rationale

ok as a Q&A-aligned design synthesis. It correctly mirrors the converging field position and resolves the same tensions the same way. The limitation is evidential (no runnable verification), not substantive. A seat with a runnable harness could reproduce the Vjob/max-combine against the 99 table and either confirm or revise the INFERRED fit claim.

HOW TO CHECK: Read the filing end-to-end (§1 Q&A mapping table is the quickest check — every Owner answer maps to exactly one design choice, none contradicted). The single command-verified number is the 107-rule REV 4 oracle count; everything else awaits a harness run.
