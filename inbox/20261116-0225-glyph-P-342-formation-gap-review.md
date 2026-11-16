SPEAKER: glyph | ROLE: council seat | TASK: formation-gap.test.ts review (report only) | DATE: 2026-11-16T02:25:00Z
FOR: P-342

## File reviewed
- `colors/test/nfl/formation-gap.test.ts` (read at `86f22d107850b39fa2b6b8ea7cf45c814da443b1` / `6dcf13b294a7243aad61dc11b9c22bdc4da34e53` extracts; contents identical in the regions reviewed). (VERIFIED)

## What the tests assert (exact numbers)
- “formation gap (reference table): a roster built for its own base is worth the same in either (600250 at 70 OVR), whichever role plays DL5” — asserts `lineupFor(native(base, dl5), base, tableValues()).value === 600250` for all (DT/EDGE × 4-3/3-4). (VERIFIED)
- “formation gap (reference table), DL5 = DT: a 4-3 roster loses 2700 in 3-4, a 3-4 roster loses 1800 in 4-3, a gap of 900” — `loss('4-3','DT')===2700`, `loss('3-4','DT')===1800`, difference 900. (VERIFIED)
- “formation gap (reference table), DL5 = EDGE: both lose 1800, a gap of 0…” — 1800/1800/0. (VERIFIED)
- “formation gap: the 3-4 roster always pays the same single price (an ILB at DL5, 12 x 150); only the 4-3 roster depends on who plays DL5” — asserts `DL5<-ILB@12` under `DEFAULT_VALUES` for 3-4 roster in 4-3, both DL5 choices. (VERIFIED)
- MEASURED provider test is explicitly structural/REPORT-only (`t.diagnostic`, asserts own-base agree within noise <32, and `a>0 && b>0` mismatched losses) — not pinned to 2773.04. (VERIFIED)

## Review: arithmetic on a frozen retired table vs number-pin on the gap
**Reasoning (INFERRED from code/comments):**
- The 600250/2700/1800/900 values are computed by the solver against `tableValues()` (the retired fitted/reference provider). With a fixed 70-OVR native roster, fixed slot identities, fixed flex penalties/prices as encoded, and `tableValues()` returning `weight * WINS_PER_UNIT`, these totals are deterministic arithmetic of that frozen table and the solver’s assignment logic. They are not the MEASURED/provider-emergent gap the Owner declined to pin (2773.04).
- As such, they function as **solver-logic regression checks under a frozen reference provider**: a change to Hungarian/cost construction/priority constants/formation slot mapping/flex application that breaks optimal assignment or accounting would move these numbers. Keeping them preserves a stable “reference arithmetic” oracle while `DEFAULT_VALUES`/MEASURED can move.
- However, they also encode specific reference-table outcomes (and implicitly assume that frozen table + current flex mapping yields exactly those losses). If the retired table provider or its wrapper semantics are intentionally changed, or if these are treated as “the” formation gap, they become misleading pins. The Owner ruled nothing pinned to 2773.04 (MEASURED); this ruling does not explicitly cover retired-table 2700/1800/900.

**Recommendation (for Owner decision, no change made):**
- **Keep** these reference-table numeric asserts if the intent is “prove solver logic unchanged on a frozen baseline” — but label them clearly as `tableValues()`/retired-reference arithmetic (file already states this in header comments) and never cite them as the MEASURED/engine-truth gap. They are useful canaries for refactors that must not alter assignment logic.
- **Do not treat as the emergent gap.** If a future change legitimately alters the reference-table mapping or the meaning of `tableValues()`, update/re-pin these in that same commit with stated reason (they are then reference-contract values, not measured gaps).
- **Consider adding an explicit note/test name reinforcement** that these are “reference provider arithmetic, not MEASURED gap” to prevent confusion; but this is editorial and should be decided with Owner/Architect.

**Verdict:** Arithmetic checks on a frozen retired provider — **reasonable to keep as solver-logic/reference regression gates**; **not** a pin on the MEASURED formation gap. Owner to decide whether to retain, relabel, or relax. (REPORTED: prompt states Owner has not ruled on 2700/1800/900; MEASURED 2773.04 not pinned.)

**Ledger:** VERIFIED test contents; INFERRED characterization and recommendation; UNKNOWN Owner preference.
