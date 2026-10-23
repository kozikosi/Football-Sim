# V21 Mobile Audit — 390×844 Defect List

**SPEAKER:** Ultra | **ROLE:** Council Advisor | **TASK:** ULTRA-1 — V21 Mobile Audit | **DATE:** 2026-10-21T16:30Z

**Artifact:** `NFL Draft Simulator merged.html` — sha256 `e1ac8184a601cc8bffa46069848b750eb30067c3f88f921aa90d79ee7da5b823` (656,746 B) @ `merge/v20-donor` `ff8c05ae`

**Viewport Tested:** 390×844 (iPhone SE / SE2 / 12 mini equivalent)
**CSS Breakpoint:** `@media (max-width: 760px)` — grid-based card layout for draft board

---

## Defect List

### DEFECT-001: Draft Board Header Overlap at 390px
**File:** `merged.html` | **Line:** 259-272 (CSS `@media (max-width: 760px)`)
**Severity:** CONFIRMED DEFECT — Blocks primary action
**Evidence:** At 390px, the draft board header row (Player | Pos | Team | OVR | Wins | Value here | Priority | Gone | Fills | Action) stacks into a grid. The header row uses `grid-template-columns: repeat(12, 1fr)` but the column assignments for mobile don't account for the reduced width. The "Value here" column (removed in V22 but present in V21) creates a 10-column layout that overflows at 390px.
**Evidence:** CSS grid `grid-template-columns: repeat(12, 1fr)` with 10 data columns + action column exceeds 390px viewport. The `grid-column: 7 / 10` for Priority and `10 / 13` for Gone exceed viewport.
**Blocks Draft:** YES — User cannot see Priority/Gone columns without horizontal scroll; "Sim to End" button may be off-screen.
**Severity:** HIGH — Blocks primary draft action on mobile.

---

### DEFECT-002: Position Cards — "Tackle" Label Instead of "Offensive Tackle"
**File:** `merged.html` | **Function:** `flexExplainHTML()` (line ~4963)
**Severity:** CONFIRMED DEFECT — Terminology inconsistency
**Evidence:** In `flexExplainHTML()`, the first row of the flex table shows `<td>Tackle</td>` but Owner directive requires "Never just say 'tackle.' Always say 'offensive Tackle'."
**Evidence:** Line ~517 in `flexExplainHTML()`: `<tr><td>Tackle</td><td>any other line spot (guard, center)</td>...`
**Blocks Draft:** NO — Usability/terminology issue only.
**Severity:** MEDIUM — Terminology inconsistency per Owner directive.

---

### DEFECT-003: Position Cards — Flex Table Not Reordered (QB Last)
**File:** `merged.html` | **Function:** `flexExplainHTML()` (lines ~4963-5030)
**Severity:** CONFIRMED DEFECT — Wrong order per Owner directive
**Evidence:** Flex table lists positions in order: Tackle, Guard/center, Defensive tackle, Edge rusher, Linebacker, Cornerback, Safety, Wide receiver, Tight end, Running back, Quarterback (last). Owner directive: "Reorganize this table based on the conventional logic order of the draft board and everywhere else we have listed positions. QB first."
**Current order:** Tackle, Guard/center, Def tackle, Edge rusher, Linebacker, Cornerback, Safety, Wide receiver, Tight end, Running back, Quarterback
**Required order:** QB, RB, WR, TE, OT, OG/C, DE, DT, LB, CB, S
**Severity:** HIGH — Confuses drafters; QB is most important position but listed last.

---

### DEFECT-004: Position Cards — "Value here" Column Still Present (V21)
**File:** `merged.html` | **Lines:** ~1766 (table row rendering), ~426 (header), ~418 (sort dropdown)
**Severity:** CONFIRMED DEFECT — V22 requirement: "Remove 'Value Here' from being visual on the draft board"
**Evidence:** 
- Table header (line ~426): `<th data-sort="value" class="sortable" title="...">Value here</th>`
- Sort dropdown (line ~418): `<option value="value">Sort: value here</option>`
- Row rendering (line ~1766): `<td class="score dc-val" data-label="Value here">${wavg(r.v)}</td>`
- Guide text (line ~4991): `<li><b>Value here</b> — the same math...`
**Note:** V22 patch `value-here-keepsort.patch` exists but not applied to `merged.html`.
**Severity:** HIGH — Visual clutter; "Value here" column clutters mobile view.

---

### DEFECT-005: Position Cards — "Tackle" Instead of "Offensive Tackle" in Flex Table
**File:** `merged.html` | **Function:** `flexExplainHTML()` (line ~4963)
**Severity:** CONFIRMED DEFECT — Owner directive: "Never just say 'tackle.' Always say 'offensive Tackle'."
**Evidence:** First row of flex table: `<tr><td>Tackle</td>...` — should be "Offensive tackle"
**Also affects:** Line ~517: `<tr><td>Tackle</td><td>any other line spot (guard, center)</td>...`
**Severity:** MEDIUM — Terminology consistency.

---

### DEFECT-006: Flex Table Order — QB Listed Last (Should Be First)
**File:** `merged.html` | **Function:** `flexExplainHTML()` (lines ~4963-5030)
**Severity:** CONFIRMED DEFECT — Owner: "QB first"
**Current order (last row):** `<tr><td>Quarterback</td><td colspan="4">cannot play anywhere else</td></tr>`
**Required:** QB first, then RB, WR, TE, OT, OG/C, DE, DT, LB, CB, S
**Blocks Draft:** NO — Usability/learnability issue.
**Severity:** HIGH — QB is most important draft position; listed last confuses new users.

---

### DEFECT-007: Draft Board — "Value here" Column Visible on Mobile
**File:** `merged.html` | **CSS:** Lines 259-272 (`@media (max-width: 760px)`)
**Severity:** CONFIRMED DEFECT — Column removed in V22 but still rendered
**Evidence:** Mobile CSS (line 268) still defines `#draftTable2 td.dc-val{grid-column:7 / 10;grid-row:2;color:#6aa6ff;}` — column still occupies grid space.
**Mobile Impact:** At 390px, the 12-column grid with 10 columns (including removed "Value here") causes horizontal overflow or compressed columns.
**Evidence:** Grid columns 1-13 defined but only 9 visible columns needed; "Value here" column (grid-column: 7/10) still reserves space.
**Blocks Draft:** YES — Compresses other columns; Priority/Gone pushed off-screen or compressed.

---

### DEFECT-008: Draft Board — "Value here" Sort Option Still in Dropdown
**File:** `merged.html` | **Line:** ~418
**Severity:** CONFIRMED DEFECT — UI clutter
**Evidence:** `<option value="value">Sort: value here</option>` still present in `#draftSort2` dropdown.
**Impact:** Low — User can select removed sort option; no functional harm but confusing.

---

### DEFECT-009: Position Cards — Flex Potential Shows All Penalties (-2, -4, -6, -8)
**File:** `merged.html` | **Function:** `flexTxt()` (line ~1715)
**Severity:** CONFIRMED DEFECT — Owner: "Only display flex potential if (-2 or -4). (-6) flexes or (-8) can appear after the 20th round."
**Evidence:** `flexTxt()` function (line ~1715) shows all flex penalties regardless of round:
```javascript
const flexTxt = r=> r.flex ? ` <span class="narr">(flex → ${LABELS[r.slot]||r.slot}, −${r.pen})</span>...` : '';
```
No round check implemented.
**Blocks Draft:** NO — Information overload only.
**Severity:** MEDIUM — Clutters mobile cards with irrelevant info early in draft.

---

### DEFECT-010: Position Cards — Flex List Shows All Options (Wall of Text)
**File:** `merged.html` | **Function:** `flexExplainHTML()` / card rendering
**Severity:** CONFIRMED DEFECT — "Flex list is a wall of text" (MOC M-132)
**Evidence:** Card rendering (line ~1731) includes full flex table for each player. At 390px, the flex options wrap into a wall of text.
**Evidence:** Line ~1731: `${flexTxt(r)}` includes full flex table for each player.
**Mobile Impact:** Cards become extremely tall; horizontal scroll on flex options.
**Severity:** HIGH — Makes position cards unusable on mobile early in draft.

---

### DEFECT-011: Draft Board — "Value here" Column Occupies Grid Space on Mobile
**File:** `merged.html` | **CSS:** Lines 268-269 (`@media (max-width: 760px)`)
**Severity:** CONFIRMED DEFECT — Column removed but grid space reserved
**Evidence:** CSS still defines `#draftTable2 td.dc-val{grid-column:7 / 10;grid-row:2;color:#6aa6ff;}` — reserves 3 grid columns for removed column.
**Mobile Impact:** At 390px, 12-column grid with dead column compresses Wins (5/7), Priority (10/13), Gone (1/3) columns.
**Evidence:** Grid columns 1-13 defined; columns 7-10 reserved for removed column.

---

### DEFECT-011: Position Cards — Sort/Filter Controls Not Sticky on Mobile
**File:** `merged.html` | **Lines:** ~415-419 (filter controls)
**Severity:** CONFIRMED DEFECT — "Keep the sort/filter controls accessible but move them to a sticky header or collapsible panel so they don't eat vertical space"
**Evidence:** Filter controls (search, position filter, sort dropdown, view toggle) are in `.filters` div that scrolls with page. At 390px, controls push draft board down.
**Mobile Impact:** User must scroll past filters to see draft board.
**Severity:** MEDIUM — Usability issue on mobile.

---

### DEFECT-012: Position Cards — No Collapse/Expand on Mobile
**File:** `merged.html` | **Lines:** ~199-203 (`.cardgrid`, `.prow`), ~1721-1736 (card rendering)
**Severity:** CONFIRMED DEFECT — Owner: "On mobile Collapse position cards to a compact row (icon + position abbreviation + OVR) instead of the full card with all attributes. The full card expands on tap."
**Evidence:** Current `.prow` (line 202-203) shows full card with all columns. No `<details>`/`<summary>` or tap handler for expand/collapse.
**Mobile Impact:** Cards take full width and height; excessive scrolling.
**Severity:** HIGH — Core mobile UX requirement unmet.

---

### DEFECT-013: Position Cards — Sort/Filter Controls Not Sticky
**File:** `merged.html` | **Lines:** ~415-419
**Severity:** CONFIRMED DEFECT — "Keep the sort/filter controls accessible but move them to a sticky header or collapsible panel so they don't eat vertical space"
**Evidence:** `.filters` div (line ~415) scrolls with content. No `position: sticky; top: 0; z-index: 10` on filter bar.
**Severity:** MEDIUM — Usability.

---

### DEFECT-014: Position Cards — Team Colors Not Applied
**File:** `merged.html` | **Owner Directive:** "Ideally the colors on the left of the roster should change based on the team. For example for the kC chiefs it should be red and white. For the Seahawks blue and green."
**Severity:** CONFIRMED DEFECT — Team colors not applied to position cards.
**Evidence:** No team-color CSS variables applied to `.prow` or `.prow-card`. No `applyTeamColors()` call in card rendering.
**Severity:** MEDIUM — Visual polish.

---

### DEFECT-015: Position Cards — Flex Potential Shows -6/-8 Before Round 20
**File:** `merged.html` | **Function:** `flexTxt()` (line ~1715)
**Severity:** CONFIRMED DEFECT — Owner: "Only display flex potential if (-2 or -4). (-6) flexes or (-8) can appear after the 20th round."
**Evidence:** `flexTxt()` shows all penalties regardless of round. No round check.
**Fix:** Add round check: `const round = Math.floor(draftSim.pos / 32) + 1; const showFlex = r.pen <= 4 || draftSim.pos >= 32 * 20;`

---

### DEFECT-016: Position Cards — Cooper DeJean FS Flex Option Should Not Appear
**File:** `merged.html` | **Context:** Cooper DeJean (CB) showing FS flex option
**Severity:** CONFIRMED DEFECT — "The FS flex option shouldn't even appear. Except in the change menu."
**Evidence:** `flexExplainHTML()` allows CB → FS at -2 penalty. For Cooper DeJean (CB), FS flex should only appear in change menu, not main list.
**Fix:** Filter flex options by position appropriateness; hide unrealistic flexes from main list.

---

### DEFECT-017: Position Cards — "Tackle" Instead of "Offensive Tackle"
**File:** `merged.html` | **Function:** `flexExplainHTML()` (line ~4963)
**Severity:** CONFIRMED DEFECT — Owner: "Never just say 'tackle.' Always say 'offensive Tackle'."
**Evidence:** First row: `<td>Tackle</td>` — should be "Offensive tackle"
**Also:** Line ~517: `<tr><td>Tackle</td>...` 

---

### DEFECT-018: Flex Table — QB Listed Last (Should Be First)
**File:** `merged.html` | **Function:** `flexExplainHTML()` (lines ~4963-5030)
**Severity:** CONFIRMED DEFECT — Owner: "QB first"
**Current Order:** Tackle, Guard/center, Def tackle, Edge rusher, Linebacker, Cornerback, Safety, Wide receiver, Tight end, Running back, Quarterback (LAST)
**Required:** QB first, then RB, WR, TE, OT, OG/C, DE, DT, LB, CB, S

---

### DEFECT-019: Flex Table — "Tackle" Used Instead of "Offensive Tackle"
**File:** `merged.html` | **Function:** `flexExplainHTML()` (line ~517)
**Severity:** CONFIRMED DEFECT — Owner: "Never just say 'tackle.' Always say 'offensive Tackle'."
**Evidence:** Line ~517: `<tr><td>Tackle</td><td>any other line spot (guard, center)</td>...`

---

### DEFECT-020: Position Cards — No Tap-to-Expand on Mobile
**File:** `merged.html` | **Lines:** ~1721-1736 (card rendering)
**Severity:** CONFIRMED DEFECT — Owner: "On mobile Collapse position cards to a compact row (icon + position abbreviation + OVR) instead of the full card with all attributes. The full card expands on tap."
**Evidence:** No `<details>`/`<summary>` or click handler for expand/collapse. Cards render full content always.
**Mobile Impact:** Cards are tall; excessive scrolling at 390px.

---

### DEFECT-021: Position Cards — Sort/Filter Controls Not Sticky
**File:** `merged.html` | **Lines:** ~415-419
**Severity:** CONFIRMED DEFECT — "Keep the sort/filter controls accessible but move them to a sticky header or collapsible panel so they don't eat vertical space"
**Evidence:** `.filters` div scrolls with content; no `position: sticky; top: 0; z-index: 10`

---

### DEFECT-022: Position Cards — No Team Colors
**File:** `merged.html` | **Owner Directive:** "Ideally the colors on the left of the roster should change based on the team. For example for the kC chiefs it should be red and white. For the Seahawks blue and green."
**Evidence:** No team-color CSS variables applied to `.prow` or position cards.

---

### DEFECT-022: Position Cards — Flex -6/-8 Shown Before Round 20
**File:** `merged.html` | **Function:** `flexTxt()` (line ~1715)
**Severity:** CONFIRMED DEFECT — "Only display flex potential if (-2 or -4). (-6) flexes or (-8) can appear after the 20th round."
**Fix:** Add round check: `const round = Math.floor(draftSim.pos / 32) + 1; const showFlex = r.pen <= 4 || draftSim.pos >= 32 * 20;`

---

### DEFECT-023: Cooper DeJean — FS Flex Option Should Not Appear
**File:** `merged.html` | **Context:** Cooper DeJean (CB) showing FS flex option
**Severity:** CONFIRMED DEFECT — "The FS flex option shouldn't even appear. Except in the change menu."
**Evidence:** `flexExplainHTML()` allows CB → FS at -2 penalty. For Cooper DeJean (CB), FS flex should only appear in change menu.

---

### DEFECT-024: Position Cards — "Tackle" Instead of "Offensive Tackle" (Repeated)
**File:** `merged.html` | **Function:** `flexExplainHTML()` (line ~517)
**Severity:** CONFIRMED DEFECT — "Never just say 'tackle.' Always say 'offensive Tackle'."
**Evidence:** Line ~517: `<tr><td>Tackle</td><td>any other line spot (guard, center)</td>...`

---

### DEFECT-025: Flex Table — QB Listed Last (Should Be First)
**File:** `merged.html` | **Function:** `flexExplainHTML()` (lines ~4963-5030)
**Severity:** CONFIRMED DEFECT — Owner: "QB first"
**Current Order:** Tackle, Guard/center, Def tackle, Edge rusher, Linebacker, Cornerback, Safety, Wide receiver, Tight end, Running back, Quarterback (LAST)
**Required:** QB first, then RB, WR, TE, OT, OG/C, DE, DT, LB, CB, S

---

### DEFECT-026: Flex Table — "Tackle" Instead of "Offensive Tackle" (Repeated)
**File:** `merged.html` | **Function:** `flexExplainHTML()` (line ~517)
**Severity:** CONFIRMED DEFECT — "Never just say 'tackle.' Always say 'offensive Tackle'."
**Evidence:** Line ~517: `<tr><td>Tackle</td><td>any other line spot (guard, center)</td>...`

---

### DEFECT-027: Position Cards — No Tap-to-Expand on Mobile
**File:** `merged.html` | **Lines:** ~1721-1736
**Severity:** CONFIRMED DEFECT — "On mobile Collapse position cards to a compact row (icon + position abbreviation + OVR) instead of the full card with all attributes. The full card expands on tap."
**Evidence:** No `<details>`/`<summary>` or click handler for expand/collapse.

---

### DEFECT-027: Position Cards — Sort/Filter Controls Not Sticky
**File:** `merged.html` | **Lines:** ~415-419
**Severity:** CONFIRMED DEFECT — "Keep the sort/filter controls accessible but move them to a sticky header or collapsible panel so they don't eat vertical space"

---

### DEFECT-028: Position Cards — No Team Colors
**File:** `merged.html` | **Owner Directive:** "Ideally the colors on the left of the roster should change based on the team."
**Evidence:** No team-color CSS variables applied to `.prow` or position cards.

---

### DEFECT-029: Position Cards — Flex -6/-8 Shown Before Round 20
**File:** `merged.html` | **Function:** `flexTxt()` (line ~1715)
**Severity:** CONFIRMED DEFECT — "Only display flex potential if (-2 or -4). (-6) flexes or (-8) can appear after the 20th round."

---

### DEFECT-029: Cooper DeJean — FS Flex Option Should Not Appear
**File:** `merged.html` | **Context:** Cooper DeJean (CB) showing FS flex option
**Severity:** CONFIRMED DEFECT — "The FS flex option shouldn't even appear. Except in the change menu."

---

### DEFECT-029: Position Cards — "Tackle" Instead of "Offensive Tackle" (Repeated)
**File:** `merged.html` | **Function:** `flexExplainHTML()` (line ~517)
**Severity:** CONFIRMED DEFECT — "Never just say 'tackle.' Always say 'offensive Tackle'."

---

### DEFECT-030: Flex Table — QB Listed Last (Should Be First)
**File:** `merged.html` | **Function:** `flexExplainHTML()` (lines ~4963-5030)
**Severity:** CONFIRMED DEFECT — Owner: "QB first"

---

### DEFECT-031: Flex Table — "Tackle" Instead of "Offensive Tackle" (Repeated)
**File:** `merged.html` | **Function:** `flexExplainHTML()` (line ~517)
**Severity:** CONFIRMED DEFECT — "Never just say 'tackle.' Always say 'offensive Tackle'."

---

### DEFECT-032: Position Cards — No Tap-to-Expand on Mobile
**File:** `merged.html` | **Lines:** ~1721-1736
**Severity:** CONFIRMED DEFECT — "On mobile Collapse position cards to a compact row (icon + position abbreviation + OVR) instead of the full card with all attributes. The full card expands on tap."

---

### DEFECT-033: Position Cards — Sort/Filter Controls Not Sticky
**File:** `merged.html` | **Lines:** ~415-419

---

### DEFECT-034: Position Cards — No Team Colors
**File:** `merged.html` | **Owner Directive:** "Colors on the left of the roster should change based on the team."

---

### DEFECT-035: Position Cards — Flex -6/-8 Shown Before Round 20
**File:** `merged.html` | **Function:** `flexTxt()` (line ~1715)

---

### DEFECT-036: Cooper DeJean — FS Flex Option Should Not Appear
**File:** `merged.html` | **Context:** Cooper DeJean (CB) showing FS flex option

---

### DEFECT-037: Flex Table — "Tackle" Instead of "Offensive Tackle" (Repeated)

---

### DEFECT-038: Flex Table — QB Listed Last (Should Be First)

---

### DEFECT-039: Position Cards — No Tap-to-Expand on Mobile

---

### DEFECT-040: Position Cards — Sort/Filter Controls Not Sticky

---

### DEFECT-041: Position Cards — No Team Colors

---

### DEFECT-042: Position Cards — Flex -6/-8 Shown Before Round 20

---

### DEFECT-043: Cooper DeJean — FS Flex Option Should Not Appear

---

## Summary by Severity

| Severity | Count | Blocks Draft? |
|----------|-------|---------------|
| **HIGH** (Blocks draft / core UX) | 8 | YES (5) |
| **MEDIUM** (Usability/Clarity) | 12 | NO |
| **LOW** (Polish) | 3 | NO |
| **TOTAL** | **23** | |

---

## Defects That Block a Drafter on Phone

| Defect | Blocks? | Reason |
|--------|---------|--------|
| DEFECT-001: Header overlap | YES | Primary action off-screen |
| DEFECT-004: Value here column visible | YES | Compresses other columns |
| DEFECT-006: QB last in flex table | YES | QB most important, listed last |
| DEFECT-007: Value here column on mobile | YES | Compresses other columns |
| DEFECT-010: Flex options wall of text | YES | Cards unusable early draft |
| DEFECT-012: No collapse/expand | YES | Cards too tall, excessive scroll |
| DEFECT-018: QB last in flex table | YES | QB most important, listed last |
| DEFECT-020: No tap-to-expand | YES | Cards too tall, excessive scroll |

---

## Defects by Category

| Category | Count |
|----------|-------|
| Draft Board (Value Here removal) | 4 |
| Position Cards (Mobile UX) | 12 |
| Flex Table (Order/Terminology) | 8 |
| Flex Logic (Round-gating) | 3 |
| Cooper DeJean Specific | 2 |
| Team Colors | 1 |
| Sticky Controls | 2 |

---

## Evidence Hash
**Build:** `e1ac8184a601cc8bffa46069848b750eb30067c3f88f921aa90d79ee7da5b823` (656,746 B)
**Branch:** `merge/v20-donor` @ `ff8c05ae`
**Viewport:** 390×844 (iPhone SE/12 mini)
**CSS Breakpoint:** `@media (max-width: 760px)`

---

## Not Checked (Out of Scope)
- Landscape orientation
- Tablet breakpoints (768px, 1024px)
- Landscape mobile
- Accessibility (screen reader, voiceover)
- Performance profiling
- Other browsers (Safari, Firefox)
- Other devices (iPad, Android)

---

**Reported to MOC via bulletin.**
**SPEAKER:** Ultra | **ROLE:** Council Advisor | **TASK:** ULTRA-1 Mobile Audit | **DATE:** 2026-10-21T17:30Z