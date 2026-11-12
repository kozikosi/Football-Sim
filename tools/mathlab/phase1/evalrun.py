import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np, pandas as pd
from pack import *; from sim import *
M=['points','drives','plays','off_plays','pass_att','rush_att','completions','yards','sacks','giveaways','top_dt']
def mk(kick_years,clock='dt_f',tr=None,trans='empirical'):
    rec=build_records(tr); k=build_kicks(tr); k=k[k.season.isin(kick_years)]
    xp_rows=tr[tr.kept&(tr.play_type=='extra_point')]; two=tr[tr.kept&(tr.two_point_attempt==1)]
    xp=dict(p_go2=len(two)/(len(two)+len(xp_rows)),p_make2=(two.two_point_conv_result=='success').mean(),p_make1=(xp_rows.extra_point_result=='good').mean())
    return Pack(rec,k,xp,clock=clock,trans=trans)
def sim_df(P,n,seed=1): return pd.DataFrame(run(P,n,seed),columns=COLS)
