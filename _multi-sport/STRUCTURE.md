# STRUCTURE.md — folder structure guide for multi-sport expansion

**Purpose.** Explains the recommended folder structure and the reasoning behind it. Companions: `README.md` (master roadmap), `CONTRIBUTION-GUIDE.md` (how to contribute).

---

## Recommended structure: separate folders, shared engine concept

```
/multi-sport/
├── README.md                          (master roadmap — read first)
├── STRUCTURE.md                       (this file)
├── CONTRIBUTION-GUIDE.md              (how agents contribute)
├── QUESTIONS-FOR-OWNER.md             (fundamental concept questions)
├── shared/                            (common engine template — forked from NFL sim)
│   ├── engine-template.html           (stripped NFL sim: no data, no sport math)
│   ├── season-engine.js               (generic: schedule, playoffs, awards)
│   ├── matchup-model.js               (generic: unit ratings → points)
│   └── harness/                       (generic: pw4, validate, phone, funcdiff)
├── nfl-current/                       (symlink or copy of the main NFL sim)
├── nfl-alltime/                       (NFL all-time sim)
│   ├── data/                          (all-time player pool, ~1200 players)
│   ├── weights/                       (position weights, flex rules)
│   └── sim.html                       (the sim itself)
├── nba-current/                       (NBA current sim)
│   ├── data/                          (current NBA players, ~450 players)
│   ├── weights/                       (position weights, flex rules)
│   └── sim.html
├── nba-alltime/                       (NBA all-time sim)
│   ├── data/                          (all-time NBA players, ~1200 players)
│   ├── weights/
│   └── sim.html
└── other-sports/                      (future)
    ├── mlb/
    ├── nhl/
    ├── mls/
    └── football-leagues/              (Premier League, La Liga, etc.)
```

## Why separate folders?

1. **Isolation.** Each sport owns its own files. No cross-contamination. A change to the NBA sim doesn't break the NFL sim.
2. **Knowledge transfer.** The engine template and contribution guide ensure agents can move between sports. The architecture is the same; only the data and math differ.
3. **Verification.** Each sport gets its own harness instance with sport-specific targets. The NFL sim's `r > 0.6` target doesn't apply to NBA.
4. **Scalability.** Adding a new sport = fork the template + add data + adapt math. No changes to existing sports.

## Why not one giant file?

The NFL sim is already 649 KB. Adding NBA, MLB, NHL, etc. into one file would make it unmanageable (multi-megabyte, untestable, unverifiable). The single-file constraint (AGENTS.md: "no split without explicit request") applies to the *NFL product file*, not to the multi-sport expansion.

## Why not completely independent?

Each sport sim should follow the same architectural pattern (data layer, core math, season engine, playoffs, awards, matchup model) so that:
- Agents can transfer knowledge between sports.
- The harness can be adapted per sport.
- The council's verification culture applies uniformly.

## The shared engine template

The template is extracted from the NFL sim (post-merge) by stripping all NFL data and NFL-specific math. What remains:

- Season engine structure (schedule generation, week advancement, playoff bracket)
- Playoff bracket logic (seeding, byes, matchups)
- Awards framework (MVP, rookie of the year, etc.)
- Matchup model skeleton (unit ratings → expected points)
- UI shell (tabs, tables, mobile CSS)
- Mobile CSS (760px breakpoint, mstack pattern)
- Harness integration points (SIM-CORE markers, headless entry points)

What is NOT in the template:
- Player data (PLAYERS array, TEAM_DATA)
- Position weights (DEFAULT_WEIGHTS)
- Flex rules (FLEX, NATURAL_SLOT_MAP)
- Sport-specific math (slotWins, matchupModel coefficients)
- Sport-specific awards (NFL awards vs NBA awards)

## Folder naming convention

- `nfl-current/` — current NFL sim (symlink to the main product file)
- `nfl-alltime/` — NFL all-time sim
- `nba-current/` — NBA current sim
- `nba-alltime/` — NBA all-time sim
- `other-sports/mlb/` — MLB sim
- `other-sports/nhl/` — NHL sim
- `other-sports/mls/` — MLS sim
- `other-sports/football-leagues/` — top football leagues

## File naming within each sport folder

- `sim.html` — the sim itself (single-file HTML, following the NFL sim's pattern)
- `data/players.js` — player pool (extracted from sim.html for maintainability)
- `data/teams.js` — team data (extracted from sim.html)
- `weights/default.js` — position weights and flex rules
- `harness/` — sport-specific harness scripts (pw4, validate, phone, funcdiff, run_all)
- `README.md` — sport-specific notes (data sources, math differences, known issues)

## How to start a new sport

1. Copy `shared/engine-template.html` to `<sport>/sim.html`.
2. Add sport-specific player data to `data/players.js`.
3. Add sport-specific team data to `data/teams.js`.
4. Adapt the math (position weights, flex rules, matchup model, awards).
5. Adapt the UI (position names, stat columns, award names).
6. Create harness scripts (adapt from NFL harness).
7. File a submission in `SUBMISSIONS.md` (your own section, S-### ID).
8. Log arrival in `CHRONICLE.md` with evidence.

## What NOT to do

- Do not put multiple sports in one file. Each sport owns its own sim.html.
- Do not modify the NFL sim's protected constants (DEFAULT_WEIGHTS, FLEX, etc.) for another sport. Each sport has its own.
- Do not share player data between sports. NFL players and NBA players are different data.
- Do not assume the NFL math applies to other sports. Each sport needs its own matchup model.
