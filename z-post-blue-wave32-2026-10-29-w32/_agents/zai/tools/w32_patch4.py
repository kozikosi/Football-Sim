#!/usr/bin/env python3
# w32_patch4.py — wave 32 stage 4: draft engine + draft board + lineup editor + preview cards.
import io, sys, re, hashlib

SRC = '/home/z/my-project/scripts/w32-stage3.html'
DST = '/home/z/my-project/scripts/w32-stage4.html'
s = io.open(SRC, encoding='utf-8').read()

def sub1(pat, repl, n=1, tag=''):
    global s
    rx = re.compile(pat)
    hits = len(rx.findall(s))
    if hits != n:
        print('FAIL [%s] hits=%d expected=%d' % (tag, hits, n)); sys.exit(1)
    s = rx.sub(lambda m: repl, s, count=n)

def repl_line(contains, new_line, tag, n=1):
    global s
    lines = s.split('\n')
    hits = [i for i, l in enumerate(lines) if contains in l]
    if len(hits) != n:
        print('FAIL [%s] line hits=%d expected=%d' % (tag, len(hits), n)); sys.exit(1)
    for i in hits:
        lines[i] = new_line
    s = '\n'.join(lines)

# ---------- A33 · no second quarterback before round 25 (CPU draft) ----------
sub1(r" for\(const p of st\.pool\)\{ // pool is sorted by overall, so only the top few at each position can matter\n  const pos = p\[1\], c = POS_SLOT_MAP\[pos\]; if\(!c\) continue;",
     """ for(const p of st.pool){ // pool is sorted by overall, so only the top few at each position can matter
  const pos = p[1], c = POS_SLOT_MAP[pos]; if(!c) continue;
  // w32 (Owner): a team never drafts a second quarterback before round 25 \u2014 the spot is filled,
  // the season is decided elsewhere; only the late rounds may carry a backup.
  if(pos==='QB' && curRound<25 && (function(r){ for(const k in r.slots){ const q=r.slots[k]; if(q && q[1]==='QB') return true; } return false; })(roster)) continue;""",
     n=1, tag='qb25')

# ---------- B8 · ELEPHANT is gone; the label is DL5 ----------

# ---------- B8 · ELEPHANT is gone; the label is DL5 ----------
sub1('"DL5": "DL5 / Elephant"', '"DL5": "DL5"', n=1, tag='eleph1')
sub1('{"key":"DL5","label":"DL5 / Elephant"', '{"key":"DL5","label":"DL5"', n=1, tag='eleph2')

# ---------- B9 · the field maps: the nickel swaps with the end; the dime joins the nickel's row; the DL keeps the LOS across from the OL ----------
# (a) the GUIDE map (w15 zpbFieldMapHTML, patched in w30)
sub1(r"  \+ xrow\(\[\['CB',-5\],\['NICKEL',-3\],\['CB',5\]\]\)\n  \+ xrow\(\[\['DIME',-3\]\]\)\n  \+ xrow\(\[\['DE',-3\],\['DT',-1\],\['DT',1\],\['DE',3\]\]\)",
     """  + xrow([['CB',-5],['DE',-3],['CB',5]])
  + xrow([['NICKEL',-3],['DIME',-2.2],['DT',-1],['DT',1],['DE',3]])""",
     n=1, tag='guide-map')
# (b) the draft-review map (zpbBelongMapHTML, w27) + the trailing sentence (B19) and the DIME row
sub1(r"   \+ xrow\(\[xL\('CB1',-5\),xL\('CB3',-3\),xL\('CB2',5\)\]\)\n   \+ xrow\(\[\['DIME','DIME',-3\]\]\)\n   \+ xrow\(\[xL\('DE1',-3\),\['DT1',dt1,-1\],\['DT2',dt2,1\],xL\('DE2',3\)\]\)",
     """   + xrow([xL('CB1',-5),xL('DE1',-3),xL('CB2',5)])
   + xrow([['NICKEL',lbl('CB3')||'NICKEL',-3],['DIME','DIME',-2.2],['DT1',dt1,-1],['DT2',dt2,1],xL('DE2',3)])""",
     n=1, tag='belong-map')
sub1(r"   \+ '</div>'\n   \+ '<p class=\"narr\" style=\"margin:6px 0 0;text-align:center;\">Every starter wears his initials at the station he belongs to \\u2014 the corners press over the line of scrimmage across from the receivers, the nickel sits left of the mike, and the dime stacks exactly where the nickel is\.</p>';",
     "   + '</div>';\n   // w32 (Owner): the initials sentence is gone \u2014 the map speaks for itself",
     n=1, tag='belong-sentence')

# ---------- B18 · the draft-review map title ----------
sub1(r"let html = `<h4 style=\"margin-top:0;\">Where they belong</h4>\$\{\(window\.zpbBelongMapHTML \? window\.zpbBelongMapHTML\(e\) : ''\)\}`;",
     "let html = `<h4 style=\"margin-top:0;\">WHERE YOUR PLAYERS LINE UP?</h4>${(window.zpbBelongMapHTML ? window.zpbBelongMapHTML(e) : '')}`; // w32 (Owner): the Owner's own title",
     n=1, tag='title-belong')

# ---------- B16 · one click opens the flex dropdown ----------
sub1(r"   c\.replaceWith\(sl\); sl\.focus\(\); \}",
     """   c.replaceWith(sl); sl.focus();
   try{ if(sl.showPicker) sl.showPicker(); }catch(err){} // w32 (Owner): ONE click opens the menu
   }""",
     n=1, tag='oneclick')

# ---------- B15 · in the 3-4, OLB1 sits between DL5 and ILB1 (depth-list order) ----------
# renderDraftRoster2
sub1(r" document\.getElementById\('draftRosterList'\)\.innerHTML = DEPTH_CHART_GROUPS\.map\(\(\[gname, gcls, slots\]\)=>`<div class=\"depth-group \$\{gcls\}\"><h4>\$\{gname\}</h4>\$\{slots\.map\(sl=>row\(sl, roster\.slots\[sl\], roster\.pickRounds&&roster\.pickRounds\[sl\]\)\)\.join\(''\)\}\$\{gcls==='def'\?zpbDimeDrafRow\(roster\):''\}</div>`\)\.join\(''\);",
     """ document.getElementById('draftRosterList').innerHTML = DEPTH_CHART_GROUPS.map(([gname, gcls, slots])=>`<div class="depth-group ${gcls}"><h4>${gname}</h4>${window.zpbOrderSlots(gcls, slots).map(sl=>row(sl, roster.slots[sl], roster.pickRounds&&roster.pickRounds[sl])).join('')}${gcls==='def'?zpbDimeDrafRow(roster):''}</div>`).join('');""",
     n=1, tag='34-roster')
# renderDepthChartHTML + zpbDepthZonesHTML + lineupEditorHTML use the same order helper
sub1(r" return DEPTH_CHART_GROUPS\.map\(\(\[gname, gcls, slots\]\)=>\{\n  const rows = slots\.map\(s=>\{",
     """ return DEPTH_CHART_GROUPS.map(([gname, gcls, slots])=>{
  const rows = window.zpbOrderSlots(gcls, slots).map(s=>{""",
     n=1, tag='34-depth')
sub1(r"  \$\{zone\('Offense','zpb-dz-off', DEPTH_CHART_GROUPS\[0\]\[2\]\)\}\n  \$\{zone\('Defense','zpb-dz-def', DEPTH_CHART_GROUPS\[1\]\[2\], dimeRow\(\)\)\}\n  \$\{zone\('Special Teams','zpb-dz-st', DEPTH_CHART_GROUPS\[2\]\[2\]\)\}",
     """  ${zone('Offense','zpb-dz-off', window.zpbOrderSlots('off', DEPTH_CHART_GROUPS[0][2]))}
  ${zone('Defense','zpb-dz-def', window.zpbOrderSlots('def', DEPTH_CHART_GROUPS[1][2]), dimeRow())}
  ${zone('Special Teams','zpb-dz-st', window.zpbOrderSlots('st', DEPTH_CHART_GROUPS[2][2]))}""",
     n=1, tag='34-zones')
sub1(r" const groups = DEPTH_CHART_GROUPS\.map\(\(\[gname, gcls, slots\]\)=>\{\n  const rows = slots\.map\(sl=>\{",
     """ const groups = DEPTH_CHART_GROUPS.map(([gname, gcls, slots])=>{
  const rows = window.zpbOrderSlots(gcls, slots).map(sl=>{""",
     n=1, tag='34-lineup')
# the order helper itself (placed with the other zpb window helpers)
sub1(r"window\.zpbSlotOrderOf = function\(pos\)\{",
     """window.zpbOrderSlots = function(gcls, slots){
 if(gcls!=='def' || !window.ZPB34) return slots;
 const order = ['DE1','DT1','DE2','DL5','DT2','MIKE','WILL','SAM','CB1','CB2','FS','SS','CB3']; // w32 (Owner): in the 3-4, OLB1 (DT2) falls in between DL5 and ILB1
 const kept = order.filter(s=>slots.includes(s));
 const rest = slots.filter(s=>!order.includes(s));
 return kept.concat(rest);
};
window.zpbSlotOrderOf = function(pos){""",
     n=1, tag='34-helper')

# ---------- B21 · the breakdown moves under the "Position rank counts" line; entries are badges ----------
# reorder inside zpbDraftBreakdownHTML: groups-first block, then the note, then the breakdown badges
sub1(r" var out = '<div class=\"zpb-dbk-wrap\"><h4 style=\"margin:14px 0 4px;\">Your breakdown</h4><div class=\"zpb-dbk-groups\">';",
     " var out = '<div class=\"zpb-dbk-wrap\">'; // w32 (Owner): the player panels list leads; the note and Your Breakdown follow", tag='bk-open')
sub1(r" out \+= '</div>';\n  groups\.forEach\(function\(g\)\{",
     " out += '</div>';\n  groups.forEach(function(g){", tag='bk-mid')
sub1(r" out \+= '<p class=\"narr\" style=\"margin:6px 0 0;\">Position rank counts your player against the same spot on all 32 simulated teams\.</p></div>';\n  return out;",
     """ out += '<p class="narr" style="margin:10px 0 0;">Position rank counts your player against the same spot on all 32 simulated teams.</p>';
 out += '<h4 style="margin:14px 0 4px;">Your Breakdown</h4><div class="zpb-dbk-groups">';
 groups.forEach(function(g){
  var slots2 = g[1].filter(function(sl){ var en2 = nse(e.slotmap[sl]); return en2 && en2.name; });
  if(!slots2.length) return;
  var sum2 = 0; slots2.forEach(function(sl){ sum2 += (nse(e.slotmap[sl]).ovr || 70); });
  var myAvg2 = sum2 / slots2.length;
  var avgs2 = rosters.map(function(r){
   var s3 = 0, n3 = 0;
   slots2.forEach(function(sl){ var en3 = r.slots ? nse(r.slots[sl]) : null; if(en3 && en3.name){ s3 += en3.ovr || 70; n3++; } });
   return n3 ? s3/n3 : 0;
  });
  var rank2 = 1 + avgs2.filter(function(v){ return v > myAvg2 + 0.001; }).length;
  var cls2 = rank2 <= 8 ? ' zpb-sb-good' : (rank2 >= 25 ? ' zpb-sb-bad' : '');
  out += '<span class="zpb-sbadge'+cls2+'" style="--beat:0"><b>#'+rank2+'</b><i>'+g[0].toUpperCase()+' \\u00b7 '+Math.round(myAvg2)+' OVR</i></span>';
 });
 out += '</div></div>';
 return out;""",
     n=1, tag='bk-reorder')
# the first (now-duplicated) rank-badge builder above is trimmed to only the player panels
sub1(r" var out = '<div class=\"zpb-dbk-wrap\">'; // w32 \(Owner\): the player panels list leads; the note and Your Breakdown follow<div class=\"zpb-dbk-groups\">';",
     "XXNOMATCHXX", n=0, tag='noop-guard') if False else None
sub1(r"out \+= '<div class=\"zpb-dbk-wrap\">'; // w32 \(Owner\): the player panels list leads; the note and Your Breakdown follow<h4 style=\"margin:14px 0 4px;\">Your breakdown</h4><div class=\"zpb-dbk-groups\">';",
     "OUTNOMATCH", n=0, tag='noop-guard2') if False else None

io.open(DST, 'w', encoding='utf-8').write(s)
print('stage4 OK  md5', hashlib.md5(s.encode()).hexdigest(), 'bytes', len(s.encode()))
