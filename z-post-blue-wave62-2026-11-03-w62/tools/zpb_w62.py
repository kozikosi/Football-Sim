#!/usr/bin/env python3
# zpb_w62.py — the wave-62 generator (the merge wave).
# w62 = the w60 line (w58 + w57-best + w59 + w60) + the whole w61 delta, per the Owner's
# directive "merge the best of w58/w59/w60 and w61" — call the new files w62.
#
# Proof A (the union is exact): the SAME four replacements run on the pristine w58 must
#   reproduce the shipped w61 byte-for-byte (md5 5b0f1ef3330983cf1dcceeaa8003ffce) — i.e.
#   this patch IS the w61 delta, nothing invented, nothing dropped.
# Proof B (w60's cargo survives): the w60 markers (name ladder, fluid unit table, face-off
#   rows, advance rail, exit law, footer pair) are asserted present after the merge.
import hashlib, sys

W60 = '/home/z/my-project/work/w60.html'
W58 = '/home/z/my-project/work/w58.html'
W61 = '/home/z/my-project/work/w61.html'
OUT = '/home/z/my-project/work/w62/Football-Sim-Z-post-blue-w62.html'

W60_MD5 = 'bc841fb9fefb619438075e43bb45f975'
W61_MD5 = '5b0f1ef3330983cf1dcceeaa8003ffce'

def rep(src, old, new, tag, fails):
    n = src.count(old)
    if n != 1:
        fails.append(f'{tag}: anchor count {n} (want 1)')
        return src
    print(f'  ok {tag}')
    return src.replace(old, new)

def apply_w61_delta(src, fails):
    """The exact w61 delta — four asserted exact replacements, lifted from zpb_w61.py."""
    src = rep(src,
     '''  <div class="panel" style="margin-bottom:14px;">
   <h4 style="margin:0 0 4px;">WHERE YOUR PLAYERS LINE UP?</h4>''',
     '''  <div class="panel zpb-lumap-panel" style="margin-bottom:14px;">
   <h4 style="margin:0 0 4px;">WHERE YOUR PLAYERS LINE UP?</h4>''',
     'W61-1a roster-tab panel class', fails)

    src = rep(src,
     '''  html += `<h4 style="margin:14px 0 0;">WHERE YOUR PLAYERS LINE UP?</h4>${(window.zpbBelongMapHTML ? window.zpbBelongMapHTML(e) : '')}`; // w32 (Owner): the Owner's own title // w27 (Owner): the draft pick wears the field''',
     '''  html += `<div class="zpb-lumap-panel"><h4 style="margin:14px 0 0;">WHERE YOUR PLAYERS LINE UP?</h4>${(window.zpbBelongMapHTML ? window.zpbBelongMapHTML(e) : '')}</div>`; // w32 (Owner): the Owner's own title // w27 (Owner): the draft pick wears the field · w61 (Owner): the panel steps aside below the formation floor — the cards below stay''',
     'W61-1b fillDetail wrapper', fails)

    src = rep(src,
     ''' let h = `<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;"><span class="zpb-draftops" id="zpbDraftOps">''',
     ''' let h = `<div class="zpb-cygops" style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;"><span class="zpb-draftops" id="zpbDraftOps">''',
     'W61-3a cygops class on the review header row', fails)

    CSS = '''<style id="zpb-w61-css">
/* ============ Z-POST-BLUE W61 ============ */
/* W61-1 (Owner): WHERE YOUR PLAYERS LINE UP? steps aside below the formation floor.
   Measured on the live page: above 740px the w29/w37 absolute law always holds the five OL on
   one clean line; at 740px the w37 wrap law takes over and the row can fold (the OL five land
   on two lines from ~700px down, name-dependent) — confusing and inaccurate after that. So the
   whole panel retires at the same seam, the player cards below (YOUR FULL DEPTH CHART) stay.
   Desktop is untouched: ≥741px renders byte-identically. */
@media (max-width:740px){ .zpb-lumap-panel{display:none !important;} }
/* W61-2 (Owner): the depth zones join the ONE-INK law — the black and the 85+ red tint both
   retire for the team's 0.50 halfway ink (txM light / txd dark — the dc-name pattern verbatim).
   The 85+ name keeps its bold (the w30 A2 law), the 90+ keeps its shimmer. */
.zpb-dz-row .zpb-dz-name{color:var(--nm,var(--text));}
.zpb-dz-row .zpb-dz-name.zpb-vib{color:var(--nmS,var(--nm,var(--tA2,var(--accent))));font-weight:800;}
:root[data-theme="dark"] .zpb-dz-row .zpb-dz-name{color:var(--nmd,var(--text));}
:root[data-theme="dark"] .zpb-dz-row .zpb-dz-name.zpb-vib{color:var(--nmSd,var(--nmd,var(--text)));}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) .zpb-dz-row .zpb-dz-name{color:var(--nmd,var(--text));}
 :root:not([data-theme="light"]) .zpb-dz-row .zpb-dz-name.zpb-vib{color:var(--nmSd,var(--nmd,var(--text)));}
}
/* W61-3 (Owner): below the fold floor (measured onset 420-429px) the "Can you go 20-0?"
   leads its own line — right under the moving 20-0 header, above NEW DRAFT / 100 SEASONS.
   The tagline is last in DOM, so column-reverse paints it first. Above 429px: untouched. */
@media (max-width:429px){
 .zpb-cygops{flex-direction:column-reverse;align-items:flex-start;gap:2px;}
 .zpb-cygops .zpb-cygdsub{margin:0;}
}
</style>
</body>
</html>'''

    src = rep(src, '''</body>
</html>''', CSS, 'W61-CSS payload block', fails)
    return src

def post_checks(src, tag):
    checks = [
     ('w61 style block present', '<style id="zpb-w61-css">' in src),
     ('lumap-panel roster tab', 'class="panel zpb-lumap-panel"' in src),
     ('lumap-panel fillDetail', '<div class="zpb-lumap-panel"><h4 style="margin:14px 0 0;">WHERE' in src),
     ('lumap-panel count', src.count('zpb-lumap-panel') == 3),
     ('cygops row', '<div class="zpb-cygops" style="display:flex;justify-content:space-between' in src),
     ('one-ink light plain', '.zpb-dz-row .zpb-dz-name{color:var(--nm,var(--text));}' in src),
     ('one-ink light vib', '.zpb-dz-row .zpb-dz-name.zpb-vib{color:var(--nmS,' in src),
     ('one-ink dark gates', ':root[data-theme="dark"] .zpb-dz-row .zpb-dz-name{color:var(--nmd,var(--text));}' in src),
     ('dark media gate', ':root:not([data-theme="light"]) .zpb-dz-row .zpb-dz-name{color:var(--nmd,var(--text));}' in src),
     ('85+ bold kept', '.zpb-dz-row .zpb-dz-name.zpb-vib{color:var(--nmS,var(--nm,var(--tA2,var(--accent))));font-weight:800;}' in src),
     ('map hide law', '@media (max-width:740px){ .zpb-lumap-panel{display:none !important;} }' in src),
     ('cyg law', '@media (max-width:429px){\n .zpb-cygops{flex-direction:column-reverse;align-items:flex-start;gap:2px;}' in src),
     ('desktop map law untouched', 'left:clamp(12px, calc(50% + var(--x,0)*7.7%), calc(100% - 12px))' in src),
     ('w37 wrap law untouched', '@media (max-width:740px){\n .zpb-fm-row{display:flex;flex-wrap:wrap;justify-content:center;gap:4px;height:auto;}' in src),
     ('storage module intact', 'ZPBStorage' in src),
     ('shimmer law intact', src.count('zpb-shm') > 20),
     ('no white text introduced', '#ffffff"' not in src[src.find('<style id="zpb-w61-css">'):]),
    ]
    bad = [n for n, okc in checks if not okc]
    for n, okc in checks:
        print(f'  [{tag}] ' + ('PASS ' if okc else 'FAIL ') + n)
    return bad

def w60_cargo_checks(src):
    """Proof B — the w60 line's cargo must all be aboard w62."""
    checks = [
     ('w59: cinematic lock (inert)', 'inert' in src),
     ('w59: shimmer clip re-declared', 'background-clip:text' in src),
     ('w60: name-fit engine', 'zpbNameFit' in src),
     ('w60: ladder CSS payload', '<style id="zpb-w60-css">' in src),
     ('w60: rail payload', '<script id="zpb-w60-js">' in src),
     ('w60: advance rail engine', 'zpbAdvRail' in src),
     ('w60: fluid unit table', 'table-layout:fixed' in src),
     ('w60: face-off intro rows', 'zpb-intro-brow' in src),
     ('w60: footer pair RUN IT BACK', 'RUN IT BACK' in src),
     ('w60: no-ellipsis carrier group', '.zpb-lu-cell,.zpb-gname,.zpb-awname,.zpb-awme,.zpb-dz-name' in src),
     ('w59: phone draft card labels', 'zpb-pcard-hd' in src),
     ('w58: storage showcase door', '?storage=1' in src or 'storage=1' in src),
    ]
    bad = [n for n, okc in checks if not okc]
    for n, okc in checks:
        print('  [cargo] ' + ('PASS ' if okc else 'FAIL ') + n)
    return bad

print('=== PROOF A · the patch is exactly the w61 delta ===')
w58 = open(W58, encoding='utf-8').read()
w61 = open(W61, encoding='utf-8').read()
assert hashlib.md5(w58.encode()).hexdigest() == '7d1e07ddb8b23ef6f03968a8fe26d6cc', 'w58 baseline md5 drift'
assert hashlib.md5(w61.encode()).hexdigest() == W61_MD5, 'w61 reference md5 drift'
fails = []
recon = apply_w61_delta(w58, fails)
if fails:
    print('ANCHOR FAILURES (w58 dry-run):'); [print('  ' + f) for f in fails]; sys.exit(1)
recon_md5 = hashlib.md5(recon.encode()).hexdigest()
match = recon_md5 == W61_MD5
print(f'  w58 + patch -> md5 {recon_md5} · w61 shipped md5 {W61_MD5} · ' + ('BYTE-FOR-BYTE MATCH' if match else 'MISMATCH'))
if not match:
    sys.exit('Proof A failed: the patch is NOT the exact w61 delta')

print('\n=== BUILD · w60 + the w61 delta ===')
w60 = open(W60, encoding='utf-8').read()
w60_md5 = hashlib.md5(w60.encode()).hexdigest()
print(f'baseline: {W60} · md5 {w60_md5} · {len(w60.encode())} bytes')
if w60_md5 != W60_MD5:
    sys.exit(f'ABORT: w60 baseline md5 {w60_md5} != {W60_MD5}')
fails = []
w62 = apply_w61_delta(w60, fails)
if fails:
    print('ANCHOR FAILURES:'); [print('  ' + f) for f in fails]; sys.exit(1)

bad = post_checks(w62, 'w62') + w60_cargo_checks(w62)
if bad:
    sys.exit('POST-CHECK FAILURES: ' + ', '.join(bad))

import os
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write(w62)
out_md5 = hashlib.md5(w62.encode()).hexdigest()
print(f'\nwritten: {OUT} · md5 {out_md5} · {len(w62.encode())} bytes '
      f'(w60 {len(w60.encode())} · delta {len(w62.encode())-len(w60.encode()):+})')
print('GENERATOR GREEN — Proof A (exact w61 delta) + Proof B (w60 cargo whole)')
