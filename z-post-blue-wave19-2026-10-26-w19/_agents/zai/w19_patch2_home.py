#!/usr/bin/env python3
"""WAVE 19 · PATCH 2 — Homepage: pick-dropdown logo off, responsive team box,
popup-light static colors, immediate pre-season team-color takeover."""
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

# ---- 2a · team box: popup-light color, responsive full name / logo+abbr; pick box: no logo ----
rep(
"""  const label = ()=>{
   const v = sel.value;
   const tt = tintTeam(sel);
   const st = pack(tt || v);
   const face = isPick ? (v==='random' ? 'Random' : 'Pick ' + v) : (v==='__random' ? 'Random team' : (v || '\\u2014'));
   btn.innerHTML = logo(isPick ? (tt || '') : v) + '<span style="' + (st ? 'color:' + st.accL : '') + '">' + face + '</span>';
  };""",
"""  const abbrOf = n=>{ try{ if(typeof TEAM_ABBR!=='undefined' && TEAM_ABBR[n]) return TEAM_ABBR[n]; }catch(e){} return n ? n.split(' ').slice(-1)[0].slice(0,3).toUpperCase() : ''; }; // w19
  const label = ()=>{
   const v = sel.value;
   const tt = tintTeam(sel);
   const st = pack(tt || v);
   const vars = st ? '--zaL:' + (window.zpbLift?zpbLift(st.txL,0.62):st.txL) + ';--zaD:' + st.txd + ';' : '';
   const face = isPick ? (v==='random' ? 'Random' : 'Pick ' + v) : (v==='__random' ? 'Random team' : (v || '\\u2014'));
   // w19 (Owner): the pick box never wears a logo; the team box wears the popup's lighter color —
   // full name when the window allows it, logo + abbreviation when the bar is compressed.
   if(isPick) btn.innerHTML = '<span class="zpb-face" style="' + vars + '">' + face + '</span>';
   else if(sel.id==='draftSlotSelect') btn.innerHTML = logo(v) + '<span class="zpb-face" style="' + vars + '"><span class="zpb-face-full">' + face + '</span><span class="zpb-face-abbr">' + (v==='__random' ? 'RND' : abbrOf(v)) + '</span></span>';
   else btn.innerHTML = logo(v) + '<span class="zpb-face" style="' + vars + '">' + face + '</span>';
  };""", '2a label()')

rep(
"""  sel.addEventListener('change', label);
  document.addEventListener('click', e=>{ if(!wrap.contains(e.target)) close(); });
  label();""",
"""  sel.addEventListener('change', label);
  document.addEventListener('click', e=>{ if(!wrap.contains(e.target)) close(); });
  setTimeout(label, 0); // w19: first paint waits a tick so team abbreviations exist""", '2b deferred initial label')

rep(
"""  const wrap = document.createElement('span'); wrap.className = 'zpb-selwrap';""",
"""  const wrap = document.createElement('span'); wrap.className = 'zpb-selwrap';
  if(sel.id==='draftSlotSelect') wrap.classList.add('zpb-teamwrap'); // w19""", '2c teamwrap class')

# ---- 2d · immediate pre-season team-color takeover on the left dropdown ----
rep(
""" if(slotSel && pickSel) slotSel.addEventListener('change', ()=>{ try{ pickSel.dispatchEvent(new Event('change', {bubbles:true})); }catch(e){} });""",
""" if(slotSel && pickSel) slotSel.addEventListener('change', ()=>{
  try{ pickSel.dispatchEvent(new Event('change', {bubbles:true})); }catch(e){}
  // w19 (Owner): the homepage and every footer page wear the highlighted team's colors immediately — season or not
  try{
    if(typeof zpbApplyTeamTheme==='function'){
      const tv = slotSel.value;
      if(tv && tv!=='__random') zpbApplyTeamTheme(tv); else zpbClearTeamTheme();
    }
  }catch(e){}
 });""", '2d theme takeover')

# ---- 2e · CSS: face colors mirror the popup; responsive team box ----
rep(
""".zpb-selbtn img{width:22px !important;height:22px !important;object-fit:contain;background:transparent;box-shadow:none;}""",
""".zpb-selbtn img{width:22px !important;height:22px !important;object-fit:contain;background:transparent;box-shadow:none;}
/* w19 (Owner): the closed box wears the same lighter colors as the open list, never the dark static tones */
.zpb-selbtn .zpb-face{white-space:nowrap;color:var(--zaL,inherit);}
:root[data-theme="dark"] .zpb-selbtn .zpb-face{color:var(--zaD,var(--zaL,inherit));}
 :root:not([data-theme="light"]) .zpb-selbtn .zpb-face{color:var(--zaD,var(--zaL,inherit));}
.zpb-selwrap.zpb-teamwrap .zpb-selbtn{min-width:150px;max-width:none;}
.zpb-selwrap.zpb-teamwrap .zpb-face-abbr{display:none;}
@media (max-width:1180px){
 .zpb-selwrap.zpb-teamwrap .zpb-face-full{display:none;}
 .zpb-selwrap.zpb-teamwrap .zpb-face-abbr{display:inline;}
 .zpb-selwrap.zpb-teamwrap .zpb-selbtn{min-width:0;max-width:150px;}
}""", '2e face CSS')

open(P, 'w', encoding='utf-8').write(src)
print(f'\nPATCH 2 complete: {n} replacements')
