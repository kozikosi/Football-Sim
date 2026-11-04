#!/usr/bin/env python3
"""w68 chain step 3 — Owner item 1: the name ladder reads FULL NAMES at full size.
avail() measures the carrier's true available line (flex children no longer measure their
own shrunken box — the CL lock dies), and at window >= 1025px the ladder never drops below
the full name. The poschip stops shrinking so a wrapped name cannot squeeze it."""
import hashlib

SRC = '/home/z/my-project/work/w68/Football-Sim-Z-post-blue-w68.html'
STEP2_MD5 = '305565bd66e508422464aa5d2613d11a'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP2_MD5, 'step2 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- avail(): the true available line for content-sized flex children ----
rep(""" function avail(el){ var w = el.clientWidth; if(!w){ var p = el.parentElement; w = p ? p.clientWidth : 0; } return w; }""",
    """ function avail(el){
   var w = el.clientWidth;
   try{ // W68 (Owner): a content-sized flex child measured ITSELF — a once-shortened name
    var p = el.parentElement; // shrank its own box and locked (a preview name read CL forever,
    var pd = p ? getComputedStyle(p).display : ''; // every scan re-measuring the shrunken box).
    var fb = getComputedStyle(el).flexBasis; // Measure the TRUE available line instead:
    if((pd==='flex'||pd==='inline-flex') && (fb==='auto'||fb==='content') && p){
     var gap = parseFloat(getComputedStyle(p).columnGap) || 0;
     var tot = p.clientWidth, sibs = 0, n = 0;
     for(var i=0;i<p.children.length;i++){ if(p.children[i]===el) continue; sibs += p.children[i].getBoundingClientRect().width; n++; }
     var av = tot - sibs - gap*n;
     if(av > 0) return av;
    }
   }catch(e){}
   if(!w){ var p2 = el.parentElement; w = p2 ? p2.clientWidth : 0; }
   return w;
  } // W68 (Owner): stateless and self-healing — a regrown window restores the fuller form""",
    'avail measures the true line')

# ---- the ladder gains the full-size floor ----
rep(""" function ladder(full, fits){
  var p = parse(full);
  if(!p.nm.length) return { text: full, mode: 'one' };
  if(fits(p.nm.join(' ') + p.rest)) return { text: full, mode: 'one' };
  if(fits(longestTok(p.nm))) return { text: p.nm.join(' ') + p.rest, mode: 'wrap' };
  var lt = p.nm.slice();
  while(lt.length > 1 && SUF.test(lt[lt.length-1].replace(/\./g,''))) lt.pop();
  var ln = lt[lt.length-1] || p.nm[p.nm.length-1] || '';
  if(fits(ln) || fits(longestTok([ln]))) return { text: ln + p.rest, mode: 'one' };""",
    """ function ladder(full, fits, floor){ // W68 (Owner): the third arg is the full-size floor
  var p = parse(full);
  if(!p.nm.length) return { text: full, mode: 'one' };
  if(fits(p.nm.join(' ') + p.rest)) return { text: full, mode: 'one' };
  if(fits(longestTok(p.nm))) return { text: p.nm.join(' ') + p.rest, mode: 'wrap' };
  var lt = p.nm.slice();
  while(lt.length > 1 && SUF.test(lt[lt.length-1].replace(/\./g,''))) lt.pop();
  var ln = lt[lt.length-1] || p.nm[p.nm.length-1] || '';
  if(floor) return { text: p.nm.join(' ') + p.rest, mode: 'wrap' }; // W68 (Owner): at full size the FULL name (vertical allowed) is the floor — never last names, never initials
  if(fits(ln) || fits(longestTok([ln]))) return { text: ln + p.rest, mode: 'one' };""",
    'ladder floor')

rep("""  var d = ladder(full, function(txt){ return widthOf(txt, el) <= w; });""",
    """  var d = ladder(full, function(txt){ return widthOf(txt, el) <= w; }, (window.innerWidth||1280) >= 1025 ? 'wrap' : null); // W68 (Owner): window >= 1025 = full size — the full name is the floor""",
    'fit passes the floor')

# ---- the poschip never shrinks under a wrapped name ----
rep(""".zpb-poschip{font-size:.62rem;font-weight:800;letter-spacing:.1em;padding:3px 8px;border-radius:999px;border:1px solid var(--zrb,var(--accent));color:var(--zrb,var(--accent));}""",
    """.zpb-poschip{font-size:.62rem;font-weight:800;letter-spacing:.1em;padding:3px 8px;border-radius:999px;border:1px solid var(--zrb,var(--accent));color:var(--zrb,var(--accent));flex:0 0 auto;white-space:nowrap;} /* W68 (Owner): a wrapping name cannot squeeze the chip */""",
    'poschip unshrinking')

open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step3 done -> {SRC} md5 {h} bytes {len(src.encode("utf-8"))}')
