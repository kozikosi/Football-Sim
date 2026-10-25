SPEAKER: OR | ROLE: Council Adviser | TASK: QUEUE-7 "Value here" inventory | DATE: 2026-10-25T00:28Z

FOR: _agents/QUEUE.md item 7 ("Value here" inventory)

INVENTORY RESULT: "Value Here" user-facing occurrences in Football-Sim-PreColors.html (sha256 40233d6be00e987c), as of 24 Oct 22:28 UTC.

## Summary: ZERO user-visible "Value Here" occurrences remain.

The V22 patches (already applied to Pre-Colors) removed all user-facing "Value Here" text. The sort dropdown, table header, and draft board rendering no longer contain any "Value Here" label.

### What was previously here (now removed) — REPORTED from V22-Suggestions.md:
- Line 418 (old): `<option value="value">Sort: value here</option>` — removed from `<select id="draftSort2">`
- Table header column: "Value here" — removed (current line 429 shows: Player, Pos, Team, OVR, Wins, Priority, Gone, Fills, — no Value column)

### Current state (VERIFIED by grep on the product file):
1. **Sort dropdown (line 421)**: Options are `Sort: overall`, `Sort: pick priority`, `Sort: wins value`, `Sort: chance gone`, `Sort: player name`, `Sort: position`, `Sort: team`. No "Value here" option.
2. **Table header (line 429)**: No "Value" or "Value here" column.
3. **boardMathHTML / guide (line 5044-5058)**: Section title reads "Reading the draft board (Wins, Priority, Gone, stars)" — no "Value here" reference.

### Code-level 'value' sort key (NOT user-visible):
- **Line 1678**: `const sortKey = (!sim && ['priority','value','gone'].includes(sortBy)) ? 'wins' : sortBy;`
  - The `'value'` entry in the array is never surfaced in the dropdown (line 421). It is remapped to `'wins'` at this site. Comment in code: `// value is hidden`
- **Line 1680**: `sortKey==='value' ? (r.v==null?-99:r.v)` — handles the 'value' key in keyOf(), maps to r.v.
  - Again, never triggered by user-facing UI since no dropdown option maps to 'value'.

### Other "value" occurrences (NOT user-facing labels):
- Line 1316: code comment `WINS VALUE (how much each player is worth to winning...)`
- Line 1717: `title="...he adds more wins here than any natural player still available."` (tooltip text, uses "here" but not "Value Here")
- Line 1852-1861: internal variables `picksWithValue` (steals/reaches computation)
- Lines 5047, 5663, 5688, 6132: prose using "value" in its ordinary English sense ("most valuable units", "available value", "per-season value")
- Lines 4858, 5685, 6066: `unitValuePerPoint()` function and calls

## Conclusion
The "Value Here" text has been completely removed from all user-facing surfaces in Pre-Colors. No product edit is required for this item. The code-level 'value' sort key at lines 1678/1680 is dead/unreachable from the UI (no dropdown option produces sortBy='value').

## HOW TO CHECK (reproducibility)
```bash
grep -in "value" Football-Sim-PreColors.html | grep -i "here\|sort\|option"
grep -in "value here\|Sort: value\|Value.*Here" Football-Sim-PreColors.html
node tools/lint.mjs extract Football-Sim-PreColors.html /tmp/pc-extract.js
```
Result: no user-facing "Value Here" strings found. Sort dropdown options at line 421 do not include a "value" option.
