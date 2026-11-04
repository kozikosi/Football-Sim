#!/usr/bin/env python3
"""w66 chain step 16 — N9: the user's COTY "YOU" wears the shimmer everywhere it appears
(the Super Bowl story honors + the awards table), and the player-profile name feature lands:
click a player in the Player Browser, set a profile name, it persists and rides his name.
N10: RUN IT BACK drops "SAME ROSTER"; the caution panel states the real mechanism."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP15_MD5 = '217c1b625370cb277a70f7aa0b3acf98'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP15_MD5, 'step-15 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- N9a · the Super Bowl story's COTY "YOU" shimmers like the other winners ----
rep("else if(!a.c && a.team===user) honors.push({t:a.title, n:(a.coach?'YOU':a.team), sub:a.why}); // w63 (Owner): the user's own COTY reads YOU",
    "else if(!a.c && a.team===user) honors.push({t:a.title, n:(a.coach?'YOU':a.team), sub:a.why, gold:true}); // w66 (Owner): the user's own COTY shimmers gold like every other honors-earned winner",
    'sb story coty gold', 1)

# ---- N9b · the awards table's COTY "YOU" shimmers gold ----
rep("""? `<tr><td>${a.title==='Most Valuable Player'?'<div class="zpb-mvptitle zpb-shm">Most<br>Valuable<br>Player</div>':a.title}</td><td>${honorLineHTML(a.c,user)} <div class="zpb-schiprow" style="margin-top:5px;">${a.c.rec?zpbStatChipsHTML(a.c.rec):''}</div><div class="narr">${a.why||''}</div></td></tr>`
  : `<tr><td>${a.title}</td><td><span${a.team===user?' style="color:var(--accent);font-weight:700;"':''}>${a.coach?(a.team===seasonUserTeam()?'YOU':a.coach)+' \\u00b7 ':''}${a.team}</span><div class="narr">${a.why||''}</div></td></tr>`).join('');""",
    """? `<tr><td>${a.title==='Most Valuable Player'?'<div class="zpb-mvptitle zpb-shm">Most<br>Valuable<br>Player</div>':a.title}</td><td>${honorLineHTML(a.c,user)} <div class="zpb-schiprow" style="margin-top:5px;">${a.c.rec?zpbStatChipsHTML(a.c.rec):''}</div><div class="narr">${a.why||''}</div></td></tr>`
  : `<tr><td>${a.title}</td><td><span>${a.coach?(a.team===seasonUserTeam()?'<span class="zpb-shm" style="font-weight:800;">YOU</span>':a.coach)+' \\u00b7 ':''}${a.team}</span><div class="narr">${a.why||''}</div></td></tr>`).join(''); // w66 (Owner): the coach's YOU shimmers gold — no more static accent""",
    'awards table coty gold', 1)

# ---- N9c · the profile name rides the browser rows ----
rep("""h += `<tr style="${zpbTv}"><td class="zpb-pb-name zpb-gname ${cls}">${name}</td><td><span class="zpb-poschip">${pos}</span></td><td class="zpb-pb-team">${team}</td><td class="score">${ovr}</td><td class="num">${spd}</td><td class="num">${str_}</td></tr>`; // w30 (Owner): AGI, COD, INJ and AWR are gone from the site""",
    """h += `<tr style="${zpbTv}"><td class="zpb-pb-name zpb-gname ${cls}" data-zpb-name="${name}" title="Player profile · click to set the profile name">${name}${window.zpbProfSuffix ? zpbProfSuffix(name) : ''}</td><td><span class="zpb-poschip">${pos}</span></td><td class="zpb-pb-team">${team}</td><td class="score">${ovr}</td><td class="num">${spd}</td><td class="num">${str_}</td></tr>`; // w30 (Owner): AGI, COD, INJ and AWR are gone from the site · w66 (Owner): the profile name rides the name""",
    'browser profile suffix', 1)

# ---- N10a · RUN IT BACK, clean ----
rep("""<button class="tabbtn" id="restartSeasonBtn" style="width:auto;">RUN IT BACK <span class="zpb-again-dot">·</span> <span class="zpb-rosterline">SAME ROSTER</span></button>""",
    """<button class="tabbtn" id="restartSeasonBtn" style="width:auto;">RUN IT BACK</button>""",
    'run it back clean', 1)

# ---- N10b · the caution panel states the mechanism ----
rep("function zpbCaution(yesLabel, onYes){\n const ov = document.createElement('div'); ov.className = 'zpb-caution-ov';\n ov.innerHTML = '<div class=\"zpb-caution\"><div class=\"zpb-warn\">!</div>'\n  + '<h3 style=\"margin:0 0 6px;\">Caution: Your current season will be erased if you continue</h3>'\n  + '<p class=\"narr\" style=\"margin:0 0 16px;\">Results, stats and awards in progress are thrown away.</p>'",
    "function zpbCaution(yesLabel, onYes, opts){\n opts = opts || {}; // w66 (Owner): a caution can state its own mechanism\n const ov = document.createElement('div'); ov.className = 'zpb-caution-ov';\n ov.innerHTML = '<div class=\"zpb-caution\"><div class=\"zpb-warn\">!</div>'\n  + '<h3 style=\"margin:0 0 6px;\">' + (opts.title || 'Caution: Your current season will be erased if you continue') + '</h3>'\n  + '<p class=\"narr\" style=\"margin:0 0 16px;\">' + (opts.body || 'Results, stats and awards in progress are thrown away.') + '</p>'",
    'caution opts', 1)

rep("if(a) a.addEventListener('click', ()=> zpbCaution('Yes, start a new season', ()=>{ startSeason(); renderSeasonTab(container); }));",
    "if(a) a.addEventListener('click', ()=> zpbCaution('Yes · run it back', ()=>{ startSeason(); renderSeasonTab(container); }, {title:'Caution: Run it back?', body:'You will begin the season again at the preseason with the same roster you have right now. The current season\\u2019s results, stats and awards are erased.'})); // w66 (Owner): the caution carries the SAME ROSTER story the button dropped",
    'run it back caution', 1)

# ---- N9c payload · the profile-name editor ----
CLOSE = '\n</body>\n</html>'
PAYLOAD = '''
<style id="zpb-w66p-css">
/* N9 (Owner): the player-profile name — the first slab of the profiles track.
   The profile name rides the real name in the halfway team ink (the 0.5 law). */
#playerBody td.zpb-pb-name{cursor:pointer;}
#playerBody td.zpb-pb-name:hover{text-decoration:underline;text-decoration-color:color-mix(in srgb,var(--tTxM,var(--tA2,var(--accent))) 55%,transparent);text-underline-offset:3px;}
.zpb-profmark{font-family:'Cinzel','Bodoni Moda',Georgia,serif;font-size:.62rem;font-weight:600;letter-spacing:.03em;color:var(--tTxM,var(--tA2,var(--sub)));white-space:nowrap;}
.zpb-profpop{position:fixed;z-index:132;min-width:250px;max-width:320px;padding:12px 14px;border-radius:12px;border:1px solid var(--rosehair,var(--border));background:var(--panel);
 box-shadow:0 18px 44px rgba(60,30,40,.25);animation:zpbpopin .22s ease;font-family:'Cinzel','Bodoni Moda',Georgia,serif;}
.zpb-profpop-h{font-size:.56rem;letter-spacing:.16em;font-weight:800;color:var(--sub);text-align:left;}
.zpb-profpop-name{font-weight:800;margin:3px 0 9px;font-size:.86rem;}
.zpb-profpop-in{width:100%;box-sizing:border-box;padding:7px 10px;border-radius:9px;border:1px solid var(--rosehair,var(--border));background:var(--panel2);color:var(--text);
 font-family:'Cinzel','Bodoni Moda',Georgia,serif;font-size:.82rem;}
.zpb-profpop-in:focus{border-color:var(--accent);outline:none;box-shadow:0 0 10px color-mix(in srgb,var(--accent) 25%,transparent);}
.zpb-profpop-row{display:flex;gap:8px;justify-content:flex-end;margin-top:10px;flex-wrap:wrap;}
</style>
<script id="zpb-w66p-js">
// ============ Z-POST-BLUE W66 · OWNER ROUND 2 · PROFILES ============
// N9 (Owner): "build out the feature to fill a player's profile name" — the store, the
// suffix renderer, and the editor. Click a player's name in the Player Browser to set it.
window.zpbProfStore = {
 read(){ try{ return JSON.parse(localStorage.getItem('zpbPlayerProfiles')||'{}') || {}; }catch(err){ return {}; } },
 write(m){ try{ localStorage.setItem('zpbPlayerProfiles', JSON.stringify(m)); return true; }catch(err){ return false; } },
 of(n){ return this.read()[n] || ''; }
};
window.zpbProfSuffix = function(n){
 try{
  const p = (typeof zpbProfStore!=='undefined' && zpbProfStore) ? zpbProfStore.of(n) : '';
  return p ? ' <span class="zpb-profmark" title="Profile name \\u00b7 click the player to edit">\\u201c'+p+'\\u201d</span>' : '';
 }catch(err){ return ''; }
};
window.zpbProfEditor = function(name, anchor){
 try{
  document.querySelectorAll('.zpb-profpop').forEach(x=>x.remove());
  const cur = zpbProfStore.of(name);
  const pop = document.createElement('div'); pop.className = 'zpb-profpop';
  pop.innerHTML = '<div class="zpb-profpop-h">PLAYER PROFILE</div>'
   + '<div class="zpb-profpop-name">'+name+'</div>'
   + '<input class="zpb-profpop-in" type="text" maxlength="40" placeholder="Profile name" value="'+String(cur).replace(/"/g,'&quot;')+'">'
   + '<div class="zpb-profpop-row">'
   + '<button type="button" class="resetbtn" data-prof="save" style="width:auto;margin:0;padding:6px 16px;">Save</button>'
   + (cur ? '<button type="button" class="tabbtn" data-prof="clear">Remove</button>' : '')
   + '<button type="button" class="tabbtn" data-prof="no">Cancel</button></div>';
  document.body.appendChild(pop);
  const r = anchor.getBoundingClientRect();
  const pw = pop.offsetWidth, ph = pop.offsetHeight;
  pop.style.left = Math.min(window.innerWidth - pw - 10, Math.max(10, r.left)) + 'px';
  let T = r.bottom + 6; if(T + ph > window.innerHeight - 8) T = Math.max(8, r.top - ph - 6);
  pop.style.top = T + 'px';
  const inp = pop.querySelector('.zpb-profpop-in'); try{ inp.focus(); inp.select(); }catch(err){}
  const shut = ()=>{
   document.querySelectorAll('.zpb-profpop').forEach(x=>x.remove());
   document.removeEventListener('click', outside, true);
   window.removeEventListener('scroll', shut, true);
   window.removeEventListener('resize', shut);
  };
  const outside = ev=>{ if(pop.contains(ev.target) || ev.target===anchor || anchor.contains(ev.target)) return; shut(); };
  setTimeout(()=>{ document.addEventListener('click', outside, true); window.addEventListener('scroll', shut, true); window.addEventListener('resize', shut); }, 0);
  pop.addEventListener('click', e=>{
   const b = e.target.closest('[data-prof]'); if(!b) return;
   const act = b.dataset.prof;
   if(act==='save'){ const v = inp.value.trim(); const m = zpbProfStore.read(); if(v) m[name] = v; else delete m[name]; zpbProfStore.write(m); }
   else if(act==='clear'){ const m = zpbProfStore.read(); delete m[name]; zpbProfStore.write(m); }
   shut();
   if(act!=='no' && typeof renderPlayers==='function'){ try{ renderPlayers(); }catch(err){} } // the suffix repaints with the fresh store
  });
  inp.addEventListener('keydown', e=>{ if(e.key==='Enter'){ const b = pop.querySelector('[data-prof="save"]'); if(b) b.click(); } else if(e.key==='Escape'){ shut(); } });
 }catch(err){}
};
(function(){
 'use strict';
 document.addEventListener('click', function(e){
  const td = e.target.closest ? e.target.closest('#playerBody td.zpb-pb-name') : null;
  if(!td) return;
  const nm = td.dataset.zpbName || (td.childNodes[0] && td.childNodes[0].textContent) || '';
  if(!nm) return;
  if(window.zpbProfEditor) window.zpbProfEditor(nm.trim(), td);
 });
})();
</script>
</body>
</html>'''
rep(CLOSE, PAYLOAD, 'profiles payload', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 16 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
