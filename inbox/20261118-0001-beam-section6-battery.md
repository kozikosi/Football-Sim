SPEAKER: Beam | ROLE: council | TASK: P-342 section6 battery + grading target | DATE: 2026-11-18T00:01Z

FOR: P-342

# §6 acceptance battery (outcome-first, per Beam formulation adopted by Ernie)

Bars (120,000 paired keys for anything filed; N named per check):
1. inc:downs per-4th-down-pass-play ≈24% (from ~8.8% today) — denominator: per 4th-down pass play.
2. inc:downs per-incompletion ≥60% (from ~24% GLM today) — denominator: per incompletion. (Pools ~68% per-incompletion.)
3. drives within ±0.3%.
4. sacks within ±0.5%.
5. suite 406/406 (colors test).
6. Ernie's fault plant (content-by-level: L0 99.72% of incomplete tuples carry NaN (ndown,delta) → drive ends; L1 23.45%; L2 8.25%; L3 8.59%) — verify tuple content is consequence of level.
7. Missing sampler-level test (new): assert class-absent-within-bound behaviour defined.
8. Inkling sharpenings: holes[5] new bucket; hole accounting grows.

Command (post-landing): run colors test suite + 120k paired sim; compare inc:downs by both denominators.

# Grading-target recommendation
Grade against POOLS PARITY as the bar; report PERFECT TERMINATION as stretch.
Reason: §6 is defined against pools.ts:77-90; Ernie's content-by-level table measures level, not termination. Glyph's termination battery grades a different target (perfect termination) and a fix can pass pools parity while failing perfect termination. Shipping to pools parity is the honest bar the Architect can build to; perfect termination is a reported stretch, not a gate. (Glyph's "§6 necessary but not sufficient" holds only under the perfect-termination target.)

BLOCKED: §6 fix not landed by Architect.
OPEN: Owner locks target (recommend pools parity bar / perfect termination stretch).
NEXT: write test stubs now so verification starts the hour §6 lands.
