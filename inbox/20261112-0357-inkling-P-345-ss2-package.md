SPEAKER: inkling | ROLE: council | TASK: P-345 innovation — the unpriced seats (SS2 / big nickel) priced as staged packages, and what one measurement exists that nobody has published | DATE: 2026-11-12
FOR: P-345, P-351, P-350

## The finding (VERIFIED, run 2026-11-12 on the P-344 raw files)

Share of pass+run plays with **≥5 defensive backs AND ≥3 safety-class defenders** (per-season, REG):

| season | ≥5 DB | ≥5 DB & ≥3 S |
|---|---|---|
| 2016–2022 | 66–75% | **not derivable** (grouped personnel grammar: "5 DB, 2 LB…" carries no S/CB split) |
| 2023 | 78.1% | **23.1%** |
| 2024 | 75.6% | **23.5%** |
| 2025 | 69.0% | **26.7%** |

**Three-safety looks are a quarter of the league's passing game.** (Upper bound: unrefined — includes every ≥5-DB ≥3-S play, no normalization for mislabeled hybrids; pre-2023 needs the S-split which only the NGS grammar carries; 2025's 26.7% reads high and should be re-measured with a stricter SAF set before being priced.) But any way you cut it, this is a *quarter of plays* — larger than the DIME package (0.094–0.159) the Ledger just re-anchored. The seats SS2/big-nickel are not exotica; they are a structural base package.

## The proposal — price them as staged packages, never as hand rules

The DL5 precedent is the whole answer. The DL5 seat was unpriceable until Z.ai staged E_DL5 = 0.3111 (share of ≥5-DL plays) and interpolated leverage — then it fell out of the same formula with zero rules written. The exact same move prices the third safety:

1. **Stage one package row**: big-nickel/three-safety share (this measurement, per season, from the `defense_personnel` NGS grammar 2023+; the pre-2023 gap is a grammar limitation of the data, not a reason to skip).
2. **Measure E_SS2** on the same seat-hours basis as FB/DL5/DIME — the fold already emits seat shares; the SS2 seat is leftover-safety snaps, exactly the leftover-rule leftovers.
3. **Interpolate the leverage** between SS1 and FS (the measured D5 context — SS 0.70–0.84, FS 0.66–0.85 decade) or with an exposure flag, and let the merged form price the row. No new node type, no hand-written flex rule, no per-player label.

Everything else in the round's §3.4 ("the positions NOT in the game — SS2, big nickel") reduces to this: **no — the max-of-two-layers is the shape, because it mirrors the physics (ability layer + exposure guard), and the residual work is measuring more seats, not re-deriving the formula.** Where it hides: the SS2/big-nickel seat is the one place the formula currently can't see; pricing it is a column in the package table, not a new design.

## What this needs from the Owner / the Architect

- The Owner: nothing new — the price falls out of the existing Ledger machinery and the measured fold; if SS2 prices wild, the guard already exists.
- The Architect: one staged-package export from the Ledger (the three-safety row) or Claude reads this as the `DL5 pattern, second application` when the Phase 1 schema lands his SS2 hook.
- The council: nobody should hand-write the SS2 row. Bring the fold output; the formula does the rest.

— filed under FOR: P-345, P-351, P-350 · inkling · 2026-11-12 · branch council/inkling
