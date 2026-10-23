# NFL All-Time Draft Season — Specification

## Scope

Build an all-time version of the current NFL draft simulator using the same evaluation model but with historical players (all top 1200 ranked by peak performance value). The simulation should run through a full season after the draft, producing game outcomes, standings, and playoff progression.

## Player Pool

- **Target**: ~1,200 highest-rated NFL players across history (current + legends)
- **Eligibility**: All players in the pool are eligible; no "current-only" restriction
- **Rating Source**: Create a shared JSON file (`data/nfl_all_time_ratings.json`) containing:
  - `playerId`: unique identifier
  - `name`, `position`, `team`, `era`
  - `peakRating`: float (0–100) representing career best performance
  - `careerAverage`: float (0–100) for comparison
  - `provenance`: source (e.g., "Pro Football Focus", "Basketball Reference equivalent")
- **Rating Scale**: Use the same scale as current ratings (-5 to high positive values). Peak ratings derived from career-high single-season performances.

## Draft Mechanics

- **Selection Order**: Teams select in standard order (1st pick = #1 overall)
- **Flex Rules** (see unresolved Q1): Define how flex positions work. Example: A quarterback may be listed as both QB and RB in the draft, allowing teams to use him at either position.
- **Draft Length**: Standard 7 rounds × 32 picks per round (256 total selections)
- **Player Availability**: Each team can only draft once per year; no re-drafting within the same season.

## Evaluation Model (Same as Current)

- **Unit Ratings**: Use the core valuation engine (`core/valuation.js`) which already computes unit scores based on position, performance metrics, and market factors.
- **Lineup Optimization**: Apply the existing optimal lineup algorithm (`core/lineup_optimizer.js`) to determine starting five for each matchup.
- **Game Outcomes**: Use the season simulation (`core/simulate_game.js`) with the same ruleset.
- **Playoffs**: Run the regular playoff bracket (AFC vs NFC, wild card format).

## Output Requirements

- Complete season results (standings, win-loss records, playoff brackets)
- Per-game summaries showing selected units and their contributions
- Statistical summary: average rating of drafted players, distribution of peak ratings
- Visualization: interactive chart of draft order vs. final team composition

## Data Dependencies

- Core engine must be stable (V21 release completed)
- Rating data must be loaded before any draft simulation runs
- No external API calls during runtime (use static JSON files)

## Acceptance Criteria

- [ ] Assembled candidate produces a complete season run without crashes
- [ ] Draft path covers all 256 selections correctly
- [ ] Playoff bracket resolves without errors
- [ ] Results are reproducible given the same input data
- [ ] Documentation includes setup instructions and known limitations
