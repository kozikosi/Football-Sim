# All-Time Player Research Intake

**Status:** unreviewed source material for future curation. This folder is a research inbox, not a canonical player pool, rating set, or approved simulation specification.

The owner supplied eight NFL text attachments and one NBA text attachment as working material. The originals are preserved byte-for-byte under `raw/`. `source_manifest.json` records source IDs, original attachment IDs, byte counts, line counts, and SHA-256 hashes so contributors can verify that a copy has not changed.

## Catalog

### NFL

| Source ID | File | Contents at a glance |
|---|---|---|
| `NFL-AT-001` | [`raw/nfl/01_all_time_depth_chart.txt`](raw/nfl/01_all_time_depth_chart.txt) | Proposed all-time starters and depth chart, including offense, defense, returners, kickers, and related roster notes. |
| `NFL-AT-002` | [`raw/nfl/02_favorites_and_player_season_rankings.txt`](raw/nfl/02_favorites_and_player_season_rankings.txt) | Personal favorites followed by a long player-season ranking. |
| `NFL-AT-003` | [`raw/nfl/03_personnel_lists_and_position_preferences.txt`](raw/nfl/03_personnel_lists_and_position_preferences.txt) | Position-based candidate lists and later preference notes. |
| `NFL-AT-004` | [`raw/nfl/04_player_season_ranking_variant_a.txt`](raw/nfl/04_player_season_ranking_variant_a.txt) | One version of a ranked player-season list. |
| `NFL-AT-005` | [`raw/nfl/05_player_season_ranking_variant_b.txt`](raw/nfl/05_player_season_ranking_variant_b.txt) | Another version of a ranked player-season list. |
| `NFL-AT-006` | [`raw/nfl/06_player_season_ranking_variant_c.txt`](raw/nfl/06_player_season_ranking_variant_c.txt) | Another version of a ranked player-season list. |
| `NFL-AT-007` | [`raw/nfl/07_final_master_player_season_list.txt`](raw/nfl/07_final_master_player_season_list.txt) | A list labeled “Final master list” by its author. It remains source material pending review. |
| `NFL-AT-008` | [`raw/nfl/08_favorites_and_edge_rusher_notes.txt`](raw/nfl/08_favorites_and_edge_rusher_notes.txt) | Personal favorites and edge-rusher-oriented notes, including additional fields. |

The ranking files contain overlapping but non-identical orders. Keep each version available; do not infer that the latest-looking title settles disagreements.

### NBA

| Source ID | File | Contents at a glance |
|---|---|---|
| `NBA-AT-001` | [`raw/nba/01_peak_seasons_and_all_time_concepts.txt`](raw/nba/01_peak_seasons_and_all_time_concepts.txt) | Peak-season candidates and broad all-time roster, era, team, duo, matchup, and draft-pool brainstorming. |

## How to use this material

1. Treat these files as the owner’s inputs and ideas, not verified historical records or final rankings.
2. Keep raw files immutable. Put corrections, interpretations, and normalized records in separate derived files that cite a source ID and line number.
3. Preserve disagreements between lists. A ranking position is evidence of a preference in that particular list, not a calibrated rating or an automatic draft value.
4. Do not silently resolve spelling, aliases, teams, seasons, positions, eligibility, or historical rules. Record a proposed resolution with its source and ask the owner when a choice affects simulation design.
5. Do not copy these lists directly into production player data. A future pool needs an explicit schema, eligibility policy, season/team identity, position rules, rating methodology, provenance, and review status.
6. The owner’s broader aim is to curate roughly 1,200 all-time NFL and NBA player candidates, with current stars eligible under a proposed rating adjustment. That policy is not encoded or approved by these source files; define it separately before rating work begins.

## First source-backed omission pass

A derived, sport-separated candidate pass now lives in derived/README.md. It adds 17 missing players from the NFL’s official 100 All-Time Team roster and Sam Jones from the NBA 75 roster, with no guessed peak season, team, or rating. The NFL and NBA official lists are an initial gap check, not a completed 1,200-player pool.

The MiniMax data-integrity findings and the checks against the v20 tuple contract are recorded in quality-control/minimax-data-integrity-review.md. The user-supplied raw notes remain unchanged.

## Suggested next artifacts

When the owner is ready, create separate, reviewable outputs rather than editing these sources:

- a candidate ledger keyed by sport and player-season, with source IDs and line references;
- a duplicate/alias review queue;
- a position and historical-era eligibility decision log;
- a rating rubric and calibration plan, with an explicit separation between evidence and judgment;
- a small pilot pool reviewed by the owner before scaling toward the target pool size.

These are suggestions for organizing later work, not approval to choose player ratings or settle simulation rules.

## Player activity status: separate fact from season rating

A follow-up requested that future player work distinguish by sport and whether a player is clearly retired or may still be active. Keep the raw sources intact and record status on a derived, source-linked player record. Do not split or rewrite the raw text: several files mix player seasons, career-level lists, roster concepts, and rankings.

The first-pass queues are in [`status-triage/`](status-triage/README.md): [NFL recent-season mentions](status-triage/nfl/recent-season-mentions.csv) and [NBA recent-season mentions](status-triage/nba/recent-season-mentions.csv). They contain 66 NFL and 79 NBA source-line mentions of 2024–2026 seasons, not unique-player counts or confirmed active players. A recent peak season does not prove that a player is still on a roster, and an older peak season does not prove retirement. Status needs its own evidence and “checked as of” date.

Recommended person-level status values:

- `active`: verified on a current league/team roster as of the recorded date (define treatment of injured/reserve lists consistently);
- `retired`: supported by a retirement announcement or authoritative career record;
- `unrostered_or_free_agent`: no current roster spot, but no retirement claim;
- `uncertain`: evidence is incomplete or conflicting.

Keep `sport`, person identity, player-season (`season`), and career status as separate fields. Historical all-time ratings attach to a player-season. Any proposed current-player adjustment (including the earlier proposed -5) should be an explicit simulation rule applied after the player-season rating is defined; it is not encoded in these intake files.

