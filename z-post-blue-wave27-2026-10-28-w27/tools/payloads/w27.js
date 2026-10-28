<script id="zpb-w27-js">
// ============ Z-POST-BLUE W27 JS ============
// Where they belong — the draft pick drawn on the field, the guide's field-map format,
// each starter's initials at his station. Nickel and Dime share the slot line between
// the cornerbacks and the linebackers (Owner, 28 Oct 2026).
window.zpbBelongMapHTML = function(entry){
 try{
  if(!entry || !entry.slotmap) return '';
  const nse = (typeof normalizeSlotEntry === 'function') ? normalizeSlotEntry : function(x){ return x; };
  const vars = (entry.teamName && typeof zpbRowVars === 'function') ? zpbRowVars(entry.teamName) : '';
  const ini = n=>{ if(!n) return ''; const w = String(n).trim().split(/\s+/); return ((w[0][0]||'') + (w.length>1 ? w[w.length-1][0] : '')).toUpperCase(); };
  const cell = (sl, lab)=>{
   let e = null;
   if(sl==='DIME'){ const d = window.zpbDimeOf ? window.zpbDimeOf(entry.slotmap) : null; e = d ? nse(d) : null; }
   else { const p = entry.slotmap[sl]; e = p ? nse(p) : null; }
   if(!e || !e.name) return '<i class="zpb-fm-ini zpb-empty"><b>&middot;</b><i>' + lab + '</i></i>';
   let ov = e.ovr; try{ if(typeof effOvr === 'function' && sl !== 'DIME') ov = effOvr(e, sl); }catch(err){}
   const cls = ov>=90 ? 'zpb-shm' : (ov>=85 ? 'zpb-vib' : '');
   return '<i class="zpb-fm-ini ' + cls + '" title="' + String(e.name).replace(/"/g,'&quot;') + (ov ? ' \u00b7 ' + Math.round(ov) : '') + '"><b>' + ini(e.name) + '</b><i>' + lab + '</i></i>';
  };
  const row = (a, cls)=>'<div class="zpb-fm-row' + (cls ? ' ' + cls : '') + '">' + a.map(x=>cell(x[0], x[1])).join('') + '</div>';
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
   + '<p class="narr" style="margin:6px 0 0;text-align:center;">Every starter wears his initials at the station he belongs to \u2014 the nickel and the dime sit out in the slot, between the corners and the linebackers.</p>';
 }catch(err){ return ''; }
};
</script>
