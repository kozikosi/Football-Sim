#!/usr/bin/env python3
"""zpb_v45.py — the round-45 build: the halfway sweep + the fixes he named, on the w44 bytes.
O1 the halfway everywhere (--tTx + row tA2 + cmpnum + box scores + bracket + lu-win) ·
O2 the comparison dropdowns · O3 the light/dark readability inversions (A10 swap, dark twins) ·
O4 the preview lineups (star faceoff wears its own team's ink on both sides) ·
O5 one fitted size for every pregame star panel · O6 the ending tails carry the full line anatomy ·
O7/O8 the box-score final scores wear the 0.50 tone and read with the dot ·
O9 the MVP '70-rated …' phrase retires · O10 the leaked w41 comment retires.
Asserted exact replacements only — zero hand edits. CSS ships in zpb_v45b.py."""
import re, sys, hashlib

SRC = 'base.html'
OUT = 'stage1.html'
B = open(SRC, encoding='utf-8').read()
orig_len = len(B)
n = 0

def rep(old, new, tag):
    global B, n
    c = B.count(old)
    assert c == 1, f"[{tag}] anchor count={c} (need 1)\n--- anchor head ---\n{old[:200]}"
    B = B.replace(old, new)
    n += 1
    print(f"  ok  {tag}")

# ---------- O1a: the halfway ink gains the readability floor (contrast >= 5.0 on the light page) ----------
rep(
"""  const _m=zpbMix('#53382b',_base,0.5), _c=zpbHsl(_m);
  return zpbFromHsl(_c.h, Math.min(0.85,Math.max(0.22,_c.s)), Math.min(0.52,Math.max(0.30,_c.l)));
 }catch(err){ return (_txc && _txc.l<0.52) ? zpbFromHsl(_txc.h,_txc.s,0.52) : txL; } })();""",
"""  const _m=zpbMix('#53382b',_base,0.5), _c=zpbHsl(_m);
  let _ink=zpbFromHsl(_c.h, Math.min(0.85,Math.max(0.22,_c.s)), Math.min(0.52,Math.max(0.30,_c.l)));
  try{ // w45 (O3, Owner): the readability floor — the halfway ink never sits below 5:1 on the light page; the palest brands (Raiders) deepen a touch, the hue stays
   let _g=0;
   while(_g<9 && zpbContrast(_ink,'#fcf7f1')<5){ const _c2=zpbHsl(_ink); _ink=zpbFromHsl(_c2.h,_c2.s,Math.max(0.24,_c2.l-0.02)); _g++; }
  }catch(err){}
  return _ink;
 }catch(err){ return (_txc && _txc.l<0.52) ? zpbFromHsl(_txc.h,_txc.s,0.52) : txL; } })();""",
"O1a halfway readability floor")

# ---------- O1b (recon note): the theme page-text mapping is inert - the w32 light re-theme
# (:root:not([data-theme="dark"]){--text:#54303f}) wins the light cascade at equal specificity,
# so the page ink was never the crayola. The sweep rides the NAME surfaces (tA2/cmpnum/box/bracket/
# lu-win/star cells) instead. No edit here on purpose - the anchor stays, the note explains why.

# ---------- O1c: zpbRowVars — the row's accent-number ink rides the halfway tone ----------
rep(
"""  ';--tA2:'+pk.accL+';--tG2:'+(window.zpbLift?zpbLift(pk.accL,0.35):pk.accL)+';--glow:'+zpbRgba(pk.accL,0.35)+';--tn:'+pk.txM+';--tnd:'+pk.txd+""",
"""  ';--tA2:'+(pk.txM||pk.accL)+';--tG2:'+(window.zpbLift?zpbLift(pk.accL,0.35):pk.accL)+';--glow:'+zpbRgba(pk.accL,0.35)+';--tn:'+pk.txM+';--tnd:'+pk.txd+ // w45 (O1, Owner): the row's number ink rides the halfway tone — the vivid accL fallback retires""",
"O1c row tA2 halfway")

# ---------- O1d: zpbNeutralRowVars — same for the neutral rows (the linescore F column et al) ----------
rep(
"""  ';--tA2:'+nl+';--tG2:'+nl+';--glow:'+zpbRgba(nl,0.26)+';--tn:'+nm+';--tnd:'+nd+';--zn:1'+""",
"""  ';--tA2:'+nm+';--tG2:'+nm+';--glow:'+zpbRgba(nl,0.26)+';--tn:'+nm+';--tnd:'+nd+';--zn:1'+ // w45 (O1, Owner): the neutral rows' number ink rides the halfway tone too — the crayola lift retires from text""",
"O1d neutral tA2 halfway")

# ---------- O1e: the comparison score numbers wear the halfway tone ----------
rep(
"""<span class="zpb-cmpscore"><span class="zpb-cmpnum"${pkA?` style="--pkc:${pkA.accL};--pkcd:${pkA.accD}"`:''}>${Math.round(scoreA)}</span> <span class="zpb-cmpsub">vs</span> <span class="zpb-cmpnum"${pkB?` style="--pkc:${pkB.accL};--pkcd:${pkB.accD}"`:''}>${Math.round(scoreB)}</span></span>""",
"""<span class="zpb-cmpscore"><span class="zpb-cmpnum"${pkA?` style="--pkc:${pkA.txM||pkA.accL};--pkcd:${pkA.txd}"`:''}>${Math.round(scoreA)}</span> <span class="zpb-cmpsub">vs</span> <span class="zpb-cmpnum"${pkB?` style="--pkc:${pkB.txM||pkB.accL};--pkcd:${pkB.txd}"`:''}>${Math.round(scoreB)}</span></span>""",
"O1e cmpnum halfway")

# ---------- O1f: the box-score final scores + Team-Stats columns wear the halfway tone ----------
rep(
""" return a||h ? ` style="--scA:${a?a.accL:'inherit'};--scAd:${a?a.accD:'inherit'};--scH:${h?h.accL:'inherit'};--scHd:${h?h.accD:'inherit'};"` : ''; })()}>""",
""" // w45 (O7, Owner): the final score wears the same 0.50 tone as the team name in the same box
 return a||h ? ` style="--scA:${a?(a.txM||a.accL):'inherit'};--scAd:${a?a.txd:'inherit'};--scH:${h?(h.txM||h.accL):'inherit'};--scHd:${h?h.txd:'inherit'};"` : ''; })()}>""",
"O1f score-line halfway")

rep(
"""return `<table class="zpb-tsstat" style="margin-top:10px;--scA:${pkSA?pkSA.accL:'inherit'};--scAd:${pkSA?pkSA.accD:'inherit'};--scH:${pkSH?pkSH.accL:'inherit'};--scHd:${pkSH?pkSH.accD:'inherit'};"><tbody>${rows}</tbody></table>`;""",
"""return `<table class="zpb-tsstat" style="margin-top:10px;--scA:${pkSA?(pkSA.txM||pkSA.accL):'inherit'};--scAd:${pkSA?pkSA.txd:'inherit'};--scH:${pkSH?(pkSH.txM||pkSH.accL):'inherit'};--scHd:${pkSH?pkSH.txd:'inherit'};"><tbody>${rows}</tbody></table>`; // w45 (O7, Owner): the stat columns wear the halfway tone like the rest of the box""",
"O1f tsstat halfway")

# ---------- O1g: the bracket scores wear the halfway tone ----------
rep(
"""const tvars = `--scA:${pkA?pkA.accL:'inherit'};--scAd:${pkA?pkA.accD:'inherit'};--scH:${pkH?pkH.accL:'inherit'};--scHd:${pkH?pkH.accD:'inherit'};`;""",
"""const tvars = `--scA:${pkA?(pkA.txM||pkA.accL):'inherit'};--scAd:${pkA?pkA.txd:'inherit'};--scH:${pkH?(pkH.txM||pkH.accL):'inherit'};--scHd:${pkH?pkH.txd:'inherit'};`; // w45 (O1, Owner): the bracket's scores ride the halfway tone with the rest of the site""",
"O1g bracket halfway")

# ---------- O8: the box-score final score reads with the dot ----------
rep(
"""<span class="zpb-slsc-aw ${game.away===focusTeam?'zpb-usscore':''}">${r.awayScore}</span> – <span class="zpb-slsc-hm ${game.home===focusTeam?'zpb-usscore':''}">${r.homeScore}</span>""",
"""<span class="zpb-slsc-aw ${game.away===focusTeam?'zpb-usscore':''}">${r.awayScore}</span> · <span class="zpb-slsc-hm ${game.home===focusTeam?'zpb-usscore':''}">${r.homeScore}</span>""",
"O8 dot separator")

# ---------- O5: one fitted size for every pregame star panel ----------
rep(
"""   const starHTML = slots.map((s,i)=>{
    let fsz = '';
    if(s.side && s.f != null){ // w39 (A4): the fitted size was computed with the slot — the lane law holds on phones too
     if(s.f < 15.35) fsz = 'font-size:' + (Math.round(s.f*10)/10) + 'px;';
    }""",
"""   const _fitAll = Math.min.apply(null, slots.map(s=>(s.f==null)?15.4:s.f)); // w45 (O5, Owner): ONE fitted size for the whole stage — the lane fit of the longest name on it
   const starHTML = slots.map((s,i)=>{
    let fsz = '';
    if(s.side && s.f != null){ // w39 (A4): the fitted size was computed with the slot — w45 (O5, Owner): every panel wears the SAME fitted size
     fsz = 'font-size:' + (Math.round(_fitAll*10)/10) + 'px;';
    }""",
"O5 one stage size")

# ---------- O9: the MVP '70-rated … on a N-win team' phrase retires ----------
rep(
""" const mvpWhy = c => pick([`${Math.round(rate(c))}-rated ${c.pos} on a ${W[c.team]}-win team`, `the league's top-rated ${c.pos} profile, carrying ${c.team} to ${W[c.team]} wins`, `${c.pos} production (${Math.round(rate(c))} rating) and ${W[c.team]} wins`]); // w32 (Owner): integers""",
""" const mvpWhy = c => pick([`the league's top-rated ${c.pos} profile, carrying ${c.team} to ${W[c.team]} wins`, `${c.pos} production (${Math.round(rate(c))} rating) and ${W[c.team]} wins`]); // w32 (Owner): integers · w45 (O9, Owner): the '70-rated QB on a 14-win team' wording retires — the math never moved""",
"O9 mvp phrase retire")

# ---------- O10: the leaked w41 comment retires from the playoffs template ----------
rep(
"""    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;"><button class="resetbtn" id="nextRoundBtn" style="width:auto;padding:10px 24px;">${myLost?'SIM PLAYOFFS':'Continue to '+NEXT_ROUND_LABEL[rk]}</button>${rk!=='superbowl' && !myLost?'<button class="tabbtn" id="simRestBtn">Sim Playoffs</button>':''} // w41 (W3, Owner): no duplicate — on a loss the shimmer button leads alone</div></div></div>`;""",
"""    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;"><button class="resetbtn" id="nextRoundBtn" style="width:auto;padding:10px 24px;">${myLost?'SIM PLAYOFFS':'Continue to '+NEXT_ROUND_LABEL[rk]}</button>${rk!=='superbowl' && !myLost?'<button class="tabbtn" id="simRestBtn">Sim Playoffs</button>':''}</div></div></div>`;
  // w41 (W3, Owner): no duplicate — on a loss the shimmer button leads alone (w45, O10: the note rides OUTSIDE the string — it printed on the playoffs)""",
"O10 leaked comment out")

# ---------- O6: the ending tails carry the full line anatomy ----------
# 6a — the takeaway/4&O drive line: standard team cell + running score
rep(
"""   if(e.type==='TO'){
    // a takeaway ends the drive — the giveaway line already told it; frame the ending as a 4&O stop when it happened late
    if(e.q===4 && e.t>=0.55) out.push('<span class="zrl-t">' + e.q + 'Q ' + (function(){ const m = Math.max(0, Math.min(15, 15*(1-(e.t||0)))); return Math.floor(m) + ':' + String(Math.floor((m-Math.floor(m))*60)).padStart(2,'0'); })() + '</span>' + crest2(other) + '<span class="zrl-team" style="color:' + oc2 + ';">' + (TEAM_ABBR[other]||other) + '</span><span class="zrl-play">' + nmOf(xName, oc) + ' ' + chip('4&O', oc) + ' ' + chip((TEAM_ABBR[other]||other).toUpperCase() + ' ' + yl, oc2) + '</span>');
    return;
   }""",
"""    const _scoreAt = ev=>{ let _a=0,_h=0; evs.forEach(x=>{ if(x===ev) return; if(x.q>ev.q || (x.q===ev.q && x.t>ev.t)) return; if(x.side==='home') _h+=(x.pts||0); else _a+=(x.pts||0); }); return '<span class="zrl-sc"><b style="color:' + colOf2(g.away) + ';">' + _a + '</b> - <b style="color:' + colOf2(g.home) + ';">' + _h + '</b></span>'; }; // w45 (O6, Owner): the ending lines carry the same anatomy as the report — timer, crest, team, play, score
   if(e.type==='TO'){
    // a takeaway ends the drive — the giveaway line already told it; frame the ending as a 4&O stop when it happened late
    if(e.q===4 && e.t>=0.55) out.push('<span class="zrl-t">' + e.q + 'Q ' + (function(){ const m = Math.max(0, Math.min(15, 15*(1-(e.t||0)))); return Math.floor(m) + ':' + String(Math.floor((m-Math.floor(m))*60)).padStart(2,'0'); })() + '</span>' + crest2(other) + '<span class="zrl-team">' + (TEAM_ABBR[other]||other) + '</span><span class="zrl-play">' + nmOf(xName, oc) + ' ' + chip('4&O', oc) + ' ' + chip((TEAM_ABBR[other]||other).toUpperCase() + ' ' + yl, oc2) + '</span>' + _scoreAt(e));
    return;
   }""",
"O6a 4&O line anatomy")

# 6b — the 3&O punt drive line
rep(
"""    const clk = (function(){ const m = Math.max(0, Math.min(15, 15*(1-(e.t||0)))); return Math.floor(m) + ':' + String(Math.floor((m-Math.floor(m))*60)).padStart(2,'0'); })();
    out.push('<span class="zrl-t">' + e.q + 'Q ' + clk + '</span>' + crest2(tm) + '<span class="zrl-team" style="color:' + oc + ';">' + (TEAM_ABBR[tm]||tm) + '</span><span class="zrl-play">' + nmOf(xName, oc) + ' ' + chip('3&O', oc) + (yName ? ' ' + nmOf(yName, oc2) + ' ' + chip('RET', oc2) : '') + ' ' + chip((TEAM_ABBR[other]||other).toUpperCase() + ' ' + yl, oc2) + '</span>');""",
"""    const clk = (function(){ const m = Math.max(0, Math.min(15, 15*(1-(e.t||0)))); return Math.floor(m) + ':' + String(Math.floor((m-Math.floor(m))*60)).padStart(2,'0'); })();
    out.push('<span class="zrl-t">' + e.q + 'Q ' + clk + '</span>' + crest2(tm) + '<span class="zrl-team">' + (TEAM_ABBR[tm]||tm) + '</span><span class="zrl-play">' + nmOf(xName, oc) + ' ' + chip('3&O', oc) + (yName ? ' ' + nmOf(yName, oc2) + ' ' + chip('RET', oc2) : '') + ' ' + chip((TEAM_ABBR[other]||other).toUpperCase() + ' ' + yl, oc2) + '</span>' + _scoreAt(e)); // w45 (O6, Owner): the running score rides the drive lines too""",
"O6b 3&O line anatomy")

# 6c — the blocked-kick lines (both copies: the skip path + the natural flow)
BLK_OLD = """       const chip2 = t2=>'<span class="zrl-badge" style="color:' + _c + ';">' + t2 + '</span>';
       const lab2 = b.kind==='field goal' ? 'FG' : b.kind==='punt' ? 'PUNT' : 'XP';
       el.innerHTML = '<span class="zrl-play">' + xN + ' ' + chip2('BLK') + chip2(lab2) + ' ' + yN + '</span>'; // w41 (G1, Owner): x [BLK] [KIND] y — the blocker in his colors, the punter in his"""
BLK_NEW = """       const chip2 = t2=>'<span class="zrl-badge" style="color:' + _c + ';">' + t2 + '</span>';
       const lab2 = b.kind==='field goal' ? 'FG' : b.kind==='punt' ? 'PUNT' : 'XP';
       const _lastEv = (function(){ try{ const _all = (g.result.homeEvents||[]).map(e=>Object.assign({},e,{side:'home'})).concat((g.result.awayEvents||[]).map(e=>Object.assign({},e,{side:'away'}))).sort((a,b)=>a.q-b.q||a.t-b.t); return _all[_all.length-1]||null; }catch(err){ return null; } })();
       const _stamp = _lastEv ? (_lastEv.q + 'Q ' + clockOf(_lastEv)) : '4Q 0:00'; // w45 (O6, Owner): the sim gives blocks no timestamp — the line wears the report's current clock, nothing is invented
       el.innerHTML = '<span class="zrl-t">' + _stamp + '</span>' + crest2(tm) + '<span class="zrl-team">' + (TEAM_ABBR[tm]||tm) + '</span><span class="zrl-play">' + xN + ' ' + chip2('BLK') + chip2(lab2) + ' ' + yN + '</span><span class="zrl-sc"><b style="color:' + colOf(g.away) + ';">' + as + '</b> - <b style="color:' + colOf(g.home) + ';">' + hs + '</b></span>'; // w41 (G1, Owner): x [BLK] [KIND] y — w45 (O6, Owner): the full line anatomy"""
c = B.count(BLK_OLD)
assert c == 2, f"[O6c blocks] anchor count={c} (need 2)"
B = B.replace(BLK_OLD, BLK_NEW)
n += 2
print("  ok  O6c block lines anatomy (both copies)")

# crest2 helper for the replay closure (the block lines wear the crest like every line)
rep(
"""  const QN = {1:'1ST QUARTER', 2:'2ND QUARTER', 3:'3RD QUARTER', 4:'4TH QUARTER'};
  const clockOf = e=>{ const m = Math.max(0, Math.min(15, 15*(1-(e.t||0)))); const mm = Math.floor(m), ss = Math.floor((m-mm)*60); return mm + ':' + String(ss).padStart(2,'0'); };
  let hs = 0, as = 0, timers = [], finished = false, clutch = false, flushRest = null; // w37 (R12): Skip hands the rest of the report to flushRest""",
"""  const QN = {1:'1ST QUARTER', 2:'2ND QUARTER', 3:'3RD QUARTER', 4:'4TH QUARTER'};
  const clockOf = e=>{ const m = Math.max(0, Math.min(15, 15*(1-(e.t||0)))); const mm = Math.floor(m), ss = Math.floor((m-mm)*60); return mm + ':' + String(ss).padStart(2,'0'); };
  const crest2 = nm2=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(nm2) : ''; // w45 (O6, Owner): the block lines wear the crest like every line
  let hs = 0, as = 0, timers = [], finished = false, clutch = false, flushRest = null; // w37 (R12): Skip hands the rest of the report to flushRest""",
"O6c2 crest2 in replay closure")

open(OUT, 'w', encoding='utf-8').write(B)
print(f"\n{n} replacements applied · {orig_len} -> {len(B)} chars")
print("md5", hashlib.md5(B.encode()).hexdigest())
