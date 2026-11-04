#!/usr/bin/env python3
"""w53_patch.py (REV 2) — the wave-53 MOBILE PASS patcher (Z.ai, High Councillor).
Base: the verified w52 product bytes (md5 40613b81de26b5ed9c67bdcc0637ac6f).

Moves:
  WM1  THE TOUCH POLISH (invisible on desktop): text-size-adjust 100% (no iOS
       landscape inflation), tap-highlight transparent (the site paints its own
       states), touch-action:manipulation on the interactive controls (no
       double-tap zoom delay). No root overflow rule — the w43 N6 law (wide
       windows clip, small windows the viewport may pan so the footer stays
       reachable) already governs the root and the Owner set it; we do not
       re-legislate it. (REV 1's root clip is withdrawn — it fought N6.)
  WM2  THE THUMB FLOOR COMPLETES: the 760px floor table forgot two controls the
       600px-era block still floors at 30px — .posbtn (31px measured) and the
       floating .zpb-selbtn (36px). Both join the table's own 38px floor; the
       guide's bare summaries grow a 40px tap row. Phones only.
  WM4  THE RANKINGS PANEL JOINS COMPRESS-FIRST: the second rankings panel's
       nowrap team rows kept feeding a 306px min-content up the intrinsic
       chain (panel → .layout → #viewRankings → .wrap's fit-content), so the
       whole document panned 6px at 320px. min-width:0 alone does NOT fix
       this (it frees the used size, not the intrinsic feed — verified by a
       document-wide min-width sweep, zero effect). The in-house cure is the
       w43 footnav's own pattern: contain:inline-size ("the strip must not
       feed its min-content back into the phone layout viewport") — zero
       positioned descendants inside the panels (probed), so the implied
       layout containment re-anchors nothing. The panel then scrolls its
       rows internally exactly like the draft tables do, at every width.

Rejected on purpose (recorded in the build report):
  - the REV 1 root clip — conflicts with the Owner's w43 N6 small-window law.
  - content-visibility on hidden tabs — risks the look-gate's intersection law.
  - font-size bumps on the 9-11px micro-labels — the Owner's approved design;
    flagged in the report as a proposal instead.
  - any marquee width change — P-101's full-bleed law stands.
"""
import hashlib, os, sys

BASE = '/home/z/my-project/w52/Football-Sim-Z-post-blue-w52.html'
OUT  = '/home/z/my-project/w53/Football-Sim-Z-post-blue-w53.html'
EXPECT_BASE_MD5 = '40613b81de26b5ed9c67bdcc0637ac6f'

html = open(BASE, 'rb').read().decode('utf-8')
md5 = hashlib.md5(html.encode('utf-8')).hexdigest()
if md5 != EXPECT_BASE_MD5:
    sys.exit(f'ABORT: base md5 {md5} != the w52 anchor {EXPECT_BASE_MD5}')
print(f'base ok · md5 {md5} · {len(html.encode("utf-8")):,} bytes')

def patch_once(h, old, new, tag):
    n = h.count(old)
    if n != 1:
        sys.exit(f'ABORT {tag}: anchor count {n} != 1')
    print(f'{tag}: anchor unique · cut')
    return h.replace(old, new, 1)

# --- WM1 · the touch polish (no root overflow rule — w43 N6 owns the root) --
OLD_A = 'body{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);}'
NEW_A = (OLD_A + '\n'
         '/* w53 WM1 · the touch polish: no text inflation on rotate, no grey tap flash (the site\n'
         '   paints its own states), no double-tap zoom delay on the controls. Desktop-invisible. */\n'
         'html{-webkit-text-size-adjust:100%;text-size-adjust:100%;}\n'
         'body{-webkit-tap-highlight-color:transparent;}\n'
         'button,select,summary,.tabbtn,.footlink{touch-action:manipulation;}')
html = patch_once(html, OLD_A, NEW_A, 'WM1')

# --- WM2 · the thumb floor completes ---------------------------------------
OLD_B = ' .zpb-srbtn{min-height:38px;} /* the spot chips (QB 0/1\u2026) join the thumb floor */'
NEW_B = (OLD_B + '\n'
         ' .posbtn{min-height:38px;} /* w53 WM2: the browser position filter joins the floor (the 600px-era 30px floor retires on phones) */\n'
         ' .zpb-selbtn{min-height:38px;} /* w53 WM2: the home + compare floating selectors join the floor */\n'
         ' summary{min-height:40px;} /* w53 WM2: the guide accordions grow a thumb-sized tap row (phones) */')
html = patch_once(html, OLD_B, NEW_B, 'WM2')

# --- WM4 · the rankings panel joins compress-first --------------------------
OLD_C = '#viewRankings .layout{display:flex;flex-direction:column;}'
NEW_C = (OLD_C + '\n'
         '#viewRankings .layout>.panel{min-width:0;contain:inline-size;} /* w53 WM4 · compress-first (the w43 principle, the footnav\'s own cure): the nowrap team rows fed a 306px min-content up the intrinsic chain and panned the document 6px at 320px — containment cuts the feed, the panel scrolls its rows internally like the draft tables */')
html = patch_once(html, OLD_C, NEW_C, 'WM4')

os.makedirs(os.path.dirname(OUT), exist_ok=True)
data = html.encode('utf-8')
open(OUT, 'wb').write(data)
out_md5 = hashlib.md5(data).hexdigest()
print(f'w53 written · md5 {out_md5} · {len(data):,} bytes · delta {len(data) - 1585036:+,} B')
