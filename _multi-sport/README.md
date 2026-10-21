# Multi-Sport Expansion — Master Roadmap

**Owner:** the user (permissions, publishing, roster, conceptual direction)
**Architect:** Claude (technical authority on all builds)
**Council:** equal advisors (no rank, no deputies)
**Status:** planning phase — no code written yet

---

## 1. Vision

The NFL Draft Simulator is one of many sports simulations the Owner wants to build. The ultimate goal: **at least 8 simulations (current + all-time) across the four major American sports**, plus current and all-time simulations for the top football leagues ranked above MLS (and including MLS).

The priority order (Owner-defined):

1. **Current NFL Sim** — already built (v20 reference + donor merge in progress)
2. **NFL All-Time Sim** — ~1,200 best all-time NFL players, ratings created collectively
3. **NBA Current Sim** — practically the same engine as the NFL sim but with NBA-specific math
4. **NBA All-Time Sim** — same engine as #3, all-time player pool
5. **Other sports** — MLB, NHL, MLS, and top football leagues (Premier League, La Liga, Bundesliga, Serie A, Ligue 1, etc.)

The NBA is the sport the Owner knows best after football. It will be tackled second.

---

## 2. Architecture decision: separate folders, shared engine concept

**Recommendation: each sport gets its own folder under `_multi-sport/`, but they share a common engine template derived from the NFL sim.**

### Why not one giant file?

The NFL sim is already 649 KB. Adding NBA, MLB, NHL, etc. into one file would make it unmanageable (multi-megabyte, untestable, unverifiable). The single-file constraint (AGENTS.md: "no split without explicit request") applies to the *NFL product file*, not to the multi-sport expansion.

### Why not completely independent?

Each sport sim should follow the same architectural pattern (data layer, core math, season engine, playoffs, awards, matchup model) so that:
- Agents can transfer knowledge between sports.
- The harness (pw4.js, validate.js, phone.js) can be adapted per sport.
- The council's verification culture applies uniformly.

### Recommended structure

```
/multi-sport/                          (or _multi-sport/ in the NFL repo)
├── README.md                          (this file — master roadmap)
├── STRUCTURE.md                       (folder structure guide)
├── CONTRIBUTION-GUIDE.md              (how agents contribute)
├── QUESTIONS-FOR-OWNER.md              (fundamental concept questions per sport)
├── shared/                            (common engine template — forked from NFL sim)
│   ├── engine-template.html           (stripped NFL sim: no player data, no team data)
│   ├── season-engine.js               (generic season sim: schedule, playoffs, awards)
│   ├── matchup-model.js               (generic unit-rating → points model)
│   └── harness/                       (generic harness: pw4, validate, phone, funcdiff)
├── nfl-current/                       (symlink or copy of the main NFL sim)
│   └── (existing product files)
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
└── other-sports/                      (future: MLB, NHL, MLS, football leagues)
    └── (placeholder)
```

### Key principle: fork, don't branch

Each sport sim starts as a fork of the NFL sim's *structure* (data layer, math, season engine) but with sport-specific data and math. The NFL sim remains the reference. Changes to the NFL sim's engine (e.g., better matchup model) can be ported to other sports, but each sport owns its own file and its own math.

---

## 3. The four priority projects

### Project 1: Current NFL Sim (in progress)
- **Status:** merge in progress (v20 + donor fixes)
- **Owner:** Claude (Architect) + council
- **Data:** real Madden NFL 27 ratings (1,200+ players, 32 teams)
- **Goal:** ship the merged build, then v21 (SIM-CORE, seeded RNG, persistence, harness)

### Project 2: NFL All-Time Sim
- **Status:** planning
- **Data needed:** ~1,200 best all-time NFL players (all top current players eligible with ~-5 rating adjustment)
- **Ratings:** must be created collectively by the council (no existing dataset). The Owner can provide guidance on methodology.
- **Math:** same engine as Project 1 (NFL math), but with all-time player pool and era adjustments.
- **Challenge:** rating players from different eras fairly. A 1980s QB and a 2020s QB need comparable ratings. The Owner's guidance on era adjustments is critical.

### Project 3: NBA Current Sim
- **Status:** planning (Owner knows NBA best after football)
- **Data:** ~450 current NBA players (rosters, ratings). Owner can transmit NBA2K ratings directly.
- **Math:** fundamentally different from NFL. Basketball has no "draft" in the same sense (no snake draft with CPU GMs valuing positions). The season engine needs: 82-game schedule, 30 teams, playoffs (play-in + 8-team bracket), different stat categories (points, rebounds, assists, steals, blocks, turnovers, FG%, 3P%, FT%).
- **Matchup model:** different unit ratings (PG, SG, SF, PF, C, bench depth, coaching, pace, defense). Points model based on offensive/defensive efficiency, pace, and shooting percentages.
- **Challenge:** the NFL sim's position-weight system (QB=700, OT=295, etc.) doesn't map to basketball. Need a new valuation system.

### Project 4: NBA All-Time Sim
- **Status:** planning
- **Data:** ~1,200 best all-time NBA players (all top current players eligible with ~-5 rating adjustment)
- **Math:** same engine as Project 3 (NBA math), but with all-time player pool and era adjustments.
- **Challenge:** same era-adjustment problem as Project 2, but for basketball (e.g., 1960s center vs 2020s guard).

---

## 4. The all-time player pool: collective creation

For both NFL and NBA all-time sims, the council must create the player pool. This is the biggest data challenge.

### Methodology (proposed)

1. **Start with current players.** All top current players are eligible, with a -5 OVR adjustment (to account for era inflation).
2. **Add historical greats.** The Owner and council propose historical players with estimated ratings.
3. **Era adjustment.** Players from earlier eras get a rating adjustment based on the era's competitive level. The Owner provides guidance on era tiers.
4. **Position balance.** Ensure roughly equal representation across positions (NFL: 26 starter slots; NBA: 5 starter slots + bench).
5. **Verification.** Every rating must be sourced (Owner input, consensus, or cited reference). No invented ratings.

### Data format (NFL)

Same as PLAYERS array: `[name, pos, team, ovr, spd, str, agi, cod, inj, awr, xf?]`
- `team` = the team the player is most associated with (for all-time, this is their primary team)
- `ovr` = overall rating (with era adjustment)
- Other attributes = estimated from career stats and scouting reports

### Data format (NBA)

New format needed: `[name, pos, team, ovr, pts, reb, ast, stl, blk, tov, fg%, 3p%, ft%, spd, str, agi, awr, inj, xf?]`
- `pos` = PG, SG, SF, PF, C
- `ovr` = overall rating
- Stat columns = career per-game averages (or era-adjusted)
- `xf` = X-factor (optional)

---

## 5. The NBA engine: key differences from NFL

| Aspect | NFL | NBA |
|--------|-----|-----|
| **Teams** | 32 | 30 |
| **Schedule** | 17 games | 82 games |
| **Playoffs** | 14 teams (7 per conference) | 20 teams (play-in + 8 per conference) |
| **Draft** | 26-round snake draft, 32 teams | No draft (or a different format) |
| **Positions** | QB, RB, WR, TE, OT, OG, C, DE, DT, LB, CB, S, K | PG, SG, SF, PF, C |
| **Unit ratings** | 9 (QB, RB, WR/TE, OL run/pass, pass rush, run defense, coverage, kicker) | 7 (PG, SG, SF, PF, C, bench, coaching) |
| **Matchup model** | Yardage/points from unit ratings + game plan | Offensive/defensive efficiency, pace, shooting % |
| **Awards** | MVP, OPOY, DPOY, OROY, DROY, etc. | MVP, ROY, DPOY, 6MOY, MIP, All-NBA, All-Defense |
| **Stats** | Passing/rushing/receiving yards, TDs, sacks, INTs, etc. | Points, rebounds, assists, steals, blocks, turnovers, FG%, 3P%, FT% |

### NBA-specific concepts

- **Pace**: possessions per game. Affects scoring volume.
- **Efficiency**: points per 100 possessions (offensive and defensive).
- **Usage rate**: % of team possessions used by a player.
- **True shooting %**: shooting efficiency accounting for 3-pointers and free throws.
- **Win shares**: estimated wins contributed by a player.
- **Player Efficiency Rating (PER)**: a per-minute productivity metric.

### NBA flex rules (proposed)

Basketball has natural position flexibility:
- PG ↔ SG (combo guard)
- SG ↔ SF (wing)
- SF ↔ PF (forward)
- PF ↔ C (big)

Flex penalty: -3 OVR for adjacent positions, -7 for two positions apart, -12 for three positions apart. PG cannot play C, C cannot play PG.

### NBA matchup model (proposed)

Expected points per game = f(offensive efficiency, defensive efficiency, pace, home court advantage)
- Offensive efficiency = weighted average of starting 5's offensive ratings
- Defensive efficiency = weighted average of starting 5's defensive ratings
- Pace = (team pace + opponent pace) / 2
- Home court advantage = +3 points (NBA average)

---

## 6. Folder structure decision

**Recommendation: separate folders under `_multi-sport/`, each sport owns its own sim file.**

### Why not branch from the NFL sim?

The NFL sim is a single 649KB file with NFL-specific data, math, and UI baked in. Branching it for NBA would mean:
- Replacing all player data (1,200 NFL → 450 NBA)
- Rewriting all math (football → basketball)
- Rewriting all UI (football positions → basketball positions)
- Maintaining two divergent copies of the same 649KB base

This is error-prone and wasteful. Instead:

### Recommended approach: template extraction

1. **Extract a generic engine template** from the NFL sim (post-merge). Strip all NFL data and NFL-specific math. Keep: season engine structure, playoff bracket logic, awards framework, matchup model skeleton, UI shell, mobile CSS.

2. **Each sport forks the template** and adds: sport-specific data, sport-specific math, sport-specific UI, sport-specific awards.

3. **The NFL sim remains the reference.** When the engine improves (e.g., better matchup model), port the improvement to other sports.

4. **Shared harness.** The harness scripts (pw4, validate, phone, funcdiff) are generic — each sport gets its own instance with sport-specific targets.

### Folder structure

```
/multi-sport/
├── README.md                    (this file — master roadmap)
├── STRUCTURE.md                 (folder structure guide)
├── CONTRIBUTION-GUIDE.md        (how agents contribute)
├── QUESTIONS-FOR-OWNER.md        (fundamental concept questions per sport)
├── shared/                      (common engine template)
│   ├── engine-template.html     (stripped NFL sim: no data, no sport math)
│   ├── season-engine.js         (generic: schedule, playoffs, awards)
│   ├── matchup-model.js         (generic: unit ratings → points)
│   └── harness/                 (generic: pw4, validate, phone, funcdiff)
├── nfl-current/                 (symlink to main NFL sim)
├── nfl-alltime/                 (NFL all-time sim)
│   ├── data/                    (all-time player pool)
│   ├── weights/                 (position weights, flex rules)
│   └── sim.html                 (the sim)
├── nba-current/                 (NBA current sim)
│   ├── data/                    (current NBA players)
│   ├── weights/                 (position weights, flex rules)
│   └── sim.html
├── nba-alltime/                 (NBA all-time sim)
│   ├── data/                    (all-time NBA players)
│   ├── weights/
│   └── sim.html
└── other-sports/                (future)
    ├── mlb/
    ├── nhl/
    ├── mls/
    └── football-leagues/        (Premier League, La Liga, etc.)
```

### Why this works

- **Isolation:** each sport owns its own files. No cross-contamination.
- **Knowledge transfer:** the engine template and contribution guide ensure agents can move between sports.
- **Verification:** each sport gets its own harness instance with sport-specific targets.
- **Scalability:** adding a new sport = fork the template + add data + adapt math. No changes to existing sports.

---

## 7. Contribution system

### For council agents

1. **Read this document first** — understand the vision, the structure, and the priority order.
2. **Pick a project** from the priority list (or propose a new one).
3. **Read the relevant sport's folder** — understand the data format, the math, and the UI.
4. **File your contribution** in the appropriate location:
   - Code proposals → `SUBMISSIONS.md` (your own section, S-### ID)
   - Questions for the Owner → `QUESTIONS-FOR-OWNER.md`
   - Reviews/critiques → your `_agents/<name>/` folder
   - Bulletin messages → `COUNCIL-BULLETIN.md` (read the tail first, take next free M-number)
5. **Follow the rules:** R1–R5, house rules, English only, evidence tags, append-only.
6. **Never edit another agent's files** (R5). Suggest, don't touch.
7. **Never edit product files** — Claude implements. You propose.

### For the Owner

1. **Conceptual guidance** — answer questions in `QUESTIONS-FOR-OWNER.md` tagged `[ANSWERED <date>]`.
2. **Data transmission** — provide player ratings (NBA2K for NBA, collective creation for all-time).
3. **Era adjustments** — define era tiers and adjustment rules for all-time sims.
4. **Priority decisions** — which sport to tackle next, which features to prioritize.
5. **Approval** — approve protected constants changes, new files, structural changes.

### For Claude (Architect)

1. **Technical authority** — decides what enters the build.
2. **Engine template** — extracts the generic engine from the NFL sim post-merge.
3. **Math design** — designs sport-specific matchup models and season engines.
4. **Implementation** — builds each sport's sim from the template + data + math.

---

## 8. Questions for the Owner (fundamental concepts)

See `QUESTIONS-FOR-OWNER.md` for the full list. Summary:

### NFL All-Time
- Q-NFL-AT-1: Era adjustment methodology — how to rate players from different eras?
- Q-NFL-AT-2: Team assignment — which team does an all-time player belong to?
- Q-NFL-AT-3: Flex rules — same as current NFL, or adjusted for era?
- Q-NFL-AT-4: Draft format — same 26-round snake draft, or shorter?
- Q-NFL-AT-5: Season length — 17 games (current) or era-appropriate?

### NBA Current
- Q-NBA-1: Position valuation — how do we value PG vs C in basketball?
- Q-NBA-2: Flex rules — which positions can play which slots, and with what penalty?
- Q-NBA-3: Matchup model — offensive/defensive efficiency, pace, shooting %?
- Q-NBA-4: Season length — 82 games, or shorter for sim purposes?
- Q-NBA-5: Playoffs — play-in tournament + 8-team bracket, or simplified?
- Q-NBA-6: Awards — which awards matter most for the sim?
- Q-NBA-7: Stats — which per-game stats to track (points, rebounds, assists, steals, blocks, turnovers, FG%, 3P%, FT%)?

### NBA All-Time
- Q-NBA-AT-1: Era adjustment — how to rate players from the 1960s vs 2020s?
- Q-NBA-AT-2: Team assignment — primary team for all-time greats?
- Q-NBA-AT-3: Position flexibility — same as current NBA, or adjusted for era?
- Q-NBA-AT-4: Draft format — same as NBA current, or different?

### Other Sports
- Q-OTHER-1: Which football leagues to include? (Premier League, La Liga, Bundesliga, Serie A, Ligue 1, MLS)
- Q-OTHER-2: Same engine template, or sport-specific?
- Q-OTHER-3: Player ratings — FIFA ratings? Custom? Collective?

---

## 9. Encouragement for the council

**You are building something that doesn't exist yet.** There is no multi-sport draft simulator with real ratings, a full season engine, and a council of AI advisors verifying every claim. The NFL sim is the foundation. The NBA sim is the next step. The all-time sims are the dream.

**Your job is to make it better.** Not by agreeing, but by finding what's wrong, proposing what's missing, and verifying what's claimed. The council's culture — receipts, evidence, append-only, no editing others' work — exists so that disagreement produces better ideas, not worse ones.

**If you're new here:** read `INDEX.md` → `ONBOARDING.md` → `CHRONICLE.md` → `COUNCIL-BULLETIN.md` → `AGENTS.md`. Then read this document. Then pick a project and contribute. Your ID block is the next free S-range past what CHRONICLE records.

**If you're stuck:** post a question in `QUESTIONS-FOR-OWNER.md` (for the Owner) or `QUESTIONS-FOR-THE-ARCHITECT.md` (for Claude). Tag it `[BLOCKING]` / `[NOW]` / `[LATER]` / `[OPEN]`.

**If you find a bug:** write it up where the Architect can act on it — don't fix it. The council proposes; Claude implements.

**If you have an idea:** file it in `SUBMISSIONS.md` (your own section, S-### ID) with the exact code, blast radius, and evidence. A number without a command is prose.

The merge has priority. But the vision is the destination. Let's build it.

---

## 10. Expanded concepts

### 10.1 The NBA engine in detail

The NBA sim needs a fundamentally different math model than the NFL sim. Here's a proposed design:

**Unit ratings (7):** PG, SG, SF, PF, C, bench (BENCH1-5 composite), coaching.

**Offensive rating:** weighted average of starting 5's offensive ratings.
- PG offensive rating = f(pts, ast, tov, fg%, tp%, ft%, usage%)
- SG offensive rating = f(pts, fg%, tp%, ft%, usage%)
- SF offensive rating = f(pts, reb, fg%, tp%, usage%)
- PF offensive rating = f(pts, reb, fg%, usage%)
- C offensive rating = f(pts, reb, fg%, usage%)

**Defensive rating:** weighted average of starting 5's defensive ratings.
- PG defensive rating = f(stl, tov forced, def rating)
- SG defensive rating = f(stl, def rating)
- SF defensive rating = f(stl, blk, def rating)
- PF defensive rating = f(reb, blk, def rating)
- C defensive rating = f(reb, blk, def rating)

**Pace:** (team pace + opponent pace) / 2. Pace = possessions per game.

**Expected points per game:**
```
off_eff = (team_off_rating + opponent_def_rating) / 2  // weighted
def_eff = (team_def_rating + opponent_off_rating) / 2
expected_pts = (off_eff * pace / 100) + home_court_advantage
```

**Game plan adjustments:**
- Offense: pace-up (faster, more possessions), pace-down (slower, fewer possessions), attack inside (more 2-point attempts), attack outside (more 3-point attempts), balanced
- Defense: pack paint (reduce opponent 2-point %), close out (reduce opponent 3-point %), switch everything, drop coverage, balanced

**Home court advantage:** +3 points (NBA average, can be adjusted per team).

**Playoffs:** Play-in tournament (7-10 seeds per conference) → 8-team bracket per conference → Finals (best-of-7).

**Awards:** MVP (best overall), ROY (best rookie), DPOY (best defensive rating), 6MOY (best bench player), MIP (most improved), All-NBA (1st/2nd/3rd team), All-Defense (1st/2nd team), All-Rookie (1st/2nd team).

### 10.2 The all-time era adjustment system

For both NFL and NBA all-time sims, players from different eras need comparable ratings. Proposed system:

**Era tiers (NFL):**
- 1960s: -8 (pre-merger, fewer teams, less competition)
- 1970s: -6 (post-merger, growing competition)
- 1980s: -4 (modern era begins)
- 1990s: -2 (salary cap era, more parity)
- 2000s: 0 (baseline)
- 2010s: +2 (analytics era, more athletic)
- 2020s: +4 (current, most athletic)

**Era tiers (NBA):**
- 1960s: -8 (pre-merger, fewer teams, less athleticism)
- 1970s: -6 (ABA merger, growing competition)
- 1980s: -4 (Magic/Bird era, modern basketball begins)
- 1990s: -2 (Jordan era, defensive era)
- 2000s: 0 (baseline)
- 2010s: +2 (analytics era, 3-point revolution)
- 2020s: +4 (current, most athletic)

**Current players:** all eligible with -5 OVR adjustment (to account for era inflation — current players are rated against current competition, which is the most athletic era).

**Verification:** compare adjusted ratings to known performance metrics (PER for NBA, EPA for NFL). If a player's adjusted rating doesn't match their known performance, flag for review.

### 10.3 The data submission workflow

1. **Owner transmits data** (NBA2K ratings for NBA, collective creation for all-time).
2. **Agents validate** the data against the schema and validation rules.
3. **Agents propose** the data as a submission in SUBMISSIONS.md (S-### ID).
4. **Claude reviews** the data and implements it in the sim.
5. **Verifier checks** the data (row count, position balance, no duplicates, all required fields present).
6. **Owner publishes** the updated sim.

### 10.4 The harness for multi-sport

Each sport gets its own harness instance with sport-specific targets:

| Script | NFL target | NBA target |
|--------|-----------|------------|
| pw4.js | r > 0.6 (100-season win correlation) | r > 0.5 (100-season win correlation, lower bar for first version) |
| validate.js | r ≈ 0.66, ρ ≈ 0.69, RMSE ≈ 2.6 (2025 wins) | r ≈ 0.60, ρ ≈ 0.65, RMSE ≈ 3.0 (2025 wins) |
| phone.js | 0 overflow at 390px | 0 overflow at 390px |
| funcdiff.js | function-level build differ | same |
| run_all.sh | composite runner | same |

### 10.5 The UI for multi-sport

The sim's UI is sport-agnostic in structure (tabs, tables, mobile CSS) but sport-specific in content:
- **Draft board:** position names, stat columns, OVR display
- **Season view:** schedule, standings, box scores, recaps
- **Playoffs:** bracket (NFL: 14 teams; NBA: 20 teams with play-in)
- **Awards:** sport-specific award names and criteria
- **Player browser:** sport-specific stat columns and filters

The UI shell (tabs, tables, mobile CSS, dark theme) is shared. Only the content differs.

### 10.6 The contribution cadence

1. **Owner transmits data** (NBA2K ratings, era guidance, conceptual decisions).
2. **Agents validate and propose** (data submissions, math proposals, UI proposals).
3. **Claude implements** (builds the sim from template + data + math).
4. **Verifier checks** (harness, E2E, mobile).
5. **Owner publishes** (pushes to repo, updates STATUS.md).
6. **Council reviews** (next round: critique, verify, propose improvements).

Repeat for each sport. The NFL sim is the reference; improvements port to other sports.

---

## Questions for the council (expand on these)

See `_multi-sport/QUESTIONS-FOR-OWNER.md` for the full list. New questions added below:

### Architecture
- Q-ARCH-1: Should the engine template be extracted as a separate file (engine-template.html) or as a section within each sport's sim? (Recommendation: separate file, so improvements port easily.)
- Q-ARCH-2: Should the harness be shared (one set of scripts, sport-specific targets) or separate (one set per sport)? (Recommendation: shared scripts, sport-specific config files.)
- Q-ARCH-3: Should the data be in the HTML file (like the NFL sim) or in separate JS files? (Recommendation: separate JS files for maintainability, loaded by the HTML.)

### NBA-specific
- Q-NBA-9: Should the NBA sim have a draft? If so, what format? (Fantasy draft, rookie draft, or no draft?)
- Q-NBA-10: How many games per season? 82 (real) or 41 (shortened for sim speed)?
- Q-NBA-11: Should the NBA sim track advanced stats (PER, TS%, USG%, WS) or just basic stats?
- Q-NBA-12: Should the NBA sim have a salary cap / trade system, or just a season sim?

### All-time
- Q-AT-1: Should all-time sims use the same draft format as current sims, or a different one (e.g., all-time draft with all players eligible)?
- Q-AT-2: Should all-time sims have era-specific rules (e.g., no 3-point line for pre-1980 NBA)?
- Q-AT-3: How to handle players who played in multiple eras (e.g., LeBron in 2000s and 2010s)?

### Other sports
- Q-OTHER-6: Should football leagues (Premier League, etc.) use the same engine as the NFL sim or a different one? (Recommendation: different engine — no playoffs, round-robin table, different scoring.)
- Q-OTHER-7: Should MLB use a completely different engine (162 games, no draft in the same sense)? (Recommendation: yes, different engine.)
- Q-OTHER-8: Should we prioritize MLB or NHL over football leagues? (Recommendation: football leagues first — the Owner mentioned them specifically.)
