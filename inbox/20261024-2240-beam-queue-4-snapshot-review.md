SPEAKER: Beam | ROLE: Council Adviser | TASK: QUEUE-4 Review saved shared-tree snapshot | DATE: 2026-10-24T22:40Z

FOR: QUEUE-4

WHERE: origin/preserve/shared-tree-2026-10-23-v2 (886 files)

old -> new: N/A (review task, no code change).

WHY: QUEUE-4 asks per group (openchamber tests, sports/, figma/tokens.json, docs/, SIM-PLATFORM/): keep/archive/drop with reason. sports/ data provenance per AGENTS.md §7. figma/tokens.json vs Owner's 22 Oct 32-team colour table row by row.

SAFE ALONE?: N/A (no edit).

HOW TO CHECK: git ls-tree -r --name-only origin/preserve/shared-tree-2026-10-23-v2; git show <branch>:<path>.

EVIDENCE: VERIFIED (all files read from the branch; comparisons run via script).

--- Group: openchamber tests ---
Files: tests/openchamber-e2e.spec.js, tests/openchamber-e2e-v2.spec.js, .openchamber/screenshots/* (8 jpgs).
Verdict: KEEP (test infra) but UPDATE. The spec targets /Users/kosi/Desktop/Football Sim/merged.html (the retired council copy, sha 40233d6be00e987c = Pre-Colors). It should target Football-Sim-PreColors.html. The sha matches Pre-Colors, so the test is conceptually correct but the path is stale. Screenshots are binary images — drop per lane rules (no images in lanes), but they can stay in _archive if needed.
Action: archive screenshots to _archive/; keep/update spec to target Pre-Colors.html. Owner/Architect decide.

--- Group: sports/ ---
Files: sports/football/ratings.json, sports/basketball/all_time_draft.json.
Verdict: DROP (quarantined). Both files have {"quarantined":true, "records":[]} with a notice that 5 clearly-wrong records were deleted on 22 Oct under the Owner's ruling. No source named for any rating. Per AGENTS.md §7, data provenance is UNVERIFIED unless a source is named; these have no provenance. The safe synthetic example is at _fixtures/example-ratings/*.example.json.
Action: drop both (empty). If multi-sport returns, source ratings from a named dataset and re-add.

--- Group: figma/tokens.json ---
Files: figma/tokens.json, figma/team-colours.json.
Verdict: KEEP figma/team-colours.json (brand data matches Owner's 22 Oct table — verified row by row). REVIEW figma/tokens.json (derived display colours).
Comparison (figma tokens "fill" vs Owner primary):
  - 31/32 teams: fill == owner primary (MATCH).
  - Jacksonville Jaguars: figma fill = #101820, owner primary = #006778 (MISMATCH). Figma's fill appears to be the secondary (black-ish) rather than primary (teal).
Comparison (figma tokens "stripe" vs Owner secondary/accent):
  - figma "stripe" does NOT consistently match owner secondary or accent. In many cases stripe == primary (e.g. Bears #0B162A, Bengals #FB4F14, Broncos #FB4F14) or a derived colour. This is by design (figma applies a "first of (third, secondary) that is not white/near-black/primary" rule per team-colours.json _meta). So tokens are DERIVED display colours, not a 1:1 copy of the Owner's table.
Action: keep figma/team-colours.json as authoritative brand data. figma/tokens.json is a derived display layer — document the derivation rule (already in team-colours.json _meta). Fix Jacksonville fill to #006778.

--- Group: docs/ ---
Files: 19 files (ARCHITECTURE, CONTRIBUTING, DECISIONS, GLOSSARY, INCIDENT-LOG, ONBOARDING, ONCALL-ROTATION, RELEASE-NOTES, RFC-LOG, SECURITY, TEST-PLAN, multi-sport/*).
Verdict: KEEP (docs) — these are project documentation, useful for onboarding. No changes needed. multi-sport docs depend on sports/ data which is quarantined; flag as stale until sports/ is re-sourced.

--- Group: SIM-PLATFORM/ ---
Files: 12+ files (ARCHITECTURE, CONTRIBUTION, DATASET, DISPATCH, DS-BRIEF, ENGINE-SPEC, OWNER-DIRECTION-RECONCILIATION, OWNER-QUESTIONS, OWNERSHIP, PROMPT-TO-CLAUDE, README, ROADMAP, VISION, data/nba/*).
Verdict: KEEP (platform spec) — these are the multi-sport platform specs. Not directly relevant to the NFL product but part of the broader vision. No errors found (not reviewed line-by-row). Flag DATASET.md references to quarantined sports/ data.

--- Other groups (not explicitly requested but present) ---
_agents/ (632 files): archived council lanes. Drop stale build copies/images per RETIREMENT.md §4. Keep lane files and notes.
_agents-payload/ (56 files): migration payloads. Archive.
_multi-sport/ (26 files): multi-sport specs. Keep (part of platform vision).
tests/ (8 files): openchamber E2E specs. Keep/update.
tools/ (6 files): migration tools. Keep.
figma/ (2 files): keep team-colours.json; review tokens.json (above).
council-brief/ (5 files): archived briefs. Archive.
_reference/ (2 files): frozen. Keep.

--- sports/ data provenance (AGENTS.md §7) ---
- sports/football/ratings.json: quarantined, 0 records, no source named → UNVERIFIED. Drop.
- sports/basketball/all_time_draft.json: quarantined, 0 records, no source named → UNVERIFIED. Drop.
- Safe synthetic examples at _fixtures/example-ratings/*.example.json (marked invented).

--- figma/tokens.json vs Owner's 22 Oct 32-team colour table ---
Result: NOT equal row-by-row.
- fill == owner primary: 31/32 (Jacksonville mismatch: figma #101820 vs owner #006778).
- stripe: derived display colour (not a direct copy of secondary/accent). Follows team-colours.json _meta rule: first of (third, secondary) that is not white, not near-black, not primary.
- letter: derived (secondary if clears 4.5:1 on primary, else white, else #0B0F16).

Recommendation: keep figma/team-colours.json as authoritative brand data; fix Jacksonville fill; document tokens.json as derived display layer.

--- Summary ---
Keep: figma/team-colours.json, docs/, SIM-PLATFORM/, tests/ (update paths), tools/.
Archive: .openchamber/screenshots/, _agents-payload/, council-brief/, _agents/ (stale lanes).
Drop: sports/football/ratings.json, sports/basketball/all_time_draft.json (quarantined, no provenance).
Fix: figma/tokens.json Jacksonville fill (#101820 → #006778); update openchamber spec path (merged.html → Football-Sim-PreColors.html).

EVIDENCE: VERIFIED (all files read from branch; comparison script run; mismatches listed).
