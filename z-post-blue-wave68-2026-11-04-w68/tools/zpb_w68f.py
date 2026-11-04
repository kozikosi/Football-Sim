#!/usr/bin/env python3
"""w68 chain step 6 — Owner item 7: the user-wins-the-Super-Bowl page.
zpbSuperBowlVictoryCine — the second act after the SB page's Continue when the champion is
the user's team: charcoal-gold stage, twin god-ray wheels, team-gold confetti, rising embers,
a breathing glow, the crest through three burst rings, the huge shimmering wordmark, the
dash-law score, the MVP line, the gold Continue — all on the Owner's 0.6s reveal cadence.
Its Continue plays the standing SUPER BOWL CHAMPIONS reward and releases the season."""
import hashlib

SRC = '/home/z/my-project/work/w68/Football-Sim-Z-post-blue-w68.html'
STEP5_MD5 = '96483911920a09794fb8f954346a653e'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP5_MD5, 'step5 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- the SB page's Continue hands the user's title to the victory page ----
rep("""  const go = ()=>{ ov.remove(); window.__zpbSBFinPending = false; try{ if(typeof zpbStoryRelease==='function') zpbStoryRelease(); }catch(err){}
   try{ if(window.__zpbSBRewardOwed){ window.__zpbSBRewardOwed = false; FX.play('sb'); setTimeout(()=>{ const b = document.querySelector('.champion-banner'); if(b) b.classList.add('fxwon'); }, 60); } }catch(err){}
   try{ if(typeof zpbFxDrain==='function') zpbFxDrain(true); }catch(err){} }; // w38 (R14, Owner): Continue moves on from the Super Bowl — then the badges fade in and the champions play""",
    """  const go = ()=>{ // W68 (Owner): the user's title earns the victory page — it mounts BEFORE the SB overlay fades (opaque from the first painted frame, the w43 law), then the storm releases
   let _won = false; try{ _won = S.champion === seasonUserTeam(); }catch(err){}
   if(_won && typeof window.zpbSuperBowlVictoryCine==='function'){ try{ window.zpbSuperBowlVictoryCine(); }catch(err){} }
   ov.remove(); window.__zpbSBFinPending = false;
   if(_won && document.querySelector('.zpb-victory')) return; // the victory page plays its own Continue — the reward rides there
   try{ if(typeof zpbStoryRelease==='function') zpbStoryRelease(); }catch(err){}
   try{ if(window.__zpbSBRewardOwed){ window.__zpbSBRewardOwed = false; FX.play('sb'); setTimeout(()=>{ const b = document.querySelector('.champion-banner'); if(b) b.classList.add('fxwon'); }, 60); } }catch(err){}
   try{ if(typeof zpbFxDrain==='function') zpbFxDrain(true); }catch(err){} }; // w38 (R14, Owner): Continue moves on from the Super Bowl — then the badges fade in and the champions play""",
    'SB Continue wires the victory page')

# ---- the victory page: CSS + JS, planted after the w68 style block ----
NEW = '''</style>
<style id="zpb-w68v-css">
/* UI 7 (Owner): the user-wins-the-Super-Bowl page — the second act after the SB page's
   Continue. Opaque from the first painted frame; charcoal-gold; no white text (the cream
   gold family the Super Bowl stage already wears); Cinzel Decorative; the shimmer is the
   celebration; the 0.6s reveal cadence the Owner chose in w67; slow soft motion. */
.zpb-victory{position:fixed;inset:0;z-index:126;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at 50% 30%,#31230e 0%,#1c1307 52%,#0d0903 100%);overflow:hidden;opacity:0;transition:opacity .6s ease;}
.zpb-victory.zpb-victory-in{opacity:1;}
.zpb-victory-flash{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 38%,rgba(255,220,130,.92),rgba(255,220,130,0) 62%);opacity:0;pointer-events:none;}
.zpb-victory.zpb-victory-in .zpb-victory-flash{animation:zpbVicFlash 1.5s ease both;}
@keyframes zpbVicFlash{0%{opacity:.95;}100%{opacity:0;}}
.zpb-victory-rays,.zpb-victory-rays2{position:absolute;left:50%;top:42%;width:220vmax;height:220vmax;transform:translate(-50%,-50%);pointer-events:none;background:repeating-conic-gradient(from 0deg,rgba(217,169,76,.10) 0deg 7deg,transparent 7deg 18deg);-webkit-mask-image:radial-gradient(circle at 50% 50%,#000 0%,transparent 60%);mask-image:radial-gradient(circle at 50% 50%,#000 0%,transparent 60%);}
.zpb-victory.zpb-victory-in .zpb-victory-rays{opacity:.5;animation:zpbVicSpin 68s linear infinite;}
.zpb-victory-rays2{background:repeating-conic-gradient(from 180deg,rgba(217,169,76,.08) 0deg 11deg,transparent 11deg 26deg);}
.zpb-victory.zpb-victory-in .zpb-victory-rays2{opacity:.42;animation:zpbVicSpinR 92s linear infinite;}
@keyframes zpbVicSpin{to{transform:translate(-50%,-50%) rotate(360deg);}}
@keyframes zpbVicSpinR{to{transform:translate(-50%,-50%) rotate(-360deg);}}
.zpb-victory-glow{position:absolute;left:50%;top:40%;width:130vmax;height:130vmax;transform:translate(-50%,-50%);pointer-events:none;background:radial-gradient(circle,color-mix(in srgb,var(--vg,#d9a94c) 16%,transparent) 0%,transparent 58%);}
.zpb-victory.zpb-victory-in .zpb-victory-glow{animation:zpbVicBreathe 7.5s ease-in-out infinite alternate;}
@keyframes zpbVicBreathe{from{opacity:.5;}to{opacity:1;}}
.zpb-victory-conf{position:absolute;inset:0;pointer-events:none;}
.zpb-victory-conf i{position:absolute;top:-5vh;width:8px;height:14px;opacity:.85;animation:zpbVicFall 5.6s linear infinite;}
@keyframes zpbVicFall{0%{transform:translateY(-6vh) rotate(0deg);}100%{transform:translateY(108vh) rotate(560deg);}}
.zpb-victory-embers{position:absolute;inset:0;pointer-events:none;}
.zpb-victory-embers i{position:absolute;bottom:-3vh;width:6px;height:6px;border-radius:50%;background:var(--vg,#d9a94c);filter:blur(1px);opacity:0;animation:zpbVicRise 7.5s linear infinite;}
@keyframes zpbVicRise{0%{transform:translateY(0) translateX(0);opacity:0;}12%{opacity:.8;}100%{transform:translateY(-108vh) translateX(6vw);opacity:0;}}
.zpb-victory-stage{position:relative;text-align:center;padding:26px;max-width:min(92vw,760px);}
.zpb-victory.zpb-victory-in .zpb-victory-stage{animation:zpbVicStage 14s ease-in-out infinite alternate;}
@keyframes zpbVicStage{from{transform:scale(1);}to{transform:scale(1.035);}}
.zpb-victory-kicker{font-family:'Cinzel Decorative',serif;letter-spacing:.42em;font-size:.9rem;color:#f3d78a;animation:zpbSbRise 1.1s ease both;animation-delay:.25s;}
.zpb-victory-orb{position:relative;width:150px;height:150px;margin:18px auto 8px;display:flex;align-items:center;justify-content:center;animation:zpbVicOrb 1.5s cubic-bezier(.2,.8,.25,1) both;animation-delay:.85s;}
@keyframes zpbVicOrb{from{opacity:0;transform:translateY(34px) scale(.55);}to{opacity:1;transform:none;}}
.zpb-victory-orb img{width:104px;height:104px;object-fit:contain;filter:drop-shadow(0 0 34px color-mix(in srgb,var(--vg,#d9a94c) 68%,transparent));animation:zpbSbZoom 5s ease-in-out infinite alternate;}
.zpb-victory-ring{position:absolute;inset:0;border-radius:50%;border:2px solid color-mix(in srgb,var(--vg,#d9a94c) 65%,transparent);opacity:0;animation:zpbVicRing 2.4s ease-out infinite;}
.zpb-victory-ring.r2{animation-delay:.65s;}
.zpb-victory-ring.r3{animation-delay:1.3s;}
@keyframes zpbVicRing{0%{opacity:.9;transform:scale(.42);}100%{opacity:0;transform:scale(1.65);}}
.zpb-victory-trophy{position:absolute;right:-6px;top:-8px;font-size:1.5rem;color:#f3d78a;text-shadow:0 0 18px color-mix(in srgb,var(--vg,#d9a94c) 70%,transparent);animation:zpbSbRise 1.7s ease both;animation-delay:2s;}
.zpb-victory-name{font-family:'Cinzel Decorative',serif;font-weight:900;font-size:clamp(2rem,7.5vw,3.6rem);letter-spacing:.08em;color:#f7e2a4;animation:zpbSbRise 1.7s ease both;animation-delay:1.45s;}
.zpb-victory-score{display:flex;gap:14px;justify-content:center;align-items:baseline;margin:14px 0 2px;color:#f7e2a4;animation:zpbSbRise 1.6s ease both;animation-delay:2.05s;}
.zpb-victory-score b{font-size:1.5rem;}
.zpb-victory-score i{opacity:.6;font-style:normal;}
.zpb-victory-final{letter-spacing:.42em;font-size:.68rem;color:#cfa84e;margin:2px 0 8px;animation:zpbSbRise 1.8s ease both;animation-delay:2.35s;}
.zpb-victory-mvp{color:#e8d5a4;font-size:.92rem;letter-spacing:.1em;margin:2px 0 18px;animation:zpbSbRise 2.4s ease both;animation-delay:2.65s;}
.zpb-victory-mvp b{color:#fff3d0;}
.zpb-victory-mvp i{opacity:.75;font-style:normal;}
.zpb-victory-go{animation:zpbSbRise 2.8s ease both;animation-delay:3.25s;}
@media (prefers-reduced-motion: reduce){ .zpb-victory-conf i,.zpb-victory-embers i,.zpb-victory-ring,.zpb-victory-stage{animation:none !important;} }
@media (max-width:600px){ .zpb-victory-orb{width:118px;height:118px;} .zpb-victory-orb img{width:82px;height:82px;} .zpb-victory-kicker{letter-spacing:.3em;font-size:.8rem;} .zpb-victory{padding:14px;} }
</style>
<script id="zpb-w68-js">
// ============ Z-POST-BLUE W68 · THE OWNER'S ROUND ============
// UI 7 (Owner): the user-wins-the-Super-Bowl page — the second act after the SB page's
// Continue. The SB page stays the recurring page (the Owner's word); when the champion IS
// the user's team, the victory page mounts over it before the storm fades. The ten
// commandments hold: Cinzel Decorative display, no white text, integers, the shimmer as THE
// celebration, slow soft motion, the 0.6s reveal cadence.
window.zpbSuperBowlVictoryCine = function(){
 try{
  const S = seasonState; if(!S || !S.champion || !S.sbFinal) return;
  const user = seasonUserTeam(); if(!user || S.champion !== user) return;
  if(document.querySelector('.zpb-victory')) return; // one victory at a time
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const pk = (typeof zpbPackFor==='function') ? zpbPackFor(user) : null;
  const lg = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
  const mvp = S.sbFinal.mvp;
  const ab = t => (typeof TEAM_ABBR !== 'undefined' && TEAM_ABBR[t]) ? TEAM_ABBR[t] : t;
  const cA = (typeof zpbPackFor==='function') ? zpbPackFor(S.sbFinal.away) : null;
  const cH = (typeof zpbPackFor==='function') ? zpbPackFor(S.sbFinal.home) : null;
  const inkA = cA ? (cA.txd||cA.accD) : 'var(--accent)';
  const inkH = cH ? (cH.txd||cH.accD) : 'var(--accent2, var(--rose))';
  const confetti = Array.from({length:72}, (_,i)=>'<i style="left:' + (i*1.39).toFixed(2) + '%;animation-delay:' + ((i%13)*0.31).toFixed(2) + 's;background:' + (i%3===0 ? '#d9a94c' : i%3===1 ? (pk ? pk.accL : '#d9a94c') : '#f3d78a') + ';"></i>').join('');
  const embers = Array.from({length:22}, (_,i)=>'<i style="left:' + ((i*4.5)%100).toFixed(1) + '%;animation-delay:' + ((i%11)*0.66).toFixed(2) + 's;"></i>').join('');
  const ov = document.createElement('div'); ov.className = 'zpb-victory';
  if(pk){ ov.style.setProperty('--vg', pk.accL); ov.style.setProperty('--zshim', pk.accD); } // w43 (N11): the champion display shimmers in the champion's color
  ov.innerHTML = '<div class="zpb-victory-rays"></div><div class="zpb-victory-rays2"></div>'
   + '<div class="zpb-victory-glow"></div>'
   + '<div class="zpb-victory-conf">' + confetti + '</div>'
   + '<div class="zpb-victory-embers">' + embers + '</div>'
   + '<div class="zpb-victory-flash"></div>'
   + '<div class="zpb-victory-stage">'
   + '<div class="zpb-victory-kicker zpb-shm">YOU WON THE SUPER BOWL</div>'
   + '<div class="zpb-victory-orb"><span class="zpb-victory-ring"></span><span class="zpb-victory-ring r2"></span><span class="zpb-victory-ring r3"></span>' + lg(user) + '<span class="zpb-victory-trophy">\\u2605</span></div>'
   + '<div class="zpb-victory-name zpb-shm">' + String(user).toUpperCase() + '</div>'
   + '<div class="zpb-victory-score"><b style="color:' + inkA + ';">' + ab(S.sbFinal.away) + ' ' + S.sbFinal.as + '</b><i>-</i><b style="color:' + inkH + ';">' + S.sbFinal.hs + ' ' + ab(S.sbFinal.home) + '</b></div>'
   + '<div class="zpb-victory-final">SUPER BOWL CHAMPIONS</div>'
   + (mvp ? '<div class="zpb-victory-mvp">SUPER BOWL MVP \\u00b7 <b>' + mvp.name + '</b>' + (mvp.group ? ' <i>' + mvp.group + '</i>' : '') + '</div>' : '')
   + '<button class="resetbtn zpb-victory-go" style="width:auto;margin:0;padding:11px 30px;">Continue</button>'
   + '</div>';
  document.body.appendChild(ov);
  requestAnimationFrame(()=> ov.classList.add('zpb-victory-in'));
  ov.querySelector('.zpb-victory-go').addEventListener('click', ()=>{
   ov.remove();
   try{ if(typeof zpbStoryRelease==='function') zpbStoryRelease(); }catch(err){}
   try{ if(window.__zpbSBRewardOwed){ window.__zpbSBRewardOwed = false; FX.play('sb'); setTimeout(()=>{ const b = document.querySelector('.champion-banner'); if(b) b.classList.add('fxwon'); }, 60); } }catch(err){} // w38 (R14, Owner): the reward plays when the page lets go
   try{ if(typeof zpbFxDrain==='function') zpbFxDrain(true); }catch(err){}
  });
 }catch(err){ try{ if(typeof zpbStoryRelease==='function') zpbStoryRelease(); }catch(e2){} }
};
</script>
</body>'''
rep('</style>\n</body>', NEW, 'victory page planted')

open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step6 done -> {SRC} md5 {h} bytes {len(src.encode("utf-8"))}')
