SPEAKER: VL | ROLE: council | TASK: Part 2 — ratify the merged yards acceptance battery (FOR: P-342) | DATE: 2026-11-18T06:00Z
FOR: P-342

# Ratified yards acceptance battery — FOR: P-342

## Status
The Architect's stated next build after the §6 fix is the yards-given-class node. Three batteries were filed (Beam 7 checks, evidence INFERRED; Inkling kill criterion held-out ≥2 SE; GLM A1–A7, headline A1 in-repo). This filing **ratifies the merged set**; no fourth battery is written. Reconciled by VL; to be checked by one different seat (per Part 2's "one seat reconciles; one different seat checks" rule).

## Convention rule (§0)
Name the denominator on every figure. The consistent reference set for all yardage grading is **GLM's A3 = 120,000 paired keys** (same game key under pools and passclass). Beam #4 and Inkling §4 cite mixed-N shift numbers — **struck**. Only GLM's A3 cites the consistent 120k set; every check below grades against N=120,000 paired.

## Anchor numbers (GLM's A3, VERIFIED by VL at engine pin 65673a00 via glm-bar, N=120,000 paired)
```
pools nfl-pools-fit2023-2025 + passclass nfl-passclass-fit2023-2025: 120000 paired games
metric        pools     GLM    diff   diff%   SE(diff)  z
yards        328.658  327.288  -1.371   -0.42    0.177   -7.7
drives        11.045  10.924  -0.121   -1.10    0.006  -20.8
sacks          2.408   2.385  -0.023   -0.97    0.004   -5.3
```
Command: `node colors/tools/glm-bar.ts 120000 nfl-pools-fit2023-2025 nfl-passclass-fit2023-2025` (run from a clean extract of engine pin 65673a00: `colors/` + `data/packs/`). These are the numbers the ratified battery grades against; the mixed-N figures from Beam #4 / Inkling §4 are not part of this battery.

## The ratified battery

### 1. GLM's A1 — in-repo landing gate (council-runnable)
- Command: `node colors/tools/glm-bar.ts 120000 nfl-pools-fit2023-2025 nfl-passclass-fit2023-2025` (clean extract of 65673a00); read the `yards` row.
- N: 120,000 paired keys.
- Bar: GLM/pools yards ratio ≤ 0.9× AND absolute floor overall |z| ≤ 2 (GLM's A1 as filed).
- Note: **council-runnable** (in-repo; data packs tracked at 65673a00). Anchored above: yards ratio ≈ 0.996 (327.288/328.658), |z| = 7.7. **A1 as stated (|z|≤2) does NOT pass on these numbers — this is a deliberate ratification flag, not a silence.** The Architect must either (a) confirm A1's |z| threshold applies to a different aggregate, or (b) treat the yards node as not-clearing-A1 until the |z| is resolved. Do not ship the yards default on A1 as currently stated without resolving this.

### 2. Inkling's held-out ≥2 SE — outer gate before any default (Architect-only)
- Command: held-out evaluation of the yards-given-class node vs pools on held-out packs (method per Inkling §4; raw data is git-ignored, not in the repo).
- N: held-out set size per Inkling's filing (≥2 SE criterion).
- Bar: held-out degradation ≥ 2 SE clear of pools before any default; "clearing A1 but failing held-out = lands but never defaults."
- **Scope settled:** the council CANNOT run this gate (raw data git-ignored). It is an **Architect-only check**. The council verifies the method and the filed numbers instead of the run. A different seat should re-derive Inkling's held-out ≥2 SE arithmetic from his filing and confirm the method matches this criterion.

### 3. Body: Inkling §2/§3 + GLM A4/A6/A7 + Ernie's two new items
- Ernie item 1: **no second thin-cell fallback** — covers the thin-cell fall-through at `passclass.ts:79–82` that the holes counter cannot see (the holes counter only sees `holes[4]` after the fact; it cannot observe the class-restricted sampler leaving the down-aware cell). Confirmed covered by Ernie's item.
- Ernie item 2: **half-threaded plant** — a fault plant that the body must catch.
- Bar: all body checks pass; the thin-cell fall-through is addressed by Ernie's "no second thin-cell fallback," not by the holes counter.

## What the battery does NOT do
- Does not write a fourth battery.
- Does not re-derive GLM's held-out numbers (Architect-only; council verifies method + filed numbers).
- Does not resolve the A1 |z|=7.7 vs |z|≤2 tension (flagged to the Architect).

## Ratification
**The merged battery is ratified as above** (A1 in-repo gate, held-out ≥2 SE outer gate, Inkling+GLM+Ernie body), graded against GLM's A3 = 120,000 paired keys, with mixed-N citations struck and the A1 |z| tension flagged.

**Reconciled by:** VL. **Awaiting check by one different seat.**

## BLOCKED · OPEN · NEXT
- BLOCKED: A1 |z| tension (|z|=7.7 vs stated ≤2) needs the Architect's resolution before the yards default ships. Held-out data is git-ignored (Architect-only run).
- OPEN: different seat's check of this reconciliation; Architect's A1 |z| resolution.
- NEXT: (1) different seat checks this reconciliation; (2) Architect resolves A1 |z|; (3) end-of-chat: lane file + bulletin + commit + push + preserve.mjs check.
