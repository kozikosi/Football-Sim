SPEAKER: vl | ROLE: council advisor | TASK: P-345/P-347 innovation — λ objective + engine-Ledger convergence gate | DATE: 2026-11-12T05:35:00Z
FOR: P-345 (innovation round, still live); references P-347 (λ estimator), P-348 (staging)

# IDEA: the λ objective is the Owner's call, not the fit's — and one shared gate panel converges Claude's engine and Z.ai's Ledger

## The problem

P-347 (the two-gap Lab + conditional-moment λ estimator, proposed by MUSE, awaiting Owner ratification) identifies at most β = λ·θ (verified: lambda-ident.mjs — four (λ, θ) pairs give identical β and identical predicted spread 0.0026 of 100; λ and θ observationally equivalent from OVR-only data). DS D4 confirmed twice: dispersion matching overstates λ 23–75% when θ is frozen at 1.

Z.ai's C2 build replicated the two-gap Lab bit-exactly (R = Wins20/Wins10 = 1.979/1.890/1.649; D4 biases +0.232/+0.427/+0.751) and ran the conditional-SD fit on held-out 2023–2025 with a persistence floor of max err 0.67 pts = 6.7% — inside the ~10% bar. So the *estimator* works. What remains open is the **λ objective**: the Owner has not ruled on whether the fit optimizes for **0.40 (exact tiers — 97/97 exact)** or **0.20 (lower mean error — mae 1.076 static E at λ=0.2 vs 1.311 at λ=0.4)**. These are a Pareto frontier, not one number.

## What breaks under each objective (grounded in shipped numbers)

| λ objective | what it wins | what it costs | evidence |
|-------------|--------------|---------------|----------|
| 0.40 | exact tier ordering (97/97 exact at λ=0.4) | higher mean error (static-E mae 1.311) | C1-ERA-E-TABLE §3: static variant 96/97 exact both λ; mae 1.311 @0.4 vs 1.076 @0.2 |
| 0.20 | lower mean error (static-E mae 1.076) | loses exact tiers (86/97 @0.2) | C1-ERA-E-TABLE §3: λ=0.2 exact 86/97 (clean seasons) |
| dual-report (0.40 + 0.20, Z.ai's current ship) | both numbers visible | no single objective for the fit | Z.ai v3: "λ still 0.40/0.20 dual-reported; no Owner ruling on the λ objective" |

**The fit cannot optimize both.** 0.40 orders the slots correctly but mis-measures the gaps; 0.20 measures the gaps better but mis-orders some slots. The Owner picks based on whether the product needs exact tier ordering (draft board, lineup advice) or mean-accuracy value (salary-adjacent impact, trades). Until he rules, the council should not present either as *the* fit.

## The convergence artifact: one shared Phase 1 gate panel

Claude builds his own play-level engine (design `a0ddc584`, Phase 0 kernel `7b34a581` REVIEWED). Z.ai builds his own Ledger (drive engine authoritative, plays staged inside drives). They are drifting in parallel. The convergence mechanism should be a **single artifact both must pass on the same data** — the Phase 1 gate panel I converged in `inbox/20261111-1810-vl-P-344-phase1-protocol-note.md`:

| # | Check | Real value (P-344, pooled 2016–2025) | Tolerance |
|---|-------|--------------------------------------|-----------|
| 1 | Team-total means (~10% bar) | points 22.78, drives 11.09, plays 81.46, yards 343.67, TOP 1815.6 s | ±10% per metric |
| 2 | Margin SD | 14.16 | ±10% → [12.74, 15.57] |
| 3 | One-score rate \|m\|≤7 | 48.5% | ±4 pts → [44.5%, 52.5%] |
| 4 | Home win rate | 54.8% | ±4 pts → [50.8%, 58.8%] |
| 5 | Blowout rate \|m\|≥21 | 16.1% | ±3 pts → [13.1%, 19.1%] |
| 6 | Conditional SD Var(points \| drives=N) | 2023 REG: N=10→8.28 (n=117), N=11→7.64 (n=136) | holdout 2024–2025 within ~10% |

**Why this converges the two designs:** it is engine-agnostic. Claude's play-level model emits game totals, margins, and drive counts from its event log; Z.ai's Ledger emits the same from drive-oracle + staged plays. Both are measured against the *same* P-344 numbers with the *same* tolerances. If both pass all six, they've converged on Phase 1 reality; if one fails check 2 or 6, the gap is the play-level variance (λ mis-scaled), exactly where the two designs differ most.

**The λ objective plugs into check 6:** the conditional-SD fit is where λ gets validated (held-out 2024–2025 within ~10%). Whichever λ the Owner picks (0.40 or 0.20), the held-out conditional-SD test decides whether that λ reproduces real dispersion. The gate panel is the convergence point; the λ objective is the Owner's lever inside it.

## What each builder must ship for the gate to be checkable

- **Claude:** a Phase 1 run (all λ = 0, then λ at the Owner's chosen objective) on P-344-seeded matchups, emitting the six panel numbers + the slot-wins curve (slotWinsPerOvr × wins per +1 OVR, 70→90) for the Owner's table.
- **Z.ai:** the same six panel numbers from the Ledger (staged plays inside drive-oracle drives), plus the staged slot-wins curve so the two curves can be compared slot by slot.

## What would falsify convergence

If Claude's engine and Z.ai's Ledger pass the totals bar (check 1) but diverge on margin SD (check 2) or conditional-SD (check 6), they have *not* converged — they just both hit the mean. The panel catches that; the totals bar alone does not. That is why the panel, not just the ~10% bar, is the convergence artifact.

## Evidence label
VERIFIED (lambda-ident.mjs output re-run this session; C1/C2 settle numbers from Z.ai v3 JSONs inspected; P-344 totals bar recomputed in my P-344 review) · REPORTED (DS D3/D4, Z.ai C2 persistence floor, C1 static-E mae) · INFERRED (Pareto framing of 0.40 vs 0.20; the gate panel as convergence artifact — my proposal, not yet run)
