#!/usr/bin/env python3
"""w66 chain step 18 — the N8 law reaches the review page's SIM PLAYOFFS door (the w47
run path): a shared zpbPlayoffEndScreen helper mounts the Super Bowl screen only when the
user's team actually made it, and the solemn run-ends cinematic otherwise."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP17_MD5 = '70ead5fc196040bc39e5d62ed39083e1'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP17_MD5, 'step-17 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- the caller's fallback (no story — the user missed the playoffs) ----
rep("else { window.__zpbPoRunHold = false; if(window.__zpbSBFinPending && seasonState && seasonState.champion){ window.__zpbSBFinPending = false; try{ zpbPostSuperBowlCine(); }catch(err){} } }",
    "else { window.__zpbPoRunHold = false; if(window.zpbPlayoffEndScreen) window.zpbPlayoffEndScreen(); } // w66 (Owner): the end screen follows the N8 law — the Super Bowl screen only when the user's team made it",
    'caller fallback end screen', 1)

# ---- the run cine's reduced-motion path ----
rep("""   window.__zpbPoRunHold = false;
   if(window.__zpbSBFinPending){ window.__zpbSBFinPending = false; try{ zpbPostSuperBowlCine(); }catch(err){} }
   return;""",
    """   window.__zpbPoRunHold = false;
   if(window.zpbPlayoffEndScreen) window.zpbPlayoffEndScreen(); // w66 (Owner): the N8 end screen
   return;""",
    'reduced motion end screen', 1)

# ---- the run cine's story-end (it used to flow into the champion storm) ----
rep("""    if(window.__zpbSBFinPending && seasonState && seasonState.champion){
     window.__zpbSBFinPending = false;
     try{ zpbPostSuperBowlCine(); }catch(err){}
    }""",
    """    if(window.__zpbSBFinPending && seasonState && seasonState.champion){
     if(window.zpbPlayoffEndScreen) window.zpbPlayoffEndScreen(); // w66 (Owner): the run flows into the N8 end screen — the champion storm only for a Super Bowl participant
    }""",
    'story end screen', 1)

# ---- the run cine's catch path ----
rep(""" }catch(err){
  window.__zpbPoRunHold = false;
  try{ if(window.__zpbSBFinPending){ window.__zpbSBFinPending = false; zpbPostSuperBowlCine(); } }catch(e2){}
 }""",
    """ }catch(err){
  window.__zpbPoRunHold = false;
  try{ if(window.__zpbSBFinPending && window.zpbPlayoffEndScreen){ window.zpbPlayoffEndScreen(); } }catch(e2){}
 }""",
    'catch end screen', 1)

# ---- the shared helper (lazy-referenced everywhere, defined once) ----
CLOSE = '\n</body>\n</html>'
PAYLOAD = '''
<script id="zpb-w66r-js">
// w66 (Owner, N8): ONE end-screen decider for every sim-playoffs path — the champion storm
// only when the user's team played the Super Bowl; the solemn run-ends cinematic otherwise.
window.zpbPlayoffEndScreen = function(){
 try{
  const S = seasonState; if(!S || !S.champion) return;
  if(!window.__zpbSBFinPending) return;
  window.__zpbSBFinPending = false;
  const u = seasonUserTeam();
  const sb = ((S.playoffRounds && S.playoffRounds.superbowl) || [])[0] || null;
  const inSB = !!(sb && (sb.home===u || sb.away===u));
  if(inSB){ try{ zpbPostSuperBowlCine(); }catch(err){} }
  else if(typeof window.zpbPlayoffElimCine==='function'){ try{ window.zpbPlayoffElimCine(); }catch(err){} }
 }catch(err){}
};
</script>
</body>
</html>'''
rep(CLOSE, PAYLOAD, 'end screen helper payload', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 18 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
