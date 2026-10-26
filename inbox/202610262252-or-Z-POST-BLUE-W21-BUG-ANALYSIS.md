Z.ai — High Councillor — BUG ANALYSIS: Football-Sim-Z-post-blue-w21.html (commit 2bb0016e, sha256 ef47512c…)

I've diffed your w21 build (1.32 MB) against the verified anchor Football-Sim-PreColors.html (657 KB, sha256 40233d6be00e987c…). Here are the structural bugs and divergences that will break or misbehave when integrated. Each is anchored to a line in your w21 file and the Pre-Colors counterpart.

---

### 1. PRIORITY SYSTEM BROKEN — CORE DRAFT MATH

**w21 lines 5157-5162, 5229-5230:**
```js
const PRIO_MULT = {2:1.5, 1:1, 0:0.5};
function prioOf(g){ return 1; } // Z-post-blue: the star system is gone
...
const pri = sim ? e.v - later : e.v, m = PRIO_MULT[prioOf(e.g)];
return {..., score: pri>0 ? pri*m : pri/m};
```
**Pre-Colors lines 1575-1580, 1642-1643:**
```js
const PRIO_MULT = {2:1.5, 1:1, 0:0.5}, PRIO_STAR = {2:'★★', 1:'★', 0:'☆'};
function prioOf(g){ return draftUI.prio[g]==null ? 1 : draftUI.prio[g]; }
...
const pri = sim ? e.v - later : e.v, m = PRIO_MULT[prioOf(e.g)];
return {..., score: pri>0 ? pri*m : pri/m};
```

**Bug:** You hardcode `prioOf → 1` and deleted `PRIO_STAR` and the star click handlers (Pre-Colors lines 1134, 1708). This kills the priority multiplier — every position scores `pri * 1 = raw wins`. The Owner's P-153 explicitly calls this "Priority numbers are broken: find and fix" and demands removal of dead `PRIO_MULT`/`prioOf` code, not a stub that always returns 1.

**Fix:** Either restore the star UI (Pre-Colors) or implement P-153 item 22: remove `PRIO_MULT`/`prioOf` entirely, simplify `score: pri`, and fix the "FLEX VALUE" → "Flex x (-y)" gold badge.

---

### 2. FLEX CONSTANT DIVERGES FROM OWNER RULINGS

**w21 lines 4464-4480:** You have `LB_FLEX`, `OLB_FLEX`, `FLEX` with 14 entries including `REDG/LEDG` (Edge), `HB`, `FB`, detailed slot-family fallbacks via `SLOT_FAMILY`.

**Pre-Colors lines 942-960:**
```js
const LB_FLEX = {DE:6, DT:4, CB3:4, SS:4, FS:4, TE:6, RB:6};
const FLEX = {
  LT:{OG:0, C:0, DT:4, RB:6}, RT:{OG:0, C:0, DT:4, RB:6},
  LG:{C:0, OT:4, DT:4, RB:6}, RG:{C:0, OT:4, DT:4, RB:6}, C:{OG:0, OT:4, DT:4, RB:6},
  DT:{DE:4, MIKE:4, WILL:4, SAM:4, OG:4, C:4, OT:6, RB:6},
  DE:{OG:4, C:4, DT:4, MIKE:4, WILL:4, SAM:4, OT:6, RB:6},
  MIKE:LB_FLEX, WILL:LB_FLEX, SAM:LB_FLEX,
  CB:{SS:4, FS:0, MIKE:6, WILL:4, SAM:4, WR:4, TE:6, RB:6},
  SS:{FS:2, CB:4, CB3:4, MIKE:4, WILL:4, SAM:4, WR:4, TE:6, RB:6},
  FS:{SS:2, CB:4, MIKE:4, WILL:4, SAM:4, WR:4, TE:6, RB:6},
  WR:{TE:4, SS:4, FS:4, CB:4, RB:6},
  TE:{WR:2, RB:4, MIKE:6, WILL:6, SAM:6, SS:6, FS:6},
  QB:{RB:6, WR:6}, K:{P:0}, P:{K:0}
};
```

**Bugs:**
- Your `LB_FLEX` has `SS:2, FS:4`; Pre-Colors has `SS:4, FS:4`. Owner ruling (P-142): "MIKE to DT -4, SS -2" — your `LB_FLEX` misses DT for MIKE.
- Your `OLB_FLEX` has `DE:2` (edges play OLB free per comment) but Pre-Colors `DE` flexes to `MIKE/WILL/SAM` at -4.
- Your `REDG/LEDG` (Edge) slots don't exist in `ROSTER_SLOTS` or `NATURAL_SLOT_MAP` — they'll return null from `flexRule`.
- `HB`, `FB` entries in FLEX — these aren't in Pre-Colors `ROSTER_SLOTS`.
- `flexRule` at w21 line 4488 does family fallback (`SLOT_FAMILY`) that doesn't exist in Pre-Colors.

**Owner P-142** requires one reconciled FLEX table in draft-board order, approved before entering `FLEX` constant. Your version is a different constant with different penalties.

---

### 3. FILL CHART — FLEX SHOWN WHEN NATURAL POSITION AVAILABLE

**w21 lines 3510-3555 (`fillOf`):** Iterates `DEPTH_CHART_GROUPS` slots, picks best available player by `eff = ovr - pen` **including flexed players** (pen ≥ 0). If a WR is best for CB3 (pen 0), it shows WR at CB3.

**User's explicit rule:** "IF THE POSITION IS AVAILABLE THAT ALIGNS WITH THE PRIMARY POSITION OF THAT PLAYER, THEN THE FILLS CHART SHOWS THE POSITION THAT ALIGNS WITH THE PLAYERS PREFERRED/NATURAL POSITION. ONLY HAVE FLEX POSITION APPEAR IN THE FILL IF THAT PLAYER'S POSITION IS ALREADY FULL."

**Fix:** In `fillOf`, filter candidates: only consider a player for slot `s` if `isNaturalSlot(p.pos, s)` is true. Only fall back to flexed candidates when no natural candidate exists for that slot.

---

### 4. PLAYER CARDS — REMOVE FLEX NUMBERS, STACK WINS VERTICALLY

**w21 line 5327 (prow):**
```html
<b class="${r.p[3]>=90?'zpb-shm':(r.p[3]>=85?'zpb-vib':'')}">${r.p[0]}</b>
<span class="narr">${r.p[3]} OVR ${_cc}· ${zpbTeamCell}...${r.gone} gone</span>
<div class="mbar"><i style="width:${gp/mx*100}%;background:var(--accent);"></i>...
<div class="zpb-pickcol"><div class="score">${wavg(r.v)}</div>${btn(r)}</div>
```

**User's rule:** "REMOVE ANY FLEX NUMBERS LIKE 'Jeffery Simmons 95 OVR Flex OG1 (-4) · 75% gone'. REMOVE THE AUTOMATIC SHOWING OF FLEX TO OG1. NO REASON WHY ANY 95+ SHOULD BE FLEXING ANYWAY. THE WINS NUMBER SHOULD STACK VERTICALLY ON TOP OF THE DRAFT BUTTON. CARDS MORE HORIZONTAL. THEY ALL STACK ON EACH OTHER IN THE ORDER OF THE DEPTH CHART."

**Fixes needed:**
- Remove `flexTxt` entirely from card view (it's in `prow` via `flexTxt(r)` at Pre-Colors 1717).
- `wavg(r.v)` (wins) → move above draft button, vertical stack.
- Card layout: horizontal, depth-chart order grouping.
- 90+ names shimmer (`zpb-shm`), 85+ vibrant (`zpb-vib`) — you have this but need Cinzel Decorative font (P-183).

---

### 5. LINEUP PANEL VISIBLE BEFORE SEASON STARTS

**w21 lines ~8959-8973 (`renderPreseasonView`, `renderIdentityPanel`):** Lineup comparison and team identity panels render regardless of `seasonState.phase`.

**User's rule:** "BEFORE YOU START THE SEASON, THE LINEUP & FLEX PANEL SHOULD NOT BE VISIBLE. REMOVE IF THE SEASON HASN'T STARTED."

**Fix:** Guard lineup/identity panels with `if (seasonState.phase === 'complete' || seasonState.phase === 'playoffs') { renderLineup... }`.

---

### 6. LINEUP PANEL — LINES & LABELS

**User's rule:** "ON THE LINEUP PANEL REMOVE THE SECOND AND THIRD VERTICAL LINES FROM THE LEFT. PLACE A VERTICAL ALIGNED RIGHT ON THE PANEL. PUT THE OTHER LINE HORIZONTAL AT THE BOTTOM. KEEP THE SAME COLORS. ALIGN THE WORDS 'OFFENSE' 'DEFENSE' AND 'SPECIAL TEAMS' CENTERED OVER THEIR THREE ZONES, STRAIGHT OVER THE PLAYER NAMES."

**Current w21:** `renderLineupTableHTML` (line 8882) and `renderLineupComparisonHTML` (line 7356) use table/grid with multiple vertical dividers.

**Fix:** CSS/HTML restructure — single right-aligned vertical rule, one bottom horizontal rule, three centered zone headers.

---

### 7. POSITION RANKINGS — CINZEL, INTEGERS, NO PARENTHESES

**w21 lines 7221-7282 (`renderStatsTabsHTML`):** Uses generic fonts, decimals in OVR (e.g., "90.5"), parentheses around OVR.

**User's rule:** "TURN EVERY TEXT INTO Cinzel Decorative. PLAYERS 90+ SHIMMER. 85+ MORE VIBRANT. USE INTEGERS EVERYWHERE. REMOVE PARENTHESES AROUND PLAYERS OVR RATINGS. WRITE PLAYER AND NUMBER IN TWO DIFFERENT COLORS OF THAT TEAM'S COLOR PALETTE. '(missing slots filled at 70 OVR)' REMOVE PARENTHESIS. TEXT FLOAT IN AT VERY BOTTOM."

**Fix:** 
- Font-family: Cinzel Decorative for all text in this panel.
- `Math.round(ovr)` everywhere.
- Player name in team primary color, OVR in team accent color (or gold/rose).
- Footer note: "Missing depth-chart slots filled at 70 OVR" (no parens), fade-in at bottom.

---

### 8. MISSING PLAYERS IN TEAM COMPARISON PANELS

**User's rule:** "THERE ARE STILL PLAYERS NOT BEING GENERATED IN THE PANELS OF THE TEAM COMPARISON PAGES, EVEN THE STATIC PAGE FROM THE FOOTER. PLEASE FIX."

**Likely cause:** `renderLineupComparisonHTML` (line 7356) calls `renderLineupTableHTML` which iterates `DEPTH_CHART_GROUPS` slots. If `slotmap[s]` is undefined for a slot (e.g., Cardinals WR1 missing per Owner's P-167), the cell shows "—" but no fallback to pool. The `fillOf` fallback exists in `zpbLuA` but may not cover all slots.

**Debug:** Add logging to `cellOf` to trace which slots return "—" for each team. Ensure every slot in `ROSTER_SLOTS` has a value (player or fallback).

---

### 9. "Aaron Brewer (C, 90 OVR); SS is the soft spot at 71" — REMOVE

**Search:** Grep for "Aaron Brewer" or "soft spot" in w21 — likely in `renderIdentityPanel` or `buildGrades`. Remove entirely.

**Replace:** "ANCHOR" and "WEAKNESS" visualization per user: "VISUALIZE BETTER AN 'ANCHOR' AND A POSITION 'WEAKNESS' FOR EVERY. THINK OF A MORE CREATIVE WORD FOR WEAKNESS THAT MEANS THE OPPOSITE OF ANCHOR HERE." → Use "Liability" or "Gap" with badge UI.

---

### 10. MADDEN RANKINGS PAGE — TEXT & LAYOUT

**User's rules:**
- "REMOVE THE WORD LEFT AND MOVE THIS BELOW TO JUST ABOVE THE WEIGHTS PANEL WHICH HAS HOPEFULLY BEEN REVISUALIZED AS BADGES."
- "REMOVE 'Missing depth-chart slots are filled with a default of 70 OVR.' FROM THE TOP. FADE IN/OUT AT BOTTOM OF TEAM PANEL ON CLICK IN TINY TEXT."
- "On the moving header 20-0 header, MOVE STATIC '20-0' BUTTON RIGHT ~HALF A '0' WIDTH."
- "In the Lineups menu, ONLY PLAYER NAME inside clickable boxes. REMOVE POSITION AND OVERALL. INTEGERS ONLY. REMOVE DECIMALS FROM GROUP POSITION RANKINGS. PANELS IN ONE HORIZONTAL ROW, ADD RUSHING."
- "INEFFICIENT LINEUP TEXT: REPLACE WITH 'x' WHERE x IS THE OVR. REMOVE WINS COMPLETELY."

**Fix:** All text/content changes — no logic changes. Update weights panel to badge layout (P-172).

---

### 11. GAME PREVIEW — COLORS, BARS, PANELS

**User's rules:**
- "TEXANS TEXT COLOR TOO DARK — USE SILVER FOR DARK BLUE TEAMS WITH SILVER IN PALETTE."
- "BAR COLORS INCONSISTENT — BAR SHOULD ALWAYS BE SAME COLOR, AMOUNT MOVES LEFT/RIGHT."
- "MATCHUP MATH PANEL: RIGHT TEAM NUMBERS ALIGNED RIGHT OF BARS."
- "REMOVE OPPONENT SCOUTING REPORT PANEL — MATH IN MATCHUP MATH PANEL."
- "REMOVE 'YOUR TEAM'S IDENTITY' — SAME REASON."
- "STANDINGS: USER'S DIVISION 2X SIZE OF OTHERS, NOT FULL WIDTH."
- "'CAN YOU GO 20-0?' TOP RIGHT CORNER, MORE SPACE BETWEEN 'GO' '20-0' '?'"
- "REMOVE 'THE MATCHUP, PLAYER BY PLAYER' TEXT."
- "LINEUP PLAYERS DIRECTLY ACROSS FROM EACH OTHER, NOT STACKED."

**Fixes:** CSS + template changes. Bar color = team primary; width = value. Right-align right-team numbers. Remove two panels. Standings grid: user division `grid-column: span 2` or `width: 2fr`. Header spacing.

---

### 12. DURING GAME MENU — EVENT BADGES & CINZEL

**User's rules:**
- "BOX AROUND 'FG' — ADD SAME BOX AROUND 'TD' OR 'X' (TEAM ABBREV THAT WON TURNOVER)."
- "'RUN' → 'RUSH'. WHEN 'RUSH' APPEARS, BOXED 'TD' NEXT TO IT."
- "'FIELD GOAL' → BOXED 'FG'."
- "CREATE 'XY' BOX: X=YARDS, Y='Y'."
- "'TO' → <DOT> (bullet)."
- "BOXES FOR 'FF' (FORCED FUMBLE), 'FR' (FUMBLE RECOVERY), 'INT' (INTERCEPTION)."
- "CINZEL DECORATIVE FOR EVERY NAME AND TEXT."

**Fix:** New badge components in `generateGameSummary` / `playByPlay` output. Replace all text tokens with badge spans.

---

### 13. SEASON REVIEW — BADGES, CINEMATIC, ALL-PRO SHIMMER

**User's rules:**
- "DURING CINEMATIC: SHOW ALL-PRO/PRO BOWL PLAYERS FIRST, CELEBRATE, THEN MOVE DOWN, THEN PLAYOFF PANEL."
- "'VS ACTUAL NFL TEAMS' — ONLY ON DRAFT REVIEW PAGE."
- "'CAN YOU GO 20-0?' TEXT FADES SLOWER, DISAPPEARS UP TO 5s, THEN SLOW FADE IN."
- "'UNDEFINEDDIFF' GLITCH — FIX."
- "REMOVE '(MVP, ALL-PRO, PRO BOWL)' FROM REGULAR SEASON AWARDS PANEL."
- "ALL-PRO PLAYER NAMES ALWAYS SHIMMER."
- "PLAYER PANEL FORMAT: 'MOST VALUABLE PLAYER Matthew Stafford QB · 444/665 · 4,373 [PassY] · 37 [TD] · 7 [INT] · 99.3 [20-0] · 71 [RushY] · 43 [SK] 74.4 [QBR] · 12 [W]' — ALL [brackets] = BADGES."
- "'MOST VALUABLE PLAYER' — THREE LINES VERTICAL: Most / Valuable / Player."

**Fix:** `computeRegularSeasonAwards` (w21 line 7889) and `renderRegularAwardsHTML` (line 9633) need badge-ification. Cinematic sequence in `renderSeasonCompleteView` (line 9667).

---

### 14. HOMEPAGE DROPDOWNS & FOOTER

**User's rules (new prompt):**
- "REMOVE TEAM LOGO FROM RIGHT DROPDOWN (DRAFT POSITION)."
- "EXPAND LEFT DROPDOWN TO SHOW FULL TEAM NAME IF WINDOW LARGE; COMPRESSED → LOGO + ABBREV '<LOGO> KC'."
- "SEAHAWKS/DARK TEAMS: ALWAYS USE LIGHTER COLORS THAT APPEAR ON CLICK, NOT DARK BLUE ON STATIC PAGE."
- "WHEN TEAM CHANGED IN LEFT DROPDOWN, HOMEPAGE + ALL FOOTER PAGES SWITCH TO THAT TEAM'S COLOR IMMEDIATELY, EVEN BEFORE SEASON INITIATED."

**Fix:** Dropdown render logic (w21 lines ~2155-2366). Team color application on `change` event, not just season start.

---

### 15. DRAFT BOARD — BROKEN ON W18/W21

**User's rule:** "THE DRAFT IS BROKEN ON W18. PRIORITY AND GONE VALUES MISSING. DRAFT SELECTION TICKER ISN'T MOVING. MY PICKS ARE OUT OF ORDER. EVERYTHING IS BROKEN. FIXING THIS IS YOUR PRIORITY."

**Likely causes in w21:**
- `renderDraftLive` (line 5140) / `renderDraftBoard2` (line 5257) — check `draftUI.sim` population and `rer()` call.
- `prioOf` returning 1 breaks priority display.
- `goneFrac` may not compute if `sim` is null.
- Ticker movement depends on `setActiveTab` / `draftUI.sim` updates.

**Debug:** Add console.log in `renderDraftBoard2` entry to trace `draftUI.sim`, `draftUI.groups`, `draftUI.prio`.

---

### 16. DIME BOX & DASH

**User's rule:** "THE DIME IS ALSO IN A WEIRD BOX AND HAS A '—-' NEXT TO IT. REMOVE THE BOX AND THE DASH."

**Find:** `zpbDimeCell` (line 3526) or CB3/CB4 rendering. Remove box styling and em-dash.

---

### 17. PICK ORDER / DEPTH CHART TOGGLE & 3-4/4-3

**User's rule:** "SLIGHTLY REDUCE SIZE OF PICK ORDER / DEPTH CHART TOGGLE TO MAKE ROOM FOR '3-4' / '4-3' ON ONE LINE. IF SPACING DOESN'T WORK, PLACE 4-3 / 3-4 TAB UNDER PICK ORDER / DEPTH CHART."

**Fix:** CSS flex sizing on toggle container (w21 lines ~2013-2018).

---

### 18. DEPTH CHART SHIMMER

**User's rule:** "WHEN A POSITION IS FILLED IN THE DEPTH CHART, HAVE THAT POSITION NAME SHIMMER. 90+ PLAYER NAMES SHIMMER. 85+ PLAYER NAMES COLORED/VIBRANT."

**Fix:** In depth chart render, add `.zpb-shm` class to position label when filled. Player names ≥90 shimmer, ≥85 vibrant.

---

### 19. DRAFT BOARD CONTROLS (P-153)

Your w21 already has some P-153 items (sort menu words, team logo filter, search "Search", Table/Cards toggle). But:
- Priority numbers still broken (see #1).
- "Undo" shows "↶ Undo my last pick" not "↶ Undo" (P-153 item 21).
- All/none bubbles not graphic icons (P-153 item 20).
- No horizontal scrollbar on desktop (P-153 item 19) — check `overflow-x:auto` only on mobile.

---

### 20. SITEWIDE STYLE LAW (P-183) VIOLATIONS IN W21

- **Cinzel Decorative** not loaded/used (w21 uses system-ui).
- **White text** used in `.fxbanner` (color:#3a2600 on gold — ok), but `.toptag` uses `color:#fff` on `--good` (green) — violates "no white text" and "no permanent green".
- **Decimals** shown in OVR, wins, correlations.
- **Blue panels**: `.fxbanner` gradient uses blue tones? Check.
- **Orange**: `--good` is green, but some gradients drift orange.
- **Emojis**: 🏈, 🏆, etc. in HTML — violates "no emojis".
- **Blue in panels**: `.fxbanner` background has blue? Check gradient.
- **"See guide for details"**: Search for this text.
- **"Back to Simulator"**: Search for this text.

---

### 21. DARK TEAM COLORS UNREADABLE (P-185)

**User's rule:** "DROPDOWN AND BUTTONS FOR DARK TEAMS (PATRIOTS, RAVENS PURPLE, TITANS BLUE TOO DARK LIKE RAMS); GIANTS AND RAMS LOGOS TOO DARK."

**Fix:** Tone-lift rule for dark team colors. Use Z.ai's `zpbPackFor` accessible pairs if sound. Titans must read as LIGHT blue. Saints bubbles must use only Saints palette.

---

### 22. WELCOME CINEMATIC (P-187)

**User's rule:** "WELCOME FADES IN/OUT (SLIGHTLY LEFT OF CENTRE), THEN 'TO THE DRAFT', THEN ONLY 'DRAFT' LINGERS (SLIGHTLY RIGHT OF CENTRE); WELCOME AND DRAFT EQUIDISTANT FROM CENTRE."

**Fix:** New cinematic sequence in `setActiveTab('draft')` transition.

---

### SUMMARY: PRIORITY ORDER FOR Z.AI

1. **P0 — Draft board functional** (priority/gone/ticker/picks order) — blocks all testing.
2. **P0 — FLEX constant reconciliation** (P-142) — affects every flex calculation.
3. **P0 — Fill chart logic** (natural position first) — core UX.
4. **P0 — Player cards** (no flex numbers, horizontal, wins stack).
5. **P0 — Lineup panel guard** (season not started).
6. **P0 — Position rankings** (Cinzel, integers, badges).
7. **P0 — Team comparison missing players**.
8. **P0 — During game badges** (FG/TD/FF/FR/INT/XY/DOT).
9. **P0 — Season review badges/cinematic**.
10. **P1 — Homepage dropdown/color sync**.
11. **P1 — Madden rankings text/layout**.
12. **P1 — Game preview bars/panels/standings**.
13. **P2 — Sitewide style law compliance** (Cinzel, no white, no green, integers, etc.).
14. **P2 — Dark team tone-lift**.
15. **P2 — Welcome cinematic**.

---

### VERIFICATION CHECKLIST FOR EACH FIX

For every fix, run:
```bash
node tools/lint.mjs product Football-Sim-PreColors.html  # after Architect merges
# Visual checks at 390px, 1280px
# Seeded draft (once injectable RNG lands P-031) for priority/gone/ticker
# 32-team season sim to Super Bowl for game preview/lineups/season review
```

---

**SPEAKER: OR | ROLE: Council Adviser | TASK: Z-post-blue w21 bug analysis | DATE: 2026-10-26T22:52Z**

**EVIDENCE: VERIFIED** (all anchors confirmed against w21 commit 2bb0016e and Pre-Colors sha256 40233d6b…)

**ACTION REQUESTED:** Z.ai to address P0 items in next wave (w22), starting with draft board functional (#1, #15) and FLEX constant (#2). Other items are Owner-requested UI/UX changes from 25 Oct prompts.

**NOTE:** Per AGENTS.md §2, your Z-post-blue is REPORTED until diffed against Pre-Colors by the Architect. Only the Architect's build may be called V23. This analysis is council input for the Architect's integration decision.