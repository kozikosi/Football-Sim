# PROJECT SPEC: NBA Current Draft + Season Simulation

**Status:** Specification — awaiting Owner approval (R5)  
**Priority:** 3 (after v21 stabilization + NFL All-Time)  
**Base:** v21 stabilized engine (shared core)  
**Branch:** `sims/nba-current` (to be created)  
**Dependencies:** v21 stabilized engine, NBA 2K ratings dataset

---

## 1. Product Vision

An NBA Draft + Season simulator that mirrors the NFL Sim's structure but with basketball-specific math, positions, rules, and NBA-specific simulation engine. Users draft from current NBA players (~450), play 82-game regular season + playoffs + NBA Finals.

**Core Experience:**
- Draft from ~450 current NBA players
- NBA-specific positions (PG, SG, SF, PF, C) with flex rules
- 82-game regular season + play-in tournament + playoffs + NBA Finals
- NBA-specific stats (PER, TS%, WS, BPM, etc.)
- Salary cap & contract management (optional v21+)
- NBA-specific awards (MVP, DPOY, ROY, MIP, 6MOY, All-NBA, All-Defense)

---

## 2. Data Requirements

### 2.1 Player Dataset (~450 players)

| Position  | Count    | Source                          |
| --------- | -------- | ------------------------------- |
| PG        | ~60      | NBA 2K ratings (Owner provided) |
| SG        | ~70      | NBA 2K ratings                  |
| SF        | ~80      | NBA 2K ratings                  |
| PF        | ~70      | NBA 2K ratings                  |
| C         | ~50      | NBA 2K ratings                  |
| **Total** | **~450** | NBA 2K ratings (Owner provided) |

### 2.2 Rating Attributes (NBA 2K Style → Sim Attributes)

| NBA 2K Attribute  | Sim Attribute | Conversion Note                  |
| ----------------- | ------------- | -------------------------------- |
| Overall           | OVR           | Direct mapping                   |
| Three-Point Shot  | 3PT Rating    | Maps to 3PT shooting             |
| Mid-Range Shot    | MID Rating    | Maps to mid-range                |
| Free Throw        | FT Rating     | Maps to FT%                      |
| Ball Handle       | BH            | Maps to ball security/creation   |
| Pass Accuracy     | PA            | Maps to passing/playmaking       |
| Speed             | SPD           | Maps to speed/transition         |
| Acceleration      | ACC           | Maps to burst/first step         |
| Strength          | STR           | Maps to physicality/post         |
| Vertical          | VERT          | Maps to finishing/rim protection |
| Stamina           | STA           | Maps to minutes/endurance        |
| Perimeter Defense | PD            | Maps to perimeter D              |
| Interior Defense  | ID            | Maps to rim protection/post D    |
| Steal             | STL           | Maps to steal rate               |
| Block             | BLK           | Maps to block rate               |
| Offensive Rebound | OREB          | Maps to offensive rebounding     |
| Defensive Rebound | DREB          | Maps to defensive rebounding     |
| Layup             | LAY           | Maps to finishing at rim         |
| Dunk              | DNK           | Maps to dunking/athleticism      |
| Post Control      | PC            | Maps to post offense             |
| Draw Foul         | DF            | Maps to foul drawing             |

**OVR Formula (Proposed):**
```
OVR = weighted_sum(attributes) / max_possible * 99
```

---

## 3. Engine Modifications Required

### 3.1 Shared Core (Inherited from v21)

- [ ] SIM-CORE boundary + headless entry points
- [ ] Seeded RNG
- [ ] Persistence (localStorage)
- [ ] 17-function oracle + hash gate
- [ ] 390px element-level overflow gate
- [ ] Seeded RNG for reproducibility

### 3.2 NBA-Specific Engine Additions

#### 3.2.1 Position System

| NFL                        | NBA                                      |
| -------------------------- | ---------------------------------------- |
| QB, RB, WR, TE, OL         | PG, SG, SF, PF, C                        |
| Flex: OT↔OG↔C, WR↔TE, etc. | Flex: PG↔SG, SG↔SF, SF↔PF, PF↔C, C↔PF    |
| Roster: 26 starters        | Roster: 13 active (5 starters + 8 bench) |

**NBA Roster Slots:**
| Slot      | Count  | Flex Rules   |
| --------- | ------ | ------------ |
| PG        | 1      | PG↔SG        |
| SG        | 1      | SG↔PG, SG↔SF |
| SF        | 1      | SF↔SG, SF↔PF |
| PF        | 1      | PF↔SF, PF↔C  |
| C         | 1      | C↔PF         |
| Bench G   | 3      | G↔G          |
| Bench F   | 3      | F↔F          |
| Bench C   | 1      | C↔PF         |
| **Total** | **13** |              |

#### 3.2.2 NBA-Specific Valuation

**Weight Categories (Proposed):**
| Category          | Weight | NFL Equivalent |
| ----------------- | ------ | -------------- |
| Perimeter Scoring | 25%    | QB/Pass        |
| Interior Scoring  | 15%    | RB/Rush        |
| Playmaking        | 20%    | QB/Pass        |
| Perimeter Defense | 15%    | CB/Coverage    |
| Interior Defense  | 10%    | DL/Run D       |
| Rebounding        | 10%    | Run D/Front7   |
| Transition/ATH    | 5%     | Speed/ATH      |

#### 3.2.3 NBA Game Simulation

- **Quarters:** 4 × 12 min (vs NFL 4×15)
- **Shot Clock:** 24 sec (vs NFL 40 sec play clock)
- **Fouls:** 6 personal / team 5 per quarter (bonus)
- **3PT Line:** Critical spacing metric
- **Pace:** ~100 possessions/game (vs NFL ~12 drives)
- **Foul Trouble:** Key rotational mechanic

---

## 4. Data Pipeline

### NBA Data Sources

| Dataset                             | Source                               | Owner Action        |
| ----------------------------------- | ------------------------------------ | ------------------- |
| `datasets/nba-current/players.json` | NBA 2K ratings (Owner provides)      | Owner provides file |
| `datasets/nba-current/teams.json`   | 30 NBA teams + depth charts          | Council assembles   |
| `datasets/nba-current/ratings.json` | 2K attribute → sim attribute mapping | Council defines     |
| `datasets/nba-current/ruleset.json` | NBA rules (2024-25 season)           | Council assembles   |

### 4.2 NBA 2K → Sim Attribute Mapping (Proposed)

```javascript
const nba2kToSim = {
	ovr: attrs.overall,
	spd: Math.round((attrs.speed + attrs.acceleration) / 2),
	str: attrs.strength,
	agi: Math.round((attrs.vertical + attrs.lateral_quickness) / 2),
	cod: attrs.lateral_quickness,
	inj: Math.max(1, 100 - attrs.injury_prone * 2),
	awr: Math.round((attrs.basketball_iq + attrs.awareness) / 2),
	// NBA-specific
	three_pt: attrs.three_point_shot,
	mid_range: attrs.mid_range_shot,
	free_throw: attrs.free_throw,
	ball_handle: attrs.ball_handle,
	pass_acc: attrs.pass_accuracy,
	perimeter_d: attrs.perimeter_defense,
	interior_d: attrs.interior_defense,
	steal: attrs.steal,
	block: attrs.block,
	o_reb: attrs.offensive_rebound,
	d_reb: attrs.defensive_rebound,
	layup: attrs.layup,
	dunk: attrs.dunk,
	post_control: attrs.post_control,
	draw_foul: attrs.draw_foul,
};
```

---

## 5. NBA-Specific Engine Modifications

### 5.1 Game Simulation (`simulateGame`)

- **Pace Model:** Possessions-based (~100 possessions/game)
- **Shot Selection:** 3PT rate, mid-range, rim attempts by player tendencies
- **Defense:** Matchup-based (perimeter vs interior assignments)
- **Fouls:** Personal + team fouls, bonus, foul outs
- **Fatigue:** Stamina-based minutes management

### 5.2 Draft Engine

- **Draft Format:** 2 rounds (60 picks) + undrafted FA pool
- **Rookie Scale:** Contract values by draft position
- **Rookie Extensions:** Eligibility after year 3

### 5.3 Season Engine

- **Schedule:** 82 games, balanced (conf/division weights)
- **Play-In Tournament:** 7-10 seeds per conference
- **Playoffs:** 16 teams, 7-game series, 2-2-1-1-1 format
- **Finals:** 7-game series

---

## 6. NBA-Specific UI/UX

### 6.1 Draft Board

- **Positions:** PG, SG, SF, PF, C (color-coded)
- **Attributes:** Show 2K-style attributes on hover
- **Archetypes:** "3&D", "Playmaker", "Rim Protector", "Stretch Big", etc.

### 6.2 Season View

- **Standings:** Conference/Division, GB, Streak, L10
- **Player Stats:** Per-game, Advanced (PER, TS%, WS, BPM, VORP)
- **Team Stats:** ORtg, DRtg, Pace, eFG%, TOV%, ORB%, DRB%, FTr

### 6.3 Awards

- **Regular Season:** MVP, DPOY, ROY, MIP, 6MOY, COY, Executive
- **All-NBA:** 1st/2nd/3rd Team (positionless)
- **All-Defense:** 1st/2nd Team
- **All-Rookie:** 1st/2nd Team

---

## 6. Verification Gates (NBA-Specific)

1. **Draft Completeness** — 60 picks + UDFA pool filled
2. **Season Completeness** — 30 teams × 82 games = 1,230 games
3. **Playoffs** — 16 teams, correct bracket, correct format
4. **Stats Plausibility** — League averages within 5% of real NBA
5. **No Crashes** — 82-game season + playoffs completes
6. **rWeights equivalent** — NBA equivalent stat computed and valid

---

## 7. Acceptance Criteria (Gate 2 for NBA Current)

- [ ] 450 players loaded with NBA 2K ratings
- [ ] Draft completes (60 picks + UDFA)
- [ ] 82-game season completes for all 30 teams
- [ ] Playoffs + Finals complete correctly
- [ ] Stats plausible (within 5% of real NBA averages)
- [ ] Awards populate correctly
- [ ] All v21 gates still pass
- [ ] No regressions to NFL sim

---

## 8. Branch & Delivery

| Item            | Detail                                               |
| --------------- | ---------------------------------------------------- |
| **Branch**      | `sims/nba-current` (from `main` post-v21)            |
| **Data Dir**    | `datasets/nba-current/`                              |
| **Shared Code** | `shared/core/`, `shared/ui/`, `shared/verification/` |
| **Spec File**   | `docs/multi-sport/PROJECT_SPEC_NBA_CURRENT.md`       |
| **Tasks**       | `tasks/T-NBA-CURRENT-*`                              |

---

## 9. Risks & Mitigations

| Risk                  | Likelihood | Impact | Mitigation                             |
| --------------------- | ---------- | ------ | -------------------------------------- |
| 2K ratings access     | Low        | High   | Owner provides file directly           |
| NBA math complexity   | Medium     | High   | Incremental: draft → season → playoffs |
| Pace/possession model | Medium     | High   | Validate vs real NBA pace data         |
| Foul/bonus logic      | Medium     | High   | Test extensively vs real NBA rules     |
| Salary cap complexity | Low        | Medium | Defer to v22+ (optional)               |

---

**Status:** SPECIFICATION — Awaiting Owner approval to proceed after v21 + NFL All-Time.
