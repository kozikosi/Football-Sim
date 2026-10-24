# PR #4 Intake Compliance Sweep — BOC — A7 extension (MiMo dispatch) — 20 Oct 2026

Read-only on branch `gpt/all-time-player-source-intake-20261020` @ `04edab9` (fetched). No push/merge/comment. Write only in `_agents/boc/`.

## Files inspected

- `_agents/gpt/research/all-time/source_manifest.json` (9 entries)
- `_agents/gpt/research/all-time/derived/nfl/official-all-time-gap-candidates.csv` (17 rows + header)
- `_agents/gpt/research/all-time/derived/nba/official-all-time-gap-candidates.csv` (1 row + header)
- `_agents/gpt/research/all-time/status-triage/nfl/recent-season-mentions.csv` (66 rows + header)
- `_agents/gpt/research/all-time/status-triage/nba/recent-season-mentions.csv` (79 rows + header)
- `_agents/gpt/research/all-time/derived/README.md`
- `_agents/gpt/research/all-time/quality-control/minimax-data-integrity-review.md` (M-118)

## Check (a) — six layers distinct (VERIFIED)

Fields present in the gap CSVs: candidate_id, sport, canonical_name, position_group, career_status, career_span, season, team, engine_ovr, source_class, owner_source_match, selection_reference, status_reference, status_checked_as_of, review_status, notes.
- person identity: canonical_name + candidate_id (stable id, not derived from name) — distinct.
- player-season: season (blank where not supplied).
- team/franchise: team (blank where not supplied).
- career status: career_status (separate field, with its own source_reference).
- source: source_class, owner_source_match, selection_reference, status_reference.
- sim rating: engine_ovr (blank for all omission candidates).
  VERDICT: VERIFIED — layers are distinct fields; none merged into a single column. Matches Owner direction and player-record.schema.json.

## Check (b) — integers only, no invented decimals (VERIFIED)

Command: `grep -oE "[0-9]+\.[0-9]+" nfl-gap.csv nba-gap.csv nfl-recent.csv nba-recent.csv` → (no output).
VERDICT: VERIFIED — no decimal values in any of the four derived/triage files. (The invented ratings.json in sports/ is a separate, untracked file and is NOT part of this intake — see A7.)

## Check (c) — omission candidates carry empty engine_ovr (VERIFIED)

Command: `awk -F, 'NR>1 && $9!=""' nfl-gap.csv nba-gap.csv` → (no output).
NFL gap rows: 17, all engine_ovr empty. NBA gap rows: 1, engine_ovr empty.
VERDICT: VERIFIED — 18/18 omission candidates have empty engine_ovr, no supplied rating text. Matches MiniMax M-118 claim.

## Check (d) — manifest sha256 recompute for ALL raw files (VERIFIED)

Command: sha256sum (via python hashlib) for each of the 9 manifest entries, compared to manifest value. Also verified byte counts and line counts.
Result: 9/9 sha256 match, 9/9 byte counts match, 9/9 line counts match. 0 unlisted raw files, 0 dangling entries.
VERDICT: VERIFIED — manifest is complete and accurate.

## Check (e) — MiniMax M-118 "two concrete gaps" (VERIFIED)

From M-118: the two gaps needing their owner (GPT's lane) are:
1. 17 of 18 `status_reference` values are prose, not URLs (the URL sits in `selection_reference`).
2. NFL-GAP-008 (Shane Lechler) is labelled `K` while the cited NFL.com roster groups him `PS` (punter).
   Both confirmed by direct inspection of the CSVs. Additional gaps noted by MiniMax: Nate Archibald (NBA 75) missing from raw text and intake; 70 names with conflicting position labels; 14 spelling-variant pairs; 27 same-name multi-season entries; 288 NBA single-token shorthand references.

MiniMax M-118 "ZERO engine-ready records" claim: VERIFIED — 1,470 source mentions + 18 proposed candidate rows, 0 pool records, 0 ratings, 0 franchises, 0 peak seasons. 145 triage rows all `unverified`.

## Row counts

- NFL gap candidates: 17 (NFL-GAP-001 … NFL-GAP-017)
- NBA gap candidates: 1 (NBA-GAP-001, Sam Jones)
- NFL recent-season mentions: 66
- NBA recent-season mentions: 79
- Manifest entries: 9 (8 NFL + 1 NBA)
- Total distinct names in intake: 1,470 (per M-118)

## Violations found

None against the Owner's field rules (a)–(e). The two gaps above are reported to GPT's lane, not violations.

## Summary verdicts

- (a) six layers distinct: VERIFIED
- (b) integers only: VERIFIED
- (c) omission candidates empty engine_ovr: VERIFIED
- (d) manifest sha256 recompute (all 9): VERIFIED
- (e) MiniMax two-gaps claim: VERIFIED

No product edits. No shared-doc rewrites (bulletin append only). No other seats' lanes touched.
