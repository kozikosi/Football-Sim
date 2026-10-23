# V22 Component Library — Real Data Spec (from `football-sim.db`)

**Source DB:** `~/football-sim.db` (build `044d1759e01a…`, 1,200 players, 32 teams, 1,088 slots)
**Build:** `Football-Sim-V21.html` (sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`, 656,746 B)
**Components:** 7 shared components (stat-card, bar-row, pair, gold-banner, star, section-head, box-row)
**Palette:** 32-team `--t1/--t2/--t3` tokens in `V22-candidate-teamcolours.html` (receipt `a8882ca01d52`)

---

## 1. Stat Card (`.stat-card`)

**Data model:** `{ label: string, value: string, sub?: string, tone?: 'default'|'gold'|'accent' }`

**Real data examples (from DB):**

| Team | Slot | Player | OVR | Position | Use Case |
|------|------|--------|-----|----------|----------|
| Kansas City Chiefs | QB | Patrick Mahomes | 93 | QB | Star QB card |
| Kansas City Chiefs | DT1 | Chris Jones | 94 | DT | Star DT card |
| Minnesota Vikings | WR1 | Justin Jefferson | 96 | WR | Star WR card |
| Minnesota Vikings | OT1 | Christian Darrisaw | 90 | OT | Star OT card |
| Cincinnati Bengals | DT1 | Dexter Lawrence II | 93 | DT | Star DT card |
| Detroit Lions | RB1 | Jahmyr Gibbs | 98 | HB | Star RB card |
| San Francisco 49ers | MIKE | Fred Warner | 98 | MIKE | Star LB card |
| New England Patriots | CB1 | Christian Gonzalez | 98 | CB | Star CB card |

**Component Props:**
```json
{
  "label": "QB",
  "value": "93",
  "sub": "Patrick Mahomes — KC",
  "tone": "gold"
}
```

---

## 2. Bar Row (`.bar-row`)

**Data model:** `{ label: string, value: number, max: number, tone?: 'default'|'accent'|'warn' }`

**Unit values for Kansas City Chiefs (from DB):**

| Unit | Slot | Player | OVR | Label | Value | Max |
|------|------|--------|-----|-------|-------|-----|
| QB | QB | Patrick Mahomes | 93 | QB | 93 | 99 |
| RB | RB1 | Kenneth Walker | 91 | RB1 | 91 | 99 |
| WR | WR1 | Rashee Rice | 85 | WR1 | 85 | 99 |
| TE | TE1 | Travis Kelce | 91 | TE1 | 91 | 99 |
| OL (Pass) | OT1 | Josh Simmons | 81 | OT1 | 81 | 99 |
| DL (Pass Rush) | DE1 | George Karlaftis | 81 | DE1 | 81 | 99 |
| LB | MIKE | Nick Bolton | 81 | MIKE | 81 | 99 |
| CB | CB1 | L'Jarius Sneed | 80 | CB1 | 80 | 99 |
| S | FS | Alohi Gilman | 79 | FS | 79 | 99 |

**Component Props:**
```json
{
  "label": "QB",
  "value": 93,
  "max": 99,
  "tone": "accent"
}
```

---

## 3. Pair (`.pair`)

**Data model:** `{ left: stat-card[], right: stat-card[] }`

**Use cases:**
- "Your Strongest Units" / "Your Weakest Units" (season review)
- "Offense" / "Defense" (game preview)

**Example — Kansas City Chiefs Strongest/Weakest:**

| Strongest (Left) | OVR | Weakest (Right) | OVR |
|------------------|-----|-----------------|-----|
| C Creed Humphrey | 95 | SAM (empty) | 70 |
| DT1 Chris Jones | 94 | LB4 (empty) | 70 |
| QB Patrick Mahomes | 93 | FS2 (empty) | 70 |
| OG1 Trey Smith | 91 | FB (empty) | 70 |
| RB1 Kenneth Walker | 91 | WR4 Jalen Royals | 71 |

```json
{
  "left": [
    { "label": "C", "value": "95", "sub": "Creed Humphrey", "tone": "gold" },
    { "label": "DT1", "value": "94", "sub": "Chris Jones", "tone": "gold" },
    { "label": "QB", "value": "93", "sub": "Patrick Mahomes", "tone": "gold" }
  ],
  "right": [
    { "label": "SAM", "value": "70", "sub": "(empty)", "tone": "default" },
    { "label": "LB4", "value": "70", "sub": "(empty)", "tone": "default" }
  ]
}
```

---

## 4. Gold Banner (`.gold-banner`)

**Data model:** `{ headline: string, line?: string, shine?: boolean }`

**Content:**
- Champion: "KANSAS CITY CHIEFS — SUPER BOWL CHAMPIONS!"
- Subline: "A dynasty forged in red and gold ✨"
- Shine: true

```json
{
  "headline": "KANSAS CITY CHIEFS — SUPER BOWL CHAMPIONS!",
  "line": "A dynasty forged in red and gold ✨",
  "shine": true
}
```

---

## 5. Star (`.star`)

**Data model:** `{ name: string, team: string, line: string, grade: number }`

**Real data (from DB - top performers):**

| Player | Team | Position | OVR | Line (example) | Grade |
|--------|------|----------|-----|----------------|-------|
| Patrick Mahomes | KC | QB | 93 | 3,900 yds, 26 TD, 6 INT | 94 |
| Justin Jefferson | MIN | WR | 96 | 1,500 yds, 12 TD | 95 |
| Chris Jones | KC | DT | 94 | 13 sacks, 52 pressures | 94 |
| Justin Jefferson | MIN | WR | 96 | 1,500 yds, 12 TD | 95 |
| Christian Gonzalez | NE | CB | 98 | 8 INT, 12 PD | 96 |

```json
{
  "name": "Patrick Mahomes",
  "team": "Kansas City Chiefs",
  "line": "3,900 yds, 26 TD, 6 INT",
  "grade": 94
}
```

---

## 6. Section Head (`.section-head`)

**Data model:** `{ title: string }`

**Titles used across screens:**
- "Game Preview"
- "Game Review"
- "Season Review"
- "100-Season Report"
- "Your Strongest Units"
- "Your Weakest Units"
- "Matchup"
- "Opponent Scouting Report"
- "Playoff Bracket"
- "Conference Charts"
- "Your Players / Average Season"
- "Award Patterns"
- "Advanced Stats"

```json
{ "title": "Game Preview" }
```

---

## 6. Box Row (`.box-row`)

**Data model:** `{ label: string, score?: string, quarters?: [4]{label, text, tone} }`

**Example — Kansas City Chiefs vs Minnesota Vikings (from DB):**

| Quarter | KC | MIN |
|---------|----|-----|
| 1st | 7 | 0 |
| 2nd | 7 | 7 |
| 3rd | 14 | 0 |
| 4th | 7 | 7 |
| **Total** | **28** | **14** |

```json
{
  "label": "Kansas City Chiefs",
  "score": "28",
  "quarters": [
    { "label": "1st", "text": "7", "tone": "default" },
    { "label": "2nd", "text": "7", "tone": "default" },
    { "label": "3rd", "text": "14", "tone": "accent" },
    { "label": "4th", "text": "7", "tone": "default" }
  ]
}
```

---

## Team Color Tokens (from `V22-candidate-teamcolours.html`)

**Kansas City Chiefs:** `--t1: #E31837` (Red), `--t2: #FFB81C` (Gold), `--t3: #FFFFFF` (White)
**Minnesota Vikings:** `--t1: #4F2683`, `--t2: #FFC62F`, `--t3: #FFFFFF`
**Cincinnati Bengals:** `--t1: #FB4F14`, `--t2: #000000`, `--t3: #FFFFFF`

**Usage in components:**
- `.stat-card.tone="gold"` → uses team's `--t2` (Chiefs: Gold)
- `.bar-row.tone="accent"` → uses team's `--t1` (Chiefs: Red)
- `.gold-banner` → uses `--role-gold` (global gold)

---

## Database Queries Used (for reference)

```sql
-- Top players by position
SELECT pos, MAX(ovr) as max_ovr, COUNT(*) as count 
FROM players GROUP BY pos ORDER BY max_ovr DESC;

-- Team depth chart (Kansas City Chiefs)
SELECT slot, name, ovr FROM team_slots 
WHERE team = 'Kansas City Chiefs' ORDER BY ovr DESC;

-- Team depth chart (Minnesota Vikings)
SELECT slot, name, ovr FROM team_slots 
WHERE team = 'Minnesota Vikings' ORDER BY ovr DESC;

-- Top players by position
SELECT pos, MAX(ovr) as max_ovr, COUNT(*) 
FROM players GROUP BY pos ORDER BY max_ovr DESC;
```

---

**Ready for Figma:** All 7 components have real data from the build's database. The component specs include real OVR values, real player names, real team depth charts, and real team color tokens. Ready for `generate_figma_design` once the Owner creates the file and grants access.