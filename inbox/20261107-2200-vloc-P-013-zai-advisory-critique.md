SPEAKER: vloc | ROLE: council seat | TASK: P-013 critique of Z.ai data-anchor-weights advisory + recommendations | DATE: 2026-11-07T22:00:00Z
FOR: P-013

# Full report: Critique of Z.ai's Data-Anchor-Weights Advisory + recommendations for a better engine and better test tooling

## 1. Executive summary

Z.ai correctly diagnoses the core problem: circularity. The engine's mechanics (L1) were fitted to a weight table (L2) derived from the Owner's salary-based preferences, so the engine can no longer independently verify those weights — it only reproduces them. The recommendation to decouple layers (L1 → L2 → L3, one-way), treat salary as a sanity check not a foundation, and validate against real NFL data is sound.

However, the advisory is strong on diagnosis but thin on execution: no concrete validation metrics, no tolerance bands, no test harness design, no EPA-to-wins mapping, and no handling of data-sparse positions (OL, defense, special teams). This report critiques the advisory and gives a buildable plan for a better engine and better verification tooling.

## 2. What Z.ai gets right

- Salary ≠ marginal wins. Salary prices scarcity, age, injury risk, market inertia — not wins per OVR point.
- Circularity is the root cause. Fitting L1 to L2 targets makes L2 untestable.
- slotWinsPerOvr() is the right metric — wins per OVR point per slot from sim mechanics.
- McBride gets WR1-level target share in reality (28.1% vs 22.3% league WR1 mean, 2024 nflverse).
- Layer separation (L1 mechanics → L2 values → L3 assignment, one-way) is sound.
- Blind validation + pre-registration is good scientific practice.
- Salary as sanity check, not fit target, is the correct role for the market prior.

## 3. What's missing or underdeveloped

1. No concrete validation metrics — what to compare (target share? yards per route? EPA per snap?), how to convert EPA to wins, what tolerance bands pass, how many seasons.
2. No engine-mechanics inventory — pass/rush model, turnover model, kickoff/punt model, field-position, clock model are never enumerated.
3. TE/WR analysis uses target share (volume) but ignores efficiency (yards per target, TD rate, red-zone usage).
4. "Measured lost value" for flex penalties not operationalized — which roster, opponents, seasons, what to hold fixed.
5. No uncertainty quantification — one season of data is small; no confidence intervals.
6. No handling of data-sparse positions (OL, interior defense, special teams).
7. No test harness design — no description of tools to run validations.
8. No draft-AI impact analysis — cpuBias/playerWar depend on slotWinsPerOvr; feedback loop unaddressed.
9. "Frozen L1" is undefined — which parameters frozen, which tunable.
10. No timeline or prioritization for the seven next steps.

## 4. Recommendations by layer

### L1 Mechanics — make independently measurable
- Enumerate L1 parameters into a registry: parameter, layer, source, fitted vs independent.
- Add a mechanics validation mode: run N seeded seasons with fixed mechanics, output per-slot volume/efficiency/win shares, compare to nflverse — without changing parameters.
- Add EPA-equivalent per-play accounting so engine output is directly comparable to nflverse EPA.
- Parameter isolation: vary one L1 parameter at a time, measure effect on each output (sensitivity coefficients).
- Freeze L1 with a git-tagged parameter set + hash; product displays mechanics version alongside weights.

### L2 Values — derived from mechanics, not fit to tables
- Derived-weights flow: real data validates L1 → frozen L1 measures slotWinsPerOvr() → modelWeights() quantizes to 700 scale. No fitting L2 to any table.
- Triangulation table: per slot, show Tier A (engine-measured), Tier B1 (volume-derived), Tier B2 (EPA/AV-derived), Tier B3 (salary sanity check), spread between anchors, flag slots where spread > threshold.
- Uncertainty bands: confidence intervals from bootstrapped seasons.
- Documented, sourced positional-value-per-play constants (receiving yard vs rushing yard vs sack vs turnover) — L1 parameters that map plays to points.

### L3 Assignment — flex penalties from measured value
- Flex penalty = measured slot-value difference: slotWinsPerOvr(destination) − slotWinsPerOvr(natural), adjusted for OVR gap. Not hand-picked.
- Keep −10 cap as interim guard while measured-penalty system is built.
- Exempt list for deliberate rules (LB interchange, fullback) — explicit, recorded rulings.
- Optimizer audit: run lineup optimizer on random rosters, old vs new penalties, count flex events; 1.3× flag line formalized as a test.

## 5. Testing & verification tooling

### tools/validation/ — new read-only harness
- run-seasons.mjs: N seeded seasons, per-slot stats output
- compare-to-nflverse.mjs: compare engine output to nflverse CSVs
- epa-converter.mjs: map sim plays to EPA-equivalent
- sensitivity.mjs: one-parameter-at-a-time sensitivity analysis
- bootstrap-weights.mjs: uncertainty bands via resampling
- triangulation.mjs: Tier A/B/C/D weight table
- flex-penalty.mjs: compute flex penalties from measured slot values

Each tool: read-only, accepts product HTML + data directory, outputs JSON + report, fails loudly on missing data.

### Regression suite (held-out seasons)
- Train/fit nothing on 2024–2025; validate only against those seasons.
- Report: target share error, yards share error, win-total error, playoff-appearance error.

### Bias detector
- Compares modelWeights() output vs Tier A measurement; flags slots where difference > tolerance.
- Runs as CI gate; catches if engine was refit to a table.

## 6. New ideas & experiments

1. Play-level EPA model in the sim — OVR → EPA state transitions, directly comparable to nflverse EPA.
2. Cross-validated weights — fit on 2021–2024, validate on 2025; rotate years.
3. Anchor disagreement report — per slot, weight from each anchor, rank correlation, where they disagree and why, Owner ruling needed yes/no.
4. Flex-penalty auto-tuner — closed-form penalty making each player indifferent between natural and flex slot; run across 1000 random rosters, use percentiles as table values.
5. Mechanics + weight versioning — mechanics-vN and weights-vM as separate stamps; product can mix versions for testing.

## 7. Prioritized action plan

| Priority | Item | Depends on |
|---|---|---|
| P0 | Owner pushes/zips 7 Nov workspace for council audit | — |
| P0 | Owner ruling: engine default = Tier A measured; personal table = display preset | — |
| P0 | Owner ruling: drop "zero 85+ cases" flex rule; use measured-lost-value penalties | — |
| P1 | Enumerate L1 parameters by layer (audit step 1) | Workspace access |
| P1 | Write pre-registration file (metrics, tolerances, held-out seasons) | — |
| P1 | Build validation harness (run-seasons, compare-to-nflverse) | nflverse data access |
| P1 | Build triangulation table tool | Validation harness |
| P2 | EPA-equivalent play model | Validation harness |
| P2 | Flex-penalty auto-tuner | Triangulation table |
| P2 | Uncertainty bands on weights | Validation harness |
| P3 | Cross-validation (rotate training years) | Multiple seasons of data |
| P3 | Mechanics + weight versioning | L1 parameter registry |

## 8. Open questions for the Owner

1. Data access: can you supply or authorize nflverse play-by-play and snap-count data?
2. Display split: confirm engine default = Tier A measured; salary table = visible "Personal weights" preset only.
3. Flex philosophy: confirm drop "zero 85+ cases"; use measured-lost-value penalties, −10 cap interim.
4. Held-out seasons: which seasons reserved for validation only? Recommend 2024–2025 minimum.
5. Tolerance bands: what deviation between engine weights and each anchor is acceptable vs needs ruling?

## 9. How this differs from "just running the diagnostic"

The pasted chat's proposed diagnostic (target distribution by slot, measured wins per Ovr) should be run — but against real NFL data, pre-registered, with an independent verifier, reported against a triangulation table, NOT against the salary table (which only confirms the tuning). This is step 4 of the protocol, not step 1.

## Related files
- inbox/20261107-2059-vloc-P-013-weights-audit.md (layer audit, step 1)
- inbox/20261107-2100-vloc-P-013-weights-prereg.md (pre-registration, step 2)

Labels: VERIFIED (source inspection of engine internals), REPORTED (Z.ai advisory claims I cannot independently verify without workspace access), INFERRED (my recommendations).
