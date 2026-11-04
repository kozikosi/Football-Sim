#!/usr/bin/env python3
"""w66 chain step 15 — N8: hitting SIM PLAYOFFS runs the whole rest of the bracket quietly
(no during-the-game cinematic panel, ever), then mounts exactly one end screen: the Super
Bowl screen when the user's team made it, a solemn run-ends cinematic (round, opponent,
score, the Super Bowl result — no confetti, no celebration) when it didn't. Also lands the
N5 comparison-dropdown enhancer payload."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP14_MD5 = '06ecd4873ba2808536897bd70dafbb9c'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP14_MD5, 'step-14 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- N8a · the confirm's YES runs the shared loop ----
rep("""   var yes = b2 && b2.dataset.po==='yes';
   ov.remove();
   if(!yes) return;
   var real = document.getElementById('simRestBtn');
   if(real){ window.__zpbPoSimConfirmed = true; real.click(); }
   else{
    try{
     var order = ['wildcard','divisional','champ','superbowl'];
     for(var i=order.indexOf(S.currentPlayoffRound); i<4; i++){
      if(!S.playoffRoundSimulated) simulatePlayoffRound();
      if(order[i]!=='superbowl') advancePlayoffRound();
     }
    }catch(err){}
    renderSeasonTab(document.getElementById('draftResultsBody') || document.body);
   }
  });""",
    """   var yes = b2 && b2.dataset.po==='yes';
   ov.remove();
   if(!yes) return;
   if(window.zpbSimRestOfPlayoffs){ window.zpbSimRestOfPlayoffs(); } // w66 (Owner): one loop, one end screen — no during-the-game panel, ever
   else{
    try{
     var order = ['wildcard','divisional','champ','superbowl'];
     for(var i=order.indexOf(S.currentPlayoffRound); i<4; i++){
      if(!S.playoffRoundSimulated) simulatePlayoffRound();
      if(order[i]!=='superbowl') advancePlayoffRound();
     }
    }catch(err){}
    renderSeasonTab(document.getElementById('draftResultsBody') || document.body);
   }
  });""",
    'confirm yes shared loop', 1)

# ---- N8b · the shared loop + the solemn end screen + the N5 enhancer ----
CLOSE = '\n</body>\n</html>'
PAYLOAD = '''
<style id="zpb-w66n-css">
/* N8 (Owner): the solemn run-ends screen — the Super Bowl stage's bones, the celebration stripped:
   charcoal stage, no confetti, no gold storm, crests at rest. */
.zpb-pofin{background:radial-gradient(ellipse at 50% 30%, #191519 0%, #100d11 55%, #0a090b 100%) !important;}
.zpb-pofin .zpb-sbfin-kicker{color:var(--zshim,#b9a58a);}
.zpb-pofin .zpb-sbfin-crests img{filter:grayscale(.55) drop-shadow(0 0 14px rgba(0,0,0,.6));animation:none;}
.zpb-pofin .zpb-sbfin-crests img{width:64px;height:64px;}
.zpb-pofin .zpb-sbfin-line,.zpb-pofin .zpb-sbfin-score{color:#cfc4b4;}
.zpb-pofin .zpb-pofin-sbline{letter-spacing:.42em;font-size:.66rem;color:#8f8676;margin:16px 0 2px;animation:zpbSbRise 1.5s ease both;}
.zpb-pofin .zpb-sbfin-mvp{color:#b9ac97;}
/* N5 (Owner): the comparison tab's dropdowns — the homepage family's group headers and widths */
.zpb-selgrp{font-size:.58rem;letter-spacing:.16em;font-weight:800;color:var(--sub);padding:6px 10px 4px;font-family:'Cinzel','Bodoni Moda',Georgia,serif;text-align:left;}
.zpb-cmp-own .zpb-selwrap{display:inline-flex;max-width:100%;}
.zpb-cmp-own .zpb-selbtn{min-width:min(340px,100%);max-width:100%;}
.zpb-cmp-own .zpb-selbtn .zpb-face{overflow:hidden;text-overflow:ellipsis;}
.zpb-cmp-own .zpb-selpop{min-width:min(360px,92vw);max-height:320px;}
</style>
<script id="zpb-w66n-js">
// ============ Z-POST-BLUE W66 · OWNER ROUND 2 · THE PLAYOFF DOOR ============
// N8 (Owner): SIM PLAYOFFS = the whole rest of the bracket, quiet, then ONE end screen.
window.zpbSimRestOfPlayoffs = function(){
 try{
  const S = seasonState; if(!S || S.phase!=='playoffs') return;
  const _user = seasonUserTeam();
  window.__zpbQuietSim = true; window.__zpbSimRestRun = true; // the during-the-game cinematic can never fire from this door
  try{
   const order = ['wildcard','divisional','champ','superbowl'];
   for(let i=order.indexOf(S.currentPlayoffRound); i<4; i++){
    if(!S.playoffRoundSimulated) simulatePlayoffRound();
    if(order[i]!=='superbowl') advancePlayoffRound();
   }
  }catch(err){}
  window.__zpbQuietSim = false;
  renderSeasonTab(document.getElementById('draftResultsBody') || document.body);
  const inSB = (S.playoffRounds.superbowl||[]).some(g=>g && (g.home===_user||g.away===_user));
  if(window.__zpbSBFinPending && S.champion){
   window.__zpbSBFinPending = false;
   if(inSB){ try{ zpbPostSuperBowlCine(); }catch(err){} } // made the Super Bowl → the Super Bowl screen
   else if(typeof window.zpbPlayoffElimCine==='function'){ try{ window.zpbPlayoffElimCine(); }catch(err){} } // out earlier → the solemn screen
  }
  window.__zpbSimRestRun = false;
 }catch(err){ window.__zpbQuietSim = false; window.__zpbSimRestRun = false; }
};
// N8 (Owner): the run-ends cinematic — what round, to whom, the score, and everything the
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
// N5 (Owner): the comparison tab's two dropdowns join the homepage family — optgroups read
// as headers, every option wears its team's 0.5 ink, the closed box rides the halfway ink.
window.zpbEnhanceCmpSel = function(sel, resolve){
 if(!sel || sel.dataset.zpbCmpSel) return;
 sel.dataset.zpbCmpSel = '1';
 const host = sel.parentElement; if(!host) return;
 const wrap = document.createElement('span'); wrap.className = 'zpb-selwrap zpb-cmpwrap';
 host.insertBefore(wrap, sel); wrap.appendChild(sel);
 sel.classList.add('zpb-sel-native');
 const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'zpb-selbtn'; btn.setAttribute('aria-haspopup', 'listbox');
 const pop = document.createElement('span'); pop.className = 'zpb-selpop'; pop.setAttribute('role', 'listbox');
 wrap.appendChild(btn); wrap.appendChild(pop);
 const packOf = v=>{ try{ const e = resolve ? resolve(v) : null; const t = e ? e.teamName : (v||''); return (typeof zpbPackFor==='function' && t) ? zpbPackFor(t) : null; }catch(err){ return null; } };
 const label = ()=>{
  const o = sel.options[sel.selectedIndex];
  const face = o ? o.textContent : '';
  const st = packOf(sel.value);
  const vars = st ? '--zaL:'+(st.txM||st.txd)+';--zaD:'+st.txd+';' : '';
  btn.innerHTML = '<span class="zpb-face" style="'+vars+'">'+face+'</span>';
 };
 const build = ()=>{
  const optVars = st=> st ? '--zaL:'+(st.txM||st.txd)+';--zaD:'+st.txd+';--zw:color-mix(in srgb,'+st.accL+' 13%, transparent)' : '--zw:rgba(120,120,120,.12)';
  let h = '';
  Array.prototype.forEach.call(sel.children, ch=>{
   if(ch.tagName==='OPTGROUP'){
    h += '<div class="zpb-selgrp">'+ch.label+'</div>';
    Array.prototype.forEach.call(ch.children, o2=>{
     if(o2.tagName==='OPTION') h += '<button type="button" class="zpb-selopt" data-v="'+o2.value+'" style="'+optVars(packOf(o2.value))+'"><span>'+o2.textContent+'</span></button>';
    });
   }
   else if(ch.tagName==='OPTION') h += '<button type="button" class="zpb-selopt" data-v="'+ch.value+'" style="'+optVars(packOf(ch.value))+'"><span>'+ch.textContent+'</span></button>';
  });
  pop.innerHTML = h;
 };
 const close = ()=> wrap.classList.remove('open');
 btn.addEventListener('click', e=>{
  e.stopPropagation();
  const was = wrap.classList.contains('open');
  document.querySelectorAll('.zpb-selwrap.open').forEach(w=>w.classList.remove('open'));
  if(!was){ build(); wrap.classList.add('open'); }
 });
 pop.addEventListener('click', e=>{
  const o = e.target.closest('.zpb-selopt'); if(!o) return;
  sel.value = o.dataset.v;
  sel.dispatchEvent(new Event('change', {bubbles:true}));
  label(); close();
 });
 sel.addEventListener('change', label);
 document.addEventListener('click', e=>{ if(!wrap.contains(e.target)) close(); });
 new MutationObserver(label).observe(sel, {childList:true, characterData:true, subtree:true});
 setTimeout(label, 0);
};
</script>
</body>
</html>'''
rep(CLOSE, PAYLOAD, 'round-2 playoff payload', 1)

# ---- N8c · the complete-view wrapper holds the storm while the shared loop decides ----
rep("""    if(window.__zpbSBReplayHold) return out; // w52 (Owner, M12): the Super Bowl's during-game cinematic is ON the screen — the storm holds for the whistle
    window.__zpbSBFinPending = false;""",
    """    if(window.__zpbSBReplayHold) return out; // w52 (Owner, M12): the Super Bowl's during-game cinematic is ON the screen — the storm holds for the whistle
    if(window.__zpbSimRestRun) return out; // w66 (Owner): a sim-playoffs run decides its own end screen — the shared loop mounts the Super Bowl screen or the solemn run-ends screen
    window.__zpbSBFinPending = false;""",
    'complete view guard', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 15 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
