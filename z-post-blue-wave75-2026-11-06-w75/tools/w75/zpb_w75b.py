#!/usr/bin/env python3
# zpb_w75b.py — wave 75 · stage 2: the appended w75 blocks + the post-checks
import hashlib, subprocess, os, re

P = '/home/z/my-project/work/z-post-blue-wave75-2026-11-06-w75/Football-Sim-Z-post-blue-w75.html'
src = open(P, encoding='utf-8').read()

W75_CSS = """<style id="zpb-w75-css">
/* ============ Z-POST-BLUE W75 (the Owner's round) ============ */
/* 1) the pregame player cards — no dark panels in light mode (Owner P7) */
:root[data-theme="light"] .zpb-intro-star{background:linear-gradient(160deg,var(--zr1,#ffffff),var(--zr2,#ffffff));border-color:var(--rosehair);box-shadow:0 4px 18px rgba(0,0,0,.12);}
:root[data-theme="light"] .zpb-intro-star b,:root[data-theme="light"] .zpb-intro-star b.zpb-vib{color:var(--tn,var(--text));}
:root[data-theme="light"] .zpb-intro-star i{color:var(--tn,var(--sub));}
@media (prefers-color-scheme: light){
 :root:not([data-theme="dark"]) .zpb-intro-star{background:linear-gradient(160deg,var(--zr1,#ffffff),var(--zr2,#ffffff));border-color:var(--rosehair);box-shadow:0 4px 18px rgba(0,0,0,.12);}
 :root:not([data-theme="dark"]) .zpb-intro-star b,:root:not([data-theme="dark"]) .zpb-intro-star b.zpb-vib{color:var(--tn,var(--text));}
 :root:not([data-theme="dark"]) .zpb-intro-star i{color:var(--tn,var(--sub));}
}
/* 2) the draft command center — the report card's own cards, smaller; no gauges (Owner P11) */
.zpb-fx-minis{display:flex;flex-wrap:wrap;gap:8px;}
.zpb-fx-mini{display:flex;align-items:center;gap:9px;border:1px solid var(--border);border-radius:12px;background:var(--panel2);padding:6px 11px;}
.zpb-fx-mini .zpb-rc-grade{font-size:1.02rem;min-width:1.6ch;text-align:center;color:var(--bad,var(--accent2));}
.zpb-fx-minibody{display:flex;flex-direction:column;gap:1px;min-width:0;}
.zpb-fx-minibody b{font-size:.76rem;line-height:1.2;}
.zpb-fx-minibody i{font-style:normal;font-size:.58rem;color:var(--sub);white-space:nowrap;}
.zpb-fx-none{text-align:center;font-size:.74rem;color:var(--sub);padding:6px 0;}
.zpb-fx-cutgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(205px,1fr));gap:8px;}
.zpb-fx-cutcard{display:flex;flex-direction:column;gap:7px;border:1px solid var(--border);border-left:3px solid var(--border);border-radius:12px;background:var(--panel2);padding:8px 11px;}
.zpb-fx-cutcard.zpb-fx-weak{border-left-color:var(--bad,var(--accent2));}
.zpb-fx-cutdown{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;}
.zpb-fx-num{font-family:'Cinzel','Bodoni Moda',Georgia,serif;font-weight:900;font-size:1.18rem;color:var(--zrd,var(--bad,var(--accent2)));}
.zpb-fx-cutdown i{font-style:normal;font-size:.5rem;font-weight:800;letter-spacing:.1em;color:var(--sub);}
.zpb-fx-gapnum{font-size:.64rem;font-weight:800;color:var(--bad,var(--accent2));}
.zpb-fx-cut{margin-left:auto;font-size:.6rem;font-weight:900;letter-spacing:.22em;color:var(--bad,var(--accent2));border:1px solid var(--bad,var(--accent2));border-radius:999px;padding:2px 10px;animation:zpbCutFade 2.8s ease-in-out infinite;}
@keyframes zpbCutFade{0%,100%{opacity:.22;}50%{opacity:1;}} /* w75 (Owner): the CUT badge fades in and out like the CAN YOU GO 20-0 */
/* 3) BACK TO <STAGE> on the footer pages, top and bottom (Owner P13) */
.zpb-backbar{display:flex;justify-content:center;margin:2px 0 14px;}
.zpb-backbar.zpb-backbar-end{margin:10px 0 4px;}
.zpb-backbar .resetbtn{width:auto;margin:0;padding:9px 24px;font-size:.8rem;}
</style>
"""

W75_JS = """<script id="zpb-w75-js">
// ============ Z-POST-BLUE W75 (the Owner's round) ============
// P12 · the rating scale — the display translation. The backend _rating math is untouched;
// the displayed number = the database's median OVR + (the raw rating - the season's raw mean).
// An average season reads the median-OVR line; a worse one reads X points below his OVR.
window.zpbMedianOvr = function(){
 if(window.__zpbMedOvr!=null) return window.__zpbMedOvr;
 try{
  const a = (typeof PLAYERS!=='undefined' ? PLAYERS : []).map(p=>p[3]).slice().sort((x,y)=>x-y);
  const m = a.length>>1;
  window.__zpbMedOvr = a.length ? (a.length%2 ? a[m] : Math.round((a[m-1]+a[m])/2)) : 76;
 }catch(err){ window.__zpbMedOvr = 76; }
 return window.__zpbMedOvr;
};
window.zpbDispRating = function(r){
 try{
  if(!r || r._rating==null) return null;
  const mean = (typeof seasonState!=='undefined' && seasonState && seasonState._rtgMean!=null) ? seasonState._rtgMean : 50;
  return Math.max(0, Math.min(99, Math.round(window.zpbMedianOvr() + (r._rating - mean))));
 }catch(err){ return (r && r._rating!=null) ? Math.round(r._rating) : null; }
};
window.zpbDR = function(r){ const d = window.zpbDispRating ? zpbDispRating(r) : null; return (d!=null) ? d : '\\u00b7'; };
// P13 · BACK TO <STAGE> — top and bottom of every footer page, while the simulator has started
window.zpbStageLabel = function(){
 try{
  if(typeof seasonState!=='undefined' && seasonState){
   const S = seasonState;
   if(S.phase==='playoffs') return ((typeof ROUND_LABELS!=='undefined') && ROUND_LABELS[S.currentPlayoffRound]) ? ROUND_LABELS[S.currentPlayoffRound].toUpperCase() : 'THE PLAYOFFS';
   if(S.phase==='complete') return 'SUPER BOWL';
   if(S.phase==='regularReview') return 'WEEK 17';
   if(S.phase==='regular' && S.preseason && !S.scriptLocked) return 'PRESEASON';
   if(S.phase==='regular') return 'WEEK '+S.currentWeek;
  }
 }catch(err){}
 return 'DRAFT';
};
window.zpbBackBars = function(){
 try{
  if(typeof draftSim==='undefined' || !draftSim) return;
  const label = 'BACK TO '+window.zpbStageLabel();
  ['viewRankings','viewPlayers','viewGroups','viewCompare','viewGuide'].forEach(v=>{
   const el = document.getElementById(v); if(!el) return;
   el.querySelectorAll('.zpb-backbar').forEach(b=>b.remove());
   const mk = end=>{
    const d = document.createElement('div'); d.className = 'zpb-backbar'+(end?' zpb-backbar-end':'');
    const b = document.createElement('button'); b.type='button'; b.className='resetbtn zpb-backbtn'; b.textContent = label;
    b.addEventListener('click', ()=>{ if(typeof setActiveTab==='function') setActiveTab('viewDraft','tabDraftBtn'); });
    d.appendChild(b); return d;
   };
   el.insertBefore(mk(false), el.firstChild);
   el.appendChild(mk(true));
  });
 }catch(err){}
};
(function(){
 if(typeof setActiveTab!=='function') return;
 const orig = setActiveTab;
 setActiveTab = function(){
  const out = orig.apply(this, arguments);
  try{ window.zpbBackBars(); }catch(err){}
  return out;
 };
})();
try{ window.zpbBackBars(); }catch(err){}
</script>
"""

assert '</body>' in src and src.rstrip().endswith('</html>')
idx = src.rindex('</style>')
tail = src[idx+len('</style>'):].strip()
assert tail.replace('\n', '') == '</body></html>', 'unexpected tail after the last style block: %r' % tail[:60]
src = src[:idx+len('</style>')] + '\n' + W75_CSS + W75_JS + src[idx+len('</style>'):]

open(P, 'w', encoding='utf-8').write(src)
md5 = hashlib.md5(src.encode()).hexdigest()
print('w75 written ·', len(src.encode()), 'bytes · md5', md5)

# ---------------- post-checks ----------------
assert 'DRAFT COMMAND CENTER' in src and 'CUTDOWN DAY' in src
assert 'THE FIX-IT BOARD' not in src, 'the old board title must be gone'
assert 'soloBase' not in src, 'the w73 solo machine must be fully retired'
assert 'teams run it' not in src
assert "(FLEX)'" not in src and "(-'+pen+' FLEX)" not in src
assert src.count('Offensive Guard') >= 3
assert src.count('selShow') >= 5
assert src.count('txM60') >= 4 and src.count('--nm60') >= 3
assert src.count('zpbBackBars') >= 3 and src.count('zpbStageLabel') >= 1
assert src.count('zpbDR') >= 4 and src.count('zpbMedianOvr') >= 3
assert src.count('zpbPlayoffRunCine(_story)') == 2  # the w47 season-end path + the w75 SIM PLAYOFFS door
assert '2 Point Conversion' in src and '2 Point Conversions' in src
assert src.count('HOW A 2 POINT CONVERSION WORKS') == 1 and 'HOW A 2-PT' not in src
assert 'zpbCutFade' in src and 'zpb-fx-cutcard' in src and 'zpb-fx-mini' in src
assert 'sel.has(g)).sort' not in src, 'cards group list must ride selShow'
# quote sanity per style block
for i, s in enumerate(re.findall(r'<style[^>]*>(.*?)</style>', src, re.S)):
    q = s.count('"') - s.count('\\"')
    assert q % 2 == 0, 'style block %d has an odd number of double quotes (%d)' % (i, q)

blocks = re.findall(r'<script>(.*?)</script>', src, re.S) + re.findall(r'<script id="[^"]+">(.*?)</script>', src, re.S)
os.makedirs('/tmp/w75check', exist_ok=True)
fails = 0
seen = set()
for i, b in enumerate(blocks):
    if b in seen: continue
    seen.add(b)
    p = '/tmp/w75check/b%d.js' % i
    open(p, 'w', encoding='utf-8').write(b)
    r = subprocess.run(['node', '--check', p], capture_output=True, text=True)
    if r.returncode != 0:
        fails += 1
        print('BLOCK', i, 'FAILS:', r.stderr[:400])
assert fails == 0, '%d script blocks fail syntax' % fails
print('ALL SCRIPT BLOCKS PARSE OK (%d unique)' % len(seen))
print('POST-CHECKS PASSED')
