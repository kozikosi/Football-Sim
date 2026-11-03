#!/usr/bin/env python3
# zpb_w61.py — the wave-61 generator. Asserted exact replacements + payload insertions + post-checks.
# Baseline: the newest reachable product bytes (default: the w58 file from council/vl, md5 7d1e07dd…).
# If the Owner's w60 file ever lands, re-run: python3 zpb_w61.py <w60.html> — every anchor asserts.
import hashlib, re, sys, subprocess

BASE = sys.argv[1] if len(sys.argv) > 1 else '/home/z/my-project/boot/w58.html'
OUT = '/home/z/my-project/work/w61/Football-Sim-Z-post-blue-w61.html'

src = open(BASE, 'r', encoding='utf-8').read()
orig_md5 = hashlib.md5(src.encode()).hexdigest()
print(f'baseline: {BASE} · md5 {orig_md5} · {len(src.encode())} bytes')
if 'WHERE YOUR PLAYERS LINE UP?' not in src or 'zpbBelongMapHTML' not in src:
    sys.exit('ABORT: baseline does not carry the Z-post-blue map — wrong file?')

fails = []
def rep(old, new, tag):
    global src
    n = src.count(old)
    if n != 1:
        fails.append(f'{tag}: anchor count {n} (want 1)')
        return
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---------- W61-1 · the lineup-map panel steps aside below the formation floor ----------
rep(
 '''  <div class="panel" style="margin-bottom:14px;">
   <h4 style="margin:0 0 4px;">WHERE YOUR PLAYERS LINE UP?</h4>''',
 '''  <div class="panel zpb-lumap-panel" style="margin-bottom:14px;">
   <h4 style="margin:0 0 4px;">WHERE YOUR PLAYERS LINE UP?</h4>''',
 'W61-1a roster-tab panel class')

rep(
 '''  html += `<h4 style="margin:14px 0 0;">WHERE YOUR PLAYERS LINE UP?</h4>${(window.zpbBelongMapHTML ? window.zpbBelongMapHTML(e) : '')}`; // w32 (Owner): the Owner's own title // w27 (Owner): the draft pick wears the field''',
 '''  html += `<div class="zpb-lumap-panel"><h4 style="margin:14px 0 0;">WHERE YOUR PLAYERS LINE UP?</h4>${(window.zpbBelongMapHTML ? window.zpbBelongMapHTML(e) : '')}</div>`; // w32 (Owner): the Owner's own title // w27 (Owner): the draft pick wears the field · w61 (Owner): the panel steps aside below the formation floor — the cards below stay''',
 'W61-1b fillDetail wrapper')

# ---------- W61-3 · the review tagline leads its own line below the fold floor ----------
rep(
 ''' let h = `<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;"><span class="zpb-draftops" id="zpbDraftOps">''',
 ''' let h = `<div class="zpb-cygops" style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;"><span class="zpb-draftops" id="zpbDraftOps">''',
 'W61-3a cygops class on the review header row')

# ---------- the w61 CSS payload ----------
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

rep('''</body>
</html>''', CSS, 'W61-CSS payload block')

if fails:
    print('ANCHOR FAILURES:'); [print('  ' + f) for f in fails]
    sys.exit(1)

# ---------- post-checks ----------
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
 ('no white text introduced', '#ffffff"' not in CSS),
]
bad = [n for n, okc in checks if not okc]
for n, okc in checks:
    print(('  PASS ' if okc else '  FAIL ') + n)
if bad:
    sys.exit('POST-CHECK FAILURES: ' + ', '.join(bad))

open(OUT, 'w', encoding='utf-8').write(src)
out_md5 = hashlib.md5(src.encode()).hexdigest()
print(f'written: {OUT} · md5 {out_md5} · {len(src.encode())} bytes · delta {len(src.encode()) - len(src.encode()) + 0:+}'.rstrip())
print('GENERATOR GREEN')
