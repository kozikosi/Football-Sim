#!/usr/bin/env python3
# w32_patch3.py — wave 32 stage 3: during-game laws (TD box, @, fumble chain), streak cinematic at
# game end, end-of-season sequencing, season options on every screen, story panel at season end,
# the three-option try-again modal.
import io, sys, re, hashlib

SRC = '/home/z/my-project/scripts/w32-stage2.html'
DST = '/home/z/my-project/scripts/w32-stage3.html'
s = io.open(SRC, encoding='utf-8').read()

def sub1(pat, repl, n=1, tag=''):
    global s
    rx = re.compile(pat)
    hits = len(rx.findall(s))
    if hits != n:
        print('FAIL [%s] hits=%d expected=%d' % (tag, hits, n)); sys.exit(1)
    s = rx.sub(lambda m: repl, s, count=n)

def repl_line(contains, new_line, tag, n=1):
    global s
    lines = s.split('\n')
    hits = [i for i, l in enumerate(lines) if contains in l]
    if len(hits) != n:
        print('FAIL [%s] line hits=%d expected=%d' % (tag, len(hits), n)); sys.exit(1)
    for i in hits:
        lines[i] = new_line
    s = '\n'.join(lines)

# ---------- A44/B28 · every touchdown on the during-game screen wears the boxed [TD] ----------
# live describe (the second zpbGameReplay is the one that renders; the first is a shadowed stub)
sub1(r"    if\(isPass && inf\.recs\.length\) return nm\(inf\.qbName \|\| 'Quarterback', _me\) \+ ' to ' \+ nm\(inf\.recs\.shift\(\), _me\) \+ ' ' \+ \(window\.zpbCineYds \? zpbYds\(zpbCineYds\(e,'pass'\)\) : ''\);",
     "    if(isPass && inf.recs.length) return nm(inf.qbName || 'Quarterback', _me) + ' to ' + nm(inf.recs.shift(), _me) + ' ' + zpbChip('TD', _me) + (window.zpbCineYds ? ' ' + zpbYds(zpbCineYds(e,'pass')) : ''); // w32 (Owner): every TD wears the box",
     n=1, tag='td-pass')
sub1(r"    if\(inf\.rush\.length\) return nm\(inf\.rush\.shift\(\), _me\) \+ ' rush ' \+ \(window\.zpbCineYds \? zpbYds\(zpbCineYds\(e,'run'\)\) : ''\); // w19 \(Owner\): RUSH, yardage box beside it",
     "    if(inf.rush.length) return nm(inf.rush.shift(), _me) + ' rush ' + zpbChip('TD', _me) + (window.zpbCineYds ? ' ' + zpbYds(zpbCineYds(e,'run')) : ''); // w19 (Owner): RUSH, yardage box beside it · w32 (Owner): the TD box",
     n=1, tag='td-rush')

# ---------- A42/B26 · fumble chains: x [FF] y [FR][TD] / z [FUM] x [FF][FR][TD] ----------
sub1(r"    const d = \(inf\.dtq \|\| \[\]\)\.shift\(\); // w30 \(Owner\): a defensive score reads X \[INT\]\[TD\] Y or X \[FF\]\[TD\] Y — the scorer, the boxes, the man who lost the ball\n    if\(d\) return nm\(d\.name, _me\) \+ ' ' \+ zpbChip\(d\.kind==='INT' \? 'INT' : 'FF', _me\) \+ zpbChip\('TD', _me\) \+ \(d\.from \? ' ' \+ nm\(d\.from, _op\) : ''\);\n    return 'Touchdown';",
     """    const d = (inf.dtq || []).shift(); // w30 (Owner): a defensive score names the whole play
    if(d){
     if(d.kind!=='FUM') return nm(d.name, _me) + ' ' + zpbChip('INT', _me) + zpbChip('TD', _me) + (d.from ? ' ' + nm(d.from, _op) : '');
     // w32 (Owner): a fumble score is the whole chain — x [FF] y [FR][TD]; when the man who forced
     // it also recovered and scored, the line reads z [FUM] x [FF][FR][TD].
     if(d.sameMan) return nm(d.from, _op) + ' ' + zpbChip('FUM', _me) + nm(d.name, _me) + ' ' + zpbChip('FF', _me) + zpbChip('FR', _me) + zpbChip('TD', _me);
     return nm(d.forcer || d.name, _me) + ' ' + zpbChip('FF', _me) + nm(d.name, _me) + ' ' + zpbChip('FR', _me) + zpbChip('TD', _me);
    }
    return 'Touchdown';""",
     n=1, tag='fumchain')
# the dtq extraction passes the new fields through
sub1(r"\.map\(d=>\(\{name:d\.name, kind:d\.type, from:d\.from\}\)\); // w30 \(Owner\): the return TD names the man who lost the ball",
     ".map(d=>({name:d.name, kind:d.type, from:d.from, forcer:d.forcer||null, sameMan:!!d.sameMan})); // w30 (Owner): the return TD names the man who lost the ball · w32 (Owner): the fumble chain rides along",
     n=1, tag='dtqmap')
# the engine records the forcer and the same-man flag
sub1(r"  defScores\.push\(\{type:tk\.type, name:nm, q:tk\.q, from:tk\.from\}\);",
     "  defScores.push({type:tk.type, name:nm, q:tk.q, from:tk.from, forcer:(tk.type==='FUM'?tk.name:null), sameMan:(tk.type==='FUM' && !!tk.recoveredBy && tk.recoveredBy===tk.name)}); // w32 (Owner): the full fumble chain",
     n=1, tag='defscore')

# ---------- A45/B29 · during the game, "AT" is "@" ----------
sub1(r"\+ '<div class=\"zpb-intro-sub\">' \+ \(isSB \? 'the everything game' : abbr\(g\.away\) \+ ' at ' \+ abbr\(g\.home\)\) \+ '</div>'",
     "+ '<div class=\"zpb-intro-sub\">' + (isSB ? 'the everything game' : abbr(g.away) + ' @ ' + abbr(g.home)) + '</div>' // w32 (Owner): during the game, AT is @",
     n=1, tag='intro-sub')

# ---------- A1 · the win-streak cinematic fires ONLY at the end of the game that achieves it ----------
sub1(r"  let streak = 0; for\(let i=mine\.length-1;i>=0;i--\)\{ if\(won\(mine\[i\]\)\) streak\+\+; else break; \}\n  const w = mine\.filter\(won\)\.length, l = mine\.filter\(lost\)\.length;\n  if\(streak>=3 && streak<=17 && \[3,5,7,10,13,17\]\.includes\(streak\) && done\('streak'\+streak\)\) FX\.play\(streak>=7\?'medium':'small', streak===17\?'Perfect season: 17-0!':`\$\{streak\} wins in a row!`\);\n  else if\(\[5,10,13\]\.includes\(w\) && done\('wins'\+w\)\) FX\.play\('small', `\$\{w\} wins on the season`\);",
     """  const w = mine.filter(won).length, l = mine.filter(lost).length;
  // w32 (Owner): the win-streak cinematic moved to the END of the game that achieves it \u2014
  // zpbStreakReward() fires from the replay's final whistle, never before the next game.
  if([5,10,13].includes(w) && done('wins'+w)) FX.play('small', `${w} wins on the season`);""",
     n=1, tag='streak-move')
# the reward hook, defined once in the same script scope
sub1(r"function checkRewards\(\)\{",
     """window.zpbStreakReward = function(){
 try{
  const S = seasonState; if(!S || !S.teams || (S.phase!=='regular' && S.phase!=='regularReview')) return;
  const user = seasonUserTeam(); if(!user) return;
  S.rewards = S.rewards || {}; const done = k=>{ if(S.rewards[k]) return false; S.rewards[k] = true; return true; };
  const won = g=> g.result && (g.home===user ? g.result.homeScore>g.result.awayScore : g.result.awayScore>g.result.homeScore);
  const mine = S.schedule.filter(g=>g.played && g.result && (g.home===user||g.away===user)); if(!mine.length) return;
  let streak = 0; for(let i=mine.length-1;i>=0;i--){ if(won(mine[i])) streak++; else break; }
  if(streak>=3 && streak<=17 && [3,5,7,10,13,17].includes(streak) && done('streak'+streak)) FX.play(streak>=7?'medium':'small', streak===17?'Perfect season: 17-0!':`${streak} wins in a row!`);
 }catch(e){}
};
function checkRewards(){""",
     n=1, tag='streak-fn')
# fire it from the replay's finish \u2014 both the natural end and a skip land in finish()
sub1(r"   fin\.innerHTML = scoreLine \+ resLine;\n   log\.appendChild\(fin\);\n   log\.scrollTop = log\.scrollHeight;\n   prog\.style\.width = '100%';\n   box\.classList\.add\('done'\);\n   if\(skip\) skip\.style\.display = 'none';\n   if\(go\) go\.style\.display = '';\n  \};",
     """   fin.innerHTML = scoreLine + resLine;
   log.appendChild(fin);
   log.scrollTop = log.scrollHeight;
   prog.style.width = '100%';
   box.classList.add('done');
   if(skip) skip.style.display = 'none';
   if(go) go.style.display = '';
   // w32 (Owner): the streak cinematic belongs to the final whistle \u2014 it plays here, once,
   // only when this game just completed the streak, never on the way into the next one.
   if(focusTeam && typeof zpbStreakReward==='function'){ setTimeout(()=>{ try{ zpbStreakReward(); }catch(err){} }, 1300); }
  };""",
     n=1, tag='finish-hook')

# ---------- B31 · the rest summary never flashes: the honors-first class is set before the paint ----------
sub1(r"  document\.body\.appendChild\(ov\);\n  if\(honors\.length\)\{\n    ov\.classList\.add\('zpb-rest-honorsfirst'\);\n    setTimeout\(\(\)=> ov\.classList\.add\('zpb-rest-ready'\), Math\.min\(honors\.length\*900 \+ 1600, 20000\)\);\n  \} else ov\.classList\.add\('zpb-rest-ready'\);",
     """  if(honors.length) ov.classList.add('zpb-rest-honorsfirst'); // w32 (Owner): set BEFORE the paint \u2014 the box can never flash on and off
  document.body.appendChild(ov);
  if(honors.length){
    setTimeout(()=> ov.classList.add('zpb-rest-ready'), Math.min(honors.length*900 + 1600, 20000));
  } else ov.classList.add('zpb-rest-ready');""",
     n=1, tag='restflash')

# ---------- A19 · the season-in-badges panel plays automatically when the season ends ----------
sub1(r" html \+= renderGameResultHTML\(sb, \(sb\.home===user\|\|sb\.aw===user\) \? user : null\);",
     "html += renderGameResultHTML(sb, (sb.home===user||sb.away===user) ? user : null);",  # normalize guard (no-op if byte-identical)
     n=0, tag='sb-guard-skip') if False else None
sub1(r"\n if\(!seasonState\.showReview\)\{\n  html \+= renderBracketHTML\(\)",
     "\n html += zpbSeasonStoryHTML(); // w32 (Owner): the end-of-season badges play one by one the moment the season ends\n if(!seasonState.showReview){\n  html += renderBracketHTML()",
     n=1, tag='story-at-end')
sub1(r"container\.innerHTML = html; wireScheduleClicks\(container\); wireStatsTabs\(\);\n  document\.getElementById\('seasonReviewBtn'\)",
     "container.innerHTML = html; try{ zpbWireStory(); }catch(e){} wireScheduleClicks(container); wireStatsTabs();\n  document.getElementById('seasonReviewBtn')",
     n=1, tag='story-wire1')
sub1(r"\{ const b = document\.getElementById\('backToSbBtn'\); if\(b\) b\.addEventListener\('click', \(\)=>\{ seasonState\.showReview = false; renderSeasonTab\(container\); window\.scrollTo\(0,0\); \}\); \}\n wireScheduleClicks\(container\); wireStatsTabs\(\); wireSeasonOptions\(container\);",
     "{ const b = document.getElementById('backToSbBtn'); if(b) b.addEventListener('click', ()=>{ seasonState.showReview = false; renderSeasonTab(container); window.scrollTo(0,0); }); }\n try{ zpbWireStory(); }catch(e){} // w32 (Owner): the badge stagger runs on the Season Review too\n wireScheduleClicks(container); wireStatsTabs(); wireSeasonOptions(container);",
     n=1, tag='story-wire2')

# ---------- A41 · TRY AGAIN TO GO 20-0? -> the three-option modal ----------
sub1(r"document\.addEventListener\('click', function\(e\)\{\n if\(e\.target && e\.target\.id === 'zpbTryAgainBtn'\)\{\n  confirmDialog\('This discards your drafted roster and any season in progress and takes you back to the draft setup\.', 'Yes, run it back', startNewDraftFlow\);\n \}\n\}\);",
     """document.addEventListener('click', function(e){
 if(e.target && e.target.id === 'zpbTryAgainBtn'){
  // w32 (Owner): three doors \u2014 run it back with the same team, call an audible with a new one, or cancel.
  const ov = document.createElement('div'); ov.className = 'confirm-ov';
  ov.innerHTML = '<div class="confirm-box zpb-again-box">'
   + '<p style="margin-top:0;"><b>Try again to go <span class="zpb-shine">20-0</span>?</b></p>'
   + '<button class="resetbtn zpb-again-btn" data-again="run" style="width:auto;margin:8px 0 0;padding:11px 22px;">RUN IT BACK <span class="zpb-again-dot">&middot;</span> SAME TEAM</button>'
   + '<button class="tabbtn zpb-again-btn" data-again="new" style="width:auto;margin:8px 0 0;padding:11px 22px;">CALL AN AUDIBLE <span class="zpb-again-dot">&middot;</span> NEW TEAM</button>'
   + '<button class="tabbtn zpb-again-btn" data-again="cancel" style="width:auto;margin:8px 0 0;padding:9px 22px;">CANCEL</button>'
   + '</div>';
  document.body.appendChild(ov);
  ov.addEventListener('click', ev=>{
   const b = ev.target.closest('[data-again]');
   if(!b && ev.target!==ov) return;
   ov.remove();
   if(!b || b.dataset.again==='cancel') return;
   if(b.dataset.again==='run'){ try{ startSeason(); renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody')); }catch(err){} }
   if(b.dataset.again==='new'){ try{ startNewDraftFlow(); }catch(err){} }
  });
 }
});""",
     n=1, tag='again-modal')

# ---------- A28 · season options at the bottom of every season screen ----------
sub1(r" html \+= renderRegularAwardsHTML\(seasonState\.awardsRS, true\) \+ pickGradePanelHTML\(\) \+ renderStatsTabsHTML\(\) \+ teamAdvancedHTML\(\) \+ advancedStatsHTML\(\) \+ renderUserScheduleHTML\(\) \+ renderStandingsHTML\(\);",
     " html += renderRegularAwardsHTML(seasonState.awardsRS, true) + pickGradePanelHTML() + renderStatsTabsHTML() + teamAdvancedHTML() + advancedStatsHTML() + renderUserScheduleHTML() + renderStandingsHTML() + seasonOptionsHTML(); // w32 (Owner): the season options ride at the bottom of the review too",
     n=1, tag='opts-review')
sub1(r"container\.innerHTML = html;\n try\{ zpbWireStory\(\); \}catch\(e\)\{\}\n wireScheduleClicks\(container\); wireStatsTabs\(\);\n \{ const bp = document\.getElementById\('beginPlayoffsBtn'\);",
     "container.innerHTML = html;\n try{ zpbWireStory(); }catch(e){}\n wireScheduleClicks(container); wireStatsTabs(); wireSeasonOptions(container);\n { const bp = document.getElementById('beginPlayoffsBtn');",
     n=1, tag='wire-review-opts')
# (the regular-season chain already carries seasonOptionsHTML — verified present)
# YOUR ROSTER tab gets the options + wiring
sub1(r"   <h3 style=\"margin-top:0;\">Overall Grade <span style=\"color:var\(--accent\);\">\$\{letterGrade\(overallPct\)\}</span></h3>\n   <table><thead><tr><th>Slot</th><th>Player</th><th>Effective OVR</th><th>Drafted</th><th>League Rank</th><th>Grade</th></tr></thead><tbody>\$\{slotRows\}</tbody></table>\n  </div>\n `;",
     """   <h3 style="margin-top:0;">Overall Grade <span style="color:var(--accent);">${letterGrade(overallPct)}</span></h3>
   <table><thead><tr><th>Slot</th><th>Player</th><th>Effective OVR</th><th>Drafted</th><th>League Rank</th><th>Grade</th></tr></thead><tbody>${slotRows}</tbody></table>
  </div>
  ${seasonOptionsHTML()}
 `;""",
     n=1, tag='opts-roster')
sub1(r"  host\.innerHTML = lineupEditorHTML\(roster, 'lineupEd'\);\n  wireLineupEditor\(roster, 'lineupEd', \(\)=>\{ if\(seasonState\) refreshUserAfterLineup\(\); renderDraftResults\(\); \}\);\n \}\n\}",
     """  host.innerHTML = lineupEditorHTML(roster, 'lineupEd');
  wireLineupEditor(roster, 'lineupEd', ()=>{ if(seasonState) refreshUserAfterLineup(); renderDraftResults(); });
 }
 wireSeasonOptions(container); // w32 (Owner): the same two doors close every screen during the season
}""",
     n=1, tag='wire-roster-opts')
# TEAM COMPARISON tab gets the options + wiring
sub1(r"""    <h4 style="margin-top:0;">Unit Comparison</h4>
    \$\{units\.html\}
   </div>
  `;
 }""",
     """    <h4 style="margin-top:0;">Unit Comparison</h4>
    ${units.html}
   </div>
   ${seasonOptionsHTML()}
  `;
 }""",
     n=1, tag='opts-compare')
sub1(r" selA\.addEventListener\('change', renderCompare\);\n selB\.addEventListener\('change', renderCompare\);\n renderCompare\(\);\n\}",
     " selA.addEventListener('change', renderCompare);\n selB.addEventListener('change', renderCompare);\n renderCompare();\n wireSeasonOptions(container); // w32 (Owner): new season / new draft stay reachable here too\n}",
     n=1, tag='wire-compare-opts')

io.open(DST, 'w', encoding='utf-8').write(s)
print('stage3 OK  md5', hashlib.md5(s.encode()).hexdigest(), 'bytes', len(s.encode()))
