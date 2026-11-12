# Phase 1 baseline (all lambda = 0): fit on 2016-2022, test on held-out 2023-2025 REG, plus pace table and the penalty-off measurement.
# usage: sh fetch.sh && python3 -I run_all.py > ../results/phase1-baseline-run-2026-11-12.txt
import sys, os, copy; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from evalrun import *
N=12000; TRAIN=list(range(2016,2023)); Mx=M
tr=prep(TRAIN); P=mk(range(2018,2023),tr=tr)
base=sim_df(P,N,1)
print('PACK: nonparametric stratified pools of real penalty-free plays (nflverse), fit 2016-2022, kickoffs 2018-2022; sim N=%d neutral games, seed 1'%N)
print('pack records',len(P.call),'| call/record/clock pools; transitions=empirical; clock=folded (penalty time folded into kept plays)')
for y in (2023,2024,2025):
    T=real_team_games(prep([y])); T=T[T.st=='REG']; se=T[Mx].std()/np.sqrt(len(T))
    c=pd.DataFrame({'sim':base[Mx].mean(),'real':T[Mx].mean()}); c['pct']=(c.sim/c.real-1)*100; c['z']=(c.sim-c.real)/se; c['real_sd']=T[Mx].std(); c['sim_sd']=base[Mx].std()
    print(f'\n=== HELD-OUT {y} REG (n={len(T)} team-games) ==='); print(c.round(2).to_string())
print('\n=== IN-SAMPLE 2016-2022 REG ==='); T=real_team_games(tr); T=T[T.st=='REG']
c=pd.DataFrame({'sim':base[Mx].mean(),'real':T[Mx].mean()}); c['pct']=(c.sim/c.real-1)*100; c['real_sd']=T[Mx].std(); c['sim_sd']=base[Mx].std(); c['var_gap_pct']=(1-(c.sim_sd/c.real_sd)**2)*100; print(c.round(2).to_string())
print('\n=== PER-SEASON REAL PACE TABLE (REG, penalty-free kept plays) ===')
rows=[]
for y in range(2016,2026):
    d=prep([y]); Ty=real_team_games(d); Ty=Ty[Ty.st=='REG']
    x=d[d.kept&(d.season_type=='REG')&d.play_type.isin(['pass','run'])&(d.two_point_attempt!=1)]
    rows.append(dict(season=y,points=Ty.points.mean(),drives=Ty.drives.mean(),plays=Ty.plays.mean(),pass_rate=(x.play_type=='pass').mean(),sec_per_scrim_play=x.dt_f.mean(),sec_per_drive=Ty.top_dt.sum()/Ty.drives.sum()))
print(pd.DataFrame(rows).set_index('season').round(2).to_string())
print('\n=== CLOCK-ONLY REFIT ON THE HELD-OUT SEASON (is the drift pace?) ===')
for y in (2023,2024,2025):
    te=prep([y]); Ty=real_team_games(te); Ty=Ty[Ty.st=='REG']; Py=mk([y],tr=te); P2=copy.copy(P); P2.clk_pool=Py.clk_pool; P2.nl_pool=Py.nl_pool; P2.dt=Py.dt; d2=sim_df(P2,N,1)
    print(y,'drives sim %.2f real %.2f | plays sim %.2f real %.2f | points sim %.2f real %.2f'%(d2.drives.mean(),Ty.drives.mean(),d2.plays.mean(),Ty.plays.mean(),d2.points.mean(),Ty.points.mean()))
print('\n=== PENALTY-OFF MEASUREMENT (pack 2016-2022; compare rows against A) ===')
cols=['points','drives','plays','off_plays','yards','top_dt']; out={}
for name,tra,clk in [('A calibration: empirical trans, folded clock','empirical','dt_f'),('B computed trans, folded clock','computed','dt_f'),('C empirical trans, penalty time removed','empirical','dt_pf'),('D PRODUCT penalty-off: computed trans, penalty time removed','computed','dt_pf')]:
    out[name]=sim_df(mk(range(2018,2023),clock=clk,tr=tr,trans=tra),N,1)[cols].mean()
o=pd.DataFrame(out).T; print(o.round(2).to_string()); print('pct vs A:'); print(((o/o.iloc[0]-1)*100).round(1).to_string())
