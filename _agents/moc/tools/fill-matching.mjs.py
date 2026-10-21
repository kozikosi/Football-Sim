import json
from collections import deque, Counter
D=json.load(open('/tmp/moc-matching-inputs2.json'))
PLAYERS=D['players']; POS=D['positions']
bypos={p:[i for i,r in enumerate(PLAYERS) if r[1]==p] for p in POS}

def solve(key, slots, label):
    M=D[key]; n_slots=len(slots)*32; n_pl=len(PLAYERS)
    S=0; sl0=1; pl0=sl0+n_slots; T=pl0+n_pl; N=T+1
    g=[[] for _ in range(N)]
    def add(u,v,cap,cost):
        g[u].append([v,cap,cost,len(g[v])]); g[v].append([u,0,-cost,len(g[u])-1])
    edges=0
    for si,sl in enumerate(slots):
        for k in range(32):
            u=sl0+si*32+k; add(S,u,1,0)
            for p in POS:
                kk=p+'|'+sl
                if kk in M:
                    c=M[kk]
                    for pi in bypos[p]: add(u,pl0+pi,1,c); edges+=1
    for pi in range(n_pl): add(pl0+pi,T,1,0)
    flow=0; cost=0
    while True:
        dist=[float('inf')]*N; dist[S]=0; inq=[False]*N; inq[S]=True; q=deque([S]); pv=[-1]*N; pe=[-1]*N
        while q:
            v=q.popleft(); inq[v]=False
            for i,e in enumerate(g[v]):
                to,cap,c,_=e
                if cap>0 and dist[v]+c<dist[to]-1e-12:
                    dist[to]=dist[v]+c; pv[to]=v; pe[to]=i
                    if not inq[to]: inq[to]=True; q.append(to)
        if dist[T]==float('inf'): break
        v=T; d=0
        while v!=S:
            e=g[pv[v]][pe[v]]; d+=e[2]; v=pv[v]
        v=T
        while v!=S:
            e=g[pv[v]][pe[v]]; e[1]-=1; g[v][e[3]][1]+=1; v=pv[v]
        flow+=1; cost+=d
    comp={}
    for si,sl in enumerate(slots):
        for k in range(32):
            u=sl0+si*32+k
            for to,cap,c,_ in g[u]:
                if pl0<=to<pl0+n_pl and cap==0 and g[to][_][1] if False else False: pass
            for i,e in enumerate(g[u]):
                to,cap,c,rev=e
                if pl0<=to<pl0+n_pl and cap==0 and g[to][rev][1]>0:
                    p=PLAYERS[to-pl0][1]
                    comp.setdefault(sl,Counter())[p]+=1
    hist=Counter(); flex=Counter()
    for sl,cc in comp.items():
        for p,n in cc.items():
            c0=M.get(p+'|'+sl); hist[c0]+=n
            if c0>0: flex[sl]+=n
    print(f"--- {label}")
    print(f"    demand {n_slots} ({len(slots)} slot types x 32) · eligible edges {edges}")
    print(f"    flow {flow}/{n_slots} · total penalty {cost} · avg {cost/n_slots:.4f}/slot")
    print(f"    penalty histogram {dict(sorted(hist.items()))} · flexed slots {dict(flex)}")
    for sl in ('FB1','P1','K','TE2','SAM'):
        if sl in comp: print(f"      {sl:4s} filled by {dict(comp[sl])}")
    return flow,cost,comp,n_slots

rA=solve('A', D['slots26'], "A — 26-slot (today's build)")
print()
rB=solve('B', D['slots28'], "B — 28-slot FB/P, K may punt (one-way)")
print()
rC=solve('C', D['slots28'], "C — 28-slot FB/P, P<->K interchangeable (symmetric)")
print()
print("=== LOWER BOUND (now excluding the slot's own natural group) ===")
M=D['A']
def cheapest(slot, exclude):
    best=None
    for p in POS:
        if p in exclude: continue
        k=p+'|'+slot
        if k in M and (best is None or M[k]<best[0]): best=(M[k],p)
    return best
te=cheapest('TE1', {'TE'}); sam=cheapest('SAM', {'MIKE','WILL','SAM'}); cb=cheapest('CB1', {'CB'})
print(f"  cheapest NON-TE fill of a TE slot : {te}  -> 11 x {te[0]} = {11*te[0]}")
print(f"  cheapest NON-LB fill of a SAM slot : {sam} -> 5 x {sam[0]} = {5*sam[0]}")
lb=11*te[0]+5*sam[0]
print(f"  lower bound {lb} vs achieved A {rA[1]} -> {'OPTIMAL (bound attained)' if rA[1]==lb else 'gap'}")
print(f"  B achieved {rB[1]} | C achieved {rC[1]}  (same bound applies to both)")
