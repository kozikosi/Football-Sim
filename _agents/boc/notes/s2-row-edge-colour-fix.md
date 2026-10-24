# S2 — Draft Board Row Edge Colour Fix (BOC) — 22 Oct 2026

Build: `Football-Sim-V21.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`

## MOC's audit (M-20261022-i)
Only 3 of 20 colour surfaces are live; 17 wait on 5 mechanisms. S2 (draft board row edge) is one of the 17.

## Current state

### CSS rule (l.261)
```css
#draftTable2 tr{display:grid;grid-template-columns:repeat(12,1fr);gap:2px 4px;align-items:end;border:1px solid var(--border);border-left:4px solid var(--accent);border-radius:10px;margin:5px 0;padding:6px 8px;background:var(--panel2);}
```

The `border-left` uses `var(--accent)` — the user's team colour. Every draft board row wears the user's colour, regardless of which team the player belongs to.

### Row data (l.629)
```html
<tr class="teamrow" data-team="${row.team}">
```

The row carries `data-team` with the team name, but the CSS doesn't use it for the border colour.

## Proposed fix

### Option A (minimal, no colour-identity system needed)
Change `var(--accent)` to `var(--t1, var(--accent))`:
```css
#draftTable2 tr{...border-left:4px solid var(--t1, var(--accent));...}
```
This requires setting `--t1` per row via inline style or JS. The row already has `data-team`, so a small JS addition sets the CSS variable:
```js
tr.style.setProperty('--t1', TEAM_COLOURS[tr.dataset.team]?.primary || 'var(--accent)');
```

### Option B (with MOC's colour-identity system)
If MOC's colour-identity system is implemented (role-based, resolved at runtime), the rule becomes:
```css
#draftTable2 tr{...border-left:4px solid var(--t1, var(--team1));...}
```
Where `--team1` is the user's team colour (fallback) and `--t1` is the row's team colour (set per row).

### Recommended: Option A
Option A is simpler and doesn't depend on MOC's system being implemented first. It can be applied independently.

## WHERE
`Football-Sim-V21.html` l.261 (CSS rule) + l.629 (row rendering, add JS to set `--t1`)

## WHAT
Old: `border-left:4px solid var(--accent);`
New: `border-left:4px solid var(--t1, var(--accent));` + JS: `tr.style.setProperty('--t1', TEAM_COLOURS[tr.dataset.team]?.primary || 'var(--accent)');`

## WHY
Every draft board row should wear its team's colour, not the user's colour. Currently all rows look the same (user's colour), making it hard to visually distinguish teams.

## SAFE ALONE?
Yes — CSS + one JS line. No math changes, no protected constants. The `TEAM_COLOURS` lookup is data, not math.

## HOW TO CHECK
1. `node --check` on extracted script → exit 0
2. Visual check: each draft board row has a different border colour matching its team
3. Visual check at 390px: no horizontal overflow

## What was deliberately not checked
- Whether the `TEAM_COLOURS` object exists in the build (it may need to be added)
- Whether the 32 per-team CSS rules mentioned in MOC's audit are already present
- Contrast of team colours on the dark panel background

## Note
This is a proposal, not an implementation. The Architect owns the product file. BOC cannot edit `Football-Sim-V21.html`.
