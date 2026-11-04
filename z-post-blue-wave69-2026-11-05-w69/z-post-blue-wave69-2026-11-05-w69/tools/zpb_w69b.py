#!/usr/bin/env python3
"""w69 chain step 2 — UI 2: the field map's ink is solved against the EFFECTIVE paint
(bubble tint at its real alpha over the glass panel over the page), light and dark,
and the offense tint follows the takeover's --g2. Input: step 1's md5."""
import hashlib

SRC = '/home/z/my-project/work/w69/Football-Sim-Z-post-blue-w69.html'
PREV_MD5 = 'ec287ef26c58235559f4b3f401fdc174'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == PREV_MD5, 'step-1 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

old_block = """  const bubbleBg = (side, dark)=>{
   try{
    if(side!=='def') return dark ? '#e8c87e' : '#e6c67d'; // the gold never joins the team takeover
    const pk = (entry.teamName && typeof zpbPackFor === 'function') ? zpbPackFor(entry.teamName) : null;
    const takeover = !!document.documentElement.getAttribute('data-zpbteam') && pk;
    if(takeover) return dark ? pk.acc3D : pk.acc3L;
    return dark ? '#dfa6b4' : '#c97a8e';
   }catch(err){ return dark ? '#dfa6b4' : '#c97a8e'; }
  };
  const _inkOff = pickInk(bubbleBg('off', false)), _inkDef = pickInk(bubbleBg('def', false));
  const _inkOffD = pickInk(bubbleBg('off', true)), _inkDefD = pickInk(bubbleBg('def', true));"""

new_block = """  const bubbleTint = (side, dark)=>{
   try{
    const pk = (entry.teamName && typeof zpbPackFor === 'function') ? zpbPackFor(entry.teamName) : null;
    const takeover = !!document.documentElement.getAttribute('data-zpbteam') && pk;
    if(side==='def') return takeover ? (dark ? pk.acc3D : pk.acc3L) : (dark ? '#dfa6b4' : '#c97a8e');
    return takeover ? (dark ? pk.g2d : pk.g2) : (dark ? '#e8c87e' : '#e6c67d'); // W69 (Owner): the offense bubble rides the takeover's --g2 - the tint it actually paints
   }catch(err){ return side==='def' ? (dark ? '#dfa6b4' : '#c97a8e') : (dark ? '#e8c87e' : '#e6c67d'); }
  };
  // W69 (Owner, UI 2): the ink is solved against the EFFECTIVE paint - the bubble's tint at
  // its real alpha (18% offense / 16% defense, the .zpb-fm-row paint) OVER the glass panel
  // over the page. The old solve read the SOLID swatch, so dark mode picked dark-brown ink
  // for a dark surface (his Browns report: "super faded dark color text"). Both themes,
  // both sides, every team, at build time - a theme flip never rebuilds the map.
  const _fmComposite = (side, dark)=>{
   const pageBg = dark ? '#181114' : '#fcf7f1';
   const panel = dark ? '#221920' : '#ffffff';
   const base = zpbMix(pageBg, panel, dark ? 0.55 : 0.58);
   return zpbMix(base, bubbleTint(side, dark), side==='def' ? 0.16 : 0.18);
  };
  const _inkOff = pickInk(_fmComposite('off', false)), _inkDef = pickInk(_fmComposite('def', false));
  const _inkOffD = pickInk(_fmComposite('off', true)), _inkDefD = pickInk(_fmComposite('def', true));"""

rep(old_block, new_block, 'field-map ink solver')

# post: the dead solid-swatch reader no longer feeds the inks
assert "pickInk(bubbleBg(" not in src, 'stale bubbleBg ink path survived'
assert src.count('_fmComposite') == 5, 'composite helper count off'
open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step2 done -> md5 {h} bytes {len(src.encode("utf-8"))}')
