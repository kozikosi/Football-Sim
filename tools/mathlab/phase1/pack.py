# Phase 1 baseline pack builder: penalty-free play table -> stratified pools (all lambda = 0).
import numpy as np, pandas as pd
from load import load
OC={'comp':0,'inc':1,'sack':2,'int':3,'run':4,'punt':5,'fg':6,'kneel':7,'spike':8}
CALL={'pass':0,'run':1,'punt':2,'fg':3,'kneel':4,'spike':5}
def prep(years):
    d=load(years).sort_values(['season','game_id','play_id']).reset_index(drop=True)
    d['pen']=(d.penalty==1)|(d.play_type=='no_play')
    d['kept']=d.play_type.notna()&~d.pen
    g=d.groupby('game_id',sort=False)
    # own clock: time from this row to the next row of any kind (penalty time excluded for kept rows)
    nxt_all=g['game_seconds_remaining'].shift(-1)
    d['dt_own']=(d.game_seconds_remaining-nxt_all).fillna(d.game_seconds_remaining).clip(lower=0)
    # folded clock: time to the next KEPT row (penalty time folded into neighbours) -> reproduces the real penalty-free table
    k=d.game_seconds_remaining.where(d.kept)
    nxt_k=k.groupby(d.game_id,sort=False).shift(-1)
    nxt_k=nxt_k.groupby(d.game_id,sort=False).bfill()
    d['dt_f']=(d.game_seconds_remaining-nxt_k).fillna(d.game_seconds_remaining).clip(lower=0)
    # penalty-removed clock: the folded clock minus the own duration of every accepted-penalty row that was folded into a kept play.
    # Timeouts, quarter breaks and the 2-minute warning keep their time. (An earlier 'next non-penalty row' version lost that time.)
    idx=pd.Series(np.arange(len(d)),index=d.index)
    prev_kept=idx.where(d.kept).groupby(d.game_id,sort=False).ffill()
    pen_t=d.dt_own.where(d.penalty==1,0.0)
    owed=pen_t.groupby(prev_kept).sum()
    d['dt_pf']=(d.dt_f-pd.Series(d.index.map(lambda i: owed.get(i,0.0)),index=d.index)).clip(lower=0)
    return d
def real_team_games(d):
    x=d[d.kept&d.posteam.notna()].copy()
    sc=x.groupby('game_id').agg(hs=('total_home_score','max'),as_=('total_away_score','max'),home=('home_team','first'),away=('away_team','first'),season=('season','first'),st=('season_type','first'))
    off=x[x.play_type.isin(['pass','run'])]
    scr=x[x.play_type.isin(['pass','run','qb_kneel','qb_spike','punt','field_goal'])]
    out=pd.DataFrame({
     'plays':x.groupby(['game_id','posteam']).size(),
     'off_plays':off.groupby(['game_id','posteam']).size(),
     'pass_att':x.groupby(['game_id','posteam']).pass_attempt.sum(),
     'rush_att':x.groupby(['game_id','posteam']).rush_attempt.sum(),
     'completions':x.groupby(['game_id','posteam']).complete_pass.sum(),
     'yards':off.groupby(['game_id','posteam']).yards_gained.sum(),
     'sacks':x.groupby(['game_id','posteam']).sack.sum(),
     'giveaways':(x.interception.fillna(0)+x.fumble_lost.fillna(0)).groupby([x.game_id,x.posteam]).sum(),
     'drives':scr.groupby(['game_id','posteam'])['drive'].nunique(),
     'top_dt':scr.groupby(['game_id','posteam']).dt_f.sum(),
    }).fillna(0).reset_index().rename(columns={'posteam':'team'})
    dd=x.drop_duplicates(['game_id','drive','posteam'])
    def mmss(s):
        try: a,b=str(s).split(':'); return int(a)*60+int(b)
        except: return 0
    dd=dd.assign(t=dd.drive_time_of_possession.map(mmss)).groupby(['game_id','posteam']).t.sum().rename('top_sec').reset_index().rename(columns={'posteam':'team'})
    out=out.merge(dd,on=['game_id','team'],how='left')
    out=out.merge(sc.reset_index(),on='game_id')
    out['points']=np.where(out.team==out.home,out.hs,out.as_)
    out['opp_points']=np.where(out.team==out.home,out.as_,out.hs)
    return out.drop(columns=['hs','as_','home','away'])
def build_records(d):
    """one record per penalty-free offensive/special-teams decision, with the outcome and both clocks"""
    d=d.copy()
    # drive first scrimmage yardline -> next-drive start (for turnovers, punts, missed FG)
    scrim=d[d.kept&d.play_type.isin(['pass','run','qb_kneel','qb_spike','punt','field_goal'])&(d.two_point_attempt!=1)]
    first=scrim.drop_duplicates(['game_id','drive']).sort_values(['game_id','drive'])[['game_id','drive','posteam','yardline_100']]
    first['nd_start']=first.groupby('game_id').yardline_100.shift(-1)
    first['nd_team']=first.groupby('game_id').posteam.shift(-1)
    first['nd_same']=(first.nd_team==first.posteam)
    nd=first[['game_id','drive','nd_start','nd_same']]
    scrim=scrim.sort_values(['game_id','play_id']).copy()
    gg=scrim.groupby(['game_id','drive'],sort=False)
    scrim['n_down']=gg.down.shift(-1); scrim['n_ydl']=gg.yardline_100.shift(-1)
    r=scrim.merge(nd,on=['game_id','drive'],how='left')
    r['delta']=r.yardline_100-r.n_ydl
    pt=r.play_type
    call=np.select([pt=='pass',pt=='run',pt=='punt',pt=='field_goal',pt=='qb_kneel',pt=='qb_spike'],[0,1,2,3,4,5])
    r['call']=call
    sack=(r.sack==1); inte=(r.interception==1); comp=(r.complete_pass==1)
    oc=np.select([call==0,call==1,call==2,call==3,call==4,call==5],[0,4,5,6,7,8])
    oc=np.where((call==0)&sack,2,np.where((call==0)&inte,3,np.where((call==0)&~comp,1,oc)))
    r['oc']=oc
    r['td_off']=((r.touchdown==1)&(r.td_team==r.posteam)).astype(int)
    r['def_td']=((r.touchdown==1)&(r.td_team!=r.posteam)&r.td_team.notna()).astype(int)
    r['fumlost']=(r.fumble_lost==1).astype(int)
    r['fg_res']=np.select([r.field_goal_result=='made',r.field_goal_result=='missed',r.field_goal_result=='blocked'],[1,0,2],-1)
    r['sd']=r.score_differential.fillna(0)
    r['hs']=r.half_seconds_remaining
    r['half2']=(r.qtr>=3).astype(int)
    r=r[(r.down.notna())&(r.qtr<=4)&r.yardline_100.notna()&r.ydstogo.notna()]
    return r.reset_index(drop=True)
def build_kicks(d):
    k=d[d.kept&(d.play_type=='kickoff')&(d.qtr<=4)].copy()
    scrim=d[d.kept&d.play_type.isin(['pass','run','qb_kneel','qb_spike','punt','field_goal'])&(d.two_point_attempt!=1)]
    # first scrimmage snap after each kickoff row, same game
    ks=k[['game_id','play_id','posteam','season']].copy(); ks['t']='k'
    sc=scrim[['game_id','play_id','posteam','yardline_100']].copy(); sc['t']='s'
    m=pd.concat([ks,sc]).sort_values(['game_id','play_id'])
    m['nxt_y']=m.groupby('game_id').yardline_100.shift(-1); m['nxt_p']=m.groupby('game_id').posteam.shift(-1); m['nxt_t']=m.groupby('game_id').t.shift(-1)
    m=m[(m.t=='k')&(m.nxt_t=='s')]
    m['same']=(m.nxt_p==m.posteam)
    kk=k.merge(m[['game_id','play_id','nxt_y','same']],on=['game_id','play_id'],how='inner')
    kk['nd_start']=kk.nxt_y; kk['nd_same']=kk['same']
    return kk[['season','season_type','dt_f','dt_pf','dt_own','nd_start','nd_same','touchdown','td_team','posteam']].reset_index(drop=True)
