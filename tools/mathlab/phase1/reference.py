# Reference numbers for the TypeScript totals bar (1c): REAL team-game means per held-out season, and the Python lab's own neutral-sim means on the same pack.
# usage: python3 -I reference.py --out ../results/phase1-reference-2026-11-15.json [--n 12000]
# The TS run is compared to BOTH: to the real data (the Owner's ~10% guideline, reported not gated) and to the Python sim (same pack, same logic: the port check).
import sys, os, json, argparse
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from evalrun import *
M = ['points', 'drives', 'plays', 'off_plays', 'pass_att', 'rush_att', 'completions', 'yards', 'sacks', 'giveaways', 'top_dt']
def stats(df):
    return {m: {'mean': float(df[m].mean()), 'sd': float(df[m].std()), 'n': int(len(df))} for m in M}
if __name__ == '__main__':
    ap = argparse.ArgumentParser(); ap.add_argument('--out', required=True); ap.add_argument('--n', type=int, default=12000); a = ap.parse_args()
    TRAIN = list(range(2016, 2023)); tr = prep(TRAIN); P = mk(range(2018, 2023), tr=tr)
    out = {'train': '2016-2022', 'kick': '2018-2022', 'pySimN': a.n, 'pySimSeed': 1}
    out['pySim'] = stats(sim_df(P, a.n, 1))
    out['real'] = {}
    for y in (2023, 2024, 2025):
        T = real_team_games(prep([y])); T = T[T.st == 'REG']; out['real'][str(y)] = stats(T)
    T = real_team_games(tr); T = T[T.st == 'REG']; out['real']['2016-2022'] = stats(T)
    with open(a.out, 'w') as f: json.dump(out, f, indent=1, sort_keys=True)
    print('wrote', a.out)
