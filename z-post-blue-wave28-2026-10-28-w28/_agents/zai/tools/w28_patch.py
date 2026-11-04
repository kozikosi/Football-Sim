#!/usr/bin/env python3
"""w28_patch.py — build Football-Sim-Z-post-blue-w28.html from the w27 baseline.
Every edit is an asserted exact replacement (Owner law: patch chain, never blind hand-edit)."""
import io, sys, hashlib

SRC = '/home/z/my-project/scripts/w28-base.html'
OUT = '/home/z/my-project/download/Football-Sim-Z-post-blue-w28.html'
html = io.open(SRC, encoding='utf-8').read()
edits = []

def E(tag, old, new, count=1):
    edits.append((tag, old, new, count))

# ---------- A1: fix cross-wired takeaway queues (root cause of "gives it up") ----------
E('A1_tkq',
"const tkQ = {home:((g.detail && g.detail.home && g.detail.home.takeaways) || []).slice(), away:((g.detail && g.detail.away && g.detail.away.takeaways) || []).slice()};",
"const tkQ = {home:((g.detail && g.detail.away && g.detail.away.takeaways) || []).slice(), away:((g.detail && g.detail.home && g.detail.home.takeaways) || []).slice()}; // w28 (Owner): a home giveaway is taken by the AWAY defense — the queues were cross-wired, which is why the nameless fallback ever fired\n  [['home',toH],['away',toA]].forEach(([sd,n])=>{ // w28 (Owner): belt and braces — if the records ever come up short, pad from the box score so no line is ever nameless\n   while(tkQ[sd].length < n){\n    const opp2 = sd==='home' ? 'away' : 'home';\n    const dps = ((g.detail && g.detail[opp2] && g.detail[opp2].players) || []).filter(p=>p.group==='DL'||p.group==='LB'||p.group==='DB').sort((a,b)=>(b.impact||0)-(a.impact||0));\n    const opss = ((g.detail && g.detail[sd] && g.detail[sd].players) || []).filter(p=>p.group==='QB'||p.group==='RB').sort((a,b)=>((b.st.int||0)+(b.st.fumLost||0))-((a.st.int||0)+(a.st.fumLost||0)));\n    const dN = dps.length ? dps[tkQ[sd].length % dps.length].name : '';\n    const oN = opss.length ? opss[tkQ[sd].length % opss.length].name : '';\n    tkQ[sd].push({type:'FUM', name:dN, from:oN, recoveredBy:dN});\n   }\n  });")

# ---------- A2: one line per player for fumbles; INT keeps x [INT] y; never nameless ----------
OLD_TO = """     if(ev.type==='TO'){
      const line = document.createElement('div');
      line.className = 'zpb-rep-line zrl-to';
      const tk = (tkQ[ev.side] || []).shift();
      const zpbTc = t=>'<span class="zrl-badge zrl-chip">'+t+'</span>'; // w19 (Owner): FF / FR / INT wear boxes
      const toTxt = tk ? (tk.type==='INT'
        ? ((tk.name || '') + ' ' + zpbTc('INT') + ' ' + (tk.from || ''))
        : (tk.recoveredBy && tk.recoveredBy===tk.name
           ? ((tk.name || '') + ' ' + zpbTc('FF') + ' & ' + zpbTc('FR'))
           : ((tk.name || '') + ' ' + zpbTc('FF') + (tk.recoveredBy ? ', ' + zpbTc('FR') : ''))))
       : (abbr(g[ev.side==='home'?'away':'home']) + ' gives it up');
      const zpbWinner = ev.side==='home' ? g.away : g.home; // the team that won the ball
      line.innerHTML = '<span class="zrl-t">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[ev.side])
       + '<span class="zrl-team">' + abbr(g[ev.side]) + '</span><span class="zrl-play">' + toTxt + '</span>'
       + '<span class="zrl-badge" style="color:' + colOf(zpbWinner) + ';">\\u2022 ' + abbr(zpbWinner) + '</span>'; // w19 (Owner): TO is a dot; the box names who takes over
      log.appendChild(line);
      requestAnimationFrame(()=>{ line.classList.add('in'); });
      log.scrollTop = log.scrollHeight;
      return;
     }"""
NEW_TO = """     if(ev.type==='TO'){
      // w28 (Owner): a fumble is one line per player — KC x [FUM] / DEN y [FF] / DEN z [FR] —
      // the same defender forcing and recovering wears both boxes on one line, and an interception
      // keeps the x [INT] y shape. No line is ever nameless.
      const tk = (tkQ[ev.side] || []).shift();
      const zpbTc = t=>'<span class="zrl-badge zrl-chip">'+t+'</span>'; // w19 (Owner): FF / FR / INT wear boxes
      const zpbWinner = ev.side==='home' ? g.away : g.home; // the team that won the ball
      const oppKey = ev.side==='home' ? 'away' : 'home';
      const zpbLine = (teamKey, txt, dot)=>{
       const ln = document.createElement('div');
       ln.className = 'zpb-rep-line zrl-to';
       ln.innerHTML = '<span class="zrl-t">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[teamKey])
        + '<span class="zrl-team">' + abbr(g[teamKey]) + '</span><span class="zrl-play">' + txt + '</span>'
        + (dot ? '<span class="zrl-badge" style="color:' + colOf(zpbWinner) + ';">\\u2022 ' + abbr(zpbWinner) + '</span>' : '');
       log.appendChild(ln);
       requestAnimationFrame(()=>{ ln.classList.add('in'); });
      };
      if(tk && tk.type==='INT'){
       zpbLine(ev.side, (tk.name || '') + ' ' + zpbTc('INT') + ' ' + (tk.from || ''), true);
      } else if(tk && tk.recoveredBy && tk.recoveredBy===tk.name){
       zpbLine(ev.side, (tk.from || '') + ' ' + zpbTc('FUM'), false);
       zpbLine(oppKey, (tk.name || '') + ' ' + zpbTc('FF') + ' & ' + zpbTc('FR'), true);
      } else if(tk){
       zpbLine(ev.side, (tk.from || '') + ' ' + zpbTc('FUM'), false);
       zpbLine(oppKey, (tk.name || '') + ' ' + zpbTc('FF'), false);
       zpbLine(oppKey, (tk.recoveredBy || tk.name || '') + ' ' + zpbTc('FR'), true);
      } else {
       zpbLine(ev.side, zpbTc('TO'), true);
      }
      log.scrollTop = log.scrollHeight;
      return;
     }"""
E('A2_to_block', OLD_TO, NEW_TO)

# ---------- A3: safety names both defenders in the replay ----------
E('A3_saf_describe',
"if(e.type==='SAF') return 'Safety';",
"if(e.type==='SAF'){ const s0 = inf.safs && inf.safs.shift(); return (s0 && s0.n1 && s0.n2 && s0.n1!==s0.n2) ? (s0.n1 + ' & ' + s0.n2) : ((s0 && s0.n1) || 'Safety'); } // w28 (Owner): a safety names both defenders",
count=2)  # live v9 replay + the older dead replay copy — both safe (guard handles a missing queue)

E('A3b_info_build',
"   info[sd] = {qbName:qbName, kicker:kicker, recs:recs, rush:rush, dtq:dtq};",
"   const safs = ((g.detail && g.detail[sd] && g.detail[sd].safeties) || []).slice().map(x=> (x && x.n1) ? x : {n1:(typeof x==='string'?x:''), n2:(typeof x==='string'?x:'')}); // w28 (Owner): safeties carry two names\n   info[sd] = {qbName:qbName, kicker:kicker, recs:recs, rush:rush, dtq:dtq, safs:safs};")

# ---------- A4: the sim gives every safety a second defender ----------
E('A4_safeties',
""" const safeties = [];
 for(let i=0;i<(extra.saf||0);i++){
  const s = weightedPick(sackers.map(x=>({item:x, w:sackW[x]*ovrFactor(bySlot[x].e.ovr,45)})));
  const pl = P(bySlot[s].e, s); pl.st.saf = (pl.st.saf||0)+1; safeties.push(bySlot[s].e.name);
 }""",
""" const safeties = [];
 for(let i=0;i<(extra.saf||0);i++){
  const s = weightedPick(sackers.map(x=>({item:x, w:sackW[x]*ovrFactor(bySlot[x].e.ovr,45)})));
  const pl = P(bySlot[s].e, s); pl.st.saf = (pl.st.saf||0)+1;
  const mates = sackers.filter(x=>x!==s); // w28 (Owner): a safety is never a solo act — a second defender is always in on it
  const s2 = mates.length ? weightedPick(mates.map(x=>({item:x, w:sackW[x]*ovrFactor(bySlot[x].e.ovr,45)}))) : s;
  safeties.push({n1:bySlot[s].e.name, n2:bySlot[s2].e.name});
 }""")

# ---------- A5: review prose names both defenders ----------
E('A5_rev_saf',
"""  (d[s].safeties||[]).forEach((nm,i)=> bits.push(`${nm} dropped a ball carrier in the end zone for a safety, two points for ${T(s)}.`, safQs[i]||4));""",
"""  (d[s].safeties||[]).forEach((nm,i)=>{ const a2 = (nm && nm.n1) ? nm : {n1:nm, n2:nm}; bits.push(a2.n1===a2.n2 ? `${a2.n1} dropped a ball carrier in the end zone for a safety, two points for ${T(s)}.` : `${a2.n1}, with ${a2.n2} in on the tackle, dropped the ball carrier in the end zone for a safety, two points for ${T(s)}.`, safQs[i]||4)); }); // w28 (Owner): both defenders get their name in the story""")

io.open('/home/z/my-project/scripts/w28_edits_stage1.py','w').close()  # marker
# ---------- B: gameStatLine — the badge law ----------
OLD_GSL = """function gameStatLine(group, s){
 const parts = [];
 if(group==='QB'){ parts.push(`${s.cmp||0}/${s.att||0}, ${s.passYds||0} yds, ${s.passTD||0} TD`); if(s.int) parts.push(`${s.int} INT`); if(s.rushYds) parts.push(`${s.rushYds} rush yds`); if(s.rushTD) parts.push(`${s.rushTD} rush TD`); }
 else if(group==='RB'){ parts.push(`${s.car||0} car, ${s.rushYds||0} rush yds`); if(s.rushTD) parts.push(`${s.rushTD} TD`); if(s.recYds) parts.push(`${s.recYds} rec yds`); if(s.recTD) parts.push(`${s.recTD} rec TD`);  }
 else if(group==='WR' || group==='TE'){ parts.push(`${s.rec||0}/${s.tgt||0} rec, ${s.recYds||0} yds`); if(s.recTD) parts.push(`${s.recTD} TD`); if(s.rushTD) parts.push(`${s.rushTD} rush TD`);  }
 else if(group==='K'){ parts.push(`${s.fg||0} FG`); }
 else if(group==='OL'){ parts.push(`${s.rbk||0} rush yds behind`, `${s.pk||0} pancakes`); if(s.sa) parts.push(`${s.sa} sack${s.sa===1?'':'s'} allowed`); if(s.pa) parts.push(`${s.pa} pressure${s.pa===1?'':'s'} allowed`); }
 else { if(s.sack) parts.push(`${s.sack} sack${s.sack===1?'':'s'}`); if(s.dint) parts.push(`${s.dint} INT`); if(s.ff) parts.push(`${s.ff} FF`); if(s.pd) parts.push(`${s.pd} PD`); if(s.tfl) parts.push(`${s.tfl} TFL`); parts.push(`${s.tkl||0} tkl`); }
 return parts.concat(extraStats(group, s)).join(', ');
}"""
NEW_GSL = """function gameStatLine(group, s){
 // w28 (Owner): the badge law — every token capitalized; C, RUSHY, PASSY, RECY, Y, SK/SKS, SAF, PRSS
 const parts = [];
 if(group==='QB'){ parts.push(`${s.cmp||0}/${s.att||0} CMP`, `${s.passYds||0} PASSY`, `${s.passTD||0} TD`); if(s.int) parts.push(`${s.int} INT`); if(s.rushYds) parts.push(`${s.rushYds} RUSHY`); if(s.rushTD) parts.push(`${s.rushTD} RUSH TD`); if(s.sackd) parts.push(`${s.sackd} SK`); }
 else if(group==='RB'){ parts.push(`${s.car||0} C`, `${s.rushYds||0} RUSHY`); if(s.rushTD) parts.push(`${s.rushTD} TD`); if(s.recYds) parts.push(`${s.recYds} RECY`); if(s.recTD) parts.push(`${s.recTD} REC TD`);  }
 else if(group==='WR' || group==='TE'){ parts.push(`${s.rec||0}/${s.tgt||0} REC`, `${s.recYds||0} RECY`); if(s.recTD) parts.push(`${s.recTD} TD`); if(s.rushTD) parts.push(`${s.rushTD} RUSH TD`);  }
 else if(group==='K'){ parts.push(`${s.fg||0}/${s.fga||0} FG`); }
 else if(group==='OL'){ parts.push(`${s.rbk||0} RUSHY`, `${s.pk||0} PK`); if(s.sa) parts.push(`${s.sa} SK A`); if(s.pa) parts.push(`${s.pa} PRSS A`); }
 else { if(s.sack) parts.push(`${s.sack} SK${s.sack===1?'':'S'}`); if(s.dint) parts.push(`${s.dint} INT`); if(s.ff) parts.push(`${s.ff} FF`); if(s.pd) parts.push(`${s.pd} PD`); if(s.tfl) parts.push(`${s.tfl} TFL`); parts.push(`${s.tkl||0} TKL`); }
 return parts.concat(extraStats(group, s)).join(', ');
}"""
E('B_gsl', OLD_GSL, NEW_GSL)

# ---------- B2: extraStats — uppercase chips; sacked moved into the QB branch ----------
OLD_XS = """function extraStats(group, s){
 const p = [];
 if(group==='QB' && s.sackd) p.push(`sacked ${s.sackd}x`);
 if(s.fum) p.push(`${s.fum} fumble${s.fum===1?'':'s'}${s.fumLost?` (${s.fumLost} lost)`:''}`);
 if(s.tpc) p.push(`${s.tpc} 2-Pt Conv${s.tpc===1?'':'s'}`);
 if(s.fr) p.push(`${s.fr} fumble recover${s.fr===1?'y':'ies'}`);
 if(s.dtd) p.push(`${s.dtd} defensive TD${s.dtd===1?'':'s'}`);
 if(s.saf) p.push(`${s.saf} safety`);
 if(s.blk) p.push(`${s.blk} blocked kick${s.blk===1?'':'s'}`);
 if(s.krN) p.push(`${s.krN} KR for ${s.krYds} yds`);
 if(s.prN) p.push(`${s.prN} PR for ${s.prYds} yds`);
 return p;
}"""
NEW_XS = """function extraStats(group, s){
 // w28 (Owner): FF, TKL, FR — the badges law in the extra chips too
 const p = [];
 if(s.fum) p.push(`${s.fum} FUM${s.fumLost?` (${s.fumLost} LOST)`:''}`);
 if(s.tpc) p.push(`${s.tpc} 2PT`);
 if(s.fr) p.push(`${s.fr} FR`);
 if(s.dtd) p.push(`${s.dtd} DEF TD`);
 if(s.saf) p.push(`${s.saf} SAF`);
 if(s.blk) p.push(`${s.blk} BLK`);
 if(s.krN) p.push(`${s.krN}/${s.krYds||0} KR`);
 if(s.prN) p.push(`${s.prN}/${s.prYds||0} PR`);
 return p;
}"""
E('B2_extra', OLD_XS, NEW_XS)

# ---------- C: seasonStatLine — same law on the season lines ----------
OLD_SSL = """function seasonStatLine(group, s){
 const parts = [];
 if(group==='QB'){ parts.push(`${fmtN(s.cmp)}/${fmtN(s.att)} cmp`, `${fmtN(s.passYds)} pass yds`, `${s.passTD||0} TD`, `${s.int||0} INT`, `${passerRating(s.cmp,s.att,s.passYds,s.passTD||0,s.int||0).toFixed(1)} rate`); if(s.rushYds) parts.push(`${fmtN(s.rushYds)} rush yds`); }
 else if(group==='RB'){ parts.push(`${fmtN(s.car)} car`, `${fmtN(s.rushYds)} rush yds`, `${s.rushTD||0} TD`); if(s.recYds) parts.push(`${fmtN(s.recYds)} rec yds`); if(s.recTD) parts.push(`${s.recTD} rec TD`); }
 else if(group==='WR'||group==='TE'){ parts.push(`${fmtN(s.rec)}/${fmtN(s.tgt)} rec`, `${fmtN(s.recYds)} yds`, `${s.recTD||0} TD`); if(s.rushTD) parts.push(`${s.rushTD} rush TD`); }
 else if(group==='K'){ parts.push(`${s.fg||0} FG`); }
 else if(group==='OL'){ parts.push(`${fmtN(s.rbk)} rush yds behind`, `${s.pk||0} pancakes`, `${s.sa||0} sacks allowed`, `${s.pa||0} pressures allowed`); }
 else if(group==='DL'){ parts.push(`${s.sack||0} sacks`, `${s.tfl||0} TFL`, `${s.hur||0} pressures`, `${s.tkl||0} tkl`); if(s.ff) parts.push(`${s.ff} FF`); }
 else if(group==='LB'){ parts.push(`${s.tkl||0} tkl`, `${s.tfl||0} TFL`, `${s.sack||0} sacks`); if(s.dint) parts.push(`${s.dint} INT`); if(s.pd) parts.push(`${s.pd} PD`); if(s.ff) parts.push(`${s.ff} FF`); }
 else { parts.push(`${s.dint||0} INT`, `${s.pd||0} PD`, `${s.tkl||0} tkl`); if(s.ff) parts.push(`${s.ff} FF`); }
 return parts.concat(extraStats(group, s)).join(', ');
}"""
NEW_SSL = """function seasonStatLine(group, s){
 // w28 (Owner): the badge law across the season lines — C, RUSHY, PASSY, RECY, SK/SKS, PRSS, FG made/attempts
 const parts = [];
 if(group==='QB'){ parts.push(`${fmtN(s.cmp)}/${fmtN(s.att)} CMP`, `${fmtN(s.passYds)} PASSY`, `${s.passTD||0} TD`, `${s.int||0} INT`, `${passerRating(s.cmp,s.att,s.passYds,s.passTD||0,s.int||0).toFixed(1)} RTG`); if(s.rushYds) parts.push(`${fmtN(s.rushYds)} RUSHY`); }
 else if(group==='RB'){ parts.push(`${fmtN(s.car)} C`, `${fmtN(s.rushYds)} RUSHY`, `${s.rushTD||0} TD`); if(s.recYds) parts.push(`${fmtN(s.recYds)} RECY`); if(s.recTD) parts.push(`${s.recTD} REC TD`); }
 else if(group==='WR'||group==='TE'){ parts.push(`${fmtN(s.rec)}/${fmtN(s.tgt)} REC`, `${fmtN(s.recYds)} RECY`, `${s.recTD||0} TD`); if(s.rushTD) parts.push(`${s.rushTD} RUSH TD`); }
 else if(group==='K'){ parts.push(`${s.fg||0}/${s.fga||0} FG`); }
 else if(group==='OL'){ parts.push(`${fmtN(s.rbk)} RUSHY`, `${s.pk||0} PK`, `${s.sa||0} SK A`, `${s.pa||0} PRSS A`); }
 else if(group==='DL'){ parts.push(`${s.sack||0} SK${(s.sack||0)===1?'':'S'}`, `${s.tfl||0} TFL`, `${s.hur||0} PRSS`, `${s.tkl||0} TKL`); if(s.ff) parts.push(`${s.ff} FF`); }
 else if(group==='LB'){ parts.push(`${s.tkl||0} TKL`, `${s.tfl||0} TFL`, `${s.sack||0} SK${(s.sack||0)===1?'':'S'}`); if(s.dint) parts.push(`${s.dint} INT`); if(s.pd) parts.push(`${s.pd} PD`); if(s.ff) parts.push(`${s.ff} FF`); }
 else { parts.push(`${s.dint||0} INT`, `${s.pd||0} PD`, `${s.tkl||0} TKL`); if(s.ff) parts.push(`${s.ff} FF`); }
 return parts.concat(extraStats(group, s)).join(', ');
}"""
E('C_ssl', OLD_SSL, NEW_SSL)

print('stage-1 edits queued:', len(edits))
# apply stage 1 now so later probes see updated text
for tag, old, new, cnt in edits:
    c = html.count(old)
    assert c == cnt, f'{tag}: expected {cnt}, found {c}'
    html = html.replace(old, new)
io.open(OUT, 'w', encoding='utf-8').write(html)
print('stage-1 applied OK ->', OUT)
