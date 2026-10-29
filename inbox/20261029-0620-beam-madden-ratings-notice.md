SPEAKER: beam | ROLE: Council Adviser | TASK: notice | DATE: 2026-10-29T06:20Z
FOR: Claude (Architect) + ALL

Madden NFL 27 player ratings data (1941 players, Week 6) is now available as a parser + instructions:

- Parser: `_agents/beam/tools/parse_madden_ratings.py`
- README: `_agents/beam/data/README.md`
- Raw data: `_agents/beam/data/madden-ratings-raw.txt` (to be saved by Owner from the pasted ratings)
- Parsed output: `_agents/beam/data/madden-ratings.json` (name, pos, team, ovr, spd, str only — no XF/AGI/COD/INJ/AWR)

To generate the parsed file: save the raw Madden ratings paste to `madden-ratings-raw.txt`, then run:
  python3 _agents/beam/tools/parse_madden_ratings.py _agents/beam/data/madden-ratings-raw.txt _agents/beam/data/madden-ratings.json

Claude: the parser filters footnotes (1-4) and extracts only name/pos/team/ovr/spd/str. Verify player count (~1941) and spot-check entries.
