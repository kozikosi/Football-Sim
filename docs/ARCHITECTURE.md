# ARCHITECTURE.md — Living Architecture Document

**Version:** 1.0 (post-merge, pre-v21)  
**Last Updated:** 2026-10-20  
**Author:** Nemo Ultra (nemotron-3-ultra-free)  
**Status:** Living document — updated with each merge

---

## 1. System Overview

### 1.1 Purpose
Single-file, browser-based NFL Draft Simulator with:
- 32-team snake draft simulator (26 rounds, 1,200+ Madden NFL 27 player ratings)
- Full 17-game season simulation with playoffs & Super Bowl
- Game-by-game simulation with box scores, recaps, advanced stats, awards
- Mobile-first responsive design (390px breakpoint)

### 1.2 Core Philosophy
- **Single-file constraint:** No build step, no CDN, no dependencies, works offline
- **Mathematical consistency:** Single source of truth for player valuations → draft → season → game outcomes
- **Evidence-based:** Every claim backed by command output; "a claim without a command is not a claim"
- **Single-file constraint is a feature:** No build step, no CDN, works offline

### 1.3 High-Level Data Flow
```
PLAYERS + TEAM_DATA + DEFAULT_WEIGHTS
    ↓
slotWins() / slotWinsPerOvr() / modelWeights()  →  Player/Slot Valuation
    ↓
optimalLineup() (Hungarian)  →  Optimal Roster Assignment
    ↓
teamRatings() → 9 Unit Ratings
    ↓
matchupModel() → Expected Points
    ↓
simulateGame() → Game Result + Box Score + Recap
    ↓
Season Engine → Standings → Playoffs → Super Bowl
```

---

## 2. Data Layer

### 2.1 Core Data Structures

| Variable | Type | Description |
|----------|------|-------------|
| `PLAYERS` | `Array<[name, pos, team, ovr, spd, str, agi, cod, inj, awr, xf?]>` | 1,200+ Madden NFL 27 player ratings |
| `TEAM_DATA` | `Object<teamName, {slot: {ovr, name}}>` | 32 team depth charts, 36 slots each |
| `DEFAULT_WEIGHTS` | `Object<slot, weight>` | Position-weight map (QB=320, OT=295, DE=350, CB=350, etc.) |
| `ROSTER_SLOTS` | `Array<slot>` | 26 starter slots drafted (excludes DL5, LB4, CB4, SS2, FS2, WR4, P, FB) |
| `FLEX` / `NATURAL_SLOT_MAP` | `Object` | Flex rules: which positions can play which slots, with rating penalties |

### 2.2 Flex System
- `NATURAL_SLOT_MAP`: Natural position → valid slots (e.g., `LT:['OT1','OT2']`)
- `FLEX`: Position → {slot: penalty} mapping for non-natural slots
- `effOvr(player, slot)` = `player.ovr - flexPenaltyFor(player.pos, slot)`
- **QB cannot flex** (`FLEX.QB = {}`)

### 2.3 Protected Constants (Immutable without Owner Approval)
| Constant | Description |
|----------|-------------|
| `DEFAULT_WEIGHTS` | Position weight map |
| `FLEX` | Flex penalty rules |
| `NATURAL_SLOT_MAP` | Natural position → slot mappings |
| `MC` | Matchup model coefficients |
| `PLAN_K` | Game plan coefficients |
| `RATING_SPECS` | Unit rating specifications |

---

## 3. Core Math Functions

### 3.1 Valuation Layer
| Function | Purpose | Key Formula |
|----------|---------|-------------|
| `slotWins(slot, ovr)` | Wins/season added by player at slot vs 70 baseline | Interpolated from `slotWinsTable()` |
| `slotWinsPerOvr()` | Marginal wins per +1 OVR at each slot (cached) | `(slotWins(slot,90) - slotWins(slot,70))/20` |
| `modelWeights()` | Converts `slotWinsPerOvr` to 0–700 scale (QB=700) | `w[k] = max(5, round(w[k]/max*700/5)*5)` |
| `replacementLevels(pool, rosters)` | Replacement OVR by position group | Nth-best available where N = open starters league-wide |
| `cpuPick(teamIndex, state)` | CPU GM logic: value over replacement × bias × noise | `w * bias * noise + 0.002*ovr` with miss rate |
| `optimalLineup(slotmap)` | Hungarian algorithm for max-wins slot assignment (flex-aware) | O(n³) Hungarian on 26×26 cost matrix |

### 3.2 Season Engine
| Function | Purpose |
|----------|---------|
| `teamRatings(slotmap)` | 9 unit ratings from lineup (flex penalties applied) |
| `matchupModel(O, D, lg, plan)` | Expected points from offensive/defensive unit ratings + game plan |
| `simulateGame()` | Realizes yards/TOs/sacks from model, adds noise, late-game script, OT |
| `playGame()` | Orchestrates `simulateGame()` + box score + recap + stats accumulation |
| `playoffBracket()` | 14-team NFL playoff bracket (WC → Divisional → Champ → SB) |

### 3.3 Game Simulation
| Component | Description |
|-----------|-------------|
| `matchupModel(O, D, lg, plan)` | Exponential yardage/points model with soft caps, game-plan adjustments |
| `simulateGame()` | Realizes yards/TOs/sacks from model, adds noise, late-game script, OT |
| `renderGameSummary()` | Generates narrative recap with chronological scoring, turnovers, game ball |
| `factorParagraph()` | "How it was decided" — unit swings, turnover battle, schedule luck |

---

## 3.4 Draft Simulator
| Component | Description |
|-----------|-------------|
| `cpuPick()` | CPU GM logic: value over replacement × bias × noise, with miss rate |
| `userFits()` | Player's best-fit open slots on user's roster (flex penalties included) |
| `renderDraftBoard2()` | Live draft board with Wins, Value, Priority, Gone%, #glue A/B phone block |
| `optimalLineup()` | Hungarian algorithm for max-wins slot assignment (flex-aware) |

---

## 4. Key Algorithms

### 4.1 Hungarian Algorithm (`optimalLineup`)
- **Input:** 26 players × 26 slots cost matrix
- **Cost:** `-slotWins(slot, effOvr(player, slot))` for legal slots; `1e6` for illegal
- **Output:** Optimal slot assignment maximizing total wins
- **Used by:** CPU (binding) and User (advisory)

### 4.2 Matchup Model (`matchupModel`)
- **Inputs:** 9 offensive unit ratings, 9 defensive unit ratings, league averages, game plan
- **Core:** Exponential yardage model with soft caps (`softCap(x, lo, hi)`)
- **Channels:** Rush, Pass, Turnovers, Sacks, Kicking, Returns
- **Game Plans:** 15 offensive (5 personnel × 3 strategies) × 6 defensive (2 packages × 3 focuses)
- **Output:** Expected points, channel breakdowns, per-unit swings, SD

### 4.3 Season Simulation
- **Schedule:** 17 weeks, 6 division games + 11 non-division, balanced home/away
- **Standings:** Win% → H2H → Division record → Conference record → Point diff
- **Playoffs:** 14-team bracket (WC → Divisional → Champ → SB)
- **Awards:** MVP, OPOY, DPOY, Coach, statistical leaders, All-Pro, Pro Bowl

---

## 5. UI Architecture

### 5.1 Tab Structure
1. **Season** (default) — Draft handoff → Preseason → Regular Season → Playoffs → Super Bowl → Review
2. **Draft** — Setup → Live Board → Priority Chart → Roster → Results
3. **Supplementary (bottom links):** Team Rankings, Player Browser, Position Rankings, Team Comparison, Guide

### 5.2 Mobile-First Responsive System
- **Breakpoint:** `@media (max-width:760px)`
- **Pattern:** Tables → Stacked cards (`.mstack`) with `data-label` attributes
- **Draft Board:** 12-column CSS grid cards (`data-nostack="1"` opt-out)
- **Font:** `html{font-size:21px;}` desktop → `16px` mobile

### 5.3 Visual Design System
- **CSS Variables:** `--bg`, `--panel`, `--panel2`, `--text`, `--sub`, `--accent`, `--accent2`, `--border`, `--good`, `--bad`
- **Themes:** Dark default + `@media (prefers-color-scheme: light)` support
- **Color Scheme:** `light dark` (donor) — v20 `light` was incorrect

---

## 6. Data Flow Summary

```
Draft (26 rounds × 32 teams)
    → optimalLineup() per team
    → teamRatings() → 9 unit ratings
    → leagueBaseline() → league averages
    → teamIdentity() → coaching philosophy per team
    → schedule generation (17 weeks)
    → simulateGame() per game
    → accumulatePlayerStats() → player stats + awards
    → standings → playoffs → Super Bowl
    → awards (MVP, OPOY, DPOY, Coach, stats, All-Pro, Pro Bowl)
    → Season Review + 100-season regression (pw4.js)
```

---

## 7. Invariants & Constraints

| Category | Rule |
|----------|------|
| **Math** | `modelWeights()` = inverse of `slotWinsPerOvr()` (QB=700) |
| **Draft** | CPU never values slot below 76 OVR replacement (`rlow`) |
| **Flex** | `effOvr()` used everywhere (draft, lineup, season, game) |
| **Lineup** | User (advisory) + CPU (binding) both use `optimalLineup()` |
| **Game Plans** | Offense/Defense chosen independently vs. expected opponent |
| **Scoring** | `POINTS_PER_WIN = 32.5` (Pythagenpat) |
| **Records** | `SEASON_RECORD_CAPS` truncates at real NFL records |
| **Standings** | NFL tiebreakers: H2H → Division → Conference → Point Diff |
| **File** | Single HTML, no build step, no CDN, no paid APIs |
| **Data** | Never invent ratings, teams, or stats |

---

## 7. Extension Points

| Extension Point | Current State | v21 Target |
|-----------------|---------------|------------|
| SIM-CORE boundary | Markers absent | Markers + 3 headless entry points |
| RNG | 58 `Math.random()` unseeded | Seeded `rng(seed)` indirection |
| Persistence | None | localStorage auto-save/resume |
| Harness | Manual browser only | 5 scripts in `tests/` + CI |
| Mobile | Two patterns (mstack + 12-col) | Single 12-col grid standard |
| Testing | Manual browser only | Automated suite + CI |
| Persistence | None | localStorage auto-save/resume |

---

## 8. Verified Seeds (Canonical Reference)

| Metric | Value | Source |
|--------|-------|--------|
| v20 sha256 | `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` | `shasum -a 256` |
| v20 size | 649,032 B | `wc -c` |
| Donor sha256 | `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` | `shasum -a 256` |
| Donor size | 650,127 B | `wc -c` |
| v20 git blob | `86878f2b340c7fc37c17614409690f9fdd3e1857` | `git hash-object` |
| Donor git blob | `2c4e025208bc6e324e445dd1bfb7aade30437c76` | `git hash-object` |
| Math core hash (8 fns) | `dc54e4210ce1` | Pickle extraction |
| cpuPick donor pin | `94b878605b73` | Full-body extraction |
| render100 donor pin | `cc1016eacc78` | Full-body extraction |
| cpuPick donor SHA1 | `a2b8190e98f8` | Full-body extraction |
| cpuPick v20 SHA1 | `fa6d752969e4` | Full-body extraction |
| render100 donor SHA1 | `cc1016eacc78` | Full-body extraction |
| render100 v20 SHA1 | `1ea6e8414397` | Full-body extraction |

---

*This document is the single source of truth for architecture. Update with each merge. Every claim must have a receipt command.*