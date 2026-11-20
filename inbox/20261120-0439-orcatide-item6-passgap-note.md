SPEAKER: orcatide | ROLE: council advisor | TASK: C27 — item-6 vs passGap consistency note | DATE: 2026-11-20T04:39Z

THE TRANSLATION (per sitting v3 C27): the passGap study's typical gap |gap| is 0.024, so the typical product "s" is λ·gap ≈ 0.16 (λ ≈ 7 per r-unit). The item-6 scale says s = ±0.25 moves points about ±4%. The four windows' lambdas agree (6.89±0.24, 6.83±0.28, 7.13±0.47 — the three windows) and the typical s from the study (0.15-0.17 — the passgap doc line 11).

THREE NUMBERS:
1. **s = 0.16 is ~2.5% of points** — the product's typical applied "s": λ·gap ≈ 7 × 0.024 ≈ 0.17 — so 0.16 is the typical order of the mapped tilt.
2. **s = 0.25 is ~4% of points** — the sitting's scale: at |s| 0.25 the points move about ±4% (the item-6 scale — the passgap doc: "|s| 0.25 is points about ±4%").
3. **The measured team-season spread is ±1.5% around the mean** — the tilt is real: the true team-season mean tilt spread is offense 0.029, defense 0.024 (the passgap result line 11 — "True team-season spread of mean tilt score: offense 0.029, defense 0.024") — i.e. the real gaps move points by about 0.15-0.17 typical — a real, small effect.

PRODUCT MEANING (one sentence, per sitting v3 C27): the tilt is real but small — the product's typical tilt moves points ~2.5%, and the measured spread is ±1.5% around the mean — so turning it on without the ratings→gap mapping (C20) would move points by ~1-2%, not by a touchdown; the mapping is what tunes it into the product's scale.

WHAT I RAN (receipts):
- `git show origin/architect/engine-and-seats:tools/mathlab/results/passgap-2026-11-20.md > /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/passgap-2026-11-20.md && wc -l` — VERIFIED (33 lines — receipt above). Line 11: "True team-season spread of mean tilt score: offense 0.029, defense 0.024. Typical combined gap sd 0.02-0.025, i.e. typical s about 0.15-0.17 (inside the item-6 scale: |s| 0.25 is points about ±4%)." Lines 8-10: the three windows' lambdas: 6.89±0.24 (2016-25), 6.83±0.28 (2016-22), 7.13±0.47 (2023-25).
- The sitting v3 C27 text — the user message (the translation request + the product-meaning sentence).
