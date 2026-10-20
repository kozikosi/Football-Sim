import re

with open('/Users/kosi/Desktop/Football Sim/Madden NFL 27 Team Power Rankings & Draft Simulator (7).html', 'r') as f:
    content = f.read()

# Find the starsFaceoffHTML function
old_func = '''function starsFaceoffHTML(g){
  const col = team=>{
   const sm = seasonState.teams[team].slotmap;
   const st = ROSTER_SLOTS.map(sl=>{ const e = effEntry(sm, sl); return e ? {slot:sl, name:e.name, ovr:e.ovr} : null; }).filter(x=>x && x.ovr>=85).sort((x,y)=>y.ovr-x.ovr).slice(0,9);
   return `<div><div class="${team===seasonUserTeam()?'ub':''}" style="font-weight:700;margin-bottom:3px;">${nick(team)}</div>${st.length ? st.map(x=>`<div class="sfrow ${x.ovr>=90?'sf90':''}"><span>${x.ovr>=90?'<span class="sfstar">★</span> ':''}<span class="${team===seasonUserTeam()?'ub':''}">${x.name}</span> <span style="opacity:.7;">${LABELS[x.slot]||x.slot}</span></span><b>${x.ovr}</b></div>`).join('') : '<div class="narr">No 85+ starters</div>'}</div>`;
  };
  return `<div class="draft-columns" style="grid-template-columns:1fr 1fr;gap:18px;margin:0 0 12px;padding:8px 10px;border:1px solid var(--border);border-radius:8px;"><div style="grid-column:1/-1;" class="narr"><b>Stars (85+ OVR)</b></div>${col(g.away)}${col(g.home)}</div>`;
}'''

new_func = '''function starsFaceoffHTML(g){
  const col = team=>{
   const sm = seasonState.teams[team].slotmap;
   const st = ROSTER_SLOTS.map(sl=>{ const e = effEntry(sm, sl); return e ? {slot:sl, name:e.name, ovr:e.ovr} : null; }).filter(x=>x && x.ovr>=85).sort((x,y)=>y.ovr-x.ovr).slice(0,9);
   const isUser = team===seasonUserTeam();
   return `<div><div class="${isUser?'ub':''}" style="font-weight:700;margin-bottom:3px;">${nick(team)}</div>${st.length ? st.map(x=>`<div class="sfrow ${x.ovr>=90?'sf90':''}"><span>${x.ovr>=90?'<span class="sfstar">★</span> ':''}<span class="${isUser?'ub':''}">${x.name}</span> <span style="opacity:.7;">${LABELS[x.slot]||x.slot}</span></span><b class="${isUser?'ub':''}">${x.ovr}</b></div>`).join('') : '<div class="narr">No 85+ starters</div>'}</div>`;
  };
  return `<div class="draft-columns" style="grid-template-columns:1fr 1fr;gap:18px;margin:0 0 12px;padding:8px 10px;border:1px solid var(--border);border-radius:8px;"><div style="grid-column:1/-1;" class="narr"><b>Stars (85+ OVR)</b></div>${col(g.away)}${col(g.home)}</div>`;
}'''

if old_func in content:
    content = content.replace(old_func, new_func)
    with open('/Users/kosi/Desktop/Football Sim/Madden NFL 27 Team Power Rankings & Draft Simulator (7).html', 'w') as f:
        f.write(content)
    print("Done!")
else:
    print("NOT FOUND")