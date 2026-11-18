# held-out test: does a smooth model of YARDS given a completion beat the pool lookup? fit 2016-2022, test 2023-2025. log loss per completion over yard bins (within-bin width cancels between models).
import sys, bisect; sys.path.insert(0,'.')
import numpy as np
from passclass import passes, feat_matrix
import sim as S
from sklearn.linear_model import LogisticRegression
NB=29
def binidx(y):
    y=np.asarray(y).astype(int); b=np.where(y<=0,0,np.where(y<=25,y,np.where(y<=30,26,np.where(y<=40,27,28)))); return b
LO=np.array([-99]+list(range(1,26))+[26,31,41])
def mask(ydl):          # a bin is possible only if its lowest yard is <= yards to the end zone
    return (LO[None,:]<=np.asarray(ydl)[:,None]).astype(float)
trn=passes(range(2016,2023)); tst=passes(range(2023,2026))
trc=trn[trn.oc==0].reset_index(drop=True); tsc=tst[tst.oc==0].reset_index(drop=True)
ytr=binidx(trc.yards_gained.values); yts=binidx(tsc.yards_gained.values)
print('completions train',len(trc),'test',len(tsc))
# pool baseline: down-PRESERVING hierarchy, first level with >=25 completions (what the fixed sampler reads)
def lv(down,ytg,ydl):
    d=int(down); yb=bisect.bisect_right(S.YDL,ydl)
    return [(d,bisect.bisect_right(S.DIST,ytg),yb),(d,bisect.bisect_right(S.DISTC,ytg),yb),(d,yb),(d,),()]
pools=[{} for _ in range(5)]
for i in range(len(trc)):
    for L,k in enumerate(lv(trc.down[i],trc.ydstogo[i],trc.yardline_100[i])): pools[L].setdefault(k,np.zeros(NB))[ytr[i]]+=1
def poolp(down,ytg,ydl,alpha):
    for L,k in enumerate(lv(down,ytg,ydl)):
        c=pools[L].get(k)
        if c is not None and c.sum()>=25: break
    p=c+alpha; return p
def pool_probs(df,alpha):
    out=np.stack([poolp(df.down[i],df.ydstogo[i],df.yardline_100[i],alpha) for i in range(len(df))]); out=out*mask(df.yardline_100.values); return out/out.sum(1,keepdims=True)
Xtr=feat_matrix(trc); Xts=feat_matrix(tsc)
def ll(P,y): return -np.log(np.maximum(P[np.arange(len(y)),y],1e-300))
best=None
for a in (0.02,0.1,0.5,1.0):
    l=ll(pool_probs(tsc,a),yts); print('pool alpha',a,'loss',l.mean().round(5))
    if best is None or l.mean()<best[0]: best=(l.mean(),a,l)
lp=best[2]; print('pool best alpha',best[1])
for C in (0.03,0.1,0.3,1.0):
    m=LogisticRegression(C=C,max_iter=3000).fit(Xtr,ytr)
    P=np.zeros((len(tsc),NB)); P[:,m.classes_]=m.predict_proba(Xts); P=P*mask(tsc.yardline_100.values)+1e-12; P/=P.sum(1,keepdims=True)
    lg=ll(P,yts); d=lp-lg
    print('GLM C',C,'loss',lg.mean().round(5),'gain over pool',d.mean().round(5),'nats/completion  SE',(d.std(ddof=1)/np.sqrt(len(d))).round(5),'z',(d.mean()/(d.std(ddof=1)/np.sqrt(len(d)))).round(1),
          'by season',[round(float(d[tsc.season.values==s].mean()),5) for s in (2023,2024,2025)])
# follow-up: marginal (no-state) baseline, and blend
marg=np.bincount(ytr,minlength=NB)+1.0
PM=np.tile(marg,(len(tsc),1))*mask(tsc.yardline_100.values); PM/=PM.sum(1,keepdims=True)
lm=ll(PM,yts); print('marginal loss',lm.mean().round(5),'pool gain over marginal',(lm-lp).mean().round(5),'GLM gain over marginal',(lm-lg).mean().round(5))
Pp=pool_probs(tsc,best[1])
for w in (0.25,0.5):
    B=(1-w)*Pp+w*P; lb=ll(B,yts); d=lp-lb
    print('blend w',w,'loss',lb.mean().round(5),'gain over pool',d.mean().round(5),'SE',(d.std(ddof=1)/np.sqrt(len(d))).round(5))
