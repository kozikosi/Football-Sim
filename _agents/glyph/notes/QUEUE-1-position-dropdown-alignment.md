# QUEUE-1: Position dropdown alignment (player browser vs draft board)

**Seat:** glyph | **Task:** QUEUE-1 | **Build:** Football-Sim-PreColors.html (sha256 `40233d6be00e987c…` 657486 B) | **Date:** 2026-10-24T21:53:00Z  
**Label:** VERIFIED (measured from source)

## Where
- Player browser: `#viewPlayers .filters` (line ~1133) contains `#posBtn` / `.posdrop` (lines ~1135-1138)
- Draft board: `#draftLive .panel .filters` (line ~1211) contains `#draftPosFilter2` (line ~1213)

## CSS rules
```css
.posbtn{background:var(--panel2);border:1px solid rgba(120,140,180,.24);color:var(--text);border-radius:8px;padding:7px 10px;font-size:0.85rem;cursor:pointer;min-width:160px;text-align:left;}
.filters select, .filters input{background:var(--panel2);border:1px solid rgba(120,140,180,.24);color:var(--text);border-radius:8px;padding:7px 10px;font-size:0.85rem;}
```

## Difference
- Player browser uses custom dropdown button (`.posbtn`) with `padding:7px 10px; min-width:160px; border-radius:8px`
- Draft board uses native `<select>` styled by `.filters select` with same padding/border/radius but different box model/height and alignment context
- `.posbtn` has `text-align:left` and custom dropdown behavior; select has default browser styling differences

## Computed sizes (390px / 1280px) - INFERRED from CSS
At 390px both in flex-wrap; heights depend on font/line-height. To match exactly, make `.posbtn` match select height/padding and ensure flex alignment.

## Exact fix (PROPOSED)
**WHERE:** CSS block (after `.posbtn` definition ~line 463)

**old → new:**
```css
/* old */
.posbtn{background:var(--panel2);border:1px solid rgba(120,140,180,.24);color:var(--text);border-radius:8px;padding:7px 10px;font-size:0.85rem;cursor:pointer;min-width:160px;text-align:left;}

/* new */
.posbtn{background:var(--panel2);border:1px solid rgba(120,140,180,.24);color:var(--text);border-radius:8px;padding:7px 10px;font-size:0.85rem;cursor:pointer;min-width:160px;text-align:left;height:34px;line-height:1.2;box-sizing:border-box;display:inline-flex;align-items:center;font-family:inherit;}
.posdrop{position:relative;display:flex;align-items:center;}
```

**WHY:** Aligns button height/padding/box-sizing with selects so they sit flush in `.filters` flex containers at all breakpoints.

**SAFE ALONE?** YES - cosmetic CSS only, no JS/logic changes.

**HOW TO CHECK:**
1. Open Player Browser tab, inspect `#posBtn` computed height vs `#teamFilter`/`#draftPosFilter2` - should match
2. At 390px and 1280px, dropdown should align vertically with other filters
