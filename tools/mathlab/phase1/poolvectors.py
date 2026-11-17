# Conformance vectors for the pooled nodes (1d). The ORACLE is the lab's own Pack class (sim.py: raw plays, bisect on the lab's constants, first level with >= minn
# plays wins), NOT the baker and NOT the TypeScript. It shares only the raw play table (pack.py prep/build_records) with the baker; the cell cutting (bisect vs the
# baker's numpy searchsorted), the pool contents and the fallback hierarchy are independent code.
# For each state and node it records the pool the lab picks: its size and a digest of the multiset of outcomes in it. The TypeScript loader, fed the BAKED pack, must
# reproduce every size and digest (colors/test/nfl/poolnode-vectors.test.ts). Order does not matter, so this does not depend on how plays are ordered in a pool.
# usage: sh fetch.sh && python3 -I poolvectors.py --train 2023-2025 --kick 2024-2025 --out ../../../colors/test/nfl/poolnode-vectors-fit2023-2025.json
import sys, os, json, argparse, random, hashlib
from collections import Counter
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np
import sim as S
from pack import prep, build_records, build_kicks

def fmt(x):
    if isinstance(x, (bool, np.bool_)): return str(int(x))
    x = float(x)
    if x != x: return 'null'
    return str(int(x)) if x == int(x) else repr(x)
def digest(counter):
    lines = '\n'.join('%s|%d' % (k, c) for k, c in sorted(counter.items()))
    return hashlib.sha256(lines.encode()).hexdigest()[:16]
def span(s):
    a, b = s.split('-'); return list(range(int(a), int(b) + 1))

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--train', required=True); ap.add_argument('--kick', required=True); ap.add_argument('--out', required=True); ap.add_argument('--states', type=int, default=700)
    a = ap.parse_args()
    tr = prep(span(a.train)); R = build_records(tr)
    K = build_kicks(tr); K = K[K.season.isin(span(a.kick))]
    P = S.Pack(R, K, dict(p_go2=0, p_make2=0, p_make1=0), minn=25, minn_clock=20, clock='dt_f')
    n = len(R)
    # per-play outcome strings, in the TypeScript tuple column order
    tstr = np.array(['|'.join(fmt(v) for v in (P.oc[j], P.yards[j], P.td[j], P.deftd[j], P.fum[j], P.safety[j], P.fg[j], P.nd[j], P.ndsame[j], P.n_down[j], P.delta[j], P.passatt[j], P.rushatt[j], P.comp[j], P.sackf[j])) for j in range(n)], dtype=object)
    cstr = np.array([str(int(c)) for c in P.call], dtype=object)
    dts = {c: np.array([fmt(v) for v in R[c].values], dtype=object) for c in ('dt_f', 'dt_pf')}
    cache = {}
    def pool_info(kind, L, key, idx, strs):
        ck = (kind, L, key)
        if ck not in cache: cache[ck] = {'n': int(len(idx)), 'd': digest(Counter(strs[idx]))}
        return cache[ck]
    def pick(pools, keys, minn, strs, kind):
        for L, (Pl, k) in enumerate(zip(pools, keys)):
            ar = Pl.get(k)
            if ar is not None and len(ar) >= minn: return pool_info(kind, L, k, ar, strs), L
        if keys[-1] in pools[-1]: return pool_info(kind, len(pools) - 1, keys[-1], pools[-1][keys[-1]], strs), len(pools) - 1
        return None, -1          # a table hole: the lab picks an arbitrary pool, the product the largest and counts it. Not a conformance case; counted below.
    rnd = random.Random(20261117)
    DISTV = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16, 17, 20, 25, 30]
    YDLV = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 16, 17, 21, 22, 26, 27, 36, 37, 46, 47, 51, 52, 56, 57, 66, 67, 76, 77, 81, 82, 86, 87, 91, 92, 96, 97, 99]
    SDV = [-35, -17, -16, -9, -8, -5, -4, -2, -1, 0, 1, 2, 4, 5, 9, 10, 17, 18, 35]
    HS_EARLY = [1, 40, 41, 120, 121, 300, 301, 600, 601, 899, 900]            # quarters 2 and 4
    HS_LATE = [901, 1200, 1500, 1799, 1800]                                      # quarters 1 and 3
    out = {'train': a.train, 'kick': a.kick, 'minPool': 25, 'minClock': 20, 'plays': int(n), 'call': [], 'rec': [], 'clockLate': [], 'clockNon': [], 'kick_digest': {}}
    holes = Counter(); levels = Counter()
    while len(out['call']) < a.states:
        down = rnd.randint(1, 4); ytg = rnd.choice(DISTV); ydl = rnd.choice(YDLV)
        if rnd.random() < 0.7: ytg = min(ytg, ydl)
        sd = rnd.choice(SDV); qtr = rnd.randint(1, 4); hs = rnd.choice(HS_LATE if qtr in (1, 3) else HS_EARLY)
        info, L = pick(P.call_pool, S.keys_call(down, ytg, ydl, sd, qtr, hs), 25, cstr, 'call')
        if info is None: holes['call'] += 1; continue
        levels['call%d' % L] += 1
        out['call'].append({'s': [down, ytg, ydl, sd, qtr, hs], **info})
        for call in range(6):
            ri, RL = pick(P.rec_pool, S.keys_rec(call, down, ytg, ydl), 25, tstr, 'rec')
            if ri is None: holes['rec'] += 1; continue
            levels['rec%d' % RL] += 1
            out['rec'].append({'s': [call, down, ytg, ydl], **ri})
    for clock in ('dt_f', 'dt_pf'):
        out['clockLate'] += []
    late, non = [], []
    for _ in range(a.states):
        oc = rnd.randint(0, 8); qtr = rnd.choice([2, 4]); hs = rnd.choice([1, 20, 40, 41, 80, 120, 121, 200, 300]); sd = rnd.choice(SDV)
        for clock in ('dt_f', 'dt_pf'):
            info, L = pick(P.clk_pool, S.keys_clock(oc, qtr, hs, sd), 20, dts[clock], 'clk-' + clock)
            if info is None: holes['clockLate'] += 1; continue
            levels['late%d' % L] += 1; late.append({'clock': clock, 's': [oc, qtr, hs, sd], **info})
        y = rnd.choice([-8, -5, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 20, 21, 30, 50, 75]); oc2 = rnd.randint(0, 8)
        for clock in ('dt_f', 'dt_pf'):
            info, L = pick(P.nl_pool, S.keys_nl(oc2, y), 20, dts[clock], 'nl-' + clock)
            if info is None: holes['clockNon'] += 1; continue
            levels['non%d' % L] += 1; non.append({'clock': clock, 's': [oc2, y], **info})
    out['clockLate'], out['clockNon'] = late, non
    for clock in ('dt_f', 'dt_pf'):
        ks = Counter('%s|%s|%s' % (fmt(a_), fmt(b_), fmt(c_)) for a_, b_, c_ in zip(P.k_start, P.k_same, K[clock].values))
        out['kick_digest'][clock] = {'n': int(sum(ks.values())), 'd': digest(ks)}
    out['holes_skipped'] = dict(holes)
    with open(a.out, 'w') as f: json.dump(out, f, separators=(',', ':'))
    print('wrote', a.out, os.path.getsize(a.out), 'bytes;', {k: len(out[k]) for k in ('call', 'rec', 'clockLate', 'clockNon')}, 'levels', dict(sorted(levels.items())), 'holes skipped', dict(holes))
main()
