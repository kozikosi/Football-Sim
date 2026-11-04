#!/usr/bin/env python3
"""WAVE 19 · PATCH 7 — Regular Season Review polish.
Slower 20-0 breathing, awards summary note gone, first-team All-Pro shimmer,
stat-badge player panels, MVP title stacked in three shimmering words,
and the badges documented in the Guide."""
import sys

P = '/home/z/my-project/Football-Sim/Football-Sim-Z-post-blue w19.html'
src = open(P, encoding='utf-8').read()
n = 0

def rep(old, new, tag, count=1):
    global src, n
    c = src.count(old)
    if c != count:
        print(f'FAIL [{tag}]: {c} matches (expected {count})'); sys.exit(1)
    src = src.replace(old, new)
    n += 1
    print(f'ok [{tag}]')

# ---- 7a · the 20-0 breathing: slow fade out, up to five seconds dark, slow fade back ----
rep(
""".zpb-cyg{color:color-mix(in srgb,var(--text) 55%,var(--bg));animation:zpbcyg 5.6s ease-in-out infinite;}
.zpb-cygq{animation:zpbcyg 5.6s ease-in-out infinite;}
@keyframes zpbcyg{0%,100%{opacity:.28}50%{opacity:1}}""",
""".zpb-cyg{color:color-mix(in srgb,var(--text) 55%,var(--bg));animation:zpbcyg 15s ease-in-out infinite;} /* w19 (Owner): slow fade out, up to 5s dark, slow return */
.zpb-cygq{animation:zpbcyg 15s ease-in-out infinite;}
@keyframes zpbcyg{0%{opacity:.28}18%{opacity:1}38%{opacity:1}62%{opacity:0}84%{opacity:0}100%{opacity:.28}}""", '7a cyg breathing')

# ---- 7b · the awards panel: drop the parenthetical, wear the new badge format ----
rep(
"""function renderRegularAwardsHTML(A, open){
 const user = seasonUserTeam();
 const ind = A.individual.map(a=> a.c
  ? `<tr><td>${a.title}</td><td>${honorLineHTML(a.c,user)} <span class="narr">${a.c.pos} · ${a.c.line}</span><div class="narr">${a.why}</div></td></tr>`
  : `<tr><td>${a.title}</td><td><span${a.team===user?' style="color:var(--accent);font-weight:700;"':''}>${a.coach?a.coach+' · ':''}${a.team}</span><div class="narr">${a.why}</div></td></tr>`).join('');
 const stat = A.stat.map(a=>`<tr><td>${a.title}</td><td>${honorLineHTML(a,user)} <span class="narr">${a.line}</span></td></tr>`).join('');
 const teamBox = (tm)=> HONOR_ORDER.map(pos=>`<tr><td class="narr">${pos}</td><td>${tm[pos].map(c=>honorLineHTML(c,user)).join(', ')||'—'}</td></tr>`).join('');""",
"""function renderRegularAwardsHTML(A, open){
 const user = seasonUserTeam();
 const ind = A.individual.map(a=> a.c
  ? `<tr><td>${a.title==='Most Valuable Player'?'<div class="zpb-mvptitle zpb-shm">Most<br>Valuable<br>Player</div>':a.title}</td><td>${honorLineHTML(a.c,user)} <span class="narr">${a.c.pos}</span><div class="zpb-schiprow" style="margin-top:5px;">${a.c.rec?zpbStatChipsHTML(a.c.rec):''}</div><div class="narr">${a.why}</div></td></tr>`
  : `<tr><td>${a.title}</td><td><span${a.team===user?' style="color:var(--accent);font-weight:700;"':''}>${a.coach?a.coach+' · ':''}${a.team}</span><div class="narr">${a.why}</div></td></tr>`).join('');
 const stat = A.stat.map(a=>`<tr><td>${a.title}</td><td>${honorLineHTML(a,user)} <span class="narr">${a.line}</span></td></tr>`).join('');
 const teamBox = (tm, shm)=> HONOR_ORDER.map(pos=>`<tr><td class="narr">${pos}</td><td>${(tm[pos]||[]).map(c=>honorLineHTML(c,user,shm)).join(', ')||'—'}</td></tr>`).join('');""", '7b awards rows')

rep(
"""   <div><h5 class="narr" style="margin:0 0 4px;">First-Team All-Pro</h5><table><tbody>${teamBox(A.allPro.first)}</tbody></table></div>""",
"""   <div><h5 class="narr" style="margin:0 0 4px;">First-Team All-Pro</h5><table><tbody>${teamBox(A.allPro.first, true)}</tbody></table></div>""", '7b-2 first-team shimmer')

rep(
""" return `<details class="panel" style="margin-bottom:14px;" ${open?'open':''}><summary style="cursor:pointer;font-weight:700;">Regular-Season Awards &amp; Honors <span class="narr" style="font-weight:400;">(MVP, All-Pro, Pro Bowl)</span></summary>""",
""" return `<details class="panel" style="margin-bottom:14px;" ${open?'open':''}><summary style="cursor:pointer;font-weight:700;">Regular-Season Awards &amp; Honors</summary>""", '7b-3 summary text')

# ---- 7c · honorLineHTML learns to shimmer ----
rep(
"""function honorLineHTML(c, user){ return `<span${c.team===user?' style="color:var(--accent);font-weight:700;"':''}>${c.name}</span> <span class="narr">${nick(c.team)}</span>`; }""",
"""function honorLineHTML(c, user, shm){
 const pk = (shm && typeof zpbPackFor==='function') ? zpbPackFor(c.team) : null;
 const attr = shm && pk ? ` class="zpb-shm" style="--zrb:${pk.accL};"` : (c.team===user?' style="color:var(--accent);font-weight:700;"':'');
 return `<span${attr}>${c.name}</span> <span class="narr">${nick(c.team)}</span>`; // w19: first-team All-Pro always shimmers
}""", '7c honor shimmer')

# ---- 7d · MVP title CSS ----
rep(
"""/* ---- w19: the season in badges ---- */""",
"""/* ---- w19: the season in badges ---- */
.zpb-mvptitle{font-family:'Cinzel Decorative','Cinzel','Bodoni Moda',Georgia,serif;font-size:0.92rem;line-height:1.35;letter-spacing:.14em;font-weight:800;text-transform:uppercase;}""", '7d mvp title')

# ---- 7e · the badges documented in the Guide, beautifully ----
rep(
"""  + sec('THE MATH OF EVERY GAME-PLAN CHOICE', planMathHTML(), false)
  + sec('GLOSSARY', zpbGlossHTML(), false);""",
"""  + sec('THE MATH OF EVERY GAME-PLAN CHOICE', planMathHTML(), false)
  + sec('THE BADGES: READING EVERY BOX', zpbBadgesGuideHTML(), true)
  + sec('GLOSSARY', zpbGlossHTML(), false);""", '7e-1 guide section')

rep(
"""let _guideHtml = null;
function guideHTMLCached(){ return _guideHtml || (_guideHtml = renderGuideHTML()); }""",
"""// w19 (Owner): every boxed chip on the site, explained — as beautiful as the badges themselves
function zpbBadgesGuideHTML(){
 const chip = (t, d, cls)=>'<div class="zpb-bdg"><span class="zrl-badge '+(cls||'')+'">'+t+'</span><div><b>'+t+'</b><div class="narr">'+d+'</div></div></div>';
 const schip = (v, k, d)=>'<div class="zpb-bdg"><span class="zpb-schip"><b>'+v+'</b><i>'+k+'</i></span><div><b>'+k+'</b><div class="narr">'+d+'</div></div></div>';
 return '<div class="zpb-bdggrid">'
  + '<h5 class="narr" style="flex-basis:100%;margin:4px 0;">On the field, during the game</h5>'
  + chip('TD', 'Touchdown — six points, boxed and shimmering beside the play.')
  + chip('FG', 'Field goal made — the kick, boxed where the word used to be.')
  + chip('12Y', 'Yardage — the number of yards the play gained, Y for yards.')
  + chip('INT', 'Interception — the pass was caught by the defense.')
  + chip('FF', 'Forced fumble — the defender knocked the ball out.')
  + chip('FR', 'Fumble recovery — the ball was picked up by the defense.')
  + chip('\\u2022 KC', 'Turnover — the dot marks the giveaway; the box names the team that takes over.')
  + '<h5 class="narr" style="flex-basis:100%;margin:12px 0 4px;">On the player panels</h5>'
  + schip('4,373', 'PassY', 'Passing yards across the season.')
  + schip('37', 'TD', 'Touchdowns scored or thrown.')
  + schip('7', 'INT', 'Interceptions thrown (or caught, on defense).')
  + schip('99.3', '20-0', 'The passer rating, carrying the site\\'s perfect-season mark.')
  + schip('71', 'RushY', 'Rushing yards.')
  + schip('43', 'SK', 'Sacks — allowed by a quarterback, or forced by a defender.')
  + schip('74.4', 'QBR', 'The season performance grade the math computes for this player against his peers.')
  + schip('12', 'W', 'Wins.')
  + '<h5 class="narr" style="flex-basis:100%;margin:12px 0 4px;">The season in badges</h5>'
  + '<p class="narr" style="margin:4px 0;">The Regular Season Review opens with the whole year told in badges — record, seed, streaks, margins, the best and worst moments, the unit rankings, the three stars of the offense and the three of the defense, the honors your players earned, and the key factors — one badge a second, offense first, then defense, then what decided it. A perfect season wears gold.</p>'
  + '</div>';
}

let _guideHtml = null;
function guideHTMLCached(){ return _guideHtml || (_guideHtml = renderGuideHTML()); }""", '7e-2 guide builder')

# ---- 7f · guide badges CSS ----
rep(
""".zpb-mvptitle{font-family:'Cinzel Decorative','Cinzel','Bodoni Moda',Georgia,serif;font-size:0.92rem;line-height:1.35;letter-spacing:.14em;font-weight:800;text-transform:uppercase;}""",
""".zpb-mvptitle{font-family:'Cinzel Decorative','Cinzel','Bodoni Moda',Georgia,serif;font-size:0.92rem;line-height:1.35;letter-spacing:.14em;font-weight:800;text-transform:uppercase;}
.zpb-bdggrid{display:flex;flex-wrap:wrap;gap:10px;}
.zpb-bdg{display:flex;align-items:center;gap:10px;flex:1 0 250px;max-width:340px;border:1px solid var(--border);border-radius:12px;padding:8px 10px;background:var(--panel2);}
.zpb-bdg .zrl-badge{flex:0 0 auto;}
.zpb-bdg b{font-size:0.8rem;}
.zpb-bdg .narr{font-size:0.7rem;}""", '7f badges CSS')

open(P, 'w', encoding='utf-8').write(src)
print(f'\nPATCH 7 complete: {n} replacements')
