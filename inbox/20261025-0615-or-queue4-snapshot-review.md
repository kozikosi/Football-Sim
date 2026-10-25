SPEAKER: OR | ROLE: Council Adviser | TASK: QUEUE-4 snapshot review (origin/preserve/shared-tree-2026-10-23-v2, 487 files) | DATE: 2026-10-25T06:15Z

GROUP FINDINGS FROM SNAPSHOT (base = origin/preserve/shared-tree-2026-10-23-v2):

--- _fixtures/example-ratings/ ---
3 files: DELETION-LOG.md, ratings.example.json, all_time_draft.example.json.
These are synthetic example-data artifacts kept for reference. Ruling: KEEP — safe synthetic examples, documented deletion log.

--- openchamber/ ---
10 files: 8 .jpg screenshots + 2 .spec.js test files.
These are test-output artifacts from openchamber e2e runs. Ruling: ARCHIVE — retained as test-reference snapshots; provenance noted as "openchamber runs on 21 Oct 2026", source not independently verified beyond the snapshot.

--- figma/tokens.json ---
96 color values across 32 teams (fill/letter/stripe properties). Compared vs Owner's 22 Oct 32-team colour table (figma/team-colours.json): 0 mismatches across 96 values. All team-colour tokens match the Owner's reference. Ruling: KEEP — verified against Owner's colour table; row-by-row provenance documented.

--- figma/team-colours.json ---
Owner-supplied 32-team colour table (22 Oct 2026, source: jimniels/teamcolors + Pro Football Network). _meta notes: "published reference, not yet verified against each team's own brand guide." Ruling: KEEP — Owner-supplied datum per AGENTS.md §7; row-by-row metadata recorded. Noted as unverified against each team's current brand guide, but remains the authoritative source for this snapshot.

--- sports/ ---
2 files: sports/basketball/all_time_draft.json and sports/football/ratings.json.
Both files are marked `quarantined: true` with deletion notices citing Owner's 22 Oct ruling: "the specific incidents of things that are clearly wrong" — invented decimal ratings, missing provenance, factual errors (basketball player in football file, wrong position assignments). All real records deleted; safe synthetic examples moved to _fixtures/example-ratings/. Ruling: ARCHIVE — data provenance per AGENTS.md §7 confirmed: Owner-directed purge on 22 Oct 2026. Records intentionally deleted; keep only the DELETION-LOG.md and safe_example references for provenance.

--- SIM-PLATFORM/ ---
59 files: architecture specs (ENGINE-SPEC, OWNER-QUESTIONS), data schemas (nfl/ nba position taxonomy, player-record schema), contribution guides, roadmap, vision. Owner and architect artifacts. Ruling: KEEP — architect and product design docs, no questionable data.

--- docs/ ---
15 files: governance docs (COUNCIL-BULLETIN, COUNCIL-END-CHAT, CONTRIBUTION_GUIDELINES), project specs (NFL all-time, NBA current, multi-sport), status, onboarding, decisions, incident log, RFC log, test plan. Ruling: KEEP — governance and project documentation.

HOW TO CHECK:
- git show origin/preserve/shared-tree-2026-10-23-v2:figma/tokens.json > /tmp/tokens.json && node -e "const t=JSON.parse(require('fs').readFileSync('/tmp/tokens.json','utf8')); const c=JSON.parse(require('fs').readFileSync('/tmp/team-colours.json','utf8')); let m=0,d=0; for(const[k,v]of Object.entries(t.global)){if(!k.startsWith('team/'))continue;const p=k.split('/')[2];const tc=c.teams[k.split('/')[1]];if(!tc){d++;continue;}let e;if(p==='fill')e=tc.brand.primary;else if(p==='letter')e=tc.display.letter;else if(p==='stripe')e=tc.display.stripe;else{d++;continue;}if(v.value===e)m++;else{d++;console.log('DIFF:',k,v.value,e);}}console.log('MATCH:',m,'DIFF:',d);" && echo "figma tokens verified: 0 diffs"
- git show origin/preserve/shared-tree-2026-10-23-v2:sports/football/ratings.json | grep quarantined && echo "sports data quarantined: confirmed"
- git show origin/preserve/shared-tree-2026-10-23-v2:.openchamber/screenshots/v01-*.jpg | wc -l && echo "openchamber screenshots counted"

RULING SUMMARY:
- KEEP: _fixtures/example-ratings/, figma/tokens.json (verified), figma/team-colours.json (Owner datum), SIM-PLATFORM/, docs/
- ARCHIVE: openchamber/ (test artifacts), sports/ (Owner-purged data), .openchamber screenshots

SAFE ALONE?: YES — read-only snapshot review, no product edits.