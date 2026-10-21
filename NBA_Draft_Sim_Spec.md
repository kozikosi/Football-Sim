# NBA Draft Simulation — Specification

## Scope
Create an NBA draft simulation using a distinct mathematical model from the NFL system. The simulation should follow the same architecture pattern (shared core + sport-specific engine) but apply different evaluation criteria appropriate to basketball.

## Player Pool
- **Target**: ~1,200 highest-rated NBA players across history (current + legends)
- **Eligibility**: All players in the pool are eligible; no "current-only" restriction
- **Rating Source**: `data/nba_all_time_ratings.json` with fields:
  - `playerId`, `name`, `position`, `team`, `era`
  - `peakRating`: float (0–100) – career-best single-season rating
  - `careerAverage`: float (0–100)
  - `provenance`
- **Rating Scale**: Same 0–100 scale as NFL; peak ratings derived from career-high seasons

## Draft Mechanics
- **Selection Order**: Standard 7-round, 30+ picks per round (typical NBA draft size)
- **Flex Rules** (see unresolved Q1): Basketball-specific flexibility (e.g., point guard who can play forward, small forwards who can play center)
- **Draft Length**: 7 rounds × 30 picks = 210 total selections
- **Team Constraints**: Each team selects exactly one player per round (no multiple first-round picks)

## Evaluation Model (Distinct from NFL)
- **Position-Specific Weighting**: Different positional multipliers for scoring, defense, and efficiency
- **Advanced Metrics**: Incorporate PER, Win Shares, Box Plus/Minus equivalents used in modern NBA analysis
- **Lineup Optimization**: Adapt the existing optimizer for basketball (small-forward-heavy lineups, role-based rotations)
- **Game Outcomes**: Use the season simulation (`core/simulate_game.js`) with NBA-specific rules
- **Playoffs**: Standard NBA playoffs (first to 6 wins in series)

## Output Requirements
- Complete season results (standings, win-loss records, playoff brackets)
- Per-game summaries showing selected units and their contributions
- Statistical summary: average rating of drafted players, distribution of peak ratings
- Visualization: interactive chart of draft order vs. final team composition

## Data Dependencies
- Core engine must be stable (V21 release completed)
- Rating data must be loaded before any draft simulation runs
- No external API calls during runtime (static JSON files)

## Acceptance Criteria
- [ ] Assembled candidate produces a complete season run without crashes
- [ ] Draft path covers all 210 selections correctly
- [ ] Playoff bracket resolves without errors
- [ ] Results are reproducible given the same input data
- [ ] Documentation includes setup instructions and known limitations
