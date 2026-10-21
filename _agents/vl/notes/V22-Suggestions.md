# V22-Suggestions.md

**Source:** Kosi (Owner) prompts of 21 Oct 2026 + council contributions  
**Applies to:** `merged.html` (V21, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B) → build as `Football-Sim-V22.html`  
**Status:** Specification for Claude (Architect). Advisor VL cannot edit product files per R5.  
**Format:** Code snippets with comments indicating file location, add/subtract/replace intent, and decision authority.  
**R5 compliance:** No product file edited; no other session's content touched; no `session_send` executed.

---

## HOW TO USE THIS DOCUMENT

Each section has:
- **Location** — where in `merged.html` to look
- **Decision authority** — who decides (Claude = Architect, Kosi = Owner)
- **Code snippets** — `<!-- Before: ... -->` / `<!-- After: ... -->` pattern for exact string replacement
- **JS/CSS blocks** — ready to paste into the appropriate `<script>` or `<style>` block

Changes are in priority order. Tackle them in sequence.

---

## PRIORITY ORDER

| # | Area | Change |
|---|------|--------|
| 1 | Draft Board | Remove "Value Here" visual (math unchanged) |
| 2 | Draft Board | Dynamic round number (right-aligned) |
| 3 | Draft Board | "Undo my last pick" → "Undo" |
| 4 | Draft Board | "Reading the draft board" simplification + star system removal |
| 5 | Draft Board | Flex display rules (-2/-4 only; -6/-8 after round 20) |
| 6 | Draft Board | Position cards mobile collapse + team colors + roster order |
| 7 | Draft Board | Cooper Dejean FS flex glitch fix |
| 8 | Draft Board | Text size ("You're on the clock") + board expansion |
| 9 | Draft Board | "Your Pick order / Roster Depth chart" horizontal |
| 10 | Draft Board | "1 of 26 starters · +3.69 wins" moved to bottom |
| 11 | Draft Board | Remove "MORE" from tab footer |
| 12 | Draft Board | Badges moved under "Save My Weights" |
| 13 | Draft Board | "Use model weights" → "Default" |
| 14 | Draft Board | "Save My Weights" state logic (transparent → blue) |
| 15 | Draft Board | Default weights (Owner values) |
| 16 | Draft Board | Local storage persistence |
| 17 | Team Comparison | Remove "real" from subtitle |
| 18 | Team Comparison | Remove effective ratings text (main page only) |
| 19 | Team Comparison | Unit Comparison: remove parentheses |
| 20 | Team Comparison | Reorganize by Offense/Defense with subtitles |
| 21 | Team Comparison | Default matchup Chiefs vs Raiders |
| 22 | Guide Page | Remove Guide Box + intro text |
| 23 | Guide Page | Rewrite item 1 ("seventeen game Regular Season") |
| 24 | Guide Page | Remove "(what caused sacks and big runs)" |
| 25 | Guide Page | Wins per +1 OVR table simplification |
| 26 | Guide Page | Weight adjustments (K, WR2, RB1, CB2, DE1 + TE1/TE2 proximity + QB/WR run splits) |
| 27 | Guide Page | Arithmetic inconsistency fixes (Colleagues 3 & 4) |
| 28 | Position Rankings | Dropdown combinations + pluralization + (WR1+WR2+WR3) notation |
| 29 | Player Browser | Desktop ~15 players visible; footer tabs always visible |
| 30 | Glossary + Game-plan math | Move to Guide Page; cross-reference game preview/review terms |
| 31 | Aesthetics | Team color theming; typography; buttons; tables; mobile; empty states |

---

## 1. DRAFT BOARD — Remove "Value Here" visual

**Location:** Draft board rendering section in `merged.html`  
**Decision authority:** Claude (Architect) — UI markup

```html
<!-- REMOVE: All visual instances of "Value Here" on the draft board -->
<!-- KEEP: The mathematical function using Value Here in the background unchanged -->
<!-- Example removal: -->
<!-- Before: <span class="value-here">Value Here: +1.65</span> -->
<!-- After:  (removed from DOM; math function still reads internal value) -->

<!-- Also remove: "Sort: Value Here" from any sort dropdown -->
<!-- Before: <option value="value-here">Sort: Value Here</option> -->
<!-- After:  <option value="value-here">Sort: Value</option> (or remove option entirely) -->
```

---

## 2. DRAFT BOARD — Dynamic round number

**Location:** Draft header box showing "Drafting as [Team] — you hold the #19 overall pick (Round 1)"  
**Decision authority:** Claude (Architect) — JS + markup

```html
<!-- REPLACE: Static "(Round 1)" text -->
<!-- Before: <span class="round-label">(Round 1)</span> -->
<!-- After:  <span class="round-label" id="dynamic-round">Round <span id="current-round">1</span></span> -->

<!-- CSS: Align round number to the right of the box -->
<style>
  .round-label {
    float: right; /* or flex: justify-content: space-between on parent */
    font-weight: normal;
  }
</style>

<!-- JS: Update round on each draft round change -->
<script>
  function updateRoundDisplay(newRound) {
    document.getElementById('current-round').textContent = newRound;
  }
</script>
```

---

## 3. DRAFT BOARD — "Undo my last pick" → "Undo"

**Location:** Undo button on draft board  
**Decision authority:** Claude (Architect)

```html
<!-- REPLACE: Button text -->
<!-- Before: <button id="undo-pick">Undo my last pick</button> -->
<!-- After:  <button id="undo-pick">Undo</button> -->
```

---

## 4. DRAFT BOARD — "Reading the draft board" simplification + star system removal

**Location:** Draft board reading guide section  
**Decision authority:** Claude (Architect) — UI text + simplification

```html
<!-- REPLACE: Full verbose heading -->
<!-- Before: "Reading the draft board (Wins, Value here, Priority, Gone, stars)" -->
<!-- After:  <h3>Reading the draft board</h3> -->

<!-- REMOVE: Star system explanation text completely -->
<!-- Before: "Chip numbers are starters drafted / starting spots (0/2 = both open). Stars set how much you care about a position: ★★ must-fill (Priority ×1.5), ★ normal, ☆ low (×0.5). Click a star to change it." -->
<!-- After:  (removed entirely) -->

<!-- SIMPLIFY: Wins and priority descriptions -->
<!-- Before: "+1.65 wins here · priority +0.23" -->
<!-- After:  "1.65 wins · priority +0.23" -->

<!-- DISPLAY: Static Wins number + "wins" next to it -->
<!-- Before: "+1.65 wins here" -->
<!-- After:  "1.65 wins" -->

<!-- REMOVE: Star UI elements (★★, ★, ☆) and star click handlers -->
```

---

## 5. DRAFT BOARD — Flex display rules

**Location:** Player card / position card flex display  
**Decision authority:** Claude (Architect)

```html
<!-- RULE: Only display flex potential if (-2 or -4) -->
<!-- RULE: (-6) or (-8) flexes appear only after round 20 -->
<!-- EXCEPTION: FS flex never appears for CB except in the change menu -->

<!-- FORMAT CHANGE: -->
<!-- Before: "DT1 also fits: DE1 +1.17 (−4 flex) change" -->
<!-- After:  "DT1 also DE1 (−4 flex)" -->
<!-- REMOVE: Wins number and word "fits" -->

<!-- JS pseudocode for the fix: -->
<script>
function getFlexOptions(player, roundNum) {
  const flexMap = {
    CB: ['CB1', 'CB2', 'CB3'],  // No FS for CB naturally
    // ... other positions
  };
  
  let flexOptions = flexMap[player.position] || [];
  
  // Round-based: (-6) or (-8) flexes only after round 20
  if (roundNum < 20) {
    flexOptions = flexOptions.filter(f => f.flexPenalty !== -6 && f.flexPenalty !== -8);
  }
  
  return flexOptions;
}
</script>
```

---

## 6. DRAFT BOARD — Position cards: mobile collapse + team colors + roster order

**Location:** Position card component in `merged.html`  
**Decision authority:** Claude (Architect) — CSS + JS

```css
/* MOBILE (≤760px): Collapse position cards to compact row */
@media (max-width: 760px) {
  .position-card {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px;
    /* icon + position abbreviation + OVR only */
  }
  
  .position-card.full {
    /* expands on tap — show all attributes */
  }
  
  /* Sticky header / collapsible panel for sort/filter */
  .sort-filter-controls {
    position: sticky;
    top: 0;
  }
}

/* TEAM COLORS: Left border / accent based on team */
.position-card.kc { border-left: 4px solid #E31837; }   /* Chiefs red */
.position-card.sea { border-left: 4px solid #002266; }  /* Seahawks blue */
.position-card.kc .special-teams { color: #FFB612; }    /* Chiefs yellow */
.position-card.sea .special-teams { color: #A5ACAF; }   /* Seahawks white/gray */

/* CARD ORDER: Follow roster order, not alphabetical */
```

---

## 7. DRAFT BOARD — Cooper Dejean FS flex glitch fix

**Location:** Flex suggestion logic in `merged.html`  
**Decision authority:** Claude (Architect) — JS logic

```js
<!-- BUG: When QB taken in round 1, Cooper Dejean (CB) shows FS flex option -->
<!-- FIX: FS flex should NOT appear for CB position except in change menu -->

// Pseudocode for the fix:
function getFlexOptions(player, roundNum) {
  const flexMap = {
    CB: ['CB1', 'CB2', 'CB3'],  // No FS for CB naturally
    // ... other positions
  };
  
  let flexOptions = flexMap[player.position] || [];
  
  // Round-based: (-6) or (-8) flexes only after round 20
  if (roundNum < 20) {
    flexOptions = flexOptions.filter(f => f.flexPenalty !== -6 && f.flexPenalty !== -8);
  }
  
  return flexOptions;
}
```

---

## 8. DRAFT BOARD — Text size + board expansion

**Location:** Draft board header + panel in `merged.html`  
**Decision authority:** Claude (Architect)

```css
/* BIGGER TEXT: "You're on the clock — Round 2 of 26, Pick 14 (overall 46 of 832)" */
.clock-text {
  font-size: 1.2rem; /* or larger */
  font-weight: bold;
}

/* EXPAND BOARD: Two more names visible on desktop */
.draft-board-panel {
  min-height: calc(100vh - 200px); /* expand to bottom of panel */
}
```

---

## 9. DRAFT BOARD — "Your Pick order / Roster Depth chart" horizontal layout

**Location:** Pick order / Depth chart section  
**Decision authority:** Claude (Architect) — CSS

```css
/* LESS VERTICAL, MORE HORIZONTAL */
.pick-order-depth-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.your-pick-order { flex: 1; }
.roster-depth-chart { flex: 1; }
```

---

## 10. DRAFT BOARD — "1 of 26 starters · +3.69 wins" moved to bottom

**Location:** Bottom of page (currently at top)  
**Decision authority:** Claude (Architect)

```html
<!-- MOVE: From top to bottom of page -->
<!-- Before: <div class="roster-summary">1 of 26 starters · +3.69 wins above a replacement-level lineup</div> (at top) -->
<!-- After:  <div class="roster-summary" style="position: fixed; bottom: 20px;">1 of 26 starters · +3.69 wins above a replacement-level lineup</div> (at bottom) -->
```

---

## 11. DRAFT BOARD — Remove "MORE" from tab footer

**Location:** Tab footer in `merged.html`  
**Decision authority:** Claude (Architect)

```html
<!-- REMOVE: "MORE" text from tab footer -->
<!-- Before: <div class="tab-footer">... MORE ...</div> -->
<!-- After:  (removed) -->
```

---

## 12. DRAFT BOARD — Badges moved under "Save My Weights"

**Location:** Badge display + weights section  
**Decision authority:** Claude (Architect)

```html
<!-- MOVE: Badges (e.g. "Can't Run" penalty) to bottom under "Save My Weights" -->
<!-- Before: Badges scattered or near top -->
<!-- After:  -->
<div class="badges-container" style="margin-top: 16px;">
  <!-- badges here -->
</div>
<button id="save-my-weights">Save My Weights</button>
```

---

## 13. DRAFT BOARD — "Use model weights" → "Default"

**Location:** Weights toggle button  
**Decision authority:** Claude (Architect)

```html
<!-- REPLACE: Button text -->
<!-- Before: <button id="use-model-weights">Use model weights</button> -->
<!-- After:  <button id="use-default-weights">Default</button> -->

<!-- UPDATE: Explanation text -->
<!-- Before: "The default is the model weights: what each spot is really worth in wins, scaled so the biggest spot (QB) is 700 and rounded to the nearest 5. Edit any number to build your own set; the buttons switch between the two." -->
<!-- After:  "Default is how the draft simulator sees the game." -->
```

---

## 14. DRAFT BOARD — "Save My Weights" button state logic

**Location:** Weights section  
**Decision authority:** Claude (Architect) — JS state tracking

```html
<!-- BUTTON: "Save My Weights" -->
<!-- Before: <button id="back-to-my-weights">Back to my weights</button> -->
<!-- After:  <button id="save-my-weights" disabled class="transparent">Save My Weights</button> -->

<style>
  #save-my-weights.transparent {
    opacity: 0.4;
    cursor: not-allowed;
  }
  #save-my-weights.active {
    background: #007bff;
    color: white;
    opacity: 1;
    cursor: pointer;
  }
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
    // Save logic
    weightsChanged = false;
    const btn = document.getElementById('save-my-weights');
    btn.disabled = true;
    btn.classList.add('transparent');
    btn.classList.remove('active');
  }
</script>
```

---

## 15. DRAFT BOARD — Default weights

**Location:** Weights configuration in `merged.html`  
**Decision authority:** Kosi (Owner) values — Claude implements

```js
// DELETE: Any saved user weights
// USE ONLY: The model weights below

const DEFAULT_WEIGHTS = {
  QB: 700,
  RB1: 185,
  RB2: 60,
  WR1: 305,
  WR2: 165,
  WR3: 105,
  WR4: 5,
  TE1: 220,
  TE2: 40,
  OT1: 285,
  OT2: 285,
  OG1: 235,
  OG2: 235,
  C: 235,
  DE1: 360,
  DE2: 305,
  DT1: 260,
  DT2: 210,
  // DL5 / Elephant 5: (not specified, keep existing or set 0)
  MIKE: 240,
  WILL: 220,
  'LB3 / SAM': 20,
  LB4: 5,
  CB1: 395,
  CB2: 325,
  'CB3 / Nickel': 260,
  'CB4 / Dime': 5,
  SS: 245,
  'SS2 / Big Nickel': 5,
  FS: 235,
  'FS2 / Quarter': 5,
  K: 200,
  P: 1,
  FB: 1,
};

// TE1 should be within 0.5 of WR1 → TE1 ≈ 255-355 (currently 220, WR1=305, diff=85)
// TE2 should be within 0.5 of WR3 → TE2 ≈ 55-155 (currently 40, WR3=105, diff=65)
// QBs rush and Receivers block → adjust Pass/Run percentages
// QB: not 100/0 → e.g. 90/10
// WRs: not 100/0 → e.g. 95/5
```

---

## 16. DRAFT BOARD — Local storage persistence

**Location:** Draft state management in `merged.html`  
**Decision authority:** Claude (Architect)

```js
// BUILD: localStorage so draft refresh preserves spot
function saveDraftState(state) {
  localStorage.setItem('nfl-draft-state', JSON.stringify(state));
}

function loadDraftState() {
  const saved = localStorage.getItem('nfl-draft-state');
  return saved ? JSON.parse(saved) : null;
}

// On page load:
// const state = loadDraftState() || initialState;
// On every pick: saveDraftState(currentState);
```

---

## 17. TEAM COMPARISON PAGE — Remove "real"

**Location:** Subtitle "Put any two real rosters side by side."  
**Decision authority:** Claude (Architect)

```html
<!-- REPLACE: -->
<!-- Before: "Put any two real rosters side by side." -->
<!-- After:  "Put any two rosters side by side." -->
```

---

## 18. TEAM COMPARISON PAGE — Remove effective ratings text

**Location:** Main Team Comparison Page only (keep in Draft Simulator)  
**Decision authority:** Claude (Architect)

```html
<!-- REMOVE (main Team Comparison Page only): -->
<!-- "Ratings shown are effective ratings — players flexed out of position carry their penalty." -->
<!-- KEEP: This text in Draft Simulator -->
```

---

## 19. TEAM COMPARISON PAGE — Unit Comparison: remove parentheses

**Location:** Unit Comparison table in `merged.html`  
**Decision authority:** Claude (Architect)

```html
<!-- BEFORE: -->
<!-- <tr><td>Offense (QB+RB+WR+TE+OL)</td><td>81.4</td></tr> -->
<!-- <tr><td>Defense (DL+LB+Secondary)</td><td>83.4</td></tr> -->

<!-- AFTER: -->
<!-- <tr><td>Offense</td><td>81.4</td></tr> -->
<!-- <tr><td>Defense</td><td>83.4</td></tr> -->
<!-- Remove ALL parentheses from row labels -->
```

---

## 20. TEAM COMPARISON PAGE — Offense/Defense reorganization

**Location:** Unit Comparison table  
**Decision authority:** Claude (Architect) — table structure

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
  
  <tr><td colspan="3"><strong>Defense</strong></td></tr>  <!-- aesthetic break -->
  <tr><td>Defense</td><td>83.4</td><td>81.2</td></tr>
  <tr><td>Defensive Line</td><td>85.0</td><td>82.3</td></tr>
  <tr><td>Linebackers</td><td>82.8</td><td>91.4</td></tr>
  <tr><td>Secondary</td><td>85.3</td><td></td></tr>
  <tr><td>Run Defense</td><td>86.1</td><td></td></tr>
  <tr><td>Pass Defense</td><td></td><td></td></tr>
</table>
```

---

## 21. TEAM COMPARISON PAGE — Default matchup Chiefs vs Raiders

**Location:** Team Comparison default selection  
**Decision authority:** Kosi (Owner)

```js
// CHANGE: Default matchup
// Before: Team A = Los Angeles Rams, Team B = Baltimore Ravens
// After:  Team A = Kansas City Chiefs, Team B = Las Vegas Raiders

// REMOVE: "On your current weights, Los Angeles Rams grades 1.88 points ahead..." description
```

---

## 22. GUIDE PAGE — Remove Guide Box

**Location:** Guide Page intro  
**Decision authority:** Claude (Architect)

```html
<!-- REMOVE: Guide Box and text -->
<!-- Before: -->
<!-- <div class="guide-box"> -->
<!--   Guide -->
<!--   Short reference sections for the terms the sim uses. Click through only what you need. -->
<!-- </div> -->
<!-- After:  (removed entirely) -->
```

---

## 23. GUIDE PAGE — Rewrite item 1

**Location:** Guide Page item 1  
**Decision authority:** Claude (Architect)

```html
<!-- REPLACE: -->
<!-- Before: "Play the season. Seventeen games, a 14-team playoff, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself." -->
<!-- After:  "Play the season. seventeen game Regular Season, the Playoffs, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself." -->
```

---

## 24. GUIDE PAGE — Remove stats parenthetical

**Location:** Guide Page "advanced stats" item  
**Decision authority:** Claude (Architect)

```html
<!-- REPLACE: -->
<!-- Before: "advanced stats (what caused sacks and big runs)" -->
<!-- After:  "advanced stats" -->
```

---

## 25. GUIDE PAGE — Wins per +1 OVR table simplification

**Location:** Guide Page Wins table  
**Decision authority:** Claude (Architect) — data + markup

```html
<!-- REMOVE: "x wins from a 70-90 upgrade" in all instances -->
<!-- REMOVE: "Wins, 70→90" column -->
<!-- REMOVE: "Pass / Run" column -->
<!-- KEEP: Slot, Wins per +1 OVR -->

<!-- BEFORE: -->
<!-- <tr><td>QB</td><td>.127</td><td>2.54</td><td>100 / 0</td></tr> -->
<!-- AFTER:  -->
<!-- <tr><td>QB</td><td>.127</td></tr> -->

<!-- LIST PLAYERS IN ORDER WITH Wins per +1 OVR NUMBER -->
```

---

## 27. GUIDE PAGE — Arithmetic inconsistency fixes (Colleagues 3 & 4)

**Location:** Wins per +1 OVR table  
**Decision authority:** Claude (Architect) — must fix before applying weights

```js
// FIXES:
// DT1 .047 → 0.95, CB3 .047 → 0.94 (same input, different output) → make consistent
// RB1 .033 → 0.67 should be 0.66
// SAM .004 → 0.07 should be 0.08
// MIKE .043 → 0.86 vs OG/C .043 → 0.85 → make consistent
// COLUMN 2 should equal exactly 20 × COLUMN 1 everywhere
// Column 1 sum should not imply >14 wins (season cap)
```

---

## 28. POSITION RANKINGS DROPDOWN — Combinations + pluralization

**Location:** Position Rankings dropdown in `merged.html`  
**Decision authority:** Claude (Architect) — dropdown logic

```html
<!-- OFFENSE COMBINATIONS (start from QB, build down): -->
<!-- QB -->
<!-- QB + WR1 -->
<!-- QB + WR1 + OT1 -->
<!-- QB + WR1 + OT1 + OT2 -->
<!-- ... continue until WR3 -->

<!-- DEFENSE COMBINATIONS: -->
<!-- CB1 -->
<!-- CB1 + DE1 -->
<!-- CB1 + DE1 + CB2 -->
<!-- CB1 + DE1 + CB2 + DE2 -->
<!-- ... continue until DT2 -->

<!-- COMBINED UNITS: -->
<!-- Start from QB + CB1 (first combo not already present) -->
<!-- ... continue until combination with WR3 -->

<!-- ONLY ONE COPY of each set -->

<!-- PLURAL POSITIONS: -->
<!-- "Defensive Line (Edges + DTs)" not "Defensive Line (Edge + DT)" -->
<!-- "(WR1+WR2+WR3)" not "(WR1-3)" -->
<!-- "(CB1+CB2+CB3+CB4)" not "(CB1-4)" -->
```

---

## 29. PLAYER BROWSER — Desktop ~15 players visible; footer tabs always visible

**Location:** Player browser component  
**Decision authority:** Claude (Architect)

```css
/* DESKTOP: Only ~15 players visible at a time */
.player-browser-list {
  max-height: calc(15 * var(--player-row-height)); /* or fixed pixel height */
  overflow-y: auto;
}

/* FOOTER TABS: Always visible at bottom */
.footer-tabs {
  position: sticky;
  bottom: 0;
}
```

---

## 30. GLOSSARY + GAME-PLAN MATH

**Location:** Guide Page  
**Decision authority:** Claude (Architect) — cross-reference logic

```html
<!-- MOVE: "The math of every game-plan choice" and "Glossary" to Guide Page -->
<!-- HIDE: From home page -->
<!-- CROSS-REFERENCE: Football terms in game previews/reviews ↔ glossary terms -->
<!-- LIST: Terms a casual basketball fan (Super Bowl viewer) wouldn't know -->
<!-- EXPLAIN: Each term in plain language -->
```

---

## 31. AESTHETICS — Team color theming + beauty enhancements

**Location:** Throughout `merged.html`  
**Decision authority:** Claude (Architect) — CSS + JS

```css
/* Team color palette — 32 NFL teams, primary + accent + special teams */
:root {
  --team-primary: #000000;
  --team-secondary: #ffffff;
  --team-accent: #cccccc;
}

/* Example: Kansas City Chiefs */
body.user-team-kc {
  --team-primary: #E31837;
  --team-secondary: #FFB612;
  --team-accent: #ffffff;
}

/* Example: Seattle Seahawks */
body.user-team-sea {
  --team-primary: #002266;
  --team-secondary: #A5ACAF;
  --team-accent: #69BE28;
}

/* Draft board cards get team-colored left borders */
.position-card {
  border-left: 4px solid var(--team-primary);
}

.position-card:hover {
  border-left-color: var(--team-accent);
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

/* Priority badges use team colors */
.priority-badge {
  background: var(--team-primary);
  color: var(--team-secondary);
}

/* Section headers */
.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--team-primary);
}

.section-header::before {
  content: "";
  width: 4px;
  height: 24px;
  background: var(--team-accent);
  border-radius: 2px;
}

/* Typography */
h1, h2, h3 {
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--team-primary);
}

.player-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--team-primary);
}

.player-ovr {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  color: var(--team-secondary);
  background: var(--team-primary);
  padding: 2px 6px;
  border-radius: 4px;
}

/* Buttons */
.btn-primary {
  background: var(--team-primary);
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  transition: opacity 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-secondary {
  background: transparent;
  color: var(--team-primary);
  border: 2px solid var(--team-primary);
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
}

/* Tables */
table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}

th {
  background: #f8f9fa;
  color: var(--team-primary);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid var(--team-primary);
}

td {
  padding: 12px;
  border-bottom: 1px solid #e5e5e5;
}

tr:hover {
  background: rgba(0,0,0,0.05);
}

/* Empty states */
.empty-state {
  text-align: center;
  padding: 48px 24px;
  color: #666;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  color: var(--team-primary);
}
```

**JS needed:** Add `user-team-[code]` class to `<body>` when team is selected. Map all 32 teams to their NFL brand colors.

---

## ARITHMETIC INCONSISTENCIES — Must fix before weight changes

| Issue | Example | Fix |
|-------|---------|-----|
| Column 2 ≠ 20 × Column 1 | DT1 .047→0.95, CB3 .047→0.94 | Make consistent |
| RB1 .033→0.67 | Should be 0.66 | Fix to 0.66 |
| SAM .004→0.07 | Should be 0.08 | Fix to 0.08 |
| MIKE .043→0.86 vs OG/C .043→0.85 | Inconsistent same-input | Make consistent |
| Aggregate ~22.93 wins | Season cap ~14 wins | Add logistic compression note |

---

## BOUNDARIES (R5 compliance)

- No product file edited by VL — `merged.html` (V21) is read-only
- No `session_send` executed — Kilo Code member without OpenChamber access (UK standing instruction M-110)
- No other session's content edited
- No branches/PRs/tags/pushes initiated
- All changes await Claude's implementation as `Football-Sim-V22.html`

---

## NEXT STEPS FOR CLAUDE

1. Read this document as the specification for V22
2. Implement changes in priority order (1–31 above)
3. Save output as `Football-Sim-V22.html`
4. Run the MiniMax 4-check gate (exit 0, A–H all true) after changes
5. Verify the 390px CTA below-fold finding is addressed
