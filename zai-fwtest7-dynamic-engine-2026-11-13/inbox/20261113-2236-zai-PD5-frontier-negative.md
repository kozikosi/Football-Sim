SPEAKER: zai | ROLE: High Councillor · Executor | TASK: PD.5 (comprehensive Part D.5) — is there a formula that beats both operating points? (RUN: negative, with attempts) | DATE: 2026-11-13T22:36Z
FOR: P-345 · the Owner · the council

**Position in one sentence (VERIFIED — ran this wave):** no — the frontier holds; the two shapes not on the killed list (guard-collapse variants; display-law ruler offset) were run with the frozen machinery and neither reaches **≥96/97 exact AND mae ≤1.10**; the best new cell found is a *marginal* improvement inside V2's own operating point, which the record already knew how to beat with V3.

## What ran (script: `scripts/d5_frontier_attempts.py`, output `results/d5-frontier-attempts.json`, deterministic)

Reference points re-confirmed on this machine (exact / mae): V2@0.40 = 96/1.375 · V3min@0.40 = **97/1.301** · V2@0.20 = 86/1.157.

**A1 — guard-collapse variants** (a different way to collapse per-slot guards: V3min uses `min`; try `mean` / `max` of the per-slot guard list):
| collapse | λ | exact | mae |
|---|---|---|---|
| min | 0.40 | **97** | 1.301 |
| mean | 0.40 | 96 | 1.290 |
| max | 0.40 | 96 | 1.375 |
| mean | 0.20 | 86 | 1.068 |
| exact-refit λ (per collapse) | 0.40/0.55 | 97/96/96 | 1.301/1.633/1.725 |

- The finding worth one line: **mean-collapse@0.40 gives 96 exact at mae 1.290** — a 0.085 mae improvement over V2@0.40 at the same exact count. It does NOT beat both operating points (V3min@0.40 is 97 at 1.301; the mean cell is worse on exact). But it is the first new cell since the kills that moves V2's own frontier — filed as a candidate *inside* the 0.40 column, not as a third operating point.

**A2 — display-law ruler offset** (boundaries fixed, raw shifted by δ ∈ [−1.5, +1.5] step 0.25, all three reference forms):
- Every non-zero δ degrades exact (δ=−0.25: 93; δ=+0.25: 95; extremes: 8–25 exact). **The ruler is locally optimal at δ=0 for all three forms.** The display law is not where the mae hides.

## The verdict-shaped statement, refused on purpose

"beats_both: false" is in the JSON. The negative is the result the prompt explicitly accepts ("a negative result with the attempts listed is a result"); what I will NOT do is declare the frontier *closed* — A1's mean cell is evidence the collapse-rule axis had an unexplored point, so the honest state is: **closed at this resolution** (collapse rule exhausted at min/mean/max; ruler offset exhausted on its grid; the killed shapes stay killed).

## Receipt

- Script + JSON ship in this delivery; the machinery is the UNMODIFIED shipped P-345 module (imported, not copied) — the reference points reproduce to the digit on my machine, which doubles as a re-verification of the settled record (REPORTED→VERIFIED on this machine, 2026-11-13).

## Failure mode

- **Grid-widening as "attempts":** a finer λ grid or a denser δ grid would eventually find a 97/≤1.10 cell by interpolation noise. The grids here are the ones the record uses (MUSE's 0.05 λ grid; the killed methods' own grids); I refuse to tune the grid until it yields — that would be fitting to the acceptance metric, which the emerge-don't-mirror principle forbids.

## The Owner-question it carries

None new — but one flag: if the council wants the **mean-collapse** cell adopted inside the 0.40 column (mae 1.290 at 96 exact), that is a formula-layer change with a six-line change-report; the exact-refit λ for it (0.40, unchanged) keeps the anchor. My default: note it, adopt nothing — V3min@0.40 (97/1.301) remains the best whole-table cell and the 1.011-mae difference between columns is a units artefact (the record's 86% rescale), so chasing mae at equal exact is chasing the ruler, not the board.

Cross-references: comprehensive §E kills (family grid, blend, recompression — not re-run), B.4 (the direction receipt), the units-artefact refinements (Inkling, VERIFIED — quoted, not re-derived).
