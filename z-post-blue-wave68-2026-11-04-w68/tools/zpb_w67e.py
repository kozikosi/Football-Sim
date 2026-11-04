#!/usr/bin/env python3
"""w67 chain step 5 — Owner UI 8: the upper line is one left-aligned cluster.
NEW DRAFT / 100 SEASONS / SIM GAME / SIM SEASON (/ SIM PLAYOFFS / BACK TO SEASON) sit
shoulder to shoulder; the 20-0 line keeps the far right; the 100-SEASONS wrapper stops
inflating its own box. Asserts the previous step's md5."""
import hashlib

SRC = '/home/z/my-project/work/w67/Football-Sim-Z-post-blue-w67.html'
PREV_MD5 = '9b858327c5cfb738b0883cd48026b821'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == PREV_MD5, 'previous step md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- 1 · the wrapper clusters left instead of space-between (SIM SEASON stopped floating centered) ----
rep('<div class="zpb-cygops" style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;">',
    '<div class="zpb-cygops" style="display:flex;justify-content:flex-start;align-items:center;gap:10px;flex-wrap:wrap;"> <!-- W67 (Owner): ONE left-aligned cluster - the sim doors sit right next to 100 SEASONS, never centered mid-panel -->',
    'upper line clusters left')

# ---- 2 · the 20-0 line keeps the far right ----
rep('<p class="dsub zpb-cygdsub" style="margin:0;">',
    '<p class="dsub zpb-cygdsub" style="margin:0 0 0 auto;">',
    '20-0 line rides right')

# ---- 3 · the 100-SEASONS wrapper stops inflating its box inside the cluster ----
rep(''' const d = document.createElement('div'); d.style.cssText = 'margin:0 0 12px;text-align:right;';
 d.innerHTML = `<button class="tabbtn" id="sim100Btn">100 SEASONS</button>${league100?' <button class="tabbtn" id="sim100Re">Re-run</button>':''}`;
 const ops = document.getElementById('zpbDraftOps'); if(ops) ops.appendChild(d); else container.insertBefore(d, container.firstChild);''',
    ''' const ops = document.getElementById('zpbDraftOps');
 const d = document.createElement('div'); d.style.cssText = ops ? 'margin:0;text-align:left;display:inline-flex;gap:8px;align-items:center;' : 'margin:0 0 12px;text-align:right;'; // W67 (Owner): inside the upper-line cluster the 100-SEASONS box stops inflating itself (it read 42px tall next to 34px buttons)
 d.innerHTML = `<button class="tabbtn zpb-ctasmall" id="sim100Btn">100 SEASONS</button>${league100?' <button class="tabbtn zpb-ctasmall" id="sim100Re">Re-run</button>':''}`; // W67 (Owner): the 100-SEASONS door wears the SIM GAME size - the whole upper line reads one height
 if(ops) ops.appendChild(d); else container.insertBefore(d, container.firstChild);''',
    '100 seasons wrapper neutral')

# ---- 4 · the LIVE add100Button (the later reassignment wins) joins the ctasmall family ----
rep(" b.className = 'tabbtn'; b.id = 'sim100Btn'; b.textContent = '100 SEASONS';",
    " b.className = 'tabbtn zpb-ctasmall'; b.id = 'sim100Btn'; b.textContent = '100 SEASONS'; // W67 (Owner): the reassignment is the button that ships - it wears the SIM GAME size like every door on the line",
    'live 100-seasons door ctasmall')

open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step5 done -> {SRC} md5 {h} bytes {len(src.encode("utf-8"))}')
