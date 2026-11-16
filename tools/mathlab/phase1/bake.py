# Phase 1 pack baker (1c): turns the stratified pools of REAL penalty-free plays (pack.py) into a JSON-plain pack the TypeScript engine loads.
# usage: sh fetch.sh && python3 -I bake.py --train 2016-2022 --kick 2018-2022 --id nfl-pools-fit2016-2022 --date 2026-11-15 --out ../../../data/packs/nfl-pools-fit2016-2022.json
# The pools are stored as (cell, outcome-tuple, count) rows, not as 258k raw plays: sampling a cell uniformly over plays is the same distribution as
# sampling a unique tuple by count, so the baked pack is EXACTLY the Python pools (checked by test/nfl/pools-pack.test.ts against the pack's own counts).
# Everything the TS loader needs to cut a state into a cell (the bin edges) is pack DATA here, so Python and TS cannot disagree on a threshold.
import sys, os, json, argparse, datetime
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np, pandas as pd
from pack import prep, build_records, build_kicks
import sim as S

def tmb_v(qtr, hs):
    t = np.where(hs <= 40, 0, np.where(hs <= 120, 1, np.where(hs <= 300, 2, np.where(hs <= 600, 3, np.where(hs <= 900, 4, 5)))))
    return np.where((qtr == 1) | (qtr == 3), 6, t)
def bis(edges, x): return np.searchsorted(np.array(edges, dtype=float), x, side='right')

def call_levels(R):
    down = R.down.values.astype(int); ytg = R.ydstogo.values; ydl = R.yardline_100.values; sd = R.sd.values; q = R.qtr.values.astype(int); hs = R.hs.values
    t = tmb_v(q, hs); h = (q >= 3).astype(int); late = t <= 2
    d = bis(S.DIST, ytg); y = bis(S.YDL, ydl); yc = bis(S.YDLC, ydl); dc = bis(S.DISTC, ytg); s9 = bis(S.SD, sd); s3 = bis(S.SD3, sd)
    t4 = t <= 4
    return [
        np.stack([down, d, y, s9, t, h], 1),
        np.stack([down, d, y, np.where(t4, s3, 9), np.where(t4, np.minimum(t, 4), 6), np.where(t4, h, 0)], 1),
        np.stack([down, d, yc, np.where(late, s3, 9), np.where(late, 3, 6), np.where(late, h, 0)], 1),
        np.stack([down, dc, yc], 1),
        np.stack([down, yc], 1),
    ]

def rows_of(keys, call):
    """group (key columns) -> counts per call (6 values); returns key matrix and flat counts"""
    df = pd.DataFrame(keys); kc = list(df.columns); df['call'] = call
    g = df.groupby(kc + ['call']).size().unstack('call', fill_value=0).reindex(columns=range(6), fill_value=0)
    return g.index.to_frame(index=False).values.astype(int).tolist(), g.values.astype(int).tolist()

def clock_rows(keycols, dt):
    df = pd.DataFrame(keycols); kc = list(df.columns); df['dt'] = np.rint(dt).astype(int)
    g = df.groupby(kc + ['dt']).size()
    return g.index.to_frame(index=False).values.astype(int).tolist(), g.values.astype(int).tolist()

def bake(train, kick_years, pack_id, date):
    tr = prep(train)
    R = build_records(tr)
    n = len(R)
    call = R.call.values.astype(int); oc = R.oc.values.astype(int)
    down = R.down.values.astype(int); ytg = R.ydstogo.values; ydl = R.yardline_100.values
    sd = R.sd.values; q = R.qtr.values.astype(int); hs = R.hs.values
    nz = lambda a: np.where(pd.isna(a), -999.0, a)
    tup = pd.DataFrame({
        'oc': oc, 'yards': R.yards_gained.fillna(0).values, 'td': R.td_off.values, 'deftd': R.def_td.values, 'fum': R.fumlost.values,
        'safety': (R.safety == 1).astype(int).values, 'fg': R.fg_res.values, 'nd': nz(R.nd_start.values), 'ndsame': R.nd_same.fillna(False).astype(int).values,
        'ndown': nz(R.n_down.values), 'delta': nz(R.delta.values), 'pa': R.pass_attempt.fillna(0).astype(int).values, 'ra': R.rush_attempt.fillna(0).astype(int).values,
        'comp': R.complete_pass.fillna(0).astype(int).values, 'sack': (R.sack == 1).astype(int).values}).astype(float)
    tcols = list(tup.columns)
    tid = tup.groupby(tcols, sort=True).ngroup().values
    first = pd.Series(np.arange(n)).groupby(tid).first().values
    U = tup.iloc[first].reset_index(drop=True)                 # unique tuples in tid order
    tuples = {c: [None if v == -999.0 else (int(v) if float(v).is_integer() else float(v)) for v in U[c].values] for c in tcols}
    # record pool level 0 rows: cell (call, down, distBin, ydlBin) x tuple id x count
    db = bis(S.DIST, ytg); yb = bis(S.YDL, ydl)
    cell = pd.DataFrame({'call': call, 'down': down, 'db': db, 'yb': yb, 'tid': tid})
    g = cell.groupby(['call', 'down', 'db', 'yb', 'tid']).size().reset_index(name='n')
    rec = {'call': g.call.tolist(), 'down': g.down.tolist(), 'db': g.db.tolist(), 'yb': g.yb.tolist(), 'tid': g.tid.tolist(), 'n': g.n.tolist()}
    # call pools, 5 levels
    callp = []
    for L, keys in enumerate(call_levels(R)):
        ks, cs = rows_of(keys, call); callp.append({'keys': ks, 'counts': cs})
    # clock pools (two clock variants): late = tmb<=2 keyed (oc,half,t,sd3)... ; non-late keyed (oc, yardBin)...
    t = tmb_v(q, hs); h = (q >= 3).astype(int); late = t <= 2
    s3 = bis(S.SD3, sd); yv = bis(S.YB, R.yards_gained.fillna(0).values)
    clk = {}
    for name in ('dt_f', 'dt_pf'):
        dtv = R[name].values; lv = []; nv = []
        sel = late
        lv.append(clock_rows({'oc': oc[sel], 'h': h[sel], 't': t[sel], 's3': s3[sel]}, dtv[sel]))
        lv.append(clock_rows({'oc': oc[sel], 'h': h[sel], 't': t[sel]}, dtv[sel]))
        lv.append(clock_rows({'oc': oc[sel], 't': t[sel]}, dtv[sel]))
        lv.append(clock_rows({'oc': oc[sel]}, dtv[sel]))
        sel = ~late
        nv.append(clock_rows({'oc': oc[sel], 'yb': yv[sel]}, dtv[sel]))
        nv.append(clock_rows({'oc': oc[sel]}, dtv[sel]))
        clk[name] = {'late': [{'keys': k, 'dt': None, 'n': c} for k, c in lv], 'nonlate': [{'keys': k, 'dt': None, 'n': c} for k, c in nv]}
    # fix: clock_rows returns keys WITH dt as the last column; split it out
    for name in clk:
        for part in ('late', 'nonlate'):
            for lvl in clk[name][part]:
                lvl['dt'] = [r[-1] for r in lvl['keys']]; lvl['keys'] = [r[:-1] for r in lvl['keys']]
    # kickoffs
    K = build_kicks(tr); K = K[K.season.isin(list(kick_years))]
    kd = pd.DataFrame({'nd': nz(K.nd_start.values), 'same': K.nd_same.astype(int).values, 'dtf': np.rint(K.dt_f.values).astype(int), 'dtpf': np.rint(K.dt_pf.values).astype(int)})
    kg = kd.groupby(['nd', 'same', 'dtf', 'dtpf']).size().reset_index(name='n')
    kick = {'nd': [None if v == -999.0 else float(v) for v in kg.nd.values], 'same': kg.same.tolist(), 'dtf': kg.dtf.tolist(), 'dtpf': kg.dtpf.tolist(), 'n': kg.n.tolist()}
    xp_rows = tr[tr.kept & (tr.play_type == 'extra_point')]; two = tr[tr.kept & (tr.two_point_attempt == 1)]
    xp = {'pGo2': len(two) / (len(two) + len(xp_rows)), 'pMake2': float((two.two_point_conv_result == 'success').mean()), 'pMake1': float((xp_rows.extra_point_result == 'good').mean())}
    return {
        'schema': 1, 'id': pack_id,
        'rules': {'sport': 'nfl', 'regime': 'pools-penalty-free', 'values': {'pointsTd': 6, 'pointsFg': 3, 'pointsSafety': 2, 'halfSecs': 1800, 'otSecs': 600, 'minPool': 25, 'minClock': 20, 'trans': 'empirical', 'clock': 'dt_f'}},
        'params': {
            'bins': {'dist': S.DIST, 'distC': S.DISTC, 'ydl': S.YDL, 'ydlC': S.YDLC, 'sd': S.SD, 'sd3': S.SD3, 'yb': S.YB},
            'tuples': tuples, 'rec': rec, 'call': callp, 'clock': clk, 'kick': kick, 'xp': xp,
            'counts': {'records': int(n), 'tuples': int(len(U)), 'recRows': int(len(g)), 'kickoffs': int(len(K))},
        },
        'provenance': {'source': 'nflverse play_by_play (penalty==1 and no_play rows deleted, as in MUSE nopenalty); stratified pools baked by tools/mathlab/phase1/bake.py', 'fitDate': date,
                       'note': 'train seasons %s, kickoffs %s; saturated MLE baseline, all lambda = 0 (Phase 1). Penalty-free clock: dt_f folds penalty time into kept plays, dt_pf removes it.' % (train, list(kick_years))},
    }

def span(s):
    a, b = s.split('-'); return list(range(int(a), int(b) + 1))
if __name__ == '__main__':
    ap = argparse.ArgumentParser(); ap.add_argument('--train', default='2016-2022'); ap.add_argument('--kick', default='2018-2022'); ap.add_argument('--id', default='nfl-pools-fit2016-2022'); ap.add_argument('--out', required=True); ap.add_argument('--date', default=datetime.date.today().isoformat())
    a = ap.parse_args()
    body = bake(span(a.train), span(a.kick), a.id, a.date)
    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
    with open(a.out, 'w') as f: json.dump(body, f, separators=(',', ':'), sort_keys=True)
    print('wrote', a.out, os.path.getsize(a.out), 'bytes;', body['params']['counts'])
