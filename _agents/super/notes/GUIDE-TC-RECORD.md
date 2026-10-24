# GUIDE/TC RECORD — V22-Suggestions.md verification
**Dispatch:** GLM batch BATCH-GLM-B2-20261022T0012Z  
**Build pin:** 044d1759e01ac99b… (per dispatch) — note: this session measured against `NFL Draft Simulator merged.html` at sha256 `40233d6b…` (657,486 B), the tracked merge candidate; the build may have moved under other sessions' edits.  
**Lane:** _agents/super/notes/ (read-only on product and document)  
**Labels:** VERIFIED / REPORTED / INFERRED / UNKNOWN

---

## Criterion (1) — MODEL RECALIBRATION framing

**Finding: NOT MET.** The Guide/TC region (P8-6 at line 689, P11-6 at line 1905) lists the Owner's spot-value deltas:

> Line 689: `The default weights are how the draft simulator sees the game. The Owner's specific changes: K 0.72→0.45, WR2 0.60→0.63, RB1 0.67→0.58, CB2 1.18→0.95, DE1 1.30→1.38, TE1 within 0.5 of WR1, TE2 within 0.5 of WR3, QB/WR pass/run percentages adjusted for run game. The "Save My Weights" button is transparent until a default weight is changed, then blue + "My Weights".`

> Line 1905: (identical text, duplicated in P11 round)

**No match** for `MODEL RECALIBRATION`, `slotWinsPerOvr()`, `modelWeights()` as derivation source, `hand-edited`, `derived row`, `calibration layer`, or any re-validation target string (`100-season`, `r>0.6`, `RMSE`, `0.66`, `0.69`, `2.6`, `real-2025`) anywhere in the document.

**Evidence:** grep over V22-Suggestions.md returned zero matches for all recalibration/re-validation tokens. The deltas are listed as raw numbers with no derivation story and no re-validation requirement named.  
**Label:** VERIFIED (negative result confirmed by grep).

The doc does reference `modelWeights()` once, at line 561:

> Line 561: `- The **weights**: the Owner's table matches **`modelWeights()` in 34/34 slots** and the hand-written `DEFAULT_WEIGHTS` in only 7/34 — so the "defaults you created" are the *derived* model weights, which is what the site already ranks with, and **no protected constant has to change**.`

This is a comparison claim, not a recalibration instruction, and it does not name what must re-validate after the deltas are applied.

---

## Criterion (2) — Owner's weights table flagged as OPEN ITEM

**Finding: NOT MET.** Zero matches for `OPEN ITEM`, `open item`, `weights.*OPEN`, or `OPEN.*weights` in V22-Suggestions.md.

**Evidence:** grep over V22-Suggestions.md returned zero matches. The Owner's weights table (which arrived truncated — "These are the default weights you created:" with nothing after) is not flagged anywhere the implementer would see it.  
**Label:** VERIFIED (negative result confirmed by grep).

---

## Criterion (3) — Glossary as actionable row

**Finding: NOT MET.** The glossary appears only as commentary:

> Line 691: `### P8-7 · The glossary`
> Line 692: `25+ football terms for casual fans. Cross-reference with game previews and reviews.`

> Line 1907: `### P11-7 · The glossary`
> Line 1908: `25+ football terms for casual fans. Cross-reference with game previews and reviews.`

No `WHERE`, `WHAT`, `HOW TO CHECK` fields attached. Not in the house change format.  
**Label:** VERIFIED (negative result confirmed by grep and direct reading of lines 691-692 and 1907-1908).

---

## Two rows quoted (as requested)

Row A — weights deltas (P8-6, line 689):

> `The default weights are how the draft simulator sees the game. The Owner's specific changes: K 0.72→0.45, WR2 0.60→0.63, RB1 0.67→0.58, CB2 1.18→0.95, DE1 1.30→1.38, TE1 within 0.5 of WR1, TE2 within 0.5 of WR3, QB/WR pass/run percentages adjusted for run game. The "Save My Weights" button is transparent until a default weight is changed, then blue + "My Weights".`

Row B — glossary (P8-7, line 692):

> `25+ football terms for casual fans. Cross-reference with game previews and reviews.`

---

## Summary for GLM

All three criteria fail on V22-Suggestions.md as it stands: (1) the weights deltas are listed as raw numbers, not as MODEL RECALIBRATION derived from `slotWinsPerOvr()`/`modelWeights()`, and no re-validation targets (draft board, 100-season r>0.6, real-2025 r≈0.66/ρ≈0.69/RMSE≈2.6) are named; (2) the Owner's truncated weights table is not flagged as an OPEN ITEM; (3) the glossary is commentary only, with no WHERE/WHAT/HOW TO CHECK row. The document needs these three gaps filled before an implementer can act on the Guide/TC region safely.
