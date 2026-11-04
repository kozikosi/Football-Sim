#!/usr/bin/env python3
"""w67 chain step 3 — Owner UI 4 + 6: the dark-mode ink laws.
(a) the fills dropdown reads the neutral dropdown family in dark (--tTxd, the Panthers fix);
(b) the pregame star cards read the neutral halfway ink on their always-dark stage (meta line
    --tnd; the 90+ shimmer sweeps tnd -> cream, never the light-tuned --zrb accent);
(c) the Key Players titles + shimmer rows and the matchup-math bars swap to --zrbd in dark.
Asserts the previous step's md5; every anchor exact."""
import hashlib

SRC = '/home/z/my-project/work/w67/Football-Sim-Z-post-blue-w67.html'
PREV_MD5 = 'bd0e7bbb09d2a8d060d21fcb2c9496fb'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == PREV_MD5, 'previous step md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- 1 · Owner UI 4 — the fills dropdown's dark ink ----
rep('.zpb-slotdd:hover,.zpb-slotdd:focus{border-color:var(--tTxM,var(--tA2,var(--accent)));outline:none;box-shadow:0 0 10px color-mix(in srgb,var(--tTxM,var(--tA2,var(--accent))) 30%,transparent);}',
    '''.zpb-slotdd:hover,.zpb-slotdd:focus{border-color:var(--tTxM,var(--tA2,var(--accent)));outline:none;box-shadow:0 0 10px color-mix(in srgb,var(--tTxM,var(--tA2,var(--accent))) 30%,transparent);}
/* W67 (Owner): the closed fills button reads the NEUTRAL dropdown ink in dark mode - the light
   halfway ink (--tTxM) is a dark navy on the dark panel for the Panthers; --tTxd is the same
   family the popup options and the homepage picker already wear (0.50 neutral, team-tinted). */
:root[data-theme="dark"] .zpb-slotdd{color:var(--tTxd,var(--tTxMd,var(--tA2d,var(--selfg))));background:color-mix(in srgb,var(--tTxd,var(--tTxMd,var(--tA2d,var(--selfg)))) 8%,transparent);border-color:color-mix(in srgb,var(--tTxd,var(--tTxMd,var(--tA2d,var(--selfg)))) 40%,transparent);}
:root[data-theme="dark"] .zpb-slotdd:hover,:root[data-theme="dark"] .zpb-slotdd:focus{border-color:var(--tTxd,var(--tTxMd,var(--tA2d,var(--selfg))));box-shadow:0 0 10px color-mix(in srgb,var(--tTxd,var(--tTxMd,var(--tA2d,var(--selfg)))) 30%,transparent);}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) .zpb-slotdd{color:var(--tTxd,var(--tTxMd,var(--tA2d,var(--selfg))));background:color-mix(in srgb,var(--tTxd,var(--tTxMd,var(--tA2d,var(--selfg)))) 8%,transparent);border-color:color-mix(in srgb,var(--tTxd,var(--tTxMd,var(--tA2d,var(--selfg)))) 40%,transparent);}
 :root:not([data-theme="light"]) .zpb-slotdd:hover,:root:not([data-theme="light"]) .zpb-slotdd:focus{border-color:var(--tTxd,var(--tTxMd,var(--tA2d,var(--selfg))));box-shadow:0 0 10px color-mix(in srgb,var(--tTxd,var(--tTxMd,var(--tA2d,var(--selfg)))) 30%,transparent);}
}''',
    'fills dropdown dark ink')

# ---- 2 · Owner UI 6 — the star card meta line reads the neutral halfway ink ----
rep(".zpb-intro-star i{font-style:normal;display:block;font-size:.62rem;letter-spacing:.12em;opacity:.92;color:var(--zrb,var(--gold3));margin-top:3px;}",
    ".zpb-intro-star i{font-style:normal;display:block;font-size:.62rem;letter-spacing:.12em;opacity:.92;color:var(--tnd,#f2e4c8);margin-top:3px;} /* W67 (Owner): the stage is dark in BOTH modes - the meta line reads the neutral halfway ink, never the light-tuned --zrb accent (the Jaguars' teal vanished on it) */",
    'star meta line neutral ink')

# ---- 3 · Owner UI 6 — the w67 payload: star shimmer, kp-title/kp-shm, matchup bars ----
PAYLOAD = '''<style id="zpb-w67-css">
/* ============ Z-POST-BLUE W67 · THE OWNER'S ROUND ============ */
/* UI 6 (Owner): the pregame star cards sit on an ALWAYS-dark stage - the 90+ shimmer sweeps
   the neutral halfway ink (tnd) to cream, never the light-tuned team accent (--zrb): the
   Jaguars' dark teal was invisible on it. Readable for all 32 teams in both modes; the team
   theme stays in the tint and in the card's gradient backdrop. */
.zpb-intro-star b.zpb-shm{color:var(--tnd,#f2e4c8) !important;-webkit-text-fill-color:var(--tnd,#f2e4c8) !important;background:none !important;animation:none;}
@supports ((-webkit-background-clip:text) or (background-clip:text)){
.zpb-intro-star b.zpb-shm{background:linear-gradient(100deg,var(--tnd,#f2e4c8) 18%,#fff6e3 38%,var(--tnd,#f2e4c8) 55%,#ffe9c6 72%,var(--tnd,#f2e4c8) 88%) !important;background-size:230% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;animation:zpbshmsweep 3.4s linear infinite;}}
/* UI 6 (Owner): dark mode reads the dark-tuned row inks - the Key Players card title and its
   90+ shimmer rows swap --zrb (tuned for the cream page) to --zrbd; the matchup-math bars too
   (the Jaguars' bar graph was too dark in dark mode). */
:root[data-theme="dark"] .kp-title{color:var(--zrbd,var(--accent));}
:root[data-theme="dark"] .zpb-kprow b.zpb-shm{color:var(--zrbd,var(--nmd,var(--text))) !important;-webkit-text-fill-color:var(--zrbd,var(--nmd,var(--text))) !important;background:none !important;animation:none;}
@supports ((-webkit-background-clip:text) or (background-clip:text)){
:root[data-theme="dark"] .zpb-kprow b.zpb-shm{background:linear-gradient(100deg,var(--zrbd,#c9a24b) 18%,#ffe9c6 38%,var(--zrbd,#c9a24b) 55%,#fff6e3 72%,var(--zrbd,#c9a24b) 88%) !important;background-size:230% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;animation:zpbshmsweep 3.4s linear infinite;}}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) .kp-title{color:var(--zrbd,var(--accent));}
 :root:not([data-theme="light"]) .zpb-kprow b.zpb-shm{color:var(--zrbd,var(--nmd,var(--text))) !important;-webkit-text-fill-color:var(--zrbd,var(--nmd,var(--text))) !important;background:none !important;animation:none;}
}
@supports ((-webkit-background-clip:text) or (background-clip:text)){
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) .zpb-kprow b.zpb-shm{background:linear-gradient(100deg,var(--zrbd,#c9a24b) 18%,#ffe9c6 38%,var(--zrbd,#c9a24b) 55%,#fff6e3 72%,var(--zrbd,#c9a24b) 88%) !important;background-size:230% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;animation:zpbshmsweep 3.4s linear infinite;}}}
:root[data-theme="dark"] .zpb-mbar i{background:var(--zrbd,var(--zrb,var(--accent)));}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-mbar i{background:var(--zrbd,var(--zrb,var(--accent)));} }
/* UI 3 (Owner): the Series subtitle's two lines */
.zpb-gcl{display:block;}
.zpb-gcl2{font-size:.88em;letter-spacing:.02em;color:var(--sub);margin-top:2px;}
/* UI 7 (Owner): at short windows the pregame's static block compresses so ALL THREE face-off
   rows fit ABOVE the footer - the stage ends at the footer (the mount's bottom clamp) and no
   row is left half-clipped on the line. The Super Bowl keeps its bigger dress. */
@media (max-height:740px){
 .zpb-intro-logos img{width:76px;height:76px;}
 .zpb-replay.zpb-sb .zpb-intro-logos img{width:88px;height:88px;}
 .zpb-intro-stars{gap:7px;}
 .zpb-intro-brow{gap:8px;}
}
@media (max-height:660px){
 .zpb-intro-logos img{width:54px;height:54px;}
 .zpb-replay.zpb-sb .zpb-intro-logos img{width:68px;height:68px;}
 .zpb-intro-title{font-size:.92rem;}
 .zpb-replay.zpb-sb .zpb-intro-title{font-size:1.3rem;}
 .zpb-intro-sub{font-size:.68rem;letter-spacing:.22em;}
 .zpb-rep-intro{gap:7px;padding-top:4px;}
 .zpb-intro-stars{gap:5px;}
 .zpb-intro-star{padding:4px 8px;}
}
</style>
</body>
</html>'''
rep('</script>\n</body>\n</html>', '</script>\n' + PAYLOAD, 'w67 payload style block', 1)

open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step3 done -> {SRC} md5 {h} bytes {len(src.encode("utf-8"))}')
