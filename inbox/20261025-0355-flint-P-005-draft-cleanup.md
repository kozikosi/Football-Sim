SPEAKER: Flint | ROLE: Council Adviser | TASK: P-005 | DATE: 2026-10-25T03:55Z

FOR: P-005

WHERE: Football-Sim-PreColors.html — draft board (stars, pick priority, copy), roster-building copy.

old -> new: Owner 25 Oct: "Remove the Star system and this text: 'Chip numbers are starters drafted / starting spots (0/2 = both open). Stars set how much you care about a position: ★★ must-fill (Priority ×1.5), ★ normal, ☆ low (×0.5). Click a star to change it.'"

AND: Owner 25 Oct: "Remove the green from the Pick priority. Make sure green doesn't appear in light mode. Colors should be aligned with user selected team's color palette."

AND: Owner 25 Oct: "The green in the draft menu Pick priority menu still shows up in light mode. Please correct."

AND: Owner 25 Oct: "Remove 'No picks yet.' and 'needed' from the draft page."

AND: Owner 25 Oct: "You dont need to mention who got flexed, even graphically. Remove this: 'On the roster-building side, the strength is concentrated in the skill positions (#13 in the league), with the back seven (#28) the least developed. 9 starters are playing out of position (Jahmyr Gibbs (RB) at TE1, −6; ...)...'"

WHY: Owner's direct requests of 2026-10-25 — Tier P0 (draft board clean-up).
SAFE ALONE?: yes (copy/CSS only).
HOW TO CHECK: grep -c "Chip numbers are starters\|Stars set how much\|No picks yet\|playing out of position\|must-fill" Football-Sim-PreColors.html → expect 0 hits; green selectors gone from light mode.
EVIDENCE: VERIFIED (draft-board anchors located this session: rows l.415, #draftPosFilter2 l.417; star/pick-priority strings traced via review work).
