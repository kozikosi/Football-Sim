#!/usr/bin/env python3
"""w69 chain step 4 — UI 5: the pick-list rows carry the tier classes (90+ shimmer /
85+ bold from the player's own OVR) on the menu rows AND the closed face; the Cinzel +
ink + hover CSS landed in step 1's plant. Input: step 3's md5."""
import hashlib

SRC = '/home/z/my-project/work/w69/Football-Sim-Z-post-blue-w69.html'
PREV_MD5 = '0000366757839c2230586779b898c7d4'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == PREV_MD5, 'step-3 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# --- zpbPickList: the row builds the tier class; the doc comment names it ---
rep(""" // items: [{v, name, num}] — the closed box shows the name only; the opened menu shows name + number.""",
    """ // items: [{v, name, num, cls}] — the closed box shows the name only; the opened menu shows name + number. W69 (Owner, UI 5): the rows carry the tier class (90+ shimmer / 85+ bold).""",
    'picklist doc comment')

rep("""  r.innerHTML = '<b>'+((_lnc[_ln]>1)?it.name:_ln)+'</b><span class="zpb-picknum">'+(it.num!=null?it.num:'')+'</span>';""",
    """  r.innerHTML = '<b class="'+(it.cls||'')+'">'+((_lnc[_ln]>1)?it.name:_ln)+'</b><span class="zpb-picknum">'+(it.num!=null?it.num:'')+'</span>'; // W69 (Owner, UI 5): the tier law rides the menu rows""",
    'picklist row tier class')

# --- the lineup editor's items carry the tier from the player's own OVR (not the flexed effOvr) ---
rep("""  const poolInfo = name=>{ try{ const p = Object.values(zpbStageOf(roster).map).find(q=>q && q[0]===name); return p ? {pos:p[1], num:Math.round(effOvr(p, sl))} : null; }catch(err){ return null; } }; // w36 (R4, Owner): the OPEN menu carries the preferred position beside the OVR — the closed box keeps the name-only law
  const items = Array.from(sel.options).map(o=>{ const inf = poolInfo(o.value); return {v:o.value, name:o.value, num:inf ? (inf.pos + ' \\u00b7 ' + inf.num) : ''}; });""",
    """  const poolInfo = name=>{ try{ const p = Object.values(zpbStageOf(roster).map).find(q=>q && q[0]===name); return p ? {pos:p[1], num:Math.round(effOvr(p, sl)), ovr:p[3]} : null; }catch(err){ return null; } }; // w36 (R4, Owner): the OPEN menu carries the preferred position beside the OVR — the closed box keeps the name-only law
  const items = Array.from(sel.options).map(o=>{ const inf = poolInfo(o.value); return {v:o.value, name:o.value, num:inf ? (inf.pos + ' \\u00b7 ' + inf.num) : '', cls:(inf&&inf.ovr!=null)?(inf.ovr>=90?'zpb-shm':(inf.ovr>=85?'zpb-vib':'')):''}; }); // W69 (Owner, UI 5): the tier rides the menu rows from the player's own OVR""",
    'lineup items tier')

# --- the lineup editor's closed face carries the tier too ---
rep("""  }, cur ? '<span class="zpb-pickname">'+cur[0]+'</span>' : '<span class="zpb-pickname">·</span>');""",
    """  }, cur ? '<span class="zpb-pickname '+(cur[3]>=90?'zpb-shm':(cur[3]>=85?'zpb-vib':''))+'">'+cur[0]+'</span>' : '<span class="zpb-pickname">·</span>'); // W69 (Owner, UI 5): the closed face follows the tier law""",
    'lineup face tier')

# --- post-checks ---
assert src.count("cls:(inf&&inf.ovr!=null)?(inf.ovr>=90?'zpb-shm'") == 1
assert "it.cls||''" in src
open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step4 done -> md5 {h} bytes {len(src.encode("utf-8"))}')
