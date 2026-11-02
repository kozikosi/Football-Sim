#!/usr/bin/env python3
# zpb_w59.py — the Owner's round-59 + the best of the Owner-pushed w57, merged into the w58 line.
# Asserted exact replacements only; re-runs clean from the pristine w58 baseline every iteration.
# Baseline: my w58 bytes (md5 7d1e07ddb8b23ef6f03968a8fe26d6cc — the round-57 ten + storage Phase 0).
import hashlib, sys, os

PKG = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.join(PKG, 'base', 'Football-Sim-Z-post-blue-w58.html')
OUT  = os.path.join(PKG, '..', '..', 'Football-Sim-Z-post-blue-w59.html')

html = open(BASE, encoding='utf-8').read()
n0 = len(html)
print('baseline bytes:', n0, 'md5:', hashlib.md5(html.encode()).hexdigest())
assert hashlib.md5(html.encode()).hexdigest() == '7d1e07ddb8b23ef6f03968a8fe26d6cc', 'baseline md5 mismatch'

def rep(old, new, count=1, tag=''):
    global html
    found = html.count(old)
    if found != count:
        print(f'FAIL [{tag}] expected {count} occurrence(s), found {found}'); sys.exit(1)
    html = html.replace(old, new, count)
    print(f'ok   [{tag}]')

# ============ R1 · the position rankings spot reads DIME (Owner item 1) ============
rep('"CB4": "CB4 / DIME",', '"CB4": "DIME",', 1, 'R1a LABELS CB4 -> DIME')
rep('{"key":"CB4","label":"CB4 / Dime","pos":["CB"],"n":1,"rankIndex":3,',
    '{"key":"CB4","label":"Dime","pos":["CB"],"n":1,"rankIndex":3,', 1, 'R1b GROUP_DEFS CB4 -> Dime')

# ============ R2 · the best of w57 merged (Owner items 7+8) ============
# 2a · the team soft muted tone deepens toward the neutral cream
rep(' --text:var(--tTx); --sub:var(--tSu); --border:var(--tHr); --rosehair:var(--tHr);',
    ' --text:var(--tTx); --sub:color-mix(in srgb,var(--tSu) 55%,var(--zcream,#53382b)); --border:var(--tHr); --rosehair:var(--tHr); /* w59 (best of w57, Owner): the team soft muted tone deepens toward the neutral cream */',
    1, 'R2a team pack sub deepens')
# 2b · the season-badge numbers ride the large-text bar
rep('.zpb-sbadge b{font-size:1.06rem;font-weight:800;line-height:1.1;font-variant-numeric:tabular-nums;}',
    '.zpb-sbadge b{font-size:1.17rem;font-weight:800;line-height:1.1;font-variant-numeric:tabular-nums;} /* w59 (best of w57, Owner): 18.7px bold - the large-text bar */',
    1, 'R2b sbadge b 1.17rem')
# 2c · the cascade keeps the x0.6s beat AND the 0.25s head start (the two Owner rulings compose)
rep('.zpb-sbadge,.zpb-scard,.zpb-rcbadge{animation-delay:calc(var(--beat,0)*.6s);} /* w57 (Owner): a little faster */',
    '.zpb-sbadge,.zpb-scard,.zpb-rcbadge{animation-delay:calc(var(--beat,0)*.6s - .25s);} /* w59 (best of w57, Owner): the x0.6s beat keeps the 0.25s head start */',
    1, 'R2c cascade 0.6s-0.25s')
# 2d · the badge veil follows the faster cascade
rep(' else setTimeout(show, Math.min(total*1000 + 1200, 90000));',
    ' else setTimeout(show, Math.min(total*600 + 800, 90000)); /* w59 (best of w57, Owner): the veil follows the faster cascade - the last badge lands at (total-1)*0.6s+0.7s */',
    1, 'R2d veil timing')
# 2e · the muted ink deepens one step (light theme, both theme blocks)
rep('--text:#8e5566; --sub:#a2687d; --rosehair:#e6c3d2;',
    '--text:#8e5566; --sub:#885261; --rosehair:#e6c3d2; /* w59 (best of w57, Owner): the muted ink deepens one step - 3.7:1 to 5.0:1 on the panels, the same rose family */',
    2, 'R2e light sub ink x2')
# 2f · the draft board's light-mode value inks
rep(':root:not([data-theme="dark"]) #draftTable2 td.dc-pri,:root[data-theme="light"] #draftTable2 td.dc-pri{color:var(--gold3,#a8791c);}',
    ':root:not([data-theme="dark"]) #draftTable2 td.dc-pri,:root[data-theme="light"] #draftTable2 td.dc-pri{color:color-mix(in srgb,var(--accent2,#cf8a60) 45%,var(--zcream,#53382b));} /* w59 (best of w57, Owner): the priority wears the gone/wins ink everywhere, not just the card */',
    1, 'R2f dc-pri light ink')
rep(':root:not([data-theme="dark"]) #draftTable2 td.dc-gone,:root[data-theme="light"] #draftTable2 td.dc-gone{color:color-mix(in srgb,var(--accent2,#cf8a60) 62%,var(--text));}',
    ':root:not([data-theme="dark"]) #draftTable2 td.dc-gone,:root[data-theme="light"] #draftTable2 td.dc-gone{color:color-mix(in srgb,var(--accent2,#cf8a60) 45%,var(--zcream,#53382b));} /* w59 (best of w57, Owner): deepens 4.4 -> 5.3 */',
    1, 'R2f dc-gone light ink')
rep(':root:not([data-theme="dark"]) #draftTable2 td.dc-wins,:root[data-theme="light"] #draftTable2 td.dc-wins{color:color-mix(in srgb,var(--good,#4c9a67) 78%,var(--text));}',
    ':root:not([data-theme="dark"]) #draftTable2 td.dc-wins,:root[data-theme="light"] #draftTable2 td.dc-wins{color:color-mix(in srgb,var(--good,#4c9a67) 65%,var(--zcream,#53382b));} /* w59 (best of w57, Owner): deepens 4.0 -> 4.7 */',
    1, 'R2f dc-wins light ink')
# 2g · the pick-grade badge rides the large-text bar
rep(".zpb-pg-grade{position:absolute;top:7px;right:9px;font-family:'Cinzel Decorative',serif;font-weight:900;font-size:1.02rem;line-height:1;color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,transparent);border:1px solid color-mix(in srgb,var(--accent) 34%,transparent);border-radius:9px;padding:6px 7px;}",
    ".zpb-pg-grade{position:absolute;top:7px;right:9px;font-family:'Cinzel Decorative',serif;font-weight:900;font-size:1.17rem; /* w59 (best of w57, Owner): the large-text bar */line-height:1;color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,transparent);border:1px solid color-mix(in srgb,var(--accent) 34%,transparent);border-radius:9px;padding:6px 7px;}",
    1, 'R2g pg-grade 1.17rem')
# 2h · the pregame star fan learns the narrow layout (the marquee pins to the top, the pairs fan BELOW)
rep('''   const narrow = (window.innerWidth||1280) <= 600;
   const laneA = narrow ? 28 : 18, laneH = narrow ? 72 : 82; // the lanes clear the middle panel''',
    '''   const narrow = (window.innerWidth||1280) <= 600;
   const syMap0 = {50:38, 27:60, 78:82, 34:40, 66:68}; // w59 (best of w57, Owner): on a phone the marquee pins to the top and the pairs fan out BELOW it - the first pair never lands on the logos
   const syMap = {}; for (const k in syMap0) syMap[k] = syMap0[k] + (isSB ? 5 : 0); // w59: the Super Bowl marquee wears the bigger title - its fan sits a touch deeper
   const laneA = narrow ? 28 : 18, laneH = narrow ? 72 : 82; // the lanes clear the middle panel''',
    1, 'R2h syMap insert')
rep("    slots.push(Object.assign({}, awayStars[st[0]], {sx:laneA, sy:st[1], beat:beat, side:' zpb-st-side', f:fitF(awayStars[st[0]])}));",
    "    slots.push(Object.assign({}, awayStars[st[0]], {sx:laneA, sy:(narrow && syMap[st[1]]!=null)?syMap[st[1]]:st[1], beat:beat, side:' zpb-st-side', f:fitF(awayStars[st[0]])})); // w59 (best of w57, Owner): the narrow fan (syMap) - desktop keeps the w39 lanes",
    1, 'R2h away star fan')
rep("    slots.push(Object.assign({}, homeStars[st[0]], {sx:laneH, sy:st[1], beat:beat, side:' zpb-st-side-r', f:fitF(homeStars[st[0]])}));",
    "    slots.push(Object.assign({}, homeStars[st[0]], {sx:laneH, sy:(narrow && syMap[st[1]]!=null)?syMap[st[1]]:st[1], beat:beat, side:' zpb-st-side-r', f:fitF(homeStars[st[0]])})); // w59 (best of w57, Owner): the narrow fan (syMap)",
    1, 'R2h home star fan')

# ============ R4 · the unit comparison leaves the mstack cliff (Owner item 5) ============
rep('return {html:`<table><tbody>${rows}</tbody></table>`, aUnits, bUnits, total:mA.length};',
    'return {html:`<table class="zpb-unitcmp" data-nostack="1"><tbody>${rows}</tbody></table>`, aUnits, bUnits, total:mA.length}; /* w59 (Owner): the unit table wears its own graduated law - a full-width table at every width, never the sudden narrow stack */',
    1, 'R4 unitcmp class + nostack')

# ============ R4b · the browser's system-light melt (the Owner's "doesn't look natural" page) ============
# The bare :not([data-theme="light"]) variants (never media-scoped) painted the DARK pale ink on
# system-light pages with no stored theme — the melt family the w41 note flagged. The properly
# scoped dark pairs already exist later in the sheet; these two rules re-scope the strays.
rep(''':root[data-theme="dark"] #playerBody td.score,:root:not([data-theme="light"]) #playerBody td.score,
:root[data-theme="dark"] #playerBody td.num,:root:not([data-theme="light"]) #playerBody td.num{color:var(--tnd,var(--text));}''',
    ''':root[data-theme="dark"] #playerBody td.score,:root[data-theme="dark"] #playerBody td.num{color:var(--tnd,var(--text));} /* w59 fix: the bare not-light variants painted the DARK pale ink on system-light pages with no stored theme - the melt family; the media-scoped pair rides with the w45 dark block */
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) #playerBody td.score, :root:not([data-theme="light"]) #playerBody td.num{color:var(--tnd,var(--text));} }''',
    1, 'R4b playerBody value melt')
rep(':root[data-theme="dark"] .zpb-pb-name.zpb-vib,:root:not([data-theme="light"]) .zpb-pb-name.zpb-vib{color:var(--tnd,var(--text));}',
    ''':root[data-theme="dark"] .zpb-pb-name.zpb-vib{color:var(--tnd,var(--text));} /* w59 fix: dark-scoped only - the bare not-light variant melted the 85+ names on system-light pages */
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-pb-name.zpb-vib{color:var(--tnd,var(--text));} }''',
    1, 'R4b browser 85+ name melt')

# ============ R5 · the w59 blocks (CSS + JS) inserted before the storage block ============
# ---- 4a. the w57 merge CSS, verbatim from the Owner-pushed w57, with TWO edits:
#          (i) the block id/header retitle, (ii) the 4h gold-shimmer FIX — the background
#          shorthand reset background-clip to border-box and the gradient painted the whole
#          box behind the transparent fill (solid gold blocks where names should read);
#          the clip is re-declared INSIDE the override. ----
w57css = open(os.path.join(PKG, 'w57_merge_block.html'), encoding='utf-8').read()
old4h = ':root[data-theme="light"] .zpb-shm{background:linear-gradient(100deg,#8a5f18 12%,#b98a2e 32%,#8a5f18 52%,#c9a24b 70%,#8a5f18 88%) !important;background-size:230% 100% !important;} /* w57: fixed bronze - the pale zshim default dragged the mean to 2.7 */'
new4h = ':root[data-theme="light"] .zpb-shm{background:linear-gradient(100deg,#8a5f18 12%,#b98a2e 32%,#8a5f18 52%,#c9a24b 70%,#8a5f18 88%) !important;-webkit-background-clip:text !important;background-clip:text !important;background-size:230% 100% !important;} /* w57: fixed bronze - the pale zshim default dragged the mean to 2.7 · w59 FIX (Owner: "solid blocks of gold"): the background shorthand reset background-clip to border-box and the gradient painted the whole box BEHIND the transparent fill - the name vanished into a gold block; the clip rides inside the override, the sweep reads on the letters again */'
old4hb = '@media (prefers-color-scheme: light){ :root:not([data-theme="dark"]) .zpb-shm{background:linear-gradient(100deg,#8a5f18 12%,#b98a2e 32%,#8a5f18 52%,#c9a24b 70%,#8a5f18 88%) !important;background-size:230% 100% !important;} }'
new4hb = '@media (prefers-color-scheme: light){ :root:not([data-theme="dark"]) .zpb-shm{background:linear-gradient(100deg,#8a5f18 12%,#b98a2e 32%,#8a5f18 52%,#c9a24b 70%,#8a5f18 88%) !important;-webkit-background-clip:text !important;background-clip:text !important;background-size:230% 100% !important;} } /* w59 FIX: the clip re-declared here too */'
for o, n, t in [(old4h, new4h, 'w57 4h light'), (old4hb, new4hb, 'w57 4h media')]:
    if w57css.count(o) != 1:
        print(f'FAIL [merge {t}] expected 1 occurrence, found {w57css.count(o)}'); sys.exit(1)
    w57css = w57css.replace(o, n, 1)
    print(f'ok   [merge {t}]')
w57css = w57css.replace('<style id="zpb-w57-css">', '<style id="zpb-w59-merge-css">', 1)
w57css = w57css.replace('/* ================= Z-POST-BLUE W57 (the Owner\'s round-57) =================',
    '/* ================= Z-POST-BLUE W59 - MERGED FROM W57 (the Owner-pushed draft-board round) =================', 1)
w57css = w57css.replace('Desktop untouched. */', 'Desktop untouched. Merged into w59 by the Owner\'s ruling ("take the best of w57"). */', 1)

# ---- 4b. the w59 CSS: the ranking card laws + the unit comparison steps + the lock ----
w59css = open(os.path.join(PKG, 'payload_w59_css.txt'), encoding='utf-8').read()
# ---- 4c. the w59 JS: the cinematics lock ----
w59js = open(os.path.join(PKG, 'payload_w59_js.txt'), encoding='utf-8').read()

anchor = '<style id="zpb-storage-css">'
rep(anchor, w57css + '\n\n' + w59css + '\n\n' + w59js + '\n\n' + anchor, 1, 'R5 blocks inserted')

# ============ post-checks ============
checks = [
    ('no CB4 / DIME label left', html.count('"CB4": "CB4 / DIME"') == 0),
    ('no CB4 / Dime group label left', html.count('"label":"CB4 / Dime"') == 0),
    ('DIME label present', html.count('"CB4": "DIME"') == 1),
    ('w59 css block present', '<style id="zpb-w59-css">' in html),
    ('w59 merge block present', '<style id="zpb-w59-merge-css">' in html),
    ('w59 js block present', '<script id="zpb-w59-js">' in html),
    ('unitcmp class present', html.count('zpb-unitcmp') >= 2),
    ('cinelock law present', 'body.zpb-cinelock .wrap' in html),
    ('clip fix present', html.count('-webkit-background-clip:text !important;background-clip:text !important;background-size:230% 100% !important;') == 2),
    ('syMap present', html.count('const syMap0 = {50:38, 27:60, 78:82, 34:40, 66:68};') == 1),
    ('clickshield present', 'zpb-clickshield' in html),
    ('two-line draft card present', html.count('#draftTable2 td[data-label="Pos"]{grid-column:1/2;grid-row:2;}') == 1),
]
bad = [name for name, okFlag in checks if not okFlag]
for name, okFlag in checks:
    print(('ok   [post] ' if okFlag else 'FAIL [post] ') + name)
if bad:
    sys.exit(1)

out = html
open(OUT, 'w', encoding='utf-8').write(out)
print('w59 bytes:', len(out), '(delta %+.0f)' % (len(out) - n0))
print('w59 md5:', hashlib.md5(out.encode()).hexdigest())
