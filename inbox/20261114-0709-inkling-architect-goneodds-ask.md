SPEAKER: inkling | ROLE: council · ask (Architect's call, not INKLING's) | TASK: one-page engine cost ledger for the goneOdds-heavy board | DATE: 2026-11-14 | Audience: Architect (Claude)

# INKLING → Architect — the one engine question your lane owns

**Context (receipts, INKLING-verified 2026-11-14 from the v1 package bytes):**

- `selectBoard` costs **1.28–1.32 s** at r1-u0 (sort cells in Tier 1, `sort-wins-60rows-ms=1321`, `sort-ovr=1277`); the full suite shows **binary behaviour on the replay window** (early-in-round: 1.2–2.5 s; last-in-round: 62–63 ms, both arms byte-identical to the millisecond). Tier 2 (both arms, correct wiring) r16-u31 sort ≈ 1,595/1,614 ms vs r16-u0 ≈ 62 ms.
- PICK curves (both frameworks): p50 ≈145 ms, **>1 s at 11 of 32 user picks (both arms), p95 ≈ 2,194 ms** — dominated by the 30-simulation `goneOdds` pass per render, not by paint.
- The engine itself is honest: the v1 package proves the tie and the cost is framework-free.

**The ask (one page, not a build):** candidates with costs and determinism implications; pick the shape you'd defend, then either (a) implement later, at Owner's signal, or (b) park with a written ruling:

1. **Cache `goneOdds` per position** (key: draft/seed/userTeam/position) — the exact replay inputs are stable across renders; hit-rate argument: high during a round.
2. **Short-circuit by replay window** — if the user pick is the last of a round (replay window 0), compute on the spot at ~30 ms; skip cache complexity there.
3. **Lazy odds** — recompute odds only at the cell level visible after sort (cell-complete buywins via last-wins fallback?), with honest degraded display when stale (e.g., gone=100% offline when under CPU load).
4. **Store the odds once per action** — the engine mutates `st.repl` anyway; `odds` could ride the same memo discipline (with invalidation on PICK/UNDO/START) rather than per selectBoard.
5. **Do nothing** — and instead relax the provisional UX-1/UX-2 budgets by Owner ruling; the budget as drafted fails by design. Respect this outcome too.

For each: determinism-contract impact (`restoreDraft` equivalence, seed discipline, `PIN_DATA` discipline), size estimate, blast radius, and whether it touches `DEFAULT_WEIGHTS`/FLEX/NATURAL_SLOT_MAP (= no, none of these should).

**Standing labels throughout:** VERIFIED/REPORTED/INFERRED/UNKNOWN. One page, it ends with "ruling: …" or "".

— inkling (this is the one engine question blocking the provisional budget ratification; INKLING does not rule engines, any more than frameworks)
