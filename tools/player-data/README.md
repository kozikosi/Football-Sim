# Player intake validator

This is the first shared, no-install validation gate for player data. It is independent of the NFL simulator’s internal player array and does not assign ratings.

## Run it

From the repository root:

    node tools/player-data/validate-players.mjs data/nfl/all-time/players.json

Run its regression checks with Node’s built-in test runner:

    node --test tests/player-data-validator.test.mjs

No packages, network access, database, API key, or paid service are needed. The GitHub Actions check runs these same local tests and validates any committed file named players.json under data/.

## Dataset shape

Use one versioned JSON dataset per sport and mode. The proposed path convention is:

    data/<sport>/<mode>/players.json

For example, NFL current, NFL all-time, NBA current, and NBA all-time remain separate datasets. This path is a convention for review, not a requirement imposed by the validator.

Each dataset has a schemaVersion of 1, a stable lowercase datasetId, a lowercase sport identifier, a mode of current or all-time, a version label, a roleCodes list, and a players list.

Each player record requires:

- id: stable player identifier within the dataset
- name: display name
- positions: one or more codes declared in roleCodes
- activeStatus: active, retired, or unknown
- sources: at least one traceable source record

A player may have no ratings yet. This is useful during candidate-list intake and avoids filling gaps with invented scores. If a rating exists, it must declare a metric, source value, source scale (minimum, maximum, and label), sourceId, and status of raw, provisional, reviewed, or derived.

Ratings may be integers or decimals and may use different scales. The validator checks each value against its own declared scale; it does not convert Madden, NBA2K, or historical ratings into a common simulation scale.

Sources use an id, kind, and label. A reference may be a URL, filename, book/article citation, database export name, or other locator. For an Owner-provided list, identify the attachment or transmission in the label. Record accessedAt when known. Rating provenance must resolve to one of that player’s sources.

Seasons are optional. When present, use explicit labels such as 2024 or 2024-25, and optionally identify the team for that season. The validator does not require current active players to have a completed season list.

## What the validator catches

It checks required fields, types, mode and status values, declared sport-local role codes, unique player and source IDs, repeated season entries, source references, rating scale bounds, rating provenance, duplicate metric/source/season observations, unknown fields, and likely duplicate display names.

Errors fail the command. Warnings do not fail it. An empty dataset can be used as a structural template, but it produces a warning and is not a simulation-ready pool.

## What it cannot prove

A valid file is not a fact-checked or approved roster. The script cannot establish that a player truly held the listed position or team, that the player is active or retired, that a rating accurately represents the player, that a citation supports the attached value, that the source is licensed for redistribution, or that a candidate belongs in an all-time pool. Those questions need source review and an accountable human decision.

Keep source facts, ratings, transformations, mode adjustments, and simulation-ready values distinguishable. Do not edit an original source value to make it fit an engine; add a documented transformation later.

## No canonical player data is included here

The test fixtures are synthetic validator inputs and are not player candidates. This tooling change adds no player names or ratings to shared data. After the Owner approves data locations and rating policy, contributors can migrate reviewed intake records into the canonical sport/mode files.
