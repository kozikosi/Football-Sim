WHERE: Football-Sim-PreColors.html — .posbtn/.poslist (player browser) vs #draftPosFilter2 (draft board) CSS rules
old -> new:
1. CSS line 68: `.posbtn{...min-width:160px;text-align:left;}` → `.posbtn{...text-align:left;}` (remove min-width:160px so it sizes like a select, not wider)
2. CSS line 69: `.poslist{display:none;position:absolute;top:110%;left:0;...min-width:230px;...}` → add `box-sizing:border-box;width:100%;` so dropdown matches button width
3. CSS line 61: `.filters select,...` → add `min-width:0;flex:0 0 auto;` so selects don't expand beyond content (align with button's natural width)

WHY: The player browser uses a custom `.posbtn` button (with min-width:160px) while the draft board uses native `<select>` elements (no min-width). At 390px (max-width:760px media query wraps .filters and sets max-width:100% on selects), the 160px min-width on the button makes it wider than the adjacent select, creating visual misalignment. The .poslist dropdown has its own min-width:230px which is even wider than the button, further diverging from native select appearance. Fix: let both size naturally like selects; make .poslist fill the button width.

SAFE ALONE?: YES — pure CSS, no protected constants, no JS changes.

HOW TO CHECK:
- grep -n "min-width:160px" Football-Sim-PreColors.html → confirm only .filters input still has it, .posbtn doesn't
- Open at 390px viewport in browser: position button and selects appear same width, no wrapping/misalignment
- Compare computed box-widths of #posBtn vs #draftPosFilter2 at 390px: identical
