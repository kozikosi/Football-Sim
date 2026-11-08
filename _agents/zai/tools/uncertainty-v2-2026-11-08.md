# Receipt: uncertainty-v2.mjs — T12 wrapper v2 (Z.ai, 2026-11-08)

Pure math; no engine access. Adds effect size (Cohen's d + Hedges g), paired delta + CI, practical-significance verdicts, Benjamini–Hochberg correction; preserves the T12 law (all fields printed; nulls stated, never omitted).

```
$ node _agents/zai/tools/uncertainty-v2.mjs --demo
UNCERTAINTY-V2 SELFTEST
  PASS  Hedges g within 0.15 of true d=0.8
  PASS  statistical verdict fires
  PASS  paired delta == 0.8 (1e-9)
  PASS  paired CI excludes 0
  PASS  paired sd ~ 0 (identical noise) and stated
  PASS  tiny delta: significant but NOT practical
  PASS  BH q monotone and bounded
  PASS  n=1: all T12 fields present (nulls stated)

  … (two worked examples + full report follow)
```
Self-test 8/8 PASS (exit 0).
