#!/usr/bin/env python3
# w32_patch2.py — wave 32 stage 2: season story badges, review restructure, unit report card,
# awards, chips, rest-summary sequencing, champion banner, try-again modal, pick-grade table.
# Regex-based with strict anchors; every substitution asserts exactly its expected count.
import io, sys, re, hashlib

SRC = '/home/z/my-project/scripts/w32-stage1.html'
DST = '/home/z/my-project/scripts/w32-stage2.html'

s = io.open(SRC, encoding='utf-8').read()
orig_len = len(s)

def sub1(pat, repl, flags=0, n=1, tag=''):
    global s
    rx = re.compile(pat, flags)
    hits = len(rx.findall(s))
    if hits != n:
        print('FAIL [%s] pattern hits=%d expected=%d' % (tag, hits, n)); sys.exit(1)
    s = rx.sub(lambda m: repl, s, count=n)

# ---------- A14 + A13 · season-story badges: integers + the two-line game report ----------
# Exact lines are pulled from the file itself (byte-safe), then replaced whole.
def replace_line(contains, new_line, tag, n=1):
    global s
    lines = s.split('\n')
    hits = [i for i,l in enumerate(lines) if contains in l]
    if len(hits) != n:
        print('FAIL [%s] line hits=%d expected=%d' % (tag, len(hits), n)); sys.exit(1)
    for i in hits:
        lines[i] = new_line
    s = '\n'.join(lines)

replace_line("badge('BLOWOUT WIN'",
  "  big ? badge((big.home?'vs ':'@ ')+nick(big.opp).toUpperCase(), big.fs+'-'+big.os, 'zpb-sb-good zpb-sbadge-sm') : null, // w32 (Owner): the score sits over the opponent \u2014 smaller, names capitalized, no dot, no week",
  'blowout')
replace_line("badge('BEST WIN'",
  "  (marquee && (!big || marquee.week!==big.week)) ? badge('vs '+nick(marquee.opp).toUpperCase(), marquee.fs+'-'+marquee.os, 'zpb-sb-good zpb-sbadge-sm') : null, // w32 (Owner): same two-line law",
  'bestwin')
replace_line("badge('WORST LOSS'",
  "  worst ? badge((worst.home?'vs ':'@ ')+nick(worst.opp).toUpperCase(), worst.fs+'-'+worst.os, 'zpb-sb-bad zpb-sbadge-sm') : null, // w32 (Owner): same two-line law",
  'worstloss')
replace_line("badge('PAIN'",
  "  (bad && (!worst || bad.week!==worst.week) && F.st[bad.opp].wins<=7) ? badge('vs '+nick(bad.opp).toUpperCase(), F.st[bad.opp].wins+'-'+F.st[bad.opp].losses, 'zpb-sb-bad zpb-sbadge-sm') : null, // w32 (Owner): PAIN shows the victim's record the same way",
  'pain')
replace_line("badge('PPG MARGIN'",
  "  badge('PPG MARGIN', (ppgDiff>=0?'+':'\u2212')+Math.round(Math.abs(ppgDiff)), ppgDiff>=0?'zpb-sb-good':'zpb-sb-bad'), // w32 (Owner): integers",
  'ppgmargin')
replace_line("badge('WINS PREDICTED'",
  "  badge('WINS PREDICTED', String(Math.round(expW))), // w32 (Owner): integers",
  'winspred')
replace_line("badge('PTS SCORED PER GAME'",
  "  badge('PTS SCORED PER GAME', Math.round(ppg)+' \u00b7 #'+rankOf('pf', false)), // w32 (Owner): integers on the review badges",
  'ptspg')
replace_line("badge('PTS ALLOWED PER GAME'",
  "  badge('PTS ALLOWED PER GAME', Math.round(t.pa/gp)+' \u00b7 #'+rankOf('pa', true)), // w32 (Owner): integers",
  'ptsalw')

# ---------- A31 · "Regular Season Review" title panel (with SIM PLAYOFFS) sits ABOVE the badges ----------
sub1(r"html = zpbSeasonStoryHTML\(\) \+ html; // w19 \(Owner\): the season in badges IS the first panel — the dropdown is gone",
     "html = html + zpbSeasonStoryHTML(); // w32 (Owner): the Regular Season Review panel (and its SIM PLAYOFFS button) sits ABOVE the badges",
     tag='review-order')

# ---------- A38 · the awards title is already caps; verify + keep ----------

# ---------- A37 · remove "(by cumulative game impact)" from the All-Playoff Team ----------
sub1(r"<h5 class=\"narr\" style=\"margin:14px 0 4px;\">All-Playoff Team <span style=\"font-weight:400;\">\(by cumulative game impact\)</span></h5>",
     "<h5 class=\"narr\" style=\"margin:14px 0 4px;\">All-Playoff Team</h5>",
     n=2, tag='byimpact')
sub1(r"<b>Postseason MVP</b> <span class=\"narr\">\(cumulative impact\)</span>",
     "<b>Postseason MVP</b>",
     n=1, tag='mvpimpact')

# ---------- A36 + A21 · the "WHAT SEPARATED THE PLAYOFF TEAMS" panel is removed completely ----------
sub1(r" return `<details class=\"panel\" style=\"margin-bottom:14px;\"><summary style=\"cursor:pointer;font-weight:700;\">WHAT SEPARATED THE PLAYOFF TEAMS <span class=\"narr\" style=\"font-weight:400;\">\(average league rank by unit\)</span></summary>\n  <p class=\"narr\" style=\"margin:8px 0;\">Lower is better\. Green = your unit was clearly better than the playoff average; red = clearly worse\.</p>\n  <table><thead><tr><th>Unit</th><th>Playoff teams</th><th>Everyone else</th><th>\$\{F\.user\}</th></tr></thead><tbody>\$\{rows\}</tbody></table></details>`;",
     " return ''; // w32 (Owner): the WHAT SEPARATED THE PLAYOFF TEAMS panel is gone, with its green/red explainer line",
     tag='fieldtable')

# ---------- A35 · the season-review unit tiles become the UNIT REPORT CARD: letter-grade badges, no hover ----------
zpb_metrics_old = re.compile(r"window\.zpbMetricsHTML = function\(\)\{[\s\S]*? \}catch\(err\)\{ return ''; \}\n\};", re.M)
new_metrics = """window.zpbMetricsHTML = function(){
 // w32 (Owner): the unit tiles are badges now \\u2014 the UNIT REPORT CARD. No hover: every number
 // and its letter grade sit on the badge, the produced line underneath, exactly like the report card it replaces.
 try{
  const user = seasonUserTeam(), S = seasonState;
  const R = S.unitRatings[user], rk = S.unitRanks[user];
  const ORDER = ['qb','rb','rec','olRun','olPass','passRush','frontRun','coverage','kicker'];
  const mine = (typeof teamPlayerStats==='function') ? teamPlayerStats(user) : [];
  const KEYOF = {qb:['QB'],rb:['RB'],rec:['WR','TE'],olRun:['OL'],olPass:['OL'],passRush:['DL'],frontRun:['DL','LB'],coverage:['DB'],kicker:['K']};
  const pk = (typeof zpbPackFor==='function') ? zpbPackFor(user) : null;
  const uv = pk ? '--zrb:'+pk.accL+';--zr1:'+pk.r1+';' : '';
  const produced = u=>{
   const t = S.teamTotals ? null : null; // (reserved)
   try{
    const T = teamSeasonTotals(), t0 = T[user], gp = Math.max(1, t0.g||0);
    if(u==='olRun') return Math.round(t0.rush/gp)+' rush yds/gm';
    if(u==='olPass') return t0.skTaken+' sacks allowed';
    if(u==='rb'){ const rb = mine.filter(r=>r.group==='RB').sort((a,b)=>(b.st.rushYds||0)-(a.st.rushYds||0))[0]; return rb ? rb.name+': '+fmtN(rb.st.rushYds)+' rush yds, '+(rb.st.rushTD||0)+' TD' : '\\u2014'; }
    if(u==='qb') return Math.round(t0.pass/gp)+' pass yds/gm';
    if(u==='rec'){ const rc = mine.filter(r=>r.group==='WR'||r.group==='TE').sort((a,b)=>(b.st.recYds||0)-(a.st.recYds||0))[0]; return rc ? rc.name+': '+fmtN(rc.st.recYds)+' rec yds, '+(rc.st.recTD||0)+' TD' : '\\u2014'; }
    if(u==='passRush') return t0.skForced+' sacks';
    if(u==='frontRun') return Math.round(t0.rushA/gp)+' rush yds allowed/gm';
    if(u==='coverage') return Math.round(t0.passA/gp)+' pass yds allowed/gm, '+t0.take+' takeaways';
    if(u==='kicker'){ const k = mine.find(r=>r.group==='K'); return k ? k.name+': '+(k.st.fg||0)+' FG' : '\\u2014'; }
    return '';
   }catch(e){ return ''; }
  };
  const tiles = ORDER.map(u=>{
   const rank = rk[u]||32;
   const pct = ((32-rank)/31)*100;
   const lg = (typeof letterGrade==='function') ? letterGrade(pct) : '';
   const diff = Math.round((R[u]-(S.league?S.league[u]:R[u]))*1);
   const cls = rank<=8 ? ' zpb-sb-good' : (rank>=25 ? ' zpb-sb-bad' : '');
   return '<div class="zpb-met zpb-rcbadge'+cls+'" data-u="'+u+'" style="'+uv+'">'
    + '<span class="zpb-rc-grade">'+lg+'</span>'
    + '<span class="zpb-rc-body"><b>'+UNIT_INFO[u].label+'</b>'
    + '<i>'+Math.round(R[u])+' OVR \\u00b7 #'+rank+' in the league \\u00b7 '+(diff>=0?'+':'\\u2212')+Math.abs(diff)+' vs league</i>'
    + '<em>'+produced(u)+'</em></span></div>';
  }).join('');
  return '<div class="zpb-rcgrid">'+tiles+'</div>';
 }catch(err){ return ''; }
};"""
hits = len(zpb_metrics_old.findall(s))
if hits != 1:
    print('FAIL [metrics] found', hits); sys.exit(1)
s = zpb_metrics_old.sub(lambda m: new_metrics, s, count=1)
# (the metrics swap above already removed the dead hover block \u2014 the regex spans both)

# ---------- A35b · the old Unit Report Card table panel is removed from both review views ----------
sub1(r"html \+= renderRegularAwardsHTML\(seasonState\.awardsRS, true\) \+ renderReportCardHTML\(\) \+ pickCritiqueHTML\(\) \+ renderFieldTableHTML\(\) \+ renderStatsTabsHTML\(\) \+ teamAdvancedHTML\(\) \+ advancedStatsHTML\(\) \+ renderUserScheduleHTML\(\) \+ renderStandingsHTML\(\);",
     "html += renderRegularAwardsHTML(seasonState.awardsRS, true) + pickGradePanelHTML() + renderStatsTabsHTML() + teamAdvancedHTML() + advancedStatsHTML() + renderUserScheduleHTML() + renderStandingsHTML(); // w32 (Owner): the old Unit Report Card table and the pick-critique table give way to the pick-grade table; the unit badges live in the Season Review header now",
     tag='review-chain')
sub1(r"html \+= renderPlayoffAwardsHTML\(seasonState\.awardsPO\) \+ renderRegularAwardsHTML\(seasonState\.awardsRS, false\) \+ renderReportCardHTML\(\) \+ pickCritiqueHTML\(\) \+ renderFieldTableHTML\(\) \+ renderStatsTabsHTML\('po'\) \+ renderStatsTabsHTML\(\) \+ teamAdvancedHTML\(\) \+ advancedStatsHTML\(\) \+ renderBracketHTML\(\) \+ renderUserScheduleHTML\(\) \+ renderStandingsHTML\(\) \+ seasonOptionsHTML\(\);",
     "html += renderPlayoffAwardsHTML(seasonState.awardsPO) + renderRegularAwardsHTML(seasonState.awardsRS, false) + pickGradePanelHTML() + renderStatsTabsHTML('po') + renderStatsTabsHTML() + teamAdvancedHTML() + advancedStatsHTML() + renderBracketHTML() + renderUserScheduleHTML() + renderStandingsHTML() + seasonOptionsHTML(); // w32 (Owner): same swaps on the Season Review",
     tag='complete-chain')

# ---------- A20 · the draft pick analysis becomes the draft pick GRADE table (letter grades, from YOUR ROSTER) ----------
grade_fn = """
// w32 (Owner): the draft pick analysis table is replaced by the draft pick GRADE table \\u2014 the same
// letter grades YOUR ROSTER carries, one row per starting spot.
function pickGradePanelHTML(){
 if(typeof draftSim==='undefined' || !draftSim || !draftSim.log) return '';
 const me = draftSim.rosters[draftSim.userIndex]; if(!me) return '';
 const realTeams = Object.keys(TEAM_DATA);
 const zstM = (typeof zpbRowVars==='function') ? zpbRowVars(me.teamName) : '';
 let slotRows = '';
 [].concat(...DEPTH_CHART_GROUPS.map(g=>g[2])).forEach(s=>{
  const def = GROUP_DEFS.find(g=>g.key===s);
  const p = me.slots[s];
  const e = normalizeSlotEntry(p);
  const rnd = me.pickRounds ? me.pickRounds[s] : null;
  if(!def) return;
  const myVal = e ? effOvr(p, s) : 70;
  const leagueVals = realTeams.map(t=>groupAvgForTeam(t,def).avg);
  const rank = Math.min(32, leagueVals.filter(v=>v>myVal).length + 1);
  const pct = ((32-rank)/31)*100;
  const grade = letterGrade(pct);
  const nmCell = (e && e.name) ? `<span class="${e.ovr>=90?'zpb-shm':(e.ovr>=85?'zpb-vib':'')}">${e.name}</span>` : '\\u2014';
  slotRows += `<tr class="zpb-trow" style="${zstM}"><td>${LABELS[s]||s}</td><td>${nmCell}</td><td class="score">${e?e.ovr:'\\u2014'}</td><td class="narr">${rnd?('Round '+rnd):'\\u2014'}</td><td class="score">#${rank}/32</td><td class="score">${grade}</td></tr>`;
 });
 const overallPct = ((32-(function(){ const all=buildResultEntries().draftEntries.slice().sort((a,b)=>b.score-a.score); return 1+all.findIndex(e=>e.isUser); })())/31)*100;
 return `<details class="panel" style="margin-bottom:14px;" open><summary style="cursor:pointer;font-weight:700;">DRAFT PICK GRADES</summary>
  <p class="narr" style="margin:8px 0;">Overall grade ${letterGrade(Math.max(0,Math.min(100,overallPct)))} \\u2014 every starting spot, graded against all 32 real rosters.</p>
  <table><thead><tr><th>Slot</th><th>Player</th><th>OVR</th><th>Drafted</th><th>League Rank</th><th>Grade</th></tr></thead><tbody>${slotRows}</tbody></table></details>`;
}
"""
# insert before renderReportCardHTML definition
anchor = "function renderReportCardHTML(){"
if s.count(anchor) != 1:
    print('FAIL [grade-anchor]'); sys.exit(1)
s = s.replace(anchor, grade_fn + anchor, 1)

# ---------- A32 · the champion banner: no dash, fully visualized ----------
sub1(r" let html = `<div class=\"champion-banner\"><h2>\$\{champ\} — Super Bowl Champions</h2>\n  <p>\$\{won \? `\$\{user\} won it all — a championship from draft day to the final whistle\.` : `\$\{user\} did not bring home the Lombardi Trophy this year\.`\}</p></div>`;",
     """ let html = `<div class="champion-banner${won?' zpb-champ-won':''}">
   <div class="zpb-champ-kicker zpb-shm">SUPER BOWL CHAMPIONS</div>
   <div class="zpb-champ-team"><span class="zpb-champ-logo">${(typeof zpbTeamLogo==='function')?zpbTeamLogo(champ):''}</span><span class="zpb-champ-name zpb-shine">${champ.toUpperCase()}</span></div>
   <p class="zpb-champ-sub">${won ? `${user} won it all \\u2014 a championship from draft day to the final whistle.` : `${user} did not bring home the Lombardi Trophy this year.`}</p></div>`; // w32 (Owner): no dash \\u2014 the wordmark, the crest and the shine carry it""",
     tag='champbanner')

# ---------- A40 · playoff stat leaders: returners sorted by rating ----------
sub1(r" const retLead = rows\.filter\(x=>x\.gp>=8 && \(x\.st\.krN\|\|0\)\+\(x\.st\.prN\|\|0\)>=15\)\.sort\(\(a,b\)=>\(b\.st\.retYds\|\|0\)-\(a\.st\.retYds\|\|0\)\)\[0\];",
     " const retLead = rows.filter(x=>x.gp>=8 && (x.st.krN||0)+(x.st.prN||0)>=15).sort((a,b)=>(b._rating||0)-(a._rating||0))[0]; // w32 (Owner): returners sort by rating",
     tag='retsort')

io.open(DST, 'w', encoding='utf-8').write(s)
print('stage2 OK  md5', hashlib.md5(s.encode()).hexdigest(), 'bytes', len(s.encode()), '(delta %+d)' % (len(s)-orig_len))
