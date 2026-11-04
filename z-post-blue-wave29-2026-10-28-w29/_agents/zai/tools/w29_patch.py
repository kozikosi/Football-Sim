#!/usr/bin/env python3
"""w29_patch.py — build Football-Sim-Z-post-blue-w29.html from the w28 baseline.
Every edit is an asserted exact replacement (Owner law: patch chain, never blind hand-edit)."""
import io, sys, hashlib

SRC = '/home/z/my-project/scripts/w29-base.html'
OUT = '/home/z/my-project/download/Football-Sim-Z-post-blue-w29.html'
html = io.open(SRC, encoding='utf-8').read()
applied = []

def E(tag, old, new, count=1):
    global html
    n = html.count(old)
    if n != count:
        print('FAIL %s: found %d occurrences, expected %d' % (tag, n, count))
        sys.exit(1)
    html = html.replace(old, new)
    applied.append(tag)

# ============================================================
# A1 (Owner): guide static field map — one shared field, defense mirrored
# below the offense; WRs out an extra bubble; CBs across them; NICKEL+DIME
# in the slot gap between the line and the receivers.
# ============================================================
E('A1_fieldmap_rows',
""" return '<div class="zpb-fm" role="img" aria-label="Field map: where each position lines up">'
  + '<div class="zpb-fm-side zpb-fm-off">'
  + row(['RB']) + strip(['RB'])
  + row(['QB']) + strip(['QB'])
  + row(['WR','OT','OG','C','OG','OT','TE','WR','WR'], ' zpb-fm-line') + strip(['WR','OT','OG','C','TE'])
  + '</div>'
  + '<div class="zpb-fm-scrim"><span>LINE OF SCRIMMAGE</span></div>'
  + '<div class="zpb-fm-side zpb-fm-def">'
  + row(['DE','DT','DT','DE']) + strip(['DE','DT'])
  + row(['CB','NICKEL','CB'], ' zpb-fm-wide') + strip(['CB','NICKEL'])
  + row(['WILL','MIKE','SAM']) + strip(['OLB','MIKE'])
  + row(['DIME']) + strip(['DIME'])
  + row(['FS','SS']) + strip(['FS','SS'])
  + '</div>'
  + strip(['FB','K','P'])
  + '</div>'""",
""" // w29 (Owner): the defense lines up ACROSS from the offense, below it — one shared field,
 // each defender mirrored over his man. The WRs stand an extra bubble out toward the
 // sidelines, the CBs line up directly across from them, and the nickel and the dime sit
 // in the slot gap between the offensive line and the receivers.
 const xrow = a=> '<div class="zpb-fm-row">' + a.map(x=>'<i style="--x:'+x[1]+'">'+x[0]+'</i>').join('') + '</div>';
 return '<div class="zpb-fm" role="img" aria-label="Field map: where each position lines up">'
  + '<div class="zpb-fm-side zpb-fm-off">'
  + xrow([['RB',-2],['FB',2]])
  + xrow([['QB',0]])
  + xrow([['WR',-5],['TE',-3],['OT',-2],['OG',-1],['C',0],['OG',1],['OT',2],['WR',4],['WR',5]])
  + '</div>'
  + '<div class="zpb-fm-scrim"><span>LINE OF SCRIMMAGE</span></div>'
  + '<div class="zpb-fm-side zpb-fm-def">'
  + xrow([['DE',-3],['DT',-1],['DT',1],['DE',3]])
  + xrow([['SAM',-2],['MIKE',0],['WILL',2]])
  + xrow([['CB',-5],['NICKEL',3],['CB',5]])
  + xrow([['DIME',3]])
  + xrow([['SS',-2],['FS',2]])
  + '</div>'
  + '</div>'""")

# ============================================================
# A2 (Owner): the belong map (starters at their stations) — same shared field
# ============================================================
E('A2_belongmap_rows',
"""  const row = (a, cls)=>'<div class="zpb-fm-row' + (cls ? ' ' + cls : '') + '">' + a.map(x=>cell(x[0], x[1])).join('') + '</div>';
  const lbl = s=>(typeof LABELS !== 'undefined' && LABELS[s]) ? LABELS[s] : s;
  const L = s=>[s, lbl(s)];
  const base34 = !!window.ZPB34;
  const dt1 = base34 ? 'NT' : lbl('DT1'), dt2 = base34 ? 'OLB1' : lbl('DT2');
  const mike = base34 ? 'ILB1' : lbl('MIKE'), will = base34 ? 'ILB2' : lbl('WILL'), sam = base34 ? 'OLB2' : lbl('SAM');
  return '<div class="zpb-fm" role="img" aria-label="Where they belong: your starters at their stations"' + (vars ? ' style="' + vars + '"' : '') + '>'
   + '<div class="zpb-fm-side zpb-fm-off">'
   + row([[ 'RB1', lbl('RB1')],['FB', lbl('FB')]])
   + row([L('QB')])
   + row([L('WR1'),L('TE1'),['OT1',lbl('OT1')],['OG1',lbl('OG1')],['C',lbl('C')],['OG2',lbl('OG2')],['OT2',lbl('OT2')],L('WR3'),L('WR2')], ' zpb-fm-line')
   + '</div>'
   + '<div class="zpb-fm-scrim"><span>LINE OF SCRIMMAGE</span></div>'
   + '<div class="zpb-fm-side zpb-fm-def">'
   + row([['DE1',lbl('DE1')],['DT1',dt1],['DT2',dt2],['DE2',lbl('DE2')]])
   + row([L('CB1'),L('CB2')], ' zpb-fm-wide')
   + row([L('CB3'),['DIME','Dime']])
   + row([['MIKE',mike],['WILL',will],['SAM',sam]])
   + row([L('FS'),L('SS')])
   + '</div>'
   + '</div>'
   + '<p class="narr" style="margin:6px 0 0;text-align:center;">Every starter wears his initials at the station he belongs to \\u2014 the nickel and the dime sit out in the slot, between the corners and the linebackers.</p>';""",
"""  const lbl = s=>(typeof LABELS !== 'undefined' && LABELS[s]) ? LABELS[s] : s;
  const base34 = !!window.ZPB34;
  const dt1 = base34 ? 'NT' : lbl('DT1'), dt2 = base34 ? 'OLB1' : lbl('DT2');
  const mike = base34 ? 'ILB1' : lbl('MIKE'), will = base34 ? 'ILB2' : lbl('WILL'), sam = base34 ? 'OLB2' : lbl('SAM');
  // w29 (Owner): one shared field, defense mirrored below the offense — every station
  // sits at its own --x. The corners stand across from the receivers; the nickel and
  // the dime sit in the slot gap between the offensive line and the receivers.
  const xrow = a=>'<div class="zpb-fm-row">' + a.map(x=>{
    const c = cell(x[0], x[1]);
    return c.replace('class="zpb-fm-ini', 'style="--x:' + x[2] + '" class="zpb-fm-ini');
  }).join('') + '</div>';
  const xL = (s,x)=>[s, lbl(s), x];
  return '<div class="zpb-fm" role="img" aria-label="Where they belong: your starters at their stations"' + (vars ? ' style="' + vars + '"' : '') + '>'
   + '<div class="zpb-fm-side zpb-fm-off">'
   + xrow([xL('RB1',-2),['FB', lbl('FB'), 2]])
   + xrow([xL('QB',0)])
   + xrow([xL('WR1',-5),xL('TE1',-3),xL('OT1',-2),xL('OG1',-1),xL('C',0),xL('OG2',1),xL('OT2',2),xL('WR3',4),xL('WR2',5)])
   + '</div>'
   + '<div class="zpb-fm-scrim"><span>LINE OF SCRIMMAGE</span></div>'
   + '<div class="zpb-fm-side zpb-fm-def">'
   + xrow([xL('DE1',-3),['DT1',dt1,-1],['DT2',dt2,1],xL('DE2',3)])
   + xrow([['SAM',sam,-2],['MIKE',mike,0],['WILL',will,2]])
   + xrow([xL('CB1',-5),xL('CB3',3),xL('CB2',5)])
   + xrow([['DIME','Dime',3]])
   + xrow([xL('SS',-2),xL('FS',2)])
   + '</div>'
   + '</div>'
   + '<p class="narr" style="margin:6px 0 0;text-align:center;">Every starter wears his initials at the station he belongs to \\u2014 the corners stand across from the receivers, and the nickel and the dime sit in the slot, in the gap between the line and the receivers.</p>';""")

# ============================================================
# B1+B2+C1 (Owner): the Defense-section front cards become a shared kit;
# the "Squares are the defensive line..." paragraph is removed.
# ============================================================
E('B1_defkit',
"""// W18: DEFENSE panel — the four packages drawn as fronts (Owner: creative viz, like the line-of-scrimmage map).
window.zpbDefGuideHTML = function(){
 // w26 (Owner): DL squares, LB triangles, DB circles; DT2, ILB2, SAM, NICKEL and DIME
 // wear their own colors, labeled at the bottom, lit in the fronts where they play.
 const COL = {DT2:'#4fa3a5',ILB2:'#a684e0',SAM:'#d98e4a',NICKEL:'#4f86e0',DIME:'#7fd67f'}; // w27 (Owner): Nickel and Dime wear colors no other dot claims
 const dot = (fam, c)=> '<i class="'+fam+(c?' '+c:'')+'"></i>';
 const dots = (lab, arr)=> '<div class="zpb-defdots"><span class="zpb-deflab">'+lab+'</span>' + arr.map(a=>dot(a[0],a[1])).join('') + '</div>';
 const row43  = dots('DL',[['z-dl'],['z-dl'],['z-dl','c-dt2'],['z-dl']]) + dots('LB',[['z-lb','c-sam'],['z-lb'],['z-lb']]) + dots('DB',[[''],[''],[''],['']]);
 const row34  = dots('DL',[['z-dl'],['z-dl'],['z-dl']]) + dots('LB',[['z-lb'],['z-lb','c-ilb2'],['z-lb'],['z-lb','c-sam']]) + dots('DB',[[''],[''],[''],['']]);
 const rowNK  = dots('DL',[['z-dl'],['z-dl'],['z-dl','c-dt2'],['z-dl']]) + dots('LB',[['z-lb'],['z-lb']]) + dots('DB',[[''],[''],['c-nk'],[''],['']]);
 const rowDM  = dots('DL',[['z-dl'],['z-dl'],['z-dl','c-dt2'],['z-dl']]) + dots('LB',[['z-lb']]) + dots('DB',[[''],[''],['c-nk'],[''],[''],['c-dm']]);
 const chipRow = inn=> '<div class="zpb-definout">' + Object.keys(COL).map(k=>'<span class="zpb-dl-chip'+(inn[k]?' in':'')+'"><i style="background:'+COL[k]+'"></i>'+k+'</span>').join('') + '</div>';
 const card = (t, rows, p, tip, inn)=>'<div class="zpb-defcard" title="'+tip.replace(/"/g,'&quot;')+'"><h5>'+t+'</h5>'+rows+'<p>'+p+'</p>'+chipRow(inn)+'</div>';
 return '<div class="zpb-defgrid">'
  + card('4-3', row43, 'Four down linemen and three linebackers \\u2014 the classic front. The SAM walks out over the tight end and the front four does the rushing.', '4-3 front: four defensive linemen, three linebackers, four defensive backs. Stronger against the run; a little thinner in coverage.', {DT2:1,SAM:1})
  + card('3-4', row34, 'Three down linemen and four linebackers. The nose tackle holds the middle while two outside linebackers stand up \\u2014 they rush on one call and drop on the next.', '3-4 front: an end slides out to linebacker, so the two outside linebackers become the pass rush. The same personnel, a different shape.', {ILB2:1,SAM:1})
  + card('NICKEL', rowNK, 'A linebacker comes off and an extra defensive back \\u2014 the nickel \\u2014 comes in: five defensive backs. The modern default when the offense throws.', 'Nickel: the extra defensive back replaces a linebacker. Better in coverage, a little softer against the run.', {DT2:1,NICKEL:1})
  + card('DIME', rowDM, 'A sixth defensive back comes in \\u2014 built for 3rd and long, 4th and long, and the end of the game when only a Hail Mary can beat you.', 'Dime: plays around 10% of the snaps, mainly on 3rd and long or 4th and long, especially at the end of the game, preventing Hail Marys.', {DT2:1,NICKEL:1,DIME:1})
  + '</div>'
  + '<div class="zpb-deflegend">' + Object.keys(COL).map(k=>'<span class="zpb-dl-chip"><i style="background:'+COL[k]+'"></i>'+k+'</span>').join('') + '</div>'
  + '<p class="narr" style="margin:8px 0 0;text-align:center;">Squares are the defensive line, triangles the linebackers, circles the defensive backs. The five named spots wear their own colors \\u2014 lit where they play, dimmed where they don\\u2019t.</p>';
};""",
"""// W18: DEFENSE panel — the four packages drawn as fronts (Owner: creative viz, like the line-of-scrimmage map).
// w29 (Owner): the front cards are a shared kit, so the Coaching section draws the very
// same visuals — DT2 always a square, ILB2 and SAM always triangles, the named colors kept.
window.zpbDefFrontKit = function(){
 // w26 (Owner): DL squares, LB triangles, DB circles; DT2, ILB2, SAM, NICKEL and DIME
 // wear their own colors, labeled at the bottom, lit in the fronts where they play.
 const COL = {DT2:'#4fa3a5',ILB2:'#a684e0',SAM:'#d98e4a',NICKEL:'#4f86e0',DIME:'#7fd67f'}; // w27 (Owner): Nickel and Dime wear colors no other dot claims
 const dot = (fam, c)=> '<i class="'+fam+(c?' '+c:'')+'"></i>';
 const dots = (lab, arr)=> '<div class="zpb-defdots"><span class="zpb-deflab">'+lab+'</span>' + arr.map(a=>dot(a[0],a[1])).join('') + '</div>';
 const row43  = dots('DL',[['z-dl'],['z-dl'],['z-dl','c-dt2'],['z-dl']]) + dots('LB',[['z-lb','c-sam'],['z-lb'],['z-lb']]) + dots('DB',[[''],[''],[''],['']]);
 const row34  = dots('DL',[['z-dl'],['z-dl'],['z-dl']]) + dots('LB',[['z-lb'],['z-lb','c-ilb2'],['z-lb'],['z-lb','c-sam']]) + dots('DB',[[''],[''],[''],['']]);
 const rowNK  = dots('DL',[['z-dl'],['z-dl'],['z-dl','c-dt2'],['z-dl']]) + dots('LB',[['z-lb'],['z-lb']]) + dots('DB',[[''],[''],['c-nk'],[''],['']]);
 const rowDM  = dots('DL',[['z-dl'],['z-dl'],['z-dl','c-dt2'],['z-dl']]) + dots('LB',[['z-lb']]) + dots('DB',[[''],[''],['c-nk'],[''],[''],['c-dm']]);
 const chipRow = inn=> '<div class="zpb-definout">' + Object.keys(COL).map(k=>'<span class="zpb-dl-chip'+(inn[k]?' in':'')+'"><i style="background:'+COL[k]+'"></i>'+k+'</span>').join('') + '</div>';
 const card = (t, rows, p, tip, inn)=>'<div class="zpb-defcard" title="'+tip.replace(/"/g,'&quot;')+'"><h5>'+t+'</h5>'+rows+'<p>'+p+'</p>'+chipRow(inn)+'</div>';
 return {COL:COL, dot:dot, dots:dots, row43:row43, row34:row34, rowNK:rowNK, rowDM:rowDM, chipRow:chipRow, card:card};
};
window.zpbDefGuideHTML = function(){
 const K = window.zpbDefFrontKit();
 return '<div class="zpb-defgrid">'
  + K.card('4-3', K.row43, 'Four down linemen and three linebackers \\u2014 the classic front. The SAM walks out over the tight end and the front four does the rushing.', '4-3 front: four defensive linemen, three linebackers, four defensive backs. Stronger against the run; a little thinner in coverage.', {DT2:1,SAM:1})
  + K.card('3-4', K.row34, 'Three down linemen and four linebackers. The nose tackle holds the middle while two outside linebackers stand up \\u2014 they rush on one call and drop on the next.', '3-4 front: an end slides out to linebacker, so the two outside linebackers become the pass rush. The same personnel, a different shape.', {ILB2:1,SAM:1})
  + K.card('NICKEL', K.rowNK, 'A linebacker comes off and an extra defensive back \\u2014 the nickel \\u2014 comes in: five defensive backs. The modern default when the offense throws.', 'Nickel: the extra defensive back replaces a linebacker. Better in coverage, a little softer against the run.', {DT2:1,NICKEL:1})
  + K.card('DIME', K.rowDM, 'A sixth defensive back comes in \\u2014 built for 3rd and long, 4th and long, and the end of the game when only a Hail Mary can beat you.', 'Dime: plays around 10% of the snaps, mainly on 3rd and long or 4th and long, especially at the end of the game, preventing Hail Marys.', {DT2:1,NICKEL:1,DIME:1})
  + '</div>'
  + '<div class="zpb-deflegend">' + Object.keys(K.COL).map(k=>'<span class="zpb-dl-chip"><i style="background:'+K.COL[k]+'"></i>'+k+'</span>').join('') + '</div>';
};""")

# ============================================================
# B1 (Owner): the Coaching section draws the Defense-section visuals
# ============================================================
E('B1_pkcviz',
""" return '<div class="zpb-pkg">'
  + '<div class="zpb-pkgcard"><h5>4-3</h5><div class="zpb-pkgdots">'+dot(4)+'<i class="db"></i>'+dot(3)+'</div><p>Four down linemen, three linebackers. Stronger against the run, a little thinner in coverage.</p></div>'
  + '<div class="zpb-pkgcard"><h5>3-4</h5><div class="zpb-pkgdots">'+dot(3)+'<i class="db"></i><i class="ldiff"></i>'+dot(3)+'<i class="ldiff"></i></div><p>The nose tackle holds the middle and a defensive tackle slides out — a linebacker family of two inside, two outside.</p></div>'
  + '<div class="zpb-pkgcard"><h5>Nickel</h5><div class="zpb-pkgdots">'+dot(4)+'<i class="db"></i><i class="ldiff"></i>'+dot(2)+'<i class="ldiff"></i><i></i></div><p>Nickel takes a linebacker off and puts an extra defensive back on. The modern default.</p></div>'
  + '<div class="zpb-pkgcard"><h5>Focus</h5><div class="zpb-pkgdots">'+badge('pass')+' '+badge('run')+' '+badge('bal')+'</div><p>The same personnel can lean pass, lean run, or stay even — the badge shows the lean at a glance.</p></div>'
  + '</div>';""",
""" const K = window.zpbDefFrontKit(); // w29 (Owner): the coaching cards ARE the Defense-section visuals — same dots, same colors, DT2 always a square, ILB2 and SAM always triangles
 return '<div class="zpb-defgrid">'
  + K.card('4-3', K.row43, 'Four down linemen, three linebackers. Stronger against the run, a little thinner in coverage.', '4-3 front: four defensive linemen, three linebackers, four defensive backs.', {DT2:1,SAM:1})
  + K.card('3-4', K.row34, 'The nose tackle holds the middle and a defensive tackle slides out \\u2014 a linebacker family of two inside, two outside.', '3-4 front: three defensive linemen, four linebackers.', {ILB2:1,SAM:1})
  + K.card('NICKEL', K.rowNK, 'Nickel takes a linebacker off and puts an extra defensive back on. The modern default.', 'Nickel front: five defensive backs.', {DT2:1,NICKEL:1})
  + '<div class="zpb-defcard"><h5>FOCUS</h5><div class="zpb-defdots">'+badge('pass')+' '+badge('run')+' '+badge('bal')+'</div><p>The same personnel can lean pass, lean run, or stay even \\u2014 the badge shows the lean at a glance.</p></div>'
  + '</div>';""")

# the now-unused plain dot() helper in zpbPkgVizHTML is removed with the viz it served
E('B1_pkcdot',
""" const dot = n => Array.from({length:n}, ()=>'<i></i>').join('');
 const badge = kind => kind==='pass'""",
""" const badge = kind => kind==='pass'""")

# ============================================================
# C2 (Owner): Coaching Philosophy — the Auto sentence is gone; the two
# remaining sentences sit centered, one on top of the other.
# ============================================================
E('C2_philosophy',
"""   + zpbSw('COACHING PHILOSOPHY', 'Your default style, set on the Preseason page. If you leave it on Auto, the math picks the style that does best for your roster against an average team. Opponents scout it, and the recaps point out when you stray from it.')""",
"""   + zpbSw('COACHING PHILOSOPHY', 'Your default style, set on the Preseason page.<br>Opponents scout it, and the recaps point out when you stray from it.') // w29 (Owner): the Auto sentence is gone; the two lines sit centered, one on top of the other""")

print('stage-1 edits applied:', len(applied))
io.open('/home/z/my-project/scripts/w29-stage1.done', 'w').write('\n'.join(applied))
io.open(OUT[:-5] + '.stage1.html', 'w', encoding='utf-8').write(html)
