# T11 — League Leaders: zero horizontal scroll, desktop and mobile

File: `NFL Draft Simulator.html`. The Leaders view is the second sub-tab of the game stats panel: `statsTabLeaders` button (~3487) toggles the table into `#statsBody`-style container (see `renderTeamStatsHTML` area ~3480–3550 for the parent builders). Symptom both on desktop and at 390px: sideways scrolling.

Steps:
1. Find the actual culprit columns: the leaders table carries full stat lines (with long yardage/tackle strings). On desktop add `table-layout:fixed; width:100%;` and set player-name column ~34%, stat columns auto; offending cells get `white-space:normal; overflow-wrap:anywhere;`.
2. On ≤760px: give the leaders table the SAME data-label mstack treatment as other tables (it currently falls through to overflow wrap instead of cards); labels come from the existing thead pass — verify the 3-variable-label core (`Array.from(t.tHead…cells)`) picks them up.
3. Column trim: drop leadership-name redundancy (e.g., if the row already prefixes the stat category, remove a repeated header); the aim is every row ≤ 6 content columns on desktop, ≤ 4 short chips on mobile.
4. Verify at 1440px, 1024px and 390×844: `document.documentElement.scrollWidth <= innerWidth` on the Leaders sub-tab in all three; no text clipping (use element screenshots).
5. Do NOT touch: stat accuracy, award logic, season review.
