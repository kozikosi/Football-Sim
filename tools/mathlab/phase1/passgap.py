# Per-offense passGap at TEAM-SEASON granularity (Architect, 20 Nov 2026). REPORT-ONLY: changes no pack, default or src/.
# Question: is there a REPEATABLE per-offense and per-defense pass-class tilt in real play-by-play, and if so what lambda does it imply
# for the sim's seam  P_k ~ p_k * exp(s * theta_k),  s = lambda * passGap  (drive.ts tilt, THETA from passclass.py)?
#
#   r  = theta[class] - E_state[theta]          residual tilt score of one dropback, state-adjusted by the GLM (passclass.fit on the pooled seasons)
#   O  = team-season mean r as offense          D = team-season mean r allowed as defense   (both centred per season)
# Study 1 repeatability: split-half by game parity (Spearman-Brown), year-to-year, and a permutation null. No repeatable signal -> lambda stays 0.
# Study 2 slope: per game and side, a LEAVE-THAT-GAME-OUT, empirically shrunk O_hat and D_hat; weighted regression of the game's mean r on them,
#   cluster-robust SE by offense team-season. A tilt of size s moves E[r] by s * Var_state(theta) (exponential-tilt derivative), so
#   lambda_hat = slope / mean Var_state(theta) when passGap is measured in r units. That is the ONLY identified lambda in this repo.
# Usage: python3 -I passgap.py [--years 2016-2025] [--out ../results/passgap-2026-11-20.md]      (needs fetch.sh data; deterministic, seed 20261120)
import sys, os, argparse
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE); sys.path.insert(0, os.path.join(HERE, '..'))
import numpy as np, pandas as pd
import passclass as P

THETA = np.array(P.THETA)
SEED = 20261120

def residuals(R):
    _ic, _cf, m = P.fit(R); Pm = m.predict_proba(P.feat_matrix(R))
    e = Pm @ THETA; var = Pm @ THETA ** 2 - e ** 2
    r = THETA[R.oc.values.astype(int)] - e
    return r, var

def team_table(d, key):
    g = d.groupby(['season', key]); return g.r.sum().rename('s'), g.r.count().rename('n')

def split_half(d, key):
    """odd/even game order within each team-season (by game_id sort). Returns per-team-season half means and counts."""
    games = d[['season', key, 'game_id']].drop_duplicates().sort_values(['season', key, 'game_id'])
    games['half'] = games.groupby(['season', key]).cumcount() % 2
    dd = d.merge(games, on=['season', key, 'game_id'])
    t = dd.groupby(['season', key, 'half']).r.agg(['sum', 'count']).unstack('half').dropna()
    m0 = t[('sum', 0)] / t[('count', 0)]; m1 = t[('sum', 1)] / t[('count', 1)]
    return m0, m1, t[('count', 0)] + t[('count', 1)]

def corr(a, b): return float(np.corrcoef(a, b)[0, 1])
def sb(r): return 2 * r / (1 + r) if r > -1 else float('nan')

def repeatability(d, key, label, rng):
    m0, m1, n = split_half(d, key)
    r = corr(m0, m1)
    # permutation null: shuffle r across plays within season, redo the split-half correlation
    nulls = []
    for _ in range(200):
        dd = d.copy(); dd['r'] = dd.groupby('season').r.transform(lambda x: rng.permutation(x.values))
        a, b, _n = split_half(dd, key); nulls.append(corr(a, b))
    # year to year (whole-season means)
    s, c = team_table(d, key); mu = (s / c).unstack('season')
    yy = [corr(mu[y].dropna().reindex(mu[y + 1].dropna().index).dropna(), mu[y + 1].reindex(mu[y].dropna().reindex(mu[y + 1].dropna().index).dropna().index)) for y in mu.columns[:-1] if y + 1 in mu.columns]
    return dict(label=label, n_ts=len(m0), split_half=r, sb=sb(r), null_mean=float(np.mean(nulls)), null_p95=float(np.percentile(nulls, 95)), yty=float(np.mean(yy)), tau2=float(np.cov(m0, m1)[0, 1]),
                spread=float(np.std((m0 + m1) / 2)))

def shrunk_leave_out(d, key, k_shrink):
    """for every (game, side) row: the team-season's sum and count over ALL OTHER games, shrunk toward 0 by k_shrink pseudo-plays."""
    s = d.groupby(['season', key]).r.agg(['sum', 'count']).rename(columns={'sum': 'S', 'count': 'N'})
    g = d.groupby(['game_id', 'season', key]).r.agg(['sum', 'count', 'size']).reset_index().rename(columns={'sum': 'gs', 'count': 'gn'})
    g = g.merge(s.reset_index(), on=['season', key]); g['hat'] = (g.S - g.gs) / (g.N - g.gn + k_shrink)
    return g

def cluster_ols(y, X, w, cl):
    W = np.sqrt(w); Xw = X * W[:, None]; yw = y * W
    XtXi = np.linalg.inv(Xw.T @ Xw); b = XtXi @ Xw.T @ yw; e = yw - Xw @ b
    meat = np.zeros((X.shape[1], X.shape[1]))
    for c in np.unique(cl):
        i = cl == c; u = Xw[i].T @ e[i]; meat += np.outer(u, u)
    G = len(np.unique(cl)); V = XtXi @ meat @ XtXi * G / (G - 1)
    return b, np.sqrt(np.diag(V))

def slope_study(d, o_rep, d_rep, mean_var):
    sig2 = float(d.r.var())
    # half means are over ~n/2 plays; tau2 is the between-team-season variance of the TRUE mean, so pseudo-plays = sigma2 / tau2
    kd = sig2 / max(d_rep['tau2'], 1e-9) if d_rep['tau2'] > 0 else 1e9
    ko = sig2 / max(o_rep['tau2'], 1e-9) if o_rep['tau2'] > 0 else 1e9
    go = shrunk_leave_out(d, 'posteam', ko).rename(columns={'hat': 'O', 'gs': 'y_s', 'gn': 'y_n'})[['game_id', 'season', 'posteam', 'O', 'y_s', 'y_n']]
    gd = shrunk_leave_out(d, 'defteam', kd).rename(columns={'hat': 'D'})[['game_id', 'season', 'defteam', 'D']]
    base = d[['game_id', 'season', 'posteam', 'defteam']].drop_duplicates()
    t = base.merge(go, on=['game_id', 'season', 'posteam']).merge(gd, on=['game_id', 'season', 'defteam'])
    # centre per season so league mean is 0
    for c in ('O', 'D'): t[c] = t[c] - t.groupby('season')[c].transform('mean')
    y = (t.y_s / t.y_n).values; w = t.y_n.values.astype(float); cl = (t.season.astype(str) + t.posteam).values
    y = y - np.average(y, weights=w)
    out = {}
    X = np.column_stack([np.ones(len(t)), t.O.values, t.D.values]); b, se = cluster_ols(y, X, w, cl)
    out['O'] = (b[1], se[1]); out['D'] = (b[2], se[2])
    gap = (t.O.values + t.D.values); X1 = np.column_stack([np.ones(len(t)), gap]); b1, se1 = cluster_ols(y, X1, w, cl)
    out['gap'] = (b1[1], se1[1]); out['n_rows'] = len(t); out['sd_gap'] = float(np.std(gap)); out['k'] = (ko, kd)
    out['lam'] = (b1[1] / mean_var, se1[1] / mean_var)
    return out

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--years', default='2016-2025'); ap.add_argument('--out', default=None)
    a = ap.parse_args(); y0, y1 = (int(x) for x in a.years.split('-'))
    R = P.passes(range(y0, y1 + 1)); R = R[R.season_type == 'REG'].reset_index(drop=True)
    r, var = residuals(R); R = R.assign(r=r); mean_var = float(var.mean())
    d = R[['game_id', 'season', 'posteam', 'defteam', 'r']]
    rng = np.random.default_rng(SEED)
    ro = repeatability(d, 'posteam', 'offense', rng); rd = repeatability(d, 'defteam', 'defense', rng)
    st = slope_study(d, ro, rd, mean_var)
    L = []
    L.append(f'# passGap at team-season granularity, REG {y0}-{y1} (Architect, 20 Nov 2026)\n')
    L.append(f'Code: `tools/mathlab/phase1/passgap.py` (report-only; deterministic, seed {SEED}). Data: nflverse pbp via fetch.sh. {len(d)} dropback plays, {ro["n_ts"]} team-seasons. Labels: VERIFIED = this run.\n')
    L.append(f'r = theta[class] - E_state[theta] (theta = {THETA.tolist()}, GLM-adjusted); mean Var_state(theta) = {mean_var:.4f}; per-play sd(r) = {float(d.r.std()):.3f}.\n')
    L.append('## 1. Repeatability (does a team-season keep its tilt?)\n')
    L.append('| side | split-half r | Spearman-Brown | null mean / p95 | year-to-year r | true spread (sd of half-mean avg) |\n|---|---|---|---|---|---|')
    for x in (ro, rd): L.append(f'| {x["label"]} | {x["split_half"]:.3f} | {x["sb"]:.3f} | {x["null_mean"]:.3f} / {x["null_p95"]:.3f} | {x["yty"]:.3f} | {x["spread"]:.4f} |')
    L.append('\n## 2. Slope: does the leave-one-game-out gap predict the game? (weighted, cluster-robust by offense team-season)\n')
    L.append(f'rows (game x side) = {st["n_rows"]}; shrinkage pseudo-plays offense {st["k"][0]:.0f}, defense {st["k"][1]:.0f}; sd of the combined gap = {st["sd_gap"]:.4f}.\n')
    L.append('| term | slope (r per r) | SE | z |\n|---|---|---|---|')
    for k, nm in (('O', 'offense O_hat'), ('D', 'defense D_hat'), ('gap', 'combined gap O_hat + D_hat')):
        b, se = st[k]; L.append(f'| {nm} | {b:.3f} | {se:.3f} | {b / se:.1f} |')
    lam, lse = st['lam']
    L.append(f'\nImplied lambda = slope(gap) / mean Var_state(theta) = **{lam:.2f} +- {lse:.2f} (SE)**, with passGap measured in r units (so s = lambda * gap; the typical |gap| is {st["sd_gap"]:.3f}, i.e. typical s = {lam * st["sd_gap"]:.3f}).')
    L.append('\nReading rule (set before looking): lambda moves off 0 only if (a) both sides show split-half r above the null p95 AND (b) the gap slope is more than 3 SE from 0 AND (c) the sign and size hold in both 2016-2022 and 2023-2025. This file is one era window; run both.')
    txt = '\n'.join(L); print(txt)
    if a.out: open(a.out, 'w').write(txt + '\n')

if __name__ == '__main__': main()
