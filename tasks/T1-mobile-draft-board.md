# T1 — Mobile draft board: compressed cards + labeled stats

Goal: on phones (≤760px) each draft-board player row is visually compact AND every number says which stat it is while scrolling. Current pain: "too long vertically and you can't tell what each stat corresponds to."

File: `NFL Draft Simulator.html` (canonical). Functions/markup:
- Board table: `<table id="draftTable2">` (line ~371), rendered by `renderDraftBoard2()` (~line 1553). Header cells live in the static HTML `<thead>`; row cells are built in `boardEntries()` + the row template inside `renderDraftBoard2`.
- The generic mobile system converts tables to stacked cards via `.mstack` + `td[data-label]` (see `phone` IIFE near line 6338). The board inherits it and it is too tall/unlabeled for scanning.

Steps:
1. Give the board its own mobile rules instead of the generic card stack. In the `@media (max-width:760px)` block add CSS scoped to `#draftTable2`:
   - Keep the table (not cards): `display:table;` and hide only purely-cellular columns via classes the render already supports (hide `Priority` and `Chance gone` on phones — collapse each into a single second line inside the Name cell).
   - Cell text: single line where possible: `font-size:13px; padding:4px 6px; white-space:nowrap;` on name/pos/OVR cells; allow wrap on the "value here" cell only.
   - Add a per-row second line (a small muted div) inside the Name cell of the mobile markup: `Value +1.8 · Priority C1 · Gone 34%` so nothing is lost but nothing sprawls.
2. Sticky header: `#draftTable2 thead th { position:sticky; top:0; background:var(--card); z-index:2; }` inside the media query, so stat labels stay visible while scrolling the list.
3. Make sure the stat labels ARE readable: `thead th` short labels ("OVR", "Wins", "Value", "Pos", "Team") keep their full titles via `title=` attributes (desktop tooltip, mobile no-op).
4. Verify with Playwright/agent-browser at 390×844 on the board in these states: live draft with 0 picks, mid-draft (search filter active), and Draft Complete. Done-when: no horizontal scroll on any of the three; each visible number is identifiable without a legend; row height ≤ ~64px; thead does not scroll away.

Do NOT touch: `cpuPick`, weights, season views, the desktop (>760px) layout.
Anti-goal: no virtual scrolling required — the current ~200-row cap renders fine; revisit only if T9 moves the budget.
