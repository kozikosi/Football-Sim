"""P-345 Q8 (MUSE): the real margin distribution and the Phase 1 shape gate.
Reads the P-344 team-game summary (~/workspace/nflverse-phase1/out/team_game_summary_2016-2025.csv),
pairs team-games into games, and prints the margin distribution + the proposed gate values.
Run: ./venv/bin/python _agents/muse/deliveries/p-345-innovation-2026-11-11/p345-margin-gate.py
"""
import pandas as pd, numpy as np

def skew(s):
    x = s.to_numpy(dtype=float); mu = x.mean(); sd = x.std(ddof=1)
    return float((((x - mu) / sd) ** 3).mean())

def kurt(s):
    x = s.to_numpy(dtype=float); mu = x.mean(); sd = x.std(ddof=1)
    return float((((x - mu) / sd) ** 4).mean() - 3)

df = pd.read_csv('/home/hatch/workspace/nflverse-phase1/out/team_game_summary_2016-2025.csv')
rows = []
for gid, sub in df.groupby('game_id'):
    assert len(sub) == 2, gid
    h = sub[sub['team'] == sub['home_team'].iloc[0]].iloc[0]
    a = sub[sub['team'] != sub['home_team'].iloc[0]].iloc[0]
    rows.append({'game_id': gid, 'season': sub['season'].iloc[0], 'season_type': sub['season_type'].iloc[0],
                 'home_pts': h['points'], 'away_pts': a['points'],
                 'home_drives': h['drives'], 'away_drives': a['drives'],
                 'home_plays': h['plays'], 'away_plays': a['plays'],
                 'total_pts': h['points'] + a['points']})
games = pd.DataFrame(rows)
games['margin'] = games['home_pts'] - games['away_pts']
games['abs_margin'] = games['margin'].abs()
m = games['margin']
print('games:', len(games))
print(f"margin: mean {m.mean():.3f} sd {m.std():.3f} skew {skew(m):.3f} excess-kurtosis {kurt(m):.3f}")
print('margin quantiles 5/25/50/75/95:', [round(float(x), 1) for x in m.quantile([.05, .25, .5, .75, .95])])
print(f"home win rate: {(m > 0).mean():.4f}  ties: {(m == 0).mean():.4f}")
print(f"one-score |margin|<=7: {(games['abs_margin'] <= 7).mean():.4f}  <=8: {(games['abs_margin'] <= 8).mean():.4f}  <=3: {(games['abs_margin'] <= 3).mean():.4f}")
print(f"blowout >=21: {(games['abs_margin'] >= 21).mean():.4f}  >=28: {(games['abs_margin'] >= 28).mean():.4f}")
print(f"total pts/game: mean {games['total_pts'].mean():.2f} sd {games['total_pts'].std():.2f}")
print(f"drives/game (both): mean {(games['home_drives'] + games['away_drives']).mean():.2f} sd {(games['home_drives'] + games['away_drives']).std():.2f}")
print(f"plays/game (both): mean {(games['home_plays'] + games['away_plays']).mean():.2f} sd {(games['home_plays'] + games['away_plays']).std():.2f}")
reg = games[games['season_type'] == 'REG']; mr = reg['margin']
print(f"REG only (n={len(reg)}): margin mean {mr.mean():.3f} sd {mr.std():.3f} skew {skew(mr):.3f} home win {(mr > 0).mean():.4f} one-score<=7 {(reg['abs_margin'] <= 7).mean():.4f} blowout>=21 {(reg['abs_margin'] >= 21).mean():.4f}")
print(games.groupby('season').apply(lambda d: pd.Series({'home_win': (d['margin'] > 0).mean(), 'one_score': (d['abs_margin'] <= 7).mean(), 'margin_sd': d['margin'].std()}), include_groups=False).round(3).to_string())
for col in ['drives', 'plays', 'points', 'yards']:
    s = df[col]
    print(f"team-game {col}: mean {s.mean():.2f} sd {s.std():.2f} skew {skew(s):.3f} q05/q95 {s.quantile(.05):.1f}/{s.quantile(.95):.1f}")
games.to_csv('/home/hatch/workspace/football-sim-muse/_agents/muse/deliveries/p-345-innovation-2026-11-11/p345-games-2016-2025.csv', index=False)
