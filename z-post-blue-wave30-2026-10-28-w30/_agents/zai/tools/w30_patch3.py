#!/usr/bin/env python3
# w30_patch3.py — Z.ai session 22 · wave 30 stage 3: the season-line badge law (CAR / SK) + leaders header.
import io, sys, hashlib

P = '/home/z/my-project/download/Football-Sim-Z-post-blue-w30.html'
with io.open(P, 'r', encoding='utf-8') as f:
    s = f.read()

E = [
 # B1: the w27 boot block defaults the rankings to series 7 now (spot toggles + dropdown)
 ("   window.zpbRankSlots = new Set(ord.slice(0, Math.min(9, ord.length))); // w27 (Owner): the default is Series step 9\n   var _gsel = document.getElementById('groupSelect');\n   if(_gsel){ try{ zpbEnsureSeriesOptions(); }catch(e){}\n    if(_gsel.querySelector('option[value=\"zpbS:9\"]')){ _gsel.value = 'zpbS:9'; if(typeof renderGroups === 'function'){ try{ renderGroups(); }catch(e){} } } }",
  "   window.zpbRankSlots = new Set(ord.slice(0, Math.min(7, ord.length))); // w30 (Owner): series 7 — QB + CB1 + DE1 + CB2 + WR1 + DE2 + OT1 — is the site default\n   var _gsel = document.getElementById('groupSelect');\n   if(_gsel){ try{ zpbEnsureSeriesOptions(); }catch(e){}\n    if(_gsel.querySelector('option[value=\"zpbS:7\"]')){ _gsel.value = 'zpbS:7'; if(typeof renderGroups === 'function'){ try{ renderGroups(); }catch(e){} } } }"),
 # I1: the leaders RB board reads CAR/RUSHY
 ("[['C/RUSHY',r=>fmtN(r.st.car||0)+'/'+fmtN(r.st.rushYds||0)]",
  "[['CAR/RUSHY',r=>fmtN(r.st.car||0)+'/'+fmtN(r.st.rushYds||0)]"),
 # I1: the season stat line reads CAR
 ("parts.push(`${fmtN(s.car)} C`, `${fmtN(s.rushYds)} RUSHY`,",
  "parts.push(`${fmtN(s.car)} CAR`, `${fmtN(s.rushYds)} RUSHY`,"),
 # I2: sacks always SK, never SKS (season lines, DL + LB branches)
 ("`${s.sack||0} SK${(s.sack||0)===1?'':'S'}`, `${s.tfl||0} TFL`, `${s.hur||0} PRSS`",
  "`${s.sack||0} SK`, `${s.tfl||0} TFL`, `${s.hur||0} PRSS`"),
 ("`${s.tkl||0} TKL`, `${s.tfl||0} TFL`, `${s.sack||0} SK${(s.sack||0)===1?'':'S'}`)",
  "`${s.tkl||0} TKL`, `${s.tfl||0} TFL`, `${s.sack||0} SK`)"),
]
fails = []
for old, new in E:
    c = s.count(old)
    if c != 1:
        fails.append((c, old[:90])); continue
    s = s.replace(old, new)
if fails:
    print('PATCH3 FAILURES:', fails); sys.exit(1)

if 'C/RUSHY' in s or 'SK${' in s or '`} C`' in s:
    print('leftover C or SKS patterns'); sys.exit(1)

with io.open(P, 'w', encoding='utf-8') as f:
    f.write(s)
print(f'w30_patch3.py: 4 edits · md5 {hashlib.md5(s.encode("utf-8")).hexdigest()}')
