#!/usr/bin/env python3
"""D.8 re-run — playoff home-field advantage WITH a strength control.

Original finding under correction (Z.ai fwtest-9 results/d8-cuts/cut1-hfa.json):
  POST mean home margin 5.5656 (n=122) vs REG 1.7772 (n=2639) — RAW margin by season_type.
ERNIE's correction (v2 section 6): playoff home teams are the higher seeds, so venue and team
quality are mixed. This re-run controls team strength with SEASON-TO-DATE point differential
(pre-game, both teams) and reports what survives.

Data: P-344 nflverse baseline, team_game_summary_2016-2025.csv
      (council/muse c7540b04, _agents/muse/deliveries/p-344-nflverse-phase1-2026-11-11/).
Method:
  1. Raw cut (reproduction check vs the filed JSON).
  2. OLS: home_margin ~ 1 + is_playoff + strength_diff(home pre-game SD - away pre-game SD),
     HC1-robust SEs; beta_playoff = the strength-controlled playoff HFA edge (points).
  3. LPM: home_win ~ 1 + is_playoff + strength_diff (robustness for the win-rate claim).
  4. Stratified check: bins of |strength_diff|; playoff vs REG mean home margin inside bins.
  5. Bootstrap 10k CIs for the controlled playoff edge.
Cutoffs: strength = season-to-date (points_for - points_against) BEFORE the game, same season.
Week 1 has no history (0-0 for both sides, diff = 0); a variant drops weeks 1-2.
"""
import numpy as np
import pandas as pd

CSV = "/home/z/my-project/work/p344/tg.csv"
OUT = "/home/z/my-project/work/d8-strength-control-output.txt"

rng = np.random.default_rng(20261114)

df = pd.read_csv(CSV)
df["points"] = df["points"].astype(float)

# ---- pair the two team-rows of each game -------------------------------------
g = df.pivot_table(index=["season", "game_id"], columns=None, aggfunc="first")
# safer explicit join:
h = df[df.team == df.home_team][["season", "game_id", "season_type", "week", "team", "opp", "points"]].rename(
    columns={"team": "home", "opp": "away", "points": "pts_h"})
a = df[df.team != df.home_team][["season", "game_id", "team", "points"]].rename(
    columns={"team": "away", "points": "pts_a"})
games = h.merge(a, on=["season", "game_id"], suffixes=("", "_a2"))
assert (games["away"] == games["away_a2"]).all(), "join mismatch"
games = games.drop(columns=["away_a2"])
games["margin"] = games["pts_h"] - games["pts_a"]
games["is_playoff"] = (games["season_type"] == "POST").astype(int)

# ---- season-to-date point differential BEFORE each game -----------------------
# every team-game row gives points for; points against = opponent's points in the same game
# build a team-week points-for/against table: each game's two rows joined on game_id
tg = df[["season", "game_id", "week", "team", "points"]].rename(columns={"team": "t1", "points": "p1"})
to = df[["game_id", "team", "points"]].rename(columns={"team": "t2", "points": "p2"})
tgj = tg.merge(to, on="game_id")
tgj = tgj[tgj["t1"] != tgj["t2"]]
assert (tgj["t1"] != tgj["t2"]).all()
tgj["against"] = tgj["p2"]
cum = (tgj.sort_values(["season", "week"])
          .rename(columns={"t1": "team", "p1": "pf", "p2": "pa2"})
          .assign(against=lambda d: d["pa2"])
          .groupby(["season", "team", "week"], as_index=False)[["pf", "against"]].sum())
cum["cum_pf"] = cum.groupby(["season", "team"])["pf"].cumsum()
cum["cum_pa"] = cum.groupby(["season", "team"])["against"].cumsum()
cum["cum_diff"] = cum["cum_pf"] - cum["cum_pa"]
# pre-game value: shift by one week inside each season-team
cum["pre_diff"] = cum.groupby(["season", "team"])["cum_diff"].shift(1).fillna(0.0)
cum["games_played"] = cum.groupby(["season", "team"]).cumcount()  # 0 for week 1

sd = cum.rename(columns={"team": "home", "pre_diff": "sd_h", "games_played": "gp_h"})[
    ["season", "week", "home", "sd_h", "gp_h"]]
sd_a = cum.rename(columns={"team": "away", "pre_diff": "sd_a", "games_played": "gp_a"})[
    ["season", "week", "away", "sd_a", "gp_a"]]
games = games.merge(sd, on=["season", "week", "home"]).merge(sd_a, on=["season", "week", "away"])
games["strength_diff"] = games["sd_h"] - games["sd_a"]
games["margin"] = games["margin"].astype(float)

lines = []
def P(*a):
    s = " ".join(str(x) for x in a)
    lines.append(s); print(s)

P("== D.8 re-run: playoff HFA with a season-to-date strength control ==")
P("data: P-344 team_game_summary_2016-2025.csv (council/muse c7540b04) ·", len(games), "games",
  f"({(games.is_playoff==0).sum()} REG, {(games.is_playoff==1).sum()} POST)")
P("strength control: pre-game season-to-date point differential (both teams), same season")
P("")

# ---- 1. raw cut (reproduction) ------------------------------------------------
raw = games.groupby("is_playoff")["margin"].agg(["mean", "count", "std"])
P("1 · RAW cut (reproduction of the filed cut1-hfa.json)")
for k, lab in [(0, "REG"), (1, "POST")]:
    r = raw.loc[k]
    P(f"   {lab}: mean home margin {r['mean']:.4f}  (n={int(r['count'])}, sd={r['std']:.3f})")
P(f"   playoff minus reg (raw): {raw.loc[1,'mean']-raw.loc[0,'mean']:.4f}")
P("")

# ---- 2. OLS with strength control ---------------------------------------------
def ols_hc1(y, X):
    XtX = X.T @ X
    beta = np.linalg.solve(XtX, X.T @ y)
    resid = y - X @ beta
    n, k = X.shape
    meat = (X * resid[:, None]).T @ (X * resid[:, None])
    bread = np.linalg.inv(XtX)
    V = bread @ meat @ bread * (n / (n - k))
    return beta, np.sqrt(np.diag(V))

def boot_ci(y, X, stat_fn, B=10_000):
    n = len(y)
    stats = np.empty(B)
    idx = np.arange(n)
    for b in range(B):
        s = rng.choice(idx, size=n, replace=True)
        stats[b] = stat_fn(y[s], X[s])
    return np.percentile(stats, [2.5, 97.5])

y = games["margin"].to_numpy()
for label, sub in [("all weeks", games), ("drop weeks 1-2", games[games.week > 2])]:
    X = np.column_stack([
        np.ones(len(sub)),
        sub["is_playoff"].to_numpy(float),
        sub["strength_diff"].to_numpy(float),
    ])
    yy = sub["margin"].to_numpy()
    beta, se = ols_hc1(yy, X)
    t = beta[1] / se[1]
    bfun = lambda yv, Xv: ols_hc1(yv, Xv)[0][1]
    lo, hi = boot_ci(yy, X, bfun)
    P(f"2 · OLS margin ~ playoff + strength_diff [{label}]")
    P(f"   intercept {beta[0]:.4f} (se {se[0]:.3f})   strength_diff coef {beta[2]:.4f} (se {se[2]:.3f})")
    P(f"   PLAYOFF EDGE (strength-controlled): {beta[1]:+.4f} pts  (HC1 se {se[1]:.3f}, t={t:.2f}, boot95 [{lo:+.3f}, {hi:+.3f}])")
    P("")

# ---- 3. LPM on home win --------------------------------------------------------
w = (games["margin"] > 0).astype(float).to_numpy()
for label, sub in [("all weeks", games), ("drop weeks 1-2", games[games.week > 2])]:
    X = np.column_stack([
        np.ones(len(sub)),
        sub["is_playoff"].to_numpy(float),
        sub["strength_diff"].to_numpy(float) / 100.0,   # scale: per 100 pts of SD
    ])
    yy = w[games.index.get_indexer(sub.index)]
    beta, se = ols_hc1(yy, X)
    P(f"3 · LPM home_win ~ playoff + strength_diff/100 [{label}]")
    P(f"   playoff edge (win prob): {beta[1]:+.4f}  (se {se[1]:.4f})   strength coef {beta[2]:+.4f} per 100 pts")
P("")

# ---- 4. stratified robustness --------------------------------------------------
P("4 · Stratified: mean home margin by |strength_diff| bin (REG vs POST)")
bins = [-np.inf, -50, -20, -7, 7, 20, 50, np.inf]
games["sdbin"] = pd.cut(games["strength_diff"], bins)
tab = games.pivot_table(index="sdbin", columns="is_playoff", values="margin", aggfunc=["mean", "count"])
for b in tab.index:
    m0, m1 = tab.loc[b, ("mean", 0)], tab.loc[b, ("mean", 1)]
    c0, c1 = tab.loc[b, ("count", 0)], tab.loc[b, ("count", 1)]
    d = (m1 - m0) if (pd.notna(m0) and pd.notna(m1)) else float("nan")
    P(f"   {str(b):22s} REG {m0 if pd.notna(m0) else float('nan'):+7.3f} (n={int(c0) if pd.notna(c0) else 0:4d})"
      f"   POST {m1 if pd.notna(m1) else float('nan'):+7.3f} (n={int(c1) if pd.notna(c1) else 0:3d})   diff {d:+.3f}")
P("")
P("5 · VERDICT RULE: the controlled playoff edge survives if its 95% CI excludes 0 in both")
P("   week variants; otherwise it files RECORDED-DEAD (a raw-cut mixing artifact).")

with open(OUT, "w") as f:
    f.write("\n".join(lines) + "\n")
print("\nwrote", OUT)
