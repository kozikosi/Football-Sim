#!/usr/bin/env python3
"""w28_patch3.py — stage 3: TEAM STATS default-open, capitalized panel titles,
NFL-tab hardening, comparison verdict removal + biggest-rival default, Guide updates."""
import io

P = '/home/z/my-project/download/Football-Sim-Z-post-blue-w28.html'
html = io.open(P, encoding='utf-8').read()
n = 0

def E(tag, old, new, count=1):
    global html, n
    c = html.count(old)
    assert c == count, f'{tag}: expected {count}, found {c}'
    html = html.replace(old, new)
    n += 1

# ---------- I: game review — Team stats paints open; titles capitalized ----------
E('I_teamstats',
'  <details style="margin-top:10px;"><summary class="narr" style="cursor:pointer;">Team stats</summary>${renderTeamStatsHTML(game)}</details>',
'  <details style="margin-top:10px;" open><summary class="narr" style="cursor:pointer;">TEAM STATS</summary>${renderTeamStatsHTML(game)}</details> // w28 (Owner): Team stats paints open by default; tab titles capitalized')
E('I_kp_h4',
"return '<h4 style=\"margin:14px 0 8px;\">Key Players</h4><div class=\"kp-grid\">'+side('away', g.away)+side('home', g.home)+'</div>';",
"return '<h4 style=\"margin:14px 0 8px;\">KEY PLAYERS</h4><div class=\"kp-grid\">'+side('away', g.away)+side('home', g.home)+'</div>';")

# ---------- J: capitalized panel titles on preview + review ----------
E('J_gameplan', '<h3 style="margin-top:0;">Game plan</h3>', '<h3 style="margin-top:0;">GAME PLAN</h3>')
E('J_lineups', '<h4 style="margin-top:0;">Lineups <span class="narr" style="font-weight:400;">(${awayTeam} left · ${homeTeam} right)</span></h4>',
              '<h4 style="margin-top:0;">LINEUPS <span class="narr" style="font-weight:400;">(${awayTeam} left · ${homeTeam} right)</span></h4>')
E('J_matchup', '<h4 style="margin-top:0;">Matchup math <span class="narr" style="font-weight:400;">(how the model sees this game)</span></h4>',
               '<h4 style="margin-top:0;">MATCHUP MATH <span class="narr" style="font-weight:400;">(how the model sees this game)</span></h4>')
E('J_atl', '<summary style="cursor:pointer;font-weight:700;">Around the league — Week ${week} scores</summary>',
           '<summary style="cursor:pointer;font-weight:700;">AROUND THE LEAGUE — WEEK ${week} SCORES</summary>')

# ---------- K: VS. ACTUAL NFL TEAMS — first draft review only, forever ----------
E('K_guard',
"function renderDraftResults(){ if(typeof zpbMaybeFinishCine==='function') zpbMaybeFinishCine();\n const panel = document.getElementById('draftFinalResults');",
"function renderDraftResults(){ if(typeof zpbMaybeFinishCine==='function') zpbMaybeFinishCine();\n if(seasonState && resultsView==='nfl') resultsView = 'season'; // w28 (Owner): VS. ACTUAL NFL TEAMS lives on the first draft review only — once a season exists it is gone, even from a stale view\n const panel = document.getElementById('draftFinalResults');")

# ---------- L: Team Comparison — verdict sentence gone; opens on your biggest rival ----------
E('L_verdict',
"""  const edges = countLineupEdges(a.slotmap, b.slotmap);
  const units = unitComparisonHTML(a.pool, b.pool);
  const leader = a.score>=b.score ? a : b;
  const verdict = `${leader.label} grades ${Math.abs(a.score-b.score).toFixed(2)} points higher. ${a.label} holds the edge at ${edges.a} starting spots to ${edges.b}, and wins ${units.aUnits} of ${units.total} unit comparisons to ${units.bUnits}.`;
""",
"""  const units = unitComparisonHTML(a.pool, b.pool); // w28 (Owner): the grades/edges verdict sentence is gone — the tables speak
""")
E('L_verdict_p',
"""    <p class="detail-item" style="margin-top:10px;">${verdict}</p>
   </div>""",
"""   </div>""")
E('L_selb',
""" buildOptions(selA, 'YOU');
 buildOptions(selB, 'NFL:'+Object.keys(TEAM_DATA).sort()[0]);""",
""" buildOptions(selA, 'YOU');
 { // w28 (Owner): the comparison opens on your biggest rival — the sim roster, not the actual one
  const RIVALS = {'Buffalo Bills':'Miami Dolphins','Miami Dolphins':'Buffalo Bills','New England Patriots':'New York Jets','New York Jets':'New England Patriots','Baltimore Ravens':'Pittsburgh Steelers','Cincinnati Bengals':'Pittsburgh Steelers','Cleveland Browns':'Pittsburgh Steelers','Pittsburgh Steelers':'Baltimore Ravens','Houston Texans':'Tennessee Titans','Indianapolis Colts':'Houston Texans','Jacksonville Jaguars':'Tennessee Titans','Tennessee Titans':'Jacksonville Jaguars','Denver Broncos':'Las Vegas Raiders','Kansas City Chiefs':'Las Vegas Raiders','Las Vegas Raiders':'Kansas City Chiefs','Los Angeles Chargers':'Las Vegas Raiders','Dallas Cowboys':'Philadelphia Eagles','New York Giants':'Philadelphia Eagles','Philadelphia Eagles':'Dallas Cowboys','Washington Commanders':'Dallas Cowboys','Chicago Bears':'Green Bay Packers','Detroit Lions':'Green Bay Packers','Green Bay Packers':'Chicago Bears','Minnesota Vikings':'Green Bay Packers','Atlanta Falcons':'New Orleans Saints','Carolina Panthers':'Atlanta Falcons','New Orleans Saints':'Atlanta Falcons','Tampa Bay Buccaneers':'New Orleans Saints','Arizona Cardinals':'Seattle Seahawks','Los Angeles Rams':'San Francisco 49ers','San Francisco 49ers':'Los Angeles Rams','Seattle Seahawks':'San Francisco 49ers'};
  const _me = draftEntries.find(e=>e.isUser);
  const _rv = _me && RIVALS[_me.teamName];
  const _simRival = _rv && draftEntries.find(e=>!e.isUser && e.teamName===_rv);
  buildOptions(selB, _simRival ? 'SIM:'+_rv : 'NFL:'+Object.keys(TEAM_DATA).sort()[0]);
 }""")

# ---------- M: Guide — Mike/Will/Sam etymology; badges law documented ----------
E('M_nickel',
'  <li><b>Nickel</b> — a defense with five defensive backs instead of four; an extra defensive back comes in for a linebacker.</li>',
"""  <li><b>Mike, Will, Sam</b> — the three starting linebacker spots. The M in Mike is for middle. The W in Will is for weak side (away from the tight end). The S in Sam is for strong side (on the tight end's side).</li>
  <li><b>Nickel</b> — a defense with five defensive backs instead of four; an extra defensive back comes in for a linebacker.</li>""")
E('M_bdg_passy', "  + schip('5,000', 'PassY', 'Passing yards across the season.') // w27 (Owner): the example values",
                 "  + schip('5,000', 'PASSY', 'Passing yards across the season.') // w27 example values · w28 law: yards read PASSY / RUSHY / RECY")
E('M_bdg_rushy', "  + schip('250', 'RushY', 'Rushing yards.')",
                 "  + schip('250', 'RUSHY', 'Rushing yards.')\n  + schip('300', 'C', 'Carries \\u2014 the handoffs the back took.') // w28 (Owner): carries read C")
E('M_bdg_fr', "  + chip('FR', 'Fumble recovery \\u2014 the ball was picked up by the defense.')",
              "  + chip('FR', 'Fumble recovery \\u2014 the ball was picked up by the defense.')\n  + chip('FUM', 'Fumble \\u2014 the ball came loose; the line names who lost it.')\n  + chip('SAF', 'Safety \\u2014 two points; the play names both defenders in on the tackle.')")

io.open(P, 'w', encoding='utf-8').write(html)
print('stage-3 applied:', n, 'edits OK')
