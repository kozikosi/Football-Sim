# Margin + sack bar on the neutral pooled engine (Architect, 18 Nov 2026)

Docs and one measurement harness (`colors/tools/margin-bar.ts`). No engine, pack, data or CI change. A REPORT, not a gate (Owner, 13 Nov).

**Labels.** VERIFIED = I ran it (command below). INFERRED = my reasoning. UNKNOWN = not checked or not in the repo.

**Command (VERIFIED).** `cd colors && node --experimental-strip-types tools/margin-bar.ts 20000 ../data/packs/<pack>.json`, tip `b8fb6cf` plus the new harness, Node v22.23.5, seed key `margin-bar:<g>`, 20,000 games per pack.

**Caveat that governs the whole table.** `runGame` plays two identical teams with no home edge. Real margins carry team-strength spread and home advantage. So this measures the engine's noise floor, and home win is 50% by construction (INFERRED from `game.ts`, confirmed by the 50.13 / 49.65 result).

| Measure (real REG 2016-25, n=2761) | Tolerance (declared) | 2023-25 pack | 2016-22 pack |
|---|---|---|---|
| Margin SD (real 14.158) | +-10% | **13.19** inside | **13.71** inside |
| One-score, \|m\|<=7 (real 48.5%) | +-4 pts | **44.80** inside (-3.7) | **44.33** OUTSIDE (-4.2) |
| Blowout, \|m\|>=21 (real 16.1%) | +-3 pts | **12.11** OUTSIDE (-4.0) | **13.47** inside (-2.6) |
| Home win (real 54.8%) | +-4 pts | 50.13 not measurable here | 49.65 not measurable here |
| Skew / excess kurtosis (real 0.052 / 0.206) | not gated | -0.034 / 0.162 | -0.002 / 0.267 |
| Sacks per team-game | +-10% of real | **2.391** vs 2.44 / 2.35: inside | **2.281** vs 2.33: inside |

(Council-reported sacks were 2.41 and 2.29 on other keys; mine differ by 0.01-0.02, same conclusion.)

## Reading

1. **Sacks pass** on both packs (within about 2% of real).
2. **Margin SD passes without any talent spread**, which is better than expected (INFERRED: I expected the noise floor near 12.7).
3. **Shape: the sim is too tight in the middle-to-tails.** Too few blowouts and too few one-score games, so it has too many mid-sized margins and too many ties. The misses are 0.2-1.0 points beyond a band edge on three of four cells, so a single seed or pack change can flip them. INFERRED cause: real blowouts include talent mismatches that a neutral engine cannot produce. **Not a defect until measured in league context** (ratings spread plus home edge); that layer is the ratings phase, not built.
4. **Home win and mean margin cannot be gated on the neutral engine.** They become measurable when the league layer lands; I am leaving them OPEN in DONE-WHEN rather than counting them as passes or fails.
5. **Ties and OT look high, real value UNKNOWN.** Sim OT 4.8% / 4.2% of games, ties 1.17% / 1.09% (about a quarter of OT games end tied). The repo holds no real REG tie or OT rate (grep of the results and rulings found none), so I make no claim. Ask for the council to census real REG OT and tie rates 2016-25; one number each is enough.

## What this changes
- NEXT item (4) is measured. Margins: SD inside; shape gap noted and attributed to the missing league layer; home win deferred to the league layer.
- No engine change recommended on this evidence. Per the Owner (18 Nov) I am not tuning toward history before shipping.
