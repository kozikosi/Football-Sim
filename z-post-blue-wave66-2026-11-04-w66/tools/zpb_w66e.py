#!/usr/bin/env python3
"""w66 chain step 5 — P-174 (Claude QA): the Player Browser becomes an infinite scroll.
The pager (PREV · PAGE X OF 20 · NEXT) retires with its container and the false
"carries the Owner's page law" comment; a sentinel appends the next 60 players while
the user scrolls, inside the panel, forever."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP4_MD5 = '411b16c5ee5896bf31fe9dc7a92d2e3b'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP4_MD5, 'step-4 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:80]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- 1 · the state: playerShow replaces playerPage ----
rep("let playerPage = 1; const PLAYER_PAGE_SIZE = 60; // w63 (Muse P0): the browser paginates — 60 a page keeps the DOM light (the one-scrollable-panel",
    "const PLAYER_PAGE_SIZE = 60; let playerShow = PLAYER_PAGE_SIZE; // w66 (P-174, Claude QA): the browser is an INFINITE SCROLL — the first 60 render, the sentinel appends 60 more while you scroll; no PREV/NEXT, no PAGE X OF Y (the Owner rejected page numbers). 60 a chunk keeps the DOM light (the one-scrollable-panel",
    'state swap', 1)

# ---- 2 · the window: show the first N rows ----
rep(''' // Z-post-blue pagination: 15 rows per page (UI only; filter/sort data unchanged)
 const sig = JSON.stringify([ [...playerFilters.pos].sort().join('|'), playerFilters.team, playerFilters.search, playerSort.col, playerSort.dir ]);
 if(sig !== renderPlayers._sig){ renderPlayers._sig = sig; playerPage = 1; }
 const total = Math.max(1, Math.ceil(rows.length / PLAYER_PAGE_SIZE));
 if(playerPage > total) playerPage = total;
 if(playerPage < 1) playerPage = 1;
 const start = (playerPage - 1) * PLAYER_PAGE_SIZE;
 const pageRows = rows.slice(start, start + PLAYER_PAGE_SIZE);''',
    ''' // w66 (P-174): infinite scroll window — filters or a new sort rebuild from the first chunk
 const sig = JSON.stringify([ [...playerFilters.pos].sort().join('|'), playerFilters.team, playerFilters.search, playerSort.col, playerSort.dir ]);
 if(sig !== renderPlayers._sig){ renderPlayers._sig = sig; playerShow = PLAYER_PAGE_SIZE; }
 if(playerShow > rows.length) playerShow = rows.length;
 const pageRows = rows.slice(0, playerShow);''',
    'window swap', 1)

# ---- 3 · the pager retires; the sentinel + observer take over ----
OLD_PAGER = ''' const pager = document.getElementById('playerPager');
 if(pager){
  pager.innerHTML = '';
  if(total > 1){
   const mk = (lbl, fn, dis) => { const b = document.createElement('button'); b.className = 'pagbtn'; b.type = 'button'; b.textContent = lbl; b.disabled = !!dis; b.addEventListener('click', () => { fn(); try{ const t = document.getElementById('playerTable'); if(t) t.scrollTop = 0; }catch(e){} }); return b; };
   pager.appendChild(mk('\\u2039 PREV', () => { playerPage--; renderPlayers(); }, playerPage <= 1));
   const info = document.createElement('span'); info.className = 'paginfo';
   info.textContent = `PAGE ${playerPage} OF ${total} \\u00b7 SHOWING ${start + 1}\\u2013${Math.min(start + PLAYER_PAGE_SIZE, rows.length)} OF ${rows.length}`;
   pager.appendChild(info);
   pager.appendChild(mk('NEXT \\u203a', () => { playerPage++; renderPlayers(); }, playerPage >= total));
  }
 }'''
NEW_PAGER = ''' // w66 (P-174, Claude QA): the infinite-scroll sentinel — scrolls the next 60 in, quietly
 if(renderPlayers._obs){ try{ renderPlayers._obs.disconnect(); }catch(e){} renderPlayers._obs = null; }
 if(rows.length > playerShow && body){
  const sent = document.createElement('tr');
  sent.id = 'pbSentinel'; sent.setAttribute('aria-hidden', 'true');
  sent.innerHTML = '<td colspan="6" style="height:2px;padding:0;border:0;line-height:0;"></td>';
  body.appendChild(sent);
  renderPlayers._obs = new IntersectionObserver(es=>{
   es.forEach(en=>{
    if(!en.isIntersecting) return;
    try{ renderPlayers._obs.disconnect(); }catch(e){}
    playerShow = Math.min(rows.length, playerShow + PLAYER_PAGE_SIZE);
    renderPlayers();
   });
  }, { rootMargin: '160px' });
  renderPlayers._obs.observe(sent);
 }'''
rep(OLD_PAGER, NEW_PAGER, 'sentinel law', 1)

# ---- 4 · the pager container leaves the page ----
rep('   <div class="pager" id="playerPager" aria-label="Player browser pages"></div>\n', '', 'pager div out', 1)

# ---- 5 · the false comment becomes the truth ----
rep('''/* w65 (Muse P0, measured): the old "no stray pager" law hid the browser's real pager too —
   the w63 pager (PREV · PAGE X OF 20 · NEXT) now shows and carries the Owner's page law. */''',
    '''/* w66 (P-174, Claude QA): the Owner rejected page numbers — the browser is an infinite
   scroll now, and the old "no stray pager" law finally matches what the page does. */''',
    'comment truth', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 5 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
