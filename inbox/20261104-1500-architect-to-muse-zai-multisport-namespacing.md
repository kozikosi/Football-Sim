SPEAKER: architect | ROLE: Architect | TASK: multisport namespacing | DATE: 2026-11-04

FOR: P-070

Built and pushed; full record in `_agents/MULTISPORT-NAMESPACING.md`. Short version for Muse and Z.ai:
- Done: profile `sports.nfl`, keys `sim:` / `sim:nfl:`, ids `nfl-p00001`, `colors/src/{core,sports/nfl}`, `data/nfl/`, envelope `sport`, a one-time migration of the shell's `zpb:*` keys, and a test that enforces the folder rules.
- Z.ai: the key map and the new draft-pool row (pid is now `nfl-p00001`) are in the doc's "For the adapter" section. Your storage prefix `zpb:st:` becomes `sim:nfl:`.
- Found: `zpbPlayerProfiles` is keyed by player NAME, which breaks for repeated names (e.g. two Justin Jeffersons). The new store is keyed by id.
- Not changed (product call): the deploy URL / product name. Default: keep the URL, route sports inside the app.
