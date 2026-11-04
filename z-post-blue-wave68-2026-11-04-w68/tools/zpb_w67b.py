#!/usr/bin/env python3
"""w67 chain step 2 — Owner UI 2: the player browser stops flashing on small screens.
#playerTable becomes data-nostack (the Owner prefers the smaller, narrower table) and the
phone-stacker counts columns colspan-aware (the P-174 sentinel row read as one cell and
flipped the fit verdict every pass). Asserts the previous step's md5."""
import hashlib

SRC = '/home/z/my-project/work/w67/Football-Sim-Z-post-blue-w67.html'
PREV_MD5 = '517c9c76d113de24bdad5edee957e7a9'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == PREV_MD5, 'previous step md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- 1 · the player table never stacks (the Owner keeps the smaller, narrower panel) ----
rep('<table id="playerTable">',
    '<table id="playerTable" data-nostack="1"> <!-- W67 (Owner): the browser keeps the smaller, narrower table at every width - the stacked cards made the panel flash bigger -->',
    'player table data-nostack')

# ---- 2 · the stacker counts columns colspan-aware (the root cause of the flip) ----
rep('''    const cols = t.rows.length ? t.rows[t.rows.length-1].cells.length : 0;''',
    '''    const cols = t.rows.length ? Array.from(t.rows[t.rows.length-1].cells).reduce((a,c)=>a+(c.colSpan||1),0) : 0; // W67 (Owner): colspan-aware - the infinite-scroll sentinel row (colspan=6) read as ONE cell, so a stacked table with a sentinel "fit with 1 column" and un-stacked itself, then re-stacked on the next pass: the browser flashed between the two panels forever''',
    'colspan-aware cols')

# ---- 3 · the compact table never cuts a column silently ----
rep('#viewPlayers #playerTable{flex:1 1 auto;overflow-y:auto;display:block;max-height:none;}',
    '#viewPlayers #playerTable{flex:1 1 auto;overflow-y:auto;overflow-x:auto;display:block;max-height:none;} /* W67 (Owner): the browser stays the smaller, narrower table at every width - the SPD column scrolls into view on a phone instead of clipping silently */',
    'browser table scrolls x')

open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step2 done -> {SRC} md5 {h} bytes {len(src.encode("utf-8"))}')
