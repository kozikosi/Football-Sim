# Soccer Current Player Database

## Directory Structure
```
soccer-current/
├── data/
│   ├── players-template.json    # Player database template (JSON)
│   ├── players-template.csv     # Player database template (CSV)
│   └── players.json             # Actual player database (to be populated)
```

## Data Format
Follows the same structure as NFL/NBA current simulations:
- Array of player objects with standardized schema
- Soccer-specific attributes: pac, sho, pas, dri, def, phy
- Position codes: GK, RB, LB, CB1, CB2, CDM, CM, CAM, RW, LW, ST (+ depth)
- Leagues: Premier League, La Liga, Bundesliga, Serie A, Ligue 1, MLS
- Era: Current season (e.g., "2024-25")

## Source
Per Owner directive: "Use whatever you want for the soccer source. All simulations should follow same format as the current football sim."

Recommended source: clubelo.com Elo ratings (public, reproducible, global coverage including MLS)

## Population Process
1. Council members claim positions/leagues to research
2. Ratings derived from chosen source (clubelo.com Elo recommended)
3. Owner reviews and approves final pool
3. Total target: ~1,500-2,000 players across all leagues