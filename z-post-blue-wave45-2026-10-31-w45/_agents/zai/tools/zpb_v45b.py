#!/usr/bin/env python3
"""zpb_v45b.py — the w45 CSS block (stage 2, on stage1.html): the light/dark ink corrections.
The A10 tinted-row swap (light reads the halfway ink, dark reads the dark ink — both themes fixed),
the dark twins for the surfaces that had none, the star faceoff wearing its own team's ink on both
sides, the winning-cell ink, and the field-map light fix. Appended after zpb-w44-css so the
cascade (equal specificity, later order) settles every one of these."""
import re, hashlib

SRC = 'stage1.html'
OUT = 'Football-Sim-Z-post-blue-w45.html'
B = open(SRC, encoding='utf-8').read()
orig_len = len(B)

W45_CSS = """<style id="zpb-w45-css">
/* ================= Z-POST-BLUE W45 (the Owner's round-45 — the halfway sweep) ================= */
/* The halfway ink now rides the whole site (the theme's page text wears txM — see the pack).
   These lines finish the inversions the tokens could not reach: surfaces that read the WRONG
   theme's ink, and the tinted-row base rule that still fed light mode the pale dark ink. */

/* O4 (Owner): the tinted-row base law, corrected — light reads the halfway ink (--tn), dark reads
   the dark ink (--tnd). The w34-era rule fed LIGHT mode --tnd (the pale dark ink, ~1.6:1 — the
   "super faded" players); dark had no rule at all and read the light halfway ink (~2.3:1). */
:root:not([data-theme="dark"]) .zpb-trow:not([style*="--zn:1"]), :root[data-theme="light"] .zpb-trow:not([style*="--zn:1"]){color:var(--tn,var(--text));}
:root:not([data-theme="dark"]) .zpb-trow:not([style*="--zn:1"]) .zpb-pb-name, :root[data-theme="light"] .zpb-trow:not([style*="--zn:1"]) .zpb-pb-name{color:var(--tn,var(--text));}
:root[data-theme="dark"] .zpb-trow:not([style*="--zn:1"]), :root:not([data-theme="light"]) .zpb-trow:not([style*="--zn:1"]){color:var(--tnd,var(--text));}
:root[data-theme="dark"] .zpb-trow:not([style*="--zn:1"]) .zpb-pb-name, :root:not([data-theme="light"]) .zpb-trow:not([style*="--zn:1"]) .zpb-pb-name{color:var(--tnd,var(--text));}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) .zpb-trow:not([style*="--zn:1"]){color:var(--tnd,var(--text));}
 :root:not([data-theme="light"]) .zpb-trow:not([style*="--zn:1"]) .zpb-pb-name{color:var(--tnd,var(--text));}
}

/* O3 (Owner): dark twins for the surfaces that read the LIGHT ink in the dark — the matchup card,
   the preview strip, the player cards, the lineup cells, the pos chips, the stat chips, the
   browser numbers, the roster names. Light already rode the halfway ink; dark now rides txd. */
:root[data-theme="dark"] .zpb-mu-name{color:var(--tnd,var(--text));}
:root[data-theme="dark"] .zpb-strip-team b{color:var(--tnd,var(--text));}
:root[data-theme="dark"] .zpb-pcard b{color:var(--nmd,var(--text));}
:root[data-theme="dark"] .zpb-pcard b.zpb-vib{color:var(--nmSd,var(--nmd,var(--text)));}
:root[data-theme="dark"] .zpb-pcard :where(.zpb-pcard-hd b){color:var(--tnd,var(--text));}
:root[data-theme="dark"] .zpb-poschip{color:var(--tnd,var(--text));}
:root[data-theme="dark"] .zpb-pstat{color:var(--tnd,var(--text));}
:root[data-theme="dark"] .zpb-lu-row :where(.zpb-lu-cell){color:var(--tnd,var(--text));}
:root[data-theme="dark"] #playerBody td.score, :root[data-theme="dark"] #playerBody td.num{color:var(--tnd,var(--text));}
:root[data-theme="dark"] #draftRosterList .playername{color:var(--tnd,var(--text));}
:root[data-theme="dark"] .zpb-dimerow.dgrid .playername{color:var(--tnd,var(--text));}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) .zpb-mu-name{color:var(--tnd,var(--text));}
 :root:not([data-theme="light"]) .zpb-strip-team b{color:var(--tnd,var(--text));}
 :root:not([data-theme="light"]) .zpb-pcard b{color:var(--nmd,var(--text));}
 :root:not([data-theme="light"]) .zpb-pcard b.zpb-vib{color:var(--nmSd,var(--nmd,var(--text)));}
 :root:not([data-theme="light"]) .zpb-pcard :where(.zpb-pcard-hd b){color:var(--tnd,var(--text));}
 :root:not([data-theme="light"]) .zpb-poschip{color:var(--tnd,var(--text));}
 :root:not([data-theme="light"]) .zpb-pstat{color:var(--tnd,var(--text));}
 :root:not([data-theme="light"]) .zpb-lu-row :where(.zpb-lu-cell){color:var(--tnd,var(--text));}
 :root:not([data-theme="light"]) #playerBody td.score, :root:not([data-theme="light"]) #playerBody td.num{color:var(--tnd,var(--text));}
 :root:not([data-theme="light"]) #draftRosterList .playername{color:var(--tnd,var(--text));}
 :root:not([data-theme="light"]) .zpb-dimerow.dgrid .playername{color:var(--tnd,var(--text));}
}

/* O3/O4 (Owner): the star faceoff wears its own team's ink on BOTH sides — the user side wore the
   vivid accent while the other side inherited the page text. Both read the halfway ink now. */
.zpb-star-cell{color:var(--nm,var(--text));}
.zpb-star-cell .ub{color:var(--nm,var(--accent));}
:root[data-theme="dark"] .zpb-star-cell{color:var(--nmd,var(--text));}
:root[data-theme="dark"] .zpb-star-cell .ub{color:var(--nmd,var(--accent));}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) .zpb-star-cell{color:var(--nmd,var(--text));}
 :root:not([data-theme="light"]) .zpb-star-cell .ub{color:var(--nmd,var(--accent));}
}

/* O2 (Owner): the winning lineup cell keeps its emphasis — in the halfway ink, not the vivid accent. */
.zpb-lu-win{color:var(--tn,var(--zrb,var(--accent))) !important;}
:root[data-theme="dark"] .zpb-lu-win{color:var(--tnd,var(--zrb,var(--accent))) !important;}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) .zpb-lu-win{color:var(--tnd,var(--zrb,var(--accent))) !important;}
}

/* O4 (Owner): the field-map bubbles ride the same law in the light — the pale dark ink retires. */
:root:not([data-theme="dark"]) .zpb-fm-ini.zpb-vib b, :root[data-theme="light"] .zpb-fm-ini.zpb-vib b{color:var(--fmink,var(--tn,var(--text)));}
</style>"""

i43 = B.find('<style id="zpb-w44-css">')
assert i43 >= 0, 'w44 style block not found'
close = B.find('</style>', i43)
assert close >= 0, 'w44 style close not found'
close += len('</style>')
B = B[:close] + W45_CSS + B[close:]

open(OUT, 'w', encoding='utf-8').write(B)
print(f"w45 css block appended · {orig_len} -> {len(B)} chars")
print("md5", hashlib.md5(B.encode()).hexdigest())
