#!/usr/bin/env python3
"""zpb_v44b.py — stage 2: the ACTIVE (card-based) awards renderers get the AP1 gold.
Runs on the stage-1 output; writes the same file back."""
import hashlib

OUT = 'Football-Sim-Z-post-blue-w44.html'
B = open(OUT, encoding='utf-8').read()
n = 0

def rep(old, new, tag):
    global B, n
    c = B.count(old)
    assert c == 1, f"[{tag}] anchor count={c}"
    B = B.replace(old, new)
    n += 1
    print(f"  ok  {tag}")

rep(
"""renderRegularAwardsHTML = function(A, open){
 try{
  const user = seasonUserTeam();""",
"""renderRegularAwardsHTML = function(A, open){
 try{
  try{ window.__zpbAp1Gold = new Set(); HONOR_ORDER.forEach(pos=>{ (((A.allPro||{}).first||{})[pos]||[]).forEach(c=>window.__zpbAp1Gold.add(c.name)); }); }catch(err){} // w44 (O2, Owner): the first-team gold register
  const user = seasonUserTeam();""",
"O2h active awards register")

rep(
"""  const posRows = (box, shm)=> HONOR_ORDER.map(pos=>'<div class="zpb-aprow"><span class="zpb-apos">'+pos+'</span>'
    + ((box[pos]||[]).length ? box[pos].map(c=>'<span class="zpb-apchip" style="'+stv(c.team)+'"><b class="zpb-gname '+(shm?'zpb-shm':'')+'">'+c.name+'</b> <i class="narr">'+nick(c.team)+'</i></span>').join('') : '<span class="narr">\\u2014</span>')+'</div>').join(''); // w19: first-team All-Pro names always shimmer · w38 (R1, Owner): the rankings ink on every chip""",
"""  const posRows = (box, shm)=> HONOR_ORDER.map(pos=>'<div class="zpb-aprow"><span class="zpb-apos">'+pos+'</span>'
    + ((box[pos]||[]).length ? box[pos].map(c=>'<span class="zpb-apchip" style="'+stv(c.team)+'"><b class="zpb-gname '+((shm||(window.__zpbAp1Gold&&window.__zpbAp1Gold.has(c.name)))?'zpb-shm':'')+'">'+c.name+'</b> <i class="narr">'+nick(c.team)+'</i></span>').join('') : '<span class="narr">\\u2014</span>')+'</div>').join(''); // w19: first-team All-Pro names always shimmer · w38 (R1, Owner): the rankings ink on every chip · w44 (O2, Owner): an All-Pro first-team name is gold in the Pro Bowl placement too""",
"O2h posRows AP1 gold")

rep(
"""renderPlayoffAwardsHTML = function(P){
 try{
  const user = seasonUserTeam();""",
"""renderPlayoffAwardsHTML = function(P){
 try{
  const user = seasonUserTeam();
  const _ap1g = (function(){ try{ if(window.__zpbAp1Gold && window.__zpbAp1Gold.size) return window.__zpbAp1Gold; const rs=(typeof seasonState!=='undefined')&&seasonState&&seasonState.awardsRS; if(rs&&rs.ap1Names){ rs.ap1NamesSet=rs.ap1NamesSet||new Set(rs.ap1Names); return rs.ap1NamesSet; } }catch(err){} return new Set(); })(); // w44 (O2, Owner): the first-team gold register""",
"O2i playoff register")

rep(
"""        return '<b class="zpb-gname zpb-awname '+(star?'zpb-shm':'')+'">'+p.name+'</b>'""",
"""        return '<b class="zpb-gname zpb-awname '+((star||_ap1g.has(p.name))?'zpb-shm':'')+'">'+p.name+'</b>' // w44 (O2, Owner): an All-Pro first-team name is gold on the playoff awards too""",
"O2i playoff card gold")

rep(
"""   + '<b class="zpb-gname '+(star?'zpb-shm':'')+'">'+name+'</b>'""",
"""   + '<b class="zpb-gname '+((star||(window.__zpbAp1Gold&&window.__zpbAp1Gold.has(name)))?'zpb-shm':'')+'">'+name+'</b>' // w44 (O2, Owner): the first-team gold rides the award cards too""",
"O2j award-card gold")

rep(
"""  const team = (P.team||[]).map(a=>'<div class="zpb-aprow"><span class="zpb-apos">'+a.pos+'</span><span class="zpb-apchip" style="'+stv(a.team)+'"><b class="zpb-gname">'+a.name+'</b> <i class="narr">'+nick(a.team)+'</i></span></div>').join('');""",
"""  const team = (P.team||[]).map(a=>'<div class="zpb-aprow"><span class="zpb-apos">'+a.pos+'</span><span class="zpb-apchip" style="'+stv(a.team)+'"><b class="zpb-gname '+((_ap1g&&_ap1g.has(a.name))?'zpb-shm':'')+'">'+a.name+'</b> <i class="narr">'+nick(a.team)+'</i></span></div>').join(''); // w44 (O2, Owner): the All-Playoff chips read the first-team gold too""",
"O2i all-playoff gold")

open(OUT, 'w', encoding='utf-8').write(B)
print(f"\n{n} stage-2 replacements · md5 {hashlib.md5(B.encode()).hexdigest()}")
