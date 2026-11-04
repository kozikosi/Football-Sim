#!/usr/bin/env python3
"""w68 chain step 5 — Owner items 5+6: the sim-playoffs run cine requires a CONTINUE per
round (the 3400ms auto-advance retires), and the run-ends screen retires on EVERY path —
the Super Bowl page ends every run. zpbPlayoffElimCine + its .zpb-pofin face leave the file."""
import hashlib

SRC = '/home/z/my-project/work/w68/Football-Sim-Z-post-blue-w68.html'
STEP4_MD5 = '76abc3f81c49a877d7d4982d39a98d30'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP4_MD5, 'step4 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- the gold Continue pill law gains the run-cine and victory-page pills ----
rep("""#nextWeekBtn,#nextRoundBtn,#zrepGo,#zpbRestGo,#goDraftResumeBtn,.zpb-sbfin-go,.zpb-goldcta{ /* w51 (Owner): the gold franchise pill is the CONTINUE color — every button that says Continue wears it */""",
    """#nextWeekBtn,#nextRoundBtn,#zrepGo,#zpbRestGo,#goDraftResumeBtn,.zpb-sbfin-go,.zpb-porun-go,.zpb-victory-go,.zpb-goldcta{ /* w51 (Owner): the gold franchise pill is the CONTINUE color — every button that says Continue wears it · W68 (Owner): the run-cine round gate and the victory page join */""",
    'gold pill family grows')

# ---- the run cine: the continue gate ----
rep("""  const ov = document.createElement('div'); ov.className = 'zpb-porun';
  if(pkU) ov.style.setProperty('--pk', pkU.accD);
  document.body.appendChild(ov);
  let i = 0;
  const show = ()=>{
   if(i >= story.length){
    window.__zpbPoRunHold = false;
    // w57 (Owner): the run cine FLOWS into the champion storm — the storm mounts while the run
    // overlay is still on screen (the storm is opaque from its first frame and sits one layer
    // beneath), then the run overlay fades to reveal the storm, never the page underneath.
    if(window.__zpbSBFinPending && seasonState && seasonState.champion){
     if(window.zpbPlayoffEndScreen) window.zpbPlayoffEndScreen(); // w66 (Owner): the run flows into the N8 end screen — the champion storm only for a Super Bowl participant
    }
    ov.style.opacity = '0';
    setTimeout(()=>{ try{ ov.remove(); }catch(err){} }, 560);
    return;
   }
   const st = story[i++];
   const teamInk = (pkU && pkU.txMd) ? pkU.txMd : 'var(--text)';
   const ab = t => (typeof TEAM_ABBR !== 'undefined' && TEAM_ABBR[t]) ? TEAM_ABBR[t] : t;
   const lg = t => (typeof zpbTeamLogo === 'function') ? zpbTeamLogo(t) : '';
   const big = st.win ? (ab(user) + ' WIN') : 'SEASON ENDS';
   ov.innerHTML = '<div class="zpb-porun-stage' + (st.win ? ' zpb-porun-win' : ' zpb-porun-loss') + '">'
    + '<div class="zpb-porun-kicker">' + (RL[st.rk] || String(st.rk).toUpperCase()) + '</div>'
    + '<div class="zpb-porun-big" style="color:' + (st.win ? teamInk : 'var(--sub)') + ';">' + big + '</div>'
    + '<div class="zpb-porun-score"><b>' + lg(user) + ' ' + ab(user) + '</b><b class="zpb-porun-num">' + st.fs + '</b><i>-</i><b class="zpb-porun-num">' + st.os + '</b><b>' + ab(st.opp) + ' ' + lg(st.opp) + '</b></div>' // W68 (Owner): the round card's score reads the DASH
    + '<div class="zpb-porun-sub">' + (st.win ? 'ONE STEP CLOSER' : 'THE RUN ENDS HERE') + '</div>'
    + '</div>';
   ov.classList.add('zpb-porun-in');
   ov.classList.remove('zpb-porun-swap'); void ov.offsetWidth; ov.classList.add('zpb-porun-swap');
   setTimeout(show, 3400);
  };
  show();""",
    """  const ov = document.createElement('div'); ov.className = 'zpb-porun';
  if(pkU) ov.style.setProperty('--pk', pkU.accD);
  document.body.appendChild(ov);
  let i = 0;
  const finish = ()=>{
   window.__zpbPoRunHold = false;
   // w57 (Owner): the run cine FLOWS into the champion storm — the storm mounts while the run
   // overlay is still on screen (the storm is opaque from its first frame and sits one layer
   // beneath), then the run overlay fades to reveal the storm, never the page underneath.
   if(window.__zpbSBFinPending && seasonState && seasonState.champion){
    if(window.zpbPlayoffEndScreen) window.zpbPlayoffEndScreen(); // W68 (Owner): the Super Bowl page ends EVERY run
   }
   ov.style.opacity = '0';
   setTimeout(()=>{ try{ ov.remove(); }catch(err){} }, 560);
  };
  const show = ()=>{
   if(i >= story.length){ finish(); return; }
   const st = story[i++];
   const teamInk = (pkU && pkU.txMd) ? pkU.txMd : 'var(--text)';
   const ab = t => (typeof TEAM_ABBR !== 'undefined' && TEAM_ABBR[t]) ? TEAM_ABBR[t] : t;
   const lg = t => (typeof zpbTeamLogo === 'function') ? zpbTeamLogo(t) : '';
   const big = st.win ? (ab(user) + ' WIN') : 'SEASON ENDS';
   ov.innerHTML = '<div class="zpb-porun-stage' + (st.win ? ' zpb-porun-win' : ' zpb-porun-loss') + '">'
    + '<div class="zpb-porun-kicker">' + (RL[st.rk] || String(st.rk).toUpperCase()) + '</div>'
    + '<div class="zpb-porun-big" style="color:' + (st.win ? teamInk : 'var(--sub)') + ';">' + big + '</div>'
    + '<div class="zpb-porun-score"><b>' + lg(user) + ' ' + ab(user) + '</b><b class="zpb-porun-num">' + st.fs + '</b><i>-</i><b class="zpb-porun-num">' + st.os + '</b><b>' + ab(st.opp) + ' ' + lg(st.opp) + '</b></div>' // W68 (Owner): the round card's score reads the DASH
    + '<div class="zpb-porun-sub">' + (st.win ? 'ONE STEP CLOSER' : 'THE RUN ENDS HERE') + '</div>'
    + '<button class="resetbtn zpb-porun-go" style="width:auto;margin:14px 0 0;padding:11px 30px;">Continue</button>' // W68 (Owner): every round waits for the CONTINUE
    + '</div>';
   ov.classList.add('zpb-porun-in');
   ov.classList.remove('zpb-porun-swap'); void ov.offsetWidth; ov.classList.add('zpb-porun-swap');
   const _last = i >= story.length;
   ov.querySelector('.zpb-porun-go').addEventListener('click', ()=>{ if(_last) finish(); else show(); }); // W68 (Owner): the continue gate — the 3400ms auto-advance retires
  };
  show();""",
    'run cine continue gate')

# ---- the shared end-screen decider: always the Super Bowl page ----
rep("""window.zpbPlayoffEndScreen = function(){
 try{
  const S = seasonState; if(!S || !S.champion) return;
  if(!window.__zpbSBFinPending) return;
  window.__zpbSBFinPending = false;
  const u = seasonUserTeam();
  const sb = ((S.playoffRounds && S.playoffRounds.superbowl) || [])[0] || null;
  const inSB = !!(sb && (sb.home===u || sb.away===u));
  if(inSB){ try{ zpbPostSuperBowlCine(); }catch(err){} }
  else if(typeof window.zpbPlayoffElimCine==='function'){ try{ window.zpbPlayoffElimCine(); }catch(err){} }
 }catch(err){}
};""",
    """window.zpbPlayoffEndScreen = function(){
 try{
  const S = seasonState; if(!S || !S.champion) return;
  if(!window.__zpbSBFinPending) return;
  window.__zpbSBFinPending = false;
  try{ zpbPostSuperBowlCine(); }catch(err){} // W68 (Owner): EVERY run ends at the Super Bowl page — the solemn run-ends screen retires
 }catch(err){}
};""",
    'end screen always the SB page')

# ---- the SIM REST door: the same law ----
rep("""  const inSB = (S.playoffRounds.superbowl||[]).some(g=>g && (g.home===_user||g.away===_user));
  if(window.__zpbSBFinPending && S.champion){
   window.__zpbSBFinPending = false;
   if(inSB){ try{ zpbPostSuperBowlCine(); }catch(err){} } // made the Super Bowl → the Super Bowl screen
   else if(typeof window.zpbPlayoffElimCine==='function'){ try{ window.zpbPlayoffElimCine(); }catch(err){} } // out earlier → the solemn screen
  }""",
    """  if(window.__zpbSBFinPending && S.champion){
   window.__zpbSBFinPending = false;
   try{ zpbPostSuperBowlCine(); }catch(err){} // W68 (Owner): the Super Bowl page ends the run on every path
  }""",
    'SIM REST door SB page')

# ---- zpbPlayoffElimCine leaves the file (the N5 comparison code after it stays) ----
rep("""// N8 (Owner): the run-ends cinematic — what round, to whom, the score, and everything the
// Super Bowl victory page transmits — without the celebrations and confetti.
window.zpbPlayoffElimCine = function(){
 try{
  const S = seasonState; if(!S || !S.champion || !S.sbFinal) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){ try{ if(typeof zpbStoryRelease==='function') zpbStoryRelease(); }catch(err){} return; }
  const user = seasonUserTeam();
  const RL = {wildcard:'THE WILD CARD ROUND', divisional:'THE DIVISIONAL ROUND', champ:'THE CONFERENCE CHAMPIONSHIP'};
  let loss = null, playedAny = false;
  ['wildcard','divisional','champ'].forEach(rk=>{
   (S.playoffRounds[rk]||[]).forEach(g=>{
    if(!g || !g.result || (g.home!==user && g.away!==user)) return;
    playedAny = true;
    if(loss) return;
    const hw = g.result.homeScore>g.result.awayScore;
    const won = g.home===user ? hw : !hw;
    if(!won) loss = {rk, home:g.home, away:g.away, hs:g.result.homeScore, as:g.result.awayScore, opp:(g.home===user?g.away:g.home)};
   });
  });
  const pkC = (typeof zpbPackFor==='function') ? zpbPackFor(S.champion) : null;
  const lg = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
  const mvp = S.sbFinal.mvp;
  const ov = document.createElement('div'); ov.className = 'zpb-sbfin zpb-pofin';
  ov.innerHTML = '<div class="zpb-sbfin-stage">'
   + (loss
      ? '<div class="zpb-sbfin-kicker">YOUR RUN ENDS IN ' + (RL[loss.rk]||loss.rk.toUpperCase()) + '</div>'
       + '<div class="zpb-sbfin-score"><b>' + (TEAM_ABBR[loss.home]||loss.home) + ' ' + loss.hs + '</b><i>\\u00b7</i><b>' + loss.as + ' ' + (TEAM_ABBR[loss.away]||loss.away) + '</b></div>'
       + '<div class="zpb-sbfin-line">ELIMINATED BY THE ' + String(loss.opp||'').toUpperCase() + '</div>'
      : '<div class="zpb-sbfin-kicker">THE PLAYOFFS RODE ON WITHOUT YOU</div>'
       + '<div class="zpb-sbfin-line">' + (playedAny ? '' : String(user||'').toUpperCase() + ' DID NOT MAKE THE PLAYOFFS') + '</div>')
   + '<div class="zpb-pofin-sbline">THE SUPER BOWL \\u00b7 FINAL</div>'
   + '<div class="zpb-sbfin-crests"><span>' + lg(S.sbFinal.away) + '</span><span>' + lg(S.sbFinal.home) + '</span></div>'
   + '<div class="zpb-sbfin-score"><b style="color:' + (pkC ? (pkC.txd||pkC.accD) : 'var(--accent)') + ';">' + (TEAM_ABBR[S.sbFinal.away]||S.sbFinal.away) + ' ' + S.sbFinal.as + '</b><i>\\u00b7</i><b style="color:' + (pkC ? (pkC.txd||pkC.accD) : 'var(--accent)') + ';">' + S.sbFinal.hs + ' ' + (TEAM_ABBR[S.sbFinal.home]||S.sbFinal.home) + '</b></div>'
   + '<div class="zpb-sbfin-line">SUPER BOWL CHAMPIONS \\u00b7 ' + String(S.champion).toUpperCase() + '</div>'
   + (mvp ? '<div class="zpb-sbfin-mvp">SUPER BOWL MVP \\u00b7 <b>' + mvp.name + '</b>' + (mvp.group ? ' <i>' + mvp.group + '</i>' : '') + '</div>' : '')
   + '<button class="resetbtn zpb-sbfin-go" style="width:auto;margin:0;padding:11px 30px;">Continue</button>'
   + '</div>';
  document.body.appendChild(ov);
  requestAnimationFrame(()=> ov.classList.add('zpb-sbfin-in'));
  ov.querySelector('.zpb-sbfin-go').addEventListener('click', ()=>{ ov.remove(); try{ if(typeof zpbStoryRelease==='function') zpbStoryRelease(); }catch(err){} try{ if(typeof zpbFxDrain==='function') zpbFxDrain(true); }catch(err){} });
 }catch(err){ try{ if(typeof zpbStoryRelease==='function') zpbStoryRelease(); }catch(e2){} }
};
// N5 (Owner): the comparison tab's two dropdowns join the homepage family""",
    """// W68 (Owner): the run-ends cinematic (zpbPlayoffElimCine) RETIRES — every sim-playoffs path
// ends at the Super Bowl page now, per the Owner's round-68 word.
// N5 (Owner): the comparison tab's two dropdowns join the homepage family""",
    'elim cine retires')

# ---- the .zpb-pofin face leaves the w66n style block (the N5 rules stay) ----
rep("""<style id="zpb-w66n-css">
/* N8 (Owner): the solemn run-ends screen — the Super Bowl stage's bones, the celebration stripped:
   charcoal stage, no confetti, no gold storm, crests at rest. */
.zpb-pofin{background:radial-gradient(ellipse at 50% 30%, #191519 0%, #100d11 55%, #0a090b 100%) !important;}
.zpb-pofin .zpb-sbfin-kicker{color:var(--zshim,#b9a58a);}
.zpb-pofin .zpb-sbfin-crests img{filter:grayscale(.55) drop-shadow(0 0 14px rgba(0,0,0,.6));animation:none;}
.zpb-pofin .zpb-sbfin-crests img{width:64px;height:64px;}
.zpb-pofin .zpb-sbfin-line,.zpb-pofin .zpb-sbfin-score{color:#cfc4b4;}
.zpb-pofin .zpb-pofin-sbline{letter-spacing:.42em;font-size:.66rem;color:#8f8676;margin:16px 0 2px;animation:zpbSbRise 1.5s ease both;}
.zpb-pofin .zpb-sbfin-mvp{color:#b9ac97;}
/* N5 (Owner): the comparison tab's dropdowns — the homepage family's group headers and widths */""",
    """<style id="zpb-w66n-css">
/* W68 (Owner): the run-ends screen's face (.zpb-pofin) RETIRES with its cinematic —
   the Super Bowl page ends every run. The N5 comparison rules below stay. */
/* N5 (Owner): the comparison tab's dropdowns — the homepage family's group headers and widths */""",
    'pofin face retires')

open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step5 done -> {SRC} md5 {h} bytes {len(src.encode("utf-8"))}')
