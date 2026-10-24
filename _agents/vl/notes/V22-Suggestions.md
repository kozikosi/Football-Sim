# V22-Suggestions.md

**Source:** Kosi (Owner) prompts of 21–22 Oct 2026 + council contributions  
**Applies to:** `Football-Sim-PreColors.html` (Pre-Colors, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B) → build as `Football-Sim-V23.html`  
**Status:** Specification for Claude (Architect). Advisor VL cannot edit product files per R5.  
**Format:** Code snippets with comments indicating file location, add/subtract/replace intent, decision authority, and mermaid diagrams where relationships are complex.  
**Tools:** biome (v2.6.2, via npx) for formatting/linting; mermaid diagrams as markdown code blocks for Claude to render.  
**R5 compliance:** No product file edited; no other session's content touched; no `session_send` executed.  
**OpenChamber note:** No task is assigned to a specific agent. All tasks are posted openly; whichever agent is available picks up the task in priority order.  
**Build naming:** `V21` and `V22` are retired. `Pre-Colors` (`40233d6b…`, 657,486 B) is the only valid build. `V23` is the next build, written only by Claude. `merged.html` / `Football-Sim-V21.html` (`044d1759…`, 656,746 B) is INVALID — hand edit changes model output (Math.LN2 in PERS['11']).

---

## HOW TO USE THIS DOCUMENT

Each section has:
- **Location** — where in `merged.html` to look
- **Decision authority** — who decides (Claude = Architect, Kosi = Owner)
- **Code snippets** — `<!-- Before: ... -->` / `<!-- After: ... -->` pattern for exact string replacement
- **JS/CSS blocks** — ready to paste into `<script>` or `<style>`
- **Mermaid diagrams** — relationship maps Claude can render or convert to UI logic

Changes are in priority order. Tackle them in sequence. biome-format all JS/CSS after edits.

---

## PRIORITY ORDER

| # | Area | Change |
|---|------|--------|
| P0 | Take what's built | Verify V22-candidate-2026-10-21.html and V22-candidate-teamcolours.html; diff don't rebuild |
| P1 | Copy passes | Verbatim before→after for preseason, preview, review, season review, 100-season |
| P2 | Labels & mechanics | Flex tables, 3-4 mapping, unlocked coaching, nose/LB swap, "CB3 / Nickel", no left/right, last "value" mention removed |
| 1 | Flex Rules | 3-4 / 4-3 base selection + new flex matrix + roster slot mapping |
| 2 | Coaching Philosophy | Unlocked all season; description change |
| 3 | Draft Board | Remove "Value Here" visual (math unchanged); dynamic round number; Undo rename |
| 4 | Draft Board | "Reading the draft board" simplification; star system removal |
| 5 | Draft Board | Position cards mobile collapse + team colors + roster order |
| 6 | Draft Board | Cooper Dejean FS flex glitch fix |
| 7 | Draft Board | Text size ("You're on the clock") + board expansion |
| 8 | Draft Board | "Your Pick order / Roster Depth Chart" Horizontal layout |
| 9 | Draft Board | "1 of 26 starters · +3.69 wins" moved to bottom |
| 10 | Draft Board | Remove "MORE" from tab footer |
| 11 | Draft Board | Badges moved under "Save My Weights" |
| 12 | Draft Board | "Use model weights" → "Default" |
| 13 | Draft Board | "Save My Weights" state logic (transparent → blue) |
| 14 | Draft Board | Default weights (Owner values) |
| 15 | Draft Board | Local storage persistence |
| 16 | Team Comparison | Remove "real"; remove effective ratings text; parentheses removal; offense/defense reorganization; Chiefs vs Raiders default |
| 17 | Guide Page | Remove Guide Box; rewrite item 1; remove stats parenthetical; Wins table simplification; weight adjustments; arithmetic fixes; flex rules explanation; 3-4/4-3 explanation |
| 18 | Position Rankings | Dropdown combinations + pluralization + (WR1+WR2+WR3) notation |
| 19 | Player Browser | ~15 players desktop; footer tabs always visible |
| 20 | Star Criteria | 60 yards rushing all players; 300 yards + 3 TD / 1 INT reaction for QBs; Punter weight ~1 |
| 21 | Game Previews/Reviews | Graphical UI; fewer full sentences; beautiful stars; box score styling |
| 22 | Season Review | Larger centered banner; 3+ seconds; shimmer/sparkle; gold theme |
| 23 | Playoffs | March Madness bracket; bye week matchup preview; "Lineup and flexes" not at top |
| 24 | Awards | More beautiful; gold for user players; game ball always in key players |
| 25 | Super Bowl | More beautiful hype text with exclamation point; gold shimmer banner |
| 26 | Motion Graphics | Confetti; banners; text animations; reduced-motion guard |
| 27 | Season Review Button | Blue, near top, next to 100 season simulation |
| 28 | Seasons by Win Total | Fix left alignment; center table |
| 29 | Your Players/Award Patterns | Higher up; automatically visible |
| 30 | Remove Realism Audit/Model Predict | Hidden from user; stored internally |
| 31 | Season Review Critique | Indentation; biggest/ugliest win as stats; players on own lines; better final sentence |
| 32 | Why Better/Worse Ratings | Graphical; three bars |
| 33 | Draft Critique | Remove "Early picks" phrase; hide "What separated playoff teams" behind click |
| 34 | QB Sacks | Write as "x Sacked" not "Sacked zx" |
| 35 | Aesthetics | Team color theming; typography; buttons; tables; mobile; empty states; motion |
| 36 | Version Rename | Best version → Football-Sim-V21.html; new build → Football-Sim-V22.html |
| 37 | AGENTS.md | Review and improve council operating framework |
| P6 | Chores | Re-anchor anchors against Football-Sim-V21.html; trim bulletin into _archive/; sweep biome findings |

---

## P0 · TAKE WHAT'S BUILT

**Location:** `_agents/minimax/prototypes/`  
**Decision authority:** Kosi (Owner) — which candidate to promote; Claude (Architect) — build execution

**Verified artifacts (do not rebuild):**

| File | Size | Hash | Status |
|------|------|------|--------|
| `V22-candidate-2026-10-21.html` | 660,046 B | e5fa7e0e… | Gate-verified — Owner's first three briefs applied |
| `V22-candidate-teamcolours.html` | 659,305 B | 7eeffa86… | Gate-verified — same plus 32-team palette |

**Action:** Diff both candidates against `merged.html`. Take the teamcolours build for anything visual (the two touch the same lines). Do not rebuild — diff only.

---

## P1 · COPY PASSES (Verbatim Before→After)

**Location:** Preseason menu, game preview, game review, season review, 100-season report  
**Decision authority:** Kisi (Owner) — exact wording; Claude (Architect) — implementation

All changes are written as before → after and meant to be applied **verbatim**.

### P1a: Coaching Philosophy — Unlocked

```html
<!-- Before: "Your coaching philosophy and aggressiveness are locked in once you simulate Week 1" -->
<!-- After:  "Your coaching philosophy and aggressiveness can be adjusted any time during the season." -->

<!-- Before: "Your coaching philosophy is how your team likes to play by default, on offense and on defense. It names your team's style all season, and Opponents scout it." -->
<!-- After:  "Your coaching philosophy is how your team likes to play by default. Opponents scout it." -->
```

### P1b: Game Preview — Team Attribution

```html
<!-- Before: "The Chiefs visit the Vikings to open the season, one team built around its run defense, the other around its secondary." -->
<!-- After:  Add "(Chiefs)" / "(Vikings)" after "run defense" and "secondary" so the reader knows which team is which. -->
```

### P1c: Game Preview — Under Center Rewrite

```html
<!-- Before: "Under center it is Matthew Stafford (99) against Geno Smith (74). All eyes will be on Matthew Stafford (QB, 99) and Christian Gonzalez (CB1, 98), the players each defense has to game-plan around." -->
<!-- After:  "Under center for the Chiefs is Matthew Stafford (99) against the Vikings' Geno Smith (74)." -->
<!-- Remove: "All eyes will be on…" line — a cornerback does not draw the opposing defence's plan. -->
```

### P1c: Game Preview — Remove "+x points per game"

```html
<!-- Remove: "Against an average team the first is worth roughly +2.3 points a game, so whichever side flinches loses ground." -->
<!-- Remove: All similar "+x points per game" statements. -->
<!-- Keep: Overall rating lean as "+3.3 points" (betting-line style). -->
```

### P1c: Game Preview — Em Dashes to Periods

```html
<!-- Before: "The Chiefs are a balanced offense with two tight ends team by nature, and the model expects 12 personnel, run-heavy this week — as the favorite they would rather shorten the game and protect the football and the pair of tight ends (Dallas Goedert 89 and Evan Engram 78) can do the job." -->
<!-- After:  Split into two sentences. Replace em dash with period. -->
```

### P1c: Game Preview — Package Subtitles Removed

```html
<!-- Before: "Nickel (a nickel defense focused on the pass)" -->
<!-- After:  "Nickel" or "Nickel • Pass Protection" or "Nickel • Run Defense" -->
<!-- Remove: All long parentheticals "(a nickel defense focused on the pass)". -->
```

### P1c: Game Preview — Overall Line

```html
<!-- Before: "The ratings lean the Chiefs by about 3.3, but that margin is thinner than any coach wants to admit." -->
<!-- After:  "+3.3 points" — betting-line style, only overall prediction. -->
```

### P1d: Game Review — Box Score Lines

```html
<!-- Before: "D'Andre Swift ran it in for a touchdown (Chiefs 7–0)." -->
<!-- After:  "Rushing TD • D'Andre Swift (Chiefs 7-0)" -->
```

### P1d: Game Review — Turnovers Score Summary

```html
<!-- Before: "The Chiefs came out one turnover ahead: Geno Smith was intercepted by Jaylon Johnson in the fourth quarter." -->
<!-- After:  "Turnovers: Chiefs 1 - 0 Vikings" / "Jaylon Johnson interception (4th Q)" -->
```

### P1d: Game Review — Star Criteria

```html
<!-- Offensive players need at least 60 yards to be mentioned. -->
<!-- QBs need at least 300 yards and 3 TD / 1 INT ratio to be mentioned. -->
<!-- Reserve star slots for +90 rating performances (rating not shown to user). -->
<!-- Replace "Stars of the game:" with a star glyph (maybe glittering). -->
```

### P1d: Game Review — "How It Was Decided"

```html
<!-- Remove: All "+x points to the Chiefs" phrases except overall "+3.3 points". -->
<!-- Pass rush: "but" not "and". Remove "+1.3 points" swing phrase. -->
<!-- 1–2 sacks = mid; 3+ sacks = exceptional. -->
<!-- "The Chiefs move to 1-0; the Vikings slip to 0-1." → own paragraph. -->
```

### P1d: Game Review — Game Plans Hidden

```html
<!-- The "Game plans" block should be hidden behind an arrow dropdown menu. -->
```

### P1e: Season Review — Banner

```html
<!-- Much larger, centered, remains on screen 3+ seconds. -->
<!-- Shimmer/sparkle animation after it lands. -->
<!-- Gold theme for Super Bowl. -->
```

### P1e: Season Review — Player Insights Higher Up

```html
<!-- "Your players; average season" and "Award patterns" moved higher up and automatically visible. -->
```

### P1e: Season Review — Remove Realism Audit

```html
<!-- Remove: "Realism audit & league-wide records" and "Does the model predict real results?" from user view. -->
<!-- Store internally. -->
```

---

## 2. COACHING PHILOSOPHY — Unlocked All Season

**Location:** Coaching philosophy section  
**Decision authority:** Claude (Architect) — UI + logic

### 2a. Remove Lock After Week 1

**Current:** "Your coaching philosophy and aggressiveness are locked in once you simulate Week 1"  
**Fix:** Coaching philosophy available all season long.

```html
<!-- Before: "Your coaching philosophy and aggressiveness are locked in once you simulate Week 1" -->
<!-- After:  "Your coaching philosophy and aggressiveness can be adjusted any time during the season." -->

<!-- Before: "Your coaching philosophy is how your team likes to play by default, on offense and on defense. It names your team's style all season, and Opponents scout it." -->
<!-- After:  "Your coaching philosophy is how your team likes to play by default. Opponents scout it." -->
```

### 2b. Game Plan Changes

In any single game the plan can still change when a matchup calls for it, and the recaps say when it does and why.

---

## 3-18. DRAFT BOARD CHANGES

### 3. Remove "Value Here" Visual

**Location:** Draft board rendering section  
**Decision authority:** Claude (Architect)

```html
<!-- Before: <span class="value-here">Value Here: +1.65</span> -->
<!-- After:  (removed from DOM; math function still reads internal value) -->
<!-- Before: <option value="value-here">Sort: Value Here</option> -->
<!-- After:  <option value="value-here">Sort: Value</option> -->
```

### 4. Dynamic Round Number

**Location:** Draft header box  
**Decision authority:** Claude (Architect)

```html
<!-- Before: <span class="round-label">(Round 1)</span> -->
<!-- After:  <span class="round-label" id="dynamic-round">Round <span id="current-round">1</span></span> -->
<!-- CSS: .round-label { float: right; font-weight: normal; } -->
<!-- JS: document.getElementById('current-round').textContent = newRound; -->
```

### 5. "Undo my last pick" → "Undo"

**Location:** Undo button  
**Decision authority:** Claude (Architect)

```html
<!-- Before: <button id="undo-pick">Undo my last pick</button> -->
<!-- After:  <button id="undo-pick">Undo</button> -->
```

### 6. "Reading the draft board" Simplification

**Location:** Draft board reading guide  
**Decision authority:** Claude (Architect)

```html
<!-- Before: "Reading the draft board (Wins, Value here, Priority, Gone, stars)" -->
<!-- After:  <h3>Reading the draft board</h3> -->
<!-- Remove star system explanation text completely. -->
<!-- Simplify: "+1.65 wins here · priority +0.23" → "1.65 wins · priority +0.23" -->
```

### 7. Flex Display Rules

**Location:** Player card flex display  
**Decision authority:** Claude (Architect)

```html
<!-- Before: "DT1 also fits: DE1 +1.17 (−4 flex) change" -->
<!-- After:  "DT1 also DE1 (−4 flex)" -->
<!-- Rule: Only display flex potential if (-2 or -4). (-6)/(-8) only after round 20. -->
<!-- FS flex never appears for CB except in change menu. -->
```

### 8. Position Cards: Mobile Collapse + Team Colors + Roster Order

**Location:** Position card component  
**Decision authority:** Claude (Architect)

```css
@media (max-width: 760px) {
  .position-card { display: flex; align-items: center; gap: 6px; padding: 6px; }
  .position-card.full { /* expands on tap */ }
  .sort-filter-controls { position: sticky; top: 0; }
}
.position-card.kc { border-left: 4px solid #E31837; }
.position-card.sea { border-left: 4px solid #002266; }
.position-card.kc .special-teams { color: #FFB612; }
.position-card.sea .special-teams { color: #A5ACAF; }
```

**Card order:** Follow roster order, not alphabetical.

### 9. Cooper Dejean FS Flex Glitch Fix

**Location:** Flex suggestion logic  
**Decision authority:** Claude (Architect)

```js
function getFlexOptions(player, roundNum) {
  const flexMap = { CB: ['CB1', 'CB2', 'CB3'] }; // No FS for CB naturally
  let flexOptions = flexMap[player.position] || [];
  if (roundNum < 20) {
    flexOptions = flexOptions.filter(f => f.flexPenalty !== -6 && f.flexPenalty !== -8);
  }
  return flexOptions;
}
```

### 10. Text Size + Board Expansion

**Location:** Draft board header + panel  
**Decision authority:** Claude (Architect)

```css
.clock-text { font-size: 1.2rem; font-weight: bold; }
.draft-board-panel { min-height: calc(100vh - 200px); }
```

### 11. "Your Pick order / Roster Depth Chart" Horizontal Layout

**Location:** Pick order / Depth chart section  
**Decision authority:** Claude (Architect)

```css
.pick-order-depth-container { display: flex; flex-wrap: wrap; gap: 16px; }
.your-pick-order { flex: 1; }
.roster-depth-chart { flex: 1; }
```

### 12. "1 of 26 starters · +3.69 wins" Moved to Bottom

**Location:** Bottom of page  
**Decision authority:** Claude (Architect)

```html
<div class="roster-summary" style="position: fixed; bottom: 20px;">
  1 of 26 starters · +3.69 wins above a replacement-level lineup
</div>
```

### 13. Remove "MORE" from Tab Footer

**Location:** Tab footer  
**Decision authority:** Claude (Architect)

```html
<!-- Remove: <div class="tab-footer">... MORE ...</div> -->
```

### 14. Badges Under "Save My Weights"

**Location:** Badge display + weights section  
**Decision authority:** Claude (Architect)

```html
<div class="badges-container" style="margin-top: 16px;">
  <!-- badges here -->
</div>
<button id="save-my-weights">Save My Weights</button>
```

### 15. "Use model weights" → "Default"

**Location:** Weights toggle button  
**Decision authority:** Claude (Architect)

```html
<!-- Before: <button id="use-model-weights">Use model weights</button> -->
<!-- After:  <button id="use-default-weights">Default</button> -->
<!-- Before: "The default is the model weights: what each spot is really worth in wins..." -->
<!-- After:  "Default is how the draft simulator sees the game." -->
```

### 16. "Save My Weights" Button State Logic

**Location:** Weights section  
**Decision authority:** Claude (Architect)

```html
<!-- Before: <button id="back-to-my-weights">Back to my weights</button> -->
<!-- After:  <button id="save-my-weights" disabled class="transparent">Save My Weights</button> -->
<style>
  #save-my-weights.transparent { opacity: 0.4; cursor: not-allowed; }
  #save-my-weights.active { background: #007bff; color: white; opacity: 1; cursor: pointer; }
</style>
<script>
  let weightsChanged = false;
  function onWeightChange() {
    weightsChanged = true;
    const btn = document.getElementById('save-my-weights');
    btn.disabled = false;
    btn.classList.remove('transparent');
    btn.classList.add('active');
  }
  function saveWeights() {
    weightsChanged = false;
    const btn = document.getElementById('save-my-weights');
    btn.disabled = true;
    btn.classList.add('transparent');
    btn.classList.remove('active');
  }
</script>
```

### 17. Default Weights

**Location:** Weights configuration  
**Decision authority:** Kisi (Owner) values — Claude implements

```js
// DELETE: Any saved user weights
// USE ONLY: The model weights below
// Claude determines punter's value (~1 in traditional model weights)
// FB gets a much heavier block spec than a RB

const DEFAULT_WEIGHTS = {
  QB: 700, RB1: 185, RB2: 60, WR1: 305, WR2: 165, WR3: 105, WR4: 5,
  TE1: 220, TE2: 40, OT1: 285, OT2: 285, OG1: 235, OG2: 235, C: 235,
  DE1: 360, DE2: 305, DT1: 260, DT2: 210,
  MIKE: 240, WILL: 220, 'LB3 / SAM': 20, LB4: 5,
  CB1: 395, CB2: 325, 'CB3 / Nickel': 260, 'CB4 / Dime': 5,
  SS: 245, 'SS2 / Big Nickel': 5, FS: 235, 'FS2 / Quarter': 5,
  K: 200, P: 1, FB: 1,
};
// TE1 within 0.5 of WR1; TE2 within 0.5 of WR3
// QBs rush → not 100/0 pass/run → e.g. 90/10
// WRs block → not 100/0 → e.g. 95/5
```

### 18. Local Storage Persistence

**Location:** Draft state management  
**Decision authority:** Claude (Architect)

```js
function saveDraftState(state) {
  localStorage.setItem('nfl-draft-state', JSON.stringify(state));
}
function loadDraftState() {
  const saved = localStorage.getItem('nfl-draft-state');
  return saved ? JSON.parse(saved) : null;
}
```

---

## 19-23. TEAM COMPARISON PAGE

### 19. Remove "real"

```html
<!-- Before: "Put any two real rosters side by side." -->
<!-- After:  "Put any two rosters side by side." -->
```

### 20. Remove Effective Ratings Text

**Location:** Main Team Comparison Page only  
**Decision authority:** Claude (Architect)

```html
<!-- Remove: "Ratings shown are effective ratings — players flexed out of position carry their penalty." -->
<!-- Keep: This text in Draft Simulator -->
```

### 21. Unit Comparison: Remove Parentheses

**Location:** Unit Comparison table  
**Decision authority:** Claude (Architect)

```html
<!-- Before: <tr><td>Offense (QB+RB+WR+TE+OL)</td><td>81.4</td></tr> -->
<!-- After:  <tr><td>Offense</td><td>81.4</td></tr> -->
<!-- Remove ALL parentheses from row labels -->
```

### 22. Offense/Defense Reorganization

**Location:** Unit Comparison table  
**Decision authority:** Claude (Architect)

```html
<table>
  <tr><td colspan="3"><strong>Offense</strong></td></tr>
  <tr><td>Offense</td><td>81.4</td><td>85.3</td></tr>
  <tr><td>Quarterback</td><td>99.0</td><td>95.0</td></tr>
  <tr><td>Offensive Line</td><td>78.4</td><td>90.8</td></tr>
  <tr><td>Running Backs</td><td>83.5</td><td>85.5</td></tr>
  <tr><td>Wide Receivers</td><td>79.3</td><td>87.7</td></tr>
  <tr><td>Tight Ends</td><td>80.0</td><td>81.9</td></tr>
  <tr><td>Run Game</td><td>80.4</td><td>84.2</td></tr>
  <tr><td>Pass Game</td><td>81.6</td><td>87.9</td></tr>
  <tr><td colspan="3"><strong>Defense</strong></td></tr>
  <tr><td>Defense</td><td>83.4</td><td>81.2</td></tr>
  <tr><td>Defensive Line</td><td>85.0</td><td>82.3</td></tr>
  <tr><td>Linebackers</td><td>82.8</td><td>91.4</td></tr>
  <tr><td>Secondary</td><td>85.3</td><td></td></tr>
  <tr><td>Run Defense</td><td>86.1</td><td></td></tr>
  <tr><td>Pass Defense</td><td></td><td></td></tr>
</table>
```

### 23. Default Matchup Chiefs vs Raiders

**Location:** Team Comparison default selection  
**Decision authority:** Kisi (Owner)

```js
// Before: Team A = Los Angeles Rams, Team B = Baltimore Ravens
// After:  Team A = Kansas City Chiefs, Team B = Las Vegas Raiders
// Remove: "On your current weights, Los Angeles Rams grades 1.88 points ahead..." description
```

---

## 24-30. GUIDE PAGE

### 24. Remove Guide Box

```html
<!-- Remove: Guide Box and intro text -->
```

### 25. Rewrite Item 1

```html
<!-- Before: "Play the season. Seventeen games, a 14-team playoff, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself." -->
<!-- After:  "Play the season. seventeen game Regular Season, the Playoffs, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself." -->
```

### 26. Remove Stats Parenthetical

```html
<!-- Before: "advanced stats (what caused sacks and big runs)" -->
<!-- After:  "advanced stats" -->
```

### 27. Wins per +1 OVR Table Simplification

**Location:** Guide Page Wins table  
**Decision authority:** Claude (Architect)

```html
<!-- Remove: "x wins from a 70-90 upgrade", "Wins, 70→90" column, "Pass / Run" column -->
<!-- Keep: Slot, Wins per +1 OVR -->
<!-- Before: <tr><td>QB</td><td>.127</td><td>2.54</td><td>100 / 0</td></tr> -->
<!-- After:  <tr><td>QB</td><td>.127</td></tr> -->
```

### 28. Weight Adjustments

**Location:** Wins per +1 OVR table values  
**Decision authority:** Kisi (Owner) values — Claude implements

```js
// K: 0.72 → 0.45
// WR2: 0.60 → 0.63
// RB1: 0.67 → 0.58
// CB2: 1.18 → 0.95
// DE1: 1.30 → 1.38
// TE1 within 0.5 of WR1; TE2 within 0.5 of WR3
// QB not 100/0 pass/run → e.g. 90/10
// WRs not 100/0 → e.g. 95/5
```

### 29. Arithmetic Inconsistency Fixes

**Location:** Wins per +1 OVR table  
**Decision authority:** Claude (Architect)

```js
// DT1 .047 → 0.95, CB3 .047 → 0.94 → make consistent
// RB1 .033 → 0.67 should be 0.66
// SAM .004 → 0.07 should be 0.08
// MIKE .043 → 0.86 vs OG/C .043 → 0.85 → make consistent
// COLUMN 2 should equal exactly 20 × COLUMN 1 everywhere
```

### 30. Position Rankings Dropdown

**Location:** Position Rankings dropdown  
**Decision authority:** Claude (Architect)

```html
<!-- OFFENSE: QB, QB + WR1, QB + WR1 + OT1, QB + WR1 + OT1 + OT2, ... until WR3 -->
<!-- DEFENSE: CB1, CB1 + DE1, CB1 + DE1 + CB2, CB1 + DE1 + CB2 + DE2, ... until DT2 -->
<!-- COMBINED: Start from QB + CB1, ... until WR3 -->
<!-- ONLY ONE COPY of each set -->
<!-- PLURAL: "Defensive Line (Edges + DTs)", "(WR1+WR2+WR3)", "(CB1+CB2+CB3+CB4)" -->
```

---

## 31. PLAYER BROWSER

**Location:** Player browser component  
**Decision authority:** Claude (Architect)

```css
.player-browser-list { max-height: calc(15 * var(--player-row-height)); overflow-y: auto; }
.footer-tabs { position: sticky; bottom: 0; }
```

---

## 32. STAR CRITERIA

**Location:** Star criteria logic  
**Decision authority:** Kisi (Owner) — criteria; Claude (Architect) — implementation

```js
// All players: at least 60 yards rushing to be mentioned as stars
// QBs: at least 300 yards and 3 TD / 1 INT reaction to be mentioned as stars
// Punter weight ~1 in traditional model weights (Claude determines exact value)
// FB gets a much heavier block spec than a RB
```

---

## 33-45. GAME PREVIEWS, REVIEWS, SEASON, PLAYOFFS, AWARDS, SUPER BOWL, MOTION GRAPHICS

### 33. Stars of the Game Table — Beautiful

**Location:** Game review page  
**Decision authority:** Claude (Architect)

```html
<div class="stars-of-game">
  <h3>⭐ Stars of the Game</h3>
  <div class="star-grid">
    <div class="star-card user-player">
      <div class="star-icon">⭐</div>
      <div class="player-name">Evan Engram</div>
      <div class="player-team">Chiefs</div>
      <div class="player-stats">3/4 rec, 26 yds, 1 TD</div>
      <div class="game-ball">GAME BALL</div>
    </div>
  </div>
</div>
```

```css
.stars-of-game { margin: 24px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; }
.star-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
.star-card { background: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 16px; text-align: center; }
.star-card.user-player { border-color: #FFB612; box-shadow: 0 0 0 2px #FFB612; background: #fffdf0; }
```

### 34. Box Score — Larger & More Beautiful

**Location:** Game review page  
**Decision authority:** Claude (Architect)

```html
<div class="box-score">
  <h3>Box Score</h3>
  <table>
    <thead>
      <tr><th>Team</th><th>1st</th><th>2nd</th><th>3rd</th><th>4th</th><th>Final</th></tr>
    </thead>
    <tbody>
      <tr><td>Chiefs</td><td>7</td><td>0</td><td>14</td><td>7</td><td><strong>28</strong></td></tr>
      <tr><td>Vikings</td><td>0</td><td>7</td><td>7</td><td>0</td><td><strong>14</strong></td></tr>
    </tbody>
  </table>
</div>
```

```css
.box-score table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 1.1rem; }
.box-score th, .box-score td { padding: 12px 16px; text-align: center; border-bottom: 1px solid #e5e5e5; }
.box-score th { background: #f8f9fa; font-weight: 600; color: #333; }
.box-score tr:last-child td { border-bottom: none; font-weight: 700; background: #f0f7ff; }
```

### 35. Turnovers — Score Summary Style

**Location:** Game review page  
**Decision authority:** Claude (Architect)

```html
<div class="turnovers">
  <div class="turnover-summary">Turnovers: Chiefs 1 - 0 Vikings</div>
  <div class="turnover-detail">Jaylon Johnson interception (4th Q)</div>
</div>
```

### 36. QB Sacks Format

**Location:** Player stats / anywhere QB sacks listed  
**Decision authority:** Claude (Architect)

```html
<!-- Before: "Sacked zx" -->
<!-- After:  "x Sacked" -->
```

### 37. Game Previews/Reviews — Graphical UI

**Location:** Game preview and review pages  
**Decision authority:** Claude (Architect)

```html
<div class="game-preview-graphical">
  <div class="matchup-visual"></div>
  <div class="key-players-visual"></div>
  <div class="narration"></div>
</div>
```

**Rules:** Replace full sentences with graphics where possible. Keep sentences only for key plays in clutch, compliments to star players, hyping next round. One idea, one number, one card.

### 38. Season Review — Graphical Banner

**Location:** Season review page  
**Decision authority:** Claude (Architect)

```html
<div class="season-banner">
  <div class="banner-content">
    <h1>🏆 Season Complete</h1>
    <div class="team-record">Kansas City Chiefs: 14-3</div>
    <div class="conference-rank">AFC #1 Seed · AFC West Champions</div>
  </div>
</div>
```

```css
.season-banner {
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
  z-index: 1000; text-align: center; padding: 48px; background: #ffffff;
  border: 4px solid #FFB612; border-radius: 16px;
  animation: shimmer 3s infinite;
}
@keyframes shimmer { 0%, 100% { opacity: 1; } 50% { opacity: 0.9; } }
```

### 39. Playoffs — March Madness Bracket

**Location:** Playoffs page  
**Decision authority:** Claude (Architect)

```html
<div class="playoff-bracket">
  <div class="conference-bracket afc"><h3>AFC</h3></div>
  <div class="conference-bracket nfc"><h3>NFC</h3></div>
  <div class="super-bowl-matchup"><h3>Super Bowl</h3></div>
</div>
```

**Bye week:** Show game preview of most likely matchup against user in next round.
**"Lineup and flexes" in playoffs:** Not at the top.

---

## 36. SUPER BOWL — Champions Banner

**Location:** Season review / playoff completion page  
**Decision authority:** Claude (Architect)

```html
<div class="super-bowl-banner">
  <div class="banner-content">
    <div class="champions-icon">🏆</div>
    <h1>SUPER BOWL CHAMPIONS!</h1>
    <div class="team-name">Kansas City Chiefs</div>
    <div class="season-record">14-3 · AFC West Champions</div>
  </div>
</div>
```

```css
.super-bowl-banner {
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
  z-index: 1000; text-align: center; padding: 64px 48px; background: #ffffff;
  border: 6px solid #FFB612; border-radius: 24px;
  animation: shimmer 4s infinite, popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

---

## 37. MOTION GRAPHICS

**Location:** Throughout V22  
**Decision authority:** Claude (Architect)

```css
.confetti { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999; overflow: hidden; }
.confetti-piece { position: absolute; width: 10px; height: 10px; background: #FFB612; animation: confetti-fall 3s ease-out forwards; }
@keyframes confetti-fall { 0% { transform: translateY(-100px) rotate(0deg); opacity: 1; } 100% { transform: translateY(110vh) rotate(720deg); opacity: 0; } }
.fade-in { animation: fadeIn 0.6s ease-out forwards; opacity: 0; }
@keyframes fadeIn { to { opacity: 1; } }
.slide-up { animation: slideUp 0.5s ease-out forwards; opacity: 0; transform: translateY(30px); }
@keyframes slideUp { to { opacity: 1; transform: translateY(0); } }
.staggered > * { opacity: 0; animation: fadeIn 0.4s ease-out forwards; }
.staggered > *:nth-child(1) { animation-delay: 0.1s; }
.staggered > *:nth-child(2) { animation-delay: 0.2s; }
.staggered > *:nth-child(3) { animation-delay: 0.3s; }
.staggered > *:nth-child(4) { animation-delay: 0.4s; }
.staggered > *:nth-child(5) { animation-delay: 0.5s; }
```

**Rules:** Motion is for arrivals and big moments — banner, trophy, final score, award cards — not for every table. One thing moves at a time. Text that arrives stays. Confetti for trophy only. `prefers-reduced-motion` guard is not optional.

---

## 38. SEASON REVIEW BUTTON — Blue, Near Top

**Location:** Post-playoff page  
**Decision authority:** Claude (Architect)

```html
<div class="post-playoff-actions">
  <button class="btn-primary" id="btn-season-review">Season Review</button>
  <button class="btn-secondary" id="btn-100-season">100 Season Simulation</button>
</div>
<style>
  .post-playoff-actions { display: flex; gap: 16px; margin: 24px 0; justify-content: center; }
  #btn-season-review { background: #007bff; color: #ffffff; }
  #btn-season-review:hover { background: #0056b3; }
</style>
```

---

## 39. SEASON REVIEW — Graphical

**Location:** Season review page  
**Decision authority:** Claude (Architect)

```html
<div class="season-review">
  <div class="season-stats-grid">
    <div class="stat-card">
      <div class="stat-value">14-3</div>
      <div class="stat-label">Record</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">397</div>
      <div class="stat-label">Points For</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">296</div>
      <div class="stat-label">Points Against</div>
    </div>
  </div>
  <div class="player-highlights">
    <h3>Key Players</h3>
    <div class="player-grid"></div>
  </div>
</div>
```

```css
.season-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin: 24px 0;
}
.stat-card { background: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 20px; text-align: center; }
.stat-value { font-size: 2rem; font-weight: 700; color: #E31837; }
.stat-label { font-size: 0.9rem; color: #666; margin-top: 4px; }
.player-highlights { margin: 32px 0; }
.player-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
.player-card { background: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 16px; text-align: center; }
.player-card.user-player { border-color: #FFB612; box-shadow: 0 0 0 2px #FFB612; background: #fffdf0; }
```

### Season Review — First Sentence Paragraph
**Location:** Season review text  
**Decision authority:** Claude (Architect)

```html
<!-- First sentence should be its own paragraph -->
<!-- Biggest win and ugliest win as own indentations, presented as stats -->
<!-- Each player on their own line, graphical stats not full sentences -->
<!-- Remove "cost the Chiefs roughly X points a game" phrasing -->
<!-- Remove: "The roster also asked 2 starters to play out of position..." -->
<!-- Better final sentence encouraging playoffs or redraft -->
```

### Season Reviews — Why Better/Worse Ratings

**Location:** Season review page  
**Decision authority:** Claude (Architect)

```html
<!-- Three bars instead of prose -->
<!-- Graphical presentation -->
```

### Season Reviews — Draft Critique

**Location:** Draft critique section  
**Decision authority:** Claude (Architect)

```html
<!-- Remove: "Early picks that are worth little to winning matter most, because those picks are the hardest to replace later." -->
<!-- Keep: "What separated the playoff teams" but hidden behind click. Do not show by default. -->
```

### Season Reviews — QB Sacks Format

**Location:** Player stats  
**Decision authority:** Claude (Architect)

```html
<!-- Before: "Sacked zx" -->
<!-- After:  "x Sacked" -->
```

### Season Reviews — Advanced Stats

**Location:** Advanced stats menu  
**Decision authority:** Claude (Architect)

```html
<!-- Rename "More Advanced Stats" → "Advanced Stats" -->
<!-- Condensed explainer visible only when clicking Coverage, Sacks, or Offensive Lines -->
<!-- Each advanced stat carries one-line "why" on click -->
```

### Season Reviews — Conference Charts

**Location:** Season review page  
**Decision authority:** Claude (Architect)

```html
<!-- Replace "Kansas City Chiefs: 14-3 · 397 PF · 296 PA" with two conference charts -->
<!-- Rank team 1-16 in their conferences -->
<!-- As beautiful as possible -->
```

---

## 40. 100 SEASON REVIEW — Graphical

**Location:** 100 season simulation page  
**Decision authority:** Claude (Architect)

```html
<div class="season-100-review">
  <div class="chart-container">
    <canvas id="win-distribution-chart"></canvas>
  </div>
  <div class="key-takeaways">
    <h3>Key Takeaways</h3>
    <ul>
      <li>Chiefs won the Super Bowl in 23 of 100 seasons</li>
      <li>Average wins: 9.4</li>
      <li>Playoff appearance rate: 68%</li>
    </ul>
  </div>
</div>
```

```css
.season-100-review { margin: 32px 0; }
.chart-container { background: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px; margin-bottom: 24px; }
.key-takeaways { background: #f8f9fa; border-radius: 8px; padding: 20px; }
.key-takeaways h3 { margin-top: 0; color: #333; }
.key-takeaways ul { margin: 0; padding-left: 20px; }
.key-takeaways li { margin-bottom: 8px; color: #555; }
```

---

## 41. SEASONS BY WIN TOTAL — Fix Left Alignment

**Location:** Season statistics page  
**Decision authority:** Claude (Architect)

```css
.seasons-by-win-total { text-align: center; margin: 32px 0; }
.seasons-by-win-total table { margin: 0 auto; }
.seasons-by-win-total th, .seasons-by-win-total td {
  padding: 12px 16px; text-align: center; border: 1px solid #e5e5e5;
}
.seasons-by-win-total th { background: #f8f9fa; font-weight: 600; color: var(--team-primary); }
```

---

## 42. YOUR PLAYERS; AVERAGE SEASON + AWARD PATTERNS

**Location:** Season review / player stats page  
**Decision authority:** Claude (Architect)

```html
<div class="player-insights-section">
  <div class="players-average-season">
    <h3>Your Players; Average Season</h3>
    <!-- Player average stats -->
  </div>
  <div class="award-patterns">
    <h3>Award Patterns</h3>
    <!-- Award frequency data -->
  </div>
</div>
```

```css
.player-insights-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin: 32px 0;
}
.players-average-season, .award-patterns {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 20px;
}
.players-average-season h3, .award-patterns h3 {
  margin-top: 0;
  color: var(--team-primary);
  font-size: 1.1rem;
}
```

---

## 43. REMOVE Realism Audit / Model Predict Real Results

**Location:** Season review / statistics page  
**Decision authority:** Kisi (Owner)

```html
<!-- Remove from user view: "Realism audit & league-wide records" -->
<!-- Remove: "Does the model predict real results?" -->
<!-- Store internally: Keep data available for internal analysis but not displayed -->
```

---

## 44. SUPER BOWL — Exclamation Point

**Location:** Super Bowl completion page  
**Decision authority:** Claude (Architect)

```html
<!-- Before: "The Chiefs are Super Bowl champions." -->
<!-- After:  "The Chiefs are Super Bowl Champions!" -->
```

---

## 45. GAME PREVIEWS/REVIEWS — Graphical (Additional)

**Location:** Game preview and review pages  
**Decision authority:** Claude (Architect)

```html
<div class="game-preview-graphical">
  <div class="matchup-visual"></div>
  <div class="key-players-visual"></div>
  <div class="narration"></div>
</div>
```

**Rules:** More graphical. Full sentences used sparingly. Only key plays in clutch, compliments to star players, hyping next round need sentences.

---

## 46. VERSION RENAME

**Location:** Product files  
**Decision authority:** Kisi (Owner) — file naming; Claude (Architect) — execution

```text
// Rename best version → Football-Sim-V21.html
// New build → Football-Sim-V23.html
```

**Build naming:** `V21` and `V22` are retired as build names. `Pre-Colors` (`40233d6b…`, 657,486 B) is the only valid build. `V23` is the next build, written only by Claude. `merged.html` / `Football-Sim-V21.html` (`044d1759…`, 656,746 B) is INVALID — hand edit changes model output (Math.LN2 in PERS['11']).

---

## P4 · WEIGHTS — Protected

**Location:** Weights configuration  
**Decision authority:** Kisi (Owner) — final values; Claude (Architect) — implementation

```text
// Five calibration factors to be determined by Owner
// Constants question: Owner's word first
// 100-season regression attached — nobody has measured the deltas yet
// Removal of saved user weights — covered in section 17
```

**Protected:** `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC` coefficients, `PLAN_K`, `RATING_SPECS` change only with explicit Owner approval.

---

## P6 · CHORES

**Location:** Various  
**Decision authority:** Kisi (Owner) — priority; Claude (Architect) — implementation

### P6a: Re-anchor anchors

```bash
node _agents/minimax/tools/verify-anchors.mjs V22-Suggestions.md Football-Sim-V21.html
```

### P6b: Trim bulletin

**Location:** `COUNCIL-BULLETIN.md` (866 KB)  
**Decision authority:** Kisi (Owner) — what to trim; Claude (Architect) — execution

```text
Move old content into _archive/
```

### P6c: Sweep biome findings

**Location:** All JS/CSS files  
**Decision authority:** Claude (Architect)

```bash
npx --yes biome check *.js --write
npx --yes biome check *.css --write
```

---

## 46. VERSION RENAME

**Location:** Product files  
**Decision authority:** Kisi (Owner) — file naming; Claude (Architect) — execution

```text
// Rename best version → Football-Sim-V21.html
// New build → Football-Sim-V22.html
```

---

## 47. TEAM COLOR THEMING — Opponent colors in matchups + user team colors

**Location:** Throughout `merged.html` — draft board, game previews, game reviews, season review, playoffs, awards  
**Decision authority:** Claude (Architect) — CSS + JS implementation; Kisi (Owner) — color direction

### 47a. Draft Header — User team colors on the border

**Location:** Draft header showing "Drafting as Kansas City Chiefs — you hold the #4 overall pick (Round 1)"  
**Decision authority:** Claude (Architect)

```css
/* BEFORE: Blue border around the draft header team bar */
/* After:  User team's primary color for the border, secondary for text, accent for highlights */
.draft-header.user-team-kc { border-color: #E31837; color: #FFB612; }
.draft-header.user-team-sea { border-color: #002266; color: #A5ACAF; }
/* 32 teams total — full NFL brand color map */
```

### 47b. Opponent Team Colors in Matchups

**Location:** Game previews, game reviews, season review, playoffs  
**Decision authority:** Claude (Architect)

```css
/* Opponent panels tinted with their team's primary color */
.opponent-card.vikings { border-left: 4px solid #4F2683; /* Vikings purple */ }
.opponent-card.vikings .player-name { color: #4F2683; }
.opponent-card.vikings .star-icon { color: #4F2683; }
.opponent-card.vikings .game-ball-star { color: #4F2683; filter: drop-shadow(0 0 4px #4F2683); }

.opponent-card.packers { border-left: 4px solid #203731; /* Packers dark green */ }
.opponent-card.packers .player-name { color: #203731; }

/* 32 teams total — full NFL brand color map */
```

### 47c. "(Team Name)" Text — Team-Colored

**Location:** Anywhere "(Vikings)", "(Chiefs)", etc. appears in game previews/reviews  
**Decision authority:** Claude (Architect)

```css
.team-mention.vikings { color: #4F2683; font-weight: 600; }
.team-mention.packers { color: #203731; font-weight: 600; }
```

### 47d. Star Players — Team-Colored Tint

**Location:** Player cards, stars of the game, key players  
**Decision authority:** Claude (Architect)

```css
.star-card.user-team-player { border-color: var(--team-primary); box-shadow: 0 0 0 2px var(--team-accent); }
.star-card.opponent-player.vikings { border-color: #4F2683; box-shadow: 0 0 0 2px #4F2683; }
.star-card.opponent-player.vikings .star-icon { color: #4F2683; filter: drop-shadow(0 0 6px #4F2683); }
```

### 47e. Game Ball Star — Opponent Color

**Location:** Stars of the game, key players  
**Decision authority:** Claude (Architect)

```css
.game-ball-star.vikings { color: #4F2683; animation: sparkle 2s infinite; }
@keyframes sparkle { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.2); } }
```

### 47f. 32-Team Color Map

**Location:** CSS variables block  
**Decision authority:** Claude (Architect) — exact hex values

```css
:root {
  /* AFC */
  --team-kc-primary: #E31837;   --team-kc-secondary: #FFB612;   --team-kc-accent: #ffffff;
  --team-lac-primary: #002654;   --team-lac-secondary: #FFD019;   --team-lac-accent: #ffffff;
  --team-den-primary: #FB4F14;   --team-den-secondary: #002244;   --team-den-accent: #ffffff;
  --team-lv-primary: #000000;   --team-lv-secondary: #A5ACAF;   --team-lv-accent: #ffffff;
  --team-cle-primary: #FF3C00;   --team-cle-secondary: #311D00;   --team-cle-accent: #ffffff;
  --team-cin-primary: #000000;   --team-cin-secondary: #FB4F14;   --team-cin-accent: #ffffff;
  --team-pit-primary: #FFB612;   --team-pit-secondary: #101820;   --team-pit-accent: #ffffff;
  --team-bal-primary: #4A0E4E;   --team-bal-secondary: #000000;   --team-bal-accent: #ffffff;
  --team-nyj-primary: #000000;   --team-nyj-secondary: #FFFFFF;   --team-nyj-accent: #ffffff;
  --team-ne-primary: #002244;   --team-ne-secondary: #C60C30;   --team-ne-accent: #ffffff;
  --team-mia-primary: #008E97;   --team-mia-secondary: #F2921E;   --team-mia-accent: #ffffff;
  --team-buf-primary: #00338D;   --team-buf-secondary: #C60C30;   --team-buf-accent: #ffffff;
  --team-hou-primary: #03202F;   --team-hou-secondary: #A71930;   --team-hou-accent: #ffffff;
  --team-ind-primary: #002C5F;   --team-ind-secondary: #A71930;   --team-ind-accent: #ffffff;
  --team-jac-primary: #006778;   --team-jac-secondary: #D37246;   --team-jac-accent: #ffffff;
  --team-ten-primary: #0C2340;   --team-ten-secondary: #C8102E;   --team-ten-accent: #ffffff;
  --team-nyg-primary: #0B2265;   --team-nyg-secondary: #A71930;   --team-nyg-accent: #ffffff;
  --team-phi-primary: #004C54;   --team-phi-secondary: #A71930;   --team-phi-accent: #ffffff;
  --team-dal-primary: #003594;   --team-dal-secondary: #B0B7BC;   --team-dal-accent: #ffffff;
  --team-was-primary: #773141;   --team-was-secondary: #FFB612;   --team-was-accent: #ffffff;
  --team-gb-primary: #203731;   --team-gb-secondary: #FFB612;   --team-gb-accent: #ffffff;
  --team-chi-primary: #0B162A;   --team-chi-secondary: #C83803;   --team-chi-accent: #ffffff;
  --team-det-primary: #0076B6;   --team-det-secondary: #B0B7BC;   --team-det-accent: #ffffff;
  --team-min-primary: #4F2683;   --team-min-secondary: #FFC62F;   --team-min-accent: #ffffff;
  --team-atl-primary: #A71930;   --team-atl-secondary: #000000;   --team-atl-accent: #ffffff;
  --team-car-primary: #0085CA;   --team-car-secondary: #101820;   --team-car-accent: #ffffff;
  --team-tb-primary: #D50A0A;   --team-tb-secondary: #FF7F00;   --team-tb-accent: #ffffff;
  --team-no-primary: #D3BC8D;   --team-no-secondary: #101820;   --team-no-accent: #ffffff;
  --team-lar-primary: #003594;   --team-lar-secondary: #FFA300;   --team-lar-accent: #ffffff;
  --team-sf-primary: #AA0000;   --team-sf-secondary: #B3995D;   --team-sf-accent: #ffffff;
  --team-sea-primary: #002266;   --team-sea-secondary: #A5ACAF;   --team-sea-accent: #ffffff;
  --team-ari-primary: #97233F;   --team-ari-secondary: #FFD500;   --team-ari-accent: #ffffff;
  --team-lac-primary: #002654;   --team-lac-secondary: #FFD019;   --team-lac-accent: #ffffff;
}
```

### 47g. Draft Board Cards — Team Color Tinting

**Location:** Draft board player cards  
**Decision authority:** Claude (Architect)

```css
.position-card.user-team-player { border-left: 4px solid var(--team-primary); }
.position-card.opponent-team-player.vikings { border-left: 4px solid #4F2683; }
.position-card.opponent-team-player.packers { border-left: 4px solid #203731; }
```

### 47h. Motion Graphics — Team Color Confetti

**Location:** Super Bowl, championship moments  
**Decision authority:** Claude (Architect)

```js
// Confetti uses winning team's primary color
const teamColors = { kc: '#E31837', sea: '#002266', min: '#4F2683', /* ... 32 teams */ };
function triggerConfetti(teamCode) {
  const color = teamColors[teamCode] || '#FFB612';
  // ... confetti pieces use `color`
}
```

## 48. OWNER ANSWERS FROM MOC Q&A

**Location:** Various — Owner's replies to MOC's six questions  
**Decision authority:** Kisi (Owner) — answers below; Claude (Architect) — implementation

### 48a. Team Hexes / Brand Colors — Unsourced

**Owner's ruling:** Owner deferred to GPT's response. GPT recommended a two-layer structure:

```
brand_colors: the team's documented identity colors (primary/secondary/tertiary)
display_colors: colors selected to render legibly in the dark theme
```

**GPT's recommendation:** Keep white as brand data for teams with white secondaries, but choose a visible display treatment when white cannot be seen. Acceptance criteria:
1. All 32 teams have three documented brand-color entries, or explicitly documented exception
2. Every HEX value has a source URL and verification status
3. Each source identifies the team and supports the color value
4. Derived display colors have their own derivation rule, not misrepresented as official
5. Contrast checks run against dark-theme background and between adjacent edges
6. All 32 rendered hexes pass visual inspection

**Full 32-team color reference** (from GPT's response — candidate data, needs source verification):

| Team | Primary | Secondary | Tertiary |
|------|---------|-----------|----------|
| Baltimore Ravens | #241773 | #9E7C0C | #000000 |
| Buffalo Bills | #00338D | #C60C30 | #FFFFFF |
| Cincinnati Bengals | #FB4F14 | #000000 | #FFFFFF |
| Cleveland Browns | #FF3C00 | #311D00 | #FFFFFF |
| Denver Broncos | #002244 | #FB4F14 | #FFFFFF |
| Houston Texans | #03202F | #A71930 | #FFFFFF |
| Indianapolis Colts | #002C5F | #FFFFFF | #A2AAAD |
| Jacksonville Jaguars | #101820 | #006778 | #D7A22A |
| Kansas City Chiefs | #E31837 | #FFB81C | #FFFFFF |
| Las Vegas Raiders | #000000 | #A5ACAF | #FFFFFF |
| Los Angeles Chargers | #0080C6 | #FFC20E | #FFFFFF |
| Miami Dolphins | #008E97 | #FC4C02 | #005778 |
| New England Patriots | #002244 | #C60C30 | #B0B7BC |
| New York Jets | #125740 | #FFFFFF | #000000 |
| Pittsburgh Steelers | #FFB612 | #101820 | #FFFFFF |
| Tennessee Titans | #0C2340 | #4B92DB | #C8102E |
| Arizona Cardinals | #97233F | #000000 | #FFB612 |
| Atlanta Falcons | #A71930 | #000000 | #A5ACAF |
| Carolina Panthers | #0085CA | #101820 | #BFC0BF |
| Chicago Bears | #0B162A | #C83803 | #FFFFFF |
| Dallas Cowboys | #002244 | #869397 | #FFFFFF |
| Detroit Lions | #0076B6 | #B0B7BC | #000000 |
| Green Bay Packers | #203731 | #FFB612 | #FFFFFF |
| Los Angeles Rams | #003594 | #FFD100 | #FFFFFF |
| Minnesota Vikings | #4F2683 | #FFC62F | #FFFFFF |
| New Orleans Saints | #D3BC8D | #101820 | #FFFFFF |
| New York Giants | #0B2265 | #A71930 | #A5ACAF |
| Philadelphia Eagles | #004C54 | #A5ACAF | #000000 |
| San Francisco 49ers | #AA0000 | #B3995D | #FFFFFF |
| Seattle Seahawks | #002266 | #69BE28 | #A5ACAF |
| Tampa Bay Buccaneers | #D50A0A | #34302B | #FF7900 |
| Washington Commanders | #5A1414 | #FFB612 | #FFFFFF |

**Owner's ruling (22 Oct):** Seven teams changed:
- **Baltimore Ravens:** secondary/third #000000 / #9E7C0C → #9E7C0C / #000000 (swap)
- **Cleveland Browns:** primary/secondary #311D00 / #FF3C00 → #FF3C00 / #311D00 (swap)
- **Denver Broncos:** primary/secondary #FB4F14 / #002244 → #002244 / #FB4F14 (swap)
- **Dallas Cowboys:** primary #003594 → #002244
- **Chicago Bears:** secondary #000000 → #C83803
- **Miami Dolphins:** third #FFFFFF → #005778
- **New England Patriots:** third #BFC0BF → #B0B7BC

**Do NOT apply this to figma/team-colours.json yet.** It must land after the bundle PR, or the two collide. Prepare the patch in your lane only.

### 48b. Defender Star Criteria

**Owner's ruling:**
- A defender with the **highest player rating in a game** on the **winning team** gets a star
- Unless the defender has a **multiple turnover game** (then they may be excluded)
- A defender with an **incredible 90+ rating game** gets a star regardless

**Implementation:** Star criteria = (rating >= 90) OR (highest rating in game AND on winning team AND not multiple turnover game)

### 48c. goSeason() Dead Code

**Owner's ruling:** "I don't understand." — The Owner does not understand the question about `goSeason()` being dead code. The build's `goSeason()` has its only call inside its own body, so the "Play a Season" hero never renders. The Owner needs clarification on whether the hero screen is intended to exist.

### 48d. Game Ball Tie-Break

**Owner's ruling:**
- Tie goes to **defense** if the tied player is on defense
- Tie goes to **offense** if the tied player is on offense
- If all tied players are on offense: **least highly rated player by wins** gets the ball
- If all tied players are on defense: **least highly rated player by wins** gets the ball

### 48e. Flex Table — Left/Right Don't Matter

**Owner's ruling:** "Left and right don't matter. Let claude handle the table." — The flex table should not distinguish LT vs RT, OLB1 vs OLB2, etc. based on side. Claude has full authority to structure the flex table as he sees fit.

### 48f. 3-4 Front — Lowest Rated LB Comes Off for CB3/Nickel

**Owner's ruling:** "The lowest rated linebacker comes off in 3-4 for the nickel." — In a 3-4 front, when CB3/Nickel enters, the **lowest rated linebacker** (OLB2 or ILB2) comes off the field.

### 48g. Math.LN2 Edit (F4) — DS M-496 Answer

**Owner's ruling:** Not a sign error. It replaced the neutral baseline `0.000` with `Math.LN2` (≈0.693), inflating league-average offence by **+7.52 points per game**. Pre-Colors does NOT contain it (line 2029 reads `runB:0.000, passB:0.000`).

**Instrument:** `_agents/ds/tools/ln2-probe.mjs` — loads the build, exports its own `matchupModel`, one fixed fixture (every unit 80 v an all-80 league, 11 personnel, neutral, nickel).

| arm | runB | passB | rush yd | pass yd | pass % | pts | vs anchor |
|---|---|---|---|---|---|---|---|
| **A Pre-Colors (anchor)** | 0.000 | 0.000 | 109.8 | 215.1 | 66.20 | 21.27 | — |
| **B drift `044d1759`** | 0.693 | 0.693 | **159.6** | **294.0** | 64.81 | **28.79** | **+7.52** |
| C MOC proposal | 0.070 | −0.035 | 117.8 | 207.7 | 63.81 | 21.07 | −0.20 |
| D run only | 0.070 | 0.000 | 117.8 | 215.1 | 64.62 | 21.59 | +0.32 |
| E sign flipped | −0.070 | +0.035 | 102.4 | 222.7 | 68.51 | 21.51 | +0.24 |

**Correction to the premise:** Pre-Colors line 2029 reads `runB:0.000, passB:0.000`. `Math.LN2` exists in 4 of 11 root builds, all retired (`8f0f8d50` l.1970, `8f916df9` l.1988, and both `044d1759` builds l.2029). The anchor is clean.

**Why it is not a sign error:** a sign flip is worth +0.24 pts (arm E). `exp(Math.LN2) = 2` exactly — the line encodes "double both channels". At `POINTS_PER_WIN = 32.5` that is ≈0.23 wins per game, ≈3.9 wins per 17. `softCap` clamps `ln 2` to the ceiling of both channels (0.418 of 0.42 rush, 0.290 of 0.29 pass).

**The pass-share reading is inverted:** because both channels inflate, pass share *falls* 66.20% → 64.81%. `ln 2` is not pass-happy; it is straight offensive inflation with a slight run tilt.

**Do not adopt arm C.** The table's own gradient is monotonic — `runB` rises with `heavy` (12 .030, 21 .040, 13 .055, 22 .070) and `passB` falls (−.015, −.030, −.035, −.045). At the light end the consistent values are the smallest `runB` and the least negative `passB`, i.e. `0.000 / 0.000`. Pre-Colors is already the correct endpoint; `pc:0.0` corroborates it (11 is the baseline every other set is measured against). C would make the lightest set the most run-favouring and cost −0.20 pts on top of the `pc` penalty. **V23 needs no fix here.**

### 48h. Three Gate Scripts — Do Not Exist

**Owner's ruling:** `auto-approve-handoff.js`, `dispatch_gate.py`, `lane_commons_gate.py` **do not exist** anywhere in the repository. Beam M-467 and Flint M-491 both confirm: zero files with these names exist anywhere in the repository or on the filesystem. Only proposed descriptions exist (Ultra M-490). Nothing more is needed.


---

## BIOME FORMATTING

After all edits, run:

```bash
npx --yes biome check _agents/pickle/builds/Football-Sim-PreColors.html --write
npx --yes biome check *.js --write
npx --yes biome check *.css --write
```

This ensures consistent formatting across all changed files.

---

## BOUNDARIES (R5 compliance)

- No product file edited by VL — `Football-Sim-PreColors.html` (Pre-Colors) is read-only
- No `session_send` executed — Kilo Code member without OpenChamber access (UK standing instruction M-110)
- No other session's content edited
- No branches/PRs/tags/pushes initiated
- No task assigned to a specific agent — all posted openly
- All changes await Claude's implementation as `Football-Sim-V23.html`

---

## NEXT STEPS FOR CLAUDE

1. Read this document as the specification for V23
2. Review AGENTS.md for council operating framework
3. Implement changes in priority order (P0-P6, 1-48 above)
4. Format all JS/CSS with biome
5. Save output as `Football-Sim-V23.html`
6. Run the MiniMax 4-check gate (exit 0, A–H all true) after changes
7. Verify the 390px CTA below-fold finding is addressed