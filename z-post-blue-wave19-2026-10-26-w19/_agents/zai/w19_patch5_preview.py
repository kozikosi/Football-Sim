#!/usr/bin/env python3
"""WAVE 19 · PATCH 5 — Game Preview package.
Scouting Report + Identity panels removed; solid bar colors; standings 2x division;
navy teams wear their badge silver; 20-0 pinned top-right with breathing room;
face-off CSS; undefinedDIFF fixed."""
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

# ---- 5a · remove the Scouting Report and Identity panels from the season hub ----
rep(
"   html += renderPreviewPanel(myGame, 'regular') + renderLineupComparisonHTML(myGame.home, myGame.away) + renderGamePlanPanel(myGame) + renderScoutingHTML(opp) + renderMatchupMathHTML(myGame.home, myGame.away, myGame);",
"   html += renderPreviewPanel(myGame, 'regular') + renderLineupComparisonHTML(myGame.home, myGame.away) + renderGamePlanPanel(myGame) + renderMatchupMathHTML(myGame.home, myGame.away, myGame); // w19 (Owner): the scouting report repeated the matchup math — gone",
'5a-1 regular hub')

rep(
"   html += lineupPanelHTML() + renderPreviewPanel(pg, 'playoff') + renderScoutingHTML(opp) + renderGamePlanPanel(pg) + renderMatchupMathHTML(pg.home, pg.away, pg) + renderLineupComparisonHTML(pg.home, pg.away);",
"   html += lineupPanelHTML() + renderPreviewPanel(pg, 'playoff') + renderGamePlanPanel(pg) + renderMatchupMathHTML(pg.home, pg.away, pg) + renderLineupComparisonHTML(pg.home, pg.away); // w19 (Owner): scouting report gone here too",
'5a-2 playoffs')

rep(
" html += lineupPanelHTML() + renderTeamIdentityHTML(week===1 && !seasonState.weekSimulated) + renderUserScheduleHTML() + renderStandingsHTML() + renderStatsTabsHTML() + seasonOptionsHTML();",
" html += lineupPanelHTML() + renderUserScheduleHTML() + renderStandingsHTML() + renderStatsTabsHTML() + seasonOptionsHTML(); // w19 (Owner): Your Team's Identity repeated the math — gone",
'5a-3 identity')

# ---- 5b · matchup-math bars: one solid team color, full or empty ----
rep(
""".zpb-mbar i{display:block;height:100%;border-radius:4px;background:linear-gradient(90deg,var(--zrb,var(--accent)),var(--zr1,var(--accent)));}
.zpb-mc-h .zpb-mbar i{background:linear-gradient(90deg,var(--zr1,var(--accent)),var(--zrb,var(--accent)));}""",
""".zpb-mbar i{display:block;height:100%;border-radius:4px;background:var(--zrb,var(--accent));} /* w19 (Owner): the bar is the team's color, full or near-empty */
.zpb-mc-h .zpb-mbar i{background:var(--zrb,var(--accent));}""", '5b solid bars')

# ---- 5c · standings: your division exactly twice the size of the others, sharing the grid ----
rep(
""" return `<div class="panel zpb-glowpanel" style="margin-bottom:14px;"><h4 style="margin-top:0;">STANDINGS</h4>
  ${divTable(myDiv, false)}
  <div class="zpb-stand-minor">${ordered.map(d=>divTable(d, true)).join('')}</div>
 </div>`;""",
""" return `<div class="panel zpb-glowpanel" style="margin-bottom:14px;"><h4 style="margin-top:0;">STANDINGS</h4>
  <div class="zpb-stand-grid">${divTable(myDiv, false)}${ordered.map(d=>divTable(d, true)).join('')}</div>
 </div>`; // w19 (Owner): your division sits twice as wide as every other box""", '5c grid markup')

# ---- 5d · navy identities wear their badge silver ----
rep(
""" if(zpbHsl(eng).s < 0.15) eng = zpbMix(eng,'#c9a24b',0.45);   // still no chroma (LV): warm it, chips stay true""",
""" if(zpbHsl(eng).s < 0.15) eng = zpbMix(eng,'#c9a24b',0.45);   // still no chroma (LV): warm it, chips stay true
 // w19 (Owner): a near-black navy reads too dark — when the badge carries a silver, blend it in so the text brightens without losing the team
 { const metals = raw.filter(h=>{ const c=zpbHsl(h); return c.s<0.14 && c.l>0.45; });
   if(zpbHsl(eng).l < 0.26 && metals.length){
     const metal = metals.find(h=>{ const c=zpbHsl(h); return c.l>=0.55 && c.l<=0.92; }) || metals[metals.length-1];
     eng = zpbMix(eng, metal, 0.45);
   }
 }""", '5d silver rule')

# ---- 5e · "Can you go 20-0?" pinned to the panel's top-right corner, with breathing room ----
rep(
"""  <p class="dsub" style="text-align:right;"><span class="zpb-cyg">Can you go </span><b class="zpb-shine">20-0</b><b class="zpb-shine zpb-cygq">?</b></p>""",
"""  <p class="dsub zpb-cygdsub" style="margin:0;"><span class="zpb-cyg">Can you go </span><b class="zpb-shine">20-0</b><b class="zpb-shine zpb-cygq">?</b></p>""", '5e-1 markup')

rep(
""".zpb-mhead{border:0;background:transparent;}""",
""".zpb-mhead{border:0;background:transparent;}
/* w19 (Owner): the 20-0 question lives in the header row's top-right corner, with air around every word */
.zpb-cygdsub{margin-left:auto;white-space:nowrap;}
.zpb-cygdsub .zpb-cyg{margin-right:7px;}
.zpb-cygdsub .zpb-cygq{margin-left:5px;}
.zpb-stand-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:10px;align-items:stretch;}
.zpb-stand-grid .zpb-divmain{grid-row:span 2;}
@media (max-width:900px){ .zpb-stand-grid{grid-template-columns:1fr 1fr;} .zpb-stand-grid .zpb-divmain{grid-column:1 / -1;grid-row:auto;} }
.zpb-pvrow{display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:stretch;margin-top:8px;}
.zpb-pvface{display:flex;justify-content:space-between;align-items:center;gap:10px;margin:2px 0 4px;}
.zpb-pvteamhd{display:inline-flex;align-items:center;gap:8px;font-weight:800;font-size:.95rem;}
.zpb-pvteamhd img{width:24px;height:24px;object-fit:contain;background:transparent;box-shadow:none;}
.zpb-pvvs{color:var(--sub);font-size:.72rem;letter-spacing:.28em;font-weight:700;}
.zpb-pvempty{border:1px dashed var(--border);border-radius:12px;min-height:54px;background:transparent;}""", '5e-2 CSS')

# ---- 5f · undefinedDIFF: computeStandings entries never carry diff — compute it here ----
rep(
"""  + tile('Diff', (st.diff>=0 ? '+' : '') + st.diff, st.diff > 0 ? 'zpb-gl-good' : '')""",
"""  + tile('Diff', ((st.pf - st.pa)>=0 ? '+' : '') + (st.pf - st.pa), (st.pf - st.pa) > 0 ? 'zpb-gl-good' : '') // w19 fix: st.diff never existed on the standings map — "undefinedDIFF" is gone""", '5f undefinedDIFF')

open(P, 'w', encoding='utf-8').write(src)
print(f'\nPATCH 5 complete: {n} replacements')
