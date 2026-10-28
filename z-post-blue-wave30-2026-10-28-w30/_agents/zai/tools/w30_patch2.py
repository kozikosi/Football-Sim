#!/usr/bin/env python3
# w30_patch2.py — Z.ai session 22 · wave 30 stage 2: block surgeries + the w30 CSS payload.
# Runs AFTER w30_patch.py, on the same product file. Every surgery asserts exactly one match.
import io, re, sys, hashlib

P = '/home/z/my-project/download/Football-Sim-Z-post-blue-w30.html'

with io.open(P, 'r', encoding='utf-8') as f:
    s = f.read()

def surg(pattern, repl, name, flags=0):
    global s
    m = re.findall(pattern, s, flags)
    if len(m) != 1:
        print(f'SURGERY FAIL ({name}): {len(m)} matches'); sys.exit(1)
    s = re.sub(pattern, repl, s, count=1, flags=flags)
    print(f'surgery ok: {name}')

# ---------- H2/H4/H6 · describe(): players in team colors, boxes in the beneficiary's color,
# pick-six as X [INT][TD] Y, safety as X [SAF] Y ----------
DESC_OLD = re.compile(
    r"  const describe = e=>\{\n"
    r"   const inf = info\[e\.side\] \|\| \{recs:\[\], rush:\[\], qbName:'', kicker:'', dtq:\[\]\};\n"
    r".*?"
    r"   return 'Score';\n  \};",
    re.S)
DESC_NEW = (
"  const describe = e=>{\n"
"   const inf = info[e.side] || {recs:[], rush:[], qbName:'', kicker:'', dtq:[], safs:[]};\n"
"   const _oppKey = e.side==='home' ? 'away' : 'home';\n"
"   const _me = colOf(g[e.side]), _op = colOf(g[_oppKey]);\n"
"   const nm = (t, c)=>'<span style=\"color:'+c+';\">'+t+'</span>'; // w30 (Owner): every player wears his team's colors\n"
"   const zpbChip = (t, c)=>'<span class=\"zrl-badge zrl-chip\" style=\"color:'+c+';\">'+t+'</span>'; // w19: the play speaks in boxes · w30: each box wears the color of the team it benefits\n"
"   const zpbYds = s=>{ const m = /(\\d+)\\s*yds/.exec(s||''); return m ? zpbChip(m[1]+'Y', _me) : ''; };\n"
"   if(e.type==='FG') return nm(inf.kicker || 'Kicker', _me) + ' ' + zpbChip('FG', _me) + (window.zpbCineYds ? ' ' + zpbYds(zpbCineYds(e,'fg')) : '');\n"
"   if(e.type==='SAF'){ // w30 (Owner): X [SAF] Y — the defender who caused it and the player tackled in his own end zone\n"
"    const s0 = inf.safs && inf.safs.shift();\n"
"    const x = (s0 && s0.n1) || 'Defense';\n"
"    const y = (s0 && s0.v) || ((info[_oppKey] || {}).qbName || '');\n"
"    return nm(x, _me) + ' ' + zpbChip('SAF', _me) + (y ? ' ' + nm(y, _op) : '');\n"
"   }\n"
"   if(e.type==='TD'){\n"
"    const total = inf.recs.length + inf.rush.length;\n"
"    const isPass = total ? Math.random() < (inf.recs.length/total) : false;\n"
"    if(isPass && inf.recs.length) return nm(inf.qbName || 'Quarterback', _me) + ' to ' + nm(inf.recs.shift(), _me) + ' ' + (window.zpbCineYds ? zpbYds(zpbCineYds(e,'pass')) : '');\n"
"    if(inf.rush.length) return nm(inf.rush.shift(), _me) + ' rush ' + (window.zpbCineYds ? zpbYds(zpbCineYds(e,'run')) : ''); // w19 (Owner): RUSH, yardage box beside it\n"
"    if(inf.recs.length) return nm(inf.qbName || 'Quarterback', _me) + ' to ' + nm(inf.recs.shift(), _me) + ' ' + (window.zpbCineYds ? zpbYds(zpbCineYds(e,'pass')) : '');\n"
"    const d = (inf.dtq || []).shift(); // w30 (Owner): a defensive score reads X [INT][TD] Y or X [FF][TD] Y — the scorer, the boxes, the man who lost the ball\n"
"    if(d) return nm(d.name, _me) + ' ' + zpbChip(d.kind==='INT' ? 'INT' : 'FF', _me) + zpbChip('TD', _me) + (d.from ? ' ' + nm(d.from, _op) : '');\n"
"    return 'Touchdown';\n"
"   }\n"
"   return 'Score';\n"
"  };")
surg(DESC_OLD, DESC_NEW.replace('\\', '\\\\'), 'describe() rewrite')

# ---------- H1/H3 · runEvents(): every quarter shows its card (1 s dwell), one-line fumbles ----------
RUN_OLD = re.compile(
    r"  const runEvents = \(\)=>\{\n"
    r".*?"
    r"   timers\.push\(setTimeout\(\(\)=>\{ finish\(false\); \}, t \+ 700\)\);\n  \};",
    re.S)
RUN_NEW = (
"  const runEvents = ()=>{\n"
"   const total0 = all.length;\n"
"   // 30-60 s of play-by-play: slower cadence, quarter banners get room to breathe\n"
"   const step = Math.min(3400, Math.max(1500, 34000/total0));\n"
"   // w30 (Owner): every quarter shows its card — even a quarter where nothing happens —\n"
"   // and each card dwells a full second before the next line shows.\n"
"   const byQ = {1:[],2:[],3:[],4:[]};\n"
"   all.forEach(e=>{ const q = Math.min(4, Math.max(1, e.q||1)); byQ[q].push(e); });\n"
"   const seq = [];\n"
"   for(let q=1;q<=4;q++){ seq.push({card:q}); byQ[q].forEach(e=>seq.push({e})); }\n"
"   const total = seq.length;\n"
"   let t = 500, ei = -1;\n"
"   timers.push(setTimeout(()=>{ prog.style.width = '4%'; }, 60));\n"
"   seq.forEach((it)=>{\n"
"    if(it.card){\n"
"     const qq = it.card;\n"
"     timers.push(setTimeout(()=>{\n"
"      qchip.textContent = (QN[qq] || ('Q' + qq)).split(' ')[0];\n"
"      const d = document.createElement('div'); d.className = 'zpb-rep-q'; d.textContent = QN[qq] || ('QUARTER ' + qq);\n"
"      log.appendChild(d);\n"
"      log.scrollTop = log.scrollHeight;\n"
"     }, t));\n"
"     t += 1000;\n"
"     return;\n"
"    }\n"
"    ei++;\n"
"    const ev = it.e;\n"
"    timers.push(setTimeout(()=>{\n"
"     if(ev.type==='TO'){\n"
"      // w30 (Owner): a fumble is ONE line — X [FF] Y — the defender who forced it and the\n"
"      // player who fumbled it away. Recoveries no longer appear on the during-game screen.\n"
"      // An interception keeps the X [INT] Y shape. No line is ever nameless.\n"
"      const tk = (tkQ[ev.side] || []).shift();\n"
"      const zpbTc = (t2, c)=>'<span class=\"zrl-badge zrl-chip\" style=\"color:'+c+';\">'+t2+'</span>'; // w19: the play speaks in boxes · w30: each box wears the color of the team it benefits\n"
"      const zpbWinner = ev.side==='home' ? g.away : g.home; // the team that won the ball\n"
"      const oppKey = ev.side==='home' ? 'away' : 'home';\n"
"      const _winC = colOf(zpbWinner), _offC = colOf(g[ev.side]);\n"
"      const nm2 = (t2, c)=>'<span style=\"color:'+c+';\">'+t2+'</span>'; // w30 (Owner): players wear their own team's colors\n"
"      const zpbLine = (teamKey, txt, dot)=>{\n"
"       const ln = document.createElement('div');\n"
"       ln.className = 'zpb-rep-line zrl-to';\n"
"       ln.innerHTML = '<span class=\"zrl-t\">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[teamKey])\n"
"        + '<span class=\"zrl-team\">' + abbr(g[teamKey]) + '</span><span class=\"zrl-play\">' + txt + '</span>'\n"
"        + (dot ? '<span class=\"zrl-badge\" style=\"color:' + _winC + ';\">\\u2022 ' + abbr(zpbWinner) + '</span>' : '');\n"
"       log.appendChild(ln);\n"
"       requestAnimationFrame(()=>{ ln.classList.add('in'); });\n"
"      };\n"
"      if(tk && tk.type==='INT'){\n"
"       zpbLine(oppKey, nm2(tk.name || '', _winC) + ' ' + zpbTc('INT', _winC) + ' ' + nm2(tk.from || '', _offC), true);\n"
"      } else if(tk){\n"
"       zpbLine(oppKey, nm2(tk.name || '', _winC) + ' ' + zpbTc('FF', _winC) + ' ' + nm2(tk.from || '', _offC), true);\n"
"      } else {\n"
"       zpbLine(ev.side, zpbTc('TO', _winC), true);\n"
"      }\n"
"      log.scrollTop = log.scrollHeight;\n"
"      return;\n"
"     }\n"
"     if(ev.side==='home') hs += (ev.pts||0); else as += (ev.pts||0);\n"
"     sa.textContent = as; sh.textContent = hs;\n"
"     const _cl = colOf(g[ev.side]);\n"
"     const line = document.createElement('div');\n"
"     line.className = 'zpb-rep-line' + (((ev.side==='home'&&focusTeam===g.home)||(ev.side==='away'&&focusTeam===g.away)) ? ' zrl-me' : '');\n"
"     const _badge = ev.type==='SAF' ? '' // w30 (Owner): the SAF box lives inside the line — X [SAF] Y\n"
"      : ev.type==='TD' ? '<span class=\"zrl-badge zrl-td zpb-shm\" style=\"--zrb:' + _cl + '\">TD</span>'\n"
"      : ev.type==='FG' ? '<span class=\"zrl-badge' + (ei===gwIdx ? ' zpb-shm' : '') + '\" style=\"--zrb:' + _cl + ';color:' + _cl + ';\">FG</span>'\n"
"      : '<span class=\"zrl-badge\" style=\"color:' + _cl + ';\">+</span>';\n"
"     line.innerHTML = '<span class=\"zrl-t\">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[ev.side])\n"
"      + '<span class=\"zrl-team\">' + abbr(g[ev.side]) + '</span><span class=\"zrl-play\">' + describe(ev)\n"
"      + '</span>' + _badge\n"
"      + '<span class=\"zrl-sc\"><b style=\"color:' + colOf(g.away) + ';\">' + as + '</b> - <b style=\"color:' + colOf(g.home) + ';\">' + hs + '</b></span>';\n"
"     log.appendChild(line);\n"
"     requestAnimationFrame(()=>{ line.classList.add('in'); });\n"
"     log.scrollTop = log.scrollHeight;\n"
"     prog.style.width = (8 + 88*((ei+1)/total0)).toFixed(1) + '%';\n"
"     if(ev.q===4 && Math.abs(hs-as) <= 7 && !clutch){\n"
"      clutch = true;\n"
"      box.classList.add('zpb-clutch');\n"
"      if(roundLabel) box.classList.add('zpb-clutch2');\n"
"     }\n"
"    }, t));\n"
"    t += step;\n"
"   });\n"
"   timers.push(setTimeout(()=>{ finish(false); }, t + 700));\n"
"  };")
surg(RUN_OLD, RUN_NEW.replace('\\', '\\\\'), 'runEvents() rewrite')

# ---------- the w30 CSS payload ----------
CSS = (
'<style id="zpb-w30-css">\n'
'/* ============ Z-POST-BLUE W30 ============ */\n'
'/* A (Owner): the ANCHOR chip drops the bright gold for a quiet sage-teal — same pill, far less glare */\n'
'.zpb-anch{border-color:#5c7d74 !important;background:#a9c4bd !important;color:#22312c !important;}\n'
'.zpb-anch b{color:inherit !important;opacity:.72;}\n'
'.zpb-anch .zpb-anchname{color:inherit !important;}\n'
':root[data-theme="dark"] .zpb-anch,:root:not([data-theme="light"]) .zpb-anch{border-color:#56807a !important;background:#3d5a52 !important;color:#d8e8e2 !important;}\n'
'/* A2 (Owner): the bold law — every 85+ player bold, everywhere */\n'
'.zpb-shm,.zpb-vib{font-weight:800;}\n'
'/* A3 (Owner): the four hidden ratings are gone — the browser panel narrows to its six columns */\n'
'#viewPlayers .panel{max-width:920px;}\n'
'/* A4 (Owner): a player and his OVR never split across lines */\n'
'.zpb-gplayer{white-space:nowrap;}\n'
'/* C (Owner): the comparison dropdowns fit the longest full team name, Team B hugs the right */\n'
'#viewCompare .zpb-cmp-filters label{flex:none;}\n'
'#viewCompare .zpb-cmp-filters select{min-width:340px;max-width:100%;width:auto;}\n'
'.zpb-cmp-filters .zpb-cmp-b select{margin-left:auto;}\n'
'@media (max-width:480px){ #viewCompare .zpb-cmp-filters select{min-width:0;width:100%;} }\n'
'/* D3 (Owner): the key keeps the shapes — DT2 a square, ILB2 and SAM triangles, the backs circles */\n'
'.zpb-dl-chip i.k-circ{border-radius:50%;}\n'
'.zpb-dl-chip i.k-tri{width:0;height:0;border-radius:0;background:transparent !important;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:9px solid currentColor;}\n'
'/* F1 (Owner): the Dime row wears the standard slot chip — its two special rules were deleted at the source */\n'
'</style>\n')
ANCH = '.zpb-cmp-filters .zpb-cmp-b{align-items:flex-end;text-align:right;}\n</style>'
if s.count(ANCH) != 1:
    print('CSS anchor fail:', s.count(ANCH)); sys.exit(1)
s = s.replace(ANCH, ANCH + '\n' + CSS, 1)
print('w30 CSS payload inserted')

# ---------- post-checks ----------
MARKS = [
 'zpb-w30-css', "const n = t=> t; // w30 (Owner)", "['CB',-5],['NICKEL',-3],['CB',5]",
 "xrow([['DIME','DIME',-3]])", "keyChip(k,inn)", "K.keyChip(k,null)",
 "font-weight:400 !important;font-family:'Cinzel Decorative'", "'WR3','WR4','TE1','TE2','TE3'",
 "['DE1','DT1','DT2','DE2','DL5','MIKE'", "Defensive line (DL)", "TE3 / WR4 / DL5",
 "const hold = [1500, 1500, 900, 2400]", "reduce ? 400 : 600", "v:victim", "oppVictims:victimsOf(aOff)",
 "zpbLift(base, 0.62)", "`${s.car||0} CAR`", "parts.push(`${s.sack} SK`)",
 "['SK',r=>r.st.sack||0]", "schip('300', 'CAR'", "MORE ADVANCED STATS", "LINEUP AND FLEXES <span",
 "DRAFT CRITIQUE: YOUR PICK ORDER, PICK BY PICK", "id=\"simGameBtn\"", 'id="zpbGameReviewNow"',
 "X [SAF] Y", "X [FF] Y", "zpbChip(d.kind==='INT' ? 'INT' : 'FF', _me)", "byQ[q].forEach(e=>seq.push({e}))",
 "t += 1000;", "zpbS:7", "shuffleArr(rounds).forEach", "while(!DIV_WEEK_NUMBERS && _dvTries++ < 500)",
]
missing = [m for m in MARKS if m not in s]
if missing:
    print('MISSING MARKERS:', missing); sys.exit(1)
print(f'all {len(MARKS)} post-check markers present')

# no AGI/COD/INJ/AWR columns remain; no SKS outside the logo base64 and comments
import re as _re
if 'data-col="agi"' in s or 'data-col="awr"' in s or '${agi}' in s:
    print('AGI/COD/INJ/AWR still visible'); sys.exit(1)
sks = [ln for ln in s.split('\n') if 'SKS' in ln]
bad = [ln[:100] for ln in sks if 'base64' not in ln and 'w30' not in ln and 'never SKS' not in ln and 'no SKS' not in ln]
if bad:
    print('SKS remains:', bad[:4]); sys.exit(1)
print('AGI/COD/INJ/AWR gone · SKS gone (outside base64)')

with io.open(P, 'w', encoding='utf-8') as f:
    f.write(s)
print(f'w30_patch2.py done · md5 {hashlib.md5(s.encode("utf-8")).hexdigest()}')
