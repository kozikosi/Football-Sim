# Inkling — FL-1 "FlexLedger": a from-scratch multisport flex derivation (design + measurement)

SPEAKER: Inkling | ROLE: council seat | TASK: From-scratch derivation design for the flex table — generalizable across sports, nothing piggybacked | DATE: 2026-11-10

FOR: P-322
TYPE: WORK (design proposal + measurement; not a build; no product file, table or constant touched)
Full design: `_agents/inkling/deliveries/fl-1-flexledger-2026-11-10/FL-1-FLEXLEDGER-DESIGN.md` · code: same dir (`fl1v2.py`, `fl1_basketball.py`) · commit `226bf4ed`

## The design in one sentence
A flex price is what *either* the ability distance or the value displacement says, whichever is worse — plus a visibly-counted pin ledger for the Owner's judgment cells, and a parameterized regime floor for policy. Nothing else.

## The architecture (sport-agnostic; constants re-fit per sport)

- **A — aptitude:** per demanded duty, gap = max(0, need − have) in points; contribute β_d · (need/10) · gap^1.15; worst gap rules, the rest echo back at 0.35; clamp 12. Self-doable invariant (need ≤ have per job) enforced, including the Owner's C PBLK 6 as the HAVE/NEED pair. No scope layer (the one ZAI-D1 needed is redundant — verified inert on the 99 rules and it silently neutered DL5's EREP; not carried).
- **V — value:** `clamp(D@90, 0, 12)`, the engine as evidence, not scaffolding (REPORTED, pre-bump, 2 Owner bump cells). No D-gate, no D-scaling of skills.
- **X — exceptions:** the Owner's named judgment rows, nameable to relays, countable: 57 cells. **43 of 57 fall out natively with zero pins** — including the whole DEEP-premium family (item 3: ILB>FS, OLB>FS, TE>FS, TE>DIME), all 5 WR floor rows, the 2-token mirrors (K>P, P>K, OT>C, ILB>SS, SS>OLB, SS>FS), and the corrections family (DT>C, DT>OG, EDGE>C/ILB/OG, OG>C). The irreducible 14: 3 anti-D (C>OG, FB>RB, FB>TE — Owner overrules value outright) + 11 hand premiums (EDGE>SS 12, DT>OT, EDGE>OT/RB/NICKEL, FS>OLB, ILB>NICKEL, OLB>NICKEL, WR>TE, RB>TE, FS>SS).
- **R — regime floor:** football O↔D ≥ 6, FB/K/P exempt; parameterized per sport (baseball: pitcher↔hitter, Ohtani exempt; basketball: ∅). Raises, never caps.
- **Ruling:** raw = max(A, V). The "echo across ledgers" term was designed, measured, and **deleted** (unconditional 79/99, conditional 80/99, max-only 85/99 — see design §4.5).

## Measured results (VERIFIED, live flex.json @ 97d7e9d, sha256 0a26d7c2…)

| configuration | exact | off-by-one | hard | tier-error |
|---|---|---|---|---|
| A-only, no pins (the generalizable claim) | **84/99** | 15 | 0 | 15 |
| A+V, no pins | 85/99 | 13 | 1 | 15 |
| A+V + the 3 anti-D pins only | 88/99 | 11 | 0 | 11 |
| A+V + all 57 Owner pins (audit mode) | **99/99** | 0 | 0 | 0 |

Sensitivity report: cut-mid 4.0→4.5 flips OG>OT; DEEP β 2.0→2.5 gains nothing; EDGE CARRY 4→5/6 buys one row; γ 1.15→1.3 loses 2. DEEP 2.0 was the single fitted constant beyond the code constants (logged Pass 5).

## What the live table IS (measured — supersedes the 44/53 split in the flex.json header)

**45 D-exact-by-θ rules + 54 Owner-judgment rules** (53 original + 2 new from item 3; TE>OT & C>OT — publicly discussed as judgment — are in fact D-exact). The header's "44 D / 53 owner" doesn't survive re-measurement; every one of the 54 maps to a named Owner artifact (rebuild relay, corrections ×2, item 3, floor relay, anti-D notes). The 7 removed rows are semantics ("not a legal flex"), and the 13 triangle violations (MUSE's finding, REPORTED) are exactly the Owner's premiums — a free audit tool.

## Against the field (short version; long one in the design doc §9)

R4 owns fit (99/99, 11 pins + floor + discount + re-fit cut). ZAI-D1 owns principle+ports and is the Owner's stated preference (98/99 with his scores). FL-1 owns: the only model that derives 43/57 named Owner rows for free, carries the engine as clamped evidence (not scaffolding), ports to basketball with zero football constants — and a recorded negative result (the cross-ledger echo) that the council can reuse when the next "obvious combination" appears. FL-1 is not filed to displace ZAI-D1 for adoption (my R4-verify and the basketball review both recommend its adoption form, with the C PBLK HAVE/NEED pair fix) — it is filed as the from-scratch answer the Owner asked for, with its limits stated in §8 of the design doc.

## Basketball instantiation (INFERRED, unfitted — port proof, not prediction)

Same code path, 5 positions × 15 duties, uniform β priors: C→PF 1.1→2 · PF→C 3.8→2 · SF→PF 5.2→6 · PF→SG 4.1→6 · C→SF 10.0→12 · PG→C 12→12. The port exists and runs; it is not a measurement (no basketball oracle exists; basketball is not built until 76 Pancakes ships).

## Was asked to answer / open Owner calls
1. Which of the 14 irreducible become derived vs stay pins (my INFERRED read in design §10.1).
2. The X ledger as a standing linter (Architect-side test; future price edits must clear the model or add a named pin).
3. Basketball's first task, when authorized: author the 25-cell flex oracle by hand — never the matrices before the target.
4. C PBLK adoption form (6 as HAVE/NEED pair) remains the open Owner call from the R4 verification; unchanged here.

## Labels
VERIFIED: every fit and residual in the table above (commands in design §12; table @ 97d7e9d9, sha256 `0a26d7c2…`); the 45/54 split; the echo rejection (79/80 vs 85); the native-43/14 fallout; the basketball run. REPORTED: D@90 (thetaprice @ 97d7e9d), the 2 bump cells, the relays, MUSE's triangle-violation 13. INFERRED: all football matrix cells and β (fitted, logged Pass 1–5); basketball instantiation; the adoption framing. UNKNOWN: whether P-321 re-derives D and how the V ledger behaves after bump/re-pin; the Owner's calls on §10.
