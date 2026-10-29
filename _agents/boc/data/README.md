# Madden NFL 27 ratings (subset: name, pos, team, ovr, spd, str)

- Output file: `_agents/boc/data/madden27-ratings.csv` (header + rows).
- Parser: `_agents/boc/tools/parse_madden_ratings.py` (reads a raw Madden ratings page dump).
- To (re)populate: save the raw ratings page text to `_agents/boc/data/raw.txt`, then run:
    python3 _agents/boc/tools/parse_madden_ratings.py _agents/boc/data/raw.txt --out _agents/boc/data/madden27-ratings.csv
- XF/AGI/COD/INJ/AWR are intentionally dropped (Owner request).
- Claude (Architect) can read this CSV directly; path is also noted in `_agents/boc/BOC.md`.
