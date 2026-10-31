#!/usr/bin/env python3
"""zpb_v44.py — the round-44 build: ten asserted replacements on the w43 bytes.
O1 halfway ink · O2 AP1 gold everywhere · O3 wildcard intro 36s→22s · O4 FX safety never drains
over a cinematic · O5 leaked template comment removed · O6 Rush / Pass · O8 belong map 0.5s/beat ·
O9 during-game header scores beat the color:inherit law in light · (O7 SB cinematic untouched —
guarded by the live suite)."""
import re, sys, hashlib

SRC = 'base.html'
OUT = 'Football-Sim-Z-post-blue-w44.html'
B = open(SRC, encoding='utf-8').read()
orig_len = len(B)
n = 0

def rep(old, new, tag):
    global B, n
    c = B.count(old)
    assert c == 1, f"[{tag}] anchor count={c} (need 1)\n--- anchor head ---\n{old[:180]}\n--- context ---\n{ctx(old)}"
    B = B.replace(old, new)
    n += 1
    print(f"  ok  {tag}")

def ctx(needle, span=140):
    i = B.find(needle[:60])
    return B[max(0,i-span):i+span].replace('\n','⏎') if i>=0 else '(not found)'

# ---------- O1: the halfway ink ----------
rep(
""" const _txc=zpbHsl(txL); const txM=(_txc && _txc.l<0.52) ? zpbFromHsl(_txc.h,_txc.s,0.52) : txL; // w43 (N3/N5/N13, Owner): the light-mode ink — between the washed pale and the crayola vivid, clearly the team's color (computed inline — packs may build before zpbLift exists)""",
""" const _txc=zpbHsl(txL); const txM=(function(){ try{ // w44 (O1, Owner): the halfway ink — half of the way from the page's own warm ink to the crayola tone the light mode wore; the cartoonish saturation retires, dark keeps txd untouched
  const _base = (_txc && _txc.l<0.52) ? zpbFromHsl(_txc.h,_txc.s,0.52) : txL; // the crayola anchor
  const _m=zpbMix('#53382b',_base,0.5), _c=zpbHsl(_m);
  return zpbFromHsl(_c.h, Math.min(0.85,Math.max(0.22,_c.s)), Math.min(0.52,Math.max(0.30,_c.l)));
 }catch(err){ return (_txc && _txc.l<0.52) ? zpbFromHsl(_txc.h,_txc.s,0.52) : txL; } })();""",
"O1 halfway ink")

# ---------- O2a: ap1Names register in computeRegularSeasonAwards ----------
rep(
""" });
 out.mvpName = mvp.name;""",
""" });
 out.ap1Names = []; HONOR_ORDER.forEach(pos=>{ ((out.allPro&&out.allPro.first[pos])||[]).forEach(c=>{ out.ap1Names.push(c.name); }); }); // w44 (O2, Owner): the All-Pro first team — gold wherever the name is listed
 out.mvpName = mvp.name;""",
"O2a ap1Names")

# ---------- O2b: honorLineHTML gold branch ----------
m = re.search(r"function honorLineHTML\(c, user, shm\)\{[\s\S]*?\n\}", B)
assert m, "O2b honorLineHTML not found"
NEW_HONOR = """function honorLineHTML(c, user, shm){
 // w33 (R26, Owner): YOUR award players wear a border line around the name and the shimmer.
 // w33 (R36, Owner): everybody else wears a neutral drawn from his own team's colors — never white.
 // w44 (O2, Owner): an All-Pro FIRST-TEAM name is gold everywhere it is listed — the Pro Bowl rows included.
 const pk = (typeof zpbPackFor==='function') ? zpbPackFor(c.team) : null;
 const _ap1 = (function(){ try{
  if(window.__zpbAp1Gold && window.__zpbAp1Gold.size) return window.__zpbAp1Gold;
  const rs = (typeof seasonState!=='undefined') && seasonState && seasonState.awardsRS;
  if(rs && rs.ap1Names){ rs.ap1NamesSet = rs.ap1NamesSet || new Set(rs.ap1Names); return rs.ap1NamesSet; }
 }catch(err){} return null; })();
 const _gold = !!(_ap1 && c.name && _ap1.has(c.name));
 if(c.team===user){
  return `<span class="zpb-awme zpb-shm" style="--zrb:${_gold?'var(--gold3,#9a6b1f)':'var(--accent)'};">${c.name}</span> <span class="narr">${nick(c.team)}</span>`;
 }
 let color = '';
 try{
  const _t = document.documentElement.getAttribute('data-theme');
  const dark = _t==='dark' || (!_t && !(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches));
  if(pk) color = dark ? pk.txd : (pk.txM||pk.txd); // w42 (I2/I4): the ONE-INK law — w43 (N13, Owner): light reads txM, dark keeps txd
 }catch(err){}
 const attr = _gold
  ? ` class="zpb-shm"` // w44 (O2, Owner): the first-team gold — the constant --zshim law wears it in both themes
  : ((shm && pk) ? ` class="zpb-shm" style="--zrb:${pk.accL};--zshim:var(--zshim,${pk.accL});color:var(--zshim,${pk.accL});"` : (color ? ` style="color:${color};"` : '')); // w43 (N4, Owner): the shimmer reads the constant gold unless a surface pins its own --zshim
 return `<span${attr}>${c.name}</span> <span class="narr">${nick(c.team)}</span>`;
}"""
B = B[:m.start()] + NEW_HONOR + B[m.end():]
n += 1
print("  ok  O2b honorLineHTML gold")

# ---------- O2c: renderRegularAwardsHTML sets the gold register ----------
rep(
"""function renderRegularAwardsHTML(A, open){
 const user = seasonUserTeam();""",
"""function renderRegularAwardsHTML(A, open){
 try{ window.__zpbAp1Gold = new Set(); HONOR_ORDER.forEach(pos=>{ (((A.allPro||{}).first||{})[pos]||[]).forEach(c=>window.__zpbAp1Gold.add(c.name)); }); }catch(err){} // w44 (O2, Owner): the first-team gold register
 const user = seasonUserTeam();""",
"O2c gold register setter")

# ---------- O2d: rest overlay — AP1 flag + PRO BOWL gold + the card map ----------
rep(
"""      ['first','second'].forEach((k,i)=>{ Object.keys(A.allPro[k]||{}).forEach(pos=>{ (A.allPro[k][pos]||[]).forEach(c=>{ if(c.team===user) honors.push({t:(i===0?'FIRST-TEAM':'SECOND-TEAM')+' ALL-PRO', n:c.name, pos:pos}); }); }); });
      Object.keys(A.proBowl||{}).forEach(cf=>{ Object.keys(A.proBowl[cf]).forEach(pos=>{ (A.proBowl[cf][pos]||[]).forEach(c=>{ if(c.team===user) honors.push({t:'PRO BOWL', n:c.name, pos:pos}); }); }); });""",
"""      const _ap1g = new Set(); Object.keys((A.allPro&&A.allPro.first)||{}).forEach(pos=>{ ((A.allPro.first[pos])||[]).forEach(c=>_ap1g.add(c.name)); }); // w44 (O2, Owner): the first-team gold register
      ['first','second'].forEach((k,i)=>{ Object.keys(A.allPro[k]||{}).forEach(pos=>{ (A.allPro[k][pos]||[]).forEach(c=>{ if(c.team===user) honors.push({t:(i===0?'FIRST-TEAM':'SECOND-TEAM')+' ALL-PRO', n:c.name, pos:pos, gold:i===0}); }); }); });
      Object.keys(A.proBowl||{}).forEach(cf=>{ Object.keys(A.proBowl[cf]).forEach(pos=>{ (A.proBowl[cf][pos]||[]).forEach(c=>{ if(c.team===user) honors.push({t:'PRO BOWL', n:c.name, pos:pos, gold:_ap1g.has(c.name)}); }); }); });""",
"O2d rest overlay flags")

m = re.search(r"  const honorHTML = honors\.map\(\(c,i\)=>[\s\S]*?\.join\(''\);", B)
assert m, "O2e rest honorHTML map not found"
NEW_MAP = """  const honorHTML = honors.map((c,i)=>{
    var pv=(typeof PLAYERS!=='undefined')?PLAYERS.find(function(p){return p[0]===c.n;}):null; // w44 (O2, Owner): the first-team gold — the card shimmers wherever the name is listed
    var _cls = c.gold ? 'zpb-shm' : (pv&&pv[3]>=90 ? 'zpb-shm' : (pv&&pv[3]>=85 ? 'zpb-vib' : ''));
    return '<div class="zpb-scard zpb-shonor" style="'+((typeof zpbUserRowVars==='function')?zpbUserRowVars():'')+'--beat:'+i+'">'
      + '<div class="zpb-scard-hd"><b class="zpb-gname '+_cls+'">' + c.n + '</b>' + (c.pos?'<span class="zpb-poschip">'+c.pos+'</span>':'') + '</div>'
      + '<div class="zpb-shonor-t">' + c.t + '</div>' + (c.sub?'<div class="zpb-shonor-w">'+c.sub+'</div>':'') + '</div>';
  }).join('');"""
B = B[:m.start()] + NEW_MAP + B[m.end():]
n += 1
print("  ok  O2e rest honorHTML gold")

# ---------- O2f: story-panel honor cards ----------
rep(
"""  const _ap1gPROBOWL_ANCHOR""", """  const _ap1gPROBOWL_ANCHOR""", "O2f-sentinel") if False else None
rep(
"""gold:i===0}); }); });
  });
  Object.keys(A.proBowl||{}).forEach(cf=>{ Object.keys(A.proBowl[cf]).forEach(pos=>{ (A.proBowl[cf][pos]||[]).forEach(c=>{ if(c.team===user) honorCards.push({t:'PRO BOWL', n:c.name, pos:pos}); }); }); });""",
"""gold:i===0}); }); });
  });
  const _ap1g = new Set(); Object.keys((A.allPro&&A.allPro.first)||{}).forEach(pos=>{ ((A.allPro.first[pos])||[]).forEach(c=>_ap1g.add(c.name)); }); // w44 (O2, Owner): the first-team gold register
  Object.keys(A.proBowl||{}).forEach(cf=>{ Object.keys(A.proBowl[cf]).forEach(pos=>{ (A.proBowl[cf][pos]||[]).forEach(c=>{ if(c.team===user) honorCards.push({t:'PRO BOWL', n:c.name, pos:pos, gold:_ap1g.has(c.name)}); }); }); });""",
"O2f story probowl gold")

rep(
"""const _cls=_pv&&_pv[3]>=90?'zpb-shm':(_pv&&_pv[3]>=85?'zpb-vib':'');""",
"""const _cls=c.gold?'zpb-shm':(_pv&&_pv[3]>=90?'zpb-shm':(_pv&&_pv[3]>=85?'zpb-vib':''));""",
"O2g story card gold class")

# ---------- O3: the wildcard intro 36s -> 22s ----------
rep(
"""  const INTRO_MS = isSB ? 60000 : (roundLabel ? 36000 : 5000); // w41 (W2, Owner): the playoff pregame runs slower — gravity and pressure, no new material""",
"""  const INTRO_MS = isSB ? 60000 : (roundLabel ? 22000 : 5000); // w41 (W2, Owner): the playoff pregame runs slower — w44 (O3, Owner): still a little too slow, 36s becomes 22s; the Super Bowl keeps its 60s""",
"O3 wildcard intro 22s")

# ---------- O4: the FX safety never drains over a cinematic ----------
rep(
"""   if(!window.__zpbFxSafety){ window.__zpbFxSafety = setTimeout(()=>{ window.__zpbFxSafety = null; try{ zpbFxDrain(true); }catch(err){} }, 15000); }""",
"""   if(!window.__zpbFxSafety){ window.__zpbFxSafety = setTimeout(function _zpbFxSafe(){ // w44 (O4, Owner): no confetti and congratulations until the end of the game — the safety re-arms while the replay, the prematch, the stage or the books is up; the whistle still drains it
     try{ if(document.querySelector('.zpb-replay-ov, .zpb-prematch, .zpb-sbfin, .zpb-restov')){ window.__zpbFxSafety = setTimeout(_zpbFxSafe, 6000); return; } }catch(err){}
     window.__zpbFxSafety = null; try{ zpbFxDrain(true); }catch(err){} }, 15000); }""",
"O4 FX safety re-arm")

# ---------- O5: the leaked template comment ----------
rep(
"""''}</div> // w43 (N9, Owner): each side's score wears its own team's color, both themes
   <div class="sl-team\"""",
"""''}</div>
   <div class="sl-team\"""",
"O5a in-string comment removed")
rep(
"""const title = game.roundLabel ? game.roundLabel : `Week ${game.week}`;""",
"""const title = game.roundLabel ? game.roundLabel : `Week ${game.week}`;
 // w43 (N9, Owner): each side's score wears its own team's color, both themes (w44 O5: the note rides outside the template — it printed on the review)""",
"O5b comment relocated")

# ---------- O6: Rush / Pass ----------
rep(
"""['RUSH/PASS',""",
"""['Rush / Pass',""",
"O6 Rush / Pass")

# ---------- O8: half a second per player on the belong map ----------
rep(
""".zpb-fm.zpb-seen .zpb-fm-ini{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*0.15s);}""",
""".zpb-fm.zpb-seen .zpb-fm-ini{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*0.5s);} /* w44 (O8, Owner): half a second per player — the 0.15s sprint retires */""",
"O8 belong map 0.5s")

# ---------- O9: the during-game header scores beat the inherit law ----------
i43 = B.find('<style id="zpb-w43-css">')
assert i43 >= 0, "w43 style block not found"
close = B.find('</style>', i43)
assert close >= 0, "w43 style close not found"
close += len('</style>')
W44_CSS = """
<style id="zpb-w44-css">
/* ================= Z-POST-BLUE W44 (the Owner's round-44) ================= */
/* O9 (Owner): the during-game header scores wear their teams in LIGHT too — the replay's old
   color:inherit law (.zpb-replay span, specificity 0,1,1) out-ranked the single-class w43 rules
   (0,1,0); dark only won on the :root[data-theme] lift. Two classes beat the inherit law. */
.zpb-replay span.zpb-slsc-aw{color:var(--scA,var(--text));}
.zpb-replay span.zpb-slsc-hm{color:var(--scH,var(--text));}
:root[data-theme="dark"] .zpb-replay span.zpb-slsc-aw{color:var(--scAd,var(--scA,var(--text)));}
:root[data-theme="dark"] .zpb-replay span.zpb-slsc-hm{color:var(--scHd,var(--scH,var(--text)));}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) .zpb-replay span.zpb-slsc-aw{color:var(--scAd,var(--scA,var(--text)));}
 :root:not([data-theme="light"]) .zpb-replay span.zpb-slsc-hm{color:var(--scHd,var(--scH,var(--text)));}
}
</style>"""
B = B[:close] + W44_CSS + B[close:]
n += 1
print("  ok  O9 w44 style block")

open(OUT, 'w', encoding='utf-8').write(B)
print(f"\n{n} replacements applied · {orig_len} -> {len(B)} bytes")
print("md5", hashlib.md5(B.encode()).hexdigest())
