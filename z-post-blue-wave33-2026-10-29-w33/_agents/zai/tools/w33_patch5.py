#!/usr/bin/env python3
# w33_patch5.py — wave 33 stage 5: the season's end.
# R24 · the honors series strictly precedes the REGULAR SEASON IS IN THE BOOKS panel and its confetti
# R26 · the user's All-Pro / Pro Bowl players wear a border line and the shimmer
# R36 · other teams' award players wear a neutral drawn from their own team colors — never white
# R37 · the All-Playoff team renders as player panels / badges, not a list
# R35 · the unit report card: clean badge bodies, one tile at a time
# R38 · DRAFT PICK GRADES moves below the ADVANCED STATS panel (both review paths)
# R39 · the stale VS ACTUAL NFL TEAMS tab dies the moment a season starts
# R13 · every DIME row shares the NICKEL row's geometry — the D sits under the N
import sys

SRC = '/home/z/my-project/scripts/w33_stage4.html'
DST = '/home/z/my-project/scripts/w33_stage5.html'

E = []
def add(old, new, n=1):
    E.append((old, new, n))

# ---------- R24 · the box can never lead: hidden until the honors finish, confetti rides the box ----------
add(
"""  if(honors.length){
    setTimeout(()=> ov.classList.add('zpb-rest-ready'), Math.min(honors.length*900 + 1600, 20000));
  } else ov.classList.add('zpb-rest-ready');""",
"""  if(honors.length){
    setTimeout(()=> ov.classList.add('zpb-rest-ready'), Math.max(honors.length*900 + 1600, 3600)); // w33 (R24, Owner): the honors finish first — every one of them — then the book closes
  } else ov.classList.add('zpb-rest-ready');""")

add(
""".zpb-restov .zpb-restbox{opacity:0;transform:scale(.94) translateY(10px);transition:opacity 1.4s ease,transform 1.4s cubic-bezier(.2,.7,.3,1);}
.zpb-restov.zpb-rest-ready .zpb-restbox{opacity:1;transform:none;}""",
""".zpb-restov .zpb-restbox{opacity:0;transform:scale(.94) translateY(10px);transition:opacity 1.4s ease,transform 1.4s cubic-bezier(.2,.7,.3,1);visibility:hidden;} /* w33 (R24): hidden means hidden — no flash of the box while the honors land */
.zpb-restov.zpb-rest-ready .zpb-restbox{opacity:1;transform:none;visibility:visible;}""")

# ---------- R26 + R36 · the honor lines: the user wears the border + shimmer; everyone else wears his team ----------
add(
"""function honorLineHTML(c, user, shm){
 const pk = (shm && typeof zpbPackFor==='function') ? zpbPackFor(c.team) : null;
 const attr = shm && pk ? ` class="zpb-shm" style="--zrb:${pk.accL};"` : (c.team===user?' style="color:var(--accent);font-weight:700;"':'');
 return `<span${attr}>${c.name}</span> <span class="narr">${nick(c.team)}</span>`; // w19: first-team All-Pro always shimmers
}""",
"""function honorLineHTML(c, user, shm){
 // w33 (R26, Owner): YOUR award players wear a border line around the name and the shimmer.
 // w33 (R36, Owner): everybody else wears a neutral drawn from his own team's colors — never white.
 const pk = (typeof zpbPackFor==='function') ? zpbPackFor(c.team) : null;
 if(c.team===user){
  return `<span class="zpb-awme zpb-shm" style="--zrb:var(--accent);">${c.name}</span> <span class="narr">${nick(c.team)}</span>`;
 }
 let color = '';
 try{
  const _t = document.documentElement.getAttribute('data-theme');
  const dark = _t==='dark' || (!_t && !(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches));
  if(pk) color = dark ? pk.accD : pk.accL;
 }catch(err){}
 const attr = (shm && pk) ? ` class="zpb-shm" style="--zrb:${pk.accL};color:${pk.accL};"` : (color ? ` style="color:${color};"` : '');
 return `<span${attr}>${c.name}</span> <span class="narr">${nick(c.team)}</span>`;
}
// w33 (R26): the bordered, shimmering award chip for the Owner's own players""")

add(
"""/* A35 (Owner): the UNIT REPORT CARD — letter-grade badges, no hover anywhere */""",
""".zpb-awme{display:inline-block;border:1px solid var(--zrb,var(--accent));border-radius:9px;padding:1px 9px;position:relative;overflow:hidden;font-weight:800;}
/* A35 (Owner): the UNIT REPORT CARD — letter-grade badges, no hover anywhere */""")

# ---------- R37 · the All-Playoff team as player panels ----------
add(
""" const team = P.team.map(a=>`<tr><td class="narr">${a.pos}</td><td>${honorLineHTML(a,user)} <span class="narr">${a.line}</span></td></tr>`).join('');""",
""" const team = P.team.map((a,i)=>`<div class="zpb-awpanel zpb-dfc2" style="--beat:${i}"><span class="zpb-poschip">${a.pos}</span><span class="zpb-awpanel-name">${honorLineHTML(a,user)}</span><i class="narr">${a.line}</i></div>`).join(''); // w33 (R37, Owner): the All-Playoff team reads as player panels, one beat at a time""")

add(
"""return `<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">Playoff Awards</h3><table><tbody>${sb}${mvp}</tbody></table>${rounds}""",
"""return `<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">Playoff Awards</h3><table><tbody>${sb}${mvp}</tbody></table>${rounds}""", n=1) # anchor guard

# find the team table close and re-wrap (the panel's tail)
add(
"""  <h5 class="narr" style="margin:14px 0 4px;">All-Playoff Team</h5><table><tbody>${team}</tbody></table></div>`;""",
"""  <h5 class="narr" style="margin:14px 0 4px;">All-Playoff Team</h5><div class="zpb-awgrid">${team}</div></div>`; // w33 (R37, Owner): panels, not a list""")

# ---------- R35 · the unit report card: clean bodies, staggered landing ----------
add(
""".zpb-rcgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px;}
.zpb-rcbadge{display:flex;gap:10px;align-items:center;border:1px solid var(--border);border-radius:14px;background:var(--panel2);padding:10px 12px;}""",
""".zpb-rcgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:10px;}
.zpb-rcbadge{display:flex;gap:10px;align-items:center;border:1px solid var(--border);border-radius:14px;background:var(--panel2);padding:10px 12px;min-width:0;opacity:0;transform:translateY(14px);animation:zpbsbeat .8s cubic-bezier(.2,.7,.3,1) forwards;animation-delay:calc(var(--beat,0)*1s);} /* w33 (R35, Owner): one tile at a time, like the season badges */
@media (prefers-reduced-motion: reduce){ .zpb-rcbadge{animation:none;opacity:1;transform:none;} }""")

add(
""".zpb-rc-body{display:flex;flex-direction:column;gap:2px;min-width:0;}
.zpb-rc-body b{font-size:.82rem;}
.zpb-rc-body i{font-style:normal;font-size:.68rem;color:var(--sub);}
.zpb-rc-body em{font-style:normal;font-size:.66rem;color:var(--sub);opacity:.85;}""",
""".zpb-rc-body{display:flex;flex-direction:column;gap:3px;min-width:0;line-height:1.35;}
.zpb-rc-body b{font-size:.82rem;}
.zpb-rc-body i{font-style:normal;font-size:.68rem;color:var(--sub);}
.zpb-rc-body em{font-style:normal;font-size:.66rem;color:var(--sub);opacity:.85;overflow-wrap:anywhere;} /* w33 (R35, Owner): the produced line wraps instead of layering */""")

add(
"""  const tiles = ORDER.map(u=>{
   const rank = rk[u]||32;
   const pct = ((32-rank)/31)*100;
   const lg = (typeof letterGrade==='function') ? letterGrade(pct) : '';
   const diff = Math.round((R[u]-(S.league?S.league[u]:R[u]))*1);
   const cls = rank<=8 ? ' zpb-sb-good' : (rank>=25 ? ' zpb-sb-bad' : '');
   return '<div class="zpb-met zpb-rcbadge'+cls+'" data-u="'+u+'" style="'+uv+'">'""",
"""  let _bi = 0;
  const tiles = ORDER.map(u=>{
   const rank = rk[u]||32;
   const pct = ((32-rank)/31)*100;
   const lg = (typeof letterGrade==='function') ? letterGrade(pct) : '';
   const diff = Math.round((R[u]-(S.league?S.league[u]:R[u]))*1);
   const cls = rank<=8 ? ' zpb-sb-good' : (rank>=25 ? ' zpb-sb-bad' : '');
   return '<div class="zpb-met zpb-rcbadge'+cls+'" data-u="'+u+'" style="'+uv+'--beat:'+(_bi++)+';">'""")

# ---------- R38 · DRAFT PICK GRADES below the ADVANCED STATS panel ----------
add(
""" html += renderRegularAwardsHTML(seasonState.awardsRS, true) + pickGradePanelHTML() + renderStatsTabsHTML() + teamAdvancedHTML() + advancedStatsHTML() + renderUserScheduleHTML() + renderStandingsHTML() + seasonOptionsHTML(); // w32 (Owner): the season options ride at the bottom of the review too // w32 (Owner): the old Unit Report Card table and the pick-critique table give way to the pick-grade table; the unit badges live in the Season Review header now""",
""" html += renderRegularAwardsHTML(seasonState.awardsRS, true) + renderStatsTabsHTML() + teamAdvancedHTML() + advancedStatsHTML() + pickGradePanelHTML() + renderUserScheduleHTML() + renderStandingsHTML() + seasonOptionsHTML(); // w33 (R38, Owner): the pick grades sit below the advanced stats panel""")

add(
""" html += renderPlayoffAwardsHTML(seasonState.awardsPO) + renderRegularAwardsHTML(seasonState.awardsRS, false) + pickGradePanelHTML() + renderStatsTabsHTML('po') + renderStatsTabsHTML() + teamAdvancedHTML() + advancedStatsHTML() + renderBracketHTML() + renderUserScheduleHTML() + renderStandingsHTML() + seasonOptionsHTML(); // w32 (Owner): same swaps on the Season Review""",
""" html += renderPlayoffAwardsHTML(seasonState.awardsPO) + renderRegularAwardsHTML(seasonState.awardsRS, false) + renderStatsTabsHTML('po') + renderStatsTabsHTML() + teamAdvancedHTML() + advancedStatsHTML() + pickGradePanelHTML() + renderBracketHTML() + renderUserScheduleHTML() + renderStandingsHTML() + seasonOptionsHTML(); // w33 (R38, Owner): the pick grades sit below the advanced stats panel on the Season Review too""")

# ---------- R39 · the stale VS ACTUAL tab dies the moment a season exists ----------
add(
"""function startSeason(){
 const {draftEntries} = buildResultEntries();""",
"""function startSeason(){
 try{ // w33 (R39, Owner): VS. ACTUAL NFL TEAMS lives on the post-draft page only — a starting season takes it off the board, wherever it was showing
  const _nfl = document.getElementById('resultsNflBtn'); if(_nfl) _nfl.remove();
  const _body = document.getElementById('draftResultsBody');
  if(_body && typeof renderDraftResults === 'function' && document.getElementById('draftFinalResults') && document.getElementById('draftFinalResults').style.display!=='none'){ try{ resultsView = 'season'; renderDraftResults(); }catch(err){} }
 }catch(err){}
 const {draftEntries} = buildResultEntries();""")

# ---------- R13 · the DIME row wears the standard grid everywhere; slotnames align left ----------
add(
"""window.zpbDimeRow = function(slotmap){
 const d = window.zpbDimeOf ? window.zpbDimeOf(slotmap) : null;
 const e = d ? normalizeSlotEntry(d) : null;
 const nm = (e && e.name!=null) ? `${e.name} (${e.ovr})` : ''; // w19 (Owner): no dash placeholder on an empty Dime
 return `<div class="depth-row"><span class="slotname">DIME</span><span class="${e&&e.name!=null?'playername':'empty'}">${nm}</span></div>`; // w30 (Owner): the Dime row is formatted exactly like every other position
};""",
"""window.zpbDimeRow = function(slotmap){
 const d = window.zpbDimeOf ? window.zpbDimeOf(slotmap) : null;
 const e = d ? normalizeSlotEntry(d) : null;
 const nm = (e && e.name!=null) ? `${e.name} (${e.ovr})` : ''; // w19 (Owner): no dash placeholder on an empty Dime
 return `<div class="depth-row dgrid"><span class="slotname">DIME</span><span class="${e&&e.name!=null?'playername':'empty'} ${e&&e.name!=null?(e.ovr>=90?'zpb-shm':(e.ovr>=85?'zpb-vib':'')):''}">${nm}</span><span class="dovr">${e&&e.name!=null?e.ovr:''}</span><span class="narr dwar"></span></div>`; // w33 (R13, Owner): the D of DIME sits directly under the N of NICKEL — the standard grid everywhere
};""")

add(
""".depth-row:not(.lgrid):not(.dgrid) .slotname{display:inline-block;min-width:54px;text-align:center;font-size:.62rem;font-weight:800;letter-spacing:.08em;color:var(--ongold,var(--te""",
""".depth-row:not(.lgrid):not(.dgrid) .slotname{display:inline-block;min-width:54px;text-align:left;font-size:.62rem;font-weight:800;letter-spacing:.08em;color:var(--ongold,var(--te""")

# the awards panels CSS (R37) + All-Playoff grid
add(
""".zpb-awme{display:inline-block;border:1px solid var(--zrb,var(--accent));border-radius:9px;padding:1px 9px;position:relative;overflow:hidden;font-weight:800;}""",
""".zpb-awme{display:inline-block;border:1px solid var(--zrb,var(--accent));border-radius:9px;padding:1px 9px;position:relative;overflow:hidden;font-weight:800;}
/* w33 (R37): the All-Playoff panels */
.zpb-awgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:9px;}
.zpb-awpanel{display:flex;flex-direction:column;gap:3px;border:1px solid var(--rosehair,var(--border));border-radius:13px;background:var(--panel2);padding:9px 12px;min-width:0;}
.zpb-awpanel .zpb-poschip{align-self:flex-start;}
.zpb-awpanel-name{min-width:0;}
.zpb-awpanel i.narr{font-style:normal;font-size:.66rem;overflow-wrap:anywhere;}""")

def main():
    src = open(SRC, encoding='utf-8').read()
    for i, (old, new, n) in enumerate(E):
        c = src.count(old)
        if c != n:
            print(f'FAIL entry {i}: expected {n} match(es), found {c}')
            print('--- snippet head ---')
            print(old[:240])
            sys.exit(1)
        src = src.replace(old, new)
    open(DST, 'w', encoding='utf-8').write(src)
    print('w33_patch5 OK ->', DST, len(src), 'bytes')

if __name__ == '__main__':
    main()
