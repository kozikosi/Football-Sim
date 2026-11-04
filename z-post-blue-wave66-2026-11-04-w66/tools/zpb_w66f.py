#!/usr/bin/env python3
"""w66 chain step 6 — the battery-driven repairs:
   1) the field-map chip ink becomes the site's own themed text ink (var(--text)) —
      measured: light ≥4.13:1, dark ≥7.7:1 for all 32 teams, still the team's halfway tone,
      never black;
   2) the P-232 unit law widens to football-real units (DT/ENDS share the DL, the secondary
      shares CB/S), kickers may punt (K->P free), punters still never kick;
   3) the DRAFT brain obeys the unit law (cpuPick values in-unit placements only; the user's
      auto-picks land natural-first, in-unit second);
   4) a short window reads the pregame marquee from the top — the centered column can
      outgrow the space under the line and clip the title."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP5_MD5 = '323b498aa17d26e55eae2237f616e4b6'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP5_MD5, 'step-5 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- 1 · the chip ink: the site's own themed text ink (measured ≥4.13 light / ≥7.7 dark) ----
rep('.zpb-fm-off i{background:color-mix(in srgb,var(--g2,#e6c67d) 18%,transparent);color:var(--accent2,var(--text));',
    '.zpb-fm-off i{background:color-mix(in srgb,var(--g2,#e6c67d) 18%,transparent);color:var(--text,#53382b);', 'off ink', 1)
rep('.zpb-fm-def i{background:color-mix(in srgb,var(--rose,#c97a8e) 16%,transparent);color:var(--accent2,var(--text));',
    '.zpb-fm-def i{background:color-mix(in srgb,var(--rose,#c97a8e) 16%,transparent);color:var(--text,#53382b);', 'def ink', 1)
rep('.zpb-fm-rowflex i.zpb-ft-free{background:color-mix(in srgb,var(--g2,#e6c67d) 18%,transparent);color:var(--accent2,var(--text));',
    '.zpb-fm-rowflex i.zpb-ft-free{background:color-mix(in srgb,var(--g2,#e6c67d) 18%,transparent);color:var(--text,#53382b);', 'ft-free ink', 1)
rep('.zpb-fm-rowflex i.zpb-ft-2{background:color-mix(in srgb,var(--g2,#e6c67d) 72%,var(--rose,#c97a8e) 28%);color:var(--accent2,var(--text));',
    '.zpb-fm-rowflex i.zpb-ft-2{background:color-mix(in srgb,var(--g2,#e6c67d) 72%,var(--rose,#c97a8e) 28%);color:var(--text,#53382b);', 'ft-2 ink', 1)
rep('.zpb-fm-rowflex i.zpb-ft-4{background:color-mix(in srgb,var(--g2,#e6c67d) 38%,var(--rose,#c97a8e) 62%);color:var(--accent2,var(--text));',
    '.zpb-fm-rowflex i.zpb-ft-4{background:color-mix(in srgb,var(--g2,#e6c67d) 38%,var(--rose,#c97a8e) 62%);color:var(--text,#53382b);', 'ft-4 ink', 1)
rep('.zpb-fm-rowflex i.zpb-ft-6{background:color-mix(in srgb,var(--rose,#c97a8e) 16%,transparent);color:var(--accent2,var(--text));',
    '.zpb-fm-rowflex i.zpb-ft-6{background:color-mix(in srgb,var(--rose,#c97a8e) 16%,transparent);color:var(--text,#53382b);', 'ft-6 ink', 1)

# ---- 2 · the units widen to football-real groups; K->P stays free, P->K stays banned ----
rep(" DT:['DT1','DT2','DL5'], REDG:['DE1','DE2','DL5'], LEDG:['DE1','DE2','DL5'],\n MIKE:['MIKE','WILL','SAM'], WILL:['WILL','MIKE','SAM'], SAM:['SAM','MIKE','WILL'],\n CB:['CB1','CB2','CB3','CB4'], SS:['SS','FS'], FS:['FS','SS'], K:['K'], P:['P']",
    " DT:['DE1','DE2','DT1','DT2','DL5'], REDG:['DE1','DE2','DT1','DT2','DL5'], LEDG:['DE1','DE2','DT1','DT2','DL5'],\n MIKE:['MIKE','WILL','SAM'], WILL:['WILL','MIKE','SAM'], SAM:['SAM','MIKE','WILL'],\n CB:['CB1','CB2','CB3','CB4','SS','FS'], SS:['CB1','CB2','CB3','CB4','SS','FS'], FS:['CB1','CB2','CB3','CB4','SS','FS'], K:['K','P'], P:['P']",
    'units widen', 1)

# ---- 3a · the CPU draft brain values in-unit placements only ----
rep("  for(const s of c){\n   if(roster.slots[s]) continue;\n   const g = WV_SLOT_GROUP[s],",
    "  for(const s of c){\n   if(roster.slots[s]) continue;\n   if(!zpbAutoLegal(pos, s)) continue; // w66 (P-232): the brain never VALUES a cross-unit placement — the absurd lineups started here\n   const g = WV_SLOT_GROUP[s],",
    'cpuPick unit law', 1)

# ---- 3b · the user's auto-picks land natural-first, in-unit second ----
rep('''function slotForUser(roster, p){
 const s = findAssignableSlot(roster, p[1]);
 if(s) return s;
 if(!draftSim.pool.some(x=>findAssignableSlot(roster,x[1]))) return firstOpenSlotAny(roster);
 return null;
}''',
    '''function zpbAutoFindSlot(roster, pos){ // w66 (P-232): the first OPEN slot the position may fill inside its own unit
 const u = ZPB_AUTO_UNITS[pos]; if(!u) return null;
 for(const s of u){ if(roster.slots[s]) continue; if(flexRule(pos, s) != null) return s; }
 return null;
}
function slotForUser(roster, p){
 let s = zpbAutoFindSlot(roster, p[1]); // w66 (P-232): the auto-pick lands naturally or in-unit first — never a cross-unit stretch
 if(s) return s;
 s = findAssignableSlot(roster, p[1]);
 if(s) return s;
 if(!draftSim.pool.some(x=>findAssignableSlot(roster,x[1]))) return firstOpenSlotAny(roster);
 return null;
}''',
    'slotForUser unit-first', 1)

# ---- 4 · the short-window pregame law ----
rep(''' #draftTable2 td.dc-btn button{white-space:nowrap;max-width:100%;}
}
</style>
</body>
</html>''',
    ''' #draftTable2 td.dc-btn button{white-space:nowrap;max-width:100%;}
}
/* W66 (Owner): a SHORT window reads the marquee from the top, like the phone — the centered
   column can outgrow the space under the header line and clip the title at the inset. */
@media (max-height:719px){
 .zpb-rep-intro{justify-content:flex-start;padding-top:12px;gap:9px;}
}
</style>
</body>
</html>''',
    'short-window pregame law', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 6 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
