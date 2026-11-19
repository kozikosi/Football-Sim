# w89 vs cakepanz — the structural difference, measured

Date: 2026-11-19 · Seat: Z.ai · TASK 7.2 (v3.0 §7) · English only.
Method (VERIFIED, this sitting): both pages opened in a headless browser at 1180×900 and 390×844;
DOM measured with eval (row/cell counts, computed grid columns, scrollWidth vs clientWidth).
w89 = `Football-Sim-Z-post-blue-w89.html` from `origin/gh-pages` (header says `WAVE: w89`;
1,922,769 B). cakepanz = the c10 package's `cakepanz-4/dist/single.html` (the release-candidate
bytes, 527,162 B). No aesthetic judgement — only what is where.

| what | w89 (the live wave) | cakepanz (the Colors track) |
|---|---|---|
| page identity | title "20-0"; one `.wrap` container | title "76 Pancakes — Can you go 20-0?"; Svelte app root |
| nav shape | 6 flat tabs in one nav rail: SIMULATOR · MADDEN RANKINGS · PLAYER BROWSER · POSITION RANKINGS · TEAM COMPARISON · GUIDE (+ a DARK toggle) | topbar "Saves" button + a 14-button screen rail: TEAM · DRAFT · CARDS · SEASON · WEEK · STANDINGS · PLAYOFFS · AWARDS · REVIEW · STATS · BOOK · SHARE · GUIDE · SETTINGS |
| board technology | HTML `<table>` (`#draftTable2`) | CSS grid rows (`.cp-row` > `button.cp-main`, 7 columns: name, pos, NFL team, OVR, WINS, PRIO, GONE%) |
| row anatomy | 9 cells: Player · Pos · Team · OVR · Wins · Priority · Gone · Fills · action-button | 7 cells inline + an expandable detail strip per row (flex chips "Draft at <slot>" + the gone% method text) |
| draft-time board size | 151 rows shown by default with a "SHOW ALL 1148 PLAYERS" expander | 60 rows always (the needs/board window) |
| rows visible above the fold at 1180×900 | 10 draft rows | 12 rows (board starts 165 px down; total board 3,327 px tall) |
| suggestion affordance at pick 1 | EXACTLY 3 rows carry `zpb-top3` — a per-team-color glow (a `--glow` CSS variable) plus a per-row "Draft" button in the action cell | the top-3 rows carry a `.cp-suggest` gold ring — but a rounded-value tie extends it: measured 3 at pick 1, and 60 of 60 rows ringed by the pick-27 state (all rows display `+0.0` wins) |
| horizontal scroll at 390×844 | NONE (scrollWidth 385 ≤ clientWidth 390) | NONE (scrollWidth 390 == clientWidth 390; the ≤430 px media query tightens the 7 columns) |
| what the pick flow costs | one click: the row's own "Draft" button | three interactions: expand row → "Draft at <slot>" chip → "Confirm the pick" |

The Owner's eye, turned into structure (INFERRED from the measurements, no aesthetics): w89's
advantages are (1) one-click drafting — the affordance IS the suggestion, a glowing per-row button
on exactly three rows; (2) a denser first screen — 9 informative cells per row with no expand step;
(3) a shorter nav. cakepanz pays for its extra structure (save system, autosave, season screens,
a11y attributes) with a three-click pick flow and a heavier screen rail. The C′1 fix that pulls
cakepanz toward w89's feel is the same one already named for the product track: rank the
suggestion on raw values (needs `raw: { wins, priority }` on BoardRowVM — an engine-view export or
re-pin), and the Owner's "four stats tabs in ALL CAPS" ruling (SEASON STATS / PLAYOFF STATS /
YOUR PLAYERS / LEAGUE LEADERS) applies to the stats screens at cutover.

Both boards agree on the parts the batteries pin: no horizontal scroll at 390 px on either shell.
