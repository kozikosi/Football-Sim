with open('/Users/kosi/Desktop/Football Sim/Madden NFL 27 Team Power Rankings & Draft Simulator (7).html', 'r') as f:
    content = f.read()

old = '''function lineupEditorHTML(roster, hostId){
 const players = Object.values(roster.slots).filter(Boolean).sort((a,b)=>cmpPlayers(a,b));
 const groups = DEPTH_CHART_GROUPS.map(([gname, gcls, slots])=>{
  const rows = slots.map(sl=>{
   const cur = roster.slots[sl];
   const opts = players.filter(p=>eligibleSlotsFor(p).includes(sl) || (cur && p[0]===cur[0])).map(p=>{
    const fp = flexPenaltyFor(p[1], sl);
    return `<option value="${p[0].replace(/"/g,'"')}" ${cur&&cur[0]===p[0]?'selected':''}>${p[0]} — ${POS_DISPLAY[p[1]]||p[1]} ${p[3]}${fp?` (flex −${fp} = ${p[3]-fp})`:''}</option>`;
   }).join('');
   const war = cur ? `<span class="narr" style="margin-left:6px;">${fmtWar(winsAt(cur, sl))}</span>` : '';
   return `<div class="depth-row lgrid"><span class="slotname">${LABELS[sl]||sl}</span><select data-lineup="${sl}" style="width:100%;min-width:0;background:var(--panel2);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:3px 6px;font-size:0.78rem;">${opts}</select><span class="dwar">${cur?fmtWar(winsAt(cur, sl)):''}</span></div>`;
  }).join('');
  return `<div class="depth-group ${gcls}"><h4>${gname}</h4>${rows}${gcls==='st'?returnerRowHTML(hostId):''}</div>`;
 }).join('');
 return `<div id="${hostId}">${lineupScoresHTML(roster, hostId)}<div id="${hostId}Advice">${lineupAdviceHTML(roster, hostId)}</div><div class="draft-columns" style="grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:8px;">${groups}</div></div>`;
}'''

new = '''function lineupEditorHTML(roster, hostId){
 const players = Object.values(roster.slots).filter(Boolean).sort((a,b)=>cmpPlayers(a,b));
 const groups = DEPTH_CHART_GROUPS.map(([gname, gcls, slots])=>{
  const rows = slots.map(sl=>{
   const cur = roster.slots[sl];
   const opts = players.filter(p=>{
    if(!eligibleSlotsFor(p).includes(sl)) return false;
    if(cur && p[0]===cur[0]) return true;
    const pFrom = Object.keys(roster.slots).find(k=>roster.slots[k] && roster.slots[k][0]===p[0]);
    if(!pFrom) return true;
    const occupant = roster.slots[sl];
    if(!occupant) return true;
    return eligibleSlotsFor(occupant).includes(pFrom);
   }).map(p=>{
    const fp = flexPenaltyFor(p[1], sl);
    return `<option value="${p[0].replace(/"/g,'"')}" ${cur&&cur[0]===p[0]?'selected':''}>${p[0]} — ${POS_DISPLAY[p[1]]||p[1]} ${p[3]}${fp?` (flex −${fp} = ${p[3]-fp})`:''}</option>`;
   }).join('');
   const war = cur ? `<span class="narr" style="margin-left:6px;">${fmtWar(winsAt(cur, sl))}</span>` : '';
   return `<div class="depth-row lgrid"><span class="slotname">${LABELS[sl]||sl}</span><select data-lineup="${sl}" style="width:100%;min-width:0;background:var(--panel2);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:3px 6px;font-size:0.78rem;">${opts}</select><span class="dwar">${cur?fmtWar(winsAt(cur, sl)):''}</span></div>`;
  }).join('');
  return `<div class="depth-group ${gcls}"><h4>${gname}</h4>${rows}${gcls==='st'?returnerRowHTML(hostId):''}</div>`;
 }).join('');
 return `<div id="${hostId}">${lineupScoresHTML(roster, hostId)}<div id="${hostId}Advice">${lineupAdviceHTML(roster, hostId)}</div><div class="draft-columns" style="grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:8px;">${groups}</div></div>`;
}'''

if old in content:
    content = content.replace(old, new)
    with open('/Users/kosi/Desktop/Football Sim/Madden NFL 27 Team Power Rankings & Draft Simulator (7).html', 'w') as f:
        f.write(content)
    print("Success!")
else:
    print("NOT FOUND")