# Data and Rating Standard Proposal

**Status:** Proposed minimum standard for data work. No player values or source permissions are approved by this document.

## Planning targets

**Updated Owner planning signal (2026-10-20):** Plan for approximately 1,500–2,000 all-time candidates for each of NFL and NBA. The Owner said this range seems like the goal, because the pool should be large enough to avoid fabricated players and poor role/flex coverage. Treat this as a planning target pending final sizing. A candidate is a proposed player record; it need not be fully rated before architecture and data-research work can continue.

The current-season simulations need their own versioned pool and season context. Do not overwrite current data when creating an all-time pool.

## Data layers

Keep the following concepts distinguishable, even if the first implementation stores them in one JSON or CSV file:

1. **Source observation:** What a source supplied, including source name, source date/version, season, team, position/role, and raw rating or statistics.
2. **Normalized player record:** Stable identity and the fields the simulator needs in a consistent schema.
3. **Rating transformation:** A documented formula or mapping that turns raw inputs into simulation attributes.
4. **Mode adjustment:** A versioned adjustment applied for a mode, era, or eligibility policy.
5. **Simulation input:** The fully resolved, validated values consumed by a specific engine and run.

Do not collapse those layers into a single unexplained number.

## Minimum record fields

A proposed normalized player entry should carry:

- Stable player ID.
- Display name and aliases where needed.
- Sport and eligible roles/positions.
- Team or teams and seasons represented.
- Mode eligibility.
- Source attribution and source version.
- Raw values with units and field definitions.
- Transformed attributes and the transformation version.
- Confidence or review state.
- Contributor and reviewer identifiers.
- Notes for disputed identity, position, era, or rating decisions.

Exact serialization can be decided after repository inventory. Preserve source values when transforming them, rather than overwriting them.

## NBA2K input plan

The Owner can transmit NBA2K ratings directly. Treat those values as source material, not as automatically equivalent to the NBA simulator’s required math.

For each drop, record game edition/year, roster update if available, player, season/team representation, attribute names, scale, and any missing-value conventions. Preserve the received values. Then propose a transparent mapping to basketball simulation attributes and test the mapping on a small named sample before applying it to the full pool.

Do not silently:
- mix ratings from different NBA2K editions,
- change the source scale,
- infer a missing attribute as zero,
- reuse modern ratings as historical peak values, or
- publish a derivative dataset without recording its source and the Owner’s data-use decision.

## NFL all-time ratings

The NFL all-time rating set will be created collectively because a single ready-made data source is not available in this workflow. Use a rubric and reviewed submissions, not an untraceable committee average.

Recommended workflow:

1. Agree on the rating dimensions, scale, and the meaning of “player rating.”
2. Decide whether the all-time value represents career greatness, peak season, representative prime, or an explicit blend.
3. Build a player candidate list with source evidence and coverage by position.
4. Have contributors rate disjoint player shards using the same rubric.
5. Have a second reviewer spot-check every shard and deeply review edge cases and cross-position calibration.
6. Record disagreements and confidence. Do not erase minority views by averaging without analysis.
7. Calibrate across positions using simulation outcomes and football knowledge; then keep calibration changes versioned.
8. Publish the rating source, rubric, transformation, and dataset version with the simulation.

No contributor should invent a precise score for a player without the agreed rubric and source notes. A defensible range with a reason is better than a false precision.

## All-time eligibility and current players

The Owner suggested that top current players should be eligible for all-time pools with about a minus-five score adjustment. Treat this as a proposed mode policy:

- Preserve the player’s source or base rating.
- Apply the adjustment as a named, versioned mode rule.
- Apply it only to the intended rating dimensions after the Owner chooses the rule.
- Make eligibility and adjustment testable.
- Do not apply both a season/era adjustment and the minus-five rule twice.
- Record exceptions and the policy version in results.

Clarify whether “top current players” means all current roster players, a threshold, or a curated set.

## Inclusion and review fairness

For an all-time pool:

- Set a stated inclusion definition before ranking.
- Seek meaningful positional/role coverage; do not let the biggest positions consume nearly the full pool.
- Include eras and teams deliberately.
- Use stable identities for players who changed teams or names.
- Keep eligibility distinct from selection in a particular simulated draft.
- Review outliers and omissions against an explicit checklist.
- Keep a revision history so a correction does not erase why a previous value was used.

## Quality gates

A dataset is ready for simulation only when:

- Required fields and types validate.
- IDs are unique and references resolve.
- Ratings stay within documented ranges.
- Provenance fields are present for every rating.
- Transformations are deterministic and versioned.
- Duplicate players and role conflicts have been reviewed.
- A sample simulation confirms the data loads and produces interpretable results.
- The Owner or delegated curator accepts unresolved policy choices.

Data quality is a product feature. The team should be able to explain a rating or eligibility choice rather than treating the dataset as an unquestioned oracle.
