# Phase 1 baseline simulator (all lambda = 0): neutral teams draw every node from stratified pools of REAL penalty-free plays.
# Nodes: call | state ; play record (yards, turnover flags, next-drive spot) | call, field, distance ; clock | outcome, half, score.
import numpy as np, random, bisect
from collections import defaultdict
DIST=[2,3,5,8,11,16]; DISTC=[3,8]; YDL=[2,3,4,5,6,8,11,16,21,26,36,46,56,66,76,86,91,96]; YDLC=[6,21,51,81]
SD=[-16,-8,-4,-1,0,1,4,9,17]; SD3=[-8,0,9]
def tmb(qtr,hs):
    if qtr in (1,3): return 6
    return 0 if hs<=40 else 1 if hs<=120 else 2 if hs<=300 else 3 if hs<=600 else 4 if hs<=900 else 5
def keys_call(down,ytg,ydl,sd,qtr,hs):
    t=tmb(qtr,hs); h=1 if qtr>=3 else 0; late=t<=2
    return [(down,bisect.bisect_right(DIST,ytg),bisect.bisect_right(YDL,ydl),bisect.bisect_right(SD,sd),t,h),
            (down,bisect.bisect_right(DIST,ytg),bisect.bisect_right(YDL,ydl),bisect.bisect_right(SD3,sd) if t<=4 else 9,min(t,4) if t<=4 else 6,h if t<=4 else 0),
            (down,bisect.bisect_right(DIST,ytg),bisect.bisect_right(YDLC,ydl),bisect.bisect_right(SD3,sd) if late else 9,3 if late else 6,h if late else 0),
            (down,bisect.bisect_right(DISTC,ytg),bisect.bisect_right(YDLC,ydl)),
            (down,bisect.bisect_right(YDLC,ydl))]
def keys_rec(call,down,ytg,ydl):
    return [(call,down,bisect.bisect_right(DIST,ytg),bisect.bisect_right(YDL,ydl)),
            (call,min(down,3),bisect.bisect_right(DISTC,ytg),bisect.bisect_right(YDL,ydl)),
            (call,bisect.bisect_right(YDL,ydl)),(call,)]
YB=[0,1,4,7,11,21]
def keys_nl(oc,y): return [(oc,bisect.bisect_right(YB,y)),(oc,)]
def keys_clock(oc,qtr,hs,sd):
    h=1 if qtr>=3 else 0; t=tmb(qtr,hs)
    return [(oc,h,t,bisect.bisect_right(SD3,sd)),(oc,h,t),(oc,t),(oc,)]
class Pack:
    def __init__(s,rec,kicks,xp,minn=25,minn_clock=20,clock='dt_f',trans='empirical'):
        s.clock=clock; s.minn=minn; s.trans=trans
        s.n_down=rec.n_down.values; s.delta=rec.delta.values
        R=rec
        s.call=R.call.values.astype(np.int8); s.oc=R.oc.values.astype(np.int8)
        s.yards=R.yards_gained.fillna(0).values; s.td=R.td_off.values; s.deftd=R.def_td.values
        s.fum=R.fumlost.values; s.safety=(R.safety==1).values; s.fg=R.fg_res.values
        s.nd=R.nd_start.values; s.ndsame=R.nd_same.fillna(False).values.astype(bool)
        s.dt=R[clock].values; s.passatt=R.pass_attempt.fillna(0).values; s.rushatt=R.rush_attempt.fillna(0).values
        s.comp=R.complete_pass.fillna(0).values; s.sackf=(R.sack==1).values
        n=len(R); down=R.down.values.astype(int); ytg=R.ydstogo.values; ydl=R.yardline_100.values; sd=R.sd.values; q=R.qtr.values.astype(int); hs=R.hs.values
        s.call_pool=[defaultdict(list) for _ in range(5)]; s.rec_pool=[defaultdict(list) for _ in range(4)]
        s.clk_pool=[defaultdict(list) for _ in range(4)]; s.nl_pool=[defaultdict(list) for _ in range(2)]
        for i in range(n):
            for L,k in enumerate(keys_call(down[i],ytg[i],ydl[i],sd[i],q[i],hs[i])): s.call_pool[L][k].append(i)
            for L,k in enumerate(keys_rec(s.call[i],down[i],ytg[i],ydl[i])): s.rec_pool[L][k].append(i)
            if tmb(q[i],hs[i])<=2:
                for L,k in enumerate(keys_clock(s.oc[i],q[i],hs[i],sd[i])): s.clk_pool[L][k].append(i)
            else:
                for L,k in enumerate(keys_nl(s.oc[i],s.yards[i])): s.nl_pool[L][k].append(i)
        s.call_pool=[{k:np.array(v) for k,v in P.items()} for P in s.call_pool]
        s.rec_pool=[{k:np.array(v) for k,v in P.items()} for P in s.rec_pool]
        s.clk_pool=[{k:np.array(v) for k,v in P.items()} for P in s.clk_pool]
        s.nl_pool=[{k:np.array(v) for k,v in P.items()} for P in s.nl_pool]
        K=kicks; s.k_start=K.nd_start.values; s.k_same=K.nd_same.values.astype(bool); s.k_dt=K[clock].values
        s.xp=xp   # dict: p_go2, p_make2, p_make1
    def pick(s,pools,keys,minn):
        for P,k in zip(pools,keys):
            a=P.get(k)
            if a is not None and len(a)>=minn: return a
        return pools[-1][keys[-1]] if keys[-1] in pools[-1] else next(iter(pools[-1].values()))
def simulate(pack,rng,ot=True):
    """one neutral game -> dict(team stats [A,B], pts)"""
    R=rng.random
    st=[dict(pts=0,drives=0,plays=0,off=0,pa=0,ra=0,comp=0,yds=0,sacks=0,give=0,top=0.0) for _ in (0,1)]
    P=pack
    def kick(kicker,hs_rem):
        st[1-kicker]['plays']+=1          # nflverse: a kickoff row's posteam is the RECEIVING team
        i=int(R()*len(P.k_start)); dt=P.k_dt[i]
        y=P.k_start[i]; recv=(1-kicker) if P.k_same[i] else kicker      # k_same = next snap is by the receiving team (False = onside recovered)
        if y!=y: y=75.0
        return recv,y,dt
    def after_td(team):
        # 2-pt or XP
        x=P.xp
        if R()<x['p_go2']:
            st[team]['plays']+=1; st[team]['off']+=1
            if R()<x['p_make2']: st[team]['pts']+=2
        else:
            st[team]['plays']+=1
            if R()<x['p_make1']: st[team]['pts']+=1
    first_kicker=0 if R()<.5 else 1
    kicker=first_kicker
    for half in (1,2):
        hs=1800.0; qtr=1 if half==1 else 3
        poss,ydl,dt0=kick(kicker,hs); hs-=dt0*0  # kickoff clock is inside the first snap's pool via dt of kickoff row; applied below
        hs-=dt0
        kicker=poss  # second-half kickoff by the receiving team of the first
        down,ytg=1,10.0; new_drive=True
        while hs>0:
            qtr_now=(1 if hs>900 else 2) if half==1 else (3 if hs>900 else 4)
            if new_drive:
                st[poss]['drives']+=1; new_drive=False; down,ytg=1,min(10.0,ydl)
            sd=st[poss]['pts']-st[1-poss]['pts']
            keys=keys_call(down,ytg,ydl,sd,qtr_now,hs)
            pool=P.pick(P.call_pool,keys,P.minn)
            call=int(P.call[pool[int(R()*len(pool))]])
            rk=keys_rec(call,down,ytg,ydl)
            rp=P.pick(P.rec_pool,rk,P.minn)
            j=int(rp[int(R()*len(rp))])
            oc=int(P.oc[j]); y=float(P.yards[j])
            # clock
            if tmb(qtr_now,hs)<=2:
                cp=P.pick(P.clk_pool,keys_clock(oc,qtr_now,hs,sd),20); dt=float(P.dt[cp[int(R()*len(cp))]])
            else:
                cp=P.pick(P.nl_pool,keys_nl(oc,y),20); dt=float(P.dt[cp[int(R()*len(cp))]])
            dt=min(dt,hs); hs-=dt
            if DIAG is not None:
                a=DIAG.setdefault(oc,[0,0.0,0.0]); a[0]+=1; a[1]+=dt; a[2]+=P.dt[j]
            S=st[poss]; S['plays']+=1; S['top']+=dt
            if call in (0,1): S['off']+=1; S['yds']+=y; S['pa']+=P.passatt[j]; S['ra']+=P.rushatt[j]; S['comp']+=P.comp[j]; S['sacks']+=1 if P.sackf[j] else 0
            ended=None; ndy=None; nds=False
            if call==2:   # punt
                ended='punt'; ndy=P.nd[j]; nds=P.ndsame[j]
                if P.deftd[j]: ended='deftd'
            elif call==3: # field goal
                f=P.fg[j]
                if f==1: S['pts']+=3; ended='score'
                else: ended='fgmiss'; ndy=P.nd[j]; nds=P.ndsame[j]
            elif call in (4,5):
                ended=None; y=-1.0 if call==4 else 0.0
                S['yds']+=0
                if call==4: ydl=min(ydl+1,99)
                down=down+1 if call==5 or call==4 else down
                if call==5: down=down  # spike: down consumed
                if down>4: ended='downs'; ndy=100-ydl; nds=False
            else:
                inte=(oc==3); fl=P.fum[j]==1
                if inte or fl:
                    S['give']+=1; ended='to'; ndy=P.nd[j]; nds=P.ndsame[j]
                    if P.deftd[j]: ended='deftd'
                elif P.safety[j] or (ydl-y)>=100:
                    ended='safety'
                elif P.td[j] or y>=ydl:
                    S['pts']+=6; ended='td'
                elif P.trans=='empirical':
                    nd_=P.n_down[j]
                    if nd_!=nd_ or P.delta[j]!=P.delta[j]:       # the real drive ended here with no scoring/turnover flag: turnover on downs (or the half)
                        ydl-=y; ended='downs'; ndy=100-ydl; nds=False
                    else:
                        dlt=float(P.delta[j]); ydl-=dlt
                        if ydl<=0: S['pts']+=6; ended='td'
                        elif nd_==1: down,ytg=1,min(10.0,ydl)
                        else: down=int(nd_); ytg=max(1.0,ytg-dlt)
                else:
                    ydl-=y
                    if y>=ytg: down,ytg=1,min(10.0,ydl)
                    else: down+=1; ytg-=y
                    if down>4: ended='downs'; ndy=100-ydl; nds=False
            if ended is None: continue
            if ended in ('punt','fgmiss','to','downs'):
                if ndy!=ndy: ndy=100-ydl if ended=='downs' else 70.0
                if nds: pass
                else: poss=1-poss
                ydl=float(ndy); new_drive=True
            elif ended=='td':
                after_td(poss); poss,ydl,dtk=kick(poss,hs); hs=max(0.0,hs-dtk); new_drive=True
            elif ended=='score':
                poss,ydl,dtk=kick(poss,hs); hs=max(0.0,hs-dtk); new_drive=True
            elif ended=='deftd':
                o=1-poss; st[o]['pts']+=6; after_td(o); poss,ydl,dtk=kick(o,hs); hs=max(0.0,hs-dtk); new_drive=True
            elif ended=='safety':
                o=1-poss; st[o]['pts']+=2; poss,ydl,dtk=kick(poss,hs); hs=max(0.0,hs-dtk); new_drive=True
        # half over
    if ot and st[0]['pts']==st[1]['pts']:
        hs=600.0; poss=0 if R()<.5 else 1; first=poss; poss,ydl,dtk=kick(1-poss,hs); hs-=dtk; drv=[0,0]; new_drive=True; down,ytg=1,10.0
        while hs>0:
            if new_drive:
                st[poss]['drives']+=1; drv[poss]+=1; new_drive=False; down,ytg=1,min(10.0,ydl)
            sd=0
            keys=keys_call(down,ytg,ydl,sd,2,600.0); pool=P.pick(P.call_pool,keys,P.minn)
            call=int(P.call[pool[int(R()*len(pool))]]); call=0 if call in (4,5) else call
            rp=P.pick(P.rec_pool,keys_rec(call,down,ytg,ydl),P.minn); j=int(rp[int(R()*len(rp))])
            oc=int(P.oc[j]); y=float(P.yards[j]); cp=P.pick(P.nl_pool,keys_nl(oc,y),20); dt=min(float(P.dt[cp[int(R()*len(cp))]]),hs); hs-=dt
            S=st[poss]; S['plays']+=1; S['top']+=dt
            if call in (0,1): S['off']+=1; S['yds']+=y; S['pa']+=P.passatt[j]; S['ra']+=P.rushatt[j]; S['comp']+=P.comp[j]; S['sacks']+=1 if P.sackf[j] else 0
            ended=None; ndy=None; nds=False
            if call==2: ended='punt'; ndy=P.nd[j]; nds=P.ndsame[j]
            elif call==3:
                if P.fg[j]==1: S['pts']+=3; ended='score'
                else: ended='fgmiss'; ndy=P.nd[j]; nds=P.ndsame[j]
            else:
                if oc==3 or P.fum[j]==1: S['give']+=1; ended='to'; ndy=P.nd[j]; nds=P.ndsame[j]
                elif P.safety[j] or (ydl-y)>=100: ended='safety'
                elif P.td[j] or y>=ydl: S['pts']+=6; ended='td'
                else:
                    ydl-=y
                    if y>=ytg: down,ytg=1,min(10.0,ydl)
                    else: down+=1; ytg-=y
                    if down>4: ended='downs'; ndy=100-ydl
            if ended is None: continue
            if ended=='td': after_td(poss)
            if ended=='safety': st[1-poss]['pts']+=2
            if ndy is not None and ndy==ndy: ydl=float(ndy)
            else: ydl=75.0
            if ended in ('punt','fgmiss','to','downs') and not nds: poss=1-poss
            elif ended in ('td','score','safety'):
                nxt=1-poss if ended!='safety' else poss
                poss,ydl,dtk=kick(poss if ended!='safety' else poss,hs); hs=max(0,hs-dtk)
            new_drive=True
            if drv[0]>=1 and drv[1]>=1 and st[0]['pts']!=st[1]['pts']: break
    return st
def run(pack,n,seed=1):
    rng=random.Random(seed); out=[]
    for g in range(n):
        s=simulate(pack,rng)
        for k in (0,1):
            a=s[k]; b=s[1-k]
            out.append((a['pts'],b['pts'],a['drives'],a['plays'],a['off'],a['pa'],a['ra'],a['comp'],a['yds'],a['sacks'],a['give'],a['top']))
    return out
DIAG=None
COLS=['points','opp_points','drives','plays','off_plays','pass_att','rush_att','completions','yards','sacks','giveaways','top_dt']
