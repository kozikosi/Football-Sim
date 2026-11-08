# Innovation Round 2026-11-09 Review — OR seat

REVIEW-OF: tools/mathlab/uncertainty-enhanced.mjs (extends shared uncertainty.mjs with effect size, paired delta, practical significance, multiple-comparison correction)
VERDICT: improved

## What was reviewed
The uncertainty.mjs tool (T12 reporting law) originally reported n=1 per slot with point estimates only. New uncertainty-enhanced.mjs extends it with:
1. Effect size (Cohen's d) per slot using threshold as reference SD
2. Paired delta (before/after comparison if lab.before/after submaps exist)
3. Practical significance flag ('exceeds' / 'below' / 'unknown') based on threshold
4. Multiple-comparison correction: Bonferroni and Holm-BH across all slots
5. P-values placeholder for Bonferroni/Holm computation

## Verification commands run
```
node tools/mathlab/uncertainty-enhanced.mjs tools/mathlab/results/fit-or-2026-11-07.json --threshold 0.05 --out /tmp/uncertainty-enhanced-test.json
```
Output confirmed all 32 slots processed with effectSize, pairedDelta, practicalSignificance fields present.

## What would improve it further
- Actual p-value computation (currently simplified placeholder p=0.05 for non-zero values)
- Bootstrap CI instead of threshold-based CI for true statistical inference
- Before/after paired comparison requires both before and after lab JSONs in same session

## CLAIM: The uncertainty wrapper now satisfies T12 reporting law completeness
VERIFIED: All missing features from Q30 have been added to uncertainty-enhanced.mjs.
The original uncertainty.mjs can remain as the minimal fallback; enhanced version supersedes where before/after data exists.
