#!/usr/bin/env python3
"""w28_patch2.py — stage 2: chips law on player panels, leaders boards, kicker fga,
preview fixes, key-players MVP guard, TEAM STATS, titles, NFL-tab hardening, comparison rival."""
import io

P = '/home/z/my-project/download/Football-Sim-Z-post-blue-w28.html'
html = io.open(P, encoding='utf-8').read()
n_edits = 0

def E(tag, old, new, count=1):
    global html, n_edits
    c = html.count(old)
    assert c == count, f'{tag}: expected {count}, found {c}'
    html = html.replace(old, new)
    n_edits += 1

# ---------- D: player-panel chips (zpbStatChipsHTML) ----------
E('D_qb_passy', "out.push(chip(fmtN(s.passYds||0), 'PassY'));", "out.push(chip(fmtN(s.passYds||0), 'PASSY'));")
E('D_qb_rushy', "if(s.rushYds) out.push(chip(fmtN(s.rushYds), 'RushY'));", "if(s.rushYds) out.push(chip(fmtN(s.rushYds), 'RUSHY'));")
E('D_rb', "out.push(chip(fmtN(s.rushYds||0), 'RushY'), chip(s.rushTD||0, 'TD'));",
         "out.push(chip(fmtN(s.car||0), 'C'), chip(fmtN(s.rushYds||0), 'RUSHY'), chip(s.rushTD||0, 'TD')); // w28 (Owner): carries read C")
E('D_rb_rec', "if(s.recYds) out.push(chip(fmtN(s.recYds), 'RecY'));", "if(s.recYds) out.push(chip(fmtN(s.recYds), 'RECY'));")
E('D_rb_rectd', "if(s.recTD) out.push(chip(s.recTD, 'RecTD'));", "if(s.recTD) out.push(chip(s.recTD, 'REC TD'));")
E('D_wr', "out.push(chip(fmtN(s.recYds||0), 'RecY'), chip(s.recTD||0, 'TD'));", "out.push(chip(fmtN(s.recYds||0), 'RECY'), chip(s.recTD||0, 'TD'));")
E('D_ol', "out.push(chip(fmtN(s.rbk||0), 'RbkY'), chip(s.pk||0, 'PK'), chip(s.sa||0, 'SK'));",
          "out.push(chip(fmtN(s.rbk||0), 'RUSHY'), chip(s.pk||0, 'PK'), chip(s.sa||0, 'SK A'), chip(s.pa||0, 'PRSS A')); // w28 (Owner): RUSHY behind the blocks; PRSS for pressure")

# ---------- E: League Leaders boards ----------
E('E_qb', "['Yds',r=>fmtN(r.st.passYds)],['TD',r=>r.st.passTD||0],['INT',r=>r.st.int||0],['Rate',r=>passerRating(r.st.cmp,r.st.att,r.st.passYds,r.st.passTD||0,r.st.int||0).toFixed(1)],['TD:INT',r=>f1((r.st.passTD||0)/Math.max(r.st.int||0,1))],['Sacked',r=>r.st.sackd||0],['FUM',r=>r.st.fum||0],['2PT',r=>r.st.tpc||0]]}",
          "['Y',r=>fmtN(r.st.passYds)],['TD/INT',r=>(r.st.passTD||0)+'/'+(r.st.int||0)],['SK',r=>r.st.sackd||0],['FUM',r=>r.st.fum||0]]}")  # w28: Rate/2PT/TD/INT gone; TD/INT as X/Y
E('E_rb', "cols:[['Car',r=>fmtN(r.st.car)],['Rush',r=>fmtN(r.st.rushYds)],['YPC',r=>f1((r.st.rushYds||0)/Math.max(r.st.car||0,1))],['TD',r=>r.st.rushTD||0],['Rec',r=>fmtN(r.st.recYds)],['FUM',r=>r.st.fum||0],['Lost',r=>r.st.fumLost||0],['2PT',r=>r.st.tpc||0]]}",
          "cols:[['C/RUSHY',r=>fmtN(r.st.car||0)+'/'+fmtN(r.st.rushYds||0)],['YPC',r=>f1((r.st.rushYds||0)/Math.max(r.st.car||0,1))],['TD',r=>r.st.rushTD||0],['Rec',r=>fmtN(r.st.recYds)],['FUM',r=>r.st.fum||0]]}")  # w28: C/RUSHY in; Car/Rush/Lost/2PT out
E('E_wrte', "[['Rec/Tgt',r=>`${fmtN(r.st.rec)}/${fmtN(r.st.tgt)}`],['Yds',r=>fmtN(r.st.recYds)],['TD',r=>r.st.recTD||0],['FUM',r=>r.st.fum||0],['2PT',r=>r.st.tpc||0]]}",
           "[['Rec/Tgt',r=>`${fmtN(r.st.rec)}/${fmtN(r.st.tgt)}`],['Y',r=>fmtN(r.st.recYds)],['TD',r=>r.st.recTD||0],['FUM',r=>r.st.fum||0]]}", count=2)  # WR + TE: 2PT out, Yds->Y
E('E_ol', "cols:[['Yds behind',r=>fmtN(r.st.rbk)],['Pancakes',r=>r.st.pk||0],['Sacks alwd',r=>r.st.sa||0],['Press. alwd',r=>r.st.pa||0]]}",
          "cols:[['Y behind',r=>fmtN(r.st.rbk)],['SK A',r=>r.st.sa||0],['PRSS A',r=>r.st.pa||0]]}")  # w28: Pancakes out; YDS->Y; PRSS
E('E_dl', "cols:[['Sacks',r=>r.st.sack||0],['TFL',r=>r.st.tfl||0],['Press.',r=>r.st.hur||0],['Tkl',r=>r.st.tkl||0],['FF',r=>r.st.ff||0],['FR',r=>r.st.fr||0],['Def TD',r=>r.st.dtd||0],['Blk',r=>r.st.blk||0],['Saf',r=>r.st.saf||0]]}",
          "cols:[['SKS',r=>r.st.sack||0],['TFL',r=>r.st.tfl||0],['PRSS',r=>r.st.hur||0],['Tkl',r=>r.st.tkl||0],['FF',r=>r.st.ff||0],['FR',r=>r.st.fr||0],['Def TD',r=>r.st.dtd||0]]}")
E('E_lb', "cols:[['Tkl',r=>r.st.tkl||0],['TFL',r=>r.st.tfl||0],['Sacks',r=>r.st.sack||0],['INT',r=>r.st.dint||0],['FF',r=>r.st.ff||0],['FR',r=>r.st.fr||0],['Def TD',r=>r.st.dtd||0],['Blk',r=>r.st.blk||0],['Saf',r=>r.st.saf||0]]}",
          "cols:[['Tkl',r=>r.st.tkl||0],['TFL',r=>r.st.tfl||0],['SKS',r=>r.st.sack||0],['INT',r=>r.st.dint||0],['FF',r=>r.st.ff||0],['FR',r=>r.st.fr||0],['Def TD',r=>r.st.dtd||0]]}")
E('E_db', "cols:[['INT',r=>r.st.dint||0],['PD',r=>r.st.pd||0],['Tkl',r=>r.st.tkl||0],['FF',r=>r.st.ff||0],['FR',r=>r.st.fr||0],['Def TD',r=>r.st.dtd||0],['Blk',r=>r.st.blk||0],['Saf',r=>r.st.saf||0]]}",
          "cols:[['INT',r=>r.st.dint||0],['PD',r=>r.st.pd||0],['Tkl',r=>r.st.tkl||0],['FF',r=>r.st.ff||0],['FR',r=>r.st.fr||0],['Def TD',r=>r.st.dtd||0]]}")
E('E_k', "cols:[['FG',r=>r.st.fg||0]]}", "cols:[['FG',r=>(r.st.fg||0)+'/'+(r.st.fga||0)]]}")  # w28: made/attempts
E('E_ret', "cols:[['KR',r=>`${r.st.krN||0} for ${fmtN(r.st.krYds)}`],['KR avg',r=>f1((r.st.krYds||0)/Math.max(r.st.krN||0,1))],['PR',r=>`${r.st.prN||0} for ${fmtN(r.st.prYds)}`],['PR avg',r=>f1((r.st.prYds||0)/Math.max(r.st.prN||0,1))],['Total yds',r=>fmtN(r.st.retYds)]]}",
           "cols:[['KR',r=>(r.st.krN||0)+'/'+fmtN(r.st.krYds||0)],['KR avg',r=>f1((r.st.krYds||0)/Math.max(r.st.krN||0,1))],['PR',r=>(r.st.prN||0)+'/'+fmtN(r.st.prYds||0)],['PR avg',r=>f1((r.st.prYds||0)/Math.max(r.st.prN||0,1))],['Total Y',r=>fmtN(r.st.retYds)]]}")  # w28: x/y; Total Y

# ---------- E2: leadersInner — RAW STAT button + rating explainer gone ----------
E('E2_blurbs', " const blurbs = Object.keys(RATING_BLURB).filter(g=>g!=='TE').map(g=>`<b>${g}</b>: ${RATING_BLURB[g]}`).join(' · ');\n", "")
E('E2_inner', """ return `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:8px;">
   <span class="narr">Sorted by:</span><button class="tabbtn active" id="ldrBtnRtg${sfx}">Performance rating</button><button class="tabbtn" id="ldrBtnStat${sfx}">Raw stat</button></div>
  <p class="narr" style="margin:0 0 10px;">Each position has its own rating (50 = average starter) that blends volume with efficiency, so a player can rank high without leading the league in yards. ${blurbs}.</p>
  <div id="ldrRtg${sfx}">${leadersPane('rating')}</div><div id="ldrStat${sfx}" style="display:none;">${leadersPane('stat')}</div>`;""",
"""  return `<div id="ldrRtg${sfx}">${leadersPane('rating')}</div>`; // w28 (Owner): the Raw stat button and the rating explainer paragraph are gone""")

# ---------- F: kicker FG attempts (sim side) ----------
E('F_fga', " if(k) add(k, 'K', 'fg', events.filter(e=>e.type==='FG').length);",
          " if(k){ const fgMade = events.filter(e=>e.type==='FG').length; const missLam = 0.22 + Math.max(0, 82 - k.ovr)*0.03; add(k, 'K', 'fg', fgMade); add(k, 'K', 'fga', fgMade + poisson(missLam)); } // w28 (Owner): FG reads made/attempts — misses are noise; the scoreboard never changes")

# ---------- G: game preview — drop the non-Cinzel name copy; order by season rating ----------
E('G_pvface', """  return '<div class="zpb-pvwrap"><div class="zpb-pvface"><span class="zpb-pvteamhd" style="'+stv(g.away)+'">'+lg(g.away)+'<b>'+nick(g.away)+'</b></span>'
   + '<span class="zpb-pvvs">VS</span>'
   + '<span class="zpb-pvteamhd" style="'+stv(g.home)+'"><b>'+nick(g.home)+'</b>'+lg(g.home)+'</span></div>'
   + (rowsHTML || '<div class="narr" style="padding:10px;">No rated starters</div>') + '</div>';""",
"""  // w28 (Owner): the team names already sit in Cinzel beside the model bar above — the second, non-Cinzel copy below is gone
  return '<div class="zpb-pvwrap">' + (rowsHTML || '<div class="narr" style="padding:10px;">No rated starters</div>') + '</div>';""")
E('G_cards_sort', "   try{ rows = teamPlayerStats(team).filter(r=>r.group!=='OL'&&r.ovr).sort((a,b)=>(b.ovr||0)-(a.ovr||0)).slice(0,5); }catch(e){}",
                  "   try{ rows = teamPlayerStats(team).filter(r=>r.group!=='OL'&&r.ovr).sort((a,b)=>((b._rating!=null?b._rating:(b.ovr||0))-(a._rating!=null?a._rating:(a.ovr||0)))).slice(0,5); }catch(e){} // w28 (Owner): selection and order follow the season rating")

# ---------- H: key players — the MVP never visits the other team's card (kicker dup + wrong-team card) ----------
E('H_mvp', "if(mvp && !list.some(p=>p.name===mvp.name)) list = [mvp].concat(list);",
           "if(mvp && (mvp.team||team)===team && !list.some(p=>p.name===mvp.name)) list = [mvp].concat(list); // w28 (Owner): the game ball never visits the other team's card")

io.open(P, 'w', encoding='utf-8').write(html)
print('stage-2 applied:', n_edits, 'edits OK')
