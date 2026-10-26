# Z.ai Bug Analysis: Football-Sim-Z-post-blue-w21.html

**File:** `Football-Sim-Z-post-blue-w21.html` (10,858 lines, ~1.1MB)
**Branch:** `origin/council/zai`
**Base:** `Pre-Colors` (sha256: 40233d6be00e987c)

---

## Executive Summary

This is a **single self-contained HTML file** (no build step, no CDN, no external deps except Google Fonts) implementing an NFL Draft Simulator with full season simulation, playoffs, 100-season Monte Carlo, and a "20-0" rose-gold visual identity. The code has evolved through ~21 waves (w14-w21) with Owner-driven feature requests.

**Major Systems:**
- **Draft Board**: Real-time pick simulation with CPU logic, priority system, flex penalties
- **Season Sim**: 17-game schedule, week-by-week or batch, coaching philosophy (personnel × strategy), game plans
- **Game Engine**: `matchupModel()` with unit ratings → expected points → Poisson scoring events
- **100-Season Report**: Monte Carlo with statistical analysis (correlations, ridges, unit contributions)
- **Team Theming**: `[data-zpbteam]` CSS variable takeover for 32 NFL franchises
- **Visual Identity**: Rose-gold/cream light mode, dark rose-gold dark mode, Cinzel Decorative + Bodoni Moda fonts, shimmering text, liquid-metal buttons

---

## Architecture Overview

### CSS (Lines 1-2000+)
- **Dual token systems**: Original Pre-Colors (`--accent:#4f8cff`, `--good:#3ecf8e`) + Z-Post-Blue (`--accent:#c9a24b`, `--gold:#ffc43c`, `--rose:#c97a8e`)
- **Theme switching**: `prefers-color-scheme` + `[data-theme]` + `[data-zpbteam]` cascade
- **Animations**: `fxpop`, `fxshine`, `fxglow`, `fxtoast`, marquee scroll, dripping gold, shimmer sweeps
- **Reduced motion**: Comprehensive `@media (prefers-reduced-motion: reduce)` guards

### JavaScript (Lines 2170-10858)
Single giant `<script>` block with:
- **Data**: 1,200 players, 32 teams, ratings, constants (`MC`, `PLAN_K`, `RATING_SPECS`, `FLEX`, `NATURAL_SLOT_MAP`)
- **Draft**: `renderDraftBoard2`, `renderDraftLive`, `processUntilUserTurn`, `cpuPick`, `makeUserPick2`
- **Season**: `simulateCurrentWeek`, `advanceWeek`, `startSeason`, `simRestOfSeason`
- **Game**: `simulateGame` → `matchupModel` → `realize` → `makeScoringEvents`
- **100-Season**: `runLeague100`, `render100` (overridden by Z.ai)
- **UI**: `setActiveTab`, `renderSeasonTab`, `renderRegularSeasonView`, `renderPlayoffsView`, etc.

---

## Bugs & Issues Found

### 1. **Race Condition: `setActiveTab` vs Async Render** (Critical)
**Location:** `setActiveTab` (line ~385 in Pre-Colors, similar in Z-post-blue)
**Problem:** `setActiveTab` calls `renderDraftLive()` / `renderSeasonTab()` synchronously, but these trigger async operations (timeouts, animations). Rapid tab switching causes:
- Multiple concurrent renders to same container
- Stale event listeners accumulating
- `draftSim.awaitingUser` state corruption
- Visual flicker / wrong view showing

**Evidence:** `setActiveTab` does `panel.innerHTML = h` then immediately calls render functions that also write to same panel. No render lock or cancellation of previous render.

---

### 2. **Draft Board: `FLEX.CB.FS = 0` Breaks Cooper DeJean Logic** (High)
**Location:** `FLEX` object (line ~499 in Pre-Colors)
```javascript
FLEX = {
  CB: {FS: 0, SS: 2, ...},  // FS flex penalty = 0!
  ...
}
```
**Problem:** `flexPenaltyFor('CB', 'FS')` returns 0 → `isOutOfPosition()` returns false → player shows as natural FS → but `flexAlt` still computes FS as alternative → "Jeffery Simmons Flex OG1 (-4)" appears on 95 OVR players.

**Owner Request:** "REMOVE THE AUTOMATIC SHOWING OF FLEX TO OG1. NO REASON WHY ANY 95+ SHOULD BE FLEXING ANYWAY."

---

### 3. **100-Season "Back to Season" Button Broken** (High)
**Location:** `render100` (line 6121, 6135)
```javascript
const back = document.getElementById('back100Btn');
if(back) back.addEventListener('click', ()=>renderSeasonTab(container));
```
**Problem:** `renderSeasonTab` expects `container` to be the season host, but `container` passed to `render100` is the draft results panel. Clicking "Back to season" either does nothing or renders season inside draft results panel.

**Glitch:** "fix the Back-to-season glitch that hides your team from the rankings" (P-104)

---

### 4. **Team Dropdown: Pick Box Shows Logo (Should Not)** (Medium)
**Location:** Team dropdown enhancement (line ~4200)
```javascript
const isPick = sel.id==='draftPickNumberSelect';
// ...
if(isPick) btn.innerHTML = '<span class="zpb-face" style="' + vars + '">' + face + '</span>';
```
**Problem:** The pick dropdown (`draftPickNumberSelect`) still gets `logo(t)` prepended in some code paths. Owner: "PLEASE REMOVE THE TEAM'S LOGO FROM APPEARING ON THE RIGHT DROPDOWN MENU WHERE YOU SELECT YOUR DRAFT POSITION."

---

### 5. **Homepage: Team Color Not Applied Immediately** (Medium)
**Location:** `slotSel.addEventListener('change')` (line ~4280)
```javascript
if(typeof zpbApplyTeamTheme==='function'){
  const tv = slotSel.value;
  if(tv && tv!=='__random') zpbApplyTeamTheme(tv); else zpbClearTeamTheme();
}
```
**Problem:** `zpbApplyTeamTheme` sets `[data-zpbteam]` on `:root`, but the hero/marquee/stepper don't re-render. The color change only appears after navigation. Owner: "WHENEVER A TEAM IS HIGHLIGHTED, THE HOMEPAGE AND THEREFORE ALL THE FOOTER PAGES AS WELL SHOULD AUTOMATICALLY SWITCH TO THAT TEAM'S COLOR, EVEN BEFORE THE SEASON HAS BEEN INITIATED."

---

### 6. **Seahawks Dropdown: Dark Blue on Static, Light on Hover** (Medium)
**Location:** Dropdown option rendering (line ~4250)
```javascript
const st = pack(t);
const optVars = st ? '--zaL:' + ... + ';--zaD:' + st.txd + ';--zw:color-mix(in srgb,' + st.accL + ' 13%, transparent)' : '';
```
**Problem:** Option text color uses `st.txd` (dark variant) instead of `st.txL` (light variant). On static dropdown (closed), the option text is dark blue on dark background. On hover/open, it uses light variant. Owner: "ALWAYS USE THE LIGHTER COLORS THAT CURRENTLY APPEAR ONCE YOU CLICK THE LEFT DROPDOWN MENU."

---

### 7. **Draft Board: "DIME" in Weird Box with "—"** (Medium)
**Location:** `renderDraftBoard2` / `zpbDimeDrafRow` (line ~5400)
**Problem:** CB3 slot shows "Dime" with a box and em dash. Owner: "THE DIME IS ALSO IN A WEIRD BOX AND HAS A '—-' NEX TO IT. REMOVE THE BOX AND THE DASH."

---

### 8. **Pick Order / Depth Chart Toggle: 3-4 / 4-3 Wrapping** (Low)
**Location:** Chip rendering (line ~1240)
```javascript
.zpb-serrow{display:flex;flex-wrap:wrap;gap:4px;align-items:stretch;margin:0 0 12px;}
.zpb-srbtn{min-width:46px;...}
```
**Problem:** "3-4" and "4-3" buttons wrap to two lines on mobile. Owner: "SLIGHTLY REDUCE THE SIZE OF THE PICK ORDER / DEPTH CHART TOGGLE TO MAKE ROOM FOR THE '3-4' / '4-3' TO ALWAYS BE ON ONE LINE OF TEXT."

---

### 9. **Depth Chart: Filled Positions Don't Shimmer** (Low)
**Location:** `renderDraftRoster2` (line ~5500)
```javascript
<span class="slotname${p?' zpb-shm':''}">${extra||''}${LABELS[sl]||sl}</span>
```
**Problem:** Only 90+ player names shimmer (`zpb-shm` on player name), but Owner wants: "When a position is filled in the depth chart, have that position name shimmer."

---

### 10. **Player Cards: Flex Numbers Show on 95+ OVR** (Medium)
**Location:** `flexTxt` in `renderDraftBoard2` (line ~1714)
```javascript
const flexTxt = r=> r.flex ? ` <span class="narr">(flex → ${LABELS[r.slot]||r.slot}, −${r.pen})</span>${r.v!=null && bestNat[r.g]!=null && r.v>bestNat[r.g]+1e-9 ? ' <span class="toptag" style="background:var(--good);">FLEX VALUE</span>' : ''}` : '';
```
**Problem:** Shows "Flex OG1 (-4)" on 95 OVR players. Owner: "ON THE PLAYER CARDS OF THE DRAFT BOARD, REMOVE ANY FLEX NUMBERS LIKE THIS 'Jeffery Simmons 95 OVR Flex OG1 (-4) · 75% gone'"

---

### 11. **Draft Board Cards: Vertical Stacking, Wins Not on Top of Button** (Medium)
**Location:** `cardgrid` / `pcard` / `prow` (lines ~183, 1240)
**Problem:** Cards stack vertically in depth-chart order but Owner wants: "THE WINS NUMBER SHOULD STACK VERTICALLY ON TOP OF THE DRAFT BUTTON. LET'S HAVE THE CARDS BE MORE HORIZONTAL IN GENERAL."

---

### 12. **Team Comparison: Lineup & Flex Panel Visible Pre-Season** (Medium)
**Location:** `renderComparisonTab` / `lineupPanelHTML` (line ~5100)
**Problem:** Panel shows before season starts. Owner: "BEFORE YOU START THE SEASON, THE LINEUP & FLEX PANEL SHOULD NOT BE VISIBLE. REMOVE IF THE SEASON HASN'T STARTED."

---

### 13. **Lineup Panel: Vertical Lines Wrong** (Medium)
**Location:** `.zpb-lu-cols` (line ~300)
```css
.zpb-lu-cols{border-right:3px solid var(--accent2);border-bottom:3px solid var(--sub);}
```
**Problem:** Owner wants: "REMOVE THE SECOND AND THIRD VERTICAL LINES FROM THE LEFT. PLACE A VERTICAL ALIGNED RIGHT ON THE PANEL. PUT THE OTHER LINE HORIZONTAL AT THE BOTTOM."

---

### 14. **Position Rankings: Cinzel Decorative Not Applied Everywhere** (Medium)
**Location:** `#viewGroups` (line ~310)
```css
#viewGroups{font-family:'Cinzel Decorative','Cinzel','Bodoni Moda',Georgia,serif;}
```
**Problem:** Only `#viewGroups` has the font. Player names, OVR numbers, team names in other panels don't. Owner: "ON THE POSITION RANKINGS MENU, TURN EVERY TEXT INTO OUR FAVORITE FONT, Cinzel Decorative."

---

### 15. **Position Rankings: 90+ Shimmer / 85+ Vibrant Not Working** (Medium)
**Location:** `.zpb-gname.zpb-shm` / `.zpb-gname.zpb-vib` (line ~320)
**Problem:** Classes `zpb-shm` and `zpb-vib` are never added to player name elements in position rankings. The CSS exists but JS doesn't apply it.

---

### 16. **Position Rankings: OVR in Parentheses, Not Team Colors** (Medium)
**Location:** Player rendering in position rankings
**Problem:** Shows "(90)" instead of "Player Name 90" with OVR in team color. Owner: "REMOVE THE PARENTHESES AROUND THE PLAYERS OVR RATINGS AND WRITE THE PLAYER AND THE NUMBER IN TWO DIFFERENT COLORS OF THAT TEAM'S COLOR PALETTE."

---

### 17. **Position Rankings: "(missing slots filled at 70 OVR)" Parentheses** (Low)
**Location:** `.zpb-70note` (line ~380)
**Problem:** Text has parentheses. Owner: "REMOVE THE PARENTHESIS HERE. HAVE THIS TEXT FLOAT IN AT THE VERY BOTTOM OF THE PANEL"

---

### 18. **Team Comparison: Missing Players in Panels** (High)
**Location:** `renderComparisonTab`, `renderLineupTableHTML`
**Problem:** "THERE ARE STILL PLAYERS NOT BEING GENERATED IN THE PANELS OF THE TEAM COMPARISON PAGES, EVEN THE STATIC PAGE FROM THE FOOTER."

---

### 19. **Team Comparison: "Aaron Brewer (C, 90 OVR); SS is the soft spot at 71"** (Medium)
**Location:** `zpbStrengthsHTML` / anchor/leak logic
**Problem:** Hardcoded text appears. Owner: "REMOVE THIS TEXT: 'Aaron Brewer (C, 90 OVR); SS is the soft spot at 71.' VISUALIZE BETTER AN 'ANCHOR' AND A POSITION 'WEAKNESS' FOR EVERY."

---

### 20. **Madden Rankings: Weight Panel Text Placement** (Low)
**Location:** `.zpb-wadj` / weights badges (line ~250)
**Problem:** Text "Adjust any weight on the left and every team's score and rank recalculates instantly." should be below weights panel. Owner: "REMOVE THE WORD LEFT AND MOVE THIS BELOW TO JUST ABOVE THE WEIGHTS PANEL WHICH HAS HOPEFULLY BEEN REVISUALIZED AS BADGES."

---

### 21. **Madden Rankings: "Missing depth-chart slots..." Text Placement** (Low)
**Problem:** Text at top of page should fade in/out at bottom of team panel on click. Owner: "REMOVE THIS TEXT FROM THE TOP OF THE PAGE. THIS SHOULD FADE IN AND OUT AT THE BOTTOM OF THE TEAM PANEL WHEN YOU CLICK ON A TEAM IN TINY TEXT."

---

### 22. **Moving Header: "20-0" Button Position** (Low)
**Location:** `.zpb-home` / marquee (line ~500)
**Problem:** "2" blends into screen edge. Owner: "MOVE IT RIGHT ABOUT HALF OF THE '0''S LENGTH."

---

### 23. **Lineups Menu: Position + OVR Inside Clickable Box** (Low)
**Location:** `.zpb-srbtn` / lineup editor
**Problem:** Should only show player name inside clickable boxes. Owner: "IN THE LINEUPS MENU, THE ONLY THING THAT SHOULD INSIDE OF THE CLICKABLE MENUS IS THE PLAYER'S NAME. REMOVE THE POSITION AND OVERALL FROM INSIDE OF THE BOX."

---

### 24. **Position Rankings: Decimals on Group Rankings** (Low)
**Problem:** Shows "0.66" instead of integers. Owner: "INTEGERS ONLY. REMOVE THE DECIMALS FROM THE GROUP POSITION RANKINGS."

---

### 25. **Position Rankings: Panels Not Horizontal Row** (Low)
**Problem:** Panels stack vertically. Owner: "CAN YOU MAKE EACH OF THESE PANELS IN ONE HORIZONTAL ROW. ABOUT THE SAME SIZE JUST SO IT LOOKS MORE LIKE THE BADGES OF THE YOUR TEAM'S STATS IN THE SEASON. NEXT TO EACH OTHER AND ADD RUSHING"

---

### 26. **Lineup Comparison: Inefficient Lineup Text** (Low)
**Location:** `lineupCell` / flex penalty display
**Problem:** Shows "(78 here; 0.055 wins per OVR at this slot)" Owner: "REPLACE THIS JUST WITH 'x' WHERE IS X IS THE OVR HERE. REMOVE WINS COMPLETELY FROM THIS MENU."

---

### 27. **Game Preview: Texans Text Color Too Dark** (Low)
**Location:** Team color application for Houston Texans
**Problem:** Dark blue on dark background. Owner: "THE TEXANS TEXT COLOR IS FAR TOO DARK AS WELL. IT NEEDS TO BE BRIGHTER. CONSIDERING USE MORE SILVER FOR SOME OF THESE TEAMS WITH DARK BLUE IF SILVER IS IN THEIR BADGE OR COLOR PALETTE."

---

### 28. **Game Preview: Bar Colors Inconsistent** (Medium)
**Location:** `zpbPreviewStripHTML`, `matchupMathInner`
**Problem:** "THE COLORS IN ALL OF THE BARS AREN'T ALWAYS CONSISTENT WITH WHEN THE BAR IS FULL AND WHEN THE BAR IS NEAR EMPTY. THE BAR SHOULD ALWAYS BE THE SAME COLOR OF THE AMOUNT THAT MOVES LEFT AND RIGHT WITH THE DIFFERENT MATH."

---

### 29. **Game Preview: Matchup Math Numbers Alignment** (Low)
**Location:** `matchupMathInner` (line ~6000)
**Problem:** "IN THE MATCHUP MATH PANEL, MOVE THE NUMBERS FOR THE RIGHT TEAM ALIGNED TO THE RIGHT OF THE BARS."

---

### 30. **Game Preview: Remove Opponent Scouting Report** (Medium)
**Location:** `renderPreviewPanel`
**Problem:** "REMOVE THE OPPONENT SCOUTING REPORT PANEL COMPLETELY. THAT MATH IS ALL PRESENT IN THE MATCHUP MATH PANEL. COMPLETELY REMOVE THE 'YOUR TEAM'S IDENTITY' FOR THE SAME REASON."

---

### 31. **Standings: User Division Width** (Low)
**Location:** `renderStandingsHTML` (line ~6050)
```javascript
return `<div class="panel zpb-glowpanel" ...>${divTable(myDiv, false)}${ordered.map(d=>divTable(d, true)).join('')}</div>`;
```
**Problem:** User division should be 2x width of others. Owner: "IN THE STANDINGS, YOUR TEAM'S DIVISION SHOULD BE EXACTLY TWICE THE SIZE OF THE OTHER BOXES, NOT THE FULL HORIZONTAL LENGTH."

---

### 32. **Game Preview: "Can you go 20-0?" Alignment** (Low)
**Location:** `.zpb-story-kicker` / champion banner
**Problem:** "ON THE CONSTANT 'CAN YOU GO 20-0?' AT THE TOP RIGHT OF THE PAGE, ALIGN THAT EXACTLY AT THE TOP RIGHT CORNER OF THAT PANEL AND CREATE A LITTLE MORE SPACE BETWEEN THE 'GO' AND THE '20-0' AND THE '?'"

---

### 33. **Game Preview: Remove "THE MATCHUP, PLAYER BY PLAYER"** (Low)
**Location:** `renderPreviewPanel`
**Problem:** "REMOVE THIS TEXT: 'THE MATCHUP, PLAYER BY PLAYER'"

---

### 34. **Game Preview: Key Players Side-by-Side** (Medium)
**Location:** `renderKeyPlayersHTML` (line ~5800)
**Problem:** Currently stacks stars vertically. Owner: "LINEUP THE PLAYERS DIRECTLY ACROSS FROM EACH OTHER INSTEAD OF THE TWO TEAMS' STARS STACKED ON EACH OTHER"

---

### 35. **During Game: FG Box Style for TD/Turnover** (Medium)
**Location:** `makeScoringEvents` / replay rendering (line ~3500)
**Problem:** Owner wants boxes around "TD", "FG", "XX" (yards), "•" (turnover), "FF", "FR", "INT". "USE THE Cinzel Decorative FOR EVERY NAME AND TEXT ON THE DURING THE GAME."

---

### 36. **Season Review: Cinematic Flow** (High)
**Location:** `zpbSeasonStoryHTML` / `zpbWireStory` (line ~7500)
**Problem:** Complex cinematic sequence with badges, star cards, honors, playoff verdict. Owner wants specific ordering and timing.

---

### 37. **Regular Season Review: "Vs Actual NFL Teams" Should Be Removed** (Low)
**Location:** `renderRegularReviewView`
**Problem:** "Vs Actual NFL Teams shouldn't be here. Only on the draft review page."

---

### 38. **Regular Season Review: "undefinedDIFF" Glitch** (Medium)
**Location:** `zpbGlanceHTML` (line ~8000)
```javascript
tile('Diff', ((st.pf - st.pa)>=0 ? '+' : '') + (st.pf - st.pa), ...)
```
**Problem:** `st.diff` never existed on standings map — fixed in code but may persist in other views.

---

### 39. **Regular Season Review: Remove "(MVP, All-Pro, Pro Bowl)" Text** (Low)
**Location:** `renderRegularAwardsHTML`
**Problem:** "Remove this text from the Regular season awards panel '(MVP, All-Pro, Pro Bowl)'"

---

### 40. **Regular Season Review: All-Pro Names Should Shimmer** (Low)
**Problem:** "The Name of every single player who is on first team all pro should now on always be shimmering and beautiful."

---

### 41. **Player Panel Format: Stat Chips** (Medium)
**Location:** `zpbStatChipsHTML` (line ~8200)
**Problem:** Format should be: "MOST VALUABLE PLAYER Matthew Stafford / QB · 444/665 · 4,373 [PassY] · 37 [TD] · 7 [INT] · 99.3 [20-0] · 71 [RushY] · 43 [SK] 74.4 [QBR] · 12 [W]" with boxed labels.

---

### 42. **MVP Panel: Three-Line Vertical Layout** (Low)
**Problem:** "First Most Valuable player should be shimmering with each of the three words 'Most' 'Valuable' 'Player' on their own line (so all three words vertically above each other)"

---

### 43. **Homepage: Remove Team Logo from Pick Dropdown** (Medium)
**Location:** Dropdown enhancement (line ~4200)
**Problem:** "PLEASE REMOVE THE TEAM'S LOGO FROM APPEARING ON THE RIGHT DROPDOWN MENU WHERE YOU SELECT YOUR DRAFT POSITION."

---

### 44. **Homepage: Left Dropdown Expand to Show Full Name** (Low)
**Problem:** "PLEASE EXPAND THE SIZE OF THE LEFT DROPDOWN MENU TO COMPLETELY SHOW THE NAME OF THE TEAM IF USER'S WINDOW IS LARGE ENOUGH. IF COMPRESSED, BOX SHOULD DEFAULT TO LOGO AND TEAM ABBREVIATION LIKE '<LOGO> KC'"

---

### 45. **Draft Board: Broken on w18/w21** (Critical)
**Problem:** "THE DRAFT IS BROKEN ON w18. The priority and gone values are missing the draft selection ticker isn't moving. My picks are out of order. Everything is broken."

---

### 46. **Homepage Color Change on Team Select** (High)
**Problem:** "WHENEVER A TEAM IS HIGHLIGHTED, THE HOMEPAGE AND THEREFORE ALL THE FOOTER PAGES AS WELL SHOULD AUTOMATICALLY SWITCH TO THAT TEAM'S COLOR, EVEN BEFORE THE SEASON HAS BEEN INITIATED."

---

## Code Quality Issues

### A. **Massive Single Script Block** (10,858 lines)
- No module separation
- Hard to debug, test, review
- Global namespace pollution

### B. **Duplicate/Overridden Functions**
- `render100` defined twice (original + Z.ai override)
- `renderLineupTableHTML` defined twice
- `renderUserScheduleHTML` defined twice
- `add100Button` defined twice
- `simulateGame` / `matchupModel` have multiple versions

### C. **Magic Numbers Everywhere**
- `PLAN_K = { kRun:1.4, kPass:0.85, ... }` - no documentation
- `MC = { rb:0.0249, olRun:0.0516, ... }` - coefficients from "judgment informed by PFF/SIS WAR research"
- `SLOT_BASE` hardcoded per-position stats

### D. **Inconsistent Naming**
- `zpb` prefix for Z.ai additions
- `ZPB_` for some constants
- No prefix for original functions
- `zpbRowVars` vs `zpbUserRowVars` vs `zpbTeamCell`

### E. **CSS Variable Chaos**
- 200+ CSS custom properties
- Multiple overlapping token systems
- `--tA`, `--tA2`, `--tA3`, `--tTx`, `--tSu`, `--tHr`, `--tHrd`, `--tBg`, `--tOn`, `--tG1`...`--tG6`, `--tB1`...`--tB6`, `--tO1`...`--tO4`, `--tD1`, `--tD2`, `--tBSs`, `--tBSs2`, `--tBSsb`, `--tOGs`, `--tOGhs`, `--tBSsd`, `--tBSs2d`, `--tBSsbd`, `--tOGsd`, `--tOGhsd` for team theming alone

### F. **No Tests / Type Safety**
- No TypeScript
- No unit tests
- No linting (Biome config exists but not run on this file)
- `node --check` would catch syntax errors but not logic bugs

---

## Recommendations for z.ai

### Immediate Fixes (Priority Order)

1. **Fix Draft Board Race Condition** - Add render lock / cancellation token to `setActiveTab`
2. **Fix `FLEX.CB.FS = 0`** - Set to 2 (minimum flex penalty) or remove FS from CB flex map
3. **Fix 100-Season Back Button** - Pass correct container reference or use global navigation
4. **Fix Team Dropdown Logo/Pick Issues** - Separate team dropdown from pick dropdown logic
5. **Fix Homepage Immediate Team Color** - Call `zpbApplyTeamTheme` AND re-render hero/marquee/stepper
6. **Fix Seahawks Dropdown Color** - Use `txL` (light) not `txD` (dark) for option text
7. **Fix DIME Box/Dash** - Remove wrapper box and em dash from CB3/Dime rendering
8. **Fix 3-4/4-3 Toggle Width** - Reduce button padding/min-width
9. **Fix Depth Chart Position Shimmer** - Add `zpb-shm` to `.slotname` when filled
10. **Fix Flex Numbers on 95+ Cards** - Gate `flexTxt` behind `r.p[3] < 90` check

### Structural Improvements

1. **Split into Modules** - Separate draft, season, game, ui, utils into logical sections
2. **Add TypeScript Definitions** - Even as JSDoc for IDE support
3. **Create Test Harness** - Seedable RNG + snapshot tests for `matchupModel`, `scoreRoster`, `slotWinsPerOvr`
4. **Document CSS Variable Contract** - Single source of truth for all `--t*` team tokens
5. **Extract Constants** - `MC`, `PLAN_K`, `RATING_SPECS`, `FLEX` into documented config objects

---

## Files to Reference

- **Pre-Colors (Reference Build):** `Football-Sim-PreColors.html` (sha256: 40233d6be00e987c)
- **Z-Post-Blue w21:** `Football-Sim-Z-post-blue-w21.html` on `origin/council/zai`
- **AGENTS.md:** Governance rules (workflow, reviews, protected constants)
- **PRIORITIES.md:** Current work queue (P-004 through P-186)
- **V23-OWNER-REQUESTS.md:** Owner's direct requests

---

## How to Reproduce Key Bugs

### Draft Board Broken (w18/w21)
```bash
# Open Football-Sim-Z-post-blue-w21.html
# Click "Start Draft"
# Observe: priority column empty, gone column empty, ticker not advancing
```

### 100-Season Back Button
```bash
# Run 100-season simulation
# Click "Back to season"
# Observe: Nothing happens or renders in wrong container
```

### Team Dropdown Logo on Pick
```bash
# Open homepage
# Click draft pick dropdown (right side)
# Observe: Team logo appears next to "Pick 1", "Pick 2", etc.
```

### Seahawks Dark Blue
```bash
# Open team dropdown (left side)
# Scroll to Seahawks
# Observe: Dark blue text on dark background when closed
# Click to open: Light text appears
```

---

## Questions for z.ai

1. **Render Lock Pattern:** What's your preferred approach for preventing concurrent renders? (Mutex, generation counter, AbortController)

2. **Team Color Application:** Should `zpbApplyTeamTheme` trigger a full re-render of hero/marquee/stepper, or just CSS variable updates?

3. **100-Season Navigation:** Should "Back to season" use `setActiveTab('viewSeason')` or direct `renderSeasonTab`?

4. **FLEX.CB.FS Value:** What should the minimum flex penalty be? (Owner says 95+ shouldn't flex at all)

5. **Code Splitting:** Are you open to splitting the 10k-line script into named IIFE modules within the same HTML file?

---

*Analysis complete. Ready for z.ai to triage and implement fixes.*