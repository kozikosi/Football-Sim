#!/usr/bin/env python3
# w23 patch 2 — harden CPU preference helpers against a not-yet-started draft
# In:  download/Football-Sim-Z-post-blue-w23.html (md5 1ff34d222a269fdc09d1cff37e456b58)
import hashlib

P = '/home/z/my-project/download/Football-Sim-Z-post-blue-w23.html'
src = open(P, encoding='utf-8').read()
md5_in = hashlib.md5(src.encode()).hexdigest()
assert md5_in == '1ff34d222a269fdc09d1cff37e456b58', 'w23 md5 mismatch: ' + md5_in

R = []
R.append((
"""function cpuBias(teamIndex, group, st){
 const host = (st && st !== draftSim) ? st : draftSim;
 if(host !== draftSim && draftSim.bias && draftSim.bias[teamIndex] && draftSim.bias[teamIndex][group]!=null) return draftSim.bias[teamIndex][group]; // forecasts read, never write (w23)""",
"""function cpuBias(teamIndex, group, st){
 const live = (typeof draftSim !== 'undefined') ? draftSim : null;
 const host = (st && st !== live) ? st : live;
 if(host !== live && live && live.bias && live.bias[teamIndex] && live.bias[teamIndex][group]!=null) return live.bias[teamIndex][group]; // forecasts read, never write (w23)""", 1, 'H cpuBias'))
R.append((
"""function cpuNoise(teamIndex, st){
 const host = (st && st !== draftSim) ? st : draftSim;
 if(host !== draftSim && draftSim.noiseSd && draftSim.noiseSd[teamIndex]!=null) return draftSim.noiseSd[teamIndex];""",
"""function cpuNoise(teamIndex, st){
 const live = (typeof draftSim !== 'undefined') ? draftSim : null;
 const host = (st && st !== live) ? st : live;
 if(host !== live && live && live.noiseSd && live.noiseSd[teamIndex]!=null) return live.noiseSd[teamIndex];""", 1, 'H cpuNoise'))
R.append((
"""function cpuMiss(teamIndex, st){
 const host = (st && st !== draftSim) ? st : draftSim;
 if(host !== draftSim && draftSim.missP && draftSim.missP[teamIndex]!=null) return draftSim.missP[teamIndex];""",
"""function cpuMiss(teamIndex, st){
 const live = (typeof draftSim !== 'undefined') ? draftSim : null;
 const host = (st && st !== live) ? st : live;
 if(host !== live && live && live.missP && live.missP[teamIndex]!=null) return live.missP[teamIndex];""", 1, 'H cpuMiss'))

for old, new, cnt, label in R:
    n = src.count(old)
    assert n == cnt, f'[{label}] expected {cnt}, found {n}'
    src = src.replace(old, new)
    print('  ok ', label)

open(P, 'w', encoding='utf-8').write(src)
print('OUT md5:', hashlib.md5(src.encode()).hexdigest(), f'({len(src):,} bytes)')
