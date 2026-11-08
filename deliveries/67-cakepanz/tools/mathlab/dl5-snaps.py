# mathlab/dl5-snaps.py <snap_counts_YYYY.csv ...> — how many defensive snaps does a team's 5th defensive lineman play? (evidence for DL5_SHARE)
# Data: nflverse snap counts (PFR source), https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_<year>.csv
# Run with `python3 -I`, data files in their own directory. Counts position labels DE, DT, NT, DL only: the file has no OLB label, so an edge rusher
# listed as LB (3-4 teams) is NOT counted. Teams that used fewer than N linemen get 0% at the missing ranks (included, not dropped).
import csv, sys, collections, statistics as st
paths = sys.argv[1:]
POS = {'DE','DT','NT','DL'}
by = collections.defaultdict(list)
alltg = set()
for p in paths:
    with open(p, newline='', encoding='utf-8') as f:
        for r in csv.DictReader(f):
            if r['game_type'] != 'REG': continue
            alltg.add((r['game_id'], r['team']))
            if r['position'] not in POS: continue
            try: d = float(r['defense_pct'])
            except: continue
            if d > 0: by[(r['game_id'], r['team'])].append(d)
ranks = collections.defaultdict(list); tot_dl = []
for k in alltg:
    v = sorted(by.get(k, []), reverse=True) + [0.0]*8
    for i in range(8): ranks[i+1].append(v[i])
    tot_dl.append(sum(by.get(k, [])))
n = len(alltg)
print(f'team-games={n} (REG, 2023-2025)')
print('sum of DL snap shares per team-game (4.0 = four linemen on field every snap): mean %.2f' % st.mean(tot_dl))
for i in range(1, 9):
    a = ranks[i]; q = sorted(a)
    print(f' rank {i}: mean {st.mean(a)*100:5.1f}%  median {q[len(q)//2]*100:5.1f}%  p25 {q[len(q)//4]*100:5.1f}%  p75 {q[3*len(q)//4]*100:5.1f}%')
# by season for stability
for yr in ('2023','2024','2025'):
    a = [ranks[5][i] for i,k in enumerate(alltg) if k[0].startswith(yr)]
    print(' rank5 mean in', yr, '%.1f%%' % (st.mean(a)*100), 'n', len(a))
