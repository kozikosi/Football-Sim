#!/usr/bin/env python3
"""join-cell-census.py — the per-cell fold-density census over the shipped player-game join.
Data work only (counts and fill rates); NO fitting, NO estimator — the λ estimator note (§2.4) consumes this.
Input: data/player-game/player_game_2016-2025.csv.gz (253,107 rows, shipped this delivery).
Output: measurements/join-cell-census.txt (stdout).
"""
import gzip, csv, sys
from collections import Counter, defaultdict

PATH = sys.argv[1] if len(sys.argv) > 1 else 'data/player-game/player_game_2016-2025.csv.gz'

rows = 0
games_by_cell = defaultdict(set)          # cell -> set of game_id
pg_by_cell = Counter()                    # cell -> player-game rows
season_rows = Counter()
playcols_filled = Counter(); playcols_total = Counter()
pos_rows = Counter()

def cells(r):
    try:
        m = abs(int(float(r['team_margin']))) if r['team_margin'] not in ('', None) else -1
    except ValueError:
        m = -1
    band = ('one-score (|m|<=4)' if m <= 4 else 'mid (5<=|m|<=14)' if m <= 14 else 'blowout (|m|>=15)' if m >= 0 else 'margin-missing')
    # POST = any non-REG season_type (WC/DIV/CON/SB — the join receipt's named rounds); REG otherwise
    st = 'POST' if (r['is_playoff'] == '1' or r['season_type'] != 'REG') else 'REG'
    ha = 'home' if r['home_flag'] in ('1', 'True', 'true') else 'away'
    return [f'season_type={st}', f'side={ha}', f'margin={band}',
            f'season_type={st}|margin={band}', f'season_type={st}|side={ha}|margin={band}', f'season={r["season"]}']

with gzip.open(PATH, 'rt', newline='') as f:
    for r in csv.DictReader(f):
        rows += 1
        season_rows[r['season']] += 1
        pos_rows[r['position']] += 1
        for c in cells(r):
            games_by_cell[c].add(r['game_id'])
            pg_by_cell[c] += 1
        for col in ('n_plays_on_field', 'n_off_plays', 'n_def_plays', 'offense_pct', 'defense_pct', 'st_pct'):
            playcols_total[col] += 1
            if r[col] not in ('', None):
                playcols_filled[col] += 1

out = []
out.append('== join cell census — the fold densities the λ(context) estimator rides on ==')
out.append(f'input: {PATH} · rows: {rows} · distinct games: {len(games_by_cell["season_type=REG"] | games_by_cell["season_type=POST"])}')
out.append('')
out.append('-- per-cell: player-games (rows) · distinct games --')
for c in ['season_type=REG', 'season_type=POST', 'side=home', 'side=away',
          'margin=one-score (|m|<=4)', 'margin=mid (5<=|m|<=14)', 'margin=blowout (|m|>=15)',
          'season_type=REG|margin=one-score (|m|<=4)', 'season_type=REG|margin=mid (5<=|m|<=14)', 'season_type=REG|margin=blowout (|m|>=15)',
          'season_type=POST|margin=one-score (|m|<=4)', 'season_type=POST|margin=mid (5<=|m|<=14)', 'season_type=POST|margin=blowout (|m|>=15)',
          'season_type=POST|side=home|margin=one-score (|m|<=4)']:
    out.append(f'{c}: rows {pg_by_cell[c]} · games {len(games_by_cell[c])}')
out.append('')
out.append('-- per season: player-games --')
for s in sorted(season_rows):
    out.append(f'season {s}: rows {season_rows[s]} · games {len(games_by_cell[f"season={s}"])}')
out.append('')
out.append('-- column fill rates (the §2.4 caveats, recomputed from the shipped bytes) --')
for col in ('offense_pct', 'defense_pct', 'st_pct', 'n_plays_on_field', 'n_off_plays', 'n_def_plays'):
    out.append(f'{col}: {playcols_filled[col]}/{playcols_total[col]} = {100*playcols_filled[col]/playcols_total[col]:.1f}%')
out.append('')
out.append('-- position distribution (top 12 by rows) --')
for p, n in pos_rows.most_common(12):
    out.append(f'{p}: {n}')
print('\n'.join(out))
