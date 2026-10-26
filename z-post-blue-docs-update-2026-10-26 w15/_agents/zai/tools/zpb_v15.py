#!/usr/bin/env python3
"""Z-post-blue WAVE 15 build module.
Owner fix-list round: rename the 100-seasons winning-drivers header; stretch the
welcome cinematic to the Owner's beats (3 s / 3 s / slower rise / 3 s linger) —
spec saved separately; game Skip = instantly sim the rest of the game and stay
on the panel with FINAL + the full log (Continue still exits); '@' instead of
'AT' on the game screen; playoff/SB intros become short content acts that
highlight each side's best players (no more 30 s / 60 s of waiting); the extra
SIM PLAYOFFS button after elimination removed; MODEL · ALL SLOTS entry removed
from the ranking series; the scroll-fade system no longer hides panels (root
cause of 'players vanish'); key-players grid back to two columns; Team
Comparison headline scores wear each team's colors; dark team accents
brightened on the game panel; every turnover line names its players (up to
three). UI/pacing only — protected math invariants stay byte-identical."""

def apply(html):
    EXACT = []
    REMOVED = []
    def rep(label, old, new, cnt=1):
        EXACT.append((label, old, new, cnt))

    # ---------------- 1. H-1: heading rename ----------------
    rep("H-1 winning-drivers header renamed",
        """<div class="zpb-100sec">What drives winning in this model</div>""",
        """<div class="zpb-100sec">Your most valuable positions</div>""", 1)

    # ---------------- 2. H-2: cinematic pacing (CSS durations) ----------------
    rep("H-2 cine CSS: slower fade-in / rise (1.4s in, 3.6s rise)",
        """transition:opacity 1.1s ease,transform 2.6s cubic-bezier(.22,.61,.36,1);}""",
        """transition:opacity 1.4s ease,transform 3.6s cubic-bezier(.22,.61,.36,1);}""", 1)
    rep("H-2 cine CSS: 'welcome to the' fade-out stretched to 2.2s",
        """.zpb-fin.zpb-fin-welcome.zpb-wt-out p:nth-child(1),.zpb-fin.zpb-fin-welcome.zpb-wt-out p:nth-child(2){opacity:0;transition-duration:1.5s,2.6s;}""",
        """.zpb-fin.zpb-fin-welcome.zpb-wt-out p:nth-child(1),.zpb-fin.zpb-fin-welcome.zpb-wt-out p:nth-child(2){opacity:0;transition-duration:2.2s,3.6s;}""", 1)
    rep("H-2 cine CSS: DRAFT fade stretched to 2.4s",
        """.zpb-fin.zpb-fin-welcome p.zpb-draft-fade{opacity:0;transition-duration:1.7s,2.6s;}""",
        """.zpb-fin.zpb-fin-welcome p.zpb-draft-fade{opacity:0;transition-duration:2.4s,3.6s;}""", 1)
    rep("H-2 cine CSS: veil fade stretched to 2.4s",
        """.zpb-fin.zpb-fin-welcome.zpb-fin-fadebg{opacity:0;transition:opacity 1.7s ease;}""",
        """.zpb-fin.zpb-fin-welcome.zpb-fin-fadebg{opacity:0;transition:opacity 2.4s ease;}""", 1)

    # ---------------- 3. H-2: cinematic pacing (JS beats) ----------------
    rep("H-2 cine JS: WELCOME alone ~3s, rest of text ~3s, slower rise, 3s linger, then fade",
        """ at(100,  ()=>ps[0].classList.add('zpb-fin-in'));       // WELCOME
 at(450,  ()=>ps[1].classList.add('zpb-fin-in'));       // TO THE
 at(800,  ()=>ps[2].classList.add('zpb-fin-in'));       // DRAFT
 at(3400, ()=>ov.classList.add('zpb-wt-out'));          // 'welcome to the' fades out together
 at(4100, ()=>ps[2].classList.add('zpb-draft-center')); // DRAFT rises slowly to the center
 at(7400, ()=>{                                         // DRAFT starts to fade — the CPU draft may begin
  try{ ps[2].classList.add('zpb-draft-fade'); ov.classList.add('zpb-fin-fadebg'); }catch(err){}
  fire();
 });
 at(9300, ()=>{ try{ ov.remove(); }catch(err){} window._zpbWelCleanup = null; });""",
        """ at(200,  ()=>ps[0].classList.add('zpb-fin-in'));       // WELCOME — lingers alone for 3 s
 at(4600, ()=>{ ps[1].classList.add('zpb-fin-in'); ps[2].classList.add('zpb-fin-in'); }); // TO THE + DRAFT — the rest of the text lingers 3 s
 at(9000, ()=>ov.classList.add('zpb-wt-out'));          // 'welcome to the' fades out together
 at(9700, ()=>ps[2].classList.add('zpb-draft-center')); // DRAFT rises, more slowly, to the center
 at(16300, ()=>{                                        // DRAFT has lingered 3 s at the center and starts to fade — the CPU draft may begin
  try{ ps[2].classList.add('zpb-draft-fade'); ov.classList.add('zpb-fin-fadebg'); }catch(err){}
  fire();
 });
 at(18900, ()=>{ try{ ov.remove(); }catch(err){} window._zpbWelCleanup = null; });""", 1)
    rep("H-2 cine JS: header comment points at the saved spec",
        """// W14-1: welcome to the draft — WELCOME / TO THE / DRAFT stacked dead center; 'welcome to the'
// fades out, DRAFT rises slowly to the center, and the CPU draft starts the instant DRAFT
// begins to fade (done() fires exactly then — the draft never runs behind the cinematic)""",
        """// W15-1: welcome to the draft — WELCOME / TO THE / DRAFT stacked dead center; WELCOME lingers
// alone ~3 s, the rest of the text ~3 s, 'welcome to the' fades out, DRAFT rises (more slowly)
// and lingers ~3 s; the CPU draft starts the instant DRAFT begins to fade. Full spec + restore
// code lives in _agents/zai/deliveries/CINEMATIC-WELCOME-SPEC.md — never stray from it.""", 1)

    # ---------------- 4. H-3: Skip = instantly sim the rest of the game ----------------
    rep("H-3 panel Skip wiring moves to skipAll",
        """  if(skip) skip.addEventListener('click', ()=>{ if(finished){ return; } finish(true); });""",
        """  // W15-4: Skip wiring lives with skipAll below (instantly sims the rest of the game)""", 1)

    rep("H-3 runEvents rebuilt: shared render step + instant-skip flush + named turnovers",
        """  const runEvents = ()=>{
   const total = all.length;
   // 30-60 s of play-by-play: slower cadence, quarter banners get room to breathe
   const step = Math.min(3400, Math.max(1500, 34000/total));
   let t = 500;
   timers.push(setTimeout(()=>{ prog.style.width = '4%'; }, 60));
   let lastQ = 0;
   all.forEach((e, i)=>{
    if(e.q !== lastQ){
     lastQ = e.q; const qq = e.q;
     timers.push(setTimeout(()=>{
      qchip.textContent = (QN[qq] || ('Q' + qq)).split(' ')[0];
      const d = document.createElement('div'); d.className = 'zpb-rep-q'; d.textContent = QN[qq] || ('QUARTER ' + qq);
      log.appendChild(d);
     }, t));
     t += 900;
    }
    const ev = e;
    timers.push(setTimeout(()=>{
     if(ev.type==='TO'){
      const line = document.createElement('div');
      line.className = 'zpb-rep-line zrl-to';
      const tk = (tkQ[ev.side] || []).shift();
      const toTxt = tk ? (tk.type==='INT'
        ? ((tk.name || '') + ' int ' + (tk.from || ''))
        : (tk.recoveredBy && tk.recoveredBy===tk.name
           ? ((tk.name || '') + ' strips ' + (tk.from || '') + ' & ' + tk.name + ' recovers')
           : ((tk.name || '') + ' FF' + (tk.recoveredBy ? ', ' + tk.recoveredBy + ' FR' : ''))))
       : (abbr(g[ev.side==='home'?'away':'home']) + ' gives it up');
      line.innerHTML = '<span class="zrl-t">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[ev.side])
       + '<span class="zrl-team">' + abbr(g[ev.side]) + '</span><span class="zrl-play">' + toTxt + '</span>'
       + '<span class="zrl-badge" style="color:' + colOf(g[ev.side]) + ';">TO</span>';
      log.appendChild(line);
      requestAnimationFrame(()=>{ line.classList.add('in'); });
      log.scrollTop = log.scrollHeight;
      return;
     }
     if(ev.side==='home') hs += (ev.pts||0); else as += (ev.pts||0);
     sa.textContent = as; sh.textContent = hs;
     const line = document.createElement('div');
     line.className = 'zpb-rep-line' + (((ev.side==='home'&&focusTeam===g.home)||(ev.side==='away'&&focusTeam===g.away)) ? ' zrl-me' : '');
     const _cl = colOf(g[ev.side]);
     const _badge = ev.type==='TD' ? '<span class="zrl-badge zrl-td zpb-shm" style="--zrb:' + _cl + '">TD</span>'
      : ev.type==='FG' ? '<span class="zrl-badge' + (i===gwIdx ? ' zpb-shm' : '') + '" style="--zrb:' + _cl + ';color:' + _cl + ';">FG</span>'
      : '<span class="zrl-badge" style="color:' + _cl + ';">' + (ev.type==='SAF' ? 'SAF' : '+') + '</span>';
     line.innerHTML = '<span class="zrl-t">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[ev.side])
      + '<span class="zrl-team">' + abbr(g[ev.side]) + '</span><span class="zrl-play">' + describe(ev)
      + '</span>' + _badge
      + '<span class="zrl-sc"><b style="color:' + colOf(g.away) + ';">' + as + '</b> - <b style="color:' + colOf(g.home) + ';">' + hs + '</b></span>';
     log.appendChild(line);
     requestAnimationFrame(()=>{ line.classList.add('in'); });
     log.scrollTop = log.scrollHeight;
     prog.style.width = (8 + 88*((i+1)/total)).toFixed(1) + '%';
     if(ev.q===4 && Math.abs(hs-as) <= 7 && !clutch){
      clutch = true;
      box.classList.add('zpb-clutch');
      if(roundLabel) box.classList.add('zpb-clutch2');
     }
    }, t));
    t += step;
   });
   timers.push(setTimeout(()=>{ finish(false); }, t + 700));
  };""",
        """  // W15-4: one shared step renderer — the timed cadence and instant Skip walk the same list
  const total = all.length;
  let cursor = 0, lastQ = 0;
  const qBanner = q=>{
   qchip.textContent = (QN[q] || ('Q' + q)).split(' ')[0];
   const d = document.createElement('div'); d.className = 'zpb-rep-q'; d.textContent = QN[q] || ('QUARTER ' + q);
   log.appendChild(d);
  };
  const renderStep = (ev, i)=>{
   if(ev.type==='TO'){
    const line = document.createElement('div');
    line.className = 'zpb-rep-line zrl-to';
    const tk = (tkQ[ev.side] || []).shift();
    const dside = ev.side==='home' ? 'away' : 'home';
    const dfn = (((g.detail||{})[dside]||{}).players || []).filter(p=>p && p.name && ['DL','LB','DB'].includes(p.group));
    const atk = (((g.detail||{})[ev.side]||{}).players || []).filter(p=>p && p.name && ['QB','RB','WR','TE'].includes(p.group));
    const dpick = k => dfn.length ? dfn[(k + ev.q) % dfn.length].name : '';
    const apick = k => atk.length ? atk[(k + ev.q) % atk.length].name : '';
    const toTxt = tk ? (tk.type==='INT'
      ? ((tk.name || dpick(0)) + ' int ' + (tk.from || apick(0)))
      : (tk.recoveredBy && tk.recoveredBy===tk.name
         ? ((tk.name || dpick(0)) + ' strips ' + (tk.from || apick(1)) + ' & ' + tk.name + ' recovers')
         : ((tk.name || dpick(0)) + ' FF' + (tk.recoveredBy ? ', ' + tk.recoveredBy + ' FR' : ''))))
     : (()=>{ const f = apick(0), fo = dpick(0), rc = dpick(1) || dpick(0);
         if(!f && !fo) return abbr(g[dside]) + ' takes it away';
         return (f ? f + ' fumbled' : 'Ball comes out')
          + (fo ? ' (forced by ' + fo : '')
          + (rc && rc!==fo ? (fo ? ', recovered by ' + rc : ' (recovered by ' + rc) : '')
          + (fo ? ')' : ''); })();
    line.innerHTML = '<span class="zrl-t">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[ev.side])
     + '<span class="zrl-team">' + abbr(g[ev.side]) + '</span><span class="zrl-play">' + toTxt + '</span>'
     + '<span class="zrl-badge" style="color:' + colOf(g[ev.side]) + ';">TO</span>';
    log.appendChild(line);
    requestAnimationFrame(()=>{ line.classList.add('in'); });
    log.scrollTop = log.scrollHeight;
    return;
   }
   if(ev.side==='home') hs += (ev.pts||0); else as += (ev.pts||0);
   sa.textContent = as; sh.textContent = hs;
   const line = document.createElement('div');
   line.className = 'zpb-rep-line' + (((ev.side==='home'&&focusTeam===g.home)||(ev.side==='away'&&focusTeam===g.away)) ? ' zrl-me' : '');
   const _cl = colOf(g[ev.side]);
   const _badge = ev.type==='TD' ? '<span class="zrl-badge zrl-td zpb-shm" style="--zrb:' + _cl + '">TD</span>'
    : ev.type==='FG' ? '<span class="zrl-badge' + (i===gwIdx ? ' zpb-shm' : '') + '" style="--zrb:' + _cl + ';color:' + _cl + ';">FG</span>'
    : '<span class="zrl-badge" style="color:' + _cl + ';">' + (ev.type==='SAF' ? 'SAF' : '+') + '</span>';
   line.innerHTML = '<span class="zrl-t">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[ev.side])
    + '<span class="zrl-team">' + abbr(g[ev.side]) + '</span><span class="zrl-play">' + describe(ev)
    + '</span>' + _badge
    + '<span class="zrl-sc"><b style="color:' + colOf(g.away) + ';">' + as + '</b> - <b style="color:' + colOf(g.home) + ';">' + hs + '</b></span>';
   log.appendChild(line);
   requestAnimationFrame(()=>{ line.classList.add('in'); });
   log.scrollTop = log.scrollHeight;
   prog.style.width = (8 + 88*((i+1)/total)).toFixed(1) + '%';
   if(ev.q===4 && Math.abs(hs-as) <= 7 && !clutch){
    clutch = true;
    box.classList.add('zpb-clutch');
    if(roundLabel) box.classList.add('zpb-clutch2');
   }
  };
  const runEvents = ()=>{
   // 30-60 s of play-by-play: slower cadence, quarter banners get room to breathe
   const step = Math.min(3400, Math.max(1500, 34000/total));
   let t = 500;
   timers.push(setTimeout(()=>{ prog.style.width = '4%'; }, 60));
   all.forEach((e, i)=>{
    const ev = e;
    if(ev.q !== lastQ){
     lastQ = ev.q; const qq = ev.q;
     timers.push(setTimeout(()=>{ qBanner(qq); }, t));
     t += 900;
    }
    timers.push(setTimeout(()=>{ renderStep(ev, i); cursor = i + 1; }, t));
    t += step;
   });
   timers.push(setTimeout(()=>{ finish(false); }, t + 700));
  };
  // W15-4: Skip = instantly sim the rest of the game (the draft's INSTANT button, for games):
  // cancel the clock, flush every remaining play at once, exact final score, full log on the
  // panel with FINAL — the user still leaves through Continue.
  const skipAll = ()=>{
   if(finished) return;
   if(!introDone){
    introDone = true;
    const intro = box.querySelector('.zpb-rep-intro'); if(intro) intro.remove();
   }
   timers.forEach(tt=>clearTimeout(tt)); timers.length = 0;
   for(; cursor < all.length; cursor++){
    const ev = all[cursor];
    if(ev.q !== lastQ){ lastQ = ev.q; qBanner(ev.q); }
    renderStep(ev, cursor);
   }
   as = finA; hs = finH; sa.textContent = as; sh.textContent = hs;
   prog.style.width = '100%';
   finish(true);
  };
  if(skip) skip.addEventListener('click', ()=>{ skipAll(); });""", 1)

    # ---------------- 5. H-4/H-5: intro — '@', short content acts, best players ----------------
    rep("H-4/H-5 intro rebuilt: '@', star acts on their team's side, no long dead waits",
        """  // ---- cinematic intro: 5 s for playoff games, 30 s for the Super Bowl ----
  const INTRO_MS = isSB ? 60000 : (roundLabel ? 30000 : 5000);
  let introDone = !INTRO_MS;
  const startTimeline = ()=>{
   if(introDone) return;
   introDone = true;
   const intro = box.querySelector('.zpb-rep-intro'); if(intro) intro.remove();
   runEvents();
  };
  if(INTRO_MS){
   const intro = document.createElement('div'); intro.className = 'zpb-rep-intro';
   intro.innerHTML = '<div class="zpb-intro-flash"></div>'
    + '<div class="zpb-intro-title">' + roundLabel.toUpperCase() + '</div>'
    + '<div class="zpb-intro-logos"><span class="zpb-intro-l">' + crest(g.away) + '</span><span class="zpb-intro-vs">VS</span><span class="zpb-intro-r">' + crest(g.home) + '</span></div>'
    + '<div class="zpb-intro-sub">' + (isSB ? 'the everything game' : abbr(g.away) + ' at ' + abbr(g.home)) + '</div>'
    + '<button class="tabbtn zpb-intro-skip" id="zrepIntroSkip">Skip intro</button>';
   box.appendChild(intro);
   const flash = ()=>{ const f = intro.querySelector('.zpb-intro-flash'); if(f){ f.style.opacity = '.95'; setTimeout(()=>{ f.style.transition = 'opacity .7s ease'; f.style.opacity = '0'; }, 240); } };
   if(isSB){ [3400,12000,22000,34000,46000].forEach(ms=>timers.push(setTimeout(flash, ms))); }
   else { timers.push(setTimeout(flash, 3400)); }
   const iSkip = intro.querySelector('#zrepIntroSkip'); if(iSkip) iSkip.addEventListener('click', startTimeline);
   timers.push(setTimeout(startTimeline, INTRO_MS));
  }""",
        """  // ---- W15-5 cinematic intro: 5 s regular, ~8.5 s playoffs, ~11.5 s Super Bowl — content
  //      acts the whole way (each side's best players, across from each other), no dead wait
  //      longer than ~2 s. '@' always (H-4). ----
  const gdet = (g.detail || {});
  const star2 = sd=> (((gdet[sd] && gdet[sd].players) || []).filter(p=>p && p.name)).slice().sort((a,b)=>
    ((((b.st||{}).rushTD||0)+((b.st||{}).recTD||0))-(((a.st||{}).rushTD||0)+((a.st||{}).recTD||0)))
    || ((((b.st||{}).rushYds||0)+((b.st||{}).recYds||0))-(((a.st||{}).rushYds||0)+((a.st||{}).recYds||0)))
    || ((b.impact||0)-(a.impact||0))).slice(0,2);
  const sA = star2('away'), sH = star2('home');
  const starTag = p=>{ const st = p.st||{}; const td = (st.rushTD||0)+(st.recTD||0); if(td) return td + ' TD'; const y = (st.rushYds||0)+(st.recYds||0); return y ? y + ' yds' : (LABELS[p.group] || p.group || ''); };
  const hasStars = !!(sA.length && sH.length);
  const INTRO_MS = !roundLabel ? 5000 : (hasStars ? (isSB ? 11500 : 8500) : (isSB ? 6500 : 5000));
  let introDone = !INTRO_MS;
  const startTimeline = ()=>{
   if(introDone) return;
   introDone = true;
   const intro = box.querySelector('.zpb-rep-intro'); if(intro) intro.remove();
   runEvents();
  };
  if(INTRO_MS){
   const intro = document.createElement('div'); intro.className = 'zpb-rep-intro';
   intro.innerHTML = '<div class="zpb-intro-flash"></div>'
    + '<div class="zpb-intro-title">' + roundLabel.toUpperCase() + '</div>'
    + '<div class="zpb-intro-logos"><span class="zpb-intro-l">' + crest(g.away) + '</span><span class="zpb-intro-vs">VS</span><span class="zpb-intro-r">' + crest(g.home) + '</span></div>'
    + '<div class="zpb-intro-sub">' + (isSB ? 'the everything game' : abbr(g.away) + ' @ ' + abbr(g.home)) + '</div>'
    + (hasStars
      ? '<div class="zpb-intro-pvs"><div class="zpb-intro-pvcap">best on the field</div>'
        + sA.map((p,i)=>{ const q = sH[i];
          return '<div class="zpb-intro-pvrow" style="animation:zpbtitlein 1s ease ' + (3.6 + i*0.9) + 's both;">'
           + '<span class="zpb-intro-pva">' + crest(g.away) + '<b>' + p.name + '</b><i>' + starTag(p) + '</i></span>'
           + '<span class="zpb-intro-pvh">' + (q ? '<i>' + starTag(q) + '</i><b>' + q.name + '</b>' + crest(g.home) : '') + '</span></div>';
        }).join('') + '</div>'
      : '')
    + '<button class="tabbtn zpb-intro-skip" id="zrepIntroSkip">Skip intro</button>';
   box.appendChild(intro);
   const flash = ()=>{ const f = intro.querySelector('.zpb-intro-flash'); if(f){ f.style.opacity = '.95'; setTimeout(()=>{ f.style.transition = 'opacity .7s ease'; f.style.opacity = '0'; }, 240); } };
   if(isSB){ [3200,6400,9600].forEach(ms=>timers.push(setTimeout(flash, ms))); }
   else { timers.push(setTimeout(flash, roundLabel ? 6600 : 3400)); }
   const iSkip = intro.querySelector('#zrepIntroSkip'); if(iSkip) iSkip.addEventListener('click', ()=>{ skipAll(); });
   timers.push(setTimeout(startTimeline, INTRO_MS));
  }""", 1)

    rep("H-5 intro CSS: star acts, each side's own column",
        """.zpb-intro-skip{position:absolute;right:16px;bottom:14px;opacity:.75;}""",
        """.zpb-intro-skip{position:absolute;right:16px;bottom:14px;opacity:.75;}
.zpb-intro-pvs{position:absolute;left:0;right:0;top:60%;padding:0 8vw;}
.zpb-intro-pvcap{font-size:.62rem;letter-spacing:.3em;text-transform:uppercase;color:var(--sub);text-align:center;margin-bottom:6px;animation:zpbtitlein 1s ease 2.8s both;}
.zpb-intro-pvrow{display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:center;margin:4px 0;}
.zpb-intro-pva{display:flex;align-items:center;gap:7px;justify-content:flex-start;min-width:0;}
.zpb-intro-pvh{display:flex;align-items:center;gap:7px;justify-content:flex-end;min-width:0;text-align:right;}
.zpb-intro-pva img,.zpb-intro-pvh img{width:26px;height:26px;object-fit:contain;background:transparent;box-shadow:none;}
.zpb-intro-pva b,.zpb-intro-pvh b{color:var(--text);letter-spacing:.04em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.zpb-intro-pva i,.zpb-intro-pvh i{font-style:normal;font-size:.68rem;color:var(--sub);font-variant-numeric:tabular-nums;}""", 1)

    # ---------------- 6. H-6: no extra SIM PLAYOFFS after elimination ----------------
    rep("H-6 duplicate Sim Playoffs button hidden once your season is over",
        """<button class="resetbtn" id="nextRoundBtn" style="width:auto;padding:10px 24px;">${myLost?'SIM PLAYOFFS':'Continue to '+NEXT_ROUND_LABEL[rk]}</button>${rk!=='superbowl'?'<button class="tabbtn" id="simRestBtn">Sim Playoffs</button>':''}""",
        """<button class="resetbtn" id="nextRoundBtn" style="width:auto;padding:10px 24px;">${myLost?'SIM PLAYOFFS':'Continue to '+NEXT_ROUND_LABEL[rk]}</button>${(!myLost && rk!=='superbowl')?'<button class="tabbtn" id="simRestBtn">Sim Playoffs</button>':''}""", 1)

    # ---------------- 7. H-7: remove MODEL · ALL SLOTS from the series ----------------
    rep("H-7 MODEL · ALL SLOTS entry removed from the ranking series",
        """ h += '<option value="all">MODEL · ALL SLOTS</option>';
 steps.forEach(st=>{ h += '<option value="'+st.n+'">'+st.n+' '+st.label+'</option>'; });""",
        """ steps.forEach(st=>{ h += '<option value="'+st.n+'">'+st.n+' '+st.label+'</option>'; });""", 1)
    rep("H-7 dead 'all' branch removed from the series handler",
        """ if(sel.value === 'all'){ weights = {...mw}; }
 else {
  const st = window.__zpbSeriesSteps[+sel.value - 1];""",
        """ {
  const st = window.__zpbSeriesSteps[+sel.value - 1];""", 1)

    # ---------------- 8. H-8: the fade system never hides content again ----------------
    rep("H-8 fade observer: fires on first pixel, no bottom margin",
        """  },{rootMargin:'0px 0px -8% 0px', threshold:0.06});""",
        """  },{rootMargin:'0px 0px 0px 0px', threshold:0.01});""", 1)
    rep("H-8 fade observer: add-only — once seen, never hides again",
        """   es.forEach(function(e){ e.target.classList.toggle('zpb-fade-in', e.isIntersecting); });""",
        """   es.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('zpb-fade-in'); }); // W15: add-only — panels never vanish on scroll""", 1)
    rep("H-8 fade transition: 4.2s -> 1.6s",
        """.zpb-fade{transition-duration:4.2s !important;}""",
        """.zpb-fade{transition-duration:1.6s !important;}""", 1)

    # ---------------- 9. H-9: key players back to two columns ----------------
    rep("H-9 key-players grid restored to two columns (away left / home right)",
        """.kp-grid{display:flex;flex-direction:column;gap:14px;}""",
        """.kp-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}@media (max-width:760px){.kp-grid{grid-template-columns:1fr;}}""", 1)

    # ---------------- 10. H-11: comparison headline scores in team colors ----------------
    rep("H-11 comparison scores wear each team's own accent",
        """<span class="zpb-cmpscore"><span style="color:var(--tA2,var(--accent));">${Math.round(scoreA)}</span> <span class="zpb-cmpsub">vs</span> <span style="color:var(--tA2,var(--accent));">${Math.round(scoreB)}</span></span>""",
        """<span class="zpb-cmpscore"><span style="color:${(typeof zpbPackFor==='function'&&zpbPackFor(a))?zpbPackFor(a).accL:'var(--accent)'};">${Math.round(scoreA)}</span> <span class="zpb-cmpsub">vs</span> <span style="color:${(typeof zpbPackFor==='function'&&zpbPackFor(b))?zpbPackFor(b).accL:'var(--accent)'};">${Math.round(scoreB)}</span></span>""", 1)

    # ---------------- 11. H-12: brighten dark accents on the game panel ----------------
    rep("H-12 game-panel colOf lifts dark accents (Chicago) toward white",
        """  const colOf = tm=>{ const pk = (typeof zpbPackFor==='function') ? zpbPackFor(tm) : null; return pk ? pk.accL : 'var(--accent)'; };""",
        """  const zpbBrighten = c=>{ const m = /^#([0-9a-f]{6})$/i.exec(c||''); if(!m) return c; const n = parseInt(m[1],16); const r=(n>>16)&255, gg=(n>>8)&255, bb=n&255; const L=(0.2126*r+0.7152*gg+0.0722*bb)/255; if(L>=0.52) return c; const lift=v=>Math.round(v+(255-v)*0.52); return '#' + [lift(r),lift(gg),lift(bb)].map(v=>v.toString(16).padStart(2,'0')).join(''); };
  const colOf = tm=>{ const pk = (typeof zpbPackFor==='function') ? zpbPackFor(tm) : null; return zpbBrighten(pk ? pk.accL : 'var(--accent)'); };""", 1)

    # ---------------- 12. H-13: describe() never returns a nameless line ----------------
    rep("H-13 TD fallback line names a player",
        """    const d = (inf.dtq || []).shift();
    if(d) return d.name + (d.kind==='INT' ? ' interception return' : ' fumble return');
    return '';""",
        """    const d = (inf.dtq || []).shift();
    if(d) return d.name + (d.kind==='INT' ? ' interception return' : ' fumble return');
    return (inf.qbName || 'Quarterback') + ' touchdown';""", 1)

    # ---------------- apply every exact replacement ----------------
    for label, old, new, cnt in EXACT:
        found = html.count(old)
        if found != cnt:
            raise SystemExit(f"ABORT: [v15] {label}: expected {cnt} occurrence(s), found {found}")
        html = html.replace(old, new)
        REMOVED.append(old)
        print(f"[ok] [v15] {label}")

    # ---------------- post-checks ----------------
    posts = [
        ("new: cinematic spec doc pointer",       "CINEMATIC-WELCOME-SPEC.md", 1),
        ("new: instant-skip flush",               "const skipAll = ()=>{", 1),
        ("new: skip wiring",                      "skip.addEventListener('click', ()=>{ skipAll(); });", 1),
        ("new: intro skip wiring",                "iSkip.addEventListener('click', ()=>{ skipAll(); });", 1),
        ("new: named turnover synth",             " (forced by ", 1),
        ("new: best-on-the-field act",            "zpb-intro-pvrow", 2),
        ("new: best-players caption",             "zpb-intro-pvcap", 2),
        ("new: '@' on the game screen",           "' @ '", 1),
        ("new: brighten helper",                  "zpbBrighten", 2),
        ("new: add-only fade",                    "classList.add('zpb-fade-in'); }", 1),
        ("gone: gives it up",                     "gives it up", 0),
        ("gone: 30s/60s intro",                   "60000 : (roundLabel ? 30000 : 5000)", 0),
        ("gone: MODEL · ALL SLOTS",               "MODEL · ALL SLOTS", 0),
        ("gone: two-second toggle fade",          "toggle('zpb-fade-in'", 0),
    ]
    for label, needle, cnt in posts:
        found = html.count(needle)
        if cnt is not None and found != cnt:
            raise SystemExit(f"ABORT: [v15] post-check {label}: expected {cnt}, found {found}")
        print(f"[ok] [v15] {label}" + (f" (x{found})" if cnt is not None else ""))

    return html, EXACT, REMOVED


if __name__ == "__main__":
    import hashlib, sys, os
    src = sys.argv[1] if len(sys.argv) > 1 else "_agents/zai/docs-update-2026-10-26/Football-Sim-Z-post-blue.html"
    dst = sys.argv[2] if len(sys.argv) > 2 else "/home/z/my-project/out-v15/Football-Sim-Z-post-blue.html"
    with open(src, "r", encoding="utf-8") as f:
        html = f.read()
    before = hashlib.md5(html.encode()).hexdigest()
    html, EXACT, REMOVED = apply(html)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w", encoding="utf-8") as f:
        f.write(html)
    after = hashlib.md5(html.encode()).hexdigest()
    print(f"[v15] source : {src}  md5 {before}  {len(html):,} chars -> applied {len(EXACT)} replacements")
    print(f"[v15] built  : {dst}  md5 {after}  {os.path.getsize(dst):,} bytes")
