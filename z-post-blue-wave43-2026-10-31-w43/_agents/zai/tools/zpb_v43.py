#!/usr/bin/env python3
# zpb_v43.py — wave 43 build chain (the zpb pattern: asserted exact replacements + payloads + post-checks)
# Base: Football-Sim-Z-post-blue-w42.html (md5 94474a4d636cdd0a209824f661e876f6)
# Out:  Football-Sim-Z-post-blue-w43.html
import hashlib, sys

BASE = '/home/z/my-project/boot/w43/base.html'
OUT  = '/home/z/my-project/boot/w43/Football-Sim-Z-post-blue-w43.html'
src = open(BASE, encoding='utf-8').read()
checks = []
def rep(old, new, name, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{name}] expected {count} occurrence(s), found {n}'
    src = src.replace(old, new)
    checks.append(name)
    print(f'  ok  {name} ({count})')

# ================================================================ N13/N3/N5: the light-mode ink — a little more of the team's color
# K1 — the pack learns txM: the mid light-mode ink (deep team tone lifted to a soft-but-colored 0.52)
rep(""" const txL=zpbReadable(eng,bgL,false,7.0);
 const txd=zpbMix('#f5e9dd',accD,0.14), sud=zpbMix('#c8a48f',accD,0.2);""",
""" const txL=zpbReadable(eng,bgL,false,7.0);
 const _txc=zpbHsl(txL); const txM=(_txc && _txc.l<0.52) ? zpbFromHsl(_txc.h,_txc.s,0.52) : txL; // w43 (N3/N5/N13, Owner): the light-mode ink — between the washed pale and the crayola vivid, clearly the team's color (computed inline — packs may build before zpbLift exists)
 const txd=zpbMix('#f5e9dd',accD,0.14), sud=zpbMix('#c8a48f',accD,0.2);""",
    'K1 pack txM const')

rep(""" const pk={ raw:[P,Q,R], accL,accD,acc2L,acc2D,acc3L,acc3D,
  txL, txd, sud, hairL, hairD,""",
""" const pk={ raw:[P,Q,R], accL,accD,acc2L,acc2D,acc3L,acc3D,
  txL, txM, txd, sud, hairL, hairD,""",
    'K2 pack txM field')

# K3 — the vivid rows: light inks ride txM, dark keeps txd (dark mode is great, untouched)
rep("""  ';--tA2:'+pk.accL+';--tG2:'+(window.zpbLift?zpbLift(pk.accL,0.35):pk.accL)+';--glow:'+zpbRgba(pk.accL,0.35)+';--tn:'+pk.txd+';--tnd:'+pk.txd+
  ';--nm:'+pk.txd+';--nmd:'+pk.txd+';--nmS:'+pk.txd+';--nmSd:'+pk.txd+';--nu:'+pk.txd+';--nud:'+pk.txd+';'; // w20: tier palette rides every row · w41 (P1): the strength ladder rides every row · w42 (I1/I2/I3, Owner): the ONE-INK law — every text ink on every row, BOTH themes, reads the dark dropdown ink (txd); the washes, borders, glows, chips and logos keep the team's colors""",
"""  ';--tA2:'+pk.accL+';--tG2:'+(window.zpbLift?zpbLift(pk.accL,0.35):pk.accL)+';--glow:'+zpbRgba(pk.accL,0.35)+';--tn:'+pk.txM+';--tnd:'+pk.txd+
  ';--nm:'+pk.txM+';--nmd:'+pk.txd+';--nmS:'+pk.txM+';--nmSd:'+pk.txd+';--nu:'+pk.txM+';--nud:'+pk.txd+';'; // w20: tier palette rides every row · w41 (P1): the strength ladder rides every row · w42 (I1/I2/I3): the ONE-INK law — w43 (N3/N5/N13, Owner): LIGHT reads the mid team ink txM (a little more of the team's color, never crayola); DARK keeps the dropdown ink txd""",
    'K3 zpbRowVars light txM')

# K4 — the neutral rows: same law
rep(""" const nl=(window.zpbLift?zpbLift(pk.txL,0.62):pk.txL), nd=pk.txd;
 return '--zr1:'+zpbRgba(nl,0.09)+';--zr2:'+zpbRgba(nl,0.03)+';--zr3:'+zpbRgba(nl,0.10)+';--zrb:'+nl+
  ';--zr1d:'+zpbRgba(nd,0.14)+';--zr2d:'+zpbRgba(nd,0.04)+';--zr3d:'+zpbRgba(nd,0.12)+';--zrbd:'+nd+
  ';--tA2:'+nl+';--tG2:'+nl+';--glow:'+zpbRgba(nl,0.26)+';--tn:'+nd+';--tnd:'+nd+';--zn:1'+
  ';--nm:'+nd+';--nmd:'+nd+';--nmS:'+nd+';--nmSd:'+nd+';--nu:'+nd+';--nud:'+nd+';'; // w41 (P1/P2): the neutral rows wear the dropdown's ink — w42 (I1/I3, Owner): the ONE-INK law — the light theme reads the DARK ink too, everywhere, white-on-white included""",
""" const nl=(window.zpbLift?zpbLift(pk.txL,0.62):pk.txL), nd=pk.txd, nm=(pk.txM||nl);
 return '--zr1:'+zpbRgba(nl,0.09)+';--zr2:'+zpbRgba(nl,0.03)+';--zr3:'+zpbRgba(nl,0.10)+';--zrb:'+nl+
  ';--zr1d:'+zpbRgba(nd,0.14)+';--zr2d:'+zpbRgba(nd,0.04)+';--zr3d:'+zpbRgba(nd,0.12)+';--zrbd:'+nd+
  ';--tA2:'+nl+';--tG2:'+nl+';--glow:'+zpbRgba(nl,0.26)+';--tn:'+nm+';--tnd:'+nd+';--zn:1'+
  ';--nm:'+nm+';--nmd:'+nd+';--nmS:'+nm+';--nmSd:'+nd+';--nu:'+nm+';--nud:'+nd+';'; // w41 (P1/P2): the neutral rows wear the dropdown's ink — w42 (I1/I3): the ONE-INK law — w43 (N3/N5/N13, Owner): the LIGHT inks step up to txM (a little more tint, the balance he asked for); DARK keeps txd""",
    'K4 zpbNeutralRowVars light txM')

# K5 — the homepage dropdown's closed face: light txM, dark txd
rep("""   const vars = st ? '--zaL:' + st.txd + ';--zaD:' + st.txd + ';' : ''; // w42 (I3, Owner): the closed box reads the dark dropdown ink in BOTH themes — white-on-white by design""",
"""   const vars = st ? '--zaL:' + (st.txM||st.txd) + ';--zaD:' + st.txd + ';' : ''; // w42 (I3): one ink both themes — w43 (N3, Owner): the light face takes a little more of the team's color (txM), the dark face keeps the dropdown ink""",
    'K5 dropdown face txM')

# K6 — the homepage dropdown's options: same
rep("""    ? '--zaL:' + st.txd + ';--zaD:' + st.txd + ';--zw:color-mix(in srgb,' + st.accL + ' 13%, transparent)' // w42 (I3, Owner): the options read the dark dropdown ink in BOTH themes""",
"""    ? '--zaL:' + (st.txM||st.txd) + ';--zaD:' + st.txd + ';--zw:color-mix(in srgb,' + st.accL + ' 13%, transparent)' // w42 (I3): one ink both themes — w43 (N3, Owner): light options ride txM""",
    'K6 dropdown options txM')

# K7 — the Position Rankings' player spans: light txM, dark txd
rep(""" const vars = pk ? `--nm:${pk.txd};--nmd:${pk.txd};--nmS:${pk.txd};--nmSd:${pk.txd};--nu:${pk.txd};--nud:${pk.txd};--zrb:${pk.accL};` : ''; // w42 (I1/I2, Owner): the ONE-INK law — the rankings read the dark dropdown ink in both themes""",
""" const vars = pk ? `--nm:${(pk.txM||pk.txd)};--nmd:${pk.txd};--nmS:${(pk.txM||pk.txd)};--nmSd:${pk.txd};--nu:${(pk.txM||pk.txd)};--nud:${pk.txd};--zrb:${pk.accL};` : ''; // w42 (I1/I2): the ONE-INK law — w43 (N5/N13, Owner): light reads txM, dark keeps the dropdown ink""",
    'K7 rankings spans txM')

# K8 — The Series' rows never wore team vars at all — the NYG-blue law broke here first
rep("""  h += '<tr class="zpb-grow"><td class="rank">' + (idx+1) + '</td><td class="team">' + ((typeof zpbTeamLogo==='function')?zpbTeamLogo(r.team):'') + r.team + '</td><td class="score">' + Math.round(r.avg) + '</td><td class="narr">' + cells + '</td></tr>'; // w34 (Owner, R8): the crest rides before every team name on The Series too""",
"""  h += '<tr class="zpb-grow" style="' + ((typeof zpbNeutralRowVars==='function')?zpbNeutralRowVars(r.team):'') + '"><td class="rank">' + (idx+1) + '</td><td class="team">' + ((typeof zpbTeamLogo==='function')?zpbTeamLogo(r.team):'') + r.team + '</td><td class="score">' + Math.round(r.avg) + '</td><td class="narr">' + cells + '</td></tr>'; // w34 (Owner, R8): the crest rides before every team name on The Series too — w43 (N4/N5, Owner): The Series wears the same row tokens, so the tiers and the gold shimmer hold here too""",
    'K8 Series rows get vars')

# K9 — the score-line team-name vars (the review's .zpb-sl2name): light txM
rep("""  const _vars = _pk ? `--nm:${_pk.txd};--nmd:${_pk.txd};--nmS:${_pk.txd};--nmSd:${_pk.txd};--zrb:${_pk.accL};` : ''; // w42 (I2, Owner): the ONE-INK law on the score-line names""",
"""  const _vars = _pk ? `--nm:${(_pk.txM||_pk.txd)};--nmd:${_pk.txd};--nmS:${(_pk.txM||_pk.txd)};--nmSd:${_pk.txd};--zrb:${_pk.accL};` : ''; // w42 (I2): the ONE-INK law — w43 (N13, Owner): light rides txM""",
    'K9 score-line name vars txM')

# K10 — the honors line: light txM, dark txd
rep("""  if(pk) color = pk.txd; // w42 (I2/I4, Owner): the ONE-INK law — the winners read the dark dropdown ink in both themes""",
"""  if(pk) color = dark ? pk.txd : (pk.txM||pk.txd); // w42 (I2/I4): the ONE-INK law — w43 (N13, Owner): light reads txM, dark keeps txd""",
    'K10 honorLine txM')
rep(""" const attr = (shm && pk) ? ` class="zpb-shm" style="--zrb:${pk.accL};color:${pk.accL};"` : (color ? ` style="color:${color};"` : '');""",
""" const attr = (shm && pk) ? ` class="zpb-shm" style="--zrb:${pk.accL};--zshim:var(--zshim,${pk.accL});color:var(--zshim,${pk.accL});"` : (color ? ` style="color:${color};"` : ''); // w43 (N4, Owner): the shimmer reads the constant gold unless a surface pins its own --zshim""",
    'K11 honorLine shimmer gold')

# ================================================================ N2: the browser's player names join the formatting
rep(""":root[data-theme="dark"] .zpb-pb-name,:root:not([data-theme="light"]) .zpb-pb-name{color:var(--text);}""",
""" :root[data-theme="dark"] .zpb-pb-name,:root:not([data-theme="light"]) .zpb-pb-name{color:var(--nmd,var(--text));} /* w43 (N2, Owner): the player names wear the same tinted ink as the team cells and positions — never the plain page text */""",
    'K12 browser dark names tinted')

# ================================================================ N4: the 90+ shimmer is the constant gold
# K13 — every .zpb-shm gradient/solid copy reads --zshim (root gold) first
GOLD_OLD_GRAD = 'var(--zrb,var(--accent)) 18%,#ffe9c6 38%,var(--zrb,var(--accent)) 55%,#fff6e3 72%,var(--zrb,var(--accent)) 88%'
GOLD_NEW_GRAD = 'var(--zshim,var(--zrb,var(--accent))) 18%,#ffe9c6 38%,var(--zshim,var(--zrb,var(--accent))) 55%,#fff6e3 72%,var(--zshim,var(--zrb,var(--accent))) 88%'
rep(GOLD_OLD_GRAD, GOLD_NEW_GRAD, 'K13a shimmer gradient main+lu/pcard', count=2)
rep('linear-gradient(100deg,var(--zrb,var(--accent)) 20%,#cfb684 38%,var(--zrb,var(--accent)) 60%)',
    'linear-gradient(100deg,var(--zshim,var(--zrb,var(--accent))) 20%,#cfb684 38%,var(--zshim,var(--zrb,var(--accent))) 60%)',
    'K13b shimmer gradient w20 pcard')
rep('color:var(--tA2,var(--zrb,var(--gold3))) !important',
    'color:var(--zshim,var(--tA2,var(--zrb,var(--gold3)))) !important', 'K13c shimmer solid main', count=4)
rep('color:var(--zrb,var(--accent)) !important;-webkit-text-fill-color:var(--zrb,var(--accent)) !important;background:none !important;animation:none;}',
    'color:var(--zshim,var(--zrb,var(--accent))) !important;-webkit-text-fill-color:var(--zshim,var(--zrb,var(--accent))) !important;background:none !important;animation:none;}',
    'K13d shimmer solid w20 pcard')
rep('.zpb-shm{color:var(--tA2,var(--gold3)) !important;-webkit-text-fill-color:var(--tA2,var(--gold3)) !important;background:none !important;}',
    '.zpb-shm{color:var(--zshim,var(--tA2,var(--gold3))) !important;-webkit-text-fill-color:var(--zshim,var(--tA2,var(--gold3))) !important;background:none !important;}',
    'K13e shimmer solid w20 fallback')

# K14 — the preview's star keeps its team color (a badge, not a name)
rep("""    const star90 = (r.ovr||0)>=90, col = colOf(team);""",
"""    const star90 = (r.ovr||0)>=90, col = colOf(team);
    const _shimAttr = star90 ? ('--zrb:' + col + ';--zshim:' + col + ';') : ''; // w43 (N4): the gold law rides the names; the star keeps its own team color""",
    'K14a star shim const')
rep("""     + (star90 ? '<span class="zpb-cstar zpb-shm" style="--zrb:'+col+'">\\u2605</span>' : '')""",
"""     + (star90 ? '<span class="zpb-cstar zpb-shm" style="'+_shimAttr+'">\\u2605</span>' : '') // w43 (N4): the star pins its own --zshim so the gold law never touches it""",
    'K14b star keeps team color')
# K14c — the review's MVP star (the ACTIVE key-players builder) pins its own team color too
rep("""    + (star ? '<span class="zpb-cstar zpb-shm" style="--zrb:'+((typeof zpbPackFor==='function'&&zpbPackFor(p.team||team))?(zpbPackFor(p.team||team).acc2L||col):col)+'">\\u2605</span>' : '')""",
"""    + (star ? '<span class="zpb-cstar zpb-shm" style="--zrb:'+((typeof zpbPackFor==='function'&&zpbPackFor(p.team||team))?(zpbPackFor(p.team||team).acc2L||col):col)+';--zshim:'+((typeof zpbPackFor==='function'&&zpbPackFor(p.team||team))?(zpbPackFor(p.team||team).acc2L||col):col)+'">\\u2605</span>' : '') // w43 (N4): this star pins its own team color; the gold law rides the names""",
    'K14c review star keeps team color')

# K13f — the deep-sheet .zpb-shm copies: the reduced-motion solid and the tA2-shaped gradient
rep('.zpb-shm{color:var(--zrb,var(--accent)) !important;-webkit-text-fill-color:var(--zrb,var(--accent));}',
    '.zpb-shm{color:var(--zshim,var(--zrb,var(--accent))) !important;-webkit-text-fill-color:var(--zshim,var(--zrb,var(--accent)));} // w43 (N4): the constant gold under reduced motion too',
    'K13f reduced-motion shimmer solid')
rep('.zpb-shm{background:linear-gradient(100deg,var(--tA2,var(--gold3)),var(--tG2,var(--gold2)) 40%,var(--tA2,var(--gold3)) 70%) !important;',
    '.zpb-shm{background:linear-gradient(100deg,var(--zshim,var(--tA2,var(--gold3))),var(--gold2,#e6c67d) 40%,var(--zshim,var(--tA2,var(--gold3))) 70%) !important; /* w43 (N4, Owner): the constant gold — the team-toned tA2/tG2 sweep retires */',
    'K13g tA2-shaped shimmer gradient')


# ================================================================ N11: the SB champions shimmer in THEIR colors
# K15 — the champion banner carries the champion's two inks; the wordmark joins the shimmer law
rep(""" const sb = seasonState.playoffRounds.superbowl[0];
 const won = champ===user;""",
""" const sb = seasonState.playoffRounds.superbowl[0];
 const won = champ===user;
 const pkC = (typeof zpbPackFor==='function') ? zpbPackFor(champ) : null; // w43 (N11, Owner): the champions shimmer in THEIR colors, never the user's""",
    'K15a champ pack')
rep("""+ `<div class="champion-banner${won?' zpb-champ-won':''}">
   <div class="zpb-champ-kicker zpb-shm">SUPER BOWL CHAMPIONS</div>""",
"""+ `<div class="champion-banner${won?' zpb-champ-won':''}" style="--zshimL:${pkC?pkC.accL:'#c9a24b'};--zshimD:${pkC?pkC.accD:'#8a5f18'};">
   <div class="zpb-champ-kicker zpb-shm">SUPER BOWL CHAMPIONS</div>""",
    'K15b banner shim vars')
rep("""<span class="zpb-champ-name zpb-shine">${champ.toUpperCase()}</span>""",
    """<span class="zpb-champ-name zpb-shm">${champ.toUpperCase()}</span>""",
    'K15c champ name joins shimmer')
# K16 — the cinematic overlay: the whole champion display shimmers in the champion's color
rep("""  const ov = document.createElement('div'); ov.className = 'zpb-sbfin';
  ov.innerHTML = '<div class="zpb-sbfin-conf">'""",
"""  const ov = document.createElement('div'); ov.className = 'zpb-sbfin';
  if(pk) ov.style.setProperty('--zshim', pk.accD); // w43 (N11, Owner): the cinematic's champion display shimmers in the champion's color (the stage is always dark)
  ov.innerHTML = '<div class="zpb-sbfin-conf">'""",
    'K16 sbfin overlay shim')

# ================================================================ N10: the cinematic covers from the FIRST frame
rep(""".zpb-sbfin{position:fixed;inset:0;z-index:120;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .9s ease;background:radial-gradient(ellipse at 50% 30%,#2a1c08 0%,#160f04 55%,#0d0903 100%);overflow:hidden;}""",
""".zpb-sbfin{position:fixed;inset:0;z-index:120;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at 50% 30%,#2a1c08 0%,#160f04 55%,#0d0903 100%);overflow:hidden;} /* w43 (N10, Owner): the storm is OPAQUE from the first painted frame — the fade lived on the wrapper and that WAS the flash underneath; the stage inside keeps its own entrance */""",
    'K17 sbfin wrapper opaque')

# ================================================================ N12: the bracket — seeds read #X, scores wear their teams, the hint retires
# K18 — seed chips: "#X", never N1/A2
rep(""" const tag = (s,k)=> g[k+'Seed'] ? `<i class="zpb-tseed">${g[k+'Conf']?g[k+'Conf'].slice(0,1):''}${g[k+'Seed']}</i>` : '';""",
""" const tag = (s,k)=> g[k+'Seed'] ? `<i class="zpb-tseed">#${g[k+'Seed']}</i>` : ''; // w43 (N12, Owner): every seed reads #X — the N/A prefixes retire""",
    'K18 bracket seeds #X')
# K19 — per-team score inks on the tree cards
rep(""" const row = (a, b, aw)=>`<span class="zpb-trow2"><em class="${aw?'zpb-twin':''}">${a}</em><b class="${aw?'zpb-twin':''}">${b}</b></span>`;
 const inner = played
  ? row(teamCell(g.away,'away'), g.result.awayScore, !homeWon) + row(teamCell(g.home,'home'), g.result.homeScore, homeWon)
  : row(teamCell(g.away,'away'), g.neutral?'vs':'@', false) + row(teamCell(g.home,'home'), '', false);
 const full = g.away + (played ? ' ' + g.result.awayScore + ' — ' + g.result.homeScore + ' ' : ' @ ') + g.home;
 return `<div class="bracket-game bg3 zpb-tree-card${played?' zpb-tree-live':''}" data-pog="${rk}|${i}" title="${played?('Review: '+full):full}">${inner}</div>`;""",
""" const pkA = (typeof zpbPackFor==='function') ? zpbPackFor(g.away) : null, pkH = (typeof zpbPackFor==='function') ? zpbPackFor(g.home) : null;
 const tvars = `--scA:${pkA?pkA.accL:'inherit'};--scAd:${pkA?pkA.accD:'inherit'};--scH:${pkH?pkH.accL:'inherit'};--scHd:${pkH?pkH.accD:'inherit'};`;
 const row = (a, b, aw, cls)=>`<span class="zpb-trow2"><em class="${aw?'zpb-twin':''}">${a}</em><b class="${aw?'zpb-twin':''} ${cls||''}">${b}</b></span>`; // w43 (N12, Owner): each score wears its own team's color
 const inner = played
  ? row(teamCell(g.away,'away'), g.result.awayScore, !homeWon, 'zpb-tsca') + row(teamCell(g.home,'home'), g.result.homeScore, homeWon, 'zpb-tsch')
  : row(teamCell(g.away,'away'), g.neutral?'vs':'@', false, '') + row(teamCell(g.home,'home'), '', false, '');
 const full = g.away + (played ? ' ' + g.result.awayScore + ' — ' + g.result.homeScore + ' ' : ' @ ') + g.home;
 return `<div class="bracket-game bg3 zpb-tree-card${played?' zpb-tree-live':''}" style="${tvars}" data-pog="${rk}|${i}" title="${played?('Review: '+full):full}">${inner}</div>`;""",
    'K19 bracket score inks')
# K20 — the hint line retires
rep("""<div class="zpb-tree">${tree}</div><div id="zpbTreeDetail" style="display:none;margin-top:12px;"></div><div class="narr" style="margin-top:8px;">Click a played game to review what happened.</div></div>`;""",
"""<div class="zpb-tree">${tree}</div><div id="zpbTreeDetail" style="display:none;margin-top:12px;"></div></div>`; // w43 (N12, Owner): the hint line is removed from the bracket panel""",
    'K20 bracket hint removed')

# ================================================================ N8: the during-game header scores wear their teams
# K21 — the replay header carries both teams' packs; the scores read them per theme
rep("""  const r = g.result; if(!r || !r.homeEvents) return;""",
"""  const r = g.result; if(!r || !r.homeEvents) return;
  const pkA = (typeof zpbPackFor==='function') ? zpbPackFor(g.away) : null, pkH = (typeof zpbPackFor==='function') ? zpbPackFor(g.home) : null; // w43 (N8, Owner): the header scores wear their own teams' colors""",
    'K21a replay packs', count=2)
rep("""   + '<div class="zpb-rep-hd"><div class="zpb-rep-team">' + crest(g.away) + '<b style="color:' + colOf(g.away) + ';">' + abbr(g.away) + '</b><span class="zpb-rep-sc" id="zrepSa">0</span></div>'
   + '<span class="zpb-rep-qchip" id="zrepQ">1ST</span>'
   + '<div class="zpb-rep-team"><span class="zpb-rep-sc" id="zrepSh">0</span><b style="color:' + colOf(g.home) + ';">' + abbr(g.home) + '</b>' + crest(g.home) + '</div></div>'""",
"""   + '<div class="zpb-rep-hd"><div class="zpb-rep-team">' + crest(g.away) + '<b style="color:' + colOf(g.away) + ';">' + abbr(g.away) + '</b><span class="zpb-rep-sc zpb-slsc-aw" style="--scA:' + (pkA?pkA.accL:'inherit') + ';--scAd:' + (pkA?pkA.accD:'inherit') + ';" id="zrepSa">0</span></div>'
   + '<span class="zpb-rep-qchip" id="zrepQ">1ST</span>'
   + '<div class="zpb-rep-team"><span class="zpb-rep-sc zpb-slsc-hm" style="--scH:' + (pkH?pkH.accL:'inherit') + ';--scHd:' + (pkH?pkH.accD:'inherit') + ';" id="zrepSh">0</span><b style="color:' + colOf(g.home) + ';">' + abbr(g.home) + '</b>' + crest(g.home) + '</div></div>' // w43 (N8, Owner): the top scores wear their teams, never one shared red""",
    'K21b replay header score inks')

# ================================================================ N9: the game review — every score and stat in its own team's color
# K22 — the score-line numbers
rep("""  <div class="score-line">
   <div class="sl-team" style="text-align:right;${(typeof zpbNeutralRowVars==='function')?zpbNeutralRowVars(game.away):''}"><span class="zpb-sl2name${game.away===focusTeam?' zpb-usteam':''}">${(typeof zpbTeamLogo==='function')?zpbTeamLogo(game.away):''}${game.away}</span></div>
   <div class="sl-score"><span class="${game.away===focusTeam?'zpb-usscore':''}">${r.awayScore}</span> – <span class="${game.home===focusTeam?'zpb-usscore':''}">${r.homeScore}</span>${r.ot?' <span class="narr" style="font-size:0.7rem;">OT</span>':''}</div>""",
"""  <div class="score-line">
   <div class="sl-team" style="text-align:right;${(typeof zpbNeutralRowVars==='function')?zpbNeutralRowVars(game.away):''}"><span class="zpb-sl2name${game.away===focusTeam?' zpb-usteam':''}">${(typeof zpbTeamLogo==='function')?zpbTeamLogo(game.away):''}${game.away}</span></div>
   <div class="sl-score"${(function(){ const a=(typeof zpbPackFor==='function')?zpbPackFor(game.away):null, h=(typeof zpbPackFor==='function')?zpbPackFor(game.home):null; return a||h ? ` style="--scA:${a?a.accL:'inherit'};--scAd:${a?a.accD:'inherit'};--scH:${h?h.accL:'inherit'};--scHd:${h?h.accD:'inherit'};"` : ''; })()}><span class="zpb-slsc-aw ${game.away===focusTeam?'zpb-usscore':''}">${r.awayScore}</span> – <span class="zpb-slsc-hm ${game.home===focusTeam?'zpb-usscore':''}">${r.homeScore}</span>${r.ot?' <span class="narr" style="font-size:0.7rem;">OT</span>':''}</div> // w43 (N9, Owner): each side's score wears its own team's color, both themes""",
    'K22 review score-line inks')
# K23 — the Key Players cards: team vars on the card, names and stat lines in the team's ink
rep(""" function card(team, sd){
  const rows = notablePlayers(sd).map(p=>{
   const star = p.name===mvp.name && p.team===mvp.team;
   return `<tr class="${star?'kp-mvp':''}"><td class="pos">${p.group}</td><td><div class="nm">${p.name}</div><div class="st">${p.line.replace(/, /g,' · ')}</div></td></tr>`;
  }).join('');
  return `<div class="kp-card"><div class="kp-title">${team}</div><table class="kp"><tbody>${rows}</tbody></table></div>`;
 }""",
""" function card(team, sd){
  const rows = notablePlayers(sd).map(p=>{
   const star = p.name===mvp.name && p.team===mvp.team;
   return `<tr class="${star?'kp-mvp':''}"><td class="pos">${p.group}</td><td><div class="nm">${p.name}</div><div class="st">${p.line.replace(/, /g,' · ')}</div></td></tr>`;
  }).join('');
  return `<div class="kp-card"${(typeof zpbRowVars==='function')?` style="${zpbRowVars(team)}"`:''}><div class="kp-title">${team}</div><table class="kp"><tbody>${rows}</tbody></table></div>`; // w43 (N9, Owner): the card wears its team's tokens — the title, the names and the stats read that team, never the user's
 }""",
    'K23 key players team vars')
# K23b — the ACTIVE key-players builder (the v2 reassignment at ~810k): the CARD carries the team's
# tokens so the title reads that team; the per-player rows keep their own teams
rep("""  return '<div class="kp-card"><div class="kp-title">' + team + '</div>' + rows + '</div>';
 }
 return '<h4 style="margin:14px 0 8px;">Key Players</h4><div class="kp-grid">' + card(g.away, g.detail.away) + card(g.home, g.detail.home) + '</div>';
};""",
"""  return '<div class="kp-card"' + ((typeof zpbRowVars==='function') ? ' style="' + zpbRowVars(team) + '"' : '') + '><div class="kp-title">' + team + '</div>' + rows + '</div>'; // w43 (N9, Owner): the card wears its team's tokens — the title reads that team, never the user's
 }
 return '<h4 style="margin:14px 0 8px;">Key Players</h4><div class="kp-grid">' + card(g.away, g.detail.away) + card(g.home, g.detail.home) + '</div>';
};""",
    'K23b active key-players card vars')

# K24 — the Team Stats columns wear their teams
rep(""" ].map(x=>`<tr><td>${x[1]}</td><td class="narr" style="text-align:center;">${x[0]}</td><td style="text-align:right;">${x[2]}</td></tr>`).join('');
 return `<table style="margin-top:10px;"><tbody>${rows}</tbody></table>`;""",
""" ].map(x=>`<tr><td>${x[1]}</td><td class="narr" style="text-align:center;">${x[0]}</td><td style="text-align:right;">${x[2]}</td></tr>`).join('');
 const pkSA = (typeof zpbPackFor==='function') ? zpbPackFor(g.away) : null, pkSH = (typeof zpbPackFor==='function') ? zpbPackFor(g.home) : null; // w43 (N9): the stats columns read their teams
 return `<table class="zpb-tsstat" style="margin-top:10px;--scA:${pkSA?pkSA.accL:'inherit'};--scAd:${pkSA?pkSA.accD:'inherit'};--scH:${pkSH?pkSH.accL:'inherit'};--scHd:${pkSH?pkSH.accD:'inherit'};"><tbody>${rows}</tbody></table>`; // w43 (N9, Owner): the away column wears the away team, the home column the home team""",
    'K24 team stats column inks')

# ================================================================ N7: the game preview — one law for every team
# K25 — the matchup card names read their own team
rep(""".zpb-mu-name{font-weight:800;font-size:1.05rem;margin-top:6px;}""",
""".zpb-mu-name{font-weight:800;font-size:1.05rem;margin-top:6px;color:var(--tn,var(--text));} /* w43 (N7, Owner): the preview's team names wear their own teams' ink — the .zpb-mu-team carries the row tokens */""",
    'K25 mu-name team ink')
# K26 — the preview strip's team names read their own team
rep("""  return '<div class="zpb-strip">'
   + '<div class="zpb-strip-team">' + lg(g.away) + '<b>' + nick(g.away) + '</b></div>'
   + '<div class="zpb-strip-mid"><span class="zpb-strip-pct">' + Math.round((1-pw)*100) + '</span>'
   + '<div class="zpb-strip-bar"><i style="width:' + (pw*100).toFixed(1) + '%;"></i></div>'
   + '<span class="zpb-strip-pct">' + Math.round(pw*100) + '</span></div>'
   + '<div class="zpb-strip-team zpb-strip-h"><b>' + nick(g.home) + '</b>' + lg(g.home) + '</div>'
   + '</div>';""",
"""  const rvS = (typeof zpbRowVars==='function') ? zpbRowVars : function(){ return ''; };
  return '<div class="zpb-strip">'
   + '<div class="zpb-strip-team" style="' + rvS(g.away) + '">' + lg(g.away) + '<b>' + nick(g.away) + '</b></div>'
   + '<div class="zpb-strip-mid"><span class="zpb-strip-pct">' + Math.round((1-pw)*100) + '</span>'
   + '<div class="zpb-strip-bar"><i style="width:' + (pw*100).toFixed(1) + '%;"></i></div>'
   + '<span class="zpb-strip-pct">' + Math.round(pw*100) + '</span></div>'
   + '<div class="zpb-strip-team zpb-strip-h" style="' + rvS(g.home) + '"><b>' + nick(g.home) + '</b>' + lg(g.home) + '</div>'
   + '</div>'; // w43 (N7, Owner): the strip's team names wear their own teams' ink""",
    'K26 strip team inks')
# K27 — the preview's key-player card names ride the row tokens
rep(""".zpb-pcard b{color:var(--text);}""",
""".zpb-pcard b{color:var(--nm,var(--text));}
.zpb-pcard b.zpb-vib{color:var(--nmS,var(--nm,var(--text)));} /* w43 (N7, Owner): the preview's player names follow the tier law on every team — 90+ gold shimmer, 85+ bold tinted, the rest the team ink */""",
    'K27 pcard names tier law')

# ================================================================ N1: the Madden rankings cards — # and the rank stay on one line
# (CSS lands in the w43 block below)

# ================================================================ N6: a small window may scroll sideways to reach the footer
rep("""html{scrollbar-gutter:stable;}
@supports (overflow:clip){ body{overflow-x:clip;} }""",
"""html{scrollbar-gutter:stable;}
@media (min-width:1025px){ @supports (overflow:clip){ body{overflow-x:clip;} } } /* w43 (N6, Owner): the no-pan law holds on wide windows; a small window may scroll sideways so the whole footer stays reachable */""",
    'K28 body clip scoped wide')
rep("""/* 16) no horizontal panning, ever — the viewport itself cannot scroll sideways */
html{overflow-x:clip;}
@supports not (overflow-x:clip){ html{overflow-x:hidden;} }""",
"""/* 16) w43 (N6, Owner): on wide windows the viewport still cannot scroll sideways; in a small window
   it may — so the whole footer is reachable — and everything inside still compresses first */
@media (min-width:1025px){
 html{overflow-x:clip;}
 @supports not (overflow-x:clip){ html{overflow-x:hidden;} }
}
@media (max-width:1024px){
 html{overflow-x:auto;}
 body{overflow-x:visible;} /* w43 (N6, Owner): the VIEWPORT is the sideways scroller — body must not swallow the overflow into a nested bar */
}""",
    'K29 html clip scoped wide')

# K29b — the w33 B4 mobile re-clip sits LAST in the sheet and would beat the law above; scope it too
rep("""/* B4 (Owner): mobile — everything visible, nothing to scroll sideways */
html,body{overflow-x:hidden;}""",
"""/* B4 (Owner): mobile — everything visible; w43 (N6, Owner): the sideways no-scroll law now holds
   on WIDE windows only — a small window may scroll sideways so the whole footer stays reachable */
@media (min-width:1025px){ html,body{overflow-x:hidden;} }""",
    'K29b B4 re-clip scoped wide')

# ================================================================ the w43 blocks (style) at the end of the body
W43_CSS = """<style id=\"zpb-w43-css\">
/* ================= Z-POST-BLUE W43 (the Owner's round-43) ================= */
/* N4 (Owner): the 90+ name shimmer is the constant deep gold — every surface, every team.
   A surface that must shimmer in its own colors pins --zshim (the Super Bowl champions do). */
:root{--zshim:var(--gold3,#9a6b1f);}
/* N11 (Owner): the Super Bowl champions shimmer in THEIR colors, never the user's. */
.champion-banner{--zshim:var(--zshimL,#c9a24b);}
:root[data-theme=\"dark\"] .champion-banner{--zshim:var(--zshimD,#8a5f18);}
@media (prefers-color-scheme: dark){ :root:not([data-theme=\"light\"]) .champion-banner{--zshim:var(--zshimD,#8a5f18);} }
/* N12 (Owner): the bracket's scores wear their teams' colors, both themes. */
.zpb-trow2 b.zpb-tsca{color:var(--scA,var(--text));}
.zpb-trow2 b.zpb-tsch{color:var(--scH,var(--text));}
:root[data-theme=\"dark\"] .zpb-trow2 b.zpb-tsca{color:var(--scAd,var(--scA,var(--text)));}
:root[data-theme=\"dark\"] .zpb-trow2 b.zpb-tsch{color:var(--scHd,var(--scH,var(--text)));}
@media (prefers-color-scheme: dark){
 :root:not([data-theme=\"light\"]) .zpb-trow2 b.zpb-tsca{color:var(--scAd,var(--scA,var(--text)));}
 :root:not([data-theme=\"light\"]) .zpb-trow2 b.zpb-tsch{color:var(--scHd,var(--scH,var(--text)));}
}
/* N9 (Owner): the review's scores, stat columns, key-player names and stats read their own teams. */
.zpb-slsc-aw{color:var(--scA,var(--text));}
.zpb-slsc-hm{color:var(--scH,var(--text));}
:root[data-theme=\"dark\"] .zpb-slsc-aw{color:var(--scAd,var(--scA,var(--text)));}
:root[data-theme=\"dark\"] .zpb-slsc-hm{color:var(--scHd,var(--scH,var(--text)));}
@media (prefers-color-scheme: dark){
 :root:not([data-theme=\"light\"]) .zpb-slsc-aw{color:var(--scAd,var(--scA,var(--text)));}
 :root:not([data-theme=\"light\"]) .zpb-slsc-hm{color:var(--scHd,var(--scH,var(--text)));}
}
.kp .nm{color:var(--nm,var(--text));}
.kp .st{color:var(--nu,var(--sub));}
:root[data-theme=\"dark\"] .kp .nm{color:var(--nmd,var(--text));}
:root[data-theme=\"dark\"] .kp .st{color:var(--nud,var(--sub));}
@media (prefers-color-scheme: dark){
 :root:not([data-theme=\"light\"]) .kp .nm{color:var(--nmd,var(--text));}
 :root:not([data-theme=\"light\"]) .kp .st{color:var(--nud,var(--sub));}
}
table.zpb-tsstat td:first-child{color:var(--scA,var(--text));}
table.zpb-tsstat td:last-child{color:var(--scH,var(--text));}
:root[data-theme=\"dark\"] table.zpb-tsstat td:first-child{color:var(--scAd,var(--scA,var(--text)));}
:root[data-theme=\"dark\"] table.zpb-tsstat td:last-child{color:var(--scHd,var(--scH,var(--text)));}
@media (prefers-color-scheme: dark){
 :root:not([data-theme=\"light\"]) table.zpb-tsstat td:first-child{color:var(--scAd,var(--scA,var(--text)));}
 :root:not([data-theme=\"light\"]) table.zpb-tsstat td:last-child{color:var(--scHd,var(--scH,var(--text)));}
}
.zpb-kprow i{color:var(--nu,var(--sub));}
:root[data-theme="dark"] .zpb-kprow i{color:var(--nud,var(--sub));}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-kprow i{color:var(--nud,var(--sub));} }
/* N7 (Owner): the preview strip's team names ride their own team's ink. */
.zpb-strip-team b{color:var(--tn,var(--text));}
/* N1 (Owner): the Madden rankings cards never split the # from the rank — and never grow taller
   because of it — when the window compresses. */
table.mstack td.rank{width:auto !important;min-width:0;white-space:nowrap !important;}
table.mstack td.rank::before{flex:0 0 auto;margin-right:7px;}
.metricrow>div:last-child{white-space:nowrap;}
.zpb-sw-rank{white-space:nowrap;}
</style>
</body>
</html>"""
rep("""</body>
</html>""", W43_CSS, 'P30 w43 css block appended')

md5 = hashlib.md5(src.encode('utf-8')).hexdigest()
open(OUT, 'w', encoding='utf-8').write(src)
size = len(src.encode('utf-8'))
print(f'\nW43 BUILD OK · {OUT}')
print(f'md5 {md5} · {size:,} B · {len(checks)} replacements asserted')
