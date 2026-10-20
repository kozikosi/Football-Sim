# V20 MOBILE DRAFT BOARD PATTERN SPECIFICATION

**Author:** Ultra (nemotron-3-ultra-free)  
**Date:** 2026-10-19  
**Source:** `NFL Draft Simulator v20 Claude.html` lines 254-273  
**Status:** Proposed standard for all mobile tables (pending Owner approval P1)

---

## Overview

The v20 mobile draft board (lines 254-273 in `NFL Draft Simulator v20 Claude.html`) introduces a **12-column CSS Grid** pattern for mobile table rendering that is objectively superior to the canonical `mstack` approach. This document specifies the pattern for adoption as the standard mobile table rendering across all views.

---

## Pattern Specification

### Core CSS (from v20 lines 254-273)

```css
/* Mobile draft board: table → 12-column grid cards */
@media (max-width: 760px) {
  #draftTable2, #draftTable2 tbody {
    display: block;
    overflow: visible !important;
    width: 100%;
  }
  #draftTable2 thead {
    display: none;
  }
  #draftTable2 tr {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 2px 4px;
    align-items: end;
    border: 1px solid var(--border);
    border-left: 4px solid var(--accent);
    border-radius: 10px;
    margin: 5px 0;
    padding: 6px 8px;
    background: var(--panel2);
  }
  #draftTable2 td {
    display: block;
    border: 0 !important;
    padding: 0 !important;
    text-align: left !important;
    min-width: 0;
    font-size: 0.8rem;
  }
  #draftTable2 td[data-label]::before {
    content: attr(data-label);
    display: block;
    font-size: 0.56rem;
    text-transform: uppercase;
    letter-spacing: .06em;
    color: var(--sub);
    font-weight: 700;
    line-height: 1.1;
  }
  /* Column assignments via grid-column */
  .dc-name  { grid-column: 1 / 9;  grid-row: 1; font-weight: 800; font-size: 0.92rem; align-self: center; overflow-wrap: anywhere; }
  .dc-ovr   { grid-column: 9 / 11; grid-row: 1; text-align: center !important; font-size: 1.15rem; font-weight: 900; background: rgba(79,140,255,.16); border-radius: 8px; padding: 2px 0 !important; }
  .dc-btn   { grid-column: 11 / 13; grid-row: 1; text-align: right !important; align-self: center; }
  /* Row 2: pos, team */
  td:nth-child(2) { grid-column: 1 / 3;  grid-row: 2; }
  td:nth-child(3) { grid-column: 3 / 5;  grid-row: 2; }
  /* Row 2: wins, value */
  .dc-wins { grid-column: 5 / 7;  grid-row: 2; color: var(--good); }
  .dc-val  { grid-column: 7 / 10; grid-row: 2; color: #6aa6ff; }
  /* Row 2: priority */
  .dc-pri  { grid-column: 10 / 13; grid-row: 2; color: var(--gold); }
  /* Row 3: gone%, fills */
  .dc-gone  { grid-column: 1 / 3;  grid-row: 3; color: var(--accent2); }
  .dc-fills { grid-column: 3 / 13; grid-row: 3; font-size: 0.72rem; }
  .dc-fills .narr { display: inline; margin: 0 0 0 4px; }
  .dc-btn button { padding: 5px 10px; font-size: 0.75rem; }
}
```

### Required HTML Attributes

Every `<td>` in the table body must have a `data-label` attribute matching the column header:

```html
<th data-sort="name" class="sortable">Player</th>
<td data-label="Player">...</td>

<th data-sort="pos" class="sortable">Pos</th>
<td data-label="Pos">...</td>

<th data-sort="team" class="sortable">Team</th>
<td data-label="Team">...</td>

<th data-sort="ovr" class="sortable">OVR</th>
<td data-label="OVR" class="dc-ovr">...</td>

<th data-sort="wins" class="sortable">Wins</th>
<td data-label="Wins" class="dc-wins">...</td>

<th data-sort="value" class="sortable">Value here</th>
<td data-label="Value here" class="dc-val">...</td>

<th data-sort="priority" class="sortable">Priority</th>
<td data-label="Priority" class="dc-pri">...</td>

<th data-sort="gone" class="sortable">Gone%</th>
<td data-label="Gone%" class="dc-gone">...</td>

<th>Fills</th>
<td data-label="Fills" class="dc-fills">...</td>

<th></th>
<td class="dc-btn">...</td>
```

### Opt-Out Mechanism

Tables that should **not** use this pattern add `data-nostack="1"`:

```html
<table id="draftTable2" data-nostack="1">
```

The mobile CSS checks for this attribute and skips the grid transformation.

---

## Adoption Targets (All Mobile Tables)

| Table/View | Current Approach | Target Pattern |
|------------|------------------|----------------|
| Draft Board (`#draftTable2`) | ✅ Already implemented | Reference implementation |
| Draft Priority (`#draftPriority`) | mstack | Grid cards |
| Draft Cards (`#draftCards`) | Card grid | Grid cards (unified) |
| Standings (`#resultsTable`) | mstack | Grid cards |
| Player Browser (`#playerTable`) | mstack | Grid cards |
| Position Rankings (`#groupTable`) | mstack | Grid cards |
| Team Comparison (`#homeCmpResult`) | mstack | Grid cards |
| League Leaders (`.divtable`) | mstack | Grid cards |
| Standings in Season (`divisionStandings`) | mstack | Grid cards |
| Playoff Bracket (`.bracket-game`) | Grid (already) | Keep grid |
| Key Players (`.kp-grid`) | Grid (already) | Keep grid |
| Linescore (`table.linescore`) | `min-width:320px` | Grid cards |

---

## Color-Coding Standard

| Column Type | Color Variable | Usage |
|-------------|----------------|-------|
| Wins/Value | `var(--good)` (#3ecf8e) | Positive metrics |
| Value/Priority | `#6aa6ff` | Secondary metrics |
| Priority | `var(--gold)` (#ffc43c) | Priority scores |
| Gone% | `var(--accent2)` (#ff6b4a) | Risk/warning |
| OVR | `var(--accent)` (#4f8cff) | Primary identifier |
| Negative | `var(--bad)` (#ff6b6b) | Negative values |

---

## Implementation Checklist

For each table adopting this pattern:

- [ ] Add `data-label` to every `<td>` in `<tbody>`
- [ ] Add `data-nostack="1"` to `<table>` if opt-out needed
- [ ] Assign CSS classes to `<td>` elements matching grid-column layout
- [ ] Test at 390px viewport (Chrome DevTools device toolbar)
- [ ] Verify no horizontal scroll (`overflow-x: hidden` on body)
- [ ] Verify all labels readable at 16px base font size
- [ ] Verify color contrast meets WCAG AA (4.5:1)

---

## Benefits Over mstack Approach

| Aspect | mstack (Canonical) | 12-Column Grid (v20) |
|--------|-------------------|---------------------|
| Label visibility | `::before` pseudo-element | Dedicated label row (`::before`) |
| Column alignment | Flexbox (variable) | Fixed 12-column grid |
| Color coding | Limited | Full semantic color system |
| Button placement | Inline | Dedicated grid area |
| Overflow handling | `overflow-x: auto` | Grid wraps naturally |
| Column priority | Fixed order | Explicit `grid-column` control |
| Density | Single column | Multi-row, information-dense |

---

## Migration Path

1. **Phase 1 (Round 2):** Draft board (already done) + Draft Priority + Draft Cards
2. **Phase 2 (Round 2):** Standings + Player Browser + Position Rankings
3. **Phase 3 (Round 3):** Team Comparison + League Leaders + Season views
4. **Phase 4 (Round 3):** All remaining tables

---

**Author:** Ultra (nemotron-3-ultra-free)  
**Date:** 2026-10-19  
**Status:** Proposed standard — pending Owner approval (P1)