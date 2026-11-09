#!/usr/bin/env python3
# zpb_w86.py — the w86 generator: asserted exact replacements from the pristine w85 (2) base.
# Base: Football-Sim-Z-post-blue-w85 (2).html · md5 eb91abd22f335e34f6898dcff5e6dde6 · 1,864,914 B
# Every change is one asserted replacement; the script fails loudly if any anchor is absent.
# REV 2 (w86.1, 9 Nov 2026 — the muse review fixes, P-307): (a) the census stage-4 header comment
#   corrected (the code always read the whole FLEX table for any open slot; the comment claimed
#   "cost <= 4" / "depth slots only"); (b) the P-302 guard casing extended to the five remaining
#   surfaces (GROUP_DEFS, the two OG1/OG2 slot-label tables, the Guide legend span, the position
#   info table); (c) the Guide field-map legend gains FB (Fullback); (d) the Guide BADGES section
#   carries the performance-scale law (the season grade centers on the drafted pool's median OVR).
#   The published w86 (md5 64cbb716…) is REV 1 (32 replacements); REV 2 emits w86.1 (39 replacements: REV 1's 32 + 7 new).
import re, sys, hashlib

SRC = '/home/z/my-project/work-w85.html'
OUT = '/home/z/my-project/build/Football-Sim-Z-post-blue-w86.html'
src = open(SRC, encoding='utf-8').read()
assert hashlib.md5(src.encode()).hexdigest() == 'eb91abd22f335e34f6898dcff5e6dde6', 'base md5 mismatch'

n = 0
def rep(old, new, label, count=1):
    global src, n
    c = src.count(old)
    assert c == count, f'ANCHOR FAIL [{label}]: found {c}, expected {count}\n---\n{old[:200]}'
    src = src.replace(old, new)
    n += 1
    print(f'  ok {n:02d} · {label}')

# ============================================================
# T1a · the homepage DRAFT button — light wears the team's LIGHT 0.50 halfway
# ============================================================
rep(":root[data-zpbteam] #startDraftBtn{color:var(--tTxM,var(--accent2));}",
    ":root[data-zpbteam] #startDraftBtn{color:var(--tOnMetal,var(--tTxMd,var(--accent2)));} /* w86 (Owner): the DRAFT button's ink is the team's own 0.50 halfway CHOSEN OFF THE METAL — the Jets' dark metal takes the light halfway, bright metal ramps keep the dark one; no dark-on-dark, any team, either theme */",
    'T1a startDraftBtn light ink -> tTxMd')

# ============================================================
# T1b · the confirm YES button — the ink follows its bubble, never dark-on-dark
# (the rules ride the w86 style block below; this anchor marks the law's site)
# ============================================================
rep('function confirmDialog(msg, yesLabel, onYes){',
    "function zpbConfirmDialogW86(msg, yesLabel, onYes){ return confirmDialog(msg, yesLabel, onYes); } // w86: the confirm yes ink law rides the zpb-w86-css block — the site of the law is this dialog\nfunction confirmDialog(msg, yesLabel, onYes){",
    'T1b confirm dialog site marker')

# ============================================================
# T1c · the on-bubble 0.50 neutral inks (the pack learns --tOnA3 / --tOnA3d)
# ============================================================
rep(" const txd=zpbMix('#f5e9dd',accD,0.14), sud=zpbMix('#c8a48f',accD,0.2);",
""" const zpbSolveInk=(start,wit,bar)=>{ // w86: the readability floor as a solver — walk both directions from the 0.50 neutral in small steps, take the first stop that clears every witness (the smallest departure that reads)
  const mids=[wit[0],wit[1],wit[2]];
  const margin=x=>Math.min(...mids.map(m2=>zpbContrast(x,m2)))-bar;
  const walk=b=>{ let v=start; for(let g=0;g<110;g++){ if(margin(v)>=0) return {v,m:margin(v),g}; v=zpbMix(b,v,0.05); } return {v,m:margin(v),g:99}; };
  const a=walk('#2c1e0c'), b=walk('#fffaf2');
  if(a.g===99 && b.g===99) return (a.m>b.m)?a.v:b.v;
  if(a.g===99) return b.v;
  if(b.g===99) return a.v;
  return (a.g===b.g ? (a.m>=b.m) : (a.g<b.g)) ? a.v : b.v;
 };
 const onA3=(function(){ try{ // w86 (Owner): the on-bubble 0.50 neutral — the halfway mix from cream toward the bubble, floored at 4:1 on the bubble itself
  return zpbSolveInk(zpbMix('#fffaf2',acc3L,0.5), [acc3L,acc3L,acc3L], 4);
 }catch(e){ return '#fffaf2'; } })();
 const onA3d=(function(){ try{ // w86: the dark mirror — the 0.50 neutral on the dark-mode bubble, same floor
  return zpbSolveInk(zpbMix('#2c1e0c',acc3D,0.5), [acc3D,acc3D,acc3D], 4);
 }catch(e){ return '#2c1e0c'; } })();
 const txd=zpbMix('#f5e9dd',accD,0.14), sud=zpbMix('#c8a48f',accD,0.2);""",
    'T1c on-bubble neutral inks (pack)')

rep("'--tTxM':(txM||txL),'--tTxMd':(txMd||txd), /* w51 (Owner): the team's 0.50 halfway ink rides the takeover too — the DRAFT button's ink, the halfway law carried to the gold */",
"""'--tTxM':(txM||txL),'--tTxMd':(txMd||txd), /* w51 (Owner): the team's 0.50 halfway ink rides the takeover too — the DRAFT button's ink, the halfway law carried to the gold */
  '--tOnA3':onA3,'--tOnA3d':onA3d, /* w86 (Owner): the on-bubble 0.50 neutral — the confirm YES button's ink, per bubble */
  '--tOnMetal':onMetal,'--tOnMetald':onMetald, /* w86 (Owner): the DRAFT button's ink — the halfway that reads on the team's own metal ramp */""",
    'T1c on-bubble inks wired into vars')

rep("'--tO1d','--tO2d','--tO3d','--tO4d','--tD1d','--tD2d'];",
    "'--tO1d','--tO2d','--tO3d','--tO4d','--tD1d','--tD2d','--tOnA3','--tOnA3d','--tOnMetal','--tOnMetald'];",
    'T1c token keys registered')

# ============================================================
rep(':root[data-theme="dark"][data-zpbteam] #startDraftBtn{color:var(--tTxMd,var(--accent2));}',
    ':root[data-theme="dark"][data-zpbteam] #startDraftBtn{color:var(--tOnMetald,var(--tTxMd,var(--accent2)));} /* w86: the dark ramp gets its own chosen halfway */',
    'T1d dark rule -> tOnMetald')

rep('@media (prefers-color-scheme: dark){ :root:not([data-theme="light"])[data-zpbteam] #startDraftBtn{color:var(--tTxMd,var(--accent2));} }',
    '@media (prefers-color-scheme: dark){ :root:not([data-theme="light"])[data-zpbteam] #startDraftBtn{color:var(--tOnMetald,var(--tTxMd,var(--accent2)));} }',
    'T1d media rule -> tOnMetald')

# ============================================================
# T1d · the DRAFT button's metal ink — the family opposes the ramp, floored inside its own range
# ============================================================
rep(" pk.vars = {",
""" const zpbMetalWit=keys=>{ // the ramp's witnesses: the color-space mean (what the sweeping eye averages), a gray at the luminance mean, and the ramp's mean luminance
  const zpbLumHex=h=>{ const n=parseInt(h.slice(1),16); const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);}; return 0.2126*f((n>>16)&255)+0.7152*f((n>>8)&255)+0.0722*f(n&255); };
  const stops=keys.map(k=>pk[k]);
  const mid = stops.reduce((a,h)=>zpbMix(a,h,0.5),'#fffaf2');
  const midL = stops.reduce((a,h)=>a+zpbLumHex(h),0)/stops.length;
  let v=128, lo=0, hi=255, g2=0;
  while(g2++<24){ const l=zpbLumHex('#'+[v,v,v].map(x=>x.toString(16).padStart(2,'0')).join('')); if(Math.abs(l-midL)<0.002) break; if(l>midL) hi=v; else lo=v; v=Math.round((lo+hi)/2); }
  return [mid, '#'+[v,v,v].map(x=>x.toString(16).padStart(2,'0')).join('')];
 };
 const zpbLumOfW86=h=>{ const n=parseInt(h.slice(1),16); const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);}; return 0.2126*f((n>>16)&255)+0.7152*f((n>>8)&255)+0.0722*f(n&255); };
 const onMetal=(function(){ try{ // w86 (Owner): the ink family OPPOSES the metal the eye sees (a dark metal takes the LIGHT halfway — the Jets law; a light metal keeps the dark halfway), then the floor walks that family inside its own range (never near-black, never pure cream) until both midpoints read 3.2:1 — the cream halo carries the extremes
  const wit=zpbMetalWit(['b1','b2','b3','b4','b5','b6']);
  const famL = zpbLumOfW86(wit[0]) < 0.5;
  let v = famL ? (txMd||txd) : txM;
  const base = famL ? '#fffaf2' : '#2c1e0c';
  let best = v, bestM = -1e9;
  for(let g=0; g<90; g++){
    const l = zpbLumOfW86(v);
    const m = Math.min(zpbContrast(v,wit[0]), zpbContrast(v,wit[1]));
    const inRange = famL ? (l >= 0.5 && l <= 0.93) : (l >= 0.05 && l <= 0.16);
    if(inRange && m > bestM){ best = v; bestM = m; }
    if(m >= 3.2) break;
    if((famL && l >= 0.92) || (!famL && l <= 0.055)) break;
    v = zpbMix(base, v, 0.06);
  }
  return best;
 }catch(e){ return txM; } })();
 const onMetald=(function(){ try{ // w86: the dark-theme ramp gets the same law on the d-stops
  const wit=zpbMetalWit(['b1d','b2d','b3d','b4d','b5d','b6d']);
  const famL = zpbLumOfW86(wit[0]) < 0.5;
  let v = famL ? (txMd||txd) : txM;
  const base = famL ? '#fffaf2' : '#2c1e0c';
  let best = v, bestM = -1e9;
  for(let g=0; g<90; g++){
    const l = zpbLumOfW86(v);
    const m = Math.min(zpbContrast(v,wit[0]), zpbContrast(v,wit[1]));
    const inRange = famL ? (l >= 0.5 && l <= 0.93) : (l >= 0.05 && l <= 0.16);
    if(inRange && m > bestM){ best = v; bestM = m; }
    if(m >= 3.2) break;
    if((famL && l >= 0.92) || (!famL && l <= 0.055)) break;
    v = zpbMix(base, v, 0.06);
  }
  return best;
 }catch(e){ return (txMd||txd); } })();
 pk.vars = {""",
    'T1d metal inks (pack)')

# ============================================================
# T2 · the census law — nobody ends the draft with an empty slot
# ============================================================
OLD_FILL = """window.zpbFillAllLineups = function(){
 if(typeof draftSim==='undefined' || !draftSim || !draftSim.rosters) return;
 if(typeof ROSTER_SLOTS==='undefined' || typeof WV_SLOT_GROUP==='undefined') return;
 (draftSim.rosters||[]).forEach(r=>{
  const sm = r.slots || {};
  const used = new Set(Object.keys(sm).filter(k=>sm[k]).map(k=> Array.isArray(sm[k]) ? sm[k][0] : sm[k].name));
  ROSTER_SLOTS.forEach(s=>{
   if(sm[s]) return;
   const g = WV_SLOT_GROUP[s];
   let best = null, bestO = -1e9;
   (draftSim.pool||[]).forEach(p=>{
    if(used.has(p[0])) return;
    if(!zpbAutoLegal(p[1], s)) return; // w66 (P-232): the auto-fill obeys the unit law — in-unit only, never a cross-unit stretch
    const fit = p[3] - flexPenaltyFor(p[1], s);
    if(fit > bestO){ bestO = fit; best = p; }
   });
   // w66 (P-232): the w38 flat -9 "anyone anywhere" emergency retires — every unit has
   // natural players in the pool, and an honest gap reads better than a punter at kicker.
   if(best){ sm[s] = [best[0], best[1], best[2], best[3]]; used.add(best[0]); }
  });
 });
};"""
NEW_FILL = """window.ZPB_REAL_SLOT_POS = {TE3:'TE',LB4:'MIKE',SS2:'SS',FS2:'FS',DL5:'DT',WR4:'WR',FB:'FB',K:'K',P:'P'}; // w86: real-roster-only keys -> the position their DB row carries (or a sane fallback)
window.zpbFillAllLineups = function(){
 if(typeof draftSim==='undefined' || !draftSim || !draftSim.rosters) return;
 if(typeof ROSTER_SLOTS==='undefined' || typeof WV_SLOT_GROUP==='undefined') return;
 // w86 (Owner): the census law — nobody ends the draft with an empty slot, CPU or user.
 //  Stage 1 keeps the w66 in-unit pool fill (never a cross-unit stretch).
 //  Stage 2 signs the slot's own REAL-NFL body — the player who holds that job on the real
 //   roster (TEAM_DATA) — when nobody drafted him. The real TE2 lands at TE2, the real MIKE at MIKE.
 //  Stage 3 takes the team's best undrafted REAL body whose natural slots cover the need.
 //  Stage 4 offers the cheapest LEGAL flex from the remaining pool — for ANY open slot still
 //   empty, at whatever price the Owner's FLEX table grants that slot (the whole table is the
 //   authority, not a cost cap and not a depth-slot list) — a real flex at a real price beats
 //   an empty slot.
 //  None of the w66 absurd cross-unit strays (DT at TE2, P at K) come back: stages 2-3 are the
 //   team's own real players at their real jobs, stage 4 rides the Owner's own flex law.
 (draftSim.rosters||[]).forEach(r=>{
  const sm = r.slots || {};
  const teamName = r.teamName;
  const real = (typeof TEAM_DATA!=='undefined' && TEAM_DATA[teamName]) ? TEAM_DATA[teamName] : null;
  const used = new Set(Object.keys(sm).filter(k=>sm[k]).map(k=> Array.isArray(sm[k]) ? sm[k][0] : sm[k].name));
  const draftedAnywhere = nm=>{ // is this name already on ANY roster?
   for(const rr of draftSim.rosters){ const s2=rr.slots||{}; for(const k in s2){ const q=s2[k]; if(q && (Array.isArray(q)?q[0]:q.name)===nm) return true; } }
   return false;
  };
  const dbRow = nm=>{ try{ return (typeof PLAYERS!=='undefined') ? (PLAYERS.find(p=>p[0]===nm)||null) : null; }catch(e){ return null; } };
  const mkEntry = (nm, slotKey, ovr)=>{ const row = dbRow(nm); return [nm, row ? row[1] : (window.ZPB_REAL_SLOT_POS[slotKey]||'TE'), teamName, row ? row[3] : (ovr!=null?ovr:70)]; };
  const tryPlace = (nm, slotKey, ovr)=>{ if(!nm || used.has(nm) || sm[slotKey]) return false; sm[slotKey] = mkEntry(nm, slotKey, ovr); used.add(nm); return true; };
  ROSTER_SLOTS.forEach(s=>{
   if(sm[s]) return;
   const g = WV_SLOT_GROUP[s];
   let best = null, bestO = -1e9;
   (draftSim.pool||[]).forEach(p=>{
    if(used.has(p[0])) return;
    if(!zpbAutoLegal(p[1], s)) return; // w66 (P-232): the auto-fill obeys the unit law — in-unit only, never a cross-unit stretch
    const fit = p[3] - flexPenaltyFor(p[1], s);
    if(fit > bestO){ bestO = fit; best = p; }
   });
   // w66 (P-232): the w38 flat -9 "anyone anywhere" emergency stays retired — stage 1 is in-unit only.
   if(best){ sm[s] = [best[0], best[1], best[2], best[3]]; used.add(best[0]); return; }
   // w86 stage 2 — the slot's own real-NFL player, if nobody drafted him
   const own = real ? real[s] : null;
   if(own && own.name && !draftedAnywhere(own.name)){ tryPlace(own.name, s, own.ovr); return; }
   // w86 stage 3 — the team's best undrafted REAL body whose natural slots cover this slot
   let rB=null, rO=-1;
   if(real){
    Object.keys(real).forEach(k=>{
     const e2 = real[k]; if(!e2 || !e2.name) return;
     if(draftedAnywhere(e2.name)) return;
     const row = dbRow(e2.name);
     const pos = row ? row[1] : window.ZPB_REAL_SLOT_POS[k];
     if(!pos) return;
     let legal=false; try{ legal = !!zpbAutoLegal(pos, s); }catch(e3){ legal=false; }
     if(!legal) return;
     if(e2.ovr > rO){ rO = e2.ovr; rB = e2; }
    });
   }
   if(rB && rB.name){ tryPlace(rB.name, s, rB.ovr); return; }
   // w86 stage 4 — the cheapest LEGAL flex from the remaining pool, any slot still open, at the
   // Owner's own table prices (the -4 WR-at-TE fills the short tight-end market; the -10 calls
   // close the rest). Nothing the table does not grant, ever; the price keeps the math honest.
   {
    let fB=null, fO=-1e9;
    (draftSim.pool||[]).forEach(p=>{
     if(used.has(p[0])) return;
     const pen = flexRule(p[1], s);
     if(pen==null) return; // only what the Owner's own flex table grants — the legality law never bends
     if(p[3]-pen > fO){ fO = p[3]-pen; fB = p; }
    });
    if(fB){ sm[s] = [fB[0], fB[1], fB[2], fB[3]]; used.add(fB[0]); }
   }
  });
 });
};"""
rep(OLD_FILL, NEW_FILL, 'T2 census law fill (4 stages)')

# ============================================================
# T3 · the DCC panel never retires — self-heal + always-the-panel
# ============================================================
rep("""window.zpbFixBoardHTML = function(){
 try{
  const user = seasonUserTeam(), S = seasonState;
  const R = S.unitRatings && S.unitRatings[user], rk = S.unitRanks && S.unitRanks[user];
  if(!R || !rk) return '';""",
"""window.zpbFixBoardHTML = function(){
 try{
  const user = seasonUserTeam(), S = seasonState;
  let R = S.unitRatings && S.unitRatings[user], rk = S.unitRanks && S.unitRanks[user];
  if((!R || !rk || !S.unitRanks || !S.unitRatings) && S.teams && S.teams[user]){ // w86 (Owner): the panel never retires — a restored save that lost its ratings heals itself here, the WHOLE league rebuilt (every team's ratings feed the playoff planner, not just the user's)
   try{
    S.unitRatings = S.unitRatings || {};
    Object.keys(S.teams).forEach(n=>{ if(!S.unitRatings[n]) S.unitRatings[n] = teamRatings(S.teams[n].slotmap); });
    S.unitRanks = computeUnitRanks(S.unitRatings);
    R = S.unitRatings[user]; rk = S.unitRanks && S.unitRanks[user];
   }catch(e0){}
  }""",
    'T3 DCC self-heal guard')

rep("""  return '<div class="panel zpb-fx-board" style="'+uv+'margin-bottom:14px;">'
   + '<div class="zpb-rc-title">DRAFT COMMAND CENTER</div>'
   + (rooms.length ? '<div class="zpb-fx-minis">'+roomCards+'</div>' : '<div class="zpb-fx-sec">EVERY ROOM AT A B OR BETTER</div>') // w76 (U1, Owner): the section header text is gone — the cards speak for themselves
   + '<div class="zpb-fx-cdtitle">Cutdown Day</div>' // w76 (U2+U3, Owner): the line text retires — the three rules still run in the cut math; the subtitle is centered Cinzel Decorative
   + (cards.trim() ? '<div class="zpb-fx-cutgrid">'+cards+'</div>' : '<div class="zpb-fx-none">NOBODY FALLS UNDER ALL THREE LINES</div>')
   + '<div class="zpb-fx-foot">PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO <span class="zpb-fx-goshine">20-0</span></div>' // w76 (U4, Owner): the 20-0 shimmers in the team color
   + '</div>';
 }catch(err){ return ''; }
};""",
"""  let inner = '<div class="zpb-rc-title">DRAFT COMMAND CENTER</div>'; // w86 (Owner): the panel is the law — every section degrades on its own, the command center always renders
  try{ inner += rooms.length ? '<div class="zpb-fx-minis">'+roomCards+'</div>' : '<div class="zpb-fx-sec">EVERY ROOM AT A B OR BETTER</div>'; }catch(eA){ inner += '<div class="zpb-fx-sec">EVERY ROOM AT A B OR BETTER</div>'; } // w76 (U1, Owner): the section header text is gone — the cards speak for themselves
  inner += '<div class="zpb-fx-cdtitle">Cutdown Day</div>'; // w76 (U2+U3, Owner): the line text retires — the three rules still run in the cut math; the subtitle is centered Cinzel Decorative
  try{ inner += cards.trim() ? '<div class="zpb-fx-cutgrid">'+cards+'</div>' : '<div class="zpb-fx-none">NOBODY FALLS UNDER ALL THREE LINES</div>'; }catch(eB){ inner += '<div class="zpb-fx-none">NOBODY FALLS UNDER ALL THREE LINES</div>'; }
  inner += '<div class="zpb-fx-foot">PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO <span class="zpb-fx-goshine">20-0</span></div>'; // w76 (U4, Owner): the 20-0 shimmers in the team color
  return '<div class="panel zpb-fx-board" style="'+(uv||'')+'margin-bottom:14px;">' + inner + '</div>';
 }catch(err){ // w86 (Owner): even a data gap renders the command center shell — never plain text on the page
  return '<div class="panel zpb-fx-board" style="margin-bottom:14px;"><div class="zpb-rc-title">DRAFT COMMAND CENTER</div><div class="zpb-fx-cdtitle">Cutdown Day</div><div class="zpb-fx-none">NOBODY FALLS UNDER ALL THREE LINES</div><div class="zpb-fx-foot">PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO <span class="zpb-fx-goshine">20-0</span></div></div>';
 }
};""",
    'T3 DCC panel-always return')

# ============================================================
# T4 · Season Review is the LAST page — the stage doors retire at complete
# ============================================================
rep("if(S.phase==='complete') return {label: S.showReview ? 'Season Review' : 'Champion'};",
    "if(S.phase==='complete') return {label: S.showReview ? 'Season Review' : 'Super Bowl', act:'tryagain'}; // w86 (Owner): Season Review is the LAST page — the banner offers the try-again, never a next door",
    'T4 stageOf complete -> tryagain act')
rep("if(S.phase==='complete') return {lbl: S.showReview ? 'The Champion' : 'Season Review', act:'review'};",
    "if(S.phase==='complete') return null; // w86 (Owner): the Champion/Review cycle retires — the season ends at the Season Review",
    'T4 stageCTA complete -> null')
rep("""   if(active){
    h += '<span class="zpb-sb-k">Next</span><span class="zpb-sb-st">'+st.label+'</span>' + (cta ? '<button class="resetbtn" data-zsb="'+cta.act+'" style="width:auto;margin:0;padding:6px 16px;font-size:.82rem;">'+cta.lbl+'</button>' : '');
   } else {""",
"""   if(active){
    if(seasonState && seasonState.phase==='complete'){ // w86 (Owner): the NEXT banner retires at complete — the banner IS the try-again, the 20-0 keeps its shimmer
     h += '<button class="resetbtn" data-zsb="tryagain" style="width:auto;margin:0;padding:6px 16px;font-size:.82rem;">TRY AGAIN TO GO <span class="zpb-shine">20-0</span>?</button>';
    } else h += '<span class="zpb-sb-k">Next</span><span class="zpb-sb-st">'+st.label+'</span>' + (cta ? '<button class="resetbtn" data-zsb="'+cta.act+'" style="width:auto;margin:0;padding:6px 16px;font-size:.82rem;">'+cta.lbl+'</button>' : '');
   } else {""",
    'T4 paint complete -> try-again banner')
rep("""    var cta = stageCTA(st);
    if(cta) anchor = anchorFor(cta.act, seasonState);
   } else {""",
"""    var cta = stageCTA(st);
    if(cta) anchor = anchorFor(cta.act, seasonState);
    else if(seasonState && seasonState.phase==='complete') anchor = anchorFor('tryagain', seasonState); // w86 (Owner): gated by the page's own try-again button — the R2-2 law holds at complete too
   } else {""",
    'T4 gateBanner complete anchor')
rep("review:[S && S.showReview ? 'backToSbBtn' : 'seasonReviewBtn'],",
    "review:[S && S.showReview ? 'backToSbBtn' : 'seasonReviewBtn'],\n   tryagain:['zpbTryAgainBtn'],",
    'T4 anchorFor tryagain ids')
rep("""      if(act==='review'){ clickId(S.showReview?'backToSbBtn':'seasonReviewBtn'); return; }""",
"""      if(act==='tryagain'){ try{ zpbOpenTryAgain(); }catch(e){} return; } // w86 (Owner): the banner's try-again opens the three doors
      if(act==='review'){ clickId(S.showReview?'backToSbBtn':'seasonReviewBtn'); return; }""",
    'T4 banner click -> tryagain')

# ============================================================
# T4b · the three-door dialog becomes callable from the banner + top panels
# ============================================================
rep("""document.addEventListener('click', function(e){
 if(e.target && e.target.id === 'zpbTryAgainBtn'){
  // w32 (Owner): three doors — run it back with the same team, call an audible with a new one, or cancel.
  const ov = document.createElement('div'); ov.className = 'confirm-ov';""",
"""window.zpbOpenTryAgain = function(){ // w86 (Owner): the three doors — now reachable from the banner and the top panels too
  // w32 (Owner): three doors — run it back with the same team, call an audible with a new one, or cancel.
  const ov = document.createElement('div'); ov.className = 'confirm-ov';""",
    'T4b zpbOpenTryAgain head')
rep("""   if(b.dataset.again==='run'){ try{ startSeason(); renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody')); }catch(err){} }
   if(b.dataset.again==='new'){ try{ startNewDraftFlow(); }catch(err){} }
  });
 }
});""",
"""   if(b.dataset.again==='run'){ try{ startSeason(); renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody')); }catch(err){} }
   if(b.dataset.again==='new'){ try{ startNewDraftFlow(); }catch(err){} }
  });
}; // w86: the dialog body moved into zpbOpenTryAgain — the click below just opens it
document.addEventListener('click', function(e){
 if(e.target && e.target.id === 'zpbTryAgainBtn'){ try{ zpbOpenTryAgain(); }catch(err){} }
});""",
    'T4b zpbOpenTryAgain extraction')

# ============================================================
# T5 · the top panels — TRY AGAIN TO GO 20-0? + RUN IT BACK where the Owner asked
# ============================================================
# champion page top panel (disambiguated by `let html = `)
rep("""let html = `<div class="panel zpb-sr-own" style="margin-bottom:24px;text-align:center;padding:18px 12px;"><button class="resetbtn zpb-ctabig" id="seasonReviewBtn" style="width:auto;margin:0;padding:13px 34px;">SEASON REVIEW</button></div>`""",
"""// w86 (Owner): the champions page opens with the try-again (the shimmer rides) and Run It Back; SEASON REVIEW stays the door to the last page
let html = `<div class="panel zpb-sr-own" style="margin-bottom:24px;text-align:center;padding:18px 12px;"><button class="resetbtn zpb-ctabig" id="zpbTryAgainBtn" style="width:auto;margin:0;padding:13px 34px;">TRY AGAIN TO GO <b class="zpb-shine">20-0</b>?</button> <button class="tabbtn zpb-ctabig" id="zpbRunItBackTop" style="width:auto;margin:0;padding:13px 34px;">RUN IT BACK</button> <button class="resetbtn zpb-ctabig" id="seasonReviewBtn" style="width:auto;margin:0;padding:13px 34px;">SEASON REVIEW</button></div>`""",
    'T5 champion top panel buttons')
# season review top panel
rep("""html = `<div class="panel" style="margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;"><h2 style="margin:0;">Season Review</h2><span style="display:inline-flex;gap:8px;flex-wrap:wrap;align-items:center;"><button class="tabbtn" id="backToSbBtn" style="width:auto;margin:0;padding:8px 18px;">${seasonState.phase==='complete'?'← Super Bowl':'← Back'}</button></span></div>`;""",
"""html = `<div class="panel" style="margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;"><h2 style="margin:0;">Season Review</h2><span style="display:inline-flex;gap:8px;flex-wrap:wrap;align-items:center;"><button class="resetbtn" id="zpbTryAgainBtn" style="width:auto;margin:0;padding:8px 18px;">TRY AGAIN TO GO <b class="zpb-shine">20-0</b>?</button><button class="tabbtn" id="zpbRunItBackTop" style="width:auto;margin:0;padding:8px 18px;">RUN IT BACK</button><button class="tabbtn" id="backToSbBtn" style="width:auto;margin:0;padding:8px 18px;">${seasonState.phase==='complete'?'← Super Bowl':'← Back'}</button></span></div>`; // w86 (Owner): the try-again and Run It Back lead the Season Review's own top panel""",
    'T5 season review top panel buttons')
# regular review header row (made case)
rep("""<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">${made?'<button class="resetbtn" id="beginPlayoffsBtn" style="width:auto;">Begin Playoffs</button>':''}""",
"""<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;"><button class="tabbtn" id="zpbRunItBackTop" style="width:auto;">RUN IT BACK</button>${made?'<button class="resetbtn" id="beginPlayoffsBtn" style="width:auto;">Begin Playoffs</button>':''}""",
    'T5 regular review header RIB')
# regular review door panel (!made case)
rep("""if(!made) html = `<div class="panel zpb-sr-own" style="margin-bottom:24px;text-align:center;padding:18px 12px;"><button class="resetbtn zpb-ctabig" id="seasonReviewBtn" style="width:auto;margin:0;padding:13px 34px;">SEASON REVIEW</button></div>` + html; // W66 (Owner): the shiny door sits on its own panel, first on the page — the user never has to sim the playoffs to reach the review""",
"""if(!made) html = `<div class="panel zpb-sr-own" style="margin-bottom:24px;text-align:center;padding:18px 12px;"><button class="tabbtn zpb-ctabig" id="zpbRunItBackTop" style="width:auto;margin:0;padding:13px 34px;">RUN IT BACK</button> <button class="resetbtn zpb-ctabig" id="seasonReviewBtn" style="width:auto;margin:0;padding:13px 34px;">SEASON REVIEW</button></div>` + html; // W66 (Owner): the shiny door sits on its own panel, first on the page — w86 (Owner): Run It Back rides beside it""",
    'T5 regular review door RIB')

# ============================================================
# T6 · away six hours — the site opens at home
# ============================================================
rep("""  var t = localStorage.getItem('zpb:tab');
  if(!t) return;""",
"""  var t = null; // w86 (Owner): away six hours — the site opens at home, never mid-Madden-rankings
  try{ var _at = Number(localStorage.getItem('zpb:tabAt')||'0'); t = (_at && (Date.now()-_at) > 6*60*60*1000) ? null : localStorage.getItem('zpb:tab'); }catch(err){ try{ t = localStorage.getItem('zpb:tab'); }catch(e2){} }
  if(!t) return;""",
    'T6 six-hour tab law (read)')
rep("try{ if(document.readyState!=='loading'){ localStorage.setItem('zpb:tab', viewId+'|'+btnId); } }catch(e){}",
    "try{ if(document.readyState!=='loading'){ localStorage.setItem('zpb:tab', viewId+'|'+btnId); localStorage.setItem('zpb:tabAt', String(Date.now())); } }catch(e){} // w86 (Owner): the tab stamp — the six-hour law reads it at boot",
    'T6 six-hour tab law (write)')

# ============================================================
# T7 · the Series comment tells the truth (engine-derived default)
# ============================================================
rep("// w30 (Owner): series 7 — QB + CB1 + DE1 + CB2 + WR1 + DE2 + OT1 — is the site default",
    "// w30 (Owner): the site opens on series 7 — w86 (Owner): the Series order is ENGINE-DERIVED from the live slot-wins ranking (currently QB + DE1 + WR1 + OT1 + DT1 + WR2 + OG1), never a hard-coded list",
    'T7 series comment truth', count=2)

# ============================================================
# P-301 · the badge shrink wins its specificity fight
# ============================================================
rep(".zpb-pstat{font-size:.6rem;padding:1px 5px;}",
    ".zpb-pcard-stats .zpb-pstat,.zpb-pstat{font-size:.6rem;padding:1px 5px;} /* w86 (P-301): the 0-2-0 selector beats the 0-1-1 .zpb-pcard-stats span rule — the preview badges render 12.6px as claimed */",
    'P-301 badge specificity')

# ============================================================
# P-300 · the linescore double frame (2px + inset ring + drop, 14px)
# ============================================================
rep(".linescore{border:1px solid var(--accent);border-radius:12px;overflow:hidden;background:var(--panel2);}",
    ".linescore{border:2px solid var(--accent);border-radius:14px;overflow:hidden;background:var(--panel2);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--accent) 55%,transparent),0 6px 18px rgba(0,0,0,.22);} /* w86 (P-300/W85-8): the claimed frame restored — 2px + inset ring + drop shadow, 14px radius; the border still rides var(--accent) with the score (R2-10) */",
    'P-300 linescore frame')

# ============================================================
# P-302 · Offensive guard (lowercase g), both label tables
# ============================================================
rep("OG:'Offensive Guard',C:'Center',DE:'Defensive Edge'",
    "OG:'Offensive guard',C:'Center',DE:'Defensive Edge'",
    'P-302 WV_NAMES guard casing')
rep("OG:'Offensive Guard',C:'Center',LB:'Linebacker',SS:'Strong safety',FS:'Free safety'",
    "OG:'Offensive guard',C:'Center',LB:'Linebacker',SS:'Strong safety',FS:'Free safety'",
    'P-302 SLOT_FRIENDLY guard casing')

# ============================================================
# P-299 · the R2-19 rating scale returns, re-anchored to the w85 display law
# ============================================================
rep("window.zpbDR = function(r){ const d = window.zpbDispRating ? zpbDispRating(r) : null; return (d!=null) ? d : '\\u00b7'; };",
"""window.ZPB_MEDIAN_OVR = (typeof window.zpbMedianOvr==='function') ? window.zpbMedianOvr() : 77; // w86 (P-299): the R2-19 rating scale returns under the w85 law — the median is the DRAFTED POOL's (the all-database 76 stays retired; V0)
window.zpbSeasonRating = function(r){ // w86 (P-299): the canonical season-rating translation — the same scale every displayed rating already rides (zpbDispRating)
 try{ return window.zpbDispRating ? zpbDispRating(r) : ((r && r._rating!=null) ? Math.round(r._rating) : null); }
 catch(e){ return (r && r._rating!=null) ? Math.round(r._rating) : null; }
};
window.zpbDR = function(r){ const d = window.zpbDispRating ? zpbDispRating(r) : null; return (d!=null) ? d : '\\u00b7'; };""",
    'P-299 rating scale named + re-anchored')

# ============================================================
# W86 payload — the new block (CSS + the RIB wiring + a marker)
# ============================================================
W86_BLOCK = """</script>
<style id="zpb-w86-css">
/* ============ Z-POST-BLUE W86 (the Owner's six asks + the P-285 items, 2026-11-08) ============ */
/* 0 · the confirm YES button's ink follows its bubble (Owner): light wears the dark-tone team
   bubble (--bad = tA3 under the takeover), so the ink is the team's LIGHT 0.50 halfway (tTxMd);
   dark mirrors with the dark halfway on the bright dark-mode bubble. Never dark-on-dark. */
.confirm-box .resetbtn[data-cf="yes"]{color:var(--tOnA3,var(--tTxMd,var(--ongold,#fffaf2)));}
:root[data-theme="dark"] .confirm-box .resetbtn[data-cf="yes"]{color:var(--tOnA3d,var(--tTxM,var(--ongold,#fffaf2)));}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .confirm-box .resetbtn[data-cf="yes"]{color:var(--tOnA3d,var(--tTxM,var(--ongold,#fffaf2)));} }
/* 1 · the try-again banner button — the 20-0 shimmer carries into the pill */
#zpb-stagebar [data-zsb="tryagain"]{font-family:'Cinzel',Georgia,serif;letter-spacing:.06em;}
/* 2 · the top-panel door rows never crowd on a phone */
.zpb-sr-own .zpb-ctabig{margin:4px 6px !important;}
@media (max-width:640px){
 .zpb-sr-own .zpb-ctabig{width:auto;max-width:100%;}
}
</style>
<script id="zpb-w86-js">
// ============ Z-POST-BLUE W86 JS ============
// RUN IT BACK at the top of the three review pages — the same caution the season options carry
document.addEventListener('click', function(e){
 if(e.target && e.target.id === 'zpbRunItBackTop'){
  try{
   zpbCaution('Yes \\u00b7 run it back', function(){ try{ startSeason(); renderSeasonTab(document.getElementById('draftResultsBody') || document.getElementById('seasonHost')); window.scrollTo(0,0); }catch(err){} }, {title:'Caution: Run it back?', body:'You will begin the season again at the preseason with the same roster you have right now. The current season\\u2019s results, stats and awards are erased.'});
  }catch(err){ try{ if(confirm('Run it back? The season starts over at the preseason with the same roster.')){ startSeason(); } }catch(e2){} }
 }
});
window.ZPB_WAVE = 'w86';
</script>"""
# anchor: the end of the w55-restore script (its exact tail, followed by the w61 css)
rep("""  if(v && b && v !== 'viewDraft' && document.getElementById(v) && document.getElementById(b)) setActiveTab(v, b);
 }catch(e){}
})();
</script>""",
"""  if(v && b && v !== 'viewDraft' && document.getElementById(v) && document.getElementById(b)) setActiveTab(v, b);
 }catch(e){}
})();
</script>""" + W86_BLOCK,
    'W86 payload block appended')

# ============================================================
# REV 2 (w86.1) · P-302 follow-through — the guard casing reaches every surface
# ============================================================
rep('{"key":"OGUARDS","label":"Offensive Guards"',
    '{"key":"OGUARDS","label":"Offensive guards"',
    'R2-2a GROUP_DEFS OGUARDS label')
rep("OG1:'Offensive Guard 1', OG2:'Offensive Guard 2'",
    "OG1:'Offensive guard 1', OG2:'Offensive guard 2'",
    'R2-2b slot-label table (spaced form)')
rep("OG1:'Offensive Guard 1',OG2:'Offensive Guard 2'",
    "OG1:'Offensive guard 1',OG2:'Offensive guard 2'",
    'R2-2c slot-label table (tight form)')
rep("'<span><b>OG</b> Offensive Guard</span>'",
    "'<span><b>OG</b> Offensive guard</span>'",
    'R2-2d the Guide field-map legend OG span')
rep("OG:{n:'Offensive Guard', tip:",
    "OG:{n:'Offensive guard', tip:",
    'R2-2e the position info table OG name')

# ============================================================
# REV 2 (w86.1) · the Guide gains the two r2 content gaps
# (the muse P-307 review §2 items 5-6: FB joins the legend; the Guide carries the scale law)
# ============================================================
rep("+ '<span><b>RB</b> Running Back</span>'",
    "+ '<span><b>RB</b> Running Back</span>' + '<span><b>FB</b> Fullback</span>' // w86.1 (P-307 fix): FB joins the legend — the fullback is a real rostered spot with a real modeled value",
    'R2-3a the Guide field-map legend gains FB')
rep("+ schip('100', 'QBR', 'The season performance grade the math computes for this player against his peers.')\n  + '</div>';",
    "+ schip('100', 'QBR', 'The season performance grade the math computes for this player against his peers.')\n  + '<p class=\"narr\" style=\"flex-basis:100%;margin:10px 0 2px;\">THE PERFORMANCE SCALE \u00b7 an average season reads ' + (window.zpbMedianOvr ? window.zpbMedianOvr() : 76) + ' \u2014 the drafted pool\u2019s median OVR \u2014 and every season is measured against that line. The same law sets every SEASON RATING badge on the site.</p>'\n  + '</div>';",
    'R2-3b the Guide BADGES section carries the performance-scale law')

import os
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode()).hexdigest()
print(f'\nWROTE {OUT}')
print(f'  bytes {len(src.encode())} · md5 {h} · replacements {n}')
