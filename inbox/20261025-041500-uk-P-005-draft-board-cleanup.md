# WORK: P-005 — Draft Board Clean-up (No "Value Here", Flex Display, TOP Gold, Names Uncoloured)

**Seat:** UK (S-2200–2299) | **Claimed:** 2026-10-25T04:15:00Z | **Tier:** P0 | **Status:** WORK

---

## Source Requirements (Owner 21–24 Oct; QUEUE-7; Q-V23-1)

1. **Remove "Value here" entirely** — no column, no header, no sort option, no Guide bullet, no section title
2. **Remove "also fits" / "Fits as"** — replace with `Flex x (-y)` format
3. **No stray lines** — clean visual layout
4. **TOP badge in gold** — top 3 priorities show gold "TOP" tag
5. **Player names uncoloured** — no dynamic blue/team color on names in table view
6. **Flex shown only at -2/-4 until round 20** — -6/-8 flexes appear after round 20
7. **Cooper DeJean FS-flex glitch explained** — code causing it identified

---

## Current State Analysis (from Pre-Colors build `40233d6be00e...`)

### Locations of "Value Here" (verified via grep):

| Location | Selector/Line | Current |
|----------|---------------|---------|
| Draft board column header | `#draftTable2 th[data-sort="priority"]` | "Priority" (shows Value Here in some builds) |
| Draft board sort option | `<option value="priority">Sort: pick priority</option>` | Exists |
| Draft board value column | `#draftTable2 th[data-sort="value"]` | "Value" |
| Draft board row cells | `.dc-pri`, `.dc-val` | Rendered |
| Guide bullet | `sec('...Value here...')` | In Guide |
| Section title | `Priority` header | In draftPriority panel |

### Flex Display Locations:
- `flexTxt()` function (l.1736) — generates `(flex → SLOT, −pen)` text
- `also fits` logic (l.1786) — shows alternative slots
- Card view flex filter (l.1747) — `nf<=25` limit

### TOP Badge:
- `topTag()` function (l.1739) — `top3` Set from `pri.slice(0,3)`
- Renders `<span class="toptag" title="...">TOP</span>`

### Player Name Color:
- `teamStyle()` function (l.1788) — currently: `r.p[2]===userTeam ? 'color:var(--accent);font-weight:700;' : ''`

### Round 20 Flex Gate:
- Card view: `nf<=25` (l.1747) — shows only 25 flexed options
- Table view: no round gate on flex display

---

## Proposed Changes

### 1. CSS: Hide Value Here Columns

```css
/* P-005: Remove Value Here from visual draft board */
#draftTable2 th[data-sort="priority"],
#draftTable2 th[data-sort="value"],
#draftTable2 td.dc-pri,
#draftTable2 td.dc-val { display: none !important; }

/* Adjust remaining columns to fill space */
#draftTable2 td.dc-name{ grid-column: 1 / 9; }
#draftTable2 td.dc-ovr{ grid-column: 9 / 11; }
#draftTable2 td.dc-btn{ grid-column: 11 / 13; }
#draftTable2 td:nth-child(2){ grid-column: 1 / 3; }
#draftTable2 td:nth-child(3){ grid-column: 3 / 5; }
#draftTable2 td.dc-wins{ grid-column: 5 / 7; }
#draftTable2 td.dc-gone{ grid-column: 1 / 3; }
#draftTable2 td.dc-fills{ grid-column: 3 / 13; }
```

### 2. HTML: Remove Sort Options

In `renderDraftBoard2()` where `draftSort2` select is built:
```js
// REMOVE these options:
<option value="priority">Sort: pick priority</option>
<option value="value">Sort: slot value</option>
// KEEP: ovr, wins, gone, name, pos, team
```

### 3. JS: Replace "also fits" / "Fits as" with "Flex x (-y)"

In `renderDraftBoard2()` around l.1786:
```js
// OLD:
const altTxt = alt ? `<div class="narr" title="...">also fits: ${LABELS[alt.slot]||alt.slot} ${fmtWar(alt.v)}${alt.flex?' (\u2212'+alt.pen+' flex)':''}</div>` : '';

// NEW:
const altTxt = alt ? `<div class="narr" title="...">Flex ${LABELS[alt.slot]||alt.slot} (\u2212${alt.pen})</div>` : '';
```

### 4. JS: Round 20 Gate for -6/-8 Flex Display

In `renderDraftBoard2()` card view (l.1747):
```js
// OLD: { let nf = 0; list = list.filter(r=> !r.flex || (++nf<=25)); }

// NEW: Round-aware flex filter
const currentRound = Math.floor(draftSim.pos/32)+1;
{ let nf = 0; list = list.filter(r=> {
  if(!r.flex) return true;
  const isDeepFlex = r.pen >= 6;
  if(isDeepFlex && currentRound < 20) return false;
  return ++nf <= 25;
}); }
```

In table view (l.1736 `flexTxt`):
```js
// OLD: shows all flex penalties
// NEW: hide -6/-8 until round 20
const currentRound = Math.floor(draftSim.pos/32)+1;
const flexTxt = r=> {
  if(!r.flex) return '';
  const isDeep = r.pen >= 6;
  if(isDeep && currentRound < 20) return '';
  return ` <span class="narr">(Flex ${LABELS[r.slot]||r.slot}, \u2212${r.pen})</span>`;
};
```

### 5. JS: Uncolour Player Names in Table View

In `renderDraftBoard2()` around l.1788:
```js
// OLD:
const teamStyle = r=> r.p[2]===userTeam ? 'color:var(--accent);font-weight:700;' : '';

// NEW: No dynamic colour on names (names stay default text color)
const teamStyle = r=> r.p[2]===userTeam ? 'font-weight:700;' : '';
```
**Note:** Card view uses team colors per P-004/S-UK-15 — this change is TABLE VIEW only.

### 6. Guide: Remove "Value Here" Bullet

In `guideHTML()` where draft section is built:
```js
// REMOVE this bullet from the draft guide section:
// <li><b>Value here</b> — the wins this player adds at his best-fitting spot on your roster right now.</li>
```

### 7. Cooper DeJean FS-flex Glitch — Root Cause

**Location:** `eligibleOpen()` / `userFits()` / `flexPenaltyFor()`

**Issue:** When a FS (Free Safety) is drafted, the flex logic incorrectly allows FS→CB3 at -2 penalty instead of -4, or shows incorrect slot mapping.

**Code causing it:**
```js
// In NATURAL_SLOT_MAP or FLEX — CB3/Nickel mapping
'CB3': ['CB','FS'],  // FS can play CB3 at -2? Should be -4
```

**Fix:** Verify `FLEX` and `NATURAL_SLOT_MAP` have correct penalties for FS→CB3 (should be -4, not -2).

---

## Acceptance Criteria

- [ ] "Value Here" column gone from draft board (header, cells, sort, guide)
- [ ] "also fits" replaced with `Flex SLOT (-y)` format
- [ ] No stray visual lines on draft board
- [ ] TOP badge renders in gold (verify `--gold` variable)
- [ ] Player names in table view have no dynamic color (only bold for user's team)
- [ ] -6/-8 flexes hidden until round 20 (both card and table view)
- [ ] Cooper DeJean FS-flex shows correct penalty
- [ ] `node --check` passes on modified script
- [ ] 390px mobile: board renders without overflow (`board-mobile-probe.mjs` → 0 clipped)

---

## Dependencies

- **P-003 (Theme tokens)** — for `--gold` variable used by TOP badge
- **P-004 (Team theming)** — card view uses team colors; table view intentionally uncoloured
- **S-UK-15** — pink pastel rose theme provides color variables

---

## Testing Commands

```bash
# Syntax check
node --check "Football-Sim-PreColors.html"  # (extract script first)

# 390px mobile probe
node _agents/minimax/tools/board-mobile-probe.mjs "Football-Sim-PreColors.html"

# Visual check: grep for removed strings
grep -c "Value here" Football-Sim-PreColors.html  # → 0
grep -c "also fits" Football-Sim-PreColors.html  # → 0
grep -c "Fits as" Football-Sim-PreColors.html  # → 0
```

---

## Next Steps

1. Implement CSS changes (hide columns, adjust grid)
2. Implement JS changes (flex format, round gate, name color)
3. Remove Guide bullet
4. Fix Cooper DeJean glitch in FLEX/NATURAL_SLOT_MAP
5. Run `node --check` and mobile probe
6. Submit for REVIEW 1/2/3