#!/usr/bin/env python3
# w30_patch.py — Z.ai session 22 · wave 30 stage 1: asserted exact replacements on the w29 bytes.
# Every entry must match EXACTLY ONCE (unless count says otherwise) or the patch aborts.
import io, sys, hashlib

SRC = '/home/z/my-project/scripts/w30-base.html'
DST = '/home/z/my-project/download/Football-Sim-Z-post-blue-w30.html'

E = []  # (old, new, expected_count)

# ---------- A1 · ANCHOR chip color is applied in the w30 CSS payload (w30_patch2 writes it) ----------

# ---------- A3 · player browser: AGI/COD/INJ/AWR removed; panel narrows via payload CSS ----------
E.append((
    '<th data-col="str">STR</th>\n     <th data-col="agi">AGI</th><th data-col="cod">COD</th><th data-col="inj">INJ</th><th data-col="awr">AWR</th>',
    '<th data-col="str">STR</th>',
    1))

E.append((
    'h += `<tr style="${zpbTv}"><td class="zpb-pb-name ${cls}">${name}</td><td><span class="zpb-poschip">${pos}</span></td><td class="zpb-pb-team">${team}</td><td class="score">${ovr}</td><td class="num">${spd}</td><td class="num">${str_}</td><td class="num">${agi}</td><td>${cod}</td><td class="num">${inj}</td><td class="num">${awr}</td></tr>`;',
    'h += `<tr style="${zpbTv}"><td class="zpb-pb-name ${cls}">${name}</td><td><span class="zpb-poschip">${pos}</span></td><td class="zpb-pb-team">${team}</td><td class="score">${ovr}</td><td class="num">${spd}</td><td class="num">${str_}</td></tr>`; // w30 (Owner): AGI, COD, INJ and AWR are gone from the site',
    1))

E.append((
    'if(!pageRows.length) h = `<tr><td colspan="10" style="text-align:center;color:var(--sub);padding:18px 0;">No players match your filters.</td></tr>`;',
    'if(!pageRows.length) h = `<tr><td colspan="6" style="text-align:center;color:var(--sub);padding:18px 0;">No players match your filters.</td></tr>`;',
    1))

# ---------- B1 · THE SERIES defaults to 7 · QB + CB1 + DE1 + CB2 + WR1 + DE2 + OT1 ----------
E.append((
    " sel.value = 'SEC';\n sel.addEventListener('change', renderGroups);\n renderGroups();\n setTimeout(zpbEnsureSeriesOptions, 0); // ROSTER_SLOTS is a const declared later in this script — inject after load",
    " sel.value = 'SEC';\n sel.addEventListener('change', renderGroups);\n renderGroups();\n setTimeout(zpbEnsureSeriesOptions, 0); // ROSTER_SLOTS is a const declared later in this script — inject after load\n // w30 (Owner): series 7 — QB + CB1 + DE1 + CB2 + WR1 + DE2 + OT1 — is the site default",
    1))

E.append((
    " sel.appendChild(og);\n}",
    " sel.appendChild(og);\n if(sel.dataset.zpbDefault !== '1'){ // w30 (Owner): the site opens on series 7\n  sel.dataset.zpbDefault = '1';\n  if(String(sel.value).indexOf('zpbS:') !== 0){ sel.value = 'zpbS:7'; try{ renderGroups(); }catch(err){} }\n }\n}",
    1))

# ---------- C2 · comparison dropdowns: the full team name everywhere, menu wide enough ----------
E.append((
    " const zpbNickOf = t=> (t||'').split(' ').slice(-1)[0];\n const zpbWideScr = ()=> (window.innerWidth||1280) >= 1100;\n function buildOptions(sel, defaultVal){\n  const n = t=> zpbWideScr() ? t : zpbNickOf(t);",
    " function buildOptions(sel, defaultVal){\n  const n = t=> t; // w30 (Owner): the full team name at every width — \"Kansas City Chiefs\", never \"Kansas City\" — and the menu is wide enough for the longest name",
    1))

# ---------- D1/D2 · the field maps: CBs over the LOS opposite the WRs, Nickel left of Mike, Dime where the Nickel is ----------
E.append((
    "  + xrow([['DE',-3],['DT',-1],['DT',1],['DE',3]])\n  + xrow([['SAM',-2],['MIKE',0],['WILL',2]])\n  + xrow([['CB',-5],['NICKEL',3],['CB',5]])\n  + xrow([['DIME',3]])\n  + xrow([['SS',-2],['FS',2]])",
    "  + xrow([['CB',-5],['NICKEL',-3],['CB',5]])\n  + xrow([['DIME',-3]])\n  + xrow([['DE',-3],['DT',-1],['DT',1],['DE',3]])\n  + xrow([['SAM',-2],['MIKE',0],['WILL',2]])\n  + xrow([['SS',-2],['FS',2]])",
    1))

E.append((
    " // w29 (Owner): the defense lines up ACROSS from the offense, below it — one shared field,\n // each defender mirrored over his man. The WRs stand an extra bubble out toward the\n // sidelines, the CBs line up directly across from them, and the nickel and the dime sit\n // in the slot gap between the offensive line and the receivers.",
    " // w29 (Owner): the defense lines up ACROSS from the offense, below it — one shared field,\n // each defender mirrored over his man. w30 (Owner): the corners press at the line of\n // scrimmage, directly opposite the receivers; the nickel keeps that station but moves to\n // the left side of the mike, and the dime takes exactly the nickel's spot, stacked behind.",
    1))

E.append((
    "   + xrow([xL('DE1',-3),['DT1',dt1,-1],['DT2',dt2,1],xL('DE2',3)])\n   + xrow([['SAM',sam,-2],['MIKE',mike,0],['WILL',will,2]])\n   + xrow([xL('CB1',-5),xL('CB3',3),xL('CB2',5)])\n   + xrow([['DIME','Dime',3]])\n   + xrow([xL('SS',-2),xL('FS',2)])",
    "   + xrow([xL('CB1',-5),xL('CB3',-3),xL('CB2',5)])\n   + xrow([['DIME','DIME',-3]])\n   + xrow([xL('DE1',-3),['DT1',dt1,-1],['DT2',dt2,1],xL('DE2',3)])\n   + xrow([['SAM',sam,-2],['MIKE',mike,0],['WILL',will,2]])\n   + xrow([xL('SS',-2),xL('FS',2)])",
    1))

E.append((
    "  // w29 (Owner): one shared field, defense mirrored below the offense — every station\n  // sits at its own --x. The corners stand across from the receivers; the nickel and\n  // the dime sit in the slot gap between the offensive line and the receivers.",
    "  // w29 (Owner): one shared field, defense mirrored below the offense — every station\n  // sits at its own --x. w30 (Owner): the corners press over the line of scrimmage\n  // directly across from the receivers, the nickel holds that station left of the mike,\n  // and the dime stacks exactly where the nickel is.",
    1))

E.append((
    "Every starter wears his initials at the station he belongs to \\u2014 the corners stand across from the receivers, and the nickel and the dime sit in the slot, in the gap between the line and the receivers.",
    "Every starter wears his initials at the station he belongs to \\u2014 the corners press over the line of scrimmage across from the receivers, the nickel sits left of the mike, and the dime stacks exactly where the nickel is.",
    1))

# ---------- D3 · the key keeps the shapes: DT2 square, ILB2/SAM triangles, NICKEL/DIME circles ----------
E.append((
    " const chipRow = inn=> '<div class=\"zpb-definout\">' + Object.keys(COL).map(k=>'<span class=\"zpb-dl-chip'+(inn[k]?' in':'')+'\"><i style=\"background:'+COL[k]+'\"></i>'+k+'</span>').join('') + '</div>';",
    " // w30 (Owner): the key wears the same shapes as the field — DT2 a square, ILB2 and SAM\n // triangles, the defensive backs circles.\n const keyChip = (k, inn)=>{ const tri = (k==='ILB2'||k==='SAM'), circ = (k==='NICKEL'||k==='DIME');\n  const st = tri ? 'color:'+COL[k] : 'background:'+COL[k];\n  return '<span class=\"zpb-dl-chip'+(inn&&inn[k]?' in':'')+'\"><i class=\"'+(tri?'k-tri':(circ?'k-circ':''))+'\" style=\"'+st+'\"></i>'+k+'</span>';\n };\n const chipRow = inn=> '<div class=\"zpb-definout\">' + Object.keys(COL).map(k=>keyChip(k,inn)).join('') + '</div>';",
    1))

E.append((
    " return {COL:COL, dot:dot, dots:dots, row43:row43, row34:row34, rowNK:rowNK, rowDM:rowDM, chipRow:chipRow, card:card};",
    " return {COL:COL, dot:dot, dots:dots, row43:row43, row34:row34, rowNK:rowNK, rowDM:rowDM, chipRow:chipRow, keyChip:keyChip, card:card};",
    1))

E.append((
    "  + '<div class=\"zpb-deflegend\">' + Object.keys(K.COL).map(k=>'<span class=\"zpb-dl-chip\"><i style=\"background:'+K.COL[k]+'\"></i>'+k+'</span>').join('') + '</div>';",
    "  + '<div class=\"zpb-deflegend\">' + Object.keys(K.COL).map(k=>K.keyChip(k,null)).join('') + '</div>';",
    1))

# ---------- E1 · the next-pick X.Y: Cinzel Decorative, unbolded, same size ----------
E.append((
    ".zpb-nextpick{font-size:1.55rem !important;font-weight:800 !important;color:var(--tA,var(--accent)) !important;letter-spacing:.04em;}",
    ".zpb-nextpick{font-size:1.55rem !important;font-weight:400 !important;font-family:'Cinzel Decorative','Cinzel','Bodoni Moda',Georgia,serif !important;color:var(--tA,var(--accent)) !important;letter-spacing:.04em;} /* w30 (Owner): Cinzel Decorative, unbolded — the size was already right */",
    1))

# ---------- F1 · the Dime row is formatted like every other position ----------
E.append((
    ".depth-row.zpb-dimerow .slotname{background:transparent;color:var(--tA2,var(--gold3));border-color:transparent;padding-left:0;padding-right:0;}\n.depth-row.zpb-dimerow .playername{color:var(--text);}\n",
    "",
    1))

E.append((
    ".zpb-dimerow.dgrid .slotname{background:var(--gold2,var(--accent));color:var(--ongold,var(--text));border:1px solid var(--gold3,var(--border));padding-left:0;padding-right:0;}\n",
    "",
    1))

E.append((
    "return `<div class=\"depth-row zpb-dimerow\"><span class=\"slotname\">Dime</span><span class=\"${e&&e.name!=null?'playername':'empty'}\">${nm}</span></div>`;",
    "return `<div class=\"depth-row\"><span class=\"slotname\">DIME</span><span class=\"${e&&e.name!=null?'playername':'empty'}\">${nm}</span></div>`; // w30 (Owner): the Dime row is formatted exactly like every other position",
    1))

E.append((
    "return `<div class=\"depth-row dgrid zpb-dimerow\"${zst?` style=\"${zst}\"`:''}><span class=\"slotname\">Dime</span><span class=\"${d?'playername':'empty'} ${cls}\">${d?d[0]:''}</span><span class=\"dovr\">${d?d[3]:''}</span><span class=\"narr dwar\"></span></div>`; // w19 (Owner): no box, no dash, no PKG chip",
    "return `<div class=\"depth-row dgrid\"${zst?` style=\"${zst}\"`:''}><span class=\"slotname\">DIME</span><span class=\"${d?'playername':'empty'} ${cls}\">${d?d[0]:''}</span><span class=\"dovr\">${d?d[3]:''}</span><span class=\"narr dwar\"></span></div>`; // w19 (Owner): no box, no dash, no PKG chip · w30 (Owner): standard row format, DIME like the rest",
    1))

E.append((
    "if(s==='CB3'){ rows += zpbLuA(cellOf(slotmapLeft,'CB4',fL), cellOf(slotmapRight,'CB4',fR), 'Dime'); }",
    "if(s==='CB3'){ rows += zpbLuA(cellOf(slotmapLeft,'CB4',fL), cellOf(slotmapRight,'CB4',fR), 'DIME'); } // w30 (Owner): DIME reads like every other slot",
    1))

# ---------- F2 · TE3, WR4 and DL5 join every visual depth list; DL enters the glossary ----------
E.append((
    "const DEPTH_CHART_GROUPS = [\n ['Offense', 'off', ['QB','RB1','RB2','FB','WR1','WR2','WR3','TE1','TE2','OT1','OG1','C','OG2','OT2']],\n ['Defense', 'def', ['DE1','DT1','DT2','DE2','MIKE','WILL','SAM','CB1','CB2','FS','SS','CB3']], // w26 (Owner): Nickel beside Dime at the bottom,\n ['Special Teams', 'st', ['K','P']]\n];",
    "const DEPTH_CHART_GROUPS = [\n ['Offense', 'off', ['QB','RB1','RB2','FB','WR1','WR2','WR3','WR4','TE1','TE2','TE3','OT1','OG1','C','OG2','OT2']],\n ['Defense', 'def', ['DE1','DT1','DT2','DE2','DL5','MIKE','WILL','SAM','CB1','CB2','FS','SS','CB3']], // w26 (Owner): Nickel beside Dime at the bottom · w30 (Owner): WR4, TE3 and DL5 join every visual menu (display only — the math is Claude's lane)\n ['Special Teams', 'st', ['K','P']]\n];",
    1))

E.append((
    "return `<option value=\"${p[0].replace(/\"/g,'&quot;')}\" ${cur&&cur[0]===p[0]?'selected':''}>${p[0]}</option>`; // w19 (Owner): the box carries the name, nothing else\n   }).join('');",
    "return `<option value=\"${p[0].replace(/\"/g,'&quot;')}\" ${cur&&cur[0]===p[0]?'selected':''}>${p[0]}</option>`; // w19 (Owner): the box carries the name, nothing else\n   }).join('') || '<option value=\"\" disabled>\\u2014</option>'; // w30: a depth slot with no eligible player yet still shows its row",
    1))

E.append((
    "  ['Nickel','A defense with five defensive backs — CB3 comes on, a linebacker comes off.'],",
    "  ['Nickel','A defense with five defensive backs — CB3 comes on, a linebacker comes off.'],\n  ['Defensive line (DL)','The front of the defense — the big men lined up directly across from the offensive line: the ends (DE) rush the edge, the tackles (DT) take on blockers inside. DL5 is the fifth lineman, a rotation rusher.'],\n  ['TE3 / WR4 / DL5','The third tight end, the fourth receiver and the fifth defensive lineman — rotation depth slots shown on the depth chart and in every lineup menu.'],",
    1))

# ---------- G1 · the post-draft cinematic lingers two full seconds less ----------
E.append((
    "const hold = [1500, 1500, 900, 3400]; // w27 (Owner): 20-0 appears ~2s faster",
    "const hold = [1500, 1500, 900, 2400]; // w27 (Owner): 20-0 appears ~2s faster · w30 (Owner): the linger is a full two seconds shorter (hold and fade delay each give a second back)",
    1))

E.append((
    "setTimeout(()=>{ ov.style.transition='opacity 1.2s ease'; ov.style.opacity='0';     setTimeout(()=>ov.remove(), 1300); }, reduce ? 400 : 1600);",
    "setTimeout(()=>{ ov.style.transition='opacity 1.2s ease'; ov.style.opacity='0';     setTimeout(()=>ov.remove(), 1300); }, reduce ? 400 : 600);",
    1))

# ---------- H6 · safeties record the offensive player tackled in his own end zone ----------
E.append((
    "  const mates = sackers.filter(x=>x!==s); // w28 (Owner): a safety is never a solo act — a second defender is always in on it\n  const s2 = mates.length ? weightedPick(mates.map(x=>({item:x, w:sackW[x]*ovrFactor(bySlot[x].e.ovr,45)}))) : s;\n  safeties.push({n1:bySlot[s].e.name, n2:bySlot[s2].e.name});",
    "  const mates = sackers.filter(x=>x!==s); // w28 (Owner): a safety is never a solo act — a second defender is always in on it\n  const s2 = mates.length ? weightedPick(mates.map(x=>({item:x, w:sackW[x]*ovrFactor(bySlot[x].e.ovr,45)}))) : s;\n  // w30 (Owner): the line names the defender AND the player tackled — most often the quarterback, but it can be any ball carrier\n  const vs2 = extra.oppVictims || {qb:'', rest:[]};\n  const victim = (vs2.qb && Math.random()<0.62) ? vs2.qb : (vs2.rest.length ? vs2.rest[Math.floor(Math.random()*vs2.rest.length)] : (vs2.qb || ''));\n  safeties.push({n1:bySlot[s].e.name, n2:bySlot[s2].e.name, v:victim});",
    1))

E.append((
    " const hDef = buildDefenseDetail(homeSM, g.home, aOff.giveaways, r.awayStats.sacks, {causes:hCauses}, {defTD:hDT, saf:r.homeEvents.filter(e=>e.type==='SAF').length, oppOwnFum:aOff.ownRecFum});\n const aDef = buildDefenseDetail(awaySM, g.away, hOff.giveaways, r.homeStats.sacks, {causes:aCauses}, {defTD:aDT, saf:r.awayEvents.filter(e=>e.type==='SAF').length, oppOwnFum:hOff.ownRecFum});",
    " const victimsOf = det=>{ const qb = det.players.find(p=>p.group==='QB'); const rest = det.players.filter(p=>p.group==='RB'||p.group==='FB'||p.group==='WR'||p.group==='TE').map(p=>p.name); return {qb: qb?qb.name:'', rest}; }; // w30 (Owner): who can be tackled in his own end zone\n const hDef = buildDefenseDetail(homeSM, g.home, aOff.giveaways, r.awayStats.sacks, {causes:hCauses}, {defTD:hDT, saf:r.homeEvents.filter(e=>e.type==='SAF').length, oppOwnFum:aOff.ownRecFum, oppVictims:victimsOf(aOff)});\n const aDef = buildDefenseDetail(awaySM, g.away, hOff.giveaways, r.homeStats.sacks, {causes:aCauses}, {defTD:aDT, saf:r.awayEvents.filter(e=>e.type==='SAF').length, oppOwnFum:hOff.ownRecFum, oppVictims:victimsOf(hOff)});",
    1))

# ---------- H2/H4 supporting record: defensive scores carry the man who lost the ball ----------
E.append((
    "const dtq = ((g.detail && g.detail[sd] && g.detail[sd].defScores) || []).slice().sort((a,b)=>(a.q-b.q)).map(d=>({name:d.name, kind:d.type}));",
    "const dtq = ((g.detail && g.detail[sd] && g.detail[sd].defScores) || []).slice().sort((a,b)=>(a.q-b.q)).map(d=>({name:d.name, kind:d.type, from:d.from})); // w30 (Owner): the return TD names the man who lost the ball",
    1))

# ---------- H7 · every dark color lifted on the during-game screen ----------
E.append((
    "const colOf = tm=>{ const pk = (typeof zpbPackFor==='function') ? zpbPackFor(tm) : null; return pk ? pk.accL : 'var(--accent)'; };",
    "const colOf = tm=>{ const pk = (typeof zpbPackFor==='function') ? zpbPackFor(tm) : null; if(!pk) return 'var(--accent)';\n   // w30 (Owner): every dark team color is lifted on the during-game screen — nothing is unreadable\n   const _t = document.documentElement.getAttribute('data-theme');\n   const dark = _t==='dark' || (!_t && !(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches));\n   const base = dark ? pk.accD : pk.accL;\n   try{ return (dark && window.zpbLift) ? zpbLift(base, 0.62) : base; }catch(err){ return base; } };",
    1))

# ---------- I1 · carries read CAR; I2 · sacks always SK, never SKS ----------
E.append((
    " else if(group==='RB'){ parts.push(`${s.car||0} C`, `${s.rushYds||0} RUSHY`);",
    " else if(group==='RB'){ parts.push(`${s.car||0} CAR`, `${s.rushYds||0} RUSHY`);",
    1))

E.append((
    " else { if(s.sack) parts.push(`${s.sack} SK${s.sack===1?'':'S'}`);",
    " else { if(s.sack) parts.push(`${s.sack} SK`);",
    1))

E.append((
    " // w28 (Owner): the badge law — every token capitalized; C, RUSHY, PASSY, RECY, Y, SK/SKS, SAF, PRSS",
    " // w28 (Owner): the badge law — every token capitalized; CAR, RUSHY, PASSY, RECY, Y, SK, SAF, PRSS · w30 (Owner): C is now CAR, and sacks read SK in every count",
    1))

E.append((
    "  {title:'Defensive Line', group:'DL', key:'sack', cols:[['SKS',r=>r.st.sack||0],['TFL',r=>r.st.tfl||0],['PRSS',r=>r.st.hur||0],['Tkl',r=>r.st.tkl||0],['FF',r=>r.st.ff||0],['FR',r=>r.st.fr||0],['Def TD',r=>r.st.dtd||0]]},\n  {title:'Linebackers', group:'LB', key:'tkl', cols:[['Tkl',r=>r.st.tkl||0],['TFL',r=>r.st.tfl||0],['SKS',r=>r.st.sack||0],['INT',r=>r.st.dint||0],['FF',r=>r.st.ff||0],['FR',r=>r.st.fr||0],['Def TD',r=>r.st.dtd||0]]},",
    "  {title:'Defensive Line', group:'DL', key:'sack', cols:[['SK',r=>r.st.sack||0],['TFL',r=>r.st.tfl||0],['PRSS',r=>r.st.hur||0],['Tkl',r=>r.st.tkl||0],['FF',r=>r.st.ff||0],['FR',r=>r.st.fr||0],['Def TD',r=>r.st.dtd||0]]}, // w30 (Owner): never SKS — always SK\n  {title:'Linebackers', group:'LB', key:'tkl', cols:[['Tkl',r=>r.st.tkl||0],['TFL',r=>r.st.tfl||0],['SK',r=>r.st.sack||0],['INT',r=>r.st.dint||0],['FF',r=>r.st.ff||0],['FR',r=>r.st.fr||0],['Def TD',r=>r.st.dtd||0]]},",
    1))

E.append((
    " // w28 (Owner): the badge law across the season lines — C, RUSHY, PASSY, RECY, SK/SKS, PRSS, FG made/attempts",
    " // w28 (Owner): the badge law across the season lines — CAR, RUSHY, PASSY, RECY, SK, PRSS, FG made/attempts (w30: C→CAR, never SKS)",
    1))

E.append((
    "+ schip('300', 'C', 'Carries \\u2014 the handoffs the back took.') // w28 (Owner): carries read C",
    "+ schip('300', 'CAR', 'Carries \\u2014 the handoffs the back took.') // w30 (Owner): carries read CAR",
    1))

# ---------- J1 · every dropdown title capitalized ----------
for old, new in [
    ("More advanced stats: how your team scored and protected the ball", "MORE ADVANCED STATS: HOW YOUR TEAM SCORED AND PROTECTED THE BALL"),
    ("Advanced stats: what really produced sacks and runs", "ADVANCED STATS: WHAT REALLY PRODUCED SACKS AND RUNS"),
    ("Why better or worse than the ratings?", "WHY BETTER OR WORSE THAN THE RATINGS?"),
    ("Why this style? (the simple math)", "WHY THIS STYLE? (THE SIMPLE MATH)"),
    ("Why these plans?", "WHY THESE PLANS?"),
    ("How a 2-Pt Conversion works", "HOW A 2-PT CONVERSION WORKS"),
    ("New to flexing? Read this first", "NEW TO FLEXING? READ THIS FIRST"),
    ("Offense: every style with your roster", "OFFENSE: EVERY STYLE WITH YOUR ROSTER"),
    ("Defense: every style with your roster", "DEFENSE: EVERY STYLE WITH YOUR ROSTER"),
    ("What do these terms mean? (personnel, packages)", "WHAT DO THESE TERMS MEAN? (PERSONNEL, PACKAGES)"),
    ("Lineup and flexes <span", "LINEUP AND FLEXES <span"),
    ("What separated the playoff teams <span", "WHAT SEPARATED THE PLAYOFF TEAMS <span"),
    ("Draft critique: your pick order, pick by pick", "DRAFT CRITIQUE: YOUR PICK ORDER, PICK BY PICK"),
    ("Regular-Season Awards &amp; Honors", "REGULAR-SEASON AWARDS &amp; HONORS"),
]:
    E.append((old, new, 2 if old.startswith('Regular-Season') else 1))

# ---------- Guide badge law: FR and FUM leave the during-game screen, FF and SAF speak the new lines ----------
E.append((
    "  + chip('INT', 'Interception \\u2014 the pass was caught by the defense.')\n  + chip('FF', 'Forced fumble \\u2014 the defender knocked the ball out.')\n  + chip('FR', 'Fumble recovery \\u2014 the ball was picked up by the defense.')\n  + chip('FUM', 'Fumble \\u2014 the ball came loose; the line names who lost it.')\n  + chip('SAF', 'Safety \\u2014 two points; the play names both defenders in on the tackle.')",
    "  + chip('INT', 'Interception \\u2014 the pass was caught by the defense; the line reads who caught it and who threw it.')\n  + chip('FF', 'Forced fumble \\u2014 one line: the defender who knocked the ball out, the box, then the player who fumbled it away.')\n  + chip('SAF', 'Safety \\u2014 two points; the line reads the defender who caused it and the player tackled in his own end zone.')",
    1))

# ---------- K1 · the schedule is shuffled: six division rounds land on random weeks ----------
E.append((
    "function generateDivisionWeeks(){\n const weeks = [[],[],[],[],[],[]];\n Object.values(NFL_DIVISIONS).forEach(([a,b,c,d])=>{\n  weeks[0].push([a,b]); weeks[0].push([c,d]);\n  weeks[1].push([a,c]); weeks[1].push([b,d]);\n  weeks[2].push([a,d]); weeks[2].push([b,c]);\n  weeks[3].push([b,a]); weeks[3].push([d,c]);\n  weeks[4].push([c,a]); weeks[4].push([d,b]);\n  weeks[5].push([d,a]); weeks[5].push([c,b]);\n });\n return weeks;\n}",
    "function generateDivisionWeeks(){\n // w30 (Owner): the calendar is shuffled — each division's six rounds land in a random order,\n // so the same rival no longer shows up in the same week every season. Every round is still a\n // full matching of the division, and every rival still meets once at home and once away.\n const weeks = [[],[],[],[],[],[]];\n Object.values(NFL_DIVISIONS).forEach((tm)=>{\n  const a=tm[0], b=tm[1], c=tm[2], d=tm[3];\n  const rounds = [\n   [[a,b],[c,d]], [[a,c],[b,d]], [[a,d],[b,c]],\n   [[b,a],[d,c]], [[c,a],[d,b]], [[d,a],[c,b]]\n  ];\n  shuffleArr(rounds).forEach((pairs,i)=> pairs.forEach(p=>weeks[i].push(p)));\n });\n return weeks;\n}",
    1))

E.append((
    " // Every round is a full matching of all teams, so rounds can be dropped into any calendar week.\n // Division rounds are spread evenly; the home/away rematch with each rival lands ~9 weeks after the first meeting.\n const DIV_WEEK_NUMBERS = [2,5,8,11,14,17];",
    " // Every round is a full matching of all teams, so rounds can be dropped into any calendar week.\n // w30 (Owner): the six division rounds land on six random weeks (never back to back), so the\n // whole calendar — opponents, order, home/away — is different every season. The user still\n // plays every division rival once at home and once away.\n let DIV_WEEK_NUMBERS = null, _dvTries = 0;\n while(!DIV_WEEK_NUMBERS && _dvTries++ < 500){\n  const cand = shuffleArr(Array.from({length:17}, (_,i)=>i+1)).slice(0,6).sort((x,y)=>x-y);\n  let ok = true; for(let i=1;i<cand.length;i++) if(cand[i]-cand[i-1] < 2) ok = false;\n  if(ok) DIV_WEEK_NUMBERS = cand;\n }\n if(!DIV_WEEK_NUMBERS) DIV_WEEK_NUMBERS = [2,5,8,11,14,17];",
    1))

# ---------- L1 · SIM GAME beside SIM SEASON: one real game, then the Game Review ----------
E.append((
    "${myGame?'':'<button class=\"resetbtn zpb-ctabig\" id=\"simWeekBtn\" style=\"width:auto;margin:0;padding:12px 30px;\">Simulate Week '+week+'</button>'}<button class=\"tabbtn zpb-ctasmall zpb-simseason\" id=\"simSeasonBtn\">SIM SEASON</button>",
    "${myGame?'':'<button class=\"resetbtn zpb-ctabig\" id=\"simWeekBtn\" style=\"width:auto;margin:0;padding:12px 30px;\">Simulate Week '+week+'</button>'}${myGame?'<button class=\"tabbtn zpb-ctasmall zpb-simgame\" id=\"simGameBtn\">SIM GAME</button>':''}<button class=\"tabbtn zpb-ctasmall zpb-simseason\" id=\"simSeasonBtn\">SIM SEASON</button>",
    1))

E.append((
    " if(myGame) html += renderGameResultHTML(myGame, user);",
    " if(myGame) html += '<div id=\"zpbGameReviewNow\">' + renderGameResultHTML(myGame, user) + '</div>'; // w30 (Owner): SIM GAME lands here",
    1))

E.append((
    " const simAll = document.getElementById('simSeasonBtn');\n if(simAll) simAll.addEventListener('click', ()=>{ simRestOfSeason(); renderSeasonTab(container); });",
    " const simAll = document.getElementById('simSeasonBtn');\n if(simAll) simAll.addEventListener('click', ()=>{ simRestOfSeason(); renderSeasonTab(container); });\n // w30 (Owner): SIM GAME — one real simulated game, played instantly, and the Game Review page next\n const simGame = document.getElementById('simGameBtn');\n if(simGame) simGame.addEventListener('click', ()=>{\n  window.__zpbSilent = true;\n  try{ simulateCurrentWeek(); } finally { window.__zpbSilent = false; }\n  renderSeasonTab(container);\n  const rv = document.getElementById('zpbGameReviewNow'); if(rv) rv.scrollIntoView({block:'start', behavior:'smooth'});\n });",
    1))

# ================= apply =================
with io.open(SRC, 'r', encoding='utf-8') as f:
    s = f.read()
orig_md5 = hashlib.md5(s.encode('utf-8')).hexdigest()
fails = []
for idx, (old, new, cnt) in enumerate(E):
    got = s.count(old)
    if got != cnt:
        fails.append((idx, cnt, got, old[:110].replace('\n', '\\n')))
        continue
    s = s.replace(old, new)
if fails:
    print('PATCH FAILURES:')
    for idx, want, got, frag in fails:
        print(f'  edit #{idx}: expected {want} match(es), found {got} · {frag}')
    sys.exit(1)

with io.open(DST, 'w', encoding='utf-8') as f:
    f.write(s)
print(f'w30_patch.py: {len(E)} asserted edits applied · baseline {orig_md5[:8]}… -> {hashlib.md5(s.encode("utf-8")).hexdigest()}')
