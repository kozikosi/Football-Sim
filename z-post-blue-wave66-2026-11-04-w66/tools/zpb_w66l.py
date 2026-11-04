#!/usr/bin/env python3
"""w66 chain step 12 — N1: the draft board's fills cell becomes ONE label ("FS (-10 FLEX)")
inside a beautiful custom dropdown (the homepage team-picker's principles: Cinzel, 0.5 team
ink, rosehair) listing every open spot the player could fill; the native select retires.
N2: the roster summary sentence becomes two team-tinted Cinzel badges."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP11_MD5 = 'c07988f29298000922297f4ec549acdf'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP11_MD5, 'step-11 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- N1a · the fills label: one label, the flex cost inside it ----
rep("const flexTxt = r=> r.flex ? ` <span class=\"narr\">Flex ${LABELS[r.slot]||r.slot} (-${r.pen})</span>` : '';",
    "const flexLbl = (s0,flex,pen)=> (LABELS[s0]||s0) + (flex ? ' (-'+pen+' FLEX)' : ''); // w66 (Owner): ONE label — \"FS (-10 FLEX)\" — the old \"FS Flex FS (-10)\" double-speak retires",
    'flex label law', 1)

rep("const fills = r.slot ? (opts.length>1 ? `<a href=\"#\" class=\"slotchg zpb-fillab\" data-chg=\"${r.p[0].replace(/\"/g,'&quot;')}\" title=\"Choose which open spot he fills  ·  click to change it\">${LABELS[r.slot]||r.slot}</a>${flexTxt(r)}` : `${LABELS[r.slot]||r.slot}${flexTxt(r)}`) : 'Full';",
    "const fills = r.slot ? (opts.length>1 ? `<button type=\"button\" class=\"zpb-slotdd zpb-fillab\" data-chg=\"${r.p[0].replace(/\"/g,'&quot;')}\" title=\"Choose which open spot he fills  ·  click to open the dropdown\">${flexLbl(r.slot,r.flex,r.pen)}</button>` : flexLbl(r.slot,r.flex,r.pen)) : 'Full';",
    'fills dropdown trigger', 1)

# ---- N1b · the click handler opens the custom popup (the native select retires) ----
rep("""  const c = e.target.closest('[data-chg]');
  if(c){ e.preventDefault(); const name = c.dataset.chg, p = draftSim.pool.find(x=>x[0]===name); if(!p) return;
   const roster = draftSim.rosters[draftSim.userIndex], cur = draftUI.slotPick[name];
   const sl = document.createElement('select'); sl.className = 'slotsel';
   openSlotsFor(roster, p).forEach(s=>{ const o = document.createElement('option'); o.value = s; const pen = flexPenaltyFor(p[1], s); o.textContent = (LABELS[s]||s) + (pen ? ' (-'+pen+')' : ''); if(s===cur) o.selected = true; sl.appendChild(o); });
   sl.addEventListener('change', ()=>{ draftUI.slotPick[name] = sl.value; renderDraftBoard2(); });
   c.replaceWith(sl); sl.focus();
   try{ if(sl.showPicker) sl.showPicker(); }catch(err){} // w32 (Owner): ONE click opens the menu
   }
 };""",
    """  const c = e.target.closest('[data-chg]');
  if(c){ e.preventDefault(); if(window.zpbSlotPop) window.zpbSlotPop(c, c.dataset.chg); } // w66 (Owner): ONE click opens the beautiful dropdown — the homepage team-picker's principles; the raw browser select is retired
 };""",
    'slot popup handler', 1)

# ---- N1c · the popup builder + N2 badges CSS/JS payload ----
CLOSE = '\n</body>\n</html>'
PAYLOAD = '''
<style id="zpb-w66l-css">
/* ============ Z-POST-BLUE W66 · OWNER ROUND 2 ============ */
/* N1 (Owner): the fills dropdown — the homepage team-picker's style principles: Cinzel,
   0.5-strength team ink (the halfway --tTxM law the fills cell already rides), rosehair chrome. */
.zpb-slotdd{appearance:none;-webkit-appearance:none;font-family:'Cinzel','Bodoni Moda',Georgia,serif;font-weight:700;font-size:.72rem;letter-spacing:.04em;
 color:var(--tTxM,var(--tA2,var(--selfg)));background:color-mix(in srgb,var(--tTxM,var(--tA2,var(--selfg))) 8%,transparent);
 border:1px solid color-mix(in srgb,var(--tTxM,var(--tA2,var(--selfg))) 40%,transparent);border-radius:9px;
 padding:2px 20px 2px 8px;cursor:pointer;position:relative;white-space:nowrap;transition:border-color .15s ease,box-shadow .15s ease;}
.zpb-slotdd::after{content:"";position:absolute;right:7px;top:50%;width:6px;height:6px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;transform:translateY(-70%) rotate(45deg);}
.zpb-slotdd:hover,.zpb-slotdd:focus{border-color:var(--tTxM,var(--tA2,var(--accent)));outline:none;box-shadow:0 0 10px color-mix(in srgb,var(--tTxM,var(--tA2,var(--accent))) 30%,transparent);}
.zpb-slotpop{position:fixed;z-index:130;min-width:180px;max-width:280px;padding:6px;border-radius:12px;border:1px solid var(--rosehair,var(--border));background:var(--panel);
 box-shadow:0 18px 44px rgba(60,30,40,.25);animation:zpbpopin .22s ease;}
.zpb-slotpop-h{font-size:.56rem;letter-spacing:.16em;font-weight:800;color:var(--sub);padding:4px 8px 5px;text-align:left;font-family:'Cinzel','Bodoni Moda',Georgia,serif;}
.zpb-slotopt{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;padding:7px 10px;border:0;background:transparent;border-radius:9px;cursor:pointer;
 font-family:'Cinzel','Bodoni Moda',Georgia,serif;font-weight:700;font-size:.78rem;text-align:left;color:var(--zaL,var(--text));transition:background .18s ease,transform .18s ease;}
:root[data-theme="dark"] .zpb-slotopt{color:var(--zaD,var(--zaL,var(--text)));}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-slotopt{color:var(--zaD,var(--zaL,var(--text)));} }
.zpb-slotopt:hover{background:var(--zw,rgba(120,120,120,.12));transform:translateX(3px);}
.zpb-slotopt i{font-style:normal;font-size:.6rem;letter-spacing:.08em;color:var(--sub);}
/* N2 (Owner): the roster summary reads as two badges — the plaintext sentence retires.
   Team-themed (the neutral user-team ink), Cinzel, the 0.5 law on the label ink. */
.zpb-rbadge{display:inline-flex;align-items:baseline;gap:7px;padding:5px 14px;border-radius:999px;
 border:1px solid color-mix(in srgb,var(--tTxM,var(--tA2,var(--selfg))) 42%,transparent);
 background:color-mix(in srgb,var(--tTxM,var(--tA2,var(--selfg))) 9%,transparent);
 font-family:'Cinzel','Bodoni Moda',Georgia,serif;}
.zpb-rbadge b{font-size:1.02rem;font-weight:800;color:var(--tTxM,var(--tA2,var(--selfg)));font-variant-numeric:tabular-nums;letter-spacing:.03em;}
.zpb-rbadge i{font-style:normal;font-size:.6rem;letter-spacing:.14em;color:var(--tTxM,var(--tA2,var(--selfg)));text-transform:uppercase;}
#draftRosterTotal{display:flex;gap:8px;flex-wrap:wrap;align-items:center;}
</style>
<script id="zpb-w66l-js">
// ============ Z-POST-BLUE W66 · OWNER ROUND 2 JS ============
// N1 (Owner): the fills dropdown — ONE click opens a floating list of every open spot the
// player could fill (natural first, flex costs honest), each row in the user team's 0.5 ink.
window.zpbSlotPop = function(anchor, name){
 try{
  document.querySelectorAll('.zpb-slotpop').forEach(x=>x.remove());
  const p = draftSim.pool.find(x=>x[0]===name); if(!p) return;
  const roster = draftSim.rosters[draftSim.userIndex]; if(!roster) return;
  const slots = openSlotsFor(roster, p); if(!slots || slots.length<2) return;
  const st = (typeof zpbPackFor==='function' && window.zpbState && zpbState.teamName) ? zpbPackFor(zpbState.teamName) : null;
  const ov = st ? '--zaL:'+(st.txM||st.txd)+';--zaD:'+st.txd+';--zw:color-mix(in srgb,'+st.accL+' 13%, transparent)' : '--zw:rgba(120,120,120,.12)';
  const pop = document.createElement('div'); pop.className = 'zpb-slotpop'; pop.setAttribute('role','listbox');
  pop.innerHTML = '<div class="zpb-slotpop-h">DRAFT HIM INTO</div>' + slots.map(s=>{
   const pen = flexPenaltyFor(p[1], s);
   const nat = (typeof isNaturalSlot==='function') ? isNaturalSlot(p[1], s) : !pen;
   return '<button type="button" class="zpb-slotopt" data-slotsel="'+s+'" style="'+ov+'"><span>'+(LABELS[s]||s)+'</span><i>'+(pen ? ('-'+pen+' FLEX') : (nat ? 'NATURAL' : ''))+'</i></button>';
  }).join('');
  document.body.appendChild(pop);
  const r = anchor.getBoundingClientRect();
  const pw = pop.offsetWidth, ph = pop.offsetHeight;
  const L = Math.min(window.innerWidth - pw - 10, Math.max(10, r.left));
  let T = r.bottom + 6; if(T + ph > window.innerHeight - 8) T = Math.max(8, r.top - ph - 6);
  pop.style.left = L + 'px'; pop.style.top = T + 'px';
  pop.addEventListener('click', e=>{
   const b = e.target.closest('[data-slotsel]'); if(!b) return;
   draftUI.slotPick[name] = b.dataset.slotsel;
   document.querySelectorAll('.zpb-slotpop').forEach(x=>x.remove());
   renderDraftBoard2();
  });
  setTimeout(()=>{
   const shut = ()=>{
    document.querySelectorAll('.zpb-slotpop').forEach(x=>x.remove());
    document.removeEventListener('click', outside, true);
    window.removeEventListener('scroll', shut, true);
    window.removeEventListener('resize', shut);
   };
   const outside = ev=>{ if(pop.contains(ev.target) || ev.target===anchor || anchor.contains(ev.target)) return; shut(); };
   document.addEventListener('click', outside, true);
   window.addEventListener('scroll', shut, true);
   window.addEventListener('resize', shut);
  }, 0);
 }catch(err){}
};
// N2 (Owner): the roster summary sentence becomes two badges (the render string carries them;
// this helper keeps the vars from being typed twice).
window.zpbRosterBadgeVars = function(){ try{ return (typeof zpbNeutralUserRowVars==='function') ? zpbNeutralUserRowVars() : ''; }catch(err){ return ''; } };
</script>
</body>
</html>'''
rep(CLOSE, PAYLOAD, 'round-2 payload', 1)

# ---- N2 · the roster summary render ----
rep("document.getElementById('draftRosterTotal').innerHTML = n ? `${n} of ${ROSTER_SLOTS.length} starters \\u00b7 <b>${fmtWar(tot)} wins</b> above a replacement-level lineup` : '';",
    "document.getElementById('draftRosterTotal').innerHTML = n ? `<span class=\"zpb-rbadge\" style=\"${(typeof zpbRosterBadgeVars==='function')?zpbRosterBadgeVars():''}\"><b>${n}</b><i>of ${ROSTER_SLOTS.length} starters</i></span><span class=\"zpb-rbadge\" style=\"${(typeof zpbRosterBadgeVars==='function')?zpbRosterBadgeVars():''}\"><b>${fmtWar(tot)}</b><i>wins above a replacement-level lineup</i></span>` : ''; // w66 (Owner): two team-tinted Cinzel badges, the plaintext sentence retired",
    'roster badges render', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 12 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
