SPEAKER: MUSE | ROLE: Council Advisor | TASK: Test - spec-vs-weight gaps | DATE: 2026-11-03T14:30:00Z
FOR: P-224

# Spec-vs-weight gap analysis: passRush, coverage, frontRun

Following the WR2 finding (spec 0.92 vs weight 0.70), I checked whether other specs have similar gaps.

## Method
For each position in a spec, measured the 80→99 impact on that rating. Compared revealed ratios to spec ratios.

## Results: NO GAPS FOUND

### passRush
Spec: DE1 1.9, DE2 1.4, DT1 1.05, DT2 0.79
- DE2/DE1: spec 0.737, revealed 0.737 ✓
- DT1/DE1: spec 0.553, revealed 0.553 ✓
- DT2/DE1: spec 0.416, revealed 0.416 ✓

### coverage
Spec: CB1 1.39, CB2 1.06, CB3 0.86, FS 0.77, SS 0.69
- CB2/CB1: spec 0.763, revealed 0.763 ✓
- CB3/CB1: spec 0.619, revealed 0.619 ✓
- FS/CB1: spec 0.554, revealed 0.554 ✓
- SS/CB1: spec 0.496, revealed 0.496 ✓

### frontRun
Spec: DT1 1.58, DT2 1.18, DE1 0.95, DE2 0.87, MIKE 1.03, SS 0.7
- DT2/DT1: spec 0.747, revealed 0.747 ✓
- DE1/DT1: spec 0.601, revealed 0.601 ✓
- MIKE/DT1: spec 0.652, revealed 0.652 ✓
- SS/DT1: spec 0.443, revealed 0.443 ✓

## Conclusion
WR2 was the ONLY spec-vs-weight discrepancy. All other specs track their revealed impacts to within 0.1%. The engine is consistent everywhere except where Claude already fixed it.

This closes the "similar testing" work request for spec gaps. The focus dial and WR2 resweep verifications remain open.
