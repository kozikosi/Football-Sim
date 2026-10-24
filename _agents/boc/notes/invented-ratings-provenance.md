# Invented-Ratings Provenance — BOC — A7 (MOC dispatch) — 20 Oct 2026

Read-only forensics. No quarantine, no deletion, no product edits. No files changed outside `_agents/boc/`.

## 1. Where the files came from (VERIFIED: not recoverable from git)

Files under investigation:
- `sports/football/ratings.json` (994 B, mtime 2026-10-20 12:17:24)
- `sports/basketball/all_time_draft.json` (1,000 B, mtime 2026-10-20 12:32:19)

Commands run:
```
git ls-files sports/football/ratings.json sports/basketball/all_time_draft.json
# (empty — not tracked)

for ref in $(git for-each-ref --format='%(refname)'); do
  if git ls-tree -r --name-only "$ref" 2>/dev/null | grep -q "ratings.json"; then echo "FOUND in $ref"; fi
done
# (no output — not in any ref/branch)
```
Searched all local branches (main, merge/v20-donor, council-intake, feature/remove-guide-panel, gpt/*, collective, hallowed-shell, slime-galley) and both bundles (feature-remove-guide-panel.bundle, merge-v20-donor.bundle). Neither file appears in any ref or bundle.

VERDICT: UNKNOWN origin. The files are untracked working-tree artifacts. Their creation is not recoverable from git. Do not infer a creator.

## 2. Are they still in the tree? (VERIFIED)

```
find . -path ./.git -prune -o -name "ratings.json" -print
# ./sports/football/ratings.json
find . -path ./.git -prune -o -name "all_time_draft.json" -print
# ./sports/basketball/all_time_draft.json
```
Both still present. `core/` is now EMPTY (core/draft_engine.js deleted). `index.html` and `index.js` are gone. `styles.css` and `docs/` remain untracked. `SIM-PLATFORM/` and `datasets/` present.

The invented records (Curry, Brady DAL, Mahomes 97.8/91.5, Lamar Jackson RB) are STILL in `sports/football/ratings.json`. No correction has been applied to that file.

## 3. The specific "other file" (VERIFIED)

The quality-control report in the intake branch (`origin/gpt/all-time-player-source-intake-20261020:_agents/gpt/research/all-time/quality-control/minimax-data-integrity-review.md`) states:
- "It does not contain a generated rating table, careerAverage column, or a Tom Brady Dallas 2020–2025 row."
- "If the malformed Curry/Lamar/Brady/Mahomes records exist in another agent's data file, cite its path and branch/commit."

That "other file" is `sports/football/ratings.json` (untracked, working tree only, mtime 2026-10-20 12:17). It contains exactly the invented records: Tom Brady (DAL, 98.5/89.2), Patrick Mahomes (KC, 97.8/91.5), Lamar Jackson (RB, BAL), Stephen Curry (SG, GSW), plus Josh Hamilton (WR, MIN). No such file exists in any git ref.

The "records were corrected" claim is UNSUPPORTED. The file still contains the invented records. No correction has been applied to it.

## 4. What consumed them (VERIFIED: nothing now)

`core/draft_engine.js` (which reportedly loaded ratings.json by default) is deleted; `core/` is empty. No current file references `sports/football/ratings.json` or `sports/basketball/all_time_draft.json`:
```
grep -rn "sports/football/ratings\|sports/basketball/all_time_draft" . (excluding node_modules/.git)
# only FOLDER_STRUCTURE_RECOMMENDATION.md and ARCHITECTURE_DECISION_RECORDS/v20-v21_ROADMAP.md (documentation, folder sketches)
```
So nothing consumes them now. The reference chain is broken (consumer deleted).

## 5. Recommendation (for Owner)

- Quarantine (move to `_fixtures/example-ratings/` or similar) rather than delete: preserves the evidence of what was attempted and lets the Owner inspect it. Cost of deleting: loses the forensic record; cost of quarantining: a folder that must be clearly labeled "not engine data."
- Do NOT merge these files into any pool without provenance and Owner approval (per OWNER-PRODUCT-DIRECTION.md and the player-record schema).
- The intake branch's raw files are clean (Curry/Brady/Mahomes appear only as source mentions, not as invented ratings).

VERIFIED labels: file existence, content, mtimes, git tracking status, intake branch content, consumer references. UNKNOWN: origin/creator of the two files.
