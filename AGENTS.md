# AGENTS.md — Instructions for AI Coding Agents

## Project Purpose
This is a **Madden NFL 27 Team Power Rankings, Fantasy Draft & Season Simulator** — a single-file HTML application containing:
- 1,200+ real Madden NFL 27 player ratings (`PLAYERS` array)
- 32 team depth charts (`TEAM_DATA` object)
- Customizable position weights (`DEFAULT_WEIGHTS`) with synergy penalties
- **Draft Simulator**: 32-team snake draft with CPU GMs using the same valuation math as the season engine
- **Season Engine**: 17-game schedule, 14-team playoff bracket, game-by-game simulation with box scores, recaps, advanced stats, awards
- **Matchup Model**: Nine unit ratings (QB, RB, WR/TE, OL run/pass, pass rush, run defense, coverage, kicker) feed an exponential yardage/points model with game-plan adjustments

---

## Architecture Overview

### Data Layer (embedded in HTML)
| Variable | Purpose |
|----------|---------|
| `PLAYERS` | Array of `[name, pos, team, ovr, spd, str, agi, cod, inj, awr, xf?]` — 1,200+ entries |
| `TEAM_DATA` | Object: `teamName -> {slot: {ovr, name}}` for 36 roster slots per team |
| `DEFAULT_WEIGHTS` | Position-weight map (QB=320, OT=295, DE=350, CB=350, etc.) |
| `ROSTER_SLOTS` | 26 starter slots drafted (excludes DL5, LB4, CB4, SS2, FS2, WR4, P, FB) |
| `FLEX` / `NATURAL_SLOT_MAP` | Flex rules: which positions can play which slots, with rating penalties |

### Core Math Functions (do not modify without approval)
| Function | Purpose |
|----------|---------|
| `slotWins(slot, ovr)` | Wins/season added by a player at `slot` with given OVR vs. 70 baseline |
| `slotWinsPerOvr()` | Marginal wins per +1 OVR at each slot (cached) |
| `modelWeights()` | Converts `slotWinsPerOvr` to 0–700 scale (QB=700) |
| `replacementLevels(pool, rosters)` | Replacement OVR by position group based on remaining starters league-wide |
| `cpuPick(teamIndex, state)` | CPU GM logic: value over replacement × bias × noise, with miss rate |
| `matchupModel(O, D, lg, plan)` | Expected points from offensive/defensive unit ratings + game plan |
| `teamRatings(slotmap)` | Nine unit ratings from lineup (flex penalties applied) |
| `simulateGame()` | Realizes yards/TOs/sacks from model, adds noise, late-game script, OT |
| `optimalLineup(slotmap)` | Hungarian algorithm for max-wins slot assignment (flex-aware) |

### UI Tabs (in DOM order)
1. **Draft Simulator** (default active) — setup, live draft board, priority chart, roster depth chart
2. **Team Rankings** — left panel weights, right panel sortable table with detail panels
3. **Player Browser** — searchable/sortable table with position/team filters
4. **Position Rankings** — unit/group averages across league
5. **Team Comparison** — side-by-side lineup + unit grades
6. **Guide** — collapsible sections explaining every concept

### Season Phases (state machine in `seasonState.phase`)
`preseason` → `regular` (weeks 1–17) → `regularReview` → `playoffs` (wildcard→divisional→champ→superbowl) → `complete`

---

## Critical Invariants (Never Break These)

1. **Weight ↔ Wins Consistency**: `modelWeights()` must remain the inverse of `slotWinsPerOvr()`. The 700-scale is derived, not arbitrary.
2. **Replacement Floor**: CPU drafts never value a slot below 76 OVR replacement (see `rlow` in `cpuPick`).
3. **Flex Penalties Apply Everywhere**: `effOvr(player, slot)` used in draft board, lineup editor, season ratings, game simulation.
4. **Hungarian Lineup Optimizer**: Both user (advisory) and CPU (binding) use `optimalLineup()` — same math.
5. **Game Plans Are Independent**: Offense and defense chosen separately; coaches scored vs. *expected* opponent plan, not actual.
6. **32.5 Points Per Win**: `POINTS_PER_WIN = 32.5` converts point differentials to wins (Pythagenpat-based).
7. **Single-Season Record Caps**: `SEASON_RECORD_CAPS` truncates stats at real NFL records (5400 pass yds, 2060 rush, etc.).
8. **Deterministic Seeding**: NFL tiebreakers (H2H → division → conference → point diff) in `sortStandings()`.

---

## Required Workflow for Any Change

1. **Read the relevant section first** — understand the function, its callers, and its tests.
2. **Propose the change** — explain *what* and *why* before editing. Include the exact lines you'd modify.
3. **Make minimal edits** — touch only the necessary functions/variables.
4. **Test the math** — run the validation checks:
   - `node pw4.js` (draft → season → playoffs → 100-sim regression)
   - `node validate.js` (real 2025 wins: r≈0.66, ρ≈0.69, RMSE≈2.6)
   - `bash tests/run_all.sh` (t30/t32/cal2/cal3)
5. **Verify UI** — `node phone.js` (390px overflow check), manual tab navigation.
6. **Summarize** — what changed, why, how tested.

---

## Prohibited Actions
- ❌ Change `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC` coefficients, `PLAN_K`, `RATING_SPECS` without approval
- ❌ Invent player ratings, team assignments, or statistical outputs
- ❌ Add paid APIs, CDN dependencies, or build steps
- ❌ Split the single HTML file without explicit request
- ❌ Create git commits/branches/PRs unless asked

---

## Key Files & Entry Points
- **Only file**: `Madden NFL 27 Team Power Rankings & Draft Simulator (7).html`
- **Validation scripts** (in `p/` folder if present): `pw4.js`, `validate.js`, `phone.js`, `mk.sh`
- **Test runner**: `bash tests/run_all.sh`

---

## Quick Reference: Where to Look

| Task | Search For |
|------|------------|
| Draft board columns | `boardEntries()`, `renderDraftBoard2()` |
| CPU draft logic | `cpuPick()`, `cpuBias()`, `cpuNoise()`, `cpuMiss()` |
| Season simulation | `simulateGame()`, `playGame()`, `simulateCurrentWeek()` |
| Matchup math | `matchupModel()`, `applyOffPlan()`, `applyDefPlan()` |
| Lineup/flex | `optimalLineup()`, `effOvr()`, `flexPenaltyFor()`, `lineupEditorHTML()` |
| Game plans | `ensureGamePlans()`, `teamIdentity()`, `planWhy()` |
| Recaps/narrative | `generateGameSummary()`, `playByPlay()`, `factorParagraph()` |
| Awards | `computeRegularSeasonAwards()`, `computePlayoffAwards()` |
| Mobile CSS | `@media (max-width:760px)` block |
| Weight controls | `buildControls()`, `modelWeights()`, `personalWeights` |

---

## Style Rules (from project conventions)
- Plain informative language; no "expected scoring"/"before kickoff" in post-game text
- Critique only 85+ OVR players in recaps
- Stats kept near real NFL records (enforced by `SEASON_RECORD_CAPS`)
- User's team shown in blue (`.ub` class, MutationObserver on `.ub`)
- "2-Pt Conv" not "two-point conversion" (except Guide)
- No "with no strong lean either way" anywhere
- Flex is realistic (not an exploit); QB **cannot** flex

---

## Testing Checklist Before Delivery
- [ ] Draft completes without errors (all 32 teams, 26 rounds)
- [ ] Season sims to completion (regular + playoffs + Super Bowl)
- [ ] 100-season validation (`pw4.js`) produces r > 0.6
- [ ] Phone layout: no horizontal scroll at 390px (`phone.js`)
- [ ] Weight changes recalc instantly in Team Rankings
- [ ] Flex penalties visible in draft board "Value here" column
- [ ] Game recaps show chronological scoring + turnovers + game ball
- [ ] No console errors in browser devtools