#!/usr/bin/env python3
"""w29_patch3.py — stage 3: comparison dropdowns + player panels CSS, field-map grid CSS, payloads, finalize."""
import io, sys, hashlib

SRC = '/home/z/my-project/download/Football-Sim-Z-post-blue-w29.stage2.html'
OUT = '/home/z/my-project/download/Football-Sim-Z-post-blue-w29.html'
html = io.open(SRC, encoding='utf-8').read()
applied = []

def E(tag, old, new, count=1):
    global html
    n = html.count(old)
    if n != count:
        print('FAIL %s: found %d occurrences, expected %d' % (tag, n, count))
        sys.exit(1)
    html = html.replace(old, new)
    applied.append(tag)

# ============================================================
# H1+H2 (Owner): Team Comparison — the dropdown reads the team NAME ("Chiefs",
# never a partial word) and steps up to the full name at maximum screen width;
# Team B's dropdown hugs the right edge of the panel.
# ============================================================
E('H_filters',
"""   <div class="filters">
    <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);">Team A
     <select id="cmpTeamA"></select>
    </label>
    <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);">Team B
     <select id="cmpTeamB"></select>
    </label>
   </div>""",
"""   <div class="filters zpb-cmp-filters">
    <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);">Team A
     <select id="cmpTeamA"></select>
    </label>
    <label class="zpb-cmp-b" style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);">Team B
     <select id="cmpTeamB"></select>
    </label>
   </div>""")

E('H_buildoptions',
""" function buildOptions(sel, defaultVal){
  const og1 = document.createElement('optgroup'); og1.label = 'Your Draft';
  draftEntries.filter(e=>e.isUser).forEach(e=>{ const o=document.createElement('option'); o.value='YOU'; o.textContent='Your Team ('+e.teamName+')'; og1.appendChild(o); });
  sel.appendChild(og1);
  const og2 = document.createElement('optgroup'); og2.label = 'Simulated Draft Teams';
  draftEntries.filter(e=>!e.isUser).forEach(e=>{ const o=document.createElement('option'); o.value='SIM:'+e.teamName; o.textContent=e.teamName+' (sim)'; og2.appendChild(o); });
  sel.appendChild(og2);
  const og3 = document.createElement('optgroup'); og3.label = 'Actual NFL Rosters';
  realEntries.forEach(e=>{ const o=document.createElement('option'); o.value='NFL:'+e.teamName; o.textContent=e.teamName+' (actual)'; og3.appendChild(o); });
  sel.appendChild(og3);
  sel.value = defaultVal;
 }""",
""" // w29 (Owner): the bar reads the team NAME — "Chiefs", never a partial word — and
 // steps up to the full name when the screen is at maximum width.
 const zpbNickOf = t=> (t||'').split(' ').slice(-1)[0];
 const zpbWideScr = ()=> (window.innerWidth||1280) >= 1100;
 function buildOptions(sel, defaultVal){
  const n = t=> zpbWideScr() ? t : zpbNickOf(t);
  const og1 = document.createElement('optgroup'); og1.label = 'Your Draft';
  draftEntries.filter(e=>e.isUser).forEach(e=>{ const o=document.createElement('option'); o.value='YOU'; o.textContent='Your Team ('+n(e.teamName)+')'; og1.appendChild(o); });
  sel.appendChild(og1);
  const og2 = document.createElement('optgroup'); og2.label = 'Simulated Draft Teams';
  draftEntries.filter(e=>!e.isUser).forEach(e=>{ const o=document.createElement('option'); o.value='SIM:'+e.teamName; o.textContent=n(e.teamName)+' (sim)'; og2.appendChild(o); });
  sel.appendChild(og2);
  const og3 = document.createElement('optgroup'); og3.label = 'Actual NFL Rosters';
  realEntries.forEach(e=>{ const o=document.createElement('option'); o.value='NFL:'+e.teamName; o.textContent=n(e.teamName)+' (actual)'; og3.appendChild(o); });
  sel.appendChild(og3);
  sel.value = defaultVal;
 }""")

E('H_relabel',
""" const selA = document.getElementById('cmpTeamA');
 const selB = document.getElementById('cmpTeamB');
 buildOptions(selA, 'YOU');""",
""" const selA = document.getElementById('cmpTeamA');
 const selB = document.getElementById('cmpTeamB');
 buildOptions(selA, 'YOU');
 { // w29 (Owner): crossing the width threshold repaints the labels, selection preserved
  const zpbCmpRelabel = ()=>{ const va = selA.value, vb = selB.value; selA.innerHTML=''; selB.innerHTML=''; buildOptions(selA, va); buildOptions(selB, vb); };
  selA._zpbRelabel = zpbCmpRelabel; selB._zpbRelabel = zpbCmpRelabel;
 }""")

# ============================================================
# I1 (Owner): the old ring-on-every-cell is retired — the backing panel
# becomes a ::before so the 90+ shimmer keeps its gradient, and the
# highlighted border belongs to the 85+ tier only (handled in the w29 CSS).
# ============================================================
E('I_ringretire',
""".zpb-lu-cell.zpb-trow{box-shadow:inset 0 0 0 1px var(--zrbd,transparent);}""",
"""/* w29 (Owner): the old ring on every cell is retired — every player sits on a backing panel (a ::before, so the 90+ shimmer survives) and the highlighted border is the 85+ tier alone */""")

# ============================================================
# W29 payloads: CSS (field-map grid, panels, centered board) + JS (relabel on resize)
# ============================================================
W29_CSS = """<style id="zpb-w29-css">
/* ============ Z-POST-BLUE W29 ============ */
/* A (Owner): Where they line up — ONE shared field: offense on top, defense mirrored
   below it, every station at its own --x. WRs stand an extra bubble out, the CBs line
   up directly across from them, and the nickel + dime sit in the slot gap. */
.zpb-fm{display:block;}
.zpb-fm-side{display:block;}
.zpb-fm-row{display:block;position:relative;height:46px;margin:3px 0;}
.zpb-fm-row > i{position:absolute;left:calc(50% + var(--x,0)*7.7%);top:50%;transform:translate(-50%,-50%);min-width:40px;}
.zpb-fm-scrim{margin:7px 0;}
@media (max-width:430px){
 .zpb-fm-row{height:40px;}
 .zpb-fm-row > i{min-width:30px;height:26px;font-size:.62rem;padding:0 4px;}
 .zpb-fm-ini{min-width:30px;padding:1px 3px;border-radius:8px;}
 .zpb-fm-ini b{font-size:.62rem;}
 .zpb-fm-ini i{font-size:.44rem;}
}
/* I (Owner): comparison player panels — EVERY player sits on a backing panel;
   the highlighted border is the 85+ tier (vibrant and shimmering alike). */
.zpb-lu-row .zpb-lu-cell{position:relative;}
.zpb-lu-row .zpb-lu-cell.zpb-trow::before{content:"";position:absolute;inset:0;border-radius:10px;background:var(--zr1,transparent);z-index:-1;}
.zpb-lu-row .zpb-lu-cell.zpb-trow.zpb-vib::before,.zpb-lu-row .zpb-lu-cell.zpb-trow.zpb-shm::before{box-shadow:inset 0 0 0 1px var(--zrbd,var(--accent));}
/* D (Owner): Reading the Draft Board — titles and text centered, every line on its own */
.zpb-bm-center{text-align:center;}
.zpb-bm-center .zrl-badge{align-self:center;}
.zpb-bmcol .narr,.zpb-bmcall{line-height:1.8;}
/* H (Owner): Team Comparison — Team B's dropdown hugs the right edge of the panel */
.zpb-cmp-filters{justify-content:space-between;align-items:flex-end;}
.zpb-cmp-filters .zpb-cmp-b{align-items:flex-end;text-align:right;}
</style>
"""
E('payload_css', '<script id="zpb-w27-js">', W29_CSS + '<script id="zpb-w27-js">')

W29_JS = """<script id="zpb-w29-js">
// ============ Z-POST-BLUE W29 JS ============
// w29 (Owner): crossing the comparison width threshold repaints the TEAM COMPARISON
// dropdown labels — "Chiefs" normally, the full name at maximum width — selection kept.
(function(){
 var t = null;
 window.addEventListener('resize', function(){
  clearTimeout(t);
  t = setTimeout(function(){
   try{
    var a = document.getElementById('cmpTeamA');
    if(a && a._zpbRelabel) a._zpbRelabel();
   }catch(err){}
  }, 200);
 });
})();
</script>
"""
E('payload_js', '</body>\n</html>', W29_JS + '</body>\n</html>')

io.open(OUT, 'w', encoding='utf-8').write(html)
md5 = hashlib.md5(io.open(OUT, 'rb').read()).hexdigest()
size = len(html.encode('utf-8'))
print('stage-3 edits applied:', len(applied))
print('W29 product:', OUT)
print('md5', md5, '|', size, 'bytes')
io.open('/home/z/my-project/scripts/w29-stage3.done', 'w').write('\\n'.join(applied))
