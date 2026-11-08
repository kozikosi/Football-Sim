# DS bias-audit tools

Two read-only tools for the question the Owner asked on 7 Nov: *is the engine biased toward a table, and
what would count as independent evidence?*

They do not fetch data, do not edit the product, and do not know which table is true. They make the
comparison reproducible.

## `bias-audit.mjs`

Compares a measured slot-value curve to one or more target tables.

```sh
node _agents/ds/tools/bias-audit.mjs --selftest
node _agents/ds/tools/bias-audit.mjs \
  --config _agents/ds/tools/fixtures/engine-bias-audit.json \
  --markdown /tmp/audit.md
```

Reports: Spearman rho (average ranks for ties), Pearson r, OLS slope/intercept, MAE/RMSE/max deviation,
top-5/top-10 overlap, rank inversions, and a **per-unit residual** table (the bias fingerprint).

Config: `curves` (measured), `tables` (targets), `pairs` (which to compare), `anchor` (default QB),
`scale` (default 1000), `groups` (default QB / skill / OL / DL / LB / secondary / ST). Each curve/table is
normalised by its own anchor, so a table in points (QB=320) and a curve in wins/OVR (QB=2.54) are comparable.

The fixture `fixtures/engine-bias-audit.json` holds the real 8 Nov audit: Pre-Colors sweep, Colors
`derivedWeights`, the Owner personal table, and the Owner salary table, with source lines.

## `anchor-compare.mjs`

Computes the independent data anchor and compares it to tables.

```sh
node _agents/ds/tools/anchor-compare.mjs --selftest
node _agents/ds/tools/anchor-compare.mjs --schema
node _agents/ds/tools/anchor-compare.mjs --config _agents/ds/tools/fixtures/anchor-example.json
```

Formula:

```
value(slot) = snaps(slot) × (EPA/play(slot) − replacement EPA/play) × points/EPA × wins/point
```

`snaps` is a share (0..1), `epaAboveReplacement` is EPA/play minus the replacement level at that slot, and
the optional `epaSe` gives a per-slot standard error (`low/high = epa ± z × se`). A **uniform** scenario
shock cancels in normalised space; supply `epaSe` when slot-specific uncertainty matters.

`fixtures/anchor-example.json` is **illustrative only** — round numbers to exercise the formula, not real
nflverse data. Replace it with slot-level snap shares and EPA/play above replacement, each with a named
source.

## Caveats

- Rank correlation across heterogeneous positions is dominated by the common ordering (QB first, then
  edge/WR/OL); a high rho is not evidence of bias. Use the per-unit residuals and per-slot deltas.
- The salary table is a market price, not a wins measurement. The tool can compare to it; it cannot make it
  true.
- The defensive data anchor is the hard part: nflverse has no individual coverage attribution. Report CB3
  and the secondary as a band, not a point.
