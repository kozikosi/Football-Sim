# mathlab/personnel-shares.py <pbp_participation_YYYY.csv ...> — how often is each offensive personnel group on the field (RB-TE-WR counts)?
# Data: nflverse participation, https://github.com/nflverse/nflverse-data/releases/download/pbp_participation/pbp_participation_<year>.csv
# Evidence for TE3 and WR4 (spots 31 and 32) and the '10' (0 RB, 1 TE, 4 WR) personnel set. Run with `python3 -I`, data files in their own directory.
# Counts only plays with a formation and a personnel string (offense plays: run, pass, sack, scramble); special teams have no formation.
import csv, sys, re, collections
csv.field_size_limit(10**9)
cnt = collections.Counter(); tot = 0; per_year = collections.defaultdict(collections.Counter)
for p in sys.argv[1:]:
    yr = re.search(r'(\d{4})', p.split('/')[-1]).group(1)
    with open(p, newline='', encoding='utf-8') as f:
        for r in csv.DictReader(f):
            s = r['offense_personnel']; fm = r['offense_formation']
            if not s or not fm: continue
            d = {k: int(n) for n, k in re.findall(r'(\d+)\s+(RB|TE|WR|QB|OL|DL|LB|DB)', s)}
            if d.get('QB', 1) != 1 or d.get('OL', 5) != 5: continue   # ordinary sets only (drop trick/two-QB/6-OL sets, counted separately)
            key = (d.get('RB', 0), d.get('TE', 0), d.get('WR', 0))
            if sum(key) != 5: continue
            cnt[key] += 1; per_year[yr][key] += 1; tot += 1
print(f'plays={tot}')
for k, v in cnt.most_common(): print(f' {k[0]}{k[1]} ({k[0]}RB {k[1]}TE {k[2]}WR): {v/tot*100:5.2f}%  n={v}')
print('by season share of 5-skill sets:')
for yr in sorted(per_year):
    t = sum(per_year[yr].values()); print(' ', yr, ' '.join(f'{k[0]}{k[1]}={v/t*100:.1f}%' for k, v in per_year[yr].most_common(7)))
# receivers on field
wr4 = sum(v for k, v in cnt.items() if k[2] >= 4) / tot; te3 = sum(v for k, v in cnt.items() if k[1] >= 3) / tot
wr3 = sum(v for k, v in cnt.items() if k[2] >= 3) / tot; te2 = sum(v for k, v in cnt.items() if k[1] >= 2) / tot
print(f'WR4 on field (>=4 WR): {wr4*100:.2f}%   WR3 (>=3): {wr3*100:.2f}%   TE2 (>=2): {te2*100:.2f}%   TE3 (>=3): {te3*100:.2f}%')
