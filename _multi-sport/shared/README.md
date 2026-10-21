# shared/ — common engine template

**Status:** not yet extracted. The template will be created post-merge from the NFL sim by stripping all NFL data and NFL-specific math. What remains: season engine structure, playoff bracket logic, awards framework, matchup model skeleton, UI shell, mobile CSS, harness integration points.

**Extraction plan (post-merge):**
1. Copy `NFL Draft Simulator v20 Claude.html` (merged build) to `shared/engine-template.html`.
2. Remove all NFL player data (PLAYERS array, TEAM_DATA).
3. Remove all NFL position weights (DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP).
4. Remove all NFL-specific math (slotWins, matchupModel coefficients, awards).
5. Keep: season engine structure, playoff bracket logic, awards framework, UI shell, mobile CSS, harness integration points (SIM-CORE markers, headless entry points).
6. Verify: `node --check` on extracted core, SIM-CORE markers present, headless entry points exist.
7. Test: run harness scripts against the template (should pass with empty data).

**Files to be created:**
- `engine-template.html` — stripped NFL sim
- `season-engine.js` — generic: schedule, playoffs, awards
- `matchup-model.js` — generic: unit ratings → points
- `harness/` — generic: pw4, validate, phone, funcdiff
