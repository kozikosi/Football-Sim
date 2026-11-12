"""Verify DS's P-347 ANOVA variance-components decomposition on the P-344 file.

DS's filing (inbox/20261112-0420-ds-P-347-lambda-identification.md):
  λ̂² = ( Var(team-season means) − mean within-team game variance / n̄ ) / Var(g)
  Verified on team_game_summary_2016-2025.csv (5,522 team-games, 320 team-seasons,
  n̄ = 17.26, points season-demeaned):
    Var(team-season mean points) = 16.955
    mean within-team game variance = 87.148
    true between-team variance (signal) = 11.905 (SD 3.45)
    overstatement, team-season dispersion matching = ×1.193 (+19.3%)
    overstatement, game-level dispersion matching = ×2.71 (+171%) [headline]
    ... but the table in the same filing says ×2.82, and the commit message says
    +18.4% / ×2.82 vs the table's +19.3%. This re-run pins the numbers.
"""
import pandas as pd
import numpy as np

f = "/home/hatch/workspace/nflverse-phase1/out/team_game_summary_2016-2025.csv"
df = pd.read_csv(f)
print("columns:", [c for c in df.columns if "point" in c.lower() or c in ("season", "team", "game_id")])
print("rows:", len(df), " seasons:", sorted(df["season"].unique()))
print("team-seasons:", df.groupby(["season", "team"]).ngroups)
print("n̄ (games per team-season):", len(df) / df.groupby(["season", "team"]).ngroups)

# season-demean points (remove the scoring-era mean, per DS)
df["pts_dm"] = df["points"] - df.groupby("season")["points"].transform("mean")

g = df.groupby(["season", "team"])["pts_dm"]
team_means = g.mean()
within_var = g.var(ddof=1)  # within-team-season game variance (sample variance)
n_per = g.size()

var_team_means = team_means.var(ddof=1)
mean_within = within_var.mean()
nbar = n_per.mean()
signal = var_team_means - mean_within / nbar

print(f"\nVar(team-season mean points)      = {var_team_means:.3f}   (DS: 16.955)")
print(f"mean within-team game variance    = {mean_within:.3f}   (DS: 87.148)")
print(f"n̄                                 = {nbar:.2f}   (DS: 17.26)")
print(f"between-team variance (signal)    = {signal:.3f}   (DS: 11.905)")
print(f"signal SD                         = {np.sqrt(signal):.2f} pts   (DS: 3.45)")

# overstatement ratios: dispersion matching uses the RAW variance (signal + noise/n̄)
# as if it were the signal; the overstatement is raw/signal.
raw_team_season = var_team_means
print(f"\nteam-season dispersion overstatement = {raw_team_season/signal:.3f}× (+{(raw_team_season/signal-1)*100:.1f}%)  (DS: ×1.193 / +19.3%)")

# game-level: the raw game-level variance vs the signal.
# Game-level dispersion matching treats total game variance as the signal.
# Total game variance (season-demeaned) = between + within.
total_game_var = df["pts_dm"].var(ddof=1)
print(f"total game variance (demeaned)    = {total_game_var:.3f}")
print(f"game-level overstatement (total/signal) = {total_game_var/signal:.3f}× (+{(total_game_var/signal-1)*100:.1f}%)")
# Alternative game-level reading: raw team-mean variance vs signal is the team-season
# one; the game-level one DS cites may be (within + signal)/signal.
print(f"game-level (within+signal)/signal = {(mean_within+signal)/signal:.3f}×")
# Per-season team-season overstatement
print("\nper-season team-season overstatement:")
for s, sub in df.groupby("season"):
    gm = sub.groupby("team")["pts_dm"]
    tm = gm.mean(); wv = gm.var(ddof=1); nb = gm.size().mean()
    vt = tm.var(ddof=1); sig = vt - wv.mean() / nb
    print(f"  {s}: Var(means) {vt:.2f}  within {wv.mean():.2f}  n̄ {nb:.1f}  signal {sig:.2f}  overstatement {vt/sig:.3f}×")
