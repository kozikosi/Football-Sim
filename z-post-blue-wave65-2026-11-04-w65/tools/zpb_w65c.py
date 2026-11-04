#!/usr/bin/env python3
# zpb_w65c.py — the wave-65 chain step 3: the autosave envelope grows the draft snapshot
# (pick rounds + the isUser flag), so RESTORE rebuilds the season with its R badges.
# The slots themselves stay single-sourced (seasonState.teams[n].slotmap IS the draft's slots object).
import hashlib, sys

SRC = '/home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html'
OUT = '/home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html'
P2_MD5 = 'f59c1c24d45e5cbc9931fa4d4d4bbb58'

src = open(SRC, encoding='utf-8').read()
md5 = hashlib.md5(src.encode()).hexdigest()
print(f'stage: part-2 output · md5 {md5} · {len(src.encode())} bytes')
if md5 != P2_MD5:
    sys.exit(f'ABORT: part-2 md5 {md5} != {P2_MD5}')

fails = []
def rep(old, new, tag):
    global src
    n = src.count(old)
    if n != 1:
        fails.append(f'{tag}: anchor count {n} (want 1)')
        return
    src = src.replace(old, new)
    print(f'  ok {tag}')

# 1 · the w63 chip's save() writes the v2 envelope (draft snapshot: pick rounds + isUser; slots stay single-sourced)
rep(
"""   var envelope = { kind:'week', schemaVersion:1, engineVersion:'zpb-w63', dataVersion:'1', slot:'A', savedAt:new Date().toISOString(), payload: S };""",
"""   var draftSnap = null; // w65: RESTORE needs the pick rounds — the slots stay single-sourced in seasonState.teams[n].slotmap
   try{
    if(typeof draftSim !== 'undefined' && draftSim && draftSim.rosters){ draftSnap = { rosters: draftSim.rosters.map(function(r){ return { teamName:r.teamName, pickRounds:r.pickRounds||{}, isUser:!!r.isUser }; }) }; }
   }catch(eD){}
   var envelope = { kind:'week', schemaVersion:1, engineVersion:'zpb-w65', dataVersion:'1', slot:'A', savedAt:new Date().toISOString(), payload: { zpbRestore:2, seasonState: S, draft: draftSnap } };""",
 'the autosave envelope grows the draft snapshot (v2)')

# 2 · the restore merges the draft snapshot into rosters rebuilt from seasonState.teams
rep(
"""   var rosters = [], ui = 0;
   if(p && p.zpbRestore===2 && p.draft && Array.isArray(p.draft.rosters) && p.draft.rosters.length){
    rosters = p.draft.rosters.map(function(r){ return { teamName:r.teamName, slots:r.slots||{}, pickRounds:r.pickRounds||{}, isUser:!!r.isUser, pool:Object.values(r.slots||{}).filter(Boolean) }; });
    ui = rosters.findIndex(function(r){ return r.isUser; }); if(ui < 0) ui = 0;
   } else {""",
"""   var rosters = [], ui = 0;
   if(p && p.zpbRestore===2){
    var _dr = (p.draft && Array.isArray(p.draft.rosters)) ? p.draft.rosters : [];
    rosters = Object.keys(S.teams).map(function(n){ // the slots live in seasonState.teams[n].slotmap — one source, no duplication
     var t = S.teams[n], m = _dr.find(function(r){ return r.teamName===n; }) || {};
     return { teamName:n, slots:t.slotmap || {}, pickRounds:m.pickRounds||{}, isUser:!!(m.isUser || t.isUser), pool:t.pool || Object.values(t.slotmap||{}).filter(Boolean) };
    });
    ui = rosters.findIndex(function(r){ return r.isUser; }); if(ui < 0) ui = 0;
   } else {""",
 'the restore merges pick rounds from the snapshot')

if fails:
    print('ANCHOR FAILURES:'); [print('  ' + f) for f in fails]
    sys.exit(1)

checks = [
 ('v2 envelope', "engineVersion:'zpb-w65'" in src),
 ('draft snapshot written', 'draftSnap = { rosters: draftSim.rosters.map' in src),
 ('restore merges rounds', 'var _dr = (p.draft && Array.isArray(p.draft.rosters))' in src),
 ('slots single-sourced', 'slots:t.slotmap || {}' in src),
 ('w63 engine string gone', src.count("engineVersion:'zpb-w63'") == 0),
]
bad = [n for n, okc in checks if not okc]
for n, okc in checks:
    print(('  PASS ' if okc else '  FAIL ') + n)
if bad:
    sys.exit('POST-CHECK FAILURES: ' + ', '.join(bad))

open(OUT, 'w', encoding='utf-8').write(src)
out_md5 = hashlib.md5(src.encode()).hexdigest()
print(f'\nwritten: {OUT} · md5 {out_md5} · {len(src.encode())} bytes (delta {len(src.encode())-1716179:+})')
print('CHAIN STEP 3 GREEN')
