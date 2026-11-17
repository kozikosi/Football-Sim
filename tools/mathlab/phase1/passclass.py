# Phase 2 pass-class node (the first GLM node, 2a). P(class | state) for a pass play, class in {comp, inc, sack, int}, as a multinomial logit on 15 portable features.
# Replaces the POOL's class marginal (the stratified cell's class mix) with a smooth model; the outcome DETAIL (yards, fumble, next spot) still comes from the pool, drawn
# conditional on the class (class-then-tuple sampler, sim/passclass.ts). The lambda seam is the existing tilt(): P_k proportional to p_k * exp(lambda * theta_k * gap).
#
# usage:  sh fetch.sh                                   (nflverse 2016-2025)
#         python3 -I passclass.py report                (held-out report: fit 2016-2022, test 2023-2025; feature choice was made on 2021-2022 only)
#         python3 -I passclass.py bake --date 2026-11-17   (writes data/packs/nfl-passclass-fit2016-2022.json and ...fit2023-2025.json, and colors/test/nfl/passclass-vectors.json)
# Features are built from + - * / comparisons and pmath.plog only, so the TypeScript (sim/passclass.ts) and this file give the same bits (checked by the vectors).
import sys, os, json, argparse
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(HERE, '..', '..', '..')
sys.path.insert(0, HERE); sys.path.insert(0, os.path.join(HERE, '..'))
import numpy as np
import pmath as PM
import sim as S
from pack import prep, build_records

CLASSES = ['comp', 'inc', 'sack', 'int']            # == oc 0..3 in the pools pack
FEATURES = ['d2', 'd3', 'd4', 'lytg', 'ydl', 'rz', 'gl', 'own', 'sd', 'late', 'late_sd', 'late_trail', 'd3ytg', 'd1ytg', 'ytg']
THETA = [0.3, -0.2, -1.0, -0.6]                     # comp, inc, sack, int: the toy kernel's duty-gap shape (1b). NOT fitted; lambda is 0 until Phase 2 L1 estimates it.
C_REG = 1.0                                         # L2 strength; validation loss is flat from 0.1 to 10
MIN_CLASS_POOL = 25

def feat(down, ytg, ydl, sd, qtr, hs, plog=PM.plog):
    """one state -> the 15 features, in FEATURES order. The order of operations is part of the contract (sim/passclass.ts does exactly this)."""
    d = min(down, 4); yt = min(max(ytg, 1.0), 30.0); lytg = plog(yt)
    sdc = min(max(sd, -21.0), 21.0) / 10
    late = 1.0 if ((qtr == 2 or qtr == 4) and hs <= 300) else 0.0
    return [1.0 if d == 2 else 0.0, 1.0 if d == 3 else 0.0, 1.0 if d == 4 else 0.0, lytg, ydl / 100,
            1.0 if ydl <= 20 else 0.0, 1.0 if ydl <= 5 else 0.0, 1.0 if ydl >= 90 else 0.0, sdc, late, late * sdc, late * (1.0 if sd < 0 else 0.0),
            (1.0 if d >= 3 else 0.0) * lytg, (1.0 if d == 1 else 0.0) * lytg, yt / 10]

def feat_matrix(R):
    """vectorised twin of feat() for training (np.log instead of plog: differs by about 1e-16, irrelevant to a fit)"""
    d = np.minimum(R.down.values.astype(int), 4); yt = np.minimum(np.maximum(R.ydstogo.values.astype(float), 1.0), 30.0); ydl = R.yardline_100.values.astype(float)
    sd = R.sd.values.astype(float); hs = R.hs.values.astype(float); q = R.qtr.values.astype(int)
    lytg = np.log(yt); sdc = np.minimum(np.maximum(sd, -21.0), 21.0) / 10
    late = (((q == 2) | (q == 4)) & (hs <= 300)).astype(float)
    cols = [(d == 2) * 1.0, (d == 3) * 1.0, (d == 4) * 1.0, lytg, ydl / 100, (ydl <= 20) * 1.0, (ydl <= 5) * 1.0, (ydl >= 90) * 1.0, sdc, late, late * sdc, late * (sd < 0),
            (d >= 3) * lytg, (d == 1) * lytg, yt / 10]
    return np.stack(cols, 1)

def passes(years):
    R = build_records(prep(list(years))); R = R[R.call == 0].reset_index(drop=True)
    assert set(np.unique(R.oc.values.astype(int))) <= {0, 1, 2, 3}
    return R

def fit(R):
    from sklearn.linear_model import LogisticRegression
    m = LogisticRegression(C=C_REG, max_iter=5000).fit(feat_matrix(R), R.oc.values.astype(int))
    assert list(m.classes_) == [0, 1, 2, 3]
    return m.intercept_.tolist(), m.coef_.tolist(), m

def probs_pmath(intercept, coef, x):
    """softmax of the logits, on pmath: the exact arithmetic sim/passclass.ts performs"""
    z = []
    for k in range(4):
        acc = intercept[k]
        for j in range(len(x)): acc += coef[k][j] * x[j]
        z.append(acc)
    m = z[0]
    for v in z[1:]:
        if v > m: m = v
    e = [PM.pexp(v - m) for v in z]
    s = e[0]
    for v in e[1:]: s += v
    return [v / s for v in e]

def pool_class_probs(trn, tst):
    """the CURRENT node's class mix: the rec pool picked by the hierarchy (first level with >= 25 plays) for (call=pass, down, distBin, ydlBin)"""
    down = trn.down.values.astype(int); ytg = trn.ydstogo.values; ydl = trn.yardline_100.values; oc = trn.oc.values.astype(int)
    pools = [dict() for _ in range(4)]
    for i in range(len(trn)):
        for L, k in enumerate(S.keys_rec(0, down[i], ytg[i], ydl[i])): pools[L].setdefault(k, np.zeros(4))[oc[i]] += 1
    out = np.zeros((len(tst), 4)); d2 = tst.down.values.astype(int); y2 = tst.ydstogo.values; l2 = tst.yardline_100.values
    for i in range(len(tst)):
        ks = S.keys_rec(0, d2[i], y2[i], l2[i]); ch = None
        for L, k in enumerate(ks):
            c = pools[L].get(k)
            if c is not None and c.sum() >= 25: ch = c; break
        if ch is None: ch = pools[3][ks[3]]
        out[i] = ch / ch.sum()
    return out

def nll(P, y, floor=1e-12): return -np.log(np.clip(P[np.arange(len(y)), y], floor, 1.0))

def report():
    tr = passes(range(2016, 2023)); te = passes(range(2023, 2026))
    ic, cf, m = fit(tr); y = te.oc.values.astype(int)
    Pg = m.predict_proba(feat_matrix(te)); Pp = pool_class_probs(tr, te)
    base = np.bincount(tr.oc.values.astype(int), minlength=4) / len(tr)
    zero = float((Pp[np.arange(len(y)), y] == 0).mean())
    Pf = np.where(Pp == 0, 1e-4, Pp); Pf = Pf / Pf.sum(1, keepdims=True)
    lg, lp, lb = nll(Pg, y), nll(Pf, y), nll(np.tile(base, (len(y), 1)), y)
    print('train 2016-2022: %d pass plays; held-out 2023-2025: %d' % (len(tr), len(te)))
    print('class rates train %s  test %s' % (np.round(base, 4).tolist(), np.round(np.bincount(y, minlength=4) / len(y), 4).tolist()))
    print('log loss on held-out (nats per pass play):  global rates %.5f   pool node %.5f (floor 1e-4)   GLM %.5f' % (lb.mean(), lp.mean(), lg.mean()))
    d = lp - lg; se = d.std() / np.sqrt(len(d))
    print('paired (pool - GLM) = %.5f +- %.5f (1 SE): GLM better by %.1f SE;  vs global rates %.5f' % (d.mean(), se, d.mean() / se, (lb - lg).mean()))
    print('plays whose actual class the pool node gave probability 0: %.3f%%; the GLM gives every class probability > 0 (min %.2e)' % (100 * zero, Pg.min()))
    for s in (2023, 2024, 2025):
        k = (te.season.values == s) if 'season' in te else None
        if k is not None: dd = (lp - lg)[k]; print('  %d: pool - GLM = %.5f +- %.5f' % (s, dd.mean(), dd.std() / np.sqrt(len(dd))))
    print('mean predicted class rate on held-out %s vs actual %s' % (np.round(Pg.mean(0), 4).tolist(), np.round(np.bincount(y, minlength=4) / len(y), 4).tolist()))
    q = np.quantile(Pg[:, 0], np.linspace(0, 1, 11)); idx = np.clip(np.searchsorted(q, Pg[:, 0], side='right') - 1, 0, 9)
    print('calibration of P(comp) by decile (predicted -> actual): ' + ', '.join('%.3f->%.3f' % (Pg[idx == b, 0].mean(), (y[idx == b] == 0).mean()) for b in range(10)))
    return ic, cf

def pack_body(pid, intercept, coef, train, date, n):
    return {'schema': 1, 'id': pid,
            'rules': {'sport': 'nfl', 'regime': 'passclass-glm', 'values': {'minClassPool': MIN_CLASS_POOL}},
            'params': {'classes': CLASSES, 'features': FEATURES, 'intercept': intercept, 'coef': coef, 'theta': THETA, 'lambda': 0.0, 'counts': {'plays': int(n)}},
            'provenance': {'source': 'nflverse play_by_play pass plays (penalty rows removed), tools/mathlab/phase1/passclass.py', 'fitDate': date,
                           'note': 'multinomial logit, L2 C=%g, train seasons %s; theta is the toy shape, NOT fitted; lambda 0 = neutral teams' % (C_REG, train)}}

def bake(date):
    out = {}
    for name, yrs in (('nfl-passclass-fit2016-2022', range(2016, 2023)), ('nfl-passclass-fit2023-2025', range(2023, 2026))):
        R = passes(yrs); ic, cf, m = fit(R)
        body = pack_body(name, ic, cf, '%d-%d' % (yrs[0], yrs[-1]), date, len(R))
        p = os.path.join(ROOT, 'data', 'packs', name + '.json')
        with open(p, 'w') as f: json.dump(body, f, separators=(',', ':'), sort_keys=True)
        print('wrote', p, os.path.getsize(p), 'bytes,', len(R), 'plays'); out[name] = (R, ic, cf, m)
    # vectors from the product pack's model: real states from the 2023-2025 passes + edge states; sklearn is the independent VALUE oracle, pmath-Python the BIT oracle
    R, ic, cf, m = out['nfl-passclass-fit2023-2025']
    rng = np.random.RandomState(20261117); pick = rng.choice(len(R), 400, replace=False)
    st = [[int(R.down[i]), float(R.ydstogo[i]), float(R.yardline_100[i]), float(R.sd[i]), int(R.qtr[i]), float(R.hs[i])] for i in pick]
    st += [[1, 10, 75, 0, 1, 1800], [4, 1, 1, -3, 4, 5], [3, 30, 99, 21, 2, 300], [3, 40, 50, -30, 4, 301], [2, 0.5, 20, -21, 2, 40], [4, 15, 90, 22, 3, 1], [1, 10, 5, 0, 4, 300]]
    X = np.array([feat(*s) for s in st]); sk = m.predict_proba(np.array([feat(*s, plog=np.log) for s in st]))
    import struct
    vec = {'pack': 'nfl-passclass-fit2023-2025', 'states': st, 'features_bits': [[struct.pack('>d', v).hex() for v in x] for x in X],
           'probs_bits': [[struct.pack('>d', v).hex() for v in probs_pmath(ic, cf, list(x))] for x in X], 'sklearn': sk.tolist()}
    p = os.path.join(ROOT, 'colors', 'test', 'nfl', 'passclass-vectors.json')
    with open(p, 'w') as f: json.dump(vec, f, separators=(',', ':'))
    print('wrote', p, os.path.getsize(p), 'bytes,', len(st), 'states; worst |pmath - sklearn| = %.2e' % max(abs(np.array([probs_pmath(ic, cf, list(x)) for x in X]) - sk).ravel()))

if __name__ == '__main__':
    ap = argparse.ArgumentParser(); ap.add_argument('cmd', choices=['report', 'bake']); ap.add_argument('--date', default='2026-11-17'); a = ap.parse_args()
    report() if a.cmd == 'report' else bake(a.date)
