# MiniMax player-data findings — intake reconciliation

**Date checked:** 2026-10-20  
**Scope:** the all-time source-intake branch and the v20 reference build named in the findings.  
**Purpose:** prevent cross-sport contamination, unsupported player-season records, and ratings that do not match the current engine schema.

## What is present in the shared intake

The current all-time intake contains the eight owner-supplied NFL text files and one NBA text file under separate raw/nfl/ and raw/nba/ directories, plus separate NFL and NBA recent-season mention queues. It does not contain a generated rating table, careerAverage column, or a Tom Brady Dallas 2020–2025 row. The current intake therefore cannot be described as the source of those specific bad records; they appear to refer to a different working file that must be identified before it can be corrected in place.

## Reconciled examples

| Finding | Check against supplied sources / v20 reference | Intake rule |
|---|---|---|
| Stephen Curry appears in an NFL file | Curry appears in the NBA peak notes as “’16 Curry” (raw/nba/01_peak_seasons_and_all_time_concepts.txt:28). No Curry entry appears in the supplied NFL raw files or the v20 PLAYERS pool. | Keep Curry in NBA material only. The sport is an explicit field and folder, not inferred from a loose text match. |
| Lamar Jackson is listed as RB | The supplied depth-chart source places Lamar under QB (raw/nfl/01_all_time_depth_chart.txt:48). The v20 PLAYERS row at line 449 is Lamar Jackson, QB, Baltimore Ravens, OVR 95. | Candidate position is QB; reject an RB source row unless the owner explicitly defines a separate historical-position experiment. |
| Tom Brady is assigned Dallas, 2020–2025 | The owner’s final NFL source list has ’07 Tom Brady at raw/nfl/07_final_master_player_season_list.txt:9; the supplied depth chart also lists him at QB (raw/nfl/01_all_time_depth_chart.txt:48). The source does not attach Dallas or a 2020–2025 season range. Tom Brady does not appear in the v20 PLAYERS pool. | Preserve the source-backed 2007 peak mention, with no invented franchise or date range. Do not present it as an engine-pool record. |
| Mahomes 97.8 / 91.5 | The supplied final master list names a 2022 Mahomes candidate (raw/nfl/07_final_master_player_season_list.txt:10), and the depth chart lists him at QB. The v20 PLAYERS row at line 449 has integer OVR 93. | Do not copy the reported decimals into engine_ovr. All-time scores remain unassigned until the owner approves the rating method and scale. |
| careerAverage | The named v20 reference file contains no careerAverage field; the player data contract in that build is fixed positional tuple data. | Keep career-average analysis outside the simulation pool unless a future schema explicitly adds it and the engine consumes it. |

## Data controls applied to the new candidate files

1. NFL and NBA additions live in separate directories and each row repeats its sport.
2. Player identity is not the same as a player-season record. Career status, peak season, team season, and rating are separate fields.
3. An empty season, team, or OVR means the evidence does not supply it; it is not an invitation to infer a value.
4. Every proposed omission carries its official selection reference and an owner-review status. It is not yet an approved pool member or rating.
5. Current/recent mentions remain unverified in the existing sport-specific status queues; no old peak season is treated as proof of retirement and no recent season alone is treated as proof of active roster status.

## Follow-up needed for exact correction

If the malformed Curry/Lamar/Brady/Mahomes records exist in another agent’s data file, cite its path and branch/commit. This intake adds guardrails and candidate records but does not silently overwrite another member’s artifact.
