# V20 CLAUDE HTML vs AUTHORITATIVE BUILD 77bb9ed5 COMPARISON

V20 File: /Users/kosi/Desktop/Football Sim/NFL Draft Simulator v20 Claude.html
SHA-256: 31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819
Size: 649,032 bytes

Authoritative Build: 77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f
SHA-256: 77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f
Size: 650,127 bytes

Difference: v20 is 1,095 bytes SMALLER than 77bb9ed5
- v20 has a stray `<!doctype html><html>` header fragment
- v20 has a duplicate `</body></html>` tail
- 77bb9ed5 is the clean, authoritative reference build

================================================================================
BUILD IDENTITY & CONTEXT
================================================================================

✓ v20 = CLAUDE'S V10 BUILD: Per STATUS.md, "DS patch ('v10': restyle + three fixes,
including the division-tag look-ahead repair)". This is the build Claude had
been working with before the reorg to the authoritative 77bb9ed5.

✓ 77bb9ed5 = AUTHORITATIVE REFERENCE BUILD: The build referenced in STATUS.md,
SUBMISSIONS.md, and all council submissions. This is the build that all
contract rulings and acceptance criteria reference.

✓ v20 has NO SIM-CORE markers: The /_SIM-CORE-START_/ ... /_SIM-CORE-END_/ markers
and the three entry points (buildDraftState, simulateDraftHeadless,
buildLeagueFromDraft) are ABSENT from v20. These were added in the DS flash
patch that produced 77bb9ed5 (S-102 requirement).

✓ 77bb9ed5 HAS SIM-CORE markers: The marker comments and three entry points are
the S-202 product change. v20 predates this change.

================================================================================
LIVENESS ITEMS: v20 vs 77bb9ed5
================================================================================

| Item                      | v20 Occurrences     | 77bb9ed5 Occurrences        | Status                   |
| ------------------------- | ------------------- | --------------------------- | ------------------------ |
| "sudden death"            | 1                   | 1                           | PRESENT in BOTH          |
| "second meeting"          | 1                   | 1                           | PRESENT in BOTH          |
| "wasn't in this round"    | 1                   | 1                           | PRESENT in BOTH          |
| Footer "More" label       | 8                   | present (confirmed by grep) | PRESENT in BOTH          |
| meetingInfo() function    | ABSENT              | PRESENT (lines 3426+)       | FIXED in 77bb9ed5 ONLY   |
| meetingTagText() function | ABSENT              | PRESENT (lines 3479+)       | FIXED in 77bb9ed5 ONLY   |
| fitNoteHTML function      | PRESENT (line 1616) | ABSENT or different         | DEAD FUNCTION in v20     |
| needs-only toggle         | PRESENT (line 1629) | FIXED in 77bb9ed5           | DIFFERENT implementation |

================================================================================
KEY DIFFERENCES SUMMARY
================================================================================

1. SIM-CORE MARKERS:
   - v20: ABSENT (pre-SIM-CORE build)
   - 77bb9ed5: PRESENT (S-202 product change; enables pw4.js, run_all.sh, S-502)

2. CSS/THEMING:
   - v20: v10 "look" with --glow, --gold variables, hero section with bounce animation,
     radial gradients, stepper UI. Marked: `/* ===== v20 look: the season is the product ===== */`
   - 77bb9ed5: Season-first presentation with --bg, --panel, --text, --accent, --accent2
     border variables; modular tabs, bottom links, hero panel. No v10 markers.

3. GAME RECAP FUNCTIONS:
   - v20: Simpler recap text; no `statsNotes` in turnover paragraphs;
     overtime handling: `if(q===4 && pEnd) txt += ' '+pEnd;`
   - 77bb9ed5: Full recap with `statsNotes`; overtime handling: `if(q===4 && pEnd && !r.ot) 
     txt += ' '+pEnd; if(q===5 && pEnd) txt += ' '+pEnd;` (handles OT-ending games)

4. MEETING INFO/FIXES (CRITICAL):
   - v20: ABSENT — meetingInfo() and meetingTagText() functions do not exist
     → "sudden death" wording present in recaps; "Same division: a second meeting..."
     banner prints for every divisional game regardless of meeting count
   - 77bb9ed5: PRESENT — full meetingInfo() and meetingTagText() functions that
     correctly handle meeting counting, tiebreakers, and divisional banners. This
     is the "three fixes" from DS v10 patch per STATUS.md.

5. GUIDE PANEL:
   - v20: `fitNoteHTML` dead function contains "out-values the best natural one" text;
     guide panel returns empty string `return ''`
   - 77bb9ed5: Guide panel returns `<h3>Guide</h3><p>Short reference sections...</p>`;
     `fitNoteHTML` dead function still present but "out-values" text may have been
     addressed by other means

6. NEEDS-ONLY TOGGLE:
   - v20: Implementation at line 1629; `posF0 = document.getElementById('draftPosFilter2').value; 
     needsOnly = posF0==='all'`
   - 77bb9ed5: Fix removed the toggle; a chosen position now shows everyone at it
     (per STATUS.md: "needs-only toggle removed")

7. AWARDS CORRELATION:
   - v20: Trailing space after final sentence: `...moved it the least. `
   - 77bb9ed5: No trailing space: `...moved it the least.`

================================================================================
IMPLICATIONS FOR ROUND 1 IMPLEMENTATION
================================================================================

⚠️ CRITICAL: v20 CANNOT be used for Round 1 validation because:
1. v20 has NO SIM-CORE markers — S-202's product change (markers + 3 entry points)
   has not been applied. Without S-202, pw4.js (S-102) cannot extract the core,
   run_all.sh (S-301) cannot validate the boundary, and the entire Round 1 pipeline
   breaks.

2. v20 lacks the meetingInfo/meetingTagText fixes — if Claude closes "liveness"
   items based on v20 behavior, user-visible bugs (sudden death wording, second
   meeting banner) will persist. These were fixed in 77bb9ed5 per Claude's reopened
   items in the rulings.

3. v20's baseline would be different — any pw4.js measurements from v20 would not
   apply to 77bb9ed5. The baseline must be bootstrapped from 77bb9ed5 (Claude B3/B4).

4. v20's DOM reference pattern may differ — since v20 has different CSS/UI structure,
   the distribution of document./window. references vs core math may be different.
   However, both v20 and 77bb9ed5 have interleaved DOM/math (per earlier audit).

✅ WHAT v20 CAN inform:
- The v10 design decisions and UI patterns that led to the current season-first
  presentation in 77bb9ed5
- The progression from v10 → v10 DS flash → 77bb9ed5 (the reorg path)
- Which items were already present in v10/v20 and which required the DS flash
  patch to fix

================================================================================
CONCLUSION
================================================================================

v20 is Claude's v10 build (pre-reorg, pre-SIM-CORE). It is NOT the authoritative
build 77bb9ed5 to which all SUBMISSIONS.md entries, STATUS.md rulings, and Claude's
Round 1 adjudication refer.

**v20 should NOT be used for:**
- Validating SIM-CORE extraction (no markers exist)
- Closing liveness items (several still present; fixes in 77bb9ed5)
- Bootstrapping the baseline (must be from 77bb9ed5)
- Measuring statistical regressions (different code path)

**v20 CAN inform:**
- Design history and UI evolution
- Understanding the v10 → 77bb9ed5 transition
- Context for council discussions about what changed between rounds

The authoritative build for all Round 1 decisions is 77bb9ed5 (650,127 bytes,
SHA-256 77bb9ed5...). All contract rulings, acceptance criteria, and dependency
chains reference this build.

================================================================================
END OF COMPARISON
================================================================================
