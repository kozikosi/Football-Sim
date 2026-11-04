#!/usr/bin/env python3
"""w69 chain step 8 — the battery caught the tier reading the FLEX-PENALIZED book ovr
(Minkah 89-at-slot vs his true 89+6): the Owner's "Only 90+" means the player's TRUE OVR
(the number the draft and the board show). window.zpbTrueOvr resolves the dataset ovr and
the card tiers (stat cards, the award winner cards, the preview star face-offs) read it.
Input: step 7's md5."""
import hashlib

SRC = '/home/z/my-project/work/w69/Football-Sim-Z-post-blue-w69.html'
PREV_MD5 = '8a6733762d34a7aaaaa5921ed26c60c9'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == PREV_MD5, 'step-7 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# 1 · the resolver, planted beside the pack code (PLAYERS is global by then)
rep("""function zpbSoft(hex,bg){""",
    """window.zpbTrueOvr = function(name){ // W69 (Owner, UI 3): the tier law reads the player's TRUE OVR - the book rows carry the flex-penalized slot ovr, the draft board's number is the law
 try{
  if(name == null) return null;
  if(!window.__zpbTrueOvrMap){ const m = {}; (typeof PLAYERS !== 'undefined') && PLAYERS.forEach(q => { if(m[q[0]] == null) m[q[0]] = q[3]; }); window.__zpbTrueOvrMap = m; }
  const v = window.__zpbTrueOvrMap[name];
  return v != null ? v : null;
 }catch(err){ return null; }
};
function zpbSoft(hex,bg){""",
    'true-ovr resolver')

# 2 · the stat cards (the live card renderer) tier from the true ovr
rep("""   + '<div class="zpb-pcard-hd"><b class="zpb-gname ' + (r.ovr>=90 ? 'zpb-shm' : (r.ovr>=85 ? 'zpb-vib' : '')) + '">' + r.name + '</b><span class="zpb-poschip">' + r.group + '</span></div>'""",
    """   + '<div class="zpb-pcard-hd"><b class="zpb-gname ' + (function(){ const _t = (window.zpbTrueOvr ? zpbTrueOvr(r.name) : null); const _o = (_t != null) ? _t : r.ovr; return _o>=90 ? 'zpb-shm' : (_o>=85 ? 'zpb-vib' : ''); })() + '">' + r.name + '</b><span class="zpb-poschip">' + r.group + '</span></div>' // W69 (Owner, UI 3): the tier reads the TRUE ovr (the book row carries the flex-penalized slot ovr)""",
    'stat card true tier')

# 3 · the regular award winner cards
rep("""   + '<b class="zpb-gname '+((rec&&rec.ovr!=null)?(rec.ovr>=90?'zpb-shm':(rec.ovr>=85?'zpb-vib':'')):(star?'zpb-shm':''))+'">'+name+'</b>' // W69 (Owner, UI 3): the card name rides the TIER LAW from the winner's own OVR - 90+ shimmers, 85+ bold, the rest the neutral 0.50 ink; the AP1-gold overlay retires from the cards (the chips keep it; the coach's YOU keeps the w66 shimmer; the w68 glow stays on the card)""",
    """   + '<b class="zpb-gname '+((function(){ const _t = (window.zpbTrueOvr ? zpbTrueOvr(name) : null); const _o = (_t != null) ? _t : ((rec&&rec.ovr!=null)?rec.ovr:null); return (_o!=null) ? (_o>=90?'zpb-shm':(_o>=85?'zpb-vib':'')) : (star?'zpb-shm':''); })())+'">'+name+'</b>' // W69 (Owner, UI 3): the tier reads the winner's TRUE ovr - 90+ shimmers, 85+ bold, the rest the neutral 0.50 ink; the AP1-gold overlay retires from the cards (the chips keep it; the coach's YOU keeps the w66 shimmer; the w68 glow stays on the card)""",
    'regular award true tier')

# 4 · the playoff award winner cards
rep("""        return '<b class="zpb-gname zpb-awname '+((_rec&&_rec.ovr!=null)?(_rec.ovr>=90?'zpb-shm':(_rec.ovr>=85?'zpb-vib':'')):(star?'zpb-shm':''))+'">'+p.name+'</b>' // W69 (Owner, UI 3): the tier law from the winner's own OVR - the AP1 overlay retires from the cards (the glow stays on the card)""",
    """        return '<b class="zpb-gname zpb-awname '+((function(){ const _t = (window.zpbTrueOvr ? zpbTrueOvr(p.name) : null); const _o = (_t != null) ? _t : ((_rec&&_rec.ovr!=null)?_rec.ovr:null); return (_o!=null) ? (_o>=90?'zpb-shm':(_o>=85?'zpb-vib':'')) : (star?'zpb-shm':''); })())+'">'+p.name+'</b>' // W69 (Owner, UI 3): the tier reads the winner's TRUE ovr - the AP1 overlay retires from the cards (the glow stays on the card)""",
    'playoff award true tier')

# 5 · the preview star face-offs ride the true ovr too (the same tier law family)
rep("""    const star90 = (r.ovr||0)>=90, col = colOf(team);""",
    """    const _t90 = (window.zpbTrueOvr ? zpbTrueOvr(r.name) : null); const star90 = ((_t90 != null) ? _t90 : (r.ovr||0))>=90, col = colOf(team); // W69 (Owner, UI 3): the star tier reads the TRUE ovr""",
    'preview star true tier')
rep("""    const star85 = (r.ovr||0)>=85;""",
    """    const _t85 = (window.zpbTrueOvr ? zpbTrueOvr(r.name) : null); const star85 = ((_t85 != null) ? _t85 : (r.ovr||0))>=85; // W69 (Owner, UI 3): the true ovr""",
    'preview star true tier 85')

# post-checks
assert src.count('window.zpbTrueOvr = function') == 1
assert src.count('zpbTrueOvr(r.name)') == 3  # stat card + preview 90 + preview 85
assert src.count('zpbTrueOvr(name)') == 1
assert src.count('zpbTrueOvr(p.name)') == 1
open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step8 done -> md5 {h} bytes {len(src.encode("utf-8"))}')
