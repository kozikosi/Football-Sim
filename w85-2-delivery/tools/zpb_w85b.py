#!/usr/bin/env python3
# zpb_w85b.py — the Owner's round-85, second pass (the w78 merge + the re-sent comments).
# Base: the recovered w85 build (md5 2de5d414097c020adec048acc1645ad6) — improved in place.
# The product is still WAVE 85 (the Owner's word: "You are now still working on w85").
# Asserted exact replacements only; any drift fails the run.
import hashlib, sys, os

SRC = '/home/z/my-project/work/w85-r1-backup.html'   # the recovered w85 bytes
OUT = '/home/z/my-project/w85/Football-Sim-Z-post-blue-w85.html'
html = open(SRC, encoding='utf-8').read()
n0 = len(html)
print('baseline bytes:', n0, 'md5:', hashlib.md5(html.encode()).hexdigest())

def rep(old, new, count=1, tag=''):
    global html
    found = html.count(old)
    if found != count:
        print(f'FAIL [{tag}] expected {count} occurrence(s), found {found}')
        sys.exit(1)
    html = html.replace(old, new, count)
    print(f'ok   [{tag}]')

os.makedirs(os.path.dirname(OUT), exist_ok=True)

# ---------- R2-3 + R2-4 · the draft board chips: selected fills, the off-by-default law ----------
old = "function newDraftUI(){ return {groups:new Set(WV_GROUPS), prio:{}, rosterView:'depth', sim:null, slotPick:{}, teamFilter:null, showAll:false}; }"
new = "function newDraftUI(){ return {groups:new Set(), prio:{}, rosterView:'depth', sim:null, slotPick:{}, teamFilter:null, showAll:false}; } // w85 (Owner): every chip OFF at first — and a board with every chip off is the full board"
rep(old, new, 1, 'R2-4 chips default off')

old = "  const gs = openG.filter(g=>sel.has(g)).sort((a,b)=>{ const x = DG_ORDER.indexOf(a), y = DG_ORDER.indexOf(b); return (x<0?99:x)-(y<0?99:y) || WV_GROUPS.indexOf(a)-WV_GROUPS.indexOf(b); });"
new = "  const gs = (sel.size ? openG.filter(g=>sel.has(g)) : openG).sort((a,b)=>{ const x = DG_ORDER.indexOf(a), y = DG_ORDER.indexOf(b); return (x<0?99:x)-(y<0?99:y) || WV_GROUPS.indexOf(a)-WV_GROUPS.indexOf(b); }); // w85 (Owner): every chip off shows every group the board still needs"
rep(old, new, 1, 'R2-4 cards all-off shows all groups')

old = "&& (posF!=='all' || sel.has(WV_TAG_GROUP[r.p[1]]))); // w33 (R15): the chip law holds on the cards too"
new = "&& (posF!=='all' || !sel.size || sel.has(WV_TAG_GROUP[r.p[1]]))); // w85 (Owner): the chip law — every chip off is the full board"
rep(old, new, 1, 'R2-4 cards filter')

old = " cards.innerHTML = gs.length ? h : '<div class=\"narr\">Turn on one or more position chips above (cards only show positions you still need).</div>';"
new = " cards.innerHTML = gs.length ? h : '<div class=\"narr\">No position needs a player — your starting spots are all filled.</div>';"
rep(old, new, 1, 'R2-4 cards empty note')

old = "   if(posF!=='all' ? WV_TAG_GROUP[r.p[1]]!==posF : (!sel.has(r.g) || !sel.has(WV_TAG_GROUP[r.p[1]]))) return; // w33 (R15, Owner): unhighlight a position and those players leave the board, even where they could flex"
new = "   if(posF!=='all' ? WV_TAG_GROUP[r.p[1]]!==posF : (sel.size ? (!sel.has(r.g) || !sel.has(WV_TAG_GROUP[r.p[1]])) : false)) return; // w85 (Owner): the chip law — on shows his players, off hides them, every chip off shows the whole board"
rep(old, new, 1, 'R2-4 table filter')

old = "    if(posF!=='all' ? tg!==posF : !sel.has(tg)) return;"
new = "    if(posF!=='all' ? tg!==posF : (sel.size && !sel.has(tg))) return;"
rep(old, new, 1, 'R2-4 pool filter')

old = ".zpb-srbtn.on{border-color:var(--accent);color:var(--text);box-shadow:0 0 9px var(--glow);}"
new = ".zpb-srbtn.on{background:var(--accent);border-color:var(--accent);color:var(--ongold,#3a2a14);box-shadow:0 0 9px var(--glow);} /* w85 (Owner): the selected chip FILLS — obvious in both themes */"
rep(old, new, 1, 'R2-3 chip fill light')

old = ".zpb-srbtn.on i{color:var(--accent2,var(--accent));}"
new = ".zpb-srbtn.on i{color:var(--ongold,#3a2a14);}"
rep(old, new, 1, 'R2-3 chip fill i')

old = ":root[data-theme=\"dark\"] .zpb-srbtn.on{border-color:var(--zrbd,var(--accent));box-shadow:0 0 9px var(--zrbd,var(--accent));}"
new = ":root[data-theme=\"dark\"] .zpb-srbtn.on{background:var(--zrbd,var(--accent));border-color:var(--zrbd,var(--accent));color:var(--ongold,#2c1e0c);box-shadow:0 0 9px var(--zrbd,var(--accent));} /* w85 (Owner): the selected chip fills in dark too */"
rep(old, new, 1, 'R2-3 chip fill dark')

# ---------- R2-17 · the Fills column reads "x (-y)" — the word flex leaves ----------
old = " const flexTxt = r=> r.flex ? ` <span class=\"narr\">Flex ${LABELS[r.slot]||r.slot} (-${r.pen})</span>` : '';"
new = " const flexTxt = r=> r.flex ? ` <span class=\"narr\">(-${r.pen})</span>` : ''; // w85 (Owner): the fills read x (-y) — the spot, then the penalty in brackets; the word flex leaves"
rep(old, new, 1, 'R2-17 fills format')

old = "#viewDraft .tablewrap{overflow-x:auto;scrollbar-width:none;}"
new = ("#viewDraft .tablewrap{overflow-x:auto;scrollbar-width:none;}\n"
       "#viewDraft #draftTableWrap{overflow-x:hidden;} /* w85 (Owner): the draft board never side-scrolls */\n"
       "#viewDraft #draftTable2{width:100%;}\n"
       "#viewDraft #draftTable2 td.dc-fills{overflow-wrap:anywhere;}")
rep(old, new, 1, 'R2-17 no side scroll')

# ---------- R2-16 · OFFENSIVE GUARD, everywhere ----------
old = "const WV_NAMES = {QB:'Quarterback',EDGE:'Edge rusher',OT:'Offensive tackle',CB:'Cornerback',WR:'Wide receiver',DT:'Defensive tackle',OG:'Guard',C:'Center',LB:'Linebacker',SS:'Strong safety',FS:'Free safety',TE:'Tight end',RB:'Running back',K:'Kicker'};"
new = "const WV_NAMES = {QB:'Quarterback',EDGE:'Edge rusher',OT:'Offensive tackle',CB:'Cornerback',WR:'Wide receiver',DT:'Defensive tackle',OG:'Offensive guard',C:'Center',LB:'Linebacker',SS:'Strong safety',FS:'Free safety',TE:'Tight end',RB:'Running back',K:'Kicker'}; // w85 (Owner): OFFENSIVE GUARD, never just guard"
rep(old, new, 1, 'R2-16 draft dropdown name')

old = "OT1:'Offensive Tackle 1',OT2:'Offensive Tackle 2',OG1:'Guard 1',OG2:'Guard 2',C:'Center',"
new = "OT1:'Offensive Tackle 1',OT2:'Offensive Tackle 2',OG1:'Offensive Guard 1',OG2:'Offensive Guard 2',C:'Center',"
rep(old, new, 1, 'R2-16 slot friendly full names')

old = "OT1:'Offensive tackle 1', OT2:'Offensive tackle 2', OG1:'Guard 1', OG2:'Guard 2', C:'Center',"
new = "OT1:'Offensive tackle 1', OT2:'Offensive tackle 2', OG1:'Offensive guard 1', OG2:'Offensive guard 2', C:'Center',"
rep(old, new, 1, 'R2-16 slot friendly values table')

old = "SAM:'Strongside linebacker (SAM)', CB1:'Cornerback 1', CB2:'Cornerback 2', CB3:'Cornerback 3 (nickel)', SS:'Strong safety', FS:'Free safety', K:'Kicker'};"
new = "SAM:'Strongside linebacker (SAM)', CB1:'Cornerback 1', CB2:'Cornerback 2', CB3:'Cornerback 3 (nickel)', CB4:'Dime cornerback', SS:'Strong safety', FS:'Free safety', K:'Kicker', TE3:'Tight end 3', WR4:'Wide receiver 4', FB:'Fullback', DL5:'Fifth defensive lineman', P:'Punter'}; // w85 (Owner): every depth-chart spot carries its name"
rep(old, new, 1, 'R2-15 slot friendly additions')

old = "\"TE1\": \"TE1\", \"TE2\": \"TE2\","
new = "\"TE1\": \"TE1\", \"TE2\": \"TE2\", \"TE3\": \"TE3\","
rep(old, new, 1, 'R2-15 TE3 label')

old = "  + '<span><b>QB</b> Quarterback</span>'\n  + '<span><b>RB</b> Running Back</span>'"
new = "  + '<span><b>QB</b> Quarterback</span>'\n  + '<span><b>RB</b> Running Back</span>'\n  + '<span><b>FB</b> Fullback</span>'"
rep(old, new, 1, 'R2-15 field map legend FB')

# ---------- R2-15 · the win-math bars list every depth-chart spot ----------
old = """ const rows = (typeof ROSTER_SLOTS!=='undefined'?ROSTER_SLOTS:[]).map(s=>({s, w:((slotWins(s,90)-slotWins(s,70)))}))
   .filter(r=>r.w>0.001).sort((a,b)=>b.w-a.w);"""
new = """ const rows = (typeof ROSTER_SLOTS!=='undefined'?ROSTER_SLOTS:[]).map(s=>({s, w:((slotWins(s,90)-slotWins(s,70)))}))
   .sort((a,b)=>b.w-a.w); // w85 (Owner): every depth-chart spot ranks — TE3, DIME and the lightest seats included"""
rep(old, new, 2, 'R2-15 no filter (rank + series)')

old = "<span class=\"zpb-prval\" title=\"Wins added per season by upgrading this spot from a 70 to a 90\">${r.w.toFixed(1)} wins</span></div>`;"
new = "<span class=\"zpb-prval\" title=\"Wins added per season by upgrading this spot from a 70 to a 90\">${r.w<0.05?'~0':r.w.toFixed(1)} wins</span></div>`;"
rep(old, new, 1, 'R2-15 near-zero wins label')

# ---------- R2-5 · the preseason dropdowns lose the box, shrink ----------
old = """details.zpb-dd{border:1px solid var(--rosehair);border-radius:12px;padding:9px 12px;margin:8px 0;background:var(--glass);}
details.zpb-dd>summary{cursor:pointer;font-weight:700;font-size:.88rem;color:var(--text);list-style:none;}"""
new = """details.zpb-dd{border:none;border-radius:12px;padding:0;margin:8px 0;background:transparent;} /* w85 (Owner): the dropdown headers lose the box */
details.zpb-dd>summary{cursor:pointer;font-weight:700;font-size:.78rem;color:var(--text);list-style:none;letter-spacing:.04em;} /* w85 (Owner): the smaller font, like the terms dropdown */"""
rep(old, new, 1, 'R2-5 dropdown style')

old = "  <details style=\"margin-top:12px;\"><summary style=\"cursor:pointer;font-weight:700;\">WHAT DO THESE TERMS MEAN? (PERSONNEL, PACKAGES)</summary>"
new = "  <details class=\"zpb-dd\"><summary>WHAT DO THESE TERMS MEAN? (PERSONNEL, PACKAGES)</summary>"
rep(old, new, 1, 'R2-5 terms joins the family')

# ---------- R2-6 · 2 point conversion, spelled out on the preseason page and in the guide ----------
old = "return `<p style=\"margin:4px 0;\">How bold are you on <b>2-Pt Conversions</b> and <b>4th downs</b>?</p>"
new = "return `<p style=\"margin:4px 0;\">How bold are you on <b>2 point conversions</b> and <b>4th downs</b>?</p>"
rep(old, new, 1, 'R2-6 aggr intro')

old = "<details class=\"zpb-dd\" style=\"font-size:0.86rem;\"><summary>HOW A 2-PT CONVERSION WORKS</summary>"
new = "<details class=\"zpb-dd\"><summary>HOW A 2 POINT CONVERSION WORKS</summary>"
rep(old, new, 1, 'R2-6 aggr header')

old = "Fewer 2-Pt Conversions, a few more field goals, fewer touchdowns."
new = "Fewer 2 point conversions, a few more field goals, fewer touchdowns."
rep(old, new, 1, 'R2-6 cautious desc')

old = "More 2-Pt Conversions, more touchdowns, fewer field goals"
new = "More 2 point conversions, more touchdowns, fewer field goals"
rep(old, new, 1, 'R2-6 aggressive desc')

old = "  ['2-Pt Conversion','One play from the 2-yard line worth two points instead of the one-point kick.'],"
new = "  ['2 point conversion','One play from the 2-yard line worth two points instead of the one-point kick.'],"
rep(old, new, 1, 'R2-6 glossary')

# ---------- R2-7 · the offense dropdown drops "(x teams run it)" ----------
old = " const offOpts = Object.keys(OFF_STYLE_INFO).map(k=>`<option value=\"${k}\" ${id.offChoice===k?'selected':''}>${capFirst(k)} (${cnt[k]||0} team${(cnt[k]||0)===1?'':'s'} run it)</option>`).join('');"
new = " const offOpts = Object.keys(OFF_STYLE_INFO).map(k=>`<option value=\"${k}\" ${id.offChoice===k?'selected':''}>${capFirst(k)}</option>`).join(''); // w85 (Owner): the count leaves the offense dropdown, the defense format stands"
rep(old, new, 1, 'R2-7 offense dropdown')

# ---------- R2-8 · SIM SEASON wears the ghost every other small button wears ----------
old = "button.zpb-simseason{background:var(--panel);color:var(--sub);border:1px solid var(--border);box-shadow:none;opacity:1;}"
new = "button.zpb-simseason{background:transparent;color:var(--sub);border:1px solid var(--glassbd);box-shadow:none;opacity:1;} /* w85 (Owner): the same neutral ghost as SIM GAME — never a white fill */"
rep(old, new, 1, 'R2-8 sim season ghost')

# ---------- R2-10 · the box score frame wears the score's border color ----------
old = "table.linescore{border:2px solid var(--rosehair,var(--border));border-radius:14px;overflow:hidden;background:var(--panel2);box-shadow:0 0 0 1px color-mix(in srgb,var(--rosehair,var(--border)) 30%, transparent), 0 12px 30px rgba(20,10,16,.20), inset 0 0 0 1px color-mix(in srgb,var(--rosehair,var(--border)) 55%, transparent);} /* w85 (Owner): a well-defined double frame */"
new = "table.linescore{border:2px solid var(--accent,var(--rosehair,var(--border)));border-radius:14px;overflow:hidden;background:var(--panel2);box-shadow:0 0 0 1px color-mix(in srgb,var(--accent,var(--rosehair,var(--border))) 30%, transparent), 0 12px 30px rgba(20,10,16,.20), inset 0 0 0 1px color-mix(in srgb,var(--accent,var(--rosehair,var(--border))) 55%, transparent);} /* w85 (Owner): the frame wears the score's own border color */"
rep(old, new, 1, 'R2-10 linescore border')

# ---------- R2-11 · the 0.60 light ink for the award text ----------
old = " const txd=zpbMix('#f5e9dd',accD,0.14), sud=zpbMix('#c8a48f',accD,0.2);"
new = """ const txM6=(function(){ try{ // w85 (Owner): the 0.60 preset — the light text ink, a little more of the team's color; dark keeps its 0.50
  const _base6 = (_txc && _txc.l<0.52) ? zpbFromHsl(_txc.h,_txc.s,0.52) : txL;
  const _m6=zpbMix('#53382b',_base6,0.6), _c6=zpbHsl(_m6);
  let _ink6=zpbFromHsl(_c6.h, Math.min(0.85,Math.max(0.22,_c6.s)), Math.min(0.52,Math.max(0.30,_c6.l)));
  try{ let _g6=0; while(_g6<9 && zpbContrast(_ink6,'#fcf7f1')<5){ const _c7=zpbHsl(_ink6); _ink6=zpbFromHsl(_c7.h,_c7.s,Math.max(0.24,_c7.l-0.02)); _g6++; } }catch(err){}
  return _ink6;
 }catch(err){ return txM; } })();
 const txd=zpbMix('#f5e9dd',accD,0.14), sud=zpbMix('#c8a48f',accD,0.2);"""
rep(old, new, 1, 'R2-11 txM6 build')

old = "  txL, txM, txMd, txd, sud, hairL, hairD,"
new = "  txL, txM, txM6, txMd, txd, sud, hairL, hairD,"
rep(old, new, 1, 'R2-11 pk carries txM6')

old = "'--tTxM':(txM||txL),'--tTxMd':(txMd||txd),"
new = "'--tTxM':(txM||txL),'--tTxMd':(txMd||txd),'--tTxM6':(txM6||txM),"
rep(old, new, 1, 'R2-11 txM6 var')

old = "  if(pk) color = dark ? pk.txd : (pk.txM||pk.txd); // w42 (I2/I4): the ONE-INK law — w43 (N13, Owner): light reads txM, dark keeps txd"
new = "  if(pk) color = dark ? pk.txd : (pk.txM6||pk.txM||pk.txd); // w85 (Owner): the honor lines read the 0.60 light ink — dark keeps the 0.50"
rep(old, new, 1, 'R2-11 honor line ink')

old = "const aw = (title, name, team, sub, why, star, rec, stackTitle, winKey)=>'<div class=\"zpb-pcard zpb-awcard zpb-awgold\" style=\"'+stv(team||'')+'\">'"
new = "const aw = (title, name, team, sub, why, star, rec, stackTitle, winKey)=>'<div class=\"zpb-pcard zpb-awcard zpb-awgold\" style=\"'+stv(team||'')+(window.zpbAwardInkVars?zpbAwardInkVars(team||''):'')+'\">' // w85 (Owner): the winner text wears the 0.60 light ink"
rep(old, new, 1, 'R2-11 award card ink')

old = "'<span class=\"zpb-apchip\" style=\"'+stv(c.team)+'\"><b class=\"zpb-gname '"
new = "'<span class=\"zpb-apchip\" style=\"'+stv(c.team)+(window.zpbAwardInkVars?zpbAwardInkVars(c.team):'')+'\"><b class=\"zpb-gname '"
rep(old, new, 1, 'R2-11 all-pro chip ink (regular panel)')

old = "<span class=\"zpb-apchip\" style=\"'+stv(a.team)+'\"><b class=\"zpb-gname '"
new = "<span class=\"zpb-apchip\" style=\"'+stv(a.team)+(window.zpbAwardInkVars?zpbAwardInkVars(a.team):'')+'\"><b class=\"zpb-gname '"
rep(old, new, 1, 'R2-11 all-pro chip ink (playoff panel)')

old = "const aw = (title, p, sub2, star)=>'<div class=\"zpb-pcard zpb-awcard zpb-awgold zpb-awcol\" style=\"'+stv(p?p.team:'')+(star?';--zrb:var(--accent)':'')+'\">'"
new = "const aw = (title, p, sub2, star)=>'<div class=\"zpb-pcard zpb-awcard zpb-awgold zpb-awcol\" style=\"'+stv(p?p.team:'')+(window.zpbAwardInkVars?zpbAwardInkVars(p?p.team:''):'')+(star?';--zrb:var(--accent)':'')+'\">' // w85 (Owner): the playoff winner text wears the 0.60 light ink too"
rep(old, new, 1, 'R2-11 playoff award card ink')

# ---------- R2-19 · the season rating speaks the OVR scale ----------
old = """function rankTag(rec){
 ensureRatings();
 const n = rec._rank, r = rec._rating;
 if(!n) return '';
 if(n===1) return `the league's top-rated ${GROUP_SINGULAR[rec.group]}, ${Math.round(r)}`; // w32 (Owner): integers
 if(n<=5) return `rated #${n} among ${GROUP_PLURAL[rec.group]} (${Math.round(r)})`; // w32 (Owner): integers
 return '';
}"""
new = """function rankTag(rec){
 ensureRatings();
 const n = rec._rank, r = rec._rating;
 if(!n) return '';
 const _sr = (window.zpbSeasonRating && zpbSeasonRating(rec)!=null) ? zpbSeasonRating(rec) : Math.round(r); // w85 (Owner): the rating reads on the OVR scale — an average season grades at the median OVR
 if(n===1) return `the league's top-rated ${GROUP_SINGULAR[rec.group]}, ${_sr}`; // w32 (Owner): integers
 if(n<=5) return `rated #${n} among ${GROUP_PLURAL[rec.group]} (${_sr})`; // w32 (Owner): integers
 return '';
}"""
rep(old, new, 1, 'R2-19 rank tag')

old = "  if(rec._rating!=null) out.push(chip(rec._rating.toFixed(1), 'QBR')); // w38 (R15, Owner): the QBR chip is a QB chip"
new = "  if(rec._rating!=null) out.push(chip(String((window.zpbSeasonRating && zpbSeasonRating(rec)!=null) ? zpbSeasonRating(rec) : Math.round(rec._rating)), 'QBR')); // w85 (Owner): the season rating on the OVR scale — integers"
rep(old, new, 1, 'R2-19 QBR chip')

old = "(r._rating!=null?Math.round(r._rating):Math.round(r.ovr||0)))+'<i>'"
new = "((r._rating!=null && window.zpbSeasonRating && zpbSeasonRating(r)!=null) ? zpbSeasonRating(r) : (r._rating!=null?Math.round(r._rating):Math.round(r.ovr||0))))+'<i>'"
rep(old, new, 1, 'R2-19 preview card rating')

old = "+ schip('100', 'QBR', 'The season performance grade the math computes for this player against his peers.')"
new = "+ schip('100', 'QBR', 'The season performance grade the math computes for this player against his peers, on the OVR scale — an average season grades at the league\\'s median OVR, a worse one below his own.')"
rep(old, new, 1, 'R2-19 badges guide text')

old = "  <li><b>OVR</b>  ·  a player's overall rating from Madden NFL 27, from about 50 to 99.</li>"
new = ("  <li><b>OVR</b>  ·  a player's overall rating from Madden NFL 27, from about 50 to 99.</li>\n"
       "  <li><b>Season rating</b>  ·  the grade a player's season earns against his peers, shown on the OVR scale. An average season grades at the median OVR of every player in the database (${(window.ZPB_MEDIAN_OVR!=null)?window.ZPB_MEDIAN_OVR:'about 76'}); a worse season grades below his own OVR — the gap in points is the shortfall.</li>")
rep(old, new, 1, 'R2-19 glossary season rating')

print('part 1 ok — bytes now', len(html))

# ---------- R2-12 · the chained round cinematics for the Sim Playoffs run ----------
old = """  const close = ()=>{ timers.forEach(t=>clearTimeout(t)); const x = document.querySelector('.zpb-replay-ov'); if(x) x.remove(); document.removeEventListener('keydown', esc); try{ if(typeof zpbFxDrain==='function') zpbFxDrain(false); }catch(err){}
   if(window.__zpbSBReplayHold){ // w52 (Owner, M12): the final whistle hands the screen to the winner storm
    window.__zpbSBReplayHold = false;
    if(window.__zpbSBFinPending && seasonState && seasonState.champion){ window.__zpbSBFinPending = false; try{ zpbPostSuperBowlCine(); }catch(err){} }
   }
  };"""
new = """  const close = ()=>{ timers.forEach(t=>clearTimeout(t)); const x = document.querySelector('.zpb-replay-ov'); if(x) x.remove(); document.removeEventListener('keydown', esc); try{ if(typeof zpbFxDrain==='function') zpbFxDrain(false); }catch(err){}
   if(window.__zpbSBReplayHold){ // w52 (Owner, M12): the final whistle hands the screen to the winner storm
    window.__zpbSBReplayHold = false;
    if(window.__zpbSBFinPending && seasonState && seasonState.champion){ window.__zpbSBFinPending = false; try{ zpbPostSuperBowlCine(); }catch(err){} }
   }
   try{ // w85 (Owner): the Sim Playoffs run plays a full cinematic for EACH round the user's team plays — when one closes, the next mounts
    if(window.__zpbCineChain && window.__zpbCineChain.length){
     const _nx = window.__zpbCineChain.shift();
     const _last = !window.__zpbCineChain.length;
     setTimeout(function(){
      try{
       if(_last && /super bowl/i.test(_nx.roundLabel||'') && window.__zpbSBFinPending) window.__zpbSBReplayHold = true;
       zpbGameReplay(_nx, seasonUserTeam());
       if(!document.querySelector('.zpb-replay-ov')) throw new Error('cine did not mount');
      }catch(err){
       window.__zpbCineChain = null; window.__zpbPoRunHold = false;
       if(window.__zpbSBFinPending && seasonState && seasonState.champion){ window.__zpbSBFinPending = false; try{ zpbPostSuperBowlCine(); }catch(err2){} }
      }
     }, 450);
    } else if(window.__zpbCineChain){
     window.__zpbCineChain = null; window.__zpbPoRunHold = false;
     if(window.__zpbSBFinPending && seasonState && seasonState.champion){ window.__zpbSBFinPending = false; try{ zpbPostSuperBowlCine(); }catch(err){} }
    }
   }catch(err){}
  };"""
rep(old, new, 1, 'R2-12 replay close advances the chain')

old = """  const _user = seasonUserTeam();
  const _story = [];
  window.__zpbQuietSim = true; window.__zpbPoRunHold = true;
  try{
   startPlayoffs();
   for(const rk of ['wildcard','divisional','champ','superbowl']){
    simulatePlayoffRound();
    if(rk!=='superbowl'){
     const g = (seasonState.playoffRounds[rk]||[]).find(x=>x.home===_user||x.away===_user);
     if(g && g.result){
      const homeWin = g.result.homeScore>=g.result.awayScore;
      const won = g.home===_user ? homeWin : !homeWin;
      _story.push({rk, win:won, fs:(g.home===_user?g.result.homeScore:g.result.awayScore), os:(g.home===_user?g.result.awayScore:g.result.homeScore), opp:(g.home===_user?g.away:g.home)});
     }
     advancePlayoffRound();
    }
   }
  } finally { window.__zpbQuietSim = false; }
  renderSeasonTab(container);
  if(_story.length && window.__zpbPoRunHold && typeof window.zpbPlayoffRunCine==='function') window.zpbPlayoffRunCine(_story);
  else { window.__zpbPoRunHold = false; if(window.__zpbSBFinPending && seasonState && seasonState.champion){ window.__zpbSBFinPending = false; try{ zpbPostSuperBowlCine(); }catch(err){} } }"""
new = """  const _user = seasonUserTeam();
  const _cine = []; // w85 (Owner): every round the user's team plays, in bracket order — each gets its own full cinematic
  window.__zpbQuietSim = true; window.__zpbPoRunHold = true;
  try{
   startPlayoffs();
   for(const rk of ['wildcard','divisional','champ','superbowl']){
    simulatePlayoffRound();
    const g = (seasonState.playoffRounds[rk]||[]).find(x=>x.home===_user||x.away===_user);
    if(g && g.result && g.result.homeEvents && g.result.homeEvents.length) _cine.push(g);
    if(rk!=='superbowl') advancePlayoffRound();
   }
  } finally { window.__zpbQuietSim = false; }
  renderSeasonTab(container);
  if(_cine.length && typeof zpbGameReplay==='function' && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)){
   window.__zpbCineChain = _cine.slice(1); // the rounds after the first — the close handler mounts them one by one
   setTimeout(function(){
    try{
     const _first = _cine[0];
     if(!window.__zpbCineChain.length && /super bowl/i.test(_first.roundLabel||'') && window.__zpbSBFinPending) window.__zpbSBReplayHold = true;
     zpbGameReplay(_first, _user);
     if(!document.querySelector('.zpb-replay-ov')) throw new Error('cine did not mount');
    }catch(err){
     window.__zpbCineChain = null; window.__zpbPoRunHold = false;
     if(window.__zpbSBFinPending && seasonState && seasonState.champion){ window.__zpbSBFinPending = false; try{ zpbPostSuperBowlCine(); }catch(err2){} }
    }
   }, 480);
  }
  else { window.__zpbPoRunHold = false; window.__zpbCineChain = null; if(window.__zpbSBFinPending && seasonState && seasonState.champion){ window.__zpbSBFinPending = false; try{ zpbPostSuperBowlCine(); }catch(err){} } }"""
rep(old, new, 1, 'R2-12 sim playoffs chains the round cinematics')

# ---------- R2-14 + R2-2 · BACK TO <stage> bars on the five tool pages + the gated banner ----------
old = " function top(){ try{ window.scrollTo(0,0); }catch(e){} }"
new = """ function top(){ try{ window.scrollTo(0,0); }catch(e){} }
 // ---- w85 (Owner): the season rating reads on the OVR scale — the median OVR of every player in the database is the average line ----
 try{
  var _alls = (typeof PLAYERS!=='undefined') ? PLAYERS.map(function(p){ return p[3]; }).sort(function(a,b){ return a-b; }) : [];
  var _mid = 76;
  if(_alls.length){ _mid = (_alls.length%2) ? _alls[(_alls.length-1)/2] : Math.round((_alls[_alls.length/2-1]+_alls[_alls.length/2])/2); }
  window.ZPB_MEDIAN_OVR = _mid;
  window.zpbSeasonRating = function(rec){ try{ if(!rec || rec._rating==null) return null; return Math.max(1, Math.min(99, Math.round(_mid + (rec._rating - 50)))); }catch(e){ return null; } };
 }catch(e){}
 // ---- w85 (Owner): the award text's 0.60 light ink ----
 window.zpbAwardInkVars = function(name){
  try{ if(typeof zpbPackFor!=='function' || !name) return ''; var pk=zpbPackFor(name); return (pk && pk.txM6) ? (';--nm:'+pk.txM6+';--nmS:'+pk.txM6+';') : ''; }catch(e){ return ''; }
 };
 // ---- w85 (Owner): BACK TO <stage> at the top and the bottom of the Guide and every footer tool ----
 function zpbBackBarsInject(){
  try{
   ['viewRankings','viewPlayers','viewGroups','viewGuide','viewCompare'].forEach(function(id){
    var v = document.getElementById(id); if(!v || v.querySelector('.zpb-view-backbar')) return;
    var tp = document.createElement('div'); tp.className = 'zpb-view-backbar zpb-top'; tp.hidden = true;
    tp.innerHTML = '<div class="zpb-vbb-in"><span class="zpb-sb-k">Back to</span><span class="zpb-sb-st"></span><button class="resetbtn" data-zbbgo="1">Back to</button></div>';
    var bt = tp.cloneNode(true); bt.classList.remove('zpb-top'); bt.classList.add('zpb-bot');
    v.insertBefore(tp, v.firstChild); v.appendChild(bt);
   });
   if(!window.__zpbBBWired){
    window.__zpbBBWired = true;
    document.addEventListener('click', function(ev){
     var t = ev.target && ev.target.closest ? ev.target.closest('[data-zbbgo]') : null; if(!t) return;
     ev.preventDefault();
     var S = seasonState, host = hostEl();
     setActiveTab('viewDraft','tabDraftBtn');
     try{ if(S) renderSeasonTab(host); }catch(e){}
     top();
    });
   }
  }catch(e){}
 }
 function zpbBackBarsSync(){
  try{
   var st = stageOf(seasonState||null);
   var bars = document.querySelectorAll('.zpb-view-backbar');
   for(var i=0;i<bars.length;i++){
    var b = bars[i];
    if(!st){ b.hidden = true; continue; }
    var t2 = b.querySelector('.zpb-sb-st'), go = b.querySelector('[data-zbbgo]');
    if(t2) t2.textContent = st.label;
    if(go) go.textContent = 'Back to ' + st.label;
    b.hidden = false;
   }
  }catch(e){}
 }
 // ---- w85 (Owner): the hover banner waits — it appears only after the page's own equivalent button scrolls out of view ----
 var _io = null, _anchor = null;
 function anchorVisible(a){
  try{ var r = a.getBoundingClientRect(); var vh = window.innerHeight || document.documentElement.clientHeight; return r.bottom > 0 && r.top < vh && r.right > 0 && r.left < (window.innerWidth||document.documentElement.clientWidth); }catch(e){ return true; }
 }
 function anchorFor(act, S){
  var ids = {
   beginseason:['beginSeasonBtn','beginSeasonBtn2'],
   playweek:['simWeekBtn'],
   nextweek:['nextWeekBtn'],
   beginpo:['beginPlayoffsBtn','simPlayoffsBtn'],
   playround:['simRoundBtn'],
   nextround:['nextRoundBtn'],
   review:[S && S.showReview ? 'backToSbBtn' : 'seasonReviewBtn'],
   startseason:['startSeasonHeroBtn','startSeasonBtn'],
   draft:['draftLive']
  }[act] || [];
  for(var i=0;i<ids.length;i++){ var e2 = el(ids[i]); if(e2 && e2.offsetParent !== null) return e2; }
  return null;
 }
 function gateBanner(){
  try{
   if(!bar) return;
   var st = stageOf(seasonState||null); if(!st) return;
   var vd = el('viewDraft');
   var onSeason = !!(vd && vd.classList.contains('active'));
   var anchor = null;
   if(onSeason){
    var cta = stageCTA(st);
    if(cta) anchor = anchorFor(cta.act, seasonState);
   } else {
    var av = document.querySelector('.view.active');
    if(av) anchor = av.querySelector('.zpb-view-backbar.zpb-top');
   }
   if(!anchor) return; // no equivalent button on the page — the banner keeps its own judgment
   if(_anchor === anchor && _io) return; // the watcher is already on this button
   if(_io){ _io.disconnect(); _io = null; }
   if(typeof IntersectionObserver === 'undefined'){ return; } // no observer — the banner keeps the previous behavior
   _anchor = anchor;
   bar.hidden = anchorVisible(anchor); // the synchronous first verdict — the observer owns every scroll after it
   _io = new IntersectionObserver(function(ents){
    ents.forEach(function(en){ try{ if(_anchor === anchor) bar.hidden = en.isIntersecting; }catch(e){} });
   }, {threshold:0});
   _io.observe(anchor);
  }catch(e){}
 }"""
rep(old, new, 1, 'R2-2/R2-14 banner gate + back bars')

old = """   var sig = bannerSig();
   if(sig==='off'){ bar.hidden=true; lastSig=''; return; }
   if(sig!==lastSig){ lastSig=sig; bar.hidden=false; paint(); }"""
new = """   var sig = bannerSig();
   if(sig==='off'){ bar.hidden=true; lastSig=''; try{ zpbBackBarsSync(); }catch(e){} return; }
   if(sig!==lastSig){ lastSig=sig; bar.hidden=false; paint(); }
   try{ zpbBackBarsSync(); }catch(e){} // w85 (Owner): the Back-to bars carry the stage at the top and the bottom of every tool page
   try{ gateBanner(); }catch(e){} // w85 (Owner): the banner waits until the page's own button scrolls away"""
rep(old, new, 1, 'R2-2 banner update hooks the gate')

old = """ document.head.appendChild(css);
 setTimeout(function(){ try{ zpbUpdateStageBanner(); }catch(e){} }, 0);"""
new = """ document.head.appendChild(css);
 try{ zpbBackBarsInject(); }catch(e){} // w85 (Owner): the Back-to bars mount with the page
 setTimeout(function(){ try{ zpbUpdateStageBanner(); }catch(e){} }, 0);"""
rep(old, new, 1, 'R2-14 bars inject at boot')

# ---------- R2-13/R2-18/R2-20 · the DRAFT COMMAND CENTER on the Season Review ----------
old = ' html += `<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">${user}</h3>${zpbMetricsHTML()}</div>`;'
new = """ html += `<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">${user}</h3>${zpbMetricsHTML()}</div>`;
 html += (typeof window.zpbDraftCommandCenterHTML==='function') ? window.zpbDraftCommandCenterHTML() : ''; // w85 (Owner): the Draft Command Center leads the review"""
rep(old, new, 1, 'R2-13 command center mounts on the review')

# ---------- the payload: the command center builder inside the final IIFE ----------
old = """ window.zpbAwardInkVars = function(name){
  try{ if(typeof zpbPackFor!=='function' || !name) return ''; var pk=zpbPackFor(name); return (pk && pk.txM6) ? (';--nm:'+pk.txM6+';--nmS:'+pk.txM6+';') : ''; }catch(e){ return ''; }
 };"""
new = """ window.zpbAwardInkVars = function(name){
  try{ if(typeof zpbPackFor!=='function' || !name) return ''; var pk=zpbPackFor(name); return (pk && pk.txM6) ? (';--nm:'+pk.txM6+';--nmS:'+pk.txM6+';') : ''; }catch(e){ return ''; }
 };
 // ---- w85 (Owner): the DRAFT COMMAND CENTER — the rooms below a B, then CUTDOWN DAY, then the next-draft line ----
 window.zpbDraftCommandCenterHTML = function(){
  try{
   var S = seasonState;
   if(!S || S.phase!=='complete' || !S.showReview) return '';
   if(typeof draftSim==='undefined' || !draftSim || !draftSim.rosters) return '';
   var me = draftSim.rosters[draftSim.userIndex]; if(!me) return '';
   var user = seasonUserTeam(); if(!user || !S.unitRanks || !S.unitRanks[user]) return '';
   var U = S.unitRanks[user];
   var _good = {'A+':1,'A':1,'A-':1,'B+':1,'B':1};
   var rooms = Object.keys(UNIT_INFO).map(function(u){
    var pct = ((32-U[u])/31)*100, g = letterGrade(pct);
    return {u:u, label:UNIT_INFO[u].label, g:g, rank:U[u]};
   }).filter(function(x){ return !_good[x.g]; }).sort(function(a,b){ return a.rank-b.rank; }); // best to worst
   var order = ROSTER_SLOTS.map(function(s){ return {s:s, w:slotWins(s,90)-slotWins(s,70)}; }).sort(function(a,b){ return b.w-a.w; });
   var kw = null; order.forEach(function(x){ if(x.s==='K') kw = x.w; });
   var elig = {}; order.forEach(function(x){ if(kw!=null && x.w>=kw-1e-9) elig[x.s]=1; }); // Kicker or higher on the win-math rankings
   var med = (window.ZPB_MEDIAN_OVR!=null) ? window.ZPB_MEDIAN_OVR : 76;
   var nat = {};
   (draftSim.pool||[]).forEach(function(p){ nat[p[0]] = p; });
   var cuts = [];
   ROSTER_SLOTS.forEach(function(sl){
    var e = normalizeSlotEntry(me.slots[sl]); if(!e || !e.name) return;
    var row = nat[e.name]; var ovr = row ? row[3] : Math.round(e.ovr);
    if(!(ovr<80)) return; // 1 · below 80 OVR
    if(!elig[sl]) return; // 2 · a spot Kicker or higher on the win-math rankings
    var rec = S.playerStats ? S.playerStats[user+'|'+e.name] : null; if(!rec) return;
    var sr = (window.zpbSeasonRating && zpbSeasonRating(rec)!=null) ? zpbSeasonRating(rec) : null; if(sr==null) return;
    if(sr >= med) return; // 3 · the 50 line, on the new scale — the average line is the median OVR
    cuts.push({name:e.name, slot:sl, pos:(LABELS[sl]||sl), ovr:ovr, sr:sr});
   });
   cuts.sort(function(a,b){ return a.sr-b.sr; });
   if(!rooms.length && !cuts.length) return '';
   var uv = (typeof zpbUserRowVars==='function') ? zpbUserRowVars() : '';
   var h = '<div class="panel zpb-dcc" style="margin-bottom:14px;">'
    + '<h3 style="margin-top:0;text-align:center;">DRAFT COMMAND CENTER</h3>';
   if(rooms.length){
    h += '<div class="zpb-dcc-ugrid">'
     + rooms.map(function(x){
      return '<div class="zpb-dcc-u"><b>'+x.label+'</b><span class="zpb-dcc-g">'+x.g+'</span><span class="narr">#'+x.rank+' of 32</span></div>';
     }).join('')
     + '</div>'
     + '<p class="narr zpb-dcc-pri" style="text-align:center;margin:10px 0 0;">PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO <b class="zpb-dcc-shine">20-0</b></p>';
   }
   if(cuts.length){
    h += '<h4 class="zpb-dcc-cdtitle">CUTDOWN DAY</h4>'
     + '<div class="zpb-dcc-pgrid">'
     + cuts.map(function(c){
      var gap = (c.sr < c.ovr) ? (c.ovr - c.sr) : 0;
      return '<div class="zpb-dcc-p"'+(uv?' style="'+uv+'"':'')+'>'
       + '<div class="zpb-dcc-hd"><b>'+c.name+'</b><span class="zpb-poschip">'+c.pos+'</span></div>'
       + '<div class="zpb-dcc-badges">'
       + '<span class="zpb-schip"><b>'+c.ovr+'</b><i>OVR</i></span>'
       + '<span class="zpb-schip"><b>'+c.sr+'</b><i>SEASON RATING</i></span>'
       + (gap>0 ? '<span class="narr">'+gap+' below his OVR</span>' : '')
       + '</div>'
       + '<span class="zpb-dcc-cut zpb-shine">CUT</span>'
       + '</div>';
     }).join('')
     + '</div>';
   }
   h += '</div>';
   return h;
  }catch(err){ return ''; }
 };"""
rep(old, new, 1, 'R2-13 command center builder')

# ---------- the w85 stylesheet payload grows for the new panels ----------
old = """  + '@media (max-width:900px){ .zpb-cd .zpb-cd-grid{grid-template-columns:1fr;} }';"""
new = """  + '@media (max-width:900px){ .zpb-cd .zpb-cd-grid{grid-template-columns:1fr;} }'
  /* w85 (Owner): the Back-to bars — the banner's own pill language at the top and the bottom of every tool page */
  + '.zpb-view-backbar{width:100%;display:flex;justify-content:center;margin:2px 0 12px;position:relative;z-index:40;}'
  + '.zpb-view-backbar.zpb-bot{margin:12px 0 2px;}'
  + '.zpb-view-backbar[hidden]{display:none;}'
  + '.zpb-view-backbar .zpb-vbb-in{display:flex;align-items:center;gap:10px;max-width:92vw;background:linear-gradient(100deg,var(--panel2),var(--panel));border:1px solid var(--rosehair,var(--border));border-radius:999px;padding:7px 10px 7px 16px;box-shadow:0 10px 34px rgba(20,10,16,.42), 0 2px 10px rgba(20,10,16,.3);}'
  + '.zpb-view-backbar .zpb-sb-k{font-family:\\'Cinzel Decorative\\',\\'Cinzel\\',Georgia,serif;font-weight:800;font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;color:var(--sub);white-space:nowrap;}'
  + '.zpb-view-backbar .zpb-sb-st{font-family:\\'Cinzel Decorative\\',\\'Cinzel\\',Georgia,serif;font-weight:800;font-size:.82rem;letter-spacing:.08em;color:var(--text);white-space:nowrap;}'
  /* w85 (Owner): no dark pregame player panels in light mode — every team, both themes */
  + '.zpb-intro-star{background:linear-gradient(155deg,color-mix(in srgb,var(--zrb,#d9a94c) 24%,rgba(255,249,238,.92)),color-mix(in srgb,var(--zrb,#d9a94c) 9%,rgba(255,249,238,.96))) !important;border:1px solid color-mix(in srgb,var(--zrb,#d9a94c) 45%,rgba(120,84,40,.35)) !important;box-shadow:0 4px 18px rgba(83,56,43,.16) !important;}'
  + '.zpb-intro-star.zpb-st-side,.zpb-intro-star.zpb-st-side-r{background:linear-gradient(155deg,color-mix(in srgb,var(--zrb,#d9a94c) 20%,rgba(255,249,238,.90)),color-mix(in srgb,var(--zrb,#d9a94c) 7%,rgba(255,249,238,.95))) !important;}'
  + '.zpb-intro-star b{color:var(--tn,var(--text)) !important;}'
  + '.zpb-intro-star b.zpb-vib{color:var(--tn,var(--text)) !important;}'
  + ':root[data-theme="dark"] .zpb-intro-star{background:linear-gradient(155deg,color-mix(in srgb,var(--zrb,#d9a94c) 26%,rgba(16,9,4,.66)),color-mix(in srgb,var(--zrb,#d9a94c) 10%,rgba(16,9,4,.76))) !important;border:1px solid rgba(217,169,76,.4) !important;box-shadow:0 4px 18px rgba(0,0,0,.35) !important;}'
  + ':root[data-theme="dark"] .zpb-intro-star.zpb-st-side,:root[data-theme="dark"] .zpb-intro-star.zpb-st-side-r{background:linear-gradient(155deg,color-mix(in srgb,var(--zrb,#d9a94c) 22%,rgba(16,9,4,.60)),color-mix(in srgb,var(--zrb,#d9a94c) 8%,rgba(16,9,4,.70))) !important;}'
  + ':root[data-theme="dark"] .zpb-intro-star b,:root[data-theme="dark"] .zpb-intro-star b.zpb-vib{color:var(--tnd,#f2e4c8) !important;}'
  + '@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-intro-star{background:linear-gradient(155deg,color-mix(in srgb,var(--zrb,#d9a94c) 26%,rgba(16,9,4,.66)),color-mix(in srgb,var(--zrb,#d9a94c) 10%,rgba(16,9,4,.76))) !important;border:1px solid rgba(217,169,76,.4) !important;} :root:not([data-theme="light"]) .zpb-intro-star.zpb-st-side,:root:not([data-theme="light"]) .zpb-intro-star.zpb-st-side-r{background:linear-gradient(155deg,color-mix(in srgb,var(--zrb,#d9a94c) 22%,rgba(16,9,4,.60)),color-mix(in srgb,var(--zrb,#d9a94c) 8%,rgba(16,9,4,.70))) !important;} :root:not([data-theme="light"]) .zpb-intro-star b,:root:not([data-theme="light"]) .zpb-intro-star b.zpb-vib{color:var(--tnd,#f2e4c8) !important;} }'
  /* w85 (Owner): the DRAFT COMMAND CENTER */
  + '.zpb-dcc .zpb-dcc-ugrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;}'
  + '.zpb-dcc .zpb-dcc-u{display:flex;flex-direction:column;align-items:center;gap:2px;border:1px solid var(--border);border-radius:12px;background:var(--panel2);padding:8px 6px;text-align:center;min-width:0;}'
  + '.zpb-dcc .zpb-dcc-u b{font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text);overflow-wrap:anywhere;}'
  + '.zpb-dcc .zpb-dcc-g{font-family:\\'Cinzel Decorative\\',\\'Cinzel\\',Georgia,serif;font-weight:800;font-size:1.15rem;color:var(--accent);}'
  + '.zpb-dcc .zpb-dcc-pri{font-weight:700;letter-spacing:.04em;}'
  + '.zpb-dcc .zpb-dcc-shine{color:var(--g5,#ffe9c6) !important;-webkit-text-fill-color:var(--g5,#ffe9c6) !important;background:none !important;animation:none;font-size:1.05em;}'
  + '@supports ((-webkit-background-clip:text) or (background-clip:text)){ .zpb-dcc .zpb-dcc-shine{background:linear-gradient(90deg,var(--tA,#c9a24b),var(--tA2,#cf8a60) 30%,var(--tA3,#fff3d6) 50%,var(--tA2) 70%,var(--tA)) !important;background-size:220% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;animation:fxshine 5.5s linear infinite;font-weight:800;} }'
  + '.zpb-dcc .zpb-dcc-cdtitle{text-align:center;font-family:\\'Cinzel Decorative\\',\\'Cinzel\\',Georgia,serif;font-weight:900;font-size:1.34rem;letter-spacing:.14em;margin:16px 0 10px;color:var(--text);}'
  + '.zpb-dcc .zpb-dcc-pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(236px,1fr));gap:10px;}'
  + '.zpb-dcc .zpb-dcc-p{position:relative;border:1px solid var(--border);border-radius:14px;background:linear-gradient(160deg,var(--panel),var(--zr2,var(--panel2)));padding:10px 12px;min-width:0;}'
  + '.zpb-dcc .zpb-dcc-hd{display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0;}'
  + '.zpb-dcc .zpb-dcc-hd b{font-size:.92rem;color:var(--nm,var(--text));overflow-wrap:anywhere;}'
  + '.zpb-dcc .zpb-dcc-badges{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:7px;padding-right:46px;}'
  + '.zpb-dcc .zpb-dcc-badges .zpb-schip b{font-size:.66rem;}'
  + '.zpb-dcc .zpb-dcc-badges .zpb-schip i{font-size:.5rem;letter-spacing:.08em;}'
  + '.zpb-dcc .zpb-dcc-cut{position:absolute;right:10px;bottom:8px;font-family:\\'Cinzel Decorative\\',\\'Cinzel\\',Georgia,serif;font-weight:900;font-size:.78rem;letter-spacing:.18em;}'"""
rep(old, new, 1, 'payload css')

print('part 2 ok — bytes now', len(html))

open(OUT, 'w', encoding='utf-8').write(html)
print('WROTE', OUT, len(html), 'bytes', 'md5:', hashlib.md5(html.encode()).hexdigest())
