#!/usr/bin/env python3
# w32_patch1.py — wave 32 stage 1: guide, badge-guide, comparison, footer, game plan, stat-label laws.
# Every entry must match EXACTLY ONCE (unless count says otherwise) or the patch aborts.
import io, sys, hashlib

SRC = '/home/z/my-project/scripts/w32-base.html'
DST = '/home/z/my-project/scripts/w32-stage1.html'

E = []  # (old, new, expected_count)

# ---------- A6 · "On the player panels" = every league-leader stat, QB first, left to right ----------
# League leaders page groups (leadersPane/leaderBoards order): QB, RB, WR/TE, DL, LB/DB, OL, K, RET.
E.append((
  """  + schip('5,000', 'PASSY', 'Passing yards across the season.') // w27 example values · w28 law: yards read PASSY / RUSHY / RECY
  + schip('50', 'TD', 'Touchdowns scored or thrown.')
  + schip('15', 'INT', 'Interceptions thrown (or caught, on defense).')
  + schip('158.3', '20-0', 'The passer rating, carrying the site\\'s perfect-season mark.')
  + schip('250', 'RUSHY', 'Rushing yards.')
  + schip('300', 'CAR', 'Carries \\u2014 the handoffs the back took.') // w30 (Owner): carries read CAR
  + schip('25', 'SK', 'Sacks \\u2014 allowed by a quarterback, or forced by a defender.')
  + schip('100', 'QBR', 'The season performance grade the math computes for this player against his peers.')
  + schip('20', 'W', 'Wins.')
  + '</div>';""",
  """  + schip('4,200', 'CMP/ATT', 'Completions over attempts \\u2014 the quarterback\\'s passing line.') // w32 (Owner): the panels mirror the league-leaders page, left to right, starting with the QB
  + schip('4,600', 'PASSY', 'Passing yards across the season.')
  + schip('38', 'TD', 'Touchdowns thrown, caught or rushed.')
  + schip('9', 'INT', 'Interceptions thrown (or caught, on defense).')
  + schip('105.4', 'PRTG', 'The passer rating \\u2014 the only number on the site allowed a decimal.')
  + schip('320', 'CAR', 'Carries \\u2014 the handoffs the back took.')
  + schip('1,450', 'RUSHY', 'Rushing yards.')
  + schip('102', 'REC', 'Receptions over targets, written 102/150.')
  + schip('1,520', 'RECY', 'Receiving yards.')
  + schip('18', 'SK', 'Sacks \\u2014 allowed by an offensive lineman, or forced by a defender.')
  + schip('14', 'TFL', 'Tackles for loss \\u2014 stops behind the line of scrimmage.')
  + schip('42', 'PRSS', 'Pressures \\u2014 hurries and hits on the quarterback.')
  + schip('96', 'TKL', 'Tackles.')
  + schip('5', 'FF', 'Forced fumbles.')
  + schip('3', 'FR', 'Fumble recoveries.')
  + schip('4', 'PD', 'Passes defensed.')
  + schip('34', 'FG', 'Field goals made over attempts, written 34/38.')
  + schip('612', 'KR', 'Kick-return yards on the returns he took.')
  + schip('388', 'PR', 'Punt-return yards on the returns he took.')
  + schip('100', 'QBR', 'The season performance grade the math computes for this player against his peers.')
  + '</div>';""",
  1))

# ---------- A3 · personnel boxes: add 10, center the row ----------
E.append((
  """window.zpbPersBoxesHTML = function(){
 if(typeof PERS === 'undefined') return '';
 let h = '<div class="zpb-persboxes">';
 Object.keys(PERS).forEach(k=>{
  const rb = +k[0], te = +k[1], wr = 5-rb-te;
  h += `<div class="zpb-persbox" title="${PERS[k].long}"><b>${k}</b><span>RB ${rb}</span><span>TE ${te}</span><span>WR ${wr}</span></div>`;
 });
 h += '</div>';
 return h;
};""",
  """window.zpbPersBoxesHTML = function(){
 if(typeof PERS === 'undefined') return '';
 let h = '<div class="zpb-persboxes">';
 const boxes = Object.keys(PERS).map(k=>{
  const rb = +k[0], te = +k[1], wr = 5-rb-te;
  return {k, rb, te, wr, long:PERS[k].long};
 });
 if(!boxes.some(b=>b.k==='10')) boxes.push({k:'10', rb:1, te:0, wr:4, long:'one back, no tight end, four receivers \\u2014 shown for reading the code (the math lane owns whether the sim runs it)'}); // w32 (Owner): 10 joins the wall, display-first
 boxes.sort((a,b)=> (+a.k)-(+b.k));
 boxes.forEach(b=>{
  h += `<div class="zpb-persbox" title="${b.long}"><b>${b.k}</b><span>RB ${b.rb}</span><span>TE ${b.te}</span><span>WR ${b.wr}</span></div>`;
 });
 h += '</div>';
 return h;
};""",
  1))

# ---------- A4 · the DIME card joins the Coaching panel between NICKEL and FOCUS; the Guide's defense panel is removed ----------
E.append((
  """  + K.card('NICKEL', K.rowNK, 'Nickel takes a linebacker off and puts an extra defensive back on. The modern default.', 'Nickel front: five defensive backs.', {DT2:1,NICKEL:1})
  + '<div class="zpb-defcard"><h5>FOCUS</h5><div class="zpb-defdots">'+badge('pass')+' '+badge('run')+' '+badge('bal')+'</div><p>The same personnel can lean pass, lean run, or stay even \\u2014 the badge shows the lean at a glance.</p></div>'
  + '</div>';""",
  """  + K.card('NICKEL', K.rowNK, 'Nickel takes a linebacker off and puts an extra defensive back on. The modern default.', 'Nickel front: five defensive backs.', {DT2:1,NICKEL:1})
  + K.card('DIME', K.rowDM, 'A sixth defensive back comes in \\u2014 built for 3rd and long, 4th and long, and the end of the game when only a Hail Mary can beat you.', 'Dime: plays around 10% of the snaps, mainly on 3rd and long or 4th and long, especially at the end of the game, preventing Hail Marys.', {DT2:1,NICKEL:1,DIME:1}) // w32 (Owner): the Dime card lives in the Coaching panel, between Nickel and Focus
  + '<div class="zpb-defcard"><h5>FOCUS</h5><div class="zpb-defdots">'+badge('pass')+' '+badge('run')+' '+badge('bal')+'</div><p>The same personnel can lean pass, lean run, or stay even \\u2014 the badge shows the lean at a glance.</p></div>'
  + '</div>';""",
  1))
E.append((
  "  + sec('DEFENSE: 4-3, 3-4, NICKEL, DIME', zpbDefGuideHTML(), true)\n",
  "",  # w32 (Owner): the Guide's defense panel is gone — the visuals live in the Coaching panel now
  1))

# ---------- B12 · Reading the Draft Board: the two sentences split; ", not just size" is gone ----------
E.append((
  "'<div class=\"zpb-bmcall zpb-bm-center\"><b>Why can a linebacker show high priority?</b><br>Because priority is about scarcity, not just size. If the best edge rushers will still be there at your next pick but the elite linebackers will not, the linebacker\\u2019s priority can be higher even though his Wins number is smaller.<br>The Wins column is the clean \\u201chow good is he\\u201d number.<br>Priority is the \\u201cdo I need to take him now\\u201d number.</div>'",
  "'<div class=\"zpb-bmcall zpb-bm-center\"><b>Why can a linebacker show high priority?</b><br>Because priority is about scarcity.<br>If the best edge rushers will still be there at your next pick but the elite linebackers will not, the linebacker\\u2019s priority can be higher even though his Wins number is smaller.<br>The Wins column is the clean \\u201chow good is he\\u201d number.<br>Priority is the \\u201cdo I need to take him now\\u201d number.</div>' // w32 (Owner): the two sentences sit on their own lines; \", not just size\" is gone",
  1))

# ---------- B10 · the Coaching panel loses the WR sentence (it lives in the persTable intro) ----------
E.append((
  " const coach = `<p style=\"margin:4px 0;\"><b>Personnel codes.</b></p>${persTableHTML()}`;",
  " const coach = persTableHTML(); // w32 (Owner): the extra sentence about the quarterback and the five linemen is gone \\u2014 the boxes speak",
  1))
E.append((
  "Every offense also has a quarterback and five offensive linemen, so the wide receivers fill whatever is left of the 11.",
  "The code reads how many backs, tight ends and receivers take the field together.",
  1))

# ---------- A27 · Team Comparison: the "Team A / Team B" words are gone ----------
E.append((
  """    <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);">Team A
     <select id="cmpTeamA"></select>
    </label>
    <label class="zpb-cmp-b" style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);">Team B
     <select id="cmpTeamB"></select>
    </label>""",
  """    <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);" aria-label="Team A">
     <select id="cmpTeamA"></select>
    </label>
    <label class="zpb-cmp-b" style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);" aria-label="Team B">
     <select id="cmpTeamB"></select>
    </label>""",
  1))

# ---------- A34 · the two ratings: integers, centered ----------
E.append((
  """    <div style="display:flex;justify-content:space-between;align-items:center;font-size:1.1rem;font-weight:700;gap:10px;flex-wrap:wrap;">
     <span>${a.label}</span><span class="score" style="color:var(--accent);">${a.score.toFixed(2)} vs ${b.score.toFixed(2)}</span><span>${b.label}</span>
    </div>""",
  """    <div style="display:grid;grid-template-columns:1fr auto 1fr;align-items:center;font-size:1.1rem;font-weight:700;gap:10px;">
     <span>${a.label}</span><span class="zpb-cmpscore" style="color:var(--accent);text-align:center;">${Math.round(a.score)} vs ${Math.round(b.score)}</span><span style="text-align:right;">${b.label}</span>
    </div>""",
  1))

# ---------- A7 · the footer: DARK moves below the row, centered ----------
E.append((
  '<nav class="footnav zpb-footnav" aria-label="More tools"><button class="footlink active" id="tabDraftBtn">SIMULATOR</button><button class="footlink" id="tabRankingsBtn">MADDEN RANKINGS</button><button class="footlink" id="tabPlayersBtn">PLAYER BROWSER</button><button class="footlink" id="tabGroupsBtn">POSITION RANKINGS</button><button class="footlink" id="tabCompareBtn">TEAM COMPARISON</button><button class="footlink" id="tabGuideBtn">GUIDE</button><button class="footlink" id="themeToggleBtn" title="Switch light / dark">DARK</button></nav>',
  '<nav class="footnav zpb-footnav" aria-label="More tools"><button class="footlink active" id="tabDraftBtn">SIMULATOR</button><button class="footlink" id="tabRankingsBtn">MADDEN RANKINGS</button><button class="footlink" id="tabPlayersBtn">PLAYER BROWSER</button><button class="footlink" id="tabGroupsBtn">POSITION RANKINGS</button><button class="footlink" id="tabCompareBtn">TEAM COMPARISON</button><button class="footlink" id="tabGuideBtn">GUIDE</button></nav><div class="zpb-foottheme"><button class="footlink" id="themeToggleBtn" title="Switch light / dark">DARK</button></div>',
  1))

# ---------- A12 · the "WHY THESE PLANS?" dropdown is removed from the game plan panel ----------
E.append((
  """  <details style="margin-top:10px;"><summary style="cursor:pointer;font-weight:700;">WHY THESE PLANS?</summary>
   ${zpbDuelHTML(g)}
   <p class="narr" style="margin:6px 0 0;">Coaches are scored against what the opponent is <i>expected</i> to do — nobody reacts to a plan they cannot see — and a trailing team opens it up late. ${S.scriptLocked?'':'Your coaching philosophy is still open on the <a href="#" id="backToPreseason" class="zpb-teamlink">Preseason page</a>.'} The Guide tab has the math of each choice.</p></details></div>`;""",
  """  </div>`; // w32 (Owner): the WHY THESE PLANS? dropdown is gone from the game plan panel""",
  1))
E.append((
  """ const bp = document.getElementById('backToPreseason');
 if(bp) bp.addEventListener('click', e=>{ e.preventDefault(); S.preseason = true; renderSeasonTab(container); });
}""",
  """ const bp = document.getElementById('backToPreseason');
 if(bp) bp.addEventListener('click', e=>{ e.preventDefault(); S.preseason = true; renderSeasonTab(container); });
}
// w32 (Owner): the why-plans explainer lives only in the Guide now \\u2014 nothing wires it here""",
  1))

# ---------- A24 · IN DA CLUTCH -> CLUTCH GAMES ----------
E.append((
  "  ['IN DA CLUTCH', close, 'within 7 points', me.close ? me.closeW*2 > me.close : null],",
  "   ['CLUTCH GAMES', close, 'within 7 points', me.close ? me.closeW*2 > me.close : null], // w32 (Owner): the label is CLUTCH GAMES",
  1))

# ---------- A25 · RUSHER WON capitalized ----------
E.append((
  "   + (nt ? barRow('Rusher won', taken.rush, nt) + barRow('SUBPAR BLOCKING', taken.ol, nt) + barRow('EXCELLENT COVERAGE', taken.cov, nt) : '<p class=\"narr\" style=\"margin:4px 0;\">No sacks allowed yet.</p>');",
  "   + (nt ? barRow('RUSHER WON', taken.rush, nt) + barRow('SUBPAR BLOCKING', taken.ol, nt) + barRow('EXCELLENT COVERAGE', taken.cov, nt) : '<p class=\"narr\" style=\"margin:4px 0;\">No sacks allowed yet.</p>'); // w32 (Owner): RUSHER WON in caps",
  1))

# ---------- A26 + A39 · the OL lines read SK / PRSS; DEF TD is just TD; never SKS ----------
E.append((
  " else if(group==='OL'){ parts.push(`${fmtN(s.rbk)} RUSHY`, `${s.pk||0} PK`, `${s.sa||0} SK A`, `${s.pa||0} PRSS A`); }",
  " else if(group==='OL'){ parts.push(`${fmtN(s.rbk)} RUSHY`, `${s.pk||0} PK`, `${s.sa||0} SK`, `${s.pa||0} PRSS`); } // w32 (Owner): SK and PRSS \\u2014 never SK A, never PRSS A",
  1))
E.append((
  " else if(group==='OL'){ parts.push(`${s.rbk||0} RUSHY`, `${s.pk||0} PK`); if(s.sa) parts.push(`${s.sa} SK A`); if(s.pa) parts.push(`${s.pa} PRSS A`); }",
  " else if(group==='OL'){ parts.push(`${s.rbk||0} RUSHY`, `${s.pk||0} PK`); if(s.sa) parts.push(`${s.sa} SK`); if(s.pa) parts.push(`${s.pa} PRSS`); } // w32 (Owner): SK and PRSS in the game line too",
  1))
E.append((
  "  {title:'Offensive Line', group:'OL', key:'pk', cols:[['Y behind',r=>fmtN(r.st.rbk)],['SK A',r=>r.st.sa||0],['PRSS A',r=>r.st.pa||0]]},",
  "  {title:'Offensive Line', group:'OL', key:'pk', cols:[['Y behind',r=>fmtN(r.st.rbk)],['SK',r=>r.st.sa||0],['PRSS',r=>r.st.pa||0]]}, // w32 (Owner): SK / PRSS on the leaders page",
  1))
E.append((
  "  out.push(chip(fmtN(s.rbk||0), 'RUSHY'), chip(s.pk||0, 'PK'), chip(s.sa||0, 'SK A'), chip(s.pa||0, 'PRSS A')); // w28 (Owner): RUSHY behind the blocks; PRSS for pressure",
  "  out.push(chip(fmtN(s.rbk||0), 'RUSHY'), chip(s.pk||0, 'PK'), chip(s.sa||0, 'SK'), chip(s.pa||0, 'PRSS')); // w32 (Owner): SK / PRSS chips",
  1))
E.append((
  " if(s.dtd) p.push(`${s.dtd} DEF TD`);",
  " if(s.dtd) p.push(`${s.dtd} TD`); // w32 (Owner): a defensive touchdown is just TD \\u2014 never DEF TD",
  1))
E.append((
  "['Def TD',r=>r.st.dtd||0]]},",
  "['TD',r=>r.st.dtd||0]]}, // w32 (Owner): TD, never Def TD",
  3))

# ---------- A2 part 1 · the K rating curve is compressed (kickers stop topping the league) ----------
E.append((
  """  peers.forEach((r,i)=>{ let z=0; keys.forEach(k=>{ const st=stats[k]; z += W[k]*(st.s>1e-9 ? (mets[i][k]-st.m)/st.s : 0); }); r._rating = clampNum(50+17*z + roleBonus(r), 0, 99.9); });
  peers.slice().sort((a,b)=>b._rating-a._rating).forEach((r,i)=>{ r._rank = i+1; });""",
  """  peers.forEach((r,i)=>{ let z=0; keys.forEach(k=>{ const st=stats[k]; z += W[k]*(st.s>1e-9 ? (mets[i][k]-st.m)/st.s : 0); });
   r._rating = clampNum(50+17*z + roleBonus(r), 0, 99.9);
   if(g==='K') r._rating = clampNum(56 + (r._rating-50)*0.42, 40, 82); // w32 (Owner): kickers stop topping the league \\u2014 the K curve is compressed toward the middle
  });
  peers.slice().sort((a,b)=>b._rating-a._rating).forEach((r,i)=>{ r._rank = i+1; });""",
  1))

# ---------- B22/A14 · integers everywhere (PRTG keeps its decimal) ----------
E.append((
  " if(n===1) return `the league's top-rated ${GROUP_SINGULAR[rec.group]}, ${r.toFixed(1)}`;",
  " if(n===1) return `the league's top-rated ${GROUP_SINGULAR[rec.group]}, ${Math.round(r)}`; // w32 (Owner): integers",
  1))
E.append((
  " if(n<=5) return `rated #${n} among ${GROUP_PLURAL[rec.group]} (${r.toFixed(1)})`;",
  " if(n<=5) return `rated #${n} among ${GROUP_PLURAL[rec.group]} (${Math.round(r)})`; // w32 (Owner): integers",
  1))
E.append((
  "function fmtWar(w){ return (w>=0?'+':'\\u2212') + Math.abs(w).toFixed(2); }",
  "function fmtWar(w){ return (w>=0?'+':'\\u2212') + Math.round(Math.abs(w)); } // w32 (Owner): wins are integers on the screen",
  1))
E.append((
  "const mvpWhy = c => pick([`${rate(c).toFixed(1)}-rated ${c.pos} on a ${W[c.team]}-win team`, `the league's top-rated ${c.pos} profile, carrying ${c.team} to ${W[c.team]} wins`, `${c.pos} production (${rate(c).toFixed(1)} rating) and ${W[c.team]} wins`]);",
  "const mvpWhy = c => pick([`${Math.round(rate(c))}-rated ${c.pos} on a ${W[c.team]}-win team`, `the league's top-rated ${c.pos} profile, carrying ${c.team} to ${W[c.team]} wins`, `${c.pos} production (${Math.round(rate(c))} rating) and ${W[c.team]} wins`]); // w32 (Owner): integers",
  1))
E.append((
  " out.individual.push({title:'Offensive Player of the Year', c:opoy, why:`the top non-quarterback on offense, rated ${rate(opoy).toFixed(1)}`});",
  " out.individual.push({title:'Offensive Player of the Year', c:opoy, why:`the top non-quarterback on offense, rated ${Math.round(rate(opoy))}`}); // w32 (Owner): integers",
  1))
E.append((
  " out.individual.push({title:'Defensive Player of the Year', c:dpoy, why:`rated ${rate(dpoy).toFixed(1)} among the league's defenders (${dpoy.pos})`});",
  " out.individual.push({title:'Defensive Player of the Year', c:dpoy, why:`rated ${Math.round(rate(dpoy))} among the league's defenders (${dpoy.pos})`}); // w32 (Owner): integers",
  1))
E.append((
  " out.individual.push({title:'Coach of the Year', team:coach, coach:headCoach(coach), why:`${headCoach(coach)} led them to ${cw} wins against ${ce.toFixed(1)} projected from the roster's own ratings (+${(cw-ce).toFixed(1)})`});",
  " out.individual.push({title:'Coach of the Year', team:coach, coach:headCoach(coach), why:`${headCoach(coach)} led them to ${cw} wins against ${Math.round(ce)} projected from the roster's own ratings (+${Math.round(cw-ce)})`}); // w32 (Owner): integers",
  1))
E.append((
  " cands.push({name:r.name, team:r.team, pos:'RET', group:'RET', rec:null, score:50+((r.st.retYds||0)/n-11)*4+0.2*(W[r.team]-8.5), line:`${fmtN(r.st.retYds)} return yards on ${n} returns (${((r.st.retYds||0)/n).toFixed(1)} a return)`});",
  " cands.push({name:r.name, team:r.team, pos:'RET', group:'RET', rec:null, score:50+((r.st.retYds||0)/n-11)*4+0.2*(W[r.team]-8.5), line:`${fmtN(r.st.retYds)} return yards on ${n} returns (${Math.round((r.st.retYds||0)/n)} a return)`}); // w32 (Owner): integers",
  1))

# ---------- B11 · the balanced focus wears the \u2261 glyph, not three bars ----------
E.append((
  """    : '<span class="zpb-emph zpb-emph-b" title="Balanced"><span class="zpb-bars"><i></i><i></i><i></i></span></span>';""",
  """    : '<span class="zpb-emph zpb-emph-b" title="Balanced"><b>\\u2261</b></span>'; // w32 (Owner): balanced is the \\u2261 glyph \\u2014 the three bars are gone everywhere""",
  1))

def main():
    src = io.open(SRC, encoding='utf-8').read()
    out = src
    for old, new, cnt in E:
        n = out.count(old)
        if n != cnt:
            print('FAIL count=%d expected=%d for: %s' % (n, cnt, old[:110].replace('\n','\\n')))
            sys.exit(1)
        out = out.replace(old, new)
    io.open(DST, 'w', encoding='utf-8').write(out)
    print('stage1 OK  md5', hashlib.md5(out.encode()).hexdigest(), 'bytes', len(out.encode()))

if __name__ == '__main__':
    main()
