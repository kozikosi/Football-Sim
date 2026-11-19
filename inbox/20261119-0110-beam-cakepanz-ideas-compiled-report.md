SPEAKER: beam | TASK: compiled report of all seats' cakepanz reviews — ideas and innovations | DATE: 2026-11-19T01:10Z
REVIEW-OF: 67-cakepanz submission (rounds 5–8.1) across seats' inbox reviews
VERDICT: ok

## Scope

Compiled from beam's own reviews and audits of the cakepanz submission: beauty audit (2026-11-17), cakepanz5/6 reviews, P-337 review (2026-11-18), and the 8.1 review (2026-11-18). Plus the P-337 innovation block and the beauty audit's innovate section. Every idea below is labelled by origin and evidence status.

## Ideas compiled (innovation / brainstorm)

### A. Late-draft simple board (P-337) — from P-337 review (ok-with-nits)
1. One-click "best available" fill for the last 4 rounds (dispatch top candidate by wins rank into best-fit slot, with undo). Engine already ranks; pure presentation.
2. "Round 11+ summary card" — collapse each team's needs into a one-line pill, expand only the user's row. Lowers mobile density (L5 already 390px clean).
3. Persist simpleOff per save (carry in autosave record, additive, no engine change) so a re-opened late draft keeps "stays full".
4. "Why this pick" one-liner in simple mode reusing planWhy/teamIdentity — keeps late rounds teachable.
5. Late-round flex pricing hint — tiny "−10 to FS only" footer note (existing QB→FS rule) to prevent mistakes without chip clutter.

### B. Shell UI/UX — from 8.1 review (improved)
6. Promote simple/complex density toggle to every data-heavy screen (Standings, Stats, Awards), not just late draft.
7. Shared self-describing numeric cell component (visually-hidden label naming the number) — serves "plain informative language" + a11y.
8. Hover/focus tooltip for flex chips on desktop; keep expand for touch (progressive disclosure by input modality).
9. Persist active sort + expanded-row set per draft so reload lands on the exact board.
10. "Preview other mode" read-only overlay on the valuation mode switch (locked mid-draft) — shows re-ranked board without committing.
11. Make "Best available" the default simple view with full list behind "show all" — cognitive load is in rounds 1-3, not 10+.
12. Reversible FULL BOARD door with confirm (currently one-way; recovery requires new draft).
13. Visible tiny caption (2-3 chars) on the simple row's REC number, not just visually-hidden.

### C. Aesthetics (beauty audit) — palette/type/words
14. Wire team takeover: [data-zpbteam] blocks are empty; set --zpb-t stops are never read. Fix: re-tint gold2/goldm/gold3 + hairline + panel tint under [data-zpbteam] (smaller set than full re-tint).
15. Inline Cinzel 700/900 (only weight 100 ships) — browser renders ultralight/fallback.
16. Body font: system sans, not Cinzel serif (display face bleeding into body).
17. Wordmark face: currently Cinzel Decorative; w89 uses Cinzel/Bodoni Moda.
18. Add slogan "Can you go 20-0?" with shimmer on "20-0" (missing entirely).
19. Standardise value label: "Model Value" vs "Engine Value" vs "Value" — pick one (Owner ruling owed).
20. 2-Pt chip: "2PT"/"2PT FAIL" → "2-Pt Conv" (Owner ruling owed).
21. Dark-mode --text: w89 does not set it (plum ink carries over) — Owner ruling owed; reproduced as defect.
22. Offline fonts: inlined, no CDN dependency (improvement, keep).

### D. Process / hygiene (from 8.1 review)
23. Cross-draft inheritance of fullBoard — loadDraft should not inherit another draft's fullBoard.
24. Headline "CLOSED" overstates while L10 open — relabel "CLOSED except L10".
25. WHAT-CHANGED.md header says "cakepanz-8" while body is 8.1 — retitle.
26. Sighted-user caption gap (finding 4) — covered by idea 13.

## Cross-cutting themes

- Presentation-only changes are the safe lane (zero engine touch) — every idea above stays in render/port layer.
- Progressive disclosure is the dominant UX principle emerging: simple by default late, chips one click away, hover on desktop.
- Team identity is the biggest unshipped feature (team takeover no-op) and the highest-impact visual fix.
- Owner rulings still owed: dark --text, Bodoni Moda, value label, 2-Pt chip, team takeover scope.

## Not run / not verified

- No batteries re-run by me; all receipt numbers are REPORTED.
- Visual surface claims (density, contrast) are INFERRED — need screenshots at 1180px + 390px, two teams.

## Recommendation

Open a Block C P-item for the innovation cluster (ideas 1–13) as render-layer work, and a separate palette P-item for ideas 14–22 requiring Owner rulings first. Keep ideas 23–25 as hygiene.
