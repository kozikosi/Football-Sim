#!/usr/bin/env python3
# W20 patch — Owner directive 2026-10-28: name-tier law, no sideways scroll,
# selector compaction, rankings name size, Brave/Chromium hardening.
# House pattern: asserted exact replacements + payloads + post-checks. Never hand-edit.
import hashlib, sys, subprocess, tempfile, os

SRC = '/home/z/my-project/football-sim-w19.html'
OUT = '/home/z/my-project/build/Football-Sim-Z-post-blue.html'

data = open(SRC, encoding='utf-8').read()
applied = []

def rep(name, old, new, expect=1):
    global data
    c = data.count(old)
    assert c == expect, f"ANCHOR {name}: expected {expect}, found {c}"
    data = data.replace(old, new)
    applied.append(name)

# ---------------------------------------------------------------- JS-1
# zpbRowVars: every team-scoped row now carries the tier palette
# (--tA2 vibrant / --tG2 shimmer secondary / --glow / --tn neutral) so the
# 90+/85+/neutral law renders IN THE TEAM'S COLOR on every surface.
rep('rowvars',
 "';--zr1d:'+zpbRgba(pk.accD,0.15)+';--zr2d:'+zpbRgba(pk.accD,0.04)+';--zr3d:'+zpbRgba(pk.raw[2],0.12)+';--zrbd:'+pk.accD+';';",
 "';--zr1d:'+zpbRgba(pk.accD,0.15)+';--zr2d:'+zpbRgba(pk.accD,0.04)+';--zr3d:'+zpbRgba(pk.raw[2],0.12)+';--zrbd:'+pk.accD+\n"
 "  ';--tA2:'+pk.accL+';--tG2:'+(window.zpbLift?zpbLift(pk.accL,0.35):pk.accL)+';--glow:'+zpbRgba(pk.accL,0.35)+';--tn:'+pk.txL+';'; // w20: tier palette rides every row")

# ---------------------------------------------------------------- JS-2
# Lineup comparison (the w19 override): tier law + winner keeps its OWN tier
# (a value-blind winner shimmer violated the rule on both counts).
rep('lu_shm',
 "   const shmL = (l.val>=85 && zL) ? ' zpb-shm' : '', shmR = (r.val>=85 && zR) ? ' zpb-shm' : '';\n"
 "   const zpbLuA = (ll, rr, lab)=>{ const sl2 = (ll.val>=85 && zL) ? ' zpb-shm' : '', sr2 = (rr.val>=85 && zR) ? ' zpb-shm' : '';\n"
 "    return `<div class=\"zpb-lu-row\">\n"
 "    <span class=\"zpb-lu-cell zpb-lu-l ${ll.text!=='—'&&zL?'zpb-trow':''} ${ll.val>rr.val?'zpb-lu-win zpb-shm':sl2}\" style=\"${ll.text!=='—'&&zL?zL:''}\">${ll.text}</span>\n"
 "    <span class=\"zpb-lu-c\">${lab}</span>\n"
 "    <span class=\"zpb-lu-cell zpb-lu-r ${rr.text!=='—'&&zR?'zpb-trow':''} ${rr.val>ll.val?'zpb-lu-win zpb-shm':sr2}\" style=\"${rr.text!=='—'&&zR?zR:''}\">${rr.text}</span>\n"
 "   </div>`; };",
 "   const shmL = (l.val>=90 && zL) ? ' zpb-shm' : ((l.val>=85 && zL) ? ' zpb-vib' : ''), shmR = (r.val>=90 && zR) ? ' zpb-shm' : ((r.val>=85 && zR) ? ' zpb-vib' : ''); // w20 tier law\n"
 "   const zpbLuA = (ll, rr, lab)=>{ const sl2 = (ll.val>=90 && zL) ? ' zpb-shm' : ((ll.val>=85 && zL) ? ' zpb-vib' : ''), sr2 = (rr.val>=90 && zR) ? ' zpb-shm' : ((rr.val>=85 && zR) ? ' zpb-vib' : '');\n"
 "    return `<div class=\"zpb-lu-row\">\n"
 "    <span class=\"zpb-lu-cell zpb-lu-l ${ll.text!=='—'&&zL?'zpb-trow':''} ${ll.val>rr.val?('zpb-lu-win'+sl2):sl2}\" style=\"${ll.text!=='—'&&zL?zL:''}\">${ll.text}</span>\n"
 "    <span class=\"zpb-lu-c\">${lab}</span>\n"
 "    <span class=\"zpb-lu-cell zpb-lu-r ${rr.text!=='—'&&zR?'zpb-trow':''} ${rr.val>ll.val?('zpb-lu-win'+sr2):sr2}\" style=\"${rr.text!=='—'&&zR?zR:''}\">${rr.text}</span>\n"
 "   </div>`; };")

# ---------------------------------------------------------------- JS-3
# Player cards: 86+ all shimmered; now 90+ shimmer, 85-89 vibrant.
rep('pcard',
 "'<div class=\"zpb-pcard-hd\"><b class=\"' + (r.ovr > 85 ? 'zpb-shm' : '') + '\">' + r.name + '</b>",
 "'<div class=\"zpb-pcard-hd\"><b class=\"' + (r.ovr>=90 ? 'zpb-shm' : (r.ovr>=85 ? 'zpb-vib' : '')) + '\">' + r.name + '</b>")

# ---------------------------------------------------------------- JS-4
# Key players: the winning side's whole roster shimmered; MVP keeps its star
# shimmer, everyone else follows the 90/85 law.
rep('shine',
 "   const shine = star || (winnerSide && sd===winnerSide);",
 "   const pOvr = p.ovr || 0; // w20: the MVP star still shimmers; everyone else follows the tier law\n"
 "   const shine = star ? 'zpb-shm' : (pOvr>=90 ? 'zpb-shm' : (pOvr>=85 ? 'zpb-vib' : ''));")
rep('shine_use',
 "'<span class=\"zpb-kpmain\"><b class=\"' + (shine ? 'zpb-shm' : '') + '\">' + p.name + '</b>'",
 "'<span class=\"zpb-kpmain\"><b class=\"' + shine + '\">' + p.name + '</b>'")

# ---------------------------------------------------------------- JS-5
# Your Full Depth Chart table: 85+ all shimmered; now the tier law.
rep('nmcell',
 "  const nmCell = (e && e.name) ? `<span class=\"${e.ovr>=85?'zpb-shm':''}\">${e.name}</span>` : '—';",
 "  const nmCell = (e && e.name) ? `<span class=\"${e.ovr>=90?'zpb-shm':(e.ovr>=85?'zpb-vib':'')}\">${e.name}</span>` : '—'; // w20 tier law")

# ---------------------------------------------------------------- CSS-1
# Draft board (desktop): contained overflow with hidden scrollbars instead of
# clipped columns — Brave's classic scrollbars + wider metrics pushed the
# board past the viewport and the edge columns (names) vanished.
rep('draftpanel',
 " #viewDraft .panel{overflow-x:visible;}\n"
 " #viewDraft .tablewrap{overflow-x:visible;}",
 " #viewDraft .panel{overflow-x:auto;scrollbar-width:none;}\n"
 " #viewDraft .panel::-webkit-scrollbar{display:none;}\n"
 " #viewDraft .tablewrap{overflow-x:auto;scrollbar-width:none;}\n"
 " #viewDraft .tablewrap::-webkit-scrollbar{display:none;}")

# ---------------------------------------------------------------- CSS-2
# Selector compaction: the preseason lineup selector (and its in-season
# siblings) must fit any viewport.
rep('optcard',
 ".zpb-optcard{display:inline-flex;flex-direction:column;gap:2px;min-width:170px;",
 ".zpb-optcard{display:inline-flex;flex-direction:column;gap:2px;min-width:0;flex:1 1 150px;max-width:100%;")
rep('selbubble',
 ".zpb-selbubble{flex:1 1 300px;border:1px solid var(--rosehair);border-radius:16px;padding:14px 18px;background:var(--glass);text-align:center;}",
 ".zpb-selbubble{flex:1 1 240px;max-width:100%;border:1px solid var(--rosehair);border-radius:16px;padding:12px 14px;background:var(--glass);text-align:center;}")
rep('aggr',
 "#aggrSelect,#scriptAggr{font-size:1.02rem !important;padding:10px 14px !important;}",
 "#aggrSelect,#scriptAggr{font-size:0.95rem !important;padding:8px 12px !important;max-width:100%;}")
rep('lu_row',
 ".zpb-lu-row{display:grid;grid-template-columns:1fr 76px 1fr;align-items:center;gap:8px;padding:6px 8px;border-radius:12px;transition:background .2s ease,transform .2s ease;}",
 ".zpb-lu-row{display:grid;grid-template-columns:1fr 64px 1fr;align-items:center;gap:8px;padding:6px 6px;border-radius:12px;transition:background .2s ease,transform .2s ease;}")
rep('lu_cell',
 ".zpb-lu-cell{font-size:.86rem;min-width:0;padding:4px 8px;border-radius:9px;}",
 ".zpb-lu-cell{font-size:.8rem;min-width:0;padding:4px 6px;border-radius:9px;overflow-wrap:anywhere;}")

# ---------------------------------------------------------------- CSS-3
# Position-rankings names: sized down; rows wrap instead of drifting wide.
rep('prrow',
 ".zpb-prrow{display:grid;grid-template-columns:30px minmax(64px,110px) 1fr 56px;",
 ".zpb-prrow{display:grid;grid-template-columns:26px minmax(56px,92px) 1fr 50px;")
rep('prname',
 ".zpb-prrow .zpb-prname{font-family:'Cinzel Decorative',serif;font-weight:700;font-size:0.92rem;color:var(--tA2,var(--gold3));",
 ".zpb-prrow .zpb-prname{font-family:'Cinzel Decorative',serif;font-weight:700;font-size:0.86rem;color:var(--tA2,var(--gold3));")
rep('gplayer',
 ".zpb-gplayer{white-space:nowrap;",
 ".zpb-gplayer{white-space:normal;")

# ---------------------------------------------------------------- CSS-4
# The w20 block, appended inside the last <style> so it wins the cascade.
W20_CSS = """/* ================= Z-POST-BLUE W20 (twentieth wave) =================
   Owner, 28 Oct: the name-tier law everywhere (90+ shimmer, 85+ vibrant,
   everyone else neutral — all in the team's color); no horizontal scrolling
   anywhere; preseason/season selector compaction; position-rankings name
   size; Brave/Chromium hardening. */
html{scrollbar-gutter:stable;}
@supports (overflow:clip){ body{overflow-x:clip;} }
@supports not ((-webkit-background-clip:text) or (background-clip:text)){
 .zpb-shm{color:var(--tA2,var(--gold3)) !important;-webkit-text-fill-color:var(--tA2,var(--gold3)) !important;background:none !important;}
}
/* neutral names inside team rows wear the team's neutral tone */
.zpb-lu-row :where(.zpb-lu-cell){color:var(--tn,inherit);}
.zpb-pcard :where(.zpb-pcard-hd b){color:var(--tn,var(--text));}
/* position rankings (Groups): names wrap, never drift the row wide */
.zpb-gname{font-size:0.8rem;overflow-wrap:anywhere;}
.zpb-gnum{font-size:0.78rem;}
/* phones: the week-scores strip wraps instead of scrolling sideways */
@media (max-width:760px){
 .zpb-luscores{flex-wrap:wrap;overflow-x:visible;}
 .zpb-lu-row{grid-template-columns:1fr 46px 1fr;}
 .zpb-lu-cell{font-size:0.74rem;padding:3px 5px;}
 .zpb-optcard{flex:1 1 100%;}
 .zpb-selbubble{flex:1 1 100%;}
}
/* 761-1280px: the draft board compresses instead of clipping */
@media (min-width:761px) and (max-width:1280px){
 #draftTable2{font-size:0.86rem;}
 #draftTable2 td{padding-left:4px !important;padding-right:4px !important;}
}"""
rep('w20css',
 ".zpb-footnav .footlink{font-family:'Cinzel Decorative',serif;letter-spacing:.05em;}\n</style>",
 ".zpb-footnav .footlink{font-family:'Cinzel Decorative',serif;letter-spacing:.05em;}\n" + W20_CSS + "</style>")

# ---------------------------------------------------------------- JS-6
# Engine hardening: a setback can never blank the sim silently, and a
# throttled tab can never stall the draft.
W20_JS = """/* ---- w20: engine hardening — never blank, never stuck, always diagnosable (Brave/Chromium) ---- */
try{
 window.addEventListener('error', function(ev){
  if(window.__zpbSetbackShown) return; window.__zpbSetbackShown = true;
  if(!document.body) return;
  var chip = document.createElement('button');
  chip.type = 'button';
  chip.textContent = 'SETBACK \\u2014 TAP FOR THE NOTE';
  chip.style.cssText = 'position:fixed;left:10px;bottom:10px;z-index:2147483000;font:700 11px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;letter-spacing:.06em;color:#3a2a14;background:linear-gradient(135deg,#f3d98b,#d9a94c);border:1px solid #8a5f18;border-radius:999px;padding:8px 12px;cursor:pointer;box-shadow:0 4px 14px rgba(138,95,24,.35);';
  chip.addEventListener('click', function(){
   var note = document.createElement('div');
   note.style.cssText = 'position:fixed;left:10px;right:10px;bottom:52px;z-index:2147483000;max-height:44vh;overflow:auto;font:12px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#26221c;background:#f6efe2;border:1px solid #b3766a;border-radius:12px;padding:10px 12px;';
   note.textContent = 'A display engine reported a setback. The simulation keeps running, but this surface may look off. Details: ' + (ev.message || 'unknown');
   document.body.appendChild(note);
   chip.remove();
  });
  document.body.appendChild(chip);
 });
}catch(e){}
try{
 document.addEventListener('visibilitychange', function(){
  try{
   if(document.visibilityState !== 'visible') return;
   if(typeof draftSim === 'undefined' || !draftSim) return;
   if(draftSim.awaitingUser) return;
   if(draftSim.pos >= draftSim.order.length) return;
   if(typeof stepSlow !== 'function') return;
   if(slowTimer){ clearTimeout(slowTimer); }
   slowTimer = setTimeout(stepSlow, 80); // w20: a throttled tab can never stall the draft
  }catch(e){}
 });
}catch(e){}
"""
# insert before the </script> that closes the main script (the one after the js_tail anchor)
tail_i = data.index("used.add(best[0]); }")
close_i = data.index("</script>", tail_i)
before = data[:close_i]
after = data[close_i:]
assert data.count("used.add(best[0]); }") == 1
data = before + W20_JS + after
applied.append('w20js')

# ---------------------------------------------------------------- post-checks
must_have = [
 "'--tA2:'+pk.accL", "scrollbar-gutter", "__zpbSetbackShown",
 "visibilitychange", ".zpb-gname{font-size:0.8rem", "'zpb-lu-win'+sl2",
 "e.ovr>=90?'zpb-shm':(e.ovr>=85?'zpb-vib':'')", "zpb-lu-win'+sl2",
 "must-not-regress: overflow visible gone",
]
must_not = [
 "const shmL = (l.val>=85 && zL) ? ' zpb-shm'",
 "r.ovr > 85 ? 'zpb-shm'",
 "const shine = star || (winnerSide && sd===winnerSide);",
 "e.ovr>=85?'zpb-shm':''",
 "#viewDraft .panel{overflow-x:visible;}",
 "min-width:170px",
 "white-space:nowrap;",  # gplayer — the only nowrap this exact form had
]
for s in ["';--tA2:'+pk.accL", "scrollbar-gutter:stable", "__zpbSetbackShown", ".zpb-gname{font-size:0.8rem", "'zpb-lu-win'+sl2"]:
    assert s in data, f"post-check missing: {s}"
for s in ["const shmL = (l.val>=85 && zL) ? ' zpb-shm'", "r.ovr > 85 ? 'zpb-shm'",
          "const shine = star || (winnerSide && sd===winnerSide);", "e.ovr>=85?'zpb-shm':''",
          "#viewDraft .panel{overflow-x:visible;}", "min-width:170px;"]:
    assert s not in data, f"post-check still present: {s}"

# JS syntax gate: extract every <script> body and node --check it
import re
scripts = re.findall(r"<script[^>]*>(.*?)</script>", data, re.S)
assert len(scripts) == 3, f"script blocks: {len(scripts)}"
for i, body in enumerate(scripts):
    with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as f:
        f.write(body); tmp = f.name
    r = subprocess.run(['node', '--check', tmp], capture_output=True, text=True)
    os.unlink(tmp)
    assert r.returncode == 0, f"script #{i} failed node --check:\n{r.stderr[:800]}"

os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write(data)
md5 = hashlib.md5(data.encode('utf-8')).hexdigest()
print("applied:", ", ".join(applied))
print(f"W20 build OK  md5={md5}  bytes={len(data.encode('utf-8'))}")
