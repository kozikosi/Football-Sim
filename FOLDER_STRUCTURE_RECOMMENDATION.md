# Folder Structure Recommendation

## Current Approach: One Product Family, Modular by Sport

### Why This Structure Works

1. **Shared Core, Isolated Variants** – The `core/` directory contains the universal simulation engine that all sports use. This avoids duplication while allowing sport-specific differences.

2. **Clear Ownership** – Each sport lives in its own `sports/<sport>/` subdirectory. When adding a new sport (e.g., soccer), you simply create a new folder under `sports/` and implement it there. There is no risk of accidentally modifying another sport's code.

3. **Easy Extension** – New sports can be added incrementally. The core remains stable because sports only add entry points, they don't touch the core.

4. **Consistent Development Experience** – Every contributor knows exactly where to look for their sport's code. The `web/` layer is shared, so UI changes benefit all sports automatically.

### Recommended Directory Layout

```
Football-Sim/
├── core/                    # Shared engine (immutable after V21 stabilization)
│   ├── engine.js
│   ├── valuation.js         # Rating models (position-weighted, salary-based)
│   ├── lineup_optimizer.js  # OptimalLineup algorithm
│   ├── draft_engine.js      # State construction & CPU selection
│   └── game_plan.js         # Offensive/defensive planning
├── sports/                   # Sport-specific implementations
│   ├── football/             # NFL simulator (current + all-time)
│   │   ├── ratings.json      # ~1200 all-time player ratings
│   │   ├── draft_sim.js      # NFL draft simulation
│   │   ├── all_time_draft.js # NFL all-time draft simulation
│   │   └── matchup_model.js  # Unit-level matchup scoring
│   ├── basketball/           # NBA simulator (current + all-time)
│   │   ├── ratings.json      # ~1200 NBA player ratings
│   │   ├── draft_sim.js      # NBA draft simulation
│   │   └── all_time_draft.js # NBA all-time draft simulation
│   └── soccer/               # Soccer league simulations (future)
│       ├── ratings.json
│       ├── draft_sim.js
│       └── all_time_draft.js
├── data/                     # External datasets (versioned)
│   ├── nfl_all_time_ratings.json
│   ├── nba_all_time_ratings.json
│   └── soccer_all_time_ratings.json
├── web/                       # Shared frontend shell
│   ├── index.html
│   ├── dashboard.js
│   └── responsive.css
└── tests/                     # Test suites
    ├── test_football_draft.js
    ├── test_basketball_draft.js
    └── test_soccer_draft.js
```

### Answers to Your Question

**Should each project be its own Folder or branch out from existing systems?**

**Yes — each sport gets its own folder under `sports/`.** This is the recommended approach because:

- It keeps sport-specific code isolated and easy to understand
- It prevents accidental cross-contamination between sports
- It allows parallel development (each sport can be worked on independently)
- It aligns with the "shared-engine, modular-variant" architecture

**How contributions flow:**

1. **New Sport**: Create a new folder under `sports/` (e.g., `sports/soccer/`). Implement the sport-specific modules inside it. No changes needed to `core/` or other sports.

2. **Enhancement to Existing Sport**: Stay within the existing sport folder. For example, improving the NFL draft simulation stays in `sports/football/`.

3. **Data Updates**: Edit files in `data/` (e.g., `data/nfl_all_time_ratings.json`). These are treated as configuration, not code.

4. **Cross-Cutting Changes**: If a change affects multiple sports (e.g., updating the core evaluation model), make it in `core/` and ensure all sport folders continue to compile.

### Coupling Rules

- **Code ↔ Markup**: The web shell is thin. It renders data from the core engine. Changing markup doesn't require recompiling the engine.
- **Data ↔ Rules**: Ratings live in `data/`; they reference rules defined in `core/`. This separation means you can update ratings without touching the engine.
- **Verification**: Each sport has its own test file (`tests/sport-<name>.js`) that runs against the assembled candidate. This ensures independence.

### Migration Path

If you prefer a more decentralized approach (each sport as its own repository):
- **Pros**: Complete isolation, faster local iteration
- **Cons**: Duplication of common patterns, harder to share improvements, inconsistent APIs
- **Recommendation**: Stick with the single-product-family approach until V21 is fully stabilized. The current architecture already supports this cleanly.

## Summary

- **One canonical source** (`core/`) for all sports
- **Modular extensions** via `sports/<sport>/` folders
- **Shared infrastructure** (`web/`, `data/`, `tests/`) that benefits all sports
- **Contribution workflow**: branch → implement → verify → merge

This structure scales well as you add more sports and complexity increases.